import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  NormalizeDecimalDirective,
  normalizeDecimal,
  normalizeDecimalString,
} from './normalize-decimal.directive';

@Component({
  imports: [ReactiveFormsModule, NormalizeDecimalDirective],
  template: `
    <input type="text" [formControl]="control" appNormalizeDecimal />
    <input type="number" step="any" [formControl]="numControl" id="numInput" appNormalizeDecimal />
  `,
})
class TestHostComponent {
  readonly control = new FormControl('');
  readonly numControl = new FormControl<number | null>(null);
}

describe('NormalizeDecimalDirective & Utilities', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let textInputEl: DebugElement;
  let numInputEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    textInputEl = fixture.debugElement.query(By.css('input[type="text"]'));
    numInputEl = fixture.debugElement.query(By.css('#numInput'));
  });

  describe('normalizeDecimal utility', () => {
    it('should parse integers and floats correctly', () => {
      expect(normalizeDecimal(12.5)).toBe(12.5);
      expect(normalizeDecimal('12.5')).toBe(12.5);
    });

    it('should parse strings with commas as decimals', () => {
      expect(normalizeDecimal('14,75')).toBe(14.75);
      expect(normalizeDecimal('4,5')).toBe(4.5);
      expect(normalizeDecimal('0,85')).toBe(0.85);
    });

    it('should return null for empty or invalid input', () => {
      expect(normalizeDecimal('')).toBeNull();
      expect(normalizeDecimal(null)).toBeNull();
      expect(normalizeDecimal(undefined)).toBeNull();
      expect(normalizeDecimal('abc')).toBeNull();
    });
  });

  describe('normalizeDecimalString utility', () => {
    it('should replace comma with dot', () => {
      expect(normalizeDecimalString('12,5')).toBe('12.5');
      expect(normalizeDecimalString('100')).toBe('100');
      expect(normalizeDecimalString('')).toBe('');
    });
  });

  describe('Directive behavior', () => {
    it('should convert comma to dot on keydown for text inputs', () => {
      const input = textInputEl.nativeElement as HTMLInputElement;
      input.value = '4';
      input.selectionStart = 1;
      input.selectionEnd = 1;

      const event = new KeyboardEvent('keydown', { key: ',', cancelable: true });
      input.dispatchEvent(event);

      expect(input.value).toBe('4.');
    });

    it('should normalize input value on input event with commas', () => {
      const input = textInputEl.nativeElement as HTMLInputElement;
      input.value = '15,2';
      input.dispatchEvent(new Event('input'));

      expect(input.value).toBe('15.2');
    });
  });
});
