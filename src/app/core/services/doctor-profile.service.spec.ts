import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { DoctorProfileService } from './doctor-profile.service';
import { DoctorSpecialtyService } from './doctor-specialty.service';
import { environment } from '../../../environments/environment';
import { DoctorProfile } from '../models/doctor-profile.model';

describe('DoctorProfileService', () => {
  let service: DoctorProfileService;
  let httpTesting: HttpTestingController;
  let specialtyService: DoctorSpecialtyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PLATFORM_ID, useValue: 'browser' },
        DoctorProfileService,
        DoctorSpecialtyService,
      ],
    });

    service = TestBed.inject(DoctorProfileService);
    httpTesting = TestBed.inject(HttpTestingController);
    specialtyService = TestBed.inject(DoctorSpecialtyService);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should initialize with null profile and unlocked state', () => {
    expect(service.profile()).toBeNull();
    expect(service.hasSpecialty()).toBe(false);
    expect(service.isSpecialtyLocked()).toBe(false);
    expect(service.specialty()).toBeNull();
  });

  it('should load profile successfully and lock specialty in specialtyService', async () => {
    const mockProfile: DoctorProfile = {
      id: 1,
      userId: 'doc-123',
      specialty: 'CARDIOLOGY',
      isSpecialtyLocked: true,
      createdAt: '2026-09-18T12:00:00Z',
    };

    const promise = service.loadProfile();

    const req = httpTesting.expectOne(environment.apiUrl + '/doctor/profile');
    expect(req.request.method).toBe('GET');
    req.flush(mockProfile);

    const result = await promise;
    expect(result).toEqual(mockProfile);
    expect(service.profile()).toEqual(mockProfile);
    expect(service.hasSpecialty()).toBe(true);
    expect(service.isSpecialtyLocked()).toBe(true);
    expect(service.specialty()).toBe('CARDIOLOGY');
    expect(specialtyService.activeSpecialty()).toBe('CARDIOLOGY');
  });

  it('should handle 404 on loadProfile gracefully and keep profile null', async () => {
    const promise = service.loadProfile();

    const req = httpTesting.expectOne(environment.apiUrl + '/doctor/profile');
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'Not found' }, { status: 404, statusText: 'Not Found' });

    const result = await promise;
    expect(result).toBeNull();
    expect(service.profile()).toBeNull();
    expect(service.hasSpecialty()).toBe(false);
    expect(specialtyService.activeSpecialty()).toBeNull();
    expect(service.loaded()).toBe(true);
  });

  it('should assign specialty successfully on POST and lock specialty state', async () => {
    const mockProfile: DoctorProfile = {
      id: 2,
      userId: 'doc-456',
      specialty: 'PEDIATRICS',
      isSpecialtyLocked: true,
      createdAt: '2026-09-18T12:00:00Z',
    };

    const promise = service.assignSpecialty('PEDIATRICS');

    const req = httpTesting.expectOne(environment.apiUrl + '/doctor/specialty');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ specialty: 'PEDIATRICS' });
    req.flush(mockProfile);

    const result = await promise;
    expect(result).toEqual(mockProfile);
    expect(service.hasSpecialty()).toBe(true);
    expect(service.specialty()).toBe('PEDIATRICS');
    expect(specialtyService.activeSpecialty()).toBe('PEDIATRICS');
  });
});
