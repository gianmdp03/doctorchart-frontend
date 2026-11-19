import { Pipe, PipeTransform } from '@angular/core';
import { loadPhoneUtils } from './phone-number';

@Pipe({ name: 'phoneDisplay' })
export class PhoneDisplayPipe implements PipeTransform {
  async transform(value: string | null | undefined): Promise<string | null> {
    if (!value) return null;
    // Only canonical international numbers are formatted on read.
    if (!/^\+[1-9]\d{1,14}$/.test(value)) return value;
    try {
      const { default: utils } = await loadPhoneUtils();
      return utils.formatNumber(value, undefined, 'INTERNATIONAL') || value;
    } catch {
      return value;
    }
  }
}
