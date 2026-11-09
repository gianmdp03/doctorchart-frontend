import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Availability, ClinicSchedule, ScheduleUpdate } from './schedules.models';
@Injectable({providedIn:'root'})
export class SchedulesService {
 private readonly http=inject(HttpClient);
 private readonly base=environment.apiUrl+'/clinics';
 get(id:string){return this.http.get<ClinicSchedule>(this.base+'/'+encodeURIComponent(id)+'/schedule');}
 save(id:string,body:ScheduleUpdate){return this.http.put<ClinicSchedule>(this.base+'/'+encodeURIComponent(id)+'/schedule',body);}
 availability(id:string,from:string,days:1|7){
  return this.http.get<Availability>(this.base+'/'+encodeURIComponent(id)+'/availability',{params:new HttpParams().set('from',from).set('days',days)});
 }
}
