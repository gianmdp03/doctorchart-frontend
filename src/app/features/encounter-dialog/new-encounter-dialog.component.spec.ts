import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { of, throwError } from 'rxjs';
import { NewEncounterDialogComponent } from './new-encounter-dialog.component';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { SpecialtySchemaService } from '../../core/services/specialty-schema.service';
import { SpecialtySchema } from '../../core/models/specialty.model';
import {
  ClinicalEncounterDetail,
  ClinicalEncounterRequest,
} from '../../core/models/clinical-encounter.model';
import { PatientDetailDTO } from '../../core/models/patient.model';
import { PatientService } from '../../core/services/patient.service';
import { MedicationCatalogService } from '../../core/services/medication-catalog.service';

describe('NewEncounterDialogComponent', () => {
  let component: NewEncounterDialogComponent;
  let fixture: ComponentFixture<NewEncounterDialogComponent>;
  let activePatientService: ActivePatientService;
  let encounterServiceSpy: {
    create: ReturnType<typeof vi.fn>;
  };
  let specialtySchemaServiceSpy: {
    getSchema: ReturnType<typeof vi.fn>;
  };

  const mockPatient: PatientDetailDTO = {
    id: 10492,
    fullName: 'Mateo Rossi',
    birthDate: '2026-03-15',
    latestMeasurements: {
      weight: 8.5,
      height: 70.0,
      headCircumference: 44.0,
    },
  };

  const mockSchema: SpecialtySchema = {
    specialty: 'GENERAL_MEDICINE',
    displayName: 'Medicina General',
    description: 'Protocolo de medicina familiar',
    version: '1.0',
    fields: [
      {
        key: 'cardiovascularRisk',
        label: 'Riesgo Cardiovascular Global',
        type: 'SELECT',
        required: true,
        options: [
          { label: 'Bajo', value: 'LOW' },
          { label: 'Moderado', value: 'MODERATE' },
        ],
      },
    ],
  };

  const mockCreatedEncounter: ClinicalEncounterDetail = {
    id: 999,
    patientId: 10492,
    patientFullName: 'Mateo Rossi',
    encounterDate: '2026-09-17',
    specialty: 'GENERAL_MEDICINE',
    consultationType: 'FIRST_VISIT',
    chiefComplaint: 'Control clínico preventivo',
    primaryDiagnosisCode: 'Z00.0',
    primaryDiagnosisDescription: 'Examen médico general de rutina del adulto',
  };

  beforeEach(async () => {
    encounterServiceSpy = {
      create: vi.fn().mockReturnValue(of(mockCreatedEncounter)),
    };
    specialtySchemaServiceSpy = {
      getSchema: vi.fn().mockReturnValue(of(mockSchema)),
    };

    await TestBed.configureTestingModule({
      imports: [NewEncounterDialogComponent],
      providers: [
        ActivePatientService,
        {
          provide: PatientService,
          useValue: { getPatientById: vi.fn().mockReturnValue(of(mockPatient)) },
        },
        { provide: ClinicalEncounterService, useValue: encounterServiceSpy },
        { provide: SpecialtySchemaService, useValue: specialtySchemaServiceSpy },
        {
          provide: MedicationCatalogService,
          useValue: { search: vi.fn().mockReturnValue(of([])) },
        },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    activePatientService = TestBed.inject(ActivePatientService);
    activePatientService.setActivePatient(mockPatient);

    fixture = TestBed.createComponent(NewEncounterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    expect(component.isOpen()).toBe(false);
    expect(component.selectedSpecialty()).toBe('PEDIATRICS');
    expect(component.activeSoapTab()).toBe('S');
  });

  it('should open modal and reset tab to S on window:open-new-encounter-modal event', () => {
    window.dispatchEvent(
      new CustomEvent('open-new-encounter-modal', {
        detail: { patientId: 10492, specialty: 'CARDIOLOGY' },
      })
    );
    fixture.detectChanges();

    expect(component.isOpen()).toBe(true);
    expect(component.selectedSpecialty()).toBe('CARDIOLOGY');
    expect(component.activeSoapTab()).toBe('S');
  });

  it('should close modal on escape key or backdrop click', () => {
    component.isOpen.set(true);

    component.onEscape();
    expect(component.isOpen()).toBe(false);

    component.isOpen.set(true);
    (component as any).openedAt = Date.now() - 500;
    const mockElement = document.createElement('div');
    const mockBackdropEvent = {
      target: mockElement,
      currentTarget: mockElement,
    } as unknown as MouseEvent;
    component.onBackdropMouseDown(mockBackdropEvent);
    component.onBackdropClick(mockBackdropEvent);
    expect(component.isOpen()).toBe(false);
  });

  it('should calculate BMI in real time based on weight and height', () => {
    component.encounterForm.patchValue({
      weightKg: 70,
      heightCm: 175,
    });

    const bmiResult = component.computedBmi();
    expect(bmiResult.value).toBe(22.86);
    expect(bmiResult.badgeClass).toBe('badge-success');
    expect(bmiResult.label).toContain('Peso normal');
  });

  it('should calculate BMI as obesity when index >= 30', () => {
    component.encounterForm.patchValue({
      weightKg: 105,
      heightCm: 170,
    });

    const bmiResult = component.computedBmi();
    expect(bmiResult.value).toBe(36.33);
    expect(bmiResult.badgeClass).toBe('badge-danger');
    expect(bmiResult.label).toContain('Obesidad');
  });

  it('should add and remove secondary diagnoses', () => {
    component.newSecondaryCode.set('E11.9');
    component.newSecondaryDesc.set('Diabetes tipo 2');
    component.newSecondaryChronic.set(true);

    component.addSecondaryDiagnosis();
    expect(component.secondaryDiagnoses().length).toBe(1);
    expect(component.secondaryDiagnoses()[0]).toEqual({
      code: 'E11.9',
      description: 'Diabetes tipo 2',
      isChronic: true,
    });

    component.removeSecondaryDiagnosis(0);
    expect(component.secondaryDiagnoses().length).toBe(0);
  });

  it('should add and remove prescriptions', () => {
    component.newRxDrug.set('Amoxicilina');
    component.newRxDose.set('500 mg');
    component.newRxRoute.set('Oral');
    component.newRxFreq.set('Cada 8 hs');
    component.newRxDuration.set(7);

    component.addPrescription();
    expect(component.prescriptions().length).toBe(1);
    expect(component.prescriptions()[0].medicationName).toBe('Amoxicilina');

    component.removePrescription(0);
    expect(component.prescriptions().length).toBe(0);
  });

  it('should add and remove diagnostic orders', () => {
    component.newDiagnosticOrder.set('Hemograma completo');
    component.addDiagnosticOrder();
    expect(component.diagnosticOrders().length).toBe(1);
    expect(component.diagnosticOrders()[0]).toBe('Hemograma completo');

    component.removeDiagnosticOrder(0);
    expect(component.diagnosticOrders().length).toBe(0);
  });

  it('should copy previous measurements from active patient', () => {
    component.copyPreviousMeasurements();
    expect(component.encounterForm.get('weightKg')?.value).toBe(8.5);
    expect(component.encounterForm.get('heightCm')?.value).toBe(70.0);
  });

  it('should show error message if required fields are missing on submit', () => {
    component.isOpen.set(true);
    component.encounterForm.patchValue({
      chiefComplaint: '', // invalid
    });

    component.onSubmit();
    expect(component.errorMessage()).toContain('Por favor complete los campos obligatorios');
    expect(encounterServiceSpy.create).not.toHaveBeenCalled();
  });

  it('should submit successfully, dispatch event, and close modal', () => {
    component.isOpen.set(true);
    component.encounterForm.patchValue({
      encounterDate: '2026-09-17',
      consultationType: 'FIRST_VISIT',
      chiefComplaint: 'Consulta clínica por chequeo',
      primaryDiagnosisCode: 'Z00.0',
      primaryDiagnosisDescription: 'Examen médico general de rutina del adulto',
      weightKg: 70,
      heightCm: 175,
    });
    component.specialtyDataModel.set({ cardiovascularRisk: 'LOW' });

    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

    component.onSubmit();

    expect(encounterServiceSpy.create).toHaveBeenCalled();
    const sentPayload: ClinicalEncounterRequest = encounterServiceSpy.create.mock.calls[0][0];
    expect(sentPayload.patientId).toBe(10492);
    expect(sentPayload.chiefComplaint).toBe('Consulta clínica por chequeo');
    expect(sentPayload.specialtyData).toEqual({ cardiovascularRisk: 'LOW' });
    expect(dispatchSpy).toHaveBeenCalled();
    expect(component.isOpen()).toBe(false);
  });

  it('should handle backend error on submit gracefully', () => {
    component.isOpen.set(true);
    component.encounterForm.patchValue({
      chiefComplaint: 'Consulta válida',
      primaryDiagnosisCode: 'Z00.0',
      primaryDiagnosisDescription: 'Examen médico general',
    });

    encounterServiceSpy.create.mockReturnValue(
      throwError(() => ({ error: { message: 'Falla al persistir en base de datos' } }))
    );

    component.onSubmit();

    expect(component.errorMessage()).toBe('Falla al persistir en base de datos');
    expect(component.isSubmitting()).toBe(false);
    expect(component.isOpen()).toBe(true);
  });

  it('should toggle progressive disclosure sections correctly', () => {
    expect(component.isHpiExpanded()).toBe(false);
    component.toggleHpi();
    expect(component.isHpiExpanded()).toBe(true);

    expect(component.isFullVitalsExpanded()).toBe(false);
    component.toggleFullVitals();
    expect(component.isFullVitalsExpanded()).toBe(true);

    expect(component.isSecondaryDiagExpanded()).toBe(false);
    component.toggleSecondaryDiag();
    expect(component.isSecondaryDiagExpanded()).toBe(true);

    expect(component.isPrescriptionsExpanded()).toBe(false);
    component.togglePrescriptions();
    expect(component.isPrescriptionsExpanded()).toBe(true);

    expect(component.isDiagnosticOrdersExpanded()).toBe(false);
    component.toggleDiagnosticOrders();
    expect(component.isDiagnosticOrdersExpanded()).toBe(true);
  });

  it('should submit successfully without primary diagnosis code (optional in ambulatory care)', () => {
    component.isOpen.set(true);
    component.encounterForm.patchValue({
      encounterDate: '2026-09-17',
      consultationType: 'FIRST_VISIT',
      chiefComplaint: 'Consulta ginecológica',
      primaryDiagnosisCode: '', // Empty code
      primaryDiagnosisDescription: 'Control ginecológico y citología',
      systolicBloodPressure: 115,
      diastolicBloodPressure: 75,
    });

    component.onSubmit();

    expect(encounterServiceSpy.create).toHaveBeenCalled();
    const sentPayload: ClinicalEncounterRequest = encounterServiceSpy.create.mock.calls[0][0];
    expect(sentPayload.primaryDiagnosisCode).toBeUndefined();
    expect(sentPayload.primaryDiagnosisDescription).toBe('Control ginecológico y citología');
    expect(sentPayload.vitalSigns?.systolicBloodPressure).toBe(115);
    expect(component.isOpen()).toBe(false);
  });
});
