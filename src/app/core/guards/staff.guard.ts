import {inject} from '@angular/core';
import {CanActivateFn,Router} from '@angular/router';
import {FEATURE_FLAGS} from '../config/feature-flags';
import {StaffService} from '../../features/staff/staff.service';
export const staffFeatureGuard:CanActivateFn=()=>FEATURE_FLAGS.STAFF_ENABLED||inject(Router).createUrlTree(['/404']);
export const staffSessionGuard:CanActivateFn=async()=>{const router=inject(Router),api=inject(StaffService);if(!FEATURE_FLAGS.STAFF_ENABLED)return router.createUrlTree(['/404']);try{await api.loadSession();return true;}catch{api.session.set(null);return router.createUrlTree(['/staff/login']);}};
