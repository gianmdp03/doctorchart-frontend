import {
  isWizardFieldVisible
} from "./chunk-X5CFNW5T.js";
import {
  DatePickerComponent
} from "./chunk-6MFCUZUR.js";
import {
  instantParts,
  todayDate
} from "./chunk-YTAXUAO7.js";
import {
  isBirthDateField,
  parseNumberInput,
  validIsoDate,
  wizardFieldError
} from "./chunk-D4J4ETKO.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-BQIFWLNB.js";
import {
  Component,
  Input,
  Output,
  __spreadProps,
  __spreadValues,
  computed,
  effect,
  input,
  output,
  setClassMetadata,
  signal,
  untracked,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-3HO5VEWU.js";

// src/app/features/dynamic-form-renderer/dynamic-form-renderer.component.ts
var _c0 = () => [];
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.value;
function DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1, "*");
    \u0275\u0275elementEnd();
  }
}
function DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "output", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r1 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.formulaText(field_r1));
  }
}
function DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r1 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("is-empty", ctx_r1.currentValues()[field_r1.key] == null || ctx_r1.currentValues()[field_r1.key] === "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r1.displayValue(field_r1), "", field_r1.unit && ctx_r1.currentValues()[field_r1.key] != null ? " " + field_r1.unit : "");
  }
}
function DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 16);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_0_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const field_r1 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setValue(field_r1, $event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r1 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("id", "field-" + field_r1.key)("ngModel", ctx_r1.currentValues()[field_r1.key] ?? "")("placeholder", field_r1.placeholder ?? "");
    \u0275\u0275control();
  }
}
function DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "textarea", 17);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_1_Template_textarea_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const field_r1 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setValue(field_r1, $event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r1 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("id", "field-" + field_r1.key)("ngModel", ctx_r1.currentValues()[field_r1.key] ?? "")("placeholder", field_r1.placeholder ?? "");
    \u0275\u0275control();
  }
}
function DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r1 = \u0275\u0275nextContext(4).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(field_r1.unit);
  }
}
function DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "input", 18);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_2_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const field_r1 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setNumberValue(field_r1, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_2_Conditional_2_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r1 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("id", "field-" + field_r1.key)("ngModel", ctx_r1.numberInput(field_r1))("placeholder", field_r1.placeholder ?? "");
    \u0275\u0275attribute("aria-invalid", !!ctx_r1.fieldError(field_r1))("aria-describedby", ctx_r1.fieldError(field_r1) ? "error-" + field_r1.key : null);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r1.unit ? 2 : -1);
  }
}
function DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-date-picker", 19);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_3_Template_app_date_picker_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const field_r1 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setValue(field_r1, $event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r1 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("showError", false)("ngModel", ctx_r1.currentValues()[field_r1.key] ?? "")("max", ctx_r1.isBirthDateField(field_r1.key) ? ctx_r1.todayIso : null);
    \u0275\u0275control();
  }
}
function DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_4_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r8 = ctx.$implicit;
    \u0275\u0275property("value", option_r8.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(option_r8.label);
  }
}
function DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 20);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_4_Template_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const field_r1 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setValue(field_r1, $event));
    });
    \u0275\u0275elementStart(1, "option", 21);
    \u0275\u0275text(2, "Seleccionar");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_4_For_4_Template, 2, 2, "option", 22, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r1 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("id", "field-" + field_r1.key)("ngModel", ctx_r1.currentValues()[field_r1.key] ?? null);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(field_r1.options ?? \u0275\u0275pureFunction0(3, _c0));
  }
}
function DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 20);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_5_Template_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const field_r1 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setValue(field_r1, $event));
    });
    \u0275\u0275elementStart(1, "option", 21);
    \u0275\u0275text(2, "Sin respuesta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "option", 21);
    \u0275\u0275text(4, "S\xED");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "option", 21);
    \u0275\u0275text(6, "No");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const field_r1 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("id", "field-" + field_r1.key)("ngModel", ctx_r1.currentValues()[field_r1.key] ?? null);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", false);
  }
}
function DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r1 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275property("id", "error-" + field_r1.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_0_Template, 1, 3, "input", 10)(1, DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_1_Template, 1, 3, "textarea", 11)(2, DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_2_Template, 3, 6, "div", 12)(3, DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_3_Template, 1, 3, "app-date-picker", 13)(4, DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_4_Template, 5, 4, "select", 14)(5, DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Case_5_Template, 7, 5, "select", 14);
    \u0275\u0275conditionalCreate(6, DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Conditional_6_Template, 2, 2, "span", 15);
  }
  if (rf & 2) {
    let tmp_22_0;
    let tmp_23_0;
    const field_r1 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional((tmp_22_0 = field_r1.type) === "TEXT" ? 0 : tmp_22_0 === "TEXTAREA" ? 1 : tmp_22_0 === "NUMBER" ? 2 : tmp_22_0 === "DATE" ? 3 : tmp_22_0 === "SELECT" ? 4 : tmp_22_0 === "BOOLEAN" ? 5 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275conditional((tmp_23_0 = ctx_r1.fieldError(field_r1)) ? 6 : -1, tmp_23_0);
  }
}
function DynamicFormRendererComponent_For_2_For_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "label");
    \u0275\u0275text(2);
    \u0275\u0275conditionalCreate(3, DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_3_Template, 2, 0, "span", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_4_Template, 2, 1, "output", 7)(5, DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_5_Template, 2, 4, "p", 8)(6, DynamicFormRendererComponent_For_2_For_5_Conditional_0_Conditional_6_Template, 7, 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("wide", field_r1.type === "TEXTAREA")("has-error", !ctx_r1.readonly() && !!ctx_r1.fieldError(field_r1));
    \u0275\u0275attribute("data-field-key", field_r1.key);
    \u0275\u0275advance();
    \u0275\u0275attribute("for", "field-" + field_r1.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", field_r1.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r1.required && field_r1.type !== "FORMULA" && !ctx_r1.readonly() ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r1.type === "FORMULA" ? 4 : ctx_r1.readonly() ? 5 : 6);
  }
}
function DynamicFormRendererComponent_For_2_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DynamicFormRendererComponent_For_2_For_5_Conditional_0_Template, 7, 9, "div", 4);
  }
  if (rf & 2) {
    const field_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.isFieldVisible(field_r1.key) ? 0 : -1);
  }
}
function DynamicFormRendererComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 1)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 3);
    \u0275\u0275repeaterCreate(4, DynamicFormRendererComponent_For_2_For_5_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const category_r10 = ctx.$implicit;
    \u0275\u0275attribute("data-category-key", category_r10.key);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(category_r10.title);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(category_r10.fields);
  }
}
function DynamicFormRendererComponent_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1, "No hay categor\xEDas activas en este formulario.");
    \u0275\u0275elementEnd();
  }
}
var inputValues = (definition, values) => Object.fromEntries(definition.categories.flatMap((category) => category.fields).filter((field) => field.type !== "FORMULA" && Object.prototype.hasOwnProperty.call(values, field.key)).map((field) => [field.key, values[field.key]]));
var DynamicFormRendererComponent = class _DynamicFormRendererComponent {
  definition = input(
    { categories: [] },
    ...ngDevMode ? [{ debugName: "definition" }] : (
      /* istanbul ignore next */
      []
    )
  );
  values = input(
    {},
    ...ngDevMode ? [{ debugName: "values" }] : (
      /* istanbul ignore next */
      []
    )
  );
  formulaResults = input(
    {},
    ...ngDevMode ? [{ debugName: "formulaResults" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readonly = input(
    false,
    ...ngDevMode ? [{ debugName: "readonly" }] : (
      /* istanbul ignore next */
      []
    )
  );
  valuesChange = output();
  validityChange = output();
  currentValues = signal(
    {},
    ...ngDevMode ? [{ debugName: "currentValues" }] : (
      /* istanbul ignore next */
      []
    )
  );
  rawNumbers = signal(
    {},
    ...ngDevMode ? [{ debugName: "rawNumbers" }] : (
      /* istanbul ignore next */
      []
    )
  );
  resultValues = signal(
    {},
    ...ngDevMode ? [{ debugName: "resultValues" }] : (
      /* istanbul ignore next */
      []
    )
  );
  enabledCategories = computed(
    () => this.definition().categories.filter((category) => category.enabled),
    ...ngDevMode ? [{ debugName: "enabledCategories" }] : (
      /* istanbul ignore next */
      []
    )
  );
  fields = computed(
    () => this.definition().categories.flatMap((category) => category.fields),
    ...ngDevMode ? [{ debugName: "fields" }] : (
      /* istanbul ignore next */
      []
    )
  );
  todayIso = todayDate();
  formValid = computed(
    () => this.fields().every((field) => !this.isFieldVisible(field.key) || this.validField(field)),
    ...ngDevMode ? [{ debugName: "formValid" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      const definition = this.definition(), values = inputValues(definition, this.values());
      untracked(() => {
        this.currentValues.set(structuredClone(values));
        this.rawNumbers.update((raw) => Object.fromEntries(Object.entries(raw).filter(([key, text]) => definition.categories.some((category) => category.fields.some((field) => field.key === key && field.type === "NUMBER")) && Object.is(parseNumberInput(text), values[key]))));
      });
    });
    effect(() => {
      this.formulaResults();
      untracked(() => this.resultValues.set(structuredClone(this.values())));
    });
    effect(() => this.validityChange.emit(this.formValid()));
  }
  setValue(field, value) {
    if (this.readonly() || field.type === "FORMULA")
      return;
    this.rawNumbers.update((raw) => {
      const next = __spreadValues({}, raw);
      delete next[field.key];
      return next;
    });
    this.currentValues.update((values) => __spreadProps(__spreadValues({}, values), { [field.key]: value === "" ? null : value }));
    this.valuesChange.emit(structuredClone(inputValues(this.definition(), this.currentValues())));
  }
  isFieldVisible(key) {
    return isWizardFieldVisible(this.definition(), this.currentValues(), key);
  }
  setNumberValue(field, raw) {
    if (this.readonly())
      return;
    this.setValue(field, parseNumberInput(raw));
    this.rawNumbers.update((values) => __spreadProps(__spreadValues({}, values), { [field.key]: raw }));
  }
  numberInput(field) {
    return this.rawNumbers()[field.key] ?? this.currentValues()[field.key] ?? "";
  }
  fieldError(field) {
    return wizardFieldError(field, this.currentValues()[field.key], this.todayIso);
  }
  validField(field) {
    return !this.fieldError(field);
  }
  isBirthDateField(key) {
    return isBirthDateField(key);
  }
  displayValue(field) {
    const value = this.currentValues()[field.key];
    if (value === null || value === void 0 || value === "")
      return "Sin respuesta";
    if (field.type === "BOOLEAN")
      return value === true ? "S\xED" : value === false ? "No" : "Respuesta inv\xE1lida";
    if (field.type === "DATE" && validIsoDate(value)) {
      const [year, month, day] = value.split("-");
      return `${day}/${month}/${year}`;
    }
    if (field.type === "SELECT")
      return field.options?.find((option) => option.value === value)?.label ?? "Respuesta inv\xE1lida";
    return String(value);
  }
  formulaText(field) {
    const result = this.formulaResults()[field.key];
    if (!result)
      return "Se calcula al guardar";
    if (JSON.stringify(inputValues(this.definition(), this.resultValues())) !== JSON.stringify(this.currentValues()))
      return "Se actualizar\xE1 al guardar";
    const labels = { READY: "Resultado disponible", MISSING_INPUT: "Faltan datos para calcular", DIVISION_BY_ZERO: "No se puede dividir por cero", NOT_APPLICABLE: "No corresponde calcular", INVALID_INPUT: "Revis\xE1 los datos del c\xE1lculo" };
    if (result.status === "READY" && typeof result.value === "number" && Number.isFinite(result.value))
      return new Intl.NumberFormat("es-AR", { maximumFractionDigits: 6 }).format(result.value) + (field.unit ? ` ${field.unit}` : "");
    return labels[result.status] ?? "Resultado no disponible";
  }
  static \u0275fac = function DynamicFormRendererComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DynamicFormRendererComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DynamicFormRendererComponent, selectors: [["app-dynamic-form-renderer"]], inputs: { definition: [1, "definition"], values: [1, "values"], formulaResults: [1, "formulaResults"], readonly: [1, "readonly"] }, outputs: { valuesChange: "valuesChange", validityChange: "validityChange" }, decls: 4, vars: 3, consts: [[1, "dynamic-form"], [1, "form-category"], [1, "empty-form"], [1, "fields-grid"], [1, "field", 3, "wide", "has-error"], [1, "field"], ["aria-label", "Obligatorio"], [1, "formula-result"], [1, "saved-value", 3, "is-empty"], [1, "saved-value"], [3, "id", "ngModel", "placeholder"], ["rows", "3", 3, "id", "ngModel", "placeholder"], [1, "number-with-unit"], [3, "showError", "ngModel", "max"], [3, "id", "ngModel"], ["role", "alert", 1, "field-error", 3, "id"], [3, "ngModelChange", "id", "ngModel", "placeholder"], ["rows", "3", 3, "ngModelChange", "id", "ngModel", "placeholder"], ["type", "text", "inputmode", "decimal", 3, "ngModelChange", "id", "ngModel", "placeholder"], [3, "ngModelChange", "showError", "ngModel", "max"], [3, "ngModelChange", "id", "ngModel"], [3, "ngValue"], [3, "value"]], template: function DynamicFormRendererComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275repeaterCreate(1, DynamicFormRendererComponent_For_2_Template, 6, 2, "section", 1, _forTrack0, false, DynamicFormRendererComponent_ForEmpty_3_Template, 2, 0, "p", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("is-readonly", ctx.readonly());
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.enabledCategories());
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, DatePickerComponent], styles: ["\n.form-category[_ngcontent-%COMP%] {\n  margin: 0 0 24px;\n}\n.form-category[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n  color: var(--%NS%dc-ink-secondary, #334155);\n  font-size: 1rem;\n  border-bottom: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  padding-bottom: 10px;\n}\n.fields-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 16px;\n}\n.field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  min-width: 0;\n}\n.field.wide[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: .875rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink-secondary, #475569);\n}\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], \n.field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  width: 100%;\n  font: inherit;\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 8px;\n  padding: 10px;\n  background: var(--%NS%dc-surface, white);\n  color: var(--%NS%dc-ink, #0f172a);\n}\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus, \n.field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  outline: 2px solid #a5b4fc;\n  outline-offset: 2px;\n}\n.number-with-unit[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.number-with-unit[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink-muted, #64748b);\n  font-size: .8rem;\n}\n.saved-value[_ngcontent-%COMP%] {\n  margin: 0;\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n.formula-result[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n  padding: 11px;\n  border-radius: 8px;\n  color: var(--%NS%dc-ink-secondary, #475569);\n}\n.field-error[_ngcontent-%COMP%] {\n  font-size: .8rem;\n  color: var(--%NS%dc-error-ink, #b91c1c);\n}\n.empty-form[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n@media (max-width: 600px) {\n  .fields-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.is-readonly[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.is-readonly[_ngcontent-%COMP%]   .form-category[_ngcontent-%COMP%] {\n  margin: 0;\n  background: var(--%NS%dc-surface, #fff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 14px;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, .05);\n  overflow: hidden;\n}\n.is-readonly[_ngcontent-%COMP%]   .form-category[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 14px 20px;\n  background: var(--%NS%dc-surface, #fff);\n  border-bottom: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  color: var(--%NS%dc-ink-secondary, #334155);\n  font-size: .8rem;\n  font-weight: 700;\n  letter-spacing: .06em;\n  text-transform: uppercase;\n}\n.is-readonly[_ngcontent-%COMP%]   .fields-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));\n  gap: 0;\n  padding: 6px;\n}\n.is-readonly[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%] {\n  gap: 4px;\n  padding: 12px 14px;\n  margin: 4px;\n  border-radius: 10px;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  border: 1px solid transparent;\n  transition: background .15s ease, border-color .15s ease;\n}\n.is-readonly[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n  border-color: var(--%NS%dc-outline, #e2e8f0);\n}\n.is-readonly[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: .7rem;\n  font-weight: 600;\n  letter-spacing: .05em;\n  text-transform: uppercase;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.is-readonly[_ngcontent-%COMP%]   .saved-value[_ngcontent-%COMP%] {\n  font-size: .98rem;\n  font-weight: 500;\n  color: var(--%NS%dc-ink, #0f172a);\n  line-height: 1.4;\n}\n.is-readonly[_ngcontent-%COMP%]   .saved-value.is-empty[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink-muted, #94a3b8);\n  font-weight: 400;\n  font-style: italic;\n  font-size: .88rem;\n}\n.is-readonly[_ngcontent-%COMP%]   .field.wide[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.is-readonly[_ngcontent-%COMP%]   .formula-result[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface, #fff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  color: var(--%NS%dc-ink, #0f172a);\n  font-weight: 600;\n}\n.field.has-error[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.field.has-error[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%], \n.field.has-error[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  border-color: #b91c1c;\n}\n/*# sourceMappingURL=dynamic-form-renderer.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DynamicFormRendererComponent, [{
    type: Component,
    args: [{ selector: "app-dynamic-form-renderer", imports: [FormsModule, DatePickerComponent], template: `<div class="dynamic-form" [class.is-readonly]="readonly()">\r
  @for (category of enabledCategories(); track category.key) {\r
    <section class="form-category" [attr.data-category-key]="category.key"><h3>{{ category.title }}</h3><div class="fields-grid">\r
      @for (field of category.fields; track field.key) {\r
        @if (isFieldVisible(field.key)) {\r
          <div class="field" [class.wide]="field.type === 'TEXTAREA'" [class.has-error]="!readonly() && !!fieldError(field)" [attr.data-field-key]="field.key">\r
            <label [attr.for]="'field-' + field.key">{{ field.label }} @if (field.required && field.type !== 'FORMULA' && !readonly()) { <span aria-label="Obligatorio">*</span> }</label>\r
            @if (field.type === 'FORMULA') { <output class="formula-result">{{ formulaText(field) }}</output> }\r
            @else if (readonly()) { <p class="saved-value" [class.is-empty]="currentValues()[field.key] == null || currentValues()[field.key] === ''">{{ displayValue(field) }}{{ field.unit && currentValues()[field.key] != null ? ' ' + field.unit : '' }}</p> }\r
            @else {\r
              @switch (field.type) {\r
                @case ('TEXT') { <input [id]="'field-' + field.key" [ngModel]="currentValues()[field.key] ?? ''" (ngModelChange)="setValue(field, $event)" [placeholder]="field.placeholder ?? ''" /> }\r
                @case ('TEXTAREA') { <textarea [id]="'field-' + field.key" rows="3" [ngModel]="currentValues()[field.key] ?? ''" (ngModelChange)="setValue(field, $event)" [placeholder]="field.placeholder ?? ''"></textarea> }\r
                @case ('NUMBER') { <div class="number-with-unit"><input type="text" inputmode="decimal" [id]="'field-' + field.key" [ngModel]="numberInput(field)" (ngModelChange)="setNumberValue(field, $event)" [attr.aria-invalid]="!!fieldError(field)" [attr.aria-describedby]="fieldError(field) ? 'error-' + field.key : null" [placeholder]="field.placeholder ?? ''" />@if (field.unit) { <span>{{ field.unit }}</span> }</div> }\r
                @case ('DATE') { <app-date-picker [showError]="false" [ngModel]="$any(currentValues()[field.key] ?? '')" (ngModelChange)="setValue(field, $event)" [max]="isBirthDateField(field.key) ? todayIso : null" /> }\r
                @case ('SELECT') { <select [id]="'field-' + field.key" [ngModel]="currentValues()[field.key] ?? null" (ngModelChange)="setValue(field, $event)"><option [ngValue]="null">Seleccionar</option>@for (option of field.options ?? []; track option.value) { <option [value]="option.value">{{ option.label }}</option> }</select> }\r
                @case ('BOOLEAN') { <select [id]="'field-' + field.key" [ngModel]="currentValues()[field.key] ?? null" (ngModelChange)="setValue(field, $event)"><option [ngValue]="null">Sin respuesta</option><option [ngValue]="true">S\xED</option><option [ngValue]="false">No</option></select> }\r
              }\r
              @if (fieldError(field); as error) { <span class="field-error" [id]="'error-' + field.key" role="alert">{{ error }}</span> }\r
            }\r
          </div>\r
        }\r
      }\r
    </div></section>\r
  } @empty { <p class="empty-form">No hay categor\xEDas activas en este formulario.</p> }\r
</div>\r
`, styles: ["/* src/app/features/dynamic-form-renderer/dynamic-form-renderer.component.css */\n.form-category {\n  margin: 0 0 24px;\n}\n.form-category h3 {\n  margin: 0 0 16px;\n  color: var(--dc-ink-secondary, #334155);\n  font-size: 1rem;\n  border-bottom: 1px solid var(--dc-outline, #e2e8f0);\n  padding-bottom: 10px;\n}\n.fields-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 16px;\n}\n.field {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  min-width: 0;\n}\n.field.wide {\n  grid-column: 1/-1;\n}\n.field label {\n  font-size: .875rem;\n  font-weight: 600;\n  color: var(--dc-ink-secondary, #475569);\n}\n.field input,\n.field textarea,\n.field select {\n  box-sizing: border-box;\n  width: 100%;\n  font: inherit;\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  border-radius: 8px;\n  padding: 10px;\n  background: var(--dc-surface, white);\n  color: var(--dc-ink, #0f172a);\n}\n.field input:focus,\n.field textarea:focus,\n.field select:focus {\n  outline: 2px solid #a5b4fc;\n  outline-offset: 2px;\n}\n.number-with-unit {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.number-with-unit span {\n  color: var(--dc-ink-muted, #64748b);\n  font-size: .8rem;\n}\n.saved-value {\n  margin: 0;\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n.formula-result {\n  background: var(--dc-surface-high, #f1f5f9);\n  padding: 11px;\n  border-radius: 8px;\n  color: var(--dc-ink-secondary, #475569);\n}\n.field-error {\n  font-size: .8rem;\n  color: var(--dc-error-ink, #b91c1c);\n}\n.empty-form {\n  color: var(--dc-ink-muted, #64748b);\n}\n@media (max-width: 600px) {\n  .fields-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.is-readonly {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.is-readonly .form-category {\n  margin: 0;\n  background: var(--dc-surface, #fff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 14px;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, .05);\n  overflow: hidden;\n}\n.is-readonly .form-category h3 {\n  margin: 0;\n  padding: 14px 20px;\n  background: var(--dc-surface, #fff);\n  border-bottom: 1px solid var(--dc-outline, #e2e8f0);\n  color: var(--dc-ink-secondary, #334155);\n  font-size: .8rem;\n  font-weight: 700;\n  letter-spacing: .06em;\n  text-transform: uppercase;\n}\n.is-readonly .fields-grid {\n  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));\n  gap: 0;\n  padding: 6px;\n}\n.is-readonly .field {\n  gap: 4px;\n  padding: 12px 14px;\n  margin: 4px;\n  border-radius: 10px;\n  background: var(--dc-surface-low, #f8fafc);\n  border: 1px solid transparent;\n  transition: background .15s ease, border-color .15s ease;\n}\n.is-readonly .field:hover {\n  background: var(--dc-surface-high, #f1f5f9);\n  border-color: var(--dc-outline, #e2e8f0);\n}\n.is-readonly .field label {\n  font-size: .7rem;\n  font-weight: 600;\n  letter-spacing: .05em;\n  text-transform: uppercase;\n  color: var(--dc-ink-muted, #64748b);\n}\n.is-readonly .saved-value {\n  font-size: .98rem;\n  font-weight: 500;\n  color: var(--dc-ink, #0f172a);\n  line-height: 1.4;\n}\n.is-readonly .saved-value.is-empty {\n  color: var(--dc-ink-muted, #94a3b8);\n  font-weight: 400;\n  font-style: italic;\n  font-size: .88rem;\n}\n.is-readonly .field.wide {\n  grid-column: 1/-1;\n}\n.is-readonly .formula-result {\n  background: var(--dc-surface, #fff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  color: var(--dc-ink, #0f172a);\n  font-weight: 600;\n}\n.field.has-error input,\n.field.has-error textarea,\n.field.has-error select {\n  border-color: #b91c1c;\n}\n/*# sourceMappingURL=dynamic-form-renderer.component.css.map */\n"] }]
  }], () => [], { definition: [{ type: Input, args: [{ isSignal: true, alias: "definition", required: false }] }], values: [{ type: Input, args: [{ isSignal: true, alias: "values", required: false }] }], formulaResults: [{ type: Input, args: [{ isSignal: true, alias: "formulaResults", required: false }] }], readonly: [{ type: Input, args: [{ isSignal: true, alias: "readonly", required: false }] }], valuesChange: [{ type: Output, args: ["valuesChange"] }], validityChange: [{ type: Output, args: ["validityChange"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DynamicFormRendererComponent, { className: "DynamicFormRendererComponent", filePath: "src/app/features/dynamic-form-renderer/dynamic-form-renderer.component.ts", lineNumber: 15 });
})();

// src/app/features/dynamic-form-renderer/clinical-form-ui.ts
function retainCompatibleValues(previous, next, values) {
  const old = new Map(previous.categories.flatMap((category) => category.fields).map((field) => [field.key, field]));
  return inputValues(next, Object.fromEntries(next.categories.flatMap((category) => category.fields).filter((field) => {
    const before = old.get(field.key);
    return before?.type === field.type;
  }).filter((field) => Object.prototype.hasOwnProperty.call(values, field.key)).map((field) => [field.key, values[field.key]])));
}
var userDateTime = instantParts;
function errorMessage(error, fallback) {
  const message = error?.error?.message;
  return typeof message === "string" ? message : fallback;
}
function conflictKind(error) {
  const response = error;
  return response?.status !== 409 ? null : response.error?.code === "WORKSPACE_VERSION_CONFLICT" ? "workspace" : response.error?.code === "VERSION_CONFLICT" ? "record" : null;
}

export {
  inputValues,
  DynamicFormRendererComponent,
  retainCompatibleValues,
  userDateTime,
  errorMessage,
  conflictKind
};
//# debugId=e69d9617-846d-5d9b-899d-08dbe70fae95
//# sourceMappingURL=chunk-UP7TIIOF.js.map
