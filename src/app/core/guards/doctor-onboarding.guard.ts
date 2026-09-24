import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DoctorProfileService } from '../services/doctor-profile.service';
import { WorkspaceStore } from '../services/workspace.store';

/**
 * Functional Guard that forces authenticated clinicians to select their immutable medical specialty
 * before accessing clinical modules.
 */
export const doctorOnboardingGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const doctorProfileService = inject(DoctorProfileService);
  const workspaceStore = inject(WorkspaceStore);
  const router = inject(Router);

  await authService.authReady;

  if (!authService.isLoggedIn()) {
    return true; // doctorchartPlanGuard handles redirect to login
  }

  const setup = await workspaceStore.loadSetup();
  if (setup?.onboardingCompleted) {
    return true;
  }

  // Legacy accounts completed specialty selection before the workspace wizard existed.
  // Keep their access intact when they do not yet have a workspace record.
  if (!doctorProfileService.loaded()) {
    await doctorProfileService.loadProfile();
  }

  if (!setup?.id && doctorProfileService.hasSpecialty()) {
    return true;
  }

  return router.createUrlTree([setup?.specialtyId ? '/onboarding/setup' : '/onboarding/select-specialty']);
};

/**
 * Functional Guard that prevents onboarded doctors from re-entering the specialty selection screen.
 */
export const preventCompletedOnboardingGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const doctorProfileService = inject(DoctorProfileService);
  const workspaceStore = inject(WorkspaceStore);
  const router = inject(Router);

  await authService.authReady;

  if (!authService.isLoggedIn()) {
    return true;
  }

  const setup = await workspaceStore.loadSetup();
  if (setup?.onboardingCompleted) {
    return router.createUrlTree(['/dashboard']);
  }

  if (!doctorProfileService.loaded()) {
    await doctorProfileService.loadProfile();
  }

  if (!setup?.id && doctorProfileService.hasSpecialty()) {
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};
