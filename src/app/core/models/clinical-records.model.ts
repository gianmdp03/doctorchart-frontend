export interface AnthropometricMeasurements {
  weightKg?: number | null;
  heightCm?: number | null;
  headCircumferenceCm?: number | null;
}

export interface GuardianInfo {
  fatherFullName?: string;
  motherFullName?: string;
  siblingsCount?: number | null;
  primaryGuardian?: string;
  primaryContactPhone?: string;
  hasSiblings?: boolean | null;
  siblingOrder?: number | null;
  livingArrangement?: string;
}

export interface PersonalHistory {
  chronicOrPreviousDiseases?: string[];
  hospitalizationsOrSurgeries?: string[];
  allergies?: string[];
  habitualMedication?: string[];
  birthMeasurements?: AnthropometricMeasurements;
}

export interface FamilyHistory {
  paternalDiseases?: string[];
  maternalDiseases?: string[];
  siblingDiseases?: string[];
}
