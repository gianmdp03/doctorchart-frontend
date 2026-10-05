import { Component, computed, effect, input, output, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from '../../shared/date-picker/date-picker.component';
import { WizardFieldDefinition, WizardFormDefinition, WizardFormValues, WizardValue, WizardFormulaResults } from '../../core/models/wizard-definition.model';
import { isWizardFieldVisible } from '../../core/models/wizard-record-display';

export const inputValues = (definition: WizardFormDefinition, values: WizardFormValues): WizardFormValues => Object.fromEntries(
  definition.categories.flatMap(category => category.fields).filter(field => field.type !== 'FORMULA' && Object.prototype.hasOwnProperty.call(values, field.key)).map(field => [field.key, values[field.key]]),
);
export const validIsoDate = (value: unknown): boolean => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`); return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

@Component({ selector: 'app-dynamic-form-renderer', imports: [FormsModule, DatePickerComponent], templateUrl: './dynamic-form-renderer.component.html', styleUrl: './dynamic-form-renderer.component.css' })
export class DynamicFormRendererComponent {
  readonly definition = input<WizardFormDefinition>({ categories: [] });
  readonly values = input<WizardFormValues>({});
  readonly formulaResults = input<WizardFormulaResults>({});
  readonly readonly = input(false);
  readonly valuesChange = output<WizardFormValues>();
  readonly validityChange = output<boolean>();
  readonly currentValues = signal<WizardFormValues>({});
  private readonly resultValues = signal<WizardFormValues>({});
  readonly enabledCategories = computed(() => this.definition().categories.filter(category => category.enabled));
  readonly fields = computed(() => this.definition().categories.flatMap(category => category.fields));
  readonly todayIso = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Argentina/Buenos_Aires', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  readonly formValid = computed(() => this.fields().every(field => !this.isFieldVisible(field.key) || this.validField(field)));

  constructor() {
    effect(() => { const definition = this.definition(); const values = this.values(); untracked(() => this.currentValues.set(structuredClone(inputValues(definition, values)))); });
    effect(() => { this.formulaResults(); untracked(() => this.resultValues.set(structuredClone(this.values()))); });
    effect(() => this.validityChange.emit(this.formValid()));
  }
  setValue(field: WizardFieldDefinition, value: unknown): void {
    if (this.readonly() || field.type === 'FORMULA') return;
    this.currentValues.update(values => ({ ...values, [field.key]: (value === '' ? null : value) as WizardValue }));
    this.valuesChange.emit(structuredClone(inputValues(this.definition(), this.currentValues())));
  }
  isFieldVisible(key: string): boolean { return isWizardFieldVisible(this.definition(), this.currentValues(), key); }
  validField(field: WizardFieldDefinition): boolean {
    if (field.type === 'FORMULA') return true;
    const value = this.currentValues()[field.key];
    const missing = value === null || value === undefined || (typeof value === 'string' && !value.trim());
    if (missing) return !field.required;
    switch (field.type) {
      case 'TEXT': case 'TEXTAREA': return typeof value === 'string';
      case 'NUMBER': return typeof value === 'number' && Number.isFinite(value) && (field.minimum === undefined || value >= field.minimum) && (field.maximum === undefined || value <= field.maximum);
      case 'BOOLEAN': return typeof value === 'boolean';
      case 'SELECT': return typeof value === 'string' && !!field.options?.some(option => option.value === value);
      case 'DATE': return validIsoDate(value) && (!this.isBirthDateField(field.key) || (value as string) <= this.todayIso);
    }
  }
  isBirthDateField(key: string): boolean {
    return key === 'sys_dob' || key === 'born' || key === 'birthDate';
  }
  displayValue(field: WizardFieldDefinition): string {
    const value = this.currentValues()[field.key];
    if (value === null || value === undefined || value === '') return 'Sin respuesta';
    if (field.type === 'BOOLEAN') return value === true ? 'Sí' : value === false ? 'No' : 'Respuesta inválida';
    if (field.type === 'DATE' && validIsoDate(value)) { const [year, month, day] = (value as string).split('-'); return `${day}/${month}/${year}`; }
    if (field.type === 'SELECT') return field.options?.find(option => option.value === value)?.label ?? 'Respuesta inválida';
    return String(value);
  }
  formulaText(field: WizardFieldDefinition): string {
    const result = this.formulaResults()[field.key];
    if (!result) return 'Se calcula al guardar';
    if (JSON.stringify(inputValues(this.definition(), this.resultValues())) !== JSON.stringify(this.currentValues())) return 'Se actualizará al guardar';
    const labels: Record<string, string> = { READY: 'Resultado disponible', MISSING_INPUT: 'Faltan datos para calcular', DIVISION_BY_ZERO: 'No se puede dividir por cero', NOT_APPLICABLE: 'No corresponde calcular', INVALID_INPUT: 'Revisá los datos del cálculo' };
    if (result.status === 'READY' && typeof result.value === 'number' && Number.isFinite(result.value)) return new Intl.NumberFormat('es-AR', { maximumFractionDigits: 6 }).format(result.value) + (field.unit ? ` ${field.unit}` : '');
    return labels[result.status] ?? 'Resultado no disponible';
  }
}
