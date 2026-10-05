import { computed, Injectable, signal } from '@angular/core';
import { SpecialtySummary } from '../models/specialty.model';
import { WizardDefinition } from '../models/wizard-definition.model';

@Injectable({ providedIn: 'root' })
export class DoctorSpecialtyService {
  readonly specialty = signal<SpecialtySummary | null>(null);
  readonly definition = signal<WizardDefinition | null>(null);
  readonly activeSpecialty = computed(() => this.specialty()?.code ?? null);
  readonly supportsGrowthCharts = computed(() => this.definition()?.modulesConfig.GROWTH_CHARTS === true);
  readonly hasFamilyInformation = computed(() => this.definition()?.patientForm.categories
    .some(category => category.enabled && (
      category.key.toLowerCase().includes('family') || category.key.toLowerCase().includes('guardian') ||
      category.fields.some(field =>
        field.key.toLowerCase().includes('guardian') ||
        field.key.toLowerCase().includes('family') ||
        field.key.toLowerCase().includes('father') ||
        field.key.toLowerCase().includes('mother') ||
        field.key.toLowerCase().includes('relative')
      )
    )) ?? false);
  readonly currentSpecialtyOption = computed(() => ({
    value: this.specialty()?.code ?? null,
    label: this.specialty()?.name ?? 'Sin especialidad asignada',
    shortLabel: this.specialty()?.name ?? 'Sin especialidad',
    icon: 'activity',
  }));
  readonly specialtyLabel = computed(() => this.currentSpecialtyOption().label);
  readonly headerBrandTitle = computed(() => this.specialty() ? `DoctorChart • ${this.specialty()!.name}` : 'DoctorChart');
  readonly headerBrandSubtitle = computed(() => this.specialty() ? `Módulo clínico de ${this.specialty()!.name}` : 'Historia clínica');

  setSpecialty(specialty: SpecialtySummary | null): void {
    this.specialty.set(specialty ? { ...specialty } : null);
  }
  setDefinition(definition: WizardDefinition | null): void {
    this.definition.set(definition ? structuredClone(definition) : null);
  }
  clearSpecialty(): void {
    this.specialty.set(null);
    this.definition.set(null);
  }
}
