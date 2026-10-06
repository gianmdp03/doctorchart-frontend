import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CalculatorAutofillContext,
  CalculatorFormState,
  CalculatorInputSummary,
  AutofillFeedback,
} from './calculator-form';

export class ChadsVascCalculatorForm implements CalculatorFormState {
  readonly ageYears = signal<number | null>(null);
  readonly isFemale = signal<boolean>(false);
  readonly congestiveHeartFailure = signal<boolean>(false);
  readonly hypertension = signal<boolean>(false);
  readonly diabetes = signal<boolean>(false);
  readonly strokeOrTia = signal<boolean>(false);
  readonly vascularDisease = signal<boolean>(false);
  readonly complete = computed(() => this.ageYears() !== null && this.ageYears()! >= 0);
  readonly inputs = computed<Record<string, unknown>>(() => ({
    ageYears: this.ageYears(),
    isFemale: this.isFemale(),
    congestiveHeartFailure: this.congestiveHeartFailure(),
    hypertension: this.hypertension(),
    diabetes: this.diabetes(),
    strokeOrTia: this.strokeOrTia(),
    vascularDisease: this.vascularDisease(),
  }));

  reset(): void {
    this.ageYears.set(null);
    this.isFemale.set(false);
    this.congestiveHeartFailure.set(false);
    this.hypertension.set(false);
    this.diabetes.set(false);
    this.strokeOrTia.set(false);
    this.vascularDisease.set(false);
  }

  autofill(context: CalculatorAutofillContext): AutofillFeedback {
    const { age, gender } = context;
    const filledParams: string[] = [],
      missingParams: string[] = [];
    if (age != null && age >= 0) {
      this.ageYears.set(age);
      filledParams.push(`Edad: ${age} años`);
    } else {
      this.ageYears.set(null);
      missingParams.push('Edad');
    }
    if (gender) {
      this.isFemale.set(gender === 'FEMALE');
      filledParams.push(`Sexo: ${gender === 'FEMALE' ? 'Femenino' : 'Masculino'}`);
    }
    return { filledParams, missingParams };
  }
}

export function summarizeChadsVascInputs(inputs: Record<string, unknown>): CalculatorInputSummary {
  const number = (key: string) => inputs[key] as number;
  const flag = (key: string) => inputs[key] as boolean;
  return {
    'Edad (años)': number('ageYears'),
    'Sexo Femenino': flag('isFemale'),
    'Insuficiencia Cardíaca': flag('congestiveHeartFailure'),
    Hipertensión: flag('hypertension'),
    Diabetes: flag('diabetes'),
    'ACV previo / AIT': flag('strokeOrTia'),
    'Enfermedad Vascular': flag('vascularDisease'),
  };
}

@Component({
  selector: 'app-chads-vasc-calculator',
  imports: [FormsModule],
  templateUrl: './chads-vasc-calculator.component.html',
  styleUrl: './calculator-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChadsVascCalculatorComponent {
  readonly form = input.required<ChadsVascCalculatorForm>();
}
