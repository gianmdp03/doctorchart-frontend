import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, NgIcon, DynamicFormRendererComponent],
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
  readonly previousEncountersCount = input<number>(0);
  readonly closeDialog = output<void>();
  readonly encounterCreated = output<ClinicalEncounterDetail>();

  // Consultation metadata. Clinical fields are defined exclusively by the workspace template.
  readonly consultationType = signal<ConsultationType>('FIRST_VISIT');

  // Dynamic Data & Status
  readonly dynamicFormData = signal<Record<string, unknown>>({});
  readonly isDynamicFormValid = signal<boolean>(true);
  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  // Active clinical template for this doctor
  readonly activeTemplate = computed(() => {
    return this.workspaceStore.defaultTemplate();
  });

  readonly consultationTypes = computed<{ value: ConsultationType; label: string }[]>(() => {
    if (this.previousEncountersCount() === 0) {
      return [{ value: 'FIRST_VISIT', label: 'Primera Consulta' }];
    }
    return [
      { value: 'FOLLOW_UP', label: 'Control / Seguimiento' },
      { value: 'ROUTINE_CHECKUP', label: 'Chequeo de Rutina' },
      { value: 'EMERGENCY', label: 'Urgencia' },
      { value: 'INTERCONSULTATION', label: 'Interconsulta' },
    ];
  });

  constructor() {
    effect(() => {
      const count = this.previousEncountersCount();
      const current = this.consultationType();
      if (count === 0) {
        if (current !== 'FIRST_VISIT') {
          this.consultationType.set('FIRST_VISIT');
        }
      } else {
        if (current === 'FIRST_VISIT') {
          this.consultationType.set('FOLLOW_UP');
        }
      }
    });
  }

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

    const tmpl = this.activeTemplate();
    if (!tmpl) {
      this.errorMessage.set('No hay un formulario de consulta configurado para esta cuenta.');
      return;
    }

    if (!this.isDynamicFormValid()) {
      this.errorMessage.set('Por favor complete todos los campos obligatorios del formulario clínico.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    // Build historical label snapshot from active template
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
    const summary = this.getCompatibilitySummary(this.dynamicFormData());

    const payload: ClinicalEncounterRequest = {
      patientId: pid,
      encounterDate: new Date().toISOString(),
      specialty: currentSpec,
      consultationType: this.consultationType(),
      // Legacy storage columns remain populated for database compatibility;
      // the visible consultation is entirely driven by dynamicData.
      chiefComplaint: summary,
      primaryDiagnosisDescription: summary,
      primaryDiagnosisCode: null,
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
    this.consultationType.set(this.previousEncountersCount() === 0 ? 'FIRST_VISIT' : 'FOLLOW_UP');
    this.dynamicFormData.set({});
    this.errorMessage.set(null);
  }

  close(): void {
    this.closeDialog.emit();
  }

  private getCompatibilitySummary(values: Record<string, unknown>): string {
    const firstValue = Object.values(values).find(
      (value) => value !== null && value !== undefined && value !== '',
    );
    return firstValue === undefined ? 'Consulta registrada' : String(firstValue);
  }

}
