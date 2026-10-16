import { TestBed } from '@angular/core/testing';
import {
  provideRouter,
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { publicEntryGuard } from './public-entry.guard';

describe('Public entry', () => {
  async function destination(loggedIn: boolean, admin = false) {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            authReady: Promise.resolve(),
            isLoggedIn: () => loggedIn,
            isSuperAdmin: () => admin,
          },
        },
      ],
    });
    const result = await TestBed.runInInjectionContext(() =>
      publicEntryGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    );
    return result instanceof UrlTree ? TestBed.inject(Router).serializeUrl(result) : result;
  }
  it('allows visitors to see presentation and login', async () => {
    expect(await destination(false)).toBe(true);
  });
  it('takes returning doctors to their protected dashboard', async () => {
    expect(await destination(true)).toBe('/dashboard');
  });
  it('takes administrators to administration', async () => {
    expect(await destination(true, true)).toBe('/admin/especialidades');
  });
});
