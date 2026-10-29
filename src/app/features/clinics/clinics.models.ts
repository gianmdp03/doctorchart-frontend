import { displayLocalDate } from '../../core/date/display-date';

export type ClinicStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export type ClinicStatusFilter = 'ALL' | ClinicStatus;

export interface Clinic {
  id: string;
  name: string;
  country: string;
  province: string;
  city: string;
  address: string;
  timezone: string;
  status: ClinicStatus;
  version: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClinicListResponse {
  items: Clinic[];
  page: number;
  size: number;
  totalElements: number;
}

export type ClinicEntitlementStatus = 'VERIFIED' | 'DENIED' | 'UNAVAILABLE';

export type ClinicCapabilityReason =
  | 'ENTITLEMENTS_UNAVAILABLE'
  | 'CLINIC_MANAGEMENT_DISABLED'
  | 'CLINIC_LIMIT_REACHED'
  | null;

export interface ClinicEntitlements {
  status: ClinicEntitlementStatus;
  revision: string | null;
  validUntil: string | null;
  clinicManagement: boolean | null;
  max_clinics: number | null;
}

export interface ClinicUsage {
  counted: number;
}

export interface ClinicActions {
  create: boolean;
  edit: boolean;
  activate: boolean;
  deactivate: boolean;
  archive: boolean;
  restore: boolean;
}

export interface ClinicCapabilities {
  entitlements: ClinicEntitlements;
  usage: ClinicUsage;
  actions: ClinicActions;
  reason: ClinicCapabilityReason;
}

export interface CreateClinicRequest {
  name: string;
  country: string;
  province: string;
  city: string;
  address: string;
  timezone: string;
}

export interface UpdateClinicRequest {
  expectedVersion: string;
  name?: string;
  country?: string;
  province?: string;
  city?: string;
  address?: string;
  timezone?: string;
}

export interface UpdateClinicStatusRequest {
  expectedVersion: string;
  status: ClinicStatus;
}

export type ClinicErrorCode =
  | 'INVALID_REQUEST'
  | 'UNAUTHENTICATED'
  | 'FORBIDDEN'
  | 'DOCTORCHART_PLAN_REQUIRED'
  | 'CLINIC_MANAGEMENT_DISABLED'
  | 'CLINIC_NOT_FOUND'
  | 'ONBOARDING_REQUIRED'
  | 'VERSION_CONFLICT'
  | 'CLINIC_LIMIT_REACHED'
  | 'CLINIC_STATE_CONFLICT'
  | 'ENTITLEMENTS_UNAVAILABLE'
  | 'INTERNAL_ERROR';

export type ClinicFieldErrorCode =
  | 'REQUIRED'
  | 'TOO_LONG'
  | 'INVALID'
  | 'INVALID_VALUE'
  | 'INVALID_VERSION'
  | 'INVALID_STATUS'
  | 'INVALID_TIMEZONE'
  | 'NEGATIVE'
  | 'EMPTY_PATCH'
  | 'UNKNOWN_FIELD';

export interface ClinicFieldError {
  path: string;
  code: ClinicFieldErrorCode | string;
}

export interface ClinicApiError {
  code: ClinicErrorCode | string;
  message: string;
  errors?: ClinicFieldError[];
}

export type ClinicEditableField =
  | 'name'
  | 'country'
  | 'province'
  | 'city'
  | 'address'
  | 'timezone';

export const CLINIC_FIELD_LIMITS: Readonly<Record<ClinicEditableField, number>> = {
  name: 160,
  country: 100,
  province: 160,
  city: 160,
  address: 255,
  timezone: 100,
};

export const DEFAULT_CLINIC_TIMEZONE = 'America/Argentina/Buenos_Aires';
export const DEFAULT_CLINIC_COUNTRY = 'Argentina';

export interface TimezoneOption {
  value: string;
  label: string;
}

export const COMMON_IANA_TIMEZONES: readonly TimezoneOption[] = [
  {
    value: 'America/Argentina/Buenos_Aires',
    label: 'America/Argentina/Buenos_Aires (Buenos Aires, CABA)',
  },
  {
    value: 'America/Argentina/Cordoba',
    label: 'America/Argentina/Cordoba (Córdoba, Santa Fe, Rosario)',
  },
  {
    value: 'America/Argentina/Mendoza',
    label: 'America/Argentina/Mendoza (Mendoza)',
  },
  {
    value: 'America/Argentina/Salta',
    label: 'America/Argentina/Salta (Salta, Neuquén, Río Negro)',
  },
  {
    value: 'America/Argentina/Tucuman',
    label: 'America/Argentina/Tucuman (Tucumán)',
  },
  {
    value: 'America/Argentina/Ushuaia',
    label: 'America/Argentina/Ushuaia (Tierra del Fuego)',
  },
  {
    value: 'America/Montevideo',
    label: 'America/Montevideo (Uruguay)',
  },
  {
    value: 'America/Santiago',
    label: 'America/Santiago (Chile)',
  },
  {
    value: 'America/Asuncion',
    label: 'America/Asuncion (Paraguay)',
  },
  {
    value: 'America/Sao_Paulo',
    label: 'America/Sao_Paulo (Brasil)',
  },
  {
    value: 'America/Lima',
    label: 'America/Lima (Perú)',
  },
  {
    value: 'America/Bogota',
    label: 'America/Bogota (Colombia)',
  },
  {
    value: 'America/Mexico_City',
    label: 'America/Mexico_City (México)',
  },
  {
    value: 'Europe/Madrid',
    label: 'Europe/Madrid (España)',
  },
  {
    value: 'UTC',
    label: 'UTC (Tiempo Universal Coordinado)',
  },
];

const CANONICAL_BIGINT_DECIMAL = /^(0|[1-9]\d*)$/;
const POSITIVE_BIGINT_DECIMAL = /^[1-9]\d*$/;
const MAX_SIGNED_INT64 = 9223372036854775807n;

export function isValidCanonicalBigInt(value: string, allowZero = false): boolean {
  const pattern = allowZero ? CANONICAL_BIGINT_DECIMAL : POSITIVE_BIGINT_DECIMAL;
  if (!pattern.test(value)) {
    return false;
  }
  try {
    const parsed = BigInt(value);
    return allowZero ? parsed >= 0n && parsed <= MAX_SIGNED_INT64 : parsed > 0n && parsed <= MAX_SIGNED_INT64;
  } catch {
    return false;
  }
}

const FORBIDDEN_TIMEZONE_PREFIX = /^(?:posix|right|etc)\//i;
const FORBIDDEN_FIXED_OFFSET = /^(?:[+-]\d|utc[+-]|gmt[+-])/i;
const IANA_SYNTAX_PATTERN =
  /^[A-Z][A-Za-z0-9+-]*(?:_[A-Za-z0-9+-]+)*(?:\/[A-Z][A-Za-z0-9+-]*(?:_[A-Za-z0-9+-]+)*)+$/;

/**
 * Uses `Intl.DateTimeFormat` as a UX helper when the browser recognizes the
 * timezone, without treating `Intl` as the sole authorized list of identifiers
 * or reproducing `tzdb` capitalization exceptions in JavaScript.
 *
 * - If `Intl` resolves the identifier, any `/` segment present in both the
 *   candidate and the resolved identifier must match its canonical casing.
 * - If `Intl` canonicalizes an alias to a different name (e.g. `US/Eastern` ->
 *   `America/New_York`, `Asia/Kolkata` -> `Asia/Calcutta`) or does not recognize
 *   a syntactically valid identifier (e.g. a newer `tzdata` release in Go),
 *   this function returns `true` so the candidate can be sent unmodified to Go.
 */
function hasIntlCompatibleCasing(candidate: string): boolean {
  try {
    const resolved = new Intl.DateTimeFormat('es-AR', { timeZone: candidate }).resolvedOptions()
      .timeZone;
    if (!resolved) {
      return true;
    }
    const candidateSegments = candidate.split('/');
    const resolvedSegments = resolved.split('/');
    for (const segment of candidateSegments) {
      const matchingResolved = resolvedSegments.find(
        (resSeg) => resSeg.toLowerCase() === segment.toLowerCase(),
      );
      if (matchingResolved !== undefined && matchingResolved !== segment) {
        return false;
      }
    }
    return true;
  } catch {
    return true;
  }
}

/**
 * Frontend UX validator for clinic timezone input.
 *
 * Immediately rejects unequivocally invalid inputs (empty values, strings
 * exceeding `CLINIC_FIELD_LIMITS.timezone`, `'Local'`, fixed offsets,
 * `Etc/*`, `posix/*`, `right/*`, malformed paths, and capitalization that
 * contradicts segments resolved by `Intl`).
 *
 * Accepting a value here (`null`) only allows sending it unmodified to the
 * backend; it does NOT declare the timezone valid on the server. The Go backend
 * (`tzdata`) and PostgreSQL are the definitive authority and reject unknown
 * zones or invalid alias capitalization with `400 INVALID_REQUEST`
 * (`INVALID_TIMEZONE`).
 */
export function validateIanaTimezone(raw: string): ClinicFieldErrorCode | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return 'REQUIRED';
  }
  if ([...trimmed].length > CLINIC_FIELD_LIMITS.timezone) {
    return 'TOO_LONG';
  }
  if (trimmed === 'UTC') {
    return null;
  }
  if (trimmed.toLowerCase() === 'local' || trimmed.toLowerCase() === 'utc') {
    return 'INVALID_TIMEZONE';
  }
  if (FORBIDDEN_TIMEZONE_PREFIX.test(trimmed) || FORBIDDEN_FIXED_OFFSET.test(trimmed)) {
    return 'INVALID_TIMEZONE';
  }
  if (!IANA_SYNTAX_PATTERN.test(trimmed) || !/[a-z]/.test(trimmed)) {
    return 'INVALID_TIMEZONE';
  }
  if (!hasIntlCompatibleCasing(trimmed)) {
    return 'INVALID_TIMEZONE';
  }
  return null;
}

