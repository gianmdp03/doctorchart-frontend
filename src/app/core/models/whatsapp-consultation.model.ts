export interface WhatsAppConsultation {
  id: number;
  patientId: number;
  specialtyContextId: number;
  authorUserId: string;
  consultedAt: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface CreateWhatsAppConsultationRequest {
  consultedAt: string;
  content: string;
}

export interface UpdateWhatsAppConsultationRequest {
  expectedVersion: number;
  consultedAt: string;
  content: string;
  reason?: string;
}
