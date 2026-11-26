import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-basic-booking-notice',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header>
      <h1 class="dc-page-title">{{ featureTitle }}</h1>
    </header>
    <section class="access-notice" aria-labelledby="plan-access-title">
      <h2 id="plan-access-title">Tu plan Básico no incluye esta función</h2>
      <p>Para usarla, elegí un plan de DoctorChart que la incluya.</p>
      <a class="dc-button dc-button--primary" routerLink="/pricing">Ver planes</a>
    </section>
  `,
  styles: `
    :host { display: grid; gap: var(--dc-space-6); }
    .access-notice {
      max-inline-size: 44rem;
      padding: clamp(1rem, 4vw, 1.5rem);
      border: 1px solid var(--dc-line);
      border-radius: var(--dc-radius-card);
      background: var(--dc-paper);
    }
    h2 { margin: 0; font-size: 1.125rem; line-height: 1.4; }
    p { margin: var(--dc-space-2) 0 var(--dc-space-4); color: var(--dc-text-secondary); }
  `,
})
export class BasicBookingNoticeComponent {
  protected readonly featureTitle: string = inject(ActivatedRoute).snapshot.data['featureTitle'];
}
