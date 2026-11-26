import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { FEATURE_FLAGS } from '../config/feature-flags';
import { AuthService } from '../services/auth.service';

export const basicBookingPlanMatch: CanMatchFn = async route => {
  const enabled = route.path === 'calendar'
    ? FEATURE_FLAGS.CALENDAR_ENABLED && FEATURE_FLAGS.SCHEDULES_ENABLED
    : FEATURE_FLAGS.PUBLIC_APPOINTMENTS_ENABLED;
  if (!enabled) return false;

  const auth = inject(AuthService);
  await auth.authReady;
  return auth.isLoggedIn() && auth.doctorchartPlanTier() === 'BASIC';
};
