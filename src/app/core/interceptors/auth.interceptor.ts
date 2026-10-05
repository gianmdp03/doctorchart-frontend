import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

/** Only the user's bearer token travels from the browser to the configured API gateway. */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const base = environment.apiUrl.replace(/\/$/, '');
  const isClinicalApi = req.url === base || req.url.startsWith(`${base}/`) || req.url.startsWith(`${base}?`);
  if (!isClinicalApi && req.url !== environment.aiGatewayUrl) {
    return next(req);
  }
  const token = inject(AuthService).getAccessToken();
  let headers = req.headers;
  for (const name of ['X-Gateway-Secret', 'X-Internal-Secret', 'X-User-Id', 'X-User-Role', 'X-User-Plan']) {
    headers = headers.delete(name);
  }
  if (token) headers = headers.set('Authorization', `Bearer ${token}`);
  return next(req.clone({ headers }));
};
