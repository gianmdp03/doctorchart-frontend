import {
  afterNextRender, afterRenderEffect, booleanAttribute, Component, computed, ElementRef,
  forwardRef, inject, input, signal, untracked, viewChild,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import IntlTelInput from '@intl-tel-input/angular';
import type { ItiUtils, ValidationError } from 'intl-tel-input';
import { es } from 'intl-tel-input/locale';
import { loadPhoneUtils, normalizedPhone } from './phone-number';

const DEFAULT_COUNTRY = 'ar';
const COUNTRY_ORDER = [DEFAULT_COUNTRY] as const;
const INVALID_PHONE = 'Ingresá un número de teléfono válido.';
const REQUIRED_PHONE = 'Ingresá un número de teléfono.';
const messages: Partial<Record<ValidationError, string>> = {
  INVALID_COUNTRY_CODE: 'El prefijo internacional no es válido.',
  TOO_SHORT: 'El número es demasiado corto para el país seleccionado.',
  TOO_LONG: 'El número es demasiado largo para el país seleccionado.',
};

@Component({
  selector: 'app-phone-input',
  imports: [IntlTelInput],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PhoneInputComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => PhoneInputComponent), multi: true },
  ],
  template: `
    @if (utils()) {
      <intl-tel-input
        [inputAttributes]="attributes()"
        [initialCountry]="defaultCountry"
        [countryOrder]="countryOrder"
        countryNameLocale="es-AR"
        [uiTranslations]="translations"
        [separateDialCode]="true"
        [formatAsYouType]="true"
        [strictMode]="false"
        [usePreciseValidation]="true"
        [allowedNumberTypes]="null"
        [loadUtils]="loadUtils"
        [dropdownParent]="selectorParent()"
        [fullscreenParent]="selectorParent()"
        [matchDropdownWidth]="true"
        [classNames]="{ countrySelector: 'dc-phone-selector' }"
        [disabled]="disabled() || loading()"
        [readonly]="readonly()"
        (input)="edit($event)"
        (blur)="touch()"
        (paste)="paste($event)"
      />
    } @else {
      <input class="dc-phone-placeholder" [id]="inputId()" type="tel" [value]="modelValue() ?? ''"
        [attr.aria-describedby]="description()" [attr.aria-busy]="!loadFailed()" disabled />
    }
    @if (historical()) {
      <span class="dc-phone-hint" [id]="inputId() + '-phone-hint'">
        Número histórico. Si lo editás, confirmá el país e ingresá el número completo.
      </span>
    }
    @if (visibleError(); as error) {
      <span class="dc-phone-error" [id]="inputId() + '-phone-error'" role="alert">{{ error }}</span>
    }
  `,
})
export class PhoneInputComponent implements ControlValueAccessor, Validator {
  readonly inputId = input.required<string>();
  readonly required = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly showErrors = input(false);
  readonly preserveExisting = input(false);
  readonly describedBy = input('');
  // The invitation endpoint also applies the existing staff_access storage constraint.
  readonly minimumE164Length = input(0);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly component = viewChild(IntlTelInput);
  protected readonly selectorParent = signal<HTMLElement | null>(null);
  protected readonly utils = signal<ItiUtils | null>(null);
  protected readonly modelValue = signal<string | null>(null);
  protected readonly loadFailed = signal(false);
  protected readonly disabled = signal(false);
  private readonly touched = signal(false);
  private readonly ready = signal(false);
  private readonly entryError = signal<string | null>(null);
  private readonly edited = signal(false);
  protected readonly historical = signal(false);
  protected readonly loading = computed(() => !this.ready() && !this.loadFailed());
  private writing = false;
  private onChange: (value: string | null) => void = () => {};
  private onTouched = () => {};
  private onValidatorChange = () => {};

  protected readonly defaultCountry = DEFAULT_COUNTRY;
  protected readonly countryOrder = [...COUNTRY_ORDER];
  protected readonly translations = { ...es, searchPlaceholder: 'Buscar país, código o prefijo' };
  protected readonly loadUtils = loadPhoneUtils;
  readonly validationMessage = computed(() => {
    if (this.disabled() || this.readonly()) return null;
    if (this.loadFailed()) return 'No se pudo cargar la validación del teléfono. Recargá la página.';
    if (this.entryError()) return this.entryError();
    if (!this.edited() && this.modelValue() && this.loading()) return 'Cargando el teléfono…';
    if (this.required() && !this.modelValue()?.trim() && !this.edited()) return REQUIRED_PHONE;
    return null;
  });
  protected readonly visibleError = computed(() =>
    this.showErrors() || this.touched() || this.loadFailed() ? this.validationMessage() : null,
  );
  protected readonly description = computed(() => [
    this.describedBy(),
    this.historical() ? this.inputId() + '-phone-hint' : '',
    this.visibleError() ? this.inputId() + '-phone-error' : '',
  ].filter(Boolean).join(' ') || null);
  protected readonly attributes = computed(() => ({
    id: this.inputId(),
    autocomplete: 'tel',
    inputmode: 'tel',
    'aria-required': String(this.required()),
    'aria-invalid': String(!!this.visibleError()),
    ...(this.description() ? { 'aria-describedby': this.description()! } : {}),
  }));

