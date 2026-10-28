import { ChangeDetectionStrategy, Component, DestroyRef, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationCancel, NavigationCancellationCode, NavigationEnd, NavigationError, NavigationSkipped, NavigationStart, Router } from '@angular/router';
import { InteractionStatusService } from '../core/services/interaction-status.service';

@Component({
  selector: 'app-interaction-status', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (navigating() || status.busy()) {
      <div class="interaction-status" role="status"><span class="spinner" aria-hidden="true"></span>{{ navigating() ? 'Abriendo página…' : 'Procesando…' }}</div>
    }
    @if (navigationError() || status.error()) {
      <div class="interaction-status error" role="alert"><span>{{ navigationError() || status.error() }}</span>
        <button type="button" (click)="dismiss()">Entendido</button>
      </div>
    }
  `,
  styles: `
    :host { position:fixed;z-index:2000;top:12px;left:50%;transform:translateX(-50%);width:max-content;max-width:calc(100vw - 24px);pointer-events:none; }
    .interaction-status { display:flex;align-items:center;gap:10px;padding:12px 16px;border:1px solid var(--border);border-radius:12px;background:var(--background);color:var(--foreground);box-shadow:0 4px 16px #0002;font-size:14px; }
    .spinner { width:16px;height:16px;flex-shrink:0;border:2px solid var(--border);border-top-color:var(--md-primary);border-radius:50%;animation:interaction-spin .8s linear infinite; }
    .error { flex-wrap:wrap; }
    button { pointer-events:auto;min-height:44px;padding:8px 12px;border-radius:8px;background:var(--md-primary);color:var(--md-on-primary);cursor:pointer; }
    @keyframes interaction-spin { to { transform:rotate(360deg); } }
    @media(prefers-reduced-motion:reduce) { .spinner { animation:none; } }
  `,
})
export class InteractionStatusComponent {
  readonly status = inject(InteractionStatusService);
  readonly navigating = signal(false);
  readonly navigationError = signal('');
  private readonly router = inject(Router);
  private timer?: ReturnType<typeof setTimeout>;
  private pendingId: number | null = null;
  constructor() {
    const browser = isPlatformBrowser(inject(PLATFORM_ID));
    const begin = (id: number) => {
      clearTimeout(this.timer);
      this.pendingId = id;
      this.navigationError.set('');
      this.navigating.set(true);
      if (browser) this.timer = setTimeout(() => {
        if (this.pendingId !== id) return;
        this.router.currentNavigation()?.abort();
        this.pendingId = null;
        this.navigating.set(false);
        this.navigationError.set('No pudimos abrir la página a tiempo. Volvé a intentar desde el enlace.');
      }, 15000);
    };
    const initial = this.router.currentNavigation();
    if (initial) begin(initial.id);
    this.router.events.pipe(takeUntilDestroyed()).subscribe(event => {
      if (event instanceof NavigationStart) begin(event.id);
      else if ((event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationSkipped || event instanceof NavigationError) && event.id === this.pendingId) {
        clearTimeout(this.timer);
        this.pendingId = null;
        this.navigating.set(false);
        if (event instanceof NavigationError) this.navigationError.set('No pudimos abrir la página. Volvé a intentar desde el enlace.');
        if (event instanceof NavigationCancel && event.code === NavigationCancellationCode.GuardRejected) this.navigationError.set('La navegación no se completó. Revisá los avisos de la página antes de continuar.');
      }
    });
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }
  dismiss(): void { this.navigationError.set(''); this.status.error.set(''); }
}
