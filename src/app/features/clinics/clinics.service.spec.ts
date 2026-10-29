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
  it('validates the full M2-CLINICS-v1 IANA timezone matrix and rejects fixed offsets, Etc/*, and wrong casing', () => {
    const accepted = [
      'America/Argentina/Buenos_Aires',
      'America/New_York',
      'Europe/Madrid',
      'Asia/Kolkata',
      'Pacific/Auckland',
      'America/Coyhaique',
      'UTC',
      ' UTC ',
    ];
    for (const tz of accepted) {
      expect(validateIanaTimezone(tz)).toBeNull();
      expect(isValidIanaTimezone(tz)).toBe(true);
    }

    const rejectedInvalidTimezone = [
      'Local',
      'GMT',
      'ART',
      'EST',
      '+03:00',
      'UTC-3',
      'posix/America/New_York',
      'right/America/New_York',
      'Mars/Olympus',
      'Etc/GMT+3',
      'Etc/GMT-3',
      'Etc/UTC',
      'Etc/GMT',
      'america/argentina/buenos_aires',
      'AMERICA/ARGENTINA/BUENOS_AIRES',
      'utc',
    ];
    for (const tz of rejectedInvalidTimezone) {
      expect(validateIanaTimezone(tz)).toBe('INVALID_TIMEZONE');
      expect(isValidIanaTimezone(tz)).toBe(false);
    }

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
