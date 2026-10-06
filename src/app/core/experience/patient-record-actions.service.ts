import { Injectable, computed, inject } from '@angular/core';
import { WorkspaceStore } from '../services/workspace.store';
import { PatientRecordActionId } from '../models/specialty-experience.model';
import { PATIENT_RECORD_ACTIONS } from './patient-record-actions';

@Injectable({ providedIn: 'root' })
export class PatientRecordActionsService {
  private readonly workspace = inject(WorkspaceStore);
  readonly actions = computed(() =>
    this.workspace
      .patientRecordActions()
      .filter((id) => this.isAvailable(id))
      .map((id) => PATIENT_RECORD_ACTIONS[id]),
  );

  has(id: PatientRecordActionId): boolean {
    return this.workspace.hasRecordAction(id) && this.isAvailable(id);
  }

  private isAvailable(id: PatientRecordActionId): boolean {
    return (
      id !== 'VIEW_GROWTH' ||
      (this.workspace.hasRecordTab('GROWTH') && this.workspace.isModuleActive('GROWTH_CHARTS'))
    );
  }
}
