import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, signal, untracked } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideBaby,
  lucideDownload,
  lucideEye,
  lucideHome,
  lucideRefreshCw,
  lucideSliders,
  lucideSparkles,
  lucideStethoscope,
  lucideUpload,
} from '@ng-icons/lucide';
import { filter, map } from 'rxjs';
import { InteractionStatusComponent } from '../app/components/interaction-status.component';
import { ScrollToTopComponent } from '../app/components/scroll-to-top/scroll-to-top.component';
import { SessionCoordinatorService } from '../app/core/services/session-coordinator.service';
import { ThemeService } from '../app/core/services/theme.service';
import { WorkspaceStore } from '../app/core/services/workspace.store';
import { PrivateShellComponent } from '../app/layout/private-shell/private-shell.component';
import { ThemeToggleComponent } from '../app/shared/components/theme-toggle/theme-toggle.component';
import { DemoSession } from './demo-data';
import { DemoSessionService } from './demo-session.service';
import { DEMO_SPECIALTIES_CATALOG } from './demo-specialties';

@Component({
  selector: 'app-demo-root',
  imports: [
    DatePipe,
    FormsModule,
    NgIcon,
    ThemeToggleComponent,
    InteractionStatusComponent,
    PrivateShellComponent,
    ScrollToTopComponent,
  ],
  providers: [
    provideIcons({
      lucideArrowRight,
      lucideBaby,
      lucideDownload,
      lucideEye,
      lucideHome,
      lucideRefreshCw,
      lucideSliders,
      lucideSparkles,
      lucideStethoscope,
      lucideUpload,
    }),
  ],
  templateUrl: './demo-app.component.html',
  styleUrl: './demo-app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoAppComponent {
  private readonly theme = inject(ThemeService);
  private readonly coordinator = inject(SessionCoordinatorService);
  private readonly workspaceStore = inject(WorkspaceStore);
  private readonly router = inject(Router);
  readonly demoSession = inject(DemoSessionService);

  readonly specialties = DEMO_SPECIALTIES_CATALOG;
  readonly selectedSpecialtyId = signal<number>(1); // Pediatría por defecto
  readonly pendingImport = signal<DemoSession | null>(null);
  readonly confirmRegenerate = signal(false);

  readonly selectedSpecialty = computed(
    () => this.specialties.find((s) => s.id === this.selectedSpecialtyId()) ?? this.specialties[0],
  );

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: '/dashboard' },
  );

  readonly isTurnosVisualRoute = computed(() =>
    /^\/(?:calendar|clinics|schedules|booking-publication|secretaries)(?:\/|$|\?)/.test(
      this.currentUrl(),
    ),
  );

  readonly activeSpecialtyName = computed(() => {
    const ctx = this.demoSession.activeContext();
    if (!ctx) return this.selectedSpecialty().name;
    return this.specialties.find((s) => s.id === ctx.specialtyId)?.name ?? 'Pediatría';
  });

  private readonly sessionSyncKey = computed(() =>
    this.demoSession.hasSession() ? this.demoSession.session().activeContextId : 0,
  );

  constructor() {
    void this.theme;
    void this.coordinator;
    void this.demoSession.load();

    // Sync workspace context only when entering or switching active specialty context
    effect(() => {
      const syncKey = this.sessionSyncKey();
      untracked(() => {
        if (syncKey > 0) {
          this.workspaceStore.clearSetup();
        }
      });
    });

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe(() => {
        this.confirmRegenerate.set(false);
      });
  }

  async generateAndEnter(openWizardFirst: boolean): Promise<void> {
    if (this.demoSession.busy()) return;
    const ok = await this.demoSession.startWithSpecialty(this.selectedSpecialtyId(), openWizardFirst);
    if (ok) {
      await this.router.navigate([openWizardFirst ? '/onboarding/setup' : '/dashboard']);
    }
  }

  async resumeExisting(): Promise<void> {
    this.demoSession.resumeActiveSession();
    await this.router.navigate(['/dashboard']);
  }

  async regenerateCohort(): Promise<void> {
    this.confirmRegenerate.set(false);
    const ok = await this.demoSession.regeneratePatients('replace');
    if (ok) {
      await this.router.navigate(['/patients']);
    }
  }

  openGeneratorPage(): void {
    void this.router.navigate(['/patients/new']);
  }

  returnToStart(): void {
    this.confirmRegenerate.set(false);
    this.pendingImport.set(null);
    this.demoSession.returnToStart();
  }

  async onSessionFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    this.demoSession.error.set('');
    this.demoSession.notice.set('');
    try {
      const parsed = await this.demoSession.parseUploadedSession(file);
      if (this.demoSession.hasStoredSession()) {
        this.pendingImport.set(parsed);
      } else {
        await this.applyPendingImport(parsed);
      }
    } catch (err) {
      this.demoSession.error.set(err instanceof Error ? err.message : 'No se pudo leer el archivo.');
    }
  }

  async applyPendingImport(sessionToApply?: DemoSession): Promise<void> {
    const target = sessionToApply ?? this.pendingImport();
    if (!target) return;
    this.pendingImport.set(null);
    const ok = await this.demoSession.applyImportedSession(target);
    if (ok) {
      await this.router.navigate(['/dashboard']);
    }
  }

  cancelPendingImport(): void {
    this.pendingImport.set(null);
  }
}
