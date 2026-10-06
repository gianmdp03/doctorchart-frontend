export interface AnthropometricMeasurements {
  weightKg?: number | null;
  heightCm?: number | null;
  headCircumferenceCm?: number | null;
}

export interface GuardianInfo {
  fatherFullName?: string;
  motherFullName?: string;
  siblingsCount?: number | null;
  firstGuardianFullName?: string;
  secondGuardianFullName?: string;
  firstGuardianPhone?: string;
  secondGuardianPhone?: string;
  firstGuardianNationalId?: string;
  secondGuardianNationalId?: string;
  address?: string;
  primaryGuardian?: string;
  primaryContactPhone?: string;
  hasSiblings?: boolean | null;
  siblingOrder?: number | null;
  livingArrangement?: string;
}

export interface PerinatalHistory {
  gestationCount?: number | null;
  prenatalVisitsSummary?: string;
  pregnancyComplications?: string[];
}

export interface PersonalHistory {
  chronicOrPreviousDiseases?: string[];
  hospitalizationsOrSurgeries?: string[];
  allergies?: string[];
  habitualMedication?: string[];
  birthMeasurements?: AnthropometricMeasurements;
}

export interface FamilyHistory {
  familyChronicDiseases?: string[];
  familyAllergies?: string[];
  geneticDiseases?: string[];
  paternalDiseases?: string[];
  maternalDiseases?: string[];
  siblingDiseases?: string[];
}

export interface ImmunizationAndNutrition {
  vaccinationHistory?: string[];
  feedingDiet?: string;
}
