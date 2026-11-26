import { InteractionStatusService } from '../../core/services/interaction-status.service';
import { NgTemplateOutlet } from '@angular/common';
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
  lucideChevronLeft,
  lucideChevronRight,
  lucideClock,
  lucideExternalLink,
  lucideMapPin,
  lucidePauseCircle,
  lucidePencil,
  lucidePlayCircle,
  lucidePlus,
  lucideShieldAlert,
  lucideVideo,
} from '@ng-icons/lucide';
import { firstValueFrom, of, takeUntil } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { AccountReadScope } from '../../core/services/account-read-scope';
import { ClinicalContextService } from '../../core/services/clinical-context.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import {
  CapabilityBannerDescriptor,
  Clinic,
  ClinicCapabilities,
  ClinicStatus,
  ClinicStatusFilter,
  TeleconsultationSetting,
  canCreateClinic,
  canEditClinic,
  isCapabilityVerified,
  preservedBookingsNotice,
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
  imports: [RouterLink, NgIconComponent, NgTemplateOutlet],
  providers: [
    provideIcons({
      lucideBuilding2,
      lucidePlus,
      lucideMapPin,
      lucideClock,
      lucidePencil,
      lucidePauseCircle,
      lucidePlayCircle,
      lucideArchive,
      lucideArchiveRestore,
      lucideShieldAlert,
      lucideVideo,
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
  private readonly interaction = inject(InteractionStatusService);
 readonly schedulesEnabled=FEATURE_FLAGS.SCHEDULES_ENABLED;
  private readonly clinicsService = inject(ClinicsService);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly context = inject(ClinicalContextService);
  private readonly workspace = inject(WorkspaceStore);
  private readonly readScope = new AccountReadScope(() => {
    this.resetState();
    if (this.readScope.authenticated()) void this.reloadAll();
  });
  readonly activeContextId = this.context.id;
  readonly activeSpecialty = computed(() => this.workspace.contexts().find(
    item => item.id === this.activeContextId(),
  )?.specialty.name ?? null);

  private accountGeneration = 0;
  private mutationOperationId = 0;
  private destroyed = false;
  private capabilityExpiryTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly capabilityExpiryTick = signal(0);

  readonly statusFilters: readonly StatusFilterOption[] = [
    { value: 'ALL', label: 'Todos' },
    { value: 'ACTIVE', label: 'Activos' },
    { value: 'INACTIVE', label: 'Desactivados' },
    { value: 'ARCHIVED', label: 'Fuera del cupo' },
  ];

  private readonly allClinics = signal<Clinic[]>([]);
  readonly teleconsultations = signal<TeleconsultationSetting[]>([]);
  readonly selectedTeleconsultation = computed(() =>
    this.teleconsultations().find(item => item.specialtyContextId === String(this.activeContextId())),
  );
  readonly teleconsultationError = signal<string | null>(null);
  readonly pendingTeleconsultation = signal<string | null>(null);
  private readonly filteredClinics = computed(() => this.allClinics().filter(clinic =>
    clinic.modality !== 'TELECONSULTATION' &&
    (!this.activeContextId() || !clinic.specialtyContextIds?.length || clinic.specialtyContextIds.includes(String(this.activeContextId()))) &&
    (this.statusFilter() === 'ALL' || clinic.status === this.statusFilter()),
  ));
  readonly clinics = computed(() => {
    const start = this.currentPage() * this.pageSize();
    return this.filteredClinics().slice(start, start + this.pageSize());
  });
  readonly hasLoadedClinics = signal(false);
  readonly capabilities = signal<ClinicCapabilities | null>(null);
  readonly statusFilter = signal<ClinicStatusFilter>('ALL');
  readonly currentPage = signal(0);
  readonly pageSize = signal(20);
  readonly totalElements = computed(() => this.filteredClinics().length);

  readonly isLoading = signal(false);
  readonly loadError = signal<string | null>(null);
  readonly actionError = signal<string | null>(null);
  readonly mutatingClinicId = signal<string | null>(null);


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
        void this.renewCapabilities();
      }, delayMs);
    }
  }

  private async renewCapabilities(): Promise<void> {
    const generation = this.accountGeneration;
    const owner = this.currentOwnerId();
    const previous = this.capabilities();
    const current = () => !this.destroyed && generation === this.accountGeneration
      && owner === this.currentOwnerId() && previous === this.capabilities();
    if (!this.readScope.authenticated()) return;
    try {
      const caps = await firstValueFrom(
        this.clinicsService.getCapabilities().pipe(takeUntil(this.readScope.canceled)),
      );
      if (current()) this.setCapabilities(caps);
    } catch {
      // Expired rights stay unavailable; never grant writes on a failed renewal.
      if (current()) this.setCapabilities(createUnavailableCapabilities(previous));
    }
  }
  private resetState(): void {
    this.accountGeneration += 1;
    this.mutationOperationId += 1;
    this.clearCapabilityExpiryTimer();
    this.allClinics.set([]);
    this.teleconsultations.set([]);
    this.teleconsultationError.set(null);
    this.pendingTeleconsultation.set(null);
    this.hasLoadedClinics.set(false);
    this.capabilities.set(null);
    this.currentPage.set(0);
    this.isLoading.set(false);
    this.loadError.set(null);
    this.actionError.set(null);
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
    this.teleconsultationError.set(null);

    try {
      const [capsResult, listResult, virtualResult] = await Promise.allSettled([
        firstValueFrom(this.clinicsService.getCapabilities().pipe(takeUntil(this.readScope.canceled))),
        this.loadClinics(active),
        firstValueFrom((this.schedulesEnabled ? this.clinicsService.listTeleconsultations() : of([]))
          .pipe(takeUntil(this.readScope.canceled))),
      ]);

      if (!active() || this.destroyed) return;

      if (virtualResult.status === 'fulfilled') {
        this.teleconsultations.set(virtualResult.value);
      } else {
        this.teleconsultations.set([]);
        this.teleconsultationError.set(parseClinicHttpError(
          virtualResult.reason, 'No pudimos cargar las teleconsultas.',
        ).userMessage);
      }

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
        this.allClinics.set(listResult.value);
        this.currentPage.update(page => Math.min(page, this.totalPages() - 1));
        this.hasLoadedClinics.set(true);
      } else {
        this.allClinics.set([]);
        this.hasLoadedClinics.set(false);
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

  private async loadClinics(active: () => boolean): Promise<Clinic[]> {
    const clinics: Clinic[] = [];
    const size = 100;
    for (let page = 0; active(); page++) {
      const result = await firstValueFrom(
        this.clinicsService.listClinics({ page, size }).pipe(takeUntil(this.readScope.canceled)),
      );
      clinics.push(...result.items);
      if (clinics.length >= result.totalElements || result.items.length === 0) break;
    }
    return clinics;
  }

  selectStatusFilter(filter: ClinicStatusFilter): void {
    if (this.statusFilter() === filter && this.currentPage() === 0) {
      return;
    }
    this.statusFilter.set(filter);
    this.currentPage.set(0);
    this.actionError.set(null);
  }

  goToPage(page: number): void {
    if (page < 0 || page >= this.totalPages() || page === this.currentPage() || this.isLoading()) {
      return;
    }
    this.currentPage.set(page);
  }

  canManageTeleconsultation(): boolean {
    this.capabilityExpiryTick();
    return !this.isLoading() && this.pendingTeleconsultation() === null
      && isCapabilityVerified(this.capabilities()) && this.capabilities()?.entitlements.clinicManagement === true;
  }

  async toggleTeleconsultation(setting: TeleconsultationSetting): Promise<void> {
    if (!this.canManageTeleconsultation()) return;
    const generation = this.accountGeneration;
    const owner = this.currentOwnerId();
    const current = () => !this.destroyed && generation === this.accountGeneration
      && owner === this.currentOwnerId();
    this.pendingTeleconsultation.set(setting.specialtyContextId);
    this.teleconsultationError.set(null);
    try {
      const updated = await firstValueFrom(this.clinicsService.setTeleconsultation(
        setting.specialtyContextId, !setting.enabled,
      ));
      if (current()) {
        this.teleconsultations.update(items => items.map(item =>
          item.specialtyContextId === updated.specialtyContextId
            ? updated
            : { ...item, clinicId: updated.clinicId ?? item.clinicId },
        ));
      }
    } catch (error) {
      if (current()) this.teleconsultationError.set(parseClinicHttpError(
        error, 'No pudimos cambiar el estado de la teleconsulta.',
      ).userMessage);
    } finally {
      if (current()) this.pendingTeleconsultation.set(null);
    }
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
      this.interaction.notifySuccess(
        `El estado de "${updated.name}" se actualizó a ${formatClinicStatusLabel(updated.status)}.${preservedBookingsNotice(updated)}`,
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
