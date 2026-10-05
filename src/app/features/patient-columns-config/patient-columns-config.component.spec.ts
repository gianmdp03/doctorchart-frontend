import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientColumnsConfigComponent } from './patient-columns-config.component';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PatientColumnsConfigComponent revision snapshot', () => {
  let component: PatientColumnsConfigComponent;
  let fixture: ComponentFixture<PatientColumnsConfigComponent>;
  let store: {
    preferences: ReturnType<typeof signal<{ version: number; patientColumnsConfig: Record<string, boolean>; quickNotes: string | null }>>;
    loadPreferences: ReturnType<typeof vi.fn>;
    updateWorkspace: ReturnType<typeof vi.fn>;
  };
  beforeEach(async () => {
    const preferences = { version: 3, patientColumnsConfig: { nationalId: true, phone: false, healthInsurance: false }, quickNotes: null };
    store = {
      preferences: signal(preferences),
      loadPreferences: vi.fn().mockResolvedValue(preferences),
      updateWorkspace: vi.fn().mockResolvedValue({ ...preferences, version: 4 }),
    };
    await TestBed.configureTestingModule({
      imports: [PatientColumnsConfigComponent],
      providers: [{ provide: WorkspaceStore, useValue: store }],
    }).compileComponents();
    fixture = TestBed.createComponent(PatientColumnsConfigComponent);
    component = fixture.componentInstance;
  });
  async function open(): Promise<void> {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  it('loads preferences before initializing and enabling its controls', async () => {
    await open();
    expect(store.loadPreferences).toHaveBeenCalledWith(true);
    expect(component.isColumnChecked('phone')).toBe(false);
    expect(component.isColumnChecked('nationalId')).toBe(true);
    const input = fixture.debugElement.query(By.css('[data-testid="col-checkbox-phone"]')).nativeElement;
    expect(input.checked).toBe(false);
    expect(input.disabled).toBe(false);
  });

  it('retains the version and local edits from opening when store changes in another tab', async () => {
    await open();
    component.toggleColumn('phone');
    store.preferences.set({ version: 10, patientColumnsConfig: { phone: false }, quickNotes: null });
    fixture.detectChanges();
    expect(component.isColumnChecked('phone')).toBe(true);
    await component.saveConfiguration();
    expect(store.updateWorkspace).toHaveBeenCalledWith({
      expectedVersion: 3,
      patientColumnsConfig: expect.objectContaining({ phone: true }),
    });
  });

  it('preserves edits when their captured version is rejected', async () => {
    await open();
    component.toggleColumn('phone');
    store.updateWorkspace.mockRejectedValue(new Error('Versión desactualizada'));
    await component.saveConfiguration();
    expect(component.errorMessage()).toBe('Versión desactualizada');
    expect(component.isColumnChecked('phone')).toBe(true);
    expect(component.saveSuccess()).toBe(false);
  });

  it('never saves default columns after a failed preferences load', async () => {
    store.loadPreferences.mockRejectedValue(new Error('Offline'));
    await open();
    expect(component.errorMessage()).toBe('Offline');
    await component.saveConfiguration();
    expect(store.updateWorkspace).not.toHaveBeenCalled();
  });
});
