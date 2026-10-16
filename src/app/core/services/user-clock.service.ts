import { computed, DestroyRef, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { instantParts, userTimeZone } from '../date/user-time-zone';

/** One clock for local-day rollover; it never supplies authoritative record dates. */
@Injectable({ providedIn: 'root' })
export class UserClockService {
  readonly now = signal(Date.now());
  readonly timeZone = computed(() => { this.now(); return userTimeZone(); });
  readonly day = computed(() => instantParts(new Date(this.now()), this.timeZone()).day);
  constructor() {
    const destroy = inject(DestroyRef);
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      const timer = setInterval(() => this.now.set(Date.now()), 60_000);
      destroy.onDestroy(() => clearInterval(timer));
    }
  }
}
