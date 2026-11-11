import {TestBed} from '@angular/core/testing';
import {Router,provideRouter} from '@angular/router';
import {ClinicalNavigationService} from './clinical-navigation.service';

describe('M6 unsaved clinical edits',()=>{
 let host:HTMLElement,navigation:ClinicalNavigationService;
 beforeEach(()=>{TestBed.configureTestingModule({providers:[provideRouter([])]});host=document.createElement('div');document.body.append(host);navigation=TestBed.inject(ClinicalNavigationService);});
 afterEach(()=>host.remove());
 function location(url:string){vi.spyOn(TestBed.inject(Router),'url','get').mockReturnValue(url);}
 function change(selector:string){host.querySelector(selector)!.dispatchEvent(new Event('input',{bubbles:true}));}
 it('protects the real routed patient form, which has no native form ancestor',()=>{
  location('/patients/new?specialtyContextId=101');host.innerHTML='<app-patient-form-page><app-dynamic-form-renderer><input id="name"></app-dynamic-form-renderer></app-patient-form-page>';
  change('#name');expect(navigation.dirty()).toBe(true);
 });
 it('does not clear an independent record draft when the encounter is saved',()=>{
  location('/records/1?specialtyContextId=101');host.innerHTML='<app-patient-record><form><input id="study"></form><app-encounter-form><input id="complaint"></app-encounter-form></app-patient-record>';
  change('#study');change('#complaint');const write=navigation.beginWrite();write.success('https://localhost/api/doctorchart/encounters');write.end();expect(navigation.dirty()).toBe(true);
 });
 it('releases saved quick notes while preserving changes typed during a request',()=>{
  location('/dashboard?specialtyContextId=101');host.innerHTML='<textarea id="notes"></textarea>';change('#notes');const write=navigation.beginWrite();change('#notes');write.success('https://localhost/api/doctorchart/workspace/quick-notes');write.end();expect(navigation.dirty()).toBe(true);
  const last=navigation.beginWrite();last.success('https://localhost/api/doctorchart/workspace/quick-notes');last.end();expect(navigation.dirty()).toBe(false);
 });
});
