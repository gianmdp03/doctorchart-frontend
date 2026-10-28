import {
  DestroyRef,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
  untracked,
} from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../core/services/auth.service';
import { ActivePatientService } from '../../../core/services/active-patient.service';
import { PatientRecordActionsService } from '../../../core/experience/patient-record-actions.service';
import { ClinicalEncounterService } from '../../../core/services/clinical-encounter.service';
import { ClinicalEncounterList, ConsultationType } from '../../../core/models/clinical-encounter.model';
import { WizardFormValues } from '../../../core/models/wizard-definition.model';
import { PrescriptionDocumentType } from '../../../core/models/prescription.model';
import { ClinicalDocumentPrintService } from '../../../core/services/clinical-document-print.service';
import { PrintDocumentReference } from '../../../core/models/clinical-print-document.model';
import { PatientRecordDraftsService } from '../patient-record-drafts.service';

@Injectable()
export class PatientEncountersStore {
  private readonly recordActions = inject(PatientRecordActionsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly authService = inject(AuthService);
  private readonly activePatientService = inject(ActivePatientService);
  private readonly clinicalEncounterService = inject(ClinicalEncounterService);
  private readonly printService = inject(ClinicalDocumentPrintService);
  private readonly router = inject(Router);
  private encounterRead = 0;
  private readonly drafts = inject(PatientRecordDraftsService).syncContext().encounter;
  private recordContext = this.contextKey();
  readonly pendingDeleteId = signal<number | null>(null);
  readonly isDeleting = signal(false);
  readonly deleteError = signal<string | null>(null);
  readonly encounters = signal<ClinicalEncounterList[]>([]);
  readonly isLoadingEncounters = signal<boolean>(false);
  readonly isCreatingEncounter = this.drafts.open;

  readonly encounterDraftValues = this.drafts.values;
  readonly encounterDraftConsultationType = this.drafts.type;
  readonly encounterDraftInstant = this.drafts.instant;

  startCreatingEncounter(): void {
    this.isCreatingEncounter.set(true);
  }

  cancelCreatingEncounter(): void {
    this.isCreatingEncounter.set(false);
    this.clearEncounterDraft();
  }

  setEncounterDraft(values: WizardFormValues, consultationType?: ConsultationType, instant?: string): void {
    this.encounterDraftValues.set(structuredClone(values));
    if (consultationType) {
      this.encounterDraftConsultationType.set(consultationType);
    }
    if (instant) {
      this.encounterDraftInstant.set(instant);
    }
  }

  clearEncounterDraft(): void {
    this.encounterDraftValues.set({});
    this.encounterDraftConsultationType.set(null);
    this.encounterDraftInstant.set(null);
  }

  constructor() {
    effect(() => {
      const patient = this.activePatientService.activePatient();
      this.authService.currentUser();
      untracked(() => {
        const context = this.contextKey();
        if (context !== this.recordContext) {
          this.recordContext = context;
          this.encounterRead++;
          this.encounters.set([]);
          this.pendingDeleteId.set(null); this.isDeleting.set(false); this.deleteError.set(null);
          this.isCreatingEncounter.set(false);
          this.clearEncounterDraft();
        }
        if (patient?.id) this.loadEncounters(patient.id);
        else {
          this.encounters.set([]);
          this.isLoadingEncounters.set(false);
        }
      });
    });
  }
  private contextKey(): string {
    return JSON.stringify([
      this.authService.currentUser()?.id ?? null,
      this.activePatientService.patientId(),
    ]);
  }
  loadEncounters(patientId: number): void {
    const revision = ++this.encounterRead;
    const owner = this.authService.currentUser()?.id;
    this.isLoadingEncounters.set(true);
    this.clinicalEncounterService
      .getByPatient(patientId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          if (
            revision !== this.encounterRead ||
            patientId !== this.activePatientService.patientId() ||
            owner !== this.authService.currentUser()?.id
          )
            return;
          this.encounters.set(data || []);
          this.isLoadingEncounters.set(false);
        },
        error: () => {
          if (
            revision !== this.encounterRead ||
            patientId !== this.activePatientService.patientId() ||
            owner !== this.authService.currentUser()?.id
          )
            return;
          this.encounters.set([]);
          this.isLoadingEncounters.set(false);
        },
      });
  }

  openEncounterDetail(encounterId: number): void { void this.router.navigate(['/encounters', encounterId]); }

  deleteEncounter(encounterId: number, event?: Event): void {
    event?.stopPropagation();
    if (this.isDeleting() || !this.encounters().some(item => item.id === encounterId)) return;
    this.pendingDeleteId.set(encounterId); this.deleteError.set(null);
  }

  confirmDeleteEncounter(): void {
    if (this.recordContext !== this.contextKey()) { this.pendingDeleteId.set(null); return; }
    const encounterId = this.pendingDeleteId();
    if (!encounterId || this.isDeleting() || !this.encounters().some(item => item.id === encounterId)) return;
    this.isDeleting.set(true); this.deleteError.set(null);
    const patientId = this.activePatientService.patientId();
    const owner = this.authService.currentUser()?.id;
    const context = this.recordContext;
    const current = () =>
      context === this.recordContext &&
      patientId === this.activePatientService.patientId() &&
      owner === this.authService.currentUser()?.id;
    this.clinicalEncounterService
      .delete(encounterId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          if (!current()) return;
          this.isDeleting.set(false); this.pendingDeleteId.set(null);
          this.encounters.update(items => items.filter(item => item.id !== encounterId));
          if (patientId) {
            window.dispatchEvent(new CustomEvent('encounter-deleted', { detail: { patientId } }));
          }
        },
        error: (err) => {
          if (!current()) return;
          this.isDeleting.set(false);
          this.deleteError.set(err?.error?.message || 'No se pudo eliminar la consulta clínica.');
        },
      });
  }

  onPrintPrescription(enc: ClinicalEncounterList, type?: PrescriptionDocumentType): void {
    if (!this.recordActions.has('PRINT_DOCUMENT')) return;
    const ref: PrintDocumentReference = {
      source: 'ENCOUNTER',
      id: enc.id,
      patientId: enc.patientId,
      ...(type ? { type } : {}),
    };
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      this.printService.openPdfInNewTab(ref);
    }
  }
}
