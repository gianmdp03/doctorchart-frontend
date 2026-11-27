import { PhoneDisplayPipe } from '../../shared/phone-input/phone-display.pipe';
import { AsyncPipe } from '@angular/common';
import { takeUntil } from 'rxjs';
import { AccountReadScope } from '../../core/services/account-read-scope';
import { displayLocalDate } from '../../core/date/display-date';
import {
  Component,
  OnInit,
  afterNextRender,
  inject,
  signal,
  computed,
  DestroyRef,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
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
  lastEncounterDisease: string | null;
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

function mapDtoToCardItem(dto: PatientListDTO, pediatrics: boolean): PatientCardItem {
  const badges = {
    ADULT: 'Adulto',
    NEONATAL: pediatrics ? 'Recién nacido' : 'Neonatal',
    INFANT: 'Lactante',
    CHILD: 'Niñez',
    EARLY_CHILDHOOD: 'Primera infancia',
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
    lastEncounterDisease: dto.lastEncounterDisease?.trim() || null,
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
  imports: [RouterLink, PhoneDisplayPipe, AsyncPipe],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css',
})
export class PatientListComponent implements OnInit {
  private readonly patientService = inject(PatientService);
  readonly activePatientService = inject(ActivePatientService);
  readonly doctorSpecialtyService = inject(DoctorSpecialtyService);
  readonly workspaceStore = inject(WorkspaceStore);
  readonly pediatricFilters = ([
    { value: 'NEONATAL', name: 'Recién nacidos', range: '0–27 días', description: 'Desde el nacimiento hasta antes de cumplir 28 días.' },
    { value: 'INFANT', name: 'Lactantes', range: '28 días–<1 año', description: 'Desde los 28 días hasta antes del primer cumpleaños.' },
    { value: 'EARLY_CHILDHOOD', name: 'Primera infancia', range: '1–4 años', description: 'Desde el primer cumpleaños hasta antes de cumplir 5 años.' },
    { value: 'CHILD', name: 'Niñez', range: '5–9 años', description: 'Desde el quinto cumpleaños hasta antes de cumplir 10 años.' },
    { value: 'ADOLESCENT', name: 'Adolescentes', range: '10–19 años', description: 'Desde el décimo cumpleaños hasta antes de cumplir 20 años. Etapa clínica, independiente de la mayoría de edad legal.' },
  ] as const).map(filter => ({ ...filter, label: `${filter.name} (${filter.range})` }));
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly patients = signal<PatientCardItem[]>([]);
  readonly selectedFilter = signal<PatientDirectoryFilter>('ALL');
  readonly searchQuery = signal<string>('');
  readonly diseaseQuery = signal<string>('');
  readonly filtersInitiallyOpen = signal(true);
  readonly isLoading = signal<boolean>(false);

  readonly currentPage = signal<number>(0);
  readonly pageSize = 10;
  readonly totalPages = signal<number>(0);
  readonly totalElements = signal<number>(0);

  readonly hasPreviousPage = computed(() => this.currentPage() > 0);
  readonly hasNextPage = computed(() => this.currentPage() + 1 < this.totalPages());
  readonly rangeStart = computed(() =>
    this.totalElements() === 0 || this.patients().length === 0
      ? 0
      : this.currentPage() * this.pageSize + 1,
  );
  readonly rangeEnd = computed(() =>
    this.totalElements() === 0 || this.patients().length === 0
      ? 0
      : Math.min(this.totalElements(), this.currentPage() * this.pageSize + this.patients().length),
  );
  readonly visiblePages = computed<Array<number | 'ellipsis'>>(() => {
    const total = this.totalPages();
    if (total <= 0) return [];
    if (total <= 7) {
      return Array.from({ length: total }, (_, index) => index);
    }
    const current = this.currentPage();
    const last = total - 1;
    if (current <= 3) {
      return [0, 1, 2, 3, 4, 'ellipsis', last];
    }
    if (current >= last - 3) {
      return [0, 'ellipsis', last - 4, last - 3, last - 2, last - 1, last];
    }
    return [0, 'ellipsis', current - 1, current, current + 1, 'ellipsis', last];
  });

  readonly visibleColumnsCount = computed(() =>
    this.doctorSpecialtyService.supportsGrowthCharts() ? 7 : 6,
  );

  private searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  private requestedPage = 0;
  readonly loadError = signal<string | null>(null);
  private readonly reads = new AccountReadScope(() => {
    // An account change may also change specialty; never reuse an exclusive filter.
    if (['NEONATAL', 'EARLY_CHILDHOOD', 'CHILD', 'ADOLESCENT'].includes(this.selectedFilter())) {
      this.selectedFilter.set('ALL');
    }
    this.loadInitial();
  });

  constructor() {
    afterNextRender(() => this.filtersInitiallyOpen.set(window.innerWidth > 600));
    this.destroyRef.onDestroy(() => {
      if (this.searchDebounceTimer) clearTimeout(this.searchDebounceTimer);
    });
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
    this.currentPage.set(0);
    this.requestedPage = 0;
    this.totalPages.set(0);
    this.totalElements.set(0);
    this.loadError.set(null);
    if (!this.reads.authenticated()) {
      this.isLoading.set(false);
      return;
    }
    this.isLoading.set(true);
    this.fetchPage(0, (search ?? this.searchQuery()).trim(), current, false);
  }

  goToPage(page: number): void {
    if (
      page < 0 ||
      page >= this.totalPages() ||
      page === this.currentPage() ||
      this.isLoading() ||
      !this.reads.authenticated()
    ) {
      return;
    }
    const current = this.reads.begin();
    this.requestedPage = page;
    this.isLoading.set(true);
    this.loadError.set(null);
    this.fetchPage(page, this.searchQuery().trim(), current, true);
  }

  previousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  retryLoad(): void {
    if (this.requestedPage === 0) {
      this.loadInitial();
      return;
    }
    if (!this.reads.authenticated() || this.isLoading()) {
      return;
    }
    const current = this.reads.begin();
    this.isLoading.set(true);
    this.loadError.set(null);
    this.fetchPage(this.requestedPage, this.searchQuery().trim(), current, false);
  }

  private fetchPage(page: number, query: string, current: () => boolean, scrollOnSuccess: boolean): void {
    const disease = this.diseaseQuery().trim();
    const request$ = disease
      ? this.patientService.getPatients(page, this.pageSize, 'fullName,asc', query, this.selectedFilter(), disease)
      : this.patientService.getPatients(page, this.pageSize, 'fullName,asc', query, this.selectedFilter());
    request$
      .pipe(takeUntil(this.reads.canceled))
      .subscribe({
        next: (response) => {
          if (!current()) return;
          const items = response.content.map(dto => mapDtoToCardItem(dto, this.doctorSpecialtyService.isPediatrics()));
          this.patients.set(items);
          this.currentPage.set(page);
          this.totalPages.set(getTotalPages(response));
          this.totalElements.set(getTotalElements(response));
          this.isLoading.set(false);
          if (scrollOnSuccess && isPlatformBrowser(this.platformId) && typeof document !== 'undefined') {
            document.getElementById('view-patient-list')?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
          }
        },
        error: () => {
          if (current()) {
            this.loadError.set('No se pudo cargar el directorio. Reintentá la carga.');
            this.isLoading.set(false);
          }
        },
      });
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

  onDiseaseInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.diseaseQuery.set(val);
    this.reads.cancel();

    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }

    this.searchDebounceTimer = setTimeout(() => {
      this.loadInitial();
    }, 350);
  }

  onDiseaseEnter(): void {
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
    this.loadInitial();
  }

  clearDisease(): void {
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
    this.diseaseQuery.set('');
    this.loadInitial();
  }

  resetFilters(): void {
    this.selectedFilter.set('ALL');
    this.searchQuery.set('');
    this.diseaseQuery.set('');
    this.loadInitial('');
  }

  selectPatient(patient: PatientCardItem): void {
    if (patient.detail) {
      this.activePatientService.setActivePatient(patient.detail);
    }
    this.activePatientService.loadPatient(patient.id);
    this.router.navigate(['/patients', patient.id]);
  }

  createPatient(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.router.navigate(['/patients/new']);
  }

}
