import {
  AuthService
} from "./chunk-5XEBCQUW.js";
import "./chunk-WKCAPCQH.js";
import {
  Router
} from "./chunk-XM57RTTR.js";
import "./chunk-YAYJVLGH.js";
import "./chunk-SYX7XZ26.js";
import {
  inject
} from "./chunk-3HO5VEWU.js";

// src/app/core/guards/doctorchart-plan.guard.ts
var doctorchartPlanGuard = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  await authService.authReady;
  if (!authService.isLoggedIn()) {
    authService.openLoginModal();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-login-modal"));
    }
    return router.createUrlTree(["/login"], { queryParams: { returnUrl: state.url } });
  }
  if (authService.hasDoctorchartPlan()) {
    return true;
  }
  return router.createUrlTree(["/sin-plan"], { queryParams: { returnUrl: state.url } });
};
var doctorchartNoPlanGuard = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.authReady;
  if (!auth.isLoggedIn()) return router.createUrlTree(["/login"]);
  return auth.hasDoctorchartPlan() ? router.createUrlTree(["/dashboard"]) : true;
};
export {
  doctorchartNoPlanGuard,
  doctorchartPlanGuard
};
//# debugId=6f5f4925-0300-5790-a7d3-455dede440d8
//# sourceMappingURL=chunk-3WJSVF2M.js.map
