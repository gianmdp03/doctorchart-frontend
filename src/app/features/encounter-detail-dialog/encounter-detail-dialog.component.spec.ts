import { beforeEach, describe, expect, it, vi } from 'vitest';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { EncounterDetailDialogComponent } from './encounter-detail-dialog.component';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { AuthService } from '../../core/services/auth.service';
import { ClinicalEncounterDetail } from '../../core/models/clinical-encounter.model';
import { dialogEncounter } from '../dynamic-form-renderer/clinical-dialog.fixture';

describe('EncounterDetailDialogComponent saved snapshot editing', () => {
  let fixture: ComponentFixture<EncounterDetailDialogComponent>; let component: EncounterDetailDialogComponent; let record: ClinicalEncounterDetail;
  let service: { getById: ReturnType<typeof vi.fn>; update: ReturnType<typeof vi.fn> }; const user = signal<{ id: string } | null>(null);
  beforeEach(async () => {
    user.set({ id: 'doctor-a' }); record = dialogEncounter(); service = { getById: vi.fn().mockImplementation(() => of(structuredClone(record))), update: vi.fn().mockImplementation((_id, request) => of({ ...record, version: 7, formValues: request.values, encounterDate: request.encounterDate })) };
    await TestBed.configureTestingModule({ imports: [EncounterDetailDialogComponent], providers: [{ provide: ClinicalEncounterService, useValue: service }, { provide: AuthService, useValue: { currentUser: user } }] }).compileComponents();
    fixture = TestBed.createComponent(EncounterDetailDialogComponent); component = fixture.componentInstance; fixture.detectChanges();
    component.openModal(new CustomEvent('open-encounter-detail-modal', { detail: { encounter: record } })); fixture.detectChanges();
  });
  function edit(): void { component.startEditing(); component.onValuesChange({ readingA: 0, readingB: 20, notes: 'Edición local', result: 100, unknown: 'No enviar' }); component.formValid.set(true); }
  it('displays its snapshot, backend result and Argentine instant without fetching a current template', () => {
    expect(service.getById).not.toHaveBeenCalled(); expect(fixture.nativeElement.textContent).toContain('Consulta inédita');
    expect(fixture.nativeElement.textContent).toContain('01/01/2026 11:03');
    expect(fixture.nativeElement.textContent).toContain('5');
    expect(component.encounter()?.formDefinitionSnapshot).toEqual(record.formDefinitionSnapshot);
  });
  it('updates only canonical values and record revision, preserving the original exact instant until edited', async () => {
    edit(); await component.save();
    expect(service.update).toHaveBeenCalledWith(77, { expectedVersion: 6, encounterDate: '2026-01-01T14:03:45.123Z', consultationType: 'FOLLOW_UP', values: { readingA: 0, readingB: 20, notes: 'Edición local' } });
    expect(component.encounter()?.version).toBe(7); expect(component.isEditing()).toBe(false);
    component.startEditing(); component.encounterTime.set('12:15'); component.formValid.set(true); await component.save();
    expect(service.update).toHaveBeenLastCalledWith(77, expect.objectContaining({ expectedVersion: 7, encounterDate: '2026-01-01T12:15:00-03:00' }));
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
  it('ignores old loads after opening a different record and after closing the modal', async () => {
    const pending = new Subject<ClinicalEncounterDetail>(); service.getById.mockReturnValueOnce(pending);
    const request = component.loadEncounter(77);
    component.openModal(new CustomEvent('open-encounter-detail-modal', { detail: { encounter: { ...record, id: 88 } } }));
    pending.next(record); pending.complete(); await request; expect(component.encounter()?.id).toBe(88);
    const late = new Subject<ClinicalEncounterDetail>(); service.getById.mockReturnValueOnce(late);
    const loading = component.loadEncounter(77); component.closeModal(); late.next(record); late.complete(); await loading;
    expect(component.encounter()).toBeNull(); expect(component.isOpen()).toBe(false);
  });
  it('drops a save response when identity changes and does not accept another patient record', async () => {
    edit(); const pending = new Subject<ClinicalEncounterDetail>(); service.update.mockReturnValueOnce(pending);
    const request = component.save(); user.set({ id: 'doctor-b' }); pending.next({ ...record, version: 7 }); pending.complete(); await request;
    expect(component.encounter()?.version).toBe(6); fixture.detectChanges(); expect(component.encounter()).toBeNull(); expect(component.isOpen()).toBe(false);
  });
});
