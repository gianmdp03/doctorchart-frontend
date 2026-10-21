import {
  isPlatformServer
} from "./chunk-SYX7XZ26.js";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostAttributeToken,
  Inject,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  PLATFORM_ID,
  Renderer2,
  __spreadProps,
  __spreadValues,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  isObservable,
  numberAttribute,
  runInInjectionContext,
  setClassMetadata,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomProperty,
  ɵɵinject,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵstyleProp
} from "./chunk-3HO5VEWU.js";

// node_modules/@ng-icons/core/fesm2022/ng-icons-core.mjs
var NgGlyphConfigToken = new InjectionToken("Ng Glyph Config");
var defaultConfig = {
  size: "1em",
  opticalSize: 20,
  weight: 400,
  grade: 0,
  fill: false
};
function injectNgGlyphsConfig() {
  return inject(NgGlyphConfigToken, { optional: true }) ?? defaultConfig;
}
var NgGlyphsToken = new InjectionToken("NgGlyphsToken");
function injectNgGlyphs() {
  const glyphs = inject(NgGlyphsToken, { optional: true });
  if (!glyphs) {
    throw new Error("Please provide the glyphs using the provideNgGlyphs() function.");
  }
  return glyphs;
}
function coerceCssPixelValue(value) {
  return value == null ? "" : /^\d+$/.test(value) ? `${value}px` : value;
}
var NgGlyph = class _NgGlyph {
  constructor() {
    this.glyphsets = injectNgGlyphs();
    this.config = injectNgGlyphsConfig();
    this.name = input.required(
      ...ngDevMode ? [{ debugName: "name" }] : (
        /* istanbul ignore next */
        []
      )
    );
    this.glyphset = input(
      this.glyphsets.defaultGlyphset,
      ...ngDevMode ? [{ debugName: "glyphset" }] : (
        /* istanbul ignore next */
        []
      )
    );
    this.opticalSize = input(this.config.opticalSize, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "opticalSize" } : (
      /* istanbul ignore next */
      {}
    )), { transform: numberAttribute }));
    this.weight = input(this.config.weight, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "weight" } : (
      /* istanbul ignore next */
      {}
    )), { transform: numberAttribute }));
    this.grade = input(this.config.grade, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "grade" } : (
      /* istanbul ignore next */
      {}
    )), { transform: numberAttribute }));
    this.fill = input(this.config.fill, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "fill" } : (
      /* istanbul ignore next */
      {}
    )), { transform: booleanAttribute }));
    this.size = input(this.config.size, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "size" } : (
      /* istanbul ignore next */
      {}
    )), { transform: coerceCssPixelValue }));
    this.color = input(
      this.config.color,
      ...ngDevMode ? [{ debugName: "color" }] : (
        /* istanbul ignore next */
        []
      )
    );
    this.glyphsetClass = computed(
      () => {
        const glyphset = this.glyphsets.glyphsets.find((glyphset2) => glyphset2.name === this.glyphset());
        if (!glyphset) {
          throw new Error(`The glyphset "${this.glyphset()}" does not exist. Please provide a valid glyphset.`);
        }
        return glyphset.baseClass;
      },
      ...ngDevMode ? [{ debugName: "glyphsetClass" }] : (
        /* istanbul ignore next */
        []
      )
    );
    this.fontVariationSettings = computed(
      () => {
        return `'FILL' ${this.fill() ? 1 : 0}, 'wght' ${this.weight()}, 'GRAD' ${this.grade()}, 'opsz' ${this.opticalSize()}`;
      },
      ...ngDevMode ? [{ debugName: "fontVariationSettings" }] : (
        /* istanbul ignore next */
        []
      )
    );
  }
  static {
    this.\u0275fac = function NgGlyph_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgGlyph)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _NgGlyph,
      selectors: [["ng-glyph"]],
      hostVars: 9,
      hostBindings: function NgGlyph_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275domProperty("textContent", ctx.name());
          \u0275\u0275classMap(ctx.glyphsetClass());
          \u0275\u0275styleProp("--%NS%ng-glyph__size", ctx.size())("color", ctx.color())("font-variation-settings", ctx.fontVariationSettings());
        }
      },
      inputs: {
        name: [1, "name"],
        glyphset: [1, "glyphset"],
        opticalSize: [1, "opticalSize"],
        weight: [1, "weight"],
        grade: [1, "grade"],
        fill: [1, "fill"],
        size: [1, "size"],
        color: [1, "color"]
      },
      decls: 0,
      vars: 0,
      template: function NgGlyph_Template(rf, ctx) {
      },
      styles: ["[_nghost-%COMP%]{display:inline-block;width:var(--%NS%ng-glyph__size);height:var(--%NS%ng-glyph__size);font-size:var(--%NS%ng-glyph__size);overflow:hidden}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgGlyph, [{
    type: Component,
    args: [{ selector: "ng-glyph", standalone: true, template: ``, changeDetection: ChangeDetectionStrategy.OnPush, host: {
      "[class]": "glyphsetClass()",
      "[textContent]": "name()",
      "[style.--ng-glyph__size]": "size()",
      "[style.color]": "color()",
      "[style.font-variation-settings]": "fontVariationSettings()"
    }, styles: [":host{display:inline-block;width:var(--ng-glyph__size);height:var(--ng-glyph__size);font-size:var(--ng-glyph__size);overflow:hidden}\n"] }]
  }], null, { name: [{ type: Input, args: [{ isSignal: true, alias: "name", required: true }] }], glyphset: [{ type: Input, args: [{ isSignal: true, alias: "glyphset", required: false }] }], opticalSize: [{ type: Input, args: [{ isSignal: true, alias: "opticalSize", required: false }] }], weight: [{ type: Input, args: [{ isSignal: true, alias: "weight", required: false }] }], grade: [{ type: Input, args: [{ isSignal: true, alias: "grade", required: false }] }], fill: [{ type: Input, args: [{ isSignal: true, alias: "fill", required: false }] }], size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }], color: [{ type: Input, args: [{ isSignal: true, alias: "color", required: false }] }] });
})();
var NgIconPreProcessorToken = new InjectionToken("Ng Icon Pre Processor");
var NgIconPostProcessorToken = new InjectionToken("Ng Icon Post Processor");
function injectNgIconPreProcessor() {
  return inject(NgIconPreProcessorToken, { optional: true }) ?? ((icon) => icon);
}
function injectNgIconPostProcessor() {
  return inject(NgIconPostProcessorToken, { optional: true }) ?? (() => {
  });
}
var LoggerToken = new InjectionToken("Ng Icon Logger");
var DefaultLogger = class {
  log(message) {
    console.log(message);
  }
  warn(message) {
    console.warn(message);
  }
  error(message) {
    console.error(message);
  }
};
function injectLogger() {
  return inject(LoggerToken, { optional: true }) ?? new DefaultLogger();
}
var NgIconConfigToken = new InjectionToken("Ng Icon Config");
function injectNgIconConfig() {
  return inject(NgIconConfigToken, { optional: true }) ?? {};
}
var NgIconLoaderToken = new InjectionToken("Ng Icon Loader Token");
var NgIconCacheToken = new InjectionToken("Ng Icon Cache Token");
function injectNgIconLoader() {
  return inject(NgIconLoaderToken, { optional: true });
}
function injectNgIconLoaderCache() {
  return inject(NgIconCacheToken, { optional: true });
}
function provideIcons(icons) {
  return [
    {
      provide: NgIconsToken,
      useFactory: (parentIcons = inject(NgIconsToken, {
        optional: true,
        skipSelf: true
      })) => __spreadValues(__spreadValues({}, parentIcons?.reduce((acc, icons2) => __spreadValues(__spreadValues({}, acc), icons2), {})), icons),
      multi: true
    }
  ];
}
var NgIconsToken = new InjectionToken("Icons Token");
function injectNgIcons() {
  return inject(NgIconsToken, { optional: true }) ?? [];
}
function coerceLoaderResult(result) {
  if (typeof result === "string") {
    return Promise.resolve(result);
  }
  if (isObservable(result)) {
    return result.toPromise();
  }
  return result;
}
function toPropertyName(str) {
  return str.replace(/([^a-zA-Z0-9])+(.)?/g, (_, __, chr) => chr ? chr.toUpperCase() : "").replace(/[^a-zA-Z\d]/g, "").replace(/^([A-Z])/, (m) => m.toLowerCase());
}
var policy;
function trustedHTMLFromString(html) {
  if (policy === void 0) {
    const { trustedTypes } = globalThis;
    try {
      policy = trustedTypes?.createPolicy("ng-icons", { createHTML: (s) => s }) ?? null;
    } catch {
      policy = null;
    }
  }
  return policy?.createHTML(html) ?? html;
}
var uniqueId = 0;
var NgIcon = class _NgIcon {
  constructor() {
    this.config = injectNgIconConfig();
    this.icons = injectNgIcons();
    this.loader = injectNgIconLoader();
    this.cache = injectNgIconLoaderCache();
    this.preProcessor = injectNgIconPreProcessor();
    this.postProcessor = injectNgIconPostProcessor();
    this.injector = inject(Injector);
    this.renderer = inject(Renderer2);
    this.platform = inject(PLATFORM_ID);
    this.elementRef = inject(ElementRef);
    this.uniqueId = uniqueId++;
    this.logger = injectLogger();
    this.name = input(
      ...ngDevMode ? [void 0, { debugName: "name" }] : (
        /* istanbul ignore next */
        []
      )
    );
    this.svg = input(
      ...ngDevMode ? [void 0, { debugName: "svg" }] : (
        /* istanbul ignore next */
        []
      )
    );
    this.size = input(this.config.size, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "size" } : (
      /* istanbul ignore next */
      {}
    )), { transform: coerceCssPixelValue }));
    this.strokeWidth = input(
      this.config.strokeWidth,
      ...ngDevMode ? [{ debugName: "strokeWidth" }] : (
        /* istanbul ignore next */
        []
      )
    );
    this.color = input(
      this.config.color,
      ...ngDevMode ? [{ debugName: "color" }] : (
        /* istanbul ignore next */
        []
      )
    );
    effect(() => this.updateIcon());
    const ariaHidden = inject(new HostAttributeToken("aria-hidden"), {
      optional: true
    });
    if (!ariaHidden) {
      this.elementRef.nativeElement.setAttribute("aria-hidden", "true");
    }
  }
  ngOnDestroy() {
    this.svgElement = void 0;
  }
  async updateIcon() {
    const name = this.name();
    const svg = this.svg();
    if (svg !== void 0) {
      this.setSvg(svg);
      return;
    }
    if (name === void 0) {
      return;
    }
    const propertyName = toPropertyName(name);
    for (const icons of [...this.icons].reverse()) {
      if (icons[propertyName]) {
        this.setSvg(icons[propertyName]);
        return;
      }
    }
    if (this.loader) {
      const result = await this.requestIconFromLoader(name);
      if (result !== null) {
        this.setSvg(result);
        return;
      }
    }
    this.logger.warn(`No icon named ${name} was found. You may need to import it using the withIcons function.`);
  }
  setSvg(svg) {
    if (isPlatformServer(this.platform)) {
      this.elementRef.nativeElement.innerHTML = svg;
      this.elementRef.nativeElement.setAttribute("data-ng-icon-ssr", "");
      return;
    }
    if (this.elementRef.nativeElement.hasAttribute("data-ng-icon-ssr")) {
      this.elementRef.nativeElement.removeAttribute("data-ng-icon-ssr");
      this.svgElement = this.elementRef.nativeElement.querySelector("svg") ?? void 0;
      if (this.elementRef.nativeElement.innerHTML === svg) {
        return;
      }
    }
    if (this.svgElement) {
      this.renderer.removeChild(this.elementRef.nativeElement, this.svgElement);
    }
    if (svg === "") {
      return;
    }
    const template = this.renderer.createElement("template");
    svg = this.replaceIds(svg);
    this.renderer.setProperty(template, "innerHTML", trustedHTMLFromString(this.preProcessor(svg)));
    this.svgElement = template.content.firstElementChild;
    this.postProcessor(this.svgElement);
    this.renderer.appendChild(this.elementRef.nativeElement, this.svgElement);
  }
  replaceIds(svg) {
    if (!svg.includes("ID_PLACEHOLDER_")) {
      return svg;
    }
    const regex = /ID_PLACEHOLDER_(\d+)/g;
    const idMap = /* @__PURE__ */ new Map();
    const matches = new Set(svg.match(regex));
    if (matches === null) {
      return svg;
    }
    for (const match of matches) {
      const id = match.replace("ID_PLACEHOLDER_", "");
      const placeholder = `ng-icon-${this.uniqueId}-${idMap.size}`;
      idMap.set(id, placeholder);
      svg = svg.replace(new RegExp(match, "g"), placeholder);
    }
    return svg;
  }
  /**
   * Request the icon from the loader.
   * @param name The name of the icon to load.
   * @returns The SVG content for a given icon name.
   */
  requestIconFromLoader(name) {
    return new Promise((resolve) => {
      runInInjectionContext(this.injector, async () => {
        if (this.cache) {
          const cachedResult = this.cache.get(name);
          if (typeof cachedResult === "string") {
            resolve(cachedResult);
            return;
          }
          if (cachedResult instanceof Promise) {
            const result2 = await cachedResult;
            resolve(result2);
            return;
          }
        }
        const promise = coerceLoaderResult(this.loader(name));
        this.cache?.set(name, promise);
        const result = await promise;
        this.cache?.set(name, result);
        resolve(result);
      });
    });
  }
  static {
    this.\u0275fac = function NgIcon_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgIcon)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _NgIcon,
      selectors: [["ng-icon"]],
      hostAttrs: ["role", "img"],
      hostVars: 6,
      hostBindings: function NgIcon_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275styleProp("--%NS%ng-icon__stroke-width", ctx.strokeWidth())("--%NS%ng-icon__size", ctx.size())("--%NS%ng-icon__color", ctx.color());
        }
      },
      inputs: {
        name: [1, "name"],
        svg: [1, "svg"],
        size: [1, "size"],
        strokeWidth: [1, "strokeWidth"],
        color: [1, "color"]
      },
      decls: 0,
      vars: 0,
      template: function NgIcon_Template(rf, ctx) {
      },
      styles: ["[_nghost-%COMP%]{display:inline-block;width:var(--%NS%ng-icon__size, 1em);height:var(--%NS%ng-icon__size, 1em);line-height:initial;vertical-align:initial;overflow:hidden}[_nghost-%COMP%]     svg{width:inherit;height:inherit;vertical-align:inherit}@layer ng-icon{[_nghost-%COMP%]{color:var(--%NS%ng-icon__color, currentColor)}}"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgIcon, [{
    type: Component,
    args: [{ selector: "ng-icon", template: "", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: {
      role: "img",
      "[style.--ng-icon__stroke-width]": "strokeWidth()",
      "[style.--ng-icon__size]": "size()",
      "[style.--ng-icon__color]": "color()"
    }, styles: [":host{display:inline-block;width:var(--ng-icon__size, 1em);height:var(--ng-icon__size, 1em);line-height:initial;vertical-align:initial;overflow:hidden}:host ::ng-deep svg{width:inherit;height:inherit;vertical-align:inherit}@layer ng-icon{:host{color:var(--ng-icon__color, currentColor)}}\n"] }]
  }], () => [], { name: [{ type: Input, args: [{ isSignal: true, alias: "name", required: false }] }], svg: [{ type: Input, args: [{ isSignal: true, alias: "svg", required: false }] }], size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }], strokeWidth: [{ type: Input, args: [{ isSignal: true, alias: "strokeWidth", required: false }] }], color: [{ type: Input, args: [{ isSignal: true, alias: "color", required: false }] }] });
})();
var NgIconsModule = class _NgIconsModule {
  constructor(icons) {
    if (Object.keys(icons).length === 0) {
      throw new Error("No icons have been provided. Ensure to include some icons by importing them using NgIconsModule.withIcons({ ... }).");
    }
  }
  /**
   * Define the icons that will be included in the application. This allows unused icons to
   * be tree-shaken away to reduce bundle size
   * @param icons The object containing the required icons
   */
  static withIcons(icons) {
    return { ngModule: _NgIconsModule, providers: provideIcons(icons) };
  }
  static {
    this.\u0275fac = function NgIconsModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgIconsModule)(\u0275\u0275inject(NgIconsToken));
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _NgIconsModule,
      imports: [NgIcon],
      exports: [NgIcon]
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgIconsModule, [{
    type: NgModule,
    args: [{
      imports: [NgIcon],
      exports: [NgIcon]
    }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [NgIconsToken]
  }] }], null);
})();
var NgIconStack = class _NgIconStack {
  constructor() {
    this.size = input.required(
      ...ngDevMode ? [{ debugName: "size" }] : (
        /* istanbul ignore next */
        []
      )
    );
  }
  static {
    this.\u0275fac = function NgIconStack_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgIconStack)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ (function() {
      const _c0 = ["*"];
      return /* @__PURE__ */ \u0275\u0275defineComponent({
        type: _NgIconStack,
        selectors: [["ng-icon-stack"]],
        hostVars: 2,
        hostBindings: function NgIconStack_HostBindings(rf, ctx) {
          if (rf & 2) {
            \u0275\u0275styleProp("--%NS%ng-icon__size", ctx.size());
          }
        },
        inputs: {
          size: [1, "size"]
        },
        ngContentSelectors: _c0,
        decls: 1,
        vars: 0,
        template: function NgIconStack_Template(rf, ctx) {
          if (rf & 1) {
            \u0275\u0275projectionDef();
            \u0275\u0275projection(0);
          }
        },
        styles: ["[_nghost-%COMP%]{display:inline-flex;justify-content:center;align-items:center;position:relative;width:var(--%NS%ng-icon__size);height:var(--%NS%ng-icon__size)}[_nghost-%COMP%]     ng-icon{position:absolute}"]
      });
    })();
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgIconStack, [{
    type: Component,
    args: [{ selector: "ng-icon-stack", standalone: true, template: "<ng-content />", changeDetection: ChangeDetectionStrategy.OnPush, host: {
      "[style.--ng-icon__size]": "size()"
    }, styles: [":host{display:inline-flex;justify-content:center;align-items:center;position:relative;width:var(--ng-icon__size);height:var(--ng-icon__size)}:host ::ng-deep ng-icon{position:absolute}\n"] }]
  }], null, { size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: true }] }] });
})();

