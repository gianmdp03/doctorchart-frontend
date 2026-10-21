// src/app/core/models/form-validation.ts
var validIsoDate = (value) => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = /* @__PURE__ */ new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
};
function parseNumberInput(value) {
  const text = value.trim();
  if (!text) return null;
  if (!/^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:[eE][+-]?\d+)?$/.test(text)) return value;
  const number = Number(text.replace(",", "."));
  return Number.isFinite(number) ? number : value;
}
function textError(value, maximum, required = false) {
  if (required && !value.trim()) return "Complet\xE1 este campo.";
  return value.length > maximum ? `Ingres\xE1 hasta ${maximum} caracteres.` : null;
}
var trimmedRequired = (control) => typeof control.value === "string" && control.value.trim() ? null : { required: true };
var matchingPasswords = (group) => group.get("password")?.value === group.get("confirmPassword")?.value ? null : { passwordMismatch: true };
function wizardFieldError(field, value, today) {
  if (field.type === "FORMULA") return null;
  const missing = value == null || typeof value === "string" && !value.trim();
  if (missing) return field.required ? "Complet\xE1 este campo." : null;
  switch (field.type) {
    case "TEXT":
    case "TEXTAREA":
      if (typeof value !== "string") return "Ingres\xE1 un texto v\xE1lido.";
      if (["sys_email", "email", "patient.email"].includes(field.key) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Ingres\xE1 un correo electr\xF3nico v\xE1lido.";
      if (["sys_dni", "nationalId", "patient.nationalId", "patient.guardianInfo.firstGuardianNationalId", "patient.guardianInfo.secondGuardianNationalId"].includes(field.key) && !/^\d{6,8}$/.test(value.trim())) return "Ingres\xE1 un DNI de 6 a 8 d\xEDgitos, sin puntos.";
      if (["sys_phone", "phone", "patient.phone", "primaryContactPhone", "patient.guardianInfo.primaryContactPhone"].includes(field.key) && (!/^[+\d\s().-]+$/.test(value.trim()) || value.replace(/\D/g, "").length < 6 || value.replace(/\D/g, "").length > 15)) return "Ingres\xE1 un tel\xE9fono de 6 a 15 d\xEDgitos.";
      return null;
    case "NUMBER":
      if (typeof value !== "number" || !Number.isFinite(value)) return "Ingres\xE1 un n\xFAmero v\xE1lido.";
      if (field.minimum !== void 0 && value < field.minimum) return `El valor m\xEDnimo es ${field.minimum}.`;
      if (field.maximum !== void 0 && value > field.maximum) return `El valor m\xE1ximo es ${field.maximum}.`;
      if (["weightKg", "heightCm", "headCircumferenceCm", "weight", "height", "headCircumference", "measure", "encounter.weightKg", "encounter.heightCm", "encounter.headCircumferenceCm"].includes(field.key) && value <= 0) return "Ingres\xE1 un n\xFAmero mayor que cero.";
      if (["siblingsCount", "count", "patient.guardianInfo.siblingsCount"].includes(field.key) && (!Number.isInteger(value) || value < 0 || value > 2147483647)) return "Ingres\xE1 un n\xFAmero entero igual o mayor que cero.";
      if (["siblingOrder", "order", "patient.guardianInfo.siblingOrder"].includes(field.key) && (!Number.isInteger(value) || value < 1 || value > 2147483647)) return "Ingres\xE1 un n\xFAmero entero igual o mayor que uno.";
      return null;
    case "DATE":
      if (!validIsoDate(value)) return "Ingres\xE1 una fecha v\xE1lida con formato dd/MM/aaaa.";
      if (isBirthDateField(field.key) && value > today) return "La fecha de nacimiento no puede ser futura.";
      return null;
    case "BOOLEAN":
      return typeof value === "boolean" ? null : "Eleg\xED S\xED o No.";
    case "SELECT":
      return typeof value === "string" && field.options?.some((option) => option.value === value) ? null : "Eleg\xED una de las opciones disponibles.";
  }
}
var isBirthDateField = (key) => ["sys_dob", "birthDate", "birth", "born", "patient.birthDate"].includes(key);

export {
  validIsoDate,
  parseNumberInput,
  textError,
  trimmedRequired,
  matchingPasswords,
  wizardFieldError,
  isBirthDateField
};
//# debugId=4b1b910b-b634-5caf-ba5c-88a0a243410e
//# sourceMappingURL=chunk-D4J4ETKO.js.map
