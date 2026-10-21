import {
  SessionCoordinatorService
} from "./chunk-VIJXNZAN.js";
import {
  displayLocalDate
} from "./chunk-6MPLKXQY.js";
import {
  PatientRecordActionsService,
  doctorPrintIdentity
} from "./chunk-JNSPAAVP.js";
import {
  DynamicFormRendererComponent,
  conflictKind,
  errorMessage,
  inputValues,
  userDateTime
} from "./chunk-UP7TIIOF.js";
import "./chunk-X5CFNW5T.js";
import {
  AccountReadScope
} from "./chunk-7FWLAUOT.js";
import {
  ClinicalEncounterService
} from "./chunk-5GX3SGKL.js";
import "./chunk-6MFCUZUR.js";
import "./chunk-WMGV2OO2.js";
import {
  ActivePatientService,
  PatientService,
  UserClockService
} from "./chunk-KDJQW6YV.js";
import {
  DoctorProfileService
} from "./chunk-WXC7F5DT.js";
import "./chunk-YTAXUAO7.js";
import {
  FEATURE_FLAGS,
  WorkspaceStore
} from "./chunk-WPGAV52V.js";
import {
  DoctorSpecialtyService
} from "./chunk-USM5S45Q.js";
import "./chunk-QAJPJLTD.js";
import "./chunk-THOV7R4G.js";
import {
  LoginPageComponent
} from "./chunk-RSF6XMUY.js";
import "./chunk-D4J4ETKO.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-BQIFWLNB.js";
import {
  AuthService
} from "./chunk-KGUDCUHJ.js";
import {
  environment
} from "./chunk-WKCAPCQH.js";
import {
  ThemeToggleComponent
} from "./chunk-GDDBOYJO.js";
import "./chunk-5V3TTGBI.js";
import {
  NgIcon,
  lucideCalculator,
  lucideCalendarDays,
  lucideChevronLeft,
  lucideChevronRight,
  lucideExternalLink,
  lucideLayoutDashboard,
  lucideLogOut,
  lucideSearch,
  lucideShield,
  lucideSliders,
  lucideStethoscope,
  lucideType,
  lucideUser,
  lucideUserPlus,
  lucideUsers,
  lucideX,
  provideIcons
} from "./chunk-Z3UJ4PSI.js";
import {
  BrowserUiStorageService
} from "./chunk-WBCHXDEU.js";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-XM57RTTR.js";
import "./chunk-YAYJVLGH.js";
import {
  isPlatformBrowser
} from "./chunk-SYX7XZ26.js";
import {
  Component,
  ElementRef,
  HostListener,
  Injectable,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation,
  afterNextRender,
  computed,
  effect,
  firstValueFrom,
  inject,
  setClassMetadata,
  setClassMetadataAsync,
  signal,
  takeUntil,
  untracked,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefer,
  ɵɵdeferOnIdle,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵdomTemplate,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵviewQuerySignal
} from "./chunk-3HO5VEWU.js";

// src/app/core/services/accessibility.service.ts
var AccessibilityService = class _AccessibilityService {
  platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  storage = inject(BrowserUiStorageService);
  fontSizeLevel = signal(
    this.storage.readFontSize(),
    ...ngDevMode ? [{ debugName: "fontSizeLevel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  fontSizeLabel = computed(
    () => {
      switch (this.fontSizeLevel()) {
        case "large":
          return "Grande";
        case "xlarge":
          return "Muy Grande";
        default:
          return "Normal";
      }
    },
    ...ngDevMode ? [{ debugName: "fontSizeLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    if (this.isBrowser) {
      effect(() => {
        const level = this.fontSizeLevel();
        const root = document.documentElement;
        root.classList.remove("font-size-normal", "font-size-large", "font-size-xlarge");
        root.classList.add(`font-size-${level}`);
        this.storage.writeFontSize(level);
      });
    }
  }
  setFontSize(level) {
    this.fontSizeLevel.set(level);
  }
  toggleFontSize() {
    const current = this.fontSizeLevel();
    if (current === "normal") {
      this.fontSizeLevel.set("large");
    } else if (current === "large") {
      this.fontSizeLevel.set("xlarge");
    } else {
      this.fontSizeLevel.set("normal");
    }
  }
  increaseFontSize() {
    const current = this.fontSizeLevel();
    if (current === "normal") {
      this.fontSizeLevel.set("large");
    } else if (current === "large") {
      this.fontSizeLevel.set("xlarge");
    }
  }
  decreaseFontSize() {
    const current = this.fontSizeLevel();
    if (current === "xlarge") {
      this.fontSizeLevel.set("large");
    } else if (current === "large") {
      this.fontSizeLevel.set("normal");
    }
  }
  resetFontSize() {
    this.fontSizeLevel.set("normal");
  }
  static \u0275fac = function AccessibilityService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AccessibilityService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AccessibilityService, factory: _AccessibilityService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccessibilityService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// src/app/layout/header/header.component.ts
var _c0 = ["searchInput"];
function HeaderComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Administraci\xF3n de especialidades");
    \u0275\u0275elementEnd();
  }
}
function HeaderComponent_Conditional_22_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.planBadgeLabel());
  }
}
function HeaderComponent_Conditional_22_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 27);
    \u0275\u0275element(1, "ng-icon", 28);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Planes y Suscripci\xF3n ByCode");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 23);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_22_Conditional_10_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.handleProfileClick());
    });
    \u0275\u0275element(5, "ng-icon", 29);
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7, "Perfil Profesional");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("href", ctx_r1.bycodePlansUrl, \u0275\u0275sanitizeUrl);
  }
}
function HeaderComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_22_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(1, "div", 17)(2, "span", 18);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 19);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, HeaderComponent_Conditional_22_Conditional_6_Template, 2, 1, "span", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 21);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "div", 22);
    \u0275\u0275conditionalCreate(10, HeaderComponent_Conditional_22_Conditional_10_Template, 8, 1);
    \u0275\u0275elementStart(11, "button", 23);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_22_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openWizardConfig());
    });
    \u0275\u0275element(12, "ng-icon", 24);
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(15, "div", 22);
    \u0275\u0275elementStart(16, "button", 25);
    \u0275\u0275listener("click", function HeaderComponent_Conditional_22_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleSignOut());
    });
    \u0275\u0275element(17, "ng-icon", 26);
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19, "Cerrar Sesi\xF3n");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.authService.userName() || "Profesional M\xE9dico");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.authService.userEmail());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.planBadgeLabel() ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Horario del dispositivo: ", ctx_r1.timeZone);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r1.authService.isSuperAdmin() ? 10 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.authService.isSuperAdmin() ? "Especialidades y wizards" : "Personalizar Fichas y Consultas");
  }
}
var HeaderComponent = class _HeaderComponent {
  clock = inject(UserClockService);
  get timeZone() {
    return this.clock.timeZone();
  }
  authService = inject(AuthService);
  activePatientService = inject(ActivePatientService);
  patientService = inject(PatientService);
  doctorProfileService = inject(DoctorProfileService);
  accessibilityService = inject(AccessibilityService);
  router = inject(Router);
  elementRef = inject(ElementRef);
  searchInputRef = viewChild(
    "searchInput",
    ...ngDevMode ? [{ debugName: "searchInputRef" }] : (
      /* istanbul ignore next */
      []
    )
  );
  searchQuery = signal(
    "",
    ...ngDevMode ? [{ debugName: "searchQuery" }] : (
      /* istanbul ignore next */
      []
    )
  );
  searchResults = signal(
    [],
    ...ngDevMode ? [{ debugName: "searchResults" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSearching = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSearching" }] : (
      /* istanbul ignore next */
      []
    )
  );
  searchError = signal(
    null,
    ...ngDevMode ? [{ debugName: "searchError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  displayDate = displayLocalDate;
  isSearchOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSearchOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isProfileMenuOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isProfileMenuOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  bycodePlansUrl = environment.bycodePlansUrl;
  bycodeUrl = new URL("/", environment.bycodePlansUrl).href;
  debounceTimer = null;
  searchReads = new AccountReadScope(() => this.clearSearch());
  planBadgeLabel = computed(
    () => {
      if (!this.authService.hasDoctorchartPlan()) {
        return null;
      }
      const tier = this.authService.doctorchartPlanTier();
      if (tier === "SUPER_ADMIN") {
        return "Super Admin";
      }
      if (tier) {
        return `Plan ${tier}`;
      }
      return "Plan Activo";
    },
    ...ngDevMode ? [{ debugName: "planBadgeLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  clinicianInitials = computed(
    () => {
      if (this.authService.isLoggedIn()) {
        const name = this.authService.userName();
        if (name) {
          const parts = name.trim().split(/\s+/);
          if (parts.length >= 2) {
            return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
          }
          return name.slice(0, 2).toUpperCase();
        }
      }
      return "DC";
    },
    ...ngDevMode ? [{ debugName: "clinicianInitials" }] : (
      /* istanbul ignore next */
      []
    )
  );
  handleGlobalShortcut(event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      const input = this.searchInputRef()?.nativeElement;
      if (input) {
        input.focus();
        input.select();
      }
    } else if (event.key === "Escape") {
      this.isSearchOpen.set(false);
      this.isProfileMenuOpen.set(false);
    }
  }
  onSearchInput(event) {
    this.search(event.target.value);
  }
  retrySearch() {
    this.search(this.searchQuery());
  }
  search(q) {
    if (this.authService.isSuperAdmin()) {
      this.clearSearch();
      return;
    }
    const current = this.searchReads.begin();
    this.searchResults.set([]);
    this.searchError.set(null);
    this.searchQuery.set(q);
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    if (!q || !q.trim()) {
      this.searchResults.set([]);
      this.isSearchOpen.set(false);
      this.isSearching.set(false);
      return;
    }
    this.isSearching.set(true);
    this.isSearchOpen.set(true);
    this.debounceTimer = setTimeout(() => {
      if (!current() || this.authService.isSuperAdmin() || !this.searchReads.authenticated()) {
        this.isSearching.set(false);
        return;
      }
      this.patientService.getPatients(0, 8, "fullName,asc", q.trim()).pipe(takeUntil(this.searchReads.canceled)).subscribe({
        next: (res) => {
          if (!current())
            return;
          this.searchResults.set(res?.content || []);
          this.isSearching.set(false);
        },
        error: () => {
          if (!current())
            return;
          this.searchError.set("No se pudo realizar la b\xFAsqueda.");
          this.searchResults.set([]);
          this.isSearching.set(false);
        }
      });
    }, 250);
  }
  onSearchFocus() {
    if (this.searchQuery().trim().length > 0) {
      this.isSearchOpen.set(true);
    }
  }
  selectPatient(patient) {
    this.activePatientService.loadPatient(patient.id);
    this.clearSearch();
    this.router.navigate(["/pacientes", patient.id]);
  }
  clearSearch(event) {
    this.searchReads.cancel();
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    this.isSearching.set(false);
    this.searchError.set(null);
    if (event)
      event.stopPropagation();
    this.searchQuery.set("");
    this.searchResults.set([]);
    this.isSearchOpen.set(false);
  }
  toggleProfileMenu(event) {
    event.stopPropagation();
    this.isProfileMenuOpen.update((v) => !v);
  }
  onDocumentClick(event) {
    const target = event.target;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.isSearchOpen.set(false);
      this.isProfileMenuOpen.set(false);
    }
  }
  handleProfileClick() {
    this.isProfileMenuOpen.set(false);
    this.authService.openProfileModal();
    window.dispatchEvent(new CustomEvent("open-profile-modal"));
  }
  openWizardConfig() {
    this.isProfileMenuOpen.set(false);
    this.router.navigate([this.authService.isSuperAdmin() ? "/admin/especialidades" : "/onboarding/setup"]);
  }
  ngOnDestroy() {
    if (this.debounceTimer)
      clearTimeout(this.debounceTimer);
  }
  async handleSignOut() {
    this.isProfileMenuOpen.set(false);
    await this.authService.signOut();
  }
  static \u0275fac = function HeaderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HeaderComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HeaderComponent, selectors: [["app-header"]], viewQuery: function HeaderComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.searchInputRef, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, hostBindings: function HeaderComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown", function HeaderComponent_keydown_HostBindingHandler($event) {
        return ctx.handleGlobalShortcut($event);
      }, \u0275\u0275resolveWindow)("click", function HeaderComponent_click_HostBindingHandler($event) {
        return ctx.onDocumentClick($event);
      }, \u0275\u0275resolveDocument);
    }
  }, features: [\u0275\u0275ProvidersFeature([
    provideIcons({
      lucideSearch,
      lucideUser,
      lucideLogOut,
      lucideExternalLink,
      lucideShield,
      lucideStethoscope,
      lucideUserPlus,
      lucideX,
      lucideSliders,
      lucideType
    })
  ])], decls: 23, vars: 7, consts: [[1, "top-app-header"], [1, "header-left"], [1, "header-center"], [1, "header-right"], ["aria-label", "Ir a ByCode", "title", "Ir a ByCode", 1, "bycode-link", 3, "href"], ["src", "/bycode-logo.svg", "alt", "", "aria-hidden", "true"], [1, "accessibility-ctrl"], ["type", "button", "aria-label", "Ajustar tama\xF1o de letra de la plataforma", 1, "accessibility-btn", 3, "click", "title"], ["name", "lucideType", 1, "accessibility-icon"], [1, "accessibility-text"], [1, "accessibility-badge"], [1, "profile-menu-container"], ["type", "button", 1, "profile-avatar-btn", 3, "click", "title"], [1, "avatar-circle"], [1, "online-indicator"], [1, "profile-dropdown-menu"], [1, "profile-dropdown-menu", 3, "click"], [1, "profile-dropdown-header"], [1, "user-fullname"], [1, "user-email"], [1, "user-plan-pill"], [1, "timezone-label"], [1, "profile-menu-divider"], ["type", "button", 1, "dropdown-action-item", 3, "click"], ["name", "lucideSliders", 1, "menu-action-icon"], ["type", "button", 1, "dropdown-action-item", "logout-item", 3, "click"], ["name", "lucideLogOut", 1, "menu-action-icon", "text-rose-500"], ["target", "_blank", "rel", "noopener noreferrer", 1, "dropdown-action-item", 3, "href"], ["name", "lucideExternalLink", 1, "menu-action-icon"], ["name", "lucideUser", 1, "menu-action-icon"]], template: function HeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "header", 0);
      \u0275\u0275element(1, "div", 1);
      \u0275\u0275elementStart(2, "div", 2);
      \u0275\u0275conditionalCreate(3, HeaderComponent_Conditional_3_Template, 2, 0, "span");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 3);
      \u0275\u0275element(5, "app-theme-toggle");
      \u0275\u0275elementStart(6, "a", 4);
      \u0275\u0275element(7, "img", 5);
      \u0275\u0275elementStart(8, "span");
      \u0275\u0275text(9, "ByCode");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 6)(11, "button", 7);
      \u0275\u0275listener("click", function HeaderComponent_Template_button_click_11_listener() {
        return ctx.accessibilityService.toggleFontSize();
      });
      \u0275\u0275element(12, "ng-icon", 8);
      \u0275\u0275elementStart(13, "span", 9);
      \u0275\u0275text(14, "A+");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "span", 10);
      \u0275\u0275text(16);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(17, "div", 11)(18, "button", 12);
      \u0275\u0275listener("click", function HeaderComponent_Template_button_click_18_listener($event) {
        return ctx.toggleProfileMenu($event);
      });
      \u0275\u0275elementStart(19, "span", 13);
      \u0275\u0275text(20);
      \u0275\u0275elementEnd();
      \u0275\u0275element(21, "span", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(22, HeaderComponent_Conditional_22_Template, 20, 6, "div", 15);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.authService.isSuperAdmin() ? 3 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275property("href", ctx.bycodeUrl, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(5);
      \u0275\u0275property("title", "Accesibilidad visual: Fuente " + ctx.accessibilityService.fontSizeLabel() + " (Clic para cambiar tama\xF1o)");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.accessibilityService.fontSizeLabel());
      \u0275\u0275advance(2);
      \u0275\u0275property("title", ctx.authService.userName() || "Perfil M\xE9dico");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.clinicianInitials());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isProfileMenuOpen() ? 22 : -1);
    }
  }, dependencies: [NgIcon, ThemeToggleComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  position: sticky;\n  top: 0;\n  z-index: 30;\n}\n.top-app-header[_ngcontent-%COMP%] {\n  height: 64px;\n  background-color: var(--%NS%dc-surface, #ffffff);\n  border-bottom: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 1.5rem;\n  gap: 1.5rem;\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  min-width: 140px;\n}\n.header-center[_ngcontent-%COMP%] {\n  flex: 1;\n  max-width: 520px;\n  display: flex;\n  justify-content: center;\n  position: relative;\n}\n.omnibox-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 10px;\n  padding: 0 0.75rem;\n  height: 40px;\n  transition: all 0.2s ease;\n}\n.omnibox-wrapper[_ngcontent-%COMP%]:hover, \n.omnibox-wrapper.is-focused[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-surface, #ffffff);\n  border-color: #006874;\n  box-shadow: 0 0 0 3px rgba(0, 104, 116, 0.12);\n}\n.omnibox-icon[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink-muted, #94a3b8);\n  font-size: 1.1rem;\n  margin-right: 0.5rem;\n  flex-shrink: 0;\n}\n.omnibox-input[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none;\n  background: transparent;\n  font-size: 0.88rem;\n  color: var(--%NS%dc-ink, #0f172a);\n  outline: none;\n}\n.omnibox-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--%NS%dc-ink-muted, #94a3b8);\n}\n.omnibox-right-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  flex-shrink: 0;\n}\n.shortcut-badge[_ngcontent-%COMP%] {\n  font-family: inherit;\n  font-size: 0.7rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  background-color: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 5px;\n  padding: 2px 6px;\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n}\n.omnibox-clear-btn[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: var(--%NS%dc-ink-muted, #94a3b8);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  padding: 2px;\n  border-radius: 4px;\n}\n.omnibox-clear-btn[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%dc-ink, #0f172a);\n  background-color: var(--%NS%dc-surface-high, #f1f5f9);\n}\n.search-dropdown-card[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 6px);\n  left: 0;\n  right: 0;\n  background: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 12px;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);\n  overflow: hidden;\n  z-index: 50;\n  max-height: 400px;\n  display: flex;\n  flex-direction: column;\n}\n.search-dropdown-loading[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.75rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  font-size: 0.88rem;\n}\n.spinner-ring[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border: 2px solid var(--%NS%dc-outline, #e2e8f0);\n  border-top-color: #006874;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n.search-dropdown-header[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.85rem;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  border-bottom: 1px solid var(--%NS%dc-outline, #f1f5f9);\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.search-dropdown-list[_ngcontent-%COMP%] {\n  overflow-y: auto;\n  padding: 0.35rem 0;\n}\n.search-result-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.65rem 0.85rem;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n  border-bottom: 1px solid #f8fafc;\n}\n.search-result-row[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-teal-surface, #f0fdfa);\n}\n.result-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: var(--%NS%dc-teal-surface, #e6f6f8);\n  color: var(--%NS%dc-teal-ink, #006874);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 0.75rem;\n  flex-shrink: 0;\n}\n.result-info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.result-name[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.result-meta[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.result-action[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: var(--%NS%dc-teal-ink, #006874);\n}\n.search-dropdown-empty[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  text-align: center;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  font-size: 0.88rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.75rem;\n}\n.btn-register-quick[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  background-color: #006874;\n  color: #ffffff;\n  padding: 0.45rem 0.85rem;\n  border-radius: 8px;\n  font-size: 0.82rem;\n  font-weight: 600;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n}\n.btn-register-quick[_ngcontent-%COMP%]:hover {\n  background-color: #004f58;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n}\n.create-menu-container[_ngcontent-%COMP%] {\n  position: relative;\n}\n.primary-create-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  background-color: #006874;\n  color: #ffffff;\n  border: none;\n  border-radius: 9px;\n  padding: 0.48rem 0.95rem;\n  font-size: 0.88rem;\n  font-weight: 600;\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(0, 104, 116, 0.25);\n  transition: all 0.15s ease;\n}\n.primary-create-btn[_ngcontent-%COMP%]:hover {\n  background-color: #00505a;\n  box-shadow: 0 4px 10px rgba(0, 104, 116, 0.35);\n}\n.chevron-icon[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  transition: transform 0.2s ease;\n}\n.chevron-icon.rotate[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n.create-dropdown-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 8px);\n  right: 0;\n  width: 260px;\n  background: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 12px;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.05);\n  padding: 0.4rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  z-index: 50;\n  animation: _ngcontent-%COMP%_fadeIn 0.15s ease;\n}\n.dropdown-menu-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.6rem 0.75rem;\n  background: transparent;\n  border: none;\n  border-radius: 8px;\n  text-align: left;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n  width: 100%;\n}\n.dropdown-menu-item[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n}\n.item-primary-highlight[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-teal-surface, #f0fdfa);\n}\n.item-primary-highlight[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-teal-surface, #ccfbf1);\n}\n.item-icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  flex-shrink: 0;\n}\n.item-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.item-title[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.item-desc[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.profile-menu-container[_ngcontent-%COMP%] {\n  position: relative;\n}\n.profile-avatar-btn[_ngcontent-%COMP%] {\n  position: relative;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n  display: flex;\n  align-items: center;\n}\n.avatar-circle[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      #006874 0%,\n      #004d56 100%);\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.85rem;\n  font-weight: 700;\n  border: 2px solid #ffffff;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);\n}\n.online-indicator[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  width: 10px;\n  height: 10px;\n  background-color: #16a34a;\n  border: 2px solid #ffffff;\n  border-radius: 50%;\n}\n.profile-dropdown-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 8px);\n  right: 0;\n  width: 250px;\n  background: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 12px;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.05);\n  padding: 0.5rem;\n  display: flex;\n  flex-direction: column;\n  z-index: 50;\n  animation: _ngcontent-%COMP%_fadeIn 0.15s ease;\n}\n.profile-dropdown-header[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.65rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n.user-fullname[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.user-email[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.user-plan-pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-top: 0.35rem;\n  padding: 2px 7px;\n  background-color: var(--%NS%dc-surface-high, #f1f5f9);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 6px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  color: var(--%NS%dc-teal-ink, #006874);\n  width: fit-content;\n}\n.profile-menu-divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background-color: var(--%NS%dc-surface-high, #f1f5f9);\n  margin: 0.4rem 0;\n}\n.dropdown-action-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  padding: 0.55rem 0.65rem;\n  border-radius: 8px;\n  background: transparent;\n  border: none;\n  font-size: 0.85rem;\n  font-weight: 500;\n  color: var(--%NS%dc-ink-secondary, #334155);\n  text-decoration: none;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n  width: 100%;\n  text-align: left;\n}\n.dropdown-action-item[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.logout-item[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-error-surface, #fff1f2);\n  color: var(--%NS%dc-error-ink, #e11d48);\n}\n.menu-action-icon[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.accessibility-ctrl[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.accessibility-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 8px;\n  padding: 0.35rem 0.65rem;\n  cursor: pointer;\n  color: var(--%NS%dc-ink-secondary, #334155);\n  font-size: 0.8rem;\n  font-weight: 600;\n  transition: all 0.15s ease;\n}\n.accessibility-btn[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n  border-color: #94a3b8;\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.accessibility-icon[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: var(--%NS%dc-teal-ink, #006874);\n}\n.accessibility-text[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--%NS%dc-teal-ink, #006874);\n}\n.accessibility-badge[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  background: var(--%NS%dc-surface-high, #e2e8f0);\n  padding: 1px 5px;\n  border-radius: 4px;\n}\n@media (max-width: 768px) {\n  .top-app-header[_ngcontent-%COMP%] {\n    padding: 0 0.75rem;\n    gap: 0.75rem;\n  }\n  .header-left[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .header-center[_ngcontent-%COMP%] {\n    min-width: 0;\n  }\n  .header-center[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .header-right[_ngcontent-%COMP%] {\n    flex-shrink: 0;\n    gap: 0.75rem;\n  }\n}\n.bycode-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 7px;\n  height: 36px;\n  padding: 0 12px;\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 999px;\n  background: var(--%NS%dc-surface, #fff);\n  color: var(--%NS%md-sys-color-primary, #006874);\n  font-size: 12px;\n  font-weight: 600;\n  text-decoration: none;\n  white-space: nowrap;\n}\n.bycode-link[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  object-fit: contain;\n}\n.bycode-link[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-surface-low, #f0f7f8);\n}\n.bycode-link[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--%NS%md-sys-color-primary, #006874);\n  outline-offset: 3px;\n}\n@media (max-width: 639px) {\n  .bycode-link[_ngcontent-%COMP%] {\n    width: 36px;\n    padding: 0;\n  }\n  .bycode-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .top-app-header[_ngcontent-%COMP%]   .header-right[_ngcontent-%COMP%] {\n    gap: 0.5rem;\n  }\n  .top-app-header[_ngcontent-%COMP%]   .accessibility-badge[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=header.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderComponent, [{
    type: Component,
    args: [{ selector: "app-header", imports: [NgIcon, ThemeToggleComponent], providers: [
      provideIcons({
        lucideSearch,
        lucideUser,
        lucideLogOut,
        lucideExternalLink,
        lucideShield,
        lucideStethoscope,
        lucideUserPlus,
        lucideX,
        lucideSliders,
        lucideType
      })
    ], template: `<header class="top-app-header">\r
  <!-- Left: Header spacing / Navigation anchor -->\r
  <div class="header-left"></div>\r
\r
  <!-- Center -->\r
  <div class="header-center">\r
    @if (authService.isSuperAdmin()) {\r
      <span>Administraci\xF3n de especialidades</span>\r
    }\r
  </div>\r
\r
  <!-- Right: Actions & Profile -->\r
  <div class="header-right">\r
    <app-theme-toggle />\r
    <a [href]="bycodeUrl" class="bycode-link" aria-label="Ir a ByCode" title="Ir a ByCode">\r
      <img src="/bycode-logo.svg" alt="" aria-hidden="true" />\r
      <span>ByCode</span>\r
    </a>\r
    <!-- Visual Accessibility Font Switcher -->\r
    <div class="accessibility-ctrl">\r
      <button\r
        type="button"\r
        class="accessibility-btn"\r
        (click)="accessibilityService.toggleFontSize()"\r
        [title]="'Accesibilidad visual: Fuente ' + accessibilityService.fontSizeLabel() + ' (Clic para cambiar tama\xF1o)'"\r
        aria-label="Ajustar tama\xF1o de letra de la plataforma"\r
      >\r
        <ng-icon name="lucideType" class="accessibility-icon" />\r
        <span class="accessibility-text">A+</span>\r
        <span class="accessibility-badge">{{ accessibilityService.fontSizeLabel() }}</span>\r
      </button>\r
    </div>\r
\r
    <!-- User Profile Dropdown Button -->\r
    <div class="profile-menu-container">\r
      <button\r
        type="button"\r
        class="profile-avatar-btn"\r
        (click)="toggleProfileMenu($event)"\r
        [title]="authService.userName() || 'Perfil M\xE9dico'"\r
      >\r
        <span class="avatar-circle">{{ clinicianInitials() }}</span>\r
        <span class="online-indicator"></span>\r
      </button>\r
\r
      @if (isProfileMenuOpen()) {\r
        <div class="profile-dropdown-menu" (click)="$event.stopPropagation()">\r
          <div class="profile-dropdown-header">\r
            <span class="user-fullname">{{ authService.userName() || 'Profesional M\xE9dico' }}</span>\r
            <span class="user-email">{{ authService.userEmail() }}</span>\r
            @if (planBadgeLabel()) {\r
              <span class="user-plan-pill">{{ planBadgeLabel() }}</span>\r
            }\r
          </div>\r
\r
          <p class="timezone-label">Horario del dispositivo: {{ timeZone }}</p>
          <div class="profile-menu-divider"></div>\r
\r
          @if (!authService.isSuperAdmin()) {\r
          <a\r
            [href]="bycodePlansUrl"\r
            target="_blank"\r
            rel="noopener noreferrer"\r
            class="dropdown-action-item"\r
          >\r
            <ng-icon name="lucideExternalLink" class="menu-action-icon" />\r
            <span>Planes y Suscripci\xF3n ByCode</span>\r
          </a>\r
\r
          <button\r
            type="button"\r
            class="dropdown-action-item"\r
            (click)="handleProfileClick()"\r
          >\r
            <ng-icon name="lucideUser" class="menu-action-icon" />\r
            <span>Perfil Profesional</span>\r
          </button>\r
\r
          }\r
\r
          <button\r
            type="button"\r
            class="dropdown-action-item"\r
            (click)="openWizardConfig()"\r
          >\r
            <ng-icon name="lucideSliders" class="menu-action-icon" />\r
            <span>{{ authService.isSuperAdmin() ? 'Especialidades y wizards' : 'Personalizar Fichas y Consultas' }}</span>\r
          </button>\r
\r
          <div class="profile-menu-divider"></div>\r
\r
          <button\r
            type="button"\r
            class="dropdown-action-item logout-item"\r
            (click)="handleSignOut()"\r
          >\r
            <ng-icon name="lucideLogOut" class="menu-action-icon text-rose-500" />\r
            <span>Cerrar Sesi\xF3n</span>\r
          </button>\r
        </div>\r
      }\r
    </div>\r
  </div>\r
</header>\r
`, styles: ["/* src/app/layout/header/header.component.css */\n:host {\n  display: block;\n  width: 100%;\n  position: sticky;\n  top: 0;\n  z-index: 30;\n}\n.top-app-header {\n  height: 64px;\n  background-color: var(--dc-surface, #ffffff);\n  border-bottom: 1px solid var(--dc-outline, #e2e8f0);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 1.5rem;\n  gap: 1.5rem;\n}\n.header-left {\n  display: flex;\n  align-items: center;\n  min-width: 140px;\n}\n.header-center {\n  flex: 1;\n  max-width: 520px;\n  display: flex;\n  justify-content: center;\n  position: relative;\n}\n.omnibox-wrapper {\n  position: relative;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  background-color: var(--dc-surface-low, #f8fafc);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 10px;\n  padding: 0 0.75rem;\n  height: 40px;\n  transition: all 0.2s ease;\n}\n.omnibox-wrapper:hover,\n.omnibox-wrapper.is-focused {\n  background-color: var(--dc-surface, #ffffff);\n  border-color: #006874;\n  box-shadow: 0 0 0 3px rgba(0, 104, 116, 0.12);\n}\n.omnibox-icon {\n  color: var(--dc-ink-muted, #94a3b8);\n  font-size: 1.1rem;\n  margin-right: 0.5rem;\n  flex-shrink: 0;\n}\n.omnibox-input {\n  flex: 1;\n  border: none;\n  background: transparent;\n  font-size: 0.88rem;\n  color: var(--dc-ink, #0f172a);\n  outline: none;\n}\n.omnibox-input::placeholder {\n  color: var(--dc-ink-muted, #94a3b8);\n}\n.omnibox-right-actions {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  flex-shrink: 0;\n}\n.shortcut-badge {\n  font-family: inherit;\n  font-size: 0.7rem;\n  font-weight: 600;\n  color: var(--dc-ink-muted, #64748b);\n  background-color: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  border-radius: 5px;\n  padding: 2px 6px;\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n}\n.omnibox-clear-btn {\n  background: transparent;\n  border: none;\n  color: var(--dc-ink-muted, #94a3b8);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  padding: 2px;\n  border-radius: 4px;\n}\n.omnibox-clear-btn:hover {\n  color: var(--dc-ink, #0f172a);\n  background-color: var(--dc-surface-high, #f1f5f9);\n}\n.search-dropdown-card {\n  position: absolute;\n  top: calc(100% + 6px);\n  left: 0;\n  right: 0;\n  background: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 12px;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);\n  overflow: hidden;\n  z-index: 50;\n  max-height: 400px;\n  display: flex;\n  flex-direction: column;\n}\n.search-dropdown-loading {\n  padding: 1.25rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.75rem;\n  color: var(--dc-ink-muted, #64748b);\n  font-size: 0.88rem;\n}\n.spinner-ring {\n  width: 18px;\n  height: 18px;\n  border: 2px solid var(--dc-outline, #e2e8f0);\n  border-top-color: #006874;\n  border-radius: 50%;\n  animation: spin 0.7s linear infinite;\n}\n.search-dropdown-header {\n  padding: 0.5rem 0.85rem;\n  background: var(--dc-surface-low, #f8fafc);\n  border-bottom: 1px solid var(--dc-outline, #f1f5f9);\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--dc-ink-muted, #64748b);\n}\n.search-dropdown-list {\n  overflow-y: auto;\n  padding: 0.35rem 0;\n}\n.search-result-row {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.65rem 0.85rem;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n  border-bottom: 1px solid #f8fafc;\n}\n.search-result-row:hover {\n  background-color: var(--dc-teal-surface, #f0fdfa);\n}\n.result-avatar {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: var(--dc-teal-surface, #e6f6f8);\n  color: var(--dc-teal-ink, #006874);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 0.75rem;\n  flex-shrink: 0;\n}\n.result-info {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.result-name {\n  font-size: 0.88rem;\n  font-weight: 600;\n  color: var(--dc-ink, #0f172a);\n}\n.result-meta {\n  font-size: 0.75rem;\n  color: var(--dc-ink-muted, #64748b);\n}\n.result-action {\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: var(--dc-teal-ink, #006874);\n}\n.search-dropdown-empty {\n  padding: 1.5rem;\n  text-align: center;\n  color: var(--dc-ink-muted, #64748b);\n  font-size: 0.88rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.75rem;\n}\n.btn-register-quick {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  background-color: #006874;\n  color: #ffffff;\n  padding: 0.45rem 0.85rem;\n  border-radius: 8px;\n  font-size: 0.82rem;\n  font-weight: 600;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n}\n.btn-register-quick:hover {\n  background-color: #004f58;\n}\n.header-right {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n}\n.create-menu-container {\n  position: relative;\n}\n.primary-create-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  background-color: #006874;\n  color: #ffffff;\n  border: none;\n  border-radius: 9px;\n  padding: 0.48rem 0.95rem;\n  font-size: 0.88rem;\n  font-weight: 600;\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(0, 104, 116, 0.25);\n  transition: all 0.15s ease;\n}\n.primary-create-btn:hover {\n  background-color: #00505a;\n  box-shadow: 0 4px 10px rgba(0, 104, 116, 0.35);\n}\n.chevron-icon {\n  font-size: 0.85rem;\n  transition: transform 0.2s ease;\n}\n.chevron-icon.rotate {\n  transform: rotate(180deg);\n}\n.create-dropdown-menu {\n  position: absolute;\n  top: calc(100% + 8px);\n  right: 0;\n  width: 260px;\n  background: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 12px;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.05);\n  padding: 0.4rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  z-index: 50;\n  animation: fadeIn 0.15s ease;\n}\n.dropdown-menu-item {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.6rem 0.75rem;\n  background: transparent;\n  border: none;\n  border-radius: 8px;\n  text-align: left;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n  width: 100%;\n}\n.dropdown-menu-item:hover {\n  background-color: var(--dc-surface-low, #f8fafc);\n}\n.item-primary-highlight {\n  background-color: var(--dc-teal-surface, #f0fdfa);\n}\n.item-primary-highlight:hover {\n  background-color: var(--dc-teal-surface, #ccfbf1);\n}\n.item-icon {\n  font-size: 1.25rem;\n  flex-shrink: 0;\n}\n.item-text {\n  display: flex;\n  flex-direction: column;\n}\n.item-title {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--dc-ink, #0f172a);\n}\n.item-desc {\n  font-size: 0.72rem;\n  color: var(--dc-ink-muted, #64748b);\n}\n.profile-menu-container {\n  position: relative;\n}\n.profile-avatar-btn {\n  position: relative;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n  display: flex;\n  align-items: center;\n}\n.avatar-circle {\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      #006874 0%,\n      #004d56 100%);\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.85rem;\n  font-weight: 700;\n  border: 2px solid #ffffff;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);\n}\n.online-indicator {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  width: 10px;\n  height: 10px;\n  background-color: #16a34a;\n  border: 2px solid #ffffff;\n  border-radius: 50%;\n}\n.profile-dropdown-menu {\n  position: absolute;\n  top: calc(100% + 8px);\n  right: 0;\n  width: 250px;\n  background: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 12px;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.05);\n  padding: 0.5rem;\n  display: flex;\n  flex-direction: column;\n  z-index: 50;\n  animation: fadeIn 0.15s ease;\n}\n.profile-dropdown-header {\n  padding: 0.5rem 0.65rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n.user-fullname {\n  font-size: 0.88rem;\n  font-weight: 700;\n  color: var(--dc-ink, #0f172a);\n}\n.user-email {\n  font-size: 0.75rem;\n  color: var(--dc-ink-muted, #64748b);\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.user-plan-pill {\n  display: inline-block;\n  margin-top: 0.35rem;\n  padding: 2px 7px;\n  background-color: var(--dc-surface-high, #f1f5f9);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 6px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  color: var(--dc-teal-ink, #006874);\n  width: fit-content;\n}\n.profile-menu-divider {\n  height: 1px;\n  background-color: var(--dc-surface-high, #f1f5f9);\n  margin: 0.4rem 0;\n}\n.dropdown-action-item {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  padding: 0.55rem 0.65rem;\n  border-radius: 8px;\n  background: transparent;\n  border: none;\n  font-size: 0.85rem;\n  font-weight: 500;\n  color: var(--dc-ink-secondary, #334155);\n  text-decoration: none;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n  width: 100%;\n  text-align: left;\n}\n.dropdown-action-item:hover {\n  background-color: var(--dc-surface-low, #f8fafc);\n  color: var(--dc-ink, #0f172a);\n}\n.logout-item:hover {\n  background-color: var(--dc-error-surface, #fff1f2);\n  color: var(--dc-error-ink, #e11d48);\n}\n.menu-action-icon {\n  font-size: 1.05rem;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.accessibility-ctrl {\n  display: flex;\n  align-items: center;\n}\n.accessibility-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  background: var(--dc-surface-low, #f8fafc);\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  border-radius: 8px;\n  padding: 0.35rem 0.65rem;\n  cursor: pointer;\n  color: var(--dc-ink-secondary, #334155);\n  font-size: 0.8rem;\n  font-weight: 600;\n  transition: all 0.15s ease;\n}\n.accessibility-btn:hover {\n  background: var(--dc-surface-high, #f1f5f9);\n  border-color: #94a3b8;\n  color: var(--dc-ink, #0f172a);\n}\n.accessibility-icon {\n  font-size: 0.95rem;\n  color: var(--dc-teal-ink, #006874);\n}\n.accessibility-text {\n  font-weight: 700;\n  color: var(--dc-teal-ink, #006874);\n}\n.accessibility-badge {\n  font-size: 0.72rem;\n  color: var(--dc-ink-muted, #64748b);\n  background: var(--dc-surface-high, #e2e8f0);\n  padding: 1px 5px;\n  border-radius: 4px;\n}\n@media (max-width: 768px) {\n  .top-app-header {\n    padding: 0 0.75rem;\n    gap: 0.75rem;\n  }\n  .header-left {\n    display: none;\n  }\n  .header-center {\n    min-width: 0;\n  }\n  .header-center > span {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .header-right {\n    flex-shrink: 0;\n    gap: 0.75rem;\n  }\n}\n.bycode-link {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 7px;\n  height: 36px;\n  padding: 0 12px;\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 999px;\n  background: var(--dc-surface, #fff);\n  color: var(--md-sys-color-primary, #006874);\n  font-size: 12px;\n  font-weight: 600;\n  text-decoration: none;\n  white-space: nowrap;\n}\n.bycode-link img {\n  width: 22px;\n  height: 22px;\n  object-fit: contain;\n}\n.bycode-link:hover {\n  background: var(--dc-surface-low, #f0f7f8);\n}\n.bycode-link:focus-visible {\n  outline: 2px solid var(--md-sys-color-primary, #006874);\n  outline-offset: 3px;\n}\n@media (max-width: 639px) {\n  .bycode-link {\n    width: 36px;\n    padding: 0;\n  }\n  .bycode-link span {\n    display: none;\n  }\n  .top-app-header .header-right {\n    gap: 0.5rem;\n  }\n  .top-app-header .accessibility-badge {\n    display: none;\n  }\n}\n/*# sourceMappingURL=header.component.css.map */\n"] }]
  }], null, { searchInputRef: [{ type: ViewChild, args: ["searchInput", { isSignal: true }] }], handleGlobalShortcut: [{
    type: HostListener,
    args: ["window:keydown", ["$event"]]
  }], onDocumentClick: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HeaderComponent, { className: "HeaderComponent", filePath: "src/app/layout/header/header.component.ts", lineNumber: 58 });
})();

