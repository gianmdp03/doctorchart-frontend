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
import { of, Subject } from 'rxjs';
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
      getDashboard: vi.fn().mockReturnValue(
        of({
          encountersThisMonth: 12,
          encountersToday: 3,
          recentEncounters: [
            {
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
          ],
        })
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

  it('should aggregate per-patient consultations into recentEncounters and encountersTodayCount even when getDashboard returns 0', () => {
    const nowIso = new Date().toISOString();
    clinicalEncounterServiceMock.getDashboard.mockReturnValue(
      of({
        encountersThisMonth: 0,
        encountersToday: 0,
        recentEncounters: [],
      })
    );
    clinicalEncounterServiceMock.getByPatient.mockImplementation((patientId: number) => {
      if (patientId === 1) {
        return of([
          {
            id: 501,
            patientId: 1,
            encounterDate: nowIso,
            consultationType: 'FIRST_VISIT',
            chiefComplaint: 'Control inicial',
            primaryDiagnosisDescription: 'Paciente sano',
            ...clinicalFormFixture(),
            formValues: {abc: 'Control inicial', def: 12.4},
            formDefinitionSnapshot: {categories:[{key:'xyz',title:'Detalle',enabled:true,fields:[{key:'abc',label:'Motivo Principal',type:'TEXT',required:false},{key:'def',label:'Peso (kg)',type:'NUMBER',required:false}]}]},
          },
          {
            id: 502,
            patientId: 1,
            encounterDate: nowIso,
            consultationType: 'FOLLOW_UP',
            chiefComplaint: 'Seguimiento evolutivo',
            primaryDiagnosisDescription: 'Evolución favorable',
            ...clinicalFormFixture(),
            formValues: {abc: 'Seguimiento evolutivo'},
            formDefinitionSnapshot: {categories:[{key:'xyz',title:'Detalle',enabled:true,fields:[{key:'abc',label:'Motivo Principal',type:'TEXT',required:false}]}]},
          },
        ]);
      }
      return of([]);
    });

    component.loadKpiData();

    expect(component.encountersTodayCount()).toBe(2);
    expect(component.encountersMonthCount()).toBe(2);
    expect(component.recentEncounters().length).toBe(2);
    expect(component.recentEncounters()[0].patientName).toBe('Mateo Rossi');
    expect(component.recentEncounters()[0].isToday).toBe(true);
    expect(component.recentEncounters()[0].patientMeta).toContain('DNI 50123456');
    expect(component.recentEncounters()[0].clinicalHighlights.length).toBeGreaterThan(0);
  });

  it('cancels pending account directory requests on destruction', () => {
    const pending=new Subject<any>(); patientServiceMock.getPatients.mockReturnValue(pending);
    component.loadDirectory(0); expect(pending.observed).toBe(true); fixture.destroy(); expect(pending.observed).toBe(false);
  });

});

