import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideArrowRight, lucideShieldCheck } from '@ng-icons/lucide';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { PublicBookingReceiptComponent } from './public-booking-receipt.component';

export interface RecoveredConfirmation {
  modality?: 'IN_PERSON' | 'TELECONSULTATION';
  specialtyName?: string;
  reference: string;
  status: string;
  start: string;
  end: string;
  doctorName: string;
  clinicName: string;
  address: string;
  timezone: string;
  accessExpiresAt: string;
}
@Component({
  selector: 'app-confirmation-page',
  imports: [FormsModule, RouterLink, NgIcon, ThemeToggleComponent, PublicBookingReceiptComponent],
  providers: [provideIcons({ lucideArrowLeft, lucideArrowRight, lucideShieldCheck })],
  styleUrls: ['./public-booking.css', './confirmation-page.component.css'],
  templateUrl: './confirmation-page.component.html',
})
export class ConfirmationPageComponent {
  private readonly http = inject(HttpClient);
  private alive = true;
  readonly busy = signal(false);
  readonly error = signal('');
  readonly confirmation = signal<RecoveredConfirmation | null>(null);
  accessCode = '';
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.alive = false;
      this.accessCode = '';
      this.confirmation.set(null);
    });
  }
  statusLabel(status: string) {
    return (
      (
        {
          CONFIRMED: 'Turno confirmado',
          CANCELLED: 'Turno cancelado',
          CHECKED_IN: 'Llegada registrada',
          COMPLETED: 'Turno atendido',
          NO_SHOW: 'Ausencia registrada',
        } as Record<string, string>
      )[status] ?? 'Estado del turno'
    );
  }
  async consult() {
    if (this.busy()) return;
    this.busy.set(true);
    this.error.set('');
    this.confirmation.set(null);
    try {
      const c = await firstValueFrom(
        this.http.post<RecoveredConfirmation>(
          environment.apiUrl.replace(/\/$/, '') + '/public/appointments/confirmation',
          { accessCode: this.accessCode.trim() },
          { transferCache: false },
        ),
      );
      if (this.alive) this.confirmation.set(c);
    } catch (e) {
      if (!this.alive) return;
      const status = (e as HttpErrorResponse).status;
      this.error.set(
        status === 404
          ? 'No encontramos una constancia vigente para ese código. Revisalo o contactá al consultorio.'
          : status === 429
            ? 'Demasiadas consultas. Esperá un minuto y reintentá.'
            : 'No pudimos consultar el turno. Conservamos tu código para que puedas reintentar.',
      );
    } finally {
      if (this.alive) this.busy.set(false);
    }
  }
}
