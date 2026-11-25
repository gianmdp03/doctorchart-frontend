import { InteractionStatusService } from '../../core/services/interaction-status.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { ClinicalContextService } from '../../core/services/clinical-context.service';
import { Component, DestroyRef, computed, untracked, effect, inject, signal, viewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePickerComponent } from '../../shared/date-picker/date-picker.component';
import { TimePickerComponent } from '../../shared/time-picker/time-picker.component';
import { AuthService } from '../../core/services/auth.service';
import { BrowserUiStorageService } from '../../core/services/browser-ui-storage.service';
import { isArgentineTimezone } from '../../core/date/user-time-zone';
import { ClinicsService } from '../clinics/clinics.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideBuilding2, lucideCircleAlert, lucideVideo, lucideCalendarDays, lucideCalendarOff, lucidePlus, lucideSlidersHorizontal, lucideScanEye } from '@ng-icons/lucide';
import { Clinic, ClinicCapabilities, isCapabilityVerified, modalityLabel, parseClinicHttpError } from '../clinics/clinics.models';
import { AgendaWindow, Availability, ClinicSchedule, OccupiedSchedule, ScheduleConflict, ScheduleDay, ScheduleException, ScheduleRange, ScheduleUpdate } from './schedules.models';
import { addDays, civilDate, localTime, offsetLabel } from '../calendar/bookings.models';
import { SchedulesService } from './schedules.service';

interface Draft {minNoticeMinutes:number|null;maxAdvanceDays:number|null;weekly:ScheduleDay[];exceptions:ScheduleException[];}
interface StoredDraft {version:string;draft:Draft;}
interface ConflictNotice {
 when: string;
 agenda: string;
 requested: string;
 existing: string;
 overlap: string;
 booked: boolean;
}
interface LocalConflict {
 name: string;
 weekday?: number;
 from?: string;
 through?: string;
 requestedLocal: ScheduleRange;
 existingLocal: ScheduleRange;
 overlapStartLocal: string;
 overlapEndLocal: string;
}
function emptyDraft():Draft{return {minNoticeMinutes:null,maxAdvanceDays:null,weekly:Array.from({length:7},(_,i)=>({weekday:i+1,ranges:[]})),exceptions:[]};}
@Component({
 selector:'app-schedule-page',imports:[CommonModule,FormsModule,RouterLink,DatePickerComponent,TimePickerComponent,NgIconComponent],
 providers: [provideIcons({ lucideArrowLeft, lucideBuilding2, lucideCircleAlert, lucideVideo, lucideCalendarDays, lucideCalendarOff, lucidePlus, lucideSlidersHorizontal, lucideScanEye })],
 templateUrl:'./schedule-page.component.html',styleUrl:'./schedule-page.component.css',
})
export class SchedulePageComponent {
 // Presentation only: the overview reflects the same scoped blocks as the editor.
 visibleRanges(day: ScheduleDay): ScheduleRange[] {
  const scope = this.teleconsultationScope();
  return scope ? day.ranges.filter(range => range.specialtyContextId === scope.id) : day.ranges;
 }
 timePosition(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return Math.max(0, Math.min(100, (hours * 60 + minutes) / 1440 * 100));
 }
 scrollToSection(event: Event, id: string): void {
  event.preventDefault();
  const target = (event.currentTarget as HTMLElement).ownerDocument.getElementById(id);
  if (!target) return;
  const doc = target.ownerDocument;
  const headerHeight = doc.querySelector('app-header')?.getBoundingClientRect().height ?? 0;
  const saveHeight = doc.querySelector('.save-bar')?.getBoundingClientRect().height ?? 0;
  target.style.scrollMarginTop = `${headerHeight + saveHeight + 32}px`;
  target.scrollIntoView({ block: 'start', behavior: 'instant' });
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
 }

