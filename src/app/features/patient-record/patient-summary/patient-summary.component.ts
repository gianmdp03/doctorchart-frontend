import { Component, computed, inject, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideUser } from '@ng-icons/lucide';
import { PatientRecordActionsService } from '../../../core/experience/patient-record-actions.service';
import { ActivePatientService } from '../../../core/services/active-patient.service';
import {
  WizardFormDefinition,
  WizardFormValues,
} from '../../../core/models/wizard-definition.model';
import { DynamicFormRendererComponent } from '../../dynamic-form-renderer/dynamic-form-renderer.component';
import { ClinicalOverviewComponent } from './clinical-overview.component';
@Component({
  selector: 'app-patient-summary',
  imports: [DynamicFormRendererComponent, NgIcon, ClinicalOverviewComponent],
  providers: [provideIcons({ lucideUser })],
  templateUrl: './patient-summary.component.html',
  styleUrl: './patient-summary.component.css',
})
export class PatientSummaryComponent {
  readonly recordActions = inject(PatientRecordActionsService);
  private readonly activePatientService = inject(ActivePatientService);
  readonly editPatient = output<void>();
  readonly patientFormDefinition = computed<WizardFormDefinition | null>(
    () => this.activePatientService.activePatient()?.formDefinitionSnapshot ?? null,
  );

  readonly patientFormValues = computed<WizardFormValues>(
    () => this.activePatientService.activePatient()?.formValues ?? {},
  );

  readonly patientFormulaResults = computed(
    () => this.activePatientService.activePatient()?.formulaResults ?? {},
  );
}
