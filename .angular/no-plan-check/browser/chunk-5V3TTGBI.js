import {
  BrowserUiStorageService
} from "./chunk-WBCHXDEU.js";
import {
  DOCUMENT,
  Injectable,
  afterNextRender,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-3HO5VEWU.js";

// src/app/core/services/theme.service.ts
var ThemeService = class _ThemeService {
  document = inject(DOCUMENT);
  storage = inject(BrowserUiStorageService);
  currentTheme = signal(
    "light",
    ...ngDevMode ? [{ debugName: "currentTheme" }] : (
      /* istanbul ignore next */
      []
    )
  );
  theme = this.currentTheme.asReadonly();
  constructor() {
    afterNextRender(() => this.apply(this.storage.readTheme()));
  }
  toggle() {
    const theme = this.theme() === "dark" ? "light" : "dark";
    this.apply(theme);
    this.storage.writeTheme(theme);
  }
  apply(theme) {
    this.currentTheme.set(theme);
    this.document.documentElement.classList.toggle("dark", theme === "dark");
  }
  static \u0275fac = function ThemeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThemeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ThemeService, factory: _ThemeService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

export {
  ThemeService
};
//# debugId=1a24810f-def2-57e0-bc50-66aceb377d10
//# sourceMappingURL=chunk-5V3TTGBI.js.map
