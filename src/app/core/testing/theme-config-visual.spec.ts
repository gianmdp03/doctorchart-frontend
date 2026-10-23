import { TestBed } from '@angular/core/testing';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { FormFieldEditorComponent } from '../../features/form-field-editor/form-field-editor.component';
import { WizardFormDefinition } from '../models/wizard-definition.model';

describe('Configuration theme fixture', () => {
  it('renders selected, unselected and inactive categories, locked fields and the field page', async () => {
    await TestBed.configureTestingModule({ imports: [FormFieldEditorComponent] }).compileComponents();
    const fixture = TestBed.createComponent(FormFieldEditorComponent);
    const definition: WizardFormDefinition = { categories: [
      { key: 'sys_patient_profile', title: 'Datos Personales', enabled: true, system: true, fields: [
        { key: 'sys_firstName', label: 'Nombre', type: 'TEXT', required: true, system: true },
        { key: 'sys_lastName', label: 'Apellido', type: 'TEXT', required: true, system: true },
        { key: 'sys_dni', label: 'DNI', type: 'TEXT', required: true, system: true },
      ] },
      { key: 'family', title: 'Antecedentes familiares', enabled: true, fields: [] },
      { key: 'additional', title: 'Información adicional', enabled: false, fields: [] },
    ] };
    fixture.componentRef.setInput('definition', definition);
    fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.category-row').length).toBe(3);
    expect(fixture.nativeElement.querySelector('.category-row.selected').textContent).toContain('Datos Personales');
    const output = process.env['THEME_VISUAL_DIR'];
    const save = (name: string) => {
      if (!output) return;
      mkdirSync(output, { recursive: true });
      const clone = fixture.nativeElement.cloneNode(true) as HTMLElement;
      const fields = fixture.nativeElement.querySelectorAll('input, textarea, select') as NodeListOf<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
      clone.querySelectorAll('input, textarea, select').forEach((field, index) => {
        if (field instanceof HTMLTextAreaElement) field.textContent = fields[index].value;
        else if (field instanceof HTMLSelectElement) {
          [...field.options].forEach(option => option.toggleAttribute('selected', option.value === fields[index].value));
        } else field.setAttribute('value', fields[index].value);
      });
      writeFileSync(join(output, `${name}.html`), `<!doctype html><html lang="es"><head>
        <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="stylesheet" href="http://127.0.0.1:4202/styles.css">${document.head.innerHTML}
        <style>body{padding:32px}app-form-field-editor{max-width:1100px;margin:auto}</style>
        </head><body><h1>Datos Personales</h1>${clone.outerHTML}</body></html>`);
    };
    save('configuration');
    fixture.componentInstance.openField('family');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.field-editor-page')).toBeTruthy();
    save('configuration-field-page');
  });
});
