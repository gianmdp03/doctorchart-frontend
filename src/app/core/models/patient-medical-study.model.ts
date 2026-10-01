export interface PatientMedicalStudy {
  id: number;
  patientId: number;
  fileName: string;
  originalFileName: string;
  contentType: string;
  fileSize: number;
  description: string | null;
  createdAt: string;
}
