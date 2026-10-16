import { beforeEach, describe, expect, it, vi } from 'vitest';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { EncounterFormComponent } from './encounter-form.component';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { AuthService } from '../../core/services/auth.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { ClinicalEncounterDetail, ConsultationType } from '../../core/models/clinical-encounter.model';
import { WizardFormValues } from '../../core/models/wizard-definition.model';
import { dialogEncounter, dialogWorkspace } from '../dynamic-form-renderer/clinical-dialog.fixture';

describe('EncounterFormComponent inline clinical creation', () => {
  let fixture: ComponentFixture<EncounterFormComponent>;
  let component: EncounterFormComponent;
  let workspace: ReturnType<typeof dialogWorkspace>;
  let service: { create: ReturnType<typeof vi.fn> };
  let store: { loadSetup: ReturnType<typeof vi.fn> };
  const user = signal<{ id: string } | null>(null);

  beforeEach(async () => {
    const options = new Intl.DateTimeFormat().resolvedOptions();
    vi.spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions').mockReturnValue({ ...options, timeZone: 'America/Argentina/Buenos_Aires' });
    user.set({ id: 'doctor-a' });
    workspace = dialogWorkspace();
    service = { create: vi.fn().mockReturnValue(of(dialogEncounter())) };
    store = { loadSetup: vi.fn().mockImplementation(async () => structuredClone(workspace)) };

    await TestBed.configureTestingModule({
      imports: [EncounterFormComponent],
      providers: [
        { provide: ClinicalEncounterService, useValue: service },
        { provide: WorkspaceStore, useValue: store },
        { provide: AuthService, useValue: { currentUser: user } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EncounterFormComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('patientId', 22);
    fixture.componentRef.setInput('patientName', 'Juan Perez');
    fixture.detectChanges();
    await vi.waitFor(() => expect(component.definition()).not.toBeNull());
    fixture.detectChanges();
  });

  function fill(): void {
    component.onDynamicDataChange({
      readingA: 0,
      readingB: 10,
      notes: 'Sin aliases',
      result: 999,
      unknown: 'No enviar',
    });
    component.onDynamicFormValidityChange(true);
  }

  it('renders inline without modal-backdrop or dialog wrappers', () => {
    expect(fixture.nativeElement.querySelector('.modal-backdrop')).toBeNull();
    expect(fixture.nativeElement.querySelector('.modal-card')).toBeNull();
    expect(fixture.nativeElement.querySelector('.encounter-form-card')).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Juan Perez');
  });

  it('submits encounter with valid metadata and dynamic fields', async () => {
    fill();
    await component.submitEncounter();

    expect(service.create).toHaveBeenCalledWith({
      patientId: 22,
      workspaceVersion: 9,
      consultationType: 'FIRST_VISIT',
      values: { readingA: 0, readingB: 10, notes: 'Sin aliases' },
    });
    expect(fixture.nativeElement.querySelector('app-date-picker')).toBeNull();
    expect(fixture.nativeElement.querySelector('input[type="date"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('input[type="time"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('.readonly-datetime-box')).not.toBeNull();
  });

  it('emits cancel when back link or cancel button is clicked', () => {
    const cancelSpy = vi.fn();
    component.cancel.subscribe(cancelSpy);

    component.onCancel();
    expect(cancelSpy).toHaveBeenCalledTimes(1);
  });

  it('initializes automatically with current date and time without requiring manual selection', async () => {
    fill();
    expect(component.recordedInstant()).toBeTruthy();
    expect(component.encounterDay()).toBeTruthy();
    expect(component.encounterTime()).toBeTruthy();


    await component.submitEncounter();
    expect(service.create).toHaveBeenCalledWith(
      expect.objectContaining({
        patientId: 22,
        workspaceVersion: 9,
        consultationType: 'FIRST_VISIT',
      }),
    );
  });

  it('displays read-only Argentine date and time formatted in real time', () => {
    component.recordedInstant.set('2026-10-07T22:15:00.000Z');
    fixture.detectChanges();
    // 22:15 UTC -> 19:15 in America/Argentina/Buenos_Aires (UTC-3)
    expect(component.formattedCurrentDateTime()).toContain('07/10/2026');
    expect(component.formattedCurrentDateTime()).toContain('19:15 hs');
    expect(fixture.nativeElement.querySelector('.datetime-value').textContent).toContain('07/10/2026');
    expect(fixture.nativeElement.querySelector('.datetime-value').textContent).toContain('19:15 hs');
    expect(fixture.nativeElement.querySelector('app-date-picker')).toBeNull();
    expect(fixture.nativeElement.querySelector('input[type="time"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('.datetime-tag')).toBeNull();
  });

  it('locks to Primera Consulta when previous encounters count is 0 and renders horizontal badge without select', async () => {
    fixture.componentRef.setInput('previousEncountersCount', 0);
    fixture.detectChanges();

    expect(component.isFirstVisitLocked()).toBe(true);
    expect(component.consultationType()).toBe('FIRST_VISIT');
    expect(component.availableConsultationTypes()).toEqual([{ value: 'FIRST_VISIT', label: 'Primera consulta' }]);

    const select = fixture.nativeElement.querySelector('select');
    expect(select).toBeNull();

    const lockedChip = fixture.nativeElement.querySelector('.consultation-chip.locked');
    expect(lockedChip).not.toBeNull();
    expect(lockedChip.textContent).toContain('Primera consulta');
    expect(lockedChip.textContent).toContain('Única opción');

    // Attempting to change type is blocked
    component.selectConsultationType('FOLLOW_UP');
    expect(component.consultationType()).toBe('FIRST_VISIT');

    fill();
    await component.submitEncounter();
    expect(service.create).toHaveBeenCalledWith(
      expect.objectContaining({
        consultationType: 'FIRST_VISIT',
      }),
    );
  });

  it('enables all options EXCEPT Primera Consulta when previous encounters >= 1 with single active selection', async () => {
    fixture.componentRef.setInput('previousEncountersCount', 2);
    fixture.detectChanges();

    expect(component.isFirstVisitLocked()).toBe(false);
    expect(component.consultationType()).toBe('FOLLOW_UP');

    const types = component.availableConsultationTypes();
    expect(types.map(t => t.value)).toEqual([
      'FOLLOW_UP',
      'ROUTINE_CHECKUP',
      'EMERGENCY',
      'INTERCONSULTATION',
    ]);
    expect(types.some(t => t.value === 'FIRST_VISIT')).toBe(false);

    // No select dropdown
    expect(fixture.nativeElement.querySelector('select')).toBeNull();

    // Check DOM buttons
    const buttons = fixture.nativeElement.querySelectorAll('.consultation-chips-row button') as NodeListOf<HTMLButtonElement>;
    expect(buttons.length).toBe(4);

    // Initial selected is FOLLOW_UP
    const activeButtonsBefore = fixture.nativeElement.querySelectorAll('.consultation-chip.active');
    expect(activeButtonsBefore.length).toBe(1);
    expect(activeButtonsBefore[0].textContent).toContain('Control / seguimiento');

    // Select Urgencia (EMERGENCY)
    const emergencyBtn = Array.from(buttons).find(b => b.textContent?.includes('Urgencia'));
    expect(emergencyBtn).toBeDefined();
    emergencyBtn?.click();
    fixture.detectChanges();

    expect(component.consultationType()).toBe('EMERGENCY');
    const activeButtonsAfter = fixture.nativeElement.querySelectorAll('.consultation-chip.active');
    expect(activeButtonsAfter.length).toBe(1);
    expect(activeButtonsAfter[0].textContent).toContain('Urgencia');

    fill();
    await component.submitEncounter();
    expect(service.create).toHaveBeenCalledWith(
      expect.objectContaining({
        consultationType: 'EMERGENCY',
      }),
    );
  });

  it('restores draft values and consultation type from PatientEncountersStore across recreations', async () => {
    const draftStore = {
      encounterDraftValues: signal<WizardFormValues>({ readingA: 42, notes: 'Borrador guardado' }),
      encounterDraftConsultationType: signal<ConsultationType | null>('EMERGENCY'),
      encounterDraftInstant: signal<string | null>('2026-10-07T18:00:00.000Z'),
      setEncounterDraft: vi.fn((vals, type, inst) => {
        draftStore.encounterDraftValues.set(vals);
        if (type) draftStore.encounterDraftConsultationType.set(type);
        if (inst) draftStore.encounterDraftInstant.set(inst);
      }),
      clearEncounterDraft: vi.fn(() => {
        draftStore.encounterDraftValues.set({});
        draftStore.encounterDraftConsultationType.set(null);
        draftStore.encounterDraftInstant.set(null);
      }),
    };

    const draftFixture = TestBed.createComponent(EncounterFormComponent);
    // Provide draftStore
    (draftFixture.componentInstance as any).historyStore = draftStore;
    draftFixture.componentRef.setInput('patientId', 22);
    draftFixture.componentRef.setInput('previousEncountersCount', 3);
    draftFixture.detectChanges();
    await vi.waitFor(() => expect(draftFixture.componentInstance.definition()).not.toBeNull());
    draftFixture.detectChanges();

    expect(draftFixture.componentInstance.dynamicFormData()).toEqual({
      readingA: 42,
      notes: 'Borrador guardado',
    });
    expect(draftFixture.componentInstance.consultationType()).toBe('EMERGENCY');
    expect(draftFixture.componentInstance.recordedInstant()).toBe('2026-10-07T18:00:00.000Z');

    // Updating data updates store draft
    draftFixture.componentInstance.onDynamicDataChange({ readingA: 99, notes: 'Editado' });
    expect(draftStore.setEncounterDraft).toHaveBeenCalledWith(
      { readingA: 99, notes: 'Editado' },
      'EMERGENCY',
      '2026-10-07T18:00:00.000Z',
    );

    // Canceling clears draft
    draftFixture.componentInstance.onCancel();
    expect(draftStore.clearEncounterDraft).toHaveBeenCalled();
  });
});
