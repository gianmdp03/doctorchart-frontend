import { TestBed } from '@angular/core/testing';
import { DoctorSpecialtyService } from './doctor-specialty.service';

describe('DoctorSpecialtyService metadata and capabilities', () => {
  it('accepts unknown specialty metadata without resolving a predefined mode', () => {
    const service = TestBed.inject(DoctorSpecialtyService);
    service.setSpecialty({ id: 10, code: 'unexpected-specialty', name: 'Nombre editable', description: null });
    expect(service.activeSpecialty()).toBe('unexpected-specialty');
    expect(service.currentSpecialtyOption().label).toBe('Nombre editable');
    expect(service.headerBrandTitle()).toContain('Nombre editable');
    expect(service.supportsGrowthCharts()).toBe(false);
    service.setDefinition({
      schemaVersion: 1, patientForm: { categories: [{
        key: 'unseen', title: 'Categoría libre', enabled: true, fields: [{
          key: 'relative', label: 'Responsable', type: 'TEXT', required: false, binding: 'patient.guardianInfo.fatherFullName',
        }],
      }] }, encounterForm: { categories: [] },
      modulesConfig: { MEDICATION_CATALOG: false, AI_ASSISTANT: false, GROWTH_CHARTS: true },
    });
    expect(service.hasFamilyInformation()).toBe(true);
    expect(service.supportsGrowthCharts()).toBe(true);
    service.clearSpecialty();
    expect(service.hasFamilyInformation()).toBe(false);
    expect(service.supportsGrowthCharts()).toBe(false);
    expect(service.activeSpecialty()).toBeNull();
  });
});
