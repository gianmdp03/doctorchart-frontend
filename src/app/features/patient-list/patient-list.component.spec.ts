import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientListComponent } from './patient-list.component';
import { PatientService } from '../../core/services/patient.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { of, Subject } from 'rxjs';
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
            },
          ],
          totalElements: 1,
          totalPages: 1,
        })
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

  it('cancels the account screen request and its search timer on destruction', () => {
    vi.useFakeTimers(); const pending=new Subject<any>(); patientServiceMock.getPatients.mockReturnValue(pending);
    component.loadInitial(); expect(pending.observed).toBe(true);
    component.onSearchInput({target:{value:'Nueva búsqueda'}} as any);
    fixture.destroy(); expect(pending.observed).toBe(false);
    const calls=patientServiceMock.getPatients.mock.calls.length; vi.advanceTimersByTime(400);
    expect(patientServiceMock.getPatients).toHaveBeenCalledTimes(calls); vi.useRealTimers();
  });

});
