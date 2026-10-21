import {
  takeUntilDestroyed,
  toSignal
} from "./chunk-Y3XT3YWV.js";
import {
  userTimeZone
} from "./chunk-YTAXUAO7.js";
import {
  AuthService
} from "./chunk-KGUDCUHJ.js";
import {
  environment
} from "./chunk-WKCAPCQH.js";
import {
  ThemeService
} from "./chunk-5V3TTGBI.js";
import {
  lucideCalculator,
  lucideCalendarDays,
  lucideChevronLeft,
  lucideChevronRight,
  lucideExternalLink,
  lucideLayoutDashboard,
  lucideLogOut,
  lucideSearch,
  lucideSliders,
  lucideSlidersHorizontal,
  lucideType,
  lucideUser,
  lucideUsers,
  lucideX,
  provideIcons
} from "./chunk-Z3UJ4PSI.js";
import "./chunk-WBCHXDEU.js";
import {
  NavigationEnd,
  Router,
  RouterOutlet,
  provideRouter,
  withPreloading
} from "./chunk-XM57RTTR.js";
import {
  DomRendererFactory2,
  Meta,
  Title,
  bootstrapApplication,
  disableThrowOnSyntheticProps,
  provideClientHydration
} from "./chunk-YAYJVLGH.js";
import {
  provideHttpClient,
  withFetch,
  withInterceptors
} from "./chunk-SYX7XZ26.js";
import {
  ANIMATION_MODULE_TYPE,
  ChangeDetectionScheduler,
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  EnvironmentInjector,
  Injectable,
  InjectionToken,
  Injector,
  NgZone,
  PendingTasks,
  RendererFactory2,
  RuntimeError,
  __spreadProps,
  __spreadValues,
  afterNextRender,
  computed,
  effect,
  filter,
  firstValueFrom,
  inject,
  isObservable,
  makeEnvironmentProviders,
  map,
  of,
  performanceMarkFeature,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  runInInjectionContext,
  setClassMetadata,
  setClassMetadataAsync,
  signal,
  untracked,
  ɵsetClassDebugInfo,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefer,
  ɵɵdeferOnImmediate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomTemplate,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinvalidFactory,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext
} from "./chunk-3HO5VEWU.js";

// src/app/core/interceptors/time-zone.interceptor.ts
var timeZoneInterceptor = (request, next) => {
  const base = environment.apiUrl.replace(/\/$/, "");
  if (request.url !== base && !request.url.startsWith(base + "/") && !request.url.startsWith(base + "?")) return next(request);
  return next(request.clone({ params: request.params.set("timeZone", userTimeZone()), transferCache: false }));
};

// src/app/core/config/site.config.json
var site_config_default = {
  publicSiteUrl: "https://doctorchart.bycode.com.ar",
  publicPaths: [
    "/"
  ],
  clientPatterns: [
    "^/(login|dashboard|consultas|calendario-vacunacion|calculadoras|pacientes|pacientes/nuevo|ficha|admin/especialidades|onboarding/select-specialty|onboarding/setup)$",
    "^/(pacientes|ficha)/[^/]+(/editar)?$"
  ],
  redirects: {},
  apiGatewayOrigin: "",
  applicationUrls: {
    bycode: "https://bycode.com.ar",
    pointly: "https://pointly.bycode.com.ar",
    doctorchart: "https://doctorchart.bycode.com.ar"
  },
  supabase: {
    url: "",
    publishableKey: ""
  }
};

// src/app/core/config/seo.config.ts
var PUBLIC_SITE_URL = site_config_default.publicSiteUrl;
var PUBLIC_SEO_PATHS = site_config_default.publicPaths;

