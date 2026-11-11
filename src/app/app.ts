import { Component, computed, DestroyRef, effect, EnvironmentInjector, inject, PendingTasks, untracked } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { ThemeService } from './core/services/theme.service';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { PrivateShellComponent } from './layout/private-shell/private-shell.component';
import { InteractionStatusComponent } from './components/interaction-status.component';
import { FEATURE_FLAGS } from './core/config/feature-flags';

// The prerendered root is anonymous; a restored browser session can select a
// different layout before hydration claims its views. Recreate this boundary
// instead of leaving unclaimed public DOM alongside the private workspace.
@Component({ selector: 'app-root', host: { ngSkipHydration: 'true' }, imports: [RouterOutlet, ScrollToTopComponent, PrivateShellComponent, InteractionStatusComponent], templateUrl: './app.html', styleUrl: './app.css' })
export class App {
  private readonly theme = inject(ThemeService);
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly injector = inject(EnvironmentInjector);
  private readonly pendingTasks = inject(PendingTasks);
  private readonly destroyRef = inject(DestroyRef);
  private readonly entryPath = typeof window === 'undefined' ? '/' : window.location.pathname+window.location.search+window.location.hash;
  private coordinatorLoading = false;
  readonly sessionKeys = computed(() => [JSON.stringify([this.authService.currentUser()?.id ?? null, this.authService.isSuperAdmin()])]);
  private readonly pageUrl = toSignal(this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd), map(event => event.urlAfterRedirects)), { initialValue: this.entryPath });
  readonly isStaffPage=computed(()=>/^\/staff\/(login|activate|recover|calendar)$/.test(this.pageUrl().split(/[?#]/)[0]));
 readonly isPublicAppointmentsPage=computed(()=>{
   const path=this.pageUrl().split(/[?#]/)[0];
   return (FEATURE_FLAGS.PUBLIC_APPOINTMENTS_ENABLED && path==='/') || /^\/appointments(?:\/[^/]+)?$/.test(path);
 });
 readonly isPublicPage = computed(() => this.isPublicAppointmentsPage() || ['/', '/professionals', '/login', '/404'].includes(this.pageUrl().split(/[?#]/)[0]) || this.router.routerState.snapshot.root.firstChild?.routeConfig?.path === '**');
  constructor() {
    effect(() => {
      if (this.isStaffPage() || this.isPublicAppointmentsPage() || !this.authService.currentUser() || this.coordinatorLoading) return;
      this.coordinatorLoading = true;
      untracked(() => this.pendingTasks.run(async () => {
        try {
          const { SessionCoordinatorService } = await import('./core/services/session-coordinator.service');
          if (!this.destroyRef.destroyed) this.injector.get(SessionCoordinatorService).setEntryPath(this.entryPath);
        } catch { this.coordinatorLoading = false; }
      }));
    });
  }
}
