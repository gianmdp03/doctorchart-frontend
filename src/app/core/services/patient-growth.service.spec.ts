import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PatientGrowthService } from './patient-growth.service';
import { ClinicalEncounterList } from '../models/clinical-encounter.model';
import { MedicalCheckupDetailDTO } from '../models/checkup.model';
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

  describe('calculateExactAgeInMonths', () => {
    it('should return 0 when target is before birth or dates are invalid', () => {
      expect(service.calculateExactAgeInMonths('invalid', '2024-01-01')).toBe(0);
      expect(service.calculateExactAgeInMonths('2024-05-01', '2024-01-01')).toBe(0);
    });

    it('should calculate accurate decimal months', () => {
      // 30.4375 days ≈ 1 month
      const months = service.calculateExactAgeInMonths('2024-01-01', '2024-04-01');
      expect(months).toBeGreaterThanOrEqual(2.9);
      expect(months).toBeLessThanOrEqual(3.1);
    });

    it('should calculate 12 months for 1 year difference', () => {
      const months = service.calculateExactAgeInMonths('2023-01-01', '2024-01-01');
      expect(months).toBe(12);
    });
  });

  describe('formatAge', () => {
    it('should return Recién nacido for same birth date', () => {
      expect(service.formatAge('2024-05-10', '2024-05-10')).toBe('Recién nacido');
    });

    it('should return days for age under 1 month', () => {
      expect(service.formatAge('2024-05-01', '2024-05-15')).toBe('14 días');
    });

    it('should return months and days for pediatric age between 1 and 24 months', () => {
      const formatted = service.formatAge('2024-01-01', '2024-04-15');
      expect(formatted).toBe('3 meses y 14 días');
    });

    it('should return years and months for age >= 2 years', () => {
      const formatted = service.formatAge('2021-01-01', '2023-04-01');
      expect(formatted).toBe('2 años y 3 meses');
    });

    it('should return only years when months is 0 for age >= 2 years', () => {
      const formatted = service.formatAge('2021-01-01', '2024-01-01');
      expect(formatted).toBe('3 años');
    });
  });

  describe('formatDate', () => {
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

  describe('extractPatientMeasurements', () => {
    const mockPatient = {
      birthDate: '2024-01-01',
      gender: 'MALE',
      personalHistory: {
        birthMeasurements: {
          weight: 3.3,
          height: 50.0,
          headCircumference: 35.0,
        },
      },
    };

    const mockEncounters: ClinicalEncounterList[] = [
      {
        id: 2,
        patientId: 10,
        encounterDate: '2024-04-01',
        specialty: 'PEDIATRICS',
        consultationType: 'ROUTINE_CHECKUP',
        vitalSigns: {
          weightKg: 6.4,
          heightCm: 62.0,
        },
        dynamicData: {
          perimetroCefalico: 41.0,
        },
      },
      {
        id: 1,
        patientId: 10,
        encounterDate: '2024-02-01',
        specialty: 'PEDIATRICS',
        consultationType: 'FIRST_VISIT',
        vitalSigns: {
          weightKg: 4.5,
          heightCm: 55.0,
        },
        dynamicData: {
          perimetro_cefalico: 37.5,
        },
      },
    ];

    it('should return empty list if patient or birthDate is missing', () => {
      expect(service.extractPatientMeasurements({ birthDate: null }, [], 'WEIGHT')).toEqual([]);
    });

    it('should extract birth measurement + encounters sorted chronologically for WEIGHT', () => {
      const weights = service.extractPatientMeasurements(mockPatient, mockEncounters, 'WEIGHT');
      expect(weights.length).toBe(3);

      // Point 0: birth
      expect(weights[0].ageMonths).toBe(0);
      expect(weights[0].value).toBe(3.3);
      expect(weights[0].unit).toBe('kg');

      // Point 1: 2024-02-01 (1 month)
      expect(weights[1].encounterId).toBe(1);
      expect(weights[1].value).toBe(4.5);
      expect(weights[1].date).toBe('2024-02-01');

      // Point 2: 2024-04-01 (3 months)
      expect(weights[2].encounterId).toBe(2);
      expect(weights[2].value).toBe(6.4);
      expect(weights[2].date).toBe('2024-04-01');
    });

    it('should extract heights accurately including birth height', () => {
      const heights = service.extractPatientMeasurements(mockPatient, mockEncounters, 'HEIGHT');
      expect(heights.length).toBe(3);
      expect(heights[0].value).toBe(50.0);
      expect(heights[1].value).toBe(55.0);
      expect(heights[2].value).toBe(62.0);
    });

    it('should extract head circumference from dynamicData and birth measurements', () => {
      const hc = service.extractPatientMeasurements(mockPatient, mockEncounters, 'HEAD_CIRCUMFERENCE');
      expect(hc.length).toBe(3);
      expect(hc[0].value).toBe(35.0);
      expect(hc[1].value).toBe(37.5);
      expect(hc[2].value).toBe(41.0);
    });

    it('should support checkups if provided and avoid duplicate entries on same date', () => {
      const checkups: MedicalCheckupDetailDTO[] = [
        {
          id: 55,
          patientId: 10,
          patientFullName: 'Test',
          checkupDate: '2024-04-01',
          reason: 'ROUTINE',
          measurements: {
            weight: 6.4, // duplicate with encounter id 2 on 2024-04-01
          },
        },
        {
          id: 56,
          patientId: 10,
          patientFullName: 'Test',
          checkupDate: '2024-05-01',
          reason: 'ROUTINE',
          measurements: {
            weight: 7.2,
          },
        },
      ];

      const weights = service.extractPatientMeasurements(mockPatient, mockEncounters, 'WEIGHT', checkups);
      expect(weights.length).toBe(4); // birth + 2 encounters + 1 new checkup (duplicate skipped)
      expect(weights[3].value).toBe(7.2);
    });

    it('should prefer backend curves when provided', () => {
      const backendCurves: BackendGrowthMeasurement[] = [
        {
          consultaId: 101,
          fechaConsulta: '2024-03-01',
          edadMeses: 2.0,
          edadLegible: '2 meses exactos',
          peso: 5.6,
          talla: 59.0,
          perimetroEncefalico: 39.5,
        },
      ];

      const weights = service.extractPatientMeasurements(
        mockPatient,
        mockEncounters,
        'WEIGHT',
        [],
        backendCurves
      );

      expect(weights.length).toBe(2); // birth + backend measurement
      expect(weights[0].ageMonths).toBe(0);
      expect(weights[0].value).toBe(3.3);
      expect(weights[1].encounterId).toBe(101);
      expect(weights[1].value).toBe(5.6);
      expect(weights[1].ageFormatted).toBe('2 meses exactos');
      expect(weights[1].ageMonths).toBe(2.0);
    });
  });

  describe('getPatientGrowthCurves', () => {
    it('should perform GET request to /patients/{patientId}/curvas', () => {
      const mockBackendData: BackendGrowthMeasurement[] = [
        {
          consultaId: 1,
          fechaConsulta: '2024-02-15',
          edadMeses: 1.5,
          edadLegible: '1 mes y 15 días',
          peso: 4.8,
          talla: 56.0,
          perimetroEncefalico: 38.0,
        },
      ];

      service.getPatientGrowthCurves(42).subscribe((data) => {
        expect(data).toEqual(mockBackendData);
      });

      const req = httpMock.expectOne((r) => r.url.endsWith('/patients/42/curvas'));
      expect(req.request.method).toBe('GET');
      req.flush(mockBackendData);
    });
  });

  describe('transformBackendMeasurements', () => {
    it('should transform backend measurements to PatientGrowthMeasurement format', () => {
      const mockBackendData: BackendGrowthMeasurement[] = [
        {
          consultaId: 99,
          fechaConsulta: '2024-03-01',
          edadMeses: 2.0,
          edadLegible: '2 meses',
          peso: 5.5,
          talla: 58.5,
          perimetroEncefalico: 39.0,
        },
      ];

      const weights = service.transformBackendMeasurements(mockBackendData, 'WEIGHT', 'MALE');
      expect(weights.length).toBe(1);
      expect(weights[0].value).toBe(5.5);
      expect(weights[0].unit).toBe('kg');
      expect(weights[0].encounterId).toBe(99);

      const heights = service.transformBackendMeasurements(mockBackendData, 'HEIGHT', 'MALE');
      expect(heights.length).toBe(1);
      expect(heights[0].value).toBe(58.5);
      expect(heights[0].unit).toBe('cm');

      const hcs = service.transformBackendMeasurements(mockBackendData, 'HEAD_CIRCUMFERENCE', 'MALE');
      expect(hcs.length).toBe(1);
      expect(hcs[0].value).toBe(39.0);
      expect(hcs[0].unit).toBe('cm');
    });
  });
});
