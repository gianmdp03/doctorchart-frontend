import {TestBed} from '@angular/core/testing';
import {provideHttpClient,withInterceptors} from '@angular/common/http';
import {provideHttpClientTesting,HttpTestingController} from '@angular/common/http/testing';
import {BookingsService} from './bookings.service';
import {timeZoneInterceptor} from '../../core/interceptors/time-zone.interceptor';
import {authInterceptor} from '../../core/interceptors/auth.interceptor';
import {AuthService} from '../../core/services/auth.service';
import {environment} from '../../../environments/environment';
describe('M5 bookings real HTTP transport',()=>{
 beforeEach(()=>TestBed.configureTestingModule({providers:[provideHttpClient(withInterceptors([authInterceptor,timeZoneInterceptor])),provideHttpClientTesting(),{provide:AuthService,useValue:{getAccessToken:()=> 'fixture-session'}}]}));
 afterEach(()=>TestBed.inject(HttpTestingController).verify());
 it('uses all six M4 endpoints, exact decimal strings, bearer and idempotency headers without timeZone',()=>{
  const api=TestBed.inject(BookingsService),http=TestBed.inject(HttpTestingController),id='9007199254740993',version='9007199254740995',key='m5-test-request-key';
  api.list('2030-01-01T00:00:00Z','2030-01-02T00:00:00Z').subscribe();api.get(id).subscribe();api.events(id).subscribe();api.create({clinicId:id,start:'2030-01-01T09:00:00Z',contactName:'Madre',contactPhone:'123',attendeeName:'Hijo'},key).subscribe();api.status(id,version,'CANCELLED',key).subscribe();api.reschedule(id,{expectedVersion:version,clinicId:id,start:'2030-01-01T10:00:00Z'},key).subscribe();
  const reqs=http.match(r=>r.url.startsWith(environment.apiUrl+'/bookings'));expect(reqs.length).toBe(6);
  for(const req of reqs){expect(req.request.params.has('timeZone')).toBe(false);expect(req.request.headers.get('Authorization')).toBe('Bearer fixture-session');expect(req.request.headers.has('X-User-Id')).toBe(false);if(req.request.method!=='GET')expect(req.request.headers.get('Idempotency-Key')).toBe(key);req.flush({});}
  expect(reqs[1].request.url).toContain(id);expect(reqs[4].request.body.expectedVersion).toBe(version);
 });
 it('propagates errors without mocks',()=>{let status=0;TestBed.inject(BookingsService).list('x','y').subscribe({error:e=>status=e.status});TestBed.inject(HttpTestingController).expectOne(r=>r.url.endsWith('/bookings')).flush({code:'ENTITLEMENTS_UNAVAILABLE'},{status:503,statusText:'Unavailable'});expect(status).toBe(503);});
 it('links a patient through the dedicated versioned idempotent operation',()=>{const api=TestBed.inject(BookingsService),http=TestBed.inject(HttpTestingController);api.linkPatient('9007199254740993','7','9007199254740995','patient-link-retry-key').subscribe();const req=http.expectOne(environment.apiUrl+'/bookings/9007199254740993/patient');expect(req.request.method).toBe('PUT');expect(req.request.body).toEqual({expectedVersion:'7',patientId:'9007199254740995'});expect(req.request.headers.get('Idempotency-Key')).toBe('patient-link-retry-key');expect(req.request.headers.get('Authorization')).toBe('Bearer fixture-session');req.flush({});});
});
