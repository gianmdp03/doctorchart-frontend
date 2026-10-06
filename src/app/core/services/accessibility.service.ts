import { Injectable, PLATFORM_ID, inject, signal, computed, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BrowserUiStorageService, FontSizeLevel } from './browser-ui-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AccessibilityService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly storage = inject(BrowserUiStorageService);

  readonly fontSizeLevel = signal<FontSizeLevel>(this.storage.readFontSize());

  readonly fontSizeLabel = computed(() => {
    switch (this.fontSizeLevel()) {
      case 'large':
        return 'Grande';
      case 'xlarge':
        return 'Muy Grande';
      default:
        return 'Normal';
    }
  });

  constructor() {
    if (this.isBrowser) {
      // Apply class on root element whenever signal changes
      effect(() => {
        const level = this.fontSizeLevel();
        const root = document.documentElement;
        root.classList.remove('font-size-normal', 'font-size-large', 'font-size-xlarge');
        root.classList.add(`font-size-${level}`);
        this.storage.writeFontSize(level);
      });
    }
  }

  setFontSize(level: FontSizeLevel): void {
    this.fontSizeLevel.set(level);
  }

  toggleFontSize(): void {
    const current = this.fontSizeLevel();
    if (current === 'normal') {
      this.fontSizeLevel.set('large');
    } else if (current === 'large') {
      this.fontSizeLevel.set('xlarge');
    } else {
      this.fontSizeLevel.set('normal');
    }
  }

  increaseFontSize(): void {
    const current = this.fontSizeLevel();
    if (current === 'normal') {
      this.fontSizeLevel.set('large');
    } else if (current === 'large') {
      this.fontSizeLevel.set('xlarge');
    }
  }

  decreaseFontSize(): void {
    const current = this.fontSizeLevel();
    if (current === 'xlarge') {
      this.fontSizeLevel.set('large');
    } else if (current === 'large') {
      this.fontSizeLevel.set('normal');
    }
  }

  resetFontSize(): void {
    this.fontSizeLevel.set('normal');
  }

}
