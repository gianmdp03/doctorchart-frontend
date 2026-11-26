import { Component, computed, DestroyRef, effect, HostListener, inject, OnInit, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideChartNoAxesColumn,
  lucideCalendarDays,
  lucideCheck,
  lucideClipboardList,
  lucideClock,
  lucideNotebookPen,
  lucideRefreshCw,
  lucideStethoscope,
  lucideUsers,
} from '@ng-icons/lucide';
import { firstValueFrom, takeUntil } from 'rxjs';
import { FEATURE_FLAGS } from '../../core/config/feature-flags';
import { displayLocalDate } from '../../core/date/display-date';
import { instantParts, shiftCalendarDate } from '../../core/date/user-time-zone';
import { ClinicalEncounterDashboard } from '../../core/models/clinical-encounter.model';
import { AccountReadScope } from '../../core/services/account-read-scope';
import { AuthService } from '../../core/services/auth.service';
import { ClinicalContextService } from '../../core/services/clinical-context.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { InteractionStatusService } from '../../core/services/interaction-status.service';
import { UserClockService } from '../../core/services/user-clock.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { Booking, BookingState, bookingState, bookingStatusLabel } from '../calendar/bookings.models';
import { BookingsService } from '../calendar/bookings.service';
import { isCapabilityVerified } from '../clinics/clinics.models';
import { ClinicsService } from '../clinics/clinics.service';

interface AgendaRow {
  id: string;
  start: string;
  time: string;
  name: string;
  place?: string;
  status: string;
  state: BookingState;
}

