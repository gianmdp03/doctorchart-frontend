import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-annulment-prompt',
  template: `
    <form (submit)="submit($event)">
      <label>
        {{ label() }}
        <textarea #reasonInput rows="2" required maxlength="1000" [value]="reason()" [disabled]="busy()"
          (input)="reason.set(reasonInput.value)"></textarea>
      </label>
      <button type="button" class="dc-button" [disabled]="busy()" (click)="cancel.emit()">Cancelar</button>
      <button type="submit" class="dc-button" [disabled]="busy() || !reason().trim()">
        {{ busy() ? 'Anulando…' : 'Confirmar anulación' }}
      </button>
    </form>
  `,
  styles: [`label, textarea { display: block; } textarea { max-width: 100%; width: 28rem; }`],
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
