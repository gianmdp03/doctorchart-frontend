import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft } from '@ng-icons/lucide';
import { ClinicalAccessComponent } from '../patient-record/clinical-access.component';
import { ClinicalRevisionsComponent } from '../patient-record/clinical-revisions.component';

@Component({
  selector: 'app-patient-administration-page',
  imports: [RouterLink, NgIconComponent, ClinicalAccessComponent, ClinicalRevisionsComponent],
  providers: [provideIcons({ lucideArrowLeft })],
  template: `
    <section class="administration-page" aria-labelledby="administration-heading">
      <a routerLink="/patients" class="dc-button back-action">
        <ng-icon name="lucideArrowLeft" aria-hidden="true" />
        Volver a pacientes
      </a>
      <h1 id="administration-heading" class="dc-page-title">{{ audit ? 'Auditoría de accesos' : 'Fichas anuladas' }}</h1>
      <div class="administration-content">
        @if (audit) {
          <app-clinical-access [embedded]="true" />
        } @else {
          <app-clinical-revisions [standalonePage]="true" />
        }
      </div>
    </section>
  `,
  styles: `
    .administration-page { display: grid; gap: 1rem; max-width: 64rem; min-width: 0; }
    .back-action { justify-self: start; }
    .administration-content {
      min-width: 0;
      overflow-wrap: anywhere;
      background: var(--dc-paper);
      border: 1px solid var(--dc-line);
      border-radius: var(--dc-radius-card);
      padding: clamp(.75rem, 3vw, 1.5rem);
    }
  `,
})
export class PatientAdministrationPageComponent {
  readonly audit = inject(ActivatedRoute).snapshot.data['audit'] === true;
}
