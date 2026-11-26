import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import {
  blankDemoSession,
  DemoSession,
  encodeDemoSession,
  MAX_FILE,
  parseDemoSession,
} from './demo-data';
import { createInitialDemoSession, generateCohortForContext } from './demo-generator';
import { DemoStorage, StoredDemoSession } from './demo-storage';

@Injectable({ providedIn: 'root' })
export class DemoSessionService {
  private readonly storage = new DemoStorage();
  private stored?: StoredDemoSession;
  private seedCounter = 1;

  readonly session = signal<DemoSession>(blankDemoSession());
  readonly ready = signal(false);
  readonly busy = signal(false);
  readonly active = signal(false);
  readonly notice = signal('');
  readonly error = signal('');
  readonly now = signal(Date.now());
  readonly until = signal(0);

  readonly hasSession = computed(() => this.session().contexts.length > 0 && this.active());
  readonly hasStoredSession = computed(() => this.session().contexts.length > 0);
  readonly activeContext = computed(
    () =>
      this.session().contexts.find((c) => c.specialtyContextId === this.session().activeContextId) ??
      this.session().contexts[0] ??
      null,
  );

  constructor() {
    if (typeof window !== 'undefined') {
      const checkExpiration = () => {
        this.now.set(Date.now());
        if (this.stored && this.stored.expiresAt <= this.now() && !this.busy()) {
          void this.load(true);
        }
      };
      const timer = window.setInterval(checkExpiration, 30_000);
      window.addEventListener('focus', checkExpiration);
      inject(DestroyRef).onDestroy(() => {
        window.clearInterval(timer);
        window.removeEventListener('focus', checkExpiration);
      });
    }
  }

  async load(expired = false): Promise<void> {
    this.busy.set(true);
    try {
      this.stored = await this.storage.load();
      const loaded = this.stored?.session ?? blankDemoSession();
      this.session.set(loaded);
      this.until.set(this.stored?.expiresAt ?? 0);
      this.active.set(loaded.contexts.length > 0);
      this.ready.set(true);
      if (expired) {
        this.active.set(false);
        this.notice.set('La sesión de DemoChart venció (24 hs). Podés generar un nuevo ejemplo o importar tu JSON.');
      }
    } catch (err) {
      this.ready.set(true);
      this.failed(err);
    } finally {
      this.busy.set(false);
    }
  }

  async commit(next: DemoSession, message = '', renew = false): Promise<boolean> {
    if (!this.ready()) return false;
    this.error.set('');
    if (message) this.notice.set('');
    this.busy.set(true);
    try {
      const encoded = encodeDemoSession(next);
      if (new Blob([encoded]).size > MAX_FILE) {
        throw new Error('La sesión supera el tamaño máximo exportable (12 MB). Quitá algunos estudios adjuntos.');
      }
      const validated = parseDemoSession(JSON.parse(encoded));
      this.stored = await this.storage.save(validated, this.stored, renew);
      this.session.set(this.stored.session);
      this.now.set(Date.now());
      this.until.set(this.stored.expiresAt);
      this.active.set(validated.contexts.length > 0);
      if (message) this.notice.set(message);
      return true;
    } catch (err) {
      this.failed(err);
      return false;
    } finally {
      this.busy.set(false);
    }
  }

  async mutate(mutator: (draft: DemoSession) => void, message = ''): Promise<DemoSession> {
    const draft = structuredClone(this.session());
    mutator(draft);
    const ok = await this.commit(draft, message);
    if (!ok) {
      throw new Error(this.error() || 'No se pudo guardar el cambio en DemoChart.');
    }
    return this.session();
  }

  async startWithSpecialty(specialtyId: number, openWizardFirst: boolean): Promise<boolean> {
    const generated = createInitialDemoSession(specialtyId, openWizardFirst);
    return this.commit(generated, '', true);
  }

  async regeneratePatients(mode: 'replace' | 'append'): Promise<boolean> {
    const ctx = this.activeContext();
    if (!ctx) return false;
    const draft = structuredClone(this.session());
    const cohort = generateCohortForContext(ctx, draft.nextId, this.seedCounter++);
    if (mode === 'replace') {
      draft.patients = draft.patients.filter((p) => p.specialtyContextId !== ctx.specialtyContextId);
      draft.encounters = draft.encounters.filter((e) => e.specialtyContextId !== ctx.specialtyContextId);
      draft.prescriptions = draft.prescriptions.filter((r) => r.specialtyContextId !== ctx.specialtyContextId);
      draft.studies = draft.studies.filter((s) => s.specialtyContextId !== ctx.specialtyContextId);
      draft.documents = draft.documents.filter((d) => d.specialtyContextId !== ctx.specialtyContextId);
      draft.revisions = draft.revisions.filter((r) => r.specialtyContextId !== ctx.specialtyContextId);
    }
    draft.patients.push(...cohort.patients);
    draft.encounters.push(...cohort.encounters);
    draft.prescriptions.push(...cohort.prescriptions);
    draft.studies.push(...cohort.studies);
    draft.revisions.push(...cohort.revisions);
    draft.nextId = cohort.nextId;

    const ok = await this.commit(
      draft,
      mode === 'replace'
        ? `Se generó una nueva tanda de ${cohort.patients.length} pacientes de ejemplo.`
        : `Se agregaron ${cohort.patients.length} pacientes nuevos al directorio.`,
    );
    if (ok && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('patient-created'));
    }
    return ok;
  }

  resumeActiveSession(): void {
    if (this.hasStoredSession()) {
      this.error.set('');
      this.notice.set('');
      this.active.set(true);
    }
  }

  returnToStart(): void {
    this.error.set('');
    this.notice.set('');
    this.active.set(false);
  }

  downloadSession(): void {
    if (!this.stored || this.stored.expiresAt <= Date.now()) {
      void this.load(true);
      return;
    }
    const url = URL.createObjectURL(new Blob([encodeDemoSession(this.session())], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'demochart-sesion.json';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async parseUploadedSession(file: File): Promise<DemoSession> {
    if (file.size > MAX_FILE) {
      throw new Error('La sesión de DemoChart debe pesar hasta 12 MB.');
    }
    try {
      return parseDemoSession(JSON.parse(await file.text()));
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new Error('El archivo seleccionado no contiene un JSON válido.');
      }
      throw err;
    }
  }

  async applyImportedSession(imported: DemoSession): Promise<boolean> {
    return this.commit(imported, 'Sesión de DemoChart importada correctamente.', true);
  }

  private failed(err: unknown): void {
    this.error.set(err instanceof Error ? err.message : 'La operación no se pudo completar.');
  }
}
