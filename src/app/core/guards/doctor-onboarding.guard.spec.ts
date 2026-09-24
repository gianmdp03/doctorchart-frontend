import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { signal } from '@angular/core';
import { doctorOnboardingGuard, preventCompletedOnboardingGuard } from './doctor-onboarding.guard';
import { AuthService } from '../services/auth.service';
import { DoctorProfileService } from '../services/doctor-profile.service';
import { WorkspaceStore } from '../services/workspace.store';

describe('doctorOnboardingGuard', () => {
  let authServiceMock: {
    authReady: Promise<void>;
    isLoggedIn: ReturnType<typeof signal<boolean>>;
  };

  let doctorProfileServiceMock: {
    loaded: ReturnType<typeof signal<boolean>>;
    hasSpecialty: ReturnType<typeof signal<boolean>>;
    loadProfile: ReturnType<typeof vi.fn>;
  };

  let router: Router;
  let workspaceStoreMock: {
    loadSetup: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    authServiceMock = {
      authReady: Promise.resolve(),
      isLoggedIn: signal<boolean>(false),
    };

    doctorProfileServiceMock = {
      loaded: signal<boolean>(false),
      hasSpecialty: signal<boolean>(false),
      loadProfile: vi.fn().mockResolvedValue(null),
    };
    workspaceStoreMock = {
      loadSetup: vi.fn().mockResolvedValue(null),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: DoctorProfileService, useValue: doctorProfileServiceMock },
        { provide: WorkspaceStore, useValue: workspaceStoreMock },
      ],
    });

    router = TestBed.inject(Router);
  });

  it('should allow navigation if user is not logged in', async () => {
    authServiceMock.isLoggedIn.set(false);

    const result = await TestBed.runInInjectionContext(() =>
      doctorOnboardingGuard({} as any, {} as any)
    );

    expect(result).toBe(true);
  });

  it('should redirect to /onboarding/select-specialty if logged in but specialty is missing', async () => {
    authServiceMock.isLoggedIn.set(true);
    doctorProfileServiceMock.loaded.set(true);
    doctorProfileServiceMock.hasSpecialty.set(false);

    const result = await TestBed.runInInjectionContext(() =>
      doctorOnboardingGuard({} as any, {} as any)
    );

    expect(result instanceof UrlTree).toBe(true);
    expect((result as UrlTree).toString()).toBe('/onboarding/select-specialty');
  });

  it('should allow access to clinical route if doctor has specialty assigned', async () => {
    authServiceMock.isLoggedIn.set(true);
    doctorProfileServiceMock.loaded.set(true);
    doctorProfileServiceMock.hasSpecialty.set(true);

    const result = await TestBed.runInInjectionContext(() =>
      doctorOnboardingGuard({} as any, {} as any)
    );

    expect(result).toBe(true);
  });

  it('should send an incomplete workspace to the wizard instead of clinical modules', async () => {
    authServiceMock.isLoggedIn.set(true);
    doctorProfileServiceMock.loaded.set(true);
    workspaceStoreMock.loadSetup.mockResolvedValue({
      id: 1,
      specialtyId: 4,
      onboardingCompleted: false,
    });

    const result = await TestBed.runInInjectionContext(() =>
      doctorOnboardingGuard({} as any, {} as any)
    );

    expect(result instanceof UrlTree).toBe(true);
    expect((result as UrlTree).toString()).toBe('/onboarding/setup');
  });

  it('preventCompletedOnboardingGuard should redirect to /pacientes if specialty is already chosen', async () => {
    authServiceMock.isLoggedIn.set(true);
    doctorProfileServiceMock.loaded.set(true);
    doctorProfileServiceMock.hasSpecialty.set(true);

    const result = await TestBed.runInInjectionContext(() =>
      preventCompletedOnboardingGuard({} as any, {} as any)
    );

    expect(result instanceof UrlTree).toBe(true);
    expect((result as UrlTree).toString()).toBe('/dashboard');
  });
});
