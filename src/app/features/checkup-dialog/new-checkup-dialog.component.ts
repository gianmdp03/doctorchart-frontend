import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckupService } from '../../core/services/checkup.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { CheckupReason, MedicalCheckupRequestDTO } from '../../core/models/checkup.model';

@Component({
  selector: 'app-new-checkup-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './new-checkup-dialog.component.html',
  styleUrl: './new-checkup-dialog.component.css',
})
export class NewCheckupDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly checkupService = inject(CheckupService);
  readonly activePatientService = inject(ActivePatientService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly isOpen = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  readonly todayDate = new Date().toISOString().split('T')[0];

  readonly checkupForm = this.fb.group({
    checkupDate: [this.todayDate, [Validators.required]],
    reason: ['ROUTINE' as CheckupReason, [Validators.required]],
    weight: [null as number | null, [Validators.required, Validators.min(0.1), Validators.max(250)]],
    height: [null as number | null, [Validators.required, Validators.min(10), Validators.max(250)]],
    headCircumference: [null as number | null, [Validators.required, Validators.min(10), Validators.max(100)]],
    observations: [''],
    appliedVaccines: [''],
  });

  private openedAt = 0;
  private backdropMouseDown = false;

  @HostListener('window:open-new-checkup-modal', ['$event'])
  openModal(event?: Event): void {
    this.openedAt = Date.now();
    const customEvent = event as CustomEvent | undefined;
    const detail = customEvent?.detail;
    if (detail?.patientId && detail.patientId !== this.activePatientService.patientId()) {
      this.activePatientService.loadPatient(detail.patientId);
    }
    this.isOpen.set(true);
    this.errorMessage.set(null);
    this.isSubmitting.set(false);
    this.populateDefaults(detail);
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
    const control = this.checkupForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  copyPreviousMeasurements(): void {
    const latest = this.activePatientService.latestMeasurements();
    if (latest) {
      this.checkupForm.patchValue({
        weight: latest.weight != null ? latest.weight : null,
        height: latest.height != null ? latest.height : null,
        headCircumference: latest.headCircumference != null ? latest.headCircumference : null,
      });
    }
  }

  private populateDefaults(detail?: any): void {
    const latest = detail?.measurements ?? this.activePatientService.latestMeasurements();
    this.checkupForm.patchValue({
      checkupDate: detail?.checkupDate ?? this.todayDate,
      reason: (detail?.reason as CheckupReason) ?? 'ROUTINE',
      weight: detail?.weight ?? (latest?.weight != null ? latest.weight : null),
      height: detail?.height ?? (latest?.height != null ? latest.height : null),
      headCircumference: detail?.headCircumference ?? (latest?.headCircumference != null ? latest.headCircumference : null),
      observations: detail?.observations ?? '',
      appliedVaccines: detail?.appliedVaccines ?? '',
    });
  }

  resetForm(): void {
    this.checkupForm.reset({
      checkupDate: this.todayDate,
      reason: 'ROUTINE',
      weight: null,
      height: null,
      headCircumference: null,
      observations: '',
      appliedVaccines: '',
    });
    this.errorMessage.set(null);
    this.isSubmitting.set(false);
  }

  onSubmit(): void {
    const patientId = this.activePatientService.patientId();
    if (!patientId) {
      this.errorMessage.set('Debe seleccionar o cargar un paciente antes de registrar un control médico.');
      return;
    }

    if (this.checkupForm.invalid) {
      this.checkupForm.markAllAsTouched();
      this.errorMessage.set('Por favor complete todos los campos obligatorios marcados con (*).');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const formVal = this.checkupForm.getRawValue();

    const payload: MedicalCheckupRequestDTO = {
      patientId,
      checkupDate: formVal.checkupDate ?? this.todayDate,
      reason: (formVal.reason as CheckupReason) ?? 'ROUTINE',
      measurements: {
        weight: formVal.weight != null ? Number(formVal.weight) : null,
        height: formVal.height != null ? Number(formVal.height) : null,
        headCircumference: formVal.headCircumference != null ? Number(formVal.headCircumference) : null,
      },
    };

    this.checkupService.createCheckup(payload).subscribe({
      next: (createdCheckup) => {
        this.isSubmitting.set(false);

        if (isPlatformBrowser(this.platformId)) {
          window.dispatchEvent(
            new CustomEvent('checkup-created', { detail: createdCheckup })
          );
        }

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
          'Error al registrar el control clínico en el servidor.';
        this.errorMessage.set(serverMsg);
      },
    });
  }
}
