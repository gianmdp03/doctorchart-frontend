import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MedicalCalculatorsService } from './medical-calculators.service';

describe('MedicalCalculatorsService', () => {
  let service: MedicalCalculatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MedicalCalculatorsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(MedicalCalculatorsService);
  });

  describe('Holliday-Segar Formula', () => {
    it('should accurately calculate basal fluid requirements for < 10 kg', () => {
      const res = service.calculateHollidaySegar({ weightKg: 8 });
      expect(res).not.toBeNull();
      expect(res?.rawValue).toBe(800);
      expect(res?.formattedValue).toBe('800');
      expect(res?.unit).toBe('mL/día');
    });

    it('should accurately calculate basal fluid requirements for 10-20 kg', () => {
      const res = service.calculateHollidaySegar({ weightKg: 15 });
      expect(res).not.toBeNull();
      // 1000 + (15 - 10) * 50 = 1250
      expect(res?.rawValue).toBe(1250);
      expect(res?.formattedValue).toBe('1250');
    });

    it('should accurately calculate basal fluid requirements for > 20 kg', () => {
      const res = service.calculateHollidaySegar({ weightKg: 25 });
      expect(res).not.toBeNull();
      // 1500 + (25 - 20) * 20 = 1600
      expect(res?.rawValue).toBe(1600);
      expect(res?.formattedValue).toBe('1600');
    });

    it('should return null when weight is missing or invalid', () => {
      expect(service.calculateHollidaySegar({ weightKg: null })).toBeNull();
      expect(service.calculateHollidaySegar({ weightKg: 0 })).toBeNull();
      expect(service.calculateHollidaySegar({ weightKg: -5 })).toBeNull();
    });
  });

  describe('Mosteller BSA Formula', () => {
    it('should calculate BSA accurately using sqrt((weight * height) / 3600)', () => {
      // 36 * 100 / 3600 = 1 -> sqrt(1) = 1.00
      const res = service.calculateBsaMosteller({ weightKg: 36, heightCm: 100 });
      expect(res).not.toBeNull();
      expect(res?.rawValue).toBe(1.0);
      expect(res?.formattedValue).toBe('1.00');
      expect(res?.unit).toBe('m²');
    });

    it('should return null when weight or height is missing', () => {
      expect(service.calculateBsaMosteller({ weightKg: null, heightCm: 120 })).toBeNull();
      expect(service.calculateBsaMosteller({ weightKg: 20, heightCm: null })).toBeNull();
    });
  });

  describe('Pediatric Dosage Formula', () => {
    it('should calculate mg and mL per dose for mg/kg/dia', () => {
      const res = service.calculatePediatricDosage({
        weightKg: 10,
        targetDoseMgKg: 50,
        doseUnit: 'mg/kg/dia',
        drugConcentrationMg: 250,
        drugConcentrationMl: 5,
        dosesPerDay: 3,
      });

      expect(res).not.toBeNull();
      // Total mg/day = 10 * 50 = 500 mg
      // mg per dose = 500 / 3 = 166.67 mg
      // mL per dose = (166.67 * 5) / 250 = 3.33 mL
      expect(res?.rawValue).toBe(3.33);
      expect(res?.unit).toBe('mL/dosis');
    });

    it('should return null if any parameter is missing or non-positive', () => {
      expect(
        service.calculatePediatricDosage({
          weightKg: null,
          targetDoseMgKg: 50,
          doseUnit: 'mg/kg/dia',
          drugConcentrationMg: 250,
          drugConcentrationMl: 5,
          dosesPerDay: 3,
        })
      ).toBeNull();
    });
  });
});
