import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CalculatorAutofillContext,
  CalculatorFormState,
  CalculatorInputSummary,
  AutofillFeedback,
} from './calculator-form';

export class TfgeCalculatorForm implements CalculatorFormState {
  readonly creatinineMgDl = signal<number | null>(null);
  readonly ageYears = signal<number | null>(null);
  readonly gender = signal<'FEMALE' | 'MALE'>('MALE');
  readonly complete = computed(
    () =>
      !!(
        this.creatinineMgDl() &&
        this.ageYears() &&
        this.creatinineMgDl()! > 0 &&
        this.ageYears()! > 0
      ),
  );
  readonly inputs = computed<Record<string, unknown>>(() => ({
    creatinineMgDl: this.creatinineMgDl(),
    ageYears: this.ageYears(),
    gender: this.gender(),
  }));

  reset(): void {
    this.creatinineMgDl.set(null);
    this.ageYears.set(null);
    this.gender.set('MALE');
  }

  autofill(context: CalculatorAutofillContext): AutofillFeedback {
    const { age, gender, creatinine } = context;
    const filledParams: string[] = [],
      missingParams: string[] = [];
    if (creatinine != null && creatinine > 0) {
      this.creatinineMgDl.set(creatinine);
      filledParams.push(`Creatinina: ${creatinine} mg/dL`);
    } else {
      this.creatinineMgDl.set(null);
      missingParams.push('Creatinina sérica');
    }

    if (age != null && age > 0) {
      this.ageYears.set(age);
      filledParams.push(`Edad: ${age} años`);
    } else {
      this.ageYears.set(null);
      missingParams.push('Edad');
    }

    if (gender) {
      this.gender.set(gender);
      filledParams.push(`Sexo: ${gender === 'FEMALE' ? 'Femenino' : 'Masculino'}`);
    }
    return { filledParams, missingParams };
  }
}

export function summarizeTfgeInputs(inputs: Record<string, unknown>): CalculatorInputSummary {
  const number = (key: string) => inputs[key] as number;
  const sex = () => (inputs['gender'] === 'FEMALE' ? 'Femenino' : 'Masculino');
  return {
    'Creatinina (mg/dL)': number('creatinineMgDl'),
    'Edad (años)': number('ageYears'),
    Sexo: sex(),
  };
}

@Component({
  selector: 'app-tfge-calculator',
  imports: [FormsModule],
  templateUrl: './tfge-calculator.component.html',
  styleUrl: './calculator-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TfgeCalculatorComponent {
  readonly form = input.required<TfgeCalculatorForm>();
}
