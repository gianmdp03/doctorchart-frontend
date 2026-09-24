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
import {
  FormCategoryGroup,
  FormFieldDefinition,
  FormTemplate,
} from '../../core/models/workspace.model';

export interface OrphanedFieldItem {
  key: string;
  label: string;
  value: unknown;
}

@Component({
  selector: 'app-dynamic-form-renderer',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form-renderer.component.html',
  styleUrl: './dynamic-form-renderer.component.css',
})
export class DynamicFormRendererComponent {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

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
          { value: val, disabled: isReadonly },
          validators
        );
        group[field.key] = control;
      }
    }

    const newFormGroup = this.fb.group(group);
    this.form.set(newFormGroup);

    // Initial valid check
    this.valid.emit(newFormGroup.valid);

    const sub = newFormGroup.valueChanges.subscribe(() => {
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
