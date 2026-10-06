import { PatientRecordActionsService } from '../../core/experience/patient-record-actions.service';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { PLATFORM_ID, signal } from '@angular/core';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import { PrescriptionPrintLayoutComponent } from './prescription-print-layout.component';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';
import { ClinicalPrintDocument } from '../../core/models/clinical-print-document.model';

const document:ClinicalPrintDocument={source:'PRESCRIPTION_RECORD',id:31,code:'RX-31-10',issuedAt:'2026-10-05T12:00:00Z',type:'STUDY_ORDERS',
  patient:{id:10,fullName:'Mateo Rossi',nationalId:null,birthDate:'2022-05-10',ageAtIssue:'4 años 4m',insuranceInfo:null},
  author:{userId:'doctor-a',specialtyName:'Pediatría'},primaryDiagnosisCode:null,primaryDiagnosisDescription:'Control',
  patientInstructions:'Reposo',prescriptions:[],diagnosticOrders:['ECG']};

describe('Print preview with HTTP client',()=>{
  let component:PrescriptionPrintLayoutComponent;
  let fixture:ComponentFixture<PrescriptionPrintLayoutComponent>;
  let http:HttpTestingController;
  const user=signal<any>({id:'doctor-a',user_metadata:{full_name:'Dra. Sofía Mendoza',license:'MP 1234'}});
  const url=(collection:string,patient=10,id=31)=>environment.apiUrl+'/patients/'+patient+'/'+collection+'/'+id+'/print';
  beforeEach(async()=>{
    user.set({id:'doctor-a',user_metadata:{full_name:'Dra. Sofía Mendoza',license:'MP 1234'}});
    await TestBed.configureTestingModule({imports:[PrescriptionPrintLayoutComponent],providers:[{provide:PatientRecordActionsService,useValue:{has:()=>true}},
      provideHttpClient(),provideHttpClientTesting(),{provide:PLATFORM_ID,useValue:'browser'},
      {provide:AuthService,useValue:{currentUser:user}},
    ]}).compileComponents();
    fixture=TestBed.createComponent(PrescriptionPrintLayoutComponent);component=fixture.componentInstance;
    http=TestBed.inject(HttpTestingController);fixture.detectChanges();
  });
  afterEach(()=>http.verify());
  it('loads an authorized prescription by patient and document ID, then renders its stored values',()=>{
    component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail:{source:'PRESCRIPTION_RECORD',id:31,patientId:10}}));
    const request=http.expectOne(url('prescriptions'));expect(request.request.method).toBe('GET');
    expect(request.request.body).toBeNull();expect(component.canPrint()).toBe(false);
    request.flush(document);fixture.detectChanges();
    expect(component.canPrint()).toBe(true);expect(component.documentType()).toBe('STUDY_ORDERS');
    expect(fixture.nativeElement.textContent).toContain('Mateo Rossi');expect(fixture.nativeElement.textContent).toContain('ECG');
  });
  it('loads a consultation through its separate source instead of confusing equal numeric IDs',()=>{
    component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail:{source:'ENCOUNTER',id:31,patientId:10}}));
    http.expectOne(url('encounters')).flush({...document,source:'ENCOUNTER',code:'HC-31-10'});fixture.detectChanges();
    expect(component.documentCode()).toBe('HC-31-10');expect(component.canPrint()).toBe(true);
  });
  it('cancels an earlier print request when another document is opened',()=>{
    component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail:{source:'PRESCRIPTION_RECORD',id:31,patientId:10}}));
    const first=http.expectOne(url('prescriptions'));
    component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail:{source:'PRESCRIPTION_RECORD',id:45,patientId:20}}));
    expect(first.cancelled).toBe(true);expect(component.document()).toBeNull();
    http.expectOne(url('prescriptions',20,45)).flush({...document,id:45,patient:{...document.patient,id:20,fullName:'Otra paciente'}});
    expect(component.patientName()).toBe('Otra paciente');
  });
  it('never enables printing after access is denied or after the modal is closed during loading',()=>{
    component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail:{source:'PRESCRIPTION_RECORD',id:31,patientId:10}}));
    http.expectOne(url('prescriptions')).flush({message:'No tenés permiso'}, {status:403,statusText:'Forbidden'});
    expect(component.canPrint()).toBe(false);expect(component.error()).toBe('No tenés permiso');
    component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail:{source:'PRESCRIPTION_RECORD',id:31,patientId:10}}));
    const request=http.expectOne(url('prescriptions'));component.closeModal();expect(request.cancelled).toBe(true);
    expect(component.isOpen()).toBe(false);expect(component.document()).toBeNull();
  });
  it('invalidates print immediately when the authenticated identity changes, before rendering effects run',()=>{
    component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail:{source:'PRESCRIPTION_RECORD',id:31,patientId:10}}));
    http.expectOne(url('prescriptions')).flush(document);expect(component.canPrint()).toBe(true);
    user.set({id:'doctor-b',user_metadata:{}});expect(component.canPrint()).toBe(false);fixture.detectChanges();expect(component.isOpen()).toBe(false);
  });
});
