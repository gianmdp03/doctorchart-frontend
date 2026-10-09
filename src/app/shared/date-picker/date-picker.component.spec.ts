import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerComponent } from './date-picker.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ArgentinaDateAdapter, DATE_INPUT_FORMAT } from '../../core/date/argentina-date-adapter';
import { By } from '@angular/platform-browser';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerComponent],
      providers: [
        provideAnimationsAsync(),
        { provide: MAT_DATE_LOCALE, useValue: 'es-AR' },
        { provide: DateAdapter, useClass: ArgentinaDateAdapter },
        {
          provide: MAT_DATE_FORMATS,
          useValue: {
            parse: { dateInput: DATE_INPUT_FORMAT },
            display: {
              dateInput: DATE_INPUT_FORMAT,
              monthYearLabel: { month: 'long', year: 'numeric' },
              dateA11yLabel: { day: 'numeric', month: 'long', year: 'numeric' },
              monthYearA11yLabel: { month: 'long', year: 'numeric' },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create DatePickerComponent with Angular Material datepicker', () => {
    expect(component).toBeTruthy();
    const inputEl = fixture.debugElement.query(By.css('input.date-picker-input'));
    expect(inputEl).toBeTruthy();
    expect(inputEl.nativeElement.getAttribute('type')).toBe('text');
  });

  it('should parse ISO date on writeValue and format for Angular Material', () => {
    component.writeValue('2020-05-15');
    fixture.detectChanges();
    expect(component.selectedDate()).toBeTruthy();
    expect(component.selectedDate()?.getFullYear()).toBe(2020);
    expect(component.selectedDate()?.getMonth()).toBe(4);
    expect(component.selectedDate()?.getDate()).toBe(15);
  });

  it('should emit ISO string when a date is selected', () => {
    let emitted = '';
    component.valueChange.subscribe((val) => (emitted = val));
    component.selectDate(new Date(2021, 2, 10)); // 10 Mar 2021
    expect(emitted).toBe('2021-03-10');
  });

  it('uses the application Argentine adapter for typed dates without exchanging day and month', () => {
    const emitted: string[] = [];
    component.valueChange.subscribe(value => emitted.push(value));
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    for (const [typed, expected] of [['29/02/2020', '2020-02-29'], ['01/02/2020', '2020-02-01'], ['31/12/2020', '2020-12-31']]) {
      input.value = typed;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();
      expect(emitted.at(-1)).toBe(expected);
      expect(input.value).toBe(typed);
    }
  });

  it('does not convert an impossible typed date into a different birthday', () => {
    let emitted = 'unchanged';
    component.valueChange.subscribe(value => emitted = value);
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = '01/02/2020';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    input.value = '31/02/2020';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(emitted).toBe('31/02/2020');
    expect(component.validate()).toEqual({ date: true });
    expect(fixture.nativeElement.querySelector('.field-error').textContent).toContain('fecha válida');
    expect(component.selectedDate()).toBeNull();
  });

  it('should default calendarStart to current date when no value is provided', () => {
    const start = component.calendarStart();
    const now = new Date();
    expect(start).toBeTruthy();
    expect(start?.getFullYear()).toBe(now.getFullYear());
    expect(start?.getMonth()).toBe(now.getMonth());
  });
});
