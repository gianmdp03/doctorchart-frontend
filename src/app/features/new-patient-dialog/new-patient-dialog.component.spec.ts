import { beforeEach, describe, expect, it, vi } from 'vitest';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { NewPatientDialogComponent } from './new-patient-dialog.component';
import { PatientService } from '../../core/services/patient.service';
import { AuthService } from '../../core/services/auth.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { PatientDetailDTO } from '../../core/models/patient.model';
import { dialogPatient, dialogWorkspace } from '../dynamic-form-renderer/clinical-dialog.fixture';

describe('NewPatientDialogComponent canonical creates and edits', () => {
  let fixture: ComponentFixture<NewPatientDialogComponent>; let component: NewPatientDialogComponent;
  let workspace: ReturnType<typeof dialogWorkspace>; let patient: PatientDetailDTO;
  let service: { createPatient: ReturnType<typeof vi.fn>; updatePatient: ReturnType<typeof vi.fn>; getPatientById: ReturnType<typeof vi.fn> }; let store: { loadSetup: ReturnType<typeof vi.fn> };
  const user = signal<{ id: string } | null>(null);
  beforeEach(async () => {
    user.set({ id: 'doctor-a' }); workspace = dialogWorkspace(); patient = dialogPatient();
    service = { createPatient: vi.fn().mockReturnValue(of(patient)), updatePatient: vi.fn().mockReturnValue(of({ ...patient, version: 4 })), getPatientById: vi.fn().mockImplementation(() => of(structuredClone(patient))) };
    store = { loadSetup: vi.fn().mockImplementation(async () => structuredClone(workspace)) };
    await TestBed.configureTestingModule({ imports: [NewPatientDialogComponent], providers: [{ provide: PatientService, useValue: service }, { provide: WorkspaceStore, useValue: store }, { provide: AuthService, useValue: { currentUser: user } }] }).compileComponents();
    fixture = TestBed.createComponent(NewPatientDialogComponent); component = fixture.componentInstance;
  });
  async function open(edit: PatientDetailDTO | null = null): Promise<void> { fixture.componentRef.setInput('patientToEdit', edit); fixture.componentRef.setInput('isOpen', true); fixture.detectChanges(); await vi.waitFor(() => expect(component.definition()).not.toBeNull()); fixture.detectChanges(); }
  function fill(): void { component.onValuesChange({ identity: 'Nombre inédito', born: '2000-02-29', consent: false, group: 'a', unknown: 'No enviar' }); component.onFormValidityChange(true); }
  it('creates from effective workspace with only its pinned version and canonical values', async () => {
    workspace.draftDefinition = structuredClone(workspace.definition); workspace.draftDefinition!.patientForm.categories[0].title = 'Borrador no aplicado';
    await open(); expect(component.definition()).toEqual(workspace.definition!.patientForm); fill();
    workspace.version = 100; await component.submit();
    expect(service.createPatient).toHaveBeenCalledWith({ workspaceVersion: 9, values: { identity: 'Nombre inédito', born: '2000-02-29', consent: false, group: 'a' } });
    expect(service.updatePatient).not.toHaveBeenCalled();
  });
  it('edits against the saved record snapshot and record version without loading the workspace', async () => {
    patient.formDefinitionSnapshot.categories[0].title = 'Snapshot anterior';
    await open(patient); expect(store.loadSetup).not.toHaveBeenCalled();
    expect(component.definition()?.categories[0].title).toBe('Snapshot anterior'); fill(); await component.submit();
    expect(service.updatePatient).toHaveBeenCalledWith(22, { expectedVersion: 3, values: { identity: 'Nombre inédito', born: '2000-02-29', consent: false, group: 'a' } });
  });
  it('preserves create answers through workspace conflict, reviews separately and retains only unchanged identities on adoption', async () => {
    await open(); fill(); service.createPatient.mockReturnValueOnce(throwError(() => ({ status: 409, error: { code: 'WORKSPACE_VERSION_CONFLICT', message: 'Configuración modificada.' } })));
    await component.submit(); expect(component.conflict()).toBe('workspace'); expect(component.workspace()?.version).toBe(9);
    workspace.version = 18; workspace.definition!.patientForm.categories[0].fields = workspace.definition!.patientForm.categories[0].fields.filter(field => field.key !== 'group');
    workspace.definition!.patientForm.categories[0].fields.find(field => field.key === 'consent')!.type = 'TEXT';
    await component.reviewRemote(); expect(component.values()['group']).toBe('a'); expect(component.workspace()?.version).toBe(9);
    await component.submit(); expect(service.createPatient).toHaveBeenCalledTimes(1);
    component.useRemoteWorkspace(); expect(component.workspace()?.version).toBe(18); expect(component.values()).toEqual({ identity: 'Nombre inédito', born: '2000-02-29' });
  });
  it('keeps local record edits through conflict until explicit replacement, then uses the reviewed version', async () => {
    await open(patient); fill(); service.updatePatient.mockReturnValueOnce(throwError(() => ({ status: 409, error: { code: 'VERSION_CONFLICT' } })));
    await component.submit(); patient = { ...patient, version: 8, formValues: { ...patient.formValues, identity: 'Otro profesional' } };
    await component.reviewRemote(); expect(component.values()['identity']).toBe('Nombre inédito'); expect(component.record()?.version).toBe(3);
    component.useRemoteRecord(); expect(component.values()['identity']).toBe('Otro profesional'); expect(component.record()?.version).toBe(8);
  });
  it('keeps edits on non-conflict server failure and blocks duplicate writes while a request is pending', async () => {
    await open(); fill(); const pending = new Subject<PatientDetailDTO>(); service.createPatient.mockReturnValueOnce(pending);
    const request = component.submit(); await component.submit(); expect(service.createPatient).toHaveBeenCalledTimes(1);
    pending.error({ status: 400, error: { message: 'Revisá los datos.' } }); await request;
    expect(component.values()['identity']).toBe('Nombre inédito'); expect(component.conflict()).toBeNull(); expect(component.isSubmitting()).toBe(false);
  });
  it('ignores a response after patient context or authenticated identity changes', async () => {
    await open(patient); fill(); const pending = new Subject<PatientDetailDTO>(); service.updatePatient.mockReturnValueOnce(pending);
    const updated = vi.fn(); component.patientUpdated.subscribe(updated); const request = component.submit();
    fixture.componentRef.setInput('patientToEdit', { ...patient, id: 99 }); fixture.detectChanges(); pending.next(patient); pending.complete(); await request;
    expect(updated).not.toHaveBeenCalled(); expect(component.record()?.id).toBe(99);
    user.set({ id: 'doctor-b' }); await component.submit(); expect(service.updatePatient).toHaveBeenCalledTimes(1);
  });
});
