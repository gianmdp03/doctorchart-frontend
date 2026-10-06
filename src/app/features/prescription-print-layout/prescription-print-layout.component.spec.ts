import { TestBed, ComponentFixture } from '@angular/core/testing';
import { signal, PLATFORM_ID } from '@angular/core';
import { ClinicalDocumentPrintService } from '../../core/services/clinical-document-print.service';
import { ClinicalPrintDocument } from '../../core/models/clinical-print-document.model';
import { of, Subject, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { PrescriptionPrintLayoutComponent } from './prescription-print-layout.component';
import { AuthService } from '../../core/services/auth.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';

const medication={medicationName:'Amoxicilina',dosage:'5 ml',frequency:'Cada 8 horas',administrationRoute:'Vía Oral',durationDays:7,instructions:'Con comida'};
const detail={source:'PRESCRIPTION_RECORD',patientId:10,id:31,type:'PRESCRIPTION',encounterDate:'2026-10-05T14:30:00Z',prescriptions:[medication],diagnosticOrders:['ECG'],primaryDiagnosisDescription:'Control',followUpInstructions:'Reposo'};

const document: ClinicalPrintDocument = {
  source:'PRESCRIPTION_RECORD',id:31,code:'RX-31-10',issuedAt:'2026-10-05T14:30:00Z',type:'PRESCRIPTION',
  patient:{id:10,fullName:'Mateo Rossi',nationalId:'12345678',birthDate:'2022-05-10',ageAtIssue:'4 años 4m',insuranceInfo:null},
  author:{userId:'doctor-a',specialtyName:'Pediatría'},primaryDiagnosisCode:null,primaryDiagnosisDescription:'Control',
  patientInstructions:'Reposo',prescriptions:[medication],diagnosticOrders:['ECG'],
};

describe('Prescription print presentation baseline', () => {
  let component: PrescriptionPrintLayoutComponent;
  let fixture: ComponentFixture<PrescriptionPrintLayoutComponent>;
  let api: {get: ReturnType<typeof vi.fn>};
  const user=signal<any>({id:'doctor-a',user_metadata:{full_name:'Dra. Sofía Mendoza',license:'MP 1234'}});
  beforeEach(async () => {
    user.set({id:'doctor-a',user_metadata:{full_name:'Dra. Sofía Mendoza',license:'MP 1234'}});
    api={get:vi.fn().mockReturnValue(of(document))};
    await TestBed.configureTestingModule({imports:[PrescriptionPrintLayoutComponent],providers:[
      {provide:ClinicalDocumentPrintService,useValue:api},
      provideHttpClient(),provideHttpClientTesting(),{provide:PLATFORM_ID,useValue:'browser'},
      {provide:AuthService,useValue:{currentUser:user,userName:signal('Dra. Sofía Mendoza')}},
      {provide:ActivePatientService,useValue:{activePatient:signal({id:10,fullName:'Mateo Rossi',nationalId:'12345678',birthDate:'2022-05-10'}),patientId:signal(10),ageDisplay:signal('4 años')}},
      {provide:DoctorSpecialtyService,useValue:{currentSpecialtyOption:()=>({label:'Pediatría'})}},
    ]}).compileComponents();
    fixture=TestBed.createComponent(PrescriptionPrintLayoutComponent); component=fixture.componentInstance;
  });
  for(const type of ['PRESCRIPTION','STUDY_ORDERS'] as const) {
    for(const format of ['A4_DUAL','A5_SINGLE'] as const) {
      it('preserves sheet sections, controls and clinical contents for '+type+' / '+format, () => {
        component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail:{...detail,type}}));
        component.setFormat(format); fixture.detectChanges();
        const element=fixture.nativeElement as HTMLElement;
        const copies=format==='A4_DUAL'?2:1;
        expect(element.querySelectorAll('.prescription-sheet')).toHaveLength(copies);
        for(const selector of ['.sheet-header','.doc-banner','.patient-info-box','.sheet-body','.sheet-footer','.footer-signature'])
          expect(element.querySelectorAll(selector)).toHaveLength(copies);
        expect(element.querySelector('.format-toggle')?.textContent).toContain('A4 Doble Vía');
        expect(element.querySelector('.format-toggle')?.textContent).toContain('A5 Simple');
        expect(element.querySelector('.btn-print-cta')?.textContent).toContain('Imprimir Documento');
        expect(element.textContent).toContain('Mateo Rossi'); expect(element.textContent).toContain('Control'); expect(element.textContent).toContain('Reposo');
        expect(element.querySelectorAll(type==='PRESCRIPTION'?'.prescription-entry':'.study-order-item')).toHaveLength(copies);
        expect(element.textContent).toContain(type==='PRESCRIPTION'?'Amoxicilina':'ECG');
      });
    }
  }
  it('renders persisted patient data and account author data rather than the active patient or event content', () => {
    component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail:{...detail,prescriptions:[],primaryDiagnosisDescription:'Inventado'}}));
    fixture.detectChanges();
    expect(component.document()?.patient.fullName).toBe('Mateo Rossi');
    expect(component.doctorName()).toBe('Dra. Sofía Mendoza');
    expect(component.doctorLicense()).toBe('MP 1234');
    expect(component.document()?.primaryDiagnosisDescription).toBe('Control');
    expect(component.patientAge()).toBe('4 años 4m');
    expect(component.formattedDate()).toBe('05/10/2026');
    expect(component.documentCode()).toBe('RX-31-10');
    expect(api.get).toHaveBeenCalledWith(expect.objectContaining({source:'PRESCRIPTION_RECORD',patientId:10,id:31}));
  });
  it('keeps an opened document stable when the account metadata changes', () => {
    component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail}));
    user.set({id:'doctor-a',user_metadata:{full_name:'Nombre cambiado',license:'MP 999'}}); fixture.detectChanges();
    expect(component.doctorName()).toBe('Dra. Sofía Mendoza'); expect(component.doctorLicense()).toBe('MP 1234');
  });
  it('uses explicit missing values instead of fabricated credentials, guardian DNI or uninsured status', () => {
    user.set({id:'doctor-a',email:'test@example.com',user_metadata:{license:1234}});
    api.get.mockReturnValue(of({...document,patient:{...document.patient,nationalId:null}}));
    component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail})); fixture.detectChanges();
    expect(component.doctorName()).toBe('Nombre no informado'); expect(component.doctorLicense()).toBe('Matrícula no informada');
    expect(component.patientDni()).toBe('No informado'); expect(component.patientCoverage()).toBe('No informada');
    const text=fixture.nativeElement.textContent;
    for(const fabricated of ['154.289','45.102','Corrientes 2450','Firma Digital','Ley 27.553','Válido por 30 días','RX-2026','Paciente Particular'])
      expect(text).not.toContain(fabricated);
    expect(fixture.nativeElement.querySelector('.qr-mockup')).toBeNull();
  });
  it('prints only real clinic metadata and preserves populated insurance information', () => {
    user.set({id:'doctor-a',user_metadata:{full_name:'Dra. Sofía',license:'MP 1234',clinic_name:'Consultorio Norte',clinic_address:'Calle real 123',clinic_phone:'11 5555-5555'}});
    api.get.mockReturnValue(of({...document,patient:{...document.patient,insuranceInfo:{providerName:'OSDE',planName:'210',affiliateNumber:'12345'}}}));
    component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail})); fixture.detectChanges();
    expect(component.clinicInfo().name).toBe('Consultorio Norte'); expect(component.clinicInfo().address).toBe('Calle real 123');
    expect(component.patientCoverage()).toBe('OSDE 210 · Afiliado N° 12345');
  });
  it('waits for the server before enabling print and preserves the browser print action', () => {
    const response=new Subject<ClinicalPrintDocument>();api.get.mockReturnValue(response);
    const print=vi.spyOn(window,'print').mockImplementation(()=>{});
    component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail})); fixture.detectChanges(); component.print();
    expect(component.loading()).toBe(true);expect(print).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('.btn-print-cta').disabled).toBe(true);
    response.next(document);response.complete();fixture.detectChanges();component.print();
    expect(print).toHaveBeenCalledTimes(1);expect(component.canPrint()).toBe(true);
    print.mockRestore();
  });
  for(const mismatch of [
    {...document,id:99},{...document,source:'ENCOUNTER'},
    {...document,patient:{...document.patient,id:20}},
    {...document,author:{...document.author,userId:'doctor-b'}},
    {...document,issuedAt:'bad-date'},
  ]) it('rejects a document that does not match the requested source, patient, author or date', () => {
    api.get.mockReturnValue(of(mismatch));component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail}));
    expect(component.document()).toBeNull();expect(component.canPrint()).toBe(false);expect(component.error()).toContain('No se pudo verificar');
  });
  it('does not open unsupported, missing or forged document references', () => {
    for(const bad of [null,{id:0,patientId:10,source:'ENCOUNTER'},{id:1,patientId:0,source:'ENCOUNTER'},{id:1,patientId:10,source:'URL'},{}])
      component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail:bad}));
    expect(api.get).not.toHaveBeenCalled();expect(component.isOpen()).toBe(false);
  });
  it('does not print inaccessible or empty documents and reports retrieval errors', () => {
    api.get.mockReturnValue(throwError(()=>({error:{message:'Sin permisos'}})));
    component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail}));fixture.detectChanges();
    expect(component.error()).toBe('Sin permisos');expect(component.canPrint()).toBe(false);
    api.get.mockReturnValue(of({...document,prescriptions:[],diagnosticOrders:[]}));
    component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail}));expect(component.canPrint()).toBe(false);
  });
  it('disables document types without recorded items and renders repeated items without duplicate keys', () => {
    api.get.mockReturnValue(of({...document,prescriptions:[medication,medication],diagnosticOrders:[]}));
    component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail})); component.setDocType('STUDY_ORDERS');fixture.detectChanges();
    expect(component.documentType()).toBe('PRESCRIPTION');expect(fixture.nativeElement.querySelectorAll('.prescription-entry')).toHaveLength(4);
    expect(fixture.nativeElement.querySelectorAll('.doc-type-toggle button')[1].disabled).toBe(true);
  });
  it('cancels and clears printing when the session changes or the preview closes', () => {
    const response=new Subject<ClinicalPrintDocument>(); api.get.mockReturnValue(response);
    component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail}));
    user.set({id:'doctor-b',user_metadata:{full_name:'Otro'}});fixture.detectChanges();response.next(document);
    expect(component.isOpen()).toBe(false);expect(component.document()).toBeNull();
    user.set({id:'doctor-a',user_metadata:{}});api.get.mockReturnValue(of(document));
    component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail}));component.onEscape();
    expect(component.isOpen()).toBe(false);expect(component.document()).toBeNull();expect(component.canPrint()).toBe(false);
  });
  it('formats the issuance date in Argentina even when the UTC calendar day differs', () => {
    api.get.mockReturnValue(of({...document,issuedAt:'2026-10-06T01:00:00Z'}));
    component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail}));expect(component.formattedDate()).toBe('05/10/2026');
  });

  it('disables printing immediately and closes the document when the selected patient changes', () => {
    component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail})); fixture.detectChanges();
    const print=vi.spyOn(window,'print').mockImplementation(()=>{});
    (TestBed.inject(ActivePatientService).activePatient as any).set({id:20});
    expect(component.canPrint()).toBe(false); component.print(); expect(print).not.toHaveBeenCalled();
    fixture.detectChanges(); expect(component.isOpen()).toBe(false); expect(component.document()).toBeNull();
  });
  it('cannot reopen a late document after changing the selected patient', () => {
    const pending=new Subject<ClinicalPrintDocument>(); api.get.mockReturnValue(pending);
    component.onOpenModal(new CustomEvent('open-prescription-print-modal',{detail}));
    (TestBed.inject(ActivePatientService).activePatient as any).set({id:20}); pending.next(document);
    expect(component.document()).toBeNull(); expect(component.isOpen()).toBe(false); expect(pending.observed).toBe(false);
  });

});
