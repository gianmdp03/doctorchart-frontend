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

// src/app/core/guards/super-admin.guard.ts
var superAdminGuard = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.authReady;
  return auth.isLoggedIn() && auth.isSuperAdmin() ? true : router.createUrlTree(["/dashboard"]);
};
export {
  superAdminGuard
};
//# debugId=5cde3a36-416d-51fb-8083-2873dec6e678
//# sourceMappingURL=chunk-EJ6QITPF.js.map
