import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PatientVaccinationService } from './patient-vaccination.service';
import { environment } from '../../../environments/environment';

describe('Patient vaccination transport', () => {
  let api: PatientVaccinationService, http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    api = TestBed.inject(PatientVaccinationService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
  it('requests the resolved schedule from the backend without a client age or date', () => {
    api.schedule(7).subscribe();
    const request = http.expectOne(environment.apiUrl + '/patients/7/vaccinations');
    expect(request.request.method).toBe('GET');
    expect(request.request.params.keys()).toEqual([]);
    request.flush({ patientId: 7, doses: [] });
  });
  it('writes one canonical dose with the patient and calendar revisions', () => {
    const body = {
      expectedVersion: 3,
      calendarId: 'calendar-v1',
      applied: true,
      appliedAt: '2026-10-05',
    };
    api.save(7, 'dose-stable-id', body).subscribe();
    const request = http.expectOne(environment.apiUrl + '/patients/7/vaccinations/dose-stable-id');
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(body);
    expect(request.request.body.records).toBeUndefined();
    expect(request.request.body.vaccineId).toBeUndefined();
    request.flush({});
  });
});
