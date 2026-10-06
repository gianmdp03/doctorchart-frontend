import { signal } from '@angular/core';
import { AuthService } from './auth.service';
import { CALCULATOR_CATALOG_FIXTURE } from '../testing/calculator-catalog.fixture';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MedicalCalculatorsService } from './medical-calculators.service';
import { CalculationResultResponseDTO } from '../models/medical-calculators.model';

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
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [{provide:AuthService,useValue:{currentUser:signal({id:'doctor-a'})}},MedicalCalculatorsService, provideHttpClient(), provideHttpClientTesting()] });
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


  it('maps authoritative server metadata while retaining only the existing icons locally', () => {
    expect(service.calculators()).toEqual([]);
    const catalog = CALCULATOR_CATALOG_FIXTURE.map(item => item.code === 'imc' ? { ...item, name: 'Nombre del servidor' } : item);
    service.getCatalogFromBackend().subscribe(items => {
      expect(items.map(item => item.id)).toEqual(catalog.map(item => item.code));
      expect(items[0].name).toBe('Nombre del servidor');
      expect(items.map(item => item.icon)).toEqual(['lucideWeight', 'lucideActivity', 'lucideStethoscope', 'lucideHeart', 'lucideFlaskConical', 'lucideDroplets', 'lucideSparkles', 'lucidePill']);
    });
    http.expectOne(req => req.url.endsWith('/calculators/catalog')).flush(catalog);
  });

  it('persists local calculations per account without adopting the old shared history', () => {
    const item={calculatorId:'holliday_segar' as const,calculatorName:'Holliday',patientId:10,resultHeadline:'1250',interpretationLabel:'Normal',severity:'normal' as const,calculatedAt:FLUID_RESULT.calculatedAt,plainTextEvolution:'Texto',inputsSummary:{}};
    localStorage.setItem('doctorchart_saved_calculations',JSON.stringify([{...item,id:'legacy'}]));
    service.saveCalculation(item); expect(service.savedHistory()).toHaveLength(1);
    expect(localStorage.getItem('doctorchart_calculations:doctor-a')).toContain('Texto');
    TestBed.inject(AuthService).currentUser.set({id:'doctor-b'} as any); TestBed.tick();
    expect(service.savedHistory()).toEqual([]); service.saveCalculation({...item,patientId:20});
    TestBed.inject(AuthService).currentUser.set({id:'doctor-a'} as any); TestBed.tick();
    expect(service.savedHistory().map(item=>item.patientId)).toEqual([10]);
    TestBed.inject(AuthService).currentUser.set(null); TestBed.tick(); expect(service.savedHistory()).toEqual([]);
  });

});
