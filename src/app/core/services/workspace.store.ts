import { ClinicalContextService } from './clinical-context.service';
import { ClinicalNavigationId, PatientRecordModuleId, PATIENT_RECORD_MODULE_IDS, PatientRecordActionId, PATIENT_RECORD_ACTION_IDS } from '../models/specialty-experience.model';
import { CLINICAL_NAVIGATION } from '../experience/clinical-navigation';
import { FEATURE_FLAGS } from '../config/feature-flags';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom, Observable, timeout } from 'rxjs';
import { WorkspaceService } from './workspace.service';
import { DoctorSpecialtyService } from './doctor-specialty.service';
import { SaveOnboardingDraftRequest, SpecialtyContextSummary, WorkspacePreferences, WorkspaceSetup, WorkspaceUpdateRequest } from '../models/workspace.model';

@Injectable({ providedIn: 'root' })
export class WorkspaceStore {
  readonly contexts=signal<SpecialtyContextSummary[]>([]);
  readonly hasReadyContext=computed(()=>this.contexts().some(c=>c.ready)||this.isOnboardingCompleted());
  private contextsPromise:Promise<SpecialtyContextSummary[]>|null=null;
  private contextsLoaded=false;
  private requestedContext:number|null=null;
  private accountEpoch=0;

  async loadContexts(force=false):Promise<SpecialtyContextSummary[]>{
    if(!force&&this.contextsLoaded)return this.clone(this.contexts());
    if(this.contextsPromise)return this.contextsPromise;
    const epoch=this.accountEpoch;
    const request=(async()=>{try{const result=await firstValueFrom(this.service.getContexts().pipe(timeout(6000)));if(epoch!==this.accountEpoch)throw Error('La sesión cambió.');const known=this.contexts();const merged=result.map(item=>{const local=known.find(c=>c.id===item.id);return local&&local.version>item.version?local:item;});merged.push(...known.filter(c=>!result.some(item=>item.id===c.id)));this.contexts.set(this.clone(merged));this.contextsLoaded=true;return this.clone(merged);}finally{if(epoch===this.accountEpoch)this.contextsPromise=null;}})();this.contextsPromise=request;return request;
  }
  async activateContext(id:number):Promise<WorkspaceSetup|null>{
    if(!Number.isSafeInteger(id)||id<1)throw Error('Elegí una especialidad válida.');
    if(this.isMutating())throw Error('Esperá a que termine el guardado.');
    const contexts=await this.loadContexts();if(!contexts.some(c=>c.id===id))throw Error('Esta especialidad no pertenece a tu cuenta.');
    if(this.currentSetup()?.specialtyContextId===id&&this.requestedContext===id&&this.loaded())return this.clone(this.currentSetup());
    const epoch=++this.epoch;this.invalidateReads();this.requestedContext=id;
    const setup=await firstValueFrom(this.service.getCurrentSetup(id).pipe(timeout(6000)));
    if(epoch!==this.epoch||setup?.specialtyContextId!==id)throw Error('La especialidad cambió durante la carga.');
    this.requestedContext=id;this.preferences.set(null);this.applySetup(setup);return this.clone(setup);
  }
  addContext(specialtyId:number):Promise<WorkspaceSetup>{return this.mutate(()=>this.service.addContext(specialtyId),result=>this.recordContext(result));}
  private readonly service = inject(WorkspaceService);
  private readonly clinicalContext = inject(ClinicalContextService);
  private readonly specialtyService = inject(DoctorSpecialtyService);
  private readonly platformId = inject(PLATFORM_ID);
  readonly currentSetup = signal<WorkspaceSetup | null>(null);
  readonly preferences = signal<WorkspacePreferences | null>(null);
  readonly specialtyContextId = computed(() => this.currentSetup()?.specialtyContextId ?? null);
  readonly loaded = signal(false);
  readonly error = signal<string | null>(null);
  readonly preferencesError = signal<string | null>(null);
  readonly isMutating = signal(false);
  private readonly setupLoading = signal(false);
  private readonly preferencesLoading = signal(false);
  readonly isLoading = computed(() => this.setupLoading() || this.preferencesLoading() || this.isMutating());
  readonly isOnboardingCompleted = computed(() => !!this.currentSetup()?.onboardingCompleted && !!this.currentSetup()?.definition);
  readonly definition = computed(() => this.currentSetup()?.definition ?? null);
  readonly draftDefinition = computed(() => this.currentSetup()?.draftDefinition ?? null);
  readonly experience = computed(() => this.currentSetup()?.experience ?? null);
  readonly calculatorsEnabled = signal(FEATURE_FLAGS.CALCULATORS_ENABLED);
  readonly clinicsEnabled = signal(FEATURE_FLAGS.CLINICS_ENABLED);
  readonly navigation = computed(() =>
    (this.experience()?.navigation ?? [])
      .filter(id => id !== 'CALCULATORS' || this.calculatorsEnabled())
      .map(id => CLINICAL_NAVIGATION[id])
  );
  readonly patientRecordTabs = computed(() => this.experience()?.patientRecordTabs ?? []);
  hasRecordTab(id: PatientRecordModuleId): boolean { return this.patientRecordTabs().includes(id); }
  readonly patientRecordActions = computed(() => this.experience()?.patientRecordActions ?? []);
  hasRecordAction(id: PatientRecordActionId): boolean { return this.patientRecordActions().includes(id); }
  readonly activeModules = computed(() => this.definition()?.modulesConfig ?? null);
  readonly patientVisibleColumns = computed(() => this.preferences()?.patientColumnsConfig ?? {});
  readonly quickNotes = computed(() => this.preferences()?.quickNotes ?? null);
  readonly specialtyCode = computed(() => this.currentSetup()?.specialty.code ?? null);
  readonly specialtyDisplayName = computed(() => this.currentSetup()?.specialty.name ?? null);
  private setupPromise: Promise<WorkspaceSetup | null> | null = null;
  private preferencesPromise: Promise<WorkspacePreferences> | null = null;
  private epoch = 0;
  private readRevision = 0;

