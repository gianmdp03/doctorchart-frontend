import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormRendererComponent } from './dynamic-form-renderer.component';
import { FormTemplate } from '../../core/models/workspace.model';
import { By } from '@angular/platform-browser';

describe('DynamicFormRendererComponent', () => {
  let component: DynamicFormRendererComponent;
  let fixture: ComponentFixture<DynamicFormRendererComponent>;

  const mockTemplate: FormTemplate = {
    id: 1,
    name: 'Plantilla Pediátrica Estándar',
    templateType: 'ENCOUNTER',
    isDefault: true,
    schemaDefinition: {
      categories: [
        {
          categoryKey: 'VITAL_SIGNS_AND_SOMATOMETRY',
          title: 'Signos Vitales y Somatometría',
          enabled: true,
          fields: [
            {
              key: 'pesoKg',
              label: 'Peso',
              type: 'NUMBER',
              required: true,
              unit: 'kg',
              placeholder: 'Ej: 12.5',
            },
            {
              key: 'tallaCm',
              label: 'Estatura',
              type: 'NUMBER',
              unit: 'cm',
            },
            {
              key: 'estadoGeneral',
              label: 'Estado General',
              type: 'SELECT',
              options: [
                { value: 'BUENO', label: 'Buen estado general' },
                { value: 'REGULAR', label: 'Regular estado' },
                { value: 'MALO', label: 'Mal estado' },
              ],
            },
            {
              key: 'alimentacionMaterna',
              label: 'Lactancia Materna Exclusiva',
              type: 'BOOLEAN',
            },
            {
              key: 'observacionesGenerales',
              label: 'Observaciones',
              type: 'TEXTAREA',
              placeholder: 'Detalles...',
            },
          ],
        },
        {
          categoryKey: 'DISABLED_SECTION',
          title: 'Sección Oculta',
          enabled: false,
          fields: [
            {
              key: 'campoOculto',
              label: 'Oculto',
              type: 'TEXT',
            },
          ],
        },
      ],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormRendererComponent);
    component = fixture.componentInstance;
  });

  it('should create the dynamic form renderer', () => {
    expect(component).toBeTruthy();
  });

  it('should render standard active fields from enabled categories', () => {
    fixture.componentRef.setInput('template', mockTemplate);
    fixture.detectChanges();

    const pesoInput = fixture.debugElement.query(By.css('#pesoKg'));
    expect(pesoInput).toBeTruthy();
    expect(pesoInput.nativeElement.getAttribute('type')).toBe('number');

    const select = fixture.debugElement.query(By.css('#estadoGeneral'));
    expect(select).toBeTruthy();
    const options = select.queryAll(By.css('option'));
    expect(options.length).toBe(4); // 1 placeholder + 3 options

    const checkbox = fixture.debugElement.query(By.css('#alimentacionMaterna'));
    expect(checkbox).toBeTruthy();
    expect(checkbox.nativeElement.getAttribute('type')).toBe('checkbox');

    const textarea = fixture.debugElement.query(By.css('#observacionesGenerales'));
    expect(textarea).toBeTruthy();

    // Disabled category should not render
    const hiddenField = fixture.debugElement.query(By.css('#campoOculto'));
    expect(hiddenField).toBeNull();
  });

  it('should validate required fields and report validity correctly', () => {
    fixture.componentRef.setInput('template', mockTemplate);
    fixture.detectChanges();

    // pesoKg is required, initial form should be invalid
    expect(component.form().valid).toBe(false);

    // Populate pesoKg
    component.form().get('pesoKg')?.setValue(14.2);
    expect(component.form().valid).toBe(true);
  });

  it('should emit merged values when fields are updated', () => {
    let emittedValues: Record<string, unknown> | null = null;
    component.valuesChange.subscribe((val) => {
      emittedValues = val;
    });

    fixture.componentRef.setInput('template', mockTemplate);
    fixture.detectChanges();

    component.form().get('pesoKg')?.setValue(15);

    expect(emittedValues).toBeTruthy();
    expect(emittedValues!['pesoKg']).toBe(15);
  });

  it('should implement Historical Tolerance: render orphaned fields in historical section without crashing', () => {
    // Current template does NOT have "reflejoMoro", but values & snapshot do have it from an older encounter
    const pastValues: Record<string, unknown> = {
      pesoKg: 10.5,
      reflejoMoro: 'Presente y simétrico',
      perimetroCefalicoHistorico: '42 cm',
    };

    const pastSnapshot: Record<string, string> = {
      reflejoMoro: 'Reflejo de Moro (Evaluación Arcaica)',
      perimetroCefalicoHistorico: 'Perímetro Cefálico Histórico',
    };

    fixture.componentRef.setInput('template', mockTemplate);
    fixture.componentRef.setInput('values', pastValues);
    fixture.componentRef.setInput('historicalSnapshot', pastSnapshot);
    fixture.detectChanges();

    // Active field should be populated
    expect(component.form().get('pesoKg')?.value).toBe(10.5);

    // Historical section should be rendered
    const historicalSection = fixture.debugElement.query(By.css('[data-testid="historical-section"]'));
    expect(historicalSection).toBeTruthy();

    // Orphaned field should be present with snapshot label
    const moroItem = fixture.debugElement.query(By.css('[data-field-key="reflejoMoro"]'));
    expect(moroItem).toBeTruthy();
    expect(moroItem.nativeElement.textContent).toContain('Reflejo de Moro (Evaluación Arcaica)');
    expect(moroItem.nativeElement.textContent).toContain('Presente y simétrico');

    // Second orphaned field check
    const pcItem = fixture.debugElement.query(By.css('[data-field-key="perimetroCefalicoHistorico"]'));
    expect(pcItem).toBeTruthy();
    expect(pcItem.nativeElement.textContent).toContain('Perímetro Cefálico Histórico');
    expect(pcItem.nativeElement.textContent).toContain('42 cm');
  });

  it('should handle readonly mode by disabling controls', () => {
    fixture.componentRef.setInput('template', mockTemplate);
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();

    const pesoInput = fixture.debugElement.query(By.css('#pesoKg'));
    expect(pesoInput.nativeElement.disabled).toBe(true);
  });
});
