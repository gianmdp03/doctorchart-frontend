import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { WorkspaceStore } from '../services/workspace.store';
import { clinicalNavigationGuard } from './clinical-navigation.guard';

describe('specialty screen availability', () => {
  const loggedIn = signal(true);
  const admin = signal(false);
  let loadSetup: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    loggedIn.set(true); admin.set(false);
    loadSetup = vi.fn().mockResolvedValue({ onboardingCompleted: true,
      experience: { navigation: ['DASHBOARD', 'PATIENTS', 'WIZARD'] } });
    TestBed.configureTestingModule({ providers: [
      { provide: AuthService, useValue: { authReady: Promise.resolve(), isLoggedIn: loggedIn, isSuperAdmin: admin } },
      { provide: WorkspaceStore, useValue: { loadSetup } },
    ] });
  });
  const run = (entry: 'CALCULATORS' | 'VACCINATION') => TestBed.runInInjectionContext(
    () => clinicalNavigationGuard(entry)({} as never, {} as never));

  it('prevents entering an omitted screen by direct URL', async () => {
    expect((await run('CALCULATORS'))!.toString()).toBe('/dashboard');
    expect((await run('VACCINATION'))!.toString()).toBe('/dashboard');
  });
  it('allows implemented screens selected by the server regardless of specialty name', async () => {
    loadSetup.mockResolvedValue({ onboardingCompleted: true,
      specialty: { code: 'never_seen' }, experience: { navigation: ['CALCULATORS', 'VACCINATION'] } });
    expect(await run('CALCULATORS')).toBe(true);
    expect(await run('VACCINATION')).toBe(true);
  });
  it('leaves authentication to the login guard without loading clinical configuration', async () => {
    loggedIn.set(false); expect(await run('CALCULATORS')).toBe(true);
    expect(loadSetup).not.toHaveBeenCalled();
  });
  it('sends administrators to their own panel', async () => {
    admin.set(true); expect((await run('VACCINATION'))!.toString()).toBe('/admin/especialidades');
    expect(loadSetup).not.toHaveBeenCalled();
  });
  it('keeps unfinished onboarding and missing workspaces out of clinical screens', async () => {
    loadSetup.mockResolvedValue(null);
    expect((await run('VACCINATION'))!.toString()).toBe('/onboarding/select-specialty');
    loadSetup.mockResolvedValue({ onboardingCompleted: false });
    expect((await run('VACCINATION'))!.toString()).toBe('/onboarding/setup');
  });
  it('does not open a screen when configuration loading fails', async () => {
    loadSetup.mockRejectedValue(new Error('Offline'));
    expect(await run('CALCULATORS')).toBe(false);
  });
});
