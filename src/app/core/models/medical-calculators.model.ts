export type SeverityLevel = 'normal' | 'low' | 'warning' | 'danger' | 'critical';

export type CalculatorId =
  | 'imc'
  | 'tfge'
  | 'cockcroft'
  | 'chads_vasc'
  | 'calcio_corregido';

export type CalculatorCategory =
  | 'antropometria'
  | 'nefrologia'
  | 'cardiologia'
  | 'metabolismo';

export interface InterpretationRange {
  readonly min: number;
  readonly max: number;
  readonly label: string;
  readonly severity: SeverityLevel;
  readonly clinicalAction?: string;
  readonly badgeClass: string;
  readonly cardBorderClass: string;
  readonly bgHighlightClass: string;
}

export interface CalculatorMetadata {
  readonly id: CalculatorId;
  readonly name: string;
  readonly shortName: string;
  readonly category: CalculatorCategory;
  readonly categoryLabel: string;
  readonly icon: string;
  readonly description: string;
  readonly evidenceReference: string;
  readonly summaryFormula: string;
}

export interface CalculationResult<T = number> {
  readonly calculatorId: CalculatorId;
  readonly rawValue: T;
  readonly formattedValue: string;
  readonly unit: string;
  readonly interpretation: InterpretationRange;
  readonly secondaryOutputs?: Array<{
    readonly label: string;
    readonly value: string;
    readonly unit?: string;
    readonly description?: string;
  }>;
  readonly clinicalAction?: string;
  readonly clinicalNotes: string[];
  readonly calculatedAt: string;
  readonly plainTextEvolution: string;
}

export interface SavedCalculationItem {
  readonly id: string;
  readonly calculatorId: CalculatorId;
  readonly calculatorName: string;
  readonly patientId?: number | null;
  readonly patientName?: string | null;
  readonly resultHeadline: string;
  readonly interpretationLabel: string;
  readonly severity: SeverityLevel;
  readonly calculatedAt: string;
  readonly plainTextEvolution: string;
  readonly inputsSummary: Record<string, string | number | boolean>;
}

export interface BmiCalculatorInputs {
  weightKg: number | null;
  heightCm: number | null;
}

export interface TfgeCalculatorInputs {
  creatinineMgDl: number | null;
  ageYears: number | null;
  gender: 'FEMALE' | 'MALE';
}

export interface CockcroftCalculatorInputs {
  weightKg: number | null;
  ageYears: number | null;
  creatinineMgDl: number | null;
  gender: 'FEMALE' | 'MALE';
}

export interface ChadsVascCalculatorInputs {
  ageYears: number | null;
  isFemale: boolean;
  congestiveHeartFailure: boolean;
  hypertension: boolean;
  diabetes: boolean;
  strokeOrTia: boolean;
  vascularDisease: boolean;
}

export interface CalciumCorrectionInputs {
  serumCalciumMgDl: number | null;
  serumAlbuminGDl: number | null;
}
