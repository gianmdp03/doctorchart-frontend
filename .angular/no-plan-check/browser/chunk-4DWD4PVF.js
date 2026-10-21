import {
  DoctorProfileService
} from "./chunk-WXC7F5DT.js";
import {
  ClinicalEncounterService
} from "./chunk-AZ6E4AKD.js";
import {
  ActivePatientService
} from "./chunk-C5KB4SWE.js";
import {
  WorkspaceStore
} from "./chunk-WPGAV52V.js";
import {
  AuthService
} from "./chunk-5XEBCQUW.js";
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
  planActive = false;
  entryPath = "/";
  setEntryPath(path) {
    this.entryPath = path;
  }
  constructor() {
    effect(() => {
      const identity = this.authService.currentUser()?.id ?? null;
      const adminIdentity = this.authService.isSuperAdmin();
      const planActive = this.authService.hasDoctorchartPlan();
      if (identity === this.identity && adminIdentity === this.adminIdentity && planActive === this.planActive)
        return;
      this.identity = identity;
      this.adminIdentity = adminIdentity;
      this.planActive = planActive;
      untracked(() => {
        if (adminIdentity || !planActive)
          this.activePatient.clear();
        this.clinicalEncounters.clear();
        this.doctorProfileService.clearProfile();
        this.workspaceStore.clearSetup();
        if (identity && adminIdentity) {
          void this.router.navigate(["/admin/especialidades"]).catch(() => void 0);
        } else if (identity && planActive) {
          void this.loadIdentity();
          if (this.router.url.startsWith("/admin/"))
            void this.router.navigate(["/dashboard"]).catch(() => void 0);
        }
      });
    });
    effect(() => {
      if (this.authService.currentUser()?.id && this.authService.hasDoctorchartPlan() && !this.authService.isSuperAdmin() && this.workspaceStore.isOnboardingCompleted() && !this.workspaceStore.preferences() && !this.workspaceStore.preferencesError() && !this.workspaceStore.isLoading()) {
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
    if (!identity || identity !== this.authService.currentUser()?.id || !this.authService.hasDoctorchartPlan() || this.authService.isSuperAdmin() || results.some((result) => result.status === "rejected"))
      return;
    if (["/", "/login"].includes(this.router.url.split(/[?#]/)[0]) && !this.router.currentNavigation()) {
      const requested = this.router.parseUrl(this.router.url).queryParams["returnUrl"];
      const target = typeof requested === "string" && requested.startsWith("/") && !requested.startsWith("//") && !["/", "/login"].includes(requested.split(/[?#]/)[0]) ? requested : !["/", "/login"].includes(this.entryPath) ? this.entryPath : "/dashboard";
      await this.router.navigateByUrl(target).catch(() => void 0);
    }
  }
  retrySetup() {
    if (this.authService.hasDoctorchartPlan() && !this.authService.isSuperAdmin())
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
//# debugId=88c2db3c-a5bc-5783-ae3f-1f0c4b23bb6d
//# sourceMappingURL=chunk-4DWD4PVF.js.map
