import { Publication } from '../app/features/appointments/appointments.models';
import { Booking, BookingEvent, addDays } from '../app/features/calendar/bookings.models';
import {
  Clinic,
  ClinicCapabilities,
  DEFAULT_CLINIC_COUNTRY,
  DEFAULT_CLINIC_TIMEZONE,
  TeleconsultationSetting,
} from '../app/features/clinics/clinics.models';
import { Availability, ClinicSchedule } from '../app/features/schedules/schedules.models';
import { StaffAccess } from '../app/features/staff/staff.service';
import { DemoPatientRecord } from './demo-data';
import { findDemoSpecialty } from './demo-specialties';

export const DEMO_TURNOS_READONLY_MESSAGE =
  'En DemoChart, turnos y teleconsulta son únicamente visuales (modo demostración).';

const CLINIC_1_ID = '101';
const CLINIC_2_ID = '102';
const TELE_CLINIC_ID = '103';

export function buildDemoCapabilities(): ClinicCapabilities {
  return {
    entitlements: {
      status: 'VERIFIED',
      revision: 'demo-1',
      validUntil: new Date(Date.now() + 86_400_000).toISOString(),
      clinicManagement: true,
      max_clinics: 3,
    },
    usage: { counted: 2 },
    actions: {
      create: false,
      edit: false,
      activate: false,
      deactivate: false,
      archive: false,
      restore: false,
    },
    reason: null,
  };
}

export function buildDemoClinics(activeContextId: number): Clinic[] {
  const now = new Date().toISOString();
  const ctx = String(activeContextId || 1);
  return [
    {
      id: CLINIC_1_ID,
      name: 'Consultorio Palermo',
      modality: 'IN_PERSON',
      country: DEFAULT_CLINIC_COUNTRY,
      province: 'CABA',
      city: 'Buenos Aires',
      address: 'Av. Santa Fe 2450, Piso 4',
      timezone: DEFAULT_CLINIC_TIMEZONE,
      status: 'ACTIVE',
      version: '1',
      specialtyContextIds: [ctx],
      futureBookings: 6,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: CLINIC_2_ID,
      name: 'Centro Médico Belgrano',
      modality: 'IN_PERSON',
      country: DEFAULT_CLINIC_COUNTRY,
      province: 'CABA',
      city: 'Buenos Aires',
      address: 'Av. Juramento 1820',
      timezone: DEFAULT_CLINIC_TIMEZONE,
      status: 'ACTIVE',
      version: '1',
      specialtyContextIds: [ctx],
      futureBookings: 3,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: TELE_CLINIC_ID,
      name: 'Teleconsulta DoctorChart',
      modality: 'TELECONSULTATION',
      country: '',
      province: '',
      city: '',
      address: '',
      timezone: DEFAULT_CLINIC_TIMEZONE,
      status: 'ACTIVE',
      version: '1',
      specialtyContextIds: [ctx],
      futureBookings: 2,
      createdAt: now,
      updatedAt: now,
    },
  ];
}

export function buildDemoTeleconsultations(
  contexts: Array<{ specialtyContextId: number; specialtyId: number }>,
): TeleconsultationSetting[] {
  return contexts.map((c) => ({
    specialtyContextId: String(c.specialtyContextId),
    specialty: findDemoSpecialty(c.specialtyId).name,
    clinicId: TELE_CLINIC_ID,
    enabled: true,
  }));
}

export function buildDemoSchedule(clinicId: string, activeContextId: number): ClinicSchedule {
  const ctx = String(activeContextId || 1);
  const ranges =
    clinicId === TELE_CLINIC_ID
      ? [{ id: 'r-tele', specialtyContextId: ctx, slotMinutes: 20, start: '14:00', end: '17:00' }]
      : clinicId === CLINIC_2_ID
        ? [{ id: 'r-bel', specialtyContextId: ctx, slotMinutes: 20, start: '14:30', end: '18:30' }]
        : [{ id: 'r-pal', specialtyContextId: ctx, slotMinutes: 20, start: '09:00', end: '13:00' }];

  return {
    clinicId,
    version: '1',
    configured: true,
    slotMinutes: 20,
    minNoticeMinutes: 60,
    maxAdvanceDays: 30,
    weekly: [1, 2, 3, 4, 5, 6, 7].map((weekday) => ({
      weekday,
      ranges: weekday <= 5 ? ranges : [],
    })),
    exceptions: [],
  };
}

function isoAtBuenosAires(dateIso: string, hhmm: string): string {
  return `${dateIso}T${hhmm}:00-03:00`;
}

export function buildDemoAvailability(
  clinicId: string,
  fromDate: string,
  daysCount: number,
  activeContextId: number,
  bookedStarts: Set<string>,
): Availability {
  const ctx = String(activeContextId || 1);
  const days = Array.from({ length: daysCount }, (_, i) => {
    const date = addDays(fromDate, i);
    const weekday = new Date(date + 'T12:00:00Z').getUTCDay(); // 0=Sun..6=Sat
    const isOpen = weekday >= 1 && weekday <= 5;
    if (!isOpen) {
      return { date, closed: true, hours: [], slots: [] };
    }
    const baseHours =
      clinicId === TELE_CLINIC_ID
        ? ['14:00', '14:20', '14:40', '15:00', '15:20', '16:00']
        : clinicId === CLINIC_2_ID
          ? ['14:30', '15:00', '15:30', '16:00', '16:30', '17:00']
          : ['09:00', '09:20', '09:40', '10:00', '10:20', '11:00', '11:20', '12:00'];

    const slots = baseHours
      .map((hhmm) => {
        const start = new Date(isoAtBuenosAires(date, hhmm)).toISOString();
        const end = new Date(Date.parse(start) + 20 * 60_000).toISOString();
        return { start, end, specialtyContextId: ctx };
      })
      .filter((s) => !bookedStarts.has(`${clinicId}|${s.start}`));

    const hours =
      clinicId === TELE_CLINIC_ID
        ? [{ start: '14:00', end: '17:00' }]
        : clinicId === CLINIC_2_ID
          ? [{ start: '14:30', end: '18:30' }]
          : [{ start: '09:00', end: '13:00' }];

    return { date, closed: false, hours, slots };
  });

  return {
    clinicId,
    timezone: DEFAULT_CLINIC_TIMEZONE,
    scheduleVersion: '1',
    generatedAt: new Date().toISOString(),
    days,
  };
}

