import { takeUntil } from 'rxjs';
import { AccountReadScope } from '../../core/services/account-read-scope';
import { displayLocalDate } from '../../core/date/display-date';
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
  PatientDirectoryFilter,
  PatientListDTO,
} from '../../core/models/patient.model';
import { getTotalElements, getTotalPages } from '../../core/models/api-response.model';

export type PatientGender = 'male' | 'female' | 'other';

export interface PatientCardItem {
  id: number;
  fullName: string;
  birthDate: string;
  initials: string;
  ageDisplay: string;
  ageInMonths: number | null;
  birthDateDisplay: string;
  dni: string;
  rawNationalId: string | null;
  rawPhone: string | null;
  tutor: string;
  lastCheckup: string;
  nextCheckupOrNote: string;
  totalEncounters: number;
  lastEncounterDate?: string | null;
  lastEncounterDateDisplay: string | null;
  badgeText: string;
  badgeClass: string;
  hasPendingVaccine: boolean;
  gender: PatientGender;
  genderLabel: string;
  genderAvatarClass: string;
  detail?: PatientDetailDTO;
}

function extractInitials(fullName: string): string {
  if (!fullName) return 'DP';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return fullName.slice(0, 2).toUpperCase();
}

function resolveGender(gender?: string | null): { gender: PatientGender; label: string; avatarClass: string } {
  if (!gender) {
    return { gender: 'other', label: 'Indefinido', avatarClass: 'avatar-neutral' };
  }
  const val = gender.trim().toUpperCase();
  if (['MALE', 'M', 'MASCULINO', 'VARON', 'VARÓN', 'BOY', 'NIÑO'].includes(val)) {
    return { gender: 'male', label: 'Varón', avatarClass: 'avatar-male' };
  }
  if (['FEMALE', 'F', 'FEMENINO', 'MUJER', 'GIRL', 'NIÑA'].includes(val)) {
    return { gender: 'female', label: 'Mujer', avatarClass: 'avatar-female' };
  }
  return { gender: 'other', label: 'Indefinido', avatarClass: 'avatar-neutral' };
}

function mapDtoToCardItem(dto: PatientListDTO): PatientCardItem {
  const badges = {
    ADULT: 'Adulto',
    NEONATAL: 'Neonatal',
    INFANT: 'Lactante',
    CHILD: 'Niñez',
    ADOLESCENT: 'Adolescente',
    UNKNOWN: '—',
  };
  const badgeText = badges[dto.ageGroup] ?? '—';
  const badgeClass = dto.ageGroup === 'ADULT' ? 'badge-primary' : 'badge-info';
  const genderInfo = resolveGender(dto.gender);
  return {
    id: dto.id,
    fullName: dto.fullName,
    birthDate: dto.birthDate,
    initials: extractInitials(dto.fullName),
    ageDisplay: dto.ageDisplay,
    ageInMonths: dto.ageInMonths,
    birthDateDisplay: displayLocalDate(dto.birthDate),
    dni: dto.nationalId ? `DNI: ${dto.nationalId}` : `ID #${dto.id}`,
    rawNationalId: dto.nationalId || null,
    rawPhone: dto.phone || null,
    tutor: dto.phone ? `Tel: ${dto.phone}` : 'Contacto registrado',
    lastCheckup:
      (dto.totalEncounters ?? 0) > 0
        ? `${dto.totalEncounters} ${(dto.totalEncounters ?? 0) === 1 ? 'control previo' : 'controles previos'}${dto.lastEncounterDate ? ' • Último: ' + displayLocalDate(dto.lastEncounterDate) : ''}`
        : 'Sin controles previos',
    nextCheckupOrNote:
      (dto.totalEncounters ?? 0) === 0 ? '1ª Consulta Pendiente' : 'Control periódico',
    totalEncounters: dto.totalEncounters ?? 0,
    lastEncounterDate: dto.lastEncounterDate ?? null,
    lastEncounterDateDisplay: dto.lastEncounterDate ? displayLocalDate(dto.lastEncounterDate) : null,
    badgeText,
    badgeClass,
    hasPendingVaccine: dto.hasPendingVaccine,
    gender: genderInfo.gender,
    genderLabel: genderInfo.label,
    genderAvatarClass: genderInfo.avatarClass,
  };
}

import { WorkspaceStore } from '../../core/services/workspace.store';

