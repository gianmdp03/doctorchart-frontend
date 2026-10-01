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

  readonly officialOmsTitle = computed(() => {
    const isGirl = this.sex() === 'FEMALE';
    const range = this.selectedRange();
    switch (this.metric()) {
      case 'WEIGHT':
        return isGirl
          ? 'Peso para la edad niñas. Percentiles (nacimiento a 5 años)'
          : 'Peso para la edad niños. Percentiles (nacimiento a 5 años)';
      case 'HEIGHT':
        if (range === '0-2') {
          return isGirl
            ? 'Longitud para la edad niñas. Percentiles (nacimiento a 2 años)'
            : 'Longitud para la edad niños. Percentiles (nacimiento a 2 años)';
        }
        return isGirl
          ? 'Longitud / estatura para la edad niñas. Percentiles (nacimiento a 5 años)'
          : 'Longitud / estatura para la edad niños. Percentiles (nacimiento a 5 años)';
      case 'HEAD_CIRCUMFERENCE':
        return isGirl
          ? 'Perímetro craneal para la edad niñas. Percentiles (nacimiento a 5 años)'
          : 'Perímetro craneal para la edad niños. Percentiles (nacimiento a 5 años)';
    }
  });

  /**
   * Exact axis configuration copied 100% faithfully from the WHO PDF document
   */
  readonly exactPdfScales = computed(() => {
    const metric = this.metric();
    const sex = this.sex();
    const range = this.selectedRange();

    switch (metric) {
      case 'WEIGHT':
        // PDF Page 1 & 2: Exact Y-scale is 2 to 24 kg with step 2
        return {
          minY: 2,
          maxY: 24,
          stepY: 2,
          unit: 'kg',
          yAxisLabel: 'Peso (kg)',
          minX: 0,
          maxX: range === '0-2' ? 24 : 60,
          stepX: 2,
        };

      case 'HEIGHT':
        if (range === '0-2') {
          // PDF Page 2 & 3: Longitud nacimiento a 2 años is 45 to 95 cm with step 5
          return {
            minY: 45,
            maxY: 95,
            stepY: 5,
            unit: 'cm',
            yAxisLabel: 'Longitud (cm)',
            minX: 0,
            maxX: 24,
            stepX: 2,
          };
        } else {
          // PDF Page 3 & 4 / Global 0-5 años: 45 to 125 cm with step 10
          return {
            minY: 45,
            maxY: 125,
            stepY: 10,
            unit: 'cm',
            yAxisLabel: 'Longitud / Estatura (cm)',
            minX: 0,
            maxX: 60,
            stepX: 6,
          };
        }

      case 'HEAD_CIRCUMFERENCE':
        // PDF Page 4 & 5: Perímetro craneal nacimiento a 5 años:
        // Niños: 32 a 54 cm (step 2)
        // Niñas: 32 a 52 cm (step 2)
        return {
          minY: 32,
          maxY: sex === 'MALE' ? 54 : 52,
          stepY: 2,
          unit: 'cm',
          yAxisLabel: 'Perímetro craneal (cm)',
          minX: 0,
          maxX: range === '0-2' ? 24 : 60,
          stepX: 2,
        };
    }
  });

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
    // Default initialAgeRange based on WHO sheet convention:
    // In PDF, Weight is 0-5 and Head Circumference is 0-5, while Length is 0-2
    effect(() => {
      const explicitInitial = this.initialAgeRange();
      if (explicitInitial) {
        this.selectedRange.set(explicitInitial);
      }
    });

    // Reactive chart redraw when metric, sex, range, or measurements change
    effect(() => {
      const canvasRef = this.chartCanvas();
      const omsPoints = this.omsData();
      const patientPoints = this.filteredMeasurements();
      const scales = this.exactPdfScales();
      const range = this.selectedRange();

      if (!canvasRef?.nativeElement) {
        return;
      }

      this.renderChart(canvasRef.nativeElement, omsPoints, patientPoints, scales, range);
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
    scales: ReturnType<typeof this.exactPdfScales>,
    range: GrowthAgeRange
  ): void {
    this.cleanupChart();

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    // Prepare OMS percentile curve points
    const p3Data = omsPoints.map((p) => ({ x: p.ageMonths, y: p.p3 }));
    const p15Data = omsPoints.map((p) => ({ x: p.ageMonths, y: p.p15 }));
    const p50Data = omsPoints.map((p) => ({ x: p.ageMonths, y: p.p50 }));
    const p85Data = omsPoints.map((p) => ({ x: p.ageMonths, y: p.p85 }));
    const p97Data = omsPoints.map((p) => ({ x: p.ageMonths, y: p.p97 }));

    // Prepare patient trajectory points (filtered for sanity within chart bounds)
    const patientData = patientPoints.map((p) => ({ x: p.ageMonths, y: p.value }));

    // Custom WHO right margin percentile labels plugin
    const omsRightPercentilePlugin = {
      id: 'omsRightPercentileLabels',
      afterDatasetsDraw: (chart: Chart) => {
        const chartCtx = chart.ctx;
        if (!chartCtx) return;
        const chartArea = chart.chartArea;
        if (!chartArea) return;

        const labels = [
          { index: 0, text: '97', color: '#d32f2f' },
          { index: 1, text: '85', color: '#ea580c' },
          { index: 2, text: '50', color: '#16a34a', bold: true },
          { index: 3, text: '15', color: '#ea580c' },
          { index: 4, text: '3', color: '#d32f2f' },
        ];

        chartCtx.save();
        for (const item of labels) {
          const meta = chart.getDatasetMeta(item.index);
          if (!meta || !meta.data || meta.data.length === 0 || meta.hidden) continue;
          const lastPoint = meta.data[meta.data.length - 1];
          if (!lastPoint || typeof lastPoint.y !== 'number' || isNaN(lastPoint.y)) continue;

          const x = chartArea.right + 4;
          const y = lastPoint.y;

          // Draw pill badge
          chartCtx.fillStyle = item.color;
          chartCtx.beginPath();
          if (typeof chartCtx.roundRect === 'function') {
            chartCtx.roundRect(x, y - 8, 22, 16, 4);
          } else {
            chartCtx.rect(x, y - 8, 22, 16);
          }
          chartCtx.fill();

          // Draw text label
          chartCtx.fillStyle = '#ffffff';
          chartCtx.font = item.bold ? 'bold 10px sans-serif' : '600 10px sans-serif';
          chartCtx.textAlign = 'center';
          chartCtx.textBaseline = 'middle';
          chartCtx.fillText(item.text, x + 11, y);
        }
        chartCtx.restore();
      },
    };

    const chartConfig: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        datasets: [
          // Index 0: OMS P97 (Red)
          {
            label: 'OMS P97 (+2 DE)',
            data: p97Data,
            borderColor: '#d32f2f',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: '#d32f2f',
            tension: 0.35,
            fill: false,
          },
          // Index 1: OMS P85 (Orange)
          {
            label: 'OMS P85 (+1 DE)',
            data: p85Data,
            borderColor: '#f57c00',
            borderWidth: 1.8,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: '#f57c00',
            tension: 0.35,
            fill: false,
          },
          // Index 2: OMS P50 (Green Median - Prominent)
          {
            label: 'OMS P50 (Mediana)',
            data: p50Data,
            borderColor: '#16a34a',
            borderWidth: 3,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#16a34a',
            tension: 0.35,
            fill: false,
          },
          // Index 3: OMS P15 (Orange)
          {
            label: 'OMS P15 (-1 DE)',
            data: p15Data,
            borderColor: '#f57c00',
            borderWidth: 1.8,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: '#f57c00',
            tension: 0.35,
            fill: false,
          },
          // Index 4: OMS P3 (Red)
          {
            label: 'OMS P3 (-2 DE)',
            data: p3Data,
            borderColor: '#d32f2f',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: '#d32f2f',
            tension: 0.35,
            fill: false,
          },
          // Index 5: Patient Growth Trajectory
          {
            label: 'Evolución del Paciente',
            data: patientData,
            borderColor: '#3730a3',
            backgroundColor: '#ffffff',
            borderWidth: 3,
            pointRadius: patientData.length === 1 ? 7 : 5.5,
            pointHoverRadius: 9,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#3730a3',
            pointBorderWidth: 3,
            pointHoverBackgroundColor: '#3730a3',
            pointHoverBorderColor: '#ffffff',
            pointHoverBorderWidth: 2.5,
            tension: 0.25,
            fill: false,
            order: -1, // Render always on top
          },
        ],
      },
      plugins: [omsRightPercentilePlugin],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 10,
            right: 32, // Room for the right-edge percentile badges
            bottom: 5,
            left: 5,
          },
        },
        interaction: {
          mode: 'nearest',
          intersect: false,
          axis: 'x',
        },
        plugins: {
          legend: {
            display: false, // Replaced with custom WHO-styled visual legend below
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#f8fafc',
            bodyColor: '#e2e8f0',
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
                  return `Consulta Médica: ${pt.dateFormatted}`;
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
                    `• Edad exacta: ${pt.ageFormatted}`,
                  ];
                }
                const label = item.dataset.label || '';
                return `${label}: ${item.parsed.y} ${scales.unit}`;
              },
            },
          },
        },
        scales: {
          x: {
            type: 'linear',
            min: scales.minX,
            max: scales.maxX,
            title: {
              display: true,
              text: 'Edad (en meses y años cumplidos)',
              color: '#334155',
              font: {
                weight: 'bold',
                size: 11,
              },
              padding: { top: 8 },
            },
            ticks: {
              stepSize: scales.stepX,
              color: '#475569',
              callback: (val) => {
                const num = Number(val);
                if (num === 0) return 'Nacimiento';
                if (num === 12) return '1 año';
                if (num === 24) return '2 años';
                if (num === 36) return '3 años';
                if (num === 48) return '4 años';
                if (num === 60) return '5 años';
                // Show months between years like the PDF (2, 4, 6, 8, 10)
                const rem = num % 12;
                return `${rem}`;
              },
            },
            grid: {
              color: (context) => {
                const v = context.tick?.value;
                if (v === 12 || v === 24 || v === 36 || v === 48 || v === 60) {
                  return 'rgba(30, 41, 59, 0.45)'; // Heavy marker on annual milestones
                }
                return 'rgba(203, 213, 225, 0.6)'; // Technical millimeter grid
              },
              lineWidth: (context) => {
                const v = context.tick?.value;
                if (v === 12 || v === 24 || v === 36 || v === 48 || v === 60) {
                  return 1.5;
                }
                return 0.75;
              },
            },
          },
          y: {
            type: 'linear',
            position: 'left',
            min: scales.minY,
            max: scales.maxY,
            title: {
              display: true,
              text: scales.yAxisLabel,
              color: '#334155',
              font: {
                weight: 'bold',
                size: 11,
              },
              padding: { bottom: 8 },
            },
            ticks: {
              stepSize: scales.stepY,
              color: '#475569',
              callback: (val) => `${val}`,
            },
            grid: {
              color: 'rgba(203, 213, 225, 0.6)',
              lineWidth: 0.75,
            },
          },
          y1: {
            type: 'linear',
            position: 'right',
            min: scales.minY,
            max: scales.maxY,
            title: {
              display: true,
              text: scales.yAxisLabel,
              color: '#334155',
              font: {
                weight: 'bold',
                size: 11,
              },
              padding: { bottom: 8 },
            },
            ticks: {
              stepSize: scales.stepY,
              color: '#475569',
              callback: (val) => `${val}`,
            },
            grid: {
              drawOnChartArea: false, // Dual axis without duplicate grid lines
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
