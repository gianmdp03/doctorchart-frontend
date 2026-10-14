import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMoon, lucideSun } from '@ng-icons/lucide';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [NgIcon],
  providers: [provideIcons({ lucideMoon, lucideSun })],
  template: `
    <button type="button" (click)="themeService.toggle()"
      [attr.aria-pressed]="themeService.theme() === 'dark'"
      [attr.aria-label]="themeService.theme() === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'"
      [title]="themeService.theme() === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'">
      <ng-icon [name]="themeService.theme() === 'dark' ? 'lucideSun' : 'lucideMoon'" aria-hidden="true" />
      <span>{{ themeService.theme() === 'dark' ? 'Modo claro' : 'Modo oscuro' }}</span>
    </button>
  `,
  styles: `
    :host { display: inline-flex; }
    button {
      display: inline-flex; align-items: center; justify-content: center; gap: .4rem;
      min-height: 36px; padding: .4rem .65rem; border-radius: 8px;
      border: 1px solid var(--md-sys-color-outline-variant);
      background: var(--md-sys-color-surface-container-low);
      color: var(--md-sys-color-on-surface); font: inherit; font-size: .8rem;
      font-weight: 600; cursor: pointer;
    }
    button:hover { background: var(--md-sys-color-surface-container-high); }
    button:focus-visible { outline: 2px solid var(--md-sys-color-primary); outline-offset: 3px; }
    ng-icon { font-size: 1rem; }
    @media (max-width: 600px) { span { display: none; } button { min-width: 36px; } }
  `,
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);
}
