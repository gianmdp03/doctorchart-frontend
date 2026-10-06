import { signal } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivePatientService } from './active-patient.service';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ClinicalEncounterService } from './clinical-encounter.service';
import { environment } from '../../../environments/environment';
import { ClinicalEncounterDetail, ClinicalEncounterRequest, ClinicalEncounterUpdateRequest } from '../models/clinical-encounter.model';
import { clinicalFormFixture } from '../models/clinical-form.fixture';

describe('ClinicalEncounterService canonical records', () => {
  let service: ClinicalEncounterService;
  let http: HttpTestingController;
  const record: ClinicalEncounterDetail = {
    ...clinicalFormFixture(), id: 10, patientId: 1, patientFullName: 'Ada',
    encounterDate: '2026-09-17T20:00:00-03:00', consultationType: 'FIRST_VISIT',
    specialtyId: 7, specialty: {id:7,code:'custom_xyz',name:'Especialidad XYZ',description:null},
  };
  const base = `${environment.apiUrl}/encounters`;
  beforeEach(() => {
    TestBed.configureTestingModule({providers:[{provide:AuthService,useValue:{currentUser:signal({id:'doctor-a'})}},{provide:ActivePatientService,useValue:{patientId:signal<number|null>(1)}},provideHttpClient(),provideHttpClientTesting()]});
    service = TestBed.inject(ClinicalEncounterService); http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
  it('reads and filters using catalog identities', () => {
    service.getById(10).subscribe(value => expect(value.specialty.name).toBe('Especialidad XYZ'));
    http.expectOne(`${base}/10`).flush(record);
    service.getByPatientAndSpecialty(1,7).subscribe();
    http.expectOne(`${base}/patient/1/specialty/7`).flush([record]);
    expect(service.encounters()).toEqual([record]);
  });
  it('sends only versioned input values on create', () => {
    const request: ClinicalEncounterRequest = {patientId:1,workspaceVersion:4,encounterDate:record.encounterDate,consultationType:'FIRST_VISIT',values:{arbitrary:0,flag:false}};
    service.create(request).subscribe();
    const pending=http.expectOne(base); expect(pending.request.method).toBe('POST'); expect(pending.request.body).toEqual(request);
    pending.flush(record); expect(service.currentEncounter()).toEqual(record);
  });
  it('updates with the record version independently of the workspace', () => {
    const request: ClinicalEncounterUpdateRequest = {expectedVersion:0,encounterDate:record.encounterDate,consultationType:'FOLLOW_UP',values:{arbitrary:null}};
    service.update(10,request).subscribe();
    const pending=http.expectOne(`${base}/10`); expect(pending.request.method).toBe('PUT'); expect(pending.request.body).toEqual(request); pending.flush(record);
  });
  it('evicts deleted records', () => {
    service.encounters.set([record]); service.currentEncounter.set(record);
    service.delete(10).subscribe(); http.expectOne(`${base}/10`).flush(null);
    expect(service.encounters()).toEqual([]); expect(service.currentEncounter()).toBeNull();
  });
  it('does not restore a record or loading state after an identity clear', () => {
    service.getById(10).subscribe(); const pending=http.expectOne(`${base}/10`);
    service.clear(); pending.flush(record);
    expect(service.currentEncounter()).toBeNull(); expect(service.loading()).toBe(false);
  });

  it('keeps the last opened encounter when earlier reads arrive later', () => {
    service.getById(10).subscribe(); const old=http.expectOne(base+'/10');
    service.getById(20).subscribe(); const current=http.expectOne(base+'/20');
    current.flush({...record,id:20}); old.flush(record);
    expect(service.currentEncounter()?.id).toBe(20);
  });
  it('does not let older list errors stop a newer patient request', () => {
    service.getByPatient(1).subscribe({error:()=>{}}); const old=http.expectOne(base+'/patient/1');
    service.getByPatient(2).subscribe(); const current=http.expectOne(base+'/patient/2');
    old.flush({}, {status:500,statusText:'Error'}); expect(service.loading()).toBe(true);
    current.flush([{...record,patientId:2}]); expect(service.encounters()[0].patientId).toBe(2);
  });
  it('ignores a response across patient or account switches before effects run', () => {
    service.getById(10).subscribe(); const pending=http.expectOne(base+'/10');
    (TestBed.inject(ActivePatientService).patientId as any).set(2); pending.flush(record);
    expect(service.currentEncounter()).toBeNull(); TestBed.tick();
    service.getById(10).subscribe(); const second=http.expectOne(base+'/10');
    TestBed.inject(AuthService).currentUser.set({id:'doctor-b'} as any); second.flush(record);
    expect(service.currentEncounter()).toBeNull(); TestBed.tick(); expect(service.loading()).toBe(false);
  });

});