import {
  environment
} from "./chunk-WKCAPCQH.js";
import {
  HttpClient,
  HttpErrorResponse,
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

// src/app/core/services/doctor-profile.service.ts
var DoctorProfileService = class _DoctorProfileService {
  http = inject(HttpClient);
  platformId = inject(PLATFORM_ID);
  profile = signal(
    null,
    ...ngDevMode ? [{ debugName: "profile" }] : (
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
  hasSpecialty = computed(
    () => this.profile()?.specialty != null,
    ...ngDevMode ? [{ debugName: "hasSpecialty" }] : (
      /* istanbul ignore next */
      []
    )
  );
  specialty = computed(
    () => this.profile()?.specialty ?? null,
    ...ngDevMode ? [{ debugName: "specialty" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSpecialtyLocked = computed(
    () => this.profile()?.isSpecialtyLocked ?? false,
    ...ngDevMode ? [{ debugName: "isSpecialtyLocked" }] : (
      /* istanbul ignore next */
      []
    )
  );
  request = null;
  epoch = 0;
  async loadProfile(force = false) {
    if (!isPlatformBrowser(this.platformId))
      return null;
    if (this.request)
      return this.request;
    if (!force && this.loaded())
      return structuredClone(this.profile());
    const epoch = this.epoch;
    this.loading.set(true);
    this.error.set(null);
    const request = (async () => {
      try {
        const profile = await firstValueFrom(this.http.get(`${environment.apiUrl}/doctor/profile`).pipe(timeout(6e3)));
        if (epoch !== this.epoch)
          throw new Error("La sesi\xF3n cambi\xF3 durante la carga del perfil.");
        this.profile.set(structuredClone(profile));
        this.loaded.set(true);
        return structuredClone(profile);
      } catch (error) {
        if (epoch === this.epoch) {
          if (error instanceof HttpErrorResponse && error.status === 404) {
            this.profile.set(null);
            this.loaded.set(true);
            return null;
          }
          this.loaded.set(false);
          this.error.set(error instanceof Error ? error.message : "No se pudo cargar el perfil.");
        }
        throw error;
      } finally {
        if (epoch === this.epoch) {
          this.loading.set(false);
          this.request = null;
        }
      }
    })();
    this.request = request;
    return request;
  }
  clearProfile() {
    ++this.epoch;
    this.profile.set(null);
    this.loaded.set(false);
    this.loading.set(false);
    this.error.set(null);
    this.request = null;
  }
  static \u0275fac = function DoctorProfileService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DoctorProfileService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DoctorProfileService, factory: _DoctorProfileService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DoctorProfileService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  DoctorProfileService
};
//# debugId=6c4c47c2-8879-574f-bfd7-f2571591e42c
//# sourceMappingURL=chunk-WXC7F5DT.js.map
