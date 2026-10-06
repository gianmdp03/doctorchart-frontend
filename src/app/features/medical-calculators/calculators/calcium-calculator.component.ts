import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CalculatorAutofillContext,
  CalculatorFormState,
  CalculatorInputSummary,
  AutofillFeedback,
} from './calculator-form';

export class CalciumCalculatorForm implements CalculatorFormState {
  readonly serumCalciumMgDl = signal<number | null>(null);
  readonly serumAlbuminGDl = signal<number | null>(null);
  readonly complete = computed(
    () =>
      !!(
        this.serumCalciumMgDl() &&
        this.serumAlbuminGDl() &&
        this.serumCalciumMgDl()! > 0 &&
        this.serumAlbuminGDl()! > 0
      ),
  );
  readonly inputs = computed<Record<string, unknown>>(() => ({
    serumCalciumMgDl: this.serumCalciumMgDl(),
    serumAlbuminGDl: this.serumAlbuminGDl(),
  }));

  reset(): void {
    this.serumCalciumMgDl.set(null);
    this.serumAlbuminGDl.set(null);
  }

  autofill(context: CalculatorAutofillContext): AutofillFeedback {
    const { calcium, albumin } = context;
    const filledParams: string[] = [],
      missingParams: string[] = [];
    if (calcium != null && calcium > 0) {
      this.serumCalciumMgDl.set(calcium);
      filledParams.push(`Calcio: ${calcium} mg/dL`);
    } else {
      this.serumCalciumMgDl.set(null);
      missingParams.push('Calcio sérico');
    }

    if (albumin != null && albumin > 0) {
      this.serumAlbuminGDl.set(albumin);
      filledParams.push(`Albúmina: ${albumin} g/dL`);
    } else {
      this.serumAlbuminGDl.set(null);
      missingParams.push('Albúmina sérica');
    }
    return { filledParams, missingParams };
  }
}

export function summarizeCalciumInputs(inputs: Record<string, unknown>): CalculatorInputSummary {
  const number = (key: string) => inputs[key] as number;
  return {
    'Calcio Sérico (mg/dL)': number('serumCalciumMgDl'),
    'Albúmina (g/dL)': number('serumAlbuminGDl'),
  };
}

@Component({
  selector: 'app-calcium-calculator',
  imports: [FormsModule],
  templateUrl: './calcium-calculator.component.html',
  styleUrl: './calculator-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalciumCalculatorComponent {
  readonly form = input.required<CalciumCalculatorForm>();
}
