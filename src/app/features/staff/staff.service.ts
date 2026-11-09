import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {environment} from '../../../environments/environment';
import type {Booking, BookingStatus} from '../calendar/bookings.models';

export type StaffPermission='view'|'create'|'cancel'|'reschedule'|'status';
export type AdministrativeBooking=Omit<Booking,'patientId'>;
export interface StaffSession {email:string;name:string;csrfToken:string;expiresAt:string;recoveryCode?:string;}
export interface Assignment {doctorName?:string;ownerId:string;accessId:string;clinicId:string;clinicName:string;timezone:string;permissions:StaffPermission[];validUntil:string;}
export interface StaffAccess {id:string;email:string;name:string;version:string;active:boolean;activated:boolean;permissions:StaffPermission[];clinicIds:string[];}
export interface SlotDay {date:string;slots:{start:string;end:string}[];}
export function staffError(error:unknown):string {
 const e=error as HttpErrorResponse; const code=e?.error?.code;
 if(e?.status===401)return 'Tu sesión venció o los datos de acceso no son válidos.';
 if(e?.status===403)return 'No tenés permisos vigentes para esta operación. Actualizá tus asignaciones.';
 if(e?.status===409)return code==='VERSION_CONFLICT'?'El turno cambió. Volvé a seleccionarlo antes de modificarlo.':'El horario o la solicitud cambió. Revisá la agenda; conservamos los datos ingresados.';
 if(e?.status===429)return 'Demasiados intentos. Esperá unos minutos antes de reintentar.';
 if(e?.status===503)return 'No se pudieron verificar los derechos del médico. Reintentá más tarde.';
 return 'No pudimos completar la operación. Revisá los datos y reintentá.';
}
@Injectable({providedIn:'root'})
export class StaffService {
 private readonly http=inject(HttpClient);
 readonly session=signal<StaffSession|null>(null);
 private readonly base=environment.apiUrl.replace(/\/$/,'')+'/staff';
 private options(write=false,key?:string){let headers=new HttpHeaders();if(write&&this.session())headers=headers.set('X-CSRF-Token',this.session()!.csrfToken);if(key)headers=headers.set('Idempotency-Key',key);return {withCredentials:true,transferCache:false,headers};}
 async loadSession(){const s=await firstValueFrom(this.http.get<StaffSession>(this.base+'/session',this.options()));this.session.set(s);return s;}
 async authenticate(action:'login'|'activate',body:Record<string,string>){const s=await firstValueFrom(this.http.post<StaffSession>(this.base+'/'+action,body,this.options()));this.session.set(s);return s;}
 requestRecoveryEmail(email:string){return firstValueFrom(this.http.post<{message:string}>(this.base+'/recovery-email',{email},this.options()));}
 recoverEmail(body:Record<string,string>){return firstValueFrom(this.http.post<{recoveryCode:string}>(this.base+'/recover-email',body,this.options()));}
 recover(body:Record<string,string>){return firstValueFrom(this.http.post<{recoveryCode:string}>(this.base+'/recover',body,this.options()));}
 async logout(){await firstValueFrom(this.http.post(this.base+'/logout',{},this.options(true)));this.session.set(null);}
 changePassword(currentPassword:string,password:string){return firstValueFrom(this.http.post(this.base+'/password',{currentPassword,password},this.options(true)));}
 assignments(){return firstValueFrom(this.http.get<{items:Assignment[]}>(this.base+'/assignments',this.options()));}
 availability(a:Assignment,from:string,days:number){return firstValueFrom(this.http.get<{days:SlotDay[]}>(`${this.base}/owners/${encodeURIComponent(a.ownerId)}/clinics/${a.clinicId}/availability`,{...this.options(),params:{from,days}}));}
 bookings(a:Assignment,from:string,to:string,page=0){return firstValueFrom(this.http.get<{items:AdministrativeBooking[];hasMore:boolean}>(`${this.base}/owners/${encodeURIComponent(a.ownerId)}/clinics/${a.clinicId}/bookings`,{...this.options(),params:{from,to,page,size:100}}));}
 create(a:Assignment,body:{clinicId:string;start:string;contactName:string;contactPhone:string;attendeeName:string},key:string){return firstValueFrom(this.http.post<AdministrativeBooking>(`${this.base}/owners/${encodeURIComponent(a.ownerId)}/bookings`,body,this.options(true,key)));}
 status(a:Assignment,b:AdministrativeBooking,status:BookingStatus,key:string){return firstValueFrom(this.http.patch<AdministrativeBooking>(`${this.base}/owners/${encodeURIComponent(a.ownerId)}/bookings/${b.id}/status`,{expectedVersion:b.version,status},this.options(true,key)));}
 reschedule(a:Assignment,b:AdministrativeBooking,clinicId:string,start:string,key:string){return firstValueFrom(this.http.post<AdministrativeBooking>(`${this.base}/owners/${encodeURIComponent(a.ownerId)}/bookings/${b.id}/reschedule`,{expectedVersion:b.version,clinicId,start},this.options(true,key)));}
}
