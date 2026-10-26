export interface PatientMedicalStudy {
  id: number;
  patientId: number;
  name: string;
  originalFileName: string;
  contentType: string;
  fileSize: number;
  description: string | null;
  uploadedAt: string;
}
