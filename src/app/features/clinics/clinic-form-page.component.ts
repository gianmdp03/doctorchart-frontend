import { InteractionStatusService } from '../../core/services/interaction-status.service';
import {
  ChangeDetectionStrategy,
  afterNextRender, Component, ElementRef, Injector,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
   ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  lucideArchive,
  lucideArchiveRestore,
  lucideArrowLeft,
  lucideBuilding2,
  lucideCheckCircle2,
  lucideClock,
  lucideExternalLink,
  lucideMapPin,
  lucidePauseCircle,
  lucidePlayCircle,
  lucideRefreshCw,
  lucideSave,
  lucideShieldAlert,
} from '@ng-icons/lucide';
import { firstValueFrom, takeUntil } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { AccountReadScope } from '../../core/services/account-read-scope';
import { ClinicalContextService } from '../../core/services/clinical-context.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { BOOKING_COUNTRIES, bookingCountry, localitiesFor } from '../../core/location/booking-locations';
import {
  CLINIC_FIELD_LIMITS,
  COMMON_IANA_TIMEZONES,
  CapabilityBannerDescriptor,
  Clinic,
  ClinicCapabilities,
  ClinicEditableField,
  ClinicStatus,
  DEFAULT_CLINIC_COUNTRY,
  DEFAULT_CLINIC_TIMEZONE,
  UpdateClinicRequest,
  canCreateClinic,
  canEditClinic,
  isCapabilityVerified,
  preservedBookingsNotice,
  canTransitionClinicStatus,
  createUnavailableCapabilities,
  describeCapabilityBanner,
  fieldErrorMessage,
  formatClinicDate,
  formatClinicStatusLabel,
  getCapabilityExpiryDelayMs,
  invalidateCapabilitiesForError,
  isValidCanonicalBigInt,
  normalizeCapabilities,
  parseClinicHttpError,
  validateClinicTextField,
  validateIanaTimezone,
} from './clinics.models';
import { ClinicsService } from './clinics.service';

function clinicTextValidator(field: Exclude<ClinicEditableField, 'timezone'>): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const code = validateClinicTextField(field, String(control.value ?? ''));
    return code ? { clinicFieldCode: code } : null;
  };
}

function clinicTimezoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const code = validateIanaTimezone(String(control.value ?? ''));
    return code ? { clinicFieldCode: code } : null;
  };
}

