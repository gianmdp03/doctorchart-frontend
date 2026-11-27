import {
  HttpBackend,
  HttpErrorResponse,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, from, of, throwError } from 'rxjs';
import { PagedResponse } from '../app/core/models/api-response.model';
import {
  ClinicalEncounterDashboard,
  ClinicalEncounterDetail,
  ClinicalEncounterList,
  ClinicalEncounterRequest,
  ClinicalEncounterUpdateRequest,
  UpcomingFollowUp,
} from '../app/core/models/clinical-encounter.model';
import { ClinicalPrintDocument } from '../app/core/models/clinical-print-document.model';
import { PatientRevisions } from '../app/core/models/clinical-revision.model';
import { ClinicalProfileChange, ClinicalSummary } from '../app/core/models/clinical-summary.model';
import { BiologicalSex, GrowthObservation, MeasurementMode } from '../app/core/models/growth-chart.model';
import { PatientDetailDTO, PatientDirectoryFilter, PatientListDTO } from '../app/core/models/patient.model';
import { PrescriptionRequest, SavedPrescriptionRecord } from '../app/core/models/prescription.model';
import { VaccinationUpdateRequest } from '../app/core/models/vaccination.model';
import {
  CLINICAL_HISTORY_GROUPS,
  WizardDefinition,
  WizardFormValues,
} from '../app/core/models/wizard-definition.model';
import {
  SaveOnboardingDraftRequest,
  SpecialtyContextSummary,
  WorkspacePreferences,
  WorkspaceSetup,
  WorkspaceUpdateRequest,
} from '../app/core/models/workspace.model';
import {
  DEMO_CLINICIAN_ID,
  DemoContextRecord,
  DemoEncounterRecord,
  DemoPatientRecord,
  DemoSession,
  MAX_STUDY_BYTES,
} from './demo-data';
import { evaluateFormFormulas } from './demo-formulas';
import { generateCohortForContext } from './demo-generator';
import { ageDaysBetween, buildPatientGrowthResponse, loadGrowthCatalog } from './demo-growth';
import { generateDemoPdfBlob } from './demo-pdf';
import { DemoSessionService } from './demo-session.service';
import {
  demoSpecialtyExperience,
  findDemoSpecialty,
  getDemoSpecialtySummaries,
} from './demo-specialties';
import {
  ageInMonthsBetween,
  computeVaccinationSchedule,
  DEMO_VACCINATION_CALENDAR,
  formatAgeLabel,
} from './demo-vaccinations';
import {
  buildDemoAvailability,
  buildDemoBookingEvents,
  buildDemoBookings,
  buildDemoCapabilities,
  buildDemoClinics,
  buildDemoPublication,
  buildDemoSchedule,
  buildDemoSecretaries,
  buildDemoTeleconsultations,
  DEMO_TURNOS_READONLY_MESSAGE,
} from './demo-visual-turnos';

function ok<T>(body: T, status = 200): Observable<HttpEvent<T>> {
  return of(new HttpResponse({ status, body }));
}

function fail(status: number, code: string, message: string): Observable<never> {
  return throwError(
    () =>
      new HttpErrorResponse({
        status,
        statusText: code,
        error: { code, message },
      }),
  );
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, b64] = dataUrl.split(',');
  const mime = header.match(/data:([^;]+);/)?.[1] ?? 'application/octet-stream';
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('No se pudo leer el archivo adjunto.'));
    reader.readAsDataURL(file);
  });
}

@Injectable({ providedIn: 'root' })
export class DemoHttpBackend implements HttpBackend {
  private readonly store = inject(DemoSessionService);
  private demoLicense = '';
  private demoLicenseConfigured = false;
  private demoLogoBlob: Blob | null = null;
  private demoLogoSha: string | null = null;

  handle(req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
    const url = new URL(req.urlWithParams, 'https://demochart.local');
    const path = url.pathname;
    const method = req.method.toUpperCase();

    if (path.startsWith('/api/billing/account/')) {
      return this.handleBillingAccount(path);
    }
    if (!path.startsWith('/api/doctorchart')) {
      return fail(404, 'NOT_FOUND', 'Ruta no disponible en DemoChart.');
    }

    const apiPath = path.slice('/api/doctorchart'.length) || '/';
    return from(this.dispatch(method, apiPath, url, req));
  }

  private handleBillingAccount(path: string): Observable<HttpEvent<unknown>> {
    if (path.endsWith('/profile')) {
      return ok({ fullName: 'Dra. Valentina Gómez', hasAvatar: false });
    }
    return fail(404, 'NOT_FOUND', 'No disponible en DemoChart.');
  }

