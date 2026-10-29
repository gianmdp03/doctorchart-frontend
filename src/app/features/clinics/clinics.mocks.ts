import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {
  CLINIC_FIELD_LIMITS,
  Clinic,
  ClinicApiError,
  ClinicCapabilities,
  ClinicEditableField,
  ClinicEntitlements,
  ClinicFieldError,
  ClinicFieldErrorCode,
  ClinicListResponse,
  ClinicStatus,
  CreateClinicRequest,
  UpdateClinicRequest,
  UpdateClinicStatusRequest,
  isValidCanonicalBigInt,
  validateClinicTextField,
  validateIanaTimezone,
} from './clinics.models';

export interface ClinicsListQuery {
  page?: number;
  size?: number;
  status?: ClinicStatus;
}

export interface ClinicsTransport {
  listClinics(query?: ClinicsListQuery): Observable<ClinicListResponse>;
  getCapabilities(): Observable<ClinicCapabilities>;
  getClinic(id: string): Observable<Clinic>;
  createClinic(payload: CreateClinicRequest): Observable<Clinic>;
  updateClinic(id: string, payload: UpdateClinicRequest): Observable<Clinic>;
  updateClinicStatus(id: string, payload: UpdateClinicStatusRequest): Observable<Clinic>;
}

export const MOCK_CLINICS_FIXTURES: readonly Clinic[] = [
  {
    id: '103',
    name: 'Consultorio Belgrano',
    country: 'Argentina',
    province: 'Ciudad Autónoma de Buenos Aires',
    city: 'Buenos Aires',
    address: 'Av. Cabildo 2150 Piso 4 Dto B',
    timezone: 'America/Argentina/Buenos_Aires',
    status: 'ACTIVE',
    version: '1',
    createdAt: '2026-04-18T14:00:00Z',
    updatedAt: '2026-04-18T14:00:00Z',
  },
  {
    id: '102',
    name: 'Centro Médico Recoleta',
    country: 'Argentina',
    province: 'Ciudad Autónoma de Buenos Aires',
    city: 'Buenos Aires',
    address: 'Av. Santa Fe 1840 Piso 2',
    timezone: 'America/Argentina/Buenos_Aires',
    status: 'INACTIVE',
    version: '2',
    createdAt: '2026-04-16T10:30:00Z',
    updatedAt: '2026-04-17T16:15:00Z',
  },
  {
    id: '101',
    name: 'Anexo San Isidro (Histórico)',
    country: 'Argentina',
    province: 'Buenos Aires',
    city: 'San Isidro',
    address: 'Chacabuco 410',
    timezone: 'America/Argentina/Buenos_Aires',
    status: 'ARCHIVED',
    version: '3',
    createdAt: '2026-03-10T09:00:00Z',
    updatedAt: '2026-04-01T11:20:00Z',
  },
];

export type MockClinicsScenarioKey =
  | 'EMPTY'
  | 'VERIFIED'
  | 'ZERO_QUOTA'
  | 'LIMIT_REACHED'
  | 'OVER_QUOTA_DOWNGRADE'
  | 'UNLIMITED'
  | 'DENIED'
  | 'UNAVAILABLE';

export const MOCK_CAPABILITIES_BY_SCENARIO: Readonly<
  Record<MockClinicsScenarioKey, ClinicCapabilities>
