import {Injectable,inject} from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import {map} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AvailabilityDay,PublicDoctor,PublicBookingDraft,PublicConfirmation,Publication,PortalBooking,PortalDraft,PortalPreview,PortalSelection} from './appointments.models';
export interface PublicSpecialty { code: string; name: string; }
@Injectable({providedIn:'root'})
export class AppointmentsService{
 private readonly http=inject(HttpClient);private readonly base=environment.apiUrl+'/public/appointments';
 private portalDraft: {draft: PortalDraft; expires: number} | null = null;
 search(filters:Record<string,string>,page=0,size=12){let params=new HttpParams().set('page',page).set('size',size);for(const [k,v]of Object.entries(filters))if(v.trim())params=params.set(k,v.trim());return this.http.get<{items:PublicDoctor[];page:number;size:number;hasMore:boolean;specialties?:PublicSpecialty[]}>(this.base+'/doctors',{params,transferCache:false});}
 specialties(country:string,modality:string){
  return this.search({country,modality,includeSpecialties:'1'},0,1).pipe(map(result=>result.specialties??[]));
 }
 profile(id:string){return this.http.get<PublicDoctor>(this.base+'/doctors/'+encodeURIComponent(id),{transferCache:false});}
 availability(id:string,clinicId:string,from:string,specialtyContextId?:string){return this.http.get<{timezone:string;days:AvailabilityDay[]}>(`${this.base}/doctors/${encodeURIComponent(id)}/clinics/${encodeURIComponent(clinicId)}/availability`,{params:{from,days:7,...(specialtyContextId?{specialtyContextId}:{})},transferCache:false});}
 challenge(){return this.http.post<{token:string;difficulty:number}>(this.base+'/challenge',{});}
 book(id:string,body:PublicBookingDraft,challenge:string,solution:string,key:string){return this.http.post<PublicConfirmation>(`${this.base}/doctors/${encodeURIComponent(id)}/bookings`,{...body,challenge,solution},{headers:{'Idempotency-Key':key}});}
 setPortalDraft(draft: PortalDraft | null) {
  this.portalDraft = draft ? {draft, expires: Date.now() + 600_000} : null;
 }
 takePortalDraft() {
  const saved = this.portalDraft;
  this.portalDraft = null;
  return saved && saved.expires > Date.now() ? saved.draft : null;
 }
 previewPortalBookings(document: string, offset: number, challenge: string, solution: string) {
  return this.http.post<{items: PortalPreview[]; hasMore: boolean}>(this.base+'/my-bookings', {document, offset, challenge, solution}, {transferCache:false,withCredentials:true});
 }
 requestPortalCode(selection: PortalSelection, challenge: string, solution: string) {
  return this.http.post<{requestId: string; maskedEmail: string}>(this.base+'/access/request', {...selection, challenge, solution}, {transferCache:false});
 }
 verifyPortalCode(selection: PortalSelection, requestId: string, code: string) {
  return this.http.post<void>(this.base+'/access/verify', {...selection, requestId, code}, {transferCache:false,withCredentials:true});
 }
 portalBookings(offset: number, focusReference: string) {
  return this.http.post<{items: PortalBooking[]; hasMore: boolean; expiresAt: string}>(this.base+'/my-bookings', {offset, ...(focusReference ? {focusReference} : {})}, {transferCache:false,withCredentials:true});
 }
 endPortalSession() {
  return this.http.post<void>(this.base+'/my-bookings/logout', {}, {transferCache:false,withCredentials:true});
 }
 changePortalBooking(booking: PortalBooking, action: 'cancel'|'reschedule', start: string, key: string, reason: string) {
  return this.http.post(this.base+'/my-bookings/change', {
   reference:booking.reference, expectedVersion:booking.version, action, reason, ...(start ? {start} : {}),
  }, {headers:{'Idempotency-Key':key}, transferCache:false,withCredentials:true});
 }
 publication(){return this.http.get<Publication>(environment.apiUrl+'/booking-publication');}
 savePublication(p:Publication){return this.http.put<Publication>(environment.apiUrl+'/booking-publication',{expectedVersion:p.version,name:p.name.trim(),description:p.description.trim(),published:p.published,specialtyContextIds:p.specialtyContextIds,clinics:p.clinics,questions:p.questions});}
}
