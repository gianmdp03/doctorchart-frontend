import {
  WizardDefinition,
  WizardFormulaContext,
  WizardFormulaDefinition,
  WizardFormulaInput,
  WizardFormulaResult,
  WizardFormulaResults,
  WizardFormValues,
  WizardValue,
} from '../app/core/models/wizard-definition.model';

function toNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value.trim());
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function unavailable(status: WizardFormulaResult['status']): WizardFormulaResult {
  return { value: null, status };
}

export function evaluateFormula(
  formula: WizardFormulaDefinition,
  values: WizardFormValues,
  context: Record<string, WizardValue>,
): WizardFormulaResult {
  const resolveInput = (input: WizardFormulaInput): WizardValue | undefined => {
    if ('constant' in input && input.constant !== undefined) return input.constant;
    if ('context' in input && input.context !== undefined) return context[input.context];
    if ('fieldKey' in input && input.fieldKey !== undefined) return values[input.fieldKey];
    return undefined;
  };

  let keys: string[];
  switch (formula.kind) {
    case 'IMC':
    case 'BSA':
      keys = ['weightKg', 'heightCm'];
      break;
    case 'TFGE':
      keys = ['creatinineMgDl', 'ageYears', 'gender'];
      break;
    case 'COCKCROFT':
      keys = ['creatinineMgDl', 'weightKg', 'ageYears', 'gender'];
      break;
    case 'CALCIO_CORREGIDO':
      keys = ['serumCalciumMgDl', 'serumAlbuminGDl'];
      break;
    case 'CUSTOM':
      keys = ['a', 'b'];
      break;
    default:
      return unavailable('INVALID_INPUT');
  }

  const nums: Record<string, number> = {};
  let genderVal = '';
  for (const key of keys) {
    const spec = formula.inputs[key];
    if (!spec) return unavailable('MISSING_INPUT');
    const raw = resolveInput(spec);
    if (raw === null || raw === undefined || raw === '') return unavailable('MISSING_INPUT');
    if (key === 'gender') {
      if (typeof raw !== 'string') return unavailable('INVALID_INPUT');
      if (raw === 'OTHER' || raw === 'UNKNOWN') return unavailable('NOT_APPLICABLE');
      if (raw !== 'MALE' && raw !== 'FEMALE') return unavailable('INVALID_INPUT');
      genderVal = raw;
    } else {
      const n = toNumber(raw);
      if (n === null) return unavailable('INVALID_INPUT');
      nums[key] = n;
    }
  }

  let result = 0;
  switch (formula.kind) {
    case 'IMC':
    case 'BSA': {
      const weight = nums['weightKg'];
      const height = nums['heightCm'];
      if (weight <= 0 || height <= 0) return unavailable('INVALID_INPUT');
      const meters = height / 100;
      result = formula.kind === 'IMC' ? weight / (meters * meters) : Math.sqrt((weight * height) / 3600);
      break;
    }
    case 'TFGE':
    case 'COCKCROFT': {
      const creatinine = nums['creatinineMgDl'];
      const age = nums['ageYears'];
      if (creatinine <= 0 || age < 0) return unavailable('INVALID_INPUT');
      if (age < 18) return unavailable('NOT_APPLICABLE');
      const female = genderVal === 'FEMALE';
      if (formula.kind === 'TFGE') {
        const k = female ? 0.7 : 0.9;
        const alpha = female ? -0.241 : -0.302;
        const factor = female ? 1.012 : 1.0;
        const ratio = creatinine / k;
        result = 142 * Math.pow(Math.min(ratio, 1), alpha) * Math.pow(Math.max(ratio, 1), -1.2) * Math.pow(0.9938, age) * factor;
      } else {
        const weight = nums['weightKg'];
        if (weight <= 0) return unavailable('INVALID_INPUT');
        result = ((140 - age) * weight) / (72 * creatinine);
        if (female) result *= 0.85;
      }
      break;
    }
    case 'CALCIO_CORREGIDO': {
      const calcium = nums['serumCalciumMgDl'];
      const albumin = nums['serumAlbuminGDl'];
      if (calcium <= 0 || albumin <= 0) return unavailable('INVALID_INPUT');
      result = calcium + 0.8 * (4 - albumin);
      break;
    }
    case 'CUSTOM': {
      const a = nums['a'];
      const b = nums['b'];
      switch (formula.operation) {
        case 'ADD':
          result = a + b;
          break;
        case 'SUBTRACT':
          result = a - b;
          break;
        case 'MULTIPLY':
          result = a * b;
          break;
        case 'DIVIDE':
          if (b === 0) return unavailable('DIVISION_BY_ZERO');
          result = a / b;
          break;
        case 'AVERAGE':
          result = (a + b) / 2;
          break;
        default:
          return unavailable('INVALID_INPUT');
      }
      break;
    }
  }

  if (!Number.isFinite(result)) return unavailable('INVALID_INPUT');
  return { value: Number(result.toFixed(2)), status: 'READY' };
}

export function evaluateFormFormulas(
  categories: WizardDefinition['encounterForm']['categories'],
  values: WizardFormValues,
  context: Partial<Record<WizardFormulaContext, WizardValue>>,
): WizardFormulaResults {
  const results: WizardFormulaResults = {};
  for (const cat of categories) {
    if (!cat.enabled) continue;
    for (const field of cat.fields) {
      if (field.type === 'FORMULA' && field.formula) {
        results[field.key] = evaluateFormula(field.formula, values, context as Record<string, WizardValue>);
      }
    }
  }
  return results;
}
