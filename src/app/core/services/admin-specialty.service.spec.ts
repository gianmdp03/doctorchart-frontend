import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AdminSpecialtyService } from './admin-specialty.service';
import { WizardDefinition } from '../models/wizard-definition.model';
import { environment } from '../../../environments/environment';

describe('AdminSpecialtyService HTTP contract', () => {
  let service: AdminSpecialtyService;
  let http: HttpTestingController;
  const base = environment.apiUrl + '/admin/specialties';
  const incompleteDraft: WizardDefinition = {
    schemaVersion: 1, patientForm: { categories: [] }, encounterForm: { categories: [] },
    modulesConfig: { MEDICATION_CATALOG: false, AI_ASSISTANT: false, GROWTH_CHARTS: false },
  };
  const detail = { id: 10, code: 'new_xyz', name: 'Nueva', description: null, active: false, version: 3 };
  const wizard = { specialtyId: 10, version: 8, publishedVersion: 2, draftDefinition: incompleteDraft, publishedDefinition: null };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(AdminSpecialtyService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('reads the complete admin catalog including inactive drafts', () => {
    service.getSpecialties().subscribe(result => expect(result).toEqual([detail]));
    const request = http.expectOne(base);
    expect(request.request.method).toBe('GET');
    request.flush([detail]);
  });

  it('creates a draft with exactly code name nullable description and canonical definition', () => {
    const body = { code: 'new_xyz', name: 'Nueva', description: null, definition: incompleteDraft };
    service.createSpecialty(body).subscribe(result => expect(result).toEqual(detail));
    const request = http.expectOne(base);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(body);
    expect(request.request.body).not.toHaveProperty('owner');
    expect(request.request.body).not.toHaveProperty('userId');
    expect(request.request.body).not.toHaveProperty('isSystem');
    request.flush(detail);
  });

  it('omitted description stays omitted on create instead of synthesizing an alias', () => {
    const body = { code: 'new_xyz', name: 'Nueva', definition: incompleteDraft };
    service.createSpecialty(body).subscribe();
    const request = http.expectOne(base);
    expect(request.request.body).toEqual(body);
    expect(request.request.body).not.toHaveProperty('description');
    expect(request.request.body).not.toHaveProperty('displayName');
    request.flush(detail);
  });

  it('patches metadata with the specialty resource version and preserves explicit null', () => {
    const body = { expectedVersion: 3, name: 'Corregida', description: null };
    service.updateSpecialty(10, body).subscribe();
    const request = http.expectOne(base + '/10');
    expect(request.request.method).toBe('PATCH');
    expect(request.request.body).toEqual(body);
    expect(request.request.body).not.toHaveProperty('code');
    request.flush({ ...detail, name: 'Corregida', version: 4 });
  });

  it('updates availability through PATCH without an unrelated metadata or wizard write', () => {
    service.updateSpecialty(10, { expectedVersion: 3, active: false }).subscribe();
    const request = http.expectOne(base + '/10');
    expect(request.request.method).toBe('PATCH');
    expect(request.request.body).toEqual({ expectedVersion: 3, active: false });
    request.flush(detail);
  });

  it('reads the administrative wizard with separate current and published versions', () => {
    service.getWizard(10).subscribe(result => {
      expect(result.version).toBe(8);
      expect(result.publishedVersion).toBe(2);
      expect(result.publishedDefinition).toBeNull();
    });
    const request = http.expectOne(base + '/10/wizard');
    expect(request.request.method).toBe('GET');
    request.flush(wizard);
  });

  it('saves only the wizard draft using its own concurrency token', () => {
    const body = { expectedVersion: 8, definition: incompleteDraft };
    service.saveWizardDraft(10, body).subscribe();
    const request = http.expectOne(base + '/10/wizard/draft');
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(body);
    request.flush({ ...wizard, version: 9 });
  });

  it('publishes only the expected wizard version and does not send a definition or publication number', () => {
    service.publishWizard(10, 8).subscribe();
    const request = http.expectOne(base + '/10/wizard/publish');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ expectedVersion: 8 });
    expect(request.request.body).not.toHaveProperty('definition');
    expect(request.request.body).not.toHaveProperty('publishedVersion');
    request.flush({ ...wizard, version: 9, publishedVersion: 3 });
  });

  it('propagates server validation and version failures without retrying or guessing new versions', () => {
    const rejected = vi.fn();
    service.publishWizard(10, 8).subscribe({ error: rejected });
    http.expectOne(base + '/10/wizard/publish').flush({
      code: 'VERSION_CONFLICT', message: 'Recargá antes de publicar.', errors: [],
    }, { status: 409, statusText: 'Conflict' });
    expect(rejected).toHaveBeenCalledOnce();
    expect(rejected.mock.calls[0][0].error.code).toBe('VERSION_CONFLICT');
    http.expectNone(base + '/10/wizard/publish');
  });
});
