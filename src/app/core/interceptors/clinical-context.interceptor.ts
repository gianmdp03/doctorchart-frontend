import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { from, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { WorkspaceStore } from '../services/workspace.store';
import { AuthService } from '../services/auth.service';
import { ClinicalContextService } from '../services/clinical-context.service';

export const clinicalContextInterceptor: HttpInterceptorFn = (request, next) => {
  const base = environment.apiUrl.replace(/\/$/, '');
  const collections = ['/patients', '/encounters', '/calculators', '/medications', '/vaccination-calendar', '/charts', '/workspace/charts'];
  if (!collections.some(path => request.url === base + path || request.url.startsWith(base + path + '/') || request.url.startsWith(base + path + '?'))) return next(request);
  const workspace = inject(WorkspaceStore);
  const context = inject(ClinicalContextService);
  const auth = inject(AuthService);
  const owner = auth.currentUser()?.id;
  const initialScope = context.id();
  const changed = () => new HttpErrorResponse({ status: 409, error: { code: 'CLINICAL_CONTEXT_CHANGED', message: 'El contexto clínico cambió. Volvé a cargar la pantalla.' } });
  // Resolve before constructing the immutable request; never replay in a new scope.
  return from(workspace.loadSetup()).pipe(switchMap(setup => {
    const id = setup?.specialtyContextId;
    if (!id || owner !== auth.currentUser()?.id || id !== context.id() || (initialScope !== null && initialScope !== id)) throw changed();
    const supplied = request.params.getAll('specialtyContextId');
    const urlValues = new URL(request.url, base + '/').searchParams.getAll('specialtyContextId');
    if ((supplied && (supplied.length !== 1 || supplied[0] !== String(id))) || urlValues.length) throw changed();
    return next(request.clone({ params: request.params.set('specialtyContextId', id), transferCache: false })).pipe(tap(() => {
      if (owner !== auth.currentUser()?.id || id !== context.id()) throw changed();
    }));
  }));
};
