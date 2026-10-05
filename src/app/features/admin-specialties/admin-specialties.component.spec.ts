import { beforeEach, describe, expect, it, vi } from 'vitest';
import { computed, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { AdminSpecialtiesComponent } from './admin-specialties.component';
import { AdminSpecialtyService } from '../../core/services/admin-specialty.service';
import { AuthService } from '../../core/services/auth.service';
import { SpecialtyDetail, WizardDefaultDetail } from '../../core/models/admin-specialty.model';
import { createDefaultWizardDefinition, WizardDefinition } from '../../core/models/wizard-definition.model';
import { FormFieldEditorComponent } from '../form-field-editor/form-field-editor.component';
import { customSpecialtyFixture } from '../onboarding/testing/custom-specialty.fixture';

describe('AdminSpecialtiesComponent', () => {
  let fixture: ComponentFixture<AdminSpecialtiesComponent>;
  let component: AdminSpecialtiesComponent;
  let metadata: SpecialtyDetail;
  let saved: WizardDefaultDetail;
  let service: { getSpecialties: ReturnType<typeof vi.fn>; createSpecialty: ReturnType<typeof vi.fn>; updateSpecialty: ReturnType<typeof vi.fn>; getWizard: ReturnType<typeof vi.fn>; saveWizardDraft: ReturnType<typeof vi.fn>; publishWizard: ReturnType<typeof vi.fn> };
  const user = signal<{ id: string; app_metadata: { role: string } } | null>(null);
  const clone = <T>(value: T): T => structuredClone(value);
  const initial: SpecialtyDetail = { id: 81, code: customSpecialtyFixture.code, name: customSpecialtyFixture.name, description: null, active: false, version: 5 };
  const initialWizard: WizardDefaultDetail = { specialtyId: 81, version: 12, publishedVersion: 0, draftDefinition: clone(customSpecialtyFixture.definition), publishedDefinition: null };

  beforeEach(async () => {
    user.set({ id: 'admin-one', app_metadata: { role: 'SUPER_ADMIN' } });
    metadata = clone(initial); saved = clone(initialWizard);
    service = {
      getSpecialties: vi.fn().mockImplementation(() => of([clone(metadata)])),
      getWizard: vi.fn().mockImplementation(() => of(clone(saved))),
      createSpecialty: vi.fn().mockImplementation(request => {
        metadata = { id: 91, code: request.code, name: request.name, description: request.description, version: 0, active: false };
        saved = { specialtyId: 91, version: 0, publishedVersion: 0, publishedDefinition: null, draftDefinition: clone(request.definition) };
        return of(clone(metadata));
      }),
      updateSpecialty: vi.fn().mockImplementation((_id, request) => { metadata = { ...metadata, ...request, version: metadata.version + 1 }; return of(clone(metadata)); }),
      saveWizardDraft: vi.fn().mockImplementation((_id, request) => { saved = { ...saved, version: saved.version + 1, draftDefinition: clone(request.definition) }; return of(clone(saved)); }),
      publishWizard: vi.fn().mockImplementation(() => {
        saved = { ...saved, version: saved.version + 1, publishedVersion: saved.publishedVersion + 1, publishedDefinition: clone(saved.draftDefinition) };
        metadata = { ...metadata, version: metadata.version + 1, active: true }; return of(clone(saved));
      }),
    };
    await TestBed.configureTestingModule({ imports: [AdminSpecialtiesComponent], providers: [
      { provide: AdminSpecialtyService, useValue: service },
      { provide: AuthService, useValue: { currentUser: user, isSuperAdmin: computed(() => user()?.app_metadata.role === 'SUPER_ADMIN') } },
    ] }).compileComponents();
    fixture = TestBed.createComponent(AdminSpecialtiesComponent); component = fixture.componentInstance;
    fixture.detectChanges(); await vi.waitFor(() => expect(component.busy()).toBe(false)); fixture.detectChanges();
  });
  async function select(): Promise<void> { component.requestSelect(81); await vi.waitFor(() => expect(component.busy()).toBe(false)); fixture.detectChanges(); }
  function changeDefinition(title = 'Cambios locales'): WizardDefinition {
    const definition = clone(component.definition()!); definition.patientForm.categories[0].title = title;
    component.onDefinitionChange('patientForm', definition.patientForm); return definition;
  }

  it('lists inactive drafts and opens the canonical wizard without a physician workspace', async () => {
    expect(fixture.nativeElement.textContent).toContain(initial.name);
    expect(fixture.nativeElement.textContent).toContain('Inactiva / borrador');
    await select();
    expect(service.getWizard).toHaveBeenCalledWith(81);
    expect(component.wizard()?.version).toBe(12);
    expect(component.selectedSpecialty()?.version).toBe(5);
    expect(fixture.debugElement.queryAll(By.directive(FormFieldEditorComponent))).toHaveLength(2);
  });

  it('creates an inactive draft with system patient profile defaults and suggested editable code', async () => {
    component.requestCreate(); fixture.detectChanges();
    expect(component.name()).toBe('');
    expect(component.definition()).toEqual(createDefaultWizardDefinition());
    expect(component.definition()?.patientForm.categories[0].key).toBe('sys_patient_profile');
    expect(component.definition()?.patientForm.categories[0].system).toBe(true);
    expect(component.definition()?.patientForm.categories[0].fields).toHaveLength(8);
    component.updateName('Especialidad Inédita'); expect(component.code()).toBe('especialidad-inedita');
    component.updateCode('custom_identity'); component.updateName('Nombre editado');
    expect(component.code()).toBe('custom_identity');
    await component.createSpecialty(); fixture.detectChanges();
    expect(service.createSpecialty).toHaveBeenCalledWith({
      code: 'custom_identity',
      name: 'Nombre editado',
      description: null,
      definition: expect.objectContaining({
        patientForm: expect.objectContaining({
          categories: expect.arrayContaining([expect.objectContaining({ key: 'sys_patient_profile', system: true })]),
        }),
      }),
    });
    expect(service.getWizard).toHaveBeenLastCalledWith(91);
    expect(component.selectedSpecialty()?.active).toBe(false);
    expect(component.creating()).toBe(false);
    component.updateCode('forbidden_change'); expect(component.code()).toBe('custom_identity');
  });

  it('retries a wizard load after successful creation without repeating the POST', async () => {
    component.requestCreate(); component.updateName('Nueva especialidad');
    service.getWizard.mockReturnValueOnce(throwError(() => ({ status: 503 })));
    await component.createSpecialty(); fixture.detectChanges();
    expect(component.creating()).toBe(false); expect(component.wizard()).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Volver a cargar el wizard');
    await component.reloadWizard();
    expect(service.createSpecialty).toHaveBeenCalledTimes(1);
    expect(component.wizard()?.specialtyId).toBe(91);
  });

  it('saves wizard and metadata with their independent pinned versions', async () => {
    await select(); const local = changeDefinition();
    component.setCapability('AI_ASSISTANT', true); local.modulesConfig.AI_ASSISTANT = true;
    await component.saveDraft();
    expect(service.saveWizardDraft).toHaveBeenCalledWith(81, { expectedVersion: 12, definition: local });
    expect(component.wizard()?.publishedDefinition).toBeNull();
    component.updateName('Nombre personalizado'); await component.saveMetadata();
    expect(service.updateSpecialty).toHaveBeenCalledWith(81, { expectedVersion: 5, name: 'Nombre personalizado', description: null });
    expect(service.publishWizard).not.toHaveBeenCalled();
  });

  it('explicit publication saves first, uses the returned wizard revision and refreshes metadata without losing local edits', async () => {
    await select(); component.updateName('Nombre todavía local');
    await component.publishWizard();
    expect(service.saveWizardDraft).toHaveBeenCalledWith(81, expect.objectContaining({ expectedVersion: 12 }));
    expect(service.publishWizard).toHaveBeenCalledWith(81, 13);
    expect(component.wizard()?.publishedVersion).toBe(1);
    expect(component.selectedSpecialty()?.version).toBe(6);
    expect(component.name()).toBe('Nombre todavía local');
    await component.saveMetadata();
    expect(service.updateSpecialty).toHaveBeenCalledWith(81, expect.objectContaining({ expectedVersion: 6, name: 'Nombre todavía local' }));
  });

  it('blocks writes after publishing when metadata refresh fails until an explicit successful reload', async () => {
    await select(); component.updateName('Nombre pendiente');
    service.getSpecialties.mockReturnValueOnce(throwError(() => ({ status: 503 })));
    await component.publishWizard();
    expect(component.metadataStale()).toBe(true); expect(component.wizard()?.publishedVersion).toBe(1);
    await component.saveMetadata(); expect(service.updateSpecialty).not.toHaveBeenCalled();
    await component.refreshCatalog();
    expect(component.metadataStale()).toBe(false); expect(component.selectedSpecialty()?.version).toBe(6);
    expect(component.name()).toBe('Nombre pendiente');
    await component.saveMetadata(); expect(service.updateSpecialty).toHaveBeenCalledWith(81, expect.objectContaining({ expectedVersion: 6 }));
  });

  it('detects another admin changing metadata around publication instead of adopting a token that would overwrite it', async () => {
    await select(); component.updateName('Mi nombre local');
    service.publishWizard.mockImplementation(() => {
      saved = { ...saved, version: 14, publishedVersion: 1, publishedDefinition: clone(saved.draftDefinition) };
      metadata = { ...metadata, version: 7, name: 'Nombre de otro administrador', active: true }; return of(clone(saved));
    });
    await component.publishWizard();
    expect(component.hasConflict()).toBe(true); expect(component.selectedSpecialty()?.version).toBe(5);
    expect(component.name()).toBe('Mi nombre local');
    await component.saveMetadata(); expect(service.updateSpecialty).not.toHaveBeenCalled();
    await component.reviewRemote();
    expect(component.name()).toBe('Mi nombre local'); expect(component.remoteCopy()?.specialty.version).toBe(7);
    component.useRemote(); expect(component.name()).toBe('Nombre de otro administrador'); expect(component.hasConflict()).toBe(false);
  });

  it('keeps both local metadata and fields after a version conflict until an explicit server replacement', async () => {
    await select(); const local = changeDefinition(); component.description.set('Descripción sin guardar');
    service.saveWizardDraft.mockReturnValueOnce(throwError(() => ({ status: 409, error: { code: 'VERSION_CONFLICT', message: 'La versión cambió.' } })));
    await component.saveDraft(); expect(component.hasConflict()).toBe(true);
    expect(component.definition()).toEqual(local); expect(component.wizard()?.version).toBe(12);
    metadata = { ...metadata, version: 8, description: 'Descripción del servidor' }; saved = { ...saved, version: 19 };
    await component.reviewRemote(); expect(component.description()).toBe('Descripción sin guardar');
    expect(component.selectedSpecialty()?.version).toBe(5);
    await component.saveDraft(); expect(service.saveWizardDraft).toHaveBeenCalledTimes(1);
    component.useRemote(); expect(component.description()).toBe('Descripción del servidor'); expect(component.wizard()?.version).toBe(19);
  });

  it('preserves content when opening another wizard fails and confirms before abandoning dirty edits', async () => {
    await select(); changeDefinition();
    component.specialties.update(list => [...list, { ...initial, id: 82, name: 'Otra especialidad' }]);
    component.requestSelect(82); expect(component.pendingSelection()).toEqual({ kind: 'select', id: 82 });
    expect(service.getWizard).toHaveBeenCalledTimes(1);
    service.getWizard.mockReturnValueOnce(throwError(() => ({ status: 503 })));
    await component.confirmSelection();
    expect(component.selectedSpecialty()?.id).toBe(81);
    expect(component.definition()?.patientForm.categories[0].title).toBe('Cambios locales');
    expect(component.canEditExisting()).toBe(true);
  });

  it('recognizes an uncommitted editor field and asks before replacing the screen', async () => {
    await select(); const editor = fixture.debugElement.queryAll(By.directive(FormFieldEditorComponent))[0].componentInstance as FormFieldEditorComponent;
    editor.openField('new_patient_category'); editor.updateDraft({ label: 'Campo sin aplicar' });
    component.requestCreate();
    expect(component.pendingSelection()).toEqual({ kind: 'create' });
    expect(component.selectedSpecialty()?.id).toBe(81);
    await component.saveDraft(); expect(service.saveWizardDraft).not.toHaveBeenCalled();
    await component.confirmSelection(); fixture.detectChanges();
    expect(component.creating()).toBe(true);
    expect(component.pendingEditor()).toBe(false);
  });

  it('renders publication validation paths as human category and field labels', async () => {
    await select();
    service.publishWizard.mockReturnValueOnce(throwError(() => ({ status: 400, error: { code: 'INVALID_WIZARD_DEFINITION', message: 'Revisá la ficha.', errors: [{ path: '/patientForm', code: 'MISSING_PATIENT_CORE' }] } })));
    await component.publishWizard(); fixture.detectChanges();
    expect(component.validationIssues()).toEqual([{ path: '/patientForm', code: 'MISSING_PATIENT_CORE' }]);
    expect(fixture.nativeElement.textContent).toContain('Ficha del paciente: Agregá nombre y fecha de nacimiento');
    expect(fixture.nativeElement.textContent).not.toContain('(/patientForm)');
    expect(component.hasConflict()).toBe(false); expect(component.wizard()?.version).toBe(13);
  });

  it('shows availability domain errors without locking edits as a version conflict', async () => {
    await select();
    component.selectedSpecialty.update(current => current ? { ...current, active: true } : current);
    service.updateSpecialty.mockReturnValueOnce(throwError(() => ({ status: 409, error: { code: 'LAST_ACTIVE_SPECIALTY', message: 'Debe quedar una especialidad disponible.' } })));
    await component.toggleActive();
    expect(component.error()).toBe('Debe quedar una especialidad disponible.'); expect(component.hasConflict()).toBe(false);
    expect(service.updateSpecialty).toHaveBeenCalledWith(81, { expectedVersion: 5, active: false });
  });

  it('distinguishes access denial from an empty catalog and clears content on identity or role changes', async () => {
    await select();
    service.getSpecialties.mockReturnValueOnce(throwError(() => ({ status: 403 })));
    await component.refreshCatalog(); fixture.detectChanges();
    expect(component.accessDenied()).toBe(true); expect(fixture.nativeElement.textContent).toContain('Acceso restringido');
    expect(fixture.nativeElement.textContent).not.toContain('No hay especialidades');
    user.set({ id: 'admin-one', app_metadata: { role: 'DOCTOR' } }); fixture.detectChanges();
    expect(component.selectedSpecialty()).toBeNull(); expect(component.definition()).toBeNull();
    user.set({ id: 'admin-two', app_metadata: { role: 'SUPER_ADMIN' } }); fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
    expect(component.accessDenied()).toBe(false); expect(component.selectedSpecialty()).toBeNull();
  });

  it('ignores late responses after identity changes and after destruction', async () => {
    const response = new Subject<WizardDefaultDetail>(); service.getWizard.mockReturnValueOnce(response);
    component.requestSelect(81); expect(component.busy()).toBe(true);
    user.set({ id: 'admin-two', app_metadata: { role: 'SUPER_ADMIN' } }); fixture.detectChanges(); await fixture.whenStable();
    response.next(clone(saved)); response.complete(); await fixture.whenStable();
    expect(component.selectedSpecialty()).toBeNull();
    const late = new Subject<WizardDefaultDetail>(); service.getWizard.mockReturnValueOnce(late);
    component.requestSelect(81); fixture.destroy(); late.next(clone(saved)); late.complete();
    await Promise.resolve(); expect(component.selectedSpecialty()).toBeNull();
  });

  it('blocks read and write actions immediately when identity changes before the cleanup effect runs', async () => {
    await select(); component.remoteCopy.set({ specialty: clone(metadata), wizard: clone(saved) });
    user.set({ id: 'admin-one', app_metadata: { role: 'DOCTOR' } });
    component.requestSelect(99); await component.reviewRemote(); component.useRemote(); await component.saveDraft();
    expect(service.getWizard).toHaveBeenCalledTimes(1);
    expect(service.saveWizardDraft).not.toHaveBeenCalled();
    fixture.detectChanges(); expect(component.definition()).toBeNull();
  });

  it('does not send the previous administrator draft after switching to another admin before cleanup', async () => {
    await select(); changeDefinition();
    user.set({ id: 'admin-two', app_metadata: { role: 'SUPER_ADMIN' } });
    await component.saveDraft();
    await component.saveMetadata();
    await component.publishWizard();
    expect(service.saveWizardDraft).not.toHaveBeenCalled();
    expect(service.updateSpecialty).not.toHaveBeenCalled();
    expect(service.publishWizard).not.toHaveBeenCalled();
    fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
    expect(component.definition()).toBeNull();
    expect(component.readonly()).toBe(false);
  });
});
