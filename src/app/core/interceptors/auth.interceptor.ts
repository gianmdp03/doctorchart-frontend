import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

/** Only the user's bearer token travels from the browser to the configured API gateway. */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const base = environment.apiUrl.replace(/\/$/, '');
  const isClinicalApi = req.url === base || req.url.startsWith(`${base}/`) || req.url.startsWith(`${base}?`);
  const accountBase = new URL('/api/billing/account', environment.apiUrl);
  let isAccountRead = false;
  try {
    const target = new URL(req.url);
    isAccountRead = req.method === 'GET' && target.origin === accountBase.origin && !target.username && !target.password &&
      (target.pathname === accountBase.pathname + '/profile' || target.pathname === accountBase.pathname + '/avatar');
  } catch { /* Unrecognized destinations never receive a session token. */ }
  if (!isClinicalApi && !isAccountRead && req.url !== environment.aiGatewayUrl) {
    return next(req);
  }
  const token = inject(AuthService).getAccessToken();
  let headers = req.headers;
  for (const name of ['Authorization', 'X-Dev-Bypass', 'X-Gateway-Secret', 'X-Internal-Secret', 'X-User-Id', 'X-User-Role', 'X-User-Plan', 'X-User-Plan-Expires-At']) {
    headers = headers.delete(name);
  }
  if (token) headers = headers.set('Authorization', `Bearer ${token}`);
  return next(req.clone({ headers, transferCache: false }));
};
