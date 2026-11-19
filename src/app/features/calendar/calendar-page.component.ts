import { PhoneDisplayPipe } from '../../shared/phone-input/phone-display.pipe';
import { PhoneInputComponent } from '../../shared/phone-input/phone-input.component';
import {afterNextRender,Component,DestroyRef,ElementRef,Injector,computed,effect,inject,signal,viewChild,viewChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute,RouterLink} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {DatePickerComponent} from '../../shared/date-picker/date-picker.component';
import {AuthService} from '../../core/services/auth.service';
import {WorkspaceStore} from '../../core/services/workspace.store';
import {ClinicsService} from '../clinics/clinics.service';
import {AppointmentModality,Clinic,ClinicCapabilities,isCapabilityVerified,modalityLabel,parseClinicHttpError} from '../clinics/clinics.models';
import {SchedulesService} from '../schedules/schedules.service';
import {BookingsService} from './bookings.service';
import {FEATURE_FLAGS} from '../../core/config/feature-flags';
import {PublicBookingDetails,PublicBookingForm} from '../appointments/appointments.models';
import {BookingPortalFieldsComponent,bookingPortalIntake} from './booking-portal-fields.component';
import {Booking,BookingEvent,BookingStatus,STATUS_LABELS,bookingStatusLabel,transitions,addDays,civilDate,localTime,displayDay,slotOffsetLabel} from './bookings.models';
import {CalendarClinic,StaffAgenda} from '../staff/staff-agenda';
import {StaffAccountComponent} from '../staff/staff-account.component';
import { AgendaComponent, type AgendaView } from './agenda.component';
import type { AgendaDay } from './agenda-timeline';
import {staffError} from '../staff/staff.service';
interface Slot {clinic:CalendarClinic;start:string;end:string;specialtyContextId?:string;}
interface Day extends AgendaDay<Slot> { bookings: Booking[]; }
@Component({selector:'app-calendar-page',imports:[AgendaComponent,CommonModule,PhoneDisplayPipe,FormsModule,PhoneInputComponent,BookingPortalFieldsComponent,RouterLink,DatePickerComponent,StaffAccountComponent],providers:[StaffAgenda],host:{'[attr.role]':'staff ? "main" : null'},templateUrl:'./calendar-page.component.html',styleUrl:'./calendar-page.component.css'})
export class CalendarPageComponent {
 readonly staff = inject(ActivatedRoute, {optional:true})?.snapshot.data['staffAgenda'] ? inject(StaffAgenda) : null;
 private staffLoaded = false;
 readonly workspace=inject(WorkspaceStore);
 private readonly api=inject(BookingsService);private readonly clinicsApi=inject(ClinicsService);private readonly schedules=inject(SchedulesService);private readonly auth=inject(AuthService);private readonly destroy=inject(DestroyRef);
 private readonly injector=inject(Injector);
 private readonly contactInput=viewChild<ElementRef<HTMLInputElement>>('contactInput');
 private readonly manualHeading=viewChild<ElementRef<HTMLElement>>('manualHeading');
 private readonly detailHeading=viewChild<ElementRef<HTMLElement>>('detailHeading');
 private readonly pickers=viewChildren(DatePickerComponent);private generation=0;private editorEpoch=0;private capEpoch=0;private owner:string|null=null;
 private receipt:{signature:string;key:string}|null=null;private expiry:ReturnType<typeof setTimeout>|null=null;
 readonly clinics=signal<CalendarClinic[]>([]);readonly days=signal<Day[]>([]);readonly loading=signal(false);readonly writing=signal(false);readonly detailBusy=signal(false);
 readonly selectedDay = signal(this.dateToday());
 readonly filtersOpen = signal(false);
 activeFilterCount() { return [this.contextFilter,this.statusFilter,this.clinicId,this.modalityFilter].filter(Boolean).length; }
 readonly visibleDays = computed(() => {
  const days = this.days();
  const selected = days.find(day => day.date === this.selectedDay()) ?? days[0];
  return selected ? [selected] : [];
 });
 selectDay(date: string) { if (!this.writing()) this.selectedDay.set(date); }
 readonly agendaView = signal<AgendaView>('7');
 readonly agendaBookings = computed(() => this.days().flatMap(day => day.bookings));
 readonly agendaSlotKey = (slot: Slot) => slot.clinic.id + '|' + slot.start + '|' + (slot.specialtyContextId ?? '');
 readonly agendaAllowSlot = (slot: Slot) => this.canBook(slot.clinic);
 readonly agendaSlotSelected = (slot: Slot) => this.isSelectedSlot(slot);
 readonly agendaSlotContext = (slot: Slot) => this.clinicId || this.staff ? this.slotSpecialty(slot) : slot.clinic.name;
 readonly agendaBookingContext = (booking: Booking) => this.bookingClinic(booking);
 readonly agendaBookingStatus = (booking: Booking) => bookingStatusLabel(booking.status, this.bookingModality(booking));

