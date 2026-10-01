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
  readonly patientToEdit = input<PatientDetailDTO | null>(null);
  readonly closeDialog = output<void>();
  readonly patientCreated = output<PatientDetailDTO>();
  readonly patientUpdated = output<PatientDetailDTO>();

  readonly isEditMode = computed(() => !!this.patientToEdit());

  readonly activeTemplate = computed(() => {
    const patient = this.patientToEdit();
    if (patient?.patientTemplateSnapshot) {
      return {
        id: 0,
        name: 'Formulario del paciente',
        templateType: 'PATIENT_EXTRA' as const,
        isDefault: true,
        schemaDefinition: patient.patientTemplateSnapshot,
      };
    }
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
        this.errorMessage.set(null);
        this.workspaceStore.loadSetup();
        const patient = this.patientToEdit();
        if (patient) {
          const nameParts = patient.fullName ? patient.fullName.trim().split(/\s+/) : [];
          const initialValues: Record<string, unknown> = {
            ...(patient.patientExtraData ?? {}),
            ...(patient.patientFormData ?? {}),
            firstName: patient.patientFormData?.['firstName'] ?? nameParts[0] ?? '',
            lastName: patient.patientFormData?.['lastName'] ?? nameParts.slice(1).join(' '),
            birthDate: patient.birthDate,
            nationalId: patient.nationalId ?? '',
            phone: patient.phone ?? '',
            address: patient.address ?? '',
            email: patient.email ?? '',
            gender: patient.gender ?? '',
            bloodType: patient.bloodType ?? '',
            fatherFullName: patient.patientFormData?.['fatherFullName'] ?? patient.guardianInfo?.fatherFullName ?? '',
            motherFullName: patient.patientFormData?.['motherFullName'] ?? patient.guardianInfo?.motherFullName ?? '',
            siblingsCount: patient.patientFormData?.['siblingsCount'] ?? patient.guardianInfo?.siblingsCount ?? null,
            hasSiblings: patient.patientFormData?.['hasSiblings'] ?? patient.guardianInfo?.hasSiblings ?? null,
            primaryGuardian: patient.patientFormData?.['primaryGuardian'] ?? patient.guardianInfo?.primaryGuardian ?? '',
            primaryContactPhone: patient.patientFormData?.['primaryContactPhone'] ?? patient.guardianInfo?.primaryContactPhone ?? '',
            siblingOrder: patient.patientFormData?.['siblingOrder'] ?? patient.guardianInfo?.siblingOrder ?? null,
            livingArrangement: patient.patientFormData?.['livingArrangement'] ?? patient.guardianInfo?.livingArrangement ?? '',
            paternalDiseases: patient.patientFormData?.['paternalDiseases'] ?? patient.familyHistory?.paternalDiseases ?? [],
            maternalDiseases: patient.patientFormData?.['maternalDiseases'] ?? patient.familyHistory?.maternalDiseases ?? [],
            siblingDiseases: patient.patientFormData?.['siblingDiseases'] ?? patient.familyHistory?.siblingDiseases ?? [],
          };
          delete initialValues['fullName'];
          this.values.set(initialValues);
        } else {
          this.values.set({});
        }
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

    const fatherFullName = this.asTrimmedText(values['fatherFullName']);
    const motherFullName = this.asTrimmedText(values['motherFullName']);
    const primaryGuardian = this.asTrimmedText(values['primaryGuardian']);
    const primaryContactPhone = this.asTrimmedText(values['primaryContactPhone']);
    const hasSiblings = typeof values['hasSiblings'] === 'boolean'
      ? values['hasSiblings']
      : (values['hasSiblings'] === 'true' ? true : (values['hasSiblings'] === 'false' ? false : null));
    const siblingsCountVal = values['siblingsCount'];
    const siblingsCount = siblingsCountVal !== undefined && siblingsCountVal !== null && siblingsCountVal !== '' && !isNaN(Number(siblingsCountVal))
      ? Number(siblingsCountVal)
      : null;
    const siblingOrderVal = values['siblingOrder'];
    const siblingOrder = siblingOrderVal !== undefined && siblingOrderVal !== null && siblingOrderVal !== '' && !isNaN(Number(siblingOrderVal))
      ? Number(siblingOrderVal)
      : null;
    const livingArrangement = this.asTrimmedText(values['livingArrangement']);

    const paternalDiseases = this.asStringArray(values['paternalDiseases']);
    const maternalDiseases = this.asStringArray(values['maternalDiseases']);
    const siblingDiseases = this.asStringArray(values['siblingDiseases']);

    const extraData = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => !STANDARD_PATIENT_KEYS.has(key) && value !== '' && value !== null && value !== undefined),
    );
    const hasAnyGuardianData = fatherFullName || motherFullName || siblingsCount !== null || primaryGuardian || primaryContactPhone || hasSiblings !== null || siblingOrder !== null || livingArrangement;
    const payload: PatientRequestDTO = {
      fullName,
      birthDate,
      nationalId: this.asTrimmedText(values['nationalId']) || null,
      phone: this.asTrimmedText(values['phone']) || null,
      address: this.asTrimmedText(values['address']) || null,
      email: this.asTrimmedText(values['email']) || null,
      gender: this.asTrimmedText(values['gender']) || null,
      bloodType: this.asTrimmedText(values['bloodType']) || null,
      guardianInfo: hasAnyGuardianData ? {
        fatherFullName: fatherFullName || undefined,
        motherFullName: motherFullName || undefined,
        siblingsCount: siblingsCount,
        address: this.asTrimmedText(values['address']) || undefined,
        primaryGuardian: primaryGuardian || undefined,
        primaryContactPhone: primaryContactPhone || undefined,
        hasSiblings: hasSiblings,
        siblingOrder: siblingOrder,
        livingArrangement: livingArrangement || undefined,
      } : null,
      familyHistory: (paternalDiseases.length > 0 || maternalDiseases.length > 0 || siblingDiseases.length > 0) ? {
        paternalDiseases: paternalDiseases.length > 0 ? paternalDiseases : undefined,
        maternalDiseases: maternalDiseases.length > 0 ? maternalDiseases : undefined,
        siblingDiseases: siblingDiseases.length > 0 ? siblingDiseases : undefined,
      } : null,
      patientExtraData: Object.keys(extraData).length > 0 ? extraData : null,
      patientFormData: values,
      patientTemplateSnapshot: this.activeTemplate()?.schemaDefinition ?? null,
    };

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const existingPatient = this.patientToEdit();
    if (existingPatient && existingPatient.id) {
      this.patientService.updatePatient(existingPatient.id, payload).subscribe({
        next: (patient) => {
          this.isSubmitting.set(false);
          this.patientUpdated.emit(patient);
          this.patientCreated.emit(patient);
          this.close();
        },
        error: (error) => {
          this.isSubmitting.set(false);
          this.errorMessage.set(error?.error?.message || 'No pudimos actualizar el paciente. Intentá nuevamente.');
        },
      });
    } else {
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
  }

  close(): void {
    if (!this.isSubmitting()) {
      this.closeDialog.emit();
    }
  }

  private asTrimmedText(value: unknown): string {
    return typeof value === 'string' ? value.trim() : '';
  }

  private asStringArray(value: unknown): string[] {
    if (Array.isArray(value)) {
      return value.map((v) => String(v).trim()).filter(Boolean);
    }
    if (typeof value === 'string' && value.trim()) {
      return value.split(',').map((s) => s.trim()).filter(Boolean);
    }
    return [];
  }
}
