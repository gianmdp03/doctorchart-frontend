import type {AppointmentModality} from '../clinics/clinics.models';
import type {RescheduleResponse} from '../calendar/bookings.models';

export interface PublicQuestion{key:string;label:string;required:boolean;}
export interface PublicBookingForm{version:string;questions:PublicQuestion[];}
export interface PublicClinic{id:string;modality?:AppointmentModality;name:string;country:string;province:string;city:string;address:string;timezone:string;}
export interface PublicContext{id:string;code:string;name:string;clinics:PublicClinic[];}
export interface PublicDoctor{specialties?:PublicContext[];id:string;name:string;description:string;specialtyCode:string;specialty:string;clinics:PublicClinic[];form:{version:string;questions:PublicQuestion[]};}
export interface PublicBookingDraft{specialtyContextId?:string;clinicId:string;start:string;formVersion:string;contactName:string;contactPhone:string;attendeeName:string;documentCountry:string;documentType:'DNI';document:string;email:string;answers:Record<string,string>;}
export interface PublicConfirmation{modality?:AppointmentModality;specialtyName?:string;verificationRequestId?:string;maskedEmail?:string;reference:string;status:string;start:string;end:string;doctorName:string;clinicName:string;address:string;timezone:string;contactName:string;attendeeName:string;}
export interface AvailabilityDay { date: string; slots: { start: string; end: string }[]; }
export interface PortalSelection { document: string; reference: string; }
export interface PortalDraft extends PortalSelection { requestId: string; maskedEmail: string; }
export interface PortalPreview { reference: string; date: string; canChange: boolean; canReschedule: boolean; canAccess: boolean; }
export type PortalBooking = Omit<PublicConfirmation, 'contactName' | 'attendeeName' | 'verificationRequestId' | 'maskedEmail'> & {
  version: string;
  canChange: boolean;
  rescheduleResponse?: RescheduleResponse | null;
  rescheduleProposalVersion?: string | null;
  publicDoctorId: string | null;
  publicClinicId: string | null;
  specialtyContextId: string;
};
export interface Publication{specialtyContextIds?:string[];publicId?:string;version:string;name:string;description:string;published:boolean;clinics:{clinicId:string;enabled:boolean;address:string}[];questions:PublicQuestion[];}

export interface PublicBookingDetails{reference:string;formVersion:string;form:{version:string;questions:PublicQuestion[]};answers:Record<string,string>;documentCountry:string;documentType:string;document:string;email:string;}
