import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CalculatorAutofillContext,
  CalculatorFormState,
  CalculatorInputSummary,
  AutofillFeedback,
} from './calculator-form';

export class BmiCalculatorForm implements CalculatorFormState {
  readonly weightKg = signal<number | null>(null);
  readonly heightCm = signal<number | null>(null);
  readonly complete = computed(
    () => !!(this.weightKg() && this.heightCm() && this.weightKg()! > 0 && this.heightCm()! > 0),
  );
  readonly inputs = computed<Record<string, unknown>>(() => ({
    weightKg: this.weightKg(),
    heightCm: this.heightCm(),
  }));

  reset(): void {
    this.weightKg.set(null);
    this.heightCm.set(null);
  }

  autofill(context: CalculatorAutofillContext): AutofillFeedback {
    const { weight, height } = context;
    const filledParams: string[] = [],
      missingParams: string[] = [];
    if (weight != null && weight > 0) {
      this.weightKg.set(weight);
      filledParams.push(`Peso: ${weight} kg`);
    } else {
      this.weightKg.set(null);
      missingParams.push('Peso');
    }

    if (height != null && height > 0) {
      this.heightCm.set(height);
      filledParams.push(`Talla: ${height} cm`);
    } else {
      this.heightCm.set(null);
      missingParams.push('Talla');
    }
    return { filledParams, missingParams };
  }
}

export function summarizeBmiInputs(inputs: Record<string, unknown>): CalculatorInputSummary {
  const number = (key: string) => inputs[key] as number;
  return { 'Peso (kg)': number('weightKg'), 'Talla (cm)': number('heightCm') };
}

@Component({
  selector: 'app-bmi-calculator',
  imports: [FormsModule],
  templateUrl: './bmi-calculator.component.html',
  styleUrl: './calculator-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmiCalculatorComponent {
  readonly form = input.required<BmiCalculatorForm>();
}
