import { GOOGLE_AUTH_ENABLED, LOCAL_REGISTRATION_ENABLED } from '../../auth-policy';
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
import { InteractionStatusService } from './interaction-status.service';
import { createAuthFetch } from './auth-fetch';

export const SUPABASE_CLIENT = new InjectionToken<SupabaseClient | null>('SUPABASE_CLIENT');

export function doctorchartSessionOptions(mailCallback: boolean) {
  return {persistSession: true, autoRefreshToken: true, detectSessionInUrl: !mailCallback};
}

/** Legacy email links belong to Bycode's isolated result flow, never to this app's session. */
export function forwardDoctorchartMailCallback(
  location: Pick<Location, 'hash' | 'pathname' | 'search' | 'replace'>,
  history: Pick<History, 'replaceState'>,
): boolean {
  const type = new URLSearchParams(location.hash.replace(/^#/, '')).get('type');
  if (!type || !['signup', 'invite', 'email_change', 'recovery', 'magiclink'].includes(type)) return false;
  const path = type === 'recovery' ? '/reset-password' : type === 'email_change' ? '/email-change-success' : '/auth-success';
  const destination = new URL(path, environment.bycodePlansUrl);
  destination.hash = location.hash;
  history.replaceState(null, '', location.pathname + location.search);
  location.replace(destination.href);
  return true;
}

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
  private readonly interaction = inject(InteractionStatusService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly destroyRef = inject(DestroyRef);
  private readonly entitlementClock = signal(Date.now());
  private entitlementTimer?: ReturnType<typeof setTimeout>;
  private authSubscription?: { unsubscribe(): void };
  private destroyed = false;
  private planTimer?: ReturnType<typeof setTimeout>;
  private planRefresh?: Promise<void>;
  private planRefreshGeneration?: number;
  private cancelPlanRefresh?: () => void;
  private lastPlanRefresh = -Infinity;
  private sessionGeneration = 0;
  private readonly onPlanFocus = () => {
    this.schedulePlanRefresh();
    if (document.visibilityState === 'visible' && Date.now() - this.lastPlanRefresh >= 15_000) {
      void this.refreshPlanQuietly();
    }
  };
  private readonly onPlanVisibility = () => {
    if (document.visibilityState === 'visible') this.onPlanFocus();
    else clearTimeout(this.planTimer);
  };
  private supabaseClient: SupabaseClient | null = inject(SUPABASE_CLIENT, { optional: true }) ?? null;

  readonly currentUser = signal<User | null>(null);
  readonly session = signal<Session | null>(null);
  readonly isLoggedIn = computed(() => !!this.currentUser());


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
    const mailCallback = this.isBrowser && forwardDoctorchartMailCallback(window.location, window.history);
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      clearTimeout(this.entitlementTimer);
      clearTimeout(this.planTimer);
      this.cancelPlanRefresh?.();
      if (this.isBrowser) {
        window.removeEventListener('focus', this.onPlanFocus);
        document.removeEventListener('visibilitychange', this.onPlanVisibility);
      }
      this.authSubscription?.unsubscribe();
    });
    if (this.isBrowser) {
      window.addEventListener('focus', this.onPlanFocus);
      document.addEventListener('visibilitychange', this.onPlanVisibility);
      effect(() => {
        this.currentUser();
        untracked(() => {
          this.entitlementClock.set(Date.now());
          this.scheduleEntitlementClock();
          this.schedulePlanRefresh();
        });
      });
    }
    const supabaseUrl = environment.supabase.url;
    const supabaseAnonKey = environment.supabase.publishableKey;

    if (!this.supabaseClient && this.isBrowser) {
      this.supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
        global: { fetch: createAuthFetch() },
        auth: doctorchartSessionOptions(mailCallback),
      });
    }

    if (this.isBrowser) {
      this.initSession();
    }
  }

  private schedulePlanRefresh(): void {
    clearTimeout(this.planTimer);
    if (this.destroyed || !this.isBrowser || document.visibilityState !== 'visible' || !this.currentUser()) return;
    this.planTimer = setTimeout(() => void this.refreshPlanQuietly(), 60_000);
  }

  private async refreshPlanQuietly(): Promise<void> {
    if (!this.currentUser() || this.destroyed || document.visibilityState !== 'visible') return;
    try { await this.refreshPlan(false); }
    catch { /* Keep the last server-confirmed session; the next visible check can retry. */ }
    finally { this.schedulePlanRefresh(); }
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


  private async initSession(): Promise<void> {
    if (!this.supabaseClient) {
      this.isAuthInitialized.set(true);
      this.authReadyResolver?.();
      return;
    }

    let revision = 0;
    let finishInitialEvent!: (value: { data: { session: Session | null }; error: null }) => void;
    const initialEvent = new Promise<{ data: { session: Session | null }; error: null }>(resolve => { finishInitialEvent = resolve; });
    this.authSubscription = this.supabaseClient.auth.onAuthStateChange((_event, session) => {
      revision++;
      if (this.destroyed) return;
      if (_event === 'TOKEN_REFRESHED' && this.planRefresh &&
          (this.planRefreshGeneration !== this.sessionGeneration || this.currentUser()?.id !== session?.user.id)) return;
      if (_event === 'SIGNED_OUT' || this.currentUser()?.id !== session?.user.id) this.sessionGeneration++;
      this.session.set(session);
      this.currentUser.set(session?.user ?? null);
      this.isAuthInitialized.set(true);
      this.authReadyResolver?.();
      finishInitialEvent({ data: { session }, error: null });
    }).data.subscription;
    const initialRevision = revision;
    try {
      const { data, error } = await this.interaction.wait(Promise.race([this.supabaseClient.auth.getSession(), initialEvent]));
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

  async signInWithPassword(credentials: SignInWithPasswordCredentials): Promise<AuthResponse> {
    if (!this.supabaseClient) {
      throw new Error('Supabase client is not available in this environment.');
    }
    this.sessionGeneration++;
    const response = await this.interaction.wait(this.supabaseClient.auth.signInWithPassword(credentials));
    if (response.data?.session) {
      this.session.set(response.data.session);
      this.currentUser.set(response.data.user);
    }
    return response;
  }

  async signUp(params: SignUpParams): Promise<AuthResponse> {
    if (!LOCAL_REGISTRATION_ENABLED) throw new Error('Creá tu cuenta en Bycode.');
    if (!this.supabaseClient) {
      throw new Error('Supabase client is not available in this environment.');
    }
    const response = await this.supabaseClient.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        ...params.options,
        emailRedirectTo: params.options?.emailRedirectTo || (this.isBrowser ? window.location.origin : environment.appUrl) + '/login',
      },
    });
    if (response.data?.session) {
      this.session.set(response.data.session);
      this.currentUser.set(response.data.user);
    }
    return response;
  }

  async signInWithOAuth(provider: 'google' = 'google'): Promise<OAuthResponse> {
    if (!GOOGLE_AUTH_ENABLED) { throw new Error('El acceso con Google está deshabilitado temporalmente.'); }
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

  async refreshPlan(interactive = true): Promise<void> {
    if (interactive) return this.interaction.wait(this.refreshPlan(false));
    if (this.planRefresh) return this.planRefresh;
    const identity = this.currentUser()?.id;
    if (!this.supabaseClient || !identity) throw new Error('No hay una sesión activa.');
    const generation = this.sessionGeneration;
    this.planRefreshGeneration = generation;
    const client = this.supabaseClient;
    this.lastPlanRefresh = Date.now();
    this.planRefresh = (async () => {
      let timer: ReturnType<typeof setTimeout> | undefined;
      try {
        const deadline = new Promise<never>((_, reject) => {
          this.cancelPlanRefresh = () => reject(new Error('La actualización de sesión terminó.'));
          timer = setTimeout(() => reject(new Error('No pudimos actualizar tu plan. Reintentá en unos momentos.')), 12_000);
        });
        const { data, error } = await Promise.race([client.auth.refreshSession(), deadline]);
        if (error || !data.session) throw new Error('No pudimos actualizar tu plan. Reintentá en unos momentos.');
        if (this.destroyed || generation !== this.sessionGeneration || this.currentUser()?.id !== identity || data.session.user.id !== identity) {
          throw new Error('La sesión cambió. Volvé a iniciar sesión.');
        }
        this.session.set(data.session);
        this.currentUser.set(data.session.user);
      } finally {
        clearTimeout(timer);
        this.cancelPlanRefresh = undefined;
        this.planRefresh = undefined;
      }
    })();
    return this.planRefresh;
  }

  async signOut(): Promise<{ error: Error | null }> {
    this.sessionGeneration++;
    if (!this.supabaseClient) {
      return { error: null };
    }
    try {
      const { error } = await this.interaction.wait(this.supabaseClient.auth.signOut());
      if (!error) { this.session.set(null); this.currentUser.set(null); }
      else this.interaction.error.set('No pudimos confirmar el cierre de sesión. Reintentá.');
      return { error };
    } catch (error) { return { error: error instanceof Error ? error : new Error('No pudimos cerrar la sesión.') }; }
  }

  getAccessToken(): string | null {
    return this.session()?.access_token ?? null;
  }
}
