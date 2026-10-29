import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideArchive,
  lucideArchiveRestore,
  lucideBuilding2,
  lucideCheckCircle2,
  lucideChevronLeft,
  lucideChevronRight,
  lucideClock,
  lucideExternalLink,
  lucideMapPin,
  lucidePauseCircle,
  lucidePencil,
  lucidePlayCircle,
  lucidePlus,
  lucideRefreshCw,
  lucideShieldAlert,
} from '@ng-icons/lucide';
import { firstValueFrom, takeUntil } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AccountReadScope } from '../../core/services/account-read-scope';
import {
  CapabilityBannerDescriptor,
  Clinic,
  ClinicCapabilities,
  ClinicStatus,
  ClinicStatusFilter,
  canCreateClinic,
  canEditClinic,
  canTransitionClinicStatus,
  describeCapabilityBanner,
  formatClinicDate,
  formatClinicStatusLabel,
  formatQuotaSummary,
  parseClinicHttpError,
} from './clinics.models';
import { ClinicsService } from './clinics.service';

interface StatusFilterOption {
  readonly value: ClinicStatusFilter;
  readonly label: string;
}

@Component({
  selector: 'app-clinics-page',
  imports: [RouterLink, NgIconComponent],
  providers: [
    provideIcons({
      lucideBuilding2,
      lucidePlus,
      lucideRefreshCw,
      lucideMapPin,
      lucideClock,
      lucidePencil,
      lucidePauseCircle,
      lucidePlayCircle,
      lucideArchive,
      lucideArchiveRestore,
      lucideShieldAlert,
      lucideCheckCircle2,
      lucideChevronLeft,
      lucideChevronRight,
      lucideExternalLink,
    }),
  ],
  templateUrl: './clinics-page.component.html',
  styleUrl: './clinics-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicsPageComponent implements OnInit {
  private readonly clinicsService = inject(ClinicsService);
  private readonly router = inject(Router);
  private readonly readScope = new AccountReadScope(() => this.resetState());

  readonly statusFilters: readonly StatusFilterOption[] = [
    { value: 'ALL', label: 'Todos' },
    { value: 'ACTIVE', label: 'Activos' },
    { value: 'INACTIVE', label: 'Inactivos' },
    { value: 'ARCHIVED', label: 'Archivados' },
  ];

  readonly clinics = signal<Clinic[]>([]);
  readonly capabilities = signal<ClinicCapabilities | null>(null);
  readonly statusFilter = signal<ClinicStatusFilter>('ALL');
  readonly currentPage = signal(0);
  readonly pageSize = signal(20);
  readonly totalElements = signal(0);

  readonly isLoading = signal(false);
  readonly loadError = signal<string | null>(null);
  readonly actionError = signal<string | null>(null);
  readonly actionFeedback = signal<string | null>(null);
  readonly mutatingClinicId = signal<string | null>(null);

  readonly plansUrl = environment.bycodePlansUrl || '';

  readonly canCreate = computed(() => canCreateClinic(this.capabilities()));
  readonly quotaSummary = computed(() => formatQuotaSummary(this.capabilities()));
  readonly capabilityBanner = computed<CapabilityBannerDescriptor | null>(() =>
    describeCapabilityBanner(this.capabilities()),
  );

  readonly totalPages = computed(() => {
    const total = this.totalElements();
    const size = this.pageSize();
    return size > 0 ? Math.max(1, Math.ceil(total / size)) : 1;
  });

  readonly rangeStart = computed(() => {
    if (this.totalElements() === 0 || this.clinics().length === 0) {
      return 0;
    }
    return this.currentPage() * this.pageSize() + 1;
  });

  readonly rangeEnd = computed(() => {
    if (this.totalElements() === 0 || this.clinics().length === 0) {
      return 0;
    }
    return Math.min(this.totalElements(), this.rangeStart() + this.clinics().length - 1);
  });

  ngOnInit(): void {
    void this.reloadAll();
  }

  private resetState(): void {
    this.clinics.set([]);
    this.capabilities.set(null);
    this.totalElements.set(0);
    this.currentPage.set(0);
    this.isLoading.set(false);
    this.loadError.set(null);
    this.actionError.set(null);
    this.actionFeedback.set(null);
    this.mutatingClinicId.set(null);
  }

  async reloadAll(): Promise<void> {
    if (!this.readScope.authenticated()) {
      this.resetState();
      return;
    }
    const active = this.readScope.begin();
    this.isLoading.set(true);
    this.loadError.set(null);

    const filter = this.statusFilter();
    const query = {
      page: this.currentPage(),
      size: this.pageSize(),
      ...(filter !== 'ALL' ? { status: filter } : {}),
    };

    try {
      const [capsResult, listResult] = await Promise.allSettled([
        firstValueFrom(this.clinicsService.getCapabilities().pipe(takeUntil(this.readScope.canceled))),
        firstValueFrom(
          this.clinicsService.listClinics(query).pipe(takeUntil(this.readScope.canceled)),
        ),
      ]);

      if (!active()) return;

      if (capsResult.status === 'fulfilled') {
        this.capabilities.set(capsResult.value);
      } else {
        const parsed = parseClinicHttpError(
          capsResult.reason,
          'No pudimos verificar las capacidades de consultorios.',
        );
        this.loadError.set(parsed.userMessage);
      }

      if (listResult.status === 'fulfilled') {
        this.clinics.set(listResult.value.items);
        this.currentPage.set(listResult.value.page);
        this.pageSize.set(listResult.value.size);
        this.totalElements.set(listResult.value.totalElements);
      } else {
        this.clinics.set([]);
        this.totalElements.set(0);
        const parsed = parseClinicHttpError(
          listResult.reason,
          'No pudimos cargar el listado de consultorios.',
        );
        this.loadError.set(parsed.userMessage);
      }
    } finally {
      if (active()) {
        this.isLoading.set(false);
      }
    }
  }

  selectStatusFilter(filter: ClinicStatusFilter): void {
    if (this.statusFilter() === filter && this.currentPage() === 0) {
      return;
    }
    this.statusFilter.set(filter);
    this.currentPage.set(0);
    this.actionError.set(null);
    this.actionFeedback.set(null);
    void this.reloadAll();
  }

  goToPage(page: number): void {
    if (page < 0 || page >= this.totalPages() || page === this.currentPage() || this.isLoading()) {
      return;
    }
    this.currentPage.set(page);
    void this.reloadAll();
  }

  navigateToCreate(): void {
    if (!this.canCreate()) {
      return;
    }
    void this.router.navigate(['/clinics/new']);
  }

  canEdit(clinic: Clinic): boolean {
    return canEditClinic(clinic, this.capabilities());
  }

  canTransition(clinic: Clinic, targetStatus: ClinicStatus): boolean {
    if (this.mutatingClinicId() !== null) {
      return false;
    }
    return canTransitionClinicStatus(clinic, targetStatus, this.capabilities());
  }

  statusLabel(status: ClinicStatus): string {
    return formatClinicStatusLabel(status);
  }

  formatDate(isoTimestamp: string): string {
    return formatClinicDate(isoTimestamp);
  }

  async changeStatus(clinic: Clinic, targetStatus: ClinicStatus): Promise<void> {
    if (!this.canTransition(clinic, targetStatus)) {
      return;
    }

    this.mutatingClinicId.set(clinic.id);
    this.actionError.set(null);
    this.actionFeedback.set(null);

    try {
      const updated = await firstValueFrom(
        this.clinicsService.updateClinicStatus(clinic.id, {
          expectedVersion: clinic.version,
          status: targetStatus,
        }),
      );
      this.actionFeedback.set(
        `El estado de "${updated.name}" se actualizó a ${formatClinicStatusLabel(updated.status)}.`,
      );
      await this.reloadAll();
    } catch (error) {
      const parsed = parseClinicHttpError(
        error,
        'No pudimos cambiar el estado del consultorio.',
      );
      this.actionError.set(parsed.userMessage);
      if (parsed.shouldRefreshCapabilities) {
        await this.reloadAll();
      }
    } finally {
      this.mutatingClinicId.set(null);
    }
  }
}
