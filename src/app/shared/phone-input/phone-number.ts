import type { ItiUtils } from 'intl-tel-input';

export const loadPhoneUtils = () => import('intl-tel-input/utils');

export function normalizedPhone(utils: ItiUtils, value: string, region?: string): string | null {
  const text = value.trim();
  if (!/^\+?[\p{Nd}\s().-]+$/u.test(text)) return null;
  if (!utils.isValidNumberPrecise(text, region)) return null;
  const number = utils.formatNumber(text, region, 'E164');
  return /^\+[1-9]\d{1,14}$/.test(number) ? number : null;
}