  private async dispatch(
    method: string,
    path: string,
    url: URL,
    req: HttpRequest<unknown>,
  ): Promise<HttpEvent<unknown>> {
    const session = this.store.session();
    const headerContextId = Number(req.headers.get('X-Specialty-Context-Id') || 0);
    const paramContextId = Number(url.searchParams.get('specialtyContextId') || 0);
    const contextId = paramContextId || headerContextId || session.activeContextId || session.contexts[0]?.specialtyContextId || 1;
    const ctx = session.contexts.find((c) => c.specialtyContextId === contextId) ?? session.contexts[0];

    // 1. Doctor profile & specialties
    if (method === 'GET' && path === '/doctor/profile') {
      const entry = findDemoSpecialty(ctx?.specialtyId ?? 1);
      return new HttpResponse({
        status: 200,
        body: {
          id: 1,
          userId: DEMO_CLINICIAN_ID,
          specialty: { id: entry.id, code: entry.code, name: entry.name, description: entry.description },
          isSpecialtyLocked: false,
          createdAt: new Date().toISOString(),
          professionalLicense: this.demoLicense,
          licenseConfigured: this.demoLicenseConfigured,
          hasClinicLogo: this.demoLogoBlob !== null,
          clinicLogoSha256: this.demoLogoSha,
        },
      });
    }

    if (method === 'GET' && path === '/specialties') {
      return new HttpResponse({ status: 200, body: getDemoSpecialtySummaries() });
    }

    const pubWizardMatch = path.match(/^\/specialties\/(\d+)\/wizard$/);
    if (method === 'GET' && pubWizardMatch) {
      const entry = findDemoSpecialty(Number(pubWizardMatch[1]));
      return new HttpResponse({
        status: 200,
        body: {
          specialty: { id: entry.id, code: entry.code, name: entry.name, description: entry.description },
          publishedVersion: 1,
          definition: structuredClone(entry.definition),
        },
      });
    }

    // 2. Workspace contexts & wizard
    if (method === 'GET' && path === '/workspace/contexts') {
      const summaries: SpecialtyContextSummary[] = session.contexts.map((c) => {
        const entry = findDemoSpecialty(c.specialtyId);
        return {
          id: c.specialtyContextId,
          workspaceId: session.workspaceId,
          version: c.version,
          specialty: { id: entry.id, code: entry.code, name: entry.name, description: entry.description },
          onboardingCompleted: c.onboardingCompleted,
          ready: c.onboardingCompleted && !!c.definition,
          hasDraft: !!c.draftDefinition,
        };
      });
      return new HttpResponse({ status: 200, body: summaries });
    }

    if (method === 'POST' && path === '/workspace/contexts') {
      const body = req.body as { specialtyId: number };
      const entry = findDemoSpecialty(body.specialtyId);
      let createdCtx!: DemoContextRecord;
      await this.store.mutate((draft) => {
        const newCtxId = Math.max(0, ...draft.contexts.map((c) => c.specialtyContextId)) + 1;
        createdCtx = {
          specialtyContextId: newCtxId,
          specialtyId: entry.id,
          version: 1,
          onboardingCompleted: true,
          currentStepKey: 'completed',
          definition: structuredClone(entry.definition),
          draftDefinition: null,
          patientColumnsConfig: {},
          quickNotes: null,
          preferencesVersion: 1,
        };
        const cohort = generateCohortForContext(createdCtx, draft.nextId, newCtxId);
        draft.contexts.push(createdCtx);
        draft.activeContextId = newCtxId;
        draft.patients.push(...cohort.patients);
        draft.encounters.push(...cohort.encounters);
        draft.prescriptions.push(...cohort.prescriptions);
        draft.studies.push(...cohort.studies);
        draft.revisions.push(...cohort.revisions);
        draft.nextId = cohort.nextId;
      });
      return new HttpResponse({ status: 200, body: this.toWorkspaceSetup(this.store.session(), createdCtx) });
    }

    if (method === 'GET' && path === '/workspace') {
      if (!ctx) return new HttpResponse({ status: 200, body: null });
      return new HttpResponse({ status: 200, body: this.toWorkspaceSetup(session, ctx) });
    }

    if (method === 'PUT' && path === '/workspace/wizard/draft') {
      const body = req.body as SaveOnboardingDraftRequest;
      let updated!: DemoContextRecord;
      await this.store.mutate((draft) => {
        const target = draft.contexts.find((c) => c.specialtyContextId === contextId) ?? draft.contexts[0];
        target.draftDefinition = structuredClone(body.definition);
        target.currentStepKey = body.currentStepKey;
        target.version++;
        updated = target;
      });
      return new HttpResponse({ status: 200, body: this.toWorkspaceSetup(this.store.session(), updated) });
    }

    if (method === 'POST' && path === '/workspace/finish-onboarding') {
      let updated!: DemoContextRecord;
      await this.store.mutate((draft) => {
        const target = draft.contexts.find((c) => c.specialtyContextId === contextId) ?? draft.contexts[0];
        if (target.draftDefinition) {
          target.definition = structuredClone(target.draftDefinition);
          target.draftDefinition = null;
        }
        target.onboardingCompleted = true;
        target.currentStepKey = 'completed';
        target.version++;
        updated = target;
      });
      return new HttpResponse({ status: 200, body: this.toWorkspaceSetup(this.store.session(), updated) });
    }

    if (method === 'POST' && path === '/workspace/wizard/discard-draft') {
      let updated!: DemoContextRecord;
      await this.store.mutate((draft) => {
        const target = draft.contexts.find((c) => c.specialtyContextId === contextId) ?? draft.contexts[0];
        target.draftDefinition = null;
        target.currentStepKey = 'completed';
        target.version++;
        updated = target;
      });
      return new HttpResponse({ status: 200, body: this.toWorkspaceSetup(this.store.session(), updated) });
    }

    if (method === 'POST' && path === '/workspace/reset-to-defaults') {
      let updated!: DemoContextRecord;
      await this.store.mutate((draft) => {
        const target = draft.contexts.find((c) => c.specialtyContextId === contextId) ?? draft.contexts[0];
        const entry = findDemoSpecialty(target.specialtyId);
        target.draftDefinition = structuredClone(entry.definition);
        target.version++;
        updated = target;
      });
      return new HttpResponse({ status: 200, body: this.toWorkspaceSetup(this.store.session(), updated) });
    }

    if (path === '/workspace/encounter-templates' || path.startsWith('/workspace/encounter-templates/')) {
      const ensureTemplates = (target: DemoContextRecord, draftSession: DemoSession) => {
        if (!target.encounterTemplates || target.encounterTemplates.length === 0) {
          const now = new Date().toISOString();
          target.encounterTemplates = [
            {
              id: draftSession.nextId++,
              workspaceId: draftSession.workspaceId,
              specialtyContextId: target.specialtyContextId,
              name: 'Historia clínica general',
              formDefinition: structuredClone(target.definition.encounterForm),
              sourceDefaultCode: 'default',
              displayOrder: 0,
              version: 0,
              archivedAt: null,
              createdAt: now,
              updatedAt: now,
            },
          ];
        }
        return target.encounterTemplates;
      };

      const buildTemplatesResponse = (target: DemoContextRecord) => {
        const entry = findDemoSpecialty(target.specialtyId);
        const list = target.encounterTemplates ?? [];
        return {
          specialtyContextId: target.specialtyContextId,
          specialty: { id: entry.id, code: entry.code, name: entry.name, description: entry.description },
          templates: structuredClone(list.filter((t) => !t.archivedAt)),
          archivedTemplates: structuredClone(list.filter((t) => !!t.archivedAt)),
          systemDefaults: [],
        };
      };

      if (method === 'GET' && path === '/workspace/encounter-templates') {
        await this.store.mutate((draft) => {
          const target = draft.contexts.find((c) => c.specialtyContextId === contextId) ?? draft.contexts[0];
          ensureTemplates(target, draft);
        });
        const latest = this.store.session();
        const target = latest.contexts.find((c) => c.specialtyContextId === contextId) ?? latest.contexts[0];
        return new HttpResponse({ status: 200, body: buildTemplatesResponse(target) });
      }

      if (method === 'POST' && path === '/workspace/encounter-templates') {
        const body = req.body as { name: string; sourceTemplateId?: number; formDefinition?: any };
        let created: any;
        await this.store.mutate((draft) => {
          const target = draft.contexts.find((c) => c.specialtyContextId === contextId) ?? draft.contexts[0];
          const list = ensureTemplates(target, draft);
          const source = list.find((t) => t.id === body.sourceTemplateId && !t.archivedAt) ?? list.find((t) => !t.archivedAt);
          const now = new Date().toISOString();
          created = {
            id: draft.nextId++,
            workspaceId: draft.workspaceId,
            specialtyContextId: target.specialtyContextId,
            name: body.name.trim(),
            formDefinition: structuredClone(body.formDefinition ?? source?.formDefinition ?? target.definition.encounterForm),
            sourceDefaultCode: null,
            displayOrder: list.length,
            version: 0,
            archivedAt: null,
            createdAt: now,
            updatedAt: now,
          };
          list.push(created);
        });
        return new HttpResponse({ status: 201, body: structuredClone(created) });
      }

      const tplMatch = path.match(/^\/workspace\/encounter-templates\/(\d+)(?:\/(archive|restore))?$/);
      if (tplMatch) {
        const tplId = Number(tplMatch[1]);
        const action = tplMatch[2];
        let updatedTpl: any;
        await this.store.mutate((draft) => {
          const target = draft.contexts.find((c) => c.specialtyContextId === contextId) ?? draft.contexts[0];
          const list = ensureTemplates(target, draft);
          const tpl = list.find((t) => t.id === tplId);
          if (!tpl) throw new HttpErrorResponse({ status: 404, error: { message: 'Plantilla no encontrada.' } });
          if (!action && method === 'PUT') {
            const body = req.body as { name: string; formDefinition: any };
            tpl.name = body.name.trim();
            tpl.formDefinition = structuredClone(body.formDefinition);
            tpl.version++;
            tpl.updatedAt = new Date().toISOString();
          } else if (action === 'archive' && method === 'POST') {
            if (list.filter((t) => !t.archivedAt).length <= 1) {
              throw new HttpErrorResponse({ status: 409, error: { message: 'Debe quedar al menos una plantilla activa.' } });
            }
            tpl.archivedAt = new Date().toISOString();
            tpl.version++;
            tpl.updatedAt = tpl.archivedAt;
          } else if (action === 'restore' && method === 'POST') {
            tpl.archivedAt = null;
            tpl.version++;
            tpl.updatedAt = new Date().toISOString();
          }
          updatedTpl = tpl;
        });
        return new HttpResponse({ status: 200, body: structuredClone(updatedTpl) });
      }

      if (method === 'POST' && path === '/workspace/encounter-templates/import-defaults') {
        const latest = this.store.session();
        const target = latest.contexts.find((c) => c.specialtyContextId === contextId) ?? latest.contexts[0];
        return new HttpResponse({ status: 200, body: buildTemplatesResponse(target) });
      }
    }

    if (method === 'GET' && path === '/workspace/preferences') {
      return new HttpResponse({ status: 200, body: this.toPreferences(ctx) });
    }

    if (method === 'GET' && path === '/workspace/print-identity') {
      return new HttpResponse({
        status: 200,
        body: {
          professionalLicense: this.demoLicense,
          licenseConfigured: this.demoLicenseConfigured,
          hasLogo: this.demoLogoBlob !== null,
          logoSha256: this.demoLogoSha,
          logoWidth: this.demoLogoBlob ? 512 : null,
          logoHeight: this.demoLogoBlob ? 512 : null,
          updatedAt: this.demoLogoBlob || this.demoLicenseConfigured ? new Date().toISOString() : null,
        },
      });
    }

    if (method === 'PUT' && path === '/workspace/print-identity') {
      const body = (req.body as { professionalLicense?: string } | null) ?? {};
      this.demoLicense = String(body.professionalLicense ?? '').trim();
      this.demoLicenseConfigured = true;
      return new HttpResponse({
        status: 200,
        body: {
          professionalLicense: this.demoLicense,
          licenseConfigured: true,
          hasLogo: this.demoLogoBlob !== null,
          logoSha256: this.demoLogoSha,
          logoWidth: this.demoLogoBlob ? 512 : null,
          logoHeight: this.demoLogoBlob ? 512 : null,
          updatedAt: new Date().toISOString(),
        },
      });
    }

    if (method === 'POST' && path === '/workspace/logo') {
      const formData = req.body instanceof FormData ? req.body : null;
      const uploaded = formData?.get('file');
      this.demoLogoBlob = uploaded instanceof Blob ? uploaded : new Blob(['demo-logo'], { type: 'image/png' });
      this.demoLogoSha = `demo-logo-${Date.now()}`;
      return new HttpResponse({
        status: 200,
        body: {
          professionalLicense: this.demoLicense,
          licenseConfigured: this.demoLicenseConfigured,
          hasLogo: true,
          logoSha256: this.demoLogoSha,
          logoWidth: 512,
          logoHeight: 512,
          updatedAt: new Date().toISOString(),
        },
      });
    }

    if (method === 'GET' && path === '/workspace/logo') {
      if (!this.demoLogoBlob) {
        throw new HttpErrorResponse({
          status: 404,
          error: { code: 'CLINIC_LOGO_NOT_FOUND', message: 'No hay un logo de consultorio cargado.' },
        });
      }
      return new HttpResponse({ status: 200, body: this.demoLogoBlob });
    }

    if (method === 'DELETE' && path === '/workspace/logo') {
      this.demoLogoBlob = null;
      this.demoLogoSha = null;
      return new HttpResponse({ status: 204 });
    }

    if (method === 'GET' && path === '/workspace/signatures') {
      const items = [...(session.signatures ?? [])]
        .sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite) || a.id - b.id)
        .map(({ dataUrl: _d, ...summary }) => summary);
      return new HttpResponse({ status: 200, body: { items } });
    }

    const sigImgMatch = path.match(/^\/workspace\/signatures\/(\d+)\/image$/);
    if (method === 'GET' && sigImgMatch) {
      const sigId = Number(sigImgMatch[1]);
      const found = (session.signatures ?? []).find((s) => s.id === sigId);
      if (!found) throw new HttpErrorResponse({ status: 404, error: { code: 'SIGNATURE_NOT_FOUND', message: 'No se encontró la firma solicitada.' } });
      return new HttpResponse({ status: 200, body: dataUrlToBlob(found.dataUrl) });
    }

    if (method === 'POST' && path === '/workspace/signatures') {
      const body = req.body as { name?: string; stampText?: string; imageBase64?: string; isFavorite?: boolean };
      const name = (body.name ?? '').trim();
      const stampText = (body.stampText ?? '').trim();
      if (!name || !body.imageBase64) throw new HttpErrorResponse({ status: 400, error: { code: 'INVALID_REQUEST', message: 'Indicá un nombre y dibujá la firma.' } });
      let createdId = 0;
      await this.store.mutate((draft) => {
        draft.signatures ??= [];
        const makeFav = draft.signatures.length === 0 || Boolean(body.isFavorite);
        if (makeFav) {
          for (const s of draft.signatures) s.isFavorite = false;
        }
        createdId = draft.nextId++;
        const now = new Date().toISOString();
        draft.signatures.push({
          id: createdId,
          name,
          stampText,
          isFavorite: makeFav,
          width: 320,
          height: 120,
          sha256: `demo-sig-${createdId}-${Date.now()}`,
          dataUrl: body.imageBase64!,
          createdAt: now,
          updatedAt: now,
        });
      });
      const created = this.store.session().signatures?.find((s) => s.id === createdId);
      if (!created) throw new HttpErrorResponse({ status: 500, error: { code: 'INTERNAL_ERROR', message: 'No se pudo guardar la firma.' } });
      const { dataUrl: _d, ...summary } = created;
      return new HttpResponse({ status: 201, body: summary });
    }

    const sigMatch = path.match(/^\/workspace\/signatures\/(\d+)$/);
    if (sigMatch && method === 'PATCH') {
      const sigId = Number(sigMatch[1]);
      const body = req.body as { name?: string; stampText?: string; imageBase64?: string; isFavorite?: boolean };
      await this.store.mutate((draft) => {
        draft.signatures ??= [];
        const target = draft.signatures.find((s) => s.id === sigId);
        if (!target) return;
        if (body.isFavorite) {
          for (const s of draft.signatures) s.isFavorite = false;
        }
        if (body.name !== undefined) target.name = body.name.trim();
        if (body.stampText !== undefined) target.stampText = body.stampText.trim();
        if (body.imageBase64) {
          target.dataUrl = body.imageBase64;
          target.sha256 = `demo-sig-${sigId}-${Date.now()}`;
        }
        if (body.isFavorite !== undefined) target.isFavorite = body.isFavorite;
        target.updatedAt = new Date().toISOString();
      });
      const updated = this.store.session().signatures?.find((s) => s.id === sigId);
      if (!updated) throw new HttpErrorResponse({ status: 404, error: { code: 'SIGNATURE_NOT_FOUND', message: 'No se encontró la firma solicitada.' } });
      const { dataUrl: _d, ...summary } = updated;
      return new HttpResponse({ status: 200, body: summary });
    }

    if (sigMatch && method === 'DELETE') {
      const sigId = Number(sigMatch[1]);
      await this.store.mutate((draft) => {
        draft.signatures ??= [];
        const target = draft.signatures.find((s) => s.id === sigId);
        const wasFav = target?.isFavorite ?? false;
        draft.signatures = draft.signatures.filter((s) => s.id !== sigId);
        if (wasFav && draft.signatures.length > 0) {
          draft.signatures[draft.signatures.length - 1].isFavorite = true;
        }
      });
      return new HttpResponse({ status: 204, body: null });
    }

    if (method === 'PUT' && path === '/workspace/quick-notes') {
      const body = req.body as { content: string | null };
      let updated!: DemoContextRecord;
      await this.store.mutate((draft) => {
        const target = draft.contexts.find((c) => c.specialtyContextId === contextId) ?? draft.contexts[0];
        target.quickNotes = body.content ?? null;
        target.preferencesVersion++;
        updated = target;
      });
      return new HttpResponse({ status: 200, body: this.toPreferences(updated) });
    }

    if (method === 'PUT' && path === '/workspace/preferences') {
      const body = req.body as WorkspaceUpdateRequest;
      let updated!: DemoContextRecord;
      await this.store.mutate((draft) => {
        const target = draft.contexts.find((c) => c.specialtyContextId === contextId) ?? draft.contexts[0];
        target.patientColumnsConfig = { ...body.patientColumnsConfig };
        target.preferencesVersion++;
        updated = target;
      });
      return new HttpResponse({ status: 200, body: this.toPreferences(updated) });
    }

    if (method === 'GET' && path === '/workspace/clinical-access') {
      const patientId = Number(url.searchParams.get('patientId') || 0) || null;
      const items = session.accessEvents
        .filter((e) => e.specialtyContextId === contextId && (!patientId || e.patientId === patientId))
        .slice(-30)
        .reverse()
        .map((e) => ({
          id: e.id,
          occurredAt: e.occurredAt,
          actor: DEMO_CLINICIAN_ID,
          actorKind: 'DOCTOR' as const,
          operation: e.operation,
          entityId: e.entityId,
          patientId: e.patientId,
          recordVersion: e.recordVersion,
          outcome: 'AUTHORIZED' as const,
          requestId: `demo-${e.id}`,
        }));
      return new HttpResponse({ status: 200, body: { items, nextBefore: null } });
    }

    // 3. Vaccination catalog
    if (method === 'GET' && path === '/vaccination-calendar') {
      return new HttpResponse({ status: 200, body: DEMO_VACCINATION_CALENDAR });
    }

    // 4. Medications catalog (fallback built into service, also respond directly)
    if (method === 'GET' && path === '/medications/search') {
      throw new HttpErrorResponse({ status: 404, statusText: 'USE_FALLBACK' });
    }

    // 5. Patients directory & record endpoints
    if (path === '/patients' && method === 'GET') {
      const page = Math.max(0, Math.floor(Number(url.searchParams.get('page') || 0) || 0));
      const size = Math.max(1, Math.min(100, Math.floor(Number(url.searchParams.get('size') || 10) || 10)));
      const search = (url.searchParams.get('search') || '').trim().toLowerCase();
      const disease = (url.searchParams.get('disease') || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const filter = (url.searchParams.get('filter') || 'ALL') as PatientDirectoryFilter;
      const asOf = new Date().toISOString().slice(0, 10);

      let list = session.patients
        .filter((p) => p.specialtyContextId === contextId)
        .map((p) => {
          const dto = this.toPatientListDTO(session, p, asOf);
          const latest = session.encounters
            .filter((e) => e.patientId === p.id)
            .sort((a, b) => b.encounterDate.localeCompare(a.encounterDate) || b.id - a.id)[0];
          const latestDisease = latest
            ? ((latest.formValues?.['sys_disease'] as string | undefined) ?? '').trim() || null
            : null;
          return { ...dto, lastEncounterDisease: latestDisease };
        });

      if (search) {
        list = list.filter(
          (p) =>
            p.fullName.toLowerCase().includes(search) ||
            (p.nationalId ?? '').toLowerCase().includes(search) ||
            (p.phone ?? '').toLowerCase().includes(search),
        );
      }

      if (disease) {
        list = list.filter((p) => {
          const val = (p.lastEncounterDisease ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          return val.includes(disease);
        });
      }

      if (filter !== 'ALL') {
        list = list.filter((p) => {
          if (filter === 'VACCINE_PENDING') return p.hasPendingVaccine;
          if (filter === 'ADULT') return (p.ageInMonths ?? 0) >= 216;
          if (filter === 'MINOR') return (p.ageInMonths ?? 0) < 216;
          if (filter === 'TODDLER') return p.ageGroup === 'EARLY_CHILDHOOD';
          return p.ageGroup === filter;
        });
      }

      list.sort((a, b) => a.fullName.localeCompare(b.fullName, 'es') || a.id - b.id);
      const paged = this.paginate(list, page, size);
      return new HttpResponse({ status: 200, body: paged });
    }

    // Block manual patient creation/editing/annulment in DemoChart
    if (path === '/patients' && method === 'POST') {
      throw new HttpErrorResponse({
        status: 403,
        error: { code: 'DEMO_READONLY_PATIENT', message: 'En DemoChart los pacientes se generan automáticamente desde el generador de ejemplos.' },
      });
    }

    if (path === '/patients/archived' && method === 'GET') {
      return new HttpResponse({ status: 200, body: { items: [], nextBefore: null } });
    }

    const patientMatch = path.match(/^\/patients\/(\d+)$/);
    if (patientMatch) {
      const pId = Number(patientMatch[1]);
      if (method === 'PUT' || method === 'DELETE') {
        throw new HttpErrorResponse({
          status: 403,
          error: { code: 'DEMO_READONLY_PATIENT', message: 'La edición o anulación de datos filiatorios está deshabilitada en DemoChart.' },
        });
      }
      if (method === 'GET') {
        const patient = session.patients.find((p) => p.id === pId && p.specialtyContextId === contextId);
        if (!patient) throw new HttpErrorResponse({ status: 404, error: { message: 'Paciente no encontrado.' } });
        return new HttpResponse({ status: 200, body: this.toPatientDetailDTO(session, patient) });
      }
    }

    // Clinical summary & clinical profile updates
    const summaryMatch = path.match(/^\/patients\/(\d+)\/clinical-summary$/);
    if (method === 'GET' && summaryMatch) {
      const pId = Number(summaryMatch[1]);
      const patient = session.patients.find((p) => p.id === pId && p.specialtyContextId === contextId);
      if (!patient) throw new HttpErrorResponse({ status: 404, error: { message: 'Paciente no encontrado.' } });
      return new HttpResponse({ status: 200, body: this.toClinicalSummary(session, patient, ctx) });
    }

    const profileMatch = path.match(/^\/patients\/(\d+)\/clinical-profile$/);
    if (method === 'PUT' && profileMatch) {
      const pId = Number(profileMatch[1]);
      const body = req.body as ClinicalProfileChange & { expectedVersion: number };
      let updatedPatient!: DemoPatientRecord;
      await this.store.mutate((draft) => {
        const p = draft.patients.find((item) => item.id === pId && item.specialtyContextId === contextId);
        if (!p) throw new Error('Paciente no encontrado.');
        const nowIso = new Date().toISOString();
        if (body.operation === 'ADD') {
          p.clinicalEntries.push({
            id: `ce-${draft.nextId++}`,
            kind: body.kind,
            text: body.text,
            details: body.details,
            date: body.date,
            certainty: body.certainty,
            status: 'ACTIVE',
            recordedAt: nowIso,
            authorUserId: DEMO_CLINICIAN_ID,
          });
          if (body.kind === 'ALLERGY') {
            const items = p.clinicalEntries
              .filter((e) => e.kind === 'ALLERGY' && e.status === 'ACTIVE')
              .map((e) => e.text);
            p.formValues['sys_allergyStatus'] = 'PRESENT';
            p.formValues['sys_allergies'] = items.join('\n');
          } else if (body.kind === 'PROBLEM') {
            const items = p.clinicalEntries
              .filter((e) => e.kind === 'PROBLEM' && e.status === 'ACTIVE')
              .map((e) => e.text);
            p.formValues['sys_conditionStatus'] = 'PRESENT';
            p.formValues['sys_conditions'] = items.join('\n');
          }
        } else if (body.operation === 'RESOLVE') {
          const entry = p.clinicalEntries.find((e) => e.id === body.entryId);
          if (entry) {
            entry.status = 'RESOLVED';
            entry.resolvedAt = nowIso;
          }
        } else if (body.operation === 'CONFIRM') {
          const entry = p.clinicalEntries.find((e) => e.id === body.entryId);
          if (entry) {
            entry.certainty = 'CONFIRMED';
            entry.verifiedAt = nowIso;
          }
        } else if (body.operation === 'NO_KNOWN_ALLERGIES') {
          p.noKnownAllergiesAt = nowIso;
          p.allergies = [];
          p.formValues['sys_allergyStatus'] = 'NONE';
          p.formValues['sys_allergies'] = '';
        }
        p.version++;
        updatedPatient = p;
      });
      return new HttpResponse({ status: 200, body: this.toPatientDetailDTO(this.store.session(), updatedPatient) });
    }

    // Growth curves
    const growthMatch = path.match(/^\/patients\/(\d+)\/growth$/);
    if (method === 'GET' && growthMatch) {
      const pId = Number(growthMatch[1]);
      const patient = session.patients.find((p) => p.id === pId && p.specialtyContextId === contextId);
      if (!patient) throw new HttpErrorResponse({ status: 404, error: { message: 'Paciente no encontrado.' } });
      const catalog = await loadGrowthCatalog();
      const asOfDate = new Date().toISOString().slice(0, 10);
      const requestedSex = (url.searchParams.get('referenceSex') || null) as BiologicalSex | null;
      const modesRaw = url.searchParams.get('measurementModes');
      const modes: Record<string, Exclude<MeasurementMode, 'UNKNOWN'>> = modesRaw ? JSON.parse(modesRaw) : {};
      const observations = this.collectGrowthObservations(session, patient);
      const response = buildPatientGrowthResponse(catalog, {
        patientId: patient.id,
        birthDate: patient.birthDate,
        asOfDate,
        ageFormatted: formatAgeLabel(patient.birthDate, asOfDate),
        systemGender: patient.gender,
        requestedSex,
        observations,
        measurementModes: modes,
      });
      return new HttpResponse({ status: 200, body: response });
    }

    // Vaccinations
    const vacGetMatch = path.match(/^\/patients\/(\d+)\/vaccinations$/);
    if (method === 'GET' && vacGetMatch) {
      const pId = Number(vacGetMatch[1]);
      const patient = session.patients.find((p) => p.id === pId && p.specialtyContextId === contextId);
      if (!patient) throw new HttpErrorResponse({ status: 404, error: { message: 'Paciente no encontrado.' } });
      const asOf = new Date().toISOString().slice(0, 10);
      return new HttpResponse({
        status: 200,
        body: computeVaccinationSchedule(patient.id, patient.version, patient.birthDate, patient.appliedVaccines, asOf),
      });
    }

    const vacPutMatch = path.match(/^\/patients\/(\d+)\/vaccinations\/([^/]+)$/);
    if (method === 'PUT' && vacPutMatch) {
      const pId = Number(vacPutMatch[1]);
      const doseId = decodeURIComponent(vacPutMatch[2]);
      const body = req.body as VaccinationUpdateRequest;
      let updatedPatient!: DemoPatientRecord;
      await this.store.mutate((draft) => {
        const p = draft.patients.find((item) => item.id === pId && item.specialtyContextId === contextId);
        if (!p) throw new Error('Paciente no encontrado.');
        if (body.applied) {
          p.appliedVaccines[doseId] = body.appliedAt ?? new Date().toISOString().slice(0, 10);
        } else {
          draft.revisions.push({
            id: draft.nextId++,
            specialtyContextId: contextId,
            patientId: p.id,
            entity: 'VACCINATION',
            entityId: p.id,
            occurredAt: new Date().toISOString(),
            operation: 'ANNUL',
            previousVersion: p.version,
            newVersion: p.version + 1,
            reason: body.reason ?? 'Anulada en DemoChart',
            previous: { dose_id: doseId, applied_at: p.appliedVaccines[doseId] },
          });
          delete p.appliedVaccines[doseId];
        }
        p.version++;
        updatedPatient = p;
      });
      const asOf = new Date().toISOString().slice(0, 10);
      const nextSession = this.store.session();
      return new HttpResponse({
        status: 200,
        body: {
          patient: this.toPatientDetailDTO(nextSession, updatedPatient),
          schedule: computeVaccinationSchedule(
            updatedPatient.id,
            updatedPatient.version,
            updatedPatient.birthDate,
            updatedPatient.appliedVaccines,
            asOf,
          ),
        },
      });
    }

    // Prescriptions
    const rxListMatch = path.match(/^\/patients\/(\d+)\/prescriptions$/);
    if (rxListMatch) {
      const pId = Number(rxListMatch[1]);
      if (method === 'GET') {
        const list: SavedPrescriptionRecord[] = session.prescriptions
          .filter((r) => r.patientId === pId && r.specialtyContextId === contextId)
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
          .map((r) => ({
            id: r.id,
            patientId: r.patientId,
            authorUserId: DEMO_CLINICIAN_ID,
            createdAt: r.createdAt,
            type: r.type,
            diagnosisDescription: r.diagnosisDescription,
            generalInstructions: r.generalInstructions,
            prescriptions: r.prescriptions,
            diagnosticOrders: r.diagnosticOrders,
          }));
        return new HttpResponse({ status: 200, body: list });
      }
      if (method === 'POST') {
        const body = req.body as PrescriptionRequest;
        let created!: SavedPrescriptionRecord;
        await this.store.mutate((draft) => {
          const id = draft.nextId++;
          const nowIso = new Date().toISOString();
          draft.prescriptions.push({
            id,
            specialtyContextId: contextId,
            patientId: pId,
            type: body.type,
            diagnosisDescription: body.diagnosisDescription,
            generalInstructions: body.generalInstructions,
            prescriptions: structuredClone(body.prescriptions),
            diagnosticOrders: [...body.diagnosticOrders],
            createdAt: nowIso,
          });
          created = {
            id,
            patientId: pId,
            authorUserId: DEMO_CLINICIAN_ID,
            createdAt: nowIso,
            ...body,
          };
        });
        return new HttpResponse({ status: 200, body: created });
      }
    }

    const rxDeleteMatch = path.match(/^\/patients\/(\d+)\/prescriptions\/(\d+)$/);
    if (method === 'DELETE' && rxDeleteMatch) {
      const pId = Number(rxDeleteMatch[1]);
      const rxId = Number(rxDeleteMatch[2]);
      const body = (req.body as { reason?: string } | null) ?? {};
      await this.store.mutate((draft) => {
        const idx = draft.prescriptions.findIndex((r) => r.id === rxId && r.patientId === pId);
        if (idx >= 0) {
          const [removed] = draft.prescriptions.splice(idx, 1);
          draft.revisions.push({
            id: draft.nextId++,
            specialtyContextId: contextId,
            patientId: pId,
            entity: 'PRESCRIPTION',
            entityId: rxId,
            occurredAt: new Date().toISOString(),
            operation: 'ANNUL',
            previousVersion: 1,
            newVersion: 2,
            reason: body.reason ?? 'Anulada en DemoChart',
            previous: {
              diagnosis_description: removed.diagnosisDescription,
              general_instructions: removed.generalInstructions,
              medications: removed.prescriptions,
              orders: removed.diagnosticOrders,
            },
          });
        }
      });
      return new HttpResponse({ status: 204, body: null });
    }

    // Studies
    const studiesListMatch = path.match(/^\/patients\/(\d+)\/studies$/);
    if (studiesListMatch) {
      const pId = Number(studiesListMatch[1]);
      if (method === 'GET') {
        const list = session.studies
          .filter((s) => s.patientId === pId && s.specialtyContextId === contextId)
          .sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt))
          .map(({ dataUrl: _d, specialtyContextId: _c, ...meta }) => meta);
        return new HttpResponse({ status: 200, body: list });
      }
      if (method === 'POST') {
        const form = req.body as FormData;
        const file = form.get('file') as File | null;
        const name = String(form.get('name') ?? '').trim();
        const description = form.get('description') ? String(form.get('description')).trim() : null;
        if (!file || !name) {
          throw new HttpErrorResponse({ status: 400, error: { message: 'Faltan el archivo o el nombre del estudio.' } });
        }
        if (file.size > MAX_STUDY_BYTES) {
          throw new HttpErrorResponse({ status: 400, error: { message: 'En DemoChart cada adjunto puede pesar hasta 2 MB.' } });
        }
        const dataUrl = await fileToDataUrl(file);
        let createdMeta: unknown;
        await this.store.mutate((draft) => {
          const id = draft.nextId++;
          const record = {
            id,
            specialtyContextId: contextId,
            patientId: pId,
            name,
            originalFileName: file.name,
            contentType: file.type || 'application/octet-stream',
            fileSize: file.size,
            description,
            uploadedAt: new Date().toISOString(),
            dataUrl,
          };
          draft.studies.push(record);
          const { dataUrl: _d, specialtyContextId: _c, ...meta } = record;
          createdMeta = meta;
        });
        return new HttpResponse({ status: 200, body: createdMeta });
      }
    }

    const studyFileMatch = path.match(/^\/patients\/(\d+)\/studies\/(\d+)\/file$/);
    if (method === 'GET' && studyFileMatch) {
      const pId = Number(studyFileMatch[1]);
      const sId = Number(studyFileMatch[2]);
      const study = session.studies.find((s) => s.id === sId && s.patientId === pId);
      if (!study) throw new HttpErrorResponse({ status: 404, error: { message: 'Estudio no encontrado.' } });
      return new HttpResponse({ status: 200, body: dataUrlToBlob(study.dataUrl) });
    }

    const studySingleMatch = path.match(/^\/patients\/(\d+)\/studies\/(\d+)$/);
    if (studySingleMatch) {
      const pId = Number(studySingleMatch[1]);
      const sId = Number(studySingleMatch[2]);
      if (method === 'DELETE') {
        const body = (req.body as { reason?: string } | null) ?? {};
        await this.store.mutate((draft) => {
          const idx = draft.studies.findIndex((s) => s.id === sId && s.patientId === pId);
          if (idx >= 0) {
            const [removed] = draft.studies.splice(idx, 1);
            draft.revisions.push({
              id: draft.nextId++,
              specialtyContextId: contextId,
              patientId: pId,
              entity: 'STUDY',
              entityId: sId,
              occurredAt: new Date().toISOString(),
              operation: 'ANNUL',
              previousVersion: 1,
              newVersion: 2,
              reason: body.reason ?? 'Estudio anulado en DemoChart',
              previous: { study_name: removed.name, original_file_name: removed.originalFileName },
            });
          }
        });
        return new HttpResponse({ status: 204, body: null });
      }
    }

    // Documents & Print
    const printMatch = path.match(/^\/patients\/(\d+)\/(prescriptions|encounters)\/(\d+)\/(print|pdf|documents)$/);
    if (printMatch) {
      const pId = Number(printMatch[1]);
      const col = printMatch[2] as 'prescriptions' | 'encounters';
      const itemId = Number(printMatch[3]);
      const action = printMatch[4];
      const patient = session.patients.find((p) => p.id === pId);
      if (!patient) throw new HttpErrorResponse({ status: 404, error: { message: 'Paciente no encontrado.' } });
      const doc = this.buildPrintDocument(session, patient, col, itemId, ctx);
      const resolveDemoSig = (sigIdParam: number | null | undefined, sigMode: string | null) => {
        const list = session.signatures ?? [];
        if (sigMode === 'none' || sigIdParam === null) return null;
        if (typeof sigIdParam === 'number' && sigIdParam > 0) {
          return list.find((s) => s.id === sigIdParam) ?? null;
        }
        return list.find((s) => s.isFavorite) ?? null;
      };
      if (action === 'print') return new HttpResponse({ status: 200, body: doc });
      if (action === 'pdf') {
        const rawId = url.searchParams.get('signatureId');
        const sigMode = url.searchParams.get('signatureMode');
        const sig = resolveDemoSig(rawId ? Number(rawId) : undefined, sigMode);
        return new HttpResponse({
          status: 200,
          body: generateDemoPdfBlob(doc, sig, { license: this.demoLicense, hasLogo: this.demoLogoBlob !== null }),
        });
      }
      if (action === 'documents' && method === 'POST') {
        const body = (req.body ?? {}) as { signatureId?: number | null };
        const sig = resolveDemoSig(body.signatureId, body.signatureId === null ? 'none' : null);
        let issuedId = 0;
        await this.store.mutate((draft) => {
          issuedId = draft.nextId++;
          draft.documents.push({
            id: issuedId,
            specialtyContextId: contextId,
            patientId: pId,
            source: col === 'prescriptions' ? 'PRESCRIPTION_RECORD' : 'ENCOUNTER',
            sourceId: itemId,
            code: `DC-DEMO-${issuedId}`,
            issuedAt: new Date().toISOString(),
            sourceVersion: 1,
            type: doc.type,
            status: 'ISSUED',
            reason: null,
            signatureId: sig?.id ?? null,
            signatureName: sig?.name ?? null,
            signatureStampText: sig?.stampText ?? null,
          });
        });
        return new HttpResponse({ status: 200, body: { id: issuedId } });
      }
    }

    const docPdfMatch = path.match(/^\/patients\/(\d+)\/documents\/(\d+)\/pdf$/);
    if (method === 'GET' && docPdfMatch) {
      const pId = Number(docPdfMatch[1]);
      const docId = Number(docPdfMatch[2]);
      const issued = session.documents.find((d) => d.id === docId && d.patientId === pId);
      const patient = session.patients.find((p) => p.id === pId);
      if (!issued || !patient) throw new HttpErrorResponse({ status: 404, error: { message: 'Documento no encontrado.' } });
      const col = issued.source === 'PRESCRIPTION_RECORD' ? 'prescriptions' : 'encounters';
      const printDoc = this.buildPrintDocument(session, patient, col, issued.sourceId, ctx);
      printDoc.code = issued.code;
      const sig = issued.signatureName
        ? { name: issued.signatureName, stampText: issued.signatureStampText ?? '' }
        : null;
      return new HttpResponse({
        status: 200,
        body: generateDemoPdfBlob(printDoc, sig, { license: this.demoLicense, hasLogo: this.demoLogoBlob !== null }),
      });
    }

    const historyPdfMatch = path.match(/^\/patients\/(\d+)\/clinical-history\/pdf$/);
    if (method === 'GET' && historyPdfMatch) {
      const pId = Number(historyPdfMatch[1]);
      const patient = session.patients.find((p) => p.id === pId);
      if (!patient) throw new HttpErrorResponse({ status: 404, error: { message: 'Paciente no encontrado.' } });
      const encounters = session.encounters.filter((e) => e.patientId === pId);
      const latest = encounters[0];
      const entry = findDemoSpecialty(ctx?.specialtyId ?? 1);
      const printDoc = this.buildPrintDocument(session, patient, 'encounters', latest?.id ?? 0, ctx);
      printDoc.source = 'CLINICAL_HISTORY';
      printDoc.patientInstructions = latest?.followUpInstructions ?? 'Historia clínica completa (DemoChart).';
      printDoc.author.specialtyName = entry.name;
      return new HttpResponse({
        status: 200,
        body: generateDemoPdfBlob(printDoc, null, { license: this.demoLicense, hasLogo: this.demoLogoBlob !== null }),
      });
    }

    const docsListMatch = path.match(/^\/patients\/(\d+)\/documents$/);
    if (method === 'GET' && docsListMatch) {
      const pId = Number(docsListMatch[1]);
      const items = session.documents
        .filter((d) => d.patientId === pId && d.specialtyContextId === contextId)
        .reverse()
        .map((d) => ({
          id: d.id,
          code: d.code,
          issuedAt: d.issuedAt,
          sourceVersion: d.sourceVersion,
          type: d.type,
          status: d.status,
          sourceStatus: 'CURRENT' as const,
          reason: d.reason,
        }));
      return new HttpResponse({ status: 200, body: { items, nextBefore: null } });
    }

    const docAnnulMatch = path.match(/^\/patients\/(\d+)\/documents\/(\d+)\/annul$/);
    if (method === 'POST' && docAnnulMatch) {
      const docId = Number(docAnnulMatch[2]);
      const body = req.body as { reason?: string };
      await this.store.mutate((draft) => {
        const d = draft.documents.find((item) => item.id === docId);
        if (d) {
          d.status = 'ANNULLED';
          d.reason = body.reason ?? 'Anulado en DemoChart';
        }
      });
      return new HttpResponse({ status: 200, body: null });
    }

    const exportMatch = path.match(/^\/patients\/(\d+)\/export$/);
    if (method === 'POST' && exportMatch) {
      const pId = Number(exportMatch[1]);
      const patient = session.patients.find((p) => p.id === pId);
      const payload = JSON.stringify(
        {
          demoNotice: 'Copia de demostración generada en DemoChart',
          patient,
          encounters: session.encounters.filter((e) => e.patientId === pId),
          prescriptions: session.prescriptions.filter((r) => r.patientId === pId),
        },
        null,
        2,
      );
      return new HttpResponse({ status: 200, body: new Blob([payload], { type: 'application/json' }) });
    }

    // Revisions
    const revisionsMatch = path.match(/^\/patients\/(\d+)\/revisions$/);
    if (method === 'GET' && revisionsMatch) {
      const pId = Number(revisionsMatch[1]);
      const encId = Number(url.searchParams.get('encounterId') || 0) || null;
      const patient = session.patients.find((p) => p.id === pId);
      const items = session.revisions
        .filter((r) => r.patientId === pId && (!encId || (r.entity === 'ENCOUNTER' && r.entityId === encId)))
        .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))
        .map((r) => ({
          id: r.id,
          entity: r.entity,
          entityId: r.entityId,
          actorUserId: DEMO_CLINICIAN_ID,
          occurredAt: r.occurredAt,
          operation: r.operation,
          previousVersion: r.previousVersion,
          newVersion: r.newVersion,
          reason: r.reason,
          previous: r.previous,
        }));
      const result: PatientRevisions = {
        patient: { id: pId, fullName: patient?.fullName ?? 'Paciente', annulledAt: null },
        calculationsEnabled: false,
        items,
        nextBefore: null,
      };
      return new HttpResponse({ status: 200, body: result });
    }

    // 6. Clinical encounters
    if (method === 'GET' && path === '/encounters/dashboard') {
      return new HttpResponse({ status: 200, body: this.toDashboard(session, contextId) });
    }

    if (method === 'GET' && path === '/encounters') {
      const page = Number(url.searchParams.get('page') || 0);
      const size = Number(url.searchParams.get('size') || 20);
      const search = (url.searchParams.get('search') || '').trim().toLowerCase();
      let list = session.encounters
        .filter((e) => e.specialtyContextId === contextId)
        .sort((a, b) => b.encounterDate.localeCompare(a.encounterDate))
        .map((e) => this.toEncounterList(session, e, ctx));
      if (search) {
        list = list.filter(
          (e) =>
            (e.patientFullName ?? '').toLowerCase().includes(search) ||
            (e.chiefComplaint ?? '').toLowerCase().includes(search) ||
            (e.primaryDiagnosisDescription ?? '').toLowerCase().includes(search),
        );
      }
      return new HttpResponse({ status: 200, body: this.paginate(list, page, size) });
    }

    const encByPatientMatch = path.match(/^\/encounters\/patient\/(\d+)(?:\/specialty\/\d+)?$/);
    if (method === 'GET' && encByPatientMatch) {
      const pId = Number(encByPatientMatch[1]);
      const list = session.encounters
        .filter((e) => e.patientId === pId && e.specialtyContextId === contextId)
        .sort((a, b) => b.encounterDate.localeCompare(a.encounterDate))
        .map((e) => this.toEncounterList(session, e, ctx));
      return new HttpResponse({ status: 200, body: list });
    }

    if (method === 'POST' && path === '/encounters') {
      const body = req.body as ClinicalEncounterRequest;
      let createdDetail!: ClinicalEncounterDetail;
      await this.store.mutate((draft) => {
        const patient = draft.patients.find((p) => p.id === body.patientId && p.specialtyContextId === contextId);
        if (!patient) throw new Error('Paciente no encontrado.');
        const targetCtx = draft.contexts.find((c) => c.specialtyContextId === contextId) ?? draft.contexts[0];
        const id = draft.nextId++;
        const values = structuredClone(body.values);
        const enc = this.buildEncounterRecord(id, targetCtx, patient, body.consultationType, values, new Date().toISOString());
        const selectedTpl = body.templateId
          ? targetCtx.encounterTemplates?.find((t) => t.id === body.templateId && !t.archivedAt)
          : targetCtx.encounterTemplates?.find((t) => !t.archivedAt);
        if (selectedTpl) {
          enc.encounterTemplateId = selectedTpl.id;
          enc.encounterTemplateName = selectedTpl.name;
          enc.formDefinitionSnapshot = structuredClone(selectedTpl.formDefinition);
        }
        draft.encounters.push(enc);
        createdDetail = this.toEncounterDetail(draft, enc, targetCtx);
      });
      return new HttpResponse({ status: 200, body: createdDetail });
    }

    const encSingleMatch = path.match(/^\/encounters\/(\d+)$/);
    if (encSingleMatch) {
      const encId = Number(encSingleMatch[1]);
      if (method === 'GET') {
        const enc = session.encounters.find((e) => e.id === encId && e.specialtyContextId === contextId);
        if (!enc) throw new HttpErrorResponse({ status: 404, error: { message: 'Consulta no encontrada.' } });
        return new HttpResponse({ status: 200, body: this.toEncounterDetail(session, enc, ctx) });
      }
      if (method === 'PUT') {
        const body = req.body as ClinicalEncounterUpdateRequest;
        let updatedDetail!: ClinicalEncounterDetail;
        await this.store.mutate((draft) => {
          const enc = draft.encounters.find((e) => e.id === encId && e.specialtyContextId === contextId);
          const patient = enc ? draft.patients.find((p) => p.id === enc.patientId) : undefined;
          const targetCtx = draft.contexts.find((c) => c.specialtyContextId === contextId) ?? draft.contexts[0];
          if (!enc || !patient) throw new Error('Consulta no encontrada.');
          draft.revisions.push({
            id: draft.nextId++,
            specialtyContextId: contextId,
            patientId: patient.id,
            entity: 'ENCOUNTER',
            entityId: enc.id,
            occurredAt: new Date().toISOString(),
            operation: 'CORRECT',
            previousVersion: enc.version,
            newVersion: enc.version + 1,
            reason: body.reason ?? null,
            previous: {
              form_definition_snapshot: structuredClone(enc.formDefinitionSnapshot),
              form_values: structuredClone(enc.formValues),
              formula_results: structuredClone(enc.formulaResults),
            },
          });
          const rebuilt = this.buildEncounterRecord(
            enc.id,
            targetCtx,
            patient,
            body.consultationType,
            structuredClone(body.values),
            body.encounterDate ?? enc.encounterDate,
            enc.version + 1,
          );
          rebuilt.formDefinitionSnapshot = structuredClone(enc.formDefinitionSnapshot);
          rebuilt.encounterTemplateId = enc.encounterTemplateId ?? null;
          rebuilt.encounterTemplateName = enc.encounterTemplateName ?? null;
          Object.assign(enc, rebuilt);
          updatedDetail = this.toEncounterDetail(draft, enc, targetCtx);
        });
        return new HttpResponse({ status: 200, body: updatedDetail });
      }
      if (method === 'DELETE') {
        const body = (req.body as { reason?: string } | null) ?? {};
        await this.store.mutate((draft) => {
          const idx = draft.encounters.findIndex((e) => e.id === encId && e.specialtyContextId === contextId);
          if (idx >= 0) {
            const [removed] = draft.encounters.splice(idx, 1);
            draft.revisions.push({
              id: draft.nextId++,
              specialtyContextId: contextId,
              patientId: removed.patientId,
              entity: 'ENCOUNTER',
              entityId: removed.id,
              occurredAt: new Date().toISOString(),
              operation: 'ANNUL',
              previousVersion: removed.version,
              newVersion: removed.version + 1,
              reason: body.reason ?? 'Consulta anulada en DemoChart',
              previous: {
                form_definition_snapshot: removed.formDefinitionSnapshot,
                form_values: removed.formValues,
                formula_results: removed.formulaResults,
              },
            });
          }
        });
        return new HttpResponse({ status: 204, body: null });
      }
    }

    // 7. Visual-only Turnos, Consultorios, Teleconsulta, Secretaría
    const turnosResponse = this.handleVisualTurnos(method, path, url, session, contextId, ctx);
    if (turnosResponse) return turnosResponse;

    throw new HttpErrorResponse({
      status: 404,
      error: { code: 'NOT_FOUND', message: 'Operación no disponible en DemoChart.' },
    });
  }

  private handleVisualTurnos(
    method: string,
    path: string,
    url: URL,
    session: DemoSession,
    contextId: number,
    ctx: DemoContextRecord | undefined,
  ): HttpResponse<unknown> | null {
    const contextPatients = session.patients.filter((p) => p.specialtyContextId === contextId);
    const specialty = findDemoSpecialty(ctx?.specialtyId ?? 1);
    const clinics = buildDemoClinics(contextId);

    // Block all writes in Turnos / Consultorios / Teleconsulta / Secretaría
    const isTurnosPath =
      path.startsWith('/clinics') ||
      path.startsWith('/teleconsultations') ||
      path.startsWith('/bookings') ||
      path.startsWith('/booking-publication') ||
      path.startsWith('/secretaries') ||
      path.startsWith('/staff');

    if (!isTurnosPath) return null;

    if (method !== 'GET') {
      throw new HttpErrorResponse({
        status: 400,
        error: { code: 'INVALID_REQUEST', message: DEMO_TURNOS_READONLY_MESSAGE },
      });
    }

    if (path === '/clinics/capabilities') {
      return new HttpResponse({ status: 200, body: buildDemoCapabilities() });
    }
    if (path === '/clinics') {
      return new HttpResponse({ status: 200, body: { items: clinics, page: 0, size: 100, totalElements: clinics.length } });
    }
    if (path === '/teleconsultations') {
      return new HttpResponse({ status: 200, body: buildDemoTeleconsultations(session.contexts) });
    }

    const clinicDetailMatch = path.match(/^\/clinics\/([^/]+)$/);
    if (clinicDetailMatch) {
      const c = clinics.find((item) => item.id === clinicDetailMatch[1]) ?? clinics[0];
      return new HttpResponse({ status: 200, body: c });
    }

    const clinicScheduleMatch = path.match(/^\/clinics\/([^/]+)\/schedule$/);
    if (clinicScheduleMatch) {
      return new HttpResponse({ status: 200, body: buildDemoSchedule(clinicScheduleMatch[1], contextId) });
    }

    const clinicOccupiedMatch = path.match(/^\/clinics\/([^/]+)\/schedule\/occupied$/);
    if (clinicOccupiedMatch) {
      return new HttpResponse({ status: 200, body: { timezone: 'America/Argentina/Buenos_Aires', items: [] } });
    }

    const clinicAvailMatch = path.match(/^\/clinics\/([^/]+)\/availability$/);
    if (clinicAvailMatch) {
      const cId = clinicAvailMatch[1];
      const fromDate = url.searchParams.get('from') || new Date().toISOString().slice(0, 10);
      const days = Number(url.searchParams.get('days') || 7);
      const bookings = buildDemoBookings(fromDate + 'T00:00:00Z', contextPatients, contextId, specialty);
      const bookedStarts = new Set(bookings.map((b) => `${b.clinicId}|${b.start}`));
      return new HttpResponse({ status: 200, body: buildDemoAvailability(cId, fromDate, days, contextId, bookedStarts) });
    }

    if (path === '/bookings') {
      const from = url.searchParams.get('from') || new Date().toISOString();
      const bookings = buildDemoBookings(from, contextPatients, contextId, specialty);
      return new HttpResponse({ status: 200, body: { items: bookings, page: 0, size: 100, totalElements: bookings.length } });
    }

    if (path === '/bookings/form') {
      return new HttpResponse({
        status: 200,
        body: { version: '1', questions: [{ key: 'motivo', label: 'Motivo breve', required: false }] },
      });
    }

    const bookingMatch = path.match(/^\/bookings\/([^/]+)$/);
    if (bookingMatch) {
      const bookings = buildDemoBookings(new Date().toISOString(), contextPatients, contextId, specialty);
      const b = bookings.find((item) => item.id === bookingMatch[1]) ?? bookings[0];
      return new HttpResponse({ status: 200, body: b });
    }

    const bookingEventsMatch = path.match(/^\/bookings\/([^/]+)\/events$/);
    if (bookingEventsMatch) {
      const bookings = buildDemoBookings(new Date().toISOString(), contextPatients, contextId, specialty);
      const b = bookings.find((item) => item.id === bookingEventsMatch[1]) ?? bookings[0];
      return new HttpResponse({ status: 200, body: { items: buildDemoBookingEvents(b) } });
    }

    const bookingPublicMatch = path.match(/^\/bookings\/([^/]+)\/public-details$/);
    if (bookingPublicMatch) {
      return new HttpResponse({ status: 200, body: null });
    }

    if (path === '/booking-publication') {
      return new HttpResponse({ status: 200, body: buildDemoPublication(contextId) });
    }

    if (path === '/secretaries') {
      return new HttpResponse({
        status: 200,
        body: {
          items: buildDemoSecretaries(),
          capabilities: { manage: false, reason: DEMO_TURNOS_READONLY_MESSAGE, validUntil: new Date(Date.now() + 86_400_000).toISOString() },
        },
      });
    }

    return null;
  }

  private toWorkspaceSetup(session: DemoSession, ctx: DemoContextRecord): WorkspaceSetup {
    const entry = findDemoSpecialty(ctx.specialtyId);
    return {
      id: session.workspaceId,
      specialtyContextId: ctx.specialtyContextId,
      version: ctx.version,
      specialty: { id: entry.id, code: entry.code, name: entry.name, description: entry.description },
      experience: demoSpecialtyExperience(entry),
      sourceWizardVersion: 1,
      draftSourceWizardVersion: ctx.draftDefinition ? 1 : null,
      onboardingCompleted: ctx.onboardingCompleted,
      currentStepKey: ctx.currentStepKey,
      definition: structuredClone(ctx.definition),
      draftDefinition: ctx.draftDefinition ? structuredClone(ctx.draftDefinition) : null,
    };
  }

  private toPreferences(ctx: DemoContextRecord | undefined): WorkspacePreferences {
    return {
      version: ctx?.preferencesVersion ?? 1,
      patientColumnsConfig: { ...(ctx?.patientColumnsConfig ?? {}) },
      quickNotes: ctx?.quickNotes ?? null,
    };
  }

  private toPatientListDTO(session: DemoSession, p: DemoPatientRecord, asOfDate: string): PatientListDTO {
    const months = ageInMonthsBetween(p.birthDate, asOfDate);
    const days = ageDaysBetween(p.birthDate, asOfDate);
    let ageGroup: PatientListDTO['ageGroup'] = 'ADULT';
    if (days <= 27) ageGroup = 'NEONATAL';
    else if (months < 12) ageGroup = 'INFANT';
    else if (months < 60) ageGroup = 'EARLY_CHILDHOOD';
    else if (months < 120) ageGroup = 'CHILD';
    else if (months < 240) ageGroup = 'ADOLESCENT';

    const pEncounters = session.encounters
      .filter((e) => e.patientId === p.id && e.specialtyContextId === p.specialtyContextId)
      .sort((a, b) => b.encounterDate.localeCompare(a.encounterDate));

    const schedule = computeVaccinationSchedule(p.id, p.version, p.birthDate, p.appliedVaccines, asOfDate);
    const hasPendingVaccine = schedule.doses.some((d) => d.status === 'PENDIENTE' || d.status === 'ACTUAL');

    return {
      id: p.id,
      specialtyContextId: p.specialtyContextId,
      fullName: p.fullName,
      birthDate: p.birthDate,
      nationalId: p.nationalId,
      phone: p.phone,
      gender: p.gender,
      ageInMonths: months,
      ageDisplay: formatAgeLabel(p.birthDate, asOfDate),
      ageGroup,
      hasPendingVaccine,
      totalEncounters: pEncounters.length,
      lastEncounterDate: pEncounters[0]?.encounterDate ?? null,
    };
  }

  private toPatientDetailDTO(session: DemoSession, p: DemoPatientRecord): PatientDetailDTO {
    const latestEnc = session.encounters
      .filter((e) => e.patientId === p.id && e.specialtyContextId === p.specialtyContextId)
      .sort((a, b) => b.encounterDate.localeCompare(a.encounterDate))[0];

    return {
      id: p.id,
      specialtyContextId: p.specialtyContextId,
      version: p.version,
      workspaceVersion: p.workspaceVersion,
      fullName: p.fullName,
      birthDate: p.birthDate,
      nationalId: p.nationalId,
      gender: p.gender,
      bloodType: p.bloodType,
      phone: p.phone,
      email: p.email,
      address: p.address,
      insuranceInfo: p.insuranceInfo,
      allergies: [],
      chronicConditions: [],
      guardianInfo: p.guardianInfo,
      personalHistory: p.personalHistory,
      familyHistory: p.familyHistory,
      latestMeasurements: latestEnc?.measurements ?? p.personalHistory?.birthMeasurements ?? null,
      formValues: structuredClone(p.formValues),
      formulaResults: structuredClone(p.formulaResults),
      formDefinitionSnapshot: structuredClone(p.formDefinitionSnapshot),
      formulaContext: structuredClone(p.formulaContext),
    };
  }

  private toClinicalSummary(
    session: DemoSession,
    p: DemoPatientRecord,
    ctx: DemoContextRecord | undefined,
  ): ClinicalSummary {
    const asOfDate = new Date().toISOString().slice(0, 10);
    const pEncounters = session.encounters
      .filter((e) => e.patientId === p.id && e.specialtyContextId === p.specialtyContextId)
      .sort((a, b) => b.encounterDate.localeCompare(a.encounterDate));
    const latestEnc = pEncounters[0] ?? null;

    const history: ClinicalSummary['history'] = {};
    for (const g of CLINICAL_HISTORY_GROUPS) {
      const entries = p.clinicalEntries.filter((e) => e.kind === g.kind && e.status === 'ACTIVE');
      if (entries.length > 0) {
        history[g.kind] = {
          status: 'PRESENT',
          items: entries.map((e) => e.text),
          certainty: entries[0].certainty,
          date: entries[0].date,
          source: 'PATIENT',
          sourceId: p.id,
        };
      } else if (p.formValues[g.status] === 'NONE') {
        history[g.kind] = {
          status: 'NONE',
          items: [],
          certainty: 'CONFIRMED',
          date: asOfDate,
          source: 'PATIENT',
          sourceId: p.id,
        };
      }
    }

    const recentMedications = session.prescriptions
      .filter((r) => r.patientId === p.id && r.specialtyContextId === p.specialtyContextId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .flatMap((r) =>
        r.prescriptions.map((m) => ({
          recordId: r.id,
          date: r.createdAt,
          name: m.medicationName,
          dosage: m.dosage,
          frequency: m.frequency,
        })),
      )
      .slice(0, 5);

    const entry = ctx ? findDemoSpecialty(ctx.specialtyId) : null;
    const hasVac = entry?.patientRecordTabs.includes('VACCINATION') ?? false;

    return {
      patientId: p.id,
      patientVersion: p.version,
      asOfDate,
      history,
      profile: {
        entries: structuredClone(p.clinicalEntries),
        noKnownAllergiesAt: p.noKnownAllergiesAt,
      },
      historical: [],
      recordedDiagnoses: pEncounters
        .filter((e) => e.primaryDiagnosisDescription)
        .map((e) => ({ id: e.id, date: e.encounterDate, diagnosis: e.primaryDiagnosisDescription! }))
        .slice(0, 5),
      lastEncounter: latestEnc
        ? {
            id: latestEnc.id,
            date: latestEnc.encounterDate,
            complaint: latestEnc.chiefComplaint ?? null,
            diagnosis: latestEnc.primaryDiagnosisDescription ?? null,
            followUp: latestEnc.followUpInstructions ?? null,
            followUpDate: latestEnc.followUpDate ?? null,
          }
        : null,
      vaccinations: hasVac
        ? computeVaccinationSchedule(p.id, p.version, p.birthDate, p.appliedVaccines, asOfDate)
        : null,
      recentMedications,
    };
  }

  private collectGrowthObservations(session: DemoSession, p: DemoPatientRecord): GrowthObservation[] {
    const obs: GrowthObservation[] = [];
    const birthM = p.personalHistory?.birthMeasurements;
    if (birthM && (birthM.weightKg || birthM.heightCm || birthM.headCircumferenceCm)) {
      obs.push({
        source: 'BIRTH',
        encounterId: null,
        date: p.birthDate,
        ageDays: 0,
        ageFormatted: 'Al nacer',
        weightKg: birthM.weightKg ?? null,
        heightCm: birthM.heightCm ?? null,
        headCircumferenceCm: birthM.headCircumferenceCm ?? null,
        measurementMode: 'RECUMBENT',
      });
    }

    const encs = session.encounters
      .filter((e) => e.patientId === p.id && e.specialtyContextId === p.specialtyContextId)
      .sort((a, b) => a.encounterDate.localeCompare(b.encounterDate));

    for (const enc of encs) {
      const m = enc.measurements;
      if (!m || (!m.weightKg && !m.heightCm && !m.headCircumferenceCm)) continue;
      const dateStr = enc.encounterDate.slice(0, 10);
      const ageDays = Math.max(0, ageDaysBetween(p.birthDate, dateStr));
      const modeVal = enc.formValues['heightMeasurementMode'];
      const mode: MeasurementMode =
        modeVal === 'RECUMBENT' || modeVal === 'STANDING' ? modeVal : ageDays <= 730 ? 'RECUMBENT' : 'STANDING';
      obs.push({
        source: 'ENCOUNTER',
        encounterId: enc.id,
        date: dateStr,
        ageDays,
        ageFormatted: formatAgeLabel(p.birthDate, dateStr),
        weightKg: m.weightKg ?? null,
        heightCm: m.heightCm ?? null,
        headCircumferenceCm: m.headCircumferenceCm ?? null,
        measurementMode: mode,
      });
    }
    return obs;
  }

  private buildEncounterRecord(
    id: number,
    ctx: DemoContextRecord,
    patient: DemoPatientRecord,
    consultationType: ClinicalEncounterRequest['consultationType'],
    values: WizardFormValues,
    encounterDate: string,
    version = 1,
  ): DemoEncounterRecord {
    const num = (k: string): number | null => {
      const v = values[k];
      if (typeof v === 'number' && Number.isFinite(v)) return v;
      if (typeof v === 'string' && v.trim()) {
        const n = Number(v.trim());
        return Number.isFinite(n) ? n : null;
      }
      return null;
    };
    const str = (k: string): string | null => {
      const v = values[k];
      return typeof v === 'string' && v.trim() ? v.trim() : null;
    };

    const weightKg = num('weightKg');
    const heightCm = num('heightCm');
    const headCircumferenceCm = num('headCircumferenceCm');
    const measurements =
      weightKg || heightCm || headCircumferenceCm ? { weightKg, heightCm, headCircumferenceCm } : null;

    const bp = str('bloodPressure');
    const bpParts = bp ? bp.match(/^(\d{2,3})\s*\/\s*(\d{2,3})$/) : null;
    const vitalSigns =
      bpParts || num('heartRate') || num('temperature') || num('oxygenSaturation')
        ? {
            systolicBloodPressure: bpParts ? Number(bpParts[1]) : null,
            diastolicBloodPressure: bpParts ? Number(bpParts[2]) : null,
            heartRate: num('heartRate'),
            temperatureCelsius: num('temperature'),
            oxygenSaturationPercent: num('oxygenSaturation'),
          }
        : null;

    const ageYears = Math.floor(ageInMonthsBetween(patient.birthDate, encounterDate.slice(0, 10)) / 12);
    const formulaResults = evaluateFormFormulas(ctx.definition.encounterForm.categories, values, {
      'patient.ageYears': ageYears,
      'patient.gender': patient.gender ?? 'UNKNOWN',
      'patient.latestWeightKg': weightKg,
      'patient.latestHeightCm': heightCm,
    });

    return {
      id,
      specialtyContextId: ctx.specialtyContextId,
      patientId: patient.id,
      version,
      workspaceVersion: ctx.version,
      encounterDate,
      consultationType,
      chiefComplaint: str('chiefComplaint'),
      historyOfPresentIllness: str('presentIllness'),
      physicalExamination: str('physicalExam') ?? str('skinExam'),
      primaryDiagnosisCode: null,
      primaryDiagnosisDescription: str('diagnosis') ?? str('assessment'),
      secondaryDiagnoses: null,
      clinicalImpression: str('assessment') ?? str('diagnosis'),
      treatmentPlan: str('treatment'),
      followUpInstructions: str('followUp') ?? str('patientInstructions') ?? str('treatment'),
      followUpDate: str('followUpDate'),
      diagnosticOrders: null,
      measurements,
      vitalSigns,
      prescriptions: null,
      formValues: values,
      formulaResults,
      formDefinitionSnapshot: structuredClone(ctx.definition.encounterForm),
      formulaContext: {},
    };
  }

  private toEncounterList(
    session: DemoSession,
    e: DemoEncounterRecord,
    ctx: DemoContextRecord | undefined,
  ): ClinicalEncounterList {
    const entry = findDemoSpecialty(ctx?.specialtyId ?? 1);
    const patient = session.patients.find((p) => p.id === e.patientId);
    return {
      id: e.id,
      specialtyContextId: e.specialtyContextId,
      patientId: e.patientId,
      patientFullName: patient?.fullName ?? `Paciente #${e.patientId}`,
      encounterDate: e.encounterDate,
      specialtyId: entry.id,
      specialty: { id: entry.id, code: entry.code, name: entry.name, description: entry.description },
      encounterTemplateId: e.encounterTemplateId ?? null,
      encounterTemplateName: e.encounterTemplateName ?? null,
      consultationType: e.consultationType,
      chiefComplaint: e.chiefComplaint,
      primaryDiagnosisCode: e.primaryDiagnosisCode,
      primaryDiagnosisDescription: e.primaryDiagnosisDescription,
      measurements: e.measurements,
      vitalSigns: e.vitalSigns,
      prescriptions: e.prescriptions,
      historyOfPresentIllness: e.historyOfPresentIllness,
      treatmentPlan: e.treatmentPlan,
      followUpInstructions: e.followUpInstructions,
      followUpDate: e.followUpDate,
      version: e.version,
      workspaceVersion: e.workspaceVersion,
      formValues: structuredClone(e.formValues),
      formulaResults: structuredClone(e.formulaResults),
      formDefinitionSnapshot: structuredClone(e.formDefinitionSnapshot),
      formulaContext: structuredClone(e.formulaContext),
    };
  }

  private toEncounterDetail(
    session: DemoSession,
    e: DemoEncounterRecord,
    ctx: DemoContextRecord | undefined,
  ): ClinicalEncounterDetail {
    return {
      ...this.toEncounterList(session, e, ctx),
      physicalExamination: e.physicalExamination,
      secondaryDiagnoses: e.secondaryDiagnoses,
      clinicalImpression: e.clinicalImpression,
      diagnosticOrders: e.diagnosticOrders,
    };
  }

  private toDashboard(session: DemoSession, contextId: number): ClinicalEncounterDashboard {
    const asOfDate = new Date().toISOString().slice(0, 10);
    const monthPrefix = asOfDate.slice(0, 7);
    const ctx = session.contexts.find((c) => c.specialtyContextId === contextId);
    const ctxPatients = session.patients.filter((p) => p.specialtyContextId === contextId);
    const ctxEncounters = session.encounters
      .filter((e) => e.specialtyContextId === contextId)
      .sort((a, b) => b.encounterDate.localeCompare(a.encounterDate));

    const encountersThisMonth = ctxEncounters.filter((e) => e.encounterDate.slice(0, 7) === monthPrefix).length;
    const encountersToday = ctxEncounters.filter((e) => e.encounterDate.slice(0, 10) === asOfDate).length;

    const recentEncounters = ctxEncounters.slice(0, 5).map((e) => {
      const p = ctxPatients.find((item) => item.id === e.patientId);
      return {
        encounter: this.toEncounterList(session, e, ctx),
        patientAgeLabel: p ? formatAgeLabel(p.birthDate, asOfDate) : '',
        patientNationalId: p?.nationalId ?? null,
        encounterLocalDate: e.encounterDate.slice(0, 10),
      };
    });

    const upcomingFollowUps: UpcomingFollowUp[] = ctxEncounters
      .filter((e) => e.followUpDate && e.followUpDate >= asOfDate)
      .slice(0, 5)
      .map((e) => {
        const p = ctxPatients.find((item) => item.id === e.patientId);
        return {
          encounterId: e.id,
          patientId: e.patientId,
          patientFullName: p?.fullName ?? `Paciente #${e.patientId}`,
          followUpDate: e.followUpDate!,
        };
      });

    const [yearStr, monthStr] = asOfDate.split('-');
    const baseYear = Number(yearStr);
    const baseMonth = Number(monthStr);
    const monthlyPatients: { month: string; patients: number }[] = [];
    for (let offset = 2; offset >= 0; offset--) {
      const d = new Date(Date.UTC(baseYear, baseMonth - 1 - offset, 1));
      const m = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
      const uniquePatients = new Set(
        ctxEncounters.filter((e) => e.encounterDate.slice(0, 7) === m).map((e) => e.patientId),
      );
      monthlyPatients.push({ month: m, patients: uniquePatients.size });
    }

    const firstVisitByPatient = new Map<number, string>();
    for (const e of ctxEncounters) {
      const ym = e.encounterDate.slice(0, 7);
      const prev = firstVisitByPatient.get(e.patientId);
      if (!prev || ym < prev) firstVisitByPatient.set(e.patientId, ym);
    }
    const firstVisitsThisMonth = [...firstVisitByPatient.values()].filter((ym) => ym === monthPrefix).length;
    const patientsWithoutEncounter = ctxPatients
      .filter((p) => !firstVisitByPatient.has(p.id))
      .map((p) => ({ patientId: p.id, patientFullName: p.fullName }));

    return {
      totalPatients: ctxPatients.length,
      asOfDate,
      encountersThisMonth,
      encountersToday,
      recentEncounters,
      upcomingFollowUps,
      patientActivity: {
        monthlyPatients,
        firstVisitsThisMonth,
        withoutEncounters: patientsWithoutEncounter.length,
        patientsWithoutEncounter,
      },
    };
  }

  private buildPrintDocument(
    session: DemoSession,
    patient: DemoPatientRecord,
    col: 'prescriptions' | 'encounters',
    itemId: number,
    ctx: DemoContextRecord | undefined,
  ): ClinicalPrintDocument {
    const entry = findDemoSpecialty(ctx?.specialtyId ?? 1);
    const asOfDate = new Date().toISOString().slice(0, 10);
    if (col === 'prescriptions') {
      const rx = session.prescriptions.find((r) => r.id === itemId && r.patientId === patient.id);
      return {
        source: 'PRESCRIPTION_RECORD',
        id: itemId,
        code: `RX-DEMO-${itemId}`,
        issuedAt: rx?.createdAt ?? new Date().toISOString(),
        type: rx?.type ?? 'PRESCRIPTION',
        patient: {
          id: patient.id,
          fullName: patient.fullName,
          nationalId: patient.nationalId,
          birthDate: patient.birthDate,
          ageAtIssue: formatAgeLabel(patient.birthDate, asOfDate),
          insuranceInfo: patient.insuranceInfo,
        },
        author: { userId: DEMO_CLINICIAN_ID, specialtyName: entry.name },
        primaryDiagnosisCode: null,
        primaryDiagnosisDescription: rx?.diagnosisDescription ?? null,
        patientInstructions: rx?.generalInstructions ?? null,
        prescriptions: rx?.prescriptions ?? [],
        diagnosticOrders: rx?.diagnosticOrders ?? [],
      };
    }

    const enc = session.encounters.find((e) => e.id === itemId && e.patientId === patient.id);
    return {
      source: 'ENCOUNTER',
      id: itemId,
      code: `HC-DEMO-${itemId}`,
      issuedAt: enc?.encounterDate ?? new Date().toISOString(),
      type: 'PRESCRIPTION',
      patient: {
        id: patient.id,
        fullName: patient.fullName,
        nationalId: patient.nationalId,
        birthDate: patient.birthDate,
        ageAtIssue: formatAgeLabel(patient.birthDate, asOfDate),
        insuranceInfo: patient.insuranceInfo,
      },
      author: { userId: DEMO_CLINICIAN_ID, specialtyName: entry.name },
      primaryDiagnosisCode: enc?.primaryDiagnosisCode ?? null,
      primaryDiagnosisDescription: enc?.primaryDiagnosisDescription ?? null,
      patientInstructions: enc?.treatmentPlan ?? null,
      prescriptions: enc?.prescriptions ?? [],
      diagnosticOrders: enc?.diagnosticOrders ?? [],
    };
  }

  private paginate<T>(items: T[], page: number, size: number): PagedResponse<T> {
    const safeSize = Math.max(1, size);
    const start = page * safeSize;
    const content = items.slice(start, start + safeSize);
    const totalElements = items.length;
    const totalPages = totalElements === 0 ? 0 : Math.ceil(totalElements / safeSize);
    return {
      content,
      totalElements,
      totalPages,
      number: page,
      size: safeSize,
      page: { size: safeSize, number: page, totalElements, totalPages },
    };
  }
}
