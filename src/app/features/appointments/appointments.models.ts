export interface PublicQuestion{key:string;label:string;required:boolean;}
export interface PublicClinic{id:string;name:string;country:string;province:string;city:string;address:string;timezone:string;}
export interface PublicDoctor{id:string;name:string;description:string;specialtyCode:string;specialty:string;clinics:PublicClinic[];form:{version:string;questions:PublicQuestion[]};}
export interface PublicBookingDraft{clinicId:string;start:string;formVersion:string;contactName:string;contactPhone:string;attendeeName:string;documentCountry:string;documentType:'DNI'|'PASSPORT';document:string;email:string;answers:Record<string,string>;}
export interface PublicConfirmation{reference:string;status:string;start:string;end:string;doctorName:string;clinicName:string;address:string;timezone:string;contactName:string;attendeeName:string;}
export interface Publication{publicId?:string;version:string;name:string;description:string;published:boolean;clinics:{clinicId:string;enabled:boolean;address:string}[];questions:PublicQuestion[];}

export interface PublicBookingDetails{reference:string;formVersion:string;form:{version:string;questions:PublicQuestion[]};answers:Record<string,string>;documentCountry:string;documentType:string;document:string;email:string;}
