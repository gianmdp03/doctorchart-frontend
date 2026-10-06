import { TestBed } from '@angular/core/testing';
import { AccessibilityService } from './accessibility.service';

describe('AccessibilityService', () => {
  let service: AccessibilityService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessibilityService);
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('font-size-normal', 'font-size-large', 'font-size-xlarge');
  });

  it('should initialize with normal font size by default', () => {
    expect(service.fontSizeLevel()).toBe('normal');
    expect(service.fontSizeLabel()).toBe('Normal');
  });

  it('should set font size to large and xlarge', () => {
    service.setFontSize('large');
    expect(service.fontSizeLevel()).toBe('large');
    expect(service.fontSizeLabel()).toBe('Grande');

    service.setFontSize('xlarge');
    expect(service.fontSizeLevel()).toBe('xlarge');
    expect(service.fontSizeLabel()).toBe('Muy Grande');
  });

  it('should cycle through font sizes when toggled', () => {
    service.setFontSize('normal');
    service.toggleFontSize();
    expect(service.fontSizeLevel()).toBe('large');

    service.toggleFontSize();
    expect(service.fontSizeLevel()).toBe('xlarge');

    service.toggleFontSize();
    expect(service.fontSizeLevel()).toBe('normal');
  });

  it('should increase font size up to xlarge and reset', () => {
    service.setFontSize('normal');
    service.increaseFontSize();
    expect(service.fontSizeLevel()).toBe('large');

    service.increaseFontSize();
    expect(service.fontSizeLevel()).toBe('xlarge');

    // Should not exceed xlarge
    service.increaseFontSize();
    expect(service.fontSizeLevel()).toBe('xlarge');

    service.resetFontSize();
    expect(service.fontSizeLevel()).toBe('normal');
  });
});
