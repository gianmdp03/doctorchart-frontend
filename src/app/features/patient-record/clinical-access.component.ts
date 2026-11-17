import { DatePipe } from '@angular/common';
import { Component, effect, inject, input, signal, untracked } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ClinicalAccessEvent } from '../../core/models/clinical-revision.model';
import { AccountReadScope } from '../../core/services/account-read-scope';
import { PatientService } from '../../core/services/patient.service';

@Component({
  selector: 'app-clinical-access',
  imports: [DatePipe],
  template: `
    @if (!open()) {
      <button type="button" class="dc-button" (click)="load()">
        {{ patientId() ? 'Accesos a la ficha' : 'Auditoría de accesos' }}
      </button>
    } @else {
      <section aria-label="Auditoría de accesos">
        <h3>Auditoría de accesos</h3>
        <button type="button" class="dc-button" (click)="close()">Cerrar auditoría</button>
        @if (error()) {
          <p role="alert">{{ error() }}</p>
          <button type="button" [disabled]="loading()" (click)="load()">Reintentar</button>
        }
        @if (loading()) { <p role="status">Cargando accesos…</p> }
        <ul>
          @for (event of items(); track event.id) {
            <li>
              {{ event.occurredAt | date:'dd/MM/yyyy HH:mm:ss' }} ·
              {{ operations[event.operation] ?? event.operation }} ·
              {{ event.actor }} · {{ outcomes[event.outcome] }}
              @if (event.entityId ?? event.patientId; as recordId) { · Registro #{{ recordId }} }
              @if (event.recordVersion !== null) { · Versión {{ event.recordVersion }} }
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
    ARCHIVED_STUDY_DOWNLOAD: 'Descarga histórica', CALCULATION_HISTORY: 'Historial de cálculos',
    CALCULATION_AUTOFILL: 'Datos para cálculo', CALCULATION_EXECUTE: 'Cálculo guardado', AUDIT_READ: 'Lectura de auditoría',
  };
  private readonly service = inject(PatientService);
  private readonly scope = new AccountReadScope(() => this.close());

  constructor() {
    effect(() => {
      this.patientId();
      untracked(() => this.close());
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
