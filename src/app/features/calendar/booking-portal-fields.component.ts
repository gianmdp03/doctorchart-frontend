import { Component, inject, input } from '@angular/core';
import { ControlContainer, FormsModule } from '@angular/forms';
import { PublicBookingForm } from '../appointments/appointments.models';
import { BookingPortalIdentity } from './bookings.models';

export function bookingPortalIntake(form: PublicBookingForm, draft: BookingPortalIdentity) {
  return {
    document: draft.document.trim(),
    email: draft.email.trim(),
    formVersion: form.version,
    answers: Object.fromEntries(form.questions
      .map(question => [question.key, draft.answers[question.key]?.trim() ?? ''])
      .filter(([, answer]) => answer !== '')),
  };
}

@Component({
  selector: 'app-booking-portal-fields',
  imports: [FormsModule],
  viewProviders: [{
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true }),
  }],
  template: `
    <label>
      DNI del solicitante
      <input name="portalDocument" [id]="idPrefix() + '-document'" inputmode="numeric"
        [(ngModel)]="draft().document" required pattern="[0-9]{5,8}" maxlength="8" autocomplete="off" />
    </label>
    <label>
      Email
      <input name="portalEmail" [id]="idPrefix() + '-email'" type="email"
        [(ngModel)]="draft().email" required email maxlength="254" autocomplete="email" spellcheck="false" />
    </label>
    <p>Con ese DNI y correo el solicitante puede consultar el turno en Mis turnos.</p>
    @if (form().questions.length) {
      <p class="questions-title">Información administrativa</p>
      @for (question of form().questions; track question.key) {
        <label>
          {{ question.label }}{{ question.required ? '' : ' (opcional)' }}
          <input [name]="'portal-' + question.key" [(ngModel)]="draft().answers[question.key]"
            [required]="question.required" maxlength="240" />
        </label>
      }
    }
  `,
  styles: `
    :host { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr)); gap: .75rem; }
    label { display: grid; gap: .35rem; font-weight: 600; min-width: 0; font-size: .875rem; }
    input {
      box-sizing: border-box; width: 100%; min-height: var(--dc-control-height);
      border: 1px solid var(--dc-control-line); border-radius: var(--dc-radius-control);
      padding: .55rem .75rem; background: var(--dc-paper); color: var(--dc-text); font: inherit; font-weight: 400;
    }
    p { grid-column: 1 / -1; margin: 0; color: var(--dc-text-secondary); font-size: .8125rem; }
    .questions-title { color: var(--dc-text); font-weight: 650; }
  `,
})
export class BookingPortalFieldsComponent {
  readonly idPrefix = input.required<string>();
  readonly form = input.required<PublicBookingForm>();
  readonly draft = input.required<BookingPortalIdentity>();
}
