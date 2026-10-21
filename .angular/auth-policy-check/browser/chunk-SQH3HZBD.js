import {
  FormFieldEditorComponent
} from "./chunk-YJLQV37Z.js";
import "./chunk-QAJPJLTD.js";
import "./chunk-THOV7R4G.js";
import "./chunk-D4J4ETKO.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgModel
} from "./chunk-BQIFWLNB.js";
import {
  AuthService
} from "./chunk-KGUDCUHJ.js";
import {
  environment
} from "./chunk-WKCAPCQH.js";
import "./chunk-YAYJVLGH.js";
import {
  HttpClient
} from "./chunk-SYX7XZ26.js";
import {
  Component,
  Injectable,
  ViewChildren,
  __spreadProps,
  __spreadValues,
  computed,
  effect,
  firstValueFrom,
  forwardRef,
  inject,
  setClassMetadata,
  signal,
  untracked,
  viewChildren,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵviewQuerySignal
} from "./chunk-3HO5VEWU.js";

// src/app/core/services/admin-specialty.service.ts
var AdminSpecialtyService = class _AdminSpecialtyService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/admin/specialties`;
  getSpecialties() {
    return this.http.get(this.baseUrl);
  }
  createSpecialty(request) {
    return this.http.post(this.baseUrl, request);
  }
  updateSpecialty(id, request) {
    return this.http.patch(`${this.baseUrl}/${id}`, request);
  }
  getWizard(id) {
    return this.http.get(`${this.baseUrl}/${id}/wizard`);
  }
  saveWizardDraft(id, request) {
    return this.http.put(`${this.baseUrl}/${id}/wizard/draft`, request);
  }
  publishWizard(id, expectedVersion) {
    return this.http.post(`${this.baseUrl}/${id}/wizard/publish`, { expectedVersion });
  }
  static \u0275fac = function AdminSpecialtyService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminSpecialtyService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AdminSpecialtyService, factory: _AdminSpecialtyService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminSpecialtyService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/core/models/wizard-definition.model.ts
var createSystemPatientProfileCategory = () => ({
  key: "sys_patient_profile",
  title: "Datos Personales",
  enabled: true,
  system: true,
  fields: [
    {
      key: "sys_firstName",
      label: "Nombre",
      type: "TEXT",
      required: true,
      system: true
    },
    {
      key: "sys_lastName",
      label: "Apellido",
      type: "TEXT",
      required: true,
      system: true
    },
    {
      key: "sys_dni",
      label: "DNI",
      type: "TEXT",
      required: true,
      system: true
    },
    {
      key: "sys_dob",
      label: "Fecha de nacimiento",
      type: "DATE",
      required: true,
      system: true
    },
    {
      key: "sys_sex",
      label: "Sexo",
      type: "SELECT",
      required: true,
      system: true,
      options: [
        { value: "MALE", label: "Masculino" },
        { value: "FEMALE", label: "Femenino" },
        { value: "OTHER", label: "Otro" },
        { value: "UNKNOWN", label: "Sin informaci\xF3n" }
      ]
    },
    {
      key: "sys_phone",
      label: "Tel\xE9fono",
      type: "TEXT",
      required: false,
      system: true
    },
    {
      key: "sys_email",
      label: "Email",
      type: "TEXT",
      required: false,
      system: true
    },
    {
      key: "sys_insurance",
      label: "Obra social / Cobertura",
      type: "TEXT",
      required: false,
      system: true
    }
  ]
});
var createDefaultWizardDefinition = () => ({
  schemaVersion: 1,
  patientForm: {
    categories: [createSystemPatientProfileCategory()]
  },
  encounterForm: {
    categories: []
  },
  modulesConfig: {
    MEDICATION_CATALOG: false,
    AI_ASSISTANT: false,
    GROWTH_CHARTS: false
  }
});

// src/app/features/admin-specialties/admin-specialties.component.ts
var _c0 = (a0) => [a0];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.key;
function AdminSpecialtiesComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1, "Procesando...");
    \u0275\u0275elementEnd();
  }
}
function AdminSpecialtiesComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function AdminSpecialtiesComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.success());
  }
}
function AdminSpecialtiesComponent_Conditional_14_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const issue_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.issueText(issue_r2));
  }
}
function AdminSpecialtiesComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 7);
    \u0275\u0275repeaterCreate(1, AdminSpecialtiesComponent_Conditional_14_For_2_Template, 2, 1, "li", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.validationIssues());
  }
}
function AdminSpecialtiesComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 8)(1, "h2");
    \u0275\u0275text(2, "Acceso restringido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "Necesit\xE1s una cuenta con rol Superadmin para administrar el cat\xE1logo.");
    \u0275\u0275elementEnd()();
  }
}
function AdminSpecialtiesComponent_Conditional_16_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 9)(1, "p");
    \u0275\u0275text(2, "Hay cambios locales pendientes. Continuar descartar\xE1 esta edici\xF3n; el borrador guardado en el servidor se conserva.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 13);
    \u0275\u0275listener("click", function AdminSpecialtiesComponent_Conditional_16_Conditional_0_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.pendingSelection.set(null));
    });
    \u0275\u0275text(4, "Seguir editando");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 17);
    \u0275\u0275listener("click", function AdminSpecialtiesComponent_Conditional_16_Conditional_0_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.confirmSelection());
    });
    \u0275\u0275text(6, "Descartar cambios locales y continuar");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.busy());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.busy());
  }
}
function AdminSpecialtiesComponent_Conditional_16_For_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function AdminSpecialtiesComponent_Conditional_16_For_9_Template_button_click_0_listener() {
      const specialty_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.requestSelect(specialty_r6.id));
    });
    \u0275\u0275elementStart(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 19);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const specialty_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", !ctx_r0.creating() && ctx_r0.selectedSpecialty()?.id === specialty_r6.id);
    \u0275\u0275property("disabled", ctx_r0.busy());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(specialty_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(specialty_r6.code);
    \u0275\u0275advance();
    \u0275\u0275classProp("active", specialty_r6.active);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(specialty_r6.active ? "Activa" : "Inactiva / borrador");
  }
}
function AdminSpecialtiesComponent_Conditional_16_ForEmpty_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1, "No hay especialidades en el cat\xE1logo administrativo.");
    \u0275\u0275elementEnd();
  }
}
function AdminSpecialtiesComponent_Conditional_16_ForEmpty_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AdminSpecialtiesComponent_Conditional_16_ForEmpty_10_Conditional_0_Template, 2, 0, "p");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(!ctx_r0.busy() && !ctx_r0.error() ? 0 : -1);
  }
}
function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const saved_r8 = ctx;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Publicaci\xF3n ", saved_r8.publishedVersion, "", saved_r8.publishedDefinition ? "" : " \xB7 sin publicar");
  }
}
function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_6_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 17);
    \u0275\u0275listener("click", function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_6_Conditional_5_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.useRemote());
    });
    \u0275\u0275text(3, "Usar copia del servidor y descartar mis cambios locales");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const remote_r11 = ctx;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("", remote_r11.specialty.name, " \xB7 ", remote_r11.specialty.active ? "Activa" : "Inactiva", " \xB7 Publicaci\xF3n ", remote_r11.wizard.publishedVersion);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.busy());
  }
}
function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 22)(1, "p");
    \u0275\u0275text(2, "El servidor cambi\xF3 desde que abriste esta copia. Los datos y campos que estabas editando siguen visibles. Revis\xE1 el estado del servidor antes de continuar.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 13);
    \u0275\u0275listener("click", function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_6_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.reviewRemote());
    });
    \u0275\u0275text(4, "Consultar copia del servidor");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_6_Conditional_5_Template, 4, 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.busy());
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_5_0 = ctx_r0.remoteCopy()) ? 5 : -1, tmp_5_0);
  }
}
function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 23)(1, "p");
    \u0275\u0275text(2, "El wizard fue publicado, pero falta recuperar la revisi\xF3n actual de la especialidad. Actualiz\xE1 la lista antes de volver a guardar.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 13);
    \u0275\u0275listener("click", function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_7_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.refreshCatalog());
    });
    \u0275\u0275text(4, "Recuperar revisi\xF3n actual");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.busy());
  }
}
function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "button", 13);
    \u0275\u0275listener("click", function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_22_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.saveMetadata());
    });
    \u0275\u0275text(2, "Guardar nombre y descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 13);
    \u0275\u0275listener("click", function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_22_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.toggleActive());
    });
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r0.canEditExisting() || ctx_r0.metadataStale() || !ctx_r0.metadataDirty());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r0.canEditExisting() || ctx_r0.metadataStale());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.selectedSpecialty()?.active ? "Desactivar especialidad" : "Activar especialidad");
  }
}
function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 23)(1, "p");
    \u0275\u0275text(2, "La especialidad fue creada. Falta cargar su wizard para continuar editando.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 13);
    \u0275\u0275listener("click", function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_23_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.reloadWizard());
    });
    \u0275\u0275text(4, "Volver a cargar el wizard");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.busy());
  }
}
function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_24_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label")(1, "input", 34);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_24_For_4_Template_input_ngModelChange_1_listener($event) {
      const capability_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.setCapability(capability_r16.key, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const capability_r16 = ctx.$implicit;
    const current_r17 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", current_r17.modulesConfig[capability_r16.key]);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(capability_r16.label);
  }
}
function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_24_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1, "Ficha del paciente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "app-form-field-editor", 35);
    \u0275\u0275listener("definitionChange", function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_24_For_6_Template_app_form_field_editor_definitionChange_2_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.onDefinitionChange("patientForm", $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "Historia Cl\xEDnica");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 21);
    \u0275\u0275text(6, "Esta secci\xF3n est\xE1 presente en todas las especialidades. Organiz\xE1 sus categor\xEDas y campos para cada consulta.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "app-form-field-editor", 36);
    \u0275\u0275listener("definitionChange", function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_24_For_6_Template_app_form_field_editor_definitionChange_7_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.onDefinitionChange("encounterForm", $event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const current_r17 = \u0275\u0275nextContext(2);
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("definition", current_r17.patientForm)("readonly", ctx_r0.readonly());
    \u0275\u0275advance(5);
    \u0275\u0275property("definition", current_r17.encounterForm)("readonly", ctx_r0.readonly());
  }
}
function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_24_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
    \u0275\u0275text(1, "Aplic\xE1 o cancel\xE1 el campo abierto y complet\xE1 las categor\xEDas pendientes antes de guardar el wizard.");
    \u0275\u0275elementEnd();
  }
}
function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_24_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_24_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.createSpecialty());
    });
    \u0275\u0275text(1, "Crear como borrador");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", ctx_r0.readonly() || ctx_r0.pendingEditor());
  }
}
function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_24_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_24_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.saveDraft());
    });
    \u0275\u0275text(1, "Guardar borrador del wizard");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 3);
    \u0275\u0275listener("click", function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_24_Conditional_10_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r0 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r0.publishWizard());
    });
    \u0275\u0275text(3, "Guardar y publicar wizard");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("disabled", !ctx_r0.canEditExisting() || ctx_r0.metadataStale() || ctx_r0.pendingEditor());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r0.canEditExisting() || ctx_r0.metadataStale() || ctx_r0.pendingEditor());
  }
}
function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "fieldset", 31)(1, "legend");
    \u0275\u0275text(2, "Funciones disponibles");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_24_For_4_Template, 3, 2, "label", null, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_24_For_6_Template, 8, 4, null, null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275conditionalCreate(7, AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_24_Conditional_7_Template, 2, 0, "p", 23);
    \u0275\u0275elementStart(8, "footer", 32);
    \u0275\u0275conditionalCreate(9, AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_24_Conditional_9_Template, 2, 1, "button", 33)(10, AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_24_Conditional_10_Template, 4, 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("disabled", ctx_r0.readonly());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.capabilities);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(\u0275\u0275pureFunction1(3, _c0, ctx_r0.editorGeneration()));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.pendingEditor() ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.creating() ? 9 : 10);
  }
}
function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_3_Template, 2, 2, "span", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 21);
    \u0275\u0275text(5, "Los cambios del wizard se guardan como borrador. Publicar los habilita para nuevas selecciones y conserva las copias personales de los m\xE9dicos existentes.");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_6_Template, 6, 2, "section", 22);
    \u0275\u0275conditionalCreate(7, AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_7_Template, 5, 1, "section", 23);
    \u0275\u0275elementStart(8, "fieldset", 24)(9, "label");
    \u0275\u0275text(10, "Nombre ");
    \u0275\u0275elementStart(11, "input", 25);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.updateName($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(12, AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_12_Template, 2, 1, "span", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "label");
    \u0275\u0275text(14, "C\xF3digo ");
    \u0275\u0275elementStart(15, "input", 27);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.updateCode($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_16_Template, 2, 1, "span", 26);
    \u0275\u0275elementStart(17, "span", 21);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "label", 28);
    \u0275\u0275text(20, "Descripci\xF3n ");
    \u0275\u0275elementStart(21, "textarea", 29);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function AdminSpecialtiesComponent_Conditional_16_Conditional_12_Template_textarea_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.description.set($event));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(22, AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_22_Template, 5, 3, "div", 30);
    \u0275\u0275conditionalCreate(23, AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_23_Template, 5, 1, "section", 23)(24, AdminSpecialtiesComponent_Conditional_16_Conditional_12_Conditional_24_Template, 11, 5);
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_10_0;
    let tmp_14_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.creating() ? "Nueva especialidad" : ctx_r0.selectedSpecialty()?.name);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_4_0 = ctx_r0.wizard()) ? 3 : -1, tmp_4_0);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.hasConflict() ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.metadataStale() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.readonly() || !ctx_r0.creating() && !ctx_r0.wizard());
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r0.name());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_10_0 = ctx_r0.nameError()) ? 12 : -1, tmp_10_0);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r0.code())("readonly", !ctx_r0.creating());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_14_0 = ctx_r0.codeError()) ? 16 : -1, tmp_14_0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.creating() ? "Sugerido a partir del nombre; pod\xE9s editarlo." : "El c\xF3digo identifica esta especialidad y no cambia.");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r0.description());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.creating() ? 22 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.creating() && !ctx_r0.wizard() ? 23 : 24);
  }
}
function AdminSpecialtiesComponent_Conditional_16_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, "Eleg\xED una especialidad para editar su wizard o cre\xE1 una nueva.");
    \u0275\u0275elementEnd();
  }
}
function AdminSpecialtiesComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, AdminSpecialtiesComponent_Conditional_16_Conditional_0_Template, 7, 2, "section", 9);
    \u0275\u0275elementStart(1, "div", 10)(2, "aside", 11)(3, "div", 12)(4, "h2");
    \u0275\u0275text(5, "Cat\xE1logo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 13);
    \u0275\u0275listener("click", function AdminSpecialtiesComponent_Conditional_16_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.refreshCatalog());
    });
    \u0275\u0275text(7, "Actualizar lista");
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(8, AdminSpecialtiesComponent_Conditional_16_For_9_Template, 7, 8, "button", 14, _forTrack0, false, AdminSpecialtiesComponent_Conditional_16_ForEmpty_10_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "section", 15);
    \u0275\u0275conditionalCreate(12, AdminSpecialtiesComponent_Conditional_16_Conditional_12_Template, 25, 14)(13, AdminSpecialtiesComponent_Conditional_16_Conditional_13_Template, 2, 0, "p", 16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.pendingSelection() ? 0 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r0.busy());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.specialties());
    \u0275\u0275advance(4);
    \u0275\u0275conditional((tmp_4_0 = ctx_r0.definition()) ? 12 : 13, tmp_4_0);
  }
}
var defaultDefinition = () => createDefaultWizardDefinition();
var clone = (value) => structuredClone(value);
var AdminSpecialtiesComponent = class _AdminSpecialtiesComponent {
  service = inject(AdminSpecialtyService);
  auth = inject(AuthService);
  owner = this.identity();
  epoch = 0;
  destroyed = false;
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
  specialties = signal(
    [],
    ...ngDevMode ? [{ debugName: "specialties" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedSpecialty = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedSpecialty" }] : (
      /* istanbul ignore next */
      []
    )
  );
  wizard = signal(
    null,
    ...ngDevMode ? [{ debugName: "wizard" }] : (
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
  creating = signal(
    false,
    ...ngDevMode ? [{ debugName: "creating" }] : (
      /* istanbul ignore next */
      []
    )
  );
  name = signal(
    "",
    ...ngDevMode ? [{ debugName: "name" }] : (
      /* istanbul ignore next */
      []
    )
  );
  code = signal(
    "",
    ...ngDevMode ? [{ debugName: "code" }] : (
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
  codeEdited = signal(
    false,
    ...ngDevMode ? [{ debugName: "codeEdited" }] : (
      /* istanbul ignore next */
      []
    )
  );
  busy = signal(
    false,
    ...ngDevMode ? [{ debugName: "busy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  accessDenied = signal(
    false,
    ...ngDevMode ? [{ debugName: "accessDenied" }] : (
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
  remoteCopy = signal(
    null,
    ...ngDevMode ? [{ debugName: "remoteCopy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pendingSelection = signal(
    null,
    ...ngDevMode ? [{ debugName: "pendingSelection" }] : (
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
  validationIssues = signal(
    [],
    ...ngDevMode ? [{ debugName: "validationIssues" }] : (
      /* istanbul ignore next */
      []
    )
  );
  editorGeneration = signal(
    0,
    ...ngDevMode ? [{ debugName: "editorGeneration" }] : (
      /* istanbul ignore next */
      []
    )
  );
  metadataStale = signal(
    false,
    ...ngDevMode ? [{ debugName: "metadataStale" }] : (
      /* istanbul ignore next */
      []
    )
  );
  nameError = computed(
    () => !this.name().trim() ? "Complet\xE1 el nombre de la especialidad." : this.name().length > 120 ? "Ingres\xE1 hasta 120 caracteres." : null,
    ...ngDevMode ? [{ debugName: "nameError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  codeError = computed(
    () => this.creating() && !/^[a-z][a-z0-9_-]{0,79}$/.test(this.code().trim()) ? "Us\xE1 una letra min\xFAscula inicial, letras, n\xFAmeros y guiones; m\xE1ximo 80 caracteres." : null,
    ...ngDevMode ? [{ debugName: "codeError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  capabilities = [
    { key: "MEDICATION_CATALOG", label: "Cat\xE1logo de medicamentos" },
    { key: "AI_ASSISTANT", label: "Asistente de IA" },
    { key: "GROWTH_CHARTS", label: "Gr\xE1ficos de crecimiento" }
  ];
  metadataDirty = computed(
    () => {
      const selected = this.selectedSpecialty();
      return selected !== null && (this.name() !== selected.name || this.description() !== (selected.description ?? ""));
    },
    ...ngDevMode ? [{ debugName: "metadataDirty" }] : (
      /* istanbul ignore next */
      []
    )
  );
  dirty = computed(
    () => this.pendingEditor() || (this.creating() ? Boolean(this.name() || this.code() || this.description()) || JSON.stringify(this.definition()) !== JSON.stringify(defaultDefinition()) : this.metadataDirty() || Boolean(this.wizard() && JSON.stringify(this.definition()) !== JSON.stringify(this.wizard().draftDefinition))),
    ...ngDevMode ? [{ debugName: "dirty" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readonly = computed(
    () => this.busy() || this.accessDenied() || this.hasConflict() || !this.auth.isSuperAdmin() || this.identity() !== this.owner,
    ...ngDevMode ? [{ debugName: "readonly" }] : (
      /* istanbul ignore next */
      []
    )
  );
  canEditExisting = computed(
    () => !this.readonly() && !!this.selectedSpecialty() && this.wizard()?.specialtyId === this.selectedSpecialty()?.id,
    ...ngDevMode ? [{ debugName: "canEditExisting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      const identity = this.identity();
      untracked(() => {
        if (identity === this.owner)
          return;
        this.owner = identity;
        this.epoch++;
        this.busy.set(false);
        this.specialties.set([]);
        this.selectedSpecialty.set(null);
        this.wizard.set(null);
        this.definition.set(null);
        this.creating.set(false);
        this.name.set("");
        this.code.set("");
        this.description.set("");
        this.pendingSelection.set(null);
        this.metadataStale.set(false);
        this.clearFeedback();
        this.accessDenied.set(!this.auth.isSuperAdmin());
        if (this.auth.isSuperAdmin())
          void this.refreshCatalog();
      });
    });
  }
  async ngOnInit() {
    if (!this.auth.isSuperAdmin()) {
      this.accessDenied.set(true);
      return;
    }
    await this.refreshCatalog();
  }
  ngOnDestroy() {
    this.destroyed = true;
    this.epoch++;
  }
  async refreshCatalog() {
    if (this.busy() || !this.auth.isSuperAdmin() || this.identity() !== this.owner)
      return;
    this.beginOperation();
    this.busy.set(true);
    const epoch = this.epoch;
    try {
      const list = await firstValueFrom(this.service.getSpecialties());
      if (!this.alive(epoch))
        return;
      this.specialties.set(clone(list));
      this.accessDenied.set(false);
      if (this.metadataStale())
        this.refreshSelectedMetadata(list);
    } catch (error) {
      if (this.alive(epoch))
        this.handleError(error, "No pudimos cargar las especialidades.");
    } finally {
      if (this.alive(epoch))
        this.busy.set(false);
    }
  }
  requestCreate() {
    this.requestSelection({ kind: "create" });
  }
  requestSelect(id) {
    this.requestSelection({ kind: "select", id });
  }
  requestSelection(selection) {
    if (this.busy() || this.accessDenied() || !this.auth.isSuperAdmin() || this.identity() !== this.owner)
      return;
    if (selection.kind === "select" && !this.creating() && selection.id === this.selectedSpecialty()?.id && this.wizard())
      return;
    if (this.dirty() || this.hasConflict())
      this.pendingSelection.set(selection);
    else
      void this.openSelection(selection);
  }
  async confirmSelection() {
    const selection = this.pendingSelection();
    if (!selection || this.busy())
      return;
    this.pendingSelection.set(null);
    await this.openSelection(selection);
  }
  async openSelection(selection) {
    if (this.busy() || this.accessDenied() || !this.auth.isSuperAdmin() || this.identity() !== this.owner)
      return;
    const epoch = ++this.epoch;
    if (selection.kind === "create") {
      this.selectedSpecialty.set(null);
      this.wizard.set(null);
      this.definition.set(defaultDefinition());
      this.creating.set(true);
      this.name.set("");
      this.code.set("");
      this.description.set("");
      this.codeEdited.set(false);
      this.clearFeedback();
      this.editorGeneration.update((n) => n + 1);
      return;
    }
    const specialty = this.specialties().find((item) => item.id === selection.id);
    if (!specialty)
      return;
    this.beginOperation();
    this.busy.set(true);
    try {
      const wizard = await firstValueFrom(this.service.getWizard(selection.id));
      if (!this.alive(epoch))
        return;
      if (wizard.specialtyId !== selection.id)
        throw new Error("La configuraci\xF3n recibida corresponde a otra especialidad.");
      this.acceptCopy({ specialty, wizard });
      this.clearFeedback();
    } catch (error) {
      if (this.alive(epoch))
        this.handleError(error, "No pudimos abrir el wizard. La edici\xF3n anterior se conserva.");
    } finally {
      if (this.alive(epoch))
        this.busy.set(false);
    }
  }
  updateName(value) {
    if (this.readonly())
      return;
    this.name.set(value);
    if (this.creating() && !this.codeEdited())
      this.code.set(this.slug(value));
  }
  updateCode(value) {
    if (!this.readonly() && this.creating()) {
      this.codeEdited.set(true);
      this.code.set(value);
    }
  }
  onDefinitionChange(section, form) {
    if (this.readonly())
      return;
    this.definition.update((definition) => definition ? __spreadProps(__spreadValues({}, definition), { [section]: clone(form) }) : definition);
    this.success.set(null);
  }
  setCapability(key, enabled) {
    if (this.readonly())
      return;
    this.definition.update((definition) => definition ? __spreadProps(__spreadValues({}, definition), { modulesConfig: __spreadProps(__spreadValues({}, definition.modulesConfig), { [key]: enabled }) }) : definition);
    this.success.set(null);
  }
  async createSpecialty() {
    const definition = this.definition();
    if (!this.creating() || !definition || this.readonly() || this.pendingEditor() || !this.validMetadata(true))
      return;
    this.beginOperation();
    this.busy.set(true);
    const epoch = this.epoch;
    try {
      const specialty = await firstValueFrom(this.service.createSpecialty({ code: this.code().trim(), name: this.name().trim(), description: this.description().trim() || null, definition: clone(definition) }));
      if (!this.alive(epoch))
        return;
      this.upsertSpecialty(specialty);
      this.selectedSpecialty.set(clone(specialty));
      this.creating.set(false);
      this.code.set(specialty.code);
      this.name.set(specialty.name);
      this.description.set(specialty.description ?? "");
      this.wizard.set(null);
      const wizard = await firstValueFrom(this.service.getWizard(specialty.id));
      if (!this.alive(epoch))
        return;
      this.acceptCopy({ specialty, wizard });
      this.clearFeedback();
      this.success.set("Especialidad creada como borrador inactivo. Complet\xE1 el wizard y publicalo cuando est\xE9 listo.");
    } catch (error) {
      if (this.alive(epoch))
        this.handleError(error, "No pudimos completar la operaci\xF3n. Si la especialidad fue creada, volv\xE9 a abrirla desde la lista para cargar su wizard.");
    } finally {
      if (this.alive(epoch))
        this.busy.set(false);
    }
  }
  async saveMetadata() {
    const selected = this.selectedSpecialty();
    if (!selected || !this.canEditExisting() || this.metadataStale() || !this.validMetadata(false))
      return;
    await this.patchSpecialty({ name: this.name().trim(), description: this.description().trim() || null });
  }
  async toggleActive() {
    const selected = this.selectedSpecialty();
    if (!selected || !this.canEditExisting() || this.metadataStale())
      return;
    await this.patchSpecialty({ active: !selected.active });
  }
  async patchSpecialty(patch) {
    const selected = this.selectedSpecialty();
    if (!selected)
      return;
    this.beginOperation();
    this.busy.set(true);
    const epoch = this.epoch;
    const metadataWasDirty = this.metadataDirty();
    try {
      const updated = await firstValueFrom(this.service.updateSpecialty(selected.id, __spreadValues({ expectedVersion: selected.version }, patch)));
      if (!this.alive(epoch))
        return;
      this.upsertSpecialty(updated);
      this.selectedSpecialty.set(clone(updated));
      if (patch.name !== void 0 || !metadataWasDirty) {
        this.name.set(updated.name);
        this.description.set(updated.description ?? "");
      }
      this.clearFeedback();
      this.success.set(patch.active !== void 0 ? "Disponibilidad actualizada." : "Datos de la especialidad guardados.");
    } catch (error) {
      if (this.alive(epoch))
        this.handleError(error, "No pudimos guardar los datos de la especialidad.");
    } finally {
      if (this.alive(epoch))
        this.busy.set(false);
    }
  }
  async saveDraft() {
    await this.writeWizard(false);
  }
  async publishWizard() {
    await this.writeWizard(true);
  }
  async writeWizard(publish) {
    const selected = this.selectedSpecialty();
    const wizard = this.wizard();
    const definition = this.definition();
    if (!selected || !wizard || !definition || !this.canEditExisting() || this.metadataStale() || this.pendingEditor())
      return;
    this.beginOperation();
    this.busy.set(true);
    const epoch = this.epoch;
    try {
      const saved = await firstValueFrom(this.service.saveWizardDraft(selected.id, { expectedVersion: wizard.version, definition: clone(definition) }));
      if (!this.alive(epoch))
        return;
      this.assertWizardIdentity(saved, selected.id);
      this.wizard.set(clone(saved));
      this.definition.set(clone(saved.draftDefinition));
      if (publish) {
        const published = await firstValueFrom(this.service.publishWizard(selected.id, saved.version));
        if (!this.alive(epoch))
          return;
        this.assertWizardIdentity(published, selected.id);
        this.wizard.set(clone(published));
        this.definition.set(clone(published.draftDefinition));
        this.metadataStale.set(true);
        const list = await firstValueFrom(this.service.getSpecialties());
        if (!this.alive(epoch))
          return;
        this.specialties.set(clone(list));
        this.refreshSelectedMetadata(list);
      }
      this.clearFeedback();
      this.success.set(publish ? "Wizard publicado. Las copias personales de los m\xE9dicos se conservan." : "Borrador guardado. La publicaci\xF3n vigente se conserva.");
    } catch (error) {
      if (this.alive(epoch))
        this.handleError(error, publish ? "No pudimos completar la publicaci\xF3n. El borrador guardado se conserva." : "No pudimos guardar el borrador. Tus cambios locales se conservan.");
    } finally {
      if (this.alive(epoch))
        this.busy.set(false);
    }
  }
  async reviewRemote() {
    const selected = this.selectedSpecialty();
    if (!selected || this.busy() || this.accessDenied() || !this.auth.isSuperAdmin() || this.identity() !== this.owner)
      return;
    this.beginOperation();
    this.remoteCopy.set(null);
    this.busy.set(true);
    const epoch = this.epoch;
    try {
      const [list, wizard] = await Promise.all([firstValueFrom(this.service.getSpecialties()), firstValueFrom(this.service.getWizard(selected.id))]);
      if (!this.alive(epoch))
        return;
      const specialty = list.find((item) => item.id === selected.id);
      if (!specialty)
        throw new Error("La especialidad ya no est\xE1 disponible en la administraci\xF3n.");
      this.assertWizardIdentity(wizard, selected.id);
      this.remoteCopy.set(clone({ specialty, wizard }));
    } catch (error) {
      if (this.alive(epoch))
        this.handleError(error, "No pudimos consultar el estado del servidor. Tus cambios locales se conservan.");
    } finally {
      if (this.alive(epoch))
        this.busy.set(false);
    }
  }
  useRemote() {
    const remote = this.remoteCopy();
    if (!remote || this.busy() || this.accessDenied() || !this.auth.isSuperAdmin() || this.identity() !== this.owner)
      return;
    this.acceptCopy(remote);
    this.upsertSpecialty(remote.specialty);
    this.clearFeedback();
    this.success.set("Copia del servidor cargada. Los cambios locales anteriores fueron descartados.");
  }
  issueText(issue) {
    const [section, , categoryIndex, , fieldIndex] = issue.path.replace(/^\//, "").split("/");
    const form = section === "patientForm" || section === "encounterForm" ? this.definition()?.[section] : null;
    const category = form?.categories[Number(categoryIndex)];
    const field = category?.fields[Number(fieldIndex)];
    const labels = { MISSING_PATIENT_CORE: "Agreg\xE1 nombre y fecha de nacimiento obligatorios, siempre visibles y en una categor\xEDa activa.", DUPLICATE_BINDING: "El dato vinculado ya se usa en otro campo.", BINDING_TYPE_MISMATCH: "El tipo no corresponde al dato vinculado.", BINDING_UNIT_MISMATCH: "Revis\xE1 la unidad del dato vinculado.", INVALID_FORMULA_REFERENCE: "El c\xE1lculo refiere a una entrada inexistente o de tipo incompatible.", INVALID_VISIBILITY_REFERENCE: "La condici\xF3n debe referir a un campo S\xED / No existente.", VISIBILITY_CYCLE: "Las condiciones de visibilidad forman un ciclo.", AMBIGUOUS_PATIENT_NAME: "Us\xE1 nombre completo o nombre y apellido separados.", FIELD_IDENTITY_CHANGED: "Cambiar tipo o vinculaci\xF3n requiere crear un campo nuevo.", INVALID_STRUCTURE: "Revis\xE1 los datos y las opciones de este campo." };
    const location = field ? `${category?.title} / ${field.label}` : category?.title ?? (section === "patientForm" ? "Ficha del paciente" : section === "encounterForm" ? "Historia Cl\xEDnica" : "Configuraci\xF3n");
    return `${location}: ${labels[issue.code] ?? "Revis\xE1 la configuraci\xF3n indicada."}`;
  }
  validMetadata(requireCode) {
    const error = this.nameError() || requireCode && this.codeError();
    if (error) {
      this.error.set(error);
      return false;
    }
    return true;
  }
  acceptCopy(copy) {
    if (copy.wizard.specialtyId !== copy.specialty.id)
      throw new Error("La configuraci\xF3n recibida corresponde a otra especialidad.");
    this.selectedSpecialty.set(clone(copy.specialty));
    this.wizard.set(clone(copy.wizard));
    this.definition.set(clone(copy.wizard.draftDefinition));
    this.creating.set(false);
    this.metadataStale.set(false);
    this.name.set(copy.specialty.name);
    this.code.set(copy.specialty.code);
    this.description.set(copy.specialty.description ?? "");
    this.editorGeneration.update((n) => n + 1);
  }
  async reloadWizard() {
    const selected = this.selectedSpecialty();
    if (!selected || this.wizard() || this.busy() || this.accessDenied() || !this.auth.isSuperAdmin() || this.identity() !== this.owner)
      return;
    await this.openSelection({ kind: "select", id: selected.id });
  }
  refreshSelectedMetadata(list) {
    const updated = list.find((item) => item.id === this.selectedSpecialty()?.id);
    if (!updated)
      throw new Error("No pudimos recuperar la revisi\xF3n actual de la especialidad.");
    const dirty = this.metadataDirty();
    const previous = this.selectedSpecialty();
    if (dirty && (updated.version !== previous.version + 1 || updated.name !== previous.name || updated.description !== previous.description || !updated.active)) {
      throw { status: 409, error: { code: "VERSION_CONFLICT", message: "Otro administrador modific\xF3 los datos de la especialidad. Tu edici\xF3n local se conserva; revis\xE1 la copia del servidor antes de guardar." } };
    }
    this.selectedSpecialty.set(clone(updated));
    if (!dirty) {
      this.name.set(updated.name);
      this.description.set(updated.description ?? "");
    }
    this.metadataStale.set(false);
  }
  upsertSpecialty(specialty) {
    this.specialties.update((list) => [...list.filter((item) => item.id !== specialty.id), clone(specialty)].sort((a, b) => a.name.localeCompare(b.name)));
  }
  clearFeedback() {
    this.error.set(null);
    this.success.set(null);
    this.validationIssues.set([]);
    this.hasConflict.set(false);
    this.remoteCopy.set(null);
  }
  beginOperation() {
    this.error.set(null);
    this.success.set(null);
    this.validationIssues.set([]);
  }
  handleError(error, fallback) {
    const response = error;
    if (response?.status === 403) {
      this.accessDenied.set(true);
      this.error.set("No ten\xE9s permiso de Superadmin para administrar especialidades.");
      return;
    }
    if (response?.status === 409 && response.error?.code === "VERSION_CONFLICT") {
      this.hasConflict.set(true);
      this.remoteCopy.set(null);
    }
    this.error.set(typeof response?.error?.message === "string" ? response.error.message : fallback);
    this.validationIssues.set(Array.isArray(response?.error?.errors) ? response.error.errors : []);
  }
  identity() {
    const user = this.auth.currentUser();
    return `${user?.id ?? ""}:${user?.app_metadata?.["role"] ?? ""}`;
  }
  assertWizardIdentity(wizard, id) {
    if (wizard.specialtyId !== id)
      throw new Error("La configuraci\xF3n recibida corresponde a otra especialidad.");
  }
  alive(epoch) {
    return !this.destroyed && epoch === this.epoch && this.identity() === this.owner;
  }
  slug(name) {
    const slug = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
    return /^[a-z]/.test(slug) ? slug : slug ? "especialidad-" + slug.slice(0, 67) : "";
  }
  static \u0275fac = function AdminSpecialtiesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminSpecialtiesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminSpecialtiesComponent, selectors: [["app-admin-specialties"]], viewQuery: function AdminSpecialtiesComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.editors, FormFieldEditorComponent, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, decls: 17, vars: 6, consts: [[1, "admin-specialties"], [1, "page-header"], [1, "eyebrow"], ["type", "button", 1, "primary", 3, "click", "disabled"], ["role", "status"], ["role", "alert", 1, "error"], ["role", "status", 1, "success"], ["aria-label", "Campos que requieren revisi\xF3n", 1, "validation-errors"], ["role", "alert", 1, "notice"], ["aria-label", "Confirmar cambio de especialidad", 1, "confirmation"], [1, "admin-layout"], ["aria-label", "Cat\xE1logo administrativo", 1, "catalog"], [1, "section-heading"], ["type", "button", 3, "click", "disabled"], ["type", "button", 1, "catalog-item", 3, "selected", "disabled"], ["aria-label", "Editar especialidad", 1, "edit-panel"], [1, "empty-state"], ["type", "button", 1, "danger", 3, "click", "disabled"], ["type", "button", 1, "catalog-item", 3, "click", "disabled"], [1, "status"], [1, "publication"], [1, "hint"], ["aria-label", "Revisar conflicto de versi\xF3n", 1, "confirmation"], [1, "notice"], [1, "metadata", 3, "disabled"], ["maxlength", "120", 3, "ngModelChange", "ngModel"], ["role", "alert", 1, "field-error"], ["maxlength", "80", 3, "ngModelChange", "ngModel", "readonly"], [1, "wide"], ["rows", "2", 3, "ngModelChange", "ngModel"], [1, "actions", "metadata-actions"], [1, "capabilities", 3, "disabled"], [1, "actions", "wizard-actions"], ["type", "button", 1, "primary", 3, "disabled"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], ["section", "patientForm", 3, "definitionChange", "definition", "readonly"], ["section", "encounterForm", 3, "definitionChange", "definition", "readonly"]], template: function AdminSpecialtiesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "main", 0)(1, "header", 1)(2, "div")(3, "span", 2);
      \u0275\u0275text(4, "Administraci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h1");
      \u0275\u0275text(6, "Especialidades y wizard");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p");
      \u0275\u0275text(8, "Cre\xE1 especialidades y configur\xE1 las fichas y consultas que reciben los m\xE9dicos al elegirlas.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "button", 3);
      \u0275\u0275listener("click", function AdminSpecialtiesComponent_Template_button_click_9_listener() {
        return ctx.requestCreate();
      });
      \u0275\u0275text(10, "Crear especialidad");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(11, AdminSpecialtiesComponent_Conditional_11_Template, 2, 0, "p", 4);
      \u0275\u0275conditionalCreate(12, AdminSpecialtiesComponent_Conditional_12_Template, 2, 1, "p", 5);
      \u0275\u0275conditionalCreate(13, AdminSpecialtiesComponent_Conditional_13_Template, 2, 1, "p", 6);
      \u0275\u0275conditionalCreate(14, AdminSpecialtiesComponent_Conditional_14_Template, 3, 0, "ul", 7);
      \u0275\u0275conditionalCreate(15, AdminSpecialtiesComponent_Conditional_15_Template, 5, 0, "section", 8)(16, AdminSpecialtiesComponent_Conditional_16_Template, 14, 4);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275property("disabled", ctx.busy() || ctx.accessDenied());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.busy() ? 11 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.error() ? 12 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.success() ? 13 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.validationIssues().length ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.accessDenied() ? 15 : 16);
    }
  }, dependencies: [FormsModule, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, FormFieldEditorComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  color: var(--%NS%dc-ink, #172b4d);\n}\n.admin-specialties[_ngcontent-%COMP%] {\n  max-width: 1500px;\n  margin: 0 auto;\n  padding: 32px 24px;\n}\n.page-header[_ngcontent-%COMP%], \n.section-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.9rem;\n  margin: 6px 0;\n}\n.page-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.hint[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.eyebrow[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n  font-size: .75rem;\n  font-weight: 700;\n  letter-spacing: .08em;\n  color: var(--%NS%dc-purple-ink, #4f46e5);\n}\n.admin-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 260px minmax(0, 1fr);\n  gap: 24px;\n  align-items: start;\n}\n.catalog[_ngcontent-%COMP%], \n.edit-panel[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface, white);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 16px;\n  padding: 20px;\n}\n.catalog[_ngcontent-%COMP%]   .section-heading[_ngcontent-%COMP%] {\n  gap: 8px;\n  margin-bottom: 16px;\n}\n.catalog[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  margin: 0;\n}\n.catalog[_ngcontent-%COMP%]   .section-heading[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  font-size: .75rem;\n  padding: 6px;\n}\n.catalog-item[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  align-items: flex-start;\n  text-align: left;\n  margin-top: 10px;\n  padding: 13px;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n}\n.catalog-item.selected[_ngcontent-%COMP%] {\n  border-color: var(--%NS%dc-purple-ink, #4f46e5);\n  background: var(--%NS%dc-purple-surface, #eef2ff);\n}\n.catalog-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: .8rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  overflow-wrap: anywhere;\n}\n.status[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n  border-radius: 20px;\n  padding: 3px 8px;\n}\n.status.active[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-success-surface, #dcfce7);\n  color: var(--%NS%dc-success-ink, #166534);\n}\n.publication[_ngcontent-%COMP%] {\n  font-size: .8rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.metadata[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n  border: 0;\n  padding: 0;\n  margin: 24px 0 12px;\n}\n.metadata[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  font-weight: 600;\n}\n.metadata[_ngcontent-%COMP%]   .wide[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.metadata[_ngcontent-%COMP%]   .hint[_ngcontent-%COMP%] {\n  font-size: .8rem;\n  font-weight: 400;\n}\n.metadata[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.metadata[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  box-sizing: border-box;\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 8px;\n  padding: 10px;\n  font: inherit;\n  background: var(--%NS%dc-surface, white);\n}\n.metadata[_ngcontent-%COMP%]   input[readonly][_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n}\n.capabilities[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  flex-wrap: wrap;\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 10px;\n  padding: 14px;\n  margin: 22px 0;\n}\n.capabilities[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.wizard-actions[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  margin-top: 24px;\n  padding-top: 20px;\n  justify-content: flex-end;\n}\nbutton[_ngcontent-%COMP%] {\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 8px;\n  background: var(--%NS%dc-surface, white);\n  color: var(--%NS%dc-ink-secondary, #334155);\n  padding: 10px 14px;\n  font: inherit;\n  cursor: pointer;\n}\nbutton.primary[_ngcontent-%COMP%] {\n  background: #4f46e5;\n  border-color: var(--%NS%dc-purple-ink, #4f46e5);\n  color: white;\n}\nbutton.danger[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-error-ink, #b91c1c);\n  border-color: #fecaca;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: .5;\n  cursor: default;\n}\nbutton[_ngcontent-%COMP%]:focus-visible, \ninput[_ngcontent-%COMP%]:focus-visible, \ntextarea[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid #a5b4fc;\n  outline-offset: 2px;\n}\n.error[_ngcontent-%COMP%], \n.validation-errors[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-error-surface, #fef2f2);\n  color: var(--%NS%dc-error-ink, #991b1b);\n  border: 1px solid #fecaca;\n  border-radius: 10px;\n  padding: 14px;\n}\n.validation-errors[_ngcontent-%COMP%] {\n  padding-left: 32px;\n}\n.validation-errors[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 7px 0;\n  overflow-wrap: anywhere;\n}\n.success[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-success-surface, #f0fdf4);\n  color: var(--%NS%dc-success-ink, #166534);\n  border: 1px solid #bbf7d0;\n  padding: 14px;\n  border-radius: 10px;\n}\n.notice[_ngcontent-%COMP%], \n.confirmation[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-warning-surface, #fffbeb);\n  border: 1px solid #fde68a;\n  border-radius: 10px;\n  padding: 16px;\n  margin: 16px 0;\n}\n.confirmation[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-right: 10px;\n  margin-top: 8px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  padding: 60px 12px;\n  text-align: center;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.edit-panel[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 26px;\n}\n.hint[_ngcontent-%COMP%] {\n  font-size: .875rem;\n  line-height: 1.5;\n}\nfieldset[_ngcontent-%COMP%]:disabled {\n  opacity: .65;\n}\n@media (max-width: 850px) {\n  .admin-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .page-header[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .catalog[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 10px;\n    flex-wrap: wrap;\n  }\n  .catalog[_ngcontent-%COMP%]   .section-heading[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .catalog-item[_ngcontent-%COMP%] {\n    width: auto;\n    flex: 1;\n    min-width: 180px;\n  }\n  .admin-specialties[_ngcontent-%COMP%] {\n    padding: 20px 12px;\n  }\n  .metadata[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .section-heading[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-wrap: wrap;\n  }\n  .edit-panel[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n.field-error[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 6px;\n  color: var(--%NS%dc-error-ink, #b91c1c);\n  font-size: .8rem;\n}\n/*# sourceMappingURL=admin-specialties.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminSpecialtiesComponent, [{
    type: Component,
    args: [{ selector: "app-admin-specialties", imports: [FormsModule, FormFieldEditorComponent], template: `<main class="admin-specialties">\r
  <header class="page-header">\r
    <div><span class="eyebrow">Administraci\xF3n</span><h1>Especialidades y wizard</h1>\r
      <p>Cre\xE1 especialidades y configur\xE1 las fichas y consultas que reciben los m\xE9dicos al elegirlas.</p></div>\r
    <button type="button" class="primary" [disabled]="busy() || accessDenied()" (click)="requestCreate()">Crear especialidad</button>\r
  </header>\r
  @if (busy()) { <p role="status">Procesando...</p> }\r
  @if (error()) { <p class="error" role="alert">{{ error() }}</p> }\r
  @if (success()) { <p class="success" role="status">{{ success() }}</p> }\r
  @if (validationIssues().length) {\r
    <ul class="validation-errors" aria-label="Campos que requieren revisi\xF3n">\r
      @for (issue of validationIssues(); track $index) { <li>{{ issueText(issue) }}</li> }\r
    </ul>\r
  }\r
  @if (accessDenied()) {\r
    <section class="notice" role="alert"><h2>Acceso restringido</h2><p>Necesit\xE1s una cuenta con rol Superadmin para administrar el cat\xE1logo.</p></section>\r
  } @else {\r
    @if (pendingSelection()) {\r
      <section class="confirmation" aria-label="Confirmar cambio de especialidad">\r
        <p>Hay cambios locales pendientes. Continuar descartar\xE1 esta edici\xF3n; el borrador guardado en el servidor se conserva.</p>\r
        <button type="button" [disabled]="busy()" (click)="pendingSelection.set(null)">Seguir editando</button>\r
        <button type="button" class="danger" [disabled]="busy()" (click)="confirmSelection()">Descartar cambios locales y continuar</button>\r
      </section>\r
    }\r
    <div class="admin-layout">\r
      <aside class="catalog" aria-label="Cat\xE1logo administrativo">\r
        <div class="section-heading"><h2>Cat\xE1logo</h2><button type="button" [disabled]="busy()" (click)="refreshCatalog()">Actualizar lista</button></div>\r
        @for (specialty of specialties(); track specialty.id) {\r
          <button type="button" class="catalog-item" [class.selected]="!creating() && selectedSpecialty()?.id === specialty.id"\r
            [disabled]="busy()" (click)="requestSelect(specialty.id)">\r
            <strong>{{ specialty.name }}</strong><span>{{ specialty.code }}</span>\r
            <span class="status" [class.active]="specialty.active">{{ specialty.active ? 'Activa' : 'Inactiva / borrador' }}</span>\r
          </button>\r
        } @empty { @if (!busy() && !error()) { <p>No hay especialidades en el cat\xE1logo administrativo.</p> } }\r
      </aside>\r
      <section class="edit-panel" aria-label="Editar especialidad">\r
        @if (definition(); as current) {\r
          <div class="section-heading"><h2>{{ creating() ? 'Nueva especialidad' : selectedSpecialty()?.name }}</h2>\r
            @if (wizard(); as saved) { <span class="publication">Publicaci\xF3n {{ saved.publishedVersion }}{{ saved.publishedDefinition ? '' : ' \xB7 sin publicar' }}</span> }\r
          </div>\r
          <p class="hint">Los cambios del wizard se guardan como borrador. Publicar los habilita para nuevas selecciones y conserva las copias personales de los m\xE9dicos existentes.</p>\r
          @if (hasConflict()) {\r
            <section class="confirmation" aria-label="Revisar conflicto de versi\xF3n">\r
              <p>El servidor cambi\xF3 desde que abriste esta copia. Los datos y campos que estabas editando siguen visibles. Revis\xE1 el estado del servidor antes de continuar.</p>\r
              <button type="button" [disabled]="busy()" (click)="reviewRemote()">Consultar copia del servidor</button>\r
              @if (remoteCopy(); as remote) {\r
                <p>{{ remote.specialty.name }} \xB7 {{ remote.specialty.active ? 'Activa' : 'Inactiva' }} \xB7 Publicaci\xF3n {{ remote.wizard.publishedVersion }}</p>\r
                <button type="button" class="danger" [disabled]="busy()" (click)="useRemote()">Usar copia del servidor y descartar mis cambios locales</button>\r
              }\r
            </section>\r
          }\r
          @if (metadataStale()) {\r
            <section class="notice"><p>El wizard fue publicado, pero falta recuperar la revisi\xF3n actual de la especialidad. Actualiz\xE1 la lista antes de volver a guardar.</p>\r
              <button type="button" [disabled]="busy()" (click)="refreshCatalog()">Recuperar revisi\xF3n actual</button></section>\r
          }\r
          <fieldset class="metadata" [disabled]="readonly() || (!creating() && !wizard())">\r
            <label>Nombre <input maxlength="120" [ngModel]="name()" (ngModelChange)="updateName($event)" />@if (nameError(); as error) { <span class="field-error" role="alert">{{ error }}</span> }</label>\r
            <label>C\xF3digo <input maxlength="80" [ngModel]="code()" (ngModelChange)="updateCode($event)" [readonly]="!creating()" />\r
              @if (codeError(); as error) { <span class="field-error" role="alert">{{ error }}</span> }\r
              <span class="hint">{{ creating() ? 'Sugerido a partir del nombre; pod\xE9s editarlo.' : 'El c\xF3digo identifica esta especialidad y no cambia.' }}</span></label>\r
            <label class="wide">Descripci\xF3n <textarea rows="2" [ngModel]="description()" (ngModelChange)="description.set($event)"></textarea></label>\r
          </fieldset>\r
          @if (!creating()) {\r
            <div class="actions metadata-actions">\r
              <button type="button" [disabled]="!canEditExisting() || metadataStale() || !metadataDirty()" (click)="saveMetadata()">Guardar nombre y descripci\xF3n</button>\r
              <button type="button" [disabled]="!canEditExisting() || metadataStale()" (click)="toggleActive()">{{ selectedSpecialty()?.active ? 'Desactivar especialidad' : 'Activar especialidad' }}</button>\r
            </div>\r
          }\r
          @if (!creating() && !wizard()) {\r
            <section class="notice"><p>La especialidad fue creada. Falta cargar su wizard para continuar editando.</p><button type="button" [disabled]="busy()" (click)="reloadWizard()">Volver a cargar el wizard</button></section>\r
          } @else {\r
            <fieldset class="capabilities" [disabled]="readonly()"><legend>Funciones disponibles</legend>\r
              @for (capability of capabilities; track capability.key) {\r
                <label><input type="checkbox" [ngModel]="current.modulesConfig[capability.key]" (ngModelChange)="setCapability(capability.key, $event)" />{{ capability.label }}</label>\r
              }\r
            </fieldset>\r
            @for (generation of [editorGeneration()]; track generation) {\r
              <h3>Ficha del paciente</h3>\r
              <app-form-field-editor [definition]="current.patientForm" section="patientForm" [readonly]="readonly()"\r
                (definitionChange)="onDefinitionChange('patientForm', $event)" />\r
              <h3>Historia Cl\xEDnica</h3>\r
              <p class="hint">Esta secci\xF3n est\xE1 presente en todas las especialidades. Organiz\xE1 sus categor\xEDas y campos para cada consulta.</p>\r
              <app-form-field-editor [definition]="current.encounterForm" section="encounterForm" [readonly]="readonly()"\r
                (definitionChange)="onDefinitionChange('encounterForm', $event)" />\r
            }\r
            @if (pendingEditor()) { <p class="notice">Aplic\xE1 o cancel\xE1 el campo abierto y complet\xE1 las categor\xEDas pendientes antes de guardar el wizard.</p> }\r
            <footer class="actions wizard-actions">\r
              @if (creating()) {\r
                <button type="button" class="primary" [disabled]="readonly() || pendingEditor()" (click)="createSpecialty()">Crear como borrador</button>\r
              } @else {\r
                <button type="button" [disabled]="!canEditExisting() || metadataStale() || pendingEditor()" (click)="saveDraft()">Guardar borrador del wizard</button>\r
                <button type="button" class="primary" [disabled]="!canEditExisting() || metadataStale() || pendingEditor()" (click)="publishWizard()">Guardar y publicar wizard</button>\r
              }\r
            </footer>\r
          }\r
        } @else { <p class="empty-state">Eleg\xED una especialidad para editar su wizard o cre\xE1 una nueva.</p> }\r
      </section>\r
    </div>\r
  }\r
