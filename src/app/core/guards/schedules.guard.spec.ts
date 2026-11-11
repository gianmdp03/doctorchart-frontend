import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, provideRouter } from '@angular/router';
import { expect, it, afterEach } from 'vitest';
import { FEATURE_FLAGS } from '../config/feature-flags';
import { schedulesGuard } from './schedules.guard';
import { AuthService } from '../services/auth.service';
import { WorkspaceStore } from '../services/workspace.store';
const initial=FEATURE_FLAGS.SCHEDULES_ENABLED;
afterEach(()=>FEATURE_FLAGS.SCHEDULES_ENABLED=initial);
it('keeps M3 routes disabled independently of clinical access when explicitly disabled',()=>{
 TestBed.configureTestingModule({providers:[provideRouter([])]});
 FEATURE_FLAGS.SCHEDULES_ENABLED=false;
 const result=TestBed.runInInjectionContext(()=>schedulesGuard({} as ActivatedRouteSnapshot,{} as RouterStateSnapshot));
 expect(TestBed.inject(Router).serializeUrl(result as ReturnType<Router['createUrlTree']>)).toBe('/dashboard');
});
it('allows the enabled M3 editor for an authenticated doctor with a ready context',async()=>{
 TestBed.configureTestingModule({providers:[provideRouter([]),{provide:AuthService,useValue:{isLoggedIn:()=>true,isSuperAdmin:()=>false}},{provide:WorkspaceStore,useValue:{clinicsEnabled:()=>true,loadContexts:async()=>[{id:101,ready:true}]}}]});
 expect(FEATURE_FLAGS.SCHEDULES_ENABLED).toBe(true);
 expect(await TestBed.runInInjectionContext(()=>schedulesGuard({} as ActivatedRouteSnapshot,{} as RouterStateSnapshot))).toBe(true);
});
