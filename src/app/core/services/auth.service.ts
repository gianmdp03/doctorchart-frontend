import { computed, DestroyRef, effect, inject, Injectable, InjectionToken, PLATFORM_ID, signal, untracked } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  AuthResponse,
  createClient,
  OAuthResponse,
  Session,
  SignInWithPasswordCredentials,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

export const SUPABASE_CLIENT = new InjectionToken<SupabaseClient | null>('SUPABASE_CLIENT');

export interface SignUpParams {
  email: string;
  password: string;
  options?: {
    data?: {
      full_name?: string;
      dni?: string;
      role?: string;
      license?: string;
      [key: string]: unknown;
    };
    emailRedirectTo?: string;
  };
}

export interface DoctorChartModuleInfo {
  active: boolean;
  tier: string | null;
  expires_at: string | null;
  notExpired: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly destroyRef = inject(DestroyRef);
  private readonly entitlementClock = signal(Date.now());
  private entitlementTimer?: ReturnType<typeof setTimeout>;
  private authSubscription?: { unsubscribe(): void };
  private destroyed = false;
  private supabaseClient: SupabaseClient | null = inject(SUPABASE_CLIENT, { optional: true }) ?? null;

  readonly currentUser = signal<User | null>(null);
  readonly session = signal<Session | null>(null);
  readonly isLoggedIn = computed(() => !!this.currentUser());

  // Modal dialog state signals
  readonly isLoginModalOpen = signal<boolean>(false);
  readonly isProfileModalOpen = signal<boolean>(false);

  readonly userName = computed(() => {
    const user = this.currentUser();
    return (
      user?.user_metadata?.['full_name'] ||
      user?.user_metadata?.['name'] ||
      user?.email?.split('@')[0] ||
      'Usuario'
    );
  });

  readonly userEmail = computed(() => this.currentUser()?.email ?? null);

  readonly userInitial = computed(() => {
    const name = this.userName();
    return name ? name.charAt(0).toUpperCase() : 'U';
  });

  readonly userDni = computed(() => {
    const user = this.currentUser();
    return (user?.user_metadata?.['dni'] as string) || null;
  });

  readonly userRole = computed<string | null>(() => {
    const role = this.currentUser()?.app_metadata?.['role'];
    return typeof role === 'string' && role.trim() ? role.trim().toUpperCase().replace(/^ROLE_/, '') : null;
  });

  readonly isSuperAdmin = computed<boolean>(() => {
    return this.userRole() === 'SUPER_ADMIN';
  });
  readonly isCompany = computed<boolean>(() => this.userRole()?.toUpperCase() === 'COMPANY');

  readonly doctorchartModule = computed<DoctorChartModuleInfo | null>(() => {
    const user = this.currentUser();
    if (!user) {
      return null;
    }

    const appModules = user.app_metadata?.['app_modules'];
    const mod = appModules?.['doctorchart'];
    if (!mod || typeof mod !== 'object' || Array.isArray(mod)) {
      return null;
    }

    const active = mod.active === true;
    const tier = typeof mod.tier === 'string' ? mod.tier.trim().toUpperCase() : null;
    const expiresAt = typeof mod.expires_at === 'string' ? mod.expires_at : null;
    const parsedTime = this.expiryTime(expiresAt);
    const notExpired = Number.isFinite(parsedTime) && parsedTime > this.entitlementClock();

    return {
      active,
      tier,
      expires_at: expiresAt ? String(expiresAt) : null,
      notExpired,
    };
  });

  readonly hasDoctorchartPlan = computed<boolean>(() => {
    if (this.isSuperAdmin()) {
      return true;
    }
    const mod = this.doctorchartModule();
    if (!mod) {
      return false;
    }
    return mod.active && mod.notExpired && ['FREE_TRIAL', 'BASIC', 'PRO', 'UNLIMITED', 'ENTERPRISE'].includes(mod.tier ?? '');
  });

  readonly doctorchartPlanTier = computed<string | null>(() => {
    if (this.isSuperAdmin()) {
      return 'SUPER_ADMIN';
    }
    const mod = this.doctorchartModule();
    if (this.hasDoctorchartPlan() && mod?.tier) {
      return mod.tier;
    }
    return null;
  });

  readonly daysRemaining = computed<number>(() => {
    const mod = this.doctorchartModule();
    if (!mod || !mod.expires_at) {
      return 0;
    }
    const expTime = new Date(mod.expires_at).getTime();
    if (isNaN(expTime)) {
      return 0;
    }
    const diffMs = expTime - this.entitlementClock();
    return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  });

