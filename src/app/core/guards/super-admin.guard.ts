import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** Navigation convenience only: every admin operation is independently authorized by the backend. */
export const superAdminGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.authReady;
  return auth.isLoggedIn() && auth.isSuperAdmin() ? true : router.createUrlTree(['/dashboard']);
};
