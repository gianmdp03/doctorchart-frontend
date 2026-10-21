import {
  getTotalElements,
  getTotalPages
} from "./chunk-BGC6F3KO.js";
import {
  AccountReadScope
} from "./chunk-7FWLAUOT.js";
import {
  ClinicalEncounterService
} from "./chunk-5GX3SGKL.js";
import {
  ActivePatientService
} from "./chunk-KDJQW6YV.js";
import {
  formatInstant
} from "./chunk-YTAXUAO7.js";
import {
  DoctorSpecialtyService
} from "./chunk-USM5S45Q.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-BQIFWLNB.js";
import "./chunk-KGUDCUHJ.js";
import "./chunk-WKCAPCQH.js";
import {
  NgIcon,
  lucideSearch,
  lucideStethoscope,
  provideIcons
} from "./chunk-Z3UJ4PSI.js";
import "./chunk-WBCHXDEU.js";
import {
  Router
} from "./chunk-XM57RTTR.js";
import "./chunk-YAYJVLGH.js";
import "./chunk-SYX7XZ26.js";
import {
  Component,
  DestroyRef,
  HostListener,
  computed,
  inject,
  setClassMetadata,
  signal,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-3HO5VEWU.js";

// src/app/features/consultas/consultas.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ConsultasComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 15);
    \u0275\u0275listener("click", function ConsultasComponent_Conditional_11_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadConsultations());
    });
    \u0275\u0275text(3, "Reintentar");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx, " ");
  }
}
function ConsultasComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "div", 16);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cargando consultas cl\xEDnicas...");
    \u0275\u0275elementEnd()();
  }
}
function ConsultasComponent_Conditional_14_For_20_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r4.primaryDiagnosisCode);
  }
}
function ConsultasComponent_Conditional_14_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td")(5, "span", 18);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td")(8, "span", 19);
    \u0275\u0275listener("click", function ConsultasComponent_Conditional_14_For_20_Template_span_click_8_listener() {
      const c_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openPatientRecord(c_r4.patientId));
    });
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td")(11, "span", 20);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td")(14, "span", 21);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td")(17, "div", 22);
    \u0275\u0275conditionalCreate(18, ConsultasComponent_Conditional_14_For_20_Conditional_18_Template, 2, 1, "span", 23);
    \u0275\u0275elementStart(19, "span", 24);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "td")(22, "div", 25)(23, "button", 26);
    \u0275\u0275listener("click", function ConsultasComponent_Conditional_14_For_20_Template_button_click_23_listener() {
      const c_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openEncounterDetail(c_r4.id));
    });
    \u0275\u0275text(24, " Ver Detalle ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 27);
    \u0275\u0275listener("click", function ConsultasComponent_Conditional_14_For_20_Template_button_click_25_listener() {
      const c_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openPatientRecord(c_r4.patientId));
    });
    \u0275\u0275text(26, " Ficha \u2192 ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const c_r4 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("#E-", c_r4.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(c_r4.encounterDate);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", c_r4.patientName, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(c_r4.consultationType);
    \u0275\u0275advance(2);
    \u0275\u0275property("title", c_r4.chiefComplaint);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r4.chiefComplaint);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(c_r4.primaryDiagnosisCode ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("title", c_r4.primaryDiagnosis);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r4.primaryDiagnosis);
  }
}
function ConsultasComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "table", 17)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Fecha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Paciente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Motivo de Consulta (S)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "Diagn\xF3stico (A)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th");
    \u0275\u0275text(17, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody");
    \u0275\u0275repeaterCreate(19, ConsultasComponent_Conditional_14_For_20_Template, 27, 9, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(19);
    \u0275\u0275repeater(ctx_r1.consultations());
  }
}
function ConsultasComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275element(1, "ng-icon", 28);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "No se encontraron consultas cl\xEDnicas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Intente modificar el filtro de b\xFAsqueda o registre una nueva consulta cl\xEDnica SOAP.");
    \u0275\u0275elementEnd()();
  }
}
function ConsultasComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 29);
    \u0275\u0275listener("click", function ConsultasComponent_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadMore());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.isLoadingMore() || ctx_r1.isLoading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isLoadingMore() ? "Cargando\u2026" : "Cargar m\xE1s consultas", " ");
  }
}
var ConsultasComponent = class _ConsultasComponent {
  service = inject(ClinicalEncounterService);
  activePatientService = inject(ActivePatientService);
  specialtyService = inject(DoctorSpecialtyService);
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  searchQuery = signal(
    "",
    ...ngDevMode ? [{ debugName: "searchQuery" }] : (
      /* istanbul ignore next */
      []
    )
  );
  consultations = signal(
    [],
    ...ngDevMode ? [{ debugName: "consultations" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoading = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLoading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoadingMore = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLoadingMore" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loadError = signal(
    null,
    ...ngDevMode ? [{ debugName: "loadError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  totalElements = signal(
    0,
    ...ngDevMode ? [{ debugName: "totalElements" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentPage = signal(
    0,
    ...ngDevMode ? [{ debugName: "currentPage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  totalPages = signal(
    0,
    ...ngDevMode ? [{ debugName: "totalPages" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasMore = computed(
    () => this.currentPage() + 1 < this.totalPages(),
    ...ngDevMode ? [{ debugName: "hasMore" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reads = new AccountReadScope(() => this.loadConsultations());
  searchTimer;
  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.searchTimer)
        clearTimeout(this.searchTimer);
    });
  }
  ngOnInit() {
    this.loadConsultations();
  }
  onEncounterCreated() {
    this.loadConsultations();
  }
  onScroll() {
    if (typeof window !== "undefined" && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 350)
      this.loadMore();
  }
  onSearch(value) {
    this.searchQuery.set(value);
    this.reads.cancel();
    if (this.searchTimer)
      clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.loadConsultations(), 400);
  }
  loadConsultations() {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
      this.searchTimer = void 0;
    }
    const current = this.reads.begin();
    this.consultations.set([]);
    this.currentPage.set(0);
    this.totalPages.set(0);
    this.totalElements.set(0);
    this.loadError.set(null);
    this.isLoadingMore.set(false);
    if (!this.reads.authenticated()) {
      this.isLoading.set(false);
      return;
    }
    this.isLoading.set(true);
    this.fetch(0, false, current);
  }
  loadMore() {
    if (!this.hasMore() || this.isLoading() || this.isLoadingMore() || !this.reads.authenticated())
      return;
    this.isLoadingMore.set(true);
    this.loadError.set(null);
    this.fetch(this.currentPage() + 1, true, this.reads.begin());
  }
  fetch(page, append, current) {
    this.service.getAll(page, 50, "encounterDate,desc", this.searchQuery()).pipe(takeUntil(this.reads.canceled)).subscribe({
      next: (response) => {
        if (!current())
          return;
        const items = response.content.map((e) => this.map(e));
        this.consultations.update((existing) => append ? [...existing, ...items.filter((item) => !existing.some((e) => e.id === item.id))] : items);
        this.currentPage.set(page);
        this.totalPages.set(getTotalPages(response));
        this.totalElements.set(getTotalElements(response));
        this.isLoading.set(false);
        this.isLoadingMore.set(false);
      },
      error: () => {
        if (current()) {
          this.loadError.set("No se pudo cargar el historial de consultas.");
          this.isLoading.set(false);
          this.isLoadingMore.set(false);
        }
      }
    });
  }
  map(e) {
    const date = new Date(e.encounterDate);
    const labels = {
      FIRST_VISIT: "Primera consulta",
      FOLLOW_UP: "Seguimiento",
      ROUTINE_CHECKUP: "Control de rutina",
      EMERGENCY: "Urgencia",
      INTERCONSULTATION: "Interconsulta"
    };
    return {
      id: e.id,
      patientId: e.patientId,
      patientName: e.patientFullName || "Paciente #" + e.patientId,
      encounterDate: Number.isNaN(date.getTime()) ? "\u2014" : formatInstant(date),
      consultationType: labels[e.consultationType] || e.consultationType,
      chiefComplaint: e.chiefComplaint || "\u2014",
      primaryDiagnosis: e.primaryDiagnosisDescription || "\u2014",
      primaryDiagnosisCode: e.primaryDiagnosisCode
    };
  }
  openPatientRecord(patientId) {
    this.activePatientService.loadPatient(patientId);
    this.router.navigate(["/pacientes", patientId]);
  }
  openEncounterDetail(id) {
    window.dispatchEvent(new CustomEvent("open-encounter-detail-modal", { detail: { encounterId: id } }));
  }
  static \u0275fac = function ConsultasComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConsultasComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConsultasComponent, selectors: [["app-consultas"]], hostBindings: function ConsultasComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("encounter-created", function ConsultasComponent_encounter_created_HostBindingHandler() {
        return ctx.onEncounterCreated();
      }, \u0275\u0275resolveWindow)("encounter-updated", function ConsultasComponent_encounter_updated_HostBindingHandler() {
        return ctx.onEncounterCreated();
      }, \u0275\u0275resolveWindow)("encounter-deleted", function ConsultasComponent_encounter_deleted_HostBindingHandler() {
        return ctx.onEncounterCreated();
      }, \u0275\u0275resolveWindow)("scroll", function ConsultasComponent_scroll_HostBindingHandler() {
        return ctx.onScroll();
      }, \u0275\u0275resolveWindow);
    }
  }, features: [\u0275\u0275ProvidersFeature([provideIcons({ lucideSearch, lucideStethoscope })])], decls: 17, vars: 5, consts: [[1, "consultas-page"], [1, "consultas-header"], [1, "title-group"], [1, "page-title"], [1, "page-subtitle"], [1, "filter-toolbar-card"], [1, "search-input-wrap"], ["name", "lucideSearch", 1, "search-icon"], ["type", "search", "placeholder", "Buscar por paciente, motivo o c\xF3digo CIE-10...", 1, "filter-input", 3, "ngModelChange", "ngModel"], ["role", "alert"], [1, "consultas-table-card"], [1, "consultas-loading"], [1, "table-container"], [1, "consultas-empty"], ["type", "button", 1, "btn-detail", 3, "disabled"], ["type", "button", 1, "btn-detail", 3, "click"], [1, "consultas-spinner"], [1, "clinical-table"], [1, "text-slate-600", "font-medium"], [1, "patient-link", 3, "click"], [1, "text-xs", "text-slate-600"], [1, "complaint-text", 3, "title"], [1, "diag-group"], [1, "diag-code"], [1, "diag-desc", 3, "title"], [1, "actions-group"], ["type", "button", "title", "Ver SOAP completo", 1, "btn-detail", 3, "click"], ["type", "button", "title", "Ir a Ficha", 1, "btn-view-patient", 3, "click"], ["name", "lucideStethoscope", 1, "empty-icon"], ["type", "button", 1, "btn-detail", 3, "click", "disabled"]], template: function ConsultasComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "h1", 3);
      \u0275\u0275text(4, "Historial de Consultas Cl\xEDnicas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "div", 5)(8, "div", 6);
      \u0275\u0275element(9, "ng-icon", 7);
      \u0275\u0275elementStart(10, "input", 8);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function ConsultasComponent_Template_input_ngModelChange_10_listener($event) {
        return ctx.onSearch($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(11, ConsultasComponent_Conditional_11_Template, 4, 1, "p", 9);
      \u0275\u0275elementStart(12, "div", 10);
      \u0275\u0275conditionalCreate(13, ConsultasComponent_Conditional_13_Template, 4, 0, "div", 11)(14, ConsultasComponent_Conditional_14_Template, 21, 0, "div", 12)(15, ConsultasComponent_Conditional_15_Template, 6, 0, "div", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(16, ConsultasComponent_Conditional_16_Template, 2, 2, "button", 14);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_3_0;
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("Consultas de tus pacientes en ", ctx.specialtyService.currentSpecialtyOption().label);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngModel", ctx.searchQuery());
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_3_0 = ctx.loadError()) ? 11 : -1, tmp_3_0);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isLoading() ? 13 : ctx.consultations().length > 0 ? 14 : 15);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.hasMore() ? 16 : -1);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, NgIcon], styles: ["\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  width: 100%;\n}\n.consultas-page[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n  width: 100%;\n  flex: 1;\n}\n.consultas-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.title-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #0f172a);\n  margin: 0;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  margin: 0;\n}\n.cta-primary-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  background-color: #006874;\n  color: #ffffff;\n  border: none;\n  border-radius: 9px;\n  padding: 0.55rem 1rem;\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n}\n.cta-primary-btn[_ngcontent-%COMP%]:hover {\n  background-color: #00505a;\n}\n.filter-toolbar-card[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 12px;\n  padding: 0.85rem 1rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.search-input-wrap[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 240px;\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.75rem;\n  color: var(--%NS%dc-ink-muted, #94a3b8);\n  font-size: 1rem;\n}\n.filter-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.45rem 0.75rem 0.45rem 2.2rem;\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 8px;\n  font-size: 0.85rem;\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  outline: none;\n}\n.filter-input[_ngcontent-%COMP%]:focus {\n  background-color: var(--%NS%dc-surface, #ffffff);\n  border-color: #006874;\n}\n.consultas-table-card[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 14px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n  overflow: hidden;\n}\n.table-container[_ngcontent-%COMP%] {\n  width: 100%;\n  overflow-x: auto;\n}\n.clinical-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.85rem;\n  text-align: left;\n}\n.clinical-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  border-bottom: 1px solid var(--%NS%dc-outline, #e2e8f0);\n}\n.clinical-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink-secondary, #475569);\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.clinical-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.85rem 1rem;\n  border-bottom: 1px solid var(--%NS%dc-outline, #f1f5f9);\n  vertical-align: middle;\n}\n.patient-link[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--%NS%dc-teal-ink, #006874);\n  cursor: pointer;\n}\n.patient-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.complaint-text[_ngcontent-%COMP%] {\n  max-width: 200px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  display: block;\n}\n.diag-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n}\n.diag-code[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  background-color: var(--%NS%dc-surface-high, #f1f5f9);\n  color: var(--%NS%dc-teal-ink, #006874);\n  padding: 1px 5px;\n  border-radius: 4px;\n}\n.diag-desc[_ngcontent-%COMP%] {\n  max-width: 220px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.actions-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.btn-detail[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  color: var(--%NS%dc-ink-secondary, #334155);\n  border-radius: 6px;\n  padding: 0.3rem 0.6rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.btn-detail[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-surface-high, #e2e8f0);\n}\n.btn-view-patient[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  color: var(--%NS%dc-teal-ink, #006874);\n  border-radius: 6px;\n  padding: 0.3rem 0.6rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.btn-view-patient[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-teal-surface, #f0fdfa);\n}\n.consultas-loading[_ngcontent-%COMP%], \n.consultas-empty[_ngcontent-%COMP%] {\n  padding: 3.5rem;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  color: #cbd5e1;\n  margin-bottom: 0.5rem;\n}\n.consultas-spinner[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border: 3px solid var(--%NS%dc-outline, #e2e8f0);\n  border-top-color: #006874;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=consultas.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConsultasComponent, [{
    type: Component,
    args: [{ selector: "app-consultas", imports: [FormsModule, NgIcon], providers: [provideIcons({ lucideSearch, lucideStethoscope })], template: `<div class="consultas-page">
  <header class="consultas-header">
    <div class="title-group">
      <h1 class="page-title">Historial de Consultas Cl\xEDnicas</h1>
      <p class="page-subtitle">Consultas de tus pacientes en {{ specialtyService.currentSpecialtyOption().label }}</p>
    </div>
  </header>

  <!-- Filter Toolbar -->
  <div class="filter-toolbar-card">
    <div class="search-input-wrap">
      <ng-icon name="lucideSearch" class="search-icon" />
      <input
        type="search"
        class="filter-input"
        placeholder="Buscar por paciente, motivo o c\xF3digo CIE-10..."
        [ngModel]="searchQuery()"
        (ngModelChange)="onSearch($event)"
      />
    </div>
  </div>

  @if (loadError(); as error) { <p role="alert">{{ error }} <button type="button" class="btn-detail" (click)="loadConsultations()">Reintentar</button></p> }
  <!-- Consultations Table -->
  <div class="consultas-table-card">
    @if (isLoading()) {
      <div class="consultas-loading">
        <div class="consultas-spinner"></div>
        <span>Cargando consultas cl\xEDnicas...</span>
      </div>
    } @else if (consultations().length > 0) {
      <div class="table-container">
        <table class="clinical-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Paciente</th>
              <th>Tipo</th>
              <th>Motivo de Consulta (S)</th>
              <th>Diagn\xF3stico (A)</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (c of consultations(); track c.id) {
              <tr>
                <td><strong>#E-{{ c.id }}</strong></td>
                <td><span class="text-slate-600 font-medium">{{ c.encounterDate }}</span></td>
                <td>
                  <span class="patient-link" (click)="openPatientRecord(c.patientId)">
                    {{ c.patientName }}
                  </span>
                </td>
                <td><span class="text-xs text-slate-600">{{ c.consultationType }}</span></td>
                <td><span class="complaint-text" [title]="c.chiefComplaint">{{ c.chiefComplaint }}</span></td>
                <td>
                  <div class="diag-group">
                    @if (c.primaryDiagnosisCode) {
                      <span class="diag-code">{{ c.primaryDiagnosisCode }}</span>
                    }
                    <span class="diag-desc" [title]="c.primaryDiagnosis">{{ c.primaryDiagnosis }}</span>
                  </div>
                </td>
                <td>
                  <div class="actions-group">
                    <button
                      type="button"
                      class="btn-detail"
                      (click)="openEncounterDetail(c.id)"
                      title="Ver SOAP completo"
                    >
                      Ver Detalle
                    </button>
                    <button
                      type="button"
                      class="btn-view-patient"
                      (click)="openPatientRecord(c.patientId)"
                      title="Ir a Ficha"
                    >
                      Ficha \u2192
                    </button>
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    } @else {
      <div class="consultas-empty">
        <ng-icon name="lucideStethoscope" class="empty-icon" />
        <h3>No se encontraron consultas cl\xEDnicas</h3>
        <p>Intente modificar el filtro de b\xFAsqueda o registre una nueva consulta cl\xEDnica SOAP.</p>
      </div>
    }
  </div>
  @if (hasMore()) {
    <button type="button" class="btn-detail" [disabled]="isLoadingMore() || isLoading()" (click)="loadMore()">
      {{ isLoadingMore() ? 'Cargando\u2026' : 'Cargar m\xE1s consultas' }}
    </button>
  }
</div>
`, styles: ["/* src/app/features/consultas/consultas.component.css */\n:host {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  width: 100%;\n}\n.consultas-page {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n  width: 100%;\n  flex: 1;\n}\n.consultas-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.title-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.page-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--dc-ink, #0f172a);\n  margin: 0;\n}\n.page-subtitle {\n  font-size: 0.85rem;\n  color: var(--dc-ink-muted, #64748b);\n  margin: 0;\n}\n.cta-primary-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  background-color: #006874;\n  color: #ffffff;\n  border: none;\n  border-radius: 9px;\n  padding: 0.55rem 1rem;\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n}\n.cta-primary-btn:hover {\n  background-color: #00505a;\n}\n.filter-toolbar-card {\n  background: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 12px;\n  padding: 0.85rem 1rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.search-input-wrap {\n  flex: 1;\n  min-width: 240px;\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.search-icon {\n  position: absolute;\n  left: 0.75rem;\n  color: var(--dc-ink-muted, #94a3b8);\n  font-size: 1rem;\n}\n.filter-input {\n  width: 100%;\n  padding: 0.45rem 0.75rem 0.45rem 2.2rem;\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  border-radius: 8px;\n  font-size: 0.85rem;\n  background-color: var(--dc-surface-low, #f8fafc);\n  outline: none;\n}\n.filter-input:focus {\n  background-color: var(--dc-surface, #ffffff);\n  border-color: #006874;\n}\n.consultas-table-card {\n  background: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 14px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n  overflow: hidden;\n}\n.table-container {\n  width: 100%;\n  overflow-x: auto;\n}\n.clinical-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.85rem;\n  text-align: left;\n}\n.clinical-table thead {\n  background-color: var(--dc-surface-low, #f8fafc);\n  border-bottom: 1px solid var(--dc-outline, #e2e8f0);\n}\n.clinical-table th {\n  padding: 0.75rem 1rem;\n  font-weight: 600;\n  color: var(--dc-ink-secondary, #475569);\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.clinical-table td {\n  padding: 0.85rem 1rem;\n  border-bottom: 1px solid var(--dc-outline, #f1f5f9);\n  vertical-align: middle;\n}\n.patient-link {\n  font-weight: 600;\n  color: var(--dc-teal-ink, #006874);\n  cursor: pointer;\n}\n.patient-link:hover {\n  text-decoration: underline;\n}\n.complaint-text {\n  max-width: 200px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  display: block;\n}\n.diag-group {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n}\n.diag-code {\n  font-size: 0.7rem;\n  font-weight: 700;\n  background-color: var(--dc-surface-high, #f1f5f9);\n  color: var(--dc-teal-ink, #006874);\n  padding: 1px 5px;\n  border-radius: 4px;\n}\n.diag-desc {\n  max-width: 220px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.actions-group {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.btn-detail {\n  background: var(--dc-surface-high, #f1f5f9);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  color: var(--dc-ink-secondary, #334155);\n  border-radius: 6px;\n  padding: 0.3rem 0.6rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.btn-detail:hover {\n  background: var(--dc-surface-high, #e2e8f0);\n}\n.btn-view-patient {\n  background: transparent;\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  color: var(--dc-teal-ink, #006874);\n  border-radius: 6px;\n  padding: 0.3rem 0.6rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.btn-view-patient:hover {\n  background: var(--dc-teal-surface, #f0fdfa);\n}\n.consultas-loading,\n.consultas-empty {\n  padding: 3.5rem;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  color: var(--dc-ink-muted, #64748b);\n}\n.empty-icon {\n  font-size: 2.5rem;\n  color: #cbd5e1;\n  margin-bottom: 0.5rem;\n}\n.consultas-spinner {\n  width: 24px;\n  height: 24px;\n  border: 3px solid var(--dc-outline, #e2e8f0);\n  border-top-color: #006874;\n  border-radius: 50%;\n  animation: spin 0.7s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=consultas.component.css.map */\n"] }]
  }], () => [], { onEncounterCreated: [{
    type: HostListener,
    args: ["window:encounter-created"]
  }, {
    type: HostListener,
    args: ["window:encounter-updated"]
  }, {
    type: HostListener,
    args: ["window:encounter-deleted"]
  }], onScroll: [{
    type: HostListener,
    args: ["window:scroll"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConsultasComponent, { className: "ConsultasComponent", filePath: "src/app/features/consultas/consultas.component.ts", lineNumber: 41 });
})();
export {
  ConsultasComponent
};
//# debugId=c8bf3d6b-8b60-5006-8b48-c4e550626c91
//# sourceMappingURL=chunk-7ELYJ5DI.js.map
