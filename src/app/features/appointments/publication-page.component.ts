import { InteractionStatusService } from '../../core/services/interaction-status.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideArrowUpRight, lucideCalendarDays, lucideEye, lucideListChecks, lucideMapPin, lucidePlus, lucideUserRound, lucideVideo } from '@ng-icons/lucide';
import {Component,DestroyRef,ElementRef,effect,inject,signal,viewChild} from '@angular/core';import {FormsModule} from '@angular/forms';import {RouterLink} from '@angular/router';import {firstValueFrom} from 'rxjs';
import {WorkspaceStore} from '../../core/services/workspace.store';
import {AuthService} from '../../core/services/auth.service';import {ClinicsService} from '../clinics/clinics.service';import {Clinic,formatClinicStatusLabel,modalityLabel,parseClinicHttpError} from '../clinics/clinics.models';import {AppointmentsService} from './appointments.service';import {Publication} from './appointments.models';
const empty=():Publication=>({version:'0',name:'',description:'',published:false,clinics:[],questions:[]});
@Component({
 selector: 'app-publication-page',
 imports: [FormsModule, RouterLink, NgIcon],
 providers: [provideIcons({ lucideArrowLeft, lucideArrowUpRight, lucideCalendarDays, lucideEye, lucideListChecks, lucideMapPin, lucidePlus, lucideUserRound, lucideVideo })],
 templateUrl: './publication-page.component.html',
 styleUrl: './publication-page.component.css',
})
export class PublicationPageComponent{
  private readonly interaction = inject(InteractionStatusService);
 readonly workspace=inject(WorkspaceStore);
 private readonly api=inject(AppointmentsService);private readonly clinicsApi=inject(ClinicsService);private readonly auth=inject(AuthService);private readonly destroy=inject(DestroyRef);private generation=0;private owner:string|null=null;
 readonly publicLinkId=signal<string|null>(null);readonly busy=signal(false);readonly saving=signal(false);readonly error=signal('');readonly conflict=signal(false);readonly clinics=signal<Clinic[]>([]);draft=empty();
 readonly publishedContextIds = signal<readonly string[]>([]);
 private readonly previewHeading = viewChild<ElementRef<HTMLElement>>('previewHeading');
 constructor(){effect(()=>{const user=this.auth.currentUser()?.id??null;if(user!==this.owner){this.owner=user;this.generation++;this.saving.set(false);this.busy.set(false);this.clinics.set([]);this.applyPublication(empty());if(user)void this.load();}});this.destroy.onDestroy(()=>this.generation++);}
 async load(){const g=++this.generation,owner=this.owner;this.busy.set(true);this.error.set('');try{const [publication]=await Promise.all([firstValueFrom(this.api.publication()),this.workspace.loadContexts()]);const all:Clinic[]=[];for(let page=0;;page++){const result=await firstValueFrom(this.clinicsApi.listClinics({page,size:100}));all.push(...result.items);if(all.length>=result.totalElements||result.items.length===0)break;}if(g!==this.generation||owner!==this.owner)return;this.clinics.set(all);this.applyPublication(publication);this.conflict.set(false);}catch(err){if(g===this.generation)this.error.set(parseClinicHttpError(err,'No pudimos cargar la publicación.').userMessage);}finally{if(g===this.generation)this.busy.set(false);}}
 toggleContext(id:string,enabled:boolean){const ids=this.draft.specialtyContextIds??[];this.draft.specialtyContextIds=enabled?[...new Set([...ids,id])]:ids.filter(c=>c!==id);}
 addQuestion(){if(this.draft.questions.length<8)this.draft.questions.push({key:'q_'+crypto.randomUUID().replaceAll('-',''),label:'',required:false});}
 isVirtual(id:string){return this.clinics().find(c=>c.id===id)?.modality==='TELECONSULTATION';}
 clinicName(id: string, includeDetails = true): string {
   const clinic = this.clinics().find(item => item.id === id);
   if (!clinic) return id;
   return includeDetails
     ? [clinic.name, modalityLabel(clinic.modality), clinic.city, formatClinicStatusLabel(clinic.status)].filter(Boolean).join(' · ')
     : clinic.name;
 }

 initials(): string {
   return this.draft.name.trim().split(/\s+/).slice(0, 2).map(word => word[0]).join('').toUpperCase();
 }

 selectedClinics(): Publication['clinics'] {
   return this.draft.clinics.filter(clinic => clinic.enabled);
 }

 viewPreview(): void {
   const heading = this.previewHeading()?.nativeElement;
   heading?.focus({ preventScroll: true });
   heading?.scrollIntoView({ block: 'start' });
 }

 private applyPublication(publication: Publication): void {
   const publicId = publication.published ? publication.publicId ?? null : null;
   this.publicLinkId.set(publicId);
   this.publishedContextIds.set(publicId ? [...(publication.specialtyContextIds ?? [])] : []);
   this.draft = {
     ...publication,
     clinics: this.clinics().map(clinic => publication.clinics.find(item => item.clinicId === clinic.id)
       ?? { clinicId: clinic.id, enabled: false, address: '' }),
   };
 }

 async save(){if(this.saving()||this.busy()||this.conflict())return;if(this.draft.published&&!this.draft.specialtyContextIds?.length){this.error.set('Elegí al menos una especialidad para publicar.');return;}const g=this.generation,owner=this.owner;this.saving.set(true);this.error.set('');try{const value=await firstValueFrom(this.api.savePublication(structuredClone(this.draft)));if(g!==this.generation||owner!==this.owner)return;this.applyPublication(value);this.interaction.notifySuccess(value.published?'El perfil se publicó para reservas online.':'La publicación se guardó como no disponible públicamente.');}catch(err){if(g===this.generation){const parsed=parseClinicHttpError(err,'No se pudo guardar. Los campos ingresados se conservaron.');this.error.set(parsed.userMessage);if(parsed.isVersionConflict)this.conflict.set(true);}}finally{if(g===this.generation)this.saving.set(false);}}
}
