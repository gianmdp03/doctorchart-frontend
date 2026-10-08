import { Component, computed, inject, output } from '@angular/core';
import { PatientRecordActionsService } from '../../../core/experience/patient-record-actions.service';
import { ActivePatientService } from '../../../core/services/active-patient.service';
import { ClinicalEncounterDetail } from '../../../core/models/clinical-encounter.model';
import { ClinicalTimelineComponent } from '../clinical-timeline/clinical-timeline.component';
import { EncounterFormComponent } from '../../encounter-form/encounter-form.component';
import { PatientEncountersStore } from './patient-encounters.store';

@Component({
  selector: 'app-patient-encounters',
  imports: [ClinicalTimelineComponent, EncounterFormComponent],
  templateUrl: './patient-encounters.component.html',
  styleUrl: './patient-encounters.component.css',
})
export class PatientEncountersComponent {
  readonly recordActions = inject(PatientRecordActionsService);
  readonly history = inject(PatientEncountersStore);
  readonly activePatientService = inject(ActivePatientService);
  readonly newEncounter = output<void>();

  readonly patientId = computed(() => this.activePatientService.patientId() ?? 0);
  readonly patientName = computed(() => this.activePatientService.activePatient()?.fullName ?? '');

  onNewEncounterTriggered(): void {
    this.history.startCreatingEncounter();
    this.newEncounter.emit();
  }

  onEncounterCreated(encounter: ClinicalEncounterDetail): void {
    this.history.cancelCreatingEncounter();
    const patientId = this.activePatientService.patientId();
    if (patientId) {
      this.history.loadEncounters(patientId);
    }
  }
}
