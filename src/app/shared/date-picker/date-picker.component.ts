import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ArgentinaDateAdapter, ARGENTINA_DATE_FORMATS } from '../../core/date/argentina-date-adapter';

type CalendarStartView = 'month' | 'year' | 'multi-year';

@Component({
  selector: 'app-date-picker',
  imports: [MatDatepickerModule],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: DatePickerComponent, multi: true },
    { provide: NG_VALIDATORS, useExisting: DatePickerComponent, multi: true },
    { provide: DateAdapter, useClass: ArgentinaDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' },
    { provide: MAT_DATE_FORMATS, useValue: ARGENTINA_DATE_FORMATS },
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
})
export class DatePickerComponent implements ControlValueAccessor, Validator {
  private readonly adapter = inject<DateAdapter<Date>>(DateAdapter);
  readonly value = input<string | null | undefined>('');
  readonly valueChange = output<string>();
  readonly startView = input<CalendarStartView>('month');
  readonly max = input<string | null | undefined>(null);
  readonly showError = input(true);
  readonly selectedDate = signal<Date | null>(null);
  readonly isDisabled = signal(false);
  readonly invalidInput = signal(false);
  readonly error = computed(() => {
    if (this.invalidInput()) return 'Ingresá una fecha válida con formato dd/MM/aaaa.';
    const date = this.selectedDate(), max = this.maxDate();
    return date && max && date > max ? 'La fecha supera el máximo permitido.' : null;
  });
  readonly calendarStart = computed(() => {
    if (this.selectedDate()) {
      return this.selectedDate();
    }
    const today = new Date();
    const max = this.maxDate();
    if (max && today.getTime() > max.getTime()) {
      return max;
    }
    return today;
  });

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;
  private onValidatorChange: () => void = () => undefined;

  constructor() {
    effect(() => this.selectedDate.set(this.toDate(this.value())));
    effect(() => { this.error(); this.onValidatorChange(); });
  }

  writeValue(value: string | null): void { this.selectedDate.set(this.toDate(value)); this.invalidInput.set(!!value && !this.toDate(value)); }
  registerOnChange(fn: (value: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.isDisabled.set(isDisabled); }

  validate(): ValidationErrors | null { return this.error() ? { date: true } : null; }
  registerOnValidatorChange(fn: () => void): void { this.onValidatorChange = fn; }

  onTextInput(raw: string): void { this.selectDate(this.adapter.parse(raw, ARGENTINA_DATE_FORMATS.parse.dateInput), raw); }

  selectDate(value: Date | null, raw = ''): void {
    if (this.isDisabled()) return;
    const iso = value ? this.toIsoDate(value) : raw.trim();
    this.invalidInput.set(!value && !!raw.trim());
    this.selectedDate.set(value);
    this.onChange(iso);
    this.onValidatorChange();
    this.valueChange.emit(iso);
  }

  markTouched(): void { this.onTouched(); }
  maxDate(): Date | null { return this.toDate(this.max()); }

  private toDate(value: string | null | undefined): Date | null {
    const match = typeof value === 'string' ? value.match(/^(\d{4})-(\d{2})-(\d{2})$/) : null;
    if (!match) return null;
    const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    return date.getFullYear() === Number(match[1]) && date.getMonth() === Number(match[2]) - 1 && date.getDate() === Number(match[3]) ? date : null;
  }

  private toIsoDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
}
