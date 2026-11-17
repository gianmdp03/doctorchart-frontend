import { ChangeDetectionStrategy, Component, DestroyRef, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationCancel, NavigationCancellationCode, NavigationEnd, NavigationError, NavigationSkipped, NavigationStart, Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideX } from '@ng-icons/lucide';
import { InteractionStatusService } from '../core/services/interaction-status.service';

@Component({
  selector: 'app-interaction-status', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  providers: [provideIcons({ lucideCheck, lucideX })],
  template: `
    <div class="status-stack">
      @if (navigating() || status.busy()) {
        <div class="interaction-status" role="status"><span class="spinner" aria-hidden="true"></span>{{ navigating() ? 'Abriendo página…' : 'Procesando…' }}</div>
      }
      @if (navigationError() || status.error()) {
        <div class="interaction-status error" role="alert"><span>{{ navigationError() || status.error() }}</span>
          <button type="button" (click)="dismiss()">Entendido</button>
        </div>
      }
    </div>
    <div class="success-toast" [class.visible]="status.success()">
      @if (status.success()) {
        <span class="success-icon" aria-hidden="true"><ng-icon name="lucideCheck" /></span>
      }
      <span class="success-message" role="status" aria-atomic="true">{{ status.success() }}</span>
      @if (status.success()) {
        <button class="close-toast" type="button" aria-label="Cerrar notificación" (click)="status.dismissSuccess()">
          <ng-icon name="lucideX" aria-hidden="true" />
        </button>
      }
    </div>
  `,
  styles: `
    .status-stack { position:fixed;z-index:2000;top:12px;left:50%;transform:translateX(-50%);width:max-content;max-width:calc(100vw - 24px);pointer-events:none; }
    .interaction-status { display:flex;align-items:center;gap:10px;padding:12px 16px;border:1px solid var(--border);border-radius:12px;background:var(--background);color:var(--foreground);box-shadow:0 4px 16px #0002;font-size:14px; }
    .spinner { width:16px;height:16px;flex-shrink:0;border:2px solid var(--border);border-top-color:var(--md-primary);border-radius:50%;animation:interaction-spin .8s linear infinite; }
    .error { flex-wrap:wrap; }
    .interaction-status button { pointer-events:auto;min-height:44px;padding:8px 12px;border-radius:8px;background:var(--md-primary);color:var(--md-on-primary);cursor:pointer; }
    .success-toast {
      position: fixed;
      z-index: 2000;
      inset-inline-end: max(16px, env(safe-area-inset-right));
      inset-block-end: max(76px, calc(env(safe-area-inset-bottom) + 16px));
      pointer-events: none;
    }
    .success-toast.visible {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
      inline-size: max-content;
      max-inline-size: min(25rem, calc(100vw - 32px));
      padding: 10px 10px 10px 14px;
      border: 1px solid var(--border);
      border-inline-start: 4px solid var(--md-sys-color-success, #146c2e);
      border-radius: 16px;
      background: var(--background);
      color: var(--foreground);
      box-shadow: 0 10px 32px rgb(0 0 0 / 16%);
      pointer-events: auto;
      animation: toast-enter 200ms ease-out both;
    }
    .success-icon, .close-toast { display: grid; place-items: center; flex-shrink: 0; }
    .success-icon {
      inline-size: 36px;
      block-size: 36px;
      border-radius: 50%;
      background: var(--md-sys-color-success-container, #bbf2c8);
      color: var(--md-sys-color-on-success-container, #002108);
      font-size: 18px;
    }
    .success-message { font-size: .9rem; font-weight: 600; line-height: 1.45; overflow-wrap: anywhere; }
    .close-toast {
      inline-size: 44px;
      block-size: 44px;
      border-radius: 10px;
      color: var(--foreground);
      font-size: 17px;
      cursor: pointer;
    }
    .close-toast:hover { background: var(--muted); }
    .close-toast:focus-visible { outline: 2px solid var(--md-primary, currentColor); outline-offset: -4px; }
    @keyframes interaction-spin { to { transform:rotate(360deg); } }
    @keyframes toast-enter { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @media(prefers-reduced-motion:reduce) { .spinner, .success-toast.visible { animation:none; } }
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
