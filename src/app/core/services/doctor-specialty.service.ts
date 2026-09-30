import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MedicalSpecialty } from '../models/specialty.model';

export type ClinicianSpecialtyMode = MedicalSpecialty;

export interface SpecialtyModeOption {
  value: ClinicianSpecialtyMode;
  label: string;
  shortLabel: string;
  icon: string;
}

export const CLINICIAN_SPECIALTY_MODES: SpecialtyModeOption[] = [
  { value: 'PEDIATRICS', label: 'Pediatría y Neonatología', shortLabel: 'Pediatría', icon: 'baby' },
  { value: 'GENERAL_MEDICINE', label: 'Medicina General y Familiar', shortLabel: 'Med. General', icon: 'activity' },
  { value: 'CARDIOLOGY', label: 'Cardiología', shortLabel: 'Cardiología', icon: 'heart' },
  { value: 'OPHTHALMOLOGY', label: 'Oftalmología', shortLabel: 'Oftalmología', icon: 'eye' },
  { value: 'DERMATOLOGY', label: 'Dermatología', shortLabel: 'Dermatología', icon: 'sparkles' },
  { value: 'GYNECOLOGY', label: 'Ginecología y Obstetricia', shortLabel: 'Ginecología', icon: 'user' },
  { value: 'TRAUMATOLOGY', label: 'Traumatología y Ortopedia', shortLabel: 'Traumatología', icon: 'bone' },
  { value: 'NEUROLOGY', label: 'Neurología', shortLabel: 'Neurología', icon: 'brain' },
  { value: 'PSYCHIATRY', label: 'Psiquiatría y Salud Mental', shortLabel: 'Psiquiatría', icon: 'smile' },
  { value: 'ENDOCRINOLOGY', label: 'Endocrinología y Metabolismo', shortLabel: 'Endocrinología', icon: 'zap' },
  { value: 'GASTROENTEROLOGY', label: 'Gastroenterología', shortLabel: 'Gastroenterología', icon: 'shield' },
  { value: 'UROLOGY', label: 'Urología', shortLabel: 'Urología', icon: 'droplet' },
  { value: 'ONCOLOGY', label: 'Oncología Clínica', shortLabel: 'Oncología', icon: 'sun' },
];

export const DEFAULT_SPECIALTY_OPTION: SpecialtyModeOption = {
  value: 'GENERAL_MEDICINE',
  label: 'Sin Especialidad Asignada',
  shortLabel: 'Sin Especialidad',
  icon: 'activity',
};

@Injectable({
  providedIn: 'root',
})
export class DoctorSpecialtyService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly activeSpecialty = signal<ClinicianSpecialtyMode | null>(null);
  readonly customSpecialtyLabel = signal<string | null>(null);

  readonly isPediatricMode = computed(() => this.activeSpecialty() === 'PEDIATRICS');
  readonly isMultiSpecialty = computed(() => false);

  readonly currentSpecialtyOption = computed<SpecialtyModeOption>(() => {
    const current = this.activeSpecialty();
    const customLabel = this.customSpecialtyLabel();
    if (!current) {
      if (customLabel) {
        return {
          value: 'GENERAL_MEDICINE',
          label: customLabel,
          shortLabel: customLabel,
          icon: 'activity',
        };
      }
      return DEFAULT_SPECIALTY_OPTION;
    }
    const found = CLINICIAN_SPECIALTY_MODES.find((s) => s.value === current);
    if (found) {
      return customLabel ? { ...found, label: customLabel } : found;
    }
    if (customLabel) {
      return {
        value: current,
        label: customLabel,
        shortLabel: customLabel,
        icon: 'activity',
      };
    }
    return DEFAULT_SPECIALTY_OPTION;
  });

  readonly specialtyLabel = computed(() => this.currentSpecialtyOption().label);

  readonly headerBrandTitle = computed(() => {
    const s = this.activeSpecialty();
    const opt = this.currentSpecialtyOption();
    return s || this.customSpecialtyLabel() ? `DoctorChart • ${opt.shortLabel}` : 'DoctorChart';
  });

  readonly headerBrandSubtitle = computed(() => {
    const opt = this.currentSpecialtyOption();
    return `Módulo Clínico de ${opt.label}`;
  });

  constructor() {
    // Purge deprecated localStorage key if present
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      try {
        localStorage.removeItem('doctorchart_active_specialty');
      } catch {
        // ignore
      }
    }
  }

  setSpecialty(specialty: ClinicianSpecialtyMode | string, displayName?: string | null): void {
    const normalized = String(specialty || '')
      .trim()
      .toUpperCase()
      .replace(/-/g, '_')
      .replace(/\s+/g, '_') as ClinicianSpecialtyMode;
    const known = CLINICIAN_SPECIALTY_MODES.find((s) => s.value === normalized);
    this.activeSpecialty.set(known ? known.value : normalized || 'GENERAL_MEDICINE');
    if (displayName !== undefined) {
      this.customSpecialtyLabel.set(displayName || null);
    }
  }

  clearSpecialty(): void {
    this.activeSpecialty.set(null);
    this.customSpecialtyLabel.set(null);
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      try {
        localStorage.removeItem('doctorchart_active_specialty');
      } catch {
        // ignore
      }
    }
  }
}

