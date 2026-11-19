import type { AgendaDay } from '../calendar/agenda-timeline';
import type { AppointmentModality } from '../clinics/clinics.models';

export interface ScheduleRange { id?:string; specialtyContextId?:string; slotMinutes?:number; start: string; end: string; }
export interface ScheduleDay { weekday: number; ranges: ScheduleRange[]; }
export interface ScheduleException { id?:string; from: string; through: string; label: string; ranges: ScheduleRange[]; }
export interface ClinicSchedule {
 clinicId: string; version: string; configured: boolean;
 slotMinutes: number | null; minNoticeMinutes: number | null; maxAdvanceDays: number | null;
 weekly: ScheduleDay[]; exceptions: ScheduleException[];
}
export interface ScheduleUpdate {
 expectedVersion: string; slotMinutes?: number; minNoticeMinutes: number; maxAdvanceDays: number;
 weekly: ScheduleDay[]; exceptions: ScheduleException[];
}
export interface Availability {
 clinicId: string; timezone: string; scheduleVersion: string; generatedAt: string;
 days: AgendaDay<{start:string;end:string;specialtyContextId?:string}>[];
}

export interface AgendaWindow {
  specialtyContextId?: string;
  clinicId: string;
  name: string;
  modality: AppointmentModality;
  timezone: string;
  start: string;
  end: string;
}

export interface ScheduleConflict {
  requested: AgendaWindow;
  existing: AgendaWindow;
  date: string;
  weekday: number;
  overlapStart: string;
  overlapEnd: string;
}

export interface OccupiedSchedule {
  timezone: string;
  items: AgendaWindow[];
}
