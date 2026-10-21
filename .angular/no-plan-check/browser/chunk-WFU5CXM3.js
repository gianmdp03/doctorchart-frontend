import {
  environment
} from "./chunk-WKCAPCQH.js";
import {
  ThemeService
} from "./chunk-5V3TTGBI.js";
import "./chunk-WBCHXDEU.js";
import {
  HttpClient,
  HttpErrorResponse
} from "./chunk-SYX7XZ26.js";
import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  Input,
  computed,
  finalize,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
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
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-3HO5VEWU.js";

// src/app/features/vaccination-calendar/calendario.service.ts
var VaccinationCalendarService = class _VaccinationCalendarService {
  http = inject(HttpClient);
  request;
  read = 0;
  data = signal(
    null,
    ...ngDevMode ? [{ debugName: "data" }] : (
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
  error = signal(
    null,
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasData = computed(
    () => this.data() !== null,
    ...ngDevMode ? [{ debugName: "hasData" }] : (
      /* istanbul ignore next */
      []
    )
  );
  load() {
    if (this.hasData() || this.loading())
      return;
    const read = ++this.read;
    this.loading.set(true);
    this.error.set(null);
    this.request = this.http.get(environment.apiUrl + "/vaccination-calendar").pipe(finalize(() => {
      if (read === this.read)
        this.loading.set(false);
    })).subscribe({
      next: (calendar) => {
        if (read === this.read)
          this.data.set(calendar);
      },
      error: (error) => {
        if (read === this.read)
          this.error.set(error instanceof HttpErrorResponse && error.status ? "No se pudo cargar el calendario de vacunaci\xF3n (HTTP " + error.status + ")." : "No se pudo cargar el calendario de vacunaci\xF3n.");
      }
    });
  }
  clear() {
    this.read++;
    this.request?.unsubscribe();
    this.data.set(null);
    this.error.set(null);
    this.loading.set(false);
  }
  static \u0275fac = function VaccinationCalendarService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VaccinationCalendarService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _VaccinationCalendarService, factory: _VaccinationCalendarService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VaccinationCalendarService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/features/vaccination-calendar/calendario-vacunacion.component.ts
var _forTrack0 = ($index, $item) => $item.grupo;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => $item.numero;
var _forTrack3 = ($index, $item) => $item.letra;
var _forTrack4 = ($index, $item) => $item.columnaId;
function VaccinationCalendarComponent_Conditional_1_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "th", 15);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const group_r5 = ctx.$implicit;
    \u0275\u0275attribute("colspan", group_r5.columnas.length);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", group_r5.grupo, " ");
  }
}
function VaccinationCalendarComponent_Conditional_1_For_30_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "small");
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(column_r6.subtitulo);
  }
}
function VaccinationCalendarComponent_Conditional_1_For_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "th", 16);
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, VaccinationCalendarComponent_Conditional_1_For_30_Conditional_2_Template, 2, 1, "small");
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const column_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", column_r6.nombre, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(column_r6.subtitulo ? 2 : -1);
  }
}
function VaccinationCalendarComponent_Conditional_1_For_33_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 24);
    \u0275\u0275domListener("mouseenter", function VaccinationCalendarComponent_Conditional_1_For_33_Conditional_3_Template_button_mouseenter_0_listener($event) {
      const reference_r8 = \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.showTooltip($event, "Patolog\xEDa prevenida", reference_r8.descripcion));
    })("mouseleave", function VaccinationCalendarComponent_Conditional_1_For_33_Conditional_3_Template_button_mouseleave_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.hideTooltip());
    })("focus", function VaccinationCalendarComponent_Conditional_1_For_33_Conditional_3_Template_button_focus_0_listener($event) {
      const reference_r8 = \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.showTooltip($event, "Patolog\xEDa prevenida", reference_r8.descripcion));
    })("blur", function VaccinationCalendarComponent_Conditional_1_For_33_Conditional_3_Template_button_blur_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.hideTooltip());
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const reference_r8 = ctx;
    \u0275\u0275attribute("aria-label", reference_r8.descripcion);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", reference_r8.numero, ") ");
  }
}
function VaccinationCalendarComponent_Conditional_1_For_33_For_5_Conditional_1_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 28);
    \u0275\u0275domListener("mouseenter", function VaccinationCalendarComponent_Conditional_1_For_33_For_5_Conditional_1_For_3_Template_button_mouseenter_0_listener($event) {
      const note_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r3.showTooltip($event, "Condici\xF3n de aplicaci\xF3n", note_r10.condicion));
    })("mouseleave", function VaccinationCalendarComponent_Conditional_1_For_33_For_5_Conditional_1_For_3_Template_button_mouseleave_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r3.hideTooltip());
    })("focus", function VaccinationCalendarComponent_Conditional_1_For_33_For_5_Conditional_1_For_3_Template_button_focus_0_listener($event) {
      const note_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r3.showTooltip($event, "Condici\xF3n de aplicaci\xF3n", note_r10.condicion));
    })("blur", function VaccinationCalendarComponent_Conditional_1_For_33_For_5_Conditional_1_For_3_Template_button_blur_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r3.hideTooltip());
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const note_r10 = ctx.$implicit;
    \u0275\u0275attribute("aria-label", note_r10.condicion);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", note_r10.letra, ") ");
  }
}
function VaccinationCalendarComponent_Conditional_1_For_33_For_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275repeaterCreate(2, VaccinationCalendarComponent_Conditional_1_For_33_For_5_Conditional_1_For_3_Template, 2, 2, "button", 27, _forTrack3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const cell_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classMap("badge badge-" + (cell_r11.tipoBadge ?? "default") + (cell_r11.colspan > 1 ? " badge-span" : ""));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r11.contenido, " ");
    \u0275\u0275advance();
    \u0275\u0275repeater(cell_r11.notas);
  }
}
function VaccinationCalendarComponent_Conditional_1_For_33_For_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 26);
    \u0275\u0275text(1, "\u2013");
    \u0275\u0275domElementEnd();
  }
}
function VaccinationCalendarComponent_Conditional_1_For_33_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "td");
    \u0275\u0275conditionalCreate(1, VaccinationCalendarComponent_Conditional_1_For_33_For_5_Conditional_1_Template, 4, 3, "span", 25)(2, VaccinationCalendarComponent_Conditional_1_For_33_For_5_Conditional_2_Template, 2, 0, "span", 26);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    let tmp_25_0;
    const cell_r11 = ctx.$implicit;
    \u0275\u0275attribute("colspan", cell_r11.colspan > 1 ? cell_r11.colspan : null);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_25_0 = cell_r11.aplicacion) ? 1 : 2, tmp_25_0);
  }
}
function VaccinationCalendarComponent_Conditional_1_For_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "tr")(1, "th", 22);
    \u0275\u0275text(2);
    \u0275\u0275conditionalCreate(3, VaccinationCalendarComponent_Conditional_1_For_33_Conditional_3_Template, 2, 2, "button", 23);
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(4, VaccinationCalendarComponent_Conditional_1_For_33_For_5_Template, 3, 2, "td", null, _forTrack4);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    let tmp_15_0;
    const vaccine_r12 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", vaccine_r12.nombre, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_15_0 = vaccine_r12.referencia_patologia) ? 3 : -1, tmp_15_0);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.cellsFor(vaccine_r12));
  }
}
function VaccinationCalendarComponent_Conditional_1_Conditional_34_For_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 24);
    \u0275\u0275domListener("mouseenter", function VaccinationCalendarComponent_Conditional_1_Conditional_34_For_4_Conditional_3_Template_button_mouseenter_0_listener($event) {
      const reference_r14 = \u0275\u0275restoreView(_r13);
      const ctx_r3 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r3.showTooltip($event, "Patolog\xEDa prevenida", reference_r14.descripcion));
    })("mouseleave", function VaccinationCalendarComponent_Conditional_1_Conditional_34_For_4_Conditional_3_Template_button_mouseleave_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r3 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r3.hideTooltip());
    })("focus", function VaccinationCalendarComponent_Conditional_1_Conditional_34_For_4_Conditional_3_Template_button_focus_0_listener($event) {
      const reference_r14 = \u0275\u0275restoreView(_r13);
      const ctx_r3 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r3.showTooltip($event, "Patolog\xEDa prevenida", reference_r14.descripcion));
    })("blur", function VaccinationCalendarComponent_Conditional_1_Conditional_34_For_4_Conditional_3_Template_button_blur_0_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r3 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r3.hideTooltip());
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const reference_r14 = ctx;
    \u0275\u0275attribute("aria-label", reference_r14.descripcion);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", reference_r14.numero, ") ");
  }
}
function VaccinationCalendarComponent_Conditional_1_Conditional_34_For_4_For_5_Conditional_1_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 28);
    \u0275\u0275domListener("mouseenter", function VaccinationCalendarComponent_Conditional_1_Conditional_34_For_4_For_5_Conditional_1_For_3_Template_button_mouseenter_0_listener($event) {
      const note_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r3.showTooltip($event, "Condici\xF3n de aplicaci\xF3n", note_r16.condicion));
    })("mouseleave", function VaccinationCalendarComponent_Conditional_1_Conditional_34_For_4_For_5_Conditional_1_For_3_Template_button_mouseleave_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r3 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r3.hideTooltip());
    })("focus", function VaccinationCalendarComponent_Conditional_1_Conditional_34_For_4_For_5_Conditional_1_For_3_Template_button_focus_0_listener($event) {
      const note_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r3.showTooltip($event, "Condici\xF3n de aplicaci\xF3n", note_r16.condicion));
    })("blur", function VaccinationCalendarComponent_Conditional_1_Conditional_34_For_4_For_5_Conditional_1_For_3_Template_button_blur_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r3 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r3.hideTooltip());
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const note_r16 = ctx.$implicit;
    \u0275\u0275attribute("aria-label", note_r16.condicion);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", note_r16.letra, ") ");
  }
}
function VaccinationCalendarComponent_Conditional_1_Conditional_34_For_4_For_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275repeaterCreate(2, VaccinationCalendarComponent_Conditional_1_Conditional_34_For_4_For_5_Conditional_1_For_3_Template, 2, 2, "button", 27, _forTrack3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const cell_r17 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classMap("badge badge-" + (cell_r17.tipoBadge ?? "default") + (cell_r17.colspan > 1 ? " badge-span" : ""));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r17.contenido, " ");
    \u0275\u0275advance();
    \u0275\u0275repeater(cell_r17.notas);
  }
}
function VaccinationCalendarComponent_Conditional_1_Conditional_34_For_4_For_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 26);
    \u0275\u0275text(1, "\u2013");
    \u0275\u0275domElementEnd();
  }
}
function VaccinationCalendarComponent_Conditional_1_Conditional_34_For_4_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "td");
    \u0275\u0275conditionalCreate(1, VaccinationCalendarComponent_Conditional_1_Conditional_34_For_4_For_5_Conditional_1_Template, 4, 3, "span", 25)(2, VaccinationCalendarComponent_Conditional_1_Conditional_34_For_4_For_5_Conditional_2_Template, 2, 0, "span", 26);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const cell_r17 = ctx.$implicit;
    \u0275\u0275attribute("colspan", cell_r17.colspan > 1 ? cell_r17.colspan : null);
    \u0275\u0275advance();
    \u0275\u0275conditional(cell_r17.aplicacion ? 1 : 2);
  }
}
function VaccinationCalendarComponent_Conditional_1_Conditional_34_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "tr")(1, "th", 22);
    \u0275\u0275text(2);
    \u0275\u0275conditionalCreate(3, VaccinationCalendarComponent_Conditional_1_Conditional_34_For_4_Conditional_3_Template, 2, 2, "button", 23);
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(4, VaccinationCalendarComponent_Conditional_1_Conditional_34_For_4_For_5_Template, 3, 2, "td", null, _forTrack4);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    let tmp_16_0;
    const vaccine_r18 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", vaccine_r18.nombre, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_16_0 = vaccine_r18.referencia_patologia) ? 3 : -1, tmp_16_0);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.cellsFor(vaccine_r18));
  }
}
function VaccinationCalendarComponent_Conditional_1_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "tr", 29)(1, "td");
    \u0275\u0275text(2, "Exclusivo zonas de riesgo");
    \u0275\u0275domElementEnd()();
    \u0275\u0275repeaterCreate(3, VaccinationCalendarComponent_Conditional_1_Conditional_34_For_4_Template, 6, 2, "tr", null, _forTrack1);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r3.flatColumns().length + 1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.riskVaccines());
  }
}
function VaccinationCalendarComponent_Conditional_1_For_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li", 21)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const reference_r19 = ctx.$implicit;
    \u0275\u0275domProperty("id", "patologia-" + reference_r19.numero);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", reference_r19.numero, ")");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", reference_r19.descripcion, " ");
  }
}
function VaccinationCalendarComponent_Conditional_1_For_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "li", 21)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const note_r20 = ctx.$implicit;
    \u0275\u0275domProperty("id", "nota-" + note_r20.letra);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", note_r20.letra, ")");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", note_r20.condicion, " ");
  }
}
function VaccinationCalendarComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "header", 6)(1, "div", 7)(2, "h1");
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(4, "p");
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "div", 8)(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275domElementEnd()()()();
    \u0275\u0275domElementStart(13, "div", 9)(14, "span", 10);
    \u0275\u0275text(15, "Deslizar columnas");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(16, "div", 11, 0);
    \u0275\u0275domListener("scroll", function VaccinationCalendarComponent_Conditional_1_Template_div_scroll_16_listener() {
      \u0275\u0275restoreView(_r1);
      const topScroller_r2 = \u0275\u0275reference(17);
      const tableScroller_r3 = \u0275\u0275reference(20);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.syncTableScroll(topScroller_r2, tableScroller_r3));
    });
    \u0275\u0275domElement(18, "div", 12);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(19, "div", 13, 1);
    \u0275\u0275domListener("scroll", function VaccinationCalendarComponent_Conditional_1_Template_div_scroll_19_listener() {
      \u0275\u0275restoreView(_r1);
      const topScroller_r2 = \u0275\u0275reference(17);
      const tableScroller_r3 = \u0275\u0275reference(20);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.syncTableScroll(tableScroller_r3, topScroller_r2));
    });
    \u0275\u0275domElementStart(21, "table")(22, "thead")(23, "tr")(24, "th", 14);
    \u0275\u0275text(25, "Vacunas");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(26, VaccinationCalendarComponent_Conditional_1_For_27_Template, 2, 2, "th", 15, _forTrack0);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(28, "tr");
    \u0275\u0275repeaterCreate(29, VaccinationCalendarComponent_Conditional_1_For_30_Template, 3, 2, "th", 16, _forTrack1);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(31, "tbody");
    \u0275\u0275repeaterCreate(32, VaccinationCalendarComponent_Conditional_1_For_33_Template, 6, 2, "tr", null, _forTrack1);
    \u0275\u0275conditionalCreate(34, VaccinationCalendarComponent_Conditional_1_Conditional_34_Template, 5, 1);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(35, "section", 17)(36, "h2", 18);
    \u0275\u0275text(37, "Referencias y especificaciones cl\xEDnicas");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(38, "div", 19)(39, "div")(40, "h3");
    \u0275\u0275text(41, "Patolog\xEDas prevenidas");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(42, "ul", 20);
    \u0275\u0275repeaterCreate(43, VaccinationCalendarComponent_Conditional_1_For_44_Template, 4, 3, "li", 21, _forTrack2);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(45, "div")(46, "h3");
    \u0275\u0275text(47, "Notas y condiciones de aplicaci\xF3n");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(48, "ul", 20);
    \u0275\u0275repeaterCreate(49, VaccinationCalendarComponent_Conditional_1_For_50_Template, 4, 3, "li", 21, _forTrack3);
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const calendar_r21 = ctx;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(calendar_r21.metadata.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(calendar_r21.metadata.bajada);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(calendar_r21.metadata.organismo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("L\xEDnea gratuita: ", calendar_r21.metadata.telefono);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(calendar_r21.metadata.sitio_web);
    \u0275\u0275advance(6);
    \u0275\u0275styleProp("width", ctx_r3.tableMinWidth(), "px");
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("min-width", ctx_r3.tableMinWidth(), "px");
    \u0275\u0275advance(5);
    \u0275\u0275repeater(calendar_r21.grupos_etarios_columnas);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r3.flatColumns());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r3.regularVaccines());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.riskVaccines().length ? 34 : -1);
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r3.pathologyReferences());
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r3.applicationNotes());
  }
}
function VaccinationCalendarComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 3);
    \u0275\u0275text(1, "Cargando calendario nacional de vacunaci\xF3n\u2026");
    \u0275\u0275domElementEnd();
  }
}
function VaccinationCalendarComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 4);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function VaccinationCalendarComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 30)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const tooltip_r22 = ctx;
    \u0275\u0275styleProp("left", tooltip_r22.left, "px")("top", tooltip_r22.top, "px");
    \u0275\u0275classProp("is-below", tooltip_r22.placement === "below");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tooltip_r22.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", tooltip_r22.content, " ");
  }
}
var VaccinationCalendarComponent = class _VaccinationCalendarComponent {
  vaccinationCalendarService = inject(VaccinationCalendarService);
  themeService = inject(ThemeService);
  /** Optional caller-supplied calendar. It overrides the service response. */
  data = input(
    null,
    ...ngDevMode ? [{ debugName: "data" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isDarkMode = computed(
    () => this.themeService.theme() === "dark",
    ...ngDevMode ? [{ debugName: "isDarkMode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeTooltip = signal(
    null,
    ...ngDevMode ? [{ debugName: "activeTooltip" }] : (
      /* istanbul ignore next */
      []
    )
  );
  /** The effective calendar, either injected by the caller or fetched remotely. */
  calendar = computed(
    () => this.data() ?? this.vaccinationCalendarService.data(),
    ...ngDevMode ? [{ debugName: "calendar" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loading = computed(
    () => !this.data() && this.vaccinationCalendarService.loading(),
    ...ngDevMode ? [{ debugName: "loading" }] : (
      /* istanbul ignore next */
      []
    )
  );
  error = computed(
    () => !this.data() ? this.vaccinationCalendarService.error() : null,
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  flatColumns = computed(
    () => (this.calendar()?.grupos_etarios_columnas ?? []).flatMap((group) => group.columnas).slice().sort((first, second) => first.orden - second.orden),
    ...ngDevMode ? [{ debugName: "flatColumns" }] : (
      /* istanbul ignore next */
      []
    )
  );
  tableMinWidth = computed(
    () => Math.max(1420, 220 + this.flatColumns().length * 78),
    ...ngDevMode ? [{ debugName: "tableMinWidth" }] : (
      /* istanbul ignore next */
      []
    )
  );
  regularVaccines = computed(
    () => (this.calendar()?.vacunas ?? []).filter((vaccine) => vaccine.categoria !== "exclusivo_zonas_de_riesgo"),
    ...ngDevMode ? [{ debugName: "regularVaccines" }] : (
      /* istanbul ignore next */
      []
    )
  );
  riskVaccines = computed(
    () => (this.calendar()?.vacunas ?? []).filter((vaccine) => vaccine.categoria === "exclusivo_zonas_de_riesgo"),
    ...ngDevMode ? [{ debugName: "riskVaccines" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pathologyReferences = computed(
    () => this.regularVaccines().concat(this.riskVaccines()).flatMap((vaccine) => vaccine.referencia_patologia ? [vaccine.referencia_patologia] : []).filter((reference, index, all) => all.findIndex((candidate) => candidate.numero === reference.numero) === index).sort((first, second) => first.numero - second.numero),
    ...ngDevMode ? [{ debugName: "pathologyReferences" }] : (
      /* istanbul ignore next */
      []
    )
  );
  applicationNotes = computed(
    () => {
      const notes = this.calendar()?.notas_aplicacion ?? {};
      return Object.entries(notes).map(([letra, condicion]) => ({ letra, condicion })).sort((first, second) => first.letra.localeCompare(second.letra, "es"));
    },
    ...ngDevMode ? [{ debugName: "applicationNotes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ngOnInit() {
    if (!this.data()) {
      this.vaccinationCalendarService.load();
    }
  }
  showTooltip(event, title, content) {
    const target = event.currentTarget;
    const bounds = target.getBoundingClientRect();
    const width = Math.min(300, window.innerWidth - 32);
    const left = Math.max(16 + width / 2, Math.min(bounds.left + bounds.width / 2, window.innerWidth - 16 - width / 2));
    const estimatedHeight = Math.min(220, 54 + Math.ceil(content.length / 40) * 18);
    const fitsAbove = bounds.top >= estimatedHeight + 16;
    const fitsBelow = window.innerHeight - bounds.bottom >= estimatedHeight + 16;
    const placement = fitsAbove || !fitsBelow ? "above" : "below";
    this.activeTooltip.set({
      title,
      content,
      left,
      top: placement === "above" ? bounds.top - 8 : bounds.bottom + 8,
      placement
    });
  }
  hideTooltip() {
    this.activeTooltip.set(null);
  }
  syncTableScroll(source, target) {
    if (target.scrollLeft !== source.scrollLeft) {
      target.scrollLeft = source.scrollLeft;
    }
  }
  /**
   * Produces one physical `<td>` per visible cell. A multi-column dose becomes
   * a single cell only when its referenced column ids are consecutive in the
   * current grid. This prevents a changed JSON column set from shifting rows.
   */
  cellsFor(vaccine) {
    return this.buildCells(vaccine, this.flatColumns());
  }
  buildCells(vaccine, columns) {
    const applicationsByColumn = /* @__PURE__ */ new Map();
    for (const application of vaccine.aplicaciones) {
      for (const columnId of application.columnas) {
        if (!applicationsByColumn.has(columnId)) {
          applicationsByColumn.set(columnId, application);
        }
      }
    }
    const cells = [];
    let index = 0;
    while (index < columns.length) {
      const column = columns[index];
      const application = applicationsByColumn.get(column.id) ?? null;
      if (!application) {
        cells.push(this.emptyCell(column.id));
        index += 1;
        continue;
      }
      const span = this.consecutiveSpan(application, columns, applicationsByColumn, index);
      cells.push({
        columnaId: column.id,
        colspan: span,
        aplicacion: application,
        contenido: application.dosis,
        tipoBadge: application.tipo,
        notas: application.notas
      });
      index += span;
    }
    return cells;
  }
  consecutiveSpan(application, columns, applicationsByColumn, startIndex) {
    let span = 0;
    for (let index = startIndex; index < columns.length; index += 1) {
      if (applicationsByColumn.get(columns[index].id) !== application) {
        break;
      }
      span += 1;
    }
    return Math.max(span, 1);
  }
  emptyCell(columnId) {
    return {
      columnaId: columnId,
      colspan: 1,
      aplicacion: null,
      contenido: null,
      tipoBadge: null,
      notas: []
    };
  }
  static \u0275fac = function VaccinationCalendarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VaccinationCalendarComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VaccinationCalendarComponent, selectors: [["app-vaccination-calendar"]], hostVars: 2, hostBindings: function VaccinationCalendarComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("dark-theme", ctx.isDarkMode());
    }
  }, inputs: { data: [1, "data"] }, decls: 5, vars: 2, consts: [["topScroller", ""], ["tableScroller", ""], [1, "vaccination-calendar"], ["role", "status", 1, "status-card"], ["role", "alert", 1, "status-card", "status-error"], ["role", "tooltip", 1, "reference-tooltip", 3, "is-below", "left", "top"], [1, "header-card"], [1, "header-copy"], ["aria-label", "Informaci\xF3n del calendario", 1, "header-meta"], ["aria-label", "Desplazamiento horizontal de la tabla", 1, "table-scrollbar-container"], [1, "scrollbar-label"], [1, "top-scrollbar", 3, "scroll"], [1, "top-scrollbar-content"], ["tabindex", "0", "aria-label", "Tabla del calendario nacional de vacunaci\xF3n", 1, "table-wrapper", 3, "scroll"], ["rowspan", "2", "scope", "col", 1, "col-vaccine"], ["scope", "colgroup", 1, "group-header"], ["scope", "col"], ["aria-labelledby", "clinical-notes-title", 1, "notes-container"], ["id", "clinical-notes-title"], [1, "notes-grid"], [1, "notes-list"], [3, "id"], ["scope", "row", 1, "col-vaccine"], ["type", "button", 1, "ref-num"], ["type", "button", 1, "ref-num", 3, "mouseenter", "mouseleave", "focus", "blur"], [3, "class"], ["aria-label", "Sin aplicaci\xF3n", 1, "empty"], ["type", "button", 1, "badge-reference"], ["type", "button", 1, "badge-reference", 3, "mouseenter", "mouseleave", "focus", "blur"], [1, "risk-separator"], ["role", "tooltip", 1, "reference-tooltip"]], template: function VaccinationCalendarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "section", 2);
      \u0275\u0275conditionalCreate(1, VaccinationCalendarComponent_Conditional_1_Template, 51, 10)(2, VaccinationCalendarComponent_Conditional_2_Template, 2, 0, "div", 3)(3, VaccinationCalendarComponent_Conditional_3_Template, 2, 1, "div", 4);
      \u0275\u0275conditionalCreate(4, VaccinationCalendarComponent_Conditional_4_Template, 4, 8, "div", 5);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      let tmp_1_0;
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_0_0 = ctx.calendar()) ? 1 : ctx.loading() ? 2 : (tmp_0_0 = ctx.error()) ? 3 : -1, tmp_0_0);
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_1_0 = ctx.activeTooltip()) ? 4 : -1, tmp_1_0);
    }
  }, styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  font-family:\n    "Google Sans",\n    "Roboto",\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    sans-serif;\n}\n.vaccination-calendar[_ngcontent-%COMP%] {\n  --%NS%surface: #f8fafc;\n  --%NS%surface-container: #ffffff;\n  --%NS%surface-container-low: #f1f5f9;\n  --%NS%surface-container-high: #e2e8f0;\n  --%NS%on-surface: #1e293b;\n  --%NS%on-surface-variant: #475569;\n  --%NS%outline: #94a3b8;\n  --%NS%outline-variant: #e2e8f0;\n  --%NS%header-surface: #f0f7ff;\n  --%NS%header-text: #0369a1;\n  --%NS%header-border: #bae6fd;\n  --%NS%sticky-surface: #ffffff;\n  --%NS%table-header: #f8fafc;\n  --%NS%table-group-header: #f1f5f9;\n  --%NS%row-divider: #f1f5f9;\n  --%NS%empty: #cbd5e1;\n  --%NS%risk-surface: #fff1f2;\n  --%NS%risk-text: #9f1239;\n  --%NS%risk-border: #fecdd3;\n  --%NS%chip-primary-bg: #e0f2fe;\n  --%NS%chip-primary-text: #0369a1;\n  --%NS%chip-primary-border: #bae6fd;\n  --%NS%chip-booster-bg: #ecfdf5;\n  --%NS%chip-booster-text: #047857;\n  --%NS%chip-booster-border: #a7f3d0;\n  --%NS%chip-flu-bg: #f3e8ff;\n  --%NS%chip-flu-text: #6b21a8;\n  --%NS%chip-flu-border: #e9d5ff;\n  --%NS%chip-single-bg: #fef3c7;\n  --%NS%chip-single-text: #92400e;\n  --%NS%chip-single-border: #fde68a;\n  --%NS%chip-scheme-bg: #f1f5f9;\n  --%NS%chip-scheme-text: #334155;\n  --%NS%chip-scheme-border: #cbd5e1;\n  --%NS%chip-risk-bg: #fee2e2;\n  --%NS%chip-risk-text: #991b1b;\n  --%NS%chip-risk-border: #fecaca;\n  background: var(--%NS%surface);\n  color: var(--%NS%on-surface);\n  padding: 32px 24px;\n  line-height: 1.5;\n}\n.dark-theme[_nghost-%COMP%]   .vaccination-calendar[_ngcontent-%COMP%] {\n  --%NS%surface: #0f141c;\n  --%NS%surface-container: #19202c;\n  --%NS%surface-container-low: #141a24;\n  --%NS%surface-container-high: #222b3b;\n  --%NS%on-surface: #e2e8f0;\n  --%NS%on-surface-variant: #94a3b8;\n  --%NS%outline: #475569;\n  --%NS%outline-variant: #283344;\n  --%NS%header-surface: #19202c;\n  --%NS%header-text: #38bdf8;\n  --%NS%header-border: #283344;\n  --%NS%sticky-surface: #19202c;\n  --%NS%table-header: #151b26;\n  --%NS%table-group-header: #111620;\n  --%NS%row-divider: #1f2736;\n  --%NS%empty: #475569;\n  --%NS%risk-surface: #2b1115;\n  --%NS%risk-text: #fca5a5;\n  --%NS%risk-border: #5c1d24;\n  --%NS%chip-primary-bg: #0c2d48;\n  --%NS%chip-primary-text: #7dd3fc;\n  --%NS%chip-primary-border: #0369a1;\n  --%NS%chip-booster-bg: #063725;\n  --%NS%chip-booster-text: #6ee7b7;\n  --%NS%chip-booster-border: #047857;\n  --%NS%chip-flu-bg: #2e1047;\n  --%NS%chip-flu-text: #d8b4fe;\n  --%NS%chip-flu-border: #7c3aed;\n  --%NS%chip-single-bg: #3d2007;\n  --%NS%chip-single-text: #fde047;\n  --%NS%chip-single-border: #a16207;\n  --%NS%chip-scheme-bg: #1e293b;\n  --%NS%chip-scheme-text: #cbd5e1;\n  --%NS%chip-scheme-border: #475569;\n  --%NS%chip-risk-bg: #3e1015;\n  --%NS%chip-risk-text: #fca5a5;\n  --%NS%chip-risk-border: #991b1b;\n}\n.header-card[_ngcontent-%COMP%], \n.notes-container[_ngcontent-%COMP%], \n.status-card[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-container);\n  border: 1px solid var(--%NS%outline-variant);\n  border-radius: 20px;\n}\n.header-card[_ngcontent-%COMP%] {\n  background: var(--%NS%header-surface);\n  border-color: var(--%NS%header-border);\n  display: flex;\n  gap: 24px;\n  justify-content: space-between;\n  margin-bottom: 24px;\n  padding: 28px 32px;\n}\nh1[_ngcontent-%COMP%], \nh2[_ngcontent-%COMP%], \nh3[_ngcontent-%COMP%], \np[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.header-copy[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: var(--%NS%header-text);\n  font-size: 1.85rem;\n  font-weight: 700;\n  letter-spacing: -.02em;\n}\n.header-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--%NS%on-surface-variant);\n  font-size: .95rem;\n  margin: 6px 0 16px;\n}\n.header-meta[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--%NS%header-border);\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  padding-top: 14px;\n}\n.header-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-container);\n  border: 1px solid var(--%NS%outline-variant);\n  border-radius: 999px;\n  color: var(--%NS%header-text);\n  font-size: .82rem;\n  font-weight: 500;\n  padding: 6px 14px;\n}\n.table-scrollbar-container[_ngcontent-%COMP%] {\n  align-items: center;\n  background: var(--%NS%surface-container);\n  border: 1px solid var(--%NS%outline-variant);\n  border-radius: 12px;\n  display: flex;\n  gap: 12px;\n  margin-bottom: 10px;\n  padding: 8px 14px;\n}\n.scrollbar-label[_ngcontent-%COMP%] {\n  color: var(--%NS%on-surface-variant);\n  flex: 0 0 auto;\n  font-size: .76rem;\n  font-weight: 600;\n}\n.top-scrollbar[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 16px;\n  overflow-x: scroll;\n  overflow-y: hidden;\n}\n.top-scrollbar-content[_ngcontent-%COMP%] {\n  height: 1px;\n}\n.top-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  height: 10px;\n}\n.top-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: var(--%NS%surface-container-low);\n  border-radius: 99px;\n}\n.top-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: var(--%NS%outline);\n  border-radius: 99px;\n}\n.table-wrapper[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-container);\n  border: 1px solid var(--%NS%outline-variant);\n  border-radius: 20px;\n  margin-bottom: 32px;\n  overflow-x: auto;\n  position: relative;\n}\ntable[_ngcontent-%COMP%] {\n  border-collapse: separate;\n  border-spacing: 0;\n  font-size: .8rem;\n  min-width: 1420px;\n  text-align: center;\n  width: 100%;\n}\nthead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: var(--%NS%table-header);\n  border-bottom: 1px solid var(--%NS%outline-variant);\n  border-right: 1px solid var(--%NS%outline-variant);\n  color: var(--%NS%on-surface-variant);\n  font-size: .76rem;\n  font-weight: 500;\n  letter-spacing: .01em;\n  padding: 10px 6px;\n}\nthead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  font-size: .7rem;\n  font-weight: 400;\n}\nthead[_ngcontent-%COMP%]   .group-header[_ngcontent-%COMP%] {\n  background: var(--%NS%table-group-header);\n  border-bottom-color: var(--%NS%outline);\n  color: var(--%NS%on-surface);\n  font-size: .8rem;\n  font-weight: 700;\n  padding: 10px 8px;\n}\n.col-vaccine[_ngcontent-%COMP%] {\n  background: var(--%NS%sticky-surface);\n  border-right: 2px solid var(--%NS%outline-variant);\n  color: var(--%NS%on-surface);\n  font-weight: 500;\n  left: 0;\n  min-width: 220px;\n  padding: 12px 16px;\n  position: sticky;\n  text-align: left;\n  width: 220px;\n  z-index: 2;\n}\nthead[_ngcontent-%COMP%]   .col-vaccine[_ngcontent-%COMP%] {\n  background: var(--%NS%table-group-header);\n  font-weight: 700;\n  z-index: 3;\n}\ntbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  transition: background-color .15s ease;\n}\ntbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: color-mix(in srgb, var(--%NS%surface-container-high) 55%, transparent);\n}\ntbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--%NS%row-divider);\n  border-right: 1px solid var(--%NS%row-divider);\n  padding: 8px 4px;\n  vertical-align: middle;\n}\n.empty[_ngcontent-%COMP%] {\n  color: var(--%NS%empty);\n  font-size: .8rem;\n}\n.risk-separator[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  background: var(--%NS%risk-surface);\n  border-bottom: 1px solid var(--%NS%risk-border);\n  border-top: 1px solid var(--%NS%risk-border);\n  color: var(--%NS%risk-text);\n  font-size: .78rem;\n  font-weight: 700;\n  letter-spacing: .05em;\n  padding: 10px 16px;\n  text-align: left;\n  text-transform: uppercase;\n}\n.badge[_ngcontent-%COMP%] {\n  border: 1px solid;\n  border-radius: 8px;\n  display: inline-block;\n  font-size: .74rem;\n  font-weight: 500;\n  line-height: 1.25;\n  padding: 5px 9px;\n  white-space: normal;\n}\n.badge-span[_ngcontent-%COMP%] {\n  display: block;\n  margin: 0 auto;\n  padding: 7px 10px;\n  width: calc(100% - 10px);\n}\n.badge-reference[_ngcontent-%COMP%] {\n  appearance: none;\n  background: color-mix(in srgb, currentColor 10%, transparent);\n  border: 0;\n  border-radius: 4px;\n  color: inherit;\n  cursor: pointer;\n  display: inline-block;\n  font-family: inherit;\n  font-size: .68rem;\n  line-height: 1.1;\n  margin-inline-start: .35rem;\n  padding: 1px 3px;\n  text-decoration: none;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n.badge-reference[_ngcontent-%COMP%]:focus-visible, \n.ref-num[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid currentColor;\n  outline-offset: 2px;\n}\n.badge-dosis_primaria[_ngcontent-%COMP%] {\n  background: var(--%NS%chip-primary-bg);\n  border-color: var(--%NS%chip-primary-border);\n  color: var(--%NS%chip-primary-text);\n}\n.badge-refuerzo[_ngcontent-%COMP%] {\n  background: var(--%NS%chip-booster-bg);\n  border-color: var(--%NS%chip-booster-border);\n  color: var(--%NS%chip-booster-text);\n}\n.badge-dosis_anual[_ngcontent-%COMP%] {\n  background: var(--%NS%chip-flu-bg);\n  border-color: var(--%NS%chip-flu-border);\n  color: var(--%NS%chip-flu-text);\n}\n.badge-dosis_unica[_ngcontent-%COMP%] {\n  background: var(--%NS%chip-single-bg);\n  border-color: var(--%NS%chip-single-border);\n  color: var(--%NS%chip-single-text);\n}\n.badge-esquema[_ngcontent-%COMP%] {\n  background: var(--%NS%chip-scheme-bg);\n  border-color: var(--%NS%chip-scheme-border);\n  color: var(--%NS%chip-scheme-text);\n}\n.badge-riesgo[_ngcontent-%COMP%] {\n  background: var(--%NS%chip-risk-bg);\n  border-color: var(--%NS%chip-risk-border);\n  color: var(--%NS%chip-risk-text);\n}\n.badge-default[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-container-low);\n  border-color: var(--%NS%outline-variant);\n  color: var(--%NS%on-surface-variant);\n}\n.ref-num[_ngcontent-%COMP%] {\n  appearance: none;\n  background: transparent;\n  border: 0;\n  color: var(--%NS%header-text);\n  cursor: pointer;\n  font-family: inherit;\n  font-size: .7rem;\n  font-weight: 700;\n  margin-inline-start: .3rem;\n  padding: 0;\n  text-decoration: none;\n  vertical-align: super;\n}\n.reference-tooltip[_ngcontent-%COMP%] {\n  background: var(--%NS%surface-container-high);\n  border: 1px solid var(--%NS%outline);\n  border-radius: 10px;\n  box-sizing: border-box;\n  box-shadow: 0 8px 20px color-mix(in srgb, #0f172a 20%, transparent);\n  color: var(--%NS%on-surface);\n  font-size: .78rem;\n  font-weight: 400;\n  line-height: 1.4;\n  pointer-events: none;\n  padding: 10px 12px;\n  position: fixed;\n  text-align: left;\n  transform: translate(-50%, -100%);\n  width: min(300px, calc(100vw - 32px));\n  overflow-wrap: anywhere;\n  z-index: 100;\n}\n.reference-tooltip.is-below[_ngcontent-%COMP%] {\n  transform: translate(-50%, 0);\n}\n.reference-tooltip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: .7rem;\n  letter-spacing: .02em;\n  margin-bottom: 3px;\n}\n.notes-container[_ngcontent-%COMP%] {\n  padding: 28px 32px;\n}\n.notes-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--%NS%outline-variant);\n  color: var(--%NS%on-surface);\n  font-size: 1.15rem;\n  font-weight: 700;\n  margin-bottom: 20px;\n  padding-bottom: 10px;\n}\n.notes-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 32px;\n  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));\n}\n.notes-grid[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: var(--%NS%on-surface);\n  font-size: .95rem;\n  font-weight: 700;\n  margin-bottom: 12px;\n}\n.notes-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.notes-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  border-left: 3px solid transparent;\n  border-radius: 0 8px 8px 0;\n  color: var(--%NS%on-surface-variant);\n  font-size: .82rem;\n  line-height: 1.45;\n  margin-bottom: 9px;\n  padding: 3px 8px;\n  scroll-margin-top: 24px;\n  transition: background-color .25s ease, border-color .25s ease;\n}\n.notes-list[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--%NS%on-surface);\n  font-weight: 600;\n  margin-right: 4px;\n}\n.status-card[_ngcontent-%COMP%] {\n  color: var(--%NS%on-surface-variant);\n  padding: 28px 32px;\n  text-align: center;\n}\n.status-error[_ngcontent-%COMP%] {\n  border-color: var(--%NS%risk-border);\n  color: var(--%NS%risk-text);\n}\n@media (max-width: 640px) {\n  .vaccination-calendar[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .header-card[_ngcontent-%COMP%], \n   .notes-container[_ngcontent-%COMP%] {\n    border-radius: 16px;\n    padding: 22px 20px;\n  }\n  .header-card[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n    gap: 16px;\n  }\n  .header-copy[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.45rem;\n  }\n  .notes-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 24px;\n  }\n}\n/*# sourceMappingURL=calendario-vacunacion.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(VaccinationCalendarComponent, [{
    type: Component,
    args: [{ selector: "app-vaccination-calendar", imports: [], changeDetection: ChangeDetectionStrategy.OnPush, host: {
      "[class.dark-theme]": "isDarkMode()"
    }, template: `<section class="vaccination-calendar">
  @if (calendar(); as calendar) {
    <header class="header-card">
      <div class="header-copy">
        <h1>{{ calendar.metadata.titulo }}</h1>
        <p>{{ calendar.metadata.bajada }}</p>
        <div class="header-meta" aria-label="Informaci\xF3n del calendario">
          <span>{{ calendar.metadata.organismo }}</span>
          <span>L\xEDnea gratuita: {{ calendar.metadata.telefono }}</span>
          <span>{{ calendar.metadata.sitio_web }}</span>
        </div>
      </div>

    </header>

    <div class="table-scrollbar-container" aria-label="Desplazamiento horizontal de la tabla">
      <span class="scrollbar-label">Deslizar columnas</span>
      <div
        #topScroller
        class="top-scrollbar"
        (scroll)="syncTableScroll(topScroller, tableScroller)"
      >
        <div class="top-scrollbar-content" [style.width.px]="tableMinWidth()"></div>
      </div>
    </div>

    <div
      #tableScroller
      class="table-wrapper"
      tabindex="0"
      aria-label="Tabla del calendario nacional de vacunaci\xF3n"
      (scroll)="syncTableScroll(tableScroller, topScroller)"
    >
      <table [style.min-width.px]="tableMinWidth()">
        <thead>
          <tr>
            <th class="col-vaccine" rowspan="2" scope="col">Vacunas</th>
            @for (group of calendar.grupos_etarios_columnas; track group.grupo) {
              <th class="group-header" [attr.colspan]="group.columnas.length" scope="colgroup">
                {{ group.grupo }}
              </th>
            }
          </tr>
          <tr>
            @for (column of flatColumns(); track column.id) {
              <th scope="col">
                {{ column.nombre }}
                @if (column.subtitulo) {
                  <small>{{ column.subtitulo }}</small>
                }
              </th>
            }
          </tr>
        </thead>

        <tbody>
          @for (vaccine of regularVaccines(); track vaccine.id) {
            <tr>
              <th class="col-vaccine" scope="row">
                {{ vaccine.nombre }}
                @if (vaccine.referencia_patologia; as reference) {
                  <button
                    type="button"
                    class="ref-num"
                    [attr.aria-label]="reference.descripcion"
                    (mouseenter)="showTooltip($event, 'Patolog\xEDa prevenida', reference.descripcion)"
                    (mouseleave)="hideTooltip()"
                    (focus)="showTooltip($event, 'Patolog\xEDa prevenida', reference.descripcion)"
                    (blur)="hideTooltip()"
                  >
                    ({{ reference.numero }})
                  </button>
                }
              </th>
              @for (cell of cellsFor(vaccine); track cell.columnaId) {
                <td [attr.colspan]="cell.colspan > 1 ? cell.colspan : null">
                  @if (cell.aplicacion; as application) {
                    <span
                      [class]="'badge badge-' + (cell.tipoBadge ?? 'default') + (cell.colspan > 1 ? ' badge-span' : '')"
                    >
                      {{ cell.contenido }}
                      @for (note of cell.notas; track note.letra) {
                        <button
                          type="button"
                          class="badge-reference"
                          [attr.aria-label]="note.condicion"
                          (mouseenter)="showTooltip($event, 'Condici\xF3n de aplicaci\xF3n', note.condicion)"
                          (mouseleave)="hideTooltip()"
                          (focus)="showTooltip($event, 'Condici\xF3n de aplicaci\xF3n', note.condicion)"
                          (blur)="hideTooltip()"
                        >
                          ({{ note.letra }})
                        </button>
                      }
                    </span>
                  } @else {
                    <span class="empty" aria-label="Sin aplicaci\xF3n">\u2013</span>
                  }
                </td>
              }
            </tr>
          }

          @if (riskVaccines().length) {
            <tr class="risk-separator">
              <td [attr.colspan]="flatColumns().length + 1">Exclusivo zonas de riesgo</td>
            </tr>

            @for (vaccine of riskVaccines(); track vaccine.id) {
              <tr>
                <th class="col-vaccine" scope="row">
                {{ vaccine.nombre }}
                @if (vaccine.referencia_patologia; as reference) {
                  <button
                    type="button"
                    class="ref-num"
                    [attr.aria-label]="reference.descripcion"
                    (mouseenter)="showTooltip($event, 'Patolog\xEDa prevenida', reference.descripcion)"
                    (mouseleave)="hideTooltip()"
                    (focus)="showTooltip($event, 'Patolog\xEDa prevenida', reference.descripcion)"
                    (blur)="hideTooltip()"
                  >
                    ({{ reference.numero }})
                  </button>
                  }
                </th>
                @for (cell of cellsFor(vaccine); track cell.columnaId) {
                  <td [attr.colspan]="cell.colspan > 1 ? cell.colspan : null">
                    @if (cell.aplicacion) {
                      <span
                        [class]="'badge badge-' + (cell.tipoBadge ?? 'default') + (cell.colspan > 1 ? ' badge-span' : '')"
                      >
                        {{ cell.contenido }}
                        @for (note of cell.notas; track note.letra) {
                          <button
                            type="button"
                            class="badge-reference"
                            [attr.aria-label]="note.condicion"
                            (mouseenter)="showTooltip($event, 'Condici\xF3n de aplicaci\xF3n', note.condicion)"
                            (mouseleave)="hideTooltip()"
                            (focus)="showTooltip($event, 'Condici\xF3n de aplicaci\xF3n', note.condicion)"
                            (blur)="hideTooltip()"
                          >
                            ({{ note.letra }})
                          </button>
                        }
                      </span>
                    } @else {
                      <span class="empty" aria-label="Sin aplicaci\xF3n">\u2013</span>
                    }
                  </td>
                }
              </tr>
            }
          }
        </tbody>
      </table>
    </div>

    <section class="notes-container" aria-labelledby="clinical-notes-title">
      <h2 id="clinical-notes-title">Referencias y especificaciones cl\xEDnicas</h2>
      <div class="notes-grid">
        <div>
          <h3>Patolog\xEDas prevenidas</h3>
          <ul class="notes-list">
            @for (reference of pathologyReferences(); track reference.numero) {
              <li
                [id]="'patologia-' + reference.numero"
              >
                <strong>({{ reference.numero }})</strong> {{ reference.descripcion }}
              </li>
            }
          </ul>
        </div>
        <div>
          <h3>Notas y condiciones de aplicaci\xF3n</h3>
          <ul class="notes-list">
            @for (note of applicationNotes(); track note.letra) {
              <li
                [id]="'nota-' + note.letra"
              >
                <strong>({{ note.letra }})</strong> {{ note.condicion }}
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  } @else if (loading()) {
    <div class="status-card" role="status">Cargando calendario nacional de vacunaci\xF3n\u2026</div>
  } @else if (error(); as error) {
    <div class="status-card status-error" role="alert">{{ error }}</div>
  }

  @if (activeTooltip(); as tooltip) {
    <div
      class="reference-tooltip"
      [class.is-below]="tooltip.placement === 'below'"
      [style.left.px]="tooltip.left"
      [style.top.px]="tooltip.top"
      role="tooltip"
    >
      <strong>{{ tooltip.title }}</strong>{{ tooltip.content }}
    </div>
  }
</section>
`, styles: ['/* src/app/features/vaccination-calendar/calendario-vacunacion.component.css */\n:host {\n  display: block;\n  font-family:\n    "Google Sans",\n    "Roboto",\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    sans-serif;\n}\n.vaccination-calendar {\n  --surface: #f8fafc;\n  --surface-container: #ffffff;\n  --surface-container-low: #f1f5f9;\n  --surface-container-high: #e2e8f0;\n  --on-surface: #1e293b;\n  --on-surface-variant: #475569;\n  --outline: #94a3b8;\n  --outline-variant: #e2e8f0;\n  --header-surface: #f0f7ff;\n  --header-text: #0369a1;\n  --header-border: #bae6fd;\n  --sticky-surface: #ffffff;\n  --table-header: #f8fafc;\n  --table-group-header: #f1f5f9;\n  --row-divider: #f1f5f9;\n  --empty: #cbd5e1;\n  --risk-surface: #fff1f2;\n  --risk-text: #9f1239;\n  --risk-border: #fecdd3;\n  --chip-primary-bg: #e0f2fe;\n  --chip-primary-text: #0369a1;\n  --chip-primary-border: #bae6fd;\n  --chip-booster-bg: #ecfdf5;\n  --chip-booster-text: #047857;\n  --chip-booster-border: #a7f3d0;\n  --chip-flu-bg: #f3e8ff;\n  --chip-flu-text: #6b21a8;\n  --chip-flu-border: #e9d5ff;\n  --chip-single-bg: #fef3c7;\n  --chip-single-text: #92400e;\n  --chip-single-border: #fde68a;\n  --chip-scheme-bg: #f1f5f9;\n  --chip-scheme-text: #334155;\n  --chip-scheme-border: #cbd5e1;\n  --chip-risk-bg: #fee2e2;\n  --chip-risk-text: #991b1b;\n  --chip-risk-border: #fecaca;\n  background: var(--surface);\n  color: var(--on-surface);\n  padding: 32px 24px;\n  line-height: 1.5;\n}\n:host(.dark-theme) .vaccination-calendar {\n  --surface: #0f141c;\n  --surface-container: #19202c;\n  --surface-container-low: #141a24;\n  --surface-container-high: #222b3b;\n  --on-surface: #e2e8f0;\n  --on-surface-variant: #94a3b8;\n  --outline: #475569;\n  --outline-variant: #283344;\n  --header-surface: #19202c;\n  --header-text: #38bdf8;\n  --header-border: #283344;\n  --sticky-surface: #19202c;\n  --table-header: #151b26;\n  --table-group-header: #111620;\n  --row-divider: #1f2736;\n  --empty: #475569;\n  --risk-surface: #2b1115;\n  --risk-text: #fca5a5;\n  --risk-border: #5c1d24;\n  --chip-primary-bg: #0c2d48;\n  --chip-primary-text: #7dd3fc;\n  --chip-primary-border: #0369a1;\n  --chip-booster-bg: #063725;\n  --chip-booster-text: #6ee7b7;\n  --chip-booster-border: #047857;\n  --chip-flu-bg: #2e1047;\n  --chip-flu-text: #d8b4fe;\n  --chip-flu-border: #7c3aed;\n  --chip-single-bg: #3d2007;\n  --chip-single-text: #fde047;\n  --chip-single-border: #a16207;\n  --chip-scheme-bg: #1e293b;\n  --chip-scheme-text: #cbd5e1;\n  --chip-scheme-border: #475569;\n  --chip-risk-bg: #3e1015;\n  --chip-risk-text: #fca5a5;\n  --chip-risk-border: #991b1b;\n}\n.header-card,\n.notes-container,\n.status-card {\n  background: var(--surface-container);\n  border: 1px solid var(--outline-variant);\n  border-radius: 20px;\n}\n.header-card {\n  background: var(--header-surface);\n  border-color: var(--header-border);\n  display: flex;\n  gap: 24px;\n  justify-content: space-between;\n  margin-bottom: 24px;\n  padding: 28px 32px;\n}\nh1,\nh2,\nh3,\np {\n  margin: 0;\n}\n.header-copy h1 {\n  color: var(--header-text);\n  font-size: 1.85rem;\n  font-weight: 700;\n  letter-spacing: -.02em;\n}\n.header-copy p {\n  color: var(--on-surface-variant);\n  font-size: .95rem;\n  margin: 6px 0 16px;\n}\n.header-meta {\n  border-top: 1px solid var(--header-border);\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  padding-top: 14px;\n}\n.header-meta span {\n  background: var(--surface-container);\n  border: 1px solid var(--outline-variant);\n  border-radius: 999px;\n  color: var(--header-text);\n  font-size: .82rem;\n  font-weight: 500;\n  padding: 6px 14px;\n}\n.table-scrollbar-container {\n  align-items: center;\n  background: var(--surface-container);\n  border: 1px solid var(--outline-variant);\n  border-radius: 12px;\n  display: flex;\n  gap: 12px;\n  margin-bottom: 10px;\n  padding: 8px 14px;\n}\n.scrollbar-label {\n  color: var(--on-surface-variant);\n  flex: 0 0 auto;\n  font-size: .76rem;\n  font-weight: 600;\n}\n.top-scrollbar {\n  flex: 1;\n  height: 16px;\n  overflow-x: scroll;\n  overflow-y: hidden;\n}\n.top-scrollbar-content {\n  height: 1px;\n}\n.top-scrollbar::-webkit-scrollbar {\n  height: 10px;\n}\n.top-scrollbar::-webkit-scrollbar-track {\n  background: var(--surface-container-low);\n  border-radius: 99px;\n}\n.top-scrollbar::-webkit-scrollbar-thumb {\n  background: var(--outline);\n  border-radius: 99px;\n}\n.table-wrapper {\n  background: var(--surface-container);\n  border: 1px solid var(--outline-variant);\n  border-radius: 20px;\n  margin-bottom: 32px;\n  overflow-x: auto;\n  position: relative;\n}\ntable {\n  border-collapse: separate;\n  border-spacing: 0;\n  font-size: .8rem;\n  min-width: 1420px;\n  text-align: center;\n  width: 100%;\n}\nthead th {\n  background: var(--table-header);\n  border-bottom: 1px solid var(--outline-variant);\n  border-right: 1px solid var(--outline-variant);\n  color: var(--on-surface-variant);\n  font-size: .76rem;\n  font-weight: 500;\n  letter-spacing: .01em;\n  padding: 10px 6px;\n}\nthead th small {\n  display: block;\n  font-size: .7rem;\n  font-weight: 400;\n}\nthead .group-header {\n  background: var(--table-group-header);\n  border-bottom-color: var(--outline);\n  color: var(--on-surface);\n  font-size: .8rem;\n  font-weight: 700;\n  padding: 10px 8px;\n}\n.col-vaccine {\n  background: var(--sticky-surface);\n  border-right: 2px solid var(--outline-variant);\n  color: var(--on-surface);\n  font-weight: 500;\n  left: 0;\n  min-width: 220px;\n  padding: 12px 16px;\n  position: sticky;\n  text-align: left;\n  width: 220px;\n  z-index: 2;\n}\nthead .col-vaccine {\n  background: var(--table-group-header);\n  font-weight: 700;\n  z-index: 3;\n}\ntbody tr {\n  transition: background-color .15s ease;\n}\ntbody tr:hover {\n  background: color-mix(in srgb, var(--surface-container-high) 55%, transparent);\n}\ntbody td {\n  border-bottom: 1px solid var(--row-divider);\n  border-right: 1px solid var(--row-divider);\n  padding: 8px 4px;\n  vertical-align: middle;\n}\n.empty {\n  color: var(--empty);\n  font-size: .8rem;\n}\n.risk-separator td {\n  background: var(--risk-surface);\n  border-bottom: 1px solid var(--risk-border);\n  border-top: 1px solid var(--risk-border);\n  color: var(--risk-text);\n  font-size: .78rem;\n  font-weight: 700;\n  letter-spacing: .05em;\n  padding: 10px 16px;\n  text-align: left;\n  text-transform: uppercase;\n}\n.badge {\n  border: 1px solid;\n  border-radius: 8px;\n  display: inline-block;\n  font-size: .74rem;\n  font-weight: 500;\n  line-height: 1.25;\n  padding: 5px 9px;\n  white-space: normal;\n}\n.badge-span {\n  display: block;\n  margin: 0 auto;\n  padding: 7px 10px;\n  width: calc(100% - 10px);\n}\n.badge-reference {\n  appearance: none;\n  background: color-mix(in srgb, currentColor 10%, transparent);\n  border: 0;\n  border-radius: 4px;\n  color: inherit;\n  cursor: pointer;\n  display: inline-block;\n  font-family: inherit;\n  font-size: .68rem;\n  line-height: 1.1;\n  margin-inline-start: .35rem;\n  padding: 1px 3px;\n  text-decoration: none;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n.badge-reference:focus-visible,\n.ref-num:focus-visible {\n  outline: 2px solid currentColor;\n  outline-offset: 2px;\n}\n.badge-dosis_primaria {\n  background: var(--chip-primary-bg);\n  border-color: var(--chip-primary-border);\n  color: var(--chip-primary-text);\n}\n.badge-refuerzo {\n  background: var(--chip-booster-bg);\n  border-color: var(--chip-booster-border);\n  color: var(--chip-booster-text);\n}\n.badge-dosis_anual {\n  background: var(--chip-flu-bg);\n  border-color: var(--chip-flu-border);\n  color: var(--chip-flu-text);\n}\n.badge-dosis_unica {\n  background: var(--chip-single-bg);\n  border-color: var(--chip-single-border);\n  color: var(--chip-single-text);\n}\n.badge-esquema {\n  background: var(--chip-scheme-bg);\n  border-color: var(--chip-scheme-border);\n  color: var(--chip-scheme-text);\n}\n.badge-riesgo {\n  background: var(--chip-risk-bg);\n  border-color: var(--chip-risk-border);\n  color: var(--chip-risk-text);\n}\n.badge-default {\n  background: var(--surface-container-low);\n  border-color: var(--outline-variant);\n  color: var(--on-surface-variant);\n}\n.ref-num {\n  appearance: none;\n  background: transparent;\n  border: 0;\n  color: var(--header-text);\n  cursor: pointer;\n  font-family: inherit;\n  font-size: .7rem;\n  font-weight: 700;\n  margin-inline-start: .3rem;\n  padding: 0;\n  text-decoration: none;\n  vertical-align: super;\n}\n.reference-tooltip {\n  background: var(--surface-container-high);\n  border: 1px solid var(--outline);\n  border-radius: 10px;\n  box-sizing: border-box;\n  box-shadow: 0 8px 20px color-mix(in srgb, #0f172a 20%, transparent);\n  color: var(--on-surface);\n  font-size: .78rem;\n  font-weight: 400;\n  line-height: 1.4;\n  pointer-events: none;\n  padding: 10px 12px;\n  position: fixed;\n  text-align: left;\n  transform: translate(-50%, -100%);\n  width: min(300px, calc(100vw - 32px));\n  overflow-wrap: anywhere;\n  z-index: 100;\n}\n.reference-tooltip.is-below {\n  transform: translate(-50%, 0);\n}\n.reference-tooltip strong {\n  display: block;\n  font-size: .7rem;\n  letter-spacing: .02em;\n  margin-bottom: 3px;\n}\n.notes-container {\n  padding: 28px 32px;\n}\n.notes-container h2 {\n  border-bottom: 1px solid var(--outline-variant);\n  color: var(--on-surface);\n  font-size: 1.15rem;\n  font-weight: 700;\n  margin-bottom: 20px;\n  padding-bottom: 10px;\n}\n.notes-grid {\n  display: grid;\n  gap: 32px;\n  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));\n}\n.notes-grid h3 {\n  color: var(--on-surface);\n  font-size: .95rem;\n  font-weight: 700;\n  margin-bottom: 12px;\n}\n.notes-list {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.notes-list li {\n  border-left: 3px solid transparent;\n  border-radius: 0 8px 8px 0;\n  color: var(--on-surface-variant);\n  font-size: .82rem;\n  line-height: 1.45;\n  margin-bottom: 9px;\n  padding: 3px 8px;\n  scroll-margin-top: 24px;\n  transition: background-color .25s ease, border-color .25s ease;\n}\n.notes-list strong {\n  color: var(--on-surface);\n  font-weight: 600;\n  margin-right: 4px;\n}\n.status-card {\n  color: var(--on-surface-variant);\n  padding: 28px 32px;\n  text-align: center;\n}\n.status-error {\n  border-color: var(--risk-border);\n  color: var(--risk-text);\n}\n@media (max-width: 640px) {\n  .vaccination-calendar {\n    padding: 16px;\n  }\n  .header-card,\n  .notes-container {\n    border-radius: 16px;\n    padding: 22px 20px;\n  }\n  .header-card {\n    flex-direction: column-reverse;\n    gap: 16px;\n  }\n  .header-copy h1 {\n    font-size: 1.45rem;\n  }\n  .notes-grid {\n    grid-template-columns: 1fr;\n    gap: 24px;\n  }\n}\n/*# sourceMappingURL=calendario-vacunacion.component.css.map */\n'] }]
  }], null, { data: [{ type: Input, args: [{ isSignal: true, alias: "data", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VaccinationCalendarComponent, { className: "VaccinationCalendarComponent", filePath: "src/app/features/vaccination-calendar/calendario-vacunacion.component.ts", lineNumber: 47 });
})();
export {
  VaccinationCalendarComponent
};
//# debugId=748aa531-7633-5ab6-8b44-7dccbfb04c3f
//# sourceMappingURL=chunk-WFU5CXM3.js.map
