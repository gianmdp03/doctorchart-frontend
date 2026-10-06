import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CalculatorAutofillContext,
  CalculatorFormState,
  CalculatorInputSummary,
  AutofillFeedback,
} from './calculator-form';

export class HollidaySegarCalculatorForm implements CalculatorFormState {
  readonly weightKg = signal<number | null>(null);
  readonly complete = computed(() => !!(this.weightKg() && this.weightKg()! > 0));
  readonly inputs = computed<Record<string, unknown>>(() => ({
    weightKg: this.weightKg(),
  }));

  reset(): void {
    this.weightKg.set(null);
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
    return { filledParams, missingParams };
  }
}

export function summarizeHollidaySegarInputs(
  inputs: Record<string, unknown>,
): CalculatorInputSummary {
  const number = (key: string) => inputs[key] as number;
  return { 'Peso Pediátrico (kg)': number('weightKg') };
}

@Component({
  selector: 'app-holliday-segar-calculator',
  imports: [FormsModule],
  templateUrl: './holliday-segar-calculator.component.html',
  styleUrl: './calculator-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HollidaySegarCalculatorComponent {
  readonly form = input.required<HollidaySegarCalculatorForm>();
}
