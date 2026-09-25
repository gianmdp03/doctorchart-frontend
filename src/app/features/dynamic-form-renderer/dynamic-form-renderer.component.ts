import {
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalculator, lucideInfo } from '@ng-icons/lucide';
import {
  FormCategoryGroup,
  FormFieldDefinition,
  FormTemplate,
} from '../../core/models/workspace.model';
import { MedicalCalculatorsService } from '../../core/services/medical-calculators.service';
import { ActivePatientService } from '../../core/services/active-patient.service';

import { PatientDetailDTO } from '../../core/models/patient.model';

export interface OrphanedFieldItem {
  key: string;
  label: string;
  value: unknown;
}

export interface ComputedFormulaResult {
  value: string;
  badge?: string;
  badgeClass?: string;
  unit?: string;
}

@Component({
  selector: 'app-dynamic-form-renderer',
  imports: [CommonModule, ReactiveFormsModule, NgIcon],
  providers: [
    provideIcons({
      lucideCalculator,
      lucideInfo,
    }),
  ],
  templateUrl: './dynamic-form-renderer.component.html',
  styleUrl: './dynamic-form-renderer.component.css',
})
export class DynamicFormRendererComponent {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly calcService = inject(MedicalCalculatorsService);
  private readonly activePatientService = inject(ActivePatientService);

  // Inputs
  readonly template = input<FormTemplate | null>(null);
  readonly values = input<Record<string, unknown> | null>(null);
  readonly historicalSnapshot = input<Record<string, string> | null>(null);
  readonly readonly = input<boolean>(false);

  // Outputs
  readonly valuesChange = output<Record<string, unknown>>();
  readonly valid = output<boolean>();

  // State
  readonly form = signal<FormGroup>(this.fb.group({}));
  readonly isHistoricalExpanded = signal<boolean>(true);
  readonly formulaResults = signal<Record<string, ComputedFormulaResult>>({});

  // Derived: enabled categories
  readonly enabledCategories = computed<FormCategoryGroup[]>(() => {
    const tmpl = this.template();
    if (!tmpl?.schemaDefinition?.categories) {
      return [];
    }
    return tmpl.schemaDefinition.categories.filter((cat) => cat.enabled !== false);
  });

  // Derived: set of all active field keys in the current template
  readonly activeFieldKeys = computed<Set<string>>(() => {
    const keys = new Set<string>();
    for (const cat of this.enabledCategories()) {
      if (cat.fields) {
        for (const f of cat.fields) {
          keys.add(f.key);
        }
      }
    }
    return keys;
  });

  // Derived: orphaned fields present in values() but absent in current template
  readonly orphanedFields = computed<OrphanedFieldItem[]>(() => {
    const vals = this.values();
    if (!vals) return [];

    const activeKeys = this.activeFieldKeys();
    const snapshot = this.historicalSnapshot() || {};
    const orphaned: OrphanedFieldItem[] = [];

    for (const [key, val] of Object.entries(vals)) {
      if (!activeKeys.has(key) && val !== null && val !== undefined && val !== '') {
        orphaned.push({
          key,
          label: snapshot[key] || this.formatFallbackKey(key),
          value: val,
        });
      }
    }

    return orphaned;
  });

  constructor() {
    // Rebuild form whenever template, values, or readonly changes
    effect(() => {
      const tmpl = this.template();
      const vals = this.values();
      const isReadonly = this.readonly();

      untracked(() => {
        this.buildForm(tmpl, vals, isReadonly);
      });
    });
  }

