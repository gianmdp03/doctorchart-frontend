import {
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucidePlus,
  lucideTrash2,
  lucideArrowUp,
  lucideArrowDown,
  lucideAlertTriangle,
  lucideCheck,
  lucideX,
  lucideSettings,
} from '@ng-icons/lucide';
import {
  FormCategoryGroup,
  FormFieldDefinition,
  FormFieldOption,
  FormFieldType,
  FormTemplate,
} from '../../core/models/workspace.model';

export interface FieldDeleteTarget {
  categoryIndex: number;
  fieldIndex: number;
  field: FormFieldDefinition;
}

@Component({
  selector: 'app-form-field-editor',
  imports: [CommonModule, FormsModule, NgIcon],
  providers: [
    provideIcons({
      lucidePlus,
      lucideTrash2,
      lucideArrowUp,
      lucideArrowDown,
      lucideAlertTriangle,
      lucideCheck,
      lucideX,
      lucideSettings,
    }),
  ],
  templateUrl: './form-field-editor.component.html',
  styleUrl: './form-field-editor.component.css',
})
export class FormFieldEditorComponent {
  // Inputs & Outputs
  readonly template = input<FormTemplate | null>(null);
  readonly readonly = input<boolean>(false);
  readonly templateChange = output<FormTemplate>();
  readonly save = output<FormTemplate>();

  // Internal reactive copy of the template
  readonly workingTemplate = signal<FormTemplate | null>(null);
  readonly selectedCategoryIndex = signal<number>(0);

  // Deletion modal state
  readonly deleteTarget = signal<FieldDeleteTarget | null>(null);

  // Add field modal state
  readonly isAddingField = signal<boolean>(false);
  readonly newFieldType = signal<FormFieldType>('TEXT');
  readonly newFieldLabel = signal<string>('');
  readonly newFieldKey = signal<string>('');
  readonly newFieldPlaceholder = signal<string>('');
  readonly newFieldUnit = signal<string>('');
  readonly newFieldRequired = signal<boolean>(false);
  readonly newFieldOptions = signal<FormFieldOption[]>([]);
  readonly newOptionLabel = signal<string>('');
  readonly newOptionValue = signal<string>('');

  readonly fieldTypes: { value: FormFieldType; label: string }[] = [
    { value: 'TEXT', label: 'Texto Corto' },
    { value: 'NUMBER', label: 'Numérico' },
    { value: 'DATE', label: 'Fecha' },
    { value: 'SELECT', label: 'Selección Desplegable' },
    { value: 'BOOLEAN', label: 'Casilla Sí/No' },
    { value: 'TEXTAREA', label: 'Área de Texto Amplia' },
  ];

  readonly categories = computed<FormCategoryGroup[]>(() => {
    return this.workingTemplate()?.schemaDefinition?.categories || [];
  });

  readonly selectedCategory = computed<FormCategoryGroup | null>(() => {
    const cats = this.categories();
    const idx = this.selectedCategoryIndex();
    return cats[idx] || null;
  });

  constructor() {
    effect(() => {
      const tmpl = this.template();
      untracked(() => {
        if (tmpl) {
          // Deep clone to allow safe local mutations
          this.workingTemplate.set(JSON.parse(JSON.stringify(tmpl)));
        } else {
          this.workingTemplate.set(null);
        }
      });
    });
  }

  selectCategory(index: number): void {
    this.selectedCategoryIndex.set(index);
  }

  toggleCategoryEnabled(categoryIndex: number): void {
    const tmpl = this.workingTemplate();
    if (!tmpl?.schemaDefinition?.categories?.[categoryIndex]) return;

    tmpl.schemaDefinition.categories[categoryIndex].enabled =
      !tmpl.schemaDefinition.categories[categoryIndex].enabled;

    this.notifyTemplateUpdated(tmpl);
  }

  // Field Reordering
  moveFieldUp(categoryIndex: number, fieldIndex: number): void {
    if (fieldIndex <= 0) return;
    const tmpl = this.workingTemplate();
    if (!tmpl?.schemaDefinition?.categories?.[categoryIndex]) return;

    const fields = tmpl.schemaDefinition.categories[categoryIndex].fields;
    const temp = fields[fieldIndex];
    fields[fieldIndex] = fields[fieldIndex - 1];
    fields[fieldIndex - 1] = temp;

    this.notifyTemplateUpdated(tmpl);
  }

