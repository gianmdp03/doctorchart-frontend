import { WorkspaceStore } from '../../core/services/workspace.store';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap, Router, convertToParamMap, provideRouter } from '@angular/router';
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
 const schedule:ClinicSchedule={clinicId:'103',version:'7',configured:true,slotMinutes:30,minNoticeMinutes:0,maxAdvanceDays:30,weekly:[{weekday:1,ranges:[{id:'51',specialtyContextId:'101',slotMinutes:30,start:'09:00',end:'12:00'}]}],exceptions:[]};
 let api:{get:ReturnType<typeof vi.fn>;save:ReturnType<typeof vi.fn>;availability:ReturnType<typeof vi.fn>};
 let clinics:{getClinic:ReturnType<typeof vi.fn>;getCapabilities:ReturnType<typeof vi.fn>;listClinics:ReturnType<typeof vi.fn>};
 beforeEach(async()=>{
  user.set({id:'owner'});params=new BehaviorSubject(convertToParamMap({id:'103'}));
  api={get:vi.fn(()=>of(structuredClone(schedule))),save:vi.fn(()=>of({...schedule,version:'8'})),availability:vi.fn(()=>of({clinicId:'103',timezone:'UTC',scheduleVersion:'7',generatedAt:'2026-10-30T12:00:00Z',days:[]}))};
  clinics={getClinic:vi.fn(()=>of(structuredClone(MOCK_CLINICS_FIXTURES[0]))),getCapabilities:vi.fn(()=>of(structuredClone(MOCK_CAPABILITIES_BY_SCENARIO.VERIFIED))),listClinics:vi.fn(()=>of({items:MOCK_CLINICS_FIXTURES,page:0,size:100,totalElements:MOCK_CLINICS_FIXTURES.length}))};
  await TestBed.configureTestingModule({imports:[SchedulePageComponent],providers:[provideRouter([]),{provide:WorkspaceStore,useValue:{loadContexts:async()=>[{id:101,ready:true,specialty:{name:'Medicina General'}}]}},{provide:ActivatedRoute,useValue:{paramMap:params.asObservable()}},{provide:AuthService,useValue:{currentUser:user}},{provide:ClinicsService,useValue:clinics},{provide:SchedulesService,useValue:api}]}).compileComponents();
 });
 afterEach(()=>{
  TestBed.inject(BrowserUiStorageService).writeScheduleDraft('owner','103',null);
  TestBed.inject(BrowserUiStorageService).writeScheduleDraft('owner','104',null);
  vi.useRealTimers();
 });
 async function create(){const fixture=TestBed.createComponent(SchedulePageComponent);await fixture.whenStable();fixture.detectChanges();return fixture;}
 it('renders the selected clinic, multiple ranges and shared date pickers',async()=>{
  const fixture=await create(),c=fixture.componentInstance;
  c.selectedDays=[2,3];c.addBlocks();c.addException();fixture.detectChanges();
  expect(c.draft.weekly[1].ranges).toHaveLength(1);expect(c.draft.weekly[2].ranges).toHaveLength(1);
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
  const fixture=await create(),c=fixture.componentInstance;c.draft.weekly[0].ranges[0].slotMinutes=45;
  clinics.getCapabilities.mockReturnValueOnce(throwError(()=>({status:503,error:{code:'ENTITLEMENTS_UNAVAILABLE'}})));
  await c.retryCapabilities();expect(c.canSave()).toBe(false);expect(c.draft.weekly[0].ranges[0].slotMinutes).toBe(45);
  await c.retryCapabilities();expect(c.draft.weekly[0].ranges[0].slotMinutes).toBe(45);expect(c.canSave()).toBe(true);
 });
 it('does not apply a late save to a different selected clinic',async()=>{
  const fixture=await create(),c=fixture.componentInstance,delayed=new Subject<ClinicSchedule>();
  api.save.mockReturnValueOnce(delayed);const pending=c.save();
  params.next(convertToParamMap({id:'104'}));await fixture.whenStable();
  c.draft.weekly[0].ranges[0].slotMinutes=60;delayed.next({...schedule,version:'99'});delayed.complete();await pending;
  expect(c.draft.weekly[0].ranges[0].slotMinutes).toBe(60);expect(c.version).not.toBe('99');expect(c.saving()).toBe(false);
 });
 it('refuses mutations after effective rights expire',async()=>{
  const fixture=await create(),c=fixture.componentInstance;
  const caps=c.capabilities()!;caps.entitlements.validUntil=new Date(Date.now()-1).toISOString();
  expect(c.canSave()).toBe(false);await c.save();expect(api.save).not.toHaveBeenCalled();
 });
 it('uses explicit zero notice and the current decimal version in real DTO shape',async()=>{
  const fixture=await create(),c=fixture.componentInstance;await c.save();
  expect(api.save).toHaveBeenCalledWith('103',expect.objectContaining({expectedVersion:'7',minNoticeMinutes:0,weekly:expect.arrayContaining([expect.objectContaining({weekday:1,ranges:[expect.objectContaining({id:'51',specialtyContextId:'101',slotMinutes:30})]})])}));
 });
 it('does not save a stale exception date after the visible date input becomes invalid',async()=>{
  const fixture=await create(),c=fixture.componentInstance;c.addException();fixture.detectChanges();
  const input=fixture.nativeElement.querySelector('#exception-from-0') as HTMLInputElement;
  input.value='31/02/2026';input.dispatchEvent(new Event('input'));fixture.detectChanges();
  expect(c.canSave()).toBe(false);await c.save();expect(api.save).not.toHaveBeenCalled();
 });
 it('keeps edited fields after a rejected save and reload, then clears the draft on success',async()=>{
  const fixture=await create(),c=fixture.componentInstance;
  const duration=fixture.nativeElement.querySelector('.block-card input[type=number]') as HTMLInputElement;
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
  expect(restored.draft.weekly[0].ranges[0].slotMinutes).toBe(40);
  expect(restored.draft.weekly[2].ranges).toHaveLength(1);
  expect(restored.draft.exceptions[0].from).toBe('2026-11-22');
  expect(restored.draft.exceptions[0].through).toBe('');
  await restored.save();
  expect(TestBed.inject(BrowserUiStorageService).readScheduleDraft('owner','103')).toBeNull();
 });
 it('restores a stale draft only for its account and clinic and blocks overwriting a newer version',async()=>{
  const fixture=await create(),c=fixture.componentInstance;
  c.draft.weekly[0].ranges[0].slotMinutes=45;c.keepDraft();
  params.next(convertToParamMap({id:'104'}));await fixture.whenStable();
  expect(c.draft.weekly[0].ranges[0].slotMinutes).toBe(30);
  user.set({id:'other'});
  params.next(convertToParamMap({id:'103'}));await fixture.whenStable();
  expect(c.draft.weekly[0].ranges[0].slotMinutes).toBe(30);
  api.get.mockReturnValue(of({...schedule,version:'8'}));
  user.set({id:'owner'});await fixture.whenStable();
  expect(c.draft.weekly[0].ranges[0].slotMinutes).toBe(45);
  expect(c.conflict()).toBe(true);
  await c.save();expect(api.save).not.toHaveBeenCalled();
  await c.discardDraft();expect(c.draft.weekly[0].ranges[0].slotMinutes).toBe(30);expect(c.version).toBe('8');
 });

 it('creates several days atomically with context and duration, then preserves identities when editing',async()=>{
  const fixture=await create(),c=fixture.componentInstance;
  c.selectedDays=[2,4,5];c.blockStart='14:00';c.blockEnd='16:00';c.blockMinutes=25;c.addBlocks();
  for(const day of [2,4,5])expect(c.draft.weekly[day-1].ranges).toEqual([{start:'14:00',end:'16:00',slotMinutes:25,specialtyContextId:'101'}]);
  c.draft.weekly[0].ranges[0].slotMinutes=20;await c.save();
  const sent=api.save.mock.calls[0][1];expect(sent.slotMinutes).toBeUndefined();
  expect(sent.weekly[0].ranges[0]).toMatchObject({id:'51',specialtyContextId:'101',slotMinutes:20});
  expect(sent.weekly[3].ranges[0].slotMinutes).toBe(25);
 });
 it('rejects overlapping, invalid and incomplete composer entries without partial insertion',async()=>{
  const fixture=await create(),c=fixture.componentInstance;
  c.selectedDays=[1,2];c.blockStart='10:00';c.blockEnd='11:00';c.addBlocks();
  expect(c.draft.weekly[1].ranges).toEqual([]);expect(c.blockError()).toContain('superponen');
  c.selectedDays=[2];c.blockEnd='09:00';c.addBlocks();expect(c.draft.weekly[1].ranges).toEqual([]);
  c.blockEnd='12:00';c.blockMinutes=0;c.addBlocks();expect(c.blockError()).toContain('duración');
  c.draft.weekly[0].ranges[0].slotMinutes=0;expect(c.canSave()).toBe(false);
 });
 it('autoselects a single clinic and specialty without redundant choices',async()=>{
  params.next(convertToParamMap({}));
  clinics.listClinics.mockReturnValue(of({items:[MOCK_CLINICS_FIXTURES[0]],page:0,size:100,totalElements:1}));
  const navigate=vi.spyOn(TestBed.inject(Router),'navigate').mockResolvedValue(true);
  await create();expect(navigate).toHaveBeenCalledWith(['/clinics','103','schedule']);
  params.next(convertToParamMap({id:'103'}));
  const fixture=await create();expect(fixture.componentInstance.specialty()).toEqual({id:'101',name:'Medicina General'});
  expect(fixture.nativeElement.querySelector('.selected-clinic select')).toBeNull();
 });
 it('removes a block, keeps exception durations, and uses backend preview results',async()=>{
  const fixture=await create(),c=fixture.componentInstance;c.removeRange(c.draft.weekly[0],0);c.addException();
  c.draft.exceptions[0].from='2027-01-03';c.addRange(c.draft.exceptions[0]);c.draft.exceptions[0].ranges[0].slotMinutes=40;
  await c.save();expect(api.save.mock.calls[0][1].weekly[0].ranges).toEqual([]);
  expect(api.save.mock.calls[0][1].exceptions[0].ranges[0]).toMatchObject({slotMinutes:40,specialtyContextId:'101'});
  api.availability.mockReturnValue(of({clinicId:'103',timezone:'UTC',scheduleVersion:'8',generatedAt:'2027-01-01T00:00Z',days:[{date:'2027-01-03',slots:[{start:'2027-01-03T09:00Z',end:'2027-01-03T09:40Z'}]}]}));
  c.previewDate='2027-01-03';await c.preview();fixture.detectChanges();expect(fixture.nativeElement.textContent).toContain('09:00–09:40');
 });


 it('composes and saves blocks from both ready specialties without accepting a pending context',async()=>{
   const workspace=TestBed.inject(WorkspaceStore);workspace.loadContexts=async()=>[{id:101,ready:true,specialty:{name:'Medicina General'}},{id:202,ready:true,specialty:{name:'Dermatología'}},{id:303,ready:false,specialty:{name:'Pediatría'}}] as any;
   const fixture=await create(),c=fixture.componentInstance;expect(c.readySpecialties().map(s=>s.id)).toEqual(['101','202']);expect(c.specialty()).toBeNull();
   c.chooseSpecialty('202');c.selectedDays=[2];c.blockStart='10:00';c.blockEnd='12:00';c.blockMinutes=20;c.addBlocks();expect(c.draft.weekly[0].ranges[0].specialtyContextId).toBe('101');expect(c.draft.weekly[1].ranges[0].specialtyContextId).toBe('202');expect(c.canSave()).toBe(true);await c.save();expect(api.save).toHaveBeenCalledWith('103',expect.objectContaining({weekly:expect.arrayContaining([expect.objectContaining({weekday:2,ranges:[expect.objectContaining({specialtyContextId:'202',slotMinutes:20})]})])}));
   c.chooseSpecialty('303');expect(c.specialty()).toBeNull();
 });
});
