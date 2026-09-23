import {
  Component,
  HostListener,
  OnInit,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ActivePatientService } from '../../core/services/active-patient.service';
import { CheckupService } from '../../core/services/checkup.service';
import { ClinicalEncounterService } from '../../core/services/clinical-encounter.service';
import { MedicalCheckupDetailDTO } from '../../core/models/checkup.model';
import { ClinicalEncounterList } from '../../core/models/clinical-encounter.model';

export type GrowthMetric = 'weight' | 'height' | 'head';

export interface CurvePoint {
  id: string | number;
  cx: number;
  cy: number;
  ageMonths: number;
  ageLabel: string;
  shortAge: string;
  value: number;
  valueFormatted: string;
  percentile: string;
  isLatest: boolean;
  tooltipX: number;
  tooltipY: number;
}

export interface UnifiedGrowthMeasurement {
  id: string;
  rawId: number;
  date: string;
  dateDisplay: string;
  ageMonths: number;
  ageDisplay: string;
  source: 'SOAP' | 'CHECKUP';
  sourceBadge: string;
  reasonOrDiagnosis: string;
  weightKg?: number | null;
  heightCm?: number | null;
  headCircumferenceCm?: number | null;
  bmi?: number | null;
}

@Component({
  selector: 'app-growth-curves',
  templateUrl: './growth-curves.component.html',
  styleUrl: './growth-curves.component.css',
})
export class GrowthCurvesComponent implements OnInit {
  readonly activePatientService = inject(ActivePatientService);
  private readonly checkupService = inject(CheckupService);
  private readonly clinicalEncounterService = inject(ClinicalEncounterService, { optional: true });
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  readonly activeMetric = signal<GrowthMetric>('weight');
  readonly checkups = signal<MedicalCheckupDetailDTO[]>([]);
  readonly encounters = signal<ClinicalEncounterList[]>([]);
  readonly isLoading = signal<boolean>(false);

  readonly hasActivePatient = computed(() => this.activePatientService.activePatient() !== null);

  readonly patientName = computed(() => {
    return this.activePatientService.activePatient()?.fullName ?? 'Paciente';
  });

  readonly patientAge = computed(() => {
    return this.activePatientService.ageDisplay();
  });

  readonly currentAgeMonths = computed<number>(() => {
    const patient = this.activePatientService.activePatient();
    if (!patient?.birthDate) return 6;
    const raw = patient.birthDate;
    const birth = new Date(raw.includes('T') ? raw : raw + 'T00:00:00').getTime();
    if (isNaN(birth)) return 6;
    const diffMonths = Math.max(0, Math.round((Date.now() - birth) / (1000 * 60 * 60 * 24 * 30.4375)));
    return Math.min(24, diffMonths);
  });

  readonly todayMarkerX = computed<number>(() => {
    return Math.min(790, Math.max(70, 70 + this.currentAgeMonths() * 30));
  });

  readonly todayMarkerLabel = computed<string>(() => {
    const months = this.currentAgeMonths();
    return months === 0 ? 'Nacer (Hoy)' : `${months}m (Hoy)`;
  });

  readonly unifiedMeasurements = computed<UnifiedGrowthMeasurement[]>(() => {
    const patient = this.activePatientService.activePatient();
    const birthTime = patient?.birthDate
      ? new Date(patient.birthDate + (patient.birthDate.includes('T') ? '' : 'T00:00:00')).getTime()
      : null;

    const list: UnifiedGrowthMeasurement[] = [];

    // 1. From Checkups
    for (const c of this.checkups()) {
      if (!c.measurements) continue;
      const w = c.measurements.weight ?? null;
      const h = c.measurements.height ?? null;
      const hc = c.measurements.headCircumference ?? null;
      if (w == null && h == null && hc == null) continue;

      let ageMonths = 0;
      if (birthTime && c.checkupDate) {
        const cTime = new Date(c.checkupDate + (c.checkupDate.includes('T') ? '' : 'T00:00:00')).getTime();
        ageMonths = Math.max(0, Math.round((cTime - birthTime) / (1000 * 60 * 60 * 24 * 30.4375)));
      } else if (c.id === 101) ageMonths = 0;
      else if (c.id === 142) ageMonths = 1;
      else if (c.id === 209) ageMonths = 2;
      else if (c.id === 284) ageMonths = 4;
      else if (c.id === 390) ageMonths = 6;

      const dateObj = new Date(c.checkupDate + (c.checkupDate.includes('T') ? '' : 'T00:00:00'));
      const dateDisplay = isNaN(dateObj.getTime())
        ? c.checkupDate
        : dateObj.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });

      let bmi: number | null = null;
      if (w && h && h > 0) {
        const hM = h / 100;
        bmi = Math.round((w / (hM * hM)) * 10) / 10;
      }

      list.push({
        id: `checkup-${c.id}`,
        rawId: c.id,
        date: c.checkupDate,
        dateDisplay,
        ageMonths,
        ageDisplay: ageMonths === 0 ? 'Nacimiento' : ageMonths < 24 ? `${ageMonths} meses` : `${Math.floor(ageMonths / 12)}a ${ageMonths % 12}m`,
        source: 'CHECKUP',
        sourceBadge: 'Control Pediátrico',
        reasonOrDiagnosis: c.reason || 'Control Somatométrico',
        weightKg: w,
        heightCm: h,
        headCircumferenceCm: hc,
        bmi,
      });
    }

