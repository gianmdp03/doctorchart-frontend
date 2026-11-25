import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-transfer-bank-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dl>
      @for (field of fields; track field.key) {
        @if (bank()[field.key]; as value) {
          <div class="bank-row">
            <dt>{{ field.title }}</dt>
            <dd>
              <span class="bank-value" translate="no">{{ value }}</span>
              <button type="button" [class.primary]="emphasizeAlias() && field.key === 'alias'"
                (click)="copyRequested.emit({ value, label: field.label })">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65"
                  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="8" y="8" width="12" height="12" rx="2" />
                  <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                </svg>
                Copiar {{ field.label }}
              </button>
            </dd>
          </div>
        }
      }
    </dl>
  `,
  styles: [`
    :host { display: block; min-width: 0; }
    dl { display: grid; margin: 0; }
    .bank-row {
      padding: .625rem 0;
      border-block-start: 1px solid var(--checkout-line, var(--border));
    }
    .bank-row:last-child { border-block-end: 1px solid var(--checkout-line, var(--border)); }
    .bank-value { min-width: 0; font-weight: 700; font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
    dt { color: var(--checkout-muted, var(--muted-foreground)); font-size: .8125rem; }
    dd {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: .35rem 1rem;
      margin: 0;
    }
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: .45rem;
      min-height: 44px;
      padding: .45rem .75rem;
      border: 1px solid var(--checkout-line, var(--border));
      border-radius: .625rem;
      background: var(--checkout-surface, var(--card));
      color: var(--checkout-text, var(--foreground));
      font: inherit;
      font-size: .875rem;
      font-weight: 650;
      cursor: pointer;
    }
    button.primary {
      border-color: var(--checkout-action, var(--primary));
      background: var(--checkout-action, var(--primary));
      color: var(--checkout-on-action, var(--primary-foreground));
    }
    button:hover { box-shadow: inset 0 0 0 1px currentColor; }
    button:focus-visible { outline: 2px solid var(--checkout-action, var(--ring)); outline-offset: 3px; }
    svg { width: 1rem; height: 1rem; flex: none; }
  `],
})
export class TransferBankDetails {
  readonly bank = input.required<{ alias?: string; cvu?: string }>();
  readonly emphasizeAlias = input(true);
  readonly copyRequested = output<{ value: string; label: 'alias' | 'CVU' }>();
  protected readonly fields = [
    { key: 'alias', title: 'Alias', label: 'alias' },
    { key: 'cvu', title: 'CVU', label: 'CVU' },
  ] as const;
}
