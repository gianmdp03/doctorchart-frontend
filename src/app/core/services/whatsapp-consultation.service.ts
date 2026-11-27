import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CreateWhatsAppConsultationRequest,
  UpdateWhatsAppConsultationRequest,
  WhatsAppConsultation,
} from '../models/whatsapp-consultation.model';

@Injectable({ providedIn: 'root' })
export class WhatsAppConsultationService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/patients`;

  list(patientId: number): Observable<WhatsAppConsultation[]> {
    return this.http.get<WhatsAppConsultation[]>(
      `${this.baseUrl}/${patientId}/whatsapp-consultations`,
    );
  }

  get(patientId: number, consultationId: number): Observable<WhatsAppConsultation> {
    return this.http.get<WhatsAppConsultation>(
      `${this.baseUrl}/${patientId}/whatsapp-consultations/${consultationId}`,
    );
  }

  create(
    patientId: number,
    request: CreateWhatsAppConsultationRequest,
  ): Observable<WhatsAppConsultation> {
    return this.http.post<WhatsAppConsultation>(
      `${this.baseUrl}/${patientId}/whatsapp-consultations`,
      request,
    );
  }

  update(
    patientId: number,
    consultationId: number,
    request: UpdateWhatsAppConsultationRequest,
  ): Observable<WhatsAppConsultation> {
    return this.http.put<WhatsAppConsultation>(
      `${this.baseUrl}/${patientId}/whatsapp-consultations/${consultationId}`,
      request,
    );
  }

  annul(
    patientId: number,
    consultationId: number,
    reason: string,
    expectedVersion?: number,
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${patientId}/whatsapp-consultations/${consultationId}`,
      {
        body: expectedVersion === undefined ? { reason } : { reason, expectedVersion },
      },
    );
  }
}
