import {
  BiologicalSex,
  GrowthEvaluation,
  GrowthObservation,
  GrowthReferenceChart,
  MeasurementMode,
  PatientGrowthChart,
  PatientGrowthPoint,
  PatientGrowthResponse,
} from '../app/core/models/growth-chart.model';

const DAYS_PER_MONTH = 30.4375;
const CENTILE_Z = [-1.8807936081512509, -1.0364333894937898, 0, 1.0364333894937898, 1.8807936081512509];

let cachedCatalog: GrowthReferenceChart[] | null = null;

export async function loadGrowthCatalog(): Promise<GrowthReferenceChart[]> {
  if (cachedCatalog) return cachedCatalog;
  const mod = await import('../app/core/testing/growth-catalog.json');
  cachedCatalog = (mod.default ?? mod) as unknown as GrowthReferenceChart[];
  return cachedCatalog;
}

function erfc(x: number): number {
  const z = Math.abs(x);
  const t = 1 / (1 + 0.5 * z);
  const ans =
    t *
    Math.exp(
      -z * z -
        1.26551223 +
        t *
          (1.00002368 +
            t *
              (0.37409196 +
                t *
                  (0.09678418 +
                    t *
                      (-0.18628806 +
                        t *
                          (0.27886807 +
                            t *
                              (-1.13520398 +
                                t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))),
    );
  return x >= 0 ? ans : 2 - ans;
}

function interpolateCurveValues(curves: GrowthReferenceChart['curves'], x: number): (number | null)[] | null {
  if (!curves.length || x < curves[0].x || x > curves[curves.length - 1].x) return null;
  let lo = 0;
  let hi = curves.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (curves[mid].x < x) lo = mid + 1;
    else hi = mid;
  }
  if (curves[lo].x === x || lo === 0) return curves[lo].values;
  const a = curves[lo - 1];
  const b = curves[lo];
  const f = (x - a.x) / (b.x - a.x);
  return a.values.map((av, i) => {
    const bv = b.values[i];
    if (av == null || bv == null) return null;
    return av + f * (bv - av);
  });
}

function evaluateAgainstPercentiles(curves: GrowthReferenceChart['curves'], x: number, value: number): GrowthEvaluation | null {
  const vals = interpolateCurveValues(curves, x);
  if (!vals || vals.length !== 5 || vals.some((v) => v == null)) return null;
  const nums = vals as number[];
  let z: number;
  if (value <= nums[0]) {
    const slope = (CENTILE_Z[1] - CENTILE_Z[0]) / Math.max(1e-6, nums[1] - nums[0]);
    z = CENTILE_Z[0] + (value - nums[0]) * slope;
  } else if (value >= nums[4]) {
    const slope = (CENTILE_Z[4] - CENTILE_Z[3]) / Math.max(1e-6, nums[4] - nums[3]);
    z = CENTILE_Z[4] + (value - nums[4]) * slope;
  } else {
    let idx = 0;
    while (idx < 3 && value > nums[idx + 1]) idx++;
    const f = (value - nums[idx]) / Math.max(1e-6, nums[idx + 1] - nums[idx]);
    z = CENTILE_Z[idx] + f * (CENTILE_Z[idx + 1] - CENTILE_Z[idx]);
  }
  if (!Number.isFinite(z)) return null;
  if (z < -3) return { zScore: z, percentile: null, percentileLimit: '<0.135' };
  if (z > 3) return { zScore: z, percentile: null, percentileLimit: '>99.865' };
  return { zScore: z, percentile: 50 * erfc(-z / Math.SQRT2) };
}

function resolveMode(mode: MeasurementMode, ageDays: number): MeasurementMode {
  if (mode === 'RECUMBENT' || mode === 'STANDING') return mode;
  if (ageDays < 0) return 'UNKNOWN';
  return ageDays <= 730 ? 'RECUMBENT' : 'STANDING';
}

function normalizeHeight(obs: ObsWithMode): { height: number; adjustmentCm: number } | null {
  if (obs.heightCm == null || !Number.isFinite(obs.heightCm) || obs.heightCm <= 0) return null;
  if (obs.mode !== 'RECUMBENT' && obs.mode !== 'STANDING') return null;
  let adjustmentCm = 0;
  if (obs.ageDays <= 730 && obs.mode === 'STANDING') adjustmentCm = 0.7;
  else if (obs.ageDays >= 731 && obs.mode === 'RECUMBENT') {
    if (obs.ageDays > 1856) return null;
    adjustmentCm = -0.7;
  }
  const height = obs.heightCm + adjustmentCm;
  return Number.isFinite(height) && height > 0 ? { height, adjustmentCm } : null;
}

type ObsWithMode = GrowthObservation & { mode: MeasurementMode };

function isChartApplicable(def: GrowthReferenceChart['definition'], sex: BiologicalSex, ageDays: number): boolean {
  if (def.sex !== sex) return false;
  if (def.reference === 'WHO 2006') {
    if (def.ageMinMonths === 24) return ageDays >= 731 && ageDays <= 1856;
    if (def.ageMaxMonths === 24) return ageDays >= 0 && ageDays <= 730;
    return ageDays >= 0 && ageDays <= 1856;
  }
  const ageMonths = ageDays / DAYS_PER_MONTH;
  return ageMonths >= def.ageMinMonths && ageMonths <= def.ageMaxMonths;
}

function buildPoint(chart: GrowthReferenceChart, obs: GrowthObservation): PatientGrowthPoint | null {
  const def = chart.definition;
  if (!isChartApplicable(def, def.sex, obs.ageDays)) return null;
  const resolvedMode = resolveMode(obs.measurementMode, obs.ageDays);
  const effectiveObs: ObsWithMode = { ...obs, measurementMode: resolvedMode, mode: resolvedMode };
  let x = obs.ageDays / DAYS_PER_MONTH;
  let value = 0;
  let adjustmentCm = 0;
  let note: string | undefined;

  if (def.indicator === 'WEIGHT') {
    if (!obs.weightKg || obs.weightKg <= 0) return null;
    value = obs.weightKg;
  } else if (def.indicator === 'HEAD_CIRCUMFERENCE') {
    if (!obs.headCircumferenceCm || obs.headCircumferenceCm <= 0) return null;
    value = obs.headCircumferenceCm;
  } else {
    const norm = normalizeHeight(effectiveObs);
    if (!norm) {
      if ((def.indicator === 'LENGTH' || def.indicator === 'HEIGHT') && obs.heightCm && obs.heightCm > 0) {
        return {
          ...obs,
          measurementMode: resolvedMode,
          x,
          value: obs.heightCm,
          evaluation: null,
          note: 'Posición de medición sin confirmar: valor registrado, sin evaluación OMS.',
        };
      }
      return null;
    }
    adjustmentCm = norm.adjustmentCm;
    if (def.indicator === 'LENGTH' || def.indicator === 'HEIGHT') {
      value = norm.height;
    } else if (def.indicator === 'BMI') {
      if (!obs.weightKg || obs.weightKg <= 0) return null;
      value = obs.weightKg / Math.pow(norm.height / 100, 2);
    } else {
      if (!obs.weightKg || obs.weightKg <= 0) return null;
      value = obs.weightKg;
      x = norm.height;
    }
    if (adjustmentCm !== 0) {
      note = 'Conversión OMS de posición de medición; se conserva el valor original.';
    }
  }

  const evaluation = def.standardDeviations ? null : evaluateAgainstPercentiles(chart.curves, x, value);
  return {
    ...obs,
    measurementMode: resolvedMode,
    x,
    value,
    evaluation,
    ...(adjustmentCm ? { adjustmentCm } : {}),
    ...(note ? { note } : {}),
  };
}

export function ageDaysBetween(birthDate: string, targetDate: string): number {
  const b = new Date(birthDate + 'T00:00:00Z');
  const t = new Date(targetDate + 'T00:00:00Z');
  if (Number.isNaN(b.getTime()) || Number.isNaN(t.getTime())) return -1;
  return Math.round((t.getTime() - b.getTime()) / 86_400_000);
}

export function buildPatientGrowthResponse(
  catalog: GrowthReferenceChart[],
  params: {
    patientId: number;
    birthDate: string;
    asOfDate: string;
    ageFormatted: string;
    systemGender?: string | null;
    requestedSex?: BiologicalSex | null;
    observations: GrowthObservation[];
    measurementModes?: Record<string, Exclude<MeasurementMode, 'UNKNOWN'>>;
  },
): PatientGrowthResponse {
  const ageDays = ageDaysBetween(params.birthDate, params.asOfDate);
  const sysSex: BiologicalSex | '' =
    params.systemGender === 'MALE' || params.systemGender === 'FEMALE' ? params.systemGender : '';
  const effectiveSex: BiologicalSex | '' = params.requestedSex || sysSex;
  const sexSource = params.requestedSex ? 'VIEW_CONFIRMATION' : sysSex ? 'SYSTEM_SEX' : '';

  if (ageDays < 0 || !/^\d{4}-\d{2}-\d{2}$/.test(params.birthDate)) {
    return {
      patientId: params.patientId,
      birthDate: params.birthDate,
      asOfDate: params.asOfDate,
      ageDays: Math.max(0, ageDays),
      ageFormatted: params.ageFormatted,
      referenceSex: effectiveSex,
      sexSource,
      status: 'INVALID_BIRTH_DATE',
      observations: params.observations,
      charts: [],
    };
  }

  if (!effectiveSex) {
    return {
      patientId: params.patientId,
      birthDate: params.birthDate,
      asOfDate: params.asOfDate,
      ageDays,
      ageFormatted: params.ageFormatted,
      referenceSex: '',
      sexSource: '',
      status: 'REFERENCE_SEX_REQUIRED',
      observations: params.observations,
      charts: [],
    };
  }

  const overriddenObs = params.observations.map((o) => {
    const key = o.source === 'BIRTH' ? 'BIRTH' : String(o.encounterId ?? '');
    const override = params.measurementModes?.[key];
    return override ? { ...o, measurementMode: override } : o;
  });

  const charts: PatientGrowthChart[] = catalog
    .filter((c) => c.definition.sex === effectiveSex)
    .map((c) => {
      const applicable = isChartApplicable(c.definition, effectiveSex, ageDays);
      const points: PatientGrowthPoint[] = [];
      let omitted = 0;
      for (const obs of overriddenObs) {
        if (!isChartApplicable(c.definition, effectiveSex, obs.ageDays)) continue;
        const pt = buildPoint(c, obs);
        if (pt) points.push(pt);
        else omitted++;
      }
      return { ...c, applicable, points, omitted };
    });

  return {
    patientId: params.patientId,
    birthDate: params.birthDate,
    asOfDate: params.asOfDate,
    ageDays,
    ageFormatted: params.ageFormatted,
    referenceSex: effectiveSex,
    sexSource,
    status: 'READY',
    observations: overriddenObs,
    charts,
  };
}
