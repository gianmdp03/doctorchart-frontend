import {
  ChangeDetectionStrategy,
  Component,
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
import { environment } from '../../../environments/environment';
import { AccountReadScope } from '../../core/services/account-read-scope';
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
  canTransitionClinicStatus,
  describeCapabilityBanner,
  fieldErrorMessage,
  formatClinicDate,
  formatClinicStatusLabel,
  isValidCanonicalBigInt,
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
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly clinicsService = inject(ClinicsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly readScope = new AccountReadScope(() => this.resetOnAccountChange());

  readonly limits = CLINIC_FIELD_LIMITS;
  readonly commonTimezones = COMMON_IANA_TIMEZONES;
  readonly plansUrl = environment.bycodePlansUrl || '';

  readonly isEditMode = signal(false);
  readonly clinicId = signal<string | null>(null);
  readonly clinic = signal<Clinic | null>(null);
  readonly capabilities = signal<ClinicCapabilities | null>(null);

  readonly isLoading = signal(false);
  readonly isSubmitting = signal(false);
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

  readonly isArchived = computed(() => this.clinic()?.status === 'ARCHIVED');

  readonly isAllowedByCapabilities = computed(() => {
    const caps = this.capabilities();
    if (this.isEditMode()) {
      return canEditClinic(this.clinic(), caps);
    }
    return canCreateClinic(caps);
  });

  readonly isReadOnly = computed(
    () =>
      this.isLoading() ||
      this.isSubmitting() ||
      this.versionConflict() ||
      this.isArchived() ||
      !this.isAllowedByCapabilities(),
  );

  readonly capabilityBanner = computed<CapabilityBannerDescriptor | null>(() =>
    describeCapabilityBanner(this.capabilities()),
  );

  readonly pageTitle = computed(() => {
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
  });

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
        this.form.reset({
          name: '',
          country: DEFAULT_CLINIC_COUNTRY,
          province: '',
          city: '',
          address: '',
          timezone: DEFAULT_CLINIC_TIMEZONE,
        });
        void this.loadCapabilitiesOnly();
      }
    });
  }

  private resetOnAccountChange(): void {
    this.clinic.set(null);
    this.capabilities.set(null);
    this.isLoading.set(false);
    this.isSubmitting.set(false);
    this.loadError.set(null);
    this.submitError.set(null);
    this.submitFeedback.set(null);
    this.versionConflict.set(false);
    this.serverFieldErrors.set({});
  }

  async loadCapabilitiesOnly(): Promise<void> {
    if (!this.readScope.authenticated()) return;
    const active = this.readScope.begin();
    this.isLoading.set(true);
    this.loadError.set(null);
    try {
      const caps = await firstValueFrom(
        this.clinicsService.getCapabilities().pipe(takeUntil(this.readScope.canceled)),
      );
      if (!active()) return;
      this.capabilities.set(caps);
    } catch (error) {
      if (!active()) return;
      const parsed = parseClinicHttpError(
        error,
        'No pudimos verificar los permisos comerciales para crear consultorios.',
      );
      this.loadError.set(parsed.userMessage);
    } finally {
      if (active()) {
        this.isLoading.set(false);
      }
    }
  }

  async loadForEdit(id: string): Promise<void> {
    if (!this.readScope.authenticated()) return;
    if (!isValidCanonicalBigInt(id, false)) {
      this.clinic.set(null);
      this.loadError.set('El identificador del consultorio no tiene un formato válido.');
      return;
    }

    const active = this.readScope.begin();
    this.isLoading.set(true);
    this.loadError.set(null);

    try {
      const [capsResult, clinicResult] = await Promise.allSettled([
        firstValueFrom(
          this.clinicsService.getCapabilities().pipe(takeUntil(this.readScope.canceled)),
        ),
        firstValueFrom(
          this.clinicsService.getClinic(id).pipe(takeUntil(this.readScope.canceled)),
        ),
      ]);
      if (!active()) return;

      if (capsResult.status === 'fulfilled') {
        this.capabilities.set(capsResult.value);
      }

      if (clinicResult.status === 'fulfilled') {
        this.applyServerClinicToForm(clinicResult.value);
      } else {
        this.clinic.set(null);
        const parsed = parseClinicHttpError(
          clinicResult.reason,
          'No pudimos cargar los datos del consultorio.',
        );
        this.loadError.set(parsed.userMessage);
      }
    } finally {
      if (active()) {
        this.isLoading.set(false);
      }
    }
  }

  private applyServerClinicToForm(serverClinic: Clinic): void {
    this.clinic.set(structuredClone(serverClinic));
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
    if (this.isSubmitting() || this.isLoading()) {
      return false;
    }
    return canTransitionClinicStatus(this.clinic(), targetStatus, this.capabilities());
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
      return;
    }

    const raw = this.form.getRawValue();
    this.isSubmitting.set(true);

    try {
      if (!this.isEditMode()) {
        const created = await firstValueFrom(
          this.clinicsService.createClinic({
            name: raw.name.trim(),
            country: raw.country.trim(),
            province: raw.province.trim(),
            city: raw.city.trim(),
            address: raw.address.trim(),
            timezone: raw.timezone.trim(),
          }),
        );
        this.clinic.set(created);
        void this.router.navigate(['/clinics']);
        return;
      }

      const current = this.clinic();
      if (!current) {
        return;
      }

      const patchPayload: UpdateClinicRequest = {
        expectedVersion: current.version,
        name: raw.name.trim(),
        country: raw.country.trim(),
        province: raw.province.trim(),
        city: raw.city.trim(),
        address: raw.address.trim(),
        timezone: raw.timezone.trim(),
      };

      const updated = await firstValueFrom(
        this.clinicsService.updateClinic(current.id, patchPayload),
      );
      this.applyServerClinicToForm(updated);
      this.submitFeedback.set('Los datos del consultorio se guardaron correctamente.');
      await this.refreshCapabilitiesSilently();
    } catch (error) {
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
        await this.refreshCapabilitiesSilently();
      }
      if (parsed.isStateConflict && this.clinicId()) {
        await this.refreshClinicMetadataPreserveInputs(this.clinicId()!);
      }
    } finally {
      this.isSubmitting.set(false);
    }
  }

  async changeStatus(targetStatus: ClinicStatus): Promise<void> {
    const current = this.clinic();
    if (!current || !this.canTransition(targetStatus)) {
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);
    this.submitFeedback.set(null);

    try {
      const updated = await firstValueFrom(
        this.clinicsService.updateClinicStatus(current.id, {
          expectedVersion: current.version,
          status: targetStatus,
        }),
      );
      this.clinic.set(structuredClone(updated));
      this.submitFeedback.set(
        `El consultorio pasó a estado ${formatClinicStatusLabel(updated.status)}.`,
      );
      await this.refreshCapabilitiesSilently();
    } catch (error) {
      const parsed = parseClinicHttpError(
        error,
        'No pudimos actualizar el estado del consultorio.',
      );
      this.submitError.set(parsed.userMessage);
      if (parsed.isVersionConflict) {
        this.versionConflict.set(true);
      }
      if (parsed.shouldRefreshCapabilities) {
        await this.refreshCapabilitiesSilently();
      }
      if (parsed.isStateConflict) {
        await this.refreshClinicMetadataPreserveInputs(current.id);
      }
    } finally {
      this.isSubmitting.set(false);
    }
  }

  async resolveConflictKeepLocalEdits(): Promise<void> {
    const id = this.clinicId();
    if (!id || this.isLoading() || this.isSubmitting()) {
      return;
    }
    this.isLoading.set(true);
    try {
      const [caps, latest] = await Promise.all([
        firstValueFrom(this.clinicsService.getCapabilities()),
        firstValueFrom(this.clinicsService.getClinic(id)),
      ]);
      this.capabilities.set(caps);
      this.clinic.set(structuredClone(latest));
      this.versionConflict.set(false);
      this.submitError.set(null);
      this.submitFeedback.set(
        `Se cargó la versión ${latest.version} del servidor conservando tus cambios en pantalla. Revisalos y volvé a guardar.`,
      );
    } catch (error) {
      const parsed = parseClinicHttpError(
        error,
        'No pudimos recargar la última versión del consultorio.',
      );
      this.submitError.set(parsed.userMessage);
    } finally {
      this.isLoading.set(false);
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

  private async refreshCapabilitiesSilently(): Promise<void> {
    try {
      const caps = await firstValueFrom(this.clinicsService.getCapabilities());
      this.capabilities.set(caps);
    } catch {
      // Preserve existing state if background capabilities refresh fails
    }
  }

  private async refreshClinicMetadataPreserveInputs(id: string): Promise<void> {
    try {
      const latest = await firstValueFrom(this.clinicsService.getClinic(id));
      this.clinic.set(structuredClone(latest));
    } catch {
      // Preserve existing state if background metadata refresh fails
    }
  }
}
