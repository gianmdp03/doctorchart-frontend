import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClinicalHistoryFieldsComponent } from './clinical-history-fields.component';
import { DynamicFormRendererComponent } from './dynamic-form-renderer.component';
import {
  createClinicalHistoryCategory,
  createDefaultWizardDefinition,
  withClinicalHistory,
} from '../../core/models/wizard-definition.model';
import { mkdirSync, writeFileSync } from 'node:fs';

describe('System clinical history in patient and encounter forms', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [DynamicFormRendererComponent] }));
  const setup = () => {
    const fixture = TestBed.createComponent(DynamicFormRendererComponent);
    fixture.componentRef.setInput('definition', withClinicalHistory({ categories: [] }));
    fixture.detectChanges();
    return fixture;
  };
  it('is included in both default forms for every specialty and is supplemented only once', () => {
    const d = createDefaultWizardDefinition();
    for (const form of [d.patientForm, d.encounterForm]) {
      expect(form.categories.find((c) => c.key === 'sys_clinical_history')).toEqual(
        createClinicalHistoryCategory(),
      );
      expect(
        withClinicalHistory(form).categories.filter((c) => c.key === 'sys_clinical_history'),
      ).toHaveLength(1);
    }
    expect(createClinicalHistoryCategory().fields.every((f) => f.system)).toBe(true);
  });
  it('does not treat unanswered allergy, condition or medication questions as negative facts', () => {
    const fixture = setup();
    expect(fixture.componentInstance.currentValues()).toEqual({});
    expect(fixture.componentInstance.formValid()).toBe(true);
    expect(fixture.nativeElement.querySelectorAll('textarea')).toHaveLength(0);
    expect(fixture.nativeElement.textContent).toContain('Sin información');
  });
  it('requires details for a positive answer and emits them through the ordinary form values', () => {
    const fixture = setup(),
      renderer = fixture.componentInstance;
    const fields = fixture.debugElement.query(By.directive(ClinicalHistoryFieldsComponent))
      .componentInstance as ClinicalHistoryFieldsComponent;
    const emit = vi.spyOn(renderer.valuesChange, 'emit');
    fields.choose('sys_allergyStatus', 'sys_allergies', 'PRESENT');
    fixture.detectChanges();
    expect(renderer.formValid()).toBe(false);
    expect(fixture.nativeElement.querySelector('#field-sys_allergies')).not.toBeNull();
    fields.update('sys_allergies', 'Penicilina · urticaria');
    fixture.detectChanges();
    expect(renderer.formValid()).toBe(true);
    expect(emit).toHaveBeenLastCalledWith({
      sys_allergyStatus: 'PRESENT',
      sys_allergies: 'Penicilina · urticaria',
    });
  });
  it('clears contradictory details only on an explicit negative answer and preserves the other sections', () => {
    const fixture = setup();
    fixture.componentRef.setInput('values', {
      sys_allergyStatus: 'PRESENT',
      sys_allergies: 'Penicilina',
      sys_conditionStatus: 'PRESENT',
      sys_conditions: 'Asma',
    });
    fixture.detectChanges();
    const fields = fixture.debugElement.query(By.directive(ClinicalHistoryFieldsComponent))
      .componentInstance as ClinicalHistoryFieldsComponent;
    fields.choose('sys_allergyStatus', 'sys_allergies', 'NONE');
    fixture.detectChanges();
    expect(fixture.componentInstance.currentValues()).toMatchObject({
      sys_allergyStatus: 'NONE',
      sys_allergies: null,
      sys_conditions: 'Asma',
    });
    expect(fixture.componentInstance.formValid()).toBe(true);
  });
  it('renders a readable source without editable controls', () => {
    const fixture = setup();
    fixture.componentRef.setInput('values', {
      sys_allergyStatus: 'PRESENT',
      sys_allergies: 'Penicilina',
    });
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button,input,textarea,select')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Penicilina');
  });
  it('renders representative form states for visual review', async () => {
    const fixture = setup();
    fixture.componentRef.setInput('values', {
      sys_allergyStatus: 'PRESENT',
      sys_allergies: 'Penicilina · urticaria',
      sys_conditionStatus: 'PRESENT',
      sys_conditions: 'Asma en seguimiento',
      sys_medicationStatus: 'NONE',
      sys_historySource: 'REPORTED',
    });
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#field-sys_allergies').value).toBe(
      'Penicilina · urticaria',
    );
    const markup = fixture.nativeElement.cloneNode(true) as HTMLElement;
    for (const textarea of markup.querySelectorAll('textarea')) {
      textarea.textContent = (
        fixture.nativeElement.querySelector('#' + textarea.id) as HTMLTextAreaElement
      ).value;
    }
    const styles = [...document.querySelectorAll('style')].map((s) => s.textContent).join('\n');
    mkdirSync('.angular/clinical-summary', { recursive: true });
    writeFileSync(
      '.angular/clinical-summary/patient-history-form.html',
      `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:24px;font-family:Arial,sans-serif;background:#f6f8fa}*{box-sizing:border-box}${styles}</style></head><body>${markup.outerHTML}</body></html>`,
    );
  });
});
