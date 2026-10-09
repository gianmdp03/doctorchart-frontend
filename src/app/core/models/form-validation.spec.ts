import { describe, expect, it } from 'vitest';
import { parseNumberInput, wizardFieldError } from './form-validation';
import { WizardFieldDefinition } from './wizard-definition.model';

describe('Clinical field validation', () => {
  const today = '2026-10-09';
  it.each([
    ['sys_email', 'correo-invalido', 'correo electrónico'],
    ['sys_dni', '12.345.678', 'sin puntos'],
    ['sys_phone', 'abc', 'teléfono'],
  ])('validates the personal field %s', (key, value, message) => {
    const field: WizardFieldDefinition = { key, label: key, type: 'TEXT', required: false };
    expect(wizardFieldError(field, value, today)).toContain(message);
    expect(wizardFieldError(field, '', today)).toBeNull();
  });
  it.each([
    ['sys_email', 'paciente@example.com'],
    ['sys_dni', '12345678'],
    ['sys_phone', '+54 (11) 1234-5678'],
  ])('accepts a valid personal field %s', (key, value) => {
    expect(wizardFieldError({ key, label: key, type: 'TEXT', required: false }, value, today)).toBeNull();
  });
  it('enforces clinical measurements and integer counts without constraining arbitrary number fields', () => {
    const field: WizardFieldDefinition = { key: 'weightKg', label: 'Peso', type: 'NUMBER', required: false };
    expect(wizardFieldError(field, 0, today)).toContain('mayor que cero');
    expect(wizardFieldError({ ...field, key: 'siblingsCount' }, 1.5, today)).toContain('entero');
    expect(wizardFieldError({ ...field, key: 'siblingsCount' }, 0, today)).toBeNull();
    expect(wizardFieldError({ ...field, key: 'custom_family_number' }, -1.5, today)).toBeNull();
  });
  it('allows false in a required boolean and validates the configured selection options', () => {
    const field: WizardFieldDefinition = { key: 'custom', label: 'Dato', type: 'BOOLEAN', required: true };
    expect(wizardFieldError(field, false, today)).toBeNull();
    expect(wizardFieldError(field, 'false', today)).toContain('Sí o No');
    expect(wizardFieldError({ ...field, type: 'SELECT', options: [{ value: 'a', label: 'A' }] }, 'b', today)).toContain('opciones disponibles');
  });
  it.each(['sys_dob', 'born', 'birth', 'birthDate', 'patient.birthDate'])('rejects a future birthday through %s', key => {
    expect(wizardFieldError({ key, label: 'Nacimiento', type: 'DATE', required: true }, '2027-01-01', today)).toContain('futura');
  });
  it('preserves malformed and nonfinite numbers and handles Argentine decimals', () => {
    expect(parseNumberInput('12,5')).toBe(12.5);
    expect(parseNumberInput('0')).toBe(0);
    expect(parseNumberInput('  ')).toBeNull();
    for (const value of ['abc', '1,2,3', 'Infinity', '1e999', '--1']) expect(parseNumberInput(value)).toBe(value);
  });
});
