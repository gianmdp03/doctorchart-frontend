import { CalculatorId } from './medical-calculators.model';

// Presentation only; catalog metadata and default selection come from the backend.
export const CALCULATOR_ICONS: Readonly<Record<CalculatorId, string>> = {
  "imc": "lucideWeight",
  "tfge": "lucideActivity",
  "cockcroft": "lucideStethoscope",
  "chads_vasc": "lucideHeart",
  "calcio_corregido": "lucideFlaskConical",
  "holliday_segar": "lucideDroplets",
  "bsa_mosteller": "lucideSparkles",
  "pediatric_dosage": "lucidePill"
};
