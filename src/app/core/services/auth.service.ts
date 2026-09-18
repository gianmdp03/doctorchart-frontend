import { computed, inject, Injectable, InjectionToken, PLATFORM_ID, signal } from '@angular/core';
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
    const user = this.currentUser();
    return (
      (user?.app_metadata?.['role'] as string) ||
      (user?.user_metadata?.['role'] as string) ||
      null
    );
  });

  readonly isSuperAdmin = computed<boolean>(() => this.userRole()?.toUpperCase() === 'SUPER_ADMIN');
  readonly isCompany = computed<boolean>(() => this.userRole()?.toUpperCase() === 'COMPANY');

  readonly doctorchartModule = computed<DoctorChartModuleInfo | null>(() => {
    const user = this.currentUser();
    if (!user) {
      return null;
    }

    const appMeta = (user.app_metadata || {}) as Record<string, any>;
    const userMeta = (user.user_metadata || {}) as Record<string, any>;
    const appModules = (appMeta['app_modules'] || userMeta['app_modules']) as Record<string, any> | undefined;

    let mod: any = null;
    if (appModules && typeof appModules === 'object') {
      mod = appModules['doctorchart'] || appModules['doctor_chart'];
    }

    if (!mod || typeof mod !== 'object') {
      mod = appMeta['doctorchart'] || appMeta['doctor_chart'] || userMeta['doctorchart'] || userMeta['doctor_chart'];
    }

    if (!mod || typeof mod !== 'object') {
      return null;
    }

    const active = mod.active === true || mod.active === 'true';
    const tier = mod.tier ? String(mod.tier).trim().toUpperCase() : null;
    const expiresAt = mod.expires_at || mod.expiresAt || null;

    let notExpired = true;
    if (expiresAt != null) {
      const parsedTime = new Date(expiresAt).getTime();
      notExpired = !isNaN(parsedTime) && parsedTime > Date.now();
    }

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
    return mod.active && mod.notExpired;
  });

  readonly doctorchartPlanTier = computed<string | null>(() => {
    if (this.isSuperAdmin()) {
      return 'SUPER_ADMIN';
    }
    const mod = this.doctorchartModule();
    if (mod && mod.tier) {
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
    const diffMs = expTime - Date.now();
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

    try {
      const { data, error } = await this.supabaseClient.auth.getSession();
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

    this.supabaseClient.auth.onAuthStateChange((_event, session) => {
      this.session.set(session);
      this.currentUser.set(session?.user ?? null);
    });
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
