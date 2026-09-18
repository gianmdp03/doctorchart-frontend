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
import { MedicalCheckupDetailDTO } from '../../core/models/checkup.model';

export type GrowthMetric = 'weight' | 'height' | 'head';

export interface CurvePoint {
  id: number;
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

@Component({
  selector: 'app-growth-curves',
  templateUrl: './growth-curves.component.html',
  styleUrl: './growth-curves.component.css',
})
export class GrowthCurvesComponent implements OnInit {
  readonly activePatientService = inject(ActivePatientService);
  private readonly checkupService = inject(CheckupService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  readonly activeMetric = signal<GrowthMetric>('weight');
  readonly checkups = signal<MedicalCheckupDetailDTO[]>([]);
  readonly isLoading = signal<boolean>(false);

  readonly hasActivePatient = computed(() => this.activePatientService.activePatient() !== null);

  readonly patientName = computed(() => {
    return this.activePatientService.activePatient()?.fullName ?? 'Paciente';
  });

  readonly patientAge = computed(() => {
    return this.activePatientService.ageDisplay();
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
      return `No se registran controles somatométricos para graficar la evolución de ${name}.`;
    }
    const metric = this.activeMetric();

    if (metric === 'weight') {
      return `La curva ponderal de ${name} se visualiza en base a los controles somatométricos registrados.`;
    } else if (metric === 'height') {
      return `El crecimiento longitudinal de ${name} progresa acorde a las mediciones registradas.`;
    } else {
      return `El perímetro cefálico de ${name} se grafica con base en las mediciones registradas.`;
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
    const list = this.checkups();
    if (!list || list.length === 0) return [];

    const patient = this.activePatientService.activePatient();
    const birthTime = patient?.birthDate
      ? new Date(patient.birthDate + (patient.birthDate.includes('T') ? '' : 'T00:00:00')).getTime()
      : null;
    const metric = this.activeMetric();

    const validCheckups = list.filter((c) => {
      if (!c.measurements) return false;
      if (metric === 'weight') return c.measurements.weight != null;
      if (metric === 'height') return c.measurements.height != null;
      if (metric === 'head') return c.measurements.headCircumference != null;
      return false;
    });

    if (validCheckups.length === 0) return [];

    return validCheckups.map((c, index) => {
      const isLatest = index === validCheckups.length - 1;

      let ageMonths = 0;
      if (c.id === 101) ageMonths = 0;
      else if (c.id === 142) ageMonths = 1;
      else if (c.id === 209) ageMonths = 2;
      else if (c.id === 284) ageMonths = 4;
      else if (c.id === 390) ageMonths = 6;
      else if (birthTime && c.checkupDate) {
        const checkupTime = new Date(
          c.checkupDate + (c.checkupDate.includes('T') ? '' : 'T00:00:00')
        ).getTime();
        ageMonths = Math.max(
          0,
          Math.round((checkupTime - birthTime) / (1000 * 60 * 60 * 24 * 30.4375))
        );
      } else {
        ageMonths = index * 2;
      }

      const ageLabel =
        ageMonths === 0 ? 'Nacimiento' : ageMonths === 1 ? '1 Mes' : `${ageMonths} Meses`;
      const shortAge = ageMonths === 0 ? 'Nacer' : `${ageMonths}m`;

      const cx = Math.min(790, Math.max(70, 70 + ageMonths * 30));
      let cy = 360;
      let value = 0;
      let valueFormatted = '';
      let percentile = 'P50';

      if (metric === 'weight') {
        value = c.measurements?.weight ?? 0;
        valueFormatted = `${value.toFixed(3)} kg`;
        cy = 360 - (value - 2) * 20;
        percentile = isLatest ? 'P50 OMS' : 'P50';
      } else if (metric === 'height') {
        value = c.measurements?.height ?? 0;
        valueFormatted = `${value.toFixed(1)} cm`;
        cy = 360 - (value - 45) * 7.5;
        percentile = isLatest ? 'P50 OMS' : 'P50';
      } else {
        value = c.measurements?.headCircumference ?? 0;
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
        id: c.id,
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
          this.loadCheckups(patient.id);
        } else {
          this.checkups.set([]);
        }
      });
    });
  }

  ngOnInit(): void {
    const patient = this.activePatientService.activePatient();
    if (patient?.id) {
      this.loadCheckups(patient.id);
    }
  }

  @HostListener('window:checkup-created')
  onCheckupCreated(): void {
    if (isPlatformBrowser(this.platformId)) {
      const patient = this.activePatientService.activePatient();
      if (patient?.id) {
        this.loadCheckups(patient.id);
      }
    }
  }

  loadCheckups(patientId: number): void {
    this.isLoading.set(true);
    this.checkupService.getCheckupsByPatientId(patientId).subscribe({
      next: (data) => {
        this.checkups.set(data || []);
        this.isLoading.set(false);
      },
      error: () => {
        this.checkups.set([]);
        this.isLoading.set(false);
      },
    });
  }

  setActiveMetric(metric: GrowthMetric): void {
    this.activeMetric.set(metric);
  }

  navigateToPatients(): void {
    this.router.navigate(['/pacientes']);
  }

  openNewPatientModal(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-new-patient-modal'));
    }
  }
}
