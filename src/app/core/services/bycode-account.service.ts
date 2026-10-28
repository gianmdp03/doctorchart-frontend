import {
  Injectable,
  computed,
  effect,
  inject,
  signal,
  PLATFORM_ID,
  DestroyRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
export const bycodeAccountApi = new URL('/api/billing/account', environment.apiUrl).href;
@Injectable({ providedIn: 'root' })
export class BycodeAccountService {
  private readonly auth = inject(AuthService);
  private readonly http = inject(HttpClient);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly destroy = inject(DestroyRef);
  private owner: string | null = null;
  private generation = 0;
  private loaded = 0;
  private busy = false;
  readonly image = signal('');
  readonly fullName = signal('');
  readonly name = computed(() => this.fullName() || this.auth.userName());
  readonly initials = computed(() =>
    this.name()
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((v: string) => v[0])
      .join('')
      .toUpperCase(),
  );
  readonly editUrl = new URL('/account?from=doctorchart', environment.bycodePlansUrl).href;
  constructor() {
    effect(() => {
      const user = this.auth.currentUser()?.id ?? null;
      if (user !== this.owner) {
        this.owner = user;
        this.generation++;
        this.busy = false;
        this.loaded = 0;
        this.fullName.set('');
        this.clear();
        if (user && this.browser) void this.refresh();
      }
    });
    if (this.browser) {
      const focus = () => {
        if (this.owner && Date.now() - this.loaded > 15_000) void this.refresh();
      };
      const visible = () => {
        if (document.visibilityState === 'visible') focus();
      };
      window.addEventListener('focus', focus);
      document.addEventListener('visibilitychange', visible);
      this.destroy.onDestroy(() => {
        this.generation++;
        this.clear();
        window.removeEventListener('focus', focus);
        document.removeEventListener('visibilitychange', visible);
      });
    }
  }
  private clear() {
    const old = this.image();
    this.image.set('');
    if (old) URL.revokeObjectURL(old);
  }
  async refresh() {
    if (!this.owner || this.busy) return;
    this.busy = true;
    const generation = this.generation;
    const owner = this.owner;
    const current = () =>
      generation === this.generation && owner === (this.auth.currentUser()?.id ?? null);
    try {
      const p = await firstValueFrom(
        this.http.get<{ fullName: string; hasAvatar: boolean }>(bycodeAccountApi + '/profile', {
          transferCache: false,
        }),
      );
      if (!current()) return;
      this.fullName.set(p.fullName);
      if (p.hasAvatar) {
        const data = await firstValueFrom(
          this.http.get(bycodeAccountApi + '/avatar', {
            responseType: 'blob',
            transferCache: false,
          }),
        );
        if (!current()) return;
        this.clear();
        this.image.set(URL.createObjectURL(data));
      } else this.clear();
    } catch {
      if (current()) this.clear();
    } finally {
      if (current()) {
        this.loaded = Date.now();
        this.busy = false;
      }
    }
  }
}
