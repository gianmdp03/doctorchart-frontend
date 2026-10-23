import { PatientRecordActionsService } from '../../core/experience/patient-record-actions.service';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject, of, Subject, throwError } from 'rxjs';
import { EncounterDetailPageComponent } from './encounter-detail-page.component';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { AuthService } from '../../core/services/auth.service';
import { ClinicalEncounterDetail } from '../../core/models/clinical-encounter.model';
import { dialogEncounter } from '../dynamic-form-renderer/clinical-dialog.fixture';

describe('EncounterDetailPageComponent saved snapshot editing', () => {
  let fixture: ComponentFixture<EncounterDetailPageComponent>; let component: EncounterDetailPageComponent; let record: ClinicalEncounterDetail;
  const printEnabled=signal(true);
  let params: BehaviorSubject<ReturnType<typeof convertToParamMap>>;
  let service: { getById: ReturnType<typeof vi.fn>; update: ReturnType<typeof vi.fn> }; const user = signal<{ id: string } | null>(null);
  beforeEach(async () => {
    const options = new Intl.DateTimeFormat().resolvedOptions();
    vi.spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions').mockReturnValue({ ...options, timeZone: 'America/Argentina/Buenos_Aires' });
    printEnabled.set(true);
    params = new BehaviorSubject(convertToParamMap({ id: '77' }));
    user.set({ id: 'doctor-a' }); record = dialogEncounter(); service = { getById: vi.fn().mockImplementation(() => of(structuredClone(record))), update: vi.fn().mockImplementation((_id, request) => of({ ...record, version: 7, formValues: request.values, encounterDate: request.encounterDate })) };
    await TestBed.configureTestingModule({ imports: [EncounterDetailPageComponent], providers: [provideRouter([]), { provide: ActivatedRoute, useValue: { paramMap: params } }, { provide: PatientRecordActionsService, useValue: { has: () => printEnabled() } },{provide:ActivePatientService,useValue:{activePatient:signal(null), loadPatient:vi.fn()}},{ provide: ClinicalEncounterService, useValue: service }, { provide: AuthService, useValue: { currentUser: user } }] }).compileComponents();
    fixture = TestBed.createComponent(EncounterDetailPageComponent); component = fixture.componentInstance; fixture.detectChanges();
    await fixture.whenStable(); fixture.detectChanges();
  });
  function edit(): void { component.startEditing(); component.onValuesChange({ readingA: 0, readingB: 20, notes: 'Edición local', result: 100, unknown: 'No enviar' }); component.formValid.set(true); }
  it('displays a saved next consultation and preserves edits or clearing in the update payload', async () => {
    record.formDefinitionSnapshot.categories[0].fields.push({ key: 'followUpDate', label: 'Próximo control', type: 'DATE', required: false });
    record.formValues['followUpDate'] = '2028-02-29'; record.followUpDate = '2028-02-29';
    await component.loadEncounter(77); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-field-key="followUpDate"]').textContent).toContain('29/02/2028');
    component.startEditing();
    component.onValuesChange({ ...record.formValues, followUpDate: '2028-03-01' }); component.formValid.set(true);
    await component.save();
    expect(service.update.mock.calls[0][1].values.followUpDate).toBe('2028-03-01');
    component.startEditing();
    component.onValuesChange({ ...record.formValues, followUpDate: null }); component.formValid.set(true);
    await component.save();
    expect(service.update.mock.calls[1][1].values.followUpDate).toBeNull();
  });
  it('hides and blocks printing while keeping the stored consultation readable', () => {
    const print=vi.spyOn(window,'print').mockImplementation(()=>{});
    printEnabled.set(false); fixture.detectChanges();
    component.printEncounter();
    expect(print).not.toHaveBeenCalled();
    expect([...fixture.nativeElement.querySelectorAll('button')].some((el:any)=>el.textContent.trim()==='Imprimir')).toBe(false);
    expect(component.encounter()).toEqual(record);
  });
  it('displays its snapshot, backend result and Argentine instant without fetching a current template', () => {
    expect(service.getById).toHaveBeenCalledWith(77); expect(fixture.nativeElement.textContent).toContain('Consulta inédita');
    expect(fixture.nativeElement.textContent).toContain('01/01/2026 11:03');
    expect(fixture.nativeElement.textContent).toContain('5');
    expect(component.encounter()?.formDefinitionSnapshot).toEqual(record.formDefinitionSnapshot);
  });
  it('updates only canonical values and record revision, preserving the server-assigned instant despite attempted edits', async () => {
    edit(); await component.save();
    expect(service.update).toHaveBeenCalledWith(77, { expectedVersion: 6, encounterDate: '2026-01-01T14:03:45.123Z', consultationType: 'FOLLOW_UP', values: { readingA: 0, readingB: 20, notes: 'Edición local' } });
    expect(component.encounter()?.version).toBe(7); expect(component.isEditing()).toBe(false);
    component.startEditing(); fixture.detectChanges(); expect(fixture.nativeElement.querySelector('input[type="time"]')).toBeNull(); component.formValid.set(true); await component.save();
    expect(service.update).toHaveBeenLastCalledWith(77, expect.objectContaining({ expectedVersion: 7, encounterDate: '2026-01-01T14:03:45.123Z' }));
  });
  it('preserves local edits and revision after a record conflict until explicit server adoption', async () => {
    edit(); service.update.mockReturnValueOnce(throwError(() => ({ status: 409, error: { code: 'VERSION_CONFLICT' } })));
    await component.save(); record = { ...record, version: 12, formValues: { ...record.formValues, notes: 'Servidor' } };
    await component.reviewRemote(); expect(component.values()['notes']).toBe('Edición local'); expect(component.encounter()?.version).toBe(6);
    await component.save(); expect(service.update).toHaveBeenCalledTimes(1);
    component.useRemoteRecord(); expect(component.values()['notes']).toBe('Servidor'); expect(component.encounter()?.version).toBe(12);
  });
  it('blocks concurrent saves, keeps responses on errors and restores the saved snapshot on explicit cancel', async () => {
    edit(); const pending = new Subject<ClinicalEncounterDetail>(); service.update.mockReturnValueOnce(pending);
    const request = component.save(); await component.save(); expect(service.update).toHaveBeenCalledTimes(1);
    pending.error({ status: 400, error: { message: 'Dato inválido.' } }); await request;
    expect(component.values()['notes']).toBe('Edición local'); expect(component.hasConflict()).toBe(false);
    component.cancelEditing(); expect(component.values()['notes']).toBe('Consulta guardada'); expect(component.isEditing()).toBe(false);
  });
  it('ignores old loads after navigating to a different record and after leaving the page', async () => {
    const pending = new Subject<ClinicalEncounterDetail>(); service.getById.mockReturnValueOnce(pending);
    const request = component.loadEncounter(77);
    service.getById.mockReturnValueOnce(of({ ...record, id: 88 }));
    params.next(convertToParamMap({ id: '88' })); await fixture.whenStable();
    pending.next(record); pending.complete(); await request; expect(component.encounter()?.id).toBe(88);
    const late = new Subject<ClinicalEncounterDetail>(); service.getById.mockReturnValueOnce(late);
    const loading = component.loadEncounter(77); fixture.destroy(); await loading;
    expect(late.observed).toBe(false);
  });
  it('drops a save response when identity changes and does not accept another patient record', async () => {
    edit(); const pending = new Subject<ClinicalEncounterDetail>(); service.update.mockReturnValueOnce(pending);
    const request = component.save(); user.set({ id: 'doctor-b' }); pending.next({ ...record, version: 7 }); pending.complete(); await request;
    expect(component.encounter()?.version).toBe(6); fixture.detectChanges(); expect(component.encounter()).toBeNull();
  });

  it('clears the record on invalid route identifiers and does not fetch an arbitrary id', async () => {
    const before = service.getById.mock.calls.length;
    params.next(convertToParamMap({ id: 'invalid' })); fixture.detectChanges();
    expect(component.encounter()).toBeNull(); expect(component.requestedId()).toBeNull();
    expect(service.getById.mock.calls.length).toBe(before);
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
  });
  it('returns to this patient history from the detail and its breadcrumb', async () => {
    await component.loadEncounter(record.id); fixture.detectChanges();
    const links = [...fixture.nativeElement.querySelectorAll('a')] as HTMLAnchorElement[];
    expect(links.some(link => link.textContent?.includes('Volver') && link.getAttribute('href') === '/pacientes/' + record.patientId + '?tab=historia')).toBe(true);
    expect(links.some(link => link.getAttribute('href') === '/consultas')).toBe(false);
  });
});
