import {
  Injectable,
  __spreadValues,
  computed,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-3HO5VEWU.js";

// src/app/core/services/doctor-specialty.service.ts
var DoctorSpecialtyService = class _DoctorSpecialtyService {
  specialty = signal(
    null,
    ...ngDevMode ? [{ debugName: "specialty" }] : (
      /* istanbul ignore next */
      []
    )
  );
  definition = signal(
    null,
    ...ngDevMode ? [{ debugName: "definition" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeSpecialty = computed(
    () => this.specialty()?.code ?? null,
    ...ngDevMode ? [{ debugName: "activeSpecialty" }] : (
      /* istanbul ignore next */
      []
    )
  );
  supportsGrowthCharts = computed(
    () => this.definition()?.modulesConfig.GROWTH_CHARTS === true,
    ...ngDevMode ? [{ debugName: "supportsGrowthCharts" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasFamilyInformation = computed(
    () => this.definition()?.patientForm.categories.some((category) => category.enabled && (category.key.toLowerCase().includes("family") || category.key.toLowerCase().includes("guardian") || category.fields.some((field) => field.key.toLowerCase().includes("guardian") || field.key.toLowerCase().includes("family") || field.key.toLowerCase().includes("father") || field.key.toLowerCase().includes("mother") || field.key.toLowerCase().includes("relative")))) ?? false,
    ...ngDevMode ? [{ debugName: "hasFamilyInformation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentSpecialtyOption = computed(
    () => ({
      value: this.specialty()?.code ?? null,
      label: this.specialty()?.name ?? "Sin especialidad asignada",
      shortLabel: this.specialty()?.name ?? "Sin especialidad",
      icon: "activity"
    }),
    ...ngDevMode ? [{ debugName: "currentSpecialtyOption" }] : (
      /* istanbul ignore next */
      []
    )
  );
  specialtyLabel = computed(
    () => this.currentSpecialtyOption().label,
    ...ngDevMode ? [{ debugName: "specialtyLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  headerBrandTitle = computed(
    () => this.specialty() ? `DoctorChart \u2022 ${this.specialty().name}` : "DoctorChart",
    ...ngDevMode ? [{ debugName: "headerBrandTitle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  headerBrandSubtitle = computed(
    () => this.specialty() ? `M\xF3dulo cl\xEDnico de ${this.specialty().name}` : "Historia cl\xEDnica",
    ...ngDevMode ? [{ debugName: "headerBrandSubtitle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  setSpecialty(specialty) {
    this.specialty.set(specialty ? __spreadValues({}, specialty) : null);
  }
  setDefinition(definition) {
    this.definition.set(definition ? structuredClone(definition) : null);
  }
  clearSpecialty() {
    this.specialty.set(null);
    this.definition.set(null);
  }
  static \u0275fac = function DoctorSpecialtyService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DoctorSpecialtyService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DoctorSpecialtyService, factory: _DoctorSpecialtyService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DoctorSpecialtyService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  DoctorSpecialtyService
};
//# debugId=3dcf95e5-f102-5903-8e3f-09bd381d522d
//# sourceMappingURL=chunk-USM5S45Q.js.map
