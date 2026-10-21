import {
  WorkspaceStore
} from "./chunk-WPGAV52V.js";
import {
  Injectable,
  computed,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-3HO5VEWU.js";

// src/app/core/experience/patient-record-actions.ts
var PATIENT_RECORD_ACTIONS = {
  EDIT_PATIENT: {
    id: "EDIT_PATIENT",
    primary: {
      label: "Editar datos",
      icon: "lucideUser",
      css: "btn-secondary-edit",
      title: "Editar datos filiatorios y cl\xEDnicos del paciente"
    }
  },
  NEW_ENCOUNTER: {
    id: "NEW_ENCOUNTER",
    primary: { label: "Nueva historia cl\xEDnica", icon: "lucidePlus", css: "btn-primary-soap" }
  },
  VIEW_GROWTH: {
    id: "VIEW_GROWTH"
  },
  PRINT_DOCUMENT: {
    id: "PRINT_DOCUMENT"
  }
};

// src/app/core/experience/patient-record-actions.service.ts
var PatientRecordActionsService = class _PatientRecordActionsService {
  workspace = inject(WorkspaceStore);
  actions = computed(
    () => this.workspace.patientRecordActions().filter((id) => this.isAvailable(id)).map((id) => PATIENT_RECORD_ACTIONS[id]),
    ...ngDevMode ? [{ debugName: "actions" }] : (
      /* istanbul ignore next */
      []
    )
  );
  has(id) {
    return this.workspace.hasRecordAction(id) && this.isAvailable(id);
  }
  isAvailable(id) {
    return id !== "VIEW_GROWTH" || this.workspace.hasRecordTab("GROWTH") && this.workspace.isModuleActive("GROWTH_CHARTS");
  }
  static \u0275fac = function PatientRecordActionsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientRecordActionsService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PatientRecordActionsService, factory: _PatientRecordActionsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientRecordActionsService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/core/models/doctor-print-identity.ts
function accountText(value) {
  return typeof value === "string" ? value.trim() : "";
}
function doctorPrintIdentity(metadata) {
  return {
    fullName: accountText(metadata?.["full_name"]),
    license: accountText(metadata?.["license"]),
    clinic: {
      name: accountText(metadata?.["clinic_name"]),
      address: accountText(metadata?.["clinic_address"]),
      phone: accountText(metadata?.["clinic_phone"])
    }
  };
}

export {
  PatientRecordActionsService,
  doctorPrintIdentity
};
//# debugId=d168bae9-37df-530b-88fc-42f5d16a7d6f
//# sourceMappingURL=chunk-JNSPAAVP.js.map
