import {
  DestroyRef,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
  untracked,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../core/services/auth.service';
import { ActivePatientService } from '../../../core/services/active-patient.service';
import { PatientRecordActionsService } from '../../../core/experience/patient-record-actions.service';
import { ClinicalEncounterService } from '../../../core/services/clinical-encounter.service';
import { ClinicalEncounterList } from '../../../core/models/clinical-encounter.model';
import { PrescriptionDocumentType } from '../../../core/models/prescription.model';

@Injectable()
export class PatientEncountersStore {
  private readonly recordActions = inject(PatientRecordActionsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly authService = inject(AuthService);
  private readonly activePatientService = inject(ActivePatientService);
  private readonly clinicalEncounterService = inject(ClinicalEncounterService);
  private encounterRead = 0;
  private recordContext = '';
  readonly encounters = signal<ClinicalEncounterList[]>([]);

  readonly isLoadingEncounters = signal<boolean>(false);
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

  openEncounterDetail(encounterId: number): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-encounter-detail-modal', {
          detail: { encounterId },
        }),
      );
    }
  }

  deleteEncounter(encounterId: number, event?: Event): void {
    if (event) event.stopPropagation();
    const confirmed = window.confirm('¿Está seguro de que desea eliminar esta consulta clínica?');
    if (!confirmed) return;

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
          if (patientId) {
            window.dispatchEvent(new CustomEvent('encounter-deleted', { detail: { patientId } }));
          }
        },
        error: (err) => {
          if (!current()) return;
          alert(err?.error?.message || 'Error al eliminar la consulta clínica.');
        },
      });
  }

  onPrintPrescription(enc: ClinicalEncounterList, type?: PrescriptionDocumentType): void {
    if (!this.recordActions.has('PRINT_DOCUMENT')) return;
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-prescription-print-modal', {
          detail: {
            source: 'ENCOUNTER',
            id: enc.id,
            patientId: enc.patientId,
            ...(type ? { type } : {}),
          },
        }),
      );
    }
  }
}
