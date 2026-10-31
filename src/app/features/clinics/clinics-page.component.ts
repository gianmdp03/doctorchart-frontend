import { FEATURE_FLAGS } from '../../core/config/feature-flags';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
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
import { AuthService } from '../../core/services/auth.service';
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
  createUnavailableCapabilities,
  describeCapabilityBanner,
  formatClinicDate,
  formatClinicStatusLabel,
  formatQuotaSummary,
  getCapabilityExpiryDelayMs,
  invalidateCapabilitiesForError,
  normalizeCapabilities,
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
 readonly schedulesEnabled=FEATURE_FLAGS.SCHEDULES_ENABLED;
  private readonly clinicsService = inject(ClinicsService);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly readScope = new AccountReadScope(() => this.resetState());

  private accountGeneration = 0;
  private mutationOperationId = 0;
  private destroyed = false;
  private capabilityExpiryTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly capabilityExpiryTick = signal(0);

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

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      this.clearCapabilityExpiryTimer();
      this.readScope.cancel();
    });
  }

  canCreate(): boolean {
    this.capabilityExpiryTick();
    return canCreateClinic(this.capabilities(), Date.now());
  }

  quotaSummary(): string {
    this.capabilityExpiryTick();
    return formatQuotaSummary(this.capabilities(), Date.now());
  }

  capabilityBanner(): CapabilityBannerDescriptor | null {
    this.capabilityExpiryTick();
    return describeCapabilityBanner(this.capabilities(), Date.now());
  }

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

  private currentOwnerId(): string | null {
    return this.auth.currentUser()?.id ?? null;
  }

  private clearCapabilityExpiryTimer(): void {
    if (this.capabilityExpiryTimer !== null) {
      clearTimeout(this.capabilityExpiryTimer);
      this.capabilityExpiryTimer = null;
    }
  }

  private setCapabilities(caps: ClinicCapabilities | null): void {
    this.clearCapabilityExpiryTimer();
    if (!caps) {
      this.capabilities.set(null);
      return;
    }
    const normalized = normalizeCapabilities(caps, Date.now());
    this.capabilities.set(normalized);
    const delayMs = getCapabilityExpiryDelayMs(normalized, Date.now());
    if (delayMs !== null && normalized.entitlements.status === 'VERIFIED') {
      this.capabilityExpiryTimer = setTimeout(() => {
        this.capabilityExpiryTimer = null;
        if (this.destroyed) return;
        this.capabilityExpiryTick.update((v) => v + 1);
        this.capabilities.set(createUnavailableCapabilities(this.capabilities()));
      }, delayMs);
    }
  }

  private resetState(): void {
    this.accountGeneration += 1;
    this.mutationOperationId += 1;
    this.clearCapabilityExpiryTimer();
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

      if (!active() || this.destroyed) return;

      if (capsResult.status === 'fulfilled') {
        this.setCapabilities(capsResult.value);
      } else {
        this.setCapabilities(createUnavailableCapabilities(this.capabilities()));
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
      if (active() && !this.destroyed) {
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
    this.capabilityExpiryTick();
    return canEditClinic(clinic, this.capabilities(), Date.now());
  }

  canTransition(clinic: Clinic, targetStatus: ClinicStatus): boolean {
    this.capabilityExpiryTick();
    if (this.mutatingClinicId() !== null) {
      return false;
    }
    return canTransitionClinicStatus(clinic, targetStatus, this.capabilities(), Date.now());
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

    const opAccountGen = this.accountGeneration;
    const opOwner = this.currentOwnerId();
    const opMutationId = ++this.mutationOperationId;
    const isMutationCurrent = (): boolean =>
      !this.destroyed &&
      this.readScope.authenticated() &&
      this.accountGeneration === opAccountGen &&
      this.currentOwnerId() === opOwner &&
      this.mutationOperationId === opMutationId;

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
      if (!isMutationCurrent() || updated.id !== clinic.id) {
        return;
      }
      this.actionFeedback.set(
        `El estado de "${updated.name}" se actualizó a ${formatClinicStatusLabel(updated.status)}.`,
      );
      await this.reloadAll();
    } catch (error) {
      if (!isMutationCurrent()) {
        return;
      }
      const parsed = parseClinicHttpError(
        error,
        'No pudimos cambiar el estado del consultorio.',
      );
      this.actionError.set(parsed.userMessage);
      if (parsed.shouldRefreshCapabilities) {
        if (!parsed.isVersionConflict) {
          this.setCapabilities(invalidateCapabilitiesForError(this.capabilities(), parsed));
        }
        await this.reloadAll();
      }
    } finally {
      if (isMutationCurrent()) {
        this.mutatingClinicId.set(null);
      }
    }
  }
}
