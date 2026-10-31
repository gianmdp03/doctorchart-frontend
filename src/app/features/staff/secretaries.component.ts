import {Component,DestroyRef,inject,signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {environment} from '../../../environments/environment';
import {FEATURE_FLAGS} from '../../core/config/feature-flags';
import {ClinicsService} from '../clinics/clinics.service';
import {Clinic} from '../clinics/clinics.models';
import {StaffAccess,StaffPermission,staffError} from './staff.service';

interface StaffAccessList {items:StaffAccess[];capabilities:{manage:boolean;reason:string|null;validUntil:string|null};}
@Component({selector:'app-secretaries',imports:[FormsModule,RouterLink],styleUrl:'./staff.css',template:`
<main class="staff-page"><a routerLink="/calendar">Volver a la agenda</a><p class="eyebrow">Administración delegada</p><h1>Secretarias y permisos</h1><p>Compartí solo la agenda de los consultorios que elijas. Las historias clínicas permanecen privadas.</p>
@if(error()){<p role="alert" class="error">{{error()}}</p>}<button (click)="load()" [disabled]="busy()">Actualizar derechos y asignaciones</button>
@if(!canManage()){<p>La administración requiere derechos comerciales vigentes. Podés revocar accesos existentes.</p>}
@if(invitation()){<section class="notice" role="status"><h2>Invitación creada</h2>@if(emailEnabled){<p>El correo de invitación quedó en cola. Si demora, podés compartir el código por un canal privado.</p>}<p>Entregá este código a la secretaria por un canal privado. Vence en 24 horas y se muestra una sola vez. La activación se realiza en /staff/activate.</p><code class="recovery">{{invitation()}}</code><button (click)="invitation.set('')">Ya lo compartí de forma privada</button></section>}
<div class="grid"><section><h2>Personas asignadas</h2>@for(a of items();track a.id){<section class="notice"><h3>{{a.name}}</h3><p>{{a.email}} · {{!a.active?'Acceso revocado':a.activated?'Cuenta activada':'Invitación pendiente'}}</p><p>{{clinicNames(a)}}<br />Permisos: {{permissionNames(a)}}</p><div class="actions"><button (click)="edit(a)" [disabled]="busy()||!canManage()">Editar permisos</button>@if(!a.activated){<button (click)="renew(a)" [disabled]="busy()||!canManage()">Renovar invitación</button>}<button (click)="revoke(a)" [disabled]="busy()||!a.active">Revocar acceso</button></div></section>}@empty{<p>Todavía no hay secretarias asignadas.</p>}</section>
<section><h2>{{selected()?'Editar asignación':'Invitar secretaria'}}</h2><form (ngSubmit)="save()" #form="ngForm"><fieldset [disabled]="busy()||!canManage()"><legend class="sr-only">Datos y permisos</legend>
@if(!selected()){<label>Nombre<input name="name" [(ngModel)]="name" required maxlength="160" /></label><label>Correo electrónico<input type="email" name="email" [(ngModel)]="email" required maxlength="254" /></label>}
<h3>Consultorios autorizados</h3>@for(c of clinics();track c.id){<label class="check"><input type="checkbox" [checked]="clinicIds.includes(c.id)" (change)="toggleClinic(c.id,$any($event.target).checked)" />{{c.name}}</label>}
<h3>Permisos administrativos</h3><p>Ver agenda está incluido. No se concede acceso clínico ni configuración de horarios.</p>@for(p of availablePermissions;track p.value){<label class="check"><input type="checkbox" [checked]="permissions.includes(p.value)" (change)="togglePermission(p.value,$any($event.target).checked)" />{{p.label}}</label>}
<button type="submit" [disabled]="busy()||form.invalid||!clinicIds.length||!canManage()">{{busy()?'Guardando…':selected()?'Guardar permisos':'Crear invitación'}}</button><button type="button" (click)="clear()">Cancelar edición</button>
</fieldset></form></section></div></main>`})
export class SecretariesComponent {
 readonly emailEnabled=FEATURE_FLAGS.NOTIFICATIONS_ENABLED;
 private readonly http=inject(HttpClient);private readonly clinicsApi=inject(ClinicsService);private readonly destroy=inject(DestroyRef);private readonly base=environment.apiUrl.replace(/\/$/,'')+'/secretaries';private epoch=0;
 readonly items=signal<StaffAccess[]>([]);readonly clinics=signal<Clinic[]>([]);readonly selected=signal<StaffAccess|null>(null);readonly busy=signal(false);readonly error=signal('');readonly invitation=signal('');readonly capabilities=signal<StaffAccessList['capabilities']|null>(null);readonly now=signal(Date.now());
 name='';email='';clinicIds:string[]=[];permissions:StaffPermission[]=['view'];readonly availablePermissions:{value:StaffPermission;label:string}[]=[{value:'create',label:'Crear turnos'},{value:'cancel',label:'Cancelar'},{value:'reschedule',label:'Reprogramar'},{value:'status',label:'Marcar llegada, ausencia y atención'}];
 constructor(){void this.load();const timer=setInterval(()=>this.now.set(Date.now()),1000);this.destroy.onDestroy(()=>{clearInterval(timer);this.epoch++;});}
 canManage(){const c=this.capabilities();return !!c&&c.manage&&Date.parse(c.validUntil??'')>this.now();}
 async load(){const generation=++this.epoch;try{const [list,first]=await Promise.all([firstValueFrom(this.http.get<StaffAccessList>(this.base)),firstValueFrom(this.clinicsApi.listClinics({size:100,page:0}))]);let all=first.items;for(let page=1;all.length<first.totalElements;page++){const next=await firstValueFrom(this.clinicsApi.listClinics({size:100,page}));all=[...all,...next.items];if(!next.items.length)break;}if(generation!==this.epoch)return;this.items.set(list.items);this.capabilities.set(list.capabilities);this.clinics.set(all.filter(c=>c.status!=='ARCHIVED'));}catch(e){if(generation===this.epoch){this.capabilities.set(null);this.error.set(staffError(e));}}}
 edit(a:StaffAccess){if(this.busy())return;this.selected.set(a);this.clinicIds=[...a.clinicIds];this.permissions=[...a.permissions];this.error.set('');}
 renew(a:StaffAccess){if(this.busy())return;this.selected.set(null);this.email=a.email;this.name=a.name;this.clinicIds=[...a.clinicIds];this.permissions=[...a.permissions];}
 clear(){if(this.busy())return;this.selected.set(null);this.name='';this.email='';this.clinicIds=[];this.permissions=['view'];}
 toggleClinic(id:string,on:boolean){this.clinicIds=on?[...this.clinicIds,id]:this.clinicIds.filter(x=>x!==id);}
 togglePermission(p:StaffPermission,on:boolean){this.permissions=on?[...this.permissions,p]:this.permissions.filter(x=>x!==p);}
 clinicNames(a:StaffAccess){return a.clinicIds.map(id=>this.clinics().find(c=>c.id===id)?.name??'Consultorio retirado').join(', ');}
 permissionNames(a:StaffAccess){return ['Ver agenda',...this.availablePermissions.filter(p=>a.permissions.includes(p.value)).map(p=>p.label)].join(', ');}
 async save(){if(this.busy()||!this.canManage())return;this.busy.set(true);this.error.set('');try{const a=this.selected();if(a){await firstValueFrom(this.http.put(this.base+'/'+a.id,{expectedVersion:a.version,clinicIds:this.clinicIds,permissions:this.permissions}));}else{const result=await firstValueFrom(this.http.post<{invitationCode:string}>(this.base+'/invitations',{email:this.email,name:this.name,clinicIds:this.clinicIds,permissions:this.permissions}));this.invitation.set(result.invitationCode);}this.busy.set(false);this.clear();await this.load();}catch(e){this.error.set(staffError(e));}finally{this.busy.set(false);}}
 async revoke(a:StaffAccess){if(this.busy())return;this.busy.set(true);try{await firstValueFrom(this.http.delete(this.base+'/'+a.id));await this.load();}catch(e){this.error.set(staffError(e));}finally{this.busy.set(false);}}
}