</main>\r
`, styles: ["/* src/app/features/admin-specialties/admin-specialties.component.css */\n:host {\n  display: block;\n  color: var(--dc-ink, #172b4d);\n}\n.admin-specialties {\n  max-width: 1500px;\n  margin: 0 auto;\n  padding: 32px 24px;\n}\n.page-header,\n.section-heading {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n}\n.page-header {\n  margin-bottom: 24px;\n}\n.page-header h1 {\n  font-size: 1.9rem;\n  margin: 6px 0;\n}\n.page-header p,\n.hint {\n  color: var(--dc-ink-muted, #64748b);\n}\n.eyebrow {\n  text-transform: uppercase;\n  font-size: .75rem;\n  font-weight: 700;\n  letter-spacing: .08em;\n  color: var(--dc-purple-ink, #4f46e5);\n}\n.admin-layout {\n  display: grid;\n  grid-template-columns: 260px minmax(0, 1fr);\n  gap: 24px;\n  align-items: start;\n}\n.catalog,\n.edit-panel {\n  background: var(--dc-surface, white);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 16px;\n  padding: 20px;\n}\n.catalog .section-heading {\n  gap: 8px;\n  margin-bottom: 16px;\n}\n.catalog h2 {\n  font-size: 1.1rem;\n  margin: 0;\n}\n.catalog .section-heading button {\n  font-size: .75rem;\n  padding: 6px;\n}\n.catalog-item {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  align-items: flex-start;\n  text-align: left;\n  margin-top: 10px;\n  padding: 13px;\n  background: var(--dc-surface-low, #f8fafc);\n}\n.catalog-item.selected {\n  border-color: var(--dc-purple-ink, #4f46e5);\n  background: var(--dc-purple-surface, #eef2ff);\n}\n.catalog-item span {\n  font-size: .8rem;\n  color: var(--dc-ink-muted, #64748b);\n  overflow-wrap: anywhere;\n}\n.status {\n  background: var(--dc-surface-high, #f1f5f9);\n  border-radius: 20px;\n  padding: 3px 8px;\n}\n.status.active {\n  background: var(--dc-success-surface, #dcfce7);\n  color: var(--dc-success-ink, #166534);\n}\n.publication {\n  font-size: .8rem;\n  color: var(--dc-ink-muted, #64748b);\n}\n.metadata {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n  border: 0;\n  padding: 0;\n  margin: 24px 0 12px;\n}\n.metadata label {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  font-weight: 600;\n}\n.metadata .wide {\n  grid-column: 1/-1;\n}\n.metadata .hint {\n  font-size: .8rem;\n  font-weight: 400;\n}\n.metadata input,\n.metadata textarea {\n  width: 100%;\n  box-sizing: border-box;\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  border-radius: 8px;\n  padding: 10px;\n  font: inherit;\n  background: var(--dc-surface, white);\n}\n.metadata input[readonly] {\n  background: var(--dc-surface-high, #f1f5f9);\n}\n.capabilities {\n  display: flex;\n  gap: 20px;\n  flex-wrap: wrap;\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 10px;\n  padding: 14px;\n  margin: 22px 0;\n}\n.capabilities label {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.actions {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.wizard-actions {\n  border-top: 1px solid var(--dc-outline, #e2e8f0);\n  margin-top: 24px;\n  padding-top: 20px;\n  justify-content: flex-end;\n}\nbutton {\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  border-radius: 8px;\n  background: var(--dc-surface, white);\n  color: var(--dc-ink-secondary, #334155);\n  padding: 10px 14px;\n  font: inherit;\n  cursor: pointer;\n}\nbutton.primary {\n  background: #4f46e5;\n  border-color: var(--dc-purple-ink, #4f46e5);\n  color: white;\n}\nbutton.danger {\n  color: var(--dc-error-ink, #b91c1c);\n  border-color: #fecaca;\n}\nbutton:disabled {\n  opacity: .5;\n  cursor: default;\n}\nbutton:focus-visible,\ninput:focus-visible,\ntextarea:focus-visible {\n  outline: 3px solid #a5b4fc;\n  outline-offset: 2px;\n}\n.error,\n.validation-errors {\n  background: var(--dc-error-surface, #fef2f2);\n  color: var(--dc-error-ink, #991b1b);\n  border: 1px solid #fecaca;\n  border-radius: 10px;\n  padding: 14px;\n}\n.validation-errors {\n  padding-left: 32px;\n}\n.validation-errors li {\n  margin: 7px 0;\n  overflow-wrap: anywhere;\n}\n.success {\n  background: var(--dc-success-surface, #f0fdf4);\n  color: var(--dc-success-ink, #166534);\n  border: 1px solid #bbf7d0;\n  padding: 14px;\n  border-radius: 10px;\n}\n.notice,\n.confirmation {\n  background: var(--dc-warning-surface, #fffbeb);\n  border: 1px solid #fde68a;\n  border-radius: 10px;\n  padding: 16px;\n  margin: 16px 0;\n}\n.confirmation button {\n  margin-right: 10px;\n  margin-top: 8px;\n}\n.empty-state {\n  padding: 60px 12px;\n  text-align: center;\n  color: var(--dc-ink-muted, #64748b);\n}\n.edit-panel h3 {\n  margin-top: 26px;\n}\n.hint {\n  font-size: .875rem;\n  line-height: 1.5;\n}\nfieldset:disabled {\n  opacity: .65;\n}\n@media (max-width: 850px) {\n  .admin-layout {\n    grid-template-columns: 1fr;\n  }\n  .page-header {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .catalog {\n    display: flex;\n    gap: 10px;\n    flex-wrap: wrap;\n  }\n  .catalog .section-heading {\n    width: 100%;\n  }\n  .catalog-item {\n    width: auto;\n    flex: 1;\n    min-width: 180px;\n  }\n  .admin-specialties {\n    padding: 20px 12px;\n  }\n  .metadata {\n    grid-template-columns: 1fr;\n  }\n  .section-heading {\n    align-items: flex-start;\n    flex-wrap: wrap;\n  }\n  .edit-panel {\n    padding: 16px;\n  }\n}\n.field-error {\n  display: block;\n  margin-top: 6px;\n  color: var(--dc-error-ink, #b91c1c);\n  font-size: .8rem;\n}\n/*# sourceMappingURL=admin-specialties.component.css.map */\n"] }]
  }], () => [], { editors: [{ type: ViewChildren, args: [forwardRef(() => FormFieldEditorComponent), { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminSpecialtiesComponent, { className: "AdminSpecialtiesComponent", filePath: "src/app/features/admin-specialties/admin-specialties.component.ts", lineNumber: 20 });
})();
export {
  AdminSpecialtiesComponent
};
//# debugId=14d9814b-f818-59f4-a931-ebde3ff0ff25
//# sourceMappingURL=chunk-SQH3HZBD.js.map
