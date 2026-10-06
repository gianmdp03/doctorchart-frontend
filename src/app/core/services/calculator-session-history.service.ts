import { Injectable, computed, effect, inject, signal, untracked } from '@angular/core';
import { AuthService } from './auth.service';
import { SessionCalculationItem } from '../models/medical-calculators.model';

/** Temporary, patient-free results. Clinical history belongs exclusively to the backend. */
@Injectable({ providedIn: 'root' })
export class CalculatorSessionHistoryService {
  private readonly auth = inject(AuthService);
  private readonly owner = signal<string | null>(null);
  private readonly history = signal<readonly SessionCalculationItem[]>([]);
  private sequence = 0;
  readonly items = computed(() => this.owner() && this.owner() === this.auth.currentUser()?.id ? this.history() : []);

  constructor() {
    this.syncOwner();
    effect(() => { this.auth.currentUser(); untracked(() => this.syncOwner()); });
  }

  save(item: Omit<SessionCalculationItem, 'id'>): SessionCalculationItem | null {
    this.syncOwner();
    if (!this.owner()) return null;
    const saved: SessionCalculationItem = {
      id: `session_calculation_${++this.sequence}`,
      calculatorId: item.calculatorId, calculatorName: item.calculatorName,
      resultHeadline: item.resultHeadline, interpretationLabel: item.interpretationLabel,
      severity: item.severity, calculatedAt: item.calculatedAt,
      plainTextEvolution: item.plainTextEvolution, inputsSummary: { ...item.inputsSummary },
    };
    this.history.update(items => [saved, ...items.slice(0, 49)]);
    return saved;
  }

  clear(): void { this.syncOwner(); this.history.set([]); }

  private syncOwner(): void {
    const owner = this.auth.currentUser()?.id ?? null;
    if (owner === this.owner()) return;
    this.history.set([]);
    this.owner.set(owner);
  }
}
