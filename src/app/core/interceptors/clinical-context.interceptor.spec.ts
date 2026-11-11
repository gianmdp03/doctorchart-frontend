import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { HttpClient, HttpParams, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { clinicalContextInterceptor } from './clinical-context.interceptor';
import { authInterceptor } from './auth.interceptor';
import { timeZoneInterceptor } from './time-zone.interceptor';
import { ClinicalContextService } from '../services/clinical-context.service';
import { WorkspaceStore } from '../services/workspace.store';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

describe('Clinical request scope', () => {
  const user = signal<{id:string}|null>({id:'doctor-a'});
  let http: HttpClient;
  let mock: HttpTestingController;
  let context: ClinicalContextService;
  let loadSetup: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    user.set({id:'doctor-a'});
    loadSetup=vi.fn().mockImplementation(async()=>({specialtyContextId:101}));
    TestBed.configureTestingModule({providers:[provideHttpClient(withInterceptors([clinicalContextInterceptor,authInterceptor,timeZoneInterceptor])),provideHttpClientTesting(),
      {provide:AuthService,useValue:{currentUser:user,getAccessToken:()=> 'synthetic-token'}},{provide:WorkspaceStore,useValue:{loadSetup}}]});
    http=TestBed.inject(HttpClient);mock=TestBed.inject(HttpTestingController);context=TestBed.inject(ClinicalContextService);context.bind(101);
  });
  afterEach(()=>mock.verify());
  it('binds every clinical collection, including multipart, print and PDF requests', async()=>{
    for(const path of ['/patients','/encounters/dashboard','/patients/1/studies','/patients/1/prescriptions/2/pdf','/patients/1/prescriptions/2/print','/calculators/catalog','/medications','/vaccination-calendar','/charts','/workspace/charts']){
      const body=new FormData();body.append('name','Synthetic');
      const done=firstValueFrom(http.post(environment.apiUrl+path,body));await Promise.resolve();
      const req=mock.expectOne(r=>r.url===environment.apiUrl+path);
      expect(req.request.params.get('specialtyContextId')).toBe('101');expect(req.request.body).toBe(body);
      expect(req.request.headers.has('X-User-Id')).toBe(false);req.flush({});await done;
    }
  });
  it('does not send clinical identity to administrative or third party requests',()=>{
    for(const url of [environment.apiUrl+'/workspace',environment.apiUrl+'/clinics',environment.apiUrl+'/bookings',environment.apiUrl+'/staff',environment.apiUrl+'/public/appointments','https://example.test/patients']){
      http.get(url).subscribe();const req=mock.expectOne(r=>r.url===url);expect(req.request.params.has('specialtyContextId')).toBe(false);req.flush({});
    }
    expect(loadSetup).not.toHaveBeenCalled();
  });
  it('rejects stale responses before they can reach screen state',async()=>{
    const done=firstValueFrom(http.get(environment.apiUrl+'/patients/1'));const rejected=expect(done).rejects.toMatchObject({status:409,error:{code:'CLINICAL_CONTEXT_CHANGED'}});
    await Promise.resolve();const req=mock.expectOne(r=>r.url.endsWith('/patients/1'));
    context.bind(202);req.flush({id:1,specialtyContextId:101});await rejected;
  });
  it('rejects a scope switch while resolving setup instead of replaying the write',async()=>{
    let resolve!: (value:{specialtyContextId:number})=>void;
    loadSetup.mockReturnValue(new Promise(r=>resolve=r));
    const done=firstValueFrom(http.post(environment.apiUrl+'/patients',{values:{}}));const rejected=expect(done).rejects.toMatchObject({status:409});
    context.bind(202);resolve({specialtyContextId:202});await rejected;mock.expectNone(r=>r.url.endsWith('/patients'));
  });
  it('rejects a caller-supplied foreign context and a response after account replacement',async()=>{
    const done=firstValueFrom(http.get(environment.apiUrl+'/patients',{params:new HttpParams().set('specialtyContextId',202)}));
    await expect(done).rejects.toMatchObject({status:409});mock.expectNone(r=>r.url.endsWith('/patients'));
    const read=firstValueFrom(http.get(environment.apiUrl+'/patients/1'));const rejected=expect(read).rejects.toMatchObject({status:409});
    await Promise.resolve();const req=mock.expectOne(r=>r.url.endsWith('/patients/1'));user.set({id:'doctor-b'});req.flush({});await rejected;
  });
});
