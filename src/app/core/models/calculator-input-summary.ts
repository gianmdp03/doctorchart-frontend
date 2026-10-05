import { CalculatorId } from './medical-calculators.model';

/** Display labels and units only; the persisted snapshot uses stable input keys. */
export function calculatorInputSummary(id: CalculatorId, inputs: Record<string, unknown>): Record<string, string | number | boolean> {
  const number = (key: string) => inputs[key] as number;
  const flag = (key: string) => inputs[key] as boolean;
  const sex = () => inputs['gender'] === 'FEMALE' ? 'Femenino' : 'Masculino';
  switch (id) {
    case 'imc': case 'bsa_mosteller':
      return { 'Peso (kg)': number('weightKg'), 'Talla (cm)': number('heightCm') };
    case 'tfge':
      return { 'Creatinina (mg/dL)': number('creatinineMgDl'), 'Edad (años)': number('ageYears'), 'Sexo': sex() };
    case 'cockcroft':
      return { 'Peso (kg)': number('weightKg'), 'Edad (años)': number('ageYears'), 'Creatinina (mg/dL)': number('creatinineMgDl'), 'Sexo': sex() };
    case 'chads_vasc':
      return { 'Edad (años)': number('ageYears'), 'Sexo Femenino': flag('isFemale'), 'Insuficiencia Cardíaca': flag('congestiveHeartFailure'),
        'Hipertensión': flag('hypertension'), 'Diabetes': flag('diabetes'), 'ACV previo / AIT': flag('strokeOrTia'), 'Enfermedad Vascular': flag('vascularDisease') };
    case 'calcio_corregido':
      return { 'Calcio Sérico (mg/dL)': number('serumCalciumMgDl'), 'Albúmina (g/dL)': number('serumAlbuminGDl') };
    case 'holliday_segar':
      return { 'Peso Pediátrico (kg)': number('weightKg') };
    case 'pediatric_dosage':
      return { 'Peso (kg)': number('weightKg'), 'Dosis objetivo': `${inputs['targetDoseMgKg']} ${inputs['doseUnit']}`,
        'Concentración': `${inputs['drugConcentrationMg']} mg / ${inputs['drugConcentrationMl']} mL`, 'Frecuencia': `${inputs['dosesPerDay']} veces al día` };
    default:
      return inputs as Record<string, string | number | boolean>;
  }
}
