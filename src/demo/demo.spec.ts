import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { encodeDemoSession, parseDemoSession } from './demo-data';
import { createInitialDemoSession } from './demo-generator';
import { ageDaysBetween, buildPatientGrowthResponse, loadGrowthCatalog } from './demo-growth';
import { DemoHttpBackend } from './demo-http.backend';
import { DemoSessionService } from './demo-session.service';

describe('DemoChart core & HttpBackend', () => {
  it('encodes and parses a DemoSession roundtrip and rejects invalid payloads', () => {
    const session = createInitialDemoSession(1, false);
    const json = encodeDemoSession(session);
    const envelope = JSON.parse(json) as { format: string; version: number };
    expect(envelope.format).toBe('demochart');
    expect(envelope.version).toBe(1);

    const parsed = parseDemoSession(JSON.parse(json));
    expect(parsed.contexts.length).toBeGreaterThan(0);
    expect(parsed.patients.length).toBe(8);

    expect(() => parseDemoSession('not-an-object')).toThrow();
    expect(() => parseDemoSession({ format: 'other', version: 1 })).toThrow();
    expect(() => parseDemoSession({ format: 'demochart', version: 99 })).toThrow();
    expect(() =>
      parseDemoSession({
        format: 'demochart',
        version: 1,
        workspaceId: 1,
        activeContextId: 1,
        nextId: 10,
        contexts: [],
      }),
    ).toThrow();
  });

  it('generates varied male and female pediatric patients with encounters, vaccines, prescriptions, and studies', () => {
    const session = createInitialDemoSession(1, false);
    const genders = new Set(session.patients.map((p) => p.gender));
    const todayIso = new Date().toISOString().slice(0, 10);
    const agesDays = session.patients.map((p) => ageDaysBetween(p.birthDate, todayIso));

    expect(genders.has('MALE')).toBe(true);
    expect(genders.has('FEMALE')).toBe(true);
    expect(agesDays.some((d) => d < 30)).toBe(true); // neonatal
    expect(agesDays.some((d) => d >= 30 && d < 365)).toBe(true); // infant
    expect(agesDays.some((d) => d >= 365 && d < 5 * 365)).toBe(true); // early childhood
    expect(agesDays.some((d) => d >= 5 * 365 && d < 12 * 365)).toBe(true); // child
    expect(agesDays.some((d) => d >= 12 * 365)).toBe(true); // adolescent

    expect(session.encounters.length).toBeGreaterThanOrEqual(8);
    expect(session.patients.some((p) => Object.keys(p.appliedVaccines).length > 0)).toBe(true);
    expect(session.prescriptions.length).toBeGreaterThan(0);
    expect(session.studies.length).toBeGreaterThan(0);

    const hasTodayEncounter = session.encounters.some((e) => e.encounterDate.slice(0, 10) === todayIso);
    expect(hasTodayEncounter).toBe(true);
  });

  it('generates an adult cohort for non-pediatric specialties', () => {
    const session = createInitialDemoSession(2, false);
    const todayIso = new Date().toISOString().slice(0, 10);
    expect(session.contexts[0]?.specialtyId).toBe(2);
    expect(session.patients.length).toBe(8);
    expect(session.patients.every((p) => ageDaysBetween(p.birthDate, todayIso) >= 18 * 365)).toBe(true);
    expect(session.encounters.length).toBeGreaterThanOrEqual(8);
  });

  it('evaluates WHO 2006/2007 growth curves with Z-scores and percentiles', async () => {
    const catalog = await loadGrowthCatalog();
    expect(catalog.length).toBeGreaterThan(0);

    const response = buildPatientGrowthResponse(catalog, {
      patientId: 1001,
      birthDate: '2024-06-01',
      asOfDate: '2026-06-01',
      ageFormatted: '2 años',
      systemGender: 'FEMALE',
      observations: [
        {
          source: 'BIRTH',
          encounterId: null,
          date: '2024-06-01',
          ageDays: 0,
          ageFormatted: 'Recién nacido',
          weightKg: 3.3,
          heightCm: 49.5,
          headCircumferenceCm: 34.2,
          measurementMode: 'RECUMBENT',
        },
        {
          source: 'ENCOUNTER',
          encounterId: 1,
          date: '2026-06-01',
          ageDays: 730,
          ageFormatted: '2 años',
          weightKg: 12.1,
          heightCm: 86.4,
          headCircumferenceCm: 47.8,
          measurementMode: 'STANDING',
        },
      ],
    });

    expect(response.status).toBe('READY');
    expect(response.referenceSex).toBe('FEMALE');
    expect(response.charts.length).toBeGreaterThan(0);
    const wfa = response.charts.find((c) => c.definition.indicator === 'WEIGHT' && c.applicable);
    expect(wfa).toBeTruthy();
    expect(wfa!.points.length).toBe(2);
    expect(wfa!.points[0].evaluation?.percentile).toBeGreaterThan(0);
  });

  it('handles clinical endpoints, blocks patient creation, persists encounters/vaccines, and enforces visual-only Turnos', async () => {
    const initial = createInitialDemoSession(1, false);
    TestBed.configureTestingModule({
      providers: [DemoSessionService, DemoHttpBackend],
    });
    const sessionSvc = TestBed.inject(DemoSessionService);
    sessionSvc.session.set(initial);
    vi.spyOn(sessionSvc, 'mutate').mockImplementation(async (fn) => {
      const draft = structuredClone(sessionSvc.session());
      fn(draft);
      sessionSvc.session.set(draft);
      return draft;
    });
    const backend = TestBed.inject(DemoHttpBackend);

    const dashRes = (await firstValueFrom(
      backend.handle(new HttpRequest('GET', '/api/doctorchart/encounters/dashboard')),
    )) as HttpResponse<{
      totalPatients: number;
      patientActivity?: { monthlyPatients: Array<{ month: string; patients: number }> };
    }>;
    expect(dashRes.status).toBe(200);
    expect(dashRes.body?.patientActivity?.monthlyPatients.length).toBe(3);

    const listRes = (await firstValueFrom(
      backend.handle(new HttpRequest('GET', '/api/doctorchart/patients')),
    )) as HttpResponse<{ content: unknown[]; totalElements: number; totalPages: number }>;
    expect(listRes.status).toBe(200);
    expect(listRes.body?.content.length).toBe(8);

    const pagedRes = (await firstValueFrom(
      backend.handle(
        new HttpRequest('GET', '/api/doctorchart/patients', {
          params: new HttpParams().set('page', '1').set('size', '3'),
        }),
      ),
    )) as HttpResponse<{ content: Array<{ id: number }>; number: number; totalPages: number }>;
    expect(pagedRes.status).toBe(200);
    expect(pagedRes.body?.number).toBe(1);
    expect(pagedRes.body?.totalPages).toBe(3);
    expect(pagedRes.body?.content.length).toBe(3);

    await expect(
      firstValueFrom(
        backend.handle(
          new HttpRequest('POST', '/api/doctorchart/patients', {
            firstName: 'Test',
            lastName: 'User',
          }),
        ),
      ),
    ).rejects.toMatchObject({ status: 403 } satisfies Partial<HttpErrorResponse>);

    const targetPatient = initial.patients[0];
    const createEncRes = (await firstValueFrom(
      backend.handle(
        new HttpRequest('POST', '/api/doctorchart/encounters', {
          patientId: targetPatient.id,
          consultationType: 'FOLLOW_UP',
          values: {
            chiefComplaint: 'Control de prueba en DemoChart',
            weightKg: 14.2,
            heightCm: 95,
          },
        }),
      ),
    )) as HttpResponse<{ id: number }>;
    expect(createEncRes.status).toBe(200);
    expect(
      sessionSvc.session()?.encounters.some((e) => e.id === createEncRes.body?.id),
    ).toBe(true);

    const vacRes = (await firstValueFrom(
      backend.handle(
        new HttpRequest(
          'PUT',
          `/api/doctorchart/patients/${targetPatient.id}/vaccinations/bcg_rn`,
          { applied: true, appliedAt: '2026-11-01' },
        ),
      ),
    )) as HttpResponse<{ schedule: { doses: Array<{ id: string; status: string }> } }>;
    expect(vacRes.status).toBe(200);
    expect(vacRes.body?.schedule?.doses?.some((d) => d.status === 'APLICADA')).toBe(true);

    const clinicsRes = (await firstValueFrom(
      backend.handle(new HttpRequest('GET', '/api/doctorchart/clinics')),
    )) as HttpResponse<{ items: unknown[] }>;
    expect(clinicsRes.status).toBe(200);
    expect(clinicsRes.body?.items.length).toBeGreaterThan(0);

    const bookingsRes = (await firstValueFrom(
      backend.handle(new HttpRequest('GET', '/api/doctorchart/bookings')),
    )) as HttpResponse<{ items: unknown[] }>;
    expect(bookingsRes.status).toBe(200);
    expect(bookingsRes.body?.items.length).toBeGreaterThan(0);

    await expect(
      firstValueFrom(
        backend.handle(
          new HttpRequest('POST', '/api/doctorchart/clinics', { name: 'Nuevo' }),
        ),
      ),
    ).rejects.toMatchObject({ status: 400 } satisfies Partial<HttpErrorResponse>);

    await expect(
      firstValueFrom(
        backend.handle(
          new HttpRequest('POST', '/api/doctorchart/bookings', { patientId: 1 }),
        ),
      ),
    ).rejects.toMatchObject({ status: 400 } satisfies Partial<HttpErrorResponse>);
  });
});
