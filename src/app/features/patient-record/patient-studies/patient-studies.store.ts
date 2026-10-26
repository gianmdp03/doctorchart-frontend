import { effect, inject, Injectable, untracked } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ActivePatientService } from '../../../core/services/active-patient.service';
import { PatientRecordDraftsService } from '../patient-record-drafts.service';

/** Screen-scoped access to the active patient's unsaved attachment inputs. */
@Injectable()
export class PatientStudiesStore {
  private readonly auth = inject(AuthService);
  private readonly activePatient = inject(ActivePatientService);
  private recordContext = '';
  private readonly drafts = inject(PatientRecordDraftsService).syncContext().study;

  readonly draftFile = this.drafts.file;
  readonly draftName = this.drafts.name;
  readonly draftDescription = this.drafts.description;

  constructor() {
    effect(() => {
      this.activePatient.activePatient();
      this.auth.currentUser();
      untracked(() => {
        const context = JSON.stringify([
          this.auth.currentUser()?.id ?? null,
          this.activePatient.patientId(),
        ]);
        if (this.recordContext === '') {
          this.recordContext = context;
        } else if (context !== this.recordContext) {
          this.recordContext = context;
          this.clearDraft();
        }
      });
    });
  }

  setDraftFile(file: File | null): void {
    this.draftFile.set(file);
  }

  setDraftName(name: string): void {
    this.draftName.set(name);
  }

  setDraftDescription(description: string): void {
    this.draftDescription.set(description);
  }

  clearDraft(): void {
    this.draftFile.set(null);
    this.draftName.set('');
    this.draftDescription.set('');
  }
}
