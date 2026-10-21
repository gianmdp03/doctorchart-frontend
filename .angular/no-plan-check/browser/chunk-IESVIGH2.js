import {
  displayLocalDate
} from "./chunk-6MPLKXQY.js";
import {
  getTotalElements,
  getTotalPages
} from "./chunk-BGC6F3KO.js";
import {
  AccountReadScope
} from "./chunk-XSB2SWVD.js";
import {
  ActivePatientService,
  PatientService
} from "./chunk-C5KB4SWE.js";
import "./chunk-YTAXUAO7.js";
import {
  WorkspaceStore
} from "./chunk-WPGAV52V.js";
import {
  DoctorSpecialtyService
} from "./chunk-USM5S45Q.js";
import "./chunk-5XEBCQUW.js";
import "./chunk-WKCAPCQH.js";
import "./chunk-WBCHXDEU.js";
import {
  Router
} from "./chunk-XM57RTTR.js";
import "./chunk-YAYJVLGH.js";
import {
  isPlatformBrowser
} from "./chunk-SYX7XZ26.js";
import {
  Component,
  DestroyRef,
  HostListener,
  PLATFORM_ID,
  ViewChild,
  computed,
  effect,
  inject,
  setClassMetadata,
  signal,
  takeUntil,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuerySignal
} from "./chunk-3HO5VEWU.js";

