import { TestBed } from '@angular/core/testing';
import { AuthService, doctorchartSessionOptions, forwardDoctorchartMailCallback, SUPABASE_CLIENT } from './auth.service';
import { PLATFORM_ID } from '@angular/core';
import { Session, User } from '@supabase/supabase-js';
import { InteractionStatusService } from './interaction-status.service';
import { environment } from '../../../environments/environment';

describe('legacy DoctorChart email callbacks', () => {
  it('prevents emailed tokens from becoming an application session while retaining normal session persistence', () => {
    expect(doctorchartSessionOptions(true)).toEqual({persistSession:true,autoRefreshToken:true,detectSessionInUrl:false});
    expect(doctorchartSessionOptions(false)).toEqual({persistSession:true,autoRefreshToken:true,detectSessionInUrl:true});
  });
  it.each([
    ['signup', '/auth-success'], ['invite', '/auth-success'], ['magiclink', '/auth-success'],
    ['email_change', '/email-change-success'], ['recovery', '/reset-password'],
  ])('forwards %s to the isolated Bycode result flow before clearing the local fragment', (type, path) => {
    const fragment = `#access_token=mail-token&refresh_token=mail-refresh&type=${type}&redirect_to=https://untrusted.example`;
    const history = {replaceState: vi.fn()};
    const location = {hash: fragment, pathname: '/login', search: '?from=email', replace: vi.fn((_url: string) => {
      expect(history.replaceState).toHaveBeenCalledWith(null, '', '/login?from=email');
    })};
    expect(forwardDoctorchartMailCallback(location, history)).toBe(true);
    const destination = new URL(location.replace.mock.calls[0][0]);
    expect(destination.origin).toBe(new URL(environment.bycodePlansUrl).origin);
    expect(destination.pathname).toBe(path);
    expect(destination.hash).toBe(fragment);
  });

  it('leaves normal navigation and non-email auth fragments unchanged', () => {
    for (const hash of ['', '#section', '#access_token=oauth-token&type=oauth']) {
      const location = {hash, pathname: '/login', search: '', replace: vi.fn()};
      const history = {replaceState: vi.fn()};
      expect(forwardDoctorchartMailCallback(location, history)).toBe(false);
      expect(location.replace).not.toHaveBeenCalled(); expect(history.replaceState).not.toHaveBeenCalled();
    }
  });
});

