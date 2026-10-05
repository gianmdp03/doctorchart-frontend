import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MedicalCalculatorsService } from './medical-calculators.service';
import { CalculationResultResponseDTO } from '../models/medical-calculators.model';
import { calculatorInputSummary } from '../models/calculator-input-summary';

export const FLUID_RESULT: CalculationResultResponseDTO = {
  calculatorId: 'holliday_segar', calculationName: 'Requerimiento Hídrico Basal Pediátrico (Holliday-Segar)',
  rawValue: 1250, formattedValue: '1250', unit: 'mL/día',
  interpretation: { code: 'fluid_maintenance', min: 0, max: 99999, label: 'Mantenimiento Hidroelectrolítico Estándar',
    severity: 'normal', clinicalAction: 'Conducta del servidor' },
  clinicalAction: 'Conducta del servidor', clinicalNotes: [], secondaryOutputs: [],
  calculatedAt: '2026-10-05T15:00:00Z', plainTextEvolution: 'Evolución generada por el servidor',
};

describe('MedicalCalculatorsService HTTP boundary', () => {
  let service: MedicalCalculatorsService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MedicalCalculatorsService, provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(MedicalCalculatorsService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('requests a server preview and adds only the existing presentation styles', () => {
    service.previewCalculation({ calculationCode: 'holliday_segar', inputSnapshot: { weightKg: 15 } }).subscribe(result => {
      expect(result.rawValue).toBe(1250);
      expect(result.plainTextEvolution).toBe(FLUID_RESULT.plainTextEvolution);
      expect(result.interpretation.badgeClass).toBe('badge-success');
      expect(result.interpretation.cardBorderClass).toBe('border-l-emerald-500');
    });
    const request = http.expectOne(req => req.url.endsWith('/calculators/preview'));
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ calculationCode: 'holliday_segar', inputSnapshot: { weightKg: 15 } });
    request.flush(FLUID_RESULT);
  });

  it('sends source inputs to persistence without result or presentation fields', () => {
    const payload = { patientId: 10, encounterId: 100, calculationCode: 'holliday_segar', inputSnapshot: { weightKg: 15 } };
    service.executeAndSaveToBackend(payload).subscribe();
    const request = http.expectOne(req => req.url.endsWith('/calculators/execute'));
    expect(request.request.body).toEqual(payload);
    request.flush({ id: 5 });
  });

  it('propagates preview errors without generating a local result', () => {
    let failed = false;
    service.previewCalculation({ calculationCode: 'holliday_segar', inputSnapshot: { weightKg: 15 } }).subscribe({
      next: () => { throw new Error('Unexpected result'); }, error: () => { failed = true; },
    });
    http.expectOne(req => req.url.endsWith('/calculators/preview')).flush({}, { status: 500, statusText: 'Error' });
    expect(failed).toBe(true);
  });

  it('keeps the pediatric input summary readable while using canonical input keys', () => {
    expect(calculatorInputSummary('pediatric_dosage', { weightKg: 10, targetDoseMgKg: 50, doseUnit: 'mg/kg/dia',
      drugConcentrationMg: 250, drugConcentrationMl: 5, dosesPerDay: 3 })).toEqual({
      'Peso (kg)': 10, 'Dosis objetivo': '50 mg/kg/dia', 'Concentración': '250 mg / 5 mL', 'Frecuencia': '3 veces al día',
    });
  });
});
