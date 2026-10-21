import {
  DynamicFormRendererComponent,
  conflictKind,
  errorMessage,
  inputValues,
  retainCompatibleValues
} from "./chunk-UP7TIIOF.js";
import "./chunk-X5CFNW5T.js";
import "./chunk-6MFCUZUR.js";
import "./chunk-WMGV2OO2.js";
import {
  ActivePatientService,
  PatientService
} from "./chunk-C5KB4SWE.js";
import {
  takeUntilDestroyed
} from "./chunk-Y3XT3YWV.js";
import "./chunk-YTAXUAO7.js";
import {
  WorkspaceStore
} from "./chunk-WPGAV52V.js";
import "./chunk-USM5S45Q.js";
import "./chunk-D4J4ETKO.js";
import "./chunk-QAJPJLTD.js";
import "./chunk-THOV7R4G.js";
import "./chunk-BQIFWLNB.js";
import {
  AuthService
} from "./chunk-5XEBCQUW.js";
import "./chunk-WKCAPCQH.js";
import "./chunk-WBCHXDEU.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-XM57RTTR.js";
import "./chunk-YAYJVLGH.js";
import "./chunk-SYX7XZ26.js";
import {
  Component,
  DestroyRef,
  computed,
  firstValueFrom,
  inject,
  setClassMetadata,
  signal,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-3HO5VEWU.js";

// src/app/features/patient-form/patient-form-page.component.ts
function PatientFormPageComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.errorMessage());
  }
}
function PatientFormPageComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275element(1, "div", 15);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cargando datos del paciente...");
    \u0275\u0275elementEnd()();
  }
}
function PatientFormPageComponent_Conditional_18_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "p");
    \u0275\u0275text(2, "Configuraci\xF3n actual: ");
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, ". Se conservar\xE1n las respuestas de campos compatibles.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 17);
    \u0275\u0275listener("click", function PatientFormPageComponent_Conditional_18_Conditional_5_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.useRemoteWorkspace());
    });
    \u0275\u0275text(7, " Usar formulario actual y conservar respuestas ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.specialty.name);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.isLoading());
  }
}
function PatientFormPageComponent_Conditional_18_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "p");
    \u0275\u0275text(2, "Ficha guardada: ");
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, ".");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 17);
    \u0275\u0275listener("click", function PatientFormPageComponent_Conditional_18_Conditional_6_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.useRemoteRecord());
    });
    \u0275\u0275text(7, " Usar ficha del servidor y descartar cambios locales ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.isLoading());
  }
}
function PatientFormPageComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "p", 16);
    \u0275\u0275text(2, " Tus respuestas siguen en pantalla, pero la versi\xF3n del servidor cambi\xF3. Revis\xE1 antes de continuar. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 17);
    \u0275\u0275listener("click", function PatientFormPageComponent_Conditional_18_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.reviewRemote());
    });
    \u0275\u0275text(4, " Consultar copia del servidor ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(5, PatientFormPageComponent_Conditional_18_Conditional_5_Template, 8, 2, "div", 18);
    \u0275\u0275conditionalCreate(6, PatientFormPageComponent_Conditional_18_Conditional_6_Template, 8, 2, "div", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.isLoading() || ctx_r0.isSubmitting());
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_2_0 = ctx_r0.remoteWorkspace()) ? 5 : -1, tmp_2_0);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_3_0 = ctx_r0.remoteRecord()) ? 6 : -1, tmp_3_0);
  }
}
function PatientFormPageComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "main", 19)(1, "app-dynamic-form-renderer", 20);
    \u0275\u0275listener("valuesChange", function PatientFormPageComponent_Conditional_19_Template_app_dynamic_form_renderer_valuesChange_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onValuesChange($event));
    })("validityChange", function PatientFormPageComponent_Conditional_19_Template_app_dynamic_form_renderer_validityChange_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onFormValidityChange($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(2, "footer", 21)(3, "button", 22);
    \u0275\u0275listener("click", function PatientFormPageComponent_Conditional_19_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.cancel());
    });
    \u0275\u0275text(4, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 23);
    \u0275\u0275listener("click", function PatientFormPageComponent_Conditional_19_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.submit());
    });
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("definition", ctx)("values", ctx_r0.values())("formulaResults", ctx_r0.formulaResults())("readonly", ctx_r0.readonly());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.isSubmitting());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.readonly() || !ctx_r0.definition() || !ctx_r0.isFormValid());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isSubmitting() ? "Guardando..." : ctx_r0.isEditMode() ? "Guardar Cambios" : "Crear Paciente", " ");
  }
}
function PatientFormPageComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "p");
    \u0275\u0275text(2, "No se pudo cargar la definici\xF3n del formulario del paciente.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 24);
    \u0275\u0275listener("click", function PatientFormPageComponent_Conditional_20_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.ngOnInit());
    });
    \u0275\u0275text(4, "Reintentar");
    \u0275\u0275elementEnd()();
  }
}
var PatientFormPageComponent = class _PatientFormPageComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  patientService = inject(PatientService);
  activePatientService = inject(ActivePatientService);
  workspaceStore = inject(WorkspaceStore);
  auth = inject(AuthService);
  destroyRef = inject(DestroyRef);
  epoch = 0;
  destroyed = false;
  owner = "";
  isEditMode = signal(
    false,
    ...ngDevMode ? [{ debugName: "isEditMode" }] : (
      /* istanbul ignore next */
      []
    )
  );
  patientId = signal(
    null,
    ...ngDevMode ? [{ debugName: "patientId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  record = signal(
    null,
    ...ngDevMode ? [{ debugName: "record" }] : (
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
  isFormValid = signal(
    false,
    ...ngDevMode ? [{ debugName: "isFormValid" }] : (
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
  isLoading = signal(
    false,
    ...ngDevMode ? [{ debugName: "isLoading" }] : (
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
  conflict = signal(
    null,
    ...ngDevMode ? [{ debugName: "conflict" }] : (
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
  remoteRecord = signal(
    null,
    ...ngDevMode ? [{ debugName: "remoteRecord" }] : (
      /* istanbul ignore next */
      []
    )
  );
  readonly = computed(
    () => this.isSubmitting() || this.isLoading() || !!this.conflict() || this.identity() !== this.owner,
    ...ngDevMode ? [{ debugName: "readonly" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pageTitle = computed(
    () => {
      if (this.isEditMode()) {
        const name = this.record()?.fullName;
        return name ? `Editar Datos: ${name}` : "Editar Datos del Paciente";
      }
      return "Registrar Nuevo Paciente";
    },
    ...ngDevMode ? [{ debugName: "pageTitle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pageSubtitle = computed(
    () => {
      if (this.isEditMode()) {
        return "Actualiz\xE1 los datos filiatorios y cl\xEDnicos registrados en la ficha del paciente.";
      }
      return "Complet\xE1 los campos cl\xEDnicos de tu configuraci\xF3n activa para incorporar el paciente al sistema.";
    },
    ...ngDevMode ? [{ debugName: "pageSubtitle" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ngOnInit() {
    this.owner = this.identity();
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      this.epoch++;
    });
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const idParam = params.get("id");
      if (idParam) {
        const id = Number(idParam);
        if (!isNaN(id) && id > 0) {
          this.patientId.set(id);
          this.isEditMode.set(true);
          void this.loadPatientForEdit(id);
          return;
        }
      }
      this.patientId.set(null);
      this.isEditMode.set(false);
      void this.loadCreateForm();
    });
  }
  async loadPatientForEdit(id) {
    const epoch = ++this.epoch;
    this.isLoading.set(true);
    this.errorMessage.set(null);
    try {
      const patient = await firstValueFrom(this.patientService.getPatientById(id));
      if (!this.alive(epoch))
        return;
      this.record.set(structuredClone(patient));
      this.definition.set(structuredClone(patient.formDefinitionSnapshot));
      this.values.set(structuredClone(patient.formValues));
      this.formulaResults.set(structuredClone(patient.formulaResults));
    } catch (error) {
      if (this.alive(epoch)) {
        this.errorMessage.set(errorMessage(error, "No pudimos cargar los datos del paciente para editar."));
      }
    } finally {
      if (this.alive(epoch)) {
        this.isLoading.set(false);
      }
    }
  }
  async loadCreateForm() {
    const epoch = ++this.epoch;
    this.isLoading.set(true);
    this.errorMessage.set(null);
    try {
      const workspace = await this.workspaceStore.loadSetup();
      if (!this.alive(epoch))
        return;
      if (!workspace?.onboardingCompleted || !workspace.definition) {
        throw new Error("Complet\xE1 la configuraci\xF3n de tu especialidad antes de registrar pacientes.");
      }
      this.workspace.set(structuredClone(workspace));
      this.definition.set(structuredClone(workspace.definition.patientForm));
    } catch (error) {
      if (this.alive(epoch)) {
        this.errorMessage.set(errorMessage(error, "No pudimos cargar el formulario de paciente."));
      }
    } finally {
      if (this.alive(epoch)) {
        this.isLoading.set(false);
      }
    }
  }
  onValuesChange(values) {
    if (!this.readonly()) {
      this.values.set(structuredClone(values));
      this.formulaResults.set({});
    }
  }
  onFormValidityChange(valid) {
    this.isFormValid.set(valid);
  }
  cancel() {
    if (this.isEditMode() && this.patientId()) {
      void this.router.navigate(["/pacientes", this.patientId()]);
    } else {
      void this.router.navigate(["/pacientes"]);
    }
  }
  async submit() {
    const definition = this.definition();
    const record = this.record();
    const workspace = this.workspace();
    if (!definition || this.readonly() || !this.isFormValid())
      return;
    if (!record && !workspace)
      return;
    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    const epoch = ++this.epoch;
    try {
      const values = inputValues(definition, this.values());
      const saved = await firstValueFrom(record ? this.patientService.updatePatient(record.id, {
        expectedVersion: record.version,
        values
      }) : this.patientService.createPatient({
        workspaceVersion: workspace.version,
        values
      }));
      if (!this.alive(epoch))
        return;
      this.activePatientService.setActivePatient(saved);
      this.activePatientService.loadPatient(saved.id);
      void this.router.navigate(["/pacientes", saved.id]);
    } catch (error) {
      if (this.alive(epoch)) {
        this.conflict.set(conflictKind(error));
        this.errorMessage.set(errorMessage(error, "No pudimos guardar el paciente. Tus respuestas se conservan."));
      }
    } finally {
      if (!this.destroyed && epoch === this.epoch) {
        this.isSubmitting.set(false);
      }
    }
  }
  async reviewRemote() {
    if (!this.conflict() || this.isSubmitting() || this.isLoading() || this.identity() !== this.owner) {
      return;
    }
    const epoch = ++this.epoch;
    this.isLoading.set(true);
    this.remoteWorkspace.set(null);
    this.remoteRecord.set(null);
    try {
      if (this.conflict() === "workspace") {
        const workspace = await this.workspaceStore.loadSetup(true);
        if (this.alive(epoch) && workspace?.onboardingCompleted && workspace.definition) {
          this.remoteWorkspace.set(structuredClone(workspace));
        }
      } else {
        const record = await firstValueFrom(this.patientService.getPatientById(this.record().id));
        if (this.alive(epoch) && record.id === this.record()?.id) {
          this.remoteRecord.set(structuredClone(record));
        }
      }
    } catch (error) {
      if (this.alive(epoch)) {
        this.errorMessage.set(errorMessage(error, "No pudimos consultar la copia del servidor."));
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
    if (!remote?.definition || !previous || this.isLoading() || this.isSubmitting() || this.identity() !== this.owner) {
      return;
    }
    this.values.set(retainCompatibleValues(previous, remote.definition.patientForm, this.values()));
    this.workspace.set(structuredClone(remote));
    this.definition.set(structuredClone(remote.definition.patientForm));
    this.formulaResults.set({});
    this.conflict.set(null);
    this.errorMessage.set(null);
    this.remoteWorkspace.set(null);
  }
  useRemoteRecord() {
    const remote = this.remoteRecord();
    if (!remote || this.isLoading() || this.isSubmitting() || this.identity() !== this.owner) {
      return;
    }
    this.record.set(structuredClone(remote));
    this.definition.set(structuredClone(remote.formDefinitionSnapshot));
    this.values.set(structuredClone(remote.formValues));
    this.formulaResults.set(structuredClone(remote.formulaResults));
    this.conflict.set(null);
    this.errorMessage.set(null);
    this.remoteRecord.set(null);
  }
  identity() {
    return this.auth.currentUser()?.id ?? "";
  }
  alive(epoch) {
    return !this.destroyed && epoch === this.epoch && this.identity() === this.owner;
  }
  static \u0275fac = function PatientFormPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientFormPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PatientFormPageComponent, selectors: [["app-patient-form-page"]], decls: 21, vars: 11, consts: [["aria-label", "Formulario de paciente", 1, "patient-form-page", "animate-fade-in"], [1, "patient-form-container"], [1, "patient-form-header"], ["type", "button", 1, "btn-back", 3, "click"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "aria-hidden", "true"], ["d", "M19 12H5M12 19l-7-7 7-7"], [1, "title-section"], [1, "title-badge-row"], [1, "mode-badge"], [1, "page-title"], [1, "page-subtitle"], ["role", "alert", 1, "alert-banner", "alert-error"], ["role", "status", 1, "loading-state"], ["role", "alert", 1, "conflict-card"], [1, "empty-state-notice"], [1, "loading-spinner"], [1, "conflict-intro"], ["type", "button", 1, "btn-conflict-action", 3, "click", "disabled"], [1, "remote-box"], [1, "form-card"], [3, "valuesChange", "validityChange", "definition", "values", "formulaResults", "readonly"], [1, "form-actions-bar"], ["type", "button", 1, "btn-cancel", 3, "click", "disabled"], ["type", "button", 1, "btn-submit", 3, "click", "disabled"], ["type", "button", 1, "btn-retry", 3, "click"]], template: function PatientFormPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "header", 2)(3, "button", 3);
      \u0275\u0275listener("click", function PatientFormPageComponent_Template_button_click_3_listener() {
        return ctx.cancel();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(4, "svg", 4);
      \u0275\u0275element(5, "path", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(6, "span");
      \u0275\u0275text(7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 6)(9, "div", 7)(10, "span", 8);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "h1", 9);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "p", 10);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(16, PatientFormPageComponent_Conditional_16_Template, 3, 1, "div", 11);
      \u0275\u0275conditionalCreate(17, PatientFormPageComponent_Conditional_17_Template, 4, 0, "div", 12);
      \u0275\u0275conditionalCreate(18, PatientFormPageComponent_Conditional_18_Template, 7, 3, "div", 13);
      \u0275\u0275conditionalCreate(19, PatientFormPageComponent_Conditional_19_Template, 7, 7)(20, PatientFormPageComponent_Conditional_20_Template, 5, 0, "div", 14);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_9_0;
      \u0275\u0275advance(3);
      \u0275\u0275attribute("aria-label", ctx.isEditMode() ? "Volver a la ficha del paciente" : "Volver al directorio de pacientes");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.isEditMode() ? "Volver a la Ficha" : "Volver al Directorio");
      \u0275\u0275advance(3);
      \u0275\u0275classProp("badge-edit", ctx.isEditMode());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isEditMode() ? "Edici\xF3n de Paciente" : "Nuevo Registro", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.pageTitle());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.pageSubtitle());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 17 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.conflict() ? 18 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_9_0 = ctx.definition()) ? 19 : !ctx.isLoading() ? 20 : -1, tmp_9_0);
    }
  }, dependencies: [DynamicFormRendererComponent], styles: ["\n.patient-form-page[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 1040px;\n  margin: 0 auto;\n  padding: 1.5rem 1rem 3rem 1rem;\n}\n.patient-form-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.patient-form-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding-bottom: 0.5rem;\n  border-bottom: 1px solid var(--%NS%dc-outline, #e2e8f0);\n}\n.btn-back[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  color: var(--%NS%dc-teal-ink, #0d9488);\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 8px;\n  padding: 0.45rem 0.9rem;\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.btn-back[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%dc-surface-high, #f1f5f9);\n  border-color: #0d9488;\n  color: var(--%NS%dc-teal-ink, #0f766e);\n}\n.title-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.title-badge-row[_ngcontent-%COMP%] {\n  margin-bottom: 0.2rem;\n}\n.mode-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  background-color: var(--%NS%dc-teal-surface, #ecfdf5);\n  color: var(--%NS%dc-teal-ink, #047857);\n  font-size: 0.75rem;\n  font-weight: 700;\n  padding: 0.2rem 0.65rem;\n  border-radius: 9999px;\n  border: 1px solid #a7f3d0;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.mode-badge.badge-edit[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-blue-surface, #eff6ff);\n  color: var(--%NS%dc-blue-ink, #1d4ed8);\n  border-color: #bfdbfe;\n}\n.page-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.65rem;\n  font-weight: 800;\n  color: var(--%NS%dc-ink, #0f172a);\n  letter-spacing: -0.025em;\n}\n.page-subtitle[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.92rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  line-height: 1.45;\n}\n.form-card[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 14px;\n  box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.05);\n  padding: 2rem;\n}\n.form-actions-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding: 1rem 1.5rem;\n  background: var(--%NS%dc-surface, #ffffff);\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 12px;\n  box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.04);\n}\n.btn-cancel[_ngcontent-%COMP%] {\n  padding: 0.65rem 1.4rem;\n  background: var(--%NS%dc-surface, #ffffff);\n  color: var(--%NS%dc-ink-secondary, #475569);\n  border: 1px solid var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 0.92rem;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.btn-cancel[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  border-color: #94a3b8;\n  color: var(--%NS%dc-ink, #1e293b);\n}\n.btn-cancel[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-submit[_ngcontent-%COMP%] {\n  padding: 0.65rem 1.6rem;\n  background: #0d9488;\n  color: #ffffff;\n  border: 1px solid #0f766e;\n  border-radius: 8px;\n  font-weight: 700;\n  font-size: 0.92rem;\n  cursor: pointer;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n  transition: all 0.15s ease;\n}\n.btn-submit[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #0f766e;\n  box-shadow: 0 3px 6px rgba(13, 148, 136, 0.25);\n}\n.btn-submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  background: #94a3b8;\n  border-color: #94a3b8;\n  cursor: not-allowed;\n}\n.alert-banner[_ngcontent-%COMP%] {\n  padding: 0.85rem 1.15rem;\n  border-radius: 8px;\n  font-size: 0.88rem;\n  font-weight: 500;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-error-surface, #fef2f2);\n  border: 1px solid #fecaca;\n  color: var(--%NS%dc-error-ink, #b91c1c);\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.85rem;\n  padding: 3rem 1rem;\n  color: var(--%NS%dc-ink-muted, #64748b);\n  font-size: 0.95rem;\n}\n.loading-spinner[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border: 3px solid var(--%NS%dc-outline, #cbd5e1);\n  border-top-color: #0d9488;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.conflict-card[_ngcontent-%COMP%] {\n  background: var(--%NS%dc-teal-surface, #f0fdfa);\n  border: 1px solid #99f6e4;\n  border-radius: 10px;\n  padding: 1.25rem;\n  color: var(--%NS%dc-teal-ink, #115e59);\n}\n.conflict-intro[_ngcontent-%COMP%] {\n  margin: 0 0 0.75rem 0;\n  font-weight: 600;\n}\n.remote-box[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding-top: 0.75rem;\n  border-top: 1px solid #ccfbf1;\n}\n.btn-conflict-action[_ngcontent-%COMP%] {\n  background: #0d9488;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  padding: 0.45rem 0.9rem;\n  font-size: 0.82rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.btn-conflict-action[_ngcontent-%COMP%]:hover {\n  background: #0f766e;\n}\n.empty-state-notice[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem 1rem;\n  background: var(--%NS%dc-surface-low, #f8fafc);\n  border: 1px dashed var(--%NS%dc-outline, #cbd5e1);\n  border-radius: 12px;\n  color: var(--%NS%dc-ink-muted, #64748b);\n}\n.btn-retry[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  background: #0d9488;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  padding: 0.45rem 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.animate-fade-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease-in-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=patient-form-page.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientFormPageComponent, [{
    type: Component,
    args: [{ selector: "app-patient-form-page", imports: [DynamicFormRendererComponent], template: `<div class="patient-form-page animate-fade-in" aria-label="Formulario de paciente">
  <div class="patient-form-container">
    <!-- Header with Back Button, Title and Subtitle -->
    <header class="patient-form-header">
      <button
        type="button"
        class="btn-back"
        (click)="cancel()"
        [attr.aria-label]="isEditMode() ? 'Volver a la ficha del paciente' : 'Volver al directorio de pacientes'"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>{{ isEditMode() ? 'Volver a la Ficha' : 'Volver al Directorio' }}</span>
      </button>

      <div class="title-section">
        <div class="title-badge-row">
          <span class="mode-badge" [class.badge-edit]="isEditMode()">
            {{ isEditMode() ? 'Edici\xF3n de Paciente' : 'Nuevo Registro' }}
          </span>
        </div>
        <h1 class="page-title">{{ pageTitle() }}</h1>
        <p class="page-subtitle">{{ pageSubtitle() }}</p>
      </div>
    </header>

    @if (errorMessage()) {
      <div class="alert-banner alert-error" role="alert">
        <span>{{ errorMessage() }}</span>
      </div>
    }

    @if (isLoading()) {
      <div class="loading-state" role="status">
        <div class="loading-spinner"></div>
        <span>Cargando datos del paciente...</span>
      </div>
    }

    @if (conflict()) {
      <div class="conflict-card" role="alert">
        <p class="conflict-intro">
          Tus respuestas siguen en pantalla, pero la versi\xF3n del servidor cambi\xF3. Revis\xE1 antes de continuar.
        </p>
        <button
          type="button"
          class="btn-conflict-action"
          [disabled]="isLoading() || isSubmitting()"
          (click)="reviewRemote()"
        >
          Consultar copia del servidor
        </button>

        @if (remoteWorkspace(); as remote) {
          <div class="remote-box">
            <p>Configuraci\xF3n actual: <strong>{{ remote.specialty.name }}</strong>. Se conservar\xE1n las respuestas de campos compatibles.</p>
            <button
              type="button"
              class="btn-conflict-action"
              [disabled]="isLoading()"
              (click)="useRemoteWorkspace()"
            >
              Usar formulario actual y conservar respuestas
            </button>
          </div>
        }

        @if (remoteRecord(); as remote) {
          <div class="remote-box">
            <p>Ficha guardada: <strong>{{ remote.fullName }}</strong>.</p>
            <button
              type="button"
              class="btn-conflict-action"
              [disabled]="isLoading()"
              (click)="useRemoteRecord()"
            >
              Usar ficha del servidor y descartar cambios locales
            </button>
          </div>
        }
      </div>
    }

    <!-- Main Clinical Form Card -->
    @if (definition(); as form) {
      <main class="form-card">
        <app-dynamic-form-renderer
          [definition]="form"
          [values]="values()"
          [formulaResults]="formulaResults()"
          [readonly]="readonly()"
          (valuesChange)="onValuesChange($event)"
          (validityChange)="onFormValidityChange($event)"
        />
      </main>

      <!-- Bottom Sticky Action Bar -->
      <footer class="form-actions-bar">
        <button
          type="button"
          class="btn-cancel"
          [disabled]="isSubmitting()"
          (click)="cancel()"
        >
          Cancelar
        </button>
        <button
          type="button"
          class="btn-submit"
          [disabled]="readonly() || !definition() || !isFormValid()"
          (click)="submit()"
        >
          {{ isSubmitting() ? 'Guardando...' : isEditMode() ? 'Guardar Cambios' : 'Crear Paciente' }}
        </button>
      </footer>
    } @else if (!isLoading()) {
      <div class="empty-state-notice">
        <p>No se pudo cargar la definici\xF3n del formulario del paciente.</p>
        <button type="button" class="btn-retry" (click)="ngOnInit()">Reintentar</button>
      </div>
    }
  </div>
</div>
`, styles: ["/* src/app/features/patient-form/patient-form-page.component.css */\n.patient-form-page {\n  width: 100%;\n  max-width: 1040px;\n  margin: 0 auto;\n  padding: 1.5rem 1rem 3rem 1rem;\n}\n.patient-form-container {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n.patient-form-header {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding-bottom: 0.5rem;\n  border-bottom: 1px solid var(--dc-outline, #e2e8f0);\n}\n.btn-back {\n  align-self: flex-start;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  background: var(--dc-surface-low, #f8fafc);\n  color: var(--dc-teal-ink, #0d9488);\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  border-radius: 8px;\n  padding: 0.45rem 0.9rem;\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.btn-back:hover {\n  background: var(--dc-surface-high, #f1f5f9);\n  border-color: #0d9488;\n  color: var(--dc-teal-ink, #0f766e);\n}\n.title-section {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n.title-badge-row {\n  margin-bottom: 0.2rem;\n}\n.mode-badge {\n  display: inline-flex;\n  align-items: center;\n  background-color: var(--dc-teal-surface, #ecfdf5);\n  color: var(--dc-teal-ink, #047857);\n  font-size: 0.75rem;\n  font-weight: 700;\n  padding: 0.2rem 0.65rem;\n  border-radius: 9999px;\n  border: 1px solid #a7f3d0;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.mode-badge.badge-edit {\n  background-color: var(--dc-blue-surface, #eff6ff);\n  color: var(--dc-blue-ink, #1d4ed8);\n  border-color: #bfdbfe;\n}\n.page-title {\n  margin: 0;\n  font-size: 1.65rem;\n  font-weight: 800;\n  color: var(--dc-ink, #0f172a);\n  letter-spacing: -0.025em;\n}\n.page-subtitle {\n  margin: 0;\n  font-size: 0.92rem;\n  color: var(--dc-ink-muted, #64748b);\n  line-height: 1.45;\n}\n.form-card {\n  background: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 14px;\n  box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.05);\n  padding: 2rem;\n}\n.form-actions-bar {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding: 1rem 1.5rem;\n  background: var(--dc-surface, #ffffff);\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 12px;\n  box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.04);\n}\n.btn-cancel {\n  padding: 0.65rem 1.4rem;\n  background: var(--dc-surface, #ffffff);\n  color: var(--dc-ink-secondary, #475569);\n  border: 1px solid var(--dc-outline, #cbd5e1);\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 0.92rem;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.btn-cancel:hover:not(:disabled) {\n  background: var(--dc-surface-low, #f8fafc);\n  border-color: #94a3b8;\n  color: var(--dc-ink, #1e293b);\n}\n.btn-cancel:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-submit {\n  padding: 0.65rem 1.6rem;\n  background: #0d9488;\n  color: #ffffff;\n  border: 1px solid #0f766e;\n  border-radius: 8px;\n  font-weight: 700;\n  font-size: 0.92rem;\n  cursor: pointer;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n  transition: all 0.15s ease;\n}\n.btn-submit:hover:not(:disabled) {\n  background: #0f766e;\n  box-shadow: 0 3px 6px rgba(13, 148, 136, 0.25);\n}\n.btn-submit:disabled {\n  opacity: 0.5;\n  background: #94a3b8;\n  border-color: #94a3b8;\n  cursor: not-allowed;\n}\n.alert-banner {\n  padding: 0.85rem 1.15rem;\n  border-radius: 8px;\n  font-size: 0.88rem;\n  font-weight: 500;\n}\n.alert-error {\n  background-color: var(--dc-error-surface, #fef2f2);\n  border: 1px solid #fecaca;\n  color: var(--dc-error-ink, #b91c1c);\n}\n.loading-state {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.85rem;\n  padding: 3rem 1rem;\n  color: var(--dc-ink-muted, #64748b);\n  font-size: 0.95rem;\n}\n.loading-spinner {\n  width: 24px;\n  height: 24px;\n  border: 3px solid var(--dc-outline, #cbd5e1);\n  border-top-color: #0d9488;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.conflict-card {\n  background: var(--dc-teal-surface, #f0fdfa);\n  border: 1px solid #99f6e4;\n  border-radius: 10px;\n  padding: 1.25rem;\n  color: var(--dc-teal-ink, #115e59);\n}\n.conflict-intro {\n  margin: 0 0 0.75rem 0;\n  font-weight: 600;\n}\n.remote-box {\n  margin-top: 1rem;\n  padding-top: 0.75rem;\n  border-top: 1px solid #ccfbf1;\n}\n.btn-conflict-action {\n  background: #0d9488;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  padding: 0.45rem 0.9rem;\n  font-size: 0.82rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.btn-conflict-action:hover {\n  background: #0f766e;\n}\n.empty-state-notice {\n  text-align: center;\n  padding: 3rem 1rem;\n  background: var(--dc-surface-low, #f8fafc);\n  border: 1px dashed var(--dc-outline, #cbd5e1);\n  border-radius: 12px;\n  color: var(--dc-ink-muted, #64748b);\n}\n.btn-retry {\n  margin-top: 0.5rem;\n  background: #0d9488;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  padding: 0.45rem 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.animate-fade-in {\n  animation: fadeIn 0.2s ease-in-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=patient-form-page.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PatientFormPageComponent, { className: "PatientFormPageComponent", filePath: "src/app/features/patient-form/patient-form-page.component.ts", lineNumber: 36 });
})();
export {
  PatientFormPageComponent
};
//# debugId=312ffcd4-cb4c-5538-b08a-54f24d8fdfef
//# sourceMappingURL=chunk-MC6DANMV.js.map
