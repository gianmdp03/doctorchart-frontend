import {Component,DestroyRef,effect,inject,signal,viewChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {DatePickerComponent} from '../../shared/date-picker/date-picker.component';
import {AuthService} from '../../core/services/auth.service';
import {PatientService} from '../../core/services/patient.service';
import {PatientListDTO} from '../../core/models/patient.model';
import {ClinicsService} from '../clinics/clinics.service';
import {Clinic,ClinicCapabilities,isCapabilityVerified,parseClinicHttpError} from '../clinics/clinics.models';
import {SchedulesService} from '../schedules/schedules.service';
import {BookingsService} from './bookings.service';
import {FEATURE_FLAGS} from '../../core/config/feature-flags';
import {PublicBookingDetails} from '../appointments/appointments.models';
import {Booking,BookingEvent,BookingStatus,STATUS_LABELS,transitions,addDays,civilDate,localTime,displayDay,slotOffsetLabel} from './bookings.models';
interface Slot {clinic:Clinic;start:string;end:string;}
interface Day {date:string;bookings:Booking[];slots:Slot[];}
@Component({selector:'app-calendar-page',imports:[CommonModule,FormsModule,RouterLink,DatePickerComponent],templateUrl:'./calendar-page.component.html',styleUrl:'./calendar-page.component.css'})
export class CalendarPageComponent {
 private readonly api=inject(BookingsService);private readonly clinicsApi=inject(ClinicsService);private readonly schedules=inject(SchedulesService);private readonly patients=inject(PatientService);private readonly auth=inject(AuthService);private readonly destroy=inject(DestroyRef);
 private readonly pickers=viewChildren(DatePickerComponent);private generation=0;private editorEpoch=0;private capEpoch=0;private patientEpoch=0;private owner:string|null=null;
 private receipt:{signature:string;key:string}|null=null;private expiry:ReturnType<typeof setTimeout>|null=null;
 readonly clinics=signal<Clinic[]>([]);readonly days=signal<Day[]>([]);readonly loading=signal(false);readonly writing=signal(false);readonly detailBusy=signal(false);
 readonly capabilities=signal<ClinicCapabilities|null>(null);readonly clock=signal(Date.now());readonly error=signal('');readonly feedback=signal('');readonly editorError=signal('');readonly conflict=signal(false);
 readonly selected=signal<Booking|null>(null);readonly slot=signal<Slot|null>(null);readonly publicDetails=signal<PublicBookingDetails|null>(null);readonly events=signal<BookingEvent[]>([]);readonly editor=signal<'create'|'detail'|'move'|null>(null);
 readonly patientResults=signal<PatientListDTO[]>([]);readonly patientBusy=signal(false);readonly patientError=signal('');readonly linkedPatient=signal<PatientListDTO|null>(null);
 readonly targetSlots=signal<Slot[]>([]);readonly targetBusy=signal(false);private targetEpoch=0;
 date=civilDate(new Date().toISOString(),Intl.DateTimeFormat().resolvedOptions().timeZone);view:'day'|'week'='week';clinicId='';
 contactName='';contactPhone='';attendeeName='';differentPerson=false;patientSearch='';moveDate=this.date;moveClinic='';moveStart='';
 readonly labels=STATUS_LABELS;readonly displayDay=displayDay;readonly localTime=localTime;readonly slotOffsetLabel=slotOffsetLabel;readonly transitions=transitions;
 readonly civilDay=civilDate;
 dateToday(){return civilDate(new Date().toISOString(),Intl.DateTimeFormat().resolvedOptions().timeZone);}
 weekday(date:string){return new Intl.DateTimeFormat('es-AR',{weekday:'long',timeZone:'UTC'}).format(new Date(date+'T12:00:00Z'));}
 eventDate(instant:string){const zone=this.clinic(this.selected()?.clinicId??'')?.timezone??'UTC';return displayDay(civilDate(instant,zone))+' '+localTime(instant,zone);}
 eventLabel(kind:string){return ({CREATED:'Turno creado',STATUS_CHANGED:'Estado actualizado',RESCHEDULED:'Turno reprogramado'} as Record<string,string>)[kind]??kind;}
 draftSlots(){return this.days().flatMap(d=>d.slots);}
 chooseDraftSlot(value:string){const s=this.draftSlots().find(s=>s.clinic.id+'|'+s.start===value);if(s){this.slot.set(s);this.conflict.set(false);this.editorError.set('');this.receipt=null;}}
 refreshCreateSlot(){const current=this.slot();if(current&&this.draftSlots().some(s=>s.clinic.id===current.clinic.id&&s.start===current.start)){this.conflict.set(false);this.editorError.set('');}else this.editorError.set('El horario original ya no está libre. Seleccioná otro horario actualizado debajo.');}
 constructor(){
  effect(()=>{const owner=this.auth.currentUser()?.id??null;if(owner!==this.owner){this.owner=owner;this.generation++;this.capEpoch++;this.close();this.clinics.set([]);this.days.set([]);this.setCaps(null);if(owner)void this.load();}});
  const timer=setInterval(()=>{this.clock.set(Date.now());},1000);const refresh=setInterval(()=>{if(this.owner)void this.retryCapabilities();},30000);
  this.destroy.onDestroy(()=>{this.generation++;this.editorEpoch++;this.capEpoch++;this.targetEpoch++;clearInterval(timer);clearInterval(refresh);if(this.expiry)clearTimeout(this.expiry);});
 }
 private current(g:number,owner=this.owner){return g===this.generation&&owner===(this.auth.currentUser()?.id??null);}
 private setCaps(caps:ClinicCapabilities|null){if(this.expiry)clearTimeout(this.expiry);this.capabilities.set(caps);this.clock.set(Date.now());const remaining=Date.parse(caps?.entitlements.validUntil??'')-Date.now();if(remaining>0)this.expiry=setTimeout(()=>this.clock.set(Date.now()),Math.min(remaining+5,2147483647));}
 allowed(){this.clock();return isCapabilityVerified(this.capabilities(),Date.now());}
 canBook(){const c=this.capabilities(),max=c?.entitlements.max_clinics;return this.allowed()&&max!=null&&(max===-1||(c?.usage.counted??Infinity)<=max);}
 clinic(id:string){return this.clinics().find(c=>c.id===id);}
 time(b:Booking){return localTime(b.start,this.clinic(b.clinicId)?.timezone??'UTC');}
 private validDate(date:string){return /^\d{4}-\d{2}-\d{2}$/.test(date)&&Number.isFinite(Date.parse(date+'T12:00:00Z'))&&new Date(date+'T12:00:00Z').toISOString().slice(0,10)===date;}
 changeDate(value:string){if(!this.validDate(value))return;this.date=value;this.close();void this.load();}
 navigate(delta:number){this.changeDate(addDays(this.date,delta*(this.view==='week'?7:1)));}
 changeView(view:'day'|'week'){this.view=view;this.close();void this.load();}
 changeClinic(id:string){this.clinicId=id;this.close();void this.load();}
 async retryCapabilities(){const epoch=++this.capEpoch,owner=this.owner;try{const caps=await firstValueFrom(this.clinicsApi.getCapabilities());if(epoch===this.capEpoch&&owner===this.owner)this.setCaps(caps);}catch{if(epoch===this.capEpoch&&owner===this.owner)this.setCaps(null);}}
 async load(){
  const g=++this.generation,owner=this.owner,date=this.date,count=this.view==='week'?7:1,id=this.clinicId;
  this.loading.set(true);this.error.set('');this.days.set([]);
  try{
   const clinics:Clinic[]=[];let page=0,total=1;
   while(clinics.length<total){const next=await firstValueFrom(this.clinicsApi.listClinics({page:page++,size:100}));if(!this.current(g,owner))return;clinics.push(...next.items);total=next.totalElements;if(!next.items.length)break;}
   this.clinics.set(clinics);void this.retryCapabilities();
   const from=addDays(date,-2)+'T00:00:00Z',to=addDays(date,count+2)+'T00:00:00Z';const bookings:Booking[]=[];page=0;total=1;
   while(bookings.length<total){const next=await firstValueFrom(this.api.list(from,to,page++));if(!this.current(g,owner))return;bookings.push(...next.items);total=next.totalElements;if(!next.items.length)break;}
   const slots:Slot[]=[];const visible=clinics.filter(c=>(!id||c.id===id)&&c.status==='ACTIVE');const failures:string[]=[];
   await Promise.all(visible.map(async clinic=>{try{const result=await firstValueFrom(this.schedules.availability(clinic.id,date,count as 1|7));for(const day of result.days)for(const s of day.slots)slots.push({...s,clinic});}catch(e){failures.push(`${clinic.name}: ${parseClinicHttpError(e,'No se pudo consultar la disponibilidad.').userMessage}`);}}));
   if(!this.current(g,owner))return;
   const unique=[...new Map(bookings.map(b=>[b.id,b])).values()];
   this.days.set(Array.from({length:count},(_,i)=>{const d=addDays(date,i);return {date:d,bookings:unique.filter(b=>{const c=clinics.find(c=>c.id===b.clinicId);return c&&(!id||b.clinicId===id)&&civilDate(b.start,c.timezone)===d;}).sort((a,b)=>this.time(a).localeCompare(this.time(b))),slots:slots.filter(s=>civilDate(s.start,s.clinic.timezone)===d).sort((a,b)=>localTime(a.start,a.clinic.timezone).localeCompare(localTime(b.start,b.clinic.timezone)))};}));
   if(failures.length)this.error.set(failures.join(' · '));
  }catch(e){if(this.current(g,owner))this.error.set(parseClinicHttpError(e,'No pudimos cargar el calendario.').userMessage);}
  finally{if(this.current(g,owner))this.loading.set(false);}
 }
 close(){this.editorEpoch++;this.patientEpoch++;this.targetEpoch++;this.editor.set(null);this.selected.set(null);this.slot.set(null);this.events.set([]);this.publicDetails.set(null);this.targetSlots.set([]);this.patientResults.set([]);this.linkedPatient.set(null);this.patientError.set('');this.editorError.set('');this.conflict.set(false);this.receipt=null;this.detailBusy.set(false);this.patientBusy.set(false);this.targetBusy.set(false);}
 openSlot(slot:Slot){if(this.writing()||!this.canBook())return;this.close();this.slot.set(slot);this.contactName='';this.contactPhone='';this.attendeeName='';this.differentPerson=false;this.patientSearch='';this.editor.set('create');}
 async openBooking(b:Booking){if(this.writing())return;this.close();const e=this.editorEpoch,owner=this.owner;this.selected.set(b);this.editor.set('detail');this.detailBusy.set(true);try{const [current,events,details]=await Promise.all([firstValueFrom(this.api.get(b.id)),firstValueFrom(this.api.events(b.id)),FEATURE_FLAGS.PUBLIC_APPOINTMENTS_ENABLED?firstValueFrom(this.api.publicDetails(b.id)):Promise.resolve(null)]);if(e===this.editorEpoch&&owner===this.owner){this.selected.set(current);this.events.set(events.items);this.publicDetails.set(details);}}catch(err){if(e===this.editorEpoch&&owner===this.owner)this.editorError.set(parseClinicHttpError(err,'No pudimos cargar el turno.').userMessage);}finally{if(e===this.editorEpoch)this.detailBusy.set(false);}}
 async searchPatients(){const e=++this.patientEpoch,editor=this.editorEpoch,owner=this.owner,search=this.patientSearch.trim();this.patientResults.set([]);this.patientError.set('');if(search.length<2)return;this.patientBusy.set(true);try{const result=await firstValueFrom(this.patients.getPatients(0,10,'fullName,asc',search));if(e===this.patientEpoch&&editor===this.editorEpoch&&owner===this.owner)this.patientResults.set(result.content);}catch{if(e===this.patientEpoch&&editor===this.editorEpoch)this.patientError.set('No pudimos buscar pacientes. Podés reservar sin vincular una historia clínica.');}finally{if(e===this.patientEpoch)this.patientBusy.set(false);}}
 link(patient:PatientListDTO){if(!Number.isSafeInteger(patient.id)||patient.id<1){this.patientError.set('Este identificador no puede vincularse desde esta interfaz.');return;}this.linkedPatient.set(patient);this.patientResults.set([]);this.attendeeName=patient.fullName;this.differentPerson=true;}
 validCreate(){return !this.writing()&&this.canBook()&&!this.conflict()&&!!this.slot()&&this.contactName.trim().length>0&&this.contactName.trim().length<=160&&this.contactPhone.trim().length<=80&&(!this.differentPerson||(this.attendeeName.trim().length>0&&this.attendeeName.trim().length<=160));}
 async create(){const slot=this.slot();if(!slot||!this.validCreate())return;const body={clinicId:slot.clinic.id,start:slot.start,contactName:this.contactName.trim(),contactPhone:this.contactPhone.trim(),attendeeName:this.differentPerson?this.attendeeName.trim():this.contactName.trim(),patientId:this.linkedPatient()?String(this.linkedPatient()!.id):null};await this.write('create',body,key=>firstValueFrom(this.api.create(body,key)));}
 async status(status:BookingStatus){const b=this.selected();if(!b||this.detailBusy()||!this.allowed()||!transitions(b.status).includes(status))return;await this.write('status',{id:b.id,version:b.version,status},key=>firstValueFrom(this.api.status(b.id,b.version,status,key)));}
 async beginMove(){const b=this.selected();if(!b||b.status!=='CONFIRMED'||!this.canBook())return;this.editor.set('move');this.moveClinic=b.clinicId;this.moveDate=civilDate(b.start,this.clinic(b.clinicId)?.timezone??'UTC');this.moveStart='';await this.loadTargets();}
 async loadTargets(){const epoch=++this.targetEpoch,e=this.editorEpoch,owner=this.owner,id=this.moveClinic,date=this.moveDate;this.moveStart='';this.targetSlots.set([]);if(!this.validDate(date)||this.pickers().some(p=>p.error()))return;const clinic=this.clinic(id);if(!clinic||clinic.status!=='ACTIVE')return;this.targetBusy.set(true);try{const data=await firstValueFrom(this.schedules.availability(id,date,1));if(epoch===this.targetEpoch&&e===this.editorEpoch&&owner===this.owner)this.targetSlots.set(data.days.flatMap(d=>d.slots.map(s=>({...s,clinic}))));}catch(err){if(epoch===this.targetEpoch&&e===this.editorEpoch)this.editorError.set(parseClinicHttpError(err,'No pudimos buscar horarios.').userMessage);}finally{if(epoch===this.targetEpoch)this.targetBusy.set(false);}}
 async move(){const b=this.selected();if(!b||!this.canBook()||!this.targetSlots().some(s=>s.start===this.moveStart&&s.clinic.id===this.moveClinic))return;const body={expectedVersion:b.version,clinicId:this.moveClinic,start:this.moveStart};await this.write('move',{id:b.id,...body},key=>firstValueFrom(this.api.reschedule(b.id,body,key)));}
 private async write(kind:string,body:object,send:(key:string)=>Promise<Booking>){
  if(this.writing()||this.conflict()||!this.allowed())return;
  const signature=JSON.stringify({kind,body});if(this.receipt?.signature!==signature)this.receipt={signature,key:crypto.randomUUID()};
  const key=this.receipt.key,e=this.editorEpoch,owner=this.owner;this.writing.set(true);this.editorError.set('');this.feedback.set('');
  try{const result=await send(key);if(e!==this.editorEpoch||owner!==this.owner)return;this.receipt=null;this.feedback.set('Turno guardado. La disponibilidad se actualizó.');this.editor.set('detail');this.selected.set(result);this.events.set([]);await this.load();if(e===this.editorEpoch&&owner===this.owner){try{const events=await firstValueFrom(this.api.events(result.id));if(e===this.editorEpoch&&owner===this.owner)this.events.set(events.items);}catch{if(e===this.editorEpoch&&owner===this.owner)this.editorError.set('El turno se guardó, pero no pudimos cargar su historial. Recargá el detalle.');}}}
  catch(err){if(e!==this.editorEpoch||owner!==this.owner)return;const parsed=parseClinicHttpError(err,'No pudimos confirmar la operación. Tus datos se conservaron; podés reintentar.');const code=(err as {error?:{code?:string}})?.error?.code;const messages:Record<string,string>={BOOKING_SLOT_UNAVAILABLE:'Ese horario ya no está disponible. Actualizá y elegí otro; tus datos se conservaron.',BOOKING_STATE_CONFLICT:'El estado del turno ya no permite esta operación. Recargá el detalle.',VERSION_CONFLICT:'El turno cambió en otra sesión. Recargá el detalle antes de continuar.',IDEMPOTENCY_CONFLICT:'Este intento corresponde a otra operación. Recargá el detalle para verificar el resultado.'};this.editorError.set(messages[code??'']??parsed.userMessage);if((err as {status?:number}).status===409){this.conflict.set(true);this.receipt=null;void this.load();}if(parsed.shouldRefreshCapabilities||(err as {status?:number}).status===403){this.setCaps(null);void this.retryCapabilities();}}
  finally{this.writing.set(false);}
 }
}
