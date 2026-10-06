import { TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { describe, it, expect, vi } from 'vitest';
import { AuthService } from '../services/auth.service';
import { authInterceptor } from './auth.interceptor';
import { environment } from '../../../environments/environment';

describe('authInterceptor gateway boundary', () => {
  function intercept(url: string, token: string | null, headers = new HttpHeaders()) {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [{ provide: AuthService, useValue: { getAccessToken: () => token } }] });
    const next = vi.fn((_request: HttpRequest<unknown>) => of(new HttpResponse({ status: 200 })));
    const request = new HttpRequest('GET', url, { headers });
    TestBed.runInInjectionContext(() => authInterceptor(request, next));
    return next.mock.calls[0][0];
  }

  it('removes forged internal headers even with a valid session', () => {
    const names = ['X-Dev-Bypass', 'X-Gateway-Secret', 'X-Internal-Secret', 'X-User-Id', 'X-User-Role', 'X-User-Plan'];
    const headers = new HttpHeaders(Object.fromEntries(names.map(name => [name, 'forged'])));
    const request = intercept(environment.aiGatewayUrl, 'test-session-token', headers);
    for (const name of names) expect(request.headers.has(name)).toBe(false);
    expect(request.headers.get('Authorization')).toBe('Bearer test-session-token');
  });

  it('sends only the session token to the configured API', () => {
    const request = intercept(`${environment.apiUrl}/workspace`, 'test-session-token');
    expect(request.headers.get('Authorization')).toBe('Bearer test-session-token');
    for (const name of ['X-Gateway-Secret', 'X-User-Id', 'X-User-Role', 'X-User-Plan']) {
      expect(request.headers.has(name)).toBe(false);
    }
  });

  it('never invents a doctor identity for an unauthenticated request', () => {
    expect(intercept(`${environment.apiUrl}/specialties`, null).headers.keys()).toEqual([]);
  });

  it('excludes clinical and assistant responses from hydration storage even without a token', () => {
    for (const token of [null, 'test-session-token']) {
      expect(intercept(`${environment.apiUrl}/patients/10`, token).transferCache).toBe(false);
      expect(intercept(environment.aiGatewayUrl, token).transferCache).toBe(false);
    }
    expect(intercept('https://example.test/data', null).transferCache).toBeUndefined();
  });

  it('authenticates the explicitly configured assistant gateway too', () => {
    expect(intercept(environment.aiGatewayUrl, 'test-session-token').headers.get('Authorization')).toBe('Bearer test-session-token');
    expect(intercept(`${environment.aiGatewayUrl}-untrusted`, 'test-session-token').headers.has('Authorization')).toBe(false);
  });

  it('does not leak the token to external endpoints or a similarly named URL', () => {
    expect(intercept('https://example.test/data', 'test-session-token').headers.has('Authorization')).toBe(false);
    expect(intercept(`${environment.apiUrl}-untrusted/workspace`, 'test-session-token').headers.has('Authorization')).toBe(false);
  });
});