const monthLabel = new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric', timeZone: 'UTC' });

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, RouterLink, NgIcon],
  providers: [
    provideIcons({
      lucideArrowRight,
      lucideChartNoAxesColumn,
      lucideCalendarDays,
      lucideCheck,
      lucideClipboardList,
      lucideClock,
      lucideNotebookPen,
      lucideRefreshCw,
      lucideStethoscope,
      lucideUsers,
    }),
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly clinicalContext = inject(ClinicalContextService);
  private readonly encounters = inject(ClinicalEncounterService);
  private readonly bookings = inject(BookingsService);
  private readonly clinics = inject(ClinicsService);
  private readonly workspace = inject(WorkspaceStore);
  private readonly interaction = inject(InteractionStatusService);
  private readonly clock = inject(UserClockService);
  private readonly destroyRef = inject(DestroyRef);
  readonly specialtyContextId = this.clinicalContext.id;

  readonly activity = signal<ClinicalEncounterDashboard | null>(null);
  readonly activityLoading = signal(true);
  readonly activityError = signal(false);
  readonly activityPeriod = signal<'today' | 'recent'>('today');
  readonly patientActivity = computed(() => this.activity()?.patientActivity);
  readonly monthlyPatients = computed(() => {
    const months = this.patientActivity()?.monthlyPatients ?? [];
    const maximum = Math.max(1, ...months.map(({ patients }) => patients));
    return months.map(({ month, patients }) => ({
      month,
      label: monthLabel.format(new Date(month + '-01T12:00:00Z')),
      patients,
      width: patients / maximum * 100,
    }));
  });
  readonly metrics = computed(() => [
    { label: 'Atenciones hoy', value: this.activity()?.encountersToday, icon: 'lucideClock' },
    { label: 'Consultas este mes', value: this.activity()?.encountersThisMonth, icon: 'lucideStethoscope' },
    { label: 'Pacientes registrados', value: this.activity()?.totalPatients, icon: 'lucideUsers' },
  ]);
  readonly activityRows = computed(() => {
    const activity = this.activity();
    if (!activity) return [];
    const rows = this.activityPeriod() === 'today'
      ? activity.recentEncounters.filter(({ encounterLocalDate }) => encounterLocalDate === activity.asOfDate)
      : activity.recentEncounters;
    return rows.map(({ encounter, encounterLocalDate }) => ({
      id: encounter.id,
      patientId: encounter.patientId,
      patientName: encounter.patientFullName || 'Paciente #' + encounter.patientId,
      date: displayLocalDate(encounterLocalDate),
      time: instantParts(encounter.encounterDate, this.clock.timeZone()).time,
    }));
  });

  private readonly calendarConfigured = computed(() =>
    FEATURE_FLAGS.CALENDAR_ENABLED && FEATURE_FLAGS.SCHEDULES_ENABLED &&
    this.workspace.clinicsEnabled() && this.workspace.hasReadyContext() &&
    this.specialtyContextId() !== null,
  );
  private readonly agendaEntitlement = signal<{ plan: string; owner: string; validUntil: number } | null>(null);
  readonly calendarAvailable = computed(() => {
    const entitlement = this.agendaEntitlement();
    return this.calendarConfigured() && entitlement !== null &&
      entitlement.plan === this.auth.doctorchartPlanTier() &&
      entitlement.owner === this.auth.currentUser()?.id && entitlement.validUntil > this.clock.now();
  });
  private readonly todayBookings = signal<Booking[]>([]);
  readonly agendaLoading = signal(true);
  readonly agendaError = signal(false);
  readonly agenda = computed(() => {
    const zone = this.clock.timeZone();
    const pending: AgendaRow[] = [];
    const present: AgendaRow[] = [];
    let completed = 0;
    for (const booking of this.todayBookings()) {
      const state = bookingState(booking);
      if (state === 'COMPLETED') {
        completed++;
        continue;
      }
      if (state === 'NO_SHOW' || state === 'CANCELLED') continue;
      const clinic = booking.clinicSnapshot;
      const row = {
        id: booking.id,
        start: booking.start,
        time: instantParts(booking.start, zone).time,
        name: booking.attendeeName || booking.contactName,
        place: clinic?.modality === 'TELECONSULTATION' ? 'Teleconsulta' : clinic?.name,
        status: bookingStatusLabel(state, clinic?.modality),
        state,
      };
      (state === 'CHECKED_IN' ? present : pending).push(row);
    }
    return {
      pending: pending.length,
      present: present.length,
      completed,
      rows: [...present, ...pending].slice(0, 4),
    };
  });

  readonly greeting = computed(() => {
    const hour = Number(instantParts(new Date(this.clock.now()), this.clock.timeZone()).time.slice(0, 2));
    const prefix =
      hour >= 20 || hour < 6 ? 'Buenas noches' : hour >= 13 ? 'Buenas tardes' : 'Buen día';
    const name = this.auth.userName()?.trim();
    return name ? `${prefix}, ${name}` : prefix;
  });
  readonly todayDate = computed(() => displayLocalDate(this.clock.day()));
  readonly weekday = computed(() => new Intl.DateTimeFormat('es-AR', {
    timeZone: 'UTC',
    weekday: 'long',
  }).format(new Date(this.clock.day() + 'T12:00:00Z')));

  readonly quickNotes = signal('');
  readonly isNotesDirty = signal(false);
  readonly isSavingNotes = signal(false);
  readonly isNotesSaved = signal(false);
  readonly notesError = signal<string | null>(null);
  private readonly notesScope = computed(() =>
    JSON.stringify([this.auth.currentUser()?.id, this.clinicalContext.id()]),
  );
  private readonly activityReads = new AccountReadScope(() => {
    this.activityPeriod.set('today');
    this.loadActivity();
  });
  private readonly agendaReads = new AccountReadScope(() => void this.loadAgenda());

  constructor() {
    let notesScope = this.notesScope();
    effect(() => {
      const scope = this.notesScope();
      const saved = this.workspace.quickNotes() ?? '';
      untracked(() => {
        if (scope !== notesScope) {
          notesScope = scope;
          this.isNotesDirty.set(false);
          this.isNotesSaved.set(false);
          this.isSavingNotes.set(false);
          this.notesError.set(null);
          this.quickNotes.set(saved);
        } else if (!this.isNotesDirty() && !this.isSavingNotes()) {
          this.quickNotes.set(saved);
        }
      });
    });

    let observedDay = this.clock.day();
    let observedZone = this.clock.timeZone();
    let calendarConfigured = this.calendarConfigured();
    let planTier = this.auth.doctorchartPlanTier();
    effect(() => {
      const day = this.clock.day();
      const zone = this.clock.timeZone();
      const configured = this.calendarConfigured();
      const plan = this.auth.doctorchartPlanTier();
      const entitlement = this.agendaEntitlement();
      const expired = entitlement !== null && entitlement.validUntil <= this.clock.now();
      const dateChanged = day !== observedDay || zone !== observedZone;
      if (dateChanged || configured !== calendarConfigured || plan !== planTier || expired) {
        observedDay = day;
        observedZone = zone;
        calendarConfigured = configured;
        planTier = plan;
        untracked(() => {
          if (dateChanged) this.loadActivity();
          void this.loadAgenda();
        });
      }
    });
  }

  ngOnInit(): void {
    this.quickNotes.set(this.workspace.quickNotes() || '');
    this.loadActivity();
    void this.loadAgenda();
  }

  @HostListener('window:patient-created')
  @HostListener('window:patient-updated')
  @HostListener('window:patient-deleted')
  @HostListener('window:encounter-created')
  @HostListener('window:encounter-updated')
  @HostListener('window:encounter-deleted')
  @HostListener('window:auth-success')
  loadActivity(): void {
    const current = this.activityReads.begin();
    this.activity.set(null);
    this.activityError.set(false);
    this.activityLoading.set(this.activityReads.authenticated());
    if (!this.activityLoading()) return;

    this.encounters.getDashboard().pipe(takeUntil(this.activityReads.canceled)).subscribe({
      next: (activity) => {
        if (!current()) return;
        this.activity.set(activity);
        this.activityLoading.set(false);
      },
      error: () => {
        if (!current()) return;
        this.activityError.set(true);
        this.activityLoading.set(false);
      },
    });
  }

  async loadAgenda(): Promise<void> {
    const scopeIsCurrent = this.agendaReads.begin();
    const plan = this.auth.doctorchartPlanTier();
    const owner = this.auth.currentUser()?.id;
    const enabled = this.calendarConfigured() && plan !== null && plan !== 'BASIC' && !!owner;
    const current = () => scopeIsCurrent() && this.calendarConfigured() && plan === this.auth.doctorchartPlanTier();
    this.todayBookings.set([]);
    this.agendaError.set(false);
    this.agendaLoading.set(enabled);
    if (!enabled) {
      this.agendaEntitlement.set(null);
      return;
    }
    let verified = false;

    const day = this.clock.day();
    const zone = this.clock.timeZone();
    const context = this.clinicalContext.id();
    // Pad the civil date in UTC, then match the local day exactly, including DST transitions.
    const from = shiftCalendarDate(day, -1) + 'T00:00:00Z';
    const to = shiftCalendarDate(day, 2) + 'T00:00:00Z';
    const matches = new Map<string, Booking>();
    try {
      const capabilities = await firstValueFrom(
        this.clinics.getCapabilities().pipe(takeUntil(this.agendaReads.canceled)),
        { defaultValue: null },
      );
      if (!current()) return;
      verified = isCapabilityVerified(capabilities, this.clock.now());
      const validUntil = capabilities?.entitlements.validUntil;
      this.agendaEntitlement.set(verified && validUntil ? { plan, owner, validUntil: Date.parse(validUntil) } : null);
      if (!verified) return;

      let read = 0;
      for (let page = 0; ; page++) {
        const result = await firstValueFrom(
          this.bookings.list(from, to, page).pipe(takeUntil(this.agendaReads.canceled)),
          { defaultValue: null },
        );
        if (!current() || !result) return;
        for (const booking of result.items) {
          if (booking.specialtyContextId === String(context) &&
              instantParts(booking.start, zone).day === day) {
            matches.set(booking.id, booking);
          }
        }
        read += result.items.length;
        if (!result.items.length || read >= result.totalElements) break;
      }
      this.todayBookings.set([...matches.values()].sort((a, b) => Date.parse(a.start) - Date.parse(b.start)));
    } catch {
      if (current()) {
        if (verified) this.agendaError.set(true);
        else this.agendaEntitlement.set(null);
      }
    } finally {
      if (current()) this.agendaLoading.set(false);
    }
  }

  onNotesInput(content: string): void {
    this.quickNotes.set(content);
    this.isNotesDirty.set(content !== (this.workspace.quickNotes() || ''));
    this.isNotesSaved.set(false);
  }

  async saveNotes(): Promise<void> {
    if (!this.isNotesDirty() || this.isSavingNotes()) return;

    this.isSavingNotes.set(true);
    this.isNotesSaved.set(false);
    this.notesError.set(null);
    const submitted = this.quickNotes();
    const scope = this.notesScope();
    try {
      await this.workspace.updateQuickNotes(submitted);
      if (this.destroyRef.destroyed || this.notesScope() !== scope) return;
      const unchanged = this.quickNotes() === submitted;
      this.isNotesDirty.set(!unchanged);
      this.isNotesSaved.set(unchanged);
      if (unchanged) this.interaction.notifySuccess('Las notas se guardaron correctamente.');
    } catch {
      if (!this.destroyRef.destroyed && this.notesScope() === scope) {
        this.notesError.set('No pudimos confirmar el guardado. Tus notas se conservan para que puedas reintentar.');
      }
    } finally {
      if (!this.destroyRef.destroyed && this.notesScope() === scope) this.isSavingNotes.set(false);
    }
  }
}
