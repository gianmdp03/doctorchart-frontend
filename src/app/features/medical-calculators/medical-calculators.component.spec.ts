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

  beforeEach(async () => {
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
    await fixture.whenStable();
  });
  afterEach(() => {
    fixture.destroy();
    http.verify({ ignoreCancelled: true });
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  function requestPreview(weight: number) {
    setNumberInputs([weight]);
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
    setNumberInputs([20]);
    expect(component.currentResult()).toBeNull();
    fixture.detectChanges();
    expect(first.cancelled).toBe(true);
    vi.advanceTimersByTime(151);
    const second = http.expectOne(req => req.url.endsWith('/calculators/preview'));
    second.flush({ ...RESULT, rawValue: 1500, formattedValue: '1500' });
    expect(component.currentResult()?.rawValue).toBe(1500);
    setNumberInputs([null]);
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


  function numberInputs() {
    return Array.from(fixture.nativeElement.querySelectorAll('.inputs-card input[type="number"]')) as HTMLInputElement[];
  }

  function setNumberInputs(values: (number | null)[]) {
    numberInputs().forEach((input, index) => {
      input.value = values[index] === null ? '' : String(values[index]);
      input.dispatchEvent(new Event('input'));
    });
    fixture.detectChanges();
  }

  function formAppearance() {
    const card: HTMLElement = fixture.nativeElement.querySelector('.inputs-card');
    return {
      text: card.textContent?.replace(/\s+/g, ' ').trim(),
      controls: Array.from(card.querySelectorAll('input, button, select')).map(control => ({
        tag: control.tagName, id: control.id,
        attributes: Object.fromEntries(['type', 'min', 'max', 'step', 'placeholder'].map(name => [name, control.getAttribute(name)])),
        classes: control.className.split(' ').filter(name => name && !name.startsWith('ng-')).sort(),
        value: (control as HTMLInputElement).value,
        checked: control instanceof HTMLInputElement && control.type === 'checkbox' ? control.checked : undefined,
      })),
    };
  }

  it('preserves the imc form, request inputs and clearing behavior', async () => {
    component.selectCalculator('imc'); fixture.detectChanges();
    await fixture.whenStable();
    expect(formAppearance()).toMatchSnapshot('imc initial form');
    setNumberInputs([70,175]);
    vi.advanceTimersByTime(151);
    const request = http.expectOne(req => req.url.endsWith('/calculators/preview'));
    expect(request.request.body).toEqual({ calculationCode: 'imc', inputSnapshot: {"weightKg":70,"heightCm":175} });
    request.flush({ ...RESULT, calculatorId: 'imc' });
    component.resetCurrentInputs(); fixture.detectChanges();
    expect(component.currentResult()).toBeNull();
    await fixture.whenStable();
    expect(numberInputs().every(input => input.value === '')).toBe(true);
    vi.advanceTimersByTime(151);
    http.expectNone(req => req.url.endsWith('/calculators/preview'));
  });

  it('preserves the tfge form, request inputs and clearing behavior', async () => {
    component.selectCalculator('tfge'); fixture.detectChanges();
    await fixture.whenStable();
    expect(formAppearance()).toMatchSnapshot('tfge initial form');
    setNumberInputs([1,55]);
    vi.advanceTimersByTime(151);
    const request = http.expectOne(req => req.url.endsWith('/calculators/preview'));
    expect(request.request.body).toEqual({ calculationCode: 'tfge', inputSnapshot: {"creatinineMgDl":1,"ageYears":55,"gender":"MALE"} });
    request.flush({ ...RESULT, calculatorId: 'tfge' });
    component.resetCurrentInputs(); fixture.detectChanges();
    expect(component.currentResult()).toBeNull();
    await fixture.whenStable();
    expect(numberInputs().every(input => input.value === '')).toBe(true);
    vi.advanceTimersByTime(151);
    http.expectNone(req => req.url.endsWith('/calculators/preview'));
  });

  it('preserves the cockcroft form, request inputs and clearing behavior', async () => {
    component.selectCalculator('cockcroft'); fixture.detectChanges();
    await fixture.whenStable();
    expect(formAppearance()).toMatchSnapshot('cockcroft initial form');
    setNumberInputs([70,55,1]);
    vi.advanceTimersByTime(151);
    const request = http.expectOne(req => req.url.endsWith('/calculators/preview'));
    expect(request.request.body).toEqual({ calculationCode: 'cockcroft', inputSnapshot: {"weightKg":70,"ageYears":55,"creatinineMgDl":1,"gender":"MALE"} });
    request.flush({ ...RESULT, calculatorId: 'cockcroft' });
    component.resetCurrentInputs(); fixture.detectChanges();
    expect(component.currentResult()).toBeNull();
    await fixture.whenStable();
    expect(numberInputs().every(input => input.value === '')).toBe(true);
    vi.advanceTimersByTime(151);
    http.expectNone(req => req.url.endsWith('/calculators/preview'));
  });

  it('preserves the chads_vasc form, request inputs and clearing behavior', async () => {
    component.selectCalculator('chads_vasc'); fixture.detectChanges();
    await fixture.whenStable();
    expect(formAppearance()).toMatchSnapshot('chads_vasc initial form');
    setNumberInputs([0]);
    vi.advanceTimersByTime(151);
    const request = http.expectOne(req => req.url.endsWith('/calculators/preview'));
    expect(request.request.body).toEqual({ calculationCode: 'chads_vasc', inputSnapshot: {"ageYears":0,"isFemale":false,"congestiveHeartFailure":false,"hypertension":false,"diabetes":false,"strokeOrTia":false,"vascularDisease":false} });
    request.flush({ ...RESULT, calculatorId: 'chads_vasc' });
    component.resetCurrentInputs(); fixture.detectChanges();
    expect(component.currentResult()).toBeNull();
    await fixture.whenStable();
    expect(numberInputs().every(input => input.value === '')).toBe(true);
    vi.advanceTimersByTime(151);
    http.expectNone(req => req.url.endsWith('/calculators/preview'));
  });

  it('preserves the calcio_corregido form, request inputs and clearing behavior', async () => {
    component.selectCalculator('calcio_corregido'); fixture.detectChanges();
    await fixture.whenStable();
    expect(formAppearance()).toMatchSnapshot('calcio_corregido initial form');
    setNumberInputs([8.2,3]);
    vi.advanceTimersByTime(151);
    const request = http.expectOne(req => req.url.endsWith('/calculators/preview'));
    expect(request.request.body).toEqual({ calculationCode: 'calcio_corregido', inputSnapshot: {"serumCalciumMgDl":8.2,"serumAlbuminGDl":3} });
    request.flush({ ...RESULT, calculatorId: 'calcio_corregido' });
    component.resetCurrentInputs(); fixture.detectChanges();
    expect(component.currentResult()).toBeNull();
    await fixture.whenStable();
    expect(numberInputs().every(input => input.value === '')).toBe(true);
    vi.advanceTimersByTime(151);
    http.expectNone(req => req.url.endsWith('/calculators/preview'));
  });

  it('preserves the holliday_segar form, request inputs and clearing behavior', async () => {
    component.selectCalculator('holliday_segar'); fixture.detectChanges();
    await fixture.whenStable();
    expect(formAppearance()).toMatchSnapshot('holliday_segar initial form');
    setNumberInputs([15]);
    vi.advanceTimersByTime(151);
    const request = http.expectOne(req => req.url.endsWith('/calculators/preview'));
    expect(request.request.body).toEqual({ calculationCode: 'holliday_segar', inputSnapshot: {"weightKg":15} });
    request.flush({ ...RESULT, calculatorId: 'holliday_segar' });
    component.resetCurrentInputs(); fixture.detectChanges();
    expect(component.currentResult()).toBeNull();
    await fixture.whenStable();
    expect(numberInputs().every(input => input.value === '')).toBe(true);
    vi.advanceTimersByTime(151);
    http.expectNone(req => req.url.endsWith('/calculators/preview'));
  });

  it('preserves the bsa_mosteller form, request inputs and clearing behavior', async () => {
    component.selectCalculator('bsa_mosteller'); fixture.detectChanges();
    await fixture.whenStable();
    expect(formAppearance()).toMatchSnapshot('bsa_mosteller initial form');
    setNumberInputs([18,110]);
    vi.advanceTimersByTime(151);
    const request = http.expectOne(req => req.url.endsWith('/calculators/preview'));
    expect(request.request.body).toEqual({ calculationCode: 'bsa_mosteller', inputSnapshot: {"weightKg":18,"heightCm":110} });
    request.flush({ ...RESULT, calculatorId: 'bsa_mosteller' });
    component.resetCurrentInputs(); fixture.detectChanges();
    expect(component.currentResult()).toBeNull();
    await fixture.whenStable();
    expect(numberInputs().every(input => input.value === '')).toBe(true);
    vi.advanceTimersByTime(151);
    http.expectNone(req => req.url.endsWith('/calculators/preview'));
  });

  it('preserves the pediatric_dosage form, request inputs and clearing behavior', async () => {
    component.selectCalculator('pediatric_dosage'); fixture.detectChanges();
    await fixture.whenStable();
    expect(formAppearance()).toMatchSnapshot('pediatric_dosage initial form');
    setNumberInputs([12,50,250,5]);
    vi.advanceTimersByTime(151);
    const request = http.expectOne(req => req.url.endsWith('/calculators/preview'));
    expect(request.request.body).toEqual({ calculationCode: 'pediatric_dosage', inputSnapshot: {"weightKg":12,"targetDoseMgKg":50,"doseUnit":"mg/kg/dia","drugConcentrationMg":250,"drugConcentrationMl":5,"dosesPerDay":3} });
    request.flush({ ...RESULT, calculatorId: 'pediatric_dosage' });
    component.resetCurrentInputs(); fixture.detectChanges();
    expect(component.currentResult()).toBeNull();
    await fixture.whenStable();
    expect(numberInputs().every(input => input.value === '')).toBe(true);
    vi.advanceTimersByTime(151);
    http.expectNone(req => req.url.endsWith('/calculators/preview'));
  });

  it('preserves the imc autofill fields and feedback', () => {
    attachPatient(); component.selectCalculator('imc'); fixture.detectChanges();
    component.autofillFromPatient();
    http.expectOne(req => req.url.endsWith('/calculators/patients/10/autofill')).flush({
      patientId: 10, fullName: 'Paciente', birthDate: '2018-05-10', ageYears: 8, gender: 'FEMALE',
      weightKg: 15, heightCm: 100, systolicBloodPressure: null, diastolicBloodPressure: null,
      creatinineMgDl: 0.65, serumCalciumMgDl: 9.4, serumAlbuminGDl: 4.2, encounterId: 100, encounterDate: null,
    });
    expect(component.currentInputs()).toEqual({"weightKg":15,"heightCm":100});
    expect(component.autofillBannerMessage()).toMatchSnapshot('imc autofill feedback');
    expect(component.autofillAlertSeverity()).toBe('success');
  });

  it('preserves the tfge autofill fields and feedback', () => {
    attachPatient(); component.selectCalculator('tfge'); fixture.detectChanges();
    component.autofillFromPatient();
    http.expectOne(req => req.url.endsWith('/calculators/patients/10/autofill')).flush({
      patientId: 10, fullName: 'Paciente', birthDate: '2018-05-10', ageYears: 8, gender: 'FEMALE',
      weightKg: 15, heightCm: 100, systolicBloodPressure: null, diastolicBloodPressure: null,
      creatinineMgDl: 0.65, serumCalciumMgDl: 9.4, serumAlbuminGDl: 4.2, encounterId: 100, encounterDate: null,
    });
    expect(component.currentInputs()).toEqual({"creatinineMgDl":0.65,"ageYears":8,"gender":"FEMALE"});
    expect(component.autofillBannerMessage()).toMatchSnapshot('tfge autofill feedback');
    expect(component.autofillAlertSeverity()).toBe('success');
  });

  it('preserves the cockcroft autofill fields and feedback', () => {
    attachPatient(); component.selectCalculator('cockcroft'); fixture.detectChanges();
    component.autofillFromPatient();
    http.expectOne(req => req.url.endsWith('/calculators/patients/10/autofill')).flush({
      patientId: 10, fullName: 'Paciente', birthDate: '2018-05-10', ageYears: 8, gender: 'FEMALE',
      weightKg: 15, heightCm: 100, systolicBloodPressure: null, diastolicBloodPressure: null,
      creatinineMgDl: 0.65, serumCalciumMgDl: 9.4, serumAlbuminGDl: 4.2, encounterId: 100, encounterDate: null,
    });
    expect(component.currentInputs()).toEqual({"weightKg":15,"ageYears":8,"creatinineMgDl":0.65,"gender":"FEMALE"});
    expect(component.autofillBannerMessage()).toMatchSnapshot('cockcroft autofill feedback');
    expect(component.autofillAlertSeverity()).toBe('success');
  });

  it('preserves the chads_vasc autofill fields and feedback', () => {
    attachPatient(); component.selectCalculator('chads_vasc'); fixture.detectChanges();
    component.autofillFromPatient();
    http.expectOne(req => req.url.endsWith('/calculators/patients/10/autofill')).flush({
      patientId: 10, fullName: 'Paciente', birthDate: '2018-05-10', ageYears: 8, gender: 'FEMALE',
      weightKg: 15, heightCm: 100, systolicBloodPressure: null, diastolicBloodPressure: null,
      creatinineMgDl: 0.65, serumCalciumMgDl: 9.4, serumAlbuminGDl: 4.2, encounterId: 100, encounterDate: null,
    });
    expect(component.currentInputs()).toEqual({"ageYears":8,"isFemale":true,"congestiveHeartFailure":false,"hypertension":false,"diabetes":false,"strokeOrTia":false,"vascularDisease":false});
    expect(component.autofillBannerMessage()).toMatchSnapshot('chads_vasc autofill feedback');
    expect(component.autofillAlertSeverity()).toBe('success');
  });

  it('preserves the calcio_corregido autofill fields and feedback', () => {
    attachPatient(); component.selectCalculator('calcio_corregido'); fixture.detectChanges();
    component.autofillFromPatient();
    http.expectOne(req => req.url.endsWith('/calculators/patients/10/autofill')).flush({
      patientId: 10, fullName: 'Paciente', birthDate: '2018-05-10', ageYears: 8, gender: 'FEMALE',
      weightKg: 15, heightCm: 100, systolicBloodPressure: null, diastolicBloodPressure: null,
      creatinineMgDl: 0.65, serumCalciumMgDl: 9.4, serumAlbuminGDl: 4.2, encounterId: 100, encounterDate: null,
    });
    expect(component.currentInputs()).toEqual({"serumCalciumMgDl":9.4,"serumAlbuminGDl":4.2});
    expect(component.autofillBannerMessage()).toMatchSnapshot('calcio_corregido autofill feedback');
    expect(component.autofillAlertSeverity()).toBe('success');
  });

  it('preserves the holliday_segar autofill fields and feedback', () => {
    attachPatient(); component.selectCalculator('holliday_segar'); fixture.detectChanges();
    component.autofillFromPatient();
    http.expectOne(req => req.url.endsWith('/calculators/patients/10/autofill')).flush({
      patientId: 10, fullName: 'Paciente', birthDate: '2018-05-10', ageYears: 8, gender: 'FEMALE',
      weightKg: 15, heightCm: 100, systolicBloodPressure: null, diastolicBloodPressure: null,
      creatinineMgDl: 0.65, serumCalciumMgDl: 9.4, serumAlbuminGDl: 4.2, encounterId: 100, encounterDate: null,
    });
    expect(component.currentInputs()).toEqual({"weightKg":15});
    expect(component.autofillBannerMessage()).toMatchSnapshot('holliday_segar autofill feedback');
    expect(component.autofillAlertSeverity()).toBe('success');
  });

  it('preserves the bsa_mosteller autofill fields and feedback', () => {
    attachPatient(); component.selectCalculator('bsa_mosteller'); fixture.detectChanges();
    component.autofillFromPatient();
    http.expectOne(req => req.url.endsWith('/calculators/patients/10/autofill')).flush({
      patientId: 10, fullName: 'Paciente', birthDate: '2018-05-10', ageYears: 8, gender: 'FEMALE',
      weightKg: 15, heightCm: 100, systolicBloodPressure: null, diastolicBloodPressure: null,
      creatinineMgDl: 0.65, serumCalciumMgDl: 9.4, serumAlbuminGDl: 4.2, encounterId: 100, encounterDate: null,
    });
    expect(component.currentInputs()).toEqual({"weightKg":15,"heightCm":100});
    expect(component.autofillBannerMessage()).toMatchSnapshot('bsa_mosteller autofill feedback');
    expect(component.autofillAlertSeverity()).toBe('success');
  });

  it('preserves the pediatric_dosage autofill fields and feedback', () => {
    attachPatient(); component.selectCalculator('pediatric_dosage'); fixture.detectChanges();
    component.autofillFromPatient();
    http.expectOne(req => req.url.endsWith('/calculators/patients/10/autofill')).flush({
      patientId: 10, fullName: 'Paciente', birthDate: '2018-05-10', ageYears: 8, gender: 'FEMALE',
      weightKg: 15, heightCm: 100, systolicBloodPressure: null, diastolicBloodPressure: null,
      creatinineMgDl: 0.65, serumCalciumMgDl: 9.4, serumAlbuminGDl: 4.2, encounterId: 100, encounterDate: null,
    });
    expect(component.currentInputs()).toEqual({"weightKg":15,"targetDoseMgKg":null,"doseUnit":"mg/kg/dia","drugConcentrationMg":null,"drugConcentrationMl":null,"dosesPerDay":3});
    expect(component.autofillBannerMessage()).toMatchSnapshot('pediatric_dosage autofill feedback');
    expect(component.autofillAlertSeverity()).toBe('info');
  });

  it('preserves pediatric dose unit and frequency when clearing numeric inputs', () => {
    component.selectCalculator('pediatric_dosage'); fixture.detectChanges();
    const unitButton = Array.from(fixture.nativeElement.querySelectorAll('.inputs-card button')).find(button => (button as HTMLElement).textContent?.trim() === 'mg/kg/dosis') as HTMLButtonElement;
    unitButton.click();
    const select: HTMLSelectElement = fixture.nativeElement.querySelector('#pedDosesPerDaySelect');
    select.value = select.options[1].value; select.dispatchEvent(new Event('change'));
    setNumberInputs([12,50,250,5]);
    component.resetCurrentInputs(); fixture.detectChanges();
    expect(component.currentInputs()).toEqual({ weightKg: null, targetDoseMgKg: null, doseUnit: 'mg/kg/dosis', drugConcentrationMg: null, drugConcentrationMl: null, dosesPerDay: 2 });
  });

  it('keeps each calculators inputs when switching and clearing another calculator', async () => {
    setNumberInputs([15]);
    component.selectCalculator('bsa_mosteller'); fixture.detectChanges(); setNumberInputs([18,110]);
    component.resetCurrentInputs(); fixture.detectChanges();
    component.selectCalculator('holliday_segar'); fixture.detectChanges();
    await fixture.whenStable();
    expect(numberInputs()[0].value).toBe('15');
  });


  it('keeps a late autofill response from changing another calculator', () => {
    attachPatient(); component.autofillFromPatient();
    const request = http.expectOne(req => req.url.endsWith('/calculators/patients/10/autofill'));
    component.selectCalculator('bsa_mosteller'); fixture.detectChanges();
    request.flush({ patientId: 10, fullName: 'Paciente', weightKg: 15, heightCm: 100, ageYears: 8, gender: 'FEMALE' });
    expect(component.currentInputs()).toEqual({ weightKg: null, heightCm: null });
    expect(component.autofillBannerMessage()).toBeNull();
    expect(component.isAutofilling()).toBe(false);
    component.selectCalculator('holliday_segar');
    expect(component.currentInputs()).toEqual({ weightKg: null });
  });

  it('renders an unavailable form without calculating through another module', () => {
    component.selectedId.set('unregistered' as typeof RESULT.calculatorId);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.inputs-card').textContent).toContain('todavía no está disponible');
    expect(component.currentInputs()).toEqual({});
    expect(component.isCurrentInputComplete()).toBe(false);
    component.resetCurrentInputs(); vi.advanceTimersByTime(151);
    http.expectNone(req => req.url.endsWith('/calculators/preview'));
  });

  it('keeps the CHA2DS2-VASc flags independent and clears them with the active form', () => {
    component.selectCalculator('chads_vasc'); fixture.detectChanges();
    setNumberInputs([68]);
    const flags = Array.from(fixture.nativeElement.querySelectorAll('.inputs-card input[type="checkbox"]')) as HTMLInputElement[];
    for (const flag of flags) flag.click();
    fixture.detectChanges(); vi.advanceTimersByTime(151);
    const request = http.expectOne(req => req.url.endsWith('/calculators/preview'));
    expect(request.request.body.inputSnapshot).toEqual({ ageYears: 68, isFemale: true, congestiveHeartFailure: true, hypertension: true, diabetes: true, strokeOrTia: true, vascularDisease: true });
    request.flush({ ...RESULT, calculatorId: 'chads_vasc' });
    component.resetCurrentInputs(); fixture.detectChanges();
    expect(component.currentInputs()).toEqual({ ageYears: null, isFemale: false, congestiveHeartFailure: false, hypertension: false, diabetes: false, strokeOrTia: false, vascularDisease: false });
  });

  it('preserves the cached pediatric autofill after a server error', () => {
    patient.set({ id: 10, fullName: 'Paciente', birthDate: '2022-05-10', latestMeasurements: { weight: 15, height: 100 } } as PatientDetailDTO);
    fixture.detectChanges(); http.expectOne(req => req.url.endsWith('/calculators/patients/10/history')).flush([]);
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    component.autofillFromPatient();
    http.expectOne(req => req.url.endsWith('/calculators/patients/10/autofill')).flush({}, { status: 500, statusText: 'Error' });
    warning.mockRestore();
    expect(component.currentInputs()).toEqual({ weightKg: 15 });
    expect(component.autofillAlertSeverity()).toBe('success');
    expect(component.isAutofilling()).toBe(false);
  });

  it('keeps the renal gender selection local and clears it with its form', () => {
    component.selectCalculator('tfge'); fixture.detectChanges(); setNumberInputs([1,55]);
    const female = Array.from(fixture.nativeElement.querySelectorAll('.inputs-card button')).find(button => (button as HTMLElement).textContent?.trim() === 'Femenino') as HTMLButtonElement;
    female.click(); fixture.detectChanges(); vi.advanceTimersByTime(151);
    const request = http.expectOne(req => req.url.endsWith('/calculators/preview'));
    expect(request.request.body.inputSnapshot.gender).toBe('FEMALE'); request.flush({ ...RESULT, calculatorId: 'tfge' });
    component.selectCalculator('cockcroft'); expect(component.currentInputs()['gender']).toBe('MALE');
    component.selectCalculator('tfge'); expect(component.currentInputs()['gender']).toBe('FEMALE');
    component.resetCurrentInputs(); expect(component.currentInputs()['gender']).toBe('MALE');
  });

});
