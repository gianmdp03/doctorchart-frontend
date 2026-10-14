import { DOCUMENT } from '@angular/common';
import { Injectable, afterNextRender, inject, signal } from '@angular/core';
import { BrowserUiStorageService, ColorTheme } from './browser-ui-storage.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly storage = inject(BrowserUiStorageService);
  private readonly currentTheme = signal<ColorTheme>('light');
  readonly theme = this.currentTheme.asReadonly();

  constructor() {
    // Keep the server and hydration markup identical, then restore the preference.
    afterNextRender(() => this.apply(this.storage.readTheme()));
  }

  toggle(): void {
    const theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.apply(theme);
    this.storage.writeTheme(theme);
  }

  private apply(theme: ColorTheme): void {
    this.currentTheme.set(theme);
    this.document.documentElement.classList.toggle('dark', theme === 'dark');
  }
}
