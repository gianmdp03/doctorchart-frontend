import { HttpClient } from '@angular/common/http';
import { computed, DestroyRef, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PrintIdentity } from '../models/doctor-profile.model';
import { doctorPrintIdentity } from '../models/doctor-print-identity';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class DoctorPrintIdentityService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly identity = signal<PrintIdentity | null>(null);
  readonly loading = signal(false);
  readonly savingLicense = signal(false);
  readonly savingLogo = signal(false);
  readonly logoObjectUrl = signal<string | null>(null);
  readonly error = signal<string | null>(null);

  readonly authoritativeLicense = computed(() => {
    const id = this.identity();
    if (id) {
      if (id.licenseConfigured) {
        return id.professionalLicense.trim();
      }
      if (id.professionalLicense.trim()) {
        return id.professionalLicense.trim();
      }
    }
    return doctorPrintIdentity(this.auth.currentUser()?.user_metadata).license;
  });

  readonly logoSha256 = computed(() => this.identity()?.logoSha256 ?? null);

  private loadedOwner: string | null = null;
  private loadedLogoSha: string | null = null;

  constructor() {
    effect(() => {
      const owner = this.auth.currentUser()?.id ?? null;
      if (owner !== this.loadedOwner) {
        this.loadedOwner = owner;
        this.identity.set(null);
        this.error.set(null);
        this.replaceLogoUrl(null);
        this.loadedLogoSha = null;
      }
    });
    this.destroyRef.onDestroy(() => this.replaceLogoUrl(null));
  }

  private replaceLogoUrl(nextUrl: string | null): void {
    const prev = this.logoObjectUrl();
    if (prev) {
      URL.revokeObjectURL(prev);
    }
    this.logoObjectUrl.set(nextUrl);
  }

  async load(force = false): Promise<PrintIdentity | null> {
    if (!isPlatformBrowser(this.platformId) || !this.auth.currentUser()?.id) {
      return null;
    }
    if (!force && this.identity()) {
      return this.identity();
    }
    this.loading.set(true);
    this.error.set(null);
    try {
      const result = await firstValueFrom(
        this.http.get<PrintIdentity>(`${environment.apiUrl}/workspace/print-identity`),
      );
      this.identity.set(result);
      await this.syncLogoPreview(result);
      return result;
    } catch (err: unknown) {
      const msg = (err as { error?: { message?: string } })?.error?.message ?? 'No se pudo cargar la configuración de impresión.';
      this.error.set(msg);
      return null;
    } finally {
      this.loading.set(false);
    }
  }

  async saveLicense(professionalLicense: string): Promise<PrintIdentity> {
    this.savingLicense.set(true);
    this.error.set(null);
    try {
      const updated = await firstValueFrom(
        this.http.put<PrintIdentity>(`${environment.apiUrl}/workspace/print-identity`, {
          professionalLicense: professionalLicense.trim(),
        }),
      );
      this.identity.set(updated);
      return updated;
    } finally {
      this.savingLicense.set(false);
    }
  }

  async uploadLogo(blob: Blob): Promise<PrintIdentity> {
    this.savingLogo.set(true);
    this.error.set(null);
    try {
      const formData = new FormData();
      formData.append('file', blob, 'clinic-logo.png');
      const updated = await firstValueFrom(
        this.http.post<PrintIdentity>(`${environment.apiUrl}/workspace/logo`, formData),
      );
      this.identity.set(updated);
      this.loadedLogoSha = null;
      await this.syncLogoPreview(updated);
      return updated;
    } finally {
      this.savingLogo.set(false);
    }
  }

  async deleteLogo(): Promise<void> {
    this.savingLogo.set(true);
    this.error.set(null);
    try {
      await firstValueFrom(this.http.delete<void>(`${environment.apiUrl}/workspace/logo`));
      const current = this.identity();
      if (current) {
        this.identity.set({
          ...current,
          hasLogo: false,
          logoSha256: null,
          logoWidth: null,
          logoHeight: null,
        });
      }
      this.loadedLogoSha = null;
      this.replaceLogoUrl(null);
    } finally {
      this.savingLogo.set(false);
    }
  }

  private async syncLogoPreview(identity: PrintIdentity): Promise<void> {
    if (!identity.hasLogo || !identity.logoSha256) {
      this.loadedLogoSha = null;
      this.replaceLogoUrl(null);
      return;
    }
    if (this.loadedLogoSha === identity.logoSha256 && this.logoObjectUrl()) {
      return;
    }
    try {
      const blob = await firstValueFrom(
        this.http.get(`${environment.apiUrl}/workspace/logo`, {
          params: { v: identity.logoSha256 },
          responseType: 'blob',
        }),
      );
      this.loadedLogoSha = identity.logoSha256;
      this.replaceLogoUrl(URL.createObjectURL(blob));
    } catch {
      this.loadedLogoSha = null;
      this.replaceLogoUrl(null);
    }
  }
}
