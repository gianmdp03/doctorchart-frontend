import type {
  GrowthObservation,
  PatientGrowthResponse,
} from '../../../core/models/growth-chart.model';
import { selectDownGrowthCharts } from './down-growth-reference';

const response: PatientGrowthResponse = {
  patientId: 12,
  birthDate: '2010-11-16',
  asOfDate: '2012-11-16',
  ageDays: 731,
  ageFormatted: '2 años',
  referenceSex: 'MALE',
  sexSource: 'SYSTEM_SEX',
  status: 'READY',
  charts: [],
  observations: [],
};

const pages = (data: PatientGrowthResponse, historical = false) =>
  selectDownGrowthCharts(data, historical).map(({ definition }) => definition.pdfPage);

function measurement(
  date: string,
  heightCm: number | null,
  weightKg: number | null = null,
): GrowthObservation {
  return {
    source: 'ENCOUNTER',
    encounterId: 1,
    date,
    ageDays: Math.round((Date.parse(date) - Date.parse(response.birthDate)) / 86_400_000),
    ageFormatted: '2 años',
    weightKg,
    heightCm,
    headCircumferenceCm: null,
    measurementMode: 'STANDING',
  };
}

describe('Curvas de referencia del INAN / Myrelid', () => {
  it.each([
    ['MALE', '2012-11-16', [1, 5]],
    ['FEMALE', '2012-11-16', [3, 6]],
    ['MALE', '2018-11-16', [2, 5]],
    ['FEMALE', '2023-11-16', [4, 6]],
  ] as const)('selecciona las curvas de %s en %s', (referenceSex, asOfDate, expected) => {
    expect(pages({ ...response, referenceSex, asOfDate })).toEqual(expected);
  });

  it('cambia la curva el día del tercer cumpleaños e incluye el día que cumple 18', () => {
    expect(pages({ ...response, asOfDate: '2013-11-15' })).toEqual([1, 5]);
    expect(pages({ ...response, asOfDate: '2013-11-16' })).toEqual([2, 5]);
    expect(pages({ ...response, asOfDate: '2028-11-16' })).toEqual([2, 5]);
    expect(pages({ ...response, asOfDate: '2028-11-17' })).toEqual([]);
  });

  it('respeta los límites de cumpleaños para nacimientos en año bisiesto', () => {
    const leap = { ...response, birthDate: '2012-02-29' };
    expect(pages({ ...leap, asOfDate: '2015-02-27' })).toEqual([1, 5]);
    expect(pages({ ...leap, asOfDate: '2015-02-28' })).toEqual([2, 5]);
    expect(pages({ ...leap, asOfDate: '2030-02-28' })).toEqual([2, 5]);
    expect(pages({ ...leap, asOfDate: '2030-03-01' })).toEqual([]);
  });

  it('requiere el sexo registrado para seleccionar la referencia', () => {
    expect(
      pages({ ...response, referenceSex: '', status: 'REFERENCE_SEX_REQUIRED' }, true),
    ).toEqual([]);
    expect(pages({ ...response, sexSource: 'VIEW_CONFIRMATION' }, true)).toEqual([]);
  });

  it('mantiene las siete series de DE y los ejes de las seis láminas sin registros', () => {
    const all = (['MALE', 'FEMALE'] as const).flatMap((referenceSex) => {
      const observations = [measurement('2012-11-16', 80, 12)];
      return selectDownGrowthCharts(
        { ...response, referenceSex, asOfDate: '2013-12-01', observations },
        true,
      );
    });
    expect(all).toHaveLength(6);
    for (const chart of all) {
      const { definition, curves } = chart;
      expect(definition.standardDeviations).toEqual([-3, -2, -1, 0, 1, 2, 3]);
      expect(definition.percentiles).toEqual([]);
      expect(curves[0].x).toBe(definition.x.min);
      expect(curves.at(-1)?.x).toBe(definition.x.max);
      expect(definition.y.unit).toBe(definition.indicator === 'HEIGHT' ? 'cm' : 'kg/m²');
      const point = curves.find((row) => row.x === (definition.x.min || 24))!;
      expect(point.values).toHaveLength(7);
      const values = point.values.filter((v) => v !== null);
      expect(values).toEqual([...values].sort((a, b) => a - b));
    }
    expect(selectDownGrowthCharts(response, false).map((chart) => chart.points)).toEqual([[], []]);
  });

  it('sitúa las consultas según su fecha, separa el historial de talla y exige peso y talla juntos para IMC', () => {
    const observations = [
      measurement('2013-11-16', 88, 14),
      measurement('2012-11-16', 80, 12),
      measurement('2013-01-01', null, 12),
      measurement('2013-02-16', 84),
      measurement('2012-12-16', 81, 12.5),
      measurement('2028-11-16', 160, 56),
      measurement('2028-11-17', 161, 57),
    ];
    const result = selectDownGrowthCharts(
      { ...response, observations, asOfDate: '2028-11-16' },
      true,
    );
    expect(result.map(({ applicable }) => applicable)).toEqual([false, true, true]);
    expect(result[0].points.map(({ x, value }) => [x, value])).toEqual([
      [24, 80],
      [25, 81],
      [27, 84],
    ]);
    expect(result[1].points.map(({ x, value }) => [x, value])).toEqual([
      [36, 88],
      [216, 160],
    ]);
    expect(result[2].points.map(({ x }) => x)).toEqual([24, 25, 36, 216]);
    expect(result[2].points[0]).toMatchObject({
      date: '2012-11-16',
      ageFormatted: '2 años',
      evaluation: null,
    });
    expect(result[2].points[0].value).toBeCloseTo(18.75);
    expect(result[2].omitted).toBe(2);
    expect(pages({ ...response, observations, asOfDate: '2029-11-16' }, true)).toEqual([1, 2, 5]);
  });
});
