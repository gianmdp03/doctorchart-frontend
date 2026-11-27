import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { EncounterTemplateService } from '../../../core/services/encounter-template.service';
import { EncounterTemplatesResponse } from '../../../core/models/encounter-template.model';
import { WizardFormDefinition } from '../../../core/models/wizard-definition.model';
import { ClinicalHistoryTemplatesManagerComponent } from './clinical-history-templates-manager.component';

const baseForm: WizardFormDefinition = {
  categories: [
    {
      key: 'motivo',
      title: 'Motivo de consulta',
      enabled: true,
      fields: [
        {
          key: 'chiefComplaint',
          label: 'Motivo',
          type: 'TEXTAREA',
          required: true,
        },
      ],
    },
  ],
};

function mockResponse(count: number): EncounterTemplatesResponse {
  const templates = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    workspaceId: 10,
    specialtyContextId: 20,
    name: i === 0 ? 'Recién nacidos' : `Plantilla ${i + 1}`,
    formDefinition: structuredClone(baseForm),
    sourceDefaultCode: i === 0 ? 'pediatrics_newborn' : null,
    displayOrder: i,
    version: 0,
    archivedAt: null,
    createdAt: '2026-11-27T00:00:00Z',
    updatedAt: '2026-11-27T00:00:00Z',
  }));
  return {
    specialtyContextId: 20,
    specialty: { id: 1, code: 'pediatrics', name: 'Pediatría', description: null },
    templates,
    archivedTemplates: [],
    systemDefaults: [],
  };
}

describe('ClinicalHistoryTemplatesManagerComponent', () => {
  let serviceMock: {
    list: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    archive: ReturnType<typeof vi.fn>;
    restore: ReturnType<typeof vi.fn>;
    importDefaults: ReturnType<typeof vi.fn>;
  };
  let fixture: ComponentFixture<ClinicalHistoryTemplatesManagerComponent>;

  beforeEach(async () => {
    serviceMock = {
      list: vi.fn().mockReturnValue(of(mockResponse(1))),
      create: vi.fn(),
      update: vi.fn(),
      archive: vi.fn(),
      restore: vi.fn(),
      importDefaults: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ClinicalHistoryTemplatesManagerComponent],
      providers: [{ provide: EncounterTemplateService, useValue: serviceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ClinicalHistoryTemplatesManagerComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('auto-selects base template without picker when only 1 active template exists (Caso A)', () => {
    const el: HTMLElement = fixture.nativeElement;
    const addBtn = el.querySelector('button.tm-btn-primary') as HTMLButtonElement;
    addBtn.click();
    fixture.detectChanges();

    expect(el.querySelector('fieldset.tm-base-fieldset')).toBeNull();
    expect(el.textContent).toContain('Se creará una copia independiente a partir de «Recién nacidos»');
  });

  it('shows base template picker when 2 or more active templates exist (Caso B)', async () => {
    serviceMock.list.mockReturnValue(of(mockResponse(2)));
    await fixture.componentInstance.loadTemplates();
    fixture.detectChanges();

    fixture.componentInstance.openCreateFlow();
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('fieldset.tm-base-fieldset')).not.toBeNull();
    expect(el.textContent).toContain('¿Qué plantilla querés utilizar como base para la nueva?');
  });
});
