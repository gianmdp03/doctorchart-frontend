import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthService } from '../services/auth.service';
import { WorkspaceStore } from '../services/workspace.store';
import { clinicsGuard } from './clinics.guard';

describe('clinicsGuard', () => {
  let isLoggedIn = true;
  let isSuperAdmin = false;
  const clinicsEnabled = signal(false);
  let loadSetup: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    isLoggedIn = true;
    isSuperAdmin = false;
    clinicsEnabled.set(false);
    loadSetup = vi.fn().mockResolvedValue({
      id: 1,
      onboardingCompleted: true,
      specialty: { id: 10 },
    });

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: () => isLoggedIn,
            isSuperAdmin: () => isSuperAdmin,
          },
        },
        {
          provide: WorkspaceStore,
          useValue: {
            clinicsEnabled,
            loadSetup: () => (loadSetup as () => Promise<unknown>)(),
          },
        },
      ],
    });
  });

  const executeGuard = () =>
    TestBed.runInInjectionContext(() =>
      clinicsGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    );

  it('redirects to /dashboard when CLINICS_ENABLED is false (default)', async () => {
    const result = (await executeGuard()) as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(result)).toBe('/dashboard');
    expect(loadSetup).not.toHaveBeenCalled();
  });

  it('allows access when CLINICS_ENABLED is true and onboarding is completed', async () => {
    clinicsEnabled.set(true);
    const result = await executeGuard();
    expect(result).toBe(true);
    expect(loadSetup).toHaveBeenCalledTimes(1);
  });

  it('redirects unauthenticated users to /login', async () => {
    isLoggedIn = false;
    clinicsEnabled.set(true);
    const result = (await executeGuard()) as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(result)).toBe('/login');
  });

  it('redirects super admins to /admin/specialties', async () => {
    isSuperAdmin = true;
    clinicsEnabled.set(true);
    const result = (await executeGuard()) as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(result)).toBe('/admin/specialties');
  });

  it('redirects to /onboarding/setup when specialty exists but onboarding is incomplete', async () => {
    clinicsEnabled.set(true);
    loadSetup.mockResolvedValueOnce({
      id: 1,
      onboardingCompleted: false,
      specialty: { id: 10 },
    });
    const result = (await executeGuard()) as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(result)).toBe('/onboarding/setup');
  });
});
