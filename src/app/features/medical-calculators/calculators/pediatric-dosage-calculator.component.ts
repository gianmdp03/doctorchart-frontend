import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CalculatorAutofillContext,
  CalculatorFormState,
  CalculatorInputSummary,
  AutofillFeedback,
} from './calculator-form';

export class PediatricDosageCalculatorForm implements CalculatorFormState {
  readonly weightKg = signal<number | null>(null);
  readonly targetDoseMgKg = signal<number | null>(null);
  readonly doseUnit = signal<'mg/kg/dia' | 'mg/kg/dosis'>('mg/kg/dia');
  readonly drugConcentrationMg = signal<number | null>(null);
  readonly drugConcentrationMl = signal<number | null>(null);
  readonly dosesPerDay = signal<number>(3);
  readonly complete = computed(
    () =>
      !!(
        this.weightKg() &&
        this.targetDoseMgKg() &&
        this.drugConcentrationMg() &&
        this.drugConcentrationMl() &&
        this.dosesPerDay() &&
        this.weightKg()! > 0 &&
        this.targetDoseMgKg()! > 0 &&
        this.drugConcentrationMg()! > 0 &&
        this.drugConcentrationMl()! > 0 &&
        this.dosesPerDay() > 0
      ),
  );
  readonly inputs = computed<Record<string, unknown>>(() => ({
    weightKg: this.weightKg(),
    targetDoseMgKg: this.targetDoseMgKg(),
    doseUnit: this.doseUnit(),
    drugConcentrationMg: this.drugConcentrationMg(),
    drugConcentrationMl: this.drugConcentrationMl(),
    dosesPerDay: this.dosesPerDay(),
  }));

  reset(): void {
    this.weightKg.set(null);
    this.targetDoseMgKg.set(null);
    this.drugConcentrationMg.set(null);
    this.drugConcentrationMl.set(null);
  }

  autofill(context: CalculatorAutofillContext): AutofillFeedback {
    const { weight } = context;
    const filledParams: string[] = [],
      missingParams: string[] = [];
    if (weight != null && weight > 0) {
      this.weightKg.set(weight);
      filledParams.push(`Peso: ${weight} kg`);
    } else {
      this.weightKg.set(null);
      missingParams.push('Peso');
    }
    missingParams.push('Dosis objetivo y concentración del fármaco');
    return { filledParams, missingParams };
  }
}

export function summarizePediatricDosageInputs(
  inputs: Record<string, unknown>,
): CalculatorInputSummary {
  const number = (key: string) => inputs[key] as number;
  return {
    'Peso (kg)': number('weightKg'),
    'Dosis objetivo': `${inputs['targetDoseMgKg']} ${inputs['doseUnit']}`,
    Concentración: `${inputs['drugConcentrationMg']} mg / ${inputs['drugConcentrationMl']} mL`,
    Frecuencia: `${inputs['dosesPerDay']} veces al día`,
  };
}

@Component({
  selector: 'app-pediatric-dosage-calculator',
  imports: [FormsModule],
  templateUrl: './pediatric-dosage-calculator.component.html',
  styleUrl: './calculator-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PediatricDosageCalculatorComponent {
  readonly form = input.required<PediatricDosageCalculatorForm>();
}
