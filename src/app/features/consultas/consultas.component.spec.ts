import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultasComponent } from './consultas.component';
import { PatientService } from '../../core/services/patient.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('ConsultasComponent', () => {
  let component: ConsultasComponent;
  let fixture: ComponentFixture<ConsultasComponent>;

  let patientServiceMock: any;
  let activePatientServiceMock: any;
  let specialtyServiceMock: any;

  beforeEach(async () => {
    patientServiceMock = {
      getPatients: vi.fn().mockReturnValue(
        of({
          content: [
            { id: 1, fullName: 'Mateo Rossi' },
            { id: 2, fullName: 'Lucía Fernández' },
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
        { provide: PatientService, useValue: patientServiceMock },
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
    expect(patientServiceMock.getPatients).toHaveBeenCalled();
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
    dispatchSpy.mockRestore();
  });
});