  private readonly interaction = inject(InteractionStatusService);
 private readonly api=inject(SchedulesService);
 private readonly workspace=inject(WorkspaceStore);
 private readonly clinicalContext=inject(ClinicalContextService);
 private readonly occupiedSpecialtyNames = signal(new Map<string, string>());
 readonly readySpecialties=signal<{id:string;name:string}[]>([]);
 readonly specialty=signal<{id:string;name:string}|null>(null);
 readonly isTeleconsultation = computed(() => this.clinic()?.modality === 'TELECONSULTATION');
 readonly teleconsultationScope = computed(() => {
  if (!this.isTeleconsultation()) return null;
  const active = this.clinicalContext.id() ?? this.route.snapshot?.queryParamMap?.get('teleconsultationContextId');
  return this.readySpecialties().find(context => context.id === String(active)) ?? null;
 });
 readonly configuredSpecialties = signal(new Set<string>());
 selectedDays:number[]=[];
 blockStart='09:00';blockEnd='13:00';blockMinutes=20;
 blockError=signal('');
 readonly blockConflict = signal<ConflictNotice | null>(null);
 private readonly clinicsApi=inject(ClinicsService);
 private readonly auth=inject(AuthService);
 private readonly storage=inject(BrowserUiStorageService);
 private readonly route=inject(ActivatedRoute);
 private readonly router=inject(Router);
 private readonly destroy=inject(DestroyRef);
 private readonly datePickers=viewChildren(DatePickerComponent);
 private generation=0;
 private id='';
 private owner:string|null=null;
 private expiryTimer:ReturnType<typeof setTimeout>|null=null;
 readonly clinic=signal<Clinic|null>(null);
 readonly choices=signal<Clinic[]>([]);
 readonly choicePage=signal(0);readonly choiceTotal=signal(0);readonly choicesBusy=signal(false);
 readonly capabilities=signal<ClinicCapabilities|null>(null);
 readonly busy=signal(false);
 readonly saving=signal(false);
 readonly validatingBlocks=signal(false);
 readonly error=signal('');
 readonly conflict=signal(false);
 readonly draftStatus=signal<'clean'|'stored'|'unavailable'>('clean');
 readonly availability=signal<Availability|null>(null);
 readonly scheduleConflict=signal<ConflictNotice|null>(null);
 readonly occupied=signal<OccupiedSchedule|null>(null);
 readonly showOccupied = computed(() => this.choiceTotal() > 1 || !!this.teleconsultationScope());
 readonly occupiedError=signal('');
 readonly occupiedBusy=signal(false);
 readonly selectedOccupiedDate=signal('');
 readonly modalityLabel=modalityLabel;
 private occupiedGeneration=0;
 occupiedDate=this.previewDateValue();
 private previewDateValue(){return civilDate(new Date().toISOString(),Intl.DateTimeFormat().resolvedOptions().timeZone);}
 readonly occupiedDays = computed(() => {
  const result = this.occupied();
  if (!result) return [];
  const { timezone } = result;
  const windows: AgendaWindow[] = [];
  for (const interval of result.items) {
   const previous = windows.at(-1);
   if (previous && previous.clinicId === interval.clinicId && previous.name === interval.name &&
       previous.modality === interval.modality && previous.specialtyContextId === interval.specialtyContextId &&
       Date.parse(previous.end) === Date.parse(interval.start) &&
       civilDate(previous.start, timezone) === civilDate(interval.start, timezone)) {
    previous.end = interval.end;
   } else {
    windows.push({ ...interval });
   }
  }
  const datedWindows = windows.map(interval => ({
   interval,
   first: civilDate(interval.start, timezone),
   last: civilDate(new Date(Date.parse(interval.end) - 1).toISOString(), timezone),
  }));
  return Array.from({ length: 7 }, (_, index) => {
   const date = addDays(this.occupiedDate, index);
   const day = this.weekdays[(new Date(date + 'T12:00:00Z').getUTCDay() + 6) % 7];
   const items = datedWindows.filter(window => window.first <= date && window.last >= date)
     .map(window => window.interval);
   return { date, day, items };
  });
 });
 readonly occupiedDay = computed(() => this.occupiedDays().find(day => day.date === this.selectedOccupiedDate()));

 occupiedRange(interval: AgendaWindow, date: string, zone: string): string {
  const format = (instant: string) => {
   const day = civilDate(instant, zone);
   return localTime(instant, zone) + (day === date ? '' : ' (' + this.dateLabel(day) + ')');
  };
  const fromOffset = offsetLabel(interval.start, zone);
  const toOffset = offsetLabel(interval.end, zone);
  if (fromOffset !== toOffset) return `${format(interval.start)} ${fromOffset} – ${format(interval.end)} ${toOffset}`;
  return `${format(interval.start)}–${format(interval.end)}${isArgentineTimezone(zone) ? '' : ' ' + fromOffset}`;
 }

