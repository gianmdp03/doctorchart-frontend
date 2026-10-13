import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PatientMedicalStudyService } from './patient-medical-study.service';
import { environment } from '../../../environments/environment';
import { PatientMedicalStudy } from '../models/patient-medical-study.model';

describe('PatientMedicalStudyService', () => {
  let service: PatientMedicalStudyService;
  let httpTesting: HttpTestingController;

  const mockStudies: PatientMedicalStudy[] = [
    {
      id: 1,
      patientId: 10,
      originalFileName: 'radiografia.pdf',
      contentType: 'application/pdf',
      fileSize: 1024,
      description: 'Radiografía de tórax',
      uploadedAt: '2026-10-01T12:00:00Z',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(PatientMedicalStudyService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should fetch studies for a patient', () => {
    service.getStudies(10).subscribe((studies) => {
      expect(studies.length).toBe(1);
      expect(studies[0].originalFileName).toBe('radiografia.pdf');
    });

    const req = httpTesting.expectOne(`${environment.apiUrl}/patients/10/studies`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStudies);
  });

  it('should upload a study file', () => {
    const file = new File(['test content'], 'test.png', { type: 'image/png' });
    service.uploadStudy(10, file, 'Foto de tomografía').subscribe((res) => {
      expect(res.id).toBe(2);
      expect(res.description).toBe('Foto de tomografía');
    });

    const req = httpTesting.expectOne(`${environment.apiUrl}/patients/10/studies`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBe(true);
    expect(req.request.body.get('file')).toBe(file);
    expect(req.request.body.get('description')).toBe('Foto de tomografía');
    expect(Array.from(req.request.body.keys())).toEqual(['file', 'description']);
    req.flush({
      id: 2,
      patientId: 10,
      originalFileName: 'test.png',
      contentType: 'image/png',
      fileSize: 12,
      description: 'Foto de tomografía',
      uploadedAt: '2026-10-01T12:05:00Z',
    });
  });

  it('should delete a study file', () => {
    service.deleteStudy(10, 1).subscribe();

    const req = httpTesting.expectOne(`${environment.apiUrl}/patients/10/studies/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null, { status: 204, statusText: 'No Content' });
  });
});
