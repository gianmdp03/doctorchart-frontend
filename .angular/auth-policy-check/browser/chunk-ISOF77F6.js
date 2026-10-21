import {
  DatePickerComponent
} from "./chunk-6MFCUZUR.js";
import "./chunk-WMGV2OO2.js";
import {
  ActivePatientService
} from "./chunk-KDJQW6YV.js";
import {
  takeUntilDestroyed,
  toObservable
} from "./chunk-Y3XT3YWV.js";
import "./chunk-YTAXUAO7.js";
import "./chunk-QAJPJLTD.js";
import "./chunk-THOV7R4G.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
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
  NgIcon,
  lucideActivity,
  lucideAlertCircle,
  lucideArrowRight,
  lucideBaby,
  lucideCalculator,
  lucideCalendar,
  lucideCheck,
  lucideCheckCircle2,
  lucideChevronDown,
  lucideChevronUp,
  lucideCopy,
  lucideDroplets,
  lucideFilter,
  lucideFlaskConical,
  lucideHeart,
  lucideHistory,
  lucideInfo,
  lucidePill,
  lucidePlus,
  lucideRefreshCw,
  lucideRotateCcw,
  lucideSave,
  lucideSearch,
  lucideSettings,
  lucideShieldAlert,
  lucideSparkles,
  lucideStethoscope,
  lucideTrash2,
  lucideUser,
  lucideUserCheck,
  lucideWeight,
  lucideX,
  provideIcons
} from "./chunk-Z3UJ4PSI.js";
import "./chunk-WBCHXDEU.js";
import "./chunk-YAYJVLGH.js";
import {
  CommonModule,
  DatePipe,
  HttpClient,
  HttpParams,
  KeyValuePipe,
  NgComponentOutlet,
  UpperCasePipe,
  isPlatformBrowser
} from "./chunk-SYX7XZ26.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Injectable,
  Input,
  PLATFORM_ID,
  Subject,
  __spreadProps,
  __spreadValues,
  catchError,
  computed,
  effect,
  finalize,
  forkJoin,
  inject,
  input,
  map,
  of,
  setClassMetadata,
  signal,
  switchMap,
  takeUntil,
  timer,
  untracked,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-3HO5VEWU.js";

