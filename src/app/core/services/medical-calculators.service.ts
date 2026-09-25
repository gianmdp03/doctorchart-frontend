import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  BmiCalculatorInputs,
  CalculationResult,
  CalculatorCategory,
  CalculatorId,
  CalculatorMetadata,
  CalciumCorrectionInputs,
  ChadsVascCalculatorInputs,
  CockcroftCalculatorInputs,
  InterpretationRange,
  SavedCalculationItem,
  SeverityLevel,
  TfgeCalculatorInputs,
} from '../models/medical-calculators.model';

const SAVED_CALCULATIONS_KEY = 'doctorchart_saved_calculations';

export const MEDICAL_CALCULATORS_CATALOG: readonly CalculatorMetadata[] = [
  {
    id: 'imc',
    name: 'Índice de Masa Corporal (IMC) y BSA',
    shortName: 'IMC & BSA',
    category: 'antropometria',
    categoryLabel: 'Antropometría',
    icon: 'lucideWeight',
    description:
      'Evalúa el estado nutricional del adulto según la OMS y estima la superficie corporal (BSA) mediante Mosteller.',
    evidenceReference: 'OMS / Mosteller RD. N Engl J Med 1987.',
    summaryFormula: 'IMC = Peso (kg) / [Talla (m)]² | BSA = √[Peso(kg) × Talla(cm) / 3600]',
  },
  {
    id: 'tfge',
    name: 'Filtrado Glomerular Estimado (CKD-EPI 2021)',
    shortName: 'TFGe (CKD-EPI)',
    category: 'nefrologia',
    categoryLabel: 'Nefrología',
    icon: 'lucideActivity',
    description:
      'Ecuación estándar de referencia internacional para estimar el filtrado glomerular sin ajuste de raza.',
    evidenceReference: 'Inker LA et al. N Engl J Med 2021; KDIGO 2024 Guidelines.',
    summaryFormula: 'CKD-EPI 2021 con Creatinina Sérica, Edad y Sexo Biológico',
  },
  {
    id: 'cockcroft',
    name: 'Aclaramiento de Creatinina (Cockcroft-Gault)',
    shortName: 'ClCr Cockcroft',
    category: 'nefrologia',
    categoryLabel: 'Farmacología / Nefro',
    icon: 'lucideStethoscope',
    description:
      'Cálculo mandatorio para la dosificación y ajuste posológico de fármacos de excreción renal.',
    evidenceReference: 'Cockcroft DW, Gault MH. Nephron 1976; FDA Renal Impairment Guidance.',
    summaryFormula: 'ClCr = [(140 - edad) × peso] / [72 × Cr] (× 0.85 si mujer)',
  },
  {
    id: 'chads_vasc',
    name: 'Score CHA₂DS₂-VASc',
    shortName: 'CHA₂DS₂-VASc',
    category: 'cardiologia',
    categoryLabel: 'Cardiología',
    icon: 'lucideHeart',
    description:
      'Estratificación de riesgo tromboembólico en Fibrilación Auricular no valvular e indicación de anticoagulación.',
    evidenceReference: 'Lip GY et al. Chest 2010; Guías ESC / AHA Fibrilación Auricular.',
    summaryFormula: 'Suma de factores clínicos: C(1), H(1), A₂(2), D(1), S₂(2), V(1), A(1), Sc(1)',
  },
  {
    id: 'calcio_corregido',
    name: 'Calcio Sérico Corregido por Albúmina',
    shortName: 'Calcio Corregido',
    category: 'metabolismo',
    categoryLabel: 'Metabolismo / Lab',
    icon: 'lucideFlaskConical',
    description:
      'Ajusta la calcemia total en presencia de hipoalbuminemia o alteraciones de proteínas séricas.',
    evidenceReference: 'Payne RB et al. Br Med J 1973.',
    summaryFormula: 'Ca Corregido = Ca Total + 0.8 × (4.0 - Albúmina)',
  },
] as const;

