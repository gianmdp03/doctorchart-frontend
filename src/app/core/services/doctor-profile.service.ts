import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DoctorProfile } from '../models/doctor-profile.model';
import { MedicalSpecialty } from '../models/specialty.model';
import { DoctorSpecialtyService } from './doctor-specialty.service';

@Injectable({
  providedIn: 'root',
})
export class DoctorProfileService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly doctorSpecialtyService = inject(DoctorSpecialtyService);
  private readonly apiUrl = `${environment.apiUrl}/doctor`;

  readonly profile = signal<DoctorProfile | null>(null);
  readonly loading = signal<boolean>(false);
  readonly loaded = signal<boolean>(false);

  readonly hasSpecialty = computed(() => !!this.profile()?.specialty);
  readonly specialty = computed(() => this.profile()?.specialty ?? null);
  readonly isSpecialtyLocked = computed(() => !!this.profile()?.isSpecialtyLocked);

  async loadProfile(): Promise<DoctorProfile | null> {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    this.loading.set(true);
    try {
      const result = await firstValueFrom(
        this.http.get<DoctorProfile>(`${this.apiUrl}/profile`)
      );
      this.profile.set(result);
      if (result?.specialty) {
        this.doctorSpecialtyService.setSpecialty(result.specialty);
      } else {
        this.doctorSpecialtyService.clearSpecialty();
      }
      this.loaded.set(true);
      return result;
    } catch (err: unknown) {
      this.profile.set(null);
      this.doctorSpecialtyService.clearSpecialty();
      this.loaded.set(true);
      return null;
    } finally {
      this.loading.set(false);
    }
  }

  async assignSpecialty(specialty: MedicalSpecialty): Promise<DoctorProfile> {
    this.loading.set(true);
    try {
      const result = await firstValueFrom(
        this.http.post<DoctorProfile>(`${this.apiUrl}/specialty`, { specialty })
      );
      this.profile.set(result);
      if (result?.specialty) {
        this.doctorSpecialtyService.setSpecialty(result.specialty);
      }
      this.loaded.set(true);
      return result;
    } finally {
      this.loading.set(false);
    }
  }

  clearProfile(): void {
    this.profile.set(null);
    this.loaded.set(false);
    this.doctorSpecialtyService.clearSpecialty();
  }
}
