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
import { addDays, civilDate, displayDay, localTime } from './bookings.models';
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
  styleUrls: ['../staff/staff.css', './agenda-page.css', './agenda-colors.css', './agenda.component.css'],
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
  readonly bookingLabel = input.required<(booking: B) => string>();
  readonly dateChange = output<string>();
  readonly viewChange = output<AgendaView>();
  readonly dayRequested = output<string>();
  readonly bookingSelected = output<{ booking: B; trigger: EventTarget | null }>();
  readonly slotChosen = output<{ slot: S; trigger: EventTarget | null }>();

  readonly fullDay = signal(false);
  readonly today = computed(() => civilDate(new Date(this.now()).toISOString(), this.zone()));
  private readonly weekStart = computed(() => monday(this.date()));
  readonly rangeStart = computed(() => {
    const date = this.date();
    if (this.view() === '1') return date;
    const weekStart = this.weekStart();
    const today = this.today();
    return date >= today && weekStart < today ? today : weekStart;
  });
  readonly rangeEnd = computed(() => this.view() === '7' ? addDays(this.weekStart(), 6) : this.date());
  private readonly monthYear = new Intl.DateTimeFormat('es-AR', {
    month: 'long', year: 'numeric', timeZone: 'UTC',
  });
  readonly periodTitle = computed(() => this.monthYear.formatRange(
    new Date(this.rangeStart() + 'T12:00:00Z'), new Date(this.rangeEnd() + 'T12:00:00Z'),
  ));
  readonly dayCount = computed(() =>
    (Date.parse(this.rangeEnd()) - Date.parse(this.rangeStart())) / 86_400_000 + 1,
  );
  readonly clock = computed(() => localTime(new Date(this.now()).toISOString(), this.zone()));
  readonly currentMinute = computed(() => minute(this.clock()));
  private readonly currentHour = computed(() => Math.floor(this.currentMinute() / 60) * 60);
  readonly timeline = computed(() => makeTimeline(
    this.rangeStart(), this.dayCount(), this.availability(), this.bookings(), this.zone(), this.fullDay(),
    { date: this.today(), hour: this.currentHour() },
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
  readonly statusIcons = AGENDA_STATUS_ICONS;
  readonly displayDay = displayDay;
  readonly hourLabel = hourLabel;
  readonly pixels = (minutes: number) => minutes * PIXELS_PER_MINUTE;
  private readonly weekdays = new Intl.DateTimeFormat('es-AR', { weekday: 'long', timeZone: 'UTC' });
  private readonly board = viewChild<ElementRef<HTMLElement>>('board');
  private lastScroll = '';
  private lastBoard?: HTMLElement;
  private lastTimelineFrom?: number;

  constructor() {
    afterRenderEffect(() => {
      const board = this.board()?.nativeElement;
      if (!board || this.loading()) return;
      const timeline = this.timeline();
      const previousFrom = this.lastTimelineFrom;
      const scrollKey = [this.calendarKey(), this.date(), this.rangeStart(), this.view(), this.fullDay()].join('|');
      const reset = board !== this.lastBoard || scrollKey !== this.lastScroll;
      this.lastBoard = board;
      this.lastScroll = scrollKey;
      this.lastTimelineFrom = timeline.from;

      if (reset) {
        const selectedDay = timeline.days.find(day => day.date === this.date());
        // Prefer real available slots and reservations. Opening hours are only
        // a fallback when the selected day has no entries to focus on.
        const startsFor = (days: typeof timeline.days) => {
          const entries = days.flatMap(day => day.entries.map(entry => entry.from));
          return entries.length ? entries : days.flatMap(day => day.hours.map(hour => hour.from));
        };
        const selectedStarts = startsFor(selectedDay ? [selectedDay] : []);
        const starts = selectedStarts.length ? selectedStarts : startsFor(timeline.days);
        const first = starts.length ? Math.min(...starts) : timeline.from;
        board.scrollTop = Math.max(0, this.pixels(first - timeline.from - 30));
      } else if (previousFrom !== undefined && previousFrom !== timeline.from) {
        // If a refresh extends the grid, keep the time the user was viewing.
        board.scrollTop = Math.max(0, board.scrollTop + this.pixels(previousFrom - timeline.from));
      }

      if (reset) {
        const day = board.querySelector<HTMLElement>('[data-date="' + this.date() + '"]');
        if (day) board.scrollLeft = day.offsetLeft - (board.clientWidth - day.clientWidth) / 2;
      }
    });
  }

  focusBoard(): void { this.board()?.nativeElement.focus(); }

  shiftDate(direction: number) {
    if (this.view() === '1') {
      this.dateChange.emit(addDays(this.date(), direction));
      return;
    }

    const targetWeek = addDays(this.weekStart(), direction * 7);
    const today = this.today();
    this.dateChange.emit(targetWeek === monday(today) ? today : targetWeek);
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
