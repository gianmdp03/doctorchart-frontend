import {
  WorkspaceStore
} from "./chunk-WPGAV52V.js";
import "./chunk-USM5S45Q.js";
import {
  AuthService
} from "./chunk-KGUDCUHJ.js";
import "./chunk-WKCAPCQH.js";
import {
  Router
} from "./chunk-XM57RTTR.js";
import "./chunk-YAYJVLGH.js";
import "./chunk-SYX7XZ26.js";
import {
  inject
} from "./chunk-3HO5VEWU.js";

// src/app/core/guards/clinical-navigation.guard.ts
var clinicalNavigationGuard = (entry) => async () => {
  const auth = inject(AuthService);
  const workspace = inject(WorkspaceStore);
  const router = inject(Router);
  await auth.authReady;
  if (!auth.isLoggedIn()) return true;
  if (auth.isSuperAdmin()) return router.createUrlTree(["/admin/especialidades"]);
  if (entry === "CALCULATORS" && !workspace.calculatorsEnabled()) {
    return router.createUrlTree(["/dashboard"]);
  }
  try {
    const setup = await workspace.loadSetup();
    if (!setup?.onboardingCompleted) return router.createUrlTree([setup ? "/onboarding/setup" : "/onboarding/select-specialty"]);
    return setup.experience.navigation.includes(entry) ? true : router.createUrlTree(["/dashboard"]);
  } catch {
    return false;
  }
};
export {
  clinicalNavigationGuard
};
//# debugId=7352217b-8329-51e2-b676-19bd6865dfa4
//# sourceMappingURL=chunk-K6T5GJZF.js.map
