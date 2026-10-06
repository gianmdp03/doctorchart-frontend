import { CALCULATOR_CATALOG_FIXTURE } from '../../core/testing/calculator-catalog.fixture';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MedicalCalculatorsComponent } from './medical-calculators.component';
import { MedicalCalculatorsService } from '../../core/services/medical-calculators.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { PatientDetailDTO } from '../../core/models/patient.model';
import { CalculationResultResponseDTO } from '../../core/models/medical-calculators.model';

const RESULT: CalculationResultResponseDTO = {
  calculatorId: 'holliday_segar', calculationName: 'Requerimiento Hídrico Basal Pediátrico (Holliday-Segar)',
  rawValue: 1250, formattedValue: '1250', unit: 'mL/día',
  interpretation: { code: 'fluid_maintenance', min: 0, max: 99999, label: 'Mantenimiento Hidroelectrolítico Estándar',
    severity: 'normal', clinicalAction: 'Conducta del servidor' },
  clinicalAction: 'Conducta del servidor', clinicalNotes: [], secondaryOutputs: [],
  calculatedAt: '2026-10-05T15:00:00Z', plainTextEvolution: 'Evolución del servidor',
};

describe('MedicalCalculatorsComponent server calculations', () => {
  let fixture: ComponentFixture<MedicalCalculatorsComponent>;
  let component: MedicalCalculatorsComponent;
  let http: HttpTestingController;
  const patient = signal<PatientDetailDTO | null>(null);

  beforeEach(() => {
    vi.useFakeTimers();
    patient.set(null);
    TestBed.configureTestingModule({ imports: [MedicalCalculatorsComponent], providers: [
      provideHttpClient(), provideHttpClientTesting(),
      { provide: ActivePatientService, useValue: { activePatient: patient } },
    ] });
    fixture = TestBed.createComponent(MedicalCalculatorsComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    TestBed.inject(MedicalCalculatorsService).clearHistory();
    fixture.detectChanges();
    http.expectOne(req => req.url.endsWith('/calculators/catalog')).flush(CALCULATOR_CATALOG_FIXTURE);
    http.expectOne(req => req.url.endsWith('/calculators/preferences')).flush({ favoriteCalculationCodes: ['holliday_segar'] });
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
    http.verify({ ignoreCancelled: true });
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  function requestPreview(weight: number) {
    component.hollidayWeight.set(weight);
    fixture.detectChanges();
    vi.advanceTimersByTime(151);
    return http.expectOne(req => req.url.endsWith('/calculators/preview'));
  }

  function attachPatient() {
    patient.set({ id: 10, fullName: 'Paciente', birthDate: '2022-05-10' } as PatientDetailDTO);
    fixture.detectChanges();
    http.expectOne(req => req.url.endsWith('/calculators/patients/10/history')).flush([]);
  }

  it('waits for the server and renders the pediatric result with the existing styles', () => {
    const request = requestPreview(15);
    expect(component.currentResult()).toBeNull();
    expect(request.request.body).toEqual({ calculationCode: 'holliday_segar', inputSnapshot: { weightKg: 15 } });
    request.flush(RESULT);
    fixture.detectChanges();
    expect(component.currentResult()?.rawValue).toBe(1250);
    expect(fixture.nativeElement.querySelector('.headline-number').textContent).toContain('1250');
    expect(fixture.nativeElement.querySelector('.results-inner-card').classList.contains('border-l-emerald-500')).toBe(true);
  });

  it('cancels older previews and immediately invalidates a result when inputs change', () => {
    const first = requestPreview(15);
    component.hollidayWeight.set(20);
    expect(component.currentResult()).toBeNull();
    fixture.detectChanges();
    expect(first.cancelled).toBe(true);
    vi.advanceTimersByTime(151);
    const second = http.expectOne(req => req.url.endsWith('/calculators/preview'));
    second.flush({ ...RESULT, rawValue: 1500, formattedValue: '1500' });
    expect(component.currentResult()?.rawValue).toBe(1500);
    component.hollidayWeight.set(null);
    expect(component.currentResult()).toBeNull();
    component.saveResultToRecord();
    http.expectNone(req => req.url.endsWith('/calculators/execute'));
  });

  it('shows a server error and can calculate again after correcting the inputs', () => {
    requestPreview(15).flush({ message: 'No se pudo calcular.' }, { status: 400, statusText: 'Invalid' });
    expect(component.currentResult()).toBeNull();
    expect(component.calculationError()).toBe('No se pudo calcular.');
    requestPreview(20).flush({ ...RESULT, rawValue: 1500, formattedValue: '1500' });
    expect(component.calculationError()).toBeNull();
    expect(component.currentResult()?.rawValue).toBe(1500);
  });

  it('does not report success or save locally when backend persistence fails', () => {
    attachPatient();
    requestPreview(15).flush(RESULT);
    component.saveResultToRecord();
    const request = http.expectOne(req => req.url.endsWith('/calculators/execute'));
    expect(request.request.body).toEqual({ patientId: 10, calculationCode: 'holliday_segar', inputSnapshot: { weightKg: 15 } });
    request.flush({ message: 'No se pudo guardar.' }, { status: 500, statusText: 'Error' });
    expect(component.saveFeedback()).toBe(false);
    expect(component.saveError()).toBe('No se pudo guardar.');
    expect(component.calcService.savedHistory()).toEqual([]);
  });

  it('adds the backend-generated saved result to history only after confirmation', () => {
    attachPatient();
    requestPreview(15).flush(RESULT);
    component.saveResultToRecord();
    http.expectOne(req => req.url.endsWith('/calculators/execute')).flush({
      id: 50, patientId: 10, patientFullName: 'Paciente', userId: 'doctor-a', calculationCode: 'holliday_segar',
      calculationName: RESULT.calculationName, inputSnapshot: { weightKg: 15 }, resultValue: 1250, formattedResult: '1250 mL/día',
      resultUnit: 'mL/día', resultInterpretation: RESULT.interpretation.label, severity: 'normal',
      plainTextEvolution: 'Evolución confirmada al guardar', createdAt: RESULT.calculatedAt,
    });
    expect(component.saveFeedback()).toBe(true);
    expect(component.patientBackendHistory()[0].id).toBe(50);
    expect(component.calcService.savedHistory()[0].plainTextEvolution).toBe('Evolución confirmada al guardar');
    expect(component.calcService.savedHistory()[0].inputsSummary).toEqual({ 'Peso Pediátrico (kg)': 15 });
  });

  it('uses the server catalog and preserves the pediatric favorites and their display order', () => {
    component.loadCalculatorSetup();
    http.expectOne(req => req.url.endsWith('/calculators/catalog')).flush(CALCULATOR_CATALOG_FIXTURE);
    http.expectOne(req => req.url.endsWith('/calculators/preferences')).flush({ favoriteCalculationCodes: ['imc', 'pediatric_dosage', 'holliday_segar', 'bsa_mosteller'] });
    fixture.detectChanges();
    expect(component.favoriteCalculatorsList().map(item => item.id)).toEqual(['imc', 'holliday_segar', 'bsa_mosteller', 'pediatric_dosage']);
    expect(component.modalFilteredCalculators().length).toBe(8);
    expect(component.currentMetadata()?.name).toBe('Requerimiento Hídrico Basal Pediátrico (Holliday-Segar)');
  });

  it('does not use local favorites when a specialty has no configured defaults', () => {
    component.loadCalculatorSetup();
    http.expectOne(req => req.url.endsWith('/calculators/catalog')).flush(CALCULATOR_CATALOG_FIXTURE);
    http.expectOne(req => req.url.endsWith('/calculators/preferences')).flush({ favoriteCalculationCodes: [] });
    expect(component.myCalculatorsCodes()).toEqual([]);
    expect(component.filteredCalculators().length).toBe(8);
    expect(component.setupLoaded()).toBe(true);
  });

  it('keeps confirmed favorites when a write fails and prevents overlapping writes', () => {
    component.toggleFavoriteCalculator('imc');
    component.toggleFavoriteCalculator('tfge');
    const request = http.expectOne(req => req.url.endsWith('/calculators/preferences'));
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual({ favoriteCalculationCodes: ['holliday_segar', 'imc'] });
    expect(component.myCalculatorsCodes()).toEqual(['holliday_segar']);
    request.flush({}, { status: 500, statusText: 'Error' });
    expect(component.myCalculatorsCodes()).toEqual(['holliday_segar']);
    expect(component.preferencesError()).toContain('guardar');
    expect(component.isUpdatingPreferences()).toBe(false);
    component.toggleFavoriteCalculator('imc');
    http.expectOne(req => req.url.endsWith('/calculators/preferences')).flush({ favoriteCalculationCodes: ['holliday_segar', 'imc'] });
    expect(component.myCalculatorsCodes()).toEqual(['holliday_segar', 'imc']);
  });

  it('restores preferences atomically through the server without providing a specialty', () => {
    component.restoreSpecialtyDefaults();
    const request = http.expectOne(req => req.url.endsWith('/calculators/preferences/reset'));
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({});
    request.flush({ favoriteCalculationCodes: ['imc', 'pediatric_dosage', 'holliday_segar', 'bsa_mosteller'] });
    expect(component.myCalculatorsCodes()).toEqual(['imc', 'pediatric_dosage', 'holliday_segar', 'bsa_mosteller']);
    expect(component.isUpdatingPreferences()).toBe(false);
    http.expectNone(req => req.url.includes('/defaults/'));
  });

  it('keeps the active calculator when it is removed from the favorites', () => {
    component.toggleFavoriteCalculator('imc');
    http.expectOne(req => req.url.endsWith('/calculators/preferences')).flush({ favoriteCalculationCodes: ['holliday_segar', 'imc'] });
    component.toggleFavoriteCalculator('holliday_segar');
    http.expectOne(req => req.url.endsWith('/calculators/preferences')).flush({ favoriteCalculationCodes: ['imc'] });
    expect(component.selectedId()).toBe('holliday_segar');
    expect(component.myCalculatorsCodes()).toEqual(['imc']);
  });

  it('shows a failed reset inside the open modal and retains the confirmed selection', () => {
    component.isCatalogModalOpen.set(true);
    component.restoreSpecialtyDefaults();
    http.expectOne(req => req.url.endsWith('/calculators/preferences/reset')).flush({}, { status: 500, statusText: 'Error' });
    fixture.detectChanges();
    expect(component.myCalculatorsCodes()).toEqual(['holliday_segar']);
    expect(fixture.nativeElement.querySelector('.modal-footer').previousElementSibling.textContent).toContain('restablecer');
  });

  it('shows a retry action instead of silently using a hardcoded catalog after a loading error', () => {
    component.loadCalculatorSetup();
    http.expectOne(req => req.url.endsWith('/calculators/preferences')).flush({ favoriteCalculationCodes: ['imc'] });
    http.expectOne(req => req.url.endsWith('/calculators/catalog')).flush({}, { status: 500, statusText: 'Error' });
    fixture.detectChanges();
    expect(component.calcService.calculators()).toEqual([]);
    expect(component.setupLoaded()).toBe(false);
    expect(fixture.nativeElement.textContent).toContain('Reintentar');
    component.toggleFavoriteCalculator('imc');
    http.expectNone(req => req.method === 'PUT');
  });

});
