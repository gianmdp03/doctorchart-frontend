import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { DoctorProfileService } from './doctor-profile.service';
import { DoctorSpecialtyService } from './doctor-specialty.service';
import { environment } from '../../../environments/environment';

describe('DoctorProfileService read-only workspace view', () => {
  let service: DoctorProfileService;
  let http: HttpTestingController;
  let metadata: DoctorSpecialtyService;
  const profile = { id: 1, userId: 'doctor', specialty: { id: 10, code: 'new_xyz', name: 'Nueva', description: null },
    isSpecialtyLocked: true, createdAt: '2026-10-05T12:00:00Z' };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting(),
      { provide: PLATFORM_ID, useValue: 'browser' }] });
    service = TestBed.inject(DoctorProfileService);
    http = TestBed.inject(HttpTestingController);
    metadata = TestBed.inject(DoctorSpecialtyService);
  });
  afterEach(() => http.verify());

  it('loads canonical summary without overriding workspace metadata', async () => {
    metadata.setSpecialty({ id: 9, code: 'workspace', name: 'Configuración activa', description: null });
    const pending = service.loadProfile();
    http.expectOne(environment.apiUrl + '/doctor/profile').flush(profile);
    expect(await pending).toEqual(profile);
    expect(service.specialty()?.code).toBe('new_xyz');
    expect(service.isSpecialtyLocked()).toBe(true);
    expect(metadata.specialtyLabel()).toBe('Configuración activa');
  });

  it('404 means missing profile but server failure stays explicit and retryable', async () => {
    const missing = service.loadProfile();
    http.expectOne(environment.apiUrl + '/doctor/profile').flush(null, { status: 404, statusText: 'Not Found' });
    expect(await missing).toBeNull();
    expect(service.loaded()).toBe(true);
    const failed = service.loadProfile(true).catch(error => error);
    http.expectOne(environment.apiUrl + '/doctor/profile').flush(null, { status: 500, statusText: 'Error' });
    expect((await failed).status).toBe(500);
    expect(service.loaded()).toBe(false);
    expect(service.error()).toBeTruthy();
  });

  it('clear prevents old responses restoring the previous account', async () => {
    const old = service.loadProfile().catch(error => error);
    const request = http.expectOne(environment.apiUrl + '/doctor/profile');
    service.clearProfile();
    request.flush(profile);
    expect(await old).toBeInstanceOf(Error);
    expect(service.profile()).toBeNull();
    expect(service.loaded()).toBe(false);
  });

  it('simultaneous callers reuse the pending request', async () => {
    const first = service.loadProfile();
    const second = service.loadProfile(true);
    http.expectOne(environment.apiUrl + '/doctor/profile').flush(profile);
    expect(await first).toEqual(profile);
    expect(await second).toEqual(profile);
  });
});
