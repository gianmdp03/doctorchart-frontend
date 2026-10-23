import { Component, computed, effect, ElementRef, input, output, signal, untracked, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WizardFormDefinition, WizardFieldDefinition, WizardFormulaDefinition, WizardFormulaInput } from '../../core/models/wizard-definition.model';
import { parseNumberInput, textError } from '../../core/models/form-validation';

type FieldType = WizardFieldDefinition['type'];
type FormulaKind = WizardFormulaDefinition['kind'];
interface EditTarget { categoryKey: string; fieldKey: string | null; }
const FORMULA_INPUTS: Record<FormulaKind, string[]> = {
  IMC: ['weightKg', 'heightCm'], BSA: ['weightKg', 'heightCm'], TFGE: ['creatinineMgDl', 'ageYears', 'gender'],
  COCKCROFT: ['creatinineMgDl', 'weightKg', 'ageYears', 'gender'], CALCIO_CORREGIDO: ['serumCalciumMgDl', 'serumAlbuminGDl'], CUSTOM: ['a', 'b'],
};
const INPUT_LABELS: Record<string, string> = {
  weightKg: 'Peso (kg)', heightCm: 'Talla (cm)', creatinineMgDl: 'Creatinina (mg/dL)', ageYears: 'Edad (años)',
  gender: 'Sexo', serumCalciumMgDl: 'Calcio (mg/dL)', serumAlbuminGDl: 'Albúmina (g/dL)', a: 'Primer dato', b: 'Segundo dato',
};
const clone = <T>(value: T): T => structuredClone(value);

@Component({ selector: 'app-form-field-editor', imports: [FormsModule],
  templateUrl: './form-field-editor.component.html', styleUrl: './form-field-editor.component.css' })
