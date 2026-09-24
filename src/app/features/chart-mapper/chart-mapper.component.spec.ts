import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartMapperComponent } from './chart-mapper.component';
import { WorkspaceService } from '../../core/services/workspace.service';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { ChartDefinition, DoctorChartConfig, FormTemplate } from '../../core/models/workspace.model';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ChartMapperComponent', () => {
  let component: ChartMapperComponent;
  let fixture: ComponentFixture<ChartMapperComponent>;

  const mockCatalog: ChartDefinition[] = [
    {
      id: 1,
      chartCode: 'WEIGHT_EVOLUTION',
      title: 'Evolución Longitudinal de Peso',
      chartType: 'LINE',
      description: 'Seguimiento del peso corporal a través del tiempo.',
      requiredSlots: [
        { slot: 'WEIGHT_SERIES', label: 'Serie de Peso', type: 'NUMBER' },
      ],
      isSystem: true,
    },
    {
      id: 2,
      chartCode: 'BLOOD_PRESSURE_EVOLUTION',
      title: 'Evolución de Presión Arterial',
      chartType: 'LINE',
      description: 'Presión sistólica y diastólica.',
      requiredSlots: [
        { slot: 'BP_SYSTOLIC', label: 'Presión Sistólica', type: 'NUMBER' },
        { slot: 'BP_DIASTOLIC', label: 'Presión Diastólica', type: 'NUMBER' },
      ],
      isSystem: true,
    },
  ];

  const mockConfigs: DoctorChartConfig[] = [
    {
      chartCode: 'WEIGHT_EVOLUTION',
      isActive: true,
      fieldMappings: { WEIGHT_SERIES: 'pesoKg' },
    },
  ];

  const mockTemplate: FormTemplate = {
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
            { key: 'pesoKg', label: 'Peso Corporal', type: 'NUMBER' },
            { key: 'tallaCm', label: 'Estatura', type: 'NUMBER' },
            { key: 'presionSistolica', label: 'PA Sistólica', type: 'NUMBER' },
          ],
        },
      ],
    },
  };

  let workspaceServiceMock: {
    getChartsCatalog: ReturnType<typeof vi.fn>;
    getDoctorChartConfigs: ReturnType<typeof vi.fn>;
  };

  let workspaceStoreMock: {
    defaultTemplate: ReturnType<typeof signal<FormTemplate | null>>;
    chartConfigs: ReturnType<typeof signal<DoctorChartConfig[]>>;
    saveChartConfigs: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    workspaceServiceMock = {
      getChartsCatalog: vi.fn().mockReturnValue(of(mockCatalog)),
      getDoctorChartConfigs: vi.fn().mockReturnValue(of(mockConfigs)),
    };

    workspaceStoreMock = {
      defaultTemplate: signal<FormTemplate | null>(mockTemplate),
      chartConfigs: signal<DoctorChartConfig[]>(mockConfigs),
      saveChartConfigs: vi.fn().mockResolvedValue(mockConfigs),
    };

    await TestBed.configureTestingModule({
      imports: [ChartMapperComponent],
      providers: [
        { provide: WorkspaceService, useValue: workspaceServiceMock },
        { provide: WorkspaceStore, useValue: workspaceStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartMapperComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load catalog and configs when opened', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    expect(workspaceServiceMock.getChartsCatalog).toHaveBeenCalled();
    expect(workspaceServiceMock.getDoctorChartConfigs).toHaveBeenCalled();
    expect(component.catalog().length).toBe(2);
    expect(component.isChartActive('WEIGHT_EVOLUTION')).toBe(true);
    expect(component.isChartActive('BLOOD_PRESSURE_EVOLUTION')).toBe(false);
  });

  it('should toggle chart active state', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    component.toggleChartActive('BLOOD_PRESSURE_EVOLUTION');
    expect(component.isChartActive('BLOOD_PRESSURE_EVOLUTION')).toBe(true);

    component.toggleChartActive('WEIGHT_EVOLUTION');
    expect(component.isChartActive('WEIGHT_EVOLUTION')).toBe(false);
  });

  it('should update field mapping for a chart slot', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    component.updateMapping('WEIGHT_EVOLUTION', 'WEIGHT_SERIES', 'pesoAdultoKg');
    expect(component.getSelectedMapping('WEIGHT_EVOLUTION', 'WEIGHT_SERIES')).toBe('pesoAdultoKg');
  });

  it('should save updated chart configurations and emit configsSaved', async () => {
    let emittedConfigs: any = null;
    component.configsSaved.subscribe((cfgs) => {
      emittedConfigs = cfgs;
    });

    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    component.updateMapping('WEIGHT_EVOLUTION', 'WEIGHT_SERIES', 'pesoKg');
    await component.save();

    expect(workspaceStoreMock.saveChartConfigs).toHaveBeenCalled();
    expect(emittedConfigs).toBeTruthy();
  });

  it('should keep onboarding mappings as a draft instead of saving them to the workspace', async () => {
    const emitted = { configs: null as DoctorChartConfig[] | null };
    component.configsSaved.subscribe((configs) => emitted.configs = configs);

    fixture.componentRef.setInput('onboardingMode', true);
    fixture.componentRef.setInput('initialConfigs', mockConfigs);
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    await component.save();

    expect(workspaceServiceMock.getDoctorChartConfigs).not.toHaveBeenCalled();
    expect(workspaceStoreMock.saveChartConfigs).not.toHaveBeenCalled();
    expect(emitted.configs).toEqual(expect.arrayContaining([
      expect.objectContaining({ chartCode: 'WEIGHT_EVOLUTION' }),
    ]));
  });

  it('offers only fields compatible with a chart slot type', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    expect(component.availableFieldsForSlot({ slot: 'date', label: 'Fecha', type: 'DATE' }))
      .toEqual([expect.objectContaining({ key: 'encounterDate' })]);
    expect(component.availableFieldsForSlot({ slot: 'weight', label: 'Peso', type: 'NUMBER' }))
      .toEqual(expect.arrayContaining([expect.objectContaining({ key: 'pesoKg' })]));
  });
});