// src/app/core/services/seo.service.ts
var PUBLIC_PAGES = {
  "/": [
    "DoctorChart | Historias cl\xEDnicas digitales y pacientes",
    "Organiz\xE1 las fichas de tus pacientes, registr\xE1 consultas y personaliz\xE1 tus formularios cl\xEDnicos con DoctorChart."
  ]
};
var SeoService = class _SeoService {
  document = inject(DOCUMENT);
  router = inject(Router);
  meta = inject(Meta);
  title = inject(Title);
  destroyRef = inject(DestroyRef);
  started = false;
  start() {
    if (this.started)
      return;
    this.started = true;
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), takeUntilDestroyed(this.destroyRef)).subscribe((event) => this.update(event.urlAfterRedirects));
  }
  update(url) {
    const pathname = url.split(/[?#]/)[0].replace(/\/$/, "") || "/";
    const page = PUBLIC_PAGES[pathname];
    this.meta.updateTag({ name: "robots", content: page ? "index, follow" : "noindex, follow" });
    if (!page) {
      for (const property of ["og:title", "og:description", "og:type", "og:site_name", "og:locale", "og:url", "og:image", "og:image:width", "og:image:height", "og:image:alt"]) {
        this.meta.removeTag('property="' + property + '"');
      }
      for (const name of ["twitter:card", "twitter:title", "twitter:description", "twitter:image", "twitter:image:alt"]) {
        this.meta.removeTag('name="' + name + '"');
      }
      this.meta.removeTag('name="description"');
      this.document.head.querySelector('link[rel="canonical"]')?.remove();
      this.document.getElementById("public-page-schema")?.remove();
      return;
    }
    const [title, description] = page;
    const canonicalUrl = new URL(pathname, PUBLIC_SITE_URL).href;
    let canonical = this.document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement("link");
      canonical.rel = "canonical";
      this.document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    const imagePath = "/social/og-default.jpg";
    const imageUrl = new URL(imagePath, PUBLIC_SITE_URL).href;
    let schema = this.document.getElementById("public-page-schema");
    if (!schema) {
      schema = this.document.createElement("script");
      schema.id = "public-page-schema";
      schema.type = "application/ld+json";
      this.document.head.appendChild(schema);
    }
    const applicationName = "DoctorChart";
    schema.textContent = JSON.stringify(__spreadProps(__spreadValues({
      "@id": canonicalUrl + "#webpage"
    }, applicationName ? { about: { "@type": "SoftwareApplication", name: applicationName, applicationCategory: "HealthApplication", operatingSystem: "Web", url: canonicalUrl } } : {}), {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: canonicalUrl,
      name: title,
      description,
      inLanguage: "es-AR",
      isPartOf: { "@type": "WebSite", publisher: { "@type": "Organization", name: "ByCode Software", url: "https://bycode.com.ar/" }, url: PUBLIC_SITE_URL + "/", name: "DoctorChart" }
    }));
    this.title.setTitle(title);
    this.meta.updateTag({ name: "description", content: description });
    for (const [property, content] of Object.entries({
      "og:title": title,
      "og:description": description,
      "og:type": "website",
      "og:url": canonicalUrl,
      "og:image": imageUrl,
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:image:alt": title,
      "og:site_name": "DoctorChart",
      "og:locale": "es_AR"
    }))
      this.meta.updateTag({ property, content });
    for (const [name, content] of Object.entries({
      "twitter:card": "summary_large_image",
      "twitter:image": imageUrl,
      "twitter:image:alt": title,
      "twitter:title": title,
      "twitter:description": description
    }))
      this.meta.updateTag({ name, content });
  }
  static \u0275fac = function SeoService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SeoService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SeoService, factory: _SeoService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SeoService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/core/guards/public-entry.guard.ts
var publicEntryGuard = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.authReady;
  return auth.isLoggedIn() ? router.createUrlTree([auth.isSuperAdmin() ? "/admin/especialidades" : "/dashboard"]) : true;
};

// src/app/app.routes.ts
function lazyGuard(load) {
  return (route, state) => {
    const injector = inject(EnvironmentInjector);
    return load().then((guard) => {
      const result = runInInjectionContext(injector, () => guard(route, state));
      return isObservable(result) ? firstValueFrom(result) : result;
    });
  };
}
var clinicalNavigationGuard = (module) => lazyGuard(() => import("./chunk-K6T5GJZF.js").then((m) => m.clinicalNavigationGuard(module)));
var doctorchartPlanGuard = lazyGuard(() => import("./chunk-KYEY5L54.js").then((m) => m.doctorchartPlanGuard));
var doctorOnboardingGuard = lazyGuard(() => import("./chunk-L4QDNQSV.js").then((m) => m.doctorOnboardingGuard));
var doctorWizardGuard = lazyGuard(() => import("./chunk-L4QDNQSV.js").then((m) => m.doctorWizardGuard));
var preventCompletedOnboardingGuard = lazyGuard(() => import("./chunk-L4QDNQSV.js").then((m) => m.preventCompletedOnboardingGuard));
var superAdminGuard = lazyGuard(() => import("./chunk-XESSPYD6.js").then((m) => m.superAdminGuard));
var routes = [
  __spreadValues({
    path: "admin/especialidades",
    canActivate: [superAdminGuard],
    loadComponent: () => import("./chunk-SQH3HZBD.js").then((m) => m.AdminSpecialtiesComponent)
  }, false ? { \u0275entryName: "src/app/features/admin-specialties/admin-specialties.component.ts" } : {}),
  __spreadValues({
    path: "",
    pathMatch: "full",
    canActivate: [publicEntryGuard],
    loadComponent: () => import("./chunk-TV7TBR5E.js").then((m) => m.LandingComponent)
  }, false ? { \u0275entryName: "src/app/features/landing/landing.component.ts" } : {}),
  __spreadValues({
    path: "login",
    canActivate: [publicEntryGuard],
    loadComponent: () => import("./chunk-LPWCE2JM.js").then((m) => m.LoginPageComponent)
  }, false ? { \u0275entryName: "src/app/features/auth/login-page.component.ts" } : {}),
  __spreadValues({
    path: "dashboard",
    runGuardsAndResolvers: "always",
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    data: { preload: true },
    loadComponent: () => import("./chunk-ZRFEH35Z.js").then((m) => m.DashboardComponent)
  }, false ? { \u0275entryName: "src/app/features/dashboard/dashboard.component.ts" } : {}),
  __spreadValues({
    path: "calendario-vacunacion",
    runGuardsAndResolvers: "always",
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard, clinicalNavigationGuard("VACCINATION")],
    loadComponent: () => import("./chunk-WFU5CXM3.js").then((m) => m.VaccinationCalendarComponent)
  }, false ? { \u0275entryName: "src/app/features/vaccination-calendar/calendario-vacunacion.component.ts" } : {}),
  __spreadValues({
    path: "pacientes",
    runGuardsAndResolvers: "always",
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    data: { preload: true },
    loadComponent: () => import("./chunk-OYI2J3KJ.js").then((m) => m.PatientListComponent)
  }, false ? { \u0275entryName: "src/app/features/patient-list/patient-list.component.ts" } : {}),
  __spreadValues({
    path: "pacientes/nuevo",
    runGuardsAndResolvers: "always",
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () => import("./chunk-6JWK6FZ6.js").then((m) => m.PatientFormPageComponent)
  }, false ? { \u0275entryName: "src/app/features/patient-form/patient-form-page.component.ts" } : {}),
  __spreadValues({
    path: "pacientes/:id/editar",
    runGuardsAndResolvers: "always",
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () => import("./chunk-6JWK6FZ6.js").then((m) => m.PatientFormPageComponent)
  }, false ? { \u0275entryName: "src/app/features/patient-form/patient-form-page.component.ts" } : {}),
  __spreadValues({
    path: "pacientes/:id",
    runGuardsAndResolvers: "always",
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    data: { preload: true },
    loadComponent: () => import("./chunk-AFFHIHY4.js").then((m) => m.PatientRecordComponent)
  }, false ? { \u0275entryName: "src/app/features/patient-record/patient-record.component.ts" } : {}),
  __spreadValues({
    path: "ficha",
    runGuardsAndResolvers: "always",
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    data: { preload: true },
    loadComponent: () => import("./chunk-AFFHIHY4.js").then((m) => m.PatientRecordComponent)
  }, false ? { \u0275entryName: "src/app/features/patient-record/patient-record.component.ts" } : {}),
  __spreadValues({
    path: "ficha/:id/editar",
    runGuardsAndResolvers: "always",
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    loadComponent: () => import("./chunk-6JWK6FZ6.js").then((m) => m.PatientFormPageComponent)
  }, false ? { \u0275entryName: "src/app/features/patient-form/patient-form-page.component.ts" } : {}),
  __spreadValues({
    path: "ficha/:id",
    runGuardsAndResolvers: "always",
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    data: { preload: true },
    loadComponent: () => import("./chunk-AFFHIHY4.js").then((m) => m.PatientRecordComponent)
  }, false ? { \u0275entryName: "src/app/features/patient-record/patient-record.component.ts" } : {}),
  __spreadValues({
    path: "consultas",
    runGuardsAndResolvers: "always",
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard],
    data: { preload: true },
    loadComponent: () => import("./chunk-7ELYJ5DI.js").then((m) => m.ConsultasComponent)
  }, false ? { \u0275entryName: "src/app/features/consultas/consultas.component.ts" } : {}),
  __spreadValues({
    path: "calculadoras",
    runGuardsAndResolvers: "always",
    canActivate: [doctorchartPlanGuard, doctorOnboardingGuard, clinicalNavigationGuard("CALCULATORS")],
    loadComponent: () => import("./chunk-ISOF77F6.js").then((m) => m.MedicalCalculatorsComponent)
  }, false ? { \u0275entryName: "src/app/features/medical-calculators/medical-calculators.component.ts" } : {}),
  __spreadValues({
    path: "onboarding/select-specialty",
    runGuardsAndResolvers: "always",
    canActivate: [doctorchartPlanGuard, preventCompletedOnboardingGuard],
    loadComponent: () => import("./chunk-NLOTJD63.js").then((m) => m.SpecialtySelectionComponent)
  }, false ? { \u0275entryName: "src/app/features/onboarding/specialty-selection/specialty-selection.component.ts" } : {}),
  __spreadValues({
    path: "onboarding/setup",
    runGuardsAndResolvers: "always",
    canActivate: [doctorchartPlanGuard, doctorWizardGuard],
    loadComponent: () => import("./chunk-6HAHA7RP.js").then((m) => m.OnboardingWizardComponent)
  }, false ? { \u0275entryName: "src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.ts" } : {}),
  __spreadValues({
    path: "**",
    loadComponent: () => import("./chunk-DCV5URGJ.js").then((m) => m.NotFoundComponent)
  }, false ? { \u0275entryName: "src/app/pages/not-found/not-found.component.ts" } : {})
];

