import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { environment } from '../../../environments/environment';
import { WhatsAppConsultation } from '../models/whatsapp-consultation.model';
import { WhatsAppConsultationService } from './whatsapp-consultation.service';

describe('WhatsAppConsultationService', () => {
  let service: WhatsAppConsultationService;
  let httpMock: HttpTestingController;
  const base = `${environment.apiUrl}/patients`;

  const sample: WhatsAppConsultation = {
    id: 12,
    patientId: 44,
    specialtyContextId: 101,
    authorUserId: 'doctor-1',
    consultedAt: '2026-11-26T15:30:00Z',
    content: 'Indicaciones por WhatsApp',
    createdAt: '2026-11-27T10:00:00Z',
    updatedAt: '2026-11-27T10:00:00Z',
    version: 0,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(WhatsAppConsultationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('lists WhatsApp consultations for a patient', () => {
    let result: WhatsAppConsultation[] | undefined;
    service.list(44).subscribe((items) => (result = items));
    const req = httpMock.expectOne(`${base}/44/whatsapp-consultations`);
    expect(req.request.method).toBe('GET');
    req.flush([sample]);
    expect(result).toEqual([sample]);
  });

  it('creates a WhatsApp consultation', () => {
    let result: WhatsAppConsultation | undefined;
    service
      .create(44, { consultedAt: sample.consultedAt, content: sample.content })
      .subscribe((item) => (result = item));
    const req = httpMock.expectOne(`${base}/44/whatsapp-consultations`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      consultedAt: sample.consultedAt,
      content: sample.content,
    });
    req.flush(sample);
    expect(result).toEqual(sample);
  });

  it('updates a WhatsApp consultation with expectedVersion', () => {
    let result: WhatsAppConsultation | undefined;
    service
      .update(44, 12, {
        expectedVersion: 0,
        consultedAt: sample.consultedAt,
        content: 'Actualizado',
        reason: 'Corrección',
      })
      .subscribe((item) => (result = item));
    const req = httpMock.expectOne(`${base}/44/whatsapp-consultations/12`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({
      expectedVersion: 0,
      consultedAt: sample.consultedAt,
      content: 'Actualizado',
      reason: 'Corrección',
    });
    req.flush({ ...sample, content: 'Actualizado', version: 1 });
    expect(result?.version).toBe(1);
  });

  it('annuls a WhatsApp consultation with reason and expectedVersion', () => {
    let completed = false;
    service.annul(44, 12, 'Registro duplicado', 0).subscribe(() => (completed = true));
    const req = httpMock.expectOne(`${base}/44/whatsapp-consultations/12`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.body).toEqual({ reason: 'Registro duplicado', expectedVersion: 0 });
    req.flush(null);
    expect(completed).toBe(true);
  });
});
