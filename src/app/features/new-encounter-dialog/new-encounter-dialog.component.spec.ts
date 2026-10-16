import { beforeEach, describe, expect, it, vi } from 'vitest';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { NewEncounterDialogComponent } from './new-encounter-dialog.component';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { AuthService } from '../../core/services/auth.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { ClinicalEncounterDetail } from '../../core/models/clinical-encounter.model';
import { dialogEncounter, dialogWorkspace } from '../dynamic-form-renderer/clinical-dialog.fixture';

describe('NewEncounterDialogComponent canonical creation', () => {
  let fixture: ComponentFixture<NewEncounterDialogComponent>; let component: NewEncounterDialogComponent;
  let workspace: ReturnType<typeof dialogWorkspace>; let service: { create: ReturnType<typeof vi.fn> }; let store: { loadSetup: ReturnType<typeof vi.fn> };
  const user = signal<{ id: string } | null>(null);
  beforeEach(async () => {
    user.set({ id: 'doctor-a' }); workspace = dialogWorkspace(); service = { create: vi.fn().mockReturnValue(of(dialogEncounter())) }; store = { loadSetup: vi.fn().mockImplementation(async () => structuredClone(workspace)) };
    await TestBed.configureTestingModule({ imports: [NewEncounterDialogComponent], providers: [{ provide: ClinicalEncounterService, useValue: service }, { provide: WorkspaceStore, useValue: store }, { provide: AuthService, useValue: { currentUser: user } }] }).compileComponents();
    fixture = TestBed.createComponent(NewEncounterDialogComponent); component = fixture.componentInstance; fixture.componentRef.setInput('patientId', 22); fixture.componentRef.setInput('isOpen', true); fixture.detectChanges(); await vi.waitFor(() => expect(component.definition()).not.toBeNull()); fixture.detectChanges();
  });
  function fill(): void { component.onDynamicDataChange({ readingA: 0, readingB: 10, notes: 'Sin aliases', result: 999, unknown: 'No enviar' }); component.onDynamicFormValidityChange(true); }
  it('pins the effective backend definition and sends no specialty, snapshot, projections or template identifier', async () => {
    fill(); workspace.version = 50;
    await component.submitEncounter();
    expect(service.create).toHaveBeenCalledWith({ patientId: 22, workspaceVersion: 9, consultationType: 'FIRST_VISIT', values: { readingA: 0, readingB: 10, notes: 'Sin aliases' } });
    expect(fixture.nativeElement.querySelector('app-date-picker')).toBeNull(); expect(fixture.nativeElement.querySelector('input[type="date"]')).toBeNull();
  });
  it('does not invent a complaint or diagnosis when the encounter form has no categories', async () => {
    component.definition.set({ categories: [] }); component.onDynamicFormValidityChange(true); await component.submitEncounter();
    expect(service.create).toHaveBeenCalledWith(expect.objectContaining({ values: {} }));
    expect(service.create.mock.calls[0][0]).not.toHaveProperty('chiefComplaint');
    expect(service.create.mock.calls[0][0]).not.toHaveProperty('primaryDiagnosisDescription');
  });
  it('keeps answers and pinned revision until explicit adoption after workspace conflict', async () => {
    fill(); service.create.mockReturnValueOnce(throwError(() => ({ status: 409, error: { code: 'WORKSPACE_VERSION_CONFLICT' } })));
    await component.submitEncounter(); expect(component.hasConflict()).toBe(true); expect(component.workspace()?.version).toBe(9);
    workspace.version = 20; workspace.definition!.encounterForm.categories[0].fields = workspace.definition!.encounterForm.categories[0].fields.filter(field => field.key !== 'readingB');
    await component.reviewRemote(); expect(component.dynamicFormData()['readingB']).toBe(10); expect(component.workspace()?.version).toBe(9);
    await component.submitEncounter(); expect(service.create).toHaveBeenCalledTimes(1);
    component.useRemoteWorkspace(); expect(component.dynamicFormData()).toEqual({ readingA: 0, notes: 'Sin aliases' }); expect(component.workspace()?.version).toBe(20);
  });
  it('does not accept date controls and blocks simultaneous creates', async () => {
    fill(); const pending = new Subject<ClinicalEncounterDetail>(); service.create.mockReturnValueOnce(pending);
    const request = component.submitEncounter(); await component.submitEncounter(); expect(service.create).toHaveBeenCalledTimes(1);
    pending.error({ status: 500 }); await request; expect(component.isSubmitting()).toBe(false); expect(component.dynamicFormData()['readingA']).toBe(0);
  });
  it('ignores late results and rejects a submit when the patient or identity changes before effects run', async () => {
    fill(); const pending = new Subject<ClinicalEncounterDetail>(); service.create.mockReturnValueOnce(pending); const emitted = vi.fn(); component.encounterCreated.subscribe(emitted);
    const request = component.submitEncounter(); fixture.componentRef.setInput('patientId', 99);
    pending.next(dialogEncounter()); pending.complete(); await request; expect(emitted).not.toHaveBeenCalled();
    await component.submitEncounter(); expect(service.create).toHaveBeenCalledTimes(1);
    fixture.detectChanges(); await vi.waitFor(() => expect(component.isLoading()).toBe(false));
    user.set({ id: 'doctor-b' }); await component.submitEncounter(); expect(service.create).toHaveBeenCalledTimes(1);
  });
  it('does not populate another patient from a late workspace load', async () => {
    let resolve!: (workspace: ReturnType<typeof dialogWorkspace>) => void;
    store.loadSetup.mockReturnValueOnce(new Promise<ReturnType<typeof dialogWorkspace>>(done => resolve = done));
    fixture.componentRef.setInput('patientId', 99); fixture.detectChanges();
    fixture.componentRef.setInput('patientId', 22); fixture.detectChanges(); await vi.waitFor(() => expect(component.definition()).not.toBeNull());
    const stale = dialogWorkspace(); stale.definition!.encounterForm.categories[0].title = 'Respuesta antigua'; resolve(stale); await Promise.resolve(); fixture.detectChanges();
    expect(component.definition()?.categories[0].title).not.toBe('Respuesta antigua');
  });
});