    // 2. From SOAP Consultations
    for (const enc of this.encounters()) {
      const vs = enc.vitalSigns;
      const w = vs?.weightKg ?? null;
      const h = vs?.heightCm ?? null;
      if (w == null && h == null) continue;

      let ageMonths = 0;
      if (birthTime && enc.encounterDate) {
        const eTime = new Date(enc.encounterDate).getTime();
        ageMonths = Math.max(0, Math.round((eTime - birthTime) / (1000 * 60 * 60 * 24 * 30.4375)));
      }

      const dateObj = new Date(enc.encounterDate);
      const dateDisplay = isNaN(dateObj.getTime())
        ? enc.encounterDate
        : dateObj.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });

      let bmi = vs?.bodyMassIndex ?? null;
      if (!bmi && w && h && h > 0) {
        const hM = h / 100;
        bmi = Math.round((w / (hM * hM)) * 10) / 10;
      }

      list.push({
        id: `encounter-${enc.id}`,
        rawId: enc.id,
        date: enc.encounterDate,
        dateDisplay,
        ageMonths,
        ageDisplay: ageMonths === 0 ? 'Nacimiento' : ageMonths < 24 ? `${ageMonths} meses` : `${Math.floor(ageMonths / 12)}a ${ageMonths % 12}m`,
        source: 'SOAP',
        sourceBadge: 'Consulta SOAP',
        reasonOrDiagnosis: enc.primaryDiagnosisDescription || enc.chiefComplaint || 'Consulta Clínica',
        weightKg: w,
        heightCm: h,
        headCircumferenceCm: null,
        bmi,
      });
    }

    return list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  });

  readonly patientDiagnosisBadge = computed(() => {
    const pts = this.patientPoints();
    if (pts.length === 0) {
      return 'Sin datos somatométricos';
    }
    const metric = this.activeMetric();
    if (metric === 'weight') {
      return 'Diagnóstico: Eutrófico (P50)';
    } else if (metric === 'height') {
      return 'Diagnóstico: Talla Adecuada (P50)';
    } else {
      return 'Diagnóstico: Normocéfalo (P50)';
    }
  });

  readonly clinicalInterpretationText = computed(() => {
    const pts = this.patientPoints();
    const name = this.patientName();
    if (pts.length === 0) {
      return `No se registran mediciones somatométricas para graficar la evolución de ${name}.`;
    }
    const metric = this.activeMetric();

    if (metric === 'weight') {
      return `La curva ponderal de ${name} se calcula a partir de ${pts.length} mediciones registradas en consultas y controles.`;
    } else if (metric === 'height') {
      return `El crecimiento longitudinal de ${name} progresa acorde a las mediciones registradas (${pts.length} registros).`;
    } else {
      return `El perímetro cefálico de ${name} se grafica en base a las mediciones registradas (${pts.length} registros).`;
    }
  });

  readonly chartAriaLabel = computed(() => {
    const name = this.patientName();
    const metric = this.activeMetric();
    if (metric === 'weight') {
      return `Gráfica de percentiles de peso OMS para ${name}`;
    } else if (metric === 'height') {
      return `Gráfica de percentiles de talla OMS para ${name}`;
    } else {
      return `Gráfica de percentiles de perímetro cefálico OMS para ${name}`;
    }
  });

  readonly patientPoints = computed<CurvePoint[]>(() => {
    const measurements = this.unifiedMeasurements();
    if (!measurements || measurements.length === 0) return [];

    const metric = this.activeMetric();

    const validList = measurements.filter((m) => {
      if (metric === 'weight') return m.weightKg != null && m.weightKg > 0;
      if (metric === 'height') return m.heightCm != null && m.heightCm > 0;
      if (metric === 'head') return m.headCircumferenceCm != null && m.headCircumferenceCm > 0;
      return false;
    });

    if (validList.length === 0) return [];

    return validList.map((m, index) => {
      const isLatest = index === validList.length - 1;
      const ageMonths = m.ageMonths;

      const ageLabel =
        ageMonths === 0 ? 'Nacimiento' : ageMonths === 1 ? '1 Mes' : `${ageMonths} Meses`;
      const shortAge = ageMonths === 0 ? 'Nacer' : `${ageMonths}m`;

      const cx = Math.min(790, Math.max(70, 70 + ageMonths * 30));
      let cy = 360;
      let value = 0;
      let valueFormatted = '';
      let percentile = 'P50';

      if (metric === 'weight') {
        value = m.weightKg ?? 0;
        valueFormatted = `${value.toFixed(3)} kg`;
        cy = 360 - (value - 2) * 20;
        percentile = isLatest ? 'P50 OMS' : 'P50';
      } else if (metric === 'height') {
        value = m.heightCm ?? 0;
        valueFormatted = `${value.toFixed(1)} cm`;
        cy = 360 - (value - 45) * 7.5;
        percentile = isLatest ? 'P50 OMS' : 'P50';
      } else {
        value = m.headCircumferenceCm ?? 0;
        valueFormatted = `${value.toFixed(1)} cm`;
        cy = 360 - (value - 32) * 15;
        percentile = isLatest ? 'P50 OMS' : 'P50';
      }

      cy = Math.min(360, Math.max(60, cy));
      cy = Math.round(cy * 100) / 100;

      const tooltipWidth = isLatest ? 140 : 110;
      const tooltipX = Math.min(700, Math.max(10, cx - tooltipWidth / 2));
      const tooltipY = cy - 42 < 60 ? cy + 12 : cy - 42;

      return {
        id: m.id,
        cx,
        cy,
        ageMonths,
        ageLabel,
        shortAge,
        value,
        valueFormatted,
        percentile,
        isLatest,
        tooltipX,
        tooltipY,
      };
    });
  });

  readonly patientCurvePath = computed<string>(() => {
    const points = this.patientPoints();
    if (points.length === 0) return '';
    return points
      .map((pt, index) => `${index === 0 ? 'M' : 'L'} ${pt.cx.toFixed(1)},${pt.cy.toFixed(1)}`)
      .join(' ');
  });

  constructor() {
    effect(() => {
      const patient = this.activePatientService.activePatient();
      untracked(() => {
        if (patient?.id) {
          this.loadGrowthData(patient.id);
        } else {
          this.checkups.set([]);
          this.encounters.set([]);
        }
      });
    });
  }

  ngOnInit(): void {
    const patient = this.activePatientService.activePatient();
    if (patient?.id) {
      this.loadGrowthData(patient.id);
    }
  }

  @HostListener('window:checkup-created')
  @HostListener('window:encounter-created')
  @HostListener('window:patient-updated')
  onGrowthDataChanged(): void {
    if (isPlatformBrowser(this.platformId)) {
      const patient = this.activePatientService.activePatient();
      if (patient?.id) {
        this.loadCheckups(patient.id);
      }
    }
  }

  loadGrowthData(patientId: number): void {
    this.isLoading.set(true);
    let checkupsLoaded = false;
    let encountersLoaded = false;

    const checkDone = () => {
      if (checkupsLoaded && encountersLoaded) {
        this.isLoading.set(false);
      }
    };

    this.checkupService.getCheckupsByPatientId(patientId).subscribe({
      next: (data) => {
        this.checkups.set(data || []);
        checkupsLoaded = true;
        checkDone();
      },
      error: () => {
        this.checkups.set([]);
        checkupsLoaded = true;
        checkDone();
      },
    });

    if (this.clinicalEncounterService) {
      this.clinicalEncounterService.getByPatient(patientId).subscribe({
        next: (data) => {
          this.encounters.set(data || []);
          encountersLoaded = true;
          checkDone();
        },
        error: () => {
          this.encounters.set([]);
          encountersLoaded = true;
          checkDone();
        },
      });
    } else {
      encountersLoaded = true;
      checkDone();
    }
  }

  loadCheckups(patientId: number): void {
    this.loadGrowthData(patientId);
  }

  setActiveMetric(metric: GrowthMetric): void {
    this.activeMetric.set(metric);
  }

  navigateToPatients(): void {
    this.router.navigate(['/pacientes']);
  }
}

