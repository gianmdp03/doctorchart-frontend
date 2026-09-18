import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicSpecialtyFormComponent } from './dynamic-specialty-form.component';
import { SpecialtySchema } from '../../core/models/specialty.model';

describe('DynamicSpecialtyFormComponent', () => {
  let component: DynamicSpecialtyFormComponent;
  let fixture: ComponentFixture<DynamicSpecialtyFormComponent>;

  const mockSchema: SpecialtySchema = {
    specialty: 'CARDIOLOGY',
    displayName: 'Cardiología',
    description: 'Protocolo de cardiología',
    version: '1.0.0',
    fields: [
      {
        key: 'nyhaClass',
        label: 'Clase Funcional NYHA',
        type: 'SELECT',
        required: true,
        group: 'Estratificación',
        options: [
          { label: 'Clase I', value: 'CLASS_I' },
          { label: 'Clase II', value: 'CLASS_II' },
        ],
      },
      {
        key: 'leftVentricularEjectionFraction',
        label: 'FEVI',
        type: 'NUMBER',
        required: false,
        unit: '%',
        minValue: 10,
        maxValue: 85,
        group: 'Ecocardiograma',
      },
      {
        key: 'valvularDisease',
        label: 'Valvulopatías',
        type: 'MULTI_SELECT',
        required: false,
        group: 'Ecocardiograma',
        options: [
          { label: 'Estenosis Aórtica', value: 'AORTIC_STENOSIS' },
          { label: 'Insuficiencia Mitral', value: 'MITRAL_REGURGITATION' },
        ],
      },
      {
        key: 'coronaryCatheterizationDone',
        label: 'Cateterismo Previo',
        type: 'BOOLEAN',
        required: false,
        group: 'Hemodinamia',
      },
      {
        key: 'restingEcgFindings',
        label: 'Hallazgos ECG',
        type: 'TEXTAREA',
        required: false,
        group: 'Electrocardiograma',
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicSpecialtyFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicSpecialtyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty state when schema is null', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty-state')).toBeTruthy();
    expect(compiled.querySelector('.specialty-banner')).toBeFalsy();
  });

  it('should render specialty banner and grouped fields when schema is set', () => {
    fixture.componentRef.setInput('schema', mockSchema);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.empty-state')).toBeFalsy();
    expect(compiled.querySelector('.specialty-title')?.textContent).toContain('Cardiología');
    expect(compiled.querySelector('.specialty-badge')?.textContent).toContain('CARDIOLOGY');

    const groupCards = compiled.querySelectorAll('.field-group-card');
    expect(groupCards.length).toBe(4); // Estratificación, Ecocardiograma, Hemodinamia, Electrocardiograma
  });

  it('should group fields correctly using computed signal', () => {
    fixture.componentRef.setInput('schema', mockSchema);
    fixture.detectChanges();

    const groups = component.groupedFields();
    expect(groups.length).toBe(4);
    expect(groups[0].groupName).toBe('Estratificación');
    expect(groups[0].fields.length).toBe(1);
    expect(groups[1].groupName).toBe('Ecocardiograma');
    expect(groups[1].fields.length).toBe(2);
  });

  it('should update model on text and select change', () => {
    fixture.componentRef.setInput('schema', mockSchema);
    fixture.detectChanges();

    component.setFieldValue('nyhaClass', 'CLASS_I');
    expect(component.getFieldValue('nyhaClass')).toBe('CLASS_I');
    expect(component.specialtyData()['nyhaClass']).toBe('CLASS_I');

    component.setFieldValue('restingEcgFindings', 'Sinus rhythm normal');
    expect(component.getFieldValue('restingEcgFindings')).toBe('Sinus rhythm normal');
  });

  it('should update model on number change', () => {
    fixture.componentRef.setInput('schema', mockSchema);
    fixture.detectChanges();

    const event = { target: { value: '62.5' } } as unknown as Event;
    component.onNumberChange('leftVentricularEjectionFraction', event);

    expect(component.getFieldValue('leftVentricularEjectionFraction')).toBe(62.5);

    // Empty value should reset to null
    const emptyEvent = { target: { value: '' } } as unknown as Event;
    component.onNumberChange('leftVentricularEjectionFraction', emptyEvent);
    expect(component.getFieldValue('leftVentricularEjectionFraction')).toBeNull();
  });

  it('should toggle multi-select options in an array', () => {
    fixture.componentRef.setInput('schema', mockSchema);
    fixture.detectChanges();

    // Toggle on
    component.toggleMultiSelect('valvularDisease', 'AORTIC_STENOSIS');
    expect(component.isOptionSelected('valvularDisease', 'AORTIC_STENOSIS')).toBe(true);
    expect(component.getFieldValue('valvularDisease')).toEqual(['AORTIC_STENOSIS']);

    // Toggle on second option
    component.toggleMultiSelect('valvularDisease', 'MITRAL_REGURGITATION');
    expect(component.getFieldValue('valvularDisease')).toEqual([
      'AORTIC_STENOSIS',
      'MITRAL_REGURGITATION',
    ]);

    // Toggle off first option
    component.toggleMultiSelect('valvularDisease', 'AORTIC_STENOSIS');
    expect(component.isOptionSelected('valvularDisease', 'AORTIC_STENOSIS')).toBe(false);
    expect(component.getFieldValue('valvularDisease')).toEqual(['MITRAL_REGURGITATION']);
  });

  it('should update boolean toggle value', () => {
    fixture.componentRef.setInput('schema', mockSchema);
    fixture.detectChanges();

    const event = { target: { checked: true } } as unknown as Event;
    component.onBooleanChange('coronaryCatheterizationDone', event);

    expect(component.getFieldValue('coronaryCatheterizationDone')).toBe(true);
  });

  it('should ignore mutations when readOnly is true', () => {
    fixture.componentRef.setInput('schema', mockSchema);
    fixture.componentRef.setInput('readOnly', true);
    fixture.detectChanges();

    component.setFieldValue('nyhaClass', 'CLASS_IV');
    expect(component.getFieldValue('nyhaClass')).toBeUndefined();

    component.toggleMultiSelect('valvularDisease', 'AORTIC_STENOSIS');
    expect(component.getFieldValue('valvularDisease')).toBeUndefined();
  });
});
