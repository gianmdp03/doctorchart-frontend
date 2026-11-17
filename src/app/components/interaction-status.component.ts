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
  styleUrl: './interaction-status.component.css',
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
