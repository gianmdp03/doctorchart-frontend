export interface ScheduleRange { start: string; end: string; }
export interface ScheduleDay { weekday: number; ranges: ScheduleRange[]; }
export interface ScheduleException { from: string; through: string; label: string; ranges: ScheduleRange[]; }
export interface ClinicSchedule {
 clinicId: string; version: string; configured: boolean;
 slotMinutes: number | null; minNoticeMinutes: number | null; maxAdvanceDays: number | null;
 weekly: ScheduleDay[]; exceptions: ScheduleException[];
}
export interface ScheduleUpdate {
 expectedVersion: string; slotMinutes: number; minNoticeMinutes: number; maxAdvanceDays: number;
 weekly: ScheduleDay[]; exceptions: ScheduleException[];
}
export interface Availability {
 clinicId: string; timezone: string; scheduleVersion: string; generatedAt: string;
 days: {date:string;slots:{start:string;end:string}[]}[];
}
