import { PhoneDisplayPipe } from '../../shared/phone-input/phone-display.pipe';
import { AsyncPipe } from '@angular/common';
import { PhoneInputComponent } from '../../shared/phone-input/phone-input.component';
import {Component,DestroyRef,ElementRef,inject,signal,viewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {CdkMenuModule} from '@angular/cdk/menu';
import {NgIconComponent,provideIcons} from '@ng-icons/core';
import {lucideArrowLeft,lucideCalendarDays,lucideEllipsis,lucideLink2,lucidePencil,lucideRefreshCw,lucideUserPlus,lucideUsers,lucideUserRoundX} from '@ng-icons/lucide';
import {firstValueFrom} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ClinicsService} from '../clinics/clinics.service';
import {Clinic} from '../clinics/clinics.models';
import {StaffAccess,StaffPermission,staffError} from './staff.service';

interface StaffAccessList {items:StaffAccess[];capabilities:{manage:boolean;reason:string|null;validUntil:string|null};}
interface Invitation {url:string;phone:string;expiresAt:string;email:string;emailQueued:boolean;}
@Component({selector:'app-secretaries',imports:[FormsModule,PhoneDisplayPipe,AsyncPipe,PhoneInputComponent,RouterLink,CdkMenuModule,NgIconComponent],
 providers:[provideIcons({lucideArrowLeft,lucideCalendarDays,lucideEllipsis,lucideLink2,lucidePencil,lucideRefreshCw,lucideUserPlus,lucideUsers,lucideUserRoundX})],styleUrl:'./staff.css',template:`
<div class="staff-page secretaries">
  <a class="dc-button dc-button--secondary team-back" routerLink="/calendar"><ng-icon name="lucideArrowLeft" aria-hidden="true" /> Agenda de turnos</a>
  <header class="page-heading secretaries-heading">
    <div class="team-heading-copy">
      <span class="team-icon"><ng-icon name="lucideUsers" aria-hidden="true" /></span>
      <div><h1>Secretaría</h1><p>Administrá quién puede ver o gestionar tus agendas.</p></div>
    </div>
    <button type="button" class="dc-button dc-button--primary primary" (click)="openInvite()" [disabled]="busy() || !canManage()">
      <ng-icon name="lucideUserPlus" aria-hidden="true" /> Invitar a Secretaría
    </button>
  </header>
  @if (error() && !accessDialog.open) { <p role="alert" class="notice error">{{error()}}</p> }
  @if (capabilities() && !canManage()) { <p class="notice">La administración requiere permisos comerciales vigentes. Podés revocar accesos existentes.</p> }
  <section class="team-list" aria-labelledby="staff-assigned">
    <header class="team-list-header">
      <h2 id="staff-assigned">Personas asignadas</h2>
      <button type="button" class="dc-button dc-button--quiet team-menu-trigger" (click)="load()" [disabled]="busy()" aria-label="Actualizar asignaciones" title="Actualizar asignaciones">
        <ng-icon name="lucideRefreshCw" aria-hidden="true" />
      </button>
    </header>
    @if (items().length) {
      <div class="team-columns" aria-hidden="true"><span>Persona</span><span>Agendas y permisos</span><span>Estado</span><span>Acciones</span></div>
    }
    @for (a of items(); track a.id) {
      <article class="team-row" [attr.aria-labelledby]="'staff-person-' + a.id">
        <div class="team-person">
          <span class="team-avatar" aria-hidden="true">{{initials(a.name)}}</span>
          <div>
            <h3 [id]="'staff-person-' + a.id">{{a.name}}</h3>
            <p class="muted">{{a.email}} @if (a.phone) { · {{(a.phone | phoneDisplay | async) || a.phone}} }</p>
          </div>
        </div>
        <div class="team-agendas">
          <ng-icon name="lucideCalendarDays" aria-hidden="true" />
          <div><p class="assignment-agendas">{{clinicNames(a)}}</p><p class="muted">{{permissionSummary(a.permissions)}}</p></div>
        </div>
        <div class="team-state">
          <span class="access-status" [class.access-active]="a.active && a.activated" [class.access-pending]="a.active && !a.activated">{{!a.active?'Acceso revocado':a.activated?'Cuenta activada':'Invitación pendiente'}}</span>
        </div>
        @if (a.active) {
          <div class="team-actions">
            @if (!a.activated) {
              <button type="button" class="dc-button dc-button--secondary" (click)="openRenewal(a)" [disabled]="busy() || !canManage()"><ng-icon name="lucideLink2" aria-hidden="true" /> Nuevo enlace</button>
            } @else {
              <button type="button" class="dc-button dc-button--secondary" (click)="openEdit(a)" [disabled]="busy() || !canManage()"><ng-icon name="lucidePencil" aria-hidden="true" /> Editar acceso</button>
            }
            <button type="button" class="dc-button dc-button--quiet team-menu-trigger" [cdkMenuTriggerFor]="accessOptions"
              [attr.aria-label]="'Más opciones de ' + a.name" title="Más opciones" [disabled]="busy()"><ng-icon name="lucideEllipsis" aria-hidden="true" /></button>
            <ng-template #accessOptions>
              <div cdkMenu class="team-menu">
                @if (!a.activated && canManage()) { <button type="button" cdkMenuItem (cdkMenuItemTriggered)="openEdit(a)"><ng-icon name="lucidePencil" aria-hidden="true" /> Editar acceso</button> }
                <button type="button" cdkMenuItem class="team-revoke" (cdkMenuItemTriggered)="openRevoke(a)"><ng-icon name="lucideUserRoundX" aria-hidden="true" /> Revocar acceso</button>
              </div>
            </ng-template>
          </div>
        }
      </article>
    } @empty {
      @if (capabilities()) {
        <div class="team-empty"><span class="team-icon"><ng-icon name="lucideUsers" aria-hidden="true" /></span><h3>Sin personas asignadas</h3><p>Las invitaciones y accesos que crees aparecerán acá.</p></div>
      } @else if (!error()) {
        <p class="team-empty" role="status">Cargando accesos…</p>
      }
    }
  </section>
  <dialog #accessDialog class="staff-dialog" aria-labelledby="access-dialog-title" (cancel)="busy() && $event.preventDefault()"
    (close)="clear(); invitation.set(null); renewing.set(null); revoking.set(null); error.set('')">
    <header class="staff-dialog-header">
      <h2 id="access-dialog-title">{{ invitation() ? 'Compartí la invitación' : revoking() ? 'Revocar acceso' : renewing() ? 'Generar nuevo enlace' : selected() ? 'Editar acceso' : 'Invitar a Secretaría' }}</h2>
      <button type="button" (click)="closeDialog()" [disabled]="busy()">Cerrar</button>
    </header>
    <div class="staff-dialog-body">
      @if (error()) { <p role="alert" class="notice error">{{error()}}</p> }
      @if (invitation(); as invite) {
        <section class="invite-result">
          <h3>Invitación creada</h3>
          <p>El enlace es privado, vence en 6 horas y se puede usar una sola vez.</p>
          @if (invite.emailQueued) { <p>El correo quedó en cola para <strong>{{invite.email}}</strong>.</p> }
          @else { <p>Copiá el enlace y compartilo en privado con <strong>{{invite.email}}</strong>.</p> }
          <label>Enlace de invitación<input readonly [value]="invite.url" (click)="$any($event.target).select()" /></label>
          <div class="actions">
            <button type="button" class="primary" (click)="copyInvitation()">{{copied() ? 'Enlace copiado' : 'Copiar enlace'}}</button>
            @if (invite.phone) { <a [href]="whatsappUrl(invite)" target="_blank" rel="noopener noreferrer">Compartir por WhatsApp</a> }
          </div>
        </section>
      } @else if (revoking(); as access) {
        <p>{{access.name}} perderá el acceso a las agendas asignadas.</p>
        <button type="button" (click)="revoke(access)" [disabled]="busy()">Confirmar revocación</button>
      } @else if (renewing(); as access) {
        <p>El enlace anterior de {{access.name}} dejará de funcionar.</p>
        <button type="button" class="primary" (click)="renew(access)" [disabled]="busy() || !canManage()">Generar enlace</button>
      } @else {
      @if(!capabilities()){
        <p class="muted">{{error() ? 'Reintentá desde Actualizar asignaciones.' : 'Cargando consultorios y permisos…'}}</p>
      }@else if(!clinics().length){
        <div class="empty-state">
          <h3>Primero, creá un consultorio</h3>
          <p class="muted">Cada invitación debe incluir al menos un consultorio.</p>
          <a routerLink="/clinics">Ir a Consultorios →</a>
        </div>
      }@else{
        <form ngNativeValidate (ngSubmit)="form.valid && save()" #form="ngForm">
          <fieldset [disabled]="busy()||!canManage()">
            <legend class="sr-only">Datos y permisos</legend>
            @if(!selected()){
              <label>Nombre<input name="name" autocomplete="name" [(ngModel)]="name" required maxlength="160" /></label>
              <label>Correo electrónico<input type="email" name="email" [(ngModel)]="email" required maxlength="254" /></label>
              <div class="picker-field">
                <label for="staff-invitation-phone">Teléfono para WhatsApp (opcional)</label>
                <app-phone-input inputId="staff-invitation-phone" name="phone" [(ngModel)]="phone" [minimumE164Length]="9" [showErrors]="form.submitted" />
              </div>
            }
            <div class="form-group" role="group" aria-labelledby="staff-clinics">
              <h3 id="staff-clinics">¿Qué agendas puede usar?</h3>
              @for(c of clinics();track c.id){
                <label class="check"><input type="checkbox" [checked]="clinicIds.includes(c.id)" (change)="toggleClinic(c.id,$any($event.target).checked)" />{{c.name}} @if(c.modality==='TELECONSULTATION'){· Teleconsulta}</label>
              }
            </div>
            <div class="form-group" role="group" aria-labelledby="staff-permissions">
              <h3 id="staff-permissions">¿Qué puede hacer?</h3>
              <p class="muted">Ver la agenda está incluido. Las historias clínicas y la configuración de horarios quedan reservadas al profesional.</p>
              <label class="permission-choice"><input type="radio" name="permissionPreset" value="view" [ngModel]="permissionPreset()" (ngModelChange)="setPermissionPreset($event)" /><span><strong>Solo ver agenda</strong><small>Puede consultar los turnos.</small></span></label>
              <label class="permission-choice"><input type="radio" name="permissionPreset" value="manage" [ngModel]="permissionPreset()" (ngModelChange)="setPermissionPreset($event)" /><span><strong>Gestionar turnos</strong><small>Puede crear, mover, cancelar y actualizar turnos.</small></span></label>
              @if (permissionPreset() !== 'custom') { <button type="button" (click)="setPermissionPreset('custom')">Personalizar permisos</button> }
              @if(permissionPreset()==='custom'){
                @for(p of availablePermissions;track p.value){
                  <label class="check"><input type="checkbox" [checked]="permissions.includes(p.value)" (change)="togglePermission(p.value,$any($event.target).checked)" />{{p.label}}</label>
                }
              }
            </div>
            <div class="actions form-actions">
              @if (!clinicIds.length) { <p class="muted">Elegí al menos una agenda para continuar.</p> }
              <button type="submit" [disabled]="busy()||!clinicIds.length||!canManage()">{{busy()?'Guardando…':selected()?'Guardar cambios':'Crear invitación'}}</button>

            </div>
          </fieldset>
        </form>
      }
      }
    </div>
  </dialog>
</div>`})
export class SecretariesComponent {
 initials(name: string): string {
  return name.trim().split(/\s+/).slice(0, 2).map(word => Array.from(word)[0] ?? '').join('').toLocaleUpperCase('es-AR');
 }
 private readonly document=inject(DOCUMENT);
 private readonly accessDialog = viewChild<ElementRef<HTMLDialogElement>>('accessDialog');
 readonly renewing = signal<StaffAccess | null>(null);
 readonly revoking = signal<StaffAccess | null>(null);
 openInvite(): void { this.clear(); this.showDialog(); }
 openEdit(access: StaffAccess): void { this.edit(access); this.showDialog(); }
 openRenewal(access: StaffAccess): void { this.renewing.set(access); this.showDialog(); }
 openRevoke(access: StaffAccess): void { this.revoking.set(access); this.showDialog(); }
 closeDialog(): void { this.accessDialog()?.nativeElement.close(); }
 private showDialog(): void {
  this.error.set('');
  this.accessDialog()?.nativeElement.showModal();
 }
 private readonly http=inject(HttpClient);private readonly clinicsApi=inject(ClinicsService);private readonly destroy=inject(DestroyRef);private readonly base=environment.apiUrl.replace(/\/$/,'')+'/secretaries';private epoch=0;
 readonly items=signal<StaffAccess[]>([]);readonly clinics=signal<Clinic[]>([]);readonly selected=signal<StaffAccess|null>(null);readonly busy=signal(false);readonly error=signal('');readonly invitation=signal<Invitation|null>(null);readonly copied=signal(false);readonly capabilities=signal<StaffAccessList['capabilities']|null>(null);readonly now=signal(Date.now());
 name='';email='';phone:string|null=null;clinicIds:string[]=[];permissions:StaffPermission[]=['view','create','cancel','reschedule','status'];private readonly customPermissions=signal(false);readonly availablePermissions:{value:StaffPermission;label:string}[]=[{value:'create',label:'Crear turnos'},{value:'cancel',label:'Cancelar'},{value:'reschedule',label:'Reprogramar'},{value:'status',label:'Marcar llegada, ausencia y atención'}];
 constructor(){void this.load();const timer=setInterval(()=>this.now.set(Date.now()),1000);this.destroy.onDestroy(()=>{clearInterval(timer);this.epoch++;});}
 canManage(){const c=this.capabilities();return !!c&&c.manage&&Date.parse(c.validUntil??'')>this.now();}
 async load(){const generation=++this.epoch;try{const [list,first]=await Promise.all([firstValueFrom(this.http.get<StaffAccessList>(this.base)),firstValueFrom(this.clinicsApi.listClinics({size:100,page:0}))]);let all=first.items;for(let page=1;all.length<first.totalElements;page++){const next=await firstValueFrom(this.clinicsApi.listClinics({size:100,page}));all=[...all,...next.items];if(!next.items.length)break;}if(generation!==this.epoch)return;this.items.set(list.items);this.capabilities.set(list.capabilities);this.error.set('');this.clinics.set(all.filter(c=>c.status!=='ARCHIVED'));if(!this.selected()&&!this.clinicIds.length&&this.clinics().length===1)this.clinicIds=[this.clinics()[0].id];}catch(e){if(generation===this.epoch){this.capabilities.set(null);this.error.set(staffError(e));}}}
 edit(a:StaffAccess){if(this.busy())return;this.selected.set(a);this.clinicIds=[...a.clinicIds];this.permissions=[...a.permissions];this.customPermissions.set(false);this.error.set('');}
 async renew(a:StaffAccess){if(this.busy())return;this.selected.set(null);this.email=a.email;this.name=a.name;this.phone=a.phone??'';this.clinicIds=[...a.clinicIds];this.permissions=[...a.permissions];await this.save();}
 clear(){if(this.busy())return;this.selected.set(null);this.name='';this.email='';this.phone=null;this.clinicIds=this.clinics().length===1?[this.clinics()[0].id]:[];this.permissions=['view','create','cancel','reschedule','status'];this.customPermissions.set(false);}
 permissionPreset():'manage'|'view'|'custom'{return this.customPermissions()?'custom':this.permissions.length===5?'manage':this.permissions.length===1?'view':'custom';}
 setPermissionPreset(value:'manage'|'view'|'custom'){this.customPermissions.set(value==='custom');if(value==='manage')this.permissions=['view','create','cancel','reschedule','status'];if(value==='view')this.permissions=['view'];}
 whatsappUrl(invite:Invitation){return 'https://wa.me/'+invite.phone.replace(/\D/g,'')+'?text='+encodeURIComponent('Te invito a gestionar mi agenda en Doctor Chart. Abrí este enlace privado y creá tu acceso (vence en 6 horas): '+invite.url);}
 async copyInvitation(){const invite=this.invitation();if(!invite)return;try{const clipboard=this.document.defaultView?.navigator.clipboard;if(!clipboard)throw Error('Clipboard unavailable');await clipboard.writeText(invite.url);this.copied.set(true);}catch{this.error.set('Seleccioná el enlace y copialo para compartirlo.');}}
 toggleClinic(id:string,on:boolean){this.clinicIds=on?[...this.clinicIds,id]:this.clinicIds.filter(x=>x!==id);}
 togglePermission(p:StaffPermission,on:boolean){this.permissions=on?[...this.permissions,p]:this.permissions.filter(x=>x!==p);}
 clinicNames(a:StaffAccess){return a.clinicIds.map(id=>this.clinics().find(c=>c.id===id)?.name??'Consultorio retirado').join(', ');}
 permissionSummary(permissions: StaffPermission[]): string {
  if (permissions.length === 1) return 'Solo ver agenda';
  if (permissions.length === 5) return 'Gestionar turnos';
  return 'Permisos personalizados';
 }
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
    const contact = {email: this.email.trim(), name: this.name.trim(), phone: this.phone ?? ''};
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
   if (selected) this.closeDialog();
   else this.renewing.set(null);
   this.clear();
   await this.load();
  } catch (error) {
   if (!this.destroy.destroyed) this.error.set(staffError(error));
  } finally {
   if (!this.destroy.destroyed) this.busy.set(false);
  }
 }
 async revoke(a:StaffAccess){if(this.busy())return;this.busy.set(true);try{await firstValueFrom(this.http.delete(this.base+'/'+a.id));this.busy.set(false);this.closeDialog();await this.load();}catch(e){this.error.set(staffError(e));}finally{this.busy.set(false);}}
}
