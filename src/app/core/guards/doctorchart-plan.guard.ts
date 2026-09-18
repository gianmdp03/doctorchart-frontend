import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

export const doctorchartPlanGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  await authService.authReady;

  if (!authService.isLoggedIn()) {
    authService.openLoginModal();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-login-modal'));
    }
    return false;
  }

  if (authService.hasDoctorchartPlan()) {
    return true;
  }

  // User is logged in but does not have an active DoctorChart plan
  // Redirect immediately to Syntah to pay/subscribe
  const redirectUrl = environment.syntahPlansUrl || 'http://localhost:4200/company-panel#plans-catalog';
  if (typeof window !== 'undefined') {
    window.location.href = redirectUrl;
  }
  return false;
};
