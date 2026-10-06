import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PatientGrowthService } from './patient-growth.service';
import { BackendGrowthMeasurement } from '../models/growth-chart.model';

describe('PatientGrowthService', () => {
  let service: PatientGrowthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PatientGrowthService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(PatientGrowthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('normalizeGender', () => {
    it('should normalize female variants to FEMALE', () => {
      expect(service.normalizeGender('FEMALE')).toBe('FEMALE');
      expect(service.normalizeGender('female')).toBe('FEMALE');
      expect(service.normalizeGender('F')).toBe('FEMALE');
      expect(service.normalizeGender('femenino')).toBe('FEMALE');
      expect(service.normalizeGender('Mujer')).toBe('FEMALE');
      expect(service.normalizeGender('Niña')).toBe('FEMALE');
    });

    it('should normalize male variants or defaults to MALE', () => {
      expect(service.normalizeGender('MALE')).toBe('MALE');
      expect(service.normalizeGender('male')).toBe('MALE');
      expect(service.normalizeGender('M')).toBe('MALE');
      expect(service.normalizeGender('masculino')).toBe('MALE');
      expect(service.normalizeGender(null)).toBe('MALE');
      expect(service.normalizeGender(undefined)).toBe('MALE');
      expect(service.normalizeGender('')).toBe('MALE');
      expect(service.normalizeGender('OTHER')).toBe('MALE');
    });
  });

  describe('formatDate', () => {
    it('uses the Argentina calendar day for offset instants', () => {
      expect(service.formatDate('2026-01-02T01:00:00Z')).toBe('01/01/2026');
    });
    it('should format ISO YYYY-MM-DD to DD/MM/YYYY', () => {
      expect(service.formatDate('2024-06-15')).toBe('15/06/2024');
      expect(service.formatDate('2024-06-15T10:30:00Z')).toBe('15/06/2024');
    });
  });

  describe('estimatePercentile', () => {
    it('should return ~P50 for median birth weight boy (3.3 kg)', () => {
      const result = service.estimatePercentile(0, 3.3, 'MALE', 'WEIGHT');
      expect(result).toBe('~P50');
    });

    it('should return < P3 for severely underweight boy at birth (2.0 kg)', () => {
      const result = service.estimatePercentile(0, 2.0, 'MALE', 'WEIGHT');
      expect(result).toBe('< P3');
    });

    it('should return > P97 for overweight girl at 12 months (13.0 kg)', () => {
      const result = service.estimatePercentile(12, 13.0, 'FEMALE', 'WEIGHT');
      expect(result).toBe('> P97');
    });

    it('should return P15 - P50 for value between p15 and p50', () => {
      // For boy at 0 months: P15 = 2.9, P50 = 3.3 -> 3.1 is in between
      const result = service.estimatePercentile(0, 3.1, 'MALE', 'WEIGHT');
      expect(result).toBe('P15 - P50');
    });
  });

  const point = (overrides: Partial<BackendGrowthMeasurement> = {}): BackendGrowthMeasurement => ({
    source: 'ENCOUNTER', encounterId: 1, date: '2024-04-01', ageMonths: 3,
    ageFormatted: '3 meses', measurements: {weightKg: 5.5, heightCm: 60, headCircumferenceCm: 39}, ...overrides,
  });
  it('requests only the canonical measurement endpoint', () => {
    let values: BackendGrowthMeasurement[] = [];
    service.getPatientGrowthCurves(7).subscribe(result => values = result);
    const request = httpMock.expectOne(req => req.url.endsWith('/patients/7/measurements'));
    expect(request.request.method).toBe('GET'); request.flush([point()]); expect(values).toEqual([point()]);
  });
  it('keeps kg and cm without guessing units from magnitude', () => {
    const values = [point({measurements:{weightKg:125,heightCm:300,headCircumferenceCm:280}})];
    expect(service.transformBackendMeasurements(values,'WEIGHT','MALE')[0].value).toBe(125);
    expect(service.transformBackendMeasurements(values,'HEIGHT','MALE')[0].value).toBe(300);
    expect(service.transformBackendMeasurements(values,'HEAD_CIRCUMFERENCE','MALE')[0].value).toBe(280);
  });
  it('keeps the birth point once, distinct same-day consultations and backend ages', () => {
    const values = [point({source:'BIRTH',encounterId:null,date:'2024-01-01',ageMonths:0,ageFormatted:'Al nacer'}),point(),point({encounterId:2})];
    const result = service.transformBackendMeasurements(values,'WEIGHT','FEMALE');
    expect(result.map(m => m.encounterId)).toEqual([undefined,1,2]);
    expect(result[0].ageFormatted).toBe('Al nacer'); expect(result[1].ageFormatted).toBe('3 meses');
    expect(result[1].dateFormatted).toBe('01/04/2024'); expect(result[1].unit).toBe('kg');
  });
  it('omits missing, nonnumeric or invalid measurements without fabricating points', () => {
    const values = [null,0,-1,Infinity,NaN,'3500'].map(weightKg => point({measurements:{weightKg:weightKg as any}}));
    expect(service.transformBackendMeasurements(values,'WEIGHT','MALE')).toEqual([]);
    expect(service.transformBackendMeasurements([],'WEIGHT','MALE')).toEqual([]);
  });
  it('propagates backend errors without a local history fallback', () => {
    let failed = false; service.getPatientGrowthCurves(7).subscribe({error:()=>failed=true});
    httpMock.expectOne(req => req.url.endsWith('/patients/7/measurements')).flush({}, {status:403,statusText:'Forbidden'});
    expect(failed).toBe(true);
  });
});
