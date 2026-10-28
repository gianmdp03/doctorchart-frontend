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
import { UserClockService } from '../../core/services/user-clock.service';

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
          upcomingFollowUps: [],
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
      getAll: vi.fn().mockReturnValue(of({ content: [], page: { totalElements: 0, totalPages: 0 } })),
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

  it('groups all upcoming patients by the server calendar day and links to their records', () => {
    const activity = {
      totalPatients: 30, asOfDate: '2026-12-31', encountersThisMonth: 4, encountersToday: 0, recentEncounters: [],
      upcomingFollowUps: [
        { encounterId: 100, patientId: 1, patientFullName: 'Lucía Fernández', followUpDate: '2026-12-31' },
        { encounterId: 101, patientId: 2, patientFullName: 'Mateo Rossi', followUpDate: '2027-01-01' },
        { encounterId: 102, patientId: 3, patientFullName: 'Valentina López', followUpDate: '2027-01-01' },
        { encounterId: 103, patientId: 4, patientFullName: 'Tomás Pérez', followUpDate: '2027-01-02' },
      ],
    };
    clinicalEncounterServiceMock.getDashboard.mockReturnValueOnce(of(activity));
    component.loadKpiData(); fixture.detectChanges();
    expect(component.upcomingGroups().map(group => [group.label, group.date, group.items.length])).toEqual([
      ['Hoy', '2026-12-31', 1], ['Mañana', '2027-01-01', 2], ['Pasado mañana', '2027-01-02', 1],
    ]);
    const days = [...fixture.nativeElement.querySelectorAll('.followup-day')] as HTMLElement[];
    expect(days[1].textContent).toContain('2 consultas');
    expect(days[1].textContent).toContain('01/01/2027');
    expect(days[1].textContent).toContain('Mateo Rossi');
    const link = days[1].querySelector('a')!;
    expect(link.getAttribute('href')).toBe('/patients/2');
    expect(link.getAttribute('aria-label')).toBe('Ver ficha de Mateo Rossi');
    expect(clinicalEncounterServiceMock.getByPatient).not.toHaveBeenCalled();
  });

  it('shows a quiet empty state separately from loading, errors, and an unavailable API field', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.followup-empty')).toHaveLength(3);
    const pending = new Subject<any>();
    clinicalEncounterServiceMock.getDashboard.mockReturnValueOnce(pending);
    component.loadKpiData(); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.followup-card [role="status"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('.followup-empty')).toHaveLength(0);
    pending.error({ status: 503 }); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.followup-message').textContent).toContain('No se pudieron cargar');
    expect(fixture.nativeElement.querySelectorAll('.followup-empty')).toHaveLength(0);
    clinicalEncounterServiceMock.getDashboard.mockReturnValueOnce(of({ totalPatients: 0, asOfDate: '2026-10-05', encountersThisMonth: 0, encountersToday: 0, recentEncounters: [] }));
    fixture.nativeElement.querySelector('.followup-retry').click(); fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.followup-empty')).toHaveLength(0);
    expect(fixture.nativeElement.querySelector('.followup-retry')).not.toBeNull();
  });

  it('refreshes reminder dates and names after a clinical edit and clears reminders across accounts', () => {
    const activity = { totalPatients: 1, asOfDate: '2026-10-05', encountersThisMonth: 1, encountersToday: 1, recentEncounters: [],
      upcomingFollowUps: [{ encounterId: 101, patientId: 1, patientFullName: 'Mateo Rossi', followUpDate: '2026-10-06' }] };
    clinicalEncounterServiceMock.getDashboard.mockReturnValue(of(activity));
    window.dispatchEvent(new CustomEvent('encounter-updated')); fixture.detectChanges();
    expect(component.upcomingGroups()[1].items[0].patientFullName).toBe('Mateo Rossi');
    clinicalEncounterServiceMock.getDashboard.mockReturnValue(of({ ...activity, upcomingFollowUps: [] }));
    window.dispatchEvent(new CustomEvent('encounter-deleted')); fixture.detectChanges();
    expect(component.upcomingFollowUps()).toEqual([]);
    const pending = new Subject<any>();
    clinicalEncounterServiceMock.getDashboard.mockReturnValue(pending);
    component.loadKpiData();
    authServiceMock.currentUser.set(null);
    pending.next(activity); fixture.detectChanges();
    expect(component.upcomingFollowUps()).toBeNull();
    expect(fixture.nativeElement.querySelector('.followup-card').textContent).not.toContain('Mateo Rossi');
    expect(pending.observed).toBe(false);
  });

  it('reloads reminders when the local calendar day changes', () => {
    const clock = TestBed.inject(UserClockService);
    const before = clinicalEncounterServiceMock.getDashboard.mock.calls.length;
    clock.now.set(clock.now() + 86_400_000); fixture.detectChanges();
    expect(clinicalEncounterServiceMock.getDashboard.mock.calls.length).toBe(before + 1);
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
  it('keeps the save action for edits typed while an earlier save is pending', async () => {
    let finish!:()=>void;
    workspaceStoreMock.updateQuickNotes.mockImplementation(()=>new Promise<void>(resolve=>finish=resolve));
    component.onNotesInput('primera versión'); fixture.detectChanges();
    fixture.nativeElement.querySelector('.save-notes-button').click();
    component.onNotesInput('segunda versión');
    finish(); await fixture.whenStable(); fixture.detectChanges();
    expect(component.isNotesDirty()).toBe(true);
    expect(component.isNotesSaved()).toBe(false);
    expect(fixture.nativeElement.querySelector('.save-notes-button')).toBeTruthy();
    expect(workspaceStoreMock.updateQuickNotes).toHaveBeenCalledWith('primera versión');
  });
  it('shows a failed notes save in the document and permits a successful retry', async () => {
    workspaceStoreMock.updateQuickNotes.mockRejectedValueOnce(new Error('offline'));
    component.onNotesInput('borrador conservado'); fixture.detectChanges();
    fixture.nativeElement.querySelector('.save-notes-button').click();
    await fixture.whenStable(); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.notes-widget-body [role="alert"]').textContent).toContain('No pudimos confirmar');
    expect(component.quickNotes()).toBe('borrador conservado');
    expect(component.isNotesDirty()).toBe(true);
    expect(fixture.nativeElement.querySelector('.save-notes-button').disabled).toBe(false);
    fixture.nativeElement.querySelector('.save-notes-button').click();
    await fixture.whenStable(); fixture.detectChanges();
    expect(component.isNotesSaved()).toBe(true);
    expect(component.notesError()).toBeNull();
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

  it('paginates the complete history using server totals and keeps each consultation action', () => {
    const encounter = { ...clinicalFormFixture(), id: 101, patientId: 1, patientFullName: 'Mateo Rossi', encounterDate: '2026-09-24T10:00:00Z', consultationType: 'FIRST_VISIT', chiefComplaint: 'Control clínico' };
    clinicalEncounterServiceMock.getAll.mockReturnValue(of({
      content: [encounter], page: { totalElements: 1560, totalPages: 312, number: 0, size: 5 },
    }));
    component.loadRecentPage(0);
    fixture.detectChanges();
    expect(clinicalEncounterServiceMock.getAll).toHaveBeenLastCalledWith(0, 5, 'encounterDate,desc', '');
    expect(component.recentTotal()).toBe(1560);
    expect(component.recentTotalPages()).toBe(312);
    expect(fixture.nativeElement.querySelectorAll('.recent-consultation')).toHaveLength(1);
    expect(fixture.nativeElement.querySelector('.recent-count').textContent).toContain('1–1 de 1560');
    expect(fixture.nativeElement.querySelector('.recent-patient-info').textContent).toContain('DNI 50123456');
    const detail = vi.spyOn(component, 'openEncounterDetail').mockImplementation(() => {});
    const record = vi.spyOn(component, 'openPatient').mockImplementation(() => {});
    fixture.nativeElement.querySelector('.recent-detail-btn').click();
    fixture.nativeElement.querySelector('.recent-record-btn').click();
    expect(detail.mock.calls[0][0]).toBe(101);
    expect(record).toHaveBeenCalledWith(1);
    component.loadRecentPage(1);
    expect(clinicalEncounterServiceMock.getAll).toHaveBeenLastCalledWith(1, 5, 'encounterDate,desc', '');
    expect(component.recentRange()).toBe('6–6 de 1560');
  });

  it('debounces history searches, searches on Enter, and resets the page when its size changes', () => {
    vi.useFakeTimers();
    try {
      const count = clinicalEncounterServiceMock.getAll.mock.calls.length;
      component.onRecentSearchInput({ target: { value: 'Ma' } } as any);
      vi.advanceTimersByTime(200);
      component.onRecentSearchInput({ target: { value: 'Mateo' } } as any);
      vi.advanceTimersByTime(350);
      expect(clinicalEncounterServiceMock.getAll.mock.calls.length).toBe(count + 1);
      expect(clinicalEncounterServiceMock.getAll).toHaveBeenLastCalledWith(0, 5, 'encounterDate,desc', 'Mateo');
      component.onRecentSearchInput({ target: { value: 'Rinitis' } } as any);
      component.loadRecentPage(0);
      component.changeRecentPageSize('10');
      expect(clinicalEncounterServiceMock.getAll).toHaveBeenLastCalledWith(0, 10, 'encounterDate,desc', 'Rinitis');
      component.clearRecentSearch();
      expect(clinicalEncounterServiceMock.getAll).toHaveBeenLastCalledWith(0, 10, 'encounterDate,desc', '');
    } finally { vi.useRealTimers(); }
  });

  it('cancels superseded history pages and rejects replies after an account switch', () => {
    const older = new Subject<any>(), latest = new Subject<any>();
    clinicalEncounterServiceMock.getAll.mockReturnValueOnce(older).mockReturnValueOnce(latest);
    component.loadRecentPage(0);
    component.loadRecentPage(1);
    expect(older.observed).toBe(false);
    authServiceMock.currentUser.set({ id: 'doctor-b' });
    latest.next({ content: [{ patientFullName: 'Private result' }], page: { totalElements: 999, totalPages: 999 } });
    expect(component.recentPageItems()).toEqual([]);
    fixture.detectChanges();
    expect(latest.observed).toBe(false);
    expect(component.recentPage()).toBe(0);
    expect(component.recentSearch()).toBe('');
  });

  it('distinguishes a history failure from an empty search and supports retry', () => {
    component.recentSearch.set('Inexistente');
    clinicalEncounterServiceMock.getAll.mockReturnValueOnce(throwError(() => ({ status: 503 })));
    component.loadRecentPage(0);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.recent-empty[role="alert"]')).not.toBeNull();
    fixture.nativeElement.querySelector('.recent-empty button').click();
    fixture.detectChanges();
    expect(component.recentPageError()).toBeNull();
    expect(fixture.nativeElement.querySelector('.recent-empty').textContent).toContain('No encontramos esas consultas');
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