// src/app/features/patient-list/patient-list.component.ts
var _c0 = ["scrollSentinel"];
var _forTrack0 = ($index, $item) => $item.id;
function PatientListComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 4);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(' (b\xFAsqueda: "', ctx_r0.searchQuery(), '")');
  }
}
function PatientListComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 26);
    \u0275\u0275domListener("click", function PatientListComponent_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.clearSearch());
    });
    \u0275\u0275text(1, " \u2715 ");
    \u0275\u0275domElementEnd();
  }
}
function PatientListComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 11);
    \u0275\u0275domListener("click", function PatientListComponent_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setFilter("INFANT"));
    });
    \u0275\u0275text(1, " Lactantes (0-12m) ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "button", 11);
    \u0275\u0275domListener("click", function PatientListComponent_Conditional_16_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setFilter("TODDLER"));
    });
    \u0275\u0275text(3, " Primera Infancia ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "button", 11);
    \u0275\u0275domListener("click", function PatientListComponent_Conditional_16_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setFilter("VACCINE_PENDING"));
    });
    \u0275\u0275text(5, " Vacunaci\xF3n Pendiente ");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("filter-active", ctx_r0.selectedFilter() === "INFANT");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("filter-active", ctx_r0.selectedFilter() === "TODDLER");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("filter-active", ctx_r0.selectedFilter() === "VACCINE_PENDING");
  }
}
function PatientListComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 11);
    \u0275\u0275domListener("click", function PatientListComponent_Conditional_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setFilter("ADULT"));
    });
    \u0275\u0275text(1, " Adultos (\u2265 18 a\xF1os) ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "button", 11);
    \u0275\u0275domListener("click", function PatientListComponent_Conditional_17_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setFilter("MINOR"));
    });
    \u0275\u0275text(3, " Menores (< 18 a\xF1os) ");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("filter-active", ctx_r0.selectedFilter() === "ADULT");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("filter-active", ctx_r0.selectedFilter() === "MINOR");
  }
}
function PatientListComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "p", 13);
    \u0275\u0275text(1);
    \u0275\u0275domElementStart(2, "button", 11);
    \u0275\u0275domListener("click", function PatientListComponent_Conditional_20_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.loadInitial());
    });
    \u0275\u0275text(3, "Reintentar");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx, " ");
  }
}
function PatientListComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "th", 22);
    \u0275\u0275text(1, "Vacunaci\xF3n");
    \u0275\u0275domElementEnd();
  }
}
function PatientListComponent_For_41_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 34);
    \u0275\u0275text(1, "\u2642 Var\xF3n");
    \u0275\u0275domElementEnd();
  }
}
function PatientListComponent_For_41_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 35);
    \u0275\u0275text(1, "\u2640 Mujer");
    \u0275\u0275domElementEnd();
  }
}
function PatientListComponent_For_41_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 45);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 55);
    \u0275\u0275domElement(2, "path", 56);
    \u0275\u0275domElementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275domElementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const patient_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(patient_r8.rawPhone);
  }
}
function PatientListComponent_For_41_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 46);
    \u0275\u0275text(1, "\u2014");
    \u0275\u0275domElementEnd();
  }
}
function PatientListComponent_For_41_Conditional_29_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 59);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const patient_r8 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2022 ", patient_r8.lastEncounterDateDisplay);
  }
}
function PatientListComponent_For_41_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 48);
    \u0275\u0275domElement(1, "span", 57);
    \u0275\u0275domElementStart(2, "span", 58);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(4, PatientListComponent_For_41_Conditional_29_Conditional_4_Template, 2, 1, "span", 59);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const patient_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275domProperty("title", patient_r8.lastCheckup);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", patient_r8.totalEncounters, " ", patient_r8.totalEncounters === 1 ? "control" : "controles");
    \u0275\u0275advance();
    \u0275\u0275conditional(patient_r8.lastEncounterDateDisplay ? 4 : -1);
  }
}
function PatientListComponent_For_41_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 49);
    \u0275\u0275domElement(1, "span", 57);
    \u0275\u0275domElementStart(2, "span");
    \u0275\u0275text(3, "Sin controles previos");
    \u0275\u0275domElementEnd()();
  }
}
function PatientListComponent_For_41_Conditional_31_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 60);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 62);
    \u0275\u0275domElement(2, "circle", 63)(3, "line", 64)(4, "line", 65);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(5, " Pendiente ");
    \u0275\u0275domElementEnd();
  }
}
function PatientListComponent_For_41_Conditional_31_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 61);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 62);
    \u0275\u0275domElement(2, "polyline", 66);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3, " Al d\xEDa ");
    \u0275\u0275domElementEnd();
  }
}
function PatientListComponent_For_41_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "td", 50);
    \u0275\u0275conditionalCreate(1, PatientListComponent_For_41_Conditional_31_Conditional_1_Template, 6, 0, "span", 60)(2, PatientListComponent_For_41_Conditional_31_Conditional_2_Template, 4, 0, "span", 61);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const patient_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(patient_r8.hasPendingVaccine ? 1 : 2);
  }
}
function PatientListComponent_For_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "tr", 24)(1, "td", 27)(2, "div", 28)(3, "div", 29);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div", 30)(6, "span", 31);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "div", 32)(9, "span", 33);
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(11, PatientListComponent_For_41_Conditional_11_Template, 2, 0, "span", 34)(12, PatientListComponent_For_41_Conditional_12_Template, 2, 0, "span", 35);
    \u0275\u0275domElementEnd()()()();
    \u0275\u0275domElementStart(13, "td", 36)(14, "span", 37);
    \u0275\u0275text(15);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(16, "td", 38)(17, "div", 39)(18, "div", 40)(19, "span", 41);
    \u0275\u0275text(20);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(21, "span", 42);
    \u0275\u0275text(22);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(23, "span", 43);
    \u0275\u0275text(24);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(25, "td", 44);
    \u0275\u0275conditionalCreate(26, PatientListComponent_For_41_Conditional_26_Template, 5, 1, "div", 45)(27, PatientListComponent_For_41_Conditional_27_Template, 2, 0, "span", 46);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(28, "td", 47);
    \u0275\u0275conditionalCreate(29, PatientListComponent_For_41_Conditional_29_Template, 5, 4, "div", 48)(30, PatientListComponent_For_41_Conditional_30_Template, 4, 0, "div", 49);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(31, PatientListComponent_For_41_Conditional_31_Template, 3, 1, "td", 50);
    \u0275\u0275domElementStart(32, "td", 51)(33, "button", 52);
    \u0275\u0275domListener("click", function PatientListComponent_For_41_Template_button_click_33_listener() {
      const patient_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.selectPatient(patient_r8));
    });
    \u0275\u0275domElementStart(34, "span");
    \u0275\u0275text(35, "Ver Ficha");
    \u0275\u0275domElementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(36, "svg", 53);
    \u0275\u0275domElement(37, "polyline", 54);
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const patient_r8 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275classMap(patient_r8.genderAvatarClass);
    \u0275\u0275domProperty("title", "Sexo / G\xE9nero: " + patient_r8.genderLabel);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", patient_r8.initials, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(patient_r8.fullName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("ID #", patient_r8.id);
    \u0275\u0275advance();
    \u0275\u0275conditional(patient_r8.gender === "male" ? 11 : patient_r8.gender === "female" ? 12 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(patient_r8.rawNationalId || "\u2014");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(patient_r8.ageDisplay);
    \u0275\u0275advance();
    \u0275\u0275classMap(patient_r8.badgeClass);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", patient_r8.badgeText, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("F. Nac: ", patient_r8.birthDateDisplay);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(patient_r8.rawPhone ? 26 : 27);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(patient_r8.totalEncounters > 0 ? 29 : 30);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.doctorSpecialtyService.supportsGrowthCharts() ? 31 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("title", "Abrir ficha cl\xEDnica de " + patient_r8.fullName);
  }
}
function PatientListComponent_ForEmpty_42_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 68);
    \u0275\u0275domElement(1, "div", 70);
    \u0275\u0275domElementStart(2, "p");
    \u0275\u0275text(3, "Cargando directorio de pacientes...");
    \u0275\u0275domElementEnd()();
  }
}
function PatientListComponent_ForEmpty_42_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 69)(1, "div", 71);
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(2, "svg", 72);
    \u0275\u0275domElement(3, "path", 73);
    \u0275\u0275domElementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275domElementStart(4, "h3");
    \u0275\u0275text(5, "No se encontraron pacientes");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7, " No existen pacientes que coincidan con el filtro actual o la b\xFAsqueda ingresada. ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "div", 74)(9, "button", 12);
    \u0275\u0275domListener("click", function PatientListComponent_ForEmpty_42_Conditional_3_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.resetFilters());
    });
    \u0275\u0275text(10, " Restablecer Filtros ");
    \u0275\u0275domElementEnd()()();
  }
}
function PatientListComponent_ForEmpty_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "tr")(1, "td", 67);
    \u0275\u0275conditionalCreate(2, PatientListComponent_ForEmpty_42_Conditional_2_Template, 4, 0, "div", 68)(3, PatientListComponent_ForEmpty_42_Conditional_3_Template, 11, 0, "div", 69);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r0.visibleColumnsCount());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isLoading() ? 2 : 3);
  }
}
function PatientListComponent_Conditional_43_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 76);
    \u0275\u0275domElement(1, "div", 78);
    \u0275\u0275domElementStart(2, "span");
    \u0275\u0275text(3, "Cargando m\xE1s pacientes...");
    \u0275\u0275domElementEnd()();
  }
}
function PatientListComponent_Conditional_43_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 77)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u2713 Directorio completo (", ctx_r0.totalElements(), " pacientes)");
  }
}
function PatientListComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 25);
    \u0275\u0275domElement(1, "div", 75, 0);
    \u0275\u0275conditionalCreate(3, PatientListComponent_Conditional_43_Conditional_3_Template, 4, 0, "div", 76)(4, PatientListComponent_Conditional_43_Conditional_4_Template, 3, 1, "div", 77);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.isLoadingMore() ? 3 : !ctx_r0.hasMore() && ctx_r0.totalElements() > 15 ? 4 : -1);
  }
}
function extractInitials(fullName) {
  if (!fullName)
    return "DP";
  const parts = fullName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return fullName.slice(0, 2).toUpperCase();
}
function resolveGender(gender) {
  if (!gender) {
    return { gender: "other", label: "Indefinido", avatarClass: "avatar-neutral" };
  }
  const val = gender.trim().toUpperCase();
  if (["MALE", "M", "MASCULINO", "VARON", "VAR\xD3N", "BOY", "NI\xD1O"].includes(val)) {
    return { gender: "male", label: "Var\xF3n", avatarClass: "avatar-male" };
  }
  if (["FEMALE", "F", "FEMENINO", "MUJER", "GIRL", "NI\xD1A"].includes(val)) {
    return { gender: "female", label: "Mujer", avatarClass: "avatar-female" };
  }
  return { gender: "other", label: "Indefinido", avatarClass: "avatar-neutral" };
}
function mapDtoToCardItem(dto) {
  const badges = {
    ADULT: "Adulto",
    NEONATAL: "Neonatal",
    INFANT: "Lactante",
    CHILD: "Ni\xF1ez",
    ADOLESCENT: "Adolescente",
    UNKNOWN: "\u2014"
  };
  const badgeText = badges[dto.ageGroup] ?? "\u2014";
  const badgeClass = dto.ageGroup === "ADULT" ? "badge-primary" : "badge-info";
  const genderInfo = resolveGender(dto.gender);
  return {
    id: dto.id,
    fullName: dto.fullName,
    birthDate: dto.birthDate,
    initials: extractInitials(dto.fullName),
    ageDisplay: dto.ageDisplay,
    ageInMonths: dto.ageInMonths,
    birthDateDisplay: displayLocalDate(dto.birthDate),
    dni: dto.nationalId ? `DNI: ${dto.nationalId}` : `ID #${dto.id}`,
    rawNationalId: dto.nationalId || null,
    rawPhone: dto.phone || null,
    tutor: dto.phone ? `Tel: ${dto.phone}` : "Contacto registrado",
    lastCheckup: (dto.totalEncounters ?? 0) > 0 ? `${dto.totalEncounters} ${(dto.totalEncounters ?? 0) === 1 ? "control previo" : "controles previos"}${dto.lastEncounterDate ? " \u2022 \xDAltimo: " + displayLocalDate(dto.lastEncounterDate) : ""}` : "Sin controles previos",
    nextCheckupOrNote: (dto.totalEncounters ?? 0) === 0 ? "1\xAA Consulta Pendiente" : "Control peri\xF3dico",
    totalEncounters: dto.totalEncounters ?? 0,
    lastEncounterDate: dto.lastEncounterDate ?? null,
    lastEncounterDateDisplay: dto.lastEncounterDate ? displayLocalDate(dto.lastEncounterDate) : null,
    badgeText,
    badgeClass,
    hasPendingVaccine: dto.hasPendingVaccine,
    gender: genderInfo.gender,
    genderLabel: genderInfo.label,
    genderAvatarClass: genderInfo.avatarClass
  };
}
var PatientListComponent = class _PatientListComponent {
  patientService = inject(PatientService);
  activePatientService = inject(ActivePatientService);
  doctorSpecialtyService = inject(DoctorSpecialtyService);
  workspaceStore = inject(WorkspaceStore);
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  platformId = inject(PLATFORM_ID);
  sentinelRef = viewChild(
    "scrollSentinel",
    ...ngDevMode ? [{ debugName: "sentinelRef" }] : (
      /* istanbul ignore next */
      []
    )
  );
  patients = signal(
    [],
    ...ngDevMode ? [{ debugName: "patients" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedFilter = signal(
    "ALL",
    ...ngDevMode ? [{ debugName: "selectedFilter" }] : (
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
  isColumnsModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isColumnsModalOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isNewPatientModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isNewPatientModalOpen" }] : (
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
  pageSize = 20;
  totalPages = signal(
    1,
    ...ngDevMode ? [{ debugName: "totalPages" }] : (
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
  hasMore = computed(
    () => this.currentPage() + 1 < this.totalPages(),
    ...ngDevMode ? [{ debugName: "hasMore" }] : (
      /* istanbul ignore next */
      []
    )
  );
  visibleColumnsCount = computed(
    () => this.doctorSpecialtyService.supportsGrowthCharts() ? 7 : 6,
    ...ngDevMode ? [{ debugName: "visibleColumnsCount" }] : (
      /* istanbul ignore next */
      []
    )
  );
  searchDebounceTimer = null;
  observer = null;
  loadError = signal(
    null,
    ...ngDevMode ? [{ debugName: "loadError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reads = new AccountReadScope(() => this.loadInitial());
  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.searchDebounceTimer)
        clearTimeout(this.searchDebounceTimer);
    });
    effect(() => {
      const el = this.sentinelRef()?.nativeElement;
      if (!isPlatformBrowser(this.platformId) || !el || typeof IntersectionObserver === "undefined") {
        return;
      }
      if (this.observer) {
        this.observer.disconnect();
      }
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && this.hasMore() && !this.isLoadingMore() && !this.isLoading()) {
          this.loadMore();
        }
      }, { rootMargin: "300px 0px", threshold: 0.01 });
      this.observer.observe(el);
    });
  }
  openColumnsModal() {
    this.isColumnsModalOpen.set(true);
  }
  closeColumnsModal() {
    this.isColumnsModalOpen.set(false);
  }
  ngOnInit() {
    this.loadInitial();
    if (isPlatformBrowser(this.platformId) && typeof window !== "undefined") {
      const handlePatientCreated = () => {
        this.loadInitial();
      };
      const handleAuthChange = () => {
        this.loadInitial();
      };
      window.addEventListener("patient-created", handlePatientCreated);
      window.addEventListener("auth-success", handleAuthChange);
      window.addEventListener("auth-signout", handleAuthChange);
      this.destroyRef.onDestroy(() => {
        window.removeEventListener("patient-created", handlePatientCreated);
        window.removeEventListener("auth-success", handleAuthChange);
        window.removeEventListener("auth-signout", handleAuthChange);
        if (this.observer) {
          this.observer.disconnect();
        }
      });
    }
  }
  loadInitial(search) {
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
    const current = this.reads.begin();
    this.patients.set([]);
    this.isLoadingMore.set(false);
    this.currentPage.set(0);
    this.totalPages.set(0);
    this.totalElements.set(0);
    this.loadError.set(null);
    if (!this.reads.authenticated()) {
      this.isLoading.set(false);
      return;
    }
    this.isLoading.set(true);
    this.fetchPage(0, search ?? this.searchQuery(), current, false);
  }
  loadMore() {
    if (this.isLoadingMore() || !this.hasMore() || this.isLoading() || !this.reads.authenticated())
      return;
    const current = this.reads.begin();
    this.isLoadingMore.set(true);
    this.loadError.set(null);
    this.fetchPage(this.currentPage() + 1, this.searchQuery(), current, true);
  }
  fetchPage(page, query, current, append) {
    this.patientService.getPatients(page, this.pageSize, "fullName,asc", query, this.selectedFilter()).pipe(takeUntil(this.reads.canceled)).subscribe({
      next: (response) => {
        if (!current())
          return;
        const items = response.content.map(mapDtoToCardItem);
        this.patients.update((existing) => append ? [...existing, ...items.filter((item) => !existing.some((p) => p.id === item.id))] : items);
        this.currentPage.set(page);
        this.totalPages.set(getTotalPages(response));
        this.totalElements.set(getTotalElements(response));
        this.isLoading.set(false);
        this.isLoadingMore.set(false);
      },
      error: () => {
        if (current()) {
          this.loadError.set("No se pudo cargar el directorio. Reintent\xE1 la carga.");
          this.isLoading.set(false);
          this.isLoadingMore.set(false);
        }
      }
    });
  }
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId) || typeof window === "undefined") {
      return;
    }
    const scrollPos = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.scrollHeight - 350;
    if (scrollPos >= threshold && this.hasMore() && !this.isLoadingMore() && !this.isLoading()) {
      this.loadMore();
    }
  }
  isActive(patientId) {
    return this.activePatientService.patientId() === patientId;
  }
  setFilter(filter) {
    this.selectedFilter.set(filter);
    this.loadInitial();
  }
  onSearchInput(event) {
    const target = event.target;
    const val = target.value;
    this.searchQuery.set(val);
    this.reads.cancel();
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }
    this.searchDebounceTimer = setTimeout(() => {
      this.loadInitial(val.trim());
    }, 400);
  }
  onSearchEnter() {
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
    this.loadInitial(this.searchQuery().trim());
  }
  clearSearch() {
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = null;
    }
    this.searchQuery.set("");
    this.loadInitial("");
  }
  resetFilters() {
    this.selectedFilter.set("ALL");
    this.searchQuery.set("");
    this.loadInitial("");
  }
  selectPatient(patient) {
    if (patient.detail) {
      this.activePatientService.setActivePatient(patient.detail);
    }
    this.activePatientService.loadPatient(patient.id);
    this.router.navigate(["/pacientes", patient.id]);
  }
  openNewPatientModal(event) {
    if (event) {
      event.stopPropagation();
    }
    this.isNewPatientModalOpen.set(false);
    this.router.navigate(["/pacientes/nuevo"]);
  }
  closeNewPatientModal() {
    this.isNewPatientModalOpen.set(false);
  }
  onPatientCreated() {
    this.closeNewPatientModal();
    this.loadInitial();
  }
  static \u0275fac = function PatientListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PatientListComponent, selectors: [["app-patient-list"]], viewQuery: function PatientListComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.sentinelRef, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, hostBindings: function PatientListComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("scroll", function PatientListComponent_scroll_HostBindingHandler() {
        return ctx.onWindowScroll();
      }, \u0275\u0275resolveWindow);
    }
  }, decls: 44, vars: 11, consts: [["scrollSentinel", ""], ["id", "view-patient-list", 1, "app-view"], [1, "patient-directory-controls"], [1, "directory-subtitle"], [1, "filter-count-note"], [1, "directory-actions-group"], ["role", "search", 1, "directory-search-wrapper"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "currentColor", "aria-hidden", "true", 1, "search-icon"], ["d", "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"], ["type", "search", "placeholder", "Buscar por DNI, nombre o tel\xE9fono...", "aria-label", "Buscar pacientes", 1, "directory-search-input", 3, "input", "keydown.enter", "value"], ["type", "button", "aria-label", "Limpiar b\xFAsqueda", 1, "clear-search-btn"], ["type", "button", 1, "m3-chip", 3, "click"], ["type", "button", 1, "m3-button", "m3-button-tonal", 3, "click"], ["role", "alert"], [1, "patient-table-card"], [1, "patient-table-responsive"], ["aria-label", "Directorio de pacientes", 1, "patient-table"], ["scope", "col", 1, "th-patient"], ["scope", "col", 1, "th-dni"], ["scope", "col", 1, "th-age"], ["scope", "col", 1, "th-phone"], ["scope", "col", 1, "th-encounters"], ["scope", "col", 1, "th-vaccines"], ["scope", "col", 1, "th-actions", "text-right"], [1, "patient-row"], [1, "infinite-scroll-footer"], ["type", "button", "aria-label", "Limpiar b\xFAsqueda", 1, "clear-search-btn", 3, "click"], [1, "td-patient"], [1, "patient-cell-flex"], [1, "patient-mini-avatar", 3, "title"], [1, "patient-title-group"], [1, "patient-full-name"], [1, "patient-meta-row"], [1, "patient-id-badge"], ["title", "Var\xF3n", 1, "gender-pill", "gender-pill-male"], ["title", "Mujer", 1, "gender-pill", "gender-pill-female"], [1, "td-dni"], [1, "dni-number"], [1, "td-age"], [1, "age-data-cell"], [1, "age-primary-row"], [1, "age-text"], [1, "m3-badge", "badge-compact"], [1, "birth-subtext"], [1, "td-phone"], [1, "contact-info-cell"], [1, "cell-muted"], [1, "td-encounters"], [1, "encounter-pill", "pill-completed", 3, "title"], ["title", "Sin consultas registradas previamente", 1, "encounter-pill", "pill-empty"], [1, "td-vaccines"], [1, "td-actions", "text-right"], ["type", "button", 1, "btn-table-action", 3, "click", "title"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.2", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true"], ["points", "9 18 15 12 9 6"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "currentColor", "aria-hidden", "true", 1, "contact-icon"], ["d", "M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"], [1, "pill-dot"], [1, "pill-count"], [1, "pill-date"], [1, "vaccine-chip", "chip-pending"], [1, "vaccine-chip", "chip-ok"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], ["points", "20 6 9 17 4 12"], [1, "empty-table-cell"], [1, "loading-state"], [1, "empty-state"], [1, "loading-spinner"], ["aria-hidden", "true", 1, "empty-state-icon"], ["width", "44", "height", "44", "viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"], [1, "empty-state-actions"], ["aria-hidden", "true", 1, "scroll-sentinel"], ["role", "status", 1, "loading-more-box"], [1, "end-of-directory"], ["aria-hidden", "true", 1, "loading-spinner", "mini-spinner"]], template: function PatientListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 1)(1, "div", 2)(2, "div")(3, "h2");
      \u0275\u0275text(4, "Directorio de Pacientes");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "p", 3);
      \u0275\u0275text(6);
      \u0275\u0275conditionalCreate(7, PatientListComponent_Conditional_7_Template, 2, 1, "span", 4);
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(8, "div", 5)(9, "div", 6);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(10, "svg", 7);
      \u0275\u0275domElement(11, "path", 8);
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(12, "input", 9);
      \u0275\u0275domListener("input", function PatientListComponent_Template_input_input_12_listener($event) {
        return ctx.onSearchInput($event);
      })("keydown.enter", function PatientListComponent_Template_input_keydown_enter_12_listener() {
        return ctx.onSearchEnter();
      });
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(13, PatientListComponent_Conditional_13_Template, 2, 0, "button", 10);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(14, "button", 11);
      \u0275\u0275domListener("click", function PatientListComponent_Template_button_click_14_listener() {
        return ctx.setFilter("ALL");
      });
      \u0275\u0275text(15, " Todos ");
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(16, PatientListComponent_Conditional_16_Template, 6, 6)(17, PatientListComponent_Conditional_17_Template, 4, 4);
      \u0275\u0275domElementStart(18, "button", 12);
      \u0275\u0275domListener("click", function PatientListComponent_Template_button_click_18_listener() {
        return ctx.openNewPatientModal();
      });
      \u0275\u0275text(19, " + Nuevo paciente ");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275conditionalCreate(20, PatientListComponent_Conditional_20_Template, 4, 1, "p", 13);
      \u0275\u0275domElementStart(21, "div", 14)(22, "div", 15)(23, "table", 16)(24, "thead")(25, "tr")(26, "th", 17);
      \u0275\u0275text(27, "Paciente");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(28, "th", 18);
      \u0275\u0275text(29, "DNI");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(30, "th", 19);
      \u0275\u0275text(31, "Edad & Nacimiento");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(32, "th", 20);
      \u0275\u0275text(33, "Contacto");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(34, "th", 21);
      \u0275\u0275text(35, "Controles Previos");
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(36, PatientListComponent_Conditional_36_Template, 2, 0, "th", 22);
      \u0275\u0275domElementStart(37, "th", 23);
      \u0275\u0275text(38, "Acciones");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(39, "tbody");
      \u0275\u0275repeaterCreate(40, PatientListComponent_For_41_Template, 38, 17, "tr", 24, _forTrack0, false, PatientListComponent_ForEmpty_42_Template, 4, 2, "tr");
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275conditionalCreate(43, PatientListComponent_Conditional_43_Template, 5, 1, "div", 25);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      let tmp_6_0;
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", ctx.totalElements(), " pacientes en seguimiento cl\xEDnico ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.searchQuery() ? 7 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275domProperty("value", ctx.searchQuery());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.searchQuery() ? 13 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("filter-active", ctx.selectedFilter() === "ALL");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.doctorSpecialtyService.supportsGrowthCharts() ? 16 : 17);
      \u0275\u0275advance(4);
      \u0275\u0275conditional((tmp_6_0 = ctx.loadError()) ? 20 : -1, tmp_6_0);
      \u0275\u0275advance(16);
      \u0275\u0275conditional(ctx.doctorSpecialtyService.supportsGrowthCharts() ? 36 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.patients());
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.patients().length > 0 ? 43 : -1);
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  width: 100%;\n}\n.directory-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--%NS%md-sys-color-secondary);\n  margin-top: 0.25rem;\n}\n.filter-count-note[_ngcontent-%COMP%] {\n  font-style: italic;\n  color: var(--%NS%md-sys-color-outline);\n}\n.directory-actions-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.directory-search-wrapper[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  background-color: var(--%NS%md-sys-color-surface-container-low);\n  border: 1px solid var(--%NS%md-sys-color-outline-variant);\n  border-radius: var(--%NS%md-shape-full);\n  padding: 0.35rem 0.75rem;\n  width: 280px;\n  box-sizing: border-box;\n  transition:\n    border-color 0.15s ease,\n    background-color 0.15s ease,\n    box-shadow 0.15s ease;\n}\n.directory-search-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--%NS%md-sys-color-primary);\n  background-color: var(--%NS%md-sys-color-surface-container-lowest);\n  box-shadow: 0 0 0 2px rgba(0, 104, 116, 0.15);\n}\n.search-icon[_ngcontent-%COMP%] {\n  color: var(--%NS%md-sys-color-on-surface-variant);\n  margin-right: 0.4rem;\n  flex-shrink: 0;\n}\n.directory-search-input[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  outline: none;\n  font-family: inherit;\n  font-size: 0.82rem;\n  color: var(--%NS%md-sys-color-on-surface);\n  flex: 1;\n  width: 100%;\n  min-width: 0;\n}\n.directory-search-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--%NS%md-sys-color-outline);\n}\n.clear-search-btn[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: var(--%NS%md-sys-color-outline);\n  cursor: pointer;\n  font-size: 0.8rem;\n  padding: 0 0.2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n}\n.clear-search-btn[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%md-sys-color-error);\n}\n.m3-chip[_ngcontent-%COMP%] {\n  cursor: pointer;\n  outline: none;\n  font-family: inherit;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.m3-chip[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--%NS%md-sys-color-primary);\n  outline-offset: 1px;\n}\n.patient-table-card[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  background-color: var(--%NS%md-sys-color-surface-container-lowest);\n  border: 1px solid var(--%NS%md-sys-color-outline-variant);\n  border-radius: var(--%NS%md-shape-m);\n  box-shadow: 0 1px 3px rgba(0, 25, 29, 0.06), 0 1px 2px rgba(0, 25, 29, 0.04);\n  overflow: hidden;\n  transition: border-color var(--%NS%md-sys-motion-standard);\n}\n.patient-table-responsive[_ngcontent-%COMP%] {\n  width: 100%;\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.patient-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  text-align: left;\n  font-size: 0.86rem;\n  white-space: nowrap;\n}\n.patient-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background-color: var(--%NS%md-sys-color-surface-container-low);\n  border-bottom: 1px solid var(--%NS%md-sys-color-surface-variant);\n}\n.patient-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  font-size: 0.72rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: var(--%NS%md-sys-color-secondary);\n  -webkit-user-select: none;\n  user-select: none;\n}\n.patient-table[_ngcontent-%COMP%]   th.text-right[_ngcontent-%COMP%], \n.patient-table[_ngcontent-%COMP%]   td.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.patient-row[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--%NS%md-sys-color-surface-variant);\n  transition: background-color 0.15s ease;\n}\n.patient-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.patient-row[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%md-sys-color-surface-container-low);\n}\n.patient-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.7rem 1rem;\n  vertical-align: middle;\n  color: var(--%NS%md-sys-color-on-surface);\n}\n.patient-cell-flex[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.patient-mini-avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: var(--%NS%md-shape-s);\n  background-color: var(--%NS%md-sys-color-secondary-container);\n  color: var(--%NS%md-sys-color-on-secondary-container);\n  border: 1px solid var(--%NS%md-sys-color-outline-variant);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 0.78rem;\n  flex-shrink: 0;\n  letter-spacing: -0.02em;\n  transition: all 0.15s ease;\n}\n.patient-mini-avatar.avatar-male[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-blue-surface, #dbeafe);\n  color: var(--%NS%dc-blue-ink, #1d4ed8);\n  border-color: #93c5fd;\n}\n.patient-mini-avatar.avatar-female[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-pink-surface, #fce7f3);\n  color: var(--%NS%dc-pink-ink, #be185d);\n  border-color: #f9a8d4;\n}\n.patient-mini-avatar.avatar-neutral[_ngcontent-%COMP%] {\n  background-color: var(--%NS%md-sys-color-secondary-container);\n  color: var(--%NS%md-sys-color-on-secondary-container);\n  border-color: var(--%NS%md-sys-color-outline-variant);\n}\n.patient-title-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.patient-full-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--%NS%md-sys-color-on-surface);\n  font-size: 0.88rem;\n}\n.patient-meta-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.patient-id-badge[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 500;\n  color: var(--%NS%md-sys-color-secondary);\n}\n.gender-pill[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  font-weight: 600;\n  padding: 0.05rem 0.4rem;\n  border-radius: var(--%NS%md-shape-full);\n  line-height: 1.25;\n}\n.gender-pill.gender-pill-male[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-blue-surface, #eff6ff);\n  color: var(--%NS%dc-blue-ink, #2563eb);\n  border: 1px solid #dbeafe;\n}\n.gender-pill.gender-pill-female[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-pink-surface, #fdf2f8);\n  color: var(--%NS%dc-pink-ink, #db2777);\n  border: 1px solid #fce7f3;\n}\n.dni-number[_ngcontent-%COMP%] {\n  font-variant-numeric: tabular-nums;\n  font-weight: 500;\n  color: var(--%NS%md-sys-color-on-surface-variant);\n  font-size: 0.84rem;\n}\n.age-data-cell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.age-primary-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.age-text[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--%NS%md-sys-color-on-surface);\n  font-size: 0.84rem;\n}\n.badge-compact[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  padding: 0.1rem 0.4rem;\n  font-weight: 600;\n}\n.birth-subtext[_ngcontent-%COMP%] {\n  font-size: 0.73rem;\n  color: var(--%NS%md-sys-color-secondary);\n}\n.contact-info-cell[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  color: var(--%NS%md-sys-color-on-surface-variant);\n  font-size: 0.82rem;\n  font-variant-numeric: tabular-nums;\n}\n.contact-icon[_ngcontent-%COMP%] {\n  color: var(--%NS%md-sys-color-outline);\n  flex-shrink: 0;\n}\n.cell-muted[_ngcontent-%COMP%] {\n  color: var(--%NS%md-sys-color-outline);\n}\n.encounter-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  font-size: 0.78rem;\n  font-weight: 600;\n  padding: 0.22rem 0.6rem;\n  border-radius: var(--%NS%md-shape-full);\n}\n.pill-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.encounter-pill.pill-completed[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-teal-surface, #ecfdf5);\n  color: var(--%NS%dc-teal-ink, #065f46);\n  border: 1px solid #a7f3d0;\n}\n.encounter-pill.pill-completed[_ngcontent-%COMP%]   .pill-dot[_ngcontent-%COMP%] {\n  background-color: #10b981;\n}\n.pill-date[_ngcontent-%COMP%] {\n  font-weight: 400;\n  opacity: 0.88;\n}\n.encounter-pill.pill-empty[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-warning-surface, #fffbeb);\n  color: var(--%NS%dc-warning-ink, #92400e);\n  border: 1px solid #fde68a;\n}\n.encounter-pill.pill-empty[_ngcontent-%COMP%]   .pill-dot[_ngcontent-%COMP%] {\n  background-color: #f59e0b;\n}\n.vaccine-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  font-size: 0.76rem;\n  font-weight: 600;\n  padding: 0.2rem 0.55rem;\n  border-radius: var(--%NS%md-shape-full);\n}\n.vaccine-chip.chip-pending[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-error-surface, #fef2f2);\n  color: var(--%NS%dc-error-ink, #b91c1c);\n  border: 1px solid #fecaca;\n}\n.vaccine-chip.chip-ok[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-success-surface, #f0fdf4);\n  color: var(--%NS%dc-success-ink, #15803d);\n  border: 1px solid #bbf7d0;\n}\n.btn-table-action[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.32rem 0.75rem;\n  font-size: 0.78rem;\n  font-weight: 600;\n  border-radius: var(--%NS%md-shape-full);\n  border: 1px solid var(--%NS%md-sys-color-outline-variant);\n  background-color: var(--%NS%md-sys-color-surface-container-lowest);\n  color: var(--%NS%md-sys-color-primary);\n  cursor: pointer;\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.btn-table-action[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%md-sys-color-primary);\n  border-color: var(--%NS%md-sys-color-primary);\n  color: var(--%NS%md-sys-color-on-primary);\n  box-shadow: 0 1px 2px rgba(0, 104, 116, 0.2);\n}\n.btn-table-action[_ngcontent-%COMP%]:hover   svg[_ngcontent-%COMP%] {\n  transform: translateX(2px);\n}\n.btn-table-action[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  transition: transform 0.15s ease;\n}\n.empty-table-cell[_ngcontent-%COMP%] {\n  padding: 3.5rem 1.5rem !important;\n  text-align: center;\n  background-color: var(--%NS%md-sys-color-surface-container-lowest);\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n}\n.empty-state-icon[_ngcontent-%COMP%] {\n  color: var(--%NS%md-sys-color-outline);\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0.25rem;\n  color: var(--%NS%md-sys-color-on-surface);\n  font-size: 1.15rem;\n  font-weight: 700;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--%NS%md-sys-color-secondary);\n  font-size: 0.875rem;\n  max-width: 440px;\n}\n.empty-state-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  margin-top: 1rem;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n  color: var(--%NS%md-sys-color-secondary);\n  font-size: 0.9rem;\n}\n.loading-spinner[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border: 3px solid var(--%NS%md-sys-color-surface-variant);\n  border-top-color: var(--%NS%md-sys-color-primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.infinite-scroll-footer[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n  margin-bottom: 2rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n}\n.loading-more-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  color: var(--%NS%md-sys-color-primary, #006874);\n  font-size: 0.85rem;\n  font-weight: 600;\n  padding: 0.6rem 1.25rem;\n  background-color: var(--%NS%md-sys-color-surface-container-high, #e6ecec);\n  border-radius: var(--%NS%md-shape-full, 9999px);\n}\n.mini-spinner[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border-width: 2px;\n}\n.scroll-sentinel[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 1px;\n  pointer-events: none;\n  visibility: hidden;\n}\n.end-of-directory[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--%NS%md-sys-color-secondary, #4a6267);\n  padding: 0.5rem 1rem;\n  background-color: var(--%NS%md-sys-color-surface-container-low, #f2f7f8);\n  border-radius: var(--%NS%md-shape-full, 9999px);\n}\n.patient-controls-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  margin-top: 0.5rem;\n}\n.controls-status-pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 0.78rem;\n  font-weight: 600;\n  padding: 0.2rem 0.55rem;\n  border-radius: 6px;\n  width: fit-content;\n}\n.controls-status-pill.has-controls[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-teal-surface, #ecfdf5);\n  color: var(--%NS%dc-teal-ink, #065f46);\n  border: 1px solid #a7f3d0;\n}\n.controls-status-pill.no-controls[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-warning-surface, #fffbeb);\n  color: var(--%NS%dc-warning-ink, #92400e);\n  border: 1px solid #fde68a;\n}\n/*# sourceMappingURL=patient-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientListComponent, [{
    type: Component,
    args: [{ selector: "app-patient-list", imports: [], template: `<div id="view-patient-list" class="app-view">
  <!-- Controls: Title, Search, Filters & New Patient CTA -->
  <div class="patient-directory-controls">
    <div>
      <h2>Directorio de Pacientes</h2>
      <p class="directory-subtitle">
        {{ totalElements() }} pacientes en seguimiento cl\xEDnico
        @if (searchQuery()) {
          <span class="filter-count-note"> (b\xFAsqueda: "{{ searchQuery() }}")</span>
        }
      </p>
    </div>

    <div class="directory-actions-group">
      <!-- Search Input Filter -->
      <div class="directory-search-wrapper" role="search">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input
          type="search"
          class="directory-search-input"
          placeholder="Buscar por DNI, nombre o tel\xE9fono..."
          aria-label="Buscar pacientes"
          [value]="searchQuery()"
          (input)="onSearchInput($event)"
          (keydown.enter)="onSearchEnter()"
        />
        @if (searchQuery()) {
          <button
            type="button"
            class="clear-search-btn"
            aria-label="Limpiar b\xFAsqueda"
            (click)="clearSearch()"
          >
            \u2715
          </button>
        }
      </div>

      <!-- Filter Chips -->
      <button
        type="button"
        class="m3-chip"
        [class.filter-active]="selectedFilter() === 'ALL'"
        (click)="setFilter('ALL')"
      >
        Todos
      </button>

      @if (doctorSpecialtyService.supportsGrowthCharts()) {
        <button
          type="button"
          class="m3-chip"
          [class.filter-active]="selectedFilter() === 'INFANT'"
          (click)="setFilter('INFANT')"
        >
          Lactantes (0-12m)
        </button>

        <button
          type="button"
          class="m3-chip"
          [class.filter-active]="selectedFilter() === 'TODDLER'"
          (click)="setFilter('TODDLER')"
        >
          Primera Infancia
        </button>

        <button
          type="button"
          class="m3-chip"
          [class.filter-active]="selectedFilter() === 'VACCINE_PENDING'"
          (click)="setFilter('VACCINE_PENDING')"
        >
          Vacunaci\xF3n Pendiente
        </button>
      } @else {
        <button
          type="button"
          class="m3-chip"
          [class.filter-active]="selectedFilter() === 'ADULT'"
          (click)="setFilter('ADULT')"
        >
          Adultos (\u2265 18 a\xF1os)
        </button>
        <button
          type="button"
          class="m3-chip"
          [class.filter-active]="selectedFilter() === 'MINOR'"
          (click)="setFilter('MINOR')"
        >
          Menores (< 18 a\xF1os)
        </button>
      }

      <button type="button" class="m3-button m3-button-tonal" (click)="openNewPatientModal()">
        + Nuevo paciente
      </button>
    </div>
  </div>

  @if (loadError(); as error) { <p role="alert">{{ error }} <button type="button" class="m3-chip" (click)="loadInitial()">Reintentar</button></p> }
  <!-- Cards Grid -->
  <!-- Patients Table -->
  <div class="patient-table-card">
    <div class="patient-table-responsive">
      <table class="patient-table" aria-label="Directorio de pacientes">
        <thead>
          <tr>
            <th class="th-patient" scope="col">Paciente</th>
            <th class="th-dni" scope="col">DNI</th>
            <th class="th-age" scope="col">Edad & Nacimiento</th>
            <th class="th-phone" scope="col">Contacto</th>
            <th class="th-encounters" scope="col">Controles Previos</th>
            @if (doctorSpecialtyService.supportsGrowthCharts()) {
              <th class="th-vaccines" scope="col">Vacunaci\xF3n</th>
            }
            <th class="th-actions text-right" scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          @for (patient of patients(); track patient.id) {
            <tr class="patient-row">
              <!-- Paciente (Avatar, Nombre, ID, G\xE9nero) -->
              <td class="td-patient">
                <div class="patient-cell-flex">
                  <div
                    class="patient-mini-avatar"
                    [class]="patient.genderAvatarClass"
                    [title]="'Sexo / G\xE9nero: ' + patient.genderLabel"
                  >
                    {{ patient.initials }}
                  </div>
                  <div class="patient-title-group">
                    <span class="patient-full-name">{{ patient.fullName }}</span>
                    <div class="patient-meta-row">
                      <span class="patient-id-badge">ID #{{ patient.id }}</span>
                      @if (patient.gender === 'male') {
                        <span class="gender-pill gender-pill-male" title="Var\xF3n">\u2642 Var\xF3n</span>
                      } @else if (patient.gender === 'female') {
                        <span class="gender-pill gender-pill-female" title="Mujer">\u2640 Mujer</span>
                      }
                    </div>
                  </div>
                </div>
              </td>

              <!-- DNI -->
              <td class="td-dni">
                <span class="dni-number">{{ patient.rawNationalId || '\u2014' }}</span>
              </td>

              <!-- Edad & Nacimiento -->
              <td class="td-age">
                <div class="age-data-cell">
                  <div class="age-primary-row">
                    <span class="age-text">{{ patient.ageDisplay }}</span>
                    <span class="m3-badge badge-compact" [class]="patient.badgeClass">
                      {{ patient.badgeText }}
                    </span>
                  </div>
                  <span class="birth-subtext">F. Nac: {{ patient.birthDateDisplay }}</span>
                </div>
              </td>

              <!-- Contacto -->
              <td class="td-phone">
                @if (patient.rawPhone) {
                  <div class="contact-info-cell">
                    <svg class="contact-icon" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <span>{{ patient.rawPhone }}</span>
                  </div>
                } @else {
                  <span class="cell-muted">\u2014</span>
                }
              </td>

              <!-- Controles Cl\xEDnicos -->
              <td class="td-encounters">
                @if (patient.totalEncounters > 0) {
                  <div class="encounter-pill pill-completed" [title]="patient.lastCheckup">
                    <span class="pill-dot"></span>
                    <span class="pill-count">{{ patient.totalEncounters }} {{ patient.totalEncounters === 1 ? 'control' : 'controles' }}</span>
                    @if (patient.lastEncounterDateDisplay) {
                      <span class="pill-date">\u2022 {{ patient.lastEncounterDateDisplay }}</span>
                    }
                  </div>
                } @else {
                  <div class="encounter-pill pill-empty" title="Sin consultas registradas previamente">
                    <span class="pill-dot"></span>
                    <span>Sin controles previos</span>
                  </div>
                }
              </td>

              <!-- Vacunaci\xF3n -->
              @if (doctorSpecialtyService.supportsGrowthCharts()) {
                <td class="td-vaccines">
                  @if (patient.hasPendingVaccine) {
                    <span class="vaccine-chip chip-pending">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      Pendiente
                    </span>
                  } @else {
                    <span class="vaccine-chip chip-ok">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Al d\xEDa
                    </span>
                  }
                </td>
              }

              <!-- Acciones -->
              <td class="td-actions text-right">
                <button
                  type="button"
                  class="btn-table-action"
                  (click)="selectPatient(patient)"
                  [title]="'Abrir ficha cl\xEDnica de ' + patient.fullName"
                >
                  <span>Ver Ficha</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </td>
            </tr>
          } @empty {
            <tr>
              <td [attr.colspan]="visibleColumnsCount()" class="empty-table-cell">
                @if (isLoading()) {
                  <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <p>Cargando directorio de pacientes...</p>
                  </div>
                } @else {
                  <div class="empty-state">
                    <div class="empty-state-icon" aria-hidden="true">
                      <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                    </div>
                    <h3>No se encontraron pacientes</h3>
                    <p>
                      No existen pacientes que coincidan con el filtro actual o la b\xFAsqueda ingresada.
                    </p>
                    <div class="empty-state-actions">
                      <button type="button" class="m3-button m3-button-tonal" (click)="resetFilters()">
                        Restablecer Filtros
                      </button>
                    </div>
                  </div>
                }
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  </div>

  <!-- Invisible Infinite Scroll Footer & Sentinel -->
  @if (patients().length > 0) {
    <div class="infinite-scroll-footer">
      <div #scrollSentinel class="scroll-sentinel" aria-hidden="true"></div>
      @if (isLoadingMore()) {
        <div class="loading-more-box" role="status">
          <div class="loading-spinner mini-spinner" aria-hidden="true"></div>
          <span>Cargando m\xE1s pacientes...</span>
        </div>
      } @else if (!hasMore() && totalElements() > 15) {
        <div class="end-of-directory">
          <span>\u2713 Directorio completo ({{ totalElements() }} pacientes)</span>
        </div>
      }
    </div>
  }

</div>


`, styles: ["/* src/app/features/patient-list/patient-list.component.css */\n:host {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  width: 100%;\n}\n.directory-subtitle {\n  font-size: 0.85rem;\n  color: var(--md-sys-color-secondary);\n  margin-top: 0.25rem;\n}\n.filter-count-note {\n  font-style: italic;\n  color: var(--md-sys-color-outline);\n}\n.directory-actions-group {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.directory-search-wrapper {\n  display: inline-flex;\n  align-items: center;\n  background-color: var(--md-sys-color-surface-container-low);\n  border: 1px solid var(--md-sys-color-outline-variant);\n  border-radius: var(--md-shape-full);\n  padding: 0.35rem 0.75rem;\n  width: 280px;\n  box-sizing: border-box;\n  transition:\n    border-color 0.15s ease,\n    background-color 0.15s ease,\n    box-shadow 0.15s ease;\n}\n.directory-search-wrapper:focus-within {\n  border-color: var(--md-sys-color-primary);\n  background-color: var(--md-sys-color-surface-container-lowest);\n  box-shadow: 0 0 0 2px rgba(0, 104, 116, 0.15);\n}\n.search-icon {\n  color: var(--md-sys-color-on-surface-variant);\n  margin-right: 0.4rem;\n  flex-shrink: 0;\n}\n.directory-search-input {\n  border: none;\n  background: transparent;\n  outline: none;\n  font-family: inherit;\n  font-size: 0.82rem;\n  color: var(--md-sys-color-on-surface);\n  flex: 1;\n  width: 100%;\n  min-width: 0;\n}\n.directory-search-input::placeholder {\n  color: var(--md-sys-color-outline);\n}\n.clear-search-btn {\n  border: none;\n  background: transparent;\n  color: var(--md-sys-color-outline);\n  cursor: pointer;\n  font-size: 0.8rem;\n  padding: 0 0.2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n}\n.clear-search-btn:hover {\n  color: var(--md-sys-color-error);\n}\n.m3-chip {\n  cursor: pointer;\n  outline: none;\n  font-family: inherit;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.m3-chip:focus-visible {\n  outline: 2px solid var(--md-sys-color-primary);\n  outline-offset: 1px;\n}\n.patient-table-card {\n  margin-top: 1rem;\n  background-color: var(--md-sys-color-surface-container-lowest);\n  border: 1px solid var(--md-sys-color-outline-variant);\n  border-radius: var(--md-shape-m);\n  box-shadow: 0 1px 3px rgba(0, 25, 29, 0.06), 0 1px 2px rgba(0, 25, 29, 0.04);\n  overflow: hidden;\n  transition: border-color var(--md-sys-motion-standard);\n}\n.patient-table-responsive {\n  width: 100%;\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.patient-table {\n  width: 100%;\n  border-collapse: collapse;\n  text-align: left;\n  font-size: 0.86rem;\n  white-space: nowrap;\n}\n.patient-table thead {\n  background-color: var(--md-sys-color-surface-container-low);\n  border-bottom: 1px solid var(--md-sys-color-surface-variant);\n}\n.patient-table th {\n  padding: 0.75rem 1rem;\n  font-size: 0.72rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: var(--md-sys-color-secondary);\n  -webkit-user-select: none;\n  user-select: none;\n}\n.patient-table th.text-right,\n.patient-table td.text-right {\n  text-align: right;\n}\n.patient-row {\n  border-bottom: 1px solid var(--md-sys-color-surface-variant);\n  transition: background-color 0.15s ease;\n}\n.patient-row:last-child {\n  border-bottom: none;\n}\n.patient-row:hover {\n  background-color: var(--md-sys-color-surface-container-low);\n}\n.patient-table td {\n  padding: 0.7rem 1rem;\n  vertical-align: middle;\n  color: var(--md-sys-color-on-surface);\n}\n.patient-cell-flex {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.patient-mini-avatar {\n  width: 36px;\n  height: 36px;\n  border-radius: var(--md-shape-s);\n  background-color: var(--md-sys-color-secondary-container);\n  color: var(--md-sys-color-on-secondary-container);\n  border: 1px solid var(--md-sys-color-outline-variant);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 0.78rem;\n  flex-shrink: 0;\n  letter-spacing: -0.02em;\n  transition: all 0.15s ease;\n}\n.patient-mini-avatar.avatar-male {\n  background-color: var(--dc-blue-surface, #dbeafe);\n  color: var(--dc-blue-ink, #1d4ed8);\n  border-color: #93c5fd;\n}\n.patient-mini-avatar.avatar-female {\n  background-color: var(--dc-pink-surface, #fce7f3);\n  color: var(--dc-pink-ink, #be185d);\n  border-color: #f9a8d4;\n}\n.patient-mini-avatar.avatar-neutral {\n  background-color: var(--md-sys-color-secondary-container);\n  color: var(--md-sys-color-on-secondary-container);\n  border-color: var(--md-sys-color-outline-variant);\n}\n.patient-title-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.patient-full-name {\n  font-weight: 600;\n  color: var(--md-sys-color-on-surface);\n  font-size: 0.88rem;\n}\n.patient-meta-row {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.patient-id-badge {\n  font-size: 0.72rem;\n  font-weight: 500;\n  color: var(--md-sys-color-secondary);\n}\n.gender-pill {\n  font-size: 0.68rem;\n  font-weight: 600;\n  padding: 0.05rem 0.4rem;\n  border-radius: var(--md-shape-full);\n  line-height: 1.25;\n}\n.gender-pill.gender-pill-male {\n  background-color: var(--dc-blue-surface, #eff6ff);\n  color: var(--dc-blue-ink, #2563eb);\n  border: 1px solid #dbeafe;\n}\n.gender-pill.gender-pill-female {\n  background-color: var(--dc-pink-surface, #fdf2f8);\n  color: var(--dc-pink-ink, #db2777);\n  border: 1px solid #fce7f3;\n}\n.dni-number {\n  font-variant-numeric: tabular-nums;\n  font-weight: 500;\n  color: var(--md-sys-color-on-surface-variant);\n  font-size: 0.84rem;\n}\n.age-data-cell {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.age-primary-row {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n.age-text {\n  font-weight: 600;\n  color: var(--md-sys-color-on-surface);\n  font-size: 0.84rem;\n}\n.badge-compact {\n  font-size: 0.68rem;\n  padding: 0.1rem 0.4rem;\n  font-weight: 600;\n}\n.birth-subtext {\n  font-size: 0.73rem;\n  color: var(--md-sys-color-secondary);\n}\n.contact-info-cell {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  color: var(--md-sys-color-on-surface-variant);\n  font-size: 0.82rem;\n  font-variant-numeric: tabular-nums;\n}\n.contact-icon {\n  color: var(--md-sys-color-outline);\n  flex-shrink: 0;\n}\n.cell-muted {\n  color: var(--md-sys-color-outline);\n}\n.encounter-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  font-size: 0.78rem;\n  font-weight: 600;\n  padding: 0.22rem 0.6rem;\n  border-radius: var(--md-shape-full);\n}\n.pill-dot {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.encounter-pill.pill-completed {\n  background-color: var(--dc-teal-surface, #ecfdf5);\n  color: var(--dc-teal-ink, #065f46);\n  border: 1px solid #a7f3d0;\n}\n.encounter-pill.pill-completed .pill-dot {\n  background-color: #10b981;\n}\n.pill-date {\n  font-weight: 400;\n  opacity: 0.88;\n}\n.encounter-pill.pill-empty {\n  background-color: var(--dc-warning-surface, #fffbeb);\n  color: var(--dc-warning-ink, #92400e);\n  border: 1px solid #fde68a;\n}\n.encounter-pill.pill-empty .pill-dot {\n  background-color: #f59e0b;\n}\n.vaccine-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  font-size: 0.76rem;\n  font-weight: 600;\n  padding: 0.2rem 0.55rem;\n  border-radius: var(--md-shape-full);\n}\n.vaccine-chip.chip-pending {\n  background-color: var(--dc-error-surface, #fef2f2);\n  color: var(--dc-error-ink, #b91c1c);\n  border: 1px solid #fecaca;\n}\n.vaccine-chip.chip-ok {\n  background-color: var(--dc-success-surface, #f0fdf4);\n  color: var(--dc-success-ink, #15803d);\n  border: 1px solid #bbf7d0;\n}\n.btn-table-action {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.32rem 0.75rem;\n  font-size: 0.78rem;\n  font-weight: 600;\n  border-radius: var(--md-shape-full);\n  border: 1px solid var(--md-sys-color-outline-variant);\n  background-color: var(--md-sys-color-surface-container-lowest);\n  color: var(--md-sys-color-primary);\n  cursor: pointer;\n  transition: all 0.15s ease;\n  white-space: nowrap;\n}\n.btn-table-action:hover {\n  background-color: var(--md-sys-color-primary);\n  border-color: var(--md-sys-color-primary);\n  color: var(--md-sys-color-on-primary);\n  box-shadow: 0 1px 2px rgba(0, 104, 116, 0.2);\n}\n.btn-table-action:hover svg {\n  transform: translateX(2px);\n}\n.btn-table-action svg {\n  transition: transform 0.15s ease;\n}\n.empty-table-cell {\n  padding: 3.5rem 1.5rem !important;\n  text-align: center;\n  background-color: var(--md-sys-color-surface-container-lowest);\n}\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n}\n.empty-state-icon {\n  color: var(--md-sys-color-outline);\n}\n.empty-state h3 {\n  margin: 0.5rem 0 0.25rem;\n  color: var(--md-sys-color-on-surface);\n  font-size: 1.15rem;\n  font-weight: 700;\n}\n.empty-state p {\n  margin: 0;\n  color: var(--md-sys-color-secondary);\n  font-size: 0.875rem;\n  max-width: 440px;\n}\n.empty-state-actions {\n  display: flex;\n  gap: 0.75rem;\n  margin-top: 1rem;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n  color: var(--md-sys-color-secondary);\n  font-size: 0.9rem;\n}\n.loading-spinner {\n  width: 36px;\n  height: 36px;\n  border: 3px solid var(--md-sys-color-surface-variant);\n  border-top-color: var(--md-sys-color-primary);\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.infinite-scroll-footer {\n  margin-top: 2rem;\n  margin-bottom: 2rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n}\n.loading-more-box {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  color: var(--md-sys-color-primary, #006874);\n  font-size: 0.85rem;\n  font-weight: 600;\n  padding: 0.6rem 1.25rem;\n  background-color: var(--md-sys-color-surface-container-high, #e6ecec);\n  border-radius: var(--md-shape-full, 9999px);\n}\n.mini-spinner {\n  width: 18px;\n  height: 18px;\n  border-width: 2px;\n}\n.scroll-sentinel {\n  width: 100%;\n  height: 1px;\n  pointer-events: none;\n  visibility: hidden;\n}\n.end-of-directory {\n  font-size: 0.8rem;\n  color: var(--md-sys-color-secondary, #4a6267);\n  padding: 0.5rem 1rem;\n  background-color: var(--md-sys-color-surface-container-low, #f2f7f8);\n  border-radius: var(--md-shape-full, 9999px);\n}\n.patient-controls-row {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  margin-top: 0.5rem;\n}\n.controls-status-pill {\n  display: inline-block;\n  font-size: 0.78rem;\n  font-weight: 600;\n  padding: 0.2rem 0.55rem;\n  border-radius: 6px;\n  width: fit-content;\n}\n.controls-status-pill.has-controls {\n  background-color: var(--dc-teal-surface, #ecfdf5);\n  color: var(--dc-teal-ink, #065f46);\n  border: 1px solid #a7f3d0;\n}\n.controls-status-pill.no-controls {\n  background-color: var(--dc-warning-surface, #fffbeb);\n  color: var(--dc-warning-ink, #92400e);\n  border: 1px solid #fde68a;\n}\n/*# sourceMappingURL=patient-list.component.css.map */\n"] }]
  }], () => [], { sentinelRef: [{ type: ViewChild, args: ["scrollSentinel", { isSignal: true }] }], onWindowScroll: [{
    type: HostListener,
    args: ["window:scroll"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PatientListComponent, { className: "PatientListComponent", filePath: "src/app/features/patient-list/patient-list.component.ts", lineNumber: 130 });
})();
export {
  PatientListComponent
};
//# debugId=72bc21fc-4d88-5048-aab8-44f4db951777
//# sourceMappingURL=chunk-IESVIGH2.js.map
