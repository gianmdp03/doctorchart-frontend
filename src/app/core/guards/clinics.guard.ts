import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FEATURE_FLAGS } from '../config/feature-flags';
import { AuthService } from '../services/auth.service';
import { WorkspaceStore } from '../services/workspace.store';

export const clinicsGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const workspaceStore = inject(WorkspaceStore);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  if (authService.isSuperAdmin()) {
    return router.createUrlTree(['/admin/specialties']);
  }

  const enabled = workspaceStore.clinicsEnabled?.() ?? FEATURE_FLAGS.CLINICS_ENABLED;
  if (!enabled) {
    return router.createUrlTree(['/dashboard']);
  }

  try {
    // Administration spans every specialty, including when the selection is pending.
    if ((await workspaceStore.loadContexts()).some(context => context.ready)) return true;
    const setup = await workspaceStore.loadSetup();
    if (!setup?.onboardingCompleted) {
      return router.createUrlTree([
        setup?.specialty ? '/onboarding/setup' : '/onboarding/select-specialty',
      ]);
    }
    return true;
  } catch {
    return false;
  }
};
