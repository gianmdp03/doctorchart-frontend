import { doctorPrintIdentity } from '../../core/models/doctor-print-identity';
import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  HostListener,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DoctorProfileService } from '../../core/services/doctor-profile.service';

@Component({
  selector: 'app-user-profile-dialog',
  imports: [],
  templateUrl: './user-profile-dialog.component.html',
  styleUrl: './user-profile-dialog.component.css',
})
export class UserProfileDialogComponent {
  readonly authService = inject(AuthService);
  readonly doctorSpecialtyService = inject(DoctorSpecialtyService);
  private readonly activePatientService = inject(ActivePatientService);
  private readonly doctorProfileService = inject(DoctorProfileService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly isLocallyOpen = signal<boolean>(false);
  readonly isOpen = computed(() => this.isLocallyOpen() || this.authService.isProfileModalOpen());

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

  @HostListener('window:open-profile-modal')
  openModal(): void {
    this.isLocallyOpen.set(true);
    this.authService.openProfileModal();
    this.errorMessage.set(null);
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.isOpen() && !this.isSubmitting()) {
      this.closeModal();
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget && !this.isSubmitting()) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.isLocallyOpen.set(false);
    this.authService.closeProfileModal();
    this.errorMessage.set(null);
  }

  async handleSignOut(): Promise<void> {
    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      this.activePatientService.clear();
      this.doctorProfileService.clearProfile();
      const { error } = await this.authService.signOut();
      if (error) {
        this.errorMessage.set(error.message || 'Error al cerrar sesión.');
        this.isSubmitting.set(false);
        return;
      }

      if (isPlatformBrowser(this.platformId)) {
        window.dispatchEvent(new CustomEvent('auth-signout'));
      }

      this.closeModal();
    } catch (err: unknown) {
      this.isSubmitting.set(false);
      const msg = err instanceof Error ? err.message : 'Error inesperado al cerrar sesión.';
      this.errorMessage.set(msg);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