  isModuleActive(code: string): boolean {
    const modules = this.activeModules();
    return modules !== null && Object.hasOwn(modules, code) && modules[code as keyof typeof modules] === true;
  }
  hasNavigation(id: ClinicalNavigationId): boolean {
    if (id === 'CALCULATORS' && !this.calculatorsEnabled()) {
      return false;
    }
    return this.experience()?.navigation.includes(id) ?? false;
  }
  isColumnVisible(key: string): boolean { return this.patientVisibleColumns()[key] !== false; }

  async loadSetup(force = false): Promise<WorkspaceSetup | null> {
    if (!isPlatformBrowser(this.platformId)) return null;
    if (this.setupPromise) return this.setupPromise;
    if (!force && this.loaded()) return this.clone(this.currentSetup());
    if (this.isMutating()) throw new Error('Esperá a que termine el guardado antes de recargar.');
    const startingEpoch=this.epoch;
    if(this.requestedContext===null){
      const contexts=await this.loadContexts();
      if(startingEpoch!==this.epoch)throw Error('La sesión cambió durante la carga.');
      const url=new URL(globalThis.location?.href??'http://localhost');const explicit=url.searchParams.get('specialtyContextId');
      let preferred:number|null=null;try{preferred=Number(sessionStorage.getItem('doctorchart_context:'+contexts[0]?.workspaceId))||null;}catch{}
      const target=explicit?Number(explicit):contexts.some(c=>c.id===preferred)?preferred:contexts.length===1?contexts[0].id:null;
      if(target!==null){if(!contexts.some(c=>c.id===target))throw Error('Esta especialidad no está disponible.');this.requestedContext=target;}
      else {this.applySetup(null);return null;}
    }
    if(this.setupPromise)return this.setupPromise;
    const epoch = this.epoch;
    const revision = this.readRevision;
    this.setupLoading.set(true);
    this.error.set(null);
    const request = (async () => {
      try {
        const id=this.requestedContext!;
        const setup = await firstValueFrom(this.service.getCurrentSetup(id).pipe(timeout(6000)));
        this.assertCurrent(epoch, revision);
        if(setup?.specialtyContextId!==id)throw Error('La configuración no corresponde a la especialidad solicitada.');
        this.applySetup(setup);
        return this.clone(setup);
      } catch (error) {
        if (this.isCurrent(epoch, revision)) {
          this.error.set(this.message(error, 'No se pudo cargar la configuración.'));
          this.loaded.set(false);
        }
        throw error;
      } finally {
        if (this.isCurrent(epoch, revision)) {
          this.setupLoading.set(false);
          this.setupPromise = null;
        }
      }
    })();
    this.setupPromise = request;
    return request;
  }

