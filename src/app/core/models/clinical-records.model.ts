export interface AnthropometricMeasurements {
  weight?: number | null;
  height?: number | null;
  headCircumference?: number | null;
}

export interface GuardianInfo {
  firstGuardianFullName?: string;
  secondGuardianFullName?: string;
  firstGuardianPhone?: string;
  secondGuardianPhone?: string;
  firstGuardianNationalId?: string;
  secondGuardianNationalId?: string;
  address?: string;
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
}

export interface ImmunizationAndNutrition {
  vaccinationHistory?: string[];
  feedingDiet?: string;
  developmentalMilestones?: string;
}
