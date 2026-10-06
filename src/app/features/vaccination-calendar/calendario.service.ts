import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Subscription, finalize } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CalendarioVacunacionJSON } from './calendario.types';
@Injectable({ providedIn: 'root' })
export class VaccinationCalendarService {
  private readonly http = inject(HttpClient);
  private request?: Subscription;
  private read = 0;
  readonly data = signal<CalendarioVacunacionJSON | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly hasData = computed(() => this.data() !== null);
  load(): void {
    if (this.hasData() || this.loading()) return;
    const read = ++this.read;
    this.loading.set(true);
    this.error.set(null);
    this.request = this.http
      .get<CalendarioVacunacionJSON>(environment.apiUrl + '/vaccination-calendar')
      .pipe(
        finalize(() => {
          if (read === this.read) this.loading.set(false);
        }),
      )
      .subscribe({
        next: (calendar) => {
          if (read === this.read) this.data.set(calendar);
        },
        error: (error: unknown) => {
          if (read === this.read)
            this.error.set(
              error instanceof HttpErrorResponse && error.status
                ? 'No se pudo cargar el calendario de vacunación (HTTP ' + error.status + ').'
                : 'No se pudo cargar el calendario de vacunación.',
            );
        },
      });
  }
  clear(): void {
    this.read++;
    this.request?.unsubscribe();
    this.data.set(null);
    this.error.set(null);
    this.loading.set(false);
  }
}
