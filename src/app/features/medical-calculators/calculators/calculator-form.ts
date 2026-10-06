import { Signal, Type } from '@angular/core';

export interface CalculatorAutofillContext {
  age: number | null;
  gender: 'FEMALE' | 'MALE' | null;
  weight: number | null;
  height: number | null;
  creatinine: number | null;
  calcium: number | null;
  albumin: number | null;
}
export interface AutofillFeedback {
  filledParams: string[];
  missingParams: string[];
}
export type CalculatorInputSummary = Record<string, string | number | boolean>;

/** Form readiness only. All formulas and clinical validation remain on the server. */
export interface CalculatorFormState {
  readonly complete: Signal<boolean>;
  readonly inputs: Signal<Record<string, unknown>>;
  reset(): void;
  autofill(context: CalculatorAutofillContext): AutofillFeedback;
}
export interface CalculatorUiDefinition {
  readonly component: Type<unknown>;
  readonly createForm: () => CalculatorFormState;
  readonly summarize: (inputs: Record<string, unknown>) => CalculatorInputSummary;
}
export interface CalculatorUiSession {
  readonly component: Type<unknown>;
  readonly form: CalculatorFormState;
}