export function isValidIanaTimezone(raw: string): boolean {
  return validateIanaTimezone(raw) === null;
}

export function validateClinicTextField(
  field: Exclude<ClinicEditableField, 'timezone'>,
  raw: string,
): ClinicFieldErrorCode | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return 'REQUIRED';
  }
  if ([...trimmed].length > CLINIC_FIELD_LIMITS[field]) {
    return 'TOO_LONG';
  }
  return null;
}

export function isCapabilityVerified(
  capabilities: ClinicCapabilities | null | undefined,
  nowMs = Date.now(),
): boolean {
  if (!capabilities) {
    return false;
  }
  const ent = capabilities.entitlements;
  if (!ent || ent.status !== 'VERIFIED') {
    return false;
  }
  if (typeof ent.revision !== 'string' || ent.revision.trim().length === 0) {
    return false;
  }
  if (ent.clinicManagement !== true) {
    return false;
  }
  if (typeof ent.max_clinics !== 'number' || !Number.isInteger(ent.max_clinics) || ent.max_clinics < -1) {
    return false;
  }
  if (typeof ent.validUntil !== 'string' || ent.validUntil.trim().length === 0) {
    return false;
  }
  const expiresAtMs = Date.parse(ent.validUntil);
  if (!Number.isFinite(expiresAtMs) || expiresAtMs <= nowMs) {
    return false;
  }
  return true;
}

