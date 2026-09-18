import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { SpecialtySchemaService } from './specialty-schema.service';
import { environment } from '../../../environments/environment';
import { SpecialtySchema, SpecialtySummary } from '../models/specialty.model';

describe('SpecialtySchemaService', () => {
  let service: SpecialtySchemaService;
  let httpMock: HttpTestingController;

  const mockSummaries: SpecialtySummary[] = [
    { specialty: 'PEDIATRICS', displayName: 'Pediatría', description: 'Niños', fieldCount: 8 },
    { specialty: 'CARDIOLOGY', displayName: 'Cardiología', description: 'Corazón', fieldCount: 8 },
  ];

  const mockPediatricsSchema: SpecialtySchema = {
    specialty: 'PEDIATRICS',
    displayName: 'Pediatría y Neonatología',
    description: 'Protocolo pediátrico',
    version: '1.0.0',
    fields: [
      { key: 'apgarScore1Min', label: 'APGAR 1 min', type: 'NUMBER', required: false, group: 'Perinatal' },
      { key: 'feedingType', label: 'Alimentación', type: 'SELECT', required: true, group: 'Nutrición' },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpecialtySchemaService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(SpecialtySchemaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created with initial signals', () => {
    expect(service).toBeTruthy();
    expect(service.specialties()).toEqual([]);
    expect(service.currentSpecialty()).toBe('GENERAL_MEDICINE');
    expect(service.currentSchema()).toBeNull();
    expect(service.loading()).toBe(false);
  });

  it('should fetch and update specialties signal on getSpecialties()', () => {
    service.getSpecialties().subscribe((list) => {
      expect(list.length).toBe(2);
      expect(list[0].specialty).toBe('PEDIATRICS');
    });

    expect(service.loading()).toBe(true);

    const req = httpMock.expectOne(`${environment.apiUrl}/specialties`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSummaries);

    expect(service.specialties()).toEqual(mockSummaries);
    expect(service.loading()).toBe(false);
  });

  it('should fetch and cache schema on getSchema()', () => {
    // First call: makes HTTP request
    service.getSchema('PEDIATRICS').subscribe((schema) => {
      expect(schema.specialty).toBe('PEDIATRICS');
      expect(schema.fields.length).toBe(2);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/specialties/PEDIATRICS/schema`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPediatricsSchema);

    expect(service.currentSchema()).toEqual(mockPediatricsSchema);
    expect(service.currentSpecialty()).toBe('PEDIATRICS');

    // Second call: returns cached schema without HTTP request
    service.getSchema('PEDIATRICS').subscribe((cached) => {
      expect(cached).toEqual(mockPediatricsSchema);
    });
    httpMock.expectNone(`${environment.apiUrl}/specialties/PEDIATRICS/schema`);
  });

  it('should validate dynamic specialty data against backend rules', () => {
    const payload = { apgarScore1Min: 9, feedingType: 'EXCLUSIVE_BREASTFEEDING' };

    service.validateSpecialtyData('PEDIATRICS', payload).subscribe((res) => {
      expect(res.valid).toBe(true);
      expect(res.specialty).toBe('PEDIATRICS');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/specialties/PEDIATRICS/validate`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush({ valid: true, specialty: 'PEDIATRICS', message: 'Valid' });
  });
});
