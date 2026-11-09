import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap, convertToParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject, Subject, of, throwError } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthService } from '../../core/services/auth.service';
import { BrowserUiStorageService } from '../../core/services/browser-ui-storage.service';
import { ClinicsService } from '../clinics/clinics.service';
import { MOCK_CAPABILITIES_BY_SCENARIO, MOCK_CLINICS_FIXTURES } from '../clinics/clinics.mocks';
import { ClinicSchedule } from './schedules.models';
import { SchedulesService } from './schedules.service';
import { SchedulePageComponent } from './schedule-page.component';

describe('Schedule editor interaction and concurrency',()=>{
 let params:BehaviorSubject<ParamMap>;
 const user=signal<{id:string}|null>({id:'owner'});
 const schedule:ClinicSchedule={clinicId:'103',version:'7',configured:true,slotMinutes:30,minNoticeMinutes:0,maxAdvanceDays:30,weekly:[{weekday:1,ranges:[{start:'09:00',end:'12:00'}]}],exceptions:[]};
 let api:{get:ReturnType<typeof vi.fn>;save:ReturnType<typeof vi.fn>;availability:ReturnType<typeof vi.fn>};
 let clinics:{getClinic:ReturnType<typeof vi.fn>;getCapabilities:ReturnType<typeof vi.fn>;listClinics:ReturnType<typeof vi.fn>};
 beforeEach(async()=>{
  user.set({id:'owner'});params=new BehaviorSubject(convertToParamMap({id:'103'}));
  api={get:vi.fn(()=>of(structuredClone(schedule))),save:vi.fn(()=>of({...schedule,version:'8'})),availability:vi.fn(()=>of({clinicId:'103',timezone:'UTC',scheduleVersion:'7',generatedAt:'2026-10-30T12:00:00Z',days:[]}))};
  clinics={getClinic:vi.fn(()=>of(structuredClone(MOCK_CLINICS_FIXTURES[0]))),getCapabilities:vi.fn(()=>of(structuredClone(MOCK_CAPABILITIES_BY_SCENARIO.VERIFIED))),listClinics:vi.fn(()=>of({items:MOCK_CLINICS_FIXTURES,page:0,size:100,totalElements:MOCK_CLINICS_FIXTURES.length}))};
  await TestBed.configureTestingModule({imports:[SchedulePageComponent],providers:[provideRouter([]),{provide:ActivatedRoute,useValue:{paramMap:params.asObservable()}},{provide:AuthService,useValue:{currentUser:user}},{provide:ClinicsService,useValue:clinics},{provide:SchedulesService,useValue:api}]}).compileComponents();
 });
 afterEach(()=>{
  TestBed.inject(BrowserUiStorageService).writeScheduleDraft('owner','103',null);
  TestBed.inject(BrowserUiStorageService).writeScheduleDraft('owner','104',null);
  vi.useRealTimers();
 });
 async function create(){const fixture=TestBed.createComponent(SchedulePageComponent);await fixture.whenStable();fixture.detectChanges();return fixture;}
 it('renders the selected clinic, multiple ranges and shared date pickers',async()=>{
  const fixture=await create(),c=fixture.componentInstance;
  c.addRange(c.draft.weekly[0]);c.addException();fixture.detectChanges();
  expect(c.draft.weekly[0].ranges).toHaveLength(2);
  expect(fixture.nativeElement.querySelectorAll('app-date-picker').length).toBe(3);
  expect(fixture.nativeElement.querySelector('input[type=date]')).toBeNull();
  expect(fixture.nativeElement.textContent).toContain(MOCK_CLINICS_FIXTURES[0].name);
 });
 it('preserves the entire draft after a version conflict and prevents blind retries',async()=>{
  const fixture=await create(),c=fixture.componentInstance;
  c.draft.weekly[0].ranges[0].end='13:00';
  api.save.mockReturnValueOnce(throwError(()=>({status:409,error:{code:'VERSION_CONFLICT',message:'Cambió la agenda'}})));
  const before=structuredClone(c.draft);await c.save();fixture.detectChanges();
  expect(c.draft).toEqual(before);expect(c.conflict()).toBe(true);expect(c.canSave()).toBe(false);
  await c.save();expect(api.save).toHaveBeenCalledTimes(1);
  expect(fixture.nativeElement.querySelector('[data-testid=schedule-version-conflict]')).not.toBeNull();
 });
 it('retries capabilities without discarding entered values',async()=>{
  const fixture=await create(),c=fixture.componentInstance;c.draft.slotMinutes=45;
  clinics.getCapabilities.mockReturnValueOnce(throwError(()=>({status:503,error:{code:'ENTITLEMENTS_UNAVAILABLE'}})));
  await c.retryCapabilities();expect(c.canSave()).toBe(false);expect(c.draft.slotMinutes).toBe(45);
  await c.retryCapabilities();expect(c.draft.slotMinutes).toBe(45);expect(c.canSave()).toBe(true);
 });
 it('does not apply a late save to a different selected clinic',async()=>{
  const fixture=await create(),c=fixture.componentInstance,delayed=new Subject<ClinicSchedule>();
  api.save.mockReturnValueOnce(delayed);const pending=c.save();
  params.next(convertToParamMap({id:'104'}));await fixture.whenStable();
  c.draft.slotMinutes=60;delayed.next({...schedule,version:'99'});delayed.complete();await pending;
  expect(c.draft.slotMinutes).toBe(60);expect(c.version).not.toBe('99');expect(c.saving()).toBe(false);
 });
 it('refuses mutations after effective rights expire',async()=>{
  const fixture=await create(),c=fixture.componentInstance;
  const caps=c.capabilities()!;caps.entitlements.validUntil=new Date(Date.now()-1).toISOString();
  expect(c.canSave()).toBe(false);await c.save();expect(api.save).not.toHaveBeenCalled();
 });
 it('uses explicit zero notice and the current decimal version in real DTO shape',async()=>{
  const fixture=await create(),c=fixture.componentInstance;await c.save();
  expect(api.save).toHaveBeenCalledWith('103',expect.objectContaining({expectedVersion:'7',minNoticeMinutes:0,slotMinutes:30}));
 });
 it('does not save a stale exception date after the visible date input becomes invalid',async()=>{
  const fixture=await create(),c=fixture.componentInstance;c.addException();fixture.detectChanges();
  const input=fixture.nativeElement.querySelector('#exception-from-0') as HTMLInputElement;
  input.value='31/02/2026';input.dispatchEvent(new Event('input'));fixture.detectChanges();
  expect(c.canSave()).toBe(false);await c.save();expect(api.save).not.toHaveBeenCalled();
 });
 it('keeps edited fields after a rejected save and reload, then clears the draft on success',async()=>{
  const fixture=await create(),c=fixture.componentInstance;
  const duration=fixture.nativeElement.querySelector('#schedule-duration') as HTMLInputElement;
  duration.value='40';duration.dispatchEvent(new Event('input'));
  c.addRange(c.draft.weekly[2]);c.addException();
  c.draft.exceptions[0].from='2026-11-22';c.keepDraft();
  api.save.mockReturnValueOnce(throwError(()=>({status:400,error:{message:'Revisá las franjas'}})));
  await c.save();
  expect(api.save).toHaveBeenCalledWith('103',expect.objectContaining({
   exceptions:[expect.objectContaining({from:'2026-11-22',through:'2026-11-22',ranges:[]})],
  }));
  fixture.destroy();

  const reopened=await create(),restored=reopened.componentInstance;
  expect(restored.draft.slotMinutes).toBe(40);
  expect(restored.draft.weekly[2].ranges).toHaveLength(1);
  expect(restored.draft.exceptions[0].from).toBe('2026-11-22');
  expect(restored.draft.exceptions[0].through).toBe('');
  await restored.save();
  expect(TestBed.inject(BrowserUiStorageService).readScheduleDraft('owner','103')).toBeNull();
 });
 it('restores a stale draft only for its account and clinic and blocks overwriting a newer version',async()=>{
  const fixture=await create(),c=fixture.componentInstance;
  c.draft.slotMinutes=45;c.keepDraft();
  params.next(convertToParamMap({id:'104'}));await fixture.whenStable();
  expect(c.draft.slotMinutes).toBe(30);
  user.set({id:'other'});
  params.next(convertToParamMap({id:'103'}));await fixture.whenStable();
  expect(c.draft.slotMinutes).toBe(30);
  api.get.mockReturnValue(of({...schedule,version:'8'}));
  user.set({id:'owner'});await fixture.whenStable();
  expect(c.draft.slotMinutes).toBe(45);
  expect(c.conflict()).toBe(true);
  await c.save();expect(api.save).not.toHaveBeenCalled();
  await c.discardDraft();expect(c.draft.slotMinutes).toBe(30);expect(c.version).toBe('8');
 });

});
