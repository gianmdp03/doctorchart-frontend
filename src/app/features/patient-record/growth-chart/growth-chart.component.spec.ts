import { TestBed } from '@angular/core/testing';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { GrowthChartComponent } from './growth-chart.component';
import { growthReferenceFixture, patientGrowthFixture } from '../../../core/testing/growth.fixture';
import { PatientGrowthChart } from '../../../core/models/growth-chart.model';
import { ClinicalEncounterList } from '../../../core/models/clinical-encounter.model';

function saveVisual(element: HTMLElement, id: string): void {
  const output = process.env['GROWTH_VISUAL_DIR'];
  if (!output) return;
  mkdirSync(output, { recursive: true });
  const styles = readFileSync(
    'src/app/features/patient-record/growth-chart/growth-chart.component.css',
    'utf8',
  );
  writeFileSync(
    join(output, id + '.html'),
    `<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Curvas OMS · verificación visual</title><style>body{margin:24px;background:#f5f8fc;font-family:Arial,sans-serif}${styles}</style>${element.outerHTML}</html>`,
  );
}

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
      saveVisual(fixture.nativeElement, reference.definition.id);
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
    expect(points[1].getAttribute('transform')).toBe(
      `translate(${c.xScale()(chart.points[1].x)} ${c.yScale()(chart.points[1].value)})`,
    );
    points[1].dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.point-tooltip').textContent).toContain(
      '15/09/2026',
    );
    expect(fixture.nativeElement.querySelector('.point-tooltip').textContent).toContain('858 días');
    expect(points[1].getAttribute('aria-label')).toContain('kg');
  });
  for (const sex of ['girls', 'boys']) {
    it(`shows the matching consultation on ${sex} marker hover without clicking and dismisses with Escape`, () => {
      const fixture = TestBed.createComponent(GrowthChartComponent);
      const chart = {
        ...patientGrowthFixture().charts[0],
        definition: growthReferenceFixture.find((c) => c.definition.id === `wfa06_${sex}`)!
          .definition,
      };
      fixture.componentRef.setInput('chart', chart);
      fixture.componentRef.setInput(
        'encounters',
        new Map([
          [
            1,
            {
              id: 1,
              consultationType: 'FOLLOW_UP',
              chiefComplaint: 'Control de alimentación',
              primaryDiagnosisDescription: 'Evolución favorable',
            } as ClinicalEncounterList,
          ],
          [
            2,
            {
              id: 2,
              chiefComplaint: 'Otra consulta que no debe mostrarse',
            } as ClinicalEncounterList,
          ],
        ]),
      );
      fixture.detectChanges();
      expect(document.querySelector('.consultation-tooltip')).toBeNull();
      const marker = fixture.nativeElement.querySelectorAll('.patient-point')[1];
      marker.parentElement.dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();
      const summary = document.querySelector('.consultation-tooltip')!;
      expect(summary.getAttribute('role')).toBe('tooltip');
      expect(summary.id).toBe(marker.getAttribute('aria-describedby'));
      expect(summary.textContent).toContain('15/09/2026');
      expect(summary.textContent).toContain('2 años, 4 meses');
      expect(summary.textContent).toContain('Seguimiento');
      expect(summary.textContent).toContain('11.4 kg');
      expect(summary.textContent).toContain('86 cm');
      expect(summary.textContent).toContain('48 cm');
      expect(summary.textContent).toContain('Control de alimentación');
      expect(summary.textContent).toContain('Evolución favorable');
      expect(summary.textContent).not.toContain('Otra consulta');
      marker.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();
      expect(document.querySelector('.consultation-tooltip')).toBeNull();
    });
  }
  it('keeps birth and unavailable consultations useful, clears summaries when the chart changes', () => {
    const fixture = TestBed.createComponent(GrowthChartComponent);
    const chart = patientGrowthFixture().charts[0];
    fixture.componentRef.setInput('chart', chart);
    fixture.detectChanges();
    const markers = fixture.nativeElement.querySelectorAll('.patient-point');
    markers[0].dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    expect(document.querySelector('.consultation-tooltip')!.textContent).toContain(
      'Mediciones al nacer',
    );
    expect(document.querySelector('.consultation-tooltip')!.textContent).not.toContain('Motivo:');
    markers[1].dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    expect(document.querySelector('.consultation-tooltip')!.textContent).toContain(
      'Consulta clínica',
    );
    fixture.componentRef.setInput('chart', { ...chart, points: [] });
    fixture.detectChanges();
    expect(document.querySelector('.consultation-tooltip')).toBeNull();
  });
  it('lets the pointer enter the summary, then closes it when leaving', async () => {
    const fixture = TestBed.createComponent(GrowthChartComponent);
    fixture.componentRef.setInput('chart', patientGrowthFixture().charts[0]);
    fixture.detectChanges();
    const marker = fixture.nativeElement.querySelectorAll('.patient-point')[1];
    marker.parentElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    marker.parentElement.dispatchEvent(new MouseEvent('mouseleave'));
    document.querySelector('.consultation-tooltip')!.dispatchEvent(new MouseEvent('mouseenter'));
    await new Promise((resolve) => setTimeout(resolve, 180));
    fixture.detectChanges();
    expect(document.querySelector('.consultation-tooltip')).not.toBeNull();
    document.querySelector('.consultation-tooltip')!.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();
    expect(document.querySelector('.consultation-tooltip')).toBeNull();
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
    const chart = patientGrowthFixture().charts.find((c) => c.definition.id === 'bfa06_boys')!;
    fixture.componentRef.setInput('chart', chart);
    fixture.detectChanges();
    for (const curve of fixture.componentInstance.curvePaths())
      expect(curve.path.match(/M/g)).toHaveLength(2);
    expect(fixture.componentInstance.patientPath().match(/M/g)).toHaveLength(2);
    expect(fixture.nativeElement.querySelector('.bmi-transition-note').textContent).toContain(
      'cambio de referencia OMS',
    );
    expect(fixture.nativeElement.querySelectorAll('.bmi-period-label')).toHaveLength(2);
    expect(fixture.nativeElement.querySelector('.bmi-transition-line').getAttribute('x1')).toBe(
      String(fixture.componentInstance.xScale()(24)),
    );
    saveVisual(fixture.nativeElement, 'bmi-patient-boys');
  });
  it('does not show a two-period transition in a BMI reference ending at two years', () => {
    const fixture = TestBed.createComponent(GrowthChartComponent);
    fixture.componentRef.setInput('chart', {
      ...growthReferenceFixture.find((c) => c.definition.id === 'bfa06_girls')!,
      applicable: true,
      points: [],
      omitted: 0,
    } as PatientGrowthChart);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.bmi-transition-line')).toBeNull();
    for (const curve of fixture.componentInstance.curvePaths())
      expect(curve.path.match(/M/g)).toHaveLength(1);
  });
  it('updates hearts and stars with the reference sex, preserving positions and unconfirmed tooltips', () => {
    const fixture = TestBed.createComponent(GrowthChartComponent);
    const original = structuredClone(patientGrowthFixture().charts[0]);
    original.points[1].evaluation = null;
    original.points[1].note = 'Medición sin evaluación OMS.';
    const markers: string[] = [];
    for (const [id, label] of [
      ['wfa06_girls', 'corazones rosas'],
      ['wfa06_boys', 'estrellas azules'],
    ]) {
      const chart = {
        ...growthReferenceFixture.find((c) => c.definition.id === id)!,
        points: original.points,
        applicable: true,
        omitted: 0,
      };
      fixture.componentRef.setInput('chart', chart);
      fixture.detectChanges();
      const c = fixture.componentInstance;
      const points = fixture.nativeElement.querySelectorAll('path.patient-point');
      expect(points).toHaveLength(2);
      expect(fixture.nativeElement.querySelector('circle.patient-point')).toBeNull();
      markers.push(points[0].getAttribute('d'));
      for (let i = 0; i < points.length; i++) {
        expect(points[i].getAttribute('transform')).toBe(
          `translate(${c.xScale()(chart.points[i].x)} ${c.yScale()(chart.points[i].value)})`,
        );
        expect(points[i].getAttribute('tabindex')).toBe('0');
      }
      expect(points[1].classList.contains('unconfirmed-point')).toBe(true);
      points[1].dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.point-tooltip').textContent).toContain(
        'Medición sin evaluación OMS.',
      );
      expect(fixture.nativeElement.querySelector('.legend-container').textContent).toContain(label);
      expect(fixture.nativeElement.querySelector('desc').textContent).toContain(label);
      saveVisual(fixture.nativeElement, id + '-markers');
    }
    expect(markers[0]).not.toBe(markers[1]);
    expect(original.points[1].value).toBe(11.4);
  });
 it('fits all references in mobile coordinates without changing data or percentiles', () => {
 for(const chart of patientGrowthFixture().charts) {
 const fixture=TestBed.createComponent(GrowthChartComponent);fixture.componentRef.setInput('chart',chart);fixture.detectChanges();
 const component=fixture.componentInstance;const points=structuredClone(chart.points);component.compact.set(true);fixture.detectChanges();
 expect(fixture.nativeElement.querySelector('svg').getAttribute('viewBox')).toBe('0 0 350 315');expect(component.xLabels().length).toBeLessThanOrEqual(6);
 expect(component.xScale()(component.axes().x.max)).toBe(310);expect(component.yScale()(component.axes().y.min)).toBe(255);
 expect(fixture.nativeElement.querySelectorAll('.reference-curve').length).toBe(5);expect(component.chart().points).toEqual(points);fixture.destroy(); }
 });
});
