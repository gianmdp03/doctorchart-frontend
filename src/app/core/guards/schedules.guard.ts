import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FEATURE_FLAGS } from '../config/feature-flags';
import { clinicsGuard } from './clinics.guard';
export const schedulesGuard:CanActivateFn=(route,state)=>{
 if(!FEATURE_FLAGS.SCHEDULES_ENABLED)return inject(Router).createUrlTree(['/dashboard']);
 return clinicsGuard(route,state);
};
