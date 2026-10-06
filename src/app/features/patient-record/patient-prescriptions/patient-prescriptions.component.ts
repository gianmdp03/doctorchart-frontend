import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucidePill,
  lucideFileText,
  lucidePrinter,
  lucidePlus,
  lucideClock,
  lucideTrash2,
  lucideAlertCircle,
  lucideCheckCircle2,
} from '@ng-icons/lucide';
import { ClinicalEncounterList } from '../../../core/models/clinical-encounter.model';
import { PatientPrescriptionEditorStore } from './patient-prescription-editor.store';
@Component({
  selector: 'app-patient-prescriptions',
  imports: [FormsModule, NgIcon],
  providers: [
    provideIcons({
      lucidePill,
      lucideFileText,
      lucidePrinter,
      lucidePlus,
      lucideClock,
      lucideTrash2,
      lucideAlertCircle,
      lucideCheckCircle2,
    }),
  ],
  templateUrl: './patient-prescriptions.component.html',
  styleUrl: './patient-prescriptions.component.css',
})
export class PatientPrescriptionsComponent {
  readonly editor = inject(PatientPrescriptionEditorStore);
  readonly latestEncounter = input<ClinicalEncounterList>();
}
