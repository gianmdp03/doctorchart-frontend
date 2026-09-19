import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PatientDetailDTO } from '../models/patient.model';
import { PatientService } from './patient.service';

const ACTIVE_PATIENT_STORAGE_KEY = 'doctorchart_active_patient_id';
const ACTIVE_PATIENT_DATA_KEY = 'doctorchart_active_patient_data';

function getStoredActivePatient(platformId: object): PatientDetailDTO | null {
  if (isPlatformBrowser(platformId) && typeof window !== 'undefined') {
    try {
      const hasAuth = Object.keys(localStorage).some(
        (k) => k.startsWith('sb-') && k.endsWith('-auth-token')
      );
      if (!hasAuth) {
        return null;
      }
      const json = localStorage.getItem(ACTIVE_PATIENT_DATA_KEY);
      if (json) {
        return JSON.parse(json) as PatientDetailDTO;
      }
    } catch (e) {
      console.warn('Unable to parse cached active patient data:', e);
    }
  }
  return null;
}

@Injectable({
  providedIn: 'root',
})
export class ActivePatientService {
  private readonly patientService = inject(PatientService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly activePatient = signal<PatientDetailDTO | null>(getStoredActivePatient(this.platformId));
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly patientId = computed(() => this.activePatient()?.id ?? null);
  readonly patientName = computed(() => this.activePatient()?.fullName ?? 'Sin paciente seleccionado');
  
  readonly patientInitials = computed(() => {
    const name = this.activePatient()?.fullName;
    if (!name) return 'DP';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  });

  readonly formattedBirthDate = computed(() => {
    const raw = this.activePatient()?.birthDate;
    if (!raw) return '—';
    const date = new Date(raw + 'T00:00:00');
    return isNaN(date.getTime())
      ? raw
      : date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  });

  readonly ageDisplay = computed(() => {
    const raw = this.activePatient()?.birthDate;
    if (!raw) return '—';
    const birth = new Date(raw + 'T00:00:00');
    if (isNaN(birth.getTime())) return '—';

    const now = new Date();
    let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
    if (now.getDate() < birth.getDate()) {
      months--;
    }

    if (months < 0) return 'Recién nacido';
    if (months === 0) {
      const diffTime = Math.abs(now.getTime() - birth.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} días`;
    }
    if (months < 24) {
      return `${months} meses`;
    }
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    return remMonths > 0 ? `${years} años ${remMonths}m` : `${years} años`;
  });

  readonly ageInYears = computed(() => {
    const raw = this.activePatient()?.birthDate;
    if (!raw) return 0;
    const birth = new Date(raw + 'T00:00:00');
    if (isNaN(birth.getTime())) return 0;
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
      years--;
    }
    return Math.max(0, years);
  });

  readonly primaryGuardian = computed(() => {
    const info = this.activePatient()?.guardianInfo;
    if (!info) return '—';
    if (info.firstGuardianFullName) {
      return info.firstGuardianFullName;
    }
    return '—';
  });

  readonly latestMeasurements = computed(() => this.activePatient()?.latestMeasurements ?? null);

  readonly formattedWeight = computed(() => {
    const m = this.latestMeasurements();
    const weight = m?.weight != null ? Number(m.weight) : null;
    if (weight != null && !isNaN(weight) && weight > 0) {
      return `${weight >= 10 ? weight.toFixed(1) : weight.toFixed(3)} kg`;
    }
    return '-- kg';
  });

  readonly formattedHeight = computed(() => {
    const m = this.latestMeasurements();
    const height = m?.height != null ? Number(m.height) : null;
    if (height != null && !isNaN(height) && height > 0) {
      return `${height.toFixed(1)} cm`;
    }
    return '-- cm';
  });

  readonly formattedHeadCircumference = computed(() => {
    const m = this.latestMeasurements();
    const hc = m?.headCircumference != null ? Number(m.headCircumference) : null;
    if (hc != null && !isNaN(hc) && hc > 0) {
      return `${hc.toFixed(1)} cm`;
    }
    return '-- cm';
  });

  readonly deltaWeight = computed(() => {
    const patient = this.activePatient();
    const currentWeight = patient?.latestMeasurements?.weight != null ? Number(patient.latestMeasurements.weight) : null;
    const birthWeight = patient?.personalHistory?.birthMeasurements?.weight != null ? Number(patient.personalHistory.birthMeasurements.weight) : null;
    if (currentWeight != null && birthWeight != null && !isNaN(currentWeight) && !isNaN(birthWeight) && currentWeight > 0 && birthWeight > 0) {
      const diff = currentWeight - birthWeight;
      const sign = diff >= 0 ? '+' : '';
      return `${sign}${diff.toFixed(3)} kg`;
    }
    return '--';
  });

  readonly bmiDisplay = computed(() => {
    const m = this.latestMeasurements();
    const weight = m?.weight != null ? Number(m.weight) : null;
    const height = m?.height != null ? Number(m.height) : null;
    if (
      weight != null &&
      height != null &&
      !isNaN(weight) &&
      !isNaN(height) &&
      weight > 0 &&
      height > 0
    ) {
      const heightM = height / 100;
      const bmi = weight / (heightM * heightM);
      if (isFinite(bmi) && bmi > 0) {
        return `${bmi.toFixed(1)} kg/m²`;
      }
    }
    return '--';
  });

  constructor() {
    this.hydrateFromStorage();
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.addEventListener('auth-signout', () => {
        this.clear();
      });
      window.addEventListener('auth-success', () => {
        this.clear();
      });
    }
  }

  private hydrateFromStorage(): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      try {
        const hasAuth = Object.keys(localStorage).some(
          (k) => k.startsWith('sb-') && k.endsWith('-auth-token')
        );
        if (!hasAuth) {
          localStorage.removeItem(ACTIVE_PATIENT_STORAGE_KEY);
          localStorage.removeItem(ACTIVE_PATIENT_DATA_KEY);
          this.activePatient.set(null);
          return;
        }

        const storedId = localStorage.getItem(ACTIVE_PATIENT_STORAGE_KEY);
        if (storedId) {
          const idNum = Number(storedId);
          if (!isNaN(idNum) && idNum > 0) {
            this.loadPatient(idNum);
          }
        }
      } catch (e) {
        console.warn('Unable to access localStorage for active patient:', e);
      }
    }
  }

  setActivePatient(patient: PatientDetailDTO | null): void {
    this.activePatient.set(patient);
    this.error.set(null);
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      try {
        if (patient?.id) {
          localStorage.setItem(ACTIVE_PATIENT_STORAGE_KEY, String(patient.id));
          localStorage.setItem(ACTIVE_PATIENT_DATA_KEY, JSON.stringify(patient));
        } else {
          localStorage.removeItem(ACTIVE_PATIENT_STORAGE_KEY);
          localStorage.removeItem(ACTIVE_PATIENT_DATA_KEY);
        }
      } catch (e) {
        console.warn('Unable to save active patient in localStorage:', e);
      }
    }
  }

  loadPatient(id: number): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.patientService.getPatientById(id).subscribe({
      next: (patient) => {
        this.activePatient.set(patient);
        this.isLoading.set(false);
        if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
          try {
            localStorage.setItem(ACTIVE_PATIENT_STORAGE_KEY, String(id));
            localStorage.setItem(ACTIVE_PATIENT_DATA_KEY, JSON.stringify(patient));
          } catch {}
        }
      },
      error: (err) => {
        console.error('Error loading patient:', err);
        this.error.set(err.message || 'Error al cargar paciente');
        this.isLoading.set(false);
        // If patient not found, remove stale ID and cached data from storage
        if (err?.status === 404 && isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
          try {
            localStorage.removeItem(ACTIVE_PATIENT_STORAGE_KEY);
            localStorage.removeItem(ACTIVE_PATIENT_DATA_KEY);
            this.activePatient.set(null);
          } catch {}
        }
      },
    });
  }

  clear(): void {
    this.activePatient.set(null);
    this.error.set(null);
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      try {
        localStorage.removeItem(ACTIVE_PATIENT_STORAGE_KEY);
        localStorage.removeItem(ACTIVE_PATIENT_DATA_KEY);
      } catch {}
    }
  }
}

