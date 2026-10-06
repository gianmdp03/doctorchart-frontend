import { PrescriptionItem } from './clinical-encounter.model';

export type PrescriptionDocumentType = 'PRESCRIPTION' | 'STUDY_ORDERS';
export interface PrescriptionRequest {
  type: PrescriptionDocumentType;
  diagnosisDescription: string;
  generalInstructions: string;
  prescriptions: PrescriptionItem[];
  diagnosticOrders: string[];
}
export interface SavedPrescriptionRecord extends PrescriptionRequest {
  id: number;
  patientId: number;
  authorUserId: string;
  createdAt: string;
}
