import argentina from './argentina.json';

export interface BookingCountry {
  readonly code: string;
  readonly name: string;
  readonly timezone: string;
  readonly provinces: readonly { readonly id: string; readonly name: string; readonly localities: readonly string[] }[];
}

export const ARGENTINA: BookingCountry = {
  code: 'AR',
  name: 'Argentina',
  timezone: 'America/Argentina/Buenos_Aires',
  provinces: argentina.provinces,
};

export const BOOKING_COUNTRIES: readonly BookingCountry[] = [ARGENTINA];

export function bookingCountry(value: string): BookingCountry | undefined {
  const country = value.trim().toLowerCase();
  return BOOKING_COUNTRIES.find(item => item.name.toLowerCase() === country || item.code.toLowerCase() === country);
}

export function localitiesFor(country: BookingCountry, province: string): readonly string[] {
  return country.provinces.find(item => item.name === province)?.localities ?? [];
}
