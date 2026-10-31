import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, provideRouter } from '@angular/router';
import { expect, it } from 'vitest';
import { FEATURE_FLAGS } from '../config/feature-flags';
import { schedulesGuard } from './schedules.guard';
it('keeps M3 routes disabled independently of clinical access',()=>{
 TestBed.configureTestingModule({providers:[provideRouter([])]});
 expect(FEATURE_FLAGS.SCHEDULES_ENABLED).toBe(false);
 const result=TestBed.runInInjectionContext(()=>schedulesGuard({} as ActivatedRouteSnapshot,{} as RouterStateSnapshot));
 expect(TestBed.inject(Router).serializeUrl(result as ReturnType<Router['createUrlTree']>)).toBe('/dashboard');
});

