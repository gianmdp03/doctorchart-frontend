import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientRecordComponent } from './patient-record.component';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { CheckupService } from '../../core/services/checkup.service';
import { PatientService } from '../../core/services/patient.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PLATFORM_ID, signal } from '@angular/core';
import { of } from 'rxjs';
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

  const mockPatient: PatientDetailDTO = {
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
      developmentalMilestones: 'Sostiene la cabeza firmemente a los 3 meses',
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
    authServiceMock = {
      userName: signal('Dra. Sofía Mendoza'),
      isLoggedIn: signal(true),
    };

    await TestBed.configureTestingModule({
      imports: [PatientRecordComponent],
      providers: [
        ActivePatientService,
        { provide: PatientService, useValue: patientServiceSpy },
        { provide: CheckupService, useValue: checkupServiceSpy },
        { provide: ClinicalEncounterService, useValue: encounterServiceSpy },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(new Map([['id', '10492']])) },
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
    component.setTab('herramientas');
    expect(component.selectedTab()).toBe('herramientas');
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

  it('should load encounters on init and support filtering by specialty', () => {
    expect(encounterServiceSpy.getByPatient).toHaveBeenCalledWith(10492);
    expect(component.filteredEncounters().length).toBe(2);

    component.selectedSpecialtyFilter.set('PEDIATRICS');
    expect(component.filteredEncounters().length).toBe(1);
    expect(component.filteredEncounters()[0].specialty).toBe('PEDIATRICS');

    component.selectedSpecialtyFilter.set('CARDIOLOGY');
    expect(component.filteredEncounters().length).toBe(1);
    expect(component.filteredEncounters()[0].specialty).toBe('CARDIOLOGY');

    component.selectedSpecialtyFilter.set('ALL');
    expect(component.filteredEncounters().length).toBe(2);
  });

  it('should navigate to growth curves when requested', () => {
    component.navigateToGrowthCurves();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/curvas']);
  });

  it('should navigate to milestones when requested', () => {
    component.navigateToMilestones();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/hitos']);
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
});