// src/app/layout/sidebar/sidebar.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function SidebarComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "span", 10);
    \u0275\u0275text(2, "DoctorChart");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 11);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.authService.isSuperAdmin() ? "Administraci\xF3n" : ctx_r0.specialtyService.currentSpecialtyOption().shortLabel);
  }
}
function SidebarComponent_Conditional_6_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1, "Especialidades y wizards");
    \u0275\u0275elementEnd();
  }
}
function SidebarComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275text(1, "Administraci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "a", 13);
    \u0275\u0275element(3, "ng-icon", 14);
    \u0275\u0275conditionalCreate(4, SidebarComponent_Conditional_6_Conditional_4_Template, 2, 0, "span", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("sr-only", ctx_r0.isCollapsed());
    \u0275\u0275advance(4);
    \u0275\u0275conditional(!ctx_r0.isCollapsed() ? 4 : -1);
  }
}
function SidebarComponent_Conditional_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Cl\xEDnica");
    \u0275\u0275elementEnd();
  }
}
function SidebarComponent_Conditional_7_For_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r2.label);
  }
}
function SidebarComponent_Conditional_7_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 16);
    \u0275\u0275element(1, "ng-icon", 17);
    \u0275\u0275conditionalCreate(2, SidebarComponent_Conditional_7_For_3_Conditional_2_Template, 2, 1, "span", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", item_r2.path)("title", item_r2.title);
    \u0275\u0275advance();
    \u0275\u0275property("name", item_r2.icon);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.isCollapsed() ? 2 : -1);
  }
}
function SidebarComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275conditionalCreate(1, SidebarComponent_Conditional_7_Conditional_1_Template, 2, 0, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(2, SidebarComponent_Conditional_7_For_3_Template, 3, 4, "a", 16, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("sr-only", ctx_r0.isCollapsed());
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.isCollapsed() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.workspace.navigation());
  }
}
function SidebarComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 8);
  }
}
function SidebarComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 9);
  }
}
var SidebarComponent = class _SidebarComponent {
  specialtyService = inject(DoctorSpecialtyService);
  authService = inject(AuthService);
  workspace = inject(WorkspaceStore);
  isCollapsed = signal(
    false,
    ...ngDevMode ? [{ debugName: "isCollapsed" }] : (
      /* istanbul ignore next */
      []
    )
  );
  narrowViewport = false;
  desktopCollapsed = false;
  constructor() {
    afterNextRender(() => this.syncViewport());
  }
  syncViewport() {
    const narrow = window.innerWidth <= 768;
    if (narrow === this.narrowViewport)
      return;
    if (narrow) {
      this.desktopCollapsed = this.isCollapsed();
      this.isCollapsed.set(true);
    } else
      this.isCollapsed.set(this.desktopCollapsed);
    this.narrowViewport = narrow;
  }
  collapseAfterNavigation() {
    if (this.narrowViewport)
      this.isCollapsed.set(true);
  }
  toggleCollapse() {
    this.isCollapsed.update((val) => !val);
  }
  static \u0275fac = function SidebarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SidebarComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SidebarComponent, selectors: [["app-sidebar"]], hostBindings: function SidebarComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("resize", function SidebarComponent_resize_HostBindingHandler() {
        return ctx.syncViewport();
      }, \u0275\u0275resolveWindow);
    }
  }, features: [\u0275\u0275ProvidersFeature([
    provideIcons({
      lucideCalendarDays,
      lucideLayoutDashboard,
      lucideUsers,
      lucideChevronLeft,
      lucideChevronRight,
      lucideSliders,
      lucideCalculator
    })
  ])], decls: 12, vars: 7, consts: [[1, "sidebar-container"], [1, "sidebar-brand"], ["title", "DoctorChart", 1, "brand-logo-icon"], ["src", "/doctorchart-logo.svg", "width", "38", "height", "38", "alt", "DoctorChart", 1, "doctorchart-logo"], [1, "brand-text-wrap"], ["aria-label", "Navegaci\xF3n principal", 1, "sidebar-nav", 3, "click"], [1, "sidebar-footer"], ["type", "button", 1, "collapse-toggle-btn", 3, "click", "title"], ["name", "lucideChevronRight"], ["name", "lucideChevronLeft"], [1, "brand-title"], [1, "brand-specialty-pill"], [1, "nav-group-label"], ["routerLink", "/admin/especialidades", "routerLinkActive", "active", "title", "Especialidades y wizards", 1, "nav-item"], ["name", "lucideSliders", 1, "nav-icon"], [1, "nav-label"], ["routerLinkActive", "active", 1, "nav-item", 3, "routerLink", "title"], [1, "nav-icon", 3, "name"]], template: function SidebarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "aside", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275element(3, "img", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(4, SidebarComponent_Conditional_4_Template, 5, 1, "div", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "nav", 5);
      \u0275\u0275listener("click", function SidebarComponent_Template_nav_click_5_listener() {
        return ctx.collapseAfterNavigation();
      });
      \u0275\u0275conditionalCreate(6, SidebarComponent_Conditional_6_Template, 5, 3)(7, SidebarComponent_Conditional_7_Template, 4, 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 6)(9, "button", 7);
      \u0275\u0275listener("click", function SidebarComponent_Template_button_click_9_listener() {
        return ctx.toggleCollapse();
      });
      \u0275\u0275conditionalCreate(10, SidebarComponent_Conditional_10_Template, 1, 0, "ng-icon", 8)(11, SidebarComponent_Conditional_11_Template, 1, 0, "ng-icon", 9);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("is-collapsed", ctx.isCollapsed());
      \u0275\u0275advance(4);
      \u0275\u0275conditional(!ctx.isCollapsed() ? 4 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.authService.isSuperAdmin() ? 6 : 7);
      \u0275\u0275advance(3);
      \u0275\u0275property("title", ctx.isCollapsed() ? "Expandir men\xFA" : "Colapsar men\xFA");
      \u0275\u0275attribute("aria-label", ctx.isCollapsed() ? "Expandir men\xFA lateral" : "Colapsar men\xFA lateral");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isCollapsed() ? 10 : 11);
    }
  }, dependencies: [RouterLink, RouterLinkActive, NgIcon], styles: ['\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-self: stretch;\n  flex-shrink: 0;\n  min-height: 100vh;\n  background-color: var(--%NS%dc-surface, #ffffff);\n  border-right: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  z-index: 40;\n}\n.sidebar-container[_ngcontent-%COMP%] {\n  width: 248px;\n  min-height: 100vh;\n  height: 100%;\n  position: sticky;\n  top: 0;\n  background-color: var(--%NS%dc-surface, #ffffff);\n  display: flex;\n  flex-direction: column;\n  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n  overflow: hidden;\n}\n.sidebar-container.is-collapsed[_ngcontent-%COMP%] {\n  width: 68px;\n}\n.sidebar-brand[_ngcontent-%COMP%] {\n  height: 64px;\n  padding: 0 1rem;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  border-bottom: 1px solid var(--%NS%dc-outline, #f1f5f9);\n}\n.brand-logo-icon[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  min-width: 38px;\n  border-radius: 10px;\n  background: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.brand-text-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.brand-title[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #0f172a);\n  letter-spacing: -0.02em;\n}\n.brand-specialty-pill[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: var(--%NS%dc-teal-ink, #006874);\n  background-color: var(--%NS%dc-teal-surface, #e6f6f8);\n  padding: 1px 6px;\n  border-radius: 9999px;\n  width: fit-content;\n}\n.sidebar-nav[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  padding: 0.85rem 0.65rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n  overflow-y: auto;\n}\n.nav-group-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: var(--%NS%dc-ink-muted, #94a3b8);\n  padding: 0.5rem 0.5rem 0.25rem 0.5rem;\n}\n.nav-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.6rem 0.75rem;\n  border-radius: 8px;\n  color: var(--%NS%dc-ink-secondary, #475569);\n  text-decoration: none;\n  font-size: 0.88rem;\n  font-weight: 500;\n  transition: all 0.15s ease-in-out;\n  position: relative;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.nav-item[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.nav-item.active[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-teal-surface, #f0fdfa);\n  color: var(--%NS%dc-teal-ink, #006874);\n  font-weight: 600;\n}\n.nav-item.active[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  left: 0;\n  top: 15%;\n  bottom: 15%;\n  width: 3px;\n  background-color: #006874;\n  border-radius: 0 3px 3px 0;\n}\n.nav-icon[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.nav-label[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.nav-badge[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  font-weight: 600;\n  background-color: var(--%NS%dc-blue-surface, #e0f2fe);\n  color: var(--%NS%dc-blue-ink, #0369a1);\n  padding: 2px 6px;\n  border-radius: 6px;\n}\n.nav-divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background-color: var(--%NS%dc-surface-high, #f1f5f9);\n  margin: 0.5rem 0.25rem;\n}\n.specialty-item[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n}\n.static-nav-item[_ngcontent-%COMP%] {\n  cursor: default;\n  opacity: 0.85;\n}\n.sidebar-footer[_ngcontent-%COMP%] {\n  margin-top: auto;\n  padding: 0.65rem;\n  border-top: 1px solid var(--%NS%dc-outline, #f1f5f9);\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  background-color: var(--%NS%dc-surface, #ffffff);\n}\n.sidebar-container.is-collapsed[_ngcontent-%COMP%]   .sidebar-footer[_ngcontent-%COMP%] {\n  justify-content: center;\n}\n.collapse-toggle-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 6px;\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  background: var(--%NS%dc-surface, #ffffff);\n  color: var(--%NS%dc-ink-muted, #64748b);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  flex-shrink: 0;\n}\n.collapse-toggle-btn[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  color: var(--%NS%dc-ink, #0f172a);\n}\n/*# sourceMappingURL=sidebar.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarComponent, [{
    type: Component,
    args: [{ selector: "app-sidebar", imports: [RouterLink, RouterLinkActive, NgIcon], providers: [
      provideIcons({
        lucideCalendarDays,
        lucideLayoutDashboard,
        lucideUsers,
        lucideChevronLeft,
        lucideChevronRight,
        lucideSliders,
        lucideCalculator
      })
    ], template: `<aside class="sidebar-container" [class.is-collapsed]="isCollapsed()">
  <!-- Sidebar Header: Brand Logo & Title -->
  <div class="sidebar-brand">
    <div class="brand-logo-icon" title="DoctorChart">
      <img class="doctorchart-logo" src="/doctorchart-logo.svg" width="38" height="38" alt="DoctorChart" />
    </div>
    @if (!isCollapsed()) {
      <div class="brand-text-wrap">
        <span class="brand-title">DoctorChart</span>
        <span class="brand-specialty-pill">{{ authService.isSuperAdmin() ? 'Administraci\xF3n' : specialtyService.currentSpecialtyOption().shortLabel }}</span>
      </div>
    }
  </div>

  <!-- Main Navigation Links -->
  <nav class="sidebar-nav" aria-label="Navegaci\xF3n principal" (click)="collapseAfterNavigation()">
    @if (authService.isSuperAdmin()) {
      <div class="nav-group-label" [class.sr-only]="isCollapsed()">Administraci\xF3n</div>
      <a routerLink="/admin/especialidades" routerLinkActive="active" class="nav-item" title="Especialidades y wizards">
        <ng-icon name="lucideSliders" class="nav-icon" />
        @if (!isCollapsed()) { <span class="nav-label">Especialidades y wizards</span> }
      </a>
    } @else {
    <div class="nav-group-label" [class.sr-only]="isCollapsed()">
      @if (!isCollapsed()) {
        <span>Cl\xEDnica</span>
      }
    </div>

    @for (item of workspace.navigation(); track item.id) {
      <a [routerLink]="item.path" routerLinkActive="active" class="nav-item" [title]="item.title">
        <ng-icon [name]="item.icon" class="nav-icon" />
        @if (!isCollapsed()) { <span class="nav-label">{{ item.label }}</span> }
      </a>
    }
    }
  </nav>

  <!-- Sidebar Footer: Collapse Toggle -->
  <div class="sidebar-footer">
    <button
      type="button"
      class="collapse-toggle-btn"
      (click)="toggleCollapse()"
      [attr.aria-label]="isCollapsed() ? 'Expandir men\xFA lateral' : 'Colapsar men\xFA lateral'"
      [title]="isCollapsed() ? 'Expandir men\xFA' : 'Colapsar men\xFA'"
    >
      @if (isCollapsed()) {
        <ng-icon name="lucideChevronRight" />
      } @else {
        <ng-icon name="lucideChevronLeft" />
      }
    </button>
  </div>
</aside>
`, styles: ['/* src/app/layout/sidebar/sidebar.component.css */\n:host {\n  display: flex;\n  flex-direction: column;\n  align-self: stretch;\n  flex-shrink: 0;\n  min-height: 100vh;\n  background-color: var(--dc-surface, #ffffff);\n  border-right: 1px solid var(--dc-outline, #e2e8f0);\n  z-index: 40;\n}\n.sidebar-container {\n  width: 248px;\n  min-height: 100vh;\n  height: 100%;\n  position: sticky;\n  top: 0;\n  background-color: var(--dc-surface, #ffffff);\n  display: flex;\n  flex-direction: column;\n  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n  overflow: hidden;\n}\n.sidebar-container.is-collapsed {\n  width: 68px;\n}\n.sidebar-brand {\n  height: 64px;\n  padding: 0 1rem;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  border-bottom: 1px solid var(--dc-outline, #f1f5f9);\n}\n.brand-logo-icon {\n  width: 38px;\n  height: 38px;\n  min-width: 38px;\n  border-radius: 10px;\n  background: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.brand-text-wrap {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  white-space: nowrap;\n}\n.brand-title {\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: var(--dc-ink, #0f172a);\n  letter-spacing: -0.02em;\n}\n.brand-specialty-pill {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: var(--dc-teal-ink, #006874);\n  background-color: var(--dc-teal-surface, #e6f6f8);\n  padding: 1px 6px;\n  border-radius: 9999px;\n  width: fit-content;\n}\n.sidebar-nav {\n  flex: 1;\n  min-height: 0;\n  padding: 0.85rem 0.65rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n  overflow-y: auto;\n}\n.nav-group-label {\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: var(--dc-ink-muted, #94a3b8);\n  padding: 0.5rem 0.5rem 0.25rem 0.5rem;\n}\n.nav-item {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.6rem 0.75rem;\n  border-radius: 8px;\n  color: var(--dc-ink-secondary, #475569);\n  text-decoration: none;\n  font-size: 0.88rem;\n  font-weight: 500;\n  transition: all 0.15s ease-in-out;\n  position: relative;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.nav-item:hover {\n  background-color: var(--dc-surface-low, #f8fafc);\n  color: var(--dc-ink, #0f172a);\n}\n.nav-item.active {\n  background-color: var(--dc-teal-surface, #f0fdfa);\n  color: var(--dc-teal-ink, #006874);\n  font-weight: 600;\n}\n.nav-item.active::before {\n  content: "";\n  position: absolute;\n  left: 0;\n  top: 15%;\n  bottom: 15%;\n  width: 3px;\n  background-color: #006874;\n  border-radius: 0 3px 3px 0;\n}\n.nav-icon {\n  font-size: 1.15rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.nav-label {\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.nav-badge {\n  font-size: 0.68rem;\n  font-weight: 600;\n  background-color: var(--dc-blue-surface, #e0f2fe);\n  color: var(--dc-blue-ink, #0369a1);\n  padding: 2px 6px;\n  border-radius: 6px;\n}\n.nav-divider {\n  height: 1px;\n  background-color: var(--dc-surface-high, #f1f5f9);\n  margin: 0.5rem 0.25rem;\n}\n.specialty-item {\n  font-size: 0.85rem;\n}\n.static-nav-item {\n  cursor: default;\n  opacity: 0.85;\n}\n.sidebar-footer {\n  margin-top: auto;\n  padding: 0.65rem;\n  border-top: 1px solid var(--dc-outline, #f1f5f9);\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  background-color: var(--dc-surface, #ffffff);\n}\n.sidebar-container.is-collapsed .sidebar-footer {\n  justify-content: center;\n}\n.collapse-toggle-btn {\n  width: 32px;\n  height: 32px;\n  border-radius: 6px;\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  background: var(--dc-surface, #ffffff);\n  color: var(--dc-ink-muted, #64748b);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  flex-shrink: 0;\n}\n.collapse-toggle-btn:hover {\n  background: var(--dc-surface-low, #f8fafc);\n  color: var(--dc-ink, #0f172a);\n}\n/*# sourceMappingURL=sidebar.component.css.map */\n'] }]
  }], () => [], { syncViewport: [{
    type: HostListener,
    args: ["window:resize"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SidebarComponent, { className: "SidebarComponent", filePath: "src/app/layout/sidebar/sidebar.component.ts", lineNumber: 34 });
})();

// src/app/features/encounter-detail-dialog/encounter-detail-dialog.component.ts
var _forTrack02 = ($index, $item) => $item.value;
function EncounterDetailDialogComponent_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.errorMessage());
  }
}
function EncounterDetailDialogComponent_Conditional_0_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "Cargando consulta...");
    \u0275\u0275elementEnd();
  }
}
function EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_6_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 14);
    \u0275\u0275listener("click", function EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_6_Conditional_5_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.useRemoteRecord());
    });
    \u0275\u0275text(3, "Usar copia del servidor y descartar mi edici\xF3n local");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Copia guardada: ", ctx_r1.formatDate(ctx.encounterDate));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.isLoading());
  }
}
function EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 10)(1, "p");
    \u0275\u0275text(2, "La consulta fue modificada. Tus respuestas locales siguen visibles.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 14);
    \u0275\u0275listener("click", function EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_6_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.reviewRemote());
    });
    \u0275\u0275text(4, "Consultar copia del servidor");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_6_Conditional_5_Template, 4, 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.isLoading());
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_5_0 = ctx_r1.remoteRecord()) ? 5 : -1, tmp_5_0);
  }
}
function EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_7_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r7 = ctx.$implicit;
    \u0275\u0275property("value", type_r7.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(type_r7.label);
  }
}
function EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "fieldset", 11)(1, "legend");
    \u0275\u0275text(2, "Datos de la consulta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "label");
    \u0275\u0275text(6, "Tipo ");
    \u0275\u0275elementStart(7, "select", 15);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_7_Template_select_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.consultationType.set($event));
    });
    \u0275\u0275repeaterCreate(8, EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_7_For_9_Template, 2, 2, "option", 16, _forTrack02);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const record_r8 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.readonly());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("Fecha de creaci\xF3n: ", ctx_r1.formatDate(record_r8.encounterDate), " (", ctx_r1.timeZone, "). Asignada por el servidor; no editable.");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r1.consultationType());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.consultationTypes);
  }
}
function EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.cancelEditing());
    });
    \u0275\u0275text(1, "Cancelar edici\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 17);
    \u0275\u0275listener("click", function EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_10_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r1.isSubmitting());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.readonly() || !ctx_r1.formValid());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.isSubmitting() ? "Guardando..." : "Guardar cambios");
  }
}
function EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_11_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_11_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.printEncounter());
    });
    \u0275\u0275text(1, "Imprimir");
    \u0275\u0275elementEnd();
  }
}
function EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_11_Conditional_0_Template, 2, 0, "button", 18);
    \u0275\u0275elementStart(1, "button", 19);
    \u0275\u0275listener("click", function EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_11_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.startEditing());
    });
    \u0275\u0275text(2, "Editar consulta");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(ctx_r1.recordActions.has("PRINT_DOCUMENT") ? 0 : -1);
  }
}
function EncounterDetailDialogComponent_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "section", 9)(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(6, EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_6_Template, 6, 2, "section", 10);
    \u0275\u0275conditionalCreate(7, EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_7_Template, 10, 4, "fieldset", 11);
    \u0275\u0275elementStart(8, "app-dynamic-form-renderer", 12);
    \u0275\u0275listener("valuesChange", function EncounterDetailDialogComponent_Conditional_0_Conditional_9_Template_app_dynamic_form_renderer_valuesChange_8_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onValuesChange($event));
    })("validityChange", function EncounterDetailDialogComponent_Conditional_0_Conditional_9_Template_app_dynamic_form_renderer_validityChange_8_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.formValid.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "footer", 13);
    \u0275\u0275conditionalCreate(10, EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_10_Template, 4, 3)(11, EncounterDetailDialogComponent_Conditional_0_Conditional_9_Conditional_11_Template, 3, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const record_r8 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(record_r8.patientFullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", record_r8.specialty.name, " \xB7 ", ctx_r1.formatDate(record_r8.encounterDate), " \xB7 ", ctx_r1.getConsultationTypeLabel(record_r8.consultationType));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.hasConflict() ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isEditing() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("definition", record_r8.formDefinitionSnapshot)("values", ctx_r1.values())("formulaResults", ctx_r1.formulaResults())("readonly", ctx_r1.readonly());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.isEditing() ? 10 : 11);
  }
}
function EncounterDetailDialogComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275listener("mousedown", function EncounterDetailDialogComponent_Conditional_0_Template_div_mousedown_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBackdropMouseDown($event));
    })("click", function EncounterDetailDialogComponent_Conditional_0_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBackdropClick($event));
    });
    \u0275\u0275elementStart(1, "section", 2);
    \u0275\u0275listener("click", function EncounterDetailDialogComponent_Conditional_0_Template_section_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "header", 3)(3, "h2", 4);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 5);
    \u0275\u0275listener("click", function EncounterDetailDialogComponent_Conditional_0_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(6, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, EncounterDetailDialogComponent_Conditional_0_Conditional_7_Template, 2, 1, "p", 6);
    \u0275\u0275conditionalCreate(8, EncounterDetailDialogComponent_Conditional_0_Conditional_8_Template, 2, 0, "p", 7);
    \u0275\u0275conditionalCreate(9, EncounterDetailDialogComponent_Conditional_0_Conditional_9_Template, 12, 11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.isEditing() ? "Editar consulta" : "Detalle de la consulta");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.isSubmitting());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.errorMessage() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isLoading() ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_5_0 = ctx_r1.encounter()) ? 9 : -1, tmp_5_0);
  }
}
var EncounterDetailDialogComponent = class _EncounterDetailDialogComponent {
  recordActions = inject(PatientRecordActionsService);
  service = inject(ClinicalEncounterService);
  auth = inject(AuthService);
  activePatient = inject(ActivePatientService);
  patientContext = null;
  currentPatientId() {
    return this.activePatient.activePatient()?.id ?? null;
  }
  platformId = inject(PLATFORM_ID);
  epoch = 0;
  destroyed = false;
  owner = this.identity();
  openedAt = 0;
  backdropMouseDown = false;
  isOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isOpen" }] : (
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
  isSubmitting = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSubmitting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isEditing = signal(
    false,
    ...ngDevMode ? [{ debugName: "isEditing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  encounter = signal(
    null,
    ...ngDevMode ? [{ debugName: "encounter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  values = signal(
    {},
    ...ngDevMode ? [{ debugName: "values" }] : (
      /* istanbul ignore next */
      []
    )
  );
  formulaResults = signal(
    {},
    ...ngDevMode ? [{ debugName: "formulaResults" }] : (
      /* istanbul ignore next */
      []
    )
  );
  consultationType = signal(
    "FIRST_VISIT",
    ...ngDevMode ? [{ debugName: "consultationType" }] : (
      /* istanbul ignore next */
      []
    )
  );
  formValid = signal(
    false,
    ...ngDevMode ? [{ debugName: "formValid" }] : (
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
  remoteRecord = signal(
    null,
    ...ngDevMode ? [{ debugName: "remoteRecord" }] : (
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
  readonly = computed(
    () => !this.isOpen() || !this.isEditing() || this.isLoading() || this.isSubmitting() || this.hasConflict() || this.identity() !== this.owner || this.patientContext !== this.currentPatientId(),
    ...ngDevMode ? [{ debugName: "readonly" }] : (
      /* istanbul ignore next */
      []
    )
  );
  clock = inject(UserClockService);
  get timeZone() {
    return this.clock.timeZone();
  }
  consultationTypes = [
    { value: "FIRST_VISIT", label: "Primera consulta" },
    { value: "FOLLOW_UP", label: "Control / seguimiento" },
    { value: "ROUTINE_CHECKUP", label: "Chequeo de rutina" },
    { value: "EMERGENCY", label: "Urgencia" },
    { value: "INTERCONSULTATION", label: "Interconsulta" }
  ];
  constructor() {
    effect(() => {
      const owner = this.identity();
      const patientId = this.currentPatientId();
      untracked(() => {
        if (owner !== this.owner || this.isOpen() && patientId !== this.patientContext) {
          this.owner = owner;
          this.epoch++;
          this.isSubmitting.set(false);
          this.closeModal();
        }
      });
    });
  }
  ngOnDestroy() {
    this.destroyed = true;
    this.epoch++;
  }
  openModal(event) {
    if (this.isSubmitting() || this.identity() !== this.owner)
      return;
    this.patientContext = this.currentPatientId();
    this.epoch++;
    this.openedAt = Date.now();
    this.isOpen.set(true);
    this.errorMessage.set(null);
    this.encounter.set(null);
    this.isEditing.set(false);
    this.hasConflict.set(false);
    this.remoteRecord.set(null);
    const detail = event?.detail;
    if (detail?.encounter?.formDefinitionSnapshot)
      this.displayEncounter(detail.encounter);
    else if (detail?.encounterId || detail?.encounter?.id)
      void this.loadEncounter(detail.encounterId ?? detail.encounter.id);
  }
  onEscape() {
    if (this.isOpen())
      this.closeModal();
  }
  closeModal() {
    if (this.isSubmitting())
      return;
    this.epoch++;
    this.isOpen.set(false);
    this.encounter.set(null);
    this.values.set({});
    this.formulaResults.set({});
    this.errorMessage.set(null);
    this.isLoading.set(false);
    this.isEditing.set(false);
    this.hasConflict.set(false);
    this.remoteRecord.set(null);
  }
  onBackdropMouseDown(event) {
    this.backdropMouseDown = event.target === event.currentTarget;
  }
  onBackdropClick(event) {
    if (Date.now() - this.openedAt >= 300 && this.backdropMouseDown && event.target === event.currentTarget)
      this.closeModal();
    this.backdropMouseDown = false;
  }
  async loadEncounter(id) {
    if (this.isSubmitting() || this.identity() !== this.owner)
      return;
    const epoch = ++this.epoch;
    this.isLoading.set(true);
    try {
      const record = await firstValueFrom(this.service.getById(id));
      if (this.alive(epoch) && record.id === id)
        this.acceptRecord(record);
    } catch (error) {
      if (this.alive(epoch))
        this.errorMessage.set(errorMessage(error, "No pudimos cargar el detalle de la consulta."));
    } finally {
      if (this.alive(epoch))
        this.isLoading.set(false);
    }
  }
  displayEncounter(record) {
    this.epoch++;
    this.isLoading.set(false);
    this.isSubmitting.set(false);
    this.acceptRecord(record);
  }
  acceptRecord(record) {
    this.encounter.set(structuredClone(record));
    this.values.set(structuredClone(record.formValues));
    this.formulaResults.set(structuredClone(record.formulaResults));
    this.consultationType.set(record.consultationType);
    this.formValid.set(false);
    this.errorMessage.set(null);
    this.hasConflict.set(false);
    this.remoteRecord.set(null);
  }
  startEditing() {
    if (this.encounter() && !this.isLoading() && !this.isSubmitting() && this.identity() === this.owner)
      this.isEditing.set(true);
  }
  cancelEditing() {
    const record = this.encounter();
    if (!record || this.isSubmitting() || this.isLoading())
      return;
    this.acceptRecord(record);
    this.isEditing.set(false);
  }
  onValuesChange(values) {
    if (!this.readonly()) {
      this.values.set(structuredClone(values));
      this.formulaResults.set({});
    }
  }
  currentInstant() {
    return this.encounter()?.encounterDate ?? null;
  }
  async save() {
    const record = this.encounter();
    const encounterDate = this.currentInstant();
    if (!record || !encounterDate || !this.formValid() || this.readonly())
      return;
    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    const epoch = this.epoch;
    try {
      const saved = await firstValueFrom(this.service.update(record.id, { expectedVersion: record.version, encounterDate, consultationType: this.consultationType(), values: inputValues(record.formDefinitionSnapshot, this.values()) }));
      if (!this.alive(epoch))
        return;
      if (saved.id !== record.id || saved.patientId !== record.patientId)
        throw new Error("La respuesta no corresponde a esta consulta.");
      this.acceptRecord(saved);
      this.isEditing.set(false);
      if (typeof window !== "undefined")
        window.dispatchEvent(new CustomEvent("encounter-updated", { detail: saved }));
    } catch (error) {
      if (this.alive(epoch)) {
        this.hasConflict.set(!!conflictKind(error));
        this.errorMessage.set(errorMessage(error, "No pudimos guardar los cambios. Tu edici\xF3n se conserva."));
      }
    } finally {
      if (this.alive(epoch))
        this.isSubmitting.set(false);
    }
  }
  async reviewRemote() {
    const record = this.encounter();
    if (!record || !this.hasConflict() || this.isLoading() || this.isSubmitting() || this.identity() !== this.owner)
      return;
    this.isLoading.set(true);
    this.remoteRecord.set(null);
    const epoch = this.epoch;
    try {
      const remote = await firstValueFrom(this.service.getById(record.id));
      if (this.alive(epoch) && remote.id === record.id && remote.patientId === record.patientId)
        this.remoteRecord.set(structuredClone(remote));
    } catch (error) {
      if (this.alive(epoch))
        this.errorMessage.set(errorMessage(error, "No pudimos consultar la copia guardada."));
    } finally {
      if (this.alive(epoch))
        this.isLoading.set(false);
    }
  }
  useRemoteRecord() {
    const remote = this.remoteRecord();
    if (!remote || this.isLoading() || this.isSubmitting() || this.identity() !== this.owner)
      return;
    this.acceptRecord(remote);
    this.isEditing.set(true);
  }
  formatDate(instant) {
    const { day, time } = userDateTime(instant);
    const [year, month, date] = day.split("-");
    return `${date}/${month}/${year} ${time}`;
  }
  getConsultationTypeLabel(type) {
    return this.consultationTypes.find((option) => option.value === type)?.label ?? type;
  }
  printEncounter() {
    if (this.recordActions.has("PRINT_DOCUMENT") && this.alive(this.epoch) && isPlatformBrowser(this.platformId) && typeof window !== "undefined")
      window.print();
  }
  identity() {
    return this.auth.currentUser()?.id ?? "";
  }
  alive(epoch) {
    return !this.destroyed && this.isOpen() && epoch === this.epoch && this.identity() === this.owner && this.patientContext === this.currentPatientId();
  }
  static \u0275fac = function EncounterDetailDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EncounterDetailDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EncounterDetailDialogComponent, selectors: [["app-encounter-detail-dialog"]], hostBindings: function EncounterDetailDialogComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("open-encounter-detail-modal", function EncounterDetailDialogComponent_open_encounter_detail_modal_HostBindingHandler($event) {
        return ctx.openModal($event);
      }, \u0275\u0275resolveWindow)("keydown.escape", function EncounterDetailDialogComponent_keydown_escape_HostBindingHandler() {
        return ctx.onEscape();
      }, \u0275\u0275resolveWindow);
    }
  }, decls: 1, vars: 1, consts: [[1, "m3-modal-backdrop"], [1, "m3-modal-backdrop", 3, "mousedown", "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "encounter-detail-title", 1, "m3-modal-dialog", 3, "click"], [1, "modal-header-modern"], ["id", "encounter-detail-title"], ["type", "button", "aria-label", "Cerrar", 1, "btn-close-circle", 3, "click", "disabled"], ["role", "alert", 1, "error-banner"], ["role", "status"], [1, "modal-body-scrollable"], [1, "encounter-summary"], [1, "conflict-review"], [1, "consultation-metadata", 3, "disabled"], [3, "valuesChange", "validityChange", "definition", "values", "formulaResults", "readonly"], [1, "modal-footer-clean"], ["type", "button", 3, "click", "disabled"], [3, "ngModelChange", "ngModel"], [3, "value"], ["type", "button", 1, "btn-close-dialog", 3, "click", "disabled"], ["type", "button", 1, "btn-close-dialog"], ["type", "button", 1, "btn-close-dialog", 3, "click"]], template: function EncounterDetailDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, EncounterDetailDialogComponent_Conditional_0_Template, 10, 5, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.isOpen() ? 0 : -1);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, SelectControlValueAccessor, NgControlStatus, NgModel, DynamicFormRendererComponent], styles: ["\n[_nghost-%COMP%] {\n  display: contents;\n}\n.m3-modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(15, 23, 42, 0.6);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  z-index: 1060;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1.25rem;\n  box-sizing: border-box;\n  animation: _ngcontent-%COMP%_fadeIn 0.18s ease-out;\n}\n.m3-modal-dialog[_ngcontent-%COMP%] {\n  max-width: 800px;\n  width: 100%;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  background: var(--%NS%dc-surface, #ffffff);\n  border-radius: 16px;\n  overflow: hidden;\n  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  animation: _ngcontent-%COMP%_scaleUp 0.18s ease-out;\n}\n.modal-header-modern[_ngcontent-%COMP%] {\n  padding: 1.25rem 1.5rem;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  border-bottom: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.header-main-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n}\n.encounter-avatar-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  background: var(--%NS%dc-teal-surface, #e6f6f8);\n  color: var(--%NS%dc-teal-ink, #006874);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.35rem;\n  flex-shrink: 0;\n}\n.header-tags-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  margin-bottom: 0.2rem;\n}\n.type-pill[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 700;\n  color: var(--%NS%dc-teal-ink, #006874);\n  background-color: var(--%NS%dc-teal-surface, #e6f6f8);\n  padding: 2px 7px;\n  border-radius: 9999px;\n  border: 1px solid #cce8ed;\n}\n.encounter-number[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.specialty-pill[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 600;\n  padding: 2px 6px;\n  border-radius: 9999px;\n}\n.encounter-patient-title[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #0f172a);\n  margin: 0;\n  line-height: 1.2;\n}\n.encounter-meta-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  font-size: 0.78rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  margin-top: 0.25rem;\n}\n.meta-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.header-action-btns[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.btn-icon-action[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  font-size: 0.8rem;\n  font-weight: 600;\n  padding: 0.4rem 0.75rem;\n  border-radius: 8px;\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  background: var(--%NS%dc-surface, #ffffff);\n  color: var(--%NS%dc-ink-secondary, #334155);\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.btn-icon-action[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-surface-high, #f1f5f9);\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.btn-close-circle[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  border: none;\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n  color: var(--%NS%dc-ink-muted, #64748b);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.btn-close-circle[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-surface-high, #e2e8f0);\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.modal-body-scrollable[_ngcontent-%COMP%] {\n  padding: 1.25rem 1.5rem;\n  overflow-y: auto;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n.clinical-card[_ngcontent-%COMP%] {\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 12px;\n  background: var(--%NS%dc-surface, #ffffff);\n  overflow: hidden;\n}\n.clinical-card.card-dynamic[_ngcontent-%COMP%] {\n  border-left: 4px solid #006874;\n}\n.card-section-header[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  border-bottom: 1px solid var(--%NS%dc-outline, #f1f5f9);\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.card-section-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #1e293b);\n  margin: 0;\n}\n.card-section-body[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n.dynamic-fields-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n  gap: 0.75rem;\n  padding: 1rem;\n}\n.dynamic-field-box[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 8px;\n  padding: 0.65rem 0.85rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n.field-box-label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.field-box-value[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink, #0f172a);\n  word-break: break-word;\n}\n.summary-line[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n.summary-label[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.summary-text[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--%NS%dc-ink, #1e293b);\n  margin: 0;\n}\n.diag-code-tag[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-blue-surface, #e0f2fe);\n  color: var(--%NS%dc-blue-ink, #0369a1);\n  font-size: 0.75rem;\n  font-weight: 700;\n  padding: 1px 5px;\n  border-radius: 4px;\n  margin-right: 0.35rem;\n}\n.vitals-chips-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));\n  gap: 0.65rem;\n  padding: 1rem;\n}\n.vital-chip-box[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-teal-surface, #f0fdfa);\n  border: 1px solid #ccfbf1;\n  border-radius: 8px;\n  padding: 0.5rem 0.75rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.vital-chip-label[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  font-weight: 600;\n  color: var(--%NS%dc-teal-ink, #0f766e);\n  text-transform: uppercase;\n}\n.vital-chip-val[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.rx-table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.rx-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.82rem;\n}\n.rx-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.5rem 0.75rem;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  color: var(--%NS%dc-ink-muted, #64748b);\n  text-align: left;\n  border-bottom: 1px solid var(--%NS%dc-outline, #e2e8f0);\n}\n.rx-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.55rem 0.75rem;\n  border-bottom: 1px solid var(--%NS%dc-outline, #f1f5f9);\n  color: var(--%NS%dc-ink-secondary, #334155);\n}\n.modal-footer-clean[_ngcontent-%COMP%] {\n  padding: 0.85rem 1.5rem;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  border-top: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  display: flex;\n  justify-content: flex-end;\n}\n.btn-close-dialog[_ngcontent-%COMP%] {\n  padding: 0.45rem 1.25rem;\n  border-radius: 8px;\n  background: #006874;\n  color: #ffffff;\n  border: none;\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n}\n.btn-close-dialog[_ngcontent-%COMP%]:hover {\n  background-color: #00505a;\n}\n.badge-pediatrics[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-teal-surface, #ccfbf1);\n  color: var(--%NS%dc-teal-ink, #0f766e);\n}\n.badge-cardiology[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-error-surface, #ffe4e6);\n  color: var(--%NS%dc-error-ink, #be123c);\n}\n.badge-general[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-surface-high, #f1f5f9);\n  color: var(--%NS%dc-ink-secondary, #475569);\n}\n.loading-state-box[_ngcontent-%COMP%], \n.error-state-box[_ngcontent-%COMP%] {\n  padding: 3rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.spinner-large[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: 3px solid var(--%NS%dc-outline, #e2e8f0);\n  border-top-color: #006874;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_scaleUp {\n  from {\n    opacity: 0;\n    transform: scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.field-error[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 6px;\n  color: var(--%NS%dc-error-ink, #b91c1c);\n  font-size: .8rem;\n}\n/*# sourceMappingURL=encounter-detail-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EncounterDetailDialogComponent, [{
    type: Component,
    args: [{ selector: "app-encounter-detail-dialog", imports: [FormsModule, DynamicFormRendererComponent], template: `@if (isOpen()) {\r
  <div class="m3-modal-backdrop" (mousedown)="onBackdropMouseDown($event)" (click)="onBackdropClick($event)"><section class="m3-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="encounter-detail-title" (click)="$event.stopPropagation()">\r
    <header class="modal-header-modern"><h2 id="encounter-detail-title">{{ isEditing() ? 'Editar consulta' : 'Detalle de la consulta' }}</h2><button type="button" class="btn-close-circle" [disabled]="isSubmitting()" (click)="closeModal()" aria-label="Cerrar">\xD7</button></header>\r
    @if (errorMessage()) { <p class="error-banner" role="alert">{{ errorMessage() }}</p> }\r
    @if (isLoading()) { <p role="status">Cargando consulta...</p> }\r
    @if (encounter(); as record) {\r
      <div class="modal-body-scrollable">\r
        <section class="encounter-summary"><h3>{{ record.patientFullName }}</h3><p>{{ record.specialty.name }} \xB7 {{ formatDate(record.encounterDate) }} \xB7 {{ getConsultationTypeLabel(record.consultationType) }}</p></section>\r
        @if (hasConflict()) { <section class="conflict-review"><p>La consulta fue modificada. Tus respuestas locales siguen visibles.</p><button type="button" [disabled]="isLoading()" (click)="reviewRemote()">Consultar copia del servidor</button>@if (remoteRecord(); as remote) { <p>Copia guardada: {{ formatDate(remote.encounterDate) }}</p><button type="button" [disabled]="isLoading()" (click)="useRemoteRecord()">Usar copia del servidor y descartar mi edici\xF3n local</button> }</section> }\r
        @if (isEditing()) {\r
          <fieldset class="consultation-metadata" [disabled]="readonly()"><legend>Datos de la consulta</legend><p>Fecha de creaci\xF3n: {{ formatDate(record.encounterDate) }} ({{ timeZone }}). Asignada por el servidor; no editable.</p><label>Tipo <select [ngModel]="consultationType()" (ngModelChange)="consultationType.set($event)">@for (type of consultationTypes; track type.value) { <option [value]="type.value">{{ type.label }}</option> }</select></label></fieldset>\r
        }\r
        <app-dynamic-form-renderer [definition]="record.formDefinitionSnapshot" [values]="values()" [formulaResults]="formulaResults()" [readonly]="readonly()" (valuesChange)="onValuesChange($event)" (validityChange)="formValid.set($event)" />\r
      </div>\r
      <footer class="modal-footer-clean">@if (isEditing()) { <button type="button" class="btn-close-dialog" [disabled]="isSubmitting()" (click)="cancelEditing()">Cancelar edici\xF3n</button><button type="button" class="btn-close-dialog" [disabled]="readonly() || !formValid()" (click)="save()">{{ isSubmitting() ? 'Guardando...' : 'Guardar cambios' }}</button> } @else { @if (recordActions.has('PRINT_DOCUMENT')) { <button type="button" class="btn-close-dialog" (click)="printEncounter()">Imprimir</button> }<button type="button" class="btn-close-dialog" (click)="startEditing()">Editar consulta</button> }</footer>\r
    }\r
  </section></div>\r
}\r
`, styles: ["/* src/app/features/encounter-detail-dialog/encounter-detail-dialog.component.css */\n:host {\n  display: contents;\n}\n.m3-modal-backdrop {\n  position: fixed;\n  inset: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(15, 23, 42, 0.6);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  z-index: 1060;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1.25rem;\n  box-sizing: border-box;\n  animation: fadeIn 0.18s ease-out;\n}\n.m3-modal-dialog {\n  max-width: 800px;\n  width: 100%;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  background: var(--dc-surface, #ffffff);\n  border-radius: 16px;\n  overflow: hidden;\n  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  animation: scaleUp 0.18s ease-out;\n}\n.modal-header-modern {\n  padding: 1.25rem 1.5rem;\n  background: var(--dc-surface-low, #f8fafc);\n  border-bottom: 1px solid var(--dc-outline, #e2e8f0);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.header-main-info {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n}\n.encounter-avatar-icon {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  background: var(--dc-teal-surface, #e6f6f8);\n  color: var(--dc-teal-ink, #006874);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.35rem;\n  flex-shrink: 0;\n}\n.header-tags-row {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  margin-bottom: 0.2rem;\n}\n.type-pill {\n  font-size: 0.72rem;\n  font-weight: 700;\n  color: var(--dc-teal-ink, #006874);\n  background-color: var(--dc-teal-surface, #e6f6f8);\n  padding: 2px 7px;\n  border-radius: 9999px;\n  border: 1px solid #cce8ed;\n}\n.encounter-number {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: var(--dc-ink-muted, #64748b);\n}\n.specialty-pill {\n  font-size: 0.7rem;\n  font-weight: 600;\n  padding: 2px 6px;\n  border-radius: 9999px;\n}\n.encounter-patient-title {\n  font-size: 1.2rem;\n  font-weight: 700;\n  color: var(--dc-ink, #0f172a);\n  margin: 0;\n  line-height: 1.2;\n}\n.encounter-meta-row {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  font-size: 0.78rem;\n  color: var(--dc-ink-muted, #64748b);\n  margin-top: 0.25rem;\n}\n.meta-item {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.header-action-btns {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.btn-icon-action {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  font-size: 0.8rem;\n  font-weight: 600;\n  padding: 0.4rem 0.75rem;\n  border-radius: 8px;\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  background: var(--dc-surface, #ffffff);\n  color: var(--dc-ink-secondary, #334155);\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.btn-icon-action:hover {\n  background-color: var(--dc-surface-high, #f1f5f9);\n  color: var(--dc-ink, #0f172a);\n}\n.btn-close-circle {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  border: none;\n  background: var(--dc-surface-high, #f1f5f9);\n  color: var(--dc-ink-muted, #64748b);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.btn-close-circle:hover {\n  background: var(--dc-surface-high, #e2e8f0);\n  color: var(--dc-ink, #0f172a);\n}\n.modal-body-scrollable {\n  padding: 1.25rem 1.5rem;\n  overflow-y: auto;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n.clinical-card {\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 12px;\n  background: var(--dc-surface, #ffffff);\n  overflow: hidden;\n}\n.clinical-card.card-dynamic {\n  border-left: 4px solid #006874;\n}\n.card-section-header {\n  padding: 0.75rem 1rem;\n  background-color: var(--dc-surface-low, #f8fafc);\n  border-bottom: 1px solid var(--dc-outline, #f1f5f9);\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.card-section-header h3 {\n  font-size: 0.9rem;\n  font-weight: 700;\n  color: var(--dc-ink, #1e293b);\n  margin: 0;\n}\n.card-section-body {\n  padding: 1rem;\n}\n.dynamic-fields-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n  gap: 0.75rem;\n  padding: 1rem;\n}\n.dynamic-field-box {\n  background: var(--dc-surface-low, #f8fafc);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 8px;\n  padding: 0.65rem 0.85rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n.field-box-label {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: var(--dc-ink-muted, #64748b);\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.field-box-value {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: var(--dc-ink, #0f172a);\n  word-break: break-word;\n}\n.summary-line {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n.summary-label {\n  font-size: 0.74rem;\n  font-weight: 600;\n  color: var(--dc-ink-muted, #64748b);\n}\n.summary-text {\n  font-size: 0.9rem;\n  color: var(--dc-ink, #1e293b);\n  margin: 0;\n}\n.diag-code-tag {\n  background: var(--dc-blue-surface, #e0f2fe);\n  color: var(--dc-blue-ink, #0369a1);\n  font-size: 0.75rem;\n  font-weight: 700;\n  padding: 1px 5px;\n  border-radius: 4px;\n  margin-right: 0.35rem;\n}\n.vitals-chips-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));\n  gap: 0.65rem;\n  padding: 1rem;\n}\n.vital-chip-box {\n  background: var(--dc-teal-surface, #f0fdfa);\n  border: 1px solid #ccfbf1;\n  border-radius: 8px;\n  padding: 0.5rem 0.75rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.vital-chip-label {\n  font-size: 0.68rem;\n  font-weight: 600;\n  color: var(--dc-teal-ink, #0f766e);\n  text-transform: uppercase;\n}\n.vital-chip-val {\n  font-size: 0.88rem;\n  color: var(--dc-ink, #0f172a);\n}\n.rx-table-wrap {\n  overflow-x: auto;\n}\n.rx-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.82rem;\n}\n.rx-table th {\n  padding: 0.5rem 0.75rem;\n  background: var(--dc-surface-low, #f8fafc);\n  color: var(--dc-ink-muted, #64748b);\n  text-align: left;\n  border-bottom: 1px solid var(--dc-outline, #e2e8f0);\n}\n.rx-table td {\n  padding: 0.55rem 0.75rem;\n  border-bottom: 1px solid var(--dc-outline, #f1f5f9);\n  color: var(--dc-ink-secondary, #334155);\n}\n.modal-footer-clean {\n  padding: 0.85rem 1.5rem;\n  background: var(--dc-surface-low, #f8fafc);\n  border-top: 1px solid var(--dc-outline, #e2e8f0);\n  display: flex;\n  justify-content: flex-end;\n}\n.btn-close-dialog {\n  padding: 0.45rem 1.25rem;\n  border-radius: 8px;\n  background: #006874;\n  color: #ffffff;\n  border: none;\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n}\n.btn-close-dialog:hover {\n  background-color: #00505a;\n}\n.badge-pediatrics {\n  background-color: var(--dc-teal-surface, #ccfbf1);\n  color: var(--dc-teal-ink, #0f766e);\n}\n.badge-cardiology {\n  background-color: var(--dc-error-surface, #ffe4e6);\n  color: var(--dc-error-ink, #be123c);\n}\n.badge-general {\n  background-color: var(--dc-surface-high, #f1f5f9);\n  color: var(--dc-ink-secondary, #475569);\n}\n.loading-state-box,\n.error-state-box {\n  padding: 3rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n  color: var(--dc-ink-muted, #64748b);\n}\n.spinner-large {\n  width: 32px;\n  height: 32px;\n  border: 3px solid var(--dc-outline, #e2e8f0);\n  border-top-color: #006874;\n  border-radius: 50%;\n  animation: spin 0.7s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes scaleUp {\n  from {\n    opacity: 0;\n    transform: scale(0.97);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.field-error {\n  display: block;\n  margin-top: 6px;\n  color: var(--dc-error-ink, #b91c1c);\n  font-size: .8rem;\n}\n/*# sourceMappingURL=encounter-detail-dialog.component.css.map */\n"] }]
  }], () => [], { openModal: [{
    type: HostListener,
    args: ["window:open-encounter-detail-modal", ["$event"]]
  }], onEscape: [{
    type: HostListener,
    args: ["window:keydown.escape"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EncounterDetailDialogComponent, { className: "EncounterDetailDialogComponent", filePath: "src/app/features/encounter-detail-dialog/encounter-detail-dialog.component.ts", lineNumber: 17 });
})();

// src/app/features/auth/user-profile-dialog.component.ts
function UserProfileDialogComponent_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 8);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 22);
    \u0275\u0275domElement(2, "path", 23);
    \u0275\u0275domElementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275domElementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage());
  }
}
function UserProfileDialogComponent_Conditional_0_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "span", 24);
    \u0275\u0275domElementStart(1, "span");
    \u0275\u0275text(2, "Cerrando Sesi\xF3n...");
    \u0275\u0275domElementEnd();
  }
}
function UserProfileDialogComponent_Conditional_0_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "svg", 25);
    \u0275\u0275domElement(1, "path", 26);
    \u0275\u0275domElementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275domElementStart(2, "span");
    \u0275\u0275text(3, "Cerrar Sesi\xF3n");
    \u0275\u0275domElementEnd();
  }
}
function UserProfileDialogComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 1);
    \u0275\u0275domListener("click", function UserProfileDialogComponent_Conditional_0_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBackdropClick($event));
    });
    \u0275\u0275domElementStart(1, "div", 2);
    \u0275\u0275domListener("click", function UserProfileDialogComponent_Conditional_0_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275domElementStart(2, "div", 3)(3, "div", 4)(4, "h3", 5);
    \u0275\u0275text(5, "Perfil Profesional");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "button", 6);
    \u0275\u0275domListener("click", function UserProfileDialogComponent_Conditional_0_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(7, " \xD7 ");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "div", 7);
    \u0275\u0275conditionalCreate(9, UserProfileDialogComponent_Conditional_0_Conditional_9_Template, 5, 1, "div", 8);
    \u0275\u0275domElementStart(10, "div", 9)(11, "div", 10);
    \u0275\u0275text(12);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "div", 11)(14, "h4", 12);
    \u0275\u0275text(15);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(16, "span", 13);
    \u0275\u0275text(17);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(18, "div", 14)(19, "div", 15)(20, "span", 16);
    \u0275\u0275text(21, "Nombre Completo");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(22, "span", 17);
    \u0275\u0275text(23);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(24, "div", 15)(25, "span", 16);
    \u0275\u0275text(26, "Correo Electr\xF3nico");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(27, "span", 17);
    \u0275\u0275text(28);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(29, "div", 15)(30, "span", 16);
    \u0275\u0275text(31, "DNI / Documento");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(32, "span", 17);
    \u0275\u0275text(33);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(34, "div", 15)(35, "span", 16);
    \u0275\u0275text(36, "Rol Cl\xEDnico");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(37, "span", 17);
    \u0275\u0275text(38);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(39, "div", 15)(40, "span", 16);
    \u0275\u0275text(41, "Especialidad Asignada");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(42, "span", 17);
    \u0275\u0275text(43);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(44, "div", 18)(45, "span", 16);
    \u0275\u0275text(46, "Matr\xEDcula Profesional");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(47, "span", 17);
    \u0275\u0275text(48);
    \u0275\u0275domElementEnd()()()();
    \u0275\u0275domElementStart(49, "div", 19)(50, "button", 20);
    \u0275\u0275domListener("click", function UserProfileDialogComponent_Conditional_0_Template_button_click_50_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeModal());
    });
    \u0275\u0275text(51, " Cerrar ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(52, "button", 21);
    \u0275\u0275domListener("click", function UserProfileDialogComponent_Conditional_0_Template_button_click_52_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleSignOut());
    });
    \u0275\u0275conditionalCreate(53, UserProfileDialogComponent_Conditional_0_Conditional_53_Template, 3, 0)(54, UserProfileDialogComponent_Conditional_0_Conditional_54_Template, 4, 0);
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275domProperty("disabled", ctx_r1.isSubmitting());
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.errorMessage() ? 9 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.initials(), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.fullName());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.email());
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.fullName());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.email());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.dni());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.role());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.doctorSpecialtyService.currentSpecialtyOption().label);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.license());
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", ctx_r1.isSubmitting());
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", ctx_r1.isSubmitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSubmitting() ? 53 : 54);
  }
}
var UserProfileDialogComponent = class _UserProfileDialogComponent {
  authService = inject(AuthService);
  doctorSpecialtyService = inject(DoctorSpecialtyService);
  activePatientService = inject(ActivePatientService);
  doctorProfileService = inject(DoctorProfileService);
  platformId = inject(PLATFORM_ID);
  isLocallyOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLocallyOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isOpen = computed(
    () => this.isLocallyOpen() || this.authService.isProfileModalOpen(),
    ...ngDevMode ? [{ debugName: "isOpen" }] : (
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
  errorMessage = signal(
    null,
    ...ngDevMode ? [{ debugName: "errorMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  user = computed(
    () => this.authService.currentUser(),
    ...ngDevMode ? [{ debugName: "user" }] : (
      /* istanbul ignore next */
      []
    )
  );
  fullName = computed(
    () => {
      return this.authService.userName();
    },
    ...ngDevMode ? [{ debugName: "fullName" }] : (
      /* istanbul ignore next */
      []
    )
  );
  email = computed(
    () => {
      return this.authService.userEmail() || "usuario@doctorchart.app";
    },
    ...ngDevMode ? [{ debugName: "email" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dni = computed(
    () => {
      const user = this.user();
      return user?.user_metadata?.["dni"] || "No especificado";
    },
    ...ngDevMode ? [{ debugName: "dni" }] : (
      /* istanbul ignore next */
      []
    )
  );
  role = computed(
    () => {
      const user = this.user();
      return user?.user_metadata?.["role"] || "M\xE9dico Especialista";
    },
    ...ngDevMode ? [{ debugName: "role" }] : (
      /* istanbul ignore next */
      []
    )
  );
  license = computed(
    () => doctorPrintIdentity(this.user()?.user_metadata).license || "No informada",
    ...ngDevMode ? [{ debugName: "license" }] : (
      /* istanbul ignore next */
      []
    )
  );
  initials = computed(
    () => {
      const name = this.fullName();
      if (!name)
        return "DC";
      const parts = name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
      }
      return name.slice(0, 2).toUpperCase();
    },
    ...ngDevMode ? [{ debugName: "initials" }] : (
      /* istanbul ignore next */
      []
    )
  );
  openModal() {
    this.isLocallyOpen.set(true);
    this.authService.openProfileModal();
    this.errorMessage.set(null);
  }
  onEscape() {
    if (this.isOpen() && !this.isSubmitting()) {
      this.closeModal();
    }
  }
  onBackdropClick(event) {
    if (event.target === event.currentTarget && !this.isSubmitting()) {
      this.closeModal();
    }
  }
  closeModal() {
    this.isLocallyOpen.set(false);
    this.authService.closeProfileModal();
    this.errorMessage.set(null);
  }
  async handleSignOut() {
    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    try {
      this.activePatientService.clear();
      this.doctorProfileService.clearProfile();
      const { error } = await this.authService.signOut();
      if (error) {
        this.errorMessage.set(error.message || "Error al cerrar sesi\xF3n.");
        this.isSubmitting.set(false);
        return;
      }
      if (isPlatformBrowser(this.platformId)) {
        window.dispatchEvent(new CustomEvent("auth-signout"));
      }
      this.closeModal();
    } catch (err) {
      this.isSubmitting.set(false);
      const msg = err instanceof Error ? err.message : "Error inesperado al cerrar sesi\xF3n.";
      this.errorMessage.set(msg);
    } finally {
      this.isSubmitting.set(false);
    }
  }
  static \u0275fac = function UserProfileDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserProfileDialogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserProfileDialogComponent, selectors: [["app-user-profile-dialog"]], hostBindings: function UserProfileDialogComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("open-profile-modal", function UserProfileDialogComponent_open_profile_modal_HostBindingHandler() {
        return ctx.openModal();
      }, \u0275\u0275resolveWindow)("keydown.escape", function UserProfileDialogComponent_keydown_escape_HostBindingHandler() {
        return ctx.onEscape();
      }, \u0275\u0275resolveWindow);
    }
  }, decls: 1, vars: 1, consts: [["role", "dialog", "aria-modal", "true", "aria-labelledby", "modal-profile-title", 1, "m3-modal-backdrop"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "modal-profile-title", 1, "m3-modal-backdrop", 3, "click"], [1, "m3-modal-dialog", "profile-dialog", 3, "click"], [1, "m3-modal-header", "profile-header"], [1, "profile-header-title"], ["id", "modal-profile-title"], ["type", "button", "title", "Cerrar modal", "aria-label", "Cerrar modal", 1, "modal-close-btn", 3, "click", "disabled"], [1, "m3-modal-body", "profile-body"], ["role", "alert", 1, "m3-alert-error"], [1, "profile-hero"], [1, "profile-avatar-circle"], [1, "profile-hero-info"], [1, "profile-fullname"], [1, "profile-email"], [1, "profile-details-card"], [1, "detail-row"], [1, "detail-label"], [1, "detail-value"], [1, "detail-row", "last-row"], [1, "m3-modal-footer", "profile-footer"], ["type", "button", 1, "m3-button", "m3-button-text", 3, "click", "disabled"], ["type", "button", 1, "m3-button", "m3-button-danger", 3, "click", "disabled"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "currentColor", "aria-hidden", "true"], ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"], ["aria-hidden", "true", 1, "spinner-small"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "currentColor", "aria-hidden", "true"], ["d", "M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"]], template: function UserProfileDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, UserProfileDialogComponent_Conditional_0_Template, 55, 14, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.isOpen() ? 0 : -1);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: contents;\n}\n.m3-modal-backdrop[_ngcontent-%COMP%] {\n  display: flex;\n  opacity: 1;\n  z-index: 1000;\n}\n.profile-dialog[_ngcontent-%COMP%] {\n  max-width: 440px;\n  transform: scale(1);\n}\n.profile-header-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  font-weight: 700;\n  color: var(--%NS%md-sys-color-on-surface);\n  margin: 0;\n}\n.profile-hero[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  margin-bottom: 1.25rem;\n}\n.profile-avatar-circle[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%md-sys-color-primary),\n      #0097a7);\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.25rem;\n  font-weight: 700;\n  box-shadow: 0 2px 6px rgba(0, 104, 116, 0.25);\n  flex-shrink: 0;\n}\n.profile-hero-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.profile-fullname[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: var(--%NS%md-sys-color-on-surface);\n  margin: 0;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.profile-email[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--%NS%md-sys-color-secondary);\n  margin: 0.1rem 0 0;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.profile-details-card[_ngcontent-%COMP%] {\n  background-color: var(--%NS%md-sys-color-surface-container-low);\n  border: 1px solid var(--%NS%md-sys-color-outline-variant);\n  border-radius: var(--%NS%md-shape-m);\n  padding: 0.85rem 1rem;\n}\n.detail-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.45rem 0;\n  font-size: 0.82rem;\n  border-bottom: 1px dashed var(--%NS%md-sys-color-surface-variant);\n}\n.detail-row.last-row[_ngcontent-%COMP%] {\n  border-bottom: none;\n}\n.detail-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--%NS%md-sys-color-secondary);\n}\n.detail-value[_ngcontent-%COMP%] {\n  color: var(--%NS%md-sys-color-on-surface);\n  font-weight: 500;\n  text-align: right;\n}\n.m3-button-danger[_ngcontent-%COMP%] {\n  background-color: var(--%NS%md-sys-color-error);\n  color: #ffffff;\n  border: none;\n  padding: 0.55rem 1.25rem;\n  border-radius: var(--%NS%md-shape-full);\n  font-family: inherit;\n  font-size: 0.88rem;\n  font-weight: 600;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  transition: background-color 0.2s ease;\n}\n.m3-button-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #93000a;\n}\n.m3-alert-error[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.6rem 0.8rem;\n  border-radius: var(--%NS%md-shape-s);\n  margin-bottom: 0.85rem;\n  font-size: 0.82rem;\n  font-weight: 500;\n  background-color: var(--%NS%dc-error-surface, #ffdad6);\n  color: var(--%NS%dc-error-ink, #410002);\n  border: 1px solid #ff5449;\n}\n.spinner-small[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-radius: 50%;\n  border-top-color: #ffffff;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n  display: inline-block;\n  margin-right: 0.4rem;\n  vertical-align: middle;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=user-profile-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserProfileDialogComponent, [{
    type: Component,
    args: [{ selector: "app-user-profile-dialog", imports: [], template: '@if (isOpen()) {\r\n  <div\r\n    class="m3-modal-backdrop"\r\n    role="dialog"\r\n    aria-modal="true"\r\n    aria-labelledby="modal-profile-title"\r\n    (click)="onBackdropClick($event)"\r\n  >\r\n    <div class="m3-modal-dialog profile-dialog" (click)="$event.stopPropagation()">\r\n      <!-- Header with branding -->\r\n      <div class="m3-modal-header profile-header">\r\n        <div class="profile-header-title">\r\n          <h3 id="modal-profile-title">Perfil Profesional</h3>\r\n        </div>\r\n        <button\r\n          type="button"\r\n          class="modal-close-btn"\r\n          title="Cerrar modal"\r\n          aria-label="Cerrar modal"\r\n          (click)="closeModal()"\r\n          [disabled]="isSubmitting()"\r\n        >\r\n          &times;\r\n        </button>\r\n      </div>\r\n\r\n      <!-- Body -->\r\n      <div class="m3-modal-body profile-body">\r\n        @if (errorMessage()) {\r\n          <div class="m3-alert-error" role="alert">\r\n            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">\r\n              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>\r\n            </svg>\r\n            <span>{{ errorMessage() }}</span>\r\n          </div>\r\n        }\r\n\r\n        <!-- Profile Hero Section -->\r\n        <div class="profile-hero">\r\n          <div class="profile-avatar-circle">\r\n            {{ initials() }}\r\n          </div>\r\n          <div class="profile-hero-info">\r\n            <h4 class="profile-fullname">{{ fullName() }}</h4>\r\n            <span class="profile-email">{{ email() }}</span>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Detailed Medical Profile Data -->\r\n        <div class="profile-details-card">\r\n          <div class="detail-row">\r\n            <span class="detail-label">Nombre Completo</span>\r\n            <span class="detail-value">{{ fullName() }}</span>\r\n          </div>\r\n          <div class="detail-row">\r\n            <span class="detail-label">Correo Electr\xF3nico</span>\r\n            <span class="detail-value">{{ email() }}</span>\r\n          </div>\r\n          <div class="detail-row">\r\n            <span class="detail-label">DNI / Documento</span>\r\n            <span class="detail-value">{{ dni() }}</span>\r\n          </div>\r\n          <div class="detail-row">\r\n            <span class="detail-label">Rol Cl\xEDnico</span>\r\n            <span class="detail-value">{{ role() }}</span>\r\n          </div>\r\n          <div class="detail-row">\r\n            <span class="detail-label">Especialidad Asignada</span>\r\n            <span class="detail-value">{{ doctorSpecialtyService.currentSpecialtyOption().label }}</span>\r\n          </div>\r\n          <div class="detail-row last-row">\r\n            <span class="detail-label">Matr\xEDcula Profesional</span>\r\n            <span class="detail-value">{{ license() }}</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Footer Actions -->\r\n      <div class="m3-modal-footer profile-footer">\r\n        <button\r\n          type="button"\r\n          class="m3-button m3-button-text"\r\n          (click)="closeModal()"\r\n          [disabled]="isSubmitting()"\r\n        >\r\n          Cerrar\r\n        </button>\r\n        <button\r\n          type="button"\r\n          class="m3-button m3-button-danger"\r\n          (click)="handleSignOut()"\r\n          [disabled]="isSubmitting()"\r\n        >\r\n          @if (isSubmitting()) {\r\n            <span class="spinner-small" aria-hidden="true"></span>\r\n            <span>Cerrando Sesi\xF3n...</span>\r\n          } @else {\r\n            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">\r\n              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>\r\n            </svg>\r\n            <span>Cerrar Sesi\xF3n</span>\r\n          }\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n}\r\n', styles: ["/* src/app/features/auth/user-profile-dialog.component.css */\n:host {\n  display: contents;\n}\n.m3-modal-backdrop {\n  display: flex;\n  opacity: 1;\n  z-index: 1000;\n}\n.profile-dialog {\n  max-width: 440px;\n  transform: scale(1);\n}\n.profile-header-title h3 {\n  font-size: 1.15rem;\n  font-weight: 700;\n  color: var(--md-sys-color-on-surface);\n  margin: 0;\n}\n.profile-hero {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  margin-bottom: 1.25rem;\n}\n.profile-avatar-circle {\n  width: 56px;\n  height: 56px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      var(--md-sys-color-primary),\n      #0097a7);\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.25rem;\n  font-weight: 700;\n  box-shadow: 0 2px 6px rgba(0, 104, 116, 0.25);\n  flex-shrink: 0;\n}\n.profile-hero-info {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.profile-fullname {\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: var(--md-sys-color-on-surface);\n  margin: 0;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.profile-email {\n  font-size: 0.8rem;\n  color: var(--md-sys-color-secondary);\n  margin: 0.1rem 0 0;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.profile-details-card {\n  background-color: var(--md-sys-color-surface-container-low);\n  border: 1px solid var(--md-sys-color-outline-variant);\n  border-radius: var(--md-shape-m);\n  padding: 0.85rem 1rem;\n}\n.detail-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.45rem 0;\n  font-size: 0.82rem;\n  border-bottom: 1px dashed var(--md-sys-color-surface-variant);\n}\n.detail-row.last-row {\n  border-bottom: none;\n}\n.detail-label {\n  font-weight: 600;\n  color: var(--md-sys-color-secondary);\n}\n.detail-value {\n  color: var(--md-sys-color-on-surface);\n  font-weight: 500;\n  text-align: right;\n}\n.m3-button-danger {\n  background-color: var(--md-sys-color-error);\n  color: #ffffff;\n  border: none;\n  padding: 0.55rem 1.25rem;\n  border-radius: var(--md-shape-full);\n  font-family: inherit;\n  font-size: 0.88rem;\n  font-weight: 600;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  transition: background-color 0.2s ease;\n}\n.m3-button-danger:hover:not(:disabled) {\n  background-color: #93000a;\n}\n.m3-alert-error {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.6rem 0.8rem;\n  border-radius: var(--md-shape-s);\n  margin-bottom: 0.85rem;\n  font-size: 0.82rem;\n  font-weight: 500;\n  background-color: var(--dc-error-surface, #ffdad6);\n  color: var(--dc-error-ink, #410002);\n  border: 1px solid #ff5449;\n}\n.spinner-small {\n  width: 14px;\n  height: 14px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-radius: 50%;\n  border-top-color: #ffffff;\n  animation: spin 0.8s linear infinite;\n  display: inline-block;\n  margin-right: 0.4rem;\n  vertical-align: middle;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=user-profile-dialog.component.css.map */\n"] }]
  }], null, { openModal: [{
    type: HostListener,
    args: ["window:open-profile-modal"]
  }], onEscape: [{
    type: HostListener,
    args: ["window:keydown.escape"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserProfileDialogComponent, { className: "UserProfileDialogComponent", filePath: "src/app/features/auth/user-profile-dialog.component.ts", lineNumber: 22 });
})();

// src/app/layout/private-shell/private-shell.component.ts
var PrivateShellComponent_Conditional_7_Conditional_8_Defer_1_DepsFn = () => [
  /* @ts-ignore */
  import("./chunk-BXSF64LS.js").then((m) => m.AiAssistantWidgetComponent)
];
function PrivateShellComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 3)(2, "div", 4);
    \u0275\u0275element(3, "img", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 6);
    \u0275\u0275text(5, "DoctorChart");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "div", 7);
    \u0275\u0275elementStart(7, "p", 8);
    \u0275\u0275text(8, "Verificando sesi\xF3n segura...");
    \u0275\u0275elementEnd()()();
  }
}
function PrivateShellComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-login-page");
  }
}
function PrivateShellComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "app-sidebar");
    \u0275\u0275elementStart(2, "div", 9);
    \u0275\u0275element(3, "app-header");
    \u0275\u0275elementStart(4, "main", 10);
    \u0275\u0275element(5, "router-outlet");
    \u0275\u0275elementEnd()()();
  }
}
function PrivateShellComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h2", 6);
    \u0275\u0275text(3, "No pudimos cargar tu cuenta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 8);
    \u0275\u0275text(5, "Reintent\xE1 para continuar.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 11);
    \u0275\u0275listener("click", function PrivateShellComponent_Conditional_3_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.retrySetup());
    });
    \u0275\u0275text(7, "Reintentar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 11);
    \u0275\u0275listener("click", function PrivateShellComponent_Conditional_3_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.authService.signOut());
    });
    \u0275\u0275text(9, "Cerrar sesi\xF3n");
    \u0275\u0275elementEnd()()();
  }
}
function PrivateShellComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 3)(2, "div", 4);
    \u0275\u0275element(3, "img", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 6);
    \u0275\u0275text(5, "DoctorChart");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "div", 7);
    \u0275\u0275elementStart(7, "p", 8);
    \u0275\u0275text(8, "Verificando perfil m\xE9dico...");
    \u0275\u0275elementEnd()()();
  }
}
function PrivateShellComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 3)(2, "div", 4);
    \u0275\u0275element(3, "img", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 6);
    \u0275\u0275text(5, "DoctorChart");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "div", 7);
    \u0275\u0275elementStart(7, "p", 8);
    \u0275\u0275text(8, "Cargando configuraci\xF3n cl\xEDnica...");
    \u0275\u0275elementEnd()()();
  }
}
function PrivateShellComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "router-outlet");
  }
}
function PrivateShellComponent_Conditional_7_Conditional_8_Defer_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-ai-assistant-widget");
  }
}
function PrivateShellComponent_Conditional_7_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domTemplate(0, PrivateShellComponent_Conditional_7_Conditional_8_Defer_0_Template, 1, 0);
    \u0275\u0275defer(1, 0, PrivateShellComponent_Conditional_7_Conditional_8_Defer_1_DepsFn);
    \u0275\u0275deferOnIdle();
  }
}
function PrivateShellComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "app-sidebar");
    \u0275\u0275elementStart(2, "div", 9);
    \u0275\u0275element(3, "app-header");
    \u0275\u0275elementStart(4, "main", 10);
    \u0275\u0275element(5, "router-outlet");
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(6, "app-encounter-detail-dialog")(7, "app-user-profile-dialog");
    \u0275\u0275conditionalCreate(8, PrivateShellComponent_Conditional_7_Conditional_8_Template, 3, 0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275conditional(ctx_r1.featureFlags.AI_ASSISTANT_ENABLED && ctx_r1.workspaceStore.isModuleActive("AI_ASSISTANT") ? 8 : -1);
  }
}
var PrivateShellComponent = class _PrivateShellComponent {
  authService = inject(AuthService);
  coordinator = inject(SessionCoordinatorService);
  doctorProfileService = this.coordinator.doctorProfileService;
  workspaceStore = this.coordinator.workspaceStore;
  featureFlags = FEATURE_FLAGS;
  retrySetup() {
    this.coordinator.retrySetup();
  }
  static \u0275fac = function PrivateShellComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PrivateShellComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PrivateShellComponent, selectors: [["app-private-shell"]], decls: 8, vars: 1, consts: [["role", "status", "aria-live", "polite", 1, "app-splash-screen"], [1, "app-layout-shell"], ["role", "alert", 1, "app-splash-screen"], [1, "splash-content"], [1, "splash-logo"], ["src", "/doctorchart-logo.svg", "width", "64", "height", "64", "alt", "DoctorChart", 1, "doctorchart-logo"], [1, "splash-title"], [1, "splash-spinner"], [1, "splash-text"], [1, "app-main-viewport"], [1, "app-main-content"], ["type", "button", 3, "click"]], template: function PrivateShellComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, PrivateShellComponent_Conditional_0_Template, 9, 0, "div", 0)(1, PrivateShellComponent_Conditional_1_Template, 1, 0, "app-login-page")(2, PrivateShellComponent_Conditional_2_Template, 6, 0, "div", 1)(3, PrivateShellComponent_Conditional_3_Template, 10, 0, "div", 2)(4, PrivateShellComponent_Conditional_4_Template, 9, 0, "div", 0)(5, PrivateShellComponent_Conditional_5_Template, 9, 0, "div", 0)(6, PrivateShellComponent_Conditional_6_Template, 1, 0, "router-outlet")(7, PrivateShellComponent_Conditional_7_Template, 9, 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(!ctx.authService.isAuthInitialized() ? 0 : !ctx.authService.isLoggedIn() ? 1 : ctx.authService.isSuperAdmin() ? 2 : ctx.doctorProfileService.error() || !ctx.workspaceStore.loaded() && ctx.workspaceStore.error() || !ctx.workspaceStore.preferences() && ctx.workspaceStore.preferencesError() ? 3 : !ctx.doctorProfileService.loaded() || ctx.doctorProfileService.loading() ? 4 : ctx.workspaceStore.isLoading() && (!ctx.workspaceStore.loaded() || ctx.workspaceStore.isOnboardingCompleted() && !ctx.workspaceStore.preferences()) ? 5 : !ctx.workspaceStore.isOnboardingCompleted() ? 6 : 7);
    }
  }, dependencies: [RouterOutlet, HeaderComponent, SidebarComponent, EncounterDetailDialogComponent, UserProfileDialogComponent, LoginPageComponent], styles: ["/* src/app/app.css */\n.app-layout-shell {\n  display: flex;\n  flex: 1;\n  min-height: 100vh;\n  width: 100%;\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  align-items: stretch;\n}\n.app-main-viewport {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  min-height: 100vh;\n  overflow-x: hidden;\n}\n.app-main-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  padding: 1.5rem;\n  width: 100%;\n  max-width: 1600px;\n  margin: 0 auto;\n  box-sizing: border-box;\n}\n@media (max-width: 768px) {\n  .app-main-content {\n    padding: 1rem 0.75rem;\n  }\n}\n.app-splash-screen {\n  min-height: 100vh;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%dc-surface-low, #f0f7f8) 0%,\n      var(--%NS%dc-surface-low, #eaf4f5) 100%);\n}\n.splash-content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n}\n.splash-logo {\n  width: 64px;\n  height: 64px;\n  border-radius: 18px;\n  background: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.splash-title {\n  font-size: 1.6rem;\n  font-weight: 800;\n  color: var(--%NS%md-sys-color-on-surface, #191c1d);\n  margin: 0;\n  letter-spacing: -0.02em;\n}\n.splash-spinner {\n  width: 24px;\n  height: 24px;\n  border: 3px solid rgba(0, 104, 116, 0.2);\n  border-top-color: var(--%NS%md-sys-color-primary, #006874);\n  border-radius: 50%;\n  animation: spin 0.7s linear infinite;\n}\n.splash-text {\n  font-size: 0.88rem;\n  color: var(--%NS%md-sys-color-secondary, #4a6267);\n  margin: 0;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media print {\n  .app-layout-shell,\n  .app-splash-screen {\n    display: none !important;\n  }\n}\n/*# sourceMappingURL=app.css.map */\n", "/* src/app/layout/private-shell/material.css */\nhtml {\n  --%NS%mat-sys-background: #faf9fd;\n  --%NS%mat-sys-error: #ba1a1a;\n  --%NS%mat-sys-error-container: #ffdad6;\n  --%NS%mat-sys-inverse-on-surface: #f2f0f4;\n  --%NS%mat-sys-inverse-primary: #abc7ff;\n  --%NS%mat-sys-inverse-surface: #2f3033;\n  --%NS%mat-sys-on-background: #1a1b1f;\n  --%NS%mat-sys-on-error: #ffffff;\n  --%NS%mat-sys-on-error-container: #93000a;\n  --%NS%mat-sys-on-primary: #ffffff;\n  --%NS%mat-sys-on-primary-container: #00458f;\n  --%NS%mat-sys-on-primary-fixed: #001b3f;\n  --%NS%mat-sys-on-primary-fixed-variant: #00458f;\n  --%NS%mat-sys-on-secondary: #ffffff;\n  --%NS%mat-sys-on-secondary-container: #3e4759;\n  --%NS%mat-sys-on-secondary-fixed: #131c2b;\n  --%NS%mat-sys-on-secondary-fixed-variant: #3e4759;\n  --%NS%mat-sys-on-surface: #1a1b1f;\n  --%NS%mat-sys-on-surface-variant: #44474e;\n  --%NS%mat-sys-on-tertiary: #ffffff;\n  --%NS%mat-sys-on-tertiary-container: #0000ef;\n  --%NS%mat-sys-on-tertiary-fixed: #00006e;\n  --%NS%mat-sys-on-tertiary-fixed-variant: #0000ef;\n  --%NS%mat-sys-outline: #74777f;\n  --%NS%mat-sys-outline-variant: #c4c6d0;\n  --%NS%mat-sys-primary: #005cbb;\n  --%NS%mat-sys-primary-container: #d7e3ff;\n  --%NS%mat-sys-primary-fixed: #d7e3ff;\n  --%NS%mat-sys-primary-fixed-dim: #abc7ff;\n  --%NS%mat-sys-scrim: #000000;\n  --%NS%mat-sys-secondary: #565e71;\n  --%NS%mat-sys-secondary-container: #dae2f9;\n  --%NS%mat-sys-secondary-fixed: #dae2f9;\n  --%NS%mat-sys-secondary-fixed-dim: #bec6dc;\n  --%NS%mat-sys-shadow: #000000;\n  --%NS%mat-sys-surface: #faf9fd;\n  --%NS%mat-sys-surface-bright: #faf9fd;\n  --%NS%mat-sys-surface-container: #efedf0;\n  --%NS%mat-sys-surface-container-high: #e9e7eb;\n  --%NS%mat-sys-surface-container-highest: #e3e2e6;\n  --%NS%mat-sys-surface-container-low: #f4f3f6;\n  --%NS%mat-sys-surface-container-lowest: #ffffff;\n  --%NS%mat-sys-surface-dim: #dbd9dd;\n  --%NS%mat-sys-surface-tint: #005cbb;\n  --%NS%mat-sys-surface-variant: #e0e2ec;\n  --%NS%mat-sys-tertiary: #343dff;\n  --%NS%mat-sys-tertiary-container: #e0e0ff;\n  --%NS%mat-sys-tertiary-fixed: #e0e0ff;\n  --%NS%mat-sys-tertiary-fixed-dim: #bec2ff;\n  --%NS%mat-sys-neutral-variant20: #2d3038;\n  --%NS%mat-sys-neutral10: #1a1b1f;\n  --%NS%mat-sys-level0:\n    0px 0px 0px 0px rgba(0, 0, 0, 0.2),\n    0px 0px 0px 0px rgba(0, 0, 0, 0.14),\n    0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n  --%NS%mat-sys-level1:\n    0px 2px 1px -1px rgba(0, 0, 0, 0.2),\n    0px 1px 1px 0px rgba(0, 0, 0, 0.14),\n    0px 1px 3px 0px rgba(0, 0, 0, 0.12);\n  --%NS%mat-sys-level2:\n    0px 3px 3px -2px rgba(0, 0, 0, 0.2),\n    0px 3px 4px 0px rgba(0, 0, 0, 0.14),\n    0px 1px 8px 0px rgba(0, 0, 0, 0.12);\n  --%NS%mat-sys-level3:\n    0px 3px 5px -1px rgba(0, 0, 0, 0.2),\n    0px 6px 10px 0px rgba(0, 0, 0, 0.14),\n    0px 1px 18px 0px rgba(0, 0, 0, 0.12);\n  --%NS%mat-sys-level4:\n    0px 5px 5px -3px rgba(0, 0, 0, 0.2),\n    0px 8px 10px 1px rgba(0, 0, 0, 0.14),\n    0px 3px 14px 2px rgba(0, 0, 0, 0.12);\n  --%NS%mat-sys-level5:\n    0px 7px 8px -4px rgba(0, 0, 0, 0.2),\n    0px 12px 17px 2px rgba(0, 0, 0, 0.14),\n    0px 5px 22px 4px rgba(0, 0, 0, 0.12);\n  --%NS%mat-sys-body-large: 400 1rem / 1.5rem Roboto;\n  --%NS%mat-sys-body-large-font: Roboto;\n  --%NS%mat-sys-body-large-line-height: 1.5rem;\n  --%NS%mat-sys-body-large-size: 1rem;\n  --%NS%mat-sys-body-large-tracking: 0.031rem;\n  --%NS%mat-sys-body-large-weight: 400;\n  --%NS%mat-sys-body-medium: 400 0.875rem / 1.25rem Roboto;\n  --%NS%mat-sys-body-medium-font: Roboto;\n  --%NS%mat-sys-body-medium-line-height: 1.25rem;\n  --%NS%mat-sys-body-medium-size: 0.875rem;\n  --%NS%mat-sys-body-medium-tracking: 0.016rem;\n  --%NS%mat-sys-body-medium-weight: 400;\n  --%NS%mat-sys-body-small: 400 0.75rem / 1rem Roboto;\n  --%NS%mat-sys-body-small-font: Roboto;\n  --%NS%mat-sys-body-small-line-height: 1rem;\n  --%NS%mat-sys-body-small-size: 0.75rem;\n  --%NS%mat-sys-body-small-tracking: 0.025rem;\n  --%NS%mat-sys-body-small-weight: 400;\n  --%NS%mat-sys-display-large: 400 3.562rem / 4rem Roboto;\n  --%NS%mat-sys-display-large-font: Roboto;\n  --%NS%mat-sys-display-large-line-height: 4rem;\n  --%NS%mat-sys-display-large-size: 3.562rem;\n  --%NS%mat-sys-display-large-tracking: -0.016rem;\n  --%NS%mat-sys-display-large-weight: 400;\n  --%NS%mat-sys-display-medium: 400 2.812rem / 3.25rem Roboto;\n  --%NS%mat-sys-display-medium-font: Roboto;\n  --%NS%mat-sys-display-medium-line-height: 3.25rem;\n  --%NS%mat-sys-display-medium-size: 2.812rem;\n  --%NS%mat-sys-display-medium-tracking: 0;\n  --%NS%mat-sys-display-medium-weight: 400;\n  --%NS%mat-sys-display-small: 400 2.25rem / 2.75rem Roboto;\n  --%NS%mat-sys-display-small-font: Roboto;\n  --%NS%mat-sys-display-small-line-height: 2.75rem;\n  --%NS%mat-sys-display-small-size: 2.25rem;\n  --%NS%mat-sys-display-small-tracking: 0;\n  --%NS%mat-sys-display-small-weight: 400;\n  --%NS%mat-sys-headline-large: 400 2rem / 2.5rem Roboto;\n  --%NS%mat-sys-headline-large-font: Roboto;\n  --%NS%mat-sys-headline-large-line-height: 2.5rem;\n  --%NS%mat-sys-headline-large-size: 2rem;\n  --%NS%mat-sys-headline-large-tracking: 0;\n  --%NS%mat-sys-headline-large-weight: 400;\n  --%NS%mat-sys-headline-medium: 400 1.75rem / 2.25rem Roboto;\n  --%NS%mat-sys-headline-medium-font: Roboto;\n  --%NS%mat-sys-headline-medium-line-height: 2.25rem;\n  --%NS%mat-sys-headline-medium-size: 1.75rem;\n  --%NS%mat-sys-headline-medium-tracking: 0;\n  --%NS%mat-sys-headline-medium-weight: 400;\n  --%NS%mat-sys-headline-small: 400 1.5rem / 2rem Roboto;\n  --%NS%mat-sys-headline-small-font: Roboto;\n  --%NS%mat-sys-headline-small-line-height: 2rem;\n  --%NS%mat-sys-headline-small-size: 1.5rem;\n  --%NS%mat-sys-headline-small-tracking: 0;\n  --%NS%mat-sys-headline-small-weight: 400;\n  --%NS%mat-sys-label-large: 500 0.875rem / 1.25rem Roboto;\n  --%NS%mat-sys-label-large-font: Roboto;\n  --%NS%mat-sys-label-large-line-height: 1.25rem;\n  --%NS%mat-sys-label-large-size: 0.875rem;\n  --%NS%mat-sys-label-large-tracking: 0.006rem;\n  --%NS%mat-sys-label-large-weight: 500;\n  --%NS%mat-sys-label-large-weight-prominent: 700;\n  --%NS%mat-sys-label-medium: 500 0.75rem / 1rem Roboto;\n  --%NS%mat-sys-label-medium-font: Roboto;\n  --%NS%mat-sys-label-medium-line-height: 1rem;\n  --%NS%mat-sys-label-medium-size: 0.75rem;\n  --%NS%mat-sys-label-medium-tracking: 0.031rem;\n  --%NS%mat-sys-label-medium-weight: 500;\n  --%NS%mat-sys-label-medium-weight-prominent: 700;\n  --%NS%mat-sys-label-small: 500 0.688rem / 1rem Roboto;\n  --%NS%mat-sys-label-small-font: Roboto;\n  --%NS%mat-sys-label-small-line-height: 1rem;\n  --%NS%mat-sys-label-small-size: 0.688rem;\n  --%NS%mat-sys-label-small-tracking: 0.031rem;\n  --%NS%mat-sys-label-small-weight: 500;\n  --%NS%mat-sys-title-large: 400 1.375rem / 1.75rem Roboto;\n  --%NS%mat-sys-title-large-font: Roboto;\n  --%NS%mat-sys-title-large-line-height: 1.75rem;\n  --%NS%mat-sys-title-large-size: 1.375rem;\n  --%NS%mat-sys-title-large-tracking: 0;\n  --%NS%mat-sys-title-large-weight: 400;\n  --%NS%mat-sys-title-medium: 500 1rem / 1.5rem Roboto;\n  --%NS%mat-sys-title-medium-font: Roboto;\n  --%NS%mat-sys-title-medium-line-height: 1.5rem;\n  --%NS%mat-sys-title-medium-size: 1rem;\n  --%NS%mat-sys-title-medium-tracking: 0.009rem;\n  --%NS%mat-sys-title-medium-weight: 500;\n  --%NS%mat-sys-title-small: 500 0.875rem / 1.25rem Roboto;\n  --%NS%mat-sys-title-small-font: Roboto;\n  --%NS%mat-sys-title-small-line-height: 1.25rem;\n  --%NS%mat-sys-title-small-size: 0.875rem;\n  --%NS%mat-sys-title-small-tracking: 0.006rem;\n  --%NS%mat-sys-title-small-weight: 500;\n  --%NS%mat-sys-corner-extra-large: 28px;\n  --%NS%mat-sys-corner-extra-large-top: 28px 28px 0 0;\n  --%NS%mat-sys-corner-extra-small: 4px;\n  --%NS%mat-sys-corner-extra-small-top: 4px 4px 0 0;\n  --%NS%mat-sys-corner-full: 9999px;\n  --%NS%mat-sys-corner-large: 16px;\n  --%NS%mat-sys-corner-large-end: 0 16px 16px 0;\n  --%NS%mat-sys-corner-large-start: 16px 0 0 16px;\n  --%NS%mat-sys-corner-large-top: 16px 16px 0 0;\n  --%NS%mat-sys-corner-medium: 12px;\n  --%NS%mat-sys-corner-none: 0;\n  --%NS%mat-sys-corner-small: 8px;\n  --%NS%mat-sys-dragged-state-layer-opacity: 0.16;\n  --%NS%mat-sys-focus-state-layer-opacity: 0.12;\n  --%NS%mat-sys-hover-state-layer-opacity: 0.08;\n  --%NS%mat-sys-pressed-state-layer-opacity: 0.12;\n}\n/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n/*# sourceMappingURL=material.css.map */\n", '/* src/styles-m3-private.css */\n.nav-controller,\n.subtab-controller,\n.modal-controller,\n.curve-controller,\n.milestone-controller {\n  display: none !important;\n  position: absolute;\n  opacity: 0;\n  pointer-events: none;\n}\n.m3-top-app-bar {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  background-color: var(--%NS%md-sys-color-surface-container-low);\n  box-shadow: var(--%NS%md-elevation-1);\n  padding: 0.75rem 1.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1.5rem;\n  border-bottom: 1px solid var(--%NS%md-sys-color-surface-variant);\n}\n.brand-section {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  min-width: 250px;\n}\n.brand-icon {\n  width: 42px;\n  height: 42px;\n  border-radius: var(--%NS%md-shape-m);\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%md-sys-color-primary),\n      #0097a7);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--%NS%md-sys-color-on-primary);\n  box-shadow: var(--%NS%md-elevation-1);\n}\n.brand-text h1 {\n  font-size: 1.15rem;\n  font-weight: 700;\n  color: var(--%NS%md-sys-color-primary);\n  line-height: 1.2;\n}\n.brand-text span {\n  font-size: 0.75rem;\n  color: var(--%NS%md-sys-color-secondary);\n  font-weight: 500;\n}\n.search-container {\n  flex: 1;\n  max-width: 680px;\n  background-color: var(--%NS%md-sys-color-surface-container-high);\n  border-radius: var(--%NS%md-shape-full);\n  display: flex;\n  align-items: center;\n  padding: 0.35rem 1rem;\n  transition: background-color var(--%NS%md-sys-motion-standard), box-shadow var(--%NS%md-sys-motion-standard);\n  border: 1px solid transparent;\n}\n.search-container:focus-within {\n  background-color: var(--%NS%md-sys-color-surface-container-lowest);\n  border-color: var(--%NS%md-sys-color-primary);\n  box-shadow: var(--%NS%md-elevation-2);\n}\n.search-icon {\n  color: var(--%NS%md-sys-color-on-surface-variant);\n  margin-right: 0.75rem;\n  display: flex;\n  align-items: center;\n}\n.search-input {\n  flex: 1;\n  border: none;\n  background: transparent;\n  font-family: var(--%NS%md-ref-typeface-plain);\n  font-size: 0.95rem;\n  color: var(--%NS%md-sys-color-on-surface);\n  outline: none;\n  min-width: 140px;\n}\n.search-input::placeholder {\n  color: var(--%NS%md-sys-color-outline);\n}\n.search-chips-group {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  margin-left: 0.5rem;\n}\n.app-actions {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.clinician-badge {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.3rem 0.8rem 0.3rem 0.4rem;\n  background-color: var(--%NS%md-sys-color-surface-container);\n  border-radius: var(--%NS%md-shape-full);\n  border: 1px solid var(--%NS%md-sys-color-outline-variant);\n}\n.clinician-avatar {\n  width: 34px;\n  height: 34px;\n  border-radius: 50%;\n  background: var(--%NS%md-sys-color-primary-container);\n  color: var(--%NS%md-sys-color-on-primary-container);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 0.85rem;\n}\n.clinician-info {\n  display: flex;\n  flex-direction: column;\n}\n.clinician-name {\n  font-size: 0.8rem;\n  font-weight: 700;\n  line-height: 1.1;\n  color: var(--%NS%md-sys-color-on-surface);\n}\n.clinician-title {\n  font-size: 0.68rem;\n  color: var(--%NS%md-sys-color-secondary);\n}\n.patient-quick-banner {\n  background:\n    linear-gradient(\n      90deg,\n      #e0f2f1 0%,\n      var(--%NS%md-sys-color-surface-container) 100%);\n  border-bottom: 1px solid var(--%NS%md-sys-color-outline-variant);\n  padding: 0.85rem 1.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.patient-identity {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.patient-avatar {\n  width: 48px;\n  height: 48px;\n  border-radius: var(--%NS%md-shape-m);\n  background-color: var(--%NS%md-sys-color-primary);\n  color: var(--%NS%md-sys-color-on-primary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--%NS%md-ref-typeface-brand);\n  font-size: 1.25rem;\n  font-weight: 700;\n  box-shadow: var(--%NS%md-elevation-1);\n}\n.patient-titles h2 {\n  font-size: 1.25rem;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n}\n.patient-meta {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  font-size: 0.82rem;\n  color: var(--%NS%md-sys-color-secondary);\n  margin-top: 0.15rem;\n}\n.patient-metrics-strip {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.metric-pill {\n  background-color: var(--%NS%md-sys-color-surface-container-lowest);\n  border: 1px solid var(--%NS%md-sys-color-outline-variant);\n  border-radius: var(--%NS%md-shape-full);\n  padding: 0.35rem 0.85rem;\n  display: flex;\n  align-items: baseline;\n  gap: 0.4rem;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);\n}\n.metric-pill .label {\n  font-size: 0.72rem;\n  text-transform: uppercase;\n  color: var(--%NS%md-sys-color-secondary);\n  font-weight: 600;\n}\n.metric-pill .val {\n  font-size: 0.92rem;\n  font-weight: 700;\n  color: var(--%NS%md-sys-color-primary);\n}\n.metric-pill .sub {\n  font-size: 0.72rem;\n  color: var(--%NS%md-sys-color-tertiary);\n  font-weight: 500;\n}\n.m3-main-nav {\n  display: flex;\n  background-color: var(--%NS%md-sys-color-surface-container-low);\n  border-bottom: 2px solid var(--%NS%md-sys-color-surface-variant);\n  padding: 0 1.75rem;\n  gap: 0.5rem;\n  overflow-x: auto;\n}\n.m3-tab-item {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.85rem 1.25rem;\n  font-family: var(--%NS%md-ref-typeface-brand);\n  font-size: 0.92rem;\n  font-weight: 500;\n  color: var(--%NS%md-sys-color-on-surface-variant);\n  cursor: pointer;\n  border-bottom: 3px solid transparent;\n  transition: all var(--%NS%md-sys-motion-standard);\n  position: relative;\n  white-space: nowrap;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.m3-tab-item:hover {\n  background-color: rgba(0, 104, 116, 0.06);\n  color: var(--%NS%md-sys-color-primary);\n}\n#nav-patient-record:checked ~ .m3-main-nav label[for=nav-patient-record],\n#nav-patient-list:checked ~ .m3-main-nav label[for=nav-patient-list],\n#nav-growth-curves:checked ~ .m3-main-nav label[for=nav-growth-curves],\n#nav-milestones:checked ~ .m3-main-nav label[for=nav-milestones] {\n  color: var(--%NS%md-sys-color-primary);\n  border-bottom-color: var(--%NS%md-sys-color-primary);\n  font-weight: 700;\n  background-color: rgba(0, 104, 116, 0.08);\n}\n.app-content-container {\n  flex: 1;\n  padding: 1.75rem;\n  max-width: 1440px;\n  width: 100%;\n  margin: 0 auto;\n}\n.app-view {\n  display: block;\n  animation: fadeIn 300ms cubic-bezier(0.2, 0, 0, 1);\n}\n.m3-card {\n  background-color: var(--%NS%md-sys-color-surface-container-lowest);\n  border-radius: var(--%NS%md-shape-l);\n  box-shadow: var(--%NS%md-elevation-1);\n  padding: 1.5rem;\n  position: relative;\n  border: 1px solid var(--%NS%md-sys-color-outline-variant);\n  transition: box-shadow var(--%NS%md-sys-motion-standard), transform var(--%NS%md-sys-motion-standard);\n  margin-bottom: 1.5rem;\n}\n.m3-card.elevated {\n  box-shadow: var(--%NS%md-elevation-2);\n}\n.m3-card.tonal {\n  background-color: var(--%NS%md-sys-color-surface-container);\n  border: none;\n}\n.m3-card-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 1.25rem;\n  padding-bottom: 0.75rem;\n  border-bottom: 1px solid var(--%NS%md-sys-color-surface-variant);\n}\n.m3-card-title {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  font-size: 1.15rem;\n  font-weight: 700;\n  color: var(--%NS%md-sys-color-on-surface);\n}\n.m3-button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  padding: 0.6rem 1.35rem;\n  font-family: var(--%NS%md-ref-typeface-brand);\n  font-size: 0.9rem;\n  font-weight: 500;\n  border-radius: var(--%NS%md-shape-full);\n  cursor: pointer;\n  text-decoration: none;\n  border: none;\n  outline: none;\n  transition: all var(--%NS%md-sys-motion-standard);\n  -webkit-user-select: none;\n  user-select: none;\n}\n.m3-button-filled {\n  background-color: var(--%NS%md-sys-color-primary);\n  color: var(--%NS%md-sys-color-on-primary);\n  box-shadow: var(--%NS%md-elevation-1);\n}\n.m3-button-filled:hover {\n  box-shadow: var(--%NS%md-elevation-2);\n  background-color: #005660;\n}\n.m3-button-tonal {\n  background-color: var(--%NS%md-sys-color-secondary-container);\n  color: var(--%NS%md-sys-color-on-secondary-container);\n}\n.m3-button-tonal:hover {\n  background-color: #b7dbe2;\n}\n.m3-button-outlined {\n  background-color: transparent;\n  color: var(--%NS%md-sys-color-primary);\n  border: 1px solid var(--%NS%md-sys-color-outline);\n}\n.m3-button-outlined:hover {\n  background-color: rgba(0, 104, 116, 0.05);\n  border-color: var(--%NS%md-sys-color-primary);\n}\n.m3-button-text {\n  background: transparent;\n  color: var(--%NS%md-sys-color-primary);\n  padding: 0.4rem 0.8rem;\n}\n.m3-button-text:hover {\n  background: rgba(0, 104, 116, 0.08);\n}\n.m3-fab {\n  position: fixed;\n  bottom: 2rem;\n  right: 2rem;\n  z-index: 90;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  background-color: var(--%NS%md-sys-color-primary-container);\n  color: var(--%NS%md-sys-color-on-primary-container);\n  padding: 1rem 1.5rem;\n  border-radius: var(--%NS%md-shape-l);\n  box-shadow: var(--%NS%md-elevation-3);\n  font-family: var(--%NS%md-ref-typeface-brand);\n  font-size: 0.95rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all var(--%NS%md-sys-motion-emphasized);\n}\n.m3-fab:hover {\n  box-shadow: var(--%NS%md-elevation-4);\n  transform: translateY(-2px);\n  background-color: #8be5f5;\n}\n.m3-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.35rem 0.8rem;\n  border-radius: var(--%NS%md-shape-s);\n  font-size: 0.8rem;\n  font-weight: 500;\n  background-color: var(--%NS%md-sys-color-surface-container-low);\n  border: 1px solid var(--%NS%md-sys-color-outline-variant);\n  color: var(--%NS%md-sys-color-on-surface-variant);\n}\n.m3-chip.filter-active {\n  background-color: var(--%NS%md-sys-color-secondary-container);\n  color: var(--%NS%md-sys-color-on-secondary-container);\n  border-color: transparent;\n}\n.m3-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.2rem 0.6rem;\n  border-radius: var(--%NS%md-shape-full);\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.badge-success {\n  background-color: var(--%NS%md-sys-color-success-container);\n  color: var(--%NS%md-sys-color-on-success-container);\n}\n.badge-warning {\n  background-color: var(--%NS%md-sys-color-warning-container);\n  color: var(--%NS%md-sys-color-on-warning-container);\n}\n.badge-error {\n  background-color: var(--%NS%md-sys-color-error-container);\n  color: var(--%NS%md-sys-color-on-error-container);\n}\n.badge-info {\n  background-color: var(--%NS%md-sys-color-primary-container);\n  color: var(--%NS%md-sys-color-on-primary-container);\n}\n.m3-textfield {\n  position: relative;\n  margin-top: 0.5rem;\n  margin-bottom: 0.75rem;\n  width: 100%;\n}\n.m3-textfield input,\n.m3-textfield select,\n.m3-textfield textarea {\n  width: 100%;\n  padding: 0.95rem 1rem;\n  border: 1px solid var(--%NS%md-sys-color-outline);\n  border-radius: var(--%NS%md-shape-s);\n  background-color: var(--%NS%md-sys-color-surface-container-lowest);\n  font-family: var(--%NS%md-ref-typeface-plain);\n  font-size: 0.95rem;\n  color: var(--%NS%md-sys-color-on-surface);\n  outline: none;\n  transition: border-color var(--%NS%md-sys-motion-standard), box-shadow var(--%NS%md-sys-motion-standard);\n}\n.m3-textfield textarea {\n  min-height: 85px;\n  resize: vertical;\n}\n.m3-textfield label {\n  position: absolute;\n  left: 0.85rem;\n  top: 0.95rem;\n  padding: 0 0.35rem;\n  background-color: var(--%NS%md-sys-color-surface-container-lowest);\n  color: var(--%NS%md-sys-color-on-surface-variant);\n  font-size: 0.92rem;\n  pointer-events: none;\n  transition:\n    transform var(--%NS%md-sys-motion-standard),\n    color var(--%NS%md-sys-motion-standard),\n    font-size var(--%NS%md-sys-motion-standard);\n  transform-origin: left top;\n}\n.m3-textfield input:focus,\n.m3-textfield select:focus,\n.m3-textfield textarea:focus {\n  border-color: var(--%NS%md-sys-color-primary);\n  border-width: 2px;\n  padding: calc(0.95rem - 1px) calc(1rem - 1px);\n}\n.m3-textfield input:focus ~ label,\n.m3-textfield input:not(:placeholder-shown) ~ label,\n.m3-textfield select:focus ~ label,\n.m3-textfield select:valid ~ label,\n.m3-textfield textarea:focus ~ label,\n.m3-textfield textarea:not(:placeholder-shown) ~ label {\n  transform: translateY(-1.55rem) scale(0.8);\n  color: var(--%NS%md-sys-color-primary);\n  font-weight: 500;\n}\n.m3-textfield-helper {\n  font-size: 0.75rem;\n  color: var(--%NS%md-sys-color-outline);\n  margin-top: 0.25rem;\n  margin-left: 0.75rem;\n}\n.m3-checkbox-label {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.6rem;\n  cursor: pointer;\n  font-size: 0.88rem;\n  color: var(--%NS%md-sys-color-on-surface);\n  -webkit-user-select: none;\n  user-select: none;\n}\n.m3-checkbox-label input[type=checkbox] {\n  appearance: none;\n  width: 18px;\n  height: 18px;\n  border: 2px solid var(--%NS%md-sys-color-outline);\n  border-radius: var(--%NS%md-shape-xs);\n  cursor: pointer;\n  display: grid;\n  place-content: center;\n  transition: all var(--%NS%md-sys-motion-standard);\n  background-color: transparent;\n}\n.m3-checkbox-label input[type=checkbox]:checked {\n  background-color: var(--%NS%md-sys-color-primary);\n  border-color: var(--%NS%md-sys-color-primary);\n}\n.m3-checkbox-label input[type=checkbox]:checked::before {\n  content: "";\n  width: 9px;\n  height: 5px;\n  border-left: 2px solid #ffffff;\n  border-bottom: 2px solid #ffffff;\n  transform: rotate(-45deg) translate(1px, -1px);\n}\ndetails.m3-accordion {\n  border: 1px solid var(--%NS%md-sys-color-outline-variant);\n  border-radius: var(--%NS%md-shape-m);\n  margin-bottom: 0.75rem;\n  background-color: var(--%NS%md-sys-color-surface-container-low);\n  overflow: hidden;\n  transition: background-color var(--%NS%md-sys-motion-standard);\n}\ndetails.m3-accordion[open] {\n  background-color: var(--%NS%md-sys-color-surface-container-lowest);\n  border-color: var(--%NS%md-sys-color-primary);\n}\ndetails.m3-accordion summary {\n  padding: 1rem 1.25rem;\n  font-family: var(--%NS%md-ref-typeface-brand);\n  font-weight: 500;\n  font-size: 0.95rem;\n  color: var(--%NS%md-sys-color-on-surface);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  list-style: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\ndetails.m3-accordion summary::-webkit-details-marker {\n  display: none;\n}\ndetails.m3-accordion summary::after {\n  content: "\\25bc";\n  font-size: 0.75rem;\n  color: var(--%NS%md-sys-color-outline);\n  transition: transform var(--%NS%md-sys-motion-standard);\n}\ndetails.m3-accordion[open] summary::after {\n  transform: rotate(180deg);\n  color: var(--%NS%md-sys-color-primary);\n}\ndetails.m3-accordion .accordion-content {\n  padding: 1.25rem;\n  border-top: 1px solid var(--%NS%md-sys-color-surface-variant);\n}\n.subtabs-nav {\n  display: flex;\n  gap: 0.5rem;\n  background-color: var(--%NS%md-sys-color-surface-container);\n  padding: 0.5rem;\n  border-radius: var(--%NS%md-shape-xl);\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n}\n.subtab-label {\n  padding: 0.55rem 1.15rem;\n  border-radius: var(--%NS%md-shape-full);\n  font-family: var(--%NS%md-ref-typeface-brand);\n  font-size: 0.85rem;\n  font-weight: 500;\n  color: var(--%NS%md-sys-color-on-surface-variant);\n  cursor: pointer;\n  transition: all var(--%NS%md-sys-motion-standard);\n  -webkit-user-select: none;\n  user-select: none;\n}\n.subtab-label:hover {\n  background-color: rgba(0, 104, 116, 0.08);\n  color: var(--%NS%md-sys-color-primary);\n}\n#subtab-general:checked ~ .subtabs-nav label[for=subtab-general],\n#subtab-perinatal:checked ~ .subtabs-nav label[for=subtab-perinatal],\n#subtab-personal:checked ~ .subtabs-nav label[for=subtab-personal],\n#subtab-nutrition:checked ~ .subtabs-nav label[for=subtab-nutrition],\n#subtab-history:checked ~ .subtabs-nav label[for=subtab-history] {\n  background-color: var(--%NS%md-sys-color-surface-container-lowest);\n  color: var(--%NS%md-sys-color-primary);\n  font-weight: 700;\n  box-shadow: var(--%NS%md-elevation-1);\n}\n.subtab-content-panel {\n  display: none;\n  animation: fadeIn 250ms ease-out;\n}\n#subtab-general:checked ~ .subtab-content-container #content-general,\n#subtab-perinatal:checked ~ .subtab-content-container #content-perinatal,\n#subtab-personal:checked ~ .subtab-content-container #content-personal,\n#subtab-nutrition:checked ~ .subtab-content-container #content-nutrition,\n#subtab-history:checked ~ .subtab-content-container #content-history {\n  display: block;\n}\n.clinical-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.25rem;\n}\n.clinical-fieldset {\n  border: 1px solid var(--%NS%md-sys-color-outline-variant);\n  border-radius: var(--%NS%md-shape-m);\n  padding: 1.25rem;\n  background-color: var(--%NS%md-sys-color-surface-container-lowest);\n  margin-bottom: 1.25rem;\n}\n.clinical-fieldset legend {\n  padding: 0 0.5rem;\n  font-family: var(--%NS%md-ref-typeface-brand);\n  font-weight: 700;\n  color: var(--%NS%md-sys-color-primary);\n  font-size: 0.95rem;\n}\n.info-row {\n  display: flex;\n  margin-bottom: 0.75rem;\n  font-size: 0.88rem;\n  border-bottom: 1px dashed var(--%NS%md-sys-color-surface-variant);\n  padding-bottom: 0.4rem;\n}\n.info-label {\n  font-weight: 600;\n  color: var(--%NS%md-sys-color-secondary);\n  width: 40%;\n  min-width: 120px;\n}\n.info-val {\n  color: var(--%NS%md-sys-color-on-surface);\n  flex: 1;\n}\n.m3-table-wrapper {\n  overflow-x: auto;\n  border-radius: var(--%NS%md-shape-m);\n  border: 1px solid var(--%NS%md-sys-color-outline-variant);\n  margin: 1rem 0;\n}\n.m3-table {\n  width: 100%;\n  border-collapse: collapse;\n  text-align: left;\n  font-size: 0.88rem;\n}\n.m3-table th {\n  background-color: var(--%NS%md-sys-color-surface-container-high);\n  color: var(--%NS%md-sys-color-on-surface);\n  font-family: var(--%NS%md-ref-typeface-brand);\n  font-weight: 700;\n  padding: 0.75rem 1rem;\n  border-bottom: 2px solid var(--%NS%md-sys-color-outline-variant);\n}\n.m3-table td {\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid var(--%NS%md-sys-color-surface-variant);\n  color: var(--%NS%md-sys-color-on-surface);\n}\n.m3-table tbody tr:hover {\n  background-color: var(--%NS%md-sys-color-surface-container-low);\n}\n.patient-directory-controls {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n}\n.patient-cards-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 1.25rem;\n}\n.patient-card {\n  border-radius: var(--%NS%md-shape-l);\n  border: 1px solid var(--%NS%md-sys-color-outline-variant);\n  padding: 1.25rem;\n  background-color: var(--%NS%md-sys-color-surface-container-lowest);\n  box-shadow: var(--%NS%md-elevation-1);\n  transition: all var(--%NS%md-sys-motion-standard);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.patient-card:hover {\n  box-shadow: var(--%NS%md-elevation-2);\n  border-color: var(--%NS%md-sys-color-primary);\n  transform: translateY(-2px);\n}\n.patient-card-header {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  margin-bottom: 0.75rem;\n}\n.patient-card-avatar {\n  width: 42px;\n  height: 42px;\n  border-radius: var(--%NS%md-shape-m);\n  background-color: var(--%NS%md-sys-color-secondary-container);\n  color: var(--%NS%md-sys-color-on-secondary-container);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n}\n.patient-card-name {\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--%NS%md-sys-color-on-surface);\n}\n.patient-card-age {\n  font-size: 0.78rem;\n  color: var(--%NS%md-sys-color-secondary);\n}\n.curve-switcher-bar {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 1.25rem;\n  flex-wrap: wrap;\n}\n.curve-switch-label {\n  padding: 0.5rem 1.25rem;\n  border-radius: var(--%NS%md-shape-full);\n  font-family: var(--%NS%md-ref-typeface-brand);\n  font-size: 0.85rem;\n  font-weight: 500;\n  background-color: var(--%NS%md-sys-color-surface-container-high);\n  color: var(--%NS%md-sys-color-on-surface-variant);\n  cursor: pointer;\n  transition: all var(--%NS%md-sys-motion-standard);\n}\n#curve-weight:checked ~ .curve-switcher-bar label[for=curve-weight],\n#curve-height:checked ~ .curve-switcher-bar label[for=curve-height],\n#curve-head:checked ~ .curve-switcher-bar label[for=curve-head] {\n  background-color: var(--%NS%md-sys-color-primary);\n  color: var(--%NS%md-sys-color-on-primary);\n  font-weight: 700;\n}\n.curve-graph-panel {\n  display: none;\n}\n#curve-weight:checked ~ .curve-charts-container #chart-weight,\n#curve-height:checked ~ .curve-charts-container #chart-height,\n#curve-head:checked ~ .curve-charts-container #chart-head {\n  display: block;\n}\n.growth-svg-container {\n  width: 100%;\n  background-color: var(--%NS%md-sys-color-surface-container-lowest);\n  border-radius: var(--%NS%md-shape-m);\n  padding: 1rem;\n  border: 1px solid var(--%NS%md-sys-color-outline-variant);\n}\n.svg-grid-line {\n  stroke: #e0e6e6;\n  stroke-width: 1;\n  stroke-dasharray: 4 2;\n}\n.svg-axis-line {\n  stroke: var(--%NS%md-sys-color-outline);\n  stroke-width: 2;\n}\n.svg-axis-text {\n  font-family: var(--%NS%md-ref-typeface-plain);\n  font-size: 11px;\n  fill: var(--%NS%md-sys-color-secondary);\n}\n.percentile-area-outer {\n  fill: rgba(0, 104, 116, 0.06);\n}\n.percentile-area-inner {\n  fill: rgba(0, 104, 116, 0.12);\n}\n.percentile-line {\n  fill: none;\n  stroke-width: 1.5;\n}\n.percentile-line.p97,\n.percentile-line.p3 {\n  stroke: #90a4ae;\n  stroke-dasharray: 4 2;\n}\n.percentile-line.p85,\n.percentile-line.p15 {\n  stroke: #78909c;\n}\n.percentile-line.p50 {\n  stroke: var(--%NS%md-sys-color-primary);\n  stroke-width: 2.5;\n}\n.patient-curve-line {\n  fill: none;\n  stroke: #ba1a1a;\n  stroke-width: 3;\n}\n.data-point {\n  cursor: pointer;\n}\n.data-point circle {\n  fill: #ba1a1a;\n  stroke: #ffffff;\n  stroke-width: 2.5;\n  transition: transform 150ms ease, r 150ms ease;\n  transform-origin: center;\n}\n.data-point:hover circle {\n  r: 7;\n  fill: #006874;\n}\n.data-point .svg-tooltip {\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 150ms ease;\n}\n.data-point:hover .svg-tooltip {\n  opacity: 1;\n}\n.milestone-age-bar {\n  display: flex;\n  gap: 0.5rem;\n  background-color: var(--%NS%md-sys-color-surface-container);\n  padding: 0.5rem;\n  border-radius: var(--%NS%md-shape-xl);\n  margin-bottom: 1.5rem;\n  overflow-x: auto;\n}\n.milestone-age-label {\n  padding: 0.6rem 1.25rem;\n  border-radius: var(--%NS%md-shape-full);\n  font-family: var(--%NS%md-ref-typeface-brand);\n  font-size: 0.88rem;\n  font-weight: 500;\n  color: var(--%NS%md-sys-color-on-surface-variant);\n  cursor: pointer;\n  white-space: nowrap;\n  transition: all var(--%NS%md-sys-motion-standard);\n}\n.milestone-age-label:hover {\n  background-color: rgba(0, 104, 116, 0.08);\n  color: var(--%NS%md-sys-color-primary);\n}\n#age-0-3:checked ~ .milestone-age-bar label[for=age-0-3],\n#age-4-6:checked ~ .milestone-age-bar label[for=age-4-6],\n#age-7-9:checked ~ .milestone-age-bar label[for=age-7-9],\n#age-10-12:checked ~ .milestone-age-bar label[for=age-10-12],\n#age-12-24:checked ~ .milestone-age-bar label[for=age-12-24] {\n  background-color: var(--%NS%md-sys-color-primary);\n  color: var(--%NS%md-sys-color-on-primary);\n  font-weight: 700;\n  box-shadow: var(--%NS%md-elevation-1);\n}\n.milestone-stage-panel {\n  display: none;\n  animation: fadeIn 250ms ease;\n}\n#age-0-3:checked ~ .milestone-content-container #stage-0-3,\n#age-4-6:checked ~ .milestone-content-container #stage-4-6,\n#age-7-9:checked ~ .milestone-content-container #stage-7-9,\n#age-10-12:checked ~ .milestone-content-container #stage-10-12,\n#age-12-24:checked ~ .milestone-content-container #stage-12-24 {\n  display: block;\n}\n.milestone-card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1.25rem;\n}\n.milestone-card {\n  background-color: var(--%NS%md-sys-color-surface-container-lowest);\n  border-radius: var(--%NS%md-shape-l);\n  border: 1px solid var(--%NS%md-sys-color-outline-variant);\n  padding: 1.25rem;\n  box-shadow: var(--%NS%md-elevation-1);\n}\n.milestone-card.alarm-card {\n  border-left: 5px solid var(--%NS%md-sys-color-error);\n  background:\n    linear-gradient(\n      135deg,\n      #fffafa 0%,\n      var(--%NS%md-sys-color-surface-container-lowest) 100%);\n}\n.milestone-card.nutrition-card {\n  border-left: 5px solid #2e7d32;\n}\n.milestone-list {\n  list-style: none;\n  margin-top: 0.75rem;\n}\n.milestone-list li {\n  position: relative;\n  padding-left: 1.5rem;\n  margin-bottom: 0.5rem;\n  font-size: 0.88rem;\n  color: var(--%NS%md-sys-color-on-surface);\n}\n.milestone-list li::before {\n  content: "\\2714";\n  position: absolute;\n  left: 0;\n  color: var(--%NS%md-sys-color-primary);\n  font-weight: 700;\n  font-size: 0.85rem;\n}\n.alarm-card .milestone-list li::before {\n  content: "\\26a0";\n  color: var(--%NS%md-sys-color-error);\n}\n.m3-modal-backdrop {\n  position: fixed;\n  inset: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 31, 36, 0.5);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  z-index: 1000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1.5rem;\n  box-sizing: border-box;\n}\n.m3-modal-dialog {\n  background-color: var(--%NS%md-sys-color-surface-container-lowest);\n  border-radius: var(--%NS%md-shape-xl);\n  max-width: 860px;\n  width: 100%;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  box-shadow: var(--%NS%md-elevation-4);\n  transform: scale(0.95);\n  transition: transform var(--%NS%md-sys-motion-standard);\n  overflow: hidden;\n}\n.m3-modal-header {\n  padding: 1.25rem 1.75rem;\n  border-bottom: 1px solid var(--%NS%md-sys-color-surface-variant);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background-color: var(--%NS%md-sys-color-surface-container-low);\n}\n.m3-modal-header h3 {\n  font-size: 1.25rem;\n  color: var(--%NS%md-sys-color-on-surface);\n}\n.modal-close-btn {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  color: var(--%NS%md-sys-color-on-surface-variant);\n  font-size: 1.25rem;\n  font-weight: 700;\n  transition: background-color var(--%NS%md-sys-motion-standard);\n}\n.modal-close-btn:hover {\n  background-color: var(--%NS%md-sys-color-surface-variant);\n  color: var(--%NS%md-sys-color-error);\n}\n.m3-modal-body {\n  padding: 1.5rem 1.75rem;\n  overflow-y: auto;\n  flex: 1;\n}\n.m3-modal-footer {\n  padding: 1rem 1.75rem;\n  border-top: 1px solid var(--%NS%md-sys-color-surface-variant);\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  background-color: var(--%NS%md-sys-color-surface-container-low);\n}\n@media (max-width: 960px) {\n  .m3-top-app-bar {\n    flex-wrap: wrap;\n    padding: 0.75rem 1rem;\n  }\n  .search-container {\n    order: 3;\n    max-width: 100%;\n    width: 100%;\n  }\n  .patient-quick-banner {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .patient-metrics-strip {\n    width: 100%;\n    justify-content: flex-start;\n  }\n}\n@media (max-width: 640px) {\n  .app-content-container {\n    padding: 1rem 0.75rem;\n  }\n  .m3-main-nav {\n    padding: 0 0.5rem;\n  }\n  .clinical-grid {\n    grid-template-columns: 1fr;\n  }\n  .m3-modal-dialog {\n    max-height: 96vh;\n    border-radius: var(--%NS%md-shape-l);\n  }\n}\n.m3-snackbar {\n  position: fixed;\n  bottom: 2rem;\n  left: 50%;\n  transform: translateX(-50%) translateY(100px);\n  background-color: var(--%NS%md-sys-color-on-surface);\n  color: var(--%NS%md-sys-color-surface);\n  padding: 0.85rem 1.5rem;\n  border-radius: var(--%NS%md-shape-full);\n  box-shadow: var(--%NS%md-elevation-3);\n  font-size: 0.9rem;\n  font-family: var(--%NS%md-ref-typeface-brand);\n  font-weight: 500;\n  z-index: 300;\n  opacity: 0;\n  pointer-events: none;\n  transition: transform 300ms cubic-bezier(0.2, 0, 0, 1), opacity 300ms ease;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.m3-snackbar.show {\n  transform: translateX(-50%) translateY(0);\n  opacity: 1;\n  pointer-events: auto;\n}\n/*# sourceMappingURL=styles-m3-private.css.map */\n'], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadataAsync(PrivateShellComponent, () => [
    /* @ts-ignore */
    import("./chunk-BXSF64LS.js").then((m) => m.AiAssistantWidgetComponent)
  ], (AiAssistantWidgetComponent) => {
    setClassMetadata(PrivateShellComponent, [{
      type: Component,
      args: [{ selector: "app-private-shell", imports: [RouterOutlet, HeaderComponent, SidebarComponent, EncounterDetailDialogComponent, UserProfileDialogComponent, LoginPageComponent, AiAssistantWidgetComponent], encapsulation: ViewEncapsulation.None, template: `@if (!authService.isAuthInitialized()) {
  <div class="app-splash-screen" role="status" aria-live="polite">
    <div class="splash-content">
      <div class="splash-logo">
        <img class="doctorchart-logo" src="/doctorchart-logo.svg" width="64" height="64" alt="DoctorChart" />
      </div>
      <h2 class="splash-title">DoctorChart</h2>
      <div class="splash-spinner"></div>
      <p class="splash-text">Verificando sesi\xF3n segura...</p>
    </div>
  </div>
} @else if (!authService.isLoggedIn()) {
  <app-login-page />
} @else if (authService.isSuperAdmin()) {
  <div class="app-layout-shell">
    <app-sidebar />
    <div class="app-main-viewport">
      <app-header />
      <main class="app-main-content">
        <router-outlet />
      </main>
    </div>
  </div>
} @else if (doctorProfileService.error() || (!workspaceStore.loaded() && workspaceStore.error()) || (!workspaceStore.preferences() && workspaceStore.preferencesError())) {
  <div class="app-splash-screen" role="alert">
    <div class="splash-content">
      <h2 class="splash-title">No pudimos cargar tu cuenta</h2>
      <p class="splash-text">Reintent\xE1 para continuar.</p>
      <button type="button" (click)="retrySetup()">Reintentar</button>
      <button type="button" (click)="authService.signOut()">Cerrar sesi\xF3n</button>
    </div>
  </div>
} @else if (!doctorProfileService.loaded() || doctorProfileService.loading()) {
  <div class="app-splash-screen" role="status" aria-live="polite">
    <div class="splash-content">
      <div class="splash-logo">
        <img class="doctorchart-logo" src="/doctorchart-logo.svg" width="64" height="64" alt="DoctorChart" />
      </div>
      <h2 class="splash-title">DoctorChart</h2>
      <div class="splash-spinner"></div>
      <p class="splash-text">Verificando perfil m\xE9dico...</p>
    </div>
  </div>
} @else if (workspaceStore.isLoading() && (!workspaceStore.loaded() || (workspaceStore.isOnboardingCompleted() && !workspaceStore.preferences()))) {
  <div class="app-splash-screen" role="status" aria-live="polite">
    <div class="splash-content">
      <div class="splash-logo">
        <img class="doctorchart-logo" src="/doctorchart-logo.svg" width="64" height="64" alt="DoctorChart" />
      </div>
      <h2 class="splash-title">DoctorChart</h2>
      <div class="splash-spinner"></div>
      <p class="splash-text">Cargando configuraci\xF3n cl\xEDnica...</p>
    </div>
  </div>
} @else if (!workspaceStore.isOnboardingCompleted()) {
  <router-outlet />
} @else {
  <div class="app-layout-shell">
    <app-sidebar />
    <div class="app-main-viewport">
      <app-header />
      <main class="app-main-content">
        <router-outlet />
      </main>
    </div>
  </div>

  <app-encounter-detail-dialog />
  <app-user-profile-dialog />
  @if (featureFlags.AI_ASSISTANT_ENABLED && workspaceStore.isModuleActive('AI_ASSISTANT')) {
    @defer (on idle) {
      <app-ai-assistant-widget />
    }
  }
}
`, styles: ["/* src/app/app.css */\n.app-layout-shell {\n  display: flex;\n  flex: 1;\n  min-height: 100vh;\n  width: 100%;\n  background-color: var(--dc-surface-low, #f8fafc);\n  align-items: stretch;\n}\n.app-main-viewport {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  min-height: 100vh;\n  overflow-x: hidden;\n}\n.app-main-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  padding: 1.5rem;\n  width: 100%;\n  max-width: 1600px;\n  margin: 0 auto;\n  box-sizing: border-box;\n}\n@media (max-width: 768px) {\n  .app-main-content {\n    padding: 1rem 0.75rem;\n  }\n}\n.app-splash-screen {\n  min-height: 100vh;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      var(--dc-surface-low, #f0f7f8) 0%,\n      var(--dc-surface-low, #eaf4f5) 100%);\n}\n.splash-content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n}\n.splash-logo {\n  width: 64px;\n  height: 64px;\n  border-radius: 18px;\n  background: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.splash-title {\n  font-size: 1.6rem;\n  font-weight: 800;\n  color: var(--md-sys-color-on-surface, #191c1d);\n  margin: 0;\n  letter-spacing: -0.02em;\n}\n.splash-spinner {\n  width: 24px;\n  height: 24px;\n  border: 3px solid rgba(0, 104, 116, 0.2);\n  border-top-color: var(--md-sys-color-primary, #006874);\n  border-radius: 50%;\n  animation: spin 0.7s linear infinite;\n}\n.splash-text {\n  font-size: 0.88rem;\n  color: var(--md-sys-color-secondary, #4a6267);\n  margin: 0;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media print {\n  .app-layout-shell,\n  .app-splash-screen {\n    display: none !important;\n  }\n}\n/*# sourceMappingURL=app.css.map */\n", "/* src/app/layout/private-shell/material.css */\nhtml {\n  --mat-sys-background: #faf9fd;\n  --mat-sys-error: #ba1a1a;\n  --mat-sys-error-container: #ffdad6;\n  --mat-sys-inverse-on-surface: #f2f0f4;\n  --mat-sys-inverse-primary: #abc7ff;\n  --mat-sys-inverse-surface: #2f3033;\n  --mat-sys-on-background: #1a1b1f;\n  --mat-sys-on-error: #ffffff;\n  --mat-sys-on-error-container: #93000a;\n  --mat-sys-on-primary: #ffffff;\n  --mat-sys-on-primary-container: #00458f;\n  --mat-sys-on-primary-fixed: #001b3f;\n  --mat-sys-on-primary-fixed-variant: #00458f;\n  --mat-sys-on-secondary: #ffffff;\n  --mat-sys-on-secondary-container: #3e4759;\n  --mat-sys-on-secondary-fixed: #131c2b;\n  --mat-sys-on-secondary-fixed-variant: #3e4759;\n  --mat-sys-on-surface: #1a1b1f;\n  --mat-sys-on-surface-variant: #44474e;\n  --mat-sys-on-tertiary: #ffffff;\n  --mat-sys-on-tertiary-container: #0000ef;\n  --mat-sys-on-tertiary-fixed: #00006e;\n  --mat-sys-on-tertiary-fixed-variant: #0000ef;\n  --mat-sys-outline: #74777f;\n  --mat-sys-outline-variant: #c4c6d0;\n  --mat-sys-primary: #005cbb;\n  --mat-sys-primary-container: #d7e3ff;\n  --mat-sys-primary-fixed: #d7e3ff;\n  --mat-sys-primary-fixed-dim: #abc7ff;\n  --mat-sys-scrim: #000000;\n  --mat-sys-secondary: #565e71;\n  --mat-sys-secondary-container: #dae2f9;\n  --mat-sys-secondary-fixed: #dae2f9;\n  --mat-sys-secondary-fixed-dim: #bec6dc;\n  --mat-sys-shadow: #000000;\n  --mat-sys-surface: #faf9fd;\n  --mat-sys-surface-bright: #faf9fd;\n  --mat-sys-surface-container: #efedf0;\n  --mat-sys-surface-container-high: #e9e7eb;\n  --mat-sys-surface-container-highest: #e3e2e6;\n  --mat-sys-surface-container-low: #f4f3f6;\n  --mat-sys-surface-container-lowest: #ffffff;\n  --mat-sys-surface-dim: #dbd9dd;\n  --mat-sys-surface-tint: #005cbb;\n  --mat-sys-surface-variant: #e0e2ec;\n  --mat-sys-tertiary: #343dff;\n  --mat-sys-tertiary-container: #e0e0ff;\n  --mat-sys-tertiary-fixed: #e0e0ff;\n  --mat-sys-tertiary-fixed-dim: #bec2ff;\n  --mat-sys-neutral-variant20: #2d3038;\n  --mat-sys-neutral10: #1a1b1f;\n  --mat-sys-level0:\n    0px 0px 0px 0px rgba(0, 0, 0, 0.2),\n    0px 0px 0px 0px rgba(0, 0, 0, 0.14),\n    0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n  --mat-sys-level1:\n    0px 2px 1px -1px rgba(0, 0, 0, 0.2),\n    0px 1px 1px 0px rgba(0, 0, 0, 0.14),\n    0px 1px 3px 0px rgba(0, 0, 0, 0.12);\n  --mat-sys-level2:\n    0px 3px 3px -2px rgba(0, 0, 0, 0.2),\n    0px 3px 4px 0px rgba(0, 0, 0, 0.14),\n    0px 1px 8px 0px rgba(0, 0, 0, 0.12);\n  --mat-sys-level3:\n    0px 3px 5px -1px rgba(0, 0, 0, 0.2),\n    0px 6px 10px 0px rgba(0, 0, 0, 0.14),\n    0px 1px 18px 0px rgba(0, 0, 0, 0.12);\n  --mat-sys-level4:\n    0px 5px 5px -3px rgba(0, 0, 0, 0.2),\n    0px 8px 10px 1px rgba(0, 0, 0, 0.14),\n    0px 3px 14px 2px rgba(0, 0, 0, 0.12);\n  --mat-sys-level5:\n    0px 7px 8px -4px rgba(0, 0, 0, 0.2),\n    0px 12px 17px 2px rgba(0, 0, 0, 0.14),\n    0px 5px 22px 4px rgba(0, 0, 0, 0.12);\n  --mat-sys-body-large: 400 1rem / 1.5rem Roboto;\n  --mat-sys-body-large-font: Roboto;\n  --mat-sys-body-large-line-height: 1.5rem;\n  --mat-sys-body-large-size: 1rem;\n  --mat-sys-body-large-tracking: 0.031rem;\n  --mat-sys-body-large-weight: 400;\n  --mat-sys-body-medium: 400 0.875rem / 1.25rem Roboto;\n  --mat-sys-body-medium-font: Roboto;\n  --mat-sys-body-medium-line-height: 1.25rem;\n  --mat-sys-body-medium-size: 0.875rem;\n  --mat-sys-body-medium-tracking: 0.016rem;\n  --mat-sys-body-medium-weight: 400;\n  --mat-sys-body-small: 400 0.75rem / 1rem Roboto;\n  --mat-sys-body-small-font: Roboto;\n  --mat-sys-body-small-line-height: 1rem;\n  --mat-sys-body-small-size: 0.75rem;\n  --mat-sys-body-small-tracking: 0.025rem;\n  --mat-sys-body-small-weight: 400;\n  --mat-sys-display-large: 400 3.562rem / 4rem Roboto;\n  --mat-sys-display-large-font: Roboto;\n  --mat-sys-display-large-line-height: 4rem;\n  --mat-sys-display-large-size: 3.562rem;\n  --mat-sys-display-large-tracking: -0.016rem;\n  --mat-sys-display-large-weight: 400;\n  --mat-sys-display-medium: 400 2.812rem / 3.25rem Roboto;\n  --mat-sys-display-medium-font: Roboto;\n  --mat-sys-display-medium-line-height: 3.25rem;\n  --mat-sys-display-medium-size: 2.812rem;\n  --mat-sys-display-medium-tracking: 0;\n  --mat-sys-display-medium-weight: 400;\n  --mat-sys-display-small: 400 2.25rem / 2.75rem Roboto;\n  --mat-sys-display-small-font: Roboto;\n  --mat-sys-display-small-line-height: 2.75rem;\n  --mat-sys-display-small-size: 2.25rem;\n  --mat-sys-display-small-tracking: 0;\n  --mat-sys-display-small-weight: 400;\n  --mat-sys-headline-large: 400 2rem / 2.5rem Roboto;\n  --mat-sys-headline-large-font: Roboto;\n  --mat-sys-headline-large-line-height: 2.5rem;\n  --mat-sys-headline-large-size: 2rem;\n  --mat-sys-headline-large-tracking: 0;\n  --mat-sys-headline-large-weight: 400;\n  --mat-sys-headline-medium: 400 1.75rem / 2.25rem Roboto;\n  --mat-sys-headline-medium-font: Roboto;\n  --mat-sys-headline-medium-line-height: 2.25rem;\n  --mat-sys-headline-medium-size: 1.75rem;\n  --mat-sys-headline-medium-tracking: 0;\n  --mat-sys-headline-medium-weight: 400;\n  --mat-sys-headline-small: 400 1.5rem / 2rem Roboto;\n  --mat-sys-headline-small-font: Roboto;\n  --mat-sys-headline-small-line-height: 2rem;\n  --mat-sys-headline-small-size: 1.5rem;\n  --mat-sys-headline-small-tracking: 0;\n  --mat-sys-headline-small-weight: 400;\n  --mat-sys-label-large: 500 0.875rem / 1.25rem Roboto;\n  --mat-sys-label-large-font: Roboto;\n  --mat-sys-label-large-line-height: 1.25rem;\n  --mat-sys-label-large-size: 0.875rem;\n  --mat-sys-label-large-tracking: 0.006rem;\n  --mat-sys-label-large-weight: 500;\n  --mat-sys-label-large-weight-prominent: 700;\n  --mat-sys-label-medium: 500 0.75rem / 1rem Roboto;\n  --mat-sys-label-medium-font: Roboto;\n  --mat-sys-label-medium-line-height: 1rem;\n  --mat-sys-label-medium-size: 0.75rem;\n  --mat-sys-label-medium-tracking: 0.031rem;\n  --mat-sys-label-medium-weight: 500;\n  --mat-sys-label-medium-weight-prominent: 700;\n  --mat-sys-label-small: 500 0.688rem / 1rem Roboto;\n  --mat-sys-label-small-font: Roboto;\n  --mat-sys-label-small-line-height: 1rem;\n  --mat-sys-label-small-size: 0.688rem;\n  --mat-sys-label-small-tracking: 0.031rem;\n  --mat-sys-label-small-weight: 500;\n  --mat-sys-title-large: 400 1.375rem / 1.75rem Roboto;\n  --mat-sys-title-large-font: Roboto;\n  --mat-sys-title-large-line-height: 1.75rem;\n  --mat-sys-title-large-size: 1.375rem;\n  --mat-sys-title-large-tracking: 0;\n  --mat-sys-title-large-weight: 400;\n  --mat-sys-title-medium: 500 1rem / 1.5rem Roboto;\n  --mat-sys-title-medium-font: Roboto;\n  --mat-sys-title-medium-line-height: 1.5rem;\n  --mat-sys-title-medium-size: 1rem;\n  --mat-sys-title-medium-tracking: 0.009rem;\n  --mat-sys-title-medium-weight: 500;\n  --mat-sys-title-small: 500 0.875rem / 1.25rem Roboto;\n  --mat-sys-title-small-font: Roboto;\n  --mat-sys-title-small-line-height: 1.25rem;\n  --mat-sys-title-small-size: 0.875rem;\n  --mat-sys-title-small-tracking: 0.006rem;\n  --mat-sys-title-small-weight: 500;\n  --mat-sys-corner-extra-large: 28px;\n  --mat-sys-corner-extra-large-top: 28px 28px 0 0;\n  --mat-sys-corner-extra-small: 4px;\n  --mat-sys-corner-extra-small-top: 4px 4px 0 0;\n  --mat-sys-corner-full: 9999px;\n  --mat-sys-corner-large: 16px;\n  --mat-sys-corner-large-end: 0 16px 16px 0;\n  --mat-sys-corner-large-start: 16px 0 0 16px;\n  --mat-sys-corner-large-top: 16px 16px 0 0;\n  --mat-sys-corner-medium: 12px;\n  --mat-sys-corner-none: 0;\n  --mat-sys-corner-small: 8px;\n  --mat-sys-dragged-state-layer-opacity: 0.16;\n  --mat-sys-focus-state-layer-opacity: 0.12;\n  --mat-sys-hover-state-layer-opacity: 0.08;\n  --mat-sys-pressed-state-layer-opacity: 0.12;\n}\n/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n/*# sourceMappingURL=material.css.map */\n", '/* src/styles-m3-private.css */\n.nav-controller,\n.subtab-controller,\n.modal-controller,\n.curve-controller,\n.milestone-controller {\n  display: none !important;\n  position: absolute;\n  opacity: 0;\n  pointer-events: none;\n}\n.m3-top-app-bar {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  background-color: var(--md-sys-color-surface-container-low);\n  box-shadow: var(--md-elevation-1);\n  padding: 0.75rem 1.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1.5rem;\n  border-bottom: 1px solid var(--md-sys-color-surface-variant);\n}\n.brand-section {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  min-width: 250px;\n}\n.brand-icon {\n  width: 42px;\n  height: 42px;\n  border-radius: var(--md-shape-m);\n  background:\n    linear-gradient(\n      135deg,\n      var(--md-sys-color-primary),\n      #0097a7);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--md-sys-color-on-primary);\n  box-shadow: var(--md-elevation-1);\n}\n.brand-text h1 {\n  font-size: 1.15rem;\n  font-weight: 700;\n  color: var(--md-sys-color-primary);\n  line-height: 1.2;\n}\n.brand-text span {\n  font-size: 0.75rem;\n  color: var(--md-sys-color-secondary);\n  font-weight: 500;\n}\n.search-container {\n  flex: 1;\n  max-width: 680px;\n  background-color: var(--md-sys-color-surface-container-high);\n  border-radius: var(--md-shape-full);\n  display: flex;\n  align-items: center;\n  padding: 0.35rem 1rem;\n  transition: background-color var(--md-sys-motion-standard), box-shadow var(--md-sys-motion-standard);\n  border: 1px solid transparent;\n}\n.search-container:focus-within {\n  background-color: var(--md-sys-color-surface-container-lowest);\n  border-color: var(--md-sys-color-primary);\n  box-shadow: var(--md-elevation-2);\n}\n.search-icon {\n  color: var(--md-sys-color-on-surface-variant);\n  margin-right: 0.75rem;\n  display: flex;\n  align-items: center;\n}\n.search-input {\n  flex: 1;\n  border: none;\n  background: transparent;\n  font-family: var(--md-ref-typeface-plain);\n  font-size: 0.95rem;\n  color: var(--md-sys-color-on-surface);\n  outline: none;\n  min-width: 140px;\n}\n.search-input::placeholder {\n  color: var(--md-sys-color-outline);\n}\n.search-chips-group {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  margin-left: 0.5rem;\n}\n.app-actions {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.clinician-badge {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.3rem 0.8rem 0.3rem 0.4rem;\n  background-color: var(--md-sys-color-surface-container);\n  border-radius: var(--md-shape-full);\n  border: 1px solid var(--md-sys-color-outline-variant);\n}\n.clinician-avatar {\n  width: 34px;\n  height: 34px;\n  border-radius: 50%;\n  background: var(--md-sys-color-primary-container);\n  color: var(--md-sys-color-on-primary-container);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 0.85rem;\n}\n.clinician-info {\n  display: flex;\n  flex-direction: column;\n}\n.clinician-name {\n  font-size: 0.8rem;\n  font-weight: 700;\n  line-height: 1.1;\n  color: var(--md-sys-color-on-surface);\n}\n.clinician-title {\n  font-size: 0.68rem;\n  color: var(--md-sys-color-secondary);\n}\n.patient-quick-banner {\n  background:\n    linear-gradient(\n      90deg,\n      #e0f2f1 0%,\n      var(--md-sys-color-surface-container) 100%);\n  border-bottom: 1px solid var(--md-sys-color-outline-variant);\n  padding: 0.85rem 1.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.patient-identity {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.patient-avatar {\n  width: 48px;\n  height: 48px;\n  border-radius: var(--md-shape-m);\n  background-color: var(--md-sys-color-primary);\n  color: var(--md-sys-color-on-primary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: var(--md-ref-typeface-brand);\n  font-size: 1.25rem;\n  font-weight: 700;\n  box-shadow: var(--md-elevation-1);\n}\n.patient-titles h2 {\n  font-size: 1.25rem;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n}\n.patient-meta {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  font-size: 0.82rem;\n  color: var(--md-sys-color-secondary);\n  margin-top: 0.15rem;\n}\n.patient-metrics-strip {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.metric-pill {\n  background-color: var(--md-sys-color-surface-container-lowest);\n  border: 1px solid var(--md-sys-color-outline-variant);\n  border-radius: var(--md-shape-full);\n  padding: 0.35rem 0.85rem;\n  display: flex;\n  align-items: baseline;\n  gap: 0.4rem;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);\n}\n.metric-pill .label {\n  font-size: 0.72rem;\n  text-transform: uppercase;\n  color: var(--md-sys-color-secondary);\n  font-weight: 600;\n}\n.metric-pill .val {\n  font-size: 0.92rem;\n  font-weight: 700;\n  color: var(--md-sys-color-primary);\n}\n.metric-pill .sub {\n  font-size: 0.72rem;\n  color: var(--md-sys-color-tertiary);\n  font-weight: 500;\n}\n.m3-main-nav {\n  display: flex;\n  background-color: var(--md-sys-color-surface-container-low);\n  border-bottom: 2px solid var(--md-sys-color-surface-variant);\n  padding: 0 1.75rem;\n  gap: 0.5rem;\n  overflow-x: auto;\n}\n.m3-tab-item {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.85rem 1.25rem;\n  font-family: var(--md-ref-typeface-brand);\n  font-size: 0.92rem;\n  font-weight: 500;\n  color: var(--md-sys-color-on-surface-variant);\n  cursor: pointer;\n  border-bottom: 3px solid transparent;\n  transition: all var(--md-sys-motion-standard);\n  position: relative;\n  white-space: nowrap;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.m3-tab-item:hover {\n  background-color: rgba(0, 104, 116, 0.06);\n  color: var(--md-sys-color-primary);\n}\n#nav-patient-record:checked ~ .m3-main-nav label[for=nav-patient-record],\n#nav-patient-list:checked ~ .m3-main-nav label[for=nav-patient-list],\n#nav-growth-curves:checked ~ .m3-main-nav label[for=nav-growth-curves],\n#nav-milestones:checked ~ .m3-main-nav label[for=nav-milestones] {\n  color: var(--md-sys-color-primary);\n  border-bottom-color: var(--md-sys-color-primary);\n  font-weight: 700;\n  background-color: rgba(0, 104, 116, 0.08);\n}\n.app-content-container {\n  flex: 1;\n  padding: 1.75rem;\n  max-width: 1440px;\n  width: 100%;\n  margin: 0 auto;\n}\n.app-view {\n  display: block;\n  animation: fadeIn 300ms cubic-bezier(0.2, 0, 0, 1);\n}\n.m3-card {\n  background-color: var(--md-sys-color-surface-container-lowest);\n  border-radius: var(--md-shape-l);\n  box-shadow: var(--md-elevation-1);\n  padding: 1.5rem;\n  position: relative;\n  border: 1px solid var(--md-sys-color-outline-variant);\n  transition: box-shadow var(--md-sys-motion-standard), transform var(--md-sys-motion-standard);\n  margin-bottom: 1.5rem;\n}\n.m3-card.elevated {\n  box-shadow: var(--md-elevation-2);\n}\n.m3-card.tonal {\n  background-color: var(--md-sys-color-surface-container);\n  border: none;\n}\n.m3-card-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 1.25rem;\n  padding-bottom: 0.75rem;\n  border-bottom: 1px solid var(--md-sys-color-surface-variant);\n}\n.m3-card-title {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  font-size: 1.15rem;\n  font-weight: 700;\n  color: var(--md-sys-color-on-surface);\n}\n.m3-button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  padding: 0.6rem 1.35rem;\n  font-family: var(--md-ref-typeface-brand);\n  font-size: 0.9rem;\n  font-weight: 500;\n  border-radius: var(--md-shape-full);\n  cursor: pointer;\n  text-decoration: none;\n  border: none;\n  outline: none;\n  transition: all var(--md-sys-motion-standard);\n  -webkit-user-select: none;\n  user-select: none;\n}\n.m3-button-filled {\n  background-color: var(--md-sys-color-primary);\n  color: var(--md-sys-color-on-primary);\n  box-shadow: var(--md-elevation-1);\n}\n.m3-button-filled:hover {\n  box-shadow: var(--md-elevation-2);\n  background-color: #005660;\n}\n.m3-button-tonal {\n  background-color: var(--md-sys-color-secondary-container);\n  color: var(--md-sys-color-on-secondary-container);\n}\n.m3-button-tonal:hover {\n  background-color: #b7dbe2;\n}\n.m3-button-outlined {\n  background-color: transparent;\n  color: var(--md-sys-color-primary);\n  border: 1px solid var(--md-sys-color-outline);\n}\n.m3-button-outlined:hover {\n  background-color: rgba(0, 104, 116, 0.05);\n  border-color: var(--md-sys-color-primary);\n}\n.m3-button-text {\n  background: transparent;\n  color: var(--md-sys-color-primary);\n  padding: 0.4rem 0.8rem;\n}\n.m3-button-text:hover {\n  background: rgba(0, 104, 116, 0.08);\n}\n.m3-fab {\n  position: fixed;\n  bottom: 2rem;\n  right: 2rem;\n  z-index: 90;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  background-color: var(--md-sys-color-primary-container);\n  color: var(--md-sys-color-on-primary-container);\n  padding: 1rem 1.5rem;\n  border-radius: var(--md-shape-l);\n  box-shadow: var(--md-elevation-3);\n  font-family: var(--md-ref-typeface-brand);\n  font-size: 0.95rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all var(--md-sys-motion-emphasized);\n}\n.m3-fab:hover {\n  box-shadow: var(--md-elevation-4);\n  transform: translateY(-2px);\n  background-color: #8be5f5;\n}\n.m3-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.35rem 0.8rem;\n  border-radius: var(--md-shape-s);\n  font-size: 0.8rem;\n  font-weight: 500;\n  background-color: var(--md-sys-color-surface-container-low);\n  border: 1px solid var(--md-sys-color-outline-variant);\n  color: var(--md-sys-color-on-surface-variant);\n}\n.m3-chip.filter-active {\n  background-color: var(--md-sys-color-secondary-container);\n  color: var(--md-sys-color-on-secondary-container);\n  border-color: transparent;\n}\n.m3-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.2rem 0.6rem;\n  border-radius: var(--md-shape-full);\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.badge-success {\n  background-color: var(--md-sys-color-success-container);\n  color: var(--md-sys-color-on-success-container);\n}\n.badge-warning {\n  background-color: var(--md-sys-color-warning-container);\n  color: var(--md-sys-color-on-warning-container);\n}\n.badge-error {\n  background-color: var(--md-sys-color-error-container);\n  color: var(--md-sys-color-on-error-container);\n}\n.badge-info {\n  background-color: var(--md-sys-color-primary-container);\n  color: var(--md-sys-color-on-primary-container);\n}\n.m3-textfield {\n  position: relative;\n  margin-top: 0.5rem;\n  margin-bottom: 0.75rem;\n  width: 100%;\n}\n.m3-textfield input,\n.m3-textfield select,\n.m3-textfield textarea {\n  width: 100%;\n  padding: 0.95rem 1rem;\n  border: 1px solid var(--md-sys-color-outline);\n  border-radius: var(--md-shape-s);\n  background-color: var(--md-sys-color-surface-container-lowest);\n  font-family: var(--md-ref-typeface-plain);\n  font-size: 0.95rem;\n  color: var(--md-sys-color-on-surface);\n  outline: none;\n  transition: border-color var(--md-sys-motion-standard), box-shadow var(--md-sys-motion-standard);\n}\n.m3-textfield textarea {\n  min-height: 85px;\n  resize: vertical;\n}\n.m3-textfield label {\n  position: absolute;\n  left: 0.85rem;\n  top: 0.95rem;\n  padding: 0 0.35rem;\n  background-color: var(--md-sys-color-surface-container-lowest);\n  color: var(--md-sys-color-on-surface-variant);\n  font-size: 0.92rem;\n  pointer-events: none;\n  transition:\n    transform var(--md-sys-motion-standard),\n    color var(--md-sys-motion-standard),\n    font-size var(--md-sys-motion-standard);\n  transform-origin: left top;\n}\n.m3-textfield input:focus,\n.m3-textfield select:focus,\n.m3-textfield textarea:focus {\n  border-color: var(--md-sys-color-primary);\n  border-width: 2px;\n  padding: calc(0.95rem - 1px) calc(1rem - 1px);\n}\n.m3-textfield input:focus ~ label,\n.m3-textfield input:not(:placeholder-shown) ~ label,\n.m3-textfield select:focus ~ label,\n.m3-textfield select:valid ~ label,\n.m3-textfield textarea:focus ~ label,\n.m3-textfield textarea:not(:placeholder-shown) ~ label {\n  transform: translateY(-1.55rem) scale(0.8);\n  color: var(--md-sys-color-primary);\n  font-weight: 500;\n}\n.m3-textfield-helper {\n  font-size: 0.75rem;\n  color: var(--md-sys-color-outline);\n  margin-top: 0.25rem;\n  margin-left: 0.75rem;\n}\n.m3-checkbox-label {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.6rem;\n  cursor: pointer;\n  font-size: 0.88rem;\n  color: var(--md-sys-color-on-surface);\n  -webkit-user-select: none;\n  user-select: none;\n}\n.m3-checkbox-label input[type=checkbox] {\n  appearance: none;\n  width: 18px;\n  height: 18px;\n  border: 2px solid var(--md-sys-color-outline);\n  border-radius: var(--md-shape-xs);\n  cursor: pointer;\n  display: grid;\n  place-content: center;\n  transition: all var(--md-sys-motion-standard);\n  background-color: transparent;\n}\n.m3-checkbox-label input[type=checkbox]:checked {\n  background-color: var(--md-sys-color-primary);\n  border-color: var(--md-sys-color-primary);\n}\n.m3-checkbox-label input[type=checkbox]:checked::before {\n  content: "";\n  width: 9px;\n  height: 5px;\n  border-left: 2px solid #ffffff;\n  border-bottom: 2px solid #ffffff;\n  transform: rotate(-45deg) translate(1px, -1px);\n}\ndetails.m3-accordion {\n  border: 1px solid var(--md-sys-color-outline-variant);\n  border-radius: var(--md-shape-m);\n  margin-bottom: 0.75rem;\n  background-color: var(--md-sys-color-surface-container-low);\n  overflow: hidden;\n  transition: background-color var(--md-sys-motion-standard);\n}\ndetails.m3-accordion[open] {\n  background-color: var(--md-sys-color-surface-container-lowest);\n  border-color: var(--md-sys-color-primary);\n}\ndetails.m3-accordion summary {\n  padding: 1rem 1.25rem;\n  font-family: var(--md-ref-typeface-brand);\n  font-weight: 500;\n  font-size: 0.95rem;\n  color: var(--md-sys-color-on-surface);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  list-style: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\ndetails.m3-accordion summary::-webkit-details-marker {\n  display: none;\n}\ndetails.m3-accordion summary::after {\n  content: "\\25bc";\n  font-size: 0.75rem;\n  color: var(--md-sys-color-outline);\n  transition: transform var(--md-sys-motion-standard);\n}\ndetails.m3-accordion[open] summary::after {\n  transform: rotate(180deg);\n  color: var(--md-sys-color-primary);\n}\ndetails.m3-accordion .accordion-content {\n  padding: 1.25rem;\n  border-top: 1px solid var(--md-sys-color-surface-variant);\n}\n.subtabs-nav {\n  display: flex;\n  gap: 0.5rem;\n  background-color: var(--md-sys-color-surface-container);\n  padding: 0.5rem;\n  border-radius: var(--md-shape-xl);\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n}\n.subtab-label {\n  padding: 0.55rem 1.15rem;\n  border-radius: var(--md-shape-full);\n  font-family: var(--md-ref-typeface-brand);\n  font-size: 0.85rem;\n  font-weight: 500;\n  color: var(--md-sys-color-on-surface-variant);\n  cursor: pointer;\n  transition: all var(--md-sys-motion-standard);\n  -webkit-user-select: none;\n  user-select: none;\n}\n.subtab-label:hover {\n  background-color: rgba(0, 104, 116, 0.08);\n  color: var(--md-sys-color-primary);\n}\n#subtab-general:checked ~ .subtabs-nav label[for=subtab-general],\n#subtab-perinatal:checked ~ .subtabs-nav label[for=subtab-perinatal],\n#subtab-personal:checked ~ .subtabs-nav label[for=subtab-personal],\n#subtab-nutrition:checked ~ .subtabs-nav label[for=subtab-nutrition],\n#subtab-history:checked ~ .subtabs-nav label[for=subtab-history] {\n  background-color: var(--md-sys-color-surface-container-lowest);\n  color: var(--md-sys-color-primary);\n  font-weight: 700;\n  box-shadow: var(--md-elevation-1);\n}\n.subtab-content-panel {\n  display: none;\n  animation: fadeIn 250ms ease-out;\n}\n#subtab-general:checked ~ .subtab-content-container #content-general,\n#subtab-perinatal:checked ~ .subtab-content-container #content-perinatal,\n#subtab-personal:checked ~ .subtab-content-container #content-personal,\n#subtab-nutrition:checked ~ .subtab-content-container #content-nutrition,\n#subtab-history:checked ~ .subtab-content-container #content-history {\n  display: block;\n}\n.clinical-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.25rem;\n}\n.clinical-fieldset {\n  border: 1px solid var(--md-sys-color-outline-variant);\n  border-radius: var(--md-shape-m);\n  padding: 1.25rem;\n  background-color: var(--md-sys-color-surface-container-lowest);\n  margin-bottom: 1.25rem;\n}\n.clinical-fieldset legend {\n  padding: 0 0.5rem;\n  font-family: var(--md-ref-typeface-brand);\n  font-weight: 700;\n  color: var(--md-sys-color-primary);\n  font-size: 0.95rem;\n}\n.info-row {\n  display: flex;\n  margin-bottom: 0.75rem;\n  font-size: 0.88rem;\n  border-bottom: 1px dashed var(--md-sys-color-surface-variant);\n  padding-bottom: 0.4rem;\n}\n.info-label {\n  font-weight: 600;\n  color: var(--md-sys-color-secondary);\n  width: 40%;\n  min-width: 120px;\n}\n.info-val {\n  color: var(--md-sys-color-on-surface);\n  flex: 1;\n}\n.m3-table-wrapper {\n  overflow-x: auto;\n  border-radius: var(--md-shape-m);\n  border: 1px solid var(--md-sys-color-outline-variant);\n  margin: 1rem 0;\n}\n.m3-table {\n  width: 100%;\n  border-collapse: collapse;\n  text-align: left;\n  font-size: 0.88rem;\n}\n.m3-table th {\n  background-color: var(--md-sys-color-surface-container-high);\n  color: var(--md-sys-color-on-surface);\n  font-family: var(--md-ref-typeface-brand);\n  font-weight: 700;\n  padding: 0.75rem 1rem;\n  border-bottom: 2px solid var(--md-sys-color-outline-variant);\n}\n.m3-table td {\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid var(--md-sys-color-surface-variant);\n  color: var(--md-sys-color-on-surface);\n}\n.m3-table tbody tr:hover {\n  background-color: var(--md-sys-color-surface-container-low);\n}\n.patient-directory-controls {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n  flex-wrap: wrap;\n}\n.patient-cards-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 1.25rem;\n}\n.patient-card {\n  border-radius: var(--md-shape-l);\n  border: 1px solid var(--md-sys-color-outline-variant);\n  padding: 1.25rem;\n  background-color: var(--md-sys-color-surface-container-lowest);\n  box-shadow: var(--md-elevation-1);\n  transition: all var(--md-sys-motion-standard);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.patient-card:hover {\n  box-shadow: var(--md-elevation-2);\n  border-color: var(--md-sys-color-primary);\n  transform: translateY(-2px);\n}\n.patient-card-header {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  margin-bottom: 0.75rem;\n}\n.patient-card-avatar {\n  width: 42px;\n  height: 42px;\n  border-radius: var(--md-shape-m);\n  background-color: var(--md-sys-color-secondary-container);\n  color: var(--md-sys-color-on-secondary-container);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n}\n.patient-card-name {\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--md-sys-color-on-surface);\n}\n.patient-card-age {\n  font-size: 0.78rem;\n  color: var(--md-sys-color-secondary);\n}\n.curve-switcher-bar {\n  display: flex;\n  gap: 0.5rem;\n  margin-bottom: 1.25rem;\n  flex-wrap: wrap;\n}\n.curve-switch-label {\n  padding: 0.5rem 1.25rem;\n  border-radius: var(--md-shape-full);\n  font-family: var(--md-ref-typeface-brand);\n  font-size: 0.85rem;\n  font-weight: 500;\n  background-color: var(--md-sys-color-surface-container-high);\n  color: var(--md-sys-color-on-surface-variant);\n  cursor: pointer;\n  transition: all var(--md-sys-motion-standard);\n}\n#curve-weight:checked ~ .curve-switcher-bar label[for=curve-weight],\n#curve-height:checked ~ .curve-switcher-bar label[for=curve-height],\n#curve-head:checked ~ .curve-switcher-bar label[for=curve-head] {\n  background-color: var(--md-sys-color-primary);\n  color: var(--md-sys-color-on-primary);\n  font-weight: 700;\n}\n.curve-graph-panel {\n  display: none;\n}\n#curve-weight:checked ~ .curve-charts-container #chart-weight,\n#curve-height:checked ~ .curve-charts-container #chart-height,\n#curve-head:checked ~ .curve-charts-container #chart-head {\n  display: block;\n}\n.growth-svg-container {\n  width: 100%;\n  background-color: var(--md-sys-color-surface-container-lowest);\n  border-radius: var(--md-shape-m);\n  padding: 1rem;\n  border: 1px solid var(--md-sys-color-outline-variant);\n}\n.svg-grid-line {\n  stroke: #e0e6e6;\n  stroke-width: 1;\n  stroke-dasharray: 4 2;\n}\n.svg-axis-line {\n  stroke: var(--md-sys-color-outline);\n  stroke-width: 2;\n}\n.svg-axis-text {\n  font-family: var(--md-ref-typeface-plain);\n  font-size: 11px;\n  fill: var(--md-sys-color-secondary);\n}\n.percentile-area-outer {\n  fill: rgba(0, 104, 116, 0.06);\n}\n.percentile-area-inner {\n  fill: rgba(0, 104, 116, 0.12);\n}\n.percentile-line {\n  fill: none;\n  stroke-width: 1.5;\n}\n.percentile-line.p97,\n.percentile-line.p3 {\n  stroke: #90a4ae;\n  stroke-dasharray: 4 2;\n}\n.percentile-line.p85,\n.percentile-line.p15 {\n  stroke: #78909c;\n}\n.percentile-line.p50 {\n  stroke: var(--md-sys-color-primary);\n  stroke-width: 2.5;\n}\n.patient-curve-line {\n  fill: none;\n  stroke: #ba1a1a;\n  stroke-width: 3;\n}\n.data-point {\n  cursor: pointer;\n}\n.data-point circle {\n  fill: #ba1a1a;\n  stroke: #ffffff;\n  stroke-width: 2.5;\n  transition: transform 150ms ease, r 150ms ease;\n  transform-origin: center;\n}\n.data-point:hover circle {\n  r: 7;\n  fill: #006874;\n}\n.data-point .svg-tooltip {\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 150ms ease;\n}\n.data-point:hover .svg-tooltip {\n  opacity: 1;\n}\n.milestone-age-bar {\n  display: flex;\n  gap: 0.5rem;\n  background-color: var(--md-sys-color-surface-container);\n  padding: 0.5rem;\n  border-radius: var(--md-shape-xl);\n  margin-bottom: 1.5rem;\n  overflow-x: auto;\n}\n.milestone-age-label {\n  padding: 0.6rem 1.25rem;\n  border-radius: var(--md-shape-full);\n  font-family: var(--md-ref-typeface-brand);\n  font-size: 0.88rem;\n  font-weight: 500;\n  color: var(--md-sys-color-on-surface-variant);\n  cursor: pointer;\n  white-space: nowrap;\n  transition: all var(--md-sys-motion-standard);\n}\n.milestone-age-label:hover {\n  background-color: rgba(0, 104, 116, 0.08);\n  color: var(--md-sys-color-primary);\n}\n#age-0-3:checked ~ .milestone-age-bar label[for=age-0-3],\n#age-4-6:checked ~ .milestone-age-bar label[for=age-4-6],\n#age-7-9:checked ~ .milestone-age-bar label[for=age-7-9],\n#age-10-12:checked ~ .milestone-age-bar label[for=age-10-12],\n#age-12-24:checked ~ .milestone-age-bar label[for=age-12-24] {\n  background-color: var(--md-sys-color-primary);\n  color: var(--md-sys-color-on-primary);\n  font-weight: 700;\n  box-shadow: var(--md-elevation-1);\n}\n.milestone-stage-panel {\n  display: none;\n  animation: fadeIn 250ms ease;\n}\n#age-0-3:checked ~ .milestone-content-container #stage-0-3,\n#age-4-6:checked ~ .milestone-content-container #stage-4-6,\n#age-7-9:checked ~ .milestone-content-container #stage-7-9,\n#age-10-12:checked ~ .milestone-content-container #stage-10-12,\n#age-12-24:checked ~ .milestone-content-container #stage-12-24 {\n  display: block;\n}\n.milestone-card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1.25rem;\n}\n.milestone-card {\n  background-color: var(--md-sys-color-surface-container-lowest);\n  border-radius: var(--md-shape-l);\n  border: 1px solid var(--md-sys-color-outline-variant);\n  padding: 1.25rem;\n  box-shadow: var(--md-elevation-1);\n}\n.milestone-card.alarm-card {\n  border-left: 5px solid var(--md-sys-color-error);\n  background:\n    linear-gradient(\n      135deg,\n      #fffafa 0%,\n      var(--md-sys-color-surface-container-lowest) 100%);\n}\n.milestone-card.nutrition-card {\n  border-left: 5px solid #2e7d32;\n}\n.milestone-list {\n  list-style: none;\n  margin-top: 0.75rem;\n}\n.milestone-list li {\n  position: relative;\n  padding-left: 1.5rem;\n  margin-bottom: 0.5rem;\n  font-size: 0.88rem;\n  color: var(--md-sys-color-on-surface);\n}\n.milestone-list li::before {\n  content: "\\2714";\n  position: absolute;\n  left: 0;\n  color: var(--md-sys-color-primary);\n  font-weight: 700;\n  font-size: 0.85rem;\n}\n.alarm-card .milestone-list li::before {\n  content: "\\26a0";\n  color: var(--md-sys-color-error);\n}\n.m3-modal-backdrop {\n  position: fixed;\n  inset: 0;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 31, 36, 0.5);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  z-index: 1000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1.5rem;\n  box-sizing: border-box;\n}\n.m3-modal-dialog {\n  background-color: var(--md-sys-color-surface-container-lowest);\n  border-radius: var(--md-shape-xl);\n  max-width: 860px;\n  width: 100%;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  box-shadow: var(--md-elevation-4);\n  transform: scale(0.95);\n  transition: transform var(--md-sys-motion-standard);\n  overflow: hidden;\n}\n.m3-modal-header {\n  padding: 1.25rem 1.75rem;\n  border-bottom: 1px solid var(--md-sys-color-surface-variant);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background-color: var(--md-sys-color-surface-container-low);\n}\n.m3-modal-header h3 {\n  font-size: 1.25rem;\n  color: var(--md-sys-color-on-surface);\n}\n.modal-close-btn {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  color: var(--md-sys-color-on-surface-variant);\n  font-size: 1.25rem;\n  font-weight: 700;\n  transition: background-color var(--md-sys-motion-standard);\n}\n.modal-close-btn:hover {\n  background-color: var(--md-sys-color-surface-variant);\n  color: var(--md-sys-color-error);\n}\n.m3-modal-body {\n  padding: 1.5rem 1.75rem;\n  overflow-y: auto;\n  flex: 1;\n}\n.m3-modal-footer {\n  padding: 1rem 1.75rem;\n  border-top: 1px solid var(--md-sys-color-surface-variant);\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  background-color: var(--md-sys-color-surface-container-low);\n}\n@media (max-width: 960px) {\n  .m3-top-app-bar {\n    flex-wrap: wrap;\n    padding: 0.75rem 1rem;\n  }\n  .search-container {\n    order: 3;\n    max-width: 100%;\n    width: 100%;\n  }\n  .patient-quick-banner {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .patient-metrics-strip {\n    width: 100%;\n    justify-content: flex-start;\n  }\n}\n@media (max-width: 640px) {\n  .app-content-container {\n    padding: 1rem 0.75rem;\n  }\n  .m3-main-nav {\n    padding: 0 0.5rem;\n  }\n  .clinical-grid {\n    grid-template-columns: 1fr;\n  }\n  .m3-modal-dialog {\n    max-height: 96vh;\n    border-radius: var(--md-shape-l);\n  }\n}\n.m3-snackbar {\n  position: fixed;\n  bottom: 2rem;\n  left: 50%;\n  transform: translateX(-50%) translateY(100px);\n  background-color: var(--md-sys-color-on-surface);\n  color: var(--md-sys-color-surface);\n  padding: 0.85rem 1.5rem;\n  border-radius: var(--md-shape-full);\n  box-shadow: var(--md-elevation-3);\n  font-size: 0.9rem;\n  font-family: var(--md-ref-typeface-brand);\n  font-weight: 500;\n  z-index: 300;\n  opacity: 0;\n  pointer-events: none;\n  transition: transform 300ms cubic-bezier(0.2, 0, 0, 1), opacity 300ms ease;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.m3-snackbar.show {\n  transform: translateX(-50%) translateY(0);\n  opacity: 1;\n  pointer-events: auto;\n}\n/*# sourceMappingURL=styles-m3-private.css.map */\n'] }]
    }], null, null);
  });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PrivateShellComponent, { className: "PrivateShellComponent", filePath: "src/app/layout/private-shell/private-shell.component.ts", lineNumber: 14 });
})();
export {
  PrivateShellComponent
};
//# debugId=85ba5309-dd3a-5e1b-9a08-8083826fb2bd
//# sourceMappingURL=chunk-4DVKC25R.js.map