// node_modules/@angular/platform-browser/fesm2022/animations-async.mjs
/**
 * @license Angular v22.2.2
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */
var ANIMATION_PREFIX = "@";
var AsyncAnimationRendererFactory = class _AsyncAnimationRendererFactory {
  doc;
  delegate;
  zone;
  animationType;
  moduleImpl;
  _rendererFactoryPromise = null;
  scheduler = null;
  injector = inject(Injector);
  loadingSchedulerFn = inject(\u0275ASYNC_ANIMATION_LOADING_SCHEDULER_FN, {
    optional: true
  });
  _engine;
  constructor(doc, delegate, zone, animationType, moduleImpl) {
    this.doc = doc;
    this.delegate = delegate;
    this.zone = zone;
    this.animationType = animationType;
    this.moduleImpl = moduleImpl;
  }
  ngOnDestroy() {
    this._engine?.flush();
  }
  loadImpl() {
    const loadFn = () => this.moduleImpl ?? import("./chunk-VYGZPOLC.js").then((m) => m);
    let moduleImplPromise;
    if (this.loadingSchedulerFn) {
      moduleImplPromise = this.loadingSchedulerFn(loadFn);
    } else {
      moduleImplPromise = loadFn();
    }
    return moduleImplPromise.catch((e) => {
      throw new RuntimeError(5300, (typeof ngDevMode === "undefined" || ngDevMode) && "Async loading for animations package was enabled, but loading failed. Angular falls back to using regular rendering. No animations will be displayed and their styles won't be applied.");
    }).then(({
      \u0275createEngine,
      \u0275AnimationRendererFactory
    }) => {
      this._engine = \u0275createEngine(this.animationType, this.doc);
      const rendererFactory = new \u0275AnimationRendererFactory(this.delegate, this._engine, this.zone);
      this.delegate = rendererFactory;
      return rendererFactory;
    });
  }
  createRenderer(hostElement, rendererType) {
    const renderer = this.delegate.createRenderer(hostElement, rendererType);
    if (renderer.\u0275type === 0) {
      return renderer;
    }
    disableThrowOnSyntheticProps(renderer);
    const dynamicRenderer = new DynamicDelegationRenderer(renderer);
    if (rendererType?.data?.["animation"] && !this._rendererFactoryPromise) {
      this._rendererFactoryPromise = this.loadImpl();
    }
    this._rendererFactoryPromise?.then((animationRendererFactory) => {
      const animationRenderer = animationRendererFactory.createRenderer(hostElement, rendererType);
      dynamicRenderer.use(animationRenderer);
      this.scheduler ??= this.injector.get(ChangeDetectionScheduler, null, {
        optional: true
      });
      this.scheduler?.notify(10);
    }).catch((e) => {
      dynamicRenderer.use(renderer);
    });
    return dynamicRenderer;
  }
  begin() {
    this.delegate.begin?.();
  }
  end() {
    this.delegate.end?.();
  }
  whenRenderingDone() {
    return this.delegate.whenRenderingDone?.() ?? Promise.resolve();
  }
  componentReplaced(componentId) {
    this._engine?.flush();
    this.delegate.componentReplaced?.(componentId);
  }
  static \u0275fac = function AsyncAnimationRendererFactory_Factory(__ngFactoryType__) {
    \u0275\u0275invalidFactory();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _AsyncAnimationRendererFactory,
    factory: _AsyncAnimationRendererFactory.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AsyncAnimationRendererFactory, [{
    type: Injectable
  }], () => [{
    type: Document
  }, {
    type: RendererFactory2
  }, {
    type: NgZone
  }, {
    type: void 0
  }, {
    type: Promise
  }], null);
})();
var DynamicDelegationRenderer = class {
  delegate;
  replay = [];
  \u0275type = 1;
  constructor(delegate) {
    this.delegate = delegate;
  }
  use(impl) {
    this.delegate = impl;
    if (this.replay !== null) {
      for (const fn of this.replay) {
        fn(impl);
      }
      this.replay = null;
    }
  }
  get data() {
    return this.delegate.data;
  }
  destroy() {
    this.replay = null;
    this.delegate.destroy();
  }
  createElement(name, namespace) {
    return this.delegate.createElement(name, namespace);
  }
  createComment(value) {
    return this.delegate.createComment(value);
  }
  createText(value) {
    return this.delegate.createText(value);
  }
  get destroyNode() {
    return this.delegate.destroyNode;
  }
  appendChild(parent, newChild) {
    this.delegate.appendChild(parent, newChild);
  }
  insertBefore(parent, newChild, refChild, isMove) {
    this.delegate.insertBefore(parent, newChild, refChild, isMove);
  }
  removeChild(parent, oldChild, isHostElement, requireSynchronousElementRemoval) {
    this.delegate.removeChild(parent, oldChild, isHostElement, requireSynchronousElementRemoval);
  }
  selectRootElement(selectorOrNode, preserveContent) {
    return this.delegate.selectRootElement(selectorOrNode, preserveContent);
  }
  parentNode(node) {
    return this.delegate.parentNode(node);
  }
  nextSibling(node) {
    return this.delegate.nextSibling(node);
  }
  setAttribute(el, name, value, namespace) {
    this.delegate.setAttribute(el, name, value, namespace);
  }
  removeAttribute(el, name, namespace) {
    this.delegate.removeAttribute(el, name, namespace);
  }
  addClass(el, name) {
    this.delegate.addClass(el, name);
  }
  removeClass(el, name) {
    this.delegate.removeClass(el, name);
  }
  setStyle(el, style, value, flags) {
    this.delegate.setStyle(el, style, value, flags);
  }
  removeStyle(el, style, flags) {
    this.delegate.removeStyle(el, style, flags);
  }
  setProperty(el, name, value) {
    if (this.shouldReplay(name)) {
      this.replay.push((renderer) => renderer.setProperty(el, name, value));
    }
    this.delegate.setProperty(el, name, value);
  }
  setValue(node, value) {
    this.delegate.setValue(node, value);
  }
  listen(target, eventName, callback, options) {
    if (this.shouldReplay(eventName)) {
      this.replay.push((renderer) => renderer.listen(target, eventName, callback, options));
    }
    return this.delegate.listen(target, eventName, callback, options);
  }
  shouldReplay(propOrEventName) {
    return this.replay !== null && propOrEventName.startsWith(ANIMATION_PREFIX);
  }
};
var \u0275ASYNC_ANIMATION_LOADING_SCHEDULER_FN = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "async_animation_loading_scheduler_fn" : "");
function provideAnimationsAsync(type = "animations") {
  performanceMarkFeature("NgAsyncAnimations");
  if (false) {
    type = "noop";
  }
  return makeEnvironmentProviders([{
    provide: RendererFactory2,
    useFactory: () => {
      return new AsyncAnimationRendererFactory(inject(DOCUMENT), inject(DomRendererFactory2), inject(NgZone), type);
    }
  }, {
    provide: ANIMATION_MODULE_TYPE,
    useValue: type === "noop" ? "NoopAnimations" : "BrowserAnimations"
  }]);
}

