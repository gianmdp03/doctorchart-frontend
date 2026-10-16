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
  private entryPath = '/';
  setEntryPath(path: string): void { this.entryPath = path; }

  constructor() {
    effect(() => {
      const identity = this.authService.currentUser()?.id ?? null;
      const adminIdentity = this.authService.isSuperAdmin();
      if (identity === this.identity && adminIdentity === this.adminIdentity) return;
      this.identity = identity;
      this.adminIdentity = adminIdentity;
      untracked(() => {
        if (adminIdentity) this.activePatient.clear();
        this.clinicalEncounters.clear();
        this.doctorProfileService.clearProfile();
        this.workspaceStore.clearSetup();
        if (identity && adminIdentity) {
          void this.router.navigate(['/admin/especialidades']).catch(() => undefined);
        } else if (identity) {
          void this.loadIdentity();
          if (this.router.url.startsWith('/admin/')) void this.router.navigate(['/dashboard']).catch(() => undefined);
        }
      });
    });
    effect(() => {
      if (this.authService.currentUser()?.id && !this.authService.isSuperAdmin() && this.workspaceStore.isOnboardingCompleted()
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
    if (!identity || identity !== this.authService.currentUser()?.id || this.authService.isSuperAdmin()
      || results.some(result => result.status === 'rejected')) return;
    // Resume a cancelled initial navigation without replacing its requested medical route.
    if (['/', '/login'].includes(this.router.url.split(/[?#]/)[0]) && !this.router.currentNavigation()) {
      const requested = this.router.parseUrl(this.router.url).queryParams['returnUrl'];
      const target = typeof requested === 'string' && requested.startsWith('/') && !requested.startsWith('//') && !['/', '/login'].includes(requested.split(/[?#]/)[0])
        ? requested : !['/', '/login'].includes(this.entryPath) ? this.entryPath : '/dashboard';
      await this.router.navigateByUrl(target).catch(() => undefined);
    }
  }

  retrySetup(): void { if (!this.authService.isSuperAdmin()) void this.loadIdentity(); }
}
