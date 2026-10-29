import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { environment } from '../../../environments/environment';
import { timeZoneInterceptor } from '../../core/interceptors/time-zone.interceptor';
import {
  MOCK_CAPABILITIES_BY_SCENARIO,
  MOCK_CLINICS_FIXTURES,
  MockClinicsBackend,
} from './clinics.mocks';
import {
  canCreateClinic,
  canEditClinic,
  canTransitionClinicStatus,
  describeCapabilityBanner,
  formatQuotaSummary,
  isCapabilityVerified,
  isValidCanonicalBigInt,
  isValidIanaTimezone,
  parseClinicHttpError,
  validateIanaTimezone,
} from './clinics.models';
import { ClinicsService } from './clinics.service';

describe('ClinicsService HTTP contract & never-fallback behavior', () => {
  let service: ClinicsService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.apiUrl}/clinics`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([timeZoneInterceptor])),
        provideHttpClientTesting(),
        ClinicsService,
      ],
    });
    service = TestBed.inject(ClinicsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('calls GET /clinics with page, size, and optional status filter and never appends timeZone', async () => {
    const promise = firstValueFrom(
      service.listClinics({ page: 1, size: 10, status: 'INACTIVE' }),
    );
    const req = httpMock.expectOne(
      (r) =>
        r.method === 'GET' &&
        r.url === baseUrl &&
        r.params.get('page') === '1' &&
        r.params.get('size') === '10' &&
        r.params.get('status') === 'INACTIVE' &&
        !r.params.has('timeZone'),
    );
    expect(req.request.params.keys()).toEqual(['page', 'size', 'status']);
    req.flush({
      items: [MOCK_CLINICS_FIXTURES[1]],
      page: 1,
      size: 10,
      totalElements: 1,
    });
    const res = await promise;
    expect(res.items).toHaveLength(1);
    expect(res.items[0].id).toBe('102');
  });

  it('calls GET /clinics/capabilities and preserves exact max_clinics key', async () => {
    const promise = firstValueFrom(service.getCapabilities());
    const req = httpMock.expectOne(`${baseUrl}/capabilities`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_CAPABILITIES_BY_SCENARIO.VERIFIED);
    const res = await promise;
    expect(res.entitlements.max_clinics).toBe(3);
    expect(res.usage.counted).toBe(2);
    expect(res.actions.create).toBe(true);
  });

  it('trims fields on POST /clinics and never sends id, status, or version', async () => {
    const promise = firstValueFrom(
      service.createClinic({
        name: '  Consultorio Palermo  ',
        country: ' Argentina ',
        province: ' CABA ',
        city: ' Buenos Aires ',
        address: ' Av. Coronel Díaz 2200 ',
        timezone: ' America/Argentina/Buenos_Aires ',
      }),
    );
    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      name: 'Consultorio Palermo',
      country: 'Argentina',
      province: 'CABA',
      city: 'Buenos Aires',
      address: 'Av. Coronel Díaz 2200',
      timezone: 'America/Argentina/Buenos_Aires',
    });
    req.flush(MOCK_CLINICS_FIXTURES[0]);
    const res = await promise;
    expect(res.id).toBe('103');
  });

  it('sends expectedVersion on PATCH /clinics/:id and PATCH /clinics/:id/status', async () => {
    const patchPromise = firstValueFrom(
      service.updateClinic('103', {
        expectedVersion: '1',
        name: 'Consultorio Belgrano Norte',
      }),
    );
    const patchReq = httpMock.expectOne(`${baseUrl}/103`);
    expect(patchReq.request.method).toBe('PATCH');
    expect(patchReq.request.body).toEqual({
      expectedVersion: '1',
      name: 'Consultorio Belgrano Norte',
    });
    patchReq.flush({ ...MOCK_CLINICS_FIXTURES[0], version: '2' });
    await patchPromise;

    const statusPromise = firstValueFrom(
      service.updateClinicStatus('103', {
        expectedVersion: '2',
        status: 'INACTIVE',
      }),
    );
    const statusReq = httpMock.expectOne(`${baseUrl}/103/status`);
    expect(statusReq.request.method).toBe('PATCH');
    expect(statusReq.request.body).toEqual({
      expectedVersion: '2',
      status: 'INACTIVE',
    });
    statusReq.flush({ ...MOCK_CLINICS_FIXTURES[0], status: 'INACTIVE', version: '3' });
    const updated = await statusPromise;
    expect(updated.status).toBe('INACTIVE');
    expect(updated.version).toBe('3');
  });

  it('propagates HTTP errors directly without falling back to mock fixtures', async () => {
    const promise = firstValueFrom(service.listClinics());
    const req = httpMock.expectOne(baseUrl);
    req.flush(
      { code: 'ENTITLEMENTS_UNAVAILABLE', message: 'Servicio comercial no disponible.' },
      { status: 503, statusText: 'Service Unavailable' },
    );
    await expect(promise).rejects.toMatchObject({ status: 503 });
  });
});

describe('Contract validation & MockClinicsBackend rules (M2-CLINICS-v1)', () => {
  it('accepts known regional zones, UTC, Go aliases, and syntactically reasonable zones unknown to Intl while rejecting unequivocally invalid inputs', async () => {
    const acceptedByFrontendAndGo = [
      'America/Argentina/Buenos_Aires',
      'America/Argentina/Cordoba',
      'America/Argentina/ComodRivadavia',
      'America/New_York',
      'America/Indiana/Indianapolis',
      'America/Knox_IN',
      'America/Port_of_Spain',
      'America/Port-au-Prince',
      'America/Coyhaique',
      'US/Eastern',
      'US/Central',
      'US/Mountain',
      'US/Pacific',
      'Brazil/East',
      'Brazil/DeNoronha',
      'Canada/Pacific',
      'Chile/Continental',
      'Chile/EasterIsland',
      'Mexico/General',
      'Mexico/BajaNorte',
      'Mexico/BajaSur',
      'Europe/Madrid',
      'Europe/Kyiv',
      'Europe/Isle_of_Man',
      'Africa/Dar_es_Salaam',
      'Asia/Kolkata',
      'Australia/Sydney',
      'Australia/NSW',
      'Australia/ACT',
      'Australia/LHI',
      'Antarctica/McMurdo',
      'Antarctica/DumontDUrville',
      'Pacific/Auckland',
      'UTC',
      ' UTC ',
    ];
    for (const tz of acceptedByFrontendAndGo) {
      expect(validateIanaTimezone(tz)).toBeNull();
      expect(isValidIanaTimezone(tz)).toBe(true);
    }

    // Syntactically reasonable zones unknown to the browser's Intl (e.g. future tzdata in Go)
    // must be allowed by the frontend UX validator so they can be sent unmodified to Go.
    const unknownToBrowserButSyntacticallyReasonable = [
      'America/Ciudad_Futura',
      'Antarctica/Base_Austral_2027',
      'Mars/Olympus',
    ];
    for (const tz of unknownToBrowserButSyntacticallyReasonable) {
      expect(validateIanaTimezone(tz)).toBeNull();
      expect(isValidIanaTimezone(tz)).toBe(true);
    }

    // Immediately rejected in the browser (unequivocally invalid syntax, prefixes, offsets, or contradicting Intl resolved segments)
    const rejectedImmediatelyByFrontend = [
      'america/argentina/buenos_aires',
      'AMERICA/ARGENTINA/BUENOS_AIRES',
      'America/argentina/Buenos_Aires',
      'America/Argentina/buenos_aires',
      'America/Argentina/buenos_Aires',
      'America/Argentina/Buenos_aires',
      'America/new_York',
      'America/New_york',
      'us/Eastern',
      'US/eastern',
      'US/EASTERN',
      'Europe/kyiv',
      'America/Port_Of_Spain',
      'America/Port-Au-Prince',
      'Africa/Dar_Es_Salaam',
      'Australia/nsw',
      'Antarctica/Mcmurdo',
      'Antarctica/DumontDurville',
      'Local',
      'local',
      'GMT',
      'ART',
      'EST',
      '+03:00',
      '-03:00',
      'UTC-3',
      'GMT+3',
      'posix/America/New_York',
      'right/America/New_York',
      'Etc/GMT+3',
      'Etc/GMT-3',
      'Etc/UTC',
      'Etc/GMT',
      'utc',
      'Utc',
    ];
    for (const tz of rejectedImmediatelyByFrontend) {
      expect(validateIanaTimezone(tz)).toBe('INVALID_TIMEZONE');
      expect(isValidIanaTimezone(tz)).toBe(false);
    }

    // Variants with non-canonical alias capitalization or unknown zones that pass frontend UX
    // syntax checks are sent to Go and rejected authoritatively by the backend with INVALID_TIMEZONE.
    const backend = new MockClinicsBackend('VERIFIED');
    const rejectedByBackend = [
      'America/ARgentina/Buenos_Aires',
      'Asia/KOLKata',
      'Us/Eastern',
      'Europe/KYiv',
      'Mars/Olympus',
    ];
    for (const tz of rejectedByBackend) {
      expect(validateIanaTimezone(tz)).toBeNull();
      try {
        await firstValueFrom(
          backend.createClinic({
            name: 'Consultorio Prueba',
            country: 'Argentina',
            province: 'CABA',
            city: 'Buenos Aires',
            address: 'Av. Santa Fe 1000',
            timezone: tz,
          }),
        );
        expect.unreachable();
      } catch (err) {
        const parsed = parseClinicHttpError(err, 'Fallback');
        expect(parsed.status).toBe(400);
        expect(parsed.code).toBe('INVALID_REQUEST');
        expect(parsed.fieldErrors['timezone']).toBeDefined();
      }
    }

    // When Go's tzdata recognizes a newer zone unknown to the browser, creation succeeds without rewriting the name.
    backend.allowServerTimezone('America/Ciudad_Futura');
    const createdFuture = await firstValueFrom(
      backend.createClinic({
        name: 'Consultorio Futuro',
        country: 'Argentina',
        province: 'CABA',
        city: 'Buenos Aires',
        address: 'Av. Santa Fe 2000',
        timezone: 'America/Ciudad_Futura',
      }),
    );
    expect(createdFuture.timezone).toBe('America/Ciudad_Futura');

    expect(validateIanaTimezone('')).toBe('REQUIRED');
    expect(validateIanaTimezone('   ')).toBe('REQUIRED');
  });

  it('rejects expired or incomplete VERIFIED entitlements and disables all write actions', () => {
    const baseVerified = structuredClone(MOCK_CAPABILITIES_BY_SCENARIO.VERIFIED);
    baseVerified.entitlements.validUntil = '2026-05-01T00:00:00Z';

    const beforeExpiryMs = Date.parse('2026-04-30T23:59:59Z');
    const atExpiryMs = Date.parse('2026-05-01T00:00:00Z');
    const afterExpiryMs = Date.parse('2026-05-01T00:00:01Z');

    expect(isCapabilityVerified(baseVerified, beforeExpiryMs)).toBe(true);
    expect(canCreateClinic(baseVerified, beforeExpiryMs)).toBe(true);
    expect(canEditClinic({ status: 'ACTIVE' }, baseVerified, beforeExpiryMs)).toBe(true);

    expect(isCapabilityVerified(baseVerified, atExpiryMs)).toBe(false);
    expect(isCapabilityVerified(baseVerified, afterExpiryMs)).toBe(false);
    expect(canCreateClinic(baseVerified, afterExpiryMs)).toBe(false);
    expect(canEditClinic({ status: 'ACTIVE' }, baseVerified, afterExpiryMs)).toBe(false);
    expect(canTransitionClinicStatus({ status: 'ACTIVE' }, 'INACTIVE', baseVerified, afterExpiryMs)).toBe(
      false,
    );
    expect(describeCapabilityBanner(baseVerified, afterExpiryMs)?.showRetryButton).toBe(true);
    expect(formatQuotaSummary(baseVerified, afterExpiryMs)).toContain(
      'cupo comercial temporalmente no verificable',
    );
  });

  it('validates canonical non-negative BIGINT strings for id and version', () => {
    expect(isValidCanonicalBigInt('1', false)).toBe(true);
    expect(isValidCanonicalBigInt('0', false)).toBe(false);
    expect(isValidCanonicalBigInt('0', true)).toBe(true);
    expect(isValidCanonicalBigInt('01', true)).toBe(false);
    expect(isValidCanonicalBigInt('-1', true)).toBe(false);
    expect(isValidCanonicalBigInt('abc', true)).toBe(false);
  });

  it('enforces state transitions and capability action flags', () => {
    const verified = MOCK_CAPABILITIES_BY_SCENARIO.VERIFIED;
    const activeClinic = { status: 'ACTIVE' as const };
    const inactiveClinic = { status: 'INACTIVE' as const };
    const archivedClinic = { status: 'ARCHIVED' as const };

    expect(canTransitionClinicStatus(activeClinic, 'INACTIVE', verified)).toBe(true);
    expect(canTransitionClinicStatus(activeClinic, 'ARCHIVED', verified)).toBe(true);
    expect(canTransitionClinicStatus(activeClinic, 'ACTIVE', verified)).toBe(false);

    expect(canTransitionClinicStatus(inactiveClinic, 'ACTIVE', verified)).toBe(true);
    expect(canTransitionClinicStatus(inactiveClinic, 'ARCHIVED', verified)).toBe(true);

    expect(canTransitionClinicStatus(archivedClinic, 'INACTIVE', verified)).toBe(true);
    expect(canTransitionClinicStatus(archivedClinic, 'ACTIVE', verified)).toBe(false);
    expect(canEditClinic(archivedClinic, verified)).toBe(false);

    const limitReached = MOCK_CAPABILITIES_BY_SCENARIO.LIMIT_REACHED;
    expect(canCreateClinic(limitReached)).toBe(false);
    expect(canTransitionClinicStatus(archivedClinic, 'INACTIVE', limitReached)).toBe(false);
    expect(canEditClinic(activeClinic, limitReached)).toBe(true);

    const overQuota = MOCK_CAPABILITIES_BY_SCENARIO.OVER_QUOTA_DOWNGRADE;
    expect(canEditClinic(activeClinic, overQuota)).toBe(false);
    expect(canTransitionClinicStatus(inactiveClinic, 'ACTIVE', overQuota)).toBe(false);
    expect(canTransitionClinicStatus(activeClinic, 'INACTIVE', overQuota)).toBe(true);
    expect(canTransitionClinicStatus(activeClinic, 'ARCHIVED', overQuota)).toBe(true);
  });

  it('recomputes MockClinicsBackend quota usage and blocks invalid mutations', async () => {
    const backend = new MockClinicsBackend('LIMIT_REACHED');
    const initialList = await firstValueFrom(backend.listClinics());
    expect(initialList.items.map((c) => c.id)).toEqual(['101', '102', '103']);

    // Idempotent same-status request with valid version returns 200 without incrementing version
    const idempotent = await firstValueFrom(
      backend.updateClinicStatus('103', { expectedVersion: '1', status: 'ACTIVE' }),
    );
    expect(idempotent.status).toBe('ACTIVE');
    expect(idempotent.version).toBe('1');

    await expect(
      firstValueFrom(
        backend.createClinic({
          name: 'Nuevo',
          country: 'Argentina',
          province: 'CABA',
          city: 'Buenos Aires',
          address: 'Calle 123',
          timezone: 'America/Argentina/Buenos_Aires',
        }),
      ),
    ).rejects.toMatchObject({ status: 409 });

    // Archive one ACTIVE clinic ('103', version '1') -> frees 1 slot!
    const archived = await firstValueFrom(
      backend.updateClinicStatus('103', { expectedVersion: '1', status: 'ARCHIVED' }),
    );
    expect(archived.status).toBe('ARCHIVED');
    expect(archived.version).toBe('2');

    const capsAfterArchive = await firstValueFrom(backend.getCapabilities());
    expect(capsAfterArchive.usage.counted).toBe(1);
    expect(capsAfterArchive.actions.create).toBe(true);
    expect(capsAfterArchive.actions.restore).toBe(true);
    expect(capsAfterArchive.reason).toBeNull();

    // Editing an ARCHIVED clinic must fail with 409 CLINIC_STATE_CONFLICT
    try {
      await firstValueFrom(
        backend.updateClinic('103', { expectedVersion: '2', name: 'Intento editar archivado' }),
      );
      expect.unreachable();
    } catch (err) {
      const parsed = parseClinicHttpError(err, 'Fallback');
      expect(parsed.status).toBe(409);
      expect(parsed.code).toBe('CLINIC_STATE_CONFLICT');
      expect(parsed.isStateConflict).toBe(true);
    }
  });
});
