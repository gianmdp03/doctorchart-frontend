import { AuthService } from '../../core/services/auth.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultasComponent } from './consultas.component';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { signal } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
import { Router, provideRouter } from '@angular/router';

describe('ConsultasComponent', () => {
  let component: ConsultasComponent;
  let fixture: ComponentFixture<ConsultasComponent>;

  let clinicalEncounterServiceMock: any;
  let activePatientServiceMock: any;
  let specialtyServiceMock: any;

  beforeEach(async () => {
    clinicalEncounterServiceMock = {
      getAll: vi.fn().mockReturnValue(
        of({
          content: [
            {
              id: 1,
              patientId: 10,
              patientFullName: 'Mateo Rossi',
              encounterDate: '2026-09-24T10:00:00Z',
              consultationType: 'ROUTINE_CHECKUP',
              chiefComplaint: 'Control de rutina',
              primaryDiagnosisDescription: 'Rinitis alérgica',
              primaryDiagnosisCode: 'J30.1',
            },
            {
              id: 2,
              patientId: 11,
              patientFullName: 'Lucía Fernández',
              encounterDate: '2026-09-23T14:30:00Z',
              consultationType: 'FIRST_VISIT',
              chiefComplaint: 'Fiebre persistente',
              primaryDiagnosisDescription: 'Faringitis aguda',
              primaryDiagnosisCode: 'J02.9',
            },
          ],
          totalElements: 2,
          totalPages: 1,
        }),
      ),
    };

    activePatientServiceMock = {
      patientId: signal(1),
      loadPatient: vi.fn(),
    };

    specialtyServiceMock = {
      activeSpecialty: signal('PEDIATRICS'),
      currentSpecialtyOption: signal({
        value: 'PEDIATRICS',
        label: 'Pediatría y Neonatología',
        shortLabel: 'Pediatría',
        icon: 'baby',
      }),
    };

    await TestBed.configureTestingModule({
      imports: [ConsultasComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: { currentUser: signal({ id: 'doctor-a' }) } },
        { provide: ClinicalEncounterService, useValue: clinicalEncounterServiceMock },
        { provide: ActivePatientService, useValue: activePatientServiceMock },
        { provide: DoctorSpecialtyService, useValue: specialtyServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create consultas component', () => {
    expect(component).toBeTruthy();
  });

  it('should load consultations on init', () => {
    expect(clinicalEncounterServiceMock.getAll).toHaveBeenCalled();
    expect(component.consultations().length).toBe(2);
  });

  it('sends a search to the backend rather than filtering the downloaded page', () => {
    component.searchQuery.set('Mateo');
    component.loadConsultations();
    expect(clinicalEncounterServiceMock.getAll).toHaveBeenLastCalledWith(
      0,
      50,
      'encounterDate,desc',
      'Mateo',
    );
    expect(component.consultations()).toHaveLength(2);
  });

  it('opens the consultation detail route', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.openEncounterDetail(201);
    expect(navigate).toHaveBeenCalledWith(['/encounters', 201]);
  });
  it('loads subsequent pages using the current search without requesting patient histories', () => {
    clinicalEncounterServiceMock.getAll.mockReturnValueOnce(
      of({ content: [], totalElements: 120, totalPages: 3 }),
    );
    component.searchQuery.set('CIE');
    component.loadConsultations();
    component.loadMore();
    expect(clinicalEncounterServiceMock.getAll).toHaveBeenLastCalledWith(
      1,
      50,
      'encounterDate,desc',
      'CIE',
    );
    expect(component.currentPage()).toBe(1);
  });
  it('cancels a previous search immediately and clears its debounce timer on reset', () => {
    vi.useFakeTimers();
    const pending = new Subject<any>();
    clinicalEncounterServiceMock.getAll.mockReturnValueOnce(pending);
    component.loadConsultations();
    component.onSearch('new');
    expect(pending.observed).toBe(false);
    component.loadConsultations();
    const count = clinicalEncounterServiceMock.getAll.mock.calls.length;
    vi.advanceTimersByTime(400);
    expect(clinicalEncounterServiceMock.getAll).toHaveBeenCalledTimes(count);
    vi.useRealTimers();
  });
  it('ignores account responses before effects run and distinguishes errors from empty data', () => {
    const pending = new Subject<any>();
    clinicalEncounterServiceMock.getAll.mockReturnValueOnce(pending);
    component.loadConsultations();
    TestBed.inject(AuthService).currentUser.set({ id: 'doctor-b' } as any);
    pending.next({ content: [{ id: 999 }], totalPages: 1, totalElements: 1 });
    expect(component.consultations()).toEqual([]);
    fixture.detectChanges();
    expect(pending.observed).toBe(false);
    clinicalEncounterServiceMock.getAll.mockReturnValueOnce(throwError(() => ({ status: 500 })));
    component.loadConsultations();
    expect(component.loadError()).toContain('No se pudo');
    expect(component.isLoading()).toBe(false);
  });

  it('cancels pending consultations when the account screen is destroyed', () => {
    const pending = new Subject<any>();
    clinicalEncounterServiceMock.getAll.mockReturnValue(pending);
    component.loadConsultations();
    expect(pending.observed).toBe(true);
    fixture.destroy();
    expect(pending.observed).toBe(false);
  });
});
