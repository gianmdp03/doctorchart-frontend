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

// src/app/core/guards/doctor-onboarding.guard.ts
var doctorWizardGuard = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.authReady;
  return auth.isLoggedIn() && auth.isSuperAdmin() ? router.createUrlTree(["/admin/especialidades"]) : true;
};
var doctorOnboardingGuard = async () => {
  const auth = inject(AuthService);
  const workspace = inject(WorkspaceStore);
  const router = inject(Router);
  await auth.authReady;
  if (!auth.isLoggedIn()) return true;
  if (auth.isSuperAdmin()) return router.createUrlTree(["/admin/especialidades"]);
  try {
    const setup = await workspace.loadSetup();
    if (setup?.onboardingCompleted && setup.definition) return true;
    return router.createUrlTree([setup ? "/onboarding/setup" : "/onboarding/select-specialty"]);
  } catch {
    return false;
  }
};
var preventCompletedOnboardingGuard = async () => {
  const auth = inject(AuthService);
  const workspace = inject(WorkspaceStore);
  const router = inject(Router);
  await auth.authReady;
  if (!auth.isLoggedIn()) return true;
  if (auth.isSuperAdmin()) return router.createUrlTree(["/admin/especialidades"]);
  try {
    const setup = await workspace.loadSetup();
    return setup?.onboardingCompleted && setup.definition ? router.createUrlTree(["/dashboard"]) : true;
  } catch {
    return false;
  }
};
export {
  doctorOnboardingGuard,
  doctorWizardGuard,
  preventCompletedOnboardingGuard
};
//# debugId=0973ee1a-582d-5739-bc54-f8c10a8b410d
//# sourceMappingURL=chunk-L4QDNQSV.js.map
