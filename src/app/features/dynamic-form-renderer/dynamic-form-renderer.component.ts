import { todayDate } from '../../core/date/user-time-zone';
import { Component, computed, effect, input, output, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from '../../shared/date-picker/date-picker.component';
import { WizardFieldDefinition, WizardFormDefinition, WizardFormValues, WizardValue, WizardFormulaResults } from '../../core/models/wizard-definition.model';
import { isWizardFieldVisible } from '../../core/models/wizard-record-display';
import { isBirthDateField, parseNumberInput, validIsoDate, wizardFieldError } from '../../core/models/form-validation';
export { validIsoDate } from '../../core/models/form-validation';

export const inputValues = (definition: WizardFormDefinition, values: WizardFormValues): WizardFormValues => Object.fromEntries(
  definition.categories.flatMap(category => category.fields).filter(field => field.type !== 'FORMULA' && Object.prototype.hasOwnProperty.call(values, field.key)).map(field => [field.key, values[field.key]]),
);

@Component({ selector: 'app-dynamic-form-renderer', imports: [FormsModule, DatePickerComponent], templateUrl: './dynamic-form-renderer.component.html', styleUrl: './dynamic-form-renderer.component.css' })
export class DynamicFormRendererComponent {
  readonly definition = input<WizardFormDefinition>({ categories: [] });
  readonly values = input<WizardFormValues>({});
  readonly formulaResults = input<WizardFormulaResults>({});
  readonly readonly = input(false);
  readonly valuesChange = output<WizardFormValues>();
  readonly validityChange = output<boolean>();
  readonly currentValues = signal<WizardFormValues>({});
  private readonly rawNumbers = signal<Record<string, string>>({});
  private readonly resultValues = signal<WizardFormValues>({});
  readonly enabledCategories = computed(() => this.definition().categories.filter(category => category.enabled));
  readonly fields = computed(() => this.definition().categories.flatMap(category => category.fields));
  readonly todayIso = todayDate();
  readonly formValid = computed(() => this.fields().every(field => !this.isFieldVisible(field.key) || this.validField(field)));

  constructor() {
    effect(() => {
      const definition = this.definition(), values = inputValues(definition, this.values());
      untracked(() => {
        this.currentValues.set(structuredClone(values));
        this.rawNumbers.update(raw => Object.fromEntries(Object.entries(raw).filter(([key, text]) =>
          definition.categories.some(category => category.fields.some(field => field.key === key && field.type === 'NUMBER')) && Object.is(parseNumberInput(text), values[key]))));
      });
    });
    effect(() => { this.formulaResults(); untracked(() => this.resultValues.set(structuredClone(this.values()))); });
    effect(() => this.validityChange.emit(this.formValid()));
  }
  setValue(field: WizardFieldDefinition, value: unknown): void {
    if (this.readonly() || field.type === 'FORMULA') return;
    this.rawNumbers.update(raw => { const next = { ...raw }; delete next[field.key]; return next; });
    this.currentValues.update(values => ({ ...values, [field.key]: (value === '' ? null : value) as WizardValue }));
    this.valuesChange.emit(structuredClone(inputValues(this.definition(), this.currentValues())));
  }
  isFieldVisible(key: string): boolean { return isWizardFieldVisible(this.definition(), this.currentValues(), key); }
  setNumberValue(field: WizardFieldDefinition, raw: string): void {
    if (this.readonly()) return;
    this.setValue(field, parseNumberInput(raw));
    this.rawNumbers.update(values => ({ ...values, [field.key]: raw }));
  }
  numberInput(field: WizardFieldDefinition): string | number { return this.rawNumbers()[field.key] ?? (this.currentValues()[field.key] as string | number | null) ?? ''; }
  fieldError(field: WizardFieldDefinition): string | null { return wizardFieldError(field, this.currentValues()[field.key], this.todayIso); }
  validField(field: WizardFieldDefinition): boolean {
    return !this.fieldError(field);
  }
  isBirthDateField(key: string): boolean {
    return isBirthDateField(key);
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
