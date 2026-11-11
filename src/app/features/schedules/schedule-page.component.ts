import { WorkspaceStore } from '../../core/services/workspace.store';
import { Component, DestroyRef, computed, effect, inject, signal, viewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';
import { DatePickerComponent } from '../../shared/date-picker/date-picker.component';
import { AuthService } from '../../core/services/auth.service';
import { BrowserUiStorageService } from '../../core/services/browser-ui-storage.service';
import { isArgentineTimezone } from '../../core/date/user-time-zone';
import { ClinicsService } from '../clinics/clinics.service';
import { Clinic, ClinicCapabilities, isCapabilityVerified, parseClinicHttpError } from '../clinics/clinics.models';
import { Availability, ClinicSchedule, ScheduleDay, ScheduleException, ScheduleRange, ScheduleUpdate } from './schedules.models';
import { SchedulesService } from './schedules.service';

interface Draft {minNoticeMinutes:number|null;maxAdvanceDays:number|null;weekly:ScheduleDay[];exceptions:ScheduleException[];}
interface StoredDraft {version:string;draft:Draft;}
function emptyDraft():Draft{return {minNoticeMinutes:null,maxAdvanceDays:null,weekly:Array.from({length:7},(_,i)=>({weekday:i+1,ranges:[]})),exceptions:[]};}
@Component({
 selector:'app-schedule-page',imports:[CommonModule,FormsModule,RouterLink,DatePickerComponent],
 templateUrl:'./schedule-page.component.html',styleUrl:'./schedule-page.component.css',
})
export class SchedulePageComponent {
 private readonly api=inject(SchedulesService);
 private readonly workspace=inject(WorkspaceStore);
 readonly readySpecialties=signal<{id:string;name:string}[]>([]);
 readonly specialty=signal<{id:string;name:string}|null>(null);
 selectedDays:number[]=[];
 blockStart='09:00';blockEnd='13:00';blockMinutes=20;
 blockError=signal('');
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
 private readonly renewLocalPermissions = !environment.production && environment.appUrl === 'https://localhost:4302';
 readonly clinic=signal<Clinic|null>(null);
 readonly choices=signal<Clinic[]>([]);
 readonly choicePage=signal(0);readonly choiceTotal=signal(0);readonly choicesBusy=signal(false);
 readonly capabilities=signal<ClinicCapabilities|null>(null);
 readonly busy=signal(false);
 readonly saving=signal(false);
 readonly error=signal('');
 readonly feedback=signal('');
 readonly conflict=signal(false);
 readonly draftStatus=signal<'clean'|'stored'|'unavailable'>('clean');
 readonly availability=signal<Availability|null>(null);
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
    offset: parts.find(({type}) => type === 'timeZoneName')?.value ?? result.timezone,
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
    if(this.renewLocalPermissions)void this.retryCapabilities();
   },Math.min(expiry-Date.now()+10,2147483647));
  }
 }
 async load(){
  const generation=++this.generation,owner=this.auth.currentUser()?.id??null,id=this.id;
  this.specialty.set(null);this.selectedDays=[];this.blockError.set('');
  this.saving.set(false);this.previewBusy.set(false);this.choicesBusy.set(false);this.choicePage.set(0);this.choiceTotal.set(0);this.choices.set([]);this.clinic.set(null);this.availability.set(null);this.setCapabilities(null);this.draft=emptyDraft();this.version='0';this.conflict.set(false);this.feedback.set('');this.error.set('');
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
   const ready=setup.filter(c=>c.ready).map(c=>({id:String(c.id),name:c.specialty.name}));
   this.readySpecialties.set(ready);this.specialty.set(ready.length===1?ready[0]:null);
   this.clinic.set(clinic);this.choices.set(choices.items);this.choiceTotal.set(choices.totalElements);this.apply(schedule);this.setCapabilities(caps);
   this.restoreDraft(owner,id);
  }catch(e){if(this.current(generation,owner,id))this.error.set(parseClinicHttpError(e,'No pudimos cargar la agenda.').userMessage);}
  finally{if(this.current(generation,owner,id))this.busy.set(false);}
 }
 private apply(schedule:ClinicSchedule){
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
  this.feedback.set('');
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
  return !this.busy()&&!this.saving()&&this.clinic()?.status!=='ARCHIVED'&&!!this.clinic()&&isCapabilityVerified(caps)&&!!caps?.actions.edit;
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
  const draft=structuredClone(this.draft);
  const request:ScheduleUpdate={...draft,expectedVersion:this.version,minNoticeMinutes:draft.minNoticeMinutes!,maxAdvanceDays:draft.maxAdvanceDays!,
   exceptions:draft.exceptions.map(exception=>({...exception,through:exception.through||exception.from}))};
  this.keepDraft();
  this.saving.set(true);this.error.set('');this.feedback.set('');
  try{
   const result=await firstValueFrom(this.api.save(id,request));
   if(!this.current(generation,owner,id))return;
   if(owner)this.storage.writeScheduleDraft(owner,id,null);
   this.draftStatus.set('clean');
   this.apply(result);this.feedback.set('La agenda se guardó correctamente.');this.availability.set(null);
  }catch(e){
   if(!this.current(generation,owner,id))return;
   const parsed=parseClinicHttpError(e,'No pudimos guardar. Los campos ingresados se conservaron.');
   this.error.set(parsed.isVersionConflict ? 'La agenda cambió en otra sesión. Revisá el aviso antes de guardar.' : parsed.userMessage);
   if(parsed.isVersionConflict)this.conflict.set(true);
   if(parsed.shouldRefreshCapabilities){this.setCapabilities(null);await this.retryCapabilities();}
  }finally{if(this.current(generation,owner,id))this.saving.set(false);}
 }
 async preview(){
  if(!this.clinic()||!this.previewDate)return;
  const generation=this.generation,owner=this.auth.currentUser()?.id??null,id=this.id,from=this.previewDate,days=this.previewDays;
  this.previewBusy.set(true);this.previewError.set('');
  try{
   const result=await firstValueFrom(this.api.availability(id,from,days));
   if(this.current(generation,owner,id)&&from===this.previewDate&&days===this.previewDays)this.availability.set(result);
  }catch(e){if(this.current(generation,owner,id))this.previewError.set(parseClinicHttpError(e,'No pudimos calcular la disponibilidad.').userMessage);}
  finally{if(this.current(generation,owner,id))this.previewBusy.set(false);}
 }

 toggleDay(day:number){this.selectedDays=this.selectedDays.includes(day)?this.selectedDays.filter(d=>d!==day):[...this.selectedDays,day];}
 rangesError(ranges:ScheduleRange[]):string {
  let end=-1;
  for(const r of [...ranges].sort((a,b)=>a.start.localeCompare(b.start))){
   if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(r.start)||!/^(([01]\d|2[0-3]):[0-5]\d|24:00)$/.test(r.end)||r.start>=r.end)return 'Indicá un inicio y un final válidos dentro del mismo día.';
   const begin=Number(r.start.slice(0,2))*60+Number(r.start.slice(3));
   if(begin<end)return 'Los bloques de este día se superponen.';
   end=Number(r.end.slice(0,2))*60+Number(r.end.slice(3));
   if(!Number.isInteger(r.slotMinutes)||r.slotMinutes!<5||r.slotMinutes!>480)return 'La duración debe estar entre 5 y 480 minutos.';
   if(!this.readySpecialties().some(c=>c.id===r.specialtyContextId))return 'La especialidad del bloque no está disponible.';
  }return '';
 }
 addBlocks(){
  const scope=this.specialty();if(!scope||!this.canEdit())return;
  if(!this.selectedDays.length){this.blockError.set('Elegí al menos un día.');return;}
  const block:ScheduleRange={start:this.blockStart,end:this.blockEnd,slotMinutes:this.blockMinutes,specialtyContextId:scope.id};
  for(const day of this.draft.weekly.filter(d=>this.selectedDays.includes(d.weekday))){const error=day.ranges.length>=16?'Este día ya tiene 16 bloques.':this.rangesError([...day.ranges,block]);if(error){this.blockError.set(this.weekdays[day.weekday-1]+': '+error);return;}}
  for(const day of this.draft.weekly.filter(d=>this.selectedDays.includes(d.weekday))){day.ranges.push({...block});day.ranges.sort((a,b)=>a.start.localeCompare(b.start));}
  this.blockError.set('');this.selectedDays=[];this.keepDraft();
 }
 specialtyName(id:string|undefined){return this.readySpecialties().find(c=>c.id===id)?.name??'Especialidad no disponible';}
 chooseSpecialty(id:string){this.specialty.set(this.readySpecialties().find(c=>c.id===id)??null);}
 dateLabel(iso:string){return iso.split('-').reverse().join('/');}
}
