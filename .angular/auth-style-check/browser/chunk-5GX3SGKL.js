import {
  ActivePatientService
} from "./chunk-KDJQW6YV.js";
import {
  AuthService
} from "./chunk-KGUDCUHJ.js";
import {
  environment
} from "./chunk-WKCAPCQH.js";
import {
  HttpClient,
  HttpParams
} from "./chunk-SYX7XZ26.js";
import {
  Injectable,
  effect,
  inject,
  setClassMetadata,
  signal,
  tap,
  untracked,
  ɵɵdefineInjectable
} from "./chunk-3HO5VEWU.js";

// src/app/core/services/clinical-encounter.service.ts
var ClinicalEncounterService = class _ClinicalEncounterService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/encounters`;
  auth = inject(AuthService);
  activePatient = inject(ActivePatientService);
  contextKey() {
    return JSON.stringify([this.auth.currentUser()?.id ?? null, this.activePatient.patientId()]);
  }
  context = this.contextKey();
  syncContext() {
    const context = this.contextKey();
    if (context !== this.context) {
      this.context = context;
      this.clear();
    }
  }
  detailRead = 0;
  listRead = 0;
  constructor() {
    effect(() => {
      this.auth.currentUser();
      this.activePatient.patientId();
      untracked(() => this.syncContext());
    });
  }
  generation = 0;
  clear() {
    this.generation++;
    this.detailRead++;
    this.listRead++;
    this.encounters.set([]);
    this.currentEncounter.set(null);
    this.loading.set(false);
  }
  encounters = signal(
    [],
    ...ngDevMode ? [{ debugName: "encounters" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentEncounter = signal(
    null,
    ...ngDevMode ? [{ debugName: "currentEncounter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loading = signal(
    false,
    ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  getById(id) {
    this.syncContext();
    const read = ++this.detailRead;
    const generation = this.generation;
    const context = this.context;
    const owner = this.auth.currentUser()?.id;
    this.currentEncounter.set(null);
    this.loading.set(true);
    return this.http.get(`${this.baseUrl}/${id}`).pipe(tap({
      next: (detail) => {
        if (generation !== this.generation || owner !== this.auth.currentUser()?.id || context !== this.contextKey())
          return;
        if (read !== this.detailRead || detail.id !== id)
          return;
        this.currentEncounter.set(detail);
        this.loading.set(false);
      },
      error: () => {
        if (generation === this.generation && owner === this.auth.currentUser()?.id && context === this.contextKey() && read === this.detailRead)
          this.loading.set(false);
      }
    }));
  }
  getAll(page = 0, size = 50, sort = "encounterDate,desc", search) {
    let params = new HttpParams().set("page", page).set("size", size).set("sort", sort);
    if (search?.trim())
      params = params.set("search", search.trim());
    return this.http.get(this.baseUrl, { params });
  }
  getDashboard() {
    return this.http.get(`${this.baseUrl}/dashboard`);
  }
  getByPatient(patientId) {
    this.syncContext();
    const read = ++this.listRead;
    const generation = this.generation;
    const context = this.context;
    const owner = this.auth.currentUser()?.id;
    this.encounters.set([]);
    this.loading.set(true);
    return this.http.get(`${this.baseUrl}/patient/${patientId}`).pipe(tap({
      next: (list) => {
        if (generation !== this.generation || owner !== this.auth.currentUser()?.id || context !== this.contextKey())
          return;
        if (read !== this.listRead)
          return;
        this.encounters.set(list);
        this.loading.set(false);
      },
      error: () => {
        if (generation === this.generation && owner === this.auth.currentUser()?.id && context === this.contextKey() && read === this.listRead)
          this.loading.set(false);
      }
    }));
  }
  getByPatientAndSpecialty(patientId, specialtyId) {
    this.syncContext();
    const read = ++this.listRead;
    const generation = this.generation;
    const context = this.context;
    const owner = this.auth.currentUser()?.id;
    this.encounters.set([]);
    this.loading.set(true);
    return this.http.get(`${this.baseUrl}/patient/${patientId}/specialty/${specialtyId}`).pipe(tap({
      next: (list) => {
        if (generation !== this.generation || owner !== this.auth.currentUser()?.id || context !== this.contextKey())
          return;
        if (read !== this.listRead)
          return;
        this.encounters.set(list);
        this.loading.set(false);
      },
      error: () => {
        if (generation === this.generation && owner === this.auth.currentUser()?.id && context === this.contextKey() && read === this.listRead)
          this.loading.set(false);
      }
    }));
  }
  create(request) {
    this.syncContext();
    const generation = this.generation;
    const context = this.context;
    const owner = this.auth.currentUser()?.id;
    this.loading.set(true);
    return this.http.post(this.baseUrl, request).pipe(tap({
      next: (created) => {
        if (generation !== this.generation || owner !== this.auth.currentUser()?.id || context !== this.contextKey())
          return;
        this.currentEncounter.set(created);
        this.loading.set(false);
      },
      error: () => {
        if (generation === this.generation && owner === this.auth.currentUser()?.id && context === this.contextKey())
          this.loading.set(false);
      }
    }));
  }
  update(id, request) {
    this.syncContext();
    const generation = this.generation;
    const context = this.context;
    const owner = this.auth.currentUser()?.id;
    this.loading.set(true);
    return this.http.put(`${this.baseUrl}/${id}`, request).pipe(tap({
      next: (updated) => {
        if (generation !== this.generation || owner !== this.auth.currentUser()?.id || context !== this.contextKey())
          return;
        this.currentEncounter.set(updated);
        this.loading.set(false);
      },
      error: () => {
        if (generation === this.generation && owner === this.auth.currentUser()?.id && context === this.contextKey())
          this.loading.set(false);
      }
    }));
  }
  delete(id) {
    this.syncContext();
    const generation = this.generation;
    const context = this.context;
    const owner = this.auth.currentUser()?.id;
    this.loading.set(true);
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(tap({
      next: () => {
        if (generation !== this.generation || owner !== this.auth.currentUser()?.id || context !== this.contextKey())
          return;
        this.encounters.update((list) => list.filter((item) => item.id !== id));
        if (this.currentEncounter()?.id === id) {
          this.currentEncounter.set(null);
        }
        this.loading.set(false);
      },
      error: () => {
        if (generation === this.generation && owner === this.auth.currentUser()?.id && context === this.contextKey())
          this.loading.set(false);
      }
    }));
  }
  static \u0275fac = function ClinicalEncounterService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ClinicalEncounterService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ClinicalEncounterService, factory: _ClinicalEncounterService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClinicalEncounterService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

export {
  ClinicalEncounterService
};
//# debugId=8ab57c90-1b3c-5456-b465-4aa4d004cb13
//# sourceMappingURL=chunk-5GX3SGKL.js.map
