import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { signal } from '@angular/core';
import { doctorchartPlanGuard } from './doctorchart-plan.guard';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

describe('doctorchartPlanGuard', () => {
  let authServiceMock: {
    authReady: Promise<void>;
    isLoggedIn: ReturnType<typeof signal<boolean>>;
    hasDoctorchartPlan: ReturnType<typeof signal<boolean>>;
    isSuperAdmin: ReturnType<typeof signal<boolean>>;
    openLoginModal: ReturnType<typeof vi.fn>;
  };

  const routeMock = {} as ActivatedRouteSnapshot;
  const stateMock = {} as RouterStateSnapshot;
  let originalLocation: Location;

  beforeEach(() => {
    authServiceMock = {
      authReady: Promise.resolve(),
      isLoggedIn: signal<boolean>(false),
      hasDoctorchartPlan: signal<boolean>(false),
      isSuperAdmin: signal<boolean>(false),
      openLoginModal: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
      ],
    });

    originalLocation = window.location;
    delete (window as any).location;
    (window as any).location = { href: '' };
  });

  afterEach(() => {
    (window as any).location = originalLocation;
  });

  it('should block access and open login modal when user is not logged in', async () => {
    authServiceMock.isLoggedIn.set(false);
    authServiceMock.hasDoctorchartPlan.set(false);

    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

    const canActivate = await TestBed.runInInjectionContext(() =>
      doctorchartPlanGuard(routeMock, stateMock)
    );

    expect(canActivate).toBe(false);
    expect(authServiceMock.openLoginModal).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'open-login-modal' })
    );

    dispatchSpy.mockRestore();
  });

  it('should allow access when user has active doctorchart plan', async () => {
    authServiceMock.isLoggedIn.set(true);
    authServiceMock.hasDoctorchartPlan.set(true);

    const canActivate = await TestBed.runInInjectionContext(() =>
      doctorchartPlanGuard(routeMock, stateMock)
    );

    expect(canActivate).toBe(true);
    expect(authServiceMock.openLoginModal).not.toHaveBeenCalled();
    expect(window.location.href).toBe('');
  });

  it('should allow access when user is SUPER_ADMIN', async () => {
    authServiceMock.isLoggedIn.set(true);
    authServiceMock.isSuperAdmin.set(true);
    authServiceMock.hasDoctorchartPlan.set(true);

    const canActivate = await TestBed.runInInjectionContext(() =>
      doctorchartPlanGuard(routeMock, stateMock)
    );

    expect(canActivate).toBe(true);
    expect(authServiceMock.openLoginModal).not.toHaveBeenCalled();
    expect(window.location.href).toBe('');
  });

  it('should block and redirect to Syntah when logged in without active plan', async () => {
    authServiceMock.isLoggedIn.set(true);
    authServiceMock.hasDoctorchartPlan.set(false);

    const canActivate = await TestBed.runInInjectionContext(() =>
      doctorchartPlanGuard(routeMock, stateMock)
    );

    expect(canActivate).toBe(false);
    expect(authServiceMock.openLoginModal).not.toHaveBeenCalled();
    expect(window.location.href).toBe(environment.syntahPlansUrl);
  });
});
