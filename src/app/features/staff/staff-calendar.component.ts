import {Component,DestroyRef,inject,signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router,RouterLink} from '@angular/router';
import {DatePickerComponent} from '../../shared/date-picker/date-picker.component';
import {addDays,civilDate,displayDay,localTime,STATUS_LABELS,transitions,BookingStatus} from '../calendar/bookings.models';
import {AdministrativeBooking,Assignment,SlotDay,StaffPermission,StaffService,staffError} from './staff.service';

@Component({selector:'app-staff-calendar',imports:[FormsModule,RouterLink,DatePickerComponent],styleUrl:'./staff.css',template:`
<main class="staff-page"><header class="actions"><a routerLink="/">Doctor Chart</a><span>Agenda de secretaría</span><button (click)="logout()" [disabled]="writing()">Cerrar sesión</button></header>
<div class="page-heading"><p class="eyebrow">Administración delegada</p><h1>Agenda de consultorios</h1><p>Gestioná turnos únicamente dentro de tus asignaciones. Este acceso no incluye historias clínicas.</p></div>
@if(error()){<p class="error" role="alert">{{error()}}</p>}@if(feedback()){<p class="success" role="status">{{feedback()}}</p>}
<div class="toolbar"><label>Consultorio asignado<select aria-label="Consultorio asignado" [ngModel]="assignmentKey" (ngModelChange)="changeAssignment($event)" [disabled]="writing()"><option value="">Seleccioná un consultorio</option>@for(a of assignments();track key(a)){<option [value]="key(a)">{{a.doctorName||'Profesional asignado'}} · {{a.clinicName}}</option>}</select></label>
<label>Fecha<app-date-picker inputId="staff-date" [value]="date" (valueChange)="changeDate($event)" /></label><label>Vista<select [(ngModel)]="view" (ngModelChange)="load()"><option value="1">Día</option><option value="7">Semana</option></select></label>
<button (click)="refresh()" [disabled]="loading()||writing()">Actualizar permisos y agenda</button></div>
@if(loading()){<p role="status">Consultando agenda…</p>}@else if(!assignments().length){<p>No tenés consultorios habilitados. Consultá con el médico que te invitó.</p>}
@if(selectedAssignment();as a){<p class="muted">Hora local del consultorio. @if(!can('view')){Actualizá la agenda para renovar los permisos.}</p>
<div class="grid" [class.has-editor]="editor()"><section class="panel" aria-label="Agenda administrativa">@for(day of days();track day.date){<section class="day"><h2>{{displayDay(day.date)}}</h2>
@for(b of dayBookings(day.date);track b.id){<button class="booking" [class.cancelled]="b.status==='CANCELLED'" (click)="selectBooking(b)" [disabled]="writing()||!can('view')"><strong>{{time(b.start)}} · {{b.attendeeName||b.contactName}}</strong><small>{{labels[b.status]}} · {{b.contactName}}</small></button>}
<div class="slot-list">@for(slot of day.slots;track slot.start){<button (click)="chooseSlot(slot.start)" [disabled]="writing()||!can(editor()==='move'?'reschedule':'create')">{{time(slot.start)}} · Disponible</button>}</div>
@if(!day.slots.length&&!dayBookings(day.date).length){<p class="muted">Sin turnos ni horarios disponibles.</p>}</section>}</section>
@if(editor()){<aside class="panel editor">@if(editor()==='create'){<h2>Nuevo turno</h2><p>{{time(start)}} · {{a.clinicName}}</p><form (ngSubmit)="create()" #form="ngForm"><fieldset [disabled]="writing()"><legend class="sr-only">Datos administrativos</legend>
<label>Nombre del solicitante<input name="contact" [(ngModel)]="contactName" required maxlength="160" autocomplete="name" /></label><label>Teléfono<input name="phone" [(ngModel)]="contactPhone" type="tel" maxlength="80" autocomplete="tel" /></label><label>Nombre de quien será atendido<input name="attendee" [(ngModel)]="attendeeName" required maxlength="160" /></label>
<p>Este turno no crea un paciente ni una historia clínica.</p>@if(editorError()){<p class="error" role="alert">{{editorError()}}</p>}<button type="submit" [disabled]="writing()||form.invalid||!can('create')">{{writing()?'Guardando…':'Confirmar turno'}}</button><button type="button" (click)="closeEditor()">Cerrar</button></fieldset></form>}
@if(selected();as b){<h2>{{b.attendeeName||b.contactName}}</h2><p>{{displayDay(civilDate(b.start,a.timezone))}} · {{time(b.start)}} · {{labels[b.status]}}</p><p>Solicitante: {{b.contactName}}<br />Teléfono: {{b.contactPhone||'Sin teléfono'}}</p>
@if(editorError()){<p class="error" role="alert">{{editorError()}}</p>}
<div class="actions">@for(state of transitions(b.status);track state){<button [disabled]="writing()||!can(state==='CANCELLED'?'cancel':'status')" (click)="status(state)">{{labels[state]}}</button>}@if(b.status==='CONFIRMED'){<button [disabled]="writing()||!can('reschedule')" (click)="beginMove()">Reprogramar</button>}<button (click)="closeEditor()" [disabled]="writing()">Cerrar</button></div>
@if(editor()==='move'){<p>Seleccioná un horario disponible en la agenda para reprogramar. Podés cambiar la fecha.</p>@if(start){<p>Nuevo horario: {{time(start)}}</p><button class="primary" (click)="move()" [disabled]="writing()||!can('reschedule')">Confirmar reprogramación</button>}}
}</aside>}</div>}
<details><summary>Cambiar contraseña</summary><form (ngSubmit)="password()"><label>Contraseña actual<input type="password" name="currentPassword" [(ngModel)]="currentPassword" autocomplete="current-password" required /></label><label>Contraseña nueva<input type="password" name="newPassword" [(ngModel)]="newPassword" autocomplete="new-password" required minlength="12" maxlength="72" /></label><button type="submit" [disabled]="writing()">Actualizar contraseña</button></form></details>
</main>`})
export class StaffCalendarComponent {
 private readonly api=inject(StaffService);private readonly router=inject(Router);private readonly destroy=inject(DestroyRef);
 readonly assignments=signal<Assignment[]>([]);readonly days=signal<SlotDay[]>([]);readonly bookings=signal<AdministrativeBooking[]>([]);readonly selectedAssignment=signal<Assignment|null>(null);
 readonly selected=signal<AdministrativeBooking|null>(null);readonly editor=signal<'create'|'detail'|'move'|null>(null);readonly loading=signal(false);readonly writing=signal(false);readonly error=signal('');readonly editorError=signal('');readonly feedback=signal('');readonly now=signal(Date.now());
 readonly labels=STATUS_LABELS;readonly transitions=transitions;readonly displayDay=displayDay;readonly civilDate=civilDate;
 assignmentKey='';date=civilDate(new Date().toISOString(),'America/Argentina/Buenos_Aires');view='7';start='';contactName='';attendeeName='';contactPhone='';currentPassword='';newPassword='';
 private epoch=0;private receipt:{signature:string;key:string}|null=null;private refreshEpoch=0;
 constructor(){void this.refresh();let ticks=0;const timer=setInterval(()=>{this.now.set(Date.now());if(++ticks%30===0&&!this.writing())void this.refresh();},1000);this.destroy.onDestroy(()=>{clearInterval(timer);this.epoch++;this.refreshEpoch++;});}
 key(a:Assignment){return a.ownerId+'|'+a.clinicId;}
 can(p:StaffPermission){const a=this.selectedAssignment();return !!a&&a.permissions.includes(p)&&Date.parse(a.validUntil)>this.now();}
 time(instant:string){return localTime(instant,this.selectedAssignment()?.timezone??'UTC');}
 dayBookings(date:string){const a=this.selectedAssignment();return a?this.bookings().filter(b=>civilDate(b.start,a.timezone)===date):[];}
 async refresh(){const generation=++this.refreshEpoch;try{const result=await this.api.assignments();if(generation!==this.refreshEpoch)return;this.assignments.set(result.items);const a=result.items.find(a=>this.key(a)===this.assignmentKey);this.selectedAssignment.set(a??null);if(!a){this.epoch++;this.days.set([]);this.bookings.set([]);this.closeEditor();}else await this.load();}catch(e){if(generation!==this.refreshEpoch)return;this.invalidate(e);}}
 changeAssignment(key:string){if(this.writing())return;this.assignmentKey=key;this.selectedAssignment.set(this.assignments().find(a=>this.key(a)===key)??null);this.closeEditor();this.epoch++;this.days.set([]);this.bookings.set([]);void this.load();}
 changeDate(value:string){if(this.writing())return;this.date=value;void this.load();}
 async load(){const a=this.selectedAssignment();if(!a)return;const generation=++this.epoch;this.loading.set(true);this.error.set('');try{
  const from=new Date(this.date+'T00:00:00Z');from.setUTCHours(from.getUTCHours()-26);const to=new Date(addDays(this.date,Number(this.view))+'T00:00:00Z');to.setUTCHours(to.getUTCHours()+26);
  const [availability,first]=await Promise.all([this.api.availability(a,this.date,Number(this.view)),this.api.bookings(a,from.toISOString(),to.toISOString())]);let items=first.items;let more=first.hasMore;let page=0;
  while(more){const next=await this.api.bookings(a,from.toISOString(),to.toISOString(),++page);items=[...items,...next.items];more=next.hasMore;if(generation!==this.epoch)return;}
  if(generation!==this.epoch)return;this.days.set(availability.days);this.bookings.set(items);
 }catch(e){if(generation!==this.epoch)return;this.days.set([]);this.bookings.set([]);this.invalidate(e);}finally{if(generation===this.epoch)this.loading.set(false);}}
 chooseSlot(start:string){if(this.writing())return;this.start=start;if(this.editor()!=='move'){this.selected.set(null);this.editor.set('create');}this.editorError.set('');}
 selectBooking(b:AdministrativeBooking){if(this.writing())return;this.selected.set(b);this.editor.set('detail');this.editorError.set('');this.start='';}
 beginMove(){this.editor.set('move');this.start='';this.editorError.set('');}
 closeEditor(){if(this.writing())return;this.selected.set(null);this.editor.set(null);this.start='';this.editorError.set('');this.receipt=null;}
 private async write(permission:StaffPermission,body:unknown,fn:(key:string)=>Promise<unknown>){if(this.writing()||!this.can(permission))return;const a=this.selectedAssignment()!;const generation=this.epoch;const signature=JSON.stringify([this.key(a),permission,body]);if(this.receipt?.signature!==signature)this.receipt={signature,key:crypto.randomUUID()};this.writing.set(true);this.editorError.set('');try{await fn(this.receipt.key);this.feedback.set('Turno actualizado.');this.receipt=null;this.writing.set(false);if(generation===this.epoch){this.closeEditor();await this.load();}}catch(e){if(generation===this.epoch){this.editorError.set(staffError(e));if((e as {status?:number}).status===409){this.receipt=null;await this.load();}if([401,403].includes((e as {status:number}).status))this.invalidate(e);}}finally{this.writing.set(false);}}
 create(){const a=this.selectedAssignment();if(!a||!this.start)return;const body={clinicId:a.clinicId,start:this.start,contactName:this.contactName.trim(),contactPhone:this.contactPhone.trim(),attendeeName:this.attendeeName.trim()};return this.write('create',body,key=>this.api.create(a,body,key));}
 status(state:BookingStatus){const a=this.selectedAssignment(),b=this.selected();if(!a||!b)return;return this.write(state==='CANCELLED'?'cancel':'status',[b.id,b.version,state],key=>this.api.status(a,b,state,key));}
 move(){const a=this.selectedAssignment(),b=this.selected();if(!a||!b||!this.start)return;return this.write('reschedule',[b.id,b.version,this.start],key=>this.api.reschedule(a,b,a.clinicId,this.start,key));}
 private invalidate(e:unknown){this.error.set(staffError(e));this.assignments.set([]);this.selectedAssignment.set(null);this.days.set([]);this.bookings.set([]);if((e as {status:number}).status===401){this.api.session.set(null);void this.router.navigateByUrl('/staff/login');}}
 async logout(){if(this.writing())return;try{await this.api.logout();await this.router.navigateByUrl('/staff/login');}catch(e){this.error.set(staffError(e));}}
 async password(){if(this.writing())return;this.writing.set(true);try{await this.api.changePassword(this.currentPassword,this.newPassword);this.currentPassword='';this.newPassword='';this.feedback.set('Contraseña actualizada. Las otras sesiones fueron revocadas.');}catch(e){this.error.set(staffError(e));}finally{this.writing.set(false);}}
}
