import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { SessionCoordinatorService } from './session-coordinator.service';
import { AuthService } from './auth.service';
import { DoctorProfileService } from './doctor-profile.service';
import { WorkspaceStore } from './workspace.store';
import { ActivePatientService } from './active-patient.service';
import { ClinicalEncounterService } from './clinical-encounter.service';

describe('Account loading without entitlement', () => {
 const active=signal(false);
 const currentUser=signal({id:'fixture-user'});
 const profile={clearProfile:vi.fn(),loadProfile:vi.fn().mockResolvedValue(null)};
 const workspace={clearSetup:vi.fn(),loadSetup:vi.fn().mockResolvedValue(null),loadPreferences:vi.fn(),isOnboardingCompleted:()=>false};
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
