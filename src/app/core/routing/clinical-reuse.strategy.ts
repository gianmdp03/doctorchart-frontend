import {ActivatedRouteSnapshot,BaseRouteReuseStrategy} from '@angular/router';
export class ClinicalReuseStrategy extends BaseRouteReuseStrategy {
 override shouldReuseRoute(future:ActivatedRouteSnapshot,current:ActivatedRouteSnapshot):boolean{
  if(future.data['clinicalContext']&&future.queryParamMap.get('specialtyContextId')!==current.queryParamMap.get('specialtyContextId'))return false;
  return super.shouldReuseRoute(future,current);
 }
}