@Component({
  selector: 'app-clinic-form-page',
  imports: [ReactiveFormsModule, RouterLink, NgIconComponent],
  providers: [
    provideIcons({
      lucideBuilding2,
      lucideArrowLeft,
      lucideSave,
      lucideRefreshCw,
      lucideShieldAlert,
      lucideCheckCircle2,
      lucideMapPin,
      lucideClock,
      lucideArchive,
      lucideArchiveRestore,
      lucidePauseCircle,
      lucidePlayCircle,
      lucideExternalLink,
    }),
  ],
  templateUrl: './clinic-form-page.component.html',
  styleUrl: './clinic-form-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicFormPageComponent implements OnInit {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  private readonly interaction = inject(InteractionStatusService);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly clinicsService = inject(ClinicsService);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly workspace = inject(WorkspaceStore);
  private readonly clinicalContext = inject(ClinicalContextService);
  private readonly readScope = new AccountReadScope(() => {
    this.resetOnAccountChange();
    const id = this.clinicId();
    if (this.readScope.authenticated()) {
      if (id) void this.loadForEdit(id);
      else void this.loadCapabilitiesOnly();
    }
  });
  readonly specialtyOptions = signal<{id: string; name: string}[]>([]);
  readonly selectedSpecialtyIds = signal<string[]>([]);

  private contextGeneration = 0;
  private mutationOperationId = 0;
  private destroyed = false;
  private capabilityExpiryTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly capabilityExpiryTick = signal(0);

  readonly limits = CLINIC_FIELD_LIMITS;
  readonly commonTimezones = COMMON_IANA_TIMEZONES;
  readonly locationCountries = BOOKING_COUNTRIES;

  readonly isEditMode = signal(false);
  readonly clinicId = signal<string | null>(null);
  readonly clinic = signal<Clinic | null>(null);
  readonly capabilities = signal<ClinicCapabilities | null>(null);

  readonly isLoading = signal(false);
  readonly isSubmitting = signal(false);
  readonly isRetryingCapabilities = signal(false);
  readonly submissionAttempted = signal(false);

  readonly loadError = signal<string | null>(null);
  readonly submitError = signal<string | null>(null);
  readonly submitFeedback = signal<string | null>(null);
  readonly versionConflict = signal(false);
  readonly serverFieldErrors = signal<Partial<Record<ClinicEditableField, string>>>({});

  readonly form = this.fb.nonNullable.group({
    name: ['', [clinicTextValidator('name')]],
    country: [DEFAULT_CLINIC_COUNTRY, [clinicTextValidator('country')]],
    province: ['', [clinicTextValidator('province')]],
    city: ['', [clinicTextValidator('city')]],
    address: ['', [clinicTextValidator('address')]],
    timezone: [DEFAULT_CLINIC_TIMEZONE, [clinicTimezoneValidator()]],
  });

  private readonly virtualDraft = signal(false);
  readonly isVirtual = computed(() => this.isEditMode()
    ? this.clinic()?.modality === 'TELECONSULTATION'
    : this.virtualDraft());
  readonly isArchived = computed(() => this.clinic()?.status === 'ARCHIVED');

  hasListedTimezone(): boolean {
    return this.commonTimezones.some(zone => zone.value === this.form.controls.timezone.value);
  }

  locationCountry() { return bookingCountry(this.form.controls.country.value); }

  localities() {
    const country = this.locationCountry();
    return country ? localitiesFor(country, this.form.controls.province.value) : [];
  }

  changeLocationCountry(): void {
    const country = this.locationCountry();
    if (!country) return;
    this.form.patchValue({ province: '', city: '', timezone: country.timezone });
  }

  clearLocality(): void { this.form.controls.city.setValue(''); }

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      this.clearCapabilityExpiryTimer();
      this.readScope.cancel();
    });
  }

  isAllowedByCapabilities(): boolean {
    this.capabilityExpiryTick();
    const caps = this.capabilities();
    const nowMs = Date.now();
    if (this.isEditMode()) {
      return canEditClinic(this.clinic(), caps, nowMs);
    }
    return this.isVirtual() ? isCapabilityVerified(caps, nowMs) : canCreateClinic(caps, nowMs);
  }

  isReadOnly(): boolean {
    return (
      this.isLoading() ||
      this.isSubmitting() ||
      this.versionConflict() ||
      this.isArchived() ||
      !this.isAllowedByCapabilities()
    );
  }

  capabilityBanner(): CapabilityBannerDescriptor | null {
    this.capabilityExpiryTick();
    return describeCapabilityBanner(this.capabilities(), Date.now());
  }

  pageTitle(): string {
    if (this.isVirtual()) return this.isEditMode() ? 'Configurar teleconsulta' : 'Nueva agenda de teleconsultas';
    if (!this.isEditMode()) {
      return 'Nuevo Consultorio';
    }
    const current = this.clinic();
    if (!current) {
      return 'Consultorio';
    }
    return this.isArchived() || !this.isAllowedByCapabilities()
      ? `Detalle de Consultorio: ${current.name}`
      : `Editar Consultorio: ${current.name}`;
  }

  ngOnInit(): void {
    const fields: ClinicEditableField[] = [
      'name',
      'country',
      'province',
      'city',
      'address',
      'timezone',
    ];
    for (const key of fields) {
      this.form.controls[key].valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          const currentErrors = this.serverFieldErrors();
          if (currentErrors[key]) {
            const next = { ...currentErrors };
            delete next[key];
            this.serverFieldErrors.set(next);
          }
        });
    }

    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const id = params.get('id');
      this.submissionAttempted.set(false);
      this.submitError.set(null);
      this.submitFeedback.set(null);
      this.versionConflict.set(false);
      this.serverFieldErrors.set({});

      if (id !== null) {
        this.isEditMode.set(true);
        this.clinicId.set(id);
        void this.loadForEdit(id);
      } else {
        this.isEditMode.set(false);
        this.clinicId.set(null);
        this.clinic.set(null);
        this.virtualDraft.set(this.route.snapshot?.queryParamMap?.get('modality') === 'teleconsultation');
        this.form.reset({
          name: this.isVirtual() ? 'Teleconsulta' : '',
          country: DEFAULT_CLINIC_COUNTRY,
          province: '',
          city: '',
          address: '',
          timezone: DEFAULT_CLINIC_TIMEZONE,
        });
        this.setLocationControls(this.isVirtual());
        void this.loadCapabilitiesOnly();
      }
    });
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
      const expectedGen = this.contextGeneration;
      const expectedOwner = this.currentOwnerId();
      const expectedEditMode = this.isEditMode();
      const expectedClinicId = this.clinicId();
      this.capabilityExpiryTimer = setTimeout(() => {
        this.capabilityExpiryTimer = null;
        if (!this.isContextCurrent(expectedGen, expectedOwner, expectedEditMode, expectedClinicId)) return;
        this.capabilityExpiryTick.update((v) => v + 1);
        this.capabilities.set(createUnavailableCapabilities(this.capabilities()));
        void this.refreshCapabilitiesSilently(expectedGen, expectedOwner, expectedEditMode, expectedClinicId);
      }, delayMs);
    }
  }

  private isContextCurrent(
    expectedGen: number,
    expectedOwner: string | null,
    expectedEditMode: boolean,
    expectedClinicId: string | null,
  ): boolean {
    return (
      !this.destroyed &&
      this.readScope.authenticated() &&
      this.currentOwnerId() === expectedOwner &&
      this.contextGeneration === expectedGen &&
      this.isEditMode() === expectedEditMode &&
      this.clinicId() === expectedClinicId
    );
  }

  private resetOnAccountChange(): void {
    this.contextGeneration += 1;
    this.mutationOperationId += 1;
    this.clearCapabilityExpiryTimer();
    this.clinic.set(null);
    this.capabilities.set(null);
    this.isLoading.set(false);
    this.isSubmitting.set(false);
    this.isRetryingCapabilities.set(false);
    this.loadError.set(null);
    this.submitError.set(null);
    this.submitFeedback.set(null);
    this.versionConflict.set(false);
    this.serverFieldErrors.set({});
    this.specialtyOptions.set([]);
    this.selectedSpecialtyIds.set([]);
  }

  private async loadSpecialtyOptions() {
    const contexts = await this.workspace.loadContexts();
    return contexts.filter(context => context.ready)
      .map(context => ({ id: String(context.id), name: context.specialty.name }));
  }

  private defaultSpecialtyIds(): string[] {
    const options = this.specialtyOptions();
    const active = String(this.clinicalContext.id());
    const selected = options.find(option => option.id === active) ?? (options.length === 1 ? options[0] : undefined);
    return selected ? [selected.id] : [];
  }

  toggleSpecialty(id: string): void {
    this.selectedSpecialtyIds.update(ids => ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id]);
  }

  async loadCapabilitiesOnly(): Promise<void> {
    this.contextGeneration += 1;
    this.mutationOperationId += 1;
    this.isEditMode.set(false);
    this.clinicId.set(null);
    this.isSubmitting.set(false);
    this.isRetryingCapabilities.set(false);

    if (!this.readScope.authenticated()) return;
    const expectedGen = this.contextGeneration;
    const expectedOwner = this.currentOwnerId();
    const active = this.readScope.begin();
    this.isLoading.set(true);
    this.loadError.set(null);
    try {
      const [caps, options] = await Promise.all([
        firstValueFrom(this.clinicsService.getCapabilities().pipe(takeUntil(this.readScope.canceled))),
        this.isVirtual() ? Promise.resolve([]) : this.loadSpecialtyOptions(),
      ]);
      if (!active() || !this.isContextCurrent(expectedGen, expectedOwner, false, null)) return;
      this.specialtyOptions.set(options);
      this.selectedSpecialtyIds.set(this.defaultSpecialtyIds());
      this.setCapabilities(caps);
    } catch (error) {
      if (!active() || !this.isContextCurrent(expectedGen, expectedOwner, false, null)) return;
      this.setCapabilities(createUnavailableCapabilities(this.capabilities()));
      const parsed = parseClinicHttpError(
        error,
        'No pudimos verificar los permisos comerciales para crear consultorios.',
      );
      this.loadError.set(parsed.userMessage);
    } finally {
      if (active() && this.isContextCurrent(expectedGen, expectedOwner, false, null)) {
        this.isLoading.set(false);
      }
    }
  }

  async loadForEdit(id: string): Promise<void> {
    this.contextGeneration += 1;
    this.mutationOperationId += 1;
    this.isEditMode.set(true);
    this.clinicId.set(id);
    this.isSubmitting.set(false);
    this.isRetryingCapabilities.set(false);
    this.submissionAttempted.set(false);
    this.submitError.set(null);
    this.submitFeedback.set(null);
    this.versionConflict.set(false);
    this.serverFieldErrors.set({});

    if (!this.readScope.authenticated()) return;
    if (!isValidCanonicalBigInt(id, false)) {
      this.readScope.cancel();
      this.clinic.set(null);
      this.isLoading.set(false);
      this.loadError.set('El identificador del consultorio no tiene un formato válido.');
      return;
    }

    const expectedGen = this.contextGeneration;
    const expectedOwner = this.currentOwnerId();
    const active = this.readScope.begin();
    this.isLoading.set(true);
    this.loadError.set(null);

    try {
      const [capsResult, clinicResult, specialtiesResult] = await Promise.allSettled([
        firstValueFrom(
          this.clinicsService.getCapabilities().pipe(takeUntil(this.readScope.canceled)),
        ),
        firstValueFrom(
          this.clinicsService.getClinic(id).pipe(takeUntil(this.readScope.canceled)),
        ),
        this.loadSpecialtyOptions(),
      ]);
      if (!active() || !this.isContextCurrent(expectedGen, expectedOwner, true, id)) return;

      if (capsResult.status === 'fulfilled') {
        this.setCapabilities(capsResult.value);
      } else {
        this.setCapabilities(createUnavailableCapabilities(this.capabilities()));
      }

      this.specialtyOptions.set(specialtiesResult.status === 'fulfilled' ? specialtiesResult.value : []);
      if (clinicResult.status === 'fulfilled' && clinicResult.value.id === id) {
        this.applyServerClinicToForm(clinicResult.value);
        if (!this.isVirtual() && specialtiesResult.status === 'rejected') {
          this.loadError.set('No pudimos cargar tus especialidades. Reintentá para editar el consultorio.');
        }
      } else if (clinicResult.status === 'fulfilled') {
        this.clinic.set(null);
        this.loadError.set('La respuesta recibida no coincide con el consultorio solicitado.');
      } else {
        this.clinic.set(null);
        const parsed = parseClinicHttpError(
          clinicResult.reason,
          'No pudimos cargar los datos del consultorio.',
        );
        this.loadError.set(parsed.userMessage);
      }
    } finally {
      if (active() && this.isContextCurrent(expectedGen, expectedOwner, true, id)) {
        this.isLoading.set(false);
      }
    }
  }

  async retryCapabilities(): Promise<void> {
    if (!this.readScope.authenticated() || this.isLoading() || this.isSubmitting() || this.isRetryingCapabilities()) {
      return;
    }
    const expectedGen = this.contextGeneration;
    const expectedOwner = this.currentOwnerId();
    const expectedEditMode = this.isEditMode();
    const expectedClinicId = this.clinicId();

    this.isRetryingCapabilities.set(true);
    this.submitError.set(null);
    try {
      const caps = await firstValueFrom(
        this.clinicsService.getCapabilities().pipe(takeUntil(this.readScope.canceled)),
      );
      if (!this.isContextCurrent(expectedGen, expectedOwner, expectedEditMode, expectedClinicId)) {
        return;
      }
      this.setCapabilities(caps);
      this.loadError.set(null);
    } catch (error) {
      if (!this.isContextCurrent(expectedGen, expectedOwner, expectedEditMode, expectedClinicId)) {
        return;
      }
      this.setCapabilities(createUnavailableCapabilities(this.capabilities()));
      const parsed = parseClinicHttpError(
        error,
        'No pudimos verificar los permisos comerciales en este momento.',
      );
      this.submitError.set(parsed.userMessage);
    } finally {
      if (this.isContextCurrent(expectedGen, expectedOwner, expectedEditMode, expectedClinicId)) {
        this.isRetryingCapabilities.set(false);
      }
    }
  }

  private setLocationControls(virtual: boolean): void {
    for (const key of ['country', 'province', 'city', 'address'] as const) {
      const control = this.form.controls[key];
      if (virtual) control.disable({ emitEvent: false });
      else control.enable({ emitEvent: false });
    }
  }

  private applyServerClinicToForm(serverClinic: Clinic): void {
    this.clinic.set(structuredClone(serverClinic));
    this.setLocationControls(serverClinic.modality === 'TELECONSULTATION');
    this.selectedSpecialtyIds.set(serverClinic.specialtyContextIds ?? this.defaultSpecialtyIds());
    this.form.reset(
      {
        name: serverClinic.name,
        country: serverClinic.country,
        province: serverClinic.province,
        city: serverClinic.city,
        address: serverClinic.address,
        timezone: serverClinic.timezone,
      },
      { emitEvent: false },
    );
    this.submissionAttempted.set(false);
    this.serverFieldErrors.set({});
  }

  isFieldInvalid(field: ClinicEditableField): boolean {
    if (this.serverFieldErrors()[field]) {
      return true;
    }
    const control = this.form.controls[field];
    return control.invalid && (control.touched || control.dirty || this.submissionAttempted());
  }

  getFieldError(field: ClinicEditableField): string | null {
    const serverMsg = this.serverFieldErrors()[field];
    if (serverMsg) {
      return serverMsg;
    }
    const control = this.form.controls[field];
    if (!control.invalid || !(control.touched || control.dirty || this.submissionAttempted())) {
      return null;
    }
    const code = control.errors?.['clinicFieldCode'] ?? 'INVALID';
    return fieldErrorMessage(field, String(code));
  }

  canTransition(targetStatus: ClinicStatus): boolean {
    this.capabilityExpiryTick();
    if (this.isSubmitting() || this.isLoading()) {
      return false;
    }
    return canTransitionClinicStatus(this.clinic(), targetStatus, this.capabilities(), Date.now());
  }

  statusLabel(status: ClinicStatus): string {
    return formatClinicStatusLabel(status);
  }

  formatDate(isoTimestamp: string | null | undefined): string {
    return formatClinicDate(isoTimestamp);
  }

  async submit(): Promise<void> {
    this.submissionAttempted.set(true);
    this.submitError.set(null);
    this.submitFeedback.set(null);

    if (this.isReadOnly()) {
      return;
    }

    this.form.markAllAsTouched();
    if (this.form.invalid) {
      afterNextRender(() => this.host.nativeElement.querySelector<HTMLElement>(
        'input[aria-invalid="true"]:not(:disabled):not([readonly]), select[aria-invalid="true"]:not(:disabled)',
      )?.focus(), { injector: this.injector });
      return;
    }

    const opGen = this.contextGeneration;
    const opOwner = this.currentOwnerId();
    const opEditMode = this.isEditMode();
    const current = this.clinic();
    if (opEditMode && (!current || current.id !== this.clinicId())) {
      return;
    }
    const opClinicId = opEditMode ? current!.id : null;
    const opMutationId = ++this.mutationOperationId;

    const isMutationCurrent = (): boolean =>
      this.isContextCurrent(opGen, opOwner, opEditMode, opClinicId) &&
      this.mutationOperationId === opMutationId &&
      (!opEditMode || this.clinic()?.id === opClinicId);

    const raw = this.form.getRawValue();
    const virtual = this.isVirtual();
    const shared = { name: raw.name.trim(), timezone: raw.timezone.trim() };
    const location = {
      country: raw.country.trim(), province: raw.province.trim(),
      city: raw.city.trim(), address: raw.address.trim(),
    };
    const specialtyContextIds = this.selectedSpecialtyIds();
    if (!virtual && (!this.specialtyOptions().length || !specialtyContextIds.length)) {
      this.submitError.set('Elegí al menos una especialidad para este consultorio.');
      return;
    }
    this.isSubmitting.set(true);

    try {
      if (!opEditMode) {
        const created = await firstValueFrom(
          this.clinicsService.createClinic(virtual
            ? { ...shared, modality: 'TELECONSULTATION' }
            : { ...shared, ...location, specialtyContextIds }),

        );
        if (!isMutationCurrent()) {
          return;
        }
        this.clinic.set(created);
        this.interaction.notifySuccess(virtual ? 'La agenda de teleconsultas se creó correctamente.' : 'El consultorio se creó correctamente.');
        void this.router.navigate(virtual ? ['/clinics', created.id, 'schedule'] : ['/clinics']);
        return;
      }

      const patchPayload: UpdateClinicRequest = {
        expectedVersion: current!.version,
        ...shared,
        ...(virtual ? {} : { ...location, specialtyContextIds }),
      };

      const updated = await firstValueFrom(
        this.clinicsService.updateClinic(opClinicId!, patchPayload),
      );
      if (!isMutationCurrent() || updated.id !== opClinicId) {
        return;
      }
      this.applyServerClinicToForm(updated);
      this.interaction.notifySuccess('Los datos del consultorio se guardaron correctamente.');
      await this.refreshCapabilitiesSilently(opGen, opOwner, opEditMode, opClinicId);
    } catch (error) {
      if (!isMutationCurrent()) {
        return;
      }
      const parsed = parseClinicHttpError(
        error,
        'No pudimos guardar el consultorio. Tus cambios en pantalla se conservaron.',
      );
      this.submitError.set(parsed.userMessage);
      if (Object.keys(parsed.fieldErrors).length > 0) {
        this.serverFieldErrors.set(parsed.fieldErrors);
      }
      if (parsed.isVersionConflict) {
        this.versionConflict.set(true);
      }
      if (parsed.shouldRefreshCapabilities) {
        if (!parsed.isVersionConflict) {
          this.setCapabilities(invalidateCapabilitiesForError(this.capabilities(), parsed));
        }
        await this.refreshCapabilitiesSilently(opGen, opOwner, opEditMode, opClinicId);
      }
      if (parsed.isStateConflict && opClinicId) {
        await this.refreshClinicMetadataPreserveInputs(opClinicId, opGen, opOwner);
      }
    } finally {
      if (isMutationCurrent()) {
        this.isSubmitting.set(false);
      }
    }
  }

  async changeStatus(targetStatus: ClinicStatus): Promise<void> {
    const current = this.clinic();
    if (!current || current.id !== this.clinicId() || !this.canTransition(targetStatus)) {
      return;
    }

    const opGen = this.contextGeneration;
    const opOwner = this.currentOwnerId();
    const opClinicId = current.id;
    const opMutationId = ++this.mutationOperationId;

    const isMutationCurrent = (): boolean =>
      this.isContextCurrent(opGen, opOwner, true, opClinicId) &&
      this.mutationOperationId === opMutationId &&
      this.clinic()?.id === opClinicId;

    this.isSubmitting.set(true);
    this.submitError.set(null);
    this.submitFeedback.set(null);

    try {
      const updated = await firstValueFrom(
        this.clinicsService.updateClinicStatus(opClinicId, {
          expectedVersion: current.version,
          status: targetStatus,
        }),
      );
      if (!isMutationCurrent() || updated.id !== opClinicId) {
        return;
      }
      this.clinic.set(structuredClone(updated));
      this.interaction.notifySuccess(
        `El estado se actualizó a ${formatClinicStatusLabel(updated.status)}.${preservedBookingsNotice(updated)}`,
      );
      await this.refreshCapabilitiesSilently(opGen, opOwner, true, opClinicId);
    } catch (error) {
      if (!isMutationCurrent()) {
        return;
      }
      const parsed = parseClinicHttpError(
        error,
        'No pudimos actualizar el estado del consultorio.',
      );
      this.submitError.set(parsed.userMessage);
      if (parsed.isVersionConflict) {
        this.versionConflict.set(true);
      }
      if (parsed.shouldRefreshCapabilities) {
        if (!parsed.isVersionConflict) {
          this.setCapabilities(invalidateCapabilitiesForError(this.capabilities(), parsed));
        }
        await this.refreshCapabilitiesSilently(opGen, opOwner, true, opClinicId);
      }
      if (parsed.isStateConflict) {
        await this.refreshClinicMetadataPreserveInputs(opClinicId, opGen, opOwner);
      }
    } finally {
      if (isMutationCurrent()) {
        this.isSubmitting.set(false);
      }
    }
  }

  async resolveConflictKeepLocalEdits(): Promise<void> {
    const id = this.clinicId();
    if (!id || this.isLoading() || this.isSubmitting()) {
      return;
    }
    const opGen = this.contextGeneration;
    const opOwner = this.currentOwnerId();
    const opMutationId = ++this.mutationOperationId;

    const isOperationCurrent = (): boolean =>
      this.isContextCurrent(opGen, opOwner, true, id) &&
      this.mutationOperationId === opMutationId;

    this.isLoading.set(true);
    try {
      const [caps, latest] = await Promise.all([
        firstValueFrom(this.clinicsService.getCapabilities()),
        firstValueFrom(this.clinicsService.getClinic(id)),
      ]);
      if (!isOperationCurrent() || latest.id !== id) {
        return;
      }
      this.setCapabilities(caps);
      this.clinic.set(structuredClone(latest));
      this.versionConflict.set(false);
      this.submitError.set(null);
      this.submitFeedback.set(
        `Se cargó la versión ${latest.version} del servidor conservando tus cambios en pantalla. Revisalos y volvé a guardar.`,
      );
    } catch (error) {
      if (!isOperationCurrent()) {
        return;
      }
      this.setCapabilities(createUnavailableCapabilities(this.capabilities()));
      const parsed = parseClinicHttpError(
        error,
        'No pudimos recargar la última versión del consultorio.',
      );
      this.submitError.set(parsed.userMessage);
    } finally {
      if (isOperationCurrent()) {
        this.isLoading.set(false);
      }
    }
  }

  async resolveConflictUseServerValues(): Promise<void> {
    const id = this.clinicId();
    if (!id || this.isLoading() || this.isSubmitting()) {
      return;
    }
    this.versionConflict.set(false);
    this.submitError.set(null);
    await this.loadForEdit(id);
  }

  private async refreshCapabilitiesSilently(
    expectedGen: number,
    expectedOwner: string | null,
    expectedEditMode: boolean,
    expectedClinicId: string | null,
  ): Promise<void> {
    try {
      const caps = await firstValueFrom(this.clinicsService.getCapabilities());
      if (!this.isContextCurrent(expectedGen, expectedOwner, expectedEditMode, expectedClinicId)) {
        return;
      }
      this.setCapabilities(caps);
    } catch {
      if (!this.isContextCurrent(expectedGen, expectedOwner, expectedEditMode, expectedClinicId)) {
        return;
      }
      this.setCapabilities(createUnavailableCapabilities(this.capabilities()));
    }
  }

  private async refreshClinicMetadataPreserveInputs(
    id: string,
    expectedGen: number,
    expectedOwner: string | null,
  ): Promise<void> {
    try {
      const latest = await firstValueFrom(this.clinicsService.getClinic(id));
      if (!this.isContextCurrent(expectedGen, expectedOwner, true, id) || latest.id !== id) {
        return;
      }
      this.clinic.set(structuredClone(latest));
    } catch {
      // Preserve existing clinic snapshot if background metadata refresh fails
    }
  }
}
