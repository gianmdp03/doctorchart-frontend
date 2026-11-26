import calendarData from './data/vaccination-calendar.json';
import { CalendarioVacunacionJSON } from '../app/features/vaccination-calendar/calendario.types';
import {
  PatientVaccinationDose,
  PatientVaccinationSchedule,
  VaccinationStatus,
} from '../app/core/models/vaccination.model';

export const DEMO_VACCINATION_CALENDAR = calendarData as CalendarioVacunacionJSON;

const COLUMN_AGE_LABELS: Record<string, string> = {
  recien_nacido: 'Recién nacido',
  '2_meses': '2 meses',
  '3_meses': '3 meses',
  '4_meses': '4 meses',
  '5_meses': '5 meses',
  '6_meses': '6 meses',
  '12_meses': '12 meses',
  '15_meses': '15 meses',
  '18_meses': '18 meses',
  '24_meses': '24 meses',
  nacidos_2021: '5 años',
  nacidos_2015: '11 años',
  a_partir_15_anos: '15 años o más',
  adultos: 'Adultos',
};

export function ageInMonthsBetween(birthDateIso: string, asOfIso: string): number {
  const birth = new Date(birthDateIso + 'T00:00:00Z');
  const asOf = new Date(asOfIso + 'T00:00:00Z');
  if (Number.isNaN(birth.getTime()) || Number.isNaN(asOf.getTime())) return 0;
  let months = (asOf.getUTCFullYear() - birth.getUTCFullYear()) * 12 + (asOf.getUTCMonth() - birth.getUTCMonth());
  if (asOf.getUTCDate() < birth.getUTCDate()) months--;
  return Math.max(0, months);
}

export function formatAgeLabel(birthDateIso: string, asOfIso: string): string {
  const birth = new Date(birthDateIso + 'T00:00:00Z');
  const asOf = new Date(asOfIso + 'T00:00:00Z');
  if (Number.isNaN(birth.getTime()) || Number.isNaN(asOf.getTime())) return '—';
  const days = Math.max(0, Math.round((asOf.getTime() - birth.getTime()) / 86_400_000));
  const months = ageInMonthsBetween(birthDateIso, asOfIso);
  if (months === 0) return days === 1 ? '1 día' : `${days} días`;
  if (months < 24) return months === 1 ? '1 mes' : `${months} meses`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem > 0 ? `${years} años, ${rem} ${rem === 1 ? 'mes' : 'meses'}` : `${years} años`;
}

export function computeVaccinationSchedule(
  patientId: number,
  patientVersion: number,
  birthDate: string,
  appliedDoses: Record<string, string | null>,
  asOfDate: string,
): PatientVaccinationSchedule {
  const ageMonths = ageInMonthsBetween(birthDate, asOfDate);
  const doses: PatientVaccinationDose[] = [];
  const skipColumns = new Set(['embarazadas', 'puerperas', 'personal_salud']);

  for (const vaccine of DEMO_VACCINATION_CALENDAR.vacunas) {
    for (const app of vaccine.aplicaciones) {
      if (app.columnas.every((col) => skipColumns.has(col))) continue;
      if (app.columnas.includes('adultos') && ageMonths < 216) continue;
      const from = app.ageRule?.fromMonths ?? 0;
      const to = app.ageRule?.toMonths ?? from;
      const grace = app.ageRule?.graceMonths ?? 1;
      const appliedAt = Object.prototype.hasOwnProperty.call(appliedDoses, app.id)
        ? appliedDoses[app.id]
        : undefined;

      let status: VaccinationStatus;
      if (appliedAt !== undefined) {
        status = 'APLICADA';
      } else if (ageMonths < from) {
        status = 'FUTURA';
      } else if (ageMonths <= to + grace) {
        status = 'ACTUAL';
      } else {
        status = 'PENDIENTE';
      }

      const colId = app.columnas[0] ?? '';
      doses.push({
        id: app.id,
        calendarId: 'argentina-2026',
        vaccineId: vaccine.id,
        vaccineName: vaccine.nombre,
        doseLabel: app.dosis,
        dueFrom: from,
        dueTo: to,
        dueAgeLabel: COLUMN_AGE_LABELS[colId] ?? (from === 0 ? 'Recién nacido' : `${from} meses`),
        status,
        appliedAt: appliedAt ?? null,
      });
    }
  }

  return {
    patientId,
    patientVersion,
    calendarId: 'argentina-2026',
    asOfDate,
    ageInMonths: ageMonths,
    ageLabel: formatAgeLabel(birthDate, asOfDate),
    doses,
  };
}