  readonly isAuthInitialized = signal<boolean>(!this.isBrowser);
  private authReadyResolver?: () => void;
  readonly authReady: Promise<void> = new Promise<void>((resolve) => {
    if (!this.isBrowser) {
      resolve();
    } else {
      this.authReadyResolver = resolve;
    }
  });

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      clearTimeout(this.entitlementTimer);
      this.authSubscription?.unsubscribe();
    });
    if (this.isBrowser) {
      effect(() => {
        this.currentUser();
        untracked(() => {
          this.entitlementClock.set(Date.now());
          this.scheduleEntitlementClock();
        });
      });
    }
    const supabaseUrl = environment.supabase.url;
    const supabaseAnonKey = environment.supabase.publishableKey;

    if (!this.supabaseClient && this.isBrowser) {
      this.supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
    }

    if (this.isBrowser) {
      this.initSession();
      this.initWindowEventListeners();
    }
  }

  private expiryTime(value: string | null): number {
    // Match the gateway's RFC3339 contract rather than permissive Date parsing.
    if (!value || !/^\d{4}-\d{2}-\d{2}T([01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,9})?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/.test(value)) return NaN;
    const [year, month, day] = value.slice(0, 10).split('-').map(Number);
    if (month < 1 || month > 12 || day < 1 || day > new Date(Date.UTC(year, month, 0)).getUTCDate()) return NaN;
    return Date.parse(value);
  }

  private scheduleEntitlementClock(): void {
    clearTimeout(this.entitlementTimer);
    const expiry = this.expiryTime(this.currentUser()?.app_metadata?.['app_modules']?.['doctorchart']?.expires_at ?? null);
    const remaining = expiry - Date.now();
    if (this.destroyed || !Number.isFinite(remaining) || remaining <= 0) return;
    this.entitlementTimer = setTimeout(() => {
      this.entitlementClock.set(Date.now());
      this.scheduleEntitlementClock();
    }, Math.min(60_000, remaining + 1));
  }

  setSupabaseClient(client: SupabaseClient | null): void {
    this.supabaseClient = client;
  }

  private initWindowEventListeners(): void {
    if (!this.isBrowser) return;

    window.addEventListener('open-login-modal', () => this.openLoginModal());
    window.addEventListener('close-login-modal', () => this.closeLoginModal());
    window.addEventListener('open-profile-modal', () => this.openProfileModal());
    window.addEventListener('close-profile-modal', () => this.closeProfileModal());
  }

  private async initSession(): Promise<void> {
    if (!this.supabaseClient) {
      this.isAuthInitialized.set(true);
      this.authReadyResolver?.();
      return;
    }

    let revision = 0;
    this.authSubscription = this.supabaseClient.auth.onAuthStateChange((_event, session) => {
      revision++;
      if (this.destroyed) return;
      this.session.set(session);
      this.currentUser.set(session?.user ?? null);
    }).data.subscription;
    const initialRevision = revision;
    try {
      const { data, error } = await this.supabaseClient.auth.getSession();
      if (this.destroyed || revision !== initialRevision) return;
      if (error) {
        console.warn('[DoctorChart AuthService] Error getting initial session:', error);
      }
      if (data?.session) {
        this.session.set(data.session);
        this.currentUser.set(data.session.user ?? null);
      } else {
        this.session.set(null);
        this.currentUser.set(null);
      }
    } catch (err) {
      console.warn('[DoctorChart AuthService] Init session exception:', err);
    } finally {
      this.isAuthInitialized.set(true);
      this.authReadyResolver?.();
    }
  }

  openLoginModal(): void {
    this.isLoginModalOpen.set(true);
  }

  closeLoginModal(): void {
    this.isLoginModalOpen.set(false);
  }

  openProfileModal(): void {
    this.isProfileModalOpen.set(true);
  }

  closeProfileModal(): void {
    this.isProfileModalOpen.set(false);
  }

  async signInWithPassword(credentials: SignInWithPasswordCredentials): Promise<AuthResponse> {
    if (!this.supabaseClient) {
      throw new Error('Supabase client is not available in this environment.');
    }
    const response = await this.supabaseClient.auth.signInWithPassword(credentials);
    if (response.data?.session) {
      this.session.set(response.data.session);
      this.currentUser.set(response.data.user);
    }
    return response;
  }

  async signUp(params: SignUpParams): Promise<AuthResponse> {
    if (!this.supabaseClient) {
      throw new Error('Supabase client is not available in this environment.');
    }
    const response = await this.supabaseClient.auth.signUp({
      email: params.email,
      password: params.password,
      options: params.options,
    });
    if (response.data?.session) {
      this.session.set(response.data.session);
      this.currentUser.set(response.data.user);
    }
    return response;
  }

  async signInWithOAuth(provider: 'google' = 'google'): Promise<OAuthResponse> {
    if (!this.supabaseClient) {
      throw new Error('Supabase client is not available in this environment.');
    }
    return await this.supabaseClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: this.isBrowser ? window.location.origin : undefined,
      },
    });
  }

  async signOut(): Promise<{ error: Error | null }> {
    if (!this.supabaseClient) {
      return { error: null };
    }
    const { error } = await this.supabaseClient.auth.signOut();
    this.session.set(null);
    this.currentUser.set(null);
    return { error };
  }

  getAccessToken(): string | null {
    return this.session()?.access_token ?? null;
  }
}
