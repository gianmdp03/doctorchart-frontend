import {
  DoctorProfileService
} from "./chunk-WXC7F5DT.js";
import {
  WorkspaceStore
} from "./chunk-WPGAV52V.js";
import "./chunk-USM5S45Q.js";
import {
  FormFieldEditorComponent
} from "./chunk-YJLQV37Z.js";
import "./chunk-QAJPJLTD.js";
import "./chunk-THOV7R4G.js";
import "./chunk-D4J4ETKO.js";
import "./chunk-BQIFWLNB.js";
import {
  AuthService
} from "./chunk-KGUDCUHJ.js";
import "./chunk-WKCAPCQH.js";
import {
  Router
} from "./chunk-XM57RTTR.js";
import "./chunk-YAYJVLGH.js";
import "./chunk-SYX7XZ26.js";
import {
  Component,
  ViewChildren,
  __spreadProps,
  __spreadValues,
  computed,
  forwardRef,
  inject,
  setClassMetadata,
  signal,
  viewChildren,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuerySignal
} from "./chunk-3HO5VEWU.js";

// src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.ts
var _forTrack0 = ($index, $item) => $item.key;
function OnboardingWizardComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Personalizar fichas y consultas ");
  }
}
function OnboardingWizardComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Configuraci\xF3n inicial ");
  }
}
function OnboardingWizardComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" \xB7 ", ctx.specialty.name, " ");
  }
}
function OnboardingWizardComponent_Conditional_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function OnboardingWizardComponent_Conditional_9_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.exitWizard());
    });
    \u0275\u0275text(1, "Salir conservando borrador");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.editorReadonly());
  }
}
function OnboardingWizardComponent_Conditional_9_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function OnboardingWizardComponent_Conditional_9_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.handleSignOut());
    });
    \u0275\u0275text(1, "Guardar y cerrar sesi\xF3n");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.editorReadonly());
  }
}
function OnboardingWizardComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function OnboardingWizardComponent_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showResetConfirmation.set(true));
    });
    \u0275\u0275text(1, "Restablecer valores iniciales");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(2, OnboardingWizardComponent_Conditional_9_Conditional_2_Template, 2, 1, "button", 14)(3, OnboardingWizardComponent_Conditional_9_Conditional_3_Template, 2, 1, "button", 15);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.editorReadonly());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.isEditMode() ? 2 : 3);
  }
}
function OnboardingWizardComponent_Conditional_10_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r1.progressPercentage(), "% completado");
  }
}
function OnboardingWizardComponent_Conditional_10_For_12_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 30);
    \u0275\u0275element(1, "polyline", 34);
    \u0275\u0275elementEnd();
  }
}
function OnboardingWizardComponent_Conditional_10_For_12_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_54_r6 = \u0275\u0275nextContext().$index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275$index_54_r6 + 1);
  }
}
function OnboardingWizardComponent_Conditional_10_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 27)(1, "button", 28);
    \u0275\u0275listener("click", function OnboardingWizardComponent_Conditional_10_For_12_Template_button_click_1_listener() {
      const \u0275$index_54_r6 = \u0275\u0275restoreView(_r5).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToStep(\u0275$index_54_r6));
    });
    \u0275\u0275elementStart(2, "span", 29);
    \u0275\u0275conditionalCreate(3, OnboardingWizardComponent_Conditional_10_For_12_Conditional_3_Template, 2, 0, "svg", 30)(4, OnboardingWizardComponent_Conditional_10_For_12_Conditional_4_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 31)(6, "span", 32);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 33);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const step_r7 = ctx.$implicit;
    const \u0275$index_54_r6 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", step_r7.key === ctx_r1.activeStepKey())("completed", \u0275$index_54_r6 < ctx_r1.activeStepIndex());
    \u0275\u0275property("disabled", ctx_r1.editorReadonly() || ctx_r1.isEditMode() && step_r7.kind === "specialty");
    \u0275\u0275attribute("aria-current", step_r7.key === ctx_r1.activeStepKey() ? "step" : null);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(\u0275$index_54_r6 < ctx_r1.activeStepIndex() ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Paso ", \u0275$index_54_r6 + 1);
    \u0275\u0275advance();
    \u0275\u0275property("title", step_r7.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(step_r7.title);
  }
}
function OnboardingWizardComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19)(2, "div", 20)(3, "span", 21);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 22);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(7, OnboardingWizardComponent_Conditional_10_Conditional_7_Template, 2, 1, "span", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 24);
    \u0275\u0275element(9, "div", 25);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "ol", 26);
    \u0275\u0275repeaterCreate(11, OnboardingWizardComponent_Conditional_10_For_12_Template, 10, 10, "li", 27, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.activeStepIndex() >= 0 ? "Paso " + (ctx_r1.activeStepIndex() + 1) + " de " + ctx_r1.steps().length : "Organizar categor\xEDas", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.activeStep().title);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.activeStepIndex() >= 0 ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-valuenow", ctx_r1.progressPercentage());
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", ctx_r1.progressPercentage(), "%");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.steps());
  }
}
function OnboardingWizardComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1, "Cargando tu configuraci\xF3n...");
    \u0275\u0275elementEnd();
  }
}
function OnboardingWizardComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.errorMessage());
  }
}
function OnboardingWizardComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.successMessage());
  }
}
function OnboardingWizardComponent_Conditional_14_Conditional_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const latest_r10 = ctx;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Copia guardada: ", latest_r10.specialty.name, ". ", latest_r10.draftDefinition ? "Tiene un borrador pendiente." : "Tiene la configuraci\xF3n aplicada.");
  }
}
function OnboardingWizardComponent_Conditional_14_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "El servidor no tiene una especialidad seleccionada.");
    \u0275\u0275elementEnd();
  }
}
function OnboardingWizardComponent_Conditional_14_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, OnboardingWizardComponent_Conditional_14_Conditional_5_Conditional_0_Template, 2, 2, "p")(1, OnboardingWizardComponent_Conditional_14_Conditional_5_Conditional_1_Template, 2, 0, "p");
    \u0275\u0275elementStart(2, "button", 35);
    \u0275\u0275listener("click", function OnboardingWizardComponent_Conditional_14_Conditional_5_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.useServerCopy());
    });
    \u0275\u0275text(3, "Usar copia del servidor y descartar mis cambios locales");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional((tmp_2_0 = ctx_r1.serverCopy()) ? 0 : 1, tmp_2_0);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isSaving());
  }
}
function OnboardingWizardComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 9)(1, "p");
    \u0275\u0275text(2, "La copia que estabas editando se conserva en pantalla. Guardar, aplicar o restablecer requiere revisar el estado del servidor.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 16);
    \u0275\u0275listener("click", function OnboardingWizardComponent_Conditional_14_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reviewServerCopy());
    });
    \u0275\u0275text(4, "Consultar copia del servidor");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, OnboardingWizardComponent_Conditional_14_Conditional_5_Template, 4, 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.isSaving());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.serverCopyLoaded() ? 5 : -1);
  }
}
function OnboardingWizardComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function OnboardingWizardComponent_Conditional_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadInitial(true));
    });
    \u0275\u0275text(1, "Intentar cargar nuevamente");
    \u0275\u0275elementEnd();
  }
}
function OnboardingWizardComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 11)(1, "p");
    \u0275\u0275text(2, "Se reemplazar\xE1 este borrador por los valores iniciales publicados de tu especialidad. Tu configuraci\xF3n activa seguir\xE1 igual hasta aplicar los cambios.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 16);
    \u0275\u0275listener("click", function OnboardingWizardComponent_Conditional_16_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showResetConfirmation.set(false));
    });
    \u0275\u0275text(4, "Conservar mi borrador");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 35);
    \u0275\u0275listener("click", function OnboardingWizardComponent_Conditional_16_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmResetToDefaults());
    });
    \u0275\u0275text(6, "Restablecer el borrador");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.isSaving());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.editorReadonly());
  }
}
function OnboardingWizardComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 12)(1, "p");
    \u0275\u0275text(2, "Se descartar\xE1n el borrador guardado y los cambios de esta pantalla. Tu configuraci\xF3n activa se conserva.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 16);
    \u0275\u0275listener("click", function OnboardingWizardComponent_Conditional_17_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showDiscardConfirmation.set(false));
    });
    \u0275\u0275text(4, "Seguir editando");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 35);
    \u0275\u0275listener("click", function OnboardingWizardComponent_Conditional_17_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelWizard());
    });
    \u0275\u0275text(6, "Descartar y volver al panel");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.isSaving());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.editorReadonly());
  }
}
function OnboardingWizardComponent_Conditional_18_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2");
    \u0275\u0275text(1, "Categor\xEDas de la ficha del paciente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "app-form-field-editor", 46);
    \u0275\u0275listener("definitionChange", function OnboardingWizardComponent_Conditional_18_Conditional_9_Template_app_form_field_editor_definitionChange_2_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onPatientDefinitionChange($event));
    })("categorySelected", function OnboardingWizardComponent_Conditional_18_Conditional_9_Template_app_form_field_editor_categorySelected_2_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onPatientCategorySelected($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const current_r16 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("definition", current_r16.patientForm)("readonly", ctx_r1.editorReadonly());
  }
}
function OnboardingWizardComponent_Conditional_18_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-form-field-editor", 47);
    \u0275\u0275listener("definitionChange", function OnboardingWizardComponent_Conditional_18_Conditional_10_Template_app_form_field_editor_definitionChange_0_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onPatientDefinitionChange($event));
    })("categorySelected", function OnboardingWizardComponent_Conditional_18_Conditional_10_Template_app_form_field_editor_categorySelected_0_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onPatientCategorySelected($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const current_r16 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("definition", current_r16.patientForm)("selectedCategoryKey", ctx_r1.activeStep().categoryKey ?? null)("readonly", ctx_r1.editorReadonly());
  }
}
function OnboardingWizardComponent_Conditional_18_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 48);
    \u0275\u0275text(1, "Historia Cl\xEDnica est\xE1 presente en todas las especialidades. Sus categor\xEDas y campos se usan en cada consulta.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "app-form-field-editor", 49);
    \u0275\u0275listener("definitionChange", function OnboardingWizardComponent_Conditional_18_Conditional_11_Template_app_form_field_editor_definitionChange_2_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onEncounterDefinitionChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const current_r16 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("definition", current_r16.encounterForm)("readonly", ctx_r1.editorReadonly());
  }
}
function OnboardingWizardComponent_Conditional_18_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 16);
    \u0275\u0275listener("click", function OnboardingWizardComponent_Conditional_18_Conditional_12_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToStep(0));
    });
    \u0275\u0275text(3, "Revisar la selecci\xF3n de especialidad");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Tu especialidad seleccionada es ", ctx_r1.workspace()?.specialty?.name, ".");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.editorReadonly());
  }
}
function OnboardingWizardComponent_Conditional_18_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function OnboardingWizardComponent_Conditional_18_Conditional_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goPrevious());
    });
    \u0275\u0275text(1, "Anterior");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.editorReadonly());
  }
}
function OnboardingWizardComponent_Conditional_18_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function OnboardingWizardComponent_Conditional_18_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.showDiscardConfirmation.set(true));
    });
    \u0275\u0275text(1, "Descartar edici\xF3n");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.editorReadonly());
  }
}
function OnboardingWizardComponent_Conditional_18_Conditional_20_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Guardando... ");
  }
}
function OnboardingWizardComponent_Conditional_18_Conditional_20_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Aplicar cambios ");
  }
}
function OnboardingWizardComponent_Conditional_18_Conditional_20_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Finalizar configuraci\xF3n ");
  }
}
function OnboardingWizardComponent_Conditional_18_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function OnboardingWizardComponent_Conditional_18_Conditional_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.finishOnboarding());
    });
    \u0275\u0275conditionalCreate(1, OnboardingWizardComponent_Conditional_18_Conditional_20_Conditional_1_Template, 1, 0)(2, OnboardingWizardComponent_Conditional_18_Conditional_20_Conditional_2_Template, 1, 0)(3, OnboardingWizardComponent_Conditional_18_Conditional_20_Conditional_3_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.editorReadonly());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSaving() ? 1 : ctx_r1.isEditMode() ? 2 : 3);
  }
}
function OnboardingWizardComponent_Conditional_18_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function OnboardingWizardComponent_Conditional_18_Conditional_21_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goNext());
    });
    \u0275\u0275text(1, "Siguiente");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.editorReadonly());
  }
}
function OnboardingWizardComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 37)(1, "span", 38);
    \u0275\u0275text(2, "Categor\xEDas y campos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h1", 39);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Agreg\xE1, quit\xE1 y organiz\xE1 la informaci\xF3n que necesit\xE1s registrar. Guardar el borrador permite continuar m\xE1s adelante; aplicar cambios lo convierte en tu configuraci\xF3n activa.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 40);
    \u0275\u0275listener("click", function OnboardingWizardComponent_Conditional_18_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showPatientCategories.set(!ctx_r1.showPatientCategories()));
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, OnboardingWizardComponent_Conditional_18_Conditional_9_Template, 3, 2)(10, OnboardingWizardComponent_Conditional_18_Conditional_10_Template, 1, 3, "app-form-field-editor", 41)(11, OnboardingWizardComponent_Conditional_18_Conditional_11_Template, 3, 2)(12, OnboardingWizardComponent_Conditional_18_Conditional_12_Template, 4, 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "footer", 42)(14, "div", 43);
    \u0275\u0275conditionalCreate(15, OnboardingWizardComponent_Conditional_18_Conditional_15_Template, 2, 1, "button", 14);
    \u0275\u0275conditionalCreate(16, OnboardingWizardComponent_Conditional_18_Conditional_16_Template, 2, 1, "button", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 44)(18, "button", 16);
    \u0275\u0275listener("click", function OnboardingWizardComponent_Conditional_18_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveProgress());
    });
    \u0275\u0275text(19, "Guardar borrador");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(20, OnboardingWizardComponent_Conditional_18_Conditional_20_Template, 4, 2, "button", 45);
    \u0275\u0275conditionalCreate(21, OnboardingWizardComponent_Conditional_18_Conditional_21_Template, 2, 1, "button", 45);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.activeStep().title);
    \u0275\u0275advance(3);
    \u0275\u0275attribute("aria-expanded", ctx_r1.showPatientCategories());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.showPatientCategories() ? "Volver al paso actual" : "Organizar todas las categor\xEDas de la ficha", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showPatientCategories() ? 9 : ctx_r1.activeStep().kind === "patient" ? 10 : ctx_r1.activeStep().kind === "encounter" ? 11 : 12);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r1.activeStepIndex() > (ctx_r1.isEditMode() ? 1 : 0) ? 15 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isEditMode() ? 16 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.editorReadonly());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.isEditMode() || ctx_r1.isLastStep() ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.isLastStep() ? 21 : -1);
  }
}
var OnboardingWizardComponent = class _OnboardingWizardComponent {
  workspaceStore = inject(WorkspaceStore);
  doctorProfileService = inject(DoctorProfileService);
  authService = inject(AuthService);
  router = inject(Router);
  editors = viewChildren(
    FormFieldEditorComponent,
    ...ngDevMode ? [{ debugName: "editors" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pendingEditor = computed(
    () => this.editors().some((editor) => editor.pendingChanges()),
    ...ngDevMode ? [{ debugName: "pendingEditor" }] : (
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
  definition = signal(
    null,
    ...ngDevMode ? [{ debugName: "definition" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeStepKey = signal(
    "encounter",
    ...ngDevMode ? [{ debugName: "activeStepKey" }] : (
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
  isSaving = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSaving" }] : (
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
  serverCopy = signal(
    null,
    ...ngDevMode ? [{ debugName: "serverCopy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  serverCopyLoaded = signal(
    false,
    ...ngDevMode ? [{ debugName: "serverCopyLoaded" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showPatientCategories = signal(
    false,
    ...ngDevMode ? [{ debugName: "showPatientCategories" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showResetConfirmation = signal(
    false,
    ...ngDevMode ? [{ debugName: "showResetConfirmation" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showDiscardConfirmation = signal(
    false,
    ...ngDevMode ? [{ debugName: "showDiscardConfirmation" }] : (
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
  isEditMode = computed(
    () => this.workspace()?.onboardingCompleted ?? false,
    ...ngDevMode ? [{ debugName: "isEditMode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  editorReadonly = computed(
    () => this.isLoading() || this.isSaving() || this.hasConflict(),
    ...ngDevMode ? [{ debugName: "editorReadonly" }] : (
      /* istanbul ignore next */
      []
    )
  );
  steps = computed(
    () => [
      { key: "specialty", title: "Especialidad m\xE9dica", kind: "specialty" },
      ...this.definition()?.patientForm.categories.filter((category) => category.enabled).map((category) => ({
        key: `patient:${category.key}`,
        title: category.title,
        kind: "patient",
        categoryKey: category.key
      })) ?? [],
      { key: "encounter", title: "Historia Cl\xEDnica", kind: "encounter" }
    ],
    ...ngDevMode ? [{ debugName: "steps" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeStepIndex = computed(
    () => this.steps().findIndex((step) => step.key === this.activeStepKey()),
    ...ngDevMode ? [{ debugName: "activeStepIndex" }] : (
      /* istanbul ignore next */
      []
    )
  );
  activeStep = computed(
    () => this.steps().find((step) => step.key === this.activeStepKey()) ?? {
      key: this.activeStepKey(),
      title: "Categor\xEDas de la ficha",
      kind: "patient"
    },
    ...ngDevMode ? [{ debugName: "activeStep" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isLastStep = computed(
    () => this.activeStepKey() === "encounter",
    ...ngDevMode ? [{ debugName: "isLastStep" }] : (
      /* istanbul ignore next */
      []
    )
  );
  progressPercentage = computed(
    () => {
      const total = this.steps().length;
      if (total <= 0)
        return 0;
      const current = this.activeStepIndex();
      if (current < 0)
        return 0;
      return Math.min(100, Math.round((current + 1) / total * 100));
    },
    ...ngDevMode ? [{ debugName: "progressPercentage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  async ngOnInit() {
    await this.loadInitial();
  }
  async loadInitial(force = false) {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    try {
      const workspace = await this.workspaceStore.loadSetup(force);
      if (!workspace || !workspace.onboardingCompleted && workspace.currentStepKey === "specialty") {
        await this.router.navigate(["/onboarding/select-specialty"]);
        return;
      }
      this.acceptWorkspace(workspace);
    } catch (error) {
      this.errorMessage.set(this.errorText(error, "No pudimos cargar tu configuraci\xF3n. Intent\xE1 nuevamente."));
    } finally {
      this.isLoading.set(false);
    }
  }
  onPatientDefinitionChange(form) {
    if (this.editorReadonly())
      return;
    this.definition.update((current) => current ? __spreadProps(__spreadValues({}, current), { patientForm: this.copy(form) }) : current);
    if (this.activeStepIndex() < 0)
      this.showPatientCategories.set(true);
    this.successMessage.set(null);
  }
  onPatientCategorySelected(key) {
    if (this.editorReadonly())
      return;
    const category = this.definition()?.patientForm.categories.find((category2) => category2.key === key);
    if (category?.enabled)
      this.activeStepKey.set(`patient:${category.key}`);
  }
  onEncounterDefinitionChange(form) {
    if (this.editorReadonly())
      return;
    this.definition.update((current) => current ? __spreadProps(__spreadValues({}, current), { encounterForm: this.copy(form) }) : current);
    this.successMessage.set(null);
  }
  async goToStep(index) {
    const step = this.steps()[index];
    if (!step || this.editorReadonly() || step.kind === "specialty" && this.isEditMode())
      return;
    const saved = await this.saveDraft(step.key);
    if (saved && step.kind === "specialty")
      await this.router.navigate(["/onboarding/select-specialty"]);
  }
  async goNext() {
    const index = this.activeStepIndex();
    await this.goToStep(index < 0 ? this.steps().length - 1 : index + 1);
  }
  async goPrevious() {
    const index = this.activeStepIndex();
    if (index <= 1 && this.isEditMode())
      return;
    await this.goToStep(index - 1);
  }
  async saveProgress() {
    if (await this.saveDraft(this.activeStepKey())) {
      this.successMessage.set("Borrador guardado. La configuraci\xF3n activa se conserva hasta aplicar los cambios.");
    }
  }
  async finishOnboarding() {
    if (this.editorReadonly())
      return;
    const saved = await this.saveDraft(this.activeStepKey());
    if (!saved)
      return;
    this.isSaving.set(true);
    try {
      const applied = await this.workspaceStore.finishOnboarding(saved.version);
      this.acceptWorkspace(applied);
      await this.router.navigate(["/dashboard"]);
    } catch (error) {
      this.handleWriteError(error, "El borrador est\xE1 guardado, pero no pudimos aplicar los cambios. Revis\xE1 los campos e intent\xE1 nuevamente.");
    } finally {
      this.isSaving.set(false);
    }
  }
  async exitWizard() {
    if (!this.isEditMode() || this.editorReadonly())
      return;
    if (await this.saveDraft(this.activeStepKey()))
      await this.router.navigate(["/dashboard"]);
  }
  async cancelWizard() {
    const workspace = this.workspace();
    if (!workspace || !this.isEditMode() || this.editorReadonly())
      return;
    this.isSaving.set(true);
    this.errorMessage.set(null);
    try {
      const restored = await this.workspaceStore.discardDraft(workspace.version);
      this.acceptWorkspace(restored);
      this.showDiscardConfirmation.set(false);
      await this.router.navigate(["/dashboard"]);
    } catch (error) {
      this.handleWriteError(error, "No pudimos descartar el borrador. Tus cambios locales siguen visibles.");
    } finally {
      this.isSaving.set(false);
    }
  }
  async confirmResetToDefaults() {
    const workspace = this.workspace();
    if (!workspace || this.editorReadonly())
      return;
    this.isSaving.set(true);
    this.errorMessage.set(null);
    try {
      const reset = await this.workspaceStore.resetToDefaults(workspace.version);
      this.acceptWorkspace(reset);
      this.showResetConfirmation.set(false);
      this.successMessage.set("Valores iniciales copiados al borrador. Revisalos y aplic\xE1 los cambios para usarlos.");
    } catch (error) {
      this.handleWriteError(error, "No pudimos restablecer los valores iniciales. Tus cambios locales siguen visibles.");
    } finally {
      this.isSaving.set(false);
    }
  }
  async handleSignOut() {
    if (this.editorReadonly())
      return;
    if (!await this.saveDraft(this.activeStepKey()))
      return;
    this.doctorProfileService.clearProfile();
    await this.authService.signOut();
    this.workspaceStore.clearSetup();
  }
  async reviewServerCopy() {
    if (this.isSaving())
      return;
    this.isSaving.set(true);
    try {
      this.serverCopy.set(await this.workspaceStore.loadSetup(true));
      this.serverCopyLoaded.set(true);
    } catch (error) {
      this.errorMessage.set(this.errorText(error, "No pudimos consultar la copia guardada. Tus cambios locales se conservan."));
    } finally {
      this.isSaving.set(false);
    }
  }
  async useServerCopy() {
    if (!this.serverCopyLoaded() || this.isSaving())
      return;
    const latest = this.serverCopy();
    if (!latest) {
      await this.router.navigate(["/onboarding/select-specialty"]);
      return;
    }
    this.acceptWorkspace(latest);
    this.hasConflict.set(false);
    this.serverCopyLoaded.set(false);
    this.serverCopy.set(null);
    this.errorMessage.set(null);
    this.successMessage.set("Copia del servidor cargada. Pod\xE9s revisarla antes de editar.");
  }
  async saveDraft(stepKey) {
    if (this.pendingEditor()) {
      this.errorMessage.set("Aplic\xE1 o cancel\xE1 el campo en edici\xF3n y complet\xE1 o quit\xE1 la categor\xEDa pendiente antes de continuar.");
      return null;
    }
    const workspace = this.workspace();
    const definition = this.definition();
    if (!workspace || !definition || this.editorReadonly())
      return null;
    this.isSaving.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    try {
      const saved = await this.workspaceStore.saveOnboardingDraft({
        expectedVersion: workspace.version,
        definition: this.copy(definition),
        currentStepKey: stepKey
      });
      this.acceptWorkspace(saved);
      return saved;
    } catch (error) {
      this.handleWriteError(error, "No pudimos guardar el avance. Tus cambios locales se conservan; revis\xE1 los campos y reintent\xE1.");
      return null;
    } finally {
      this.isSaving.set(false);
    }
  }
  acceptWorkspace(workspace) {
    const definition = workspace.draftDefinition ?? workspace.definition;
    if (!definition)
      throw new Error("El backend no devolvi\xF3 una configuraci\xF3n personal.");
    this.workspace.set(this.copy(workspace));
    this.definition.set(this.copy(definition));
    const firstCategory = definition.patientForm.categories.find((category) => category.enabled);
    this.activeStepKey.set(workspace.currentStepKey === "completed" ? firstCategory ? `patient:${firstCategory.key}` : "encounter" : workspace.currentStepKey);
    this.showPatientCategories.set(false);
  }
  handleWriteError(error, fallback) {
    const response = error;
    if (response?.status === 409 && response.error?.code === "VERSION_CONFLICT") {
      this.hasConflict.set(true);
      this.serverCopyLoaded.set(false);
      this.serverCopy.set(null);
      this.errorMessage.set("La configuraci\xF3n cambi\xF3 en otra sesi\xF3n. Tus cambios locales siguen visibles. Revis\xE1 la copia del servidor antes de continuar.");
    } else {
      this.errorMessage.set(this.errorText(error, fallback));
    }
  }
  errorText(error, fallback) {
    const message = error?.error?.message;
    return typeof message === "string" ? message : fallback;
  }
  copy(value) {
    return JSON.parse(JSON.stringify(value));
  }
  static \u0275fac = function OnboardingWizardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OnboardingWizardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OnboardingWizardComponent, selectors: [["app-onboarding-wizard"]], viewQuery: function OnboardingWizardComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.editors, FormFieldEditorComponent, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, decls: 19, vars: 12, consts: [[1, "wizard-container"], ["aria-labelledby", "wizard-title", 1, "wizard-card"], [1, "wizard-header"], [1, "header-row"], [1, "brand-pill"], [1, "header-actions"], ["role", "status"], ["role", "alert", 1, "error-banner"], ["role", "status", 1, "success-banner"], ["aria-label", "Revisar conflicto", 1, "conflict-review"], ["type", "button", 1, "secondary-button"], ["aria-label", "Confirmar restablecimiento", 1, "confirmation-panel"], ["aria-label", "Confirmar descarte", 1, "confirmation-panel"], ["type", "button", 1, "btn-reset-defaults", 3, "click", "disabled"], ["type", "button", 1, "secondary-button", 3, "disabled"], ["type", "button", 1, "signout-button", 3, "disabled"], ["type", "button", 1, "secondary-button", 3, "click", "disabled"], ["type", "button", 1, "signout-button", 3, "click", "disabled"], [1, "progress-section"], [1, "progress-copy"], [1, "progress-step-info"], [1, "step-counter-badge"], [1, "step-counter-title"], [1, "progress-percent-label"], ["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", 1, "progress-track"], [1, "progress-bar-fill"], ["aria-label", "Pasos de configuraci\xF3n", 1, "step-navigation"], [1, "step-item"], ["type", "button", 1, "step-button", 3, "click", "disabled"], ["aria-hidden", "true", 1, "step-indicator"], ["viewBox", "0 0 16 16", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "step-check-icon"], [1, "step-content"], [1, "step-kicker"], [1, "step-title", 3, "title"], ["points", "3.5 8.5 6.5 11.5 12.5 4.5"], ["type", "button", 1, "primary-button", 3, "click", "disabled"], ["type", "button", 1, "secondary-button", 3, "click"], [1, "wizard-content"], [1, "section-kicker"], ["id", "wizard-title"], ["type", "button", 1, "secondary-button", "category-manager-toggle", 3, "click"], ["section", "patientForm", 3, "definition", "selectedCategoryKey", "readonly"], [1, "wizard-footer"], [1, "footer-left"], [1, "footer-right"], ["type", "button", 1, "primary-button", 3, "disabled"], ["section", "patientForm", 3, "definitionChange", "categorySelected", "definition", "readonly"], ["section", "patientForm", 3, "definitionChange", "categorySelected", "definition", "selectedCategoryKey", "readonly"], [1, "section-note"], ["section", "encounterForm", 3, "definitionChange", "definition", "readonly"]], template: function OnboardingWizardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 0)(1, "section", 1)(2, "header", 2)(3, "div", 3)(4, "span", 4);
      \u0275\u0275conditionalCreate(5, OnboardingWizardComponent_Conditional_5_Template, 1, 0)(6, OnboardingWizardComponent_Conditional_6_Template, 1, 0);
      \u0275\u0275conditionalCreate(7, OnboardingWizardComponent_Conditional_7_Template, 1, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 5);
      \u0275\u0275conditionalCreate(9, OnboardingWizardComponent_Conditional_9_Template, 4, 2);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(10, OnboardingWizardComponent_Conditional_10_Template, 13, 6);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(11, OnboardingWizardComponent_Conditional_11_Template, 2, 0, "p", 6);
      \u0275\u0275conditionalCreate(12, OnboardingWizardComponent_Conditional_12_Template, 2, 1, "div", 7);
      \u0275\u0275conditionalCreate(13, OnboardingWizardComponent_Conditional_13_Template, 2, 1, "div", 8);
      \u0275\u0275conditionalCreate(14, OnboardingWizardComponent_Conditional_14_Template, 6, 2, "section", 9);
      \u0275\u0275conditionalCreate(15, OnboardingWizardComponent_Conditional_15_Template, 2, 0, "button", 10);
      \u0275\u0275conditionalCreate(16, OnboardingWizardComponent_Conditional_16_Template, 7, 2, "section", 11);
      \u0275\u0275conditionalCreate(17, OnboardingWizardComponent_Conditional_17_Template, 7, 2, "section", 12);
      \u0275\u0275conditionalCreate(18, OnboardingWizardComponent_Conditional_18_Template, 22, 9);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_11_0;
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.isEditMode() ? 5 : 6);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_1_0 = ctx.workspace()) ? 7 : -1, tmp_1_0);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.definition() ? 9 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.definition() ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 11 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 12 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.successMessage() ? 13 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.hasConflict() ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isLoading() && !ctx.definition() ? 15 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showResetConfirmation() ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showDiscardConfirmation() ? 17 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_11_0 = ctx.definition()) ? 18 : -1, tmp_11_0);
    }
  }, dependencies: [FormFieldEditorComponent], styles: ["\n.wizard-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  justify-content: center;\n  padding: 2.5rem 1.5rem;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n}\n.wizard-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 960px;\n  min-height: 620px;\n  display: flex;\n  flex-direction: column;\n  background: var(--%NS%dc-surface, #fff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 1.25rem;\n  box-shadow: 0 10px 25px -5px rgb(15 23 42 / 5%);\n  padding: 2.5rem;\n}\n.wizard-header[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  padding-bottom: 1.5rem;\n}\n.header-row[_ngcontent-%COMP%], \n.wizard-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: .75rem;\n}\n.brand-pill[_ngcontent-%COMP%] {\n  padding: .35rem .85rem;\n  border-radius: 999px;\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n  color: var(--%NS%dc-ink-secondary, #475569);\n  font-size: .8125rem;\n  font-weight: 600;\n}\n.btn-reset-defaults[_ngcontent-%COMP%] {\n  border: 1px solid #fecaca;\n  background: var(--%NS%dc-error-surface, #fff5f5);\n  color: var(--%NS%dc-error-ink, #dc2626);\n  border-radius: .625rem;\n  font-weight: 600;\n  cursor: pointer;\n  padding: .65rem 1rem;\n  font-size: .8125rem;\n  transition: all .15s ease;\n}\n.btn-reset-defaults[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--%NS%dc-error-surface, #fee2e2);\n  border-color: #f87171;\n}\n.btn-reset-defaults[_ngcontent-%COMP%]:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n}\n.signout-button[_ngcontent-%COMP%], \n.secondary-button[_ngcontent-%COMP%] {\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  background: var(--%NS%dc-surface, #fff);\n  color: var(--%NS%dc-ink-secondary, #475569);\n  border-radius: .625rem;\n  font-weight: 600;\n  cursor: pointer;\n  padding: .7rem 1rem;\n  font-size: .8125rem;\n}\n.signout-button[_ngcontent-%COMP%]:hover, \n.secondary-button[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-surface-low, #f8fafc);\n}\n.btn-save-header[_ngcontent-%COMP%] {\n  padding: .65rem 1.15rem;\n  font-size: .8125rem;\n}\n.progress-section[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n}\n.progress-copy[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: .75rem;\n  margin-bottom: .625rem;\n  flex-wrap: wrap;\n}\n.progress-step-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: .625rem;\n  min-width: 0;\n}\n.step-counter-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: .25rem .625rem;\n  background: var(--%NS%dc-blue-surface, #eff6ff);\n  color: var(--%NS%dc-blue-ink, #1d4ed8);\n  border: 1px solid #dbeafe;\n  border-radius: 999px;\n  font-size: .75rem;\n  font-weight: 700;\n  white-space: nowrap;\n}\n.step-counter-title[_ngcontent-%COMP%] {\n  font-size: .875rem;\n  font-weight: 700;\n  color: var(--%NS%dc-ink, #0f172a);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.progress-percent-label[_ngcontent-%COMP%] {\n  font-size: .75rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  white-space: nowrap;\n  margin-left: auto;\n}\n.progress-track[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 5px;\n  background: var(--%NS%dc-surface-high, #e2e8f0);\n  border-radius: 999px;\n  overflow: hidden;\n}\n.progress-bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #3b82f6,\n      #2563eb);\n  border-radius: 999px;\n  transition: width .3s cubic-bezier(.4, 0, .2, 1);\n}\n.wizard-content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 4rem 0;\n}\n.section-kicker[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-blue-ink, #2563eb);\n  font-size: .8125rem;\n  font-weight: 700;\n  letter-spacing: .06em;\n  text-transform: uppercase;\n}\nh1[_ngcontent-%COMP%] {\n  margin: .5rem 0;\n  color: var(--%NS%dc-ink, #0f172a);\n  font-size: 2rem;\n  letter-spacing: -.025em;\n}\n.wizard-content[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  max-width: 38rem;\n  margin: 0;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  line-height: 1.6;\n}\n.wizard-footer[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  padding-top: 1.5rem;\n}\n.footer-left[_ngcontent-%COMP%], \n.footer-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: .75rem;\n}\n.primary-button[_ngcontent-%COMP%] {\n  border: 0;\n  border-radius: .625rem;\n  background: #2563eb;\n  color: #fff;\n  cursor: pointer;\n  font-weight: 700;\n  padding: .75rem 1.35rem;\n}\n.primary-button[_ngcontent-%COMP%]:disabled, \n.secondary-button[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: .55;\n}\n.error-banner[_ngcontent-%COMP%] {\n  margin-top: 1.25rem;\n  border-left: 4px solid #dc2626;\n  border-radius: .5rem;\n  background: var(--%NS%dc-error-surface, #fef2f2);\n  color: var(--%NS%dc-error-ink, #991b1b);\n  padding: .75rem 1rem;\n  font-size: .875rem;\n}\n.success-banner[_ngcontent-%COMP%] {\n  margin-top: 1.25rem;\n  border-left: 4px solid #16a34a;\n  border-radius: .5rem;\n  background: var(--%NS%dc-success-surface, #f0fdf4);\n  color: var(--%NS%dc-success-ink, #166534);\n  padding: .75rem 1rem;\n  font-size: .875rem;\n}\n@media (max-width: 640px) {\n  .wizard-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .wizard-card[_ngcontent-%COMP%] {\n    min-height: calc(100vh - 2rem);\n    padding: 1.5rem;\n  }\n  .header-row[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .wizard-content[_ngcontent-%COMP%] {\n    padding: 2.75rem 0;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 1.65rem;\n  }\n}\n.step-navigation[_ngcontent-%COMP%] {\n  display: flex;\n  gap: .5rem;\n  list-style: none;\n  padding: .25rem .125rem .5rem;\n  margin: 1.25rem 0 0;\n  overflow-x: auto;\n  scrollbar-width: thin;\n  scrollbar-color: #cbd5e1 transparent;\n  -webkit-overflow-scrolling: touch;\n}\n.step-navigation[_ngcontent-%COMP%]::-webkit-scrollbar {\n  height: 4px;\n}\n.step-navigation[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.step-navigation[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: var(--%NS%dc-surface-high, #cbd5e1);\n  border-radius: 999px;\n}\n.step-navigation[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n.step-item[_ngcontent-%COMP%] {\n  flex: 1 1 0px;\n  min-width: 125px;\n  scroll-margin: .5rem;\n}\n.step-button[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 3.75rem;\n  display: flex;\n  align-items: center;\n  gap: .625rem;\n  padding: .55rem .75rem;\n  background: var(--%NS%dc-surface, #fff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: .75rem;\n  cursor: pointer;\n  text-align: left;\n  transition: all .18s ease;\n  box-shadow: 0 1px 2px 0 rgb(15 23 42 / 3%);\n}\n.step-button[_ngcontent-%COMP%]:hover:not(:disabled):not(.active) {\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  border-color: var(--%NS%dc-outline, #cbd5e1);\n  transform: translateY(-1px);\n  box-shadow: 0 3px 6px -1px rgb(15 23 42 / 6%);\n}\n.step-button.completed[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  border-color: var(--%NS%dc-outline, #e2e8f0);\n}\n.step-button.completed[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n  border-color: var(--%NS%dc-outline, #cbd5e1);\n  transform: translateY(-1px);\n  box-shadow: 0 3px 6px -1px rgb(15 23 42 / 6%);\n}\n.step-button.active[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface, #fff);\n  border: 2px solid #2563eb;\n  box-shadow: 0 0 0 1px #2563eb, 0 4px 12px -2px rgb(37 99 235 / 15%);\n  cursor: default;\n}\n.step-button[_ngcontent-%COMP%]:disabled {\n  opacity: .55;\n  cursor: not-allowed;\n  box-shadow: none;\n  transform: none;\n}\n.step-button[_ngcontent-%COMP%]:focus-visible, \nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #93c5fd;\n  outline-offset: 2px;\n}\n.step-indicator[_ngcontent-%COMP%] {\n  width: 1.625rem;\n  height: 1.625rem;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  font-size: .75rem;\n  font-weight: 700;\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n  color: var(--%NS%dc-ink-muted, #64748b);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  transition: all .18s ease;\n}\n.step-button.completed[_ngcontent-%COMP%]   .step-indicator[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-teal-surface, #ecfdf5);\n  color: var(--%NS%dc-teal-ink, #059669);\n  border-color: #a7f3d0;\n}\n.step-button.active[_ngcontent-%COMP%]   .step-indicator[_ngcontent-%COMP%] {\n  background: #2563eb;\n  color: #fff;\n  border-color: #2563eb;\n  box-shadow: 0 0 0 3px rgb(37 99 235 / 20%);\n}\n.step-check-icon[_ngcontent-%COMP%] {\n  width: .8125rem;\n  height: .8125rem;\n}\n.step-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  flex: 1;\n}\n.step-kicker[_ngcontent-%COMP%] {\n  font-size: .625rem;\n  font-weight: 700;\n  letter-spacing: .05em;\n  text-transform: uppercase;\n  color: var(--%NS%dc-ink-muted, #94a3b8);\n  line-height: 1.2;\n  margin-bottom: .125rem;\n}\n.step-button.completed[_ngcontent-%COMP%]   .step-kicker[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-teal-ink, #059669);\n}\n.step-button.active[_ngcontent-%COMP%]   .step-kicker[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-blue-ink, #2563eb);\n}\n.step-title[_ngcontent-%COMP%] {\n  font-size: .8125rem;\n  font-weight: 600;\n  color: var(--%NS%dc-ink-secondary, #475569);\n  line-height: 1.25;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  word-break: break-word;\n}\n.step-button.completed[_ngcontent-%COMP%]   .step-title[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink-secondary, #334155);\n}\n.step-button.active[_ngcontent-%COMP%]   .step-title[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink, #0f172a);\n  font-weight: 700;\n}\n.category-manager-toggle[_ngcontent-%COMP%] {\n  margin: 1.25rem 0;\n}\n.conflict-review[_ngcontent-%COMP%], \n.confirmation-panel[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding: 1rem;\n  border: 1px solid #fbbf24;\n  border-radius: .75rem;\n  background: var(--%NS%dc-warning-surface, #fffbeb);\n  color: var(--%NS%dc-warning-ink, #78350f);\n}\n.conflict-review[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.confirmation-panel[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 .75rem;\n  line-height: 1.5;\n}\n.conflict-review[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.confirmation-panel[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin: .25rem .5rem .25rem 0;\n}\n.section-note[_ngcontent-%COMP%] {\n  margin-top: 1rem !important;\n}\n.header-actions[_ngcontent-%COMP%], \n.footer-left[_ngcontent-%COMP%], \n.footer-right[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n}\n@media (max-width: 640px) {\n  .wizard-footer[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .footer-right[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n}\n/*# sourceMappingURL=onboarding-wizard.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OnboardingWizardComponent, [{
    type: Component,
    args: [{ selector: "app-onboarding-wizard", imports: [FormFieldEditorComponent], template: `<main class="wizard-container">
  <section class="wizard-card" aria-labelledby="wizard-title">
    <header class="wizard-header">
      <div class="header-row">
        <span class="brand-pill">
          @if (isEditMode()) { Personalizar fichas y consultas } @else { Configuraci\xF3n inicial }
          @if (workspace(); as current) { \xB7 {{ current.specialty.name }} }
        </span>
        <div class="header-actions">
          @if (definition()) {
            <button type="button" class="btn-reset-defaults" [disabled]="editorReadonly()" (click)="showResetConfirmation.set(true)">Restablecer valores iniciales</button>
            @if (isEditMode()) {
              <button type="button" class="secondary-button" [disabled]="editorReadonly()" (click)="exitWizard()">Salir conservando borrador</button>
            } @else {
              <button type="button" class="signout-button" [disabled]="editorReadonly()" (click)="handleSignOut()">Guardar y cerrar sesi\xF3n</button>
            }
          }
        </div>
      </div>
      @if (definition()) {
        <div class="progress-section">
          <div class="progress-copy">
            <div class="progress-step-info">
              <span class="step-counter-badge">
                {{ activeStepIndex() >= 0 ? 'Paso ' + (activeStepIndex() + 1) + ' de ' + steps().length : 'Organizar categor\xEDas' }}
              </span>
              <span class="step-counter-title">{{ activeStep().title }}</span>
            </div>
            @if (activeStepIndex() >= 0) {
              <span class="progress-percent-label">{{ progressPercentage() }}% completado</span>
            }
          </div>
          <div class="progress-track" role="progressbar" [attr.aria-valuenow]="progressPercentage()" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar-fill" [style.width.%]="progressPercentage()"></div>
          </div>
        </div>

        <ol class="step-navigation" aria-label="Pasos de configuraci\xF3n">
          @for (step of steps(); track step.key; let index = $index) {
            <li class="step-item">
              <button type="button"
                class="step-button"
                [class.active]="step.key === activeStepKey()"
                [class.completed]="index < activeStepIndex()"
                [attr.aria-current]="step.key === activeStepKey() ? 'step' : null"
                [disabled]="editorReadonly() || (isEditMode() && step.kind === 'specialty')"
                (click)="goToStep(index)">
                <span class="step-indicator" aria-hidden="true">
                  @if (index < activeStepIndex()) {
                    <svg class="step-check-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                    </svg>
                  } @else {
                    <span>{{ index + 1 }}</span>
                  }
                </span>
                <div class="step-content">
                  <span class="step-kicker">Paso {{ index + 1 }}</span>
                  <span class="step-title" [title]="step.title">{{ step.title }}</span>
                </div>
              </button>
            </li>
          }
        </ol>
      }
    </header>

    @if (isLoading()) { <p role="status">Cargando tu configuraci\xF3n...</p> }
    @if (errorMessage()) { <div class="error-banner" role="alert">{{ errorMessage() }}</div> }
    @if (successMessage()) { <div class="success-banner" role="status">{{ successMessage() }}</div> }

    @if (hasConflict()) {
      <section class="conflict-review" aria-label="Revisar conflicto">
        <p>La copia que estabas editando se conserva en pantalla. Guardar, aplicar o restablecer requiere revisar el estado del servidor.</p>
        <button type="button" class="secondary-button" [disabled]="isSaving()" (click)="reviewServerCopy()">Consultar copia del servidor</button>
        @if (serverCopyLoaded()) {
          @if (serverCopy(); as latest) {
            <p>Copia guardada: {{ latest.specialty.name }}. {{ latest.draftDefinition ? 'Tiene un borrador pendiente.' : 'Tiene la configuraci\xF3n aplicada.' }}</p>
          } @else { <p>El servidor no tiene una especialidad seleccionada.</p> }
          <button type="button" class="primary-button" [disabled]="isSaving()" (click)="useServerCopy()">Usar copia del servidor y descartar mis cambios locales</button>
        }
      </section>
    }

    @if (!isLoading() && !definition()) {
      <button type="button" class="secondary-button" (click)="loadInitial(true)">Intentar cargar nuevamente</button>
    }

    @if (showResetConfirmation()) {
      <section class="confirmation-panel" aria-label="Confirmar restablecimiento">
        <p>Se reemplazar\xE1 este borrador por los valores iniciales publicados de tu especialidad. Tu configuraci\xF3n activa seguir\xE1 igual hasta aplicar los cambios.</p>
        <button type="button" class="secondary-button" [disabled]="isSaving()" (click)="showResetConfirmation.set(false)">Conservar mi borrador</button>
        <button type="button" class="primary-button" [disabled]="editorReadonly()" (click)="confirmResetToDefaults()">Restablecer el borrador</button>
      </section>
    }
    @if (showDiscardConfirmation()) {
      <section class="confirmation-panel" aria-label="Confirmar descarte">
        <p>Se descartar\xE1n el borrador guardado y los cambios de esta pantalla. Tu configuraci\xF3n activa se conserva.</p>
        <button type="button" class="secondary-button" [disabled]="isSaving()" (click)="showDiscardConfirmation.set(false)">Seguir editando</button>
        <button type="button" class="primary-button" [disabled]="editorReadonly()" (click)="cancelWizard()">Descartar y volver al panel</button>
      </section>
    }

    @if (definition(); as current) {
      <section class="wizard-content">
        <span class="section-kicker">Categor\xEDas y campos</span>
        <h1 id="wizard-title">{{ activeStep().title }}</h1>
        <p>Agreg\xE1, quit\xE1 y organiz\xE1 la informaci\xF3n que necesit\xE1s registrar. Guardar el borrador permite continuar m\xE1s adelante; aplicar cambios lo convierte en tu configuraci\xF3n activa.</p>
        <button type="button" class="secondary-button category-manager-toggle"
          [attr.aria-expanded]="showPatientCategories()" (click)="showPatientCategories.set(!showPatientCategories())">
          {{ showPatientCategories() ? 'Volver al paso actual' : 'Organizar todas las categor\xEDas de la ficha' }}
        </button>

        @if (showPatientCategories()) {
          <h2>Categor\xEDas de la ficha del paciente</h2>
          <app-form-field-editor [definition]="current.patientForm" section="patientForm"
            [readonly]="editorReadonly()" (definitionChange)="onPatientDefinitionChange($event)"
            (categorySelected)="onPatientCategorySelected($event)" />
        } @else if (activeStep().kind === 'patient') {
          <app-form-field-editor [definition]="current.patientForm" section="patientForm"
            [selectedCategoryKey]="activeStep().categoryKey ?? null"
            [readonly]="editorReadonly()" (definitionChange)="onPatientDefinitionChange($event)"
            (categorySelected)="onPatientCategorySelected($event)" />
        } @else if (activeStep().kind === 'encounter') {
          <p class="section-note">Historia Cl\xEDnica est\xE1 presente en todas las especialidades. Sus categor\xEDas y campos se usan en cada consulta.</p>
          <app-form-field-editor [definition]="current.encounterForm" section="encounterForm"
            [readonly]="editorReadonly()" (definitionChange)="onEncounterDefinitionChange($event)" />
        } @else {
          <p>Tu especialidad seleccionada es {{ workspace()?.specialty?.name }}.</p>
          <button type="button" class="secondary-button" [disabled]="editorReadonly()" (click)="goToStep(0)">Revisar la selecci\xF3n de especialidad</button>
        }
      </section>

      <footer class="wizard-footer">
        <div class="footer-left">
          @if (activeStepIndex() > (isEditMode() ? 1 : 0)) {
            <button type="button" class="secondary-button" [disabled]="editorReadonly()" (click)="goPrevious()">Anterior</button>
          }
          @if (isEditMode()) {
            <button type="button" class="secondary-button" [disabled]="editorReadonly()" (click)="showDiscardConfirmation.set(true)">Descartar edici\xF3n</button>
          }
        </div>
        <div class="footer-right">
          <button type="button" class="secondary-button" [disabled]="editorReadonly()" (click)="saveProgress()">Guardar borrador</button>
          @if (isEditMode() || isLastStep()) {
            <button type="button" class="primary-button" [disabled]="editorReadonly()" (click)="finishOnboarding()">
              @if (isSaving()) { Guardando... } @else if (isEditMode()) { Aplicar cambios } @else { Finalizar configuraci\xF3n }
            </button>
          }
          @if (!isLastStep()) {
            <button type="button" class="primary-button" [disabled]="editorReadonly()" (click)="goNext()">Siguiente</button>
          }
        </div>
      </footer>
    }
  </section>
</main>\r
`, styles: ["/* src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.css */\n.wizard-container {\n  min-height: 100vh;\n  display: flex;\n  justify-content: center;\n  padding: 2.5rem 1.5rem;\n  background: var(--dc-surface-low, #f8fafc);\n}\n.wizard-card {\n  width: 100%;\n  max-width: 960px;\n  min-height: 620px;\n  display: flex;\n  flex-direction: column;\n  background: var(--dc-surface, #fff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 1.25rem;\n  box-shadow: 0 10px 25px -5px rgb(15 23 42 / 5%);\n  padding: 2.5rem;\n}\n.wizard-header {\n  border-bottom: 1px solid var(--dc-outline, #e2e8f0);\n  padding-bottom: 1.5rem;\n}\n.header-row,\n.wizard-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n.header-actions {\n  display: flex;\n  align-items: center;\n  gap: .75rem;\n}\n.brand-pill {\n  padding: .35rem .85rem;\n  border-radius: 999px;\n  background: var(--dc-surface-high, #f1f5f9);\n  color: var(--dc-ink-secondary, #475569);\n  font-size: .8125rem;\n  font-weight: 600;\n}\n.btn-reset-defaults {\n  border: 1px solid #fecaca;\n  background: var(--dc-error-surface, #fff5f5);\n  color: var(--dc-error-ink, #dc2626);\n  border-radius: .625rem;\n  font-weight: 600;\n  cursor: pointer;\n  padding: .65rem 1rem;\n  font-size: .8125rem;\n  transition: all .15s ease;\n}\n.btn-reset-defaults:hover:not(:disabled) {\n  background: var(--dc-error-surface, #fee2e2);\n  border-color: #f87171;\n}\n.btn-reset-defaults:disabled {\n  opacity: .5;\n  cursor: not-allowed;\n}\n.signout-button,\n.secondary-button {\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  background: var(--dc-surface, #fff);\n  color: var(--dc-ink-secondary, #475569);\n  border-radius: .625rem;\n  font-weight: 600;\n  cursor: pointer;\n  padding: .7rem 1rem;\n  font-size: .8125rem;\n}\n.signout-button:hover,\n.secondary-button:hover {\n  background: var(--dc-surface-low, #f8fafc);\n}\n.btn-save-header {\n  padding: .65rem 1.15rem;\n  font-size: .8125rem;\n}\n.progress-section {\n  margin-top: 1.5rem;\n}\n.progress-copy {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: .75rem;\n  margin-bottom: .625rem;\n  flex-wrap: wrap;\n}\n.progress-step-info {\n  display: flex;\n  align-items: center;\n  gap: .625rem;\n  min-width: 0;\n}\n.step-counter-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: .25rem .625rem;\n  background: var(--dc-blue-surface, #eff6ff);\n  color: var(--dc-blue-ink, #1d4ed8);\n  border: 1px solid #dbeafe;\n  border-radius: 999px;\n  font-size: .75rem;\n  font-weight: 700;\n  white-space: nowrap;\n}\n.step-counter-title {\n  font-size: .875rem;\n  font-weight: 700;\n  color: var(--dc-ink, #0f172a);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.progress-percent-label {\n  font-size: .75rem;\n  font-weight: 600;\n  color: var(--dc-ink-muted, #64748b);\n  white-space: nowrap;\n  margin-left: auto;\n}\n.progress-track {\n  width: 100%;\n  height: 5px;\n  background: var(--dc-surface-high, #e2e8f0);\n  border-radius: 999px;\n  overflow: hidden;\n}\n.progress-bar-fill {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      #3b82f6,\n      #2563eb);\n  border-radius: 999px;\n  transition: width .3s cubic-bezier(.4, 0, .2, 1);\n}\n.wizard-content {\n  flex: 1;\n  padding: 4rem 0;\n}\n.section-kicker {\n  color: var(--dc-blue-ink, #2563eb);\n  font-size: .8125rem;\n  font-weight: 700;\n  letter-spacing: .06em;\n  text-transform: uppercase;\n}\nh1 {\n  margin: .5rem 0;\n  color: var(--dc-ink, #0f172a);\n  font-size: 2rem;\n  letter-spacing: -.025em;\n}\n.wizard-content > p {\n  max-width: 38rem;\n  margin: 0;\n  color: var(--dc-ink-muted, #64748b);\n  line-height: 1.6;\n}\n.wizard-footer {\n  border-top: 1px solid var(--dc-outline, #e2e8f0);\n  padding-top: 1.5rem;\n}\n.footer-left,\n.footer-right {\n  display: flex;\n  align-items: center;\n  gap: .75rem;\n}\n.primary-button {\n  border: 0;\n  border-radius: .625rem;\n  background: #2563eb;\n  color: #fff;\n  cursor: pointer;\n  font-weight: 700;\n  padding: .75rem 1.35rem;\n}\n.primary-button:disabled,\n.secondary-button:disabled {\n  cursor: not-allowed;\n  opacity: .55;\n}\n.error-banner {\n  margin-top: 1.25rem;\n  border-left: 4px solid #dc2626;\n  border-radius: .5rem;\n  background: var(--dc-error-surface, #fef2f2);\n  color: var(--dc-error-ink, #991b1b);\n  padding: .75rem 1rem;\n  font-size: .875rem;\n}\n.success-banner {\n  margin-top: 1.25rem;\n  border-left: 4px solid #16a34a;\n  border-radius: .5rem;\n  background: var(--dc-success-surface, #f0fdf4);\n  color: var(--dc-success-ink, #166534);\n  padding: .75rem 1rem;\n  font-size: .875rem;\n}\n@media (max-width: 640px) {\n  .wizard-container {\n    padding: 1rem;\n  }\n  .wizard-card {\n    min-height: calc(100vh - 2rem);\n    padding: 1.5rem;\n  }\n  .header-row {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .wizard-content {\n    padding: 2.75rem 0;\n  }\n  h1 {\n    font-size: 1.65rem;\n  }\n}\n.step-navigation {\n  display: flex;\n  gap: .5rem;\n  list-style: none;\n  padding: .25rem .125rem .5rem;\n  margin: 1.25rem 0 0;\n  overflow-x: auto;\n  scrollbar-width: thin;\n  scrollbar-color: #cbd5e1 transparent;\n  -webkit-overflow-scrolling: touch;\n}\n.step-navigation::-webkit-scrollbar {\n  height: 4px;\n}\n.step-navigation::-webkit-scrollbar-track {\n  background: transparent;\n}\n.step-navigation::-webkit-scrollbar-thumb {\n  background: var(--dc-surface-high, #cbd5e1);\n  border-radius: 999px;\n}\n.step-navigation::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n.step-item {\n  flex: 1 1 0px;\n  min-width: 125px;\n  scroll-margin: .5rem;\n}\n.step-button {\n  width: 100%;\n  min-height: 3.75rem;\n  display: flex;\n  align-items: center;\n  gap: .625rem;\n  padding: .55rem .75rem;\n  background: var(--dc-surface, #fff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: .75rem;\n  cursor: pointer;\n  text-align: left;\n  transition: all .18s ease;\n  box-shadow: 0 1px 2px 0 rgb(15 23 42 / 3%);\n}\n.step-button:hover:not(:disabled):not(.active) {\n  background: var(--dc-surface-low, #f8fafc);\n  border-color: var(--dc-outline, #cbd5e1);\n  transform: translateY(-1px);\n  box-shadow: 0 3px 6px -1px rgb(15 23 42 / 6%);\n}\n.step-button.completed {\n  background: var(--dc-surface-low, #f8fafc);\n  border-color: var(--dc-outline, #e2e8f0);\n}\n.step-button.completed:hover:not(:disabled) {\n  background: var(--dc-surface-high, #f1f5f9);\n  border-color: var(--dc-outline, #cbd5e1);\n  transform: translateY(-1px);\n  box-shadow: 0 3px 6px -1px rgb(15 23 42 / 6%);\n}\n.step-button.active {\n  background: var(--dc-surface, #fff);\n  border: 2px solid #2563eb;\n  box-shadow: 0 0 0 1px #2563eb, 0 4px 12px -2px rgb(37 99 235 / 15%);\n  cursor: default;\n}\n.step-button:disabled {\n  opacity: .55;\n  cursor: not-allowed;\n  box-shadow: none;\n  transform: none;\n}\n.step-button:focus-visible,\nbutton:focus-visible {\n  outline: 3px solid #93c5fd;\n  outline-offset: 2px;\n}\n.step-indicator {\n  width: 1.625rem;\n  height: 1.625rem;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  font-size: .75rem;\n  font-weight: 700;\n  background: var(--dc-surface-high, #f1f5f9);\n  color: var(--dc-ink-muted, #64748b);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  transition: all .18s ease;\n}\n.step-button.completed .step-indicator {\n  background: var(--dc-teal-surface, #ecfdf5);\n  color: var(--dc-teal-ink, #059669);\n  border-color: #a7f3d0;\n}\n.step-button.active .step-indicator {\n  background: #2563eb;\n  color: #fff;\n  border-color: #2563eb;\n  box-shadow: 0 0 0 3px rgb(37 99 235 / 20%);\n}\n.step-check-icon {\n  width: .8125rem;\n  height: .8125rem;\n}\n.step-content {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  flex: 1;\n}\n.step-kicker {\n  font-size: .625rem;\n  font-weight: 700;\n  letter-spacing: .05em;\n  text-transform: uppercase;\n  color: var(--dc-ink-muted, #94a3b8);\n  line-height: 1.2;\n  margin-bottom: .125rem;\n}\n.step-button.completed .step-kicker {\n  color: var(--dc-teal-ink, #059669);\n}\n.step-button.active .step-kicker {\n  color: var(--dc-blue-ink, #2563eb);\n}\n.step-title {\n  font-size: .8125rem;\n  font-weight: 600;\n  color: var(--dc-ink-secondary, #475569);\n  line-height: 1.25;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  word-break: break-word;\n}\n.step-button.completed .step-title {\n  color: var(--dc-ink-secondary, #334155);\n}\n.step-button.active .step-title {\n  color: var(--dc-ink, #0f172a);\n  font-weight: 700;\n}\n.category-manager-toggle {\n  margin: 1.25rem 0;\n}\n.conflict-review,\n.confirmation-panel {\n  margin-top: 1rem;\n  padding: 1rem;\n  border: 1px solid #fbbf24;\n  border-radius: .75rem;\n  background: var(--dc-warning-surface, #fffbeb);\n  color: var(--dc-warning-ink, #78350f);\n}\n.conflict-review p,\n.confirmation-panel p {\n  margin: 0 0 .75rem;\n  line-height: 1.5;\n}\n.conflict-review button,\n.confirmation-panel button {\n  margin: .25rem .5rem .25rem 0;\n}\n.section-note {\n  margin-top: 1rem !important;\n}\n.header-actions,\n.footer-left,\n.footer-right {\n  flex-wrap: wrap;\n}\n@media (max-width: 640px) {\n  .wizard-footer {\n    flex-direction: column;\n    align-items: stretch;\n  }\n  .footer-right {\n    justify-content: flex-start;\n  }\n}\n/*# sourceMappingURL=onboarding-wizard.component.css.map */\n"] }]
  }], null, { editors: [{ type: ViewChildren, args: [forwardRef(() => FormFieldEditorComponent), { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OnboardingWizardComponent, { className: "OnboardingWizardComponent", filePath: "src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.ts", lineNumber: 24 });
})();
export {
  OnboardingWizardComponent
};
//# debugId=708a30e5-9aaa-5d6e-83ad-912ff1c44563
//# sourceMappingURL=chunk-6HAHA7RP.js.map
