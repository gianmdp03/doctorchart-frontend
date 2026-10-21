import {
  instantParts,
  userTimeZone
} from "./chunk-YTAXUAO7.js";
import {
  AuthService
} from "./chunk-KGUDCUHJ.js";
import {
  environment
} from "./chunk-WKCAPCQH.js";
import {
  BrowserUiStorageService
} from "./chunk-WBCHXDEU.js";
import {
  HttpClient,
  HttpParams,
  isPlatformBrowser
} from "./chunk-SYX7XZ26.js";
import {
  DestroyRef,
  Injectable,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  setClassMetadata,
  signal,
  untracked,
  ɵɵdefineInjectable
} from "./chunk-3HO5VEWU.js";

// src/app/core/services/user-clock.service.ts
var UserClockService = class _UserClockService {
  now = signal(
    Date.now(),
    ...ngDevMode ? [{ debugName: "now" }] : (
      /* istanbul ignore next */
      []
    )
  );
  timeZone = computed(
    () => {
      this.now();
      return userTimeZone();
    },
    ...ngDevMode ? [{ debugName: "timeZone" }] : (
      /* istanbul ignore next */
      []
    )
  );
  day = computed(
    () => instantParts(new Date(this.now()), this.timeZone()).day,
    ...ngDevMode ? [{ debugName: "day" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    const destroy = inject(DestroyRef);
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      const timer = setInterval(() => this.now.set(Date.now()), 6e4);
      destroy.onDestroy(() => clearInterval(timer));
    }
  }
  static \u0275fac = function UserClockService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserClockService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserClockService, factory: _UserClockService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserClockService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

// src/app/core/services/patient.service.ts
var PatientService = class _PatientService {
  http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}/patients`;
  getPatients(page = 0, size = 10, sort = "fullName,asc", search, filter = "ALL") {
    let params = new HttpParams().set("page", page.toString()).set("size", size.toString()).set("sort", sort).set("filter", filter);
    if (search && search.trim()) {
      params = params.set("search", search.trim());
    }
    return this.http.get(this.baseUrl, { params });
  }
  getPatientById(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createPatient(patient) {
    return this.http.post(this.baseUrl, patient);
  }
  updatePatient(id, patient) {
    return this.http.put(`${this.baseUrl}/${id}`, patient);
  }
  deletePatient(id) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  static \u0275fac = function PatientService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PatientService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PatientService, factory: _PatientService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PatientService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/core/services/active-patient.service.ts
var ActivePatientService = class _ActivePatientService {
  clock = inject(UserClockService);
  patientService = inject(PatientService);
  storage = inject(BrowserUiStorageService);
  auth = inject(AuthService);
  destroyRef = inject(DestroyRef);
  owner = void 0;
  request = null;
  generation = 0;
  activePatient = signal(
    null,
    ...ngDevMode ? [{ debugName: "activePatient" }] : (
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
  error = signal(
    null,
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  patientId = computed(
    () => this.activePatient()?.id ?? null,
    ...ngDevMode ? [{ debugName: "patientId" }] : (
      /* istanbul ignore next */
      []
    )
  );
  patientName = computed(
    () => this.activePatient()?.fullName ?? "Sin paciente seleccionado",
    ...ngDevMode ? [{ debugName: "patientName" }] : (
      /* istanbul ignore next */
      []
    )
  );
  patientInitials = computed(
    () => {
      const name = this.activePatient()?.fullName;
      if (!name)
        return "DP";
      const parts = name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return name.slice(0, 2).toUpperCase();
    },
    ...ngDevMode ? [{ debugName: "patientInitials" }] : (
      /* istanbul ignore next */
      []
    )
  );
  formattedBirthDate = computed(
    () => {
      const raw = this.activePatient()?.birthDate;
      if (!raw)
        return "\u2014";
      const date = /* @__PURE__ */ new Date(raw + "T00:00:00");
      return isNaN(date.getTime()) ? raw : date.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
    },
    ...ngDevMode ? [{ debugName: "formattedBirthDate" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ageDisplay = computed(
    () => {
      const raw = this.activePatient()?.birthDate;
      if (!raw)
        return "\u2014";
      const birth = /* @__PURE__ */ new Date(raw + "T00:00:00");
      if (isNaN(birth.getTime()))
        return "\u2014";
      const now = /* @__PURE__ */ new Date(this.clock.day() + "T00:00:00");
      let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
      if (now.getDate() < birth.getDate()) {
        months--;
      }
      if (months < 0)
        return "Reci\xE9n nacido";
      if (months === 0) {
        const diffTime = Math.max(0, Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - Date.UTC(birth.getFullYear(), birth.getMonth(), birth.getDate()));
        const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
        return `${diffDays} d\xEDas`;
      }
      if (months < 24) {
        return `${months} meses`;
      }
      const years = Math.floor(months / 12);
      const remMonths = months % 12;
      return remMonths > 0 ? `${years} a\xF1os ${remMonths}m` : `${years} a\xF1os`;
    },
    ...ngDevMode ? [{ debugName: "ageDisplay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  ageInYears = computed(
    () => {
      const raw = this.activePatient()?.birthDate;
      if (!raw)
        return 0;
      const birth = /* @__PURE__ */ new Date(raw + "T00:00:00");
      if (isNaN(birth.getTime()))
        return 0;
      const now = /* @__PURE__ */ new Date(this.clock.day() + "T00:00:00");
      let years = now.getFullYear() - birth.getFullYear();
      const m = now.getMonth() - birth.getMonth();
      if (m < 0 || m === 0 && now.getDate() < birth.getDate()) {
        years--;
      }
      return Math.max(0, years);
    },
    ...ngDevMode ? [{ debugName: "ageInYears" }] : (
      /* istanbul ignore next */
      []
    )
  );
  primaryGuardian = computed(
    () => {
      const info = this.activePatient()?.guardianInfo;
      if (!info)
        return "\u2014";
      if (info.fatherFullName) {
        return info.fatherFullName;
      }
      if (info.motherFullName) {
        return info.motherFullName;
      }
      if (info.firstGuardianFullName) {
        return info.firstGuardianFullName;
      }
      return "\u2014";
    },
    ...ngDevMode ? [{ debugName: "primaryGuardian" }] : (
      /* istanbul ignore next */
      []
    )
  );
  calculateAgeAtDate(targetDate) {
    const rawBirth = this.activePatient()?.birthDate;
    if (!rawBirth)
      return "\u2014";
    const birth = /* @__PURE__ */ new Date(rawBirth + "T00:00:00");
    if (isNaN(birth.getTime()))
      return "\u2014";
    let target;
    if (!targetDate) {
      target = /* @__PURE__ */ new Date();
    } else if (targetDate instanceof Date) {
      target = targetDate;
    } else {
      const parsed = new Date(targetDate.includes("T") ? targetDate : targetDate + "T00:00:00");
      target = isNaN(parsed.getTime()) ? /* @__PURE__ */ new Date() : parsed;
    }
    let months = (target.getFullYear() - birth.getFullYear()) * 12 + (target.getMonth() - birth.getMonth());
    if (target.getDate() < birth.getDate()) {
      months--;
    }
    if (months < 0)
      return "Reci\xE9n nacido";
    if (months === 0) {
      const diffTime = Math.abs(target.getTime() - birth.getTime());
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      return `${diffDays} d\xEDas`;
    }
    if (months < 24) {
      return `${months} meses`;
    }
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    return remMonths > 0 ? `${years} a\xF1os ${remMonths}m` : `${years} a\xF1os`;
  }
  latestMeasurements = computed(
    () => this.activePatient()?.latestMeasurements ?? null,
    ...ngDevMode ? [{ debugName: "latestMeasurements" }] : (
      /* istanbul ignore next */
      []
    )
  );
  formattedWeight = computed(
    () => {
      const m = this.latestMeasurements();
      const weight = m?.weightKg != null ? Number(m.weightKg) : null;
      if (weight != null && !isNaN(weight) && weight > 0) {
        return `${weight >= 10 ? weight.toFixed(1) : weight.toFixed(3)} kg`;
      }
      return "-- kg";
    },
    ...ngDevMode ? [{ debugName: "formattedWeight" }] : (
      /* istanbul ignore next */
      []
    )
  );
  formattedHeight = computed(
    () => {
      const m = this.latestMeasurements();
      const height = m?.heightCm != null ? Number(m.heightCm) : null;
      if (height != null && !isNaN(height) && height > 0) {
        return `${height.toFixed(1)} cm`;
      }
      return "-- cm";
    },
    ...ngDevMode ? [{ debugName: "formattedHeight" }] : (
      /* istanbul ignore next */
      []
    )
  );
  formattedHeadCircumference = computed(
    () => {
      const m = this.latestMeasurements();
      const hc = m?.headCircumferenceCm != null ? Number(m.headCircumferenceCm) : null;
      if (hc != null && !isNaN(hc) && hc > 0) {
        return `${hc.toFixed(1)} cm`;
      }
      return "-- cm";
    },
    ...ngDevMode ? [{ debugName: "formattedHeadCircumference" }] : (
      /* istanbul ignore next */
      []
    )
  );
  deltaWeight = computed(
    () => {
      const patient = this.activePatient();
      const currentWeight = patient?.latestMeasurements?.weightKg != null ? Number(patient.latestMeasurements.weightKg) : null;
      const birthWeight = patient?.personalHistory?.birthMeasurements?.weightKg != null ? Number(patient.personalHistory.birthMeasurements.weightKg) : null;
      if (currentWeight != null && birthWeight != null && !isNaN(currentWeight) && !isNaN(birthWeight) && currentWeight > 0 && birthWeight > 0) {
        const diff = currentWeight - birthWeight;
        const sign = diff >= 0 ? "+" : "";
        return `${sign}${diff.toFixed(3)} kg`;
      }
      return "--";
    },
    ...ngDevMode ? [{ debugName: "deltaWeight" }] : (
      /* istanbul ignore next */
      []
    )
  );
  bmiDisplay = computed(
    () => {
      const m = this.latestMeasurements();
      const weight = m?.weightKg != null ? Number(m.weightKg) : null;
      const height = m?.heightCm != null ? Number(m.heightCm) : null;
      if (weight != null && height != null && !isNaN(weight) && !isNaN(height) && weight > 0 && height > 0) {
        const heightM = height / 100;
        const bmi = weight / (heightM * heightM);
        if (isFinite(bmi) && bmi > 0) {
          return `${bmi.toFixed(1)} kg/m\xB2`;
        }
      }
      return "--";
    },
    ...ngDevMode ? [{ debugName: "bmiDisplay" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      this.auth.currentUser();
      untracked(() => this.syncSession());
    });
    this.destroyRef.onDestroy(() => this.request?.unsubscribe());
  }
  syncSession(restore = true) {
    const owner = this.auth.currentUser()?.id ?? null;
    if (owner === this.owner)
      return;
    this.request?.unsubscribe();
    this.request = null;
    this.generation++;
    if (!owner && this.owner)
      this.storage.writeActivePatientId(this.owner, null);
    this.owner = owner;
    this.activePatient.set(null);
    this.isLoading.set(false);
    this.error.set(null);
    if (restore && owner) {
      const id = this.storage.readActivePatientId(owner);
      if (id !== null)
        this.loadPatient(id);
    }
  }
  persist(patientId) {
    if (this.owner)
      this.storage.writeActivePatientId(this.owner, patientId);
  }
  setActivePatient(patient) {
    this.syncSession(false);
    this.request?.unsubscribe();
    this.generation++;
    if (!this.owner)
      return;
    this.activePatient.set(patient ? structuredClone(patient) : null);
    this.isLoading.set(false);
    this.error.set(null);
    this.persist(patient?.id ?? null);
  }
  loadPatient(id) {
    this.syncSession(false);
    if (!this.owner || !Number.isSafeInteger(id) || id <= 0)
      return;
    this.request?.unsubscribe();
    const generation = ++this.generation;
    const owner = this.owner;
    if (this.patientId() !== id) {
      this.activePatient.set(null);
      this.persist(null);
    }
    this.isLoading.set(true);
    this.error.set(null);
    this.request = this.patientService.getPatientById(id).subscribe({
      next: (patient) => {
        if (generation !== this.generation || owner !== this.auth.currentUser()?.id)
          return;
        if (patient.id !== id) {
          this.activePatient.set(null);
          this.isLoading.set(false);
          this.persist(null);
          this.error.set("La respuesta no corresponde al paciente solicitado.");
          return;
        }
        this.activePatient.set(structuredClone(patient));
        this.isLoading.set(false);
        this.persist(id);
      },
      error: (err) => {
        if (generation !== this.generation || owner !== this.auth.currentUser()?.id)
          return;
        this.activePatient.set(null);
        this.isLoading.set(false);
        this.error.set(err?.error?.message || "Error al cargar paciente");
        if (err?.status === 403 || err?.status === 404)
          this.persist(null);
      }
    });
  }
  clear() {
    this.syncSession(false);
    this.request?.unsubscribe();
    this.request = null;
    this.generation++;
    this.isLoading.set(false);
    this.activePatient.set(null);
    this.error.set(null);
    this.persist(null);
  }
  static \u0275fac = function ActivePatientService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ActivePatientService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ActivePatientService, factory: _ActivePatientService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ActivePatientService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

export {
  UserClockService,
  PatientService,
  ActivePatientService
};
//# debugId=3a489c65-46a4-5c85-8e9a-08a13182e28c
//# sourceMappingURL=chunk-KDJQW6YV.js.map
