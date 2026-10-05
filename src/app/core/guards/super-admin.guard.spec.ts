import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { superAdminGuard } from './super-admin.guard';
import { AuthService } from '../services/auth.service';

describe('superAdminGuard', () => {
  let loggedIn: ReturnType<typeof signal<boolean>>;
  let trustedAdmin: ReturnType<typeof signal<boolean>>;
  let ready: Promise<void>;
  const run = () => TestBed.runInInjectionContext(() => superAdminGuard({} as never, {} as never));
  beforeEach(() => {
    loggedIn = signal(true);
    trustedAdmin = signal(false);
    ready = Promise.resolve();
    TestBed.configureTestingModule({ providers: [{
      provide: AuthService, useValue: { get authReady() { return ready; }, isLoggedIn: loggedIn, isSuperAdmin: trustedAdmin },
    }] });
    TestBed.inject(Router);
  });

  it('waits for authentication before evaluating the trusted role', async () => {
    let resolve!: () => void;
    ready = new Promise<void>(complete => { resolve = complete; });
    const pending = run();
    trustedAdmin.set(true);
    resolve();
    expect(await pending).toBe(true);
  });
  it('redirects a physician to dashboard', async () => {
    expect((await run())!.toString()).toBe('/dashboard');
  });
  it('redirects an unauthenticated user despite an inconsistent cached role flag', async () => {
    loggedIn.set(false);
    trustedAdmin.set(true);
    expect((await run())!.toString()).toBe('/dashboard');
  });
});
