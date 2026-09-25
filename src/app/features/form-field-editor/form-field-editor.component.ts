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
  lucideCalculator,
} from '@ng-icons/lucide';
import {
  ClinicalFormulaType,
  FormCategoryGroup,
  FormFieldDefinition,
  FormFieldOption,
  FormFieldType,
  FormTemplate,
  FormulaOperationType,
} from '../../core/models/workspace.model';

export interface FieldDeleteTarget {
  categoryIndex: number;
  fieldIndex: number;
  field: FormFieldDefinition;
}

export interface FormulaConfigOption {
  value: ClinicalFormulaType;
  label: string;
  defaultLabel: string;
  defaultKey: string;
  defaultUnit: string;
  description: string;
  suggestedPlaceholder: string;
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
      lucideCalculator,
    }),
  ],
  templateUrl: './form-field-editor.component.html',
  styleUrl: './form-field-editor.component.css',
})
export class FormFieldEditorComponent {
  // Inputs & Outputs
  readonly template = input<FormTemplate | null>(null);
  readonly readonly = input<boolean>(false);
  readonly selectedCategoryKey = input<string | null>(null);
  readonly hideCategoryNavigation = input<boolean>(false);
  readonly hideHeader = input<boolean>(false);
  readonly showCategoryToggle = input<boolean>(true);
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

  // Formula specific state
  readonly newFieldFormulaType = signal<ClinicalFormulaType>('IMC');
  readonly newFieldFormulaOperation = signal<FormulaOperationType>('SUBTRACT');
  readonly newFieldFormulaVariableA = signal<string>('');
  readonly newFieldFormulaVariableB = signal<string>('');
  readonly newFieldFormulaConstantB = signal<number | null>(null);
  readonly newFieldFormulaUseConstant = signal<boolean>(false);

  readonly availableVariables = computed<
    { key: string; label: string; unit?: string; categoryTitle: string }[]
  >(() => {
    const tmpl = this.workingTemplate();
    if (!tmpl?.schemaDefinition?.categories) return [];
    const list: { key: string; label: string; unit?: string; categoryTitle: string }[] = [];
    for (const cat of tmpl.schemaDefinition.categories) {
      if (!cat.fields) continue;
      for (const f of cat.fields) {
        if (f.type === 'NUMBER' || f.type === 'TEXT') {
          list.push({
            key: f.key,
            label: f.label,
            unit: f.unit,
            categoryTitle: cat.title,
          });
        }
      }
    }
    return list;
  });

  readonly operationOptions: {
    value: FormulaOperationType;
    label: string;
    symbol: string;
    example: string;
  }[] = [
    {
      value: 'SUBTRACT',
      label: 'Resta (A − B)',
      symbol: '−',
      example: 'Ej: Presión Sistólica − Presión Diastólica',
    },
    {
      value: 'ADD',
      label: 'Suma (A + B)',
      symbol: '+',
      example: 'Ej: Variable A + Variable B',
    },
    {
      value: 'DIVIDE',
      label: 'División / Ratio (A ÷ B)',
      symbol: '÷',
      example: 'Ej: Relación A / B',
    },
    {
      value: 'MULTIPLY',
      label: 'Multiplicación (A × B)',
      symbol: '×',
      example: 'Ej: Dosis o factor de escala',
    },
    {
      value: 'AVERAGE',
      label: 'Promedio (media entre variables)',
      symbol: 'promedio',
      example: 'Ej: (A + B) / 2',
    },
  ];

  readonly customFormulaPreview = computed<string>(() => {
    const vars = this.availableVariables();
    const keyA = this.newFieldFormulaVariableA();
    const keyB = this.newFieldFormulaVariableB();
    const useConst = this.newFieldFormulaUseConstant();
    const constVal = this.newFieldFormulaConstantB();
    const op = this.newFieldFormulaOperation();

    const labelA = vars.find((v) => v.key === keyA)?.label || (keyA ? `[${keyA}]` : '[Variable 1]');
    const labelB = useConst
      ? constVal !== null && constVal !== undefined
        ? `${constVal}`
        : '[Número fijo]'
      : vars.find((v) => v.key === keyB)?.label || (keyB ? `[${keyB}]` : '[Variable 2]');

    const opSymbols: Record<FormulaOperationType, string> = {
      SUBTRACT: '−',
      ADD: '+',
      MULTIPLY: '×',
      DIVIDE: '÷',
      AVERAGE: 'promediado con',
    };

    if (op === 'AVERAGE') {
      return `Promedio(${labelA}, ${labelB})`;
    }

    return `${labelA} ${opSymbols[op] || '+'} ${labelB}`;
  });

