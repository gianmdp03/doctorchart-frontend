import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DatePickerComponent } from '../../shared/date-picker/date-picker.component';
import { WizardFormDefinition, WizardFormValues, WizardFormulaResult } from '../../core/models/wizard-definition.model';
import { customSpecialtyFixture } from '../onboarding/testing/custom-specialty.fixture';
import { DynamicFormRendererComponent } from './dynamic-form-renderer.component';

describe('DynamicFormRendererComponent canonical fields', () => {
  let fixture: ComponentFixture<DynamicFormRendererComponent>; let component: DynamicFormRendererComponent; let definition: WizardFormDefinition;
  const values: WizardFormValues = { identity: 'Paciente', born: '2001-03-04', consent: false, group: 'a', readingA: 0, readingB: 10, notes: 'Nota libre' };
  beforeEach(async () => {
    definition = { categories: structuredClone([...customSpecialtyFixture.definition.patientForm.categories, ...customSpecialtyFixture.definition.encounterForm.categories]) };
    await TestBed.configureTestingModule({ imports: [DynamicFormRendererComponent] }).compileComponents();
    fixture = TestBed.createComponent(DynamicFormRendererComponent); component = fixture.componentInstance;
    fixture.componentRef.setInput('definition', definition); fixture.componentRef.setInput('values', structuredClone(values)); fixture.detectChanges();
  });
  it('renders unfamiliar stable categories and all seven field types with the shared date selector', () => {
    expect(fixture.nativeElement.querySelector('[data-category-key="new_patient_category"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('[data-field-key="identity"] input')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('[data-field-key="readingA"] input[inputmode="decimal"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('[data-field-key="notes"] textarea')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('[data-field-key="group"] select')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('[data-field-key="consent"] select')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('[data-field-key="result"] output')).not.toBeNull();
    expect(fixture.debugElement.queryAll(By.directive(DatePickerComponent))).toHaveLength(1);
    expect(fixture.nativeElement.querySelector('input[type="date"]')).toBeNull();
    expect(component.formValid()).toBe(true);
  });
  it('uses Argentine display and emits only an ISO date at the value boundary', () => {
    let emitted: WizardFormValues = {}; component.valuesChange.subscribe(value => emitted = value);
    const datePicker = fixture.debugElement.query(By.directive(DatePickerComponent)).componentInstance as DatePickerComponent;
    datePicker.selectDate(new Date(2000, 1, 29));
    expect(emitted['born']).toBe('2000-02-29');
    fixture.componentRef.setInput('readonly', true); fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('29/02/2000');
    expect(fixture.nativeElement.textContent).toContain('Grupo A'); expect(fixture.nativeElement.textContent).toContain('No');
  });
  it('accepts zero and required false while rejecting wrong types, nonfinite numbers and invalid options', () => {
    const number = component.fields().find(field => field.key === 'readingA')!;
    expect(component.validField(number)).toBe(true);
    component.setValue(number, Number.NaN); expect(component.formValid()).toBe(false);
    component.setValue(number, '0'); expect(component.formValid()).toBe(false);
    component.setValue(number, 101); expect(component.formValid()).toBe(false);
    component.setValue(number, -10); expect(component.formValid()).toBe(true);
    const boolean = component.fields().find(field => field.key === 'consent')!;
    component.setValue(boolean, null); expect(component.formValid()).toBe(false);
    component.setValue(boolean, false); expect(component.formValid()).toBe(true);
    component.setValue(boolean, 'false'); expect(component.formValid()).toBe(false);
    component.setValue(boolean, false);
    component.setValue(component.fields().find(field => field.key === 'group')!, 'unknown'); expect(component.formValid()).toBe(false);
  });
  it('checks real calendar dates, required whitespace and optional null values', () => {
    const date = component.fields().find(field => field.key === 'born')!;
    component.setValue(date, '2025-02-29'); expect(component.formValid()).toBe(false);
    component.setValue(date, '2024-02-29'); expect(component.formValid()).toBe(true);
    component.setValue(date, '9999-01-01'); expect(component.formValid()).toBe(false);
    component.setValue(date, '2000-01-01');
    component.setValue(component.fields().find(field => field.key === 'identity')!, '  '); expect(component.formValid()).toBe(false);
    component.setValue(component.fields().find(field => field.key === 'identity')!, 'Paciente');
    component.setValue(component.fields().find(field => field.key === 'readingA')!, null); expect(component.formValid()).toBe(true);
  });
  it('evaluates recursive strict boolean visibility and preserves hidden input values without formula or unknown keys', () => {
    definition.categories[0].fields.push({ key: 'nested', label: 'Control anidado', type: 'BOOLEAN', required: false, visibleWhen: { fieldKey: 'consent', equals: true } }, { key: 'hidden', label: 'Campo dependiente', type: 'TEXT', required: true, visibleWhen: { fieldKey: 'nested', equals: false } });
    definition.categories.push({ key: 'disabled', title: 'Inactiva', enabled: false, fields: [{ key: 'preserved', label: 'Conservado', type: 'TEXT', required: true }] });
    fixture.componentRef.setInput('definition', structuredClone(definition)); fixture.componentRef.setInput('values', { ...values, nested: false, hidden: 'Valor oculto', preserved: 'Categoría inactiva', unknown: 'No enviar', result: 999 }); fixture.detectChanges();
    expect(component.isFieldVisible('hidden')).toBe(false); expect(component.formValid()).toBe(true);
    let emitted: WizardFormValues = {}; component.valuesChange.subscribe(value => emitted = value);
    const boolean = component.fields().find(field => field.key === 'consent')!;
    component.setValue(boolean, 'true'); expect(component.isFieldVisible('nested')).toBe(false);
    component.setValue(boolean, true); expect(component.isFieldVisible('hidden')).toBe(true);
    expect(emitted['hidden']).toBe('Valor oculto'); expect(emitted['preserved']).toBe('Categoría inactiva');
    expect(emitted).not.toHaveProperty('unknown'); expect(emitted).not.toHaveProperty('result');
  });
  it('fails closed on a visibility cycle and on a disabled controller category', () => {
    definition.categories[0].fields.push({ key: 'cycleA', label: 'A', type: 'BOOLEAN', required: true, visibleWhen: { fieldKey: 'cycleB', equals: true } }, { key: 'cycleB', label: 'B', type: 'BOOLEAN', required: true, visibleWhen: { fieldKey: 'cycleA', equals: true } });
    fixture.componentRef.setInput('definition', structuredClone(definition)); fixture.detectChanges();
    expect(component.isFieldVisible('cycleA')).toBe(false);
    definition.categories[1].fields[3].visibleWhen = { fieldKey: 'consent', equals: false }; definition.categories[0].enabled = false;
    fixture.componentRef.setInput('definition', structuredClone(definition)); fixture.detectChanges();
    expect(component.isFieldVisible('notes')).toBe(false);
  });
  it('displays authoritative formula statuses, including zero, and never sends a computed value', () => {
    const formula = component.fields().find(field => field.key === 'result')!;
    const cases: { status: WizardFormulaResult['status']; value: number | null; text: string }[] = [
      { status: 'READY', value: 0, text: '0' }, { status: 'MISSING_INPUT', value: null, text: 'Faltan datos' }, { status: 'DIVISION_BY_ZERO', value: null, text: 'dividir por cero' }, { status: 'NOT_APPLICABLE', value: null, text: 'No corresponde' }, { status: 'INVALID_INPUT', value: null, text: 'Revisá los datos' },
    ];
    for (const result of cases) { fixture.componentRef.setInput('formulaResults', { result: { status: result.status, value: result.value } }); fixture.detectChanges(); expect(component.formulaText(formula)).toContain(result.text); }
    fixture.componentRef.setInput('formulaResults', { result: { status: 'READY', value: 5 } }); fixture.detectChanges();
    let emitted: WizardFormValues = {}; component.valuesChange.subscribe(value => emitted = value);
    component.setValue(formula, 123); expect(emitted).toEqual({});
    component.setValue(component.fields().find(field => field.key === 'readingA')!, 4);
    expect(component.formulaText(formula)).toBe('Se actualizará al guardar'); expect(emitted).not.toHaveProperty('result');
  });
  it('blocks mutations in readonly mode and reports initial validity', () => {
    fixture.componentRef.setInput('readonly', true); fixture.detectChanges();
    component.setValue(component.fields()[0], 'Alterado'); expect(component.currentValues()['identity']).toBe('Paciente');
    fixture.componentRef.setInput('values', {}); fixture.detectChanges(); expect(component.formValid()).toBe(false);
  });
  it('keeps invalid optional numeric input invalid and clears its inline error as it is corrected', async () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('[data-field-key="readingA"] input');
    input.value = 'abc'; input.dispatchEvent(new Event('input')); fixture.detectChanges(); await fixture.whenStable();
    expect(component.currentValues()['readingA']).toBe('abc');
    expect(component.formValid()).toBe(false);
    expect(fixture.nativeElement.querySelector('[data-field-key="readingA"] .field-error').textContent).toContain('número válido');
    input.value = '12,5'; input.dispatchEvent(new Event('input')); fixture.detectChanges(); await fixture.whenStable();
    expect(component.currentValues()['readingA']).toBe(12.5);
    expect(component.formValid()).toBe(true);
    expect(fixture.nativeElement.querySelector('[data-field-key="readingA"] .field-error')).toBeNull();
  });
  it('preserves decimal typing when a parent echoes values and immediately adopts new limits', () => {
    const field = component.fields().find(field => field.key === 'readingA')!;
    component.valuesChange.subscribe(values => fixture.componentRef.setInput('values', values));
    component.setNumberValue(field, '12,'); fixture.detectChanges();
    expect(component.numberInput(field)).toBe('12,');
    component.setNumberValue(field, '12,5'); fixture.detectChanges();
    expect(component.currentValues()['readingA']).toBe(12.5);
    const updated = structuredClone(definition);
    updated.categories.flatMap(category => category.fields).find(field => field.key === 'readingA')!.maximum = 10;
    fixture.componentRef.setInput('definition', updated); fixture.detectChanges();
    expect(component.formValid()).toBe(false);
    expect(fixture.nativeElement.textContent).toContain('El valor máximo es 10.');
  });
  it('rejects an impossible date even when the custom date field is optional', async () => {
    const updated = structuredClone(definition);
    updated.categories.flatMap(category => category.fields).find(field => field.key === 'born')!.required = false;
    fixture.componentRef.setInput('definition', updated); fixture.detectChanges(); await fixture.whenStable();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('app-date-picker input');
    input.value = '31/02/2024'; input.dispatchEvent(new Event('input')); fixture.detectChanges(); await fixture.whenStable();
    expect(component.formValid()).toBe(false);
    expect(fixture.nativeElement.querySelector('[data-field-key="born"] .field-error').textContent).toContain('fecha válida');
    input.value = ''; input.dispatchEvent(new Event('input')); fixture.detectChanges(); await fixture.whenStable();
    expect(component.formValid()).toBe(true);
  });
});
