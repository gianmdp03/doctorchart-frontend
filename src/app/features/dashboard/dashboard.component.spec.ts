import { clinicalFormFixture } from '../../core/models/clinical-form.fixture';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../../core/services/auth.service';
import { PatientService } from '../../core/services/patient.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { DoctorProfileService } from '../../core/services/doctor-profile.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { signal } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
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
  let workspaceStoreMock: any;

  beforeEach(async () => {
    authServiceMock = {
      currentUser: signal({ id: 'doctor-a' }),
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
        }),
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
      getDashboard: vi.fn().mockReturnValue(
        of({
          totalPatients: 2,
          asOfDate: '2026-10-05',
          encountersThisMonth: 12,
          encountersToday: 3,
          recentEncounters: [
            {
              patientAgeLabel: '2 años, 4 m',
              patientNationalId: '50123456',
              encounterLocalDate: '2026-09-24',
              encounter: {
                ...clinicalFormFixture(),
                specialtyId: 1,
                specialty: { id: 1, code: 'pediatrics', name: 'Pediatría', description: null },
                consultationType: 'FIRST_VISIT',
                id: 101,
                patientId: 1,
                patientFullName: 'Mateo Rossi',
                encounterDate: '2026-09-24T10:00:00Z',
                chiefComplaint: 'Control clínico',
                primaryDiagnosisDescription: 'Rinitis alérgica',
                primaryDiagnosisCode: 'J30.1',
              },
            },
          ],
        }),
      ),
      getByPatient: vi.fn().mockReturnValue(of([])),
    };

    workspaceStoreMock = {
      quickNotes: signal('Mis notas guardadas'),
      updateQuickNotes: vi.fn().mockResolvedValue(undefined),
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
        { provide: WorkspaceStore, useValue: workspaceStoreMock },
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
    expect(clinicalEncounterServiceMock.getDashboard).toHaveBeenCalled();
    expect(component.totalPatients()).toBe(2);
    expect(component.encountersMonthCount()).toBe(12);
    expect(component.encountersTodayCount()).toBe(3);
    expect(component.recentEncounters().length).toBe(1);
    expect(component.directoryPatients().length).toBe(2);
  });

  it('should hydrate quick notes from workspace store', () => {
    expect(component.quickNotes()).toBe('Mis notas guardadas');
    expect(component.isNotesDirty()).toBe(false);
  });

  it('should mark notes as dirty when typing and save to backend', async () => {
    component.onNotesInput('Nueva nota importante');
    expect(component.quickNotes()).toBe('Nueva nota importante');
    expect(component.isNotesDirty()).toBe(true);

    await component.saveNotes();
    expect(workspaceStoreMock.updateQuickNotes).toHaveBeenCalledWith('Nueva nota importante');
    expect(component.isNotesDirty()).toBe(false);
    expect(component.isNotesSaved()).toBe(true);
  });

  it('uses the complete server total independently of the directory page', () => {
    clinicalEncounterServiceMock.getDashboard.mockReturnValue(
      of({
        totalPatients: 230,
        asOfDate: '2026-10-05',
        encountersThisMonth: 0,
        encountersToday: 0,
        recentEncounters: [],
      }),
    );
    component.loadKpiData();
    expect(component.totalPatients()).toBe(230);
    expect(component.encountersMonthCount()).toBe(0);
    expect(component.encountersTodayCount()).toBe(0);
    expect(clinicalEncounterServiceMock.getByPatient).not.toHaveBeenCalled();
  });

  it('should reload KPIs when patient-created event is dispatched', () => {
    const kpiSpy = vi.spyOn(component, 'loadKpiData');
    const dirSpy = vi.spyOn(component, 'loadDirectory');

    window.dispatchEvent(
      new CustomEvent('patient-created', { detail: { id: 99, fullName: 'Nuevo Paciente' } }),
    );

    expect(kpiSpy).toHaveBeenCalled();
    expect(dirSpy).toHaveBeenCalledWith(0, '');
  });

  it('renders recent patient metadata and clinical highlights from the backend projection', () => {
    expect(component.recentEncounters()[0].patientName).toBe('Mateo Rossi');
    expect(component.recentEncounters()[0].patientMeta).toBe('2 años, 4 m • DNI 50123456');
    expect(component.recentEncounters()[0].encounterDateOnly).toBe('24/09/2026');
    expect(component.recentEncounters()[0].isToday).toBe(false);
    expect(clinicalEncounterServiceMock.getByPatient).not.toHaveBeenCalled();
  });
  it('shows an error without turning failed statistics into zero activity', () => {
    clinicalEncounterServiceMock.getDashboard.mockReturnValue(throwError(() => ({ status: 500 })));
    component.loadKpiData();
    expect(component.metricsError()).toContain('No se pudo');
    expect(component.totalPatients()).toBeNull();
    expect(component.encountersTodayCount()).toBeNull();
    expect(component.recentEncounters()).toEqual([]);
  });
  it('cancels earlier reads and ignores replies after an account switch before effects run', () => {
    const old = new Subject<any>(),
      latest = new Subject<any>();
    clinicalEncounterServiceMock.getDashboard.mockReturnValueOnce(old).mockReturnValueOnce(latest);
    component.loadKpiData();
    component.loadKpiData();
    expect(old.observed).toBe(false);
    authServiceMock.currentUser.set({ id: 'doctor-b' });
    latest.next({
      totalPatients: 999,
      encountersToday: 999,
      encountersThisMonth: 999,
      recentEncounters: [],
    });
    expect(component.totalPatients()).toBeNull();
    fixture.detectChanges();
    expect(latest.observed).toBe(false);
  });
  it('cancels a directory search when a new one starts and keeps its latest page', () => {
    const pending = new Subject<any>();
    patientServiceMock.getPatients.mockReturnValueOnce(pending);
    component.loadDirectory(0, 'older');
    component.loadDirectory(0, 'newer');
    expect(pending.observed).toBe(false);
    pending.next({ content: [], totalPages: 99 });
    expect(component.directoryPatients()).toHaveLength(2);
  });

  it('cancels pending account directory requests on destruction', () => {
    const pending = new Subject<any>();
    patientServiceMock.getPatients.mockReturnValue(pending);
    component.loadDirectory(0);
    expect(pending.observed).toBe(true);
    fixture.destroy();
    expect(pending.observed).toBe(false);
  });

  it('debounces rapid directory search input and triggers search with enter key', () => {
    vi.useFakeTimers();
    const initialCalls = patientServiceMock.getPatients.mock.calls.length;

    component.onDirectorySearchInput({ target: { value: 'Ro' } } as any);
    vi.advanceTimersByTime(100);
    component.onDirectorySearchInput({ target: { value: 'Rossi' } } as any);

    expect(patientServiceMock.getPatients).toHaveBeenCalledTimes(initialCalls);

    vi.advanceTimersByTime(400);
    expect(patientServiceMock.getPatients).toHaveBeenCalledTimes(initialCalls + 1);
    expect(patientServiceMock.getPatients).toHaveBeenLastCalledWith(
      0,
      6,
      'fullName,asc',
      'Rossi',
    );

    // Enter key triggers immediate search
    component.onDirectorySearchInput({ target: { value: 'Fernandez' } } as any);
    component.onDirectorySearchEnter();
    expect(patientServiceMock.getPatients).toHaveBeenCalledTimes(initialCalls + 2);
    expect(patientServiceMock.getPatients).toHaveBeenLastCalledWith(
      0,
      6,
      'fullName,asc',
      'Fernandez',
    );

    vi.useRealTimers();
  });
});
