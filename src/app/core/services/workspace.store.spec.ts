import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { WorkspaceStore } from './workspace.store';
import { WorkspaceService } from './workspace.service';
import { WorkspaceSetup } from '../models/workspace.model';
import { of } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';

describe('WorkspaceStore', () => {
  let store: WorkspaceStore;
  let workspaceServiceMock: {
    getCurrentSetup: ReturnType<typeof vi.fn>;
    updateWorkspace: ReturnType<typeof vi.fn>;
    resetToDefaults: ReturnType<typeof vi.fn>;
  };

  const mockSetup: WorkspaceSetup = {
    id: 1,
    userId: 'doctor-abc',
    specialtyId: 10,
    specialtyCode: 'PEDIATRICS',
    specialtyDisplayName: 'Pediatría y Neonatología',
    onboardingCompleted: true,
    onboardingStep: 'COMPLETED',
    patientColumnsConfig: {
      nationalId: true,
      phone: false,
    },
    modulesConfig: {
      APPOINTMENTS: true,
      GROWTH_CHARTS: true,
      AI_ASSISTANT: false,
    },
  };

  beforeEach(() => {
    workspaceServiceMock = {
      getCurrentSetup: vi.fn().mockReturnValue(of(mockSetup)),
      updateWorkspace: vi.fn(),
      resetToDefaults: vi.fn().mockReturnValue(of(mockSetup)),
    };

    TestBed.configureTestingModule({
      providers: [
        WorkspaceStore,
        { provide: WorkspaceService, useValue: workspaceServiceMock },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    store = TestBed.inject(WorkspaceStore);
  });

  it('should be created and start with null setup', () => {
    expect(store).toBeTruthy();
    expect(store.currentSetup()).toBeNull();
    expect(store.isOnboardingCompleted()).toBe(false);
  });

  it('should load setup and compute reactive signals', async () => {
    const loaded = await store.loadSetup();

    expect(workspaceServiceMock.getCurrentSetup).toHaveBeenCalled();
    expect(loaded).toEqual(mockSetup);
    expect(store.currentSetup()).toEqual(mockSetup);
    expect(store.isOnboardingCompleted()).toBe(true);
    expect(store.specialtyCode()).toBe('PEDIATRICS');
    expect(store.isModuleActive('APPOINTMENTS')).toBe(true);
    expect(store.isModuleActive('AI_ASSISTANT')).toBe(false);
    expect(store.isColumnVisible('nationalId')).toBe(true);
    expect(store.isColumnVisible('phone')).toBe(false);
  });

  it('should update workspace patient columns config', async () => {
    store.setSetup(mockSetup);

    const updatedSetup: WorkspaceSetup = {
      ...mockSetup,
      patientColumnsConfig: {
        nationalId: true,
        phone: true,
      },
    };
    workspaceServiceMock.updateWorkspace.mockReturnValue(of(updatedSetup));

    const result = await store.updateWorkspace({
      patientColumnsConfig: { nationalId: true, phone: true },
    });

    expect(workspaceServiceMock.updateWorkspace).toHaveBeenCalledWith({
      patientColumnsConfig: { nationalId: true, phone: true },
    });
    expect(result.patientColumnsConfig['phone']).toBe(true);
    expect(store.isColumnVisible('phone')).toBe(true);
  });

  it('should reset workspace to defaults and update current setup', async () => {
    store.setSetup(mockSetup);
    const resetSetup: WorkspaceSetup = {
      ...mockSetup,
      defaultPatientTemplate: null,
      defaultEncounterTemplate: null,
      onboardingDraft: null,
    };
    workspaceServiceMock.resetToDefaults = vi.fn().mockReturnValue(of(resetSetup));

    const result = await store.resetToDefaults();

    expect(workspaceServiceMock.resetToDefaults).toHaveBeenCalled();
    expect(store.currentSetup()).toEqual(resetSetup);
  });
});
