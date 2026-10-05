import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SpecialtyService } from '../../../core/services/specialty.service';
import { DoctorProfileService } from '../../../core/services/doctor-profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { SpecialtySummary } from '../../../core/models/specialty.model';
import { WorkspaceStore } from '../../../core/services/workspace.store';

@Component({
  selector: 'app-specialty-selection',
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
  readonly selectedSpecialty = signal<number | null>(null);
  readonly selectedSpecialtyItem = computed(() => this.specialties().find(item => item.id === this.selectedSpecialty()) ?? null);
  readonly expectedVersion = signal<number | null>(null);
  readonly isLoading = signal(true);
  readonly isSubmitting = signal(false);
  readonly hasConflict = signal(false);
  readonly errorMessage = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    await this.loadSpecialties();
  }

  async loadSpecialties(force = false): Promise<void> {
    if (this.isSubmitting()) return;
    this.isLoading.set(true);
    this.errorMessage.set(null);
    try {
      const setup = await this.workspaceStore.loadSetup(force);
      if (setup?.onboardingCompleted) {
        await this.router.navigate(['/dashboard']);
        return;
      }
      if (setup && setup.currentStepKey !== 'specialty') {
        await this.router.navigate(['/onboarding/setup']);
        return;
      }
      const list = await firstValueFrom(this.specialtyService.getSpecialties());
      this.specialties.set(list);
      this.expectedVersion.set(setup?.version ?? null);
      this.selectedSpecialty.set(setup ? list.find(item => item.id === setup.specialty.id)?.id ?? null : list.length === 1 ? list[0].id : null);
      this.hasConflict.set(false);
      if (list.length === 0) this.errorMessage.set('No hay especialidades disponibles. Contactá al administrador.');
    } catch (error: unknown) {
      this.errorMessage.set(this.errorText(error, 'No pudimos cargar las especialidades. Intentá nuevamente.'));
    } finally {
      this.isLoading.set(false);
    }
  }

  select(id: number): void {
    if (this.isSubmitting() || this.hasConflict()) return;
    this.selectedSpecialty.set(id);
    this.errorMessage.set(null);
  }

  async confirmSpecialty(): Promise<void> {
    const specialty = this.selectedSpecialtyItem();
    if (!specialty || this.isSubmitting() || this.hasConflict()) return;
    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    try {
      await this.workspaceStore.selectSpecialty(specialty.id, this.expectedVersion());
      await this.router.navigate(['/onboarding/setup']);
    } catch (error: unknown) {
      const response = error as { status?: number; error?: { code?: string } } | null;
      if (response?.status === 409 && response.error?.code === 'VERSION_CONFLICT') {
        this.hasConflict.set(true);
        this.errorMessage.set('Tu configuración cambió en otra sesión. La selección sigue visible; volvé a cargar para revisar el estado guardado.');
      } else {
        this.errorMessage.set(this.errorText(error, 'No pudimos guardar la especialidad. Revisá tu conexión e intentá nuevamente.'));
      }
    } finally {
      this.isSubmitting.set(false);
    }
  }

  async handleSignOut(): Promise<void> {
    if (this.isSubmitting()) return;
    this.doctorProfileService.clearProfile();
    await this.authService.signOut();
    this.workspaceStore.clearSetup();
  }

  private errorText(error: unknown, fallback: string): string {
    const message = (error as { error?: { message?: unknown } } | null)?.error?.message;
    return typeof message === 'string' ? message : fallback;
  }
}
