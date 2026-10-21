import {
  A11yModule,
  CdkTrapFocus
} from "./chunk-QAJPJLTD.js";
import {
  parseNumberInput,
  textError
} from "./chunk-D4J4ETKO.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
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
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3
} from "./chunk-3HO5VEWU.js";

// src/app/features/form-field-editor/form-field-editor.component.ts
var _c0 = () => ["minimum", "maximum"];
var _c1 = () => [];
var _c2 = () => ["label", "value"];
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.value;
function FormFieldEditorComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "button", 14);
    \u0275\u0275listener("click", function FormFieldEditorComponent_For_8_Template_button_click_1_listener() {
      const category_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectCategory(category_r2.key));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 15)(6, "button", 16);
    \u0275\u0275listener("click", function FormFieldEditorComponent_For_8_Template_button_click_6_listener() {
      const category_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.moveCategory(category_r2.key, -1));
    });
    \u0275\u0275text(7, "\u2191");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 16);
    \u0275\u0275listener("click", function FormFieldEditorComponent_For_8_Template_button_click_8_listener() {
      const category_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.moveCategory(category_r2.key, 1));
    });
    \u0275\u0275text(9, "\u2193");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 16);
    \u0275\u0275listener("click", function FormFieldEditorComponent_For_8_Template_button_click_10_listener() {
      const category_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleCategory(category_r2.key));
    });
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const category_r2 = ctx.$implicit;
    const \u0275$index_13_r4 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", ctx_r2.selectedKey() === category_r2.key)("inactive", !category_r2.enabled);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-pressed", ctx_r2.selectedKey() === category_r2.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", category_r2.title, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", category_r2.fields.length, " campos");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.readonly() || \u0275$index_13_r4 === 0);
    \u0275\u0275attribute("aria-label", "Subir categor\xEDa " + category_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.readonly() || \u0275$index_13_r4 === ctx_r2.categories().length - 1);
    \u0275\u0275attribute("aria-label", "Bajar categor\xEDa " + category_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.readonly() || category_r2.system);
    \u0275\u0275attribute("aria-pressed", category_r2.enabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(category_r2.enabled ? "Activa" : "Inactiva");
  }
}
function FormFieldEditorComponent_ForEmpty_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, "Todav\xEDa no hay categor\xEDas.");
    \u0275\u0275elementEnd();
  }
}
function FormFieldEditorComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function FormFieldEditorComponent_Conditional_17_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function FormFieldEditorComponent_Conditional_17_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function FormFieldEditorComponent_Conditional_17_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const category_r6 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteCategory(category_r6.key));
    });
    \u0275\u0275text(1, "Eliminar categor\xEDa");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r2.readonly());
  }
}
function FormFieldEditorComponent_Conditional_17_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1, "Esta categor\xEDa est\xE1 desactivada. Pod\xE9s editarla y volver a activarla.");
    \u0275\u0275elementEnd();
  }
}
function FormFieldEditorComponent_Conditional_17_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, "Categor\xEDa fija del sistema con los datos obligatorios del paciente. Pod\xE9s agregar campos adicionales, pero los campos del sistema no se pueden modificar ni eliminar.");
    \u0275\u0275elementEnd();
  }
}
function FormFieldEditorComponent_Conditional_17_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function FormFieldEditorComponent_Conditional_17_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.addMeasurementMode());
    });
    \u0275\u0275text(1, "Agregar posici\xF3n de longitud / estatura");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r2.readonly());
  }
}
function FormFieldEditorComponent_Conditional_17_For_11_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, "Dato del sistema");
    \u0275\u0275elementEnd();
  }
}
function FormFieldEditorComponent_Conditional_17_For_11_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 3);
    \u0275\u0275text(1, "Se muestra seg\xFAn otra respuesta");
    \u0275\u0275elementEnd();
  }
}
function FormFieldEditorComponent_Conditional_17_For_11_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function FormFieldEditorComponent_Conditional_17_For_11_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const field_r10 = \u0275\u0275nextContext().$implicit;
      const category_r6 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.moveField(category_r6.key, field_r10.key, -1));
    });
    \u0275\u0275text(1, "\u2191");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 16);
    \u0275\u0275listener("click", function FormFieldEditorComponent_Conditional_17_For_11_Conditional_9_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r9);
      const field_r10 = \u0275\u0275nextContext().$implicit;
      const category_r6 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.moveField(category_r6.key, field_r10.key, 1));
    });
    \u0275\u0275text(3, "\u2193");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 16);
    \u0275\u0275listener("click", function FormFieldEditorComponent_Conditional_17_For_11_Conditional_9_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r9);
      const field_r10 = \u0275\u0275nextContext().$implicit;
      const category_r6 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openField(category_r6.key, field_r10.key));
    });
    \u0275\u0275text(5, "Editar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 16);
    \u0275\u0275listener("click", function FormFieldEditorComponent_Conditional_17_For_11_Conditional_9_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r9);
      const field_r10 = \u0275\u0275nextContext().$implicit;
      const category_r6 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.duplicateField(category_r6.key, field_r10.key));
    });
    \u0275\u0275text(7, "Duplicar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 25);
    \u0275\u0275listener("click", function FormFieldEditorComponent_Conditional_17_For_11_Conditional_9_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r9);
      const field_r10 = \u0275\u0275nextContext().$implicit;
      const category_r6 = \u0275\u0275nextContext();
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteField(category_r6.key, field_r10.key));
    });
    \u0275\u0275text(9, "Eliminar");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r10 = \u0275\u0275nextContext();
    const field_r10 = ctx_r10.$implicit;
    const \u0275$index_81_r12 = ctx_r10.$index;
    const category_r6 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r2.readonly() || \u0275$index_81_r12 === 0);
    \u0275\u0275attribute("aria-label", "Subir campo " + field_r10.label);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.readonly() || \u0275$index_81_r12 === category_r6.fields.length - 1);
    \u0275\u0275attribute("aria-label", "Bajar campo " + field_r10.label);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.readonly());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.readonly());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.readonly());
    \u0275\u0275attribute("aria-label", "Eliminar campo " + field_r10.label);
  }
}
function FormFieldEditorComponent_Conditional_17_For_11_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 3);
    \u0275\u0275text(1, "Bloqueado por el sistema");
    \u0275\u0275elementEnd();
  }
}
function FormFieldEditorComponent_Conditional_17_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 24)(1, "div", 26)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 3);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, FormFieldEditorComponent_Conditional_17_For_11_Conditional_6_Template, 2, 0, "span", 27);
    \u0275\u0275conditionalCreate(7, FormFieldEditorComponent_Conditional_17_For_11_Conditional_7_Template, 2, 0, "span", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 28);
    \u0275\u0275conditionalCreate(9, FormFieldEditorComponent_Conditional_17_For_11_Conditional_9_Template, 10, 8)(10, FormFieldEditorComponent_Conditional_17_For_11_Conditional_10_Template, 2, 0, "span", 3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const field_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("data-field-key", field_r10.key);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(field_r10.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", ctx_r2.typeLabel(field_r10.type), " \xB7 ", field_r10.required ? "Obligatorio" : "Opcional", "", field_r10.unit ? " \xB7 " + field_r10.unit : "");
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r10.system ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r10.visibleWhen ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!field_r10.system ? 9 : 10);
  }
}
function FormFieldEditorComponent_Conditional_17_ForEmpty_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1, "Agreg\xE1 los campos que necesit\xE1s en esta categor\xEDa.");
    \u0275\u0275elementEnd();
  }
}
function FormFieldEditorComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "header", 17)(1, "label", 18);
    \u0275\u0275text(2, "Nombre de la categor\xEDa ");
    \u0275\u0275elementStart(3, "input", 19);
    \u0275\u0275listener("input", function FormFieldEditorComponent_Conditional_17_Template_input_input_3_listener($event) {
      const category_r6 = \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.renameCategory(category_r6.key, $event.target.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, FormFieldEditorComponent_Conditional_17_Conditional_4_Template, 2, 1, "span", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, FormFieldEditorComponent_Conditional_17_Conditional_5_Template, 2, 1, "button", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, FormFieldEditorComponent_Conditional_17_Conditional_6_Template, 2, 0, "p", 21);
    \u0275\u0275conditionalCreate(7, FormFieldEditorComponent_Conditional_17_Conditional_7_Template, 2, 0, "p", 3);
    \u0275\u0275elementStart(8, "div", 22);
    \u0275\u0275conditionalCreate(9, FormFieldEditorComponent_Conditional_17_Conditional_9_Template, 2, 1, "button", 23);
    \u0275\u0275repeaterCreate(10, FormFieldEditorComponent_Conditional_17_For_11_Template, 11, 8, "article", 24, _forTrack0, false, FormFieldEditorComponent_Conditional_17_ForEmpty_12_Template, 2, 0, "p", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 8);
    \u0275\u0275listener("click", function FormFieldEditorComponent_Conditional_17_Template_button_click_13_listener() {
      const category_r6 = \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openField(category_r6.key));
    });
    \u0275\u0275text(14, "Agregar campo");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const category_r6 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("value", category_r6.title)("disabled", ctx_r2.readonly() || category_r6.system);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_4_0 = ctx_r2.categoryErrors()[category_r6.key]) ? 4 : -1, tmp_4_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(!category_r6.system ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!category_r6.enabled ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(category_r6.system ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.section() === "encounterForm" && ctx_r2.canAddMeasurementMode() ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(category_r6.fields);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.readonly());
  }
}
function FormFieldEditorComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1, "Agreg\xE1 una categor\xEDa para empezar a configurar los campos.");
    \u0275\u0275elementEnd();
  }
}
function FormFieldEditorComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.error());
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function FormFieldEditorComponent_Conditional_20_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r14 = ctx.$implicit;
    \u0275\u0275property("value", type_r14.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(type_r14.label);
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, "Cambiar el tipo reemplaza el campo por uno nuevo. Primero desvincul\xE1 las condiciones y c\xE1lculos que lo usan.");
    \u0275\u0275elementEnd();
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 39)(1, "input", 43);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function FormFieldEditorComponent_Conditional_20_Conditional_23_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateDraft({ required: $event }));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, "Respuesta obligatoria");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r16 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", field_r16.required);
    \u0275\u0275control();
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_24_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 5);
    \u0275\u0275text(1, "Unidad ");
    \u0275\u0275elementStart(2, "input", 44);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function FormFieldEditorComponent_Conditional_20_Conditional_24_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateDraft({ unit: $event }));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, FormFieldEditorComponent_Conditional_20_Conditional_24_Conditional_3_Template, 2, 1, "span", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_5_0;
    const field_r16 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", field_r16.unit ?? "");
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_5_0 = ctx_r2.draftError("unit")) ? 3 : -1, tmp_5_0);
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_25_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_25_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "input", 45);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function FormFieldEditorComponent_Conditional_20_Conditional_25_For_2_Template_input_ngModelChange_2_listener($event) {
      const property_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.setNumberProperty(property_r19, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, FormFieldEditorComponent_Conditional_20_Conditional_25_For_2_Conditional_3_Template, 2, 1, "span", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_16_0;
    const property_r19 = ctx.$implicit;
    const field_r16 = \u0275\u0275nextContext(2);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(property_r19 === "minimum" ? "M\xEDnimo" : "M\xE1ximo");
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r2.numericInputs()[property_r19] ?? field_r16[property_r19] ?? "");
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_16_0 = ctx_r2.draftError(property_r19)) ? 3 : -1, tmp_16_0);
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275repeaterCreate(1, FormFieldEditorComponent_Conditional_20_Conditional_25_For_2_Template, 4, 3, "label", 5, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, "Las fechas se ingresan con el selector del sistema y se muestran como dd/MM/aaaa.");
    \u0275\u0275elementEnd();
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_27_For_3_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_27_For_3_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "input", 48);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function FormFieldEditorComponent_Conditional_20_Conditional_27_For_3_For_2_Template_input_ngModelChange_2_listener($event) {
      const property_r23 = \u0275\u0275restoreView(_r22).$implicit;
      const \u0275$index_222_r24 = \u0275\u0275nextContext().$index;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.updateOption(\u0275$index_222_r24, property_r23, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, FormFieldEditorComponent_Conditional_20_Conditional_27_For_3_For_2_Conditional_3_Template, 2, 1, "span", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_28_0;
    const property_r23 = ctx.$implicit;
    const ctx_r24 = \u0275\u0275nextContext();
    const option_r26 = ctx_r24.$implicit;
    const \u0275$index_222_r24 = ctx_r24.$index;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(property_r23 === "label" ? "Etiqueta" : "Valor");
    \u0275\u0275advance();
    \u0275\u0275property("maxlength", property_r23 === "label" ? 150 : 80)("ngModel", option_r26[property_r23]);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_28_0 = ctx_r2.optionError(\u0275$index_222_r24, property_r23)) ? 3 : -1, tmp_28_0);
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_27_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275repeaterCreate(1, FormFieldEditorComponent_Conditional_20_Conditional_27_For_3_For_2_Template, 4, 4, "label", 5, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(3, "button", 47);
    \u0275\u0275listener("click", function FormFieldEditorComponent_Conditional_20_Conditional_27_For_3_Template_button_click_3_listener() {
      const \u0275$index_222_r24 = \u0275\u0275restoreView(_r21).$index;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.deleteOption(\u0275$index_222_r24));
    });
    \u0275\u0275text(4, "Eliminar");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const option_r26 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(1, _c2));
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-label", "Eliminar opci\xF3n " + option_r26.label);
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h4");
    \u0275\u0275text(1, "Opciones");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(2, FormFieldEditorComponent_Conditional_20_Conditional_27_For_3_Template, 5, 2, "div", 46, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementStart(4, "button", 42);
    \u0275\u0275listener("click", function FormFieldEditorComponent_Conditional_20_Conditional_27_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.addOption());
    });
    \u0275\u0275text(5, "Agregar opci\xF3n");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r16 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(field_r16.options ?? \u0275\u0275pureFunction0(0, _c1));
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_28_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const kind_r28 = ctx.$implicit;
    \u0275\u0275property("value", kind_r28.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(kind_r28.label);
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_28_Conditional_7_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const operation_r30 = ctx.$implicit;
    \u0275\u0275property("value", operation_r30.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(operation_r30.label);
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_28_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 5);
    \u0275\u0275text(1, "Operaci\xF3n ");
    \u0275\u0275elementStart(2, "select", 35);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function FormFieldEditorComponent_Conditional_20_Conditional_28_Conditional_7_Template_select_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r29);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.setOperation($event));
    });
    \u0275\u0275repeaterCreate(3, FormFieldEditorComponent_Conditional_20_Conditional_28_Conditional_7_For_4_Template, 2, 2, "option", 36, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const field_r16 = \u0275\u0275nextContext(2);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", field_r16.formula?.operation ?? "ADD");
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.operations);
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_28_For_9_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const choice_r33 = ctx.$implicit;
    \u0275\u0275property("value", choice_r33.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(choice_r33.label);
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_28_For_9_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 5);
    \u0275\u0275text(1, "N\xFAmero fijo ");
    \u0275\u0275elementStart(2, "input", 45);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function FormFieldEditorComponent_Conditional_20_Conditional_28_For_9_Conditional_8_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r34);
      const name_r32 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.setOperandConstant(name_r32, $event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const name_r32 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", ctx_r2.numericInputs()["operand:" + name_r32] ?? ctx_r2.operandConstant(name_r32));
    \u0275\u0275control();
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_28_For_9_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_28_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "label", 5);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "select", 35);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function FormFieldEditorComponent_Conditional_20_Conditional_28_For_9_Template_select_ngModelChange_3_listener($event) {
      const name_r32 = \u0275\u0275restoreView(_r31).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.setOperand(name_r32, $event));
    });
    \u0275\u0275elementStart(4, "option", 40);
    \u0275\u0275text(5, "Elegir origen");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, FormFieldEditorComponent_Conditional_20_Conditional_28_For_9_For_7_Template, 2, 2, "option", 36, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, FormFieldEditorComponent_Conditional_20_Conditional_28_For_9_Conditional_8_Template, 3, 1, "label", 5);
    \u0275\u0275conditionalCreate(9, FormFieldEditorComponent_Conditional_20_Conditional_28_For_9_Conditional_9_Template, 2, 1, "span", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_18_0;
    const name_r32 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.inputLabel(name_r32));
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r2.operandValue(name_r32));
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.operandChoices(name_r32));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.operandValue(name_r32) === "constant" ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_18_0 = ctx_r2.operandError(name_r32)) ? 9 : -1, tmp_18_0);
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h4");
    \u0275\u0275text(1, "C\xE1lculo autom\xE1tico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "label", 5);
    \u0275\u0275text(3, "F\xF3rmula ");
    \u0275\u0275elementStart(4, "select", 35);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function FormFieldEditorComponent_Conditional_20_Conditional_28_Template_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r27);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setFormulaKind($event));
    });
    \u0275\u0275repeaterCreate(5, FormFieldEditorComponent_Conditional_20_Conditional_28_For_6_Template, 2, 2, "option", 36, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, FormFieldEditorComponent_Conditional_20_Conditional_28_Conditional_7_Template, 5, 1, "label", 5);
    \u0275\u0275repeaterCreate(8, FormFieldEditorComponent_Conditional_20_Conditional_28_For_9_Template, 10, 4, "div", 33, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(10, "p", 3);
    \u0275\u0275text(11, "El resultado lo calcula el sistema. Las entradas deben indicar los campos o datos del paciente que corresponden.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r16 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", field_r16.formula?.kind ?? "CUSTOM");
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.formulaKinds);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(field_r16.formula?.kind === "CUSTOM" ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.formulaInputs());
  }
}
function FormFieldEditorComponent_Conditional_20_For_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const controller_r35 = ctx.$implicit;
    \u0275\u0275property("value", controller_r35.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(controller_r35.label);
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 5);
    \u0275\u0275text(1, "Mostrar cuando la respuesta sea ");
    \u0275\u0275elementStart(2, "select", 35);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function FormFieldEditorComponent_Conditional_20_Conditional_38_Template_select_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r36);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setVisibilityValue($event));
    });
    \u0275\u0275elementStart(3, "option", 49);
    \u0275\u0275text(4, "S\xED");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "option", 49);
    \u0275\u0275text(6, "No");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const field_r16 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngModel", field_r16.visibleWhen.equals);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngValue", false);
  }
}
function FormFieldEditorComponent_Conditional_20_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function FormFieldEditorComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "section", 29);
    \u0275\u0275listener("keydown.escape", function FormFieldEditorComponent_Conditional_20_Template_section_keydown_escape_1_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeField());
    });
    \u0275\u0275elementStart(2, "header", 17)(3, "h3", 30);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 31);
    \u0275\u0275listener("click", function FormFieldEditorComponent_Conditional_20_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeField());
    });
    \u0275\u0275text(6, "\u2715");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "fieldset", 32)(8, "div", 33)(9, "label", 5);
    \u0275\u0275text(10, "Etiqueta ");
    \u0275\u0275elementStart(11, "input", 34);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function FormFieldEditorComponent_Conditional_20_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateDraft({ label: $event }));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, FormFieldEditorComponent_Conditional_20_Conditional_12_Template, 2, 1, "span", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "label", 5);
    \u0275\u0275text(14, "Tipo ");
    \u0275\u0275elementStart(15, "select", 35);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function FormFieldEditorComponent_Conditional_20_Template_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setType($event));
    });
    \u0275\u0275repeaterCreate(16, FormFieldEditorComponent_Conditional_20_For_17_Template, 2, 2, "option", 36, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "label", 37);
    \u0275\u0275text(19, "Texto de ayuda ");
    \u0275\u0275elementStart(20, "input", 38);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function FormFieldEditorComponent_Conditional_20_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateDraft({ placeholder: $event }));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(21, FormFieldEditorComponent_Conditional_20_Conditional_21_Template, 2, 1, "span", 7);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(22, FormFieldEditorComponent_Conditional_20_Conditional_22_Template, 2, 0, "p", 3);
    \u0275\u0275conditionalCreate(23, FormFieldEditorComponent_Conditional_20_Conditional_23_Template, 3, 1, "label", 39);
    \u0275\u0275conditionalCreate(24, FormFieldEditorComponent_Conditional_20_Conditional_24_Template, 4, 2, "label", 5);
    \u0275\u0275conditionalCreate(25, FormFieldEditorComponent_Conditional_20_Conditional_25_Template, 3, 1, "div", 33);
    \u0275\u0275conditionalCreate(26, FormFieldEditorComponent_Conditional_20_Conditional_26_Template, 2, 0, "p", 3);
    \u0275\u0275conditionalCreate(27, FormFieldEditorComponent_Conditional_20_Conditional_27_Template, 6, 1);
    \u0275\u0275conditionalCreate(28, FormFieldEditorComponent_Conditional_20_Conditional_28_Template, 12, 2);
    \u0275\u0275elementStart(29, "h4");
    \u0275\u0275text(30, "Cu\xE1ndo mostrar el campo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "label", 5);
    \u0275\u0275text(32, "Respuesta que controla la visibilidad ");
    \u0275\u0275elementStart(33, "select", 35);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function FormFieldEditorComponent_Conditional_20_Template_select_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setVisibility($event));
    });
    \u0275\u0275elementStart(34, "option", 40);
    \u0275\u0275text(35, "Mostrar siempre");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(36, FormFieldEditorComponent_Conditional_20_For_37_Template, 2, 2, "option", 36, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(38, FormFieldEditorComponent_Conditional_20_Conditional_38_Template, 7, 3, "label", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(39, FormFieldEditorComponent_Conditional_20_Conditional_39_Template, 2, 1, "p", 11);
    \u0275\u0275elementStart(40, "footer", 41)(41, "button", 42);
    \u0275\u0275listener("click", function FormFieldEditorComponent_Conditional_20_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeField());
    });
    \u0275\u0275text(42, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "button", 8);
    \u0275\u0275listener("click", function FormFieldEditorComponent_Conditional_20_Template_button_click_43_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveField());
    });
    \u0275\u0275text(44, "Aplicar campo");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_7_0;
    let tmp_13_0;
    let tmp_25_0;
    const field_r16 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("cdkTrapFocusAutoCapture", true);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.editTarget()?.fieldKey ? "Editar campo" : "Agregar campo");
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.readonly());
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", field_r16.label);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_7_0 = ctx_r2.draftError("label")) ? 12 : -1, tmp_7_0);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", field_r16.type);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.fieldTypes);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", field_r16.placeholder ?? "");
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_13_0 = ctx_r2.draftError("placeholder")) ? 21 : -1, tmp_13_0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.editTarget()?.fieldKey ? 22 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r16.type !== "FORMULA" ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r16.type === "NUMBER" || field_r16.type === "FORMULA" ? 24 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r16.type === "NUMBER" ? 25 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r16.type === "DATE" ? 26 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r16.type === "SELECT" ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r16.type === "FORMULA" ? 28 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", field_r16.visibleWhen?.fieldKey ?? "");
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.visibilityControllers());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(field_r16.visibleWhen ? 38 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_25_0 = ctx_r2.draftValidationError()) ? 39 : -1, tmp_25_0);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.readonly() || !!ctx_r2.draftValidationError());
  }
}
var FORMULA_INPUTS = {
  IMC: ["weightKg", "heightCm"],
  BSA: ["weightKg", "heightCm"],
  TFGE: ["creatinineMgDl", "ageYears", "gender"],
  COCKCROFT: ["creatinineMgDl", "weightKg", "ageYears", "gender"],
  CALCIO_CORREGIDO: ["serumCalciumMgDl", "serumAlbuminGDl"],
  CUSTOM: ["a", "b"]
};
var INPUT_LABELS = {
  weightKg: "Peso (kg)",
  heightCm: "Talla (cm)",
  creatinineMgDl: "Creatinina (mg/dL)",
  ageYears: "Edad (a\xF1os)",
  gender: "Sexo",
  serumCalciumMgDl: "Calcio (mg/dL)",
  serumAlbuminGDl: "Alb\xFAmina (g/dL)",
  a: "Primer dato",
  b: "Segundo dato"
};
var clone = (value) => structuredClone(value);
var FormFieldEditorComponent = class _FormFieldEditorComponent {
  lastRequestedCategory;
  definition = input(
    { categories: [] },
    ...ngDevMode ? [{ debugName: "definition" }] : (
      /* istanbul ignore next */
      []
    )
  );
  section = input(
    "patientForm",
    ...ngDevMode ? [{ debugName: "section" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedCategoryKey = input(
    null,
    ...ngDevMode ? [{ debugName: "selectedCategoryKey" }] : (
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
  definitionChange = output();
  categorySelected = output();
  working = signal(
    { categories: [] },
    ...ngDevMode ? [{ debugName: "working" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedKey = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedKey" }] : (
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
  newCategoryTitle = signal(
    "",
    ...ngDevMode ? [{ debugName: "newCategoryTitle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  newCategoryError = computed(
    () => textError(this.newCategoryTitle(), 150, true),
    ...ngDevMode ? [{ debugName: "newCategoryError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  categoryErrors = signal(
    {},
    ...ngDevMode ? [{ debugName: "categoryErrors" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pendingChanges = computed(
    () => !!this.fieldDraft() || !!this.newCategoryTitle().trim() || this.categories().some((category) => !!this.categoryErrors()[category.key]),
    ...ngDevMode ? [{ debugName: "pendingChanges" }] : (
      /* istanbul ignore next */
      []
    )
  );
  editTarget = signal(
    null,
    ...ngDevMode ? [{ debugName: "editTarget" }] : (
      /* istanbul ignore next */
      []
    )
  );
  fieldDraft = signal(
    null,
    ...ngDevMode ? [{ debugName: "fieldDraft" }] : (
      /* istanbul ignore next */
      []
    )
  );
  numericInputs = signal(
    {},
    ...ngDevMode ? [{ debugName: "numericInputs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  categories = computed(
    () => this.working().categories,
    ...ngDevMode ? [{ debugName: "categories" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedCategory = computed(
    () => this.categories().find((c) => c.key === this.selectedKey()) ?? null,
    ...ngDevMode ? [{ debugName: "selectedCategory" }] : (
      /* istanbul ignore next */
      []
    )
  );
  allFields = computed(
    () => this.categories().flatMap((c) => c.fields),
    ...ngDevMode ? [{ debugName: "allFields" }] : (
      /* istanbul ignore next */
      []
    )
  );
  formulaInputs = computed(
    () => FORMULA_INPUTS[this.fieldDraft()?.formula?.kind ?? "CUSTOM"],
    ...ngDevMode ? [{ debugName: "formulaInputs" }] : (
      /* istanbul ignore next */
      []
    )
  );
  visibilityControllers = computed(
    () => this.allFields().filter((f) => f.type === "BOOLEAN" && f.key !== this.editTarget()?.fieldKey),
    ...ngDevMode ? [{ debugName: "visibilityControllers" }] : (
      /* istanbul ignore next */
      []
    )
  );
  draftValidationError = computed(
    () => {
      const draft = this.fieldDraft(), target = this.editTarget();
      if (!draft || !target)
        return null;
      const next = clone(this.working()), field = clone(draft);
      const old = this.allFields().find((f) => f.key === target.fieldKey);
      field.key = old && old.type === field.type ? old.key : this.uniqueKey(field.label, new Set(this.allFields().map((f) => f.key)), "field");
      const category = next.categories.find((c) => c.key === target.categoryKey);
      if (!category)
        return "Seleccion\xE1 una categor\xEDa disponible.";
      const index = category.fields.findIndex((f) => f.key === target.fieldKey);
      if (index < 0)
        category.fields.push(field);
      else
        category.fields[index] = field;
      return this.validate(next);
    },
    ...ngDevMode ? [{ debugName: "draftValidationError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  draftError(property) {
    const field = this.fieldDraft();
    if (!field)
      return null;
    if (property === "label")
      return textError(field.label, 150, true);
    if (property === "placeholder")
      return textError(field.placeholder ?? "", 300);
    if (property === "unit")
      return textError(field.unit ?? "", 30);
    const value = field[property];
    if (value !== void 0 && !Number.isFinite(value))
      return "Ingres\xE1 un n\xFAmero v\xE1lido.";
    return field.minimum !== void 0 && field.maximum !== void 0 && field.minimum > field.maximum ? "El m\xEDnimo no puede superar al m\xE1ximo." : null;
  }
  optionError(index, property) {
    const options = this.fieldDraft()?.options ?? [], value = options[index]?.[property] ?? "";
    return textError(value, property === "label" ? 150 : 80, true) || (property === "value" && options.some((option, i) => i !== index && option.value === value) ? "Este valor ya se usa en otra opci\xF3n." : null);
  }
  operandError(name) {
    const operand = this.fieldDraft()?.formula?.inputs[name];
    if (!operand)
      return "Eleg\xED el origen de este dato.";
    return "constant" in operand && !Number.isFinite(operand.constant) ? "Ingres\xE1 un n\xFAmero fijo v\xE1lido." : null;
  }
  fieldTypes = [
    { value: "TEXT", label: "Texto corto" },
    { value: "TEXTAREA", label: "Texto largo" },
    { value: "NUMBER", label: "N\xFAmero" },
    { value: "DATE", label: "Fecha" },
    { value: "SELECT", label: "Selecci\xF3n" },
    { value: "BOOLEAN", label: "S\xED / No" },
    { value: "FORMULA", label: "C\xE1lculo" }
  ];
  formulaKinds = [
    { value: "IMC", label: "\xCDndice de masa corporal" },
    { value: "BSA", label: "Superficie corporal" },
    { value: "TFGE", label: "Filtrado glomerular" },
    { value: "COCKCROFT", label: "Cockcroft-Gault" },
    { value: "CALCIO_CORREGIDO", label: "Calcio corregido" },
    { value: "CUSTOM", label: "Operaci\xF3n entre datos" }
  ];
  operations = [
    { value: "ADD", label: "Sumar" },
    { value: "SUBTRACT", label: "Restar" },
    { value: "MULTIPLY", label: "Multiplicar" },
    { value: "DIVIDE", label: "Dividir" },
    { value: "AVERAGE", label: "Promediar" }
  ];
  constructor() {
    effect(() => {
      const form = this.definition();
      const requested = this.selectedCategoryKey();
      untracked(() => {
        this.working.set(clone(form));
        const preferred = requested !== this.lastRequestedCategory ? requested ?? this.selectedKey() : this.selectedKey();
        this.lastRequestedCategory = requested;
        this.selectedKey.set(form.categories.some((c) => c.key === preferred) ? preferred : form.categories[0]?.key ?? null);
      });
    });
  }
  selectCategory(key) {
    this.selectedKey.set(key);
    this.error.set(null);
    this.categorySelected.emit(key);
  }
  typeLabel(type) {
    return this.fieldTypes.find((t) => t.value === type)?.label ?? type;
  }
  inputLabel(name) {
    return INPUT_LABELS[name] ?? name;
  }
  canAddMeasurementMode = computed(
    () => this.allFields().some((field) => ["heightCm", "height"].includes(field.key)) && !this.allFields().some((field) => field.key === "heightMeasurementMode"),
    ...ngDevMode ? [{ debugName: "canAddMeasurementMode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  addMeasurementMode() {
    const categoryKey = this.selectedKey();
    if (!categoryKey || this.section() !== "encounterForm" || !this.canAddMeasurementMode() || this.readonly())
      return;
    this.commit((form) => form.categories.find((category) => category.key === categoryKey).fields.push({
      key: "heightMeasurementMode",
      label: "Posici\xF3n de longitud / estatura",
      type: "SELECT",
      required: false,
      options: [{ value: "RECUMBENT", label: "Longitud recumbente (acostado)" }, { value: "STANDING", label: "Estatura de pie" }]
    }));
  }
  addCategory() {
    const title = this.newCategoryTitle().trim();
    if (!title || title.length > 150) {
      this.error.set("Ingres\xE1 un nombre de categor\xEDa de hasta 150 caracteres.");
      return;
    }
    const key = this.uniqueKey(title, new Set(this.categories().map((c) => c.key)), "category");
    if (this.commit((form) => form.categories.push({ key, title, enabled: true, fields: [] }))) {
      this.selectedKey.set(key);
      this.newCategoryTitle.set("");
    }
  }
  renameCategory(key, title) {
    const c = this.categories().find((cat) => cat.key === key);
    if (c?.system)
      return;
    const error = textError(title, 150, true);
    this.categoryErrors.update((errors) => __spreadProps(__spreadValues({}, errors), { [key]: error }));
    if (error)
      return;
    this.commit((form) => {
      const cat = form.categories.find((cat2) => cat2.key === key);
      if (cat)
        cat.title = title.trim();
    });
  }
  toggleCategory(key) {
    const c = this.categories().find((cat) => cat.key === key);
    if (c?.system)
      return;
    this.commit((form) => {
      const cat = form.categories.find((cat2) => cat2.key === key);
      if (cat)
        cat.enabled = !cat.enabled;
    });
  }
  moveCategory(key, direction) {
    this.commit((form) => this.move(form.categories, form.categories.findIndex((c) => c.key === key), direction));
  }
  deleteCategory(key) {
    const c = this.categories().find((cat) => cat.key === key);
    if (c?.system)
      return;
    this.commit((form) => {
      form.categories = form.categories.filter((cat) => cat.key !== key);
    });
  }
  moveField(categoryKey, fieldKey, direction) {
    const field = this.allFields().find((f) => f.key === fieldKey);
    if (field?.system)
      return;
    this.commit((form) => {
      const fields = form.categories.find((c) => c.key === categoryKey)?.fields;
      if (fields)
        this.move(fields, fields.findIndex((f) => f.key === fieldKey), direction);
    });
  }
  deleteField(categoryKey, fieldKey) {
    const field = this.allFields().find((f) => f.key === fieldKey);
    if (field?.system)
      return;
    this.commit((form) => {
      const c = form.categories.find((c2) => c2.key === categoryKey);
      if (c)
        c.fields = c.fields.filter((f) => f.key !== fieldKey);
    });
  }
  duplicateField(categoryKey, fieldKey) {
    this.commit((form) => {
      const c = form.categories.find((c2) => c2.key === categoryKey);
      const field = c?.fields.find((f) => f.key === fieldKey);
      if (!c || !field || field.system)
        return;
      const copy = clone(field);
      copy.key = this.uniqueKey(field.key, new Set(form.categories.flatMap((c2) => c2.fields.map((f) => f.key))), "field");
      copy.label += " (copia)";
      delete copy.system;
      c.fields.push(copy);
    });
  }
  openField(categoryKey, fieldKey = null) {
    if (this.readonly())
      return;
    const existing = this.categories().find((c) => c.key === categoryKey)?.fields.find((f) => f.key === fieldKey);
    if (existing?.system)
      return;
    this.numericInputs.set({});
    this.editTarget.set({ categoryKey, fieldKey });
    this.fieldDraft.set(existing ? clone(existing) : { key: "", label: "", type: "TEXT", required: false });
    this.error.set(null);
  }
  closeField() {
    this.editTarget.set(null);
    this.fieldDraft.set(null);
    this.error.set(null);
  }
  updateDraft(patch) {
    const current = this.fieldDraft();
    if (current) {
      this.fieldDraft.set(__spreadValues(__spreadValues({}, current), patch));
      this.error.set(null);
    }
  }
  setType(type) {
    const draft = this.fieldDraft();
    if (!draft)
      return;
    const next = clone(draft);
    next.type = type;
    if (type !== "SELECT")
      delete next.options;
    else
      next.options ??= [];
    if (type !== "NUMBER") {
      delete next.minimum;
      delete next.maximum;
    }
    if (type !== "NUMBER" && type !== "FORMULA")
      delete next.unit;
    if (type !== "FORMULA")
      delete next.formula;
    else {
      next.required = false;
      next.formula = { kind: "CUSTOM", operation: "ADD", inputs: {} };
    }
    this.numericInputs.set({});
    this.fieldDraft.set(next);
  }
  setNumberProperty(property, value) {
    const draft = this.fieldDraft();
    if (!draft)
      return;
    const next = clone(draft);
    const parsed = typeof value === "string" ? parseNumberInput(value) : value;
    this.numericInputs.update((raw) => __spreadProps(__spreadValues({}, raw), { [property]: value == null ? "" : String(value) }));
    if (parsed === null)
      delete next[property];
    else
      next[property] = typeof parsed === "number" ? parsed : NaN;
    this.fieldDraft.set(next);
    this.error.set(null);
  }
  addOption() {
    const draft = this.fieldDraft();
    if (draft)
      this.updateDraft({ options: [...draft.options ?? [], { value: "", label: "" }] });
  }
  updateOption(index, property, value) {
    const options = clone(this.fieldDraft()?.options ?? []);
    if (options[index])
      options[index][property] = value;
    this.updateDraft({ options });
  }
  deleteOption(index) {
    this.updateDraft({ options: this.fieldDraft()?.options?.filter((_, i) => i !== index) });
  }
  setVisibility(fieldKey) {
    const draft = this.fieldDraft();
    if (!draft)
      return;
    const next = clone(draft);
    if (!fieldKey)
      delete next.visibleWhen;
    else
      next.visibleWhen = { fieldKey, equals: true };
    this.fieldDraft.set(next);
  }
  setVisibilityValue(equals) {
    const value = this.fieldDraft()?.visibleWhen;
    if (value)
      this.updateDraft({ visibleWhen: __spreadProps(__spreadValues({}, value), { equals }) });
  }
  setFormulaKind(kind) {
    this.numericInputs.set({});
    this.updateDraft({ formula: __spreadValues({ kind, inputs: {} }, kind === "CUSTOM" ? { operation: "ADD" } : {}) });
  }
  setOperation(operation) {
    const formula = this.fieldDraft()?.formula;
    if (formula)
      this.updateDraft({ formula: __spreadProps(__spreadValues({}, formula), { operation }) });
  }
  operandChoices(name) {
    const gender = name === "gender";
    const custom = this.fieldDraft()?.formula?.kind === "CUSTOM";
    const fields = this.allFields().filter((f) => f.key !== this.editTarget()?.fieldKey && (gender ? f.type === "SELECT" && f.options?.every((o) => ["MALE", "FEMALE", "OTHER", "UNKNOWN"].includes(o.value)) : f.type === "NUMBER"));
    const choices = fields.map((f) => ({ value: "field:" + f.key, label: f.label }));
    if (!custom)
      choices.push(...gender ? [{ value: "context:patient.gender", label: "Sexo del paciente" }] : [
        { value: "context:patient.ageYears", label: "Edad del paciente (a\xF1os)" },
        { value: "context:patient.latestWeightKg", label: "\xDAltimo peso anterior (kg)" },
        { value: "context:patient.latestHeightCm", label: "\xDAltima talla anterior (cm)" }
      ]);
    if (!gender && (!custom || name === "b"))
      choices.push({ value: "constant", label: "N\xFAmero fijo" });
    return choices;
  }
  operandValue(name) {
    const operand = this.fieldDraft()?.formula?.inputs[name];
    return operand ? "fieldKey" in operand ? "field:" + operand.fieldKey : "context" in operand ? "context:" + operand.context : "constant" : "";
  }
  operandConstant(name) {
    const operand = this.fieldDraft()?.formula?.inputs[name];
    return operand?.constant ?? null;
  }
  setOperand(name, selection, constant = 0) {
    this.numericInputs.update((values) => {
      const next = __spreadValues({}, values);
      delete next["operand:" + name];
      return next;
    });
    const formula = this.fieldDraft()?.formula;
    if (!formula)
      return;
    const inputs = clone(formula.inputs);
    if (!selection)
      delete inputs[name];
    else if (selection.startsWith("field:"))
      inputs[name] = { fieldKey: selection.slice(6) };
    else if (selection.startsWith("context:"))
      inputs[name] = { context: selection.slice(8) };
    else
      inputs[name] = { constant: constant ?? NaN };
    this.updateDraft({ formula: __spreadProps(__spreadValues({}, formula), { inputs }) });
  }
  setOperandConstant(name, raw) {
    const value = parseNumberInput(raw);
    this.setOperand(name, "constant", typeof value === "number" ? value : NaN);
    this.numericInputs.update((values) => __spreadProps(__spreadValues({}, values), { ["operand:" + name]: raw }));
  }
  saveField() {
    const target = this.editTarget();
    const current = this.fieldDraft();
    if (!target || !current || this.readonly())
      return;
    const field = clone(current);
    field.label = field.label.trim();
    if (this.draftValidationError()) {
      this.error.set(this.draftValidationError());
      return;
    }
    if (!field.label || field.label.length > 150) {
      this.error.set("Ingres\xE1 una etiqueta de hasta 150 caracteres.");
      return;
    }
    if (!field.placeholder)
      delete field.placeholder;
    if (!field.unit)
      delete field.unit;
    const old = this.allFields().find((f) => f.key === target.fieldKey);
    const replaced = old && old.type !== field.type;
    field.key = old && !replaced ? old.key : this.uniqueKey(field.label, new Set(this.allFields().map((f) => f.key)), "field");
    if (this.commit((form) => {
      const c = form.categories.find((c2) => c2.key === target.categoryKey);
      if (!c)
        return;
      const index = c.fields.findIndex((f) => f.key === target.fieldKey);
      if (index < 0)
        c.fields.push(field);
      else
        c.fields[index] = field;
    }))
      this.closeField();
  }
  commit(change) {
    if (this.readonly())
      return false;
    const previous = this.working();
    const next = clone(previous);
    change(next);
    const error = this.validate(next);
    if (error) {
      this.error.set(error);
      return false;
    }
    this.error.set(null);
    this.working.set(next);
    if (!next.categories.some((c) => c.key === this.selectedKey()))
      this.selectedKey.set(next.categories[0]?.key ?? null);
    this.definitionChange.emit(clone(next));
    return true;
  }
  validate(form) {
    const fields = form.categories.flatMap((c) => c.fields);
    const byKey = new Map(fields.map((f) => [f.key, f]));
    if (new Set(form.categories.map((c) => c.key)).size !== form.categories.length || byKey.size !== fields.length)
      return "Las claves deben ser \xFAnicas en todo el formulario.";
    const sysCat = form.categories.find((c) => c.key === "sys_patient_profile");
    if (sysCat) {
      if (!sysCat.enabled)
        return "La categor\xEDa de datos personales del paciente es obligatoria y debe estar activa.";
      const sysKeys = new Set(sysCat.fields.map((f) => f.key));
      const requiredSysKeys = ["sys_firstName", "sys_lastName", "sys_dni", "sys_dob", "sys_sex", "sys_phone", "sys_email", "sys_insurance"];
      for (const k of requiredSysKeys) {
        if (!sysKeys.has(k))
          return `El campo obligatorio del sistema ${k} debe estar presente.`;
      }
    }
    for (const field of fields) {
      if (!field.label.trim() || field.label.length > 150)
        return "Las etiquetas no pueden estar vac\xEDas ni superar 150 caracteres.";
      if (textError(field.placeholder ?? "", 300))
        return "El texto de ayuda admite hasta 300 caracteres.";
      if (textError(field.unit ?? "", 30))
        return "La unidad admite hasta 30 caracteres.";
      if (field.type === "SELECT") {
        if (!field.options?.length || field.options.some((o) => !o.value.trim() || !o.label.trim() || o.value.length > 80 || o.label.length > 150))
          return "Complet\xE1 al menos una opci\xF3n con valor y etiqueta.";
        if (new Set(field.options.map((o) => o.value)).size !== field.options.length)
          return "Los valores de las opciones no pueden repetirse.";
      }
      if (field.minimum !== void 0 && !Number.isFinite(field.minimum) || field.maximum !== void 0 && !Number.isFinite(field.maximum) || field.minimum !== void 0 && field.maximum !== void 0 && field.minimum > field.maximum)
        return "Los l\xEDmites num\xE9ricos deben ser v\xE1lidos y el m\xEDnimo no puede superar al m\xE1ximo.";
      if (field.visibleWhen) {
        let cursor = field;
        const seen = /* @__PURE__ */ new Set();
        while (cursor?.visibleWhen) {
          if (seen.has(cursor.key))
            return "Las condiciones de visibilidad no pueden formar un ciclo.";
          seen.add(cursor.key);
          const controller = byKey.get(cursor.visibleWhen.fieldKey);
          if (controller?.type !== "BOOLEAN")
            return "La condici\xF3n debe referir a un campo S\xED / No existente.";
          cursor = controller;
        }
      }
      if (field.type === "FORMULA") {
        const formula = field.formula;
        if (!formula || field.required)
          return "El c\xE1lculo requiere configuraci\xF3n y no puede ser obligatorio.";
        const expected = FORMULA_INPUTS[formula.kind];
        if (!expected || Object.keys(formula.inputs).length !== expected.length || expected.some((n) => !formula.inputs[n]))
          return "Seleccion\xE1 todas las entradas del c\xE1lculo.";
        for (const name of expected) {
          const operand = formula.inputs[name];
          const gender = name === "gender";
          if (typeof operand.fieldKey === "string") {
            const source = byKey.get(operand.fieldKey);
            if (!source || source.type !== (gender ? "SELECT" : "NUMBER"))
              return "El c\xE1lculo debe referir a campos num\xE9ricos existentes; sexo requiere selecci\xF3n.";
            if (gender && source.options?.some((o) => !["MALE", "FEMALE", "OTHER", "UNKNOWN"].includes(o.value)))
              return "La entrada de sexo requiere valores compatibles.";
          } else if (typeof operand.constant === "number") {
            if (gender || !Number.isFinite(operand.constant) || formula.kind === "CUSTOM" && name === "a")
              return "La constante debe ser num\xE9rica y v\xE1lida para esa entrada.";
          } else if (operand.context === "patient.gender" !== gender || formula.kind === "CUSTOM")
            return "El contexto no corresponde a esa entrada del c\xE1lculo.";
        }
        if (formula.kind === "CUSTOM" && !formula.operation)
          return "Eleg\xED la operaci\xF3n entre datos.";
      }
    }
    return null;
  }
  uniqueKey(label, used, fallback) {
    let base = label.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9_-]/g, "_").replace(/_+/g, "_").slice(0, 70);
    if (!/^[A-Za-z]/.test(base))
      base = fallback + "_" + base;
    base = base.slice(0, 70);
    let key = base;
    let suffix = 2;
    while (used.has(key))
      key = base + "_" + suffix++;
    return key;
  }
  move(values, index, direction) {
    const next = index + direction;
    if (index < 0 || next < 0 || next >= values.length)
      return;
    [values[index], values[next]] = [values[next], values[index]];
  }
  static \u0275fac = function FormFieldEditorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormFieldEditorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormFieldEditorComponent, selectors: [["app-form-field-editor"]], inputs: { definition: [1, "definition"], section: [1, "section"], selectedCategoryKey: [1, "selectedCategoryKey"], readonly: [1, "readonly"] }, outputs: { definitionChange: "definitionChange", categorySelected: "categorySelected" }, decls: 21, vars: 8, consts: [["aria-label", "Editor de categor\xEDas y campos", 1, "editor"], [1, "editor-layout"], ["aria-label", "Categor\xEDas del formulario", 1, "category-manager"], [1, "hint"], [1, "category-row", 3, "selected", "inactive"], [1, "control"], ["maxlength", "150", "placeholder", "Nombre de la categor\xEDa", 3, "ngModelChange", "keydown.enter", "ngModel", "disabled"], ["role", "alert", 1, "field-error"], ["type", "button", 1, "primary", 3, "click", "disabled"], [1, "fields-panel"], [1, "empty-fields"], ["role", "alert", 1, "error"], [1, "field-dialog-backdrop"], [1, "category-row"], ["type", "button", 1, "category-name", 3, "click"], [1, "category-actions"], ["type", "button", 3, "click", "disabled"], [1, "panel-header"], [1, "control", "category-title"], ["maxlength", "150", 3, "input", "value", "disabled"], ["type", "button", 1, "danger", 3, "disabled"], [1, "notice"], [1, "fields-list"], ["type", "button", 3, "disabled"], [1, "field-card"], ["type", "button", 1, "danger", 3, "click", "disabled"], [1, "field-summary"], [1, "binding"], [1, "field-actions"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "field-dialog-title", "tabindex", "-1", "cdkTrapFocus", "", 1, "field-dialog", 3, "keydown.escape", "cdkTrapFocusAutoCapture"], ["id", "field-dialog-title"], ["type", "button", "aria-label", "Cerrar editor del campo", 3, "click"], [3, "disabled"], [1, "control-grid"], ["maxlength", "150", 3, "ngModelChange", "ngModel"], [3, "ngModelChange", "ngModel"], [3, "value"], [1, "control", "wide"], ["maxlength", "300", 3, "ngModelChange", "ngModel"], [1, "checkbox-control"], ["value", ""], [1, "dialog-actions"], ["type", "button", 3, "click"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], ["maxlength", "30", 3, "ngModelChange", "ngModel"], ["type", "text", "inputmode", "decimal", 3, "ngModelChange", "ngModel"], [1, "option-row"], ["type", "button", 1, "danger", 3, "click"], [3, "ngModelChange", "maxlength", "ngModel"], [3, "ngValue"]], template: function FormFieldEditorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "aside", 2)(3, "h3");
      \u0275\u0275text(4, "Categor\xEDas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "Pod\xE9s cambiar su nombre, orden y contenido.");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(7, FormFieldEditorComponent_For_8_Template, 12, 14, "div", 4, _forTrack0, false, FormFieldEditorComponent_ForEmpty_9_Template, 2, 0, "p", 3);
      \u0275\u0275elementStart(10, "label", 5);
      \u0275\u0275text(11, "Nueva categor\xEDa ");
      \u0275\u0275elementStart(12, "input", 6);
      \u0275\u0275controlCreate();
      \u0275\u0275listener("ngModelChange", function FormFieldEditorComponent_Template_input_ngModelChange_12_listener($event) {
        return ctx.newCategoryTitle.set($event);
      })("keydown.enter", function FormFieldEditorComponent_Template_input_keydown_enter_12_listener() {
        return ctx.addCategory();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(13, FormFieldEditorComponent_Conditional_13_Template, 2, 1, "span", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "button", 8);
      \u0275\u0275listener("click", function FormFieldEditorComponent_Template_button_click_14_listener() {
        return ctx.addCategory();
      });
      \u0275\u0275text(15, "Agregar categor\xEDa");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "main", 9);
      \u0275\u0275conditionalCreate(17, FormFieldEditorComponent_Conditional_17_Template, 15, 9)(18, FormFieldEditorComponent_Conditional_18_Template, 2, 0, "p", 10);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(19, FormFieldEditorComponent_Conditional_19_Template, 2, 1, "p", 11);
      \u0275\u0275conditionalCreate(20, FormFieldEditorComponent_Conditional_20_Template, 45, 19, "div", 12);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_4_0;
      let tmp_6_0;
      let tmp_8_0;
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.categories());
      \u0275\u0275advance(5);
      \u0275\u0275property("ngModel", ctx.newCategoryTitle())("disabled", ctx.readonly());
      \u0275\u0275control();
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_4_0 = ctx.newCategoryError()) ? 13 : -1, tmp_4_0);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.readonly());
      \u0275\u0275advance(3);
      \u0275\u0275conditional((tmp_6_0 = ctx.selectedCategory()) ? 17 : 18, tmp_6_0);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.error() && !ctx.fieldDraft() ? 19 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_8_0 = ctx.fieldDraft()) ? 20 : -1, tmp_8_0);
    }
  }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, A11yModule, CdkTrapFocus], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  color: var(--%NS%color-on-surface, #0f172a);\n}\n.editor[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.editor-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(200px, 260px) 1fr;\n  gap: 1.5rem;\n}\n.category-manager[_ngcontent-%COMP%] {\n  background: var(--%NS%color-surface-container-low, #f8fafc);\n  padding: 1rem;\n  border: 1px solid var(--%NS%color-outline-variant, #e2e8f0);\n  border-radius: 1rem;\n}\nh3[_ngcontent-%COMP%], \nh4[_ngcontent-%COMP%] {\n  font-weight: 650;\n  margin: 0 0 .75rem;\n}\nh4[_ngcontent-%COMP%] {\n  margin-top: 1.25rem;\n}\n.hint[_ngcontent-%COMP%] {\n  color: var(--%NS%color-on-surface-variant, #64748b);\n  font-size: .8125rem;\n  line-height: 1.5;\n  margin: .5rem 0;\n}\n.category-row[_ngcontent-%COMP%] {\n  padding: .6rem;\n  border: 1px solid transparent;\n  border-radius: .75rem;\n  margin: .5rem 0;\n}\n.category-row.selected[_ngcontent-%COMP%] {\n  border-color: #93c5fd;\n  background: var(--%NS%dc-blue-surface, #eff6ff);\n}\n.category-row.inactive[_ngcontent-%COMP%]   .category-name[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.category-name[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0;\n  border: none;\n  background: transparent;\n  text-align: left;\n  font-weight: 600;\n}\n.category-name[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: .25rem;\n  font-size: .75rem;\n  font-weight: 400;\n}\n.category-actions[_ngcontent-%COMP%], \n.field-actions[_ngcontent-%COMP%], \n.dialog-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: .4rem;\n  flex-wrap: wrap;\n  margin-top: .6rem;\n}\nbutton[_ngcontent-%COMP%] {\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: .55rem;\n  padding: .45rem .7rem;\n  background: var(--%NS%dc-surface, #fff);\n  font-size: .8125rem;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: .45;\n  cursor: default;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \nselect[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #2563eb;\n  outline-offset: 2px;\n}\n.primary[_ngcontent-%COMP%] {\n  background: #2563eb;\n  border-color: #2563eb;\n  color: white;\n}\n.danger[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-error-ink, #b91c1c);\n}\n.control[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: .4rem;\n  font-size: .8125rem;\n  margin: .75rem 0;\n  min-width: 0;\n}\ninput[_ngcontent-%COMP%]:not([type=checkbox]), \nselect[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: .6rem .7rem;\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: .5rem;\n  background: var(--%NS%color-surface, white);\n  color: inherit;\n  min-height: 2.5rem;\n}\n.panel-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.category-title[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-top: 0;\n}\n.field-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: .75rem;\n  padding: 1rem;\n  margin-bottom: .75rem;\n}\n.field-summary[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.field-summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  overflow-wrap: anywhere;\n}\n.binding[_ngcontent-%COMP%] {\n  font-size: .75rem;\n  color: var(--%NS%dc-blue-ink, #1d4ed8);\n}\n.notice[_ngcontent-%COMP%], \n.error[_ngcontent-%COMP%] {\n  padding: .75rem;\n  border-radius: .5rem;\n  font-size: .875rem;\n}\n.notice[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n}\n.error[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-error-surface, #fef2f2);\n  color: var(--%NS%dc-error-ink, #991b1b);\n  margin-top: 1rem;\n}\n.empty-fields[_ngcontent-%COMP%] {\n  padding: 2rem 1rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  text-align: center;\n  border: 1px dashed var(--%NS%dc-outline, #cbd5e1);\n  border-radius: .75rem;\n  margin: 1rem 0;\n}\n.field-dialog-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1100;\n  background: #0f172a80;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n}\n.field-dialog[_ngcontent-%COMP%] {\n  background: var(--%NS%color-surface, white);\n  width: min(100%, 650px);\n  max-height: calc(100dvh - 2rem);\n  overflow-y: auto;\n  padding: 1.5rem;\n  border-radius: 1rem;\n  box-shadow: 0 20px 60px #0003;\n}\nfieldset[_ngcontent-%COMP%] {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n.control-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0 1rem;\n}\n.wide[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n.checkbox-control[_ngcontent-%COMP%] {\n  display: flex;\n  gap: .6rem;\n  align-items: center;\n  margin: .75rem 0;\n  font-size: .875rem;\n}\n.option-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr auto;\n  gap: .75rem;\n  align-items: end;\n}\n.option-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-bottom: .75rem;\n}\n.dialog-actions[_ngcontent-%COMP%] {\n  justify-content: flex-end;\n  padding-top: 1rem;\n  margin-top: 1rem;\n  border-top: 1px solid var(--%NS%dc-outline, #e2e8f0);\n}\n@media (max-width: 850px) {\n  .editor-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .field-card[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n}\n@media (max-width: 550px) {\n  .control-grid[_ngcontent-%COMP%], \n   .option-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .panel-header[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n  .field-dialog[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n}\n.field-error[_ngcontent-%COMP%] {\n  display: block;\n  color: var(--%NS%dc-error-ink, #b91c1c);\n  font-size: .8rem;\n  margin-top: 4px;\n}\n/*# sourceMappingURL=form-field-editor.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormFieldEditorComponent, [{
    type: Component,
    args: [{ selector: "app-form-field-editor", imports: [FormsModule, A11yModule], template: `<section class="editor" aria-label="Editor de categor\xEDas y campos">\r
  <div class="editor-layout">\r
    <aside class="category-manager" aria-label="Categor\xEDas del formulario">\r
      <h3>Categor\xEDas</h3>\r
      <p class="hint">Pod\xE9s cambiar su nombre, orden y contenido.</p>\r
      @for (category of categories(); track category.key; let i = $index) {\r
        <div class="category-row" [class.selected]="selectedKey() === category.key" [class.inactive]="!category.enabled">\r
          <button type="button" class="category-name" (click)="selectCategory(category.key)" [attr.aria-pressed]="selectedKey() === category.key">\r
            {{ category.title }} <span>{{ category.fields.length }} campos</span>\r
          </button>\r
          <div class="category-actions">\r
            <button type="button" (click)="moveCategory(category.key, -1)" [disabled]="readonly() || i === 0" [attr.aria-label]="'Subir categor\xEDa ' + category.title">\u2191</button>\r
            <button type="button" (click)="moveCategory(category.key, 1)" [disabled]="readonly() || i === categories().length - 1" [attr.aria-label]="'Bajar categor\xEDa ' + category.title">\u2193</button>\r
            <button type="button" (click)="toggleCategory(category.key)" [disabled]="readonly() || category.system" [attr.aria-pressed]="category.enabled">{{ category.enabled ? 'Activa' : 'Inactiva' }}</button>\r
          </div>\r
        </div>\r
      } @empty { <p class="hint">Todav\xEDa no hay categor\xEDas.</p> }\r
      <label class="control">Nueva categor\xEDa\r
        <input maxlength="150" [ngModel]="newCategoryTitle()" (ngModelChange)="newCategoryTitle.set($event)" [disabled]="readonly()" (keydown.enter)="addCategory()" placeholder="Nombre de la categor\xEDa" />\r
        @if (newCategoryError(); as error) { <span class="field-error" role="alert">{{ error }}</span> }\r
      </label>\r
      <button type="button" class="primary" (click)="addCategory()" [disabled]="readonly()">Agregar categor\xEDa</button>\r
    </aside>\r
\r
    <main class="fields-panel">\r
      @if (selectedCategory(); as category) {\r
        <header class="panel-header">\r
          <label class="control category-title">Nombre de la categor\xEDa\r
            <input maxlength="150" [value]="category.title" (input)="renameCategory(category.key, $any($event.target).value)" [disabled]="readonly() || category.system" />\r
            @if (categoryErrors()[category.key]; as error) { <span class="field-error" role="alert">{{ error }}</span> }\r
          </label>\r
          @if (!category.system) {\r
            <button type="button" class="danger" (click)="deleteCategory(category.key)" [disabled]="readonly()">Eliminar categor\xEDa</button>\r
          }\r
        </header>\r
        @if (!category.enabled) { <p class="notice">Esta categor\xEDa est\xE1 desactivada. Pod\xE9s editarla y volver a activarla.</p> }\r
        @if (category.system) {\r
          <p class="hint">Categor\xEDa fija del sistema con los datos obligatorios del paciente. Pod\xE9s agregar campos adicionales, pero los campos del sistema no se pueden modificar ni eliminar.</p>\r
        }\r
        <div class="fields-list">\r
          @if (section() === 'encounterForm' && canAddMeasurementMode()) {\r
            <button type="button" (click)="addMeasurementMode()" [disabled]="readonly()">Agregar posici\xF3n de longitud / estatura</button>\r
          }\r
          @for (field of category.fields; track field.key; let fi = $index) {\r
            <article class="field-card" [attr.data-field-key]="field.key">\r
              <div class="field-summary">\r
                <strong>{{ field.label }}</strong>\r
                <span class="hint">{{ typeLabel(field.type) }} \xB7 {{ field.required ? 'Obligatorio' : 'Opcional' }}{{ field.unit ? ' \xB7 ' + field.unit : '' }}</span>\r
                @if (field.system) { <span class="binding">Dato del sistema</span> }\r
                @if (field.visibleWhen) { <span class="hint">Se muestra seg\xFAn otra respuesta</span> }\r
              </div>\r
              <div class="field-actions">\r
                @if (!field.system) {\r
                  <button type="button" (click)="moveField(category.key, field.key, -1)" [disabled]="readonly() || fi === 0" [attr.aria-label]="'Subir campo ' + field.label">\u2191</button>\r
                  <button type="button" (click)="moveField(category.key, field.key, 1)" [disabled]="readonly() || fi === category.fields.length - 1" [attr.aria-label]="'Bajar campo ' + field.label">\u2193</button>\r
                  <button type="button" (click)="openField(category.key, field.key)" [disabled]="readonly()">Editar</button>\r
                  <button type="button" (click)="duplicateField(category.key, field.key)" [disabled]="readonly()">Duplicar</button>\r
                  <button type="button" class="danger" (click)="deleteField(category.key, field.key)" [disabled]="readonly()" [attr.aria-label]="'Eliminar campo ' + field.label">Eliminar</button>\r
                } @else {\r
                  <span class="hint">Bloqueado por el sistema</span>\r
                }\r
              </div>\r
            </article>\r
          } @empty { <p class="empty-fields">Agreg\xE1 los campos que necesit\xE1s en esta categor\xEDa.</p> }\r
        </div>\r
        <button type="button" class="primary" (click)="openField(category.key)" [disabled]="readonly()">Agregar campo</button>\r
      } @else { <p class="empty-fields">Agreg\xE1 una categor\xEDa para empezar a configurar los campos.</p> }\r
    </main>\r
  </div>\r
  @if (error() && !fieldDraft()) { <p class="error" role="alert">{{ error() }}</p> }\r
\r
  @if (fieldDraft(); as field) {\r
    <div class="field-dialog-backdrop">\r
      <section class="field-dialog" role="dialog" aria-modal="true" aria-labelledby="field-dialog-title" (keydown.escape)="closeField()" tabindex="-1" cdkTrapFocus [cdkTrapFocusAutoCapture]="true">\r
        <header class="panel-header"><h3 id="field-dialog-title">{{ editTarget()?.fieldKey ? 'Editar campo' : 'Agregar campo' }}</h3><button type="button" (click)="closeField()" aria-label="Cerrar editor del campo">\u2715</button></header>\r
        <fieldset [disabled]="readonly()">\r
          <div class="control-grid">\r
            <label class="control">Etiqueta <input maxlength="150" [ngModel]="field.label" (ngModelChange)="updateDraft({ label: $event })" />@if (draftError('label'); as error) { <span class="field-error" role="alert">{{ error }}</span> }</label>\r
            <label class="control">Tipo <select [ngModel]="field.type" (ngModelChange)="setType($event)">@for (type of fieldTypes; track type.value) { <option [value]="type.value">{{ type.label }}</option> }</select></label>\r
            <label class="control wide">Texto de ayuda <input maxlength="300" [ngModel]="field.placeholder ?? ''" (ngModelChange)="updateDraft({ placeholder: $event })" />@if (draftError('placeholder'); as error) { <span class="field-error" role="alert">{{ error }}</span> }</label>\r
          </div>\r
          @if (editTarget()?.fieldKey) { <p class="hint">Cambiar el tipo reemplaza el campo por uno nuevo. Primero desvincul\xE1 las condiciones y c\xE1lculos que lo usan.</p> }\r
          @if (field.type !== 'FORMULA') {\r
            <label class="checkbox-control"><input type="checkbox" [ngModel]="field.required" (ngModelChange)="updateDraft({ required: $event })" />Respuesta obligatoria</label>\r
          }\r
          @if (field.type === 'NUMBER' || field.type === 'FORMULA') {\r
            <label class="control">Unidad <input maxlength="30" [ngModel]="field.unit ?? ''" (ngModelChange)="updateDraft({ unit: $event })" />@if (draftError('unit'); as error) { <span class="field-error" role="alert">{{ error }}</span> }</label>\r
          }\r
          @if (field.type === 'NUMBER') {\r
            <div class="control-grid">@for (property of ['minimum', 'maximum']; track property) { <label class="control">{{ property === 'minimum' ? 'M\xEDnimo' : 'M\xE1ximo' }}<input type="text" inputmode="decimal" [ngModel]="numericInputs()[property] ?? $any(field)[property] ?? ''" (ngModelChange)="setNumberProperty($any(property), $event)" />@if (draftError($any(property)); as error) { <span class="field-error" role="alert">{{ error }}</span> }</label> }</div>\r
          }\r
          @if (field.type === 'DATE') { <p class="hint">Las fechas se ingresan con el selector del sistema y se muestran como dd/MM/aaaa.</p> }\r
          @if (field.type === 'SELECT') {\r
            <h4>Opciones</h4>\r
            @for (option of field.options ?? []; track $index; let oi = $index) {\r
              <div class="option-row">@for (property of ['label', 'value']; track property) { <label class="control">{{ property === 'label' ? 'Etiqueta' : 'Valor' }}<input [maxlength]="property === 'label' ? 150 : 80" [ngModel]="$any(option)[property]" (ngModelChange)="updateOption(oi, $any(property), $event)" />@if (optionError(oi, $any(property)); as error) { <span class="field-error" role="alert">{{ error }}</span> }</label> }<button type="button" class="danger" (click)="deleteOption(oi)" [attr.aria-label]="'Eliminar opci\xF3n ' + option.label">Eliminar</button></div>\r
            }\r
            <button type="button" (click)="addOption()">Agregar opci\xF3n</button>\r
          }\r
          @if (field.type === 'FORMULA') {\r
            <h4>C\xE1lculo autom\xE1tico</h4>\r
            <label class="control">F\xF3rmula <select [ngModel]="field.formula?.kind ?? 'CUSTOM'" (ngModelChange)="setFormulaKind($event)">@for (kind of formulaKinds; track kind.value) { <option [value]="kind.value">{{ kind.label }}</option> }</select></label>\r
            @if (field.formula?.kind === 'CUSTOM') { <label class="control">Operaci\xF3n <select [ngModel]="field.formula?.operation ?? 'ADD'" (ngModelChange)="setOperation($event)">@for (operation of operations; track operation.value) { <option [value]="operation.value">{{ operation.label }}</option> }</select></label> }\r
            @for (name of formulaInputs(); track name) {\r
              <div class="control-grid"><label class="control">{{ inputLabel(name) }}<select [ngModel]="operandValue(name)" (ngModelChange)="setOperand(name, $event)"><option value="">Elegir origen</option>@for (choice of operandChoices(name); track choice.value) { <option [value]="choice.value">{{ choice.label }}</option> }</select></label>\r
                @if (operandValue(name) === 'constant') { <label class="control">N\xFAmero fijo <input type="text" inputmode="decimal" [ngModel]="numericInputs()['operand:' + name] ?? operandConstant(name)" (ngModelChange)="setOperandConstant(name, $event)" /></label> }\r
                @if (operandError(name); as error) { <span class="field-error" role="alert">{{ error }}</span> }\r
              </div>\r
            }\r
            <p class="hint">El resultado lo calcula el sistema. Las entradas deben indicar los campos o datos del paciente que corresponden.</p>\r
          }\r
          <h4>Cu\xE1ndo mostrar el campo</h4>\r
          <label class="control">Respuesta que controla la visibilidad <select [ngModel]="field.visibleWhen?.fieldKey ?? ''" (ngModelChange)="setVisibility($event)"><option value="">Mostrar siempre</option>@for (controller of visibilityControllers(); track controller.key) { <option [value]="controller.key">{{ controller.label }}</option> }</select></label>\r
          @if (field.visibleWhen) { <label class="control">Mostrar cuando la respuesta sea <select [ngModel]="field.visibleWhen.equals" (ngModelChange)="setVisibilityValue($event)"><option [ngValue]="true">S\xED</option><option [ngValue]="false">No</option></select></label> }\r
        </fieldset>\r
        @if (draftValidationError(); as error) { <p class="error" role="alert">{{ error }}</p> }\r
        <footer class="dialog-actions"><button type="button" (click)="closeField()">Cancelar</button><button type="button" class="primary" (click)="saveField()" [disabled]="readonly() || !!draftValidationError()">Aplicar campo</button></footer>\r
      </section>\r
    </div>\r
  }\r
</section>\r
`, styles: ["/* src/app/features/form-field-editor/form-field-editor.component.css */\n:host {\n  display: block;\n  color: var(--color-on-surface, #0f172a);\n}\n.editor {\n  width: 100%;\n}\n.editor-layout {\n  display: grid;\n  grid-template-columns: minmax(200px, 260px) 1fr;\n  gap: 1.5rem;\n}\n.category-manager {\n  background: var(--color-surface-container-low, #f8fafc);\n  padding: 1rem;\n  border: 1px solid var(--color-outline-variant, #e2e8f0);\n  border-radius: 1rem;\n}\nh3,\nh4 {\n  font-weight: 650;\n  margin: 0 0 .75rem;\n}\nh4 {\n  margin-top: 1.25rem;\n}\n.hint {\n  color: var(--color-on-surface-variant, #64748b);\n  font-size: .8125rem;\n  line-height: 1.5;\n  margin: .5rem 0;\n}\n.category-row {\n  padding: .6rem;\n  border: 1px solid transparent;\n  border-radius: .75rem;\n  margin: .5rem 0;\n}\n.category-row.selected {\n  border-color: #93c5fd;\n  background: var(--dc-blue-surface, #eff6ff);\n}\n.category-row.inactive .category-name {\n  color: var(--dc-ink-muted, #64748b);\n}\n.category-name {\n  width: 100%;\n  padding: 0;\n  border: none;\n  background: transparent;\n  text-align: left;\n  font-weight: 600;\n}\n.category-name span {\n  display: block;\n  margin-top: .25rem;\n  font-size: .75rem;\n  font-weight: 400;\n}\n.category-actions,\n.field-actions,\n.dialog-actions {\n  display: flex;\n  gap: .4rem;\n  flex-wrap: wrap;\n  margin-top: .6rem;\n}\nbutton {\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  border-radius: .55rem;\n  padding: .45rem .7rem;\n  background: var(--dc-surface, #fff);\n  font-size: .8125rem;\n  cursor: pointer;\n}\nbutton:disabled {\n  opacity: .45;\n  cursor: default;\n}\nbutton:focus-visible,\ninput:focus-visible,\nselect:focus-visible {\n  outline: 2px solid #2563eb;\n  outline-offset: 2px;\n}\n.primary {\n  background: #2563eb;\n  border-color: #2563eb;\n  color: white;\n}\n.danger {\n  color: var(--dc-error-ink, #b91c1c);\n}\n.control {\n  display: flex;\n  flex-direction: column;\n  gap: .4rem;\n  font-size: .8125rem;\n  margin: .75rem 0;\n  min-width: 0;\n}\ninput:not([type=checkbox]),\nselect {\n  width: 100%;\n  padding: .6rem .7rem;\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  border-radius: .5rem;\n  background: var(--color-surface, white);\n  color: inherit;\n  min-height: 2.5rem;\n}\n.panel-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.category-title {\n  flex: 1;\n  margin-top: 0;\n}\n.field-card {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: .75rem;\n  padding: 1rem;\n  margin-bottom: .75rem;\n}\n.field-summary {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.field-summary strong {\n  overflow-wrap: anywhere;\n}\n.binding {\n  font-size: .75rem;\n  color: var(--dc-blue-ink, #1d4ed8);\n}\n.notice,\n.error {\n  padding: .75rem;\n  border-radius: .5rem;\n  font-size: .875rem;\n}\n.notice {\n  background: var(--dc-surface-high, #f1f5f9);\n}\n.error {\n  background: var(--dc-error-surface, #fef2f2);\n  color: var(--dc-error-ink, #991b1b);\n  margin-top: 1rem;\n}\n.empty-fields {\n  padding: 2rem 1rem;\n  color: var(--dc-ink-muted, #64748b);\n  text-align: center;\n  border: 1px dashed var(--dc-outline, #cbd5e1);\n  border-radius: .75rem;\n  margin: 1rem 0;\n}\n.field-dialog-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 1100;\n  background: #0f172a80;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n}\n.field-dialog {\n  background: var(--color-surface, white);\n  width: min(100%, 650px);\n  max-height: calc(100dvh - 2rem);\n  overflow-y: auto;\n  padding: 1.5rem;\n  border-radius: 1rem;\n  box-shadow: 0 20px 60px #0003;\n}\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n.control-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0 1rem;\n}\n.wide {\n  grid-column: 1 / -1;\n}\n.checkbox-control {\n  display: flex;\n  gap: .6rem;\n  align-items: center;\n  margin: .75rem 0;\n  font-size: .875rem;\n}\n.option-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr auto;\n  gap: .75rem;\n  align-items: end;\n}\n.option-row button {\n  margin-bottom: .75rem;\n}\n.dialog-actions {\n  justify-content: flex-end;\n  padding-top: 1rem;\n  margin-top: 1rem;\n  border-top: 1px solid var(--dc-outline, #e2e8f0);\n}\n@media (max-width: 850px) {\n  .editor-layout {\n    grid-template-columns: 1fr;\n  }\n  .field-card {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n}\n@media (max-width: 550px) {\n  .control-grid,\n  .option-row {\n    grid-template-columns: 1fr;\n  }\n  .panel-header {\n    align-items: stretch;\n    flex-direction: column;\n  }\n  .field-dialog {\n    padding: 1rem;\n  }\n}\n.field-error {\n  display: block;\n  color: var(--dc-error-ink, #b91c1c);\n  font-size: .8rem;\n  margin-top: 4px;\n}\n/*# sourceMappingURL=form-field-editor.component.css.map */\n"] }]
  }], () => [], { definition: [{ type: Input, args: [{ isSignal: true, alias: "definition", required: false }] }], section: [{ type: Input, args: [{ isSignal: true, alias: "section", required: false }] }], selectedCategoryKey: [{ type: Input, args: [{ isSignal: true, alias: "selectedCategoryKey", required: false }] }], readonly: [{ type: Input, args: [{ isSignal: true, alias: "readonly", required: false }] }], definitionChange: [{ type: Output, args: ["definitionChange"] }], categorySelected: [{ type: Output, args: ["categorySelected"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormFieldEditorComponent, { className: "FormFieldEditorComponent", filePath: "src/app/features/form-field-editor/form-field-editor.component.ts", lineNumber: 22 });
})();

export {
  FormFieldEditorComponent
};
//# debugId=f9d41db2-67d4-5894-b822-f7874ffc805d
//# sourceMappingURL=chunk-YJLQV37Z.js.map