// node_modules/@ng-icons/lucide/fesm2022/ng-icons-lucide.mjs
var lucideActivity = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path></svg>`;
var lucideAlertCircle = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>`;
var lucideAlertTriangle = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>`;
var lucideArrowRight = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>`;
var lucideBaby = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"></path><path d="M15 12h.01"></path><path d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"></path><path d="M9 12h.01"></path></svg>`;
var lucideBot = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>`;
var lucideCalculator = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><rect width="16" height="20" x="4" y="2" rx="2"></rect><line x1="8" x2="16" y1="6" y2="6"></line><line x1="16" x2="16" y1="14" y2="18"></line><path d="M16 10h.01"></path><path d="M12 10h.01"></path><path d="M8 10h.01"></path><path d="M12 14h.01"></path><path d="M8 14h.01"></path><path d="M12 18h.01"></path><path d="M8 18h.01"></path></svg>`;
var lucideCalendarDays = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>`;
var lucideCalendar = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>`;
var lucideCheckCircle2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>`;
var lucideCheck = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M20 6 9 17l-5-5"></path></svg>`;
var lucideChevronDown = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="m6 9 6 6 6-6"></path></svg>`;
var lucideChevronLeft = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="m15 18-6-6 6-6"></path></svg>`;
var lucideChevronRight = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="m9 18 6-6-6-6"></path></svg>`;
var lucideChevronUp = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="m18 15-6-6-6 6"></path></svg>`;
var lucideClipboardList = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>`;
var lucideClock = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>`;
var lucideCopy = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>`;
var lucideCreditCard = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>`;
var lucideDownload = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M12 15V3"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m7 10 5 5 5-5"></path></svg>`;
var lucideDroplets = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path></svg>`;
var lucideExternalLink = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>`;
var lucideEye = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
var lucideFileText = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path><path d="M14 2v5a1 1 0 0 0 1 1h5"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>`;
var lucideFile = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path><path d="M14 2v5a1 1 0 0 0 1 1h5"></path></svg>`;
var lucideFilter = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"></path></svg>`;
var lucideFlaskConical = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"></path><path d="M6.453 15h11.094"></path><path d="M8.5 2h7"></path></svg>`;
var lucideFolderOpen = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"></path></svg>`;
var lucideHeart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path></svg>`;
var lucideHistory = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M12 7v5l4 2"></path></svg>`;
var lucideImage = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>`;
var lucideInfo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>`;
var lucideLayoutDashboard = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>`;
var lucideLoader2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>`;
var lucideLogOut = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path></svg>`;
var lucideMoon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path></svg>`;
var lucidePill = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path><path d="m8.5 8.5 7 7"></path></svg>`;
var lucidePlus = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>`;
var lucidePrinter = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"></path><rect x="6" y="14" width="12" height="8" rx="1"></rect></svg>`;
var lucideRefreshCw = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M8 16H3v5"></path></svg>`;
var lucideRotateCcw = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>`;
var lucideSave = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path><path d="M7 3v4a1 1 0 0 0 1 1h7"></path></svg>`;
var lucideSearch = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>`;
var lucideSend = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path><path d="m21.854 2.147-10.94 10.939"></path></svg>`;
var lucideSettings = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
var lucideShieldAlert = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>`;
var lucideShield = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>`;
var lucideSlidersHorizontal = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M10 5H3"></path><path d="M12 19H3"></path><path d="M14 3v4"></path><path d="M16 17v4"></path><path d="M21 12h-9"></path><path d="M21 19h-5"></path><path d="M21 5h-7"></path><path d="M8 10v4"></path><path d="M8 12H3"></path></svg>`;
var lucideSliders = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M10 8h4"></path><path d="M12 21v-9"></path><path d="M12 8V3"></path><path d="M17 16h4"></path><path d="M19 12V3"></path><path d="M19 21v-5"></path><path d="M3 14h4"></path><path d="M5 10V3"></path><path d="M5 21v-7"></path></svg>`;
var lucideSparkles = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>`;
var lucideStethoscope = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M11 2v2"></path><path d="M5 2v2"></path><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"></path><path d="M8 15a6 6 0 0 0 12 0v-3"></path><circle cx="20" cy="10" r="2"></circle></svg>`;
var lucideSun = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`;
var lucideTrash2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
var lucideType = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M12 4v16"></path><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"></path><path d="M9 20h6"></path></svg>`;
var lucideUpload = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M12 3v12"></path><path d="m17 8-5-5-5 5"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path></svg>`;
var lucideUserCheck = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="m16 11 2 2 4-4"></path><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>`;
var lucideUserPlus = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>`;
var lucideUser = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
var lucideUsers = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>`;
var lucideWeight = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><circle cx="12" cy="5" r="3"></circle><path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"></path></svg>`;
var lucideX = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="stroke-width:var(--ng-icon__stroke-width, 2)"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`;

export {
  provideIcons,
  NgIcon,
  lucideActivity,
  lucideAlertCircle,
  lucideAlertTriangle,
  lucideArrowRight,
  lucideBaby,
  lucideBot,
  lucideCalculator,
  lucideCalendarDays,
  lucideCalendar,
  lucideCheckCircle2,
  lucideCheck,
  lucideChevronDown,
  lucideChevronLeft,
  lucideChevronRight,
  lucideChevronUp,
  lucideClipboardList,
  lucideClock,
  lucideCopy,
  lucideCreditCard,
  lucideDownload,
  lucideDroplets,
  lucideExternalLink,
  lucideEye,
  lucideFileText,
  lucideFile,
  lucideFilter,
  lucideFlaskConical,
  lucideFolderOpen,
  lucideHeart,
  lucideHistory,
  lucideImage,
  lucideInfo,
  lucideLayoutDashboard,
  lucideLoader2,
  lucideLogOut,
  lucideMoon,
  lucidePill,
  lucidePlus,
  lucidePrinter,
  lucideRefreshCw,
  lucideRotateCcw,
  lucideSave,
  lucideSearch,
  lucideSend,
  lucideSettings,
  lucideShieldAlert,
  lucideShield,
  lucideSlidersHorizontal,
  lucideSliders,
  lucideSparkles,
  lucideStethoscope,
  lucideSun,
  lucideTrash2,
  lucideType,
  lucideUpload,
  lucideUserCheck,
  lucideUserPlus,
  lucideUser,
  lucideUsers,
  lucideWeight,
  lucideX
};
//# debugId=9c4d1122-0409-5fff-9b08-5863b0bc898c
//# sourceMappingURL=chunk-Z3UJ4PSI.js.map
