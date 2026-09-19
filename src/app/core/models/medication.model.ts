export interface Medication {
  id: number;
  name: string;
  genericName: string;
  presentation: string;
  defaultDose: string;
  administrationRoute: string;
  typicalFrequency: string;
  typicalDurationDays?: number | null;
  category: string;
}
