import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendaComponent } from './agenda.component';
import { PatientService } from '../../core/services/patient.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('AgendaComponent', () => {
  let component: AgendaComponent;
  let fixture: ComponentFixture<AgendaComponent>;

  let patientServiceMock: any;
  let activePatientServiceMock: any;
  let specialtyServiceMock: any;

  beforeEach(async () => {
    patientServiceMock = {
      getPatients: vi.fn().mockReturnValue(
        of({
          content: [
            { id: 1, fullName: 'Mateo Rossi', birthDate: '2024-05-10', phone: '11-4567-8901' },
            { id: 2, fullName: 'Lucía Fernández', birthDate: '2020-08-15', phone: '11-4567-8902' },
          ],
          totalElements: 2,
        })
      ),
    };

    activePatientServiceMock = {
      loadPatient: vi.fn(),
    };

    specialtyServiceMock = {
      activeSpecialty: signal('PEDIATRICS'),
    };

    await TestBed.configureTestingModule({
      imports: [AgendaComponent],
      providers: [
        provideRouter([{ path: 'pacientes/:id', component: AgendaComponent }]),
        { provide: PatientService, useValue: patientServiceMock },
        { provide: ActivePatientService, useValue: activePatientServiceMock },
        { provide: DoctorSpecialtyService, useValue: specialtyServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create agenda component', () => {
    expect(component).toBeTruthy();
  });

  it('should load appointments on init', () => {
    expect(patientServiceMock.getPatients).toHaveBeenCalled();
    expect(component.appointments().length).toBe(2);
  });

  it('should filter appointments by status', () => {
    component.filterStatus.set('WAITING');
    fixture.detectChanges();
    expect(component.filterStatus()).toBe('WAITING');
  });

  it('should load active patient on startConsultation', () => {
    component.startConsultation(component.appointments()[0]);
    expect(activePatientServiceMock.loadPatient).toHaveBeenCalledWith(1);
  });
});
