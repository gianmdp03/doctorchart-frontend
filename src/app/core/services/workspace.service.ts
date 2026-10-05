import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  QuickNotesUpdateRequest, SaveOnboardingDraftRequest, SelectSpecialtyRequest,
  VersionRequest, WorkspacePreferences, WorkspaceSetup, WorkspaceUpdateRequest,
} from '../models/workspace.model';

@Injectable({ providedIn: 'root' })
export class WorkspaceService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  getCurrentSetup(): Observable<WorkspaceSetup | null> {
    return this.http.get<WorkspaceSetup | null>(`${this.baseUrl}/workspace`);
  }
  selectSpecialty(payload: SelectSpecialtyRequest): Observable<WorkspaceSetup> {
    return this.http.put<WorkspaceSetup>(`${this.baseUrl}/workspace/specialty`, payload);
  }
  finishOnboarding(payload: VersionRequest): Observable<WorkspaceSetup> {
    return this.http.post<WorkspaceSetup>(`${this.baseUrl}/workspace/finish-onboarding`, payload);
  }
  saveOnboardingDraft(payload: SaveOnboardingDraftRequest): Observable<WorkspaceSetup> {
    return this.http.put<WorkspaceSetup>(`${this.baseUrl}/workspace/wizard/draft`, payload);
  }
  discardDraft(payload: VersionRequest): Observable<WorkspaceSetup> {
    return this.http.post<WorkspaceSetup>(`${this.baseUrl}/workspace/wizard/discard-draft`, payload);
  }
  resetToDefaults(payload: VersionRequest): Observable<WorkspaceSetup> {
    return this.http.post<WorkspaceSetup>(`${this.baseUrl}/workspace/reset-to-defaults`, payload);
  }
  getPreferences(): Observable<WorkspacePreferences> {
    return this.http.get<WorkspacePreferences>(`${this.baseUrl}/workspace/preferences`);
  }
  updateQuickNotes(payload: QuickNotesUpdateRequest): Observable<WorkspacePreferences> {
    return this.http.put<WorkspacePreferences>(`${this.baseUrl}/workspace/quick-notes`, payload);
  }
  updateWorkspace(payload: WorkspaceUpdateRequest): Observable<WorkspacePreferences> {
    return this.http.put<WorkspacePreferences>(`${this.baseUrl}/workspace/preferences`, payload);
  }
}
