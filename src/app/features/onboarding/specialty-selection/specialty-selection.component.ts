import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpecialtyService } from '../../../core/services/specialty.service';
import { DoctorProfileService } from '../../../core/services/doctor-profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { MedicalSpecialty, SpecialtySummary } from '../../../core/models/specialty.model';
import { WorkspaceStore } from '../../../core/services/workspace.store';
import { createDefaultPatientFormSchema } from '../../../core/config/onboarding-form-definitions';

@Component({
  selector: 'app-specialty-selection',
  imports: [CommonModule, FormsModule],
  templateUrl: './specialty-selection.component.html',
  styleUrl: './specialty-selection.component.css',
})
export class SpecialtySelectionComponent implements OnInit {
  private readonly specialtyService = inject(SpecialtyService);
  private readonly doctorProfileService = inject(DoctorProfileService);
  private readonly authService = inject(AuthService);
  private readonly workspaceStore = inject(WorkspaceStore);
  private readonly router = inject(Router);

  readonly specialties = signal<SpecialtySummary[]>([]);
  readonly selectedSpecialty = signal<MedicalSpecialty | string | null>(null);
  readonly selectedSpecialtyItem = computed(() => {
    const sel = this.selectedSpecialty();
    if (!sel) return null;
    return (
      this.specialties().find(
        (s) => s.code === sel || s.specialty === sel || (s.code && s.code.toUpperCase() === sel.toUpperCase())
      ) || null
    );
  });
  readonly isLoading = signal<boolean>(true);
  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  // Custom Specialty Modal State
  readonly isCustomModalOpen = signal<boolean>(false);
  readonly customName = signal<string>('');
  readonly customDescription = signal<string>('');
  readonly isCreatingCustom = signal<boolean>(false);
  readonly customError = signal<string | null>(null);

  async handleSignOut(): Promise<void> {
    this.doctorProfileService.clearProfile();
    await this.authService.signOut();
  }

  async ngOnInit(): Promise<void> {
    const setup = await this.workspaceStore.loadSetup();
    if (setup?.onboardingCompleted) {
      await this.router.navigate(['/dashboard']);
      return;
    }
    if (setup?.id && setup.specialtyId && setup.onboardingStep !== 'SPECIALTY') {
      await this.router.navigate(['/onboarding/setup']);
      return;
    }
    if (setup?.id && setup.onboardingStep === 'SPECIALTY' && setup.specialtyCode) {
      this.selectedSpecialty.set(setup.specialtyCode);
    }
    this.loadSpecialties();
  }

  loadSpecialties(): void {
    this.specialtyService.getSpecialties().subscribe({
      next: (list) => {
        this.specialties.set(list);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching specialties:', err);
        this.errorMessage.set('No se pudo cargar el catálogo de especialidades. Intente nuevamente.');
        this.isLoading.set(false);
      },
    });
  }

  select(spec: MedicalSpecialty | string): void {
    if (this.isSubmitting()) return;
    this.selectedSpecialty.set(spec);
    this.errorMessage.set(null);
  }

  openCustomSpecialtyModal(): void {
    this.customName.set('');
    this.customDescription.set('');
    this.customError.set(null);
    this.isCustomModalOpen.set(true);
  }

  closeCustomSpecialtyModal(): void {
    this.isCustomModalOpen.set(false);
  }

  createCustomSpecialty(): void {
    const name = this.customName().trim();
    const description = this.customDescription().trim();

    if (!name) {
      this.customError.set('El nombre de la especialidad es obligatorio.');
      return;
    }

    this.isCreatingCustom.set(true);
    this.customError.set(null);

    this.specialtyService.createCustomSpecialty({ name, description }).subscribe({
      next: (created) => {
        this.isCreatingCustom.set(false);
        this.specialties.update((list) => [...list, created]);
        this.selectedSpecialty.set(created.code || null);
        this.closeCustomSpecialtyModal();
      },
      error: (err) => {
        this.isCreatingCustom.set(false);
        this.customError.set(
          err?.error?.message || 'Error al crear la especialidad personalizada.'
        );
      },
    });
  }

  async confirmSpecialty(): Promise<void> {
    const specialty = this.selectedSpecialtyItem();
    if (!specialty?.id || this.isSubmitting()) {
      if (!specialty?.id) {
        this.errorMessage.set('La especialidad seleccionada no tiene un identificador válido. Recargá e intentá nuevamente.');
      }
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      await this.workspaceStore.saveOnboardingDraft({
        specialtyId: specialty.id,
        onboardingStep: 'PATIENT_PERSONAL_DATA',
        onboardingDraft: {
          patientTemplateSchema: createDefaultPatientFormSchema(),
        },
      });
      await this.router.navigate(['/onboarding/setup']);
    } catch (err: unknown) {
      console.error('Failed to assign specialty:', err);
      this.errorMessage.set('Ocurrió un error al guardar la especialidad. Verificá tu conexión y reintentá.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