describe('AuthService', () => {
  let service: AuthService;
  let mockAuth: {
    refreshSession: ReturnType<typeof vi.fn>;
    signInWithPassword: ReturnType<typeof vi.fn>;
    signInWithOAuth: ReturnType<typeof vi.fn>;
    signUp: ReturnType<typeof vi.fn>;
    signOut: ReturnType<typeof vi.fn>;
    getSession: ReturnType<typeof vi.fn>;
    onAuthStateChange: ReturnType<typeof vi.fn>;
  };
  let mockSupabaseClient: any;

  beforeEach(() => {
    mockAuth = {
      refreshSession: vi.fn(),
      signInWithPassword: vi.fn(),
      signInWithOAuth: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
    };

    mockSupabaseClient = {
      auth: mockAuth,
    };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: SUPABASE_CLIENT, useValue: mockSupabaseClient },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  describe('Initial State & Signals', () => {
    it('forwards an email callback before reading the stored account without replacing that account', async () => {
      TestBed.resetTestingModule();
      const storedUser={id:'already-signed-in',app_metadata:{},user_metadata:{}} as User;
      mockAuth.getSession.mockResolvedValue({data:{session:{access_token:'stored-token',user:storedUser}},error:null});
      const replace=vi.fn(); const replaceState=vi.fn();
      vi.stubGlobal('window', {location:{hash:'#type=signup&access_token=email-token',pathname:'/login',search:'',replace},
        history:{replaceState}, addEventListener:vi.fn(), removeEventListener:vi.fn()});
      try {
        TestBed.configureTestingModule({providers:[AuthService,{provide:PLATFORM_ID,useValue:'browser'},
          {provide:SUPABASE_CLIENT,useValue:mockSupabaseClient}]});
        const callbackService=TestBed.inject(AuthService);
        await callbackService.authReady;
        expect(replace).toHaveBeenCalledWith(new URL('/auth-success#type=signup&access_token=email-token',environment.bycodePlansUrl).href);
        expect(callbackService.currentUser()?.id).toBe('already-signed-in');
        expect(callbackService.getAccessToken()).toBe('stored-token');
        expect(mockAuth.signInWithPassword).not.toHaveBeenCalled();
      } finally { TestBed.resetTestingModule(); vi.unstubAllGlobals(); }
    });

    it('releases guards when the SDK announces a session while getSession is stalled', async () => {
      TestBed.resetTestingModule();
      mockAuth.getSession.mockReturnValue(new Promise(() => undefined));
      TestBed.configureTestingModule({ providers: [AuthService,
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: SUPABASE_CLIENT, useValue: mockSupabaseClient },
      ] });
      service = TestBed.inject(AuthService);
      const callback = mockAuth.onAuthStateChange.mock.calls.at(-1)![0];
      const user = { id: 'fixture', app_metadata: {}, user_metadata: {} } as User;
      callback('INITIAL_SESSION', { user, access_token: 'fixture' });
      await service.authReady;
      expect(service.isAuthInitialized()).toBe(true);
      expect(service.currentUser()?.id).toBe('fixture');
    });

    it('finishes session initialization with no access when the SDK never answers', async () => {
      TestBed.resetTestingModule();
      vi.useFakeTimers();
      try {
        mockAuth.getSession.mockReturnValue(new Promise(() => undefined));
        TestBed.configureTestingModule({ providers: [AuthService,
          { provide: PLATFORM_ID, useValue: 'browser' },
          { provide: SUPABASE_CLIENT, useValue: mockSupabaseClient },
        ] });
        service = TestBed.inject(AuthService);
        await vi.advanceTimersByTimeAsync(15001);
        await service.authReady;
        expect(service.isAuthInitialized()).toBe(true);
        expect(service.isLoggedIn()).toBe(false);
      } finally { vi.useRealTimers(); }
    });

    it('should initialize with default null values for session and user', () => {
      expect(service.currentUser()).toBeNull();
      expect(service.session()).toBeNull();
      expect(service.isLoggedIn()).toBe(false);
      expect(service.userEmail()).toBeNull();
      expect(service.userDni()).toBeNull();
      expect(service.userRole()).toBeNull();
      expect(service.userName()).toBe('Usuario');
      expect(service.userInitial()).toBe('U');
      expect(service.getAccessToken()).toBeNull();
    });

    it('should compute isLoggedIn, userName, userEmail, and userInitial when currentUser is set', () => {
      const mockUser = {
        id: 'usr-123',
        email: 'maria.gonzalez@hospital.com',
        app_metadata: { role: 'DOCTOR' },
        user_metadata: {
          full_name: 'Dra. MarÃ­a GonzÃ¡lez',
          dni: '32145678',
          role: 'DOCTOR',
        },
      } as unknown as User;

      service.currentUser.set(mockUser);

      expect(service.isLoggedIn()).toBe(true);
      expect(service.userName()).toBe('Dra. MarÃ­a GonzÃ¡lez');
      expect(service.userEmail()).toBe('maria.gonzalez@hospital.com');
      expect(service.userInitial()).toBe('D');
      expect(service.userDni()).toBe('32145678');
      expect(service.userRole()).toBe('DOCTOR');
    });

    it('should fallback to name, email prefix, or Usuario for userName', () => {
      // Test fallback to name
      service.currentUser.set({
        id: '1',
        email: 'test@example.com',
        user_metadata: { name: 'Dr. Roberto' },
      } as unknown as User);
      expect(service.userName()).toBe('Dr. Roberto');
      expect(service.userInitial()).toBe('D');

      // Test fallback to email prefix
      service.currentUser.set({
        id: '2',
        email: 'lucas.pediatra@hospital.com',
        user_metadata: {},
      } as unknown as User);
      expect(service.userName()).toBe('lucas.pediatra');
      expect(service.userInitial()).toBe('L');

      // Test fallback to Usuario when email is empty
      service.currentUser.set({
        id: '3',
        user_metadata: {},
      } as unknown as User);
      expect(service.userName()).toBe('Usuario');
      expect(service.userInitial()).toBe('U');
    });

    it('should read userRole from app_metadata if user_metadata does not have role', () => {
      service.currentUser.set({
        id: '4',
        email: 'admin@system.local',
        user_metadata: {},
        app_metadata: { role: 'SUPER_ADMIN' },
      } as unknown as User);

      expect(service.userRole()).toBe('SUPER_ADMIN');
    });

    it('should return token from session via getAccessToken()', () => {
      const mockSession = {
        access_token: 'secret-jwt-token-12345',
        user: { id: 'usr-1' } as unknown as User,
      } as unknown as Session;

      service.session.set(mockSession);
      expect(service.getAccessToken()).toBe('secret-jwt-token-12345');
    });
  });

  describe('Role and DoctorChart Plan Resolution', () => {
    it('ignores a plan supplied only through editable metadata', () => {
      service.currentUser.set({ id: 'doctor', app_metadata: {}, user_metadata: {
        app_modules: { doctorchart: { active: true, tier: 'UNLIMITED' } },
        doctorchart: { active: true, tier: 'UNLIMITED' },
      } } as unknown as User);
      expect(service.doctorchartModule()).toBeNull();
      expect(service.hasDoctorchartPlan()).toBe(false);
    });
    it('does not accept a superadmin role supplied through editable user metadata', () => {
      service.currentUser.set({ id: 'doctor', user_metadata: { role: 'SUPER_ADMIN' }, app_metadata: {} } as unknown as User);
      expect(service.userRole()).toBeNull();
      expect(service.isSuperAdmin()).toBe(false);
      expect(service.hasDoctorchartPlan()).toBe(false);
      expect(service.doctorchartPlanTier()).toBeNull();
    });

    it('uses the server managed role despite conflicting editable metadata', () => {
      service.currentUser.set({ id: 'doctor', user_metadata: { role: 'SUPER_ADMIN' }, app_metadata: { role: 'DOCTOR' } } as unknown as User);
      expect(service.isSuperAdmin()).toBe(false);
      service.currentUser.set({ id: 'admin', user_metadata: { role: 'DOCTOR' }, app_metadata: { role: 'super_admin' } } as unknown as User);
      expect(service.isSuperAdmin()).toBe(true);
    });

    it('rejects malformed server managed roles instead of coercing them', () => {
      service.currentUser.set({ id: 'user', app_metadata: { role: ['SUPER_ADMIN'] } } as unknown as User);
      expect(service.isSuperAdmin()).toBe(false);
    });
    it('should detect isSuperAdmin correctly', () => {
      service.currentUser.set({
        id: 'super-user',
        app_metadata: { role: 'SUPER_ADMIN' },
      } as unknown as User);

      expect(service.isSuperAdmin()).toBe(true);
      expect(service.isCompany()).toBe(false);
      expect(service.hasDoctorchartPlan()).toBe(true);
      expect(service.doctorchartPlanTier()).toBe('SUPER_ADMIN');
    });

    it('should detect isCompany correctly', () => {
      service.currentUser.set({
        id: 'company-user',
        app_metadata: { role: 'COMPANY' },
      } as unknown as User);

      expect(service.isCompany()).toBe(true);
      expect(service.isSuperAdmin()).toBe(false);
    });

    it('should parse doctorchartModule from app_metadata.app_modules.doctorchart', () => {
      const futureDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString();
      service.currentUser.set({
        id: 'doc-user',
        app_metadata: {
          role: 'DOCTOR',
          app_modules: {
            doctorchart: {
              active: true,
              tier: 'PRO',
              expires_at: futureDate,
            },
          },
        },
      } as unknown as User);

      const mod = service.doctorchartModule();
      expect(mod).not.toBeNull();
      expect(mod?.active).toBe(true);
      expect(mod?.tier).toBe('PRO');
      expect(mod?.notExpired).toBe(true);
      expect(service.hasDoctorchartPlan()).toBe(true);
      expect(service.doctorchartPlanTier()).toBe('PRO');
      expect(service.daysRemaining()).toBeGreaterThanOrEqual(9);
    });

    it('rejects legacy aliases and never inherits Pointly benefits', () => {
      for (const app_metadata of [
        { app_modules: { doctor_chart: { active: true, tier: 'PRO' } } },
        { doctorchart: { active: true, tier: 'UNLIMITED' } },
        { app_modules: { pointly: { active: true, tier: 'PRO', expires_at: '2099-01-01T00:00:00Z' } } },
      ]) {
        service.currentUser.set({ id: 'synthetic', app_metadata } as unknown as User);
        expect(service.doctorchartModule()).toBeNull();
        expect(service.hasDoctorchartPlan()).toBe(false);
        expect(service.doctorchartPlanTier()).toBeNull();
      }
    });

    it('requires boolean active, a supported tier and a valid future RFC3339 expiry', () => {
      for (const invalid of [
        { active: 'true' }, { active: false }, { tier: 'FAKE' }, { tier: 7 },
        { expires_at: null }, { expires_at: undefined }, { expires_at: 'tomorrow' },
        { expires_at: '2099-02-30T00:00:00Z' }, { expires_at: '2099-01-01' },
      ]) {
        service.currentUser.set({ id: 'synthetic', app_metadata: { app_modules: {
          doctorchart: { active: true, tier: 'PRO', expires_at: '2099-01-01T00:00:00Z', ...invalid },
        } } } as unknown as User);
        expect(service.hasDoctorchartPlan()).toBe(false);
        expect(service.doctorchartPlanTier()).toBeNull();
      }
    });

    it('expires while the JWT and user remain unchanged', async () => {
      await service.authReady;
      vi.useFakeTimers();
      try {
        service.currentUser.set({ id: 'synthetic', app_metadata: { app_modules: { doctorchart: {
          active: true, tier: 'PRO', expires_at: new Date(Date.now() + 1000).toISOString(),
        } } } } as unknown as User);
        TestBed.tick();
        expect(service.hasDoctorchartPlan()).toBe(true);
        vi.advanceTimersByTime(1002);
        expect(service.hasDoctorchartPlan()).toBe(false);
        expect(service.doctorchartPlanTier()).toBeNull();
      } finally { vi.useRealTimers(); }
    });

    it('updates benefits and bearer on token renewal', async () => {
      await service.authReady;
      const callback = mockAuth.onAuthStateChange.mock.calls[0][0];
      const user = { id: 'synthetic', app_metadata: { app_modules: { doctorchart: {
        active: true, tier: 'BASIC', expires_at: '2099-01-01T00:00:00Z',
      } } } } as unknown as User;
      callback('TOKEN_REFRESHED', { access_token: 'renewed-synthetic', user });
      expect(service.getAccessToken()).toBe('renewed-synthetic');
      expect(service.doctorchartPlanTier()).toBe('BASIC');
      callback('SIGNED_OUT', null);
      expect(service.hasDoctorchartPlan()).toBe(false);
      expect(service.getAccessToken()).toBeNull();
    });

    it('should return hasDoctorchartPlan = false if plan is expired', () => {
      const pastDate = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString();
      service.currentUser.set({
        id: 'doc-expired',
        app_metadata: {
          app_modules: {
            doctorchart: {
              active: true,
              tier: 'PRO',
              expires_at: pastDate,
            },
          },
        },
      } as unknown as User);

      expect(service.doctorchartModule()?.notExpired).toBe(false);
      expect(service.hasDoctorchartPlan()).toBe(false);
      expect(service.daysRemaining()).toBe(0);
    });

    it('should return hasDoctorchartPlan = false if active is false', () => {
      service.currentUser.set({
        id: 'doc-inactive',
        app_metadata: {
          app_modules: {
            doctorchart: {
              active: false,
              tier: 'BASIC',
            },
          },
        },
      } as unknown as User);

      expect(service.doctorchartModule()?.active).toBe(false);
      expect(service.hasDoctorchartPlan()).toBe(false);
    });

    it('should return false for hasDoctorchartPlan and null for tier when user has no module', () => {
      service.currentUser.set({
        id: 'doc-no-plan',
        app_metadata: {},
      } as unknown as User);

      expect(service.doctorchartModule()).toBeNull();
      expect(service.hasDoctorchartPlan()).toBe(false);
      expect(service.doctorchartPlanTier()).toBeNull();
      expect(service.daysRemaining()).toBe(0);
    });
  });

  describe('Authentication Actions', () => {
    it('should sign in with password and update session and user', async () => {
      const mockUser = { id: 'user-auth-1', email: 'doc@example.com' } as unknown as User;
      const mockSession = { access_token: 'token-abc', user: mockUser } as unknown as Session;

      mockAuth.signInWithPassword.mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null,
      });

      const res = await service.signInWithPassword({
        email: 'doc@example.com',
        password: 'securePassword123',
      });

      expect(mockAuth.signInWithPassword).toHaveBeenCalledWith({
        email: 'doc@example.com',
        password: 'securePassword123',
      });
      expect(res.data.session).toEqual(mockSession);
      expect(service.session()).toEqual(mockSession);
      expect(service.currentUser()).toEqual(mockUser);
    });

    it('blocks Google before contacting Supabase', async () => {
      await expect(service.signInWithOAuth('google')).rejects.toThrow('deshabilitado');
      expect(mockAuth.signInWithOAuth).not.toHaveBeenCalled();
    });

    it('blocks local registration before contacting Supabase', async () => {
      await expect(service.signUp({email: 'fixture@example.test', password: 'fixture-password'})).rejects.toThrow('Bycode');
      expect(mockAuth.signUp).not.toHaveBeenCalled();
    });

    it('should sign out and clear session and currentUser', async () => {
      service.session.set({ access_token: 'active' } as unknown as Session);
      service.currentUser.set({ id: 'active' } as unknown as User);

      mockAuth.signOut.mockResolvedValue({ error: null });

      const res = await service.signOut();

      expect(mockAuth.signOut).toHaveBeenCalled();
      expect(res.error).toBeNull();
      expect(service.session()).toBeNull();
      expect(service.currentUser()).toBeNull();
    });

    it('should throw error when signing in without supabase client', async () => {
      service.setSupabaseClient(null);

      await expect(
        service.signInWithPassword({ email: 'a@b.com', password: '123' })
      ).rejects.toThrow('Supabase client is not available');

      await expect(
        service.signInWithOAuth('google')
      ).rejects.toThrow('deshabilitado');

      await expect(
        service.signUp({ email: 'a@b.com', password: '123' })
      ).rejects.toThrow('Bycode');
    });
  });
  it('refreshes the session to use the newly activated plan', async () => {
    service.currentUser.set({id:'plan-user',app_metadata:{}} as User);
    const user={id:'plan-user',app_metadata:{app_modules:{doctorchart:{active:true,tier:'PRO',expires_at:'2099-01-01T00:00:00Z'}}}} as unknown as User;
    const session={user,access_token:'fixture-token'} as Session;
    mockAuth.refreshSession.mockResolvedValue({data:{session},error:null});
    await service.refreshPlan();
    expect(service.hasDoctorchartPlan()).toBe(true);
    expect(service.session()).toBe(session);
  });
  it('preserves the account when plan refresh fails', async () => {
    const user={id:'plan-user',app_metadata:{}} as User; service.currentUser.set(user);
    mockAuth.refreshSession.mockResolvedValue({data:{session:null},error:new Error('offline')});
    await expect(service.refreshPlan()).rejects.toThrow('No pudimos actualizar');
    expect(service.currentUser()).toBe(user);
  });

  describe('live plan synchronization', () => {
    const planSession = (tier = 'BASIC', token = 'old-token') => ({access_token: token, user: {
      id: 'doctor', app_metadata: {app_modules: {doctorchart: {active: true, tier, expires_at: '2099-01-01T00:00:00Z'}}},
    }} as unknown as Session);
    beforeEach(async () => {
      await service.authReady;
      vi.useFakeTimers();
      vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('visible');
      service.session.set(planSession()); service.currentUser.set(service.session()!.user);
      TestBed.tick();
    });
    afterEach(() => { TestBed.resetTestingModule(); vi.useRealTimers(); vi.restoreAllMocks(); });

    it('adopts a newly issued PRO token on focus without sign-out or global loading', async () => {
      mockAuth.refreshSession.mockResolvedValue({data:{session:planSession('PRO', 'new-token')},error:null});
      window.dispatchEvent(new Event('focus'));
      await Promise.resolve(); await Promise.resolve(); await Promise.resolve();
      expect(service.doctorchartPlanTier()).toBe('PRO');
      expect(service.getAccessToken()).toBe('new-token');
      expect(service.isLoggedIn()).toBe(true);
      expect(mockAuth.signOut).not.toHaveBeenCalled();
      expect(TestBed.inject(InteractionStatusService).busy()).toBe(false);
    });

    it('deduplicates focus, visibility, polling and explicit refresh; throttles repeated focus', async () => {
      let finish!: (value:any) => void;
      mockAuth.refreshSession.mockImplementation(() => new Promise(resolve => finish=resolve));
      window.dispatchEvent(new Event('focus')); document.dispatchEvent(new Event('visibilitychange'));
      const explicit=service.refreshPlan();
      expect(mockAuth.refreshSession).toHaveBeenCalledTimes(1);
      finish({data:{session:planSession('PRO')},error:null}); await explicit;
      window.dispatchEvent(new Event('focus'));
      expect(mockAuth.refreshSession).toHaveBeenCalledTimes(1);
      await vi.advanceTimersByTimeAsync(15_000);
      window.dispatchEvent(new Event('focus'));
      expect(mockAuth.refreshSession).toHaveBeenCalledTimes(2);
      finish({data:{session:planSession('PRO')},error:null}); await Promise.resolve();
    });

    it('polls a visible session and pauses while hidden, then refreshes on return', async () => {
      mockAuth.refreshSession.mockResolvedValue({data:{session:planSession('PRO')},error:null});
      await vi.advanceTimersByTimeAsync(60_000);
      expect(mockAuth.refreshSession).toHaveBeenCalledTimes(1);
      vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('hidden');
      document.dispatchEvent(new Event('visibilitychange'));
      await vi.advanceTimersByTimeAsync(120_000);
      expect(mockAuth.refreshSession).toHaveBeenCalledTimes(1);
      vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('visible');
      document.dispatchEvent(new Event('visibilitychange')); await Promise.resolve();
      expect(mockAuth.refreshSession).toHaveBeenCalledTimes(2);
    });

    it('bounds a stalled background refresh quietly and retains the confirmed session', async () => {
      mockAuth.refreshSession.mockReturnValue(new Promise(() => undefined));
      window.dispatchEvent(new Event('focus'));
      await vi.advanceTimersByTimeAsync(12_001);
      expect(service.getAccessToken()).toBe('old-token');
      expect(TestBed.inject(InteractionStatusService).error()).toBe('');
      expect(TestBed.inject(InteractionStatusService).busy()).toBe(false);
    });

    it('rejects a late refresh after the account changes', async () => {
      let finish!: (value:any) => void;
      mockAuth.refreshSession.mockImplementation(() => new Promise(resolve => finish=resolve));
      const pending=service.refreshPlan();
      service.currentUser.set({id:'different-doctor'} as User); service.session.set(null);
      finish({data:{session:planSession('PRO')},error:null});
      await expect(pending).rejects.toThrow('La sesión cambió');
      expect(service.currentUser()?.id).toBe('different-doctor'); expect(service.session()).toBeNull();
    });

    it('does not resurrect a signed-out account through a late SDK refresh event', async () => {
      let finish!: (value:any) => void;
      mockAuth.refreshSession.mockImplementation(() => new Promise(resolve => finish=resolve));
      const pending=service.refreshPlan();
      const callback=mockAuth.onAuthStateChange.mock.calls.at(-1)![0];
      callback('SIGNED_OUT', null);
      callback('TOKEN_REFRESHED', planSession('PRO'));
      finish({data:{session:planSession('PRO')},error:null});
      await expect(pending).rejects.toThrow('La sesión cambió');
      expect(service.isLoggedIn()).toBe(false); expect(service.getAccessToken()).toBeNull();
    });

    it('cleans up polling and ignores pending responses after destruction', async () => {
      let finish!: (value:any) => void;
      mockAuth.refreshSession.mockImplementation(() => new Promise(resolve => finish=resolve));
      window.dispatchEvent(new Event('focus'));
      TestBed.resetTestingModule();
      finish({data:{session:planSession('PRO')},error:null});
      await vi.advanceTimersByTimeAsync(120_000);
      window.dispatchEvent(new Event('focus'));
      expect(mockAuth.refreshSession).toHaveBeenCalledTimes(1);
      expect(service.getAccessToken()).toBe('old-token');
      expect(vi.getTimerCount()).toBe(0);
    });
  });

});
