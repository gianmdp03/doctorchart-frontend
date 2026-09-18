import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MilestonesComponent, MilestoneStage } from './milestones.component';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { PatientService } from '../../core/services/patient.service';
import { PatientDetailDTO } from '../../core/models/patient.model';

describe('MilestonesComponent', () => {
  let component: MilestonesComponent;
  let fixture: ComponentFixture<MilestonesComponent>;
  let activePatientService: ActivePatientService;
  let routerSpy: { navigate: ReturnType<typeof vi.fn> };
  let patientServiceSpy: { getPatientById: ReturnType<typeof vi.fn> };

  function getDateMonthsAgo(months: number): string {
    const now = new Date();
    const target = new Date(now.getFullYear(), now.getMonth() - months, 15);
    const y = target.getFullYear();
    const m = String(target.getMonth() + 1).padStart(2, '0');
    const d = String(target.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  const createPatient = (birthDate: string, fullName = 'Paciente Test'): PatientDetailDTO => ({
    id: 999,
    fullName,
    birthDate,
  });

  beforeEach(async () => {
    routerSpy = {
      navigate: vi.fn(),
    };
    patientServiceSpy = {
      getPatientById: vi.fn().mockReturnValue(of(null)),
    };

    await TestBed.configureTestingModule({
      imports: [MilestonesComponent],
      providers: [
        ActivePatientService,
        { provide: PatientService, useValue: patientServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    activePatientService = TestBed.inject(ActivePatientService);
    activePatientService.setActivePatient(null);

    fixture = TestBed.createComponent(MilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the milestones component', () => {
    expect(component).toBeTruthy();
  });

  describe('Default state (no active patient)', () => {
    it('should default to stage 4-6', () => {
      expect(component.selectedStage()).toBe('4-6');
      expect(component.patientAgeInMonths()).toBeNull();
      expect(component.patientStage()).toBeNull();
    });

    it('should display standard labels for all 5 stages without patient range tag', () => {
      const stages = component.stages();
      expect(stages.length).toBe(5);
      expect(stages.map((s) => s.label)).toEqual([
        '0 a 3 Meses',
        '4 a 6 Meses',
        '7 a 9 Meses',
        '10 a 12 Meses',
        '1 a 2 Años',
      ]);
      expect(stages.every((s) => !s.isPatientStage)).toBe(true);
    });

    it('should render the title and subtitle in the header', () => {
      const headerEl = fixture.nativeElement.querySelector('.milestone-header');
      expect(headerEl).toBeTruthy();
      expect(headerEl.textContent).toContain('Ayuda Memoria Pediátrica: Hitos Madurativos y Pautas de Alarma');
      expect(headerEl.textContent).toContain('Guía clínica rápida de pesquisa psicomotora');
    });

    it('should render 5 buttons in the segmented age bar', () => {
      const buttons = fixture.nativeElement.querySelectorAll('.milestone-age-bar button');
      expect(buttons.length).toBe(5);
      expect(buttons[1].classList.contains('active')).toBe(true);
    });
  });

  describe('Stage detection based on age in months and auto-selection', () => {
    it('should detect stage 0-3 for a 2-month-old and auto-select it', () => {
      const p = createPatient(getDateMonthsAgo(2));
      activePatientService.setActivePatient(p);
      fixture.detectChanges();

      expect(component.patientAgeInMonths()).toBe(2);
      expect(component.patientStage()).toBe('0-3');
      expect(component.selectedStage()).toBe('0-3');

      const stage03 = component.stages().find((s) => s.id === '0-3');
      expect(stage03?.label).toBe('0 a 3 Meses (Rango del Paciente)');
      expect(stage03?.isPatientStage).toBe(true);
    });

    it('should detect stage 4-6 for a 5-month-old and tag it', () => {
      const p = createPatient(getDateMonthsAgo(5));
      activePatientService.setActivePatient(p);
      fixture.detectChanges();

      expect(component.patientAgeInMonths()).toBe(5);
      expect(component.patientStage()).toBe('4-6');
      expect(component.selectedStage()).toBe('4-6');

      const stage46 = component.stages().find((s) => s.id === '4-6');
      expect(stage46?.label).toBe('4 a 6 Meses (Rango del Paciente)');
      expect(stage46?.isPatientStage).toBe(true);
    });

    it('should detect stage 7-9 for an 8-month-old and auto-select it', () => {
      const p = createPatient(getDateMonthsAgo(8));
      activePatientService.setActivePatient(p);
      fixture.detectChanges();

      expect(component.patientAgeInMonths()).toBe(8);
      expect(component.patientStage()).toBe('7-9');
      expect(component.selectedStage()).toBe('7-9');

      const stage79 = component.stages().find((s) => s.id === '7-9');
      expect(stage79?.label).toBe('7 a 9 Meses (Rango del Paciente)');
    });

    it('should detect stage 10-12 for an 11-month-old and auto-select it', () => {
      const p = createPatient(getDateMonthsAgo(11));
      activePatientService.setActivePatient(p);
      fixture.detectChanges();

      expect(component.patientAgeInMonths()).toBe(11);
      expect(component.patientStage()).toBe('10-12');
      expect(component.selectedStage()).toBe('10-12');

      const stage1012 = component.stages().find((s) => s.id === '10-12');
      expect(stage1012?.label).toBe('10 a 12 Meses (Rango del Paciente)');
    });

    it('should detect stage 12-24 for an 18-month-old and auto-select it', () => {
      const p = createPatient(getDateMonthsAgo(18));
      activePatientService.setActivePatient(p);
      fixture.detectChanges();

      expect(component.patientAgeInMonths()).toBe(18);
      expect(component.patientStage()).toBe('12-24');
      expect(component.selectedStage()).toBe('12-24');

      const stage1224 = component.stages().find((s) => s.id === '12-24');
      expect(stage1224?.label).toBe('1 a 2 Años (Rango del Paciente)');
    });

    it('should return null stage if patient is older than 24 months', () => {
      const p = createPatient(getDateMonthsAgo(36));
      activePatientService.setActivePatient(p);
      fixture.detectChanges();

      expect(component.patientAgeInMonths()).toBe(36);
      expect(component.patientStage()).toBeNull();
      expect(component.stages().every((s) => !s.isPatientStage)).toBe(true);
    });

    it('should handle invalid or empty birth dates gracefully', () => {
      activePatientService.setActivePatient(createPatient('invalid-date'));
      fixture.detectChanges();
      expect(component.patientAgeInMonths()).toBeNull();
      expect(component.patientStage()).toBeNull();

      activePatientService.setActivePatient(createPatient(''));
      fixture.detectChanges();
      expect(component.patientAgeInMonths()).toBeNull();
      expect(component.patientStage()).toBeNull();
    });
  });

  describe('Manual stage switching', () => {
    it('should allow user to manually switch stage via selectStage', () => {
      component.selectStage('10-12');
      expect(component.selectedStage()).toBe('10-12');

      fixture.detectChanges();
      const activeBtn = fixture.nativeElement.querySelector('.milestone-age-bar button.active');
      expect(activeBtn.textContent).toContain('10 a 12 Meses');
    });

    it('should switch stage when button is clicked in the DOM', () => {
      const buttons = fixture.nativeElement.querySelectorAll('.milestone-age-bar button');
      buttons[0].click(); // 0 a 3 Meses
      fixture.detectChanges();

      expect(component.selectedStage()).toBe('0-3');
      const panel = fixture.nativeElement.querySelector('#stage-0-3');
      expect(panel).toBeTruthy();
    });
  });

  describe('Stage panel and card rendering', () => {
    it('should render stage 0-3 with 4 cards including alarm card', () => {
      component.selectStage('0-3');
      fixture.detectChanges();

      const panel = fixture.nativeElement.querySelector('#stage-0-3');
      expect(panel).toBeTruthy();

      const cards = panel.querySelectorAll('.milestone-card');
      expect(cards.length).toBe(4);

      const alarmCard = panel.querySelector('.alarm-card');
      expect(alarmCard).toBeTruthy();
      expect(alarmCard.textContent).toContain('Banderas Rojas (0 a 3 Meses)');
      expect(alarmCard.textContent).toContain('Fiebre > 38°C');
    });

    it('should render stage 4-6 with 5 cards including nutrition and alarm cards', () => {
      component.selectStage('4-6');
      fixture.detectChanges();

      const panel = fixture.nativeElement.querySelector('#stage-4-6');
      expect(panel).toBeTruthy();

      const cards = panel.querySelectorAll('.milestone-card');
      expect(cards.length).toBe(5);

      const nutritionCard = panel.querySelector('.nutrition-card');
      expect(nutritionCard).toBeTruthy();
      expect(nutritionCard.textContent).toContain('4. Pautas Nutricionales (Inicio de AC)');
      expect(nutritionCard.textContent).toContain('Texturas pisadas con tenedor');

      const alarmCard = panel.querySelector('.alarm-card');
      expect(alarmCard).toBeTruthy();
      expect(alarmCard.textContent).toContain('5. Banderas Rojas y Pautas de Alarma');
      expect(alarmCard.textContent).toContain('Ausencia de sostén cefálico firme');
    });

    it('should render stage 7-9 with 3 cards including alarm card', () => {
      component.selectStage('7-9');
      fixture.detectChanges();

      const panel = fixture.nativeElement.querySelector('#stage-7-9');
      expect(panel).toBeTruthy();

      const cards = panel.querySelectorAll('.milestone-card');
      expect(cards.length).toBe(3);

      const alarmCard = panel.querySelector('.alarm-card');
      expect(alarmCard).toBeTruthy();
      expect(alarmCard.textContent).toContain('Banderas Rojas (7 a 9 Meses)');
      expect(alarmCard.textContent).toContain('Incapacidad para sentarse con apoyo');
    });

    it('should render stage 10-12 with 2 cards including alarm card', () => {
      component.selectStage('10-12');
      fixture.detectChanges();

      const panel = fixture.nativeElement.querySelector('#stage-10-12');
      expect(panel).toBeTruthy();

      const cards = panel.querySelectorAll('.milestone-card');
      expect(cards.length).toBe(2);

      const alarmCard = panel.querySelector('.alarm-card');
      expect(alarmCard).toBeTruthy();
      expect(alarmCard.textContent).toContain('Banderas Rojas (10 a 12 Meses)');
      expect(alarmCard.textContent).toContain('No soporta su peso sobre las piernas');
    });

    it('should render stage 12-24 with 2 cards including alarm card', () => {
      component.selectStage('12-24');
      fixture.detectChanges();

      const panel = fixture.nativeElement.querySelector('#stage-12-24');
      expect(panel).toBeTruthy();

      const cards = panel.querySelectorAll('.milestone-card');
      expect(cards.length).toBe(2);

      const alarmCard = panel.querySelector('.alarm-card');
      expect(alarmCard).toBeTruthy();
      expect(alarmCard.textContent).toContain('Banderas Rojas (1 a 2 Años)');
      expect(alarmCard.textContent).toContain('No camina a los 18 meses cumplidos');
    });
  });

  describe('Patient context bar and router navigation', () => {
    it('should show patient context bar and navigate to ficha when clicked', () => {
      const p = createPatient(getDateMonthsAgo(6), 'Mateo Rossi');
      activePatientService.setActivePatient(p);
      fixture.detectChanges();

      const contextBar = fixture.nativeElement.querySelector('.patient-context-bar');
      expect(contextBar).toBeTruthy();
      expect(contextBar.textContent).toContain('Mateo Rossi');

      const fichaBtn = contextBar.querySelector('.btn-ficha-link');
      expect(fichaBtn).toBeTruthy();
      fichaBtn.click();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/ficha']);
    });

    it('should navigate via goToPatientRecord directly', () => {
      component.goToPatientRecord();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/ficha']);
    });
  });
});
