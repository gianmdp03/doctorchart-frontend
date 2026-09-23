import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { of, throwError } from 'rxjs';
import { EncounterDetailDialogComponent } from './encounter-detail-dialog.component';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { ClinicalEncounterDetail } from '../../core/models/clinical-encounter.model';

describe('EncounterDetailDialogComponent', () => {
  let component: EncounterDetailDialogComponent;
  let fixture: ComponentFixture<EncounterDetailDialogComponent>;
  let encounterServiceSpy: {
    getById: ReturnType<typeof vi.fn>;
  };

  const mockEncounter: ClinicalEncounterDetail = {
    id: 101,
    patientId: 10492,
    patientFullName: 'Mateo Rossi',
    encounterDate: '2026-09-15',
    specialty: 'PEDIATRICS',
    consultationType: 'ROUTINE_CHECKUP',
    chiefComplaint: 'Control de niño sano',
    historyOfPresentIllness: 'Paciente asintomático, buen apetito y descanso.',
    vitalSigns: {
      weightKg: 7.95,
      heightCm: 67.5,
      bodyMassIndex: 17.45,
      heartRate: 110,
      respiratoryRate: 28,
      temperatureCelsius: 36.6,
      oxygenSaturationPercent: 99,
    },
    physicalExamination: 'Buen estado general, fontanela anterior normotensa.',
    primaryDiagnosisCode: 'Z00.1',
    primaryDiagnosisDescription: 'Control de salud infantil y crecimiento',
    secondaryDiagnoses: [
      { code: 'L20.9', description: 'Dermatitis atópica leve', isChronic: false },
    ],
    treatmentPlan: 'Continuar con lactancia materna y vitamina D3.',
    prescriptions: [
      {
        medicationName: 'Vitamina D3',
        dosage: '400 UI',
        administrationRoute: 'Oral',
        frequency: 'Cada 24 hs',
      },
    ],
    diagnosticOrders: ['Pesquisa metabólica neonatal confirmada'],
    followUpInstructions: 'Control en 1 mes.',
    followUpDate: '2026-10-15',
  };

  beforeEach(async () => {
    encounterServiceSpy = {
      getById: vi.fn().mockReturnValue(of(mockEncounter)),
    };

    await TestBed.configureTestingModule({
      imports: [EncounterDetailDialogComponent],
      providers: [
        { provide: ClinicalEncounterService, useValue: encounterServiceSpy },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EncounterDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component with initial closed state', () => {
    expect(component).toBeTruthy();
    expect(component.isOpen()).toBe(false);
    expect(component.encounter()).toBeNull();
  });

  it('should open and display encounter passed directly in event detail', () => {
    window.dispatchEvent(
      new CustomEvent('open-encounter-detail-modal', {
        detail: { encounter: mockEncounter },
      })
    );
    fixture.detectChanges();

    expect(component.isOpen()).toBe(true);
    expect(component.encounter()).toEqual(mockEncounter);
  });

  it('should open and fetch encounter by id from service if only id is passed', () => {
    window.dispatchEvent(
      new CustomEvent('open-encounter-detail-modal', {
        detail: { encounterId: 101 },
      })
    );
    fixture.detectChanges();

    expect(component.isOpen()).toBe(true);
    expect(encounterServiceSpy.getById).toHaveBeenCalledWith(101);
    expect(component.encounter()).toEqual(mockEncounter);
  });

  it('should handle service error when loading by id', () => {
    encounterServiceSpy.getById.mockReturnValue(
      throwError(() => ({ error: { message: 'Encounter not found' } }))
    );

    component.loadEncounter(999);

    expect(component.isLoading()).toBe(false);
    expect(component.errorMessage()).toBe('Encounter not found');
  });

  it('should close modal on escape key or backdrop click', () => {
    component.isOpen.set(true);
    component.encounter.set(mockEncounter);

    component.onEscape();
    expect(component.isOpen()).toBe(false);
    expect(component.encounter()).toBeNull();

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

  it('should return correct specialty badge CSS class', () => {
    expect(component.getSpecialtyBadgeClass('PEDIATRICS')).toBe('badge-pediatrics');
    expect(component.getSpecialtyBadgeClass('CARDIOLOGY')).toBe('badge-cardiology');
    expect(component.getSpecialtyBadgeClass('GENERAL_MEDICINE')).toBe('badge-general');
  });

  it('should return correct consultation type labels', () => {
    expect(component.getConsultationTypeLabel('FIRST_VISIT')).toBe('Primera Consulta');
    expect(component.getConsultationTypeLabel('ROUTINE_CHECKUP')).toBe('Chequeo General');
    expect(component.getConsultationTypeLabel('EMERGENCY')).toBe('Urgencia');
  });

  it('should classify BMI status correctly', () => {
    expect(component.getBmiStatus(null).label).toBe('Sin datos de IMC');
    expect(component.getBmiStatus(16.5).label).toContain('Bajo peso');
    expect(component.getBmiStatus(22.0).label).toContain('Peso Normal');
    expect(component.getBmiStatus(27.5).label).toBe('Sobrepeso');
    expect(component.getBmiStatus(32.0).label).toBe('Obesidad');
  });

  it('should call print safely', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});
    component.printEncounter();
    expect(printSpy).toHaveBeenCalled();
  });
});
