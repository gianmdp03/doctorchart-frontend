import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpecialtySchemaService } from '../../../core/services/specialty-schema.service';
import { DoctorProfileService } from '../../../core/services/doctor-profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { MedicalSpecialty, SpecialtySummary } from '../../../core/models/specialty.model';

@Component({
  selector: 'app-specialty-selection',
  imports: [CommonModule],
  templateUrl: './specialty-selection.component.html',
  styleUrl: './specialty-selection.component.css',
})
export class SpecialtySelectionComponent implements OnInit {
  private readonly specialtySchemaService = inject(SpecialtySchemaService);
  private readonly doctorProfileService = inject(DoctorProfileService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly specialties = signal<SpecialtySummary[]>([]);
  readonly selectedSpecialty = signal<MedicalSpecialty | null>(null);
  readonly isLoading = signal<boolean>(true);
  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  async handleSignOut(): Promise<void> {
    this.doctorProfileService.clearProfile();
    await this.authService.signOut();
  }

  ngOnInit(): void {
    if (this.doctorProfileService.hasSpecialty()) {
      this.router.navigate(['/pacientes']);
      return;
    }

    this.specialtySchemaService.getSpecialties().subscribe({
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

  select(spec: MedicalSpecialty): void {
    if (this.isSubmitting()) return;
    this.selectedSpecialty.set(spec);
    this.errorMessage.set(null);
  }

  async confirmSpecialty(): Promise<void> {
    const specialty = this.selectedSpecialty();
    if (!specialty || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      await this.doctorProfileService.assignSpecialty(specialty);
      await this.router.navigate(['/pacientes']);
    } catch (err: unknown) {
      console.error('Failed to assign specialty:', err);
      const isConflict = typeof err === 'object' && err !== null && 'status' in err && (err as { status: number }).status === 409;
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
