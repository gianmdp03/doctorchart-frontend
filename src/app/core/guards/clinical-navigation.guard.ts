import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { WorkspaceStore } from '../services/workspace.store';
import { ClinicalNavigationId } from '../models/specialty-experience.model';
import { FEATURE_FLAGS } from '../config/feature-flags';

/** Availability of a specialty screen, independent of patient authorization in backend services. */
export const clinicalNavigationGuard = (entry: ClinicalNavigationId): CanActivateFn => async () => {
  const auth = inject(AuthService);
  const workspace = inject(WorkspaceStore);
  const router = inject(Router);
  await auth.authReady;
  if (!auth.isLoggedIn()) return true;
  if (auth.isSuperAdmin()) return router.createUrlTree(['/admin/specialties']);
  if (entry === 'CALCULATORS' && !workspace.calculatorsEnabled()) {
    return router.createUrlTree(['/dashboard']);
  }
  try {
    const setup = await workspace.loadSetup();
    if (!setup?.onboardingCompleted) return router.createUrlTree([setup ? '/onboarding/setup' : '/onboarding/select-specialty']);
    return setup.experience.navigation.includes(entry) ? true : router.createUrlTree(['/dashboard']);
  } catch { return false; }
};
