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

  readonly isPediatricMode = computed(() => this.activeSpecialty() === 'PEDIATRICS');
  readonly isMultiSpecialty = computed(() => false);

  readonly currentSpecialtyOption = computed(() => {
    const current = this.activeSpecialty();
    if (!current) {
      return DEFAULT_SPECIALTY_OPTION;
    }
    return CLINICIAN_SPECIALTY_MODES.find((s) => s.value === current) || DEFAULT_SPECIALTY_OPTION;
  });

  readonly specialtyLabel = computed(() => this.currentSpecialtyOption().label);

  readonly headerBrandTitle = computed(() => {
    const s = this.activeSpecialty();
    if (s === 'PEDIATRICS') {
      return 'PediatríaCare M3';
    }
    const opt = this.currentSpecialtyOption();
    return s ? `DoctorChart • ${opt.shortLabel}` : 'DoctorChart';
  });

  readonly headerBrandSubtitle = computed(() => {
    const s = this.activeSpecialty();
    if (s === 'PEDIATRICS') {
      return 'Seguimiento Clínico Pediátrico & Curvas OMS';
    }
    const opt = this.currentSpecialtyOption();
    return s ? `Módulo Clínico de ${opt.label}` : 'Módulo Clínico';
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

  setSpecialty(specialty: ClinicianSpecialtyMode): void {
    this.activeSpecialty.set(specialty);
  }

  clearSpecialty(): void {
    this.activeSpecialty.set(null);
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      try {
        localStorage.removeItem('doctorchart_active_specialty');
      } catch {
        // ignore
      }
    }
  }
}
