import { portalDatePassed, portalInstant } from './portal-booking-time';

describe('Patient portal Argentine date boundaries', () => {
  it('keeps a date-only reservation accessible until the Argentine day ends', () => {
    expect(portalDatePassed('2026-11-25', Date.parse('2026-11-26T02:59:59Z'))).toBe(false);
    expect(portalDatePassed('2026-11-25', Date.parse('2026-11-26T03:00:00Z'))).toBe(true);
  });

  it('expires at the start time regardless of the device timezone', () => {
    const now = Date.parse('2026-11-25T13:00:00Z');
    expect(portalDatePassed('2026-11-25T10:00:00-03:00', now - 1)).toBe(false);
    expect(portalDatePassed('2026-11-25T10:00:00-03:00', now)).toBe(true);
    expect(portalDatePassed('2026-11-25T10:00:00', now)).toBe(true);
    expect(portalInstant('2026-11-25T15:00:00+02:00')).toBe(now);
  });

  it('does not throw for missing or malformed dates', () => {
    expect(Number.isNaN(portalInstant(''))).toBe(true);
    expect(Number.isNaN(portalInstant('invalid'))).toBe(true);
    expect(Number.isNaN(portalInstant('2026-02-30'))).toBe(true);
    expect(Number.isNaN(portalInstant('2026-13-01'))).toBe(true);
    expect(portalDatePassed('invalid')).toBe(false);
  });
});
