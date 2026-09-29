import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFieldEditorComponent } from './form-field-editor.component';
import { FormTemplate } from '../../core/models/workspace.model';
import { By } from '@angular/platform-browser';

describe('FormFieldEditorComponent', () => {
  let component: FormFieldEditorComponent;
  let fixture: ComponentFixture<FormFieldEditorComponent>;

  const initialTemplate: FormTemplate = {
    id: 1,
    name: 'Plantilla de Prueba',
    templateType: 'ENCOUNTER',
    isDefault: true,
    schemaDefinition: {
      categories: [
        {
          categoryKey: 'VITAL_SIGNS_AND_SOMATOMETRY',
          title: 'Signos Vitales',
          enabled: true,
          fields: [
            {
              key: 'presionArterial',
              label: 'Presión Arterial',
              type: 'TEXT',
              unit: 'mmHg',
            },
            {
              key: 'frecuenciaCardiaca',
              label: 'Frecuencia Cardíaca',
              type: 'NUMBER',
              unit: 'lpm',
            },
          ],
        },
      ],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldEditorComponent);
    component = fixture.componentInstance;
  });

  it('should create the editor component', () => {
    expect(component).toBeTruthy();
  });

  it('should render categories and fields', () => {
    fixture.componentRef.setInput('template', initialTemplate);
    fixture.detectChanges();

    expect(component.categories().length).toBe(1);
    expect(component.selectedCategory()?.title).toBe('Signos Vitales');
    expect(component.selectedCategory()?.fields.length).toBe(2);

    const fieldCards = fixture.debugElement.queryAll(By.css('.field-card'));
    expect(fieldCards.length).toBe(2);
    expect(fieldCards[0].nativeElement.textContent).toContain('Texto corto');
    expect(fieldCards[0].nativeElement.textContent).not.toContain('TEXT');
    expect(fixture.debugElement.query(By.css('.field-key-code'))).toBeNull();
  });

  it('should reorder fields down and up', () => {
    fixture.componentRef.setInput('template', initialTemplate);
    fixture.detectChanges();

    // Move first field down
    component.moveFieldDown(0, 0);

    const updatedFields = component.selectedCategory()?.fields;
    expect(updatedFields?.[0].key).toBe('frecuenciaCardiaca');
    expect(updatedFields?.[1].key).toBe('presionArterial');

    // Move it back up
    component.moveFieldUp(0, 1);
    expect(component.selectedCategory()?.fields[0].key).toBe('presionArterial');
  });

  it('should open impact warning modal before deleting and keep historical notice', () => {
    fixture.componentRef.setInput('template', initialTemplate);
    fixture.detectChanges();

    const deleteBtn = fixture.debugElement.query(By.css('.btn-delete-field'));
    deleteBtn.nativeElement.click();
    fixture.detectChanges();

    expect(component.deleteTarget()).toBeTruthy();
    expect(component.deleteTarget()?.field.key).toBe('presionArterial');

    // Verify historical warning text is displayed
    const modalText = fixture.debugElement.query(By.css('.impact-alert-box')).nativeElement.textContent;
    expect(modalText).toContain('Desactivar este campo no borrará los datos históricos de consultas pasadas');

    // Confirm delete
    const confirmBtn = fixture.debugElement.query(By.css('.btn-modal-confirm-delete'));
    confirmBtn.nativeElement.click();
    fixture.detectChanges();

    expect(component.selectedCategory()?.fields.length).toBe(1);
    expect(component.selectedCategory()?.fields[0].key).toBe('frecuenciaCardiaca');
  });

  it('should add a new clinical field', () => {
    fixture.componentRef.setInput('template', initialTemplate);
    fixture.detectChanges();

    component.openAddFieldModal();
    fixture.detectChanges();

    component.newFieldType.set('NUMBER');
    component.newFieldLabel.set('Temperatura Axilar');
    component.newFieldUnit.set('°C');
    component.newFieldRequired.set(true);

    component.submitAddField();
    fixture.detectChanges();

    expect(component.isAddingField()).toBe(false);
    expect(component.selectedCategory()?.fields.length).toBe(3);
    const added = component.selectedCategory()?.fields[2];
    expect(added?.key).toBe('temperaturaAxilar');
    expect(added?.unit).toBe('°C');
    expect(added?.required).toBe(true);
  });

  it('should generate a unique internal key from the visible label', () => {
    fixture.componentRef.setInput('template', initialTemplate);
    fixture.detectChanges();

    component.openAddFieldModal();
    component.onLabelInput('Presión Arterial');
    component.submitAddField();

    const added = component.selectedCategory()?.fields[2];
    expect(added?.key).toBe('presionArterial2');
  });
});
