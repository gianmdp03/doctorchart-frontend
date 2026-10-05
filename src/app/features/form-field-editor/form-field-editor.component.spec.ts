import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFieldEditorComponent } from './form-field-editor.component';
import { WizardFormDefinition, WizardFormulaDefinition } from '../../core/models/wizard-definition.model';
import { customSpecialtyFixture } from '../onboarding/testing/custom-specialty.fixture';

describe('FormFieldEditorComponent canonical wizard', () => {
  let fixture: ComponentFixture<FormFieldEditorComponent>;
  let component: FormFieldEditorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FormFieldEditorComponent] }).compileComponents();
    fixture = TestBed.createComponent(FormFieldEditorComponent);
    component = fixture.componentInstance;
  });

  function load(form: WizardFormDefinition, section: 'patientForm' | 'encounterForm' = 'encounterForm'): void {
    fixture.componentRef.setInput('definition', structuredClone(form));
    fixture.componentRef.setInput('section', section);
    fixture.detectChanges();
  }

  it('renders the backend contract fixture with arbitrary category keys and no injected defaults', () => {
    load(customSpecialtyFixture.definition.encounterForm);
    expect(component.categories().map(c => c.key)).toEqual(['new_encounter_category']);
    expect(component.allFields()).toEqual(customSpecialtyFixture.definition.encounterForm.categories[0].fields);
    expect(fixture.nativeElement.textContent).toContain('Consulta inédita');
    expect(fixture.nativeElement.querySelectorAll('.field-card')).toHaveLength(4);
    expect(fixture.nativeElement.querySelector('input[type=date]')).toBeNull();
  });

  it('renames, reorders, disables and deletes any category without changing its identity', () => {
    load(customSpecialtyFixture.definition.encounterForm);
    component.newCategoryTitle.set('Categoría nueva'); component.addCategory();
    const key = component.categories()[1].key;
    component.renameCategory(key, 'Nombre modificado'); component.moveCategory(key, -1); component.toggleCategory(key);
    expect(component.categories()[0]).toMatchObject({ key, title: 'Nombre modificado', enabled: false });
    component.deleteCategory('new_encounter_category');
    expect(component.categories().map(c => c.key)).toEqual([key]);
    component.deleteCategory(key);
    expect(component.categories()).toEqual([]);
  });

  it('keeps disabled categories and empty forms reachable and editable', () => {
    load({ categories: [{ key: 'disabled_xyz', title: 'Desactivada', enabled: false, fields: [] }] });
    component.openField('disabled_xyz'); component.updateDraft({ label: 'Dato opcional' }); component.saveField();
    expect(component.categories()[0].fields[0].label).toBe('Dato opcional');
    component.toggleCategory('disabled_xyz');
    expect(component.categories()[0].enabled).toBe(true);
    component.deleteCategory('disabled_xyz');
    component.newCategoryTitle.set('Otra categoría'); component.addCategory();
    expect(component.selectedCategory()?.title).toBe('Otra categoría');
  });

  it('preserves local selection of a disabled category when the parent echoes edits with an unchanged step', () => {
    const form: WizardFormDefinition = { categories: [
      { key: 'active_a', title: 'A', enabled: true, fields: [] },
      { key: 'disabled_b', title: 'B', enabled: false, fields: [] },
    ] };
    fixture.componentRef.setInput('selectedCategoryKey', 'active_a'); load(form);
    component.selectCategory('disabled_b'); component.renameCategory('disabled_b', 'B modificada');
    fixture.componentRef.setInput('definition', structuredClone(component.working())); fixture.detectChanges();
    expect(component.selectedCategory()?.key).toBe('disabled_b');
    fixture.componentRef.setInput('selectedCategoryKey', 'disabled_b'); fixture.detectChanges();
    fixture.componentRef.setInput('selectedCategoryKey', 'active_a'); fixture.detectChanges();
    expect(component.selectedCategory()?.key).toBe('active_a');
  });

  it('preserves keys on label edits and reorders while emitting independent canonical values', () => {
    const incoming = structuredClone(customSpecialtyFixture.definition.encounterForm);
    const output = vi.spyOn(component.definitionChange, 'emit');
    load(incoming);
    component.openField('new_encounter_category', 'notes');
    component.updateDraft({ label: 'Comentarios', placeholder: 'Texto de ayuda', required: true }); component.saveField();
    component.moveField('new_encounter_category', 'notes', -1);
    const updated = component.allFields().find(f => f.key === 'notes');
    expect(updated).toMatchObject({ label: 'Comentarios', placeholder: 'Texto de ayuda', required: true, type: 'TEXTAREA' });
    expect(incoming).toEqual(customSpecialtyFixture.definition.encounterForm);
    const emitted = output.mock.calls.at(-1)![0]; emitted.categories[0].title = 'Mutación externa';
    expect(component.categories()[0].title).toBe('Consulta inédita');
    expect(Object.keys(output.mock.calls[0][0])).toEqual(['categories']);
  });

  it('generates unique field keys across all categories including disabled categories', () => {
    load({ categories: [
      { key: 'off', title: 'Inactiva', enabled: false, fields: [{ key: 'Dato', label: 'Dato', type: 'TEXT', required: false }] },
      { key: 'on', title: 'Activa', enabled: true, fields: [] },
    ] });
    component.openField('on'); component.updateDraft({ label: 'Dato' }); component.saveField();
    expect(component.allFields().map(f => f.key)).toEqual(['Dato', 'Dato_2']);
    component.duplicateField('off', 'Dato');
    expect(new Set(component.allFields().map(f => f.key)).size).toBe(3);
    component.newCategoryTitle.set('123 ' + 'á'.repeat(145)); component.addCategory();
    expect(component.categories().at(-1)!.key).toMatch(/^[A-Za-z][A-Za-z0-9_-]{0,79}$/);
  });

  it('creates a new field identity when changing its type and strips incompatible properties', () => {
    load({ categories: [{ key: 'any', title: 'Categoría', enabled: true, fields: [
      { key: 'existingNumber', label: 'Medición', type: 'NUMBER', required: false, unit: 'kg', minimum: 0, maximum: 100 },
    ] }] });
    component.openField('any', 'existingNumber'); component.setType('TEXT'); component.saveField();
    expect(component.allFields()[0].key).not.toBe('existingNumber');
    expect(component.allFields()[0]).toMatchObject({ label: 'Medición', type: 'TEXT' });
    expect(component.allFields()[0]).not.toHaveProperty('unit');
    expect(component.allFields()[0]).not.toHaveProperty('minimum');
  });

  it('blocks removing or replacing a field still used by a formula', () => {
    load(customSpecialtyFixture.definition.encounterForm);
    component.deleteField('new_encounter_category', 'readingA');
    expect(component.allFields().some(f => f.key === 'readingA')).toBe(true);
    expect(component.error()).toContain('cálculo');
    component.openField('new_encounter_category', 'readingA'); component.setType('TEXT'); component.saveField();
    expect(component.editTarget()).not.toBeNull();
    expect(component.allFields().find(f => f.key === 'readingA')?.type).toBe('NUMBER');
    component.closeField(); component.deleteField('new_encounter_category', 'result'); component.deleteField('new_encounter_category', 'readingA');
    expect(component.allFields().some(f => f.key === 'readingA')).toBe(false);
  });

  it('allows an incomplete patient draft to replace full name with separate required first and last names', () => {
    load(customSpecialtyFixture.definition.patientForm, 'patientForm');
    const output = vi.spyOn(component.definitionChange, 'emit');
    component.deleteField('new_patient_category', 'identity');
    expect(component.allFields().some(f => f.binding === 'patient.fullName')).toBe(false);
    expect(output).toHaveBeenCalled();
    component.openField('new_patient_category'); component.updateDraft({ label: 'Nombre', required: true });
    component.setBinding('patient.firstName'); component.saveField();
    component.openField('new_patient_category'); component.updateDraft({ label: 'Apellido', required: true });
    component.setBinding('patient.lastName'); component.saveField();
    expect(component.error()).toBeNull();
    const core = component.allFields().filter(f => f.required && !f.visibleWhen).map(f => f.binding);
    expect(core).toContain('patient.firstName'); expect(core).toContain('patient.lastName'); expect(core).toContain('patient.birthDate');
    component.toggleCategory('new_patient_category'); expect(component.categories()[0].enabled).toBe(false);
    component.toggleCategory('new_patient_category'); expect(component.categories()[0].enabled).toBe(true);
    component.renameCategory('new_patient_category', 'Datos reorganizados');
    expect(component.categories()[0].title).toBe('Datos reorganizados');
  });

  it('rejects duplicate bindings and enforces measurement units and numeric bounds', () => {
    load(customSpecialtyFixture.definition.patientForm, 'patientForm');
    component.openField('new_patient_category'); component.updateDraft({ label: 'Otro nombre' }); component.setBinding('patient.fullName'); component.saveField();
    expect(component.error()).toContain('ya está vinculado');
    component.closeField(); load({ categories: [{ key: 'measurements', title: 'Mediciones', enabled: true, fields: [] }] });
    component.openField('measurements'); component.updateDraft({ label: 'Peso' }); component.setBinding('encounter.weightKg');
    expect(component.fieldDraft()).toMatchObject({ type: 'NUMBER', unit: 'kg' });
    component.updateDraft({ unit: 'g' }); component.saveField(); expect(component.error()).toContain('kg');
    component.updateDraft({ unit: 'kg', minimum: 20, maximum: 10 }); component.saveField(); expect(component.error()).toContain('mínimo');
    component.updateDraft({ maximum: 40 }); component.saveField(); expect(component.allFields()[0]).toMatchObject({ unit: 'kg', minimum: 20, maximum: 40 });
  });

  it('requires distinct option values and preserves labels independently', () => {
    load({ categories: [{ key: 'choices', title: 'Opciones', enabled: true, fields: [] }] });
    component.openField('choices'); component.updateDraft({ label: 'Grupo' }); component.setType('SELECT'); component.saveField();
    expect(component.error()).toContain('opción');
    component.addOption(); component.updateOption(0, 'label', 'Grupo A'); component.updateOption(0, 'value', 'a');
    component.addOption(); component.updateOption(1, 'label', 'Otra etiqueta'); component.updateOption(1, 'value', 'a'); component.saveField();
    expect(component.error()).toContain('repetirse'); component.updateOption(1, 'value', 'b'); component.saveField();
    expect(component.allFields()[0].options).toEqual([{ label: 'Grupo A', value: 'a' }, { label: 'Otra etiqueta', value: 'b' }]);
  });

  it('rejects visibility cycles and dangling references while retaining false conditions', () => {
    load({ categories: [{ key: 'conditions', title: 'Condiciones', enabled: true, fields: [
      { key: 'a', label: 'A', type: 'BOOLEAN', required: false },
      { key: 'b', label: 'B', type: 'BOOLEAN', required: false, visibleWhen: { fieldKey: 'a', equals: false } },
    ] }] });
    component.openField('conditions', 'a'); component.setVisibility('b'); component.saveField(); expect(component.error()).toContain('ciclo');
    component.closeField(); component.deleteField('conditions', 'a'); expect(component.allFields()).toHaveLength(2);
    component.openField('conditions', 'b'); component.setVisibility('a'); component.setVisibilityValue(false); component.saveField();
    expect(component.allFields()[1].visibleWhen).toEqual({ fieldKey: 'a', equals: false });
  });

  const formulas: WizardFormulaDefinition[] = [
    { kind: 'IMC', inputs: { weightKg: { fieldKey: 'readingA' }, heightCm: { fieldKey: 'readingB' } } },
    { kind: 'BSA', inputs: { weightKg: { fieldKey: 'readingA' }, heightCm: { fieldKey: 'readingB' } } },
    { kind: 'TFGE', inputs: { creatinineMgDl: { fieldKey: 'readingA' }, ageYears: { context: 'patient.ageYears' }, gender: { context: 'patient.gender' } } },
    { kind: 'COCKCROFT', inputs: { creatinineMgDl: { fieldKey: 'readingA' }, weightKg: { fieldKey: 'readingB' }, ageYears: { context: 'patient.ageYears' }, gender: { context: 'patient.gender' } } },
    { kind: 'CALCIO_CORREGIDO', inputs: { serumCalciumMgDl: { fieldKey: 'readingA' }, serumAlbuminGDl: { fieldKey: 'readingB' } } },
    { kind: 'CUSTOM', operation: 'DIVIDE', inputs: { a: { fieldKey: 'readingA' }, b: { constant: 0 } } },
  ];
  it.each(formulas)('saves $kind with exact explicit operands and canonical wire shape', formula => {
    load(customSpecialtyFixture.definition.encounterForm);
    component.openField('new_encounter_category', 'result'); component.setFormulaKind(formula.kind);
    for (const [name, operand] of Object.entries(formula.inputs)) {
      if (operand.fieldKey) component.setOperand(name, 'field:' + operand.fieldKey);
      else if (operand.context) component.setOperand(name, 'context:' + operand.context);
      else component.setOperand(name, 'constant', operand.constant);
    }
    if (formula.operation) component.setOperation(formula.operation);
    component.saveField();
    const saved = component.allFields().find(f => f.key === 'result')!;
    expect(saved.formula).toEqual(formula); expect(saved.required).toBe(false);
    expect(saved).not.toHaveProperty('formulaType'); expect(saved).not.toHaveProperty('formulaVariableA');
    expect(component.formulaKinds.map(k => k.value)).not.toContain('CHADS_VASC');
  });

  it('rejects absent or chained formula inputs and never offers formula fields as operands', () => {
    load(customSpecialtyFixture.definition.encounterForm); component.openField('new_encounter_category', 'result'); component.setFormulaKind('IMC'); component.saveField();
    expect(component.error()).toContain('entradas');
    expect(component.operandChoices('weightKg').some(c => c.value === 'field:result')).toBe(false);
    component.setOperand('weightKg', 'field:result'); component.setOperand('heightCm', 'field:readingB'); component.saveField();
    expect(component.error()).toContain('numéricos');
    expect(component.operandChoices('gender').some(c => c.value === 'constant')).toBe(false);
    component.setFormulaKind('CUSTOM'); component.setOperand('a', 'field:readingA'); component.setOperand('b', 'constant', null); component.saveField();
    expect(component.error()).toContain('constante');
  });

  it('blocks every mutation while readonly', () => {
    load(customSpecialtyFixture.definition.encounterForm); fixture.componentRef.setInput('readonly', true); fixture.detectChanges();
    const original = structuredClone(component.working()); const output = vi.spyOn(component.definitionChange, 'emit');
    component.newCategoryTitle.set('No permitido'); component.addCategory(); component.renameCategory('new_encounter_category', 'Otro');
    component.toggleCategory('new_encounter_category'); component.deleteCategory('new_encounter_category');
    component.moveField('new_encounter_category', 'readingA', 1); component.deleteField('new_encounter_category', 'notes'); component.duplicateField('new_encounter_category', 'notes');
    component.openField('new_encounter_category', 'notes'); expect(component.fieldDraft()).toBeNull();
    expect(component.working()).toEqual(original); expect(output).not.toHaveBeenCalled();
  });
});
