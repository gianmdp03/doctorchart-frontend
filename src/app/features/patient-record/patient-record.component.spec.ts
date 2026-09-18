import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientRecordComponent } from './patient-record.component';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { PatientService } from '../../core/services/patient.service';
import { CheckupService } from '../../core/services/checkup.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { of, throwError } from 'rxjs';
import { PatientDetailDTO } from '../../core/models/patient.model';
import { MedicalCheckupDetailDTO } from '../../core/models/checkup.model';
import { ClinicalEncounterList } from '../../core/models/clinical-encounter.model';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';

describe('PatientRecordComponent', () => {
  let component: PatientRecordComponent;
  let fixture: ComponentFixture<PatientRecordComponent>;
  let checkupServiceSpy: { getCheckupsByPatientId: ReturnType<typeof vi.fn> };
  let patientServiceSpy: { getPatientById: ReturnType<typeof vi.fn> };
  let encounterServiceSpy: {
    getByPatient: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
    migratePediatricCheckups: ReturnType<typeof vi.fn>;
  };
  let routerSpy: { navigate: ReturnType<typeof vi.fn> };
  let activePatientService: ActivePatientService;

  const mockPatient: PatientDetailDTO = {
    id: 10492,
    fullName: 'Mateo Rossi',
    birthDate: '2026-03-15',
    guardianInfo: {
      firstGuardianFullName: 'Carla Lucía Benítez (Madre)',
      firstGuardianPhone: '+54 9 11 4455-8899',
      firstGuardianNationalId: '36.812.904',
      secondGuardianFullName: 'Esteban Gabriel Rossi (Padre)',
      secondGuardianPhone: '+54 9 11 5566-7788',
      secondGuardianNationalId: '35.789.123',
      address: 'Av. del Libertador 4580, Piso 4 Depto B, Palermo, CABA',
    },
    perinatalHistory: {
      gestationCount: 1,
      prenatalVisitsSummary: '8 controles obstétricos',
      pregnancyComplications: ['Preeclampsia leve en semana 37 (Controlada)'],
    },
    personalHistory: {
      chronicOrPreviousDiseases: ['Bronquiolitis aguda viral a los 3 meses'],
      hospitalizationsOrSurgeries: ['Sin cirugías previas'],
      allergies: [],
      habitualMedication: ['Vitamina D3 400 UI/día'],
      birthMeasurements: {
        weight: 3.35,
        height: 50.0,
        headCircumference: 35.0,
      },
    },
    familyHistory: {
      familyChronicDiseases: ['Diabetes Mellitus Tipo 2'],
      familyAllergies: ['Alergia a penicilina materna'],
      geneticDiseases: [],
    },
    immunizationAndNutrition: {
      feedingDiet: 'Lactancia Materna Exclusiva (LME) hasta el 6° mes',
      vaccinationHistory: ['BCG', 'Quíntuple 1', 'IPV 1'],
      developmentalMilestones: 'Control cefálico firme',
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
      specialty: 'PEDIATRICS',
      consultationType: 'ROUTINE_CHECKUP',
      chiefComplaint: 'Control pediátrico semestral',
      primaryDiagnosisCode: 'Z00.1',
      primaryDiagnosisDescription: 'Control de salud infantil',
    },
    {
      id: 2,
      patientId: 10492,
      encounterDate: '2026-09-16',
      specialty: 'CARDIOLOGY',
      consultationType: 'FIRST_VISIT',
      chiefComplaint: 'Soplo funcional inocente',
      primaryDiagnosisCode: 'R01.0',
      primaryDiagnosisDescription: 'Soplos cardíacos benignos',
    },
  ];

  beforeEach(async () => {
    checkupServiceSpy = {
      getCheckupsByPatientId: vi.fn().mockReturnValue(of(mockCheckupList)),
    };
    patientServiceSpy = {
      getPatientById: vi.fn().mockReturnValue(of(mockPatient)),
    };
    encounterServiceSpy = {
      getByPatient: vi.fn().mockReturnValue(of(mockEncountersList)),
      delete: vi.fn().mockReturnValue(of(undefined)),
      migratePediatricCheckups: vi.fn().mockReturnValue(
        of({ totalFound: 5, alreadyMigrated: 2, migratedNow: 3, status: 'SUCCESS' })
      ),
    };
    routerSpy = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [PatientRecordComponent],
      providers: [
        ActivePatientService,
        { provide: PatientService, useValue: patientServiceSpy },
        { provide: CheckupService, useValue: checkupServiceSpy },
        { provide: ClinicalEncounterService, useValue: encounterServiceSpy },
        { provide: Router, useValue: routerSpy },
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

  it('should default to "general" subtab and allow switching tabs', () => {
    expect(component.selectedSubtab()).toBe('general');
    component.setSubtab('perinatal');
    expect(component.selectedSubtab()).toBe('perinatal');
    component.setSubtab('history');
    expect(component.selectedSubtab()).toBe('history');
  });

  it('should compute patient information correctly from activePatient', () => {
    expect(component.patientNationalId()).toBe('36.812.904');
    expect(component.guardian1Name()).toBe('Carla Lucía Benítez (Madre)');
    expect(component.guardian2Name()).toBe('Esteban Gabriel Rossi (Padre)');
    expect(component.gestationCount()).toBe(1);
    expect(component.birthWeightDisplay()).toBe('3.350 kg');
  });

  it('should calculate somatometrics gains correctly', () => {
    expect(component.totalWeightGain()).toBe('+4.600 kg');
    expect(component.totalHeightGain()).toBe('+17.5 cm');
    expect(component.totalHeadCircGain()).toBe('+8.8 cm');
  });

  it('should load checkups on init and map rows for history table', () => {
    expect(checkupServiceSpy.getCheckupsByPatientId).toHaveBeenCalledWith(10492);
    const tableData = component.checkupTableData();
    expect(tableData.length).toBe(2);
    expect(tableData[0].code).toBe('#C-101');
    expect(tableData[1].code).toBe('#C-390');
    expect(tableData[1].isLatest).toBe(true);
  });

  it('should set empty checkups when service returns empty array or error', () => {
    checkupServiceSpy.getCheckupsByPatientId.mockReturnValue(
      throwError(() => new Error('Network error'))
    );
    component.loadCheckups(10492);
    expect(component.checkups().length).toBe(0);
  });

  it('should load SOAP encounters on init and support specialty filtering', () => {
    expect(encounterServiceSpy.getByPatient).toHaveBeenCalledWith(10492);
    expect(component.encounters().length).toBe(2);
    expect(component.filteredEncounters().length).toBe(2);

    // Filter by CARDIOLOGY
    component.selectedSpecialtyFilter.set('CARDIOLOGY');
    expect(component.filteredEncounters().length).toBe(1);
    expect(component.filteredEncounters()[0].specialty).toBe('CARDIOLOGY');

    // Filter by PEDIATRICS
    component.selectedSpecialtyFilter.set('PEDIATRICS');
    expect(component.filteredEncounters().length).toBe(1);
    expect(component.filteredEncounters()[0].specialty).toBe('PEDIATRICS');

    // Filter back to ALL
    component.selectedSpecialtyFilter.set('ALL');
    expect(component.filteredEncounters().length).toBe(2);
  });

  it('should dispatch open-new-encounter-modal event when openNewEncounterModal is called', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    component.openNewEncounterModal('CARDIOLOGY');
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should dispatch open-encounter-detail-modal event when openEncounterDetail is called', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    component.openEncounterDetail(1);
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should delete encounter when confirmed by user', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    component.deleteEncounter(1);
    expect(encounterServiceSpy.delete).toHaveBeenCalledWith(1);
  });

  it('should execute pediatric migration and display feedback banner', () => {
    component.migratePediatricCheckups();
    expect(encounterServiceSpy.migratePediatricCheckups).toHaveBeenCalled();
    expect(component.migrationMessage()).toContain('Migración completada con éxito');
  });

  it('should toggle complementary pediatric tools', () => {
    expect(component.isPediatricToolsExpanded()).toBe(false);
    component.togglePediatricTools();
    expect(component.isPediatricToolsExpanded()).toBe(true);
    component.togglePediatricTools();
    expect(component.isPediatricToolsExpanded()).toBe(false);
  });

  it('should dispatch open-new-checkup-modal event when openNewCheckupModal is called', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    component.openNewCheckupModal();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should dispatch open-new-patient-modal event when openNewPatientModal is called', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    component.openNewPatientModal();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should navigate to /pacientes when navigateToPatients is called', () => {
    component.navigateToPatients();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pacientes']);
  });

  it('should navigate to /curvas and /hitos', () => {
    component.navigateToGrowthCurves();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/curvas']);

    component.navigateToMilestones();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/hitos']);
  });

  describe('Contextual subtabs & Specialty integration', () => {
    it('should configure subtabs correctly for GYNECOLOGY', () => {
      const specialtyService = TestBed.inject(DoctorSpecialtyService);
      specialtyService.setSpecialty('GYNECOLOGY');
      fixture.detectChanges();

      const tabs = component.availableSubtabs();
      const tabIds = tabs.map((t) => t.id);
      expect(tabIds).toContain('general');
      expect(tabIds).toContain('gynecology');
      expect(tabIds).toContain('personal');
      expect(tabIds).toContain('history');
      expect(tabIds).not.toContain('perinatal');
      expect(tabIds).not.toContain('nutrition');
    });

    it('should configure subtabs correctly for CARDIOLOGY with adult patient', () => {
      const adultPatient: PatientDetailDTO = {
        ...mockPatient,
        id: 9999,
        birthDate: '1985-05-20',
      };
      activePatientService.setActivePatient(adultPatient);
      const specialtyService = TestBed.inject(DoctorSpecialtyService);
      specialtyService.setSpecialty('CARDIOLOGY');
      fixture.detectChanges();

      const tabs = component.availableSubtabs();
      const tabIds = tabs.map((t) => t.id);
      expect(tabIds).toContain('general');
      expect(tabIds).toContain('cardiovascular');
      expect(tabIds).toContain('personal');
      expect(tabIds).toContain('history');
      expect(tabIds).not.toContain('perinatal');
      expect(tabIds).not.toContain('nutrition');
    });

    it('should configure subtabs correctly for PEDIATRICS with adult vs child patient', () => {
      const specialtyService = TestBed.inject(DoctorSpecialtyService);
      specialtyService.setSpecialty('PEDIATRICS');

      // Child (< 16 years)
      activePatientService.setActivePatient(mockPatient);
      fixture.detectChanges();
      let tabIds = component.availableSubtabs().map((t) => t.id);
      expect(tabIds).toContain('general');
      expect(tabIds).toContain('perinatal');
      expect(tabIds).toContain('personal');
      expect(tabIds).toContain('nutrition');
      expect(tabIds).toContain('history');

      // Adult (>= 16 years)
      const adultPatient: PatientDetailDTO = {
        ...mockPatient,
        id: 8888,
        birthDate: '1990-01-01',
      };
      activePatientService.setActivePatient(adultPatient);
      fixture.detectChanges();
      tabIds = component.availableSubtabs().map((t) => t.id);
      expect(tabIds).toContain('general');
      expect(tabIds).toContain('personal');
      expect(tabIds).toContain('history');
      expect(tabIds).not.toContain('perinatal');
      expect(tabIds).not.toContain('nutrition');
    });

    it('should display encounters empty state when patient has 0 encounters', () => {
      component.encounters.set([]);
      component.isLoadingEncounters.set(false);
      component.setSubtab('history');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const emptyCard = compiled.querySelector('.empty-encounters-card');
      expect(emptyCard).toBeTruthy();
      expect(emptyCard?.textContent).toContain('Paciente sin consultas registradas');
      expect(emptyCard?.textContent).toContain('Iniciar Primera Consulta');
    });
  });
});
