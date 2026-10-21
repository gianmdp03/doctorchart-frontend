import {
  PatientRecordActionsService,
  doctorPrintIdentity
} from "./chunk-JNSPAAVP.js";
import {
  DynamicFormRendererComponent,
  conflictKind,
  errorMessage,
  inputValues,
  retainCompatibleValues,
  userDateTime
} from "./chunk-UP7TIIOF.js";
import {
  wizardRecordEntries
} from "./chunk-X5CFNW5T.js";
import {
  ClinicalEncounterService
} from "./chunk-AZ6E4AKD.js";
import {
  DatePickerComponent
} from "./chunk-6MFCUZUR.js";
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  CdkScrollable
} from "./chunk-WMGV2OO2.js";
import {
  ActivePatientService,
  PatientService,
  UserClockService
} from "./chunk-C5KB4SWE.js";
import {
  takeUntilDestroyed
} from "./chunk-Y3XT3YWV.js";
import {
  formatInstant,
  instantParts,
  shiftCalendarDate,
  todayDate,
  userTimeZone
} from "./chunk-YTAXUAO7.js";
import {
  WorkspaceStore
} from "./chunk-WPGAV52V.js";
import "./chunk-USM5S45Q.js";
import {
  parseNumberInput,
  textError,
  validIsoDate
} from "./chunk-D4J4ETKO.js";
import "./chunk-QAJPJLTD.js";
import "./chunk-THOV7R4G.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-BQIFWLNB.js";
import {
  AuthService
} from "./chunk-5XEBCQUW.js";
import {
  environment
} from "./chunk-WKCAPCQH.js";
import {
  NgIcon,
  lucideActivity,
  lucideAlertCircle,
  lucideAlertTriangle,
  lucideCalendar,
  lucideCheckCircle2,
  lucideChevronDown,
  lucideChevronLeft,
  lucideChevronUp,
  lucideClock,
  lucideCreditCard,
  lucideDownload,
  lucideExternalLink,
  lucideEye,
  lucideFile,
  lucideFileText,
  lucideFolderOpen,
  lucideImage,
  lucidePill,
  lucidePlus,
  lucidePrinter,
  lucideShieldAlert,
  lucideStethoscope,
  lucideTrash2,
  lucideUpload,
  lucideUser,
  lucideUsers,
  provideIcons
} from "./chunk-Z3UJ4PSI.js";
import "./chunk-WBCHXDEU.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-XM57RTTR.js";
import "./chunk-YAYJVLGH.js";
import {
  CommonModule,
  DecimalPipe,
  HttpClient,
  HttpParams,
  isPlatformBrowser
} from "./chunk-SYX7XZ26.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Directive,
  EventEmitter,
  HostListener,
  Injectable,
  Input,
  Output,
  PLATFORM_ID,
  Subject,
  ViewChild,
  ViewContainerRef,
  __spreadProps,
  __spreadValues,
  computed,
  effect,
  firstValueFrom,
  inject,
  input,
  inputBinding,
  interval,
  of,
  output,
  outputBinding,
  setClassMetadata,
  signal,
  switchMap,
  takeUntil,
  untracked,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate1,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵviewQuerySignal
} from "./chunk-3HO5VEWU.js";

// src/app/features/patient-record/patient-banner/patient-banner.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function PatientBannerComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275element(1, "ng-icon", 18);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Particular");
    \u0275\u0275elementEnd()();
  }
}
function PatientBannerComponent_Conditional_15_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 22);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Afiliado: ", ctx_r0.coverageInfo().affiliate);
  }
}
function PatientBannerComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275element(1, "ng-icon", 19);
    \u0275\u0275elementStart(2, "strong", 20);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, PatientBannerComponent_Conditional_15_Conditional_4_Template, 4, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.coverageInfo().label);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.coverageInfo().affiliate ? 4 : -1);
  }
}
function PatientBannerComponent_Conditional_33_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 13);
    \u0275\u0275text(1, "\u2022");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 12)(3, "strong");
    \u0275\u0275text(4, "Grupo:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const bg_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", bg_r2);
  }
}
function PatientBannerComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, PatientBannerComponent_Conditional_33_Conditional_0_Template, 6, 1);
  }
  if (rf & 2) {
    \u0275\u0275conditional(ctx !== "Sin registrar" ? 0 : -1);
  }
}
function PatientBannerComponent_Conditional_35_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275element(1, "span", 24)(2, "ng-icon", 25);
    \u0275\u0275elementStart(3, "span", 26)(4, "strong");
    \u0275\u0275text(5, "ALERGIA:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const allergy_r3 = ctx.$implicit;
    \u0275\u0275property("title", "Alergia severa reportada: " + allergy_r3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", allergy_r3);
  }
}
function PatientBannerComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275repeaterCreate(1, PatientBannerComponent_Conditional_35_For_2_Template, 7, 2, "div", 23, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.allergyList());
  }
}
function PatientBannerComponent_Conditional_36_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275element(1, "ng-icon", 28);
    \u0275\u0275elementStart(2, "span", 26)(3, "strong");
    \u0275\u0275text(4, "ANTECEDENTE:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const cond_r4 = ctx.$implicit;
    \u0275\u0275property("title", "Condici\xF3n m\xE9dica de base: " + cond_r4);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", cond_r4);
  }
}
function PatientBannerComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275repeaterCreate(1, PatientBannerComponent_Conditional_36_For_2_Template, 6, 2, "div", 27, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.chronicConditionList());
  }
}
function PatientBannerComponent_For_39_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function PatientBannerComponent_For_39_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const action_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.runAction(action_r6.id));
    });
    \u0275\u0275element(1, "ng-icon", 31);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const presentation_r7 = ctx;
    \u0275\u0275classMap(presentation_r7.css);
    \u0275\u0275attribute("title", presentation_r7.title ?? null);
    \u0275\u0275advance();
    \u0275\u0275property("name", presentation_r7.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(presentation_r7.label);
  }
}
function PatientBannerComponent_For_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, PatientBannerComponent_For_39_Conditional_0_Template, 4, 5, "button", 29);
  }
  if (rf & 2) {
    let tmp_10_0;
    const action_r6 = ctx.$implicit;
    \u0275\u0275conditional((tmp_10_0 = action_r6.primary) ? 0 : -1, tmp_10_0);
  }
}
var PatientBannerComponent = class _PatientBannerComponent {
  clock = inject(UserClockService);
  router = inject(Router);
  activePatientService = inject(ActivePatientService);
  recordActions = inject(PatientRecordActionsService);
  patientInput = signal(
    null,
    ...ngDevMode ? [{ debugName: "patientInput" }] : (
      /* istanbul ignore next */
      []
    )
  );
  set patient(value) {
    this.patientInput.set(value);
  }
  get patient() {
    return this.patientInput();
  }
  newEncounter = new EventEmitter();
  editPatient = new EventEmitter();
  printSummary = new EventEmitter();
  viewCurves = new EventEmitter();
  initials = computed(
    () => {
      const p = this.patient || this.activePatientService.activePatient();
      if (!p?.fullName)
        return "DP";
      const parts = p.fullName.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return p.fullName.slice(0, 2).toUpperCase();
    },
    ...ngDevMode ? [{ debugName: "initials" }] : (
      /* istanbul ignore next */
      []
    )
  );
  nationalId = computed(
    () => {
      const p = this.patient || this.activePatientService.activePatient();
      return p?.nationalId || p?.guardianInfo?.firstGuardianNationalId || "\u2014";
    },
    ...ngDevMode ? [{ debugName: "nationalId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isChild = computed(
    () => {
      const p = this.patient || this.activePatientService.activePatient();
      if (!p?.birthDate)
        return false;
      const birth = /* @__PURE__ */ new Date(p.birthDate + "T00:00:00");
      const today = /* @__PURE__ */ new Date(this.clock.day() + "T00:00:00");
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || m === 0 && today.getDate() < birth.getDate()) {
        age--;
      }
      return age < 18;
    },
    ...ngDevMode ? [{ debugName: "isChild" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dynamicAge = computed(
    () => {
      const p = this.patient || this.activePatientService.activePatient();
      if (!p?.birthDate)
        return "Edad desconocida";
      const birth = /* @__PURE__ */ new Date(p.birthDate + "T00:00:00");
      const today = /* @__PURE__ */ new Date(this.clock.day() + "T00:00:00");
      let years = today.getFullYear() - birth.getFullYear();
      let months = today.getMonth() - birth.getMonth();
      let days = today.getDate() - birth.getDate();
      if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }
      if (years === 0) {
        if (months === 0) {
          return `${days} ${days === 1 ? "d\xEDa" : "d\xEDas"}`;
        }
        return `${months} ${months === 1 ? "mes" : "meses"}${days > 0 ? ` y ${days} d` : ""}`;
      }
      if (years < 5) {
        return `${years}a ${months}m`;
      }
      return `${years} a\xF1os`;
    },
    ...ngDevMode ? [{ debugName: "dynamicAge" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sexLabel = computed(
    () => {
      const p = this.patient || this.activePatientService.activePatient();
      const g = p?.gender;
      if (g === "MALE" || g === "M")
        return "Masculino";
      if (g === "FEMALE" || g === "F")
        return "Femenino";
      return g || "No especificado";
    },
    ...ngDevMode ? [{ debugName: "sexLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  coverageInfo = computed(
    () => {
      const p = this.patient || this.activePatientService.activePatient();
      const ins = p?.insuranceInfo;
      const provider = ins?.providerName || "";
      const plan = ins?.planName || "";
      const label = [provider, plan].filter(Boolean).join(" ").trim();
      if (!label || label.toLowerCase() === "particular") {
        return { isParticular: true, label: "Particular", affiliate: null };
      }
      return {
        isParticular: false,
        label,
        affiliate: ins?.affiliateNumber || null
      };
    },
    ...ngDevMode ? [{ debugName: "coverageInfo" }] : (
      /* istanbul ignore next */
      []
    )
  );
  allergyList = computed(
    () => {
      const p = this.patient || this.activePatientService.activePatient();
      const allergies = [];
      if (p?.allergies && p.allergies.length > 0) {
        allergies.push(...p.allergies);
      }
      if (p?.personalHistory?.allergies && p.personalHistory.allergies.length > 0) {
        allergies.push(...p.personalHistory.allergies);
      }
      return [...new Set(allergies.filter(Boolean))];
    },
    ...ngDevMode ? [{ debugName: "allergyList" }] : (
      /* istanbul ignore next */
      []
    )
  );
  chronicConditionList = computed(
    () => {
      const p = this.patient || this.activePatientService.activePatient();
      const list = [];
      if (p?.chronicConditions && p.chronicConditions.length > 0) {
        list.push(...p.chronicConditions);
      }
      if (p?.personalHistory?.chronicOrPreviousDiseases && p.personalHistory.chronicOrPreviousDiseases.length > 0) {
        list.push(...p.personalHistory.chronicOrPreviousDiseases);
      }
      return [...new Set(list.filter(Boolean))];
    },
    ...ngDevMode ? [{ debugName: "chronicConditionList" }] : (
      /* istanbul ignore next */
      []
    )
  );
  availableActions = computed(
    () => this.recordActions.actions().filter((action) => action.id !== "VIEW_GROWTH" || this.isChild()),
    ...ngDevMode ? [{ debugName: "availableActions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  primaryActions = computed(
    () => this.availableActions().filter((action) => action.primary),
    ...ngDevMode ? [{ debugName: "primaryActions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  runAction(id) {
    if (!this.recordActions.has(id))
      return;
    const handlers = {
      EDIT_PATIENT: () => this.onEditPatient(),
      NEW_ENCOUNTER: () => this.onNewEncounter(),
      VIEW_GROWTH: () => this.goToCurves(),
      PRINT_DOCUMENT: () => this.onPrintSummary()
    };
    handlers[id]();
  }
  goBack() {
    this.router.navigate(["/pacientes"]);
  }
  onNewEncounter() {
    if (!this.recordActions.has("NEW_ENCOUNTER"))
      return;
    this.newEncounter.emit();
  }
  onEditPatient() {
    if (!this.recordActions.has("EDIT_PATIENT"))
      return;
    this.editPatient.emit();
  }
  onPrintSummary() {
    if (!this.recordActions.has("PRINT_DOCUMENT"))
      return;
    this.printSummary.emit();
  }
  goToCurves() {
    if (!this.recordActions.has("VIEW_GROWTH") || !this.isChild())
      return;
    if (this.viewCurves.observed) {
      this.viewCurves.emit();
    } else {
      this.router.navigate(["/curvas"]);
    }
  }
  static \u0275fac = function PatientBannerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientBannerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PatientBannerComponent, selectors: [["app-patient-banner"]], inputs: { patient: "patient" }, outputs: { newEncounter: "newEncounter", editPatient: "editPatient", printSummary: "printSummary", viewCurves: "viewCurves" }, features: [\u0275\u0275ProvidersFeature([
    provideIcons({
      lucideAlertTriangle,
      lucideShieldAlert,
      lucideCheckCircle2,
      lucidePlus,
      lucideChevronLeft,
      lucideUser,
      lucideCreditCard
    })
  ])], decls: 40, vars: 10, consts: [["role", "banner", "aria-label", "Cabecera cl\xEDnica del paciente", 1, "patient-clinical-banner"], [1, "banner-left-block"], ["type", "button", "title", "Volver al Directorio de Pacientes", 1, "btn-nav-back", 3, "click"], ["name", "lucideChevronLeft", 1, "text-slate-500"], [1, "patient-avatar-circle"], [1, "patient-core-info"], [1, "patient-name-row"], [1, "patient-fullname"], [1, "hc-number-chip"], ["title", "Atenci\xF3n Particular / Sin Cobertura Registrada", 1, "coverage-chip", "particular"], ["title", "Cobertura M\xE9dica Activa", 1, "coverage-chip", "insured"], [1, "patient-demographics-row"], [1, "demo-item"], [1, "demo-bullet"], ["role", "region", "aria-label", "Alertas m\xE9dicas cr\xEDticas de seguridad", 1, "banner-safety-block"], [1, "alerts-group", "allergies-group"], [1, "alerts-group", "chronic-group"], [1, "banner-actions-block"], ["name", "lucideCreditCard", 1, "text-slate-400"], ["name", "lucideCreditCard", 1, "text-teal-600"], [1, "coverage-provider"], [1, "coverage-divider"], [1, "coverage-affiliate"], [1, "safety-badge", "danger", 3, "title"], [1, "safety-dot-pulse", "red"], ["name", "lucideShieldAlert", 1, "safety-icon", "text-red-600"], [1, "safety-text"], [1, "safety-badge", "warning", 3, "title"], ["name", "lucideAlertTriangle", 1, "safety-icon", "text-amber-600"], ["type", "button", 3, "class"], ["type", "button", 3, "click"], [3, "name"]], template: function PatientBannerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "header", 0)(1, "div", 1)(2, "button", 2);
      \u0275\u0275listener("click", function PatientBannerComponent_Template_button_click_2_listener() {
        return ctx.goBack();
      });
      \u0275\u0275element(3, "ng-icon", 3);
      \u0275\u0275elementStart(4, "span");
      \u0275\u0275text(5, "Directorio");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 4);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 5)(9, "div", 6)(10, "h1", 7);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "span", 8);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(14, PatientBannerComponent_Conditional_14_Template, 4, 0, "span", 9)(15, PatientBannerComponent_Conditional_15_Template, 5, 2, "span", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div", 11)(17, "span", 12)(18, "strong");
      \u0275\u0275text(19, "DNI:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "span", 13);
      \u0275\u0275text(22, "\u2022");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "span", 12)(24, "strong");
      \u0275\u0275text(25, "Edad:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(26);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "span", 13);
      \u0275\u0275text(28, "\u2022");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "span", 12)(30, "strong");
      \u0275\u0275text(31, "Sexo:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(32);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(33, PatientBannerComponent_Conditional_33_Template, 1, 1);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(34, "div", 14);
      \u0275\u0275conditionalCreate(35, PatientBannerComponent_Conditional_35_Template, 3, 0, "div", 15);
      \u0275\u0275conditionalCreate(36, PatientBannerComponent_Conditional_36_Template, 3, 0, "div", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "div", 17);
      \u0275\u0275repeaterCreate(38, PatientBannerComponent_For_39_Template, 1, 1, null, null, _forTrack0);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_7_0;
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1(" ", ctx.initials(), " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", (ctx.patient || ctx.activePatientService.activePatient())?.fullName || "Paciente", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("HC #", (ctx.patient || ctx.activePatientService.activePatient())?.id);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.coverageInfo().isParticular ? 14 : 15);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", ctx.nationalId());
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", ctx.dynamicAge());
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", ctx.sexLabel());
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_7_0 = (ctx.patient || ctx.activePatientService.activePatient())?.bloodType) ? 33 : -1, tmp_7_0);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.allergyList().length > 0 ? 35 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.chronicConditionList().length > 0 ? 36 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.primaryActions());
    }
  }, dependencies: [CommonModule, NgIcon], styles: ["\n.patient-clinical-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.875rem 1.5rem;\n  background-color: var(--%NS%dc-surface, #ffffff);\n  border-bottom: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n  position: sticky;\n  top: 0;\n  z-index: 25;\n  transition: all 0.2s ease;\n}\n.banner-left-block[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex: 1 1 auto;\n  min-width: 0;\n}\n.btn-nav-back[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.4rem 0.65rem;\n  border-radius: 0.5rem;\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  color: var(--%NS%dc-ink-secondary, #475569);\n  font-size: 0.75rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.btn-nav-back[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-surface-high, #e2e8f0);\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.patient-avatar-circle[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 9999px;\n  background:\n    linear-gradient(\n      135deg,\n      #0d9488,\n      #0f766e);\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 1rem;\n  letter-spacing: -0.025em;\n  flex-shrink: 0;\n  box-shadow: 0 2px 4px rgba(13, 148, 136, 0.2);\n}\n.patient-core-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  min-width: 0;\n}\n.patient-name-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.625rem;\n  flex-wrap: wrap;\n}\n.patient-fullname[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #0f172a);\n  margin: 0;\n  line-height: 1.25;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.hc-number-chip[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink-secondary, #475569);\n  background-color: var(--%NS%dc-surface-high, #f1f5f9);\n  padding: 0.15rem 0.45rem;\n  border-radius: 0.25rem;\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  letter-spacing: 0.025em;\n}\n.coverage-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.2rem 0.6rem;\n  border-radius: 9999px;\n  font-size: 0.75rem;\n  line-height: 1;\n}\n.coverage-chip.insured[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-success-surface, #f0fdf4);\n  border: 1px solid #bbf7d0;\n  color: var(--%NS%dc-success-ink, #166534);\n}\n.coverage-chip.particular[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.coverage-divider[_ngcontent-%COMP%] {\n  color: #86efac;\n}\n.coverage-affiliate[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-success-ink, #15803d);\n  font-weight: 500;\n}\n.patient-demographics-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  font-size: 0.8125rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  flex-wrap: wrap;\n}\n.demo-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink-secondary, #334155);\n}\n.demo-bullet[_ngcontent-%COMP%] {\n  color: #cbd5e1;\n}\n.banner-safety-block[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.alerts-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n}\n.safety-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.25rem 0.65rem;\n  border-radius: 9999px;\n  font-size: 0.75rem;\n  font-weight: 500;\n  line-height: 1.2;\n}\n.safety-badge.danger[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-error-surface, #fef2f2);\n  border: 1px solid #fecaca;\n  color: var(--%NS%dc-error-ink, #b91c1c);\n}\n.safety-badge.warning[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-warning-surface, #fffbeb);\n  border: 1px solid #fde68a;\n  color: var(--%NS%dc-warning-ink, #b45309);\n}\n.safety-badge.neutral[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-success-surface, #f0fdf4);\n  border: 1px solid #bbf7d0;\n  color: var(--%NS%dc-success-ink, #15803d);\n}\n.safety-dot-pulse[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 9999px;\n  display: inline-block;\n  animation: _ngcontent-%COMP%_pulse-alert 1.8s infinite;\n}\n.safety-dot-pulse.red[_ngcontent-%COMP%] {\n  background-color: #ef4444;\n}\n@keyframes _ngcontent-%COMP%_pulse-alert {\n  0% {\n    transform: scale(0.95);\n    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);\n  }\n  70% {\n    transform: scale(1.15);\n    box-shadow: 0 0 0 5px rgba(239, 68, 68, 0);\n  }\n  100% {\n    transform: scale(0.95);\n    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);\n  }\n}\n.safety-icon[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  flex-shrink: 0;\n}\n.banner-actions-block[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-shrink: 0;\n}\n.btn-secondary-edit[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.55rem 0.85rem;\n  background-color: var(--%NS%dc-surface, #ffffff);\n  color: var(--%NS%dc-ink-secondary, #334155);\n  font-size: 0.8125rem;\n  font-weight: 600;\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 0.5rem;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.btn-secondary-edit[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  color: var(--%NS%dc-ink, #0f172a);\n  border-color: #94a3b8;\n  transform: translateY(-1px);\n}\n.btn-primary-soap[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.55rem 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      #0d9488,\n      #0f766e);\n  color: #ffffff;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  box-shadow: 0 2px 4px rgba(13, 148, 136, 0.25);\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.btn-primary-soap[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #0f766e,\n      #115e59);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(13, 148, 136, 0.3);\n}\n@media (max-width: 960px) {\n  .patient-clinical-banner[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.75rem;\n  }\n  .banner-safety-block[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n  .banner-actions-block[_ngcontent-%COMP%] {\n    justify-content: flex-end;\n  }\n}\n/*# sourceMappingURL=patient-banner.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientBannerComponent, [{
    type: Component,
    args: [{ selector: "app-patient-banner", standalone: true, imports: [CommonModule, NgIcon], providers: [
      provideIcons({
        lucideAlertTriangle,
        lucideShieldAlert,
        lucideCheckCircle2,
        lucidePlus,
        lucideChevronLeft,
        lucideUser,
        lucideCreditCard
      })
    ], template: `<header class="patient-clinical-banner" role="banner" aria-label="Cabecera cl\xEDnica del paciente">
  <!-- Left: Navigation & Core Demographics -->
  <div class="banner-left-block">
    <button
      type="button"
      class="btn-nav-back"
      (click)="goBack()"
      title="Volver al Directorio de Pacientes"
    >
      <ng-icon name="lucideChevronLeft" class="text-slate-500" />
      <span>Directorio</span>
    </button>

    <div class="patient-avatar-circle">
      {{ initials() }}
    </div>

    <div class="patient-core-info">
      <div class="patient-name-row">
        <h1 class="patient-fullname">
          {{ (patient || activePatientService.activePatient())?.fullName || 'Paciente' }}
        </h1>
        <span class="hc-number-chip"
          >HC #{{ (patient || activePatientService.activePatient())?.id }}</span
        >

        <!-- Cobertura / Obra Social Badge Prominente -->
        @if (coverageInfo().isParticular) {
          <span
            class="coverage-chip particular"
            title="Atenci\xF3n Particular / Sin Cobertura Registrada"
          >
            <ng-icon name="lucideCreditCard" class="text-slate-400" />
            <span>Particular</span>
          </span>
        } @else {
          <span class="coverage-chip insured" title="Cobertura M\xE9dica Activa">
            <ng-icon name="lucideCreditCard" class="text-teal-600" />
            <strong class="coverage-provider">{{ coverageInfo().label }}</strong>
            @if (coverageInfo().affiliate) {
              <span class="coverage-divider">\xB7</span>
              <span class="coverage-affiliate">Afiliado: {{ coverageInfo().affiliate }}</span>
            }
          </span>
        }
      </div>

      <div class="patient-demographics-row">
        <span class="demo-item"><strong>DNI:</strong> {{ nationalId() }}</span>
        <span class="demo-bullet">\u2022</span>
        <span class="demo-item"><strong>Edad:</strong> {{ dynamicAge() }}</span>
        <span class="demo-bullet">\u2022</span>
        <span class="demo-item"><strong>Sexo:</strong> {{ sexLabel() }}</span>
        @if ((patient || activePatientService.activePatient())?.bloodType; as bg) {
          @if (bg !== 'Sin registrar') {
            <span class="demo-bullet">\u2022</span>
            <span class="demo-item"><strong>Grupo:</strong> {{ bg }}</span>
          }
        }
      </div>
    </div>
  </div>

  <!-- Center: Patient Safety Alerts (High Clinical Contrast) -->
  <div class="banner-safety-block" role="region" aria-label="Alertas m\xE9dicas cr\xEDticas de seguridad">
    <!-- Allergies Badges (Red / Danger) -->
    @if (allergyList().length > 0) {
      <div class="alerts-group allergies-group">
        @for (allergy of allergyList(); track allergy) {
          <div class="safety-badge danger" [title]="'Alergia severa reportada: ' + allergy">
            <span class="safety-dot-pulse red"></span>
            <ng-icon name="lucideShieldAlert" class="safety-icon text-red-600" />
            <span class="safety-text"><strong>ALERGIA:</strong> {{ allergy }}</span>
          </div>
        }
      </div>
    }

    <!-- Chronic Conditions (Amber / Warning) -->
    @if (chronicConditionList().length > 0) {
      <div class="alerts-group chronic-group">
        @for (cond of chronicConditionList(); track cond) {
          <div class="safety-badge warning" [title]="'Condici\xF3n m\xE9dica de base: ' + cond">
            <ng-icon name="lucideAlertTriangle" class="safety-icon text-amber-600" />
            <span class="safety-text"><strong>ANTECEDENTE:</strong> {{ cond }}</span>
          </div>
        }
      </div>
    }
  </div>

  <!-- Common actions retain their presentation; specialty selection and order come from the server. -->
  <div class="banner-actions-block">
    @for (action of primaryActions(); track action.id) {
      @if (action.primary; as presentation) {
        <button
          type="button"
          [class]="presentation.css"
          (click)="runAction(action.id)"
          [attr.title]="presentation.title ?? null"
        >
          <ng-icon [name]="presentation.icon" />
          <span>{{ presentation.label }}</span>
        </button>
      }
    }
  </div>
</header>
`, styles: ["/* src/app/features/patient-record/patient-banner/patient-banner.component.css */\n.patient-clinical-banner {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.875rem 1.5rem;\n  background-color: var(--dc-surface, #ffffff);\n  border-bottom: 1px solid var(--dc-outline, #e2e8f0);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n  position: sticky;\n  top: 0;\n  z-index: 25;\n  transition: all 0.2s ease;\n}\n.banner-left-block {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex: 1 1 auto;\n  min-width: 0;\n}\n.btn-nav-back {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.4rem 0.65rem;\n  border-radius: 0.5rem;\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  background-color: var(--dc-surface-low, #f8fafc);\n  color: var(--dc-ink-secondary, #475569);\n  font-size: 0.75rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.btn-nav-back:hover {\n  background-color: var(--dc-surface-high, #e2e8f0);\n  color: var(--dc-ink, #0f172a);\n}\n.patient-avatar-circle {\n  width: 44px;\n  height: 44px;\n  border-radius: 9999px;\n  background:\n    linear-gradient(\n      135deg,\n      #0d9488,\n      #0f766e);\n  color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 1rem;\n  letter-spacing: -0.025em;\n  flex-shrink: 0;\n  box-shadow: 0 2px 4px rgba(13, 148, 136, 0.2);\n}\n.patient-core-info {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  min-width: 0;\n}\n.patient-name-row {\n  display: flex;\n  align-items: center;\n  gap: 0.625rem;\n  flex-wrap: wrap;\n}\n.patient-fullname {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: var(--dc-ink, #0f172a);\n  margin: 0;\n  line-height: 1.25;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.hc-number-chip {\n  font-size: 0.6875rem;\n  font-weight: 700;\n  color: var(--dc-ink-secondary, #475569);\n  background-color: var(--dc-surface-high, #f1f5f9);\n  padding: 0.15rem 0.45rem;\n  border-radius: 0.25rem;\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  letter-spacing: 0.025em;\n}\n.coverage-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.2rem 0.6rem;\n  border-radius: 9999px;\n  font-size: 0.75rem;\n  line-height: 1;\n}\n.coverage-chip.insured {\n  background-color: var(--dc-success-surface, #f0fdf4);\n  border: 1px solid #bbf7d0;\n  color: var(--dc-success-ink, #166534);\n}\n.coverage-chip.particular {\n  background-color: var(--dc-surface-low, #f8fafc);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  color: var(--dc-ink-muted, #64748b);\n}\n.coverage-divider {\n  color: #86efac;\n}\n.coverage-affiliate {\n  color: var(--dc-success-ink, #15803d);\n  font-weight: 500;\n}\n.patient-demographics-row {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  font-size: 0.8125rem;\n  color: var(--dc-ink-muted, #64748b);\n  flex-wrap: wrap;\n}\n.demo-item strong {\n  color: var(--dc-ink-secondary, #334155);\n}\n.demo-bullet {\n  color: #cbd5e1;\n}\n.banner-safety-block {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.alerts-group {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n}\n.safety-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.25rem 0.65rem;\n  border-radius: 9999px;\n  font-size: 0.75rem;\n  font-weight: 500;\n  line-height: 1.2;\n}\n.safety-badge.danger {\n  background-color: var(--dc-error-surface, #fef2f2);\n  border: 1px solid #fecaca;\n  color: var(--dc-error-ink, #b91c1c);\n}\n.safety-badge.warning {\n  background-color: var(--dc-warning-surface, #fffbeb);\n  border: 1px solid #fde68a;\n  color: var(--dc-warning-ink, #b45309);\n}\n.safety-badge.neutral {\n  background-color: var(--dc-success-surface, #f0fdf4);\n  border: 1px solid #bbf7d0;\n  color: var(--dc-success-ink, #15803d);\n}\n.safety-dot-pulse {\n  width: 7px;\n  height: 7px;\n  border-radius: 9999px;\n  display: inline-block;\n  animation: pulse-alert 1.8s infinite;\n}\n.safety-dot-pulse.red {\n  background-color: #ef4444;\n}\n@keyframes pulse-alert {\n  0% {\n    transform: scale(0.95);\n    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);\n  }\n  70% {\n    transform: scale(1.15);\n    box-shadow: 0 0 0 5px rgba(239, 68, 68, 0);\n  }\n  100% {\n    transform: scale(0.95);\n    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);\n  }\n}\n.safety-icon {\n  font-size: 0.95rem;\n  flex-shrink: 0;\n}\n.banner-actions-block {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-shrink: 0;\n}\n.btn-secondary-edit {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.55rem 0.85rem;\n  background-color: var(--dc-surface, #ffffff);\n  color: var(--dc-ink-secondary, #334155);\n  font-size: 0.8125rem;\n  font-weight: 600;\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  border-radius: 0.5rem;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.btn-secondary-edit:hover {\n  background-color: var(--dc-surface-low, #f8fafc);\n  color: var(--dc-ink, #0f172a);\n  border-color: #94a3b8;\n  transform: translateY(-1px);\n}\n.btn-primary-soap {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.55rem 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      #0d9488,\n      #0f766e);\n  color: #ffffff;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  box-shadow: 0 2px 4px rgba(13, 148, 136, 0.25);\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.btn-primary-soap:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #0f766e,\n      #115e59);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(13, 148, 136, 0.3);\n}\n@media (max-width: 960px) {\n  .patient-clinical-banner {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.75rem;\n  }\n  .banner-safety-block {\n    justify-content: flex-start;\n  }\n  .banner-actions-block {\n    justify-content: flex-end;\n  }\n}\n/*# sourceMappingURL=patient-banner.component.css.map */\n"] }]
  }], null, { patient: [{
    type: Input
  }], newEncounter: [{
    type: Output
  }], editPatient: [{
    type: Output
  }], printSummary: [{
    type: Output
  }], viewCurves: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PatientBannerComponent, { className: "PatientBannerComponent", filePath: "src/app/features/patient-record/patient-banner/patient-banner.component.ts", lineNumber: 46 });
})();

// src/app/core/services/clinical-document-print.service.ts
var ClinicalDocumentPrintService = class _ClinicalDocumentPrintService {
  http = inject(HttpClient);
  auth = inject(AuthService);
  previews = /* @__PURE__ */ new Map();
  owner = this.auth.currentUser()?.id ?? null;
  constructor() {
    const release = () => {
      for (const [url, preview] of this.previews) {
        URL.revokeObjectURL(url);
        try {
          if (preview && !preview.closed)
            preview.close();
        } catch {
        }
      }
      this.previews.clear();
    };
    effect(() => {
      const owner = this.auth.currentUser()?.id ?? null;
      if (owner !== this.owner) {
        this.owner = owner;
        release();
      }
    });
    inject(DestroyRef).onDestroy(release);
  }
  get(reference) {
    const collection = reference.source === "PRESCRIPTION_RECORD" ? "prescriptions" : "encounters";
    return this.http.get(`${environment.apiUrl}/patients/${reference.patientId}/${collection}/${reference.id}/print`);
  }
  getPdfBlob(reference) {
    const user = this.auth.currentUser();
    const identity2 = doctorPrintIdentity(user?.user_metadata);
    const collection = reference.source === "PRESCRIPTION_RECORD" ? "prescriptions" : "encounters";
    let params = new HttpParams();
    if (identity2.fullName)
      params = params.set("doctorName", identity2.fullName);
    if (identity2.license)
      params = params.set("license", identity2.license);
    if (identity2.clinic.name)
      params = params.set("clinicName", identity2.clinic.name);
    if (identity2.clinic.address)
      params = params.set("clinicAddress", identity2.clinic.address);
    if (identity2.clinic.phone)
      params = params.set("clinicPhone", identity2.clinic.phone);
    if (reference.type)
      params = params.set("type", reference.type);
    const url = `${environment.apiUrl}/patients/${reference.patientId}/${collection}/${reference.id}/pdf`;
    return this.http.get(url, { params, responseType: "blob" });
  }
  openPdfInNewTab(reference) {
    if (typeof window === "undefined")
      return;
    const owner = this.auth.currentUser()?.id ?? null;
    let targetWindow = null;
    try {
      if (typeof window.open === "function") {
        targetWindow = window.open("about:blank", "_blank");
        if (targetWindow)
          targetWindow.opener = null;
        if (targetWindow && targetWindow.document) {
          targetWindow.document.title = "Generando receta...";
        }
      }
    } catch {
      targetWindow = null;
    }
    this.getPdfBlob(reference).subscribe({
      next: (blob) => {
        if (owner !== (this.auth.currentUser()?.id ?? null)) {
          try {
            targetWindow?.close();
          } catch {
          }
          return;
        }
        try {
          const blobUrl = URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
          if (targetWindow && !targetWindow.closed) {
            this.previews.set(blobUrl, targetWindow);
            targetWindow.location.href = blobUrl;
          } else if (typeof window.open === "function") {
            this.previews.set(blobUrl, window.open(blobUrl, "_blank", "noopener,noreferrer"));
          }
        } catch (e) {
          console.error("Error handling PDF blob:", e);
        }
      },
      error: (err) => {
        try {
          if (targetWindow && !targetWindow.closed) {
            targetWindow.close();
          }
        } catch {
        }
        if (owner !== (this.auth.currentUser()?.id ?? null))
          return;
        alert(err?.status === 403 ? "No ten\xE9s permiso para acceder a este documento. Verific\xE1 tu sesi\xF3n y suscripci\xF3n." : err?.status === 401 ? "Tu sesi\xF3n expir\xF3. Volv\xE9 a iniciar sesi\xF3n para imprimir." : err?.status === 422 ? "No se pudo representar el texto cl\xEDnico de forma segura. El PDF no fue emitido y los datos guardados no se modificaron." : "No se pudo generar el documento PDF. Reintent\xE1 m\xE1s tarde.");
      }
    });
  }
  static \u0275fac = function ClinicalDocumentPrintService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ClinicalDocumentPrintService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ClinicalDocumentPrintService, factory: _ClinicalDocumentPrintService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClinicalDocumentPrintService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

// src/app/features/patient-record/patient-encounters/patient-encounters.store.ts
var PatientEncountersStore = class _PatientEncountersStore {
  recordActions = inject(PatientRecordActionsService);
  destroyRef = inject(DestroyRef);
  platformId = inject(PLATFORM_ID);
  authService = inject(AuthService);
  activePatientService = inject(ActivePatientService);
  clinicalEncounterService = inject(ClinicalEncounterService);
  printService = inject(ClinicalDocumentPrintService);
  encounterRead = 0;
  recordContext = "";
  encounters = signal(
    [],
    ...ngDevMode ? [{ debugName: "encounters" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoadingEncounters = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLoadingEncounters" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isCreatingEncounter = signal(
    false,
    ...ngDevMode ? [{ debugName: "isCreatingEncounter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  encounterDraftValues = signal(
    {},
    ...ngDevMode ? [{ debugName: "encounterDraftValues" }] : (
      /* istanbul ignore next */
      []
    )
  );
  encounterDraftConsultationType = signal(
    null,
    ...ngDevMode ? [{ debugName: "encounterDraftConsultationType" }] : (
      /* istanbul ignore next */
      []
    )
  );
  encounterDraftInstant = signal(
    null,
    ...ngDevMode ? [{ debugName: "encounterDraftInstant" }] : (
      /* istanbul ignore next */
      []
    )
  );
  startCreatingEncounter() {
    this.isCreatingEncounter.set(true);
  }
  cancelCreatingEncounter() {
    this.isCreatingEncounter.set(false);
    this.clearEncounterDraft();
  }
  setEncounterDraft(values, consultationType, instant) {
    this.encounterDraftValues.set(structuredClone(values));
    if (consultationType) {
      this.encounterDraftConsultationType.set(consultationType);
    }
    if (instant) {
      this.encounterDraftInstant.set(instant);
    }
  }
  clearEncounterDraft() {
    this.encounterDraftValues.set({});
    this.encounterDraftConsultationType.set(null);
    this.encounterDraftInstant.set(null);
  }
  constructor() {
    effect(() => {
      const patient = this.activePatientService.activePatient();
      this.authService.currentUser();
      untracked(() => {
        const context = this.contextKey();
        if (context !== this.recordContext) {
          this.recordContext = context;
          this.encounterRead++;
          this.encounters.set([]);
          this.isCreatingEncounter.set(false);
          this.clearEncounterDraft();
        }
        if (patient?.id)
          this.loadEncounters(patient.id);
        else {
          this.encounters.set([]);
          this.isLoadingEncounters.set(false);
        }
      });
    });
  }
  contextKey() {
    return JSON.stringify([
      this.authService.currentUser()?.id ?? null,
      this.activePatientService.patientId()
    ]);
  }
  loadEncounters(patientId) {
    const revision = ++this.encounterRead;
    const owner = this.authService.currentUser()?.id;
    this.isLoadingEncounters.set(true);
    this.clinicalEncounterService.getByPatient(patientId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        if (revision !== this.encounterRead || patientId !== this.activePatientService.patientId() || owner !== this.authService.currentUser()?.id)
          return;
        this.encounters.set(data || []);
        this.isLoadingEncounters.set(false);
      },
      error: () => {
        if (revision !== this.encounterRead || patientId !== this.activePatientService.patientId() || owner !== this.authService.currentUser()?.id)
          return;
        this.encounters.set([]);
        this.isLoadingEncounters.set(false);
      }
    });
  }
  openEncounterDetail(encounterId) {
    if (isPlatformBrowser(this.platformId) && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-encounter-detail-modal", {
        detail: { encounterId }
      }));
    }
  }
  deleteEncounter(encounterId, event) {
    if (event)
      event.stopPropagation();
    const confirmed = window.confirm("\xBFEst\xE1 seguro de que desea eliminar esta consulta cl\xEDnica?");
    if (!confirmed)
      return;
    const patientId = this.activePatientService.patientId();
    const owner = this.authService.currentUser()?.id;
    const context = this.recordContext;
    const current = () => context === this.recordContext && patientId === this.activePatientService.patientId() && owner === this.authService.currentUser()?.id;
    this.clinicalEncounterService.delete(encounterId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        if (!current())
          return;
        if (patientId) {
          window.dispatchEvent(new CustomEvent("encounter-deleted", { detail: { patientId } }));
        }
      },
      error: (err) => {
        if (!current())
          return;
        alert(err?.error?.message || "Error al eliminar la consulta cl\xEDnica.");
      }
    });
  }
  onPrintPrescription(enc, type) {
    if (!this.recordActions.has("PRINT_DOCUMENT"))
      return;
    const ref = __spreadValues({
      source: "ENCOUNTER",
      id: enc.id,
      patientId: enc.patientId
    }, type ? { type } : {});
    if (isPlatformBrowser(this.platformId) && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-prescription-print-modal", {
        detail: ref
      }));
      this.printService.openPdfInNewTab(ref);
    }
  }
  static \u0275fac = function PatientEncountersStore_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientEncountersStore)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PatientEncountersStore, factory: _PatientEncountersStore.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientEncountersStore, [{
    type: Injectable
  }], () => [], null);
})();

// src/app/core/services/patient-growth.service.ts
var PatientGrowthService = class _PatientGrowthService {
  http = inject(HttpClient);
  getPatientGrowthCurves(patientId, referenceSex = null, measurementModes = {}) {
    let params = new HttpParams();
    if (referenceSex)
      params = params.set("referenceSex", referenceSex);
    if (Object.keys(measurementModes).length)
      params = params.set("measurementModes", JSON.stringify(measurementModes));
    return this.http.get(`${environment.apiUrl}/patients/${patientId}/growth`, { params });
  }
  formatDate(value) {
    if (!value)
      return "";
    let day = value;
    if (value.includes("T")) {
      const instant = new Date(value);
      if (!Number.isFinite(instant.getTime()))
        return value;
      day = new Intl.DateTimeFormat("en-CA", {
        timeZone: userTimeZone(),
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).format(instant);
    }
    return /^\d{4}-\d{2}-\d{2}$/.test(day) ? day.split("-").reverse().join("/") : value;
  }
  static \u0275fac = function PatientGrowthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientGrowthService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PatientGrowthService, factory: _PatientGrowthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientGrowthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/features/patient-record/patient-growth/patient-growth.store.ts
var PatientGrowthStore = class _PatientGrowthStore {
  destroyRef = inject(DestroyRef);
  authService = inject(AuthService);
  activePatientService = inject(ActivePatientService);
  growthService = inject(PatientGrowthService);
  workspaceStore = inject(WorkspaceStore);
  growthRead = 0;
  recordContext = "";
  readSubscription;
  today = signal(
    this.userDay(),
    ...ngDevMode ? [{ debugName: "today" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedGrowthMetric = signal(
    "WEIGHT",
    ...ngDevMode ? [{ debugName: "selectedGrowthMetric" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showHistorical = signal(
    false,
    ...ngDevMode ? [{ debugName: "showHistorical" }] : (
      /* istanbul ignore next */
      []
    )
  );
  response = signal(
    null,
    ...ngDevMode ? [{ debugName: "response" }] : (
      /* istanbul ignore next */
      []
    )
  );
  confirmedSex = signal(
    null,
    ...ngDevMode ? [{ debugName: "confirmedSex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoadingGrowthCurves = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLoadingGrowthCurves" }] : (
      /* istanbul ignore next */
      []
    )
  );
  growthError = signal(
    null,
    ...ngDevMode ? [{ debugName: "growthError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  patientSex = computed(
    () => this.response()?.referenceSex || null,
    ...ngDevMode ? [{ debugName: "patientSex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  backendGrowthMeasurements = computed(
    () => this.response()?.observations ?? [],
    ...ngDevMode ? [{ debugName: "backendGrowthMeasurements" }] : (
      /* istanbul ignore next */
      []
    )
  );
  availableCharts = computed(
    () => (this.response()?.charts ?? []).filter((c) => c.applicable || this.showHistorical() && c.points.length > 0),
    ...ngDevMode ? [{ debugName: "availableCharts" }] : (
      /* istanbul ignore next */
      []
    )
  );
  categories = computed(
    () => {
      const categories = /* @__PURE__ */ new Map();
      for (const chart of this.availableCharts()) {
        const d = chart.definition;
        const category = categories.get(d.indicator) ?? {
          indicator: d.indicator,
          title: d.title,
          count: 0
        };
        category.count += chart.points.length;
        categories.set(d.indicator, category);
      }
      return [...categories.values()];
    },
    ...ngDevMode ? [{ debugName: "categories" }] : (
      /* istanbul ignore next */
      []
    )
  );
  effectiveMetric = computed(
    () => {
      const selected = this.selectedGrowthMetric();
      return selected === "ALL" || this.categories().some((c) => c.indicator === selected) ? selected : this.categories()[0]?.indicator;
    },
    ...ngDevMode ? [{ debugName: "effectiveMetric" }] : (
      /* istanbul ignore next */
      []
    )
  );
  visibleCharts = computed(
    () => this.availableCharts().filter((c) => this.effectiveMetric() === "ALL" || c.definition.indicator === this.effectiveMetric()),
    ...ngDevMode ? [{ debugName: "visibleCharts" }] : (
      /* istanbul ignore next */
      []
    )
  );
  points(indicators) {
    return (this.response()?.charts ?? []).filter((c) => indicators.includes(c.definition.indicator)).flatMap((c) => c.points).sort((a, b) => a.date.localeCompare(b.date));
  }
  weightMeasurements = computed(
    () => this.points(["WEIGHT"]),
    ...ngDevMode ? [{ debugName: "weightMeasurements" }] : (
      /* istanbul ignore next */
      []
    )
  );
  heightMeasurements = computed(
    () => this.points(["HEIGHT", "LENGTH"]),
    ...ngDevMode ? [{ debugName: "heightMeasurements" }] : (
      /* istanbul ignore next */
      []
    )
  );
  headCircumferenceMeasurements = computed(
    () => this.points(["HEAD_CIRCUMFERENCE"]),
    ...ngDevMode ? [{ debugName: "headCircumferenceMeasurements" }] : (
      /* istanbul ignore next */
      []
    )
  );
  totalMeasurementsCount = computed(
    () => this.backendGrowthMeasurements().reduce((count, o) => count + [o.weightKg, o.heightCm, o.headCircumferenceCm].filter((v) => typeof v === "number" && Number.isFinite(v) && v > 0).length, 0),
    ...ngDevMode ? [{ debugName: "totalMeasurementsCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  growthEnabled = computed(
    () => this.workspaceStore.hasRecordTab("GROWTH") && this.workspaceStore.isModuleActive("GROWTH_CHARTS"),
    ...ngDevMode ? [{ debugName: "growthEnabled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    interval(6e4).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.today.set(this.userDay()));
    this.destroyRef.onDestroy(() => this.readSubscription?.unsubscribe());
    effect(() => {
      const patient = this.activePatientService.activePatient();
      this.authService.currentUser();
      this.growthEnabled();
      this.today();
      untracked(() => {
        const context = this.contextKey();
        if (context !== this.recordContext) {
          this.recordContext = context;
          this.growthRead++;
          this.response.set(null);
          this.growthError.set(null);
          this.confirmedSex.set(null);
          this.selectedGrowthMetric.set("WEIGHT");
          this.showHistorical.set(false);
        }
        if (patient?.id)
          this.loadGrowthCurves(patient.id);
        else {
          this.readSubscription?.unsubscribe();
          this.response.set(null);
          this.isLoadingGrowthCurves.set(false);
        }
      });
    });
  }
  userDay() {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: userTimeZone(),
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(/* @__PURE__ */ new Date());
  }
  contextKey() {
    const patient = this.activePatientService.activePatient();
    return JSON.stringify([
      this.authService.currentUser()?.id ?? null,
      patient?.id,
      patient?.birthDate,
      patient?.gender
    ]);
  }
  confirmSex(sex) {
    this.confirmedSex.set(sex);
    this.reload();
  }
  clearSexConfirmation() {
    this.confirmedSex.set(null);
    this.reload();
  }
  reload() {
    const id = this.activePatientService.patientId();
    if (id)
      this.loadGrowthCurves(id);
  }
  loadGrowthCurves(patientId) {
    const revision = ++this.growthRead;
    const context = this.contextKey();
    const referenceSex = this.confirmedSex();
    this.readSubscription?.unsubscribe();
    if (!this.growthEnabled()) {
      this.response.set(null);
      this.growthError.set(null);
      this.isLoadingGrowthCurves.set(false);
      return;
    }
    this.isLoadingGrowthCurves.set(true);
    this.growthError.set(null);
    this.readSubscription = this.growthService.getPatientGrowthCurves(patientId, referenceSex).pipe(switchMap((data) => {
      if (!data || data.patientId !== patientId || data.status !== "READY" || revision !== this.growthRead || context !== this.contextKey())
        return of(data);
      const modes = {};
      for (const observation of data.observations) {
        if (observation.measurementMode !== "UNKNOWN" || !Number.isFinite(observation.heightCm) || (observation.heightCm ?? 0) <= 0 || !Number.isInteger(observation.ageDays) || observation.ageDays < 0)
          continue;
        const key = observation.source === "BIRTH" ? "BIRTH" : String(observation.encounterId);
        if (key !== "BIRTH" && (!observation.encounterId || observation.encounterId <= 0))
          continue;
        modes[key] = observation.ageDays <= 730 ? "RECUMBENT" : "STANDING";
      }
      return Object.keys(modes).length ? this.growthService.getPatientGrowthCurves(patientId, referenceSex, modes) : of(data);
    }), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        if (revision !== this.growthRead || patientId !== this.activePatientService.patientId() || context !== this.contextKey())
          return;
        if (!data || data.patientId !== patientId) {
          this.response.set(null);
          this.growthError.set("La respuesta de curvas no corresponde a este paciente.");
        } else
          this.response.set(data);
        this.isLoadingGrowthCurves.set(false);
      },
      error: () => {
        if (revision !== this.growthRead || patientId !== this.activePatientService.patientId() || context !== this.contextKey())
          return;
        this.response.set(null);
        this.growthError.set("No se pudieron cargar las curvas y mediciones OMS.");
        this.isLoadingGrowthCurves.set(false);
      }
    });
  }
  static \u0275fac = function PatientGrowthStore_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientGrowthStore)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PatientGrowthStore, factory: _PatientGrowthStore.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientGrowthStore, [{
    type: Injectable
  }], () => [], null);
})();

// src/app/core/services/patient-prescription.service.ts
var PatientPrescriptionService = class _PatientPrescriptionService {
  http = inject(HttpClient);
  url(patientId) {
    return `${environment.apiUrl}/patients/${patientId}/prescriptions`;
  }
  list(patientId) {
    return this.http.get(this.url(patientId));
  }
  create(patientId, request) {
    return this.http.post(this.url(patientId), request);
  }
  delete(patientId, id) {
    return this.http.delete(`${this.url(patientId)}/${id}`);
  }
  static \u0275fac = function PatientPrescriptionService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientPrescriptionService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PatientPrescriptionService, factory: _PatientPrescriptionService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientPrescriptionService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/features/patient-record/patient-prescriptions/patient-prescription.store.ts
var PatientPrescriptionStore = class _PatientPrescriptionStore {
  api = inject(PatientPrescriptionService);
  destroyRef = inject(DestroyRef);
  changed = new Subject();
  auth = inject(AuthService);
  owner = this.auth.currentUser()?.id ?? null;
  patientId = null;
  constructor() {
    effect(() => {
      this.auth.currentUser();
      untracked(() => {
        this.syncOwner();
      });
    });
  }
  syncOwner() {
    const owner = this.auth.currentUser()?.id ?? null;
    if (owner === this.owner)
      return;
    this.owner = owner;
    this.changed.next();
    this.patientId = null;
    this.records.set([]);
    this.loading.set(false);
    this.writing.set(false);
    this.loadError.set(null);
    this.error.set(null);
    this.success.set(null);
  }
  currentOwner() {
    return this.owner === (this.auth.currentUser()?.id ?? null);
  }
  records = signal(
    [],
    ...ngDevMode ? [{ debugName: "records" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loading = signal(
    false,
    ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  writing = signal(
    false,
    ...ngDevMode ? [{ debugName: "writing" }] : (
      /* istanbul ignore next */
      []
    )
  );
  busy = computed(
    () => this.loading() || this.writing(),
    ...ngDevMode ? [{ debugName: "busy" }] : (
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
  error = signal(
    null,
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  success = signal(
    null,
    ...ngDevMode ? [{ debugName: "success" }] : (
      /* istanbul ignore next */
      []
    )
  );
  setPatient(patientId) {
    this.syncOwner();
    if (this.patientId === patientId)
      return;
    this.changed.next();
    this.patientId = patientId;
    this.records.set([]);
    this.loading.set(false);
    this.writing.set(false);
    this.loadError.set(null);
    this.error.set(null);
    this.success.set(null);
    if (patientId)
      this.reload();
  }
  reload() {
    const patientId = this.patientId;
    if (!this.owner || !patientId || this.busy() || !this.currentOwner())
      return;
    this.loading.set(true);
    this.loadError.set(null);
    this.api.list(patientId).pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (records) => {
        if (!this.currentOwner())
          return;
        this.records.set(records);
        this.loading.set(false);
      },
      error: () => {
        if (!this.currentOwner())
          return;
        this.loading.set(false);
        this.loadError.set("No se pudo cargar el historial de recetas y \xF3rdenes.");
      }
    });
  }
  save(request, onSaved) {
    const patientId = this.patientId;
    if (!patientId || this.busy() || !this.currentOwner())
      return;
    this.writing.set(true);
    this.error.set(null);
    this.success.set(null);
    this.api.create(patientId, request).pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (record) => {
        if (!this.currentOwner())
          return;
        this.records.update((records) => [record, ...records]);
        this.writing.set(false);
        this.success.set("Receta / orden registrada en el historial del paciente.");
        onSaved?.(record);
      },
      error: (error) => {
        if (!this.currentOwner())
          return;
        this.writing.set(false);
        this.error.set(error?.error?.message || "No se pudo guardar la receta u orden. El borrador se conserva.");
      }
    });
  }
  delete(id) {
    const patientId = this.patientId;
    if (!patientId || this.busy() || !this.currentOwner())
      return;
    this.writing.set(true);
    this.error.set(null);
    this.success.set(null);
    this.api.delete(patientId, id).pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        if (!this.currentOwner())
          return;
        this.records.update((records) => records.filter((record) => record.id !== id));
        this.writing.set(false);
      },
      error: () => {
        if (!this.currentOwner())
          return;
        this.writing.set(false);
        this.error.set("No se pudo eliminar el documento. El registro se conserva.");
      }
    });
  }
  static \u0275fac = function PatientPrescriptionStore_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientPrescriptionStore)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PatientPrescriptionStore, factory: _PatientPrescriptionStore.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientPrescriptionStore, [{
    type: Injectable
  }], () => [], null);
})();

// src/app/features/patient-record/patient-prescriptions/patient-prescription-editor.store.ts
var PatientPrescriptionEditorStore = class _PatientPrescriptionEditorStore {
  workspace = inject(WorkspaceStore);
  prescriptionsEnabled = computed(
    () => this.workspace.hasRecordTab("PRESCRIPTIONS"),
    ...ngDevMode ? [{ debugName: "prescriptionsEnabled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recordActions = inject(PatientRecordActionsService);
  prescriptionStore = inject(PatientPrescriptionStore);
  activePatientService = inject(ActivePatientService);
  authService = inject(AuthService);
  printService = inject(ClinicalDocumentPrintService);
  destroyRef = inject(DestroyRef);
  platformId = inject(PLATFORM_ID);
  recordContext = "";
  rxFormMode = signal(
    "MEDICATION",
    ...ngDevMode ? [{ debugName: "rxFormMode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rxMedicationName = signal(
    "",
    ...ngDevMode ? [{ debugName: "rxMedicationName" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rxDosage = signal(
    "",
    ...ngDevMode ? [{ debugName: "rxDosage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rxFrequency = signal(
    "Cada 8 horas",
    ...ngDevMode ? [{ debugName: "rxFrequency" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rxAdministrationRoute = signal(
    "V\xEDa Oral",
    ...ngDevMode ? [{ debugName: "rxAdministrationRoute" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rxDurationDays = signal(
    null,
    ...ngDevMode ? [{ debugName: "rxDurationDays" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rxMedInstructions = signal(
    "",
    ...ngDevMode ? [{ debugName: "rxMedInstructions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rxStudyName = signal(
    "",
    ...ngDevMode ? [{ debugName: "rxStudyName" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rxStudySpecification = signal(
    "",
    ...ngDevMode ? [{ debugName: "rxStudySpecification" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rxDiagnosis = signal(
    "",
    ...ngDevMode ? [{ debugName: "rxDiagnosis" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rxGeneralInstructions = signal(
    "",
    ...ngDevMode ? [{ debugName: "rxGeneralInstructions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  draftPrescriptions = signal(
    [],
    ...ngDevMode ? [{ debugName: "draftPrescriptions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  draftStudies = signal(
    [],
    ...ngDevMode ? [{ debugName: "draftStudies" }] : (
      /* istanbul ignore next */
      []
    )
  );
  medicationErrors = computed(
    () => ({
      name: textError(this.rxMedicationName(), 200, true),
      dosage: textError(this.rxDosage(), 500),
      frequency: textError(this.rxFrequency(), 200, true),
      route: textError(this.rxAdministrationRoute(), 200, true),
      duration: this.rxDurationDays() == null ? null : typeof this.rxDurationDays() !== "number" || !Number.isInteger(this.rxDurationDays()) || Number(this.rxDurationDays()) < 1 || Number(this.rxDurationDays()) > 2147483647 ? "Ingres\xE1 una duraci\xF3n en d\xEDas enteros mayor que cero." : null,
      instructions: textError(this.rxMedInstructions(), 4e3)
    }),
    ...ngDevMode ? [{ debugName: "medicationErrors" }] : (
      /* istanbul ignore next */
      []
    )
  );
  studyErrors = computed(
    () => ({
      name: textError(this.rxStudyName(), 2e3, true),
      specification: textError(this.rxStudySpecification(), 2e3) || (this.formattedStudy().length > 2e3 ? "El estudio y su especificaci\xF3n admiten hasta 2000 caracteres en total." : null)
    }),
    ...ngDevMode ? [{ debugName: "studyErrors" }] : (
      /* istanbul ignore next */
      []
    )
  );
  diagnosisError = computed(
    () => textError(this.rxDiagnosis(), 4e3),
    ...ngDevMode ? [{ debugName: "diagnosisError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  generalInstructionsError = computed(
    () => textError(this.rxGeneralInstructions(), 4e3),
    ...ngDevMode ? [{ debugName: "generalInstructionsError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  medicationValid = computed(
    () => !Object.values(this.medicationErrors()).some(Boolean),
    ...ngDevMode ? [{ debugName: "medicationValid" }] : (
      /* istanbul ignore next */
      []
    )
  );
  studyValid = computed(
    () => !Object.values(this.studyErrors()).some(Boolean),
    ...ngDevMode ? [{ debugName: "studyValid" }] : (
      /* istanbul ignore next */
      []
    )
  );
  setDuration(raw) {
    this.rxDurationDays.set(parseNumberInput(raw));
  }
  formattedStudy() {
    const name = this.rxStudyName().trim(), spec = this.rxStudySpecification().trim();
    return spec ? `${name} \u2014 ${spec}` : name;
  }
  savedPrescriptionRecords = this.prescriptionStore.records;
  rxErrorMessage = this.prescriptionStore.error;
  rxSuccessMessage = this.prescriptionStore.success;
  rxBusy = this.prescriptionStore.busy;
  commonStudySuggestions = [
    "Tomograf\xEDa Axial Computada (TAC)",
    "Resonancia Magn\xE9tica Nuclear (RMN)",
    "Radiograf\xEDa (Rx) de T\xF3rax Frente y Perfil",
    "Ecograf\xEDa Abdominal / General",
    "Laboratorio Completo (Hemograma, Glucemia, Funci\xF3n Renal y Hep\xE1tica)",
    "Electrocardiograma (ECG)"
  ];
  commonFrequencies = [
    "Cada 8 horas",
    "Cada 12 horas",
    "Cada 24 horas (1 vez por d\xEDa)",
    "Cada 6 horas",
    "En ayunas",
    "Seg\xFAn dolor o necesidad"
  ];
  commonRoutes = [
    "V\xEDa Oral",
    "Sublingual",
    "Intramuscular",
    "Endovenosa",
    "T\xF3pica / D\xE9rmica",
    "Inhalatoria",
    "Oft\xE1lmica / \xD3tica"
  ];
  patientNationalId = computed(
    () => {
      const p = this.activePatientService.activePatient();
      return p?.nationalId || p?.guardianInfo?.firstGuardianNationalId || "\u2014";
    },
    ...ngDevMode ? [{ debugName: "patientNationalId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  habitualMedication = computed(
    () => {
      return this.activePatientService.activePatient()?.personalHistory?.habitualMedication || [];
    },
    ...ngDevMode ? [{ debugName: "habitualMedication" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      const patient = this.activePatientService.activePatient();
      this.authService.currentUser();
      const enabled = this.prescriptionsEnabled();
      untracked(() => {
        const context = this.contextKey();
        if (context !== this.recordContext) {
          this.recordContext = context;
          this.clearRxForm();
        }
        if (!enabled)
          this.clearRxForm();
        this.prescriptionStore.setPatient(enabled ? patient?.id ?? null : null);
      });
    });
  }
  contextKey() {
    return JSON.stringify([
      this.authService.currentUser()?.id ?? null,
      this.activePatientService.patientId()
    ]);
  }
  currentRecordContext() {
    return this.recordContext === this.contextKey() && !this.destroyRef.destroyed;
  }
  setRxFormMode(mode) {
    this.rxFormMode.set(mode);
    this.rxErrorMessage.set(null);
    this.rxSuccessMessage.set(null);
  }
  addMedicationToDraft() {
    const name = this.rxMedicationName().trim();
    if (!this.medicationValid() || this.draftPrescriptions().length >= 100) {
      this.rxErrorMessage.set(Object.values(this.medicationErrors()).find(Boolean) || "Pod\xE9s agregar hasta 100 medicamentos.");
      return;
    }
    const newItem = {
      medicationName: name,
      dosage: this.rxDosage().trim() || "Seg\xFAn indicaci\xF3n",
      frequency: this.rxFrequency().trim() || "Cada 24 horas",
      administrationRoute: this.rxAdministrationRoute().trim() || "V\xEDa Oral",
      durationDays: this.rxDurationDays() && Number(this.rxDurationDays()) > 0 ? Number(this.rxDurationDays()) : null,
      instructions: this.rxMedInstructions().trim() || void 0
    };
    this.draftPrescriptions.update((list) => [...list, newItem]);
    this.rxMedicationName.set("");
    this.rxDosage.set("");
    this.rxDurationDays.set(null);
    this.rxMedInstructions.set("");
    this.rxErrorMessage.set(null);
    this.rxSuccessMessage.set(null);
  }
  removeMedicationFromDraft(index) {
    this.draftPrescriptions.update((list) => list.filter((_, i) => i !== index));
  }
  selectQuickStudy(studyTemplate) {
    this.rxStudyName.set(studyTemplate);
    this.rxErrorMessage.set(null);
  }
  addStudyToDraft() {
    const name = this.rxStudyName().trim();
    if (!this.studyValid() || this.draftStudies().length >= 100) {
      this.rxErrorMessage.set(Object.values(this.studyErrors()).find(Boolean) || "Pod\xE9s agregar hasta 100 estudios.");
      return;
    }
    const spec = this.rxStudySpecification().trim();
    const formattedStudy = spec ? `${name} \u2014 ${spec}` : name;
    this.draftStudies.update((list) => [...list, formattedStudy]);
    this.rxStudyName.set("");
    this.rxStudySpecification.set("");
    this.rxErrorMessage.set(null);
    this.rxSuccessMessage.set(null);
  }
  removeStudyFromDraft(index) {
    this.draftStudies.update((list) => list.filter((_, i) => i !== index));
  }
  prescribeHabitualMedication(medName) {
    if (textError(medName, 200, true) || this.draftPrescriptions().length >= 100) {
      this.rxErrorMessage.set("Revis\xE1 el medicamento y el l\xEDmite de 100 elementos por receta.");
      return;
    }
    this.rxFormMode.set("MEDICATION");
    const item = {
      medicationName: medName,
      dosage: "Dosis habitual",
      frequency: "Cada 24 horas (1 vez por d\xEDa)",
      administrationRoute: "V\xEDa Oral",
      instructions: "Continuar tratamiento de base"
    };
    this.draftPrescriptions.update((list) => [...list, item]);
    this.rxErrorMessage.set(null);
    this.rxSuccessMessage.set(`Se agreg\xF3 "${medName}" a la receta actual.`);
  }
  clearRxForm() {
    this.rxMedicationName.set("");
    this.rxDosage.set("");
    this.rxDurationDays.set(null);
    this.rxMedInstructions.set("");
    this.rxStudyName.set("");
    this.rxStudySpecification.set("");
    this.rxDiagnosis.set("");
    this.rxGeneralInstructions.set("");
    this.draftPrescriptions.set([]);
    this.draftStudies.set([]);
    this.rxErrorMessage.set(null);
    this.rxSuccessMessage.set(null);
  }
  commitPendingRxInputs() {
    const medicationPending = !!(this.rxMedicationName() || this.rxDosage() || this.rxDurationDays() != null || this.rxMedInstructions());
    const studyPending = !!(this.rxStudyName() || this.rxStudySpecification());
    const error = this.diagnosisError() || this.generalInstructionsError() || medicationPending && Object.values(this.medicationErrors()).find(Boolean) || studyPending && Object.values(this.studyErrors()).find(Boolean);
    if (error) {
      this.rxErrorMessage.set(error);
      return false;
    }
    if (medicationPending && this.draftPrescriptions().length >= 100 || studyPending && this.draftStudies().length >= 100) {
      this.rxErrorMessage.set("Pod\xE9s agregar hasta 100 elementos por lista.");
      return false;
    }
    if (medicationPending) {
      this.addMedicationToDraft();
    }
    if (studyPending) {
      this.addStudyToDraft();
    }
    return true;
  }
  saveCurrentRxToHistory(onSaved) {
    if (!this.prescriptionsEnabled())
      return;
    if (!this.currentRecordContext()) {
      this.clearRxForm();
      return;
    }
    if (this.rxBusy())
      return;
    if (!this.commitPendingRxInputs())
      return;
    const meds = this.draftPrescriptions();
    const studies = this.draftStudies();
    if (meds.length === 0 && studies.length === 0) {
      this.rxErrorMessage.set("Agreg\xE1 al menos un medicamento o estudio m\xE9dico (ej. Tomograf\xEDa) para guardar o imprimir.");
      return;
    }
    const type = this.rxFormMode() === "STUDY" && studies.length > 0 ? "STUDY_ORDERS" : meds.length > 0 ? "PRESCRIPTION" : "STUDY_ORDERS";
    this.prescriptionStore.save({
      type,
      diagnosisDescription: this.rxDiagnosis().trim(),
      generalInstructions: this.rxGeneralInstructions().trim(),
      prescriptions: meds.map((item) => __spreadValues({}, item)),
      diagnosticOrders: [...studies]
    }, onSaved);
  }
  reprintSavedRecord(record) {
    this.openSavedPrescription(record);
  }
  openSavedPrescription(record, forcedType) {
    if (!this.prescriptionsEnabled() || !this.recordActions.has("PRINT_DOCUMENT") || !this.currentRecordContext() || record.patientId !== this.activePatientService.patientId())
      return;
    const ref = {
      source: "PRESCRIPTION_RECORD",
      id: record.id,
      patientId: record.patientId,
      type: forcedType || record.type
    };
    if (isPlatformBrowser(this.platformId) && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-prescription-print-modal", {
        detail: ref
      }));
      this.printService.openPdfInNewTab(ref);
    }
  }
  deleteSavedRecord(recordId) {
    if (!this.prescriptionsEnabled())
      return;
    this.prescriptionStore.delete(recordId);
  }
  formatRxDate(isoString) {
    return formatInstant(isoString, false);
  }
  printRecord(latestEncounter, forcedType) {
    if (!this.recordActions.has("PRINT_DOCUMENT"))
      return;
    if (!this.prescriptionsEnabled()) {
      if (latestEncounter && (latestEncounter.prescriptions?.length ?? 0) > 0)
        this.onPrintPrescription(latestEncounter, forcedType);
      else
        this.rxErrorMessage.set("La consulta no tiene un documento registrado para imprimir.");
      return;
    }
    if (!isPlatformBrowser(this.platformId) || typeof window === "undefined") {
      return;
    }
    if (this.rxBusy())
      return;
    if (!this.commitPendingRxInputs())
      return;
    const currentMeds = this.draftPrescriptions();
    const currentStudies = this.draftStudies();
    if (currentMeds.length > 0 || currentStudies.length > 0) {
      this.saveCurrentRxToHistory((saved) => this.openSavedPrescription(saved, forcedType));
      return;
    }
    if (this.prescriptionStore.loadError()) {
      this.rxErrorMessage.set("Reintent\xE1 cargar el historial antes de imprimir un documento guardado.");
      return;
    }
    const latestSaved = this.savedPrescriptionRecords()[0];
    if (latestSaved) {
      this.reprintSavedRecord(latestSaved);
      return;
    }
    const latestEnc = latestEncounter;
    if (latestEnc && (latestEnc.prescriptions?.length ?? 0) > 0) {
      this.onPrintPrescription(latestEnc, forcedType);
      return;
    }
    this.rxErrorMessage.set("Agreg\xE1 al menos un medicamento o estudio para emitir el documento.");
  }
  onPrintPrescription(enc, type) {
    if (!this.recordActions.has("PRINT_DOCUMENT"))
      return;
    const ref = __spreadValues({
      source: "ENCOUNTER",
      id: enc.id,
      patientId: enc.patientId
    }, type ? { type } : {});
    if (isPlatformBrowser(this.platformId) && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-prescription-print-modal", {
        detail: ref
      }));
      this.printService.openPdfInNewTab(ref);
    }
  }
  static \u0275fac = function PatientPrescriptionEditorStore_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientPrescriptionEditorStore)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PatientPrescriptionEditorStore, factory: _PatientPrescriptionEditorStore.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientPrescriptionEditorStore, [{
    type: Injectable
  }], () => [], null);
})();

// src/app/features/patient-record/patient-studies/patient-studies.store.ts
var PatientStudiesStore = class _PatientStudiesStore {
  auth = inject(AuthService);
  activePatient = inject(ActivePatientService);
  recordContext = "";
  draftFile = signal(
    null,
    ...ngDevMode ? [{ debugName: "draftFile" }] : (
      /* istanbul ignore next */
      []
    )
  );
  draftDescription = signal(
    "",
    ...ngDevMode ? [{ debugName: "draftDescription" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      this.activePatient.activePatient();
      this.auth.currentUser();
      untracked(() => {
        const context = JSON.stringify([
          this.auth.currentUser()?.id ?? null,
          this.activePatient.patientId()
        ]);
        if (this.recordContext === "") {
          this.recordContext = context;
        } else if (context !== this.recordContext) {
          this.recordContext = context;
          this.clearDraft();
        }
      });
    });
  }
  setDraftFile(file) {
    this.draftFile.set(file);
  }
  setDraftDescription(description) {
    this.draftDescription.set(description);
  }
  clearDraft() {
    this.draftFile.set(null);
    this.draftDescription.set("");
  }
  static \u0275fac = function PatientStudiesStore_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientStudiesStore)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PatientStudiesStore, factory: _PatientStudiesStore.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientStudiesStore, [{
    type: Injectable
  }], () => [], null);
})();

// src/app/features/patient-record/patient-record-module.directive.ts
var PatientRecordModuleDirective = class _PatientRecordModuleDirective {
  container = inject(ViewContainerRef);
  recordModule = input.required(
    ...ngDevMode ? [{ debugName: "recordModule" }] : (
      /* istanbul ignore next */
      []
    )
  );
  patient = input.required(
    ...ngDevMode ? [{ debugName: "patient" }] : (
      /* istanbul ignore next */
      []
    )
  );
  latestEncounter = input(
    ...ngDevMode ? [void 0, { debugName: "latestEncounter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  editPatient = output();
  newEncounter = output();
  patientUpdated = output();
  ngOnChanges(changes) {
    if (!changes["recordModule"])
      return;
    const module = this.recordModule();
    const bindings = [];
    if (module.patientInput)
      bindings.push(inputBinding(module.patientInput, this.patient));
    if (module.patientIdInput)
      bindings.push(inputBinding(module.patientIdInput, () => this.patient().id));
    if (module.encounterInput)
      bindings.push(inputBinding(module.encounterInput, this.latestEncounter));
    if (module.editOutput)
      bindings.push(outputBinding(module.editOutput, () => this.editPatient.emit()));
    if (module.encounterOutput)
      bindings.push(outputBinding(module.encounterOutput, () => this.newEncounter.emit()));
    if (module.patientUpdatedOutput)
      bindings.push(outputBinding(module.patientUpdatedOutput, (patient) => this.patientUpdated.emit(patient)));
    this.container.clear();
    this.container.createComponent(module.component, { bindings });
  }
  static \u0275fac = function PatientRecordModuleDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientRecordModuleDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _PatientRecordModuleDirective, selectors: [["", "recordModule", ""]], inputs: { recordModule: [1, "recordModule"], patient: [1, "patient"], latestEncounter: [1, "latestEncounter"] }, outputs: { editPatient: "editPatient", newEncounter: "newEncounter", patientUpdated: "patientUpdated" }, features: [\u0275\u0275NgOnChangesFeature] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientRecordModuleDirective, [{
    type: Directive,
    args: [{ selector: "[recordModule]" }]
  }], null, { recordModule: [{ type: Input, args: [{ isSignal: true, alias: "recordModule", required: true }] }], patient: [{ type: Input, args: [{ isSignal: true, alias: "patient", required: true }] }], latestEncounter: [{ type: Input, args: [{ isSignal: true, alias: "latestEncounter", required: false }] }], editPatient: [{ type: Output, args: ["editPatient"] }], newEncounter: [{ type: Output, args: ["newEncounter"] }], patientUpdated: [{ type: Output, args: ["patientUpdated"] }] });
})();

// src/app/features/patient-record/patient-summary/patient-summary.component.ts
function PatientSummaryComponent_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 7);
    \u0275\u0275listener("click", function PatientSummaryComponent_Conditional_0_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editPatient.emit());
    });
    \u0275\u0275element(1, "ng-icon", 8);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Editar datos");
    \u0275\u0275elementEnd()();
  }
}
function PatientSummaryComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "h3", 3);
    \u0275\u0275text(4, "Datos Filiatorios y Cl\xEDnicos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 4);
    \u0275\u0275text(6, " Informaci\xF3n general, tutores y antecedentes registrados del paciente. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, PatientSummaryComponent_Conditional_0_Conditional_7_Template, 4, 0, "button", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "app-dynamic-form-renderer", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r1.recordActions.has("EDIT_PATIENT") ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("definition", ctx)("values", ctx_r1.patientFormValues())("formulaResults", ctx_r1.patientFormulaResults())("readonly", true);
  }
}
var PatientSummaryComponent = class _PatientSummaryComponent {
  recordActions = inject(PatientRecordActionsService);
  activePatientService = inject(ActivePatientService);
  editPatient = output();
  patientFormDefinition = computed(
    () => this.activePatientService.activePatient()?.formDefinitionSnapshot ?? null,
    ...ngDevMode ? [{ debugName: "patientFormDefinition" }] : (
      /* istanbul ignore next */
      []
    )
  );
  patientFormValues = computed(
    () => this.activePatientService.activePatient()?.formValues ?? {},
    ...ngDevMode ? [{ debugName: "patientFormValues" }] : (
      /* istanbul ignore next */
      []
    )
  );
  patientFormulaResults = computed(
    () => this.activePatientService.activePatient()?.formulaResults ?? {},
    ...ngDevMode ? [{ debugName: "patientFormulaResults" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function PatientSummaryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientSummaryComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PatientSummaryComponent, selectors: [["app-patient-summary"]], outputs: { editPatient: "editPatient" }, features: [\u0275\u0275ProvidersFeature([provideIcons({ lucideUser })])], decls: 1, vars: 1, consts: [["aria-label", "Datos del paciente", 1, "tab-panel", "animate-fade-in"], [1, "tab-panel-toolbar"], [1, "tab-panel-toolbar-text"], [1, "panel-section-title"], [1, "panel-section-subtitle"], ["type", "button", "title", "Editar datos filiatorios y cl\xEDnicos del paciente", 1, "btn-tab-edit"], [3, "definition", "values", "formulaResults", "readonly"], ["type", "button", "title", "Editar datos filiatorios y cl\xEDnicos del paciente", 1, "btn-tab-edit", 3, "click"], ["name", "lucideUser"]], template: function PatientSummaryComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, PatientSummaryComponent_Conditional_0_Template, 9, 5, "section", 0);
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275conditional((tmp_0_0 = ctx.patientFormDefinition()) ? 0 : -1, tmp_0_0);
    }
  }, dependencies: [DynamicFormRendererComponent, NgIcon], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n.tab-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n}\n.animate-fade-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.15s ease-in-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(3px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.tab-panel-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.875rem 1.25rem;\n  margin-bottom: 1.25rem;\n  background-color: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 14px;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);\n}\n.tab-panel-toolbar-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.panel-section-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #1e293b);\n}\n.panel-section-subtitle[_ngcontent-%COMP%] {\n  margin: 0.2rem 0 0;\n  font-size: 0.8125rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.btn-tab-edit[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.5rem 0.95rem;\n  background-color: var(--%NS%dc-surface, #ffffff);\n  color: var(--%NS%dc-teal-ink, #0f766e);\n  font-size: 0.8125rem;\n  font-weight: 600;\n  border: 1px solid #99f6e4;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.btn-tab-edit[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-teal-surface, #f0fdfa);\n  border-color: #5eead4;\n  color: var(--%NS%dc-teal-ink, #0d9488);\n  transform: translateY(-1px);\n}\n/*# sourceMappingURL=patient-summary.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientSummaryComponent, [{
    type: Component,
    args: [{ selector: "app-patient-summary", imports: [DynamicFormRendererComponent, NgIcon], providers: [provideIcons({ lucideUser })], template: `@if (patientFormDefinition(); as definition) {
  <section class="tab-panel animate-fade-in" aria-label="Datos del paciente">
    <div class="tab-panel-toolbar">
      <div class="tab-panel-toolbar-text">
        <h3 class="panel-section-title">Datos Filiatorios y Cl\xEDnicos</h3>
        <p class="panel-section-subtitle">
          Informaci\xF3n general, tutores y antecedentes registrados del paciente.
        </p>
      </div>
      @if (recordActions.has('EDIT_PATIENT')) {
        <button
          type="button"
          class="btn-tab-edit"
          (click)="editPatient.emit()"
          title="Editar datos filiatorios y cl\xEDnicos del paciente"
        >
          <ng-icon name="lucideUser" />
          <span>Editar datos</span>
        </button>
      }
    </div>
    <app-dynamic-form-renderer
      [definition]="definition"
      [values]="patientFormValues()"
      [formulaResults]="patientFormulaResults()"
      [readonly]="true"
    />
  </section>
}
`, styles: ["/* src/app/features/patient-record/patient-summary/patient-summary.component.css */\n:host {\n  display: block;\n  min-width: 0;\n}\n.tab-panel {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n}\n.animate-fade-in {\n  animation: fadeIn 0.15s ease-in-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(3px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.tab-panel-toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.875rem 1.25rem;\n  margin-bottom: 1.25rem;\n  background-color: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 14px;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);\n}\n.tab-panel-toolbar-text {\n  display: flex;\n  flex-direction: column;\n}\n.panel-section-title {\n  margin: 0;\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--dc-ink, #1e293b);\n}\n.panel-section-subtitle {\n  margin: 0.2rem 0 0;\n  font-size: 0.8125rem;\n  color: var(--dc-ink-muted, #64748b);\n}\n.btn-tab-edit {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.5rem 0.95rem;\n  background-color: var(--dc-surface, #ffffff);\n  color: var(--dc-teal-ink, #0f766e);\n  font-size: 0.8125rem;\n  font-weight: 600;\n  border: 1px solid #99f6e4;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.btn-tab-edit:hover {\n  background-color: var(--dc-teal-surface, #f0fdfa);\n  border-color: #5eead4;\n  color: var(--dc-teal-ink, #0d9488);\n  transform: translateY(-1px);\n}\n/*# sourceMappingURL=patient-summary.component.css.map */\n"] }]
  }], null, { editPatient: [{ type: Output, args: ["editPatient"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PatientSummaryComponent, { className: "PatientSummaryComponent", filePath: "src/app/features/patient-record/patient-summary/patient-summary.component.ts", lineNumber: 18 });
})();

// src/app/features/patient-record/clinical-timeline/clinical-timeline.component.ts
var _forTrack02 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.label;
function ClinicalTimelineComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function ClinicalTimelineComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function ClinicalTimelineComponent_Conditional_30_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearDateFilter());
    });
    \u0275\u0275text(1, " \u2715 Limpiar ");
    \u0275\u0275elementEnd();
  }
}
function ClinicalTimelineComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(de ", ctx_r1.encounters.length, ")");
  }
}
function ClinicalTimelineComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function ClinicalTimelineComponent_Conditional_35_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.createEncounter());
    });
    \u0275\u0275element(1, "ng-icon", 23);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "+ Nueva historia cl\xEDnica");
    \u0275\u0275elementEnd()();
  }
}
function ClinicalTimelineComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275element(1, "div", 24);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cargando historia cl\xEDnica...");
    \u0275\u0275elementEnd()();
  }
}
function ClinicalTimelineComponent_Conditional_37_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 26);
    \u0275\u0275element(2, "ng-icon", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "No hay registros en el rango de fechas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "No se encontraron registros en la historia cl\xEDnica entre las fechas seleccionadas.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 28);
    \u0275\u0275listener("click", function ClinicalTimelineComponent_Conditional_37_Conditional_0_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clearDateFilter());
    });
    \u0275\u0275text(8, "Quitar filtro de fechas");
    \u0275\u0275elementEnd()();
  }
}
function ClinicalTimelineComponent_Conditional_37_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 31);
    \u0275\u0275listener("click", function ClinicalTimelineComponent_Conditional_37_Conditional_1_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.createEncounter());
    });
    \u0275\u0275element(1, "ng-icon", 23);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "+ Nueva historia cl\xEDnica");
    \u0275\u0275elementEnd()();
  }
}
function ClinicalTimelineComponent_Conditional_37_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 26);
    \u0275\u0275element(2, "ng-icon", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Sin historias cl\xEDnicas registradas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "No se encontraron registros previos en la historia cl\xEDnica.");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, ClinicalTimelineComponent_Conditional_37_Conditional_1_Conditional_7_Template, 4, 0, "button", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r1.canCreateEncounter() ? 7 : -1);
  }
}
function ClinicalTimelineComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ClinicalTimelineComponent_Conditional_37_Conditional_0_Template, 9, 0, "div", 25)(1, ClinicalTimelineComponent_Conditional_37_Conditional_1_Template, 8, 1, "div", 25);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.encounters.length > 0 && ctx_r1.hasActiveDateFilter() ? 0 : 1);
  }
}
function ClinicalTimelineComponent_Conditional_38_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const encounter_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formatTime(encounter_r7.encounterDate));
  }
}
function ClinicalTimelineComponent_Conditional_38_For_2_Conditional_24_Conditional_1_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 59)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", item_r8.label, ":");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r8.value);
  }
}
function ClinicalTimelineComponent_Conditional_38_For_2_Conditional_24_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "div", 57)(2, "h4", 58);
    \u0275\u0275text(3, "Datos registrados");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, ClinicalTimelineComponent_Conditional_38_For_2_Conditional_24_Conditional_1_For_5_Template, 4, 2, "p", 59, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const encounter_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.getDynamicEntries(encounter_r7));
  }
}
function ClinicalTimelineComponent_Conditional_38_For_2_Conditional_24_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 59)(1, "strong");
    \u0275\u0275text(2, "Motivo:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const encounter_r7 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", encounter_r7.chiefComplaint);
  }
}
function ClinicalTimelineComponent_Conditional_38_For_2_Conditional_24_Conditional_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 59)(1, "strong");
    \u0275\u0275text(2, "Diagn\xF3stico:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const encounter_r7 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", encounter_r7.primaryDiagnosisDescription);
  }
}
function ClinicalTimelineComponent_Conditional_38_For_2_Conditional_24_Conditional_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 59)(1, "strong");
    \u0275\u0275text(2, "Plan:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const encounter_r7 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", encounter_r7.treatmentPlan);
  }
}
function ClinicalTimelineComponent_Conditional_38_For_2_Conditional_24_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "div", 57)(2, "h4", 58);
    \u0275\u0275text(3, "Registro hist\xF3rico");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, ClinicalTimelineComponent_Conditional_38_For_2_Conditional_24_Conditional_2_Conditional_4_Template, 4, 1, "p", 59);
    \u0275\u0275conditionalCreate(5, ClinicalTimelineComponent_Conditional_38_For_2_Conditional_24_Conditional_2_Conditional_5_Template, 4, 1, "p", 59);
    \u0275\u0275conditionalCreate(6, ClinicalTimelineComponent_Conditional_38_For_2_Conditional_24_Conditional_2_Conditional_6_Template, 4, 1, "p", 59);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const encounter_r7 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275conditional(encounter_r7.chiefComplaint ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(encounter_r7.primaryDiagnosisDescription ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(encounter_r7.treatmentPlan ? 6 : -1);
  }
}
function ClinicalTimelineComponent_Conditional_38_For_2_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275conditionalCreate(1, ClinicalTimelineComponent_Conditional_38_For_2_Conditional_24_Conditional_1_Template, 6, 0, "div", 56)(2, ClinicalTimelineComponent_Conditional_38_For_2_Conditional_24_Conditional_2_Template, 7, 3, "div", 56);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const encounter_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.getDynamicEntries(encounter_r7).length > 0 ? 1 : 2);
  }
}
function ClinicalTimelineComponent_Conditional_38_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 33)(1, "div", 34)(2, "div", 35);
    \u0275\u0275element(3, "ng-icon", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 36)(5, "div", 37);
    \u0275\u0275listener("click", function ClinicalTimelineComponent_Conditional_38_For_2_Template_div_click_5_listener() {
      const encounter_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleCard(encounter_r7.id));
    });
    \u0275\u0275elementStart(6, "div", 38)(7, "span", 39);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 40);
    \u0275\u0275element(10, "ng-icon", 41);
    \u0275\u0275elementStart(11, "strong");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(13, ClinicalTimelineComponent_Conditional_38_For_2_Conditional_13_Template, 2, 1, "span", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "button", 43);
    \u0275\u0275listener("click", function ClinicalTimelineComponent_Conditional_38_For_2_Template_button_click_16_listener($event) {
      const encounter_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.toggleCard(encounter_r7.id);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275element(17, "ng-icon", 44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 45);
    \u0275\u0275listener("click", function ClinicalTimelineComponent_Conditional_38_For_2_Template_div_click_18_listener() {
      const encounter_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleCard(encounter_r7.id));
    });
    \u0275\u0275elementStart(19, "div", 46)(20, "span", 47);
    \u0275\u0275text(21, "Resumen:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "strong", 48);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(24, ClinicalTimelineComponent_Conditional_38_For_2_Conditional_24_Template, 3, 1, "div", 49);
    \u0275\u0275elementStart(25, "div", 50);
    \u0275\u0275element(26, "div");
    \u0275\u0275elementStart(27, "div", 51)(28, "button", 52);
    \u0275\u0275listener("click", function ClinicalTimelineComponent_Conditional_38_For_2_Template_button_click_28_listener($event) {
      const encounter_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onViewCard(encounter_r7.id, $event));
    });
    \u0275\u0275element(29, "ng-icon", 53);
    \u0275\u0275elementStart(30, "span");
    \u0275\u0275text(31, "Ver detalle");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "button", 54);
    \u0275\u0275listener("click", function ClinicalTimelineComponent_Conditional_38_For_2_Template_button_click_32_listener($event) {
      const encounter_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onDeleteCard(encounter_r7.id, $event));
    });
    \u0275\u0275element(33, "ng-icon", 55);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const encounter_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("is-expanded", ctx_r1.isCardExpanded(encounter_r7.id));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("#C-", encounter_r7.id);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(encounter_r7.encounterDate));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.formatTime(encounter_r7.encounterDate) ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("consultation-type-badge ", ctx_r1.getConsultationTypeClass(encounter_r7.consultationType)));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getConsultationTypeLabel(encounter_r7.consultationType));
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r1.isCardExpanded(encounter_r7.id) ? "Colapsar registro" : "Expandir registro");
    \u0275\u0275advance();
    \u0275\u0275property("name", ctx_r1.isCardExpanded(encounter_r7.id) ? "lucideChevronUp" : "lucideChevronDown");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.getEncounterSummary(encounter_r7));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isCardExpanded(encounter_r7.id) ? 24 : -1);
  }
}
function ClinicalTimelineComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275repeaterCreate(1, ClinicalTimelineComponent_Conditional_38_For_2_Template, 34, 13, "article", 32, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.filteredEncounters());
  }
}
var ClinicalTimelineComponent = class _ClinicalTimelineComponent {
  canCreateEncounter = input.required(
    ...ngDevMode ? [{ debugName: "canCreateEncounter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  encounterRows = signal(
    [],
    ...ngDevMode ? [{ debugName: "encounterRows" }] : (
      /* istanbul ignore next */
      []
    )
  );
  set encounters(value) {
    this.encounterRows.set(value);
  }
  get encounters() {
    return this.encounterRows();
  }
  isLoading = false;
  newEncounter = new EventEmitter();
  viewDetail = new EventEmitter();
  deleteEncounter = new EventEmitter();
  printPrescription = new EventEmitter();
  // Track which timeline card accordions are expanded (default: top 2 expanded)
  expandedCardIds = signal(
    /* @__PURE__ */ new Set(),
    ...ngDevMode ? [{ debugName: "expandedCardIds" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasInitializedExpanded = false;
  fromDate = signal(
    "",
    ...ngDevMode ? [{ debugName: "fromDate" }] : (
      /* istanbul ignore next */
      []
    )
  );
  toDate = signal(
    "",
    ...ngDevMode ? [{ debugName: "toDate" }] : (
      /* istanbul ignore next */
      []
    )
  );
  datePreset = signal(
    "ALL",
    ...ngDevMode ? [{ debugName: "datePreset" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dateRangeError = computed(
    () => validIsoDate(this.fromDate()) && validIsoDate(this.toDate()) && this.fromDate() > this.toDate() ? "La fecha Desde no puede ser posterior a Hasta." : null,
    ...ngDevMode ? [{ debugName: "dateRangeError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasActiveDateFilter = computed(
    () => {
      return !!this.fromDate() || !!this.toDate() || this.datePreset() !== "ALL";
    },
    ...ngDevMode ? [{ debugName: "hasActiveDateFilter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  filteredEncounters = computed(
    () => {
      const list = this.encounters || [];
      const from = this.fromDate();
      const to = this.toDate();
      if (this.dateRangeError() || from && !validIsoDate(from) || to && !validIsoDate(to))
        return list;
      if (!from && !to) {
        return list;
      }
      return list.filter((enc) => {
        if (!enc.encounterDate)
          return false;
        const encDateStr = instantParts(enc.encounterDate).day;
        if (from && encDateStr < from)
          return false;
        if (to && encDateStr > to)
          return false;
        return true;
      });
    },
    ...ngDevMode ? [{ debugName: "filteredEncounters" }] : (
      /* istanbul ignore next */
      []
    )
  );
  createEncounter() {
    if (this.canCreateEncounter())
      this.newEncounter.emit();
  }
  setPreset(preset) {
    this.datePreset.set(preset);
    const toStr = todayDate();
    if (preset === "ALL") {
      this.fromDate.set("");
      this.toDate.set("");
      return;
    }
    if (preset === "LAST_30") {
      this.fromDate.set(shiftCalendarDate(todayDate(), -30));
      this.toDate.set(toStr);
      return;
    }
    if (preset === "LAST_90") {
      this.fromDate.set(shiftCalendarDate(todayDate(), -90));
      this.toDate.set(toStr);
      return;
    }
    if (preset === "THIS_YEAR") {
      const year = todayDate().slice(0, 4);
      this.fromDate.set(year + "-01-01");
      this.toDate.set(toStr);
      return;
    }
  }
  onFromDateValueChange(val) {
    this.datePreset.set("CUSTOM");
    this.fromDate.set(val);
  }
  onToDateValueChange(val) {
    this.datePreset.set("CUSTOM");
    this.toDate.set(val);
  }
  clearDateFilter() {
    this.fromDate.set("");
    this.toDate.set("");
    this.datePreset.set("ALL");
  }
  ngOnChanges(changes) {
    if (changes["encounters"] && this.encounters && this.encounters.length > 0) {
      const current = this.expandedCardIds();
      const hasAny = this.encounters.some((e) => current.has(e.id));
      if (!this.hasInitializedExpanded || !hasAny) {
        this.expandedCardIds.set(new Set(this.encounters.slice(0, 2).map((e) => e.id)));
        this.hasInitializedExpanded = true;
      }
    }
  }
  isCardExpanded(id) {
    return this.expandedCardIds().has(id);
  }
  toggleCard(id) {
    this.expandedCardIds.update((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }
  expandAll() {
    const allIds = new Set((this.encounters || []).map((e) => e.id));
    this.expandedCardIds.set(allIds);
  }
  collapseAll() {
    this.expandedCardIds.set(/* @__PURE__ */ new Set());
  }
  formatDate(dateStr) {
    return dateStr ? formatInstant(dateStr, false) : "\u2014";
  }
  formatTime(dateStr) {
    const time = instantParts(dateStr).time;
    return time ? time + " hs" : "";
  }
  getConsultationTypeLabel(type) {
    switch (type) {
      case "FIRST_VISIT":
        return "Primera Vez";
      case "FOLLOW_UP":
        return "Control";
      case "ROUTINE_CHECKUP":
        return "Chequeo General";
      case "EMERGENCY":
        return "Urgencia";
      case "INTERCONSULTATION":
        return "Interconsulta";
      default:
        return type || "Consulta";
    }
  }
  getConsultationTypeClass(type) {
    switch (type) {
      case "EMERGENCY":
        return "chip-emergency";
      case "FIRST_VISIT":
        return "chip-first-visit";
      default:
        return "chip-routine";
    }
  }
  getEncounterSummary(encounter) {
    return encounter.chiefComplaint || encounter.primaryDiagnosisDescription || wizardRecordEntries(encounter)[0]?.value || "Consulta registrada";
  }
  getDynamicEntries(encounter) {
    return wizardRecordEntries(encounter);
  }
  getBmiStatus(bmi) {
    if (!bmi)
      return { label: "Sin IMC", badgeClass: "bmi-neutral" };
    if (bmi < 18.5)
      return { label: `${bmi.toFixed(1)} (Bajo peso)`, badgeClass: "bmi-warning" };
    if (bmi < 25)
      return { label: `${bmi.toFixed(1)} (Normal)`, badgeClass: "bmi-success" };
    if (bmi < 30)
      return { label: `${bmi.toFixed(1)} (Sobrepeso)`, badgeClass: "bmi-warning" };
    return { label: `${bmi.toFixed(1)} (Obesidad)`, badgeClass: "bmi-danger" };
  }
  onPrintCard(encounter, event) {
    if (event)
      event.stopPropagation();
    this.printPrescription.emit(encounter);
  }
  onViewCard(id, event) {
    if (event)
      event.stopPropagation();
    this.viewDetail.emit(id);
  }
  onDeleteCard(id, event) {
    if (event)
      event.stopPropagation();
    this.deleteEncounter.emit(id);
  }
  static \u0275fac = function ClinicalTimelineComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ClinicalTimelineComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClinicalTimelineComponent, selectors: [["app-clinical-timeline"]], inputs: { canCreateEncounter: [1, "canCreateEncounter"], encounters: "encounters", isLoading: "isLoading" }, outputs: { newEncounter: "newEncounter", viewDetail: "viewDetail", deleteEncounter: "deleteEncounter", printPrescription: "printPrescription" }, features: [\u0275\u0275ProvidersFeature([
    provideIcons({
      lucideCalendar,
      lucideClock,
      lucideChevronDown,
      lucideChevronUp,
      lucideStethoscope,
      lucideActivity,
      lucidePill,
      lucideFileText,
      lucidePrinter,
      lucideEye,
      lucideTrash2,
      lucidePlus,
      lucideAlertCircle
    })
  ]), \u0275\u0275NgOnChangesFeature], decls: 39, vars: 17, consts: [["role", "feed", "aria-label", "L\xEDnea de tiempo de consultas m\xE9dicas", 1, "clinical-timeline-container"], [1, "timeline-toolbar"], [1, "toolbar-left"], [1, "accordion-quick-toggles"], ["type", "button", 1, "btn-toggle-subtle", 3, "click"], [1, "toggle-sep"], [1, "timeline-date-filter-group"], [1, "date-preset-chips"], ["type", "button", 1, "preset-chip", 3, "click"], [1, "date-inputs-range"], ["role", "alert", 1, "field-error"], [1, "date-input-label"], ["aria-label", "Filtrar consultas desde fecha", 1, "timeline-date-input", 3, "valueChange", "value"], ["aria-label", "Filtrar consultas hasta fecha", 1, "timeline-date-input", 3, "valueChange", "value"], ["type", "button", "title", "Quitar filtro de fechas", 1, "btn-clear-date-filter"], [1, "toolbar-right"], [1, "timeline-count-badge"], [1, "text-xs", "text-slate-500"], ["type", "button", 1, "btn-new-encounter-cta"], [1, "timeline-loading-card"], [1, "vertical-timeline-feed"], ["type", "button", "title", "Quitar filtro de fechas", 1, "btn-clear-date-filter", 3, "click"], ["type", "button", 1, "btn-new-encounter-cta", 3, "click"], ["name", "lucidePlus"], [1, "timeline-spinner"], [1, "timeline-empty-card"], [1, "empty-icon-circle"], ["name", "lucideCalendar"], ["type", "button", 1, "btn-toggle-subtle", "mt-2", 3, "click"], ["name", "lucideStethoscope"], ["type", "button", 1, "btn-new-encounter-cta", "mt-3"], ["type", "button", 1, "btn-new-encounter-cta", "mt-3", 3, "click"], [1, "timeline-entry", 3, "is-expanded"], [1, "timeline-entry"], [1, "timeline-node-marker"], [1, "node-icon-circle"], [1, "timeline-card"], [1, "card-header", 3, "click"], [1, "header-left"], [1, "encounter-code"], [1, "encounter-datetime"], ["name", "lucideCalendar", 1, "text-slate-400"], [1, "time-part"], ["type", "button", 1, "btn-chevron-toggle", 3, "click"], [3, "name"], [1, "card-diagnosis-strip", 3, "click"], [1, "diag-content"], [1, "diag-label"], [1, "diag-description"], [1, "card-soap-body", "animate-fade-in"], [1, "card-footer-actions"], [1, "actions-right"], ["type", "button", 1, "btn-action-view", 3, "click"], ["name", "lucideEye"], ["type", "button", "title", "Eliminar registro de historia cl\xEDnica", 1, "btn-action-delete", 3, "click"], ["name", "lucideTrash2"], [1, "soap-block", "block-s"], [1, "block-content"], [1, "block-title"], [1, "chief-complaint-full"]], template: function ClinicalTimelineComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "button", 4);
      \u0275\u0275listener("click", function ClinicalTimelineComponent_Template_button_click_4_listener() {
        return ctx.expandAll();
      });
      \u0275\u0275text(5, "Expandir todo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "span", 5);
      \u0275\u0275text(7, "|");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "button", 4);
      \u0275\u0275listener("click", function ClinicalTimelineComponent_Template_button_click_8_listener() {
        return ctx.collapseAll();
      });
      \u0275\u0275text(9, "Colapsar todo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 6)(11, "div", 7)(12, "button", 8);
      \u0275\u0275listener("click", function ClinicalTimelineComponent_Template_button_click_12_listener() {
        return ctx.setPreset("ALL");
      });
      \u0275\u0275text(13, " Todas ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "button", 8);
      \u0275\u0275listener("click", function ClinicalTimelineComponent_Template_button_click_14_listener() {
        return ctx.setPreset("LAST_30");
      });
      \u0275\u0275text(15, " 30 d\xEDas ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "button", 8);
      \u0275\u0275listener("click", function ClinicalTimelineComponent_Template_button_click_16_listener() {
        return ctx.setPreset("LAST_90");
      });
      \u0275\u0275text(17, " 90 d\xEDas ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "button", 8);
      \u0275\u0275listener("click", function ClinicalTimelineComponent_Template_button_click_18_listener() {
        return ctx.setPreset("THIS_YEAR");
      });
      \u0275\u0275text(19, " Este a\xF1o ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 9);
      \u0275\u0275conditionalCreate(21, ClinicalTimelineComponent_Conditional_21_Template, 2, 1, "span", 10);
      \u0275\u0275elementStart(22, "label", 11)(23, "span");
      \u0275\u0275text(24, "Desde");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "app-date-picker", 12);
      \u0275\u0275listener("valueChange", function ClinicalTimelineComponent_Template_app_date_picker_valueChange_25_listener($event) {
        return ctx.onFromDateValueChange($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "label", 11)(27, "span");
      \u0275\u0275text(28, "Hasta");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "app-date-picker", 13);
      \u0275\u0275listener("valueChange", function ClinicalTimelineComponent_Template_app_date_picker_valueChange_29_listener($event) {
        return ctx.onToDateValueChange($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(30, ClinicalTimelineComponent_Conditional_30_Template, 2, 0, "button", 14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(31, "div", 15)(32, "span", 16);
      \u0275\u0275text(33);
      \u0275\u0275conditionalCreate(34, ClinicalTimelineComponent_Conditional_34_Template, 2, 1, "span", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(35, ClinicalTimelineComponent_Conditional_35_Template, 4, 0, "button", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(36, ClinicalTimelineComponent_Conditional_36_Template, 4, 0, "div", 19)(37, ClinicalTimelineComponent_Conditional_37_Template, 2, 1)(38, ClinicalTimelineComponent_Conditional_38_Template, 3, 0, "div", 20);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_4_0;
      \u0275\u0275advance(12);
      \u0275\u0275classProp("active", ctx.datePreset() === "ALL");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.datePreset() === "LAST_30");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.datePreset() === "LAST_90");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.datePreset() === "THIS_YEAR");
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_4_0 = ctx.dateRangeError()) ? 21 : -1, tmp_4_0);
      \u0275\u0275advance(4);
      \u0275\u0275property("value", ctx.fromDate());
      \u0275\u0275advance(4);
      \u0275\u0275property("value", ctx.toDate());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.hasActiveDateFilter() ? 30 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2(" ", ctx.filteredEncounters().length, " ", ctx.filteredEncounters().length === 1 ? "registro" : "registros", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.hasActiveDateFilter() ? 34 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.canCreateEncounter() ? 35 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading ? 36 : ctx.filteredEncounters().length === 0 ? 37 : 38);
    }
  }, dependencies: [CommonModule, FormsModule, NgIcon, DatePickerComponent], styles: ['\n.clinical-timeline-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n  width: 100%;\n}\n.timeline-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.75rem 1rem;\n  background-color: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 0.75rem;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);\n}\n.toolbar-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1.25rem;\n  flex-wrap: wrap;\n}\n.filter-spec-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 0.5rem;\n  padding: 0.25rem 0.5rem;\n}\n.timeline-filter-select[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  font-size: 0.8125rem;\n  color: var(--%NS%dc-ink-secondary, #334155);\n  font-weight: 500;\n  outline: none;\n  cursor: pointer;\n}\n.accordion-quick-toggles[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.75rem;\n}\n.btn-toggle-subtle[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: var(--%NS%dc-teal-ink, #0d9488);\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0.2rem 0.4rem;\n  border-radius: 0.25rem;\n  transition: background-color 0.1s ease;\n}\n.btn-toggle-subtle[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-teal-surface, #f0fdfa);\n  text-decoration: underline;\n}\n.toggle-sep[_ngcontent-%COMP%] {\n  color: #cbd5e1;\n}\n.btn-new-encounter-cta[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.5rem 0.875rem;\n  background:\n    linear-gradient(\n      135deg,\n      #0d9488,\n      #0f766e);\n  color: #ffffff;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  box-shadow: 0 1px 3px rgba(13, 148, 136, 0.25);\n  transition: all 0.15s ease;\n}\n.btn-new-encounter-cta[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #0f766e,\n      #115e59);\n  transform: translateY(-1px);\n}\n.timeline-loading-card[_ngcontent-%COMP%], \n.timeline-empty-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3.5rem 2rem;\n  background-color: var(--%NS%dc-surface, #ffffff);\n  border: 1px dashed var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 0.75rem;\n  text-align: center;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.timeline-spinner[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: 3px solid var(--%NS%dc-outline, #e2e8f0);\n  border-top-color: #0d9488;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n  margin-bottom: 0.75rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.empty-icon-circle[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 50%;\n  background-color: var(--%NS%dc-teal-surface, #f0fdfa);\n  color: var(--%NS%dc-teal-ink, #0d9488);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.75rem;\n  margin-bottom: 0.75rem;\n}\n.vertical-timeline-feed[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  padding-left: 2.75rem;\n}\n.vertical-timeline-feed[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 1rem;\n  bottom: 1.5rem;\n  left: 1.25rem;\n  width: 2px;\n  background:\n    linear-gradient(\n      to bottom,\n      #0d9488,\n      #cbd5e1);\n  z-index: 1;\n}\n.timeline-entry[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n.timeline-node-marker[_ngcontent-%COMP%] {\n  position: absolute;\n  left: -2.75rem;\n  top: 0.75rem;\n  z-index: 2;\n}\n.node-icon-circle[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  background-color: var(--%NS%dc-surface, #ffffff);\n  border: 2px solid #0d9488;\n  color: var(--%NS%dc-teal-ink, #0d9488);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.125rem;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);\n}\n.timeline-card[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 0.75rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);\n  overflow: hidden;\n  transition: box-shadow 0.2s ease, border-color 0.2s ease;\n}\n.timeline-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--%NS%dc-outline, #cbd5e1);\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);\n}\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.875rem 1.25rem;\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  border-bottom: 1px solid var(--%NS%dc-outline, #f1f5f9);\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.625rem;\n  flex-wrap: wrap;\n}\n.encounter-code[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  background-color: var(--%NS%dc-surface-high, #e2e8f0);\n  padding: 0.15rem 0.4rem;\n  border-radius: 0.25rem;\n}\n.encounter-datetime[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  font-size: 0.8125rem;\n  color: var(--%NS%dc-ink-secondary, #334155);\n}\n.time-part[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink-muted, #64748b);\n  font-size: 0.75rem;\n}\n.specialty-badge[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  padding: 0.2rem 0.5rem;\n  border-radius: 9999px;\n}\n.badge-pediatrics[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-warning-surface, #fef3c7);\n  color: var(--%NS%dc-warning-ink, #92400e);\n}\n.badge-cardiology[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-error-surface, #fee2e2);\n  color: var(--%NS%dc-error-ink, #991b1b);\n}\n.badge-gynecology[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-pink-surface, #fce7f3);\n  color: var(--%NS%dc-pink-ink, #9d174d);\n}\n.badge-general[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-blue-surface, #e0f2fe);\n  color: var(--%NS%dc-blue-ink, #075985);\n}\n.badge-ophthalmology[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-purple-surface, #ede9fe);\n  color: var(--%NS%dc-purple-ink, #5b21b6);\n}\n.badge-psychiatry[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-purple-surface, #f3e8ff);\n  color: var(--%NS%dc-purple-ink, #6b21a8);\n}\n.badge-dermatology[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-warning-surface, #ffedd5);\n  color: var(--%NS%dc-warning-ink, #9a3412);\n}\n.badge-traumatology[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-teal-surface, #ccfbf1);\n  color: var(--%NS%dc-teal-ink, #115e59);\n}\n.consultation-type-badge[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  padding: 0.2rem 0.5rem;\n  border-radius: 0.375rem;\n}\n.chip-routine[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-surface-high, #f1f5f9);\n  color: var(--%NS%dc-ink-secondary, #475569);\n}\n.chip-first-visit[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-teal-surface, #ecfdf5);\n  color: var(--%NS%dc-teal-ink, #065f46);\n  border: 1px solid #a7f3d0;\n}\n.chip-emergency[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-error-surface, #fef2f2);\n  color: var(--%NS%dc-error-ink, #991b1b);\n  border: 1px solid #fecaca;\n}\n.btn-chevron-toggle[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  font-size: 1.125rem;\n  cursor: pointer;\n  padding: 0.25rem;\n  border-radius: 0.25rem;\n}\n.card-diagnosis-strip[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.75rem 1.25rem;\n  background-color: var(--%NS%dc-teal-surface, #f0fdfa);\n  border-bottom: 1px solid #ccfbf1;\n  cursor: pointer;\n  flex-wrap: wrap;\n}\n.diag-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.diag-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  color: var(--%NS%dc-teal-ink, #0f766e);\n  letter-spacing: 0.05em;\n}\n.diag-code-chip[_ngcontent-%COMP%] {\n  background-color: #0d9488;\n  color: #ffffff;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  padding: 0.15rem 0.45rem;\n  border-radius: 0.25rem;\n}\n.diag-description[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  color: var(--%NS%dc-teal-ink, #134e4a);\n}\n.diag-chief-complaint-preview[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  font-size: 0.8125rem;\n  color: var(--%NS%dc-ink-secondary, #475569);\n}\n.complaint-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.complaint-text[_ngcontent-%COMP%] {\n  font-style: italic;\n  max-width: 320px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.card-soap-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.875rem;\n  padding: 1.25rem;\n  background-color: var(--%NS%dc-surface, #ffffff);\n}\n.soap-block[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.875rem;\n  padding: 0.75rem;\n  border-radius: 0.5rem;\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  border: 1px solid var(--%NS%dc-outline, #f1f5f9);\n}\n.block-tag[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 800;\n  font-size: 0.75rem;\n  flex-shrink: 0;\n}\n.block-s[_ngcontent-%COMP%]   .block-tag[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-blue-surface, #dbeafe);\n  color: var(--%NS%dc-blue-ink, #1e40af);\n}\n.block-o[_ngcontent-%COMP%]   .block-tag[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-teal-surface, #d1fae5);\n  color: var(--%NS%dc-teal-ink, #065f46);\n}\n.block-p[_ngcontent-%COMP%]   .block-tag[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-teal-surface, #ccfbf1);\n  color: var(--%NS%dc-teal-ink, #0f766e);\n}\n.block-content[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  min-width: 0;\n}\n.block-title[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  color: var(--%NS%dc-ink-secondary, #475569);\n  letter-spacing: 0.025em;\n  margin-bottom: 0.35rem;\n}\n.chief-complaint-full[_ngcontent-%COMP%], \n.hpi-text[_ngcontent-%COMP%], \n.treatment-plan-text[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: var(--%NS%dc-ink-secondary, #334155);\n  line-height: 1.4;\n  margin: 0 0 0.25rem 0;\n}\n.vitals-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n  margin-top: 0.35rem;\n}\n.vital-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  background-color: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 0.375rem;\n  padding: 0.25rem 0.5rem;\n  font-size: 0.75rem;\n}\n.v-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.v-value[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.v-value[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.bmi-chip[_ngcontent-%COMP%] {\n  padding: 0.1rem 0.4rem;\n  border-radius: 0.25rem;\n  font-weight: 700;\n  font-size: 0.75rem;\n}\n.bmi-success[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-success-surface, #dcfce7);\n  color: var(--%NS%dc-success-ink, #166534);\n}\n.bmi-warning[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-warning-surface, #fef3c7);\n  color: var(--%NS%dc-warning-ink, #92400e);\n}\n.bmi-danger[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-error-surface, #fee2e2);\n  color: var(--%NS%dc-error-ink, #991b1b);\n}\n.bmi-neutral[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-surface-high, #f1f5f9);\n  color: var(--%NS%dc-ink-secondary, #475569);\n}\n.rx-items-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 0.5rem;\n  margin-top: 0.25rem;\n}\n.rx-item-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.5rem;\n  padding: 0.5rem 0.65rem;\n  background-color: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 0.375rem;\n}\n.rx-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.rx-drug-name[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.rx-posology[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--%NS%dc-ink-secondary, #475569);\n}\n.follow-up-box[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-warning-surface, #fef3c7);\n  border: 1px solid #fde68a;\n  border-radius: 0.375rem;\n  padding: 0.5rem 0.75rem;\n}\n.card-footer-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.625rem 1.25rem;\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  border-top: 1px solid var(--%NS%dc-outline, #e2e8f0);\n}\n.btn-action-print[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.35rem 0.75rem;\n  background-color: var(--%NS%dc-teal-surface, #f0fdfa);\n  border: 1px solid #99f6e4;\n  color: var(--%NS%dc-teal-ink, #0f766e);\n  font-size: 0.75rem;\n  font-weight: 600;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.btn-action-print[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-teal-surface, #ccfbf1);\n  color: var(--%NS%dc-teal-ink, #115e59);\n}\n.actions-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.btn-action-view[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.35rem 0.65rem;\n  background-color: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  color: var(--%NS%dc-ink-secondary, #334155);\n  font-size: 0.75rem;\n  font-weight: 600;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  transition: all 0.1s ease;\n}\n.btn-action-view[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-surface-high, #f1f5f9);\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.btn-action-delete[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.5rem;\n  background-color: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  color: var(--%NS%dc-error-ink, #ef4444);\n  font-size: 0.75rem;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  transition: all 0.1s ease;\n}\n.btn-action-delete[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-error-surface, #fee2e2);\n  border-color: #fca5a5;\n}\n.animate-fade-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.15s ease-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.timeline-date-filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.date-preset-chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.25rem;\n}\n.preset-chip[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.6rem;\n  border-radius: 9999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  color: var(--%NS%dc-ink-muted, #64748b);\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.preset-chip[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-surface-high, #f1f5f9);\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.preset-chip.active[_ngcontent-%COMP%] {\n  background-color: #006874;\n  color: #ffffff;\n  border-color: #006874;\n}\n.date-inputs-range[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.date-input-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.72rem;\n  font-weight: 500;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.timeline-date-input[_ngcontent-%COMP%] {\n  padding: 0.2rem 0.45rem;\n  font-size: 0.75rem;\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 6px;\n  color: var(--%NS%dc-ink, #1e293b);\n  background-color: var(--%NS%dc-surface, #ffffff);\n  outline: none;\n}\n.timeline-date-input[_ngcontent-%COMP%]:focus {\n  border-color: #006874;\n}\n.btn-clear-date-filter[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px dashed var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 6px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  color: var(--%NS%dc-error-ink, #dc2626);\n  padding: 0.2rem 0.45rem;\n  cursor: pointer;\n}\n.btn-clear-date-filter[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-error-surface, #fef2f2);\n  border-color: #f87171;\n}\n.toolbar-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.timeline-count-badge[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.field-error[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 6px;\n  color: var(--%NS%dc-error-ink, #b91c1c);\n  font-size: .8rem;\n}\n/*# sourceMappingURL=clinical-timeline.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClinicalTimelineComponent, [{
    type: Component,
    args: [{ selector: "app-clinical-timeline", standalone: true, imports: [CommonModule, FormsModule, NgIcon, DatePickerComponent], providers: [
      provideIcons({
        lucideCalendar,
        lucideClock,
        lucideChevronDown,
        lucideChevronUp,
        lucideStethoscope,
        lucideActivity,
        lucidePill,
        lucideFileText,
        lucidePrinter,
        lucideEye,
        lucideTrash2,
        lucidePlus,
        lucideAlertCircle
      })
    ], template: `<div class="clinical-timeline-container" role="feed" aria-label="L\xEDnea de tiempo de consultas m\xE9dicas">\r
  <div class="timeline-toolbar">\r
    <div class="toolbar-left">\r
      <div class="accordion-quick-toggles">\r
        <button type="button" class="btn-toggle-subtle" (click)="expandAll()">Expandir todo</button>\r
        <span class="toggle-sep">|</span>\r
        <button type="button" class="btn-toggle-subtle" (click)="collapseAll()">Colapsar todo</button>\r
      </div>\r
\r
      <!-- Date Filter Controls -->\r
      <div class="timeline-date-filter-group">\r
        <div class="date-preset-chips">\r
          <button\r
            type="button"\r
            class="preset-chip"\r
            [class.active]="datePreset() === 'ALL'"\r
            (click)="setPreset('ALL')"\r
          >\r
            Todas\r
          </button>\r
          <button\r
            type="button"\r
            class="preset-chip"\r
            [class.active]="datePreset() === 'LAST_30'"\r
            (click)="setPreset('LAST_30')"\r
          >\r
            30 d\xEDas\r
          </button>\r
          <button\r
            type="button"\r
            class="preset-chip"\r
            [class.active]="datePreset() === 'LAST_90'"\r
            (click)="setPreset('LAST_90')"\r
          >\r
            90 d\xEDas\r
          </button>\r
          <button\r
            type="button"\r
            class="preset-chip"\r
            [class.active]="datePreset() === 'THIS_YEAR'"\r
            (click)="setPreset('THIS_YEAR')"\r
          >\r
            Este a\xF1o\r
          </button>\r
        </div>\r
\r
        <div class="date-inputs-range">\r
          @if (dateRangeError(); as error) { <span class="field-error" role="alert">{{ error }}</span> }\r
          <label class="date-input-label">\r
            <span>Desde</span>\r
            <app-date-picker\r
              class="timeline-date-input"\r
              [value]="fromDate()"\r
              (valueChange)="onFromDateValueChange($event)"\r
              aria-label="Filtrar consultas desde fecha"\r
            />\r
          </label>\r
          <label class="date-input-label">\r
            <span>Hasta</span>\r
            <app-date-picker\r
              class="timeline-date-input"\r
              [value]="toDate()"\r
              (valueChange)="onToDateValueChange($event)"\r
              aria-label="Filtrar consultas hasta fecha"\r
            />\r
          </label>\r
          @if (hasActiveDateFilter()) {\r
            <button\r
              type="button"\r
              class="btn-clear-date-filter"\r
              (click)="clearDateFilter()"\r
              title="Quitar filtro de fechas"\r
            >\r
              \u2715 Limpiar\r
            </button>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="toolbar-right">\r
      <span class="timeline-count-badge">\r
        {{ filteredEncounters().length }} {{ filteredEncounters().length === 1 ? 'registro' : 'registros' }}\r
        @if (hasActiveDateFilter()) {\r
          <span class="text-xs text-slate-500">(de {{ encounters.length }})</span>\r
        }\r
      </span>\r
      @if (canCreateEncounter()) {\r
      <button type="button" class="btn-new-encounter-cta" (click)="createEncounter()">\r
        <ng-icon name="lucidePlus" /><span>+ Nueva historia cl\xEDnica</span>\r
      </button>\r
      }\r
    </div>\r
  </div>\r
\r
  @if (isLoading) {\r
    <div class="timeline-loading-card"><div class="timeline-spinner"></div><span>Cargando historia cl\xEDnica...</span></div>\r
  } @else if (filteredEncounters().length === 0) {\r
    @if (encounters.length > 0 && hasActiveDateFilter()) {\r
      <div class="timeline-empty-card">\r
        <div class="empty-icon-circle"><ng-icon name="lucideCalendar" /></div>\r
        <h3>No hay registros en el rango de fechas</h3>\r
        <p>No se encontraron registros en la historia cl\xEDnica entre las fechas seleccionadas.</p>\r
        <button type="button" class="btn-toggle-subtle mt-2" (click)="clearDateFilter()">Quitar filtro de fechas</button>\r
      </div>\r
    } @else {\r
      <div class="timeline-empty-card">\r
        <div class="empty-icon-circle"><ng-icon name="lucideStethoscope" /></div>\r
        <h3>Sin historias cl\xEDnicas registradas</h3>\r
        <p>No se encontraron registros previos en la historia cl\xEDnica.</p>\r
      @if (canCreateEncounter()) {\r
        <button type="button" class="btn-new-encounter-cta mt-3" (click)="createEncounter()"><ng-icon name="lucidePlus" /><span>+ Nueva historia cl\xEDnica</span></button>\r
      }\r
      </div>\r
    }\r
  } @else {\r
    <div class="vertical-timeline-feed">\r
      @for (encounter of filteredEncounters(); track encounter.id) {\r
        <article class="timeline-entry" [class.is-expanded]="isCardExpanded(encounter.id)">\r
          <div class="timeline-node-marker"><div class="node-icon-circle"><ng-icon name="lucideStethoscope" /></div></div>\r
          <div class="timeline-card">\r
            <div class="card-header" (click)="toggleCard(encounter.id)">\r
              <div class="header-left">\r
                <span class="encounter-code">#C-{{ encounter.id }}</span>\r
                <span class="encounter-datetime"><ng-icon name="lucideCalendar" class="text-slate-400" /><strong>{{ formatDate(encounter.encounterDate) }}</strong>@if (formatTime(encounter.encounterDate)) { <span class="time-part">{{ formatTime(encounter.encounterDate) }}</span> }</span>\r
                <span class="consultation-type-badge {{ getConsultationTypeClass(encounter.consultationType) }}">{{ getConsultationTypeLabel(encounter.consultationType) }}</span>\r
              </div>\r
              <button type="button" class="btn-chevron-toggle" (click)="toggleCard(encounter.id); $event.stopPropagation()" [attr.aria-label]="isCardExpanded(encounter.id) ? 'Colapsar registro' : 'Expandir registro'"><ng-icon [name]="isCardExpanded(encounter.id) ? 'lucideChevronUp' : 'lucideChevronDown'" /></button>\r
            </div>\r
            <div class="card-diagnosis-strip" (click)="toggleCard(encounter.id)"><div class="diag-content"><span class="diag-label">Resumen:</span><strong class="diag-description">{{ getEncounterSummary(encounter) }}</strong></div></div>\r
\r
            @if (isCardExpanded(encounter.id)) {\r
              <div class="card-soap-body animate-fade-in">\r
                @if (getDynamicEntries(encounter).length > 0) {\r
                  <div class="soap-block block-s"><div class="block-content"><h4 class="block-title">Datos registrados</h4>\r
                    @for (item of getDynamicEntries(encounter); track item.label) { <p class="chief-complaint-full"><strong>{{ item.label }}:</strong> {{ item.value }}</p> }\r
                  </div></div>\r
                } @else {\r
                  <div class="soap-block block-s"><div class="block-content"><h4 class="block-title">Registro hist\xF3rico</h4>\r
                    @if (encounter.chiefComplaint) { <p class="chief-complaint-full"><strong>Motivo:</strong> {{ encounter.chiefComplaint }}</p> }\r
                    @if (encounter.primaryDiagnosisDescription) { <p class="chief-complaint-full"><strong>Diagn\xF3stico:</strong> {{ encounter.primaryDiagnosisDescription }}</p> }\r
                    @if (encounter.treatmentPlan) { <p class="chief-complaint-full"><strong>Plan:</strong> {{ encounter.treatmentPlan }}</p> }\r
                  </div></div>\r
                }\r
              </div>\r
            }\r
            <div class="card-footer-actions"><div></div><div class="actions-right">\r
              <button type="button" class="btn-action-view" (click)="onViewCard(encounter.id, $event)"><ng-icon name="lucideEye" /><span>Ver detalle</span></button>\r
              <button type="button" class="btn-action-delete" (click)="onDeleteCard(encounter.id, $event)" title="Eliminar registro de historia cl\xEDnica"><ng-icon name="lucideTrash2" /></button>\r
            </div></div>\r
          </div>\r
        </article>\r
      }\r
    </div>\r
  }\r
</div>\r
`, styles: ['/* src/app/features/patient-record/clinical-timeline/clinical-timeline.component.css */\n.clinical-timeline-container {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n  width: 100%;\n}\n.timeline-toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.75rem 1rem;\n  background-color: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 0.75rem;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);\n}\n.toolbar-left {\n  display: flex;\n  align-items: center;\n  gap: 1.25rem;\n  flex-wrap: wrap;\n}\n.filter-spec-wrapper {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  background-color: var(--dc-surface-low, #f8fafc);\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  border-radius: 0.5rem;\n  padding: 0.25rem 0.5rem;\n}\n.timeline-filter-select {\n  border: none;\n  background: transparent;\n  font-size: 0.8125rem;\n  color: var(--dc-ink-secondary, #334155);\n  font-weight: 500;\n  outline: none;\n  cursor: pointer;\n}\n.accordion-quick-toggles {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.75rem;\n}\n.btn-toggle-subtle {\n  border: none;\n  background: transparent;\n  color: var(--dc-teal-ink, #0d9488);\n  font-weight: 600;\n  cursor: pointer;\n  padding: 0.2rem 0.4rem;\n  border-radius: 0.25rem;\n  transition: background-color 0.1s ease;\n}\n.btn-toggle-subtle:hover {\n  background-color: var(--dc-teal-surface, #f0fdfa);\n  text-decoration: underline;\n}\n.toggle-sep {\n  color: #cbd5e1;\n}\n.btn-new-encounter-cta {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.5rem 0.875rem;\n  background:\n    linear-gradient(\n      135deg,\n      #0d9488,\n      #0f766e);\n  color: #ffffff;\n  font-size: 0.8125rem;\n  font-weight: 600;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  box-shadow: 0 1px 3px rgba(13, 148, 136, 0.25);\n  transition: all 0.15s ease;\n}\n.btn-new-encounter-cta:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #0f766e,\n      #115e59);\n  transform: translateY(-1px);\n}\n.timeline-loading-card,\n.timeline-empty-card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3.5rem 2rem;\n  background-color: var(--dc-surface, #ffffff);\n  border: 1px dashed var(--dc-outline, #cbd5e1);\n  border-radius: 0.75rem;\n  text-align: center;\n  color: var(--dc-ink-muted, #64748b);\n}\n.timeline-spinner {\n  width: 32px;\n  height: 32px;\n  border: 3px solid var(--dc-outline, #e2e8f0);\n  border-top-color: #0d9488;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n  margin-bottom: 0.75rem;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.empty-icon-circle {\n  width: 52px;\n  height: 52px;\n  border-radius: 50%;\n  background-color: var(--dc-teal-surface, #f0fdfa);\n  color: var(--dc-teal-ink, #0d9488);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.75rem;\n  margin-bottom: 0.75rem;\n}\n.vertical-timeline-feed {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  padding-left: 2.75rem;\n}\n.vertical-timeline-feed::before {\n  content: "";\n  position: absolute;\n  top: 1rem;\n  bottom: 1.5rem;\n  left: 1.25rem;\n  width: 2px;\n  background:\n    linear-gradient(\n      to bottom,\n      #0d9488,\n      #cbd5e1);\n  z-index: 1;\n}\n.timeline-entry {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n.timeline-node-marker {\n  position: absolute;\n  left: -2.75rem;\n  top: 0.75rem;\n  z-index: 2;\n}\n.node-icon-circle {\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  background-color: var(--dc-surface, #ffffff);\n  border: 2px solid #0d9488;\n  color: var(--dc-teal-ink, #0d9488);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.125rem;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);\n}\n.timeline-card {\n  background-color: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 0.75rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);\n  overflow: hidden;\n  transition: box-shadow 0.2s ease, border-color 0.2s ease;\n}\n.timeline-card:hover {\n  border-color: var(--dc-outline, #cbd5e1);\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);\n}\n.card-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.875rem 1.25rem;\n  background-color: var(--dc-surface-low, #f8fafc);\n  border-bottom: 1px solid var(--dc-outline, #f1f5f9);\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.header-left {\n  display: flex;\n  align-items: center;\n  gap: 0.625rem;\n  flex-wrap: wrap;\n}\n.encounter-code {\n  font-size: 0.6875rem;\n  font-weight: 700;\n  color: var(--dc-ink-muted, #64748b);\n  background-color: var(--dc-surface-high, #e2e8f0);\n  padding: 0.15rem 0.4rem;\n  border-radius: 0.25rem;\n}\n.encounter-datetime {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  font-size: 0.8125rem;\n  color: var(--dc-ink-secondary, #334155);\n}\n.time-part {\n  color: var(--dc-ink-muted, #64748b);\n  font-size: 0.75rem;\n}\n.specialty-badge {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  padding: 0.2rem 0.5rem;\n  border-radius: 9999px;\n}\n.badge-pediatrics {\n  background-color: var(--dc-warning-surface, #fef3c7);\n  color: var(--dc-warning-ink, #92400e);\n}\n.badge-cardiology {\n  background-color: var(--dc-error-surface, #fee2e2);\n  color: var(--dc-error-ink, #991b1b);\n}\n.badge-gynecology {\n  background-color: var(--dc-pink-surface, #fce7f3);\n  color: var(--dc-pink-ink, #9d174d);\n}\n.badge-general {\n  background-color: var(--dc-blue-surface, #e0f2fe);\n  color: var(--dc-blue-ink, #075985);\n}\n.badge-ophthalmology {\n  background-color: var(--dc-purple-surface, #ede9fe);\n  color: var(--dc-purple-ink, #5b21b6);\n}\n.badge-psychiatry {\n  background-color: var(--dc-purple-surface, #f3e8ff);\n  color: var(--dc-purple-ink, #6b21a8);\n}\n.badge-dermatology {\n  background-color: var(--dc-warning-surface, #ffedd5);\n  color: var(--dc-warning-ink, #9a3412);\n}\n.badge-traumatology {\n  background-color: var(--dc-teal-surface, #ccfbf1);\n  color: var(--dc-teal-ink, #115e59);\n}\n.consultation-type-badge {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  padding: 0.2rem 0.5rem;\n  border-radius: 0.375rem;\n}\n.chip-routine {\n  background-color: var(--dc-surface-high, #f1f5f9);\n  color: var(--dc-ink-secondary, #475569);\n}\n.chip-first-visit {\n  background-color: var(--dc-teal-surface, #ecfdf5);\n  color: var(--dc-teal-ink, #065f46);\n  border: 1px solid #a7f3d0;\n}\n.chip-emergency {\n  background-color: var(--dc-error-surface, #fef2f2);\n  color: var(--dc-error-ink, #991b1b);\n  border: 1px solid #fecaca;\n}\n.btn-chevron-toggle {\n  background: transparent;\n  border: none;\n  color: var(--dc-ink-muted, #64748b);\n  font-size: 1.125rem;\n  cursor: pointer;\n  padding: 0.25rem;\n  border-radius: 0.25rem;\n}\n.card-diagnosis-strip {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.75rem 1.25rem;\n  background-color: var(--dc-teal-surface, #f0fdfa);\n  border-bottom: 1px solid #ccfbf1;\n  cursor: pointer;\n  flex-wrap: wrap;\n}\n.diag-content {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.diag-label {\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  color: var(--dc-teal-ink, #0f766e);\n  letter-spacing: 0.05em;\n}\n.diag-code-chip {\n  background-color: #0d9488;\n  color: #ffffff;\n  font-size: 0.6875rem;\n  font-weight: 700;\n  padding: 0.15rem 0.45rem;\n  border-radius: 0.25rem;\n}\n.diag-description {\n  font-size: 0.9375rem;\n  color: var(--dc-teal-ink, #134e4a);\n}\n.diag-chief-complaint-preview {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n  font-size: 0.8125rem;\n  color: var(--dc-ink-secondary, #475569);\n}\n.complaint-label {\n  font-weight: 600;\n  color: var(--dc-ink-muted, #64748b);\n}\n.complaint-text {\n  font-style: italic;\n  max-width: 320px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.card-soap-body {\n  display: flex;\n  flex-direction: column;\n  gap: 0.875rem;\n  padding: 1.25rem;\n  background-color: var(--dc-surface, #ffffff);\n}\n.soap-block {\n  display: flex;\n  gap: 0.875rem;\n  padding: 0.75rem;\n  border-radius: 0.5rem;\n  background-color: var(--dc-surface-low, #f8fafc);\n  border: 1px solid var(--dc-outline, #f1f5f9);\n}\n.block-tag {\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 800;\n  font-size: 0.75rem;\n  flex-shrink: 0;\n}\n.block-s .block-tag {\n  background-color: var(--dc-blue-surface, #dbeafe);\n  color: var(--dc-blue-ink, #1e40af);\n}\n.block-o .block-tag {\n  background-color: var(--dc-teal-surface, #d1fae5);\n  color: var(--dc-teal-ink, #065f46);\n}\n.block-p .block-tag {\n  background-color: var(--dc-teal-surface, #ccfbf1);\n  color: var(--dc-teal-ink, #0f766e);\n}\n.block-content {\n  flex: 1 1 auto;\n  min-width: 0;\n}\n.block-title {\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  color: var(--dc-ink-secondary, #475569);\n  letter-spacing: 0.025em;\n  margin-bottom: 0.35rem;\n}\n.chief-complaint-full,\n.hpi-text,\n.treatment-plan-text {\n  font-size: 0.8125rem;\n  color: var(--dc-ink-secondary, #334155);\n  line-height: 1.4;\n  margin: 0 0 0.25rem 0;\n}\n.vitals-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n  margin-top: 0.35rem;\n}\n.vital-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  background-color: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 0.375rem;\n  padding: 0.25rem 0.5rem;\n  font-size: 0.75rem;\n}\n.v-label {\n  font-weight: 600;\n  color: var(--dc-ink-muted, #64748b);\n}\n.v-value {\n  font-weight: 700;\n  color: var(--dc-ink, #0f172a);\n}\n.v-value small {\n  font-weight: 400;\n  color: var(--dc-ink-muted, #64748b);\n}\n.bmi-chip {\n  padding: 0.1rem 0.4rem;\n  border-radius: 0.25rem;\n  font-weight: 700;\n  font-size: 0.75rem;\n}\n.bmi-success {\n  background-color: var(--dc-success-surface, #dcfce7);\n  color: var(--dc-success-ink, #166534);\n}\n.bmi-warning {\n  background-color: var(--dc-warning-surface, #fef3c7);\n  color: var(--dc-warning-ink, #92400e);\n}\n.bmi-danger {\n  background-color: var(--dc-error-surface, #fee2e2);\n  color: var(--dc-error-ink, #991b1b);\n}\n.bmi-neutral {\n  background-color: var(--dc-surface-high, #f1f5f9);\n  color: var(--dc-ink-secondary, #475569);\n}\n.rx-items-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 0.5rem;\n  margin-top: 0.25rem;\n}\n.rx-item-card {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.5rem;\n  padding: 0.5rem 0.65rem;\n  background-color: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 0.375rem;\n}\n.rx-info {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.rx-drug-name {\n  font-size: 0.8125rem;\n  color: var(--dc-ink, #0f172a);\n}\n.rx-posology {\n  font-size: 0.75rem;\n  color: var(--dc-ink-secondary, #475569);\n}\n.follow-up-box {\n  background-color: var(--dc-warning-surface, #fef3c7);\n  border: 1px solid #fde68a;\n  border-radius: 0.375rem;\n  padding: 0.5rem 0.75rem;\n}\n.card-footer-actions {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.625rem 1.25rem;\n  background-color: var(--dc-surface-low, #f8fafc);\n  border-top: 1px solid var(--dc-outline, #e2e8f0);\n}\n.btn-action-print {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.35rem 0.75rem;\n  background-color: var(--dc-teal-surface, #f0fdfa);\n  border: 1px solid #99f6e4;\n  color: var(--dc-teal-ink, #0f766e);\n  font-size: 0.75rem;\n  font-weight: 600;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.btn-action-print:hover {\n  background-color: var(--dc-teal-surface, #ccfbf1);\n  color: var(--dc-teal-ink, #115e59);\n}\n.actions-right {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.btn-action-view {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.35rem 0.65rem;\n  background-color: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  color: var(--dc-ink-secondary, #334155);\n  font-size: 0.75rem;\n  font-weight: 600;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  transition: all 0.1s ease;\n}\n.btn-action-view:hover {\n  background-color: var(--dc-surface-high, #f1f5f9);\n  color: var(--dc-ink, #0f172a);\n}\n.btn-action-delete {\n  padding: 0.35rem 0.5rem;\n  background-color: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  color: var(--dc-error-ink, #ef4444);\n  font-size: 0.75rem;\n  border-radius: 0.375rem;\n  cursor: pointer;\n  transition: all 0.1s ease;\n}\n.btn-action-delete:hover {\n  background-color: var(--dc-error-surface, #fee2e2);\n  border-color: #fca5a5;\n}\n.animate-fade-in {\n  animation: fadeIn 0.15s ease-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(-4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.timeline-date-filter-group {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.date-preset-chips {\n  display: flex;\n  gap: 0.25rem;\n}\n.preset-chip {\n  padding: 0.25rem 0.6rem;\n  border-radius: 9999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  background-color: var(--dc-surface-low, #f8fafc);\n  color: var(--dc-ink-muted, #64748b);\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.preset-chip:hover {\n  background-color: var(--dc-surface-high, #f1f5f9);\n  color: var(--dc-ink, #0f172a);\n}\n.preset-chip.active {\n  background-color: #006874;\n  color: #ffffff;\n  border-color: #006874;\n}\n.date-inputs-range {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.date-input-label {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.72rem;\n  font-weight: 500;\n  color: var(--dc-ink-muted, #64748b);\n}\n.timeline-date-input {\n  padding: 0.2rem 0.45rem;\n  font-size: 0.75rem;\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  border-radius: 6px;\n  color: var(--dc-ink, #1e293b);\n  background-color: var(--dc-surface, #ffffff);\n  outline: none;\n}\n.timeline-date-input:focus {\n  border-color: #006874;\n}\n.btn-clear-date-filter {\n  background: transparent;\n  border: 1px dashed var(--dc-outline, #cbd5e1);\n  border-radius: 6px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  color: var(--dc-error-ink, #dc2626);\n  padding: 0.2rem 0.45rem;\n  cursor: pointer;\n}\n.btn-clear-date-filter:hover {\n  background-color: var(--dc-error-surface, #fef2f2);\n  border-color: #f87171;\n}\n.toolbar-right {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.timeline-count-badge {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--dc-ink-muted, #64748b);\n}\n.field-error {\n  display: block;\n  margin-top: 6px;\n  color: var(--dc-error-ink, #b91c1c);\n  font-size: .8rem;\n}\n/*# sourceMappingURL=clinical-timeline.component.css.map */\n'] }]
  }], null, { canCreateEncounter: [{ type: Input, args: [{ isSignal: true, alias: "canCreateEncounter", required: true }] }], encounters: [{
    type: Input
  }], isLoading: [{
    type: Input
  }], newEncounter: [{
    type: Output
  }], viewDetail: [{
    type: Output
  }], deleteEncounter: [{
    type: Output
  }], printPrescription: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClinicalTimelineComponent, { className: "ClinicalTimelineComponent", filePath: "src/app/features/patient-record/clinical-timeline/clinical-timeline.component.ts", lineNumber: 61 });
})();

// src/app/features/encounter-form/encounter-form.component.ts
var _forTrack03 = ($index, $item) => $item.value;
function EncounterFormComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.patientName());
  }
}
function EncounterFormComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.errorMessage());
  }
}
function EncounterFormComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275element(1, "div", 31);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cargando formulario de historia cl\xEDnica...");
    \u0275\u0275elementEnd()();
  }
}
function EncounterFormComponent_Conditional_15_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 32);
    \u0275\u0275listener("click", function EncounterFormComponent_Conditional_15_Conditional_5_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.useRemoteWorkspace());
    });
    \u0275\u0275text(3, " Usar formulario actual y conservar respuestas compatibles ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx.specialty.name, ". Se conservar\xE1n solo los campos compatibles.");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.isLoading());
  }
}
function EncounterFormComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "p");
    \u0275\u0275text(2, "Tu configuraci\xF3n activa cambi\xF3. Las respuestas ingresadas se conservan hasta que revises el formulario actual.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 32);
    \u0275\u0275listener("click", function EncounterFormComponent_Conditional_15_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.reviewRemote());
    });
    \u0275\u0275text(4, " Consultar configuraci\xF3n actual ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, EncounterFormComponent_Conditional_15_Conditional_5_Template, 4, 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.isLoading());
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_2_0 = ctx_r0.remoteWorkspace()) ? 5 : -1, tmp_2_0);
  }
}
function EncounterFormComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 35);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 36);
    \u0275\u0275element(3, "path", 37)(4, "polyline", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "Primera consulta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 39);
    \u0275\u0275text(8, "\xDAnica opci\xF3n");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "span", 40);
    \u0275\u0275text(10, " Al no contar con atenciones registradas previas, esta historia cl\xEDnica queda fijada autom\xE1ticamente como Primera Consulta. ");
    \u0275\u0275elementEnd();
  }
}
function EncounterFormComponent_Conditional_36_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 43);
    \u0275\u0275element(1, "polyline", 44);
    \u0275\u0275elementEnd();
  }
}
function EncounterFormComponent_Conditional_36_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
    \u0275\u0275listener("click", function EncounterFormComponent_Conditional_36_For_2_Template_button_click_0_listener() {
      const type_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectConsultationType(type_r5.value));
    });
    \u0275\u0275conditionalCreate(1, EncounterFormComponent_Conditional_36_For_2_Conditional_1_Template, 2, 0, "svg", 43);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const type_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r0.consultationType() === type_r5.value);
    \u0275\u0275property("disabled", ctx_r0.readonly());
    \u0275\u0275attribute("aria-checked", ctx_r0.consultationType() === type_r5.value);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.consultationType() === type_r5.value ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(type_r5.label);
  }
}
function EncounterFormComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275repeaterCreate(1, EncounterFormComponent_Conditional_36_For_2_Template, 4, 6, "button", 41, _forTrack03);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 23);
    \u0275\u0275text(4, "Seleccion\xE1 una sola opci\xF3n horizontal para clasificar esta atenci\xF3n.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.availableConsultationTypes());
  }
}
function EncounterFormComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "app-dynamic-form-renderer", 45);
    \u0275\u0275listener("valuesChange", function EncounterFormComponent_Conditional_37_Template_app_dynamic_form_renderer_valuesChange_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDynamicDataChange($event));
    })("validityChange", function EncounterFormComponent_Conditional_37_Template_app_dynamic_form_renderer_validityChange_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDynamicFormValidityChange($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("definition", ctx)("values", ctx_r0.dynamicFormData())("readonly", ctx_r0.readonly());
  }
}
function EncounterFormComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "p");
    \u0275\u0275text(2, "El formulario de historia cl\xEDnica no est\xE1 disponible.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 46);
    \u0275\u0275listener("click", function EncounterFormComponent_Conditional_38_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.loadForm());
    });
    \u0275\u0275text(4, "Volver a cargar");
    \u0275\u0275elementEnd()();
  }
}
var EncounterFormComponent = class _EncounterFormComponent {
  encounterService = inject(ClinicalEncounterService);
  workspaceStore = inject(WorkspaceStore);
  auth = inject(AuthService);
  historyStore = inject(PatientEncountersStore, { optional: true });
  epoch = 0;
  destroyed = false;
  owner = "";
  contextPatient = null;
  patientId = input.required(
    ...ngDevMode ? [{ debugName: "patientId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  patientName = input(
    "",
    ...ngDevMode ? [{ debugName: "patientName" }] : (
      /* istanbul ignore next */
      []
    )
  );
  previousEncountersCount = input(
    0,
    ...ngDevMode ? [{ debugName: "previousEncountersCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  cancel = output();
  encounterCreated = output();
  consultationType = signal(
    "FIRST_VISIT",
    ...ngDevMode ? [{ debugName: "consultationType" }] : (
      /* istanbul ignore next */
      []
    )
  );
  clock = inject(UserClockService);
  get timeZone() {
    return this.clock.timeZone();
  }
  recordedInstant = signal(
    (/* @__PURE__ */ new Date()).toISOString(),
    ...ngDevMode ? [{ debugName: "recordedInstant" }] : (
      /* istanbul ignore next */
      []
    )
  );
  encounterDay = computed(
    () => {
      try {
        return userDateTime(this.recordedInstant()).day;
      } catch {
        return "";
      }
    },
    ...ngDevMode ? [{ debugName: "encounterDay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  encounterTime = computed(
    () => {
      try {
        return userDateTime(this.recordedInstant()).time;
      } catch {
        return "";
      }
    },
    ...ngDevMode ? [{ debugName: "encounterTime" }] : (
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
  workspace = signal(
    null,
    ...ngDevMode ? [{ debugName: "workspace" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dynamicFormData = signal(
    {},
    ...ngDevMode ? [{ debugName: "dynamicFormData" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isDynamicFormValid = signal(
    false,
    ...ngDevMode ? [{ debugName: "isDynamicFormValid" }] : (
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
  errorMessage = signal(
    null,
    ...ngDevMode ? [{ debugName: "errorMessage" }] : (
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
  remoteWorkspace = signal(
    null,
    ...ngDevMode ? [{ debugName: "remoteWorkspace" }] : (
      /* istanbul ignore next */
      []
    )
  );
  formattedCurrentDateTime = computed(
    () => {
      const instant = this.recordedInstant();
      if (!instant)
        return "";
      try {
        const parts = userDateTime(instant);
        const match = parts.day.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!match)
          return `${parts.day} ${parts.time} hs`;
        return `${match[3]}/${match[2]}/${match[1]} a las ${parts.time} hs`;
      } catch {
        return instant;
      }
    },
    ...ngDevMode ? [{ debugName: "formattedCurrentDateTime" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readonly = computed(
    () => this.isLoading() || this.isSubmitting() || this.hasConflict() || this.identity() !== this.owner || this.patientId() !== this.contextPatient,
    ...ngDevMode ? [{ debugName: "readonly" }] : (
      /* istanbul ignore next */
      []
    )
  );
  allConsultationTypes = [
    { value: "FIRST_VISIT", label: "Primera consulta" },
    { value: "FOLLOW_UP", label: "Control / seguimiento" },
    { value: "ROUTINE_CHECKUP", label: "Chequeo de rutina" },
    { value: "EMERGENCY", label: "Urgencia" },
    { value: "INTERCONSULTATION", label: "Interconsulta" }
  ];
  isFirstVisitLocked = computed(
    () => this.previousEncountersCount() <= 0,
    ...ngDevMode ? [{ debugName: "isFirstVisitLocked" }] : (
      /* istanbul ignore next */
      []
    )
  );
  availableConsultationTypes = computed(
    () => {
      if (this.isFirstVisitLocked()) {
        return this.allConsultationTypes.filter((type) => type.value === "FIRST_VISIT");
      }
      return this.allConsultationTypes.filter((type) => type.value !== "FIRST_VISIT");
    },
    ...ngDevMode ? [{ debugName: "availableConsultationTypes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  get consultationTypes() {
    return this.availableConsultationTypes();
  }
  selectConsultationType(type) {
    if (this.readonly() || this.isFirstVisitLocked()) {
      return;
    }
    this.consultationType.set(type);
    this.historyStore?.setEncounterDraft(this.dynamicFormData(), type, this.recordedInstant());
  }
  constructor() {
    effect(() => {
      const isLocked = this.isFirstVisitLocked();
      untracked(() => {
        if (isLocked) {
          this.consultationType.set("FIRST_VISIT");
        } else if (this.consultationType() === "FIRST_VISIT") {
          this.consultationType.set("FOLLOW_UP");
        }
      });
    });
    effect(() => {
      const patientId = this.patientId();
      const identity2 = this.identity();
      untracked(() => {
        this.epoch++;
        this.owner = identity2;
        this.contextPatient = patientId;
        this.isLoading.set(false);
        this.isSubmitting.set(false);
        this.resetForm();
        if (patientId) {
          void this.loadForm();
        }
      });
    });
  }
  ngOnInit() {
    if (!this.definition()) {
      this.resetForm();
      void this.loadForm();
    }
  }
  ngOnDestroy() {
    this.destroyed = true;
    this.epoch++;
  }
  async loadForm() {
    const patientId = this.patientId();
    if (!patientId || this.isLoading() || this.isSubmitting() || this.identity() !== this.owner || patientId !== this.contextPatient) {
      return;
    }
    const epoch = this.epoch;
    this.isLoading.set(true);
    this.errorMessage.set(null);
    try {
      const workspace = await this.workspaceStore.loadSetup();
      if (!this.alive(epoch))
        return;
      if (!workspace?.onboardingCompleted || !workspace.definition) {
        throw new Error("El formulario cl\xEDnico no est\xE1 disponible.");
      }
      this.workspace.set(structuredClone(workspace));
      this.definition.set(structuredClone(workspace.definition.encounterForm));
    } catch (error) {
      if (this.alive(epoch)) {
        this.errorMessage.set(errorMessage(error, "No pudimos cargar el formulario de historia cl\xEDnica."));
      }
    } finally {
      if (this.alive(epoch)) {
        this.isLoading.set(false);
      }
    }
  }
  onDynamicDataChange(values) {
    if (!this.readonly()) {
      this.dynamicFormData.set(structuredClone(values));
      this.historyStore?.setEncounterDraft(values, this.consultationType(), this.recordedInstant());
    }
  }
  onDynamicFormValidityChange(valid) {
    this.isDynamicFormValid.set(valid);
  }
  async submitEncounter() {
    const workspace = this.workspace();
    const definition = this.definition();
    const patientId = this.patientId();
    if (!workspace || !definition || !patientId || !this.isDynamicFormValid() || this.readonly()) {
      return;
    }
    const epoch = this.epoch;
    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    const effectiveConsultationType = this.isFirstVisitLocked() ? "FIRST_VISIT" : this.consultationType() === "FIRST_VISIT" ? "FOLLOW_UP" : this.consultationType();
    try {
      const created = await firstValueFrom(this.encounterService.create({
        patientId,
        workspaceVersion: workspace.version,
        consultationType: effectiveConsultationType,
        values: inputValues(definition, this.dynamicFormData())
      }));
      if (!this.alive(epoch))
        return;
      if (created.patientId !== patientId) {
        throw new Error("La consulta recibida corresponde a otro paciente.");
      }
      this.historyStore?.clearEncounterDraft();
      this.encounterCreated.emit(created);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("encounter-created", { detail: created }));
      }
      this.isSubmitting.set(false);
      this.definition.set(null);
      this.epoch++;
    } catch (error) {
      if (this.alive(epoch)) {
        this.hasConflict.set(!!conflictKind(error));
        this.errorMessage.set(errorMessage(error, "No pudimos guardar la historia cl\xEDnica. Tus respuestas se conservan."));
      }
    } finally {
      if (epoch === this.epoch && !this.destroyed) {
        this.isSubmitting.set(false);
      }
    }
  }
  async reviewRemote() {
    if (!this.hasConflict() || this.isLoading() || this.isSubmitting() || this.identity() !== this.owner || this.patientId() !== this.contextPatient) {
      return;
    }
    const epoch = this.epoch;
    this.isLoading.set(true);
    this.remoteWorkspace.set(null);
    try {
      const remote = await this.workspaceStore.loadSetup(true);
      if (this.alive(epoch) && remote?.onboardingCompleted && remote.definition) {
        this.remoteWorkspace.set(structuredClone(remote));
      }
    } catch (error) {
      if (this.alive(epoch)) {
        this.errorMessage.set(errorMessage(error, "No pudimos consultar la configuraci\xF3n actual."));
      }
    } finally {
      if (this.alive(epoch)) {
        this.isLoading.set(false);
      }
    }
  }
  useRemoteWorkspace() {
    const remote = this.remoteWorkspace();
    const previous = this.definition();
    if (!remote?.definition || !previous || this.isLoading() || this.isSubmitting() || this.identity() !== this.owner || this.patientId() !== this.contextPatient) {
      return;
    }
    this.dynamicFormData.set(retainCompatibleValues(previous, remote.definition.encounterForm, this.dynamicFormData()));
    this.workspace.set(structuredClone(remote));
    this.definition.set(structuredClone(remote.definition.encounterForm));
    this.hasConflict.set(false);
    this.remoteWorkspace.set(null);
    this.errorMessage.set(null);
  }
  resetForm(force = false) {
    this.workspace.set(null);
    this.definition.set(null);
    this.errorMessage.set(null);
    this.hasConflict.set(false);
    this.remoteWorkspace.set(null);
    const draftValues = !force ? this.historyStore?.encounterDraftValues() : null;
    const draftType = !force ? this.historyStore?.encounterDraftConsultationType() : null;
    const draftInstant = !force ? this.historyStore?.encounterDraftInstant() : null;
    if (draftValues && Object.keys(draftValues).length > 0) {
      this.dynamicFormData.set(structuredClone(draftValues));
    } else {
      this.dynamicFormData.set({});
      this.isDynamicFormValid.set(false);
    }
    if (draftType) {
      this.consultationType.set(draftType);
    } else {
      this.consultationType.set(this.previousEncountersCount() <= 0 ? "FIRST_VISIT" : "FOLLOW_UP");
    }
    if (draftInstant) {
      this.recordedInstant.set(draftInstant);
    } else {
      this.recordedInstant.set((/* @__PURE__ */ new Date()).toISOString());
    }
  }
  onCancel() {
    if (!this.isSubmitting()) {
      this.epoch++;
      this.historyStore?.clearEncounterDraft();
      this.resetForm(true);
      this.cancel.emit();
    }
  }
  identity() {
    return this.auth.currentUser()?.id ?? "";
  }
  alive(epoch) {
    return !this.destroyed && epoch === this.epoch && this.identity() === this.owner && this.patientId() === this.contextPatient;
  }
  static \u0275fac = function EncounterFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EncounterFormComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EncounterFormComponent, selectors: [["app-encounter-form"]], inputs: { patientId: [1, "patientId"], patientName: [1, "patientName"], previousEncountersCount: [1, "previousEncountersCount"] }, outputs: { cancel: "cancel", encounterCreated: "encounterCreated" }, decls: 44, vars: 12, consts: [["aria-label", "Formulario de nueva historia cl\xEDnica", 1, "encounter-form-card", "animate-fade-in"], [1, "encounter-form-header"], [1, "header-text"], [1, "header-badge-row"], [1, "clinical-badge"], [1, "patient-name-tag"], [1, "encounter-form-title"], [1, "encounter-form-subtitle"], ["type", "button", "title", "Volver a historia cl\xEDnica", 1, "btn-back-link", 3, "click"], ["role", "alert", 1, "alert-banner", "alert-error"], ["role", "status", 1, "encounter-form-loading"], ["role", "alert", 1, "conflict-review"], [1, "encounter-form-body"], [1, "consultation-metadata-card", 3, "disabled"], [1, "metadata-legend"], [1, "metadata-grid"], [1, "metadata-field"], [1, "field-label"], ["aria-label", "Fecha y hora de atenci\xF3n", 1, "readonly-datetime-box"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true", 1, "clock-icon"], ["cx", "12", "cy", "12", "r", "10"], ["points", "12 6 12 12 16 14"], [1, "datetime-value"], [1, "field-hint"], [1, "metadata-field", "consultation-type-container"], ["id", "consultation-type-group-label", 1, "field-label"], [1, "dynamic-form-container"], [1, "empty-definition-notice"], [1, "encounter-form-footer"], ["type", "button", 1, "btn-secondary", 3, "click", "disabled"], ["type", "button", 1, "btn-primary", 3, "click", "disabled"], [1, "timeline-spinner"], ["type", "button", 1, "btn-conflict-action", 3, "click", "disabled"], [1, "mt-2"], ["role", "radiogroup", "aria-labelledby", "consultation-type-group-label", 1, "consultation-chips-row"], ["role", "radio", "aria-checked", "true", "tabindex", "0", "title", "Primera consulta obligatoria para pacientes sin antecedentes previos", 1, "consultation-chip", "locked", "active"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true", 1, "chip-icon"], ["d", "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"], ["points", "9 12 11 14 15 10"], [1, "locked-badge"], [1, "field-hint", "locked-hint"], ["type", "button", "role", "radio", 1, "consultation-chip", 3, "active", "disabled"], ["type", "button", "role", "radio", 1, "consultation-chip", 3, "click", "disabled"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true", 1, "chip-icon", "checkmark"], ["points", "20 6 9 17 4 12"], [3, "valuesChange", "validityChange", "definition", "values", "readonly"], ["type", "button", 1, "btn-retry", 3, "click"]], template: function EncounterFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275text(5, "Historia Cl\xEDnica");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(6, EncounterFormComponent_Conditional_6_Template, 2, 1, "span", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "h3", 6);
      \u0275\u0275text(8, "Nueva Historia Cl\xEDnica");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 7);
      \u0275\u0275text(10, " Registr\xE1 la evoluci\xF3n m\xE9dica, antecedentes, examen f\xEDsico y diagn\xF3sticos del paciente. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "button", 8);
      \u0275\u0275listener("click", function EncounterFormComponent_Template_button_click_11_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(12, " \u2190 Volver a historia cl\xEDnica ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(13, EncounterFormComponent_Conditional_13_Template, 3, 1, "div", 9);
      \u0275\u0275conditionalCreate(14, EncounterFormComponent_Conditional_14_Template, 4, 0, "div", 10);
      \u0275\u0275conditionalCreate(15, EncounterFormComponent_Conditional_15_Template, 6, 2, "div", 11);
      \u0275\u0275elementStart(16, "div", 12)(17, "fieldset", 13)(18, "legend", 14);
      \u0275\u0275text(19, "Informaci\xF3n de la Atenci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 15)(21, "div", 16)(22, "label", 17);
      \u0275\u0275text(23, "Fecha y hora de atenci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 18);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(25, "svg", 19);
      \u0275\u0275element(26, "circle", 20)(27, "polyline", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(28, "span", 22);
      \u0275\u0275text(29);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "span", 23);
      \u0275\u0275text(31);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 24)(33, "label", 25);
      \u0275\u0275text(34, "Tipo de atenci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(35, EncounterFormComponent_Conditional_35_Template, 11, 0)(36, EncounterFormComponent_Conditional_36_Template, 5, 0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(37, EncounterFormComponent_Conditional_37_Template, 2, 3, "div", 26)(38, EncounterFormComponent_Conditional_38_Template, 5, 0, "div", 27);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "div", 28)(40, "button", 29);
      \u0275\u0275listener("click", function EncounterFormComponent_Template_button_click_40_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(41, " Cancelar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "button", 30);
      \u0275\u0275listener("click", function EncounterFormComponent_Template_button_click_42_listener() {
        return ctx.submitEncounter();
      });
      \u0275\u0275text(43);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_8_0;
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.patientName() ? 6 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.errorMessage() ? 13 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.hasConflict() ? 15 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.readonly());
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate(ctx.formattedCurrentDateTime());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Vista previa en ", ctx.timeZone, ". La fecha y hora definitivas las registra el servidor al guardar.");
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.isFirstVisitLocked() ? 35 : 36);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_8_0 = ctx.definition()) ? 37 : !ctx.isLoading() ? 38 : -1, tmp_8_0);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.isSubmitting());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.readonly() || !ctx.definition() || !ctx.isDynamicFormValid());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isSubmitting() ? "Guardando..." : "Guardar historia cl\xEDnica", " ");
    }
  }, dependencies: [FormsModule, DynamicFormRendererComponent], styles: ["\n.encounter-form-card[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 14px;\n  box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.05);\n  padding: 1.5rem;\n  margin-bottom: 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n.encounter-form-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 1px solid var(--%NS%dc-outline, #f1f5f9);\n  padding-bottom: 1rem;\n}\n.header-badge-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-bottom: 0.35rem;\n}\n.clinical-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  background-color: var(--%NS%dc-teal-surface, #ecfdf5);\n  color: var(--%NS%dc-teal-ink, #047857);\n  font-size: 0.75rem;\n  font-weight: 700;\n  padding: 0.2rem 0.6rem;\n  border-radius: 9999px;\n  border: 1px solid #a7f3d0;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.patient-name-tag[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink-secondary, #475569);\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  padding: 0.15rem 0.55rem;\n  border-radius: 6px;\n}\n.encounter-form-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.35rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #0f172a);\n  letter-spacing: -0.02em;\n}\n.encounter-form-subtitle[_ngcontent-%COMP%] {\n  margin: 0.25rem 0 0 0;\n  font-size: 0.88rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  line-height: 1.4;\n}\n.btn-back-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  color: var(--%NS%dc-teal-ink, #0d9488);\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 8px;\n  font-size: 0.85rem;\n  font-weight: 600;\n  padding: 0.45rem 0.85rem;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.btn-back-link[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n  border-color: #0d9488;\n}\n.consultation-metadata-card[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 1.15rem;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 10px;\n}\n.metadata-legend[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: var(--%NS%dc-ink-secondary, #475569);\n  padding: 0 0.5rem;\n}\n.readonly-datetime-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  padding: 0.55rem 0.75rem;\n  background: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 8px;\n  min-height: 42px;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.readonly-datetime-box[_ngcontent-%COMP%]   .clock-icon[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-teal-ink, #0d9488);\n  flex-shrink: 0;\n}\n.datetime-value[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.field-hint[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  line-height: 1.3;\n}\n.metadata-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(240px, 300px) 1fr;\n  gap: 1.25rem;\n  align-items: start;\n}\n@media (max-width: 820px) {\n  .metadata-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.metadata-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.consultation-type-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n}\n.consultation-chips-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.5rem;\n}\n.consultation-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.5rem 0.95rem;\n  font-size: 0.84rem;\n  font-weight: 500;\n  color: var(--%NS%dc-ink-secondary, #334155);\n  background-color: var(--%NS%dc-surface, #ffffff);\n  border: 1.5px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 9999px;\n  cursor: pointer;\n  transition: all 0.15s ease-in-out;\n  outline: none;\n  -webkit-user-select: none;\n  user-select: none;\n  white-space: nowrap;\n}\n.consultation-chip[_ngcontent-%COMP%]:hover:not(:disabled):not(.locked) {\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  border-color: #0d9488;\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.consultation-chip[_ngcontent-%COMP%]:focus-visible {\n  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.25);\n}\n.consultation-chip.active[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-teal-surface, #ecfdf5);\n  border-color: #059669;\n  color: var(--%NS%dc-teal-ink, #065f46);\n  font-weight: 600;\n  box-shadow: 0 1px 3px rgba(5, 150, 105, 0.15);\n}\n.consultation-chip.active[_ngcontent-%COMP%]   .chip-icon.checkmark[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-teal-ink, #059669);\n}\n.consultation-chip.locked[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-teal-surface, #ecfdf5);\n  border-color: #10b981;\n  color: var(--%NS%dc-teal-ink, #065f46);\n  font-weight: 600;\n  cursor: default;\n  box-shadow: 0 1px 2px rgba(16, 185, 129, 0.1);\n}\n.consultation-chip.locked[_ngcontent-%COMP%]   .chip-icon[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-teal-ink, #059669);\n}\n.consultation-chip.locked[_ngcontent-%COMP%]   .locked-badge[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  background-color: var(--%NS%dc-teal-surface, #d1fae5);\n  color: var(--%NS%dc-teal-ink, #047857);\n  padding: 0.12rem 0.45rem;\n  border-radius: 6px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  margin-left: 0.2rem;\n}\n.consultation-chip[_ngcontent-%COMP%]:disabled:not(.locked) {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.locked-hint[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-teal-ink, #047857);\n  font-weight: 500;\n}\n.field-label[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink-secondary, #334155);\n}\n.time-input[_ngcontent-%COMP%], \n.select-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.55rem 0.75rem;\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 8px;\n  background: var(--%NS%dc-surface, #ffffff);\n  color: var(--%NS%dc-ink, #0f172a);\n  font-size: 0.9rem;\n  outline: none;\n  transition: border-color 0.15s ease, box-shadow 0.15s ease;\n}\n[_ngcontent-%COMP%]:is(.time-input, .select-input):focus {\n  border-color: #0d9488;\n  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);\n}\n.select-input[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.dynamic-form-container[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n}\n.alert-banner[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-error-surface, #fef2f2);\n  border: 1px solid #fecaca;\n  color: var(--%NS%dc-error-ink, #b91c1c);\n}\n.alert-warning[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-warning-surface, #fffbeb);\n  border: 1px solid #fde68a;\n  color: var(--%NS%dc-warning-ink, #b45309);\n}\n.conflict-review[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-teal-surface, #f0fdfa);\n  border: 1px solid #99f6e4;\n  border-radius: 8px;\n  padding: 1rem;\n  color: var(--%NS%dc-teal-ink, #115e59);\n  font-size: 0.875rem;\n}\n.btn-conflict-action[_ngcontent-%COMP%] {\n  background: #0d9488;\n  color: #ffffff;\n  border: none;\n  border-radius: 6px;\n  padding: 0.4rem 0.8rem;\n  font-size: 0.8rem;\n  font-weight: 600;\n  cursor: pointer;\n  margin-top: 0.5rem;\n}\n.btn-conflict-action[_ngcontent-%COMP%]:hover {\n  background: #0f766e;\n}\n.encounter-form-loading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 2rem;\n  justify-content: center;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  font-size: 0.95rem;\n}\n.timeline-spinner[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  border: 3px solid var(--%NS%dc-outline, #cbd5e1);\n  border-top-color: #0d9488;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.empty-definition-notice[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  border-radius: 8px;\n  border: 1px dashed var(--%NS%dc-outline, #cbd5e1);\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.btn-retry[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  background: #0d9488;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  padding: 0.4rem 0.8rem;\n  cursor: pointer;\n  font-weight: 600;\n}\n.encounter-form-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding-top: 1rem;\n  border-top: 1px solid var(--%NS%dc-outline, #f1f5f9);\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  padding: 0.6rem 1.25rem;\n  background: var(--%NS%dc-surface, #ffffff);\n  color: var(--%NS%dc-ink-secondary, #475569);\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 0.9rem;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  color: var(--%NS%dc-ink, #1e293b);\n  border-color: #94a3b8;\n}\n.btn-secondary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  padding: 0.6rem 1.4rem;\n  background: #0d9488;\n  color: #ffffff;\n  border: 1px solid #0f766e;\n  border-radius: 8px;\n  font-weight: 700;\n  font-size: 0.9rem;\n  cursor: pointer;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  transition: all 0.15s ease;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #0f766e;\n  box-shadow: 0 2px 4px rgba(13, 148, 136, 0.2);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  background: #94a3b8;\n  border-color: #94a3b8;\n}\n.animate-fade-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease-in-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=encounter-form.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EncounterFormComponent, [{
    type: Component,
    args: [{ selector: "app-encounter-form", imports: [FormsModule, DynamicFormRendererComponent], template: `<div class="encounter-form-card animate-fade-in" aria-label="Formulario de nueva historia cl\xEDnica">
  <div class="encounter-form-header">
    <div class="header-text">
      <div class="header-badge-row">
        <span class="clinical-badge">Historia Cl\xEDnica</span>
        @if (patientName()) {
          <span class="patient-name-tag">{{ patientName() }}</span>
        }
      </div>
      <h3 class="encounter-form-title">Nueva Historia Cl\xEDnica</h3>
      <p class="encounter-form-subtitle">
        Registr\xE1 la evoluci\xF3n m\xE9dica, antecedentes, examen f\xEDsico y diagn\xF3sticos del paciente.
      </p>
    </div>
    <button
      type="button"
      class="btn-back-link"
      (click)="onCancel()"
      title="Volver a historia cl\xEDnica"
    >
      \u2190 Volver a historia cl\xEDnica
    </button>
  </div>

  @if (errorMessage()) {
    <div class="alert-banner alert-error" role="alert">
      <span>{{ errorMessage() }}</span>
    </div>
  }

  @if (isLoading()) {
    <div class="encounter-form-loading" role="status">
      <div class="timeline-spinner"></div>
      <span>Cargando formulario de historia cl\xEDnica...</span>
    </div>
  }

  @if (hasConflict()) {
    <div class="conflict-review" role="alert">
      <p>Tu configuraci\xF3n activa cambi\xF3. Las respuestas ingresadas se conservan hasta que revises el formulario actual.</p>
      <button type="button" class="btn-conflict-action" [disabled]="isLoading()" (click)="reviewRemote()">
        Consultar configuraci\xF3n actual
      </button>
      @if (remoteWorkspace(); as remote) {
        <p class="mt-2">{{ remote.specialty.name }}. Se conservar\xE1n solo los campos compatibles.</p>
        <button type="button" class="btn-conflict-action" [disabled]="isLoading()" (click)="useRemoteWorkspace()">
          Usar formulario actual y conservar respuestas compatibles
        </button>
      }
    </div>
  }

  <div class="encounter-form-body">
    <!-- Metadatos de la atenci\xF3n: Fecha, Hora, Tipo de atenci\xF3n -->
    <fieldset class="consultation-metadata-card" [disabled]="readonly()">
      <legend class="metadata-legend">Informaci\xF3n de la Atenci\xF3n</legend>

      <div class="metadata-grid">
        <div class="metadata-field">
          <label class="field-label">Fecha y hora de atenci\xF3n</label>
          <div class="readonly-datetime-box" aria-label="Fecha y hora de atenci\xF3n">
            <svg class="clock-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span class="datetime-value">{{ formattedCurrentDateTime() }}</span>
          </div>
          <span class="field-hint">Vista previa en {{ timeZone }}. La fecha y hora definitivas las registra el servidor al guardar.</span>
        </div>

        <div class="metadata-field consultation-type-container">
          <label class="field-label" id="consultation-type-group-label">Tipo de atenci\xF3n</label>
          @if (isFirstVisitLocked()) {
            <div class="consultation-chips-row" role="radiogroup" aria-labelledby="consultation-type-group-label">
              <div
                class="consultation-chip locked active"
                role="radio"
                aria-checked="true"
                tabindex="0"
                title="Primera consulta obligatoria para pacientes sin antecedentes previos"
              >
                <svg class="chip-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
                <span>Primera consulta</span>
                <span class="locked-badge">\xDAnica opci\xF3n</span>
              </div>
            </div>
            <span class="field-hint locked-hint">
              Al no contar con atenciones registradas previas, esta historia cl\xEDnica queda fijada autom\xE1ticamente como Primera Consulta.
            </span>
          } @else {
            <div class="consultation-chips-row" role="radiogroup" aria-labelledby="consultation-type-group-label">
              @for (type of availableConsultationTypes(); track type.value) {
                <button
                  type="button"
                  class="consultation-chip"
                  [class.active]="consultationType() === type.value"
                  [disabled]="readonly()"
                  role="radio"
                  [attr.aria-checked]="consultationType() === type.value"
                  (click)="selectConsultationType(type.value)"
                >
                  @if (consultationType() === type.value) {
                    <svg class="chip-icon checkmark" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  }
                  <span>{{ type.label }}</span>
                </button>
              }
            </div>
            <span class="field-hint">Seleccion\xE1 una sola opci\xF3n horizontal para clasificar esta atenci\xF3n.</span>
          }
        </div>
      </div>
    </fieldset>



    <!-- Dynamic Form Fields from Active Specialty Configuration -->
    @if (definition(); as form) {
      <div class="dynamic-form-container">
        <app-dynamic-form-renderer
          [definition]="form"
          [values]="dynamicFormData()"
          [readonly]="readonly()"
          (valuesChange)="onDynamicDataChange($event)"
          (validityChange)="onDynamicFormValidityChange($event)"
        />
      </div>
    } @else if (!isLoading()) {
      <div class="empty-definition-notice">
        <p>El formulario de historia cl\xEDnica no est\xE1 disponible.</p>
        <button type="button" class="btn-retry" (click)="loadForm()">Volver a cargar</button>
      </div>
    }
  </div>

  <!-- Form Actions Bar -->
  <div class="encounter-form-footer">
    <button
      type="button"
      class="btn-secondary"
      [disabled]="isSubmitting()"
      (click)="onCancel()"
    >
      Cancelar
    </button>
    <button
      type="button"
      class="btn-primary"
      [disabled]="readonly() || !definition() || !isDynamicFormValid()"
      (click)="submitEncounter()"
    >
      {{ isSubmitting() ? 'Guardando...' : 'Guardar historia cl\xEDnica' }}
    </button>
  </div>
</div>
`, styles: ["/* src/app/features/encounter-form/encounter-form.component.css */\n.encounter-form-card {\n  background: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 14px;\n  box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.05);\n  padding: 1.5rem;\n  margin-bottom: 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n.encounter-form-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 1px solid var(--dc-outline, #f1f5f9);\n  padding-bottom: 1rem;\n}\n.header-badge-row {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-bottom: 0.35rem;\n}\n.clinical-badge {\n  display: inline-flex;\n  align-items: center;\n  background-color: var(--dc-teal-surface, #ecfdf5);\n  color: var(--dc-teal-ink, #047857);\n  font-size: 0.75rem;\n  font-weight: 700;\n  padding: 0.2rem 0.6rem;\n  border-radius: 9999px;\n  border: 1px solid #a7f3d0;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.patient-name-tag {\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: var(--dc-ink-secondary, #475569);\n  background: var(--dc-surface-low, #f8fafc);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  padding: 0.15rem 0.55rem;\n  border-radius: 6px;\n}\n.encounter-form-title {\n  margin: 0;\n  font-size: 1.35rem;\n  font-weight: 700;\n  color: var(--dc-ink, #0f172a);\n  letter-spacing: -0.02em;\n}\n.encounter-form-subtitle {\n  margin: 0.25rem 0 0 0;\n  font-size: 0.88rem;\n  color: var(--dc-ink-muted, #64748b);\n  line-height: 1.4;\n}\n.btn-back-link {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  background: var(--dc-surface-low, #f8fafc);\n  color: var(--dc-teal-ink, #0d9488);\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  border-radius: 8px;\n  font-size: 0.85rem;\n  font-weight: 600;\n  padding: 0.45rem 0.85rem;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.btn-back-link:hover {\n  background: var(--dc-surface-high, #f1f5f9);\n  border-color: #0d9488;\n}\n.consultation-metadata-card {\n  margin: 0;\n  padding: 1.15rem;\n  background: var(--dc-surface-low, #f8fafc);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 10px;\n}\n.metadata-legend {\n  font-size: 0.82rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: var(--dc-ink-secondary, #475569);\n  padding: 0 0.5rem;\n}\n.readonly-datetime-box {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  padding: 0.55rem 0.75rem;\n  background: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  border-radius: 8px;\n  min-height: 42px;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.readonly-datetime-box .clock-icon {\n  color: var(--dc-teal-ink, #0d9488);\n  flex-shrink: 0;\n}\n.datetime-value {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: var(--dc-ink, #0f172a);\n}\n.field-hint {\n  font-size: 0.75rem;\n  color: var(--dc-ink-muted, #64748b);\n  line-height: 1.3;\n}\n.metadata-grid {\n  display: grid;\n  grid-template-columns: minmax(240px, 300px) 1fr;\n  gap: 1.25rem;\n  align-items: start;\n}\n@media (max-width: 820px) {\n  .metadata-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.metadata-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.consultation-type-container {\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n}\n.consultation-chips-row {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.5rem;\n}\n.consultation-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.5rem 0.95rem;\n  font-size: 0.84rem;\n  font-weight: 500;\n  color: var(--dc-ink-secondary, #334155);\n  background-color: var(--dc-surface, #ffffff);\n  border: 1.5px solid var(--dc-outline, #cbd5e1);\n  border-radius: 9999px;\n  cursor: pointer;\n  transition: all 0.15s ease-in-out;\n  outline: none;\n  -webkit-user-select: none;\n  user-select: none;\n  white-space: nowrap;\n}\n.consultation-chip:hover:not(:disabled):not(.locked) {\n  background-color: var(--dc-surface-low, #f8fafc);\n  border-color: #0d9488;\n  color: var(--dc-ink, #0f172a);\n}\n.consultation-chip:focus-visible {\n  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.25);\n}\n.consultation-chip.active {\n  background-color: var(--dc-teal-surface, #ecfdf5);\n  border-color: #059669;\n  color: var(--dc-teal-ink, #065f46);\n  font-weight: 600;\n  box-shadow: 0 1px 3px rgba(5, 150, 105, 0.15);\n}\n.consultation-chip.active .chip-icon.checkmark {\n  color: var(--dc-teal-ink, #059669);\n}\n.consultation-chip.locked {\n  background-color: var(--dc-teal-surface, #ecfdf5);\n  border-color: #10b981;\n  color: var(--dc-teal-ink, #065f46);\n  font-weight: 600;\n  cursor: default;\n  box-shadow: 0 1px 2px rgba(16, 185, 129, 0.1);\n}\n.consultation-chip.locked .chip-icon {\n  color: var(--dc-teal-ink, #059669);\n}\n.consultation-chip.locked .locked-badge {\n  font-size: 0.7rem;\n  background-color: var(--dc-teal-surface, #d1fae5);\n  color: var(--dc-teal-ink, #047857);\n  padding: 0.12rem 0.45rem;\n  border-radius: 6px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  margin-left: 0.2rem;\n}\n.consultation-chip:disabled:not(.locked) {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.locked-hint {\n  color: var(--dc-teal-ink, #047857);\n  font-weight: 500;\n}\n.field-label {\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: var(--dc-ink-secondary, #334155);\n}\n.time-input,\n.select-input {\n  width: 100%;\n  padding: 0.55rem 0.75rem;\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  border-radius: 8px;\n  background: var(--dc-surface, #ffffff);\n  color: var(--dc-ink, #0f172a);\n  font-size: 0.9rem;\n  outline: none;\n  transition: border-color 0.15s ease, box-shadow 0.15s ease;\n}\n:is(.time-input, .select-input):focus {\n  border-color: #0d9488;\n  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);\n}\n.select-input {\n  cursor: pointer;\n}\n.dynamic-form-container {\n  margin-top: 1rem;\n}\n.alert-banner {\n  padding: 0.75rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.alert-error {\n  background-color: var(--dc-error-surface, #fef2f2);\n  border: 1px solid #fecaca;\n  color: var(--dc-error-ink, #b91c1c);\n}\n.alert-warning {\n  background-color: var(--dc-warning-surface, #fffbeb);\n  border: 1px solid #fde68a;\n  color: var(--dc-warning-ink, #b45309);\n}\n.conflict-review {\n  background-color: var(--dc-teal-surface, #f0fdfa);\n  border: 1px solid #99f6e4;\n  border-radius: 8px;\n  padding: 1rem;\n  color: var(--dc-teal-ink, #115e59);\n  font-size: 0.875rem;\n}\n.btn-conflict-action {\n  background: #0d9488;\n  color: #ffffff;\n  border: none;\n  border-radius: 6px;\n  padding: 0.4rem 0.8rem;\n  font-size: 0.8rem;\n  font-weight: 600;\n  cursor: pointer;\n  margin-top: 0.5rem;\n}\n.btn-conflict-action:hover {\n  background: #0f766e;\n}\n.encounter-form-loading {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 2rem;\n  justify-content: center;\n  color: var(--dc-ink-muted, #64748b);\n  font-size: 0.95rem;\n}\n.timeline-spinner {\n  width: 22px;\n  height: 22px;\n  border: 3px solid var(--dc-outline, #cbd5e1);\n  border-top-color: #0d9488;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.empty-definition-notice {\n  text-align: center;\n  padding: 2rem;\n  background: var(--dc-surface-low, #f8fafc);\n  border-radius: 8px;\n  border: 1px dashed var(--dc-outline, #cbd5e1);\n  color: var(--dc-ink-muted, #64748b);\n}\n.btn-retry {\n  margin-top: 0.5rem;\n  background: #0d9488;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  padding: 0.4rem 0.8rem;\n  cursor: pointer;\n  font-weight: 600;\n}\n.encounter-form-footer {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding-top: 1rem;\n  border-top: 1px solid var(--dc-outline, #f1f5f9);\n}\n.btn-secondary {\n  padding: 0.6rem 1.25rem;\n  background: var(--dc-surface, #ffffff);\n  color: var(--dc-ink-secondary, #475569);\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 0.9rem;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.btn-secondary:hover:not(:disabled) {\n  background: var(--dc-surface-low, #f8fafc);\n  color: var(--dc-ink, #1e293b);\n  border-color: #94a3b8;\n}\n.btn-secondary:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-primary {\n  padding: 0.6rem 1.4rem;\n  background: #0d9488;\n  color: #ffffff;\n  border: 1px solid #0f766e;\n  border-radius: 8px;\n  font-weight: 700;\n  font-size: 0.9rem;\n  cursor: pointer;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  transition: all 0.15s ease;\n}\n.btn-primary:hover:not(:disabled) {\n  background: #0f766e;\n  box-shadow: 0 2px 4px rgba(13, 148, 136, 0.2);\n}\n.btn-primary:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  background: #94a3b8;\n  border-color: #94a3b8;\n}\n.animate-fade-in {\n  animation: fadeIn 0.2s ease-in-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=encounter-form.component.css.map */\n"] }]
  }], () => [], { patientId: [{ type: Input, args: [{ isSignal: true, alias: "patientId", required: true }] }], patientName: [{ type: Input, args: [{ isSignal: true, alias: "patientName", required: false }] }], previousEncountersCount: [{ type: Input, args: [{ isSignal: true, alias: "previousEncountersCount", required: false }] }], cancel: [{ type: Output, args: ["cancel"] }], encounterCreated: [{ type: Output, args: ["encounterCreated"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EncounterFormComponent, { className: "EncounterFormComponent", filePath: "src/app/features/encounter-form/encounter-form.component.ts", lineNumber: 37 });
})();

// src/app/features/patient-record/patient-encounters/patient-encounters.component.ts
function PatientEncountersComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-encounter-form", 3);
    \u0275\u0275listener("cancel", function PatientEncountersComponent_Conditional_1_Template_app_encounter_form_cancel_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.history.cancelCreatingEncounter());
    })("encounterCreated", function PatientEncountersComponent_Conditional_1_Template_app_encounter_form_encounterCreated_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onEncounterCreated($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("patientId", ctx_r1.patientId())("patientName", ctx_r1.patientName())("previousEncountersCount", ctx_r1.history.encounters().length);
  }
}
function PatientEncountersComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-clinical-timeline", 4);
    \u0275\u0275listener("newEncounter", function PatientEncountersComponent_Conditional_2_Template_app_clinical_timeline_newEncounter_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onNewEncounterTriggered());
    })("viewDetail", function PatientEncountersComponent_Conditional_2_Template_app_clinical_timeline_viewDetail_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.history.openEncounterDetail($event));
    })("deleteEncounter", function PatientEncountersComponent_Conditional_2_Template_app_clinical_timeline_deleteEncounter_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.history.deleteEncounter($event));
    })("printPrescription", function PatientEncountersComponent_Conditional_2_Template_app_clinical_timeline_printPrescription_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.history.onPrintPrescription($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("canCreateEncounter", ctx_r1.recordActions.has("NEW_ENCOUNTER"))("encounters", ctx_r1.history.encounters())("isLoading", ctx_r1.history.isLoadingEncounters());
  }
}
var PatientEncountersComponent = class _PatientEncountersComponent {
  recordActions = inject(PatientRecordActionsService);
  history = inject(PatientEncountersStore);
  activePatientService = inject(ActivePatientService);
  newEncounter = output();
  patientId = computed(
    () => this.activePatientService.patientId() ?? 0,
    ...ngDevMode ? [{ debugName: "patientId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  patientName = computed(
    () => this.activePatientService.activePatient()?.fullName ?? "",
    ...ngDevMode ? [{ debugName: "patientName" }] : (
      /* istanbul ignore next */
      []
    )
  );
  onNewEncounterTriggered() {
    this.history.startCreatingEncounter();
    this.newEncounter.emit();
  }
  onEncounterCreated(encounter) {
    this.history.cancelCreatingEncounter();
    const patientId = this.activePatientService.patientId();
    if (patientId) {
      this.history.loadEncounters(patientId);
    }
  }
  static \u0275fac = function PatientEncountersComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientEncountersComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PatientEncountersComponent, selectors: [["app-patient-encounters"]], outputs: { newEncounter: "newEncounter" }, decls: 3, vars: 1, consts: [["aria-label", "Historia Cl\xEDnica", 1, "tab-panel", "animate-fade-in"], [3, "patientId", "patientName", "previousEncountersCount"], [3, "canCreateEncounter", "encounters", "isLoading"], [3, "cancel", "encounterCreated", "patientId", "patientName", "previousEncountersCount"], [3, "newEncounter", "viewDetail", "deleteEncounter", "printPrescription", "canCreateEncounter", "encounters", "isLoading"]], template: function PatientEncountersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0);
      \u0275\u0275conditionalCreate(1, PatientEncountersComponent_Conditional_1_Template, 1, 3, "app-encounter-form", 1)(2, PatientEncountersComponent_Conditional_2_Template, 1, 3, "app-clinical-timeline", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.history.isCreatingEncounter() ? 1 : 2);
    }
  }, dependencies: [ClinicalTimelineComponent, EncounterFormComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n.tab-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n}\n.animate-fade-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.15s ease-in-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(3px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=patient-encounters.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientEncountersComponent, [{
    type: Component,
    args: [{ selector: "app-patient-encounters", imports: [ClinicalTimelineComponent, EncounterFormComponent], template: `<section class="tab-panel animate-fade-in" aria-label="Historia Cl\xEDnica">
  @if (history.isCreatingEncounter()) {
    <app-encounter-form
      [patientId]="patientId()"
      [patientName]="patientName()"
      [previousEncountersCount]="history.encounters().length"
      (cancel)="history.cancelCreatingEncounter()"
      (encounterCreated)="onEncounterCreated($event)"
    />
  } @else {
    <app-clinical-timeline
      [canCreateEncounter]="recordActions.has('NEW_ENCOUNTER')"
      [encounters]="history.encounters()"
      [isLoading]="history.isLoadingEncounters()"
      (newEncounter)="onNewEncounterTriggered()"
      (viewDetail)="history.openEncounterDetail($event)"
      (deleteEncounter)="history.deleteEncounter($event)"
      (printPrescription)="history.onPrintPrescription($event)"
    />
  }
</section>
`, styles: ["/* src/app/features/patient-record/patient-encounters/patient-encounters.component.css */\n:host {\n  display: block;\n  min-width: 0;\n}\n.tab-panel {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n}\n.animate-fade-in {\n  animation: fadeIn 0.15s ease-in-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(3px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=patient-encounters.component.css.map */\n"] }]
  }], null, { newEncounter: [{ type: Output, args: ["newEncounter"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PatientEncountersComponent, { className: "PatientEncountersComponent", filePath: "src/app/features/patient-record/patient-encounters/patient-encounters.component.ts", lineNumber: 15 });
})();

// node_modules/d3-array/src/ascending.js
function ascending(a, b) {
  return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

// node_modules/d3-array/src/descending.js
function descending(a, b) {
  return a == null || b == null ? NaN : b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

// node_modules/d3-array/src/bisector.js
function bisector(f) {
  let compare1, compare2, delta;
  if (f.length !== 2) {
    compare1 = ascending;
    compare2 = (d, x2) => ascending(f(d), x2);
    delta = (d, x2) => f(d) - x2;
  } else {
    compare1 = f === ascending || f === descending ? f : zero;
    compare2 = f;
    delta = f;
  }
  function left(a, x2, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x2, x2) !== 0) return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a[mid], x2) < 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function right(a, x2, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x2, x2) !== 0) return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a[mid], x2) <= 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function center(a, x2, lo = 0, hi = a.length) {
    const i = left(a, x2, lo, hi - 1);
    return i > lo && delta(a[i - 1], x2) > -delta(a[i], x2) ? i - 1 : i;
  }
  return { left, center, right };
}
function zero() {
  return 0;
}

// node_modules/d3-array/src/number.js
function number(x2) {
  return x2 === null ? NaN : +x2;
}

// node_modules/d3-array/src/bisect.js
var ascendingBisect = bisector(ascending);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
var bisectCenter = bisector(number).center;
var bisect_default = bisectRight;

// node_modules/d3-array/src/ticks.js
var e10 = Math.sqrt(50);
var e5 = Math.sqrt(10);
var e2 = Math.sqrt(2);
function tickSpec(start, stop, count) {
  const step = (stop - start) / Math.max(0, count), power = Math.floor(Math.log10(step)), error = step / Math.pow(10, power), factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = Math.pow(10, -power) / factor;
    i1 = Math.round(start * inc);
    i2 = Math.round(stop * inc);
    if (i1 / inc < start) ++i1;
    if (i2 / inc > stop) --i2;
    inc = -inc;
  } else {
    inc = Math.pow(10, power) * factor;
    i1 = Math.round(start / inc);
    i2 = Math.round(stop / inc);
    if (i1 * inc < start) ++i1;
    if (i2 * inc > stop) --i2;
  }
  if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2);
  return [i1, i2, inc];
}
function ticks(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  if (!(count > 0)) return [];
  if (start === stop) return [start];
  const reverse = stop < start, [i1, i2, inc] = reverse ? tickSpec(stop, start, count) : tickSpec(start, stop, count);
  if (!(i2 >= i1)) return [];
  const n = i2 - i1 + 1, ticks2 = new Array(n);
  if (reverse) {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks2[i] = (i2 - i) / -inc;
    else for (let i = 0; i < n; ++i) ticks2[i] = (i2 - i) * inc;
  } else {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks2[i] = (i1 + i) / -inc;
    else for (let i = 0; i < n; ++i) ticks2[i] = (i1 + i) * inc;
  }
  return ticks2;
}
function tickIncrement(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  return tickSpec(start, stop, count)[2];
}
function tickStep(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  const reverse = stop < start, inc = reverse ? tickIncrement(stop, start, count) : tickIncrement(start, stop, count);
  return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}

// node_modules/d3-scale/src/init.js
function initRange(domain, range) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range).domain(domain);
      break;
  }
  return this;
}

// node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format2) {
  var m, l;
  format2 = (format2 + "").trim().toLowerCase();
  return (m = reHex.exec(format2)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format2)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format2)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format2)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format2)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format2)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// node_modules/d3-interpolate/src/basis.js
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function basis_default(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// node_modules/d3-interpolate/src/constant.js
var constant_default = (x2) => () => x2;

// node_modules/d3-interpolate/src/color.js
function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b, y2) {
  return a = Math.pow(a, y2), b = Math.pow(b, y2) - a, y2 = 1 / y2, function(t) {
    return Math.pow(a + t * b, y2);
  };
}
function gamma(y2) {
  return (y2 = +y2) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y2) : constant_default(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant_default(isNaN(a) ? b : a);
}

// node_modules/d3-interpolate/src/rgb.js
var rgb_default = (function rgbGamma(y2) {
  var color2 = gamma(y2);
  function rgb2(start, end) {
    var r = color2((start = rgb(start)).r, (end = rgb(end)).r), g = color2(start.g, end.g), b = color2(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
})(1);
function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
    for (i = 0; i < n; ++i) {
      color2 = rgb(colors[i]);
      r[i] = color2.r || 0;
      g[i] = color2.g || 0;
      b[i] = color2.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color2.opacity = 1;
    return function(t) {
      color2.r = r(t);
      color2.g = g(t);
      color2.b = b(t);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default);
var rgbBasisClosed = rgbSpline(basisClosed_default);

// node_modules/d3-interpolate/src/numberArray.js
function numberArray_default(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
  return function(t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}
function isNumberArray(x2) {
  return ArrayBuffer.isView(x2) && !(x2 instanceof DataView);
}

// node_modules/d3-interpolate/src/array.js
function genericArray(a, b) {
  var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x2 = new Array(na), c = new Array(nb), i;
  for (i = 0; i < na; ++i) x2[i] = value_default(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];
  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x2[i](t);
    return c;
  };
}

// node_modules/d3-interpolate/src/date.js
function date_default(a, b) {
  var d = /* @__PURE__ */ new Date();
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

// node_modules/d3-interpolate/src/number.js
function number_default(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

// node_modules/d3-interpolate/src/object.js
function object_default(a, b) {
  var i = {}, c = {}, k;
  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};
  for (k in b) {
    if (k in a) {
      i[k] = value_default(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }
  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

// node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero2(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string_default(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs;
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i]) s[i] += bm;
      else s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({ i, x: number_default(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs;
    else s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one(q[0].x) : zero2(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2) s[(o = q[i2]).i] = o.x(t);
    return s.join("");
  });
}

// node_modules/d3-interpolate/src/value.js
function value_default(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant_default(b) : (t === "number" ? number_default : t === "string" ? (c = color(b)) ? (b = c, rgb_default) : string_default : b instanceof color ? rgb_default : b instanceof Date ? date_default : isNumberArray(b) ? numberArray_default : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object_default : number_default)(a, b);
}

// node_modules/d3-interpolate/src/round.js
function round_default(a, b) {
  return a = +a, b = +b, function(t) {
    return Math.round(a * (1 - t) + b * t);
  };
}

// node_modules/d3-scale/src/constant.js
function constants(x2) {
  return function() {
    return x2;
  };
}

// node_modules/d3-scale/src/number.js
function number2(x2) {
  return +x2;
}

// node_modules/d3-scale/src/continuous.js
var unit = [0, 1];
function identity(x2) {
  return x2;
}
function normalize(a, b) {
  return (b -= a = +a) ? function(x2) {
    return (x2 - a) / b;
  } : constants(isNaN(b) ? NaN : 0.5);
}
function clamper(a, b) {
  var t;
  if (a > b) t = a, a = b, b = t;
  return function(x2) {
    return Math.max(a, Math.min(b, x2));
  };
}
function bimap(domain, range, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x2) {
    return r0(d0(x2));
  };
}
function polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1, d = new Array(j), r = new Array(j), i = -1;
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }
  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }
  return function(x2) {
    var i2 = bisect_default(domain, x2, 1, j) - 1;
    return r[i2](d[i2](x2));
  };
}
function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer() {
  var domain = unit, range = unit, interpolate = value_default, transform, untransform, unknown, clamp = identity, piecewise, output2, input2;
  function rescale() {
    var n = Math.min(domain.length, range.length);
    if (clamp !== identity) clamp = clamper(domain[0], domain[n - 1]);
    piecewise = n > 2 ? polymap : bimap;
    output2 = input2 = null;
    return scale;
  }
  function scale(x2) {
    return x2 == null || isNaN(x2 = +x2) ? unknown : (output2 || (output2 = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x2)));
  }
  scale.invert = function(y2) {
    return clamp(untransform((input2 || (input2 = piecewise(range, domain.map(transform), number_default)))(y2)));
  };
  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_, number2), rescale()) : domain.slice();
  };
  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };
  scale.rangeRound = function(_) {
    return range = Array.from(_), interpolate = round_default, rescale();
  };
  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? true : identity, rescale()) : clamp !== identity;
  };
  scale.interpolate = function(_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  return function(t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}
function continuous() {
  return transformer()(identity, identity);
}

// node_modules/d3-format/src/formatDecimal.js
function formatDecimal_default(x2) {
  return Math.abs(x2 = Math.round(x2)) >= 1e21 ? x2.toLocaleString("en").replace(/,/g, "") : x2.toString(10);
}
function formatDecimalParts(x2, p) {
  if (!isFinite(x2) || x2 === 0) return null;
  var i = (x2 = p ? x2.toExponential(p - 1) : x2.toExponential()).indexOf("e"), coefficient = x2.slice(0, i);
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x2.slice(i + 1)
  ];
}

// node_modules/d3-format/src/exponent.js
function exponent_default(x2) {
  return x2 = formatDecimalParts(Math.abs(x2)), x2 ? x2[1] : NaN;
}

// node_modules/d3-format/src/formatGroup.js
function formatGroup_default(grouping, thousands) {
  return function(value, width) {
    var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t.reverse().join(thousands);
  };
}

// node_modules/d3-format/src/formatNumerals.js
function formatNumerals_default(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// node_modules/d3-format/src/formatSpecifier.js
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype;
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};

// node_modules/d3-format/src/formatTrim.js
function formatTrim_default(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".":
        i0 = i1 = i;
        break;
      case "0":
        if (i0 === 0) i0 = i;
        i1 = i;
        break;
      default:
        if (!+s[i]) break out;
        if (i0 > 0) i0 = 0;
        break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

// node_modules/d3-format/src/formatPrefixAuto.js
var prefixExponent;
function formatPrefixAuto_default(x2, p) {
  var d = formatDecimalParts(x2, p);
  if (!d) return prefixExponent = void 0, x2.toPrecision(p);
  var coefficient = d[0], exponent = d[1], i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x2, Math.max(0, p + i - 1))[0];
}

// node_modules/d3-format/src/formatRounded.js
function formatRounded_default(x2, p) {
  var d = formatDecimalParts(x2, p);
  if (!d) return x2 + "";
  var coefficient = d[0], exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

// node_modules/d3-format/src/formatTypes.js
var formatTypes_default = {
  "%": (x2, p) => (x2 * 100).toFixed(p),
  "b": (x2) => Math.round(x2).toString(2),
  "c": (x2) => x2 + "",
  "d": formatDecimal_default,
  "e": (x2, p) => x2.toExponential(p),
  "f": (x2, p) => x2.toFixed(p),
  "g": (x2, p) => x2.toPrecision(p),
  "o": (x2) => Math.round(x2).toString(8),
  "p": (x2, p) => formatRounded_default(x2 * 100, p),
  "r": formatRounded_default,
  "s": formatPrefixAuto_default,
  "X": (x2) => Math.round(x2).toString(16).toUpperCase(),
  "x": (x2) => Math.round(x2).toString(16)
};

// node_modules/d3-format/src/identity.js
function identity_default(x2) {
  return x2;
}

// node_modules/d3-format/src/locale.js
var map = Array.prototype.map;
var prefixes = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function locale_default(locale2) {
  var group = locale2.grouping === void 0 || locale2.thousands === void 0 ? identity_default : formatGroup_default(map.call(locale2.grouping, Number), locale2.thousands + ""), currencyPrefix = locale2.currency === void 0 ? "" : locale2.currency[0] + "", currencySuffix = locale2.currency === void 0 ? "" : locale2.currency[1] + "", decimal = locale2.decimal === void 0 ? "." : locale2.decimal + "", numerals = locale2.numerals === void 0 ? identity_default : formatNumerals_default(map.call(locale2.numerals, String)), percent = locale2.percent === void 0 ? "%" : locale2.percent + "", minus = locale2.minus === void 0 ? "\u2212" : locale2.minus + "", nan = locale2.nan === void 0 ? "NaN" : locale2.nan + "";
  function newFormat(specifier, options) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero3 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
    if (type === "n") comma = true, type = "g";
    else if (!formatTypes_default[type]) precision === void 0 && (precision = 12), trim = true, type = "g";
    if (zero3 || fill === "0" && align === "=") zero3 = true, fill = "0", align = "=";
    var prefix = (options && options.prefix !== void 0 ? options.prefix : "") + (symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : ""), suffix = (symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "") + (options && options.suffix !== void 0 ? options.suffix : "");
    var formatType = formatTypes_default[type], maybeSuffix = /[defgprs%]/.test(type);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format2(value) {
      var valuePrefix = prefix, valueSuffix = suffix, i, n, c;
      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim) value = formatTrim_default(value);
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;
        valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" && !isNaN(value) && prefixExponent !== void 0 ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }
      if (comma && !zero3) value = group(value, Infinity);
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      if (comma && zero3) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format2.toString = function() {
      return specifier + "";
    };
    return format2;
  }
  function formatPrefix2(specifier, value) {
    var e = Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3, k = Math.pow(10, -e), f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier), { suffix: prefixes[8 + e / 3] });
    return function(value2) {
      return f(k * value2);
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}

// node_modules/d3-format/src/defaultLocale.js
var locale;
var format;
var formatPrefix;
defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function defaultLocale(definition) {
  locale = locale_default(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

// node_modules/d3-format/src/precisionFixed.js
function precisionFixed_default(step) {
  return Math.max(0, -exponent_default(Math.abs(step)));
}

// node_modules/d3-format/src/precisionPrefix.js
function precisionPrefix_default(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3 - exponent_default(Math.abs(step)));
}

// node_modules/d3-format/src/precisionRound.js
function precisionRound_default(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent_default(max) - exponent_default(step)) + 1;
}

// node_modules/d3-scale/src/tickFormat.js
function tickFormat(start, stop, count, specifier) {
  var step = tickStep(start, stop, count), precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix_default(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound_default(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed_default(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

// node_modules/d3-scale/src/linear.js
function linearish(scale) {
  var domain = scale.domain;
  scale.ticks = function(count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };
  scale.tickFormat = function(count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };
  scale.nice = function(count) {
    if (count == null) count = 10;
    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start = d[i0];
    var stop = d[i1];
    var prestep;
    var step;
    var maxIter = 10;
    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    while (maxIter-- > 0) {
      step = tickIncrement(start, stop, count);
      if (step === prestep) {
        d[i0] = start;
        d[i1] = stop;
        return domain(d);
      } else if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }
    return scale;
  };
  return scale;
}
function linear2() {
  var scale = continuous();
  scale.copy = function() {
    return copy(scale, linear2());
  };
  initRange.apply(scale, arguments);
  return linearish(scale);
}

// node_modules/d3-shape/src/constant.js
function constant_default2(x2) {
  return function constant() {
    return x2;
  };
}

// node_modules/d3-path/src/path.js
var pi = Math.PI;
var tau = 2 * pi;
var epsilon = 1e-6;
var tauEpsilon = tau - epsilon;
function append(strings) {
  this._ += strings[0];
  for (let i = 1, n = strings.length; i < n; ++i) {
    this._ += arguments[i] + strings[i];
  }
}
function appendRound(digits) {
  let d = Math.floor(digits);
  if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);
  if (d > 15) return append;
  const k = 10 ** d;
  return function(strings) {
    this._ += strings[0];
    for (let i = 1, n = strings.length; i < n; ++i) {
      this._ += Math.round(arguments[i] * k) / k + strings[i];
    }
  };
}
var Path = class {
  constructor(digits) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null;
    this._ = "";
    this._append = digits == null ? append : appendRound(digits);
  }
  moveTo(x2, y2) {
    this._append`M${this._x0 = this._x1 = +x2},${this._y0 = this._y1 = +y2}`;
  }
  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._append`Z`;
    }
  }
  lineTo(x2, y2) {
    this._append`L${this._x1 = +x2},${this._y1 = +y2}`;
  }
  quadraticCurveTo(x1, y1, x2, y2) {
    this._append`Q${+x1},${+y1},${this._x1 = +x2},${this._y1 = +y2}`;
  }
  bezierCurveTo(x1, y1, x2, y2, x3, y3) {
    this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x3},${this._y1 = +y3}`;
  }
  arcTo(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    if (r < 0) throw new Error(`negative radius: ${r}`);
    let x0 = this._x1, y0 = this._y1, x21 = x2 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
    if (this._x1 === null) {
      this._append`M${this._x1 = x1},${this._y1 = y1}`;
    } else if (!(l01_2 > epsilon)) ;
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._append`L${this._x1 = x1},${this._y1 = y1}`;
    } else {
      let x20 = x2 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
      if (Math.abs(t01 - 1) > epsilon) {
        this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;
      }
      this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;
    }
  }
  arc(x2, y2, r, a0, a1, ccw) {
    x2 = +x2, y2 = +y2, r = +r, ccw = !!ccw;
    if (r < 0) throw new Error(`negative radius: ${r}`);
    let dx = r * Math.cos(a0), dy = r * Math.sin(a0), x0 = x2 + dx, y0 = y2 + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
    if (this._x1 === null) {
      this._append`M${x0},${y0}`;
    } else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._append`L${x0},${y0}`;
    }
    if (!r) return;
    if (da < 0) da = da % tau + tau;
    if (da > tauEpsilon) {
      this._append`A${r},${r},0,1,${cw},${x2 - dx},${y2 - dy}A${r},${r},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;
    } else if (da > epsilon) {
      this._append`A${r},${r},0,${+(da >= pi)},${cw},${this._x1 = x2 + r * Math.cos(a1)},${this._y1 = y2 + r * Math.sin(a1)}`;
    }
  }
  rect(x2, y2, w, h) {
    this._append`M${this._x0 = this._x1 = +x2},${this._y0 = this._y1 = +y2}h${w = +w}v${+h}h${-w}Z`;
  }
  toString() {
    return this._;
  }
};
function path() {
  return new Path();
}
path.prototype = Path.prototype;

// node_modules/d3-shape/src/path.js
function withPath(shape) {
  let digits = 3;
  shape.digits = function(_) {
    if (!arguments.length) return digits;
    if (_ == null) {
      digits = null;
    } else {
      const d = Math.floor(_);
      if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
      digits = d;
    }
    return shape;
  };
  return () => new Path(digits);
}

// node_modules/d3-shape/src/array.js
var slice = Array.prototype.slice;
function array_default(x2) {
  return typeof x2 === "object" && "length" in x2 ? x2 : Array.from(x2);
}

// node_modules/d3-shape/src/curve/linear.js
function Linear(context) {
  this._context = context;
}
Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
      // falls through
      default:
        this._context.lineTo(x2, y2);
        break;
    }
  }
};
function linear_default(context) {
  return new Linear(context);
}

// node_modules/d3-shape/src/point.js
function x(p) {
  return p[0];
}
function y(p) {
  return p[1];
}

// node_modules/d3-shape/src/line.js
function line_default(x2, y2) {
  var defined = constant_default2(true), context = null, curve = linear_default, output2 = null, path2 = withPath(line);
  x2 = typeof x2 === "function" ? x2 : x2 === void 0 ? x : constant_default2(x2);
  y2 = typeof y2 === "function" ? y2 : y2 === void 0 ? y : constant_default2(y2);
  function line(data) {
    var i, n = (data = array_default(data)).length, d, defined0 = false, buffer;
    if (context == null) output2 = curve(buffer = path2());
    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output2.lineStart();
        else output2.lineEnd();
      }
      if (defined0) output2.point(+x2(d, i, data), +y2(d, i, data));
    }
    if (buffer) return output2 = null, buffer + "" || null;
  }
  line.x = function(_) {
    return arguments.length ? (x2 = typeof _ === "function" ? _ : constant_default2(+_), line) : x2;
  };
  line.y = function(_) {
    return arguments.length ? (y2 = typeof _ === "function" ? _ : constant_default2(+_), line) : y2;
  };
  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant_default2(!!_), line) : defined;
  };
  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output2 = curve(context)), line) : curve;
  };
  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output2 = null : output2 = curve(context = _), line) : context;
  };
  return line;
}

// src/app/features/patient-record/growth-chart/growth-chart.component.ts
var _forTrack04 = ($index, $item) => $item.percentile;
function GrowthChartComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1, " Per\xEDodo hist\xF3rico: estas consultas se representan con la edad que ten\xEDa el paciente en cada fecha. ");
    \u0275\u0275elementEnd();
  }
}
function GrowthChartComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" \xB7 Z ", \u0275\u0275pipeBind2(1, 1, ctx_r0.latestMeasurement().evaluation.zScore, "1.2-3"), " ");
  }
}
function GrowthChartComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1, " No hay mediciones compatibles registradas para este gr\xE1fico. Se muestran las curvas oficiales de referencia. ");
    \u0275\u0275elementEnd();
  }
}
function GrowthChartComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.chart().omitted, " consultas sin los datos compatibles necesarios para este indicador. ");
  }
}
function GrowthChartComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, " Hasta los 2 a\xF1os, el IMC usa longitud (acostado); despu\xE9s, estatura (de pie). El salto entre las curvas corresponde a ese cambio de referencia OMS. ");
    \u0275\u0275elementEnd();
  }
}
function GrowthChartComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 30);
    \u0275\u0275listener("click", function GrowthChartComponent_Conditional_44_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.expandedFrame.set(!ctx_r0.expandedFrame()));
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r0.outsidePDFCount(), " mediciones fuera del marco de impresi\xF3n del PDF; sus valores se conservan en el detalle.");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.expandedFrame() ? "Volver al marco del PDF" : "Ampliar ejes para ver las mediciones", " ");
  }
}
function GrowthChartComponent_For_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "line", 31);
  }
  if (rf & 2) {
    const tick_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("major-grid", ctx_r0.isMajorTick(tick_r3, ctx_r0.axes().x))("year-grid", ctx_r0.definition().x.variable === "AGE" && tick_r3 % 12 === 0);
    \u0275\u0275attribute("x1", ctx_r0.xScale()(tick_r3))("x2", ctx_r0.xScale()(tick_r3))("y1", ctx_r0.plot.top)("y2", ctx_r0.plot.bottom);
  }
}
function GrowthChartComponent_For_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "line", 31);
  }
  if (rf & 2) {
    const tick_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("major-grid", ctx_r0.isMajorTick(tick_r4, ctx_r0.axes().y));
    \u0275\u0275attribute("x1", ctx_r0.plot.left)("x2", ctx_r0.plot.right)("y1", ctx_r0.yScale()(tick_r4))("y2", ctx_r0.yScale()(tick_r4));
  }
}
function GrowthChartComponent_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "text", 32);
    \u0275\u0275text(1, " IMC con longitud \xB7 0\u20132 a\xF1os ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "text", 32);
    \u0275\u0275text(3, " IMC con estatura \xB7 2\u20135 a\xF1os ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "line", 33);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275attribute("x", (ctx_r0.plot.left + ctx_r0.xScale()(24)) / 2);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("x", (ctx_r0.xScale()(24) + ctx_r0.plot.right) / 2);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("x1", ctx_r0.xScale()(24))("x2", ctx_r0.xScale()(24))("y1", ctx_r0.plot.top)("y2", ctx_r0.plot.bottom);
  }
}
function GrowthChartComponent_For_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "text", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "text", 35);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tick_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275attribute("x", ctx_r0.plot.left - 12)("y", ctx_r0.yScale()(tick_r5) + 4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tick_r5, " ");
    \u0275\u0275advance();
    \u0275\u0275attribute("x", ctx_r0.plot.right + 60)("y", ctx_r0.yScale()(tick_r5) + 4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tick_r5, " ");
  }
}
function GrowthChartComponent_For_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "text", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tick_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275attribute("x", ctx_r0.xScale()(tick_r6))("y", ctx_r0.plot.bottom + 19);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.definition().x.variable === "AGE" ? ctx_r0.monthLabel(tick_r6) : tick_r6, " ");
  }
}
function GrowthChartComponent_For_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "text", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tick_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275attribute("x", ctx_r0.xScale()(tick_r7))("y", ctx_r0.plot.bottom + 36);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tick_r7 === 0 ? "Nacimiento" : tick_r7 / 12 + (tick_r7 === 12 ? " a\xF1o" : " a\xF1os"), " ");
  }
}
function GrowthChartComponent_For_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "path", 18)(1, "title");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const curve_r8 = ctx.$implicit;
    \u0275\u0275attribute("data-percentile", curve_r8.percentile)("d", curve_r8.path)("stroke", curve_r8.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("OMS P", curve_r8.percentile);
  }
}
function GrowthChartComponent_For_75_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "text", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const curve_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275attribute("x", ctx_r0.plot.right + 9)("y", ctx_r0.yScale()(curve_r9.end) + 4)("fill", curve_r9.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", curve_r9.percentile, " ");
  }
}
function GrowthChartComponent_For_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, GrowthChartComponent_For_75_Conditional_0_Template, 2, 4, "text", 36);
  }
  if (rf & 2) {
    const curve_r9 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(curve_r9.end !== void 0 && curve_r9.end >= ctx_r0.axes().y.min && curve_r9.end <= ctx_r0.axes().y.max ? 0 : -1);
  }
}
function GrowthChartComponent_For_77_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g", 37, 0);
    \u0275\u0275listener("mouseenter", function GrowthChartComponent_For_77_Template_g_mouseenter_0_listener() {
      const point_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const origin_r12 = \u0275\u0275reference(1);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showPoint(point_r11, origin_r12));
    })("mouseleave", function GrowthChartComponent_For_77_Template_g_mouseleave_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.scheduleHide());
    });
    \u0275\u0275element(2, "circle", 38);
    \u0275\u0275elementStart(3, "path", 39);
    \u0275\u0275listener("focus", function GrowthChartComponent_For_77_Template_path_focus_3_listener() {
      const point_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const origin_r12 = \u0275\u0275reference(1);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showPoint(point_r11, origin_r12));
    })("blur", function GrowthChartComponent_For_77_Template_path_blur_3_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.hidePoint());
    })("keydown.escape", function GrowthChartComponent_For_77_Template_path_keydown_escape_3_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.hidePoint());
    })("click", function GrowthChartComponent_For_77_Template_path_click_3_listener() {
      const point_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const origin_r12 = \u0275\u0275reference(1);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showPoint(point_r11, origin_r12));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const point_r11 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275attribute("cx", ctx_r0.xScale()(point_r11.x))("cy", ctx_r0.yScale()(point_r11.value));
    \u0275\u0275advance();
    \u0275\u0275classProp("unconfirmed-point", !point_r11.evaluation);
    \u0275\u0275attribute("d", ctx_r0.markerPath())("transform", "translate(" + ctx_r0.xScale()(point_r11.x) + " " + ctx_r0.yScale()(point_r11.value) + ")")("aria-label", ctx_r0.tooltip(point_r11))("aria-describedby", ctx_r0.focusedPoint() === point_r11 ? ctx_r0.clipId() + "-consultation" : null);
  }
}
function GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span")(1, "b");
    \u0275\u0275text(2, "Peso");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const point_r15 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(4, 1, point_r15.weightKg, "1.0-2"), " kg");
  }
}
function GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span")(1, "b");
    \u0275\u0275text(2, "Talla");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const point_r15 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(4, 1, point_r15.heightCm, "1.0-1"), " cm");
  }
}
function GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span")(1, "b");
    \u0275\u0275text(2, "Per\xEDmetro cef\xE1lico");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const point_r15 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(4, 1, point_r15.headCircumferenceCm, "1.0-1"), " cm");
  }
}
function GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Conditional_12_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "b");
    \u0275\u0275text(2, "Motivo:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const encounter_r16 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.brief(encounter_r16.chiefComplaint));
  }
}
function GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Conditional_12_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p")(1, "b");
    \u0275\u0275text(2, "Evaluaci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const encounter_r16 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.brief(encounter_r16.primaryDiagnosisDescription));
  }
}
function GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Conditional_12_Conditional_0_Template, 4, 1, "p");
    \u0275\u0275conditionalCreate(1, GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Conditional_12_Conditional_1_Template, 4, 1, "p");
  }
  if (rf & 2) {
    const encounter_r16 = ctx;
    \u0275\u0275conditional(encounter_r16.chiefComplaint?.trim() ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(encounter_r16.primaryDiagnosisDescription?.trim() ? 1 : -1);
  }
}
function GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const point_r15 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" \xB7 Z ", \u0275\u0275pipeBind2(1, 1, point_r15.evaluation.zScore, "1.2-3"), " ");
  }
}
function GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const point_r15 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Conversi\xF3n: ", point_r15.adjustmentCm > 0 ? "+" : "", "", point_r15.adjustmentCm, " cm.");
  }
}
function GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const point_r15 = \u0275\u0275nextContext();
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.brief(point_r15.note));
  }
}
function GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275listener("mouseenter", function GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Template_div_mouseenter_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.cancelHide());
    })("mouseleave", function GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Template_div_mouseleave_0_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.hidePoint());
    });
    \u0275\u0275elementStart(1, "header")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p", 43);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 44);
    \u0275\u0275conditionalCreate(9, GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Conditional_9_Template, 5, 4, "span");
    \u0275\u0275conditionalCreate(10, GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Conditional_10_Template, 5, 4, "span");
    \u0275\u0275conditionalCreate(11, GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Conditional_11_Template, 5, 4, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Conditional_12_Template, 2, 2);
    \u0275\u0275elementStart(13, "p", 45);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275conditionalCreate(16, GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Conditional_16_Template, 2, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(17, GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Conditional_17_Template, 2, 2, "p");
    \u0275\u0275conditionalCreate(18, GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Conditional_18_Template, 2, 1, "p");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_13_0;
    const point_r15 = ctx;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("tooltip-girl", ctx_r0.definition().sex === "FEMALE");
    \u0275\u0275attribute("id", ctx_r0.clipId() + "-consultation");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(point_r15.date));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(point_r15.ageFormatted);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", point_r15.source === "BIRTH" ? "Mediciones al nacer" : ctx_r0.focusedEncounter() ? ctx_r0.consultationLabel(ctx_r0.focusedEncounter().consultationType) : "Consulta cl\xEDnica", " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(point_r15.weightKg !== null ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(point_r15.heightCm !== null ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(point_r15.headCircumferenceCm !== null ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_13_0 = ctx_r0.focusedEncounter()) ? 12 : -1, tmp_13_0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" ", ctx_r0.yTitle(), " \xB7 ", \u0275\u0275pipeBind2(15, 16, point_r15.value, "1.0-3"), " \xB7 ", ctx_r0.percentileLabel(point_r15), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(point_r15.evaluation ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(point_r15.adjustmentCm ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(point_r15.note ? 18 : -1);
  }
}
function GrowthChartComponent_Conditional_78_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, GrowthChartComponent_Conditional_78_ng_template_0_Conditional_0_Template, 19, 19, "div", 41);
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional((tmp_3_0 = ctx_r0.focusedPoint()) ? 0 : -1, tmp_3_0);
  }
}
function GrowthChartComponent_Conditional_78_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275template(0, GrowthChartComponent_Conditional_78_ng_template_0_Template, 1, 1, "ng-template", 40);
    \u0275\u0275listener("overlayKeydown", function GrowthChartComponent_Conditional_78_Template_ng_template_overlayKeydown_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView($event.key === "Escape" && ctx_r0.hidePoint());
    });
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("cdkConnectedOverlayOrigin", ctx)("cdkConnectedOverlayOpen", !!ctx_r0.focusedPoint())("cdkConnectedOverlayPositions", ctx_r0.tooltipPositions)("cdkConnectedOverlayPush", true)("cdkConnectedOverlayViewportMargin", 12);
  }
}
function GrowthChartComponent_Conditional_99_For_21_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const point_r17 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" \xB7 Z ", \u0275\u0275pipeBind2(1, 1, point_r17.evaluation.zScore, "1.2-4"), " ");
  }
}
function GrowthChartComponent_Conditional_99_For_21_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const point_r17 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate2(" ", point_r17.adjustmentCm, " cm. Original: ", point_r17.heightCm, " cm. ");
  }
}
function GrowthChartComponent_Conditional_99_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275conditionalCreate(13, GrowthChartComponent_Conditional_99_For_21_Conditional_13_Template, 2, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td");
    \u0275\u0275text(15);
    \u0275\u0275conditionalCreate(16, GrowthChartComponent_Conditional_99_For_21_Conditional_16_Template, 1, 2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const point_r17 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatDate(point_r17.date));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", point_r17.ageFormatted, " \xB7 ", point_r17.ageDays, " d\xEDas");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 9, point_r17.x, "1.0-4"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 12, point_r17.value, "1.0-4"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.percentileLabel(point_r17), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(point_r17.evaluation ? 13 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", point_r17.note ?? "\u2014", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(point_r17.adjustmentCm ? 16 : -1);
  }
}
function GrowthChartComponent_Conditional_99_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details", 29)(1, "summary");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 46)(4, "table")(5, "thead")(6, "tr")(7, "th");
    \u0275\u0275text(8, "Fecha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Edad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th");
    \u0275\u0275text(16, "Percentil / Z");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th");
    \u0275\u0275text(18, "Observaciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "tbody");
    \u0275\u0275repeaterCreate(20, GrowthChartComponent_Conditional_99_For_21_Template, 17, 15, "tr", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Detalle de ", ctx_r0.chart().points.length, " mediciones");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r0.xTitle());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.yTitle());
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r0.chart().points);
  }
}
var COLORS = ["#dc2626", "#ea580c", "#16a34a", "#ea580c", "#dc2626"];
var HEART = "M0 4.5 C-1 3.5 -4.5 1 -4.5 -1.5 C-4.5 -3.157 -3.157 -4.5 -1.5 -4.5 C-0.75 -4.5 0 -3.75 0 -2.5 C0 -3.75 0.75 -4.5 1.5 -4.5 C3.157 -4.5 4.5 -3.157 4.5 -1.5 C4.5 1 1 3.5 0 4.5 Z";
var STAR = "M0 -4.5 L1.39 -1.37 L4.5 -1.06 L2.25 1.29 L2.78 4.5 L0 2.88 L-2.78 4.5 L-2.25 1.29 L-4.5 -1.06 L-1.39 -1.37 Z";
var GrowthChartComponent = class _GrowthChartComponent {
  chart = input.required(
    ...ngDevMode ? [{ debugName: "chart" }] : (
      /* istanbul ignore next */
      []
    )
  );
  encounters = input(
    /* @__PURE__ */ new Map(),
    ...ngDevMode ? [{ debugName: "encounters" }] : (
      /* istanbul ignore next */
      []
    )
  );
  expandedFrame = signal(
    false,
    ...ngDevMode ? [{ debugName: "expandedFrame" }] : (
      /* istanbul ignore next */
      []
    )
  );
  focusedPoint = signal(
    null,
    ...ngDevMode ? [{ debugName: "focusedPoint" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tooltipOrigin = signal(
    null,
    ...ngDevMode ? [{ debugName: "tooltipOrigin" }] : (
      /* istanbul ignore next */
      []
    )
  );
  focusedEncounter = computed(
    () => {
      const id = this.focusedPoint()?.encounterId;
      return id == null ? null : this.encounters().get(id) ?? null;
    },
    ...ngDevMode ? [{ debugName: "focusedEncounter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tooltipPositions = [
    { originX: "center", originY: "top", overlayX: "center", overlayY: "bottom", offsetY: -12 },
    { originX: "center", originY: "bottom", overlayX: "center", overlayY: "top", offsetY: 12 }
  ];
  hideTimer;
  clipId = computed(
    () => `oms-plot-${this.definition().id}`,
    ...ngDevMode ? [{ debugName: "clipId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  plot = { left: 68, right: 976, top: 24, bottom: 420 };
  definition = computed(
    () => this.chart().definition,
    ...ngDevMode ? [{ debugName: "definition" }] : (
      /* istanbul ignore next */
      []
    )
  );
  latestMeasurement = computed(
    () => this.chart().points.at(-1) ?? null,
    ...ngDevMode ? [{ debugName: "latestMeasurement" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sexLabel = computed(
    () => this.definition().sex === "FEMALE" ? "Ni\xF1as" : "Ni\xF1os",
    ...ngDevMode ? [{ debugName: "sexLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  markerPath = computed(
    () => this.definition().sex === "FEMALE" ? HEART : STAR,
    ...ngDevMode ? [{ debugName: "markerPath" }] : (
      /* istanbul ignore next */
      []
    )
  );
  markerLabel = computed(
    () => this.definition().sex === "FEMALE" ? "corazones rosas" : "estrellas azules",
    ...ngDevMode ? [{ debugName: "markerLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rangeLabel = computed(
    () => {
      const d = this.definition();
      return `${d.ageMinMonths === 0 ? "Nacimiento" : `${d.ageMinMonths / 12} a\xF1os`} a ${d.ageMaxMonths / 12} a\xF1os`;
    },
    ...ngDevMode ? [{ debugName: "rangeLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  evaluatedCount = computed(
    () => this.chart().points.filter((p) => p.evaluation !== null).length,
    ...ngDevMode ? [{ debugName: "evaluatedCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  outsidePDFCount = computed(
    () => this.chart().points.filter((p) => !this.inFrame(p, this.definition().x, this.definition().y)).length,
    ...ngDevMode ? [{ debugName: "outsidePDFCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  axes = computed(
    () => {
      const d = this.definition();
      if (!this.expandedFrame() || !this.chart().points.length)
        return { x: d.x, y: d.y };
      const bounds = this.chart().points.reduce((b, p) => ({
        minX: Math.min(b.minX, p.x),
        maxX: Math.max(b.maxX, p.x),
        minY: Math.min(b.minY, p.value),
        maxY: Math.max(b.maxY, p.value)
      }), { minX: d.x.min, maxX: d.x.max, minY: d.y.min, maxY: d.y.max });
      return {
        x: __spreadProps(__spreadValues({}, d.x), {
          min: Math.min(d.x.min, Math.floor(bounds.minX / d.x.step) * d.x.step),
          max: Math.max(d.x.max, Math.ceil(bounds.maxX / d.x.step) * d.x.step)
        }),
        y: __spreadProps(__spreadValues({}, d.y), {
          min: Math.min(d.y.min, Math.floor(bounds.minY / d.y.step) * d.y.step),
          max: Math.max(d.y.max, Math.ceil(bounds.maxY / d.y.step) * d.y.step)
        })
      };
    },
    ...ngDevMode ? [{ debugName: "axes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  xScale = computed(
    () => linear2().domain([this.axes().x.min, this.axes().x.max]).range([this.plot.left, this.plot.right]),
    ...ngDevMode ? [{ debugName: "xScale" }] : (
      /* istanbul ignore next */
      []
    )
  );
  yScale = computed(
    () => linear2().domain([this.axes().y.min, this.axes().y.max]).range([this.plot.bottom, this.plot.top]),
    ...ngDevMode ? [{ debugName: "yScale" }] : (
      /* istanbul ignore next */
      []
    )
  );
  xGrid = computed(
    () => this.ticks(this.axes().x, true),
    ...ngDevMode ? [{ debugName: "xGrid" }] : (
      /* istanbul ignore next */
      []
    )
  );
  yGrid = computed(
    () => this.ticks(this.axes().y, true),
    ...ngDevMode ? [{ debugName: "yGrid" }] : (
      /* istanbul ignore next */
      []
    )
  );
  xLabels = computed(
    () => this.ticks(this.axes().x, false),
    ...ngDevMode ? [{ debugName: "xLabels" }] : (
      /* istanbul ignore next */
      []
    )
  );
  yLabels = computed(
    () => this.ticks(this.axes().y, false),
    ...ngDevMode ? [{ debugName: "yLabels" }] : (
      /* istanbul ignore next */
      []
    )
  );
  years = computed(
    () => this.definition().x.variable === "AGE" ? this.xGrid().filter((t) => t % 12 === 0) : [],
    ...ngDevMode ? [{ debugName: "years" }] : (
      /* istanbul ignore next */
      []
    )
  );
  visiblePoints = computed(
    () => this.chart().points.filter((p) => this.inFrame(p, this.axes().x, this.axes().y)),
    ...ngDevMode ? [{ debugName: "visiblePoints" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasBMITransition = computed(
    () => this.definition().dataset.startsWith("bfa06") && this.chart().curves.some((p) => p.x < 24) && this.chart().curves.some((p) => p.x > 24) && this.axes().x.min < 24 && this.axes().x.max > 24,
    ...ngDevMode ? [{ debugName: "hasBMITransition" }] : (
      /* istanbul ignore next */
      []
    )
  );
  curvePaths = computed(
    () => {
      const points = this.splitBMITransition(this.chart().curves);
      return this.definition().percentiles.map((percentile, i) => ({
        percentile,
        color: COLORS[i],
        path: line_default().defined((p) => p !== null).x((p) => this.xScale()(p.x)).y((p) => this.yScale()(p.values[i]))(points) ?? "",
        end: this.chart().curves.filter((p) => p.x <= this.axes().x.max && p.x >= this.axes().x.min).at(-1)?.values[i]
      }));
    },
    ...ngDevMode ? [{ debugName: "curvePaths" }] : (
      /* istanbul ignore next */
      []
    )
  );
  patientPath = computed(
    () => line_default().defined((p) => p !== null && this.inFrame(p, this.axes().x, this.axes().y)).x((p) => this.xScale()(p.x)).y((p) => this.yScale()(p.value))(this.splitBMITransition(this.chart().points)) ?? "",
    ...ngDevMode ? [{ debugName: "patientPath" }] : (
      /* istanbul ignore next */
      []
    )
  );
  xTitle = computed(
    () => this.definition().x.variable === "AGE" ? "Edad (meses y a\xF1os cumplidos)" : `${this.definition().x.variable === "LENGTH" ? "Longitud" : "Estatura"} (cm)`,
    ...ngDevMode ? [{ debugName: "xTitle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  yTitle = computed(
    () => ({
      WEIGHT: "Peso",
      LENGTH: "Longitud",
      HEIGHT: "Estatura",
      HEAD_CIRCUMFERENCE: "Per\xEDmetro cef\xE1lico",
      BMI: "IMC",
      AGE: "Edad"
    })[this.definition().y.variable] + ` (${this.definition().y.unit})`,
    ...ngDevMode ? [{ debugName: "yTitle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect((onCleanup) => {
      this.chart();
      this.expandedFrame.set(false);
      this.hidePoint();
      onCleanup(() => this.cancelHide());
    });
  }
  showPoint(point, origin) {
    this.cancelHide();
    this.tooltipOrigin.set(origin);
    this.focusedPoint.set(point);
  }
  cancelHide() {
    clearTimeout(this.hideTimer);
    this.hideTimer = void 0;
  }
  scheduleHide() {
    this.cancelHide();
    this.hideTimer = setTimeout(() => this.hidePoint(), 150);
  }
  hidePoint() {
    this.cancelHide();
    this.focusedPoint.set(null);
    this.tooltipOrigin.set(null);
  }
  consultationLabel(type) {
    return {
      FIRST_VISIT: "Primera consulta",
      FOLLOW_UP: "Seguimiento",
      ROUTINE_CHECKUP: "Control de rutina",
      EMERGENCY: "Urgencia",
      INTERCONSULTATION: "Interconsulta"
    }[type];
  }
  brief(value) {
    const text = value.trim().replace(/\s+/g, " ");
    return text.length > 160 ? text.slice(0, 157).trimEnd() + "\u2026" : text;
  }
  ticks(axis, minor) {
    const step = minor ? axis.minorStep : axis.step;
    const first = Math.ceil(axis.min / step) * step;
    const count = Math.floor((axis.max - first) / step) + 1;
    const stride = Math.max(1, Math.ceil(count / 240));
    return Array.from({ length: Math.ceil(count / stride) }, (_, i) => Number((first + i * step * stride).toFixed(6)));
  }
  splitBMITransition(points) {
    if (!this.hasBMITransition())
      return points;
    const segments = [];
    let previous;
    for (const point of points) {
      if (previous && previous.x < 24 && point.x >= 24)
        segments.push(null);
      segments.push(point);
      previous = point;
    }
    return segments;
  }
  isMajorTick(value, axis) {
    return Math.abs(value / axis.step - Math.round(value / axis.step)) < 1e-6;
  }
  inFrame(p, x2, y2) {
    return Number.isFinite(p.x) && Number.isFinite(p.value) && p.x >= x2.min && p.x <= x2.max && p.value >= y2.min && p.value <= y2.max;
  }
  monthLabel(value) {
    return value % 12 === 0 ? "" : String(value % 12);
  }
  formatDate(value) {
    return value.split("-").reverse().join("/");
  }
  percentileLabel(point) {
    const e = point.evaluation;
    if (!e)
      return "Sin evaluaci\xF3n";
    if (e.percentileLimit)
      return `P${e.percentileLimit}`;
    return `P${e.percentile.toFixed(2)}`;
  }
  tooltip(point) {
    return `${this.formatDate(point.date)} \xB7 ${point.ageFormatted} (${point.ageDays} d\xEDas) \xB7 ${point.value.toFixed(3)} ${this.definition().y.unit} \xB7 ${this.percentileLabel(point)}${point.evaluation ? ` \xB7 Z ${point.evaluation.zScore.toFixed(3)}` : ""}${point.adjustmentCm ? ` \xB7 Conversi\xF3n ${point.adjustmentCm > 0 ? "+" : ""}${point.adjustmentCm} cm` : ""}${point.note ? ` \xB7 ${point.note}` : ""}`;
  }
  static \u0275fac = function GrowthChartComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GrowthChartComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GrowthChartComponent, selectors: [["app-growth-chart"]], inputs: { chart: [1, "chart"], encounters: [1, "encounters"] }, decls: 100, vars: 59, consts: [["origin", "cdkOverlayOrigin"], [1, "growth-chart-card"], [1, "oms-top-banner"], [1, "chart-card-content"], [1, "notice"], [1, "metrics-summary-bar"], [1, "patient-value"], [1, "bmi-transition-note"], [1, "frame-control"], ["cdkScrollable", "", "tabindex", "0", 1, "chart-scroll"], ["viewBox", "0 0 1080 492", "role", "img", 1, "growth-svg"], [1, "grid-line", 3, "major-grid", "year-grid"], [1, "grid-line", 3, "major-grid"], [1, "plot-border"], ["text-anchor", "middle", 1, "tick-label"], ["text-anchor", "middle", 1, "year-label"], ["x", "520", "y", "482", "text-anchor", "middle", 1, "axis-title"], ["transform", "translate(17 224) rotate(-90)", "text-anchor", "middle", 1, "axis-title"], [1, "reference-curve"], [1, "patient-line"], ["cdkOverlayOrigin", ""], ["cdkConnectedOverlay", "", 3, "cdkConnectedOverlayOrigin", "cdkConnectedOverlayOpen", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPush", "cdkConnectedOverlayViewportMargin"], ["role", "status", 1, "point-tooltip"], ["aria-label", "Leyenda", 1, "legend-container"], ["viewBox", "-6 -6 12 12", "aria-hidden", "true", 1, "legend-marker"], [1, "legend-sample", "median"], [1, "legend-sample", "middle"], [1, "legend-sample", "outer"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], [1, "measurement-details"], ["type", "button", 3, "click"], [1, "grid-line"], ["y", "14", "text-anchor", "middle", 1, "bmi-period-label"], [1, "bmi-transition-line"], ["text-anchor", "end", 1, "tick-label"], [1, "tick-label"], [1, "percentile-label"], ["cdkOverlayOrigin", "", 3, "mouseenter", "mouseleave"], ["r", "9", "aria-hidden", "true", 1, "point-hit-area"], ["tabindex", "0", "role", "img", 1, "patient-point", 3, "focus", "blur", "keydown.escape", "click"], ["cdkConnectedOverlay", "", 3, "overlayKeydown", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayOpen", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPush", "cdkConnectedOverlayViewportMargin"], ["role", "tooltip", 1, "consultation-tooltip", 3, "tooltip-girl"], ["role", "tooltip", 1, "consultation-tooltip", 3, "mouseenter", "mouseleave"], [1, "consultation-type"], [1, "consultation-measurements"], [1, "consultation-percentile"], [1, "table-scroll"]], template: function GrowthChartComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "article", 1)(1, "header", 2)(2, "h3");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 3);
      \u0275\u0275conditionalCreate(7, GrowthChartComponent_Conditional_7_Template, 2, 0, "p", 4);
      \u0275\u0275elementStart(8, "dl", 5)(9, "div")(10, "dt");
      \u0275\u0275text(11, "\xDAltimo valor en esta referencia");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "dd", 6);
      \u0275\u0275text(13);
      \u0275\u0275pipe(14, "number");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div")(16, "dt");
      \u0275\u0275text(17, "Edad en esa consulta");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "dd");
      \u0275\u0275text(19);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div")(21, "dt");
      \u0275\u0275text(22, "Fecha");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "dd");
      \u0275\u0275text(24);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div")(26, "dt");
      \u0275\u0275text(27, "Percentil OMS / Z");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "dd");
      \u0275\u0275text(29);
      \u0275\u0275conditionalCreate(30, GrowthChartComponent_Conditional_30_Template, 2, 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "div")(32, "dt");
      \u0275\u0275text(33, "Puntos en gr\xE1fico");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "dd");
      \u0275\u0275text(35);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(36, "div")(37, "dt");
      \u0275\u0275text(38, "Referencia");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "dd");
      \u0275\u0275text(40);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(41, GrowthChartComponent_Conditional_41_Template, 2, 0, "p", 4);
      \u0275\u0275conditionalCreate(42, GrowthChartComponent_Conditional_42_Template, 2, 1, "p", 4);
      \u0275\u0275conditionalCreate(43, GrowthChartComponent_Conditional_43_Template, 2, 0, "p", 7);
      \u0275\u0275conditionalCreate(44, GrowthChartComponent_Conditional_44_Template, 5, 2, "div", 8);
      \u0275\u0275elementStart(45, "div", 9);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(46, "svg", 10)(47, "title");
      \u0275\u0275text(48);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "desc");
      \u0275\u0275text(50);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "defs")(52, "clipPath");
      \u0275\u0275element(53, "rect");
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(54, GrowthChartComponent_For_55_Template, 1, 8, "line", 11, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275repeaterCreate(56, GrowthChartComponent_For_57_Template, 1, 6, "line", 12, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275conditionalCreate(58, GrowthChartComponent_Conditional_58_Template, 5, 6);
      \u0275\u0275element(59, "rect", 13);
      \u0275\u0275repeaterCreate(60, GrowthChartComponent_For_61_Template, 4, 6, null, null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275repeaterCreate(62, GrowthChartComponent_For_63_Template, 2, 3, "text", 14, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275repeaterCreate(64, GrowthChartComponent_For_65_Template, 2, 3, "text", 15, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementStart(66, "text", 16);
      \u0275\u0275text(67);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "text", 17);
      \u0275\u0275text(69);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "g");
      \u0275\u0275repeaterCreate(71, GrowthChartComponent_For_72_Template, 3, 4, "path", 18, _forTrack04);
      \u0275\u0275element(73, "path", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(74, GrowthChartComponent_For_75_Template, 1, 1, null, null, _forTrack04);
      \u0275\u0275repeaterCreate(76, GrowthChartComponent_For_77_Template, 4, 8, "g", 20, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(78, GrowthChartComponent_Conditional_78_Template, 1, 5, null, 21);
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(79, "div", 22);
      \u0275\u0275text(80);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(81, "ul", 23)(82, "li");
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(83, "svg", 24);
      \u0275\u0275element(84, "path");
      \u0275\u0275elementEnd();
      \u0275\u0275text(85);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(86, "li");
      \u0275\u0275element(87, "span", 25);
      \u0275\u0275text(88, "P50 (mediana)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(89, "li");
      \u0275\u0275element(90, "span", 26);
      \u0275\u0275text(91, "P15 y P85");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(92, "li");
      \u0275\u0275element(93, "span", 27);
      \u0275\u0275text(94, "P3 y P97");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(95, "footer")(96, "a", 28);
      \u0275\u0275text(97);
      \u0275\u0275elementEnd();
      \u0275\u0275text(98);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(99, GrowthChartComponent_Conditional_99_Template, 22, 3, "details", 29);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_45_0;
      \u0275\u0275classProp("theme-girl", ctx.definition().sex === "FEMALE")("bmi-chart", ctx.definition().indicator === "BMI");
      \u0275\u0275attribute("data-chart-id", ctx.definition().id);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.definition().title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate2("", ctx.sexLabel(), " \xB7 ", ctx.rangeLabel());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.chart().applicable ? 7 : -1);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate2(" ", ctx.latestMeasurement() ? \u0275\u0275pipeBind2(14, 56, ctx.latestMeasurement().value, "1.0-3") : "Sin registros", " ", ctx.latestMeasurement() ? ctx.definition().y.unit : "", " ");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.latestMeasurement()?.ageFormatted ?? "\u2014");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.latestMeasurement() ? ctx.formatDate(ctx.latestMeasurement().date) : "\u2014");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.latestMeasurement() ? ctx.percentileLabel(ctx.latestMeasurement()) : "\u2014", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.latestMeasurement()?.evaluation ? 30 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate3(" ", ctx.visiblePoints().length, " de ", ctx.chart().points.length, " \xB7 ", ctx.evaluatedCount(), " evaluados ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.definition().reference.replace("WHO", "OMS"));
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.chart().points.length === 0 ? 41 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.chart().omitted > 0 ? 42 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.hasBMITransition() ? 43 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.outsidePDFCount() > 0 ? 44 : -1);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", ctx.definition().title + ": gr\xE1fico desplazable");
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-labelledby", ctx.clipId() + "-title " + ctx.clipId() + "-desc");
      \u0275\u0275advance();
      \u0275\u0275attribute("id", ctx.clipId() + "-title");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate3(" ", ctx.definition().title, " \xB7 ", ctx.sexLabel(), " \xB7 ", ctx.rangeLabel(), " ");
      \u0275\u0275advance();
      \u0275\u0275attribute("id", ctx.clipId() + "-desc");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate3(" Curvas OMS P3, P15, P50, P85 y P97. Eje horizontal: ", ctx.xTitle(), ". Eje vertical: ", ctx.yTitle(), ". Las mediciones se identifican con ", ctx.markerLabel(), ". Sus valores y fechas est\xE1n disponibles tambi\xE9n en el detalle. ");
      \u0275\u0275advance(2);
      \u0275\u0275attribute("id", ctx.clipId());
      \u0275\u0275advance();
      \u0275\u0275attribute("x", ctx.plot.left)("y", ctx.plot.top)("width", ctx.plot.right - ctx.plot.left)("height", ctx.plot.bottom - ctx.plot.top);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.xGrid());
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.yGrid());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.hasBMITransition() ? 58 : -1);
      \u0275\u0275advance();
      \u0275\u0275attribute("x", ctx.plot.left)("y", ctx.plot.top)("width", ctx.plot.right - ctx.plot.left)("height", ctx.plot.bottom - ctx.plot.top);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.yLabels());
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.xLabels());
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.years());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.xTitle());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.yTitle(), " ");
      \u0275\u0275advance();
      \u0275\u0275attribute("clip-path", "url(#" + ctx.clipId() + ")");
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.curvePaths());
      \u0275\u0275advance(2);
      \u0275\u0275attribute("d", ctx.patientPath());
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.curvePaths());
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.visiblePoints());
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_45_0 = ctx.tooltipOrigin()) ? 78 : -1, tmp_45_0);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.focusedPoint() ? ctx.tooltip(ctx.focusedPoint()) : "Pas\xE1 el cursor o enfoc\xE1 una medici\xF3n para ver sus datos.", " ");
      \u0275\u0275advance(4);
      \u0275\u0275attribute("d", ctx.markerPath());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" Paciente \xB7 ", ctx.markerLabel(), " ");
      \u0275\u0275advance(11);
      \u0275\u0275property("href", ctx.definition().source, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1("", ctx.definition().reference.replace("WHO", "OMS"), " \xB7 fuente oficial");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate2(" \xB7 L\xE1mina ", ctx.definition().pdfNumber, " / p\xE1gina ", ctx.definition().pdfPage, " del PDF. Las evaluaciones usan edad cronol\xF3gica y no constituyen un diagn\xF3stico. ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.chart().points.length > 0 ? 99 : -1);
    }
  }, dependencies: [CdkConnectedOverlay, CdkOverlayOrigin, CdkScrollable, DecimalPipe], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n}\n.growth-chart-card[_ngcontent-%COMP%] {\n  --%NS%patient-color: #2563eb;\n  --%NS%patient-focus: #072b76;\n  border: 1px solid var(--%NS%dc-outline, #bed0e5);\n  border-radius: 12px;\n  background: var(--%NS%dc-surface, #fff);\n  overflow: hidden;\n  margin: 0 0 24px;\n}\n.theme-girl[_ngcontent-%COMP%] {\n  --%NS%patient-color: #ec4899;\n  --%NS%patient-focus: #9d174d;\n}\n.oms-top-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  flex-wrap: wrap;\n  padding: 16px 20px;\n  background: #789fce;\n  color: white;\n}\n.theme-girl[_ngcontent-%COMP%]   .oms-top-banner[_ngcontent-%COMP%] {\n  background: #8d92c2;\n}\n.oms-top-banner[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 17px;\n  font-weight: 700;\n  margin: 0;\n}\n.oms-top-banner[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.chart-card-content[_ngcontent-%COMP%] {\n  padding: 18px 20px;\n}\n.metrics-summary-bar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 18px;\n  flex-wrap: wrap;\n  padding: 14px 16px;\n  border: 1px solid var(--%NS%dc-outline, #e0e7ef);\n  border-radius: 8px;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  margin: 0 0 16px;\n}\n.metrics-summary-bar[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  flex: 1 1 145px;\n}\n.metrics-summary-bar[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  margin-bottom: 5px;\n}\n.metrics-summary-bar[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--%NS%dc-ink, #17233c);\n  font-weight: 600;\n  margin: 0;\n}\n.metrics-summary-bar[_ngcontent-%COMP%]   .patient-value[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-blue-ink, #2563eb);\n}\n.notice[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-teal-surface, #eef7fa);\n  border-radius: 6px;\n  color: var(--%NS%dc-ink-secondary, #35576b);\n  font-size: 13px;\n  line-height: 1.6;\n  padding: 10px 14px;\n}\n.frame-control[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  flex-wrap: wrap;\n  font-size: 12px;\n  margin-bottom: 14px;\n  color: var(--%NS%dc-warning-ink, #5e492c);\n}\n.frame-control[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid var(--%NS%dc-outline, #c9d6e4);\n  background: var(--%NS%dc-surface, white);\n  border-radius: 6px;\n  padding: 7px 10px;\n  color: var(--%NS%dc-ink-secondary, #165867);\n}\n.chart-scroll[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  max-width: 100%;\n  background: var(--%NS%dc-surface, white);\n  padding-top: 6px;\n}\n.growth-svg[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  min-width: 960px;\n  height: auto;\n  max-height: 640px;\n}\n.grid-line[_ngcontent-%COMP%] {\n  stroke: #c4cbd4;\n  stroke-width: 0.6;\n  shape-rendering: crispEdges;\n}\n.year-grid[_ngcontent-%COMP%] {\n  stroke: #485568;\n  stroke-width: 1.2;\n}\n.bmi-chart[_ngcontent-%COMP%]   .grid-line[_ngcontent-%COMP%] {\n  stroke: var(--%NS%dc-outline, #e2e8f0);\n  stroke-width: 0.5;\n}\n.bmi-chart[_ngcontent-%COMP%]   .major-grid[_ngcontent-%COMP%] {\n  stroke: #bdc9d8;\n  stroke-width: 0.7;\n}\n.bmi-chart[_ngcontent-%COMP%]   .year-grid[_ngcontent-%COMP%] {\n  stroke: #8798ad;\n  stroke-width: 1;\n}\n.bmi-transition-line[_ngcontent-%COMP%] {\n  stroke: #64748b;\n  stroke-width: 1.2;\n  stroke-dasharray: 5 4;\n}\n.bmi-period-label[_ngcontent-%COMP%] {\n  fill: var(--%NS%dc-ink-secondary, #475569);\n  font-size: 10px;\n  font-weight: 600;\n}\n.bmi-transition-note[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink-secondary, #475569);\n  font-size: 12px;\n  line-height: 1.6;\n  margin: 12px 0;\n}\n.plot-border[_ngcontent-%COMP%] {\n  stroke: #172033;\n  fill: none;\n  stroke-width: 1.2;\n}\n.tick-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  fill: var(--%NS%dc-ink, #253044);\n}\n.year-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  fill: var(--%NS%dc-ink, #253044);\n  font-weight: 600;\n}\n.axis-title[_ngcontent-%COMP%] {\n  font-size: 12px;\n  fill: var(--%NS%dc-ink, #253044);\n  font-weight: 600;\n}\n.reference-curve[_ngcontent-%COMP%] {\n  fill: none;\n  stroke-width: 1.7;\n  vector-effect: non-scaling-stroke;\n}\n.reference-curve[data-percentile="50"][_ngcontent-%COMP%] {\n  stroke-width: 2;\n}\n.patient-line[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: var(--%NS%patient-color);\n  stroke-width: 1.7;\n  vector-effect: non-scaling-stroke;\n}\n.patient-point[_ngcontent-%COMP%] {\n  fill: var(--%NS%patient-color);\n  stroke: white;\n  stroke-width: 1.3;\n  cursor: pointer;\n  vector-effect: non-scaling-stroke;\n}\n.point-hit-area[_ngcontent-%COMP%] {\n  fill: transparent;\n  pointer-events: all;\n  cursor: pointer;\n}\n.consultation-tooltip[_ngcontent-%COMP%] {\n  width: 300px;\n  max-width: calc(100vw - 24px);\n  box-sizing: border-box;\n  padding: 14px 16px;\n  border: 1px solid #bed0e5;\n  border-top: 3px solid #2563eb;\n  border-radius: 10px;\n  background: white;\n  color: #17233c;\n  box-shadow: 0 8px 28px rgb(15 23 42 / 18%);\n  font-size: 12px;\n  line-height: 1.5;\n  overflow-wrap: anywhere;\n}\n.consultation-tooltip.tooltip-girl[_ngcontent-%COMP%] {\n  border-top-color: #ec4899;\n}\n.consultation-tooltip[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n}\n.consultation-tooltip[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.consultation-tooltip[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.consultation-type[_ngcontent-%COMP%] {\n  color: #64748b;\n}\n.consultation-tooltip[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 8px 0 0;\n}\n.consultation-measurements[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px 12px;\n  padding: 8px 0;\n  margin-top: 8px;\n  border-block: 1px solid #e2e8f0;\n}\n.consultation-percentile[_ngcontent-%COMP%] {\n  color: #35576b;\n}\n.unconfirmed-point[_ngcontent-%COMP%] {\n  fill: white;\n  stroke: var(--%NS%patient-color);\n  stroke-width: 2;\n}\n.patient-point[_ngcontent-%COMP%]:focus {\n  outline: none;\n  stroke: var(--%NS%patient-focus);\n  stroke-width: 3;\n}\n.percentile-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n}\n.point-tooltip[_ngcontent-%COMP%] {\n  min-height: 36px;\n  padding: 8px 12px;\n  border-radius: 5px;\n  background: var(--%NS%dc-surface-low, #f1f6fc);\n  color: var(--%NS%dc-ink-secondary, #263e61);\n  font-size: 12px;\n  line-height: 1.5;\n}\n.legend-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 22px;\n  list-style: none;\n  padding: 12px 0 0;\n  margin: 0;\n  font-size: 12px;\n  color: var(--%NS%dc-ink-secondary, #344155);\n}\n.legend-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n}\n.legend-sample[_ngcontent-%COMP%] {\n  width: 24px;\n  border-top: 3px solid;\n}\n.legend-marker[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  fill: var(--%NS%patient-color);\n}\n.median[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-success-ink, #16a34a);\n}\n.middle[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-warning-ink, #ea580c);\n}\n.outer[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-error-ink, #dc2626);\n}\nfooter[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  line-height: 1.8;\n  margin: 12px 0;\n}\nfooter[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-teal-ink, #006778);\n}\n.measurement-details[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  padding-top: 12px;\n  font-size: 12px;\n}\n.measurement-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: var(--%NS%dc-ink-secondary, #285265);\n}\n.table-scroll[_ngcontent-%COMP%] {\n  overflow: auto;\n  max-height: 380px;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 10px;\n}\nth[_ngcontent-%COMP%], \ntd[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 9px;\n  border-bottom: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  white-space: normal;\n  min-width: 100px;\n}\nth[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  color: var(--%NS%dc-ink-secondary, #344155);\n}\n@media (max-width: 700px) {\n  .chart-card-content[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .oms-top-banner[_ngcontent-%COMP%] {\n    padding: 14px;\n  }\n  .metrics-summary-bar[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n  .growth-svg[_ngcontent-%COMP%] {\n    min-width: 1080px;\n  }\n  .legend-container[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n}\n/*# sourceMappingURL=growth-chart.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GrowthChartComponent, [{
    type: Component,
    args: [{ selector: "app-growth-chart", imports: [DecimalPipe, CdkConnectedOverlay, CdkOverlayOrigin, CdkScrollable], changeDetection: ChangeDetectionStrategy.OnPush, template: `<article\r
  class="growth-chart-card"\r
  [class.theme-girl]="definition().sex === 'FEMALE'"\r
  [class.bmi-chart]="definition().indicator === 'BMI'"\r
  [attr.data-chart-id]="definition().id"\r
>\r
  <header class="oms-top-banner">\r
    <h3>{{ definition().title }}</h3>\r
    <span>{{ sexLabel() }} \xB7 {{ rangeLabel() }}</span>\r
  </header>\r
  <div class="chart-card-content">\r
    @if (!chart().applicable) {\r
      <p class="notice">\r
        Per\xEDodo hist\xF3rico: estas consultas se representan con la edad que ten\xEDa el paciente en cada\r
        fecha.\r
      </p>\r
    }\r
    <dl class="metrics-summary-bar">\r
      <div>\r
        <dt>\xDAltimo valor en esta referencia</dt>\r
        <dd class="patient-value">\r
          {{\r
            latestMeasurement() ? (latestMeasurement()!.value | number: '1.0-3') : 'Sin registros'\r
          }}\r
          {{ latestMeasurement() ? definition().y.unit : '' }}\r
        </dd>\r
      </div>\r
      <div>\r
        <dt>Edad en esa consulta</dt>\r
        <dd>{{ latestMeasurement()?.ageFormatted ?? '\u2014' }}</dd>\r
      </div>\r
      <div>\r
        <dt>Fecha</dt>\r
        <dd>{{ latestMeasurement() ? formatDate(latestMeasurement()!.date) : '\u2014' }}</dd>\r
      </div>\r
      <div>\r
        <dt>Percentil OMS / Z</dt>\r
        <dd>\r
          {{ latestMeasurement() ? percentileLabel(latestMeasurement()!) : '\u2014' }}\r
          @if (latestMeasurement()?.evaluation) {\r
            \xB7 Z {{ latestMeasurement()!.evaluation!.zScore | number: '1.2-3' }}\r
          }\r
        </dd>\r
      </div>\r
      <div>\r
        <dt>Puntos en gr\xE1fico</dt>\r
        <dd>\r
          {{ visiblePoints().length }} de {{ chart().points.length }} \xB7\r
          {{ evaluatedCount() }} evaluados\r
        </dd>\r
      </div>\r
      <div>\r
        <dt>Referencia</dt>\r
        <dd>{{ definition().reference.replace('WHO', 'OMS') }}</dd>\r
      </div>\r
    </dl>\r
    @if (chart().points.length === 0) {\r
      <p class="notice">\r
        No hay mediciones compatibles registradas para este gr\xE1fico. Se muestran las curvas\r
        oficiales de referencia.\r
      </p>\r
    }\r
    @if (chart().omitted > 0) {\r
      <p class="notice">\r
        {{ chart().omitted }} consultas sin los datos compatibles necesarios para este indicador.\r
      </p>\r
    }\r
    @if (hasBMITransition()) {\r
      <p class="bmi-transition-note">\r
        Hasta los 2 a\xF1os, el IMC usa longitud (acostado); despu\xE9s, estatura (de pie). El salto entre\r
        las curvas corresponde a ese cambio de referencia OMS.\r
      </p>\r
    }\r
    @if (outsidePDFCount() > 0) {\r
      <div class="frame-control">\r
        <span\r
          >{{ outsidePDFCount() }} mediciones fuera del marco de impresi\xF3n del PDF; sus valores se\r
          conservan en el detalle.</span\r
        ><button type="button" (click)="expandedFrame.set(!expandedFrame())">\r
          {{ expandedFrame() ? 'Volver al marco del PDF' : 'Ampliar ejes para ver las mediciones' }}\r
        </button>\r
      </div>\r
    }\r
    <div\r
      class="chart-scroll"\r
      cdkScrollable\r
      tabindex="0"\r
      [attr.aria-label]="definition().title + ': gr\xE1fico desplazable'"\r
    >\r
      <svg\r
        class="growth-svg"\r
        viewBox="0 0 1080 492"\r
        role="img"\r
        [attr.aria-labelledby]="clipId() + '-title ' + clipId() + '-desc'"\r
      >\r
        <title [attr.id]="clipId() + '-title'">\r
          {{ definition().title }} \xB7 {{ sexLabel() }} \xB7 {{ rangeLabel() }}\r
        </title>\r
        <desc [attr.id]="clipId() + '-desc'">\r
          Curvas OMS P3, P15, P50, P85 y P97. Eje horizontal: {{ xTitle() }}. Eje vertical:\r
          {{ yTitle() }}. Las mediciones se identifican con {{ markerLabel() }}. Sus valores y\r
          fechas est\xE1n disponibles tambi\xE9n en el detalle.\r
        </desc>\r
        <defs>\r
          <clipPath [attr.id]="clipId()">\r
            <rect\r
              [attr.x]="plot.left"\r
              [attr.y]="plot.top"\r
              [attr.width]="plot.right - plot.left"\r
              [attr.height]="plot.bottom - plot.top"\r
            />\r
          </clipPath>\r
        </defs>\r
        @for (tick of xGrid(); track tick) {\r
          <line\r
            class="grid-line"\r
            [class.major-grid]="isMajorTick(tick, axes().x)"\r
            [class.year-grid]="definition().x.variable === 'AGE' && tick % 12 === 0"\r
            [attr.x1]="xScale()(tick)"\r
            [attr.x2]="xScale()(tick)"\r
            [attr.y1]="plot.top"\r
            [attr.y2]="plot.bottom"\r
          />\r
        }\r
        @for (tick of yGrid(); track tick) {\r
          <line\r
            class="grid-line"\r
            [class.major-grid]="isMajorTick(tick, axes().y)"\r
            [attr.x1]="plot.left"\r
            [attr.x2]="plot.right"\r
            [attr.y1]="yScale()(tick)"\r
            [attr.y2]="yScale()(tick)"\r
          />\r
        }\r
        @if (hasBMITransition()) {\r
          <text\r
            class="bmi-period-label"\r
            [attr.x]="(plot.left + xScale()(24)) / 2"\r
            y="14"\r
            text-anchor="middle"\r
          >\r
            IMC con longitud \xB7 0\u20132 a\xF1os\r
          </text>\r
          <text\r
            class="bmi-period-label"\r
            [attr.x]="(xScale()(24) + plot.right) / 2"\r
            y="14"\r
            text-anchor="middle"\r
          >\r
            IMC con estatura \xB7 2\u20135 a\xF1os\r
          </text>\r
          <line\r
            class="bmi-transition-line"\r
            [attr.x1]="xScale()(24)"\r
            [attr.x2]="xScale()(24)"\r
            [attr.y1]="plot.top"\r
            [attr.y2]="plot.bottom"\r
          />\r
        }\r
        <rect\r
          class="plot-border"\r
          [attr.x]="plot.left"\r
          [attr.y]="plot.top"\r
          [attr.width]="plot.right - plot.left"\r
          [attr.height]="plot.bottom - plot.top"\r
        />\r
        @for (tick of yLabels(); track tick) {\r
          <text\r
            class="tick-label"\r
            [attr.x]="plot.left - 12"\r
            [attr.y]="yScale()(tick) + 4"\r
            text-anchor="end"\r
          >\r
            {{ tick }}\r
          </text>\r
          <text class="tick-label" [attr.x]="plot.right + 60" [attr.y]="yScale()(tick) + 4">\r
            {{ tick }}\r
          </text>\r
        }\r
        @for (tick of xLabels(); track tick) {\r
          <text\r
            class="tick-label"\r
            [attr.x]="xScale()(tick)"\r
            [attr.y]="plot.bottom + 19"\r
            text-anchor="middle"\r
          >\r
            {{ definition().x.variable === 'AGE' ? monthLabel(tick) : tick }}\r
          </text>\r
        }\r
        @for (tick of years(); track tick) {\r
          <text\r
            class="year-label"\r
            [attr.x]="xScale()(tick)"\r
            [attr.y]="plot.bottom + 36"\r
            text-anchor="middle"\r
          >\r
            {{ tick === 0 ? 'Nacimiento' : tick / 12 + (tick === 12 ? ' a\xF1o' : ' a\xF1os') }}\r
          </text>\r
        }\r
        <text class="axis-title" x="520" y="482" text-anchor="middle">{{ xTitle() }}</text>\r
        <text class="axis-title" transform="translate(17 224) rotate(-90)" text-anchor="middle">\r
          {{ yTitle() }}\r
        </text>\r
        <g [attr.clip-path]="'url(#' + clipId() + ')'">\r
          @for (curve of curvePaths(); track curve.percentile) {\r
            <path\r
              class="reference-curve"\r
              [attr.data-percentile]="curve.percentile"\r
              [attr.d]="curve.path"\r
              [attr.stroke]="curve.color"\r
            >\r
              <title>OMS P{{ curve.percentile }}</title>\r
            </path>\r
          }\r
          <path class="patient-line" [attr.d]="patientPath()" />\r
        </g>\r
        @for (curve of curvePaths(); track curve.percentile) {\r
          @if (curve.end !== undefined && curve.end >= axes().y.min && curve.end <= axes().y.max) {\r
            <text\r
              class="percentile-label"\r
              [attr.x]="plot.right + 9"\r
              [attr.y]="yScale()(curve.end) + 4"\r
              [attr.fill]="curve.color"\r
            >\r
              {{ curve.percentile }}\r
            </text>\r
          }\r
        }\r
        @for (point of visiblePoints(); track $index) {\r
          <g\r
            cdkOverlayOrigin\r
            #origin="cdkOverlayOrigin"\r
            (mouseenter)="showPoint(point, origin)"\r
            (mouseleave)="scheduleHide()"\r
          >\r
            <circle\r
              class="point-hit-area"\r
              [attr.cx]="xScale()(point.x)"\r
              [attr.cy]="yScale()(point.value)"\r
              r="9"\r
              aria-hidden="true"\r
            />\r
            <path\r
              class="patient-point"\r
              [class.unconfirmed-point]="!point.evaluation"\r
              [attr.d]="markerPath()"\r
              [attr.transform]="\r
                'translate(' + xScale()(point.x) + ' ' + yScale()(point.value) + ')'\r
              "\r
              tabindex="0"\r
              role="img"\r
              [attr.aria-label]="tooltip(point)"\r
              [attr.aria-describedby]="focusedPoint() === point ? clipId() + '-consultation' : null"\r
              (focus)="showPoint(point, origin)"\r
              (blur)="hidePoint()"\r
              (keydown.escape)="hidePoint()"\r
              (click)="showPoint(point, origin)"\r
            />\r
          </g>\r
        }\r
      </svg>\r
    </div>\r
    @if (tooltipOrigin(); as origin) {\r
      <ng-template\r
        cdkConnectedOverlay\r
        [cdkConnectedOverlayOrigin]="origin"\r
        [cdkConnectedOverlayOpen]="!!focusedPoint()"\r
        [cdkConnectedOverlayPositions]="tooltipPositions"\r
        [cdkConnectedOverlayPush]="true"\r
        [cdkConnectedOverlayViewportMargin]="12"\r
        (overlayKeydown)="$event.key === 'Escape' && hidePoint()"\r
      >\r
        @if (focusedPoint(); as point) {\r
          <div\r
            class="consultation-tooltip"\r
            [class.tooltip-girl]="definition().sex === 'FEMALE'"\r
            [attr.id]="clipId() + '-consultation'"\r
            role="tooltip"\r
            (mouseenter)="cancelHide()"\r
            (mouseleave)="hidePoint()"\r
          >\r
            <header>\r
              <strong>{{ formatDate(point.date) }}</strong>\r
              <span>{{ point.ageFormatted }}</span>\r
            </header>\r
            <p class="consultation-type">\r
              {{\r
                point.source === 'BIRTH'\r
                  ? 'Mediciones al nacer'\r
                  : focusedEncounter()\r
                    ? consultationLabel(focusedEncounter()!.consultationType)\r
                    : 'Consulta cl\xEDnica'\r
              }}\r
            </p>\r
            <div class="consultation-measurements">\r
              @if (point.weightKg !== null) {\r
                <span><b>Peso</b> {{ point.weightKg | number: '1.0-2' }} kg</span>\r
              }\r
              @if (point.heightCm !== null) {\r
                <span><b>Talla</b> {{ point.heightCm | number: '1.0-1' }} cm</span>\r
              }\r
              @if (point.headCircumferenceCm !== null) {\r
                <span\r
                  ><b>Per\xEDmetro cef\xE1lico</b>\r
                  {{ point.headCircumferenceCm | number: '1.0-1' }} cm</span\r
                >\r
              }\r
            </div>\r
            @if (focusedEncounter(); as encounter) {\r
              @if (encounter.chiefComplaint?.trim()) {\r
                <p><b>Motivo:</b> {{ brief(encounter.chiefComplaint!) }}</p>\r
              }\r
              @if (encounter.primaryDiagnosisDescription?.trim()) {\r
                <p><b>Evaluaci\xF3n:</b> {{ brief(encounter.primaryDiagnosisDescription!) }}</p>\r
              }\r
            }\r
            <p class="consultation-percentile">\r
              {{ yTitle() }} \xB7 {{ point.value | number: '1.0-3' }} \xB7 {{ percentileLabel(point) }}\r
              @if (point.evaluation) {\r
                \xB7 Z {{ point.evaluation.zScore | number: '1.2-3' }}\r
              }\r
            </p>\r
            @if (point.adjustmentCm) {\r
              <p>Conversi\xF3n: {{ point.adjustmentCm > 0 ? '+' : '' }}{{ point.adjustmentCm }} cm.</p>\r
            }\r
            @if (point.note) {\r
              <p>{{ brief(point.note) }}</p>\r
            }\r
          </div>\r
        }\r
      </ng-template>\r
    }\r
    <div class="point-tooltip" role="status">\r
      {{\r
        focusedPoint()\r
          ? tooltip(focusedPoint()!)\r
          : 'Pas\xE1 el cursor o enfoc\xE1 una medici\xF3n para ver sus datos.'\r
      }}\r
    </div>\r
    <ul class="legend-container" aria-label="Leyenda">\r
      <li>\r
        <svg class="legend-marker" viewBox="-6 -6 12 12" aria-hidden="true">\r
          <path [attr.d]="markerPath()" />\r
        </svg>\r
        Paciente \xB7 {{ markerLabel() }}\r
      </li>\r
      <li><span class="legend-sample median"></span>P50 (mediana)</li>\r
      <li><span class="legend-sample middle"></span>P15 y P85</li>\r
      <li><span class="legend-sample outer"></span>P3 y P97</li>\r
    </ul>\r
    <footer>\r
      <a [href]="definition().source" target="_blank" rel="noopener noreferrer"\r
        >{{ definition().reference.replace('WHO', 'OMS') }} \xB7 fuente oficial</a\r
      >\r
      \xB7 L\xE1mina {{ definition().pdfNumber }} / p\xE1gina {{ definition().pdfPage }} del PDF. Las\r
      evaluaciones usan edad cronol\xF3gica y no constituyen un diagn\xF3stico.\r
    </footer>\r
    @if (chart().points.length > 0) {\r
      <details class="measurement-details">\r
        <summary>Detalle de {{ chart().points.length }} mediciones</summary>\r
        <div class="table-scroll">\r
          <table>\r
            <thead>\r
              <tr>\r
                <th>Fecha</th>\r
                <th>Edad</th>\r
                <th>{{ xTitle() }}</th>\r
                <th>{{ yTitle() }}</th>\r
                <th>Percentil / Z</th>\r
                <th>Observaciones</th>\r
              </tr>\r
            </thead>\r
            <tbody>\r
              @for (point of chart().points; track $index) {\r
                <tr>\r
                  <td>{{ formatDate(point.date) }}</td>\r
                  <td>{{ point.ageFormatted }} \xB7 {{ point.ageDays }} d\xEDas</td>\r
                  <td>{{ point.x | number: '1.0-4' }}</td>\r
                  <td>{{ point.value | number: '1.0-4' }}</td>\r
                  <td>\r
                    {{ percentileLabel(point) }}\r
                    @if (point.evaluation) {\r
                      \xB7 Z {{ point.evaluation.zScore | number: '1.2-4' }}\r
                    }\r
                  </td>\r
                  <td>\r
                    {{ point.note ?? '\u2014' }}\r
                    @if (point.adjustmentCm) {\r
                      {{ point.adjustmentCm }} cm. Original: {{ point.heightCm }} cm.\r
                    }\r
                  </td>\r
                </tr>\r
              }\r
            </tbody>\r
          </table>\r
        </div>\r
      </details>\r
    }\r
  </div>\r
</article>\r
`, styles: ['/* src/app/features/patient-record/growth-chart/growth-chart.component.css */\n:host {\n  display: block;\n}\n.growth-chart-card {\n  --patient-color: #2563eb;\n  --patient-focus: #072b76;\n  border: 1px solid var(--dc-outline, #bed0e5);\n  border-radius: 12px;\n  background: var(--dc-surface, #fff);\n  overflow: hidden;\n  margin: 0 0 24px;\n}\n.theme-girl {\n  --patient-color: #ec4899;\n  --patient-focus: #9d174d;\n}\n.oms-top-banner {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  flex-wrap: wrap;\n  padding: 16px 20px;\n  background: #789fce;\n  color: white;\n}\n.theme-girl .oms-top-banner {\n  background: #8d92c2;\n}\n.oms-top-banner h3 {\n  font-size: 17px;\n  font-weight: 700;\n  margin: 0;\n}\n.oms-top-banner span {\n  font-size: 13px;\n}\n.chart-card-content {\n  padding: 18px 20px;\n}\n.metrics-summary-bar {\n  display: flex;\n  gap: 18px;\n  flex-wrap: wrap;\n  padding: 14px 16px;\n  border: 1px solid var(--dc-outline, #e0e7ef);\n  border-radius: 8px;\n  background: var(--dc-surface-low, #f8fafc);\n  margin: 0 0 16px;\n}\n.metrics-summary-bar div {\n  flex: 1 1 145px;\n}\n.metrics-summary-bar dt {\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--dc-ink-muted, #64748b);\n  margin-bottom: 5px;\n}\n.metrics-summary-bar dd {\n  font-size: 13px;\n  color: var(--dc-ink, #17233c);\n  font-weight: 600;\n  margin: 0;\n}\n.metrics-summary-bar .patient-value {\n  color: var(--dc-blue-ink, #2563eb);\n}\n.notice {\n  background: var(--dc-teal-surface, #eef7fa);\n  border-radius: 6px;\n  color: var(--dc-ink-secondary, #35576b);\n  font-size: 13px;\n  line-height: 1.6;\n  padding: 10px 14px;\n}\n.frame-control {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  flex-wrap: wrap;\n  font-size: 12px;\n  margin-bottom: 14px;\n  color: var(--dc-warning-ink, #5e492c);\n}\n.frame-control button {\n  border: 1px solid var(--dc-outline, #c9d6e4);\n  background: var(--dc-surface, white);\n  border-radius: 6px;\n  padding: 7px 10px;\n  color: var(--dc-ink-secondary, #165867);\n}\n.chart-scroll {\n  overflow-x: auto;\n  max-width: 100%;\n  background: var(--dc-surface, white);\n  padding-top: 6px;\n}\n.growth-svg {\n  display: block;\n  width: 100%;\n  min-width: 960px;\n  height: auto;\n  max-height: 640px;\n}\n.grid-line {\n  stroke: #c4cbd4;\n  stroke-width: 0.6;\n  shape-rendering: crispEdges;\n}\n.year-grid {\n  stroke: #485568;\n  stroke-width: 1.2;\n}\n.bmi-chart .grid-line {\n  stroke: var(--dc-outline, #e2e8f0);\n  stroke-width: 0.5;\n}\n.bmi-chart .major-grid {\n  stroke: #bdc9d8;\n  stroke-width: 0.7;\n}\n.bmi-chart .year-grid {\n  stroke: #8798ad;\n  stroke-width: 1;\n}\n.bmi-transition-line {\n  stroke: #64748b;\n  stroke-width: 1.2;\n  stroke-dasharray: 5 4;\n}\n.bmi-period-label {\n  fill: var(--dc-ink-secondary, #475569);\n  font-size: 10px;\n  font-weight: 600;\n}\n.bmi-transition-note {\n  color: var(--dc-ink-secondary, #475569);\n  font-size: 12px;\n  line-height: 1.6;\n  margin: 12px 0;\n}\n.plot-border {\n  stroke: #172033;\n  fill: none;\n  stroke-width: 1.2;\n}\n.tick-label {\n  font-size: 12px;\n  fill: var(--dc-ink, #253044);\n}\n.year-label {\n  font-size: 12px;\n  fill: var(--dc-ink, #253044);\n  font-weight: 600;\n}\n.axis-title {\n  font-size: 12px;\n  fill: var(--dc-ink, #253044);\n  font-weight: 600;\n}\n.reference-curve {\n  fill: none;\n  stroke-width: 1.7;\n  vector-effect: non-scaling-stroke;\n}\n.reference-curve[data-percentile="50"] {\n  stroke-width: 2;\n}\n.patient-line {\n  fill: none;\n  stroke: var(--patient-color);\n  stroke-width: 1.7;\n  vector-effect: non-scaling-stroke;\n}\n.patient-point {\n  fill: var(--patient-color);\n  stroke: white;\n  stroke-width: 1.3;\n  cursor: pointer;\n  vector-effect: non-scaling-stroke;\n}\n.point-hit-area {\n  fill: transparent;\n  pointer-events: all;\n  cursor: pointer;\n}\n.consultation-tooltip {\n  width: 300px;\n  max-width: calc(100vw - 24px);\n  box-sizing: border-box;\n  padding: 14px 16px;\n  border: 1px solid #bed0e5;\n  border-top: 3px solid #2563eb;\n  border-radius: 10px;\n  background: white;\n  color: #17233c;\n  box-shadow: 0 8px 28px rgb(15 23 42 / 18%);\n  font-size: 12px;\n  line-height: 1.5;\n  overflow-wrap: anywhere;\n}\n.consultation-tooltip.tooltip-girl {\n  border-top-color: #ec4899;\n}\n.consultation-tooltip header {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n}\n.consultation-tooltip header strong {\n  font-size: 14px;\n}\n.consultation-tooltip header span,\n.consultation-type {\n  color: #64748b;\n}\n.consultation-tooltip p {\n  margin: 8px 0 0;\n}\n.consultation-measurements {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px 12px;\n  padding: 8px 0;\n  margin-top: 8px;\n  border-block: 1px solid #e2e8f0;\n}\n.consultation-percentile {\n  color: #35576b;\n}\n.unconfirmed-point {\n  fill: white;\n  stroke: var(--patient-color);\n  stroke-width: 2;\n}\n.patient-point:focus {\n  outline: none;\n  stroke: var(--patient-focus);\n  stroke-width: 3;\n}\n.percentile-label {\n  font-size: 11px;\n  font-weight: 600;\n}\n.point-tooltip {\n  min-height: 36px;\n  padding: 8px 12px;\n  border-radius: 5px;\n  background: var(--dc-surface-low, #f1f6fc);\n  color: var(--dc-ink-secondary, #263e61);\n  font-size: 12px;\n  line-height: 1.5;\n}\n.legend-container {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 22px;\n  list-style: none;\n  padding: 12px 0 0;\n  margin: 0;\n  font-size: 12px;\n  color: var(--dc-ink-secondary, #344155);\n}\n.legend-container li {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n}\n.legend-sample {\n  width: 24px;\n  border-top: 3px solid;\n}\n.legend-marker {\n  width: 14px;\n  height: 14px;\n  fill: var(--patient-color);\n}\n.median {\n  color: var(--dc-success-ink, #16a34a);\n}\n.middle {\n  color: var(--dc-warning-ink, #ea580c);\n}\n.outer {\n  color: var(--dc-error-ink, #dc2626);\n}\nfooter {\n  font-size: 11px;\n  color: var(--dc-ink-muted, #64748b);\n  line-height: 1.8;\n  margin: 12px 0;\n}\nfooter a {\n  color: var(--dc-teal-ink, #006778);\n}\n.measurement-details {\n  border-top: 1px solid var(--dc-outline, #e2e8f0);\n  padding-top: 12px;\n  font-size: 12px;\n}\n.measurement-details summary {\n  cursor: pointer;\n  color: var(--dc-ink-secondary, #285265);\n}\n.table-scroll {\n  overflow: auto;\n  max-height: 380px;\n}\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 10px;\n}\nth,\ntd {\n  text-align: left;\n  padding: 9px;\n  border-bottom: 1px solid var(--dc-outline, #e2e8f0);\n  white-space: normal;\n  min-width: 100px;\n}\nth {\n  position: sticky;\n  top: 0;\n  background: var(--dc-surface-low, #f8fafc);\n  color: var(--dc-ink-secondary, #344155);\n}\n@media (max-width: 700px) {\n  .chart-card-content {\n    padding: 12px;\n  }\n  .oms-top-banner {\n    padding: 14px;\n  }\n  .metrics-summary-bar {\n    gap: 12px;\n  }\n  .growth-svg {\n    min-width: 1080px;\n  }\n  .legend-container {\n    gap: 12px;\n  }\n}\n/*# sourceMappingURL=growth-chart.component.css.map */\n'] }]
  }], () => [], { chart: [{ type: Input, args: [{ isSignal: true, alias: "chart", required: true }] }], encounters: [{ type: Input, args: [{ isSignal: true, alias: "encounters", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GrowthChartComponent, { className: "GrowthChartComponent", filePath: "src/app/features/patient-record/growth-chart/growth-chart.component.ts", lineNumber: 33 });
})();

// src/app/features/patient-record/patient-growth/patient-growth.component.ts
var _forTrack05 = ($index, $item) => $item.indicator;
var _forTrack12 = ($index, $item) => $item.definition.id;
function PatientGrowthComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 1);
    \u0275\u0275text(1, "Cargando referencias y mediciones OMS\u2026");
    \u0275\u0275elementEnd();
  }
}
function PatientGrowthComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 3);
    \u0275\u0275listener("click", function PatientGrowthComponent_Conditional_2_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.growth.reload());
    });
    \u0275\u0275text(4, "Reintentar");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.growth.growthError());
  }
}
function PatientGrowthComponent_Conditional_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1, " Complet\xE1 una fecha de nacimiento v\xE1lida en los datos del paciente para seleccionar sus curvas. ");
    \u0275\u0275elementEnd();
  }
}
function PatientGrowthComponent_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "p");
    \u0275\u0275text(2, " El registro no permite identificar el sexo de referencia antropom\xE9trica. Confirm\xE1 qu\xE9 referencia OMS corresponde a este paciente. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 3);
    \u0275\u0275listener("click", function PatientGrowthComponent_Conditional_3_Conditional_1_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.growth.confirmSex("FEMALE"));
    });
    \u0275\u0275text(4, " Confirmar referencia femenina ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 3);
    \u0275\u0275listener("click", function PatientGrowthComponent_Conditional_3_Conditional_1_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.growth.confirmSex("MALE"));
    });
    \u0275\u0275text(6, " Confirmar referencia masculina ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 4);
    \u0275\u0275text(8, " La confirmaci\xF3n se usa en esta ficha y no modifica los datos del paciente. ");
    \u0275\u0275elementEnd()();
  }
}
function PatientGrowthComponent_Conditional_3_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function PatientGrowthComponent_Conditional_3_Conditional_2_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.growth.clearSexConfirmation());
    });
    \u0275\u0275text(1, " Revisar referencia confirmada ");
    \u0275\u0275elementEnd();
  }
}
function PatientGrowthComponent_Conditional_3_Conditional_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1, " El PDF no incluye IMC de ni\xF1as de 2 a 5 a\xF1os. Ese gr\xE1fico no se incorpora al cat\xE1logo de 20 l\xE1minas. ");
    \u0275\u0275elementEnd();
  }
}
function PatientGrowthComponent_Conditional_3_Conditional_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" No hay una curva de este cat\xE1logo aplicable a la edad actual", ctx_r1.growth.showHistorical() ? " ni mediciones hist\xF3ricas compatibles" : ". Pod\xE9s consultar per\xEDodos hist\xF3ricos si hay mediciones previas", ". ");
  }
}
function PatientGrowthComponent_Conditional_3_Conditional_2_Conditional_9_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function PatientGrowthComponent_Conditional_3_Conditional_2_Conditional_9_For_3_Template_button_click_0_listener() {
      const category_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.growth.selectedGrowthMetric.set(category_r8.indicator));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 15);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const category_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("active", ctx_r1.growth.effectiveMetric() === category_r8.indicator);
    \u0275\u0275attribute("aria-pressed", ctx_r1.growth.effectiveMetric() === category_r8.indicator);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(category_r8.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(category_r8.count);
  }
}
function PatientGrowthComponent_Conditional_3_Conditional_2_Conditional_9_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-growth-chart", 14);
  }
  if (rf & 2) {
    const chart_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("chart", chart_r9)("encounters", ctx_r1.encounters());
  }
}
function PatientGrowthComponent_Conditional_3_Conditional_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12);
    \u0275\u0275repeaterCreate(2, PatientGrowthComponent_Conditional_3_Conditional_2_Conditional_9_For_3_Template, 5, 5, "button", 13, _forTrack05);
    \u0275\u0275elementStart(4, "button", 3);
    \u0275\u0275listener("click", function PatientGrowthComponent_Conditional_3_Conditional_2_Conditional_9_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.growth.selectedGrowthMetric.set("ALL"));
    });
    \u0275\u0275text(5, " Ver todos los gr\xE1ficos disponibles ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275repeaterCreate(6, PatientGrowthComponent_Conditional_3_Conditional_2_Conditional_9_For_7_Template, 1, 2, "app-growth-chart", 14, _forTrack12);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.growth.categories());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.growth.effectiveMetric() === "ALL");
    \u0275\u0275attribute("aria-pressed", ctx_r1.growth.effectiveMetric() === "ALL");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.growth.visibleCharts());
  }
}
function PatientGrowthComponent_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, PatientGrowthComponent_Conditional_3_Conditional_2_Conditional_3_Template, 2, 0, "button", 6);
    \u0275\u0275elementStart(4, "label", 7)(5, "input", 8);
    \u0275\u0275listener("change", function PatientGrowthComponent_Conditional_3_Conditional_2_Template_input_change_5_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.growth.showHistorical.set($event.target.checked));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, "Consultar tambi\xE9n per\xEDodos hist\xF3ricos");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, PatientGrowthComponent_Conditional_3_Conditional_2_Conditional_7_Template, 2, 0, "p", 4);
    \u0275\u0275conditionalCreate(8, PatientGrowthComponent_Conditional_3_Conditional_2_Conditional_8_Template, 2, 1, "p", 9)(9, PatientGrowthComponent_Conditional_3_Conditional_2_Conditional_9_Template, 8, 3);
    \u0275\u0275elementStart(10, "p", 4);
    \u0275\u0275text(11, " Edad cronol\xF3gica calculada con fechas locales de la zona horaria del dispositivo. El sistema no dispone de una pol\xEDtica validada de edad corregida por prematuridad. ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const response_r10 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", response_r10.ageFormatted, " \xB7 Referencia ", response_r10.referenceSex === "FEMALE" ? "femenina" : "masculina", " ", response_r10.sexSource === "SYSTEM_SEX" ? "(campo Sexo)" : "(confirmada en esta vista)");
    \u0275\u0275advance();
    \u0275\u0275conditional(response_r10.sexSource === "VIEW_CONFIRMATION" ? 3 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", ctx_r1.growth.showHistorical());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(response_r10.referenceSex === "FEMALE" && response_r10.ageDays >= 731 && response_r10.ageDays <= 1856 ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.growth.categories().length === 0 ? 8 : 9);
  }
}
function PatientGrowthComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, PatientGrowthComponent_Conditional_3_Conditional_0_Template, 2, 0, "p", 2)(1, PatientGrowthComponent_Conditional_3_Conditional_1_Template, 9, 0, "div", 2)(2, PatientGrowthComponent_Conditional_3_Conditional_2_Template, 12, 7);
  }
  if (rf & 2) {
    const response_r10 = ctx;
    \u0275\u0275conditional(response_r10.status === "INVALID_BIRTH_DATE" ? 0 : response_r10.status === "REFERENCE_SEX_REQUIRED" ? 1 : 2);
  }
}
var PatientGrowthComponent = class _PatientGrowthComponent {
  growth = inject(PatientGrowthStore);
  history = inject(PatientEncountersStore);
  encounters = computed(
    () => new Map(this.history.encounters().map((e) => [e.id, e])),
    ...ngDevMode ? [{ debugName: "encounters" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function PatientGrowthComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientGrowthComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PatientGrowthComponent, selectors: [["app-patient-growth"]], decls: 4, vars: 1, consts: [["aria-label", "Evoluci\xF3n y curvas de crecimiento OMS", 1, "tab-panel", "animate-fade-in"], ["role", "status"], ["role", "alert", 1, "growth-state"], ["type", "button", 1, "growth-pill-btn", 3, "click"], [1, "growth-note"], [1, "growth-context"], ["type", "button", "data-testid", "reset-growth-reference", 1, "growth-pill-btn"], [1, "historical-toggle"], ["type", "checkbox", 3, "change", "checked"], ["role", "status", 1, "growth-state"], ["type", "button", "data-testid", "reset-growth-reference", 1, "growth-pill-btn", 3, "click"], [1, "growth-toolbar"], ["role", "group", "aria-label", "Indicadores de crecimiento disponibles", 1, "growth-selector-pills"], ["type", "button", 1, "growth-pill-btn", 3, "active"], [3, "chart", "encounters"], [1, "pill-badge"]], template: function PatientGrowthComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0);
      \u0275\u0275conditionalCreate(1, PatientGrowthComponent_Conditional_1_Template, 2, 0, "p", 1)(2, PatientGrowthComponent_Conditional_2_Template, 5, 1, "div", 2)(3, PatientGrowthComponent_Conditional_3_Template, 3, 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.growth.isLoadingGrowthCurves() ? 1 : ctx.growth.growthError() ? 2 : (tmp_0_0 = ctx.growth.response()) ? 3 : -1, tmp_0_0);
    }
  }, dependencies: [GrowthChartComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n.tab-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n}\n.animate-fade-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.15s ease-in-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(3px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.growth-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  margin-bottom: 1.25rem;\n}\n.growth-selector-pills[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  background-color: var(--%NS%dc-surface-high, #f1f5f9);\n  padding: 0.375rem;\n  border-radius: 12px;\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n}\n.growth-pill-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  border: none;\n  background: transparent;\n  color: var(--%NS%dc-ink-secondary, #475569);\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.growth-pill-btn[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%dc-ink, #0f172a);\n  background-color: rgba(255, 255, 255, 0.6);\n}\n.growth-pill-btn.active[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-surface, #ffffff);\n  color: var(--%NS%dc-blue-ink, #2563eb);\n  font-weight: 600;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n}\n.pill-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 20px;\n  height: 20px;\n  padding: 0 0.375rem;\n  border-radius: 9999px;\n  background-color: var(--%NS%dc-surface-high, #e2e8f0);\n  color: var(--%NS%dc-ink-secondary, #475569);\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n.growth-pill-btn.active[_ngcontent-%COMP%]   .pill-badge[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-blue-surface, #dbeafe);\n  color: var(--%NS%dc-blue-ink, #1d4ed8);\n}\n@media (max-width: 640px) {\n  .growth-selector-pills[_ngcontent-%COMP%] {\n    width: 100%;\n    flex-direction: column;\n  }\n  .growth-pill-btn[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: space-between;\n  }\n}\n.growth-context[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n  color: var(--%NS%dc-ink-secondary, #4c6079);\n  font-size: 13px;\n  margin-bottom: 16px;\n}\n.historical-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  cursor: pointer;\n}\n.growth-state[_ngcontent-%COMP%] {\n  padding: 18px;\n  border: 1px solid #d9e3ec;\n  border-radius: 8px;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  color: var(--%NS%dc-ink-secondary, #344155);\n  margin: 16px 0;\n}\n.growth-state[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin: 0 10px 8px 0;\n}\n.growth-note[_ngcontent-%COMP%] {\n  font-size: 12px;\n  line-height: 1.7;\n  color: var(--%NS%dc-ink-muted, #62758c);\n}\n.growth-position-panel[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  border: 1px solid #d9e3ec;\n  border-radius: 8px;\n  margin-bottom: 16px;\n  font-size: 13px;\n}\n.growth-position-panel[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: var(--%NS%dc-teal-ink, #255567);\n  font-weight: 600;\n}\n.position-list[_ngcontent-%COMP%] {\n  max-height: 300px;\n  overflow: auto;\n}\n.position-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 9px 0;\n  border-bottom: 1px solid #edf1f5;\n}\n.position-row[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 7px;\n  border: 1px solid #c7d5e5;\n  border-radius: 6px;\n  background: var(--%NS%dc-surface, white);\n  max-width: 100%;\n}\n/*# sourceMappingURL=patient-growth.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientGrowthComponent, [{
    type: Component,
    args: [{ selector: "app-patient-growth", imports: [GrowthChartComponent], template: `<section class="tab-panel animate-fade-in" aria-label="Evoluci\xF3n y curvas de crecimiento OMS">\r
  @if (growth.isLoadingGrowthCurves()) {\r
    <p role="status">Cargando referencias y mediciones OMS\u2026</p>\r
  } @else if (growth.growthError()) {\r
    <div class="growth-state" role="alert">\r
      <p>{{ growth.growthError() }}</p>\r
      <button type="button" class="growth-pill-btn" (click)="growth.reload()">Reintentar</button>\r
    </div>\r
  } @else if (growth.response(); as response) {\r
    @if (response.status === 'INVALID_BIRTH_DATE') {\r
      <p class="growth-state" role="alert">\r
        Complet\xE1 una fecha de nacimiento v\xE1lida en los datos del paciente para seleccionar sus\r
        curvas.\r
      </p>\r
    } @else if (response.status === 'REFERENCE_SEX_REQUIRED') {\r
      <div class="growth-state" role="alert">\r
        <p>\r
          El registro no permite identificar el sexo de referencia antropom\xE9trica. Confirm\xE1 qu\xE9\r
          referencia OMS corresponde a este paciente.\r
        </p>\r
        <button type="button" class="growth-pill-btn" (click)="growth.confirmSex('FEMALE')">\r
          Confirmar referencia femenina\r
        </button>\r
        <button type="button" class="growth-pill-btn" (click)="growth.confirmSex('MALE')">\r
          Confirmar referencia masculina\r
        </button>\r
        <p class="growth-note">\r
          La confirmaci\xF3n se usa en esta ficha y no modifica los datos del paciente.\r
        </p>\r
      </div>\r
    } @else {\r
      <div class="growth-context">\r
        <span\r
          >{{ response.ageFormatted }} \xB7 Referencia\r
          {{ response.referenceSex === 'FEMALE' ? 'femenina' : 'masculina' }}\r
          {{\r
            response.sexSource === 'SYSTEM_SEX' ? '(campo Sexo)' : '(confirmada en esta vista)'\r
          }}</span\r
        >\r
        @if (response.sexSource === 'VIEW_CONFIRMATION') {\r
          <button\r
            type="button"\r
            class="growth-pill-btn"\r
            data-testid="reset-growth-reference"\r
            (click)="growth.clearSexConfirmation()"\r
          >\r
            Revisar referencia confirmada\r
          </button>\r
        }\r
        <label class="historical-toggle"\r
          ><input\r
            type="checkbox"\r
            [checked]="growth.showHistorical()"\r
            (change)="growth.showHistorical.set($any($event.target).checked)"\r
          />Consultar tambi\xE9n per\xEDodos hist\xF3ricos</label\r
        >\r
      </div>\r
      @if (\r
        response.referenceSex === 'FEMALE' && response.ageDays >= 731 && response.ageDays <= 1856\r
      ) {\r
        <p class="growth-note">\r
          El PDF no incluye IMC de ni\xF1as de 2 a 5 a\xF1os. Ese gr\xE1fico no se incorpora al cat\xE1logo de\r
          20 l\xE1minas.\r
        </p>\r
      }\r
      @if (growth.categories().length === 0) {\r
        <p class="growth-state" role="status">\r
          No hay una curva de este cat\xE1logo aplicable a la edad actual{{\r
            growth.showHistorical()\r
              ? ' ni mediciones hist\xF3ricas compatibles'\r
              : '. Pod\xE9s consultar per\xEDodos hist\xF3ricos si hay mediciones previas'\r
          }}.\r
        </p>\r
      } @else {\r
        <div class="growth-toolbar">\r
          <div\r
            class="growth-selector-pills"\r
            role="group"\r
            aria-label="Indicadores de crecimiento disponibles"\r
          >\r
            @for (category of growth.categories(); track category.indicator) {\r
              <button\r
                type="button"\r
                class="growth-pill-btn"\r
                [class.active]="growth.effectiveMetric() === category.indicator"\r
                [attr.aria-pressed]="growth.effectiveMetric() === category.indicator"\r
                (click)="growth.selectedGrowthMetric.set(category.indicator)"\r
              >\r
                <span>{{ category.title }}</span\r
                ><span class="pill-badge">{{ category.count }}</span>\r
              </button>\r
            }\r
            <button\r
              type="button"\r
              class="growth-pill-btn"\r
              [class.active]="growth.effectiveMetric() === 'ALL'"\r
              [attr.aria-pressed]="growth.effectiveMetric() === 'ALL'"\r
              (click)="growth.selectedGrowthMetric.set('ALL')"\r
            >\r
              Ver todos los gr\xE1ficos disponibles\r
            </button>\r
          </div>\r
        </div>\r
        @for (chart of growth.visibleCharts(); track chart.definition.id) {\r
          <app-growth-chart [chart]="chart" [encounters]="encounters()" />\r
        }\r
      }\r
      <p class="growth-note">\r
        Edad cronol\xF3gica calculada con fechas locales de la zona horaria del dispositivo. El sistema no dispone de una\r
        pol\xEDtica validada de edad corregida por prematuridad.\r
      </p>\r
    }\r
  }\r
</section>\r
`, styles: ["/* src/app/features/patient-record/patient-growth/patient-growth.component.css */\n:host {\n  display: block;\n  min-width: 0;\n}\n.tab-panel {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n}\n.animate-fade-in {\n  animation: fadeIn 0.15s ease-in-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(3px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.growth-toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  margin-bottom: 1.25rem;\n}\n.growth-selector-pills {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  background-color: var(--dc-surface-high, #f1f5f9);\n  padding: 0.375rem;\n  border-radius: 12px;\n  border: 1px solid var(--dc-outline, #e2e8f0);\n}\n.growth-pill-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  border: none;\n  background: transparent;\n  color: var(--dc-ink-secondary, #475569);\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.growth-pill-btn:hover {\n  color: var(--dc-ink, #0f172a);\n  background-color: rgba(255, 255, 255, 0.6);\n}\n.growth-pill-btn.active {\n  background-color: var(--dc-surface, #ffffff);\n  color: var(--dc-blue-ink, #2563eb);\n  font-weight: 600;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n}\n.pill-badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 20px;\n  height: 20px;\n  padding: 0 0.375rem;\n  border-radius: 9999px;\n  background-color: var(--dc-surface-high, #e2e8f0);\n  color: var(--dc-ink-secondary, #475569);\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n.growth-pill-btn.active .pill-badge {\n  background-color: var(--dc-blue-surface, #dbeafe);\n  color: var(--dc-blue-ink, #1d4ed8);\n}\n@media (max-width: 640px) {\n  .growth-selector-pills {\n    width: 100%;\n    flex-direction: column;\n  }\n  .growth-pill-btn {\n    width: 100%;\n    justify-content: space-between;\n  }\n}\n.growth-context {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n  color: var(--dc-ink-secondary, #4c6079);\n  font-size: 13px;\n  margin-bottom: 16px;\n}\n.historical-toggle {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  cursor: pointer;\n}\n.growth-state {\n  padding: 18px;\n  border: 1px solid #d9e3ec;\n  border-radius: 8px;\n  background: var(--dc-surface-low, #f8fafc);\n  color: var(--dc-ink-secondary, #344155);\n  margin: 16px 0;\n}\n.growth-state button {\n  margin: 0 10px 8px 0;\n}\n.growth-note {\n  font-size: 12px;\n  line-height: 1.7;\n  color: var(--dc-ink-muted, #62758c);\n}\n.growth-position-panel {\n  padding: 12px 16px;\n  border: 1px solid #d9e3ec;\n  border-radius: 8px;\n  margin-bottom: 16px;\n  font-size: 13px;\n}\n.growth-position-panel summary {\n  cursor: pointer;\n  color: var(--dc-teal-ink, #255567);\n  font-weight: 600;\n}\n.position-list {\n  max-height: 300px;\n  overflow: auto;\n}\n.position-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 9px 0;\n  border-bottom: 1px solid #edf1f5;\n}\n.position-row select {\n  padding: 7px;\n  border: 1px solid #c7d5e5;\n  border-radius: 6px;\n  background: var(--dc-surface, white);\n  max-width: 100%;\n}\n/*# sourceMappingURL=patient-growth.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PatientGrowthComponent, { className: "PatientGrowthComponent", filePath: "src/app/features/patient-record/patient-growth/patient-growth.component.ts", lineNumber: 11 });
})();

// src/app/features/patient-record/patient-prescriptions/patient-prescriptions.component.ts
var _forTrack06 = ($index, $item) => $item.id;
function PatientPrescriptionsComponent_Conditional_0_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", function PatientPrescriptionsComponent_Conditional_0_Conditional_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editor.printRecord(ctx_r2.latestEncounter()));
    });
    \u0275\u0275element(1, "ng-icon", 42);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r2.editor.rxBusy());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.editor.rxFormMode() === "STUDY" ? "Imprimir Orden de Estudios" : "Imprimir Receta M\xE9dica", " ");
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.editor.draftPrescriptions().length);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.editor.draftStudies().length);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275element(1, "ng-icon", 43);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.editor.rxErrorMessage());
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275element(1, "ng-icon", 31);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.editor.rxSuccessMessage());
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_32_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const freq_r5 = ctx.$implicit;
    \u0275\u0275property("value", freq_r5);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(freq_r5);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_32_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const route_r6 = ctx.$implicit;
    \u0275\u0275property("value", route_r6);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(route_r6);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_41_For_5_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 70);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const med_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(med_r8.dosage);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_41_For_5_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 71);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const med_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(med_r8.administrationRoute);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_41_For_5_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const med_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(med_r8.frequency);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_41_For_5_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const med_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xB7 Durante ", med_r8.durationDays, " d\xEDas");
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_41_For_5_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const med_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\xB7 ", med_r8.instructions);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_41_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 65)(1, "div", 66)(2, "span", 67);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "div", 68)(6, "strong", 69);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_41_For_5_Conditional_8_Template, 2, 1, "span", 70);
    \u0275\u0275conditionalCreate(9, PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_41_For_5_Conditional_9_Template, 2, 1, "span", 71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 72);
    \u0275\u0275conditionalCreate(11, PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_41_For_5_Conditional_11_Template, 2, 1, "span");
    \u0275\u0275conditionalCreate(12, PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_41_For_5_Conditional_12_Template, 2, 1, "span");
    \u0275\u0275conditionalCreate(13, PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_41_For_5_Conditional_13_Template, 2, 1, "span");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "button", 73);
    \u0275\u0275listener("click", function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_41_For_5_Template_button_click_14_listener() {
      const \u0275$index_177_r9 = \u0275\u0275restoreView(_r7).$index;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.editor.removeMedicationFromDraft(\u0275$index_177_r9));
    });
    \u0275\u0275element(15, "ng-icon", 74);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const med_r8 = ctx.$implicit;
    const \u0275$index_177_r9 = ctx.$index;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275$index_177_r9 + 1, ".");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(med_r8.medicationName);
    \u0275\u0275advance();
    \u0275\u0275conditional(med_r8.dosage ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(med_r8.administrationRoute ? 9 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(med_r8.frequency ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(med_r8.durationDays ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(med_r8.instructions ? 13 : -1);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62)(1, "span", 63);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul", 64);
    \u0275\u0275repeaterCreate(4, PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_41_For_5_Template, 16, 7, "li", 65, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Medicamentos cargados en la receta actual (", ctx_r2.editor.draftPrescriptions().length, ")");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.editor.draftPrescriptions());
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 44)(2, "div", 45)(3, "label", 46);
    \u0275\u0275text(4, "Medicamento / Principio Activo y Concentraci\xF3n *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 47);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editor.rxMedicationName.set($event));
    })("keydown.enter", function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Template_input_keydown_enter_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editor.addMedicationToDraft());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_6_Template, 2, 1, "span", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 21)(8, "label", 48);
    \u0275\u0275text(9, "Dosis / Presentaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 49);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editor.rxDosage.set($event));
    })("keydown.enter", function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Template_input_keydown_enter_10_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editor.addMedicationToDraft());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_11_Template, 2, 1, "span", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 21)(13, "label", 50);
    \u0275\u0275text(14, "Frecuencia");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "select", 51);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Template_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editor.rxFrequency.set($event));
    });
    \u0275\u0275repeaterCreate(16, PatientPrescriptionsComponent_Conditional_0_Conditional_32_For_17_Template, 2, 2, "option", 52, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(18, PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_18_Template, 2, 1, "span", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 21)(20, "label", 53);
    \u0275\u0275text(21, "V\xEDa de administraci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "select", 54);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Template_select_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editor.rxAdministrationRoute.set($event));
    });
    \u0275\u0275repeaterCreate(23, PatientPrescriptionsComponent_Conditional_0_Conditional_32_For_24_Template, 2, 2, "option", 52, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(25, PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_25_Template, 2, 1, "span", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 21)(27, "label", 55);
    \u0275\u0275text(28, "Duraci\xF3n en d\xEDas (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 56);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editor.setDuration($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(30, PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_30_Template, 2, 1, "span", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 45)(32, "label", 57);
    \u0275\u0275text(33, "Indicaciones de toma (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "input", 58);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Template_input_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editor.rxMedInstructions.set($event));
    })("keydown.enter", function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Template_input_keydown_enter_34_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editor.addMedicationToDraft());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(35, PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_35_Template, 2, 1, "span", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 59)(37, "button", 60);
    \u0275\u0275listener("click", function PatientPrescriptionsComponent_Conditional_0_Conditional_32_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editor.addMedicationToDraft());
    });
    \u0275\u0275element(38, "ng-icon", 61);
    \u0275\u0275elementStart(39, "span");
    \u0275\u0275text(40, "Agregar medicamento a la receta");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(41, PatientPrescriptionsComponent_Conditional_0_Conditional_32_Conditional_41_Template, 6, 1, "div", 62);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_8_0;
    let tmp_12_0;
    let tmp_16_0;
    let tmp_19_0;
    let tmp_22_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r2.editor.rxMedicationName());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_5_0 = ctx_r2.editor.medicationErrors().name) ? 6 : -1, tmp_5_0);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.editor.rxDosage());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_8_0 = ctx_r2.editor.medicationErrors().dosage) ? 11 : -1, tmp_8_0);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.editor.rxFrequency());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.editor.commonFrequencies);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_12_0 = ctx_r2.editor.medicationErrors().frequency) ? 18 : -1, tmp_12_0);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.editor.rxAdministrationRoute());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.editor.commonRoutes);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_16_0 = ctx_r2.editor.medicationErrors().route) ? 25 : -1, tmp_16_0);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.editor.rxDurationDays());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_19_0 = ctx_r2.editor.medicationErrors().duration) ? 30 : -1, tmp_19_0);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.editor.rxMedInstructions());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_22_0 = ctx_r2.editor.medicationErrors().instructions) ? 35 : -1, tmp_22_0);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r2.editor.draftPrescriptions().length > 0 ? 41 : -1);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_33_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 84);
    \u0275\u0275listener("click", function PatientPrescriptionsComponent_Conditional_0_Conditional_33_For_6_Template_button_click_0_listener() {
      const sug_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.editor.selectQuickStudy(sug_r12));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sug_r12 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" + ", sug_r12, " ");
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_33_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_33_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_33_Conditional_23_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 65)(1, "div", 66)(2, "span", 67);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "strong", 69);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 85);
    \u0275\u0275listener("click", function PatientPrescriptionsComponent_Conditional_0_Conditional_33_Conditional_23_For_5_Template_button_click_6_listener() {
      const \u0275$index_273_r14 = \u0275\u0275restoreView(_r13).$index;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.editor.removeStudyFromDraft(\u0275$index_273_r14));
    });
    \u0275\u0275element(7, "ng-icon", 74);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const study_r15 = ctx.$implicit;
    const \u0275$index_273_r14 = ctx.$index;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275$index_273_r14 + 1, ".");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(study_r15);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_33_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62)(1, "span", 63);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul", 64);
    \u0275\u0275repeaterCreate(4, PatientPrescriptionsComponent_Conditional_0_Conditional_33_Conditional_23_For_5_Template, 8, 2, "li", 65, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Estudios solicitados en la orden actual (", ctx_r2.editor.draftStudies().length, ")");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.editor.draftStudies());
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 75)(2, "span", 76);
    \u0275\u0275text(3, "Estudios frecuentes (clic para completar):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 77);
    \u0275\u0275repeaterCreate(5, PatientPrescriptionsComponent_Conditional_0_Conditional_33_For_6_Template, 2, 1, "button", 78, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 79)(8, "div", 21)(9, "label", 80);
    \u0275\u0275text(10, "Estudio o Pr\xE1ctica M\xE9dica a Solicitar *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 81);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function PatientPrescriptionsComponent_Conditional_0_Conditional_33_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editor.rxStudyName.set($event));
    })("keydown.enter", function PatientPrescriptionsComponent_Conditional_0_Conditional_33_Template_input_keydown_enter_11_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editor.addStudyToDraft());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, PatientPrescriptionsComponent_Conditional_0_Conditional_33_Conditional_12_Template, 2, 1, "span", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 21)(14, "label", 82);
    \u0275\u0275text(15, "Especificaci\xF3n / Regi\xF3n / Preparaci\xF3n (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 83);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function PatientPrescriptionsComponent_Conditional_0_Conditional_33_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editor.rxStudySpecification.set($event));
    })("keydown.enter", function PatientPrescriptionsComponent_Conditional_0_Conditional_33_Template_input_keydown_enter_16_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editor.addStudyToDraft());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(17, PatientPrescriptionsComponent_Conditional_0_Conditional_33_Conditional_17_Template, 2, 1, "span", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 59)(19, "button", 60);
    \u0275\u0275listener("click", function PatientPrescriptionsComponent_Conditional_0_Conditional_33_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editor.addStudyToDraft());
    });
    \u0275\u0275element(20, "ng-icon", 61);
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22, "Agregar estudio a la orden");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(23, PatientPrescriptionsComponent_Conditional_0_Conditional_33_Conditional_23_Template, 6, 1, "div", 62);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_6_0;
    let tmp_9_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.editor.commonStudySuggestions);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngModel", ctx_r2.editor.rxStudyName());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_6_0 = ctx_r2.editor.studyErrors().name) ? 12 : -1, tmp_6_0);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.editor.rxStudySpecification());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_9_0 = ctx_r2.editor.studyErrors().specification) ? 17 : -1, tmp_9_0);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r2.editor.draftStudies().length > 0 ? 23 : -1);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 41);
    \u0275\u0275listener("click", function PatientPrescriptionsComponent_Conditional_0_Conditional_54_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editor.printRecord(ctx_r2.latestEncounter()));
    });
    \u0275\u0275element(1, "ng-icon", 42);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r2.editor.rxBusy());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.editor.rxFormMode() === "STUDY" ? "Emitir e Imprimir Orden de Estudios" : "Emitir e Imprimir Receta M\xE9dica", " ");
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 38);
    \u0275\u0275text(1, "Cargando recetas y \xF3rdenes...");
    \u0275\u0275elementEnd();
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 86);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 87);
    \u0275\u0275listener("click", function PatientPrescriptionsComponent_Conditional_0_Conditional_64_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.editor.prescriptionStore.reload());
    });
    \u0275\u0275text(3, " Reintentar ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.editor.prescriptionStore.loadError(), " ");
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_65_For_2_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
  }
  if (rf & 2) {
    const m_r19 = ctx.$implicit;
    const \u0275$index_381_r20 = ctx.$index;
    const \u0275$count_381_r21 = ctx.$count;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r19.medicationName);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" (", m_r19.dosage, " \xB7 ", m_r19.frequency, ")", !(\u0275$index_381_r20 === \u0275$count_381_r21 - 1) ? ", " : "", " ");
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_65_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 93);
    \u0275\u0275repeaterCreate(1, PatientPrescriptionsComponent_Conditional_0_Conditional_65_For_2_Conditional_7_For_2_Template, 3, 4, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rec_r22 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(rec_r22.prescriptions);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_65_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 93)(1, "strong");
    \u0275\u0275text(2, "Estudios:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rec_r22 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", rec_r22.diagnosticOrders.join(" \xB7 "), " ");
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_65_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 94);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rec_r22 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Diagn\xF3stico: ", rec_r22.diagnosisDescription);
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_65_For_2_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 98);
    \u0275\u0275listener("click", function PatientPrescriptionsComponent_Conditional_0_Conditional_65_For_2_Conditional_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r23);
      const rec_r22 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.editor.reprintSavedRecord(rec_r22));
    });
    \u0275\u0275element(1, "ng-icon", 42);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Imprimir");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r2.editor.rxBusy());
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_65_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 88)(1, "div", 89)(2, "div", 90)(3, "span", 91);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 92);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, PatientPrescriptionsComponent_Conditional_0_Conditional_65_For_2_Conditional_7_Template, 3, 0, "p", 93);
    \u0275\u0275conditionalCreate(8, PatientPrescriptionsComponent_Conditional_0_Conditional_65_For_2_Conditional_8_Template, 4, 1, "p", 93);
    \u0275\u0275conditionalCreate(9, PatientPrescriptionsComponent_Conditional_0_Conditional_65_For_2_Conditional_9_Template, 2, 1, "span", 94);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 95);
    \u0275\u0275conditionalCreate(11, PatientPrescriptionsComponent_Conditional_0_Conditional_65_For_2_Conditional_11_Template, 4, 1, "button", 96);
    \u0275\u0275elementStart(12, "button", 97);
    \u0275\u0275listener("click", function PatientPrescriptionsComponent_Conditional_0_Conditional_65_For_2_Template_button_click_12_listener() {
      const rec_r22 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.editor.deleteSavedRecord(rec_r22.id));
    });
    \u0275\u0275element(13, "ng-icon", 74);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const rec_r22 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("study", rec_r22.type === "STUDY_ORDERS");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", rec_r22.type === "STUDY_ORDERS" ? "Orden de Estudios" : "Receta M\xE9dica", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.editor.formatRxDate(rec_r22.createdAt));
    \u0275\u0275advance();
    \u0275\u0275conditional(rec_r22.prescriptions.length > 0 ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(rec_r22.diagnosticOrders.length > 0 ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(rec_r22.diagnosisDescription ? 9 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.editor.recordActions.has("PRINT_DOCUMENT") ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.editor.rxBusy());
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 39);
    \u0275\u0275repeaterCreate(1, PatientPrescriptionsComponent_Conditional_0_Conditional_65_For_2_Template, 14, 9, "li", 88, _forTrack06);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.editor.savedPrescriptionRecords());
  }
}
function PatientPrescriptionsComponent_Conditional_0_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 40);
    \u0275\u0275text(1, " Todav\xEDa no se registraron recetas ni \xF3rdenes de estudios para este paciente. Complet\xE1 el formulario superior para emitir e imprimir la primera. ");
    \u0275\u0275elementEnd();
  }
}
function PatientPrescriptionsComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
    \u0275\u0275element(5, "ng-icon", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "h3", 6);
    \u0275\u0275text(8, "Confeccionar Receta u Orden de Estudios");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 7);
    \u0275\u0275text(10, " Paciente: ");
    \u0275\u0275elementStart(11, "strong");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275text(13);
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(16, "div", 8);
    \u0275\u0275conditionalCreate(17, PatientPrescriptionsComponent_Conditional_0_Conditional_17_Template, 4, 2, "button", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 10)(19, "div", 11)(20, "button", 12);
    \u0275\u0275listener("click", function PatientPrescriptionsComponent_Conditional_0_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editor.setRxFormMode("MEDICATION"));
    });
    \u0275\u0275element(21, "ng-icon", 13);
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23, "Recetar Medicaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(24, PatientPrescriptionsComponent_Conditional_0_Conditional_24_Template, 2, 1, "span", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 12);
    \u0275\u0275listener("click", function PatientPrescriptionsComponent_Conditional_0_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editor.setRxFormMode("STUDY"));
    });
    \u0275\u0275element(26, "ng-icon", 15);
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28, "Solicitar Estudios / Pr\xE1cticas");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(29, PatientPrescriptionsComponent_Conditional_0_Conditional_29_Template, 2, 1, "span", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(30, PatientPrescriptionsComponent_Conditional_0_Conditional_30_Template, 4, 1, "div", 16);
    \u0275\u0275conditionalCreate(31, PatientPrescriptionsComponent_Conditional_0_Conditional_31_Template, 4, 1, "div", 17);
    \u0275\u0275conditionalCreate(32, PatientPrescriptionsComponent_Conditional_0_Conditional_32_Template, 42, 13, "div", 18);
    \u0275\u0275conditionalCreate(33, PatientPrescriptionsComponent_Conditional_0_Conditional_33_Template, 24, 5, "div", 18);
    \u0275\u0275element(34, "div", 19);
    \u0275\u0275elementStart(35, "div", 20)(36, "div", 21)(37, "label", 22);
    \u0275\u0275text(38, "Diagn\xF3stico Presuntivo o Motivo Cl\xEDnico (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "input", 23);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function PatientPrescriptionsComponent_Conditional_0_Template_input_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editor.rxDiagnosis.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(40, PatientPrescriptionsComponent_Conditional_0_Conditional_40_Template, 2, 1, "span", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 21)(42, "label", 25);
    \u0275\u0275text(43, "Indicaciones generales para el paciente (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "input", 26);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function PatientPrescriptionsComponent_Conditional_0_Template_input_ngModelChange_44_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editor.rxGeneralInstructions.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(45, PatientPrescriptionsComponent_Conditional_0_Conditional_45_Template, 2, 1, "span", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 27)(47, "button", 28);
    \u0275\u0275listener("click", function PatientPrescriptionsComponent_Conditional_0_Template_button_click_47_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editor.clearRxForm());
    });
    \u0275\u0275text(48, " Limpiar formulario ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 29)(50, "button", 30);
    \u0275\u0275listener("click", function PatientPrescriptionsComponent_Conditional_0_Template_button_click_50_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editor.saveCurrentRxToHistory());
    });
    \u0275\u0275element(51, "ng-icon", 31);
    \u0275\u0275elementStart(52, "span");
    \u0275\u0275text(53, "Guardar en Historial");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(54, PatientPrescriptionsComponent_Conditional_0_Conditional_54_Template, 4, 2, "button", 9);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(55, "div", 32)(56, "div", 33)(57, "div", 34)(58, "div", 35);
    \u0275\u0275element(59, "ng-icon", 36);
    \u0275\u0275elementStart(60, "h3", 6);
    \u0275\u0275text(61);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(62, "div", 37);
    \u0275\u0275conditionalCreate(63, PatientPrescriptionsComponent_Conditional_0_Conditional_63_Template, 2, 0, "p", 38)(64, PatientPrescriptionsComponent_Conditional_0_Conditional_64_Template, 4, 1)(65, PatientPrescriptionsComponent_Conditional_0_Conditional_65_Template, 3, 0, "ul", 39)(66, PatientPrescriptionsComponent_Conditional_0_Conditional_66_Template, 2, 0, "p", 40);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_19_0;
    let tmp_22_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("name", ctx_r2.editor.rxFormMode() === "MEDICATION" ? "lucidePill" : "lucideFileText");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx.fullName);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (DNI ", ctx_r2.editor.patientNationalId(), ") \xB7 Profesional: ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.editor.authService.userName());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.editor.recordActions.has("PRINT_DOCUMENT") ? 17 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", ctx_r2.editor.rxFormMode() === "MEDICATION");
    \u0275\u0275attribute("aria-selected", ctx_r2.editor.rxFormMode() === "MEDICATION");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.editor.draftPrescriptions().length > 0 ? 24 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r2.editor.rxFormMode() === "STUDY");
    \u0275\u0275attribute("aria-selected", ctx_r2.editor.rxFormMode() === "STUDY");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.editor.draftStudies().length > 0 ? 29 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.editor.rxErrorMessage() ? 30 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.editor.rxSuccessMessage() ? 31 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.editor.rxFormMode() === "MEDICATION" ? 32 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.editor.rxFormMode() === "STUDY" ? 33 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngModel", ctx_r2.editor.rxDiagnosis());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_19_0 = ctx_r2.editor.diagnosisError()) ? 40 : -1, tmp_19_0);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.editor.rxGeneralInstructions());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_22_0 = ctx_r2.editor.generalInstructionsError()) ? 45 : -1, tmp_22_0);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r2.editor.rxBusy());
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.editor.recordActions.has("PRINT_DOCUMENT") ? 54 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" Recetas y Estudios Emitidos (", ctx_r2.editor.savedPrescriptionRecords().length, ") ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.editor.prescriptionStore.loading() ? 63 : ctx_r2.editor.prescriptionStore.loadError() ? 64 : ctx_r2.editor.savedPrescriptionRecords().length > 0 ? 65 : 66);
  }
}
var PatientPrescriptionsComponent = class _PatientPrescriptionsComponent {
  editor = inject(PatientPrescriptionEditorStore);
  latestEncounter = input(
    ...ngDevMode ? [void 0, { debugName: "latestEncounter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function PatientPrescriptionsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientPrescriptionsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PatientPrescriptionsComponent, selectors: [["app-patient-prescriptions"]], inputs: { latestEncounter: [1, "latestEncounter"] }, features: [\u0275\u0275ProvidersFeature([
    provideIcons({
      lucidePill,
      lucideFileText,
      lucidePrinter,
      lucidePlus,
      lucideClock,
      lucideTrash2,
      lucideAlertCircle,
      lucideCheckCircle2
    })
  ])], decls: 1, vars: 1, consts: [["aria-label", "Recetas y Estudios", 1, "tab-panel", "animate-fade-in"], [1, "clinical-section-card", "rx-builder-card"], [1, "sec-card-header", "rx-card-header"], [1, "rx-header-title-group"], [1, "rx-header-icon-badge"], [3, "name"], [1, "sec-card-title"], [1, "rx-header-subtitle"], [1, "rx-header-actions"], ["type", "button", 1, "cta-primary-btn", "btn-sm", 3, "disabled"], [1, "sec-card-body", "rx-builder-body"], ["role", "tablist", "aria-label", "Tipo de indicaci\xF3n m\xE9dica", 1, "rx-mode-selector"], ["type", "button", "role", "tab", 1, "rx-mode-tab", 3, "click"], ["name", "lucidePill"], [1, "rx-mode-count"], ["name", "lucideFileText"], ["role", "alert", 1, "rx-feedback-banner", "rx-error"], ["role", "status", 1, "rx-feedback-banner", "rx-success"], [1, "rx-form-section", "animate-fade-in"], [1, "sec-subdivider"], [1, "rx-form-grid-footer"], [1, "rx-field"], ["for", "rx-diagnosis", 1, "rx-label"], ["id", "rx-diagnosis", "type", "text", "placeholder", "Ej: Cefalea en estudio, Control cl\xEDnico, Cuadro respiratorio agudo...", 1, "rx-input", 3, "ngModelChange", "ngModel"], ["role", "alert", 1, "field-error"], ["for", "rx-general-notes", 1, "rx-label"], ["id", "rx-general-notes", "type", "text", "placeholder", "Ej: Concurrir con estudios anteriores, reposo por 48 hs...", 1, "rx-input", 3, "ngModelChange", "ngModel"], [1, "rx-bottom-actions"], ["type", "button", 1, "secondary-outline-btn", "btn-sm", 3, "click"], [1, "rx-bottom-right-btns"], ["type", "button", 1, "secondary-outline-btn", "btn-sm", 3, "click", "disabled"], ["name", "lucideCheckCircle2"], [1, "panel-grid-cards"], [1, "clinical-section-card"], [1, "sec-card-header"], [1, "flex", "items-center", "gap-2"], ["name", "lucideClock", 1, "text-teal-600"], [1, "sec-card-body"], ["role", "status", 1, "text-xs", "text-slate-500", "py-3"], [1, "rx-history-list"], [1, "text-xs", "text-slate-500", "py-3"], ["type", "button", 1, "cta-primary-btn", "btn-sm", 3, "click", "disabled"], ["name", "lucidePrinter"], ["name", "lucideAlertCircle"], [1, "rx-form-grid-med"], [1, "rx-field", "rx-field-wide"], ["for", "rx-med-name", 1, "rx-label"], ["id", "rx-med-name", "type", "text", "placeholder", "Ej: Amoxicilina 500 mg, Ibuprofeno 600 mg, Losart\xE1n 50 mg...", 1, "rx-input", 3, "ngModelChange", "keydown.enter", "ngModel"], ["for", "rx-med-dosage", 1, "rx-label"], ["id", "rx-med-dosage", "type", "text", "placeholder", "Ej: 1 comprimido, 5 ml, 20 gotas...", 1, "rx-input", 3, "ngModelChange", "keydown.enter", "ngModel"], ["for", "rx-med-freq", 1, "rx-label"], ["id", "rx-med-freq", 1, "rx-input", 3, "ngModelChange", "ngModel"], [3, "value"], ["for", "rx-med-route", 1, "rx-label"], ["id", "rx-med-route", 1, "rx-input", 3, "ngModelChange", "ngModel"], ["for", "rx-med-days", 1, "rx-label"], ["id", "rx-med-days", "type", "text", "inputmode", "numeric", "placeholder", "Ej: 7, 10, 30...", 1, "rx-input", 3, "ngModelChange", "ngModel"], ["for", "rx-med-notes", 1, "rx-label"], ["id", "rx-med-notes", "type", "text", "placeholder", "Ej: Tomar despu\xE9s de las comidas, no suspender antes de finalizar...", 1, "rx-input", 3, "ngModelChange", "keydown.enter", "ngModel"], [1, "rx-add-row"], ["type", "button", 1, "rx-btn-add-item", 3, "click"], ["name", "lucidePlus"], [1, "rx-draft-items-box"], [1, "rx-draft-box-title"], [1, "rx-draft-list"], [1, "rx-draft-item"], [1, "rx-draft-item-main"], [1, "rx-item-index"], [1, "rx-item-title-row"], [1, "rx-item-name"], [1, "rx-item-badge"], [1, "rx-item-route"], [1, "rx-item-sub"], ["type", "button", "title", "Quitar medicamento", "aria-label", "Quitar medicamento", 1, "rx-btn-remove", 3, "click"], ["name", "lucideTrash2"], [1, "rx-quick-studies-bar"], [1, "rx-quick-label"], [1, "rx-quick-chips"], ["type", "button", 1, "rx-quick-chip"], [1, "rx-form-grid-study"], ["for", "rx-study-name", 1, "rx-label"], ["id", "rx-study-name", "type", "text", "placeholder", "Ej: Tomograf\xEDa Axial Computada de Cerebro, Resonancia Magn\xE9tica, Ecograf\xEDa...", 1, "rx-input", 3, "ngModelChange", "keydown.enter", "ngModel"], ["for", "rx-study-spec", 1, "rx-label"], ["id", "rx-study-spec", "type", "text", "placeholder", "Ej: Sin contraste, Con contraste endovenoso, Ayuno de 8 horas...", 1, "rx-input", 3, "ngModelChange", "keydown.enter", "ngModel"], ["type", "button", 1, "rx-quick-chip", 3, "click"], ["type", "button", "title", "Quitar estudio", "aria-label", "Quitar estudio", 1, "rx-btn-remove", 3, "click"], ["role", "alert", 1, "text-xs", "text-slate-500", "py-3"], ["type", "button", 1, "secondary-outline-btn", "btn-xs", 3, "click"], [1, "rx-history-card"], [1, "rx-history-info"], [1, "rx-history-top"], [1, "rx-history-type-badge"], [1, "rx-history-date"], [1, "rx-history-items"], [1, "rx-history-diag"], [1, "rx-history-actions"], ["type", "button", "title", "Reimprimir documento", 1, "secondary-outline-btn", "btn-xs", 3, "disabled"], ["type", "button", "title", "Eliminar registro", "aria-label", "Eliminar registro", 1, "rx-btn-remove", 3, "click", "disabled"], ["type", "button", "title", "Reimprimir documento", 1, "secondary-outline-btn", "btn-xs", 3, "click", "disabled"]], template: function PatientPrescriptionsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, PatientPrescriptionsComponent_Conditional_0_Template, 67, 25, "section", 0);
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275conditional((tmp_0_0 = ctx.editor.activePatientService.activePatient()) ? 0 : -1, tmp_0_0);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, NgIcon], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  min-width: 0;\n}\n.cta-primary-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  background-color: #006874;\n  color: #ffffff;\n  border: none;\n  border-radius: 9px;\n  padding: 0.55rem 1rem;\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(0, 104, 116, 0.25);\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.cta-primary-btn[_ngcontent-%COMP%]:hover {\n  background-color: #00505a;\n}\n.cta-primary-btn.btn-sm[_ngcontent-%COMP%] {\n  padding: 0.4rem 0.8rem;\n  font-size: 0.8rem;\n}\n.tab-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n.panel-grid-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: 1.25rem;\n}\n.clinical-section-card[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 12px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);\n  overflow: hidden;\n}\n.sec-card-header[_ngcontent-%COMP%] {\n  padding: 0.95rem 1.25rem;\n  border-bottom: 1px solid var(--%NS%dc-outline, #f1f5f9);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.sec-card-title[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #0f172a);\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  margin: 0;\n}\n.sec-card-body[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.65rem;\n}\n.sec-subdivider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n  margin: 0.5rem 0;\n}\n.secondary-outline-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  background: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  color: var(--%NS%dc-ink-secondary, #334155);\n  border-radius: 8px;\n  padding: 0.45rem 0.85rem;\n  font-size: 0.82rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.secondary-outline-btn[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.med-prescriptions-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.med-prescription-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 8px;\n  background: var(--%NS%dc-surface-low, #fbfcfd);\n}\n.med-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.med-name[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.med-instructions[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.med-prescription-card.justify-between[_ngcontent-%COMP%] {\n  justify-content: space-between;\n}\n.btn-xs[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.65rem;\n  font-size: 0.75rem;\n  border-radius: 6px;\n}\n.rx-builder-card[_ngcontent-%COMP%] {\n  border-color: var(--%NS%dc-outline, #cbd5e1);\n  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);\n}\n.rx-card-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      var(--%NS%dc-surface-low, #f8fafc) 0%,\n      var(--%NS%dc-surface, #ffffff) 100%);\n  padding: 1.1rem 1.35rem;\n  flex-wrap: wrap;\n}\n.rx-header-title-group[_ngcontent-%COMP%], \n.rx-header-actions[_ngcontent-%COMP%], \n.rx-feedback-banner[_ngcontent-%COMP%], \n.rx-item-title-row[_ngcontent-%COMP%], \n.rx-bottom-right-btns[_ngcontent-%COMP%], \n.rx-history-top[_ngcontent-%COMP%], \n.rx-history-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.rx-header-title-group[_ngcontent-%COMP%] {\n  gap: 0.85rem;\n}\n.rx-header-icon-badge[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  background: var(--%NS%dc-teal-surface, #e6f6f8);\n  color: var(--%NS%dc-teal-ink, #006874);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.25rem;\n  flex-shrink: 0;\n}\n.rx-header-subtitle[_ngcontent-%COMP%], \n.rx-history-date[_ngcontent-%COMP%], \n.rx-history-diag[_ngcontent-%COMP%] {\n  margin: 0.15rem 0 0;\n  font-size: 0.76rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.rx-builder-body[_ngcontent-%COMP%] {\n  padding: 1.35rem;\n  gap: 1.1rem;\n}\n.rx-mode-selector[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n  padding: 0.3rem;\n  border-radius: 10px;\n  gap: 0.3rem;\n  align-self: flex-start;\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n}\n.rx-mode-tab[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.55rem 1.15rem;\n  border-radius: 8px;\n  border: none;\n  background: transparent;\n  color: var(--%NS%dc-ink-secondary, #475569);\n  font-size: 0.84rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.rx-mode-tab[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.rx-mode-tab.active[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface, #ffffff);\n  color: var(--%NS%dc-teal-ink, #006874);\n  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.08);\n}\n.rx-mode-count[_ngcontent-%COMP%] {\n  background: #006874;\n  color: #ffffff;\n  font-size: 0.7rem;\n  font-weight: 700;\n  padding: 1px 6px;\n  border-radius: 9999px;\n}\n.rx-feedback-banner[_ngcontent-%COMP%] {\n  padding: 0.65rem 1rem;\n  border-radius: 8px;\n  font-size: 0.82rem;\n  font-weight: 500;\n}\n.rx-feedback-banner.rx-error[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-error-surface, #fff1f2);\n  border: 1px solid #fecdd3;\n  color: var(--%NS%dc-error-ink, #be123c);\n}\n.rx-feedback-banner.rx-success[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-success-surface, #f0fdf4);\n  border: 1px solid #bbf7d0;\n  color: var(--%NS%dc-success-ink, #15803d);\n}\n.rx-form-section[_ngcontent-%COMP%], \n.rx-field[_ngcontent-%COMP%], \n.rx-quick-studies-bar[_ngcontent-%COMP%], \n.rx-draft-items-box[_ngcontent-%COMP%], \n.rx-draft-list[_ngcontent-%COMP%], \n.rx-history-list[_ngcontent-%COMP%], \n.rx-history-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.rx-form-section[_ngcontent-%COMP%] {\n  gap: 1rem;\n}\n.rx-form-grid-med[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 0.9rem 1rem;\n}\n.rx-field-wide[_ngcontent-%COMP%] {\n  grid-column: span 2;\n}\n.rx-form-grid-study[_ngcontent-%COMP%], \n.rx-form-grid-footer[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.9rem 1rem;\n}\n@media (max-width: 768px) {\n  .rx-form-grid-med[_ngcontent-%COMP%], \n   .rx-form-grid-study[_ngcontent-%COMP%], \n   .rx-form-grid-footer[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .rx-field-wide[_ngcontent-%COMP%] {\n    grid-column: span 1;\n  }\n}\n.rx-field[_ngcontent-%COMP%] {\n  gap: 0.35rem;\n}\n.rx-label[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink-secondary, #334155);\n}\n.rx-input[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 0.58rem 0.85rem;\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 8px;\n  font-size: 0.85rem;\n  color: var(--%NS%dc-ink, #0f172a);\n  background: var(--%NS%dc-surface, #ffffff);\n  transition: border-color 0.15s ease, box-shadow 0.15s ease;\n}\n.rx-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #006874;\n  box-shadow: 0 0 0 3px rgba(0, 104, 116, 0.12);\n}\n.rx-quick-studies-bar[_ngcontent-%COMP%], \n.rx-draft-items-box[_ngcontent-%COMP%] {\n  gap: 0.5rem;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  padding: 0.85rem 1rem;\n  border-radius: 10px;\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n}\n.rx-quick-label[_ngcontent-%COMP%], \n.rx-draft-box-title[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink-secondary, #475569);\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.rx-quick-chips[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n}\n.rx-quick-chip[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  color: var(--%NS%dc-ink, #0f172a);\n  font-size: 0.76rem;\n  font-weight: 500;\n  padding: 0.35rem 0.75rem;\n  border-radius: 9999px;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.rx-quick-chip[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-teal-surface, #e6f6f8);\n  border-color: #006874;\n  color: var(--%NS%dc-teal-ink, #006874);\n}\n.rx-add-row[_ngcontent-%COMP%] {\n  display: flex;\n}\n.rx-btn-add-item[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  background: var(--%NS%dc-teal-surface, #f0fdfa);\n  border: 1px dashed #0d9488;\n  color: var(--%NS%dc-teal-ink, #0f766e);\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.82rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.rx-btn-add-item[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-teal-surface, #ccfbf1);\n  border-style: solid;\n}\n.rx-draft-list[_ngcontent-%COMP%], \n.rx-history-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  gap: 0.5rem;\n}\n.rx-draft-item[_ngcontent-%COMP%], \n.rx-history-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  background: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 8px;\n  padding: 0.65rem 0.9rem;\n}\n.rx-draft-item-main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 0.6rem;\n}\n.rx-item-index[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--%NS%dc-teal-ink, #006874);\n  font-size: 0.85rem;\n}\n.rx-item-title-row[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n}\n.rx-item-name[_ngcontent-%COMP%], \n.rx-history-items[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.85rem;\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.rx-item-badge[_ngcontent-%COMP%], \n.rx-item-route[_ngcontent-%COMP%], \n.rx-history-type-badge[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  background: var(--%NS%dc-teal-surface, #e6f6f8);\n  color: var(--%NS%dc-teal-ink, #006874);\n  padding: 1px 7px;\n  border-radius: 5px;\n}\n.rx-item-route[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink-muted, #64748b);\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n}\n.rx-item-sub[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  font-size: 0.76rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  margin-top: 0.15rem;\n}\n.rx-btn-remove[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  color: var(--%NS%dc-error-ink, #ef4444);\n  padding: 0.35rem;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.rx-btn-remove[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-error-surface, #fee2e2);\n}\n.rx-bottom-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  padding-top: 0.5rem;\n  border-top: 1px solid var(--%NS%dc-outline, #f1f5f9);\n}\n.rx-bottom-right-btns[_ngcontent-%COMP%] {\n  gap: 0.65rem;\n  flex-wrap: wrap;\n}\n.rx-history-info[_ngcontent-%COMP%] {\n  gap: 0.2rem;\n}\n.rx-history-type-badge[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n}\n.rx-history-type-badge.study[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-blue-surface, #eff6ff);\n  color: var(--%NS%dc-blue-ink, #1d4ed8);\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n}\n.animate-fade-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.15s ease-in-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(3px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media print {\n  .cta-primary-btn[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n  .clinical-section-card[_ngcontent-%COMP%] {\n    box-shadow: none !important;\n    border: 1px solid #000000 !important;\n  }\n}\n.field-error[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 6px;\n  color: #b91c1c;\n  font-size: .8rem;\n}\n/*# sourceMappingURL=patient-prescriptions.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientPrescriptionsComponent, [{
    type: Component,
    args: [{ selector: "app-patient-prescriptions", imports: [FormsModule, NgIcon], providers: [
      provideIcons({
        lucidePill,
        lucideFileText,
        lucidePrinter,
        lucidePlus,
        lucideClock,
        lucideTrash2,
        lucideAlertCircle,
        lucideCheckCircle2
      })
    ], template: `@if (editor.activePatientService.activePatient(); as patient) {\r
  <section class="tab-panel animate-fade-in" aria-label="Recetas y Estudios">\r
    <!-- TARJETA PRINCIPAL: CONFECCI\xD3N DE RECETA M\xC9DICA U ORDEN DE ESTUDIOS -->\r
    <div class="clinical-section-card rx-builder-card">\r
      <div class="sec-card-header rx-card-header">\r
        <div class="rx-header-title-group">\r
          <div class="rx-header-icon-badge">\r
            <ng-icon\r
              [name]="editor.rxFormMode() === 'MEDICATION' ? 'lucidePill' : 'lucideFileText'"\r
            />\r
          </div>\r
          <div>\r
            <h3 class="sec-card-title">Confeccionar Receta u Orden de Estudios</h3>\r
            <p class="rx-header-subtitle">\r
              Paciente: <strong>{{ patient.fullName }}</strong> (DNI\r
              {{ editor.patientNationalId() }}) \xB7 Profesional:\r
              <strong>{{ editor.authService.userName() }}</strong>\r
            </p>\r
          </div>\r
        </div>\r
\r
        <div class="rx-header-actions">\r
          @if (editor.recordActions.has('PRINT_DOCUMENT')) {\r
            <button\r
              type="button"\r
              class="cta-primary-btn btn-sm"\r
              [disabled]="editor.rxBusy()"\r
              (click)="editor.printRecord(latestEncounter())"\r
            >\r
              <ng-icon name="lucidePrinter" />\r
              <span>\r
                {{\r
                  editor.rxFormMode() === 'STUDY'\r
                    ? 'Imprimir Orden de Estudios'\r
                    : 'Imprimir Receta M\xE9dica'\r
                }}\r
              </span>\r
            </button>\r
          }\r
        </div>\r
      </div>\r
\r
      <div class="sec-card-body rx-builder-body">\r
        <!-- Selector de modo: Medicaci\xF3n vs Estudios Diagn\xF3sticos -->\r
        <div class="rx-mode-selector" role="tablist" aria-label="Tipo de indicaci\xF3n m\xE9dica">\r
          <button\r
            type="button"\r
            role="tab"\r
            class="rx-mode-tab"\r
            [class.active]="editor.rxFormMode() === 'MEDICATION'"\r
            [attr.aria-selected]="editor.rxFormMode() === 'MEDICATION'"\r
            (click)="editor.setRxFormMode('MEDICATION')"\r
          >\r
            <ng-icon name="lucidePill" />\r
            <span>Recetar Medicaci\xF3n</span>\r
            @if (editor.draftPrescriptions().length > 0) {\r
              <span class="rx-mode-count">{{ editor.draftPrescriptions().length }}</span>\r
            }\r
          </button>\r
          <button\r
            type="button"\r
            role="tab"\r
            class="rx-mode-tab"\r
            [class.active]="editor.rxFormMode() === 'STUDY'"\r
            [attr.aria-selected]="editor.rxFormMode() === 'STUDY'"\r
            (click)="editor.setRxFormMode('STUDY')"\r
          >\r
            <ng-icon name="lucideFileText" />\r
            <span>Solicitar Estudios / Pr\xE1cticas</span>\r
            @if (editor.draftStudies().length > 0) {\r
              <span class="rx-mode-count">{{ editor.draftStudies().length }}</span>\r
            }\r
          </button>\r
        </div>\r
\r
        @if (editor.rxErrorMessage()) {\r
          <div class="rx-feedback-banner rx-error" role="alert">\r
            <ng-icon name="lucideAlertCircle" />\r
            <span>{{ editor.rxErrorMessage() }}</span>\r
          </div>\r
        }\r
\r
        @if (editor.rxSuccessMessage()) {\r
          <div class="rx-feedback-banner rx-success" role="status">\r
            <ng-icon name="lucideCheckCircle2" />\r
            <span>{{ editor.rxSuccessMessage() }}</span>\r
          </div>\r
        }\r
\r
        <!-- MODO 1: FORMULARIO DE MEDICACI\xD3N -->\r
        @if (editor.rxFormMode() === 'MEDICATION') {\r
          <div class="rx-form-section animate-fade-in">\r
            <div class="rx-form-grid-med">\r
              <div class="rx-field rx-field-wide">\r
                <label class="rx-label" for="rx-med-name"\r
                  >Medicamento / Principio Activo y Concentraci\xF3n *</label\r
                >\r
                <input\r
                  id="rx-med-name"\r
                  type="text"\r
                  class="rx-input"\r
                  placeholder="Ej: Amoxicilina 500 mg, Ibuprofeno 600 mg, Losart\xE1n 50 mg..."\r
                  [ngModel]="editor.rxMedicationName()"\r
                  (ngModelChange)="editor.rxMedicationName.set($event)"\r
                  (keydown.enter)="editor.addMedicationToDraft()"\r
                />\r
                @if (editor.medicationErrors().name; as error) { <span class="field-error" role="alert">{{ error }}</span> }\r
              </div>\r
\r
              <div class="rx-field">\r
                <label class="rx-label" for="rx-med-dosage">Dosis / Presentaci\xF3n</label>\r
                <input\r
                  id="rx-med-dosage"\r
                  type="text"\r
                  class="rx-input"\r
                  placeholder="Ej: 1 comprimido, 5 ml, 20 gotas..."\r
                  [ngModel]="editor.rxDosage()"\r
                  (ngModelChange)="editor.rxDosage.set($event)"\r
                  (keydown.enter)="editor.addMedicationToDraft()"\r
                />\r
                @if (editor.medicationErrors().dosage; as error) { <span class="field-error" role="alert">{{ error }}</span> }\r
              </div>\r
\r
              <div class="rx-field">\r
                <label class="rx-label" for="rx-med-freq">Frecuencia</label>\r
                <select\r
                  id="rx-med-freq"\r
                  class="rx-input"\r
                  [ngModel]="editor.rxFrequency()"\r
                  (ngModelChange)="editor.rxFrequency.set($event)"\r
                >\r
                  @for (freq of editor.commonFrequencies; track freq) {\r
                    <option [value]="freq">{{ freq }}</option>\r
                  }\r
                </select>\r
                @if (editor.medicationErrors().frequency; as error) { <span class="field-error" role="alert">{{ error }}</span> }\r
              </div>\r
\r
              <div class="rx-field">\r
                <label class="rx-label" for="rx-med-route">V\xEDa de administraci\xF3n</label>\r
                <select\r
                  id="rx-med-route"\r
                  class="rx-input"\r
                  [ngModel]="editor.rxAdministrationRoute()"\r
                  (ngModelChange)="editor.rxAdministrationRoute.set($event)"\r
                >\r
                  @for (route of editor.commonRoutes; track route) {\r
                    <option [value]="route">{{ route }}</option>\r
                  }\r
                </select>\r
                @if (editor.medicationErrors().route; as error) { <span class="field-error" role="alert">{{ error }}</span> }\r
              </div>\r
\r
              <div class="rx-field">\r
                <label class="rx-label" for="rx-med-days">Duraci\xF3n en d\xEDas (opcional)</label>\r
                <input\r
                  id="rx-med-days"\r
                  type="text"\r
                  inputmode="numeric"\r
                  class="rx-input"\r
                  placeholder="Ej: 7, 10, 30..."\r
                  [ngModel]="editor.rxDurationDays()"\r
                  (ngModelChange)="editor.setDuration($event)"\r
                />\r
                @if (editor.medicationErrors().duration; as error) { <span class="field-error" role="alert">{{ error }}</span> }\r
              </div>\r
\r
              <div class="rx-field rx-field-wide">\r
                <label class="rx-label" for="rx-med-notes">Indicaciones de toma (opcional)</label>\r
                <input\r
                  id="rx-med-notes"\r
                  type="text"\r
                  class="rx-input"\r
                  placeholder="Ej: Tomar despu\xE9s de las comidas, no suspender antes de finalizar..."\r
                  [ngModel]="editor.rxMedInstructions()"\r
                  (ngModelChange)="editor.rxMedInstructions.set($event)"\r
                  (keydown.enter)="editor.addMedicationToDraft()"\r
                />\r
                @if (editor.medicationErrors().instructions; as error) { <span class="field-error" role="alert">{{ error }}</span> }\r
              </div>\r
            </div>\r
\r
            <div class="rx-add-row">\r
              <button type="button" class="rx-btn-add-item" (click)="editor.addMedicationToDraft()">\r
                <ng-icon name="lucidePlus" />\r
                <span>Agregar medicamento a la receta</span>\r
              </button>\r
            </div>\r
\r
            <!-- Lista de medicamentos cargados en la receta actual -->\r
            @if (editor.draftPrescriptions().length > 0) {\r
              <div class="rx-draft-items-box">\r
                <span class="rx-draft-box-title"\r
                  >Medicamentos cargados en la receta actual ({{\r
                    editor.draftPrescriptions().length\r
                  }})</span\r
                >\r
                <ul class="rx-draft-list">\r
                  @for (med of editor.draftPrescriptions(); track $index; let i = $index) {\r
                    <li class="rx-draft-item">\r
                      <div class="rx-draft-item-main">\r
                        <span class="rx-item-index">{{ i + 1 }}.</span>\r
                        <div>\r
                          <div class="rx-item-title-row">\r
                            <strong class="rx-item-name">{{ med.medicationName }}</strong>\r
                            @if (med.dosage) {\r
                              <span class="rx-item-badge">{{ med.dosage }}</span>\r
                            }\r
                            @if (med.administrationRoute) {\r
                              <span class="rx-item-route">{{ med.administrationRoute }}</span>\r
                            }\r
                          </div>\r
                          <div class="rx-item-sub">\r
                            @if (med.frequency) {\r
                              <span>{{ med.frequency }}</span>\r
                            }\r
                            @if (med.durationDays) {\r
                              <span>\xB7 Durante {{ med.durationDays }} d\xEDas</span>\r
                            }\r
                            @if (med.instructions) {\r
                              <span>\xB7 {{ med.instructions }}</span>\r
                            }\r
                          </div>\r
                        </div>\r
                      </div>\r
                      <button\r
                        type="button"\r
                        class="rx-btn-remove"\r
                        (click)="editor.removeMedicationFromDraft(i)"\r
                        title="Quitar medicamento"\r
                        aria-label="Quitar medicamento"\r
                      >\r
                        <ng-icon name="lucideTrash2" />\r
                      </button>\r
                    </li>\r
                  }\r
                </ul>\r
              </div>\r
            }\r
          </div>\r
        }\r
\r
        <!-- MODO 2: FORMULARIO DE ESTUDIOS Y PR\xC1CTICAS (EJ: TOMOGRAF\xCDA) -->\r
        @if (editor.rxFormMode() === 'STUDY') {\r
          <div class="rx-form-section animate-fade-in">\r
            <!-- Sugerencias r\xE1pidas de estudios frecuentes -->\r
            <div class="rx-quick-studies-bar">\r
              <span class="rx-quick-label">Estudios frecuentes (clic para completar):</span>\r
              <div class="rx-quick-chips">\r
                @for (sug of editor.commonStudySuggestions; track sug) {\r
                  <button\r
                    type="button"\r
                    class="rx-quick-chip"\r
                    (click)="editor.selectQuickStudy(sug)"\r
                  >\r
                    + {{ sug }}\r
                  </button>\r
                }\r
              </div>\r
            </div>\r
\r
            <div class="rx-form-grid-study">\r
              <div class="rx-field">\r
                <label class="rx-label" for="rx-study-name"\r
                  >Estudio o Pr\xE1ctica M\xE9dica a Solicitar *</label\r
                >\r
                <input\r
                  id="rx-study-name"\r
                  type="text"\r
                  class="rx-input"\r
                  placeholder="Ej: Tomograf\xEDa Axial Computada de Cerebro, Resonancia Magn\xE9tica, Ecograf\xEDa..."\r
                  [ngModel]="editor.rxStudyName()"\r
                  (ngModelChange)="editor.rxStudyName.set($event)"\r
                  (keydown.enter)="editor.addStudyToDraft()"\r
                />\r
                @if (editor.studyErrors().name; as error) { <span class="field-error" role="alert">{{ error }}</span> }\r
              </div>\r
\r
              <div class="rx-field">\r
                <label class="rx-label" for="rx-study-spec"\r
                  >Especificaci\xF3n / Regi\xF3n / Preparaci\xF3n (opcional)</label\r
                >\r
                <input\r
                  id="rx-study-spec"\r
                  type="text"\r
                  class="rx-input"\r
                  placeholder="Ej: Sin contraste, Con contraste endovenoso, Ayuno de 8 horas..."\r
                  [ngModel]="editor.rxStudySpecification()"\r
                  (ngModelChange)="editor.rxStudySpecification.set($event)"\r
                  (keydown.enter)="editor.addStudyToDraft()"\r
                />\r
                @if (editor.studyErrors().specification; as error) { <span class="field-error" role="alert">{{ error }}</span> }\r
              </div>\r
            </div>\r
\r
            <div class="rx-add-row">\r
              <button type="button" class="rx-btn-add-item" (click)="editor.addStudyToDraft()">\r
                <ng-icon name="lucidePlus" />\r
                <span>Agregar estudio a la orden</span>\r
              </button>\r
            </div>\r
\r
            <!-- Lista de estudios cargados en la orden actual -->\r
            @if (editor.draftStudies().length > 0) {\r
              <div class="rx-draft-items-box">\r
                <span class="rx-draft-box-title"\r
                  >Estudios solicitados en la orden actual ({{\r
                    editor.draftStudies().length\r
                  }})</span\r
                >\r
                <ul class="rx-draft-list">\r
                  @for (study of editor.draftStudies(); track $index; let i = $index) {\r
                    <li class="rx-draft-item">\r
                      <div class="rx-draft-item-main">\r
                        <span class="rx-item-index">{{ i + 1 }}.</span>\r
                        <strong class="rx-item-name">{{ study }}</strong>\r
                      </div>\r
                      <button\r
                        type="button"\r
                        class="rx-btn-remove"\r
                        (click)="editor.removeStudyFromDraft(i)"\r
                        title="Quitar estudio"\r
                        aria-label="Quitar estudio"\r
                      >\r
                        <ng-icon name="lucideTrash2" />\r
                      </button>\r
                    </li>\r
                  }\r
                </ul>\r
              </div>\r
            }\r
          </div>\r
        }\r
\r
        <div class="sec-subdivider"></div>\r
\r
        <!-- DATOS CL\xCDNICOS COMPLEMENTARIOS DE LA RECETA / ORDEN -->\r
        <div class="rx-form-grid-footer">\r
          <div class="rx-field">\r
            <label class="rx-label" for="rx-diagnosis"\r
              >Diagn\xF3stico Presuntivo o Motivo Cl\xEDnico (opcional)</label\r
            >\r
            <input\r
              id="rx-diagnosis"\r
              type="text"\r
              class="rx-input"\r
              placeholder="Ej: Cefalea en estudio, Control cl\xEDnico, Cuadro respiratorio agudo..."\r
              [ngModel]="editor.rxDiagnosis()"\r
              (ngModelChange)="editor.rxDiagnosis.set($event)"\r
            />\r
            @if (editor.diagnosisError(); as error) { <span class="field-error" role="alert">{{ error }}</span> }\r
          </div>\r
\r
          <div class="rx-field">\r
            <label class="rx-label" for="rx-general-notes"\r
              >Indicaciones generales para el paciente (opcional)</label\r
            >\r
            <input\r
              id="rx-general-notes"\r
              type="text"\r
              class="rx-input"\r
              placeholder="Ej: Concurrir con estudios anteriores, reposo por 48 hs..."\r
              [ngModel]="editor.rxGeneralInstructions()"\r
              (ngModelChange)="editor.rxGeneralInstructions.set($event)"\r
            />\r
            @if (editor.generalInstructionsError(); as error) { <span class="field-error" role="alert">{{ error }}</span> }\r
          </div>\r
        </div>\r
\r
        <!-- BARRA DE ACCIONES FINALES -->\r
        <div class="rx-bottom-actions">\r
          <button type="button" class="secondary-outline-btn btn-sm" (click)="editor.clearRxForm()">\r
            Limpiar formulario\r
          </button>\r
\r
          <div class="rx-bottom-right-btns">\r
            <button\r
              type="button"\r
              class="secondary-outline-btn btn-sm"\r
              [disabled]="editor.rxBusy()"\r
              (click)="editor.saveCurrentRxToHistory()"\r
            >\r
              <ng-icon name="lucideCheckCircle2" />\r
              <span>Guardar en Historial</span>\r
            </button>\r
            @if (editor.recordActions.has('PRINT_DOCUMENT')) {\r
              <button\r
                type="button"\r
                class="cta-primary-btn btn-sm"\r
                [disabled]="editor.rxBusy()"\r
                (click)="editor.printRecord(latestEncounter())"\r
              >\r
                <ng-icon name="lucidePrinter" />\r
                <span>\r
                  {{\r
                    editor.rxFormMode() === 'STUDY'\r
                      ? 'Emitir e Imprimir Orden de Estudios'\r
                      : 'Emitir e Imprimir Receta M\xE9dica'\r
                  }}\r
                </span>\r
              </button>\r
            }\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- TARJETAS INFERIORES: HISTORIAL DE RECETAS EMITIDAS Y MEDICACI\xD3N HABITUAL -->\r
    <div class="panel-grid-cards">\r
      <!-- Historial de Recetas y Estudios Emitidos -->\r
      <div class="clinical-section-card">\r
        <div class="sec-card-header">\r
          <div class="flex items-center gap-2">\r
            <ng-icon name="lucideClock" class="text-teal-600" />\r
            <h3 class="sec-card-title">\r
              Recetas y Estudios Emitidos ({{ editor.savedPrescriptionRecords().length }})\r
            </h3>\r
          </div>\r
        </div>\r
        <div class="sec-card-body">\r
          @if (editor.prescriptionStore.loading()) {\r
            <p class="text-xs text-slate-500 py-3" role="status">Cargando recetas y \xF3rdenes...</p>\r
          } @else if (editor.prescriptionStore.loadError()) {\r
            <p class="text-xs text-slate-500 py-3" role="alert">\r
              {{ editor.prescriptionStore.loadError() }}\r
            </p>\r
            <button\r
              type="button"\r
              class="secondary-outline-btn btn-xs"\r
              (click)="editor.prescriptionStore.reload()"\r
            >\r
              Reintentar\r
            </button>\r
          } @else if (editor.savedPrescriptionRecords().length > 0) {\r
            <ul class="rx-history-list">\r
              @for (rec of editor.savedPrescriptionRecords(); track rec.id) {\r
                <li class="rx-history-card">\r
                  <div class="rx-history-info">\r
                    <div class="rx-history-top">\r
                      <span\r
                        class="rx-history-type-badge"\r
                        [class.study]="rec.type === 'STUDY_ORDERS'"\r
                      >\r
                        {{ rec.type === 'STUDY_ORDERS' ? 'Orden de Estudios' : 'Receta M\xE9dica' }}\r
                      </span>\r
                      <span class="rx-history-date">{{ editor.formatRxDate(rec.createdAt) }}</span>\r
                    </div>\r
                    @if (rec.prescriptions.length > 0) {\r
                      <p class="rx-history-items">\r
                        @for (m of rec.prescriptions; track $index; let last = $last) {\r
                          <strong>{{ m.medicationName }}</strong> ({{ m.dosage }} \xB7\r
                          {{ m.frequency }}){{ !last ? ', ' : '' }}\r
                        }\r
                      </p>\r
                    }\r
                    @if (rec.diagnosticOrders.length > 0) {\r
                      <p class="rx-history-items">\r
                        <strong>Estudios:</strong> {{ rec.diagnosticOrders.join(' \xB7 ') }}\r
                      </p>\r
                    }\r
                    @if (rec.diagnosisDescription) {\r
                      <span class="rx-history-diag"\r
                        >Diagn\xF3stico: {{ rec.diagnosisDescription }}</span\r
                      >\r
                    }\r
                  </div>\r
\r
                  <div class="rx-history-actions">\r
                    @if (editor.recordActions.has('PRINT_DOCUMENT')) {\r
                      <button\r
                        type="button"\r
                        class="secondary-outline-btn btn-xs"\r
                        [disabled]="editor.rxBusy()"\r
                        (click)="editor.reprintSavedRecord(rec)"\r
                        title="Reimprimir documento"\r
                      >\r
                        <ng-icon name="lucidePrinter" />\r
                        <span>Imprimir</span>\r
                      </button>\r
                    }\r
                    <button\r
                      type="button"\r
                      class="rx-btn-remove"\r
                      [disabled]="editor.rxBusy()"\r
                      (click)="editor.deleteSavedRecord(rec.id)"\r
                      title="Eliminar registro"\r
                      aria-label="Eliminar registro"\r
                    >\r
                      <ng-icon name="lucideTrash2" />\r
                    </button>\r
                  </div>\r
                </li>\r
              }\r
            </ul>\r
          } @else {\r
            <p class="text-xs text-slate-500 py-3">\r
              Todav\xEDa no se registraron recetas ni \xF3rdenes de estudios para este paciente. Complet\xE1\r
              el formulario superior para emitir e imprimir la primera.\r
            </p>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
  </section>\r
}\r
`, styles: ["/* src/app/features/patient-record/patient-prescriptions/patient-prescriptions.component.css */\n:host {\n  display: block;\n  min-width: 0;\n}\n.cta-primary-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  background-color: #006874;\n  color: #ffffff;\n  border: none;\n  border-radius: 9px;\n  padding: 0.55rem 1rem;\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(0, 104, 116, 0.25);\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.cta-primary-btn:hover {\n  background-color: #00505a;\n}\n.cta-primary-btn.btn-sm {\n  padding: 0.4rem 0.8rem;\n  font-size: 0.8rem;\n}\n.tab-panel {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n.panel-grid-cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: 1.25rem;\n}\n.clinical-section-card {\n  background: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 12px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);\n  overflow: hidden;\n}\n.sec-card-header {\n  padding: 0.95rem 1.25rem;\n  border-bottom: 1px solid var(--dc-outline, #f1f5f9);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.sec-card-title {\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--dc-ink, #0f172a);\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  margin: 0;\n}\n.sec-card-body {\n  padding: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.65rem;\n}\n.sec-subdivider {\n  height: 1px;\n  background: var(--dc-surface-high, #f1f5f9);\n  margin: 0.5rem 0;\n}\n.secondary-outline-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  background: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  color: var(--dc-ink-secondary, #334155);\n  border-radius: 8px;\n  padding: 0.45rem 0.85rem;\n  font-size: 0.82rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.secondary-outline-btn:hover {\n  background: var(--dc-surface-low, #f8fafc);\n  color: var(--dc-ink, #0f172a);\n}\n.med-prescriptions-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.med-prescription-card {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 8px;\n  background: var(--dc-surface-low, #fbfcfd);\n}\n.med-details {\n  display: flex;\n  flex-direction: column;\n}\n.med-name {\n  font-size: 0.88rem;\n  color: var(--dc-ink, #0f172a);\n}\n.med-instructions {\n  font-size: 0.75rem;\n  color: var(--dc-ink-muted, #64748b);\n}\n.med-prescription-card.justify-between {\n  justify-content: space-between;\n}\n.btn-xs {\n  padding: 0.35rem 0.65rem;\n  font-size: 0.75rem;\n  border-radius: 6px;\n}\n.rx-builder-card {\n  border-color: var(--dc-outline, #cbd5e1);\n  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);\n}\n.rx-card-header {\n  background:\n    linear-gradient(\n      180deg,\n      var(--dc-surface-low, #f8fafc) 0%,\n      var(--dc-surface, #ffffff) 100%);\n  padding: 1.1rem 1.35rem;\n  flex-wrap: wrap;\n}\n.rx-header-title-group,\n.rx-header-actions,\n.rx-feedback-banner,\n.rx-item-title-row,\n.rx-bottom-right-btns,\n.rx-history-top,\n.rx-history-actions {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.rx-header-title-group {\n  gap: 0.85rem;\n}\n.rx-header-icon-badge {\n  width: 40px;\n  height: 40px;\n  border-radius: 10px;\n  background: var(--dc-teal-surface, #e6f6f8);\n  color: var(--dc-teal-ink, #006874);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.25rem;\n  flex-shrink: 0;\n}\n.rx-header-subtitle,\n.rx-history-date,\n.rx-history-diag {\n  margin: 0.15rem 0 0;\n  font-size: 0.76rem;\n  color: var(--dc-ink-muted, #64748b);\n}\n.rx-builder-body {\n  padding: 1.35rem;\n  gap: 1.1rem;\n}\n.rx-mode-selector {\n  display: inline-flex;\n  align-items: center;\n  background: var(--dc-surface-high, #f1f5f9);\n  padding: 0.3rem;\n  border-radius: 10px;\n  gap: 0.3rem;\n  align-self: flex-start;\n  border: 1px solid var(--dc-outline, #e2e8f0);\n}\n.rx-mode-tab {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.55rem 1.15rem;\n  border-radius: 8px;\n  border: none;\n  background: transparent;\n  color: var(--dc-ink-secondary, #475569);\n  font-size: 0.84rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.rx-mode-tab:hover {\n  color: var(--dc-ink, #0f172a);\n}\n.rx-mode-tab.active {\n  background: var(--dc-surface, #ffffff);\n  color: var(--dc-teal-ink, #006874);\n  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.08);\n}\n.rx-mode-count {\n  background: #006874;\n  color: #ffffff;\n  font-size: 0.7rem;\n  font-weight: 700;\n  padding: 1px 6px;\n  border-radius: 9999px;\n}\n.rx-feedback-banner {\n  padding: 0.65rem 1rem;\n  border-radius: 8px;\n  font-size: 0.82rem;\n  font-weight: 500;\n}\n.rx-feedback-banner.rx-error {\n  background: var(--dc-error-surface, #fff1f2);\n  border: 1px solid #fecdd3;\n  color: var(--dc-error-ink, #be123c);\n}\n.rx-feedback-banner.rx-success {\n  background: var(--dc-success-surface, #f0fdf4);\n  border: 1px solid #bbf7d0;\n  color: var(--dc-success-ink, #15803d);\n}\n.rx-form-section,\n.rx-field,\n.rx-quick-studies-bar,\n.rx-draft-items-box,\n.rx-draft-list,\n.rx-history-list,\n.rx-history-info {\n  display: flex;\n  flex-direction: column;\n}\n.rx-form-section {\n  gap: 1rem;\n}\n.rx-form-grid-med {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 0.9rem 1rem;\n}\n.rx-field-wide {\n  grid-column: span 2;\n}\n.rx-form-grid-study,\n.rx-form-grid-footer {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.9rem 1rem;\n}\n@media (max-width: 768px) {\n  .rx-form-grid-med,\n  .rx-form-grid-study,\n  .rx-form-grid-footer {\n    grid-template-columns: 1fr;\n  }\n  .rx-field-wide {\n    grid-column: span 1;\n  }\n}\n.rx-field {\n  gap: 0.35rem;\n}\n.rx-label {\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: var(--dc-ink-secondary, #334155);\n}\n.rx-input {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 0.58rem 0.85rem;\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  border-radius: 8px;\n  font-size: 0.85rem;\n  color: var(--dc-ink, #0f172a);\n  background: var(--dc-surface, #ffffff);\n  transition: border-color 0.15s ease, box-shadow 0.15s ease;\n}\n.rx-input:focus {\n  outline: none;\n  border-color: #006874;\n  box-shadow: 0 0 0 3px rgba(0, 104, 116, 0.12);\n}\n.rx-quick-studies-bar,\n.rx-draft-items-box {\n  gap: 0.5rem;\n  background: var(--dc-surface-low, #f8fafc);\n  padding: 0.85rem 1rem;\n  border-radius: 10px;\n  border: 1px solid var(--dc-outline, #e2e8f0);\n}\n.rx-quick-label,\n.rx-draft-box-title {\n  font-size: 0.74rem;\n  font-weight: 700;\n  color: var(--dc-ink-secondary, #475569);\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.rx-quick-chips {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n}\n.rx-quick-chip {\n  background: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  color: var(--dc-ink, #0f172a);\n  font-size: 0.76rem;\n  font-weight: 500;\n  padding: 0.35rem 0.75rem;\n  border-radius: 9999px;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.rx-quick-chip:hover {\n  background: var(--dc-teal-surface, #e6f6f8);\n  border-color: #006874;\n  color: var(--dc-teal-ink, #006874);\n}\n.rx-add-row {\n  display: flex;\n}\n.rx-btn-add-item {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  background: var(--dc-teal-surface, #f0fdfa);\n  border: 1px dashed #0d9488;\n  color: var(--dc-teal-ink, #0f766e);\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.82rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.rx-btn-add-item:hover {\n  background: var(--dc-teal-surface, #ccfbf1);\n  border-style: solid;\n}\n.rx-draft-list,\n.rx-history-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  gap: 0.5rem;\n}\n.rx-draft-item,\n.rx-history-card {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  background: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 8px;\n  padding: 0.65rem 0.9rem;\n}\n.rx-draft-item-main {\n  display: flex;\n  align-items: baseline;\n  gap: 0.6rem;\n}\n.rx-item-index {\n  font-weight: 700;\n  color: var(--dc-teal-ink, #006874);\n  font-size: 0.85rem;\n}\n.rx-item-title-row {\n  flex-wrap: wrap;\n}\n.rx-item-name,\n.rx-history-items {\n  margin: 0;\n  font-size: 0.85rem;\n  color: var(--dc-ink, #0f172a);\n}\n.rx-item-badge,\n.rx-item-route,\n.rx-history-type-badge {\n  font-size: 0.72rem;\n  font-weight: 600;\n  background: var(--dc-teal-surface, #e6f6f8);\n  color: var(--dc-teal-ink, #006874);\n  padding: 1px 7px;\n  border-radius: 5px;\n}\n.rx-item-route {\n  color: var(--dc-ink-muted, #64748b);\n  background: var(--dc-surface-high, #f1f5f9);\n}\n.rx-item-sub {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  font-size: 0.76rem;\n  color: var(--dc-ink-muted, #64748b);\n  margin-top: 0.15rem;\n}\n.rx-btn-remove {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  color: var(--dc-error-ink, #ef4444);\n  padding: 0.35rem;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.rx-btn-remove:hover {\n  background: var(--dc-error-surface, #fee2e2);\n}\n.rx-bottom-actions {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  padding-top: 0.5rem;\n  border-top: 1px solid var(--dc-outline, #f1f5f9);\n}\n.rx-bottom-right-btns {\n  gap: 0.65rem;\n  flex-wrap: wrap;\n}\n.rx-history-info {\n  gap: 0.2rem;\n}\n.rx-history-type-badge {\n  text-transform: uppercase;\n}\n.rx-history-type-badge.study {\n  background: var(--dc-blue-surface, #eff6ff);\n  color: var(--dc-blue-ink, #1d4ed8);\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n}\n.animate-fade-in {\n  animation: fadeIn 0.15s ease-in-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(3px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media print {\n  .cta-primary-btn {\n    display: none !important;\n  }\n  .clinical-section-card {\n    box-shadow: none !important;\n    border: 1px solid #000000 !important;\n  }\n}\n.field-error {\n  display: block;\n  margin-top: 6px;\n  color: #b91c1c;\n  font-size: .8rem;\n}\n/*# sourceMappingURL=patient-prescriptions.component.css.map */\n"] }]
  }], null, { latestEncounter: [{ type: Input, args: [{ isSignal: true, alias: "latestEncounter", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PatientPrescriptionsComponent, { className: "PatientPrescriptionsComponent", filePath: "src/app/features/patient-record/patient-prescriptions/patient-prescriptions.component.ts", lineNumber: 34 });
})();

// src/app/core/services/patient-vaccination.service.ts
var PatientVaccinationService = class _PatientVaccinationService {
  http = inject(HttpClient);
  base = environment.apiUrl + "/patients";
  schedule(patientId) {
    return this.http.get(this.base + "/" + patientId + "/vaccinations");
  }
  save(patientId, doseId, request) {
    return this.http.put(this.base + "/" + patientId + "/vaccinations/" + encodeURIComponent(doseId), request);
  }
  static \u0275fac = function PatientVaccinationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientVaccinationService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PatientVaccinationService, factory: _PatientVaccinationService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientVaccinationService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/features/patient-record/patient-vaccinations/patient-vaccinations.component.ts
var _forTrack07 = ($index, $item) => $item.id;
function PatientVaccinationsComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 4);
    \u0275\u0275text(1, "Guardando\u2026");
    \u0275\u0275elementEnd();
  }
}
function PatientVaccinationsComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function PatientVaccinationsComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function PatientVaccinationsComponent_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.refresh());
    });
    \u0275\u0275text(1, "Actualizar y reintentar");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.isSaving() || ctx_r1.isLoading());
  }
}
function PatientVaccinationsComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "Cargando calendario de vacunaci\xF3n\u2026");
    \u0275\u0275elementEnd();
  }
}
function PatientVaccinationsComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function PatientVaccinationsComponent_Conditional_17_Conditional_10_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 29)(1, "div", 30)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "label", 31)(7, "input", 32);
    \u0275\u0275listener("change", function PatientVaccinationsComponent_Conditional_17_Conditional_10_For_1_Template_input_change_7_listener($event) {
      const dose_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleApplied(dose_r4, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Aplicada");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const dose_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(dose_r4.vaccineName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", dose_r4.doseLabel, " \xB7 correspond\xEDa a los ", dose_r4.dueAgeLabel);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", false)("disabled", !ctx_r1.canSave());
  }
}
function PatientVaccinationsComponent_Conditional_17_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, PatientVaccinationsComponent_Conditional_17_Conditional_10_For_1_Template, 9, 5, "article", 29, _forTrack07);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r1.overdueDoses());
  }
}
function PatientVaccinationsComponent_Conditional_17_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "No hay dosis vencidas sin registrar.");
    \u0275\u0275elementEnd();
  }
}
function PatientVaccinationsComponent_Conditional_17_Conditional_15_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 33)(1, "div", 30)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "label", 31)(7, "input", 32);
    \u0275\u0275listener("change", function PatientVaccinationsComponent_Conditional_17_Conditional_15_For_1_Template_input_change_7_listener($event) {
      const dose_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleApplied(dose_r6, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Aplicada");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const dose_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(dose_r6.vaccineName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(dose_r6.doseLabel);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", false)("disabled", !ctx_r1.canSave());
  }
}
function PatientVaccinationsComponent_Conditional_17_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, PatientVaccinationsComponent_Conditional_17_Conditional_15_For_1_Template, 9, 4, "article", 33, _forTrack07);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r1.currentDoses());
  }
}
function PatientVaccinationsComponent_Conditional_17_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "No hay dosis previstas para este momento.");
    \u0275\u0275elementEnd();
  }
}
function PatientVaccinationsComponent_Conditional_17_Conditional_20_For_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function PatientVaccinationsComponent_Conditional_17_Conditional_20_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 34)(1, "div", 30)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "label", 35);
    \u0275\u0275text(7, "Fecha ");
    \u0275\u0275elementStart(8, "app-date-picker", 36, 0);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function PatientVaccinationsComponent_Conditional_17_Conditional_20_For_1_Template_app_date_picker_ngModelChange_8_listener($event) {
      const dose_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const datePicker_r9 = \u0275\u0275reference(9);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.updateDate(dose_r8, $event, datePicker_r9));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, PatientVaccinationsComponent_Conditional_17_Conditional_20_For_1_Conditional_10_Template, 2, 1, "span", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "label", 31)(12, "input", 32);
    \u0275\u0275listener("change", function PatientVaccinationsComponent_Conditional_17_Conditional_20_For_1_Template_input_change_12_listener($event) {
      const dose_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleApplied(dose_r8, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " Aplicada");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_20_0;
    const dose_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(dose_r8.vaccineName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(dose_r8.doseLabel);
    \u0275\u0275advance(3);
    \u0275\u0275property("showError", false)("ngModel", dose_r8.appliedAt)("disabled", !ctx_r1.canSave())("max", ctx_r1.schedule()?.asOfDate);
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_20_0 = ctx_r1.dateErrors()[dose_r8.id]) ? 10 : -1, tmp_20_0);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", true)("disabled", !ctx_r1.canSave());
  }
}
function PatientVaccinationsComponent_Conditional_17_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, PatientVaccinationsComponent_Conditional_17_Conditional_20_For_1_Template, 14, 9, "article", 34, _forTrack07);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r1.appliedDoses());
  }
}
function PatientVaccinationsComponent_Conditional_17_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "Todav\xEDa no se registraron aplicaciones detalladas.");
    \u0275\u0275elementEnd();
  }
}
function PatientVaccinationsComponent_Conditional_17_For_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 28)(1, "div", 30)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 38)(5, "span", 39);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 40);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 41);
    \u0275\u0275element(9, "circle", 42)(10, "polyline", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(13, "div", 44)(14, "span");
    \u0275\u0275text(15, "Programada");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const dose_r10 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(dose_r10.vaccineName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(dose_r10.doseLabel);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Edad prevista: ", dose_r10.dueAgeLabel);
  }
}
function PatientVaccinationsComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "span", 10);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 11);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 12);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "section", 13)(8, "h4", 14);
    \u0275\u0275text(9, "Pendientes");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, PatientVaccinationsComponent_Conditional_17_Conditional_10_Template, 2, 0)(11, PatientVaccinationsComponent_Conditional_17_Conditional_11_Template, 2, 0, "p", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "section", 15)(13, "h4", 16);
    \u0275\u0275text(14, "Corresponden ahora");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, PatientVaccinationsComponent_Conditional_17_Conditional_15_Template, 2, 0)(16, PatientVaccinationsComponent_Conditional_17_Conditional_16_Template, 2, 0, "p", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "section", 17)(18, "h4", 18);
    \u0275\u0275text(19, "Registradas como aplicadas");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(20, PatientVaccinationsComponent_Conditional_17_Conditional_20_Template, 2, 0)(21, PatientVaccinationsComponent_Conditional_17_Conditional_21_Template, 2, 0, "p", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "details", 19)(23, "summary", 20)(24, "div", 21);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(25, "svg", 22);
    \u0275\u0275element(26, "path", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(27, "span", 24);
    \u0275\u0275text(28, "Pr\xF3ximas vacunas (orden cronol\xF3gico)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 25);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "span", 26);
    \u0275\u0275text(32, "Click para ver dosis futuras");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 27);
    \u0275\u0275repeaterCreate(34, PatientVaccinationsComponent_Conditional_17_For_35_Template, 16, 3, "article", 28, _forTrack07);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.overdueDoses().length, " pendientes");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.currentDoses().length, " para revisar hoy");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.appliedDoses().length, " aplicadas");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.overdueDoses().length ? 10 : 11);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.currentDoses().length ? 15 : 16);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.appliedDoses().length ? 20 : 21);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.futureDoses().length);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.futureDoses());
  }
}
var PatientVaccinationsComponent = class _PatientVaccinationsComponent {
  api = inject(PatientVaccinationService);
  patients = inject(PatientService);
  auth = inject(AuthService);
  destroyRef = inject(DestroyRef);
  changed = new Subject();
  context = "";
  epoch = 0;
  patient = input.required(
    ...ngDevMode ? [{ debugName: "patient" }] : (
      /* istanbul ignore next */
      []
    )
  );
  patientUpdated = output();
  schedule = signal(
    null,
    ...ngDevMode ? [{ debugName: "schedule" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSaving = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSaving" }] : (
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
  saveError = signal(
    null,
    ...ngDevMode ? [{ debugName: "saveError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dateErrors = signal(
    {},
    ...ngDevMode ? [{ debugName: "dateErrors" }] : (
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
  ageLabel = computed(
    () => this.schedule()?.ageLabel ?? "\u2014",
    ...ngDevMode ? [{ debugName: "ageLabel" }] : (
      /* istanbul ignore next */
      []
    )
  );
  doses = computed(
    () => this.schedule()?.doses ?? [],
    ...ngDevMode ? [{ debugName: "doses" }] : (
      /* istanbul ignore next */
      []
    )
  );
  overdueDoses = computed(
    () => this.doses().filter((d) => d.status === "PENDIENTE"),
    ...ngDevMode ? [{ debugName: "overdueDoses" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentDoses = computed(
    () => this.doses().filter((d) => d.status === "ACTUAL"),
    ...ngDevMode ? [{ debugName: "currentDoses" }] : (
      /* istanbul ignore next */
      []
    )
  );
  futureDoses = computed(
    () => this.doses().filter((d) => d.status === "FUTURA"),
    ...ngDevMode ? [{ debugName: "futureDoses" }] : (
      /* istanbul ignore next */
      []
    )
  );
  appliedDoses = computed(
    () => this.doses().filter((d) => d.status === "APLICADA"),
    ...ngDevMode ? [{ debugName: "appliedDoses" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canSave = computed(
    () => !this.isSaving() && !this.isLoading() && this.schedule()?.patientVersion === this.patient().version,
    ...ngDevMode ? [{ debugName: "canSave" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      this.patient();
      this.auth.currentUser();
      untracked(() => this.syncContext());
    });
    this.destroyRef.onDestroy(() => {
      this.epoch++;
      this.changed.next();
      this.changed.complete();
    });
  }
  contextKey() {
    return JSON.stringify([
      this.auth.currentUser()?.id ?? null,
      this.patient().id,
      this.patient().version
    ]);
  }
  syncContext() {
    const key = this.contextKey();
    if (key === this.context)
      return;
    const keepConfirmed = !!this.auth.currentUser()?.id && this.context !== "" && this.schedule()?.patientId === this.patient().id && this.schedule()?.patientVersion === this.patient().version && JSON.parse(this.context)[0] === this.auth.currentUser()?.id;
    this.changed.next();
    this.epoch++;
    this.dateErrors.set({});
    this.context = key;
    this.isSaving.set(false);
    this.isLoading.set(false);
    this.saveError.set(null);
    this.loadError.set(null);
    if (!keepConfirmed) {
      this.schedule.set(null);
      if (this.auth.currentUser()?.id)
        this.loadSchedule();
    }
  }
  current(key, epoch) {
    return !this.destroyRef.destroyed && key === this.contextKey() && epoch === this.epoch;
  }
  loadSchedule() {
    const patient = this.patient(), key = this.context, epoch = this.epoch;
    this.isLoading.set(true);
    this.loadError.set(null);
    this.api.schedule(patient.id).pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (schedule) => {
        if (!this.current(key, epoch))
          return;
        this.isLoading.set(false);
        if (schedule.patientId !== patient.id) {
          this.loadError.set("La respuesta recibida no corresponde a este paciente.");
          return;
        }
        this.schedule.set(schedule);
        if (schedule.patientVersion !== patient.version)
          this.loadError.set("La ficha cambi\xF3. Actualizala antes de registrar vacunas.");
      },
      error: () => {
        if (this.current(key, epoch)) {
          this.isLoading.set(false);
          this.loadError.set("No se pudo cargar el calendario del paciente.");
        }
      }
    });
  }
  refresh() {
    this.syncContext();
    if (this.isSaving() || this.isLoading() || !this.auth.currentUser()?.id)
      return;
    const key = this.context, epoch = this.epoch, id = this.patient().id;
    this.isLoading.set(true);
    this.loadError.set(null);
    this.patients.getPatientById(id).pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (patient) => {
        if (!this.current(key, epoch))
          return;
        this.isLoading.set(false);
        if (patient.id !== id) {
          this.loadError.set("La respuesta recibida no corresponde a este paciente.");
          return;
        }
        this.saveError.set(null);
        this.patientUpdated.emit(patient);
        if (patient.version === this.patient().version)
          this.loadSchedule();
      },
      error: () => {
        if (this.current(key, epoch)) {
          this.isLoading.set(false);
          this.loadError.set("No se pudo actualizar la ficha del paciente.");
        }
      }
    });
  }
  toggleApplied(dose, event) {
    const target = event.target, applied = target.checked;
    target.checked = dose.status === "APLICADA";
    this.markApplied(dose, applied);
  }
  markApplied(dose, applied) {
    this.persist(dose, applied);
  }
  updateDate(dose, appliedAt, picker) {
    const maximum = this.schedule()?.asOfDate;
    const error = !validIsoDate(appliedAt) ? "Ingres\xE1 una fecha v\xE1lida con formato dd/MM/aaaa." : maximum && appliedAt > maximum ? "La fecha de aplicaci\xF3n no puede ser futura." : this.patient().birthDate && appliedAt < this.patient().birthDate ? "La fecha no puede ser anterior al nacimiento." : null;
    this.dateErrors.update((errors) => __spreadProps(__spreadValues({}, errors), { [dose.id]: error }));
    if (error)
      return;
    if (appliedAt === dose.appliedAt) {
      picker?.writeValue(dose.appliedAt);
      return;
    }
    picker?.writeValue(dose.appliedAt);
    if (dose.status === "APLICADA")
      this.persist(dose, true, appliedAt);
  }
  persist(dose, applied, appliedAt) {
    this.syncContext();
    const schedule = this.schedule();
    if (!this.auth.currentUser()?.id || !this.canSave() || !schedule || !this.doses().some((d) => d.id === dose.id))
      return;
    const key = this.context, epoch = this.epoch, id = this.patient().id;
    this.isSaving.set(true);
    this.saveError.set(null);
    this.api.save(id, dose.id, __spreadValues({
      expectedVersion: schedule.patientVersion,
      calendarId: dose.calendarId,
      applied
    }, appliedAt !== void 0 ? { appliedAt } : {})).pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (saved) => {
        if (!this.current(key, epoch))
          return;
        this.isSaving.set(false);
        if (saved.patient.id !== id || saved.schedule.patientId !== id || saved.schedule.patientVersion !== saved.patient.version) {
          this.saveError.set("La respuesta recibida no corresponde a este paciente.");
          return;
        }
        this.schedule.set(saved.schedule);
        this.patientUpdated.emit(saved.patient);
      },
      error: (error) => {
        if (!this.current(key, epoch))
          return;
        this.isSaving.set(false);
        this.saveError.set(error.status === 409 ? "La ficha o el calendario cambiaron. Actualiz\xE1 antes de volver a guardar." : error.error?.message ?? "No se pudo guardar la aplicaci\xF3n de la vacuna.");
      }
    });
  }
  statusLabel(status) {
    return {
      APLICADA: "Aplicada",
      PENDIENTE: "Pendiente",
      ACTUAL: "Corresponde ahora",
      FUTURA: "Futura"
    }[status];
  }
  static \u0275fac = function PatientVaccinationsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientVaccinationsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PatientVaccinationsComponent, selectors: [["app-patient-vaccinations"]], inputs: { patient: [1, "patient"] }, outputs: { patientUpdated: "patientUpdated" }, decls: 18, vars: 6, consts: [["datePicker", ""], ["aria-label", "Vacunas del paciente", 1, "vaccines-panel"], [1, "vaccines-header"], [1, "eyebrow"], [1, "saving"], ["role", "alert", 1, "save-error"], ["type", "button", 3, "disabled"], [1, "empty-state"], ["type", "button", 3, "click", "disabled"], [1, "vaccines-summary"], [1, "summary", "pending"], [1, "summary", "current"], [1, "summary", "applied"], ["aria-labelledby", "pending-title", 1, "dose-group"], ["id", "pending-title"], ["aria-labelledby", "current-title", 1, "dose-group"], ["id", "current-title"], ["aria-labelledby", "applied-title", 1, "dose-group"], ["id", "applied-title"], [1, "future-doses"], [1, "future-doses-summary"], [1, "future-summary-left"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true", 1, "chevron-icon"], ["d", "M6 9l6 6 6-6"], [1, "future-title"], [1, "future-count-badge"], [1, "future-hint"], [1, "future-doses-content"], [1, "dose-card", "future-card"], [1, "dose-card", "pending-card"], [1, "dose-copy"], [1, "apply-control"], ["type", "checkbox", 3, "change", "checked", "disabled"], [1, "dose-card", "current-card"], [1, "dose-card", "applied-card"], [1, "date-control"], [3, "ngModelChange", "showError", "ngModel", "disabled", "max"], ["role", "alert", 1, "field-error"], [1, "dose-meta"], [1, "dose-label-chip"], [1, "dose-age-pill"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true"], ["cx", "12", "cy", "12", "r", "10"], ["points", "12 6 12 12 16 14"], [1, "future-badge-tag"]], template: function PatientVaccinationsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 1)(1, "header", 2)(2, "div")(3, "p", 3);
      \u0275\u0275text(4, "Calendario Nacional de Vacunaci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h3");
      \u0275\u0275text(6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p");
      \u0275\u0275text(8, "Edad al d\xEDa de hoy: ");
      \u0275\u0275elementStart(9, "strong");
      \u0275\u0275text(10);
      \u0275\u0275elementEnd();
      \u0275\u0275text(11, ". El estado se calcula a partir del calendario oficial.");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(12, PatientVaccinationsComponent_Conditional_12_Template, 2, 0, "span", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(13, PatientVaccinationsComponent_Conditional_13_Template, 2, 1, "p", 5);
      \u0275\u0275conditionalCreate(14, PatientVaccinationsComponent_Conditional_14_Template, 2, 1, "button", 6);
      \u0275\u0275conditionalCreate(15, PatientVaccinationsComponent_Conditional_15_Template, 2, 0, "p", 7)(16, PatientVaccinationsComponent_Conditional_16_Template, 2, 1, "p", 5)(17, PatientVaccinationsComponent_Conditional_17_Template, 36, 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_3_0;
      let tmp_5_0;
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("Vacunas de ", ctx.patient().fullName);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.ageLabel());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isSaving() ? 12 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_3_0 = ctx.saveError()) ? 13 : -1, tmp_3_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.saveError() || ctx.loadError() ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 15 : (tmp_5_0 = ctx.loadError()) ? 16 : 17, tmp_5_0);
    }
  }, dependencies: [FormsModule, NgControlStatus, NgModel, DatePickerComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n.vaccines-panel[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface, #fff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 16px;\n  padding: 24px;\n}\n.vaccines-header[_ngcontent-%COMP%] {\n  align-items: flex-start;\n  display: flex;\n  gap: 16px;\n  justify-content: space-between;\n}\n.vaccines-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink, #0f172a);\n  font-size: 1.1rem;\n  margin: 2px 0 5px;\n}\n.vaccines-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink-muted, #64748b);\n  font-size: 0.85rem;\n  margin: 0;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-blue-ink, #0284c7) !important;\n  font-size: 0.72rem !important;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.saving[_ngcontent-%COMP%], \n.summary[_ngcontent-%COMP%] {\n  border-radius: 999px;\n  font-size: 0.78rem;\n  font-weight: 600;\n  padding: 5px 10px;\n  white-space: nowrap;\n}\n.saving[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-blue-surface, #e0f2fe);\n  color: var(--%NS%dc-blue-ink, #0369a1);\n}\n.vaccines-summary[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin: 20px 0;\n}\n.pending[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-error-surface, #fee2e2);\n  color: var(--%NS%dc-error-ink, #991b1b);\n}\n.current[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-warning-surface, #fef3c7);\n  color: var(--%NS%dc-warning-ink, #92400e);\n}\n.applied[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-success-surface, #dcfce7);\n  color: var(--%NS%dc-success-ink, #166534);\n}\n.dose-group[_ngcontent-%COMP%] {\n  margin-top: 22px;\n}\n.dose-group[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink-secondary, #334155);\n  font-size: 0.9rem;\n  margin: 0 0 9px;\n}\n.dose-card[_ngcontent-%COMP%] {\n  align-items: center;\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-left: 4px solid #94a3b8;\n  border-radius: 10px;\n  display: flex;\n  gap: 14px;\n  justify-content: space-between;\n  margin-bottom: 8px;\n  padding: 11px 12px;\n}\n.pending-card[_ngcontent-%COMP%] {\n  border-left-color: #ef4444;\n}\n.current-card[_ngcontent-%COMP%] {\n  border-left-color: #f59e0b;\n}\n.applied-card[_ngcontent-%COMP%] {\n  border-left-color: #22c55e;\n}\n.future-card[_ngcontent-%COMP%] {\n  border-left-color: #0284c7;\n  background: var(--%NS%dc-surface-low, #fcfdfe);\n}\n.dose-copy[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 2px;\n}\n.dose-copy[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink, #1e293b);\n  font-size: 0.86rem;\n}\n.dose-copy[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.empty-state[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink-muted, #64748b);\n  font-size: 0.8rem;\n}\n.apply-control[_ngcontent-%COMP%], \n.date-control[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink-secondary, #334155);\n  font-size: 0.8rem;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.date-control[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 6px;\n  margin-left: 5px;\n  padding: 4px;\n}\n.save-error[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-error-surface, #fef2f2);\n  border: 1px solid #fecaca;\n  border-radius: 8px;\n  color: var(--%NS%dc-error-ink, #b91c1c);\n  font-size: 0.82rem;\n  padding: 9px 12px;\n}\n.future-doses[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 12px;\n  overflow: hidden;\n  background: var(--%NS%dc-surface, #ffffff);\n}\n.future-doses-summary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 16px;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  cursor: pointer;\n  list-style: none;\n  font-weight: 600;\n  color: var(--%NS%dc-ink-secondary, #334155);\n  -webkit-user-select: none;\n  user-select: none;\n  transition: background-color 0.15s ease;\n}\n.future-doses-summary[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n}\n.future-doses-summary[_ngcontent-%COMP%]::-webkit-details-marker {\n  display: none;\n}\n.future-summary-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.chevron-icon[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  transition: transform 0.2s ease;\n  flex-shrink: 0;\n}\n.future-doses[open][_ngcontent-%COMP%]   .chevron-icon[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n.future-title[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #1e293b);\n}\n.future-count-badge[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-blue-surface, #e0f2fe);\n  color: var(--%NS%dc-blue-ink, #0369a1);\n  font-size: 0.75rem;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 9999px;\n}\n.future-hint[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--%NS%dc-ink-muted, #94a3b8);\n  font-weight: 500;\n}\n.future-doses-content[_ngcontent-%COMP%] {\n  padding: 14px;\n  background: var(--%NS%dc-surface, #ffffff);\n  border-top: 1px solid var(--%NS%dc-outline, #f1f5f9);\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.dose-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-top: 4px;\n}\n.dose-label-chip[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--%NS%dc-ink-secondary, #475569);\n  font-weight: 600;\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n  padding: 2px 8px;\n  border-radius: 6px;\n}\n.dose-age-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.78rem;\n  color: var(--%NS%dc-blue-ink, #0369a1);\n  background: var(--%NS%dc-blue-surface, #f0f9ff);\n  border: 1px solid #e0f2fe;\n  padding: 2px 8px;\n  border-radius: 6px;\n}\n.future-badge-tag[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  padding: 3px 10px;\n  border-radius: 9999px;\n  white-space: nowrap;\n}\n@media (max-width: 640px) {\n  .vaccines-panel[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .dose-card[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .vaccines-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .future-doses-summary[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 8px;\n  }\n  .future-hint[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.field-error[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 6px;\n  color: var(--%NS%dc-error-ink, #b91c1c);\n  font-size: .8rem;\n}\n/*# sourceMappingURL=patient-vaccinations.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientVaccinationsComponent, [{
    type: Component,
    args: [{ selector: "app-patient-vaccinations", imports: [FormsModule, DatePickerComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: '<section class="vaccines-panel" aria-label="Vacunas del paciente">\r\n  <header class="vaccines-header">\r\n    <div>\r\n      <p class="eyebrow">Calendario Nacional de Vacunaci\xF3n</p>\r\n      <h3>Vacunas de {{ patient().fullName }}</h3>\r\n      <p>Edad al d\xEDa de hoy: <strong>{{ ageLabel() }}</strong>. El estado se calcula a partir del calendario oficial.</p>\r\n    </div>\r\n    @if (isSaving()) { <span class="saving">Guardando\u2026</span> }\r\n  </header>\r\n\r\n  @if (saveError(); as error) { <p class="save-error" role="alert">{{ error }}</p> }\r\n  @if (saveError() || loadError()) { <button type="button" [disabled]="isSaving() || isLoading()" (click)="refresh()">Actualizar y reintentar</button> }\r\n\r\n  @if (isLoading()) {\r\n    <p class="empty-state">Cargando calendario de vacunaci\xF3n\u2026</p>\r\n  } @else if (loadError(); as error) {\r\n    <p class="save-error" role="alert">{{ error }}</p>\r\n  } @else {\r\n    <div class="vaccines-summary">\r\n      <span class="summary pending">{{ overdueDoses().length }} pendientes</span>\r\n      <span class="summary current">{{ currentDoses().length }} para revisar hoy</span>\r\n      <span class="summary applied">{{ appliedDoses().length }} aplicadas</span>\r\n    </div>\r\n\r\n    <section class="dose-group" aria-labelledby="pending-title">\r\n      <h4 id="pending-title">Pendientes</h4>\r\n      @if (overdueDoses().length) {\r\n        @for (dose of overdueDoses(); track dose.id) {\r\n          <article class="dose-card pending-card">\r\n            <div class="dose-copy"><strong>{{ dose.vaccineName }}</strong><span>{{ dose.doseLabel }} \xB7 correspond\xEDa a los {{ dose.dueAgeLabel }}</span></div>\r\n            <label class="apply-control"><input type="checkbox" [checked]="false" [disabled]="!canSave()" (change)="toggleApplied(dose, $event)" /> Aplicada</label>\r\n          </article>\r\n        }\r\n      } @else { <p class="empty-state">No hay dosis vencidas sin registrar.</p> }\r\n    </section>\r\n\r\n    <section class="dose-group" aria-labelledby="current-title">\r\n      <h4 id="current-title">Corresponden ahora</h4>\r\n      @if (currentDoses().length) {\r\n        @for (dose of currentDoses(); track dose.id) {\r\n          <article class="dose-card current-card">\r\n            <div class="dose-copy"><strong>{{ dose.vaccineName }}</strong><span>{{ dose.doseLabel }}</span></div>\r\n            <label class="apply-control"><input type="checkbox" [checked]="false" [disabled]="!canSave()" (change)="toggleApplied(dose, $event)" /> Aplicada</label>\r\n          </article>\r\n        }\r\n      } @else { <p class="empty-state">No hay dosis previstas para este momento.</p> }\r\n    </section>\r\n\r\n    <section class="dose-group" aria-labelledby="applied-title">\r\n      <h4 id="applied-title">Registradas como aplicadas</h4>\r\n      @if (appliedDoses().length) {\r\n        @for (dose of appliedDoses(); track dose.id) {\r\n          <article class="dose-card applied-card">\r\n            <div class="dose-copy"><strong>{{ dose.vaccineName }}</strong><span>{{ dose.doseLabel }}</span></div>\r\n            <label class="date-control">Fecha <app-date-picker [showError]="false" #datePicker [ngModel]="dose.appliedAt" (ngModelChange)="updateDate(dose, $event, datePicker)" [disabled]="!canSave()" [max]="schedule()?.asOfDate" />@if (dateErrors()[dose.id]; as error) { <span class="field-error" role="alert">{{ error }}</span> }</label>\r\n            <label class="apply-control"><input type="checkbox" [checked]="true" [disabled]="!canSave()" (change)="toggleApplied(dose, $event)" /> Aplicada</label>\r\n          </article>\r\n        }\r\n      } @else { <p class="empty-state">Todav\xEDa no se registraron aplicaciones detalladas.</p> }\r\n    </section>\r\n\r\n    <details class="future-doses">\r\n      <summary class="future-doses-summary">\r\n        <div class="future-summary-left">\r\n          <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\r\n            <path d="M6 9l6 6 6-6"/>\r\n          </svg>\r\n          <span class="future-title">Pr\xF3ximas vacunas (orden cronol\xF3gico)</span>\r\n          <span class="future-count-badge">{{ futureDoses().length }}</span>\r\n        </div>\r\n        <span class="future-hint">Click para ver dosis futuras</span>\r\n      </summary>\r\n      <div class="future-doses-content">\r\n        @for (dose of futureDoses(); track dose.id) {\r\n          <article class="dose-card future-card">\r\n            <div class="dose-copy">\r\n              <strong>{{ dose.vaccineName }}</strong>\r\n              <div class="dose-meta">\r\n                <span class="dose-label-chip">{{ dose.doseLabel }}</span>\r\n                <span class="dose-age-pill">\r\n                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">\r\n                    <circle cx="12" cy="12" r="10"/>\r\n                    <polyline points="12 6 12 12 16 14"/>\r\n                  </svg>\r\n                  <span>Edad prevista: {{ dose.dueAgeLabel }}</span>\r\n                </span>\r\n              </div>\r\n            </div>\r\n            <div class="future-badge-tag">\r\n              <span>Programada</span>\r\n            </div>\r\n          </article>\r\n        }\r\n      </div>\r\n    </details>\r\n  }\r\n</section>\r\n', styles: ["/* src/app/features/patient-record/patient-vaccinations/patient-vaccinations.component.css */\n:host {\n  display: block;\n}\n.vaccines-panel {\n  background: var(--dc-surface, #fff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 16px;\n  padding: 24px;\n}\n.vaccines-header {\n  align-items: flex-start;\n  display: flex;\n  gap: 16px;\n  justify-content: space-between;\n}\n.vaccines-header h3 {\n  color: var(--dc-ink, #0f172a);\n  font-size: 1.1rem;\n  margin: 2px 0 5px;\n}\n.vaccines-header p {\n  color: var(--dc-ink-muted, #64748b);\n  font-size: 0.85rem;\n  margin: 0;\n}\n.eyebrow {\n  color: var(--dc-blue-ink, #0284c7) !important;\n  font-size: 0.72rem !important;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n.saving,\n.summary {\n  border-radius: 999px;\n  font-size: 0.78rem;\n  font-weight: 600;\n  padding: 5px 10px;\n  white-space: nowrap;\n}\n.saving {\n  background: var(--dc-blue-surface, #e0f2fe);\n  color: var(--dc-blue-ink, #0369a1);\n}\n.vaccines-summary {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin: 20px 0;\n}\n.pending {\n  background: var(--dc-error-surface, #fee2e2);\n  color: var(--dc-error-ink, #991b1b);\n}\n.current {\n  background: var(--dc-warning-surface, #fef3c7);\n  color: var(--dc-warning-ink, #92400e);\n}\n.applied {\n  background: var(--dc-success-surface, #dcfce7);\n  color: var(--dc-success-ink, #166534);\n}\n.dose-group {\n  margin-top: 22px;\n}\n.dose-group h4 {\n  color: var(--dc-ink-secondary, #334155);\n  font-size: 0.9rem;\n  margin: 0 0 9px;\n}\n.dose-card {\n  align-items: center;\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-left: 4px solid #94a3b8;\n  border-radius: 10px;\n  display: flex;\n  gap: 14px;\n  justify-content: space-between;\n  margin-bottom: 8px;\n  padding: 11px 12px;\n}\n.pending-card {\n  border-left-color: #ef4444;\n}\n.current-card {\n  border-left-color: #f59e0b;\n}\n.applied-card {\n  border-left-color: #22c55e;\n}\n.future-card {\n  border-left-color: #0284c7;\n  background: var(--dc-surface-low, #fcfdfe);\n}\n.dose-copy {\n  display: grid;\n  gap: 2px;\n}\n.dose-copy strong {\n  color: var(--dc-ink, #1e293b);\n  font-size: 0.86rem;\n}\n.dose-copy span,\n.empty-state {\n  color: var(--dc-ink-muted, #64748b);\n  font-size: 0.8rem;\n}\n.apply-control,\n.date-control {\n  color: var(--dc-ink-secondary, #334155);\n  font-size: 0.8rem;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.date-control input {\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  border-radius: 6px;\n  margin-left: 5px;\n  padding: 4px;\n}\n.save-error {\n  background: var(--dc-error-surface, #fef2f2);\n  border: 1px solid #fecaca;\n  border-radius: 8px;\n  color: var(--dc-error-ink, #b91c1c);\n  font-size: 0.82rem;\n  padding: 9px 12px;\n}\n.future-doses {\n  margin-top: 24px;\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 12px;\n  overflow: hidden;\n  background: var(--dc-surface, #ffffff);\n}\n.future-doses-summary {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 16px;\n  background: var(--dc-surface-low, #f8fafc);\n  cursor: pointer;\n  list-style: none;\n  font-weight: 600;\n  color: var(--dc-ink-secondary, #334155);\n  -webkit-user-select: none;\n  user-select: none;\n  transition: background-color 0.15s ease;\n}\n.future-doses-summary:hover {\n  background: var(--dc-surface-high, #f1f5f9);\n}\n.future-doses-summary::-webkit-details-marker {\n  display: none;\n}\n.future-summary-left {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.chevron-icon {\n  width: 18px;\n  height: 18px;\n  color: var(--dc-ink-muted, #64748b);\n  transition: transform 0.2s ease;\n  flex-shrink: 0;\n}\n.future-doses[open] .chevron-icon {\n  transform: rotate(180deg);\n}\n.future-title {\n  font-size: 0.9rem;\n  font-weight: 700;\n  color: var(--dc-ink, #1e293b);\n}\n.future-count-badge {\n  background: var(--dc-blue-surface, #e0f2fe);\n  color: var(--dc-blue-ink, #0369a1);\n  font-size: 0.75rem;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 9999px;\n}\n.future-hint {\n  font-size: 0.78rem;\n  color: var(--dc-ink-muted, #94a3b8);\n  font-weight: 500;\n}\n.future-doses-content {\n  padding: 14px;\n  background: var(--dc-surface, #ffffff);\n  border-top: 1px solid var(--dc-outline, #f1f5f9);\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.dose-meta {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-top: 4px;\n}\n.dose-label-chip {\n  font-size: 0.78rem;\n  color: var(--dc-ink-secondary, #475569);\n  font-weight: 600;\n  background: var(--dc-surface-high, #f1f5f9);\n  padding: 2px 8px;\n  border-radius: 6px;\n}\n.dose-age-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.78rem;\n  color: var(--dc-blue-ink, #0369a1);\n  background: var(--dc-blue-surface, #f0f9ff);\n  border: 1px solid #e0f2fe;\n  padding: 2px 8px;\n  border-radius: 6px;\n}\n.future-badge-tag {\n  display: inline-flex;\n  align-items: center;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: var(--dc-ink-muted, #64748b);\n  background: var(--dc-surface-low, #f8fafc);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  padding: 3px 10px;\n  border-radius: 9999px;\n  white-space: nowrap;\n}\n@media (max-width: 640px) {\n  .vaccines-panel {\n    padding: 16px;\n  }\n  .dose-card {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .vaccines-header {\n    flex-direction: column;\n  }\n  .future-doses-summary {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 8px;\n  }\n  .future-hint {\n    display: none;\n  }\n}\n.field-error {\n  display: block;\n  margin-top: 6px;\n  color: var(--dc-error-ink, #b91c1c);\n  font-size: .8rem;\n}\n/*# sourceMappingURL=patient-vaccinations.component.css.map */\n"] }]
  }], () => [], { patient: [{ type: Input, args: [{ isSignal: true, alias: "patient", required: true }] }], patientUpdated: [{ type: Output, args: ["patientUpdated"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PatientVaccinationsComponent, { className: "PatientVaccinationsComponent", filePath: "src/app/features/patient-record/patient-vaccinations/patient-vaccinations.component.ts", lineNumber: 34 });
})();

// src/app/core/services/patient-medical-study.service.ts
var PatientMedicalStudyService = class _PatientMedicalStudyService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/patients`;
  getStudies(patientId) {
    return this.http.get(`${this.baseUrl}/${patientId}/studies`);
  }
  uploadStudy(patientId, file, description) {
    const formData = new FormData();
    formData.append("file", file);
    if (description && description.trim()) {
      formData.append("description", description.trim());
    }
    return this.http.post(`${this.baseUrl}/${patientId}/studies`, formData);
  }
  getStudy(patientId, studyId) {
    return this.http.get(`${this.baseUrl}/${patientId}/studies/${studyId}`);
  }
  getStudyFileBlob(patientId, studyId) {
    return this.http.get(`${this.baseUrl}/${patientId}/studies/${studyId}/file`, {
      responseType: "blob"
    });
  }
  deleteStudy(patientId, studyId) {
    return this.http.delete(`${this.baseUrl}/${patientId}/studies/${studyId}`);
  }
  static \u0275fac = function PatientMedicalStudyService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientMedicalStudyService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PatientMedicalStudyService, factory: _PatientMedicalStudyService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientMedicalStudyService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/features/patient-record/patient-studies/patient-studies.component.ts
var _c0 = ["fileInput"];
var _forTrack08 = ($index, $item) => $item.id;
function PatientStudiesComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "ng-icon", 37);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx);
  }
}
function PatientStudiesComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "ng-icon", 38);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx);
  }
}
function PatientStudiesComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "span", 39);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 40);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 41);
    \u0275\u0275listener("click", function PatientStudiesComponent_Conditional_32_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.clearSelectedFile());
    });
    \u0275\u0275text(6, " \u2715 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const file_r5 = ctx;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("title", file_r5.name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(file_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r3.formatFileSize(file_r5.size), ")");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.isUploading());
  }
}
function PatientStudiesComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1, "PDF o Im\xE1genes (JPG, PNG, WebP) hasta 10 MB");
    \u0275\u0275elementEnd();
  }
}
function PatientStudiesComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function PatientStudiesComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function PatientStudiesComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 42);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "Subiendo y procesando estudio\u2026");
    \u0275\u0275elementEnd();
  }
}
function PatientStudiesComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 21);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "Subir y Guardar Estudio");
    \u0275\u0275elementEnd();
  }
}
function PatientStudiesComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1, " Tu archivo se est\xE1 procesando. Si hay otras cargas, puede tardar un poco m\xE1s. ");
    \u0275\u0275elementEnd();
  }
}
function PatientStudiesComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275text(1, "Cargando estudios\u2026");
    \u0275\u0275elementEnd();
  }
}
function PatientStudiesComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275element(1, "div", 42);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando archivos del paciente\u2026");
    \u0275\u0275elementEnd()();
  }
}
function PatientStudiesComponent_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275element(1, "ng-icon", 43);
    \u0275\u0275elementStart(2, "h5");
    \u0275\u0275text(3, "No hay estudios m\xE9dicos registrados");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, " Utiliz\xE1 el formulario superior para subir los informes diagn\xF3sticos, im\xE1genes o fotos de estudios realizados al paciente. ");
    \u0275\u0275elementEnd()();
  }
}
function PatientStudiesComponent_Conditional_52_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 47);
  }
}
function PatientStudiesComponent_Conditional_52_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 48);
  }
}
function PatientStudiesComponent_Conditional_52_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 49);
  }
}
function PatientStudiesComponent_Conditional_52_For_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 54)(1, "strong");
    \u0275\u0275text(2, "Especificaci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const study_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", study_r7.description, " ");
  }
}
function PatientStudiesComponent_Conditional_52_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 55);
    \u0275\u0275text(1, "Sin descripci\xF3n especificada");
    \u0275\u0275elementEnd();
  }
}
function PatientStudiesComponent_Conditional_52_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 44)(1, "div", 45)(2, "div", 46);
    \u0275\u0275conditionalCreate(3, PatientStudiesComponent_Conditional_52_For_2_Conditional_3_Template, 1, 0, "ng-icon", 47)(4, PatientStudiesComponent_Conditional_52_For_2_Conditional_4_Template, 1, 0, "ng-icon", 48)(5, PatientStudiesComponent_Conditional_52_For_2_Conditional_5_Template, 1, 0, "ng-icon", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 50)(7, "div", 51)(8, "h5", 52);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 53);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(12, PatientStudiesComponent_Conditional_52_For_2_Conditional_12_Template, 4, 1, "p", 54)(13, PatientStudiesComponent_Conditional_52_For_2_Conditional_13_Template, 2, 0, "p", 55);
    \u0275\u0275elementStart(14, "div", 56)(15, "span", 57);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 58);
    \u0275\u0275text(18, "\u2022");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 57);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(21, "div", 59)(22, "button", 60);
    \u0275\u0275listener("click", function PatientStudiesComponent_Conditional_52_For_2_Template_button_click_22_listener() {
      const study_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.openStudyPreview(study_r7));
    });
    \u0275\u0275element(23, "ng-icon", 61);
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25, "Ver");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "button", 62);
    \u0275\u0275listener("click", function PatientStudiesComponent_Conditional_52_For_2_Template_button_click_26_listener() {
      const study_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.downloadStudy(study_r7));
    });
    \u0275\u0275element(27, "ng-icon", 63);
    \u0275\u0275elementStart(28, "span");
    \u0275\u0275text(29, "Descargar");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "button", 64);
    \u0275\u0275listener("click", function PatientStudiesComponent_Conditional_52_For_2_Template_button_click_30_listener() {
      const study_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.deleteStudy(study_r7));
    });
    \u0275\u0275element(31, "ng-icon", 65);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const study_r7 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("is-image", ctx_r3.isImage(study_r7.contentType))("is-pdf", ctx_r3.isPdf(study_r7.contentType));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.isImage(study_r7.contentType) ? 3 : ctx_r3.isPdf(study_r7.contentType) ? 4 : 5);
    \u0275\u0275advance(5);
    \u0275\u0275property("title", study_r7.originalFileName);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", study_r7.originalFileName, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r3.isPdf(study_r7.contentType) ? "PDF" : ctx_r3.isImage(study_r7.contentType) ? "IMAGEN" : "ARCHIVO", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(study_r7.description ? 12 : 13);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Fecha: ", ctx_r3.formatDate(study_r7.uploadedAt));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Tama\xF1o: ", ctx_r3.formatFileSize(study_r7.fileSize));
  }
}
function PatientStudiesComponent_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275repeaterCreate(1, PatientStudiesComponent_Conditional_52_For_2_Template, 32, 11, "article", 44, _forTrack08);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.studies());
  }
}
var MAX_STUDY_FILE_BYTES = 1e7;
var PatientStudiesComponent = class _PatientStudiesComponent {
  studyService = inject(PatientMedicalStudyService);
  auth = inject(AuthService);
  destroyRef = inject(DestroyRef);
  changed = new Subject();
  context = "";
  revision = 0;
  read = 0;
  previewUrls = /* @__PURE__ */ new Set();
  contextKey() {
    return JSON.stringify([this.auth.currentUser()?.id ?? null, this.patientId()]);
  }
  syncContext() {
    const context = this.contextKey();
    if (context === this.context)
      return;
    const isInitial = this.context === "";
    this.changed.next();
    this.context = context;
    this.revision++;
    this.read++;
    this.studies.set([]);
    if (!isInitial) {
      this.clearSelectedFile();
    }
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.isLoading.set(false);
    this.isUploading.set(false);
    this.releasePreviews();
  }
  releasePreviews() {
    for (const url of this.previewUrls)
      window.URL.revokeObjectURL(url);
    this.previewUrls.clear();
  }
  current(revision) {
    return revision === this.revision && this.context === this.contextKey() && !this.destroyRef.destroyed;
  }
  studiesStore = inject(PatientStudiesStore, { optional: true });
  patientId = input.required(
    ...ngDevMode ? [{ debugName: "patientId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  studies = signal(
    [],
    ...ngDevMode ? [{ debugName: "studies" }] : (
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
  isUploading = signal(
    false,
    ...ngDevMode ? [{ debugName: "isUploading" }] : (
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
  successMessage = signal(
    null,
    ...ngDevMode ? [{ debugName: "successMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedFile = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedFile" }] : (
      /* istanbul ignore next */
      []
    )
  );
  description = signal(
    "",
    ...ngDevMode ? [{ debugName: "description" }] : (
      /* istanbul ignore next */
      []
    )
  );
  descriptionError = computed(
    () => textError(this.description(), 4e3),
    ...ngDevMode ? [{ debugName: "descriptionError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  fileError = computed(
    () => {
      const file = this.selectedFile();
      if (!file)
        return "Seleccion\xE1 un archivo.";
      if (!file.size)
        return "Seleccion\xE1 un archivo que no est\xE9 vac\xEDo.";
      if (file.size > MAX_STUDY_FILE_BYTES)
        return "El archivo supera el tama\xF1o m\xE1ximo permitido de 10 MB.";
      if (!/\.(pdf|jpe?g|png|webp|gif|bmp|tiff?)$/i.test(file.name))
        return "Seleccion\xE1 un PDF o una imagen JPG, PNG, WebP, GIF, BMP o TIFF.";
      return null;
    },
    ...ngDevMode ? [{ debugName: "fileError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  fileInput = viewChild(
    "fileInput",
    ...ngDevMode ? [{ debugName: "fileInput" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasStudies = computed(
    () => this.studies().length > 0,
    ...ngDevMode ? [{ debugName: "hasStudies" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    if (this.studiesStore?.draftFile()) {
      this.selectedFile.set(this.studiesStore.draftFile());
    }
    if (this.studiesStore?.draftDescription()) {
      this.description.set(this.studiesStore.draftDescription());
    }
    effect(() => {
      const pid = this.patientId();
      this.auth.currentUser();
      untracked(() => {
        this.syncContext();
        if (pid)
          this.loadStudies(pid);
      });
    });
    this.destroyRef.onDestroy(() => {
      this.changed.next();
      this.releasePreviews();
    });
  }
  loadStudies(patientId) {
    this.syncContext();
    const revision = this.revision;
    const read = ++this.read;
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.studyService.getStudies(patientId).pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        if (!this.current(revision) || read !== this.read || patientId !== this.patientId())
          return;
        this.studies.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        if (!this.current(revision) || read !== this.read)
          return;
        this.errorMessage.set("No se pudieron cargar los estudios m\xE9dicos del paciente.");
        this.isLoading.set(false);
      }
    });
  }
  onFileChange(event) {
    if (this.isUploading())
      return;
    const input2 = event.target;
    if (input2.files && input2.files.length > 0) {
      const file = input2.files[0];
      if (file.size > MAX_STUDY_FILE_BYTES) {
        this.errorMessage.set("El archivo supera el tama\xF1o m\xE1ximo permitido de 10 MB.");
        this.selectedFile.set(null);
        this.studiesStore?.setDraftFile(null);
        return;
      }
      this.selectedFile.set(file);
      this.studiesStore?.setDraftFile(file);
      this.errorMessage.set(null);
    }
  }
  onDescriptionChange(val) {
    this.description.set(val);
    this.errorMessage.set(null);
    this.studiesStore?.setDraftDescription(val);
  }
  clearSelectedFile() {
    this.selectedFile.set(null);
    this.description.set("");
    this.studiesStore?.clearDraft();
    const inputEl = this.fileInput()?.nativeElement;
    if (inputEl) {
      inputEl.value = "";
    }
  }
  submitUpload() {
    this.syncContext();
    if (this.isUploading())
      return;
    const revision = this.revision;
    const file = this.selectedFile();
    if (!file || this.fileError() || this.descriptionError()) {
      this.errorMessage.set(this.fileError() || this.descriptionError());
      return;
    }
    if (file.size > MAX_STUDY_FILE_BYTES) {
      this.errorMessage.set("El archivo supera el tama\xF1o m\xE1ximo permitido de 10 MB.");
      return;
    }
    const pid = this.patientId();
    this.isUploading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.studyService.uploadStudy(pid, file, this.description()).pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (created) => {
        if (!this.current(revision))
          return;
        if (created.patientId !== pid) {
          this.isUploading.set(false);
          this.errorMessage.set("La respuesta no corresponde al paciente seleccionado.");
          return;
        }
        this.studies.update((list) => [created, ...list]);
        this.clearSelectedFile();
        this.isUploading.set(false);
        this.successMessage.set("Estudio m\xE9dico subido exitosamente.");
        setTimeout(() => {
          if (this.current(revision))
            this.successMessage.set(null);
        }, 4e3);
      },
      error: (error) => {
        if (!this.current(revision))
          return;
        this.isUploading.set(false);
        const messages = {
          STUDY_FILE_TOO_LARGE: "El archivo supera el tama\xF1o m\xE1ximo permitido de 10 MB.",
          INVALID_STUDY_FILE: "El archivo debe ser un PDF sin cifrar o una imagen v\xE1lida (JPG, PNG, WebP, GIF, BMP o TIFF).",
          EMPTY_STUDY_FILE: "Seleccion\xE1 un archivo que no est\xE9 vac\xEDo.",
          INVALID_STUDY_FILENAME: "El nombre del archivo no es v\xE1lido.",
          STUDY_DESCRIPTION_TOO_LONG: "La descripci\xF3n admite hasta 4000 caracteres.",
          STUDY_IMAGE_TOO_LARGE: "La imagen supera la resoluci\xF3n m\xE1xima permitida.",
          STUDY_VALIDATION_BUSY: "Hay otras cargas en proceso. Reintent\xE1 en unos segundos.",
          IMAGE_CONVERTER_UNAVAILABLE: "El servicio de im\xE1genes no est\xE1 disponible. Reintent\xE1 en unos segundos."
        };
        this.errorMessage.set(messages[error?.error?.code] ?? "Error al subir el estudio m\xE9dico. Verific\xE1 la conexi\xF3n y reintent\xE1.");
      }
    });
  }
  downloadStudy(study) {
    this.syncContext();
    if (study.patientId !== this.patientId())
      return;
    const revision = this.revision;
    this.studyService.getStudyFileBlob(this.patientId(), study.id).pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (blob) => {
        if (!this.current(revision))
          return;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = study.originalFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        if (!this.current(revision))
          return;
        this.errorMessage.set("No se pudo descargar el archivo del estudio.");
      }
    });
  }
  openStudyPreview(study) {
    this.syncContext();
    if (study.patientId !== this.patientId())
      return;
    const revision = this.revision;
    this.studyService.getStudyFileBlob(this.patientId(), study.id).pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (blob) => {
        if (!this.current(revision))
          return;
        const url = window.URL.createObjectURL(blob);
        this.previewUrls.add(url);
        window.open(url, "_blank", "noopener,noreferrer");
      },
      error: () => {
        if (!this.current(revision))
          return;
        this.errorMessage.set("No se pudo previsualizar el archivo.");
      }
    });
  }
  deleteStudy(study) {
    this.syncContext();
    if (study.patientId !== this.patientId())
      return;
    const revision = this.revision;
    if (!confirm(`\xBFEst\xE1s seguro de que dese\xE1s eliminar el estudio "${study.originalFileName}"?`)) {
      return;
    }
    this.studyService.deleteStudy(this.patientId(), study.id).pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        if (!this.current(revision))
          return;
        this.studies.update((list) => list.filter((s) => s.id !== study.id));
        this.successMessage.set("Estudio eliminado correctamente.");
        setTimeout(() => {
          if (this.current(revision))
            this.successMessage.set(null);
        }, 3e3);
      },
      error: () => {
        if (!this.current(revision))
          return;
        this.errorMessage.set("No se pudo eliminar el estudio m\xE9dico.");
      }
    });
  }
  formatFileSize(bytes) {
    if (bytes === 0)
      return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  }
  formatDate(dateStr) {
    return dateStr ? formatInstant(dateStr) : "";
  }
  isImage(contentType) {
    return !!contentType && contentType.startsWith("image/");
  }
  isPdf(contentType) {
    return !!contentType && contentType.includes("pdf");
  }
  static \u0275fac = function PatientStudiesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientStudiesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PatientStudiesComponent, selectors: [["app-patient-studies"]], viewQuery: function PatientStudiesComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.fileInput, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, inputs: { patientId: [1, "patientId"] }, features: [\u0275\u0275ProvidersFeature([
    provideIcons({
      lucideUpload,
      lucideFileText,
      lucideImage,
      lucideFile,
      lucideDownload,
      lucideExternalLink,
      lucideTrash2,
      lucideCheckCircle2,
      lucideAlertCircle,
      lucideFolderOpen
    })
  ])], decls: 53, vars: 16, consts: [["fileInput", ""], [1, "studies-container"], [1, "studies-header"], [1, "flex", "items-center", "gap-2"], ["name", "lucideFolderOpen", 1, "text-teal-600", "text-xl"], [1, "section-title"], [1, "count-badge"], [1, "section-subtitle"], ["role", "alert", 1, "alert-box", "alert-error"], ["role", "status", 1, "alert-box", "alert-success"], ["aria-label", "Subir nuevo estudio m\xE9dico", 1, "upload-card"], [1, "upload-card-header"], ["name", "lucideUpload", 1, "text-teal-600"], [1, "upload-form", 3, "ngSubmit"], [1, "upload-grid"], [1, "form-group", "file-picker-group"], ["for", "studyFileInput", 1, "form-label"], [1, "required-star"], [1, "file-input-wrapper"], ["id", "studyFileInput", "type", "file", "accept", ".pdf,.jpg,.jpeg,.png,.webp,.gif,.bmp,.tif,.tiff", 1, "hidden-file-input", 3, "change", "disabled"], ["type", "button", 1, "file-select-btn", 3, "click", "disabled"], ["name", "lucideUpload"], [1, "selected-file-info"], [1, "file-hint"], ["role", "alert", 1, "field-error"], [1, "form-group", "description-group"], ["for", "studyDescription", 1, "form-label"], ["id", "studyDescription", "type", "text", "name", "description", "maxlength", "4000", "placeholder", "Ej: Tomograf\xEDa de enc\xE9falo con contraste, Ecograf\xEDa abdominal, etc.", 1, "form-input", "text-input", 3, "ngModelChange", "ngModel", "disabled"], [1, "upload-actions"], ["type", "submit", 1, "btn-primary", 3, "disabled"], ["role", "status", "aria-live", "polite", 1, "file-hint"], ["aria-label", "Historial de estudios m\xE9dicos", 1, "studies-list-section"], [1, "list-section-header"], [1, "loading-label"], [1, "loading-state"], [1, "empty-studies-state"], [1, "studies-grid"], ["name", "lucideAlertCircle", 1, "alert-icon"], ["name", "lucideCheckCircle2", 1, "alert-icon"], [1, "selected-file-name", 3, "title"], [1, "selected-file-size"], ["type", "button", "title", "Quitar archivo", 1, "clear-file-btn", 3, "click", "disabled"], [1, "spinner-small"], ["name", "lucideFileText", 1, "empty-icon"], [1, "study-card"], [1, "study-card-main"], [1, "study-icon-wrapper"], ["name", "lucideImage", 1, "study-type-icon"], ["name", "lucideFileText", 1, "study-type-icon"], ["name", "lucideFile", 1, "study-type-icon"], [1, "study-details"], [1, "study-title-row"], [1, "study-filename", 3, "title"], [1, "study-format-badge"], [1, "study-description"], [1, "study-no-desc"], [1, "study-meta"], [1, "meta-item"], [1, "meta-dot"], [1, "study-card-actions"], ["type", "button", "title", "Abrir en pesta\xF1a nueva", 1, "btn-action", "btn-preview", 3, "click"], ["name", "lucideExternalLink"], ["type", "button", "title", "Descargar archivo a tu equipo", 1, "btn-action", "btn-download", 3, "click"], ["name", "lucideDownload"], ["type", "button", "title", "Eliminar estudio", "aria-label", "Eliminar estudio", 1, "btn-action", "btn-delete", 3, "click"], ["name", "lucideTrash2"]], template: function PatientStudiesComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "header", 2)(2, "div")(3, "div", 3);
      \u0275\u0275element(4, "ng-icon", 4);
      \u0275\u0275elementStart(5, "h3", 5);
      \u0275\u0275text(6, "Estudios realizados");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "span", 6);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "p", 7);
      \u0275\u0275text(10, " Archivos e im\xE1genes diagn\xF3sticas adjuntos a la historia cl\xEDnica del paciente (PDFs, TAC, RMN, Radiograf\xEDas, Ecograf\xEDas). ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(11, PatientStudiesComponent_Conditional_11_Template, 4, 1, "div", 8);
      \u0275\u0275conditionalCreate(12, PatientStudiesComponent_Conditional_12_Template, 4, 1, "div", 9);
      \u0275\u0275elementStart(13, "section", 10)(14, "div", 11);
      \u0275\u0275element(15, "ng-icon", 12);
      \u0275\u0275elementStart(16, "h4");
      \u0275\u0275text(17, "Adjuntar nuevo estudio m\xE9dico");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "form", 13);
      \u0275\u0275listener("ngSubmit", function PatientStudiesComponent_Template_form_ngSubmit_18_listener() {
        return ctx.submitUpload();
      });
      \u0275\u0275elementStart(19, "div", 14)(20, "div", 15)(21, "label", 16);
      \u0275\u0275text(22, " Archivo o Imagen ");
      \u0275\u0275elementStart(23, "span", 17);
      \u0275\u0275text(24, "*");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 18)(26, "input", 19, 0);
      \u0275\u0275listener("change", function PatientStudiesComponent_Template_input_change_26_listener($event) {
        return ctx.onFileChange($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "button", 20);
      \u0275\u0275listener("click", function PatientStudiesComponent_Template_button_click_28_listener() {
        \u0275\u0275restoreView(_r1);
        const fileInput_r2 = \u0275\u0275reference(27);
        return \u0275\u0275resetView(fileInput_r2.click());
      });
      \u0275\u0275element(29, "ng-icon", 21);
      \u0275\u0275elementStart(30, "span");
      \u0275\u0275text(31);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(32, PatientStudiesComponent_Conditional_32_Template, 7, 4, "div", 22)(33, PatientStudiesComponent_Conditional_33_Template, 2, 0, "span", 23);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(34, PatientStudiesComponent_Conditional_34_Template, 2, 1, "span", 24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "div", 25)(36, "label", 26);
      \u0275\u0275text(37, " Especificaci\xF3n / Descripci\xF3n del estudio ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "input", 27);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function PatientStudiesComponent_Template_input_ngModelChange_38_listener($event) {
        return ctx.onDescriptionChange($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(39, PatientStudiesComponent_Conditional_39_Template, 2, 1, "span", 24);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "div", 28)(41, "button", 29);
      \u0275\u0275conditionalCreate(42, PatientStudiesComponent_Conditional_42_Template, 3, 0)(43, PatientStudiesComponent_Conditional_43_Template, 3, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(44, PatientStudiesComponent_Conditional_44_Template, 2, 0, "p", 30);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(45, "section", 31)(46, "div", 32)(47, "h4");
      \u0275\u0275text(48, "Estudios registrados en la ficha");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(49, PatientStudiesComponent_Conditional_49_Template, 2, 0, "span", 33);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(50, PatientStudiesComponent_Conditional_50_Template, 4, 0, "div", 34)(51, PatientStudiesComponent_Conditional_51_Template, 6, 0, "div", 35)(52, PatientStudiesComponent_Conditional_52_Template, 3, 0, "div", 36);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_3_0;
      let tmp_7_0;
      let tmp_8_0;
      let tmp_12_0;
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.studies().length);
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_2_0 = ctx.errorMessage()) ? 11 : -1, tmp_2_0);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_3_0 = ctx.successMessage()) ? 12 : -1, tmp_3_0);
      \u0275\u0275advance(14);
      \u0275\u0275property("disabled", ctx.isUploading());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isUploading());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.selectedFile() ? "Cambiar archivo" : "Seleccionar archivo / foto");
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_7_0 = ctx.selectedFile()) ? 32 : 33, tmp_7_0);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_8_0 = ctx.fileError()) ? 34 : -1, tmp_8_0);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngModel", ctx.description())("disabled", ctx.isUploading());
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_12_0 = ctx.descriptionError()) ? 39 : -1, tmp_12_0);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", !!ctx.fileError() || !!ctx.descriptionError() || ctx.isUploading());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isUploading() ? 42 : 43);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isUploading() ? 44 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.isLoading() ? 49 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 50 : !ctx.hasStudies() ? 51 : 52);
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, MaxLengthValidator, NgModel, NgForm, NgIcon], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n.studies-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.studies-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #0f172a);\n  margin: 0;\n}\n.count-badge[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-teal-surface, #ccfbf1);\n  color: var(--%NS%dc-teal-ink, #0f766e);\n  font-size: 0.75rem;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 9999px;\n}\n.section-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  margin: 0.25rem 0 0;\n}\n.alert-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1rem;\n  border-radius: 8px;\n  font-size: 0.85rem;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-error-surface, #fef2f2);\n  border: 1px solid #fecaca;\n  color: var(--%NS%dc-error-ink, #b91c1c);\n}\n.alert-success[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-success-surface, #f0fdf4);\n  border: 1px solid #bbf7d0;\n  color: var(--%NS%dc-success-ink, #15803d);\n}\n.alert-icon[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  flex-shrink: 0;\n}\n.upload-card[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 12px;\n  padding: 1.25rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n}\n.upload-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n}\n.upload-card-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #1e293b);\n  margin: 0;\n}\n.upload-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.upload-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n@media (max-width: 768px) {\n  .upload-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink-secondary, #475569);\n}\n.required-star[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-error-ink, #ef4444);\n}\n.file-input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.hidden-file-input[_ngcontent-%COMP%] {\n  display: none;\n}\n.file-select-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  background-color: var(--%NS%dc-surface-high, #f1f5f9);\n  border: 1px dashed #94a3b8;\n  border-radius: 8px;\n  padding: 0.5rem 0.85rem;\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink-secondary, #334155);\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.file-select-btn[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-surface-high, #e2e8f0);\n  border-color: #64748b;\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.selected-file-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  background-color: var(--%NS%dc-teal-surface, #f0fdfa);\n  border: 1px solid #99f6e4;\n  padding: 0.35rem 0.65rem;\n  border-radius: 6px;\n  font-size: 0.78rem;\n}\n.selected-file-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--%NS%dc-teal-ink, #0f766e);\n  max-width: 180px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.selected-file-size[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.clear-file-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: var(--%NS%dc-ink-muted, #94a3b8);\n  cursor: pointer;\n  padding: 0 2px;\n  font-size: 0.85rem;\n}\n.clear-file-btn[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%dc-error-ink, #ef4444);\n}\n.file-hint[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--%NS%dc-ink-muted, #94a3b8);\n}\n.text-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.55rem 0.75rem;\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 8px;\n  font-size: 0.85rem;\n  color: var(--%NS%dc-ink, #0f172a);\n  outline: none;\n  transition: border-color 0.15s ease;\n}\n.text-input[_ngcontent-%COMP%]:focus {\n  border-color: #006874;\n  box-shadow: 0 0 0 3px rgba(0, 104, 116, 0.1);\n}\n.upload-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background-color: #006874;\n  color: #ffffff;\n  border: none;\n  border-radius: 8px;\n  padding: 0.55rem 1.25rem;\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #004d56;\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.studies-list-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.list-section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.list-section-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink-secondary, #334155);\n  margin: 0;\n}\n.loading-label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.empty-studies-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 1.5rem;\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  border: 2px dashed var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 12px;\n  text-align: center;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  color: var(--%NS%dc-ink-muted, #94a3b8);\n  margin-bottom: 0.75rem;\n}\n.empty-studies-state[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink-secondary, #334155);\n  margin: 0 0 0.35rem;\n}\n.empty-studies-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  max-width: 480px;\n  margin: 0;\n}\n.studies-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 1rem;\n}\n.study-card[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 12px;\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  gap: 1rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n}\n.study-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);\n}\n.study-card-main[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.85rem;\n}\n.study-icon-wrapper[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  background-color: var(--%NS%dc-surface-high, #f1f5f9);\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.study-icon-wrapper.is-pdf[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-error-surface, #fee2e2);\n  color: var(--%NS%dc-error-ink, #dc2626);\n}\n.study-icon-wrapper.is-image[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-blue-surface, #e0f2fe);\n  color: var(--%NS%dc-blue-ink, #0284c7);\n}\n.study-type-icon[_ngcontent-%COMP%] {\n  font-size: 1.35rem;\n}\n.study-details[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n  min-width: 0;\n}\n.study-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.study-filename[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #0f172a);\n  margin: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.study-format-badge[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  font-weight: 700;\n  background-color: var(--%NS%dc-surface-high, #f1f5f9);\n  color: var(--%NS%dc-ink-secondary, #475569);\n  padding: 1px 6px;\n  border-radius: 4px;\n  letter-spacing: 0.05em;\n  flex-shrink: 0;\n}\n.study-description[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--%NS%dc-ink-secondary, #334155);\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  border-left: 3px solid #006874;\n  padding: 0.35rem 0.5rem;\n  border-radius: 0 4px 4px 0;\n  margin: 0.15rem 0;\n  line-height: 1.35;\n}\n.study-no-desc[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--%NS%dc-ink-muted, #94a3b8);\n  font-style: italic;\n  margin: 0;\n}\n.study-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 0.72rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  margin-top: 0.2rem;\n}\n.meta-dot[_ngcontent-%COMP%] {\n  color: #cbd5e1;\n}\n.study-card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  border-top: 1px solid var(--%NS%dc-outline, #f1f5f9);\n  padding-top: 0.65rem;\n}\n.btn-action[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.35rem 0.65rem;\n  border-radius: 6px;\n  font-size: 0.78rem;\n  font-weight: 600;\n  cursor: pointer;\n  border: 1px solid transparent;\n  transition: all 0.15s ease;\n}\n.btn-preview[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-teal-surface, #f0fdfa);\n  border-color: #99f6e4;\n  color: var(--%NS%dc-teal-ink, #0f766e);\n}\n.btn-preview[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-teal-surface, #ccfbf1);\n}\n.btn-download[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-surface-high, #f1f5f9);\n  border-color: var(--%NS%dc-outline, #cbd5e1);\n  color: var(--%NS%dc-ink-secondary, #334155);\n}\n.btn-download[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-surface-high, #e2e8f0);\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.btn-delete[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: var(--%NS%dc-ink-muted, #94a3b8);\n  padding: 0.35rem;\n}\n.btn-delete[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%dc-error-ink, #ef4444);\n  background-color: var(--%NS%dc-error-surface, #fef2f2);\n}\n.spinner-small[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  border: 2px solid rgba(255, 255, 255, 0.4);\n  border-top-color: #ffffff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.6s linear infinite;\n  display: inline-block;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.field-error[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 6px;\n  color: var(--%NS%dc-error-ink, #b91c1c);\n  font-size: .8rem;\n}\n/*# sourceMappingURL=patient-studies.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientStudiesComponent, [{
    type: Component,
    args: [{ selector: "app-patient-studies", imports: [CommonModule, FormsModule, NgIcon], providers: [
      provideIcons({
        lucideUpload,
        lucideFileText,
        lucideImage,
        lucideFile,
        lucideDownload,
        lucideExternalLink,
        lucideTrash2,
        lucideCheckCircle2,
        lucideAlertCircle,
        lucideFolderOpen
      })
    ], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="studies-container">\r
  <!-- Cabecera de la secci\xF3n -->\r
  <header class="studies-header">\r
    <div>\r
      <div class="flex items-center gap-2">\r
        <ng-icon name="lucideFolderOpen" class="text-teal-600 text-xl" />\r
        <h3 class="section-title">Estudios realizados</h3>\r
        <span class="count-badge">{{ studies().length }}</span>\r
      </div>\r
      <p class="section-subtitle">\r
        Archivos e im\xE1genes diagn\xF3sticas adjuntos a la historia cl\xEDnica del paciente (PDFs, TAC, RMN, Radiograf\xEDas, Ecograf\xEDas).\r
      </p>\r
    </div>\r
  </header>\r
\r
  <!-- Mensajes de Estado -->\r
  @if (errorMessage(); as error) {\r
    <div class="alert-box alert-error" role="alert">\r
      <ng-icon name="lucideAlertCircle" class="alert-icon" />\r
      <span>{{ error }}</span>\r
    </div>\r
  }\r
\r
  @if (successMessage(); as success) {\r
    <div class="alert-box alert-success" role="status">\r
      <ng-icon name="lucideCheckCircle2" class="alert-icon" />\r
      <span>{{ success }}</span>\r
    </div>\r
  }\r
\r
  <!-- Formulario de Subida de Estudio -->\r
  <section class="upload-card" aria-label="Subir nuevo estudio m\xE9dico">\r
    <div class="upload-card-header">\r
      <ng-icon name="lucideUpload" class="text-teal-600" />\r
      <h4>Adjuntar nuevo estudio m\xE9dico</h4>\r
    </div>\r
\r
    <form (ngSubmit)="submitUpload()" class="upload-form">\r
      <div class="upload-grid">\r
        <!-- Selector de Archivo -->\r
        <div class="form-group file-picker-group">\r
          <label for="studyFileInput" class="form-label">\r
            Archivo o Imagen <span class="required-star">*</span>\r
          </label>\r
          <div class="file-input-wrapper">\r
            <input\r
              #fileInput\r
              id="studyFileInput"\r
              type="file"\r
              accept=".pdf,.jpg,.jpeg,.png,.webp,.gif,.bmp,.tif,.tiff"\r
              (change)="onFileChange($event)"\r
              class="hidden-file-input"\r
              [disabled]="isUploading()"\r
            />\r
            <button\r
              type="button"\r
              class="file-select-btn"\r
              [disabled]="isUploading()"\r
              (click)="fileInput.click()"\r
            >\r
              <ng-icon name="lucideUpload" />\r
              <span>{{ selectedFile() ? 'Cambiar archivo' : 'Seleccionar archivo / foto' }}</span>\r
            </button>\r
            @if (selectedFile(); as file) {\r
              <div class="selected-file-info">\r
                <span class="selected-file-name" [title]="file.name">{{ file.name }}</span>\r
                <span class="selected-file-size">({{ formatFileSize(file.size) }})</span>\r
                <button\r
                  type="button"\r
                  class="clear-file-btn"\r
                  (click)="clearSelectedFile()"\r
                  title="Quitar archivo"\r
                  [disabled]="isUploading()"\r
                >\r
                  \u2715\r
                </button>\r
              </div>\r
            } @else {\r
              <span class="file-hint">PDF o Im\xE1genes (JPG, PNG, WebP) hasta 10 MB</span>\r
            }\r
          </div>\r
          @if (fileError(); as error) { <span class="field-error" role="alert">{{ error }}</span> }\r
        </div>\r
\r
        <!-- Descripci\xF3n o Especificaci\xF3n -->\r
        <div class="form-group description-group">\r
          <label for="studyDescription" class="form-label">\r
            Especificaci\xF3n / Descripci\xF3n del estudio\r
          </label>\r
          <input\r
            id="studyDescription"\r
            type="text"\r
            [ngModel]="description()"\r
            (ngModelChange)="onDescriptionChange($event)"\r
            name="description"\r
            maxlength="4000"\r
            placeholder="Ej: Tomograf\xEDa de enc\xE9falo con contraste, Ecograf\xEDa abdominal, etc."\r
            class="form-input text-input"\r
            [disabled]="isUploading()"\r
          />\r
          @if (descriptionError(); as error) { <span class="field-error" role="alert">{{ error }}</span> }\r
        </div>\r
      </div>\r
\r
      <div class="upload-actions">\r
        <button\r
          type="submit"\r
          class="btn-primary"\r
          [disabled]="!!fileError() || !!descriptionError() || isUploading()"\r
        >\r
          @if (isUploading()) {\r
            <span class="spinner-small"></span>\r
            <span>Subiendo y procesando estudio\u2026</span>\r
          } @else {\r
            <ng-icon name="lucideUpload" />\r
            <span>Subir y Guardar Estudio</span>\r
          }\r
        </button>\r
      </div>\r
      @if (isUploading()) {\r
        <p class="file-hint" role="status" aria-live="polite">\r
          Tu archivo se est\xE1 procesando. Si hay otras cargas, puede tardar un poco m\xE1s.\r
        </p>\r
      }\r
    </form>\r
  </section>\r
\r
  <!-- Listado de Estudios Realizados -->\r
  <section class="studies-list-section" aria-label="Historial de estudios m\xE9dicos">\r
    <div class="list-section-header">\r
      <h4>Estudios registrados en la ficha</h4>\r
      @if (isLoading()) {\r
        <span class="loading-label">Cargando estudios\u2026</span>\r
      }\r
    </div>\r
\r
    @if (isLoading()) {\r
      <div class="loading-state">\r
        <div class="spinner-small"></div>\r
        <p>Cargando archivos del paciente\u2026</p>\r
      </div>\r
    } @else if (!hasStudies()) {\r
      <div class="empty-studies-state">\r
        <ng-icon name="lucideFileText" class="empty-icon" />\r
        <h5>No hay estudios m\xE9dicos registrados</h5>\r
        <p>\r
          Utiliz\xE1 el formulario superior para subir los informes diagn\xF3sticos, im\xE1genes o fotos de estudios realizados al paciente.\r
        </p>\r
      </div>\r
    } @else {\r
      <div class="studies-grid">\r
        @for (study of studies(); track study.id) {\r
          <article class="study-card">\r
            <div class="study-card-main">\r
              <div class="study-icon-wrapper" [class.is-image]="isImage(study.contentType)" [class.is-pdf]="isPdf(study.contentType)">\r
                @if (isImage(study.contentType)) {\r
                  <ng-icon name="lucideImage" class="study-type-icon" />\r
                } @else if (isPdf(study.contentType)) {\r
                  <ng-icon name="lucideFileText" class="study-type-icon" />\r
                } @else {\r
                  <ng-icon name="lucideFile" class="study-type-icon" />\r
                }\r
              </div>\r
\r
              <div class="study-details">\r
                <div class="study-title-row">\r
                  <h5 class="study-filename" [title]="study.originalFileName">\r
                    {{ study.originalFileName }}\r
                  </h5>\r
                  <span class="study-format-badge">\r
                    {{ isPdf(study.contentType) ? 'PDF' : isImage(study.contentType) ? 'IMAGEN' : 'ARCHIVO' }}\r
                  </span>\r
                </div>\r
\r
                @if (study.description) {\r
                  <p class="study-description">\r
                    <strong>Especificaci\xF3n:</strong> {{ study.description }}\r
                  </p>\r
                } @else {\r
                  <p class="study-no-desc">Sin descripci\xF3n especificada</p>\r
                }\r
\r
                <div class="study-meta">\r
                  <span class="meta-item">Fecha: {{ formatDate(study.uploadedAt) }}</span>\r
                  <span class="meta-dot">\u2022</span>\r
                  <span class="meta-item">Tama\xF1o: {{ formatFileSize(study.fileSize) }}</span>\r
                </div>\r
              </div>\r
            </div>\r
\r
            <div class="study-card-actions">\r
              <button\r
                type="button"\r
                class="btn-action btn-preview"\r
                (click)="openStudyPreview(study)"\r
                title="Abrir en pesta\xF1a nueva"\r
              >\r
                <ng-icon name="lucideExternalLink" />\r
                <span>Ver</span>\r
              </button>\r
\r
              <button\r
                type="button"\r
                class="btn-action btn-download"\r
                (click)="downloadStudy(study)"\r
                title="Descargar archivo a tu equipo"\r
              >\r
                <ng-icon name="lucideDownload" />\r
                <span>Descargar</span>\r
              </button>\r
\r
              <button\r
                type="button"\r
                class="btn-action btn-delete"\r
                (click)="deleteStudy(study)"\r
                title="Eliminar estudio"\r
                aria-label="Eliminar estudio"\r
              >\r
                <ng-icon name="lucideTrash2" />\r
              </button>\r
            </div>\r
          </article>\r
        }\r
      </div>\r
    }\r
  </section>\r
</div>\r
`, styles: ["/* src/app/features/patient-record/patient-studies/patient-studies.component.css */\n:host {\n  display: block;\n}\n.studies-container {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.studies-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n.section-title {\n  font-size: 1.15rem;\n  font-weight: 700;\n  color: var(--dc-ink, #0f172a);\n  margin: 0;\n}\n.count-badge {\n  background-color: var(--dc-teal-surface, #ccfbf1);\n  color: var(--dc-teal-ink, #0f766e);\n  font-size: 0.75rem;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 9999px;\n}\n.section-subtitle {\n  font-size: 0.85rem;\n  color: var(--dc-ink-muted, #64748b);\n  margin: 0.25rem 0 0;\n}\n.alert-box {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1rem;\n  border-radius: 8px;\n  font-size: 0.85rem;\n}\n.alert-error {\n  background-color: var(--dc-error-surface, #fef2f2);\n  border: 1px solid #fecaca;\n  color: var(--dc-error-ink, #b91c1c);\n}\n.alert-success {\n  background-color: var(--dc-success-surface, #f0fdf4);\n  border: 1px solid #bbf7d0;\n  color: var(--dc-success-ink, #15803d);\n}\n.alert-icon {\n  font-size: 1.1rem;\n  flex-shrink: 0;\n}\n.upload-card {\n  background: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 12px;\n  padding: 1.25rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n}\n.upload-card-header {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-bottom: 1rem;\n}\n.upload-card-header h4 {\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--dc-ink, #1e293b);\n  margin: 0;\n}\n.upload-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.upload-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n}\n@media (max-width: 768px) {\n  .upload-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.form-label {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: var(--dc-ink-secondary, #475569);\n}\n.required-star {\n  color: var(--dc-error-ink, #ef4444);\n}\n.file-input-wrapper {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.hidden-file-input {\n  display: none;\n}\n.file-select-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  background-color: var(--dc-surface-high, #f1f5f9);\n  border: 1px dashed #94a3b8;\n  border-radius: 8px;\n  padding: 0.5rem 0.85rem;\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: var(--dc-ink-secondary, #334155);\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.file-select-btn:hover {\n  background-color: var(--dc-surface-high, #e2e8f0);\n  border-color: #64748b;\n  color: var(--dc-ink, #0f172a);\n}\n.selected-file-info {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  background-color: var(--dc-teal-surface, #f0fdfa);\n  border: 1px solid #99f6e4;\n  padding: 0.35rem 0.65rem;\n  border-radius: 6px;\n  font-size: 0.78rem;\n}\n.selected-file-name {\n  font-weight: 600;\n  color: var(--dc-teal-ink, #0f766e);\n  max-width: 180px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.selected-file-size {\n  color: var(--dc-ink-muted, #64748b);\n}\n.clear-file-btn {\n  background: none;\n  border: none;\n  color: var(--dc-ink-muted, #94a3b8);\n  cursor: pointer;\n  padding: 0 2px;\n  font-size: 0.85rem;\n}\n.clear-file-btn:hover {\n  color: var(--dc-error-ink, #ef4444);\n}\n.file-hint {\n  font-size: 0.75rem;\n  color: var(--dc-ink-muted, #94a3b8);\n}\n.text-input {\n  width: 100%;\n  padding: 0.55rem 0.75rem;\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  border-radius: 8px;\n  font-size: 0.85rem;\n  color: var(--dc-ink, #0f172a);\n  outline: none;\n  transition: border-color 0.15s ease;\n}\n.text-input:focus {\n  border-color: #006874;\n  box-shadow: 0 0 0 3px rgba(0, 104, 116, 0.1);\n}\n.upload-actions {\n  display: flex;\n  justify-content: flex-end;\n}\n.btn-primary {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background-color: #006874;\n  color: #ffffff;\n  border: none;\n  border-radius: 8px;\n  padding: 0.55rem 1.25rem;\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n}\n.btn-primary:hover:not(:disabled) {\n  background-color: #004d56;\n}\n.btn-primary:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.studies-list-section {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.list-section-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.list-section-header h4 {\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--dc-ink-secondary, #334155);\n  margin: 0;\n}\n.loading-label {\n  font-size: 0.8rem;\n  color: var(--dc-ink-muted, #64748b);\n}\n.empty-studies-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 1.5rem;\n  background-color: var(--dc-surface-low, #f8fafc);\n  border: 2px dashed var(--dc-outline, #cbd5e1);\n  border-radius: 12px;\n  text-align: center;\n}\n.empty-icon {\n  font-size: 2.5rem;\n  color: var(--dc-ink-muted, #94a3b8);\n  margin-bottom: 0.75rem;\n}\n.empty-studies-state h5 {\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--dc-ink-secondary, #334155);\n  margin: 0 0 0.35rem;\n}\n.empty-studies-state p {\n  font-size: 0.85rem;\n  color: var(--dc-ink-muted, #64748b);\n  max-width: 480px;\n  margin: 0;\n}\n.studies-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 1rem;\n}\n.study-card {\n  background: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 12px;\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  gap: 1rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n}\n.study-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);\n}\n.study-card-main {\n  display: flex;\n  gap: 0.85rem;\n}\n.study-icon-wrapper {\n  width: 42px;\n  height: 42px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  background-color: var(--dc-surface-high, #f1f5f9);\n  color: var(--dc-ink-muted, #64748b);\n}\n.study-icon-wrapper.is-pdf {\n  background-color: var(--dc-error-surface, #fee2e2);\n  color: var(--dc-error-ink, #dc2626);\n}\n.study-icon-wrapper.is-image {\n  background-color: var(--dc-blue-surface, #e0f2fe);\n  color: var(--dc-blue-ink, #0284c7);\n}\n.study-type-icon {\n  font-size: 1.35rem;\n}\n.study-details {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n  min-width: 0;\n}\n.study-title-row {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n.study-filename {\n  font-size: 0.88rem;\n  font-weight: 700;\n  color: var(--dc-ink, #0f172a);\n  margin: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.study-format-badge {\n  font-size: 0.65rem;\n  font-weight: 700;\n  background-color: var(--dc-surface-high, #f1f5f9);\n  color: var(--dc-ink-secondary, #475569);\n  padding: 1px 6px;\n  border-radius: 4px;\n  letter-spacing: 0.05em;\n  flex-shrink: 0;\n}\n.study-description {\n  font-size: 0.8rem;\n  color: var(--dc-ink-secondary, #334155);\n  background-color: var(--dc-surface-low, #f8fafc);\n  border-left: 3px solid #006874;\n  padding: 0.35rem 0.5rem;\n  border-radius: 0 4px 4px 0;\n  margin: 0.15rem 0;\n  line-height: 1.35;\n}\n.study-no-desc {\n  font-size: 0.78rem;\n  color: var(--dc-ink-muted, #94a3b8);\n  font-style: italic;\n  margin: 0;\n}\n.study-meta {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 0.72rem;\n  color: var(--dc-ink-muted, #64748b);\n  margin-top: 0.2rem;\n}\n.meta-dot {\n  color: #cbd5e1;\n}\n.study-card-actions {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  border-top: 1px solid var(--dc-outline, #f1f5f9);\n  padding-top: 0.65rem;\n}\n.btn-action {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.35rem 0.65rem;\n  border-radius: 6px;\n  font-size: 0.78rem;\n  font-weight: 600;\n  cursor: pointer;\n  border: 1px solid transparent;\n  transition: all 0.15s ease;\n}\n.btn-preview {\n  background-color: var(--dc-teal-surface, #f0fdfa);\n  border-color: #99f6e4;\n  color: var(--dc-teal-ink, #0f766e);\n}\n.btn-preview:hover {\n  background-color: var(--dc-teal-surface, #ccfbf1);\n}\n.btn-download {\n  background-color: var(--dc-surface-high, #f1f5f9);\n  border-color: var(--dc-outline, #cbd5e1);\n  color: var(--dc-ink-secondary, #334155);\n}\n.btn-download:hover {\n  background-color: var(--dc-surface-high, #e2e8f0);\n  color: var(--dc-ink, #0f172a);\n}\n.btn-delete {\n  background: transparent;\n  border: none;\n  color: var(--dc-ink-muted, #94a3b8);\n  padding: 0.35rem;\n}\n.btn-delete:hover {\n  color: var(--dc-error-ink, #ef4444);\n  background-color: var(--dc-error-surface, #fef2f2);\n}\n.spinner-small {\n  width: 14px;\n  height: 14px;\n  border: 2px solid rgba(255, 255, 255, 0.4);\n  border-top-color: #ffffff;\n  border-radius: 50%;\n  animation: spin 0.6s linear infinite;\n  display: inline-block;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.field-error {\n  display: block;\n  margin-top: 6px;\n  color: var(--dc-error-ink, #b91c1c);\n  font-size: .8rem;\n}\n/*# sourceMappingURL=patient-studies.component.css.map */\n"] }]
  }], () => [], { patientId: [{ type: Input, args: [{ isSignal: true, alias: "patientId", required: true }] }], fileInput: [{ type: ViewChild, args: ["fileInput", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PatientStudiesComponent, { className: "PatientStudiesComponent", filePath: "src/app/features/patient-record/patient-studies/patient-studies.component.ts", lineNumber: 61 });
})();

// src/app/features/patient-record/patient-record-modules.ts
var PATIENT_RECORD_MODULES = {
  SUMMARY: {
    id: "SUMMARY",
    tab: "resumen",
    label: "Datos del paciente",
    component: PatientSummaryComponent,
    editOutput: "editPatient"
  },
  ENCOUNTERS: {
    id: "ENCOUNTERS",
    tab: "historia",
    label: "Historia Cl\xEDnica",
    component: PatientEncountersComponent,
    encounterOutput: "newEncounter"
  },
  VACCINATION: {
    id: "VACCINATION",
    tab: "vacunas",
    label: "Vacunas",
    component: PatientVaccinationsComponent,
    panel: true,
    patientInput: "patient",
    patientUpdatedOutput: "patientUpdated"
  },
  GROWTH: {
    id: "GROWTH",
    tab: "curvas",
    label: "Evoluci\xF3n y Curvas",
    component: PatientGrowthComponent
  },
  PRESCRIPTIONS: {
    id: "PRESCRIPTIONS",
    tab: "recetas",
    label: "Recetas y \xD3rdenes",
    component: PatientPrescriptionsComponent,
    encounterInput: "latestEncounter"
  },
  STUDIES: {
    id: "STUDIES",
    tab: "estudios",
    label: "Estudios realizados",
    component: PatientStudiesComponent,
    panel: true,
    patientIdInput: "patientId"
  }
};

// src/app/features/patient-record/patient-record.component.ts
var _forTrack09 = ($index, $item) => $item.id;
function PatientRecordComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "div", 3);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "Cargando Ficha Cl\xEDnica...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Sincronizando informaci\xF3n del paciente con el servidor cl\xEDnico.");
    \u0275\u0275elementEnd()();
  }
}
function PatientRecordComponent_Conditional_2_For_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tab_r4.badge);
  }
}
function PatientRecordComponent_Conditional_2_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function PatientRecordComponent_Conditional_2_For_3_Template_button_click_0_listener() {
      const tab_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setTab(tab_r4.id));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, PatientRecordComponent_Conditional_2_For_3_Conditional_3_Template, 2, 1, "span", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r1.activeTab()?.id === tab_r4.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tab_r4.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(tab_r4.badge != null && tab_r4.badge !== "" ? 3 : -1);
  }
}
function PatientRecordComponent_Conditional_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section");
    \u0275\u0275elementContainerStart(1, 11);
    \u0275\u0275listener("editPatient", function PatientRecordComponent_Conditional_2_Conditional_5_Template_ng_container_editPatient_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openEditPatientModal());
    })("newEncounter", function PatientRecordComponent_Conditional_2_Conditional_5_Template_ng_container_newEncounter_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openNewEncounterModal());
    })("patientUpdated", function PatientRecordComponent_Conditional_2_Conditional_5_Template_ng_container_patientUpdated_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.activePatientService.setActivePatient($event));
    });
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r6 = ctx;
    const patient_r7 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(tab_r6.module.panel ? "tab-panel animate-fade-in" : "module-outlet");
    \u0275\u0275attribute("aria-label", tab_r6.module.panel ? tab_r6.module.label : null);
    \u0275\u0275advance();
    \u0275\u0275property("recordModule", tab_r6.module)("patient", patient_r7)("latestEncounter", ctx_r1.history.encounters()[0]);
  }
}
function PatientRecordComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-patient-banner", 4);
    \u0275\u0275listener("newEncounter", function PatientRecordComponent_Conditional_2_Template_app_patient_banner_newEncounter_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openNewEncounterModal());
    })("editPatient", function PatientRecordComponent_Conditional_2_Template_app_patient_banner_editPatient_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openEditPatientModal());
    })("printSummary", function PatientRecordComponent_Conditional_2_Template_app_patient_banner_printSummary_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.printDocument());
    })("viewCurves", function PatientRecordComponent_Conditional_2_Template_app_patient_banner_viewCurves_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigateToGrowthCurves());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "nav", 5);
    \u0275\u0275repeaterCreate(2, PatientRecordComponent_Conditional_2_For_3_Template, 4, 4, "button", 6, _forTrack09);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 7);
    \u0275\u0275conditionalCreate(5, PatientRecordComponent_Conditional_2_Conditional_5_Template, 2, 6, "section", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("patient", ctx);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.tabs());
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_4_0 = ctx_r1.activeTab()) ? 5 : -1, tmp_4_0);
  }
}
function PatientRecordComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 12);
    \u0275\u0275element(2, "ng-icon", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2", 14);
    \u0275\u0275text(4, "No hay un paciente seleccionado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 15);
    \u0275\u0275text(6, " Para visualizar o editar la Ficha Cl\xEDnica Integral, seleccione un paciente del Directorio unificado o registre uno nuevo en el sistema. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 16)(8, "button", 17);
    \u0275\u0275listener("click", function PatientRecordComponent_Conditional_3_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigateToPatients());
    });
    \u0275\u0275element(9, "ng-icon", 18);
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11, "Ir al Directorio de Pacientes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "button", 19);
    \u0275\u0275listener("click", function PatientRecordComponent_Conditional_3_Template_button_click_12_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openEditPatientModal($event));
    });
    \u0275\u0275element(13, "ng-icon", 20);
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "+ Registrar Nuevo Paciente");
    \u0275\u0275elementEnd()()()();
  }
}
var PatientRecordComponent = class _PatientRecordComponent {
  recordActions = inject(PatientRecordActionsService);
  history = inject(PatientEncountersStore);
  growth = inject(PatientGrowthStore);
  prescriptions = inject(PatientPrescriptionEditorStore);
  activePatientService = inject(ActivePatientService);
  workspace = inject(WorkspaceStore);
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);
  platformId = inject(PLATFORM_ID);
  recordContext = "";
  selectedTab = signal(
    "resumen",
    ...ngDevMode ? [{ debugName: "selectedTab" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isNewEncounterModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isNewEncounterModalOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isEditPatientModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isEditPatientModalOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tabs = computed(
    () => this.workspace.patientRecordTabs().map((id, index) => {
      const module = PATIENT_RECORD_MODULES[id];
      const badge = id === "ENCOUNTERS" ? this.history.encounters().length : id === "GROWTH" ? this.growth.totalMeasurementsCount() || void 0 : void 0;
      return { id: module.tab, label: `${index + 1}. ${module.label}`, badge, module };
    }).filter((tab) => tab.module.id !== "GROWTH" || this.growth.growthEnabled()),
    ...ngDevMode ? [{ debugName: "tabs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeTab = computed(
    () => this.tabs().find((tab) => tab.id === this.selectedTab()) ?? this.tabs().find((tab) => tab.id === "resumen"),
    ...ngDevMode ? [{ debugName: "activeTab" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      const context = JSON.stringify([
        this.authService.currentUser()?.id ?? null,
        this.activePatientService.patientId()
      ]);
      const tabs = this.tabs();
      const canEdit = this.recordActions.has("EDIT_PATIENT");
      const canCreate = this.recordActions.has("NEW_ENCOUNTER");
      untracked(() => {
        if (context !== this.recordContext) {
          this.recordContext = context;
          this.isNewEncounterModalOpen.set(false);
          this.isEditPatientModalOpen.set(false);
          this.history.cancelCreatingEncounter();
        }
        if (!canEdit)
          this.isEditPatientModalOpen.set(false);
        if (!canCreate) {
          this.isNewEncounterModalOpen.set(false);
          this.history.cancelCreatingEncounter();
        }
        if (!tabs.some((tab) => tab.id === this.selectedTab()))
          this.selectedTab.set("resumen");
      });
    });
  }
  ngOnInit() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const idParam = params.get("id");
      if (idParam) {
        const id = Number(idParam);
        if (!isNaN(id) && id > 0) {
          this.activePatientService.loadPatient(id);
        }
      }
    });
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((queryParams) => {
      const tabParam = queryParams.get("tab");
      if (tabParam) {
        this.setTab(tabParam);
      }
      if (tabParam === "historia" && queryParams.get("nueva") === "true") {
        this.history.startCreatingEncounter();
        this.isNewEncounterModalOpen.set(true);
      }
    });
  }
  onEncounterCreated(event) {
    if (isPlatformBrowser(this.platformId)) {
      const patientId = this.activePatientService.patientId();
      const eventPatientId = event?.detail?.patientId;
      if (patientId && eventPatientId === patientId)
        this.activePatientService.loadPatient(patientId);
    }
  }
  setTab(tab) {
    if (!this.tabs().some((item) => item.id === tab))
      return;
    this.selectedTab.set(tab);
  }
  navigateToPatients() {
    this.router.navigate(["/pacientes"]);
  }
  openEditPatientModal(event) {
    if (!this.recordActions.has("EDIT_PATIENT"))
      return;
    if (event)
      event.stopPropagation();
    this.isEditPatientModalOpen.set(true);
    const patientId = this.activePatientService.patientId();
    if (patientId) {
      void this.router.navigate(["/pacientes", patientId, "editar"]);
    } else {
      void this.router.navigate(["/pacientes/nuevo"]);
    }
  }
  closeEditPatientModal() {
    this.isEditPatientModalOpen.set(false);
  }
  onPatientUpdated(updatedPatient) {
    this.isEditPatientModalOpen.set(false);
    if (updatedPatient.id && updatedPatient.id === this.activePatientService.patientId()) {
      this.activePatientService.setActivePatient(updatedPatient);
      this.activePatientService.loadPatient(updatedPatient.id);
    }
  }
  openNewEncounterModal(event) {
    if (!this.recordActions.has("NEW_ENCOUNTER"))
      return;
    if (event)
      event.stopPropagation();
    this.setTab("historia");
    this.history.startCreatingEncounter();
    this.isNewEncounterModalOpen.set(true);
  }
  closeNewEncounterModal() {
    this.history.cancelCreatingEncounter();
    this.isNewEncounterModalOpen.set(false);
  }
  printDocument() {
    if (this.recordActions.has("PRINT_DOCUMENT"))
      this.prescriptions.printRecord(this.history.encounters()[0]);
  }
  navigateToGrowthCurves() {
    if (!this.recordActions.has("VIEW_GROWTH"))
      return;
    this.setTab("curvas");
  }
  static \u0275fac = function PatientRecordComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientRecordComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PatientRecordComponent, selectors: [["app-patient-record"]], hostBindings: function PatientRecordComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("encounter-created", function PatientRecordComponent_encounter_created_HostBindingHandler($event) {
        return ctx.onEncounterCreated($event);
      }, \u0275\u0275resolveWindow)("encounter-updated", function PatientRecordComponent_encounter_updated_HostBindingHandler($event) {
        return ctx.onEncounterCreated($event);
      }, \u0275\u0275resolveWindow)("encounter-deleted", function PatientRecordComponent_encounter_deleted_HostBindingHandler($event) {
        return ctx.onEncounterCreated($event);
      }, \u0275\u0275resolveWindow);
    }
  }, features: [\u0275\u0275ProvidersFeature([
    PatientEncountersStore,
    PatientGrowthStore,
    PatientPrescriptionStore,
    PatientPrescriptionEditorStore,
    PatientStudiesStore,
    provideIcons({ lucideUser, lucideUsers, lucidePlus })
  ])], decls: 4, vars: 1, consts: [[1, "patient-record-page"], [1, "record-loading-card"], [1, "no-patient-card"], [1, "record-spinner"], [3, "newEncounter", "editPatient", "printSummary", "viewCurves", "patient"], ["aria-label", "Secciones de la ficha cl\xEDnica", 1, "flattened-tabs-nav"], ["type", "button", 1, "flat-tab-btn", 3, "active"], [1, "tab-content-area"], [3, "class"], ["type", "button", 1, "flat-tab-btn", 3, "click"], [1, "tab-counter-badge"], [3, "editPatient", "newEncounter", "patientUpdated", "recordModule", "patient", "latestEncounter"], [1, "no-patient-circle"], ["name", "lucideUser"], [1, "no-patient-title"], [1, "no-patient-desc"], [1, "no-patient-actions"], ["type", "button", 1, "cta-primary-btn", 3, "click"], ["name", "lucideUsers"], ["type", "button", 1, "secondary-outline-btn", 3, "click"], ["name", "lucidePlus"]], template: function PatientRecordComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, PatientRecordComponent_Conditional_1_Template, 6, 0, "div", 1)(2, PatientRecordComponent_Conditional_2_Template, 6, 2)(3, PatientRecordComponent_Conditional_3_Template, 16, 0, "div", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activePatientService.isLoading() && !ctx.activePatientService.activePatient() ? 1 : (tmp_0_0 = ctx.activePatientService.activePatient()) ? 2 : 3, tmp_0_0);
    }
  }, dependencies: [
    NgIcon,
    PatientBannerComponent,
    PatientRecordModuleDirective
  ], styles: ["\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  width: 100%;\n}\n.patient-record-page[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n  width: 100%;\n  flex: 1;\n}\n.cta-primary-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  background-color: #006874;\n  color: #ffffff;\n  border: none;\n  border-radius: 9px;\n  padding: 0.55rem 1rem;\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(0, 104, 116, 0.25);\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.cta-primary-btn[_ngcontent-%COMP%]:hover {\n  background-color: #00505a;\n}\n.flattened-tabs-nav[_ngcontent-%COMP%] {\n  display: flex;\n  border-bottom: 2px solid var(--%NS%dc-outline, #e2e8f0);\n  gap: 0.5rem;\n  background: var(--%NS%dc-surface, #ffffff);\n  padding: 0 0.5rem;\n  border-radius: 10px 10px 0 0;\n  overflow-x: auto;\n}\n.flat-tab-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.85rem 1.25rem;\n  background: transparent;\n  border: none;\n  border-bottom: 3px solid transparent;\n  margin-bottom: -2px;\n  font-size: 0.88rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  cursor: pointer;\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.flat-tab-btn[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.flat-tab-btn.active[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-teal-ink, #006874);\n  border-bottom-color: #006874;\n}\n.tab-counter-badge[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  background: var(--%NS%dc-teal-surface, #e6f6f8);\n  color: var(--%NS%dc-teal-ink, #006874);\n  padding: 2px 6px;\n  border-radius: 6px;\n}\n.tab-content-area[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.tab-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n.secondary-outline-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  background: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  color: var(--%NS%dc-ink-secondary, #334155);\n  border-radius: 8px;\n  padding: 0.45rem 0.85rem;\n  font-size: 0.82rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.secondary-outline-btn[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.no-patient-card[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 14px;\n  padding: 3.5rem 1.5rem;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.75rem;\n}\n.no-patient-circle[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  background: var(--%NS%dc-teal-surface, #f0fdfa);\n  color: var(--%NS%dc-teal-ink, #006874);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 2rem;\n  margin-bottom: 0.5rem;\n}\n.no-patient-title[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #0f172a);\n  margin: 0;\n}\n.no-patient-desc[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  max-width: 480px;\n  margin: 0;\n}\n.no-patient-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n}\n.record-loading-card[_ngcontent-%COMP%] {\n  padding: 3.5rem;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.75rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.record-spinner[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border: 3px solid var(--%NS%dc-outline, #e2e8f0);\n  border-top-color: #006874;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n}\n.animate-fade-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.15s ease-in-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(3px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media print {\n  .flattened-tabs-nav[_ngcontent-%COMP%], \n   .cta-primary-btn[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n}\n.module-outlet[_ngcontent-%COMP%] {\n  display: contents;\n}\n/*# sourceMappingURL=patient-record.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientRecordComponent, [{
    type: Component,
    args: [{ selector: "app-patient-record", imports: [
      NgIcon,
      PatientBannerComponent,
      PatientRecordModuleDirective
    ], providers: [
      PatientEncountersStore,
      PatientGrowthStore,
      PatientPrescriptionStore,
      PatientPrescriptionEditorStore,
      PatientStudiesStore,
      provideIcons({ lucideUser, lucideUsers, lucidePlus })
    ], template: `<div class="patient-record-page">
  @if (activePatientService.isLoading() && !activePatientService.activePatient()) {
    <div class="record-loading-card">
      <div class="record-spinner"></div>
      <h3>Cargando Ficha Cl\xEDnica...</h3>
      <p>Sincronizando informaci\xF3n del paciente con el servidor cl\xEDnico.</p>
    </div>
  } @else if (activePatientService.activePatient(); as patient) {
    <!-- 1. COMPACT CLINICAL PATIENT BANNER -->
    <app-patient-banner
      [patient]="patient"
      (newEncounter)="openNewEncounterModal()"
      (editPatient)="openEditPatientModal()"
      (printSummary)="printDocument()"
      (viewCurves)="navigateToGrowthCurves()"
    />

    <!-- 2. FLATTENED HORIZONTAL TABS -->
    <nav class="flattened-tabs-nav" aria-label="Secciones de la ficha cl\xEDnica">
      @for (tab of tabs(); track tab.id) {
        <button
          type="button"
          class="flat-tab-btn"
          [class.active]="activeTab()?.id === tab.id"
          (click)="setTab(tab.id)"
        >
          <span>{{ tab.label }}</span>
          @if (tab.badge != null && tab.badge !== '') {
            <span class="tab-counter-badge">{{ tab.badge }}</span>
          }
        </button>
      }
    </nav>

    <!-- Only configured modules can be mounted. Stores survive tab changes in the record scope. -->
    <div class="tab-content-area">
      @if (activeTab(); as tab) {
        <section
          [class]="tab.module.panel ? 'tab-panel animate-fade-in' : 'module-outlet'"
          [attr.aria-label]="tab.module.panel ? tab.module.label : null"
        >
          <ng-container
            [recordModule]="tab.module"
            [patient]="patient"
            [latestEncounter]="history.encounters()[0]"
            (editPatient)="openEditPatientModal()"
            (newEncounter)="openNewEncounterModal()"
            (patientUpdated)="activePatientService.setActivePatient($event)"
          />
        </section>
      }
    </div>
  } @else {
    <!-- Empty State when no patient is active -->
    <div class="no-patient-card">
      <div class="no-patient-circle">
        <ng-icon name="lucideUser" />
      </div>
      <h2 class="no-patient-title">No hay un paciente seleccionado</h2>
      <p class="no-patient-desc">
        Para visualizar o editar la Ficha Cl\xEDnica Integral, seleccione un paciente del Directorio
        unificado o registre uno nuevo en el sistema.
      </p>
      <div class="no-patient-actions">
        <button type="button" class="cta-primary-btn" (click)="navigateToPatients()">
          <ng-icon name="lucideUsers" />
          <span>Ir al Directorio de Pacientes</span>
        </button>
        <button type="button" class="secondary-outline-btn" (click)="openEditPatientModal($event)">
          <ng-icon name="lucidePlus" />
          <span>+ Registrar Nuevo Paciente</span>
        </button>
      </div>
    </div>
  }
</div>

`, styles: ["/* src/app/features/patient-record/patient-record.component.css */\n:host {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  width: 100%;\n}\n.patient-record-page {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n  width: 100%;\n  flex: 1;\n}\n.cta-primary-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  background-color: #006874;\n  color: #ffffff;\n  border: none;\n  border-radius: 9px;\n  padding: 0.55rem 1rem;\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(0, 104, 116, 0.25);\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.cta-primary-btn:hover {\n  background-color: #00505a;\n}\n.flattened-tabs-nav {\n  display: flex;\n  border-bottom: 2px solid var(--dc-outline, #e2e8f0);\n  gap: 0.5rem;\n  background: var(--dc-surface, #ffffff);\n  padding: 0 0.5rem;\n  border-radius: 10px 10px 0 0;\n  overflow-x: auto;\n}\n.flat-tab-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.85rem 1.25rem;\n  background: transparent;\n  border: none;\n  border-bottom: 3px solid transparent;\n  margin-bottom: -2px;\n  font-size: 0.88rem;\n  font-weight: 600;\n  color: var(--dc-ink-muted, #64748b);\n  cursor: pointer;\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.flat-tab-btn:hover {\n  color: var(--dc-ink, #0f172a);\n}\n.flat-tab-btn.active {\n  color: var(--dc-teal-ink, #006874);\n  border-bottom-color: #006874;\n}\n.tab-counter-badge {\n  font-size: 0.7rem;\n  background: var(--dc-teal-surface, #e6f6f8);\n  color: var(--dc-teal-ink, #006874);\n  padding: 2px 6px;\n  border-radius: 6px;\n}\n.tab-content-area {\n  width: 100%;\n}\n.tab-panel {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n.secondary-outline-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  background: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  color: var(--dc-ink-secondary, #334155);\n  border-radius: 8px;\n  padding: 0.45rem 0.85rem;\n  font-size: 0.82rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.secondary-outline-btn:hover {\n  background: var(--dc-surface-low, #f8fafc);\n  color: var(--dc-ink, #0f172a);\n}\n.no-patient-card {\n  background: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 14px;\n  padding: 3.5rem 1.5rem;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.75rem;\n}\n.no-patient-circle {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  background: var(--dc-teal-surface, #f0fdfa);\n  color: var(--dc-teal-ink, #006874);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 2rem;\n  margin-bottom: 0.5rem;\n}\n.no-patient-title {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: var(--dc-ink, #0f172a);\n  margin: 0;\n}\n.no-patient-desc {\n  font-size: 0.88rem;\n  color: var(--dc-ink-muted, #64748b);\n  max-width: 480px;\n  margin: 0;\n}\n.no-patient-actions {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n}\n.record-loading-card {\n  padding: 3.5rem;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.75rem;\n  color: var(--dc-ink-muted, #64748b);\n}\n.record-spinner {\n  width: 24px;\n  height: 24px;\n  border: 3px solid var(--dc-outline, #e2e8f0);\n  border-top-color: #006874;\n  border-radius: 50%;\n  animation: spin 0.7s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n}\n.animate-fade-in {\n  animation: fadeIn 0.15s ease-in-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(3px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media print {\n  .flattened-tabs-nav,\n  .cta-primary-btn {\n    display: none !important;\n  }\n}\n.module-outlet {\n  display: contents;\n}\n/*# sourceMappingURL=patient-record.component.css.map */\n"] }]
  }], () => [], { onEncounterCreated: [{
    type: HostListener,
    args: ["window:encounter-created", ["$event"]]
  }, {
    type: HostListener,
    args: ["window:encounter-updated", ["$event"]]
  }, {
    type: HostListener,
    args: ["window:encounter-deleted", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PatientRecordComponent, { className: "PatientRecordComponent", filePath: "src/app/features/patient-record/patient-record.component.ts", lineNumber: 61 });
})();
export {
  PatientRecordComponent
};
//# debugId=91145841-57d3-5918-abf0-c90bde0cf432
//# sourceMappingURL=chunk-XXWDYLUT.js.map
