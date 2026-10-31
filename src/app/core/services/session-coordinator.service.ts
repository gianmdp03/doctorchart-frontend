import { effect, inject, Injectable, untracked } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ActivePatientService } from './active-patient.service';
import { ClinicalEncounterService } from './clinical-encounter.service';
import { DoctorProfileService } from './doctor-profile.service';
import { WorkspaceStore } from './workspace.store';

@Injectable({ providedIn: 'root' })
export class SessionCoordinatorService {
  readonly authService = inject(AuthService);
  readonly doctorProfileService = inject(DoctorProfileService);
  readonly workspaceStore = inject(WorkspaceStore);
  private readonly router = inject(Router);
  private readonly activePatient = inject(ActivePatientService);
  private readonly clinicalEncounters = inject(ClinicalEncounterService);
  private identity: string | null = null;
  private adminIdentity = false;
  private planActive = false;
  private entryPath = '/';
  setEntryPath(path: string): void { this.entryPath = path; }

  constructor() {
    effect(() => {
      const identity = this.authService.currentUser()?.id ?? null;
      const adminIdentity = this.authService.isSuperAdmin();
      const planActive = this.authService.hasDoctorchartPlan();
      if (identity === this.identity && adminIdentity === this.adminIdentity && planActive === this.planActive) return;
      this.identity = identity;
      this.adminIdentity = adminIdentity;
      this.planActive = planActive;
      untracked(() => {
        if (adminIdentity || !planActive) this.activePatient.clear();
        this.clinicalEncounters.clear();
        this.doctorProfileService.clearProfile();
        this.workspaceStore.clearSetup();
        if (identity && adminIdentity) {
          const path = this.router.url.split(/[?#]/)[0];
          if (path !== '/' && path !== '/404' && this.router.routerState.snapshot.root.firstChild?.routeConfig?.path !== '**') {
            void this.router.navigate(['/admin/specialties']).catch(() => undefined);
          }
        } else if (identity && planActive) {
          void this.loadIdentity();
          if (this.router.url.startsWith('/admin/')) void this.router.navigate(['/dashboard']).catch(() => undefined);
        }
      });
    });
    effect(() => {
      if (this.authService.currentUser()?.id && this.authService.hasDoctorchartPlan() && !this.authService.isSuperAdmin() && this.workspaceStore.isOnboardingCompleted()
        && !this.workspaceStore.preferences() && !this.workspaceStore.preferencesError()
        && !this.workspaceStore.isLoading()) {
        untracked(() => { void this.workspaceStore.loadPreferences().catch(() => undefined); });
      }
    });
  }

  private async loadIdentity(): Promise<void> {
    const identity = this.authService.currentUser()?.id;
    const results = await Promise.allSettled([
      this.doctorProfileService.loadProfile(),
      this.workspaceStore.loadSetup().then(setup => setup ? this.workspaceStore.loadPreferences() : null),
    ]);
    if (!identity || identity !== this.authService.currentUser()?.id || !this.authService.hasDoctorchartPlan() || this.authService.isSuperAdmin()
      || results.some(result => result.status === 'rejected')) return;
    // Resume a cancelled initial navigation without replacing its requested medical route.
    const path = this.router.url.split(/[?#]/)[0];
    const restoringPrivateEntry = path === '/' && !['/', '/login'].includes(this.entryPath)
      && !this.router.lastSuccessfulNavigation();
    if ((path === '/login' || restoringPrivateEntry) && !this.router.currentNavigation()) {
      const requested = this.router.parseUrl(this.router.url).queryParams['returnUrl'];
      const target = typeof requested === 'string' && requested.startsWith('/') && !requested.startsWith('//') && !['/', '/login'].includes(requested.split(/[?#]/)[0])
        ? requested : !['/', '/login'].includes(this.entryPath) ? this.entryPath : '/dashboard';
      await this.router.navigateByUrl(target).catch(() => undefined);
    }
  }

  retrySetup(): void { if (this.authService.hasDoctorchartPlan() && !this.authService.isSuperAdmin()) void this.loadIdentity(); }
}
