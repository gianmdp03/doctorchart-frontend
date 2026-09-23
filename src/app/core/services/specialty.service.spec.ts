import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { SpecialtyService } from './specialty.service';
import { environment } from '../../../environments/environment';
import { SpecialtySummary } from '../models/specialty.model';

describe('SpecialtyService', () => {
  let service: SpecialtyService;
  let httpMock: HttpTestingController;

  const mockSummaries: SpecialtySummary[] = [
    {
      specialty: 'PEDIATRICS',
      displayName: 'Pediatría y Neonatología',
      description: 'Atención pediátrica',
    },
    {
      specialty: 'CARDIOLOGY',
      displayName: 'Cardiología',
      description: 'Salud cardiovascular',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecialtyService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(SpecialtyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch specialties from API on getSpecialties()', () => {
    service.getSpecialties().subscribe((list) => {
      expect(list.length).toBe(2);
      expect(list[0].specialty).toBe('PEDIATRICS');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/specialties`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSummaries);
  });
});
