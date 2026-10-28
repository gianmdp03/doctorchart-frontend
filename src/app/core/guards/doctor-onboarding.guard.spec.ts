import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { signal } from '@angular/core';
import { doctorOnboardingGuard, doctorWizardGuard, preventCompletedOnboardingGuard } from './doctor-onboarding.guard';
import { AuthService } from '../services/auth.service';
import { WorkspaceStore } from '../services/workspace.store';

describe('workspace onboarding guards', () => {
  let loggedIn: ReturnType<typeof signal<boolean>>;
  let loadSetup: ReturnType<typeof vi.fn>;
  let superAdmin: ReturnType<typeof signal<boolean>>;
  beforeEach(() => {
    loggedIn = signal(true);
    superAdmin = signal(false);
    loadSetup = vi.fn().mockResolvedValue(null);
    TestBed.configureTestingModule({ providers: [
      { provide: AuthService, useValue: { authReady: Promise.resolve(), isLoggedIn: loggedIn, isSuperAdmin: superAdmin } },
      { provide: WorkspaceStore, useValue: { loadSetup } },
    ] });
    TestBed.inject(Router);
  });
  const run = (guard: typeof doctorOnboardingGuard) => TestBed.runInInjectionContext(() => guard({} as never, {} as never));

  it('leaves unauthenticated redirects to the authentication guard', async () => {
    loggedIn.set(false);
    expect(await run(doctorOnboardingGuard)).toBe(true);
    expect(loadSetup).not.toHaveBeenCalled();
  });
  it('redirects genuinely missing workspace to selection', async () => {
    const result = await run(doctorOnboardingGuard);
    expect(result instanceof UrlTree).toBe(true);
    expect(result!.toString()).toBe('/onboarding/select-specialty');
  });
  it('redirects an incomplete workspace to its configured wizard', async () => {
    loadSetup.mockResolvedValue({ onboardingCompleted: false, definition: null });
    expect((await run(doctorOnboardingGuard))!.toString()).toBe('/onboarding/setup');
  });
  it('permits clinical modules only with a completed effective definition', async () => {
    loadSetup.mockResolvedValue({ onboardingCompleted: true, definition: {} });
    expect(await run(doctorOnboardingGuard)).toBe(true);
    expect((await run(preventCompletedOnboardingGuard))!.toString()).toBe('/dashboard');
  });
  it('does not treat a load failure as a missing account or redirect away from its error', async () => {
    loadSetup.mockRejectedValue(new Error('Offline'));
    expect(await run(doctorOnboardingGuard)).toBe(false);
    expect(await run(preventCompletedOnboardingGuard)).toBe(false);
  });
  it('sends a trusted superadmin directly to administration without requiring a doctor workspace', async () => {
    superAdmin.set(true);
    expect((await run(doctorOnboardingGuard))!.toString()).toBe('/admin/specialties');
    expect((await run(preventCompletedOnboardingGuard))!.toString()).toBe('/admin/specialties');
    expect(loadSetup).not.toHaveBeenCalled();
  });
  it('keeps the personal editor reachable for clinicians while preventing an admin workspace load', async () => {
    expect(await run(doctorWizardGuard)).toBe(true);
    superAdmin.set(true);
    expect((await run(doctorWizardGuard))!.toString()).toBe('/admin/specialties');
    expect(loadSetup).not.toHaveBeenCalled();
  });
});
