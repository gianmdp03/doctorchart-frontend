import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { describe, expect, it, vi } from 'vitest';
import { PhoneInputComponent } from './phone-input.component';

@Component({
  imports: [PhoneInputComponent, ReactiveFormsModule],
  template: '<label for="phone-test">Teléfono</label><app-phone-input inputId="phone-test" [formControl]="phone" [required]="required" [preserveExisting]="preserveExisting" [readonly]="readonly" />',
})
class Host {
  readonly phone = new FormControl<string | null>(null);
  required = false;
  preserveExisting = false;
  readonly = false;
}

describe('PhoneInputComponent', () => {
  async function mount(options: Partial<Pick<Host, 'required' | 'preserveExisting' | 'readonly'>> = {}, value?: string) {
    const fixture = TestBed.createComponent(Host);
    const host = fixture.componentInstance;
    Object.assign(host, options);
    if (value) host.phone.setValue(value);
    const root: HTMLElement = fixture.nativeElement;
    await vi.waitFor(() => {
      fixture.detectChanges();
      expect(root.querySelector<HTMLInputElement>('#phone-test')?.disabled).toBe(false);
    });
    const textbox = root.querySelector<HTMLInputElement>('#phone-test')!;
    function enter(text: string) {
      textbox.value = text;
      textbox.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();
    }
    return { fixture, control: host.phone, textbox, enter, root };
  }

  it('starts in Argentina and keeps display and canonical values separate', async () => {
    const { control, root, enter } = await mount();
    expect(root.querySelector('.iti__selected-dial-code')?.textContent).toBe('+54');
    expect(root.querySelector('.iti__selected-country .iti__ar')).not.toBeNull();
    expect(control.valid).toBe(true);
    enter('011 15-2345-6789');
    expect(control.value).toBe('+5491123456789');
    enter('0351 15-234-5678');
    expect(control.value).toBe('+5493512345678');
    enter('0223 495-1234');
    expect(control.value).toBe('+542234951234');
    enter('+14165550123');
    expect(control.value).toBe('+14165550123');
    expect(root.querySelector('.iti__selected-country .iti__ca')).not.toBeNull();
  });

  it('marks required, malformed, short, and long entries invalid', async () => {
    const { fixture, control, enter, textbox, root } = await mount({ required: true });
    expect(control.invalid).toBe(true);
    enter('123');
    expect(control.invalid).toBe(true);
    expect(control.value).toBeNull();
    textbox.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(textbox.getAttribute('aria-describedby')).toBe('phone-test-phone-error');
    expect(root.querySelector('[role=alert]')?.textContent).toContain('demasiado corto');
    enter('22349512345678');
    expect(root.querySelector('[role=alert]')?.textContent).toContain('demasiado largo');
    enter('+999 123456789');
    expect(root.querySelector('[role=alert]')?.textContent).toContain('prefijo internacional');
    enter('+34 612 345 678');
    expect(control.valid).toBe(true);
    expect(control.value).toBe('+34612345678');
  });

  it('keeps an ambiguous historical answer intact until the user edits it', async () => {
    const { fixture, control, root, textbox, enter } = await mount({ preserveExisting: true }, 'Interno 123');
    expect(control.pristine).toBe(true);
    expect(control.valid).toBe(true);
    expect(control.value).toBe('Interno 123');
    expect(textbox.value).toBe('Interno 123');
    expect(root.querySelector('.iti__selected-dial-code')?.textContent).toBe('');
    expect(root.querySelector('.dc-phone-hint')).not.toBeNull();
    enter('+5491123456789');
    expect(control.value).toBe('+5491123456789');
    expect(root.querySelector('.dc-phone-hint')).toBeNull();
    control.reset();
    fixture.detectChanges();
    expect(textbox.value).toBe('');
    expect(root.querySelector('.iti__selected-dial-code')?.textContent).toBe('+54');
  });

  it('restores international and national values without emitting edits and disables both controls', async () => {
    const { fixture, control, root, textbox } = await mount({}, '+1 (416) 555-0123');
    expect(root.querySelector('.iti__selected-country .iti__ca')).not.toBeNull();
    expect(control.value).toBe('+1 (416) 555-0123');
    control.setValue('011 15-2345-6789');
    fixture.detectChanges();
    expect(root.querySelector('.iti__selected-country .iti__ar')).not.toBeNull();
    expect(control.value).toBe('011 15-2345-6789');
    expect(control.pristine).toBe(true);
    control.disable();
    fixture.detectChanges();
    expect(textbox.disabled).toBe(true);
    expect(root.querySelector<HTMLButtonElement>('.iti__selected-country')?.disabled).toBe(true);
  });

  it('uses a Material dialog as the country selector parent', async () => {
    TestBed.configureTestingModule({ imports: [MatDialogModule] });
    const dialog = TestBed.inject(MatDialog).open(Host, { enterAnimationDuration: 0, exitAnimationDuration: 0 });
    try {
      const container = document.querySelector('mat-dialog-container')!;
      await vi.waitFor(() => {
        expect(container.querySelector<HTMLInputElement>('#phone-test')?.disabled).toBe(false);
      });
      const button = container.querySelector<HTMLButtonElement>('.iti__selected-country')!;
      button.click();
      const search = container.querySelector<HTMLInputElement>('.iti__search-input');
      expect(search).not.toBeNull();
      expect(document.activeElement).toBe(search);
    } finally {
      dialog.close();
    }
  });

  it('makes a read-only number selectable without allowing edits or opening the selector', async () => {
    const { root, textbox, control } = await mount({ readonly: true }, '+5491123456789');
    expect(textbox.readOnly).toBe(true);
    expect(textbox.disabled).toBe(false);
    expect(root.querySelector<HTMLButtonElement>('.iti__selected-country')?.disabled).toBe(true);
    expect(control.value).toBe('+5491123456789');
  });
});

