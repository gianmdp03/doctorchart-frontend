import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePickerComponent } from '../../shared/date-picker/date-picker.component';
import { AuthService } from '../../core/services/auth.service';
import { ClinicsService } from '../clinics/clinics.service';
import { Clinic, ClinicCapabilities, isCapabilityVerified, parseClinicHttpError } from '../clinics/clinics.models';
import { Availability, ClinicSchedule, ScheduleDay, ScheduleException, ScheduleUpdate } from './schedules.models';
import { SchedulesService } from './schedules.service';

interface Draft {slotMinutes:number|null;minNoticeMinutes:number|null;maxAdvanceDays:number|null;weekly:ScheduleDay[];exceptions:ScheduleException[];}
function emptyDraft():Draft{return {slotMinutes:null,minNoticeMinutes:null,maxAdvanceDays:null,weekly:Array.from({length:7},(_,i)=>({weekday:i+1,ranges:[]})),exceptions:[]};}
@Component({
 selector:'app-schedule-page',imports:[CommonModule,FormsModule,RouterLink,DatePickerComponent],
 templateUrl:'./schedule-page.component.html',styleUrl:'./schedule-page.component.css',
})
export class SchedulePageComponent {
 private readonly api=inject(SchedulesService);
 private readonly clinicsApi=inject(ClinicsService);
 private readonly auth=inject(AuthService);
 private readonly route=inject(ActivatedRoute);
 private readonly router=inject(Router);
 private readonly destroy=inject(DestroyRef);
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
 readonly error=signal('');
 readonly feedback=signal('');
 readonly conflict=signal(false);
 readonly availability=signal<Availability|null>(null);
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
   this.expiryTimer=setTimeout(()=>{this.permissionClock.set(Date.now());},Math.min(expiry-Date.now()+10,2147483647));
  }
 }
 async load(){
  const generation=++this.generation,owner=this.auth.currentUser()?.id??null,id=this.id;
  this.saving.set(false);this.previewBusy.set(false);this.choicesBusy.set(false);this.choicePage.set(0);this.choiceTotal.set(0);this.choices.set([]);this.clinic.set(null);this.availability.set(null);this.setCapabilities(null);this.draft=emptyDraft();this.version='0';this.conflict.set(false);this.feedback.set('');this.error.set('');
  if(!owner||!id){this.busy.set(false);return;}
  this.busy.set(true);
  try {
   const [clinic,schedule,caps,choices]=await Promise.all([
    firstValueFrom(this.clinicsApi.getClinic(id)),firstValueFrom(this.api.get(id)),
    firstValueFrom(this.clinicsApi.getCapabilities()),firstValueFrom(this.clinicsApi.listClinics({page:0,size:100})),
   ]);
   if(!this.current(generation,owner,id))return;
   this.clinic.set(clinic);this.choices.set(choices.items);this.choiceTotal.set(choices.totalElements);this.apply(schedule);this.setCapabilities(caps);
  }catch(e){if(this.current(generation,owner,id))this.error.set(parseClinicHttpError(e,'No pudimos cargar la agenda.').userMessage);}
  finally{if(this.current(generation,owner,id))this.busy.set(false);}
 }
 private apply(schedule:ClinicSchedule){
  this.version=schedule.version;
  this.draft={slotMinutes:schedule.slotMinutes,minNoticeMinutes:schedule.minNoticeMinutes,maxAdvanceDays:schedule.maxAdvanceDays,
   weekly:Array.from({length:7},(_,i)=>({weekday:i+1,ranges:structuredClone(schedule.weekly.find(d=>d.weekday===i+1)?.ranges??[])})),
   exceptions:structuredClone(schedule.exceptions)};
 }
 canEdit(){
  this.permissionClock();
  const caps=this.capabilities();
  return !this.busy()&&!this.saving()&&this.clinic()?.status!=='ARCHIVED'&&!!this.clinic()&&isCapabilityVerified(caps)&&!!caps?.actions.edit;
 }
 canSave(){
  return this.canEdit()&&!this.conflict()&&Number.isInteger(this.draft.slotMinutes)&&Number.isInteger(this.draft.minNoticeMinutes)&&Number.isInteger(this.draft.maxAdvanceDays)&&this.draft.slotMinutes!>=5&&this.draft.slotMinutes!<=480&&this.draft.minNoticeMinutes!>=0&&this.draft.minNoticeMinutes!<=525600&&this.draft.maxAdvanceDays!>=1&&this.draft.maxAdvanceDays!<=366;
 }
 addRange(day:ScheduleDay|ScheduleException){day.ranges.push({start:'09:00',end:'12:00'});}
 addException(){this.draft.exceptions.push({from:this.previewDate,through:this.previewDate,label:'',ranges:[]});}
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
  const request:ScheduleUpdate={...structuredClone(this.draft),expectedVersion:this.version,slotMinutes:this.draft.slotMinutes!,minNoticeMinutes:this.draft.minNoticeMinutes!,maxAdvanceDays:this.draft.maxAdvanceDays!};
  this.saving.set(true);this.error.set('');this.feedback.set('');
  try{
   const result=await firstValueFrom(this.api.save(id,request));
   if(!this.current(generation,owner,id))return;
   this.apply(result);this.feedback.set('La agenda se guardó correctamente.');this.availability.set(null);
  }catch(e){
   if(!this.current(generation,owner,id))return;
   const parsed=parseClinicHttpError(e,'No pudimos guardar. Los campos ingresados se conservaron.');
   this.error.set(parsed.isVersionConflict ? "La agenda cambió en otra sesión. Tu borrador se conservó; recargá la versión vigente antes de guardar." : parsed.userMessage);
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
 dateLabel(iso:string){return iso.split('-').reverse().join('/');}
 timeLabel(iso:string){
  try{return new Intl.DateTimeFormat('es-AR',{timeZone:this.clinic()?.timezone,hour:'2-digit',minute:'2-digit',hourCycle:'h23',timeZoneName:'shortOffset'}).format(new Date(iso));}
  catch{return iso.slice(11,16)+' UTC';}
 }
}

