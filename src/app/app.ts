import { ClinicalEncounterService } from './core/services/clinical-encounter.service';
import { ActivePatientService } from './core/services/active-patient.service';
import { Component, computed, effect, inject, untracked } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AuthService } from './core/services/auth.service';
import { DoctorProfileService } from './core/services/doctor-profile.service';
import { EncounterDetailDialogComponent } from './features/encounter-detail-dialog/encounter-detail-dialog.component';
import { LoginPageComponent } from './features/auth/login-page.component';
import { UserProfileDialogComponent } from './features/auth/user-profile-dialog.component';
import { AiAssistantWidgetComponent } from './features/ai-assistant/ai-assistant-widget.component';
import { WorkspaceStore } from './core/services/workspace.store';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
    EncounterDetailDialogComponent,
    LoginPageComponent,
    UserProfileDialogComponent,
    AiAssistantWidgetComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly authService = inject(AuthService);
  readonly doctorProfileService = inject(DoctorProfileService);
  readonly workspaceStore = inject(WorkspaceStore);
  readonly sessionKeys = computed(() => [JSON.stringify([this.authService.currentUser()?.id ?? null, this.authService.isSuperAdmin()])]);
  private readonly router = inject(Router);
  private readonly activePatient = inject(ActivePatientService);
  private readonly clinicalEncounters = inject(ClinicalEncounterService);
  private identity: string | null = null;
  private adminIdentity = false;
  private readonly entryPath = typeof window === 'undefined' ? '/' : window.location.pathname;

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
    if (this.router.url === '/' && !this.router.currentNavigation()) await this.router.navigateByUrl(this.entryPath === '/' ? '/dashboard' : this.entryPath).catch(() => undefined);
  }

  retrySetup(): void { if (!this.authService.isSuperAdmin()) void this.loadIdentity(); }
}
