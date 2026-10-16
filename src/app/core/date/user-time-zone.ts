/** Instants use UTC on the wire; calendar dates never pass through this formatter. */
export function userTimeZone(): string {
  try { return new Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; } catch { return 'UTC'; }
}
export function instantParts(instant: string | Date, timeZone = userTimeZone()): { day: string; time: string } {
  const date = instant instanceof Date ? instant : new Date(instant);
  if (!Number.isFinite(date.getTime())) return { day: '', time: '' };
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(date);
  const part = (key: string) => parts.find(p => p.type === key)?.value ?? '';
  return { day: `${part('year')}-${part('month')}-${part('day')}`, time: `${part('hour')}:${part('minute')}` };
}
export function formatInstant(instant: string | Date, withTime = true, timeZone = userTimeZone()): string {
  const { day, time } = instantParts(instant, timeZone);
  if (!day) return '—';
  const [year, month, date] = day.split('-');
  return `${date}/${month}/${year}${withTime ? ' ' + time : ''}`;
}
export function todayDate(timeZone = userTimeZone()): string { return instantParts(new Date(), timeZone).day; }
/** Calendar arithmetic on a date, independent of the browser's UTC offset/DST. */
export function shiftCalendarDate(day: string, days: number): string {
  const date = new Date(day + 'T12:00:00Z');
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
