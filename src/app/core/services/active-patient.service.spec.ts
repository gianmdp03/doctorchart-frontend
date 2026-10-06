import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { ActivePatientService } from './active-patient.service';
import { AuthService } from './auth.service';
import { PatientService } from './patient.service';
import { PatientDetailDTO } from '../models/patient.model';
import { clinicalFormFixture } from '../models/clinical-form.fixture';

describe('Active patient session ownership', () => {
  let service: ActivePatientService;
  const user = signal<{id:string} | null>({id:'doctor-a'});
  const pending = new Map<number, Subject<PatientDetailDTO>>();
  const patient = (id:number):PatientDetailDTO => ({...clinicalFormFixture(),id,fullName:'Paciente '+id,birthDate:'1990-01-01'});
  beforeEach(() => {
    localStorage.clear(); pending.clear(); user.set({id:'doctor-a'});
    TestBed.configureTestingModule({providers:[
      {provide:AuthService,useValue:{currentUser:user}},
      {provide:PatientService,useValue:{getPatientById:(id:number)=>{
        const request = new Subject<PatientDetailDTO>(); pending.set(id,request); return request;
      }}},
    ]});
    service = TestBed.inject(ActivePatientService);
  });
  it('keeps the selected patient when an earlier request arrives late and stores only its ID', () => {
    service.loadPatient(1); service.loadPatient(2);
    expect(pending.get(1)!.observed).toBe(false);
    pending.get(2)!.next(patient(2)); pending.get(1)!.next(patient(1));
    expect(service.patientId()).toBe(2);
    expect(localStorage.getItem('doctorchart_active_patient:doctor-a')).toBe('2');
    expect(localStorage.getItem('doctorchart_active_patient_data')).toBeNull();
  });
  it('does not restore cleared data after a late response', () => {
    service.loadPatient(1); service.clear(); pending.get(1)!.next(patient(1));
    expect(service.activePatient()).toBeNull(); expect(service.isLoading()).toBe(false);
    expect(localStorage.getItem('doctorchart_active_patient:doctor-a')).toBeNull();
  });
  it('removes the previous patient while selecting another, including failed loads', () => {
    service.setActivePatient(patient(1)); service.loadPatient(2);
    expect(service.activePatient()).toBeNull();
    pending.get(2)!.error({status:403});
    expect(service.activePatient()).toBeNull(); expect(service.isLoading()).toBe(false);
    expect(localStorage.getItem('doctorchart_active_patient:doctor-a')).toBeNull();
  });
  it('keeps a same-patient refresh in context but clears it when access is denied', () => {
    service.setActivePatient(patient(1)); service.loadPatient(1);
    expect(service.patientId()).toBe(1);
    pending.get(1)!.error({status:404}); expect(service.activePatient()).toBeNull();
  });
  it('restores only the authenticated account ID after backend revalidation', () => {
    localStorage.setItem('doctorchart_active_patient:doctor-a','1');
    localStorage.setItem('doctorchart_active_patient:doctor-b','2');
    localStorage.setItem('doctorchart_active_patient_data',JSON.stringify(patient(99)));
    localStorage.setItem('doctorchart_active_patient_id','99');
    TestBed.tick(); expect(service.activePatient()).toBeNull();
    expect(pending.has(99)).toBe(false); pending.get(1)!.next(patient(1));
    expect(service.patientId()).toBe(1);
    user.set({id:'doctor-b'}); TestBed.tick(); expect(service.activePatient()).toBeNull();
    pending.get(2)!.next(patient(2)); expect(service.patientId()).toBe(2);
    expect(localStorage.getItem('doctorchart_active_patient:doctor-a')).toBe('1');
  });
  it('ignores responses after account changes even before effects run', () => {
    service.loadPatient(1); user.set({id:'doctor-b'}); pending.get(1)!.next(patient(1));
    expect(service.activePatient()).toBeNull(); TestBed.tick(); expect(service.isLoading()).toBe(false);
  });
  it('clears the active record on logout and cannot select or load while signed out', () => {
    service.setActivePatient(patient(1)); user.set(null); TestBed.tick();
    service.setActivePatient(patient(2)); service.loadPatient(2);
    expect(service.activePatient()).toBeNull(); expect(pending.has(2)).toBe(false);
  });
  it('rejects a response for a different patient', () => {
    service.loadPatient(1); pending.get(1)!.next(patient(2));
    expect(service.activePatient()).toBeNull(); expect(service.error()).toContain('no corresponde');
  });
});
