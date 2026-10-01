import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Chart,
  ChartConfiguration,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TooltipItem,
} from 'chart.js';
import {
  BiologicalSex,
  GrowthMetricType,
  PatientGrowthMeasurement,
} from '../../../core/models/growth-chart.model';
import {
  getOmsPercentiles,
  OMS_METRIC_CONFIGS,
} from '../../../core/constants/oms-growth-data';

// Register required Chart.js components
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

export type GrowthAgeRange = '0-2' | '0-5';

@Component({
  selector: 'app-growth-chart',
  imports: [CommonModule],
  templateUrl: './growth-chart.component.html',
  styleUrl: './growth-chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrowthChartComponent {
  private readonly destroyRef = inject(DestroyRef);

  // Inputs
  readonly metric = input.required<GrowthMetricType>();
  readonly sex = input.required<BiologicalSex>();
  readonly measurements = input<PatientGrowthMeasurement[]>([]);
  readonly initialAgeRange = input<GrowthAgeRange>('0-2');

  // Internal state
  readonly selectedRange = signal<GrowthAgeRange>('0-2');

  // View child for canvas
  readonly chartCanvas = viewChild<ElementRef<HTMLCanvasElement>>('chartCanvas');

  private chartInstance: Chart | null = null;

  // Derived configurations
  readonly metricConfig = computed(() => OMS_METRIC_CONFIGS[this.metric()]);

  readonly maxMonths = computed(() => (this.selectedRange() === '0-2' ? 24 : 60));

  readonly sexLabel = computed(() => (this.sex() === 'MALE' ? 'Niño (Varón)' : 'Niña (Mujer)'));

  readonly omsData = computed(() => {
    const allPoints = getOmsPercentiles(this.sex(), this.metric());
    const limit = this.maxMonths();
    return allPoints.filter((pt) => pt.ageMonths <= limit);
  });

  readonly filteredMeasurements = computed(() => {
    const list = this.measurements();
    const limit = this.maxMonths();
    return list.filter((m) => m.ageMonths <= limit);
  });

  readonly latestMeasurement = computed(() => {
    const list = this.filteredMeasurements();
    return list.length > 0 ? list[list.length - 1] : null;
  });

  constructor() {
    // Sync initialAgeRange when set from outside
    effect(() => {
      this.selectedRange.set(this.initialAgeRange());
    });

    // Reactive chart redraw when metric, sex, range or measurements change
    effect(() => {
      // Access signals to track them
      const canvasRef = this.chartCanvas();
      const omsPoints = this.omsData();
      const patientPoints = this.filteredMeasurements();
      const metric = this.metric();
      const range = this.selectedRange();
      const config = this.metricConfig();

      if (!canvasRef?.nativeElement) {
        return;
      }

      this.renderChart(canvasRef.nativeElement, omsPoints, patientPoints, config, range);
    });

    this.destroyRef.onDestroy(() => {
      this.cleanupChart();
    });
  }

  setAgeRange(range: GrowthAgeRange): void {
    this.selectedRange.set(range);
  }

  private cleanupChart(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }

  private renderChart(
    canvas: HTMLCanvasElement,
    omsPoints: ReturnType<typeof this.omsData>,
    patientPoints: PatientGrowthMeasurement[],
    config: ReturnType<typeof this.metricConfig>,
    range: GrowthAgeRange
  ): void {
    this.cleanupChart();

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const maxAge = range === '0-2' ? 24 : 60;
    const xStep = range === '0-2' ? 2 : 6;

    // Prepare OMS percentile curve points
    const p3Data = omsPoints.map((p) => ({ x: p.ageMonths, y: p.p3 }));
    const p15Data = omsPoints.map((p) => ({ x: p.ageMonths, y: p.p15 }));
    const p50Data = omsPoints.map((p) => ({ x: p.ageMonths, y: p.p50 }));
    const p85Data = omsPoints.map((p) => ({ x: p.ageMonths, y: p.p85 }));
    const p97Data = omsPoints.map((p) => ({ x: p.ageMonths, y: p.p97 }));

    // Prepare patient trajectory points
    const patientData = patientPoints.map((p) => ({ x: p.ageMonths, y: p.value }));

    // Find min and max for Y-axis to give optimal breathing room
    let yMin = config.minY ?? 0;
    let yMax = config.maxY ?? 100;

    if (omsPoints.length > 0) {
      const minOms = Math.min(...omsPoints.map((p) => p.p3));
      const maxOms = Math.max(...omsPoints.map((p) => p.p97));
      const minPatient = patientPoints.length > 0 ? Math.min(...patientPoints.map((p) => p.value)) : minOms;
      const maxPatient = patientPoints.length > 0 ? Math.max(...patientPoints.map((p) => p.value)) : maxOms;

      const rawMin = Math.min(minOms, minPatient);
      const rawMax = Math.max(maxOms, maxPatient);
      yMin = Math.max(0, Math.floor(rawMin - (rawMax - rawMin) * 0.1));
      yMax = Math.ceil(rawMax + (rawMax - rawMin) * 0.1);
    }

    const chartConfig: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        datasets: [
          // OMS P97
          {
            label: 'OMS P97',
            data: p97Data,
            borderColor: 'rgba(156, 163, 175, 0.8)',
            borderWidth: 1.5,
            borderDash: [5, 4],
            pointRadius: 0,
            pointHoverRadius: 3,
            tension: 0.35,
            fill: false,
          },
          // OMS P85
          {
            label: 'OMS P85',
            data: p85Data,
            borderColor: 'rgba(107, 114, 128, 0.8)',
            borderWidth: 1.5,
            borderDash: [3, 3],
            pointRadius: 0,
            pointHoverRadius: 3,
            tension: 0.35,
            fill: false,
          },
          // OMS P50 (Mediana oficial destacada)
          {
            label: 'OMS P50 (Mediana)',
            data: p50Data,
            borderColor: '#374151',
            borderWidth: 2.5,
            pointRadius: 0,
            pointHoverRadius: 4,
            tension: 0.35,
            fill: false,
          },
          // OMS P15
          {
            label: 'OMS P15',
            data: p15Data,
            borderColor: 'rgba(107, 114, 128, 0.8)',
            borderWidth: 1.5,
            borderDash: [3, 3],
            pointRadius: 0,
            pointHoverRadius: 3,
            tension: 0.35,
            fill: false,
          },
          // OMS P3
          {
            label: 'OMS P3',
            data: p3Data,
            borderColor: 'rgba(156, 163, 175, 0.8)',
            borderWidth: 1.5,
            borderDash: [5, 4],
            pointRadius: 0,
            pointHoverRadius: 3,
            tension: 0.35,
            fill: false,
          },
          // Paciente
          {
            label: 'Evolución del Paciente',
            data: patientData,
            borderColor: '#2563eb',
            backgroundColor: '#ffffff',
            borderWidth: 3,
            pointRadius: 6,
            pointHoverRadius: 9,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#2563eb',
            pointBorderWidth: 2.5,
            pointHoverBackgroundColor: '#2563eb',
            pointHoverBorderColor: '#ffffff',
            pointHoverBorderWidth: 2.5,
            tension: 0.25,
            fill: false,
            order: -1, // Render on top of OMS curves
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'nearest',
          intersect: false,
          axis: 'x',
        },
        plugins: {
          legend: {
            display: false, // Custom HTML legend for precision and clean aesthetics
          },
          tooltip: {
            backgroundColor: '#1f2937',
            titleColor: '#f9fafb',
            bodyColor: '#e5e7eb',
            padding: 12,
            cornerRadius: 8,
            boxPadding: 4,
            displayColors: true,
            callbacks: {
              title: (items: TooltipItem<'line'>[]) => {
                const item = items[0];
                if (!item) return '';
                const isPatient = item.datasetIndex === 5;
                if (isPatient && patientPoints[item.dataIndex]) {
                  const pt = patientPoints[item.dataIndex];
                  return `Consulta: ${pt.dateFormatted}`;
                }
                return `Edad OMS: ${item.parsed.x} meses`;
              },
              label: (item: TooltipItem<'line'>) => {
                const isPatient = item.datasetIndex === 5;
                if (isPatient && patientPoints[item.dataIndex]) {
                  const pt = patientPoints[item.dataIndex];
                  const percentileStr = pt.approximatePercentile
                    ? ` (OMS: ${pt.approximatePercentile})`
                    : '';
                  return [
                    `• Medición: ${pt.value} ${pt.unit}${percentileStr}`,
                    `• Edad: ${pt.ageFormatted}`,
                  ];
                }
                const label = item.dataset.label || '';
                return `${label}: ${item.parsed.y} ${config.unit}`;
              },
            },
          },
        },
        scales: {
          x: {
            type: 'linear',
            min: 0,
            max: maxAge,
            title: {
              display: true,
              text: 'Edad del Paciente (Meses cumplidos)',
              color: '#4b5563',
              font: {
                weight: 'bold',
                size: 12,
              },
              padding: { top: 10 },
            },
            ticks: {
              stepSize: xStep,
              color: '#6b7280',
              callback: (val) => `${val}m`,
            },
            grid: {
              color: 'rgba(229, 231, 235, 0.8)',
            },
          },
          y: {
            type: 'linear',
            min: yMin,
            max: yMax,
            title: {
              display: true,
              text: config.yAxisLabel,
              color: '#4b5563',
              font: {
                weight: 'bold',
                size: 12,
              },
              padding: { bottom: 10 },
            },
            ticks: {
              stepSize: config.stepSize,
              color: '#6b7280',
              callback: (val) => `${val} ${config.unit}`,
            },
            grid: {
              color: 'rgba(229, 231, 235, 0.8)',
            },
          },
        },
      },
    };

    try {
      this.chartInstance = new Chart(canvas, chartConfig);
    } catch {
      // Safe fallback for environments without complete Canvas API implementation (e.g. headless jsdom)
    }
  }
}