 readonly previewDaysWithSlots = computed(() => {
  const result = this.availability();
  if (!result) return null;
  const options = { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZoneName: 'shortOffset' } as const;
  let formatter: Intl.DateTimeFormat;
  try {
   formatter = new Intl.DateTimeFormat('es-AR', { ...options, timeZone: result.timezone });
  } catch {
   formatter = new Intl.DateTimeFormat('es-AR', { ...options, timeZone: 'UTC' });
  }
  const label = (instant: string) => {
   const date = new Date(instant);
   if (!Number.isFinite(date.getTime())) return { time: instant.slice(11, 16), offset: 'UTC' };
   const parts = formatter.formatToParts(date);
   return {
    time: parts.filter(({type}) => type === 'hour' || type === 'minute').map(({value}) => value).join(':'),
    offset: parts.find(({type}) => type === 'timeZoneName')?.value ?? '',
   };
  };
  return result.days.map(day => ({
   date: day.date,
   slots: day.slots.map(slot => {
    const start = label(slot.start);
    const end = label(slot.end);
    return {
     id: slot.start,
     time: `${start.time}–${end.time}`,
    offset: isArgentineTimezone(result.timezone) && start.offset === end.offset
     ? ''
     : start.offset === end.offset ? start.offset : `${start.offset} → ${end.offset}`,
    };
   }),
  }));
 });
 readonly previewError=signal('');
 readonly previewBusy=signal(false);
 readonly permissionClock=signal(Date.now());
 readonly weekdays=['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
 draft=emptyDraft();
 version='0';
 previewDate=(()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');})();
 previewDays:1|7=7;
 constructor(){
  this.route.paramMap.pipe(takeUntilDestroyed()).subscribe(params=>{this.id=params.get('id')??'';void this.load();});
  effect(()=>{const next=this.auth.currentUser()?.id??null;if(next!==this.owner){this.owner=next;void this.load();}});
  effect(() => {
   if (!this.isTeleconsultation()) return;
   this.specialty.set(this.teleconsultationScope());
   this.selectedDays = [];
   this.blockError.set('');
   this.blockConflict.set(null);
   this.availability.set(null);
  });
  effect(() => {
   const clinic = this.clinic();
   const scope = this.teleconsultationScope();
   if (clinic && this.showOccupied()) void untracked(() => this.loadOccupied(this.occupiedDate, scope?.id));
  });
  this.destroy.onDestroy(()=>{this.generation++;if(this.expiryTimer)clearTimeout(this.expiryTimer);});
 }
 private current(generation:number,owner:string|null,id:string){return generation===this.generation&&owner===this.auth.currentUser()?.id&&id===this.id;}
 private setCapabilities(value:ClinicCapabilities|null){
  if(this.expiryTimer)clearTimeout(this.expiryTimer);
  this.capabilities.set(value);this.permissionClock.set(Date.now());
  const expiry=Date.parse(value?.entitlements.validUntil??'');
  if(Number.isFinite(expiry)&&expiry>Date.now()){
   this.expiryTimer=setTimeout(()=>{
    this.permissionClock.set(Date.now());
    void this.retryCapabilities();
   },Math.min(expiry-Date.now()+10,2147483647));
  }
 }
 async load(){
  const generation=++this.generation,owner=this.auth.currentUser()?.id??null,id=this.id;
  this.specialty.set(null);this.configuredSpecialties.set(new Set());this.selectedDays=[];this.blockError.set('');this.blockConflict.set(null);
  this.saving.set(false);this.validatingBlocks.set(false);this.previewBusy.set(false);this.choicesBusy.set(false);this.choicePage.set(0);this.choiceTotal.set(0);this.choices.set([]);this.clinic.set(null);this.availability.set(null);this.scheduleConflict.set(null);this.occupied.set(null);this.occupiedError.set('');this.occupiedBusy.set(false);this.setCapabilities(null);this.draft=emptyDraft();this.version='0';this.conflict.set(false);this.error.set('');
  this.draftStatus.set('clean');
  if(!owner){this.busy.set(false);return;}
  if(!id){
   this.busy.set(true);
   try {const choices=await firstValueFrom(this.clinicsApi.listClinics({page:0,size:100}));if(!this.current(generation,owner,id))return;this.choices.set(choices.items);this.choiceTotal.set(choices.totalElements);if(choices.totalElements===1) this.selectClinic(choices.items[0].id);}
   catch(e){if(this.current(generation,owner,id))this.error.set('No pudimos cargar tus consultorios.');}
   finally{if(this.current(generation,owner,id))this.busy.set(false);}return;
  }
  this.busy.set(true);
  try {
   const [clinic,schedule,caps,choices,setup]=await Promise.all([
    firstValueFrom(this.clinicsApi.getClinic(id)),firstValueFrom(this.api.get(id)),
    firstValueFrom(this.clinicsApi.getCapabilities()),firstValueFrom(this.clinicsApi.listClinics({page:0,size:100})),this.workspace.loadContexts(),
   ]);
   if(!this.current(generation,owner,id))return;
   const assigned = clinic.specialtyContextIds ?? [];
   const ready=setup.filter(c=>c.ready && (!assigned.length || assigned.includes(String(c.id))))
    .map(c=>({id:String(c.id),name:c.specialty.name}));
   this.occupiedSpecialtyNames.set(new Map(setup.map(context => [String(context.id), context.specialty.name])));
   this.readySpecialties.set(ready);
   this.clinic.set(clinic);
   this.specialty.set(this.isTeleconsultation() ? this.teleconsultationScope()
    : ready.find(c => c.id === String(this.clinicalContext.id())) ?? (ready.length === 1 ? ready[0] : null));
   this.choices.set(choices.items);this.choiceTotal.set(choices.totalElements);this.apply(schedule);this.setCapabilities(caps);
   this.restoreDraft(owner,id);
  }catch(e){if(this.current(generation,owner,id))this.error.set(parseClinicHttpError(e,'No pudimos cargar la agenda.').userMessage);}
  finally{if(this.current(generation,owner,id))this.busy.set(false);}
 }
 private apply(schedule:ClinicSchedule){
  this.configuredSpecialties.set(new Set(
   schedule.weekly.flatMap(day => day.ranges.map(range => range.specialtyContextId))
    .filter((id): id is string => !!id),
  ));
  this.version=schedule.version;
  this.draft={minNoticeMinutes:schedule.minNoticeMinutes??0,maxAdvanceDays:schedule.maxAdvanceDays??30,
   weekly:Array.from({length:7},(_,i)=>({weekday:i+1,ranges:structuredClone(schedule.weekly.find(d=>d.weekday===i+1)?.ranges??[])})),
   exceptions:schedule.exceptions.map(exception=>({
    ...structuredClone(exception),
    through:exception.through===exception.from?'':exception.through,
   }))};
 }
 private restoreDraft(owner:string,id:string){
  const raw=this.storage.readScheduleDraft(owner,id);
  if(!raw)return;
  try{
   const stored=JSON.parse(raw) as StoredDraft;
   const draft=stored?.draft;
   if(stored?.draft?.weekly?.some(d=>d.ranges?.some(r=>!this.readySpecialties().some(c=>c.id===r.specialtyContextId)))||stored?.draft?.exceptions?.some(e=>e.ranges?.some(r=>!this.readySpecialties().some(c=>c.id===r.specialtyContextId))))return;
   if(typeof stored?.version!=='string'||!Array.isArray(draft?.weekly)||draft.weekly.length!==7||
      !Array.isArray(draft.exceptions)||![...draft.weekly,...draft.exceptions].every(entry=>Array.isArray(entry?.ranges)))return;
   this.conflict.set(stored.version!==this.version);
   this.draft=draft;
   this.version=stored.version;
   this.draftStatus.set('stored');
  }catch{ /* Ignore a damaged local draft and keep the server copy. */ }
 }
 keepDraft(){
  const owner=this.auth.currentUser()?.id;
  if(!owner||!this.id||this.owner!==owner||!this.clinic()||this.busy())return;
  const stored=this.storage.writeScheduleDraft(owner,this.id,JSON.stringify({version:this.version,draft:this.draft}));
  this.draftStatus.set(stored?'stored':'unavailable');
 }
 async discardDraft(){
  const owner=this.auth.currentUser()?.id;
  if(!owner||!this.id||!this.storage.writeScheduleDraft(owner,this.id,null)){
   this.error.set('No pudimos quitar el borrador del navegador. Los cambios siguen en pantalla.');
   return;
  }
  await this.load();
 }
 canEdit(){
  this.permissionClock();
  const caps=this.capabilities();
  return !this.busy()&&!this.saving()&&!this.validatingBlocks()&&this.clinic()?.status!=='ARCHIVED'&&!!this.clinic()&&isCapabilityVerified(caps)&&(this.isTeleconsultation()?!!this.teleconsultationScope():!!caps?.actions.edit);
 }
 canSave(){
  return !this.datePickers().some(p=>p.inputId()?.startsWith('exception-')&&p.error())&&
   !this.draft.exceptions.some(exception=>this.exceptionDateError(exception))&&
   this.canEdit()&&!this.conflict()&&this.readySpecialties().length>0&&[...this.draft.weekly,...this.draft.exceptions].every(d=>!this.rangesError(d.ranges))&&Number.isInteger(this.draft.minNoticeMinutes)&&Number.isInteger(this.draft.maxAdvanceDays)&&this.draft.minNoticeMinutes!>=0&&this.draft.minNoticeMinutes!<=525600&&this.draft.maxAdvanceDays!>=1&&this.draft.maxAdvanceDays!<=366;
 }
 exceptionDateError(exception:ScheduleException){
  if(!exception.from)return 'Elegí el día de la excepción.';
  const iso=/^\d{4}-\d{2}-\d{2}$/;
  if(!iso.test(exception.from)||(exception.through&&!iso.test(exception.through)))return 'Revisá las fechas de esta excepción.';
  return exception.through&&exception.through<exception.from?'La fecha final tiene que ser igual o posterior a la inicial.':'';
 }
 addRange(day:ScheduleDay|ScheduleException){if(!this.specialty()){this.blockError.set('Elegí una especialidad antes de agregar un bloque.');return;}day.ranges.push({start:'09:00',end:'12:00',specialtyContextId:this.specialty()!.id,slotMinutes:30});this.keepDraft();}
 removeRange(day:ScheduleDay|ScheduleException,index:number){day.ranges.splice(index,1);this.keepDraft();}
 addException(){this.draft.exceptions.push({from:'',through:'',label:'',ranges:[]});this.keepDraft();}
 removeException(index:number){this.draft.exceptions.splice(index,1);this.keepDraft();}
 selectClinic(id:string){if(id&&id!==this.id)void this.router.navigate(['/clinics',id,'schedule']);}
 async nextChoices(delta:number){
  const page=this.choicePage()+delta;if(page<0||this.choicesBusy()||page*100>=this.choiceTotal())return;
  const generation=this.generation,owner=this.auth.currentUser()?.id??null,id=this.id;
  this.choicesBusy.set(true);
  try{const result=await firstValueFrom(this.clinicsApi.listClinics({page,size:100}));if(this.current(generation,owner,id)){this.choices.set(result.items);this.choicePage.set(page);this.choiceTotal.set(result.totalElements);}}
  catch(e){if(this.current(generation,owner,id))this.error.set(parseClinicHttpError(e,'No pudimos cargar los consultorios.').userMessage);}
  finally{if(this.current(generation,owner,id))this.choicesBusy.set(false);}
 }
 async retryCapabilities(){
  const generation=this.generation,owner=this.auth.currentUser()?.id??null,id=this.id;
  try{const caps=await firstValueFrom(this.clinicsApi.getCapabilities());if(this.current(generation,owner,id))this.setCapabilities(caps);}
  catch(e){if(this.current(generation,owner,id)){this.setCapabilities(null);this.error.set(parseClinicHttpError(e,'No pudimos verificar los permisos.').userMessage);}}
 }
 async save(){
  if(!this.canSave())return;
  const generation=this.generation,owner=this.auth.currentUser()?.id??null,id=this.id;
  const request=this.scheduleUpdate(structuredClone(this.draft));
  this.keepDraft();
  this.saving.set(true);this.error.set('');this.scheduleConflict.set(null);
  try{
   const result=await firstValueFrom(this.api.save(id,request));
   if(!this.current(generation,owner,id))return;
   if(owner)this.storage.writeScheduleDraft(owner,id,null);
   this.draftStatus.set('clean');
   this.apply(result);this.interaction.notifySuccess('La agenda se guardó correctamente.');this.availability.set(null);
  }catch(e){
   if(!this.current(generation,owner,id))return;
   const parsed=parseClinicHttpError(e,'No pudimos guardar. Los campos ingresados se conservaron.');
   const overlap = this.describeConflict(e);
   this.scheduleConflict.set(overlap);
   if (!overlap) this.error.set(parsed.isVersionConflict ? 'La agenda cambió en otra sesión. Revisá el aviso antes de guardar.' : parsed.userMessage);
   if(parsed.isVersionConflict)this.conflict.set(true);
   if(parsed.shouldRefreshCapabilities){this.setCapabilities(null);await this.retryCapabilities();}
  }finally{if(this.current(generation,owner,id))this.saving.set(false);}
 }
 async preview(){
  if(!this.clinic()||!this.previewDate)return;
  const generation=this.generation,owner=this.auth.currentUser()?.id??null,id=this.id,from=this.previewDate,days=this.previewDays;
  this.previewBusy.set(true);this.previewError.set('');
  try{
   const scope = this.teleconsultationScope();
   const result=await firstValueFrom(scope ? this.api.availability(id,from,days,false,scope.id) : this.api.availability(id,from,days));
   if(this.current(generation,owner,id)&&from===this.previewDate&&days===this.previewDays)this.availability.set(result);
  }catch(e){if(this.current(generation,owner,id))this.previewError.set(parseClinicHttpError(e,'No pudimos calcular la disponibilidad.').userMessage);}
  finally{if(this.current(generation,owner,id))this.previewBusy.set(false);}
 }

 toggleDay(day:number){this.selectedDays=this.selectedDays.includes(day)?this.selectedDays.filter(d=>d!==day):[...this.selectedDays,day];}
 rangesError(ranges:ScheduleRange[]):string {
  let previous: ScheduleRange | undefined;
  for(const r of [...ranges].sort((a,b)=>a.start.localeCompare(b.start))){
   if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(r.start)||!/^(([01]\d|2[0-3]):[0-5]\d|24:00)$/.test(r.end)||r.start>=r.end)return 'Indicá un inicio y un final válidos dentro del mismo día.';
   if(previous && r.start < previous.end) {
    const scope = this.teleconsultationScope();
    const other = previous.specialtyContextId === scope?.id ? r : previous;
    return scope && other.specialtyContextId !== scope.id
      ? `Ya tenés teleconsulta de ${this.specialtyName(other.specialtyContextId)} de ${other.start} a ${other.end}.`
      : 'Los bloques de este día se superponen.';
   }
   previous=r;
   if(!Number.isInteger(r.slotMinutes)||r.slotMinutes!<5||r.slotMinutes!>480)return 'La duración debe estar entre 5 y 480 minutos.';
   if(!this.readySpecialties().some(c=>c.id===r.specialtyContextId))return 'La especialidad del bloque no está disponible.';
  }return '';
 }
 private scheduleUpdate(draft:Draft):ScheduleUpdate {
  return {...draft,expectedVersion:this.version,minNoticeMinutes:draft.minNoticeMinutes!,maxAdvanceDays:draft.maxAdvanceDays!,
   exceptions:draft.exceptions.map(exception=>({...exception,through:exception.through||exception.from}))};
 }
 async addBlocks(){
  const scope=this.specialty();if(!scope||!this.canEdit())return;
  this.blockConflict.set(null);
  if(!this.selectedDays.length){this.blockError.set('Elegí al menos un día.');return;}
  const block:ScheduleRange={start:this.blockStart,end:this.blockEnd,slotMinutes:this.blockMinutes,specialtyContextId:scope.id};
  const draft=structuredClone(this.draft);
  for(const day of draft.weekly.filter(d=>this.selectedDays.includes(d.weekday))){
   const error=day.ranges.length>=16?'Este día ya tiene 16 bloques.':this.rangesError([...day.ranges,block]);
   if(error){
    const existing = day.ranges.find(range => range.start < block.end && block.start < range.end);
    if (existing && day.ranges.length < 16 && this.rangesError([block]) === '') {
     this.blockError.set('');
     this.blockConflict.set(this.describeLocalConflict({
      name: this.clinic()!.name,
      weekday: day.weekday,
      requestedLocal: block,
      existingLocal: existing,
      overlapStartLocal: block.start > existing.start ? block.start : existing.start,
      overlapEndLocal: block.end < existing.end ? block.end : existing.end,
     }));
    } else {
     this.blockError.set(this.weekdays[day.weekday-1]+': '+error);
    }
    return;
   }
   day.ranges.push({...block});day.ranges.sort((a,b)=>a.start.localeCompare(b.start));
  }
  const generation=this.generation,owner=this.owner,id=this.id;
  this.blockError.set('');this.validatingBlocks.set(true);
  try{
   await firstValueFrom(this.api.validateDraft(id,this.scheduleUpdate(draft)));
   if(!this.current(generation,owner,id))return;
   this.draft.weekly=draft.weekly;this.selectedDays=[];this.keepDraft();
  }catch(e){
   if(!this.current(generation,owner,id))return;
   const parsed=parseClinicHttpError(e,'No pudimos comprobar si el horario está ocupado. Volvé a intentar.');
   const overlap = this.describeConflict(e);
   this.blockConflict.set(overlap);
   if (!overlap) this.blockError.set(parsed.userMessage);
   if(parsed.isVersionConflict)this.conflict.set(true);
  }finally{if(this.current(generation,owner,id))this.validatingBlocks.set(false);}
 }
 private describeConflict(error: unknown): ConflictNotice | null {
  const response = (error as { error?: { code?: string; details?: ScheduleConflict | LocalConflict } })?.error;
  const details = response?.details;
  if (!details || typeof details !== 'object') return null;
  if ('requestedLocal' in details && details.requestedLocal && details.existingLocal) {
   return this.describeLocalConflict(details);
  }
  if (!('requested' in details) || !details.requested?.timezone || !details.existing || !details.date ||
      !details.overlapStart || !details.overlapEnd) {
   return null;
  }
  const zone = details.requested.timezone;
  const { date } = details;
  return {
   when: [this.weekdays[details.weekday - 1], this.dateLabel(date)].filter(Boolean).join(' '),
   agenda: details.existing.name,
   requested: this.occupiedRange(details.requested, date, zone),
   existing: this.occupiedRange(details.existing, date, zone),
   overlap: this.occupiedRange({ ...details.existing, start: details.overlapStart, end: details.overlapEnd }, date, zone),
   booked: response?.code === 'BOOKING_SCHEDULE_CONFLICT',
  };
 }
 private describeLocalConflict(details: LocalConflict): ConflictNotice {
  const { requestedLocal, existingLocal, from, through } = details;
  const context = this.teleconsultationScope();
  const agenda = context && existingLocal.specialtyContextId !== context.id
   ? 'Teleconsulta de ' + this.specialtyName(existingLocal.specialtyContextId)
   : context ? 'Teleconsulta de ' + context.name : details.name;
  return {
   when: from && through && from !== through ? this.dateLabel(from) + ' al ' + this.dateLabel(through)
    : from ? this.dateLabel(from) : this.weekdays[(details.weekday ?? 0) - 1] ?? '',
   agenda,
   requested: requestedLocal.start + '–' + requestedLocal.end,
   existing: existingLocal.start + '–' + existingLocal.end,
   overlap: details.overlapStartLocal + '–' + details.overlapEndLocal,
   booked: false,
  };
 }
 specialtyName(id:string|undefined){return this.readySpecialties().find(c=>c.id===id)?.name??'Especialidad no disponible';}
 chooseSpecialty(id:string){this.specialty.set(this.readySpecialties().find(c=>c.id===id)??null);}
 occupiedSpecialty(interval: AgendaWindow): string | undefined {
  return interval.specialtyContextId ? this.occupiedSpecialtyNames().get(interval.specialtyContextId) : undefined;
 }
 async loadOccupied(date=this.occupiedDate, scope=this.teleconsultationScope()?.id){
  const generation=this.generation,owner=this.owner,id=this.id,request=++this.occupiedGeneration;
  const previousDate = this.occupiedDate;
  this.occupiedDate=date;
  this.occupied.set(null);
  this.occupiedError.set('');
  if(!id||!/^\d{4}-\d{2}-\d{2}$/.test(date)){this.occupiedBusy.set(false);return;}
  this.occupiedBusy.set(true);
  const current=()=>request===this.occupiedGeneration&&this.current(generation,owner,id)&&scope===this.teleconsultationScope()?.id;
  try{
   const result=await firstValueFrom(this.api.occupied(id,date,scope));
   if(current()){
    const today = civilDate(new Date().toISOString(), result.timezone);
    const selected = this.selectedOccupiedDate();
    const last = addDays(date, 6);
    this.selectedOccupiedDate.set(date === previousDate && selected >= date && selected <= last
      ? selected : today >= date && today <= last ? today : date);
    this.occupied.set(result);
   }
  }catch(err){
   if(current())this.occupiedError.set(parseClinicHttpError(err,'No pudimos consultar las franjas ocupadas.').userMessage);
  }finally{
   if(current())this.occupiedBusy.set(false);
  }
 }
 dateLabel(iso:string){return iso.split('-').reverse().join('/');}
}
