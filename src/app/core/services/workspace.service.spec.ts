import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { WorkspaceService } from './workspace.service';
import { environment } from '../../../environments/environment';

describe('WorkspaceService HTTP contract', () => {
  let service: WorkspaceService;
  let http: HttpTestingController;
  const base = environment.apiUrl + '/workspace';
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(WorkspaceService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('reads nullable workspace and preferences from separate endpoints', () => {
    service.getCurrentSetup().subscribe(value => expect(value).toBeNull());
    http.expectOne(base).flush(null);
    service.getPreferences().subscribe(value => expect(value.version).toBe(2));
    http.expectOne(base + '/preferences').flush({ version: 2, patientColumnsConfig: {}, quickNotes: null });
  });

  it('selection sends exactly a numeric id and nullable expected version', () => {
    service.selectSpecialty({ specialtyId: 10, expectedVersion: null }).subscribe();
    const request = http.expectOne(base + '/specialty');
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual({ specialtyId: 10, expectedVersion: null });
    request.flush({});
  });

  it('finish reset and discard use explicit optimistic versions', () => {
    for (const [path, operation] of [
      ['/finish-onboarding', () => service.finishOnboarding({ expectedVersion: 4 })],
      ['/reset-to-defaults', () => service.resetToDefaults({ expectedVersion: 4 })],
      ['/wizard/discard-draft', () => service.discardDraft({ expectedVersion: 4 })],
    ] as const) {
      operation().subscribe();
      const request = http.expectOne(base + path);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual({ expectedVersion: 4 });
      request.flush({});
    }
  });

  it('preference writes send column version separately from notes', () => {
    service.updateWorkspace({ expectedVersion: 3, patientColumnsConfig: { phone: true } }).subscribe();
    const preferences = http.expectOne(base + '/preferences');
    expect(preferences.request.body).toEqual({ expectedVersion: 3, patientColumnsConfig: { phone: true } });
    preferences.flush({});
    service.updateQuickNotes({ content: null }).subscribe();
    const notes = http.expectOne(base + '/quick-notes');
    expect(notes.request.body).toEqual({ content: null });
    notes.flush({});
  });
});
