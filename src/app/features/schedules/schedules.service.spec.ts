import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { environment } from '../../../environments/environment';
import { timeZoneInterceptor } from '../../core/interceptors/time-zone.interceptor';
import { SchedulesService } from './schedules.service';
describe('M3 schedule HTTP contract',()=>{
 let api:SchedulesService,http:HttpTestingController;
 const id='9007199254740993',url=environment.apiUrl+'/clinics/'+id;
 beforeEach(()=>{TestBed.configureTestingModule({providers:[provideHttpClient(withInterceptors([timeZoneInterceptor])),provideHttpClientTesting()]});api=TestBed.inject(SchedulesService);http=TestBed.inject(HttpTestingController);});
 afterEach(()=>http.verify());
 it('reads schedule and preserves BIGINT identifiers',async()=>{const task=firstValueFrom(api.get(id));const req=http.expectOne(url+'/schedule');expect(req.request.method).toBe('GET');req.flush({clinicId:id,version:'9007199254740994'});expect((await task).version).toBe('9007199254740994');});
 it('sends a full versioned replacement and never includes timeZone',async()=>{
  const body={expectedVersion:'9007199254740994',slotMinutes:30,minNoticeMinutes:0,maxAdvanceDays:30,weekly:[{weekday:1,ranges:[{start:'09:00',end:'12:00'}]}],exceptions:[{from:'2026-12-24',through:'2026-12-25',label:'Cierre',ranges:[]}]};
  const task=firstValueFrom(api.save(id,body));const req=http.expectOne(url+'/schedule');expect(req.request.method).toBe('PUT');expect(req.request.body).toEqual(body);expect(req.request.params.has('timeZone')).toBe(false);req.flush({clinicId:id,version:'9007199254740995'});await task;
 });
 it('queries daily and weekly availability with canonical parameters',async()=>{for(const days of [1,7] as const){const task=firstValueFrom(api.availability(id,'2026-11-02',days));const req=http.expectOne(r=>r.url===url+'/availability');expect(req.request.params.keys().sort()).toEqual(['days','from']);expect(req.request.params.get('days')).toBe(String(days));req.flush({clinicId:id,timezone:'UTC',days:[]});await task;}});
 it('propagates commercial/server conflicts without mock fallback',async()=>{const task=firstValueFrom(api.get(id));http.expectOne(url+'/schedule').flush({code:'ENTITLEMENTS_UNAVAILABLE',message:'No disponible'},{status:503,statusText:'Unavailable'});await expect(task).rejects.toMatchObject({status:503});});
});

