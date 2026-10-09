import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PatientGrowthService } from './patient-growth.service';
import { patientGrowthFixture } from '../testing/growth.fixture';

describe('PatientGrowthService', () => {
  let service: PatientGrowthService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PatientGrowthService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
  it('uses the authenticated patient growth endpoint and preserves backend precision', () => {
    const response = patientGrowthFixture(7);
    response.charts[0].points[0].evaluation = { zScore: -0.182837283, percentile: 42.7472849 };
    let result: unknown;
    service.getPatientGrowthCurves(7).subscribe((data) => (result = data));
    const request = http.expectOne((req) => req.url.endsWith('/patients/7/growth'));
    expect(request.request.method).toBe('GET');
    request.flush(response);
    expect(result).toEqual(response);
  });
  it('sends explicit reference/position confirmations, never a guessed sex', () => {
    service
      .getPatientGrowthCurves(7, 'FEMALE', { BIRTH: 'RECUMBENT', '11': 'STANDING' })
      .subscribe();
    const request = http.expectOne((req) => req.url.endsWith('/patients/7/growth'));
    expect(request.request.params.get('referenceSex')).toBe('FEMALE');
    expect(JSON.parse(request.request.params.get('measurementModes')!)).toEqual({
      BIRTH: 'RECUMBENT',
      '11': 'STANDING',
    });
    request.flush(patientGrowthFixture(7));
  });
  it('propagates errors without substituting local patient measurements', () => {
    let failed = false;
    service.getPatientGrowthCurves(7).subscribe({ error: () => (failed = true) });
    http
      .expectOne((req) => req.url.endsWith('/patients/7/growth'))
      .flush({}, { status: 403, statusText: 'Forbidden' });
    expect(failed).toBe(true);
  });
  it('formats calendar dates and instants on the Argentina calendar', () => {
    expect(service.formatDate('2026-01-02T01:00:00Z')).toBe('01/01/2026');
    expect(service.formatDate('2024-06-15')).toBe('15/06/2024');
  });
});
