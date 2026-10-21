import {
  isPlatformBrowser
} from "./chunk-SYX7XZ26.js";
import {
  Injectable,
  PLATFORM_ID,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-3HO5VEWU.js";

// src/app/core/services/browser-ui-storage.service.ts
var BrowserUiStorageService = class _BrowserUiStorageService {
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readTheme() {
    return this.read("localStorage", "doctorchart_theme") === "dark" ? "dark" : "light";
  }
  writeTheme(value) {
    if (value === "light" || value === "dark") {
      this.write("localStorage", "doctorchart_theme", value);
    }
  }
  readFontSize() {
    const value = this.read("localStorage", "doctorchart_font_size");
    return value === "large" || value === "xlarge" ? value : "normal";
  }
  writeFontSize(value) {
    if (value === "normal" || value === "large" || value === "xlarge") {
      this.write("localStorage", "doctorchart_font_size", value);
    }
  }
  readActivePatientId(owner) {
    const value = this.read("sessionStorage", this.patientKey(owner));
    if (!value || !/^[1-9]\d*$/.test(value))
      return null;
    const id = Number(value);
    return Number.isSafeInteger(id) ? id : null;
  }
  writeActivePatientId(owner, id) {
    const value = id !== null && Number.isSafeInteger(id) && id > 0 ? String(id) : null;
    this.write("sessionStorage", this.patientKey(owner), value);
  }
  patientKey(owner) {
    return `doctorchart_active_patient:${encodeURIComponent(owner)}`;
  }
  read(kind, key) {
    if (!this.isBrowser)
      return null;
    try {
      return window[kind].getItem(key);
    } catch {
      return null;
    }
  }
  write(kind, key, value) {
    if (!this.isBrowser)
      return;
    try {
      if (value === null)
        window[kind].removeItem(key);
      else
        window[kind].setItem(key, value);
    } catch {
    }
  }
  static \u0275fac = function BrowserUiStorageService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BrowserUiStorageService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BrowserUiStorageService, factory: _BrowserUiStorageService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrowserUiStorageService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  BrowserUiStorageService
};
//# debugId=c8cb2dba-8e1b-5fb5-9dce-03dd49159d5d
//# sourceMappingURL=chunk-WBCHXDEU.js.map
