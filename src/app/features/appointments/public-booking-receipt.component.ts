import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendarDays, lucideMapPin, lucideVideo } from '@ng-icons/lucide';
import { civilDate, displayDay, localTime } from '../calendar/bookings.models';
import { modalityLabel } from '../clinics/clinics.models';
import type { PublicConfirmation } from './appointments.models';

@Component({
  selector: 'app-public-booking-receipt',
  imports: [NgIcon],
  providers: [provideIcons({ lucideCalendarDays, lucideMapPin, lucideVideo })],
  styleUrl: './public-booking-receipt.component.css',
  template: `
    @let booking = receipt();
    <section class="receipt" aria-label="Datos del turno">
      <h2>{{ booking.doctorName }}</h2>
      @if (booking.specialtyName) {
        <p class="accent">{{ booking.specialtyName }}</p>
      }
      <dl>
        <div>
          <dt><ng-icon name="lucideCalendarDays" aria-hidden="true" /> Fecha y hora</dt>
          <dd>
            {{ displayDay(civilDate(booking.start, booking.timezone)) }} ·
            {{ localTime(booking.start, booking.timezone) }}–{{
              localTime(booking.end, booking.timezone)
            }}
          </dd>
          <dd class="muted">Hora de la agenda · {{ booking.timezone }}</dd>
          @if (patientTime()) {
            <dd>Tu hora local · {{ patientTime() }}</dd>
          }
        </div>
        <div>
          <dt>
            <ng-icon
              [name]="booking.modality === 'TELECONSULTATION' ? 'lucideVideo' : 'lucideMapPin'"
              aria-hidden="true"
            />
            {{ modalityLabel(booking.modality) }}
          </dt>
          <dd>{{ booking.clinicName }}</dd>
          @if (booking.address) {
            <dd class="muted">{{ booking.address }}</dd>
          }
        </div>
        <div class="reference">
          <dt>Referencia administrativa</dt>
          <dd>
            <code>{{ booking.reference }}</code>
          </dd>
        </div>
      </dl>
    </section>
  `,
})
export class PublicBookingReceiptComponent {
  readonly receipt =
    input.required<
      Pick<
        PublicConfirmation,
        | 'start'
        | 'end'
        | 'timezone'
        | 'doctorName'
        | 'specialtyName'
        | 'clinicName'
        | 'address'
        | 'modality'
        | 'reference'
      >
    >();
  readonly patientTime = input('');
  readonly civilDate = civilDate;
  readonly displayDay = displayDay;
  readonly localTime = localTime;
  readonly modalityLabel = modalityLabel;
}
