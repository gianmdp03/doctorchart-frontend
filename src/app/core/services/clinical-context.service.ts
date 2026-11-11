import { Injectable, signal } from '@angular/core';

/** Context identity from the authenticated workspace response, never authorization. */
@Injectable({ providedIn: 'root' })
export class ClinicalContextService {
  private readonly current = signal<number | null>(null);
  readonly id = this.current.asReadonly();
  bind(id: number | null): void {
    if (id !== null && (!Number.isSafeInteger(id) || id <= 0)) throw new Error('Contexto clínico inválido.');
    this.current.set(id);
  }
}
