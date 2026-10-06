import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserUiStorageService } from './browser-ui-storage.service';

describe('Browser UI storage boundary', () => {
  let storage: BrowserUiStorageService;
  beforeEach(() => {
    localStorage.clear(); sessionStorage.clear();
    TestBed.configureTestingModule({});
    storage = TestBed.inject(BrowserUiStorageService);
  });
  afterEach(() => vi.restoreAllMocks());

  it('keeps only a display preference across sessions and only a selection ID in the tab', () => {
    storage.writeFontSize('xlarge'); storage.writeActivePatientId('doctor:a', 42);
    expect(localStorage.getItem('doctorchart_font_size')).toBe('xlarge');
    expect(localStorage.length).toBe(1);
    expect(sessionStorage.getItem('doctorchart_active_patient:doctor%3Aa')).toBe('42');
    expect(storage.readActivePatientId('doctor:b')).toBeNull();
    expect(storage.readActivePatientId('doctor:a')).toBe(42);
  });

  it('does not adopt a persistent patient identifier from another browser scope', () => {
    localStorage.setItem('doctorchart_active_patient:doctor-a', '99');
    expect(storage.readActivePatientId('doctor-a')).toBeNull();
  });

  it.each(['-1', '0', '1e3', '1.5', ' 42 ', '01', 'NaN', '9007199254740992', '{"id":42}'])('rejects malformed selection %s', value => {
    sessionStorage.setItem('doctorchart_active_patient:doctor-a', value);
    expect(storage.readActivePatientId('doctor-a')).toBeNull();
  });

  it('limits accessibility values and removes invalid selections instead of persisting them', () => {
    localStorage.setItem('doctorchart_font_size', 'unknown');
    expect(storage.readFontSize()).toBe('normal');
    storage.writeFontSize('xlarge');
    storage.writeFontSize('unexpected' as never); expect(storage.readFontSize()).toBe('xlarge');
    storage.writeActivePatientId('doctor-a', 42);
    storage.writeActivePatientId('doctor-a', Number.POSITIVE_INFINITY);
    expect(storage.readActivePatientId('doctor-a')).toBeNull();
  });

  it('tolerates disabled storage and full storage without breaking the UI', () => {
    const read = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new DOMException('blocked', 'SecurityError'); });
    expect(storage.readFontSize()).toBe('normal'); expect(storage.readActivePatientId('doctor-a')).toBeNull();
    read.mockRestore();
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new DOMException('full', 'QuotaExceededError'); });
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => { throw new DOMException('blocked', 'SecurityError'); });
    expect(() => storage.writeFontSize('large')).not.toThrow();
    expect(() => storage.writeActivePatientId('doctor-a', 42)).not.toThrow();
    expect(() => storage.writeActivePatientId('doctor-a', null)).not.toThrow();
  });

  it('never touches browser stores during server rendering', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [{ provide: PLATFORM_ID, useValue: 'server' }] });
    const read = vi.spyOn(Storage.prototype, 'getItem'); const write = vi.spyOn(Storage.prototype, 'setItem');
    const server = TestBed.inject(BrowserUiStorageService);
    expect(server.readFontSize()).toBe('normal'); expect(server.readActivePatientId('doctor-a')).toBeNull();
    server.writeFontSize('large'); server.writeActivePatientId('doctor-a', 42);
    expect(read).not.toHaveBeenCalled(); expect(write).not.toHaveBeenCalled();
  });
});
