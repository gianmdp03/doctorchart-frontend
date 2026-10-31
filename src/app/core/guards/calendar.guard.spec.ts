import {TestBed} from '@angular/core/testing';
import {provideRouter,Router} from '@angular/router';
import {calendarGuard} from './calendar.guard';
import {FEATURE_FLAGS} from '../config/feature-flags';
import {AuthService} from '../services/auth.service';
import {WorkspaceStore} from '../services/workspace.store';
describe('Calendar opt-in guard',()=>{
 const flags={...FEATURE_FLAGS};let logged=true,completed=true;
 beforeEach(()=>{logged=true;completed=true;TestBed.configureTestingModule({providers:[provideRouter([]),{provide:AuthService,useValue:{isLoggedIn:()=>logged,isSuperAdmin:()=>false}},{provide:WorkspaceStore,useValue:{clinicsEnabled:()=>true,loadSetup:async()=>({onboardingCompleted:completed,specialty:{}})}}]});});
 afterEach(()=>Object.assign(FEATURE_FLAGS,flags));
 const run=()=>TestBed.runInInjectionContext(()=>calendarGuard({} as any,{} as any));
 it('defaults to disabled',async()=>{expect(TestBed.inject(Router).serializeUrl(await run() as any)).toBe('/dashboard');});
 it('requires the authenticated onboarded doctor even with flags on',async()=>{FEATURE_FLAGS.CALENDAR_ENABLED=true;FEATURE_FLAGS.SCHEDULES_ENABLED=true;logged=false;expect(TestBed.inject(Router).serializeUrl(await run() as any)).toBe('/login');logged=true;completed=false;expect(TestBed.inject(Router).serializeUrl(await run() as any)).toBe('/onboarding/setup');completed=true;expect(await run()).toBe(true);});
});
