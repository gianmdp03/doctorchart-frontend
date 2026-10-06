import { ClinicalCalculationDefinitionDTO } from '../models/medical-calculators.model';

// Frozen test fixture of the catalog shown before phase 5.
export const CALCULATOR_CATALOG_FIXTURE: ClinicalCalculationDefinitionDTO[] = [
  {
    "id": 1,
    "code": "imc",
    "name": "Índice de Masa Corporal (IMC) y BSA",
    "shortName": "IMC & BSA",
    "category": "antropometria",
    "categoryLabel": "Antropometría",
    "description": "Evalúa el estado nutricional del adulto según la OMS y estima la superficie corporal (BSA) mediante Mosteller.",
    "evidenceReference": "OMS / Mosteller RD. N Engl J Med 1987.",
    "summaryFormula": "IMC = Peso (kg) / [Talla (m)]² | BSA = √[Peso(kg) × Talla(cm) / 3600]",
    "requiredParameters": [
      "weightKg",
      "heightCm"
    ],
    "resultUnit": "kg/m²",
    "isSystem": true,
    "displayOrder": 0
  },
  {
    "id": 2,
    "code": "tfge",
    "name": "Filtrado Glomerular Estimado (CKD-EPI 2021)",
    "shortName": "TFGe (CKD-EPI)",
    "category": "nefrologia",
    "categoryLabel": "Nefrología",
    "description": "Ecuación estándar de referencia internacional para estimar el filtrado glomerular sin ajuste de raza.",
    "evidenceReference": "Inker LA et al. N Engl J Med 2021; KDIGO 2024 Guidelines.",
    "summaryFormula": "CKD-EPI 2021 con Creatinina Sérica, Edad y Sexo Biológico",
    "requiredParameters": [
      "creatinineMgDl",
      "ageYears",
      "gender"
    ],
    "resultUnit": "mL/min/1.73 m²",
    "isSystem": true,
    "displayOrder": 1
  },
  {
    "id": 3,
    "code": "cockcroft",
    "name": "Aclaramiento de Creatinina (Cockcroft-Gault)",
    "shortName": "ClCr Cockcroft",
    "category": "nefrologia",
    "categoryLabel": "Farmacología / Nefro",
    "description": "Cálculo mandatorio para la dosificación y ajuste posológico de fármacos de excreción renal.",
    "evidenceReference": "Cockcroft DW, Gault MH. Nephron 1976; FDA Renal Impairment Guidance.",
    "summaryFormula": "ClCr = [(140 - edad) × peso] / [72 × Cr] (× 0.85 si mujer)",
    "requiredParameters": [
      "weightKg",
      "ageYears",
      "creatinineMgDl",
      "gender"
    ],
    "resultUnit": "mL/min",
    "isSystem": true,
    "displayOrder": 2
  },
  {
    "id": 4,
    "code": "chads_vasc",
    "name": "Score CHA₂DS₂-VASc",
    "shortName": "CHA₂DS₂-VASc",
    "category": "cardiologia",
    "categoryLabel": "Cardiología",
    "description": "Estratificación de riesgo tromboembólico en Fibrilación Auricular no valvular e indicación de anticoagulación.",
    "evidenceReference": "Lip GY et al. Chest 2010; Guías ESC / AHA Fibrilación Auricular.",
    "summaryFormula": "Suma de factores clínicos: C(1), H(1), A₂(2), D(1), S₂(2), V(1), A(1), Sc(1)",
    "requiredParameters": [
      "ageYears",
      "isFemale",
      "congestiveHeartFailure",
      "hypertension",
      "diabetes",
      "strokeOrTia",
      "vascularDisease"
    ],
    "resultUnit": "puntos",
    "isSystem": true,
    "displayOrder": 3
  },
  {
    "id": 5,
    "code": "calcio_corregido",
    "name": "Calcio Sérico Corregido por Albúmina",
    "shortName": "Calcio Corregido",
    "category": "metabolismo",
    "categoryLabel": "Metabolismo / Lab",
    "description": "Ajusta la calcemia total en presencia de hipoalbuminemia o alteraciones de proteínas séricas.",
    "evidenceReference": "Payne RB et al. Br Med J 1973.",
    "summaryFormula": "Ca Corregido = Ca Total + 0.8 × (4.0 - Albúmina)",
    "requiredParameters": [
      "serumCalciumMgDl",
      "serumAlbuminGDl"
    ],
    "resultUnit": "mg/dL",
    "isSystem": true,
    "displayOrder": 4
  },
  {
    "id": 6,
    "code": "holliday_segar",
    "name": "Requerimiento Hídrico Basal Pediátrico (Holliday-Segar)",
    "shortName": "Holliday-Segar",
    "category": "pediatria",
    "categoryLabel": "Pediatría",
    "description": "Cálculo de necesidades de mantenimiento de líquidos y electrolitos según peso en pacientes pediátricos.",
    "evidenceReference": "Holliday MA, Segar WE. Pediatrics 1957; 19(5):823-832.",
    "summaryFormula": "1-10kg: 100mL/kg | 11-20kg: 1000 + 50*(kg-10) | >20kg: 1500 + 20*(kg-20)",
    "requiredParameters": [
      "weightKg"
    ],
    "resultUnit": "mL/día",
    "isSystem": true,
    "displayOrder": 5
  },
  {
    "id": 7,
    "code": "bsa_mosteller",
    "name": "Superficie Corporal Pediátrica y Adulto (Mosteller)",
    "shortName": "Superficie Corporal (BSA)",
    "category": "pediatria",
    "categoryLabel": "Pediatría / Onco",
    "description": "Estimación de área de superficie corporal (BSA) mediante Mosteller para dosificación en quimioterapia y fluidos.",
    "evidenceReference": "Mosteller RD. N Engl J Med 1987; 317:1098.",
    "summaryFormula": "BSA (m²) = √[(Peso (kg) × Talla (cm)) / 3600]",
    "requiredParameters": [
      "weightKg",
      "heightCm"
    ],
    "resultUnit": "m²",
    "isSystem": true,
    "displayOrder": 6
  },
  {
    "id": 8,
    "code": "pediatric_dosage",
    "name": "Dosificación Pediátrica por Peso (mg/kg)",
    "shortName": "Dosis Pediátrica",
    "category": "pediatria",
    "categoryLabel": "Pediatría / Farma",
    "description": "Calcula la dosis terapéutica en mg y volumen en mL por toma a partir del peso del niño, dosis objetivo y presentación.",
    "evidenceReference": "AAP / Nelson Textbook of Pediatrics 21a Ed.",
    "summaryFormula": "Dosis = Peso × Dosis objetivo | Volumen (mL) = Dosis / Concentración",
    "requiredParameters": [
      "weightKg",
      "targetDoseMgKg",
      "doseUnit",
      "drugConcentrationMg",
      "drugConcentrationMl",
      "dosesPerDay"
    ],
    "resultUnit": "mL/dosis",
    "isSystem": true,
    "displayOrder": 7
  }
];
