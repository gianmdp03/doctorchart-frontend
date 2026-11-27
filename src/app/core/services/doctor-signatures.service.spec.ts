import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { DoctorSignaturesService } from './doctor-signatures.service';

describe('DoctorSignaturesService', () => {
  let service: DoctorSignaturesService;
  let httpMock: HttpTestingController;
  const currentUser = signal<{ id: string } | null>({ id: 'doc-1' });

  beforeEach(() => {
    currentUser.set({ id: 'doc-1' });
    TestBed.configureTestingModule({
      providers: [
        DoctorSignaturesService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: { currentUser } },
      ],
    });
    service = TestBed.inject(DoctorSignaturesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('loads signatures and resolves favorite by default', async () => {
    const loadPromise = service.load();
    const req = httpMock.expectOne(`${environment.apiUrl}/workspace/signatures`);
    req.flush({
      items: [
        { id: 1, name: 'Dra. Paula', stampText: 'MN 111', isFavorite: false, width: 100, height: 40, sha256: 'a', createdAt: '', updatedAt: '' },
        { id: 2, name: 'Dra. Julieta', stampText: 'MN 222', isFavorite: true, width: 100, height: 40, sha256: 'b', createdAt: '', updatedAt: '' },
      ],
    });
    await loadPromise;
    expect(service.favoriteSignature()?.id).toBe(2);
    expect(service.effectiveSignature()?.name).toBe('Dra. Julieta');

    service.setChoice({ mode: 'SELECTED', signatureId: 1 });
    expect(service.effectiveSignature()?.name).toBe('Dra. Paula');

    service.setChoice({ mode: 'NONE' });
    expect(service.effectiveSignature()).toBeNull();
  });

  it('resets state when active user changes', async () => {
    const loadPromise = service.load();
    httpMock.expectOne(`${environment.apiUrl}/workspace/signatures`).flush({
      items: [{ id: 1, name: 'Dra. Paula', stampText: '', isFavorite: true, width: 100, height: 40, sha256: 'a', createdAt: '', updatedAt: '' }],
    });
    await loadPromise;
    expect(service.signatures().length).toBe(1);

    currentUser.set({ id: 'doc-2' });
    TestBed.flushEffects();
    expect(service.signatures().length).toBe(0);
    expect(service.loaded()).toBe(false);
  });
});
