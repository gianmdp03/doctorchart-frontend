import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** Keep returning users in their clinical workspace instead of the public entry pages. */
export const publicEntryGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.authReady;
  return auth.isLoggedIn()
    ? router.createUrlTree([auth.isSuperAdmin() ? '/admin/specialties' : '/dashboard'])
    : true;
};
