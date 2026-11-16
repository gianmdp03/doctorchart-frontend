import { Component, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-time-picker',
  imports: [OverlayModule, A11yModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: TimePickerComponent, multi: true }],
  template: `
    <div class="time-field" cdkOverlayOrigin #origin="cdkOverlayOrigin">
      <input #field type="text" inputmode="numeric" placeholder="HH:mm" maxlength="5"
        [attr.aria-label]="label()" [value]="value()" [disabled]="disabled()"
        (input)="typeTime($any($event.target).value)" (blur)="touch()" (keydown.arrowdown)="$event.preventDefault(); open()" />
      <button type="button" [disabled]="disabled()" [attr.aria-label]="'Elegir hora: ' + label()"
        aria-haspopup="dialog" [attr.aria-expanded]="opened()" (click)="open()">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
      </button>
    </div>
    <ng-template cdkConnectedOverlay [cdkConnectedOverlayOrigin]="origin" [cdkConnectedOverlayOpen]="opened()"
      [cdkConnectedOverlayHasBackdrop]="true" cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
      [cdkConnectedOverlayPush]="true" [cdkConnectedOverlayViewportMargin]="12"
      (backdropClick)="close()" (overlayKeydown)="onKey($event)">
      <section class="time-panel" role="dialog" [attr.aria-label]="'Elegir hora: ' + label()" cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
        <header><span>{{ label() }}</span><strong>{{ hour() }}:{{ minute() }}</strong></header>
        <div class="columns">
          <div><span class="column-label">Hora</span><div class="options" role="group" aria-label="Hora">
            @for (h of hours; track h) { <button type="button" [class.selected]="hour() === h" [attr.aria-pressed]="hour() === h" (click)="hour.set(h)">{{ h }}</button> }
          </div></div>
          <div><span class="column-label">Minutos</span><div class="options" role="group" aria-label="Minutos">
            @for (m of minutes; track m) { <button type="button" [class.selected]="minute() === m" [attr.aria-pressed]="minute() === m" (click)="minute.set(m)">{{ m }}</button> }
          </div></div>
        </div>
        <footer>
          @if (allowEndOfDay()) { <button type="button" class="end-day" (click)="commit('24:00')">Fin del día · 24:00</button> }
          <div class="actions"><button type="button" (click)="close()">Cancelar</button><button type="button" class="confirm" (click)="commit(hour() + ':' + minute())">Elegir hora</button></div>
        </footer>
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
  private readonly field = viewChild<ElementRef<HTMLInputElement>>('field');
  private readonly element = inject(ElementRef);
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
    // Wait for the overlay to attach before bringing the selected values into view.
    requestAnimationFrame(() => {
      if (!this.opened() || !this.element.nativeElement.isConnected) return;
      this.element.nativeElement.ownerDocument.querySelectorAll('.time-panel .selected').forEach((el: Element) => el.scrollIntoView({ block: 'center' }));
    });
  }
  close(): void { this.opened.set(false); this.touch(); this.field()?.nativeElement.focus(); }
  commit(value: string): void { this.typeTime(value); this.close(); }
  onKey(event: KeyboardEvent): void { if (event.key === 'Escape') { event.preventDefault(); this.close(); } }
}
