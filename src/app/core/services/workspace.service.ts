import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ChartDefinition,
  DoctorChartConfig,
  FinishOnboardingRequest,
  FormTemplate,
  WorkspaceSetup,
  WorkspaceUpdateRequest,
} from '../models/workspace.model';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getCurrentSetup(): Observable<WorkspaceSetup> {
    return this.http.get<WorkspaceSetup>(`${this.baseUrl}/workspace/current-setup`);
  }

  finishOnboarding(payload: FinishOnboardingRequest): Observable<WorkspaceSetup> {
    return this.http.post<WorkspaceSetup>(`${this.baseUrl}/workspace/finish-onboarding`, payload);
  }

  updateWorkspace(payload: WorkspaceUpdateRequest): Observable<WorkspaceSetup> {
    return this.http.put<WorkspaceSetup>(`${this.baseUrl}/workspace`, payload);
  }

  getTemplates(specialtyId?: number): Observable<FormTemplate[]> {
    const url = specialtyId
      ? `${this.baseUrl}/templates?specialtyId=${specialtyId}`
      : `${this.baseUrl}/templates`;
    return this.http.get<FormTemplate[]>(url);
  }

  getTemplateById(id: number): Observable<FormTemplate> {
    return this.http.get<FormTemplate>(`${this.baseUrl}/templates/${id}`);
  }

  createTemplate(template: Partial<FormTemplate>): Observable<FormTemplate> {
    return this.http.post<FormTemplate>(`${this.baseUrl}/templates`, template);
  }

  updateTemplate(id: number, template: Partial<FormTemplate>): Observable<FormTemplate> {
    return this.http.put<FormTemplate>(`${this.baseUrl}/templates/${id}`, template);
  }

  deleteTemplate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/templates/${id}`);
  }

  duplicateTemplate(id: number): Observable<FormTemplate> {
    return this.http.post<FormTemplate>(`${this.baseUrl}/templates/${id}/duplicate`, {});
  }

  getChartsCatalog(): Observable<ChartDefinition[]> {
    return this.http.get<ChartDefinition[]>(`${this.baseUrl}/charts`);
  }

  getDoctorChartConfigs(): Observable<DoctorChartConfig[]> {
    return this.http.get<DoctorChartConfig[]>(`${this.baseUrl}/workspace/charts`);
  }

  saveDoctorChartConfigs(configs: DoctorChartConfig[]): Observable<DoctorChartConfig[]> {
    return this.http.put<DoctorChartConfig[]>(`${this.baseUrl}/workspace/charts`, configs);
  }
}
