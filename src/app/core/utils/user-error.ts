// Keep these messages in sync across Bycode, DoctorChart and Pointly.
export const AUTH_REQUIRED = 'Iniciá sesión para acceder a esta página.';
export const SESSION_EXPIRED = 'Tu sesión venció. Volvé a iniciar sesión.';
export const READ_TIMEOUT = 'La consulta tardó demasiado. Volvé a intentar.';
export const WRITE_UNCONFIRMED = 'No pudimos confirmar el resultado. La operación pudo haberse procesado. Revisá el estado antes de repetirla.';
const CONNECTION_ERROR = 'No pudimos conectar con el servicio. Revisá tu conexión y volvé a intentar.';
const RATE_LIMIT = 'Se hicieron demasiados intentos. Esperá un momento y volvé a intentar.';

type AuthFailure = { message?: unknown; code?: unknown; status?: number };

function authErrorDetails(failure: AuthFailure | null) {
  return {
    message: typeof failure?.message === 'string' ? failure.message.toLowerCase() : '',
    code: typeof failure?.code === 'string' ? failure.code.toLowerCase() : '',
  };
}

export function signInErrorMessage(error: unknown): string {
  const failure = error as AuthFailure | null;
  const { message, code } = authErrorDetails(failure);
  if (['invalid_credentials', 'user_not_found'].includes(code) ||
      /invalid (login credentials|credentials|grant)|user not found/.test(message)) {
    return 'Correo o contraseña incorrectos. Revisá tus datos y volvé a intentar.';
  }
  if (code === 'email_not_confirmed' || /email.not.confirmed/.test(message)) {
    return 'Confirmá tu correo desde el enlace de activación. Si no lo encontrás, revisá el correo no deseado.';
  }
  if (failure?.status === 429 || code.endsWith('rate_limit') || /rate limit|too many requests/.test(message)) {
    return RATE_LIMIT;
  }
  if (failure?.status === 0 || /failed to fetch|network/.test(message)) return CONNECTION_ERROR;
  return 'No pudimos iniciar sesión. Volvé a intentar.';
}

export function signUpErrorMessage(error: unknown): string {
  const failure = error as AuthFailure | null;
  const { message, code } = authErrorDetails(failure);
  if (failure?.status === 409 && message === 'dni_already_in_use') {
    return 'Este DNI ya está en uso. Iniciá sesión con la cuenta que ya tenés.';
  }
  if (failure?.status === 429 || code.endsWith('rate_limit') || /rate limit|too many requests/.test(message)) {
    return RATE_LIMIT;
  }
  if (code === 'weak_password' || message.includes('password should be at least')) {
    return 'Elegí una contraseña más segura.';
  }
  if (code === 'email_address_invalid' || /invalid email|unable to validate email/.test(message)) {
    return 'Revisá la dirección de correo electrónico.';
  }
  if (['signup_disabled', 'email_provider_disabled'].includes(code)) {
    return 'El registro por correo está temporalmente deshabilitado.';
  }
  if (['hook_timeout', 'hook_timeout_after_retry'].includes(code) ||
      (failure?.status === 500 && ['invalid payload sent to hook', 'error sending confirmation email'].includes(message))) {
    return 'No pudimos enviar el correo de confirmación. Reintentá en unos minutos.';
  }
  if (failure?.status === 0 || code === 'request_timeout' || /failed to fetch|network/.test(message)) {
    return 'No hubo respuesta del servicio de registro. Revisá tu conexión y el correo antes de reintentar.';
  }
  if (failure?.status === 500 && message === 'database error saving new user') {
    return 'No pudimos guardar tu cuenta. Si ya registraste este DNI, iniciá sesión con tu cuenta anterior. Si es tu primera cuenta, reintentá en unos minutos.';
  }
  return 'No pudimos completar el registro. Si ya tenés una cuenta, iniciá sesión. Si no, reintentá en unos momentos.';
}

export function httpErrorMessage(error: unknown, fallback: string, { write = false } = {}): string {
  const failure = error as { status?: number; statusText?: string; error?: { message?: string } } | null;
  const status = failure?.status;
  if (status === 0) return write ? WRITE_UNCONFIRMED : failure?.statusText === 'Timeout' ? READ_TIMEOUT : CONNECTION_ERROR;
  if (status === 401) return SESSION_EXPIRED;
  if (status === 429) return RATE_LIMIT;
  if (status !== undefined && status >= 500) {
    return write ? WRITE_UNCONFIRMED : 'El servicio no está disponible en este momento. Volvé a intentar más tarde.';
  }
  const message = failure?.error?.message;
  if (typeof message === 'string' && message.trim()) return message.trim();
  if (status === 403) return 'No tenés permiso para realizar esta acción.';
  return fallback;
}
