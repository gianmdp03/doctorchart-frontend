import {
  DoctorSpecialtyService
} from "./chunk-USM5S45Q.js";
import {
  environment
} from "./chunk-WKCAPCQH.js";
import {
  HttpClient,
  isPlatformBrowser
} from "./chunk-SYX7XZ26.js";
import {
  Injectable,
  PLATFORM_ID,
  computed,
  firstValueFrom,
  inject,
  setClassMetadata,
  signal,
  timeout,
  ɵɵdefineInjectable
} from "./chunk-3HO5VEWU.js";

// src/app/core/config/feature-flags.ts
var FEATURE_FLAGS = {
  AI_ASSISTANT_ENABLED: false,
  CALCULATORS_ENABLED: false
};

// src/app/core/models/specialty-experience.model.ts
var PATIENT_RECORD_MODULE_IDS = ["SUMMARY", "ENCOUNTERS", "VACCINATION", "GROWTH", "PRESCRIPTIONS", "STUDIES"];
var PATIENT_RECORD_ACTION_IDS = ["EDIT_PATIENT", "NEW_ENCOUNTER", "VIEW_GROWTH", "PRINT_DOCUMENT"];

// src/app/core/experience/clinical-navigation.ts
var CLINICAL_NAVIGATION = {
  DASHBOARD: { id: "DASHBOARD", path: "/dashboard", label: "Inicio", title: "Inicio", icon: "lucideLayoutDashboard" },
  PATIENTS: { id: "PATIENTS", path: "/pacientes", label: "Pacientes", title: "Directorio de Pacientes", icon: "lucideUsers" },
  CALCULATORS: { id: "CALCULATORS", path: "/calculadoras", label: "Calculadoras", title: "Calculadoras M\xE9dicas", icon: "lucideCalculator" },
  VACCINATION: { id: "VACCINATION", path: "/calendario-vacunacion", label: "Vacunaci\xF3n", title: "Calendario de vacunaci\xF3n", icon: "lucideCalendarDays" },
  WIZARD: { id: "WIZARD", path: "/onboarding/setup", label: "Personalizar Fichas", title: "Personalizar Fichas y Consultas", icon: "lucideSliders" }
};

