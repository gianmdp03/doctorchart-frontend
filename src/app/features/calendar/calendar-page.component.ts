import { InteractionStatusService } from '../../core/services/interaction-status.service';
import {afterNextRender,Component,DOCUMENT,DestroyRef,ElementRef,Injector,computed,effect,inject,signal,viewChild,viewChildren} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {lucideBuilding2, lucideCalendarDays, lucideCheck, lucideCircleCheck, lucideCircleMinus, lucideLogIn, lucideRefreshCw, lucideSlidersHorizontal, lucideX} from '@ng-icons/lucide';
import {AGENDA_STATUS_ICONS, AgendaComponent, AgendaView} from './agenda.component';
import {AgendaDay, monday} from './agenda-timeline';
import {firstValueFrom} from 'rxjs';
import {DatePickerComponent} from '../../shared/date-picker/date-picker.component';
import {AuthService} from '../../core/services/auth.service';
import {WorkspaceStore} from '../../core/services/workspace.store';
import {ClinicsService} from '../clinics/clinics.service';
import {AppointmentModality,Clinic,ClinicCapabilities,isCapabilityVerified,modalityLabel,parseClinicHttpError} from '../clinics/clinics.models';
import {SchedulesService} from '../schedules/schedules.service';
import {BookingsService} from './bookings.service';
import {FEATURE_FLAGS} from '../../core/config/feature-flags';
import {PublicBookingDetails} from '../appointments/appointments.models';
import {BOOKING_SUCCESS_MESSAGES,Booking,BookingEvent,BookingStatus,STATUS_LABELS,transitions,addDays,civilDate,localTime,displayDay,slotOffsetLabel} from './bookings.models';
interface Slot {clinic:Clinic;start:string;end:string;specialtyContextId?:string;}
interface Day extends AgendaDay<Slot> { bookings: Booking[]; }
@Component({
  selector: 'app-calendar-page',
  imports: [AgendaComponent, FormsModule, RouterLink, DatePickerComponent, NgIcon],
  providers: [provideIcons({lucideBuilding2, lucideCalendarDays, lucideCheck, lucideCircleCheck,
    lucideCircleMinus, lucideLogIn, lucideRefreshCw, lucideSlidersHorizontal, lucideX})],
  templateUrl: './calendar-page.component.html',
  styleUrls: ['../staff/staff.css', './agenda-page.css', './calendar-page.component.css'],
})
export class CalendarPageComponent {
  private readonly interaction = inject(InteractionStatusService);
 readonly workspace=inject(WorkspaceStore);
 private readonly api=inject(BookingsService);private readonly clinicsApi=inject(ClinicsService);private readonly schedules=inject(SchedulesService);private readonly auth=inject(AuthService);private readonly destroy=inject(DestroyRef);
 private readonly injector=inject(Injector);
 private readonly contactInput=viewChild<ElementRef<HTMLInputElement>>('contactInput');
 private readonly agenda = viewChild(AgendaComponent);
 private editorTrigger: HTMLElement | null = null;
 private readonly detailHeading=viewChild<ElementRef<HTMLElement>>('detailHeading');
 private readonly pickers=viewChildren(DatePickerComponent);private generation=0;private editorEpoch=0;private capEpoch=0;private owner:string|null=null;
 private receipt:{signature:string;key:string}|null=null;private expiry:ReturnType<typeof setTimeout>|null=null;
 readonly clinics=signal<Clinic[]>([]);readonly days=signal<Day[]>([]);readonly loading=signal(false);readonly writing=signal(false);readonly detailBusy=signal(false);
 readonly view = signal<AgendaView>(
  inject(DOCUMENT).defaultView?.matchMedia?.('(max-width: 640px)').matches ? '1' : '7',
 );
 readonly selectedDay = signal(this.dateToday());
 readonly filtersOpen = signal(false);
 readonly agendaBookings = computed(() => this.days().flatMap(day => day.bookings));
 readonly statusIcons = AGENDA_STATUS_ICONS;
 readonly actionLabels: Partial<Record<BookingStatus, string>> = {
  CHECKED_IN: 'Registrar llegada', COMPLETED: 'Marcar como atendido',
  NO_SHOW: 'Marcar como ausente', CANCELLED: 'Cancelar turno',
 };
 activeFilterCount() { return [this.contextFilter, this.statusFilter, this.modalityFilter].filter(Boolean).length; }
 readonly slotContext = (slot: Slot) => [this.clinicId ? '' : slot.clinic.name, this.slotSpecialty(slot)].filter(Boolean).join(' · ');
 readonly bookingContext = (booking: Booking) => this.clinicId ? '' : this.bookingClinic(booking);
 readonly allowSlot = (slot: Slot) =>
  this.canBook(slot.clinic) && (this.editor() !== 'move'
    || (!this.conflict() && slot.specialtyContextId === this.selected()?.specialtyContextId));
 readonly selectedSlot = (slot: Slot) =>
  this.editor() === 'move' ? slot.clinic.id === this.moveClinic && slot.start === this.moveStart : this.isSelectedSlot(slot);
 readonly capabilities=signal<ClinicCapabilities|null>(null);readonly clock=signal(Date.now());readonly error=signal('');readonly editorError=signal('');readonly conflict=signal(false);
 readonly selected=signal<Booking|null>(null);readonly slot=signal<Slot|null>(null);readonly publicDetails=signal<PublicBookingDetails|null>(null);readonly events=signal<BookingEvent[]>([]);readonly editor=signal<'create'|'detail'|'move'|null>(null);
 readonly targetSlots=signal<Slot[]>([]);readonly targetBusy=signal(false);private targetEpoch=0;
 contextFilter='';statusFilter='';modalityFilter:AppointmentModality|''='';
 date=this.view()==='7'?monday(this.selectedDay()):this.selectedDay();clinicId='';
 contactName='';contactPhone='';attendeeName='';differentPerson=false;moveDate=this.date;moveClinic='';moveStart='';
 readonly statuses:BookingStatus[]=Object.keys(STATUS_LABELS) as BookingStatus[];
 readonly labels=STATUS_LABELS;readonly displayDay=displayDay;readonly localTime=localTime;readonly slotOffsetLabel=slotOffsetLabel;readonly transitions=transitions;
 readonly civilDay=civilDate;readonly modalityLabel=modalityLabel;
 private readonly deviceZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
 get calendarZone() {
  const clinics = this.clinics();
  return this.clinic(this.clinicId)?.timezone ?? (clinics.length === 1 ? clinics[0].timezone : this.deviceZone);
 }
 dateToday(){return civilDate(new Date().toISOString(), Intl.DateTimeFormat().resolvedOptions().timeZone);}
 eventDate(instant:string){const zone=this.selected()?this.bookingZone(this.selected()!):'UTC';return displayDay(civilDate(instant,zone))+' '+localTime(instant,zone);}
 eventLabel(kind:string){return ({CREATED:'Turno creado',STATUS_CHANGED:'Estado actualizado',RESCHEDULED:'Turno reprogramado',PATIENT_LINKED:'Ficha clínica vinculada'} as Record<string,string>)[kind]??kind;}
 draftSlots(){return this.days().flatMap(d=>d.slots);}
 chooseDraftSlot(value:string){const s=this.draftSlots().find(s=>s.clinic.id+'|'+s.start===value);if(s)this.openSlot(s);}
 refreshCreateSlot(){const current=this.slot();if(current&&this.draftSlots().some(s=>s.clinic.id===current.clinic.id&&s.start===current.start)){this.conflict.set(false);this.editorError.set('');}else this.editorError.set('El horario original ya no está libre. Seleccioná otro horario actualizado debajo.');}
 constructor(){
  effect(()=>{const owner=this.auth.currentUser()?.id??null;if(owner!==this.owner){this.owner=owner;this.generation++;this.capEpoch++;this.close();this.clinics.set([]);this.days.set([]);this.setCaps(null);if(owner)void this.load();}});
  const timer=setInterval(()=>{this.clock.set(Date.now());},1000);const refresh=setInterval(()=>{if(this.owner)void this.retryCapabilities();},30000);
  this.destroy.onDestroy(()=>{this.generation++;this.editorEpoch++;this.capEpoch++;this.targetEpoch++;clearInterval(timer);clearInterval(refresh);if(this.expiry)clearTimeout(this.expiry);});
 }
 private current(g:number,owner=this.owner){return g===this.generation&&owner===(this.auth.currentUser()?.id??null);}
 private setCaps(caps:ClinicCapabilities|null){if(this.expiry)clearTimeout(this.expiry);this.capabilities.set(caps);this.clock.set(Date.now());const remaining=Date.parse(caps?.entitlements.validUntil??'')-Date.now();if(remaining>0)this.expiry=setTimeout(()=>this.clock.set(Date.now()),Math.min(remaining+5,2147483647));}
 allowed(){this.clock();return isCapabilityVerified(this.capabilities(),Date.now());}
 canBook(clinic?:Clinic){const c=this.capabilities(),max=c?.entitlements.max_clinics;return this.allowed()&&(clinic?.modality==='TELECONSULTATION'||max!=null&&(max===-1||(c?.usage.counted??Infinity)<=max));}
 canReschedule(){return this.clinics().some(c=>c.status==='ACTIVE'&&this.canBook(c));}
 clinic(id:string){return this.clinics().find(c=>c.id===id);}
 bookingZone(b:Booking){return b.clinicSnapshot?.timezone||this.clinic(b.clinicId)?.timezone||'UTC';}
 bookingClinic(b:Booking){return b.clinicSnapshot?.name||this.clinic(b.clinicId)?.name||'Consultorio';}
 bookingModality(b:Booking){return b.clinicSnapshot?.modality??this.clinic(b.clinicId)?.modality??'IN_PERSON';}
 specialtyName(b:Booking){return b.specialty?.name||'Especialidad sin registro histórico';}
 time(b:Booking){return localTime(b.start,this.bookingZone(b));}
 private validDate(date:string){return /^\d{4}-\d{2}-\d{2}$/.test(date)&&Number.isFinite(Date.parse(date+'T12:00:00Z'))&&new Date(date+'T12:00:00Z').toISOString().slice(0,10)===date;}
 changeDate(value: string) {
  if (!this.validDate(value) || this.writing() || value === this.selectedDay()) return;
  const rangeStart = this.view() === '7' ? monday(value) : value;
  this.selectedDay.set(value);
  if (rangeStart === this.date) return;
  this.date = rangeStart;
  if (this.editor() !== 'move') this.close();
  void this.load();
 }
 changeView(view: AgendaView, date = this.selectedDay()) {
  if (this.writing() || view === this.view()) return;
  this.view.set(view);
  this.selectedDay.set(date);
  this.date = view === '7' ? monday(date) : date;
  if (this.editor() !== 'move') this.close();
  void this.load();
 }
 changeClinic(id: string) {
  if (this.writing()) return;
  this.clinicId = id;
  if (this.editor() !== 'move') this.close();
  void this.load();
 }
 async retryCapabilities(){const epoch=++this.capEpoch,owner=this.owner;try{const caps=await firstValueFrom(this.clinicsApi.getCapabilities());if(epoch===this.capEpoch&&owner===this.owner)this.setCaps(caps);}catch{if(epoch===this.capEpoch&&owner===this.owner)this.setCaps(null);}}
 changeFilters(){if(this.writing())return;if(this.editor()!=='move')this.close();void this.load();}
 slotSpecialty(slot:Slot){return this.workspace.contexts().find(c=>String(c.id)===slot.specialtyContextId)?.specialty.name??'Especialidad';}
 async load(){
  const g=++this.generation,owner=this.owner,date=this.date,count=Number(this.view()),id=this.clinicId;
  if (this.selectedDay() < date || this.selectedDay() >= addDays(date, count)) this.selectedDay.set(date);
  this.loading.set(true);this.error.set('');this.days.set([]);
  try{
   await this.workspace.loadContexts();const clinics:Clinic[]=[];let page=0,total=1;
   while(clinics.length<total){const next=await firstValueFrom(this.clinicsApi.listClinics({page:page++,size:100}));if(!this.current(g,owner))return;clinics.push(...next.items);total=next.totalElements;if(!next.items.length)break;}
   this.clinics.set(clinics);void this.retryCapabilities();
   const from=addDays(date,-2)+'T00:00:00Z',to=addDays(date,count+2)+'T00:00:00Z';const bookings:Booking[]=[];page=0;total=1;
   while(bookings.length<total){const next=await firstValueFrom(this.api.list(from,to,page++));if(!this.current(g,owner))return;bookings.push(...next.items);total=next.totalElements;if(!next.items.length)break;}
   const slots: Slot[] = [];
   const hoursByDate = new Map<string, Map<string, string>>();
   const closedClinicsByDate = new Map<string, Set<string>>();
   const zone = this.calendarZone;
   const visible = clinics.filter(c => (!id || c.id === id) && c.status === 'ACTIVE'
    && (!this.modalityFilter || (c.modality ?? 'IN_PERSON') === this.modalityFilter));
   const failures: string[] = [];
   await Promise.all(visible.map(async clinic => {
    try {
     const dates = clinic.timezone === zone ? [date] : [addDays(date, -2), addDays(date, 5)];
     const results = await Promise.all(dates.map(day => this.agendaAvailability(clinic.id, day, count === 1 && clinic.timezone === zone ? 1 : 7)));
     for (const result of results) for (const day of result.days) {
      for (const slot of day.slots) slots.push({...slot, clinic});
      if (clinic.timezone !== zone) continue;
      const hours = hoursByDate.get(day.date) ?? new Map<string, string>();
      for (const hour of day.hours ?? []) {
       if ((hours.get(hour.start) ?? '') < hour.end) hours.set(hour.start, hour.end);
      }
      hoursByDate.set(day.date, hours);
      if (day.closed) {
       const closed = closedClinicsByDate.get(day.date) ?? new Set<string>();
       closed.add(clinic.id);
       closedClinicsByDate.set(day.date, closed);
      }
     }
    } catch(e) {
     failures.push(clinic.name + ': ' + parseClinicHttpError(e, 'No se pudo consultar la disponibilidad.').userMessage);
    }
   }));
   if (!this.current(g,owner)) return;
   const unique = [...new Map(bookings.map(b => [b.id,b])).values()];
   const visibleSlots = [...new Map(slots.map(slot => [slot.clinic.id + '|' + slot.start, slot])).values()];
   this.days.set(Array.from({length:count}, (_, i) => {
    const day = addDays(date,i);
    return {
     date: day,
     bookings: unique.filter(b => (!this.contextFilter || b.specialtyContextId === this.contextFilter)
      && (!this.statusFilter || b.status === this.statusFilter) && (!id || b.clinicId === id)
      && (!this.modalityFilter || this.bookingModality(b) === this.modalityFilter) && civilDate(b.start, zone) === day)
      .sort((a,b) => Date.parse(a.start) - Date.parse(b.start)),
     slots: visibleSlots.filter(slot => (!this.contextFilter || slot.specialtyContextId === this.contextFilter)
      && civilDate(slot.start, zone) === day).sort((a,b) => Date.parse(a.start) - Date.parse(b.start)),
     hours: [...(hoursByDate.get(day) ?? [])].map(([start, end]) => ({start, end})),
     closed: visible.length > 0 && closedClinicsByDate.get(day)?.size === visible.length,
    };
   }));
   if(failures.length)this.error.set(failures.join(' · '));
  }catch(e){if(this.current(g,owner))this.error.set(parseClinicHttpError(e,'No pudimos cargar el calendario.').userMessage);}
  finally{if(this.current(g,owner))this.loading.set(false);}
 }
 private async agendaAvailability(id: string, date: string, days: 1 | 7) {
  try {
   return await firstValueFrom(this.schedules.availability(id, date, days, true));
  } catch (error) {
   const response = error as {status?: number; error?: {code?: string; message?: string}};
   if (response?.status !== 400 || response.error?.code !== 'INVALID_REQUEST'
    || response.error.message !== 'Parámetros de disponibilidad inválidos.') throw error;
   return await firstValueFrom(this.schedules.availability(id, date, days));
  }
 }
 dismissEditor() {
  if (this.writing()) return;
  const trigger = this.editorTrigger;
  this.close();
  afterNextRender(() => {
   if (trigger?.isConnected) trigger.focus();
   else this.agenda()?.focusBoard();
  }, {injector:this.injector});
 }
 close(){this.editorTrigger=null;this.editorEpoch++;this.targetEpoch++;this.editor.set(null);this.selected.set(null);this.slot.set(null);this.events.set([]);this.publicDetails.set(null);this.targetSlots.set([]);this.editorError.set('');this.conflict.set(false);this.receipt=null;this.detailBusy.set(false);this.targetBusy.set(false);this.contactName='';this.contactPhone='';this.attendeeName='';this.differentPerson=false;}
 private focusAfterRender(target:()=>ElementRef<HTMLElement>|undefined){
  afterNextRender(()=>target()?.nativeElement.focus(),{injector:this.injector});
 }
 cancelCreate(){this.dismissEditor();}
 chooseSlot(slot: Slot, trigger: EventTarget | null) {
  if (!this.allowSlot(slot) || this.writing()) return;
  if (this.editor() === 'move') {
   this.targetEpoch++;
   this.targetBusy.set(false);
   this.moveClinic = slot.clinic.id;
   this.moveDate = civilDate(slot.start, slot.clinic.timezone);
   this.moveStart = slot.start;
   this.targetSlots.set(this.draftSlots().filter(candidate => candidate.clinic.id === slot.clinic.id
    && candidate.specialtyContextId === this.selected()?.specialtyContextId
    && civilDate(candidate.start, slot.clinic.timezone) === this.moveDate));
   return;
  }
  this.openSlot(slot, trigger);
 }
 isSelectedSlot(slot:Slot){const current=this.slot();return this.editor()==='create'&&current?.clinic.id===slot.clinic.id&&current.start===slot.start;}
 openSlot(slot:Slot, trigger?: EventTarget | null){
  if(this.writing()||!this.canBook(slot.clinic))return;
  if(this.editor()!=='create')this.close();
  else if(!this.isSelectedSlot(slot)||this.conflict()){
   this.conflict.set(false);this.editorError.set('');this.receipt=null;
  }
  if(trigger instanceof HTMLElement)this.editorTrigger=trigger;
  this.slot.set(slot);this.editor.set('create');this.focusAfterRender(this.contactInput);
 }
 async openBooking(b:Booking,trigger?:EventTarget|null){if(this.writing())return;const origin=trigger??this.editorTrigger;this.close();if(origin instanceof HTMLElement)this.editorTrigger=origin;const e=this.editorEpoch,owner=this.owner;this.selected.set(b);this.editor.set('detail');this.detailBusy.set(true);this.focusAfterRender(this.detailHeading);try{const [current,events,details]=await Promise.all([firstValueFrom(this.api.get(b.id)),firstValueFrom(this.api.events(b.id)),FEATURE_FLAGS.PUBLIC_APPOINTMENTS_ENABLED?firstValueFrom(this.api.publicDetails(b.id)):Promise.resolve(null)]);if(e===this.editorEpoch&&owner===this.owner){this.selected.set(current);this.events.set(events.items);this.publicDetails.set(details);}}catch(err){if(e===this.editorEpoch&&owner===this.owner)this.editorError.set(parseClinicHttpError(err,'No pudimos cargar el turno.').userMessage);}finally{if(e===this.editorEpoch)this.detailBusy.set(false);}}
 validCreate(){return !this.writing()&&this.canBook(this.slot()?.clinic)&&!this.conflict()&&!!this.slot()&&this.contactName.trim().length>0&&this.contactName.trim().length<=160&&this.contactPhone.trim().length<=80&&(!this.differentPerson||(this.attendeeName.trim().length>0&&this.attendeeName.trim().length<=160));}
 async create(){const slot=this.slot();if(!slot||!this.validCreate())return;const body={clinicId:slot.clinic.id,start:slot.start,contactName:this.contactName.trim(),contactPhone:this.contactPhone.trim(),attendeeName:this.differentPerson?this.attendeeName.trim():this.contactName.trim()};await this.write('create',body,key=>firstValueFrom(this.api.create(body,key)));}
 async status(status:BookingStatus){const b=this.selected();if(!b||this.detailBusy()||!this.allowed()||!transitions(b.status).includes(status))return;await this.write(status === 'CANCELLED' ? 'cancel' : 'status',{id:b.id,version:b.version,status},key=>firstValueFrom(this.api.status(b.id,b.version,status,key)));}
 async beginMove(){const b=this.selected();if(!b||b.status!=='CONFIRMED'||!this.canReschedule())return;this.editor.set('move');this.moveClinic=this.canBook(this.clinic(b.clinicId))&&this.clinic(b.clinicId)?.status==='ACTIVE'?b.clinicId:this.clinics().find(c=>c.status==='ACTIVE'&&this.canBook(c))?.id??'';this.moveDate=civilDate(b.start,this.clinic(this.moveClinic)?.timezone??'UTC');this.moveStart='';await this.loadTargets();}
 async loadTargets(){const epoch=++this.targetEpoch,e=this.editorEpoch,owner=this.owner,id=this.moveClinic,date=this.moveDate;this.moveStart='';this.targetSlots.set([]);if(!this.validDate(date)||this.pickers().some(p=>p.error()))return;const clinic=this.clinic(id);if(!clinic||clinic.status!=='ACTIVE'||!this.canBook(clinic))return;this.targetBusy.set(true);try{const data=await firstValueFrom(this.schedules.availability(id,date,1));if(epoch===this.targetEpoch&&e===this.editorEpoch&&owner===this.owner)this.targetSlots.set(data.days.flatMap(d=>d.slots.filter(s=>s.specialtyContextId===this.selected()?.specialtyContextId).map(s=>({...s,clinic}))));}catch(err){if(epoch===this.targetEpoch&&e===this.editorEpoch)this.editorError.set(parseClinicHttpError(err,'No pudimos buscar horarios.').userMessage);}finally{if(epoch===this.targetEpoch)this.targetBusy.set(false);}}
 async move(){const b=this.selected();if(!b||!this.canBook(this.clinic(this.moveClinic))||!this.targetSlots().some(s=>s.start===this.moveStart&&s.clinic.id===this.moveClinic))return;const body={expectedVersion:b.version,clinicId:this.moveClinic,start:this.moveStart};await this.write('reschedule',{id:b.id,...body},key=>firstValueFrom(this.api.reschedule(b.id,body,key)));}
 private async write(kind:keyof typeof BOOKING_SUCCESS_MESSAGES,body:object,send:(key:string)=>Promise<Booking>){
  if(this.writing()||this.conflict()||!this.allowed())return;
  const signature=JSON.stringify({kind,body});if(this.receipt?.signature!==signature)this.receipt={signature,key:crypto.randomUUID()};
  const key=this.receipt.key,e=this.editorEpoch,owner=this.owner;this.writing.set(true);this.editorError.set('');
  try{const result=await send(key);if(e!==this.editorEpoch||owner!==this.owner)return;this.receipt=null;this.interaction.notifySuccess(BOOKING_SUCCESS_MESSAGES[kind]);this.editor.set('detail');this.selected.set(result);this.events.set([]);await this.load();if(e===this.editorEpoch&&owner===this.owner){try{const events=await firstValueFrom(this.api.events(result.id));if(e===this.editorEpoch&&owner===this.owner)this.events.set(events.items);}catch{if(e===this.editorEpoch&&owner===this.owner)this.editorError.set('El turno se guardó, pero no pudimos cargar su historial. Recargá el detalle.');}}}
  catch(err){if(e!==this.editorEpoch||owner!==this.owner)return;const parsed=parseClinicHttpError(err,'No pudimos confirmar la operación. Tus datos se conservaron; podés reintentar.');const code=(err as {error?:{code?:string}})?.error?.code;const messages:Record<string,string>={BOOKING_SLOT_UNAVAILABLE:'Ese horario ya no está disponible. Actualizá y elegí otro; tus datos se conservaron.',BOOKING_STATE_CONFLICT:'El estado del turno ya no permite esta operación. Recargá el detalle.',VERSION_CONFLICT:'El turno cambió en otra sesión. Recargá el detalle antes de continuar.',IDEMPOTENCY_CONFLICT:'Este intento corresponde a otra operación. Recargá el detalle para verificar el resultado.'};this.editorError.set(messages[code??'']??parsed.userMessage);if((err as {status?:number}).status===409){this.conflict.set(true);this.receipt=null;void this.load();}if(parsed.shouldRefreshCapabilities||(err as {status?:number}).status===403){this.setCaps(null);void this.retryCapabilities();}}
  finally{this.writing.set(false);if(kind==='create'&&e===this.editorEpoch&&this.editor()==='detail')this.focusAfterRender(this.detailHeading);}
 }
}
