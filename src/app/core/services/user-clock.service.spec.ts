import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { UserClockService } from './user-clock.service';

describe('Device calendar rollover', () => {
  afterEach(() => { TestBed.resetTestingModule(); vi.useRealTimers(); vi.restoreAllMocks(); });
  it('rolls over the local day and releases its timer on destruction', () => {
    vi.useFakeTimers({ toFake: ['Date', 'setInterval', 'clearInterval'] });
    const options = Intl.DateTimeFormat().resolvedOptions();
    vi.spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions').mockReturnValue({...options,timeZone:'Europe/Madrid'});
    vi.setSystemTime(new Date('2026-10-14T21:59:00Z'));
    TestBed.configureTestingModule({providers:[{provide:PLATFORM_ID,useValue:'browser'}]});
    const clock=TestBed.inject(UserClockService);
    expect(clock.timeZone()).toBe('Europe/Madrid');
    expect(clock.day()).toBe('2026-10-14');
    vi.advanceTimersByTime(60_000);
    expect(clock.now()).toBe(new Date('2026-10-14T22:00:00Z').getTime());
    expect(clock.day()).toBe('2026-10-15');
    TestBed.resetTestingModule();
    expect(vi.getTimerCount()).toBe(0);
  });
  it('does not start a timer while prerendering', () => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({providers:[{provide:PLATFORM_ID,useValue:'server'}]});
    TestBed.inject(UserClockService);
    expect(vi.getTimerCount()).toBe(0);
  });
});
