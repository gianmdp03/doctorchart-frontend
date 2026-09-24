import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpecialtyService } from '../../../core/services/specialty.service';
import { DoctorProfileService } from '../../../core/services/doctor-profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { MedicalSpecialty, SpecialtySummary } from '../../../core/models/specialty.model';

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

  ngOnInit(): void {
    if (this.doctorProfileService.hasSpecialty()) {
      this.router.navigate(['/pacientes']);
      return;
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
    const specialty = this.selectedSpecialty();
    if (!specialty || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      const normalizedSpecialty = specialty.trim().toUpperCase().replace(/-/g, '_') as MedicalSpecialty;
      await this.doctorProfileService.assignSpecialty(normalizedSpecialty);
      await this.router.navigate(['/pacientes']);
    } catch (err: unknown) {
      console.error('Failed to assign specialty:', err);
      const isConflict =
        typeof err === 'object' &&
        err !== null &&
        'status' in err &&
        (err as { status: number }).status === 409;
      if (isConflict) {
        this.errorMessage.set('La especialidad ya fue configurada previamente y es inmutable.');
        setTimeout(() => this.router.navigate(['/pacientes']), 1500);
      } else {
        this.errorMessage.set('Ocurrió un error al registrar la especialidad. Verifique su conexión y reintente.');
      }
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
