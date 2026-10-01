import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { DynamicFormRendererComponent } from '../dynamic-form-renderer/dynamic-form-renderer.component';
import { PatientService } from '../../core/services/patient.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { PatientDetailDTO, PatientRequestDTO } from '../../core/models/patient.model';
import { createDefaultPatientFormTemplate } from '../../core/config/onboarding-form-definitions';

const STANDARD_PATIENT_KEYS = new Set([
  'firstName', 'lastName', 'fullName', 'birthDate', 'nationalId', 'phone', 'address', 'email', 'gender', 'bloodType',
]);

@Component({
  selector: 'app-new-patient-dialog',
  imports: [CommonModule, DynamicFormRendererComponent],
  templateUrl: './new-patient-dialog.component.html',
  styleUrl: './new-patient-dialog.component.css',
})
export class NewPatientDialogComponent {
  private readonly patientService = inject(PatientService);
  private readonly workspaceStore = inject(WorkspaceStore);

  readonly isOpen = input(false);
  readonly closeDialog = output<void>();
  readonly patientCreated = output<PatientDetailDTO>();
  readonly activeTemplate = computed(() => {
    const defaultTmpl = this.workspaceStore.defaultPatientTemplate();
    if (defaultTmpl) {
      return defaultTmpl;
    }
    const setup = this.workspaceStore.currentSetup();
    if (setup?.specialtyId) {
      return createDefaultPatientFormTemplate(setup.specialtyId, setup.specialtyDisplayName);
    }
    return null;
  });
  readonly values = signal<Record<string, unknown>>({});
  readonly isFormValid = signal(true);
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this.values.set({});
        this.errorMessage.set(null);
        this.workspaceStore.loadSetup();
      }
    });
  }

  onValuesChange(values: Record<string, unknown>): void {
    this.values.set(values);
  }

  onFormValidityChange(valid: boolean): void {
    this.isFormValid.set(valid);
  }

  submit(): void {
    if (!this.isFormValid()) {
      this.errorMessage.set('Completá todos los campos obligatorios del formulario.');
      return;
    }

    const values = this.values();
    const firstName = this.asTrimmedText(values['firstName']);
    const lastName = this.asTrimmedText(values['lastName']);
    const fullName = this.asTrimmedText(values['fullName']) || [firstName, lastName].filter(Boolean).join(' ');
    const birthDate = this.asTrimmedText(values['birthDate']);
    if (!fullName || !birthDate) {
      this.errorMessage.set('Nombre, apellido y fecha de nacimiento son necesarios para crear la ficha clínica.');
      return;
    }

    const extraData = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => !STANDARD_PATIENT_KEYS.has(key) && value !== '' && value !== null && value !== undefined),
    );
    const payload: PatientRequestDTO = {
      fullName,
      birthDate,
      nationalId: this.asTrimmedText(values['nationalId']) || null,
      phone: this.asTrimmedText(values['phone']) || null,
      address: this.asTrimmedText(values['address']) || null,
      email: this.asTrimmedText(values['email']) || null,
      gender: this.asTrimmedText(values['gender']) || null,
      bloodType: this.asTrimmedText(values['bloodType']) || null,
      patientExtraData: Object.keys(extraData).length > 0 ? extraData : null,
      patientFormData: values,
      patientTemplateSnapshot: this.activeTemplate()?.schemaDefinition ?? null,
    };

    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.patientService.createPatient(payload).subscribe({
      next: (patient) => {
        this.isSubmitting.set(false);
        this.patientCreated.emit(patient);
        this.close();
      },
      error: (error) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(error?.error?.message || 'No pudimos crear el paciente. Intentá nuevamente.');
      },
    });
  }

  close(): void {
    if (!this.isSubmitting()) {
      this.closeDialog.emit();
    }
  }

  private asTrimmedText(value: unknown): string {
    return typeof value === 'string' ? value.trim() : '';
  }
}
