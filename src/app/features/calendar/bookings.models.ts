import { isArgentineTimezone } from '../../core/date/user-time-zone';

export type BookingStatus = 'CONFIRMED'|'CHECKED_IN'|'COMPLETED'|'NO_SHOW'|'CANCELLED';
export interface Booking {
 id:string;clinicId:string;patientId:string|null;start:string;end:string;status:BookingStatus;version:string;
 contactName:string;contactPhone:string;attendeeName?:string;createdAt:string;updatedAt:string;
 // Optional only for replay receipts issued before schema 14.
 specialtyContextId?:string;specialty?:{id:string;code:string;name:string};
 clinicSnapshot?:{name:string;address:string;publicAddress:string;timezone:string};
 provenance?:{kind:'SCHEDULE_BLOCK'|'LEGACY_CONTEXT_ONLY';blockId?:string;scheduleVersion?:string;weekday?:number;exceptionId?:string;from?:string;through?:string;startMinute?:number;endMinute?:number;slotMinutes?:number;timezone?:string};
}
export interface BookingEvent {version:string;kind:string;actorId:string;occurredAt:string;before:Booking|null;after:Booking;}
export interface BookingPage {items:Booking[];page:number;size:number;totalElements:number;}
export interface BookingCreate {clinicId:string;start:string;contactName:string;contactPhone:string;attendeeName:string;patientId?:string|null;specialtyContextId?:string;}
export const STATUS_LABELS:Record<BookingStatus,string>={CONFIRMED:'Confirmado',CHECKED_IN:'En consultorio',COMPLETED:'Atendido',NO_SHOW:'Ausente',CANCELLED:'Cancelado'};
export function transitions(status:BookingStatus):BookingStatus[]{return status==='CONFIRMED'?['CHECKED_IN','NO_SHOW','CANCELLED']:status==='CHECKED_IN'?['COMPLETED','CANCELLED']:[];}
export function addDays(date:string,delta:number):string {const d=new Date(date+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+delta);return d.toISOString().slice(0,10);}
export function civilDate(instant:string,zone:string):string {
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(instant));
 const get=(key:string)=>parts.find(p=>p.type===key)?.value;return `${get('year')}-${get('month')}-${get('day')}`;
}
export function localTime(instant:string,zone:string):string {return new Intl.DateTimeFormat('es-AR',{timeZone:zone,hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date(instant));}
export function offsetLabel(instant:string,zone:string):string {return new Intl.DateTimeFormat('en',{timeZone:zone,timeZoneName:'shortOffset'}).formatToParts(new Date(instant)).find(p=>p.type==='timeZoneName')?.value??zone;}
export function slotOffsetLabel(instant: string, zone: string): string {
  return isArgentineTimezone(zone) ? '' : offsetLabel(instant, zone);
}
export function displayDay(date:string):string {return date.split('-').reverse().join('/');}
