import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-annulment-prompt',
  template: `
    <form (submit)="submit($event)">
      <label>
        {{ label() }}
        <textarea
          #reasonInput
          rows="2"
          required
          maxlength="1000"
          [value]="reason()"
          [disabled]="busy()"
          (input)="reason.set(reasonInput.value)"
        ></textarea>
      </label>
      <div class="annulment-actions">
        <button type="button" class="dc-button" [disabled]="busy()" (click)="cancel.emit()">
          Cancelar
        </button>
        <button
          type="submit"
          class="dc-button confirm-annulment"
          [disabled]="busy() || !reason().trim()"
        >
          {{ busy() ? 'Anulando…' : 'Confirmar anulación' }}
        </button>
      </div>
    </form>
  `,
  styles: [
    `
      label {
        display: grid;
        gap: 0.25rem;
      }
      textarea {
        max-width: 100%;
        width: 28rem;
        padding: 0.55rem 0.7rem;
        border: 1px solid var(--dc-control-line);
        border-radius: var(--dc-radius-control);
        background: var(--dc-paper);
        color: var(--dc-text);
      }
      .annulment-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.65rem;
      }
      .confirm-annulment {
        color: var(--dc-danger);
        border-color: var(--dc-danger);
      }
      .confirm-annulment:hover:not(:disabled) {
        background: var(--dc-danger-soft);
      }
    `,
  ],
})
export class AnnulmentPromptComponent {
  readonly label = input('Motivo de anulación');
  readonly target = input<number | string>();
  readonly busy = input(false);
  readonly cancel = output<void>();
  readonly confirm = output<string>();
  protected readonly reason = signal('');

  constructor() {
    effect(() => {
      this.target();
      this.reason.set('');
    });
  }

  protected submit(event: Event): void {
    event.preventDefault();
    const reason = this.reason().trim();
    if (!this.busy() && reason && reason.length <= 1000) this.confirm.emit(reason);
  }
}
