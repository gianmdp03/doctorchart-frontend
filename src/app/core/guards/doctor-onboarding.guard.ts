import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DoctorProfileService } from '../services/doctor-profile.service';

/**
 * Functional Guard that forces authenticated clinicians to select their immutable medical specialty
 * before accessing clinical modules.
 */
export const doctorOnboardingGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const doctorProfileService = inject(DoctorProfileService);
  const router = inject(Router);

  await authService.authReady;

  if (!authService.isLoggedIn()) {
    return true; // doctorchartPlanGuard handles redirect to login
  }

  // Ensure profile is loaded
  if (!doctorProfileService.loaded()) {
    await doctorProfileService.loadProfile();
  }

  if (doctorProfileService.hasSpecialty()) {
    return true;
  }

  // Specialty not yet selected -> redirect to onboarding selection screen
  return router.createUrlTree(['/onboarding/select-specialty']);
};

/**
 * Functional Guard that prevents onboarded doctors from re-entering the specialty selection screen.
 */
export const preventCompletedOnboardingGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const doctorProfileService = inject(DoctorProfileService);
  const router = inject(Router);

  await authService.authReady;

  if (!authService.isLoggedIn()) {
    return true;
  }

  if (!doctorProfileService.loaded()) {
    await doctorProfileService.loadProfile();
  }

  if (doctorProfileService.hasSpecialty()) {
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};