  moveFieldDown(categoryIndex: number, fieldIndex: number): void {
    const tmpl = this.workingTemplate();
    if (!tmpl?.schemaDefinition?.categories?.[categoryIndex]) return;

    const fields = tmpl.schemaDefinition.categories[categoryIndex].fields;
    if (fieldIndex >= fields.length - 1) return;

    const temp = fields[fieldIndex];
    fields[fieldIndex] = fields[fieldIndex + 1];
    fields[fieldIndex + 1] = temp;

    this.notifyTemplateUpdated(tmpl);
  }

  // Direct Field Property Edits
  updateFieldProperty(
    categoryIndex: number,
    fieldIndex: number,
    property: keyof FormFieldDefinition,
    value: unknown
  ): void {
    const tmpl = this.workingTemplate();
    if (!tmpl?.schemaDefinition?.categories?.[categoryIndex]?.fields?.[fieldIndex]) return;

    (tmpl.schemaDefinition.categories[categoryIndex].fields[fieldIndex] as any)[property] = value;
    this.notifyTemplateUpdated(tmpl);
  }

  // Field Deletion with Warning
  requestDeleteField(categoryIndex: number, fieldIndex: number, field: FormFieldDefinition): void {
    this.deleteTarget.set({ categoryIndex, fieldIndex, field });
  }

  cancelDelete(): void {
    this.deleteTarget.set(null);
  }

  confirmDelete(): void {
    const target = this.deleteTarget();
    if (!target) return;

    const tmpl = this.workingTemplate();
    if (tmpl?.schemaDefinition?.categories?.[target.categoryIndex]?.fields) {
      tmpl.schemaDefinition.categories[target.categoryIndex].fields.splice(target.fieldIndex, 1);
      this.notifyTemplateUpdated(tmpl);
    }
    this.deleteTarget.set(null);
  }

  // Adding Field
  openAddFieldModal(): void {
    this.newFieldType.set('TEXT');
    this.newFieldLabel.set('');
    this.newFieldKey.set('');
    this.newFieldPlaceholder.set('');
    this.newFieldUnit.set('');
    this.newFieldRequired.set(false);
    this.newFieldOptions.set([]);
    this.newOptionLabel.set('');
    this.newOptionValue.set('');
    this.isAddingField.set(true);
  }

  closeAddFieldModal(): void {
    this.isAddingField.set(false);
  }

  onLabelInput(label: string): void {
    this.newFieldLabel.set(label);
    if (!this.newFieldKey() || this.newFieldKey() === this.toCamelCase(label.slice(0, -1))) {
      this.newFieldKey.set(this.toCamelCase(label));
    }
  }

  addOption(): void {
    const label = this.newOptionLabel().trim();
    const value = this.newOptionValue().trim() || this.toSnakeUpper(label);
    if (!label) return;

    this.newFieldOptions.update((opts) => [...opts, { label, value }]);
    this.newOptionLabel.set('');
    this.newOptionValue.set('');
  }

  removeOption(index: number): void {
    this.newFieldOptions.update((opts) => opts.filter((_, i) => i !== index));
  }

  submitAddField(): void {
    const label = this.newFieldLabel().trim();
    const key = (this.newFieldKey().trim() || this.toCamelCase(label)).replace(/[^a-zA-Z0-9_]/g, '');

    if (!label || !key) return;

    const tmpl = this.workingTemplate();
    const catIdx = this.selectedCategoryIndex();
    if (!tmpl?.schemaDefinition?.categories?.[catIdx]) return;

    const newField: FormFieldDefinition = {
      key,
      label,
      type: this.newFieldType(),
      required: this.newFieldRequired(),
      placeholder: this.newFieldPlaceholder().trim() || undefined,
      unit: this.newFieldUnit().trim() || undefined,
      options: this.newFieldType() === 'SELECT' ? this.newFieldOptions() : undefined,
    };

    tmpl.schemaDefinition.categories[catIdx].fields.push(newField);
    this.notifyTemplateUpdated(tmpl);
    this.closeAddFieldModal();
  }

  // Save changes
  saveTemplate(): void {
    const tmpl = this.workingTemplate();
    if (tmpl) {
      this.save.emit(tmpl);
    }
  }

  private notifyTemplateUpdated(tmpl: FormTemplate): void {
    const updated = JSON.parse(JSON.stringify(tmpl));
    this.workingTemplate.set(updated);
    this.templateChange.emit(updated);
  }

  private toCamelCase(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .toLowerCase()
      .split(' ')
      .map((word, idx) => (idx === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
      .join('');
  }

  private toSnakeUpper(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .toUpperCase()
      .trim()
      .replace(/\s+/g, '_');
  }
}
