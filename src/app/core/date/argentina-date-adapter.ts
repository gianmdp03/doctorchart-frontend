import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

export const DATE_INPUT_FORMAT = 'dd/MM/yyyy';

/** Makes every Material date input parse and display the clinical Argentine format. */
@Injectable()
export class ArgentinaDateAdapter extends NativeDateAdapter {
  override parse(value: unknown): Date | null {
    if (typeof value === 'string') {
      const match = value.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
      if (!match) return null;
      try {
        return this.createDate(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
      } catch {
        return null;
      }
    }
    return super.parse(value);
  }

  override format(date: Date, displayFormat: unknown): string {
    if (displayFormat === DATE_INPUT_FORMAT) {
      return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    }
    return super.format(date, displayFormat as Intl.DateTimeFormatOptions);
  }
}
