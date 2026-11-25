/** Patient portal dates are evaluated in Buenos Aires, independently of the device zone. */
export const PORTAL_TIMEZONE = 'America/Argentina/Buenos_Aires';

export function portalInstant(value: string): number {
  if (!value) return NaN;
  const parts = /^(\d{4})-(\d{2})-(\d{2})(?:T|$)/.exec(value);
  if (!parts) return NaN;
  const [, year, month, day] = parts.map(Number);
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  if (month < 1 || month > 12 || day < 1 || day > daysInMonth) return NaN;
  // A date without a time remains available for that entire Argentine day.
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);
  const normalized = dateOnly ? `${value}T00:00:00-03:00`
    : /(?:Z|[+-]\d{2}:?\d{2})$/i.test(value) ? value : `${value}-03:00`;
  const instant = Date.parse(normalized);
  return dateOnly ? instant + 86_400_000 : instant;
}

export function portalDatePassed(value: string, now = Date.now()): boolean {
  const instant = portalInstant(value);
  return Number.isFinite(instant) && instant <= now;
}
