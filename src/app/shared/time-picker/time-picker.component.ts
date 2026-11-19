import { Component, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';

let nextTimePickerId = 0;

@Component({
  selector: 'app-time-picker',
  imports: [OverlayModule, A11yModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: TimePickerComponent, multi: true }],
  template: `
    <div class="time-field" cdkOverlayOrigin #origin="cdkOverlayOrigin">
      <input type="text" autocomplete="off" [name]="pickerId" inputmode="numeric" placeholder="HH:mm" maxlength="5"
        [attr.aria-label]="label()" [attr.aria-describedby]="pickerId + '-format'" [value]="value()" [disabled]="disabled()"
        (input)="typeTime($any($event.target).value)" (blur)="touch()" (keydown.arrowdown)="$event.preventDefault(); open()" />
      <button type="button" [disabled]="disabled()" [attr.aria-label]="'Elegir hora: ' + label()"
        aria-haspopup="dialog" [attr.aria-expanded]="opened()" (click)="open()">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
      </button>
    </div>
    <span class="sr-only" [id]="pickerId + '-format'">Formato de 24 horas (HH:mm).</span>
    <ng-template cdkConnectedOverlay [cdkConnectedOverlayOrigin]="origin" [cdkConnectedOverlayOpen]="opened()"
      [cdkConnectedOverlayHasBackdrop]="true" [cdkConnectedOverlayDisableClose]="true" cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
      [cdkConnectedOverlayPush]="true" [cdkConnectedOverlayViewportMargin]="12"
      (backdropClick)="close()" (overlayKeydown)="onKey($event)">
      <section class="time-panel" role="dialog" aria-modal="true" [attr.aria-label]="'Elegir hora: ' + label()" cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
        <div class="time-panel-heading"><span>{{ label() }}</span><strong>{{ hour() }}:{{ minute() }}</strong></div>
        <div class="columns">
          <div><span class="column-label">Hora</span><div class="options" role="radiogroup" aria-label="Hora">
            @for (h of hours; track h) {
              <label>
                <input type="radio" class="sr-only" [name]="pickerId + '-hour'" [value]="h"
                  [checked]="hour() === h" (change)="hour.set(h)" [attr.cdkFocusInitial]="hour() === h ? '' : null" />
                <span>{{ h }}</span>
              </label>
            }
          </div></div>
          <div><span class="column-label">Minutos</span><div class="options" role="radiogroup" aria-label="Minutos">
            @for (m of minutes; track m) {
              <label>
                <input type="radio" class="sr-only" [name]="pickerId + '-minute'" [value]="m"
                  [checked]="minute() === m" (change)="minute.set(m)" />
                <span>{{ m }}</span>
              </label>
            }
          </div></div>
        </div>
        <div class="time-panel-actions">
          @if (allowEndOfDay()) { <button type="button" class="end-day" (click)="commit('24:00')">Fin del día · 24:00</button> }
          <div class="actions"><button type="button" (click)="close()">Cancelar</button><button type="button" class="confirm" (click)="commit(hour() + ':' + minute())">Elegir hora</button></div>
        </div>
      </section>
    </ng-template>
  `,
  styleUrl: './time-picker.component.css',
})
export class TimePickerComponent implements ControlValueAccessor {
  readonly label = input('Hora');
  readonly allowEndOfDay = input(false);
  readonly value = signal('');
  readonly disabled = signal(false);
  readonly opened = signal(false);
  readonly hour = signal('09');
  readonly minute = signal('00');
  readonly hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  readonly minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
  readonly pickerId = 'dc-time-' + nextTimePickerId++;
  private change: (value: string) => void = () => {};
  private touched: () => void = () => {};
  writeValue(value: string | null): void { this.value.set(value ?? ''); }
  registerOnChange(fn: (value: string) => void): void { this.change = fn; }
  registerOnTouched(fn: () => void): void { this.touched = fn; }
  setDisabledState(disabled: boolean): void { this.disabled.set(disabled); if (disabled) this.opened.set(false); }
  typeTime(value: string): void { this.value.set(value); this.change(value); }
  touch(): void { this.touched(); }
  open(): void {
    if (this.disabled()) return;
    const valid = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(this.value());
    this.hour.set(valid?.[1] ?? '09'); this.minute.set(valid?.[2] ?? '00');
    this.opened.set(true);
  }
  close(): void { this.opened.set(false); this.touch(); }
  commit(value: string): void { this.typeTime(value); this.close(); }
  onKey(event: KeyboardEvent): void { if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); this.close(); } }
}
