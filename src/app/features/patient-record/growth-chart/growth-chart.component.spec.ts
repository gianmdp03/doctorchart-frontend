import { TestBed } from '@angular/core/testing';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { GrowthChartComponent } from './growth-chart.component';
import { growthReferenceFixture, patientGrowthFixture } from '../../../core/testing/growth.fixture';
import { PatientGrowthChart } from '../../../core/models/growth-chart.model';

describe('GrowthChartComponent — all twenty official references', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [GrowthChartComponent] }));
  it('has exactly the twenty PDF definitions with five distinct true percentiles', () => {
    expect(growthReferenceFixture).toHaveLength(20);
    expect(new Set(growthReferenceFixture.map((c) => c.definition.id)).size).toBe(20);
    expect(growthReferenceFixture.map((c) => c.definition.pdfNumber)).toEqual(
      Array.from({ length: 20 }, (_, i) => i + 1),
    );
  });
  for (const reference of growthReferenceFixture) {
    it(`renders PDF #${reference.definition.pdfNumber}: ${reference.definition.id} with correct SVG axes and geometry`, () => {
      const fixture = TestBed.createComponent(GrowthChartComponent);
      fixture.componentRef.setInput('chart', {
        ...reference,
        applicable: true,
        points: [],
        omitted: 0,
      });
      fixture.detectChanges();
      const component = fixture.componentInstance;
      expect(component.axes()).toEqual({ x: reference.definition.x, y: reference.definition.y });
      const paths = fixture.nativeElement.querySelectorAll('path.reference-curve');
      expect(paths.length).toBe(5);
      expect([...paths].map((p: any) => Number(p.dataset.percentile))).toEqual([3, 15, 50, 85, 97]);
      for (const path of paths) expect(path.getAttribute('d')).not.toMatch(/NaN|Infinity/);
      const clip = fixture.nativeElement.querySelector('clipPath');
      expect(clip.id).toBe(component.clipId());
      expect(
        fixture.nativeElement
          .querySelector('.reference-curve')
          .parentElement.getAttribute('clip-path'),
      ).toBe(`url(#${clip.id})`);
      expect(component.xScale()(reference.definition.x.min)).toBe(component.plot.left);
      expect(component.yScale()(reference.definition.y.max)).toBe(component.plot.top);
      const middle = reference.curves[Math.floor(reference.curves.length / 2)];
      const expectedY =
        component.plot.bottom -
        ((middle.values[2] - reference.definition.y.min) /
          (reference.definition.y.max - reference.definition.y.min)) *
          (component.plot.bottom - component.plot.top);
      expect(component.yScale()(middle.values[2])).toBeCloseTo(expectedY, 8);
      expect(fixture.nativeElement.querySelector('canvas')).toBeNull();
      expect(fixture.nativeElement.textContent).not.toMatch(/Adecuado|Normal|[+-][12] DE/);
      expect(fixture.nativeElement.querySelector('.notice').textContent).toContain(
        'curvas oficiales',
      );
      const output = process.env['GROWTH_VISUAL_DIR'];
      if (output) {
        mkdirSync(output, { recursive: true });
        const styles = readFileSync(
          'src/app/features/patient-record/growth-chart/growth-chart.component.css',
          'utf8',
        );
        writeFileSync(
          join(output, reference.definition.id + '.html'),
          `<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${reference.definition.title} · ${reference.definition.sex}</title><style>body{margin:24px;background:#f5f8fc;font-family:Arial,sans-serif}${styles}</style>${fixture.nativeElement.outerHTML}</html>`,
        );
      }
    });
  }
  it('positions real historical points and provides dates, units, precise percentiles and keyboard tooltips', () => {
    const fixture = TestBed.createComponent(GrowthChartComponent);
    const chart = patientGrowthFixture().charts[0];
    fixture.componentRef.setInput('chart', chart);
    fixture.detectChanges();
    const c = fixture.componentInstance;
    const points = fixture.nativeElement.querySelectorAll('.patient-point');
    expect(points.length).toBe(2);
    expect(Number(points[1].getAttribute('cx'))).toBeCloseTo(c.xScale()(chart.points[1].x), 8);
    points[1].dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.point-tooltip').textContent).toContain(
      '15/09/2026',
    );
    expect(fixture.nativeElement.querySelector('.point-tooltip').textContent).toContain('858 días');
    expect(points[1].getAttribute('aria-label')).toContain('kg');
  });
  it('keeps out-of-frame measurements visible in the detail and can expand axes without moving their values', () => {
    const fixture = TestBed.createComponent(GrowthChartComponent);
    const chart = structuredClone(patientGrowthFixture().charts[0]);
    chart.points[1].value = 40;
    fixture.componentRef.setInput('chart', chart);
    fixture.detectChanges();
    const c = fixture.componentInstance;
    expect(c.outsidePDFCount()).toBe(1);
    expect(c.visiblePoints()).toHaveLength(1);
    fixture.nativeElement.querySelector('.frame-control button').click();
    fixture.detectChanges();
    expect(c.visiblePoints()).toHaveLength(2);
    expect(c.axes().y.max).toBe(40);
    expect(chart.points[1].value).toBe(40);
  });
  it('does not join the WHO BMI length/height discontinuity at 730/731 days', () => {
    const fixture = TestBed.createComponent(GrowthChartComponent);
    const reference = growthReferenceFixture[17];
    fixture.componentRef.setInput('chart', {
      ...reference,
      applicable: true,
      points: [],
      omitted: 0,
    } as PatientGrowthChart);
    fixture.detectChanges();
    for (const curve of fixture.componentInstance.curvePaths())
      expect(curve.path.match(/M/g)).toHaveLength(2);
  });
});
