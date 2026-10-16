import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SelectivePreloadingStrategy } from './selective-preloading.strategy';

describe('Clinical route preloading', () => {
  const auth = { isLoggedIn: vi.fn(), isSuperAdmin: vi.fn(), hasDoctorchartPlan: vi.fn() };
  beforeEach(() => {
    auth.isLoggedIn.mockReturnValue(true);
    auth.isSuperAdmin.mockReturnValue(false);
    auth.hasDoctorchartPlan.mockReturnValue(true);
    TestBed.configureTestingModule({ providers: [{ provide: AuthService, useValue: auth }] });
  });
  it.each(['visitor', 'administrator', 'no-plan'])('avoids clinical downloads for %s', async kind => {
    if (kind === 'visitor') auth.isLoggedIn.mockReturnValue(false);
    if (kind === 'administrator') auth.isSuperAdmin.mockReturnValue(true);
    if (kind === 'no-plan') auth.hasDoctorchartPlan.mockReturnValue(false);
    const load = vi.fn(() => of('loaded'));
    await firstValueFrom(TestBed.inject(SelectivePreloadingStrategy).preload({ data: { preload: true } }, load));
    expect(load).not.toHaveBeenCalled();
  });
  it('preloads opted-in routes for an authorized doctor', async () => {
    const load = vi.fn(() => of('loaded'));
    expect(await firstValueFrom(TestBed.inject(SelectivePreloadingStrategy).preload({ data: { preload: true } }, load))).toBe('loaded');
    expect(load).toHaveBeenCalledOnce();
  });
});