// src/app/core/interceptors/auth.interceptor.ts
var authInterceptor = (req, next) => {
  const base = environment.apiUrl.replace(/\/$/, "");
  const isClinicalApi = req.url === base || req.url.startsWith(`${base}/`) || req.url.startsWith(`${base}?`);
  if (!isClinicalApi && req.url !== environment.aiGatewayUrl) {
    return next(req);
  }
  const token = inject(AuthService).getAccessToken();
  let headers = req.headers;
  for (const name of ["Authorization", "X-Dev-Bypass", "X-Gateway-Secret", "X-Internal-Secret", "X-User-Id", "X-User-Role", "X-User-Plan", "X-User-Plan-Expires-At"]) {
    headers = headers.delete(name);
  }
  if (token) headers = headers.set("Authorization", `Bearer ${token}`);
  return next(req.clone({ headers, transferCache: false }));
};

// src/app/core/strategies/selective-preloading.strategy.ts
var SelectivePreloadingStrategy = class _SelectivePreloadingStrategy {
  auth = inject(AuthService);
  preload(route, load) {
    if (route.data?.["preload"] && this.auth.isLoggedIn() && !this.auth.isSuperAdmin() && this.auth.hasDoctorchartPlan()) {
      return load();
    } else {
      return of(null);
    }
  }
  static \u0275fac = function SelectivePreloadingStrategy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SelectivePreloadingStrategy)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SelectivePreloadingStrategy, factory: _SelectivePreloadingStrategy.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectivePreloadingStrategy, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAppInitializer(() => inject(SeoService).start()),
    provideRouter(routes, withPreloading(SelectivePreloadingStrategy)),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, timeZoneInterceptor])),
    provideIcons({
      lucideLayoutDashboard,
      lucideUsers,
      lucideCalculator,
      lucideCalendarDays,
      lucideSliders,
      lucideSlidersHorizontal,
      lucideChevronLeft,
      lucideChevronRight,
      lucideSearch,
      lucideUser,
      lucideLogOut,
      lucideExternalLink,
      lucideX,
      lucideType
    })
  ]
};