export class FormFieldEditorComponent {
  private readonly fieldPageHeading = viewChild<ElementRef<HTMLElement>>('fieldPageHeading');
  private lastRequestedCategory: string | null | undefined;
  readonly definition = input<WizardFormDefinition>({ categories: [] });
  readonly section = input<'patientForm' | 'encounterForm'>('patientForm');
  readonly selectedCategoryKey = input<string | null>(null);
  readonly readonly = input(false);
  readonly definitionChange = output<WizardFormDefinition>();
  readonly categorySelected = output<string>();
  readonly working = signal<WizardFormDefinition>({ categories: [] });
  readonly selectedKey = signal<string | null>(null);
  readonly error = signal<string | null>(null);
  readonly newCategoryTitle = signal('');
  readonly newCategoryError = computed(() => textError(this.newCategoryTitle(), 150, true));
  readonly categoryErrors = signal<Record<string, string | null>>({});
  readonly pendingChanges = computed(() => !!this.fieldDraft() || !!this.newCategoryTitle().trim() || this.categories().some(category => !!this.categoryErrors()[category.key]));
  readonly editTarget = signal<EditTarget | null>(null);
  readonly fieldDraft = signal<WizardFieldDefinition | null>(null);
  readonly numericInputs = signal<Record<string, string>>({});
  readonly categories = computed(() => this.working().categories);
  readonly selectedCategory = computed(() => this.categories().find(c => c.key === this.selectedKey()) ?? null);
  readonly allFields = computed(() => this.categories().flatMap(c => c.fields));
  readonly formulaInputs = computed(() => FORMULA_INPUTS[this.fieldDraft()?.formula?.kind ?? 'CUSTOM']);
  readonly visibilityControllers = computed(() => this.allFields().filter(f => f.type === 'BOOLEAN' && f.key !== this.editTarget()?.fieldKey));
  readonly draftValidationError = computed(() => {
    const draft = this.fieldDraft(), target = this.editTarget();
    if (!draft || !target) return null;
    const next = clone(this.working()), field = clone(draft);
    const old = this.allFields().find(f => f.key === target.fieldKey);
    field.key = old && old.type === field.type ? old.key : this.uniqueKey(field.label, new Set(this.allFields().map(f => f.key)), 'field');
    const category = next.categories.find(c => c.key === target.categoryKey);
    if (!category) return 'Seleccioná una categoría disponible.';
    const index = category.fields.findIndex(f => f.key === target.fieldKey);
    if (index < 0) category.fields.push(field); else category.fields[index] = field;
    return this.validate(next);
  });
  draftError(property: 'label' | 'placeholder' | 'unit' | 'minimum' | 'maximum'): string | null {
    const field = this.fieldDraft(); if (!field) return null;
    if (property === 'label') return textError(field.label, 150, true);
    if (property === 'placeholder') return textError(field.placeholder ?? '', 300);
    if (property === 'unit') return textError(field.unit ?? '', 30);
    const value = field[property];
    if (value !== undefined && !Number.isFinite(value)) return 'Ingresá un número válido.';
    return field.minimum !== undefined && field.maximum !== undefined && field.minimum > field.maximum ? 'El mínimo no puede superar al máximo.' : null;
  }
  optionError(index: number, property: 'label' | 'value'): string | null {
    const options = this.fieldDraft()?.options ?? [], value = options[index]?.[property] ?? '';
    return textError(value, property === 'label' ? 150 : 80, true) || (property === 'value' && options.some((option, i) => i !== index && option.value === value) ? 'Este valor ya se usa en otra opción.' : null);
  }
  operandError(name: string): string | null {
    const operand = this.fieldDraft()?.formula?.inputs[name];
    if (!operand) return 'Elegí el origen de este dato.';
    return 'constant' in operand && !Number.isFinite(operand.constant) ? 'Ingresá un número fijo válido.' : null;
  }
  readonly fieldTypes: { value: FieldType; label: string }[] = [
    { value: 'TEXT', label: 'Texto corto' }, { value: 'TEXTAREA', label: 'Texto largo' }, { value: 'NUMBER', label: 'Número' },
    { value: 'DATE', label: 'Fecha' }, { value: 'SELECT', label: 'Selección' }, { value: 'BOOLEAN', label: 'Sí / No' }, { value: 'FORMULA', label: 'Cálculo' },
  ];
  readonly formulaKinds: { value: FormulaKind; label: string }[] = [
    { value: 'IMC', label: 'Índice de masa corporal' }, { value: 'BSA', label: 'Superficie corporal' },
    { value: 'TFGE', label: 'Filtrado glomerular' }, { value: 'COCKCROFT', label: 'Cockcroft-Gault' },
    { value: 'CALCIO_CORREGIDO', label: 'Calcio corregido' }, { value: 'CUSTOM', label: 'Operación entre datos' },
  ];
  readonly operations: { value: NonNullable<WizardFormulaDefinition['operation']>; label: string }[] = [
    { value: 'ADD', label: 'Sumar' }, { value: 'SUBTRACT', label: 'Restar' }, { value: 'MULTIPLY', label: 'Multiplicar' },
    { value: 'DIVIDE', label: 'Dividir' }, { value: 'AVERAGE', label: 'Promediar' },
  ];
  constructor() {
    effect(() => this.fieldPageHeading()?.nativeElement.focus());
    effect(() => {
      const form = this.definition(); const requested = this.selectedCategoryKey();
      untracked(() => {
        this.working.set(clone(form));
        const preferred = requested !== this.lastRequestedCategory ? requested ?? this.selectedKey() : this.selectedKey();
        this.lastRequestedCategory = requested;
        this.selectedKey.set(form.categories.some(c => c.key === preferred) ? preferred : form.categories[0]?.key ?? null);
      });
    });
  }
  selectCategory(key: string): void { this.selectedKey.set(key); this.error.set(null); this.categorySelected.emit(key); }
  typeLabel(type: FieldType): string { return this.fieldTypes.find(t => t.value === type)?.label ?? type; }
  inputLabel(name: string): string { return INPUT_LABELS[name] ?? name; }
  readonly canAddMeasurementMode = computed(() => this.allFields().some(field => ['heightCm', 'height'].includes(field.key)) && !this.allFields().some(field => field.key === 'heightMeasurementMode'));
  addMeasurementMode(): void {
    const categoryKey = this.selectedKey();
    if (!categoryKey || this.section() !== 'encounterForm' || !this.canAddMeasurementMode() || this.readonly()) return;
    this.commit(form => form.categories.find(category => category.key === categoryKey)!.fields.push({
      key: 'heightMeasurementMode', label: 'Posición de longitud / estatura', type: 'SELECT', required: false,
      options: [{ value: 'RECUMBENT', label: 'Longitud recumbente (acostado)' }, { value: 'STANDING', label: 'Estatura de pie' }],
    }));
  }
  addCategory(): void {
    const title = this.newCategoryTitle().trim();
    if (!title || title.length > 150) { this.error.set('Ingresá un nombre de categoría de hasta 150 caracteres.'); return; }
    const key = this.uniqueKey(title, new Set(this.categories().map(c => c.key)), 'category');
    if (this.commit(form => form.categories.push({ key, title, enabled: true, fields: [] }))) { this.selectedKey.set(key); this.newCategoryTitle.set(''); }
  }
  renameCategory(key: string, title: string): void {
    const c = this.categories().find(cat => cat.key === key);
    if (c?.system) return;
    const error = textError(title, 150, true);
    this.categoryErrors.update(errors => ({ ...errors, [key]: error }));
    if (error) return;
    this.commit(form => { const cat = form.categories.find(cat => cat.key === key); if (cat) cat.title = title.trim(); });
  }
  toggleCategory(key: string): void {
    const c = this.categories().find(cat => cat.key === key);
    if (c?.system) return;
    this.commit(form => { const cat = form.categories.find(cat => cat.key === key); if (cat) cat.enabled = !cat.enabled; });
  }
  moveCategory(key: string, direction: number): void { this.commit(form => this.move(form.categories, form.categories.findIndex(c => c.key === key), direction)); }
  deleteCategory(key: string): void {
    const c = this.categories().find(cat => cat.key === key);
    if (c?.system) return;
    this.commit(form => { form.categories = form.categories.filter(cat => cat.key !== key); });
  }
  moveField(categoryKey: string, fieldKey: string, direction: number): void {
    const field = this.allFields().find(f => f.key === fieldKey);
    if (field?.system) return;
    this.commit(form => { const fields = form.categories.find(c => c.key === categoryKey)?.fields; if (fields) this.move(fields, fields.findIndex(f => f.key === fieldKey), direction); });
  }
  deleteField(categoryKey: string, fieldKey: string): void {
    const field = this.allFields().find(f => f.key === fieldKey);
    if (field?.system) return;
    this.commit(form => { const c = form.categories.find(c => c.key === categoryKey); if (c) c.fields = c.fields.filter(f => f.key !== fieldKey); });
  }
  duplicateField(categoryKey: string, fieldKey: string): void {
    this.commit(form => {
      const c = form.categories.find(c => c.key === categoryKey); const field = c?.fields.find(f => f.key === fieldKey); if (!c || !field || field.system) return;
      const copy = clone(field); copy.key = this.uniqueKey(field.key, new Set(form.categories.flatMap(c => c.fields.map(f => f.key))), 'field');
      copy.label += ' (copia)'; delete copy.system; c.fields.push(copy);
    });
  }
  openField(categoryKey: string, fieldKey: string | null = null): void {
    if (this.readonly()) return;
    const existing = this.categories().find(c => c.key === categoryKey)?.fields.find(f => f.key === fieldKey);
    if (existing?.system) return;
    this.numericInputs.set({});
    this.editTarget.set({ categoryKey, fieldKey }); this.fieldDraft.set(existing ? clone(existing) : { key: '', label: '', type: 'TEXT', required: false }); this.error.set(null);
  }
  closeField(): void { this.editTarget.set(null); this.fieldDraft.set(null); this.error.set(null); }
  updateDraft(patch: Partial<WizardFieldDefinition>): void { const current = this.fieldDraft(); if (current) { this.fieldDraft.set({ ...current, ...patch }); this.error.set(null); } }
  setType(type: FieldType): void {
    const draft = this.fieldDraft(); if (!draft) return; const next = clone(draft); next.type = type;
    if (type !== 'SELECT') delete next.options; else next.options ??= [];
    if (type !== 'NUMBER') { delete next.minimum; delete next.maximum; }
    if (type !== 'NUMBER' && type !== 'FORMULA') delete next.unit;
    if (type !== 'FORMULA') delete next.formula;
    else { next.required = false; next.formula = { kind: 'CUSTOM', operation: 'ADD', inputs: {} }; }
    this.numericInputs.set({}); this.fieldDraft.set(next);
  }
  setNumberProperty(property: 'minimum' | 'maximum', value: number | string | null): void {
    const draft = this.fieldDraft(); if (!draft) return; const next = clone(draft);
    const parsed = typeof value === 'string' ? parseNumberInput(value) : value;
    this.numericInputs.update(raw => ({ ...raw, [property]: value == null ? '' : String(value) }));
    if (parsed === null) delete next[property]; else next[property] = typeof parsed === 'number' ? parsed : NaN;
    this.fieldDraft.set(next); this.error.set(null);
  }
  addOption(): void { const draft = this.fieldDraft(); if (draft) this.updateDraft({ options: [...(draft.options ?? []), { value: '', label: '' }] }); }
  updateOption(index: number, property: 'value' | 'label', value: string): void {
    const options = clone(this.fieldDraft()?.options ?? []); if (options[index]) options[index][property] = value; this.updateDraft({ options });
  }
  deleteOption(index: number): void { this.updateDraft({ options: this.fieldDraft()?.options?.filter((_, i) => i !== index) }); }
  setVisibility(fieldKey: string): void {
    const draft = this.fieldDraft(); if (!draft) return; const next = clone(draft);
    if (!fieldKey) delete next.visibleWhen; else next.visibleWhen = { fieldKey, equals: true }; this.fieldDraft.set(next);
  }
  setVisibilityValue(equals: boolean): void { const value = this.fieldDraft()?.visibleWhen; if (value) this.updateDraft({ visibleWhen: { ...value, equals } }); }
  setFormulaKind(kind: FormulaKind): void { this.numericInputs.set({}); this.updateDraft({ formula: { kind, inputs: {}, ...(kind === 'CUSTOM' ? { operation: 'ADD' as const } : {}) } }); }
  setOperation(operation: NonNullable<WizardFormulaDefinition['operation']>): void {
    const formula = this.fieldDraft()?.formula; if (formula) this.updateDraft({ formula: { ...formula, operation } });
  }
  operandChoices(name: string): { value: string; label: string }[] {
    const gender = name === 'gender'; const custom = this.fieldDraft()?.formula?.kind === 'CUSTOM';
    const fields = this.allFields().filter(f => f.key !== this.editTarget()?.fieldKey && (gender
      ? f.type === 'SELECT' && f.options?.every(o => ['MALE', 'FEMALE', 'OTHER', 'UNKNOWN'].includes(o.value)) : f.type === 'NUMBER'));
    const choices = fields.map(f => ({ value: 'field:' + f.key, label: f.label }));
    if (!custom) choices.push(...(gender ? [{ value: 'context:patient.gender', label: 'Sexo del paciente' }] : [
      { value: 'context:patient.ageYears', label: 'Edad del paciente (años)' }, { value: 'context:patient.latestWeightKg', label: 'Último peso anterior (kg)' },
      { value: 'context:patient.latestHeightCm', label: 'Última talla anterior (cm)' },
    ]));
    if (!gender && (!custom || name === 'b')) choices.push({ value: 'constant', label: 'Número fijo' }); return choices;
  }
  operandValue(name: string): string {
    const operand = this.fieldDraft()?.formula?.inputs[name]; return operand
      ? 'fieldKey' in operand ? 'field:' + operand.fieldKey : 'context' in operand ? 'context:' + operand.context : 'constant' : '';
  }
  operandConstant(name: string): number | null { const operand = this.fieldDraft()?.formula?.inputs[name]; return operand?.constant ?? null; }
  setOperand(name: string, selection: string, constant: number | null = 0): void {
    this.numericInputs.update(values => { const next = { ...values }; delete next['operand:' + name]; return next; });
    const formula = this.fieldDraft()?.formula; if (!formula) return; const inputs = clone(formula.inputs);
    if (!selection) delete inputs[name]; else if (selection.startsWith('field:')) inputs[name] = { fieldKey: selection.slice(6) };
    else if (selection.startsWith('context:')) inputs[name] = { context: selection.slice(8) } as WizardFormulaInput; else inputs[name] = { constant: constant ?? NaN };
    this.updateDraft({ formula: { ...formula, inputs } });
  }
  setOperandConstant(name: string, raw: string): void { const value = parseNumberInput(raw); this.setOperand(name, 'constant', typeof value === 'number' ? value : NaN); this.numericInputs.update(values => ({ ...values, ['operand:' + name]: raw })); }
  saveField(): void {
    const target = this.editTarget(); const current = this.fieldDraft(); if (!target || !current || this.readonly()) return;
    const field = clone(current); field.label = field.label.trim();
    if (this.draftValidationError()) { this.error.set(this.draftValidationError()); return; }
    if (!field.label || field.label.length > 150) { this.error.set('Ingresá una etiqueta de hasta 150 caracteres.'); return; }
    if (!field.placeholder) delete field.placeholder; if (!field.unit) delete field.unit;
    const old = this.allFields().find(f => f.key === target.fieldKey);
    const replaced = old && old.type !== field.type;
    field.key = old && !replaced ? old.key : this.uniqueKey(field.label, new Set(this.allFields().map(f => f.key)), 'field');
    if (this.commit(form => {
      const c = form.categories.find(c => c.key === target.categoryKey); if (!c) return;
      const index = c.fields.findIndex(f => f.key === target.fieldKey); if (index < 0) c.fields.push(field); else c.fields[index] = field;
    })) this.closeField();
  }
  private commit(change: (form: WizardFormDefinition) => void): boolean {
    if (this.readonly()) return false; const previous = this.working(); const next = clone(previous); change(next);
    const error = this.validate(next);
    if (error) { this.error.set(error); return false; }
    this.error.set(null); this.working.set(next);
    if (!next.categories.some(c => c.key === this.selectedKey())) this.selectedKey.set(next.categories[0]?.key ?? null);
    this.definitionChange.emit(clone(next)); return true;
  }
  private validate(form: WizardFormDefinition): string | null {
    const fields = form.categories.flatMap(c => c.fields); const byKey = new Map(fields.map(f => [f.key, f]));
    if (new Set(form.categories.map(c => c.key)).size !== form.categories.length || byKey.size !== fields.length) return 'Las claves deben ser únicas en todo el formulario.';
    const sysCat = form.categories.find(c => c.key === 'sys_patient_profile');
    if (sysCat) {
      if (!sysCat.enabled) return 'La categoría de datos personales del paciente es obligatoria y debe estar activa.';
      const sysKeys = new Set(sysCat.fields.map(f => f.key));
      const requiredSysKeys = ['sys_firstName', 'sys_lastName', 'sys_dni', 'sys_dob', 'sys_sex', 'sys_phone', 'sys_email', 'sys_insurance'];
      for (const k of requiredSysKeys) {
        if (!sysKeys.has(k)) return `El campo obligatorio del sistema ${k} debe estar presente.`;
      }
    }
    for (const field of fields) {
      if (!field.label.trim() || field.label.length > 150) return 'Las etiquetas no pueden estar vacías ni superar 150 caracteres.';
      if (textError(field.placeholder ?? '', 300)) return 'El texto de ayuda admite hasta 300 caracteres.';
      if (textError(field.unit ?? '', 30)) return 'La unidad admite hasta 30 caracteres.';
      if (field.type === 'SELECT') {
        if (!field.options?.length || field.options.some(o => !o.value.trim() || !o.label.trim() || o.value.length > 80 || o.label.length > 150)) return 'Completá al menos una opción con valor y etiqueta.';
        if (new Set(field.options.map(o => o.value)).size !== field.options.length) return 'Los valores de las opciones no pueden repetirse.';
      }
      if ((field.minimum !== undefined && !Number.isFinite(field.minimum)) || (field.maximum !== undefined && !Number.isFinite(field.maximum)) ||
        (field.minimum !== undefined && field.maximum !== undefined && field.minimum > field.maximum)) return 'Los límites numéricos deben ser válidos y el mínimo no puede superar al máximo.';
      if (field.visibleWhen) {
        let cursor: WizardFieldDefinition | undefined = field; const seen = new Set<string>();
        while (cursor?.visibleWhen) {
          if (seen.has(cursor.key)) return 'Las condiciones de visibilidad no pueden formar un ciclo.';
          seen.add(cursor.key); const controller = byKey.get(cursor.visibleWhen.fieldKey);
          if (controller?.type !== 'BOOLEAN') return 'La condición debe referir a un campo Sí / No existente.'; cursor = controller;
        }
      }
      if (field.type === 'FORMULA') {
        const formula = field.formula;
        if (!formula || field.required) return 'El cálculo requiere configuración y no puede ser obligatorio.';
        const expected = FORMULA_INPUTS[formula.kind];
        if (!expected || Object.keys(formula.inputs).length !== expected.length || expected.some(n => !formula.inputs[n])) return 'Seleccioná todas las entradas del cálculo.';
        for (const name of expected) {
          const operand = formula.inputs[name]; const gender = name === 'gender';
          if (typeof operand.fieldKey === 'string') {
            const source = byKey.get(operand.fieldKey);
            if (!source || source.type !== (gender ? 'SELECT' : 'NUMBER')) return 'El cálculo debe referir a campos numéricos existentes; sexo requiere selección.';
            if (gender && source.options?.some(o => !['MALE', 'FEMALE', 'OTHER', 'UNKNOWN'].includes(o.value))) return 'La entrada de sexo requiere valores compatibles.';
          } else if (typeof operand.constant === 'number') {
            if (gender || !Number.isFinite(operand.constant) || (formula.kind === 'CUSTOM' && name === 'a')) return 'La constante debe ser numérica y válida para esa entrada.';
          } else if ((operand.context === 'patient.gender') !== gender || formula.kind === 'CUSTOM') return 'El contexto no corresponde a esa entrada del cálculo.';
        }
        if (formula.kind === 'CUSTOM' && !formula.operation) return 'Elegí la operación entre datos.';
      }
    }
    return null;
  }
  private uniqueKey(label: string, used: Set<string>, fallback: string): string {
    let base = label.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9_-]/g, '_').replace(/_+/g, '_').slice(0, 70);
    if (!/^[A-Za-z]/.test(base)) base = fallback + '_' + base;
    base = base.slice(0, 70);
    let key = base; let suffix = 2; while (used.has(key)) key = base + '_' + suffix++; return key;
  }
  private move<T>(values: T[], index: number, direction: number): void {
    const next = index + direction; if (index < 0 || next < 0 || next >= values.length) return; [values[index], values[next]] = [values[next], values[index]];
  }
}
