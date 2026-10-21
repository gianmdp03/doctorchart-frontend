import {
  displayLocalDate
} from "./chunk-6MPLKXQY.js";
import {
  wizardRecordEntries
} from "./chunk-X5CFNW5T.js";
import {
  getTotalElements,
  getTotalPages
} from "./chunk-BGC6F3KO.js";
import {
  AccountReadScope
} from "./chunk-XSB2SWVD.js";
import {
  ClinicalEncounterService
} from "./chunk-AZ6E4AKD.js";
import {
  ActivePatientService,
  PatientService,
  UserClockService
} from "./chunk-C5KB4SWE.js";
import {
  instantParts,
  userTimeZone
} from "./chunk-YTAXUAO7.js";
import {
  WorkspaceStore
} from "./chunk-WPGAV52V.js";
import "./chunk-USM5S45Q.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  ɵNgSelectMultipleOption
} from "./chunk-BQIFWLNB.js";
import {
  AuthService
} from "./chunk-5XEBCQUW.js";
import "./chunk-WKCAPCQH.js";
import {
  NgIcon,
  lucideArrowRight,
  lucideCalendar,
  lucideCheckCircle2,
  lucideChevronLeft,
  lucideChevronRight,
  lucideClock,
  lucideEye,
  lucideFileText,
  lucideRefreshCw,
  lucideSearch,
  lucideSparkles,
  lucideStethoscope,
  lucideUserPlus,
  lucideUsers,
  provideIcons
} from "./chunk-Z3UJ4PSI.js";
import "./chunk-WBCHXDEU.js";
import {
  Router,
  RouterLink
} from "./chunk-XM57RTTR.js";
import "./chunk-YAYJVLGH.js";
import "./chunk-SYX7XZ26.js";
import {
  Component,
  DestroyRef,
  HostListener,
  __spreadProps,
  __spreadValues,
  computed,
  effect,
  inject,
  setClassMetadata,
  signal,
  takeUntil,
  untracked,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
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
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-3HO5VEWU.js";

// src/app/features/dashboard/dashboard.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function DashboardComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 80);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_8_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadKpiData());
    });
    \u0275\u0275text(3, " Reintentar ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx, " ");
  }
}
function DashboardComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 14);
  }
}
function DashboardComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.totalPatients() ?? "\u2014");
  }
}
function DashboardComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 14);
  }
}
function DashboardComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.encountersMonthCount() ?? "\u2014");
  }
}
function DashboardComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 14);
  }
}
function DashboardComponent_Conditional_43_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 81);
    \u0275\u0275text(1, "Actividad del d\xEDa");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, DashboardComponent_Conditional_43_Conditional_2_Template, 2, 0, "span", 81);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.encountersTodayCount() ?? "\u2014");
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r1.encountersTodayCount() ?? 0) > 0 ? 2 : -1);
  }
}
function DashboardComponent_Conditional_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275element(1, "div", 82);
    \u0275\u0275text(2, " Cargando consultas... ");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_78_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275element(1, "ng-icon", 83);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "No pudimos cargar el historial");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 84);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_78_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadRecentPage(ctx_r1.recentPage()));
    });
    \u0275\u0275text(7, " Reintentar consultas ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx);
  }
}
function DashboardComponent_Conditional_79_For_9_Conditional_12_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 100)(1, "b");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275property("title", item_r6.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", item_r6.label, ":");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r6.value, " ");
  }
}
function DashboardComponent_Conditional_79_For_9_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, DashboardComponent_Conditional_79_For_9_Conditional_12_For_1_Template, 4, 3, "p", 100, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const encounter_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275repeater(encounter_r7.clinicalHighlights);
  }
}
function DashboardComponent_Conditional_79_For_9_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const encounter_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(encounter_r7.chiefComplaint);
  }
}
function DashboardComponent_Conditional_79_For_9_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 105);
    \u0275\u0275text(1, "Hoy");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_79_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 96)(1, "div", 97)(2, "div", 98);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 99)(5, "h3", 100);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 101);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 102);
    \u0275\u0275conditionalCreate(12, DashboardComponent_Conditional_79_For_9_Conditional_12_Template, 2, 0)(13, DashboardComponent_Conditional_79_For_9_Conditional_13_Template, 2, 1, "p");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 103)(15, "div", 104)(16, "span");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(18, DashboardComponent_Conditional_79_For_9_Conditional_18_Template, 2, 0, "span", 105);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 106);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 107)(22, "button", 108);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_79_For_9_Template_button_click_22_listener($event) {
      const encounter_r7 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openEncounterDetail(encounter_r7.id, $event));
    });
    \u0275\u0275element(23, "ng-icon", 109);
    \u0275\u0275text(24, " Ver consulta ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 110);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_79_For_9_Template_button_click_25_listener() {
      const encounter_r7 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openPatient(encounter_r7.patientId));
    });
    \u0275\u0275text(26, " Ficha ");
    \u0275\u0275element(27, "ng-icon", 18);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const encounter_r7 = ctx.$implicit;
    \u0275\u0275classProp("consultation-today", encounter_r7.isToday);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", encounter_r7.patientName.slice(0, 2).toUpperCase(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("title", encounter_r7.patientName);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(encounter_r7.patientName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(encounter_r7.patientMeta);
    \u0275\u0275advance();
    \u0275\u0275classProp("type-emergency", encounter_r7.consultationTypeKey === "EMERGENCY")("type-first", encounter_r7.consultationTypeKey === "FIRST_VISIT");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(encounter_r7.consultationTypeLabel);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(encounter_r7.clinicalHighlights.length > 0 ? 12 : 13);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(encounter_r7.encounterDateOnly);
    \u0275\u0275advance();
    \u0275\u0275conditional(encounter_r7.isToday ? 18 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(encounter_r7.encounterTimeOnly);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-label", "Ver consulta de " + encounter_r7.patientName);
    \u0275\u0275advance(3);
    \u0275\u0275attribute("aria-label", "Abrir ficha de " + encounter_r7.patientName);
  }
}
function DashboardComponent_Conditional_79_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 111);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_79_For_21_Template_button_click_0_listener() {
      const page_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.loadRecentPage(page_r9));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const page_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("current-page", page_r9 === ctx_r1.recentPage());
    \u0275\u0275attribute("aria-current", page_r9 === ctx_r1.recentPage() ? "page" : null)("aria-label", "P\xE1gina " + (page_r9 + 1) + " de consultas");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", page_r9 + 1, " ");
  }
}
function DashboardComponent_Conditional_79_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 85)(1, "span");
    \u0275\u0275text(2, "Paciente y atenci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Resumen cl\xEDnico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "Fecha y acciones");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 86);
    \u0275\u0275repeaterCreate(8, DashboardComponent_Conditional_79_For_9_Template, 28, 17, "article", 87, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "footer", 88)(11, "span", 89)(12, "b");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, " consultas ");
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "nav", 90)(18, "button", 91);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_79_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadRecentPage(ctx_r1.recentPage() - 1));
    });
    \u0275\u0275element(19, "ng-icon", 92);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(20, DashboardComponent_Conditional_79_For_21_Template, 2, 5, "button", 93, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(22, "button", 94);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_79_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadRecentPage(ctx_r1.recentPage() + 1));
    });
    \u0275\u0275element(23, "ng-icon", 95);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r1.recentPageItems());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.recentRange());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("\xB7 P\xE1gina ", ctx_r1.recentPage() + 1, " de ", ctx_r1.recentTotalPages());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.recentPage() === 0);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.recentPageNumbers());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.recentPage() + 1 >= ctx_r1.recentTotalPages());
  }
}
function DashboardComponent_Conditional_80_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 84);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_80_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clearRecentSearch());
    });
    \u0275\u0275text(1, " Limpiar b\xFAsqueda ");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275element(1, "ng-icon", 112);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, DashboardComponent_Conditional_80_Conditional_6_Template, 2, 0, "button", 113);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.recentSearch().trim() ? "No encontramos esas consultas" : "Tu actividad cl\xEDnica empieza aqu\xED", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.recentSearch().trim() ? "Prob\xE1 con otro nombre, motivo o diagn\xF3stico." : "Al registrar una atenci\xF3n, podr\xE1s encontrarla aqu\xED y acceder a su historia cl\xEDnica.", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.recentSearch().trim() ? 6 : -1);
  }
}
function DashboardComponent_Conditional_94_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "button", 80);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_94_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadDirectory(ctx_r1.directoryPage(), ctx_r1.directorySearch()));
    });
    \u0275\u0275text(3, " Reintentar ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx, " ");
  }
}
function DashboardComponent_Conditional_95_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275element(1, "div", 82);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Buscando pacientes...");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_Conditional_96_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "span", 120);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td")(5, "span", 121);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td")(8, "button", 122);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_96_For_12_Template_button_click_8_listener() {
      const patient_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openPatient(patient_r14.id));
    });
    \u0275\u0275text(9, " Abrir ficha ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const patient_r14 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(patient_r14.fullName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.displayDate(patient_r14.birthDate));
  }
}
function DashboardComponent_Conditional_96_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 114)(1, "table", 115)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Paciente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Fecha de nacimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Acci\xF3n");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "tbody");
    \u0275\u0275repeaterCreate(11, DashboardComponent_Conditional_96_For_12_Template, 10, 2, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 116)(14, "span", 117);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 118)(17, "button", 119);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_96_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadDirectory(ctx_r1.directoryPage() - 1, ctx_r1.directorySearch()));
    });
    \u0275\u0275element(18, "ng-icon", 92);
    \u0275\u0275text(19, " Anterior");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 119);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_96_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadDirectory(ctx_r1.directoryPage() + 1, ctx_r1.directorySearch()));
    });
    \u0275\u0275text(21, " Siguiente ");
    \u0275\u0275element(22, "ng-icon", 95);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r1.directoryPatients());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("P\xE1gina ", ctx_r1.directoryPage() + 1, " de ", ctx_r1.directoryTotalPages());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.directoryPage() === 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.directoryPage() + 1 >= ctx_r1.directoryTotalPages());
  }
}
function DashboardComponent_Conditional_97_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59)(1, "p", 123);
    \u0275\u0275text(2, "No se encontraron pacientes.");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_Conditional_119_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 74);
    \u0275\u0275element(1, "ng-icon", 124);
    \u0275\u0275text(2, " Guardado");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_125_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Guardando... ");
  }
}
function DashboardComponent_Conditional_125_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Guardar ");
  }
}
function DashboardComponent_Conditional_125_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 125);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_125_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveNotes());
    });
    \u0275\u0275conditionalCreate(1, DashboardComponent_Conditional_125_Conditional_1_Template, 1, 0)(2, DashboardComponent_Conditional_125_Conditional_2_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.isSavingNotes());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSavingNotes() ? 1 : 2);
  }
}
var DashboardComponent = class _DashboardComponent {
  authService = inject(AuthService);
  patientService = inject(PatientService);
  activePatientService = inject(ActivePatientService);
  clinicalEncounterService = inject(ClinicalEncounterService);
  workspaceStore = inject(WorkspaceStore);
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  totalPatients = signal(
    null,
    ...ngDevMode ? [{ debugName: "totalPatients" }] : (
      /* istanbul ignore next */
      []
    )
  );
  encountersMonthCount = signal(
    null,
    ...ngDevMode ? [{ debugName: "encountersMonthCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  encountersTodayCount = signal(
    null,
    ...ngDevMode ? [{ debugName: "encountersTodayCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoadingMetrics = signal(
    true,
    ...ngDevMode ? [{ debugName: "isLoadingMetrics" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recentEncounters = signal(
    [],
    ...ngDevMode ? [{ debugName: "recentEncounters" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recentRecords = signal(
    [],
    ...ngDevMode ? [{ debugName: "recentRecords" }] : (
      /* istanbul ignore next */
      []
    )
  );
  clock = inject(UserClockService);
  activityDay = signal(
    this.userDay(),
    ...ngDevMode ? [{ debugName: "activityDay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recentSearch = signal(
    "",
    ...ngDevMode ? [{ debugName: "recentSearch" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recentPage = signal(
    0,
    ...ngDevMode ? [{ debugName: "recentPage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recentPageSize = signal(
    5,
    ...ngDevMode ? [{ debugName: "recentPageSize" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recentTotal = signal(
    0,
    ...ngDevMode ? [{ debugName: "recentTotal" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recentTotalPages = signal(
    1,
    ...ngDevMode ? [{ debugName: "recentTotalPages" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recentPageError = signal(
    null,
    ...ngDevMode ? [{ debugName: "recentPageError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoadingRecentPage = signal(
    true,
    ...ngDevMode ? [{ debugName: "isLoadingRecentPage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recentPageItems = computed(
    () => this.recentRecords().map((encounter) => {
      const date = new Date(encounter.encounterDate);
      const localDate = Number.isFinite(date.getTime()) ? this.userDay(date) : "";
      const item = this.mapToRecentEncounterItem({ encounter, encounterLocalDate: localDate, patientAgeLabel: "", patientNationalId: null }, this.activityDay());
      const known = this.recentEncounters().find((e) => e.patientId === encounter.patientId && e.patientName === item.patientName);
      return __spreadProps(__spreadValues({}, item), { patientMeta: known?.patientMeta ?? item.patientMeta });
    }),
    ...ngDevMode ? [{ debugName: "recentPageItems" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recentRange = computed(
    () => {
      const count = this.recentPageItems().length;
      const start = count ? this.recentPage() * this.recentPageSize() + 1 : 0;
      return `${start}\u2013${count ? start + count - 1 : 0} de ${this.recentTotal()}`;
    },
    ...ngDevMode ? [{ debugName: "recentRange" }] : (
      /* istanbul ignore next */
      []
    )
  );
  recentPageNumbers = computed(
    () => {
      const count = Math.min(5, this.recentTotalPages());
      const start = Math.max(0, Math.min(this.recentPage() - 2, this.recentTotalPages() - count));
      return Array.from({ length: count }, (_, i) => start + i);
    },
    ...ngDevMode ? [{ debugName: "recentPageNumbers" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoadingRecent = signal(
    true,
    ...ngDevMode ? [{ debugName: "isLoadingRecent" }] : (
      /* istanbul ignore next */
      []
    )
  );
  metricsError = signal(
    null,
    ...ngDevMode ? [{ debugName: "metricsError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  directoryError = signal(
    null,
    ...ngDevMode ? [{ debugName: "directoryError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  displayDate = displayLocalDate;
  directoryPatients = signal(
    [],
    ...ngDevMode ? [{ debugName: "directoryPatients" }] : (
      /* istanbul ignore next */
      []
    )
  );
  directorySearch = signal(
    "",
    ...ngDevMode ? [{ debugName: "directorySearch" }] : (
      /* istanbul ignore next */
      []
    )
  );
  directoryPage = signal(
    0,
    ...ngDevMode ? [{ debugName: "directoryPage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  directoryTotalPages = signal(
    1,
    ...ngDevMode ? [{ debugName: "directoryTotalPages" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSearchingDirectory = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSearchingDirectory" }] : (
      /* istanbul ignore next */
      []
    )
  );
  quickNotes = signal(
    "",
    ...ngDevMode ? [{ debugName: "quickNotes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isNotesDirty = signal(
    false,
    ...ngDevMode ? [{ debugName: "isNotesDirty" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSavingNotes = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSavingNotes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isNotesSaved = signal(
    false,
    ...ngDevMode ? [{ debugName: "isNotesSaved" }] : (
      /* istanbul ignore next */
      []
    )
  );
  todayDateString = computed(
    () => new Date(this.clock.now()).toLocaleDateString("es-AR", {
      timeZone: userTimeZone(),
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }),
    ...ngDevMode ? [{ debugName: "todayDateString" }] : (
      /* istanbul ignore next */
      []
    )
  );
  greeting = computed(
    () => {
      const hour = new Date(this.clock.now()).getHours();
      const prefix = hour >= 20 || hour < 6 ? "Buenas noches" : hour >= 13 ? "Buenas tardes" : "Buen d\xEDa";
      const name = this.authService.userName();
      return name ? `${prefix}, Dr(a). ${name}` : `${prefix}, Doctor(a)`;
    },
    ...ngDevMode ? [{ debugName: "greeting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  directorySearchTimer = null;
  recentSearchTimer = null;
  recentReads = new AccountReadScope(() => {
    this.recentSearch.set("");
    this.recentPageSize.set(5);
    this.loadRecentPage(0);
  });
  metricsReads = new AccountReadScope(() => this.loadKpiData());
  directoryReads = new AccountReadScope(() => {
    this.directorySearch.set("");
    this.loadDirectory(0);
  });
  constructor() {
    let observedDay = this.clock.day();
    let observedZone = this.clock.timeZone();
    effect(() => {
      const day = this.clock.day();
      const zone = this.clock.timeZone();
      if (day !== observedDay || zone !== observedZone) {
        observedDay = day;
        observedZone = zone;
        untracked(() => this.loadKpiData());
      }
    });
    this.destroyRef.onDestroy(() => {
      if (this.directorySearchTimer) {
        clearTimeout(this.directorySearchTimer);
      }
      if (this.recentSearchTimer)
        clearTimeout(this.recentSearchTimer);
    });
  }
  ngOnInit() {
    this.loadKpiData();
    this.loadRecentPage(0);
    this.loadDirectory(0);
    this.hydrateNotes();
  }
  onClinicalDataChanged() {
    this.loadKpiData();
    this.loadRecentPage(0);
    this.loadDirectory(0, this.directorySearch());
  }
  loadKpiData() {
    const current = this.metricsReads.begin();
    this.totalPatients.set(null);
    this.encountersMonthCount.set(null);
    this.encountersTodayCount.set(null);
    this.recentEncounters.set([]);
    this.metricsError.set(null);
    if (!this.metricsReads.authenticated()) {
      this.isLoadingMetrics.set(false);
      this.isLoadingRecent.set(false);
      return;
    }
    this.isLoadingMetrics.set(true);
    this.isLoadingRecent.set(true);
    this.clinicalEncounterService.getDashboard().pipe(takeUntil(this.metricsReads.canceled)).subscribe({
      next: (activity) => {
        if (!current())
          return;
        this.totalPatients.set(activity.totalPatients);
        this.activityDay.set(activity.asOfDate);
        this.encountersMonthCount.set(activity.encountersThisMonth);
        this.encountersTodayCount.set(activity.encountersToday);
        this.recentEncounters.set(activity.recentEncounters.map((recent) => this.mapToRecentEncounterItem(recent, activity.asOfDate)));
        this.isLoadingMetrics.set(false);
        this.isLoadingRecent.set(false);
      },
      error: () => {
        if (current()) {
          this.metricsError.set("No se pudo cargar la actividad cl\xEDnica.");
          this.isLoadingMetrics.set(false);
          this.isLoadingRecent.set(false);
        }
      }
    });
  }
  userDay(date = /* @__PURE__ */ new Date()) {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: userTimeZone(),
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(date);
  }
  loadRecentPage(page) {
    if (this.recentSearchTimer)
      clearTimeout(this.recentSearchTimer);
    this.recentSearchTimer = null;
    const current = this.recentReads.begin();
    this.recentRecords.set([]);
    this.recentPageError.set(null);
    this.recentPage.set(Math.max(0, page));
    this.recentTotal.set(0);
    this.recentTotalPages.set(1);
    if (!this.recentReads.authenticated()) {
      this.isLoadingRecentPage.set(false);
      return;
    }
    this.isLoadingRecentPage.set(true);
    this.clinicalEncounterService.getAll(this.recentPage(), this.recentPageSize(), "encounterDate,desc", this.recentSearch().trim()).pipe(takeUntil(this.recentReads.canceled)).subscribe({
      next: (response) => {
        if (!current())
          return;
        const totalPages = Math.max(1, getTotalPages(response));
        if (page >= totalPages && getTotalElements(response) > 0) {
          this.loadRecentPage(totalPages - 1);
          return;
        }
        this.recentRecords.set(response.content);
        this.recentTotal.set(getTotalElements(response));
        this.recentTotalPages.set(totalPages);
        this.isLoadingRecentPage.set(false);
      },
      error: () => {
        if (!current())
          return;
        this.recentPageError.set("No se pudieron cargar las consultas. Reintent\xE1 para continuar.");
        this.isLoadingRecentPage.set(false);
      }
    });
  }
  onRecentSearchInput(event) {
    this.recentSearch.set(event.target.value);
    this.recentReads.cancel();
    this.recentRecords.set([]);
    this.isLoadingRecentPage.set(true);
    if (this.recentSearchTimer)
      clearTimeout(this.recentSearchTimer);
    this.recentSearchTimer = setTimeout(() => this.loadRecentPage(0), 350);
  }
  clearRecentSearch() {
    this.recentSearch.set("");
    this.loadRecentPage(0);
  }
  refreshRecentActivity() {
    this.loadKpiData();
    this.loadRecentPage(this.recentPage());
  }
  changeRecentPageSize(value) {
    const size = Number(value);
    if (![5, 10, 20].includes(size))
      return;
    this.recentPageSize.set(size);
    this.loadRecentPage(0);
  }
  loadDirectory(page, search) {
    if (this.directorySearchTimer) {
      clearTimeout(this.directorySearchTimer);
      this.directorySearchTimer = null;
    }
    const current = this.directoryReads.begin();
    this.directoryPatients.set([]);
    this.directoryError.set(null);
    this.directoryPage.set(page);
    if (!this.directoryReads.authenticated()) {
      this.isSearchingDirectory.set(false);
      return;
    }
    this.isSearchingDirectory.set(true);
    this.patientService.getPatients(page, 6, "fullName,asc", search).pipe(takeUntil(this.directoryReads.canceled)).subscribe({
      next: (response) => {
        if (current()) {
          this.directoryPatients.set(response.content);
          this.directoryPage.set(page);
          this.directoryTotalPages.set(getTotalPages(response));
          this.isSearchingDirectory.set(false);
        }
      },
      error: () => {
        if (current()) {
          this.directoryError.set("No se pudo cargar el directorio.");
          this.isSearchingDirectory.set(false);
        }
      }
    });
  }
  onDirectorySearchInput(event) {
    const query = event.target.value;
    this.directorySearch.set(query);
    if (this.directorySearchTimer) {
      clearTimeout(this.directorySearchTimer);
    }
    this.directorySearchTimer = setTimeout(() => {
      this.loadDirectory(0, query.trim());
    }, 400);
  }
  onDirectorySearchEnter() {
    if (this.directorySearchTimer) {
      clearTimeout(this.directorySearchTimer);
      this.directorySearchTimer = null;
    }
    this.loadDirectory(0, this.directorySearch().trim());
  }
  openPatient(patientId) {
    this.activePatientService.loadPatient(patientId);
    this.router.navigate(["/pacientes", patientId]);
  }
  openEncounterDetail(encounterId, event) {
    if (event)
      event.stopPropagation();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-encounter-detail-modal", { detail: { encounterId } }));
    }
  }
  hydrateNotes() {
    this.quickNotes.set(this.workspaceStore.quickNotes() || "");
    this.isNotesDirty.set(false);
  }
  onNotesInput(content) {
    this.quickNotes.set(content);
    this.isNotesDirty.set(content !== (this.workspaceStore.quickNotes() || ""));
    this.isNotesSaved.set(false);
  }
  async saveNotes() {
    if (!this.isNotesDirty() || this.isSavingNotes())
      return;
    this.isSavingNotes.set(true);
    this.isNotesSaved.set(false);
    try {
      await this.workspaceStore.updateQuickNotes(this.quickNotes());
      this.isNotesDirty.set(false);
      this.isNotesSaved.set(true);
    } finally {
      this.isSavingNotes.set(false);
    }
  }
  mapToRecentEncounterItem(recent, asOfDate) {
    const encounter = recent.encounter;
    const date = new Date(encounter.encounterDate);
    const validDate = !Number.isNaN(date.getTime());
    const isToday = recent.encounterLocalDate === asOfDate;
    const encounterDateOnly = displayLocalDate(recent.encounterLocalDate);
    const encounterTimeOnly = validDate ? instantParts(date).time + " hs" : "";
    const encounterDate = encounterTimeOnly ? encounterDateOnly + " \u2022 " + encounterTimeOnly : encounterDateOnly;
    const patientName = encounter.patientFullName || "Paciente #" + encounter.patientId;
    const patientMeta = [recent.patientAgeLabel, recent.patientNationalId ? "DNI " + recent.patientNationalId : ""].filter(Boolean).join(" \u2022 ") || "HC #" + encounter.patientId;
    const consultationTypeLabel = this.getConsultationTypeLabel(encounter.consultationType);
    const clinicalHighlights = this.extractClinicalHighlights(encounter);
    const chiefComplaint = encounter.chiefComplaint || clinicalHighlights[0]?.value || "Consulta cl\xEDnica";
    const diagnosis = encounter.primaryDiagnosisDescription && encounter.primaryDiagnosisDescription !== encounter.chiefComplaint ? encounter.primaryDiagnosisDescription : clinicalHighlights[1]?.value || encounter.primaryDiagnosisDescription || "\u2014";
    return {
      id: encounter.id,
      patientId: encounter.patientId,
      patientName,
      patientMeta,
      encounterDate,
      encounterDateOnly,
      encounterTimeOnly,
      isToday,
      consultationTypeLabel,
      consultationTypeKey: encounter.consultationType || "FIRST_VISIT",
      chiefComplaint,
      diagnosis,
      diagnosisCode: encounter.primaryDiagnosisCode,
      clinicalHighlights
    };
  }
  extractClinicalHighlights(encounter) {
    const highlights = [];
    highlights.push(...wizardRecordEntries(encounter).slice(0, 3));
    if (highlights.length === 0) {
      if (encounter.chiefComplaint) {
        highlights.push({ label: "Motivo", value: encounter.chiefComplaint });
      }
      if (encounter.primaryDiagnosisDescription && encounter.primaryDiagnosisDescription !== encounter.chiefComplaint) {
        const diagVal = encounter.primaryDiagnosisCode ? `[${encounter.primaryDiagnosisCode}] ${encounter.primaryDiagnosisDescription}` : encounter.primaryDiagnosisDescription;
        highlights.push({ label: "Diagn\xF3stico", value: diagVal });
      }
      if (encounter.measurements?.weightKg) {
        highlights.push({ label: "Peso", value: `${encounter.measurements.weightKg} kg` });
      }
      if (encounter.vitalSigns?.systolicBloodPressure && encounter.vitalSigns?.diastolicBloodPressure) {
        highlights.push({
          label: "TA",
          value: `${encounter.vitalSigns.systolicBloodPressure}/${encounter.vitalSigns.diastolicBloodPressure} mmHg`
        });
      }
    }
    return highlights;
  }
  getConsultationTypeLabel(type) {
    switch (type) {
      case "FIRST_VISIT":
        return "Primera consulta";
      case "FOLLOW_UP":
        return "Control / Seguimiento";
      case "ROUTINE_CHECKUP":
        return "Chequeo de rutina";
      case "EMERGENCY":
        return "Urgencia";
      case "INTERCONSULTATION":
        return "Interconsulta";
      default:
        return "Consulta m\xE9dica";
    }
  }
  static \u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], hostBindings: function DashboardComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("patient-created", function DashboardComponent_patient_created_HostBindingHandler() {
        return ctx.onClinicalDataChanged();
      }, \u0275\u0275resolveWindow)("patient-updated", function DashboardComponent_patient_updated_HostBindingHandler() {
        return ctx.onClinicalDataChanged();
      }, \u0275\u0275resolveWindow)("patient-deleted", function DashboardComponent_patient_deleted_HostBindingHandler() {
        return ctx.onClinicalDataChanged();
      }, \u0275\u0275resolveWindow)("encounter-created", function DashboardComponent_encounter_created_HostBindingHandler() {
        return ctx.onClinicalDataChanged();
      }, \u0275\u0275resolveWindow)("encounter-updated", function DashboardComponent_encounter_updated_HostBindingHandler() {
        return ctx.onClinicalDataChanged();
      }, \u0275\u0275resolveWindow)("encounter-deleted", function DashboardComponent_encounter_deleted_HostBindingHandler() {
        return ctx.onClinicalDataChanged();
      }, \u0275\u0275resolveWindow)("auth-success", function DashboardComponent_auth_success_HostBindingHandler() {
        return ctx.onClinicalDataChanged();
      }, \u0275\u0275resolveWindow);
    }
  }, features: [\u0275\u0275ProvidersFeature([
    provideIcons({
      lucideArrowRight,
      lucideCalendar,
      lucideCheckCircle2,
      lucideChevronLeft,
      lucideChevronRight,
      lucideClock,
      lucideEye,
      lucideFileText,
      lucideSearch,
      lucideRefreshCw,
      lucideSparkles,
      lucideStethoscope,
      lucideUserPlus,
      lucideUsers
    })
  ])], decls: 126, vars: 17, consts: [[1, "dashboard-page"], [1, "dashboard-welcome-header"], [1, "welcome-text-group"], [1, "welcome-title-row"], [1, "welcome-title"], [1, "welcome-subtitle"], ["role", "alert"], ["aria-label", "M\xE9tricas principales", 1, "kpi-grid"], ["role", "region", "aria-label", "Total de pacientes", 1, "kpi-card"], [1, "kpi-header"], [1, "kpi-title"], [1, "kpi-icon-wrap", "bg-blue-50", "text-blue-600"], ["name", "lucideUsers"], [1, "kpi-value-row"], [1, "kpi-loading-skeleton"], [1, "kpi-number"], [1, "kpi-footer"], ["routerLink", "/pacientes", 1, "kpi-link"], ["name", "lucideArrowRight"], ["role", "region", "aria-label", "Consultas del mes", 1, "kpi-card"], [1, "kpi-icon-wrap", "bg-teal-50", "text-teal-600"], ["name", "lucideStethoscope"], [1, "kpi-subtext"], ["role", "region", "aria-label", "Consultas de hoy", 1, "kpi-card"], [1, "kpi-icon-wrap", "bg-purple-50", "text-purple-600"], ["name", "lucideClock"], ["aria-labelledby", "recent-activity-title", 1, "content-card", "recent-activity-card"], [1, "recent-card-heading"], ["aria-hidden", "true", 1, "recent-heading-icon"], [1, "recent-heading-text"], [1, "recent-eyebrow"], ["id", "recent-activity-title"], ["routerLink", "/consultas", 1, "recent-history-link"], [1, "recent-toolbar"], [1, "recent-search-wrap"], ["name", "lucideSearch", "aria-hidden", "true"], ["type", "search", "aria-label", "Buscar consultas por paciente, motivo o diagn\xF3stico", "placeholder", "Buscar paciente, motivo o diagn\xF3stico...", 3, "input", "keydown.enter", "value"], ["type", "button", 1, "recent-refresh-btn", 3, "click", "disabled"], ["name", "lucideRefreshCw"], [1, "recent-size-label"], ["aria-label", "Consultas por p\xE1gina", 3, "change", "value", "disabled"], ["value", "5"], ["value", "10"], ["value", "20"], ["role", "status", 1, "recent-loading"], ["role", "alert", 1, "recent-empty"], [1, "recent-empty"], [1, "dashboard-main-split"], [1, "dashboard-primary-col"], [1, "content-card", "patients-directory-card"], [1, "card-header-row"], [1, "header-title-wrap"], [1, "card-title"], ["name", "lucideUsers", 1, "title-icon", "text-blue-600"], [1, "card-subtitle"], [1, "directory-search-box"], ["name", "lucideSearch", 1, "search-box-icon"], ["type", "search", "placeholder", "Buscar paciente...", 1, "directory-search-input", 3, "input", "keydown.enter", "value"], [1, "card-loading-state"], [1, "empty-state-wrap"], [1, "dashboard-side-col"], [1, "content-card"], [1, "widget-header"], [1, "widget-title"], ["name", "lucideSparkles", 1, "text-amber-500"], [1, "quick-actions-list"], ["routerLink", "/pacientes", 1, "quick-action-btn"], [1, "qa-icon-wrap", "bg-teal-100", "text-teal-700"], [1, "qa-text"], [1, "qa-title"], [1, "qa-desc"], [1, "content-card", "quick-notes-card"], [1, "flex", "items-center", "gap-1.5"], ["name", "lucideFileText", 1, "text-slate-500"], [1, "text-xs", "text-emerald-600", "flex", "items-center", "gap-1"], [1, "notes-widget-body"], ["placeholder", "Escrib\xED recordatorios r\xE1pidos o pendientes...", "rows", "4", 1, "notes-textarea", 3, "ngModelChange", "ngModel"], [1, "notes-actions"], [1, "notes-footer-hint"], ["type", "button", 1, "save-notes-button", 3, "disabled"], ["type", "button", 1, "secondary-outline-btn", "btn-xs", 3, "click"], [1, "kpi-badge-trend", "positive"], [1, "mini-spinner"], ["name", "lucideFileText"], ["type", "button", 1, "secondary-outline-btn", "btn-sm", 3, "click"], ["aria-hidden", "true", 1, "recent-column-labels"], ["role", "list", "aria-label", "Consultas recientes", 1, "recent-consultation-list"], ["role", "listitem", 1, "recent-consultation", 3, "consultation-today"], [1, "recent-pagination"], ["role", "status", "aria-live", "polite", 1, "recent-count"], ["aria-label", "P\xE1ginas de consultas recientes", 1, "recent-page-buttons"], ["type", "button", "aria-label", "P\xE1gina anterior de consultas", 3, "click", "disabled"], ["name", "lucideChevronLeft"], ["type", "button", 3, "current-page"], ["type", "button", "aria-label", "P\xE1gina siguiente de consultas", 3, "click", "disabled"], ["name", "lucideChevronRight"], ["role", "listitem", 1, "recent-consultation"], [1, "recent-patient"], ["aria-hidden", "true", 1, "recent-avatar"], [1, "recent-patient-info"], [3, "title"], [1, "consultation-type-pill"], [1, "recent-clinical-summary"], [1, "recent-date-actions"], [1, "recent-date"], [1, "today-pill-badge"], [1, "recent-time"], [1, "recent-actions"], ["type", "button", 1, "recent-detail-btn", 3, "click"], ["name", "lucideEye"], ["type", "button", 1, "recent-record-btn", 3, "click"], ["type", "button", 3, "click"], ["name", "lucideSearch"], ["type", "button", 1, "secondary-outline-btn", "btn-sm"], [1, "encounters-table-wrap"], [1, "clinical-table"], [1, "table-pagination-row"], [1, "pagination-info"], [1, "pagination-btns"], ["type", "button", 1, "btn-page", 3, "click", "disabled"], [1, "patient-cell-name"], [1, "cell-datetime"], ["type", "button", 1, "btn-open-record", 3, "click"], [1, "empty-desc"], ["name", "lucideCheckCircle2"], ["type", "button", 1, "save-notes-button", 3, "click", "disabled"]], template: function DashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "p", 5);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(8, DashboardComponent_Conditional_8_Template, 4, 1, "p", 6);
      \u0275\u0275elementStart(9, "section", 7)(10, "div", 8)(11, "div", 9)(12, "span", 10);
      \u0275\u0275text(13, "Pacientes registrados");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div", 11);
      \u0275\u0275element(15, "ng-icon", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 13);
      \u0275\u0275conditionalCreate(17, DashboardComponent_Conditional_17_Template, 1, 0, "span", 14)(18, DashboardComponent_Conditional_18_Template, 2, 1, "span", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 16)(20, "a", 17);
      \u0275\u0275text(21, "Ver directorio ");
      \u0275\u0275element(22, "ng-icon", 18);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(23, "div", 19)(24, "div", 9)(25, "span", 10);
      \u0275\u0275text(26, "Consultas este mes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div", 20);
      \u0275\u0275element(28, "ng-icon", 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div", 13);
      \u0275\u0275conditionalCreate(30, DashboardComponent_Conditional_30_Template, 1, 0, "span", 14)(31, DashboardComponent_Conditional_31_Template, 2, 1, "span", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "div", 16)(33, "span", 22);
      \u0275\u0275text(34, "Consultas registradas en el mes actual");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(35, "div", 23)(36, "div", 9)(37, "span", 10);
      \u0275\u0275text(38, "Atenciones hoy");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "div", 24);
      \u0275\u0275element(40, "ng-icon", 25);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(41, "div", 13);
      \u0275\u0275conditionalCreate(42, DashboardComponent_Conditional_42_Template, 1, 0, "span", 14)(43, DashboardComponent_Conditional_43_Template, 3, 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 16)(45, "span", 22);
      \u0275\u0275text(46, "Consultas realizadas en la fecha actual");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(47, "section", 26)(48, "div", 27)(49, "div", 28);
      \u0275\u0275element(50, "ng-icon", 25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "div", 29)(52, "span", 30);
      \u0275\u0275text(53, "ACTIVIDAD CL\xCDNICA");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "h2", 31);
      \u0275\u0275text(55, "\xDAltimos pacientes atendidos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "p");
      \u0275\u0275text(57, "Consultas recientes y acceso directo a cada historia cl\xEDnica.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "a", 32);
      \u0275\u0275text(59, "Ver historial completo ");
      \u0275\u0275element(60, "ng-icon", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(61, "div", 33)(62, "div", 34);
      \u0275\u0275element(63, "ng-icon", 35);
      \u0275\u0275elementStart(64, "input", 36);
      \u0275\u0275listener("input", function DashboardComponent_Template_input_input_64_listener($event) {
        return ctx.onRecentSearchInput($event);
      })("keydown.enter", function DashboardComponent_Template_input_keydown_enter_64_listener() {
        return ctx.loadRecentPage(0);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(65, "button", 37);
      \u0275\u0275listener("click", function DashboardComponent_Template_button_click_65_listener() {
        return ctx.refreshRecentActivity();
      });
      \u0275\u0275element(66, "ng-icon", 38);
      \u0275\u0275text(67, " Actualizar ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "label", 39);
      \u0275\u0275text(69, "Mostrar ");
      \u0275\u0275elementStart(70, "select", 40);
      \u0275\u0275listener("change", function DashboardComponent_Template_select_change_70_listener($event) {
        return ctx.changeRecentPageSize($event.target.value);
      });
      \u0275\u0275elementStart(71, "option", 41);
      \u0275\u0275text(72, "5 consultas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(73, "option", 42);
      \u0275\u0275text(74, "10 consultas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "option", 43);
      \u0275\u0275text(76, "20 consultas");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(77, DashboardComponent_Conditional_77_Template, 3, 0, "div", 44)(78, DashboardComponent_Conditional_78_Template, 8, 1, "div", 45)(79, DashboardComponent_Conditional_79_Template, 24, 5)(80, DashboardComponent_Conditional_80_Template, 7, 3, "div", 46);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(81, "div", 47)(82, "div", 48)(83, "div", 49)(84, "div", 50)(85, "div", 51)(86, "h2", 52);
      \u0275\u0275element(87, "ng-icon", 53);
      \u0275\u0275text(88, " Acceso r\xE1pido a pacientes ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(89, "p", 54);
      \u0275\u0275text(90, "B\xFAsqueda en el padr\xF3n de pacientes");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(91, "div", 55);
      \u0275\u0275element(92, "ng-icon", 56);
      \u0275\u0275elementStart(93, "input", 57);
      \u0275\u0275listener("input", function DashboardComponent_Template_input_input_93_listener($event) {
        return ctx.onDirectorySearchInput($event);
      })("keydown.enter", function DashboardComponent_Template_input_keydown_enter_93_listener() {
        return ctx.onDirectorySearchEnter();
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(94, DashboardComponent_Conditional_94_Template, 4, 1, "p", 6);
      \u0275\u0275conditionalCreate(95, DashboardComponent_Conditional_95_Template, 4, 0, "div", 58)(96, DashboardComponent_Conditional_96_Template, 23, 4)(97, DashboardComponent_Conditional_97_Template, 3, 0, "div", 59);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(98, "div", 60)(99, "div", 61)(100, "div", 62)(101, "h3", 63);
      \u0275\u0275element(102, "ng-icon", 64);
      \u0275\u0275text(103, " Acciones r\xE1pidas ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(104, "div", 65)(105, "a", 66)(106, "div", 67);
      \u0275\u0275element(107, "ng-icon", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(108, "div", 68)(109, "span", 69);
      \u0275\u0275text(110, "Directorio de pacientes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(111, "span", 70);
      \u0275\u0275text(112, "Consultar fichas y evoluciones");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(113, "div", 71)(114, "div", 62)(115, "div", 72);
      \u0275\u0275element(116, "ng-icon", 73);
      \u0275\u0275elementStart(117, "h3", 63);
      \u0275\u0275text(118, "Notas r\xE1pidas");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(119, DashboardComponent_Conditional_119_Template, 3, 0, "span", 74);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(120, "div", 75)(121, "textarea", 76);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function DashboardComponent_Template_textarea_ngModelChange_121_listener($event) {
        return ctx.onNotesInput($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(122, "div", 77)(123, "span", 78);
      \u0275\u0275text(124, "Estas notas se guardan en tu cuenta.");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(125, DashboardComponent_Conditional_125_Template, 3, 2, "button", 79);
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_10_0;
      let tmp_12_0;
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.greeting());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.todayDateString());
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_2_0 = ctx.metricsError()) ? 8 : -1, tmp_2_0);
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.isLoadingMetrics() ? 17 : 18);
      \u0275\u0275advance(13);
      \u0275\u0275conditional(ctx.isLoadingMetrics() ? 30 : 31);
      \u0275\u0275advance(12);
      \u0275\u0275conditional(ctx.isLoadingMetrics() ? 42 : 43);
      \u0275\u0275advance(22);
      \u0275\u0275property("value", ctx.recentSearch());
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isLoadingRecentPage());
      \u0275\u0275advance(5);
      \u0275\u0275property("value", ctx.recentPageSize())("disabled", ctx.isLoadingRecentPage());
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.isLoadingRecentPage() ? 77 : (tmp_10_0 = ctx.recentPageError()) ? 78 : ctx.recentPageItems().length > 0 ? 79 : 80, tmp_10_0);
      \u0275\u0275advance(16);
      \u0275\u0275property("value", ctx.directorySearch());
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_12_0 = ctx.directoryError()) ? 94 : -1, tmp_12_0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSearchingDirectory() ? 95 : ctx.directoryPatients().length > 0 ? 96 : 97);
      \u0275\u0275advance(24);
      \u0275\u0275conditional(ctx.isNotesSaved() ? 119 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngModel", ctx.quickNotes());
      \u0275\u0275control();
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.isNotesDirty() ? 125 : -1);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NgControlStatus, NgModel, RouterLink, NgIcon], styles: ['\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  width: 100%;\n}\n.dashboard-page[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  width: 100%;\n  flex: 1;\n}\n.dashboard-welcome-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-wrap: wrap;\n  padding-bottom: 0.5rem;\n}\n.welcome-text-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.welcome-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.welcome-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #0f172a);\n  letter-spacing: -0.02em;\n  margin: 0;\n}\n.welcome-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n}\n.bullet-separator[_ngcontent-%COMP%] {\n  color: #cbd5e1;\n}\n.sync-indicator[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  color: #10b981;\n  font-size: 0.8rem;\n  font-weight: 500;\n}\n.sync-dot[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background-color: #10b981;\n}\n.cta-primary-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background-color: #006874;\n  color: #ffffff;\n  border: none;\n  border-radius: 10px;\n  padding: 0.6rem 1.15rem;\n  font-size: 0.88rem;\n  font-weight: 600;\n  cursor: pointer;\n  box-shadow: 0 2px 8px rgba(0, 104, 116, 0.25);\n  transition: all 0.15s ease;\n}\n.cta-primary-btn[_ngcontent-%COMP%]:hover {\n  background-color: #00505a;\n  box-shadow: 0 4px 12px rgba(0, 104, 116, 0.35);\n}\n.cta-primary-btn.btn-sm[_ngcontent-%COMP%] {\n  padding: 0.45rem 0.85rem;\n  font-size: 0.82rem;\n}\n.kpi-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 1.25rem;\n}\n.kpi-card[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 14px;\n  padding: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n}\n.kpi-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);\n}\n.kpi-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.kpi-title[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.kpi-icon-wrap[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.15rem;\n}\n.kpi-value-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 0.65rem;\n}\n.kpi-number[_ngcontent-%COMP%] {\n  font-size: 1.85rem;\n  font-weight: 800;\n  color: var(--%NS%dc-ink, #0f172a);\n  letter-spacing: -0.03em;\n  line-height: 1;\n}\n.kpi-loading-skeleton[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 32px;\n  background-color: var(--%NS%dc-surface-high, #f1f5f9);\n  border-radius: 6px;\n  animation: _ngcontent-%COMP%_pulse 1.5s infinite;\n}\n.kpi-badge-trend[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  padding: 2px 6px;\n  border-radius: 6px;\n}\n.kpi-badge-trend.positive[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-teal-surface, #ecfdf5);\n  color: var(--%NS%dc-teal-ink, #059669);\n}\n.kpi-status-tag[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  background-color: var(--%NS%dc-purple-surface, #f3e8ff);\n  color: var(--%NS%dc-purple-ink, #7e22ce);\n  padding: 2px 7px;\n  border-radius: 6px;\n}\n.kpi-badge-pill[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  background-color: var(--%NS%dc-warning-surface, #fef3c7);\n  color: var(--%NS%dc-warning-ink, #b45309);\n  padding: 2px 7px;\n  border-radius: 6px;\n}\n.kpi-footer[_ngcontent-%COMP%] {\n  margin-top: auto;\n  padding-top: 0.5rem;\n  border-top: 1px solid var(--%NS%dc-outline, #f8fafc);\n}\n.kpi-link[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: var(--%NS%dc-teal-ink, #006874);\n  text-decoration: none;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  transition: gap 0.15s ease;\n}\n.kpi-link[_ngcontent-%COMP%]:hover {\n  gap: 0.5rem;\n}\n.kpi-subtext[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--%NS%dc-ink-muted, #94a3b8);\n}\n.dashboard-main-split[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);\n  gap: 1.5rem;\n  flex: 1;\n  align-items: stretch;\n}\n@media (max-width: 1024px) {\n  .dashboard-main-split[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.dashboard-primary-col[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  height: 100%;\n}\n.patients-directory-card[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.dashboard-side-col[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  height: 100%;\n}\n.quick-notes-card[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.content-card[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 14px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.card-header-row[_ngcontent-%COMP%] {\n  padding: 1.15rem 1.25rem;\n  border-bottom: 1px solid var(--%NS%dc-outline, #f1f5f9);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.header-title-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n.card-title[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #0f172a);\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n}\n.title-icon[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n}\n.card-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  margin: 0;\n}\n.secondary-outline-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  background: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  color: var(--%NS%dc-ink-secondary, #334155);\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  text-decoration: none;\n  transition: all 0.15s ease;\n}\n.secondary-outline-btn[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  color: var(--%NS%dc-ink, #0f172a);\n  border-color: #94a3b8;\n}\n.secondary-outline-btn.btn-sm[_ngcontent-%COMP%] {\n  padding: 0.38rem 0.75rem;\n  font-size: 0.78rem;\n}\n.secondary-outline-btn.btn-xs[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.55rem;\n  font-size: 0.75rem;\n}\n.encounters-table-wrap[_ngcontent-%COMP%] {\n  width: 100%;\n  overflow-x: auto;\n}\n.clinical-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  text-align: left;\n  font-size: 0.85rem;\n}\n.clinical-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  border-bottom: 1px solid var(--%NS%dc-outline, #e2e8f0);\n}\n.clinical-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.65rem 1rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink-secondary, #475569);\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.clinical-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid var(--%NS%dc-outline, #f1f5f9);\n  color: var(--%NS%dc-ink-secondary, #334155);\n  vertical-align: middle;\n}\n.clinical-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-surface-low, #fbfcfd);\n}\n.patient-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n}\n.patient-cell-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: var(--%NS%dc-surface-high, #e2e8f0);\n  color: var(--%NS%dc-ink, #1e293b);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.75rem;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.patient-cell-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.patient-cell-name[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.patient-cell-meta[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.cell-datetime[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.cell-complaint[_ngcontent-%COMP%] {\n  max-width: 180px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  display: block;\n}\n.diag-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.diag-code-badge[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  background-color: var(--%NS%dc-surface-high, #f1f5f9);\n  color: var(--%NS%dc-teal-ink, #006874);\n  padding: 1px 5px;\n  border-radius: 4px;\n}\n.diag-desc[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  max-width: 200px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.btn-open-record[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  color: var(--%NS%dc-teal-ink, #006874);\n  border-radius: 6px;\n  padding: 0.3rem 0.65rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.btn-open-record[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-teal-surface, #f0fdfa);\n  border-color: #006874;\n}\n.datetime-cell-stack[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.datetime-top-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.today-pill-badge[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  background-color: var(--%NS%dc-teal-surface, #ecfdf5);\n  color: var(--%NS%dc-teal-ink, #047857);\n  border: 1px solid #a7f3d0;\n  padding: 1px 6px;\n  border-radius: 9999px;\n}\n.cell-date-strong[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink, #1e293b);\n}\n.cell-time-sub[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.consultation-type-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  font-size: 0.72rem;\n  font-weight: 600;\n  padding: 0.2rem 0.6rem;\n  border-radius: 9999px;\n  background-color: var(--%NS%dc-surface-high, #f1f5f9);\n  color: var(--%NS%dc-ink-secondary, #334155);\n  white-space: nowrap;\n}\n.consultation-type-pill.type-first[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-teal-surface, #e6f6f8);\n  color: var(--%NS%dc-teal-ink, #006874);\n}\n.consultation-type-pill.type-emergency[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-error-surface, #fff1f2);\n  color: var(--%NS%dc-error-ink, #be123c);\n}\n.highlights-stack[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n  max-width: 280px;\n}\n.highlight-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 0.35rem;\n  font-size: 0.78rem;\n  line-height: 1.3;\n}\n.highlight-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--%NS%dc-ink-secondary, #475569);\n  flex-shrink: 0;\n}\n.highlight-val[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink, #0f172a);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.row-actions-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.btn-view-encounter[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  color: var(--%NS%dc-ink-secondary, #334155);\n  border-radius: 6px;\n  padding: 0.3rem 0.6rem;\n  font-size: 0.74rem;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: all 0.15s ease;\n}\n.btn-view-encounter[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n  color: var(--%NS%dc-ink, #0f172a);\n  border-color: var(--%NS%dc-outline, #cbd5e1);\n}\n.empty-state-wrap[_ngcontent-%COMP%] {\n  padding: 2.5rem 1.5rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 0.65rem;\n}\n.empty-icon-circle[_ngcontent-%COMP%] {\n  width: 54px;\n  height: 54px;\n  border-radius: 50%;\n  background-color: var(--%NS%dc-teal-surface, #f0fdfa);\n  color: var(--%NS%dc-teal-ink, #006874);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.6rem;\n  margin-bottom: 0.5rem;\n}\n.empty-title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #0f172a);\n  margin: 0;\n}\n.empty-desc[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  max-width: 400px;\n  margin: 0;\n}\n.directory-search-box[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.search-box-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.65rem;\n  color: var(--%NS%dc-ink-muted, #94a3b8);\n  font-size: 0.9rem;\n}\n.directory-search-input[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.75rem 0.35rem 2rem;\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 8px;\n  font-size: 0.82rem;\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  color: var(--%NS%dc-ink, #0f172a);\n  outline: none;\n  width: 180px;\n  transition: all 0.15s ease;\n}\n.directory-search-input[_ngcontent-%COMP%]:focus {\n  background-color: var(--%NS%dc-surface, #ffffff);\n  border-color: #006874;\n  width: 220px;\n}\n.table-pagination-row[_ngcontent-%COMP%] {\n  margin-top: auto;\n  padding: 0.65rem 1rem;\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  border-top: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.pagination-info[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.pagination-btns[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.4rem;\n}\n.btn-page[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.25rem 0.65rem;\n  font-size: 0.75rem;\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  background-color: var(--%NS%dc-surface, #ffffff);\n  border-radius: 6px;\n  color: var(--%NS%dc-ink-secondary, #334155);\n  cursor: pointer;\n}\n.btn-page[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.widget-header[_ngcontent-%COMP%] {\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid var(--%NS%dc-outline, #f1f5f9);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.widget-title[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #0f172a);\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  margin: 0;\n}\n.quick-actions-list[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n.quick-action-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.65rem 0.75rem;\n  border: 1px solid var(--%NS%dc-outline, #f1f5f9);\n  border-radius: 10px;\n  background-color: var(--%NS%dc-surface, #ffffff);\n  text-decoration: none;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  width: 100%;\n  text-align: left;\n}\n.quick-action-btn[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  border-color: var(--%NS%dc-outline, #e2e8f0);\n  transform: translateY(-1px);\n}\n.quick-action-btn.primary-tint[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-teal-surface, #f0fdfa);\n  border-color: #ccfbf1;\n}\n.quick-action-btn.primary-tint[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%dc-teal-surface, #e6f9f6);\n  border-color: #99f6e4;\n}\n.qa-icon-wrap[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.15rem;\n  flex-shrink: 0;\n}\n.qa-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.qa-title[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.qa-desc[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.notes-widget-body[_ngcontent-%COMP%] {\n  padding: 1rem 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  flex: 1;\n}\n.notes-textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  flex: 1;\n  min-height: 140px;\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 8px;\n  padding: 0.75rem;\n  font-size: 0.85rem;\n  font-family: inherit;\n  color: var(--%NS%dc-ink, #0f172a);\n  background-color: var(--%NS%dc-surface-low, #fbfcfd);\n  resize: vertical;\n  outline: none;\n  transition: border-color 0.15s ease;\n  box-sizing: border-box;\n}\n.notes-textarea[_ngcontent-%COMP%]:focus {\n  background-color: var(--%NS%dc-surface, #ffffff);\n  border-color: #006874;\n}\n.notes-footer-hint[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: var(--%NS%dc-ink-muted, #94a3b8);\n}\n.notes-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.save-notes-button[_ngcontent-%COMP%] {\n  background: #006874;\n  border: none;\n  border-radius: 6px;\n  color: #ffffff;\n  cursor: pointer;\n  font-size: 0.75rem;\n  font-weight: 600;\n  padding: 0.35rem 0.7rem;\n}\n.save-notes-button[_ngcontent-%COMP%]:disabled {\n  background: var(--%NS%dc-surface-high, #cbd5e1);\n  cursor: not-allowed;\n}\n.card-loading-state[_ngcontent-%COMP%] {\n  padding: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.65rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  font-size: 0.85rem;\n}\n.mini-spinner[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border: 2px solid var(--%NS%dc-outline, #e2e8f0);\n  border-top-color: #006874;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n.recent-activity-card[_ngcontent-%COMP%] {\n  border-color: var(--%NS%dc-outline, #dce8eb);\n  box-shadow: 0 4px 20px rgb(15 23 42 / 3%);\n}\n.recent-card-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 24px 26px 20px;\n}\n.recent-heading-icon[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 44px;\n  height: 44px;\n  flex-shrink: 0;\n  border-radius: 13px;\n  background: var(--%NS%dc-teal-surface, #e7f5f4);\n  color: var(--%NS%dc-teal-ink, #007b7b);\n  font-size: 1.375rem;\n}\n.recent-heading-text[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.recent-eyebrow[_ngcontent-%COMP%] {\n  font-size: 0.625rem;\n  font-weight: 700;\n  letter-spacing: 0.13em;\n  color: var(--%NS%dc-teal-ink, #007b7b);\n}\n.recent-heading-text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 3px 0 4px;\n  color: var(--%NS%dc-ink, #17233b);\n  font-size: 1.125rem;\n  font-weight: 750;\n  letter-spacing: -0.025em;\n}\n.recent-heading-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.75rem;\n  color: var(--%NS%dc-ink-secondary, #64748b);\n}\n.recent-history-link[_ngcontent-%COMP%] {\n  margin-left: auto;\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  color: var(--%NS%dc-teal-ink, #006874);\n  font-size: 0.75rem;\n  font-weight: 650;\n  text-decoration: none;\n  white-space: nowrap;\n}\n.recent-history-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.recent-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n  padding: 0 26px 20px;\n}\n.recent-search-wrap[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 220px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  border: 1px solid var(--%NS%dc-outline, #dde5eb);\n  border-radius: 10px;\n  padding: 10px 13px;\n  background: var(--%NS%dc-surface, #f8fafb);\n  color: var(--%NS%dc-ink-muted, #8191a5);\n}\n.recent-search-wrap[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--%NS%dc-teal-ink, #00838a);\n  background: var(--%NS%dc-surface, white);\n  box-shadow: 0 0 0 3px rgb(0 131 138 / 9%);\n}\n.recent-search-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 0;\n  border: 0;\n  outline: 0;\n  font: inherit;\n  font-size: 0.8125rem;\n  color: var(--%NS%dc-ink, #17233b);\n  background: transparent;\n}\n.recent-search-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: var(--%NS%dc-ink-muted, #8290a3);\n}\n.recent-size-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  font-size: 0.75rem;\n  color: var(--%NS%dc-ink-secondary, #64748b);\n}\n.recent-refresh-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  padding: 10px 12px;\n  border: 1px solid var(--%NS%dc-outline, #dde5eb);\n  border-radius: 9px;\n  background: var(--%NS%dc-surface, white);\n  color: var(--%NS%dc-ink-secondary, #52647a);\n  font: inherit;\n  font-size: 0.75rem;\n  cursor: pointer;\n}\n.recent-refresh-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: var(--%NS%dc-teal-ink, #00838a);\n  color: var(--%NS%dc-teal-ink, #006874);\n}\n.recent-refresh-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.recent-size-label[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  border: 1px solid var(--%NS%dc-outline, #dde5eb);\n  border-radius: 9px;\n  padding: 10px;\n  color: var(--%NS%dc-ink-secondary, #334155);\n  font: inherit;\n  background: var(--%NS%dc-surface, white);\n  cursor: pointer;\n}\n.recent-column-labels[_ngcontent-%COMP%], \n.recent-consultation[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr) 12.125rem;\n  gap: 24px;\n}\n.recent-column-labels[_ngcontent-%COMP%] {\n  padding: 11px 26px;\n  background: var(--%NS%dc-surface, #f8fafb);\n  border-block: 1px solid var(--%NS%dc-outline, #edf1f4);\n  color: var(--%NS%dc-ink-muted, #7a899e);\n  font-size: 0.625rem;\n  font-weight: 700;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n}\n.recent-column-labels[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  text-align: right;\n}\n.recent-consultation[_ngcontent-%COMP%] {\n  position: relative;\n  align-items: center;\n  padding: 19px 26px;\n  border-bottom: 1px solid var(--%NS%dc-outline, #edf1f4);\n  transition: background 0.15s;\n}\n.recent-consultation[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.recent-consultation[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-surface-high, #f7fbfb);\n}\n.recent-consultation.consultation-today[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  left: 0;\n  top: 22px;\n  bottom: 22px;\n  width: 3px;\n  border-radius: 0 3px 3px 0;\n  background: #00a29b;\n}\n.recent-patient[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n  min-width: 0;\n}\n.recent-avatar[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 40px;\n  height: 40px;\n  flex-shrink: 0;\n  border-radius: 12px;\n  background: var(--%NS%dc-surface, #edf4f7);\n  color: var(--%NS%dc-ink-secondary, #3d6274);\n  font-size: 0.75rem;\n  font-weight: 700;\n}\n.consultation-today[_ngcontent-%COMP%]   .recent-avatar[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-teal-surface, #e5f6f2);\n  color: var(--%NS%dc-teal-ink, #008077);\n}\n.recent-patient-info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.recent-patient-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: 650;\n  line-height: 1.45;\n  color: var(--%NS%dc-ink, #17233b);\n  overflow-wrap: anywhere;\n}\n.recent-patient-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 7px;\n  font-size: 0.6875rem;\n  line-height: 1.5;\n  color: var(--%NS%dc-ink-muted, #748398);\n  overflow-wrap: anywhere;\n}\n.recent-patient-info[_ngcontent-%COMP%]   .consultation-type-pill[_ngcontent-%COMP%] {\n  max-width: 100%;\n  white-space: normal;\n  font-size: 0.625rem;\n  line-height: 1.5;\n  padding: 2px 8px;\n}\n.recent-clinical-summary[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.recent-clinical-summary[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  overflow: hidden;\n  margin: 4px 0;\n  font-size: 0.75rem;\n  line-height: 1.6;\n  color: var(--%NS%dc-ink-secondary, #607087);\n  overflow-wrap: anywhere;\n}\n.recent-clinical-summary[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--%NS%dc-ink, #35445c);\n}\n.recent-date-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 4px;\n  min-width: 0;\n}\n.recent-date[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 7px;\n  color: var(--%NS%dc-ink, #35445c);\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n.recent-time[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  color: var(--%NS%dc-ink-muted, #8191a5);\n}\n.recent-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n  margin-top: 8px;\n}\n.recent-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n  border-radius: 7px;\n  padding: 7px 9px;\n  font: inherit;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  white-space: nowrap;\n  cursor: pointer;\n  transition: background 0.15s, border-color 0.15s;\n}\n.recent-detail-btn[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-teal-ink, #007577);\n  background: var(--%NS%dc-teal-surface, #edf8f6);\n  border: 1px solid var(--%NS%dc-outline, #d9efea);\n}\n.recent-detail-btn[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-teal-surface, #dff2ed);\n  border-color: var(--%NS%dc-outline, #8dcabf);\n}\n.recent-record-btn[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink-secondary, #52647a);\n  background: var(--%NS%dc-surface, white);\n  border: 1px solid var(--%NS%dc-outline, #dde5eb);\n}\n.recent-record-btn[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n  border-color: var(--%NS%dc-outline, #aebfcf);\n}\n.recent-pagination[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  align-items: center;\n  gap: 14px;\n  padding: 17px 26px;\n  border-top: 1px solid var(--%NS%dc-outline, #edf1f4);\n  background: var(--%NS%dc-surface, #fcfdfd);\n}\n.recent-count[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--%NS%dc-ink-muted, #718096);\n}\n.recent-count[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink, #35445c);\n  font-weight: 600;\n}\n.recent-count[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 3px;\n  font-size: 0.625rem;\n  color: var(--%NS%dc-ink-muted, #8796a8);\n}\n.recent-page-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 5px;\n  padding-right: 2rem;\n}\n.recent-page-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 32px;\n  height: 32px;\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  background: var(--%NS%dc-surface, white);\n  color: var(--%NS%dc-ink-muted, #66788e);\n  border-radius: 8px;\n  font: inherit;\n  font-size: 0.75rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.recent-page-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--%NS%dc-teal-surface, #edf8f6);\n  color: var(--%NS%dc-teal-ink, #006874);\n}\n.recent-page-buttons[_ngcontent-%COMP%]   button.current-page[_ngcontent-%COMP%] {\n  background: #006874;\n  border-color: #006874;\n  color: white;\n}\n.recent-page-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.35;\n  cursor: default;\n}\n.recent-activity-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible, \n.recent-history-link[_ngcontent-%COMP%]:focus-visible, \n.recent-size-label[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--%NS%dc-teal-ink, #00838a);\n  outline-offset: 3px;\n}\n.recent-loading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 10px;\n  min-height: 280px;\n  color: var(--%NS%dc-ink-muted, #718096);\n  font-size: 0.8125rem;\n}\n.recent-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  min-height: 260px;\n  padding: 26px;\n  text-align: center;\n}\n.recent-empty[_ngcontent-%COMP%]    > ng-icon[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  color: var(--%NS%dc-teal-ink, #00958e);\n}\n.recent-empty[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  color: var(--%NS%dc-ink, #35445c);\n  margin: 0;\n}\n.recent-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  line-height: 1.7;\n  color: var(--%NS%dc-ink-muted, #718096);\n  margin: 0;\n  max-width: 380px;\n}\n@media (max-width: 1100px) {\n  .recent-column-labels[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .recent-consultation[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) 12.125rem;\n    gap: 12px 20px;\n  }\n  .recent-patient[_ngcontent-%COMP%] {\n    grid-column: 1;\n    grid-row: 1;\n  }\n  .recent-date-actions[_ngcontent-%COMP%] {\n    grid-column: 2;\n    grid-row: 1;\n  }\n  .recent-clinical-summary[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n    padding-left: 52px;\n  }\n}\n@media (max-width: 600px) {\n  .recent-card-heading[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-wrap: wrap;\n    padding: 18px;\n    gap: 10px;\n  }\n  .recent-heading-text[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n  .recent-heading-text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .recent-history-link[_ngcontent-%COMP%] {\n    margin-left: 54px;\n  }\n  .recent-toolbar[_ngcontent-%COMP%] {\n    padding: 0 18px 18px;\n  }\n  .recent-search-wrap[_ngcontent-%COMP%] {\n    flex-basis: 100%;\n    min-width: 0;\n  }\n  .recent-size-label[_ngcontent-%COMP%] {\n    margin-left: auto;\n  }\n  .recent-consultation[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n    padding: 18px;\n  }\n  .recent-date-actions[_ngcontent-%COMP%] {\n    grid-column: 1;\n    grid-row: 3;\n    flex-direction: row;\n    align-items: center;\n    flex-wrap: wrap;\n    gap: 8px;\n  }\n  .recent-clinical-summary[_ngcontent-%COMP%] {\n    padding-left: 0;\n  }\n  .recent-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    margin-top: 2px;\n  }\n  .recent-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n    padding: 10px;\n  }\n  .recent-pagination[_ngcontent-%COMP%] {\n    padding: 16px 18px;\n  }\n  .recent-page-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:not(:first-child):not(:last-child):not(.current-page) {\n    display: none;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{ selector: "app-dashboard", imports: [FormsModule, RouterLink, NgIcon], providers: [
      provideIcons({
        lucideArrowRight,
        lucideCalendar,
        lucideCheckCircle2,
        lucideChevronLeft,
        lucideChevronRight,
        lucideClock,
        lucideEye,
        lucideFileText,
        lucideSearch,
        lucideRefreshCw,
        lucideSparkles,
        lucideStethoscope,
        lucideUserPlus,
        lucideUsers
      })
    ], template: `<div class="dashboard-page">\r
  <header class="dashboard-welcome-header">\r
    <div class="welcome-text-group">\r
      <div class="welcome-title-row">\r
        <h1 class="welcome-title">{{ greeting() }}</h1>\r
      </div>\r
      <p class="welcome-subtitle">{{ todayDateString() }}</p>\r
    </div>\r
  </header>\r
\r
  @if (metricsError(); as error) {\r
    <p role="alert">\r
      {{ error }}\r
      <button type="button" class="secondary-outline-btn btn-xs" (click)="loadKpiData()">\r
        Reintentar\r
      </button>\r
    </p>\r
  }\r
  <section class="kpi-grid" aria-label="M\xE9tricas principales">\r
    <div class="kpi-card" role="region" aria-label="Total de pacientes">\r
      <div class="kpi-header">\r
        <span class="kpi-title">Pacientes registrados</span>\r
        <div class="kpi-icon-wrap bg-blue-50 text-blue-600"><ng-icon name="lucideUsers" /></div>\r
      </div>\r
      <div class="kpi-value-row">\r
        @if (isLoadingMetrics()) {\r
          <span class="kpi-loading-skeleton"></span>\r
        } @else {\r
          <span class="kpi-number">{{ totalPatients() ?? '\u2014' }}</span>\r
        }\r
      </div>\r
      <div class="kpi-footer">\r
        <a routerLink="/pacientes" class="kpi-link"\r
          >Ver directorio <ng-icon name="lucideArrowRight"\r
        /></a>\r
      </div>\r
    </div>\r
\r
    <div class="kpi-card" role="region" aria-label="Consultas del mes">\r
      <div class="kpi-header">\r
        <span class="kpi-title">Consultas este mes</span>\r
        <div class="kpi-icon-wrap bg-teal-50 text-teal-600">\r
          <ng-icon name="lucideStethoscope" />\r
        </div>\r
      </div>\r
      <div class="kpi-value-row">\r
        @if (isLoadingMetrics()) {\r
          <span class="kpi-loading-skeleton"></span>\r
        } @else {\r
          <span class="kpi-number">{{ encountersMonthCount() ?? '\u2014' }}</span>\r
        }\r
      </div>\r
      <div class="kpi-footer">\r
        <span class="kpi-subtext">Consultas registradas en el mes actual</span>\r
      </div>\r
    </div>\r
\r
    <div class="kpi-card" role="region" aria-label="Consultas de hoy">\r
      <div class="kpi-header">\r
        <span class="kpi-title">Atenciones hoy</span>\r
        <div class="kpi-icon-wrap bg-purple-50 text-purple-600"><ng-icon name="lucideClock" /></div>\r
      </div>\r
      <div class="kpi-value-row">\r
        @if (isLoadingMetrics()) {\r
          <span class="kpi-loading-skeleton"></span>\r
        } @else {\r
          <span class="kpi-number">{{ encountersTodayCount() ?? '\u2014' }}</span>\r
          @if ((encountersTodayCount() ?? 0) > 0) {\r
            <span class="kpi-badge-trend positive">Actividad del d\xEDa</span>\r
          }\r
        }\r
      </div>\r
      <div class="kpi-footer">\r
        <span class="kpi-subtext">Consultas realizadas en la fecha actual</span>\r
      </div>\r
    </div>\r
  </section>\r
\r
  <section class="content-card recent-activity-card" aria-labelledby="recent-activity-title">\r
    <div class="recent-card-heading">\r
      <div class="recent-heading-icon" aria-hidden="true"><ng-icon name="lucideClock" /></div>\r
      <div class="recent-heading-text">\r
        <span class="recent-eyebrow">ACTIVIDAD CL\xCDNICA</span>\r
        <h2 id="recent-activity-title">\xDAltimos pacientes atendidos</h2>\r
        <p>Consultas recientes y acceso directo a cada historia cl\xEDnica.</p>\r
      </div>\r
      <a routerLink="/consultas" class="recent-history-link"\r
        >Ver historial completo <ng-icon name="lucideArrowRight"\r
      /></a>\r
    </div>\r
    <div class="recent-toolbar">\r
      <div class="recent-search-wrap">\r
        <ng-icon name="lucideSearch" aria-hidden="true" />\r
        <input\r
          type="search"\r
          aria-label="Buscar consultas por paciente, motivo o diagn\xF3stico"\r
          placeholder="Buscar paciente, motivo o diagn\xF3stico..."\r
          [value]="recentSearch()"\r
          (input)="onRecentSearchInput($event)"\r
          (keydown.enter)="loadRecentPage(0)"\r
        />\r
      </div>\r
      <button\r
        type="button"\r
        class="recent-refresh-btn"\r
        [disabled]="isLoadingRecentPage()"\r
        (click)="refreshRecentActivity()"\r
      >\r
        <ng-icon name="lucideRefreshCw" /> Actualizar\r
      </button>\r
      <label class="recent-size-label"\r
        >Mostrar\r
        <select\r
          aria-label="Consultas por p\xE1gina"\r
          [value]="recentPageSize()"\r
          [disabled]="isLoadingRecentPage()"\r
          (change)="changeRecentPageSize($any($event.target).value)"\r
        >\r
          <option value="5">5 consultas</option>\r
          <option value="10">10 consultas</option>\r
          <option value="20">20 consultas</option>\r
        </select>\r
      </label>\r
    </div>\r
    @if (isLoadingRecentPage()) {\r
      <div class="recent-loading" role="status">\r
        <div class="mini-spinner"></div>\r
        Cargando consultas...\r
      </div>\r
    } @else if (recentPageError(); as error) {\r
      <div class="recent-empty" role="alert">\r
        <ng-icon name="lucideFileText" />\r
        <h3>No pudimos cargar el historial</h3>\r
        <p>{{ error }}</p>\r
        <button\r
          type="button"\r
          class="secondary-outline-btn btn-sm"\r
          (click)="loadRecentPage(recentPage())"\r
        >\r
          Reintentar consultas\r
        </button>\r
      </div>\r
    } @else if (recentPageItems().length > 0) {\r
      <div class="recent-column-labels" aria-hidden="true">\r
        <span>Paciente y atenci\xF3n</span><span>Resumen cl\xEDnico</span><span>Fecha y acciones</span>\r
      </div>\r
      <div class="recent-consultation-list" role="list" aria-label="Consultas recientes">\r
        @for (encounter of recentPageItems(); track encounter.id) {\r
          <article\r
            class="recent-consultation"\r
            [class.consultation-today]="encounter.isToday"\r
            role="listitem"\r
          >\r
            <div class="recent-patient">\r
              <div class="recent-avatar" aria-hidden="true">\r
                {{ encounter.patientName.slice(0, 2).toUpperCase() }}\r
              </div>\r
              <div class="recent-patient-info">\r
                <h3 [title]="encounter.patientName">{{ encounter.patientName }}</h3>\r
                <p>{{ encounter.patientMeta }}</p>\r
                <span\r
                  class="consultation-type-pill"\r
                  [class.type-emergency]="encounter.consultationTypeKey === 'EMERGENCY'"\r
                  [class.type-first]="encounter.consultationTypeKey === 'FIRST_VISIT'"\r
                  >{{ encounter.consultationTypeLabel }}</span\r
                >\r
              </div>\r
            </div>\r
            <div class="recent-clinical-summary">\r
              @if (encounter.clinicalHighlights.length > 0) {\r
                @for (item of encounter.clinicalHighlights; track $index) {\r
                  <p [title]="item.value">\r
                    <b>{{ item.label }}:</b> {{ item.value }}\r
                  </p>\r
                }\r
              } @else {\r
                <p>{{ encounter.chiefComplaint }}</p>\r
              }\r
            </div>\r
            <div class="recent-date-actions">\r
              <div class="recent-date">\r
                <span>{{ encounter.encounterDateOnly }}</span>\r
                @if (encounter.isToday) {\r
                  <span class="today-pill-badge">Hoy</span>\r
                }\r
              </div>\r
              <span class="recent-time">{{ encounter.encounterTimeOnly }}</span>\r
              <div class="recent-actions">\r
                <button\r
                  type="button"\r
                  class="recent-detail-btn"\r
                  [attr.aria-label]="'Ver consulta de ' + encounter.patientName"\r
                  (click)="openEncounterDetail(encounter.id, $event)"\r
                >\r
                  <ng-icon name="lucideEye" /> Ver consulta\r
                </button>\r
                <button\r
                  type="button"\r
                  class="recent-record-btn"\r
                  [attr.aria-label]="'Abrir ficha de ' + encounter.patientName"\r
                  (click)="openPatient(encounter.patientId)"\r
                >\r
                  Ficha <ng-icon name="lucideArrowRight" />\r
                </button>\r
              </div>\r
            </div>\r
          </article>\r
        }\r
      </div>\r
      <footer class="recent-pagination">\r
        <span class="recent-count" role="status" aria-live="polite"\r
          ><b>{{ recentRange() }}</b> consultas\r
          <span>\xB7 P\xE1gina {{ recentPage() + 1 }} de {{ recentTotalPages() }}</span></span\r
        >\r
        <nav class="recent-page-buttons" aria-label="P\xE1ginas de consultas recientes">\r
          <button\r
            type="button"\r
            aria-label="P\xE1gina anterior de consultas"\r
            [disabled]="recentPage() === 0"\r
            (click)="loadRecentPage(recentPage() - 1)"\r
          >\r
            <ng-icon name="lucideChevronLeft" />\r
          </button>\r
          @for (page of recentPageNumbers(); track page) {\r
            <button\r
              type="button"\r
              [class.current-page]="page === recentPage()"\r
              [attr.aria-current]="page === recentPage() ? 'page' : null"\r
              [attr.aria-label]="'P\xE1gina ' + (page + 1) + ' de consultas'"\r
              (click)="loadRecentPage(page)"\r
            >\r
              {{ page + 1 }}\r
            </button>\r
          }\r
          <button\r
            type="button"\r
            aria-label="P\xE1gina siguiente de consultas"\r
            [disabled]="recentPage() + 1 >= recentTotalPages()"\r
            (click)="loadRecentPage(recentPage() + 1)"\r
          >\r
            <ng-icon name="lucideChevronRight" />\r
          </button>\r
        </nav>\r
      </footer>\r
    } @else {\r
      <div class="recent-empty">\r
        <ng-icon name="lucideSearch" />\r
        <h3>\r
          {{\r
            recentSearch().trim()\r
              ? 'No encontramos esas consultas'\r
              : 'Tu actividad cl\xEDnica empieza aqu\xED'\r
          }}\r
        </h3>\r
        <p>\r
          {{\r
            recentSearch().trim()\r
              ? 'Prob\xE1 con otro nombre, motivo o diagn\xF3stico.'\r
              : 'Al registrar una atenci\xF3n, podr\xE1s encontrarla aqu\xED y acceder a su historia cl\xEDnica.'\r
          }}\r
        </p>\r
        @if (recentSearch().trim()) {\r
          <button type="button" class="secondary-outline-btn btn-sm" (click)="clearRecentSearch()">\r
            Limpiar b\xFAsqueda\r
          </button>\r
        }\r
      </div>\r
    }\r
  </section>\r
  <div class="dashboard-main-split">\r
    <div class="dashboard-primary-col">\r
      <div class="content-card patients-directory-card">\r
        <div class="card-header-row">\r
          <div class="header-title-wrap">\r
            <h2 class="card-title">\r
              <ng-icon name="lucideUsers" class="title-icon text-blue-600" /> Acceso r\xE1pido a\r
              pacientes\r
            </h2>\r
            <p class="card-subtitle">B\xFAsqueda en el padr\xF3n de pacientes</p>\r
          </div>\r
          <div class="directory-search-box">\r
            <ng-icon name="lucideSearch" class="search-box-icon" /><input\r
              type="search"\r
              class="directory-search-input"\r
              placeholder="Buscar paciente..."\r
              [value]="directorySearch()"\r
              (input)="onDirectorySearchInput($event)"\r
              (keydown.enter)="onDirectorySearchEnter()"\r
            />\r
          </div>\r
        </div>\r
        @if (directoryError(); as error) {\r
          <p role="alert">\r
            {{ error }}\r
            <button\r
              type="button"\r
              class="secondary-outline-btn btn-xs"\r
              (click)="loadDirectory(directoryPage(), directorySearch())"\r
            >\r
              Reintentar\r
            </button>\r
          </p>\r
        }\r
        @if (isSearchingDirectory()) {\r
          <div class="card-loading-state">\r
            <div class="mini-spinner"></div>\r
            <span>Buscando pacientes...</span>\r
          </div>\r
        } @else if (directoryPatients().length > 0) {\r
          <div class="encounters-table-wrap">\r
            <table class="clinical-table">\r
              <thead>\r
                <tr>\r
                  <th>Paciente</th>\r
                  <th>Fecha de nacimiento</th>\r
                  <th>Acci\xF3n</th>\r
                </tr>\r
              </thead>\r
              <tbody>\r
                @for (patient of directoryPatients(); track patient.id) {\r
                  <tr>\r
                    <td>\r
                      <span class="patient-cell-name">{{ patient.fullName }}</span>\r
                    </td>\r
                    <td>\r
                      <span class="cell-datetime">{{ displayDate(patient.birthDate) }}</span>\r
                    </td>\r
                    <td>\r
                      <button\r
                        type="button"\r
                        class="btn-open-record"\r
                        (click)="openPatient(patient.id)"\r
                      >\r
                        Abrir ficha\r
                      </button>\r
                    </td>\r
                  </tr>\r
                }\r
              </tbody>\r
            </table>\r
          </div>\r
          <div class="table-pagination-row">\r
            <span class="pagination-info"\r
              >P\xE1gina {{ directoryPage() + 1 }} de {{ directoryTotalPages() }}</span\r
            >\r
            <div class="pagination-btns">\r
              <button\r
                type="button"\r
                class="btn-page"\r
                [disabled]="directoryPage() === 0"\r
                (click)="loadDirectory(directoryPage() - 1, directorySearch())"\r
              >\r
                <ng-icon name="lucideChevronLeft" /> Anterior</button\r
              ><button\r
                type="button"\r
                class="btn-page"\r
                [disabled]="directoryPage() + 1 >= directoryTotalPages()"\r
                (click)="loadDirectory(directoryPage() + 1, directorySearch())"\r
              >\r
                Siguiente <ng-icon name="lucideChevronRight" />\r
              </button>\r
            </div>\r
          </div>\r
        } @else {\r
          <div class="empty-state-wrap"><p class="empty-desc">No se encontraron pacientes.</p></div>\r
        }\r
      </div>\r
    </div>\r
\r
    <div class="dashboard-side-col">\r
      <div class="content-card">\r
        <div class="widget-header">\r
          <h3 class="widget-title">\r
            <ng-icon name="lucideSparkles" class="text-amber-500" /> Acciones r\xE1pidas\r
          </h3>\r
        </div>\r
        <div class="quick-actions-list">\r
          <a routerLink="/pacientes" class="quick-action-btn"\r
            ><div class="qa-icon-wrap bg-teal-100 text-teal-700">\r
              <ng-icon name="lucideUsers" />\r
            </div>\r
            <div class="qa-text">\r
              <span class="qa-title">Directorio de pacientes</span\r
              ><span class="qa-desc">Consultar fichas y evoluciones</span>\r
            </div></a\r
          >\r
        </div>\r
      </div>\r
\r
      <div class="content-card quick-notes-card">\r
        <div class="widget-header">\r
          <div class="flex items-center gap-1.5">\r
            <ng-icon name="lucideFileText" class="text-slate-500" />\r
            <h3 class="widget-title">Notas r\xE1pidas</h3>\r
          </div>\r
          @if (isNotesSaved()) {\r
            <span class="text-xs text-emerald-600 flex items-center gap-1"\r
              ><ng-icon name="lucideCheckCircle2" /> Guardado</span\r
            >\r
          }\r
        </div>\r
        <div class="notes-widget-body">\r
          <textarea\r
            class="notes-textarea"\r
            placeholder="Escrib\xED recordatorios r\xE1pidos o pendientes..."\r
            [ngModel]="quickNotes()"\r
            (ngModelChange)="onNotesInput($event)"\r
            rows="4"\r
          ></textarea>\r
          <div class="notes-actions">\r
            <span class="notes-footer-hint">Estas notas se guardan en tu cuenta.</span>\r
            @if (isNotesDirty()) {\r
              <button\r
                type="button"\r
                class="save-notes-button"\r
                [disabled]="isSavingNotes()"\r
                (click)="saveNotes()"\r
              >\r
                @if (isSavingNotes()) {\r
                  Guardando...\r
                } @else {\r
                  Guardar\r
                }\r
              </button>\r
            }\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`, styles: ['/* src/app/features/dashboard/dashboard.component.css */\n:host {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  width: 100%;\n}\n.dashboard-page {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  width: 100%;\n  flex: 1;\n}\n.dashboard-welcome-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-wrap: wrap;\n  padding-bottom: 0.5rem;\n}\n.welcome-text-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.welcome-title-row {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.welcome-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--dc-ink, #0f172a);\n  letter-spacing: -0.02em;\n  margin: 0;\n}\n.welcome-subtitle {\n  font-size: 0.85rem;\n  color: var(--dc-ink-muted, #64748b);\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n}\n.bullet-separator {\n  color: #cbd5e1;\n}\n.sync-indicator {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  color: #10b981;\n  font-size: 0.8rem;\n  font-weight: 500;\n}\n.sync-dot {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background-color: #10b981;\n}\n.cta-primary-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background-color: #006874;\n  color: #ffffff;\n  border: none;\n  border-radius: 10px;\n  padding: 0.6rem 1.15rem;\n  font-size: 0.88rem;\n  font-weight: 600;\n  cursor: pointer;\n  box-shadow: 0 2px 8px rgba(0, 104, 116, 0.25);\n  transition: all 0.15s ease;\n}\n.cta-primary-btn:hover {\n  background-color: #00505a;\n  box-shadow: 0 4px 12px rgba(0, 104, 116, 0.35);\n}\n.cta-primary-btn.btn-sm {\n  padding: 0.45rem 0.85rem;\n  font-size: 0.82rem;\n}\n.kpi-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 1.25rem;\n}\n.kpi-card {\n  background: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 14px;\n  padding: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n}\n.kpi-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);\n}\n.kpi-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.kpi-title {\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: var(--dc-ink-muted, #64748b);\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.kpi-icon-wrap {\n  width: 36px;\n  height: 36px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.15rem;\n}\n.kpi-value-row {\n  display: flex;\n  align-items: baseline;\n  gap: 0.65rem;\n}\n.kpi-number {\n  font-size: 1.85rem;\n  font-weight: 800;\n  color: var(--dc-ink, #0f172a);\n  letter-spacing: -0.03em;\n  line-height: 1;\n}\n.kpi-loading-skeleton {\n  width: 60px;\n  height: 32px;\n  background-color: var(--dc-surface-high, #f1f5f9);\n  border-radius: 6px;\n  animation: pulse 1.5s infinite;\n}\n.kpi-badge-trend {\n  font-size: 0.72rem;\n  font-weight: 600;\n  padding: 2px 6px;\n  border-radius: 6px;\n}\n.kpi-badge-trend.positive {\n  background-color: var(--dc-teal-surface, #ecfdf5);\n  color: var(--dc-teal-ink, #059669);\n}\n.kpi-status-tag {\n  font-size: 0.72rem;\n  font-weight: 600;\n  background-color: var(--dc-purple-surface, #f3e8ff);\n  color: var(--dc-purple-ink, #7e22ce);\n  padding: 2px 7px;\n  border-radius: 6px;\n}\n.kpi-badge-pill {\n  font-size: 0.72rem;\n  font-weight: 600;\n  background-color: var(--dc-warning-surface, #fef3c7);\n  color: var(--dc-warning-ink, #b45309);\n  padding: 2px 7px;\n  border-radius: 6px;\n}\n.kpi-footer {\n  margin-top: auto;\n  padding-top: 0.5rem;\n  border-top: 1px solid var(--dc-outline, #f8fafc);\n}\n.kpi-link {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: var(--dc-teal-ink, #006874);\n  text-decoration: none;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  transition: gap 0.15s ease;\n}\n.kpi-link:hover {\n  gap: 0.5rem;\n}\n.kpi-subtext {\n  font-size: 0.75rem;\n  color: var(--dc-ink-muted, #94a3b8);\n}\n.dashboard-main-split {\n  display: grid;\n  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);\n  gap: 1.5rem;\n  flex: 1;\n  align-items: stretch;\n}\n@media (max-width: 1024px) {\n  .dashboard-main-split {\n    grid-template-columns: 1fr;\n  }\n}\n.dashboard-primary-col {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  height: 100%;\n}\n.patients-directory-card {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.dashboard-side-col {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  height: 100%;\n}\n.quick-notes-card {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.content-card {\n  background: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 14px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.card-header-row {\n  padding: 1.15rem 1.25rem;\n  border-bottom: 1px solid var(--dc-outline, #f1f5f9);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.header-title-wrap {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n.card-title {\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: var(--dc-ink, #0f172a);\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n}\n.title-icon {\n  font-size: 1.15rem;\n}\n.card-subtitle {\n  font-size: 0.78rem;\n  color: var(--dc-ink-muted, #64748b);\n  margin: 0;\n}\n.secondary-outline-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  background: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  color: var(--dc-ink-secondary, #334155);\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  text-decoration: none;\n  transition: all 0.15s ease;\n}\n.secondary-outline-btn:hover {\n  background: var(--dc-surface-low, #f8fafc);\n  color: var(--dc-ink, #0f172a);\n  border-color: #94a3b8;\n}\n.secondary-outline-btn.btn-sm {\n  padding: 0.38rem 0.75rem;\n  font-size: 0.78rem;\n}\n.secondary-outline-btn.btn-xs {\n  padding: 0.25rem 0.55rem;\n  font-size: 0.75rem;\n}\n.encounters-table-wrap {\n  width: 100%;\n  overflow-x: auto;\n}\n.clinical-table {\n  width: 100%;\n  border-collapse: collapse;\n  text-align: left;\n  font-size: 0.85rem;\n}\n.clinical-table thead {\n  background-color: var(--dc-surface-low, #f8fafc);\n  border-bottom: 1px solid var(--dc-outline, #e2e8f0);\n}\n.clinical-table th {\n  padding: 0.65rem 1rem;\n  font-weight: 600;\n  color: var(--dc-ink-secondary, #475569);\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n}\n.clinical-table td {\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid var(--dc-outline, #f1f5f9);\n  color: var(--dc-ink-secondary, #334155);\n  vertical-align: middle;\n}\n.clinical-table tbody tr:hover {\n  background-color: var(--dc-surface-low, #fbfcfd);\n}\n.patient-cell {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n}\n.patient-cell-avatar {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background: var(--dc-surface-high, #e2e8f0);\n  color: var(--dc-ink, #1e293b);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.75rem;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n.patient-cell-info {\n  display: flex;\n  flex-direction: column;\n}\n.patient-cell-name {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--dc-ink, #0f172a);\n}\n.patient-cell-meta {\n  font-size: 0.72rem;\n  color: var(--dc-ink-muted, #64748b);\n}\n.cell-datetime {\n  font-size: 0.78rem;\n  color: var(--dc-ink-muted, #64748b);\n}\n.cell-complaint {\n  max-width: 180px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  display: block;\n}\n.diag-cell {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.diag-code-badge {\n  font-size: 0.7rem;\n  font-weight: 700;\n  background-color: var(--dc-surface-high, #f1f5f9);\n  color: var(--dc-teal-ink, #006874);\n  padding: 1px 5px;\n  border-radius: 4px;\n}\n.diag-desc {\n  font-size: 0.82rem;\n  max-width: 200px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.btn-open-record {\n  background: transparent;\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  color: var(--dc-teal-ink, #006874);\n  border-radius: 6px;\n  padding: 0.3rem 0.65rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.btn-open-record:hover {\n  background-color: var(--dc-teal-surface, #f0fdfa);\n  border-color: #006874;\n}\n.datetime-cell-stack {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.datetime-top-row {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.today-pill-badge {\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  background-color: var(--dc-teal-surface, #ecfdf5);\n  color: var(--dc-teal-ink, #047857);\n  border: 1px solid #a7f3d0;\n  padding: 1px 6px;\n  border-radius: 9999px;\n}\n.cell-date-strong {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: var(--dc-ink, #1e293b);\n}\n.cell-time-sub {\n  font-size: 0.72rem;\n  color: var(--dc-ink-muted, #64748b);\n}\n.consultation-type-pill {\n  display: inline-flex;\n  align-items: center;\n  font-size: 0.72rem;\n  font-weight: 600;\n  padding: 0.2rem 0.6rem;\n  border-radius: 9999px;\n  background-color: var(--dc-surface-high, #f1f5f9);\n  color: var(--dc-ink-secondary, #334155);\n  white-space: nowrap;\n}\n.consultation-type-pill.type-first {\n  background-color: var(--dc-teal-surface, #e6f6f8);\n  color: var(--dc-teal-ink, #006874);\n}\n.consultation-type-pill.type-emergency {\n  background-color: var(--dc-error-surface, #fff1f2);\n  color: var(--dc-error-ink, #be123c);\n}\n.highlights-stack {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n  max-width: 280px;\n}\n.highlight-row {\n  display: flex;\n  align-items: baseline;\n  gap: 0.35rem;\n  font-size: 0.78rem;\n  line-height: 1.3;\n}\n.highlight-label {\n  font-weight: 600;\n  color: var(--dc-ink-secondary, #475569);\n  flex-shrink: 0;\n}\n.highlight-val {\n  color: var(--dc-ink, #0f172a);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.row-actions-group {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.btn-view-encounter {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  background: var(--dc-surface-low, #f8fafc);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  color: var(--dc-ink-secondary, #334155);\n  border-radius: 6px;\n  padding: 0.3rem 0.6rem;\n  font-size: 0.74rem;\n  font-weight: 600;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: all 0.15s ease;\n}\n.btn-view-encounter:hover {\n  background: var(--dc-surface-high, #f1f5f9);\n  color: var(--dc-ink, #0f172a);\n  border-color: var(--dc-outline, #cbd5e1);\n}\n.empty-state-wrap {\n  padding: 2.5rem 1.5rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 0.65rem;\n}\n.empty-icon-circle {\n  width: 54px;\n  height: 54px;\n  border-radius: 50%;\n  background-color: var(--dc-teal-surface, #f0fdfa);\n  color: var(--dc-teal-ink, #006874);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.6rem;\n  margin-bottom: 0.5rem;\n}\n.empty-title {\n  font-size: 1rem;\n  font-weight: 700;\n  color: var(--dc-ink, #0f172a);\n  margin: 0;\n}\n.empty-desc {\n  font-size: 0.82rem;\n  color: var(--dc-ink-muted, #64748b);\n  max-width: 400px;\n  margin: 0;\n}\n.directory-search-box {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.search-box-icon {\n  position: absolute;\n  left: 0.65rem;\n  color: var(--dc-ink-muted, #94a3b8);\n  font-size: 0.9rem;\n}\n.directory-search-input {\n  padding: 0.35rem 0.75rem 0.35rem 2rem;\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 8px;\n  font-size: 0.82rem;\n  background-color: var(--dc-surface-low, #f8fafc);\n  color: var(--dc-ink, #0f172a);\n  outline: none;\n  width: 180px;\n  transition: all 0.15s ease;\n}\n.directory-search-input:focus {\n  background-color: var(--dc-surface, #ffffff);\n  border-color: #006874;\n  width: 220px;\n}\n.table-pagination-row {\n  margin-top: auto;\n  padding: 0.65rem 1rem;\n  background-color: var(--dc-surface-low, #f8fafc);\n  border-top: 1px solid var(--dc-outline, #e2e8f0);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.pagination-info {\n  font-size: 0.75rem;\n  color: var(--dc-ink-muted, #64748b);\n}\n.pagination-btns {\n  display: flex;\n  gap: 0.4rem;\n}\n.btn-page {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.25rem 0.65rem;\n  font-size: 0.75rem;\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  background-color: var(--dc-surface, #ffffff);\n  border-radius: 6px;\n  color: var(--dc-ink-secondary, #334155);\n  cursor: pointer;\n}\n.btn-page:disabled {\n  opacity: 0.45;\n  cursor: not-allowed;\n}\n.widget-header {\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid var(--dc-outline, #f1f5f9);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.widget-title {\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--dc-ink, #0f172a);\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  margin: 0;\n}\n.quick-actions-list {\n  padding: 0.75rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n.quick-action-btn {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.65rem 0.75rem;\n  border: 1px solid var(--dc-outline, #f1f5f9);\n  border-radius: 10px;\n  background-color: var(--dc-surface, #ffffff);\n  text-decoration: none;\n  cursor: pointer;\n  transition: all 0.15s ease;\n  width: 100%;\n  text-align: left;\n}\n.quick-action-btn:hover {\n  background-color: var(--dc-surface-low, #f8fafc);\n  border-color: var(--dc-outline, #e2e8f0);\n  transform: translateY(-1px);\n}\n.quick-action-btn.primary-tint {\n  background-color: var(--dc-teal-surface, #f0fdfa);\n  border-color: #ccfbf1;\n}\n.quick-action-btn.primary-tint:hover {\n  background-color: var(--dc-teal-surface, #e6f9f6);\n  border-color: #99f6e4;\n}\n.qa-icon-wrap {\n  width: 36px;\n  height: 36px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.15rem;\n  flex-shrink: 0;\n}\n.qa-text {\n  display: flex;\n  flex-direction: column;\n}\n.qa-title {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--dc-ink, #0f172a);\n}\n.qa-desc {\n  font-size: 0.72rem;\n  color: var(--dc-ink-muted, #64748b);\n}\n.notes-widget-body {\n  padding: 1rem 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  flex: 1;\n}\n.notes-textarea {\n  width: 100%;\n  flex: 1;\n  min-height: 140px;\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 8px;\n  padding: 0.75rem;\n  font-size: 0.85rem;\n  font-family: inherit;\n  color: var(--dc-ink, #0f172a);\n  background-color: var(--dc-surface-low, #fbfcfd);\n  resize: vertical;\n  outline: none;\n  transition: border-color 0.15s ease;\n  box-sizing: border-box;\n}\n.notes-textarea:focus {\n  background-color: var(--dc-surface, #ffffff);\n  border-color: #006874;\n}\n.notes-footer-hint {\n  font-size: 0.7rem;\n  color: var(--dc-ink-muted, #94a3b8);\n}\n.notes-actions {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.save-notes-button {\n  background: #006874;\n  border: none;\n  border-radius: 6px;\n  color: #ffffff;\n  cursor: pointer;\n  font-size: 0.75rem;\n  font-weight: 600;\n  padding: 0.35rem 0.7rem;\n}\n.save-notes-button:disabled {\n  background: var(--dc-surface-high, #cbd5e1);\n  cursor: not-allowed;\n}\n.card-loading-state {\n  padding: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.65rem;\n  color: var(--dc-ink-muted, #64748b);\n  font-size: 0.85rem;\n}\n.mini-spinner {\n  width: 18px;\n  height: 18px;\n  border: 2px solid var(--dc-outline, #e2e8f0);\n  border-top-color: #006874;\n  border-radius: 50%;\n  animation: spin 0.7s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n.recent-activity-card {\n  border-color: var(--dc-outline, #dce8eb);\n  box-shadow: 0 4px 20px rgb(15 23 42 / 3%);\n}\n.recent-card-heading {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 24px 26px 20px;\n}\n.recent-heading-icon {\n  display: grid;\n  place-items: center;\n  width: 44px;\n  height: 44px;\n  flex-shrink: 0;\n  border-radius: 13px;\n  background: var(--dc-teal-surface, #e7f5f4);\n  color: var(--dc-teal-ink, #007b7b);\n  font-size: 1.375rem;\n}\n.recent-heading-text {\n  min-width: 0;\n}\n.recent-eyebrow {\n  font-size: 0.625rem;\n  font-weight: 700;\n  letter-spacing: 0.13em;\n  color: var(--dc-teal-ink, #007b7b);\n}\n.recent-heading-text h2 {\n  margin: 3px 0 4px;\n  color: var(--dc-ink, #17233b);\n  font-size: 1.125rem;\n  font-weight: 750;\n  letter-spacing: -0.025em;\n}\n.recent-heading-text p {\n  margin: 0;\n  font-size: 0.75rem;\n  color: var(--dc-ink-secondary, #64748b);\n}\n.recent-history-link {\n  margin-left: auto;\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  color: var(--dc-teal-ink, #006874);\n  font-size: 0.75rem;\n  font-weight: 650;\n  text-decoration: none;\n  white-space: nowrap;\n}\n.recent-history-link:hover {\n  text-decoration: underline;\n}\n.recent-toolbar {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n  padding: 0 26px 20px;\n}\n.recent-search-wrap {\n  flex: 1;\n  min-width: 220px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  border: 1px solid var(--dc-outline, #dde5eb);\n  border-radius: 10px;\n  padding: 10px 13px;\n  background: var(--dc-surface, #f8fafb);\n  color: var(--dc-ink-muted, #8191a5);\n}\n.recent-search-wrap:focus-within {\n  border-color: var(--dc-teal-ink, #00838a);\n  background: var(--dc-surface, white);\n  box-shadow: 0 0 0 3px rgb(0 131 138 / 9%);\n}\n.recent-search-wrap input {\n  width: 100%;\n  min-width: 0;\n  border: 0;\n  outline: 0;\n  font: inherit;\n  font-size: 0.8125rem;\n  color: var(--dc-ink, #17233b);\n  background: transparent;\n}\n.recent-search-wrap input::placeholder {\n  color: var(--dc-ink-muted, #8290a3);\n}\n.recent-size-label {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  font-size: 0.75rem;\n  color: var(--dc-ink-secondary, #64748b);\n}\n.recent-refresh-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  padding: 10px 12px;\n  border: 1px solid var(--dc-outline, #dde5eb);\n  border-radius: 9px;\n  background: var(--dc-surface, white);\n  color: var(--dc-ink-secondary, #52647a);\n  font: inherit;\n  font-size: 0.75rem;\n  cursor: pointer;\n}\n.recent-refresh-btn:hover:not(:disabled) {\n  border-color: var(--dc-teal-ink, #00838a);\n  color: var(--dc-teal-ink, #006874);\n}\n.recent-refresh-btn:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.recent-size-label select {\n  border: 1px solid var(--dc-outline, #dde5eb);\n  border-radius: 9px;\n  padding: 10px;\n  color: var(--dc-ink-secondary, #334155);\n  font: inherit;\n  background: var(--dc-surface, white);\n  cursor: pointer;\n}\n.recent-column-labels,\n.recent-consultation {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr) 12.125rem;\n  gap: 24px;\n}\n.recent-column-labels {\n  padding: 11px 26px;\n  background: var(--dc-surface, #f8fafb);\n  border-block: 1px solid var(--dc-outline, #edf1f4);\n  color: var(--dc-ink-muted, #7a899e);\n  font-size: 0.625rem;\n  font-weight: 700;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n}\n.recent-column-labels span:last-child {\n  text-align: right;\n}\n.recent-consultation {\n  position: relative;\n  align-items: center;\n  padding: 19px 26px;\n  border-bottom: 1px solid var(--dc-outline, #edf1f4);\n  transition: background 0.15s;\n}\n.recent-consultation:last-child {\n  border-bottom: none;\n}\n.recent-consultation:hover {\n  background: var(--dc-surface-high, #f7fbfb);\n}\n.recent-consultation.consultation-today::before {\n  content: "";\n  position: absolute;\n  left: 0;\n  top: 22px;\n  bottom: 22px;\n  width: 3px;\n  border-radius: 0 3px 3px 0;\n  background: #00a29b;\n}\n.recent-patient {\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n  min-width: 0;\n}\n.recent-avatar {\n  display: grid;\n  place-items: center;\n  width: 40px;\n  height: 40px;\n  flex-shrink: 0;\n  border-radius: 12px;\n  background: var(--dc-surface, #edf4f7);\n  color: var(--dc-ink-secondary, #3d6274);\n  font-size: 0.75rem;\n  font-weight: 700;\n}\n.consultation-today .recent-avatar {\n  background: var(--dc-teal-surface, #e5f6f2);\n  color: var(--dc-teal-ink, #008077);\n}\n.recent-patient-info {\n  min-width: 0;\n}\n.recent-patient-info h3 {\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: 650;\n  line-height: 1.45;\n  color: var(--dc-ink, #17233b);\n  overflow-wrap: anywhere;\n}\n.recent-patient-info p {\n  margin: 4px 0 7px;\n  font-size: 0.6875rem;\n  line-height: 1.5;\n  color: var(--dc-ink-muted, #748398);\n  overflow-wrap: anywhere;\n}\n.recent-patient-info .consultation-type-pill {\n  max-width: 100%;\n  white-space: normal;\n  font-size: 0.625rem;\n  line-height: 1.5;\n  padding: 2px 8px;\n}\n.recent-clinical-summary {\n  min-width: 0;\n}\n.recent-clinical-summary p {\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  overflow: hidden;\n  margin: 4px 0;\n  font-size: 0.75rem;\n  line-height: 1.6;\n  color: var(--dc-ink-secondary, #607087);\n  overflow-wrap: anywhere;\n}\n.recent-clinical-summary b {\n  font-weight: 600;\n  color: var(--dc-ink, #35445c);\n}\n.recent-date-actions {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 4px;\n  min-width: 0;\n}\n.recent-date {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 7px;\n  color: var(--dc-ink, #35445c);\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n.recent-time {\n  font-size: 0.6875rem;\n  color: var(--dc-ink-muted, #8191a5);\n}\n.recent-actions {\n  display: flex;\n  gap: 7px;\n  margin-top: 8px;\n}\n.recent-actions button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n  border-radius: 7px;\n  padding: 7px 9px;\n  font: inherit;\n  font-size: 0.6875rem;\n  font-weight: 600;\n  white-space: nowrap;\n  cursor: pointer;\n  transition: background 0.15s, border-color 0.15s;\n}\n.recent-detail-btn {\n  color: var(--dc-teal-ink, #007577);\n  background: var(--dc-teal-surface, #edf8f6);\n  border: 1px solid var(--dc-outline, #d9efea);\n}\n.recent-detail-btn:hover {\n  background: var(--dc-teal-surface, #dff2ed);\n  border-color: var(--dc-outline, #8dcabf);\n}\n.recent-record-btn {\n  color: var(--dc-ink-secondary, #52647a);\n  background: var(--dc-surface, white);\n  border: 1px solid var(--dc-outline, #dde5eb);\n}\n.recent-record-btn:hover {\n  background: var(--dc-surface-high, #f1f5f9);\n  border-color: var(--dc-outline, #aebfcf);\n}\n.recent-pagination {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  align-items: center;\n  gap: 14px;\n  padding: 17px 26px;\n  border-top: 1px solid var(--dc-outline, #edf1f4);\n  background: var(--dc-surface, #fcfdfd);\n}\n.recent-count {\n  font-size: 0.75rem;\n  color: var(--dc-ink-muted, #718096);\n}\n.recent-count b {\n  color: var(--dc-ink, #35445c);\n  font-weight: 600;\n}\n.recent-count > span {\n  display: block;\n  margin-top: 3px;\n  font-size: 0.625rem;\n  color: var(--dc-ink-muted, #8796a8);\n}\n.recent-page-buttons {\n  display: flex;\n  gap: 5px;\n  padding-right: 2rem;\n}\n.recent-page-buttons button {\n  display: grid;\n  place-items: center;\n  width: 32px;\n  height: 32px;\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  background: var(--dc-surface, white);\n  color: var(--dc-ink-muted, #66788e);\n  border-radius: 8px;\n  font: inherit;\n  font-size: 0.75rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.recent-page-buttons button:hover:not(:disabled) {\n  background: var(--dc-teal-surface, #edf8f6);\n  color: var(--dc-teal-ink, #006874);\n}\n.recent-page-buttons button.current-page {\n  background: #006874;\n  border-color: #006874;\n  color: white;\n}\n.recent-page-buttons button:disabled {\n  opacity: 0.35;\n  cursor: default;\n}\n.recent-activity-card button:focus-visible,\n.recent-history-link:focus-visible,\n.recent-size-label select:focus-visible {\n  outline: 2px solid var(--dc-teal-ink, #00838a);\n  outline-offset: 3px;\n}\n.recent-loading {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 10px;\n  min-height: 280px;\n  color: var(--dc-ink-muted, #718096);\n  font-size: 0.8125rem;\n}\n.recent-empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  min-height: 260px;\n  padding: 26px;\n  text-align: center;\n}\n.recent-empty > ng-icon {\n  font-size: 1.75rem;\n  color: var(--dc-teal-ink, #00958e);\n}\n.recent-empty h3 {\n  font-size: 0.9375rem;\n  color: var(--dc-ink, #35445c);\n  margin: 0;\n}\n.recent-empty p {\n  font-size: 0.75rem;\n  line-height: 1.7;\n  color: var(--dc-ink-muted, #718096);\n  margin: 0;\n  max-width: 380px;\n}\n@media (max-width: 1100px) {\n  .recent-column-labels {\n    display: none;\n  }\n  .recent-consultation {\n    grid-template-columns: minmax(0, 1fr) 12.125rem;\n    gap: 12px 20px;\n  }\n  .recent-patient {\n    grid-column: 1;\n    grid-row: 1;\n  }\n  .recent-date-actions {\n    grid-column: 2;\n    grid-row: 1;\n  }\n  .recent-clinical-summary {\n    grid-column: 1 / -1;\n    padding-left: 52px;\n  }\n}\n@media (max-width: 600px) {\n  .recent-card-heading {\n    align-items: flex-start;\n    flex-wrap: wrap;\n    padding: 18px;\n    gap: 10px;\n  }\n  .recent-heading-text {\n    flex: 1;\n  }\n  .recent-heading-text h2 {\n    font-size: 1rem;\n  }\n  .recent-history-link {\n    margin-left: 54px;\n  }\n  .recent-toolbar {\n    padding: 0 18px 18px;\n  }\n  .recent-search-wrap {\n    flex-basis: 100%;\n    min-width: 0;\n  }\n  .recent-size-label {\n    margin-left: auto;\n  }\n  .recent-consultation {\n    grid-template-columns: minmax(0, 1fr);\n    padding: 18px;\n  }\n  .recent-date-actions {\n    grid-column: 1;\n    grid-row: 3;\n    flex-direction: row;\n    align-items: center;\n    flex-wrap: wrap;\n    gap: 8px;\n  }\n  .recent-clinical-summary {\n    padding-left: 0;\n  }\n  .recent-actions {\n    width: 100%;\n    margin-top: 2px;\n  }\n  .recent-actions button {\n    flex: 1;\n    padding: 10px;\n  }\n  .recent-pagination {\n    padding: 16px 18px;\n  }\n  .recent-page-buttons button:not(:first-child):not(:last-child):not(.current-page) {\n    display: none;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */\n'] }]
  }], () => [], { onClinicalDataChanged: [{
    type: HostListener,
    args: ["window:patient-created"]
  }, {
    type: HostListener,
    args: ["window:patient-updated"]
  }, {
    type: HostListener,
    args: ["window:patient-deleted"]
  }, {
    type: HostListener,
    args: ["window:encounter-created"]
  }, {
    type: HostListener,
    args: ["window:encounter-updated"]
  }, {
    type: HostListener,
    args: ["window:encounter-deleted"]
  }, {
    type: HostListener,
    args: ["window:auth-success"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/features/dashboard/dashboard.component.ts", lineNumber: 95 });
})();
export {
  DashboardComponent
};
//# debugId=209c7823-c535-527f-bca1-7e288df0e9dd
//# sourceMappingURL=chunk-YBMN5S2N.js.map
