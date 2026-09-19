import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AppointmentDetail,
  AppointmentList,
  AppointmentMetrics,
  AppointmentRequest,
  AppointmentStatus,
} from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/appointments`;

  readonly appointments = signal<AppointmentList[]>([]);
  readonly currentAppointment = signal<AppointmentDetail | null>(null);
  readonly metrics = signal<AppointmentMetrics | null>(null);
  readonly loading = signal<boolean>(false);

  getAppointments(start?: string, end?: string): Observable<AppointmentList[]> {
    this.loading.set(true);
    let params = new HttpParams();
    if (start) params = params.set('start', start);
    if (end) params = params.set('end', end);

    return this.http.get<AppointmentList[]>(this.baseUrl, { params }).pipe(
      tap({
        next: (list) => {
          this.appointments.set(list || []);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      })
    );
  }

  getAppointmentById(id: number): Observable<AppointmentDetail> {
    this.loading.set(true);
    return this.http.get<AppointmentDetail>(`${this.baseUrl}/${id}`).pipe(
      tap({
        next: (detail) => {
          this.currentAppointment.set(detail);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      })
    );
  }

  createAppointment(request: AppointmentRequest): Observable<AppointmentDetail> {
    this.loading.set(true);
    return this.http.post<AppointmentDetail>(this.baseUrl, request).pipe(
      tap({
        next: (created) => {
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      })
    );
  }

  updateStatus(id: number, status: AppointmentStatus): Observable<AppointmentDetail> {
    return this.http.patch<AppointmentDetail>(`${this.baseUrl}/${id}/status`, { status }).pipe(
      tap({
        next: (updated) => {
          this.appointments.update((list) =>
            list.map((item) => (item.id === id ? { ...item, status: updated.status } : item))
          );
          if (this.currentAppointment()?.id === id) {
            this.currentAppointment.set(updated);
          }
        },
      })
    );
  }

  updateAppointment(id: number, request: AppointmentRequest): Observable<AppointmentDetail> {
    this.loading.set(true);
    return this.http.put<AppointmentDetail>(`${this.baseUrl}/${id}`, request).pipe(
      tap({
        next: (updated) => {
          this.currentAppointment.set(updated);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      })
    );
  }

  cancelAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap({
        next: () => {
          this.appointments.update((list) =>
            list.map((item) => (item.id === id ? { ...item, status: 'CANCELLED' as AppointmentStatus } : item))
          );
        },
      })
    );
  }

  getMetrics(): Observable<AppointmentMetrics> {
    return this.http.get<AppointmentMetrics>(`${this.baseUrl}/metrics`).pipe(
      tap({
        next: (m) => this.metrics.set(m),
      })
    );
  }
}
