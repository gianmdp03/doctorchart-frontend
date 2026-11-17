import { Component, inject, input, signal } from '@angular/core';
import { AnnulmentPromptComponent } from '../annulment-prompt.component';
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
  imports: [FormsModule, NgIcon, AnnulmentPromptComponent],
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
  readonly pendingAnnulment = signal<number | null>(null);
  readonly editor = inject(PatientPrescriptionEditorStore);
  readonly latestEncounter = input<ClinicalEncounterList>();
}
