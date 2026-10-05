import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, timeout } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DoctorProfile } from '../models/doctor-profile.model';

@Injectable({ providedIn: 'root' })
export class DoctorProfileService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  readonly profile = signal<DoctorProfile | null>(null);
  readonly loading = signal(false);
  readonly loaded = signal(false);
  readonly error = signal<string | null>(null);
  readonly hasSpecialty = computed(() => this.profile()?.specialty != null);
  readonly specialty = computed(() => this.profile()?.specialty ?? null);
  readonly isSpecialtyLocked = computed(() => this.profile()?.isSpecialtyLocked ?? false);
  private request: Promise<DoctorProfile | null> | null = null;
  private epoch = 0;

  async loadProfile(force = false): Promise<DoctorProfile | null> {
    if (!isPlatformBrowser(this.platformId)) return null;
    if (this.request) return this.request;
    if (!force && this.loaded()) return structuredClone(this.profile());
    const epoch = this.epoch;
    this.loading.set(true);
    this.error.set(null);
    const request = (async () => {
      try {
        const profile = await firstValueFrom(this.http.get<DoctorProfile | null>(`${environment.apiUrl}/doctor/profile`).pipe(timeout(6000)));
        if (epoch !== this.epoch) throw new Error('La sesión cambió durante la carga del perfil.');
        this.profile.set(structuredClone(profile));
        this.loaded.set(true);
        return structuredClone(profile);
      } catch (error) {
        if (epoch === this.epoch) {
          if (error instanceof HttpErrorResponse && error.status === 404) {
            this.profile.set(null);
            this.loaded.set(true);
            return null;
          }
          this.loaded.set(false);
          this.error.set(error instanceof Error ? error.message : 'No se pudo cargar el perfil.');
        }
        throw error;
      } finally {
        if (epoch === this.epoch) {
          this.loading.set(false);
          this.request = null;
        }
      }
    })();
    this.request = request;
    return request;
  }
  clearProfile(): void {
    ++this.epoch;
    this.profile.set(null);
    this.loaded.set(false);
    this.loading.set(false);
    this.error.set(null);
    this.request = null;
  }
}
