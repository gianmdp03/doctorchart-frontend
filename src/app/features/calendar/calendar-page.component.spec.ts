import { InteractionStatusService } from '../../core/services/interaction-status.service';
import {WorkspaceStore} from '../../core/services/workspace.store';
import {TestBed,ComponentFixture} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {signal} from '@angular/core';
import {of,Subject,throwError} from 'rxjs';
import {CalendarPageComponent} from './calendar-page.component';
import {BookingsService} from './bookings.service';
import {SchedulesService} from '../schedules/schedules.service';
import {ClinicsService} from '../clinics/clinics.service';
import {AuthService} from '../../core/services/auth.service';
import {Booking,civilDate,localTime,offsetLabel} from './bookings.models';
const clinic=(id:string,timezone='UTC')=>({id,name:'Sede '+id,timezone,status:'ACTIVE',version:'1',country:'Argentina',province:'BA',city:'Ciudad',address:'Calle',createdAt:'',updatedAt:''});
const b:Booking={id:'1',clinicId:'1',patientId:null,start:'2030-01-07T09:00:00Z',end:'2030-01-07T09:30:00Z',status:'CONFIRMED',version:'1',contactName:'Solicitante',attendeeName:'Persona atendida',contactPhone:'123',createdAt:'',updatedAt:'',specialtyContextId:'101',specialty:{id:'2',code:'general_medicine',name:'Medicina General histórica'},clinicSnapshot:{name:'Sede original',address:'Dirección original',publicAddress:'',timezone:'UTC'},provenance:{kind:'SCHEDULE_BLOCK',blockId:'51',slotMinutes:30}};
function caps(){return {entitlements:{status:'VERIFIED',revision:'r1',validUntil:new Date(Date.now()+3600000).toISOString(),clinicManagement:true,max_clinics:3},usage:{counted:2},actions:{edit:true},reason:null};}
describe('M5 calendar',()=>{
 let fixture:ComponentFixture<CalendarPageComponent>,c:CalendarPageComponent,api:any,clinics:any,schedules:any,user:ReturnType<typeof signal<any>>;
 beforeEach(async()=>{
  user=signal({id:'doctor'});api={publicDetails:vi.fn(()=>of(null)),list:vi.fn(()=>of({items:[b],totalElements:1})),get:vi.fn(()=>of(b)),events:vi.fn(()=>of({items:[]})),create:vi.fn(()=>of(b)),status:vi.fn(()=>of({...b,status:'CANCELLED',version:'2'})),reschedule:vi.fn(()=>of({...b,version:'2'}))};
  clinics={listClinics:vi.fn(()=>of({items:[clinic('1'),clinic('2')],totalElements:2})),getCapabilities:vi.fn(()=>of(caps()))};
  schedules={availability:vi.fn((id:string,from:string)=>of({clinicId:id,timezone:'UTC',days:Array.from({length:7},(_,index)=>{
   const instant=new Date(from+'T09:00:00Z');instant.setUTCDate(instant.getUTCDate()+index);
   const date=instant.toISOString().slice(0,10);
   return {date,slots:[{start:date+'T09:00:00Z',end:date+'T09:30:00Z',specialtyContextId:'101'}]};
  })}))};
  await TestBed.configureTestingModule({imports:[CalendarPageComponent],providers:[provideRouter([]),{provide:WorkspaceStore,useValue:{contexts:()=>[{id:101,ready:true,specialty:{name:'Medicina General'}}],loadContexts:async()=>[{id:101,ready:true,specialty:{name:'Medicina General'}}]}},{provide:BookingsService,useValue:api},{provide:ClinicsService,useValue:clinics},{provide:SchedulesService,useValue:schedules},{provide:AuthService,useValue:{currentUser:user}}]}).compileComponents();
  fixture=TestBed.createComponent(CalendarPageComponent);c=fixture.componentInstance;c.date='2030-01-07';fixture.detectChanges();await fixture.whenStable();await c.load();fixture.detectChanges();
 });
 afterEach(()=>{fixture.destroy();vi.useRealTimers();});
 it('loads multiple clinics and renders bookings separately from available slots',()=>{expect(c.days().length).toBe(7);expect(c.days()[0].bookings[0].id).toBe('1');expect(c.days()[0].slots.length).toBe(2);expect(fixture.nativeElement.textContent).toContain('Persona atendida');});
 it('opens the shared side panel from a free slot and keeps entered data when choosing another time',async()=>{
  const page=fixture.nativeElement as HTMLElement;
  expect(page.querySelector('.calendar-board .event')).not.toBeNull();
  expect(page.querySelector('form')).toBeNull();
  const times=page.querySelectorAll<HTMLButtonElement>('.available-slot');
  times[0].click();fixture.detectChanges();await fixture.whenStable();
  const form=page.querySelector<HTMLFormElement>('.calendar-workspace .editor form')!;
  expect(form).not.toBeNull();
  expect(document.activeElement?.id).toBe('booking-contact');
  expect(times[0].getAttribute('aria-pressed')).toBe('true');
  expect(form.textContent).not.toMatch(/vincular|ficha clínica|historia clínica/i);
  c.contactName='Nombre ingresado';
  times[1].click();fixture.detectChanges();
  expect(times[1].getAttribute('aria-pressed')).toBe('true');
  expect(page.querySelector('.editor-date')?.textContent).toContain('Sede 2');
  expect(c.contactName).toBe('Nombre ingresado');
  await c.create();
  expect(api.create.mock.calls[0][0]).not.toHaveProperty('patientId');
 });
 it('navigates Monday-to-Sunday weeks across a year boundary',()=>{
  vi.spyOn(c,'load').mockResolvedValue();
  const page=fixture.nativeElement as HTMLElement;
  const next=page.querySelector<HTMLButtonElement>('[aria-label="Semana siguiente"]')!;
  const previous=page.querySelector<HTMLButtonElement>('[aria-label="Semana anterior"]')!;
  c.changeDate('2026-01-01');expect(c.date).toBe('2025-12-29');
  expect(c.selectedDay()).toBe('2026-01-01');
  fixture.detectChanges();next.click();expect(c.date).toBe('2026-01-05');
  fixture.detectChanges();previous.click();expect(c.date).toBe('2025-12-29');
  c.writing.set(true);next.click();expect(c.date).toBe('2025-12-29');
 });
 it('opens a day from the same week grid and can return to its week',async()=>{
  const page=fixture.nativeElement as HTMLElement;
  const days=page.querySelectorAll<HTMLButtonElement>('.day-header button');
  expect(days.length).toBe(7);
  days[1].click();fixture.detectChanges();await fixture.whenStable();fixture.detectChanges();
  expect(c.date).toBe('2030-01-08');
  expect(c.selectedDay()).toBe(c.date);
  await vi.waitFor(() => expect(c.days()).toHaveLength(1));fixture.detectChanges();
  expect(page.querySelector('.timeline-grid.single-day')).not.toBeNull();
  const week=Array.from(page.querySelectorAll<HTMLButtonElement>('button')).find(button=>button.textContent.trim()==='Semana')!;
  week.click();fixture.detectChanges();await fixture.whenStable();fixture.detectChanges();
  expect(c.date).toBe('2030-01-07');
  await vi.waitFor(() => expect(c.days()).toHaveLength(7));fixture.detectChanges();
  expect(page.querySelectorAll('.day-header')).toHaveLength(7);
 });
 it('keeps opening bands and a closed day from the doctors availability',async()=>{
  c.changeClinic('1');
  schedules.availability.mockReturnValue(of({days:[
    {date:'2030-01-07',slots:[],hours:[{start:'09:00',end:'12:00'}]},
    {date:'2030-01-08',slots:[],closed:true},
  ]}));
  await c.load();fixture.detectChanges();
  expect(schedules.availability).toHaveBeenCalledWith('1','2030-01-07',7,true);
  expect(fixture.nativeElement.querySelector('.office-hours')).not.toBeNull();
  expect(fixture.nativeElement.querySelector('.day-track.closed')?.textContent).toContain('Consultorio cerrado');
 });
 it('filters teleconsultations using the booking snapshot and the active agenda modality',async()=>{
  const virtual={...clinic('2'),modality:'TELECONSULTATION'};
  clinics.listClinics.mockReturnValue(of({items:[clinic('1'),virtual],totalElements:2}));
  const online={...b,id:'2',clinicId:'2',clinicSnapshot:{...b.clinicSnapshot,modality:'TELECONSULTATION'}};
  api.list.mockReturnValue(of({items:[b,online],totalElements:2}));
  c.modalityFilter='TELECONSULTATION';
  await c.load();
  expect(c.days()[0].bookings.map(booking=>booking.id)).toEqual(['2']);
  expect(c.days()[0].slots.map(slot=>slot.clinic.id)).toEqual(['2']);
 });
 it('does not truncate paginated bookings or clinics',async()=>{clinics.listClinics.mockImplementation(({page}:any)=>of({items:[clinic(page?'2':'1')],totalElements:2}));api.list.mockImplementation((_f:any,_t:any,page:number)=>of({items:[{...b,id:String(page+1)}],totalElements:2}));await c.load();expect(c.clinics().length).toBe(2);expect(c.days()[0].bookings.length).toBe(2);});
 it('isolates late calendar responses after changing clinic',async()=>{const delayed=new Subject<any>();api.list.mockReturnValueOnce(delayed);const pending=c.load();await Promise.resolve();await Promise.resolve();c.changeClinic('2');await fixture.whenStable();delayed.next({items:[b],totalElements:1});delayed.complete();await pending;expect(c.days().every(d=>d.bookings.every(b=>b.clinicId==='2')&&d.slots.every(s=>s.clinic.id==='2'))).toBe(true);});
 it('isolates late detail responses from a different booking',async()=>{const delayed=new Subject<Booking>();api.get.mockReturnValueOnce(delayed).mockReturnValueOnce(of({...b,id:"2"}));const old=c.openBooking(b);await c.openBooking({...b,id:'2'});delayed.next(b);delayed.complete();await old;expect(c.selected()?.id).toBe('2');});
 it('blocks double submit and reuses the same key on network retry preserving fields',async()=>{c.openSlot(c.days()[0].slots[0]);c.contactName='Madre';c.differentPerson=true;c.attendeeName='Hijo';const delayed=new Subject<Booking>();api.create.mockReturnValueOnce(delayed);const pending=c.create();void c.create();expect(api.create).toHaveBeenCalledTimes(1);delayed.error({status:0});await pending;expect(TestBed.inject(InteractionStatusService).success()).toBe('');expect(c.contactName).toBe('Madre');expect(c.attendeeName).toBe('Hijo');const firstKey=api.create.mock.calls[0][1];await c.create();expect(TestBed.inject(InteractionStatusService).success()).toBe('El turno se creó correctamente.');expect(api.create.mock.calls[1][1]).toBe(firstKey);expect(api.create.mock.calls[0][0].attendeeName).toBe('Hijo');});
 it('409 preserves draft, prevents stale writes and permits an explicitly refreshed slot',async()=>{c.openSlot(c.days()[0].slots[0]);c.contactName='Conservar';api.create.mockReturnValueOnce(throwError(()=>({status:409,error:{code:'BOOKING_SLOT_UNAVAILABLE'}})));await c.create();expect(c.contactName).toBe('Conservar');expect(c.conflict()).toBe(true);await c.create();expect(api.create).toHaveBeenCalledTimes(1);await fixture.whenStable();c.refreshCreateSlot();expect(c.contactName).toBe('Conservar');expect(c.conflict()).toBe(false);});
 it('expired/revoked rights block actions, retries keep fields, downgrade permits status only',async()=>{c.openSlot(c.days()[0].slots[0]);c.contactName='Conservar';const value=caps();value.entitlements.validUntil=new Date(Date.now()-1).toISOString();c.capabilities.set(value as any);expect(c.allowed()).toBe(false);await c.create();expect(api.create).not.toHaveBeenCalled();clinics.getCapabilities.mockReturnValue(of({...caps(),entitlements:{...caps().entitlements,clinicManagement:false}}));await c.retryCapabilities();expect(c.allowed()).toBe(false);expect(c.contactName).toBe('Conservar');c.capabilities.set({...caps(),entitlements:{...caps().entitlements,max_clinics:0}} as any);expect(c.canBook()).toBe(false);expect(c.allowed()).toBe(true);});
 it('clears patient and booking data when owner changes',async()=>{await c.openBooking(b);user.set(null);fixture.detectChanges();await fixture.whenStable();expect(c.selected()).toBeNull();expect(c.days()).toEqual([]);expect(c.clinics()).toEqual([]);});
 it('shows the persisted specialty and clinic in calendar and detail',async()=>{await c.openBooking(b);fixture.detectChanges();expect(fixture.nativeElement.textContent).toContain('Medicina General histórica');expect(fixture.nativeElement.textContent).toContain('Sede original');expect(c.eventLabel('PATIENT_LINKED')).toBe('Ficha clínica vinculada');expect(c.selected()?.specialtyContextId).toBe('101');});
 it('offers the linked record in the booking context without restoring patient search',async()=>{
  for(const [patientId,specialtyContextId,href] of [
   [null,'202',null],
   ['44',undefined,null],
   ['44','202','/records/44?specialtyContextId=202'],
  ] as const){
   const booking={...b,patientId,specialtyContextId};api.get.mockReturnValueOnce(of(booking));
   await c.openBooking(booking);fixture.detectChanges();
   const detail=fixture.nativeElement.querySelector('.editor') as HTMLElement;
   expect(detail.textContent).toContain('Solicitante');
   expect(detail.textContent).not.toMatch(/vincular|ficha clínica|historia clínica/i);
   const link=detail.querySelector('a[href*="/records/"]');
   expect(link?.getAttribute('href')??null).toBe(href);
   if(href)expect(link?.textContent).toContain('Abrir ficha de Medicina General histórica');
  }
 });
 it('disambiguates DST repeated hours and groups civil dates per clinic',()=>{expect(localTime('2026-11-01T05:30:00Z','America/New_York')).toBe('01:30');expect(localTime('2026-11-01T06:30:00Z','America/New_York')).toBe('01:30');expect(offsetLabel('2026-11-01T05:30:00Z','America/New_York')).not.toBe(offsetLabel('2026-11-01T06:30:00Z','America/New_York'));expect(civilDate('2026-11-01T01:00:00Z','America/Argentina/Buenos_Aires')).toBe('2026-10-31');expect(civilDate('2026-11-01T01:00:00Z','Pacific/Auckland')).toBe('2026-11-01');});

});
