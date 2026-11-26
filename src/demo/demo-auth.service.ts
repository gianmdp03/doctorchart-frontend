import { computed, inject, Injectable, signal } from '@angular/core';
import type { Session, User } from '@supabase/supabase-js';
import type { DoctorChartModuleInfo } from '../app/core/services/auth.service';
import { DEMO_CLINICIAN_ID } from './demo-data';
import { DemoSessionService } from './demo-session.service';

@Injectable({ providedIn: 'root' })
export class DemoAuthService {
  private readonly demoSession = inject(DemoSessionService);

  readonly currentUser = computed<User | null>(() => {
    if (!this.demoSession.hasSession()) return null;
    const expiresAt = new Date(this.demoSession.until() || Date.now() + 86_400_000).toISOString();
    return {
      id: DEMO_CLINICIAN_ID,
      email: 'demo@doctorchart.bycode.com.ar',
      app_metadata: {
        role: 'DOCTOR',
        app_modules: {
          doctorchart: {
            active: true,
            tier: 'PRO',
            expires_at: expiresAt,
          },
        },
      },
      user_metadata: {
        full_name: 'Dra. Valentina Gómez',
        dni: '34.892.104',
        role: 'Médica',
        license: 'MN 148.920',
      },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    } as unknown as User;
  });

  readonly session = signal<Session | null>(null);
  readonly isLoggedIn = computed(() => !!this.currentUser());
  readonly userName = computed(() => 'Dra. Valentina Gómez');
  readonly userEmail = computed(() => 'demo@doctorchart.bycode.com.ar');
  readonly userInitial = computed(() => 'V');
  readonly userDni = computed(() => '34.892.104');
  readonly userRole = computed(() => 'DOCTOR');
  readonly isSuperAdmin = computed(() => false);
  readonly isCompany = computed(() => false);

  readonly doctorchartModule = computed<DoctorChartModuleInfo | null>(() => {
    if (!this.isLoggedIn()) return null;
    return {
      active: true,
      tier: 'PRO',
      expires_at: new Date(this.demoSession.until() || Date.now() + 86_400_000).toISOString(),
      notExpired: true,
    };
  });

  readonly hasDoctorchartPlan = computed(() => this.isLoggedIn());
  readonly doctorchartPlanTier = computed(() => (this.isLoggedIn() ? 'PRO' : null));
  readonly daysRemaining = computed(() => 1);
  readonly isAuthInitialized = computed(() => this.demoSession.ready());
  readonly authReady = Promise.resolve();

  getAccessToken(): string | null {
    return this.isLoggedIn() ? 'demo-local-token' : null;
  }

  async signOut(): Promise<{ error: Error | null }> {
    this.demoSession.returnToStart();
    return { error: null };
  }

  async refreshPlan(): Promise<void> {
    return;
  }
}
