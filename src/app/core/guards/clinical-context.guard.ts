import {inject} from '@angular/core';
import {CanActivateFn,CanDeactivateFn,Router} from '@angular/router';
import {WorkspaceStore} from '../services/workspace.store';
import {ClinicalNavigationService} from '../services/clinical-navigation.service';
import {AuthService} from '../services/auth.service';

export const clinicalContextGuard:CanActivateFn=async(route,state)=>{
 const store=inject(WorkspaceStore),router=inject(Router),auth=inject(AuthService);await auth.authReady;if(!auth.isLoggedIn())return true;if(auth.isSuperAdmin())return router.createUrlTree(['/admin/specialties']);
 try{
  const contexts=await store.loadContexts();const values=route.queryParamMap.getAll('specialtyContextId');if(values.length>1)return router.createUrlTree(['/specialties']);
  const explicit=values[0];if(values.length && !/^[1-9]\d*$/.test(explicit))return router.createUrlTree(['/specialties']);let id=explicit?Number(explicit):store.specialtyContextId();
  if(!id&&!explicit){await store.loadSetup();id=store.specialtyContextId();}
  if(!id){return route.data['clinicalContext']?router.createUrlTree([contexts.length?'/specialties':'/onboarding/select-specialty']):true;}
  if(!contexts.some(c=>c.id===id)||!Number.isSafeInteger(id))return router.createUrlTree(['/specialties']);
  if(!explicit&&route.data['clinicalContext']){const tree=router.parseUrl(state.url);tree.queryParams={...tree.queryParams,specialtyContextId:id};return tree;}
  await store.activateContext(id);
  if(route.data['clinicalContext']&&!route.data['allowPending']&&!store.isOnboardingCompleted())return router.createUrlTree(['/onboarding/setup'],{queryParams:{specialtyContextId:id}});
  return true;
 }catch{return false;}
};
export const clinicalLeaveGuard:CanDeactivateFn<unknown>=(_component,_route,_state,next)=>{
 const store=inject(WorkspaceStore),navigation=inject(ClinicalNavigationService),router=inject(Router);
 const nextId=router.parseUrl(next.url).queryParams['specialtyContextId'];
 return nextId&&String(store.specialtyContextId())!==String(nextId)||navigation.dirty()&&router.parseUrl(next.url).root.toString()!==router.parseUrl(_state.url).root.toString()?navigation.canLeaveEditing():true;
};
