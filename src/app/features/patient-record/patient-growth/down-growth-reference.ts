import type {
  BiologicalSex,
  GrowthObservation,
  PatientGrowthChart,
  PatientGrowthPoint,
  PatientGrowthResponse,
} from '../../../core/models/growth-chart.model';
import series from './myrelid-2002.json';

export type DownGrowthMetric = 'HEIGHT' | 'BMI';

const titles: Record<DownGrowthMetric, string> = {
  HEIGHT: 'Talla para la edad',
  BMI: 'IMC para la edad',
};

interface DownGrowthReference {
  page: number;
  sex: BiologicalSex;
  indicator: DownGrowthMetric;
  startMonths: 0 | 36;
  endMonths: 36 | 216;
}

const references: readonly DownGrowthReference[] = [
  { page: 1, sex: 'MALE', indicator: 'HEIGHT', startMonths: 0, endMonths: 36 },
  { page: 2, sex: 'MALE', indicator: 'HEIGHT', startMonths: 36, endMonths: 216 },
  { page: 3, sex: 'FEMALE', indicator: 'HEIGHT', startMonths: 0, endMonths: 36 },
  { page: 4, sex: 'FEMALE', indicator: 'HEIGHT', startMonths: 36, endMonths: 216 },
  { page: 5, sex: 'MALE', indicator: 'BMI', startMonths: 0, endMonths: 216 },
  { page: 6, sex: 'FEMALE', indicator: 'BMI', startMonths: 0, endMonths: 216 },
];

const pdfSha256 = '31cad974af4daf9a5625f38e128b05931865b3d91f9feae6b7c740290b4534dc';

function ageInMonths(birthDate: string, date: string): number {
  const [birthYear, birthMonth, birthDay] = birthDate.split('-').map(Number);
  const [year, month, day] = date.split('-').map(Number);
  const monthDate = (offset: number) => {
    const targetMonth = birthMonth - 1 + offset;
    const lastDay = new Date(Date.UTC(birthYear, targetMonth + 1, 0)).getUTCDate();
    return Date.UTC(birthYear, targetMonth, Math.min(birthDay, lastDay));
  };
  const timestamp = Date.UTC(year, month - 1, day);
  let months = (year - birthYear) * 12 + month - birthMonth;
  if (timestamp < monthDate(months)) months--;
  const anchor = monthDate(months);
  return months + (timestamp - anchor) / (monthDate(months + 1) - anchor);
}

function measurementValue(observation: GrowthObservation, indicator: DownGrowthMetric) {
  const { heightCm: height, weightKg: weight } = observation;
  if (height === null || !Number.isFinite(height) || height <= 0) return null;
  if (indicator === 'HEIGHT') return height;
  if (weight === null || !Number.isFinite(weight) || weight <= 0) return null;
  // The PDF supplies no posture conversion. Use the recorded values from the same observation.
  const bmi = weight / (height / 100) ** 2;
  return Number.isFinite(bmi) && bmi > 0 ? bmi : null;
}

export function selectDownGrowthCharts(
  response: PatientGrowthResponse | null,
  showHistorical: boolean,
): PatientGrowthChart[] {
  if (
    !response ||
    response.status !== 'READY' ||
    response.sexSource !== 'SYSTEM_SEX' ||
    !response.referenceSex ||
    response.ageDays < 0
  )
    return [];

  const { birthDate, asOfDate } = response;
  const age = ageInMonths(birthDate, asOfDate);
  const observations = response.observations
    .filter((observation) => observation.date >= birthDate && observation.date <= asOfDate)
    .map((observation) => ({ observation, x: ageInMonths(birthDate, observation.date) }))
    .sort((a, b) => a.x - b.x);

  const charts: PatientGrowthChart[] = [];
  for (const { page, sex, indicator, startMonths, endMonths } of references) {
    if (sex !== response.referenceSex) continue;
    // Use the upper stature chart on the third birthday. The eighteenth birthday is included.
    const includes = (x: number) =>
      x >= startMonths && (endMonths === 36 ? x < endMonths : x <= endMonths);
    const applicable = includes(age);
    if (!applicable && !showHistorical) continue;

    const points: PatientGrowthPoint[] = [];
    let omitted = 0;
    for (const { observation, x } of observations) {
      if (!includes(x)) continue;
      const value = measurementValue(observation, indicator);
      if (value === null) {
        omitted++;
        continue;
      }
      points.push({ ...observation, x, value, evaluation: null });
    }
    if (!applicable && !points.length) continue;

    const bmi = indicator === 'BMI';
    charts.push({
      definition: {
        id: 'myrelid-2002-' + page,
        pdfNumber: page,
        pdfPage: page,
        indicator,
        title: titles[indicator],
        sex,
        ageMinMonths: startMonths,
        ageMaxMonths: endMonths,
        reference: 'Myrelid 2002',
        dataset: 'inan-myrelid-2002-digitized',
        measurementMode: 'AS_RECORDED',
        x: {
          variable: 'AGE',
          unit: 'meses',
          min: startMonths,
          max: endMonths,
          step: endMonths === 36 ? 3 : 12,
          minorStep: endMonths === 36 ? 1 : 3,
        },
        y: {
          variable: indicator,
          unit: bmi ? 'kg/m²' : 'cm',
          min: bmi ? 8 : startMonths === 0 ? 30 : 70,
          max: bmi ? 40 : startMonths === 0 ? 120 : 180,
          step: bmi ? 5 : 10,
          minorStep: bmi ? 1 : 5,
        },
        percentiles: [],
        standardDeviations: [-3, -2, -1, 0, 1, 2, 3],
        source: 'https://doi.org/10.1136/adc.87.2.97',
      },
      curves: series[page - 1],
      provenance: { publisher: 'INAN', method: 'PDF_VECTOR_DIGITIZATION', pdfSha256 },
      points,
      applicable,
      omitted,
    });
  }
  return charts;
}
