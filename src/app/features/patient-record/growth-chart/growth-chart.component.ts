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

/**
 * Creates an offscreen Canvas representing a pediatric heart marker for female consultations
 */
function createHeartPointCanvas(fillColor: string, strokeColor: string): HTMLCanvasElement | 'circle' {
  if (typeof document === 'undefined') return 'circle';
  try {
    const size = 48;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'circle';

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(24, 40);
    ctx.bezierCurveTo(21, 37, 6, 26, 6, 15);
    ctx.bezierCurveTo(6, 7.5, 12, 3, 19, 3);
    ctx.bezierCurveTo(22, 3, 24, 5.5, 24, 8);
    ctx.bezierCurveTo(24, 5.5, 26, 3, 29, 3);
    ctx.bezierCurveTo(36, 3, 42, 7.5, 42, 15);
    ctx.bezierCurveTo(42, 26, 27, 37, 24, 40);
    ctx.closePath();

    ctx.lineWidth = 4;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.restore();

    return canvas;
  } catch {
    return 'circle';
  }
}

/**
 * Creates an offscreen Canvas representing a pediatric star marker for male consultations
 */
function createStarPointCanvas(fillColor: string, strokeColor: string): HTMLCanvasElement | 'star' {
  if (typeof document === 'undefined') return 'star';
  try {
    const size = 48;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'star';

    ctx.save();
    ctx.beginPath();
    const spikes = 5;
    const outerRadius = 18;
    const innerRadius = 8;
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;

    ctx.moveTo(24, 24 - outerRadius);
    for (let i = 0; i < spikes; i++) {
      const x = 24 + Math.cos(rot) * outerRadius;
      const y = 24 + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      const inX = 24 + Math.cos(rot) * innerRadius;
      const inY = 24 + Math.sin(rot) * innerRadius;
      ctx.lineTo(inX, inY);
      rot += step;
    }
    ctx.lineTo(24, 24 - outerRadius);
    ctx.closePath();

    ctx.lineWidth = 4;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.restore();

    return canvas;
  } catch {
    return 'star';
  }
}

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

  // Internal state: locked to 0-24 months
  readonly selectedRange = signal<GrowthAgeRange>('0-2');

  // View child for canvas
  readonly chartCanvas = viewChild<ElementRef<HTMLCanvasElement>>('chartCanvas');

  private chartInstance: Chart | null = null;

  // Derived configurations
  readonly metricConfig = computed(() => OMS_METRIC_CONFIGS[this.metric()]);

  // Locked permanently to 24 months (0 to 2 years) per clinical requirements
  readonly maxMonths = computed(() => 24);

  readonly sexLabel = computed(() => (this.sex() === 'MALE' ? 'Niño (Varón)' : 'Niña (Mujer)'));

  // Main banner title as requested: "Curvas antropométricas desde el nacimiento hasta los 24 meses"
  readonly officialOmsTitle = computed(
    () => 'Curvas antropométricas desde el nacimiento hasta los 24 meses'
  );

  /**
   * Exact axis configuration for 0 to 24 months faithfully calibrated from the WHO standard
   */
  readonly exactPdfScales = computed(() => {
    const metric = this.metric();
    const sex = this.sex();

    switch (metric) {
      case 'WEIGHT':
        // WHO 0 to 24 months: 2 to 18 kg (step 2)
        return {
          minY: 2,
          maxY: 18,
          stepY: 2,
          unit: 'kg',
          yAxisLabel: 'Peso (kg)',
          minX: 0,
          maxX: 24,
          stepX: 2,
        };

      case 'HEIGHT':
        // WHO 0 to 24 months: Longitud 45 to 95 cm (step 5)
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

      case 'HEAD_CIRCUMFERENCE':
        // WHO 0 to 24 months: Perímetro craneal 32 to 54 cm (step 2)
        return {
          minY: 32,
          maxY: sex === 'MALE' ? 54 : 52,
          stepY: 2,
          unit: 'cm',
          yAxisLabel: 'Perímetro craneal (cm)',
          minX: 0,
          maxX: 24,
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
    // Reactive chart redraw when metric, sex, or measurements change
    effect(() => {
      const canvasRef = this.chartCanvas();
      const omsPoints = this.omsData();
      const patientPoints = this.filteredMeasurements();
      const scales = this.exactPdfScales();

      if (!canvasRef?.nativeElement) {
        return;
      }

      this.renderChart(canvasRef.nativeElement, omsPoints, patientPoints, scales);
    });

    this.destroyRef.onDestroy(() => {
      this.cleanupChart();
    });
  }

  // Retained for backward-compatibility
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
    scales: ReturnType<typeof this.exactPdfScales>
  ): void {
    this.cleanupChart();

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    // Prepare OMS percentile curve points (0 to 24 months)
    const p3Data = omsPoints.map((p) => ({ x: p.ageMonths, y: p.p3 }));
    const p15Data = omsPoints.map((p) => ({ x: p.ageMonths, y: p.p15 }));
    const p50Data = omsPoints.map((p) => ({ x: p.ageMonths, y: p.p50 }));
    const p85Data = omsPoints.map((p) => ({ x: p.ageMonths, y: p.p85 }));
    const p97Data = omsPoints.map((p) => ({ x: p.ageMonths, y: p.p97 }));

    // Prepare patient trajectory points
    const patientData = patientPoints.map((p) => ({ x: p.ageMonths, y: p.value }));

    // Configure gender-specific point marker: Star for boys, Heart for girls
    const isMale = this.sex() === 'MALE';
    const patientPointStyle = isMale
      ? createStarPointCanvas('#2563eb', '#ffffff')
      : createHeartPointCanvas('#db2777', '#ffffff');

    // Custom WHO right margin percentile labels plugin (dedicated lane, never covers right Y axis measures)
    const omsRightPercentilePlugin = {
      id: 'omsRightPercentileLabels',
      afterDatasetsDraw: (chart: Chart) => {
        const chartCtx = chart.ctx;
        if (!chartCtx) return;
        const chartArea = chart.chartArea;
        if (!chartArea) return;

        // Solid crisp outer box border around chart area
        chartCtx.save();
        chartCtx.strokeStyle = '#000000';
        chartCtx.lineWidth = 1.5;
        chartCtx.strokeRect(chartArea.left, chartArea.top, chartArea.width, chartArea.height);

        const labels = [
          { index: 0, text: '97', color: '#d32f2f' },
          { index: 1, text: '85', color: '#ea580c' },
          { index: 2, text: '50', color: '#16a34a', bold: true },
          { index: 3, text: '15', color: '#ea580c' },
          { index: 4, text: '3', color: '#d32f2f' },
        ];

        const pointsToDraw: { text: string; color: string; bold?: boolean; y: number }[] = [];
        for (const item of labels) {
          const meta = chart.getDatasetMeta(item.index);
          if (!meta || !meta.data || meta.data.length === 0 || meta.hidden) continue;
          const lastPoint = meta.data[meta.data.length - 1];
          if (!lastPoint || typeof lastPoint.y !== 'number' || isNaN(lastPoint.y)) continue;
          pointsToDraw.push({ ...item, y: lastPoint.y });
        }

        // Sort by vertical position (top to bottom)
        pointsToDraw.sort((a, b) => a.y - b.y);

        // Collision avoidance: ensure at least 11px vertical separation
        for (let i = 1; i < pointsToDraw.length; i++) {
          if (pointsToDraw[i].y - pointsToDraw[i - 1].y < 11) {
            pointsToDraw[i].y = pointsToDraw[i - 1].y + 11;
          }
        }

        // Dedicated percentile lane at [chartArea.right + 2 ... chartArea.right + 20].
        // Right Y-axis tick values start at chartArea.right + 24 (padding: 24), so there is 0 overlap!
        const textX = chartArea.right + 11;
        chartCtx.textAlign = 'center';
        chartCtx.textBaseline = 'middle';

        for (const pt of pointsToDraw) {
          chartCtx.font = pt.bold ? 'bold 11px sans-serif' : '700 11px sans-serif';
          // Clean white outline around number for razor-sharp legibility
          chartCtx.strokeStyle = '#ffffff';
          chartCtx.lineWidth = 3;
          chartCtx.strokeText(pt.text, textX, pt.y);

          // Bare colored percentile number matching WHO curve
          chartCtx.fillStyle = pt.color;
          chartCtx.fillText(pt.text, textX, pt.y);
        }

        chartCtx.restore();
      },
    };

    // Custom WHO bottom X-axis plugin (0 to 24 months: Meses row, Años row, and centered title)
    const omsBottomAxisPlugin = {
      id: 'omsBottomAxis',
      afterDraw: (chart: Chart) => {
        const chartCtx = chart.ctx;
        if (!chartCtx) return;
        const chartArea = chart.chartArea;
        if (!chartArea) return;
        const xScale = chart.scales['x'];
        if (!xScale) return;

        chartCtx.save();

        const yRowMeses = chartArea.bottom + 12;
        const yRowAnos = chartArea.bottom + 23;
        const yTitle = chartArea.bottom + 36;

        // Row label headers on the left
        chartCtx.font = 'bold 9.5px sans-serif';
        chartCtx.fillStyle = '#000000';
        chartCtx.textAlign = 'right';
        chartCtx.textBaseline = 'middle';
        chartCtx.fillText('Meses', chartArea.left - 6, yRowMeses);
        chartCtx.fillText('Años', chartArea.left - 6, yRowAnos);

        chartCtx.textAlign = 'center';

        // Exact 0 to 24 months intervals
        for (let m = 0; m <= 24; m += 2) {
          const xPos = xScale.getPixelForValue(m);
          if (xPos < chartArea.left - 2 || xPos > chartArea.right + 2) continue;

          if (m === 0) {
            chartCtx.font = 'bold 9.5px sans-serif';
            chartCtx.fillText('0', xPos, yRowAnos);
          } else if (m === 12) {
            chartCtx.font = 'bold 10.5px sans-serif';
            chartCtx.fillText('1', xPos, yRowAnos);
          } else if (m === 24) {
            chartCtx.font = 'bold 10.5px sans-serif';
            chartCtx.fillText('2', xPos, yRowAnos);
          } else {
            chartCtx.font = '600 9px sans-serif';
            chartCtx.fillText(`${m % 12}`, xPos, yRowMeses);
          }
        }

        // Centered title below rows
        chartCtx.font = 'bold 11px sans-serif';
        chartCtx.fillStyle = '#000000';
        chartCtx.fillText('Edad (en meses y años cumplidos)', (chartArea.left + chartArea.right) / 2, yTitle);

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
            pointHoverRadius: 0,
            pointHitRadius: 0,
            tension: 0.35,
            fill: false,
          },
          // Index 1: OMS P85 (Orange)
          {
            label: 'OMS P85 (+1 DE)',
            data: p85Data,
            borderColor: '#ea580c',
            borderWidth: 1.8,
            pointRadius: 0,
            pointHoverRadius: 0,
            pointHitRadius: 0,
            tension: 0.35,
            fill: false,
          },
          // Index 2: OMS P50 (Green Median - Prominent)
          {
            label: 'OMS P50 (Mediana)',
            data: p50Data,
            borderColor: '#16a34a',
            borderWidth: 2.5,
            pointRadius: 0,
            pointHoverRadius: 0,
            pointHitRadius: 0,
            tension: 0.35,
            fill: false,
          },
          // Index 3: OMS P15 (Orange)
          {
            label: 'OMS P15 (-1 DE)',
            data: p15Data,
            borderColor: '#ea580c',
            borderWidth: 1.8,
            pointRadius: 0,
            pointHoverRadius: 0,
            pointHitRadius: 0,
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
            pointHoverRadius: 0,
            pointHitRadius: 0,
            tension: 0.35,
            fill: false,
          },
          // Index 5: Patient Growth Trajectory (Star for boys, Heart for girls)
          {
            label: 'Consulta del Paciente',
            data: patientData,
            borderColor: isMale ? '#2563eb' : '#db2777',
            backgroundColor: isMale ? '#2563eb' : '#db2777',
            borderWidth: 2.5,
            pointStyle: patientPointStyle,
            pointRadius: 9,
            pointHoverRadius: 13,
            pointHitRadius: 18,
            tension: 0.25,
            fill: false,
            order: -1, // Render always on top
          },
        ],
      },
      plugins: [omsRightPercentilePlugin, omsBottomAxisPlugin],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 14,
            right: 54, // Clear space for percentile lane and right Y-axis tick values
            bottom: 44, // Clear space for Meses, Años, and centered title
            left: 10,
          },
        },
        interaction: {
          mode: 'nearest',
          intersect: true,
        },
        plugins: {
          legend: {
            display: false, // Custom WHO-styled visual legend below canvas
          },
          tooltip: {
            filter: (tooltipItem: TooltipItem<'line'>) => tooltipItem.datasetIndex === 5,
            backgroundColor: '#0f172a',
            titleColor: '#f8fafc',
            bodyColor: '#e2e8f0',
            padding: 12,
            cornerRadius: 8,
            boxPadding: 4,
            displayColors: false,
            callbacks: {
              title: (items: TooltipItem<'line'>[]) => {
                const item = items[0];
                if (!item || !patientPoints[item.dataIndex]) return '';
                const pt = patientPoints[item.dataIndex];
                return `Fecha de consulta: ${pt.dateFormatted}`;
              },
              label: (item: TooltipItem<'line'>) => {
                const pt = patientPoints[item.dataIndex];
                if (!pt) return '';
                const metricName =
                  this.metric() === 'WEIGHT'
                    ? 'Peso'
                    : this.metric() === 'HEIGHT'
                    ? 'Longitud'
                    : 'Perímetro craneal';

                const lines = [
                  `Edad: ${pt.ageFormatted}`,
                  `${metricName}: ${pt.value} ${pt.unit}`,
                ];
                if (pt.approximatePercentile) {
                  lines.push(`Percentil OMS: ${pt.approximatePercentile}`);
                }
                return lines;
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
              display: false, // Handled cleanly by omsBottomAxisPlugin
            },
            ticks: {
              display: false, // Handled cleanly by omsBottomAxisPlugin
              stepSize: scales.stepX,
            },
            grid: {
              display: true,
              color: (context) => {
                const v = context.tick?.value;
                if (typeof v === 'number' && v % 12 === 0) {
                  return '#000000'; // Major annual milestone vertical lines
                }
                return '#475569'; // Crisp fine technical grid
              },
              lineWidth: (context) => {
                const v = context.tick?.value;
                if (typeof v === 'number' && v % 12 === 0) {
                  return 1.25;
                }
                return 0.75;
              },
              drawTicks: true,
              tickLength: 5,
              tickColor: '#000000',
            },
            border: {
              display: true,
              color: '#000000',
              width: 1.5,
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
              color: '#000000',
              font: {
                weight: 'bold',
                size: 11,
              },
              padding: { bottom: 6 },
            },
            ticks: {
              stepSize: scales.stepY,
              color: '#000000',
              font: {
                size: 10.5,
                weight: 'bold',
              },
              padding: 4,
              callback: (val) => `${val}`,
            },
            grid: {
              color: '#475569',
              lineWidth: 0.75,
              drawTicks: true,
              tickLength: 5,
              tickColor: '#000000',
            },
            border: {
              display: true,
              color: '#000000',
              width: 1.5,
            },
          },
          y1: {
            type: 'linear',
            position: 'right',
            min: scales.minY,
            max: scales.maxY,
            title: {
              display: false,
            },
            ticks: {
              stepSize: scales.stepY,
              color: '#000000',
              font: {
                size: 10.5,
                weight: 'bold',
              },
              padding: 24, // Clear 24px lane for percentile numbers 97, 85, 50, 15, 3
              callback: (val) => `${val}`,
            },
            grid: {
              drawOnChartArea: false, // Dual axis without duplicate grid lines
              drawTicks: true,
              tickLength: 5,
              tickColor: '#000000',
            },
            border: {
              display: true,
              color: '#000000',
              width: 1.5,
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
