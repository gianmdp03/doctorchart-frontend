import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { WorkspaceStore } from '../services/workspace.store';

/** The personal editor is for clinicians; administrators configure specialty defaults in their panel. */
export const doctorWizardGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.authReady;
  return auth.isLoggedIn() && auth.isSuperAdmin() ? router.createUrlTree(['/admin/especialidades']) : true;
};

export const doctorOnboardingGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const workspace = inject(WorkspaceStore);
  const router = inject(Router);
  await auth.authReady;
  if (!auth.isLoggedIn()) return true;
  if (auth.isSuperAdmin()) return router.createUrlTree(['/admin/especialidades']);
  try {
    const setup = await workspace.loadSetup();
    if (setup?.onboardingCompleted && setup.definition) return true;
    return router.createUrlTree([setup ? '/onboarding/setup' : '/onboarding/select-specialty']);
  } catch {
    return false;
  }
};

export const preventCompletedOnboardingGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const workspace = inject(WorkspaceStore);
  const router = inject(Router);
  await auth.authReady;
  if (!auth.isLoggedIn()) return true;
  if (auth.isSuperAdmin()) return router.createUrlTree(['/admin/especialidades']);
  try {
    const setup = await workspace.loadSetup();
    return setup?.onboardingCompleted && setup.definition ? router.createUrlTree(['/dashboard']) : true;
  } catch {
    return false;
  }
};
