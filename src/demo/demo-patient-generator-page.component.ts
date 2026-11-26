import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideRefreshCw, lucideSparkles, lucideUsers } from '@ng-icons/lucide';
import { DemoSessionService } from './demo-session.service';

@Component({
  selector: 'app-demo-patient-generator-page',
  imports: [RouterLink, NgIcon],
  providers: [provideIcons({ lucideArrowLeft, lucideRefreshCw, lucideSparkles, lucideUsers })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="demo-gen-page" aria-labelledby="demo-gen-title">
      <a routerLink="/patients" class="dc-button dc-button--secondary back-link">
        <ng-icon name="lucideArrowLeft" aria-hidden="true" /> Volver al directorio
      </a>

      <div class="demo-gen-card">
        <header class="demo-gen-header">
          <h1 id="demo-gen-title">Generador de pacientes de demostración</h1>
          <p>
            En <strong>DemoChart</strong> no se cargan ni editan pacientes reales manualmente.
            Podés generar tandas de pacientes ficticios con distintas edades, sexos, fechas de
            consulta, curvas de crecimiento, vacunas, recetas y estudios para probar toda la historia clínica.
          </p>
        </header>

        @if (feedback()) {
          <p class="demo-gen-feedback" role="status">{{ feedback() }}</p>
        }

        <div class="demo-gen-actions">
          <button
            type="button"
            class="dc-button dc-button--primary"
            [disabled]="demoSession.busy()"
            (click)="generate('append')"
          >
            <ng-icon name="lucideSparkles" aria-hidden="true" />
            <span>Agregar otra tanda de pacientes</span>
          </button>

          @if (confirmReplace()) {
            <div class="inline-confirm" role="region" aria-label="Confirmar reemplazo de pacientes">
              <span>¿Reemplazar los pacientes actuales de esta especialidad por una tanda nueva?</span>
              <div class="inline-confirm-btns">
                <button
                  type="button"
                  class="dc-button dc-button--primary"
                  [disabled]="demoSession.busy()"
                  (click)="generate('replace')"
                >
                  Confirmar reemplazo
                </button>
                <button
                  type="button"
                  class="dc-button dc-button--secondary"
                  [disabled]="demoSession.busy()"
                  (click)="confirmReplace.set(false)"
                >
                  Cancelar
                </button>
              </div>
            </div>
          } @else {
            <button
              type="button"
              class="dc-button dc-button--secondary"
              [disabled]="demoSession.busy()"
              (click)="confirmReplace.set(true)"
            >
              <ng-icon name="lucideRefreshCw" aria-hidden="true" />
              <span>Regenerar directorio completo</span>
            </button>
          }

          <button
            type="button"
            class="dc-button dc-button--quiet"
            (click)="goToDirectory()"
          >
            <ng-icon name="lucideUsers" aria-hidden="true" />
            <span>Ir al directorio de pacientes</span>
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .demo-gen-page { display: grid; gap: 1rem; max-width: 48rem; margin: 1.5rem auto; padding: 0 1rem; }
    .back-link { justify-self: start; min-height: 44px; display: inline-flex; align-items: center; gap: .5rem; }
    .demo-gen-card { display: grid; gap: 1.25rem; padding: 1.5rem; border: 1px solid var(--dc-line); border-radius: var(--dc-radius-card); background: var(--dc-paper); }
    .demo-gen-header h1 { margin: 0 0 .5rem; font-size: 1.375rem; font-weight: 700; color: var(--dc-text); }
    .demo-gen-header p { margin: 0; color: var(--dc-text-secondary); line-height: 1.55; }
    .demo-gen-feedback { margin: 0; padding: .75rem 1rem; border-radius: var(--dc-radius-control); background: var(--dc-subtle); color: var(--dc-brand-ink); font-weight: 600; }
    .demo-gen-actions { display: flex; flex-wrap: wrap; gap: .75rem; align-items: center; }
    .demo-gen-actions button { min-height: 44px; }
    .inline-confirm { display: grid; gap: .65rem; width: 100%; padding: .85rem 1rem; border: 1px solid var(--dc-line); border-radius: var(--dc-radius-control); background: var(--dc-subtle); }
    .inline-confirm-btns { display: flex; flex-wrap: wrap; gap: .5rem; }
  `],
})
export class DemoPatientGeneratorPageComponent {
  readonly demoSession = inject(DemoSessionService);
  private readonly router = inject(Router);
  readonly confirmReplace = signal(false);
  readonly feedback = signal('');

  async generate(mode: 'replace' | 'append'): Promise<void> {
    this.confirmReplace.set(false);
    const ok = await this.demoSession.regeneratePatients(mode);
    if (ok) {
      this.feedback.set(
        mode === 'replace'
          ? 'Se generó un nuevo directorio de pacientes ficticios.'
          : 'Se agregó una nueva tanda de pacientes ficticios al directorio.',
      );
    }
  }

  goToDirectory(): void {
    void this.router.navigate(['/patients']);
  }
}
