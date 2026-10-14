import { takeUntil } from 'rxjs';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { AccountReadScope } from '../../core/services/account-read-scope';
import { displayLocalDate } from '../../core/date/display-date';
import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideSearch,
  lucideUser,
  lucideLogOut,
  lucideExternalLink,
  lucideShield,
  lucideStethoscope,
  lucideUserPlus,
  lucideX,
  lucideSliders,
  lucideType,
} from '@ng-icons/lucide';
import { AuthService } from '../../core/services/auth.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { PatientService } from '../../core/services/patient.service';
import { DoctorProfileService } from '../../core/services/doctor-profile.service';
import { AccessibilityService } from '../../core/services/accessibility.service';
import { PatientListDTO } from '../../core/models/patient.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  imports: [NgIcon, ThemeToggleComponent],
  providers: [
    provideIcons({
      lucideSearch,
      lucideUser,
      lucideLogOut,
      lucideExternalLink,
      lucideShield,
      lucideStethoscope,
      lucideUserPlus,
      lucideX,
      lucideSliders,
      lucideType,
    }),
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnDestroy {
  readonly authService = inject(AuthService);
  readonly activePatientService = inject(ActivePatientService);
  private readonly patientService = inject(PatientService);
  readonly doctorProfileService = inject(DoctorProfileService);
  readonly accessibilityService = inject(AccessibilityService);
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef);

  readonly searchInputRef = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly searchQuery = signal('');
  readonly searchResults = signal<PatientListDTO[]>([]);
  readonly isSearching = signal(false);
  readonly searchError = signal<string | null>(null);
  readonly displayDate = displayLocalDate;
  readonly isSearchOpen = signal(false);
  readonly isProfileMenuOpen = signal(false);

  readonly bycodePlansUrl = environment.bycodePlansUrl;

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly searchReads = new AccountReadScope(() => this.clearSearch());

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

  @HostListener('window:keydown', ['$event'])
  handleGlobalShortcut(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      const input = this.searchInputRef()?.nativeElement;
      if (input) {
        input.focus();
        input.select();
      }
    } else if (event.key === 'Escape') {
      this.isSearchOpen.set(false);
      this.isProfileMenuOpen.set(false);
    }
  }

  onSearchInput(event: Event): void {
    this.search((event.target as HTMLInputElement).value);
  }
  retrySearch(): void { this.search(this.searchQuery()); }
  private search(q: string): void {
    if (this.authService.isSuperAdmin()) { this.clearSearch(); return; }
    const current = this.searchReads.begin();
    this.searchResults.set([]); this.searchError.set(null);
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
      if (!current() || this.authService.isSuperAdmin() || !this.searchReads.authenticated()) { this.isSearching.set(false); return; }
      this.patientService.getPatients(0, 8, 'fullName,asc', q.trim()).pipe(takeUntil(this.searchReads.canceled)).subscribe({
        next: (res) => {
          if (!current()) return;
          this.searchResults.set(res?.content || []);
          this.isSearching.set(false);
        },
        error: () => {
          if (!current()) return;
          this.searchError.set('No se pudo realizar la búsqueda.');
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
    this.clearSearch();
    this.router.navigate(['/pacientes', patient.id]);
  }

  clearSearch(event?: Event): void {
    this.searchReads.cancel();
    if (this.debounceTimer) { clearTimeout(this.debounceTimer); this.debounceTimer = null; }
    this.isSearching.set(false);
    this.searchError.set(null);
    if (event) event.stopPropagation();
    this.searchQuery.set('');
    this.searchResults.set([]);
    this.isSearchOpen.set(false);
  }

  toggleProfileMenu(event: Event): void {
    event.stopPropagation();
    this.isProfileMenuOpen.update((v) => !v);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.isSearchOpen.set(false);
      this.isProfileMenuOpen.set(false);
    }
  }

  handleProfileClick(): void {
    this.isProfileMenuOpen.set(false);
    this.authService.openProfileModal();
    window.dispatchEvent(new CustomEvent('open-profile-modal'));
  }

  openWizardConfig(): void {
    this.isProfileMenuOpen.set(false);
    this.router.navigate([this.authService.isSuperAdmin() ? '/admin/especialidades' : '/onboarding/setup']);
  }

  ngOnDestroy(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  }

  async handleSignOut(): Promise<void> {
    this.isProfileMenuOpen.set(false);
    await this.authService.signOut();
  }
}