// src/app/components/scroll-to-top/scroll-to-top.component.ts
function ScrollToTopComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 1);
    \u0275\u0275domListener("click", function ScrollToTopComponent_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.scrollToTop());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(1, "svg", 2);
    \u0275\u0275domElement(2, "path", 3);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("top", ctx_r1.top(), "px");
  }
}
var ScrollToTopComponent = class _ScrollToTopComponent {
  visible = signal(
    false,
    ...ngDevMode ? [{ debugName: "visible" }] : (
      /* istanbul ignore next */
      []
    )
  );
  top = signal(
    80,
    ...ngDevMode ? [{ debugName: "top" }] : (
      /* istanbul ignore next */
      []
    )
  );
  destroyRef = inject(DestroyRef);
  constructor() {
    afterNextRender(() => {
      const update = () => {
        this.visible.set(window.scrollY > 240);
        const header = document.querySelector("app-header header, app-navbar header");
        this.top.set(Math.max(16, (header?.getBoundingClientRect().bottom ?? 64) + 16));
      };
      update();
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      this.destroyRef.onDestroy(() => {
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
      });
    });
  }
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
    });
  }
  static \u0275fac = function ScrollToTopComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollToTopComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ScrollToTopComponent, selectors: [["app-scroll-to-top"]], decls: 1, vars: 1, consts: [["type", "button", "aria-label", "Volver al inicio de la p\xE1gina", "title", "Volver al inicio", 1, "scroll-to-top", 3, "top"], ["type", "button", "aria-label", "Volver al inicio de la p\xE1gina", "title", "Volver al inicio", 1, "scroll-to-top", 3, "click"], ["width", "22", "height", "22", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", "aria-hidden", "true"], ["d", "m5 12 7-7 7 7M12 5v14"]], template: function ScrollToTopComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, ScrollToTopComponent_Conditional_0_Template, 3, 2, "button", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.visible() ? 0 : -1);
    }
  }, styles: ["\n.scroll-to-top[_ngcontent-%COMP%] {\n  position: fixed;\n  right: max(1rem, env(safe-area-inset-right));\n  z-index: 40;\n  display: grid;\n  place-items: center;\n  width: 44px;\n  height: 44px;\n  padding: 0;\n  border: 1px solid var(--%NS%dc-outline, #e2e8f0);\n  border-radius: 16px;\n  background: var(--%NS%dc-surface, #fff);\n  color: var(--%NS%md-sys-color-primary, #006874);\n  box-shadow: 0 4px 14px rgb(0 0 0 / 12%);\n  cursor: pointer;\n  transition: transform 150ms ease, box-shadow 150ms ease;\n}\n.scroll-to-top[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 18px rgb(0 0 0 / 18%);\n}\n.scroll-to-top[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--%NS%md-sys-color-primary, #006874);\n  outline-offset: 3px;\n}\n@media (min-width: 640px) {\n  .scroll-to-top[_ngcontent-%COMP%] {\n    right: max(2rem, env(safe-area-inset-right));\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .scroll-to-top[_ngcontent-%COMP%] {\n    transition: none;\n  }\n  .scroll-to-top[_ngcontent-%COMP%]:hover {\n    transform: none;\n  }\n}\n@media print {\n  .scroll-to-top[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=scroll-to-top.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollToTopComponent, [{
    type: Component,
    args: [{ selector: "app-scroll-to-top", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    @if (visible()) {
      <button type="button" class="scroll-to-top" [style.top.px]="top()"
        aria-label="Volver al inicio de la p\xE1gina" title="Volver al inicio"
        (click)="scrollToTop()">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" aria-hidden="true">
          <path d="m5 12 7-7 7 7M12 5v14" />
        </svg>
      </button>
    }
  `, styles: ["/* angular:styles/component:css;0cb6993eac7ad053;C:\\Users\\gcast\\Documents\\GitHub\\doctorchart-frontend\\src\\app\\components\\scroll-to-top\\scroll-to-top.component.ts */\n.scroll-to-top {\n  position: fixed;\n  right: max(1rem, env(safe-area-inset-right));\n  z-index: 40;\n  display: grid;\n  place-items: center;\n  width: 44px;\n  height: 44px;\n  padding: 0;\n  border: 1px solid var(--dc-outline, #e2e8f0);\n  border-radius: 16px;\n  background: var(--dc-surface, #fff);\n  color: var(--md-sys-color-primary, #006874);\n  box-shadow: 0 4px 14px rgb(0 0 0 / 12%);\n  cursor: pointer;\n  transition: transform 150ms ease, box-shadow 150ms ease;\n}\n.scroll-to-top:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 18px rgb(0 0 0 / 18%);\n}\n.scroll-to-top:focus-visible {\n  outline: 2px solid var(--md-sys-color-primary, #006874);\n  outline-offset: 3px;\n}\n@media (min-width: 640px) {\n  .scroll-to-top {\n    right: max(2rem, env(safe-area-inset-right));\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .scroll-to-top {\n    transition: none;\n  }\n  .scroll-to-top:hover {\n    transform: none;\n  }\n}\n@media print {\n  .scroll-to-top {\n    display: none;\n  }\n}\n/*# sourceMappingURL=scroll-to-top.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ScrollToTopComponent, { className: "ScrollToTopComponent", filePath: "src/app/components/scroll-to-top/scroll-to-top.component.ts", lineNumber: 56 });
})();

// src/app/app.ts
var App_For_1_Conditional_1_Defer_3_DepsFn = () => [
  /* @ts-ignore */
  import("./chunk-4DVKC25R.js").then((m) => m.PrivateShellComponent)
];
function App_For_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "router-outlet");
  }
}
function App_For_1_Conditional_1_Defer_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-private-shell");
  }
}
function App_For_1_Conditional_1_DeferPlaceholder_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "p");
    \u0275\u0275text(2, "Cargando DoctorChart\u2026");
    \u0275\u0275elementEnd()();
  }
}
function App_For_1_Conditional_1_DeferError_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "p");
    \u0275\u0275text(2, "No pudimos cargar DoctorChart. Recarg\xE1 la p\xE1gina para reintentar.");
    \u0275\u0275elementEnd()();
  }
}
function App_For_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domTemplate(0, App_For_1_Conditional_1_Defer_0_Template, 1, 0)(1, App_For_1_Conditional_1_DeferPlaceholder_1_Template, 3, 0)(2, App_For_1_Conditional_1_DeferError_2_Template, 3, 0);
    \u0275\u0275defer(3, 0, App_For_1_Conditional_1_Defer_3_DepsFn, null, 1, 2);
    \u0275\u0275deferOnImmediate();
  }
}
function App_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, App_For_1_Conditional_0_Template, 1, 0, "router-outlet")(1, App_For_1_Conditional_1_Template, 5, 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.isPublicPage() && !ctx_r0.authService.isLoggedIn() ? 0 : 1);
  }
}
var App = class _App {
  theme = inject(ThemeService);
  authService = inject(AuthService);
  router = inject(Router);
  injector = inject(EnvironmentInjector);
  pendingTasks = inject(PendingTasks);
  destroyRef = inject(DestroyRef);
  entryPath = typeof window === "undefined" ? "/" : window.location.pathname;
  coordinatorLoading = false;
  sessionKeys = computed(
    () => [JSON.stringify([this.authService.currentUser()?.id ?? null, this.authService.isSuperAdmin()])],
    ...ngDevMode ? [{ debugName: "sessionKeys" }] : (
      /* istanbul ignore next */
      []
    )
  );
  pageUrl = toSignal(this.router.events.pipe(filter((event) => event instanceof NavigationEnd), map((event) => event.urlAfterRedirects)), { initialValue: this.entryPath });
  isPublicPage = computed(
    () => ["/", "/login", "/404"].includes(this.pageUrl().split(/[?#]/)[0]) || this.router.routerState.snapshot.root.firstChild?.routeConfig?.path === "**",
    ...ngDevMode ? [{ debugName: "isPublicPage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      if (!this.authService.currentUser() || this.coordinatorLoading)
        return;
      this.coordinatorLoading = true;
      untracked(() => this.pendingTasks.run(async () => {
        try {
          const { SessionCoordinatorService } = await import("./chunk-LSC7HPNU.js");
          if (!this.destroyRef.destroyed)
            this.injector.get(SessionCoordinatorService).setEntryPath(this.entryPath);
        } catch {
          this.coordinatorLoading = false;
        }
      }));
    });
  }
  static \u0275fac = function App_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _App)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _App, selectors: [["app-root"]], decls: 3, vars: 0, consts: [["role", "status", 1, "app-splash-screen"], ["role", "alert", 1, "app-splash-screen"]], template: function App_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275repeaterCreate(0, App_For_1_Template, 2, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275element(2, "app-scroll-to-top");
    }
    if (rf & 2) {
      \u0275\u0275repeater(ctx.sessionKeys());
    }
  }, dependencies: [RouterOutlet, ScrollToTopComponent], styles: ["\n.app-layout-shell[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  min-height: 100vh;\n  width: 100%;\n  background-color: var(--%NS%dc-surface-low, #f8fafc);\n  align-items: stretch;\n}\n.app-main-viewport[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  min-height: 100vh;\n  overflow-x: hidden;\n}\n.app-main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  padding: 1.5rem;\n  width: 100%;\n  max-width: 1600px;\n  margin: 0 auto;\n  box-sizing: border-box;\n}\n@media (max-width: 768px) {\n  .app-main-content[_ngcontent-%COMP%] {\n    padding: 1rem 0.75rem;\n  }\n}\n.app-splash-screen[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      var(--%NS%dc-surface-low, #f0f7f8) 0%,\n      var(--%NS%dc-surface-low, #eaf4f5) 100%);\n}\n.splash-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n}\n.splash-logo[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  border-radius: 18px;\n  background: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.splash-title[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  font-weight: 800;\n  color: var(--%NS%md-sys-color-on-surface, #191c1d);\n  margin: 0;\n  letter-spacing: -0.02em;\n}\n.splash-spinner[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border: 3px solid rgba(0, 104, 116, 0.2);\n  border-top-color: var(--%NS%md-sys-color-primary, #006874);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n.splash-text[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  color: var(--%NS%md-sys-color-secondary, #4a6267);\n  margin: 0;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media print {\n  .app-layout-shell[_ngcontent-%COMP%], \n   .app-splash-screen[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n}\n/*# sourceMappingURL=app.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadataAsync(App, () => [
    /* @ts-ignore */
    import("./chunk-4DVKC25R.js").then((m) => m.PrivateShellComponent)
  ], (PrivateShellComponent) => {
    setClassMetadata(App, [{
      type: Component,
      args: [{ selector: "app-root", imports: [RouterOutlet, ScrollToTopComponent, PrivateShellComponent], template: '@for (sessionKey of sessionKeys(); track sessionKey) {\n  @if (isPublicPage() && !authService.isLoggedIn()) {\n    <router-outlet />\n  } @else {\n    @defer (on immediate) {\n      <app-private-shell />\n    } @placeholder {\n      <div class="app-splash-screen" role="status"><p>Cargando DoctorChart\u2026</p></div>\n    } @error {\n      <div class="app-splash-screen" role="alert"><p>No pudimos cargar DoctorChart. Recarg\xE1 la p\xE1gina para reintentar.</p></div>\n    }\n  }\n}\n<app-scroll-to-top />\n', styles: ["/* src/app/app.css */\n.app-layout-shell {\n  display: flex;\n  flex: 1;\n  min-height: 100vh;\n  width: 100%;\n  background-color: var(--dc-surface-low, #f8fafc);\n  align-items: stretch;\n}\n.app-main-viewport {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  min-height: 100vh;\n  overflow-x: hidden;\n}\n.app-main-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  padding: 1.5rem;\n  width: 100%;\n  max-width: 1600px;\n  margin: 0 auto;\n  box-sizing: border-box;\n}\n@media (max-width: 768px) {\n  .app-main-content {\n    padding: 1rem 0.75rem;\n  }\n}\n.app-splash-screen {\n  min-height: 100vh;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      var(--dc-surface-low, #f0f7f8) 0%,\n      var(--dc-surface-low, #eaf4f5) 100%);\n}\n.splash-content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n}\n.splash-logo {\n  width: 64px;\n  height: 64px;\n  border-radius: 18px;\n  background: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.splash-title {\n  font-size: 1.6rem;\n  font-weight: 800;\n  color: var(--md-sys-color-on-surface, #191c1d);\n  margin: 0;\n  letter-spacing: -0.02em;\n}\n.splash-spinner {\n  width: 24px;\n  height: 24px;\n  border: 3px solid rgba(0, 104, 116, 0.2);\n  border-top-color: var(--md-sys-color-primary, #006874);\n  border-radius: 50%;\n  animation: spin 0.7s linear infinite;\n}\n.splash-text {\n  font-size: 0.88rem;\n  color: var(--md-sys-color-secondary, #4a6267);\n  margin: 0;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media print {\n  .app-layout-shell,\n  .app-splash-screen {\n    display: none !important;\n  }\n}\n/*# sourceMappingURL=app.css.map */\n"] }]
    }], () => [], null);
  });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 11 });
})();

// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
//# debugId=62743a7a-8b39-5f48-bf15-b4ed112e0fd2
//# sourceMappingURL=main.js.map
