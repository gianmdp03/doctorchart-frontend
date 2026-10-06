import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CalculatorAutofillContext,
  CalculatorFormState,
  CalculatorInputSummary,
  AutofillFeedback,
} from './calculator-form';

export class CockcroftCalculatorForm implements CalculatorFormState {
  readonly weightKg = signal<number | null>(null);
  readonly ageYears = signal<number | null>(null);
  readonly creatinineMgDl = signal<number | null>(null);
  readonly gender = signal<'FEMALE' | 'MALE'>('MALE');
  readonly complete = computed(
    () =>
      !!(
        this.weightKg() &&
        this.ageYears() &&
        this.creatinineMgDl() &&
        this.weightKg()! > 0 &&
        this.ageYears()! > 0 &&
        this.creatinineMgDl()! > 0
      ),
  );
  readonly inputs = computed<Record<string, unknown>>(() => ({
    weightKg: this.weightKg(),
    ageYears: this.ageYears(),
    creatinineMgDl: this.creatinineMgDl(),
    gender: this.gender(),
  }));

  reset(): void {
    this.weightKg.set(null);
    this.ageYears.set(null);
    this.creatinineMgDl.set(null);
    this.gender.set('MALE');
  }

  autofill(context: CalculatorAutofillContext): AutofillFeedback {
    const { age, gender, weight, creatinine } = context;
    const filledParams: string[] = [],
      missingParams: string[] = [];
    if (weight != null && weight > 0) {
      this.weightKg.set(weight);
      filledParams.push(`Peso: ${weight} kg`);
    } else {
      this.weightKg.set(null);
      missingParams.push('Peso');
    }

    if (age != null && age > 0) {
      this.ageYears.set(age);
      filledParams.push(`Edad: ${age} años`);
    } else {
      this.ageYears.set(null);
      missingParams.push('Edad');
    }

    if (creatinine != null && creatinine > 0) {
      this.creatinineMgDl.set(creatinine);
      filledParams.push(`Creatinina: ${creatinine} mg/dL`);
    } else {
      this.creatinineMgDl.set(null);
      missingParams.push('Creatinina sérica');
    }

    if (gender) {
      this.gender.set(gender);
      filledParams.push(`Sexo: ${gender === 'FEMALE' ? 'Femenino' : 'Masculino'}`);
    }
    return { filledParams, missingParams };
  }
}

export function summarizeCockcroftInputs(inputs: Record<string, unknown>): CalculatorInputSummary {
  const number = (key: string) => inputs[key] as number;
  const sex = () => (inputs['gender'] === 'FEMALE' ? 'Femenino' : 'Masculino');
  return {
    'Peso (kg)': number('weightKg'),
    'Edad (años)': number('ageYears'),
    'Creatinina (mg/dL)': number('creatinineMgDl'),
    Sexo: sex(),
  };
}

@Component({
  selector: 'app-cockcroft-calculator',
  imports: [FormsModule],
  templateUrl: './cockcroft-calculator.component.html',
  styleUrl: './calculator-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CockcroftCalculatorComponent {
  readonly form = input.required<CockcroftCalculatorForm>();
}