 setAgendaView(view: AgendaView): void {
  if (!this.writing()) this.agendaView.set(view);
 }
 openAgendaBooking(booking: Booking): void {
  this.selectDay(civilDate(booking.start, this.calendarZone));
  void this.openBooking(booking);
 }
 openAgendaSlot(slot: Slot): void {
  this.selectDay(civilDate(slot.start, this.calendarZone));
  this.openSlot(slot);
 }
 slotGroups(day: Day) {
  const groups = new Map<string, {key: string; name: string; specialty: string; slots: Slot[]}>();
  for (const slot of day.slots) {
   const key = slot.clinic.id + '|' + slot.specialtyContextId;
   if (!groups.has(key)) groups.set(key, {key, name: slot.clinic.name + ' · ' + modalityLabel(slot.clinic.modality), specialty: this.slotSpecialty(slot), slots: []});
   groups.get(key)!.slots.push(slot);
  }
  return [...groups.values()];
 }
 readonly capabilities=signal<ClinicCapabilities|null>(null);readonly clock=signal(Date.now());readonly error=signal('');readonly feedback=signal('');readonly editorError=signal('');readonly conflict=signal(false);
 readonly selected=signal<Booking|null>(null);readonly slot=signal<Slot|null>(null);readonly publicDetails=signal<PublicBookingDetails|null>(null);readonly events=signal<BookingEvent[]>([]);readonly editor=signal<'create'|'detail'|'move'|null>(null);
 readonly targetSlots=signal<Slot[]>([]);readonly targetBusy=signal(false);private targetEpoch=0;
 contextFilter='';statusFilter='';modalityFilter:AppointmentModality|''='';
 date=this.startOfWeek(this.dateToday());clinicId='';
 contactName='';contactPhone:string|null=null;attendeeName='';differentPerson=false;moveDate=this.date;moveClinic='';moveStart='';
 portalDraft={document:'',email:'',answers:{} as Record<string,string>};
 readonly bookingForm=signal<PublicBookingForm|null>(null);
 readonly formError=signal('');
 readonly statuses:BookingStatus[]=Object.keys(STATUS_LABELS) as BookingStatus[];
 readonly statusLabel=bookingStatusLabel;readonly displayDay=displayDay;readonly localTime=localTime;readonly slotOffsetLabel=slotOffsetLabel;readonly transitions=transitions;
 readonly civilDay=civilDate;readonly modalityLabel=modalityLabel;
 private readonly browserZone=Intl.DateTimeFormat().resolvedOptions().timeZone;
 get calendarZone(){return this.staff ? this.staff.assignment()?.timezone || 'America/Argentina/Buenos_Aires' : this.browserZone;}
 dateToday(){return civilDate(new Date().toISOString(),this.staff?.assignment()?.timezone || (this.staff ? 'America/Argentina/Buenos_Aires' : Intl.DateTimeFormat().resolvedOptions().timeZone));}
 weekday(date:string){return new Intl.DateTimeFormat('es-AR',{weekday:'long',timeZone:'UTC'}).format(new Date(date+'T12:00:00Z'));}
 eventDate(instant:string){const zone=this.selected()?this.bookingZone(this.selected()!):'UTC';return displayDay(civilDate(instant,zone))+' '+localTime(instant,zone);}
 eventLabel(kind:string){return ({CREATED:'Turno creado',STATUS_CHANGED:'Estado actualizado',RESCHEDULED:'Turno reprogramado'} as Record<string,string>)[kind]??kind;}
 draftSlots(){return this.days().flatMap(d=>d.slots);}
 chooseDraftSlot(value:string){const s=this.draftSlots().find(s=>s.clinic.id+'|'+s.start===value);if(s)this.openSlot(s);}
 refreshCreateSlot(){const current=this.slot();if(current&&this.draftSlots().some(s=>s.clinic.id===current.clinic.id&&s.start===current.start)){this.conflict.set(false);this.editorError.set('');}else this.editorError.set('El horario original ya no está libre. Seleccioná otro horario actualizado debajo.');}
 constructor(){
  if(this.staff) void this.load();
  else effect(()=>{const owner=this.auth.currentUser()?.id??null;if(owner!==this.owner){this.owner=owner;this.generation++;this.capEpoch++;this.close();this.clinics.set([]);this.days.set([]);this.setCaps(null);if(owner)void this.load();}});
  const timer=setInterval(()=>{this.clock.set(Date.now());},1000);const refresh=setInterval(()=>{if(this.staff&&!this.writing()&&!this.loading())void this.loadStaff(true);else if(this.owner)void this.retryCapabilities();},30000);
  this.destroy.onDestroy(()=>{this.generation++;this.editorEpoch++;this.capEpoch++;this.targetEpoch++;clearInterval(timer);clearInterval(refresh);if(this.expiry)clearTimeout(this.expiry);});
 }
 private current(g:number,owner=this.owner){return g===this.generation&&owner===(this.auth.currentUser()?.id??null);}
 private setCaps(caps:ClinicCapabilities|null){if(this.expiry)clearTimeout(this.expiry);this.capabilities.set(caps);this.clock.set(Date.now());const remaining=Date.parse(caps?.entitlements.validUntil??'')-Date.now();if(remaining>0)this.expiry=setTimeout(()=>this.clock.set(Date.now()),Math.min(remaining+5,2147483647));}
 allowed(){this.clock();return this.staff ? this.staff.can('view',Date.now()) : isCapabilityVerified(this.capabilities(),Date.now());}
 canBook(clinic?:CalendarClinic){if(this.staff)return this.staff.can('create',this.clock())&&this.allowed();const c=this.capabilities(),max=c?.entitlements.max_clinics;return this.allowed()&&(clinic?.modality==='TELECONSULTATION'||max!=null&&(max===-1||(c?.usage.counted??Infinity)<=max));}
 canReschedule(){return this.staff ? this.staff.can('reschedule',this.clock())&&this.allowed() : this.clinics().some(c=>c.status==='ACTIVE'&&this.canBook(c));}
 canMoveTo(clinic?:CalendarClinic){return this.staff ? this.canReschedule()&&clinic?.id===this.staff.assignment()?.clinicId : !!clinic&&this.canBook(clinic);}
 canSetStatus(status:BookingStatus){return this.allowed()&&(!this.staff||this.staff.can(status==='CANCELLED'?'cancel':'status',this.clock()));}
 clinic(id:string){return this.clinics().find(c=>c.id===id);}
 bookingZone(b:Booking){return b.clinicSnapshot?.timezone||this.clinic(b.clinicId)?.timezone||'UTC';}
 bookingClinic(b:Booking){return b.clinicSnapshot?.name||this.clinic(b.clinicId)?.name||'Consultorio';}
 bookingModality(b:Booking){return b.clinicSnapshot?.modality??this.clinic(b.clinicId)?.modality??'IN_PERSON';}
 statusAction(status: BookingStatus, modality: AppointmentModality): string {
  if (status === 'CANCELLED') return 'Cancelar turno';
  if (status === 'CHECKED_IN' && modality === 'TELECONSULTATION') return 'Marcar presente';
  return 'Marcar: ' + bookingStatusLabel(status, modality);
 }
 specialtyName(b:Booking){return b.specialty?.name||'Especialidad sin registro histórico';}
 time(b:Booking){return localTime(b.start,this.bookingZone(b));}
 private validDate(date:string){return /^\d{4}-\d{2}-\d{2}$/.test(date)&&Number.isFinite(Date.parse(date+'T12:00:00Z'))&&new Date(date+'T12:00:00Z').toISOString().slice(0,10)===date;}
 startOfWeek(date:string){const day=new Date(date+'T12:00:00Z').getUTCDay();return addDays(date,-((day+6)%7));}
 changeDate(value:string){if(!this.validDate(value)||this.writing())return;this.date=this.startOfWeek(value);this.selectedDay.set(value);this.close();void this.load();}
 changeClinic(id:string){this.clinicId=id;this.close();void this.load();}
 async retryCapabilities(){const epoch=++this.capEpoch,owner=this.owner;try{const caps=await firstValueFrom(this.clinicsApi.getCapabilities());if(epoch===this.capEpoch&&owner===this.owner)this.setCaps(caps);}catch{if(epoch===this.capEpoch&&owner===this.owner)this.setCaps(null);}}
 changeFilters(){this.close();void this.load();}
 slotSpecialty(slot:Slot){return this.staff
  ? this.days().flatMap(day=>day.bookings).find(booking=>booking.specialtyContextId===slot.specialtyContextId)?.specialty?.name??''
  : this.workspace.contexts().find(c=>String(c.id)===slot.specialtyContextId)?.specialty.name??'Especialidad';}
 async load(){
  if(this.staff)return this.loadStaff();
  const g=++this.generation,owner=this.owner,date=this.date,count=7,id=this.clinicId;
  this.loading.set(true);this.error.set('');this.days.set([]);
  try{
   await this.workspace.loadContexts();const clinics:Clinic[]=[];let page=0,total=1;
   while(clinics.length<total){const next=await firstValueFrom(this.clinicsApi.listClinics({page:page++,size:100}));if(!this.current(g,owner))return;clinics.push(...next.items);total=next.totalElements;if(!next.items.length)break;}
   this.clinics.set(clinics);void this.retryCapabilities();
   const from=addDays(date,-2)+'T00:00:00Z',to=addDays(date,count+2)+'T00:00:00Z';const bookings:Booking[]=[];page=0;total=1;
   while(bookings.length<total){const next=await firstValueFrom(this.api.list(from,to,page++));if(!this.current(g,owner))return;bookings.push(...next.items);total=next.totalElements;if(!next.items.length)break;}
   const slots:Slot[]=[];
   const hoursByDate = new Map<string, Map<string, string>>();
   const closedByDate = new Map<string, Set<string>>();
   const visible=clinics.filter(c=>(!id||c.id===id)&&c.status==='ACTIVE'&&(!this.modalityFilter||(c.modality??'IN_PERSON')===this.modalityFilter));const failures:string[]=[];
   await Promise.all(visible.map(async clinic=>{try{const dates=clinic.timezone===this.calendarZone?[date]:[addDays(date,-2),addDays(date,5)];const results=await Promise.all(dates.map(day=>firstValueFrom(this.schedules.availability(clinic.id,day,7))));for(const result of results)for(const day of result.days){
     for(const slot of day.slots)slots.push({...slot,clinic});
     if (clinic.timezone !== this.calendarZone) continue;
     const hours = hoursByDate.get(day.date) ?? new Map<string, string>();
     for (const hour of day.hours ?? []) {
      if ((hours.get(hour.start) ?? '') < hour.end) hours.set(hour.start, hour.end);
     }
     hoursByDate.set(day.date, hours);
     if (day.closed) {
      const closed = closedByDate.get(day.date) ?? new Set<string>();
      closed.add(clinic.id);
      closedByDate.set(day.date, closed);
     }
    }}catch(e){failures.push(`${clinic.name}: ${parseClinicHttpError(e,'No se pudo consultar la disponibilidad.').userMessage}`);}}));
   if(!this.current(g,owner))return;
   const unique=[...new Map(bookings.map(b=>[b.id,b])).values()];
   this.days.set(Array.from({length:count},(_,i)=>{const d=addDays(date,i);return {date:d,hours:[...(hoursByDate.get(d) ?? [])].map(([start,end])=>({start,end})),closed:visible.length>0&&closedByDate.get(d)?.size===visible.length,bookings:unique.filter(b=>(!this.contextFilter||b.specialtyContextId===this.contextFilter)&&(!this.statusFilter||b.status===this.statusFilter)&&(!id||b.clinicId===id)&&(!this.modalityFilter||this.bookingModality(b)===this.modalityFilter)&&civilDate(b.start,this.calendarZone)===d).sort((a,b)=>Date.parse(a.start)-Date.parse(b.start)),slots:slots.filter(s=>(!this.contextFilter||s.specialtyContextId===this.contextFilter)&&civilDate(s.start,this.calendarZone)===d).sort((a,b)=>Date.parse(a.start)-Date.parse(b.start))};}));
   if(failures.length)this.error.set(failures.join(' · '));
  }catch(e){if(this.current(g,owner))this.error.set(parseClinicHttpError(e,'No pudimos cargar el calendario.').userMessage);}
  finally{if(this.current(g,owner))this.loading.set(false);}
 }
 changeStaffDoctor(id:string):void {
  if(!this.staff||this.writing()||id===this.staff.doctorId())return;
  this.staff.selectDoctor(id);
  this.reloadStaffSelection();
 }
 changeStaffAssignment(key:string):void {
  if(!this.staff||this.writing()||key===this.staff.selectedKey())return;
  this.staff.select(key);
  this.reloadStaffSelection();
 }
 private reloadStaffSelection():void {
  this.close();
  this.feedback.set('');
  this.clinics.set([]);
  this.days.set([]);
  const today=this.dateToday();
  this.date=this.startOfWeek(today);
  this.selectedDay.set(today);
  void this.load();
 }
 private async loadStaff(background=false):Promise<void> {
  const staff=this.staff;
  if(!staff)return;
  const generation=++this.generation;
  const current=()=>generation===this.generation;
  if(!background){this.loading.set(true);this.error.set('');this.days.set([]);}
  try {
   const {items}=await staff.api.assignments();
   if(!current())return;
   const previous=staff.selectedKey();
   staff.setAssignments(items,!this.staffLoaded);
   this.staffLoaded=true;
   const selected=staff.assignment();
   if(previous!==staff.selectedKey()){
    this.close();
    this.days.set([]);
    const today=this.dateToday();
    this.date=this.startOfWeek(today);
    this.selectedDay.set(today);
   }
   if(!selected||!this.allowed()){
    this.clinics.set([]);
    this.days.set([]);
    this.close();
    return;
   }
   const clinic=staff.clinic(selected),date=this.date;
   this.clinics.set([clinic]);
   const [availability,bookings]=await Promise.all([
    staff.api.availability(selected,date,7),
    staff.bookings(selected,addDays(date,-2)+'T00:00:00Z',addDays(date,9)+'T00:00:00Z',current),
   ]);
   if(!current())return;
   this.error.set('');
   this.days.set(Array.from({length:7},(_,index)=>{
    const day=addDays(date,index);
    const schedule = availability.days.find(item => item.date === day);
    return {date:day,hours:schedule?.hours,closed:schedule?.closed,bookings:bookings.filter(b=>civilDate(b.start,clinic.timezone)===day),slots:(schedule?.slots??[]).map(slot=>({...slot,clinic}))};
   }));
  }catch(error){
   if(!current())return;
   this.error.set(staffError(error));
   this.days.set([]);
   if([401,403].includes((error as {status?:number}).status??0)){
    this.days.set([]);
    this.clinics.set([]);
    staff.setAssignments([],false);
    this.close();
    if((error as {status?:number}).status===401)staff.invalidateSession();
   }
  }finally{if(current())this.loading.set(false);}
 }
 close(){this.editorEpoch++;this.targetEpoch++;this.editor.set(null);this.selected.set(null);this.slot.set(null);this.events.set([]);this.publicDetails.set(null);this.targetSlots.set([]);this.editorError.set('');this.conflict.set(false);this.receipt=null;this.detailBusy.set(false);this.targetBusy.set(false);this.contactName='';this.contactPhone=null;this.attendeeName='';this.differentPerson=false;this.portalDraft={document:'',email:'',answers:{}};this.bookingForm.set(null);this.formError.set('');}
 private focusAfterRender(target:()=>ElementRef<HTMLElement>|undefined){
  afterNextRender(()=>target()?.nativeElement.focus(),{injector:this.injector});
 }
 focusManualHours(){this.manualHeading()?.nativeElement.focus();}
 cancelCreate(){this.close();this.focusAfterRender(this.manualHeading);}
 isSelectedSlot(slot:Slot){const current=this.slot();return this.editor()==='create'&&current?.clinic.id===slot.clinic.id&&current.start===slot.start;}
 openSlot(slot:Slot){
  if(this.writing()||!this.canBook(slot.clinic))return;
  const opening=this.editor()!=='create';
  if(opening)this.close();
  else if(!this.isSelectedSlot(slot)||this.conflict()){
   this.conflict.set(false);this.editorError.set('');this.receipt=null;
  }
  this.slot.set(slot);this.editor.set('create');this.focusAfterRender(this.contactInput);
  if(opening)void this.loadBookingForm();
 }
 async loadBookingForm(){
  const epoch=this.editorEpoch,owner=this.owner;
  const current=()=>epoch===this.editorEpoch&&owner===this.owner&&this.editor()==='create';
  this.bookingForm.set(null);this.formError.set('');
  try {
   const staff=this.staff, assignment=staff?.assignment();
   const form=staff&&assignment ? await staff.api.bookingForm(assignment) : staff ? null : await firstValueFrom(this.api.form());
   if(current())this.bookingForm.set(form);
  } catch {
   if(current())this.formError.set('No pudimos cargar los datos de la reserva. Reintentá para confirmar el turno.');
  }
 }
 async openBooking(b:Booking){if(this.writing()||(this.staff&&!this.allowed()))return;this.close();const e=this.editorEpoch,owner=this.owner;this.selected.set(b);this.editor.set('detail');this.focusAfterRender(this.detailHeading);if(this.staff)return;this.detailBusy.set(true);try{const [current,events,details]=await Promise.all([firstValueFrom(this.api.get(b.id)),firstValueFrom(this.api.events(b.id)),FEATURE_FLAGS.PUBLIC_APPOINTMENTS_ENABLED?firstValueFrom(this.api.publicDetails(b.id)):Promise.resolve(null)]);if(e===this.editorEpoch&&owner===this.owner){this.selected.set(current);this.events.set(events.items.filter(event => event.kind !== 'PATIENT_LINKED'));this.publicDetails.set(details);}}catch(err){if(e===this.editorEpoch&&owner===this.owner)this.editorError.set(parseClinicHttpError(err,'No pudimos cargar el turno.').userMessage);}finally{if(e===this.editorEpoch)this.detailBusy.set(false);}}
 validCreate(){return !this.writing()&&this.canBook(this.slot()?.clinic)&&!this.conflict()&&!!this.slot()&&!!this.bookingForm()&&!!this.contactPhone&&/^[0-9]{5,8}$/.test(this.portalDraft.document.trim())&&!!this.portalDraft.email.trim()&&this.contactName.trim().length>0&&this.contactName.trim().length<=160&&(!this.differentPerson||(this.attendeeName.trim().length>0&&this.attendeeName.trim().length<=160));}
 async create(){
  const slot=this.slot(),form=this.bookingForm();
  if(!slot||!form||!this.validCreate())return;
  const body={clinicId:slot.clinic.id,start:slot.start,specialtyContextId:slot.specialtyContextId,
   contactName:this.contactName.trim(),contactPhone:this.contactPhone??'',
   attendeeName:this.differentPerson?this.attendeeName.trim():this.contactName.trim(),
   portal:bookingPortalIntake(form,this.portalDraft)};
  const staff=this.staff, assignment=staff?.assignment();
  if(staff){
   if(assignment)await this.write('create',body,async key=>staff.booking(await staff.api.create(assignment,body,key)));
  }else await this.write('create',body,key=>firstValueFrom(this.api.create(body,key)));
 }
 async status(status:BookingStatus){
  const booking=this.selected();
  if(!booking||this.detailBusy()||!this.canSetStatus(status)||!transitions(booking.status).includes(status))return;
  const body={id:booking.id,version:booking.version,status};
  const staff=this.staff, assignment=staff?.assignment();
  if(staff){
   if(assignment)await this.write('status',body,async key=>staff.booking(await staff.api.status(assignment,booking,status,key)));
  }else await this.write('status',body,key=>firstValueFrom(this.api.status(booking.id,booking.version,status,key)));
 }
 async beginMove(){
  const booking=this.selected();
  if(!booking||booking.status!=='CONFIRMED'||!this.canReschedule())return;
  this.editor.set('move');
  const original=this.clinic(booking.clinicId);
  this.moveClinic=original?.status==='ACTIVE'&&this.canMoveTo(original)?original.id:this.clinics().find(c=>c.status==='ACTIVE'&&this.canMoveTo(c))?.id??'';
  this.moveDate=civilDate(booking.start,this.clinic(this.moveClinic)?.timezone??'UTC');
  this.moveStart='';
  await this.loadTargets();
 }
 async loadTargets(){
  const epoch=++this.targetEpoch,e=this.editorEpoch,owner=this.owner,id=this.moveClinic,date=this.moveDate;
  this.moveStart='';
  this.targetSlots.set([]);
  if(!this.validDate(date)||this.pickers().some(p=>p.error()))return;
  const clinic=this.clinic(id);
  if(!clinic||clinic.status!=='ACTIVE'||!this.canMoveTo(clinic))return;
  const staff=this.staff, assignment=staff?.assignment();
  if(staff&&!assignment)return;
  this.targetBusy.set(true);
  try{
   const data=staff&&assignment ? await staff.api.availability(assignment,date,1) : await firstValueFrom(this.schedules.availability(id,date,1));
   if(epoch===this.targetEpoch&&e===this.editorEpoch&&owner===this.owner){
    const context=this.selected()?.specialtyContextId;
    this.targetSlots.set(data.days.flatMap(d=>d.slots.filter(s=>s.specialtyContextId===context||(staff&&!context)).map(s=>({...s,clinic}))));
   }
  }catch(err){
   if(epoch===this.targetEpoch&&e===this.editorEpoch)this.editorError.set(staff?staffError(err):parseClinicHttpError(err,'No pudimos buscar horarios.').userMessage);
  }finally{if(epoch===this.targetEpoch)this.targetBusy.set(false);}
 }
 async move(){
  const booking=this.selected();
  if(!booking||!this.canMoveTo(this.clinic(this.moveClinic))||!this.targetSlots().some(s=>s.start===this.moveStart&&s.clinic.id===this.moveClinic))return;
  const body={expectedVersion:booking.version,clinicId:this.moveClinic,start:this.moveStart};
  const staff=this.staff, assignment=staff?.assignment();
  if(staff){
   if(assignment)await this.write('move',{id:booking.id,...body},async key=>staff.booking(await staff.api.reschedule(assignment,booking,body.clinicId,body.start,key)));
  }else await this.write('move',{id:booking.id,...body},key=>firstValueFrom(this.api.reschedule(booking.id,body,key)));
 }
 async reloadBooking(booking:Booking){
  if(!this.staff)return this.openBooking(booking);
  const epoch=this.editorEpoch;
  await this.load();
  if(epoch!==this.editorEpoch)return;
  const current=this.days().flatMap(day=>day.bookings).find(item=>item.id===booking.id);
  if(current)void this.openBooking(current);
  else this.editorError.set('El turno ya no aparece en esta semana. Volvé a la agenda para buscarlo.');
 }
 private async write(kind:string,body:object,send:(key:string)=>Promise<Booking>){
  if(this.writing()||this.conflict()||!this.allowed())return;
  const signature=JSON.stringify({kind,body});if(this.receipt?.signature!==signature)this.receipt={signature,key:crypto.randomUUID()};
  const key=this.receipt.key,e=this.editorEpoch,owner=this.owner;this.writing.set(true);this.editorError.set('');this.feedback.set('');
  try{const result=await send(key);if(e!==this.editorEpoch||owner!==this.owner)return;this.receipt=null;this.feedback.set('Turno guardado. La disponibilidad se actualizó.');this.editor.set('detail');this.selected.set(result);this.events.set([]);await this.load();if(!this.staff&&e===this.editorEpoch&&owner===this.owner){try{const events=await firstValueFrom(this.api.events(result.id));if(e===this.editorEpoch&&owner===this.owner)this.events.set(events.items.filter(event => event.kind !== 'PATIENT_LINKED'));}catch{if(e===this.editorEpoch&&owner===this.owner)this.editorError.set('El turno se guardó, pero no pudimos cargar su historial. Recargá el detalle.');}}}
  catch(err){if(e!==this.editorEpoch||owner!==this.owner)return;const parsed=parseClinicHttpError(err,'No pudimos confirmar la operación. Tus datos se conservaron; podés reintentar.');const code=(err as {error?:{code?:string}})?.error?.code;const messages:Record<string,string>={BOOKING_SLOT_UNAVAILABLE:'Ese horario ya no está disponible. Actualizá y elegí otro; tus datos se conservaron.',BOOKING_STATE_CONFLICT:'El estado del turno ya no permite esta operación. Recargá el detalle.',VERSION_CONFLICT:'El turno cambió en otra sesión. Recargá el detalle antes de continuar.',IDEMPOTENCY_CONFLICT:'Este intento corresponde a otra operación. Recargá el detalle para verificar el resultado.'};this.editorError.set(messages[code??'']??(this.staff?staffError(err):parsed.userMessage));if(code==='FORM_VERSION_CONFLICT'){this.receipt=null;this.editorError.set('El formulario cambió. Revisá las preguntas actualizadas.');void this.loadBookingForm();return;}if((err as {status?:number}).status===409){this.conflict.set(true);this.receipt=null;void this.load();}if(this.staff){
    const status=(err as {status?:number}).status;
    if(status===401)this.staff.invalidateSession();
    if(status===403)void this.load();
   }else if(parsed.shouldRefreshCapabilities||(err as {status?:number}).status===403){this.setCaps(null);void this.retryCapabilities();}}
  finally{this.writing.set(false);if(kind==='create'&&e===this.editorEpoch&&this.editor()==='detail')this.focusAfterRender(this.detailHeading);}
 }
}
