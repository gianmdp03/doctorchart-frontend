// Presentation only. Clinical classifications and results come from the backend.
export interface CalculatorResultStyle { badgeClass: string; cardBorderClass: string; bgHighlightClass: string; }
export const CALCULATOR_RESULT_STYLES: Readonly<Record<string, CalculatorResultStyle>> = {
  "bmi_underweight": {
    "badgeClass": "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200",
    "cardBorderClass": "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20",
    "bgHighlightClass": "text-amber-700 dark:text-amber-400"
  },
  "bmi_normal": {
    "badgeClass": "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200",
    "cardBorderClass": "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20",
    "bgHighlightClass": "text-emerald-700 dark:text-emerald-400"
  },
  "bmi_overweight": {
    "badgeClass": "bg-yellow-100 text-yellow-900 border-yellow-300 dark:bg-yellow-950/60 dark:text-yellow-200",
    "cardBorderClass": "border-yellow-400 bg-yellow-50/50 dark:bg-yellow-950/20",
    "bgHighlightClass": "text-yellow-800 dark:text-yellow-400"
  },
  "bmi_obesity_1": {
    "badgeClass": "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-200",
    "cardBorderClass": "border-orange-400 bg-orange-50/50 dark:bg-orange-950/20",
    "bgHighlightClass": "text-orange-700 dark:text-orange-400"
  },
  "bmi_obesity_2": {
    "badgeClass": "bg-red-100 text-red-800 border-red-300 dark:bg-red-950/60 dark:text-red-200",
    "cardBorderClass": "border-red-400 bg-red-50/50 dark:bg-red-950/20",
    "bgHighlightClass": "text-red-700 dark:text-red-400"
  },
  "bmi_obesity_3": {
    "badgeClass": "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200",
    "cardBorderClass": "border-rose-500 bg-rose-50/60 dark:bg-rose-950/30",
    "bgHighlightClass": "text-rose-700 dark:text-rose-400"
  },
  "renal_g1": {
    "badgeClass": "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200",
    "cardBorderClass": "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20",
    "bgHighlightClass": "text-emerald-700 dark:text-emerald-400"
  },
  "renal_g2": {
    "badgeClass": "bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-200",
    "cardBorderClass": "border-teal-400 bg-teal-50/50 dark:bg-teal-950/20",
    "bgHighlightClass": "text-teal-700 dark:text-teal-400"
  },
  "renal_g3a": {
    "badgeClass": "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200",
    "cardBorderClass": "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20",
    "bgHighlightClass": "text-amber-700 dark:text-amber-400"
  },
  "renal_g3b": {
    "badgeClass": "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-200",
    "cardBorderClass": "border-orange-400 bg-orange-50/50 dark:bg-orange-950/20",
    "bgHighlightClass": "text-orange-700 dark:text-orange-400"
  },
  "renal_g4": {
    "badgeClass": "bg-red-100 text-red-800 border-red-300 dark:bg-red-950/60 dark:text-red-200",
    "cardBorderClass": "border-red-400 bg-red-50/50 dark:bg-red-950/20",
    "bgHighlightClass": "text-red-700 dark:text-red-400"
  },
  "renal_g5": {
    "badgeClass": "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200",
    "cardBorderClass": "border-rose-500 bg-rose-50/60 dark:bg-rose-950/30",
    "bgHighlightClass": "text-rose-700 dark:text-rose-400"
  },
  "clearance_normal": {
    "badgeClass": "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200",
    "cardBorderClass": "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20",
    "bgHighlightClass": "text-emerald-700 dark:text-emerald-400"
  },
  "clearance_mild": {
    "badgeClass": "bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-200",
    "cardBorderClass": "border-teal-400 bg-teal-50/50 dark:bg-teal-950/20",
    "bgHighlightClass": "text-teal-700 dark:text-teal-400"
  },
  "clearance_moderate": {
    "badgeClass": "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200",
    "cardBorderClass": "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20",
    "bgHighlightClass": "text-amber-700 dark:text-amber-400"
  },
  "clearance_severe": {
    "badgeClass": "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-200",
    "cardBorderClass": "border-orange-400 bg-orange-50/50 dark:bg-orange-950/20",
    "bgHighlightClass": "text-orange-700 dark:text-orange-400"
  },
  "clearance_terminal": {
    "badgeClass": "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200",
    "cardBorderClass": "border-rose-500 bg-rose-50/60 dark:bg-rose-950/30",
    "bgHighlightClass": "text-rose-700 dark:text-rose-400"
  },
  "stroke_low": {
    "badgeClass": "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200",
    "cardBorderClass": "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20",
    "bgHighlightClass": "text-emerald-700 dark:text-emerald-400"
  },
  "stroke_intermediate": {
    "badgeClass": "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200",
    "cardBorderClass": "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20",
    "bgHighlightClass": "text-amber-700 dark:text-amber-400"
  },
  "stroke_high": {
    "badgeClass": "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200",
    "cardBorderClass": "border-rose-500 bg-rose-50/60 dark:bg-rose-950/30",
    "bgHighlightClass": "text-rose-700 dark:text-rose-400"
  },
  "calcium_low": {
    "badgeClass": "bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-200",
    "cardBorderClass": "border-blue-400 bg-blue-50/50 dark:bg-blue-950/20",
    "bgHighlightClass": "text-blue-700 dark:text-blue-400"
  },
  "calcium_normal": {
    "badgeClass": "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200",
    "cardBorderClass": "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20",
    "bgHighlightClass": "text-emerald-700 dark:text-emerald-400"
  },
  "calcium_mild_high": {
    "badgeClass": "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200",
    "cardBorderClass": "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20",
    "bgHighlightClass": "text-amber-700 dark:text-amber-400"
  },
  "calcium_high": {
    "badgeClass": "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200",
    "cardBorderClass": "border-rose-500 bg-rose-50/60 dark:bg-rose-950/30",
    "bgHighlightClass": "text-rose-700 dark:text-rose-400"
  },
  "fluid_maintenance": {
    "badgeClass": "badge-success",
    "cardBorderClass": "border-l-emerald-500",
    "bgHighlightClass": "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
  },
  "body_surface": {
    "badgeClass": "badge-info",
    "cardBorderClass": "border-l-sky-500",
    "bgHighlightClass": "bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300"
  },
  "pediatric_dosage": {
    "badgeClass": "badge-success",
    "cardBorderClass": "border-l-indigo-500",
    "bgHighlightClass": "bg-indigo-50 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300"
  }
};
