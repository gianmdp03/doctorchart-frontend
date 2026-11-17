import {
  Component,
  DestroyRef,
  Injector,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, convertToParamMap } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { firstValueFrom, combineLatest, of } from 'rxjs';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowLeft,
  lucideArrowRight,
  lucideArrowUpRight,
  lucideCalendarCheck,
  lucideCalendarDays,
  lucideCheck,
  lucideChevronLeft,
  lucideChevronRight,
  lucideClock3,
  lucideMapPin,
  lucideSearch,
  lucideShieldCheck,
  lucideVideo,
} from '@ng-icons/lucide';
import { PublicBookingReceiptComponent } from './public-booking-receipt.component';
import { isArgentineTimezone, userTimeZone } from '../../core/date/user-time-zone';
import { modalityLabel, type AppointmentModality } from '../clinics/clinics.models';
import { FEATURE_FLAGS } from '../../core/config/feature-flags';
import {
  ARGENTINA,
  BOOKING_COUNTRIES,
  BookingCountry,
  bookingCountry,
  localitiesFor,
} from '../../core/location/booking-locations';
import { DatePickerComponent } from '../../shared/date-picker/date-picker.component';
import { AppointmentsService, PublicSpecialty } from './appointments.service';
import {
  PublicDoctor,
  PublicClinic,
  PublicBookingDraft,
  PublicConfirmation,
} from './appointments.models';
import {
  civilDate,
  localTime,
  displayDay,
  slotOffsetLabel,
  addDays,
} from '../calendar/bookings.models';
import { solveProof } from './proof-of-work';
@Component({
  selector: 'app-appointments-page',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    DatePickerComponent,
    ThemeToggleComponent,
    NgIcon,
    PublicBookingReceiptComponent,
  ],
  providers: [
    provideIcons({
      lucideArrowLeft,
      lucideArrowRight,
      lucideArrowUpRight,
      lucideCalendarCheck,
      lucideCalendarDays,
      lucideCheck,
      lucideChevronLeft,
      lucideChevronRight,
      lucideClock3,
      lucideMapPin,
      lucideSearch,
      lucideShieldCheck,
      lucideVideo,
    }),
  ],
  templateUrl: './appointments-page.component.html',
  styleUrls: ['./public-booking.css', './appointments-page.component.css'],
})
export class AppointmentsPageComponent {
  private readonly api = inject(AppointmentsService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroy = inject(DestroyRef);
  private readonly pickers = viewChildren(DatePickerComponent);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly injector = inject(Injector);
  readonly confirmationEnabled = FEATURE_FLAGS.NOTIFICATIONS_ENABLED;
  private readonly dayFormat = new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });
  private readonly weekdayFormat = new Intl.DateTimeFormat('es-AR', {
    weekday: 'short',
    timeZone: 'UTC',
  });
  private readonly weekFormat = new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });
  private generation = 0;
  private slotsGeneration = 0;
  private searchGeneration = 0;
  private controller: AbortController | null = null;
  private attempt: { payload: string; key: string } | null = null;
  readonly specialtyContextId = signal('');
  readonly profile = signal<PublicDoctor | null>(null);
  readonly doctors = signal<PublicDoctor[]>([]);
  readonly busy = signal(false);
  readonly slotsBusy = signal(false);
  readonly sending = signal(false);
  readonly error = signal('');
  readonly slotError = signal('');
  readonly formError = signal('');
  readonly confirmation = signal<PublicConfirmation | null>(null);
  readonly copyFeedback = signal('');
  readonly days = signal<{ date: string; slots: { start: string; end: string }[] }[]>([]);
  readonly status = signal('');
  readonly conflict = signal(false);
  readonly id = signal('');
  readonly clinicId = signal('');
  readonly selectedStart = signal('');
  readonly formOpen = signal(false);
  readonly displayDay = displayDay;
  readonly localTime = localTime;
  readonly slotOffsetLabel = slotOffsetLabel;
  readonly civilDate = civilDate;
  readonly availableDays = computed(() => this.days().filter((day) => day.slots.length > 0));
  private readonly preferredDay = signal('');
  readonly activeDay = computed(
    () =>
      this.availableDays().find((day) => day.date === this.preferredDay()) ??
      this.availableDays()[0],
  );
  readonly reviewing = signal(false);
  readonly step = computed(() =>
    this.confirmation() ? 5 : this.reviewing() ? 4 : this.formOpen() ? 3 : this.clinicId() ? 2 : 1,
  );
  readonly steps = ['Consultorio', 'Horario', 'Tus datos', 'Revisión', 'Confirmación'];
  readonly selectedSlot = computed(() =>
    this.availableDays()
      .flatMap((day) => day.slots)
      .find((slot) => slot.start === this.selectedStart()),
  );
  readonly countries = BOOKING_COUNTRIES;
  readonly modalityLabel = modalityLabel;
  readonly patientZone = this.browser ? userTimeZone() : 'UTC';
  country = ARGENTINA;
  readonly specialties = signal<PublicSpecialty[]>([]);
  private specialtiesCountry = '';
  filters = {
    name: '',
    province: '',
    city: '',
    specialty: '',
    modality: '' as AppointmentModality | '',
  };
  page = 0;
  hasMore = false;
  date = civilDate(new Date().toISOString(), this.country.timezone);
  contactName = '';
  contactPhone = '';
  attendeeName = '';
  different = false;
  documentCountry = 'AR';
  documentType: 'DNI' | 'PASSPORT' = 'DNI';
  document = '';
  email = '';
  answers: Record<string, string> = {};
  consent = false;
  constructor() {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap ?? of(this.route.snapshot?.queryParamMap ?? convertToParamMap({})),
    ])
      .pipe(takeUntilDestroyed())
      .subscribe(([params, query]) => {
        this.id.set(params.get('publicId') ?? '');
        this.reset();
        this.clinicId.set(query.get('clinic') ?? '');
        if (this.id()) void this.loadProfile();
        else if (this.browser) void this.search(0);
        else this.busy.set(true);
      });
    this.destroy.onDestroy(() => {
      this.generation++;
      this.slotsGeneration++;
      this.searchGeneration++;
      this.controller?.abort();
    });
  }
  private reset() {
    this.generation++;
    this.slotsGeneration++;
    this.searchGeneration++;
    this.sending.set(false);
    this.status.set('');
    this.controller?.abort();
    this.profile.set(null);
    this.specialtyContextId.set('');
    this.confirmation.set(null);
    this.copyFeedback.set('');
    this.days.set([]);
    this.selectedStart.set('');
    this.preferredDay.set('');
    this.formOpen.set(false);
    this.reviewing.set(false);
    this.error.set('');
    this.formError.set('');
    this.conflict.set(false);
    this.attempt = null;
    this.contactName = '';
    this.contactPhone = '';
    this.attendeeName = '';
    this.different = false;
    this.documentCountry = 'AR';
    this.documentType = 'DNI';
    this.document = '';
    this.email = '';
    this.answers = {};
    this.consent = false;
  }
  private message(err: unknown, fallback: string) {
    const value = err as { status?: number; error?: { code?: string; message?: string } };
    if (value.status === 429)
      return 'Recibimos demasiadas solicitudes. Esperá un minuto y reintentá.';
    if (value.status === 503)
      return 'El servicio no está disponible. Si estabas confirmando, conservá el formulario y reintentá para verificar el resultado.';
    if (value.status === 404)
      return 'Este profesional o consultorio ya no está disponible para reservar online.';
    if (value.status === 403)
      return 'Las reservas online o su verificación no están disponibles. Reintentá o contactá al consultorio.';
    return value.error?.message || fallback;
  }
  changeCountry(country: BookingCountry) {
    this.country = country;
    this.filters.specialty = '';
    this.specialties.set([]);
    this.specialtiesCountry = '';
    this.changeProvince('');
    this.date = civilDate(new Date().toISOString(), country.timezone);
    void this.search();
  }
  changeProvince(province: string) {
    this.filters['province'] = province;
    this.filters['city'] = '';
  }
  changeModality(modality: AppointmentModality | '') {
    this.filters.modality = modality;
    this.filters.specialty = '';
    this.specialties.set([]);
    this.specialtiesCountry = '';
    if (modality === 'TELECONSULTATION') this.changeProvince('');
    void this.search();
  }
  supportsOffer(clinic: PublicClinic) {
    return clinic.modality === 'TELECONSULTATION' || !!bookingCountry(clinic.country);
  }
  patientTime(instant: string, zone: string) {
    if (!this.browser || zone === this.patientZone) return '';
    return (
      displayDay(civilDate(instant, this.patientZone)) +
      ' · ' +
      localTime(instant, this.patientZone) +
      ' (' +
      this.patientZone +
      ')'
    );
  }
  localities() {
    return localitiesFor(this.country, this.filters['province']);
  }
  calendarDay(date: string): string {
    return this.dayFormat.format(new Date(date + 'T12:00:00Z'));
  }
  weekday(date: string): string {
    return this.weekdayFormat.format(new Date(date + 'T12:00:00Z')).replace('.', '');
  }
  weekLabel(date: string): string {
    return this.weekFormat.formatRange(
      new Date(date + 'T12:00:00Z'),
      new Date(addDays(date, 6) + 'T12:00:00Z'),
    );
  }
  initials(name: string): string {
    const parts = name
      .trim()
      .replace(/^(?:dr|dra|doctor|doctora)\.?\s+/i, '')
      .split(/\s+/);
    return (
      parts.length > 1 ? parts[0][0] + parts.at(-1)![0] : parts[0].slice(0, 2)
    ).toLocaleUpperCase('es-AR');
  }
  agendaTime(zone: string): string {
    return isArgentineTimezone(zone) ? 'Hora de Argentina' : 'Horario del consultorio';
  }
  clearFilters(): void {
    this.filters = { name: '', province: '', city: '', specialty: '', modality: '' };
    this.specialties.set([]);
    this.specialtiesCountry = '';
    void this.search(0);
  }
  async search(page = 0) {
    const generation = ++this.searchGeneration,
      country = this.country;
    const filters = { ...this.filters, country: country.name };
    const specialtiesKey = country.code + '|' + filters.modality;
    const includeSpecialties = this.specialtiesCountry !== specialtiesKey;
    this.busy.set(true);
    this.error.set('');
    try {
      const result = await firstValueFrom(
        this.api.search(
          includeSpecialties ? { ...filters, includeSpecialties: '1' } : filters,
          page,
        ),
      );
      if (generation !== this.searchGeneration) return;
      if (includeSpecialties && result.specialties) {
        this.specialties.set(result.specialties);
        this.specialtiesCountry = specialtiesKey;
      }
      const province = filters.province.toLowerCase(),
        city = filters.city.toLowerCase();
      const doctors = result.items.map((doctor) => ({
        ...doctor,
        clinics: doctor.clinics.filter(
          (clinic) =>
            (!filters.modality || (clinic.modality ?? 'IN_PERSON') === filters.modality) &&
            (clinic.modality === 'TELECONSULTATION' ||
              (bookingCountry(clinic.country) === country &&
                clinic.province.toLowerCase().includes(province) &&
                clinic.city.toLowerCase().includes(city))),
        ),
      }));
      this.doctors.set(doctors.filter((doctor) => doctor.clinics.length));
      this.page = page;
      this.hasMore = result.hasMore;
    } catch (err) {
      if (generation === this.searchGeneration) {
        this.doctors.set([]);
        this.error.set(this.message(err, 'No pudimos buscar profesionales.'));
      }
    } finally {
      if (generation === this.searchGeneration) this.busy.set(false);
    }
  }
  async loadProfile(preserve = false) {
    const generation = ++this.generation,
      id = this.id();
    this.busy.set(true);
    this.error.set('');
    try {
      const result = await firstValueFrom(this.api.profile(id));
      if (generation !== this.generation || id !== this.id()) return;
      const clinics = result.clinics.filter((clinic) => this.supportsOffer(clinic));
      if (!clinics.length) {
        this.profile.set(null);
        this.error.set('Este profesional no ofrece turnos online en este momento.');
        return;
      }
      this.profile.set({ ...result, clinics });
      const offers = result.specialties ?? [];
      const requested =
        this.specialtyContextId() ||
        this.route.snapshot?.queryParamMap.get('specialtyContextId') ||
        '';
      if (requested && !offers.some((c) => c.id === requested)) {
        this.profile.set(null);
        this.error.set('La especialidad de este enlace ya no está disponible.');
        return;
      }
      this.specialtyContextId.set(requested || (offers.length === 1 ? offers[0].id : ''));
      const available = this.contextClinics();
      if (!available.some((c) => c.id === this.clinicId()))
        this.clinicId.set(available[0]?.id ?? '');
      if (preserve) {
        const next: Record<string, string> = {};
        for (const question of result.form.questions)
          next[question.key] = this.answers[question.key] ?? '';
        this.answers = next;
        this.conflict.set(false);
        this.formError.set('Revisá las preguntas vigentes y elegí un horario actualizado.');
      }
      const clinic = this.clinic();
      if (!preserve && clinic?.modality === 'TELECONSULTATION')
        this.date = civilDate(new Date().toISOString(), clinic.timezone);
      await this.loadSlots();
    } catch (err) {
      if (generation === this.generation) {
        this.profile.set(null);
        this.error.set(this.message(err, 'No pudimos cargar el perfil.'));
      }
    } finally {
      if (generation === this.generation) this.busy.set(false);
    }
  }
  specialtyNames(doctor: PublicDoctor) {
    return doctor.specialties?.map((c) => c.name).join(' · ') || doctor.specialty;
  }
  selectedSpecialty() {
    const doctor = this.profile();
    return (
      doctor?.specialties?.find((context) => context.id === this.specialtyContextId())?.name ||
      doctor?.specialty
    );
  }
  restartBooking() {
    this.confirmation.set(null);
    this.copyFeedback.set('');
    this.reviewing.set(false);
    this.selectedStart.set('');
    void this.loadProfile();
    this.focusHeading('professional-title');
  }
  async copyCode() {
    const confirmation = this.confirmation();
    if (!this.browser || !confirmation?.accessCode) return;
    this.copyFeedback.set('');
    let message = 'Código copiado.';
    try {
      await navigator.clipboard.writeText(confirmation.accessCode);
    } catch {
      message = 'Seleccioná el código para copiarlo.';
    }
    if (this.confirmation() === confirmation) this.copyFeedback.set(message);
  }
  directContext(doctor: PublicDoctor) {
    return doctor.specialties?.find((c) => c.code === this.filters.specialty)?.id;
  }
  contextClinics() {
    const profile = this.profile();
    return profile?.specialties?.length
      ? (profile.specialties
          .find((c) => c.id === this.specialtyContextId())
          ?.clinics.filter((c) => this.supportsOffer(c)) ?? [])
      : (profile?.clinics ?? []);
  }
  changeSpecialty(id: string) {
    if (this.sending() || !this.profile()?.specialties?.some((c) => c.id === id)) return;
    this.specialtyContextId.set(id);
    this.selectedStart.set('');
    this.formOpen.set(false);
    this.reviewing.set(false);
    this.consent = false;
    this.attempt = null;
    this.clinicId.set(this.contextClinics()[0]?.id ?? '');
    void this.loadSlots();
  }
  clinic(): PublicClinic | undefined {
    return this.contextClinics().find((c) => c.id === this.clinicId());
  }
  changeClinic(id: string) {
    if (this.sending() || id === this.clinicId()) return;
    this.clinicId.set(id);
    this.selectedStart.set('');
    this.formOpen.set(false);
    this.reviewing.set(false);
    this.consent = false;
    void this.loadSlots();
  }
  changeDate(date: string) {
    if (
      this.sending() ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !Number.isFinite(Date.parse(date + 'T12:00:00Z')) ||
      new Date(date + 'T12:00:00Z').toISOString().slice(0, 10) !== date
    )
      return;
    this.date = date;
    this.preferredDay.set(date);
    this.selectedStart.set('');
    void this.loadSlots();
  }
  navigate(delta: number) {
    this.changeDate(addDays(this.date, delta * 7));
  }
  async loadSlots() {
    const g = ++this.slotsGeneration,
      id = this.id(),
      clinic = this.clinicId(),
      date = this.date;
    this.slotsBusy.set(true);
    this.days.set([]);
    this.slotError.set('');
    if (!clinic) {
      this.slotsBusy.set(false);
      return;
    }
    try {
      const result = await firstValueFrom(
        this.api.availability(id, clinic, date, this.specialtyContextId() || undefined),
      );
      if (
        g === this.slotsGeneration &&
        id === this.id() &&
        clinic === this.clinicId() &&
        date === this.date
      )
        this.days.set(result.days);
    } catch (err) {
      if (g === this.slotsGeneration)
        this.slotError.set(this.message(err, 'No pudimos consultar los horarios.'));
    } finally {
      if (g === this.slotsGeneration) this.slotsBusy.set(false);
    }
  }
  selectSlot(start: string): void {
    if (
      this.sending() ||
      this.pickers().some((picker) => picker.error()) ||
      !this.availableDays().some((day) => day.slots.some((slot) => slot.start === start))
    )
      return;
    this.selectedStart.set(start);
    this.formOpen.set(true);
    this.reviewing.set(false);
    this.conflict.set(false);
    this.formError.set('');
    this.focusHeading('public-form-title');
  }
  selectDay(date: string) {
    this.preferredDay.set(date);
  }
  editSlot() {
    if (this.sending()) return;
    this.formOpen.set(false);
    this.reviewing.set(false);
    this.focusHeading('public-availability-title');
  }
  editDetails() {
    if (this.sending()) return;
    this.reviewing.set(false);
    this.focusHeading('public-form-title');
  }
  advanceBooking(valid: boolean) {
    if (!valid || !this.canSubmit()) return;
    if (this.reviewing()) {
      void this.submit();
      return;
    }
    this.reviewing.set(true);
    this.focusHeading('public-review-title');
  }
  private focusHeading(id: string) {
    if (this.browser)
      afterNextRender(
        () => {
          const heading = document.getElementById(id);
          heading?.focus({ preventScroll: true });
          heading?.scrollIntoView({ block: 'nearest' });
        },
        { injector: this.injector },
      );
  }
  canSubmit() {
    return (
      !this.sending() &&
      !this.conflict() &&
      !!this.selectedStart() &&
      this.days().some((d) => d.slots.some((s) => s.start === this.selectedStart())) &&
      !this.pickers().some((p) => p.error()) &&
      this.consent
    );
  }
  async submit() {
    const profile = this.profile();
    if (!profile || !this.canSubmit()) return;
    const id = this.id(),
      g = this.generation;
    const body: PublicBookingDraft = {
      ...(this.specialtyContextId() ? { specialtyContextId: this.specialtyContextId() } : {}),
      clinicId: this.clinicId(),
      start: this.selectedStart(),
      formVersion: profile.form.version,
      contactName: this.contactName.trim(),
      attendeeName: this.different ? this.attendeeName.trim() : this.contactName.trim(),
      contactPhone: this.contactPhone.trim(),
      documentCountry: this.documentCountry,
      documentType: this.documentType,
      document: this.document.trim(),
      email: this.email.trim(),
      answers: { ...this.answers },
    };
    const payload = JSON.stringify(body);
    if (this.attempt?.payload !== payload) this.attempt = { payload, key: crypto.randomUUID() };
    const key = this.attempt.key;
    this.sending.set(true);
    this.formError.set('');
    this.status.set('Verificando la solicitud…');
    this.controller = new AbortController();
    try {
      const challenge = await firstValueFrom(this.api.challenge());
      const solution = await solveProof(
        challenge.token,
        challenge.difficulty,
        this.controller.signal,
      );
      if (g !== this.generation || id !== this.id()) return;
      this.status.set('Confirmando tu turno…');
      const confirmation = await firstValueFrom(
        this.api.book(id, body, challenge.token, solution, key),
      );
      if (g !== this.generation || id !== this.id()) return;
      this.confirmation.set(confirmation);
      this.formOpen.set(false);
      this.attempt = null;
      this.contactName = '';
      this.attendeeName = '';
      this.different = false;
      this.document = '';
      this.email = '';
      this.contactPhone = '';
      this.answers = {};
      this.consent = false;
      this.focusHeading('confirmation-title');
    } catch (err) {
      if (g !== this.generation || id !== this.id()) return;
      const e = err as { status?: number; error?: { code?: string } };
      this.formError.set(
        this.message(
          err,
          'No pudimos confirmar. Tus datos se conservaron; reintentá con el mismo formulario.',
        ),
      );
      if (e.status === 409) {
        this.conflict.set(true);
        if (e.error?.code === 'FORM_VERSION_CONFLICT') {
          this.sending.set(false);
          this.editDetails();
          await this.loadProfile(true);
        } else await this.loadSlots();
      }
    } finally {
      if (g === this.generation) {
        this.sending.set(false);
        this.status.set('');
      }
    }
  }
}
