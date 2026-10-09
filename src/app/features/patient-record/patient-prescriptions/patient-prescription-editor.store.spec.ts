import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PatientPrescriptionEditorStore } from './patient-prescription-editor.store';
import { PatientPrescriptionStore } from './patient-prescription.store';
import { WorkspaceStore } from '../../../core/services/workspace.store';
import { AuthService } from '../../../core/services/auth.service';
import { ActivePatientService } from '../../../core/services/active-patient.service';
import { PatientRecordActionsService } from '../../../core/experience/patient-record-actions.service';
import { ClinicalDocumentPrintService } from '../../../core/services/clinical-document-print.service';

describe('Reactive prescription validation', () => {
  let editor: PatientPrescriptionEditorStore;
  let history: { save: ReturnType<typeof vi.fn>; error: ReturnType<typeof signal<string | null>> };
  beforeEach(() => {
    history = { save: vi.fn(), error: signal<string | null>(null) };
    TestBed.configureTestingModule({ providers: [
      PatientPrescriptionEditorStore,
      { provide: WorkspaceStore, useValue: { hasRecordTab: () => true } },
      { provide: AuthService, useValue: { currentUser: signal({ id: 'doctor-a' }) } },
      { provide: ActivePatientService, useValue: { activePatient: signal({ id: 10 }), patientId: () => 10 } },
      { provide: PatientRecordActionsService, useValue: { has: () => true } },
      { provide: ClinicalDocumentPrintService, useValue: { openPdfInNewTab: vi.fn() } },
      { provide: PatientPrescriptionStore, useValue: { ...history, records: signal([]), success: signal(null), busy: signal(false), loadError: signal(null), setPatient: vi.fn() } },
    ] });
    editor = TestBed.inject(PatientPrescriptionEditorStore);
    TestBed.tick();
  });
  it('blocks fractional, zero, negative and nonnumeric durations without silently discarding them', () => {
    editor.rxMedicationName.set('Amoxicilina');
    for (const value of ['0', '-1', '1,5', 'abc', '2147483648']) {
      editor.setDuration(value);
      expect(editor.medicationErrors().duration).toBeTruthy();
      editor.addMedicationToDraft();
      expect(editor.draftPrescriptions()).toEqual([]);
      editor.saveCurrentRxToHistory();
      expect(history.save).not.toHaveBeenCalled();
    }
    editor.setDuration('7');
    expect(editor.medicationErrors().duration).toBeNull();
    editor.saveCurrentRxToHistory();
    expect(history.save).toHaveBeenCalledWith(expect.objectContaining({ prescriptions: [expect.objectContaining({ durationDays: 7 })] }), undefined);
  });
  it('blocks a pending invalid medication even when valid medications already exist', () => {
    editor.rxMedicationName.set('Primero'); editor.addMedicationToDraft();
    editor.rxMedicationName.set('Segundo'); editor.rxDosage.set('x'.repeat(501));
    editor.saveCurrentRxToHistory();
    expect(history.save).not.toHaveBeenCalled();
    expect(editor.rxMedicationName()).toBe('Segundo');
    expect(editor.draftPrescriptions()).toHaveLength(1);
    editor.rxDosage.set('1 comprimido'); editor.saveCurrentRxToHistory();
    expect(history.save).toHaveBeenCalled();
  });
  it('validates total study length and document text before committing pending inputs', () => {
    editor.rxStudyName.set('x'.repeat(1500)); editor.rxStudySpecification.set('y'.repeat(600));
    expect(editor.studyErrors().specification).toContain('2000');
    editor.addStudyToDraft(); expect(editor.draftStudies()).toEqual([]);
    editor.rxStudySpecification.set('Control'); editor.rxDiagnosis.set('x'.repeat(4001));
    editor.saveCurrentRxToHistory(); expect(history.save).not.toHaveBeenCalled();
    expect(editor.draftStudies()).toEqual([]);
    editor.rxDiagnosis.set('Control'); editor.saveCurrentRxToHistory();
    expect(history.save).toHaveBeenCalled();
  });
});
