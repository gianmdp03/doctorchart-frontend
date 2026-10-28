import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { BycodeAccountService, bycodeAccountApi } from './bycode-account.service';
import { AuthService } from './auth.service';
describe('Bycode shared account photo', () => {
  const owner = signal<any>({ id: 'owner-a' });
  let service: BycodeAccountService;
  let http: HttpTestingController;
  beforeEach(() => {
    owner.set({ id: 'owner-a' });
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: vi.fn(() => 'blob:account-avatar'),
    });
    Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: vi.fn() });
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: { currentUser: owner, userName: () => 'Ana' } },
      ],
    });
    service = TestBed.inject(BycodeAccountService);
    http = TestBed.inject(HttpTestingController);
    TestBed.tick();
  });
  afterEach(() => {
    http.verify();
    TestBed.resetTestingModule();
  });
  async function resolve(hasAvatar = true) {
    http.expectOne(bycodeAccountApi + '/profile').flush({ fullName: 'Ana Pérez', hasAvatar });
    await Promise.resolve();
    if (hasAvatar) {
      const photo = http.expectOne(bycodeAccountApi + '/avatar');
      expect(photo.request.transferCache).toBe(false);
      photo.flush(new Blob(['avatar'], { type: 'image/webp' }));
      await Promise.resolve();
    }
    await Promise.resolve();
  }
  it('reads the central account, displays a private object URL and edits only in Bycode', async () => {
    await resolve();
    expect(service.image()).toBe('blob:account-avatar');
    expect(service.name()).toBe('Ana Pérez');
    expect(service.editUrl).toContain('/account?from=doctorchart');
  });
  it('discards old-account responses even before the identity effect runs', async () => {
    const previous = http.expectOne(bycodeAccountApi + '/profile');
    owner.set({ id: 'owner-b' });
    previous.flush({ fullName: 'Previous owner', hasAvatar: true });
    await Promise.resolve();
    expect(service.image()).toBe('');
    expect(service.fullName()).toBe('');
    TestBed.tick();
    await resolve(false);
  });
  it('clears the account photo and object URL when signing out', async () => {
    await resolve();
    owner.set(null);
    TestBed.tick();
    expect(service.image()).toBe('');
    expect(service.fullName()).toBe('');
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:account-avatar');
  });
  it('keeps initials available when the shared profile is unavailable', async () => {
    http
      .expectOne(bycodeAccountApi + '/profile')
      .flush({}, { status: 503, statusText: 'Unavailable' });
    await Promise.resolve();
    await Promise.resolve();
    expect(service.image()).toBe('');
    expect(service.initials()).toBe('A');
  });
});
