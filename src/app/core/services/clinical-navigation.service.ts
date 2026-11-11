import {DOCUMENT} from '@angular/common';
import {DestroyRef,Injectable,inject,signal} from '@angular/core';
import {NavigationEnd,Router} from '@angular/router';
import {filter} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

/** Protect local editor inputs. A route decision never retargets an HTTP write. */
@Injectable({providedIn:'root'})
export class ClinicalNavigationService {
 private readonly document=inject(DOCUMENT);private readonly router=inject(Router,{optional:true});private readonly destroy=inject(DestroyRef);
 readonly dirty=signal(false);readonly pendingWrites=signal(0);readonly dialog=signal(false);readonly notice=signal('');private revision=0;private decision:((allow:boolean)=>void)|null=null;
 private readonly dirtyEditors=new Set<string>();
 constructor(){
  const changed=(event:Event)=>{
   const element=event.target as HTMLElement|null;if(!element?.closest)return;
   const path=(this.router?.url??'').split('?')[0];if(!/^\/(patients|records|encounters|onboarding\/setup|dashboard)(\/|$)/.test(path))return;
   if(event.type==='click'&&!/^(Agregar|Añadir|Quitar|Eliminar|Restaurar|Duplicar|Aplicar campo)/i.test(element.closest('button')?.textContent?.trim()??''))return;
   const editor=element.closest('app-patient-form-page,app-patient-form')?'patient':element.closest('app-encounter-form,app-encounter-form-page')?'encounter':element.closest('app-onboarding-wizard')?'wizard':path==='/dashboard'&&element.tagName==='TEXTAREA'?'notes':element.closest('form,app-patient-record')?'record':null;
   if(editor){this.revision++;this.dirtyEditors.add(editor);this.dirty.set(true);}
  };
  this.document.addEventListener('input',changed,true);this.document.addEventListener('change',changed,true);this.destroy.onDestroy(()=>{this.document.removeEventListener('input',changed,true);this.document.removeEventListener('change',changed,true);this.decision?.(false);});
  this.document.addEventListener('click',changed,true);this.destroy.onDestroy(()=>this.document.removeEventListener('click',changed,true));
  this.router?.events?.pipe(filter(e=>e instanceof NavigationEnd),takeUntilDestroyed()).subscribe(()=>{this.dirtyEditors.clear();this.dirty.set(false);this.notice.set('');});
 }
 beginWrite(){const revision=this.revision;this.pendingWrites.update(n=>n+1);return {success:(url:string)=>{
  if(revision!==this.revision)return;
  const path=new URL(url,'http://localhost').pathname;
  const editor=/\/workspace\/(wizard\/draft|finish-onboarding)$/.test(path)?'wizard':/\/workspace\/quick-notes$/.test(path)?'notes':/\/patients(?:\/\d+)?$/.test(path)?'patient':/\/encounters(?:\/\d+)?$/.test(path)?'encounter':null;
  if(editor){this.dirtyEditors.delete(editor);this.dirty.set(this.dirtyEditors.size>0);}
 },end:()=>this.pendingWrites.update(n=>Math.max(0,n-1))};}
 canLeaveEditing():Promise<boolean>{if(this.pendingWrites()){this.notice.set('Esperá a que termine el guardado antes de cambiar de especialidad.');return Promise.resolve(false);}if(!this.dirty())return Promise.resolve(true);if(this.decision)return Promise.resolve(false);this.dialog.set(true);return new Promise(resolve=>this.decision=resolve);}
 answer(action:'save'|'discard'|'cancel'){this.dialog.set(false);if(action==='save')this.notice.set('Guardá los cambios con el botón de esta pantalla y luego volvé a elegir la especialidad.');if(action==='discard'){this.dirtyEditors.clear();this.dirty.set(false);}const resolve=this.decision;this.decision=null;resolve?.(action==='discard');}
}
