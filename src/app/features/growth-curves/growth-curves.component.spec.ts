import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GrowthCurvesComponent } from './growth-curves.component';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { PatientService } from '../../core/services/patient.service';
import { CheckupService } from '../../core/services/checkup.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { of, throwError } from 'rxjs';
import { PatientDetailDTO } from '../../core/models/patient.model';
import { MedicalCheckupDetailDTO } from '../../core/models/checkup.model';

describe('GrowthCurvesComponent', () => {
  let component: GrowthCurvesComponent;
  let fixture: ComponentFixture<GrowthCurvesComponent>;
  let checkupServiceSpy: { getCheckupsByPatientId: ReturnType<typeof vi.fn> };
  let clinicalEncounterServiceSpy: { getByPatient: ReturnType<typeof vi.fn> };
  let patientServiceSpy: { getPatientById: ReturnType<typeof vi.fn> };
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
      id: 142,
      patientId: 10492,
      patientFullName: 'Mateo Rossi',
      checkupDate: '2026-04-16',
      reason: 'ROUTINE',
      measurements: { weight: 4.15, height: 53.5, headCircumference: 37.2 },
    },
    {
      id: 209,
      patientId: 10492,
      patientFullName: 'Mateo Rossi',
      checkupDate: '2026-05-18',
      reason: 'ROUTINE',
      measurements: { weight: 5.2, height: 57.0, headCircumference: 39.1 },
    },
    {
      id: 284,
      patientId: 10492,
      patientFullName: 'Mateo Rossi',
      checkupDate: '2026-07-16',
      reason: 'ROUTINE',
      measurements: { weight: 6.7, height: 63.0, headCircumference: 41.5 },
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

  beforeEach(async () => {
    checkupServiceSpy = {
      getCheckupsByPatientId: vi.fn().mockReturnValue(of(mockCheckupList)),
    };
    clinicalEncounterServiceSpy = {
      getByPatient: vi.fn().mockReturnValue(of([])),
    };
    patientServiceSpy = {
      getPatientById: vi.fn().mockReturnValue(of(mockPatient)),
    };
    routerSpy = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [GrowthCurvesComponent],
      providers: [
        ActivePatientService,
        { provide: PatientService, useValue: patientServiceSpy },
        { provide: CheckupService, useValue: checkupServiceSpy },
        { provide: ClinicalEncounterService, useValue: clinicalEncounterServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    activePatientService = TestBed.inject(ActivePatientService);
    activePatientService.setActivePatient(mockPatient);

    fixture = TestBed.createComponent(GrowthCurvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Active patient handling & Empty State', () => {
    it('should render growth curves card when activePatient is set', () => {
      const card = fixture.nativeElement.querySelector('.m3-card.elevated');
      expect(card).toBeTruthy();
      expect(fixture.nativeElement.textContent).toContain('Curvas de Crecimiento OMS Pediátrico');
      expect(fixture.nativeElement.textContent).toContain('Mateo Rossi');
    });

    it('should display empty state when activePatient is null', () => {
      activePatientService.setActivePatient(null);
      fixture.detectChanges();

      const emptyCard = fixture.nativeElement.querySelector('.empty-state-card');
      expect(emptyCard).toBeTruthy();
      expect(fixture.nativeElement.textContent).toContain('No hay paciente activo seleccionado');
    });

    it('should navigate to /pacientes when navigateToPatients is called', () => {
      component.navigateToPatients();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/pacientes']);
    });
  });

  describe('Metric Switching', () => {
    it('should default to "weight" metric', () => {
      expect(component.activeMetric()).toBe('weight');
      expect(component.patientDiagnosisBadge()).toBe('Diagnóstico: Eutrófico (P50)');
    });

    it('should switch to "height" metric and update diagnosis, interpretation, and aria label', () => {
      component.setActiveMetric('height');
      expect(component.activeMetric()).toBe('height');
      expect(component.patientDiagnosisBadge()).toBe('Diagnóstico: Talla Adecuada (P50)');
      expect(component.clinicalInterpretationText()).toContain('El crecimiento longitudinal de Mateo Rossi');
      expect(component.chartAriaLabel()).toContain('Gráfica de percentiles de talla OMS');
    });

    it('should switch to "head" metric and update diagnosis, interpretation, and aria label', () => {
      component.setActiveMetric('head');
      expect(component.activeMetric()).toBe('head');
      expect(component.patientDiagnosisBadge()).toBe('Diagnóstico: Normocéfalo (P50)');
      expect(component.clinicalInterpretationText()).toContain('El perímetro cefálico de Mateo Rossi');
      expect(component.chartAriaLabel()).toContain('Gráfica de percentiles de perímetro cefálico OMS');
    });
  });

  describe('Checkups Loading & Fallback', () => {
    it('should load checkups from CheckupService on initialization', () => {
      expect(checkupServiceSpy.getCheckupsByPatientId).toHaveBeenCalledWith(10492);
      expect(component.checkups().length).toBe(5);
    });

    it('should set empty checkup data when service returns empty list', () => {
      checkupServiceSpy.getCheckupsByPatientId.mockReturnValue(of([]));
      component.loadCheckups(10492);
      expect(component.checkups()).toEqual([]);
    });

    it('should set empty checkup data when service throws error', () => {
      checkupServiceSpy.getCheckupsByPatientId.mockReturnValue(throwError(() => new Error('Server error')));
      component.loadCheckups(10492);
      expect(component.checkups()).toEqual([]);
    });

    it('should reload checkups on window:checkup-created event', () => {
      const loadSpy = vi.spyOn(component, 'loadCheckups');
      window.dispatchEvent(new CustomEvent('checkup-created'));
      expect(loadSpy).toHaveBeenCalledWith(10492);
    });
  });

  describe('Dynamic SVG Coordinate Math & Point Trajectory', () => {
    it('should calculate SVG points for weight correctly', () => {
      component.setActiveMetric('weight');
      const points = component.patientPoints();
      expect(points.length).toBe(5);

      // Birth point (0m, 3.35 kg): cx = 70, cy = 360 - (3.35 - 2) * 20 = 333
      expect(points[0].cx).toBe(70);
      expect(points[0].cy).toBe(333);
      expect(points[0].isLatest).toBe(false);

      // Latest point (6m, 7.95 kg): cx = 250, cy = 360 - (7.95 - 2) * 20 = 241
      expect(points[4].cx).toBe(250);
      expect(points[4].cy).toBe(241);
      expect(points[4].isLatest).toBe(true);
    });

    it('should calculate SVG points for height correctly', () => {
      component.setActiveMetric('height');
      const points = component.patientPoints();
      expect(points.length).toBe(5);

      // Birth point (0m, 50.0 cm): cx = 70, cy = 360 - (50 - 45) * 7.5 = 322.5
      expect(points[0].cx).toBe(70);
      expect(points[0].cy).toBeCloseTo(322.5, 1);

      // Latest point (6m, 67.5 cm): cx = 250, cy = 360 - (67.5 - 45) * 7.5 = 191.25
      expect(points[4].cx).toBe(250);
      expect(points[4].cy).toBeCloseTo(191.25, 1);
    });

    it('should calculate SVG points for head circumference correctly', () => {
      component.setActiveMetric('head');
      const points = component.patientPoints();
      expect(points.length).toBe(5);

      // Birth point (0m, 35.0 cm): cx = 70, cy = 360 - (35 - 32) * 15 = 315
      expect(points[0].cx).toBe(70);
      expect(points[0].cy).toBe(315);

      // Latest point (6m, 43.8 cm): cx = 250, cy = 360 - (43.8 - 32) * 15 = 183
      expect(points[4].cx).toBe(250);
      expect(points[4].cy).toBeCloseTo(183, 1);
    });

    it('should generate valid SVG path string for patientCurvePath', () => {
      const path = component.patientCurvePath();
      expect(path).toMatch(/^M 70\.0,333\.0 L/);
      expect(path).toContain('250.0,241.0');
    });

    it('should render double pulsing rings and hover tooltip for latest point in template', () => {
      fixture.detectChanges();
      const pulseRing = fixture.nativeElement.querySelector('.pulse-ring');
      const pulseRingOuter = fixture.nativeElement.querySelector('.pulse-ring-outer');
      expect(pulseRing).toBeTruthy();
      expect(pulseRingOuter).toBeTruthy();

      const hoyText = fixture.nativeElement.querySelector('.svg-today-text');
      expect(hoyText).toBeTruthy();
      expect(hoyText.textContent).toMatch(/\d+m \(Hoy\)/);
    });

    it('should render all 5 WHO percentile lines', () => {
      fixture.detectChanges();
      const p97 = fixture.nativeElement.querySelector('.percentile-line.p97');
      const p85 = fixture.nativeElement.querySelector('.percentile-line.p85');
      const p50 = fixture.nativeElement.querySelector('.percentile-line.p50');
      const p15 = fixture.nativeElement.querySelector('.percentile-line.p15');
      const p3 = fixture.nativeElement.querySelector('.percentile-line.p3');

      expect(p97).toBeTruthy();
      expect(p85).toBeTruthy();
      expect(p50).toBeTruthy();
      expect(p15).toBeTruthy();
      expect(p3).toBeTruthy();
    });

    it('should include measurements from both checkups and clinical encounters in unifiedMeasurements', () => {
      component.encounters.set([
        {
          id: 55,
          encounterNumber: 'EV-00055',
          encounterDate: '2026-08-10',
          reasonForConsultation: 'Fiebre y tos',
          diagnosis: 'Bronquiolitis leve',
          specialty: 'PEDIATRICS',
          vitalSigns: {
            weightKg: 7.2,
            heightCm: 65.0,
            bodyMassIndex: 17.0,
          },
        } as any,
      ]);
      fixture.detectChanges();

      const unified = component.unifiedMeasurements();
      expect(unified.some((m) => m.source === 'SOAP' && m.weightKg === 7.2)).toBe(true);
      expect(unified.some((m) => m.source === 'CHECKUP' && m.weightKg === 7.95)).toBe(true);
    });
  });
});