// src/app/core/services/workspace.service.ts
var WorkspaceService = class _WorkspaceService {
  http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  getCurrentSetup() {
    return this.http.get(`${this.baseUrl}/workspace`);
  }
  selectSpecialty(payload) {
    return this.http.put(`${this.baseUrl}/workspace/specialty`, payload);
  }
  finishOnboarding(payload) {
    return this.http.post(`${this.baseUrl}/workspace/finish-onboarding`, payload);
  }
  saveOnboardingDraft(payload) {
    return this.http.put(`${this.baseUrl}/workspace/wizard/draft`, payload);
  }
  discardDraft(payload) {
    return this.http.post(`${this.baseUrl}/workspace/wizard/discard-draft`, payload);
  }
  resetToDefaults(payload) {
    return this.http.post(`${this.baseUrl}/workspace/reset-to-defaults`, payload);
  }
  getPreferences() {
    return this.http.get(`${this.baseUrl}/workspace/preferences`);
  }
  updateQuickNotes(payload) {
    return this.http.put(`${this.baseUrl}/workspace/quick-notes`, payload);
  }
  updateWorkspace(payload) {
    return this.http.put(`${this.baseUrl}/workspace/preferences`, payload);
  }
  static \u0275fac = function WorkspaceService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WorkspaceService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _WorkspaceService, factory: _WorkspaceService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WorkspaceService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/core/services/workspace.store.ts
var WorkspaceStore = class _WorkspaceStore {
  service = inject(WorkspaceService);
  specialtyService = inject(DoctorSpecialtyService);
  platformId = inject(PLATFORM_ID);
  currentSetup = signal(
    null,
    ...ngDevMode ? [{ debugName: "currentSetup" }] : (
      /* istanbul ignore next */
      []
    )
  );
  preferences = signal(
    null,
    ...ngDevMode ? [{ debugName: "preferences" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loaded = signal(
    false,
    ...ngDevMode ? [{ debugName: "loaded" }] : (
      /* istanbul ignore next */
      []
    )
  );
  error = signal(
    null,
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  preferencesError = signal(
    null,
    ...ngDevMode ? [{ debugName: "preferencesError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isMutating = signal(
    false,
    ...ngDevMode ? [{ debugName: "isMutating" }] : (
      /* istanbul ignore next */
      []
    )
  );
  setupLoading = signal(
    false,
    ...ngDevMode ? [{ debugName: "setupLoading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  preferencesLoading = signal(
    false,
    ...ngDevMode ? [{ debugName: "preferencesLoading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoading = computed(
    () => this.setupLoading() || this.preferencesLoading() || this.isMutating(),
    ...ngDevMode ? [{ debugName: "isLoading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isOnboardingCompleted = computed(
    () => this.currentSetup()?.onboardingCompleted ?? false,
    ...ngDevMode ? [{ debugName: "isOnboardingCompleted" }] : (
      /* istanbul ignore next */
      []
    )
  );
  definition = computed(
    () => this.currentSetup()?.definition ?? null,
    ...ngDevMode ? [{ debugName: "definition" }] : (
      /* istanbul ignore next */
      []
    )
  );
  draftDefinition = computed(
    () => this.currentSetup()?.draftDefinition ?? null,
    ...ngDevMode ? [{ debugName: "draftDefinition" }] : (
      /* istanbul ignore next */
      []
    )
  );
  experience = computed(
    () => this.currentSetup()?.experience ?? null,
    ...ngDevMode ? [{ debugName: "experience" }] : (
      /* istanbul ignore next */
      []
    )
  );
  calculatorsEnabled = signal(
    FEATURE_FLAGS.CALCULATORS_ENABLED,
    ...ngDevMode ? [{ debugName: "calculatorsEnabled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  navigation = computed(
    () => (this.experience()?.navigation ?? []).filter((id) => id !== "CALCULATORS" || this.calculatorsEnabled()).map((id) => CLINICAL_NAVIGATION[id]),
    ...ngDevMode ? [{ debugName: "navigation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  patientRecordTabs = computed(
    () => this.experience()?.patientRecordTabs ?? [],
    ...ngDevMode ? [{ debugName: "patientRecordTabs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasRecordTab(id) {
    return this.patientRecordTabs().includes(id);
  }
  patientRecordActions = computed(
    () => this.experience()?.patientRecordActions ?? [],
    ...ngDevMode ? [{ debugName: "patientRecordActions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasRecordAction(id) {
    return this.patientRecordActions().includes(id);
  }
  activeModules = computed(
    () => this.definition()?.modulesConfig ?? null,
    ...ngDevMode ? [{ debugName: "activeModules" }] : (
      /* istanbul ignore next */
      []
    )
  );
  patientVisibleColumns = computed(
    () => this.preferences()?.patientColumnsConfig ?? {},
    ...ngDevMode ? [{ debugName: "patientVisibleColumns" }] : (
      /* istanbul ignore next */
      []
    )
  );
  quickNotes = computed(
    () => this.preferences()?.quickNotes ?? null,
    ...ngDevMode ? [{ debugName: "quickNotes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  specialtyCode = computed(
    () => this.currentSetup()?.specialty.code ?? null,
    ...ngDevMode ? [{ debugName: "specialtyCode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  specialtyDisplayName = computed(
    () => this.currentSetup()?.specialty.name ?? null,
    ...ngDevMode ? [{ debugName: "specialtyDisplayName" }] : (
      /* istanbul ignore next */
      []
    )
  );
  setupPromise = null;
  preferencesPromise = null;
  epoch = 0;
  readRevision = 0;
  isModuleActive(code) {
    const modules = this.activeModules();
    return modules !== null && Object.hasOwn(modules, code) && modules[code] === true;
  }
  hasNavigation(id) {
    if (id === "CALCULATORS" && !this.calculatorsEnabled()) {
      return false;
    }
    return this.experience()?.navigation.includes(id) ?? false;
  }
  isColumnVisible(key) {
    return this.patientVisibleColumns()[key] !== false;
  }
  async loadSetup(force = false) {
    if (!isPlatformBrowser(this.platformId))
      return null;
    if (this.setupPromise)
      return this.setupPromise;
    if (!force && this.loaded())
      return this.clone(this.currentSetup());
    if (this.isMutating())
      throw new Error("Esper\xE1 a que termine el guardado antes de recargar.");
    const epoch = this.epoch;
    const revision = this.readRevision;
    this.setupLoading.set(true);
    this.error.set(null);
    const request = (async () => {
      try {
        const setup = await firstValueFrom(this.service.getCurrentSetup().pipe(timeout(6e3)));
        this.assertCurrent(epoch, revision);
        this.applySetup(setup);
        return this.clone(setup);
      } catch (error) {
        if (this.isCurrent(epoch, revision)) {
          this.error.set(this.message(error, "No se pudo cargar la configuraci\xF3n."));
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
  async loadPreferences(force = false) {
    if (this.preferencesPromise)
      return this.preferencesPromise;
    if (!force && this.preferences())
      return this.clone(this.preferences());
    if (this.isMutating())
      throw new Error("Esper\xE1 a que termine el guardado antes de recargar.");
    const epoch = this.epoch;
    const revision = this.readRevision;
    this.preferencesLoading.set(true);
    this.preferencesError.set(null);
    const request = (async () => {
      try {
        const result = await firstValueFrom(this.service.getPreferences().pipe(timeout(6e3)));
        this.assertCurrent(epoch, revision);
        if (this.currentSetup() && this.currentSetup().version !== result.version) {
          const setup = await firstValueFrom(this.service.getCurrentSetup().pipe(timeout(6e3)));
          this.assertCurrent(epoch, revision);
          this.applySetup(setup);
        }
        this.applyPreferences(result);
        return this.clone(result);
      } catch (error) {
        if (this.isCurrent(epoch, revision))
          this.preferencesError.set(this.message(error, "No se pudieron cargar las preferencias."));
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
  selectSpecialty(specialtyId, expectedVersion) {
    return this.mutate(() => this.service.selectSpecialty({ specialtyId, expectedVersion }), (result) => this.applySetup(result));
  }
  saveOnboardingDraft(payload) {
    const request = this.clone(payload);
    return this.mutate(() => this.service.saveOnboardingDraft(request), (result) => this.applySetup(result));
  }
  finishOnboarding(expectedVersion) {
    return this.mutate(() => this.service.finishOnboarding({ expectedVersion }), (result) => this.applySetup(result));
  }
  resetToDefaults(expectedVersion) {
    return this.mutate(() => this.service.resetToDefaults({ expectedVersion }), (result) => this.applySetup(result));
  }
  discardDraft(expectedVersion) {
    return this.mutate(() => this.service.discardDraft({ expectedVersion }), (result) => this.applySetup(result));
  }
  updateWorkspace(payload) {
    const request = this.clone(payload);
    return this.mutate(() => this.service.updateWorkspace(request), (result) => this.applyPreferences(result), true);
  }
  updateQuickNotes(content) {
    return this.mutate(() => this.service.updateQuickNotes({ content }), (result) => this.applyPreferences(result), true);
  }
  clearSetup() {
    ++this.epoch;
    this.invalidateReads();
    this.currentSetup.set(null);
    this.preferences.set(null);
    this.loaded.set(false);
    this.error.set(null);
    this.preferencesError.set(null);
    this.isMutating.set(false);
    this.specialtyService.clearSpecialty();
  }
  setSetup(setup) {
    this.invalidateReads();
    this.applySetup(setup);
  }
  async mutate(operation, apply, refreshSetup = false) {
    if (this.isMutating())
      throw new Error("Hay un guardado en curso. Esper\xE1 a que termine.");
    const epoch = this.epoch;
    this.invalidateReads();
    this.isMutating.set(true);
    this.error.set(null);
    try {
      const result = await firstValueFrom(operation().pipe(timeout(1e4)));
      if (epoch !== this.epoch)
        throw new Error("La sesi\xF3n cambi\xF3. La respuesta anterior fue descartada.");
      if (refreshSetup) {
        const setup = await firstValueFrom(this.service.getCurrentSetup().pipe(timeout(6e3)));
        if (epoch !== this.epoch)
          throw new Error("La sesi\xF3n cambi\xF3. La respuesta anterior fue descartada.");
        this.applySetup(setup);
      }
      apply(this.clone(result));
      return this.clone(result);
    } catch (error) {
      if (epoch === this.epoch) {
        this.error.set(this.message(error, "No se pudo guardar la configuraci\xF3n."));
        if (refreshSetup)
          this.loaded.set(false);
      }
      throw error;
    } finally {
      if (epoch === this.epoch)
        this.isMutating.set(false);
    }
  }
  applySetup(setup) {
    const current = this.clone(setup);
    if (current) {
      const experience = current.experience;
      if (!experience || experience.specialtyId !== current.specialty.id || !Number.isSafeInteger(experience.specialtyVersion) || experience.specialtyVersion < 0 || !Array.isArray(experience.navigation) || experience.navigation.some((id) => !Object.hasOwn(CLINICAL_NAVIGATION, id)) || new Set(experience.navigation).size !== experience.navigation.length || !["DASHBOARD", "PATIENTS", "WIZARD"].every((id) => experience.navigation.includes(id)) || !Array.isArray(experience.patientRecordTabs) || experience.patientRecordTabs.some((id) => !PATIENT_RECORD_MODULE_IDS.includes(id)) || new Set(experience.patientRecordTabs).size !== experience.patientRecordTabs.length || !["SUMMARY", "ENCOUNTERS"].every((id) => experience.patientRecordTabs.includes(id)) || !Array.isArray(experience.patientRecordActions) || experience.patientRecordActions.some((id) => !PATIENT_RECORD_ACTION_IDS.includes(id)) || new Set(experience.patientRecordActions).size !== experience.patientRecordActions.length) {
        throw new Error("La experiencia recibida no corresponde a una configuraci\xF3n v\xE1lida de esta especialidad.");
      }
    }
    this.currentSetup.set(current);
    this.loaded.set(true);
    this.specialtyService.setSpecialty(current?.specialty ?? null);
    this.specialtyService.setDefinition(current?.definition ?? null);
    if (!current)
      this.preferences.set(null);
  }
  applyPreferences(result) {
    this.preferences.set(this.clone(result));
    if (this.currentSetup() && this.currentSetup().version !== result.version)
      this.loaded.set(false);
  }
  invalidateReads() {
    ++this.readRevision;
    this.setupPromise = null;
    this.preferencesPromise = null;
    this.setupLoading.set(false);
    this.preferencesLoading.set(false);
  }
  isCurrent(epoch, revision) {
    return epoch === this.epoch && revision === this.readRevision;
  }
  assertCurrent(epoch, revision) {
    if (!this.isCurrent(epoch, revision))
      throw new Error("La configuraci\xF3n cambi\xF3 durante la carga. Recarg\xE1 antes de continuar.");
  }
  clone(value) {
    return structuredClone(value);
  }
  message(error, fallback) {
    if (error && typeof error === "object" && "error" in error) {
      const body = error.error;
      if (body && typeof body === "object" && "message" in body && typeof body.message === "string")
        return body.message;
    }
    return error instanceof Error ? error.message : fallback;
  }
  static \u0275fac = function WorkspaceStore_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WorkspaceStore)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _WorkspaceStore, factory: _WorkspaceStore.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WorkspaceStore, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  FEATURE_FLAGS,
  WorkspaceStore
};
//# debugId=05087020-d3a2-54b3-aac3-2ad67ab6319c
//# sourceMappingURL=chunk-WPGAV52V.js.map
