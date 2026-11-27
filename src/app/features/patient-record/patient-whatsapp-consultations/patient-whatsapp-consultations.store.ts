import { DestroyRef, effect, inject, Injectable, signal, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../core/services/auth.service';
import { ActivePatientService } from '../../../core/services/active-patient.service';
import { ClinicalContextService } from '../../../core/services/clinical-context.service';
import { InteractionStatusService } from '../../../core/services/interaction-status.service';
import { WhatsAppConsultationService } from '../../../core/services/whatsapp-consultation.service';
import {
  CreateWhatsAppConsultationRequest,
  UpdateWhatsAppConsultationRequest,
  WhatsAppConsultation,
} from '../../../core/models/whatsapp-consultation.model';
import { PatientRecordDraftsService } from '../patient-record-drafts.service';

export function sortWhatsAppConsultations(items: readonly WhatsAppConsultation[]): WhatsAppConsultation[] {
  return [...items].sort((a, b) => {
    const diff = Date.parse(b.consultedAt) - Date.parse(a.consultedAt);
    if (diff !== 0) return diff;
    return b.id - a.id;
  });
}

@Injectable()
export class PatientWhatsappConsultationsStore {
  private readonly clinicalScope = inject(ClinicalContextService);
  private readonly auth = inject(AuthService);
  private readonly activePatient = inject(ActivePatientService);
  private readonly api = inject(WhatsAppConsultationService);
  private readonly interaction = inject(InteractionStatusService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly drafts = inject(PatientRecordDraftsService).syncContext().whatsappConsultation;

  private recordContext = '';
  private readRevision = 0;

  readonly consultations = signal<WhatsAppConsultation[]>([]);
  readonly loaded = signal(false);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  readonly isFormOpen = this.drafts.open;
  readonly draftDate = this.drafts.date;
  readonly draftTime = this.drafts.time;
  readonly draftExactInstant = this.drafts.exactInstant;
  readonly draftContent = this.drafts.content;

  readonly isSaving = signal(false);
  readonly saveError = signal<string | null>(null);

  readonly editingId = signal<number | null>(null);
  readonly isUpdating = signal(false);
  readonly updateError = signal<string | null>(null);

  readonly pendingAnnul = signal<WhatsAppConsultation | null>(null);
  readonly isAnnulling = signal(false);
  readonly annulError = signal<string | null>(null);

  constructor() {
    effect(() => {
      const patient = this.activePatient.activePatient();
      this.auth.currentUser();
      this.clinicalScope.id();
      untracked(() => {
        const context = this.contextKey();
        if (context !== this.recordContext) {
          this.recordContext = context;
          this.readRevision++;
          this.consultations.set([]);
          this.loaded.set(false);
          this.isLoading.set(false);
          this.error.set(null);
          this.isSaving.set(false);
          this.saveError.set(null);
          this.editingId.set(null);
          this.isUpdating.set(false);
          this.updateError.set(null);
          this.pendingAnnul.set(null);
          this.isAnnulling.set(false);
          this.annulError.set(null);
        }
        if (patient?.id) {
          this.load(patient.id);
        }
      });
    });
  }

  private contextKey(): string {
    return JSON.stringify([
      this.auth.currentUser()?.id ?? null,
      this.clinicalScope.id(),
      this.activePatient.patientId(),
    ]);
  }

  load(patientId: number): void {
    const context = this.recordContext;
    const revision = ++this.readRevision;
    this.isLoading.set(true);
    this.error.set(null);
    this.api
      .list(patientId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (items) => {
          if (revision !== this.readRevision || context !== this.contextKey()) return;
          this.consultations.set(sortWhatsAppConsultations(items || []));
          this.loaded.set(true);
          this.isLoading.set(false);
        },
        error: () => {
          if (revision !== this.readRevision || context !== this.contextKey()) return;
          this.error.set('No se pudieron cargar las consultas por WhatsApp.');
          this.isLoading.set(false);
        },
      });
  }

  openForm(): void {
    this.saveError.set(null);
    this.isFormOpen.set(true);
  }

  cancelForm(): void {
    this.isFormOpen.set(false);
    this.saveError.set(null);
    this.clearDraft();
  }

  clearDraft(): void {
    this.draftDate.set('');
    this.draftTime.set('');
    this.draftExactInstant.set(null);
    this.draftContent.set('');
  }

  create(patientId: number, request: CreateWhatsAppConsultationRequest, onSuccess?: () => void): void {
    if (this.isSaving()) return;
    const context = this.recordContext;
    const revision = this.readRevision;
    this.isSaving.set(true);
    this.saveError.set(null);
    this.api
      .create(patientId, request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (created) => {
          if (revision !== this.readRevision || context !== this.contextKey()) return;
          if (created.patientId !== patientId) {
            this.isSaving.set(false);
            this.saveError.set('La respuesta no corresponde al paciente seleccionado.');
            return;
          }
          this.consultations.update((items) => sortWhatsAppConsultations([created, ...items]));
          this.loaded.set(true);
          this.isSaving.set(false);
          this.cancelForm();
          this.interaction.notifySuccess('La consulta por WhatsApp se guardó correctamente.');
          onSuccess?.();
        },
        error: (err) => {
          if (revision !== this.readRevision || context !== this.contextKey()) return;
          this.isSaving.set(false);
          this.saveError.set(this.errorMessage(err, 'No se pudo guardar la consulta por WhatsApp.'));
        },
      });
  }

  startEdit(item: WhatsAppConsultation): void {
    this.editingId.set(item.id);
    this.updateError.set(null);
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.updateError.set(null);
  }

  update(
    patientId: number,
    consultationId: number,
    request: UpdateWhatsAppConsultationRequest,
    onSuccess?: () => void,
  ): void {
    if (this.isUpdating()) return;
    const context = this.recordContext;
    const revision = this.readRevision;
    this.isUpdating.set(true);
    this.updateError.set(null);
    this.api
      .update(patientId, consultationId, request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (updated) => {
          if (revision !== this.readRevision || context !== this.contextKey()) return;
          this.consultations.update((items) =>
            sortWhatsAppConsultations(items.map((item) => (item.id === updated.id ? updated : item))),
          );
          this.isUpdating.set(false);
          this.editingId.set(null);
          this.interaction.notifySuccess('La consulta por WhatsApp se corrigió correctamente.');
          onSuccess?.();
        },
        error: (err) => {
          if (revision !== this.readRevision || context !== this.contextKey()) return;
          this.isUpdating.set(false);
          this.updateError.set(this.errorMessage(err, 'No se pudo corregir la consulta por WhatsApp.'));
        },
      });
  }

  requestAnnul(item: WhatsAppConsultation): void {
    if (this.isAnnulling()) return;
    this.annulError.set(null);
    this.pendingAnnul.set(item);
  }

  cancelAnnul(): void {
    if (this.isAnnulling()) return;
    this.pendingAnnul.set(null);
    this.annulError.set(null);
  }

  confirmAnnul(patientId: number, reason: string): void {
    const target = this.pendingAnnul();
    if (!target || this.isAnnulling()) return;
    const context = this.recordContext;
    const revision = this.readRevision;
    this.isAnnulling.set(true);
    this.annulError.set(null);
    this.api
      .annul(patientId, target.id, reason, target.version)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          if (revision !== this.readRevision || context !== this.contextKey()) return;
          this.consultations.update((items) => items.filter((item) => item.id !== target.id));
          if (this.editingId() === target.id) {
            this.cancelEdit();
          }
          this.pendingAnnul.set(null);
          this.isAnnulling.set(false);
          this.interaction.notifySuccess('La consulta por WhatsApp se anuló. El registro se conserva en revisiones.');
        },
        error: (err) => {
          if (revision !== this.readRevision || context !== this.contextKey()) return;
          this.isAnnulling.set(false);
          this.annulError.set(this.errorMessage(err, 'No se pudo anular la consulta por WhatsApp.'));
        },
      });
  }

  private errorMessage(err: unknown, fallback: string): string {
    if (err && typeof err === 'object') {
      const status = (err as { status?: number }).status;
      if (status === 409) {
        return 'El registro cambió. Actualizá los datos antes de guardar.';
      }
      const body = (err as { error?: { message?: string } }).error;
      if (body && typeof body.message === 'string' && body.message.trim()) {
        return body.message;
      }
    }
    return fallback;
  }
}