export function getCapabilityExpiryDelayMs(
  capabilities: ClinicCapabilities | null | undefined,
  nowMs = Date.now(),
): number | null {
  const rawValidUntil = capabilities?.entitlements?.validUntil;
  if (typeof rawValidUntil !== 'string' || rawValidUntil.trim().length === 0) {
    return null;
  }
  const expiresAtMs = Date.parse(rawValidUntil);
  if (!Number.isFinite(expiresAtMs)) {
    return null;
  }
  const delta = expiresAtMs - nowMs;
  if (delta <= 0) {
    return 0;
  }
  return Math.min(delta + 5, 2_147_483_647);
}

export function createUnavailableCapabilities(
  previous?: ClinicCapabilities | null,
): ClinicCapabilities {
  const counted =
    typeof previous?.usage?.counted === 'number' && previous.usage.counted >= 0
      ? previous.usage.counted
      : 0;
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

export function createDeniedCapabilities(
  previous?: ClinicCapabilities | null,
): ClinicCapabilities {
  const counted =
    typeof previous?.usage?.counted === 'number' && previous.usage.counted >= 0
      ? previous.usage.counted
      : 0;
  return {
    entitlements: {
      status: 'DENIED',
      revision: previous?.entitlements?.revision ?? null,
      validUntil: previous?.entitlements?.validUntil ?? null,
      clinicManagement: false,
      max_clinics: 0,
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
    reason: 'CLINIC_MANAGEMENT_DISABLED',
  };
}

export function normalizeCapabilities(
  capabilities: ClinicCapabilities | null | undefined,
  nowMs = Date.now(),
): ClinicCapabilities {
  if (!capabilities) {
    return createUnavailableCapabilities(null);
  }
  if (capabilities.entitlements.status === 'DENIED') {
    return {
      ...capabilities,
      entitlements: {
        ...capabilities.entitlements,
        clinicManagement: false,
      },
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
  if (!isCapabilityVerified(capabilities, nowMs)) {
    return createUnavailableCapabilities(capabilities);
  }
  return structuredClone(capabilities);
}

export function invalidateCapabilitiesForError(
  previous: ClinicCapabilities | null | undefined,
  parsed: Pick<ParsedClinicError, 'status' | 'code'>,
): ClinicCapabilities {
  if (
    parsed.status === 403 ||
    parsed.code === 'CLINIC_MANAGEMENT_DISABLED' ||
    parsed.code === 'DOCTORCHART_PLAN_REQUIRED' ||
    parsed.code === 'FORBIDDEN'
  ) {
    return createDeniedCapabilities(previous);
  }
  return createUnavailableCapabilities(previous);
}

export function canCreateClinic(
  capabilities: ClinicCapabilities | null | undefined,
  nowMs = Date.now(),
): boolean {
  if (!capabilities || !isCapabilityVerified(capabilities, nowMs)) {
    return false;
  }
  return capabilities.actions.create === true;
}

export function canEditClinic(
  clinic: Pick<Clinic, 'status'> | null | undefined,
  capabilities: ClinicCapabilities | null | undefined,
  nowMs = Date.now(),
): boolean {
  if (!clinic || clinic.status === 'ARCHIVED') {
    return false;
  }
  if (!capabilities || !isCapabilityVerified(capabilities, nowMs)) {
    return false;
  }
  return capabilities.actions.edit === true;
}

export function canTransitionClinicStatus(
  clinic: Pick<Clinic, 'status'> | null | undefined,
  targetStatus: ClinicStatus,
  capabilities: ClinicCapabilities | null | undefined,
  nowMs = Date.now(),
): boolean {
  if (!clinic || !capabilities || !isCapabilityVerified(capabilities, nowMs)) {
    return false;
  }
  if (clinic.status === targetStatus) {
    return false;
  }
  switch (clinic.status) {
    case 'ACTIVE':
      if (targetStatus === 'INACTIVE') {
        return capabilities.actions.deactivate === true;
      }
      if (targetStatus === 'ARCHIVED') {
        return capabilities.actions.archive === true;
      }
      return false;
    case 'INACTIVE':
      if (targetStatus === 'ACTIVE') {
        return capabilities.actions.activate === true;
      }
      if (targetStatus === 'ARCHIVED') {
        return capabilities.actions.archive === true;
      }
      return false;
    case 'ARCHIVED':
      if (targetStatus === 'INACTIVE') {
        return capabilities.actions.restore === true;
      }
      return false;
  }
}

export function formatClinicStatusLabel(status: ClinicStatus): string {
  switch (status) {
    case 'ACTIVE':
      return 'Activo';
    case 'INACTIVE':
      return 'Inactivo';
    case 'ARCHIVED':
      return 'Archivado';
  }
}

export function formatClinicDate(isoTimestamp: string | null | undefined): string {
  if (!isoTimestamp) {
    return '—';
  }
  const datePart = isoTimestamp.slice(0, 10);
  return displayLocalDate(datePart);
}

export function formatQuotaSummary(
  capabilities: ClinicCapabilities | null | undefined,
  nowMs = Date.now(),
): string {
  if (!capabilities) {
    return 'Verificando cupo de consultorios…';
  }
  const counted = capabilities.usage.counted;
  const max = capabilities.entitlements.max_clinics;
  if (capabilities.entitlements.status === 'DENIED') {
    return `${counted} consultorio${counted === 1 ? '' : 's'} registrado${counted === 1 ? '' : 's'} · Gestión de consultorios no incluida en el plan actual`;
  }
  if (capabilities.entitlements.status === 'UNAVAILABLE' || !isCapabilityVerified(capabilities, nowMs)) {
    return `${counted} consultorio${counted === 1 ? '' : 's'} contabilizado${counted === 1 ? '' : 's'} (cupo comercial temporalmente no verificable)`;
  }
  if (max === -1) {
    return `${counted} consultorio${counted === 1 ? '' : 's'} activo${counted === 1 ? '' : 's'}/inactivo${counted === 1 ? '' : 's'} · Sin tope numérico`;
  }
  if (typeof max === 'number') {
    return `${counted} de ${max} consultorio${max === 1 ? '' : 's'} utilizado${counted === 1 ? '' : 's'} (activos + inactivos)`;
  }
  return `${counted} consultorio${counted === 1 ? '' : 's'} contabilizado${counted === 1 ? '' : 's'}`;
}

export interface CapabilityBannerDescriptor {
  tone: 'info' | 'warning' | 'danger';
  title: string;
  description: string;
  showUpgradeLink: boolean;
  showRetryButton: boolean;
}

export function describeCapabilityBanner(
  capabilities: ClinicCapabilities | null | undefined,
  nowMs = Date.now(),
): CapabilityBannerDescriptor | null {
  if (!capabilities) {
    return null;
  }
  const { entitlements, usage, reason } = capabilities;

  if (entitlements.status === 'DENIED' || reason === 'CLINIC_MANAGEMENT_DISABLED') {
    return {
      tone: 'danger',
      title: 'Administración de consultorios deshabilitada en tu plan',
      description:
        'Tu suscripción actual no habilita crear ni modificar consultorios. Tus consultorios existentes se mantienen visibles en modo solo lectura.',
      showUpgradeLink: true,
      showRetryButton: false,
    };
  }

  if (
    entitlements.status === 'UNAVAILABLE' ||
    reason === 'ENTITLEMENTS_UNAVAILABLE' ||
    !isCapabilityVerified(capabilities, nowMs)
  ) {
    return {
      tone: 'warning',
      title: 'Verificación comercial temporalmente no disponible',
      description:
        'No pudimos validar los permisos comerciales de tu suscripción en este momento. Podés consultar tus consultorios en modo lectura y reintentar en unos instantes.',
      showUpgradeLink: false,
      showRetryButton: true,
    };
  }

  if (reason === 'CLINIC_LIMIT_REACHED') {
    const max = entitlements.max_clinics ?? 0;
    if (max === 0) {
      return {
        tone: 'warning',
        title: 'Tu plan actual tiene cupo de 0 consultorios activos',
        description:
          'Para dar de alta o restaurar consultorios necesitás ampliar tu plan comercial. Si tenés consultorios contabilizados, podés archivarlos en cualquier momento.',
        showUpgradeLink: true,
        showRetryButton: false,
      };
    }
    if (usage.counted > max) {
      return {
        tone: 'warning',
        title: `Superaste el cupo de tu plan actual (${usage.counted} de ${max} consultorios)`,
        description:
          'Tu cuenta registra más consultorios activos o inactivos que los permitidos por tu plan vigente. Archivá consultorios hasta volver al cupo permitido o actualizá tu plan para reactivar la creación y edición.',
        showUpgradeLink: true,
        showRetryButton: false,
      };
    }
    return {
      tone: 'info',
      title: `Alcanzaste el límite de ${max} consultorio${max === 1 ? '' : 's'} de tu plan`,
      description:
        'Los consultorios activos e inactivos consumen cupo; los archivados no. Podés editar o inactivar tus consultorios actuales, archivar uno para liberar lugar, o ampliar tu plan.',
      showUpgradeLink: true,
      showRetryButton: false,
    };
  }

  return null;
}

export function fieldErrorMessage(field: ClinicEditableField, code: string): string {
  const labelMap: Record<ClinicEditableField, string> = {
    name: 'El nombre del consultorio',
    country: 'El país',
    province: 'La provincia o estado',
    city: 'La ciudad o localidad',
    address: 'La dirección',
    timezone: 'La zona horaria',
  };
  const label = labelMap[field];
  const max = CLINIC_FIELD_LIMITS[field];

  switch (code) {
    case 'REQUIRED':
      return `${label} es obligatorio.`;
    case 'TOO_LONG':
      return `${label} no puede superar los ${max} caracteres.`;
    case 'INVALID_TIMEZONE':
      return 'Ingresá una zona horaria IANA canónica válida (por ejemplo, America/Argentina/Buenos_Aires o UTC).';
    case 'INVALID':
    case 'INVALID_VALUE':
    case 'INVALID_VERSION':
    case 'INVALID_STATUS':
      return `${label} tiene un formato inválido.`;
    default:
      return `${label} no es válido.`;
  }
}

export interface ParsedClinicError {
  status: number;
  code: string;
  userMessage: string;
  fieldErrors: Partial<Record<ClinicEditableField, string>>;
  shouldRefreshCapabilities: boolean;
  isVersionConflict: boolean;
  isStateConflict: boolean;
}

export function parseClinicHttpError(
  error: unknown,
  fallbackMessage: string,
): ParsedClinicError {
  const errObj = error as {
    status?: number;
    error?: Partial<ClinicApiError> | null;
    message?: string;
  };
  const status = typeof errObj?.status === 'number' ? errObj.status : 0;
  const apiError = errObj?.error && typeof errObj.error === 'object' ? errObj.error : null;
  const code = typeof apiError?.code === 'string' ? apiError.code : '';
  const serverMessage =
    typeof apiError?.message === 'string' && apiError.message.trim().length > 0
      ? apiError.message.trim()
      : '';

  const fieldErrors: Partial<Record<ClinicEditableField, string>> = {};
  if (Array.isArray(apiError?.errors)) {
    for (const item of apiError.errors) {
      if (
        item &&
        typeof item.path === 'string' &&
        typeof item.code === 'string' &&
        item.path in CLINIC_FIELD_LIMITS
      ) {
        const key = item.path as ClinicEditableField;
        fieldErrors[key] = fieldErrorMessage(key, item.code);
      }
    }
  }

  const shouldRefreshCapabilities =
    status === 403 ||
    status === 409 ||
    status === 503 ||
    code === 'CLINIC_MANAGEMENT_DISABLED' ||
    code === 'DOCTORCHART_PLAN_REQUIRED' ||
    code === 'CLINIC_LIMIT_REACHED' ||
    code === 'CLINIC_STATE_CONFLICT' ||
    code === 'ENTITLEMENTS_UNAVAILABLE';

  const isVersionConflict = status === 409 && code === 'VERSION_CONFLICT';
  const isStateConflict = status === 409 && code === 'CLINIC_STATE_CONFLICT';

  let userMessage = serverMessage || fallbackMessage;
  switch (code) {
    case 'UNAUTHENTICATED':
      userMessage = 'Tu sesión expiró o no es válida. Volvé a iniciar sesión.';
      break;
    case 'DOCTORCHART_PLAN_REQUIRED':
      userMessage =
        serverMessage || 'Necesitás una suscripción activa a Doctor Chart para operar consultorios.';
      break;
    case 'CLINIC_MANAGEMENT_DISABLED':
      userMessage =
        serverMessage ||
        'Tu plan comercial actual no tiene habilitada la administración de consultorios.';
      break;
    case 'ONBOARDING_REQUIRED':
      userMessage =
        serverMessage ||
        'Completá la configuración inicial de tu espacio médico antes de administrar consultorios.';
      break;
    case 'CLINIC_NOT_FOUND':
      userMessage =
        serverMessage || 'No encontramos el consultorio solicitado o no pertenece a tu espacio.';
      break;
    case 'VERSION_CONFLICT':
      userMessage =
        'El consultorio fue modificado recientemente desde otra sesión. Tus cambios en pantalla se conservaron; cargá la versión más reciente para continuar.';
      break;
    case 'CLINIC_LIMIT_REACHED':
      userMessage =
        serverMessage ||
        'Alcanzaste el límite de consultorios permitidos por tu plan actual. Archivá un consultorio o ampliá tu suscripción.';
      break;
    case 'CLINIC_STATE_CONFLICT':
      userMessage =
        serverMessage ||
        'La operación no está permitida en el estado actual del consultorio. Actualizamos la vista con el último estado disponible.';
      break;
    case 'ENTITLEMENTS_UNAVAILABLE':
      userMessage =
        serverMessage ||
        'No pudimos verificar los permisos comerciales de tu plan en este momento (503). Intentá nuevamente en unos segundos.';
      break;
    case 'INVALID_REQUEST':
      userMessage =
        Object.keys(fieldErrors).length > 0
          ? 'Revisá los campos marcados antes de guardar el consultorio.'
          : serverMessage || 'Los datos enviados no son válidos.';
      break;
  }

  return {
    status,
    code,
    userMessage,
    fieldErrors,
    shouldRefreshCapabilities,
    isVersionConflict,
    isStateConflict,
  };
}
