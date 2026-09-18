import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { SpecialtySchemaService } from '../../core/services/specialty-schema.service';
import {
  ClinicalEncounterRequest,
  ConsultationType,
  DiagnosisItem,
  PrescriptionItem,
} from '../../core/models/clinical-encounter.model';
import {
  MedicalSpecialty,
  SpecialtySchema,
} from '../../core/models/specialty.model';
import { DynamicSpecialtyFormComponent } from '../dynamic-specialty-form/dynamic-specialty-form.component';

export interface SpecialtyOption {
  value: MedicalSpecialty;
  label: string;
}

export interface ConsultationTypeOption {
  value: ConsultationType;
  label: string;
}

export interface DiagnosisPreset {
  code: string;
  description: string;
}

export const SPECIALTY_OPTIONS: SpecialtyOption[] = [
  { value: 'GENERAL_MEDICINE', label: 'Medicina General / Familiar' },
  { value: 'PEDIATRICS', label: 'Pediatría y Puericultura' },
  { value: 'CARDIOLOGY', label: 'Cardiología' },
  { value: 'OPHTHALMOLOGY', label: 'Oftalmología' },
  { value: 'GYNECOLOGY', label: 'Ginecología y Obstetricia' },
  { value: 'PSYCHIATRY', label: 'Salud Mental y Psiquiatría' },
  { value: 'TRAUMATOLOGY', label: 'Traumatología y Ortopedia' },
  { value: 'DERMATOLOGY', label: 'Dermatología' },
  { value: 'NEUROLOGY', label: 'Neurología' },
  { value: 'ENDOCRINOLOGY', label: 'Endocrinología y Metabolismo' },
  { value: 'ONCOLOGY', label: 'Oncología Clínica' },
  { value: 'UROLOGY', label: 'Urología' },
  { value: 'GASTROENTEROLOGY', label: 'Gastroenterología' },
];

export const CONSULTATION_TYPES: ConsultationTypeOption[] = [
  { value: 'FIRST_VISIT', label: 'Primera Consulta' },
  { value: 'FOLLOW_UP', label: 'Control / Seguimiento' },
  { value: 'ROUTINE_CHECKUP', label: 'Chequeo General Preventivo' },
  { value: 'EMERGENCY', label: 'Urgencia / Demanda Espontánea' },
  { value: 'INTERCONSULTATION', label: 'Interconsulta Especializada' },
];

export const COMMON_DIAGNOSES: DiagnosisPreset[] = [
  { code: 'Z00.0', description: 'Examen médico general de rutina del adulto' },
  { code: 'Z00.1', description: 'Control de salud infantil y desarrollo (Pediatría)' },
  { code: 'I10', description: 'Hipertensión esencial (primaria)' },
  { code: 'E11.9', description: 'Diabetes mellitus tipo 2 sin complicaciones' },
  { code: 'J00', description: 'Rinofaringitis aguda (resfriado común)' },
  { code: 'J20.9', description: 'Bronquitis aguda no especificada' },
  { code: 'H52.1', description: 'Miopía' },
  { code: 'H52.2', description: 'Astigmatismo' },
  { code: 'M54.5', description: 'Lumbago no especificado' },
  { code: 'K21.9', description: 'Enfermedad por reflujo gastroesofágico' },
  { code: 'L20.9', description: 'Dermatitis atópica no especificada' },
  { code: 'F41.1', description: 'Trastorno de ansiedad generalizada' },
];

