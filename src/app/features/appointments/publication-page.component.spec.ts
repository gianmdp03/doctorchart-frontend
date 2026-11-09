import {TestBed} from '@angular/core/testing';import {provideRouter} from '@angular/router';import {signal} from '@angular/core';import {of,Subject,throwError} from 'rxjs';import {PublicationPageComponent} from './publication-page.component';import {AppointmentsService} from './appointments.service';import {ClinicsService} from '../clinics/clinics.service';import {AuthService} from '../../core/services/auth.service';
describe('Private publication editor',()=>{
 let fixture:any,c:PublicationPageComponent,api:any,user:any;
 beforeEach(async()=>{user=signal({id:'owner'});api={publication:vi.fn(()=>of({version:'0',name:'Nombre público',description:'',published:false,clinics:[],questions:[]})),savePublication:vi.fn(()=>of({version:'1',publicId:'uuid',name:'Nombre público',description:'',published:false,clinics:[],questions:[]}))};await TestBed.configureTestingModule({imports:[PublicationPageComponent],providers:[provideRouter([]),{provide:AuthService,useValue:{currentUser:user}},{provide:AppointmentsService,useValue:api},{provide:ClinicsService,useValue:{listClinics:()=>of({items:[],totalElements:0})}}]}).compileComponents();fixture=TestBed.createComponent(PublicationPageComponent);c=fixture.componentInstance;fixture.detectChanges();await c.load();});afterEach(()=>fixture.destroy());
 it('preserves draft when independent commercial capability denies publishing',async()=>{c.draft.published=true;c.draft.name='Conservar';c.addQuestion();c.draft.questions[0].label='Obra social';api.savePublication.mockReturnValue(throwError(()=>({status:403,error:{code:'ONLINE_BOOKING_DISABLED',message:'No habilitado'}})));await c.save();expect(c.draft.name).toBe('Conservar');expect(c.draft.questions[0].label).toBe('Obra social');expect(c.saving()).toBe(false);});
 it('409 blocks further writes until explicitly loading the current version',async()=>{api.savePublication.mockReturnValue(throwError(()=>({status:409,error:{code:'VERSION_CONFLICT'}})));await c.save();await c.save();expect(api.savePublication).toHaveBeenCalledTimes(1);expect(c.conflict()).toBe(true);await c.load();expect(c.conflict()).toBe(false);});
 it('late saves cannot populate another doctor’s editor',async()=>{const delayed=new Subject<any>();api.savePublication.mockReturnValue(delayed);const save=c.save();api.publication.mockReturnValue(of({version:'0',name:'Otro médico',description:'',published:false,clinics:[],questions:[]}));user.set({id:'other'});fixture.detectChanges();await fixture.whenStable();delayed.next({version:'2',name:'Resultado antiguo',clinics:[],questions:[]});delayed.complete();await save;expect(c.draft.name).toBe('Otro médico');expect(c.saving()).toBe(false);});
 it('shows the patient link only for a saved public profile',async()=>{
  const published={...c.draft,version:'2',publicId:'public-id',published:true};
  c.draft.published=true;
  expect(c.publicLinkId()).toBeNull();
  api.savePublication.mockReturnValue(of(published));
  await c.save();
  expect(c.publicLinkId()).toBe('public-id');
  c.draft.published=false;
  expect(c.publicLinkId()).toBe('public-id');
  api.savePublication.mockReturnValue(of({...published,published:false}));
  await c.save();
  expect(c.publicLinkId()).toBeNull();
 });
});
