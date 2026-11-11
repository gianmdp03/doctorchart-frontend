import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivePatientService } from '../services/active-patient.service';
import { ClinicalContextService } from '../services/clinical-context.service';
import { AccountReadScope } from '../services/account-read-scope';
import { PatientRecordDraftsService } from '../../features/patient-record/patient-record-drafts.service';

describe('Clinical state ownership',()=>{
  const user=signal<{id:string}|null>({id:'doctor-a'});
  const patient=signal(10);
  beforeEach(()=>{
    user.set({id:'doctor-a'});patient.set(10);
    TestBed.configureTestingModule({providers:[{provide:AuthService,useValue:{currentUser:user}},{provide:ActivePatientService,useValue:{patientId:patient}}]});
    TestBed.inject(ClinicalContextService).bind(101);
  });
  it('keeps drafts across route recreation in the same context and clears them at a scope boundary',()=>{
    const drafts=TestBed.inject(PatientRecordDraftsService).syncContext();
    drafts.study.name.set('Study pending');drafts.encounter.values.set({chiefComplaint:'Pending'});drafts.prescription.medicationName.set('Synthetic');
    expect(TestBed.inject(PatientRecordDraftsService).syncContext().study.name()).toBe('Study pending');
    TestBed.inject(ClinicalContextService).bind(202);
    drafts.syncContext();
    expect(drafts.study.name()).toBe('');expect(drafts.encounter.values()).toEqual({});expect(drafts.prescription.medicationName()).toBe('');
    drafts.study.name.set('New scope');user.set({id:'doctor-b'});drafts.syncContext();expect(drafts.study.name()).toBe('');
  });
  it('invalidates dashboard/directory callbacks before reactive effects run',()=>{
    const changed=vi.fn();const scope=TestBed.runInInjectionContext(()=>new AccountReadScope(changed));
    const current=scope.begin();expect(current()).toBe(true);
    TestBed.inject(ClinicalContextService).bind(202);expect(current()).toBe(false);
    TestBed.tick();expect(changed).toHaveBeenCalledTimes(1);
    const next=scope.begin();expect(next()).toBe(true);user.set({id:'doctor-b'});expect(next()).toBe(false);
  });
});