@Injectable({
  providedIn: 'root',
})
export class MedicalCalculatorsService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly calculators = signal<readonly CalculatorMetadata[]>(MEDICAL_CALCULATORS_CATALOG);
  readonly savedHistory = signal<SavedCalculationItem[]>(this.loadStoredCalculations());

  // -------------------------------------------------------------
  // 1. IMC & BSA (Mosteller)
  // -------------------------------------------------------------
  calculateBmi(inputs: BmiCalculatorInputs): CalculationResult | null {
    const { weightKg, heightCm } = inputs;
    if (!weightKg || !heightCm || weightKg <= 0 || heightCm <= 0) {
      return null;
    }

    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const bsa = Math.sqrt((weightKg * heightCm) / 3600);

    let interpretation: InterpretationRange;

    if (bmi < 18.5) {
      interpretation = {
        min: 0,
        max: 18.49,
        label: 'Bajo peso',
        severity: 'warning',
        clinicalAction: 'Investigar patología consuntiva, trastornos alimentarios o malnutrición.',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200',
        cardBorderClass: 'border-amber-400 bg-amber-50/50 dark:bg-amber-950/20',
        bgHighlightClass: 'text-amber-700 dark:text-amber-400',
      };
    } else if (bmi < 25) {
      interpretation = {
        min: 18.5,
        max: 24.99,
        label: 'Normopeso (Rango saludable)',
        severity: 'normal',
        clinicalAction: 'Mantener pautas dietéticas saludables y actividad física regular.',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200',
        cardBorderClass: 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20',
        bgHighlightClass: 'text-emerald-700 dark:text-emerald-400',
      };
    } else if (bmi < 30) {
      interpretation = {
        min: 25.0,
        max: 29.99,
        label: 'Sobrepeso (Pre-obesidad)',
        severity: 'warning',
        clinicalAction: 'Fomentar cambios en el estilo de vida, nutrición guiada y cribado cardiometabólico.',
        badgeClass: 'bg-yellow-100 text-yellow-900 border-yellow-300 dark:bg-yellow-950/60 dark:text-yellow-200',
        cardBorderClass: 'border-yellow-400 bg-yellow-50/50 dark:bg-yellow-950/20',
        bgHighlightClass: 'text-yellow-800 dark:text-yellow-400',
      };
    } else if (bmi < 35) {
      interpretation = {
        min: 30.0,
        max: 34.99,
        label: 'Obesidad Clase I',
        severity: 'danger',
        clinicalAction: 'Intervención clínica activa: perfil lipídico, glucemia/HbA1c y plan estructurado.',
        badgeClass: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-200',
        cardBorderClass: 'border-orange-400 bg-orange-50/50 dark:bg-orange-950/20',
        bgHighlightClass: 'text-orange-700 dark:text-orange-400',
      };
    } else if (bmi < 40) {
      interpretation = {
        min: 35.0,
        max: 39.99,
        label: 'Obesidad Clase II (Severa)',
        severity: 'danger',
        clinicalAction: 'Alto riesgo cardiovascular. Intervención médica multidisciplinar y farmacológica.',
        badgeClass: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950/60 dark:text-red-200',
        cardBorderClass: 'border-red-400 bg-red-50/50 dark:bg-red-950/20',
        bgHighlightClass: 'text-red-700 dark:text-red-400',
      };
    } else {
      interpretation = {
        min: 40.0,
        max: Infinity,
        label: 'Obesidad Clase III (Mórbida)',
        severity: 'critical',
        clinicalAction: 'Riesgo vital elevado. Evaluar protocolo de cirugía bariátrica o manejo especializado.',
        badgeClass: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200',
        cardBorderClass: 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/30',
        bgHighlightClass: 'text-rose-700 dark:text-rose-400',
      };
    }

    const minNormalWeight = 18.5 * (heightM * heightM);
    const maxNormalWeight = 24.9 * (heightM * heightM);

    const formattedBmi = bmi.toFixed(1);
    const formattedBsa = bsa.toFixed(2);
    const dateStr = new Date().toISOString();

    const plainText = `[Calculadora Médica DoctorChart - IMC & BSA]
Fecha: ${new Date().toLocaleDateString('es-AR')} ${new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
Parámetros: Peso ${weightKg} kg | Talla ${heightCm} cm
• IMC: ${formattedBmi} kg/m² (${interpretation.label})
• Superficie Corporal (BSA): ${formattedBsa} m² (Mosteller)
• Rango de peso saludable estimado (18.5 - 24.9): ${minNormalWeight.toFixed(1)} kg - ${maxNormalWeight.toFixed(1)} kg
Conducta: ${interpretation.clinicalAction}`;

    return {
      calculatorId: 'imc',
      rawValue: bmi,
      formattedValue: formattedBmi,
      unit: 'kg/m²',
      interpretation,
      secondaryOutputs: [
        {
          label: 'Superficie Corporal (BSA)',
          value: formattedBsa,
          unit: 'm²',
          description: 'Fórmula de Mosteller para dosificación farmacológica y hemodinamia.',
        },
        {
          label: 'Rango de Peso Saludable (OMS)',
          value: `${minNormalWeight.toFixed(1)} - ${maxNormalWeight.toFixed(1)}`,
          unit: 'kg',
          description: 'Basado en IMC normal entre 18.5 y 24.9 kg/m² para su talla.',
        },
      ],
      clinicalAction: interpretation.clinicalAction,
      clinicalNotes: [
        `Talla analizada: ${heightM.toFixed(2)} m.`,
        'En pacientes muy musculosos o deportistas de alto rendimiento, el IMC puede sobreestimar la adiposidad real.',
      ],
      calculatedAt: dateStr,
      plainTextEvolution: plainText,
    };
  }

  // -------------------------------------------------------------
  // 2. TFGe (CKD-EPI 2021)
  // -------------------------------------------------------------
  calculateTfge(inputs: TfgeCalculatorInputs): CalculationResult | null {
    const { creatinineMgDl, ageYears, gender } = inputs;
    if (!creatinineMgDl || !ageYears || creatinineMgDl <= 0 || ageYears < 18) {
      return null;
    }

    const isFemale = gender === 'FEMALE';
    const kappa = isFemale ? 0.7 : 0.9;
    const alpha = isFemale ? -0.241 : -0.302;
    const genderFactor = isFemale ? 1.012 : 1.0;

    const crRatio = creatinineMgDl / kappa;
    const minPart = Math.pow(Math.min(crRatio, 1), alpha);
    const maxPart = Math.pow(Math.max(crRatio, 1), -1.2);
    const agePart = Math.pow(0.9938, ageYears);

    const egfr = 142 * minPart * maxPart * agePart * genderFactor;

    let interpretation: InterpretationRange;

    if (egfr >= 90) {
      interpretation = {
        min: 90,
        max: Infinity,
        label: 'Estadio G1: Función renal normal o elevada',
        severity: 'normal',
        clinicalAction: 'Monitoreo periódico si existen factores de riesgo (diabetes, HTA, proteinuria).',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200',
        cardBorderClass: 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20',
        bgHighlightClass: 'text-emerald-700 dark:text-emerald-400',
      };
    } else if (egfr >= 60) {
      interpretation = {
        min: 60,
        max: 89.99,
        label: 'Estadio G2: Descenso ligero del filtrado',
        severity: 'low',
        clinicalAction: 'Control de progresión, ajuste de factores cardiovasculares y albuminuria.',
        badgeClass: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-200',
        cardBorderClass: 'border-teal-400 bg-teal-50/50 dark:bg-teal-950/20',
        bgHighlightClass: 'text-teal-700 dark:text-teal-400',
      };
    } else if (egfr >= 45) {
      interpretation = {
        min: 45,
        max: 59.99,
        label: 'Estadio G3a: Descenso ligero a moderado',
        severity: 'warning',
        clinicalAction: 'Evaluar complicaciones de ERC (anemia, metabolismo óseo-mineral). Vigilar nefrotoxinas.',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200',
        cardBorderClass: 'border-amber-400 bg-amber-50/50 dark:bg-amber-950/20',
        bgHighlightClass: 'text-amber-700 dark:text-amber-400',
      };
    } else if (egfr >= 30) {
      interpretation = {
        min: 30,
        max: 44.99,
        label: 'Estadio G3b: Descenso moderado a severo',
        severity: 'danger',
        clinicalAction: 'Ajuste obligatorio de posología farmacológica y derivación a nefrología.',
        badgeClass: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-200',
        cardBorderClass: 'border-orange-400 bg-orange-50/50 dark:bg-orange-950/20',
        bgHighlightClass: 'text-orange-700 dark:text-orange-400',
      };
    } else if (egfr >= 15) {
      interpretation = {
        min: 15,
        max: 29.99,
        label: 'Estadio G4: Descenso severo',
        severity: 'critical',
        clinicalAction: 'Manejo nefrológico activo intensivo, preparación para terapia de reemplazo renal.',
        badgeClass: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950/60 dark:text-red-200',
        cardBorderClass: 'border-red-400 bg-red-50/50 dark:bg-red-950/20',
        bgHighlightClass: 'text-red-700 dark:text-red-400',
      };
    } else {
      interpretation = {
        min: 0,
        max: 14.99,
        label: 'Estadio G5: Fallo renal terminal (IRCT)',
        severity: 'critical',
        clinicalAction: 'Urgencia de reemplazo renal (diálisis peritoneal, hemodiálisis o trasplante).',
        badgeClass: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200',
        cardBorderClass: 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/30',
        bgHighlightClass: 'text-rose-700 dark:text-rose-400',
      };
    }

    const formattedEgfr = Math.round(egfr).toString();
    const dateStr = new Date().toISOString();

    const plainText = `[Calculadora Médica DoctorChart - TFGe CKD-EPI 2021]
Fecha: ${new Date().toLocaleDateString('es-AR')} ${new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
Parámetros: Creatinina ${creatinineMgDl} mg/dL | Edad ${ageYears} años | Sexo ${isFemale ? 'Femenino' : 'Masculino'}
• TFGe: ${formattedEgfr} mL/min/1.73m²
• Clasificación KDIGO: ${interpretation.label}
Conducta sugerida: ${interpretation.clinicalAction}`;

    return {
      calculatorId: 'tfge',
      rawValue: egfr,
      formattedValue: formattedEgfr,
      unit: 'mL/min/1.73 m²',
      interpretation,
      secondaryOutputs: [
        {
          label: 'Ecuación estándar',
          value: 'CKD-EPI 2021',
          description: 'Sin coeficiente de raza (recomendación KDIGO / NKF-ASN).',
        },
        {
          label: 'Creatinina sérica',
          value: creatinineMgDl.toFixed(2),
          unit: 'mg/dL',
        },
      ],
      clinicalAction: interpretation.clinicalAction,
      clinicalNotes: [
        'Ecuación validada para adultos ≥ 18 años.',
        'La presencia de Enfermedad Renal Crónica requiere persistencia del daño renal o eGFR < 60 durante ≥ 3 meses.',
      ],
      calculatedAt: dateStr,
      plainTextEvolution: plainText,
    };
  }

  // -------------------------------------------------------------
  // 3. Aclaramiento de Creatinina (Cockcroft-Gault)
  // -------------------------------------------------------------
  calculateCockcroftGault(inputs: CockcroftCalculatorInputs): CalculationResult | null {
    const { weightKg, ageYears, creatinineMgDl, gender } = inputs;
    if (!weightKg || !ageYears || !creatinineMgDl || weightKg <= 0 || ageYears < 18 || creatinineMgDl <= 0) {
      return null;
    }

    const isFemale = gender === 'FEMALE';
    const rawCrCl = ((140 - ageYears) * weightKg) / (72 * creatinineMgDl);
    const crCl = isFemale ? rawCrCl * 0.85 : rawCrCl;

    let interpretation: InterpretationRange;

    if (crCl >= 90) {
      interpretation = {
        min: 90,
        max: Infinity,
        label: 'Aclaramiento Normal (≥ 90 mL/min)',
        severity: 'normal',
        clinicalAction: 'Dosis estándar para la gran mayoría de fármacos renales.',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200',
        cardBorderClass: 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20',
        bgHighlightClass: 'text-emerald-700 dark:text-emerald-400',
      };
    } else if (crCl >= 60) {
      interpretation = {
        min: 60,
        max: 89.99,
        label: 'Insuficiencia Renal Leve (60 - 89 mL/min)',
        severity: 'low',
        clinicalAction: 'Generalmente no requiere ajuste salvo fármacos de margen terapéutico muy estrecho.',
        badgeClass: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-200',
        cardBorderClass: 'border-teal-400 bg-teal-50/50 dark:bg-teal-950/20',
        bgHighlightClass: 'text-teal-700 dark:text-teal-400',
      };
    } else if (crCl >= 30) {
      interpretation = {
        min: 30,
        max: 59.99,
        label: 'Insuficiencia Renal Moderada (30 - 59 mL/min)',
        severity: 'warning',
        clinicalAction: 'Requiere ajuste de dosis o intervalo en antibióticos (ej. quinolonas, aminoglucósidos) y DOACs.',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200',
        cardBorderClass: 'border-amber-400 bg-amber-50/50 dark:bg-amber-950/20',
        bgHighlightClass: 'text-amber-700 dark:text-amber-400',
      };
    } else if (crCl >= 15) {
      interpretation = {
        min: 15,
        max: 29.99,
        label: 'Insuficiencia Renal Severa (15 - 29 mL/min)',
        severity: 'danger',
        clinicalAction: 'Reducción marcada de posología o contraindicación de ciertos fármacos (metformina, AINEs, etc.).',
        badgeClass: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-200',
        cardBorderClass: 'border-orange-400 bg-orange-50/50 dark:bg-orange-950/20',
        bgHighlightClass: 'text-orange-700 dark:text-orange-400',
      };
    } else {
      interpretation = {
        min: 0,
        max: 14.99,
        label: 'Fallo Renal Terminal (< 15 mL/min)',
        severity: 'critical',
        clinicalAction: 'Ajuste estricto por diálisis o contraindicación formal en prospecto.',
        badgeClass: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200',
        cardBorderClass: 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/30',
        bgHighlightClass: 'text-rose-700 dark:text-rose-400',
      };
    }

    const formattedCrCl = crCl.toFixed(1);
    const dateStr = new Date().toISOString();

    const plainText = `[Calculadora Médica DoctorChart - Cockcroft-Gault (ClCr)]
Fecha: ${new Date().toLocaleDateString('es-AR')} ${new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
Parámetros: Peso ${weightKg} kg | Edad ${ageYears} años | Creatinina ${creatinineMgDl} mg/dL | Sexo ${isFemale ? 'Femenino' : 'Masculino'}
• Aclaramiento de Creatinina: ${formattedCrCl} mL/min
• Estado: ${interpretation.label}
Guía clínica: ${interpretation.clinicalAction}`;

    return {
      calculatorId: 'cockcroft',
      rawValue: crCl,
      formattedValue: formattedCrCl,
      unit: 'mL/min',
      interpretation,
      secondaryOutputs: [
        {
          label: 'Sexo del paciente',
          value: isFemale ? 'Femenino (factor 0.85)' : 'Masculino (factor 1.0)',
        },
        {
          label: 'Uso en Farmacovigilancia',
          value: 'Ficha técnica / FDA',
          description: 'Cockcroft-Gault es la referencia oficial en la mayoría de prospectos farmacéuticos.',
        },
      ],
      clinicalAction: interpretation.clinicalAction,
      clinicalNotes: [
        'En pacientes obesos extremos (IMC > 30), Cockcroft-Gault puede sobreestimar el aclaramiento si se utiliza peso total sin ajustar.',
      ],
      calculatedAt: dateStr,
      plainTextEvolution: plainText,
    };
  }

  // -------------------------------------------------------------
  // 4. Score CHA₂DS₂-VASc
  // -------------------------------------------------------------
  calculateChadsVasc(inputs: ChadsVascCalculatorInputs): CalculationResult | null {
    const {
      ageYears,
      isFemale,
      congestiveHeartFailure,
      hypertension,
      diabetes,
      strokeOrTia,
      vascularDisease,
    } = inputs;

    let score = 0;
    const factorsSummary: string[] = [];

    if (congestiveHeartFailure) {
      score += 1;
      factorsSummary.push('Insuficiencia Cardíaca Congestiva (+1)');
    }
    if (hypertension) {
      score += 1;
      factorsSummary.push('Hipertensión Arterial (+1)');
    }

    if (ageYears !== null && ageYears !== undefined) {
      if (ageYears >= 75) {
        score += 2;
        factorsSummary.push('Edad ≥ 75 años (+2)');
      } else if (ageYears >= 65) {
        score += 1;
        factorsSummary.push('Edad 65-74 años (+1)');
      }
    }

    if (diabetes) {
      score += 1;
      factorsSummary.push('Diabetes Mellitus (+1)');
    }
    if (strokeOrTia) {
      score += 2;
      factorsSummary.push('Antecedente de ACV / AIT / Tromboembolismo (+2)');
    }
    if (vascularDisease) {
      score += 1;
      factorsSummary.push('Enfermedad Vascular periférica / IAM / Placa aórtica (+1)');
    }
    if (isFemale) {
      score += 1;
      factorsSummary.push('Sexo Femenino (+1)');
    }

    const strokeRiskMap: Record<number, number> = {
      0: 0.2,
      1: 0.6,
      2: 2.2,
      3: 3.2,
      4: 4.8,
      5: 7.2,
      6: 9.7,
      7: 11.2,
      8: 12.5,
      9: 15.2,
    };

    const strokeRisk = strokeRiskMap[score] ?? 15.2;

    // ESC 2020 / AHA Guidelines:
    // Men: 0 = low, 1 = moderate, >=2 = high
    // Women: 1 (only sex) = low, 2 = moderate, >=3 = high
    const nonSexScore = isFemale ? score - 1 : score;

    let interpretation: InterpretationRange;

    if (nonSexScore === 0) {
      interpretation = {
        min: 0,
        max: 1,
        label: 'Riesgo Tromboembólico Bajo',
        severity: 'normal',
        clinicalAction: 'No se recomienda terapia antitrombótica ni anticoagulante.',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200',
        cardBorderClass: 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20',
        bgHighlightClass: 'text-emerald-700 dark:text-emerald-400',
      };
    } else if (nonSexScore === 1) {
      interpretation = {
        min: 1,
        max: 2,
        label: 'Riesgo Tromboembólico Intermedio',
        severity: 'warning',
        clinicalAction: 'Debe considerarse anticoagulación oral (anticoagulantes orales directos preferidos sobre AVK).',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200',
        cardBorderClass: 'border-amber-400 bg-amber-50/50 dark:bg-amber-950/20',
        bgHighlightClass: 'text-amber-700 dark:text-amber-400',
      };
    } else {
      interpretation = {
        min: 2,
        max: 9,
        label: 'Riesgo Tromboembólico Alto',
        severity: 'critical',
        clinicalAction: 'Anticoagulación oral formalmente indicada salvo contraindicación absoluta (evaluar riesgo de sangrado HAS-BLED).',
        badgeClass: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200',
        cardBorderClass: 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/30',
        bgHighlightClass: 'text-rose-700 dark:text-rose-400',
      };
    }

    const dateStr = new Date().toISOString();

    const plainText = `[Calculadora Médica DoctorChart - Score CHA₂DS₂-VASc]
Fecha: ${new Date().toLocaleDateString('es-AR')} ${new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
Puntaje Total: ${score} puntos (${interpretation.label})
Riesgo anual de ACV isquémico estimado: ${strokeRisk}% / año
Factores identificados: ${factorsSummary.length > 0 ? factorsSummary.join(', ') : 'Ninguno'}
Recomendación terapéutica: ${interpretation.clinicalAction}`;

    return {
      calculatorId: 'chads_vasc',
      rawValue: score,
      formattedValue: `${score} / 9`,
      unit: 'puntos',
      interpretation,
      secondaryOutputs: [
        {
          label: 'Riesgo Anual de ACV',
          value: `${strokeRisk}%`,
          unit: '/ año',
          description: 'Tasa anual ajustada de accidente cerebrovascular isquémico.',
        },
        {
          label: 'Puntaje no dependiente de sexo',
          value: `${nonSexScore}`,
          unit: 'pts',
          description: 'Criterio para toma de decisiones según guías ESC.',
        },
      ],
      clinicalAction: interpretation.clinicalAction,
      clinicalNotes: factorsSummary.length > 0 ? factorsSummary : ['Sin factores de riesgo adicionales marcados.'],
      calculatedAt: dateStr,
      plainTextEvolution: plainText,
    };
  }

  // -------------------------------------------------------------
  // 5. Calcio Sérico Corregido por Albúmina
  // -------------------------------------------------------------
  calculateCalciumCorrection(inputs: CalciumCorrectionInputs): CalculationResult | null {
    const { serumCalciumMgDl, serumAlbuminGDl } = inputs;
    if (
      serumCalciumMgDl === null ||
      serumAlbuminGDl === null ||
      serumCalciumMgDl <= 0 ||
      serumAlbuminGDl <= 0
    ) {
      return null;
    }

    const correctedCa = serumCalciumMgDl + 0.8 * (4.0 - serumAlbuminGDl);

    let interpretation: InterpretationRange;

    if (correctedCa < 8.5) {
      interpretation = {
        min: 0,
        max: 8.49,
        label: 'Hipocalcemia Corregida (< 8.5 mg/dL)',
        severity: 'danger',
        clinicalAction: 'Evaluar síntomas neuromusculares (Chvostek, Trousseau), niveles de PTH, magnesio y vitamina D.',
        badgeClass: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-200',
        cardBorderClass: 'border-blue-400 bg-blue-50/50 dark:bg-blue-950/20',
        bgHighlightClass: 'text-blue-700 dark:text-blue-400',
      };
    } else if (correctedCa <= 10.5) {
      interpretation = {
        min: 8.5,
        max: 10.5,
        label: 'Normocalcemia (Rango normal 8.5 - 10.5 mg/dL)',
        severity: 'normal',
        clinicalAction: 'Calcio ionizado activo fisiológicamente adecuado.',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200',
        cardBorderClass: 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20',
        bgHighlightClass: 'text-emerald-700 dark:text-emerald-400',
      };
    } else if (correctedCa <= 12.0) {
      interpretation = {
        min: 10.51,
        max: 12.0,
        label: 'Hipercalcemia Leve (10.6 - 12.0 mg/dL)',
        severity: 'warning',
        clinicalAction: 'Descartar hiperparatiroidismo primario, fármacos (tiazidas, litio) o neoplasias.',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200',
        cardBorderClass: 'border-amber-400 bg-amber-50/50 dark:bg-amber-950/20',
        bgHighlightClass: 'text-amber-700 dark:text-amber-400',
      };
    } else {
      interpretation = {
        min: 12.01,
        max: Infinity,
        label: 'Hipercalcemia Moderada / Severa (> 12.0 mg/dL)',
        severity: 'critical',
        clinicalAction: 'Emergencia metabólica potencial: hidratación salina endovenosa vigorosa, furosemida y bifosfonatos.',
        badgeClass: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200',
        cardBorderClass: 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/30',
        bgHighlightClass: 'text-rose-700 dark:text-rose-400',
      };
    }

    const formattedCa = correctedCa.toFixed(2);
    const dateStr = new Date().toISOString();

    const plainText = `[Calculadora Médica DoctorChart - Calcio Corregido por Albúmina]
Fecha: ${new Date().toLocaleDateString('es-AR')} ${new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
Parámetros: Calcio sérico total ${serumCalciumMgDl} mg/dL | Albúmina ${serumAlbuminGDl} g/dL
• Calcio Corregido: ${formattedCa} mg/dL
• Interpretación: ${interpretation.label}
Recomendación clínica: ${interpretation.clinicalAction}`;

    return {
      calculatorId: 'calcio_corregido',
      rawValue: correctedCa,
      formattedValue: formattedCa,
      unit: 'mg/dL',
      interpretation,
      secondaryOutputs: [
        {
          label: 'Calcio Medido Original',
          value: serumCalciumMgDl.toFixed(2),
          unit: 'mg/dL',
        },
        {
          label: 'Albúmina Medida',
          value: serumAlbuminGDl.toFixed(2),
          unit: 'g/dL',
        },
      ],
      clinicalAction: interpretation.clinicalAction,
      clinicalNotes: [
        'Ajuste calculado considerando una albúmina de referencia de 4.0 g/dL.',
        'En pacientes críticos con acidosis o alcalosis severa, se sugiere confirmar con dosaje directo de Calcio Iónico.',
      ],
      calculatedAt: dateStr,
      plainTextEvolution: plainText,
    };
  }

  // -------------------------------------------------------------
  // Persistencia e Historial en Memoria / LocalStorage
  // -------------------------------------------------------------
  saveCalculation(item: Omit<SavedCalculationItem, 'id'>): SavedCalculationItem {
    const newItem: SavedCalculationItem = {
      ...item,
      id: `calc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    };

    const currentList = this.savedHistory();
    const updated = [newItem, ...currentList.slice(0, 49)]; // Limit to last 50
    this.savedHistory.set(updated);
    this.persistHistory(updated);
    return newItem;
  }

  deleteCalculation(id: string): void {
    const updated = this.savedHistory().filter((c) => c.id !== id);
    this.savedHistory.set(updated);
    this.persistHistory(updated);
  }

  clearHistory(): void {
    this.savedHistory.set([]);
    this.persistHistory([]);
  }

  async copyToClipboard(text: string): Promise<boolean> {
    if (!isPlatformBrowser(this.platformId) || typeof navigator === 'undefined') {
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  private loadStoredCalculations(): SavedCalculationItem[] {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(SAVED_CALCULATIONS_KEY);
        if (raw) {
          return JSON.parse(raw) as SavedCalculationItem[];
        }
      } catch (err) {
        console.warn('Error reading saved calculations from localStorage:', err);
      }
    }
    return [];
  }

  private persistHistory(items: SavedCalculationItem[]): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      try {
        localStorage.setItem(SAVED_CALCULATIONS_KEY, JSON.stringify(items));
      } catch (err) {
        console.warn('Error saving calculations to localStorage:', err);
      }
    }
  }
}
