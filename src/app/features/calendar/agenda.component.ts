import {
  afterRenderEffect, Component, computed, ElementRef, input, output, signal, viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCalendarDays, lucideCheck, lucideChevronLeft, lucideChevronRight,
  lucideCircleCheck, lucideCircleMinus, lucideClock3, lucideLogIn,
  lucideMaximize2, lucideMinimize2, lucidePlus, lucideX,
} from '@ng-icons/lucide';
import { DatePickerComponent } from '../../shared/date-picker/date-picker.component';
import { addDays, civilDate, displayDay, localTime, STATUS_LABELS } from './bookings.models';
import {
  AgendaBooking, AgendaDay, AgendaSlot, hourLabel, makeTimeline, minute, monday, PIXELS_PER_MINUTE,
} from './agenda-timeline';

export type AgendaView = '1' | '7';
export const AGENDA_STATUS_ICONS = {
  CONFIRMED: 'lucideCheck',
  CHECKED_IN: 'lucideLogIn',
  COMPLETED: 'lucideCircleCheck',
  NO_SHOW: 'lucideCircleMinus',
  CANCELLED: 'lucideX',
} as const;

@Component({
  selector: 'app-agenda',
  imports: [DatePickerComponent, FormsModule, NgIcon],
  providers: [provideIcons({
    lucideCalendarDays, lucideCheck, lucideChevronLeft, lucideChevronRight,
    lucideCircleCheck, lucideCircleMinus, lucideClock3, lucideLogIn,
    lucideMaximize2, lucideMinimize2, lucidePlus, lucideX,
  })],
  templateUrl: './agenda.component.html',
  styleUrls: ['../staff/staff.css', './agenda-page.css', './agenda.component.css'],
})
export class AgendaComponent<B extends AgendaBooking, S extends AgendaSlot> {
  readonly dateInputId = input.required<string>();
  readonly date = input.required<string>();
  readonly view = input.required<AgendaView>();
  readonly zone = input.required<string>();
  readonly now = input.required<number>();
  readonly availability = input.required<AgendaDay<S>[]>();
  readonly bookings = input.required<B[]>();
  readonly calendarKey = input('');
  readonly loading = input(false);
  readonly pendingRange = input(false);
  readonly writing = input(false);
  readonly editor = input<'create' | 'detail' | 'move' | null>(null);
  readonly selected = input<B | null>(null);
  readonly slotKey = input<(slot: S) => string>(slot => slot.start);
  readonly allowSlot = input.required<(slot: S) => boolean>();
  readonly slotSelected = input<(slot: S) => boolean | null>(() => null);
  readonly slotContext = input<(slot: S) => string>(() => '');
  readonly bookingContext = input<(booking: B) => string>(() => '');
  readonly dateChange = output<string>();
  readonly viewChange = output<AgendaView>();
  readonly dayRequested = output<string>();
  readonly bookingSelected = output<{ booking: B; trigger: EventTarget | null }>();
  readonly slotChosen = output<{ slot: S; trigger: EventTarget | null }>();

  readonly fullDay = signal(false);
  readonly rangeStart = computed(() => this.view() === '7' ? monday(this.date()) : this.date());
  readonly rangeEnd = computed(() => addDays(this.rangeStart(), Number(this.view()) - 1));
  readonly today = computed(() => civilDate(new Date(this.now()).toISOString(), this.zone()));
  readonly clock = computed(() => localTime(new Date(this.now()).toISOString(), this.zone()));
  readonly timeline = computed(() => makeTimeline(
    this.rangeStart(), Number(this.view()), this.availability(), this.bookings(), this.zone(), this.fullDay(),
  ));
  readonly summary = computed(() => {
    const date = this.date();
    const bookings = this.timeline().days.find(day => day.date === date)
      ?.entries.flatMap(({ booking }) => booking ? [booking] : []) ?? [];
    return {
      date,
      total: bookings.length,
      confirmed: bookings.filter(booking => booking.status === 'CONFIRMED').length,
      checkedIn: bookings.filter(booking => booking.status === 'CHECKED_IN').length,
      cancelled: bookings.filter(booking => booking.status === 'CANCELLED').length,
      next: bookings.find(booking => booking.status === 'CONFIRMED' && Date.parse(booking.start) >= this.now()),
    };
  });
  readonly labels = STATUS_LABELS;
  readonly statusIcons = AGENDA_STATUS_ICONS;
  readonly displayDay = displayDay;
  readonly hourLabel = hourLabel;
  readonly minute = minute;
  readonly pixels = (minutes: number) => minutes * PIXELS_PER_MINUTE;
  private readonly weekdays = new Intl.DateTimeFormat('es-AR', { weekday: 'long', timeZone: 'UTC' });
  private readonly board = viewChild<ElementRef<HTMLElement>>('board');
  private lastScroll = '';
  private lastBoard?: HTMLElement;

  constructor() {
    afterRenderEffect(() => {
      const board = this.board()?.nativeElement;
      if (!board || this.loading()) return;
      const timeline = this.timeline();
      const scrollKey = [this.calendarKey(), this.date(), this.view(), this.fullDay()].join('|');
      if (board === this.lastBoard && scrollKey === this.lastScroll) return;
      this.lastBoard = board;
      this.lastScroll = scrollKey;
      const current = minute(this.clock());
      const today = timeline.days.some(day => day.date === this.today());
      const offset = this.pixels(current - timeline.from);
      board.scrollTop = today && current < timeline.to && offset > board.clientHeight - 110
        ? Math.max(0, offset - board.clientHeight * 0.35)
        : 0;
      const day = board.querySelector<HTMLElement>('[data-date="' + this.date() + '"]');
      if (day) board.scrollLeft = day.offsetLeft - (board.clientWidth - day.clientWidth) / 2;
    });
  }

  focusBoard(): void { this.board()?.nativeElement.focus(); }

  shiftDate(direction: number) {
    this.dateChange.emit(addDays(this.rangeStart(), direction * Number(this.view())));
  }
  weekday(date: string) {
    return this.weekdays.format(new Date(date + 'T12:00:00Z'));
  }
  bookingTime(booking: B) {
    return localTime(booking.start, this.zone());
  }
  bookingHint(booking: B, separator: string) {
    return [booking.specialty?.name, this.bookingContext()(booking)]
      .filter(Boolean).map(label => separator + label).join('');
  }
  slotHint(slot: S, separator: string) {
    const label = this.slotContext()(slot);
    return label ? separator + label : '';
  }
}
