import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, defer, finalize, throwError, timeout, TimeoutError,tap } from 'rxjs';
import {ClinicalNavigationService} from '../services/clinical-navigation.service';
import {environment} from '../../../environments/environment';
import { InteractionStatusService } from '../services/interaction-status.service';

/** A stalled connection must release local saving states; writes are never retried here. */
export const interactionInterceptor: HttpInterceptorFn = (request, next) => {
  const status = inject(InteractionStatusService);
  const navigation=inject(ClinicalNavigationService);
  return defer(() => {
    const end = status.begin();
    const write=!['GET','HEAD','OPTIONS'].includes(request.method)&&request.url.startsWith(environment.apiUrl+'/')&&/\/(patients|encounters|workspace)(\/|$)/.test(request.url)?navigation.beginWrite():null;
    const milliseconds = request.body instanceof FormData ? 60000 : 20000;
    return next(request).pipe(timeout({ each: milliseconds }),tap(event=>{if(event instanceof HttpResponse)write?.success(request.url);}), catchError(error => {
      if (error instanceof TimeoutError) {
        const message = ['GET', 'HEAD', 'OPTIONS'].includes(request.method)
          ? 'La conexión demoró demasiado. Podés reintentar la consulta.'
          : 'No pudimos confirmar la operación. Revisá el estado antes de repetirla para evitar duplicados.';
        status.error.set(message);
        return throwError(() => new HttpErrorResponse({ status: 0, statusText: 'Timeout', error: { message } }));
      }
      return throwError(() => error);
    }), finalize(()=>{end();write?.end();}));
  });
};
