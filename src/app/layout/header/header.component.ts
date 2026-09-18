import { Component, computed, ElementRef, HostListener, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { PatientService } from '../../core/services/patient.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { PatientListDTO } from '../../core/models/patient.model';
import { DoctorProfileService } from '../../core/services/doctor-profile.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  readonly authService = inject(AuthService);
  readonly activePatientService = inject(ActivePatientService);
  private readonly patientService = inject(PatientService);
  readonly doctorSpecialtyService = inject(DoctorSpecialtyService);
  readonly doctorProfileService = inject(DoctorProfileService);
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef);

  readonly searchQuery = signal('');
  readonly searchResults = signal<PatientListDTO[]>([]);
  readonly isSearching = signal(false);
  readonly isSearchOpen = signal(false);
  readonly syntahPlansUrl = environment.syntahPlansUrl;

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  readonly planBadgeLabel = computed<string | null>(() => {
    if (!this.authService.hasDoctorchartPlan()) {
      return null;
    }
    const tier = this.authService.doctorchartPlanTier();
    if (tier === 'SUPER_ADMIN') {
      return 'Super Admin';
    }
    if (tier) {
      return `Plan ${tier}`;
    }
    return 'Plan Activo';
  });

  readonly clinicianInitials = computed(() => {
    if (this.authService.isLoggedIn()) {
      const name = this.authService.userName();
      if (name) {
        const parts = name.trim().split(/\s+/);
        if (parts.length >= 2) {
          return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
      }
    }
    return 'DC';
  });

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const q = target.value;
    this.searchQuery.set(q);

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    if (!q || !q.trim()) {
      this.searchResults.set([]);
      this.isSearchOpen.set(false);
      this.isSearching.set(false);
      return;
    }

    this.isSearching.set(true);
    this.isSearchOpen.set(true);

    this.debounceTimer = setTimeout(() => {
      this.patientService.getPatients(0, 8, 'fullName,asc', q.trim()).subscribe({
        next: (res) => {
          this.searchResults.set(res?.content || []);
          this.isSearching.set(false);
        },
        error: (err) => {
          console.warn('Search patients error:', err);
          this.searchResults.set([]);
          this.isSearching.set(false);
        },
      });
    }, 250);
  }

  onSearchFocus(): void {
    if (this.searchQuery().trim().length > 0) {
      this.isSearchOpen.set(true);
    }
  }

  selectPatient(patient: PatientListDTO): void {
    this.activePatientService.loadPatient(patient.id);
    this.isSearchOpen.set(false);
    this.searchQuery.set('');
    this.router.navigate(['/ficha']);
  }

  clearSearch(event?: Event): void {
    if (event) event.stopPropagation();
    this.searchQuery.set('');
    this.searchResults.set([]);
    this.isSearchOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.isSearchOpen.set(false);
    }
  }

  handleClinicianBadgeClick(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.openProfileModal();
      window.dispatchEvent(new CustomEvent('open-profile-modal'));
    } else {
      this.authService.openLoginModal();
      window.dispatchEvent(new CustomEvent('open-login-modal'));
    }
  }

  handleLoginClick(event?: Event): void {
    event?.stopPropagation();
    this.authService.openLoginModal();
    window.dispatchEvent(new CustomEvent('open-login-modal'));
  }

  handleNewPatientClick(event?: Event): void {
    event?.stopPropagation();
    this.isSearchOpen.set(false);
    window.dispatchEvent(new CustomEvent('open-new-patient-modal'));
  }

  handleNewCheckupClick(event?: Event): void {
    event?.stopPropagation();
    window.dispatchEvent(new CustomEvent('open-new-checkup-modal'));
  }

  handleNewEncounterClick(event?: Event): void {
    event?.stopPropagation();
    const specialty = this.doctorSpecialtyService.activeSpecialty();
    window.dispatchEvent(
      new CustomEvent('open-new-encounter-modal', {
        detail: {
          patientId: this.activePatientService.patientId(),
          specialty,
        },
      })
    );
  }
}

