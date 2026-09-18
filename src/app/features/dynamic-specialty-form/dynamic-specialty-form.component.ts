import {
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MedicalSpecialty,
  SpecialtyFieldDefinition,
  SpecialtySchema,
} from '../../core/models/specialty.model';
import { SpecialtySchemaService } from '../../core/services/specialty-schema.service';
import { DoctorSpecialtyService } from '../../core/services/doctor-specialty.service';

export interface FieldGroup {
  groupName: string;
  fields: SpecialtyFieldDefinition[];
}

@Component({
  selector: 'app-dynamic-specialty-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-specialty-form.component.html',
  styleUrl: './dynamic-specialty-form.component.css',
})
export class DynamicSpecialtyFormComponent {
  private readonly specialtySchemaService = inject(SpecialtySchemaService);
  private readonly doctorSpecialtyService = inject(DoctorSpecialtyService);

  /**
   * The specialty schema containing field definitions and validation rules.
   */
  readonly schema = input<SpecialtySchema | null>(null);

  /**
   * Optional specialty input to auto-fetch schema if not provided directly.
   */
  readonly specialty = input<MedicalSpecialty | null>(null);

  /**
   * Read-only mode flag.
   */
  readonly readOnly = input<boolean>(false);

  /**
   * Two-way bound model containing the dynamic 20% JSONB specialty payload.
   */
  readonly specialtyData = model<Record<string, any>>({});

  private readonly loadedSchema = signal<SpecialtySchema | null>(null);

  readonly activeSchema = computed<SpecialtySchema | null>(() => {
    return this.schema() || this.loadedSchema();
  });

  constructor() {
    effect(() => {
      if (this.schema()) {
        return;
      }
      const inputSpec = this.specialty();
      const activeDocSpec = this.doctorSpecialtyService.activeSpecialty();
      const targetSpecialty: MedicalSpecialty =
        inputSpec || activeDocSpec || 'GENERAL_MEDICINE';

      this.specialtySchemaService.getSchema(targetSpecialty).subscribe({
        next: (s) => this.loadedSchema.set(s),
        error: (err) => console.error('Error loading dynamic specialty schema:', err),
      });
    });
  }

  /**
   * Groups schema fields by category for clear clinical visualization.
   */
  readonly groupedFields = computed<FieldGroup[]>(() => {
    const s = this.activeSchema();
    if (!s || !s.fields || s.fields.length === 0) {
      return [];
    }

    const groupsMap = new Map<string, SpecialtyFieldDefinition[]>();
    for (const field of s.fields) {
      const groupName = field.group || 'Evaluación Especializada';
      if (!groupsMap.has(groupName)) {
        groupsMap.set(groupName, []);
      }
      groupsMap.get(groupName)!.push(field);
    }

    return Array.from(groupsMap.entries()).map(([groupName, fields]) => ({
      groupName,
      fields,
    }));
  });

  getFieldValue(key: string): any {
    return this.specialtyData()[key];
  }

  setFieldValue(key: string, value: any): void {
    if (this.readOnly()) return;
    this.specialtyData.update((current) => ({
      ...current,
      [key]: value,
    }));
  }

  onNumberChange(key: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    const val = target.value.trim();
    if (val === '') {
      this.setFieldValue(key, null);
    } else {
      const parsed = parseFloat(val);
      this.setFieldValue(key, isNaN(parsed) ? null : parsed);
    }
  }

  onTextChange(key: string, event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.setFieldValue(key, target.value);
  }

  onSelectChange(key: string, event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.setFieldValue(key, target.value);
  }

  onBooleanChange(key: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    this.setFieldValue(key, target.checked);
  }

  toggleMultiSelect(key: string, optionValue: string): void {
    if (this.readOnly()) return;
    const current = this.specialtyData()[key];
    const list: string[] = Array.isArray(current) ? [...current] : [];
    const index = list.indexOf(optionValue);
    if (index >= 0) {
      list.splice(index, 1);
    } else {
      list.push(optionValue);
    }
    this.setFieldValue(key, list);
  }

  isOptionSelected(key: string, optionValue: string): boolean {
    const current = this.specialtyData()[key];
    return Array.isArray(current) && current.includes(optionValue);
  }
}
