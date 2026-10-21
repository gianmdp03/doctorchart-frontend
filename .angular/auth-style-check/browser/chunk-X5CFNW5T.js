// src/app/core/models/wizard-record-display.ts
function isWizardFieldVisible(definition, values, key) {
  const fields = new Map(definition.categories.flatMap((category) => category.fields.map((field) => [field.key, { field, enabled: category.enabled }])));
  const visit = (fieldKey, seen) => {
    const entry = fields.get(fieldKey);
    if (!entry?.enabled || seen.has(fieldKey)) return false;
    const condition = entry.field.visibleWhen;
    if (!condition) return true;
    const controller = fields.get(condition.fieldKey);
    return controller?.field.type === "BOOLEAN" && visit(condition.fieldKey, /* @__PURE__ */ new Set([...seen, fieldKey])) && values[condition.fieldKey] === condition.equals;
  };
  return visit(key, /* @__PURE__ */ new Set());
}
function wizardRecordEntries(record) {
  return record.formDefinitionSnapshot.categories.flatMap((category) => category.fields.flatMap((field) => {
    if (!isWizardFieldVisible(record.formDefinitionSnapshot, record.formValues, field.key)) return [];
    const result = record.formulaResults[field.key];
    const value = field.type === "FORMULA" ? result?.status === "READY" ? result.value : null : record.formValues[field.key];
    if (value === null || value === void 0 || value === "") return [];
    return [{ label: field.label, value: formatWizardValue(field, value) }];
  }));
}
function formatWizardValue(field, value) {
  if (typeof value === "boolean") return value ? "S\xED" : "No";
  if (field.type === "SELECT") return field.options?.find((option) => option.value === value)?.label ?? String(value);
  if (field.type === "DATE" && typeof value === "string") {
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
  }
  return `${value}${field.unit ? ` ${field.unit}` : ""}`;
}

export {
  isWizardFieldVisible,
  wizardRecordEntries
};
//# debugId=246b7339-bbb2-5a96-96e3-ca30fa0828fb
//# sourceMappingURL=chunk-X5CFNW5T.js.map
