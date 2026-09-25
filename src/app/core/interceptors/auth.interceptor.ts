import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Functional HTTP Interceptor that automatically injects the Supabase Bearer token
 * into the 'Authorization' header of outgoing HTTP requests, excluding third-party APIs.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();

  // Exclude external third-party APIs (e.g., Google APIs)
  const isExcluded =
    req.url.includes('googleapis.com') ||
    req.url.includes('google.com') ||
    req.url.includes('gist.githubusercontent.com');

  if (isExcluded) {
    return next(req);
  }

  const headers: Record<string, string> = {
    'X-Gateway-Secret': 'pointly-gateway-secret-2026',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else {
    headers['X-Dev-Bypass'] = 'true';
    headers['X-User-Id'] = 'dev-user';
    headers['X-User-Role'] = 'DOCTOR';
    headers['X-User-Plan'] = authService.doctorchartPlanTier?.() || 'PRO';
  }

  const authReq = req.clone({
    setHeaders: headers,
  });

  return next(authReq);
};
