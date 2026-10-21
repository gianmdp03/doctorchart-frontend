import {
  DoctorProfileService
} from "./chunk-WXC7F5DT.js";
import {
  WorkspaceStore
} from "./chunk-WPGAV52V.js";
import "./chunk-USM5S45Q.js";
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
import {
  HttpClient
} from "./chunk-SYX7XZ26.js";
import {
  Component,
  Injectable,
  computed,
  firstValueFrom,
  inject,
  setClassMetadata,
  signal,
  timeout,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-3HO5VEWU.js";

// src/app/core/services/specialty.service.ts
var SpecialtyService = class _SpecialtyService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/specialties`;
  getSpecialties() {
    return this.http.get(this.baseUrl).pipe(timeout(6e3));
  }
  getPublishedWizard(id) {
    return this.http.get(`${this.baseUrl}/${id}/wizard`).pipe(timeout(6e3));
  }
  static \u0275fac = function SpecialtyService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SpecialtyService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SpecialtyService, factory: _SpecialtyService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SpecialtyService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/features/onboarding/specialty-selection/specialty-selection.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function SpecialtySelectionComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 10);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage());
  }
}
function SpecialtySelectionComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 13);
    \u0275\u0275domListener("click", function SpecialtySelectionComponent_Conditional_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.loadSpecialties(true));
    });
    \u0275\u0275text(1, "Volver a cargar la configuraci\xF3n");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("disabled", ctx_r0.isLoading());
  }
}
function SpecialtySelectionComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 12)(1, "span");
    \u0275\u0275text(2, "Cargando especialidades...");
    \u0275\u0275domElementEnd()();
  }
}
function SpecialtySelectionComponent_Conditional_21_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 24);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r5.description);
  }
}
function SpecialtySelectionComponent_Conditional_21_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 19);
    \u0275\u0275domListener("click", function SpecialtySelectionComponent_Conditional_21_For_2_Template_button_click_0_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.select(item_r5.id));
    });
    \u0275\u0275domElementStart(1, "span", 20);
    \u0275\u0275domElement(2, "span", 21);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div", 22)(4, "h2", 23);
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(6, SpecialtySelectionComponent_Conditional_21_For_2_Conditional_6_Template, 2, 1, "p", 24);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r0.selectedSpecialty() === item_r5.id);
    \u0275\u0275domProperty("disabled", ctx_r0.isSubmitting() || ctx_r0.hasConflict());
    \u0275\u0275attribute("aria-pressed", ctx_r0.selectedSpecialty() === item_r5.id);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(item_r5.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r5.description ? 6 : -1);
  }
}
function SpecialtySelectionComponent_Conditional_21_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1, "Especialidad seleccionada: ");
    \u0275\u0275domElementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.name);
  }
}
function SpecialtySelectionComponent_Conditional_21_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1, "Seleccion\xE1 una especialidad para continuar.");
    \u0275\u0275domElementEnd();
  }
}
function SpecialtySelectionComponent_Conditional_21_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Guardando... ");
  }
}
function SpecialtySelectionComponent_Conditional_21_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Continuar ");
  }
}
function SpecialtySelectionComponent_Conditional_21_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 25);
    \u0275\u0275domListener("click", function SpecialtySelectionComponent_Conditional_21_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.loadSpecialties(true));
    });
    \u0275\u0275text(1, "Intentar cargar nuevamente");
    \u0275\u0275domElementEnd();
  }
}
function SpecialtySelectionComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "section", 14);
    \u0275\u0275repeaterCreate(1, SpecialtySelectionComponent_Conditional_21_For_2_Template, 7, 6, "button", 15, _forTrack0);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "footer", 16)(4, "div", 17);
    \u0275\u0275conditionalCreate(5, SpecialtySelectionComponent_Conditional_21_Conditional_5_Template, 4, 1, "span")(6, SpecialtySelectionComponent_Conditional_21_Conditional_6_Template, 2, 0, "span");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "button", 13);
    \u0275\u0275domListener("click", function SpecialtySelectionComponent_Conditional_21_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.confirmSpecialty());
    });
    \u0275\u0275conditionalCreate(8, SpecialtySelectionComponent_Conditional_21_Conditional_8_Template, 1, 0)(9, SpecialtySelectionComponent_Conditional_21_Conditional_9_Template, 1, 0);
    \u0275\u0275domElementEnd()();
    \u0275\u0275conditionalCreate(10, SpecialtySelectionComponent_Conditional_21_Conditional_10_Template, 2, 0, "button", 18);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.specialties());
    \u0275\u0275advance(4);
    \u0275\u0275conditional((tmp_2_0 = ctx_r0.selectedSpecialtyItem()) ? 5 : 6, tmp_2_0);
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", !ctx_r0.selectedSpecialtyItem() || ctx_r0.isSubmitting() || ctx_r0.hasConflict());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isSubmitting() ? 8 : 9);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.errorMessage() && !ctx_r0.hasConflict() ? 10 : -1);
  }
}
var SpecialtySelectionComponent = class _SpecialtySelectionComponent {
  specialtyService = inject(SpecialtyService);
  doctorProfileService = inject(DoctorProfileService);
  authService = inject(AuthService);
  workspaceStore = inject(WorkspaceStore);
  router = inject(Router);
  specialties = signal(
    [],
    ...ngDevMode ? [{ debugName: "specialties" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedSpecialty = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedSpecialty" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedSpecialtyItem = computed(
    () => this.specialties().find((item) => item.id === this.selectedSpecialty()) ?? null,
    ...ngDevMode ? [{ debugName: "selectedSpecialtyItem" }] : (
      /* istanbul ignore next */
      []
    )
  );
  expectedVersion = signal(
    null,
    ...ngDevMode ? [{ debugName: "expectedVersion" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoading = signal(
    true,
    ...ngDevMode ? [{ debugName: "isLoading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSubmitting = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSubmitting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasConflict = signal(
    false,
    ...ngDevMode ? [{ debugName: "hasConflict" }] : (
      /* istanbul ignore next */
      []
    )
  );
  errorMessage = signal(
    null,
    ...ngDevMode ? [{ debugName: "errorMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  async ngOnInit() {
    await this.loadSpecialties();
  }
  async loadSpecialties(force = false) {
    if (this.isSubmitting())
      return;
    this.isLoading.set(true);
    this.errorMessage.set(null);
    try {
      const setup = await this.workspaceStore.loadSetup(force);
      if (setup?.onboardingCompleted) {
        await this.router.navigate(["/dashboard"]);
        return;
      }
      if (setup && setup.currentStepKey !== "specialty") {
        await this.router.navigate(["/onboarding/setup"]);
        return;
      }
      const list = await firstValueFrom(this.specialtyService.getSpecialties());
      this.specialties.set(list);
      this.expectedVersion.set(setup?.version ?? null);
      this.selectedSpecialty.set(setup ? list.find((item) => item.id === setup.specialty.id)?.id ?? null : list.length === 1 ? list[0].id : null);
      this.hasConflict.set(false);
      if (list.length === 0)
        this.errorMessage.set("No hay especialidades disponibles. Contact\xE1 al administrador.");
    } catch (error) {
      this.errorMessage.set(this.errorText(error, "No pudimos cargar las especialidades. Intent\xE1 nuevamente."));
    } finally {
      this.isLoading.set(false);
    }
  }
  select(id) {
    if (this.isSubmitting() || this.hasConflict())
      return;
    this.selectedSpecialty.set(id);
    this.errorMessage.set(null);
  }
  async confirmSpecialty() {
    const specialty = this.selectedSpecialtyItem();
    if (!specialty || this.isSubmitting() || this.hasConflict())
      return;
    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    try {
      await this.workspaceStore.selectSpecialty(specialty.id, this.expectedVersion());
      await this.router.navigate(["/onboarding/setup"]);
    } catch (error) {
      const response = error;
      if (response?.status === 409 && response.error?.code === "VERSION_CONFLICT") {
        this.hasConflict.set(true);
        this.errorMessage.set("Tu configuraci\xF3n cambi\xF3 en otra sesi\xF3n. La selecci\xF3n sigue visible; volv\xE9 a cargar para revisar el estado guardado.");
      } else {
        this.errorMessage.set(this.errorText(error, "No pudimos guardar la especialidad. Revis\xE1 tu conexi\xF3n e intent\xE1 nuevamente."));
      }
    } finally {
      this.isSubmitting.set(false);
    }
  }
  async handleSignOut() {
    if (this.isSubmitting())
      return;
    this.doctorProfileService.clearProfile();
    await this.authService.signOut();
    this.workspaceStore.clearSetup();
  }
  errorText(error, fallback) {
    const message = error?.error?.message;
    return typeof message === "string" ? message : fallback;
  }
  static \u0275fac = function SpecialtySelectionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SpecialtySelectionComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SpecialtySelectionComponent, selectors: [["app-specialty-selection"]], decls: 22, vars: 4, consts: [[1, "onboarding-container"], ["aria-labelledby", "specialty-title", 1, "onboarding-card"], [1, "onboarding-header"], [1, "header-top-row"], [1, "brand-pill"], ["type", "button", 1, "btn-signout-onboarding", 3, "click", "disabled"], ["id", "specialty-title", 1, "title"], [1, "subtitle"], [1, "immutability-warning-banner"], [1, "warning-content"], ["role", "alert", 1, "error-banner"], ["type", "button", 1, "btn-confirm", 3, "disabled"], ["role", "status", 1, "loading-state"], ["type", "button", 1, "btn-confirm", 3, "click", "disabled"], ["aria-label", "Especialidades disponibles", 1, "specialty-grid"], ["type", "button", 1, "specialty-card", 3, "selected", "disabled"], [1, "onboarding-footer"], [1, "footer-status"], ["type", "button", 1, "btn-signout-onboarding"], ["type", "button", 1, "specialty-card", 3, "click", "disabled"], ["aria-hidden", "true", 1, "card-radio"], [1, "radio-circle"], [1, "card-body"], [1, "card-title"], [1, "card-desc"], ["type", "button", 1, "btn-signout-onboarding", 3, "click"]], template: function SpecialtySelectionComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "main", 0)(1, "section", 1)(2, "header", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "Configuraci\xF3n inicial \xB7 Especialidad");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(6, "button", 5);
      \u0275\u0275domListener("click", function SpecialtySelectionComponent_Template_button_click_6_listener() {
        return ctx.handleSignOut();
      });
      \u0275\u0275text(7, "Cerrar sesi\xF3n");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(8, "h1", 6);
      \u0275\u0275text(9, "Eleg\xED tu especialidad m\xE9dica");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "p", 7);
      \u0275\u0275text(11, "Vas a recibir los formularios iniciales de tu especialidad para personalizar sus categor\xEDas y campos.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(12, "div", 8)(13, "div", 9)(14, "strong");
      \u0275\u0275text(15, "Pod\xE9s cambiar la especialidad durante la configuraci\xF3n inicial.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(16, "span");
      \u0275\u0275text(17, "Quedar\xE1 confirmada al finalizar. Tus formularios seguir\xE1n siendo editables.");
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275conditionalCreate(18, SpecialtySelectionComponent_Conditional_18_Template, 2, 1, "div", 10);
      \u0275\u0275conditionalCreate(19, SpecialtySelectionComponent_Conditional_19_Template, 2, 1, "button", 11);
      \u0275\u0275conditionalCreate(20, SpecialtySelectionComponent_Conditional_20_Template, 3, 0, "div", 12)(21, SpecialtySelectionComponent_Conditional_21_Template, 11, 4);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275domProperty("disabled", ctx.isSubmitting());
      \u0275\u0275advance(12);
      \u0275\u0275conditional(ctx.errorMessage() ? 18 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.hasConflict() ? 19 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 20 : 21);
    }
  }, styles: ["\n.onboarding-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2.5rem 1.5rem;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n}\n.onboarding-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 960px;\n  background: var(--%NS%dc-surface, #ffffff);\n  border-radius: 1.25rem;\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);\n  padding: 2.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.onboarding-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.header-top-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n}\n.brand-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.35rem 0.85rem;\n  border-radius: 9999px;\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n  color: var(--%NS%dc-ink-secondary, #475569);\n  font-size: 0.8125rem;\n  font-weight: 600;\n}\n.btn-signout-onboarding[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.375rem;\n  padding: 0.35rem 0.75rem;\n  background: transparent;\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 0.5rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  font-size: 0.8125rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s ease-in-out;\n}\n.btn-signout-onboarding[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n  color: var(--%NS%dc-ink, #0f172a);\n  border-color: var(--%NS%dc-outline, #cbd5e1);\n}\n.title[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #0f172a);\n  margin: 0;\n  letter-spacing: -0.02em;\n}\n.subtitle[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  margin: 0;\n  line-height: 1.5;\n}\n.immutability-warning-banner[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  display: flex;\n  align-items: flex-start;\n  gap: 0.875rem;\n  padding: 1rem 1.25rem;\n  background: var(--%NS%dc-warning-surface, #fffbeb);\n  border: 1px solid #fde68a;\n  border-left: 4px solid #d97706;\n  border-radius: 0.75rem;\n  color: var(--%NS%dc-warning-ink, #92400e);\n}\n.warning-icon-wrapper[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-warning-ink, #d97706);\n  flex-shrink: 0;\n  margin-top: 0.125rem;\n}\n.warning-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  font-size: 0.875rem;\n  line-height: 1.45;\n}\n.warning-content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-warning-ink, #78350f);\n  font-weight: 700;\n}\n.error-banner[_ngcontent-%COMP%] {\n  padding: 0.875rem 1.25rem;\n  background: var(--%NS%dc-error-surface, #fef2f2);\n  border: 1px solid #fecaca;\n  border-left: 4px solid #ef4444;\n  border-radius: 0.75rem;\n  color: var(--%NS%dc-error-ink, #991b1b);\n  font-size: 0.875rem;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  padding: 4rem 1rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  font-size: 0.9375rem;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 2.25rem;\n  height: 2.25rem;\n  border: 3px solid var(--%NS%dc-outline, #e2e8f0);\n  border-top-color: #2563eb;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n.spinner-sm[_ngcontent-%COMP%] {\n  width: 1rem;\n  height: 1rem;\n  border: 2px solid rgba(255, 255, 255, 0.4);\n  border-top-color: #ffffff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.specialty-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 1rem;\n}\n.specialty-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.875rem;\n  padding: 1.125rem;\n  border-radius: 0.875rem;\n  border: 1.5px solid var(--%NS%dc-outline, #e2e8f0);\n  background: var(--%NS%dc-surface, #ffffff);\n  text-align: left;\n  cursor: pointer;\n  transition: all 0.15s ease-in-out;\n}\n.specialty-card[_ngcontent-%COMP%]:hover {\n  border-color: #93c5fd;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  transform: translateY(-1px);\n}\n.specialty-card.selected[_ngcontent-%COMP%] {\n  border-color: #2563eb;\n  background: var(--%NS%dc-blue-surface, #eff6ff);\n  box-shadow: 0 0 0 1px #2563eb;\n}\n.card-radio[_ngcontent-%COMP%] {\n  margin-top: 0.125rem;\n  width: 1.125rem;\n  height: 1.125rem;\n  border-radius: 50%;\n  border: 2px solid var(--%NS%dc-outline, #cbd5e1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: all 0.15s ease;\n}\n.specialty-card.selected[_ngcontent-%COMP%]   .card-radio[_ngcontent-%COMP%] {\n  border-color: #2563eb;\n}\n.radio-circle[_ngcontent-%COMP%] {\n  width: 0.5rem;\n  height: 0.5rem;\n  border-radius: 50%;\n  background: transparent;\n  transition: background 0.15s ease;\n}\n.specialty-card.selected[_ngcontent-%COMP%]   .radio-circle[_ngcontent-%COMP%] {\n  background: #2563eb;\n}\n.card-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.card-title[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink, #0f172a);\n  margin: 0;\n}\n.card-desc[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  margin: 0;\n  line-height: 1.4;\n}\n.onboarding-footer[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding-top: 1.5rem;\n  border-top: 1px solid var(--%NS%dc-outline, #f1f5f9);\n}\n.footer-status[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--%NS%dc-ink-secondary, #475569);\n}\n.prompt-text[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink-muted, #94a3b8);\n  font-style: italic;\n}\n.btn-confirm[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1.5rem;\n  background: #2563eb;\n  color: #ffffff;\n  border: none;\n  border-radius: 0.625rem;\n  font-weight: 600;\n  font-size: 0.9375rem;\n  cursor: pointer;\n  transition: background 0.15s ease;\n}\n.btn-confirm[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #1d4ed8;\n}\n.btn-confirm[_ngcontent-%COMP%]:disabled {\n  background: #94a3b8;\n  cursor: not-allowed;\n  opacity: 0.7;\n}\n.specialty-card[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: .65;\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #93c5fd;\n  outline-offset: 3px;\n}\n@media (max-width: 640px) {\n  .onboarding-footer[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=specialty-selection.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SpecialtySelectionComponent, [{
    type: Component,
    args: [{ selector: "app-specialty-selection", template: '<main class="onboarding-container">\n  <section class="onboarding-card" aria-labelledby="specialty-title">\n    <header class="onboarding-header">\n      <div class="header-top-row">\n        <span class="brand-pill">Configuraci\xF3n inicial \xB7 Especialidad</span>\n        <button type="button" class="btn-signout-onboarding" [disabled]="isSubmitting()" (click)="handleSignOut()">Cerrar sesi\xF3n</button>\n      </div>\n      <h1 id="specialty-title" class="title">Eleg\xED tu especialidad m\xE9dica</h1>\n      <p class="subtitle">Vas a recibir los formularios iniciales de tu especialidad para personalizar sus categor\xEDas y campos.</p>\n      <div class="immutability-warning-banner">\n        <div class="warning-content">\n          <strong>Pod\xE9s cambiar la especialidad durante la configuraci\xF3n inicial.</strong>\n          <span>Quedar\xE1 confirmada al finalizar. Tus formularios seguir\xE1n siendo editables.</span>\n        </div>\n      </div>\n    </header>\n\n    @if (errorMessage()) {\n      <div class="error-banner" role="alert">{{ errorMessage() }}</div>\n    }\n    @if (hasConflict()) {\n      <button type="button" class="btn-confirm" [disabled]="isLoading()" (click)="loadSpecialties(true)">Volver a cargar la configuraci\xF3n</button>\n    }\n    @if (isLoading()) {\n      <div class="loading-state" role="status"><span>Cargando especialidades...</span></div>\n    } @else {\n      <section class="specialty-grid" aria-label="Especialidades disponibles">\n        @for (item of specialties(); track item.id) {\n          <button type="button" class="specialty-card"\n            [class.selected]="selectedSpecialty() === item.id"\n            [attr.aria-pressed]="selectedSpecialty() === item.id"\n            [disabled]="isSubmitting() || hasConflict()"\n            (click)="select(item.id)">\n            <span class="card-radio" aria-hidden="true"><span class="radio-circle"></span></span>\n            <div class="card-body">\n              <h2 class="card-title">{{ item.name }}</h2>\n              @if (item.description) { <p class="card-desc">{{ item.description }}</p> }\n            </div>\n          </button>\n        }\n      </section>\n      <footer class="onboarding-footer">\n        <div class="footer-status">\n          @if (selectedSpecialtyItem(); as selected) {\n            <span>Especialidad seleccionada: <strong>{{ selected.name }}</strong></span>\n          } @else { <span>Seleccion\xE1 una especialidad para continuar.</span> }\n        </div>\n        <button type="button" class="btn-confirm"\n          [disabled]="!selectedSpecialtyItem() || isSubmitting() || hasConflict()"\n          (click)="confirmSpecialty()">\n          @if (isSubmitting()) { Guardando... } @else { Continuar }\n        </button>\n      </footer>\n      @if (errorMessage() && !hasConflict()) {\n        <button type="button" class="btn-signout-onboarding" (click)="loadSpecialties(true)">Intentar cargar nuevamente</button>\n      }\n    }\n  </section>\n</main>\r\n', styles: ["/* src/app/features/onboarding/specialty-selection/specialty-selection.component.css */\n.onboarding-container {\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2.5rem 1.5rem;\n  background: var(--dc-surface-low, #f8fafc);\n}\n.onboarding-card {\n  width: 100%;\n  max-width: 960px;\n  background: var(--dc-surface, #ffffff);\n  border-radius: 1.25rem;\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);\n  padding: 2.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.onboarding-header {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.header-top-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n}\n.brand-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.35rem 0.85rem;\n  border-radius: 9999px;\n  background: var(--dc-surface-high, #f1f5f9);\n  color: var(--dc-ink-secondary, #475569);\n  font-size: 0.8125rem;\n  font-weight: 600;\n}\n.btn-signout-onboarding {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.375rem;\n  padding: 0.35rem 0.75rem;\n  background: transparent;\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 0.5rem;\n  color: var(--dc-ink-muted, #64748b);\n  font-size: 0.8125rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s ease-in-out;\n}\n.btn-signout-onboarding:hover {\n  background: var(--dc-surface-high, #f1f5f9);\n  color: var(--dc-ink, #0f172a);\n  border-color: var(--dc-outline, #cbd5e1);\n}\n.title {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: var(--dc-ink, #0f172a);\n  margin: 0;\n  letter-spacing: -0.02em;\n}\n.subtitle {\n  font-size: 0.9375rem;\n  color: var(--dc-ink-muted, #64748b);\n  margin: 0;\n  line-height: 1.5;\n}\n.immutability-warning-banner {\n  margin-top: 0.5rem;\n  display: flex;\n  align-items: flex-start;\n  gap: 0.875rem;\n  padding: 1rem 1.25rem;\n  background: var(--dc-warning-surface, #fffbeb);\n  border: 1px solid #fde68a;\n  border-left: 4px solid #d97706;\n  border-radius: 0.75rem;\n  color: var(--dc-warning-ink, #92400e);\n}\n.warning-icon-wrapper {\n  color: var(--dc-warning-ink, #d97706);\n  flex-shrink: 0;\n  margin-top: 0.125rem;\n}\n.warning-content {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  font-size: 0.875rem;\n  line-height: 1.45;\n}\n.warning-content strong {\n  color: var(--dc-warning-ink, #78350f);\n  font-weight: 700;\n}\n.error-banner {\n  padding: 0.875rem 1.25rem;\n  background: var(--dc-error-surface, #fef2f2);\n  border: 1px solid #fecaca;\n  border-left: 4px solid #ef4444;\n  border-radius: 0.75rem;\n  color: var(--dc-error-ink, #991b1b);\n  font-size: 0.875rem;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  padding: 4rem 1rem;\n  color: var(--dc-ink-muted, #64748b);\n  font-size: 0.9375rem;\n}\n.spinner {\n  width: 2.25rem;\n  height: 2.25rem;\n  border: 3px solid var(--dc-outline, #e2e8f0);\n  border-top-color: #2563eb;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n.spinner-sm {\n  width: 1rem;\n  height: 1rem;\n  border: 2px solid rgba(255, 255, 255, 0.4);\n  border-top-color: #ffffff;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.specialty-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 1rem;\n}\n.specialty-card {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.875rem;\n  padding: 1.125rem;\n  border-radius: 0.875rem;\n  border: 1.5px solid var(--dc-outline, #e2e8f0);\n  background: var(--dc-surface, #ffffff);\n  text-align: left;\n  cursor: pointer;\n  transition: all 0.15s ease-in-out;\n}\n.specialty-card:hover {\n  border-color: #93c5fd;\n  background: var(--dc-surface-low, #f8fafc);\n  transform: translateY(-1px);\n}\n.specialty-card.selected {\n  border-color: #2563eb;\n  background: var(--dc-blue-surface, #eff6ff);\n  box-shadow: 0 0 0 1px #2563eb;\n}\n.card-radio {\n  margin-top: 0.125rem;\n  width: 1.125rem;\n  height: 1.125rem;\n  border-radius: 50%;\n  border: 2px solid var(--dc-outline, #cbd5e1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: all 0.15s ease;\n}\n.specialty-card.selected .card-radio {\n  border-color: #2563eb;\n}\n.radio-circle {\n  width: 0.5rem;\n  height: 0.5rem;\n  border-radius: 50%;\n  background: transparent;\n  transition: background 0.15s ease;\n}\n.specialty-card.selected .radio-circle {\n  background: #2563eb;\n}\n.card-body {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.card-title {\n  font-size: 0.9375rem;\n  font-weight: 600;\n  color: var(--dc-ink, #0f172a);\n  margin: 0;\n}\n.card-desc {\n  font-size: 0.8125rem;\n  color: var(--dc-ink-muted, #64748b);\n  margin: 0;\n  line-height: 1.4;\n}\n.onboarding-footer {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding-top: 1.5rem;\n  border-top: 1px solid var(--dc-outline, #f1f5f9);\n}\n.footer-status {\n  font-size: 0.875rem;\n  color: var(--dc-ink-secondary, #475569);\n}\n.prompt-text {\n  color: var(--dc-ink-muted, #94a3b8);\n  font-style: italic;\n}\n.btn-confirm {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1.5rem;\n  background: #2563eb;\n  color: #ffffff;\n  border: none;\n  border-radius: 0.625rem;\n  font-weight: 600;\n  font-size: 0.9375rem;\n  cursor: pointer;\n  transition: background 0.15s ease;\n}\n.btn-confirm:hover:not(:disabled) {\n  background: #1d4ed8;\n}\n.btn-confirm:disabled {\n  background: #94a3b8;\n  cursor: not-allowed;\n  opacity: 0.7;\n}\n.specialty-card:disabled {\n  cursor: not-allowed;\n  opacity: .65;\n}\nbutton:focus-visible {\n  outline: 3px solid #93c5fd;\n  outline-offset: 3px;\n}\n@media (max-width: 640px) {\n  .onboarding-footer {\n    align-items: stretch;\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=specialty-selection.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SpecialtySelectionComponent, { className: "SpecialtySelectionComponent", filePath: "src/app/features/onboarding/specialty-selection/specialty-selection.component.ts", lineNumber: 15 });
})();
export {
  SpecialtySelectionComponent
};
//# debugId=8570f018-5b8e-50ed-870a-6416eddd11e0
//# sourceMappingURL=chunk-NLOTJD63.js.map
