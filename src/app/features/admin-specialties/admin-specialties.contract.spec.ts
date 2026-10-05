import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FormFieldEditorComponent } from '../form-field-editor/form-field-editor.component';
import { AdminSpecialtyService } from '../../core/services/admin-specialty.service';
import { AuthService } from '../../core/services/auth.service';
import { authInterceptor } from '../../core/interceptors/auth.interceptor';
import { WizardDefinition } from '../../core/models/wizard-definition.model';
import { SpecialtyDetail, WizardDefaultDetail } from '../../core/models/admin-specialty.model';
import { environment } from '../../../environments/environment';
import { customSpecialtyFixture } from '../onboarding/testing/custom-specialty.fixture';

/** Real shared editor + real HTTP admin adapter; the fictitious specialty is exclusively test data. */
describe('Administrative wizard editor and HTTP contract', () => {
  let fixture: ComponentFixture<FormFieldEditorComponent>;
  let editor: FormFieldEditorComponent;
  let service: AdminSpecialtyService;
  let http: HttpTestingController;
  const base = `${environment.apiUrl}/admin/specialties`;
  const specialty: SpecialtyDetail = { id: 71, code: 'contract_test_xyz', name: 'Especialidad ficticia', description: null, active: true, version: 5 };
  let definition: WizardDefinition;
  let wizard: WizardDefaultDetail;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldEditorComponent],
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])), provideHttpClientTesting(),
        { provide: AuthService, useValue: { getAccessToken: () => 'isolated-test-bearer' } },
      ],
    }).compileComponents();
    service = TestBed.inject(AdminSpecialtyService);
    http = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(FormFieldEditorComponent);
    editor = fixture.componentInstance;
    definition = structuredClone(customSpecialtyFixture.definition);
    wizard = { specialtyId: specialty.id, version: 17, publishedVersion: 4,
      draftDefinition: structuredClone(definition), publishedDefinition: structuredClone(definition) };
  });

  afterEach(() => {
    http.expectNone(request => request.url.includes('/workspace') || request.url.includes('/templates'));
    http.verify();
  });

  function loadEditor(section: 'patientForm' | 'encounterForm'): void {
    fixture.componentRef.setInput('definition', definition[section]);
    fixture.componentRef.setInput('section', section);
    editor.definitionChange.subscribe(form => { definition = { ...definition, [section]: form }; });
    fixture.detectChanges();
  }

  it('allows an empty administrative wizard to be incrementally authored and created without doctor onboarding', () => {
    definition = { schemaVersion: 1, patientForm: { categories: [] }, encounterForm: { categories: [] },
      modulesConfig: { MEDICATION_CATALOG: false, AI_ASSISTANT: false, GROWTH_CHARTS: false } };
    loadEditor('patientForm');
    editor.newCategoryTitle.set('Categoría inédita'); editor.addCategory();
    const key = editor.categories()[0].key;
    editor.openField(key); editor.updateDraft({ label: 'Nombre completo', required: true }); editor.setBinding('patient.fullName'); editor.saveField();
    expect(editor.error()).toBeNull();
    // This is deliberately incomplete: server permits a draft, then checks birthDate at publication.
    expect(definition.patientForm.categories[0].fields).toHaveLength(1);
    let result: SpecialtyDetail | undefined;
    service.createSpecialty({ code: 'new_test_xyz', name: 'Otra especialidad inédita', description: null, definition }).subscribe(value => result = value);
    const request = http.expectOne(base);
    expect(request.request.method).toBe('POST');
    expect(Object.keys(request.request.body).sort()).toEqual(['code', 'definition', 'description', 'name']);
    expect(request.request.body.definition).toEqual(definition);
    expect(request.request.body.definition.encounterForm).toEqual({ categories: [] });
    expect(request.request.body.definition.modulesConfig).toEqual({ MEDICATION_CATALOG: false, AI_ASSISTANT: false, GROWTH_CHARTS: false });
    expect(request.request.headers.get('Authorization')).toBe('Bearer isolated-test-bearer');
    expect(request.request.headers.has('X-Gateway-Secret')).toBe(false);
    expect(request.request.headers.has('X-User-Id')).toBe(false);
    request.flush({ ...specialty, code: 'new_test_xyz', active: false, version: 0 });
    expect(result?.active).toBe(false);
  });

  it('sends canonical editor output with the wizard version while retaining its published default', () => {
    loadEditor('encounterForm');
    editor.openField('new_encounter_category', 'result'); editor.setFormulaKind('TFGE');
    editor.setOperand('creatinineMgDl', 'field:readingA'); editor.setOperand('ageYears', 'context:patient.ageYears'); editor.setOperand('gender', 'context:patient.gender'); editor.saveField();
    expect(editor.error()).toBeNull();
    const previousPublished = structuredClone(wizard.publishedDefinition);
    service.saveWizardDraft(specialty.id, { expectedVersion: wizard.version, definition }).subscribe(value => wizard = value);
    const request = http.expectOne(`${base}/${specialty.id}/wizard/draft`);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual({ expectedVersion: 17, definition });
    expect(request.request.body.definition.encounterForm.categories[0].fields.find((field: { key: string }) => field.key === 'result').formula).toEqual({
      kind: 'TFGE', inputs: { creatinineMgDl: { fieldKey: 'readingA' }, ageYears: { context: 'patient.ageYears' }, gender: { context: 'patient.gender' } },
    });
    request.flush({ ...wizard, version: 18, draftDefinition: definition });
    expect(wizard.version).toBe(18);
    expect(wizard.publishedVersion).toBe(4);
    expect(wizard.publishedDefinition).toEqual(previousPublished);
    expect(customSpecialtyFixture.definition.encounterForm.categories[0].fields[2].formula?.kind).toBe('CUSTOM');
  });

  it('keeps metadata, optimistic wizard version and publication version separate on the wire', () => {
    service.updateSpecialty(specialty.id, { expectedVersion: specialty.version, name: 'Nombre editado', description: null }).subscribe();
    const metadata = http.expectOne(`${base}/${specialty.id}`);
    expect(metadata.request.method).toBe('PATCH');
    expect(metadata.request.body).toEqual({ expectedVersion: 5, name: 'Nombre editado', description: null });
    metadata.flush({ ...specialty, name: 'Nombre editado', version: 6 });
    service.publishWizard(specialty.id, wizard.version).subscribe(value => wizard = value);
    const publish = http.expectOne(`${base}/${specialty.id}/wizard/publish`);
    expect(publish.request.method).toBe('POST');
    expect(publish.request.body).toEqual({ expectedVersion: 17 });
    publish.flush({ ...wizard, version: 18, publishedVersion: 5 });
    service.getSpecialties().subscribe();
    const refreshedMetadata = http.expectOne(base);
    expect(refreshedMetadata.request.method).toBe('GET');
    refreshedMetadata.flush([{ ...specialty, version: 7 }]);
    expect(wizard.version).toBe(18);
    expect(wizard.publishedVersion).toBe(5);
    expect(specialty.version).toBe(5);
  });

  it('propagates backend field errors and version conflicts without altering local editor content', () => {
    loadEditor('patientForm'); editor.renameCategory('new_patient_category', 'Cambios sin guardar');
    const local = structuredClone(definition);
    const failure = { code: 'INVALID_WIZARD_DEFINITION', message: 'La configuración contiene campos inválidos.',
      errors: [{ path: '/patientForm/categories/0/fields/0/binding', code: 'MISSING_PATIENT_CORE' }] };
    let received: unknown;
    service.publishWizard(specialty.id, wizard.version).subscribe({ error: error => received = error.error });
    http.expectOne(`${base}/${specialty.id}/wizard/publish`).flush(failure, { status: 400, statusText: 'Bad Request' });
    expect(received).toEqual(failure);
    expect(definition).toEqual(local);
    const conflict = { code: 'VERSION_CONFLICT', message: 'Recargá antes de guardar.', errors: [] };
    service.saveWizardDraft(specialty.id, { expectedVersion: wizard.version, definition }).subscribe({ error: error => received = error.error });
    http.expectOne(`${base}/${specialty.id}/wizard/draft`).flush(conflict, { status: 409, statusText: 'Conflict' });
    expect(received).toEqual(conflict);
    expect(editor.working()).toEqual(local.patientForm);
    expect(wizard.version).toBe(17);
  });
});
