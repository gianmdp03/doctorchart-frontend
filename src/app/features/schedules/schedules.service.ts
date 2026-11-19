import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Availability, ClinicSchedule, OccupiedSchedule, ScheduleUpdate } from './schedules.models';
@Injectable({providedIn:'root'})
export class SchedulesService {
 private readonly http=inject(HttpClient);
 private readonly base=environment.apiUrl+'/clinics';
 get(id:string){return this.http.get<ClinicSchedule>(this.base+'/'+encodeURIComponent(id)+'/schedule');}
 save(id:string,body:ScheduleUpdate){return this.http.put<ClinicSchedule>(this.base+'/'+encodeURIComponent(id)+'/schedule',body);}
 validateDraft(id:string,body:ScheduleUpdate){return this.http.post<void>(this.base+'/'+encodeURIComponent(id)+'/schedule/validate',body);}
 occupied(id:string,from:string,specialtyContextId?:string){
  let params = new HttpParams().set('from',from);
  if(specialtyContextId)params=params.set('specialtyContextId',specialtyContextId);
  return this.http.get<OccupiedSchedule>(this.base+'/'+encodeURIComponent(id)+'/schedule/occupied',{params});
 }
 availability(id:string,from:string,days:1|7,includeHours=false,specialtyContextId?:string){
  let params=new HttpParams().set('from',from).set('days',days);
  if(includeHours)params=params.set('includeHours',true);
  if(specialtyContextId)params=params.set('specialtyContextId',specialtyContextId);
  return this.http.get<Availability>(this.base+'/'+encodeURIComponent(id)+'/availability',{params});
 }
}
