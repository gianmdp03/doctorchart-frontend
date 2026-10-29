import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { userTimeZone } from '../date/user-time-zone';

/** Query context avoids new cross-origin headers; it grants no permissions. */
export const timeZoneInterceptor: HttpInterceptorFn = (request, next) => {
  const base = environment.apiUrl.replace(/\/$/, '');
  if (request.url !== base && !request.url.startsWith(base + '/') && !request.url.startsWith(base + '?')) return next(request);
  const clinicsPrefix = `${base}/clinics`;
  if (request.url === clinicsPrefix || request.url.startsWith(clinicsPrefix + '/') || request.url.startsWith(clinicsPrefix + '?')) {
    return next(request.clone({ transferCache: false }));
  }
  return next(request.clone({ params: request.params.set('timeZone', userTimeZone()), transferCache: false }));
};