  constructor() {
    afterNextRender(async () => {
      const host = this.host.nativeElement;
      this.selectorParent.set(host.closest<HTMLElement>('mat-dialog-container, dialog, [aria-modal]') ?? host.ownerDocument.body);
      try {
        this.utils.set((await loadPhoneUtils()).default);
      } catch {
        this.loadFailed.set(true);
        this.onValidatorChange();
      }
    });
    afterRenderEffect(() => {
      const instance = this.component()?.getInstance();
      if (!instance) return;
      void instance.promise.then(() => {
        if (!instance.isActive()) return;
        this.ready.set(true);
      }).catch(() => {
        this.loadFailed.set(true);
        this.onValidatorChange();
      });
    });
    afterRenderEffect(() => {
      if (!this.ready()) return;
      untracked(() => this.restore());
    });
    afterRenderEffect(() => {
      const instance = this.component()?.getInstance();
      const disabled = this.disabled() || this.loading();
      const readOnly = this.readonly();
      // The library's two setters independently update the same country button.
      if (readOnly) instance?.setReadonly(true);
      else if (disabled) instance?.setDisabled(true);
    });
  }

  private get textbox(): HTMLInputElement | null {
    return this.host.nativeElement.querySelector('input.iti__tel-input');
  }

  writeValue(value: string | null): void {
    this.edited.set(false);
    this.entryError.set(null);
    this.modelValue.set(value ?? null);
    // Angular also writes the same value on reset.
    if (this.ready()) this.restore();
  }

  registerOnChange(fn: (value: string | null) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  registerOnValidatorChange(fn: () => void): void { this.onValidatorChange = fn; }
  setDisabledState(disabled: boolean): void { this.disabled.set(disabled); }
  validate(_control: AbstractControl) {
    const message = this.validationMessage();
    return message ? { phone: message } : null;
  }

  private restore(): void {
    const instance = this.component()?.getInstance();
    const textbox = this.textbox;
    const utils = this.utils();
    if (!instance || !textbox || !utils) return;
    const value = this.modelValue();
    const preserve = this.preserveExisting();
    const raw = value?.trim() ?? '';
    const canonical = raw && normalizedPhone(utils, raw, DEFAULT_COUNTRY);
    this.writing = true;
    try {
      // An unrecognized international prefix clears the country via the public API.
      instance.setNumber(canonical || (raw ? '+0' : ''));
      if (!canonical && raw) {
        textbox.value = value ?? '';
      } else if (!raw) {
        instance.setSelectedCountry(DEFAULT_COUNTRY);
      }
    } finally {
      this.writing = false;
    }
    this.historical.set(!!raw && preserve && !canonical);
    this.entryError.set(raw && !preserve && (!canonical || canonical.length < this.minimumE164Length()) ? INVALID_PHONE : null);
    this.onValidatorChange();
  }

  protected edit(event: Event): void {
    const textbox = this.textbox;
    const instance = this.component()?.getInstance();
    if (this.writing || !this.ready() || !instance || !textbox || event.target !== textbox) return;
    // Country inference during a native input event emits an intermediate event before formatting.
    const detail = (event as CustomEvent<{ isCountryChange?: boolean }>).detail;
    if (detail?.isCountryChange && !textbox.value) return;
    const raw = textbox.value.trim();
    const number = raw && instance.isValidNumberPrecise() ? instance.getNumber() : null;
    const canonical = number && /^\+[1-9]\d{1,14}$/.test(number) ? number : null;
    const error = !raw
      ? (this.required() ? REQUIRED_PHONE : null)
      : !canonical
        ? (messages[instance.getValidationError() ?? 'IS_POSSIBLE'] ?? INVALID_PHONE)
        : canonical.length < this.minimumE164Length() ? INVALID_PHONE : null;
    this.edited.set(true);
    this.historical.set(false);
    this.entryError.set(error);
    this.onChange(error ? null : canonical);
    this.onValidatorChange();
  }

  protected paste(event: ClipboardEvent): void {
    const textbox = this.textbox;
    const instance = this.component()?.getInstance();
    const utils = this.utils();
    const value = event.clipboardData?.getData('text');
    if (!textbox || !instance || !utils || !value || event.defaultPrevented) return;
    if (textbox.value && (textbox.selectionStart !== 0 || textbox.selectionEnd !== textbox.value.length)) return;
    const canonical = normalizedPhone(utils, value, instance.getSelectedCountry()?.iso2);
    if (!canonical) return;
    event.preventDefault();
    instance.setNumber(canonical);
  }

  protected touch(): void {
    this.touched.set(true);
    this.onTouched();
  }
}
