import {Component,DestroyRef,inject,signal} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {firstValueFrom} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ClinicsService} from '../clinics/clinics.service';
import {Clinic} from '../clinics/clinics.models';
import {StaffAccess,StaffPermission,staffError} from './staff.service';

interface StaffAccessList {items:StaffAccess[];capabilities:{manage:boolean;reason:string|null;validUntil:string|null};}
interface Invitation {url:string;phone:string;expiresAt:string;email:string;emailQueued:boolean;}
@Component({selector:'app-secretaries',imports:[FormsModule,RouterLink],styleUrl:'./staff.css',template:`
<main class="staff-page secretaries">
  <a class="back-link" routerLink="/calendar">← Agenda de turnos</a>
  <header class="page-heading">

    <h1>Secretarias</h1>
    <p class="muted">Invitá a alguien para gestionar turnos de las agendas que elijas. Cada persona tiene su propio acceso.</p>
  </header>
  @if(error()){<p role="alert" class="notice error">{{error()}}</p>}
  @if(capabilities() && !canManage()){<p class="notice">La administración requiere permisos comerciales vigentes. Podés revocar accesos existentes.</p>}
  @if(invitation();as invite){
    <section class="notice" role="status">
      <h2>Invitación creada</h2>
      <p>Este enlace privado vence en 6 horas y se puede usar una sola vez. La secretaria lo abre, elige su contraseña y entra a la agenda.</p>
      @if (invite.emailQueued) {
        <p class="muted">El envío quedó en cola para <strong>{{ invite.email }}</strong>.</p>
      }
      <label>Enlace de invitación<input readonly [value]="invite.url" (click)="$any($event.target).select()" /></label>
      <div class="actions">
        <button (click)="copyInvitation()">{{copied()?'Enlace copiado':'Copiar enlace'}}</button>
        @if(invite.phone){<a [href]="whatsappUrl(invite)" target="_blank" rel="noopener noreferrer">Compartir por WhatsApp</a>}
        <button (click)="invitation.set(null)">Cerrar</button>
      </div>
      <p class="muted">Si vence, podés generar uno nuevo desde la lista.</p>
    </section>
  }
  <div class="grid">
    <section class="panel" aria-labelledby="staff-assigned">
      <h2 id="staff-assigned">Personas asignadas</h2>
      @for(a of items();track a.id){
        <section class="assignment">
          <h3>{{a.name}}</h3>
          <p class="muted">{{a.email}} @if(a.phone){ · {{a.phone}}} · {{!a.active?'Acceso revocado':a.activated?'Cuenta activada':'Invitación pendiente'}}</p>
          <p>{{clinicNames(a)}}<br />Permisos: {{permissionNames(a)}}</p>
          <div class="actions">
            <button (click)="edit(a)" [disabled]="busy()||!canManage()">Editar permisos</button>
            @if(!a.activated){<button (click)="renew(a)" [disabled]="busy()||!canManage()">Generar nuevo enlace</button>}
            <button (click)="revoke(a)" [disabled]="busy()||!a.active">Revocar acceso</button>
          </div>
        </section>
      }@empty{
        @if(capabilities()){
          <div class="empty-state"><h3>Sin personas asignadas</h3><p class="muted">Las invitaciones y accesos que crees aparecerán acá.</p></div>
        }
      }
      <div class="actions form-actions"><button (click)="load()" [disabled]="busy()">Actualizar asignaciones</button></div>
    </section>
    <section class="panel" aria-labelledby="staff-invite">
      <h2 id="staff-invite">{{selected()?'Editar permisos':'Agregar secretaria'}}</h2>
      @if(!capabilities()){
        <p class="muted">{{error() ? 'Reintentá desde Actualizar asignaciones.' : 'Cargando consultorios y permisos…'}}</p>
      }@else if(!clinics().length){
        <div class="empty-state">
          <h3>Primero, creá un consultorio</h3>
          <p class="muted">Cada invitación debe incluir al menos un consultorio.</p>
          <a routerLink="/clinics">Ir a Consultorios →</a>
        </div>
      }@else{
        <form (ngSubmit)="save()" #form="ngForm">
          <fieldset [disabled]="busy()||!canManage()">
            <legend class="sr-only">Datos y permisos</legend>
            @if(!selected()){
              <label>Nombre<input name="name" [(ngModel)]="name" required maxlength="160" /></label>
              <label>Correo electrónico<input type="email" name="email" [(ngModel)]="email" required maxlength="254" /></label>
              <label>Teléfono (opcional)<input type="tel" name="phone" [(ngModel)]="phone" pattern="\\+[1-9][0-9]{7,14}" maxlength="16" placeholder="+5491123456789" autocomplete="tel" /><span class="muted">Incluí el código de país para compartir por WhatsApp.</span></label>
            }
            <div class="form-group" role="group" aria-labelledby="staff-clinics">
              <h3 id="staff-clinics">Consultorios autorizados</h3>
              @for(c of clinics();track c.id){
                <label class="check"><input type="checkbox" [checked]="clinicIds.includes(c.id)" (change)="toggleClinic(c.id,$any($event.target).checked)" />{{c.name}} @if(c.modality==='TELECONSULTATION'){· Teleconsulta}</label>
              }
            </div>
            <div class="form-group" role="group" aria-labelledby="staff-permissions">
              <h3 id="staff-permissions">Permisos administrativos</h3>
              <p class="muted">Ver la agenda está incluido. Las historias clínicas y la configuración de horarios quedan reservadas al profesional.</p>
              <label>Acceso<select name="permissionPreset" [ngModel]="permissionPreset()" (ngModelChange)="setPermissionPreset($event)"><option value="manage">Gestionar turnos</option><option value="view">Solo ver agenda</option><option value="custom">Personalizar permisos</option></select></label>
              @if(permissionPreset()==='custom'){
                @for(p of availablePermissions;track p.value){
                  <label class="check"><input type="checkbox" [checked]="permissions.includes(p.value)" (change)="togglePermission(p.value,$any($event.target).checked)" />{{p.label}}</label>
                }
              }
            </div>
            <div class="actions form-actions">
              <button type="submit" [disabled]="busy()||form.invalid||!clinicIds.length||!canManage()">{{busy()?'Guardando…':selected()?'Guardar permisos':'Crear invitación'}}</button>
              @if(selected()){<button type="button" (click)="clear()">Cancelar edición</button>}
            </div>
          </fieldset>
        </form>
      }
    </section>
  </div>
</main>`})
export class SecretariesComponent {
 private readonly document=inject(DOCUMENT);
 private readonly http=inject(HttpClient);private readonly clinicsApi=inject(ClinicsService);private readonly destroy=inject(DestroyRef);private readonly base=environment.apiUrl.replace(/\/$/,'')+'/secretaries';private epoch=0;
 readonly items=signal<StaffAccess[]>([]);readonly clinics=signal<Clinic[]>([]);readonly selected=signal<StaffAccess|null>(null);readonly busy=signal(false);readonly error=signal('');readonly invitation=signal<Invitation|null>(null);readonly copied=signal(false);readonly capabilities=signal<StaffAccessList['capabilities']|null>(null);readonly now=signal(Date.now());
 name='';email='';phone='';clinicIds:string[]=[];permissions:StaffPermission[]=['view','create','cancel','reschedule','status'];private readonly customPermissions=signal(false);readonly availablePermissions:{value:StaffPermission;label:string}[]=[{value:'create',label:'Crear turnos'},{value:'cancel',label:'Cancelar'},{value:'reschedule',label:'Reprogramar'},{value:'status',label:'Marcar llegada, ausencia y atención'}];
 constructor(){void this.load();const timer=setInterval(()=>this.now.set(Date.now()),1000);this.destroy.onDestroy(()=>{clearInterval(timer);this.epoch++;});}
 canManage(){const c=this.capabilities();return !!c&&c.manage&&Date.parse(c.validUntil??'')>this.now();}
 async load(){const generation=++this.epoch;try{const [list,first]=await Promise.all([firstValueFrom(this.http.get<StaffAccessList>(this.base)),firstValueFrom(this.clinicsApi.listClinics({size:100,page:0}))]);let all=first.items;for(let page=1;all.length<first.totalElements;page++){const next=await firstValueFrom(this.clinicsApi.listClinics({size:100,page}));all=[...all,...next.items];if(!next.items.length)break;}if(generation!==this.epoch)return;this.items.set(list.items);this.capabilities.set(list.capabilities);this.error.set('');this.clinics.set(all.filter(c=>c.status!=='ARCHIVED'));if(!this.selected()&&!this.clinicIds.length&&this.clinics().length===1)this.clinicIds=[this.clinics()[0].id];}catch(e){if(generation===this.epoch){this.capabilities.set(null);this.error.set(staffError(e));}}}
 edit(a:StaffAccess){if(this.busy())return;this.selected.set(a);this.clinicIds=[...a.clinicIds];this.permissions=[...a.permissions];this.customPermissions.set(false);this.error.set('');}
 async renew(a:StaffAccess){if(this.busy())return;this.selected.set(null);this.email=a.email;this.name=a.name;this.phone=a.phone??'';this.clinicIds=[...a.clinicIds];this.permissions=[...a.permissions];await this.save();}
 clear(){if(this.busy())return;this.selected.set(null);this.name='';this.email='';this.phone='';this.clinicIds=this.clinics().length===1?[this.clinics()[0].id]:[];this.permissions=['view','create','cancel','reschedule','status'];this.customPermissions.set(false);}
 permissionPreset():'manage'|'view'|'custom'{return this.customPermissions()?'custom':this.permissions.length===5?'manage':this.permissions.length===1?'view':'custom';}
 setPermissionPreset(value:'manage'|'view'|'custom'){this.customPermissions.set(value==='custom');if(value==='manage')this.permissions=['view','create','cancel','reschedule','status'];if(value==='view')this.permissions=['view'];}
 whatsappUrl(invite:Invitation){return 'https://wa.me/'+invite.phone.replace(/\D/g,'')+'?text='+encodeURIComponent('Te invito a gestionar mi agenda en Doctor Chart. Abrí este enlace privado y creá tu acceso (vence en 6 horas): '+invite.url);}
 async copyInvitation(){const invite=this.invitation();if(!invite)return;try{const clipboard=this.document.defaultView?.navigator.clipboard;if(!clipboard)throw Error('Clipboard unavailable');await clipboard.writeText(invite.url);this.copied.set(true);}catch{this.error.set('Seleccioná el enlace y copialo para compartirlo.');}}
 toggleClinic(id:string,on:boolean){this.clinicIds=on?[...this.clinicIds,id]:this.clinicIds.filter(x=>x!==id);}
 togglePermission(p:StaffPermission,on:boolean){this.permissions=on?[...this.permissions,p]:this.permissions.filter(x=>x!==p);}
 clinicNames(a:StaffAccess){return a.clinicIds.map(id=>this.clinics().find(c=>c.id===id)?.name??'Consultorio retirado').join(', ');}
 permissionNames(a:StaffAccess){return ['Ver agenda',...this.availablePermissions.filter(p=>a.permissions.includes(p.value)).map(p=>p.label)].join(', ');}
 async save(): Promise<void> {
  if (this.busy() || !this.canManage()) return;
  this.busy.set(true);
  this.error.set('');
  const access = {clinicIds: this.clinicIds, permissions: this.permissions};
  try {
   const selected = this.selected();
   if (selected) {
    await firstValueFrom(this.http.put(this.base + '/' + selected.id, {
     ...access, expectedVersion: selected.version,
    }));
   } else {
    const contact = {email: this.email.trim(), name: this.name.trim(), phone: this.phone.trim()};
    const result = await firstValueFrom(this.http.post<{
     invitationCode: string; expiresAt: string; emailQueued?: boolean;
    }>(this.base + '/invitations', {...access, ...contact}));
    if (this.destroy.destroyed) return;
    const url = new URL('/staff/activate', this.document.location.origin);
    url.hash = new URLSearchParams({invite: result.invitationCode}).toString();
    this.copied.set(false);
    this.invitation.set({
     url: url.href, phone: contact.phone, email: contact.email,
     expiresAt: result.expiresAt, emailQueued: result.emailQueued === true,
    });
   }
   if (this.destroy.destroyed) return;
   this.busy.set(false);
   this.clear();
   await this.load();
  } catch (error) {
   if (!this.destroy.destroyed) this.error.set(staffError(error));
  } finally {
   if (!this.destroy.destroyed) this.busy.set(false);
  }
 }
 async revoke(a:StaffAccess){if(this.busy())return;this.busy.set(true);try{await firstValueFrom(this.http.delete(this.base+'/'+a.id));await this.load();}catch(e){this.error.set(staffError(e));}finally{this.busy.set(false);}}
}
