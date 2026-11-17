import { makeTimeline, monday } from './staff-timeline';
import type { AdministrativeBooking, SlotDay } from './staff.service';

const date = '2026-11-18';
const zone = 'America/Argentina/Buenos_Aires';
const period = (start: string, end: string) => ({
  start: date + 'T' + start + ':00-03:00',
  end: date + 'T' + end + ':00-03:00',
});
const booking: AdministrativeBooking = {
  ...period('07:20', '07:40'),
  id: '1',
  clinicId: '1',
  status: 'CANCELLED',
  version: '1',
  contactName: 'Ejemplo',
  contactPhone: '',
  createdAt: '',
  updatedAt: '',
};

describe('staff agenda timeline', () => {
  it('keeps configured split shifts visible and includes events outside opening hours', () => {
    const availability: SlotDay[] = [
      {
        date,
        slots: [],
        hours: [
          { start: '09:00', end: '12:00' },
          { start: '16:30', end: '18:00' },
        ],
      },
    ];
    const timeline = makeTimeline(monday(date), 7, availability, [booking], zone, false);
    expect(timeline.days).toHaveLength(7);
    expect(timeline.from).toBe(6 * 60 + 30);
    expect(timeline.to).toBe(18 * 60 + 30);
    expect(timeline.days[2].hours).toEqual([
      { from: 540, to: 720 },
      { from: 990, to: 1080 },
    ]);
    expect(timeline.days[2].entries[0].time).toBe('07:20');
  });

  it('keeps both a canceled booking and its newly available slot accessible', () => {
    const timeline = makeTimeline(
      date,
      1,
      [{ date, slots: [period('07:20', '07:40'), period('07:40', '08:00')] }],
      [booking],
      zone,
      false,
    );
    const [cancelled, available, following] = timeline.days[0].entries;
    expect(cancelled.lane).not.toBe(available.lane);
    expect(cancelled.laneCount).toBe(2);
    expect(cancelled.sharedCancellation).toBe(true);
    expect(available.sharedCancellation).toBe(true);
    expect(following.laneCount).toBe(1);
    expect(available.height).toBe(20);
  });

  it('keeps closure distinct from an empty day and expands through midnight', () => {
    const timeline = makeTimeline(date, 2, [{ date, slots: [], closed: true }], [], zone, true);
    expect(timeline.days.map((day) => day.closed)).toEqual([true, false]);
    expect(timeline.ticks[0]).toBe(0);
    expect(timeline.to).toBe(1440);
  });
});
