import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const doctorchartPlanGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  await authService.authReady;

  if (!authService.isLoggedIn()) {
    authService.openLoginModal();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-login-modal'));
    }
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }

  if (authService.hasDoctorchartPlan()) {
    return true;
  }

  return router.createUrlTree(['/sin-plan'], { queryParams: { returnUrl: state.url } });
};

export const doctorchartNoPlanGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.authReady;
  if (!auth.isLoggedIn()) return router.createUrlTree(['/login']);
  return auth.hasDoctorchartPlan() ? router.createUrlTree(['/dashboard']) : true;
};
