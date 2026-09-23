import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ClinicalEncounterService } from './clinical-encounter.service';
import { environment } from '../../../environments/environment';
import {
  ClinicalEncounterDetail,
  ClinicalEncounterList,
  ClinicalEncounterRequest,
} from '../models/clinical-encounter.model';

describe('ClinicalEncounterService', () => {
  let service: ClinicalEncounterService;
  let httpMock: HttpTestingController;

  const mockDetail: ClinicalEncounterDetail = {
    id: 10,
    patientId: 1,
    patientFullName: 'Carlos Menem',
    encounterDate: '2026-09-17T20:00:00',
    specialty: 'CARDIOLOGY',
    consultationType: 'FIRST_VISIT',
    chiefComplaint: 'Chest pain',
    primaryDiagnosisCode: 'I20.9',
    primaryDiagnosisDescription: 'Angina pectoris',
  };

  const mockList: ClinicalEncounterList[] = [
    {
      id: 10,
      patientId: 1,
      encounterDate: '2026-09-17T20:00:00',
      specialty: 'CARDIOLOGY',
      consultationType: 'FIRST_VISIT',
      chiefComplaint: 'Chest pain',
      primaryDiagnosisCode: 'I20.9',
      primaryDiagnosisDescription: 'Angina pectoris',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClinicalEncounterService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ClinicalEncounterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created with initial signals', () => {
    expect(service).toBeTruthy();
    expect(service.encounters()).toEqual([]);
    expect(service.currentEncounter()).toBeNull();
    expect(service.loading()).toBe(false);
  });

  it('should get encounter by ID and set currentEncounter signal', () => {
    service.getById(10).subscribe((encounter) => {
      expect(encounter.id).toBe(10);
      expect(encounter.specialty).toBe('CARDIOLOGY');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/encounters/10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDetail);

    expect(service.currentEncounter()).toEqual(mockDetail);
  });

  it('should get encounters by patient ID and update encounters signal', () => {
    service.getByPatient(1).subscribe((list) => {
      expect(list.length).toBe(1);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/encounters/patient/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockList);

    expect(service.encounters()).toEqual(mockList);
  });

  it('should get encounters filtered by patient ID and specialty', () => {
    service.getByPatientAndSpecialty(1, 'CARDIOLOGY').subscribe((list) => {
      expect(list.length).toBe(1);
      expect(list[0].specialty).toBe('CARDIOLOGY');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/encounters/patient/1/specialty/CARDIOLOGY`);
    expect(req.request.method).toBe('GET');
    req.flush(mockList);
  });

  it('should create an encounter via POST and update state', () => {
    const request: ClinicalEncounterRequest = {
      patientId: 1,
      encounterDate: '2026-09-17T20:00:00',
      specialty: 'CARDIOLOGY',
      consultationType: 'FIRST_VISIT',
      chiefComplaint: 'Chest pain',
      primaryDiagnosisCode: 'I20.9',
      primaryDiagnosisDescription: 'Angina pectoris',
    };

    service.create(request).subscribe((res) => {
      expect(res.id).toBe(10);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/encounters`);
    expect(req.request.method).toBe('POST');
    req.flush(mockDetail);

    expect(service.currentEncounter()).toEqual(mockDetail);
  });

  it('should update an encounter via PUT', () => {
    const request: ClinicalEncounterRequest = {
      patientId: 1,
      encounterDate: '2026-09-17T20:00:00',
      specialty: 'CARDIOLOGY',
      consultationType: 'FIRST_VISIT',
      chiefComplaint: 'Chest pain updated',
      primaryDiagnosisCode: 'I20.9',
      primaryDiagnosisDescription: 'Angina pectoris',
    };

    service.update(10, request).subscribe((res) => {
      expect(res.id).toBe(10);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/encounters/10`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockDetail);
  });

  it('should delete an encounter via DELETE and evict from signals', () => {
    service.encounters.set(mockList);
    service.currentEncounter.set(mockDetail);

    service.delete(10).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/encounters/10`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);

    expect(service.encounters()).toEqual([]);
    expect(service.currentEncounter()).toBeNull();
  });

  it('should call migratePediatricCheckups via POST', () => {
    service.migratePediatricCheckups().subscribe((res) => {
      expect(res.status).toBe('COMPLETED');
      expect(res.migratedNow).toBe(5);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/encounters/migrate-pediatric`);
    expect(req.request.method).toBe('POST');
    req.flush({ totalFound: 10, alreadyMigrated: 5, migratedNow: 5, status: 'COMPLETED' });
  });
});
