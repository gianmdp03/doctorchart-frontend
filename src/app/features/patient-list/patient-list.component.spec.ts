import { AuthService } from '../../core/services/auth.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientListComponent } from './patient-list.component';
import { PatientService } from '../../core/services/patient.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { of, Subject, throwError } from 'rxjs';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('PatientListComponent', () => {
  let component: PatientListComponent;
  let fixture: ComponentFixture<PatientListComponent>;

  let patientServiceMock: {
    getPatients: ReturnType<typeof vi.fn>;
  };
  let activePatientServiceMock: {
    patientId: ReturnType<typeof signal<number | null>>;
    setActivePatient: ReturnType<typeof vi.fn>;
  };
  let doctorSpecialtyServiceMock: {
    supportsGrowthCharts: ReturnType<typeof signal<boolean>>;
  };
  let workspaceStoreMock: {
    patientVisibleColumns: ReturnType<typeof signal<Record<string, boolean>>>;
    isColumnVisible: ReturnType<typeof vi.fn>;
    updateWorkspace: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    patientServiceMock = {
      getPatients: vi.fn().mockReturnValue(
        of({
          content: [
            {
              id: 1,
              fullName: 'Ana García',
              birthDate: '2020-05-12',
              nationalId: '45123987',
              phone: '1123456789',
              ageInMonths: 76,
              ageDisplay: '6 años 4m',
              ageGroup: 'CHILD',
              hasPendingVaccine: true,
            },
          ],
          totalElements: 1,
          totalPages: 1,
        }),
      ),
    };

    activePatientServiceMock = {
      patientId: signal<number | null>(null),
      setActivePatient: vi.fn(),
    };

    doctorSpecialtyServiceMock = {
      supportsGrowthCharts: signal<boolean>(false),
    };

    workspaceStoreMock = {
      patientVisibleColumns: signal<Record<string, boolean>>({
        nationalId: true,
        phone: false,
      }),
      isColumnVisible: vi.fn((key: string) => key !== 'phone'),
      updateWorkspace: vi.fn().mockResolvedValue({}),
    };

    await TestBed.configureTestingModule({
      imports: [PatientListComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: { currentUser: signal({ id: 'doctor-a' }) } },
        { provide: PatientService, useValue: patientServiceMock },
        { provide: ActivePatientService, useValue: activePatientServiceMock },
        { provide: DoctorSpecialtyService, useValue: doctorSpecialtyServiceMock },
        { provide: WorkspaceStore, useValue: workspaceStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the patient list component and load directory', () => {
    expect(component).toBeTruthy();
    expect(patientServiceMock.getPatients).toHaveBeenCalled();
    expect(component.patients().length).toBe(1);
    expect(component.patients()[0].fullName).toBe('Ana García');
  });

  it('should toggle columns modal visibility', () => {
    expect(component.isColumnsModalOpen()).toBe(false);

    component.openColumnsModal();
    expect(component.isColumnsModalOpen()).toBe(true);

    component.closeColumnsModal();
    expect(component.isColumnsModalOpen()).toBe(false);
  });
  it('requests filters before pagination and renders the server age and pending flag', () => {
    component.setFilter('VACCINE_PENDING');
    expect(patientServiceMock.getPatients).toHaveBeenLastCalledWith(
      0,
      20,
      'fullName,asc',
      '',
      'VACCINE_PENDING',
    );
    expect(component.patients()).toHaveLength(1);
    expect(component.patients()[0].hasPendingVaccine).toBe(true);
    expect(component.patients()[0].ageDisplay).toBe('6 años 4m');
    expect(component.patients()[0].birthDateDisplay).toBe('12/05/2020');
    component.setFilter('INFANT');
    expect(component.patients()).toHaveLength(1); // No local filtering of a server result.
  });
  it('keeps the active filter across pages and retries the same page after failure', () => {
    patientServiceMock.getPatients.mockReturnValueOnce(
      of({ content: [], totalElements: 45, totalPages: 3 }),
    );
    component.setFilter('ADULT');
    expect(component.hasMore()).toBe(true);
    patientServiceMock.getPatients.mockReturnValueOnce(throwError(() => ({ status: 500 })));
    component.loadMore();
    expect(component.currentPage()).toBe(0);
    expect(component.loadError()).toContain('No se pudo');
    patientServiceMock.getPatients.mockReturnValueOnce(
      of({ content: [], totalElements: 45, totalPages: 3 }),
    );
    component.loadMore();
    expect(patientServiceMock.getPatients).toHaveBeenLastCalledWith(
      1,
      20,
      'fullName,asc',
      '',
      'ADULT',
    );
    expect(component.currentPage()).toBe(1);
    expect(component.totalElements()).toBe(45);
  });
  it('cancels an earlier query and suppresses responses from the previous account', () => {
    const pending = new Subject<any>();
    patientServiceMock.getPatients.mockReturnValueOnce(pending);
    component.loadInitial();
    component.setFilter('MINOR');
    expect(pending.observed).toBe(false);
    const late = new Subject<any>();
    patientServiceMock.getPatients.mockReturnValueOnce(late);
    component.loadInitial();
    TestBed.inject(AuthService).currentUser.set({ id: 'doctor-b' } as any);
    late.next({ content: [{ id: 999 }], totalPages: 1, totalElements: 1 });
    expect(component.patients()).toEqual([]);
    fixture.detectChanges();
    expect(late.observed).toBe(false);
  });
  it('shows read errors and can reload an empty result without reporting a successful empty search', () => {
    patientServiceMock.getPatients.mockReturnValueOnce(throwError(() => ({ status: 503 })));
    component.loadInitial();
    expect(component.loadError()).toContain('No se pudo');
    expect(component.isLoading()).toBe(false);
    patientServiceMock.getPatients.mockReturnValueOnce(
      of({ content: [], totalPages: 0, totalElements: 0 }),
    );
    component.loadInitial();
    expect(component.loadError()).toBeNull();
    expect(component.hasMore()).toBe(false);
  });

  it('cancels the account screen request and its search timer on destruction', () => {
    vi.useFakeTimers();
    const pending = new Subject<any>();
    patientServiceMock.getPatients.mockReturnValue(pending);
    component.loadInitial();
    expect(pending.observed).toBe(true);
    component.onSearchInput({ target: { value: 'Nueva búsqueda' } } as any);
    fixture.destroy();
    expect(pending.observed).toBe(false);
    const calls = patientServiceMock.getPatients.mock.calls.length;
    vi.advanceTimersByTime(400);
    expect(patientServiceMock.getPatients).toHaveBeenCalledTimes(calls);
    vi.useRealTimers();
  });

  it('debounces rapid search input and only queries after user pauses typing', () => {
    vi.useFakeTimers();
    const response = of({ content: [], totalPages: 0, totalElements: 0 });
    patientServiceMock.getPatients.mockReturnValue(response);
    const initialCalls = patientServiceMock.getPatients.mock.calls.length;

    // Rapid keystrokes
    component.onSearchInput({ target: { value: 'P' } } as any);
    vi.advanceTimersByTime(100);
    component.onSearchInput({ target: { value: 'Pe' } } as any);
    vi.advanceTimersByTime(100);
    component.onSearchInput({ target: { value: 'Perez' } } as any);

    // No API calls should have been made yet while typing
    expect(patientServiceMock.getPatients).toHaveBeenCalledTimes(initialCalls);

    // After 400ms pause, exactly 1 call is made with the final query
    vi.advanceTimersByTime(400);
    expect(patientServiceMock.getPatients).toHaveBeenCalledTimes(initialCalls + 1);
    expect(patientServiceMock.getPatients).toHaveBeenLastCalledWith(
      0,
      component.pageSize,
      'fullName,asc',
      'Perez',
      component.selectedFilter(),
    );

    // Enter key triggers immediate search without waiting
    component.onSearchInput({ target: { value: 'Gomez' } } as any);
    component.onSearchEnter();
    expect(patientServiceMock.getPatients).toHaveBeenCalledTimes(initialCalls + 2);
    expect(patientServiceMock.getPatients).toHaveBeenLastCalledWith(
      0,
      component.pageSize,
      'fullName,asc',
      'Gomez',
      component.selectedFilter(),
    );

    vi.useRealTimers();
  });
});
