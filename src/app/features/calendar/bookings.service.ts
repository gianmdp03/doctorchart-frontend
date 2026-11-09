import {inject,Injectable} from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PublicBookingDetails} from '../appointments/appointments.models';
import {Booking,BookingCreate,BookingEvent,BookingPage,BookingStatus} from './bookings.models';
@Injectable({providedIn:'root'})
export class BookingsService {
 private readonly http=inject(HttpClient);private readonly base=environment.apiUrl+'/bookings';
 list(from:string,to:string,page=0){return this.http.get<BookingPage>(this.base,{params:new HttpParams().set('from',from).set('to',to).set('page',page).set('size',100)});}
 get(id:string){return this.http.get<Booking>(`${this.base}/${encodeURIComponent(id)}`);}
 publicDetails(id:string){return this.http.get<PublicBookingDetails|null>(`${this.base}/${encodeURIComponent(id)}/public-details`);}
 events(id:string){return this.http.get<{items:BookingEvent[]}>(`${this.base}/${encodeURIComponent(id)}/events`);}
 create(body:BookingCreate,key:string){return this.http.post<Booking>(this.base,body,{headers:{'Idempotency-Key':key}});}
 status(id:string,expectedVersion:string,status:BookingStatus,key:string){return this.http.patch<Booking>(`${this.base}/${encodeURIComponent(id)}/status`,{expectedVersion,status},{headers:{'Idempotency-Key':key}});}
 reschedule(id:string,body:{expectedVersion:string;clinicId:string;start:string},key:string){return this.http.post<Booking>(`${this.base}/${encodeURIComponent(id)}/reschedule`,body,{headers:{'Idempotency-Key':key}});}
}
