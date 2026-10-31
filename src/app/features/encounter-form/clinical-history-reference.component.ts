import { Component, effect, inject, input, signal, output } from '@angular/core';
import { ClinicalSummaryService } from '../../core/services/clinical-summary.service';
import { AuthService } from '../../core/services/auth.service';
import { ClinicalSummary } from '../../core/models/clinical-summary.model';
import {
  CLINICAL_HISTORY_GROUPS,
  WizardFormValues,
} from '../../core/models/wizard-definition.model';
@Component({
  selector: 'app-clinical-history-reference',
  template: ` <aside class="reference" aria-label="Antecedentes ya registrados">
    <div class="reference-heading">
      <strong>Lo que ya sabemos del paciente</strong><span>Referencia para esta consulta</span>
    </div>
    @if (loading()) {
      <p>Cargando antecedentes…</p>
    } @else if (data(); as summary) {
      <div class="reference-grid">
        @for (group of groups; track group.kind) {
          <div>
            <small>{{ group.title }}</small>
            @if (summary.history?.[group.kind]; as current) {
              <p>{{ current.status === 'NONE' ? 'No refiere' : current.items.join(' · ') }}</p>
              <button type="button" (click)="review(group.kind)">Revisar en esta consulta</button>
            } @else {
              <p>{{ previous(group.kind) || 'Sin información estructurada revisada' }}</p>
            }
          </div>
        }
      </div>
      <p class="reference-hint">
        Estos datos se conservan. Completá abajo únicamente los antecedentes que revises o
        actualices hoy.
      </p>
    } @else {
      <p>
        Los antecedentes anteriores se conservan en la ficha. No se pudieron cargar para mostrarlos
        aquí.
      </p>
    }
  </aside>`,
  styles: `
    :host {
      display: block;
    }
    .reference {
      padding: 18px 22px;
      border: 1px solid var(--dc-outline, #dce5e8);
      border-radius: 14px;
      margin: 0 0 22px;
      background: var(--dc-surface-low, #f8fafc);
      color: var(--dc-ink, #18333b);
    }
    .reference-heading {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 14px;
    }
    strong {
      font-size: 0.8rem;
    }
    .reference-heading span,
    small {
      font-size: 0.7rem;
      color: var(--dc-ink-muted, #64748b);
    }
    .reference-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
    }
    p {
      font-size: 0.8rem;
      line-height: 1.6;
      margin: 4px 0;
      overflow-wrap: anywhere;
    }
    .reference-hint {
      font-size: 0.7rem;
      color: var(--dc-ink-muted, #64748b);
      margin-top: 14px;
    }
    button {
      border: 0;
      background: none;
      padding: 7px 0;
      color: var(--dc-teal-ink, #0f766e);
      font: inherit;
      font-size: 0.7rem;
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    button:focus-visible {
      outline: 2px solid var(--dc-teal-ink, #0f766e);
      outline-offset: 3px;
    }
    @media (max-width: 700px) {
      .reference-grid {
        grid-template-columns: 1fr;
        gap: 10px;
      }
      .reference-heading {
        flex-direction: column;
        gap: 4px;
      }
    }
  `,
})
export class ClinicalHistoryReferenceComponent {
  readonly patientId = input.required<number>();
  private readonly api = inject(ClinicalSummaryService);
  private readonly auth = inject(AuthService);
  readonly data = signal<ClinicalSummary | null>(null);
  readonly loading = signal(false);
  readonly groups = CLINICAL_HISTORY_GROUPS;
  readonly reviewed = output<WizardFormValues>();
  previous(kind: string): string {
    return [
      ...(this.data()?.profile?.entries ?? []).filter(
        (e) => e.kind === kind && e.status === 'ACTIVE',
      ),
      ...(this.data()?.historical ?? []).filter((e) => e.kind === kind),
    ]
      .map((e) => e.text)
      .join(' · ');
  }
  review(kind: 'ALLERGY' | 'PROBLEM' | 'MEDICATION'): void {
    const data = this.data();
    if (!data || data.patientId !== this.patientId()) return;
    const current = data.history?.[kind],
      group = this.groups.find((g) => g.kind === kind);
    if (current && group)
      this.reviewed.emit({
        [group.status]: current.status,
        [group.details]: current.items.join('\n') || null,
      });
  }
  constructor() {
    effect((onCleanup) => {
      const id = this.patientId(),
        user = this.auth.currentUser()?.id;
      this.data.set(null);
      this.loading.set(false);
      if (!id || !user) return;
      this.loading.set(true);
      const sub = this.api.get(id).subscribe({
        next: (data) => {
          this.loading.set(false);
          if (data.patientId === id) this.data.set(data);
        },
        error: () => this.loading.set(false),
      });
      onCleanup(() => sub.unsubscribe());
    });
  }
}
