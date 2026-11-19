import { ClinicalFormRecord, WizardCategoryDefinition, WizardFieldDefinition, WizardFormDefinition, WizardFormValues } from './wizard-definition.model';

/** Visibility follows stable keys, including the visibility of the controller itself. */
export function isWizardFieldVisible(definition: WizardFormDefinition, values: WizardFormValues, key: string): boolean {
  const fields = new Map(definition.categories.flatMap(category => category.fields.map(field => [field.key, { field, enabled: category.enabled }] as const)));
  const visit = (fieldKey: string, seen: Set<string>): boolean => {
    const entry = fields.get(fieldKey);
    if (!entry?.enabled || seen.has(fieldKey)) return false;
    const condition = entry.field.visibleWhen;
    if (!condition) return true;
    const controller = fields.get(condition.fieldKey);
    return controller?.field.type === 'BOOLEAN' && visit(condition.fieldKey, new Set([...seen, fieldKey])) && values[condition.fieldKey] === condition.equals;
  };
  return visit(key, new Set());
}

export function wizardRecordEntries(
  record: ClinicalFormRecord,
  include?: (category: WizardCategoryDefinition, field: WizardFieldDefinition) => boolean,
): { label: string; value: string }[] {
  const display = wizardRecordForm(record.formDefinitionSnapshot);
  return display.categories.flatMap(category => category.fields.flatMap(field => {
    if (include && !include(category, field)) return [];
    if (!isWizardFieldVisible(record.formDefinitionSnapshot, record.formValues, field.key)) return [];
    const result = record.formulaResults[field.key];
    const value = field.type === 'FORMULA' ? (result?.status === 'READY' ? result.value : null) : record.formValues[field.key];
    if (value === null || value === undefined || value === '') return [];
    return [{ label: field.label, value: formatWizardValue(field, value) }];
  }));
}

/** Keep historical answers intact for editing. A canonical field owns the read view even when hidden or empty. */
export function wizardRecordForm(form: WizardFormDefinition): WizardFormDefinition {
  if (!form.categories.some(category => category.fields.some(field => field.key === 'followUpInstructions'))) {
    return form;
  }
  return {
    ...form,
    categories: form.categories.map(category => ({
      ...category,
      fields: category.fields.filter(field => field.key !== 'followUp'),
    })),
  };
}

function formatWizardValue(field: WizardFieldDefinition, value: string | number | boolean): string {
  if (typeof value === 'boolean') return value ? 'Sí' : 'No';
  if (field.type === 'SELECT') return field.options?.find(option => option.value === value)?.label ?? String(value);
  if (field.type === 'DATE' && typeof value === 'string') {
    const [year, month, day] = value.split('-');
    return `${day}/${month}/${year}`;
  }
  return `${value}${field.unit ? ` ${field.unit}` : ''}`;
}
