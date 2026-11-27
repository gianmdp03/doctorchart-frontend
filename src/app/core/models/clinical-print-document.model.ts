import { PrescriptionItem } from './clinical-encounter.model';
import { PrescriptionDocumentType } from './prescription.model';
import { InsuranceInfo } from './patient.model';
import { SignatureChoice } from './doctor-signature.model';

export type GrowthPrintReference = 'AUTO' | 'OMS' | 'DOWN' | 'BOTH';

export interface PrintDocumentReference {
  source: 'PRESCRIPTION_RECORD' | 'ENCOUNTER' | 'CLINICAL_HISTORY';
  patientId: number;
  id?: number;
  encounterId?: number;
  growthReference?: GrowthPrintReference;
  type?: PrescriptionDocumentType;
  signatureChoice?: SignatureChoice;
}
export interface ClinicalPrintDocument {
  source: PrintDocumentReference['source'];
  id: number;
  code: string;
  issuedAt: string;
  issuanceZone?: string;
  type: PrescriptionDocumentType;
  patient: {id:number;fullName:string;nationalId:string|null;birthDate:string;ageAtIssue:string|null;insuranceInfo:InsuranceInfo|null};
  author: {userId:string;specialtyName:string|null};
  primaryDiagnosisCode: string | null;
  primaryDiagnosisDescription: string | null;
  patientInstructions: string | null;
  prescriptions: PrescriptionItem[];
  diagnosticOrders: string[];
}
