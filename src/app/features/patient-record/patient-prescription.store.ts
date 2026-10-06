import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, takeUntil } from 'rxjs';
import { PrescriptionRequest, SavedPrescriptionRecord } from '../../core/models/prescription.model';
import { PatientPrescriptionService } from '../../core/services/patient-prescription.service';

/** Component-scoped history: HTTP responses cannot cross patient changes or outlive the screen. */
@Injectable()
export class PatientPrescriptionStore {
  private readonly api = inject(PatientPrescriptionService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly changed = new Subject<void>();
  private patientId: number | null = null;
  readonly records = signal<SavedPrescriptionRecord[]>([]);
  readonly loading = signal(false);
  readonly writing = signal(false);
  readonly busy = computed(() => this.loading() || this.writing());
  readonly loadError = signal<string | null>(null);
  readonly error = signal<string | null>(null);
  readonly success = signal<string | null>(null);

  setPatient(patientId: number | null): void {
    if (this.patientId === patientId) return;
    this.changed.next();
    this.patientId = patientId;
    this.records.set([]); this.loading.set(false); this.writing.set(false);
    this.loadError.set(null); this.error.set(null); this.success.set(null);
    if (patientId) this.reload();
  }
  reload(): void {
    const patientId = this.patientId;
    if (!patientId || this.busy()) return;
    this.loading.set(true); this.loadError.set(null);
    this.api.list(patientId).pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: records => { this.records.set(records); this.loading.set(false); },
      error: () => { this.loading.set(false); this.loadError.set('No se pudo cargar el historial de recetas y órdenes.'); },
    });
  }
  save(request: PrescriptionRequest, onSaved?: (record: SavedPrescriptionRecord) => void): void {
    const patientId = this.patientId;
    if (!patientId || this.busy()) return;
    this.writing.set(true); this.error.set(null); this.success.set(null);
    this.api.create(patientId,request).pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: record => {
        this.records.update(records => [record, ...records]); this.writing.set(false);
        this.success.set('Receta / orden registrada en el historial del paciente.'); onSaved?.(record);
      },
      error: error => { this.writing.set(false); this.error.set(error?.error?.message || 'No se pudo guardar la receta u orden. El borrador se conserva.'); },
    });
  }
  reprint(id: number, onLoaded: (record: SavedPrescriptionRecord) => void): void {
    const patientId = this.patientId;
    if (!patientId || this.busy()) return;
    this.writing.set(true); this.error.set(null); this.success.set(null);
    this.api.get(patientId,id).pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: record => { this.writing.set(false); onLoaded(record); },
      error: () => { this.writing.set(false); this.error.set('No se pudo recuperar el documento para imprimir.'); },
    });
  }
  delete(id: number): void {
    const patientId = this.patientId;
    if (!patientId || this.busy()) return;
    this.writing.set(true); this.error.set(null); this.success.set(null);
    this.api.delete(patientId,id).pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => { this.records.update(records => records.filter(record => record.id !== id)); this.writing.set(false); },
      error: () => { this.writing.set(false); this.error.set('No se pudo eliminar el documento. El registro se conserva.'); },
    });
  }
}
