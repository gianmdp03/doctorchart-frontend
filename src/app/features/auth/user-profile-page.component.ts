import { doctorPrintIdentity } from '../../core/models/doctor-print-identity';
import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DoctorProfileService } from '../../core/services/doctor-profile.service';

@Component({
  selector: 'app-user-profile-page',
  imports: [RouterLink],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.css',
})
export class UserProfilePageComponent {
  readonly authService = inject(AuthService);
  readonly doctorSpecialtyService = inject(DoctorSpecialtyService);
  private readonly activePatientService = inject(ActivePatientService);
  private readonly doctorProfileService = inject(DoctorProfileService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly router = inject(Router);

  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  readonly user = computed(() => this.authService.currentUser());

  readonly fullName = computed(() => {
    return this.authService.userName();
  });

  readonly email = computed(() => {
    return this.authService.userEmail() || 'usuario@doctorchart.app';
  });

  readonly dni = computed(() => {
    const user = this.user();
    return (user?.user_metadata?.['dni'] as string) || 'No especificado';
  });

  readonly role = computed(() => {
    const user = this.user();
    return (user?.user_metadata?.['role'] as string) || 'Médico Especialista';
  });

  readonly license = computed(() => doctorPrintIdentity(this.user()?.user_metadata).license || 'No informada');

  readonly initials = computed(() => {
    const name = this.fullName();
    if (!name) return 'DC';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  });

  async handleSignOut(): Promise<void> {
    if (this.isSubmitting()) return;
    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      const { error } = await this.authService.signOut();
      if (error) {
        this.errorMessage.set(error.message || 'Error al cerrar sesión.');
        this.isSubmitting.set(false);
        return;
      }
      this.activePatientService.clear();
      this.doctorProfileService.clearProfile();

      if (isPlatformBrowser(this.platformId)) {
        window.dispatchEvent(new CustomEvent('auth-signout'));
      }

      void this.router.navigate(['/login']);
    } catch (err: unknown) {
      this.isSubmitting.set(false);
      const msg = err instanceof Error ? err.message : 'Error inesperado al cerrar sesión.';
      this.errorMessage.set(msg);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