  private buildForm(
    tmpl: FormTemplate | null,
    initialValues: Record<string, unknown> | null,
    isReadonly: boolean
  ): void {
    const group: Record<string, FormControl> = {};
    const categories = tmpl?.schemaDefinition?.categories || [];

    for (const cat of categories) {
      if (cat.enabled === false || !cat.fields) continue;

      for (const field of cat.fields) {
        const val = initialValues?.[field.key] ?? (field.type === 'BOOLEAN' ? false : '');
        const validators = [];
        if (field.required && !isReadonly) {
          if (field.type === 'BOOLEAN') {
            validators.push(Validators.requiredTrue);
          } else {
            validators.push(Validators.required);
          }
        }

        const control = new FormControl(
          { value: val, disabled: isReadonly || field.type === 'FORMULA' },
          validators
        );
        group[field.key] = control;
      }
    }

    const newFormGroup = this.fb.group(group);
    this.form.set(newFormGroup);

    // Initial formula evaluation
    this.evaluateAllFormulas(newFormGroup, tmpl);

    // Initial valid check
    this.valid.emit(newFormGroup.valid);

    const sub = newFormGroup.valueChanges.subscribe(() => {
      this.evaluateAllFormulas(newFormGroup, tmpl);
      this.emitCurrentValues(newFormGroup);
    });

    const statusSub = newFormGroup.statusChanges.subscribe(() => {
      this.valid.emit(newFormGroup.valid);
    });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
      statusSub.unsubscribe();
    });
  }

  private evaluateAllFormulas(currentForm: FormGroup, tmpl: FormTemplate | null): void {
    if (!tmpl?.schemaDefinition?.categories) return;

    const values = currentForm.getRawValue() as Record<string, unknown>;
    const patient = this.activePatientService.activePatient();
    const results: Record<string, ComputedFormulaResult> = {};

    for (const cat of tmpl.schemaDefinition.categories) {
      if (cat.enabled === false || !cat.fields) continue;

      for (const field of cat.fields) {
        if (field.type !== 'FORMULA') continue;

        const res = this.calculateSingleFormula(field, values, patient);
        if (res) {
          results[field.key] = res;
          if (res.value !== '—') {
            const ctrl = currentForm.get(field.key);
            if (ctrl && ctrl.value !== res.value) {
              ctrl.setValue(res.value, { emitEvent: false });
            }
          }
        }
      }
    }

    this.formulaResults.set(results);
  }

  private calculateSingleFormula(
    field: FormFieldDefinition,
    values: Record<string, unknown>,
    patient: PatientDetailDTO | null
  ): ComputedFormulaResult | null {
    const fType = field.formulaType || 'IMC';

    const findNum = (...keys: string[]): number | null => {
      for (const k of keys) {
        for (const [vKey, vVal] of Object.entries(values)) {
          if (vKey.toLowerCase() === k.toLowerCase()) {
            const num = Number(vVal);
            if (!isNaN(num) && num > 0) return num;
          }
        }
      }
      return null;
    };

    if (fType === 'IMC') {
      const weight =
        findNum('peso', 'pesokg', 'weight', 'weightkg', 'pesoActual') ??
        patient?.latestMeasurements?.weight ??
        null;
      const height =
        findNum('talla', 'tallacm', 'altura', 'height', 'heightcm', 'estatura') ??
        patient?.latestMeasurements?.height ??
        null;

      if (!weight || !height) {
        return {
          value: '—',
          badge: 'Pendiente de peso y talla',
          badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
          unit: field.unit || 'kg/m²',
        };
      }

      const res = this.calcService.calculateBmi({ weightKg: weight, heightCm: height });
      if (res) {
        return {
          value: res.formattedValue,
          badge: res.interpretation.label,
          badgeClass: res.interpretation.badgeClass,
          unit: res.unit,
        };
      }
    }

    if (fType === 'BSA') {
      const weight = findNum('peso', 'pesokg', 'weight') ?? patient?.latestMeasurements?.weight ?? null;
      const height = findNum('talla', 'tallacm', 'altura') ?? patient?.latestMeasurements?.height ?? null;

      if (!weight || !height) {
        return {
          value: '—',
          badge: 'Pendiente de peso y talla',
          badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
          unit: field.unit || 'm²',
        };
      }

      const bsa = Math.sqrt((weight * height) / 3600);
      return {
        value: bsa.toFixed(2),
        badge: 'Superficie Mosteller',
        badgeClass: 'bg-teal-100 text-teal-800 border-teal-200',
        unit: 'm²',
      };
    }

    if (fType === 'TFGE') {
      const cr = findNum('creatinina', 'creatininaserica', 'cr', 'creatinine');
      let age = findNum('edad', 'age');
      if (!age && patient?.birthDate) {
        const b = new Date(patient.birthDate + 'T00:00:00');
        if (!isNaN(b.getTime())) {
          age = Math.abs(new Date(Date.now() - b.getTime()).getUTCFullYear() - 1970);
        }
      }
      const genderStr = String(values['sexo'] || values['gender'] || patient?.gender || 'MALE');
      const isFemale = genderStr.toUpperCase().startsWith('F') || genderStr.toUpperCase().startsWith('M');

      if (!cr || !age) {
        return {
          value: '—',
          badge: 'Pendiente de creatinina y edad',
          badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
          unit: field.unit || 'mL/min/1.73m²',
        };
      }

      const res = this.calcService.calculateTfge({
        creatinineMgDl: cr,
        ageYears: age,
        gender: isFemale ? 'FEMALE' : 'MALE',
      });

      if (res) {
        return {
          value: res.formattedValue,
          badge: res.interpretation.label,
          badgeClass: res.interpretation.badgeClass,
          unit: res.unit,
        };
      }
    }

    if (fType === 'COCKCROFT') {
      const cr = findNum('creatinina', 'cr');
      const weight = findNum('peso', 'weight') ?? patient?.latestMeasurements?.weight ?? null;
      let age = findNum('edad', 'age');
      if (!age && patient?.birthDate) {
        const b = new Date(patient.birthDate + 'T00:00:00');
        if (!isNaN(b.getTime())) {
          age = Math.abs(new Date(Date.now() - b.getTime()).getUTCFullYear() - 1970);
        }
      }
      const genderStr = String(values['sexo'] || values['gender'] || patient?.gender || 'MALE');
      const isFemale = genderStr.toUpperCase().startsWith('F');

      if (!cr || !weight || !age) {
        return {
          value: '—',
          badge: 'Pendiente de peso, creatinina y edad',
          badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
          unit: field.unit || 'mL/min',
        };
      }

      const res = this.calcService.calculateCockcroftGault({
        weightKg: weight,
        ageYears: age,
        creatinineMgDl: cr,
        gender: isFemale ? 'FEMALE' : 'MALE',
      });

      if (res) {
        return {
          value: res.formattedValue,
          badge: res.interpretation.label,
          badgeClass: res.interpretation.badgeClass,
          unit: res.unit,
        };
      }
    }

    if (fType === 'CALCIO_CORREGIDO') {
      const ca = findNum('calcio', 'calciototal', 'calcioserico');
      const alb = findNum('albumina', 'albuminaserica');

      if (!ca || !alb) {
        return {
          value: '—',
          badge: 'Pendiente de calcio y albúmina',
          badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
          unit: field.unit || 'mg/dL',
        };
      }

      const res = this.calcService.calculateCalciumCorrection({
        serumCalciumMgDl: ca,
        serumAlbuminGDl: alb,
      });

      if (res) {
        return {
          value: res.formattedValue,
          badge: res.interpretation.label,
          badgeClass: res.interpretation.badgeClass,
          unit: res.unit,
        };
      }
    }

    if (fType === 'CUSTOM') {
      const varAKey = field.formulaVariableA;
      const varBKey = field.formulaVariableB;
      const constB = field.formulaConstantB;
      const op = field.formulaOperation || 'SUBTRACT';

      const valA = varAKey ? findNum(varAKey) : null;
      const valB =
        constB !== undefined && constB !== null ? constB : varBKey ? findNum(varBKey) : null;

      if (valA === null || valB === null) {
        return {
          value: '—',
          badge: 'Esperando variables',
          badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
          unit: field.unit,
        };
      }

      let calcResult = 0;
      let opBadge = '';
      switch (op) {
        case 'SUBTRACT':
          calcResult = valA - valB;
          opBadge = 'Diferencia';
          break;
        case 'ADD':
          calcResult = valA + valB;
          opBadge = 'Suma';
          break;
        case 'MULTIPLY':
          calcResult = valA * valB;
          opBadge = 'Multiplicación';
          break;
        case 'DIVIDE':
          if (valB === 0) {
            return {
              value: 'Div / 0',
              badge: 'División por cero',
              badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
              unit: field.unit,
            };
          }
          calcResult = valA / valB;
          opBadge = 'Ratio';
          break;
        case 'AVERAGE':
          calcResult = (valA + valB) / 2;
          opBadge = 'Promedio';
          break;
      }

      const formatted = Number.isInteger(calcResult)
        ? calcResult.toString()
        : calcResult.toFixed(2);

      return {
        value: formatted,
        badge: opBadge,
        badgeClass: 'bg-teal-100 text-teal-800 border-teal-300',
        unit: field.unit,
      };
    }

    return {
      value: String(values[field.key] ?? '—'),
      badge: 'Fórmula Activa',
      badgeClass: 'bg-teal-50 text-teal-700 border-teal-200',
      unit: field.unit,
    };
  }

  private emitCurrentValues(currentForm: FormGroup): void {
    const activeValues = currentForm.getRawValue();
    // Preserve orphaned values so they don't get lost on save
    const orphanedVals = this.values() || {};
    const merged: Record<string, unknown> = { ...orphanedVals, ...activeValues };
    this.valuesChange.emit(merged);
  }

  toggleHistoricalExpanded(): void {
    this.isHistoricalExpanded.update((v) => !v);
  }

  formatFallbackKey(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

  formatHistoricalValue(val: unknown): string {
    if (typeof val === 'boolean') {
      return val ? 'Sí' : 'No';
    }
    if (typeof val === 'object' && val !== null) {
      return JSON.stringify(val);
    }
    return String(val ?? '');
  }
}
