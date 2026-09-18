import { TestBed } from '@angular/core/testing';
import { AuthService, SUPABASE_CLIENT } from './auth.service';
import { PLATFORM_ID } from '@angular/core';
import { Session, User } from '@supabase/supabase-js';

describe('AuthService', () => {
  let service: AuthService;
  let mockAuth: {
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
        user_metadata: {
          full_name: 'Dra. María González',
          dni: '32145678',
          role: 'DOCTOR',
        },
      } as unknown as User;

      service.currentUser.set(mockUser);

      expect(service.isLoggedIn()).toBe(true);
      expect(service.userName()).toBe('Dra. María González');
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

    it('should fallback to app_modules.doctor_chart and app_metadata.doctorchart', () => {
      // Fallback to doctor_chart
      service.currentUser.set({
        id: 'doc-fallback-1',
        app_metadata: {
          app_modules: {
            doctor_chart: {
              active: true,
              tier: 'BASIC',
            },
          },
        },
      } as unknown as User);

      expect(service.doctorchartModule()?.tier).toBe('BASIC');
      expect(service.hasDoctorchartPlan()).toBe(true);
      expect(service.doctorchartPlanTier()).toBe('BASIC');

      // Fallback to app_metadata.doctorchart
      service.currentUser.set({
        id: 'doc-fallback-2',
        app_metadata: {
          doctorchart: {
            active: true,
            tier: 'UNLIMITED',
          },
        },
      } as unknown as User);

      expect(service.doctorchartModule()?.tier).toBe('UNLIMITED');
      expect(service.hasDoctorchartPlan()).toBe(true);
      expect(service.doctorchartPlanTier()).toBe('UNLIMITED');
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

  describe('Modal UI State', () => {
    it('should control isLoginModalOpen via openLoginModal and closeLoginModal', () => {
      expect(service.isLoginModalOpen()).toBe(false);

      service.openLoginModal();
      expect(service.isLoginModalOpen()).toBe(true);

      service.closeLoginModal();
      expect(service.isLoginModalOpen()).toBe(false);
    });

    it('should control isProfileModalOpen via openProfileModal and closeProfileModal', () => {
      expect(service.isProfileModalOpen()).toBe(false);

      service.openProfileModal();
      expect(service.isProfileModalOpen()).toBe(true);

      service.closeProfileModal();
      expect(service.isProfileModalOpen()).toBe(false);
    });

    it('should respond to window CustomEvents for modal controls in browser', () => {
      window.dispatchEvent(new CustomEvent('open-login-modal'));
      expect(service.isLoginModalOpen()).toBe(true);

      window.dispatchEvent(new CustomEvent('close-login-modal'));
      expect(service.isLoginModalOpen()).toBe(false);

      window.dispatchEvent(new CustomEvent('open-profile-modal'));
      expect(service.isProfileModalOpen()).toBe(true);

      window.dispatchEvent(new CustomEvent('close-profile-modal'));
      expect(service.isProfileModalOpen()).toBe(false);
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

    it('should sign in with OAuth provider (default google)', async () => {
      mockAuth.signInWithOAuth.mockResolvedValue({
        data: { provider: 'google', url: 'https://accounts.google.com/o/oauth2' },
        error: null,
      });

      const res = await service.signInWithOAuth('google');

      expect(mockAuth.signInWithOAuth).toHaveBeenCalledWith({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      expect(res.data.url).toBe('https://accounts.google.com/o/oauth2');
    });

    it('should register with signUp and update state if session is returned', async () => {
      const mockUser = { id: 'new-user', email: 'new@example.com' } as unknown as User;
      const mockSession = { access_token: 'new-token', user: mockUser } as unknown as Session;

      mockAuth.signUp.mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null,
      });

      const res = await service.signUp({
        email: 'new@example.com',
        password: 'password123',
        options: {
          data: { full_name: 'New Doctor', dni: '44555666' },
        },
      });

      expect(mockAuth.signUp).toHaveBeenCalledWith({
        email: 'new@example.com',
        password: 'password123',
        options: {
          data: { full_name: 'New Doctor', dni: '44555666' },
        },
      });
      expect(service.session()).toEqual(mockSession);
      expect(service.currentUser()).toEqual(mockUser);
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
      ).rejects.toThrow('Supabase client is not available');

      await expect(
        service.signUp({ email: 'a@b.com', password: '123' })
      ).rejects.toThrow('Supabase client is not available');
    });
  });
});
