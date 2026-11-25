import { addDays, civilDate, localTime } from './bookings.models';
import type { Booking } from './bookings.models';

export type AgendaBooking = Pick<Booking, 'id' | 'start' | 'end' | 'status' | 'rescheduleResponse' | 'contactName' | 'attendeeName' | 'specialty'>;
export interface AgendaSlot { start: string; end: string; }
export interface AgendaDay<S extends AgendaSlot> {
  date: string;
  slots: S[];
  hours?: { start: string; end: string }[];
  closed?: boolean;
}

const DAY_MINUTES = 1440;
export const PIXELS_PER_MINUTE = 1.7;
const MIN_TARGET_MINUTES = Math.ceil(24 / PIXELS_PER_MINUTE);

interface Span {
  from: number;
  to: number;
}

interface TimelineEntry<B extends AgendaBooking, S extends AgendaSlot> extends Span {
  time: string;
  booking?: B;
  slot?: S;
  lane: number;
  laneCount: number;
  height: number;
  sharedCancellation?: boolean;
}

export function minute(time: string): number {
  const [hour, minutes] = time.split(':').map(Number);
  return hour * 60 + minutes;
}

export function hourLabel(minutes: number): string {
  return String(Math.floor(minutes / 60)).padStart(2, '0') + ':00';
}

export function monday(date: string): string {
  const weekday = new Date(date + 'T12:00:00Z').getUTCDay();
  return addDays(date, -((weekday + 6) % 7));
}

function entryFor<B extends AgendaBooking, S extends AgendaSlot>(
  event: { start: string; end: string },
  zone: string,
  data: Pick<TimelineEntry<B, S>, 'booking' | 'slot'>,
): TimelineEntry<B, S> {
  const time = localTime(event.start, zone);
  const from = minute(time);
  const duration = (Date.parse(event.end) - Date.parse(event.start)) / 60_000;
  const to = Math.min(DAY_MINUTES, from + Math.max(1, duration));
  return { ...data, time, from, to, lane: 0, laneCount: 1, height: to - from };
}

function placeEntries<B extends AgendaBooking, S extends AgendaSlot>(entries: TimelineEntry<B, S>[], end: number): void {
  let activeUntil: number[] = [];
  let group: TimelineEntry<B, S>[] = [];
  let groupEnd = 0;
  for (const entry of entries) {
    if (entry.from >= groupEnd && group.length) {
      finishGroup(group, activeUntil.length);
      group = [];
      activeUntil = [];
    }
    const nextLane = activeUntil.findIndex((until) => until <= entry.from);
    entry.lane = nextLane < 0 ? activeUntil.length : nextLane;
    entry.height = Math.min(end - entry.from, Math.max(MIN_TARGET_MINUTES, entry.height));
    activeUntil[entry.lane] = entry.from + entry.height;
    groupEnd = Math.max(groupEnd, activeUntil[entry.lane]);
    group.push(entry);
  }
  finishGroup(group, activeUntil.length);
}

function finishGroup<B extends AgendaBooking, S extends AgendaSlot>(group: TimelineEntry<B, S>[], lanes: number): void {
  const bookings = group.filter((entry) => entry.booking);
  const slots = group.filter((entry) => entry.slot);
  // A reopened slot can share the column with its cancelled booking. Keep the name
  // readable and reserve a narrow action as long as the slots can stack vertically.
  const sharedCancellation =
    lanes === 2 &&
    bookings.length === 1 &&
    bookings[0].booking?.status === 'CANCELLED' &&
    slots.every(
      (slot, index) => !index || slots[index - 1].from + slots[index - 1].height <= slot.from,
    );
  for (const entry of group) {
    entry.laneCount = lanes;
    entry.sharedCancellation = sharedCancellation;
  }
}

export function makeTimeline<B extends AgendaBooking, S extends AgendaSlot>(
  startDate: string,
  length: number,
  availability: AgendaDay<S>[],
  bookings: B[],
  zone: string,
  fullDay: boolean,
  current?: { date: string; hour: number },
) {
  const slotsByDate = new Map(availability.map((day) => [day.date, day]));
  const days = Array.from({ length }, (_, index) => {
    const date = addDays(startDate, index);
    const available = slotsByDate.get(date);
    const hours = (available?.hours ?? []).map(({ start, end }) => ({
      from: minute(start),
      to: minute(end),
    }));
    const entries = (available?.slots ?? []).map((slot) => entryFor<B, S>(slot, zone, { slot }));
    return { date, hours, entries, closed: available?.closed ?? false };
  });
  const byDate = new Map(days.map((day) => [day.date, day]));
  for (const booking of bookings) {
    const day = byDate.get(civilDate(booking.start, zone));
    day?.entries.push(entryFor(booking, zone, { booking }));
  }
  const spans = days.flatMap((day) => [...day.hours, ...day.entries]);
  const starts = spans.map(span => Math.floor((span.from - 30) / 30) * 30);
  const ends = spans.map(span => Math.ceil((span.to + 30) / 30) * 30);
  if (current && byDate.has(current.date)) {
    starts.push(current.hour - 60);
    // Leave enough space after the next hour to show its tick.
    ends.push(current.hour + 90);
  }
  const from = fullDay ? 0 : Math.max(0, starts.length ? Math.min(...starts) : 9 * 60);
  const to = fullDay ? DAY_MINUTES : Math.min(DAY_MINUTES, ends.length ? Math.max(...ends) : 12 * 60);
  for (const day of days) {
    day.entries.sort((a, b) => a.from - b.from || Number(!!b.booking) - Number(!!a.booking));
    placeEntries(day.entries, to);
  }
  const ticks: number[] = [];
  for (let tick = Math.ceil(from / 60) * 60; tick < to; tick += 60) ticks.push(tick);
  return { days, ticks, from, to };
}
