import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject, input, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, takeUntil } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AccountReadScope } from '../../core/services/account-read-scope';
import { ClinicalDocumentPrintService } from '../../core/services/clinical-document-print.service';

interface IssuedDocument {
  id: number;
  code: string;
  issuedAt: string;
  sourceVersion: number;
  type: 'PRESCRIPTION' | 'STUDY_ORDERS';
  status: 'ISSUED' | 'ANNULLED';
  sourceStatus: 'CURRENT' | 'CHANGED' | 'ANNULLED';
  reason: string | null;
}

@Component({
  selector: 'app-clinical-document-tools',
  imports: [DatePipe, FormsModule],
  template: `
    @if (!shown()) {
      <button type="button" class="dc-button" (click)="load()">Documentos emitidos y exportación</button>
    } @else {
      <section aria-label="Documentos emitidos y exportación">
        <h3>Documentos emitidos</h3>
        <button type="button" class="dc-button" (click)="clear()">Cerrar documentos</button>
        <p>El PDF de cada emisión conserva su contenido original. Para emitir datos actualizados, usá el botón de emisión en la receta o consulta.</p>
        @for (item of items(); track item.id) {
          <div>
            <p>{{ item.type === 'PRESCRIPTION' ? 'Receta' : 'Orden de estudios' }} · {{ item.issuedAt | date:'dd/MM/yyyy HH:mm' }}
              · {{ item.code }} · Versión clínica {{ item.sourceVersion }}
              @if (item.status === 'ANNULLED') { · Emisión anulada. {{ item.reason }} }
              @if (item.sourceStatus === 'ANNULLED') { · Origen anulado }
              @if (item.sourceStatus === 'CHANGED') { · Origen actualizado }
            </p>
            <button type="button" [disabled]="busy()" (click)="downloadOriginal(item)">Descargar PDF original</button>
            @if (annulling() === item.id) {
              <label>Motivo de anulación <input maxlength="500" [ngModel]="reason()" (ngModelChange)="reason.set($event)" /></label>
              <button type="button" [disabled]="busy() || !reason().trim()" (click)="annul(item)">Confirmar anulación</button>
              <button type="button" [disabled]="busy()" (click)="stopAnnul()">Cancelar</button>
            } @else if (item.status !== 'ANNULLED') {
              <button type="button" [disabled]="busy()" (click)="annulling.set(item.id)">Anular emisión</button>
            }
          </div>
        } @empty {
          @if (!busy()) { <p>Todavía no hay documentos emitidos.</p> }
        }
        @if (next(); as before) {
          <button type="button" [disabled]="busy()" (click)="load(before)">Ver emisiones anteriores</button>
        }
        <h3>Exportar ficha contextual</h3>
        <p>El ZIP incluye datos de esta ficha, revisiones, emisiones y adjuntos conservados. El alcance se limita al contexto actual. Es una copia técnica sin autenticación institucional.</p>
        <button type="button" class="dc-button" [disabled]="busy()" (click)="downloadChart()">Preparar y descargar ZIP</button>
        @if (error()) { <p role="alert">{{ error() }}</p> }
        @if (busy()) { <p role="status">Procesando solicitud…</p> }
      </section>
    }
  `,
})
export class ClinicalDocumentToolsComponent {
  readonly patientId = input.required<number>();
  readonly shown = signal(false);
  readonly busy = signal(false);
  readonly error = signal('');
  readonly items = signal<IssuedDocument[]>([]);
  readonly next = signal<number | null>(null);
  readonly annulling = signal<number | null>(null);
  readonly reason = signal('');
  private readonly http = inject(HttpClient);
  private readonly printing = inject(ClinicalDocumentPrintService);
  private readonly scope = new AccountReadScope(() => this.clear());

  constructor() {
    effect(() => {
      this.patientId();
      untracked(() => this.clear());
    });
  }

  private path(suffix: string): string {
    return `${environment.apiUrl}/patients/${this.patientId()}${suffix}`;
  }

  clear(): void {
    this.scope.cancel();
    this.shown.set(false);
    this.busy.set(false);
    this.items.set([]);
    this.next.set(null);
    this.error.set('');
    this.stopAnnul();
  }

  stopAnnul(): void {
    this.annulling.set(null);
    this.reason.set('');
  }

  load(before?: number): void {
    this.shown.set(true);
    this.read(this.http.get<{items: IssuedDocument[]; nextBefore: number | null}>(this.path('/documents'), {
      params: before === undefined ? {} : { before },
    }), page => {
      this.items.set(before === undefined ? page.items : [...this.items(), ...page.items]);
      this.next.set(page.nextBefore);
    });
  }

  annul(item: IssuedDocument): void {
    const reason = this.reason().trim();
    if (!reason || this.annulling() !== item.id) return;
    this.read(this.http.post<void>(this.path(`/documents/${item.id}/annul`), { reason }), () => {
      this.stopAnnul();
      this.load();
    });
  }

  downloadOriginal(item: IssuedDocument): void {
    this.read(this.printing.originalPdf(this.patientId(), item.id), blob => this.download(blob, item.code + '.pdf'));
  }

  downloadChart(): void {
    this.read(this.http.post(this.path('/export'), null, { responseType: 'blob' }),
      blob => this.download(blob, 'historia-contextual.zip'));
  }

  private read<T>(request: Observable<T>, receive: (value: T) => void): void {
    if (this.busy()) return;
    const current = this.scope.begin();
    this.busy.set(true);
    this.error.set('');
    request.pipe(takeUntil(this.scope.canceled)).subscribe({
      next: value => {
        if (!current()) return;
        this.busy.set(false);
        receive(value);
      },
      error: async (response: HttpErrorResponse) => {
        if (!current()) return;
        let detail = response.error;
        if (detail instanceof Blob) {
          try { detail = JSON.parse(await detail.text()); } catch { detail = null; }
        }
        if (!current()) return;
        this.error.set(typeof detail?.message === 'string' ? detail.message : 'No se pudo completar la solicitud.');
        this.busy.set(false);
      },
    });
  }

  private download(blob: Blob, name: string): void {
    const url = URL.createObjectURL(blob);
    const download = document.createElement('a');
    download.href = url;
    download.download = name;
    download.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }
}
