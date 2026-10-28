import {
  PatientRecordModuleId,
  PATIENT_RECORD_MODULE_IDS,
} from '../../core/models/specialty-experience.model';
import {
  PatientRecordActionId,
  PATIENT_RECORD_ACTION_IDS,
} from '../../core/models/specialty-experience.model';
import { PatientPrescriptionEditorStore } from './patient-prescriptions/patient-prescription-editor.store';
import { PatientGrowthStore } from './patient-growth/patient-growth.store';
import { PatientBannerComponent } from './patient-banner/patient-banner.component';
import { ClinicalTimelineComponent } from './clinical-timeline/clinical-timeline.component';
import { PatientEncountersStore } from './patient-encounters/patient-encounters.store';
import { By } from '@angular/platform-browser';
import { DynamicFormRendererComponent } from '../dynamic-form-renderer/dynamic-form-renderer.component';
import { PatientVaccinationsComponent } from './patient-vaccinations/patient-vaccinations.component';
import { PatientStudiesComponent } from './patient-studies/patient-studies.component';
import { PatientSummaryComponent } from './patient-summary/patient-summary.component';
import { PatientPrescriptionsComponent } from './patient-prescriptions/patient-prescriptions.component';
import { PatientStudiesStore } from './patient-studies/patient-studies.store';
import { PatientGrowthService } from '../../core/services/patient-growth.service';
import { PatientGrowthResponse } from '../../core/models/growth-chart.model';
import { patientGrowthFixture } from '../../core/testing/growth.fixture';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { clinicalFormFixture } from '../../core/models/clinical-form.fixture';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientRecordComponent } from './patient-record.component';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { PatientService } from '../../core/services/patient.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PLATFORM_ID, signal } from '@angular/core';
import { of, Subject, BehaviorSubject, throwError } from 'rxjs';
import { PatientPrescriptionService } from '../../core/services/patient-prescription.service';
import { SavedPrescriptionRecord } from '../../core/models/prescription.model';
import { PatientDetailDTO } from '../../core/models/patient.model';
import { ClinicalEncounterList } from '../../core/models/clinical-encounter.model';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';

