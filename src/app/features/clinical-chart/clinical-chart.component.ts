import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  effect,
  inject,
  input,
  untracked,
  viewChild,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Chart,
  ChartConfiguration,
  registerables,
} from 'chart.js';
import { ClinicalChartDataset } from '../../core/models/clinical-chart.model';

Chart.register(...registerables);

@Component({
  selector: 'app-clinical-chart',
  imports: [CommonModule],
  templateUrl: './clinical-chart.component.html',
  styleUrl: './clinical-chart.component.css',
})
export class ClinicalChartComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly labels = input<string[]>([]);
  readonly datasets = input<ClinicalChartDataset[]>([]);
  readonly height = input<number>(240);
  readonly chartType = input<'line' | 'bar'>('line');

  readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('chartCanvas');
  private chartInstance: Chart | null = null;

  constructor() {
    effect(() => {
      this.labels();
      this.datasets();
      const canvas = this.canvasRef();

      if (isPlatformBrowser(this.platformId) && canvas?.nativeElement) {
        untracked(() => {
          this.renderChart();
        });
      }
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.renderChart();
    }
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  private renderChart(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;

    this.destroyChart();

    const config: ChartConfiguration = {
      type: this.chartType(),
      data: {
        labels: this.labels(),
        datasets: this.datasets().map((ds) => ({
          label: ds.label,
          data: ds.data,
          borderColor: ds.borderColor || '#2563eb',
          backgroundColor: ds.backgroundColor || 'rgba(37, 99, 235, 0.1)',
          fill: ds.fill ?? false,
          tension: ds.tension ?? 0.25,
          borderWidth: ds.borderWidth ?? 2.5,
          pointBackgroundColor: ds.borderColor || '#2563eb',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 1.5,
          pointRadius: ds.pointRadius ?? 4,
          pointHoverRadius: ds.pointHoverRadius ?? 6,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: this.datasets().length > 1,
            position: 'top',
            labels: {
              boxWidth: 12,
              font: {
                size: 11,
                family: 'inherit',
                weight: 'bold',
              },
              color: '#475569',
            },
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleFont: { size: 12, weight: 'bold' },
            bodyFont: { size: 12 },
            padding: 10,
            cornerRadius: 8,
          },
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(226, 232, 240, 0.6)',
            },
            ticks: {
              color: '#64748b',
              font: { size: 11 },
            },
          },
          y: {
            grid: {
              color: 'rgba(226, 232, 240, 0.6)',
            },
            ticks: {
              color: '#64748b',
              font: { size: 11 },
            },
          },
        },
      },
    };

    this.chartInstance = new Chart(canvas, config);
  }

  private destroyChart(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }
}
