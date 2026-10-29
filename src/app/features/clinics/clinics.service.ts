import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, InjectionToken, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Clinic,
  ClinicCapabilities,
  ClinicListResponse,
  CreateClinicRequest,
  UpdateClinicRequest,
  UpdateClinicStatusRequest,
} from './clinics.models';
import { ClinicsListQuery, ClinicsTransport } from './clinics.mocks';

export const CLINICS_TRANSPORT = new InjectionToken<ClinicsTransport>('CLINICS_TRANSPORT');

@Injectable({
  providedIn: 'root',
})
export class ClinicsService implements ClinicsTransport {
  private readonly http = inject(HttpClient, { optional: true });
  private readonly customTransport = inject(CLINICS_TRANSPORT, { optional: true });
  private readonly baseUrl = `${environment.apiUrl}/clinics`;

  listClinics(query?: ClinicsListQuery): Observable<ClinicListResponse> {
    if (this.customTransport) {
      return this.customTransport.listClinics(query).pipe(map((res) => structuredClone(res)));
    }
    const http = this.requireHttp();
    let params = new HttpParams();
    if (query?.page !== undefined) {
      params = params.set('page', String(query.page));
    }
    if (query?.size !== undefined) {
      params = params.set('size', String(query.size));
    }
    if (query?.status !== undefined) {
      params = params.set('status', query.status);
    }
    return http
      .get<ClinicListResponse>(this.baseUrl, { params })
      .pipe(map((res) => structuredClone(res)));
  }

  getCapabilities(): Observable<ClinicCapabilities> {
    if (this.customTransport) {
      return this.customTransport.getCapabilities().pipe(map((res) => structuredClone(res)));
    }
    return this.requireHttp()
      .get<ClinicCapabilities>(`${this.baseUrl}/capabilities`)
      .pipe(map((res) => structuredClone(res)));
  }

  getClinic(id: string): Observable<Clinic> {
    if (this.customTransport) {
      return this.customTransport.getClinic(id).pipe(map((res) => structuredClone(res)));
    }
    return this.requireHttp()
      .get<Clinic>(`${this.baseUrl}/${encodeURIComponent(id)}`)
      .pipe(map((res) => structuredClone(res)));
  }

  createClinic(payload: CreateClinicRequest): Observable<Clinic> {
    const body: CreateClinicRequest = {
      name: payload.name.trim(),
      country: payload.country.trim(),
      province: payload.province.trim(),
      city: payload.city.trim(),
      address: payload.address.trim(),
      timezone: payload.timezone.trim(),
    };
    if (this.customTransport) {
      return this.customTransport.createClinic(body).pipe(map((res) => structuredClone(res)));
    }
    return this.requireHttp()
      .post<Clinic>(this.baseUrl, body)
      .pipe(map((res) => structuredClone(res)));
  }

  updateClinic(id: string, payload: UpdateClinicRequest): Observable<Clinic> {
    const body: UpdateClinicRequest = {
      expectedVersion: payload.expectedVersion.trim(),
    };
    if (payload.name !== undefined) body.name = payload.name.trim();
    if (payload.country !== undefined) body.country = payload.country.trim();
    if (payload.province !== undefined) body.province = payload.province.trim();
    if (payload.city !== undefined) body.city = payload.city.trim();
    if (payload.address !== undefined) body.address = payload.address.trim();
    if (payload.timezone !== undefined) body.timezone = payload.timezone.trim();

    if (this.customTransport) {
      return this.customTransport.updateClinic(id, body).pipe(map((res) => structuredClone(res)));
    }
    return this.requireHttp()
      .patch<Clinic>(`${this.baseUrl}/${encodeURIComponent(id)}`, body)
      .pipe(map((res) => structuredClone(res)));
  }

  updateClinicStatus(id: string, payload: UpdateClinicStatusRequest): Observable<Clinic> {
    const body: UpdateClinicStatusRequest = {
      expectedVersion: payload.expectedVersion.trim(),
      status: payload.status,
    };
    if (this.customTransport) {
      return this.customTransport
        .updateClinicStatus(id, body)
        .pipe(map((res) => structuredClone(res)));
    }
    return this.requireHttp()
      .patch<Clinic>(`${this.baseUrl}/${encodeURIComponent(id)}/status`, body)
      .pipe(map((res) => structuredClone(res)));
  }

  private requireHttp(): HttpClient {
    if (!this.http) {
      throw new Error('HttpClient is required when CLINICS_TRANSPORT is not provided.');
    }
    return this.http;
  }
}