  readonly formulaOptions: FormulaConfigOption[] = [
    {
      value: 'CUSTOM',
      label: 'Operación entre Variables del Formulario',
      defaultLabel: 'Resultado Calculado',
      defaultKey: 'resultadoCalculado',
      defaultUnit: '',
      description: 'Elige las variables que existen en la consulta y la operación matemática a realizar.',
      suggestedPlaceholder: 'Calculado automáticamente',
    },
    {
      value: 'IMC',
      label: 'Índice de Masa Corporal (IMC)',
      defaultLabel: 'Índice de Masa Corporal (IMC)',
      defaultKey: 'imc',
      defaultUnit: 'kg/m²',
      description: 'Cálculo automatizado a partir del peso y la talla.',
      suggestedPlaceholder: 'Calculado automáticamente',
    },
    {
      value: 'BSA',
      label: 'Superficie Corporal (BSA - Mosteller)',
      defaultLabel: 'Superficie Corporal (BSA)',
      defaultKey: 'bsa',
      defaultUnit: 'm²',
      description: 'Estimación de área de superficie corporal para dosificación.',
      suggestedPlaceholder: 'Calculado automáticamente',
    },
    {
      value: 'TFGE',
      label: 'Filtrado Glomerular (CKD-EPI 2021)',
      defaultLabel: 'TFGe (CKD-EPI)',
      defaultKey: 'tfge',
      defaultUnit: 'mL/min/1.73m²',
      description: 'Estadificación de función renal según creatinina, edad y sexo.',
      suggestedPlaceholder: 'Calculado automáticamente',
    },
    {
      value: 'COCKCROFT',
      label: 'Aclaramiento Cockcroft-Gault (ClCr)',
      defaultLabel: 'Aclaramiento Cockcroft (ClCr)',
      defaultKey: 'clcrCockcroft',
      defaultUnit: 'mL/min',
      description: 'Aclaramiento renal para ajuste posológico farmacológico.',
      suggestedPlaceholder: 'Calculado automáticamente',
    },
    {
      value: 'CHADS_VASC',
      label: 'Score CHA₂DS₂-VASc',
      defaultLabel: 'Score CHA₂DS₂-VASc',
      defaultKey: 'chadsVasc',
      defaultUnit: 'puntos',
      description: 'Estratificación de riesgo tromboembólico en FA.',
      suggestedPlaceholder: 'Puntaje calculado',
    },
    {
      value: 'CALCIO_CORREGIDO',
      label: 'Calcio Sérico Corregido por Albúmina',
      defaultLabel: 'Calcio Corregido',
      defaultKey: 'calcioCorregido',
      defaultUnit: 'mg/dL',
      description: 'Ajuste de calcio total según albúmina sérica.',
      suggestedPlaceholder: 'Calculado automáticamente',
    },
  ];

