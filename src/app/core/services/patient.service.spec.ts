import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { PatientService } from './patient.service';
import { environment } from '../../../environments/environment';
import { clinicalFormFixture } from '../models/clinical-form.fixture';

describe('PatientService canonical records', () => {
  let service: PatientService;
  let http: HttpTestingController;
  const record={...clinicalFormFixture(),id:1,fullName:'Ada',birthDate:'1990-01-01'};
  const base=`${environment.apiUrl}/patients`;
  beforeEach(() => {
    TestBed.configureTestingModule({providers:[provideHttpClient(),provideHttpClientTesting()]});
    service=TestBed.inject(PatientService); http=TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
  it('sends directory search, filter and pagination in one backend request',()=>{
    service.getPatients(2,20,'fullName,asc','  11555  ','INFANT').subscribe();
    const req=http.expectOne(r=>r.url===base);
    expect(req.request.params.get('page')).toBe('2');expect(req.request.params.get('size')).toBe('20');
    expect(req.request.params.get('search')).toBe('11555');expect(req.request.params.get('filter')).toBe('INFANT');
    req.flush({content:[],totalElements:0,totalPages:0});
  });
  it('creates using only workspace version and typed values', () => {
    const body={workspaceVersion:4,values:{name:'Ada',birth:'1990-01-01',arbitrary:false}};
    service.createPatient(body).subscribe(); const req=http.expectOne(base);
    expect(req.request.body).toEqual(body); expect(req.request.method).toBe('POST'); req.flush(record);
  });
  it('updates using only record version and replacement values', () => {
    const body={expectedVersion:0,values:{name:'Ada',birth:'1990-01-01',optional:null}};
    service.updatePatient(1,body).subscribe(); const req=http.expectOne(`${base}/1`);
    expect(req.request.body).toEqual(body); expect(req.request.method).toBe('PUT'); req.flush(record);
  });
});
