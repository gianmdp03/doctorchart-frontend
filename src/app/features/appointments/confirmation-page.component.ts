<<<<<<< Updated upstream
import { Component, DestroyRef, ElementRef, Injector, afterNextRender, computed, effect, inject, signal, viewChild } from '@angular/core';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
=======
import { Component, DestroyRef, ElementRef, Injector, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { DOCUMENT, isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
>>>>>>> Stashed changes
import { PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { DatePickerComponent } from '../../shared/date-picker/date-picker.component';
import { civilDate, displayDay, localTime, slotOffsetLabel, STATUS_LABELS, type BookingStatus } from '../calendar/bookings.models';
import { AppointmentsService } from './appointments.service';
import type { AvailabilityDay, PortalBooking, PortalPreview } from './appointments.models';
import { solveProof } from './proof-of-work';
import { PublicBookingShellComponent } from './public-booking-shell.component';
import { PORTAL_TIMEZONE, portalDatePassed, portalInstant } from './portal-booking-time';

type BookingAction = 'cancel' | 'reschedule';
type ProposalLink = { reference: string; version: string; action: 'confirm' | 'reschedule' };
const slotWeekday = new Intl.DateTimeFormat('es-AR', {weekday:'long', timeZone:'UTC'});

@Component({
  selector: 'app-confirmation-page',
  imports: [FormsModule, RouterLink, DatePickerComponent, NgTemplateOutlet, PublicBookingShellComponent],
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css', './patient-entry.css'],
})
export class ConfirmationPageComponent {
  private readonly api = inject(AppointmentsService);
  private readonly destroy = inject(DestroyRef);
  private readonly injector = inject(Injector);
  private readonly stepHeading = viewChild<ElementRef<HTMLElement>>('stepHeading');
  private readonly changeHeading = viewChild<ElementRef<HTMLElement>>('changeHeading');
  private readonly proof = new AbortController();
  private readonly location = inject(DOCUMENT).location;

  private resendTimer?: ReturnType<typeof setTimeout>;
  private expiryTimer?: ReturnType<typeof setTimeout>;
  private mutation: {signature: string; key: string} | null = null;
  private alive = true;

  readonly step = signal<'identity' | 'preview' | 'code' | 'list'>('identity');
  readonly now = signal(Date.now());
  readonly expanded = signal<string | null>(null);
  readonly pastMessage = 'Este turno corresponde a una fecha pasada y ya no se encuentra disponible para consultar sus detalles';
  readonly groups = computed(() => {
    this.now();
    const source = this.step() === 'preview' ? this.previews() : this.items();
    const upcoming = source.filter(item => this.category(item) === 'upcoming').sort((a, b) => this.sortTime(a) - this.sortTime(b));
    const past = source.filter(item => this.category(item) === 'past').sort((a, b) => this.sortTime(b) - this.sortTime(a));
    const cancelled = source.filter(item => this.category(item) === 'cancelled').sort((a, b) => this.sortTime(b) - this.sortTime(a));
    return [{key:'upcoming', title:'Próximos turnos', items:upcoming}, {key:'past', title:'Turnos anteriores', items:past},
      {key:'cancelled', title:'Turnos cancelados', items:cancelled}];
  });
  readonly nextBooking = computed(() => this.groups()[0].items.find(item => this.canOpen(item)));
  readonly busy = signal(false);
  readonly canResend = signal(true);
  readonly error = signal('');
  readonly feedback = signal('');
  readonly proposalLink = signal<ProposalLink | null>(null);
  readonly items = signal<PortalBooking[]>([]);
  readonly hasMore = signal(false);
  readonly previews = signal<PortalPreview[]>([]);
  readonly hasMorePreviews = signal(false);
  readonly codeCells = [0, 1, 2, 3, 4, 5];
  readonly change = signal<{booking: PortalBooking; action: BookingAction} | null>(null);
  readonly previewChange = signal<{reference: string; action: BookingAction} | null>(null);
  readonly reasonLimit = 500;
  readonly slotDays = signal<AvailabilityDay[]>([]);
  readonly loadingSlots = signal(false);
  readonly displayDay = displayDay;
  readonly civilDate = civilDate;
  readonly localTime = localTime;
  readonly slotOffsetLabel = slotOffsetLabel;
  date = '';
  start = '';
  changeReason = '';
  code = '';
  private requestId = '';
  document = '';
  maskedEmail = '';
  private reference = '';
  private focusedReference = '';
  private pendingAction: BookingAction | null = null;

  constructor() {
    const browser = isPlatformBrowser(inject(PLATFORM_ID));
<<<<<<< Updated upstream
    const clock = browser ? setInterval(() => this.now.set(Date.now()), 1000) : undefined;
    effect(() => {
      const selected = this.change();
      if (selected && !this.canManage(selected.booking)) this.closeChange();
      const pending = this.previewChange();
      if (pending) {
        const booking = this.previews().find(item => item.reference === pending.reference);
        if (!booking || !this.canOpen(booking)) this.closeChange();
      }
      const reference = this.expanded();
      if (reference) {
        const booking = this.items().find(item => item.reference === reference);
        if (!booking || !this.canOpen(booking)) this.expanded.set(null);
      }
    });
=======
    if (browser) {
      const params = new URLSearchParams(this.location?.hash.slice(1));
      const action = params.get('action'), reference = params.get('reference'), version = params.get('version');
      if ((action === 'confirm' || action === 'reschedule') && reference &&
          /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(reference) &&
          version && /^[1-9]\d{0,18}$/.test(version)) {
        this.proposalLink.set({action, reference, version});
        this.focusedReference = reference;
      }
    }
>>>>>>> Stashed changes
    const info = inject(Router).currentNavigation()?.extras.info as {bookingDni?: unknown} | undefined;
    const dni = typeof info?.bookingDni === 'string' && /^[0-9]{5,8}$/.test(info.bookingDni) ? info.bookingDni : '';
    const draft = this.api.takePortalDraft();
    if (this.proposalLink()) {
      void this.restoreSession();
    } else if (dni && browser) {
      this.document = dni;
      void this.lookupBookings();
    } else if (draft) {
      this.requestId = draft.requestId;
      this.document = draft.document;
      this.reference = draft.reference;
      this.maskedEmail = draft.maskedEmail;
      this.step.set('code');
      this.startResendCooldown();
    } else if (browser) {
      void this.restoreSession();
    }
    this.destroy.onDestroy(() => {
      this.alive = false;
      clearInterval(clock);
      this.proof.abort();
      this.clearSession();
    });
  }

  private request<T>(response: Observable<T>): Promise<T> {
    return firstValueFrom(response.pipe(takeUntilDestroyed(this.destroy)));
  }

  private focusStep() {
    afterNextRender(() => this.stepHeading()?.nativeElement.focus(), {injector:this.injector});
  }

  private clearSession() {
    this.expanded.set(null);
    clearTimeout(this.resendTimer);
    clearTimeout(this.expiryTimer);
    this.canResend.set(true);
    this.document = '';
    this.focusedReference = '';
    this.clearCode();
    this.previews.set([]);
    this.hasMorePreviews.set(false);
    this.items.set([]);
    this.hasMore.set(false);
    this.closeChange();
  }

  private resetView() {
    this.clearSession();
    this.error.set('');
    this.feedback.set('');
    this.step.set('identity');
    this.focusStep();
  }

  endSession() {
    return this.run(async () => {
      await this.request(this.api.endPortalSession());
      this.resetView();
    }, 'No pudimos cerrar el acceso. Volvé a intentarlo.');
  }

  private async restoreSession() {
    this.busy.set(true);
    try {
      await this.fetchBookings(false);
<<<<<<< Updated upstream
      if (this.alive) this.step.set('list');
    } catch (error) {
=======
      if (!this.alive) return;
      const proposal = this.proposalLink();
      if (proposal && !this.items().some(item => item.reference === proposal.reference)) {
        this.items.set([]);
        return;
      }
      this.step.set('list');
      if (proposal) await this.openProposal();
    } catch {
>>>>>>> Stashed changes
      // An unopened or expired browser session starts at the identity form.
      const status = (error as {status?:number}).status;
      if (status !== 401 && status !== 403) this.error.set('No pudimos recuperar tus turnos. Ingresá tu DNI para volver a intentar.');
    } finally {
      if (this.alive) this.busy.set(false);
    }
  }

  private async run(action: () => Promise<void>, message: string) {
    if (this.busy()) return;
    this.busy.set(true);
    this.error.set('');
    this.feedback.set('');
    try {
      await action();
    } catch (error: unknown) {
      if (!this.alive) return;
      const failure = error as {status?: number; error?: {code?: string; message?: string}};
      if (this.step() === 'list' && failure.error?.code === 'BOOKING_ACCESS_DENIED') this.resetView();
      this.error.set(failure.status === 429
        ? 'Esperá un minuto antes de volver a intentar.'
        : failure.error?.message || message);
    } finally {
      if (this.alive) this.busy.set(false);
    }
  }

  private async proofOfWork() {
    const challenge = await this.request(this.api.challenge());
    const solution = await solveProof(challenge.token, challenge.difficulty, this.proof.signal);
    return {token: challenge.token, solution};
  }

  lookupBookings(append = false) {
    const proposal = this.proposalLink();
    if (proposal && !append) return this.requestCode(proposal.reference);
    return this.run(async () => {
      const {token, solution} = await this.proofOfWork();
      const {items, hasMore} = await this.request(this.api.previewPortalBookings(
        this.document, append ? this.previews().length : 0, token, solution,
      ));
      this.previews.update(current => append ? [...current, ...items] : items);
      this.hasMorePreviews.set(hasMore);
      this.step.set('preview');
      if (!append) this.focusStep();
    }, 'No pudimos buscar tus turnos. Volvé a intentarlo.');
  }

  selectPreview(booking: PortalPreview, action: BookingAction | null = null) {
    if (this.busy() || !this.canOpen(booking) || (action && !booking.canChange) || (action === 'reschedule' && !booking.canReschedule)) return;
    this.closeChange();
    if (booking.canAccess) {
      return this.run(() => this.openVerified(booking.reference, action), 'No pudimos abrir el turno.');
    }
    if (action) {
      this.previewChange.set({reference: booking.reference, action});
      afterNextRender(() => this.changeHeading()?.nativeElement.focus(), {injector:this.injector});
      return;
    }
    return this.requestCode(booking.reference, action);
  }

  continuePreviewChange() {
    const change = this.previewChange();
    if (change && this.validReason()) void this.requestCode(change.reference, change.action);
  }

  requestCode(reference = this.reference, action = this.pendingAction) {
    const booking = this.previews().find(item => item.reference === reference) ?? this.items().find(item => item.reference === reference);
    if (booking && !this.canOpen(booking)) return;
    if (this.step() === 'code' && !this.canResend()) return;
    return this.run(async () => {
      const {token, solution} = await this.proofOfWork();
      const {requestId, maskedEmail} = await this.request(this.api.requestPortalCode(
        {document: this.document, reference}, token, solution,
      ));
      this.reference = reference;
      this.pendingAction = action;
      this.requestId = requestId;
      this.maskedEmail = maskedEmail;
      this.code = '';
      this.step.set('code');
      this.startResendCooldown();
      this.focusStep();
    }, 'No pudimos pedir el código. Volvé a intentarlo.');
  }

  updateCode(input: HTMLInputElement) {
    this.code = input.value.replace(/[^0-9]/g, '').slice(0, 6);
    input.value = this.code;
  }

  private startResendCooldown() {
    this.canResend.set(false);
    clearTimeout(this.resendTimer);
    this.resendTimer = setTimeout(() => this.canResend.set(true), 45_000);
  }

  verifyCode() {
    return this.run(async () => {
      await this.request(this.api.verifyPortalCode(
        {document: this.document, reference: this.reference}, this.requestId, this.code,
      ));
      const reference = this.reference;
      const action = this.pendingAction;
      const reason = this.changeReason;
      this.clearCode();
      await this.openVerified(reference, action, reason);
    }, 'No pudimos verificar el código. Volvé a intentarlo.');
  }

  private async openVerified(reference: string, action: BookingAction | null, reason = '') {
    this.focusedReference = reference;
    this.step.set('list');
    await this.fetchBookings(false);
    this.previews.set([]);
    this.hasMorePreviews.set(false);
    if (this.proposalLink()) {
      await this.openProposal();
      return;
    }
    const selected = this.items().find(item => item.reference === reference);
    this.expanded.set(selected && this.canOpen(selected) ? reference : null);
    if (action && selected && this.canManage(selected)) {
      this.prepareChange(selected, action);
      this.changeReason = reason;
      if (action === 'reschedule') await this.fetchSlots(this.date, selected);
    } else {
      this.closeChange();
      this.focusStep();
    }
  }

  private async openProposal() {
    const link = this.proposalLink();
    if (!link) return;
    const booking = this.items().find(item => item.reference === link.reference);
    this.proposalLink.set(null);
    if (booking?.canChange && booking.rescheduleResponse === 'AWAITING_PATIENT' &&
        booking.rescheduleProposalVersion === link.version) {
      if (link.action === 'reschedule') {
        if (booking.publicDoctorId && booking.publicClinicId) {
          this.prepareChange(booking, 'reschedule');
          try {
            await this.fetchSlots(this.date, booking);
          } catch {
            if (this.alive) this.error.set('No pudimos consultar los horarios. Elegí una fecha para reintentar.');
          }
          return;
        }
        this.feedback.set('Para elegir otra fecha, comunicate con el consultorio. No tiene horarios publicados para reprogramar online.');
      }
    } else {
      this.feedback.set('La propuesta de ese correo ya no está pendiente. Revisá el estado actual del turno.');
    }
    this.focusStep();
  }

  leaveProposal() {
    if (this.busy()) return;
    this.proposalLink.set(null);
    this.resetView();
  }

  private clearCode() {
    this.code = '';
    this.requestId = '';
    this.reference = '';
    this.maskedEmail = '';
    this.pendingAction = null;
  }

  changeIdentity() {
    if (this.busy()) return;
    if (this.step() === 'code' && this.previews().length) {
      this.clearCode();
      this.error.set('');
      this.step.set('preview');
      this.focusStep();
    } else {
      this.resetView();
    }
  }

  private async fetchBookings(append: boolean) {
    const {items, hasMore, expiresAt} = await this.request(this.api.portalBookings(append ? this.items().length : 0, this.focusedReference));
    if (!this.alive) return;
    const timeLeft = Date.parse(expiresAt) - Date.now();
    if (Number.isFinite(timeLeft)) {
      clearTimeout(this.expiryTimer);
      this.expiryTimer = setTimeout(() => {
        this.resetView();
        this.error.set('Venció tu acceso. Ingresá tu DNI para volver a buscar tus turnos.');
      }, Math.max(timeLeft, 0));
    }
    this.items.update(current => append ? [...current, ...items] : items);
    this.hasMore.set(hasMore);
  }

  loadBookings(append = false) {
    return this.run(() => this.fetchBookings(append), 'No pudimos cargar tus turnos. Volvé a intentarlo.');
  }

  statusLabel(status: string) {
    return STATUS_LABELS[status as BookingStatus] ?? status;
  }

  chooseChange(booking: PortalBooking, action: BookingAction) {
    if (this.busy() || !this.canManage(booking) || (action === 'reschedule' && (!booking.publicDoctorId || !booking.publicClinicId))) return;
    this.prepareChange(booking, action);
    if (action === 'reschedule') void this.findSlots(this.date);
  }

  private prepareChange(booking: PortalBooking, action: BookingAction) {
    this.closeChange();
    this.change.set({booking, action});
    if (action === 'reschedule') this.date = civilDate(booking.start, booking.timezone);
    afterNextRender(() => this.changeHeading()?.nativeElement.focus(), {injector:this.injector});
  }

  closeChange() {
    this.previewChange.set(null);
    this.change.set(null);
    this.slotDays.set([]);
    this.start = '';
    this.changeReason = '';
    this.mutation = null;
  }

  validReason() {
    const reason = this.changeReason.trim();
    return reason.length > 0 && reason.length <= this.reasonLimit;
  }

  findSlots(date: string) {
    const selected = this.change();
    if (!date || this.busy() || !selected || !this.canManage(selected.booking)) return;
    return this.run(() => this.fetchSlots(date, selected.booking), 'No pudimos consultar los horarios del consultorio.');
  }

  private async fetchSlots(date: string, booking: PortalBooking) {
    if (!booking.publicDoctorId || !booking.publicClinicId) return;
    const selected = this.change();
    this.date = date;
    this.slotDays.set([]);
    this.start = '';
    this.loadingSlots.set(true);
    try {
      const availability = await this.request(this.api.availability(
        booking.publicDoctorId, booking.publicClinicId, date, booking.specialtyContextId,
      ));
      if (this.change() === selected) this.slotDays.set(availability.days.filter(day => day.slots.length));
    } finally {
      this.loadingSlots.set(false);
    }
  }

  confirmChange() {
    const selected = this.change();
    if (!selected || !this.canManage(selected.booking) || !this.validReason() || (selected.action === 'reschedule' && !this.start)) return;
    return this.run(async () => {
      const start = selected.action === 'reschedule' ? this.start : '';
      const reason = this.changeReason.trim();
      await this.updateBooking(selected.booking, selected.action, start, reason);
      if (!this.alive) return;
      this.closeChange();
      this.feedback.set(selected.action === 'cancel' ? 'El turno se canceló.' : 'El turno se reprogramó.');
      await this.fetchBookings(false);
      this.focusStep();
    }, 'No pudimos confirmar el cambio. Volvé a intentarlo.');
  }

  acceptProposal(booking: PortalBooking) {
    if (!booking.canChange || booking.rescheduleResponse !== 'AWAITING_PATIENT') return;
    return this.run(async () => {
      await this.updateBooking(booking, 'confirm', '', '');
      if (!this.alive) return;
      this.closeChange();
      this.feedback.set('Confirmaste el nuevo horario. El consultorio ya puede verlo en la agenda.');
      await this.fetchBookings(false);
      this.focusStep();
    }, 'No pudimos confirmar el turno. Volvé a intentarlo.');
  }

  private async updateBooking(booking: PortalBooking, action: BookingAction | 'confirm', start: string, reason: string) {
    const signature = JSON.stringify([booking.reference, booking.version, action, start, reason]);
    if (this.mutation?.signature !== signature) this.mutation = {signature, key:crypto.randomUUID()};
    try {
      await this.request(this.api.changePortalBooking(booking, action, start, this.mutation.key, reason));
    } catch (error) {
      if ((error as {status?: number}).status === 409) {
        this.closeChange();
        await this.fetchBookings(false);
      }
      throw error;
    }
  }

  weekdayLabel(date: string) {
    return slotWeekday.format(new Date(date + 'T12:00:00Z'));
  }

  private valueDate(booking: PortalBooking | PortalPreview) {
    return 'start' in booking ? booking.start : booking.date;
  }

  private sortTime(booking: PortalBooking | PortalPreview) {
    return portalInstant(this.valueDate(booking)) || 0;
  }

  isPast(booking: PortalBooking | PortalPreview) {
    this.now();
    return portalDatePassed(this.valueDate(booking), Date.now());
  }

  category(booking: PortalBooking | PortalPreview) {
    if ('status' in booking && booking.status === 'CANCELLED') return 'cancelled';
    return this.isPast(booking) ? 'past' : 'upcoming';
  }

  canOpen(booking: PortalBooking | PortalPreview) {
    return this.category(booking) === 'upcoming' && Number.isFinite(portalInstant(this.valueDate(booking)));
  }

  canManage(booking: PortalBooking) {
    return this.canOpen(booking) && booking.canChange && booking.status === 'CONFIRMED';
  }

  verified(booking: PortalBooking | PortalPreview): PortalBooking | null {
    return 'start' in booking ? booking : null;
  }

  preview(booking: PortalBooking | PortalPreview): PortalPreview | null {
    return 'date' in booking ? booking : null;
  }

  toggleDetails(booking: PortalBooking) {
    if (this.busy() || !this.canOpen(booking)) return;
    this.expanded.update(current => current === booking.reference ? null : booking.reference);
  }

  dateLabel(booking: PortalBooking | PortalPreview) {
    const value = this.valueDate(booking);
    if (!Number.isFinite(portalInstant(value))) return 'Fecha no disponible';
    const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : civilDate(new Date(portalInstant(value)).toISOString(), PORTAL_TIMEZONE);
    return this.weekdayLabel(date) + ' ' + displayDay(date);
  }

  timeLabel(booking: PortalBooking) {
    return Number.isFinite(portalInstant(booking.start)) && booking.start.includes('T')
      ? localTime(new Date(portalInstant(booking.start)).toISOString(), PORTAL_TIMEZONE) : '';
  }

  duration(booking: PortalBooking) {
    const minutes = (Date.parse(booking.end) - Date.parse(booking.start)) / 60000;
    return Number.isFinite(minutes) && minutes > 0 ? Math.round(minutes) : null;
  }

  slotLabel(start: string, timezone: string) {
    return displayDay(civilDate(start, timezone)) + ' · ' + localTime(start, timezone);
  }
}
