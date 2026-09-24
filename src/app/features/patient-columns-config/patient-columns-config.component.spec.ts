import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientColumnsConfigComponent } from './patient-columns-config.component';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PatientColumnsConfigComponent', () => {
  let component: PatientColumnsConfigComponent;
  let fixture: ComponentFixture<PatientColumnsConfigComponent>;
  let workspaceStoreMock: {
    patientVisibleColumns: ReturnType<typeof signal<Record<string, boolean>>>;
    updateWorkspace: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    workspaceStoreMock = {
      patientVisibleColumns: signal<Record<string, boolean>>({
        nationalId: true,
        birthDate: true,
        phone: false,
        email: true,
        lastCheckup: true,
        healthInsurance: false,
      }),
      updateWorkspace: vi.fn().mockResolvedValue({
        id: 1,
        userId: 'doc-1',
        patientColumnsConfig: {},
      }),
    };

    await TestBed.configureTestingModule({
      imports: [PatientColumnsConfigComponent],
      providers: [
        { provide: WorkspaceStore, useValue: workspaceStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientColumnsConfigComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize column checkboxes according to WorkspaceStore state when opened', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    expect(component.isColumnChecked('nationalId')).toBe(true);
    expect(component.isColumnChecked('phone')).toBe(false);
    expect(component.isColumnChecked('healthInsurance')).toBe(false);

    const nationalIdCheck = fixture.debugElement.query(By.css('[data-testid="col-checkbox-nationalId"]'));
    expect(nationalIdCheck.nativeElement.checked).toBe(true);

    const phoneCheck = fixture.debugElement.query(By.css('[data-testid="col-checkbox-phone"]'));
    expect(phoneCheck.nativeElement.checked).toBe(false);
  });

  it('should toggle column state correctly', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    component.toggleColumn('phone');
    expect(component.isColumnChecked('phone')).toBe(true);

    component.toggleColumn('nationalId');
    expect(component.isColumnChecked('nationalId')).toBe(false);
  });

  it('should mark all columns visible with selectAll', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    component.selectAll();
    for (const col of component.availableColumns) {
      expect(component.isColumnChecked(col.key)).toBe(true);
    }
  });

  it('should save configuration to WorkspaceStore and emit event', async () => {
    let emittedConfig: any = null;
    component.columnsSaved.subscribe((cfg) => {
      emittedConfig = cfg;
    });

    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    component.toggleColumn('phone'); // phone is now true
    await component.saveConfiguration();

    expect(workspaceStoreMock.updateWorkspace).toHaveBeenCalledWith({
      patientColumnsConfig: expect.objectContaining({
        phone: true,
      }),
    });
    expect(emittedConfig).toBeTruthy();
    expect(emittedConfig.phone).toBe(true);
  });
});
