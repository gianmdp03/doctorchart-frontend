import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { WizardFieldDefinition } from './wizard-definition.model';

export const validIsoDate = (value: unknown): value is string => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

// Keep invalid input as text: native number inputs turn invalid text into null,
// which would incorrectly pass validation for an optional numeric field.
export function parseNumberInput(value: string): number | string | null {
  const text = value.trim();
  if (!text) return null;
  if (!/^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:[eE][+-]?\d+)?$/.test(text)) return value;
  const number = Number(text.replace(',', '.'));
  return Number.isFinite(number) ? number : value;
}

export function textError(value: string, maximum: number, required = false): string | null {
  if (required && !value.trim()) return 'Completá este campo.';
  return value.length > maximum ? `Ingresá hasta ${maximum} caracteres.` : null;
}

export const trimmedRequired: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  typeof control.value === 'string' && control.value.trim() ? null : { required: true };

export const matchingPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null =>
  group.get('password')?.value === group.get('confirmPassword')?.value ? null : { passwordMismatch: true };

export function wizardFieldError(field: WizardFieldDefinition, value: unknown, today: string): string | null {
  if (field.type === 'FORMULA') return null;
  const missing = value == null || (typeof value === 'string' && !value.trim());
  if (missing) return field.required ? 'Completá este campo.' : null;
  switch (field.type) {
    case 'TEXT': case 'TEXTAREA':
      if (typeof value !== 'string') return 'Ingresá un texto válido.';
      if (['sys_email', 'email', 'patient.email'].includes(field.key) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Ingresá un correo electrónico válido.';
      if (['sys_dni', 'nationalId', 'patient.nationalId', 'patient.guardianInfo.firstGuardianNationalId', 'patient.guardianInfo.secondGuardianNationalId'].includes(field.key) && !/^\d{6,8}$/.test(value.trim())) return 'Ingresá un DNI de 6 a 8 dígitos, sin puntos.';
      if (['sys_phone', 'phone', 'patient.phone', 'primaryContactPhone', 'patient.guardianInfo.primaryContactPhone'].includes(field.key) && (!/^[+\d\s().-]+$/.test(value.trim()) || value.replace(/\D/g, '').length < 6 || value.replace(/\D/g, '').length > 15)) return 'Ingresá un teléfono de 6 a 15 dígitos.';
      return null;
    case 'NUMBER':
      if (typeof value !== 'number' || !Number.isFinite(value)) return 'Ingresá un número válido.';
      if (field.minimum !== undefined && value < field.minimum) return `El valor mínimo es ${field.minimum}.`;
      if (field.maximum !== undefined && value > field.maximum) return `El valor máximo es ${field.maximum}.`;
      if (['weightKg', 'heightCm', 'headCircumferenceCm', 'weight', 'height', 'headCircumference', 'measure', 'encounter.weightKg', 'encounter.heightCm', 'encounter.headCircumferenceCm'].includes(field.key) && value <= 0) return 'Ingresá un número mayor que cero.';
      if (['siblingsCount', 'count', 'patient.guardianInfo.siblingsCount'].includes(field.key) && (!Number.isInteger(value) || value < 0 || value > 2147483647)) return 'Ingresá un número entero igual o mayor que cero.';
      if (['siblingOrder', 'order', 'patient.guardianInfo.siblingOrder'].includes(field.key) && (!Number.isInteger(value) || value < 1 || value > 2147483647)) return 'Ingresá un número entero igual o mayor que uno.';
      return null;
    case 'DATE':
      if (!validIsoDate(value)) return 'Ingresá una fecha válida con formato dd/MM/aaaa.';
      if (isBirthDateField(field.key) && value > today) return 'La fecha de nacimiento no puede ser futura.';
      return null;
    case 'BOOLEAN': return typeof value === 'boolean' ? null : 'Elegí Sí o No.';
    case 'SELECT': return typeof value === 'string' && field.options?.some(option => option.value === value) ? null : 'Elegí una de las opciones disponibles.';
  }
}

export const isBirthDateField = (key: string): boolean => ['sys_dob', 'birthDate', 'birth', 'born', 'patient.birthDate'].includes(key);
