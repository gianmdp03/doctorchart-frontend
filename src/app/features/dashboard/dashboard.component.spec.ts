import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../../core/services/auth.service';
import { PatientService } from '../../core/services/patient.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { DoctorProfileService } from '../../core/services/doctor-profile.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let authServiceMock: any;
  let patientServiceMock: any;
  let activePatientServiceMock: any;
  let specialtyServiceMock: any;
  let profileServiceMock: any;
  let clinicalEncounterServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      isLoggedIn: signal(true),
      userName: signal('Dra. Sofía Mendoza'),
      userEmail: signal('sofia@doctorchart.com'),
      hasDoctorchartPlan: signal(true),
    };

    patientServiceMock = {
      getPatients: vi.fn().mockReturnValue(
        of({
          content: [
            { id: 1, fullName: 'Mateo Rossi', birthDate: '2024-05-10', nationalId: '50123456' },
            { id: 2, fullName: 'Lucía Fernández', birthDate: '2020-08-15', nationalId: '48999111' },
          ],
          totalElements: 2,
          totalPages: 1,
          size: 6,
          number: 0,
        })
      ),
    };

    activePatientServiceMock = {
      patientId: signal(1),
      loadPatient: vi.fn(),
    };

    specialtyServiceMock = {
      activeSpecialty: signal('PEDIATRICS'),
      isPediatricMode: signal(true),
      currentSpecialtyOption: signal({
        value: 'PEDIATRICS',
        label: 'Pediatría y Neonatología',
        shortLabel: 'Pediatría',
        icon: 'baby',
      }),
    };

    profileServiceMock = {
      profile: signal({ specialty: 'PEDIATRICS' }),
      hasSpecialty: signal(true),
    };

    clinicalEncounterServiceMock = {
      getByPatient: vi.fn().mockReturnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
        { provide: PatientService, useValue: patientServiceMock },
        { provide: ActivePatientService, useValue: activePatientServiceMock },
        { provide: DoctorSpecialtyService, useValue: specialtyServiceMock },
        { provide: DoctorProfileService, useValue: profileServiceMock },
        { provide: ClinicalEncounterService, useValue: clinicalEncounterServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should compute greeting message with doctor name', () => {
    expect(component.greeting()).toContain('Dra. Sofía Mendoza');
  });

  it('should load KPIs and directory on init', () => {
    expect(patientServiceMock.getPatients).toHaveBeenCalled();
    expect(component.totalPatients()).toBe(2);
    expect(component.directoryPatients().length).toBe(2);
  });

  it('should calculate BMI and category when inputs are provided', () => {
    component.calcWeight.set(70);
    component.calcHeight.set(175);
    fixture.detectChanges();

    const bmi = component.calculatedBmi();
    expect(bmi).toBeTruthy();
    expect(bmi?.value).toBe('22.9');
    expect(bmi?.label).toBe('Normopeso');
  });

  it('should classify blood pressure correctly', () => {
    component.calcSystolic.set(120);
    component.calcDiastolic.set(80);
    fixture.detectChanges();

    const bp = component.bpClassification();
    expect(bp).toBeTruthy();
    expect(bp?.label).toContain('HTA Grado 1');
  });

  it('should calculate obstetric gestational age based on LMP', () => {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 15);
    const year = twoWeeksAgo.getFullYear();
    const month = String(twoWeeksAgo.getMonth() + 1).padStart(2, '0');
    const day = String(twoWeeksAgo.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    component.calcLmpDate.set(dateStr);
    fixture.detectChanges();

    const obs = component.obstetricCalc();
    expect(obs).toBeTruthy();
    expect(obs?.gestationalWeeks).toBeGreaterThanOrEqual(2);
  });

  it('should save quick notes to localStorage', () => {
    component.onNotesInput('Recordar pedir laboratorio de control a Mateo');
    expect(component.quickNotes()).toBe('Recordar pedir laboratorio de control a Mateo');
  });

  it('should not render the "Controles < 2 Años" KPI card in the DOM', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.specialty-kpi')).toBeNull();
    expect(compiled.textContent).not.toContain('Controles < 2 Años');
  });

  it('should resolve totalPatients correctly when backend returns nested pageable structure', () => {
    patientServiceMock.getPatients.mockReturnValue(
      of({
        content: [
          { id: 1, fullName: 'Mateo Rossi' },
          { id: 2, fullName: 'Lucía Fernández' },
          { id: 3, fullName: 'Carlos Gómez' },
        ],
        page: {
          totalElements: 3,
          totalPages: 1,
          size: 10,
          number: 0,
        },
      } as any)
    );

    component.loadKpiData();
    expect(component.totalPatients()).toBe(3);
  });

  it('should reload KPIs when patient-created event is dispatched', () => {
    const kpiSpy = vi.spyOn(component, 'loadKpiData');
    const dirSpy = vi.spyOn(component, 'loadDirectory');

    window.dispatchEvent(new CustomEvent('patient-created', { detail: { id: 99, fullName: 'Nuevo Paciente' } }));

    expect(kpiSpy).toHaveBeenCalled();
    expect(dirSpy).toHaveBeenCalledWith(0, '');
  });
});
