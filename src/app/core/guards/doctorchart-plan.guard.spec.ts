import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, provideRouter } from '@angular/router';
import { Component, signal } from '@angular/core';
import { routes } from '../../app.routes';
import { doctorchartPlanGuard, doctorchartNoPlanGuard } from './doctorchart-plan.guard';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({ template: '<p>Owned guarded route</p>' })
class GuardedRouteProbe {}

describe('doctorchartPlanGuard', () => {
  let authServiceMock: {
    authReady: Promise<void>;
    isLoggedIn: ReturnType<typeof signal<boolean>>;
    hasDoctorchartPlan: ReturnType<typeof signal<boolean>>;
    isSuperAdmin: ReturnType<typeof signal<boolean>>;
    openLoginModal: ReturnType<typeof vi.fn>;
  };

  const routeMock = {} as ActivatedRouteSnapshot;
  const stateMock = { url: '/patients/42' } as RouterStateSnapshot;
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
        provideRouter([]),
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

  it('revalidates entitlement when authentication reloads the existing protected URL', async () => {
    const dashboard = routes.find(route => route.path === 'dashboard')!;
    TestBed.configureTestingModule({ providers: [provideRouter([{ ...dashboard, component: GuardedRouteProbe, loadComponent: undefined, canActivate: [doctorchartPlanGuard] }, {path:'plan-required',component:GuardedRouteProbe}])] });
    authServiceMock.isLoggedIn.set(true);
    authServiceMock.hasDoctorchartPlan.set(true);
    const router = TestBed.inject(Router);
    expect(await router.navigateByUrl('/dashboard')).toBe(true);
    authServiceMock.hasDoctorchartPlan.set(false);
    expect(await router.navigateByUrl('/dashboard', { onSameUrlNavigation: 'reload' })).toBe(true);
    expect(router.url).toBe('/plan-required?returnUrl=%2Fdashboard');
    expect(window.location.href).toBe('');
  });

  it('should redirect to the login page when user is not logged in', async () => {
    authServiceMock.isLoggedIn.set(false);
    authServiceMock.hasDoctorchartPlan.set(false);

    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

    const canActivate = await TestBed.runInInjectionContext(() =>
      doctorchartPlanGuard(routeMock, stateMock)
    );

    expect(TestBed.inject(Router).serializeUrl(canActivate as import('@angular/router').UrlTree)).toBe('/login?returnUrl=%2Fpatients%2F42');
    expect(authServiceMock.openLoginModal).not.toHaveBeenCalled();

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

  it('keeps signed-in accounts without a plan inside DoctorChart', async () => {
    authServiceMock.isLoggedIn.set(true);
    authServiceMock.hasDoctorchartPlan.set(false);

    const canActivate = await TestBed.runInInjectionContext(() =>
      doctorchartPlanGuard(routeMock, stateMock)
    );

    expect(TestBed.inject(Router).serializeUrl(canActivate as import('@angular/router').UrlTree)).toBe('/plan-required?returnUrl=%2Fpatients%2F42');
    expect(authServiceMock.openLoginModal).not.toHaveBeenCalled();
    expect(window.location.href).toBe('');
  });
  it('allows the no-plan page only for a signed-in account without a plan', async () => {
    const router = TestBed.inject(Router);
    const run = () => TestBed.runInInjectionContext(() => doctorchartNoPlanGuard(routeMock, stateMock));
    expect(router.serializeUrl(await run() as import('@angular/router').UrlTree)).toBe('/login');
    authServiceMock.isLoggedIn.set(true);
    expect(await run()).toBe(true);
    authServiceMock.hasDoctorchartPlan.set(true);
    expect(router.serializeUrl(await run() as import('@angular/router').UrlTree)).toBe('/dashboard');
  });
});
