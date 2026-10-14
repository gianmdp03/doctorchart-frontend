import { Component, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { BrowserUiStorageService } from './browser-ui-storage.service';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';

@Component({ imports: [ThemeToggleComponent], template: '<app-theme-toggle />' })
class ThemeHost {}

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    document.documentElement.classList.remove('dark', 'font-size-large');
  });

  async function render() {
    const fixture = TestBed.createComponent(ThemeHost);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  }

  it('starts light and restores dark after rendering without changing other root classes', async () => {
    localStorage.setItem('doctorchart_theme', 'dark');
    document.documentElement.classList.add('font-size-large');
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('light');
    const fixture = await render();
    expect(service.theme()).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('font-size-large')).toBe(true);
    expect(fixture.nativeElement.querySelector('button').getAttribute('aria-pressed')).toBe('true');
  });

  it('switches both ways from the accessible button and persists the chosen theme', async () => {
    const fixture = await render();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.getAttribute('aria-label')).toBe('Activar modo oscuro');
    button.click(); fixture.detectChanges();
    expect(localStorage.getItem('doctorchart_theme')).toBe('dark');
    expect(button.getAttribute('aria-label')).toBe('Activar modo claro');
    button.click(); fixture.detectChanges();
    expect(localStorage.getItem('doctorchart_theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('keeps working when browser storage is blocked and ignores invalid preferences', async () => {
    localStorage.setItem('doctorchart_theme', 'unknown');
    expect(TestBed.inject(BrowserUiStorageService).readTheme()).toBe('light');
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
    await render();
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('light');
    expect(() => service.toggle()).not.toThrow();
    expect(service.theme()).toBe('dark');
  });

  it('does not read browser storage on the server', () => {
    TestBed.configureTestingModule({ providers: [{ provide: PLATFORM_ID, useValue: 'server' }] });
    const read = vi.spyOn(Storage.prototype, 'getItem');
    expect(TestBed.inject(ThemeService).theme()).toBe('light');
    expect(read).not.toHaveBeenCalled();
  });
});
