import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { ActivePatientService } from './active-patient.service';
import { PatientService } from './patient.service';
import { PatientDetailDTO } from '../models/patient.model';
import { clinicalFormFixture } from '../models/clinical-form.fixture';

describe('Active patient response ownership', () => {
  let service: ActivePatientService;
  const pending = new Map<number, Subject<PatientDetailDTO>>();
  beforeEach(() => {
    localStorage.clear(); pending.clear();
    TestBed.configureTestingModule({providers:[{provide:PatientService,useValue:{getPatientById:(id:number)=>{
      const request=new Subject<PatientDetailDTO>(); pending.set(id,request); return request;
    }}}]});
    service=TestBed.inject(ActivePatientService);
  });
  const patient=(id:number):PatientDetailDTO=>({...clinicalFormFixture(),id,fullName:`Paciente ${id}`,birthDate:'1990-01-01'});
  it('keeps the selected patient when an earlier request arrives late', () => {
    service.loadPatient(1); service.loadPatient(2);
    pending.get(2)!.next(patient(2)); pending.get(1)!.next(patient(1));
    expect(service.patientId()).toBe(2);
    expect(localStorage.getItem('doctorchart_active_patient_id')).toBe('2');
  });
  it('does not restore cleared clinical data after a late response', () => {
    service.loadPatient(1); service.clear(); pending.get(1)!.next(patient(1));
    expect(service.activePatient()).toBeNull(); expect(service.isLoading()).toBe(false);
    expect(localStorage.getItem('doctorchart_active_patient_data')).toBeNull();
  });
});
