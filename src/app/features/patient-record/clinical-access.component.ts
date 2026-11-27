import { DatePipe } from '@angular/common';
import { afterNextRender, Component, effect, ElementRef, Injector, inject, input, signal, untracked, viewChild } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ClinicalAccessEvent } from '../../core/models/clinical-revision.model';
import { AccountReadScope } from '../../core/services/account-read-scope';
import { PatientService } from '../../core/services/patient.service';

@Component({
  styleUrl: './clinical-access.component.css',
  selector: 'app-clinical-access',
  imports: [DatePipe],
  template: `
    @if (!open()) {
      <button #openButton type="button" class="dc-button" aria-expanded="false" (click)="load(); focusPanel(true)">
        {{ patientId() ? 'Accesos a la ficha' : 'Auditoría de accesos' }}
      </button>
    } @else {
      <section #panel tabindex="-1" aria-label="Auditoría de accesos">
        @if (!embedded()) { <h3>Auditoría de accesos</h3> }
        @if (!embedded()) { <button type="button" class="dc-button" (click)="close(); focusPanel(false)">Cerrar auditoría</button> }
        @if (error()) {
          <p role="alert">{{ error() }}</p>
          <button type="button" class="dc-button" [disabled]="loading()" (click)="load()">Reintentar</button>
        }
        @if (loading()) { <p role="status">Cargando accesos…</p> }
        <ul class="access-list">
          @for (event of items(); track event.id) {
            <li>
              <div class="access-event">
                <strong>{{ operations[event.operation] ?? event.operation }}</strong>
                <time [attr.datetime]="event.occurredAt">{{ event.occurredAt | date:'dd/MM/yyyy HH:mm:ss' }}</time>
                <span class="access-result" [class.attention]="event.outcome === 'REJECTED' || event.outcome === 'FAILED'">
                  {{ outcomes[event.outcome] }}
                </span>
              </div>
              <details>
                <summary>Ver usuario y registro</summary>
                <p>{{ event.actorKind === 'DOCTOR' ? 'Profesional' : 'Administrador del catálogo' }} · ID {{ event.actor }}</p>
                @if (event.entityId ?? event.patientId; as recordId) { <p>Registro #{{ recordId }}</p> }
                @if (event.recordVersion !== null) { <p>Versión {{ event.recordVersion }}</p> }
              </details>
            </li>
          } @empty {
            @if (!loading() && !error()) { <li>Sin accesos registrados para esta selección.</li> }
          }
        </ul>
        @if (next(); as before) {
          <button type="button" [disabled]="loading()" (click)="load(before)">Ver accesos anteriores</button>
        }
      </section>
    }
  `,
})
export class ClinicalAccessComponent {
  private readonly injector = inject(Injector);
  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');
  private readonly openButton = viewChild<ElementRef<HTMLButtonElement>>('openButton');

  focusPanel(open: boolean): void {
    afterNextRender(() => (open ? this.panel() : this.openButton())?.nativeElement.focus(), { injector: this.injector });
  }

  readonly embedded = input(false);
  readonly patientId = input<number>();
  readonly open = signal(false);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly items = signal<ClinicalAccessEvent[]>([]);
  readonly next = signal<number | null>(null);
  readonly outcomes = {
    AUTHORIZED: 'Acceso autorizado', ARTIFACT_READY: 'Documento generado',
    REJECTED: 'Solicitud rechazada', FAILED: 'Operación fallida',
  };
  readonly operations: Record<string, string> = {
    PATIENT_SEARCH: 'Búsqueda de fichas', PATIENT_READ: 'Lectura de ficha', PATIENT_ARCHIVE_LIST: 'Fichas anuladas',
    CLINICAL_SUMMARY: 'Resumen clínico', CLINICAL_REVISIONS: 'Revisiones clínicas', ARCHIVED_CALCULATIONS: 'Cálculos archivados',
    GROWTH_READ: 'Curvas de crecimiento', MEASUREMENTS_READ: 'Mediciones', VACCINATIONS_READ: 'Vacunas',
    ENCOUNTER_SEARCH: 'Búsqueda de consultas', ENCOUNTER_DASHBOARD: 'Consultas del tablero',
    ENCOUNTER_READ: 'Lectura de consulta', PATIENT_ENCOUNTERS: 'Consultas de la ficha',
    PRESCRIPTIONS_READ: 'Listado de recetas y órdenes', PRESCRIPTION_READ: 'Receta u orden',
    PRESCRIPTION_PRINT_DATA: 'Preparación de receta u orden', PRESCRIPTION_PDF: 'PDF de receta u orden',
    ENCOUNTER_PRINT_DATA: 'Preparación de documento de consulta', ENCOUNTER_PDF: 'PDF de consulta',
    STUDIES_READ: 'Listado de estudios', STUDY_READ: 'Detalle del estudio', STUDY_DOWNLOAD: 'Descarga de estudio',
    WHATSAPP_CONSULTATIONS_READ: 'Listado de consultas por WhatsApp',
    WHATSAPP_CONSULTATION_READ: 'Lectura de consulta por WhatsApp',
    WHATSAPP_CONSULTATION_CREATE: 'Registro de consulta por WhatsApp',
    WHATSAPP_CONSULTATION_UPDATE: 'Corrección de consulta por WhatsApp',
    WHATSAPP_CONSULTATION_ANNUL: 'Anulación de consulta por WhatsApp',
    ARCHIVED_STUDY_DOWNLOAD: 'Descarga histórica', CALCULATION_HISTORY: 'Historial de cálculos',
    DOCUMENT_LIST: 'Listado de documentos emitidos', DOCUMENT_ISSUE: 'Emisión de documento',
    DOCUMENT_REPRINT: 'Descarga de PDF original', DOCUMENT_ANNUL: 'Anulación de documento',
    CHART_EXPORT_DOWNLOAD: 'Exportación de ficha',
    CALCULATION_AUTOFILL: 'Datos para cálculo', CALCULATION_EXECUTE: 'Cálculo guardado', AUDIT_READ: 'Lectura de auditoría',
  };
  private readonly service = inject(PatientService);
  private readonly scope = new AccountReadScope(() => this.close());

  constructor() {
    effect(() => {
      this.patientId();
      const embedded = this.embedded();
      untracked(() => {
        this.close();
        if (embedded) this.load();
      });
    });
  }

  load(before?: number): void {
    const current = this.scope.begin();
    this.open.set(true);
    this.loading.set(true);
    this.error.set('');
    if (before === undefined) {
      this.items.set([]);
      this.next.set(null);
    }
    this.service.listClinicalAccess(this.patientId(), before).pipe(takeUntil(this.scope.canceled)).subscribe({
      next: page => {
        if (!current()) return;
        this.items.update(items => [...items, ...page.items]);
        this.next.set(page.nextBefore);
        this.loading.set(false);
      },
      error: () => {
        if (!current()) return;
        this.error.set('No pudimos consultar la auditoría.');
        this.loading.set(false);
      },
    });
  }

  close(): void {
    this.scope.cancel();
    this.open.set(false);
    this.loading.set(false);
    this.error.set('');
    this.items.set([]);
    this.next.set(null);
  }
}
