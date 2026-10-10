import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import {
  GrowthAxis,
  GrowthCurvePoint,
  PatientGrowthChart,
  PatientGrowthPoint,
} from '../../../core/models/growth-chart.model';

const COLORS = ['#dc2626', '#ea580c', '#16a34a', '#ea580c', '#dc2626'];
// Both markers occupy the same 9 × 9 SVG-unit frame as the previous dots.
const HEART =
  'M0 4.5 C-1 3.5 -4.5 1 -4.5 -1.5 C-4.5 -3.157 -3.157 -4.5 -1.5 -4.5 C-0.75 -4.5 0 -3.75 0 -2.5 C0 -3.75 0.75 -4.5 1.5 -4.5 C3.157 -4.5 4.5 -3.157 4.5 -1.5 C4.5 1 1 3.5 0 4.5 Z';
const STAR =
  'M0 -4.5 L1.39 -1.37 L4.5 -1.06 L2.25 1.29 L2.78 4.5 L0 2.88 L-2.78 4.5 L-2.25 1.29 L-4.5 -1.06 L-1.39 -1.37 Z';

/** D3 computes geometry; Angular owns the SVG DOM, accessibility and state. */
@Component({
  selector: 'app-growth-chart',
  imports: [DecimalPipe],
  templateUrl: './growth-chart.component.html',
  styleUrl: './growth-chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrowthChartComponent {
  readonly chart = input.required<PatientGrowthChart>();
  readonly expandedFrame = signal(false);
  readonly focusedPoint = signal<PatientGrowthPoint | null>(null);
  readonly clipId = computed(() => `oms-plot-${this.definition().id}`);
  readonly plot = { left: 68, right: 976, top: 24, bottom: 420 };
  readonly definition = computed(() => this.chart().definition);
  readonly latestMeasurement = computed(() => this.chart().points.at(-1) ?? null);
  readonly sexLabel = computed(() => (this.definition().sex === 'FEMALE' ? 'Niñas' : 'Niños'));
  readonly markerPath = computed(() => (this.definition().sex === 'FEMALE' ? HEART : STAR));
  readonly markerLabel = computed(() =>
    this.definition().sex === 'FEMALE' ? 'corazones rosas' : 'estrellas azules',
  );
  readonly rangeLabel = computed(() => {
    const d = this.definition();
    return `${d.ageMinMonths === 0 ? 'Nacimiento' : `${d.ageMinMonths / 12} años`} a ${d.ageMaxMonths / 12} años`;
  });
  readonly evaluatedCount = computed(
    () => this.chart().points.filter((p) => p.evaluation !== null).length,
  );
  readonly outsidePDFCount = computed(
    () =>
      this.chart().points.filter((p) => !this.inFrame(p, this.definition().x, this.definition().y))
        .length,
  );
  readonly axes = computed(() => {
    const d = this.definition();
    if (!this.expandedFrame() || !this.chart().points.length) return { x: d.x, y: d.y };
    const bounds = this.chart().points.reduce(
      (b, p) => ({
        minX: Math.min(b.minX, p.x),
        maxX: Math.max(b.maxX, p.x),
        minY: Math.min(b.minY, p.value),
        maxY: Math.max(b.maxY, p.value),
      }),
      { minX: d.x.min, maxX: d.x.max, minY: d.y.min, maxY: d.y.max },
    );
    return {
      x: {
        ...d.x,
        min: Math.min(d.x.min, Math.floor(bounds.minX / d.x.step) * d.x.step),
        max: Math.max(d.x.max, Math.ceil(bounds.maxX / d.x.step) * d.x.step),
      },
      y: {
        ...d.y,
        min: Math.min(d.y.min, Math.floor(bounds.minY / d.y.step) * d.y.step),
        max: Math.max(d.y.max, Math.ceil(bounds.maxY / d.y.step) * d.y.step),
      },
    };
  });
  readonly xScale = computed(() =>
    scaleLinear()
      .domain([this.axes().x.min, this.axes().x.max])
      .range([this.plot.left, this.plot.right]),
  );
  readonly yScale = computed(() =>
    scaleLinear()
      .domain([this.axes().y.min, this.axes().y.max])
      .range([this.plot.bottom, this.plot.top]),
  );
  readonly xGrid = computed(() => this.ticks(this.axes().x, true));
  readonly yGrid = computed(() => this.ticks(this.axes().y, true));
  readonly xLabels = computed(() => this.ticks(this.axes().x, false));
  readonly yLabels = computed(() => this.ticks(this.axes().y, false));
  readonly years = computed(() =>
    this.definition().x.variable === 'AGE' ? this.xGrid().filter((t) => t % 12 === 0) : [],
  );
  readonly visiblePoints = computed(() =>
    this.chart().points.filter((p) => this.inFrame(p, this.axes().x, this.axes().y)),
  );
  readonly hasBMITransition = computed(
    () =>
      this.definition().dataset.startsWith('bfa06') &&
      this.chart().curves.some((p) => p.x < 24) &&
      this.chart().curves.some((p) => p.x > 24) &&
      this.axes().x.min < 24 &&
      this.axes().x.max > 24,
  );
  readonly curvePaths = computed(() => {
    const points = this.splitBMITransition(this.chart().curves);
    return this.definition().percentiles.map((percentile, i) => ({
      percentile,
      color: COLORS[i],
      path:
        line<GrowthCurvePoint | null>()
          .defined((p) => p !== null)
          .x((p) => this.xScale()(p!.x))
          .y((p) => this.yScale()(p!.values[i]))(points) ?? '',
      end: this.chart()
        .curves.filter((p) => p.x <= this.axes().x.max && p.x >= this.axes().x.min)
        .at(-1)?.values[i],
    }));
  });
  readonly patientPath = computed(
    () =>
      line<PatientGrowthPoint | null>()
        .defined((p) => p !== null && this.inFrame(p, this.axes().x, this.axes().y))
        .x((p) => this.xScale()(p!.x))
        .y((p) => this.yScale()(p!.value))(this.splitBMITransition(this.chart().points)) ?? '',
  );
  readonly xTitle = computed(() =>
    this.definition().x.variable === 'AGE'
      ? 'Edad (meses y años cumplidos)'
      : `${this.definition().x.variable === 'LENGTH' ? 'Longitud' : 'Estatura'} (cm)`,
  );
  readonly yTitle = computed(
    () =>
      ({
        WEIGHT: 'Peso',
        LENGTH: 'Longitud',
        HEIGHT: 'Estatura',
        HEAD_CIRCUMFERENCE: 'Perímetro cefálico',
        BMI: 'IMC',
        AGE: 'Edad',
      })[this.definition().y.variable] + ` (${this.definition().y.unit})`,
  );
  constructor() {
    effect(() => {
      this.chart();
      this.expandedFrame.set(false);
      this.focusedPoint.set(null);
    });
  }
  private ticks(axis: GrowthAxis, minor: boolean): number[] {
    const step = minor ? axis.minorStep : axis.step;
    const first = Math.ceil(axis.min / step) * step;
    const count = Math.floor((axis.max - first) / step) + 1;
    // A severely erroneous measurement must not create millions of DOM nodes.
    const stride = Math.max(1, Math.ceil(count / 240));
    return Array.from({ length: Math.ceil(count / stride) }, (_, i) =>
      Number((first + i * step * stride).toFixed(6)),
    );
  }
  private splitBMITransition<T extends { x: number }>(points: T[]): (T | null)[] {
    if (!this.hasBMITransition()) return points;
    const segments: (T | null)[] = [];
    let previous: T | undefined;
    for (const point of points) {
      if (previous && previous.x < 24 && point.x >= 24) segments.push(null);
      segments.push(point);
      previous = point;
    }
    return segments;
  }
  isMajorTick(value: number, axis: GrowthAxis): boolean {
    return Math.abs(value / axis.step - Math.round(value / axis.step)) < 1e-6;
  }
  private inFrame(p: PatientGrowthPoint, x: GrowthAxis, y: GrowthAxis): boolean {
    return (
      Number.isFinite(p.x) &&
      Number.isFinite(p.value) &&
      p.x >= x.min &&
      p.x <= x.max &&
      p.value >= y.min &&
      p.value <= y.max
    );
  }
  monthLabel(value: number): string {
    return value % 12 === 0 ? '' : String(value % 12);
  }
  formatDate(value: string): string {
    return value.split('-').reverse().join('/');
  }
  percentileLabel(point: PatientGrowthPoint): string {
    const e = point.evaluation;
    if (!e) return 'Sin evaluación';
    if (e.percentileLimit) return `P${e.percentileLimit}`;
    return `P${e.percentile!.toFixed(2)}`;
  }
  tooltip(point: PatientGrowthPoint): string {
    return `${this.formatDate(point.date)} · ${point.ageFormatted} (${point.ageDays} días) · ${point.value.toFixed(3)} ${this.definition().y.unit} · ${this.percentileLabel(point)}${point.evaluation ? ` · Z ${point.evaluation.zScore.toFixed(3)}` : ''}${point.adjustmentCm ? ` · Conversión ${point.adjustmentCm > 0 ? '+' : ''}${point.adjustmentCm} cm` : ''}${point.note ? ` · ${point.note}` : ''}`;
  }
}
