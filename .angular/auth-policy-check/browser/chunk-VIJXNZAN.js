import {
  ClinicalEncounterService
} from "./chunk-5GX3SGKL.js";
import {
  ActivePatientService
} from "./chunk-KDJQW6YV.js";
import {
  DoctorProfileService
} from "./chunk-WXC7F5DT.js";
import {
  WorkspaceStore
} from "./chunk-WPGAV52V.js";
import {
  AuthService
} from "./chunk-KGUDCUHJ.js";
import {
  Router
} from "./chunk-XM57RTTR.js";
import {
  Injectable,
  effect,
  inject,
  setClassMetadata,
  untracked,
  ɵɵdefineInjectable
} from "./chunk-3HO5VEWU.js";

// src/app/core/services/session-coordinator.service.ts
var SessionCoordinatorService = class _SessionCoordinatorService {
  authService = inject(AuthService);
  doctorProfileService = inject(DoctorProfileService);
  workspaceStore = inject(WorkspaceStore);
  router = inject(Router);
  activePatient = inject(ActivePatientService);
  clinicalEncounters = inject(ClinicalEncounterService);
  identity = null;
  adminIdentity = false;
  entryPath = "/";
  setEntryPath(path) {
    this.entryPath = path;
  }
  constructor() {
    effect(() => {
      const identity = this.authService.currentUser()?.id ?? null;
      const adminIdentity = this.authService.isSuperAdmin();
      if (identity === this.identity && adminIdentity === this.adminIdentity)
        return;
      this.identity = identity;
      this.adminIdentity = adminIdentity;
      untracked(() => {
        if (adminIdentity)
          this.activePatient.clear();
        this.clinicalEncounters.clear();
        this.doctorProfileService.clearProfile();
        this.workspaceStore.clearSetup();
        if (identity && adminIdentity) {
          void this.router.navigate(["/admin/especialidades"]).catch(() => void 0);
        } else if (identity) {
          void this.loadIdentity();
          if (this.router.url.startsWith("/admin/"))
            void this.router.navigate(["/dashboard"]).catch(() => void 0);
        }
      });
    });
    effect(() => {
      if (this.authService.currentUser()?.id && !this.authService.isSuperAdmin() && this.workspaceStore.isOnboardingCompleted() && !this.workspaceStore.preferences() && !this.workspaceStore.preferencesError() && !this.workspaceStore.isLoading()) {
        untracked(() => {
          void this.workspaceStore.loadPreferences().catch(() => void 0);
        });
      }
    });
  }
  async loadIdentity() {
    const identity = this.authService.currentUser()?.id;
    const results = await Promise.allSettled([
      this.doctorProfileService.loadProfile(),
      this.workspaceStore.loadSetup().then((setup) => setup ? this.workspaceStore.loadPreferences() : null)
    ]);
    if (!identity || identity !== this.authService.currentUser()?.id || this.authService.isSuperAdmin() || results.some((result) => result.status === "rejected"))
      return;
    if (["/", "/login"].includes(this.router.url.split(/[?#]/)[0]) && !this.router.currentNavigation()) {
      const requested = this.router.parseUrl(this.router.url).queryParams["returnUrl"];
      const target = typeof requested === "string" && requested.startsWith("/") && !requested.startsWith("//") && !["/", "/login"].includes(requested.split(/[?#]/)[0]) ? requested : !["/", "/login"].includes(this.entryPath) ? this.entryPath : "/dashboard";
      await this.router.navigateByUrl(target).catch(() => void 0);
    }
  }
  retrySetup() {
    if (!this.authService.isSuperAdmin())
      void this.loadIdentity();
  }
  static \u0275fac = function SessionCoordinatorService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SessionCoordinatorService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SessionCoordinatorService, factory: _SessionCoordinatorService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SessionCoordinatorService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

export {
  SessionCoordinatorService
};
//# debugId=082e954a-bb31-5c5a-9411-eab3c387bcb8
//# sourceMappingURL=chunk-VIJXNZAN.js.map
