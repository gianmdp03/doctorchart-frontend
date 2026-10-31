import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { userTimeZone } from '../date/user-time-zone';

/** Query context avoids new cross-origin headers; it grants no permissions. */
export const timeZoneInterceptor: HttpInterceptorFn = (request, next) => {
  const base = environment.apiUrl.replace(/\/$/, '');
  if (request.url !== base && !request.url.startsWith(base + '/') && !request.url.startsWith(base + '?')) return next(request);
  const noContext = ['/clinics','/bookings','/booking-publication','/public/appointments'].some(path=>{const prefix=base+path;return request.url===prefix||request.url.startsWith(prefix+'/')||request.url.startsWith(prefix+'?');});
  if (noContext) {
    return next(request.clone({ transferCache: false }));
  }
  return next(request.clone({ params: request.params.set('timeZone', userTimeZone()), transferCache: false }));
};
