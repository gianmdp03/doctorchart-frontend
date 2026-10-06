import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { clinicalFormFixture } from '../../core/models/clinical-form.fixture';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientRecordComponent } from './patient-record.component';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { CheckupService } from '../../core/services/checkup.service';
import { PatientService } from '../../core/services/patient.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PLATFORM_ID, signal } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
import { PatientPrescriptionService } from '../../core/services/patient-prescription.service';
import { SavedPrescriptionRecord } from '../../core/models/prescription.model';
import { PatientDetailDTO } from '../../core/models/patient.model';
import { MedicalCheckupDetailDTO } from '../../core/models/checkup.model';
import { ClinicalEncounterList } from '../../core/models/clinical-encounter.model';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';

describe('PatientRecordComponent', () => {
  let component: PatientRecordComponent;
  let fixture: ComponentFixture<PatientRecordComponent>;
  let activePatientService: ActivePatientService;
  let checkupServiceSpy: any;
  let patientServiceSpy: any;
  let encounterServiceSpy: any;
  let routerSpy: any;
  let authServiceMock: any;
  let prescriptionApi: any;
  const issued = (patientId: number, request: any): SavedPrescriptionRecord => ({
    ...request, id: 73, patientId, authorUserId: 'doctor', createdAt: '2026-10-05T12:34:56Z',
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
      firstGuardianFullName: 'Carla Lucía Benítez (Madre)',
      firstGuardianPhone: '11-4567-8901',
      firstGuardianNationalId: '36.812.904',
      secondGuardianFullName: 'Esteban Gabriel Rossi (Padre)',
      secondGuardianPhone: '11-4567-8902',
      secondGuardianNationalId: '34.567.890',
      address: 'Av. Santa Fe 3421, Piso 4B, CABA',
    },
    personalHistory: {
      birthMeasurements: {
        weight: 3.35,
        height: 50.0,
        headCircumference: 35.0,
      },
      chronicOrPreviousDiseases: ['Bronquiolitis leve a los 3 meses'],
      allergies: ['Amoxicilina'],
      habitualMedication: ['Vitamina D3 400 UI/día'],
    },
    familyHistory: {
      familyChronicDiseases: ['Hipertensión arterial (abuelo paterno)'],
      familyAllergies: ['Rinitis alérgica (madre)'],
      geneticDiseases: ['Sin antecedentes genéticos'],
    },
    immunizationAndNutrition: {
      feedingDiet: 'Lactancia materna exclusiva',
    },
    latestMeasurements: {
      weight: 7.95,
      height: 67.5,
      headCircumference: 43.8,
    },
  };

  const mockCheckupList: MedicalCheckupDetailDTO[] = [
    {
      id: 101,
      patientId: 10492,
      patientFullName: 'Mateo Rossi',
      checkupDate: '2026-03-15',
      reason: 'ROUTINE',
      measurements: { weight: 3.35, height: 50.0, headCircumference: 35.0 },
    },
    {
      id: 390,
      patientId: 10492,
      patientFullName: 'Mateo Rossi',
      checkupDate: '2026-09-15',
      reason: 'ROUTINE',
      measurements: { weight: 7.95, height: 67.5, headCircumference: 43.8 },
    },
  ];

  const mockEncountersList: ClinicalEncounterList[] = [
    {
      id: 1,
      patientId: 10492,
      encounterDate: '2026-09-15',
      ...clinicalFormFixture(), specialtyId: 1, specialty: {id:1,code:'pediatrics',name:'Pediatría',description:null},
      consultationType: 'ROUTINE_CHECKUP',
      chiefComplaint: 'Control pediátrico semestral',
      primaryDiagnosisCode: 'Z00.1',
      primaryDiagnosisDescription: 'Control de salud infantil',
    },
    {
      id: 2,
      patientId: 10492,
      encounterDate: '2026-09-16',
      ...clinicalFormFixture(), specialtyId: 7, specialty: {id:7,code:'custom_xyz',name:'Especialidad XYZ',description:null},
      consultationType: 'FIRST_VISIT',
      chiefComplaint: 'Soplo funcional inocente',
      primaryDiagnosisCode: 'R01.0',
      primaryDiagnosisDescription: 'Soplos cardíacos benignos',
    },
  ];

  beforeEach(async () => {
    HTMLCanvasElement.prototype.getContext = (() => ({
      fillRect: () => {},
      clearRect: () => {},
      getImageData: (x: number, y: number, w: number, h: number) => ({ data: new Array(w * h * 4) }),
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

    checkupServiceSpy = {
      getCheckupsByPatientId: vi.fn().mockReturnValue(of(mockCheckupList)),
    };
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
      get: vi.fn(), delete: vi.fn().mockReturnValue(of(undefined)),
    };
    routerSpy = {
      navigate: vi.fn(),
    };
    authServiceMock = {
      userName: signal('Dra. Sofía Mendoza'),
      isLoggedIn: signal(true),
      currentUser: signal({id:'doctor'}), isSuperAdmin: signal(false),
    };

    await TestBed.configureTestingModule({
      imports: [PatientRecordComponent],
      providers: [
        provideHttpClient(), provideHttpClientTesting(),
        {provide:WorkspaceStore,useValue:{isModuleActive:()=>true}},
        ActivePatientService,
        { provide: PatientPrescriptionService, useValue: prescriptionApi },
        { provide: PatientService, useValue: patientServiceSpy },
        { provide: CheckupService, useValue: checkupServiceSpy },
        { provide: ClinicalEncounterService, useValue: encounterServiceSpy },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['id', '10492']])),
            queryParamMap: of(new Map()),
          },
        },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    activePatientService = TestBed.inject(ActivePatientService);
    activePatientService.setActivePatient(mockPatient);

    fixture = TestBed.createComponent(PatientRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('should compute patient information correctly from activePatient', () => {
    expect(component.patientNationalId()).toBe('36.812.904');
    expect(component.guardian1Name()).toBe('Carla Lucía Benítez (Madre)');
    expect(component.guardian2Name()).toBe('Esteban Gabriel Rossi (Padre)');
    expect(component.birthWeightDisplay()).toBe('3.350 kg');
    expect(component.hasAllergies()).toBe(true);
    expect(component.allergies()).toContain('Amoxicilina');
  });

  it('should calculate somatometrics gains correctly', () => {
    expect(component.totalWeightGain()).toBe('+4.600 kg');
    expect(component.totalHeightGain()).toBe('+17.5 cm');
    expect(component.totalHeadCircGain()).toBe('+8.8 cm');
  });

  it('should load checkups on init and map rows for table', () => {
    expect(checkupServiceSpy.getCheckupsByPatientId).toHaveBeenCalledWith(10492);
    const tableData = component.checkupTableData();
    expect(tableData.length).toBe(2);
    expect(tableData[0].code).toBe('CP-390');
    expect(tableData[1].code).toBe('CP-101');
  });

  it('should load encounters on init', () => {
    expect(encounterServiceSpy.getByPatient).toHaveBeenCalledWith(10492);
    expect(component.encounters().length).toBe(2);
  });

  it('ignores a consultation response from the previously selected patient', () => {
    const pending = new Subject<ClinicalEncounterList[]>();
    encounterServiceSpy.getByPatient.mockReturnValueOnce(pending).mockReturnValue(of([]));
    component.loadEncounters(mockPatient.id);
    activePatientService.setActivePatient({ ...mockPatient, id: 99 });
    fixture.detectChanges();
    pending.next(mockEncountersList);
    expect(component.encounters()).toEqual([]);
  });

  it('refreshes projected measurements and consultations after editing a consultation', () => {
    const refreshed = {...mockPatient, latestMeasurements:{weight:8.5,height:70,headCircumference:44}};
    patientServiceSpy.getPatientById.mockReturnValue(of(refreshed));
    encounterServiceSpy.getByPatient.mockReturnValue(of([]));
    window.dispatchEvent(new CustomEvent('encounter-updated'));
    fixture.detectChanges();
    expect(activePatientService.latestMeasurements()?.weight).toBe(8.5);
    expect(component.encounters()).toEqual([]);
  });

  it('should switch to growth curves tab when requested', () => {
    component.navigateToGrowthCurves();
    expect(component.selectedTab()).toBe('curvas');
  });

  it('should navigate to patient directory when back button is clicked', () => {
    component.navigateToPatients();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pacientes']);
  });

  it('should toggle more menu state', () => {
    expect(component.isMoreMenuOpen()).toBe(false);
    component.toggleMoreMenu();
    expect(component.isMoreMenuOpen()).toBe(true);
    component.closeMoreMenu();
    expect(component.isMoreMenuOpen()).toBe(false);
  });

  it('should allow adding medications to draft and dispatching print modal', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    dispatchSpy.mockClear();

    component.setTab('recetas');
    component.setRxFormMode('MEDICATION');

    component.rxMedicationName.set('Ibuprofeno 400mg');
    component.rxDosage.set('1 comprimido');
    component.rxFrequency.set('Cada 8 horas');
    component.rxAdministrationRoute.set('Vía Oral');
    component.rxDurationDays.set(5);
    component.rxDiagnosis.set('Cefalea tensional');

    component.addMedicationToDraft();

    expect(component.draftPrescriptions().length).toBe(1);
    expect(component.draftPrescriptions()[0].medicationName).toBe('Ibuprofeno 400mg');

    component.printRecord();

    expect(dispatchSpy).toHaveBeenCalled();
    const customEvent = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(customEvent.type).toBe('open-prescription-print-modal');
    expect(customEvent.detail.type).toBe('PRESCRIPTION');
    expect(customEvent.detail.prescriptions.length).toBe(1);
    expect(customEvent.detail.primaryDiagnosisDescription).toBe('Cefalea tensional');
  });

  it('should allow ordering diagnostic studies like Tomografía and dispatching print modal in STUDY_ORDERS mode', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    dispatchSpy.mockClear();

    component.setTab('recetas');
    component.setRxFormMode('STUDY');

    component.selectQuickStudy('Tomografía Axial Computada (TAC)');
    component.rxStudySpecification.set('De cerebro sin contraste');
    component.rxDiagnosis.set('Control neurológico');

    // Calling printRecord directly auto-commits the pending study input
    component.printRecord();

    expect(component.draftStudies().length).toBe(1);
    expect(component.draftStudies()[0]).toBe('Tomografía Axial Computada (TAC) — De cerebro sin contraste');

    expect(dispatchSpy).toHaveBeenCalled();
    const customEvent = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(customEvent.type).toBe('open-prescription-print-modal');
    expect(customEvent.detail.type).toBe('STUDY_ORDERS');
    expect(customEvent.detail.diagnosticOrders).toContain(
      'Tomografía Axial Computada (TAC) — De cerebro sin contraste'
    );
  });

  it('should display the growth curves module and allow toggling metrics in tab curvas', () => {
    component.setTab('curvas');
    fixture.detectChanges();

    expect(component.selectedTab()).toBe('curvas');
    expect(component.selectedGrowthMetric()).toBe('WEIGHT');

    // Growth toolbar is rendered
    const toolbar = fixture.nativeElement.querySelector('.growth-toolbar');
    expect(toolbar).toBeTruthy();

    // Verify pills
    const pills = fixture.nativeElement.querySelectorAll('.growth-pill-btn');
    expect(pills.length).toBe(4);

    // Switch metric to HEIGHT
    component.selectedGrowthMetric.set('HEIGHT');
    fixture.detectChanges();
    expect(component.selectedGrowthMetric()).toBe('HEIGHT');

    // Switch metric to ALL
    component.selectedGrowthMetric.set('ALL');
    fixture.detectChanges();
    const charts = fixture.nativeElement.querySelectorAll('app-growth-chart');
    expect(charts.length).toBe(3);
  });

  it('should reactively extract patient growth measurements from birth and consultations', () => {
    expect(component.patientSex()).toBe('MALE');
    expect(component.weightMeasurements().length).toBeGreaterThanOrEqual(1);
    expect(component.heightMeasurements().length).toBeGreaterThanOrEqual(1);
    expect(component.headCircumferenceMeasurements().length).toBeGreaterThanOrEqual(1);
    expect(component.totalMeasurementsCount()).toBeGreaterThan(0);
  });
  it('waits for persisted server identity before printing and ignores repeated clicks', () => {
    const response = new Subject<SavedPrescriptionRecord>();
    prescriptionApi.create.mockReturnValue(response);
    const dispatch = vi.spyOn(window, 'dispatchEvent').mockClear();
    component.setTab('recetas');
    component.rxMedicationName.set('Amoxicilina');
    component.printRecord(); component.printRecord(); component.saveCurrentRxToHistory();
    fixture.detectChanges();
    const emitButtons = [...fixture.nativeElement.querySelectorAll('button')].filter((button: any) =>
      button.textContent.includes('Imprimir Receta Médica'));
    expect(emitButtons).toHaveLength(2);
    expect(emitButtons.every((button: any) => button.disabled)).toBe(true);
    expect(prescriptionApi.create).toHaveBeenCalledTimes(1);
    expect(component.savedPrescriptionRecords()).toEqual([]);
    expect(dispatch).not.toHaveBeenCalled();
    const request = prescriptionApi.create.mock.calls[0][1];
    response.next(issued(10492, request)); response.complete();
    expect(component.savedPrescriptionRecords()[0].id).toBe(73);
    const event = dispatch.mock.calls[0][0] as CustomEvent;
    expect(event.detail.id).toBe(73);
    expect(event.detail.encounterDate).toBe('2026-10-05T12:34:56Z');
    expect(event.detail.patientId).toBe(10492);
    expect(event.detail.authorUserId).toBe('doctor');
  });

  it('preserves the draft and does not print or invent history after a save error', () => {
    prescriptionApi.create.mockReturnValue(throwError(() => ({ status: 500 })));
    const dispatch = vi.spyOn(window, 'dispatchEvent').mockClear();
    component.rxStudyName.set('Tomografía');
    component.printRecord();
    expect(component.draftStudies()).toEqual(['Tomografía']);
    expect(component.savedPrescriptionRecords()).toEqual([]);
    expect(component.rxSuccessMessage()).toBeNull();
    expect(component.rxErrorMessage()).toContain('No se pudo guardar');
    expect(component.rxBusy()).toBe(false);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('saves medications and studies together without sending browser identity or date', () => {
    component.rxMedicationName.set('Paracetamol'); component.rxStudyName.set('ECG');
    component.rxDiagnosis.set('Control'); component.rxGeneralInstructions.set('Reposo');
    component.setRxFormMode('STUDY'); component.saveCurrentRxToHistory();
    const [id, request] = prescriptionApi.create.mock.calls[0];
    expect(id).toBe(10492); expect(request.type).toBe('STUDY_ORDERS');
    expect(request.prescriptions[0].medicationName).toBe('Paracetamol');
    expect(request.diagnosticOrders).toEqual(['ECG']);
    expect(Object.keys(request).sort()).toEqual(['type','prescriptions','diagnosticOrders','diagnosisDescription','generalInstructions'].sort());
  });

  it('retrieves persisted content before reprinting instead of trusting the displayed row', () => {
    const row = issued(10492, {type:'STUDY_ORDERS',prescriptions:[],diagnosticOrders:['ECG'], diagnosisDescription:'',generalInstructions:''});
    prescriptionApi.get.mockReturnValue(of({...row, diagnosticOrders:['Tomografía guardada']}));
    const dispatch = vi.spyOn(window,'dispatchEvent').mockClear();
    component.reprintSavedRecord(row);
    expect(prescriptionApi.get).toHaveBeenCalledWith(10492,73);
    expect((dispatch.mock.calls[0][0] as CustomEvent).detail.diagnosticOrders).toEqual(['Tomografía guardada']);
  });

  it('keeps history after deletion errors and removes it only after backend acknowledgment', () => {
    component.rxStudyName.set('ECG'); component.saveCurrentRxToHistory();
    prescriptionApi.delete.mockReturnValue(throwError(() => ({status:500})));
    component.deleteSavedRecord(73);
    expect(component.savedPrescriptionRecords()).toHaveLength(1);
    const response=new Subject<void>(); prescriptionApi.delete.mockReturnValue(response);
    component.deleteSavedRecord(73);
    expect(component.savedPrescriptionRecords()).toHaveLength(1);
    response.next(); response.complete();
    expect(component.savedPrescriptionRecords()).toEqual([]);
  });

  it('rejects empty documents without issuing an HTTP create', () => {
    component.saveCurrentRxToHistory();
    expect(prescriptionApi.create).not.toHaveBeenCalled();
    expect(component.rxErrorMessage()).toContain('Agregá al menos');
  });

  it('does not print or insert a previous patient response after changing patients', () => {
    const response = new Subject<SavedPrescriptionRecord>(); prescriptionApi.create.mockReturnValue(response);
    const dispatch = vi.spyOn(window, 'dispatchEvent').mockClear();
    component.rxMedicationName.set('Paracetamol'); component.printRecord();
    const request = prescriptionApi.create.mock.calls[0][1];
    activePatientService.setActivePatient({...mockPatient, id:20}); fixture.detectChanges();
    response.next(issued(10492,request)); response.complete();
    expect(component.savedPrescriptionRecords()).toEqual([]);
    expect(component.draftPrescriptions()).toEqual([]);
    expect(dispatch).not.toHaveBeenCalled();
    expect(component.rxBusy()).toBe(false);
  });

  it('shows a history loading error with a retry that retrieves server records', () => {
    prescriptionApi.list.mockReturnValue(throwError(() => ({status:500})));
    component.loadSavedPrescriptions(20); component.setTab('recetas'); fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No se pudo cargar el historial');
    const dispatch = vi.spyOn(window, 'dispatchEvent').mockClear();
    component.printRecord();
    expect(dispatch).not.toHaveBeenCalled();
    const row=issued(20,{type:'STUDY_ORDERS',prescriptions:[],diagnosticOrders:['ECG'],diagnosisDescription:'',generalInstructions:''});
    prescriptionApi.list.mockReturnValue(of([row])); component.prescriptionStore.reload();
    expect(component.savedPrescriptionRecords()).toEqual([row]);
    expect(component.prescriptionStore.loadError()).toBeNull();
  });

});
