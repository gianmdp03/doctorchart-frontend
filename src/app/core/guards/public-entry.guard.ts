import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** Signed-in users can visit the public home; only the login page redirects them. */
export const publicEntryGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.authReady;
  return auth.isLoggedIn()
    ? router.createUrlTree([auth.isSuperAdmin() ? '/admin/specialties' : '/dashboard'])
    : true;
};
