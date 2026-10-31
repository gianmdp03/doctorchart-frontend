import {inject} from '@angular/core';import {CanActivateFn,Router} from '@angular/router';import {FEATURE_FLAGS} from '../config/feature-flags';
export const publicAppointmentsGuard:CanActivateFn=()=>FEATURE_FLAGS.PUBLIC_APPOINTMENTS_ENABLED||inject(Router).createUrlTree(['/404']);
