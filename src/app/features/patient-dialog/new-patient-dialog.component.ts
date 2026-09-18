import {
  Component,
  HostListener,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { PatientService } from '../../core/services/patient.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { PatientRequestDTO } from '../../core/models/patient.model';
import { GuardianInfo } from '../../core/models/clinical-records.model';

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

  readonly maxDate = new Date().toISOString().split('T')[0];

  readonly patientForm = this.fb.group({
    // Bloque 1: Identificación
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    birthDate: ['', [Validators.required]],
    nationalId: [''],
    gender: ['FEMALE'],

    // Bloque 2: Contacto
    phone: [''],
    email: [''],
    address: [''],

    // Bloque 3: Cobertura Médica
    insuranceProvider: [''],
    insurancePlan: [''],
    insuranceNumber: [''],

    // Bloque 4: Contacto de Acompañamiento / Emergencia
    contactName: [''],
    contactPhone: [''],
    contactRelationship: [''],
    contactNationalId: [''],
  });

  private readonly birthDateValue = toSignal(
    this.patientForm.controls.birthDate.valueChanges,
    { initialValue: this.patientForm.controls.birthDate.value }
  );

  readonly isMinor = computed(() => {
    const raw = this.birthDateValue();
    if (!raw) return false;
    const birth = new Date(raw + 'T00:00:00');
    if (isNaN(birth.getTime())) return false;
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
      years--;
    }
    return years < 16;
  });

  readonly contactSectionTitle = computed(() => {
    return this.isMinor()
      ? 'Padre, Madre o Tutor Responsable'
      : 'Contacto de Emergencia / Familiar Directo';
  });

  readonly contactSectionSubtitle = computed(() => {
    return this.isMinor()
      ? 'Datos del adulto o tutor legal a cargo del menor de 16 años.'
      : 'Datos de contacto ante urgencias o familiar directo.';
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

  resetForm(): void {
    this.patientForm.reset({
      fullName: '',
      birthDate: '',
      nationalId: '',
      gender: 'FEMALE',
      phone: '',
      email: '',
      address: '',
      insuranceProvider: '',
      insurancePlan: '',
      insuranceNumber: '',
      contactName: '',
      contactPhone: '',
      contactRelationship: '',
      contactNationalId: '',
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
    const under16 = this.isMinor();

    const insuranceInfo = formVal.insuranceProvider?.trim()
      ? {
          providerName: formVal.insuranceProvider.trim(),
          planName: formVal.insurancePlan?.trim() || null,
          affiliateNumber: formVal.insuranceNumber?.trim() || null,
        }
      : null;

    const emergencyContact = formVal.contactName?.trim()
      ? {
          contactName: formVal.contactName.trim(),
          phone: formVal.contactPhone?.trim() || null,
          relationship: formVal.contactRelationship?.trim() || (under16 ? 'Tutor' : 'Familiar Directo'),
        }
      : null;

    const guardianInfo: GuardianInfo | null = (under16 && formVal.contactName?.trim())
      ? {
          firstGuardianFullName: formVal.contactName.trim(),
          firstGuardianPhone: formVal.contactPhone?.trim() || undefined,
          firstGuardianNationalId: formVal.contactNationalId?.trim() || undefined,
          address: formVal.address?.trim() || undefined,
        }
      : null;

    const payload: PatientRequestDTO = {
      fullName: (formVal.fullName ?? '').trim(),
      birthDate: formVal.birthDate ?? '',
      nationalId: formVal.nationalId?.trim() || null,
      gender: formVal.gender || null,
      phone: formVal.phone?.trim() || (under16 ? formVal.contactPhone?.trim() : null) || null,
      email: formVal.email?.trim() || null,
      address: formVal.address?.trim() || null,
      emergencyContact,
      insuranceInfo,
      guardianInfo,
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
}