@Component({
  selector: 'app-new-encounter-dialog',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    DynamicSpecialtyFormComponent,
  ],
  templateUrl: './new-encounter-dialog.component.html',
  styleUrl: './new-encounter-dialog.component.css',
})
export class NewEncounterDialogComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly activePatientService = inject(ActivePatientService);
  private readonly encounterService = inject(ClinicalEncounterService);
  private readonly specialtySchemaService = inject(SpecialtySchemaService);
  readonly doctorSpecialtyService = inject(DoctorSpecialtyService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly isOpen = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  readonly activeSoapTab = signal<'S' | 'O' | 'A' | 'P' | 'SPECIALTY'>('S');

  readonly specialtyOptions = SPECIALTY_OPTIONS;
  readonly consultationTypes = CONSULTATION_TYPES;
  readonly commonDiagnoses = COMMON_DIAGNOSES;

  readonly selectedSpecialty = signal<MedicalSpecialty>('PEDIATRICS');
  readonly specialtyLabel = computed<string>(() => {
    const opt = this.specialtyOptions.find((o) => o.value === this.selectedSpecialty());
    return opt?.label || this.doctorSpecialtyService.specialtyLabel();
  });
  readonly currentSchema = signal<SpecialtySchema | null>(null);
  readonly specialtyDataModel = signal<Record<string, any>>({});

  readonly secondaryDiagnoses = signal<DiagnosisItem[]>([]);
  readonly prescriptions = signal<PrescriptionItem[]>([]);
  readonly diagnosticOrders = signal<string[]>([]);

  // Temp form fields for adding secondary diagnoses, prescriptions and orders
  readonly newSecondaryCode = signal<string>('');
  readonly newSecondaryDesc = signal<string>('');
  readonly newSecondaryChronic = signal<boolean>(false);

  readonly newRxDrug = signal<string>('');
  readonly newRxDose = signal<string>('');
  readonly newRxRoute = signal<string>('Oral');
  readonly newRxFreq = signal<string>('Cada 8 horas');
  readonly newRxDuration = signal<number | null>(null);
  readonly newRxInstructions = signal<string>('');

  readonly newDiagnosticOrder = signal<string>('');

  readonly todayDate = new Date().toISOString().split('T')[0];

  readonly encounterForm: FormGroup = this.fb.group({
    encounterDate: [this.todayDate, [Validators.required]],
    consultationType: ['FIRST_VISIT' as ConsultationType, [Validators.required]],

    // S - Subjective
    chiefComplaint: ['', [Validators.required, Validators.minLength(3)]],
    historyOfPresentIllness: [''],

    // O - Objective
    systolicBloodPressure: [null, [Validators.min(30), Validators.max(300)]],
    diastolicBloodPressure: [null, [Validators.min(20), Validators.max(200)]],
    heartRate: [null, [Validators.min(20), Validators.max(250)]],
    respiratoryRate: [null, [Validators.min(5), Validators.max(100)]],
    temperatureCelsius: [null, [Validators.min(30), Validators.max(45)]],
    oxygenSaturationPercent: [null, [Validators.min(50), Validators.max(100)]],
    weightKg: [null, [Validators.min(0.2), Validators.max(400)]],
    heightCm: [null, [Validators.min(20), Validators.max(250)]],
    physicalExamination: [''],

    // A - Assessment
    primaryDiagnosisCode: ['Z00.0', [Validators.required]],
    primaryDiagnosisDescription: [
      'Examen médico general de rutina del adulto',
      [Validators.required, Validators.minLength(3)],
    ],
    clinicalImpression: [''],

    // P - Plan
    treatmentPlan: [''],
    followUpInstructions: [''],
    followUpDate: [''],
  });

  // Real-time BMI calculation signal
  readonly computedBmi = computed<{
    value: number | null;
    label: string;
    badgeClass: string;
  }>(() => {
    const weight = this.encounterForm.get('weightKg')?.value;
    const height = this.encounterForm.get('heightCm')?.value;
    if (!weight || !height || height <= 0 || weight <= 0) {
      return { value: null, label: 'Pendiente de datos', badgeClass: 'badge-neutral' };
    }
    const heightM = height / 100;
    const bmi = Number((weight / (heightM * heightM)).toFixed(2));
    if (bmi < 18.5) {
      return { value: bmi, label: 'Bajo peso (< 18.5)', badgeClass: 'badge-warning' };
    } else if (bmi < 25.0) {
      return {
        value: bmi,
        label: 'Peso normal / Eutrófico (18.5 - 24.9)',
        badgeClass: 'badge-success',
      };
    } else if (bmi < 30.0) {
      return { value: bmi, label: 'Sobrepeso (25.0 - 29.9)', badgeClass: 'badge-warning' };
    } else {
      return { value: bmi, label: 'Obesidad (≥ 30.0)', badgeClass: 'badge-danger' };
    }
  });

  ngOnInit(): void {
    const docSpec = this.doctorSpecialtyService.activeSpecialty();
    if (docSpec && docSpec !== 'GENERAL_MEDICINE') {
      this.selectedSpecialty.set(docSpec);
    }
    this.loadSchemaForSpecialty(this.selectedSpecialty());
    this.applyDefaultDiagnosisForSpecialty(this.selectedSpecialty());
  }

  private openedAt = 0;
  private backdropMouseDown = false;

  @HostListener('window:open-new-encounter-modal', ['$event'])
  openModal(event?: Event): void {
    this.openedAt = Date.now();
    const customEvent = event as CustomEvent | undefined;
    const detail = customEvent?.detail;
    if (detail?.patientId && detail.patientId !== this.activePatientService.patientId()) {
      this.activePatientService.loadPatient(detail.patientId);
    }
    const docSpec = this.doctorSpecialtyService.activeSpecialty();
    const targetSpec = detail?.specialty || docSpec || this.selectedSpecialty();
    this.selectedSpecialty.set(targetSpec);
    this.loadSchemaForSpecialty(targetSpec);
    this.applyDefaultDiagnosisForSpecialty(targetSpec);
    this.isOpen.set(true);
    this.errorMessage.set(null);
    this.isSubmitting.set(false);
    this.activeSoapTab.set('S');
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.isOpen() && !this.isSubmitting()) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.isOpen.set(false);
    this.resetForm();
  }

  onBackdropMouseDown(event: MouseEvent): void {
    this.backdropMouseDown = event.target === event.currentTarget;
  }

  onBackdropClick(event: MouseEvent): void {
    if (Date.now() - this.openedAt < 300) {
      return;
    }
    if (this.backdropMouseDown && event.target === event.currentTarget && !this.isSubmitting()) {
      this.closeModal();
    }
    this.backdropMouseDown = false;
  }

  setSoapTab(tab: 'S' | 'O' | 'A' | 'P' | 'SPECIALTY'): void {
    this.activeSoapTab.set(tab);
  }

  applyDefaultDiagnosisForSpecialty(specialty?: MedicalSpecialty | null): void {
    if (specialty === 'PEDIATRICS') {
      this.encounterForm.patchValue({
        primaryDiagnosisCode: 'Z00.1',
        primaryDiagnosisDescription: 'Control de salud infantil y desarrollo (Pediatría)',
      });
    } else if (specialty === 'CARDIOLOGY') {
      this.encounterForm.patchValue({
        primaryDiagnosisCode: 'I10',
        primaryDiagnosisDescription: 'Hipertensión esencial (primaria)',
      });
    } else if (specialty === 'DERMATOLOGY') {
      this.encounterForm.patchValue({
        primaryDiagnosisCode: 'L20.9',
        primaryDiagnosisDescription: 'Dermatitis atópica no especificada',
      });
    } else if (specialty === 'OPHTHALMOLOGY') {
      this.encounterForm.patchValue({
        primaryDiagnosisCode: 'H52.1',
        primaryDiagnosisDescription: 'Miopía',
      });
    } else {
      this.encounterForm.patchValue({
        primaryDiagnosisCode: 'Z00.0',
        primaryDiagnosisDescription: 'Examen médico general de rutina del adulto',
      });
    }
  }

  loadSchemaForSpecialty(specialty: MedicalSpecialty): void {
    this.specialtySchemaService.getSchema(specialty).subscribe({
      next: (schema) => {
        this.currentSchema.set(schema);
      },
      error: () => {
        this.currentSchema.set(null);
      },
    });
  }

  selectDiagnosisPreset(preset: DiagnosisPreset): void {
    this.encounterForm.patchValue({
      primaryDiagnosisCode: preset.code,
      primaryDiagnosisDescription: preset.description,
    });
  }

  // Secondary Diagnoses management
  addSecondaryDiagnosis(): void {
    const code = this.newSecondaryCode().trim();
    const desc = this.newSecondaryDesc().trim();
    if (!code || !desc) return;
    this.secondaryDiagnoses.update((list) => [
      ...list,
      { code, description: desc, isChronic: this.newSecondaryChronic() },
    ]);
    this.newSecondaryCode.set('');
    this.newSecondaryDesc.set('');
    this.newSecondaryChronic.set(false);
  }

  removeSecondaryDiagnosis(index: number): void {
    this.secondaryDiagnoses.update((list) => list.filter((_, i) => i !== index));
  }

  // Prescriptions management
  addPrescription(): void {
    const drug = this.newRxDrug().trim();
    const dose = this.newRxDose().trim();
    if (!drug || !dose) return;
    const item: PrescriptionItem = {
      medicationName: drug,
      dosage: dose,
      administrationRoute: this.newRxRoute(),
      frequency: this.newRxFreq(),
      durationDays: this.newRxDuration(),
      instructions: this.newRxInstructions().trim() || undefined,
    };
    this.prescriptions.update((list) => [...list, item]);
    this.newRxDrug.set('');
    this.newRxDose.set('');
    this.newRxDuration.set(null);
    this.newRxInstructions.set('');
  }

  removePrescription(index: number): void {
    this.prescriptions.update((list) => list.filter((_, i) => i !== index));
  }

  // Diagnostic Orders management
  addDiagnosticOrder(): void {
    const order = this.newDiagnosticOrder().trim();
    if (!order) return;
    this.diagnosticOrders.update((list) => [...list, order]);
    this.newDiagnosticOrder.set('');
  }

  removeDiagnosticOrder(index: number): void {
    this.diagnosticOrders.update((list) => list.filter((_, i) => i !== index));
  }

  copyPreviousMeasurements(): void {
    const latest = this.activePatientService.latestMeasurements();
    if (latest) {
      this.encounterForm.patchValue({
        weightKg: latest.weight != null ? latest.weight : null,
        heightCm: latest.height != null ? latest.height : null,
      });
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.encounterForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  resetForm(): void {
    this.encounterForm.reset({
      encounterDate: this.todayDate,
      consultationType: 'FIRST_VISIT',
      chiefComplaint: '',
      historyOfPresentIllness: '',
      systolicBloodPressure: null,
      diastolicBloodPressure: null,
      heartRate: null,
      respiratoryRate: null,
      temperatureCelsius: null,
      oxygenSaturationPercent: null,
      weightKg: null,
      heightCm: null,
      physicalExamination: '',
      primaryDiagnosisCode: 'Z00.0',
      primaryDiagnosisDescription: 'Examen médico general de rutina del adulto',
      clinicalImpression: '',
      treatmentPlan: '',
      followUpInstructions: '',
      followUpDate: '',
    });
    this.applyDefaultDiagnosisForSpecialty(this.doctorSpecialtyService.activeSpecialty());
    this.secondaryDiagnoses.set([]);
    this.prescriptions.set([]);
    this.diagnosticOrders.set([]);
    this.specialtyDataModel.set({});
    this.errorMessage.set(null);
    this.isSubmitting.set(false);
  }

  onSubmit(): void {
    const patientId = this.activePatientService.patientId();
    if (!patientId) {
      this.errorMessage.set(
        'Debe seleccionar o cargar un paciente antes de registrar una consulta clínica.'
      );
      return;
    }

    if (this.encounterForm.invalid) {
      this.encounterForm.markAllAsTouched();
      this.errorMessage.set(
        'Por favor complete los campos obligatorios del protocolo SOAP (Motivo de consulta y Diagnóstico principal).'
      );
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const formVal = this.encounterForm.getRawValue();
    const bmiVal = this.computedBmi().value;

    const payload: ClinicalEncounterRequest = {
      patientId,
      encounterDate: formVal.encounterDate ?? this.todayDate,
      specialty: this.selectedSpecialty(),
      consultationType: formVal.consultationType ?? 'FIRST_VISIT',

      // S - Subjective
      chiefComplaint: formVal.chiefComplaint.trim(),
      historyOfPresentIllness: formVal.historyOfPresentIllness?.trim() || undefined,

      // O - Objective
      vitalSigns: {
        systolicBloodPressure:
          formVal.systolicBloodPressure != null ? Number(formVal.systolicBloodPressure) : null,
        diastolicBloodPressure:
          formVal.diastolicBloodPressure != null ? Number(formVal.diastolicBloodPressure) : null,
        heartRate: formVal.heartRate != null ? Number(formVal.heartRate) : null,
        respiratoryRate:
          formVal.respiratoryRate != null ? Number(formVal.respiratoryRate) : null,
        temperatureCelsius:
          formVal.temperatureCelsius != null ? Number(formVal.temperatureCelsius) : null,
        oxygenSaturationPercent:
          formVal.oxygenSaturationPercent != null
            ? Number(formVal.oxygenSaturationPercent)
            : null,
        weightKg: formVal.weightKg != null ? Number(formVal.weightKg) : null,
        heightCm: formVal.heightCm != null ? Number(formVal.heightCm) : null,
        bodyMassIndex: bmiVal,
      },
      physicalExamination: formVal.physicalExamination?.trim() || undefined,

      // A - Assessment
      primaryDiagnosisCode: formVal.primaryDiagnosisCode.trim(),
      primaryDiagnosisDescription: formVal.primaryDiagnosisDescription.trim(),
      secondaryDiagnoses:
        this.secondaryDiagnoses().length > 0 ? this.secondaryDiagnoses() : undefined,
      clinicalImpression: formVal.clinicalImpression?.trim() || undefined,

      // P - Plan
      treatmentPlan: formVal.treatmentPlan?.trim() || undefined,
      prescriptions: this.prescriptions().length > 0 ? this.prescriptions() : undefined,
      diagnosticOrders:
        this.diagnosticOrders().length > 0 ? this.diagnosticOrders() : undefined,
      followUpInstructions: formVal.followUpInstructions?.trim() || undefined,
      followUpDate: formVal.followUpDate || undefined,

      // 20% Dynamic Specialty Payload
      specialtyData:
        Object.keys(this.specialtyDataModel()).length > 0
          ? this.specialtyDataModel()
          : undefined,
    };

    this.encounterService.create(payload).subscribe({
      next: (created) => {
        this.isSubmitting.set(false);

        if (isPlatformBrowser(this.platformId)) {
          window.dispatchEvent(
            new CustomEvent('encounter-created', { detail: created })
          );
        }

        // Refresh active patient state if needed
        if (this.activePatientService.patientId() === patientId) {
          this.activePatientService.loadPatient(patientId);
        }

        this.closeModal();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        const serverMsg =
          err?.error?.message ||
          err?.error?.detail ||
          err?.message ||
          'Error al registrar la consulta clínica en el servidor.';
        this.errorMessage.set(serverMsg);
      },
    });
  }
}
