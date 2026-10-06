import { CalculatorId } from '../../../core/models/medical-calculators.model';
import {
  CalculatorInputSummary,
  CalculatorUiDefinition,
  CalculatorUiSession,
} from './calculator-form';
import {
  BmiCalculatorComponent,
  BmiCalculatorForm,
  summarizeBmiInputs,
} from './bmi-calculator.component';
import {
  TfgeCalculatorComponent,
  TfgeCalculatorForm,
  summarizeTfgeInputs,
} from './tfge-calculator.component';
import {
  CockcroftCalculatorComponent,
  CockcroftCalculatorForm,
  summarizeCockcroftInputs,
} from './cockcroft-calculator.component';
import {
  ChadsVascCalculatorComponent,
  ChadsVascCalculatorForm,
  summarizeChadsVascInputs,
} from './chads-vasc-calculator.component';
import {
  CalciumCalculatorComponent,
  CalciumCalculatorForm,
  summarizeCalciumInputs,
} from './calcium-calculator.component';
import {
  HollidaySegarCalculatorComponent,
  HollidaySegarCalculatorForm,
  summarizeHollidaySegarInputs,
} from './holliday-segar-calculator.component';
import {
  MostellerCalculatorComponent,
  MostellerCalculatorForm,
  summarizeMostellerInputs,
} from './mosteller-calculator.component';
import {
  PediatricDosageCalculatorComponent,
  PediatricDosageCalculatorForm,
  summarizePediatricDosageInputs,
} from './pediatric-dosage-calculator.component';

/** UI implementations only. Catalog descriptions, order and specialty defaults come from the backend. */
const CALCULATOR_UI: Readonly<Record<CalculatorId, CalculatorUiDefinition>> = {
  imc: {
    component: BmiCalculatorComponent,
    createForm: () => new BmiCalculatorForm(),
    summarize: summarizeBmiInputs,
  },
  tfge: {
    component: TfgeCalculatorComponent,
    createForm: () => new TfgeCalculatorForm(),
    summarize: summarizeTfgeInputs,
  },
  cockcroft: {
    component: CockcroftCalculatorComponent,
    createForm: () => new CockcroftCalculatorForm(),
    summarize: summarizeCockcroftInputs,
  },
  chads_vasc: {
    component: ChadsVascCalculatorComponent,
    createForm: () => new ChadsVascCalculatorForm(),
    summarize: summarizeChadsVascInputs,
  },
  calcio_corregido: {
    component: CalciumCalculatorComponent,
    createForm: () => new CalciumCalculatorForm(),
    summarize: summarizeCalciumInputs,
  },
  holliday_segar: {
    component: HollidaySegarCalculatorComponent,
    createForm: () => new HollidaySegarCalculatorForm(),
    summarize: summarizeHollidaySegarInputs,
  },
  bsa_mosteller: {
    component: MostellerCalculatorComponent,
    createForm: () => new MostellerCalculatorForm(),
    summarize: summarizeMostellerInputs,
  },
  pediatric_dosage: {
    component: PediatricDosageCalculatorComponent,
    createForm: () => new PediatricDosageCalculatorForm(),
    summarize: summarizePediatricDosageInputs,
  },
};

/** Every screen receives its own state; switching forms retains that screen's inputs. */
export function createCalculatorSessions(): ReadonlyMap<string, CalculatorUiSession> {
  return new Map(
    Object.entries(CALCULATOR_UI).map(([code, module]) => [
      code,
      { component: module.component, form: module.createForm() },
    ]),
  );
}

export function summarizeCalculatorInputs(
  code: string,
  inputs: Record<string, unknown>,
): CalculatorInputSummary {
  const module = Object.hasOwn(CALCULATOR_UI, code)
    ? CALCULATOR_UI[code as CalculatorId]
    : undefined;
  return module ? module.summarize(inputs) : (inputs as CalculatorInputSummary);
}
