import {
  Component,
  OnInit,
  HostListener,
  inject,
  signal,
  computed,
  effect,
  ElementRef,
  viewChild,
  DestroyRef,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { PatientService } from '../../core/services/patient.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import {
  PatientDetailDTO,
  PatientListDTO,
} from '../../core/models/patient.model';
import { getTotalElements, getTotalPages } from '../../core/models/api-response.model';

export type PatientDirectoryFilter =
  | 'ALL'
  | 'ADULT'
  | 'MINOR'
  | 'INFANT'
  | 'TODDLER'
  | 'VACCINE_PENDING';

export interface PatientCardItem {
  id: number;
  fullName: string;
  birthDate: string;
  initials: string;
  ageDisplay: string;
  ageInMonths: number;
  birthDateDisplay: string;
  dni: string;
  tutor: string;
  lastCheckup: string;
  nextCheckupOrNote: string;
  badgeText: string;
  badgeClass: string;
  hasPendingVaccine: boolean;
  detail?: PatientDetailDTO;
}

function parseBirthDate(birthDateStr: string): Date | null {
  if (!birthDateStr) return null;
  const iso = birthDateStr.includes('T') ? birthDateStr : `${birthDateStr}T00:00:00`;
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
}

function calculateAgeMonths(birthDateStr: string): number {
  const birth = parseBirthDate(birthDateStr);
  if (!birth) return 0;
  const now = new Date();
  let months =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());
  if (now.getDate() < birth.getDate()) {
    months--;
  }
  return Math.max(0, months);
}

function formatAgeDisplay(birthDateStr: string): string {
  const birth = parseBirthDate(birthDateStr);
  if (!birth) return '—';
  const now = new Date();
  let months =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());
  if (now.getDate() < birth.getDate()) {
    months--;
  }
  if (months < 0) return 'Recién nacido';
  if (months === 0) {
    const diffTime = Math.abs(now.getTime() - birth.getTime());
    const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    return `${diffDays} días`;
  }
  if (months === 1) return '1 mes';
  if (months < 24) return `${months} meses`;
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  return remMonths > 0 ? `${years} años ${remMonths}m` : `${years} años`;
}

