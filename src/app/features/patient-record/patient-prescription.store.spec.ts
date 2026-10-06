import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { beforeEach, afterEach, describe, expect, it } from 'vitest';
import { PatientPrescriptionStore } from './patient-prescription.store';
import { PrescriptionRequest, SavedPrescriptionRecord } from '../../core/models/prescription.model';
import { environment } from '../../../environments/environment';

describe('PatientPrescriptionStore with real HTTP client', () => {
  let store: PatientPrescriptionStore;
  let http: HttpTestingController;
  const url = (id: number) => environment.apiUrl + '/patients/' + id + '/prescriptions';
  const draft: PrescriptionRequest = {type:'STUDY_ORDERS',diagnosisDescription:'Control',generalInstructions:'Reposo',prescriptions:[],diagnosticOrders:['ECG']};
  const record: SavedPrescriptionRecord = {...draft,id:31,patientId:10,authorUserId:'doctor-a',createdAt:'2026-10-05T14:30:00Z'};
  beforeEach(() => {
    TestBed.configureTestingModule({providers:[provideHttpClient(),provideHttpClientTesting(),PatientPrescriptionStore]});
    store=TestBed.inject(PatientPrescriptionStore); http=TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
  const load = () => { store.setPatient(10); http.expectOne(url(10)).flush([]); };

  it('loads persisted history on entering the patient and avoids duplicate initialization', () => {
    store.setPatient(10); store.setPatient(10);
    expect(store.loading()).toBe(true);
    const request=http.expectOne(url(10)); expect(request.request.method).toBe('GET'); request.flush([record]);
    expect(store.records()).toEqual([record]); expect(store.loading()).toBe(false);
  });
  it('posts only document content, then uses the returned record and reloads it in a new screen', () => {
    load(); let saved: SavedPrescriptionRecord | undefined;
    store.save(draft,value=>saved=value);
    const request=http.expectOne(url(10)); expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(draft); expect(store.records()).toEqual([]); expect(store.busy()).toBe(true);
    request.flush(record,{status:201,statusText:'Created'});
    expect(saved).toEqual(record); expect(store.records()).toEqual([record]);
    const fresh=TestBed.runInInjectionContext(()=>new PatientPrescriptionStore());
    fresh.setPatient(10); http.expectOne(url(10)).flush([record]); expect(fresh.records()).toEqual([record]);
  });
  it('does not optimistically delete persisted records and exposes backend errors', () => {
    store.setPatient(10); http.expectOne(url(10)).flush([record]);
    store.delete(31); const failed=http.expectOne(url(10)+'/31'); expect(failed.request.method).toBe('DELETE');
    expect(store.records()).toEqual([record]); failed.flush({}, {status:500,statusText:'Error'});
    expect(store.records()).toEqual([record]); expect(store.error()).toContain('No se pudo eliminar');
    store.delete(31); http.expectOne(url(10)+'/31').flush(null,{status:204,statusText:'No Content'});
    expect(store.records()).toEqual([]); expect(store.busy()).toBe(false);
  });
  it('keeps failed saves out of history, clears success, and permits retry', () => {
    load(); store.save(draft); http.expectOne(url(10)).flush({message:'Datos no válidos'}, {status:400,statusText:'Bad Request'});
    expect(store.error()).toBe('Datos no válidos'); expect(store.success()).toBeNull(); expect(store.records()).toEqual([]);
    store.save(draft); http.expectOne(url(10)).flush(record); expect(store.records()).toEqual([record]);
  });
  it('cancels an obsolete patient load and clears the previous history immediately', () => {
    store.setPatient(10); const first=http.expectOne(url(10));
    store.setPatient(20); expect(first.cancelled).toBe(true); expect(store.records()).toEqual([]);
    http.expectOne(url(20)).flush([{...record,patientId:20,id:99}]); expect(store.records()[0].patientId).toBe(20);
    store.setPatient(null); expect(store.records()).toEqual([]); expect(store.busy()).toBe(false);
  });
  it('cancels pending saves when the patient changes and never invokes the print callback', () => {
    load(); let printed=false; store.save(draft,()=>printed=true); const first=http.expectOne(url(10));
    store.setPatient(20); expect(first.cancelled).toBe(true); http.expectOne(url(20)).flush([]);
    expect(printed).toBe(false); expect(store.records()).toEqual([]); expect(store.busy()).toBe(false);
  });
  it('does not turn inaccessible or unavailable history into silently empty history', () => {
    store.setPatient(10); http.expectOne(url(10)).flush({}, {status:403,statusText:'Forbidden'});
    expect(store.loadError()).toContain('No se pudo cargar'); store.reload(); http.expectOne(url(10)).flush([record]);
    expect(store.loadError()).toBeNull(); expect(store.records()).toEqual([record]);
  });
});
