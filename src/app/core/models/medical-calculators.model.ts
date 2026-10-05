export type SeverityLevel = 'normal' | 'low' | 'warning' | 'danger' | 'critical';

export type CalculatorId =
  | 'imc'
  | 'tfge'
  | 'cockcroft'
  | 'chads_vasc'
  | 'calcio_corregido'
  | 'holliday_segar'
  | 'bsa_mosteller'
  | 'pediatric_dosage';

export type CalculatorCategory =
  | 'antropometria'
  | 'nefrologia'
  | 'cardiologia'
  | 'metabolismo'
  | 'pediatria';

export interface InterpretationRange {
  readonly code: string;
  readonly min: number | null;
  readonly max: number | null;
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
  readonly calculationName: string;
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

// -------------------------------------------------------------
// Backend DTO Models
// -------------------------------------------------------------
export interface PatientAutofillDataDTO {
  readonly patientId: number;
  readonly fullName: string;
  readonly birthDate: string | null;
  readonly ageYears: number | null;
  readonly gender: 'MALE' | 'FEMALE' | string | null;
  readonly weightKg: number | null;
  readonly heightCm: number | null;
  readonly systolicBloodPressure: number | null;
  readonly diastolicBloodPressure: number | null;
  readonly creatinineMgDl: number | null;
  readonly serumCalciumMgDl: number | null;
  readonly serumAlbuminGDl: number | null;
  readonly encounterId: number | null;
  readonly encounterDate: string | null;
}

export interface CalculationExecutionRequestDTO {
  readonly patientId: number;
  readonly encounterId?: number | null;
  readonly calculationCode: string;
  readonly inputSnapshot: Record<string, unknown>;
}

export interface CalculationPreviewRequestDTO {
  readonly calculationCode: CalculatorId;
  readonly inputSnapshot: Record<string, unknown>;
}

export type CalculationResultResponseDTO = Omit<CalculationResult, 'interpretation'> & {
  readonly interpretation: Omit<InterpretationRange, 'badgeClass' | 'cardBorderClass' | 'bgHighlightClass'>;
};

export interface PatientCalculationLogDetailDTO {
  readonly id: number;
  readonly patientId: number;
  readonly patientFullName: string;
  readonly userId: string;
  readonly encounterId?: number | null;
  readonly calculationCode: string;
  readonly calculationName: string;
  readonly inputSnapshot: Record<string, unknown>;
  readonly resultValue?: number | null;
  readonly formattedResult: string;
  readonly resultUnit?: string;
  readonly resultInterpretation?: string;
  readonly severity?: SeverityLevel | string;
  readonly plainTextEvolution?: string;
  readonly createdAt: string;
}

export interface DoctorCalculatorPreferenceDTO {
  readonly userId: string;
  readonly favoriteCalculationCodes: string[];
  readonly updatedAt: string;
}

export interface ClinicalCalculationDefinitionDTO {
  readonly id: number;
  readonly code: string;
  readonly name: string;
  readonly shortName: string;
  readonly category: string;
  readonly categoryLabel: string;
  readonly description: string;
  readonly evidenceReference: string;
  readonly summaryFormula: string;
  readonly requiredParameters: string[];
  readonly resultUnit: string;
  readonly defaultSpecialties: string[];
  readonly isSystem: boolean;
}
