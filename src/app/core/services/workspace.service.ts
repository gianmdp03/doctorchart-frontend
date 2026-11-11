import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  QuickNotesUpdateRequest, SaveOnboardingDraftRequest, SelectSpecialtyRequest,
  ContextVersionRequest, WorkspacePreferences, WorkspaceSetup, WorkspaceUpdateRequest,
  SpecialtyContextSummary,
} from '../models/workspace.model';

@Injectable({ providedIn: 'root' })
export class WorkspaceService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  getContexts(){return this.http.get<SpecialtyContextSummary[]>(`${this.baseUrl}/workspace/contexts`);}
  addContext(specialtyId:number){return this.http.post<WorkspaceSetup>(`${this.baseUrl}/workspace/contexts`,{specialtyId});}
  getCurrentSetup(contextId?:number): Observable<WorkspaceSetup | null> {
    return this.http.get<WorkspaceSetup | null>(`${this.baseUrl}/workspace`,{params:contextId?{specialtyContextId:String(contextId)}:{}});
  }
  selectSpecialty(payload: SelectSpecialtyRequest): Observable<WorkspaceSetup> {
    return this.http.put<WorkspaceSetup>(`${this.baseUrl}/workspace/specialty`, payload);
  }
  finishOnboarding(payload: ContextVersionRequest): Observable<WorkspaceSetup> {
    return this.http.post<WorkspaceSetup>(`${this.baseUrl}/workspace/finish-onboarding`, payload);
  }
  saveOnboardingDraft(payload: SaveOnboardingDraftRequest): Observable<WorkspaceSetup> {
    return this.http.put<WorkspaceSetup>(`${this.baseUrl}/workspace/wizard/draft`, payload);
  }
  discardDraft(payload: ContextVersionRequest): Observable<WorkspaceSetup> {
    return this.http.post<WorkspaceSetup>(`${this.baseUrl}/workspace/wizard/discard-draft`, payload);
  }
  resetToDefaults(payload: ContextVersionRequest): Observable<WorkspaceSetup> {
    return this.http.post<WorkspaceSetup>(`${this.baseUrl}/workspace/reset-to-defaults`, payload);
  }
  getPreferences(contextId?:number): Observable<WorkspacePreferences> {
    return this.http.get<WorkspacePreferences>(`${this.baseUrl}/workspace/preferences`,{params:contextId?{specialtyContextId:String(contextId)}:{}});
  }
  updateQuickNotes(payload: QuickNotesUpdateRequest,contextId?:number): Observable<WorkspacePreferences> {
    return this.http.put<WorkspacePreferences>(`${this.baseUrl}/workspace/quick-notes`, payload,{params:contextId?{specialtyContextId:String(contextId)}:{}});
  }
  updateWorkspace(payload: WorkspaceUpdateRequest,contextId?:number): Observable<WorkspacePreferences> {
    return this.http.put<WorkspacePreferences>(`${this.baseUrl}/workspace/preferences`, payload,{params:contextId?{specialtyContextId:String(contextId)}:{}});
  }
}
