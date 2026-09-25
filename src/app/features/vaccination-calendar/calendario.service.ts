import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { CalendarioVacunacionJSON } from './calendario.types';

export const CALENDARIO_VACUNACION_URL =
  'https://gist.githubusercontent.com/gianmdp03/8cc442cce33c3fd2485de18a2aa89638/raw/cal_vacunacion.json';

@Injectable({ providedIn: 'root' })
export class VaccinationCalendarService {
  private readonly http = inject(HttpClient);

  readonly data = signal<CalendarioVacunacionJSON | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly hasData = computed(() => this.data() !== null);

  /** Loads the official calendar and updates the exposed signal state. */
  load(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<CalendarioVacunacionJSON>(CALENDARIO_VACUNACION_URL)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (calendar) => this.data.set(calendar),
        error: (error: unknown) => {
          this.error.set(this.toErrorMessage(error));
        },
      });
  }

  /** Removes the loaded calendar and any previous request error. */
  clear(): void {
    this.data.set(null);
    this.error.set(null);
    this.loading.set(false);
  }

  private toErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      return error.status
        ? `No se pudo cargar el calendario de vacunación (HTTP ${error.status}).`
        : 'No se pudo conectar con el calendario de vacunación.';
    }

    return 'No se pudo cargar el calendario de vacunación.';
  }
}
