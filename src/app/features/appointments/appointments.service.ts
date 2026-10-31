import {Injectable,inject} from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PublicDoctor,PublicBookingDraft,PublicConfirmation,Publication} from './appointments.models';
@Injectable({providedIn:'root'})
export class AppointmentsService{
 private readonly http=inject(HttpClient);private readonly base=environment.apiUrl+'/public/appointments';
 search(filters:Record<string,string>,page=0){let params=new HttpParams().set('page',page).set('size',12);for(const [k,v]of Object.entries(filters))if(v.trim())params=params.set(k,v.trim());return this.http.get<{items:PublicDoctor[];page:number;size:number;hasMore:boolean}>(this.base+'/doctors',{params,transferCache:false});}
 profile(id:string){return this.http.get<PublicDoctor>(this.base+'/doctors/'+encodeURIComponent(id),{transferCache:false});}
 availability(id:string,clinicId:string,from:string){return this.http.get<{timezone:string;days:{date:string;slots:{start:string;end:string}[]}[]}>(`${this.base}/doctors/${encodeURIComponent(id)}/clinics/${encodeURIComponent(clinicId)}/availability`,{params:{from,days:7},transferCache:false});}
 challenge(){return this.http.post<{token:string;difficulty:number}>(this.base+'/challenge',{});}
 book(id:string,body:PublicBookingDraft,challenge:string,solution:string,key:string){return this.http.post<PublicConfirmation>(`${this.base}/doctors/${encodeURIComponent(id)}/bookings`,{...body,challenge,solution},{headers:{'Idempotency-Key':key}});}
 publication(){return this.http.get<Publication>(environment.apiUrl+'/booking-publication');}
 savePublication(p:Publication){return this.http.put<Publication>(environment.apiUrl+'/booking-publication',{expectedVersion:p.version,name:p.name.trim(),description:p.description.trim(),published:p.published,clinics:p.clinics,questions:p.questions});}
}
