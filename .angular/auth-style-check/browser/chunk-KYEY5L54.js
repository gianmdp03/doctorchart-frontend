import {
  AuthService
} from "./chunk-KGUDCUHJ.js";
import {
  environment
} from "./chunk-WKCAPCQH.js";
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
  const redirectUrl = environment.bycodePlansUrl || "http://localhost:4200/panel#plans-catalog";
  if (typeof window !== "undefined") {
    window.location.href = redirectUrl;
  }
  return false;
};
export {
  doctorchartPlanGuard
};
//# debugId=e4829944-05b6-54c9-a8f3-4f0b5295bc76
//# sourceMappingURL=chunk-KYEY5L54.js.map