  readonly fieldTypes: { value: FormFieldType; label: string }[] = [
    { value: 'TEXT', label: 'Texto Corto' },
    { value: 'NUMBER', label: 'Numérico' },
    { value: 'DATE', label: 'Fecha' },
    { value: 'SELECT', label: 'Selección Desplegable' },
    { value: 'BOOLEAN', label: 'Casilla Sí/No' },
    { value: 'TEXTAREA', label: 'Área de Texto Amplia' },
    { value: 'FORMULA', label: 'Fórmula Clínica / Calculada' },
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

    effect(() => {
      const categoryKey = this.selectedCategoryKey();
      const categories = this.workingTemplate()?.schemaDefinition?.categories ?? [];
      if (!categoryKey) return;

      const categoryIndex = categories.findIndex((category) => category.categoryKey === categoryKey);
      if (categoryIndex >= 0) {
        this.selectedCategoryIndex.set(categoryIndex);
      }
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
    this.newFieldFormulaType.set('CUSTOM');
    this.newFieldFormulaOperation.set('SUBTRACT');

    const vars = this.availableVariables();
    if (vars.length > 0) {
      this.newFieldFormulaVariableA.set(vars[0].key);
      this.newFieldFormulaVariableB.set(vars.length > 1 ? vars[1].key : vars[0].key);
    } else {
      this.newFieldFormulaVariableA.set('');
      this.newFieldFormulaVariableB.set('');
    }

    this.newFieldFormulaConstantB.set(null);
    this.newFieldFormulaUseConstant.set(false);
    this.isAddingField.set(true);
  }

  closeAddFieldModal(): void {
    this.isAddingField.set(false);
  }

  onFieldTypeChange(type: FormFieldType): void {
    this.newFieldType.set(type);
    if (type === 'FORMULA') {
      const vars = this.availableVariables();
      if (!this.newFieldFormulaVariableA() && vars.length > 0) {
        this.newFieldFormulaVariableA.set(vars[0].key);
        this.newFieldFormulaVariableB.set(vars.length > 1 ? vars[1].key : vars[0].key);
      }
      this.onFormulaTypeSelect(this.newFieldFormulaType());
    }
  }

  onFormulaTypeSelect(type: ClinicalFormulaType): void {
    this.newFieldFormulaType.set(type);
    const opt = this.formulaOptions.find((o) => o.value === type);
    if (opt) {
      this.newFieldLabel.set(opt.defaultLabel);
      this.newFieldKey.set(opt.defaultKey);
      this.newFieldUnit.set(opt.defaultUnit);
      this.newFieldPlaceholder.set(opt.suggestedPlaceholder);
    }
    if (type === 'CUSTOM') {
      this.syncCustomFormulaDefaults();
    }
  }

  onCustomVariableAChange(key: string): void {
    this.newFieldFormulaVariableA.set(key);
    this.syncCustomFormulaDefaults();
  }

  onCustomVariableBChange(key: string): void {
    this.newFieldFormulaVariableB.set(key);
    this.syncCustomFormulaDefaults();
  }

  onCustomOperationChange(op: FormulaOperationType): void {
    this.newFieldFormulaOperation.set(op);
    this.syncCustomFormulaDefaults();
  }

  private syncCustomFormulaDefaults(): void {
    if (this.newFieldFormulaType() !== 'CUSTOM') return;
    const keyA = this.newFieldFormulaVariableA();
    const keyB = this.newFieldFormulaVariableB();
    const op = this.newFieldFormulaOperation();
    const vars = this.availableVariables();

    const varA = vars.find((v) => v.key === keyA);
    const varB = vars.find((v) => v.key === keyB);

    if (varA?.unit && (op === 'SUBTRACT' || op === 'ADD' || op === 'AVERAGE')) {
      this.newFieldUnit.set(varA.unit);
    }

    if (keyA && keyB) {
      if (op === 'SUBTRACT') {
        this.newFieldLabel.set(`Diferencia ${varA?.label || keyA} - ${varB?.label || keyB}`);
        this.newFieldKey.set(this.toCamelCase(`dif_${keyA}_${keyB}`));
      } else if (op === 'DIVIDE') {
        this.newFieldLabel.set(`Relación ${varA?.label || keyA} / ${varB?.label || keyB}`);
        this.newFieldKey.set(this.toCamelCase(`ratio_${keyA}_${keyB}`));
      } else if (op === 'ADD') {
        this.newFieldLabel.set(`Total ${varA?.label || keyA} + ${varB?.label || keyB}`);
        this.newFieldKey.set(this.toCamelCase(`total_${keyA}_${keyB}`));
      } else if (op === 'AVERAGE') {
        this.newFieldLabel.set(`Promedio ${varA?.label || keyA} y ${varB?.label || keyB}`);
        this.newFieldKey.set(this.toCamelCase(`prom_${keyA}_${keyB}`));
      }
    }
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

    const isFormula = this.newFieldType() === 'FORMULA';
    const isCustom = isFormula && this.newFieldFormulaType() === 'CUSTOM';

    const newField: FormFieldDefinition = {
      key,
      label,
      type: this.newFieldType(),
      required: this.newFieldRequired(),
      placeholder: this.newFieldPlaceholder().trim() || undefined,
      unit: this.newFieldUnit().trim() || undefined,
      options: this.newFieldType() === 'SELECT' ? this.newFieldOptions() : undefined,
      formulaType: isFormula ? this.newFieldFormulaType() : undefined,
      formulaOperation: isCustom ? this.newFieldFormulaOperation() : undefined,
      formulaVariableA: isCustom ? this.newFieldFormulaVariableA() || undefined : undefined,
      formulaVariableB:
        isCustom && !this.newFieldFormulaUseConstant()
          ? this.newFieldFormulaVariableB() || undefined
          : undefined,
      formulaConstantB:
        isCustom && this.newFieldFormulaUseConstant() && this.newFieldFormulaConstantB() !== null
          ? this.newFieldFormulaConstantB()!
          : undefined,
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
