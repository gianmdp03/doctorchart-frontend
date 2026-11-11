import {TestBed} from '@angular/core/testing';
import {provideHttpClient,withInterceptors} from '@angular/common/http';
import {provideHttpClientTesting,HttpTestingController} from '@angular/common/http/testing';
import {provideRouter} from '@angular/router';
import {ConfirmationPageComponent} from './confirmation-page.component';
import {authInterceptor} from '../../core/interceptors/auth.interceptor';
import {timeZoneInterceptor} from '../../core/interceptors/time-zone.interceptor';
import {AuthService} from '../../core/services/auth.service';

describe('M8 private confirmation recovery',()=>{
 beforeEach(()=>TestBed.configureTestingModule({imports:[ConfirmationPageComponent],providers:[provideRouter([]),provideHttpClient(withInterceptors([authInterceptor,timeZoneInterceptor])),provideHttpClientTesting(),{provide:AuthService,useValue:{getAccessToken:()=>{throw Error('Public recovery must not read medical identity');}}}]}));
 afterEach(()=>TestBed.inject(HttpTestingController).verify());
 it('uses a body-only code with real interceptors and blocks double submission',async()=>{
  const fixture=TestBed.createComponent(ConfirmationPageComponent),c=fixture.componentInstance,http=TestBed.inject(HttpTestingController);c.accessCode='a'.repeat(43);const pending=c.consult();void c.consult();const req=http.expectOne(r=>r.url.endsWith('/public/appointments/confirmation'));expect(req.request.method).toBe('POST');expect(req.request.body).toEqual({accessCode:'a'.repeat(43)});expect(req.request.url).not.toContain(c.accessCode);expect(req.request.params.keys()).toEqual([]);expect(req.request.headers.has('Authorization')).toBe(false);expect(req.request.transferCache).toBe(false);req.flush({reference:'ref',status:'CANCELLED',start:'2030-01-01T10:00:00Z',end:'2030-01-01T10:30:00Z',doctorName:'Profesional',specialtyName:'Especialidad conservada',clinicName:'Consultorio',address:'Pública',timezone:'UTC',accessExpiresAt:'2030-01-08T10:30:00Z'});await pending;fixture.detectChanges();expect(fixture.nativeElement.textContent).toContain('Turno cancelado');expect(fixture.nativeElement.textContent).toContain('Especialidad conservada');expect(fixture.nativeElement.textContent).not.toContain('DNI del paciente');
 });
 it('retains the code after invalid/expired lookup and rate errors without fallback',async()=>{
  const c=TestBed.createComponent(ConfirmationPageComponent).componentInstance,http=TestBed.inject(HttpTestingController);c.accessCode='b'.repeat(43);for(const status of [404,429,503]){const pending=c.consult();http.expectOne(r=>r.url.endsWith('/confirmation')).flush({code:'DENIED'},{status,statusText:'Denied'});await pending;expect(c.accessCode).toBe('b'.repeat(43));expect(c.confirmation()).toBeNull();expect(c.error()).not.toBe('');}expect(c.busy()).toBe(false);
 });
 it('ignores late HTTP after navigation and removes the in-memory code',async()=>{
  const f=TestBed.createComponent(ConfirmationPageComponent),c=f.componentInstance,http=TestBed.inject(HttpTestingController);c.accessCode='c'.repeat(43);const pending=c.consult(),req=http.expectOne(r=>r.url.endsWith('/confirmation'));f.destroy();req.flush({reference:'late'});await pending;expect(c.accessCode).toBe('');expect(c.confirmation()).toBeNull();
 });
});