function formatBirthDateDisplay(birthDateStr: string): string {
  const birth = parseBirthDate(birthDateStr);
  if (!birth) return birthDateStr || '—';
  return birth.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function extractInitials(fullName: string): string {
  if (!fullName) return 'DP';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return fullName.slice(0, 2).toUpperCase();
}

function mapDtoToCardItem(dto: PatientListDTO): PatientCardItem {
  const ageMonths = calculateAgeMonths(dto.birthDate);
  const isAdult = ageMonths >= 216; // >= 18 años
  let badgeText = 'Primera Infancia';
  let badgeClass = 'badge-info';

  if (isAdult) {
    badgeText = 'Adulto';
    badgeClass = 'badge-primary';
  } else if (ageMonths <= 1) {
    badgeText = 'Neonatal';
    badgeClass = 'badge-info';
  } else if (ageMonths <= 12) {
    badgeText = 'Lactante';
    badgeClass = 'badge-info';
  } else if (ageMonths <= 144) {
    badgeText = 'Niñez';
    badgeClass = 'badge-info';
  } else {
    badgeText = 'Adolescente';
    badgeClass = 'badge-info';
  }

  return {
    id: dto.id,
    fullName: dto.fullName,
    birthDate: dto.birthDate,
    initials: extractInitials(dto.fullName),
    ageDisplay: formatAgeDisplay(dto.birthDate),
    ageInMonths: ageMonths,
    birthDateDisplay: formatBirthDateDisplay(dto.birthDate),
    dni: dto.nationalId ? `DNI: ${dto.nationalId}` : `ID #${dto.id}`,
    tutor: dto.phone ? `Tel: ${dto.phone}` : 'Contacto registrado',
    lastCheckup: 'Sin controles registrados',
    nextCheckupOrNote: 'Control periódico',
    badgeText,
    badgeClass,
    hasPendingVaccine: false,
  };
}

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css',
})
export class PatientListComponent implements OnInit {
  private readonly patientService = inject(PatientService);
  readonly activePatientService = inject(ActivePatientService);
  readonly doctorSpecialtyService = inject(DoctorSpecialtyService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly sentinelRef = viewChild<ElementRef<HTMLElement>>('scrollSentinel');

  readonly patients = signal<PatientCardItem[]>([]);
  readonly selectedFilter = signal<PatientDirectoryFilter>('ALL');
  readonly searchQuery = signal<string>('');
  readonly isLoading = signal<boolean>(false);
  readonly isLoadingMore = signal<boolean>(false);

  readonly currentPage = signal<number>(0);
  readonly pageSize = 20;
  readonly totalPages = signal<number>(1);
  readonly totalElements = signal<number>(0);

  readonly hasMore = computed(() => this.currentPage() + 1 < this.totalPages());

  private searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  private observer: IntersectionObserver | null = null;

  constructor() {
    effect(() => {
      const el = this.sentinelRef()?.nativeElement;
      if (!isPlatformBrowser(this.platformId) || !el) {
        return;
      }
      if (this.observer) {
        this.observer.disconnect();
      }
      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && this.hasMore() && !this.isLoadingMore() && !this.isLoading()) {
            this.loadMore();
          }
        },
        { rootMargin: '300px 0px', threshold: 0.01 }
      );
      this.observer.observe(el);
    });
  }

  readonly filteredPatients = computed(() => {
    const filter = this.selectedFilter();
    const list = this.patients();

    if (filter === 'ALL') {
      return list;
    }

    return list.filter((patient) => {
      if (filter === 'INFANT') {
        return patient.ageInMonths <= 12;
      }
      if (filter === 'TODDLER') {
        return patient.ageInMonths > 12 && patient.ageInMonths <= 72;
      }
      if (filter === 'VACCINE_PENDING') {
        return patient.hasPendingVaccine;
      }
      if (filter === 'ADULT') {
        return patient.ageInMonths >= 216;
      }
      if (filter === 'MINOR') {
        return patient.ageInMonths < 216;
      }
      return true;
    });
  });

  ngOnInit(): void {
    this.loadInitial();

    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      const handlePatientCreated = () => {
        this.loadInitial();
      };
      const handleAuthChange = () => {
        this.loadInitial();
      };
      window.addEventListener('patient-created', handlePatientCreated);
      window.addEventListener('auth-success', handleAuthChange);
      window.addEventListener('auth-signout', handleAuthChange);

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('patient-created', handlePatientCreated);
        window.removeEventListener('auth-success', handleAuthChange);
        window.removeEventListener('auth-signout', handleAuthChange);
        if (this.observer) {
          this.observer.disconnect();
        }
      });
    }
  }

  loadInitial(search?: string): void {
    this.isLoading.set(true);
    this.currentPage.set(0);
    const query = search !== undefined ? search : this.searchQuery();

    this.patientService.getPatients(0, this.pageSize, 'fullName,asc', query).subscribe({
      next: (response) => {
        if (response?.content && response.content.length > 0) {
          const items = response.content.map(mapDtoToCardItem);
          this.patients.set(items);
        } else {
          this.patients.set([]);
        }
        this.totalPages.set(getTotalPages(response));
        this.totalElements.set(getTotalElements(response));
        this.isLoading.set(false);
      },
      error: (err) => {
        console.warn('Error loading patients:', err);
        this.patients.set([]);
        this.totalPages.set(1);
        this.totalElements.set(0);
        this.isLoading.set(false);
      },
    });
  }

  loadMore(): void {
    if (this.isLoadingMore() || !this.hasMore() || this.isLoading()) {
      return;
    }

    this.isLoadingMore.set(true);
    const nextPage = this.currentPage() + 1;
    const query = this.searchQuery();

    this.patientService.getPatients(nextPage, this.pageSize, 'fullName,asc', query).subscribe({
      next: (response) => {
        if (response?.content && response.content.length > 0) {
          const newItems = response.content.map(mapDtoToCardItem);
          this.patients.update((curr) => {
            // Avoid duplicates by ID
            const existingIds = new Set(curr.map((p) => p.id));
            const unique = newItems.filter((p) => !existingIds.has(p.id));
            return [...curr, ...unique];
          });
        }
        this.currentPage.set(nextPage);
        this.totalPages.set(getTotalPages(response));
        this.totalElements.set(getTotalElements(response));
        this.isLoadingMore.set(false);
      },
      error: (err) => {
        console.warn('Error loading more patients:', err);
        this.isLoadingMore.set(false);
      },
    });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!isPlatformBrowser(this.platformId) || typeof window === 'undefined') {
      return;
    }
    const scrollPos = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.scrollHeight - 350;
    if (scrollPos >= threshold && this.hasMore() && !this.isLoadingMore() && !this.isLoading()) {
      this.loadMore();
    }
  }

  isActive(patientId: number): boolean {
    return this.activePatientService.patientId() === patientId;
  }

  setFilter(filter: PatientDirectoryFilter): void {
    this.selectedFilter.set(filter);
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const val = target.value;
    this.searchQuery.set(val);

    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }

    this.searchDebounceTimer = setTimeout(() => {
      this.loadInitial(val.trim());
    }, 300);
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.loadInitial('');
  }

  resetFilters(): void {
    this.selectedFilter.set('ALL');
    this.searchQuery.set('');
    this.loadInitial('');
  }

  selectPatient(patient: PatientCardItem): void {
    if (patient.detail) {
      this.activePatientService.setActivePatient(patient.detail);
    }
    this.activePatientService.loadPatient(patient.id);
    this.router.navigate(['/pacientes', patient.id]);
  }

  openNewPatientModal(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-new-patient-modal'));
    }
  }
}

