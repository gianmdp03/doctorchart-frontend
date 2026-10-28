import { TestBed } from '@angular/core/testing';
import { NavigationCancel, NavigationCancellationCode, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { InteractionStatusComponent } from './interaction-status.component';

describe('Navigation feedback', () => {
  afterEach(() => { TestBed.resetTestingModule(); vi.useRealTimers(); });
  function setup() {
    const events = new Subject<unknown>();
    const abort = vi.fn();
    TestBed.configureTestingModule({ providers: [{ provide: Router, useValue: { events, currentNavigation: () => ({ id: 1, abort }) } }] });
    const fixture = TestBed.createComponent(InteractionStatusComponent);
    return { fixture, component: fixture.componentInstance, events, abort };
  }
  it('aborts stalled navigation and replaces the spinner with a terminal error', () => {
    vi.useFakeTimers();
    const { component, abort } = setup();
    expect(component.navigating()).toBe(true);
    vi.advanceTimersByTime(15001);
    expect(abort).toHaveBeenCalledOnce();
    expect(component.navigating()).toBe(false);
    expect(component.navigationError()).toContain('a tiempo');
  });
  it('preserves the newest navigation when an older navigation is cancelled', () => {
    const { component, events } = setup();
    events.next(new NavigationStart(2, '/patients'));
    events.next(new NavigationCancel(1, '/', 'Superseded', NavigationCancellationCode.SupersededByNewNavigation));
    expect(component.navigating()).toBe(true);
    events.next(new NavigationEnd(2, '/patients', '/patients'));
    expect(component.navigating()).toBe(false);
  });
  it('explains a rejected guard rather than silently swallowing the click', () => {
    const { component, events } = setup();
    events.next(new NavigationCancel(1, '/', 'Guard', NavigationCancellationCode.GuardRejected));
    expect(component.navigating()).toBe(false);
    expect(component.navigationError()).toContain('Revisá los avisos');
  });
});
