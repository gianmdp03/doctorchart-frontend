import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { computed, DestroyRef, effect, inject, Injectable, PLATFORM_ID, signal, untracked } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PatientDetailDTO } from '../models/patient.model';
import { PatientService } from './patient.service';

@Injectable({
  providedIn: 'root',
})
export class ActivePatientService {
  private readonly patientService = inject(PatientService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private owner: string | null | undefined = undefined;
  private request: Subscription | null = null;
  private generation = 0;
  readonly activePatient = signal<PatientDetailDTO | null>(null);
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
    if (info.fatherFullName) {
      return info.fatherFullName;
    }
    if (info.motherFullName) {
      return info.motherFullName;
    }
    if (info.firstGuardianFullName) {
      return info.firstGuardianFullName;
    }
    return '—';
  });

  calculateAgeAtDate(targetDate: string | Date | null | undefined): string {
    const rawBirth = this.activePatient()?.birthDate;
    if (!rawBirth) return '—';
    const birth = new Date(rawBirth + 'T00:00:00');
    if (isNaN(birth.getTime())) return '—';

    let target: Date;
    if (!targetDate) {
      target = new Date();
    } else if (targetDate instanceof Date) {
      target = targetDate;
    } else {
      const parsed = new Date(targetDate.includes('T') ? targetDate : targetDate + 'T00:00:00');
      target = isNaN(parsed.getTime()) ? new Date() : parsed;
    }

    let months = (target.getFullYear() - birth.getFullYear()) * 12 + (target.getMonth() - birth.getMonth());
    if (target.getDate() < birth.getDate()) {
      months--;
    }

    if (months < 0) return 'Recién nacido';
    if (months === 0) {
      const diffTime = Math.abs(target.getTime() - birth.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} días`;
    }
    if (months < 24) {
      return `${months} meses`;
    }
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    return remMonths > 0 ? `${years} años ${remMonths}m` : `${years} años`;
  }

  readonly latestMeasurements = computed(() => this.activePatient()?.latestMeasurements ?? null);

  readonly formattedWeight = computed(() => {
    const m = this.latestMeasurements();
    const weight = m?.weightKg != null ? Number(m.weightKg) : null;
    if (weight != null && !isNaN(weight) && weight > 0) {
      return `${weight >= 10 ? weight.toFixed(1) : weight.toFixed(3)} kg`;
    }
    return '-- kg';
  });

  readonly formattedHeight = computed(() => {
    const m = this.latestMeasurements();
    const height = m?.heightCm != null ? Number(m.heightCm) : null;
    if (height != null && !isNaN(height) && height > 0) {
      return `${height.toFixed(1)} cm`;
    }
    return '-- cm';
  });

  readonly formattedHeadCircumference = computed(() => {
    const m = this.latestMeasurements();
    const hc = m?.headCircumferenceCm != null ? Number(m.headCircumferenceCm) : null;
    if (hc != null && !isNaN(hc) && hc > 0) {
      return `${hc.toFixed(1)} cm`;
    }
    return '-- cm';
  });

  readonly deltaWeight = computed(() => {
    const patient = this.activePatient();
    const currentWeight = patient?.latestMeasurements?.weightKg != null ? Number(patient.latestMeasurements.weightKg) : null;
    const birthWeight = patient?.personalHistory?.birthMeasurements?.weightKg != null ? Number(patient.personalHistory.birthMeasurements.weightKg) : null;
    if (currentWeight != null && birthWeight != null && !isNaN(currentWeight) && !isNaN(birthWeight) && currentWeight > 0 && birthWeight > 0) {
      const diff = currentWeight - birthWeight;
      const sign = diff >= 0 ? '+' : '';
      return `${sign}${diff.toFixed(3)} kg`;
    }
    return '--';
  });

  readonly bmiDisplay = computed(() => {
    const m = this.latestMeasurements();
    const weight = m?.weightKg != null ? Number(m.weightKg) : null;
    const height = m?.heightCm != null ? Number(m.heightCm) : null;
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
    effect(() => { this.auth.currentUser(); untracked(() => this.syncSession()); });
    this.destroyRef.onDestroy(() => this.request?.unsubscribe());
  }
  private storageKey(owner = this.owner): string | null {
    return owner ? 'doctorchart_active_patient:' + encodeURIComponent(owner) : null;
  }
  private syncSession(restore = true): void {
    const owner = this.auth.currentUser()?.id ?? null;
    if (owner === this.owner) return;
    this.request?.unsubscribe(); this.request = null; this.generation++;
    this.owner = owner; this.activePatient.set(null); this.isLoading.set(false); this.error.set(null);
    const key = this.storageKey();
    if (restore && key && isPlatformBrowser(this.platformId)) {
      try {
        const stored = localStorage.getItem(key);
        const id = Number(stored);
        if (stored && Number.isSafeInteger(id) && id > 0) this.loadPatient(id);
      } catch { }
    }
  }
  private persist(patientId: number | null): void {
    const key = this.storageKey();
    if (!key || !isPlatformBrowser(this.platformId)) return;
    try { if (patientId) localStorage.setItem(key,String(patientId)); else localStorage.removeItem(key); } catch { }
  }
  setActivePatient(patient: PatientDetailDTO | null): void {
    this.syncSession(false); this.request?.unsubscribe(); this.generation++;
    if (!this.owner) return;
    this.activePatient.set(patient ? structuredClone(patient) : null); this.isLoading.set(false); this.error.set(null);
    this.persist(patient?.id ?? null);
  }
  loadPatient(id: number): void {
    this.syncSession(false);
    if (!this.owner || !Number.isSafeInteger(id) || id <= 0) return;
    this.request?.unsubscribe();
    const generation = ++this.generation;
    const owner = this.owner;
    if (this.patientId() !== id) this.activePatient.set(null);
    this.isLoading.set(true); this.error.set(null);
    this.request = this.patientService.getPatientById(id).subscribe({
      next: patient => {
        if (generation !== this.generation || owner !== this.auth.currentUser()?.id) return;
        if (patient.id !== id) {
          this.activePatient.set(null); this.isLoading.set(false); this.persist(null);
          this.error.set('La respuesta no corresponde al paciente solicitado.'); return;
        }
        this.activePatient.set(structuredClone(patient)); this.isLoading.set(false); this.persist(id);
      },
      error: err => {
        if (generation !== this.generation || owner !== this.auth.currentUser()?.id) return;
        this.activePatient.set(null); this.isLoading.set(false);
        this.error.set(err?.error?.message || 'Error al cargar paciente');
        if (err?.status === 403 || err?.status === 404) this.persist(null);
      },
    });
  }
  clear(): void {
    this.syncSession(false);
    this.request?.unsubscribe(); this.request = null; this.generation++;
    this.isLoading.set(false); this.activePatient.set(null); this.error.set(null); this.persist(null);
  }
}
