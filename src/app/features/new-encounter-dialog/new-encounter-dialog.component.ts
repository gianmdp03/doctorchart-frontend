import {
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideStethoscope,
  lucideCalendar,
  lucideFileText,
  lucideCheck,
  lucideX,
  lucideAlertCircle,
} from '@ng-icons/lucide';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import {
  ClinicalEncounterDetail,
  ClinicalEncounterRequest,
  ConsultationType,
} from '../../core/models/clinical-encounter.model';
import { MedicalSpecialty } from '../../core/models/specialty.model';
import { DynamicFormRendererComponent } from '../dynamic-form-renderer/dynamic-form-renderer.component';

@Component({
  selector: 'app-new-encounter-dialog',
  imports: [CommonModule, FormsModule, NgIcon, DynamicFormRendererComponent],
  providers: [
    provideIcons({
      lucideStethoscope,
      lucideCalendar,
      lucideFileText,
      lucideCheck,
      lucideX,
      lucideAlertCircle,
    }),
  ],
  templateUrl: './new-encounter-dialog.component.html',
  styleUrl: './new-encounter-dialog.component.css',
})
export class NewEncounterDialogComponent {
  private readonly encounterService = inject(ClinicalEncounterService);
  readonly workspaceStore = inject(WorkspaceStore);
  readonly specialtyService = inject(DoctorSpecialtyService);

  // Inputs & Outputs
  readonly isOpen = input<boolean>(false);
  readonly patientId = input<number | null>(null);
  readonly patientName = input<string>('');
  readonly closeDialog = output<void>();
  readonly encounterCreated = output<ClinicalEncounterDetail>();

  // Form State
  readonly consultationType = signal<ConsultationType>('FIRST_VISIT');
  readonly chiefComplaint = signal<string>('');
  readonly historyOfPresentIllness = signal<string>('');
  readonly physicalExamination = signal<string>('');
  readonly primaryDiagnosis = signal<string>('');
  readonly primaryDiagnosisCode = signal<string>('');
  readonly treatmentPlan = signal<string>('');
  readonly followUpDate = signal<string>('');

  // Dynamic Data & Status
  readonly dynamicFormData = signal<Record<string, unknown>>({});
  readonly isDynamicFormValid = signal<boolean>(true);
  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  // Active clinical template for this doctor
  readonly activeTemplate = computed(() => {
    return this.workspaceStore.defaultTemplate();
  });

  readonly consultationTypes: { value: ConsultationType; label: string }[] = [
    { value: 'FIRST_VISIT', label: 'Primera Consulta' },
    { value: 'FOLLOW_UP', label: 'Control / Seguimiento' },
    { value: 'ROUTINE_CHECKUP', label: 'Chequeo de Rutina' },
    { value: 'EMERGENCY', label: 'Urgencia' },
    { value: 'INTERCONSULTATION', label: 'Interconsulta' },
  ];

  onDynamicDataChange(values: Record<string, unknown>): void {
    this.dynamicFormData.set(values);
  }

  onDynamicFormValidityChange(valid: boolean): void {
    this.isDynamicFormValid.set(valid);
  }

  async submitEncounter(): Promise<void> {
    const pid = this.patientId();
    if (!pid) {
      this.errorMessage.set('No hay paciente activo seleccionado.');
      return;
    }

    const complaint = this.chiefComplaint().trim();
    if (!complaint) {
      this.errorMessage.set('El motivo de consulta es obligatorio.');
      return;
    }

    const diagnosis = this.primaryDiagnosis().trim();
    if (!diagnosis) {
      this.errorMessage.set('El diagnóstico principal es obligatorio.');
      return;
    }

    if (!this.isDynamicFormValid()) {
      this.errorMessage.set('Por favor complete todos los campos obligatorios del formulario clínico.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    // Build historical label snapshot from active template
    const tmpl = this.activeTemplate();
    const snapshot: Record<string, string> = {};
    if (tmpl?.schemaDefinition?.categories) {
      for (const cat of tmpl.schemaDefinition.categories) {
        if (cat.enabled !== false && cat.fields) {
          for (const f of cat.fields) {
            snapshot[f.key] = f.label;
          }
        }
      }
    }

    const currentSpec =
      (this.specialtyService.activeSpecialty() as MedicalSpecialty) || 'GENERAL_MEDICINE';

    const payload: ClinicalEncounterRequest = {
      patientId: pid,
      encounterDate: new Date().toISOString().split('T')[0],
      specialty: currentSpec,
      consultationType: this.consultationType(),
      chiefComplaint: complaint,
      historyOfPresentIllness: this.historyOfPresentIllness().trim() || undefined,
      physicalExamination: this.physicalExamination().trim() || undefined,
      primaryDiagnosisDescription: diagnosis,
      primaryDiagnosisCode: this.primaryDiagnosisCode().trim() || null,
      treatmentPlan: this.treatmentPlan().trim() || undefined,
      followUpDate: this.followUpDate().trim() || undefined,
      templateId: tmpl?.id || null,
      dynamicData: this.dynamicFormData(),
      snapshotFieldLabels: snapshot,
    };

    this.encounterService.create(payload).subscribe({
      next: (created) => {
        this.isSubmitting.set(false);
        this.resetForm();
        this.encounterCreated.emit(created);
        this.close();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(
          err?.error?.message || 'Error al guardar la consulta clínica. Reintente.'
        );
      },
    });
  }

  resetForm(): void {
    this.consultationType.set('FIRST_VISIT');
    this.chiefComplaint.set('');
    this.historyOfPresentIllness.set('');
    this.physicalExamination.set('');
    this.primaryDiagnosis.set('');
    this.primaryDiagnosisCode.set('');
    this.treatmentPlan.set('');
    this.followUpDate.set('');
    this.dynamicFormData.set({});
    this.errorMessage.set(null);
  }

  close(): void {
    this.closeDialog.emit();
  }
}