> = {
  EMPTY: {
    entitlements: {
      status: 'VERIFIED',
      revision: 'rev-empty-1',
      validUntil: '2099-01-01T00:00:00Z',
      clinicManagement: true,
      max_clinics: 2,
    },
    usage: { counted: 0 },
    actions: {
      create: true,
      edit: true,
      activate: true,
      deactivate: true,
      archive: true,
      restore: true,
    },
    reason: null,
  },
  VERIFIED: {
    entitlements: {
      status: 'VERIFIED',
      revision: 'rev-verified-1',
      validUntil: '2099-01-01T00:00:00Z',
      clinicManagement: true,
      max_clinics: 3,
    },
    usage: { counted: 2 },
    actions: {
      create: true,
      edit: true,
      activate: true,
      deactivate: true,
      archive: true,
      restore: true,
    },
    reason: null,
  },
  ZERO_QUOTA: {
    entitlements: {
      status: 'VERIFIED',
      revision: 'rev-zero-1',
      validUntil: '2099-01-01T00:00:00Z',
      clinicManagement: true,
      max_clinics: 0,
    },
    usage: { counted: 0 },
    actions: {
      create: false,
      edit: true,
      activate: true,
      deactivate: true,
      archive: true,
      restore: false,
    },
    reason: 'CLINIC_LIMIT_REACHED',
  },
  LIMIT_REACHED: {
    entitlements: {
      status: 'VERIFIED',
      revision: 'rev-limit-1',
      validUntil: '2099-01-01T00:00:00Z',
      clinicManagement: true,
      max_clinics: 2,
    },
    usage: { counted: 2 },
    actions: {
      create: false,
      edit: true,
      activate: true,
      deactivate: true,
      archive: true,
      restore: false,
    },
    reason: 'CLINIC_LIMIT_REACHED',
  },
  OVER_QUOTA_DOWNGRADE: {
    entitlements: {
      status: 'VERIFIED',
      revision: 'rev-downgrade-1',
      validUntil: '2099-01-01T00:00:00Z',
      clinicManagement: true,
      max_clinics: 1,
    },
    usage: { counted: 2 },
    actions: {
      create: false,
      edit: false,
      activate: false,
      deactivate: true,
      archive: true,
      restore: false,
    },
    reason: 'CLINIC_LIMIT_REACHED',
  },
  UNLIMITED: {
    entitlements: {
      status: 'VERIFIED',
      revision: 'rev-unlimited-1',
      validUntil: '2099-01-01T00:00:00Z',
      clinicManagement: true,
      max_clinics: -1,
    },
    usage: { counted: 2 },
    actions: {
      create: true,
      edit: true,
      activate: true,
      deactivate: true,
      archive: true,
      restore: true,
    },
    reason: null,
  },
  DENIED: {
    entitlements: {
      status: 'DENIED',
      revision: 'rev-denied-1',
      validUntil: '2099-01-01T00:00:00Z',
      clinicManagement: false,
      max_clinics: 0,
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
    reason: 'CLINIC_MANAGEMENT_DISABLED',
  },
  UNAVAILABLE: {
    entitlements: {
      status: 'UNAVAILABLE',
      revision: null,
      validUntil: null,
      clinicManagement: null,
      max_clinics: null,
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
    reason: 'ENTITLEMENTS_UNAVAILABLE',
  },
};

export function createMockHttpError(
  status: number,
  body: ClinicApiError,
  url = '/api/doctorchart/clinics',
): HttpErrorResponse {
  return new HttpErrorResponse({
    status,
    statusText: body.code,
    url,
    error: structuredClone(body),
  });
}

export const MOCK_CLINIC_ERRORS = {
  versionConflict: (): HttpErrorResponse =>
    createMockHttpError(409, {
      code: 'VERSION_CONFLICT',
      message: 'El consultorio fue modificado por otra operación.',
    }),
  invalidRequest: (errors: ClinicFieldError[]): HttpErrorResponse =>
    createMockHttpError(400, {
      code: 'INVALID_REQUEST',
      message: 'Los datos del consultorio no son válidos.',
      errors,
    }),
  limitReached: (): HttpErrorResponse =>
    createMockHttpError(409, {
      code: 'CLINIC_LIMIT_REACHED',
      message: 'Alcanzaste el límite de consultorios de tu plan.',
    }),
  stateConflict: (message = 'Transición de estado no permitida para el consultorio.'): HttpErrorResponse =>
    createMockHttpError(409, {
      code: 'CLINIC_STATE_CONFLICT',
      message,
    }),
  managementDisabled: (): HttpErrorResponse =>
    createMockHttpError(403, {
      code: 'CLINIC_MANAGEMENT_DISABLED',
      message: 'Tu plan actual no incluye administración de consultorios.',
    }),
  entitlementsUnavailable: (): HttpErrorResponse =>
    createMockHttpError(503, {
      code: 'ENTITLEMENTS_UNAVAILABLE',
      message: 'No se pudieron verificar los permisos comerciales.',
    }),
  notFound: (): HttpErrorResponse =>
    createMockHttpError(404, {
      code: 'CLINIC_NOT_FOUND',
      message: 'Consultorio no encontrado.',
    }),
};

/**
 * Deterministic in-memory implementation of the M2-CLINICS-v1 contract.
 * Used exclusively in unit/integration tests and explicit development harnesses.
 */
export class MockClinicsBackend implements ClinicsTransport {
  private clinics: Clinic[];
  private entitlements: ClinicEntitlements;
  private nextId = 200n;
  private readonly extraServerTimezones = new Set<string>();
  private readonly rejectedServerTimezones = new Set<string>();

  constructor(scenario: MockClinicsScenarioKey = 'VERIFIED', initialClinics?: readonly Clinic[]) {
    this.entitlements = structuredClone(MOCK_CAPABILITIES_BY_SCENARIO[scenario].entitlements);
    if (initialClinics) {
      this.clinics = structuredClone([...initialClinics]);
    } else if (scenario === 'EMPTY' || scenario === 'ZERO_QUOTA') {
      this.clinics = [];
    } else {
      this.clinics = structuredClone([...MOCK_CLINICS_FIXTURES]);
    }
  }

  allowServerTimezone(timezone: string): void {
    this.extraServerTimezones.add(timezone.trim());
  }

  rejectServerTimezone(timezone: string): void {
    this.rejectedServerTimezones.add(timezone.trim());
  }

  setScenario(scenario: MockClinicsScenarioKey, customClinics?: readonly Clinic[]): void {
    this.entitlements = structuredClone(MOCK_CAPABILITIES_BY_SCENARIO[scenario].entitlements);
    if (customClinics) {
      this.clinics = structuredClone([...customClinics]);
    } else if (scenario === 'EMPTY' || scenario === 'ZERO_QUOTA') {
      this.clinics = [];
    } else {
      this.clinics = structuredClone([...MOCK_CLINICS_FIXTURES]);
    }
  }

  setEntitlements(entitlements: ClinicEntitlements): void {
    this.entitlements = structuredClone(entitlements);
  }

  setClinics(clinics: readonly Clinic[]): void {
    this.clinics = structuredClone([...clinics]);
  }

  snapshotClinics(): Clinic[] {
    return structuredClone(this.clinics);
  }

  private computeCapabilities(): ClinicCapabilities {
    const counted = this.clinics.filter(
      (c) => c.status === 'ACTIVE' || c.status === 'INACTIVE',
    ).length;
    const ent = structuredClone(this.entitlements);

    if (ent.status === 'UNAVAILABLE') {
      return {
        entitlements: ent,
        usage: { counted },
        actions: {
          create: false,
          edit: false,
          activate: false,
          deactivate: false,
          archive: false,
          restore: false,
        },
        reason: 'ENTITLEMENTS_UNAVAILABLE',
      };
    }

    if (ent.status === 'DENIED' || ent.clinicManagement === false) {
      return {
        entitlements: ent,
        usage: { counted },
        actions: {
          create: false,
          edit: false,
          activate: false,
          deactivate: false,
          archive: false,
          restore: false,
        },
        reason: 'CLINIC_MANAGEMENT_DISABLED',
      };
    }

    const expiresAtMs = typeof ent.validUntil === 'string' ? Date.parse(ent.validUntil) : Number.NaN;
    if (
      typeof ent.revision !== 'string' ||
      ent.revision.trim().length === 0 ||
      ent.clinicManagement !== true ||
      typeof ent.max_clinics !== 'number' ||
      !Number.isInteger(ent.max_clinics) ||
      ent.max_clinics < -1 ||
      !Number.isFinite(expiresAtMs) ||
      expiresAtMs <= Date.now()
    ) {
      return {
        entitlements: {
          status: 'UNAVAILABLE',
          revision: null,
          validUntil: null,
          clinicManagement: null,
          max_clinics: null,
        },
        usage: { counted },
        actions: {
          create: false,
          edit: false,
          activate: false,
          deactivate: false,
          archive: false,
          restore: false,
        },
        reason: 'ENTITLEMENTS_UNAVAILABLE',
      };
    }

    const max = ent.max_clinics ?? 0;
    const hasSlot = max === -1 || counted < max;
    const withinQuota = max === -1 || counted <= max;

    return {
      entitlements: ent,
      usage: { counted },
      actions: {
        create: hasSlot,
        edit: withinQuota,
        activate: withinQuota,
        deactivate: true,
        archive: true,
        restore: hasSlot,
      },
      reason: hasSlot ? null : 'CLINIC_LIMIT_REACHED',
    };
  }

  getCapabilities(): Observable<ClinicCapabilities> {
    return of(this.computeCapabilities());
  }

  listClinics(query?: ClinicsListQuery): Observable<ClinicListResponse> {
    const page = query?.page ?? 0;
    const size = query?.size ?? 20;
    const status = query?.status;

    const errors: ClinicFieldError[] = [];
    if (!Number.isInteger(page) || page < 0) {
      errors.push({ path: 'page', code: 'INVALID' });
    }
    if (!Number.isInteger(size) || size < 1 || size > 100) {
      errors.push({ path: 'size', code: 'INVALID' });
    }
    if (status !== undefined && status !== 'ACTIVE' && status !== 'INACTIVE' && status !== 'ARCHIVED') {
      errors.push({ path: 'status', code: 'INVALID' });
    }
    if (errors.length > 0) {
      return throwError(() => MOCK_CLINIC_ERRORS.invalidRequest(errors));
    }

    const sorted = [...this.clinics]
      .filter((item) => !status || item.status === status)
      .sort((a, b) => Number(BigInt(a.id) - BigInt(b.id)));

    const start = page * size;
    const items = structuredClone(sorted.slice(start, start + size));
    return of({
      items,
      page,
      size,
      totalElements: sorted.length,
    });
  }

  getClinic(id: string): Observable<Clinic> {
    if (!isValidCanonicalBigInt(id, false)) {
      return throwError(() =>
        MOCK_CLINIC_ERRORS.invalidRequest([{ path: 'id', code: 'INVALID' }]),
      );
    }
    const found = this.clinics.find((item) => item.id === id);
    if (!found) {
      return throwError(() => MOCK_CLINIC_ERRORS.notFound());
    }
    return of(structuredClone(found));
  }

  createClinic(payload: CreateClinicRequest): Observable<Clinic> {
    const caps = this.computeCapabilities();
    if (caps.entitlements.status === 'UNAVAILABLE') {
      return throwError(() => MOCK_CLINIC_ERRORS.entitlementsUnavailable());
    }
    if (caps.entitlements.status === 'DENIED' || !caps.entitlements.clinicManagement) {
      return throwError(() => MOCK_CLINIC_ERRORS.managementDisabled());
    }

    const fieldErrors = this.validateAllFields(payload);
    if (fieldErrors.length > 0) {
      return throwError(() => MOCK_CLINIC_ERRORS.invalidRequest(fieldErrors));
    }

    if (!caps.actions.create) {
      return throwError(() => MOCK_CLINIC_ERRORS.limitReached());
    }

    this.nextId += 1n;
    const now = '2026-04-18T18:00:00Z';
    const created: Clinic = {
      id: this.nextId.toString(),
      name: payload.name.trim(),
      country: payload.country.trim(),
      province: payload.province.trim(),
      city: payload.city.trim(),
      address: payload.address.trim(),
      timezone: payload.timezone.trim(),
      status: 'ACTIVE',
      version: '0',
      createdAt: now,
      updatedAt: now,
    };
    this.clinics.push(created);
    return of(structuredClone(created));
  }

  updateClinic(id: string, payload: UpdateClinicRequest): Observable<Clinic> {
    if (!isValidCanonicalBigInt(id, false)) {
      return throwError(() =>
        MOCK_CLINIC_ERRORS.invalidRequest([{ path: 'id', code: 'INVALID' }]),
      );
    }
    if (!payload.expectedVersion || !isValidCanonicalBigInt(payload.expectedVersion, true)) {
      return throwError(() =>
        MOCK_CLINIC_ERRORS.invalidRequest([{ path: 'expectedVersion', code: 'INVALID' }]),
      );
    }

    const caps = this.computeCapabilities();
    if (caps.entitlements.status === 'UNAVAILABLE') {
      return throwError(() => MOCK_CLINIC_ERRORS.entitlementsUnavailable());
    }
    if (caps.entitlements.status === 'DENIED' || !caps.entitlements.clinicManagement) {
      return throwError(() => MOCK_CLINIC_ERRORS.managementDisabled());
    }

    const editableKeys: ClinicEditableField[] = [
      'name',
      'country',
      'province',
      'city',
      'address',
      'timezone',
    ];
    const providedKeys = editableKeys.filter((k) => payload[k] !== undefined);
    if (providedKeys.length === 0) {
      return throwError(() =>
        MOCK_CLINIC_ERRORS.invalidRequest([{ path: '', code: 'EMPTY_PATCH' }]),
      );
    }

    const fieldErrors: ClinicFieldError[] = [];
    for (const key of providedKeys) {
      const val = payload[key] ?? '';
      const code =
        key === 'timezone' ? this.validateServerTimezone(val) : validateClinicTextField(key, val);
      if (code) {
        fieldErrors.push({ path: key, code });
      }
    }
    if (fieldErrors.length > 0) {
      return throwError(() => MOCK_CLINIC_ERRORS.invalidRequest(fieldErrors));
    }

    const idx = this.clinics.findIndex((item) => item.id === id);
    if (idx === -1) {
      return throwError(() => MOCK_CLINIC_ERRORS.notFound());
    }
    const current = this.clinics[idx];

    if (current.status === 'ARCHIVED') {
      return throwError(() =>
        MOCK_CLINIC_ERRORS.stateConflict(
          'Un consultorio archivado es de solo lectura hasta restaurarlo a inactivo.',
        ),
      );
    }
    if (!caps.actions.edit) {
      return throwError(() => MOCK_CLINIC_ERRORS.limitReached());
    }
    if (current.version !== payload.expectedVersion) {
      return throwError(() => MOCK_CLINIC_ERRORS.versionConflict());
    }

    const updated: Clinic = {
      ...current,
      name: payload.name !== undefined ? payload.name.trim() : current.name,
      country: payload.country !== undefined ? payload.country.trim() : current.country,
      province: payload.province !== undefined ? payload.province.trim() : current.province,
      city: payload.city !== undefined ? payload.city.trim() : current.city,
      address: payload.address !== undefined ? payload.address.trim() : current.address,
      timezone: payload.timezone !== undefined ? payload.timezone.trim() : current.timezone,
      version: (BigInt(current.version) + 1n).toString(),
      updatedAt: '2026-04-18T18:30:00Z',
    };
    this.clinics[idx] = updated;
    return of(structuredClone(updated));
  }

  updateClinicStatus(id: string, payload: UpdateClinicStatusRequest): Observable<Clinic> {
    if (!isValidCanonicalBigInt(id, false)) {
      return throwError(() =>
        MOCK_CLINIC_ERRORS.invalidRequest([{ path: 'id', code: 'INVALID' }]),
      );
    }
    if (!payload.expectedVersion || !isValidCanonicalBigInt(payload.expectedVersion, true)) {
      return throwError(() =>
        MOCK_CLINIC_ERRORS.invalidRequest([{ path: 'expectedVersion', code: 'INVALID' }]),
      );
    }
    if (
      payload.status !== 'ACTIVE' &&
      payload.status !== 'INACTIVE' &&
      payload.status !== 'ARCHIVED'
    ) {
      return throwError(() =>
        MOCK_CLINIC_ERRORS.invalidRequest([{ path: 'status', code: 'INVALID' }]),
      );
    }

    const caps = this.computeCapabilities();
    if (caps.entitlements.status === 'UNAVAILABLE') {
      return throwError(() => MOCK_CLINIC_ERRORS.entitlementsUnavailable());
    }
    if (caps.entitlements.status === 'DENIED' || !caps.entitlements.clinicManagement) {
      return throwError(() => MOCK_CLINIC_ERRORS.managementDisabled());
    }

    const idx = this.clinics.findIndex((item) => item.id === id);
    if (idx === -1) {
      return throwError(() => MOCK_CLINIC_ERRORS.notFound());
    }
    const current = this.clinics[idx];

    if (current.version !== payload.expectedVersion) {
      return throwError(() => MOCK_CLINIC_ERRORS.versionConflict());
    }
    if (current.status === payload.status) {
      return of(structuredClone(current));
    }
    if (current.status === 'ARCHIVED' && payload.status === 'ACTIVE') {
      return throwError(() =>
        MOCK_CLINIC_ERRORS.stateConflict(
          'Un consultorio archivado debe restaurarse primero a estado INACTIVE.',
        ),
      );
    }
    if (current.status === 'ARCHIVED' && payload.status === 'INACTIVE' && !caps.actions.restore) {
      return throwError(() => MOCK_CLINIC_ERRORS.limitReached());
    }
    if (current.status === 'INACTIVE' && payload.status === 'ACTIVE' && !caps.actions.activate) {
      return throwError(() => MOCK_CLINIC_ERRORS.limitReached());
    }

    const updated: Clinic = {
      ...current,
      status: payload.status,
      version: (BigInt(current.version) + 1n).toString(),
      updatedAt: '2026-04-18T19:00:00Z',
    };
    this.clinics[idx] = updated;
    return of(structuredClone(updated));
  }

  private validateAllFields(payload: CreateClinicRequest): ClinicFieldError[] {
    const errors: ClinicFieldError[] = [];
    const textFields: Exclude<ClinicEditableField, 'timezone'>[] = [
      'name',
      'country',
      'province',
      'city',
      'address',
    ];
    for (const field of textFields) {
      const code = validateClinicTextField(field, payload[field] ?? '');
      if (code) {
        errors.push({ path: field, code });
      }
    }
    const tzCode = this.validateServerTimezone(payload.timezone ?? '');
    if (tzCode) {
      errors.push({ path: 'timezone', code: tzCode });
    }
    return errors;
  }

  /**
   * Simulates the authoritative Go (`time.LoadLocation` + `clinics.go`) and
   * PostgreSQL (`pg_timezone_names`) validation in tests.
   */
  private validateServerTimezone(raw: string): ClinicFieldErrorCode | null {
    const clientCode = validateIanaTimezone(raw);
    if (clientCode) {
      return clientCode;
    }
    const trimmed = raw.trim();
    if (this.rejectedServerTimezones.has(trimmed)) {
      return 'INVALID_TIMEZONE';
    }
    if (trimmed === 'UTC' || this.extraServerTimezones.has(trimmed)) {
      return null;
    }
    if (
      trimmed.startsWith('Us/') ||
      /(?:^|\/|[ _-])[A-Z]{2,}[a-z]/.test(trimmed.replace('DumontDUrville', 'DumontDurville'))
    ) {
      return 'INVALID_TIMEZONE';
    }
    try {
      const resolved = new Intl.DateTimeFormat('es-AR', { timeZone: trimmed }).resolvedOptions()
        .timeZone;
      return resolved ? null : 'INVALID_TIMEZONE';
    } catch {
      return 'INVALID_TIMEZONE';
    }
  }
}