  async loadPreferences(force = false): Promise<WorkspacePreferences> {
    if (this.preferencesPromise) return this.preferencesPromise;
    if (!force && this.preferences()) return this.clone(this.preferences()!);
    if (this.isMutating()) throw new Error('Esperá a que termine el guardado antes de recargar.');
    const epoch = this.epoch;
    const revision = this.readRevision;
    this.preferencesLoading.set(true);
    this.preferencesError.set(null);
    const request = (async () => {
      try {
        const result = await firstValueFrom(this.service.getPreferences(this.specialtyContextId()??undefined).pipe(timeout(6000)));
        this.assertCurrent(epoch, revision);
        this.applyPreferences(result);
        return this.clone(result);
      } catch (error) {
        if (this.isCurrent(epoch, revision)) this.preferencesError.set(this.message(error, 'No se pudieron cargar las preferencias.'));
        throw error;
      } finally {
        if (this.isCurrent(epoch, revision)) {
          this.preferencesLoading.set(false);
          this.preferencesPromise = null;
        }
      }
    })();
    this.preferencesPromise = request;
    return request;
  }

  selectSpecialty(specialtyId: number, expectedVersion: number | null): Promise<WorkspaceSetup> {
    return this.mutate(() => this.service.selectSpecialty({ specialtyId, expectedVersion, ...this.contextIdentity() }), result => this.applySetup(result));
  }
  saveOnboardingDraft(payload: SaveOnboardingDraftRequest): Promise<WorkspaceSetup> {
    const request = this.clone(payload);
    return this.mutate(() => this.service.saveOnboardingDraft({ ...request, ...this.contextIdentity() }), result => this.applySetup(result));
  }
  finishOnboarding(expectedVersion: number): Promise<WorkspaceSetup> {
    return this.mutate(() => this.service.finishOnboarding({ expectedVersion, ...this.contextIdentity() }), result => this.applySetup(result));
  }
  resetToDefaults(expectedVersion: number): Promise<WorkspaceSetup> {
    return this.mutate(() => this.service.resetToDefaults({ expectedVersion, ...this.contextIdentity() }), result => this.applySetup(result));
  }
  discardDraft(expectedVersion: number): Promise<WorkspaceSetup> {
    return this.mutate(() => this.service.discardDraft({ expectedVersion, ...this.contextIdentity() }), result => this.applySetup(result));
  }
  updateWorkspace(payload: WorkspaceUpdateRequest): Promise<WorkspacePreferences> {
    const request = this.clone(payload);
    const context=this.specialtyContextId()??undefined;return this.mutate(() => this.service.updateWorkspace(request,context), result => this.applyPreferences(result));
  }
  updateQuickNotes(content: string | null): Promise<WorkspacePreferences> {
    const context=this.specialtyContextId()??undefined;return this.mutate(() => this.service.updateQuickNotes({ content },context), result => this.applyPreferences(result));
  }

  clearSetup(): void {
    ++this.accountEpoch;
    ++this.epoch;
    this.invalidateReads();
    this.contexts.set([]);this.contextsLoaded=false;this.contextsPromise=null;this.requestedContext=null;
    this.currentSetup.set(null);
    this.clinicalContext.bind(null);
    this.preferences.set(null);
    this.loaded.set(false);
    this.error.set(null);
    this.preferencesError.set(null);
    this.isMutating.set(false);
    this.specialtyService.clearSpecialty();
  }
  setSetup(setup: WorkspaceSetup): void {
    this.invalidateReads();
    this.applySetup(setup);
  }