// src/app/features/medical-calculators/calculators/bmi-calculator.component.ts
var BmiCalculatorForm = class {
  weightKg = signal(
    null,
    ...ngDevMode ? [{ debugName: "weightKg" }] : (
      /* istanbul ignore next */
      []
    )
  );
  heightCm = signal(
    null,
    ...ngDevMode ? [{ debugName: "heightCm" }] : (
      /* istanbul ignore next */
      []
    )
  );
  complete = computed(
    () => !!(this.weightKg() && this.heightCm() && this.weightKg() > 0 && this.heightCm() > 0),
    ...ngDevMode ? [{ debugName: "complete" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inputs = computed(
    () => ({
      weightKg: this.weightKg(),
      heightCm: this.heightCm()
    }),
    ...ngDevMode ? [{ debugName: "inputs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reset() {
    this.weightKg.set(null);
    this.heightCm.set(null);
  }
  autofill(context) {
    const { weight, height } = context;
    const filledParams = [], missingParams = [];
    if (weight != null && weight > 0) {
      this.weightKg.set(weight);
      filledParams.push(`Peso: ${weight} kg`);
    } else {
      this.weightKg.set(null);
      missingParams.push("Peso");
    }
    if (height != null && height > 0) {
      this.heightCm.set(height);
      filledParams.push(`Talla: ${height} cm`);
    } else {
      this.heightCm.set(null);
      missingParams.push("Talla");
    }
    return { filledParams, missingParams };
  }
};
function summarizeBmiInputs(inputs) {
  const number = (key) => inputs[key];
  return { "Peso (kg)": number("weightKg"), "Talla (cm)": number("heightCm") };
}
var BmiCalculatorComponent = class _BmiCalculatorComponent {
  form = input.required(
    ...ngDevMode ? [{ debugName: "form" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function BmiCalculatorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BmiCalculatorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BmiCalculatorComponent, selectors: [["app-bmi-calculator"]], inputs: { form: [1, "form"] }, decls: 20, vars: 6, consts: [[1, "form-field-group"], ["for", "bmiWeightInput", 1, "form-label"], [1, "text-xs", "text-rose-500", "font-semibold"], [1, "input-with-addon"], ["id", "bmiWeightInput", "type", "number", "step", "0.1", "min", "1", "max", "500", "placeholder", "Ej. 70", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "input-addon"], ["for", "bmiHeightInput", 1, "form-label"], ["id", "bmiHeightInput", "type", "number", "step", "0.5", "min", "30", "max", "250", "placeholder", "Ej. 175", 1, "form-input", 3, "ngModelChange", "ngModel"]], template: function BmiCalculatorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "label", 1)(2, "span");
      \u0275\u0275text(3, "Peso Corporal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span", 2);
      \u0275\u0275text(5, "* Requerido");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 3)(7, "input", 4);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function BmiCalculatorComponent_Template_input_ngModelChange_7_listener($event) {
        return ctx.form().weightKg.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span", 5);
      \u0275\u0275text(9, "kg");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 0)(11, "label", 6)(12, "span");
      \u0275\u0275text(13, "Talla / Altura");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 2);
      \u0275\u0275text(15, "* Requerido");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 3)(17, "input", 7);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function BmiCalculatorComponent_Template_input_ngModelChange_17_listener($event) {
        return ctx.form().heightCm.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "span", 5);
      \u0275\u0275text(19, "cm");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275classProp("border-rose-400", !ctx.form().weightKg());
      \u0275\u0275property("ngModel", ctx.form().weightKg());
      \u0275\u0275control();
      \u0275\u0275advance(10);
      \u0275\u0275classProp("border-rose-400", !ctx.form().heightCm());
      \u0275\u0275property("ngModel", ctx.form().heightCm());
      \u0275\u0275control();
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel], styles: ["\n[_nghost-%COMP%] {\n  display: contents;\n}\n.field-hint[_ngcontent-%COMP%] {\n  font-size: 0.725rem;\n  color: #64748b;\n}\n/*# sourceMappingURL=calculator-form.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BmiCalculatorComponent, [{
    type: Component,
    args: [{ selector: "app-bmi-calculator", imports: [FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: '<div class="form-field-group">\n  <label for="bmiWeightInput" class="form-label">\n    <span>Peso Corporal</span>\n    <span class="text-xs text-rose-500 font-semibold">* Requerido</span>\n  </label>\n  <div class="input-with-addon">\n    <input\n      id="bmiWeightInput"\n      type="number"\n      step="0.1"\n      min="1"\n      max="500"\n      placeholder="Ej. 70"\n      class="form-input"\n      [class.border-rose-400]="!form().weightKg()"\n      [ngModel]="form().weightKg()"\n      (ngModelChange)="form().weightKg.set($event)"\n    />\n    <span class="input-addon">kg</span>\n  </div>\n</div>\n\n<div class="form-field-group">\n  <label for="bmiHeightInput" class="form-label">\n    <span>Talla / Altura</span>\n    <span class="text-xs text-rose-500 font-semibold">* Requerido</span>\n  </label>\n  <div class="input-with-addon">\n    <input\n      id="bmiHeightInput"\n      type="number"\n      step="0.5"\n      min="30"\n      max="250"\n      placeholder="Ej. 175"\n      class="form-input"\n      [class.border-rose-400]="!form().heightCm()"\n      [ngModel]="form().heightCm()"\n      (ngModelChange)="form().heightCm.set($event)"\n    />\n    <span class="input-addon">cm</span>\n  </div>\n</div>\n', styles: ["/* src/app/features/medical-calculators/calculators/calculator-form.css */\n:host {\n  display: contents;\n}\n.field-hint {\n  font-size: 0.725rem;\n  color: #64748b;\n}\n/*# sourceMappingURL=calculator-form.css.map */\n"] }]
  }], null, { form: [{ type: Input, args: [{ isSignal: true, alias: "form", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BmiCalculatorComponent, { className: "BmiCalculatorComponent", filePath: "src/app/features/medical-calculators/calculators/bmi-calculator.component.ts", lineNumber: 61 });
})();

// src/app/features/medical-calculators/calculators/tfge-calculator.component.ts
var TfgeCalculatorForm = class {
  creatinineMgDl = signal(
    null,
    ...ngDevMode ? [{ debugName: "creatinineMgDl" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ageYears = signal(
    null,
    ...ngDevMode ? [{ debugName: "ageYears" }] : (
      /* istanbul ignore next */
      []
    )
  );
  gender = signal(
    "MALE",
    ...ngDevMode ? [{ debugName: "gender" }] : (
      /* istanbul ignore next */
      []
    )
  );
  complete = computed(
    () => !!(this.creatinineMgDl() && this.ageYears() && this.creatinineMgDl() > 0 && this.ageYears() > 0),
    ...ngDevMode ? [{ debugName: "complete" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inputs = computed(
    () => ({
      creatinineMgDl: this.creatinineMgDl(),
      ageYears: this.ageYears(),
      gender: this.gender()
    }),
    ...ngDevMode ? [{ debugName: "inputs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reset() {
    this.creatinineMgDl.set(null);
    this.ageYears.set(null);
    this.gender.set("MALE");
  }
  autofill(context) {
    const { age, gender, creatinine } = context;
    const filledParams = [], missingParams = [];
    if (creatinine != null && creatinine > 0) {
      this.creatinineMgDl.set(creatinine);
      filledParams.push(`Creatinina: ${creatinine} mg/dL`);
    } else {
      this.creatinineMgDl.set(null);
      missingParams.push("Creatinina s\xE9rica");
    }
    if (age != null && age > 0) {
      this.ageYears.set(age);
      filledParams.push(`Edad: ${age} a\xF1os`);
    } else {
      this.ageYears.set(null);
      missingParams.push("Edad");
    }
    if (gender) {
      this.gender.set(gender);
      filledParams.push(`Sexo: ${gender === "FEMALE" ? "Femenino" : "Masculino"}`);
    }
    return { filledParams, missingParams };
  }
};
function summarizeTfgeInputs(inputs) {
  const number = (key) => inputs[key];
  const sex = () => inputs["gender"] === "FEMALE" ? "Femenino" : "Masculino";
  return {
    "Creatinina (mg/dL)": number("creatinineMgDl"),
    "Edad (a\xF1os)": number("ageYears"),
    Sexo: sex()
  };
}
var TfgeCalculatorComponent = class _TfgeCalculatorComponent {
  form = input.required(
    ...ngDevMode ? [{ debugName: "form" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function TfgeCalculatorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TfgeCalculatorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TfgeCalculatorComponent, selectors: [["app-tfge-calculator"]], inputs: { form: [1, "form"] }, decls: 28, vars: 10, consts: [[1, "form-field-group"], ["for", "tfgeCreatinineInput", 1, "form-label"], [1, "text-xs", "text-rose-500", "font-semibold"], [1, "input-with-addon"], ["id", "tfgeCreatinineInput", "type", "number", "step", "0.05", "min", "0.1", "max", "25", "placeholder", "Ej. 1.0", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "input-addon"], ["for", "tfgeAgeInput", 1, "form-label"], ["id", "tfgeAgeInput", "type", "number", "step", "1", "min", "18", "max", "120", "placeholder", "Ej. 55", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "form-label"], [1, "radio-pill-group"], ["type", "button", 1, "radio-pill-btn", 3, "click"]], template: function TfgeCalculatorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "label", 1)(2, "span");
      \u0275\u0275text(3, "Creatinina S\xE9rica");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span", 2);
      \u0275\u0275text(5, "* Requerido");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 3)(7, "input", 4);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function TfgeCalculatorComponent_Template_input_ngModelChange_7_listener($event) {
        return ctx.form().creatinineMgDl.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span", 5);
      \u0275\u0275text(9, "mg/dL");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 0)(11, "label", 6)(12, "span");
      \u0275\u0275text(13, "Edad del Paciente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 2);
      \u0275\u0275text(15, "* Requerido");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 3)(17, "input", 7);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function TfgeCalculatorComponent_Template_input_ngModelChange_17_listener($event) {
        return ctx.form().ageYears.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "span", 5);
      \u0275\u0275text(19, "a\xF1os");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "div", 0)(21, "label", 8);
      \u0275\u0275text(22, "Sexo Biol\xF3gico");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div", 9)(24, "button", 10);
      \u0275\u0275listener("click", function TfgeCalculatorComponent_Template_button_click_24_listener() {
        return ctx.form().gender.set("MALE");
      });
      \u0275\u0275text(25, " Masculino ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "button", 10);
      \u0275\u0275listener("click", function TfgeCalculatorComponent_Template_button_click_26_listener() {
        return ctx.form().gender.set("FEMALE");
      });
      \u0275\u0275text(27, " Femenino ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275classProp("border-rose-400", !ctx.form().creatinineMgDl());
      \u0275\u0275property("ngModel", ctx.form().creatinineMgDl());
      \u0275\u0275control();
      \u0275\u0275advance(10);
      \u0275\u0275classProp("border-rose-400", !ctx.form().ageYears());
      \u0275\u0275property("ngModel", ctx.form().ageYears());
      \u0275\u0275control();
      \u0275\u0275advance(7);
      \u0275\u0275classProp("active", ctx.form().gender() === "MALE");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.form().gender() === "FEMALE");
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel], styles: ["\n[_nghost-%COMP%] {\n  display: contents;\n}\n.field-hint[_ngcontent-%COMP%] {\n  font-size: 0.725rem;\n  color: #64748b;\n}\n/*# sourceMappingURL=calculator-form.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TfgeCalculatorComponent, [{
    type: Component,
    args: [{ selector: "app-tfge-calculator", imports: [FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="form-field-group">
  <label for="tfgeCreatinineInput" class="form-label">
    <span>Creatinina S\xE9rica</span>
    <span class="text-xs text-rose-500 font-semibold">* Requerido</span>
  </label>
  <div class="input-with-addon">
    <input
      id="tfgeCreatinineInput"
      type="number"
      step="0.05"
      min="0.1"
      max="25"
      placeholder="Ej. 1.0"
      class="form-input"
      [class.border-rose-400]="!form().creatinineMgDl()"
      [ngModel]="form().creatinineMgDl()"
      (ngModelChange)="form().creatinineMgDl.set($event)"
    />
    <span class="input-addon">mg/dL</span>
  </div>
</div>

<div class="form-field-group">
  <label for="tfgeAgeInput" class="form-label">
    <span>Edad del Paciente</span>
    <span class="text-xs text-rose-500 font-semibold">* Requerido</span>
  </label>
  <div class="input-with-addon">
    <input
      id="tfgeAgeInput"
      type="number"
      step="1"
      min="18"
      max="120"
      placeholder="Ej. 55"
      class="form-input"
      [class.border-rose-400]="!form().ageYears()"
      [ngModel]="form().ageYears()"
      (ngModelChange)="form().ageYears.set($event)"
    />
    <span class="input-addon">a\xF1os</span>
  </div>
</div>

<div class="form-field-group">
  <label class="form-label">Sexo Biol\xF3gico</label>
  <div class="radio-pill-group">
    <button
      type="button"
      class="radio-pill-btn"
      [class.active]="form().gender() === 'MALE'"
      (click)="form().gender.set('MALE')"
    >
      Masculino
    </button>
    <button
      type="button"
      class="radio-pill-btn"
      [class.active]="form().gender() === 'FEMALE'"
      (click)="form().gender.set('FEMALE')"
    >
      Femenino
    </button>
  </div>
</div>
`, styles: ["/* src/app/features/medical-calculators/calculators/calculator-form.css */\n:host {\n  display: contents;\n}\n.field-hint {\n  font-size: 0.725rem;\n  color: #64748b;\n}\n/*# sourceMappingURL=calculator-form.css.map */\n"] }]
  }], null, { form: [{ type: Input, args: [{ isSignal: true, alias: "form", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TfgeCalculatorComponent, { className: "TfgeCalculatorComponent", filePath: "src/app/features/medical-calculators/calculators/tfge-calculator.component.ts", lineNumber: 80 });
})();

// src/app/features/medical-calculators/calculators/cockcroft-calculator.component.ts
var CockcroftCalculatorForm = class {
  weightKg = signal(
    null,
    ...ngDevMode ? [{ debugName: "weightKg" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ageYears = signal(
    null,
    ...ngDevMode ? [{ debugName: "ageYears" }] : (
      /* istanbul ignore next */
      []
    )
  );
  creatinineMgDl = signal(
    null,
    ...ngDevMode ? [{ debugName: "creatinineMgDl" }] : (
      /* istanbul ignore next */
      []
    )
  );
  gender = signal(
    "MALE",
    ...ngDevMode ? [{ debugName: "gender" }] : (
      /* istanbul ignore next */
      []
    )
  );
  complete = computed(
    () => !!(this.weightKg() && this.ageYears() && this.creatinineMgDl() && this.weightKg() > 0 && this.ageYears() > 0 && this.creatinineMgDl() > 0),
    ...ngDevMode ? [{ debugName: "complete" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inputs = computed(
    () => ({
      weightKg: this.weightKg(),
      ageYears: this.ageYears(),
      creatinineMgDl: this.creatinineMgDl(),
      gender: this.gender()
    }),
    ...ngDevMode ? [{ debugName: "inputs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reset() {
    this.weightKg.set(null);
    this.ageYears.set(null);
    this.creatinineMgDl.set(null);
    this.gender.set("MALE");
  }
  autofill(context) {
    const { age, gender, weight, creatinine } = context;
    const filledParams = [], missingParams = [];
    if (weight != null && weight > 0) {
      this.weightKg.set(weight);
      filledParams.push(`Peso: ${weight} kg`);
    } else {
      this.weightKg.set(null);
      missingParams.push("Peso");
    }
    if (age != null && age > 0) {
      this.ageYears.set(age);
      filledParams.push(`Edad: ${age} a\xF1os`);
    } else {
      this.ageYears.set(null);
      missingParams.push("Edad");
    }
    if (creatinine != null && creatinine > 0) {
      this.creatinineMgDl.set(creatinine);
      filledParams.push(`Creatinina: ${creatinine} mg/dL`);
    } else {
      this.creatinineMgDl.set(null);
      missingParams.push("Creatinina s\xE9rica");
    }
    if (gender) {
      this.gender.set(gender);
      filledParams.push(`Sexo: ${gender === "FEMALE" ? "Femenino" : "Masculino"}`);
    }
    return { filledParams, missingParams };
  }
};
function summarizeCockcroftInputs(inputs) {
  const number = (key) => inputs[key];
  const sex = () => inputs["gender"] === "FEMALE" ? "Femenino" : "Masculino";
  return {
    "Peso (kg)": number("weightKg"),
    "Edad (a\xF1os)": number("ageYears"),
    "Creatinina (mg/dL)": number("creatinineMgDl"),
    Sexo: sex()
  };
}
var CockcroftCalculatorComponent = class _CockcroftCalculatorComponent {
  form = input.required(
    ...ngDevMode ? [{ debugName: "form" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function CockcroftCalculatorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CockcroftCalculatorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CockcroftCalculatorComponent, selectors: [["app-cockcroft-calculator"]], inputs: { form: [1, "form"] }, decls: 38, vars: 13, consts: [[1, "form-field-group"], ["for", "cockcroftWeightInput", 1, "form-label"], [1, "text-xs", "text-rose-500", "font-semibold"], [1, "input-with-addon"], ["id", "cockcroftWeightInput", "type", "number", "step", "0.5", "min", "10", "max", "300", "placeholder", "Ej. 70", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "input-addon"], ["for", "cockcroftAgeInput", 1, "form-label"], ["id", "cockcroftAgeInput", "type", "number", "step", "1", "min", "18", "max", "120", "placeholder", "Ej. 60", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "cockcroftCrInput", 1, "form-label"], ["id", "cockcroftCrInput", "type", "number", "step", "0.05", "min", "0.1", "max", "20", "placeholder", "Ej. 1.2", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "form-label"], [1, "radio-pill-group"], ["type", "button", 1, "radio-pill-btn", 3, "click"]], template: function CockcroftCalculatorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "label", 1)(2, "span");
      \u0275\u0275text(3, "Peso Actual");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span", 2);
      \u0275\u0275text(5, "* Requerido");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 3)(7, "input", 4);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function CockcroftCalculatorComponent_Template_input_ngModelChange_7_listener($event) {
        return ctx.form().weightKg.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span", 5);
      \u0275\u0275text(9, "kg");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 0)(11, "label", 6)(12, "span");
      \u0275\u0275text(13, "Edad");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 2);
      \u0275\u0275text(15, "* Requerido");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 3)(17, "input", 7);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function CockcroftCalculatorComponent_Template_input_ngModelChange_17_listener($event) {
        return ctx.form().ageYears.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "span", 5);
      \u0275\u0275text(19, "a\xF1os");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "div", 0)(21, "label", 8)(22, "span");
      \u0275\u0275text(23, "Creatinina S\xE9rica");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "span", 2);
      \u0275\u0275text(25, "* Requerido");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div", 3)(27, "input", 9);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function CockcroftCalculatorComponent_Template_input_ngModelChange_27_listener($event) {
        return ctx.form().creatinineMgDl.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "span", 5);
      \u0275\u0275text(29, "mg/dL");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "div", 0)(31, "label", 10);
      \u0275\u0275text(32, "Sexo Biol\xF3gico");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "div", 11)(34, "button", 12);
      \u0275\u0275listener("click", function CockcroftCalculatorComponent_Template_button_click_34_listener() {
        return ctx.form().gender.set("MALE");
      });
      \u0275\u0275text(35, " Masculino (Factor 1.00) ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "button", 12);
      \u0275\u0275listener("click", function CockcroftCalculatorComponent_Template_button_click_36_listener() {
        return ctx.form().gender.set("FEMALE");
      });
      \u0275\u0275text(37, " Femenino (Factor 0.85) ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275classProp("border-rose-400", !ctx.form().weightKg());
      \u0275\u0275property("ngModel", ctx.form().weightKg());
      \u0275\u0275control();
      \u0275\u0275advance(10);
      \u0275\u0275classProp("border-rose-400", !ctx.form().ageYears());
      \u0275\u0275property("ngModel", ctx.form().ageYears());
      \u0275\u0275control();
      \u0275\u0275advance(10);
      \u0275\u0275classProp("border-rose-400", !ctx.form().creatinineMgDl());
      \u0275\u0275property("ngModel", ctx.form().creatinineMgDl());
      \u0275\u0275control();
      \u0275\u0275advance(7);
      \u0275\u0275classProp("active", ctx.form().gender() === "MALE");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.form().gender() === "FEMALE");
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel], styles: ["\n[_nghost-%COMP%] {\n  display: contents;\n}\n.field-hint[_ngcontent-%COMP%] {\n  font-size: 0.725rem;\n  color: #64748b;\n}\n/*# sourceMappingURL=calculator-form.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CockcroftCalculatorComponent, [{
    type: Component,
    args: [{ selector: "app-cockcroft-calculator", imports: [FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="form-field-group">
  <label for="cockcroftWeightInput" class="form-label">
    <span>Peso Actual</span>
    <span class="text-xs text-rose-500 font-semibold">* Requerido</span>
  </label>
  <div class="input-with-addon">
    <input
      id="cockcroftWeightInput"
      type="number"
      step="0.5"
      min="10"
      max="300"
      placeholder="Ej. 70"
      class="form-input"
      [class.border-rose-400]="!form().weightKg()"
      [ngModel]="form().weightKg()"
      (ngModelChange)="form().weightKg.set($event)"
    />
    <span class="input-addon">kg</span>
  </div>
</div>

<div class="form-field-group">
  <label for="cockcroftAgeInput" class="form-label">
    <span>Edad</span>
    <span class="text-xs text-rose-500 font-semibold">* Requerido</span>
  </label>
  <div class="input-with-addon">
    <input
      id="cockcroftAgeInput"
      type="number"
      step="1"
      min="18"
      max="120"
      placeholder="Ej. 60"
      class="form-input"
      [class.border-rose-400]="!form().ageYears()"
      [ngModel]="form().ageYears()"
      (ngModelChange)="form().ageYears.set($event)"
    />
    <span class="input-addon">a\xF1os</span>
  </div>
</div>

<div class="form-field-group">
  <label for="cockcroftCrInput" class="form-label">
    <span>Creatinina S\xE9rica</span>
    <span class="text-xs text-rose-500 font-semibold">* Requerido</span>
  </label>
  <div class="input-with-addon">
    <input
      id="cockcroftCrInput"
      type="number"
      step="0.05"
      min="0.1"
      max="20"
      placeholder="Ej. 1.2"
      class="form-input"
      [class.border-rose-400]="!form().creatinineMgDl()"
      [ngModel]="form().creatinineMgDl()"
      (ngModelChange)="form().creatinineMgDl.set($event)"
    />
    <span class="input-addon">mg/dL</span>
  </div>
</div>

<div class="form-field-group">
  <label class="form-label">Sexo Biol\xF3gico</label>
  <div class="radio-pill-group">
    <button
      type="button"
      class="radio-pill-btn"
      [class.active]="form().gender() === 'MALE'"
      (click)="form().gender.set('MALE')"
    >
      Masculino (Factor 1.00)
    </button>
    <button
      type="button"
      class="radio-pill-btn"
      [class.active]="form().gender() === 'FEMALE'"
      (click)="form().gender.set('FEMALE')"
    >
      Femenino (Factor 0.85)
    </button>
  </div>
</div>
`, styles: ["/* src/app/features/medical-calculators/calculators/calculator-form.css */\n:host {\n  display: contents;\n}\n.field-hint {\n  font-size: 0.725rem;\n  color: #64748b;\n}\n/*# sourceMappingURL=calculator-form.css.map */\n"] }]
  }], null, { form: [{ type: Input, args: [{ isSignal: true, alias: "form", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CockcroftCalculatorComponent, { className: "CockcroftCalculatorComponent", filePath: "src/app/features/medical-calculators/calculators/cockcroft-calculator.component.ts", lineNumber: 94 });
})();

// src/app/features/medical-calculators/calculators/chads-vasc-calculator.component.ts
var ChadsVascCalculatorForm = class {
  ageYears = signal(
    null,
    ...ngDevMode ? [{ debugName: "ageYears" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isFemale = signal(
    false,
    ...ngDevMode ? [{ debugName: "isFemale" }] : (
      /* istanbul ignore next */
      []
    )
  );
  congestiveHeartFailure = signal(
    false,
    ...ngDevMode ? [{ debugName: "congestiveHeartFailure" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hypertension = signal(
    false,
    ...ngDevMode ? [{ debugName: "hypertension" }] : (
      /* istanbul ignore next */
      []
    )
  );
  diabetes = signal(
    false,
    ...ngDevMode ? [{ debugName: "diabetes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  strokeOrTia = signal(
    false,
    ...ngDevMode ? [{ debugName: "strokeOrTia" }] : (
      /* istanbul ignore next */
      []
    )
  );
  vascularDisease = signal(
    false,
    ...ngDevMode ? [{ debugName: "vascularDisease" }] : (
      /* istanbul ignore next */
      []
    )
  );
  complete = computed(
    () => this.ageYears() !== null && this.ageYears() >= 0,
    ...ngDevMode ? [{ debugName: "complete" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inputs = computed(
    () => ({
      ageYears: this.ageYears(),
      isFemale: this.isFemale(),
      congestiveHeartFailure: this.congestiveHeartFailure(),
      hypertension: this.hypertension(),
      diabetes: this.diabetes(),
      strokeOrTia: this.strokeOrTia(),
      vascularDisease: this.vascularDisease()
    }),
    ...ngDevMode ? [{ debugName: "inputs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reset() {
    this.ageYears.set(null);
    this.isFemale.set(false);
    this.congestiveHeartFailure.set(false);
    this.hypertension.set(false);
    this.diabetes.set(false);
    this.strokeOrTia.set(false);
    this.vascularDisease.set(false);
  }
  autofill(context) {
    const { age, gender } = context;
    const filledParams = [], missingParams = [];
    if (age != null && age >= 0) {
      this.ageYears.set(age);
      filledParams.push(`Edad: ${age} a\xF1os`);
    } else {
      this.ageYears.set(null);
      missingParams.push("Edad");
    }
    if (gender) {
      this.isFemale.set(gender === "FEMALE");
      filledParams.push(`Sexo: ${gender === "FEMALE" ? "Femenino" : "Masculino"}`);
    }
    return { filledParams, missingParams };
  }
};
function summarizeChadsVascInputs(inputs) {
  const number = (key) => inputs[key];
  const flag = (key) => inputs[key];
  return {
    "Edad (a\xF1os)": number("ageYears"),
    "Sexo Femenino": flag("isFemale"),
    "Insuficiencia Card\xEDaca": flag("congestiveHeartFailure"),
    Hipertensi\u00F3n: flag("hypertension"),
    Diabetes: flag("diabetes"),
    "ACV previo / AIT": flag("strokeOrTia"),
    "Enfermedad Vascular": flag("vascularDisease")
  };
}
var ChadsVascCalculatorComponent = class _ChadsVascCalculatorComponent {
  form = input.required(
    ...ngDevMode ? [{ debugName: "form" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function ChadsVascCalculatorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChadsVascCalculatorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChadsVascCalculatorComponent, selectors: [["app-chads-vasc-calculator"]], inputs: { form: [1, "form"] }, decls: 53, vars: 9, consts: [[1, "form-field-group"], ["for", "chadsAgeInput", 1, "form-label"], [1, "text-xs", "text-rose-500", "font-semibold"], [1, "input-with-addon"], ["id", "chadsAgeInput", "type", "number", "step", "1", "min", "0", "max", "120", "placeholder", "Ej. 68", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "input-addon"], [1, "chads-checklist"], [1, "checkbox-tile"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "tile-content"], [1, "tile-title"], [1, "tile-desc"]], template: function ChadsVascCalculatorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "label", 1)(2, "span");
      \u0275\u0275text(3, "Edad del Paciente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span", 2);
      \u0275\u0275text(5, "* Requerido");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 3)(7, "input", 4);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function ChadsVascCalculatorComponent_Template_input_ngModelChange_7_listener($event) {
        return ctx.form().ageYears.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span", 5);
      \u0275\u0275text(9, "a\xF1os");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 6)(11, "label", 7)(12, "input", 8);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function ChadsVascCalculatorComponent_Template_input_ngModelChange_12_listener($event) {
        return ctx.form().isFemale.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 9)(14, "span", 10);
      \u0275\u0275text(15, "Sexo Biol\xF3gico Femenino (+1 pt)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "span", 11);
      \u0275\u0275text(17, "Aplica si la paciente tiene \u2265 1 otro factor de riesgo");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(18, "label", 7)(19, "input", 8);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function ChadsVascCalculatorComponent_Template_input_ngModelChange_19_listener($event) {
        return ctx.form().congestiveHeartFailure.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 9)(21, "span", 10);
      \u0275\u0275text(22, "Insuficiencia Card\xEDaca Congestiva (+1 pt)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "span", 11);
      \u0275\u0275text(24, "IC sintom\xE1tica o FEVI reducida \u2264 40%");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(25, "label", 7)(26, "input", 8);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function ChadsVascCalculatorComponent_Template_input_ngModelChange_26_listener($event) {
        return ctx.form().hypertension.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div", 9)(28, "span", 10);
      \u0275\u0275text(29, "Hipertensi\xF3n Arterial (+1 pt)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "span", 11);
      \u0275\u0275text(31, "PA sist\xF3lica persistente >140 o diast\xF3lica >90 mmHg o tratamiento antihipertensivo");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(32, "label", 7)(33, "input", 8);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function ChadsVascCalculatorComponent_Template_input_ngModelChange_33_listener($event) {
        return ctx.form().diabetes.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "div", 9)(35, "span", 10);
      \u0275\u0275text(36, "Diabetes Mellitus (+1 pt)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "span", 11);
      \u0275\u0275text(38, "Glucemia en ayunas >126 mg/dL o terapia hipoglucemiante/insulina");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(39, "label", 7)(40, "input", 8);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function ChadsVascCalculatorComponent_Template_input_ngModelChange_40_listener($event) {
        return ctx.form().strokeOrTia.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "div", 9)(42, "span", 10);
      \u0275\u0275text(43, "ACV / AIT / Tromboembolismo Previo (+2 pts)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "span", 11);
      \u0275\u0275text(45, "Accidente cerebrovascular isqu\xE9mico previo, ataque isqu\xE9mico transitorio o embolia arterial");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(46, "label", 7)(47, "input", 8);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function ChadsVascCalculatorComponent_Template_input_ngModelChange_47_listener($event) {
        return ctx.form().vascularDisease.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "div", 9)(49, "span", 10);
      \u0275\u0275text(50, "Enfermedad Vascular (+1 pt)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "span", 11);
      \u0275\u0275text(52, "Infarto agudo de miocardio previo, arteriopat\xEDa perif\xE9rica o placa a\xF3rtica compleja");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275classProp("border-rose-400", ctx.form().ageYears() === null);
      \u0275\u0275property("ngModel", ctx.form().ageYears());
      \u0275\u0275control();
      \u0275\u0275advance(5);
      \u0275\u0275property("ngModel", ctx.form().isFemale());
      \u0275\u0275control();
      \u0275\u0275advance(7);
      \u0275\u0275property("ngModel", ctx.form().congestiveHeartFailure());
      \u0275\u0275control();
      \u0275\u0275advance(7);
      \u0275\u0275property("ngModel", ctx.form().hypertension());
      \u0275\u0275control();
      \u0275\u0275advance(7);
      \u0275\u0275property("ngModel", ctx.form().diabetes());
      \u0275\u0275control();
      \u0275\u0275advance(7);
      \u0275\u0275property("ngModel", ctx.form().strokeOrTia());
      \u0275\u0275control();
      \u0275\u0275advance(7);
      \u0275\u0275property("ngModel", ctx.form().vascularDisease());
      \u0275\u0275control();
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel], styles: ["\n[_nghost-%COMP%] {\n  display: contents;\n}\n.field-hint[_ngcontent-%COMP%] {\n  font-size: 0.725rem;\n  color: #64748b;\n}\n/*# sourceMappingURL=calculator-form.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChadsVascCalculatorComponent, [{
    type: Component,
    args: [{ selector: "app-chads-vasc-calculator", imports: [FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: '<div class="form-field-group">\n  <label for="chadsAgeInput" class="form-label">\n    <span>Edad del Paciente</span>\n    <span class="text-xs text-rose-500 font-semibold">* Requerido</span>\n  </label>\n  <div class="input-with-addon">\n    <input\n      id="chadsAgeInput"\n      type="number"\n      step="1"\n      min="0"\n      max="120"\n      placeholder="Ej. 68"\n      class="form-input"\n      [class.border-rose-400]="form().ageYears() === null"\n      [ngModel]="form().ageYears()"\n      (ngModelChange)="form().ageYears.set($event)"\n    />\n    <span class="input-addon">a\xF1os</span>\n  </div>\n</div>\n\n<div class="chads-checklist">\n  <label class="checkbox-tile">\n    <input\n      type="checkbox"\n      [ngModel]="form().isFemale()"\n      (ngModelChange)="form().isFemale.set($event)"\n    />\n    <div class="tile-content">\n      <span class="tile-title">Sexo Biol\xF3gico Femenino (+1 pt)</span>\n      <span class="tile-desc">Aplica si la paciente tiene \u2265 1 otro factor de riesgo</span>\n    </div>\n  </label>\n\n  <label class="checkbox-tile">\n    <input\n      type="checkbox"\n      [ngModel]="form().congestiveHeartFailure()"\n      (ngModelChange)="form().congestiveHeartFailure.set($event)"\n    />\n    <div class="tile-content">\n      <span class="tile-title">Insuficiencia Card\xEDaca Congestiva (+1 pt)</span>\n      <span class="tile-desc">IC sintom\xE1tica o FEVI reducida \u2264 40%</span>\n    </div>\n  </label>\n\n  <label class="checkbox-tile">\n    <input\n      type="checkbox"\n      [ngModel]="form().hypertension()"\n      (ngModelChange)="form().hypertension.set($event)"\n    />\n    <div class="tile-content">\n      <span class="tile-title">Hipertensi\xF3n Arterial (+1 pt)</span>\n      <span class="tile-desc"\n        >PA sist\xF3lica persistente >140 o diast\xF3lica >90 mmHg o tratamiento antihipertensivo</span\n      >\n    </div>\n  </label>\n\n  <label class="checkbox-tile">\n    <input\n      type="checkbox"\n      [ngModel]="form().diabetes()"\n      (ngModelChange)="form().diabetes.set($event)"\n    />\n    <div class="tile-content">\n      <span class="tile-title">Diabetes Mellitus (+1 pt)</span>\n      <span class="tile-desc"\n        >Glucemia en ayunas >126 mg/dL o terapia hipoglucemiante/insulina</span\n      >\n    </div>\n  </label>\n\n  <label class="checkbox-tile">\n    <input\n      type="checkbox"\n      [ngModel]="form().strokeOrTia()"\n      (ngModelChange)="form().strokeOrTia.set($event)"\n    />\n    <div class="tile-content">\n      <span class="tile-title">ACV / AIT / Tromboembolismo Previo (+2 pts)</span>\n      <span class="tile-desc"\n        >Accidente cerebrovascular isqu\xE9mico previo, ataque isqu\xE9mico transitorio o embolia\n        arterial</span\n      >\n    </div>\n  </label>\n\n  <label class="checkbox-tile">\n    <input\n      type="checkbox"\n      [ngModel]="form().vascularDisease()"\n      (ngModelChange)="form().vascularDisease.set($event)"\n    />\n    <div class="tile-content">\n      <span class="tile-title">Enfermedad Vascular (+1 pt)</span>\n      <span class="tile-desc"\n        >Infarto agudo de miocardio previo, arteriopat\xEDa perif\xE9rica o placa a\xF3rtica compleja</span\n      >\n    </div>\n  </label>\n</div>\n', styles: ["/* src/app/features/medical-calculators/calculators/calculator-form.css */\n:host {\n  display: contents;\n}\n.field-hint {\n  font-size: 0.725rem;\n  color: #64748b;\n}\n/*# sourceMappingURL=calculator-form.css.map */\n"] }]
  }], null, { form: [{ type: Input, args: [{ isSignal: true, alias: "form", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChadsVascCalculatorComponent, { className: "ChadsVascCalculatorComponent", filePath: "src/app/features/medical-calculators/calculators/chads-vasc-calculator.component.ts", lineNumber: 79 });
})();

// src/app/features/medical-calculators/calculators/calcium-calculator.component.ts
var CalciumCalculatorForm = class {
  serumCalciumMgDl = signal(
    null,
    ...ngDevMode ? [{ debugName: "serumCalciumMgDl" }] : (
      /* istanbul ignore next */
      []
    )
  );
  serumAlbuminGDl = signal(
    null,
    ...ngDevMode ? [{ debugName: "serumAlbuminGDl" }] : (
      /* istanbul ignore next */
      []
    )
  );
  complete = computed(
    () => !!(this.serumCalciumMgDl() && this.serumAlbuminGDl() && this.serumCalciumMgDl() > 0 && this.serumAlbuminGDl() > 0),
    ...ngDevMode ? [{ debugName: "complete" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inputs = computed(
    () => ({
      serumCalciumMgDl: this.serumCalciumMgDl(),
      serumAlbuminGDl: this.serumAlbuminGDl()
    }),
    ...ngDevMode ? [{ debugName: "inputs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reset() {
    this.serumCalciumMgDl.set(null);
    this.serumAlbuminGDl.set(null);
  }
  autofill(context) {
    const { calcium, albumin } = context;
    const filledParams = [], missingParams = [];
    if (calcium != null && calcium > 0) {
      this.serumCalciumMgDl.set(calcium);
      filledParams.push(`Calcio: ${calcium} mg/dL`);
    } else {
      this.serumCalciumMgDl.set(null);
      missingParams.push("Calcio s\xE9rico");
    }
    if (albumin != null && albumin > 0) {
      this.serumAlbuminGDl.set(albumin);
      filledParams.push(`Alb\xFAmina: ${albumin} g/dL`);
    } else {
      this.serumAlbuminGDl.set(null);
      missingParams.push("Alb\xFAmina s\xE9rica");
    }
    return { filledParams, missingParams };
  }
};
function summarizeCalciumInputs(inputs) {
  const number = (key) => inputs[key];
  return {
    "Calcio S\xE9rico (mg/dL)": number("serumCalciumMgDl"),
    "Alb\xFAmina (g/dL)": number("serumAlbuminGDl")
  };
}
var CalciumCalculatorComponent = class _CalciumCalculatorComponent {
  form = input.required(
    ...ngDevMode ? [{ debugName: "form" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function CalciumCalculatorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CalciumCalculatorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CalciumCalculatorComponent, selectors: [["app-calcium-calculator"]], inputs: { form: [1, "form"] }, decls: 20, vars: 6, consts: [[1, "form-field-group"], ["for", "calciumValueInput", 1, "form-label"], [1, "text-xs", "text-rose-500", "font-semibold"], [1, "input-with-addon"], ["id", "calciumValueInput", "type", "number", "step", "0.1", "min", "2", "max", "20", "placeholder", "Ej. 8.2", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "input-addon"], ["for", "albuminValueInput", 1, "form-label"], ["id", "albuminValueInput", "type", "number", "step", "0.1", "min", "0.5", "max", "7", "placeholder", "Ej. 3.0", 1, "form-input", 3, "ngModelChange", "ngModel"]], template: function CalciumCalculatorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "label", 1)(2, "span");
      \u0275\u0275text(3, "Calcio Total Medido");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span", 2);
      \u0275\u0275text(5, "* Requerido");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 3)(7, "input", 4);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function CalciumCalculatorComponent_Template_input_ngModelChange_7_listener($event) {
        return ctx.form().serumCalciumMgDl.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span", 5);
      \u0275\u0275text(9, "mg/dL");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 0)(11, "label", 6)(12, "span");
      \u0275\u0275text(13, "Alb\xFAmina S\xE9rica");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 2);
      \u0275\u0275text(15, "* Requerido");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 3)(17, "input", 7);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function CalciumCalculatorComponent_Template_input_ngModelChange_17_listener($event) {
        return ctx.form().serumAlbuminGDl.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "span", 5);
      \u0275\u0275text(19, "g/dL");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275classProp("border-rose-400", !ctx.form().serumCalciumMgDl());
      \u0275\u0275property("ngModel", ctx.form().serumCalciumMgDl());
      \u0275\u0275control();
      \u0275\u0275advance(10);
      \u0275\u0275classProp("border-rose-400", !ctx.form().serumAlbuminGDl());
      \u0275\u0275property("ngModel", ctx.form().serumAlbuminGDl());
      \u0275\u0275control();
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel], styles: ["\n[_nghost-%COMP%] {\n  display: contents;\n}\n.field-hint[_ngcontent-%COMP%] {\n  font-size: 0.725rem;\n  color: #64748b;\n}\n/*# sourceMappingURL=calculator-form.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalciumCalculatorComponent, [{
    type: Component,
    args: [{ selector: "app-calcium-calculator", imports: [FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: '<div class="form-field-group">\n  <label for="calciumValueInput" class="form-label">\n    <span>Calcio Total Medido</span>\n    <span class="text-xs text-rose-500 font-semibold">* Requerido</span>\n  </label>\n  <div class="input-with-addon">\n    <input\n      id="calciumValueInput"\n      type="number"\n      step="0.1"\n      min="2"\n      max="20"\n      placeholder="Ej. 8.2"\n      class="form-input"\n      [class.border-rose-400]="!form().serumCalciumMgDl()"\n      [ngModel]="form().serumCalciumMgDl()"\n      (ngModelChange)="form().serumCalciumMgDl.set($event)"\n    />\n    <span class="input-addon">mg/dL</span>\n  </div>\n</div>\n\n<div class="form-field-group">\n  <label for="albuminValueInput" class="form-label">\n    <span>Alb\xFAmina S\xE9rica</span>\n    <span class="text-xs text-rose-500 font-semibold">* Requerido</span>\n  </label>\n  <div class="input-with-addon">\n    <input\n      id="albuminValueInput"\n      type="number"\n      step="0.1"\n      min="0.5"\n      max="7"\n      placeholder="Ej. 3.0"\n      class="form-input"\n      [class.border-rose-400]="!form().serumAlbuminGDl()"\n      [ngModel]="form().serumAlbuminGDl()"\n      (ngModelChange)="form().serumAlbuminGDl.set($event)"\n    />\n    <span class="input-addon">g/dL</span>\n  </div>\n</div>\n', styles: ["/* src/app/features/medical-calculators/calculators/calculator-form.css */\n:host {\n  display: contents;\n}\n.field-hint {\n  font-size: 0.725rem;\n  color: #64748b;\n}\n/*# sourceMappingURL=calculator-form.css.map */\n"] }]
  }], null, { form: [{ type: Input, args: [{ isSignal: true, alias: "form", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CalciumCalculatorComponent, { className: "CalciumCalculatorComponent", filePath: "src/app/features/medical-calculators/calculators/calcium-calculator.component.ts", lineNumber: 70 });
})();

// src/app/features/medical-calculators/calculators/holliday-segar-calculator.component.ts
var HollidaySegarCalculatorForm = class {
  weightKg = signal(
    null,
    ...ngDevMode ? [{ debugName: "weightKg" }] : (
      /* istanbul ignore next */
      []
    )
  );
  complete = computed(
    () => !!(this.weightKg() && this.weightKg() > 0),
    ...ngDevMode ? [{ debugName: "complete" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inputs = computed(
    () => ({
      weightKg: this.weightKg()
    }),
    ...ngDevMode ? [{ debugName: "inputs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reset() {
    this.weightKg.set(null);
  }
  autofill(context) {
    const { weight } = context;
    const filledParams = [], missingParams = [];
    if (weight != null && weight > 0) {
      this.weightKg.set(weight);
      filledParams.push(`Peso: ${weight} kg`);
    } else {
      this.weightKg.set(null);
      missingParams.push("Peso");
    }
    return { filledParams, missingParams };
  }
};
function summarizeHollidaySegarInputs(inputs) {
  const number = (key) => inputs[key];
  return { "Peso Pedi\xE1trico (kg)": number("weightKg") };
}
var HollidaySegarCalculatorComponent = class _HollidaySegarCalculatorComponent {
  form = input.required(
    ...ngDevMode ? [{ debugName: "form" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function HollidaySegarCalculatorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HollidaySegarCalculatorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HollidaySegarCalculatorComponent, selectors: [["app-holliday-segar-calculator"]], inputs: { form: [1, "form"] }, decls: 12, vars: 3, consts: [[1, "form-field-group"], ["for", "hollidayWeightInput", 1, "form-label"], [1, "text-xs", "text-rose-500", "font-semibold"], [1, "input-with-addon"], ["id", "hollidayWeightInput", "type", "number", "step", "0.1", "min", "0.5", "max", "150", "placeholder", "Ej. 14.5", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "input-addon"], [1, "field-hint"]], template: function HollidaySegarCalculatorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "label", 1)(2, "span");
      \u0275\u0275text(3, "Peso del Paciente Pedi\xE1trico");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span", 2);
      \u0275\u0275text(5, "* Requerido");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 3)(7, "input", 4);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function HollidaySegarCalculatorComponent_Template_input_ngModelChange_7_listener($event) {
        return ctx.form().weightKg.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span", 5);
      \u0275\u0275text(9, "kg");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "p", 6);
      \u0275\u0275text(11, " Aplica para ni\xF1os y adolescentes. Regla escalonada: 100 mL/kg (primeros 10kg), 50 mL/kg (10 a 20kg), y 20 mL/kg (>20kg). ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275classProp("border-rose-400", !ctx.form().weightKg());
      \u0275\u0275property("ngModel", ctx.form().weightKg());
      \u0275\u0275control();
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel], styles: ["\n[_nghost-%COMP%] {\n  display: contents;\n}\n.field-hint[_ngcontent-%COMP%] {\n  font-size: 0.725rem;\n  color: #64748b;\n}\n/*# sourceMappingURL=calculator-form.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HollidaySegarCalculatorComponent, [{
    type: Component,
    args: [{ selector: "app-holliday-segar-calculator", imports: [FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: '<div class="form-field-group">\n  <label for="hollidayWeightInput" class="form-label">\n    <span>Peso del Paciente Pedi\xE1trico</span>\n    <span class="text-xs text-rose-500 font-semibold">* Requerido</span>\n  </label>\n  <div class="input-with-addon">\n    <input\n      id="hollidayWeightInput"\n      type="number"\n      step="0.1"\n      min="0.5"\n      max="150"\n      placeholder="Ej. 14.5"\n      class="form-input"\n      [class.border-rose-400]="!form().weightKg()"\n      [ngModel]="form().weightKg()"\n      (ngModelChange)="form().weightKg.set($event)"\n    />\n    <span class="input-addon">kg</span>\n  </div>\n  <p class="field-hint">\n    Aplica para ni\xF1os y adolescentes. Regla escalonada: 100 mL/kg (primeros 10kg), 50 mL/kg (10 a\n    20kg), y 20 mL/kg (>20kg).\n  </p>\n</div>\n', styles: ["/* src/app/features/medical-calculators/calculators/calculator-form.css */\n:host {\n  display: contents;\n}\n.field-hint {\n  font-size: 0.725rem;\n  color: #64748b;\n}\n/*# sourceMappingURL=calculator-form.css.map */\n"] }]
  }], null, { form: [{ type: Input, args: [{ isSignal: true, alias: "form", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HollidaySegarCalculatorComponent, { className: "HollidaySegarCalculatorComponent", filePath: "src/app/features/medical-calculators/calculators/holliday-segar-calculator.component.ts", lineNumber: 50 });
})();

// src/app/features/medical-calculators/calculators/mosteller-calculator.component.ts
var MostellerCalculatorForm = class {
  weightKg = signal(
    null,
    ...ngDevMode ? [{ debugName: "weightKg" }] : (
      /* istanbul ignore next */
      []
    )
  );
  heightCm = signal(
    null,
    ...ngDevMode ? [{ debugName: "heightCm" }] : (
      /* istanbul ignore next */
      []
    )
  );
  complete = computed(
    () => !!(this.weightKg() && this.heightCm() && this.weightKg() > 0 && this.heightCm() > 0),
    ...ngDevMode ? [{ debugName: "complete" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inputs = computed(
    () => ({
      weightKg: this.weightKg(),
      heightCm: this.heightCm()
    }),
    ...ngDevMode ? [{ debugName: "inputs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reset() {
    this.weightKg.set(null);
    this.heightCm.set(null);
  }
  autofill(context) {
    const { weight, height } = context;
    const filledParams = [], missingParams = [];
    if (weight != null && weight > 0) {
      this.weightKg.set(weight);
      filledParams.push(`Peso: ${weight} kg`);
    } else {
      this.weightKg.set(null);
      missingParams.push("Peso");
    }
    if (height != null && height > 0) {
      this.heightCm.set(height);
      filledParams.push(`Talla: ${height} cm`);
    } else {
      this.heightCm.set(null);
      missingParams.push("Talla");
    }
    return { filledParams, missingParams };
  }
};
function summarizeMostellerInputs(inputs) {
  const number = (key) => inputs[key];
  return { "Peso (kg)": number("weightKg"), "Talla (cm)": number("heightCm") };
}
var MostellerCalculatorComponent = class _MostellerCalculatorComponent {
  form = input.required(
    ...ngDevMode ? [{ debugName: "form" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function MostellerCalculatorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MostellerCalculatorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MostellerCalculatorComponent, selectors: [["app-mosteller-calculator"]], inputs: { form: [1, "form"] }, decls: 20, vars: 6, consts: [[1, "form-field-group"], ["for", "bsaWeightInput", 1, "form-label"], [1, "text-xs", "text-rose-500", "font-semibold"], [1, "input-with-addon"], ["id", "bsaWeightInput", "type", "number", "step", "0.1", "min", "0.5", "max", "300", "placeholder", "Ej. 18.0", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "input-addon"], ["for", "bsaHeightInput", 1, "form-label"], ["id", "bsaHeightInput", "type", "number", "step", "0.5", "min", "20", "max", "250", "placeholder", "Ej. 110", 1, "form-input", 3, "ngModelChange", "ngModel"]], template: function MostellerCalculatorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "label", 1)(2, "span");
      \u0275\u0275text(3, "Peso");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span", 2);
      \u0275\u0275text(5, "* Requerido");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 3)(7, "input", 4);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function MostellerCalculatorComponent_Template_input_ngModelChange_7_listener($event) {
        return ctx.form().weightKg.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span", 5);
      \u0275\u0275text(9, "kg");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 0)(11, "label", 6)(12, "span");
      \u0275\u0275text(13, "Talla / Longitud");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 2);
      \u0275\u0275text(15, "* Requerido");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 3)(17, "input", 7);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function MostellerCalculatorComponent_Template_input_ngModelChange_17_listener($event) {
        return ctx.form().heightCm.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "span", 5);
      \u0275\u0275text(19, "cm");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275classProp("border-rose-400", !ctx.form().weightKg());
      \u0275\u0275property("ngModel", ctx.form().weightKg());
      \u0275\u0275control();
      \u0275\u0275advance(10);
      \u0275\u0275classProp("border-rose-400", !ctx.form().heightCm());
      \u0275\u0275property("ngModel", ctx.form().heightCm());
      \u0275\u0275control();
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel], styles: ["\n[_nghost-%COMP%] {\n  display: contents;\n}\n.field-hint[_ngcontent-%COMP%] {\n  font-size: 0.725rem;\n  color: #64748b;\n}\n/*# sourceMappingURL=calculator-form.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MostellerCalculatorComponent, [{
    type: Component,
    args: [{ selector: "app-mosteller-calculator", imports: [FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: '<div class="form-field-group">\n  <label for="bsaWeightInput" class="form-label">\n    <span>Peso</span>\n    <span class="text-xs text-rose-500 font-semibold">* Requerido</span>\n  </label>\n  <div class="input-with-addon">\n    <input\n      id="bsaWeightInput"\n      type="number"\n      step="0.1"\n      min="0.5"\n      max="300"\n      placeholder="Ej. 18.0"\n      class="form-input"\n      [class.border-rose-400]="!form().weightKg()"\n      [ngModel]="form().weightKg()"\n      (ngModelChange)="form().weightKg.set($event)"\n    />\n    <span class="input-addon">kg</span>\n  </div>\n</div>\n\n<div class="form-field-group">\n  <label for="bsaHeightInput" class="form-label">\n    <span>Talla / Longitud</span>\n    <span class="text-xs text-rose-500 font-semibold">* Requerido</span>\n  </label>\n  <div class="input-with-addon">\n    <input\n      id="bsaHeightInput"\n      type="number"\n      step="0.5"\n      min="20"\n      max="250"\n      placeholder="Ej. 110"\n      class="form-input"\n      [class.border-rose-400]="!form().heightCm()"\n      [ngModel]="form().heightCm()"\n      (ngModelChange)="form().heightCm.set($event)"\n    />\n    <span class="input-addon">cm</span>\n  </div>\n</div>\n', styles: ["/* src/app/features/medical-calculators/calculators/calculator-form.css */\n:host {\n  display: contents;\n}\n.field-hint {\n  font-size: 0.725rem;\n  color: #64748b;\n}\n/*# sourceMappingURL=calculator-form.css.map */\n"] }]
  }], null, { form: [{ type: Input, args: [{ isSignal: true, alias: "form", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MostellerCalculatorComponent, { className: "MostellerCalculatorComponent", filePath: "src/app/features/medical-calculators/calculators/mosteller-calculator.component.ts", lineNumber: 61 });
})();

// src/app/features/medical-calculators/calculators/pediatric-dosage-calculator.component.ts
var PediatricDosageCalculatorForm = class {
  weightKg = signal(
    null,
    ...ngDevMode ? [{ debugName: "weightKg" }] : (
      /* istanbul ignore next */
      []
    )
  );
  targetDoseMgKg = signal(
    null,
    ...ngDevMode ? [{ debugName: "targetDoseMgKg" }] : (
      /* istanbul ignore next */
      []
    )
  );
  doseUnit = signal(
    "mg/kg/dia",
    ...ngDevMode ? [{ debugName: "doseUnit" }] : (
      /* istanbul ignore next */
      []
    )
  );
  drugConcentrationMg = signal(
    null,
    ...ngDevMode ? [{ debugName: "drugConcentrationMg" }] : (
      /* istanbul ignore next */
      []
    )
  );
  drugConcentrationMl = signal(
    null,
    ...ngDevMode ? [{ debugName: "drugConcentrationMl" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dosesPerDay = signal(
    3,
    ...ngDevMode ? [{ debugName: "dosesPerDay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  complete = computed(
    () => !!(this.weightKg() && this.targetDoseMgKg() && this.drugConcentrationMg() && this.drugConcentrationMl() && this.dosesPerDay() && this.weightKg() > 0 && this.targetDoseMgKg() > 0 && this.drugConcentrationMg() > 0 && this.drugConcentrationMl() > 0 && this.dosesPerDay() > 0),
    ...ngDevMode ? [{ debugName: "complete" }] : (
      /* istanbul ignore next */
      []
    )
  );
  inputs = computed(
    () => ({
      weightKg: this.weightKg(),
      targetDoseMgKg: this.targetDoseMgKg(),
      doseUnit: this.doseUnit(),
      drugConcentrationMg: this.drugConcentrationMg(),
      drugConcentrationMl: this.drugConcentrationMl(),
      dosesPerDay: this.dosesPerDay()
    }),
    ...ngDevMode ? [{ debugName: "inputs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  reset() {
    this.weightKg.set(null);
    this.targetDoseMgKg.set(null);
    this.drugConcentrationMg.set(null);
    this.drugConcentrationMl.set(null);
  }
  autofill(context) {
    const { weight } = context;
    const filledParams = [], missingParams = [];
    if (weight != null && weight > 0) {
      this.weightKg.set(weight);
      filledParams.push(`Peso: ${weight} kg`);
    } else {
      this.weightKg.set(null);
      missingParams.push("Peso");
    }
    missingParams.push("Dosis objetivo y concentraci\xF3n del f\xE1rmaco");
    return { filledParams, missingParams };
  }
};
function summarizePediatricDosageInputs(inputs) {
  const number = (key) => inputs[key];
  return {
    "Peso (kg)": number("weightKg"),
    "Dosis objetivo": `${inputs["targetDoseMgKg"]} ${inputs["doseUnit"]}`,
    Concentraci\u00F3n: `${inputs["drugConcentrationMg"]} mg / ${inputs["drugConcentrationMl"]} mL`,
    Frecuencia: `${inputs["dosesPerDay"]} veces al d\xEDa`
  };
}
var PediatricDosageCalculatorComponent = class _PediatricDosageCalculatorComponent {
  form = input.required(
    ...ngDevMode ? [{ debugName: "form" }] : (
      /* istanbul ignore next */
      []
    )
  );
  static \u0275fac = function PediatricDosageCalculatorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PediatricDosageCalculatorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PediatricDosageCalculatorComponent, selectors: [["app-pediatric-dosage-calculator"]], inputs: { form: [1, "form"] }, decls: 55, vars: 21, consts: [[1, "form-field-group"], ["for", "pedWeightInput", 1, "form-label"], [1, "text-xs", "text-rose-500", "font-semibold"], [1, "input-with-addon"], ["id", "pedWeightInput", "type", "number", "step", "0.1", "min", "0.5", "max", "150", "placeholder", "Ej. 12.0", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "input-addon"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-3"], ["for", "pedTargetDoseInput", 1, "form-label"], ["id", "pedTargetDoseInput", "type", "number", "step", "0.5", "min", "0.1", "placeholder", "Ej. 50", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "form-label"], [1, "radio-pill-group"], ["type", "button", 1, "radio-pill-btn", "text-xs", 3, "click"], [1, "flex", "items-center", "gap-2"], [1, "input-with-addon", "flex-1"], ["type", "number", "step", "5", "min", "1", "placeholder", "Ej. 250", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "font-bold", "text-slate-400"], ["type", "number", "step", "1", "min", "0.5", "placeholder", "Ej. 5", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "pedDosesPerDaySelect", 1, "form-label"], ["id", "pedDosesPerDaySelect", 1, "form-input", 3, "ngModelChange", "ngModel"], [3, "value"]], template: function PediatricDosageCalculatorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "label", 1)(2, "span");
      \u0275\u0275text(3, "Peso del Paciente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span", 2);
      \u0275\u0275text(5, "* Requerido");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 3)(7, "input", 4);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function PediatricDosageCalculatorComponent_Template_input_ngModelChange_7_listener($event) {
        return ctx.form().weightKg.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "span", 5);
      \u0275\u0275text(9, "kg");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 6)(11, "div", 0)(12, "label", 7)(13, "span");
      \u0275\u0275text(14, "Dosis Objetivo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "span", 2);
      \u0275\u0275text(16, "* Requerido");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "input", 8);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function PediatricDosageCalculatorComponent_Template_input_ngModelChange_17_listener($event) {
        return ctx.form().targetDoseMgKg.set($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 0)(19, "label", 9);
      \u0275\u0275text(20, "Unidad de Dosificaci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div", 10)(22, "button", 11);
      \u0275\u0275listener("click", function PediatricDosageCalculatorComponent_Template_button_click_22_listener() {
        return ctx.form().doseUnit.set("mg/kg/dia");
      });
      \u0275\u0275text(23, " mg/kg/d\xEDa ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "button", 11);
      \u0275\u0275listener("click", function PediatricDosageCalculatorComponent_Template_button_click_24_listener() {
        return ctx.form().doseUnit.set("mg/kg/dosis");
      });
      \u0275\u0275text(25, " mg/kg/dosis ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(26, "div", 0)(27, "label", 9)(28, "span");
      \u0275\u0275text(29, "Concentraci\xF3n del F\xE1rmaco (Suspensi\xF3n / Jarabe)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "span", 2);
      \u0275\u0275text(31, "* Requerido");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 12)(33, "div", 13)(34, "input", 14);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function PediatricDosageCalculatorComponent_Template_input_ngModelChange_34_listener($event) {
        return ctx.form().drugConcentrationMg.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "span", 5);
      \u0275\u0275text(36, "mg");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "span", 15);
      \u0275\u0275text(38, "/");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "div", 13)(40, "input", 16);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function PediatricDosageCalculatorComponent_Template_input_ngModelChange_40_listener($event) {
        return ctx.form().drugConcentrationMl.set($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "span", 5);
      \u0275\u0275text(42, "mL");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(43, "div", 0)(44, "label", 17);
      \u0275\u0275text(45, "Frecuencia / Tomas Diarias");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "select", 18);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function PediatricDosageCalculatorComponent_Template_select_ngModelChange_46_listener($event) {
        return ctx.form().dosesPerDay.set(+$event);
      });
      \u0275\u0275elementStart(47, "option", 19);
      \u0275\u0275text(48, "1 toma al d\xEDa (Cada 24 horas)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "option", 19);
      \u0275\u0275text(50, "2 tomas al d\xEDa (Cada 12 horas)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "option", 19);
      \u0275\u0275text(52, "3 tomas al d\xEDa (Cada 8 horas)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "option", 19);
      \u0275\u0275text(54, "4 tomas al d\xEDa (Cada 6 horas)");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275classProp("border-rose-400", !ctx.form().weightKg());
      \u0275\u0275property("ngModel", ctx.form().weightKg());
      \u0275\u0275control();
      \u0275\u0275advance(10);
      \u0275\u0275classProp("border-rose-400", !ctx.form().targetDoseMgKg());
      \u0275\u0275property("ngModel", ctx.form().targetDoseMgKg());
      \u0275\u0275control();
      \u0275\u0275advance(5);
      \u0275\u0275classProp("active", ctx.form().doseUnit() === "mg/kg/dia");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("active", ctx.form().doseUnit() === "mg/kg/dosis");
      \u0275\u0275advance(10);
      \u0275\u0275classProp("border-rose-400", !ctx.form().drugConcentrationMg());
      \u0275\u0275property("ngModel", ctx.form().drugConcentrationMg());
      \u0275\u0275control();
      \u0275\u0275advance(6);
      \u0275\u0275classProp("border-rose-400", !ctx.form().drugConcentrationMl());
      \u0275\u0275property("ngModel", ctx.form().drugConcentrationMl());
      \u0275\u0275control();
      \u0275\u0275advance(6);
      \u0275\u0275property("ngModel", ctx.form().dosesPerDay());
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275property("value", 1);
      \u0275\u0275advance(2);
      \u0275\u0275property("value", 2);
      \u0275\u0275advance(2);
      \u0275\u0275property("value", 3);
      \u0275\u0275advance(2);
      \u0275\u0275property("value", 4);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel], styles: ["\n[_nghost-%COMP%] {\n  display: contents;\n}\n.field-hint[_ngcontent-%COMP%] {\n  font-size: 0.725rem;\n  color: #64748b;\n}\n/*# sourceMappingURL=calculator-form.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PediatricDosageCalculatorComponent, [{
    type: Component,
    args: [{ selector: "app-pediatric-dosage-calculator", imports: [FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="form-field-group">
  <label for="pedWeightInput" class="form-label">
    <span>Peso del Paciente</span>
    <span class="text-xs text-rose-500 font-semibold">* Requerido</span>
  </label>
  <div class="input-with-addon">
    <input
      id="pedWeightInput"
      type="number"
      step="0.1"
      min="0.5"
      max="150"
      placeholder="Ej. 12.0"
      class="form-input"
      [class.border-rose-400]="!form().weightKg()"
      [ngModel]="form().weightKg()"
      (ngModelChange)="form().weightKg.set($event)"
    />
    <span class="input-addon">kg</span>
  </div>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
  <div class="form-field-group">
    <label for="pedTargetDoseInput" class="form-label">
      <span>Dosis Objetivo</span>
      <span class="text-xs text-rose-500 font-semibold">* Requerido</span>
    </label>
    <input
      id="pedTargetDoseInput"
      type="number"
      step="0.5"
      min="0.1"
      placeholder="Ej. 50"
      class="form-input"
      [class.border-rose-400]="!form().targetDoseMgKg()"
      [ngModel]="form().targetDoseMgKg()"
      (ngModelChange)="form().targetDoseMgKg.set($event)"
    />
  </div>

  <div class="form-field-group">
    <label class="form-label">Unidad de Dosificaci\xF3n</label>
    <div class="radio-pill-group">
      <button
        type="button"
        class="radio-pill-btn text-xs"
        [class.active]="form().doseUnit() === 'mg/kg/dia'"
        (click)="form().doseUnit.set('mg/kg/dia')"
      >
        mg/kg/d\xEDa
      </button>
      <button
        type="button"
        class="radio-pill-btn text-xs"
        [class.active]="form().doseUnit() === 'mg/kg/dosis'"
        (click)="form().doseUnit.set('mg/kg/dosis')"
      >
        mg/kg/dosis
      </button>
    </div>
  </div>
</div>

<div class="form-field-group">
  <label class="form-label">
    <span>Concentraci\xF3n del F\xE1rmaco (Suspensi\xF3n / Jarabe)</span>
    <span class="text-xs text-rose-500 font-semibold">* Requerido</span>
  </label>
  <div class="flex items-center gap-2">
    <div class="input-with-addon flex-1">
      <input
        type="number"
        step="5"
        min="1"
        placeholder="Ej. 250"
        class="form-input"
        [class.border-rose-400]="!form().drugConcentrationMg()"
        [ngModel]="form().drugConcentrationMg()"
        (ngModelChange)="form().drugConcentrationMg.set($event)"
      />
      <span class="input-addon">mg</span>
    </div>
    <span class="font-bold text-slate-400">/</span>
    <div class="input-with-addon flex-1">
      <input
        type="number"
        step="1"
        min="0.5"
        placeholder="Ej. 5"
        class="form-input"
        [class.border-rose-400]="!form().drugConcentrationMl()"
        [ngModel]="form().drugConcentrationMl()"
        (ngModelChange)="form().drugConcentrationMl.set($event)"
      />
      <span class="input-addon">mL</span>
    </div>
  </div>
</div>

<div class="form-field-group">
  <label for="pedDosesPerDaySelect" class="form-label">Frecuencia / Tomas Diarias</label>
  <select
    id="pedDosesPerDaySelect"
    class="form-input"
    [ngModel]="form().dosesPerDay()"
    (ngModelChange)="form().dosesPerDay.set(+$event)"
  >
    <option [value]="1">1 toma al d\xEDa (Cada 24 horas)</option>
    <option [value]="2">2 tomas al d\xEDa (Cada 12 horas)</option>
    <option [value]="3">3 tomas al d\xEDa (Cada 8 horas)</option>
    <option [value]="4">4 tomas al d\xEDa (Cada 6 horas)</option>
  </select>
</div>
`, styles: ["/* src/app/features/medical-calculators/calculators/calculator-form.css */\n:host {\n  display: contents;\n}\n.field-hint {\n  font-size: 0.725rem;\n  color: #64748b;\n}\n/*# sourceMappingURL=calculator-form.css.map */\n"] }]
  }], null, { form: [{ type: Input, args: [{ isSignal: true, alias: "form", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PediatricDosageCalculatorComponent, { className: "PediatricDosageCalculatorComponent", filePath: "src/app/features/medical-calculators/calculators/pediatric-dosage-calculator.component.ts", lineNumber: 83 });
})();

// src/app/features/medical-calculators/calculators/calculator-registry.ts
var CALCULATOR_UI = {
  imc: {
    component: BmiCalculatorComponent,
    createForm: () => new BmiCalculatorForm(),
    summarize: summarizeBmiInputs
  },
  tfge: {
    component: TfgeCalculatorComponent,
    createForm: () => new TfgeCalculatorForm(),
    summarize: summarizeTfgeInputs
  },
  cockcroft: {
    component: CockcroftCalculatorComponent,
    createForm: () => new CockcroftCalculatorForm(),
    summarize: summarizeCockcroftInputs
  },
  chads_vasc: {
    component: ChadsVascCalculatorComponent,
    createForm: () => new ChadsVascCalculatorForm(),
    summarize: summarizeChadsVascInputs
  },
  calcio_corregido: {
    component: CalciumCalculatorComponent,
    createForm: () => new CalciumCalculatorForm(),
    summarize: summarizeCalciumInputs
  },
  holliday_segar: {
    component: HollidaySegarCalculatorComponent,
    createForm: () => new HollidaySegarCalculatorForm(),
    summarize: summarizeHollidaySegarInputs
  },
  bsa_mosteller: {
    component: MostellerCalculatorComponent,
    createForm: () => new MostellerCalculatorForm(),
    summarize: summarizeMostellerInputs
  },
  pediatric_dosage: {
    component: PediatricDosageCalculatorComponent,
    createForm: () => new PediatricDosageCalculatorForm(),
    summarize: summarizePediatricDosageInputs
  }
};
function createCalculatorSessions() {
  return new Map(
    Object.entries(CALCULATOR_UI).map(([code, module]) => [
      code,
      { component: module.component, form: module.createForm() }
    ])
  );
}
function summarizeCalculatorInputs(code, inputs) {
  const module = Object.hasOwn(CALCULATOR_UI, code) ? CALCULATOR_UI[code] : void 0;
  return module ? module.summarize(inputs) : inputs;
}

// src/app/core/models/calculator-icons.ts
var CALCULATOR_ICONS = {
  "imc": "lucideWeight",
  "tfge": "lucideActivity",
  "cockcroft": "lucideStethoscope",
  "chads_vasc": "lucideHeart",
  "calcio_corregido": "lucideFlaskConical",
  "holliday_segar": "lucideDroplets",
  "bsa_mosteller": "lucideSparkles",
  "pediatric_dosage": "lucidePill"
};

// src/app/core/models/calculator-result-styles.ts
var CALCULATOR_RESULT_STYLES = {
  "bmi_underweight": {
    "badgeClass": "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200",
    "cardBorderClass": "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20",
    "bgHighlightClass": "text-amber-700 dark:text-amber-400"
  },
  "bmi_normal": {
    "badgeClass": "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200",
    "cardBorderClass": "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20",
    "bgHighlightClass": "text-emerald-700 dark:text-emerald-400"
  },
  "bmi_overweight": {
    "badgeClass": "bg-yellow-100 text-yellow-900 border-yellow-300 dark:bg-yellow-950/60 dark:text-yellow-200",
    "cardBorderClass": "border-yellow-400 bg-yellow-50/50 dark:bg-yellow-950/20",
    "bgHighlightClass": "text-yellow-800 dark:text-yellow-400"
  },
  "bmi_obesity_1": {
    "badgeClass": "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-200",
    "cardBorderClass": "border-orange-400 bg-orange-50/50 dark:bg-orange-950/20",
    "bgHighlightClass": "text-orange-700 dark:text-orange-400"
  },
  "bmi_obesity_2": {
    "badgeClass": "bg-red-100 text-red-800 border-red-300 dark:bg-red-950/60 dark:text-red-200",
    "cardBorderClass": "border-red-400 bg-red-50/50 dark:bg-red-950/20",
    "bgHighlightClass": "text-red-700 dark:text-red-400"
  },
  "bmi_obesity_3": {
    "badgeClass": "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200",
    "cardBorderClass": "border-rose-500 bg-rose-50/60 dark:bg-rose-950/30",
    "bgHighlightClass": "text-rose-700 dark:text-rose-400"
  },
  "renal_g1": {
    "badgeClass": "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200",
    "cardBorderClass": "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20",
    "bgHighlightClass": "text-emerald-700 dark:text-emerald-400"
  },
  "renal_g2": {
    "badgeClass": "bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-200",
    "cardBorderClass": "border-teal-400 bg-teal-50/50 dark:bg-teal-950/20",
    "bgHighlightClass": "text-teal-700 dark:text-teal-400"
  },
  "renal_g3a": {
    "badgeClass": "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200",
    "cardBorderClass": "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20",
    "bgHighlightClass": "text-amber-700 dark:text-amber-400"
  },
  "renal_g3b": {
    "badgeClass": "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-200",
    "cardBorderClass": "border-orange-400 bg-orange-50/50 dark:bg-orange-950/20",
    "bgHighlightClass": "text-orange-700 dark:text-orange-400"
  },
  "renal_g4": {
    "badgeClass": "bg-red-100 text-red-800 border-red-300 dark:bg-red-950/60 dark:text-red-200",
    "cardBorderClass": "border-red-400 bg-red-50/50 dark:bg-red-950/20",
    "bgHighlightClass": "text-red-700 dark:text-red-400"
  },
  "renal_g5": {
    "badgeClass": "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200",
    "cardBorderClass": "border-rose-500 bg-rose-50/60 dark:bg-rose-950/30",
    "bgHighlightClass": "text-rose-700 dark:text-rose-400"
  },
  "clearance_normal": {
    "badgeClass": "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200",
    "cardBorderClass": "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20",
    "bgHighlightClass": "text-emerald-700 dark:text-emerald-400"
  },
  "clearance_mild": {
    "badgeClass": "bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-200",
    "cardBorderClass": "border-teal-400 bg-teal-50/50 dark:bg-teal-950/20",
    "bgHighlightClass": "text-teal-700 dark:text-teal-400"
  },
  "clearance_moderate": {
    "badgeClass": "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200",
    "cardBorderClass": "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20",
    "bgHighlightClass": "text-amber-700 dark:text-amber-400"
  },
  "clearance_severe": {
    "badgeClass": "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-200",
    "cardBorderClass": "border-orange-400 bg-orange-50/50 dark:bg-orange-950/20",
    "bgHighlightClass": "text-orange-700 dark:text-orange-400"
  },
  "clearance_terminal": {
    "badgeClass": "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200",
    "cardBorderClass": "border-rose-500 bg-rose-50/60 dark:bg-rose-950/30",
    "bgHighlightClass": "text-rose-700 dark:text-rose-400"
  },
  "stroke_low": {
    "badgeClass": "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200",
    "cardBorderClass": "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20",
    "bgHighlightClass": "text-emerald-700 dark:text-emerald-400"
  },
  "stroke_intermediate": {
    "badgeClass": "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200",
    "cardBorderClass": "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20",
    "bgHighlightClass": "text-amber-700 dark:text-amber-400"
  },
  "stroke_high": {
    "badgeClass": "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200",
    "cardBorderClass": "border-rose-500 bg-rose-50/60 dark:bg-rose-950/30",
    "bgHighlightClass": "text-rose-700 dark:text-rose-400"
  },
  "calcium_low": {
    "badgeClass": "bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-200",
    "cardBorderClass": "border-blue-400 bg-blue-50/50 dark:bg-blue-950/20",
    "bgHighlightClass": "text-blue-700 dark:text-blue-400"
  },
  "calcium_normal": {
    "badgeClass": "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200",
    "cardBorderClass": "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20",
    "bgHighlightClass": "text-emerald-700 dark:text-emerald-400"
  },
  "calcium_mild_high": {
    "badgeClass": "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200",
    "cardBorderClass": "border-amber-400 bg-amber-50/50 dark:bg-amber-950/20",
    "bgHighlightClass": "text-amber-700 dark:text-amber-400"
  },
  "calcium_high": {
    "badgeClass": "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200",
    "cardBorderClass": "border-rose-500 bg-rose-50/60 dark:bg-rose-950/30",
    "bgHighlightClass": "text-rose-700 dark:text-rose-400"
  },
  "fluid_maintenance": {
    "badgeClass": "badge-success",
    "cardBorderClass": "border-l-emerald-500",
    "bgHighlightClass": "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
  },
  "body_surface": {
    "badgeClass": "badge-info",
    "cardBorderClass": "border-l-sky-500",
    "bgHighlightClass": "bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300"
  },
  "pediatric_dosage": {
    "badgeClass": "badge-success",
    "cardBorderClass": "border-l-indigo-500",
    "bgHighlightClass": "bg-indigo-50 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300"
  }
};

// src/app/core/services/medical-calculators.service.ts
var MedicalCalculatorsService = class _MedicalCalculatorsService {
  platformId = inject(PLATFORM_ID);
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/calculators`;
  calculators = signal(
    [],
    ...ngDevMode ? [{ debugName: "calculators" }] : (
      /* istanbul ignore next */
      []
    )
  );
  auth = inject(AuthService);
  owner;
  constructor() {
    this.syncSession();
    effect(() => {
      this.auth.currentUser();
      untracked(() => this.syncSession());
    });
  }
  syncSession() {
    const owner = this.auth.currentUser()?.id ?? null;
    if (owner === this.owner)
      return;
    this.owner = owner;
    this.calculators.set([]);
  }
  // -------------------------------------------------------------
  // Backend API Integration
  // -------------------------------------------------------------
  previewCalculation(payload) {
    return this.http.post(`${this.baseUrl}/preview`, payload).pipe(map((result) => __spreadProps(__spreadValues({}, result), { interpretation: __spreadValues(__spreadValues({}, result.interpretation), CALCULATOR_RESULT_STYLES[result.interpretation.code] ?? CALCULATOR_RESULT_STYLES["bmi_normal"]) })));
  }
  getCatalogFromBackend() {
    return this.http.get(`${this.baseUrl}/catalog`).pipe(map((definitions) => definitions.map((definition) => ({
      id: definition.code,
      name: definition.name,
      shortName: definition.shortName,
      category: definition.category,
      categoryLabel: definition.categoryLabel,
      description: definition.description,
      evidenceReference: definition.evidenceReference,
      summaryFormula: definition.summaryFormula,
      icon: CALCULATOR_ICONS[definition.code] ?? "lucideCalculator"
    }))));
  }
  getDoctorPreferences() {
    return this.http.get(`${this.baseUrl}/preferences`);
  }
  updateDoctorPreferences(favoriteCalculationCodes) {
    return this.http.put(`${this.baseUrl}/preferences`, {
      favoriteCalculationCodes
    });
  }
  resetDoctorPreferences() {
    return this.http.post(`${this.baseUrl}/preferences/reset`, {});
  }
  executeAndSaveToBackend(payload) {
    return this.http.post(`${this.baseUrl}/execute`, payload);
  }
  getPatientHistoryFromBackend(patientId, calculationCode, fromDate, toDate) {
    let params = new HttpParams();
    if (calculationCode && calculationCode !== "all") {
      params = params.set("calculationCode", calculationCode);
    }
    if (fromDate) {
      params = params.set("fromDate", fromDate);
    }
    if (toDate) {
      params = params.set("toDate", toDate);
    }
    return this.http.get(`${this.baseUrl}/patients/${patientId}/history`, {
      params
    });
  }
  getPatientAutofillData(patientId) {
    return this.http.get(`${this.baseUrl}/patients/${patientId}/autofill`);
  }
  async copyToClipboard(text) {
    if (!isPlatformBrowser(this.platformId) || typeof navigator === "undefined") {
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }
  static \u0275fac = function MedicalCalculatorsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MedicalCalculatorsService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MedicalCalculatorsService, factory: _MedicalCalculatorsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MedicalCalculatorsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// src/app/core/services/calculator-session-history.service.ts
var CalculatorSessionHistoryService = class _CalculatorSessionHistoryService {
  auth = inject(AuthService);
  owner = signal(
    null,
    ...ngDevMode ? [{ debugName: "owner" }] : (
      /* istanbul ignore next */
      []
    )
  );
  history = signal(
    [],
    ...ngDevMode ? [{ debugName: "history" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sequence = 0;
  items = computed(
    () => this.owner() && this.owner() === this.auth.currentUser()?.id ? this.history() : [],
    ...ngDevMode ? [{ debugName: "items" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    this.syncOwner();
    effect(() => {
      this.auth.currentUser();
      untracked(() => this.syncOwner());
    });
  }
  save(item) {
    this.syncOwner();
    if (!this.owner())
      return null;
    const saved = {
      id: `session_calculation_${++this.sequence}`,
      calculatorId: item.calculatorId,
      calculatorName: item.calculatorName,
      resultHeadline: item.resultHeadline,
      interpretationLabel: item.interpretationLabel,
      severity: item.severity,
      calculatedAt: item.calculatedAt,
      plainTextEvolution: item.plainTextEvolution,
      inputsSummary: __spreadValues({}, item.inputsSummary)
    };
    this.history.update((items) => [saved, ...items.slice(0, 49)]);
    return saved;
  }
  clear() {
    this.syncOwner();
    this.history.set([]);
  }
  syncOwner() {
    const owner = this.auth.currentUser()?.id ?? null;
    if (owner === this.owner())
      return;
    this.history.set([]);
    this.owner.set(owner);
  }
  static \u0275fac = function CalculatorSessionHistoryService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CalculatorSessionHistoryService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CalculatorSessionHistoryService, factory: _CalculatorSessionHistoryService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalculatorSessionHistoryService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

// src/app/features/medical-calculators/medical-calculators.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.label;
var _forTrack2 = ($index, $item) => $item.key;
function MedicalCalculatorsComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 0);
    \u0275\u0275text(1, "Cargando calculadoras\u2026");
    \u0275\u0275elementEnd();
  }
}
function MedicalCalculatorsComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_1_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.loadCalculatorSetup());
    });
    \u0275\u0275text(1, "Reintentar");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.isLoadingSetup());
  }
}
function MedicalCalculatorsComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, MedicalCalculatorsComponent_Conditional_1_Conditional_2_Template, 2, 1, "button", 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.preferencesError(), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.setupLoaded() ? 2 : -1);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" (", ctx_r1.patientBackendHistory().length, ") ");
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_25_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 30);
    \u0275\u0275text(3, "\u2022");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.activePatientAgeYears(), " a\xF1os");
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_25_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 30);
    \u0275\u0275text(3, "\u2022");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.activePatientGender() === "FEMALE" ? "Femenino" : "Masculino");
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_25_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 30);
    \u0275\u0275text(3, "\u2022");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Peso: ", ctx_r1.activePatientWeight(), " kg");
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_25_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Talla: ", ctx_r1.activePatientHeight(), " cm");
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_25_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 31);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "Consultando historia...");
    \u0275\u0275elementEnd();
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_25_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 32);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "Autocompletar datos del paciente");
    \u0275\u0275elementEnd();
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_25_Conditional_19_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 34);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_25_Conditional_19_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 35);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_25_Conditional_19_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 36);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_25_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275conditionalCreate(1, MedicalCalculatorsComponent_Conditional_2_Conditional_25_Conditional_19_Conditional_1_Template, 1, 0, "ng-icon", 34)(2, MedicalCalculatorsComponent_Conditional_2_Conditional_25_Conditional_19_Conditional_2_Template, 1, 0, "ng-icon", 35)(3, MedicalCalculatorsComponent_Conditional_2_Conditional_25_Conditional_19_Conditional_3_Template, 1, 0, "ng-icon", 36);
    \u0275\u0275elementStart(4, "span", 37);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("severity-success", ctx_r1.autofillAlertSeverity() === "success")("severity-warning", ctx_r1.autofillAlertSeverity() === "warning")("severity-info", ctx_r1.autofillAlertSeverity() === "info");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.autofillAlertSeverity() === "success" ? 1 : ctx_r1.autofillAlertSeverity() === "warning" ? 2 : 3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.autofillBannerMessage());
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 21)(2, "div", 22);
    \u0275\u0275element(3, "ng-icon", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "div", 24)(6, "span", 25);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 26);
    \u0275\u0275text(9, "Paciente Activo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 27);
    \u0275\u0275conditionalCreate(11, MedicalCalculatorsComponent_Conditional_2_Conditional_25_Conditional_11_Template, 4, 1);
    \u0275\u0275conditionalCreate(12, MedicalCalculatorsComponent_Conditional_2_Conditional_25_Conditional_12_Template, 4, 1);
    \u0275\u0275conditionalCreate(13, MedicalCalculatorsComponent_Conditional_2_Conditional_25_Conditional_13_Template, 4, 1);
    \u0275\u0275conditionalCreate(14, MedicalCalculatorsComponent_Conditional_2_Conditional_25_Conditional_14_Template, 2, 1, "span");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 24)(16, "button", 28);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_25_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.autofillFromPatient());
    });
    \u0275\u0275conditionalCreate(17, MedicalCalculatorsComponent_Conditional_2_Conditional_25_Conditional_17_Template, 3, 0)(18, MedicalCalculatorsComponent_Conditional_2_Conditional_25_Conditional_18_Template, 3, 0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(19, MedicalCalculatorsComponent_Conditional_2_Conditional_25_Conditional_19_Template, 6, 8, "div", 29);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.activePatient()?.fullName);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.activePatientAgeYears() !== null ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activePatientGender() ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activePatientWeight() ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activePatientHeight() ? 14 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isAutofilling());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isAutofilling() ? 17 : 18);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.autofillBannerMessage() ? 19 : -1);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 63);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_26_For_5_Template_button_click_0_listener() {
      const fav_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectCalculator(fav_r7.id));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const fav_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", ctx_r1.selectedId() === fav_r7.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(fav_r7.shortName);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_For_30_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 68);
    \u0275\u0275text(1, "\u2605");
    \u0275\u0275elementEnd();
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_For_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 64);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_26_For_30_Template_button_click_0_listener() {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectCalculator(item_r9.id));
    });
    \u0275\u0275elementStart(1, "div", 65)(2, "div", 66)(3, "span", 67);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, MedicalCalculatorsComponent_Conditional_2_Conditional_26_For_30_Conditional_5_Template, 2, 0, "span", 68);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 69);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(8, "ng-icon", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", ctx_r1.selectedId() === item_r9.id);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r9.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.myCalculatorsCodes().includes(item_r9.id) ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r9.categoryLabel);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_ForEmpty_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275element(1, "ng-icon", 71);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No se encontraron calculadoras con ese t\xE9rmino.");
    \u0275\u0275elementEnd()();
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 55)(1, "div", 72)(2, "div")(3, "div", 73)(4, "span", 74);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 75);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "h2", 76);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 77);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 24)(13, "button", 78);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_33_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.resetCurrentInputs());
    });
    \u0275\u0275element(14, "ng-icon", 79);
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16, "Limpiar");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(17, "div", 80)(18, "span", 81);
    \u0275\u0275text(19, "F\xF3rmula:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "code", 82);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const metadata_r11 = ctx;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(metadata_r11.categoryLabel);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(metadata_r11.evidenceReference);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(metadata_r11.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(metadata_r11.description);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(metadata_r11.summaryFormula);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_38_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_38_ng_container_0_Template, 1, 0, "ng-container", 83);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngComponentOutlet", ctx.component)("ngComponentOutletInputs", ctx_r1.calculatorComponentInputs());
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 59);
    \u0275\u0275text(1, "Esta calculadora todav\xEDa no est\xE1 disponible.");
    \u0275\u0275elementEnd();
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_9_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 100);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const out_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(out_r13.unit);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_9_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 101);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const out_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(out_r13.description);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 96)(1, "span", 97);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 98)(4, "span", 99);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_9_For_2_Conditional_6_Template, 2, 1, "span", 100);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_9_For_2_Conditional_7_Template, 2, 1, "span", 101);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const out_r13 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(out_r13.label);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(out_r13.value);
    \u0275\u0275advance();
    \u0275\u0275conditional(out_r13.unit ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(out_r13.description ? 7 : -1);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 90);
    \u0275\u0275repeaterCreate(1, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_9_For_2_Template, 8, 4, "div", 96, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const res_r14 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(res_r14.secondaryOutputs);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 102)(1, "div", 103);
    \u0275\u0275element(2, "ng-icon", 104);
    \u0275\u0275elementStart(3, "div")(4, "span", 105);
    \u0275\u0275text(5, "Conducta Cl\xEDnica Sugerida:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 106);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const res_r14 = \u0275\u0275nextContext();
    \u0275\u0275classMap(res_r14.interpretation.bgHighlightClass);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(res_r14.clinicalAction);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 107);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "\xA1Copiado al portapapeles!");
    \u0275\u0275elementEnd();
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 108);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "Copiar para Evoluci\xF3n");
    \u0275\u0275elementEnd();
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 31);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "Guardando...");
    \u0275\u0275elementEnd();
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 107);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "\xA1Guardado con \xE9xito!");
    \u0275\u0275elementEnd();
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 109);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.activePatient() ? "Guardar en Historial Cl\xEDnico" : "Guardar en la sesi\xF3n");
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 95);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.saveError());
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 84)(1, "div", 85)(2, "div", 86)(3, "span", 87);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 88);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 89);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_9_Template, 3, 0, "div", 90);
    \u0275\u0275conditionalCreate(10, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_10_Template, 8, 3, "div", 91);
    \u0275\u0275elementStart(11, "div", 92)(12, "button", 93);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.copyResultText());
    });
    \u0275\u0275conditionalCreate(13, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_13_Template, 3, 0)(14, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_14_Template, 3, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 94);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.saveResultToRecord());
    });
    \u0275\u0275conditionalCreate(16, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_16_Template, 3, 0)(17, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_17_Template, 3, 0)(18, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_18_Template, 3, 1);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(19, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Conditional_19_Template, 2, 1, "p", 95);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const res_r14 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap(res_r14.interpretation.cardBorderClass);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(res_r14.formattedValue);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(res_r14.unit);
    \u0275\u0275advance();
    \u0275\u0275classMap(res_r14.interpretation.badgeClass);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", res_r14.interpretation.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(res_r14.secondaryOutputs && res_r14.secondaryOutputs.length > 0 ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(res_r14.clinicalAction ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("copied", ctx_r1.copyFeedback());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.copyFeedback() ? 13 : 14);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("saved", ctx_r1.saveFeedback());
    \u0275\u0275property("disabled", ctx_r1.isSavingLog())("title", ctx_r1.activePatient() ? "Guardar este resultado en el historial cl\xEDnico inmutable del paciente" : "Conservar este c\xE1lculo durante la sesi\xF3n; se pierde al recargar o cerrar sesi\xF3n");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSavingLog() ? 16 : ctx_r1.saveFeedback() ? 17 : 18);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.saveError() ? 19 : -1);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_42_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 110);
    \u0275\u0275elementStart(1, "h4", 111);
    \u0275\u0275text(2, "Calculando...");
    \u0275\u0275elementEnd();
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_42_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 112);
    \u0275\u0275elementStart(1, "p", 113);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.calculationError());
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_42_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 114);
    \u0275\u0275elementStart(1, "h4", 111);
    \u0275\u0275text(2, "Par\xE1metros incompletos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 115);
    \u0275\u0275text(4, " Ingresa valores num\xE9ricos v\xE1lidos en los campos de la izquierda o utiliza el bot\xF3n ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6, "Autocompletar datos del paciente");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " para obtener el c\xE1lculo cl\xEDnico inmediato. ");
    \u0275\u0275elementEnd();
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62);
    \u0275\u0275conditionalCreate(1, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_42_Conditional_1_Template, 3, 0)(2, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_42_Conditional_2_Template, 3, 1)(3, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_42_Conditional_3_Template, 8, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isCalculating() ? 1 : ctx_r1.calculationError() ? 2 : 3);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "span", 39);
    \u0275\u0275text(2, "Mis C\xE1lculos:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 40);
    \u0275\u0275repeaterCreate(4, MedicalCalculatorsComponent_Conditional_2_Conditional_26_For_5_Template, 3, 3, "button", 41, _forTrack0);
    \u0275\u0275elementStart(6, "button", 42);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.isCatalogModalOpen.set(true));
    });
    \u0275\u0275element(7, "ng-icon", 43);
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9, "Cat\xE1logo");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(10, "div", 44)(11, "aside", 45)(12, "div", 46);
    \u0275\u0275element(13, "ng-icon", 47);
    \u0275\u0275elementStart(14, "input", 48);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.searchQuery.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 49)(16, "button", 50);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.categoryFilter.set("all"));
    });
    \u0275\u0275text(17, " Todas ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 50);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.categoryFilter.set("pediatria"));
    });
    \u0275\u0275text(19, " Pediatr\xEDa ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 50);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.categoryFilter.set("nefrologia"));
    });
    \u0275\u0275text(21, " Nefrolog\xEDa ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 50);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.categoryFilter.set("cardiologia"));
    });
    \u0275\u0275text(23, " Cardiolog\xEDa ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 50);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.categoryFilter.set("antropometria"));
    });
    \u0275\u0275text(25, " Antropometr\xEDa ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 50);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_26_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.categoryFilter.set("metabolismo"));
    });
    \u0275\u0275text(27, " Metabolismo ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "nav", 51);
    \u0275\u0275repeaterCreate(29, MedicalCalculatorsComponent_Conditional_2_Conditional_26_For_30_Template, 9, 5, "button", 52, _forTrack0, false, MedicalCalculatorsComponent_Conditional_2_Conditional_26_ForEmpty_31_Template, 4, 0, "div", 53);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "section", 54);
    \u0275\u0275conditionalCreate(33, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_33_Template, 22, 5, "div", 55);
    \u0275\u0275elementStart(34, "div", 56)(35, "div", 57)(36, "h3", 58);
    \u0275\u0275text(37, "Par\xE1metros de Entrada");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(38, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_38_Template, 1, 2, "ng-container")(39, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_39_Template, 2, 0, "p", 59);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 60);
    \u0275\u0275conditionalCreate(41, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_41_Template, 20, 18, "div", 61)(42, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Conditional_42_Template, 4, 1, "div", 62);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_12_0;
    let tmp_13_0;
    let tmp_14_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.favoriteCalculatorsList());
    \u0275\u0275advance(10);
    \u0275\u0275property("ngModel", ctx_r1.searchQuery());
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.categoryFilter() === "all");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.categoryFilter() === "pediatria");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.categoryFilter() === "nefrologia");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.categoryFilter() === "cardiologia");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.categoryFilter() === "antropometria");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.categoryFilter() === "metabolismo");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.filteredCalculators());
    \u0275\u0275advance(4);
    \u0275\u0275conditional((tmp_12_0 = ctx_r1.currentMetadata()) ? 33 : -1, tmp_12_0);
    \u0275\u0275advance(5);
    \u0275\u0275conditional((tmp_13_0 = ctx_r1.currentCalculator()) ? 38 : 39, tmp_13_0);
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_14_0 = ctx_r1.currentResult()) ? 41 : 42, tmp_14_0);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" Historial Cl\xEDnico de C\xE1lculos: ", ctx_r1.activePatient()?.fullName, " ");
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Historial de C\xE1lculos Realizados ");
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 122);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.clearSessionHistory());
    });
    \u0275\u0275element(1, "ng-icon", 123);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Vaciar historial local");
    \u0275\u0275elementEnd()();
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_9_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 128);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r17 = ctx.$implicit;
    \u0275\u0275property("value", c_r17.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r17.name);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 120)(1, "div", 124)(2, "label", 125);
    \u0275\u0275text(3, "F\xF3rmula / C\xE1lculo:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 126);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_9_Template_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(3);
      ctx_r1.historyFilterCode.set($event);
      return \u0275\u0275resetView(ctx_r1.loadPatientHistory());
    });
    \u0275\u0275elementStart(5, "option", 127);
    \u0275\u0275text(6, "Todas las f\xF3rmulas");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(7, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_9_For_8_Template, 2, 2, "option", 128, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 124)(10, "label", 125);
    \u0275\u0275text(11, "Desde:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "app-date-picker", 129);
    \u0275\u0275listener("valueChange", function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_9_Template_app_date_picker_valueChange_12_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(3);
      ctx_r1.historyDateFrom.set($event);
      return \u0275\u0275resetView(ctx_r1.loadPatientHistory());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 124)(14, "label", 125);
    \u0275\u0275text(15, "Hasta:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "app-date-picker", 129);
    \u0275\u0275listener("valueChange", function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_9_Template_app_date_picker_valueChange_16_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(3);
      ctx_r1.historyDateTo.set($event);
      return \u0275\u0275resetView(ctx_r1.loadPatientHistory());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "button", 130);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_9_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.loadPatientHistory());
    });
    \u0275\u0275element(18, "ng-icon", 131);
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "Actualizar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.historyFilterCode());
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.calcService.calculators());
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r1.historyDateFrom());
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.historyDateTo());
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.isLoadingHistory());
    \u0275\u0275advance();
    \u0275\u0275classProp("animate-spin", ctx_r1.isLoadingHistory());
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 149);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "uppercase");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r19 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("severity-normal", log_r19.severity === "normal")("severity-warning", log_r19.severity === "warning")("severity-danger", log_r19.severity === "danger" || log_r19.severity === "critical");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 7, log_r19.severity), " ");
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 140);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_For_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 141);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_For_2_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 145);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r19 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(log_r19.resultInterpretation);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_For_2_Conditional_25_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 152)(1, "span", 154);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 155);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r20 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", entry_r20.key, ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r20.value);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_For_2_Conditional_25_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 153)(1, "span", 150);
    \u0275\u0275text(2, "Texto de Evoluci\xF3n SOAP:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "pre", 156);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const log_r19 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(log_r19.plainTextEvolution);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_For_2_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 148)(1, "h5", 150);
    \u0275\u0275text(2, "Par\xE1metros registrados al momento del c\xE1lculo:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 151);
    \u0275\u0275repeaterCreate(4, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_For_2_Conditional_25_For_5_Template, 5, 2, "div", 152, _forTrack2);
    \u0275\u0275pipe(6, "keyvalue");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_For_2_Conditional_25_Conditional_7_Template, 5, 1, "div", 153);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r19 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(\u0275\u0275pipeBind1(6, 1, ctx_r1.historyInputSummary(log_r19)));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(log_r19.plainTextEvolution ? 7 : -1);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 132)(1, "div", 133);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_For_2_Template_div_click_1_listener() {
      const log_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.toggleExpandLog(log_r19.id));
    });
    \u0275\u0275elementStart(2, "div", 24)(3, "span", 134);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 135);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(7, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_For_2_Conditional_7_Template, 3, 9, "span", 136);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 137)(9, "span", 138);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 139);
    \u0275\u0275conditionalCreate(13, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_For_2_Conditional_13_Template, 1, 0, "ng-icon", 140)(14, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_For_2_Conditional_14_Template, 1, 0, "ng-icon", 141);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 142)(16, "div", 143)(17, "span", 144);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(19, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_For_2_Conditional_19_Template, 2, 1, "span", 145);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 146)(21, "button", 147);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_For_2_Template_button_click_21_listener() {
      const log_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.copyHistoryEvolution(log_r19.plainTextEvolution));
    });
    \u0275\u0275element(22, "ng-icon", 108);
    \u0275\u0275elementStart(23, "span");
    \u0275\u0275text(24, "Copiar Evoluci\xF3n");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(25, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_For_2_Conditional_25_Template, 8, 3, "div", 148);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r19 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(log_r19.calculationName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(log_r19.formattedResult);
    \u0275\u0275advance();
    \u0275\u0275conditional(log_r19.severity ? 7 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(11, 8, log_r19.createdAt, "dd/MM/yyyy HH:mm"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.expandedHistoryLogId() === log_r19.id ? 13 : 14);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(log_r19.formattedResult);
    \u0275\u0275advance();
    \u0275\u0275conditional(log_r19.resultInterpretation ? 19 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r1.expandedHistoryLogId() === log_r19.id ? 25 : -1);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_ForEmpty_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 157);
    \u0275\u0275element(1, "ng-icon", 159);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando c\xE1lculos cl\xEDnicos del paciente...");
    \u0275\u0275elementEnd()();
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_ForEmpty_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 158);
    \u0275\u0275element(1, "ng-icon", 160);
    \u0275\u0275elementStart(2, "h4", 161);
    \u0275\u0275text(3, "Sin c\xE1lculos registrados en ficha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 162);
    \u0275\u0275text(5, " Este paciente a\xFAn no tiene c\xE1lculos guardados de forma inmutable. Puedes ejecutar cualquier f\xF3rmula y presionar ");
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7, '"Guardar en Historial Cl\xEDnico"');
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, ". ");
    \u0275\u0275elementEnd()();
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_ForEmpty_3_Conditional_0_Template, 4, 0, "div", 157)(1, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_ForEmpty_3_Conditional_1_Template, 9, 0, "div", 158);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275conditional(ctx_r1.isLoadingHistory() ? 0 : 1);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 121);
    \u0275\u0275repeaterCreate(1, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_For_2_Template, 26, 11, "article", 132, _forTrack0, false, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_ForEmpty_3_Template, 2, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.patientBackendHistory());
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_11_Conditional_7_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article", 132)(1, "div", 169)(2, "span", 134);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 138);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 142)(8, "div", 143)(9, "span", 144);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 145);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 170);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_11_Conditional_7_For_4_Template_button_click_13_listener() {
      const item_r22 = \u0275\u0275restoreView(_r21).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.copyHistoryEvolution(item_r22.plainTextEvolution));
    });
    \u0275\u0275element(14, "ng-icon", 108);
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16, "Copiar");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "pre", 156);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r22 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r22.calculatorName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(6, 5, item_r22.calculatedAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(item_r22.resultHeadline);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r22.interpretationLabel);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(item_r22.plainTextEvolution);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_11_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h4", 168);
    \u0275\u0275text(1, "C\xE1lculos locales de la sesi\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 121);
    \u0275\u0275repeaterCreate(3, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_11_Conditional_7_For_4_Template, 19, 8, "article", 132, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.sessionHistory());
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 163)(1, "div", 164);
    \u0275\u0275element(2, "ng-icon", 165);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h4", 166);
    \u0275\u0275text(4, "Selecciona un paciente para ver su historial cl\xEDnico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 167);
    \u0275\u0275text(6, " El m\xF3dulo de Calculadora Inteligente almacena de forma inmutable los c\xE1lculos dentro de la ficha de cada paciente. Puedes seleccionar un paciente desde el buscador superior o consultar los c\xE1lculos locales recientes abajo. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_11_Conditional_7_Template, 5, 0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(ctx_r1.sessionHistory().length > 0 ? 7 : -1);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 18)(1, "div", 116)(2, "div")(3, "h2", 117);
    \u0275\u0275conditionalCreate(4, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_4_Template, 1, 1)(5, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_5_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 118);
    \u0275\u0275text(7, " Registro cronol\xF3gico inmutable de c\xE1lculos m\xE9dicos ejecutados, con snapshot de par\xE1metros exactos y exportaci\xF3n a SOAP. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_8_Template, 4, 0, "button", 119);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_9_Template, 21, 6, "div", 120);
    \u0275\u0275conditionalCreate(10, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_10_Template, 4, 1, "div", 121)(11, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Conditional_11_Template, 8, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.activePatient() ? 4 : 5);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(!ctx_r1.activePatient() && ctx_r1.sessionHistory().length > 0 ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activePatient() ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activePatient() ? 10 : 11);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_28_For_29_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 193);
    \u0275\u0275text(1, "En mi panel");
    \u0275\u0275elementEnd();
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_28_For_29_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 201);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_28_For_29_Conditional_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r24);
      const item_r25 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleFavoriteCalculator(item_r25.id));
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "Quitar de mi panel");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r1.isUpdatingPreferences());
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_28_For_29_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 202);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_28_For_29_Conditional_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r26);
      const item_r25 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleFavoriteCalculator(item_r25.id));
    });
    \u0275\u0275element(1, "ng-icon", 203);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "A\xF1adir a mi panel");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r1.isUpdatingPreferences());
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_28_For_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 190)(1, "div", 191)(2, "span", 192);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, MedicalCalculatorsComponent_Conditional_2_Conditional_28_For_29_Conditional_4_Template, 2, 0, "span", 193);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h4", 194);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 195);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 196)(10, "code", 197);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 198);
    \u0275\u0275conditionalCreate(13, MedicalCalculatorsComponent_Conditional_2_Conditional_28_For_29_Conditional_13_Template, 3, 1, "button", 199)(14, MedicalCalculatorsComponent_Conditional_2_Conditional_28_For_29_Conditional_14_Template, 4, 1, "button", 200);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r25 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("is-active", ctx_r1.myCalculatorsCodes().includes(item_r25.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r25.categoryLabel);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.myCalculatorsCodes().includes(item_r25.id) ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r25.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r25.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r25.summaryFormula);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.myCalculatorsCodes().includes(item_r25.id) ? 13 : 14);
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_28_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 1);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.preferencesError());
  }
}
function MedicalCalculatorsComponent_Conditional_2_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 171);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_28_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.isCatalogModalOpen.set(false));
    });
    \u0275\u0275elementStart(1, "div", 172);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_28_Template_div_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "div", 173)(3, "div")(4, "h3", 174);
    \u0275\u0275text(5, "Gesti\xF3n de Mis Calculadoras Cl\xEDnicas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 175);
    \u0275\u0275text(7, " Personaliza los c\xE1lculos que aparecen en tu barra r\xE1pida de trabajo seg\xFAn tu especialidad y flujo diario. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 176);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_28_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.isCatalogModalOpen.set(false));
    });
    \u0275\u0275element(9, "ng-icon", 177);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 178)(11, "div", 179);
    \u0275\u0275element(12, "ng-icon", 180);
    \u0275\u0275elementStart(13, "input", 181);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function MedicalCalculatorsComponent_Conditional_2_Conditional_28_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.modalSearchQuery.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 182)(15, "button", 183);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_28_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.modalCategoryFilter.set("all"));
    });
    \u0275\u0275text(16, " Todas ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 183);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_28_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.modalCategoryFilter.set("pediatria"));
    });
    \u0275\u0275text(18, " Pediatr\xEDa ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 183);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_28_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.modalCategoryFilter.set("cardiologia"));
    });
    \u0275\u0275text(20, " Cardiolog\xEDa ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 183);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_28_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.modalCategoryFilter.set("nefrologia"));
    });
    \u0275\u0275text(22, " Nefrolog\xEDa ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 183);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_28_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.modalCategoryFilter.set("antropometria"));
    });
    \u0275\u0275text(24, " Antropometr\xEDa ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 183);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_28_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.modalCategoryFilter.set("metabolismo"));
    });
    \u0275\u0275text(26, " Metabolismo ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 184);
    \u0275\u0275repeaterCreate(28, MedicalCalculatorsComponent_Conditional_2_Conditional_28_For_29_Template, 15, 8, "div", 185, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(30, MedicalCalculatorsComponent_Conditional_2_Conditional_28_Conditional_30_Template, 2, 1, "p", 1);
    \u0275\u0275elementStart(31, "div", 186)(32, "button", 187);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_28_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.restoreSpecialtyDefaults());
    });
    \u0275\u0275element(33, "ng-icon", 188);
    \u0275\u0275elementStart(34, "span");
    \u0275\u0275text(35, "Restaurar recomendados por especialidad");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "button", 189);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Conditional_28_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.isCatalogModalOpen.set(false));
    });
    \u0275\u0275text(37, " Listo ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(13);
    \u0275\u0275property("ngModel", ctx_r1.modalSearchQuery());
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.modalCategoryFilter() === "all");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.modalCategoryFilter() === "pediatria");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.modalCategoryFilter() === "cardiologia");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.modalCategoryFilter() === "nefrologia");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.modalCategoryFilter() === "antropometria");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r1.modalCategoryFilter() === "metabolismo");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.modalFilteredCalculators());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.preferencesError() ? 30 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isUpdatingPreferences());
  }
}
function MedicalCalculatorsComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "header", 5)(2, "div", 6)(3, "div", 7);
    \u0275\u0275element(4, "ng-icon", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "h1", 9);
    \u0275\u0275text(7, "Calculadora Cl\xEDnica Inteligente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 10);
    \u0275\u0275text(9, " Herramientas de decisi\xF3n cl\xEDnica vinculadas a la historia del paciente, dosificaci\xF3n pedi\xE1trica y preconfiguraciones por especialidad. ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 11)(11, "div", 12)(12, "button", 13);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activeTab.set("calculator"));
    });
    \u0275\u0275element(13, "ng-icon", 14);
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "Calculadoras");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "button", 13);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.activeTab.set("history"));
    });
    \u0275\u0275element(17, "ng-icon", 15);
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19, "Historial Cl\xEDnico ");
    \u0275\u0275conditionalCreate(20, MedicalCalculatorsComponent_Conditional_2_Conditional_20_Template, 1, 1);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "button", 16);
    \u0275\u0275listener("click", function MedicalCalculatorsComponent_Conditional_2_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.isCatalogModalOpen.set(true));
    });
    \u0275\u0275element(22, "ng-icon", 17);
    \u0275\u0275elementStart(23, "span");
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(25, MedicalCalculatorsComponent_Conditional_2_Conditional_25_Template, 20, 8);
    \u0275\u0275conditionalCreate(26, MedicalCalculatorsComponent_Conditional_2_Conditional_26_Template, 43, 17);
    \u0275\u0275conditionalCreate(27, MedicalCalculatorsComponent_Conditional_2_Conditional_27_Template, 12, 4, "section", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(28, MedicalCalculatorsComponent_Conditional_2_Conditional_28_Template, 38, 15, "div", 19);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275classProp("active", ctx_r1.activeTab() === "calculator");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx_r1.activeTab() === "history");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.activePatient() ? 20 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Mis C\xE1lculos (", ctx_r1.myCalculatorsCodes().length, ")");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activePatient() ? 25 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activeTab() === "calculator" ? 26 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activeTab() === "history" ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isCatalogModalOpen() ? 28 : -1);
  }
}
var MedicalCalculatorsComponent = class _MedicalCalculatorsComponent {
  calcService = inject(MedicalCalculatorsService);
  sessionHistoryService = inject(CalculatorSessionHistoryService);
  auth = inject(AuthService);
  changed = new Subject();
  context = "";
  historyRead = 0;
  owner = this.auth.currentUser()?.id;
  actorChanged = new Subject();
  contextRevision = signal(
    0,
    ...ngDevMode ? [{ debugName: "contextRevision" }] : (
      /* istanbul ignore next */
      []
    )
  );
  sessionHistory = computed(
    () => this.activePatient() ? [] : this.sessionHistoryService.items(),
    ...ngDevMode ? [{ debugName: "sessionHistory" }] : (
      /* istanbul ignore next */
      []
    )
  );
  contextKey() {
    return JSON.stringify([this.auth.currentUser()?.id ?? null, this.activePatientService.activePatient()?.id ?? null]);
  }
  destroyRef = inject(DestroyRef);
  activePatientService = inject(ActivePatientService);
  // View mode: 'calculator' | 'history'
  activeTab = signal(
    "calculator",
    ...ngDevMode ? [{ debugName: "activeTab" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Selected calculator & filtering
  selectedId = signal(
    "imc",
    ...ngDevMode ? [{ debugName: "selectedId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  categoryFilter = signal(
    "all",
    ...ngDevMode ? [{ debugName: "categoryFilter" }] : (
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
  onlyFavorites = signal(
    false,
    ...ngDevMode ? [{ debugName: "onlyFavorites" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Doctor "Mis Cálculos" & Catalog Modal
  myCalculatorsCodes = signal(
    [],
    ...ngDevMode ? [{ debugName: "myCalculatorsCodes" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoadingSetup = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLoadingSetup" }] : (
      /* istanbul ignore next */
      []
    )
  );
  setupLoaded = signal(
    false,
    ...ngDevMode ? [{ debugName: "setupLoaded" }] : (
      /* istanbul ignore next */
      []
    )
  );
  preferencesError = signal(
    null,
    ...ngDevMode ? [{ debugName: "preferencesError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isCatalogModalOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isCatalogModalOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  modalSearchQuery = signal(
    "",
    ...ngDevMode ? [{ debugName: "modalSearchQuery" }] : (
      /* istanbul ignore next */
      []
    )
  );
  modalCategoryFilter = signal(
    "all",
    ...ngDevMode ? [{ debugName: "modalCategoryFilter" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isUpdatingPreferences = signal(
    false,
    ...ngDevMode ? [{ debugName: "isUpdatingPreferences" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Notifications & Feedbacks
  copyFeedback = signal(
    false,
    ...ngDevMode ? [{ debugName: "copyFeedback" }] : (
      /* istanbul ignore next */
      []
    )
  );
  saveFeedback = signal(
    false,
    ...ngDevMode ? [{ debugName: "saveFeedback" }] : (
      /* istanbul ignore next */
      []
    )
  );
  autofillBannerMessage = signal(
    null,
    ...ngDevMode ? [{ debugName: "autofillBannerMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  autofillAlertSeverity = signal(
    "info",
    ...ngDevMode ? [{ debugName: "autofillAlertSeverity" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isAutofilling = signal(
    false,
    ...ngDevMode ? [{ debugName: "isAutofilling" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isSavingLog = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSavingLog" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Patient Backend History
  patientBackendHistory = signal(
    [],
    ...ngDevMode ? [{ debugName: "patientBackendHistory" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLoadingHistory = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLoadingHistory" }] : (
      /* istanbul ignore next */
      []
    )
  );
  historyFilterCode = signal(
    "all",
    ...ngDevMode ? [{ debugName: "historyFilterCode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  historyDateFrom = signal(
    "",
    ...ngDevMode ? [{ debugName: "historyDateFrom" }] : (
      /* istanbul ignore next */
      []
    )
  );
  historyDateTo = signal(
    "",
    ...ngDevMode ? [{ debugName: "historyDateTo" }] : (
      /* istanbul ignore next */
      []
    )
  );
  expandedHistoryLogId = signal(
    null,
    ...ngDevMode ? [{ debugName: "expandedHistoryLogId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  calculatorSessions = createCalculatorSessions();
  currentCalculator = computed(
    () => this.calculatorSessions.get(this.selectedId()),
    ...ngDevMode ? [{ debugName: "currentCalculator" }] : (
      /* istanbul ignore next */
      []
    )
  );
  calculatorComponentInputs = computed(
    () => ({ form: this.currentCalculator()?.form }),
    ...ngDevMode ? [{ debugName: "calculatorComponentInputs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // -------------------------------------------------------------
  // Active Patient Context Helpers
  // -------------------------------------------------------------
  activePatient = computed(
    () => this.activePatientService.activePatient(),
    ...ngDevMode ? [{ debugName: "activePatient" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activePatientAgeYears = computed(
    () => {
      const rawBirth = this.activePatient()?.birthDate;
      if (!rawBirth)
        return null;
      const birth = /* @__PURE__ */ new Date(rawBirth + "T00:00:00");
      if (isNaN(birth.getTime()))
        return null;
      const diffMs = Date.now() - birth.getTime();
      const ageDt = new Date(diffMs);
      return Math.abs(ageDt.getUTCFullYear() - 1970);
    },
    ...ngDevMode ? [{ debugName: "activePatientAgeYears" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activePatientGender = computed(
    () => {
      const g = this.activePatient()?.gender?.toUpperCase();
      if (g === "FEMALE" || g === "F" || g === "MUJER" || g === "FEMENINO")
        return "FEMALE";
      if (g === "MALE" || g === "M" || g === "HOMBRE" || g === "MASCULINO")
        return "MALE";
      return null;
    },
    ...ngDevMode ? [{ debugName: "activePatientGender" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activePatientWeight = computed(
    () => this.activePatient()?.latestMeasurements?.weightKg ?? null,
    ...ngDevMode ? [{ debugName: "activePatientWeight" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activePatientHeight = computed(
    () => this.activePatient()?.latestMeasurements?.heightCm ?? null,
    ...ngDevMode ? [{ debugName: "activePatientHeight" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Filtered catalog for left sidebar
  filteredCalculators = computed(
    () => {
      const cat = this.categoryFilter();
      const query = this.searchQuery().toLowerCase().trim();
      const favOnly = this.onlyFavorites();
      const favCodes = this.myCalculatorsCodes();
      return this.calcService.calculators().filter((item) => {
        const matchFav = !favOnly || favCodes.includes(item.id);
        const matchCat = cat === "all" || item.category === cat;
        const matchQuery = !query || item.name.toLowerCase().includes(query) || item.shortName.toLowerCase().includes(query) || item.description.toLowerCase().includes(query) || item.categoryLabel.toLowerCase().includes(query);
        return matchFav && matchCat && matchQuery;
      });
    },
    ...ngDevMode ? [{ debugName: "filteredCalculators" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Doctor favorite calculators metadata list
  favoriteCalculatorsList = computed(
    () => {
      const favCodes = this.myCalculatorsCodes();
      return this.calcService.calculators().filter((c) => favCodes.includes(c.id));
    },
    ...ngDevMode ? [{ debugName: "favoriteCalculatorsList" }] : (
      /* istanbul ignore next */
      []
    )
  );
  // Modal filtered catalog
  modalFilteredCalculators = computed(
    () => {
      const cat = this.modalCategoryFilter();
      const query = this.modalSearchQuery().toLowerCase().trim();
      return this.calcService.calculators().filter((item) => {
        const matchCat = cat === "all" || item.category === cat;
        const matchQuery = !query || item.name.toLowerCase().includes(query) || item.shortName.toLowerCase().includes(query) || item.description.toLowerCase().includes(query) || item.categoryLabel.toLowerCase().includes(query);
        return matchCat && matchQuery;
      });
    },
    ...ngDevMode ? [{ debugName: "modalFilteredCalculators" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentMetadata = computed(
    () => this.calcService.calculators().find((c) => c.id === this.selectedId()),
    ...ngDevMode ? [{ debugName: "currentMetadata" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isCurrentInputComplete = computed(
    () => this.currentCalculator()?.form.complete() ?? false,
    ...ngDevMode ? [{ debugName: "isCurrentInputComplete" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentInputs = computed(
    () => this.currentCalculator()?.form.inputs() ?? {},
    ...ngDevMode ? [{ debugName: "currentInputs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  previewRequest = computed(
    () => this.setupLoaded() && this.currentMetadata() && this.isCurrentInputComplete() ? { calculationCode: this.selectedId(), inputSnapshot: this.currentInputs() } : null,
    ...ngDevMode ? [{ debugName: "previewRequest" }] : (
      /* istanbul ignore next */
      []
    )
  );
  previewResult = signal(
    null,
    ...ngDevMode ? [{ debugName: "previewResult" }] : (
      /* istanbul ignore next */
      []
    )
  );
  currentResult = computed(
    () => {
      const request = this.previewRequest(), preview = this.previewResult();
      return request && preview?.context === this.contextKey() && preview?.requestKey === JSON.stringify(request) ? preview.result : null;
    },
    ...ngDevMode ? [{ debugName: "currentResult" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isCalculating = signal(
    false,
    ...ngDevMode ? [{ debugName: "isCalculating" }] : (
      /* istanbul ignore next */
      []
    )
  );
  calculationError = signal(
    null,
    ...ngDevMode ? [{ debugName: "calculationError" }] : (
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
  constructor() {
    this.context = this.contextKey();
    toObservable(computed(() => ({ request: this.previewRequest(), context: this.contextKey() }))).pipe(switchMap(({ request, context }) => {
      this.syncContext();
      if (context !== this.contextKey() || JSON.stringify(request) !== JSON.stringify(this.previewRequest()))
        return of(null);
      this.calculationError.set(null);
      this.saveFeedback.set(false);
      this.saveError.set(null);
      this.isCalculating.set(!!request);
      if (!request)
        return of(null);
      const requestKey = JSON.stringify(request);
      return timer(150).pipe(switchMap(() => this.calcService.previewCalculation(request)), map((result) => ({ context, requestKey, result })), catchError((error) => {
        if (context !== this.contextKey())
          return of(null);
        this.calculationError.set(error.error?.message ?? "No se pudo calcular el resultado.");
        return of(null);
      }), finalize(() => {
        if (context === this.contextKey())
          this.isCalculating.set(false);
      }));
    }), takeUntilDestroyed()).subscribe((preview) => this.previewResult.set(preview));
    effect(() => {
      this.auth.currentUser();
      this.activePatient();
      untracked(() => {
        this.syncContext();
        this.loadPatientHistory();
      });
    });
  }
  syncContext() {
    const context = this.contextKey();
    if (context === this.context)
      return;
    this.changed.next();
    this.context = context;
    this.historyRead++;
    const owner = this.auth.currentUser()?.id;
    if (owner !== this.owner) {
      this.owner = owner;
      this.actorChanged.next();
      this.isLoadingSetup.set(false);
      this.isUpdatingPreferences.set(false);
      this.setupLoaded.set(false);
      this.myCalculatorsCodes.set([]);
      this.preferencesError.set(null);
      if (owner)
        this.loadCalculatorSetup();
    }
    this.contextRevision.update((value) => value + 1);
    for (const calculator of this.calculatorSessions.values())
      calculator.form.reset();
    this.isCalculating.set(false);
    this.previewResult.set(null);
    this.patientBackendHistory.set([]);
    this.expandedHistoryLogId.set(null);
    this.historyFilterCode.set("all");
    this.historyDateFrom.set("");
    this.historyDateTo.set("");
    this.isAutofilling.set(false);
    this.isSavingLog.set(false);
    this.isLoadingHistory.set(false);
    this.autofillBannerMessage.set(null);
    this.saveFeedback.set(false);
    this.copyFeedback.set(false);
    this.saveError.set(null);
    this.calculationError.set(null);
    this.isCatalogModalOpen.set(false);
  }
  ngOnInit() {
    this.loadCalculatorSetup();
  }
  // -------------------------------------------------------------
  // Doctor Preferences ("Mis Cálculos")
  // -------------------------------------------------------------
  loadCalculatorSetup() {
    if (this.isLoadingSetup() || this.isUpdatingPreferences())
      return;
    const owner = this.auth.currentUser()?.id;
    this.isLoadingSetup.set(true);
    this.setupLoaded.set(false);
    this.preferencesError.set(null);
    this.calcService.calculators.set([]);
    forkJoin({ catalog: this.calcService.getCatalogFromBackend(), preferences: this.calcService.getDoctorPreferences() }).pipe(takeUntil(this.actorChanged), takeUntilDestroyed(this.destroyRef), finalize(() => {
      if (owner === this.auth.currentUser()?.id)
        this.isLoadingSetup.set(false);
    })).subscribe({
      next: ({ catalog, preferences }) => {
        if (owner !== this.auth.currentUser()?.id)
          return;
        this.calcService.calculators.set(catalog);
        this.applyPreferences(preferences, true);
        this.setupLoaded.set(true);
      },
      error: () => {
        if (owner === this.auth.currentUser()?.id)
          this.preferencesError.set("No se pudieron cargar las calculadoras. Volv\xE9 a intentar.");
      }
    });
  }
  applyPreferences(preferences, selectFavorite = false) {
    const codes = preferences.favoriteCalculationCodes;
    this.myCalculatorsCodes.set(codes);
    const catalog = this.calcService.calculators();
    if (selectFavorite && codes.length && !codes.includes(this.selectedId()) || !this.currentMetadata()) {
      const first = catalog.find((item) => item.id === codes[0]) ?? catalog[0];
      if (first)
        this.selectedId.set(first.id);
    }
  }
  toggleFavoriteCalculator(code) {
    if (!this.setupLoaded() || this.isUpdatingPreferences() || !this.calcService.calculators().some((item) => item.id === code))
      return;
    const current = [...this.myCalculatorsCodes()];
    const index = current.indexOf(code);
    if (index >= 0) {
      if (current.length === 1) {
        alert("Debes mantener al menos una calculadora activa en tu panel.");
        return;
      }
      current.splice(index, 1);
    } else {
      current.push(code);
    }
    this.persistDoctorPreferences(current);
  }
  persistDoctorPreferences(codes) {
    if (!this.setupLoaded() || this.isUpdatingPreferences())
      return;
    const owner = this.auth.currentUser()?.id;
    this.isUpdatingPreferences.set(true);
    this.preferencesError.set(null);
    this.calcService.updateDoctorPreferences(codes).pipe(takeUntil(this.actorChanged), takeUntilDestroyed(this.destroyRef), finalize(() => {
      if (owner === this.auth.currentUser()?.id)
        this.isUpdatingPreferences.set(false);
    })).subscribe({
      next: (preference) => {
        if (owner === this.auth.currentUser()?.id)
          this.applyPreferences(preference);
      },
      error: () => {
        if (owner === this.auth.currentUser()?.id)
          this.preferencesError.set("No se pudieron guardar los favoritos. Volv\xE9 a intentar.");
      }
    });
  }
  restoreSpecialtyDefaults() {
    if (!this.setupLoaded() || this.isUpdatingPreferences())
      return;
    const owner = this.auth.currentUser()?.id;
    this.isUpdatingPreferences.set(true);
    this.preferencesError.set(null);
    this.calcService.resetDoctorPreferences().pipe(takeUntil(this.actorChanged), takeUntilDestroyed(this.destroyRef), finalize(() => {
      if (owner === this.auth.currentUser()?.id)
        this.isUpdatingPreferences.set(false);
    })).subscribe({
      next: (preference) => {
        if (owner === this.auth.currentUser()?.id)
          this.applyPreferences(preference, true);
      },
      error: () => {
        if (owner === this.auth.currentUser()?.id)
          this.preferencesError.set("No se pudieron restablecer los favoritos. Volv\xE9 a intentar.");
      }
    });
  }
  // -------------------------------------------------------------
  // Smart Autofill from Patient Context & Clinical History
  // -------------------------------------------------------------
  autofillFromPatient() {
    this.syncContext();
    const context = this.context;
    const patient = this.activePatient();
    if (!patient?.id) {
      this.autofillBannerMessage.set("No hay ning\xFAn paciente activo seleccionado para autocompletar.");
      this.autofillAlertSeverity.set("warning");
      return;
    }
    const calculator = this.currentCalculator();
    if (!calculator || this.isAutofilling())
      return;
    const isCurrentForm = () => context === this.contextKey() && this.currentCalculator() === calculator && this.activePatient()?.id === patient.id;
    this.isAutofilling.set(true);
    this.autofillBannerMessage.set(null);
    this.calcService.getPatientAutofillData(patient.id).pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef), finalize(() => {
      if (context === this.contextKey())
        this.isAutofilling.set(false);
    })).subscribe({
      next: (data) => {
        if (isCurrentForm() && data.patientId === patient.id)
          this.applyAutofillData(data, calculator.form);
      },
      error: () => {
        if (!isCurrentForm())
          return;
        this.autofillBannerMessage.set("No se pudieron cargar los datos del paciente. Reintent\xE1 o ingresalos manualmente.");
        this.autofillAlertSeverity.set("warning");
      }
    });
  }
  applyAutofillData(data, form) {
    const gender = data.gender?.toUpperCase() === "FEMALE" ? "FEMALE" : data.gender?.toUpperCase() === "MALE" ? "MALE" : this.activePatientGender();
    const { filledParams, missingParams } = form.autofill({
      age: data.ageYears ?? this.activePatientAgeYears(),
      gender,
      weight: data.weightKg,
      height: data.heightCm,
      creatinine: data.creatinineMgDl,
      calcium: data.serumCalciumMgDl,
      albumin: data.serumAlbuminGDl
    });
    if (missingParams.length === 0) {
      this.autofillBannerMessage.set(`Datos autocompletados desde el historial del paciente: ${filledParams.join(", ")}.`);
      this.autofillAlertSeverity.set("success");
    } else if (filledParams.length > 0) {
      this.autofillBannerMessage.set(`Se cargaron: ${filledParams.join(", ")}. Pendientes por completar en ficha: ${missingParams.join(", ")}.`);
      this.autofillAlertSeverity.set("info");
    } else {
      this.autofillBannerMessage.set(`No se encontraron par\xE1metros registrados en la ficha para esta calculadora (${missingParams.join(", ")}). Ingr\xE9salos manualmente.`);
      this.autofillAlertSeverity.set("warning");
    }
    const revision = this.contextRevision();
    const context = this.context;
    setTimeout(() => {
      if (revision === this.contextRevision() && context === this.contextKey() && !this.destroyRef.destroyed)
        this.autofillBannerMessage.set(null);
    }, 6e3);
  }
  // -------------------------------------------------------------
  // Reset Inputs
  // -------------------------------------------------------------
  resetCurrentInputs() {
    this.currentCalculator()?.form.reset();
  }
  // -------------------------------------------------------------
  // Actions
  // -------------------------------------------------------------
  selectCalculator(id) {
    this.selectedId.set(id);
    this.activeTab.set("calculator");
  }
  async copyResultText() {
    const revision = this.contextRevision();
    const context = this.contextKey();
    const res = this.currentResult();
    if (!res)
      return;
    const ok = await this.calcService.copyToClipboard(res.plainTextEvolution);
    if (ok && revision === this.contextRevision() && context === this.contextKey() && !this.destroyRef.destroyed) {
      this.copyFeedback.set(true);
      setTimeout(() => {
        if (revision === this.contextRevision() && context === this.contextKey() && !this.destroyRef.destroyed)
          this.copyFeedback.set(false);
      }, 2200);
    }
  }
  saveResultToRecord() {
    this.syncContext();
    const context = this.context;
    const result = this.currentResult();
    if (!result || this.isSavingLog())
      return;
    const patient = this.activePatient();
    const snapshot = this.currentInputs();
    this.saveError.set(null);
    this.saveFeedback.set(false);
    if (!patient?.id) {
      const saved = this.sessionHistoryService.save({
        calculatorId: result.calculatorId,
        calculatorName: result.calculationName,
        resultHeadline: `${result.formattedValue} ${result.unit}`,
        interpretationLabel: result.interpretation.label,
        severity: result.interpretation.severity,
        calculatedAt: result.calculatedAt,
        plainTextEvolution: result.plainTextEvolution,
        inputsSummary: summarizeCalculatorInputs(result.calculatorId, snapshot)
      });
      if (saved)
        this.showSaveSuccess();
      return;
    }
    this.isSavingLog.set(true);
    const payload = {
      patientId: patient.id,
      calculationCode: result.calculatorId,
      inputSnapshot: snapshot
    };
    this.calcService.executeAndSaveToBackend(payload).pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (savedLog) => {
        if (context !== this.contextKey())
          return;
        if (savedLog.patientId !== patient.id) {
          this.isSavingLog.set(false);
          this.saveError.set("La respuesta no corresponde al paciente seleccionado.");
          return;
        }
        this.isSavingLog.set(false);
        if (this.activePatient()?.id === savedLog.patientId) {
          this.patientBackendHistory.update((history) => [savedLog, ...history]);
          this.showSaveSuccess();
        }
      },
      error: (error) => {
        if (context !== this.contextKey())
          return;
        this.isSavingLog.set(false);
        this.saveError.set(error.error?.message ?? "No se pudo guardar el c\xE1lculo.");
      }
    });
  }
  showSaveSuccess() {
    this.saveFeedback.set(true);
    const revision = this.contextRevision();
    const context = this.context;
    setTimeout(() => {
      if (revision === this.contextRevision() && context === this.contextKey() && !this.destroyRef.destroyed)
        this.saveFeedback.set(false);
    }, 2500);
  }
  historyInputSummary(log) {
    return summarizeCalculatorInputs(log.calculationCode, log.inputSnapshot);
  }
  // -------------------------------------------------------------
  // Patient Backend History Actions & Filters
  // -------------------------------------------------------------
  loadPatientHistory() {
    this.syncContext();
    const context = this.context;
    const revision = ++this.historyRead;
    const patientId = this.activePatient()?.id;
    if (!patientId) {
      this.patientBackendHistory.set([]);
      return;
    }
    this.isLoadingHistory.set(true);
    const code = this.historyFilterCode();
    const from = this.historyDateFrom() ? new Date(this.historyDateFrom()).toISOString() : void 0;
    const to = this.historyDateTo() ? (/* @__PURE__ */ new Date(this.historyDateTo() + "T23:59:59")).toISOString() : void 0;
    this.calcService.getPatientHistoryFromBackend(patientId, code, from, to).pipe(takeUntil(this.changed), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (history) => {
        if (context !== this.contextKey() || revision !== this.historyRead)
          return;
        this.isLoadingHistory.set(false);
        this.patientBackendHistory.set(history);
      },
      error: (err) => {
        if (context !== this.contextKey() || revision !== this.historyRead)
          return;
        this.isLoadingHistory.set(false);
        console.error("Error fetching patient calculation history", err);
      }
    });
  }
  toggleExpandLog(id) {
    this.expandedHistoryLogId.update((current) => current === id ? null : id);
  }
  async copyHistoryEvolution(evolutionText) {
    const revision = this.contextRevision();
    const context = this.contextKey();
    if (!evolutionText)
      return;
    const ok = await this.calcService.copyToClipboard(evolutionText);
    if (ok && revision === this.contextRevision() && context === this.contextKey() && !this.destroyRef.destroyed) {
      this.copyFeedback.set(true);
      setTimeout(() => {
        if (revision === this.contextRevision() && context === this.contextKey() && !this.destroyRef.destroyed)
          this.copyFeedback.set(false);
      }, 2200);
    }
  }
  clearSessionHistory() {
    if (this.activePatient())
      return;
    if (confirm("\xBFEst\xE1s seguro de que deseas vaciar el historial local de c\xE1lculos?")) {
      this.syncContext();
      this.sessionHistoryService.clear();
    }
  }
  static \u0275fac = function MedicalCalculatorsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MedicalCalculatorsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MedicalCalculatorsComponent, selectors: [["app-medical-calculators"]], features: [\u0275\u0275ProvidersFeature([
    provideIcons({
      lucideCalculator,
      lucideWeight,
      lucideActivity,
      lucideStethoscope,
      lucideHeart,
      lucideFlaskConical,
      lucideCopy,
      lucideCheck,
      lucideSave,
      lucideTrash2,
      lucideInfo,
      lucideRotateCcw,
      lucideHistory,
      lucideUserCheck,
      lucideArrowRight,
      lucideSearch,
      lucideShieldAlert,
      lucideDroplets,
      lucideBaby,
      lucidePill,
      lucideSparkles,
      lucideSettings,
      lucideX,
      lucideFilter,
      lucideCalendar,
      lucideChevronDown,
      lucideChevronUp,
      lucideCheckCircle2,
      lucideAlertCircle,
      lucideRefreshCw,
      lucidePlus,
      lucideUser
    })
  ])], decls: 3, vars: 3, consts: [["role", "status", 1, "p-4"], ["role", "alert", 1, "p-4", "text-rose-600"], ["type", "button", 1, "reset-btn", 3, "disabled"], ["type", "button", 1, "reset-btn", 3, "click", "disabled"], [1, "calculators-container"], [1, "calculators-header"], [1, "header-left"], [1, "header-icon-wrap"], ["name", "lucideCalculator", 1, "header-icon"], [1, "header-title"], [1, "header-subtitle"], [1, "header-actions"], [1, "tab-pill-group"], ["type", "button", 1, "tab-pill-btn", 3, "click"], ["name", "lucideCalculator", 1, "tab-icon"], ["name", "lucideHistory", 1, "tab-icon"], ["type", "button", "title", "Personalizar mis calculadoras activas", 1, "customize-panel-btn", 3, "click"], ["name", "lucideSettings", 1, "btn-icon"], [1, "history-view-card"], [1, "modal-backdrop"], [1, "patient-context-banner"], [1, "patient-context-info"], [1, "patient-avatar-badge"], ["name", "lucideUserCheck"], [1, "flex", "items-center", "gap-2"], [1, "patient-name"], [1, "patient-tag"], [1, "patient-meta-row"], ["type", "button", "title", "Mapear autom\xE1ticamente los signos vitales y datos demogr\xE1ficos de su \xFAltima consulta", 1, "autofill-action-btn", 3, "click", "disabled"], [1, "autofill-notification", 3, "severity-success", "severity-warning", "severity-info"], [1, "meta-dot"], ["name", "lucideRefreshCw", 1, "btn-icon", "animate-spin"], ["name", "lucideSparkles", 1, "btn-icon"], [1, "autofill-notification"], ["name", "lucideCheckCircle2", 1, "alert-icon", "text-emerald-600"], ["name", "lucideAlertCircle", 1, "alert-icon", "text-amber-600"], ["name", "lucideInfo", 1, "alert-icon", "text-sky-600"], [1, "alert-text"], [1, "my-calculators-bar"], [1, "bar-title"], [1, "favorite-pills-row"], ["type", "button", 1, "fav-pill-btn", 3, "active"], ["type", "button", "title", "Agregar o quitar calculadoras de mi panel", 1, "add-calc-pill-btn", 3, "click"], ["name", "lucidePlus", 1, "mr-1"], [1, "calculators-grid-layout"], [1, "calc-selector-sidebar"], [1, "sidebar-search-wrap"], ["name", "lucideSearch", 1, "search-icon"], ["type", "search", "placeholder", "Buscar calculadora...", 1, "sidebar-search-input", 3, "ngModelChange", "ngModel"], [1, "category-chips-row"], ["type", "button", 1, "chip-btn", 3, "click"], ["aria-label", "Lista de calculadoras", 1, "calc-nav-list"], ["type", "button", 1, "calc-nav-card", 3, "active"], [1, "empty-search-state"], [1, "calc-workspace-panel"], [1, "calc-details-header"], [1, "calc-body-grid"], [1, "inputs-card"], [1, "inputs-card-title"], ["role", "status"], [1, "results-card"], [1, "results-inner-card", 3, "class"], [1, "incomplete-inputs-state"], ["type", "button", 1, "fav-pill-btn", 3, "click"], ["type", "button", 1, "calc-nav-card", 3, "click"], [1, "calc-card-main"], [1, "flex", "items-center", "gap-1.5"], [1, "calc-card-title"], ["title", "En mi panel", 1, "fav-star-dot"], [1, "calc-card-category"], ["name", "lucideArrowRight", 1, "calc-nav-chevron"], ["name", "lucideInfo", 1, "empty-icon"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], [1, "flex", "items-center", "gap-2", "mb-1"], [1, "calc-category-badge"], [1, "calc-evidence-badge"], [1, "calc-workspace-title"], [1, "calc-workspace-desc"], ["type", "button", "title", "Limpiar campos", 1, "reset-btn", 3, "click"], ["name", "lucideRotateCcw"], [1, "calc-formula-bar"], [1, "formula-label"], [1, "formula-code"], [4, "ngComponentOutlet", "ngComponentOutletInputs"], [1, "results-inner-card"], [1, "result-headline-row"], [1, "result-value-badge"], [1, "headline-number"], [1, "headline-unit"], [1, "interpretation-badge"], [1, "secondary-outputs-grid"], [1, "clinical-action-box", 3, "class"], [1, "result-action-buttons"], ["type", "button", "title", "Copiar texto con formato cl\xEDnico listo para pegar en la evoluci\xF3n", 1, "action-btn", "copy-btn", 3, "click"], ["type", "button", 1, "action-btn", "save-btn", 3, "click", "disabled", "title"], ["role", "alert", 1, "text-rose-700", "dark:text-rose-300"], [1, "sec-output-item"], [1, "sec-label"], [1, "flex", "items-baseline", "gap-1"], [1, "sec-val"], [1, "sec-unit"], [1, "sec-desc"], [1, "clinical-action-box"], [1, "flex", "items-start", "gap-2"], ["name", "lucideShieldAlert", 1, "action-icon", "shrink-0", "mt-0.5"], [1, "action-title"], [1, "action-text"], ["name", "lucideCheck", 1, "btn-icon", "text-emerald-600"], ["name", "lucideCopy", 1, "btn-icon"], ["name", "lucideSave", 1, "btn-icon"], ["name", "lucideRefreshCw", 1, "incomplete-icon", "animate-spin"], [1, "incomplete-title"], ["name", "lucideAlertCircle", 1, "incomplete-icon"], ["role", "alert", 1, "incomplete-text"], ["name", "lucideInfo", 1, "incomplete-icon"], [1, "incomplete-text"], [1, "history-header-row"], [1, "history-title"], [1, "history-subtitle"], ["type", "button", "title", "Vaciar los c\xE1lculos temporales de esta sesi\xF3n", 1, "clear-history-btn"], [1, "history-filter-bar"], [1, "history-list-wrap"], ["type", "button", "title", "Vaciar los c\xE1lculos temporales de esta sesi\xF3n", 1, "clear-history-btn", 3, "click"], ["name", "lucideTrash2", 1, "btn-icon"], [1, "filter-group"], [1, "filter-label"], [1, "filter-select", 3, "ngModelChange", "ngModel"], ["value", "all"], [3, "value"], [1, "filter-date-input", 3, "valueChange", "value"], ["type", "button", "title", "Recargar historial", 1, "history-reload-btn", 3, "click", "disabled"], ["name", "lucideRefreshCw", 1, "btn-icon"], [1, "history-item-card"], [1, "history-item-top", "cursor-pointer", "select-none", 3, "click"], [1, "history-calc-badge"], [1, "history-result-badge"], [1, "history-severity-tag", 3, "severity-normal", "severity-warning", "severity-danger"], [1, "flex", "items-center", "gap-3"], [1, "history-date"], ["type", "button", "aria-label", "Expandir detalles", 1, "expand-chevron-btn"], ["name", "lucideChevronUp"], ["name", "lucideChevronDown"], [1, "history-item-content"], [1, "history-res-group"], [1, "history-headline"], [1, "history-interpretation"], [1, "history-actions-row"], ["type", "button", "title", "Copiar texto de evoluci\xF3n cl\xEDnica", 1, "history-copy-btn", 3, "click"], [1, "history-expanded-body"], [1, "history-severity-tag"], [1, "snapshot-section-title"], [1, "snapshot-badges-row"], [1, "snapshot-param-chip"], [1, "mt-3"], [1, "chip-key"], [1, "chip-val"], [1, "history-preview-box"], [1, "loading-history-state"], [1, "empty-history-state"], ["name", "lucideRefreshCw", 1, "animate-spin", "text-2xl", "text-indigo-500", "mb-2"], ["name", "lucideHistory", 1, "empty-hist-icon"], [1, "empty-hist-title"], [1, "empty-hist-desc"], [1, "no-patient-history-notice"], [1, "notice-icon-badge"], ["name", "lucideUser"], [1, "notice-title"], [1, "notice-desc"], [1, "local-history-heading"], [1, "history-item-top"], ["type", "button", 1, "history-copy-btn", 3, "click"], [1, "modal-backdrop", 3, "click"], [1, "catalog-modal-dialog", 3, "click"], [1, "modal-header"], [1, "modal-title"], [1, "modal-subtitle"], ["type", "button", "aria-label", "Cerrar modal", 1, "modal-close-btn", 3, "click"], ["name", "lucideX"], [1, "modal-toolbar"], [1, "modal-search-box"], ["name", "lucideSearch", 1, "modal-search-icon"], ["type", "search", "placeholder", "Buscar por nombre o f\xF3rmula...", 1, "modal-search-input", 3, "ngModelChange", "ngModel"], [1, "modal-category-chips"], ["type", "button", 1, "modal-chip", 3, "click"], [1, "modal-catalog-grid"], [1, "catalog-card", 3, "is-active"], [1, "modal-footer"], ["type", "button", "title", "Restaurar calculadoras recomendadas para mi especialidad", 1, "restore-defaults-btn", 3, "click", "disabled"], ["name", "lucideRotateCcw", 1, "mr-1", "inline"], ["type", "button", 1, "modal-done-btn", 3, "click"], [1, "catalog-card"], [1, "card-header-line"], [1, "catalog-cat-badge"], [1, "active-indicator-tag"], [1, "catalog-card-name"], [1, "catalog-card-desc"], [1, "catalog-card-formula"], [1, "text-xs", "text-slate-600", "dark:text-slate-300"], [1, "card-footer-action"], ["type", "button", 1, "panel-action-btn", "remove-btn", 3, "disabled"], ["type", "button", 1, "panel-action-btn", "add-btn", 3, "disabled"], ["type", "button", 1, "panel-action-btn", "remove-btn", 3, "click", "disabled"], ["type", "button", 1, "panel-action-btn", "add-btn", 3, "click", "disabled"], ["name", "lucidePlus", 1, "mr-1", "inline"]], template: function MedicalCalculatorsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, MedicalCalculatorsComponent_Conditional_0_Template, 2, 0, "p", 0);
      \u0275\u0275conditionalCreate(1, MedicalCalculatorsComponent_Conditional_1_Template, 3, 2, "div", 1);
      \u0275\u0275conditionalCreate(2, MedicalCalculatorsComponent_Conditional_2_Template, 29, 10);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.isLoadingSetup() ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.preferencesError() && !ctx.isCatalogModalOpen() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.setupLoaded() ? 2 : -1);
    }
  }, dependencies: [CommonModule, NgComponentOutlet, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, NgIcon, DatePickerComponent, UpperCasePipe, DatePipe, KeyValuePipe], styles: ["\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  width: 100%;\n}\n.calculators-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n  width: 100%;\n  flex: 1;\n}\n.calculators-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n}\n.header-icon-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  background-color: #e0f2fe;\n  color: #006874;\n  font-size: 1.4rem;\n  flex-shrink: 0;\n}\n.header-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0;\n  letter-spacing: -0.02em;\n}\n.header-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #64748b;\n  margin: 0.15rem 0 0;\n  max-width: 680px;\n}\n.tab-pill-group[_ngcontent-%COMP%] {\n  display: inline-flex;\n  background-color: #f1f5f9;\n  padding: 0.25rem;\n  border-radius: 10px;\n  border: 1px solid #e2e8f0;\n}\n.tab-pill-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.45rem 0.9rem;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: #64748b;\n  border: none;\n  background: transparent;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.tab-pill-btn.active[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #006874;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n}\n.tab-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.patient-context-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.85rem 1.25rem;\n  background:\n    linear-gradient(\n      135deg,\n      #f0fdfa 0%,\n      #e6fffa 100%);\n  border: 1px solid #99f6e4;\n  border-radius: 12px;\n  flex-wrap: wrap;\n}\n.patient-context-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n}\n.patient-avatar-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;\n  background-color: #0d9488;\n  color: #ffffff;\n  font-size: 1.15rem;\n  flex-shrink: 0;\n}\n.patient-name[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #115e59;\n}\n.patient-tag[_ngcontent-%COMP%] {\n  font-size: 0.725rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  padding: 0.15rem 0.45rem;\n  background-color: #ccfbf1;\n  color: #0f766e;\n  border-radius: 6px;\n}\n.patient-meta-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 0.8rem;\n  color: #134e4a;\n  margin-top: 0.1rem;\n}\n.meta-dot[_ngcontent-%COMP%] {\n  opacity: 0.4;\n}\n.autofill-action-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.45rem 0.9rem;\n  font-size: 0.825rem;\n  font-weight: 600;\n  color: #ffffff;\n  background-color: #006874;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n}\n.autofill-action-btn[_ngcontent-%COMP%]:hover {\n  background-color: #00505a;\n}\n.calculators-grid-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 300px 1fr;\n  gap: 1.25rem;\n  align-items: start;\n}\n.calc-selector-sidebar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.85rem;\n  background-color: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 14px;\n  padding: 1rem;\n}\n.sidebar-search-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  background-color: #f8fafc;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  padding: 0.45rem 0.75rem;\n}\n.search-icon[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  font-size: 1rem;\n}\n.sidebar-search-input[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  outline: none;\n  font-size: 0.825rem;\n  color: #0f172a;\n  width: 100%;\n}\n.category-chips-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.35rem;\n  overflow-x: auto;\n  padding-bottom: 0.25rem;\n}\n.chip-btn[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.55rem;\n  font-size: 0.725rem;\n  font-weight: 600;\n  border-radius: 6px;\n  border: 1px solid #e2e8f0;\n  background-color: #f8fafc;\n  color: #64748b;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.chip-btn.active[_ngcontent-%COMP%] {\n  background-color: #006874;\n  color: #ffffff;\n  border-color: #006874;\n}\n.calc-nav-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n.calc-nav-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.75rem 0.85rem;\n  border-radius: 10px;\n  border: 1px solid #f1f5f9;\n  background-color: #ffffff;\n  cursor: pointer;\n  text-align: left;\n  transition: all 0.15s ease;\n}\n.calc-nav-card[_ngcontent-%COMP%]:hover {\n  background-color: #f8fafc;\n  border-color: #cbd5e1;\n}\n.calc-nav-card.active[_ngcontent-%COMP%] {\n  background-color: #f0fdfa;\n  border-color: #006874;\n}\n.calc-card-main[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.calc-card-title[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: #0f172a;\n}\n.calc-card-category[_ngcontent-%COMP%] {\n  font-size: 0.725rem;\n  color: #64748b;\n}\n.calc-nav-chevron[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  font-size: 0.9rem;\n}\n.calc-nav-card.active[_ngcontent-%COMP%]   .calc-nav-chevron[_ngcontent-%COMP%] {\n  color: #006874;\n}\n.empty-search-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 1.5rem 0.5rem;\n  text-align: center;\n  color: #94a3b8;\n  font-size: 0.8rem;\n  gap: 0.5rem;\n}\n.calc-workspace-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n.calc-details-header[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 14px;\n  padding: 1.25rem;\n}\n.calc-category-badge[_ngcontent-%COMP%] {\n  font-size: 0.725rem;\n  font-weight: 600;\n  color: #006874;\n  background-color: #e0f2fe;\n  padding: 0.15rem 0.5rem;\n  border-radius: 6px;\n}\n.calc-evidence-badge[_ngcontent-%COMP%] {\n  font-size: 0.725rem;\n  color: #64748b;\n  background-color: #f1f5f9;\n  padding: 0.15rem 0.5rem;\n  border-radius: 6px;\n}\n.calc-workspace-title[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0;\n}\n.calc-workspace-desc[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #64748b;\n  margin: 0.25rem 0 0;\n}\n.reset-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.4rem 0.75rem;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #64748b;\n  background-color: #f8fafc;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.calc-formula-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-top: 0.85rem;\n  padding: 0.5rem 0.75rem;\n  background-color: #f8fafc;\n  border-radius: 8px;\n  border: 1px dashed #cbd5e1;\n  font-size: 0.775rem;\n  flex-wrap: wrap;\n}\n.formula-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #475569;\n}\n.formula-code[_ngcontent-%COMP%] {\n  font-family: monospace;\n  color: #006874;\n  font-weight: 600;\n}\n.calc-body-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1.25rem;\n  align-items: start;\n}\n.inputs-card[_ngcontent-%COMP%], \n.results-card[_ngcontent-%COMP%], \n.history-view-card[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 14px;\n  padding: 1.25rem;\n}\n.card-section-title[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0 0 1rem;\n  padding-bottom: 0.5rem;\n  border-bottom: 1px solid #f1f5f9;\n}\n.form-fields-stack[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.field-row-2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.85rem;\n}\n.field-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.field-label[_ngcontent-%COMP%] {\n  font-size: 0.825rem;\n  font-weight: 600;\n  color: #334155;\n}\n.input-with-unit[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.field-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.55rem 3.5rem 0.55rem 0.75rem;\n  font-size: 0.95rem;\n  font-weight: 500;\n  color: #0f172a;\n  background-color: #f8fafc;\n  border: 1px solid #cbd5e1;\n  border-radius: 9px;\n  outline: none;\n}\n.field-input[_ngcontent-%COMP%]:focus {\n  background-color: #ffffff;\n  border-color: #006874;\n  box-shadow: 0 0 0 3px rgba(0, 104, 116, 0.15);\n}\n.input-unit[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.75rem;\n  font-size: 0.775rem;\n  font-weight: 600;\n  color: #64748b;\n  pointer-events: none;\n}\n.segmented-control[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  background-color: #f1f5f9;\n  border-radius: 8px;\n  padding: 0.2rem;\n  border: 1px solid #e2e8f0;\n}\n.segment-btn[_ngcontent-%COMP%] {\n  padding: 0.45rem 0.6rem;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #64748b;\n  background: transparent;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.segment-btn.active[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #006874;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);\n}\n.checkbox-options-stack[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n.check-option-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n  padding: 0.65rem 0.75rem;\n  background-color: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.check-box[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  accent-color: #006874;\n  margin-top: 0.15rem;\n  cursor: pointer;\n}\n.check-text-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n}\n.check-title[_ngcontent-%COMP%] {\n  font-size: 0.825rem;\n  font-weight: 600;\n  color: #0f172a;\n}\n.check-desc[_ngcontent-%COMP%] {\n  font-size: 0.725rem;\n  color: #64748b;\n}\n.result-box-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 1.15rem;\n  border-radius: 12px;\n  border-width: 2px;\n}\n.result-metric-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.result-number-val[_ngcontent-%COMP%] {\n  font-size: 2.25rem;\n  font-weight: 800;\n  color: #0f172a;\n  line-height: 1;\n}\n.result-unit-val[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #64748b;\n  margin-left: 0.4rem;\n}\n.result-severity-pill[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 700;\n  padding: 0.35rem 0.75rem;\n  border-radius: 8px;\n  border: 1px solid;\n}\n.secondary-metrics-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 0.75rem;\n}\n.secondary-metric-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n  padding: 0.65rem 0.85rem;\n  background-color: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 9px;\n}\n.sec-label[_ngcontent-%COMP%] {\n  font-size: 0.725rem;\n  font-weight: 600;\n  color: #64748b;\n}\n.sec-value-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 0.3rem;\n}\n.sec-value[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.sec-unit[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #64748b;\n}\n.sec-desc[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: #94a3b8;\n}\n.clinical-action-box[_ngcontent-%COMP%] {\n  padding: 0.85rem 1rem;\n  background-color: #ffffff;\n  border: 1px solid #cbd5e1;\n  border-left: 4px solid #006874;\n  border-radius: 8px;\n}\n.action-info-icon[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  color: #006874;\n  flex-shrink: 0;\n}\n.action-heading[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.775rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  color: #006874;\n  margin-bottom: 0.2rem;\n}\n.action-body[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #1e293b;\n  margin: 0;\n  line-height: 1.4;\n}\n.notes-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.notes-heading[_ngcontent-%COMP%] {\n  font-size: 0.725rem;\n  font-weight: 700;\n  color: #64748b;\n  text-transform: uppercase;\n}\n.notes-list[_ngcontent-%COMP%] {\n  margin: 0;\n  padding-left: 1.15rem;\n  font-size: 0.775rem;\n  color: #475569;\n}\n.result-action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.65rem;\n  flex-wrap: wrap;\n  padding-top: 0.5rem;\n  border-top: 1px dashed rgba(0, 0, 0, 0.1);\n}\n.action-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  padding: 0.6rem 1rem;\n  font-size: 0.825rem;\n  font-weight: 600;\n  border-radius: 9px;\n  cursor: pointer;\n  flex: 1;\n  white-space: nowrap;\n}\n.copy-btn[_ngcontent-%COMP%] {\n  background-color: #006874;\n  color: #ffffff;\n  border: none;\n}\n.copy-btn.copied[_ngcontent-%COMP%], \n.save-btn.saved[_ngcontent-%COMP%] {\n  background-color: #d1fae5;\n  color: #065f46;\n  border-color: #a7f3d0;\n}\n.save-btn[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #0f172a;\n  border: 1px solid #cbd5e1;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.incomplete-inputs-state[_ngcontent-%COMP%], \n.empty-history-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 1.5rem;\n  text-align: center;\n  color: #94a3b8;\n}\n.incomplete-inputs-state[_ngcontent-%COMP%] {\n  background-color: #f8fafc;\n  border: 1px dashed #cbd5e1;\n  border-radius: 12px;\n}\n.incomplete-icon[_ngcontent-%COMP%], \n.empty-hist-icon[_ngcontent-%COMP%] {\n  font-size: 2.2rem;\n  margin-bottom: 0.75rem;\n}\n.incomplete-title[_ngcontent-%COMP%], \n.empty-hist-title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  color: #334155;\n  margin: 0 0 0.25rem;\n}\n.incomplete-text[_ngcontent-%COMP%], \n.empty-hist-desc[_ngcontent-%COMP%] {\n  font-size: 0.825rem;\n  color: #64748b;\n  max-width: 340px;\n  margin: 0;\n}\n.history-header-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-wrap: wrap;\n  padding-bottom: 0.75rem;\n  border-bottom: 1px solid #f1f5f9;\n}\n.history-title[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0;\n}\n.history-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #64748b;\n  margin: 0.2rem 0 0;\n}\n.clear-history-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.45rem 0.85rem;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #dc2626;\n  background-color: #fef2f2;\n  border: 1px solid #fecaca;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.history-list-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.history-item-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  padding: 1rem;\n  background-color: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n}\n.history-item-top[_ngcontent-%COMP%], \n.history-item-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.history-calc-badge[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: #006874;\n  background-color: #e0f2fe;\n  padding: 0.2rem 0.55rem;\n  border-radius: 6px;\n}\n.history-patient-badge[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #065f46;\n  background-color: #d1fae5;\n  padding: 0.2rem 0.55rem;\n  border-radius: 6px;\n}\n.history-date[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #64748b;\n}\n.history-res-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 0.6rem;\n  flex-wrap: wrap;\n}\n.history-headline[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  font-weight: 800;\n  color: #0f172a;\n}\n.history-interpretation[_ngcontent-%COMP%] {\n  font-size: 0.825rem;\n  font-weight: 600;\n  color: #475569;\n}\n.history-copy-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.4rem 0.75rem;\n  font-size: 0.775rem;\n  font-weight: 600;\n  color: #006874;\n  background-color: #ffffff;\n  border: 1px solid #cbd5e1;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.history-del-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.4rem 0.55rem;\n  font-size: 0.85rem;\n  color: #94a3b8;\n  background-color: #ffffff;\n  border: 1px solid #cbd5e1;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.history-del-btn[_ngcontent-%COMP%]:hover {\n  color: #dc2626;\n}\n.history-preview-box[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0.65rem 0.85rem;\n  background-color: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 6px;\n  font-size: 0.75rem;\n  font-family: monospace;\n  color: #334155;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n@media (max-width: 1024px) {\n  .calculators-grid-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 768px) {\n  .calc-body-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .patient-context-banner[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .autofill-action-btn[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n}\n.customize-panel-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.45rem 0.85rem;\n  background-color: #f8fafc;\n  color: #334155;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  font-size: 0.825rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.customize-panel-btn[_ngcontent-%COMP%]:hover {\n  background-color: #f1f5f9;\n  border-color: #94a3b8;\n  color: #0f172a;\n}\n.my-calculators-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.6rem 0.85rem;\n  background-color: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  overflow-x: auto;\n}\n.bar-title[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: #64748b;\n  white-space: nowrap;\n}\n.favorite-pills-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  flex-wrap: nowrap;\n}\n.fav-pill-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.35rem 0.75rem;\n  background-color: #f8fafc;\n  border: 1px solid #cbd5e1;\n  border-radius: 6px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #334155;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: all 0.15s ease;\n}\n.fav-pill-btn[_ngcontent-%COMP%]:hover {\n  border-color: #006874;\n  color: #006874;\n  background-color: #f0fdfa;\n}\n.fav-pill-btn.active[_ngcontent-%COMP%] {\n  background-color: #006874;\n  border-color: #006874;\n  color: #ffffff;\n  box-shadow: 0 1px 2px rgba(0, 104, 116, 0.25);\n}\n.add-calc-pill-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.35rem 0.65rem;\n  background: transparent;\n  border: 1px dashed #94a3b8;\n  border-radius: 6px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #64748b;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: all 0.15s ease;\n}\n.add-calc-pill-btn[_ngcontent-%COMP%]:hover {\n  border-color: #006874;\n  color: #006874;\n}\n.fav-star-dot[_ngcontent-%COMP%] {\n  color: #eab308;\n  font-size: 0.75rem;\n}\n.autofill-notification[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.65rem 1rem;\n  border-radius: 8px;\n  font-size: 0.85rem;\n  font-weight: 500;\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease-in-out;\n}\n.autofill-notification.severity-success[_ngcontent-%COMP%] {\n  background-color: #f0fdf4;\n  border: 1px solid #bbf7d0;\n  color: #166534;\n}\n.autofill-notification.severity-warning[_ngcontent-%COMP%] {\n  background-color: #fffbeb;\n  border: 1px solid #fde68a;\n  color: #92400e;\n}\n.autofill-notification.severity-info[_ngcontent-%COMP%] {\n  background-color: #f0f9ff;\n  border: 1px solid #bae6fd;\n  color: #075985;\n}\n.history-filter-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n  padding: 0.85rem;\n  margin-bottom: 1rem;\n  background-color: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n}\n.filter-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.filter-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #64748b;\n}\n.filter-select[_ngcontent-%COMP%], \n.filter-date-input[_ngcontent-%COMP%] {\n  padding: 0.4rem 0.65rem;\n  font-size: 0.825rem;\n  border: 1px solid #cbd5e1;\n  border-radius: 6px;\n  background-color: #ffffff;\n  color: #1e293b;\n}\n.history-reload-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.45rem 0.85rem;\n  background-color: #006874;\n  color: #ffffff;\n  border: none;\n  border-radius: 6px;\n  font-size: 0.825rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.history-reload-btn[_ngcontent-%COMP%]:hover {\n  background-color: #00515b;\n}\n.history-result-badge[_ngcontent-%COMP%] {\n  padding: 0.2rem 0.5rem;\n  background-color: #e0f2fe;\n  color: #0369a1;\n  border-radius: 6px;\n  font-weight: 700;\n  font-size: 0.8rem;\n}\n.history-severity-tag[_ngcontent-%COMP%] {\n  padding: 0.15rem 0.45rem;\n  border-radius: 4px;\n  font-size: 0.675rem;\n  font-weight: 800;\n  letter-spacing: 0.03em;\n}\n.history-severity-tag.severity-normal[_ngcontent-%COMP%] {\n  background-color: #dcfce7;\n  color: #15803d;\n}\n.history-severity-tag.severity-warning[_ngcontent-%COMP%] {\n  background-color: #fef3c7;\n  color: #b45309;\n}\n.history-severity-tag.severity-danger[_ngcontent-%COMP%] {\n  background-color: #fee2e2;\n  color: #b91c1c;\n}\n.expand-chevron-btn[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: #64748b;\n  font-size: 1.1rem;\n  cursor: pointer;\n}\n.history-expanded-body[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  padding: 0.85rem;\n  background-color: #f8fafc;\n  border-radius: 8px;\n  border: 1px solid #e2e8f0;\n}\n.snapshot-section-title[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  font-size: 0.775rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  color: #475569;\n}\n.snapshot-badges-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n}\n.snapshot-param-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.25rem 0.6rem;\n  background-color: #ffffff;\n  border: 1px solid #cbd5e1;\n  border-radius: 6px;\n  font-size: 0.775rem;\n}\n.chip-key[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #64748b;\n}\n.chip-val[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #0f172a;\n}\n.no-patient-history-notice[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2.5rem 1.5rem;\n  background-color: #f8fafc;\n  border: 1px dashed #cbd5e1;\n  border-radius: 12px;\n  margin-bottom: 1.5rem;\n}\n.notice-icon-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  background-color: #e2e8f0;\n  color: #64748b;\n  font-size: 1.5rem;\n  margin-bottom: 0.75rem;\n}\n.notice-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #1e293b;\n  margin: 0 0 0.4rem;\n}\n.notice-desc[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #64748b;\n  max-width: 500px;\n  margin: 0 auto;\n}\n.loading-history-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem 1rem;\n  color: #64748b;\n  font-size: 0.9rem;\n}\n.local-history-heading[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 700;\n  color: #475569;\n  margin: 1.5rem 0 0.75rem;\n}\n.modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 999;\n  background-color: rgba(15, 23, 42, 0.55);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  animation: _ngcontent-%COMP%_fadeIn 0.15s ease-out;\n}\n.catalog-modal-dialog[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  border-radius: 14px;\n  width: 100%;\n  max-width: 860px;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.08);\n}\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  padding: 1.25rem 1.5rem;\n  border-bottom: 1px solid #e2e8f0;\n}\n.modal-title[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0;\n}\n.modal-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.825rem;\n  color: #64748b;\n  margin: 0.2rem 0 0;\n}\n.modal-close-btn[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: #64748b;\n  font-size: 1.3rem;\n  cursor: pointer;\n  padding: 0.2rem;\n  border-radius: 6px;\n}\n.modal-close-btn[_ngcontent-%COMP%]:hover {\n  background-color: #f1f5f9;\n  color: #0f172a;\n}\n.modal-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  padding: 1rem 1.5rem;\n  background-color: #f8fafc;\n  border-bottom: 1px solid #e2e8f0;\n}\n.modal-search-box[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n}\n.modal-search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #94a3b8;\n}\n.modal-search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.5rem 0.85rem 0.5rem 2.2rem;\n  font-size: 0.875rem;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  background-color: #ffffff;\n}\n.modal-category-chips[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.4rem;\n  overflow-x: auto;\n}\n.modal-chip[_ngcontent-%COMP%] {\n  padding: 0.3rem 0.7rem;\n  font-size: 0.775rem;\n  font-weight: 600;\n  border: 1px solid #cbd5e1;\n  background-color: #ffffff;\n  color: #475569;\n  border-radius: 6px;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.modal-chip.active[_ngcontent-%COMP%] {\n  background-color: #006874;\n  border-color: #006874;\n  color: #ffffff;\n}\n.modal-catalog-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  gap: 1rem;\n  padding: 1.25rem 1.5rem;\n  overflow-y: auto;\n  max-height: calc(90vh - 240px);\n}\n.catalog-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: 1rem;\n  border-radius: 10px;\n  border: 1px solid #e2e8f0;\n  background-color: #ffffff;\n  transition: all 0.15s ease;\n}\n.catalog-card[_ngcontent-%COMP%]:hover {\n  border-color: #94a3b8;\n}\n.catalog-card.is-active[_ngcontent-%COMP%] {\n  border-color: #006874;\n  background-color: #f0fdfa;\n}\n.card-header-line[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.5rem;\n}\n.catalog-cat-badge[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  color: #006874;\n  background-color: #ccfbf1;\n  padding: 0.15rem 0.45rem;\n  border-radius: 4px;\n}\n.active-indicator-tag[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  color: #059669;\n}\n.catalog-card-name[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0 0 0.4rem;\n}\n.catalog-card-desc[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: #64748b;\n  margin: 0 0 0.6rem;\n  line-height: 1.35;\n}\n.catalog-card-formula[_ngcontent-%COMP%] {\n  background-color: #f1f5f9;\n  padding: 0.4rem 0.6rem;\n  border-radius: 6px;\n  margin-bottom: 0.85rem;\n  word-break: break-all;\n}\n.card-footer-action[_ngcontent-%COMP%] {\n  margin-top: auto;\n}\n.panel-action-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.45rem 0.75rem;\n  font-size: 0.8rem;\n  font-weight: 600;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.panel-action-btn.add-btn[_ngcontent-%COMP%] {\n  background-color: #006874;\n  color: #ffffff;\n  border: none;\n}\n.panel-action-btn.add-btn[_ngcontent-%COMP%]:hover {\n  background-color: #00515b;\n}\n.panel-action-btn.remove-btn[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #dc2626;\n  border: 1px solid #fca5a5;\n}\n.panel-action-btn.remove-btn[_ngcontent-%COMP%]:hover {\n  background-color: #fef2f2;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1.5rem;\n  border-top: 1px solid #e2e8f0;\n  background-color: #f8fafc;\n}\n.restore-defaults-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.45rem 0.85rem;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #475569;\n  background: transparent;\n  border: 1px solid #cbd5e1;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.restore-defaults-btn[_ngcontent-%COMP%]:hover {\n  background-color: #f1f5f9;\n  color: #0f172a;\n}\n.modal-done-btn[_ngcontent-%COMP%] {\n  padding: 0.45rem 1.25rem;\n  font-size: 0.85rem;\n  font-weight: 600;\n  background-color: #006874;\n  color: #ffffff;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.modal-done-btn[_ngcontent-%COMP%]:hover {\n  background-color: #00515b;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.98);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n/*# sourceMappingURL=medical-calculators.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MedicalCalculatorsComponent, [{
    type: Component,
    args: [{ selector: "app-medical-calculators", imports: [CommonModule, FormsModule, NgIcon, DatePickerComponent], providers: [
      provideIcons({
        lucideCalculator,
        lucideWeight,
        lucideActivity,
        lucideStethoscope,
        lucideHeart,
        lucideFlaskConical,
        lucideCopy,
        lucideCheck,
        lucideSave,
        lucideTrash2,
        lucideInfo,
        lucideRotateCcw,
        lucideHistory,
        lucideUserCheck,
        lucideArrowRight,
        lucideSearch,
        lucideShieldAlert,
        lucideDroplets,
        lucideBaby,
        lucidePill,
        lucideSparkles,
        lucideSettings,
        lucideX,
        lucideFilter,
        lucideCalendar,
        lucideChevronDown,
        lucideChevronUp,
        lucideCheckCircle2,
        lucideAlertCircle,
        lucideRefreshCw,
        lucidePlus,
        lucideUser
      })
    ], changeDetection: ChangeDetectionStrategy.OnPush, template: `@if (isLoadingSetup()) {
  <p role="status" class="p-4">Cargando calculadoras\u2026</p>
}
@if (preferencesError() && !isCatalogModalOpen()) {
  <div role="alert" class="p-4 text-rose-600">
    {{ preferencesError() }}
    @if (!setupLoaded()) {
      <button type="button" class="reset-btn" (click)="loadCalculatorSetup()" [disabled]="isLoadingSetup()">Reintentar</button>
    }
  </div>
}
@if (setupLoaded()) {
<div class="calculators-container">\r
  <!-- Top Header -->\r
  <header class="calculators-header">\r
    <div class="header-left">\r
      <div class="header-icon-wrap">\r
        <ng-icon name="lucideCalculator" class="header-icon" />\r
      </div>\r
      <div>\r
        <h1 class="header-title">Calculadora Cl\xEDnica Inteligente</h1>\r
        <p class="header-subtitle">\r
          Herramientas de decisi\xF3n cl\xEDnica vinculadas a la historia del paciente, dosificaci\xF3n pedi\xE1trica y preconfiguraciones por especialidad.\r
        </p>\r
      </div>\r
    </div>\r
\r
    <!-- Tab navigation & Specialty Preferences trigger -->\r
    <div class="header-actions">\r
      <div class="tab-pill-group">\r
        <button\r
          type="button"\r
          class="tab-pill-btn"\r
          [class.active]="activeTab() === 'calculator'"\r
          (click)="activeTab.set('calculator')"\r
        >\r
          <ng-icon name="lucideCalculator" class="tab-icon" />\r
          <span>Calculadoras</span>\r
        </button>\r
        <button\r
          type="button"\r
          class="tab-pill-btn"\r
          [class.active]="activeTab() === 'history'"\r
          (click)="activeTab.set('history')"\r
        >\r
          <ng-icon name="lucideHistory" class="tab-icon" />\r
          <span>Historial Cl\xEDnico @if (activePatient()) { ({{ patientBackendHistory().length }}) }</span>\r
        </button>\r
      </div>\r
\r
      <button\r
        type="button"\r
        class="customize-panel-btn"\r
        (click)="isCatalogModalOpen.set(true)"\r
        title="Personalizar mis calculadoras activas"\r
      >\r
        <ng-icon name="lucideSettings" class="btn-icon" />\r
        <span>Mis C\xE1lculos ({{ myCalculatorsCodes().length }})</span>\r
      </button>\r
    </div>\r
  </header>\r
\r
  <!-- Active Patient Context & Autofill Banner -->\r
  @if (activePatient()) {\r
    <div class="patient-context-banner">\r
      <div class="patient-context-info">\r
        <div class="patient-avatar-badge">\r
          <ng-icon name="lucideUserCheck" />\r
        </div>\r
        <div>\r
          <div class="flex items-center gap-2">\r
            <span class="patient-name">{{ activePatient()?.fullName }}</span>\r
            <span class="patient-tag">Paciente Activo</span>\r
          </div>\r
          <div class="patient-meta-row">\r
            @if (activePatientAgeYears() !== null) {\r
              <span>{{ activePatientAgeYears() }} a\xF1os</span>\r
              <span class="meta-dot">\u2022</span>\r
            }\r
            @if (activePatientGender()) {\r
              <span>{{ activePatientGender() === 'FEMALE' ? 'Femenino' : 'Masculino' }}</span>\r
              <span class="meta-dot">\u2022</span>\r
            }\r
            @if (activePatientWeight()) {\r
              <span>Peso: {{ activePatientWeight() }} kg</span>\r
              <span class="meta-dot">\u2022</span>\r
            }\r
            @if (activePatientHeight()) {\r
              <span>Talla: {{ activePatientHeight() }} cm</span>\r
            }\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="flex items-center gap-2">\r
        <button\r
          type="button"\r
          class="autofill-action-btn"\r
          [disabled]="isAutofilling()"\r
          (click)="autofillFromPatient()"\r
          title="Mapear autom\xE1ticamente los signos vitales y datos demogr\xE1ficos de su \xFAltima consulta"\r
        >\r
          @if (isAutofilling()) {\r
            <ng-icon name="lucideRefreshCw" class="btn-icon animate-spin" />\r
            <span>Consultando historia...</span>\r
          } @else {\r
            <ng-icon name="lucideSparkles" class="btn-icon" />\r
            <span>Autocompletar datos del paciente</span>\r
          }\r
        </button>\r
      </div>\r
    </div>\r
\r
    <!-- Autofill Feedback Banner Notification -->\r
    @if (autofillBannerMessage()) {\r
      <div\r
        class="autofill-notification"\r
        [class.severity-success]="autofillAlertSeverity() === 'success'"\r
        [class.severity-warning]="autofillAlertSeverity() === 'warning'"\r
        [class.severity-info]="autofillAlertSeverity() === 'info'"\r
      >\r
        @if (autofillAlertSeverity() === 'success') {\r
          <ng-icon name="lucideCheckCircle2" class="alert-icon text-emerald-600" />\r
        } @else if (autofillAlertSeverity() === 'warning') {\r
          <ng-icon name="lucideAlertCircle" class="alert-icon text-amber-600" />\r
        } @else {\r
          <ng-icon name="lucideInfo" class="alert-icon text-sky-600" />\r
        }\r
        <span class="alert-text">{{ autofillBannerMessage() }}</span>\r
      </div>\r
    }\r
  }\r
\r
  <!-- View: CALCULATOR MODE -->\r
  @if (activeTab() === 'calculator') {\r
    <!-- "Mis C\xE1lculos" Quick Tabs Bar -->\r
    <div class="my-calculators-bar">\r
      <span class="bar-title">Mis C\xE1lculos:</span>\r
      <div class="favorite-pills-row">\r
        @for (fav of favoriteCalculatorsList(); track fav.id) {\r
          <button\r
            type="button"\r
            class="fav-pill-btn"\r
            [class.active]="selectedId() === fav.id"\r
            (click)="selectCalculator(fav.id)"\r
          >\r
            <span>{{ fav.shortName }}</span>\r
          </button>\r
        }\r
        <button\r
          type="button"\r
          class="add-calc-pill-btn"\r
          (click)="isCatalogModalOpen.set(true)"\r
          title="Agregar o quitar calculadoras de mi panel"\r
        >\r
          <ng-icon name="lucidePlus" class="mr-1" />\r
          <span>Cat\xE1logo</span>\r
        </button>\r
      </div>\r
    </div>\r
\r
    <div class="calculators-grid-layout">\r
      <!-- Left Sidebar: Calculator Selector -->\r
      <aside class="calc-selector-sidebar">\r
        <!-- Search bar -->\r
        <div class="sidebar-search-wrap">\r
          <ng-icon name="lucideSearch" class="search-icon" />\r
          <input\r
            type="search"\r
            class="sidebar-search-input"\r
            placeholder="Buscar calculadora..."\r
            [ngModel]="searchQuery()"\r
            (ngModelChange)="searchQuery.set($event)"\r
          />\r
        </div>\r
\r
        <!-- Category Filter Chips -->\r
        <div class="category-chips-row">\r
          <button\r
            type="button"\r
            class="chip-btn"\r
            [class.active]="categoryFilter() === 'all'"\r
            (click)="categoryFilter.set('all')"\r
          >\r
            Todas\r
          </button>\r
          <button\r
            type="button"\r
            class="chip-btn"\r
            [class.active]="categoryFilter() === 'pediatria'"\r
            (click)="categoryFilter.set('pediatria')"\r
          >\r
            Pediatr\xEDa\r
          </button>\r
          <button\r
            type="button"\r
            class="chip-btn"\r
            [class.active]="categoryFilter() === 'nefrologia'"\r
            (click)="categoryFilter.set('nefrologia')"\r
          >\r
            Nefrolog\xEDa\r
          </button>\r
          <button\r
            type="button"\r
            class="chip-btn"\r
            [class.active]="categoryFilter() === 'cardiologia'"\r
            (click)="categoryFilter.set('cardiologia')"\r
          >\r
            Cardiolog\xEDa\r
          </button>\r
          <button\r
            type="button"\r
            class="chip-btn"\r
            [class.active]="categoryFilter() === 'antropometria'"\r
            (click)="categoryFilter.set('antropometria')"\r
          >\r
            Antropometr\xEDa\r
          </button>\r
          <button\r
            type="button"\r
            class="chip-btn"\r
            [class.active]="categoryFilter() === 'metabolismo'"\r
            (click)="categoryFilter.set('metabolismo')"\r
          >\r
            Metabolismo\r
          </button>\r
        </div>\r
\r
        <!-- Calculator Items List -->\r
        <nav class="calc-nav-list" aria-label="Lista de calculadoras">\r
          @for (item of filteredCalculators(); track item.id) {\r
            <button\r
              type="button"\r
              class="calc-nav-card"\r
              [class.active]="selectedId() === item.id"\r
              (click)="selectCalculator(item.id)"\r
            >\r
              <div class="calc-card-main">\r
                <div class="flex items-center gap-1.5">\r
                  <span class="calc-card-title">{{ item.name }}</span>\r
                  @if (myCalculatorsCodes().includes(item.id)) {\r
                    <span class="fav-star-dot" title="En mi panel">\u2605</span>\r
                  }\r
                </div>\r
                <span class="calc-card-category">{{ item.categoryLabel }}</span>\r
              </div>\r
              <ng-icon name="lucideArrowRight" class="calc-nav-chevron" />\r
            </button>\r
          } @empty {\r
            <div class="empty-search-state">\r
              <ng-icon name="lucideInfo" class="empty-icon" />\r
              <p>No se encontraron calculadoras con ese t\xE9rmino.</p>\r
            </div>\r
          }\r
        </nav>\r
      </aside>\r
\r
      <!-- Main Calculator Workspace: Inputs + Live Results Card -->\r
      <section class="calc-workspace-panel">\r
        <!-- Calculator Header Card -->\r
        @if (currentMetadata(); as metadata) {
        <div class="calc-details-header">\r
          <div class="flex flex-wrap items-center justify-between gap-3">\r
            <div>\r
              <div class="flex items-center gap-2 mb-1">\r
                <span class="calc-category-badge">{{ metadata.categoryLabel }}</span>\r
                <span class="calc-evidence-badge">{{ metadata.evidenceReference }}</span>\r
              </div>\r
              <h2 class="calc-workspace-title">{{ metadata.name }}</h2>\r
              <p class="calc-workspace-desc">{{ metadata.description }}</p>\r
            </div>\r
            <div class="flex items-center gap-2">\r
              <button\r
                type="button"\r
                class="reset-btn"\r
                (click)="resetCurrentInputs()"\r
                title="Limpiar campos"\r
              >\r
                <ng-icon name="lucideRotateCcw" />\r
                <span>Limpiar</span>\r
              </button>\r
            </div>\r
          </div>\r
          <div class="calc-formula-bar">\r
            <span class="formula-label">F\xF3rmula:</span>\r
            <code class="formula-code">{{ metadata.summaryFormula }}</code>\r
          </div>\r
        </div>\r
\r
        }
        <div class="calc-body-grid">\r
          <!-- FORM INPUTS SECTION -->\r
          <div class="inputs-card">\r
            <h3 class="inputs-card-title">Par\xE1metros de Entrada</h3>\r
\r
            @if (currentCalculator(); as calculator) {
              <ng-container *ngComponentOutlet="calculator.component; inputs: calculatorComponentInputs()" />
            } @else {
              <p role="status">Esta calculadora todav\xEDa no est\xE1 disponible.</p>
            }
          </div>\r
\r
          <!-- RESULTS CARD SECTION -->\r
          <div class="results-card">\r
            @if (currentResult(); as res) {\r
              <div class="results-inner-card" [class]="res.interpretation.cardBorderClass">\r
                <!-- Result Headline Banner -->\r
                <div class="result-headline-row">\r
                  <div class="result-value-badge">\r
                    <span class="headline-number">{{ res.formattedValue }}</span>\r
                    <span class="headline-unit">{{ res.unit }}</span>\r
                  </div>\r
\r
                  <span class="interpretation-badge" [class]="res.interpretation.badgeClass">\r
                    {{ res.interpretation.label }}\r
                  </span>\r
                </div>\r
\r
                <!-- Secondary Outputs (if any) -->\r
                @if (res.secondaryOutputs && res.secondaryOutputs.length > 0) {\r
                  <div class="secondary-outputs-grid">\r
                    @for (out of res.secondaryOutputs; track out.label) {\r
                      <div class="sec-output-item">\r
                        <span class="sec-label">{{ out.label }}</span>\r
                        <div class="flex items-baseline gap-1">\r
                          <span class="sec-val">{{ out.value }}</span>\r
                          @if (out.unit) {\r
                            <span class="sec-unit">{{ out.unit }}</span>\r
                          }\r
                        </div>\r
                        @if (out.description) {\r
                          <span class="sec-desc">{{ out.description }}</span>\r
                        }\r
                      </div>\r
                    }\r
                  </div>\r
                }\r
\r
                <!-- Clinical Recommendation -->\r
                @if (res.clinicalAction) {\r
                  <div class="clinical-action-box" [class]="res.interpretation.bgHighlightClass">\r
                    <div class="flex items-start gap-2">\r
                      <ng-icon name="lucideShieldAlert" class="action-icon shrink-0 mt-0.5" />\r
                      <div>\r
                        <span class="action-title">Conducta Cl\xEDnica Sugerida:</span>\r
                        <p class="action-text">{{ res.clinicalAction }}</p>\r
                      </div>\r
                    </div>\r
                  </div>\r
                }\r
\r
                <!-- Action Buttons: Copy Evolution & Save to Record -->\r
                <div class="result-action-buttons">\r
                  <button\r
                    type="button"\r
                    class="action-btn copy-btn"\r
                    [class.copied]="copyFeedback()"\r
                    (click)="copyResultText()"\r
                    title="Copiar texto con formato cl\xEDnico listo para pegar en la evoluci\xF3n"\r
                  >\r
                    @if (copyFeedback()) {\r
                      <ng-icon name="lucideCheck" class="btn-icon text-emerald-600" />\r
                      <span>\xA1Copiado al portapapeles!</span>\r
                    } @else {\r
                      <ng-icon name="lucideCopy" class="btn-icon" />\r
                      <span>Copiar para Evoluci\xF3n</span>\r
                    }\r
                  </button>\r
\r
                  <button\r
                    type="button"\r
                    class="action-btn save-btn"\r
                    [class.saved]="saveFeedback()"\r
                    [disabled]="isSavingLog()"\r
                    (click)="saveResultToRecord()"\r
                    [title]="activePatient() ? 'Guardar este resultado en el historial cl\xEDnico inmutable del paciente' : 'Conservar este c\xE1lculo durante la sesi\xF3n; se pierde al recargar o cerrar sesi\xF3n'"
                  >\r
                    @if (isSavingLog()) {\r
                      <ng-icon name="lucideRefreshCw" class="btn-icon animate-spin" />\r
                      <span>Guardando...</span>\r
                    } @else if (saveFeedback()) {\r
                      <ng-icon name="lucideCheck" class="btn-icon text-emerald-600" />\r
                      <span>\xA1Guardado con \xE9xito!</span>\r
                    } @else {\r
                      <ng-icon name="lucideSave" class="btn-icon" />\r
                      <span>{{ activePatient() ? 'Guardar en Historial Cl\xEDnico' : 'Guardar en la sesi\xF3n' }}</span>
                    }\r
                  </button>\r
                </div>\r
                @if (saveError()) {\r
                  <p role="alert" class="text-rose-700 dark:text-rose-300">{{ saveError() }}</p>\r
                }\r
              </div>\r
            } @else {\r
              <!-- Incomplete inputs state -->\r
              <div class="incomplete-inputs-state">\r
                @if (isCalculating()) {\r
                  <ng-icon name="lucideRefreshCw" class="incomplete-icon animate-spin" />\r
                  <h4 class="incomplete-title">Calculando...</h4>\r
                } @else if (calculationError()) {\r
                  <ng-icon name="lucideAlertCircle" class="incomplete-icon" />\r
                  <p class="incomplete-text" role="alert">{{ calculationError() }}</p>\r
                } @else {\r
                  <ng-icon name="lucideInfo" class="incomplete-icon" />\r
                  <h4 class="incomplete-title">Par\xE1metros incompletos</h4>\r
                  <p class="incomplete-text">\r
                    Ingresa valores num\xE9ricos v\xE1lidos en los campos de la izquierda o utiliza el bot\xF3n <strong>Autocompletar datos del paciente</strong> para obtener el c\xE1lculo cl\xEDnico inmediato.\r
                  </p>\r
                }\r
              </div>\r
            }\r
          </div>\r
        </div>\r
      </section>\r
    </div>\r
  }\r
\r
  <!-- View: HISTORY MODE (Patient Backend History + Local History Backup) -->\r
  @if (activeTab() === 'history') {\r
    <section class="history-view-card">\r
      <div class="history-header-row">\r
        <div>\r
          <h2 class="history-title">\r
            @if (activePatient()) {\r
              Historial Cl\xEDnico de C\xE1lculos: {{ activePatient()?.fullName }}\r
            } @else {\r
              Historial de C\xE1lculos Realizados\r
            }\r
          </h2>\r
          <p class="history-subtitle">\r
            Registro cronol\xF3gico inmutable de c\xE1lculos m\xE9dicos ejecutados, con snapshot de par\xE1metros exactos y exportaci\xF3n a SOAP.\r
          </p>\r
        </div>\r
\r
        @if (!activePatient() && sessionHistory().length > 0) {
          <button\r
            type="button"\r
            class="clear-history-btn"\r
            (click)="clearSessionHistory()"
            title="Vaciar los c\xE1lculos temporales de esta sesi\xF3n"
          >\r
            <ng-icon name="lucideTrash2" class="btn-icon" />\r
            <span>Vaciar historial local</span>\r
          </button>\r
        }\r
      </div>\r
\r
      <!-- Reactive Filter Bar for Patient History -->\r
      @if (activePatient()) {\r
        <div class="history-filter-bar">\r
          <div class="filter-group">\r
            <label class="filter-label">F\xF3rmula / C\xE1lculo:</label>\r
            <select\r
              class="filter-select"\r
              [ngModel]="historyFilterCode()"\r
              (ngModelChange)="historyFilterCode.set($event); loadPatientHistory()"\r
            >\r
              <option value="all">Todas las f\xF3rmulas</option>\r
              @for (c of calcService.calculators(); track c.id) {\r
                <option [value]="c.id">{{ c.name }}</option>\r
              }\r
            </select>\r
          </div>\r
\r
          <div class="filter-group">\r
            <label class="filter-label">Desde:</label>\r
            <app-date-picker\r
              class="filter-date-input"\r
              [value]="historyDateFrom()"\r
              (valueChange)="historyDateFrom.set($event); loadPatientHistory()"\r
            />\r
          </div>\r
\r
          <div class="filter-group">\r
            <label class="filter-label">Hasta:</label>\r
            <app-date-picker\r
              class="filter-date-input"\r
              [value]="historyDateTo()"\r
              (valueChange)="historyDateTo.set($event); loadPatientHistory()"\r
            />\r
          </div>\r
\r
          <button\r
            type="button"\r
            class="history-reload-btn"\r
            [disabled]="isLoadingHistory()"\r
            (click)="loadPatientHistory()"\r
            title="Recargar historial"\r
          >\r
            <ng-icon name="lucideRefreshCw" class="btn-icon" [class.animate-spin]="isLoadingHistory()" />\r
            <span>Actualizar</span>\r
          </button>\r
        </div>\r
      }\r
\r
      <!-- Patient Immutable Backend History List -->\r
      @if (activePatient()) {\r
        <div class="history-list-wrap">\r
          @for (log of patientBackendHistory(); track log.id) {\r
            <article class="history-item-card">\r
              <div\r
                class="history-item-top cursor-pointer select-none"\r
                (click)="toggleExpandLog(log.id)"\r
              >\r
                <div class="flex items-center gap-2">\r
                  <span class="history-calc-badge">{{ log.calculationName }}</span>\r
                  <span class="history-result-badge">{{ log.formattedResult }}</span>\r
                  @if (log.severity) {\r
                    <span\r
                      class="history-severity-tag"\r
                      [class.severity-normal]="log.severity === 'normal'"\r
                      [class.severity-warning]="log.severity === 'warning'"\r
                      [class.severity-danger]="log.severity === 'danger' || log.severity === 'critical'"\r
                    >\r
                      {{ log.severity | uppercase }}\r
                    </span>\r
                  }\r
                </div>\r
\r
                <div class="flex items-center gap-3">\r
                  <span class="history-date">\r
                    {{ log.createdAt | date: 'dd/MM/yyyy HH:mm' }}\r
                  </span>\r
                  <button type="button" class="expand-chevron-btn" aria-label="Expandir detalles">\r
                    @if (expandedHistoryLogId() === log.id) {\r
                      <ng-icon name="lucideChevronUp" />\r
                    } @else {\r
                      <ng-icon name="lucideChevronDown" />\r
                    }\r
                  </button>\r
                </div>\r
              </div>\r
\r
              <!-- Collapsed Summary Row -->\r
              <div class="history-item-content">\r
                <div class="history-res-group">\r
                  <span class="history-headline">{{ log.formattedResult }}</span>\r
                  @if (log.resultInterpretation) {\r
                    <span class="history-interpretation">{{ log.resultInterpretation }}</span>\r
                  }\r
                </div>\r
\r
                <div class="history-actions-row">\r
                  <button\r
                    type="button"\r
                    class="history-copy-btn"\r
                    (click)="copyHistoryEvolution(log.plainTextEvolution)"\r
                    title="Copiar texto de evoluci\xF3n cl\xEDnica"\r
                  >\r
                    <ng-icon name="lucideCopy" class="btn-icon" />\r
                    <span>Copiar Evoluci\xF3n</span>\r
                  </button>\r
                </div>\r
              </div>\r
\r
              <!-- Expandable Exact Inputs Snapshot -->\r
              @if (expandedHistoryLogId() === log.id) {\r
                <div class="history-expanded-body">\r
                  <h5 class="snapshot-section-title">Par\xE1metros registrados al momento del c\xE1lculo:</h5>\r
                  <div class="snapshot-badges-row">\r
                    @for (entry of historyInputSummary(log) | keyvalue; track entry.key) {\r
                      <div class="snapshot-param-chip">\r
                        <span class="chip-key">{{ entry.key }}:</span>\r
                        <span class="chip-val">{{ entry.value }}</span>\r
                      </div>\r
                    }\r
                  </div>\r
\r
                  @if (log.plainTextEvolution) {\r
                    <div class="mt-3">\r
                      <span class="snapshot-section-title">Texto de Evoluci\xF3n SOAP:</span>\r
                      <pre class="history-preview-box">{{ log.plainTextEvolution }}</pre>\r
                    </div>\r
                  }\r
                </div>\r
              }\r
            </article>\r
          } @empty {\r
            @if (isLoadingHistory()) {\r
              <div class="loading-history-state">\r
                <ng-icon name="lucideRefreshCw" class="animate-spin text-2xl text-indigo-500 mb-2" />\r
                <p>Cargando c\xE1lculos cl\xEDnicos del paciente...</p>\r
              </div>\r
            } @else {\r
              <div class="empty-history-state">\r
                <ng-icon name="lucideHistory" class="empty-hist-icon" />\r
                <h4 class="empty-hist-title">Sin c\xE1lculos registrados en ficha</h4>\r
                <p class="empty-hist-desc">\r
                  Este paciente a\xFAn no tiene c\xE1lculos guardados de forma inmutable. Puedes ejecutar cualquier f\xF3rmula y presionar <strong>"Guardar en Historial Cl\xEDnico"</strong>.\r
                </p>\r
              </div>\r
            }\r
          }\r
        </div>\r
      } @else {\r
        <!-- No Active Patient Prompt -->\r
        <div class="no-patient-history-notice">\r
          <div class="notice-icon-badge">\r
            <ng-icon name="lucideUser" />\r
          </div>\r
          <h4 class="notice-title">Selecciona un paciente para ver su historial cl\xEDnico</h4>\r
          <p class="notice-desc">\r
            El m\xF3dulo de Calculadora Inteligente almacena de forma inmutable los c\xE1lculos dentro de la ficha de cada paciente. Puedes seleccionar un paciente desde el buscador superior o consultar los c\xE1lculos locales recientes abajo.\r
          </p>\r
        </div>\r
\r
        <!-- Temporary calculations without a patient -->
        @if (sessionHistory().length > 0) {
          <h4 class="local-history-heading">C\xE1lculos locales de la sesi\xF3n:</h4>\r
          <div class="history-list-wrap">\r
            @for (item of sessionHistory(); track item.id) {
              <article class="history-item-card">\r
                <div class="history-item-top">\r
                  <span class="history-calc-badge">{{ item.calculatorName }}</span>\r
                  <span class="history-date">{{ item.calculatedAt | date: 'dd/MM/yyyy HH:mm' }}</span>\r
                </div>\r
                <div class="history-item-content">\r
                  <div class="history-res-group">\r
                    <span class="history-headline">{{ item.resultHeadline }}</span>\r
                    <span class="history-interpretation">{{ item.interpretationLabel }}</span>\r
                  </div>\r
                  <button\r
                    type="button"\r
                    class="history-copy-btn"\r
                    (click)="copyHistoryEvolution(item.plainTextEvolution)"\r
                  >\r
                    <ng-icon name="lucideCopy" class="btn-icon" />\r
                    <span>Copiar</span>\r
                  </button>\r
                </div>\r
                <pre class="history-preview-box">{{ item.plainTextEvolution }}</pre>\r
              </article>\r
            }\r
          </div>\r
        }\r
      }\r
    </section>\r
  }\r
</div>\r
\r
<!-- ============================================================ -->\r
<!-- MODAL: CAT\xC1LOGO COMPLETO Y GESTI\xD3N DE "MIS C\xC1LCULOS" -->\r
<!-- ============================================================ -->\r
@if (isCatalogModalOpen()) {\r
  <div class="modal-backdrop" (click)="isCatalogModalOpen.set(false)">\r
    <div class="catalog-modal-dialog" (click)="$event.stopPropagation()">\r
      <!-- Modal Header -->\r
      <div class="modal-header">\r
        <div>\r
          <h3 class="modal-title">Gesti\xF3n de Mis Calculadoras Cl\xEDnicas</h3>\r
          <p class="modal-subtitle">\r
            Personaliza los c\xE1lculos que aparecen en tu barra r\xE1pida de trabajo seg\xFAn tu especialidad y flujo diario.\r
          </p>\r
        </div>\r
        <button\r
          type="button"\r
          class="modal-close-btn"\r
          (click)="isCatalogModalOpen.set(false)"\r
          aria-label="Cerrar modal"\r
        >\r
          <ng-icon name="lucideX" />\r
        </button>\r
      </div>\r
\r
      <!-- Modal Search & Filters -->\r
      <div class="modal-toolbar">\r
        <div class="modal-search-box">\r
          <ng-icon name="lucideSearch" class="modal-search-icon" />\r
          <input\r
            type="search"\r
            class="modal-search-input"\r
            placeholder="Buscar por nombre o f\xF3rmula..."\r
            [ngModel]="modalSearchQuery()"\r
            (ngModelChange)="modalSearchQuery.set($event)"\r
          />\r
        </div>\r
\r
        <div class="modal-category-chips">\r
          <button\r
            type="button"\r
            class="modal-chip"\r
            [class.active]="modalCategoryFilter() === 'all'"\r
            (click)="modalCategoryFilter.set('all')"\r
          >\r
            Todas\r
          </button>\r
          <button\r
            type="button"\r
            class="modal-chip"\r
            [class.active]="modalCategoryFilter() === 'pediatria'"\r
            (click)="modalCategoryFilter.set('pediatria')"\r
          >\r
            Pediatr\xEDa\r
          </button>\r
          <button\r
            type="button"\r
            class="modal-chip"\r
            [class.active]="modalCategoryFilter() === 'cardiologia'"\r
            (click)="modalCategoryFilter.set('cardiologia')"\r
          >\r
            Cardiolog\xEDa\r
          </button>\r
          <button\r
            type="button"\r
            class="modal-chip"\r
            [class.active]="modalCategoryFilter() === 'nefrologia'"\r
            (click)="modalCategoryFilter.set('nefrologia')"\r
          >\r
            Nefrolog\xEDa\r
          </button>\r
          <button\r
            type="button"\r
            class="modal-chip"\r
            [class.active]="modalCategoryFilter() === 'antropometria'"\r
            (click)="modalCategoryFilter.set('antropometria')"\r
          >\r
            Antropometr\xEDa\r
          </button>\r
          <button\r
            type="button"\r
            class="modal-chip"\r
            [class.active]="modalCategoryFilter() === 'metabolismo'"\r
            (click)="modalCategoryFilter.set('metabolismo')"\r
          >\r
            Metabolismo\r
          </button>\r
        </div>\r
      </div>\r
\r
      <!-- Modal Catalog Grid -->\r
      <div class="modal-catalog-grid">\r
        @for (item of modalFilteredCalculators(); track item.id) {\r
          <div class="catalog-card" [class.is-active]="myCalculatorsCodes().includes(item.id)">\r
            <div class="card-header-line">\r
              <span class="catalog-cat-badge">{{ item.categoryLabel }}</span>\r
              @if (myCalculatorsCodes().includes(item.id)) {\r
                <span class="active-indicator-tag">En mi panel</span>\r
              }\r
            </div>\r
\r
            <h4 class="catalog-card-name">{{ item.name }}</h4>\r
            <p class="catalog-card-desc">{{ item.description }}</p>\r
\r
            <div class="catalog-card-formula">\r
              <code class="text-xs text-slate-600 dark:text-slate-300">{{ item.summaryFormula }}</code>\r
            </div>\r
\r
            <div class="card-footer-action">\r
              @if (myCalculatorsCodes().includes(item.id)) {\r
                <button\r
                  type="button"\r
                  class="panel-action-btn remove-btn"\r
                  (click)="toggleFavoriteCalculator(item.id)"
                  [disabled]="isUpdatingPreferences()"\r
                >\r
                  <span>Quitar de mi panel</span>\r
                </button>\r
              } @else {\r
                <button\r
                  type="button"\r
                  class="panel-action-btn add-btn"\r
                  (click)="toggleFavoriteCalculator(item.id)"
                  [disabled]="isUpdatingPreferences()"\r
                >\r
                  <ng-icon name="lucidePlus" class="mr-1 inline" />\r
                  <span>A\xF1adir a mi panel</span>\r
                </button>\r
              }\r
            </div>\r
          </div>\r
        }\r
      </div>\r
\r
      <!-- Modal Footer -->\r
      @if (preferencesError()) {
        <p role="alert" class="p-4 text-rose-600">{{ preferencesError() }}</p>
      }
      <div class="modal-footer">\r
        <button\r
          type="button"\r
          class="restore-defaults-btn"\r
          (click)="restoreSpecialtyDefaults()"
          [disabled]="isUpdatingPreferences()"\r
          title="Restaurar calculadoras recomendadas para mi especialidad"\r
        >\r
          <ng-icon name="lucideRotateCcw" class="mr-1 inline" />\r
          <span>Restaurar recomendados por especialidad</span>\r
        </button>\r
\r
        <button\r
          type="button"\r
          class="modal-done-btn"\r
          (click)="isCatalogModalOpen.set(false)"\r
        >\r
          Listo\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
}\r

}
`, styles: ["/* src/app/features/medical-calculators/medical-calculators.component.css */\n:host {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  width: 100%;\n}\n.calculators-container {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n  width: 100%;\n  flex: 1;\n}\n.calculators-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.header-left {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n}\n.header-icon-wrap {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  background-color: #e0f2fe;\n  color: #006874;\n  font-size: 1.4rem;\n  flex-shrink: 0;\n}\n.header-title {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0;\n  letter-spacing: -0.02em;\n}\n.header-subtitle {\n  font-size: 0.875rem;\n  color: #64748b;\n  margin: 0.15rem 0 0;\n  max-width: 680px;\n}\n.tab-pill-group {\n  display: inline-flex;\n  background-color: #f1f5f9;\n  padding: 0.25rem;\n  border-radius: 10px;\n  border: 1px solid #e2e8f0;\n}\n.tab-pill-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.45rem 0.9rem;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: #64748b;\n  border: none;\n  background: transparent;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.tab-pill-btn.active {\n  background-color: #ffffff;\n  color: #006874;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n}\n.tab-icon {\n  font-size: 1rem;\n}\n.patient-context-banner {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.85rem 1.25rem;\n  background:\n    linear-gradient(\n      135deg,\n      #f0fdfa 0%,\n      #e6fffa 100%);\n  border: 1px solid #99f6e4;\n  border-radius: 12px;\n  flex-wrap: wrap;\n}\n.patient-context-info {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n}\n.patient-avatar-badge {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;\n  background-color: #0d9488;\n  color: #ffffff;\n  font-size: 1.15rem;\n  flex-shrink: 0;\n}\n.patient-name {\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #115e59;\n}\n.patient-tag {\n  font-size: 0.725rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  padding: 0.15rem 0.45rem;\n  background-color: #ccfbf1;\n  color: #0f766e;\n  border-radius: 6px;\n}\n.patient-meta-row {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 0.8rem;\n  color: #134e4a;\n  margin-top: 0.1rem;\n}\n.meta-dot {\n  opacity: 0.4;\n}\n.autofill-action-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.45rem 0.9rem;\n  font-size: 0.825rem;\n  font-weight: 600;\n  color: #ffffff;\n  background-color: #006874;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n}\n.autofill-action-btn:hover {\n  background-color: #00505a;\n}\n.calculators-grid-layout {\n  display: grid;\n  grid-template-columns: 300px 1fr;\n  gap: 1.25rem;\n  align-items: start;\n}\n.calc-selector-sidebar {\n  display: flex;\n  flex-direction: column;\n  gap: 0.85rem;\n  background-color: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 14px;\n  padding: 1rem;\n}\n.sidebar-search-wrap {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  background-color: #f8fafc;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  padding: 0.45rem 0.75rem;\n}\n.search-icon {\n  color: #94a3b8;\n  font-size: 1rem;\n}\n.sidebar-search-input {\n  border: none;\n  background: transparent;\n  outline: none;\n  font-size: 0.825rem;\n  color: #0f172a;\n  width: 100%;\n}\n.category-chips-row {\n  display: flex;\n  gap: 0.35rem;\n  overflow-x: auto;\n  padding-bottom: 0.25rem;\n}\n.chip-btn {\n  padding: 0.25rem 0.55rem;\n  font-size: 0.725rem;\n  font-weight: 600;\n  border-radius: 6px;\n  border: 1px solid #e2e8f0;\n  background-color: #f8fafc;\n  color: #64748b;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.chip-btn.active {\n  background-color: #006874;\n  color: #ffffff;\n  border-color: #006874;\n}\n.calc-nav-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n.calc-nav-card {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.75rem 0.85rem;\n  border-radius: 10px;\n  border: 1px solid #f1f5f9;\n  background-color: #ffffff;\n  cursor: pointer;\n  text-align: left;\n  transition: all 0.15s ease;\n}\n.calc-nav-card:hover {\n  background-color: #f8fafc;\n  border-color: #cbd5e1;\n}\n.calc-nav-card.active {\n  background-color: #f0fdfa;\n  border-color: #006874;\n}\n.calc-card-main {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n.calc-card-title {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: #0f172a;\n}\n.calc-card-category {\n  font-size: 0.725rem;\n  color: #64748b;\n}\n.calc-nav-chevron {\n  color: #94a3b8;\n  font-size: 0.9rem;\n}\n.calc-nav-card.active .calc-nav-chevron {\n  color: #006874;\n}\n.empty-search-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 1.5rem 0.5rem;\n  text-align: center;\n  color: #94a3b8;\n  font-size: 0.8rem;\n  gap: 0.5rem;\n}\n.calc-workspace-panel {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n.calc-details-header {\n  background-color: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 14px;\n  padding: 1.25rem;\n}\n.calc-category-badge {\n  font-size: 0.725rem;\n  font-weight: 600;\n  color: #006874;\n  background-color: #e0f2fe;\n  padding: 0.15rem 0.5rem;\n  border-radius: 6px;\n}\n.calc-evidence-badge {\n  font-size: 0.725rem;\n  color: #64748b;\n  background-color: #f1f5f9;\n  padding: 0.15rem 0.5rem;\n  border-radius: 6px;\n}\n.calc-workspace-title {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0;\n}\n.calc-workspace-desc {\n  font-size: 0.85rem;\n  color: #64748b;\n  margin: 0.25rem 0 0;\n}\n.reset-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.4rem 0.75rem;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #64748b;\n  background-color: #f8fafc;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.calc-formula-bar {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-top: 0.85rem;\n  padding: 0.5rem 0.75rem;\n  background-color: #f8fafc;\n  border-radius: 8px;\n  border: 1px dashed #cbd5e1;\n  font-size: 0.775rem;\n  flex-wrap: wrap;\n}\n.formula-label {\n  font-weight: 600;\n  color: #475569;\n}\n.formula-code {\n  font-family: monospace;\n  color: #006874;\n  font-weight: 600;\n}\n.calc-body-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1.25rem;\n  align-items: start;\n}\n.inputs-card,\n.results-card,\n.history-view-card {\n  background-color: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 14px;\n  padding: 1.25rem;\n}\n.card-section-title {\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0 0 1rem;\n  padding-bottom: 0.5rem;\n  border-bottom: 1px solid #f1f5f9;\n}\n.form-fields-stack {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.field-row-2 {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.85rem;\n}\n.field-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.field-label {\n  font-size: 0.825rem;\n  font-weight: 600;\n  color: #334155;\n}\n.input-with-unit {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.field-input {\n  width: 100%;\n  padding: 0.55rem 3.5rem 0.55rem 0.75rem;\n  font-size: 0.95rem;\n  font-weight: 500;\n  color: #0f172a;\n  background-color: #f8fafc;\n  border: 1px solid #cbd5e1;\n  border-radius: 9px;\n  outline: none;\n}\n.field-input:focus {\n  background-color: #ffffff;\n  border-color: #006874;\n  box-shadow: 0 0 0 3px rgba(0, 104, 116, 0.15);\n}\n.input-unit {\n  position: absolute;\n  right: 0.75rem;\n  font-size: 0.775rem;\n  font-weight: 600;\n  color: #64748b;\n  pointer-events: none;\n}\n.segmented-control {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  background-color: #f1f5f9;\n  border-radius: 8px;\n  padding: 0.2rem;\n  border: 1px solid #e2e8f0;\n}\n.segment-btn {\n  padding: 0.45rem 0.6rem;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #64748b;\n  background: transparent;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.segment-btn.active {\n  background-color: #ffffff;\n  color: #006874;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);\n}\n.checkbox-options-stack {\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n.check-option-label {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n  padding: 0.65rem 0.75rem;\n  background-color: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.check-box {\n  width: 18px;\n  height: 18px;\n  accent-color: #006874;\n  margin-top: 0.15rem;\n  cursor: pointer;\n}\n.check-text-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n}\n.check-title {\n  font-size: 0.825rem;\n  font-weight: 600;\n  color: #0f172a;\n}\n.check-desc {\n  font-size: 0.725rem;\n  color: #64748b;\n}\n.result-box-container {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 1.15rem;\n  border-radius: 12px;\n  border-width: 2px;\n}\n.result-metric-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.result-number-val {\n  font-size: 2.25rem;\n  font-weight: 800;\n  color: #0f172a;\n  line-height: 1;\n}\n.result-unit-val {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #64748b;\n  margin-left: 0.4rem;\n}\n.result-severity-pill {\n  font-size: 0.8rem;\n  font-weight: 700;\n  padding: 0.35rem 0.75rem;\n  border-radius: 8px;\n  border: 1px solid;\n}\n.secondary-metrics-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 0.75rem;\n}\n.secondary-metric-card {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n  padding: 0.65rem 0.85rem;\n  background-color: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 9px;\n}\n.sec-label {\n  font-size: 0.725rem;\n  font-weight: 600;\n  color: #64748b;\n}\n.sec-value-wrap {\n  display: flex;\n  align-items: baseline;\n  gap: 0.3rem;\n}\n.sec-value {\n  font-size: 1.15rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n.sec-unit {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #64748b;\n}\n.sec-desc {\n  font-size: 0.7rem;\n  color: #94a3b8;\n}\n.clinical-action-box {\n  padding: 0.85rem 1rem;\n  background-color: #ffffff;\n  border: 1px solid #cbd5e1;\n  border-left: 4px solid #006874;\n  border-radius: 8px;\n}\n.action-info-icon {\n  font-size: 1.2rem;\n  color: #006874;\n  flex-shrink: 0;\n}\n.action-heading {\n  display: block;\n  font-size: 0.775rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  color: #006874;\n  margin-bottom: 0.2rem;\n}\n.action-body {\n  font-size: 0.85rem;\n  color: #1e293b;\n  margin: 0;\n  line-height: 1.4;\n}\n.notes-wrap {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n.notes-heading {\n  font-size: 0.725rem;\n  font-weight: 700;\n  color: #64748b;\n  text-transform: uppercase;\n}\n.notes-list {\n  margin: 0;\n  padding-left: 1.15rem;\n  font-size: 0.775rem;\n  color: #475569;\n}\n.result-action-buttons {\n  display: flex;\n  gap: 0.65rem;\n  flex-wrap: wrap;\n  padding-top: 0.5rem;\n  border-top: 1px dashed rgba(0, 0, 0, 0.1);\n}\n.action-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  padding: 0.6rem 1rem;\n  font-size: 0.825rem;\n  font-weight: 600;\n  border-radius: 9px;\n  cursor: pointer;\n  flex: 1;\n  white-space: nowrap;\n}\n.copy-btn {\n  background-color: #006874;\n  color: #ffffff;\n  border: none;\n}\n.copy-btn.copied,\n.save-btn.saved {\n  background-color: #d1fae5;\n  color: #065f46;\n  border-color: #a7f3d0;\n}\n.save-btn {\n  background-color: #ffffff;\n  color: #0f172a;\n  border: 1px solid #cbd5e1;\n}\n.btn-icon {\n  font-size: 1rem;\n}\n.incomplete-inputs-state,\n.empty-history-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3rem 1.5rem;\n  text-align: center;\n  color: #94a3b8;\n}\n.incomplete-inputs-state {\n  background-color: #f8fafc;\n  border: 1px dashed #cbd5e1;\n  border-radius: 12px;\n}\n.incomplete-icon,\n.empty-hist-icon {\n  font-size: 2.2rem;\n  margin-bottom: 0.75rem;\n}\n.incomplete-title,\n.empty-hist-title {\n  font-size: 1rem;\n  font-weight: 700;\n  color: #334155;\n  margin: 0 0 0.25rem;\n}\n.incomplete-text,\n.empty-hist-desc {\n  font-size: 0.825rem;\n  color: #64748b;\n  max-width: 340px;\n  margin: 0;\n}\n.history-header-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-wrap: wrap;\n  padding-bottom: 0.75rem;\n  border-bottom: 1px solid #f1f5f9;\n}\n.history-title {\n  font-size: 1.2rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0;\n}\n.history-subtitle {\n  font-size: 0.85rem;\n  color: #64748b;\n  margin: 0.2rem 0 0;\n}\n.clear-history-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.45rem 0.85rem;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #dc2626;\n  background-color: #fef2f2;\n  border: 1px solid #fecaca;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.history-list-wrap {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.history-item-card {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  padding: 1rem;\n  background-color: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n}\n.history-item-top,\n.history-item-content {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.history-calc-badge {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: #006874;\n  background-color: #e0f2fe;\n  padding: 0.2rem 0.55rem;\n  border-radius: 6px;\n}\n.history-patient-badge {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #065f46;\n  background-color: #d1fae5;\n  padding: 0.2rem 0.55rem;\n  border-radius: 6px;\n}\n.history-date {\n  font-size: 0.75rem;\n  color: #64748b;\n}\n.history-res-group {\n  display: flex;\n  align-items: baseline;\n  gap: 0.6rem;\n  flex-wrap: wrap;\n}\n.history-headline {\n  font-size: 1.15rem;\n  font-weight: 800;\n  color: #0f172a;\n}\n.history-interpretation {\n  font-size: 0.825rem;\n  font-weight: 600;\n  color: #475569;\n}\n.history-copy-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.4rem 0.75rem;\n  font-size: 0.775rem;\n  font-weight: 600;\n  color: #006874;\n  background-color: #ffffff;\n  border: 1px solid #cbd5e1;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.history-del-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.4rem 0.55rem;\n  font-size: 0.85rem;\n  color: #94a3b8;\n  background-color: #ffffff;\n  border: 1px solid #cbd5e1;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.history-del-btn:hover {\n  color: #dc2626;\n}\n.history-preview-box {\n  margin: 0;\n  padding: 0.65rem 0.85rem;\n  background-color: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 6px;\n  font-size: 0.75rem;\n  font-family: monospace;\n  color: #334155;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n@media (max-width: 1024px) {\n  .calculators-grid-layout {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 768px) {\n  .calc-body-grid {\n    grid-template-columns: 1fr;\n  }\n  .patient-context-banner {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .autofill-action-btn {\n    width: 100%;\n    justify-content: center;\n  }\n}\n.customize-panel-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.45rem 0.85rem;\n  background-color: #f8fafc;\n  color: #334155;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  font-size: 0.825rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.customize-panel-btn:hover {\n  background-color: #f1f5f9;\n  border-color: #94a3b8;\n  color: #0f172a;\n}\n.my-calculators-bar {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.6rem 0.85rem;\n  background-color: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  overflow-x: auto;\n}\n.bar-title {\n  font-size: 0.8rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: #64748b;\n  white-space: nowrap;\n}\n.favorite-pills-row {\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  flex-wrap: nowrap;\n}\n.fav-pill-btn {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.35rem 0.75rem;\n  background-color: #f8fafc;\n  border: 1px solid #cbd5e1;\n  border-radius: 6px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #334155;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: all 0.15s ease;\n}\n.fav-pill-btn:hover {\n  border-color: #006874;\n  color: #006874;\n  background-color: #f0fdfa;\n}\n.fav-pill-btn.active {\n  background-color: #006874;\n  border-color: #006874;\n  color: #ffffff;\n  box-shadow: 0 1px 2px rgba(0, 104, 116, 0.25);\n}\n.add-calc-pill-btn {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.35rem 0.65rem;\n  background: transparent;\n  border: 1px dashed #94a3b8;\n  border-radius: 6px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #64748b;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: all 0.15s ease;\n}\n.add-calc-pill-btn:hover {\n  border-color: #006874;\n  color: #006874;\n}\n.fav-star-dot {\n  color: #eab308;\n  font-size: 0.75rem;\n}\n.autofill-notification {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.65rem 1rem;\n  border-radius: 8px;\n  font-size: 0.85rem;\n  font-weight: 500;\n  animation: fadeIn 0.2s ease-in-out;\n}\n.autofill-notification.severity-success {\n  background-color: #f0fdf4;\n  border: 1px solid #bbf7d0;\n  color: #166534;\n}\n.autofill-notification.severity-warning {\n  background-color: #fffbeb;\n  border: 1px solid #fde68a;\n  color: #92400e;\n}\n.autofill-notification.severity-info {\n  background-color: #f0f9ff;\n  border: 1px solid #bae6fd;\n  color: #075985;\n}\n.history-filter-bar {\n  display: flex;\n  align-items: flex-end;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n  padding: 0.85rem;\n  margin-bottom: 1rem;\n  background-color: #f8fafc;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n}\n.filter-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.filter-label {\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #64748b;\n}\n.filter-select,\n.filter-date-input {\n  padding: 0.4rem 0.65rem;\n  font-size: 0.825rem;\n  border: 1px solid #cbd5e1;\n  border-radius: 6px;\n  background-color: #ffffff;\n  color: #1e293b;\n}\n.history-reload-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.45rem 0.85rem;\n  background-color: #006874;\n  color: #ffffff;\n  border: none;\n  border-radius: 6px;\n  font-size: 0.825rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.history-reload-btn:hover {\n  background-color: #00515b;\n}\n.history-result-badge {\n  padding: 0.2rem 0.5rem;\n  background-color: #e0f2fe;\n  color: #0369a1;\n  border-radius: 6px;\n  font-weight: 700;\n  font-size: 0.8rem;\n}\n.history-severity-tag {\n  padding: 0.15rem 0.45rem;\n  border-radius: 4px;\n  font-size: 0.675rem;\n  font-weight: 800;\n  letter-spacing: 0.03em;\n}\n.history-severity-tag.severity-normal {\n  background-color: #dcfce7;\n  color: #15803d;\n}\n.history-severity-tag.severity-warning {\n  background-color: #fef3c7;\n  color: #b45309;\n}\n.history-severity-tag.severity-danger {\n  background-color: #fee2e2;\n  color: #b91c1c;\n}\n.expand-chevron-btn {\n  border: none;\n  background: transparent;\n  color: #64748b;\n  font-size: 1.1rem;\n  cursor: pointer;\n}\n.history-expanded-body {\n  margin-top: 0.75rem;\n  padding: 0.85rem;\n  background-color: #f8fafc;\n  border-radius: 8px;\n  border: 1px solid #e2e8f0;\n}\n.snapshot-section-title {\n  margin: 0 0 0.5rem;\n  font-size: 0.775rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  color: #475569;\n}\n.snapshot-badges-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n}\n.snapshot-param-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.25rem 0.6rem;\n  background-color: #ffffff;\n  border: 1px solid #cbd5e1;\n  border-radius: 6px;\n  font-size: 0.775rem;\n}\n.chip-key {\n  font-weight: 600;\n  color: #64748b;\n}\n.chip-val {\n  font-weight: 700;\n  color: #0f172a;\n}\n.no-patient-history-notice {\n  text-align: center;\n  padding: 2.5rem 1.5rem;\n  background-color: #f8fafc;\n  border: 1px dashed #cbd5e1;\n  border-radius: 12px;\n  margin-bottom: 1.5rem;\n}\n.notice-icon-badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  background-color: #e2e8f0;\n  color: #64748b;\n  font-size: 1.5rem;\n  margin-bottom: 0.75rem;\n}\n.notice-title {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #1e293b;\n  margin: 0 0 0.4rem;\n}\n.notice-desc {\n  font-size: 0.85rem;\n  color: #64748b;\n  max-width: 500px;\n  margin: 0 auto;\n}\n.loading-history-state {\n  text-align: center;\n  padding: 3rem 1rem;\n  color: #64748b;\n  font-size: 0.9rem;\n}\n.local-history-heading {\n  font-size: 0.9rem;\n  font-weight: 700;\n  color: #475569;\n  margin: 1.5rem 0 0.75rem;\n}\n.modal-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 999;\n  background-color: rgba(15, 23, 42, 0.55);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  animation: fadeIn 0.15s ease-out;\n}\n.catalog-modal-dialog {\n  background-color: #ffffff;\n  border-radius: 14px;\n  width: 100%;\n  max-width: 860px;\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.08);\n}\n.modal-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  padding: 1.25rem 1.5rem;\n  border-bottom: 1px solid #e2e8f0;\n}\n.modal-title {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0;\n}\n.modal-subtitle {\n  font-size: 0.825rem;\n  color: #64748b;\n  margin: 0.2rem 0 0;\n}\n.modal-close-btn {\n  border: none;\n  background: transparent;\n  color: #64748b;\n  font-size: 1.3rem;\n  cursor: pointer;\n  padding: 0.2rem;\n  border-radius: 6px;\n}\n.modal-close-btn:hover {\n  background-color: #f1f5f9;\n  color: #0f172a;\n}\n.modal-toolbar {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  padding: 1rem 1.5rem;\n  background-color: #f8fafc;\n  border-bottom: 1px solid #e2e8f0;\n}\n.modal-search-box {\n  position: relative;\n  width: 100%;\n}\n.modal-search-icon {\n  position: absolute;\n  left: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #94a3b8;\n}\n.modal-search-input {\n  width: 100%;\n  padding: 0.5rem 0.85rem 0.5rem 2.2rem;\n  font-size: 0.875rem;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  background-color: #ffffff;\n}\n.modal-category-chips {\n  display: flex;\n  gap: 0.4rem;\n  overflow-x: auto;\n}\n.modal-chip {\n  padding: 0.3rem 0.7rem;\n  font-size: 0.775rem;\n  font-weight: 600;\n  border: 1px solid #cbd5e1;\n  background-color: #ffffff;\n  color: #475569;\n  border-radius: 6px;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.modal-chip.active {\n  background-color: #006874;\n  border-color: #006874;\n  color: #ffffff;\n}\n.modal-catalog-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  gap: 1rem;\n  padding: 1.25rem 1.5rem;\n  overflow-y: auto;\n  max-height: calc(90vh - 240px);\n}\n.catalog-card {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: 1rem;\n  border-radius: 10px;\n  border: 1px solid #e2e8f0;\n  background-color: #ffffff;\n  transition: all 0.15s ease;\n}\n.catalog-card:hover {\n  border-color: #94a3b8;\n}\n.catalog-card.is-active {\n  border-color: #006874;\n  background-color: #f0fdfa;\n}\n.card-header-line {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.5rem;\n}\n.catalog-cat-badge {\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  color: #006874;\n  background-color: #ccfbf1;\n  padding: 0.15rem 0.45rem;\n  border-radius: 4px;\n}\n.active-indicator-tag {\n  font-size: 0.7rem;\n  font-weight: 700;\n  color: #059669;\n}\n.catalog-card-name {\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0 0 0.4rem;\n}\n.catalog-card-desc {\n  font-size: 0.78rem;\n  color: #64748b;\n  margin: 0 0 0.6rem;\n  line-height: 1.35;\n}\n.catalog-card-formula {\n  background-color: #f1f5f9;\n  padding: 0.4rem 0.6rem;\n  border-radius: 6px;\n  margin-bottom: 0.85rem;\n  word-break: break-all;\n}\n.card-footer-action {\n  margin-top: auto;\n}\n.panel-action-btn {\n  width: 100%;\n  padding: 0.45rem 0.75rem;\n  font-size: 0.8rem;\n  font-weight: 600;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.panel-action-btn.add-btn {\n  background-color: #006874;\n  color: #ffffff;\n  border: none;\n}\n.panel-action-btn.add-btn:hover {\n  background-color: #00515b;\n}\n.panel-action-btn.remove-btn {\n  background-color: #ffffff;\n  color: #dc2626;\n  border: 1px solid #fca5a5;\n}\n.panel-action-btn.remove-btn:hover {\n  background-color: #fef2f2;\n}\n.modal-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1.5rem;\n  border-top: 1px solid #e2e8f0;\n  background-color: #f8fafc;\n}\n.restore-defaults-btn {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.45rem 0.85rem;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #475569;\n  background: transparent;\n  border: 1px solid #cbd5e1;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.restore-defaults-btn:hover {\n  background-color: #f1f5f9;\n  color: #0f172a;\n}\n.modal-done-btn {\n  padding: 0.45rem 1.25rem;\n  font-size: 0.85rem;\n  font-weight: 600;\n  background-color: #006874;\n  color: #ffffff;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.modal-done-btn:hover {\n  background-color: #00515b;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.98);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n/*# sourceMappingURL=medical-calculators.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MedicalCalculatorsComponent, { className: "MedicalCalculatorsComponent", filePath: "src/app/features/medical-calculators/medical-calculators.component.ts", lineNumber: 113 });
})();
export {
  MedicalCalculatorsComponent
};
//# debugId=05cf9d30-5552-554b-bb48-10ae9b5da47c
//# sourceMappingURL=chunk-ISOF77F6.js.map
