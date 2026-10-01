import { Directive, ElementRef, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Utility to parse and normalize decimal values, handling both comma (',') and period ('.').
 */
export function normalizeDecimal(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return isNaN(value) ? null : value;
  if (typeof value === 'string') {
    const clean = value.replace(/,/g, '.').replace(/[^\d.-]/g, '').trim();
    const parsed = parseFloat(clean);
    return isNaN(parsed) ? null : parsed;
  }
  return null;
}

/**
 * Normalizes input string replacing any comma with a standard decimal point.
 */
export function normalizeDecimalString(value: string): string {
  if (!value) return '';
  return value.replace(/,/g, '.');
}

@Directive({
  selector: 'input[appNormalizeDecimal], [appNormalizeDecimal]',
  host: {
    '(keydown)': 'handleKeyDown($event)',
    '(input)': 'handleInput($event)',
    '(paste)': 'handlePaste($event)',
  },
})
export class NormalizeDecimalDirective {
  private readonly el = inject(ElementRef<HTMLInputElement>);
  private readonly ngControl = inject(NgControl, { optional: true });

  handleKeyDown(event: KeyboardEvent): void {
    // If user presses comma on keyboard or numpad, standardize to dot
    if (event.key === ',') {
      const input = this.el.nativeElement;
      if (input.type === 'number') {
        // In HTML5 number inputs, typing comma directly can be blocked or produce NaN in some browsers
        event.preventDefault();
        // Insert dot programmatically or trigger value update
        const currentVal = input.value || '';
        if (!currentVal.includes('.')) {
          input.value = currentVal + '.';
          input.dispatchEvent(new Event('input', { bubbles: true }));
          if (this.ngControl?.control) {
            this.ngControl.control.setValue(input.value);
          }
        }
      } else if (input.type === 'text' || !input.type) {
        event.preventDefault();
        const start = input.selectionStart ?? input.value.length;
        const end = input.selectionEnd ?? input.value.length;
        const current = input.value;
        const next = current.slice(0, start) + '.' + current.slice(end);
        input.value = next;
        input.selectionStart = input.selectionEnd = start + 1;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        if (this.ngControl?.control) {
          this.ngControl.control.setValue(next);
        }
      }
    }
  }

  handleInput(event: Event): void {
    const input = this.el.nativeElement;
    if (input.value && input.value.includes(',')) {
      const normalized = normalizeDecimalString(input.value);
      input.value = normalized;
      if (this.ngControl?.control) {
        this.ngControl.control.setValue(normalized);
      }
    }
  }

  handlePaste(event: ClipboardEvent): void {
    const pastedData = event.clipboardData?.getData('text');
    if (pastedData && pastedData.includes(',')) {
      event.preventDefault();
      const normalizedData = normalizeDecimalString(pastedData);
      const input = this.el.nativeElement;
      if (input.type === 'number') {
        input.value = normalizedData;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        if (this.ngControl?.control) {
          const num = parseFloat(normalizedData);
          this.ngControl.control.setValue(isNaN(num) ? normalizedData : num);
        }
      } else {
        const start = input.selectionStart ?? 0;
        const end = input.selectionEnd ?? 0;
        const current = input.value;
        const next = current.slice(0, start) + normalizedData + current.slice(end);
        input.value = next;
        input.selectionStart = input.selectionEnd = start + normalizedData.length;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        if (this.ngControl?.control) {
          this.ngControl.control.setValue(next);
        }
      }
    }
  }
}
