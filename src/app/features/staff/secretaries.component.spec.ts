import {TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController,provideHttpClientTesting} from '@angular/common/http/testing';
import {provideRouter} from '@angular/router';
import {of} from 'rxjs';
import {ClinicsService} from '../clinics/clinics.service';
import {SecretariesComponent} from './secretaries.component';

describe('Simplified secretary creation',()=>{
 beforeEach(()=>TestBed.configureTestingModule({providers:[provideHttpClient(),provideHttpClientTesting(),provideRouter([]),{provide:ClinicsService,useValue:{listClinics:()=>of({items:[{id:'1',name:'Consultorio',status:'ACTIVE'}],totalElements:1})}}]}));
 afterEach(()=>{TestBed.inject(HttpTestingController).verify();TestBed.resetTestingModule();});
 async function make(){
  const fixture=TestBed.createComponent(SecretariesComponent);const http=TestBed.inject(HttpTestingController);
  http.expectOne(r=>r.url.endsWith('/secretaries')).flush({items:[],capabilities:{manage:true,reason:null,validUntil:'2099-01-01T00:00:00Z'}});
  await fixture.whenStable();fixture.detectChanges();return {fixture,c:fixture.componentInstance,http};
 }
 it('selects the only clinic and groups booking permissions by default',async()=>{
  const {fixture,c}=await make();expect(c.clinicIds).toEqual(['1']);expect(c.permissionPreset()).toBe('manage');
  const dialog=fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
  expect(dialog.open).toBe(false);
  expect(fixture.nativeElement.querySelectorAll('input[type=checkbox]').length).toBe(1);
  c.setPermissionPreset('view');expect(c.permissions).toEqual(['view']);c.setPermissionPreset('custom');fixture.detectChanges();expect(fixture.nativeElement.querySelectorAll('input[type=checkbox]').length).toBe(5);
 });
 it('keeps email required and uses the optional shared international phone field',async()=>{
  const {fixture}=await make();const email=fixture.nativeElement.querySelector('input[name=email]') as HTMLInputElement;const phone=fixture.nativeElement.querySelector('app-phone-input[name=phone]') as HTMLElement;
  expect(email.required).toBe(true);expect(phone).not.toBeNull();expect(phone.hasAttribute('required')).toBe(false);
 });
 it('creates a private link with the token in the fragment and WhatsApp only for a phone',async()=>{
  const {fixture,c,http}=await make();c.name='Ana';c.email='ana@example.invalid';c.phone='+5491123456789';const pending=c.save();
  const req=http.expectOne(r=>r.url.endsWith('/secretaries/invitations'));expect(req.request.body.phone).toBe('+5491123456789');expect(req.request.body.email).toBe('ana@example.invalid');
  req.flush({invitationCode:'a'.repeat(43),expiresAt:'2099-01-01T00:00:00Z',emailQueued:true});await Promise.resolve();await Promise.resolve();
  http.expectOne(r=>r.url.endsWith('/secretaries')).flush({items:[],capabilities:{manage:true,validUntil:'2099-01-01T00:00:00Z'}});await pending;fixture.detectChanges();
  const invite=c.invitation()!;const url=new URL(invite.url);expect(url.pathname).toBe('/staff/activate');expect(url.search).toBe('');expect(url.hash).toBe('#invite='+'a'.repeat(43));
  const whatsapp=new URL(c.whatsappUrl(invite));expect(whatsapp.pathname).toBe('/5491123456789');expect(whatsapp.searchParams.get('text')).toContain(invite.url);expect(fixture.nativeElement.querySelector('a[href^="https://wa.me/"]')).not.toBeNull();
  expect(fixture.nativeElement.textContent).toContain('El correo quedó en cola para ana@example.invalid.');
  c.invitation.set({...invite,phone:'',emailQueued:false});fixture.detectChanges();expect(fixture.nativeElement.querySelector('a[href^="https://wa.me/"]')).toBeNull();expect(fixture.nativeElement.textContent).not.toContain('quedó en cola');
 });
});