export function buildDemoBookings(
  fromIso: string,
  patients: DemoPatientRecord[],
  activeContextId: number,
  specialty: { id: number; code: string; name: string },
): Booking[] {
  const fromDate = fromIso.slice(0, 10);
  const startDay = addDays(fromDate, 2); // anchor to Monday of the requested week
  const clinics = buildDemoClinics(activeContextId);
  const ctxStr = String(activeContextId || 1);

  const sampleSpecs: Array<{
    dayOffset: number;
    time: string;
    clinicIdx: number;
    status: Booking['status'];
    rescheduleResponse?: Booking['rescheduleResponse'];
  }> = [
    { dayOffset: 0, time: '09:20', clinicIdx: 0, status: 'COMPLETED' },
    { dayOffset: 0, time: '10:00', clinicIdx: 0, status: 'CHECKED_IN' },
    { dayOffset: 0, time: '14:20', clinicIdx: 2, status: 'CONFIRMED' },
    { dayOffset: 1, time: '09:40', clinicIdx: 0, status: 'CONFIRMED' },
    { dayOffset: 1, time: '15:00', clinicIdx: 1, status: 'CONFIRMED' },
    { dayOffset: 2, time: '10:20', clinicIdx: 0, status: 'CONFIRMED', rescheduleResponse: 'AWAITING_PATIENT' },
    { dayOffset: 2, time: '14:40', clinicIdx: 2, status: 'CHECKED_IN' },
    { dayOffset: 3, time: '11:00', clinicIdx: 0, status: 'CONFIRMED' },
    { dayOffset: 3, time: '16:00', clinicIdx: 1, status: 'CONFIRMED' },
    { dayOffset: 4, time: '09:00', clinicIdx: 0, status: 'CONFIRMED' },
  ];

  return sampleSpecs.map((spec, idx) => {
    const clinic = clinics[spec.clinicIdx];
    const date = addDays(startDay, spec.dayOffset);
    const start = new Date(isoAtBuenosAires(date, spec.time)).toISOString();
    const end = new Date(Date.parse(start) + 20 * 60_000).toISOString();
    const patient = patients.length ? patients[idx % patients.length] : null;
    const contactName = patient?.guardianInfo?.motherFullName || patient?.fullName || `Paciente Demo ${idx + 1}`;
    const attendeeName = patient?.fullName || `Paciente Demo ${idx + 1}`;

    return {
      id: String(8001 + idx),
      clinicId: clinic.id,
      start,
      end,
      status: spec.status,
      rescheduleResponse: spec.rescheduleResponse,
      version: '1',
      contactName,
      contactPhone: patient?.phone || '+5491155550100',
      attendeeName,
      createdAt: addDays(date, -3) + 'T12:00:00Z',
      updatedAt: addDays(date, -1) + 'T12:00:00Z',
      specialtyContextId: ctxStr,
      specialty: { id: String(specialty.id), code: specialty.code, name: specialty.name },
      clinicSnapshot: {
        modality: clinic.modality,
        name: clinic.name,
        address: clinic.address,
        publicAddress: clinic.address,
        timezone: clinic.timezone,
      },
    };
  });
}

export function buildDemoBookingEvents(booking: Booking): BookingEvent[] {
  return [
    {
      version: '1',
      kind: 'CREATED',
      actorId: 'demo-clinician',
      occurredAt: booking.createdAt,
      before: null,
      after: booking,
    },
  ];
}

export function buildDemoPublication(activeContextId: number): Publication {
  const clinics = buildDemoClinics(activeContextId);
  return {
    publicId: 'dra-valentina-gomez-demo',
    version: '1',
    name: 'Dra. Valentina Gómez',
    description: 'Turnos presenciales y por teleconsulta (vista previa de demostración en DemoChart).',
    published: true,
    specialtyContextIds: [String(activeContextId || 1)],
    clinics: clinics.map((c) => ({
      clinicId: c.id,
      enabled: true,
      address: c.modality === 'TELECONSULTATION' ? 'Videoconsulta online' : c.address,
    })),
    questions: [
      { key: 'motivo', label: 'Motivo breve de la consulta', required: false },
      { key: 'obraSocial', label: 'Obra social o prepaga', required: false },
    ],
  };
}

export function buildDemoSecretaries(): StaffAccess[] {
  return [
    {
      id: 'sec-1',
      name: 'Camila Benítez',
      email: 'camila.secretaria@ejemplo.com',
      phone: '+5491145678901',
      version: '1',
      active: true,
      activated: true,
      permissions: ['view', 'create', 'cancel', 'reschedule', 'status'],
      clinicIds: [CLINIC_1_ID, CLINIC_2_ID],
    },
    {
      id: 'sec-2',
      name: 'Lucas Pereyra',
      email: 'lucas.recepcion@ejemplo.com',
      phone: '+5491145678902',
      version: '1',
      active: true,
      activated: false,
      permissions: ['view'],
      clinicIds: [CLINIC_1_ID],
    },
  ];
}