@Component({
  selector: 'app-patient-list',
  imports: [],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css',
})
export class PatientListComponent implements OnInit {
  private readonly patientService = inject(PatientService);
  readonly activePatientService = inject(ActivePatientService);
  readonly doctorSpecialtyService = inject(DoctorSpecialtyService);
  readonly workspaceStore = inject(WorkspaceStore);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly sentinelRef = viewChild<ElementRef<HTMLElement>>('scrollSentinel');

  readonly patients = signal<PatientCardItem[]>([]);
  readonly selectedFilter = signal<PatientDirectoryFilter>('ALL');
  readonly searchQuery = signal<string>('');
  readonly isLoading = signal<boolean>(false);
  readonly isLoadingMore = signal<boolean>(false);
  readonly isColumnsModalOpen = signal<boolean>(false);
  readonly isNewPatientModalOpen = signal<boolean>(false);

  readonly currentPage = signal<number>(0);
  readonly pageSize = 20;
  readonly totalPages = signal<number>(1);
  readonly totalElements = signal<number>(0);

  readonly hasMore = computed(() => this.currentPage() + 1 < this.totalPages());

  readonly visibleColumnsCount = computed(() =>
    this.doctorSpecialtyService.supportsGrowthCharts() ? 7 : 6,
  );

  private searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  private observer: IntersectionObserver | null = null;
  readonly loadError = signal<string | null>(null);
  private readonly reads = new AccountReadScope(() => this.loadInitial());

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.searchDebounceTimer) clearTimeout(this.searchDebounceTimer);
    });
    effect(() => {
      const el = this.sentinelRef()?.nativeElement;
      if (
        !isPlatformBrowser(this.platformId) ||
        !el ||
        typeof IntersectionObserver === 'undefined'
      ) {
        return;
      }
      if (this.observer) {
        this.observer.disconnect();
      }
      this.observer = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            this.hasMore() &&
            !this.isLoadingMore() &&
            !this.isLoading()
          ) {
            this.loadMore();
          }
        },
        { rootMargin: '300px 0px', threshold: 0.01 },
      );
      this.observer.observe(el);
    });
  }

  openColumnsModal(): void {
    this.isColumnsModalOpen.set(true);
  }

  closeColumnsModal(): void {
    this.isColumnsModalOpen.set(false);
  }

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
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
    const current = this.reads.begin();
    this.patients.set([]);
    this.isLoadingMore.set(false);
    this.currentPage.set(0);
    this.totalPages.set(0);
    this.totalElements.set(0);
    this.loadError.set(null);
    if (!this.reads.authenticated()) {
      this.isLoading.set(false);
      return;
    }
    this.isLoading.set(true);
    this.fetchPage(0, search ?? this.searchQuery(), current, false);
  }
  loadMore(): void {
    if (this.isLoadingMore() || !this.hasMore() || this.isLoading() || !this.reads.authenticated())
      return;
    const current = this.reads.begin();
    this.isLoadingMore.set(true);
    this.loadError.set(null);
    this.fetchPage(this.currentPage() + 1, this.searchQuery(), current, true);
  }
  private fetchPage(page: number, query: string, current: () => boolean, append: boolean): void {
    this.patientService
      .getPatients(page, this.pageSize, 'fullName,asc', query, this.selectedFilter())
      .pipe(takeUntil(this.reads.canceled))
      .subscribe({
        next: (response) => {
          if (!current()) return;
          const items = response.content.map(mapDtoToCardItem);
          this.patients.update((existing) =>
            append
              ? [...existing, ...items.filter((item) => !existing.some((p) => p.id === item.id))]
              : items,
          );
          this.currentPage.set(page);
          this.totalPages.set(getTotalPages(response));
          this.totalElements.set(getTotalElements(response));
          this.isLoading.set(false);
          this.isLoadingMore.set(false);
        },
        error: () => {
          if (current()) {
            this.loadError.set('No se pudo cargar el directorio. Reintentá la carga.');
            this.isLoading.set(false);
            this.isLoadingMore.set(false);
          }
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
    this.loadInitial();
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const val = target.value;
    this.searchQuery.set(val);
    this.reads.cancel();

    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }

    this.searchDebounceTimer = setTimeout(() => {
      this.loadInitial(val.trim());
    }, 400);
  }

  onSearchEnter(): void {
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
    this.loadInitial(this.searchQuery().trim());
  }

  clearSearch(): void {
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
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
    this.isNewPatientModalOpen.set(false);
    this.router.navigate(['/pacientes/nuevo']);
  }

  closeNewPatientModal(): void {
    this.isNewPatientModalOpen.set(false);
  }

  onPatientCreated(): void {
    this.closeNewPatientModal();
    this.loadInitial();
  }
}