  private async mutate<T>(operation: () => Observable<T>, apply: (result: T) => void): Promise<T> {
    if (this.isMutating()) throw new Error('Hay un guardado en curso. Esperá a que termine.');
    const epoch = this.epoch;
    this.invalidateReads();
    this.isMutating.set(true);
    this.error.set(null);
    try {
      const result = await firstValueFrom(operation().pipe(timeout(10000)));
      if (epoch !== this.epoch) throw new Error('La sesión cambió. La respuesta anterior fue descartada.');
      apply(this.clone(result));
      return this.clone(result);
    } catch (error) {
      if (epoch === this.epoch) {
        this.error.set(this.message(error, 'No se pudo guardar la configuración.'));
      }
      throw error;
    } finally {
      if (epoch === this.epoch) this.isMutating.set(false);
    }
  }
  private applySetup(setup: WorkspaceSetup | null): void {
    const current = this.clone(setup);
    if (current) {
      const experience = current.experience;
      if (!experience || experience.specialtyId !== current.specialty.id || !Number.isSafeInteger(experience.specialtyVersion)
          || experience.specialtyVersion < 0 || !Array.isArray(experience.navigation)
          || experience.navigation.some(id => !Object.hasOwn(CLINICAL_NAVIGATION, id))
          || new Set(experience.navigation).size !== experience.navigation.length
          || !(['DASHBOARD', 'PATIENTS', 'WIZARD'] as const).every(id => experience.navigation.includes(id))
          || !Array.isArray(experience.patientRecordTabs)
          || experience.patientRecordTabs.some(id => !PATIENT_RECORD_MODULE_IDS.includes(id))
          || new Set(experience.patientRecordTabs).size !== experience.patientRecordTabs.length
          || !(['SUMMARY', 'ENCOUNTERS'] as const).every(id => experience.patientRecordTabs.includes(id))
          || !Array.isArray(experience.patientRecordActions)
          || experience.patientRecordActions.some(id => !PATIENT_RECORD_ACTION_IDS.includes(id))
          || new Set(experience.patientRecordActions).size !== experience.patientRecordActions.length) {
        throw new Error('La experiencia recibida no corresponde a una configuración válida de esta especialidad.');
      }
    }
    this.clinicalContext.bind(current?.specialtyContextId ?? null);
    this.currentSetup.set(current);
    if(current){this.requestedContext=current.specialtyContextId;this.recordContext(current);try{sessionStorage.setItem('doctorchart_context:'+current.id,String(current.specialtyContextId));}catch{}}
    this.loaded.set(true);
    this.specialtyService.setSpecialty(current?.specialty ?? null);
    this.specialtyService.setDefinition(current?.definition ?? null);
    if (!current) this.preferences.set(null);
  }
  private contextIdentity(): { specialtyContextId?: number } {
    const id = this.specialtyContextId();
    return id === null ? {} : { specialtyContextId: id };
  }
  private recordContext(setup:WorkspaceSetup){const item:SpecialtyContextSummary={id:setup.specialtyContextId,workspaceId:setup.id,version:setup.version,specialty:setup.specialty,onboardingCompleted:setup.onboardingCompleted,ready:setup.onboardingCompleted&&!!setup.definition,hasDraft:!!setup.draftDefinition};this.contexts.update(all=>[...all.filter(c=>c.id!==item.id),item]);}
  private applyPreferences(result: WorkspacePreferences): void {
    this.preferences.set(this.clone(result));
  }
  private invalidateReads(): void {
    ++this.readRevision;
    this.setupPromise = null;
    this.preferencesPromise = null;
    this.setupLoading.set(false);
    this.preferencesLoading.set(false);
  }
  private isCurrent(epoch: number, revision: number): boolean { return epoch === this.epoch && revision === this.readRevision; }
  private assertCurrent(epoch: number, revision: number): void {
    if (!this.isCurrent(epoch, revision)) throw new Error('La configuración cambió durante la carga. Recargá antes de continuar.');
  }
  private clone<T>(value: T): T { return structuredClone(value); }
  private message(error: unknown, fallback: string): string {
    if (error && typeof error === 'object' && 'error' in error) {
      const body = error.error;
      if (body && typeof body === 'object' && 'message' in body && typeof body.message === 'string') return body.message;
    }
    return error instanceof Error ? error.message : fallback;
  }
}
