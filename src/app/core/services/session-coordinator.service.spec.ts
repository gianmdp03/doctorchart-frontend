import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { SessionCoordinatorService } from './session-coordinator.service';
import { AuthService } from './auth.service';
import { DoctorProfileService } from './doctor-profile.service';
import { WorkspaceStore } from './workspace.store';
import { ActivePatientService } from './active-patient.service';
import { ClinicalEncounterService } from './clinical-encounter.service';
import { WorkspaceService } from './workspace.service';
import { Subject, of } from 'rxjs';
import { convertToParamMap } from '@angular/router';
import { clinicalContextGuard } from '../guards/clinical-context.guard';
import { dialogWorkspace } from '../../features/dynamic-form-renderer/clinical-dialog.fixture';
import type { SpecialtyContextSummary } from '../models/workspace.model';

describe('Account loading without entitlement', () => {
 const active=signal(false);
 const currentUser=signal({id:'fixture-user'});
 const profile={clearProfile:vi.fn(),loadProfile:vi.fn().mockResolvedValue(null)};
 const workspace={bindSession:vi.fn(),clearSetup:vi.fn(),loadSetup:vi.fn().mockResolvedValue(null),loadPreferences:vi.fn(),isOnboardingCompleted:()=>false};
 beforeEach(() => {
  active.set(false); vi.clearAllMocks();
  TestBed.configureTestingModule({providers:[provideRouter([]),
   {provide:AuthService,useValue:{currentUser,isSuperAdmin:()=>false,hasDoctorchartPlan:active}},
   {provide:DoctorProfileService,useValue:profile},{provide:WorkspaceStore,useValue:workspace},
   {provide:ActivePatientService,useValue:{clear:vi.fn()}},{provide:ClinicalEncounterService,useValue:{clear:vi.fn()}}]});
 });
 it('does not load protected medical resources for an account without a plan', async () => {
  TestBed.inject(SessionCoordinatorService); TestBed.tick();
  expect(profile.loadProfile).not.toHaveBeenCalled(); expect(workspace.loadSetup).not.toHaveBeenCalled();
  expect(workspace.loadPreferences).not.toHaveBeenCalled();
 });
 it('loads resources when the same account acquires a plan and clears them when it expires', async () => {
  vi.spyOn(TestBed.inject(Router),'navigateByUrl').mockResolvedValue(true);
  TestBed.inject(SessionCoordinatorService); TestBed.tick();
  active.set(true); TestBed.tick(); await Promise.resolve();
  expect(profile.loadProfile).toHaveBeenCalledOnce(); expect(workspace.loadSetup).toHaveBeenCalledOnce();
  active.set(false); TestBed.tick();
  expect(profile.clearProfile).toHaveBeenCalledTimes(3); expect(profile.loadProfile).toHaveBeenCalledOnce();
 });
});

describe('Private entry restored while the lazy coordinator starts', () => {
 it('keeps the original route guard read alive when session initialization overlaps it', async () => {
  const contexts = new Subject<SpecialtyContextSummary[]>();
  const setup = dialogWorkspace();
  const api = {
   getContexts:vi.fn(() => contexts),
   getCurrentSetup:vi.fn(() => of(setup)),
   getPreferences:vi.fn(() => of({version:1,patientColumnsConfig:{},quickNotes:null})),
  };
  TestBed.configureTestingModule({providers:[provideRouter([]),
   {provide:AuthService,useValue:{authReady:Promise.resolve(),currentUser:signal({id:'doctor-a'}),isLoggedIn:()=>true,isSuperAdmin:()=>false,hasDoctorchartPlan:()=>true}},
   {provide:WorkspaceService,useValue:api},
   {provide:DoctorProfileService,useValue:{clearProfile:vi.fn(),loadProfile:vi.fn().mockResolvedValue(null)}},
   {provide:ActivePatientService,useValue:{clear:vi.fn()}},
   {provide:ClinicalEncounterService,useValue:{clear:vi.fn()}}]});
  const pending = TestBed.runInInjectionContext(() => clinicalContextGuard({queryParamMap:convertToParamMap({specialtyContextId:String(setup.specialtyContextId)}),data:{clinicalContext:true}} as any,{url:'/patients'} as any));
  await Promise.resolve();
  expect(contexts.observed).toBe(true);
  TestBed.inject(SessionCoordinatorService);
  TestBed.tick();
  contexts.next([{id:setup.specialtyContextId,workspaceId:setup.id,version:setup.version,specialty:setup.specialty,onboardingCompleted:true,ready:true,hasDraft:false}]);
  contexts.complete();
  expect(await pending).toBe(true);
  expect(api.getContexts).toHaveBeenCalledOnce();
  expect(TestBed.inject(WorkspaceStore).specialtyContextId()).toBe(setup.specialtyContextId);
 });
});
