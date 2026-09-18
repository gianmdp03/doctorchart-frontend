import {
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../../core/services/patient.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { PatientRequestDTO } from '../../core/models/patient.model';

@Component({
  selector: 'app-new-patient-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './new-patient-dialog.component.html',
  styleUrl: './new-patient-dialog.component.css',
})
export class NewPatientDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly patientService = inject(PatientService);
  private readonly activePatientService = inject(ActivePatientService);
  readonly doctorSpecialtyService = inject(DoctorSpecialtyService);
  private readonly router = inject(Router);

  readonly isOpen = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  readonly isPediatricDetailsOpen = signal<boolean>(true);

  readonly maxDate = new Date().toISOString().split('T')[0];

  readonly patientForm = this.fb.group({
    // Bloque 1: Datos Personales del Paciente (Universales)
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    birthDate: ['', [Validators.required]],
    nationalId: [''],
    gender: ['MALE'],
    bloodType: [''],
    phone: [''],
    email: [''],
    address: [''],

    // Cobertura Médica (Universal)
    insuranceProvider: [''],
    insurancePlan: [''],
    insuranceNumber: [''],

    // Contacto de Emergencia (Universal)
    emergencyContactName: [''],
    emergencyContactPhone: [''],
    emergencyContactRelationship: [''],

    // Bloque 2: Adultos Responsables (Solo Pediátrico)
    firstGuardianFullName: [''],
    firstGuardianPhone: [''],
    firstGuardianNationalId: [''],
    secondGuardianFullName: [''],
    secondGuardianPhone: [''],
    secondGuardianNationalId: [''],

    // Bloque 3: Antecedentes del Embarazo y Nacimiento (Pediátricos)
    gestationCount: [1, [Validators.min(1), Validators.max(20)]],
    prenatalVisitsSummary: ['Controles completos y adecuados'],
    compPreeclampsia: [false],
    compDiabetes: [false],
    compPrematuro: [false],
    compColestasis: [false],
    compInfeccion: [false],
    compOtras: [false],
    pregnancyComplicationsNotes: [''],

    // Bloque 4: Medidas Antropométricas al Nacer
    birthWeight: [null as number | null, [Validators.min(0.1)]],
    birthHeight: [null as number | null, [Validators.min(10)]],
    birthHeadCircumference: [null as number | null, [Validators.min(10)]],

    // Bloque 5: Antecedentes Médicos Personales
    chronicOrPreviousDiseases: [''],
    hospitalizationsOrSurgeries: [''],
    allergies: [''],
    habitualMedication: [''],

    // Bloque 6: Antecedentes Médicos Familiares
    familyChronicDiseases: [''],
    familyAllergies: [''],
    geneticDiseases: [''],

    // Bloque 7: Alimentación y Vacunación
    feedingDiet: ['Lactancia materna exclusiva (LME)'],
    vaccinationHistory: ['Al día según Calendario Nacional'],
    developmentalMilestones: ['Hitos motores y madurativos acordes a la edad cronológica'],

    // Bloque 8: Medidas Antropométricas Actuales
    currentWeight: [null as number | null, [Validators.min(0.1)]],
    currentHeight: [null as number | null, [Validators.min(10)]],
    currentHeadCircumference: [null as number | null, [Validators.min(10)]],
  });


  private openedAt = 0;
  private backdropMouseDown = false;

  @HostListener('window:open-new-patient-modal')
  openModal(): void {
    this.openedAt = Date.now();
    this.isOpen.set(true);
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

  isInvalid(controlName: string): boolean {
    const control = this.patientForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  copyBirthToCurrent(): void {
    const weight = this.patientForm.get('birthWeight')?.value;
    const height = this.patientForm.get('birthHeight')?.value;
    const headCircumference = this.patientForm.get('birthHeadCircumference')?.value;

    this.patientForm.patchValue({
      currentWeight: weight,
      currentHeight: height,
      currentHeadCircumference: headCircumference,
    });
  }

  resetForm(): void {
    this.patientForm.reset({
      fullName: '',
      birthDate: '',
      nationalId: '',
      gender: 'MALE',
      bloodType: '',
      phone: '',
      email: '',
      address: '',
      insuranceProvider: '',
      insurancePlan: '',
      insuranceNumber: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelationship: '',
      firstGuardianFullName: '',
      firstGuardianPhone: '',
      firstGuardianNationalId: '',
      secondGuardianFullName: '',
      secondGuardianPhone: '',
      secondGuardianNationalId: '',
      gestationCount: 1,
      prenatalVisitsSummary: 'Controles completos y adecuados',
      compPreeclampsia: false,
      compDiabetes: false,
      compPrematuro: false,
      compColestasis: false,
      compInfeccion: false,
      compOtras: false,
      pregnancyComplicationsNotes: '',
      birthWeight: null,
      birthHeight: null,
      birthHeadCircumference: null,
      chronicOrPreviousDiseases: '',
      hospitalizationsOrSurgeries: '',
      allergies: '',
      habitualMedication: '',
      familyChronicDiseases: '',
      familyAllergies: '',
      geneticDiseases: '',
      feedingDiet: 'Lactancia materna exclusiva (LME)',
      vaccinationHistory: 'Al día según Calendario Nacional',
      developmentalMilestones: 'Hitos motores y madurativos acordes a la edad cronológica',
      currentWeight: null,
      currentHeight: null,
      currentHeadCircumference: null,
    });
    this.errorMessage.set(null);
    this.isSubmitting.set(false);
  }

  onSubmit(): void {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      this.errorMessage.set('Por favor complete todos los campos obligatorios marcados con (*).');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const formVal = this.patientForm.getRawValue();
    const isPediatric = this.doctorSpecialtyService.isPediatricMode();

    const emergencyContact = formVal.emergencyContactName?.trim()
      ? {
          fullName: formVal.emergencyContactName.trim(),
          phone: formVal.emergencyContactPhone?.trim() || null,
          relationship: formVal.emergencyContactRelationship?.trim() || null,
        }
      : null;

    const insuranceInfo = formVal.insuranceProvider?.trim()
      ? {
          providerName: formVal.insuranceProvider.trim(),
          planName: formVal.insurancePlan?.trim() || null,
          affiliateNumber: formVal.insuranceNumber?.trim() || null,
        }
      : null;

    const allergies = this.parseList(formVal.allergies);
    const chronicConditions = this.parseList(formVal.chronicOrPreviousDiseases);

    // Complicaciones del embarazo
    const complications: string[] = [];
    if (formVal.compPreeclampsia) complications.push('Hipertensión / Preeclampsia');
    if (formVal.compDiabetes) complications.push('Diabetes gestacional');
    if (formVal.compPrematuro) complications.push('Parto prematuro');
    if (formVal.compColestasis) complications.push('Colestasis gravídica');
    if (formVal.compInfeccion) complications.push('Infección urinaria / RPM');
    if (formVal.compOtras) complications.push('Otras complicaciones');
    if (formVal.pregnancyComplicationsNotes?.trim()) {
      const extra = this.parseList(formVal.pregnancyComplicationsNotes);
      complications.push(...extra);
    }

    const payload: PatientRequestDTO = {
      fullName: (formVal.fullName ?? '').trim(),
      birthDate: formVal.birthDate ?? '',
      nationalId: formVal.nationalId?.trim() || undefined,
      gender: formVal.gender || undefined,
      bloodType: formVal.bloodType?.trim() || undefined,
      phone: formVal.phone?.trim() || formVal.firstGuardianPhone?.trim() || undefined,
      email: formVal.email?.trim() || undefined,
      address: formVal.address?.trim() || undefined,
      emergencyContact,
      insuranceInfo,
      allergies: allergies.length > 0 ? allergies : undefined,
      chronicConditions: chronicConditions.length > 0 ? chronicConditions : undefined,
      guardianInfo: formVal.firstGuardianFullName?.trim()
        ? {
            firstGuardianFullName: formVal.firstGuardianFullName?.trim() || undefined,
            firstGuardianPhone: formVal.firstGuardianPhone?.trim() || undefined,
            firstGuardianNationalId: formVal.firstGuardianNationalId?.trim() || undefined,
            secondGuardianFullName: formVal.secondGuardianFullName?.trim() || undefined,
            secondGuardianPhone: formVal.secondGuardianPhone?.trim() || undefined,
            secondGuardianNationalId: formVal.secondGuardianNationalId?.trim() || undefined,
            address: formVal.address?.trim() || undefined,
          }
        : undefined,
      perinatalHistory: (isPediatric || complications.length > 0 || formVal.prenatalVisitsSummary?.trim())
        ? {
            gestationCount: formVal.gestationCount != null ? Number(formVal.gestationCount) : null,
            prenatalVisitsSummary: formVal.prenatalVisitsSummary?.trim() || undefined,
            pregnancyComplications: complications,
          }
        : undefined,
      personalHistory: {
        chronicOrPreviousDiseases: chronicConditions,
        hospitalizationsOrSurgeries: this.parseList(formVal.hospitalizationsOrSurgeries),
        allergies: allergies,
        habitualMedication: this.parseList(formVal.habitualMedication),
        birthMeasurements: (isPediatric || formVal.birthWeight != null || formVal.birthHeight != null)
          ? {
              weight: formVal.birthWeight != null ? Number(formVal.birthWeight) : null,
              height: formVal.birthHeight != null ? Number(formVal.birthHeight) : null,
              headCircumference: formVal.birthHeadCircumference != null ? Number(formVal.birthHeadCircumference) : null,
            }
          : undefined,
      },
      familyHistory: {
        familyChronicDiseases: this.parseList(formVal.familyChronicDiseases),
        familyAllergies: this.parseList(formVal.familyAllergies),
        geneticDiseases: this.parseList(formVal.geneticDiseases),
      },
      immunizationAndNutrition: (isPediatric || formVal.feedingDiet || formVal.vaccinationHistory)
        ? {
            feedingDiet: formVal.feedingDiet?.trim() || undefined,
            vaccinationHistory: this.parseList(formVal.vaccinationHistory),
            developmentalMilestones: formVal.developmentalMilestones?.trim() || undefined,
          }
        : undefined,
      latestMeasurements: {
        weight: formVal.currentWeight != null ? Number(formVal.currentWeight) : null,
        height: formVal.currentHeight != null ? Number(formVal.currentHeight) : null,
        headCircumference: isPediatric && formVal.currentHeadCircumference != null
          ? Number(formVal.currentHeadCircumference)
          : null,
      },
    };


    this.patientService.createPatient(payload).subscribe({
      next: (createdPatient) => {
        this.isSubmitting.set(false);
        this.activePatientService.setActivePatient(createdPatient);
        window.dispatchEvent(new CustomEvent('patient-created', { detail: createdPatient }));
        this.closeModal();
        this.router.navigate(['/ficha']);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        const serverMsg =
          err?.error?.message ||
          err?.error?.detail ||
          err?.message ||
          'Error al registrar el paciente en el servidor.';
        this.errorMessage.set(serverMsg);
      },
    });
  }

  private parseList(value: string | null | undefined): string[] {
    if (!value) return [];
    return value
      .split(/[\n,;]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }
}
