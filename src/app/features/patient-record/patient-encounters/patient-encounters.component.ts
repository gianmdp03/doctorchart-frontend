import { PatientRecordActionsService } from '../../../core/experience/patient-record-actions.service';
import { Component, inject, output } from '@angular/core';
import { ClinicalTimelineComponent } from '../clinical-timeline/clinical-timeline.component';
import { PatientEncountersStore } from './patient-encounters.store';
@Component({
  selector: 'app-patient-encounters',
  imports: [ClinicalTimelineComponent],
  templateUrl: './patient-encounters.component.html',
  styleUrl: './patient-encounters.component.css',
})
export class PatientEncountersComponent {
  readonly recordActions = inject(PatientRecordActionsService);
  readonly history = inject(PatientEncountersStore);
  readonly newEncounter = output<void>();
}
