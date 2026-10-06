import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultasComponent } from './consultas.component';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { signal } from '@angular/core';
import { of, Subject } from 'rxjs';
import { provideRouter } from '@angular/router';

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
              consultationType: 'SOAP_ROUTINE',
              chiefComplaint: 'Control de rutina',
              primaryDiagnosisDescription: 'Rinitis alérgica',
              primaryDiagnosisCode: 'J30.1',
            },
            {
              id: 2,
              patientId: 11,
              patientFullName: 'Lucía Fernández',
              encounterDate: '2026-09-23T14:30:00Z',
              consultationType: 'SOAP_FIRST_TIME',
              chiefComplaint: 'Fiebre persistente',
              primaryDiagnosisDescription: 'Faringitis aguda',
              primaryDiagnosisCode: 'J02.9',
            },
          ],
          totalElements: 2,
        })
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

  it('should filter consultations by search query', () => {
    component.searchQuery.set('Mateo');
    fixture.detectChanges();
    expect(component.filteredConsultations().length).toBe(1);
    expect(component.filteredConsultations()[0].patientName).toBe('Mateo Rossi');
  });

  it('should dispatch encounter detail modal event', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    component.openEncounterDetail(201);
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'open-encounter-detail-modal',
        detail: { encounterId: 201 },
      })
    );
  });

  it('cancels pending consultations when the account screen is destroyed', () => {
    const pending=new Subject<any>(); clinicalEncounterServiceMock.getAll.mockReturnValue(pending);
    component.loadConsultations(); expect(pending.observed).toBe(true); fixture.destroy(); expect(pending.observed).toBe(false);
  });

});
