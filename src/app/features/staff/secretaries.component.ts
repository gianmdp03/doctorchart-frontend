import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideBuilding2, lucideContactRound, lucideRefreshCw, lucideSettings2, lucideUserPlus, lucideUsers } from '@ng-icons/lucide';
import { InteractionStatusService } from '../../core/services/interaction-status.service';
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
@Component({
  selector: 'app-secretaries',
  imports: [FormsModule, RouterLink, NgIcon],
  providers: [provideIcons({ lucideArrowLeft, lucideBuilding2, lucideContactRound, lucideRefreshCw, lucideSettings2, lucideUserPlus, lucideUsers })],
  templateUrl: './secretaries.component.html',
  styleUrls: ['./staff.css', './secretaries.component.css'],
})
export class SecretariesComponent {
  private readonly interaction = inject(InteractionStatusService);
 private readonly document=inject(DOCUMENT);
 private readonly http=inject(HttpClient);private readonly clinicsApi=inject(ClinicsService);private readonly destroy=inject(DestroyRef);private readonly base=environment.apiUrl.replace(/\/$/,'')+'/secretaries';private epoch=0;
 readonly items=signal<StaffAccess[]>([]);readonly clinics=signal<Clinic[]>([]);readonly selected=signal<StaffAccess|null>(null);readonly busy=signal(false);readonly error=signal('');readonly invitation=signal<Invitation|null>(null);readonly copied=signal(false);readonly capabilities=signal<StaffAccessList['capabilities']|null>(null);readonly loading=signal(false);
 name='';email='';phone='';clinicIds:string[]=[];permissions:StaffPermission[]=['view','create','cancel','reschedule','status'];private readonly customPermissions=signal(false);readonly availablePermissions:{value:StaffPermission;label:string}[]=[{value:'create',label:'Crear turnos'},{value:'cancel',label:'Cancelar'},{value:'reschedule',label:'Reprogramar'},{value:'status',label:'Marcar llegada, ausencia y atención'}];
 constructor(){void this.load();this.destroy.onDestroy(()=>this.epoch++);}

 // The API resolves and fences current entitlements on every write. A snapshot
 // expiry must not disable inputs or erase a draft while the doctor is typing.
 canManage(): boolean { return this.capabilities()?.manage === true; }

 async load(): Promise<void> {
   const generation = ++this.epoch;
   this.loading.set(true);
   this.error.set('');
   try {
     const [list, first] = await Promise.all([
       firstValueFrom(this.http.get<StaffAccessList>(this.base)),
       firstValueFrom(this.clinicsApi.listClinics({ size: 100, page: 0 })),
     ]);
     const all = [...first.items];
     for (let page = 1; all.length < first.totalElements; page++) {
       const next = await firstValueFrom(this.clinicsApi.listClinics({ size: 100, page }));
       if (!next.items.length) break;
       all.push(...next.items);
     }
     if (generation !== this.epoch) return;
     const initial = !this.capabilities();
     const available = all.filter(clinic => clinic.status !== 'ARCHIVED');
     this.items.set(list.items);
     this.capabilities.set(list.capabilities);
     this.clinics.set(available);
     if (initial && available.length === 1) this.clinicIds = [available[0].id];
   } catch (error) {
     if (generation === this.epoch) this.error.set(staffError(error));
   } finally {
     if (generation === this.epoch) this.loading.set(false);
   }
 }
 edit(a:StaffAccess){if(this.busy())return;this.selected.set(a);this.clinicIds=[...a.clinicIds];this.permissions=[...a.permissions];this.customPermissions.set(false);this.error.set('');}
 async renew(a:StaffAccess){if(this.busy())return;this.selected.set(null);this.email=a.email;this.name=a.name;this.phone=a.phone??'';this.clinicIds=[...a.clinicIds];this.permissions=[...a.permissions];await this.save();}
 clear(){if(!this.busy())this.resetDraft();}
 private resetDraft(){this.selected.set(null);this.name='';this.email='';this.phone='';this.clinicIds=this.clinics().length===1?[this.clinics()[0].id]:[];this.permissions=['view','create','cancel','reschedule','status'];this.customPermissions.set(false);}
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
   try {
     const assignment = this.selected();
     const access = { clinicIds: this.clinicIds, permissions: this.permissions };
     if (assignment) {
       await firstValueFrom(this.http.put(this.base + '/' + assignment.id, { ...access, expectedVersion: assignment.version }));
       if (this.destroy.destroyed) return;
       this.interaction.notifySuccess('Los permisos de secretaría se actualizaron.');
     } else {
       const contact = { email: this.email.trim(), name: this.name.trim(), phone: this.phone.trim() };
       const result = await firstValueFrom(this.http.post<{ invitationCode: string; expiresAt: string; emailQueued?: boolean }>(
         this.base + '/invitations', { ...access, ...contact },
       ));
       if (this.destroy.destroyed) return;
       const url = new URL('/staff/activate', this.document.location.origin);
       url.hash = new URLSearchParams({ invite: result.invitationCode }).toString();
       this.copied.set(false);
       this.invitation.set({ url: url.href, phone: contact.phone, email: contact.email, expiresAt: result.expiresAt, emailQueued: result.emailQueued === true });
       this.interaction.notifySuccess('La invitación de secretaría se creó correctamente.');
     }
     this.resetDraft();
     await this.load();
   } catch (error) {
     if (!this.destroy.destroyed) this.error.set(staffError(error));
   } finally {
     this.busy.set(false);
   }
 }
 async revoke(a:StaffAccess){if(this.busy())return;this.busy.set(true);try{await firstValueFrom(this.http.delete(this.base+'/'+a.id));this.interaction.notifySuccess('El acceso de secretaría se revocó.');await this.load();}catch(e){this.error.set(staffError(e));}finally{this.busy.set(false);}}
}
