import { describe, expect, it } from 'vitest';
import { formatInstant, instantParts, shiftCalendarDate } from './user-time-zone';
import { displayLocalDate } from './display-date';

describe('User time zones and calendar dates', () => {
  it('presents the same UTC instant on different local calendar days', () => {
    const instant = '2026-10-15T01:30:00Z';
    expect(formatInstant(instant, true, 'America/Argentina/Buenos_Aires')).toBe('14/10/2026 22:30');
    expect(formatInstant(instant, true, 'Europe/Madrid')).toBe('15/10/2026 03:30');
    expect(formatInstant(instant, true, 'America/Los_Angeles')).toBe('14/10/2026 18:30');
  });
  it('uses IANA daylight-saving rules rather than a fixed offset', () => {
    expect(instantParts('2026-03-29T00:30:00Z', 'Europe/Madrid').time).toBe('01:30');
    expect(instantParts('2026-03-29T01:30:00Z', 'Europe/Madrid').time).toBe('03:30');
    expect(instantParts('2026-10-25T00:30:00Z', 'Europe/Madrid').time).toBe('02:30');
    expect(instantParts('2026-10-25T01:30:00Z', 'Europe/Madrid').time).toBe('02:30');
  });
  it('keeps birthday/vaccination dates independent of offsets and DST', () => {
    expect(displayLocalDate('2026-03-29')).toBe('29/03/2026');
    expect(shiftCalendarDate('2026-03-30', -1)).toBe('2026-03-29');
    expect(shiftCalendarDate('2026-01-01', -1)).toBe('2025-12-31');
  });
  it('handles invalid instants without leaking an Invalid Date into the UI', () => {
    expect(formatInstant('bad')).toBe('—');
  });
});