describe('PatientRecordComponent', () => {
  let component: PatientRecordComponent;
  let rx: PatientPrescriptionEditorStore;
  let growth: PatientGrowthStore;
  let history: PatientEncountersStore;
  let fixture: ComponentFixture<PatientRecordComponent>;
  let activePatientService: ActivePatientService;
  let patientServiceSpy: any;
  let encounterServiceSpy: any;
  let routerSpy: any;
  let authServiceMock: any;
  let prescriptionApi: any;
  let growthReadSpy: any;
  let queryParams: BehaviorSubject<Map<string, string>>;
  const configuredActions = signal<PatientRecordActionId[]>([...PATIENT_RECORD_ACTION_IDS]);
  const configuredTabs = signal<PatientRecordModuleId[]>([...PATIENT_RECORD_MODULE_IDS]);
  const growthEnabledFlag = signal(true);
  const measurementHistory = patientGrowthFixture();
  const issued = (patientId: number, request: any): SavedPrescriptionRecord => ({
    ...request,
    id: 73,
    patientId,
    authorUserId: 'doctor',
    createdAt: '2026-10-05T12:34:56Z',
  });

  const mockPatient: PatientDetailDTO = {
    ...clinicalFormFixture(),
    id: 10492,
    fullName: 'Mateo Rossi',
    birthDate: '2024-05-10',
    gender: 'MALE',
    bloodType: 'O+',
    phone: '11-4567-8901',
    address: 'Av. Corrientes 1234, CABA',
    nationalId: '36.812.904',
    guardianInfo: {
      motherFullName: 'Carla Lucía Benítez',
      fatherFullName: 'Esteban Gabriel Rossi',
      primaryGuardian: 'Madre',
      primaryContactPhone: '11-4567-8901',
    },
    personalHistory: {
      birthMeasurements: {
        weightKg: 3.35,
        heightCm: 50.0,
        headCircumferenceCm: 35.0,
      },
      chronicOrPreviousDiseases: ['Bronquiolitis leve a los 3 meses'],
      allergies: ['Amoxicilina'],
      habitualMedication: ['Vitamina D3 400 UI/día'],
    },
    familyHistory: {
      paternalDiseases: ['Hipertensión arterial (abuelo paterno)'],
      maternalDiseases: ['Rinitis alérgica (madre)'],
      siblingDiseases: ['Sin antecedentes genéticos'],
    },
    latestMeasurements: {
      weightKg: 7.95,
      heightCm: 67.5,
      headCircumferenceCm: 43.8,
    },
  };

  const mockEncountersList: ClinicalEncounterList[] = [
    {
      id: 1,
      patientId: 10492,
      encounterDate: '2026-09-15',
      ...clinicalFormFixture(),
      specialtyId: 1,
      specialty: { id: 1, code: 'pediatrics', name: 'Pediatría', description: null },
      consultationType: 'ROUTINE_CHECKUP',
      chiefComplaint: 'Control pediátrico semestral',
      primaryDiagnosisCode: 'Z00.1',
      primaryDiagnosisDescription: 'Control de salud infantil',
    },
    {
      id: 2,
      patientId: 10492,
      encounterDate: '2026-09-16',
      ...clinicalFormFixture(),
      specialtyId: 7,
      specialty: { id: 7, code: 'custom_xyz', name: 'Especialidad XYZ', description: null },
      consultationType: 'FIRST_VISIT',
      chiefComplaint: 'Soplo funcional inocente',
      primaryDiagnosisCode: 'R01.0',
      primaryDiagnosisDescription: 'Soplos cardíacos benignos',
    },
  ];

  beforeEach(async () => {
    queryParams = new BehaviorSubject(new Map());
    growthEnabledFlag.set(true);
    configuredTabs.set([...PATIENT_RECORD_MODULE_IDS]);
    configuredActions.set([...PATIENT_RECORD_ACTION_IDS]);
    HTMLCanvasElement.prototype.getContext = (() => ({
      fillRect: () => {},
      clearRect: () => {},
      getImageData: (x: number, y: number, w: number, h: number) => ({
        data: new Array(w * h * 4),
      }),
      putImageData: () => {},
      createImageData: () => [],
      setTransform: () => {},
      drawImage: () => {},
      save: () => {},
      fillText: () => {},
      restore: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      closePath: () => {},
      stroke: () => {},
      translate: () => {},
      scale: () => {},
      rotate: () => {},
      arc: () => {},
      fill: () => {},
      measureText: () => ({ width: 0 }),
      transform: () => {},
      rect: () => {},
      clip: () => {},
    })) as any;

    patientServiceSpy = {
      getPatientById: vi.fn().mockReturnValue(of(mockPatient)),
    };
    encounterServiceSpy = {
      getByPatient: vi.fn().mockReturnValue(of(mockEncountersList)),
      delete: vi.fn().mockReturnValue(of(undefined)),
    };
    prescriptionApi = {
      list: vi.fn().mockReturnValue(of([])),
      create: vi.fn().mockImplementation((id, request) => of(issued(id, request))),
      get: vi.fn(),
      delete: vi.fn().mockReturnValue(of(undefined)),
    };
    routerSpy = {
      navigate: vi.fn(),
    };
    authServiceMock = {
      userName: signal('Dra. Sofía Mendoza'),
      isLoggedIn: signal(true),
      currentUser: signal({ id: 'doctor' }),
      isSuperAdmin: signal(false),
    };

    await TestBed.configureTestingModule({
      imports: [PatientRecordComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: WorkspaceStore,
          useValue: {
            patientRecordTabs: configuredTabs,
            patientRecordActions: configuredActions,
            hasRecordAction: (id: PatientRecordActionId) => configuredActions().includes(id),
            hasRecordTab: (id: PatientRecordModuleId) => configuredTabs().includes(id),
            isModuleActive: (code: string) => code !== 'GROWTH_CHARTS' || growthEnabledFlag(),
          },
        },
        ActivePatientService,
        { provide: PatientPrescriptionService, useValue: prescriptionApi },
        { provide: PatientService, useValue: patientServiceSpy },
        { provide: ClinicalEncounterService, useValue: encounterServiceSpy },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['id', '10492']])),
            queryParamMap: queryParams,
          },
        },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    growthReadSpy = vi
      .spyOn(TestBed.inject(PatientGrowthService), 'getPatientGrowthCurves')
      .mockImplementation((id: number) => of(patientGrowthFixture(id)));
    activePatientService = TestBed.inject(ActivePatientService);
    activePatientService.setActivePatient(mockPatient);

    fixture = TestBed.createComponent(PatientRecordComponent);
    component = fixture.componentInstance;
    rx = fixture.debugElement.injector.get(PatientPrescriptionEditorStore);
    growth = fixture.debugElement.injector.get(PatientGrowthStore);
    history = fixture.debugElement.injector.get(PatientEncountersStore);
    fixture.detectChanges();
  });

  it('hides repeated edit and new consultation buttons and guards their output handlers', () => {
    configuredActions.set([]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.btn-tab-edit')).toBeNull();
    component.editPatient();
    component.createEncounter();
    fixture.debugElement
      .query(By.directive(PatientBannerComponent))
      .componentInstance.editPatient.emit();
    fixture.debugElement
      .query(By.directive(PatientBannerComponent))
      .componentInstance.newEncounter.emit();
    expect(component.isPatientEditorOpen()).toBe(false);
    expect(component.isEncounterFormOpen()).toBe(false);
    component.setTab('historia');
    fixture.detectChanges();
    const timeline = fixture.debugElement.query(
      By.directive(ClinicalTimelineComponent),
    ).componentInstance;
    expect(fixture.nativeElement.querySelector('.btn-new-encounter-cta')).toBeNull();
    timeline.newEncounter.emit();
    timeline.createEncounter();
    expect(component.isEncounterFormOpen()).toBe(false);
    history.encounters.set([]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.btn-new-encounter-cta')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Sin historias clínicas registradas');
  });
  it('closes edit and new consultation dialogs if their actions are removed', () => {
    component.editPatient();
    component.createEncounter();
    expect(component.isPatientEditorOpen()).toBe(true);
    expect(component.isEncounterFormOpen()).toBe(true);
    configuredActions.set(['PRINT_DOCUMENT']);
    fixture.detectChanges();
    expect(component.isPatientEditorOpen()).toBe(false);
    expect(component.isEncounterFormOpen()).toBe(false);
  });
  it('hides all prescription print buttons and blocks calls without discarding the draft', () => {
    rx.rxMedicationName.set('Borrador conservado');
    configuredActions.set(['EDIT_PATIENT', 'NEW_ENCOUNTER']);
    component.setTab('recetas');
    fixture.detectChanges();
    const dispatch = vi.spyOn(window, 'dispatchEvent').mockClear();
    expect(
      [...fixture.nativeElement.querySelectorAll('button')].some((el: any) =>
        el.textContent.toLowerCase().includes('imprimir'),
      ),
    ).toBe(false);
    component.printDocument();
    rx.printRecord(history.encounters()[0]);
    rx.onPrintPrescription(mockEncountersList[0]);
    rx.reprintSavedRecord(issued(mockPatient.id, {}));
    expect(dispatch).not.toHaveBeenCalled();
    expect(prescriptionApi.create).not.toHaveBeenCalled();
    expect(rx.rxMedicationName()).toBe('Borrador conservado');
    rx.saveCurrentRxToHistory();
    expect(prescriptionApi.create).toHaveBeenCalledTimes(1);
  });
  it('does not open printing from a save callback after the action is removed', () => {
    const response = new Subject<SavedPrescriptionRecord>();
    prescriptionApi.create.mockReturnValue(response);
    rx.rxMedicationName.set('Medicamento');
    const dispatch = vi.spyOn(window, 'dispatchEvent').mockClear();
    rx.printRecord();
    expect(prescriptionApi.create).toHaveBeenCalledTimes(1);
    configuredActions.set([]);
    response.next(
      issued(mockPatient.id, { type: 'PRESCRIPTION', prescriptions: [], diagnosticOrders: [] }),
    );
    expect(dispatch).not.toHaveBeenCalled();
  });
  it('does not execute the growth shortcut if its action is omitted', () => {
    configuredActions.set(['EDIT_PATIENT', 'NEW_ENCOUNTER']);
    fixture.detectChanges();
    component.navigateToGrowthCurves();
    expect(component.selectedTab()).toBe('resumen');
    component.setTab('curvas');
    expect(component.selectedTab()).toBe('curvas');
  });
  it('preserves pediatric tab labels, order and badges, including numbering with growth disabled', () => {
    expect(component.tabs().map((tab) => tab.label)).toEqual([
      '1. Datos del paciente',
      '2. Historia Clínica',
      '3. Vacunas',
      '4. Evolución y Curvas',
      '5. Recetas y Órdenes',
      '6. Estudios realizados',
    ]);
    expect(component.tabs()[1].badge).toBe(2);
    expect(component.tabs()[3].badge).toBe(6);
    growthEnabledFlag.set(false);
    fixture.detectChanges();
    expect(
      [...fixture.nativeElement.querySelectorAll('.flat-tab-btn > span:first-child')].map(
        (el: any) => el.textContent.trim(),
      ),
    ).toEqual([
      '1. Datos del paciente',
      '2. Historia Clínica',
      '3. Vacunas',
      '5. Recetas y Órdenes',
      '6. Estudios realizados',
    ]);
  });

  it('composes a different ordered record without inferring modules from specialty codes', () => {
    configuredTabs.set(['ENCOUNTERS', 'STUDIES', 'SUMMARY']);
    fixture.detectChanges();
    expect(component.tabs().map((tab) => tab.label)).toEqual([
      '1. Historia Clínica',
      '2. Estudios realizados',
      '3. Datos del paciente',
    ]);
    component.setTab('estudios');
    fixture.detectChanges();
    const studies = fixture.debugElement.query(By.directive(PatientStudiesComponent));
    expect(studies.componentInstance.patientId()).toBe(mockPatient.id);
    expect(fixture.debugElement.query(By.directive(PatientSummaryComponent))).toBeNull();
    component.setTab('vacunas');
    fixture.detectChanges();
    expect(component.selectedTab()).toBe('estudios');
    expect(fixture.debugElement.query(By.directive(PatientVaccinationsComponent))).toBeNull();
  });

  it('rejects omitted and unknown query tabs while accepting configured deep links', () => {
    configuredTabs.set(['SUMMARY', 'ENCOUNTERS']);
    fixture.detectChanges();
    for (const id of ['recetas', 'vacunas', 'curvas', 'estudios', 'unknown']) {
      queryParams.next(new Map([['tab', id]]));
      fixture.detectChanges();
      expect(component.selectedTab()).toBe('resumen');
      expect(fixture.debugElement.query(By.directive(PatientPrescriptionsComponent))).toBeNull();
    }
    queryParams.next(new Map([['tab', 'historia']]));
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(ClinicalTimelineComponent))).toBeTruthy();
  });

  it('removes selected modules immediately and discards their pending growth response', () => {
    const pending = new Subject<PatientGrowthResponse>();
    growthReadSpy.mockReturnValueOnce(pending);
    growth.loadGrowthCurves(mockPatient.id);
    component.setTab('curvas');
    fixture.detectChanges();
    rx.rxMedicationName.set('Borrador conservado');
    const encounterReads = encounterServiceSpy.getByPatient.mock.calls.length;
    const prescriptionReads = prescriptionApi.list.mock.calls.length;
    const growthReads = growthReadSpy.mock.calls.length;
    configuredTabs.set(['SUMMARY', 'ENCOUNTERS', 'PRESCRIPTIONS']);
    expect(component.activeTab()?.id).toBe('resumen');
    fixture.detectChanges();
    expect(component.selectedTab()).toBe('resumen');
    expect(growth.growthEnabled()).toBe(false);
    pending.next(measurementHistory);
    expect(growth.backendGrowthMeasurements()).toEqual([]);
    expect(growth.isLoadingGrowthCurves()).toBe(false);
    expect(growthReadSpy.mock.calls.length).toBe(growthReads);
    expect(encounterServiceSpy.getByPatient.mock.calls.length).toBe(encounterReads);
    expect(prescriptionApi.list.mock.calls.length).toBe(prescriptionReads);
    expect(rx.rxMedicationName()).toBe('Borrador conservado');
  });

  it('cancels prescription history and clears drafts when the prescription module is removed', () => {
    const pending = new Subject<SavedPrescriptionRecord[]>();
    prescriptionApi.list.mockReturnValueOnce(pending);
    rx.prescriptionStore.reload();
    rx.rxMedicationName.set('Borrador anterior');
    configuredTabs.set(['SUMMARY', 'ENCOUNTERS']); fixture.detectChanges();
    expect(pending.observed).toBe(false);
    pending.next([issued(mockPatient.id, {})]);
    expect(rx.savedPrescriptionRecords()).toEqual([]);
    expect(rx.rxMedicationName()).toBe('');
    expect(rx.prescriptionsEnabled()).toBe(false);
  });
  it('does not read or write prescriptions when the module is omitted', () => {
    configuredTabs.set(['SUMMARY', 'ENCOUNTERS']); fixture.detectChanges();
    prescriptionApi.list.mockClear();
    rx.prescriptionStore.reload();
    rx.rxMedicationName.set('Intento directo');
    rx.saveCurrentRxToHistory(); rx.deleteSavedRecord(1);
    const dispatch = vi.spyOn(window, 'dispatchEvent').mockClear();
    rx.reprintSavedRecord(issued(mockPatient.id, {}));
    expect(prescriptionApi.list).not.toHaveBeenCalled();
    expect(prescriptionApi.create).not.toHaveBeenCalled();
    expect(prescriptionApi.delete).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });
  it('still prints persisted consultation documents without a prescription module', () => {
    configuredTabs.set(['SUMMARY', 'ENCOUNTERS']); fixture.detectChanges();
    const dispatch = vi.spyOn(window, 'dispatchEvent').mockClear();
    rx.printRecord({...mockEncountersList[0], prescriptions: [{medicationName: 'Amoxicilina', dosage: '5 ml', frequency: 'Cada 8 horas', administrationRoute: 'Vía Oral', durationDays: 7}]});
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({detail: expect.objectContaining({source: 'ENCOUNTER', id: mockEncountersList[0].id})}));
    expect(prescriptionApi.create).not.toHaveBeenCalled();
  });
  it('does not mount a module outside the effective composition even if selected state is changed directly', () => {
    configuredTabs.set(['SUMMARY', 'ENCOUNTERS']);
    component.selectedTab.set('vacunas');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(PatientVaccinationsComponent))).toBeNull();
    expect(fixture.debugElement.query(By.directive(PatientSummaryComponent))).toBeTruthy();
    configuredTabs.set([]);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(PatientSummaryComponent))).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.flat-tab-btn')).toHaveLength(0);
  });

  it('updates dynamically mounted vaccination inputs and forwards its patient update output', () => {
    component.setTab('vacunas');
    fixture.detectChanges();
    const vaccines = fixture.debugElement.query(
      By.directive(PatientVaccinationsComponent),
    ).componentInstance;
    const updated = { ...mockPatient, fullName: 'Nombre actualizado' };
    activePatientService.setActivePatient(updated);
    fixture.detectChanges();
    expect(vaccines.patient()).toEqual(updated);
    expect(
      fixture.debugElement.query(By.directive(PatientVaccinationsComponent)).componentInstance,
    ).toBe(vaccines);
    vaccines.patientUpdated.emit(mockPatient);
    expect(activePatientService.activePatient()).toEqual(mockPatient);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should default to "resumen" tab and allow switching tabs', () => {
    expect(component.selectedTab()).toBe('resumen');
    component.setTab('historia');
    expect(component.selectedTab()).toBe('historia');
    component.setTab('curvas');
    expect(component.selectedTab()).toBe('curvas');
    component.setTab('recetas');
    expect(component.selectedTab()).toBe('recetas');
  });

  it('renders the saved patient form snapshot through its independent summary module', () => {
    const summary = fixture.debugElement.query(By.directive(PatientSummaryComponent));
    expect(summary).toBeTruthy();
    const form = summary.query(By.directive(DynamicFormRendererComponent))
      .componentInstance as DynamicFormRendererComponent;
    expect(form.definition()).toEqual(mockPatient.formDefinitionSnapshot);
    expect(form.values()).toEqual(mockPatient.formValues);
    expect(form.formulaResults()).toEqual(mockPatient.formulaResults);
    expect(form.readonly()).toBe(true);
    summary.nativeElement.querySelector('.btn-tab-edit').click();
    fixture.detectChanges();
    expect(component.isPatientEditorOpen()).toBe(true);
  });
  it('retains the prescription draft and growth selection when tab components are recreated', async () => {
    component.setTab('recetas');
    fixture.detectChanges();
    await fixture.whenStable();
    const first = fixture.debugElement.query(
      By.directive(PatientPrescriptionsComponent),
    ).componentInstance;
    fixture.nativeElement.querySelector('#rx-med-name').value = 'Medicamento pendiente';
    fixture.nativeElement.querySelector('#rx-med-name').dispatchEvent(new Event('input'));
    fixture.detectChanges();
    growth.selectedGrowthMetric.set('HEIGHT');
    component.setTab('historia');
    fixture.detectChanges();
    component.setTab('recetas');
    fixture.detectChanges();
    const second = fixture.debugElement.query(
      By.directive(PatientPrescriptionsComponent),
    ).componentInstance;
    await fixture.whenStable();
    expect(second).not.toBe(first);
    expect(second.editor).toBe(first.editor);
    expect(fixture.nativeElement.querySelector('#rx-med-name').value).toBe('Medicamento pendiente');
    component.setTab('curvas');
    fixture.detectChanges();
    expect(growth.selectedGrowthMetric()).toBe('HEIGHT');
  });

  it('retains the new clinical history form draft and consultation type when tab components are recreated', async () => {
    history.startCreatingEncounter();
    history.setEncounterDraft({ notes: 'Notas del examen físico' }, 'EMERGENCY', '2026-10-07T14:30:00.000Z');
    component.setTab('historia');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(history.isCreatingEncounter()).toBe(true);
    expect(history.encounterDraftValues()).toEqual({ notes: 'Notas del examen físico' });
    expect(history.encounterDraftConsultationType()).toBe('EMERGENCY');

    // Switch to another tab (resumen)
    component.setTab('resumen');
    fixture.detectChanges();
    await fixture.whenStable();

    // Switch back to historia
    component.setTab('historia');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(history.isCreatingEncounter()).toBe(true);
    expect(history.encounterDraftValues()).toEqual({ notes: 'Notas del examen físico' });
    expect(history.encounterDraftConsultationType()).toBe('EMERGENCY');
  });

  it('retains the study file and description draft across tab switches', async () => {
    const studiesStore = fixture.debugElement.injector.get(PatientStudiesStore);
    const testFile = new File(['pdf-data'], 'lab.pdf', { type: 'application/pdf' });
    studiesStore.setDraftFile(testFile);
    studiesStore.setDraftDescription('Análisis de orina completo');

    component.setTab('estudios');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(studiesStore.draftFile()).toBe(testFile);
    expect(studiesStore.draftDescription()).toBe('Análisis de orina completo');

    // Switch to another tab
    component.setTab('resumen');
    fixture.detectChanges();
    await fixture.whenStable();

    // Switch back to estudios
    component.setTab('estudios');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(studiesStore.draftFile()).toBe(testFile);
    expect(studiesStore.draftDescription()).toBe('Análisis de orina completo');
  });

  it('should load encounters on init', () => {
    expect(encounterServiceSpy.getByPatient).toHaveBeenCalledWith(10492);
    expect(history.encounters().length).toBe(2);
  });

  it('ignores a consultation response from the previously selected patient', () => {
    const pending = new Subject<ClinicalEncounterList[]>();
    encounterServiceSpy.getByPatient.mockReturnValueOnce(pending).mockReturnValue(of([]));
    history.loadEncounters(mockPatient.id);
    activePatientService.setActivePatient({ ...mockPatient, id: 99 });
    fixture.detectChanges();
    pending.next(mockEncountersList);
    expect(history.encounters()).toEqual([]);
  });

  it('refreshes projected measurements and consultations after editing a consultation', () => {
    const refreshed = {
      ...mockPatient,
      latestMeasurements: { weightKg: 8.5, heightCm: 70, headCircumferenceCm: 44 },
    };
    patientServiceSpy.getPatientById.mockReturnValue(of(refreshed));
    encounterServiceSpy.getByPatient.mockReturnValue(of([]));
    window.dispatchEvent(
      new CustomEvent('encounter-updated', { detail: { patientId: mockPatient.id } }),
    );
    fixture.detectChanges();
    expect(activePatientService.latestMeasurements()?.weightKg).toBe(8.5);
    expect(history.encounters()).toEqual([]);
  });

  it('does not recreate local points when the backend history is empty', () => {
    growthReadSpy.mockImplementation((id: number) => of(patientGrowthFixture(id, false)));
    growth.loadGrowthCurves(mockPatient.id);
    expect(growth.weightMeasurements()).toEqual([]);
    expect(growth.heightMeasurements()).toEqual([]);
    expect(growth.headCircumferenceMeasurements()).toEqual([]);
    expect(growth.growthError()).toBeNull();
  });
  it('shows measurement errors and retries without silently using local patient data', () => {
    growthReadSpy
      .mockReturnValueOnce(throwError(() => ({ status: 500 })))
      .mockImplementation((id: number) => of(patientGrowthFixture(id)));
    growth.loadGrowthCurves(mockPatient.id);
    component.setTab('curvas');
    fixture.detectChanges();
    expect(growth.weightMeasurements()).toEqual([]);
    expect(growth.isLoadingGrowthCurves()).toBe(false);
    const alert = fixture.nativeElement.querySelector('[role="alert"]');
    expect(alert.textContent).toContain('No se pudieron cargar las curvas y mediciones OMS');
    alert.querySelector('button').click();
    fixture.detectChanges();
    expect(growth.growthError()).toBeNull();
    expect(growth.weightMeasurements()).toHaveLength(2);
    expect(fixture.nativeElement.querySelector('app-growth-chart')).toBeTruthy();
  });
  it('ignores growth responses from a previous patient or account', () => {
    const pending = new Subject<PatientGrowthResponse>();
    growthReadSpy.mockReturnValueOnce(pending).mockImplementation((id: number) => of(patientGrowthFixture(id, false)));
    growth.loadGrowthCurves(mockPatient.id);
    activePatientService.setActivePatient({ ...mockPatient, id: 99 });
    fixture.detectChanges();
    pending.next(measurementHistory);
    expect(growth.weightMeasurements()).toEqual([]);
    const denied = new Subject<PatientGrowthResponse>();
    growthReadSpy.mockReturnValueOnce(denied);
    growth.loadGrowthCurves(99);
    authServiceMock.currentUser.set({ id: 'another-doctor' });
    denied.error({ status: 403 });
    expect(growth.growthError()).toBeNull();
    fixture.detectChanges();
    expect(growth.backendGrowthMeasurements()).toEqual([]);
  });
  it('should switch to growth curves tab when requested', () => {
    component.navigateToGrowthCurves();
    expect(component.selectedTab()).toBe('curvas');
  });

  it('lets the clinician undo a view-only reference confirmation', () => {
    growthReadSpy.mockImplementation((id: number, sex: 'MALE' | 'FEMALE' | null) => of({
      ...patientGrowthFixture(id), referenceSex: sex ?? '',
      sexSource: sex ? 'VIEW_CONFIRMATION' : '', status: sex ? 'READY' : 'REFERENCE_SEX_REQUIRED',
      charts: sex ? patientGrowthFixture(id).charts : [],
    }));
    component.setTab('curvas'); growth.loadGrowthCurves(mockPatient.id); fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Confirmar referencia masculina');
    growth.confirmSex('MALE'); fixture.detectChanges();
    fixture.nativeElement.querySelector('[data-testid="reset-growth-reference"]').click(); fixture.detectChanges();
    expect(growth.confirmedSex()).toBeNull();
    expect(growthReadSpy).toHaveBeenLastCalledWith(mockPatient.id, null);
    expect(fixture.nativeElement.textContent).toContain('Confirmar referencia masculina');
  });

  it('clears the reference sex confirmation when the patient changes', () => {
    growth.confirmSex('MALE');
    growthReadSpy.mockImplementation((id: number) => of(patientGrowthFixture(id, false)));
    activePatientService.setActivePatient({ ...mockPatient, id: 99 }); fixture.detectChanges();
    expect(growth.confirmedSex()).toBeNull();
    expect(growthReadSpy).toHaveBeenLastCalledWith(99, null);
  });

  it('shows BMI measurements without a position confirmation panel or request', () => {
    component.setTab('curvas');
    growth.selectedGrowthMetric.set('BMI');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.growth-position-panel')).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.patient-point').length).toBeGreaterThan(0);
    expect(growthReadSpy).toHaveBeenLastCalledWith(mockPatient.id, null);
  });

  it('automatically asks the API to evaluate missing positions and renders its BMI points', () => {
    const unpositioned = structuredClone(patientGrowthFixture(mockPatient.id));
    for (const observation of unpositioned.observations) observation.measurementMode = 'UNKNOWN';
    for (const chart of unpositioned.charts) {
      if (['BMI', 'WEIGHT_LENGTH', 'WEIGHT_HEIGHT'].includes(chart.definition.indicator)) {
        chart.omitted = chart.points.length;
        chart.points = [];
      }
    }
    const evaluated = patientGrowthFixture(mockPatient.id);
    growthReadSpy.mockImplementation((_id: number, _sex: unknown, modes: unknown) =>
      of(modes ? evaluated : unpositioned),
    );
    growth.loadGrowthCurves(mockPatient.id);
    component.setTab('curvas');
    growth.selectedGrowthMetric.set('BMI');
    fixture.detectChanges();
    expect(growthReadSpy).toHaveBeenLastCalledWith(mockPatient.id, null, { BIRTH: 'RECUMBENT', '1': 'STANDING' });
    expect(growth.response()).toBe(evaluated);
    expect(fixture.nativeElement.querySelectorAll('.patient-point')).toHaveLength(2);
    expect(fixture.nativeElement.querySelector('.growth-position-panel')).toBeNull();
  });

  it('preserves documented positions and reports a failed automatic evaluation', () => {
    const unpositioned = structuredClone(patientGrowthFixture(mockPatient.id));
    unpositioned.observations[0].measurementMode = 'UNKNOWN';
    growthReadSpy.mockImplementation((_id: number, _sex: unknown, modes: unknown) =>
      modes ? throwError(() => ({ status: 503 })) : of(unpositioned),
    );
    growth.loadGrowthCurves(mockPatient.id);
    expect(growthReadSpy).toHaveBeenLastCalledWith(mockPatient.id, null, { BIRTH: 'RECUMBENT' });
    expect(growth.response()).toBeNull();
    expect(growth.growthError()).toContain('No se pudieron cargar');
    expect(growth.isLoadingGrowthCurves()).toBe(false);
  });

  it('discards a pending automatic evaluation after switching patients', () => {
    const unpositioned = structuredClone(patientGrowthFixture(mockPatient.id));
    unpositioned.observations[0].measurementMode = 'UNKNOWN';
    const pending = new Subject<PatientGrowthResponse>();
    growthReadSpy.mockImplementation((id: number, _sex: unknown, modes: unknown) =>
      id === mockPatient.id ? modes ? pending : of(unpositioned) : of(patientGrowthFixture(id, false)),
    );
    growth.loadGrowthCurves(mockPatient.id);
    expect(growth.isLoadingGrowthCurves()).toBe(true);
    activePatientService.setActivePatient({ ...mockPatient, id: 99 });
    fixture.detectChanges();
    pending.next(patientGrowthFixture(mockPatient.id));
    expect(growth.response()?.patientId).toBe(99);
    expect(growth.backendGrowthMeasurements()).toEqual([]);
  });

  it('refreshes age-dependent references across midnight in the device zone', () => {
    fixture.destroy();
    vi.useFakeTimers();
    try {
      vi.setSystemTime(new Date('2026-10-08T23:59:00'));
      fixture = TestBed.createComponent(PatientRecordComponent); component = fixture.componentInstance; fixture.detectChanges();
      const calls = growthReadSpy.mock.calls.length;
      vi.advanceTimersByTime(60_000); fixture.detectChanges();
      expect(growthReadSpy.mock.calls.length).toBe(calls + 1);
      fixture.destroy();
    } finally { vi.useRealTimers(); }
  });

  it('should navigate to patient directory when back button is clicked', () => {
    component.navigateToPatients();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/patients']);
  });

  it('recreates screen state and cancels old reads while preserving unsaved inputs for the same patient', () => {
    const pending = new Subject<PatientGrowthResponse>();
    growthReadSpy.mockReturnValueOnce(pending);
    growth.loadGrowthCurves(mockPatient.id);
    rx.rxMedicationName.set('Borrador anterior');
    growth.selectedGrowthMetric.set('ALL');
    const oldGrowth = growth;
    const oldRx = rx;
    fixture.destroy();
    expect(pending.observed).toBe(false);
    fixture = TestBed.createComponent(PatientRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rx = fixture.debugElement.injector.get(PatientPrescriptionEditorStore);
    growth = fixture.debugElement.injector.get(PatientGrowthStore);
    expect(rx).not.toBe(oldRx);
    expect(growth).not.toBe(oldGrowth);
    expect(rx.rxMedicationName()).toBe('Borrador anterior');
    expect(growth.selectedGrowthMetric()).toBe('WEIGHT');
    pending.next(patientGrowthFixture(mockPatient.id, false));
    pending.complete();
    expect(growth.weightMeasurements()).toHaveLength(2);
  });
  it('should allow adding medications to draft and dispatching print modal', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    dispatchSpy.mockClear();

    component.setTab('recetas');
    rx.setRxFormMode('MEDICATION');

    rx.rxMedicationName.set('Ibuprofeno 400mg');
    rx.rxDosage.set('1 comprimido');
    rx.rxFrequency.set('Cada 8 horas');
    rx.rxAdministrationRoute.set('Vía Oral');
    rx.rxDurationDays.set(5);
    rx.rxDiagnosis.set('Cefalea tensional');

    rx.addMedicationToDraft();

    expect(rx.draftPrescriptions().length).toBe(1);
    expect(rx.draftPrescriptions()[0].medicationName).toBe('Ibuprofeno 400mg');

    rx.printRecord(history.encounters()[0]);

    expect(dispatchSpy).toHaveBeenCalled();
    const customEvent = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(customEvent.type).toBe('document-print-requested');
    expect(customEvent.detail.type).toBe('PRESCRIPTION');
    expect(customEvent.detail).toEqual({
      source: 'PRESCRIPTION_RECORD',
      id: 73,
      patientId: 10492,
      type: 'PRESCRIPTION',
    });
    expect(rx.savedPrescriptionRecords()[0].prescriptions).toHaveLength(1);
    expect(rx.savedPrescriptionRecords()[0].diagnosisDescription).toBe('Cefalea tensional');
  });

  it('should allow ordering diagnostic studies like Tomografía and dispatching print modal in STUDY_ORDERS mode', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    dispatchSpy.mockClear();

    component.setTab('recetas');
    rx.setRxFormMode('STUDY');

    rx.selectQuickStudy('Tomografía Axial Computada (TAC)');
    rx.rxStudySpecification.set('De cerebro sin contraste');
    rx.rxDiagnosis.set('Control neurológico');

    // Calling printRecord directly auto-commits the pending study input
    rx.printRecord(history.encounters()[0]);

    expect(rx.draftStudies().length).toBe(1);
    expect(rx.draftStudies()[0]).toBe(
      'Tomografía Axial Computada (TAC) — De cerebro sin contraste',
    );

    expect(dispatchSpy).toHaveBeenCalled();
    const customEvent = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(customEvent.type).toBe('document-print-requested');
    expect(customEvent.detail.type).toBe('STUDY_ORDERS');
    expect(rx.savedPrescriptionRecords()[0].diagnosticOrders).toContain(
      'Tomografía Axial Computada (TAC) — De cerebro sin contraste',
    );
    expect(customEvent.detail.source).toBe('PRESCRIPTION_RECORD');
  });

  it('should display the growth curves module and allow toggling metrics in tab curvas', () => {
    component.setTab('curvas');
    fixture.detectChanges();

    expect(component.selectedTab()).toBe('curvas');
    expect(growth.selectedGrowthMetric()).toBe('WEIGHT');

    // Growth toolbar is rendered
    const toolbar = fixture.nativeElement.querySelector('.growth-toolbar');
    expect(toolbar).toBeTruthy();

    // Verify pills
    const pills = fixture.nativeElement.querySelectorAll('.growth-pill-btn');
    expect(pills.length).toBe(6);

    // Switch metric to HEIGHT
    growth.selectedGrowthMetric.set('HEIGHT');
    fixture.detectChanges();
    expect(growth.selectedGrowthMetric()).toBe('HEIGHT');

    // Switch metric to ALL
    growth.selectedGrowthMetric.set('ALL');
    fixture.detectChanges();
    const charts = fixture.nativeElement.querySelectorAll('app-growth-chart');
    expect(charts.length).toBe(5);
  });

  it('renders the canonical backend birth and consultation measurements', () => {
    expect(growth.patientSex()).toBe('MALE');
    expect(growth.weightMeasurements().length).toBeGreaterThanOrEqual(1);
    expect(growth.heightMeasurements().length).toBeGreaterThanOrEqual(1);
    expect(growth.headCircumferenceMeasurements().length).toBeGreaterThanOrEqual(1);
    expect(growth.totalMeasurementsCount()).toBeGreaterThan(0);
  });
  it('waits for persisted server identity before printing and ignores repeated clicks', () => {
    const response = new Subject<SavedPrescriptionRecord>();
    prescriptionApi.create.mockReturnValue(response);
    const dispatch = vi.spyOn(window, 'dispatchEvent').mockClear();
    component.setTab('recetas');
    rx.rxMedicationName.set('Amoxicilina');
    rx.printRecord(history.encounters()[0]);
    rx.printRecord(history.encounters()[0]);
    rx.saveCurrentRxToHistory();
    fixture.detectChanges();
    const emitButtons = [...fixture.nativeElement.querySelectorAll('button')].filter(
      (button: any) => button.textContent.includes('Imprimir Receta Médica'),
    );
    expect(emitButtons).toHaveLength(2);
    expect(emitButtons.every((button: any) => button.disabled)).toBe(true);
    expect(prescriptionApi.create).toHaveBeenCalledTimes(1);
    expect(rx.savedPrescriptionRecords()).toEqual([]);
    expect(dispatch).not.toHaveBeenCalled();
    const request = prescriptionApi.create.mock.calls[0][1];
    response.next(issued(10492, request));
    response.complete();
    expect(rx.savedPrescriptionRecords()[0].id).toBe(73);
    const event = dispatch.mock.calls[0][0] as CustomEvent;
    expect(event.detail.id).toBe(73);
    expect(rx.savedPrescriptionRecords()[0].createdAt).toBe('2026-10-05T12:34:56Z');
    expect(event.detail.patientId).toBe(10492);
    expect(rx.savedPrescriptionRecords()[0].authorUserId).toBe('doctor');
    expect(event.detail.source).toBe('PRESCRIPTION_RECORD');
  });

  it('preserves the draft and does not print or invent history after a save error', () => {
    prescriptionApi.create.mockReturnValue(throwError(() => ({ status: 500 })));
    const dispatch = vi.spyOn(window, 'dispatchEvent').mockClear();
    rx.rxStudyName.set('Tomografía');
    rx.printRecord(history.encounters()[0]);
    expect(rx.draftStudies()).toEqual(['Tomografía']);
    expect(rx.savedPrescriptionRecords()).toEqual([]);
    expect(rx.rxSuccessMessage()).toBeNull();
    expect(rx.rxErrorMessage()).toContain('No se pudo guardar');
    expect(rx.rxBusy()).toBe(false);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('saves medications and studies together without sending browser identity or date', () => {
    rx.rxMedicationName.set('Paracetamol');
    rx.rxStudyName.set('ECG');
    rx.rxDiagnosis.set('Control');
    rx.rxGeneralInstructions.set('Reposo');
    rx.setRxFormMode('STUDY');
    rx.saveCurrentRxToHistory();
    const [id, request] = prescriptionApi.create.mock.calls[0];
    expect(id).toBe(10492);
    expect(request.type).toBe('STUDY_ORDERS');
    expect(request.prescriptions[0].medicationName).toBe('Paracetamol');
    expect(request.diagnosticOrders).toEqual(['ECG']);
    expect(Object.keys(request).sort()).toEqual(
      [
        'type',
        'prescriptions',
        'diagnosticOrders',
        'diagnosisDescription',
        'generalInstructions',
      ].sort(),
    );
  });

  it('reprints with an explicit stored document reference instead of passing row content', () => {
    const row = issued(10492, {
      type: 'STUDY_ORDERS',
      prescriptions: [],
      diagnosticOrders: ['ECG'],
      diagnosisDescription: '',
      generalInstructions: '',
    });
    const dispatch = vi.spyOn(window, 'dispatchEvent').mockClear();
    rx.reprintSavedRecord(row);
    expect((dispatch.mock.calls[0][0] as CustomEvent).detail).toEqual({
      source: 'PRESCRIPTION_RECORD',
      id: 73,
      patientId: 10492,
      type: 'STUDY_ORDERS',
    });
  });

  it('keeps history after deletion errors and removes it only after backend acknowledgment', () => {
    rx.rxStudyName.set('ECG');
    rx.saveCurrentRxToHistory();
    prescriptionApi.delete.mockReturnValue(throwError(() => ({ status: 500 })));
    rx.deleteSavedRecord(73);
    expect(rx.savedPrescriptionRecords()).toHaveLength(1);
    const response = new Subject<void>();
    prescriptionApi.delete.mockReturnValue(response);
    rx.deleteSavedRecord(73);
    expect(rx.savedPrescriptionRecords()).toHaveLength(1);
    response.next();
    response.complete();
    expect(rx.savedPrescriptionRecords()).toEqual([]);
  });

  it('rejects empty documents without issuing an HTTP create', () => {
    rx.saveCurrentRxToHistory();
    expect(prescriptionApi.create).not.toHaveBeenCalled();
    expect(rx.rxErrorMessage()).toContain('Agregá al menos');
  });

  it('does not print or insert a previous patient response after changing patients', () => {
    const response = new Subject<SavedPrescriptionRecord>();
    prescriptionApi.create.mockReturnValue(response);
    const dispatch = vi.spyOn(window, 'dispatchEvent').mockClear();
    rx.rxMedicationName.set('Paracetamol');
    rx.printRecord(history.encounters()[0]);
    const request = prescriptionApi.create.mock.calls[0][1];
    activePatientService.setActivePatient({ ...mockPatient, id: 20 });
    fixture.detectChanges();
    response.next(issued(10492, request));
    response.complete();
    expect(rx.savedPrescriptionRecords()).toEqual([]);
    expect(rx.draftPrescriptions()).toEqual([]);
    expect(dispatch).not.toHaveBeenCalled();
    expect(rx.rxBusy()).toBe(false);
  });

  it('shows a history loading error with a retry that retrieves server records', () => {
    prescriptionApi.list.mockReturnValue(throwError(() => ({ status: 500 })));
    patientServiceSpy.getPatientById.mockReturnValue(of({ ...mockPatient, id: 20 }));
    activePatientService.setActivePatient({ ...mockPatient, id: 20 });
    component.setTab('recetas');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No se pudo cargar el historial');
    const dispatch = vi.spyOn(window, 'dispatchEvent').mockClear();
    rx.printRecord(history.encounters()[0]);
    expect(dispatch).not.toHaveBeenCalled();
    const row = issued(20, {
      type: 'STUDY_ORDERS',
      prescriptions: [],
      diagnosticOrders: ['ECG'],
      diagnosisDescription: '',
      generalInstructions: '',
    });
    prescriptionApi.list.mockReturnValue(of([row]));
    rx.prescriptionStore.reload();
    expect(rx.savedPrescriptionRecords()).toEqual([row]);
    expect(rx.prescriptionStore.loadError()).toBeNull();
  });

  it('never invents a prescription from habitual medication or creates a browser ID', () => {
    const dispatch = vi.spyOn(window, 'dispatchEvent').mockClear();
    rx.printRecord(history.encounters()[0]);
    expect(dispatch).not.toHaveBeenCalled();
    expect(rx.rxErrorMessage()).toContain('Agregá al menos');
    expect(prescriptionApi.create).not.toHaveBeenCalled();
  });
  it('passes consultation IDs to the print endpoint instead of trusting the clinical timeline row', () => {
    const dispatch = vi.spyOn(window, 'dispatchEvent').mockClear();
    rx.onPrintPrescription({ ...mockEncountersList[0], patientId: 20 });
    expect((dispatch.mock.calls[0][0] as CustomEvent).detail).toEqual({
      source: 'ENCOUNTER',
      id: 1,
      patientId: 20,
    });
  });

  it('ignores consultation events for another patient', () => {
    patientServiceSpy.getPatientById.mockClear();
    window.dispatchEvent(new CustomEvent('encounter-updated', { detail: { patientId: 99 } }));
    expect(patientServiceSpy.getPatientById).not.toHaveBeenCalled();
  });
  it('clears patient drafts and closes editing modals when switching patient', () => {
    rx.rxDiagnosis.set('Paciente A');
    rx.rxMedicationName.set('Medicamento A');
    rx.addMedicationToDraft();
    component.isEncounterFormOpen.set(true);
    component.isPatientEditorOpen.set(true);
    activePatientService.setActivePatient({ ...mockPatient, id: 99 });
    fixture.detectChanges();
    expect(rx.rxDiagnosis()).toBe('');
    expect(rx.draftPrescriptions()).toEqual([]);
    expect(component.isEncounterFormOpen()).toBe(false);
    expect(component.isPatientEditorOpen()).toBe(false);
  });
  it('does not save the previous draft after changing patient before the context effect runs', () => {
    rx.rxMedicationName.set('Medicamento A');
    rx.addMedicationToDraft();
    activePatientService.setActivePatient({ ...mockPatient, id: 99 });
    rx.saveCurrentRxToHistory();
    expect(prescriptionApi.create).not.toHaveBeenCalled();
    expect(rx.draftPrescriptions()).toEqual([]);
  });
  it('disabling growth does not reload consultations or reset a prescription draft', () => {
    rx.rxMedicationName.set('Borrador conservado');
    component.setTab('curvas');
    fixture.detectChanges();
    encounterServiceSpy.getByPatient.mockClear();
    prescriptionApi.list.mockClear();
    growthEnabledFlag.set(false);
    fixture.detectChanges();
    expect(component.selectedTab()).toBe('resumen');
    expect(component.tabs().some((tab) => tab.id === 'curvas')).toBe(false);
    expect(rx.rxMedicationName()).toBe('Borrador conservado');
    expect(encounterServiceSpy.getByPatient).not.toHaveBeenCalled();
    expect(prescriptionApi.list).not.toHaveBeenCalled();
  });

  it('routes timeline actions through its module and refreshes the patient once after a confirmed deletion', () => {
    component.setTab('historia');
    fixture.detectChanges();
    const timeline = fixture.debugElement.query(By.directive(ClinicalTimelineComponent))
      .componentInstance as ClinicalTimelineComponent;
    timeline.newEncounter.emit();
    expect(component.isEncounterFormOpen()).toBe(true);
    const dispatch = vi.spyOn(window, 'dispatchEvent').mockClear();
    timeline.viewDetail.emit(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/encounters', 1]);
    patientServiceSpy.getPatientById.mockClear();
    timeline.deleteEncounter.emit(1);
    expect(encounterServiceSpy.delete).not.toHaveBeenCalled();
    history.confirmDeleteEncounter();
    fixture.detectChanges();
    expect(encounterServiceSpy.delete).toHaveBeenCalledWith(1);
    expect(patientServiceSpy.getPatientById).toHaveBeenCalledTimes(1);
  });

  it('passes the latest consultation to prescription printing from both the module and banner', async () => {
    const enc = {
      ...mockEncountersList[0],
      prescriptions: [{ medicationName: 'Medicación de consulta' }],
    };
    encounterServiceSpy.getByPatient.mockReturnValue(of([enc]));
    history.loadEncounters(mockPatient.id);
    component.setTab('recetas');
    fixture.detectChanges();
    await fixture.whenStable();
    const dispatch = vi.spyOn(window, 'dispatchEvent').mockClear();
    const button = [...fixture.nativeElement.querySelectorAll('button')].find((item: any) =>
      item.textContent.includes('Imprimir Receta Médica'),
    ) as HTMLButtonElement;
    button.click();
    fixture.detectChanges();
    expect((dispatch.mock.calls[0][0] as CustomEvent).detail).toEqual({
      source: 'ENCOUNTER',
      id: 1,
      patientId: 10492,
    });
    dispatch.mockClear();
    fixture.debugElement
      .query(By.directive(PatientBannerComponent))
      .componentInstance.printSummary.emit();
    expect((dispatch.mock.calls[0][0] as CustomEvent).detail).toEqual({
      source: 'ENCOUNTER',
      id: 1,
      patientId: 10492,
    });
    expect(prescriptionApi.create).not.toHaveBeenCalled();
  });
  it('keeps a new prescription neutral until adding a medication and resets validation after success', async () => {
    component.setTab('recetas'); fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.field-error')).toBeNull();
    rx.addMedicationToDraft(); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.field-error')).not.toBeNull();
    expect(rx.draftPrescriptions().length).toBe(0);
    rx.rxMedicationName.set('Medicamento de ejemplo'); rx.addMedicationToDraft(); fixture.detectChanges();
    expect(rx.draftPrescriptions().length).toBe(1); expect(rx.medicationAttempted()).toBe(false);
    expect(fixture.nativeElement.querySelector('.field-error')).toBeNull();
    rx.clearRxForm(); expect(rx.documentAttempted()).toBe(false); expect(rx.studyAttempted()).toBe(false);
  });
});
