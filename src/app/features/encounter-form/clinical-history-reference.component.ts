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
  styleUrl: './clinical-history-reference.component.css',
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
