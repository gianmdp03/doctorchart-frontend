import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

export type FontSizeLevel = 'normal' | 'large' | 'xlarge';
export type ColorTheme = 'light' | 'dark';

/** Browser storage is limited to display preferences and a revalidated selection ID. */
@Injectable({ providedIn: 'root' })
export class BrowserUiStorageService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readTheme(): ColorTheme {
    return this.read('localStorage', 'doctorchart_theme') === 'dark' ? 'dark' : 'light';
  }

  writeTheme(value: ColorTheme): void {
    if (value === 'light' || value === 'dark') {
      this.write('localStorage', 'doctorchart_theme', value);
    }
  }

  readFontSize(): FontSizeLevel {
    const value = this.read('localStorage', 'doctorchart_font_size');
    return value === 'large' || value === 'xlarge' ? value : 'normal';
  }

  writeFontSize(value: FontSizeLevel): void {
    if (value === 'normal' || value === 'large' || value === 'xlarge') {
      this.write('localStorage', 'doctorchart_font_size', value);
    }
  }

  readActivePatientId(owner: string): number | null {
    const value = this.read('sessionStorage', this.patientKey(owner));
    if (!value || !/^[1-9]\d*$/.test(value)) return null;
    const id = Number(value);
    return Number.isSafeInteger(id) ? id : null;
  }

  writeActivePatientId(owner: string, id: number | null): void {
    const value = id !== null && Number.isSafeInteger(id) && id > 0 ? String(id) : null;
    this.write('sessionStorage', this.patientKey(owner), value);
  }

  private patientKey(owner: string): string { return `doctorchart_active_patient:${encodeURIComponent(owner)}`; }

  private read(kind: 'localStorage' | 'sessionStorage', key: string): string | null {
    if (!this.isBrowser) return null;
    try { return window[kind].getItem(key); } catch { return null; }
  }

  private write(kind: 'localStorage' | 'sessionStorage', key: string, value: string | null): void {
    if (!this.isBrowser) return;
    try {
      if (value === null) window[kind].removeItem(key);
      else window[kind].setItem(key, value);
    } catch { /* An unavailable browser store must not block a clinical flow. */ }
  }
}
