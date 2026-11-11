import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { describe, it, expect, vi } from 'vitest';
import defaults from './testing/default-specialties.json';
import { WizardDefinition } from '../../core/models/wizard-definition.model';
import { WorkspaceSetup } from '../../core/models/workspace.model';
import { WorkspaceStore } from '../../core/services/workspace.store';
import { SpecialtyService } from '../../core/services/specialty.service';
import { DoctorProfileService } from '../../core/services/doctor-profile.service';
import { AuthService } from '../../core/services/auth.service';
import { OnboardingWizardComponent } from './onboarding-wizard/onboarding-wizard.component';
import { SpecialtySelectionComponent } from './specialty-selection/specialty-selection.component';
import { FormFieldEditorComponent } from '../form-field-editor/form-field-editor.component';

// Captured published definitions from backend internal/bootstrap/seed.json.
// Fixtures are test data only; production always loads the API publication.
for (const specialty of defaults) {
  describe(specialty.name, () => {
    const definition = () => structuredClone(specialty.definition) as WizardDefinition;

    it('renders the catalog choice and selects it through the existing API flow', async () => {
      const selectSpecialty = vi.fn().mockResolvedValue({});
      const navigate = vi.fn().mockResolvedValue(true);
      await TestBed.configureTestingModule({
        imports: [SpecialtySelectionComponent],
        providers: [
          { provide: Router, useValue: { navigate } },
          { provide: SpecialtyService, useValue: { getSpecialties: () => of([
            { id: 1, code: 'pediatrics', name: 'Pediatría' }, ...defaults,
          ]) } },
          { provide: WorkspaceStore, useValue: { loadSetup: async () => null, selectSpecialty } },
          { provide: DoctorProfileService, useValue: {} },
          { provide: AuthService, useValue: {} },
        ],
      }).compileComponents();
      const fixture = TestBed.createComponent(SpecialtySelectionComponent);
      fixture.detectChanges();
      await vi.waitFor(() => expect(fixture.componentInstance.isLoading()).toBe(false));
      await fixture.whenStable(); fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('.specialty-card')).toHaveLength(3);
      const cards = Array.from(fixture.nativeElement.querySelectorAll('.specialty-card')) as HTMLElement[];
      cards.find(card => card.textContent?.includes(specialty.name))!.click();
      await fixture.componentInstance.confirmSpecialty();
      expect(selectSpecialty).toHaveBeenCalledWith(specialty.id, null);
      expect(navigate).toHaveBeenCalledWith(['/onboarding/setup']);
    });

    it('edits defaults with the existing category controls and individual field removal', async () => {
      await TestBed.configureTestingModule({ imports: [FormFieldEditorComponent] }).compileComponents();
      const fixture = TestBed.createComponent(FormFieldEditorComponent);
      fixture.componentRef.setInput('definition', definition().encounterForm);
      fixture.componentRef.setInput('section', 'encounterForm');
      fixture.detectChanges();
      const component = fixture.componentInstance;
      expect(fixture.nativeElement.textContent).toContain('Motivo de consulta');
      const row = fixture.nativeElement.querySelector('.category-row') as HTMLElement;
      const toggle = Array.from(row.querySelectorAll('button')).find(button => button.textContent?.trim() === 'Activa')!;
      toggle.click(); fixture.detectChanges();
      expect(component.categories()[0].enabled).toBe(false);
      toggle.click(); fixture.detectChanges();
      expect(component.categories()[0].enabled).toBe(true);
      (fixture.nativeElement.querySelector('[aria-label="Eliminar campo Motivo de consulta"]') as HTMLElement).click();
      fixture.detectChanges();
      expect(component.allFields().some(field => field.key === 'chiefComplaint')).toBe(false);
      const optional = component.categories().find(category => !category.enabled);
      if (optional) {
        component.toggleCategory(optional.key);
        expect(component.categories().find(category => category.key === optional.key)?.enabled).toBe(true);
      }
    });

    it('saves, reopens and finishes a personalized wizard using the existing store contract', async () => {
      let remote: WorkspaceSetup = {
    specialtyContextId: 101,
        id: 20, version: 0, specialty,
        experience: { specialtyId: specialty.id, specialtyVersion: 1, navigation: ['DASHBOARD', 'PATIENTS', 'WIZARD'], patientRecordTabs: ['SUMMARY', 'ENCOUNTERS', 'PRESCRIPTIONS', 'STUDIES'], patientRecordActions: ['EDIT_PATIENT', 'NEW_ENCOUNTER', 'PRINT_DOCUMENT'] },
        sourceWizardVersion: null, draftSourceWizardVersion: 1, onboardingCompleted: false,
        currentStepKey: 'patient:sys_patient_profile', definition: null, draftDefinition: definition(),
      };
      const saveOnboardingDraft = vi.fn(async request => {
        remote = { ...remote, version: remote.version + 1, draftDefinition: structuredClone(request.definition), currentStepKey: request.currentStepKey };
        return structuredClone(remote);
      });
      const finishOnboarding = vi.fn(async () => {
        remote = { ...remote, version: remote.version + 1, definition: remote.draftDefinition, draftDefinition: null, sourceWizardVersion: 1, draftSourceWizardVersion: null, onboardingCompleted: true, currentStepKey: 'completed' };
        return structuredClone(remote);
      });
      const navigate = vi.fn().mockResolvedValue(true);
      await TestBed.configureTestingModule({
        imports: [OnboardingWizardComponent],
        providers: [
          { provide: Router, useValue: { navigate } },
          { provide: WorkspaceStore, useValue: { loadSetup: async () => structuredClone(remote), saveOnboardingDraft, finishOnboarding } },
          { provide: DoctorProfileService, useValue: {} },
          { provide: AuthService, useValue: {} },
        ],
      }).compileComponents();
      let fixture = TestBed.createComponent(OnboardingWizardComponent);
      fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain(specialty.name);
      const form = definition().patientForm;
      const optional = form.categories.find(category => !category.enabled)!;
      optional.enabled = true;
      fixture.componentInstance.onPatientDefinitionChange(form);
      expect(fixture.componentInstance.steps().some(step => step.key === `patient:${optional.key}`)).toBe(true);
      const encounter = definition().encounterForm;
      encounter.categories[0].enabled = false;
      fixture.componentInstance.onEncounterDefinitionChange(encounter);
      await fixture.componentInstance.saveProgress();
      fixture.destroy();
      fixture = TestBed.createComponent(OnboardingWizardComponent);
      fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
      expect(fixture.componentInstance.definition()?.patientForm).toEqual(form);
      expect(fixture.componentInstance.definition()?.encounterForm).toEqual(encounter);
      await fixture.componentInstance.finishOnboarding();
      expect(finishOnboarding).toHaveBeenCalled();
      expect(remote.onboardingCompleted).toBe(true);
      expect(remote.definition?.encounterForm).toEqual(encounter);
      expect(navigate).toHaveBeenCalledWith(['/dashboard']);
    });
  });
}
