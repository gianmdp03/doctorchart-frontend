import { createCalculatorSessions, summarizeCalculatorInputs } from './calculator-registry';

const CONTEXT = { age: 8, gender: 'FEMALE' as const, weight: 15, height: 100, creatinine: 0.65, calcium: 9.4, albumin: 4.2 };

describe('Calculator form isolation', () => {
  it('creates independent state for every calculator and screen', () => {
    const first = createCalculatorSessions(), second = createCalculatorSessions();
    for (const [code, calculator] of first) {
      const otherScreen = second.get(code)!.form;
      const untouched = otherScreen.inputs();
      const otherCalculators = Array.from(first).filter(([id]) => id !== code).map(([, entry]) => [entry.form, entry.form.inputs()] as const);
      calculator.form.autofill(CONTEXT);
      expect(calculator.form).not.toBe(otherScreen);
      expect(otherScreen.inputs()).toEqual(untouched);
      for (const [form, before] of otherCalculators) expect(form.inputs()).toEqual(before);
      calculator.form.reset();
    }
  });

  it('does not apply a generic calculator to an unregistered code', () => {
    expect(createCalculatorSessions().get('unknown')).toBeUndefined();
  });

  it('keeps the pediatric input summary readable while using canonical input keys', () => {
    expect(summarizeCalculatorInputs('pediatric_dosage', { weightKg: 10, targetDoseMgKg: 50, doseUnit: 'mg/kg/dia',
      drugConcentrationMg: 250, drugConcentrationMl: 5, dosesPerDay: 3 })).toEqual({
      'Peso (kg)': 10, 'Dosis objetivo': '50 mg/kg/dia', 'Concentración': '250 mg / 5 mL', 'Frecuencia': '3 veces al día',
    });
  });

  it('keeps each calculators historical input summary independent from the active form', () => {
    expect(summarizeCalculatorInputs('imc', { weightKg: 70, heightCm: 175 })).toEqual({ 'Peso (kg)': 70, 'Talla (cm)': 175 });
    expect(summarizeCalculatorInputs('bsa_mosteller', { weightKg: 18, heightCm: 110 })).toEqual({ 'Peso (kg)': 18, 'Talla (cm)': 110 });
    expect(summarizeCalculatorInputs('tfge', { creatinineMgDl: 1.2, ageYears: 55, gender: 'FEMALE' })).toEqual({ 'Creatinina (mg/dL)': 1.2, 'Edad (años)': 55, 'Sexo': 'Femenino' });
    expect(summarizeCalculatorInputs('cockcroft', { weightKg: 70, creatinineMgDl: 1, ageYears: 55, gender: 'MALE' })).toEqual({ 'Peso (kg)': 70, 'Edad (años)': 55, 'Creatinina (mg/dL)': 1, 'Sexo': 'Masculino' });
    expect(summarizeCalculatorInputs('calcio_corregido', { serumCalciumMgDl: 8.2, serumAlbuminGDl: 3 })).toEqual({ 'Calcio Sérico (mg/dL)': 8.2, 'Albúmina (g/dL)': 3 });
    expect(summarizeCalculatorInputs('holliday_segar', { weightKg: 15 })).toEqual({ 'Peso Pediátrico (kg)': 15 });
    expect(summarizeCalculatorInputs('chads_vasc', { ageYears: 68, isFemale: true, congestiveHeartFailure: false,
      hypertension: true, diabetes: false, strokeOrTia: true, vascularDisease: false })).toEqual({
      'Edad (años)': 68, 'Sexo Femenino': true, 'Insuficiencia Cardíaca': false, 'Hipertensión': true,
      'Diabetes': false, 'ACV previo / AIT': true, 'Enfermedad Vascular': false,
    });
  });
});
