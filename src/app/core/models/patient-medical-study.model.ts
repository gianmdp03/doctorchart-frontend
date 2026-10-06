export interface PatientMedicalStudy {
  id: number;
  patientId: number;
  originalFileName: string;
  contentType: string;
  fileSize: number;
  description: string | null;
  uploadedAt: string;
}
