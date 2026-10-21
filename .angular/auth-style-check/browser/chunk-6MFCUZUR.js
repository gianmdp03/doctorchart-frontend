import {
  BidiModule,
  CdkPortalOutlet,
  CdkScrollableModule,
  ComponentPortal,
  Directionality,
  FlexibleConnectedPositionStrategy,
  OverlayConfig,
  OverlayModule,
  PortalModule,
  ScrollDispatcher,
  TemplatePortal,
  createBlockScrollStrategy,
  createFlexibleConnectedPositionStrategy,
  createGlobalPositionStrategy,
  createOverlayRef,
  createRepositionScrollStrategy
} from "./chunk-WMGV2OO2.js";
import {
  A11yModule,
  AriaDescriber,
  CdkMonitorFocus,
  CdkTrapFocus,
  FocusMonitor,
  MediaMatcher,
  _VisuallyHiddenLoader,
  isFakeMousedownFromScreenReader,
  isFakeTouchstartFromScreenReader,
  normalizePassiveListenerOptions
} from "./chunk-QAJPJLTD.js";
import {
  BACKSPACE,
  DOWN_ARROW,
  END,
  ENTER,
  ESCAPE,
  HOME,
  LEFT_ARROW,
  PAGE_DOWN,
  PAGE_UP,
  Platform,
  RIGHT_ARROW,
  SPACE,
  UP_ARROW,
  _CdkPrivateStyleLoader,
  _IdGenerator,
  _getEventTarget,
  _getFocusedElementPierceShadowDom,
  coerceElement,
  coerceNumberProperty,
  hasModifierKey
} from "./chunk-THOV7R4G.js";
import {
  ControlContainer,
  FormGroupDirective,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgForm,
  Validators,
  elementAcceptsMinMax,
  isNativeFormElement,
  isTextualFormElement,
  selectValueAccessor,
  setNativeDomProperty,
  ɵFORM_CONTROL_INTEGRATION
} from "./chunk-BQIFWLNB.js";
import {
  NgTemplateOutlet
} from "./chunk-SYX7XZ26.js";
import {
  ANIMATION_MODULE_TYPE,
  CSP_NONCE,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DOCUMENT,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostAttributeToken,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  LOCALE_ID,
  NgModule,
  NgZone,
  Observable,
  Output,
  Renderer2,
  RendererFactory2,
  RuntimeError,
  Service,
  Subject,
  Subscription,
  TemplateRef,
  Version,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  __spreadProps,
  __spreadValues,
  afterNextRender,
  afterRenderEffect,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  filter,
  formatRuntimeError,
  forwardRef,
  inject,
  input,
  isSignal,
  linkedSignal,
  map,
  merge,
  numberAttribute,
  of,
  output,
  pairwise,
  setClassMetadata,
  shareReplay,
  signal,
  startWith,
  take,
  takeUntil,
  untracked,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵControlFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵcontentQuerySignal,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefineService,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵdomTemplate,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵinject,
  ɵɵinvalidFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery,
  ɵɵviewQuerySignal
} from "./chunk-3HO5VEWU.js";

// node_modules/@angular/material/fesm2022/_date-formats-chunk.mjs
var MAT_DATE_LOCALE = new InjectionToken("MAT_DATE_LOCALE", {
  providedIn: "root",
  factory: () => inject(LOCALE_ID)
});
var NOT_IMPLEMENTED = "Method not implemented";
var DateAdapter = class {
  locale;
  _localeChanges = new Subject();
  localeChanges = this._localeChanges;
  setTime(target, hours, minutes, seconds) {
    throw new Error(NOT_IMPLEMENTED);
  }
  getHours(date) {
    throw new Error(NOT_IMPLEMENTED);
  }
  getMinutes(date) {
    throw new Error(NOT_IMPLEMENTED);
  }
  getSeconds(date) {
    throw new Error(NOT_IMPLEMENTED);
  }
  parseTime(value, parseFormat) {
    throw new Error(NOT_IMPLEMENTED);
  }
  addSeconds(date, amount) {
    throw new Error(NOT_IMPLEMENTED);
  }
  getValidDateOrNull(obj) {
    return this.isDateInstance(obj) && this.isValid(obj) ? obj : null;
  }
  deserialize(value) {
    if (value == null || this.isDateInstance(value) && this.isValid(value)) {
      return value;
    }
    return this.invalid();
  }
  setLocale(locale) {
    this.locale = locale;
    this._localeChanges.next();
  }
  compareDate(first, second) {
    return this.getYear(first) - this.getYear(second) || this.getMonth(first) - this.getMonth(second) || this.getDate(first) - this.getDate(second);
  }
  compareTime(first, second) {
    return this.getHours(first) - this.getHours(second) || this.getMinutes(first) - this.getMinutes(second) || this.getSeconds(first) - this.getSeconds(second);
  }
  sameDate(first, second) {
    if (first && second) {
      let firstValid = this.isValid(first);
      let secondValid = this.isValid(second);
      if (firstValid && secondValid) {
        return !this.compareDate(first, second);
      }
      return firstValid == secondValid;
    }
    return first == second;
  }
  sameTime(first, second) {
    if (first && second) {
      const firstValid = this.isValid(first);
      const secondValid = this.isValid(second);
      if (firstValid && secondValid) {
        return !this.compareTime(first, second);
      }
      return firstValid == secondValid;
    }
    return first == second;
  }
  clampDate(date, min, max) {
    if (min && this.compareDate(date, min) < 0) {
      return min;
    }
    if (max && this.compareDate(date, max) > 0) {
      return max;
    }
    return date;
  }
};
var MAT_DATE_FORMATS = new InjectionToken("mat-date-formats");

// node_modules/@angular/cdk/fesm2022/coercion.mjs
function coerceBooleanProperty(value) {
  return value != null && `${value}` !== "false";
}
function coerceStringArray(value, separator = /\s+/) {
  const result = [];
  if (value != null) {
    const sourceValues = Array.isArray(value) ? value : `${value}`.split(separator);
    for (const sourceValue of sourceValues) {
      const trimmedString = `${sourceValue}`.trim();
      if (trimmedString) {
        result.push(trimmedString);
      }
    }
  }
  return result;
}

// node_modules/@angular/cdk/fesm2022/platform.mjs
var PlatformModule = class _PlatformModule {
  static \u0275fac = function PlatformModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlatformModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _PlatformModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlatformModule, [{
    type: NgModule,
    args: [{}]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/_structural-styles-chunk.mjs
var _StructuralStylesLoader = class __StructuralStylesLoader {
  static \u0275fac = function _StructuralStylesLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __StructuralStylesLoader)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: __StructuralStylesLoader,
    selectors: [["structural-styles"]],
    decls: 0,
    vars: 0,
    template: function _StructuralStylesLoader_Template(rf, ctx) {
    },
    styles: ['.mat-focus-indicator {\n  position: relative;\n}\n.mat-focus-indicator::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  box-sizing: border-box;\n  pointer-events: none;\n  display: var(--%NS%mat-focus-indicator-display, none);\n  border-width: var(--%NS%mat-focus-indicator-border-width, 3px);\n  border-style: var(--%NS%mat-focus-indicator-border-style, solid);\n  border-color: var(--%NS%mat-focus-indicator-border-color, transparent);\n  border-radius: var(--%NS%mat-focus-indicator-border-radius, 4px);\n}\n.mat-focus-indicator:focus-visible::before {\n  content: "";\n}\n\n@media (forced-colors: active) {\n  html {\n    --%NS%mat-focus-indicator-display: block;\n    --%NS%mat-focus-indicator-fallback-border-style: none;\n  }\n}\n'],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_StructuralStylesLoader, [{
    type: Component,
    args: [{
      selector: "structural-styles",
      encapsulation: ViewEncapsulation.None,
      template: "",
      styles: ['.mat-focus-indicator {\n  position: relative;\n}\n.mat-focus-indicator::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  box-sizing: border-box;\n  pointer-events: none;\n  display: var(--mat-focus-indicator-display, none);\n  border-width: var(--mat-focus-indicator-border-width, 3px);\n  border-style: var(--mat-focus-indicator-border-style, solid);\n  border-color: var(--mat-focus-indicator-border-color, transparent);\n  border-radius: var(--mat-focus-indicator-border-radius, 4px);\n}\n.mat-focus-indicator:focus-visible::before {\n  content: "";\n}\n\n@media (forced-colors: active) {\n  html {\n    --mat-focus-indicator-display: block;\n    --mat-focus-indicator-fallback-border-style: none;\n  }\n}\n']
    }]
  }], null, null);
})();

// node_modules/@angular/cdk/fesm2022/layout.mjs
var LayoutModule = class _LayoutModule {
  static \u0275fac = function LayoutModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LayoutModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _LayoutModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutModule, [{
    type: NgModule,
    args: [{}]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/_animation-chunk.mjs
var MATERIAL_ANIMATIONS = new InjectionToken("MATERIAL_ANIMATIONS");
var reducedMotion = null;
function _getAnimationsState() {
  if (inject(MATERIAL_ANIMATIONS, {
    optional: true
  })?.animationsDisabled || inject(ANIMATION_MODULE_TYPE, {
    optional: true
  }) === "NoopAnimations") {
    return "di-disabled";
  }
  reducedMotion ??= inject(MediaMatcher).matchMedia("(prefers-reduced-motion)").matches;
  return reducedMotion ? "reduced-motion" : "enabled";
}
function _animationsDisabled() {
  return _getAnimationsState() !== "enabled";
}

// node_modules/@angular/material/fesm2022/_ripple-chunk.mjs
var RippleState;
(function(RippleState2) {
  RippleState2[RippleState2["FADING_IN"] = 0] = "FADING_IN";
  RippleState2[RippleState2["VISIBLE"] = 1] = "VISIBLE";
  RippleState2[RippleState2["FADING_OUT"] = 2] = "FADING_OUT";
  RippleState2[RippleState2["HIDDEN"] = 3] = "HIDDEN";
})(RippleState || (RippleState = {}));
var RippleRef = class {
  _renderer;
  element;
  config;
  _animationForciblyDisabledThroughCss;
  state = RippleState.HIDDEN;
  constructor(_renderer, element, config, _animationForciblyDisabledThroughCss = false) {
    this._renderer = _renderer;
    this.element = element;
    this.config = config;
    this._animationForciblyDisabledThroughCss = _animationForciblyDisabledThroughCss;
  }
  fadeOut() {
    this._renderer.fadeOutRipple(this);
  }
};
var passiveCapturingEventOptions$1 = normalizePassiveListenerOptions({
  passive: true,
  capture: true
});
var RippleEventManager = class {
  _events = /* @__PURE__ */ new Map();
  addHandler(ngZone, name, element, handler) {
    const handlersForEvent = this._events.get(name);
    if (handlersForEvent) {
      const handlersForElement = handlersForEvent.get(element);
      if (handlersForElement) {
        handlersForElement.add(handler);
      } else {
        handlersForEvent.set(element, /* @__PURE__ */ new Set([handler]));
      }
    } else {
      this._events.set(name, /* @__PURE__ */ new Map([[element, /* @__PURE__ */ new Set([handler])]]));
      ngZone.runOutsideAngular(() => {
        document.addEventListener(name, this._delegateEventHandler, passiveCapturingEventOptions$1);
      });
    }
  }
  removeHandler(name, element, handler) {
    const handlersForEvent = this._events.get(name);
    if (!handlersForEvent) {
      return;
    }
    const handlersForElement = handlersForEvent.get(element);
    if (!handlersForElement) {
      return;
    }
    handlersForElement.delete(handler);
    if (handlersForElement.size === 0) {
      handlersForEvent.delete(element);
    }
    if (handlersForEvent.size === 0) {
      this._events.delete(name);
      document.removeEventListener(name, this._delegateEventHandler, passiveCapturingEventOptions$1);
    }
  }
  _delegateEventHandler = (event) => {
    const target = _getEventTarget(event);
    if (target) {
      this._events.get(event.type)?.forEach((handlers, element) => {
        if (element === target || element.contains(target)) {
          handlers.forEach((handler) => handler.handleEvent(event));
        }
      });
    }
  };
};
var defaultRippleAnimationConfig = {
  enterDuration: 225,
  exitDuration: 150
};
var ignoreMouseEventsTimeout = 800;
var passiveCapturingEventOptions = normalizePassiveListenerOptions({
  passive: true,
  capture: true
});
var pointerDownEvents = ["mousedown", "touchstart"];
var pointerUpEvents = ["mouseup", "mouseleave", "touchend", "touchcancel"];
var _MatRippleStylesLoader = class __MatRippleStylesLoader {
  static \u0275fac = function _MatRippleStylesLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __MatRippleStylesLoader)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: __MatRippleStylesLoader,
    selectors: [["ng-component"]],
    hostAttrs: ["mat-ripple-style-loader", ""],
    decls: 0,
    vars: 0,
    template: function _MatRippleStylesLoader_Template(rf, ctx) {
    },
    styles: [".mat-ripple {\n  overflow: hidden;\n  position: relative;\n}\n.mat-ripple:not(:empty) {\n  transform: translateZ(0);\n}\n\n.mat-ripple.mat-ripple-unbounded {\n  overflow: visible;\n}\n\n.mat-ripple-element {\n  position: absolute;\n  border-radius: 50%;\n  pointer-events: none;\n  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);\n  transform: scale3d(0, 0, 0);\n  background-color: var(--%NS%mat-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 10%, transparent));\n}\n@media (forced-colors: active) {\n  .mat-ripple-element {\n    display: none;\n  }\n}\n.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {\n  display: none;\n}\n"],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_MatRippleStylesLoader, [{
    type: Component,
    args: [{
      template: "",
      encapsulation: ViewEncapsulation.None,
      host: {
        "mat-ripple-style-loader": ""
      },
      styles: [".mat-ripple {\n  overflow: hidden;\n  position: relative;\n}\n.mat-ripple:not(:empty) {\n  transform: translateZ(0);\n}\n\n.mat-ripple.mat-ripple-unbounded {\n  overflow: visible;\n}\n\n.mat-ripple-element {\n  position: absolute;\n  border-radius: 50%;\n  pointer-events: none;\n  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);\n  transform: scale3d(0, 0, 0);\n  background-color: var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent));\n}\n@media (forced-colors: active) {\n  .mat-ripple-element {\n    display: none;\n  }\n}\n.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {\n  display: none;\n}\n"]
    }]
  }], null, null);
})();
var RippleRenderer = class _RippleRenderer {
  _target;
  _ngZone;
  _platform;
  _containerElement;
  _triggerElement = null;
  _isPointerDown = false;
  _activeRipples = /* @__PURE__ */ new Map();
  _mostRecentTransientRipple = null;
  _lastTouchStartEvent;
  _pointerUpEventsRegistered = false;
  _containerRect = null;
  static _eventManager = new RippleEventManager();
  constructor(_target, _ngZone, elementOrElementRef, _platform, injector) {
    this._target = _target;
    this._ngZone = _ngZone;
    this._platform = _platform;
    if (_platform.isBrowser) {
      this._containerElement = coerceElement(elementOrElementRef);
    }
    if (injector) {
      injector.get(_CdkPrivateStyleLoader).load(_MatRippleStylesLoader);
    }
  }
  fadeInRipple(x, y, config = {}) {
    const containerRect = this._containerRect = this._containerRect || this._containerElement.getBoundingClientRect();
    const animationConfig = __spreadValues(__spreadValues({}, defaultRippleAnimationConfig), config.animation);
    if (config.centered) {
      x = containerRect.left + containerRect.width / 2;
      y = containerRect.top + containerRect.height / 2;
    }
    const radius = config.radius || distanceToFurthestCorner(x, y, containerRect);
    const offsetX = x - containerRect.left;
    const offsetY = y - containerRect.top;
    const enterDuration = animationConfig.enterDuration;
    const ripple = document.createElement("div");
    ripple.classList.add("mat-ripple-element");
    ripple.style.left = `${offsetX - radius}px`;
    ripple.style.top = `${offsetY - radius}px`;
    ripple.style.height = `${radius * 2}px`;
    ripple.style.width = `${radius * 2}px`;
    if (config.color != null) {
      ripple.style.backgroundColor = config.color;
    }
    ripple.style.transitionDuration = `${enterDuration}ms`;
    this._containerElement.appendChild(ripple);
    const computedStyles = window.getComputedStyle(ripple);
    const userTransitionProperty = computedStyles.transitionProperty;
    const userTransitionDuration = computedStyles.transitionDuration;
    const animationForciblyDisabledThroughCss = userTransitionProperty === "none" || userTransitionDuration === "0s" || userTransitionDuration === "0s, 0s" || containerRect.width === 0 && containerRect.height === 0;
    const rippleRef = new RippleRef(this, ripple, config, animationForciblyDisabledThroughCss);
    ripple.style.transform = "scale3d(1, 1, 1)";
    rippleRef.state = RippleState.FADING_IN;
    if (!config.persistent) {
      this._mostRecentTransientRipple = rippleRef;
    }
    let eventListeners = null;
    if (!animationForciblyDisabledThroughCss && (enterDuration || animationConfig.exitDuration)) {
      this._ngZone.runOutsideAngular(() => {
        const onTransitionEnd = () => {
          if (eventListeners) {
            eventListeners.fallbackTimer = null;
          }
          clearTimeout(fallbackTimer);
          this._finishRippleTransition(rippleRef);
        };
        const onTransitionCancel = () => this._destroyRipple(rippleRef);
        const fallbackTimer = setTimeout(onTransitionCancel, enterDuration + 100);
        ripple.addEventListener("transitionend", onTransitionEnd);
        ripple.addEventListener("transitioncancel", onTransitionCancel);
        eventListeners = {
          onTransitionEnd,
          onTransitionCancel,
          fallbackTimer
        };
      });
    }
    this._activeRipples.set(rippleRef, eventListeners);
    if (animationForciblyDisabledThroughCss || !enterDuration) {
      this._finishRippleTransition(rippleRef);
    }
    return rippleRef;
  }
  fadeOutRipple(rippleRef) {
    if (rippleRef.state === RippleState.FADING_OUT || rippleRef.state === RippleState.HIDDEN) {
      return;
    }
    const rippleEl = rippleRef.element;
    const animationConfig = __spreadValues(__spreadValues({}, defaultRippleAnimationConfig), rippleRef.config.animation);
    rippleEl.style.transitionDuration = `${animationConfig.exitDuration}ms`;
    rippleEl.style.opacity = "0";
    rippleRef.state = RippleState.FADING_OUT;
    if (rippleRef._animationForciblyDisabledThroughCss || !animationConfig.exitDuration) {
      this._finishRippleTransition(rippleRef);
    }
  }
  fadeOutAll() {
    this._getActiveRipples().forEach((ripple) => ripple.fadeOut());
  }
  fadeOutAllNonPersistent() {
    this._getActiveRipples().forEach((ripple) => {
      if (!ripple.config.persistent) {
        ripple.fadeOut();
      }
    });
  }
  setupTriggerEvents(elementOrElementRef) {
    const element = coerceElement(elementOrElementRef);
    if (!this._platform.isBrowser || !element || element === this._triggerElement) {
      return;
    }
    this._removeTriggerEvents();
    this._triggerElement = element;
    pointerDownEvents.forEach((type) => {
      _RippleRenderer._eventManager.addHandler(this._ngZone, type, element, this);
    });
  }
  handleEvent(event) {
    if (event.type === "mousedown") {
      this._onMousedown(event);
    } else if (event.type === "touchstart") {
      this._onTouchStart(event);
    } else {
      this._onPointerUp();
    }
    if (!this._pointerUpEventsRegistered) {
      this._ngZone.runOutsideAngular(() => {
        pointerUpEvents.forEach((type) => {
          this._triggerElement.addEventListener(type, this, passiveCapturingEventOptions);
        });
      });
      this._pointerUpEventsRegistered = true;
    }
  }
  _finishRippleTransition(rippleRef) {
    if (rippleRef.state === RippleState.FADING_IN) {
      this._startFadeOutTransition(rippleRef);
    } else if (rippleRef.state === RippleState.FADING_OUT) {
      this._destroyRipple(rippleRef);
    }
  }
  _startFadeOutTransition(rippleRef) {
    const isMostRecentTransientRipple = rippleRef === this._mostRecentTransientRipple;
    const {
      persistent
    } = rippleRef.config;
    rippleRef.state = RippleState.VISIBLE;
    if (!persistent && (!isMostRecentTransientRipple || !this._isPointerDown)) {
      rippleRef.fadeOut();
    }
  }
  _destroyRipple(rippleRef) {
    const eventListeners = this._activeRipples.get(rippleRef) ?? null;
    this._activeRipples.delete(rippleRef);
    if (!this._activeRipples.size) {
      this._containerRect = null;
    }
    if (rippleRef === this._mostRecentTransientRipple) {
      this._mostRecentTransientRipple = null;
    }
    rippleRef.state = RippleState.HIDDEN;
    if (eventListeners !== null) {
      rippleRef.element.removeEventListener("transitionend", eventListeners.onTransitionEnd);
      rippleRef.element.removeEventListener("transitioncancel", eventListeners.onTransitionCancel);
      if (eventListeners.fallbackTimer !== null) {
        clearTimeout(eventListeners.fallbackTimer);
      }
    }
    rippleRef.element.remove();
  }
  _onMousedown(event) {
    const isFakeMousedown = isFakeMousedownFromScreenReader(event);
    const isSyntheticEvent = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + ignoreMouseEventsTimeout;
    if (!this._target.rippleDisabled && !isFakeMousedown && !isSyntheticEvent) {
      this._isPointerDown = true;
      this.fadeInRipple(event.clientX, event.clientY, this._target.rippleConfig);
    }
  }
  _onTouchStart(event) {
    if (!this._target.rippleDisabled && !isFakeTouchstartFromScreenReader(event)) {
      this._lastTouchStartEvent = Date.now();
      this._isPointerDown = true;
      const touches = event.changedTouches;
      if (touches) {
        for (let i = 0; i < touches.length; i++) {
          this.fadeInRipple(touches[i].clientX, touches[i].clientY, this._target.rippleConfig);
        }
      }
    }
  }
  _onPointerUp() {
    if (!this._isPointerDown) {
      return;
    }
    this._isPointerDown = false;
    this._getActiveRipples().forEach((ripple) => {
      const isVisible = ripple.state === RippleState.VISIBLE || ripple.config.terminateOnPointerUp && ripple.state === RippleState.FADING_IN;
      if (!ripple.config.persistent && isVisible) {
        ripple.fadeOut();
      }
    });
  }
  _getActiveRipples() {
    return Array.from(this._activeRipples.keys());
  }
  _removeTriggerEvents() {
    const trigger = this._triggerElement;
    if (trigger) {
      pointerDownEvents.forEach((type) => _RippleRenderer._eventManager.removeHandler(type, trigger, this));
      if (this._pointerUpEventsRegistered) {
        pointerUpEvents.forEach((type) => trigger.removeEventListener(type, this, passiveCapturingEventOptions));
        this._pointerUpEventsRegistered = false;
      }
    }
  }
};
function distanceToFurthestCorner(x, y, rect) {
  const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
  const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
  return Math.sqrt(distX * distX + distY * distY);
}
var MAT_RIPPLE_GLOBAL_OPTIONS = new InjectionToken("mat-ripple-global-options");
var MatRipple = class _MatRipple {
  _elementRef = inject(ElementRef);
  _animationsDisabled = _animationsDisabled();
  color;
  unbounded = false;
  centered = false;
  radius = 0;
  animation;
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    if (value) {
      this.fadeOutAllNonPersistent();
    }
    this._disabled = value;
    this._setupTriggerEventsIfEnabled();
  }
  _disabled = false;
  get trigger() {
    return this._trigger || this._elementRef.nativeElement;
  }
  set trigger(trigger) {
    this._trigger = trigger;
    this._setupTriggerEventsIfEnabled();
  }
  _trigger;
  _rippleRenderer;
  _globalOptions;
  _isInitialized = false;
  constructor() {
    const ngZone = inject(NgZone);
    const platform = inject(Platform);
    const globalOptions = inject(MAT_RIPPLE_GLOBAL_OPTIONS, {
      optional: true
    });
    const injector = inject(Injector);
    this._globalOptions = globalOptions || {};
    this._rippleRenderer = new RippleRenderer(this, ngZone, this._elementRef, platform, injector);
  }
  ngOnInit() {
    this._isInitialized = true;
    this._setupTriggerEventsIfEnabled();
  }
  ngOnDestroy() {
    this._rippleRenderer._removeTriggerEvents();
  }
  fadeOutAll() {
    this._rippleRenderer.fadeOutAll();
  }
  fadeOutAllNonPersistent() {
    this._rippleRenderer.fadeOutAllNonPersistent();
  }
  get rippleConfig() {
    return {
      centered: this.centered,
      radius: this.radius,
      color: this.color,
      animation: __spreadValues(__spreadValues(__spreadValues({}, this._globalOptions.animation), this._animationsDisabled ? {
        enterDuration: 0,
        exitDuration: 0
      } : {}), this.animation),
      terminateOnPointerUp: this._globalOptions.terminateOnPointerUp
    };
  }
  get rippleDisabled() {
    return this.disabled || !!this._globalOptions.disabled;
  }
  _setupTriggerEventsIfEnabled() {
    if (!this.disabled && this._isInitialized) {
      this._rippleRenderer.setupTriggerEvents(this.trigger);
    }
  }
  launch(configOrX, y = 0, config) {
    if (typeof configOrX === "number") {
      return this._rippleRenderer.fadeInRipple(configOrX, y, __spreadValues(__spreadValues({}, this.rippleConfig), config));
    } else {
      return this._rippleRenderer.fadeInRipple(0, 0, __spreadValues(__spreadValues({}, this.rippleConfig), configOrX));
    }
  }
  static \u0275fac = function MatRipple_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatRipple)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatRipple,
    selectors: [["", "mat-ripple", ""], ["", "matRipple", ""]],
    hostAttrs: [1, "mat-ripple"],
    hostVars: 2,
    hostBindings: function MatRipple_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mat-ripple-unbounded", ctx.unbounded);
      }
    },
    inputs: {
      color: [0, "matRippleColor", "color"],
      unbounded: [0, "matRippleUnbounded", "unbounded"],
      centered: [0, "matRippleCentered", "centered"],
      radius: [0, "matRippleRadius", "radius"],
      animation: [0, "matRippleAnimation", "animation"],
      disabled: [0, "matRippleDisabled", "disabled"],
      trigger: [0, "matRippleTrigger", "trigger"]
    },
    exportAs: ["matRipple"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRipple, [{
    type: Directive,
    args: [{
      selector: "[mat-ripple], [matRipple]",
      exportAs: "matRipple",
      host: {
        "class": "mat-ripple",
        "[class.mat-ripple-unbounded]": "unbounded"
      }
    }]
  }], () => [], {
    color: [{
      type: Input,
      args: ["matRippleColor"]
    }],
    unbounded: [{
      type: Input,
      args: ["matRippleUnbounded"]
    }],
    centered: [{
      type: Input,
      args: ["matRippleCentered"]
    }],
    radius: [{
      type: Input,
      args: ["matRippleRadius"]
    }],
    animation: [{
      type: Input,
      args: ["matRippleAnimation"]
    }],
    disabled: [{
      type: Input,
      args: ["matRippleDisabled"]
    }],
    trigger: [{
      type: Input,
      args: ["matRippleTrigger"]
    }]
  });
})();

// node_modules/@angular/material/fesm2022/_ripple-loader-chunk.mjs
var eventListenerOptions = {
  capture: true
};
var rippleInteractionEvents = ["focus", "mousedown", "mouseenter", "touchstart"];
var matRippleUninitialized = "mat-ripple-loader-uninitialized";
var matRippleClassName = "mat-ripple-loader-class-name";
var matRippleCentered = "mat-ripple-loader-centered";
var matRippleDisabled = "mat-ripple-loader-disabled";
var MatRippleLoader = class _MatRippleLoader {
  _document = inject(DOCUMENT);
  _animationsDisabled = _animationsDisabled();
  _globalRippleOptions = inject(MAT_RIPPLE_GLOBAL_OPTIONS, {
    optional: true
  });
  _platform = inject(Platform);
  _ngZone = inject(NgZone);
  _injector = inject(Injector);
  _eventCleanups;
  _hosts = /* @__PURE__ */ new Map();
  constructor() {
    const renderer = inject(RendererFactory2).createRenderer(null, null);
    this._eventCleanups = this._ngZone.runOutsideAngular(() => rippleInteractionEvents.map((name) => renderer.listen(this._document, name, this._onInteraction, eventListenerOptions)));
  }
  ngOnDestroy() {
    const hosts = this._hosts.keys();
    for (const host of hosts) {
      this.destroyRipple(host);
    }
    this._eventCleanups.forEach((cleanup) => cleanup());
  }
  configureRipple(host, config) {
    host.setAttribute(matRippleUninitialized, this._globalRippleOptions?.namespace ?? "");
    if (config.className || !host.hasAttribute(matRippleClassName)) {
      host.setAttribute(matRippleClassName, config.className || "");
    }
    if (config.centered) {
      host.setAttribute(matRippleCentered, "");
    }
    if (config.disabled) {
      host.setAttribute(matRippleDisabled, "");
    }
  }
  setDisabled(host, disabled) {
    const ripple = this._hosts.get(host);
    if (ripple) {
      ripple.target.rippleDisabled = disabled;
      if (!disabled && !ripple.hasSetUpEvents) {
        ripple.hasSetUpEvents = true;
        ripple.renderer.setupTriggerEvents(host);
      }
    } else if (disabled) {
      host.setAttribute(matRippleDisabled, "");
    } else {
      host.removeAttribute(matRippleDisabled);
    }
  }
  _onInteraction = (event) => {
    const eventTarget = _getEventTarget(event);
    if (eventTarget instanceof HTMLElement) {
      const element = eventTarget.closest(`[${matRippleUninitialized}="${this._globalRippleOptions?.namespace ?? ""}"]`);
      if (element) {
        this._createRipple(element);
      }
    }
  };
  _createRipple(host) {
    if (!this._document || this._hosts.has(host)) {
      return;
    }
    host.querySelector(".mat-ripple")?.remove();
    const rippleEl = this._document.createElement("span");
    rippleEl.classList.add("mat-ripple", host.getAttribute(matRippleClassName));
    host.append(rippleEl);
    const globalOptions = this._globalRippleOptions;
    const enterDuration = this._animationsDisabled ? 0 : globalOptions?.animation?.enterDuration ?? defaultRippleAnimationConfig.enterDuration;
    const exitDuration = this._animationsDisabled ? 0 : globalOptions?.animation?.exitDuration ?? defaultRippleAnimationConfig.exitDuration;
    const target = {
      rippleDisabled: this._animationsDisabled || globalOptions?.disabled || host.hasAttribute(matRippleDisabled),
      rippleConfig: {
        centered: host.hasAttribute(matRippleCentered),
        terminateOnPointerUp: globalOptions?.terminateOnPointerUp,
        animation: {
          enterDuration,
          exitDuration
        }
      }
    };
    const renderer = new RippleRenderer(target, this._ngZone, rippleEl, this._platform, this._injector);
    const hasSetUpEvents = !target.rippleDisabled;
    if (hasSetUpEvents) {
      renderer.setupTriggerEvents(host);
    }
    this._hosts.set(host, {
      target,
      renderer,
      hasSetUpEvents
    });
    host.removeAttribute(matRippleUninitialized);
  }
  destroyRipple(host) {
    const ripple = this._hosts.get(host);
    if (ripple) {
      ripple.renderer._removeTriggerEvents();
      this._hosts.delete(host);
    }
  }
  static \u0275fac = function MatRippleLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatRippleLoader)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineService({
    token: _MatRippleLoader,
    factory: _MatRippleLoader.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRippleLoader, [{
    type: Service
  }], () => [], null);
})();

// node_modules/@angular/material/fesm2022/_icon-button-chunk.mjs
var MAT_BUTTON_CONFIG = new InjectionToken("MAT_BUTTON_CONFIG");
function transformTabIndex(value) {
  return value == null ? void 0 : numberAttribute(value);
}
var MatButtonBase = class _MatButtonBase {
  _elementRef = inject(ElementRef);
  _ngZone = inject(NgZone);
  _animationsDisabled = _animationsDisabled();
  _config = inject(MAT_BUTTON_CONFIG, {
    optional: true
  });
  _focusMonitor = inject(FocusMonitor);
  _cleanupClick;
  _renderer = inject(Renderer2);
  _rippleLoader = inject(MatRippleLoader);
  _isAnchor;
  _isFab = false;
  color;
  get disableRipple() {
    return this._disableRipple;
  }
  set disableRipple(value) {
    this._disableRipple = value;
    this._updateRippleDisabled();
  }
  _disableRipple = false;
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
    this._updateRippleDisabled();
  }
  _disabled = false;
  ariaDisabled;
  disabledInteractive;
  tabIndex;
  set _tabindex(value) {
    this.tabIndex = value;
  }
  showProgress = input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "showProgress"
  } : {}), {
    transform: booleanAttribute
  }));
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_StructuralStylesLoader);
    const element = this._elementRef.nativeElement;
    this._isAnchor = element.tagName === "A";
    this.disabledInteractive = this._config?.disabledInteractive ?? false;
    this.color = this._config?.color ?? null;
    this._rippleLoader?.configureRipple(element, {
      className: "mat-mdc-button-ripple"
    });
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this._elementRef, true);
    if (this._isAnchor) {
      this._setupAsAnchor();
    }
  }
  ngOnDestroy() {
    this._cleanupClick?.();
    this._focusMonitor.stopMonitoring(this._elementRef);
    this._rippleLoader?.destroyRipple(this._elementRef.nativeElement);
  }
  focus(origin = "program", options) {
    if (origin) {
      this._focusMonitor.focusVia(this._elementRef.nativeElement, origin, options);
    } else {
      this._elementRef.nativeElement.focus(options);
    }
  }
  _getAriaDisabled() {
    if (this.ariaDisabled != null) {
      return this.ariaDisabled;
    }
    if (this._isAnchor) {
      return this.disabled || null;
    }
    return this.disabled && this.disabledInteractive ? true : null;
  }
  _getDisabledAttribute() {
    return this.disabledInteractive || !this.disabled ? null : true;
  }
  _updateRippleDisabled() {
    this._rippleLoader?.setDisabled(this._elementRef.nativeElement, this.disableRipple || this.disabled);
  }
  _getTabIndex() {
    if (this._isAnchor) {
      return this.disabled && !this.disabledInteractive ? -1 : this.tabIndex;
    }
    return this.tabIndex;
  }
  _setupAsAnchor() {
    this._cleanupClick = this._ngZone.runOutsideAngular(() => this._renderer.listen(this._elementRef.nativeElement, "click", (event) => {
      if (this.disabled) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }));
  }
  static \u0275fac = function MatButtonBase_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatButtonBase)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatButtonBase,
    hostAttrs: [1, "mat-mdc-button-base"],
    hostVars: 15,
    hostBindings: function MatButtonBase_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("disabled", ctx._getDisabledAttribute())("aria-disabled", ctx._getAriaDisabled())("tabindex", ctx._getTabIndex());
        \u0275\u0275classMap(ctx.color ? "mat-" + ctx.color : "");
        \u0275\u0275classProp("mat-mdc-button-progress-indicator-shown", ctx.showProgress())("mat-mdc-button-disabled", ctx.disabled)("mat-mdc-button-disabled-interactive", ctx.disabledInteractive)("mat-unthemed", !ctx.color)("_mat-animation-noopable", ctx._animationsDisabled);
      }
    },
    inputs: {
      color: "color",
      disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
      disabled: [2, "disabled", "disabled", booleanAttribute],
      ariaDisabled: [2, "aria-disabled", "ariaDisabled", booleanAttribute],
      disabledInteractive: [2, "disabledInteractive", "disabledInteractive", booleanAttribute],
      tabIndex: [2, "tabIndex", "tabIndex", transformTabIndex],
      _tabindex: [2, "tabindex", "_tabindex", transformTabIndex],
      showProgress: [1, "showProgress"]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatButtonBase, [{
    type: Directive,
    args: [{
      host: {
        "class": "mat-mdc-button-base",
        "[class]": 'color ? "mat-" + color : ""',
        "[class.mat-mdc-button-progress-indicator-shown]": "showProgress()",
        "[attr.disabled]": "_getDisabledAttribute()",
        "[attr.aria-disabled]": "_getAriaDisabled()",
        "[attr.tabindex]": "_getTabIndex()",
        "[class.mat-mdc-button-disabled]": "disabled",
        "[class.mat-mdc-button-disabled-interactive]": "disabledInteractive",
        "[class.mat-unthemed]": "!color",
        "[class._mat-animation-noopable]": "_animationsDisabled"
      }
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    ariaDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute,
        alias: "aria-disabled"
      }]
    }],
    disabledInteractive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: transformTabIndex
      }]
    }],
    _tabindex: [{
      type: Input,
      args: [{
        alias: "tabindex",
        transform: transformTabIndex
      }]
    }],
    showProgress: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "showProgress",
        required: false
      }]
    }]
  });
})();
var MatIconButton = class _MatIconButton extends MatButtonBase {
  constructor() {
    super();
    this._rippleLoader.configureRipple(this._elementRef.nativeElement, {
      centered: true
    });
  }
  static \u0275fac = function MatIconButton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatIconButton)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    const _c0 = ["*", [["", "progressIndicator", ""]]];
    const _c1 = ["*", "[progressIndicator]"];
    function MatIconButton_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "div", 1);
        \u0275\u0275projection(1, 1);
        \u0275\u0275domElementEnd();
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatIconButton,
      selectors: [["button", "mat-icon-button", ""], ["a", "mat-icon-button", ""], ["button", "matIconButton", ""], ["a", "matIconButton", ""]],
      hostAttrs: [1, "mdc-icon-button", "mat-mdc-icon-button"],
      exportAs: ["matButton", "matAnchor"],
      features: [\u0275\u0275InheritDefinitionFeature],
      ngContentSelectors: _c1,
      decls: 5,
      vars: 1,
      consts: [[1, "mat-mdc-button-persistent-ripple", "mdc-icon-button__ripple"], [1, "mat-mdc-button-progress-indicator-container"], [1, "mat-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
      template: function MatIconButton_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef(_c0);
          \u0275\u0275domElement(0, "span", 0);
          \u0275\u0275projection(1);
          \u0275\u0275conditionalCreate(2, MatIconButton_Conditional_2_Template, 2, 0, "div", 1);
          \u0275\u0275domElement(3, "span", 2)(4, "span", 3);
        }
        if (rf & 2) {
          \u0275\u0275advance(2);
          \u0275\u0275conditional(ctx.showProgress() ? 2 : -1);
        }
      },
      styles: ['.mat-mdc-icon-button {\n  -webkit-user-select: none;\n  user-select: none;\n  display: inline-block;\n  position: relative;\n  box-sizing: border-box;\n  border: none;\n  outline: none;\n  background-color: transparent;\n  fill: currentColor;\n  text-decoration: none;\n  cursor: pointer;\n  z-index: 0;\n  overflow: visible;\n  border-radius: var(--%NS%mat-icon-button-container-shape, var(--%NS%mat-sys-corner-full, 50%));\n  flex-shrink: 0;\n  text-align: center;\n  width: var(--%NS%mat-icon-button-state-layer-size, 40px);\n  height: var(--%NS%mat-icon-button-state-layer-size, 40px);\n  padding: calc(calc(var(--%NS%mat-icon-button-state-layer-size, 40px) - var(--%NS%mat-icon-button-icon-size, 24px)) / 2);\n  font-size: var(--%NS%mat-icon-button-icon-size, 24px);\n  color: var(--%NS%mat-icon-button-icon-color, var(--%NS%mat-sys-on-surface-variant));\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-icon-button .mat-mdc-button-ripple,\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-icon-button .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  content: "";\n  opacity: 0;\n}\n.mat-mdc-icon-button .mdc-button__label,\n.mat-mdc-icon-button .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-icon-button .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  border-radius: inherit;\n}\n.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {\n  content: "";\n  border-radius: inherit;\n}\n.mat-mdc-icon-button .mat-ripple-element {\n  background-color: var(--%NS%mat-icon-button-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface-variant) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-icon-button-state-layer-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-icon-button-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-icon-button-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-icon-button-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-icon-button-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-icon-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-icon-button-touch-target-size, 48px);\n  display: var(--%NS%mat-icon-button-touch-target-display, block);\n  left: 50%;\n  width: var(--%NS%mat-icon-button-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-icon-button._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-icon-button img,\n.mat-mdc-icon-button svg {\n  width: var(--%NS%mat-icon-button-icon-size, 24px);\n  height: var(--%NS%mat-icon-button-icon-size, 24px);\n  vertical-align: baseline;\n}\n.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__determinate-circle-graphic {\n  width: inherit;\n  height: inherit;\n}\n.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__indeterminate-circle-graphic {\n  height: 100%;\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {\n  border-radius: var(--%NS%mat-icon-button-container-shape, var(--%NS%mat-sys-corner-full, 50%));\n}\n.mat-mdc-icon-button[hidden] {\n  display: none;\n}\n.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {\n  background: transparent;\n  opacity: 1;\n}\n\n.mat-mdc-button-progress-indicator-container {\n  position: absolute;\n  inset-inline-start: 0;\n  inset-block-start: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n\n.mat-mdc-button-progress-indicator-shown mat-icon {\n  visibility: hidden;\n}\n', "@media (forced-colors: active) {\n  .mat-mdc-button:not(.mdc-button--outlined),\n  .mat-mdc-unelevated-button:not(.mdc-button--outlined),\n  .mat-mdc-raised-button:not(.mdc-button--outlined),\n  .mat-mdc-outlined-button:not(.mdc-button--outlined),\n  .mat-mdc-button-base.mat-tonal-button,\n  .mat-mdc-icon-button.mat-mdc-icon-button,\n  .mat-mdc-outlined-button .mdc-button__ripple {\n    outline: solid 1px;\n  }\n}\n"],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatIconButton, [{
    type: Component,
    args: [{
      selector: `button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]`,
      host: {
        "class": "mdc-icon-button mat-mdc-icon-button"
      },
      exportAs: "matButton, matAnchor",
      encapsulation: ViewEncapsulation.None,
      template: `<span class="mat-mdc-button-persistent-ripple mdc-icon-button__ripple"></span>

<ng-content></ng-content>

@if (showProgress()) {
  <div class="mat-mdc-button-progress-indicator-container">
    <ng-content select="[progressIndicator]" />
  </div>
}

<!--
  The indicator can't be directly on the button, because MDC uses ::before for high contrast
  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.
-->
<span class="mat-focus-indicator"></span>

<span class="mat-mdc-button-touch-target"></span>
`,
      styles: ['.mat-mdc-icon-button {\n  -webkit-user-select: none;\n  user-select: none;\n  display: inline-block;\n  position: relative;\n  box-sizing: border-box;\n  border: none;\n  outline: none;\n  background-color: transparent;\n  fill: currentColor;\n  text-decoration: none;\n  cursor: pointer;\n  z-index: 0;\n  overflow: visible;\n  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));\n  flex-shrink: 0;\n  text-align: center;\n  width: var(--mat-icon-button-state-layer-size, 40px);\n  height: var(--mat-icon-button-state-layer-size, 40px);\n  padding: calc(calc(var(--mat-icon-button-state-layer-size, 40px) - var(--mat-icon-button-icon-size, 24px)) / 2);\n  font-size: var(--mat-icon-button-icon-size, 24px);\n  color: var(--mat-icon-button-icon-color, var(--mat-sys-on-surface-variant));\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-icon-button .mat-mdc-button-ripple,\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-icon-button .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  content: "";\n  opacity: 0;\n}\n.mat-mdc-icon-button .mdc-button__label,\n.mat-mdc-icon-button .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-icon-button .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  border-radius: inherit;\n}\n.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {\n  content: "";\n  border-radius: inherit;\n}\n.mat-mdc-icon-button .mat-ripple-element {\n  background-color: var(--mat-icon-button-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface-variant) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-icon-button-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-icon-button-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-icon-button-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-icon-button-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-icon-button-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-icon-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-icon-button-touch-target-size, 48px);\n  display: var(--mat-icon-button-touch-target-display, block);\n  left: 50%;\n  width: var(--mat-icon-button-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-icon-button._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-icon-button img,\n.mat-mdc-icon-button svg {\n  width: var(--mat-icon-button-icon-size, 24px);\n  height: var(--mat-icon-button-icon-size, 24px);\n  vertical-align: baseline;\n}\n.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__determinate-circle-graphic {\n  width: inherit;\n  height: inherit;\n}\n.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__indeterminate-circle-graphic {\n  height: 100%;\n}\n.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {\n  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));\n}\n.mat-mdc-icon-button[hidden] {\n  display: none;\n}\n.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {\n  background: transparent;\n  opacity: 1;\n}\n\n.mat-mdc-button-progress-indicator-container {\n  position: absolute;\n  inset-inline-start: 0;\n  inset-block-start: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n\n.mat-mdc-button-progress-indicator-shown mat-icon {\n  visibility: hidden;\n}\n', "@media (forced-colors: active) {\n  .mat-mdc-button:not(.mdc-button--outlined),\n  .mat-mdc-unelevated-button:not(.mdc-button--outlined),\n  .mat-mdc-raised-button:not(.mdc-button--outlined),\n  .mat-mdc-outlined-button:not(.mdc-button--outlined),\n  .mat-mdc-button-base.mat-tonal-button,\n  .mat-mdc-icon-button.mat-mdc-icon-button,\n  .mat-mdc-outlined-button .mdc-button__ripple {\n    outline: solid 1px;\n  }\n}\n"]
    }]
  }], () => [], null);
})();

// node_modules/@angular/material/fesm2022/_ripple-module-chunk.mjs
var MatRippleModule = class _MatRippleModule {
  static \u0275fac = function MatRippleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatRippleModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatRippleModule,
    imports: [MatRipple],
    exports: [MatRipple, BidiModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRippleModule, [{
    type: NgModule,
    args: [{
      imports: [MatRipple],
      exports: [MatRipple, BidiModule]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/button.mjs
var APPEARANCE_CLASSES = /* @__PURE__ */ new Map([["text", ["mat-mdc-button"]], ["filled", ["mdc-button--unelevated", "mat-mdc-unelevated-button"]], ["elevated", ["mdc-button--raised", "mat-mdc-raised-button"]], ["outlined", ["mdc-button--outlined", "mat-mdc-outlined-button"]], ["tonal", ["mat-tonal-button"]]]);
var MatButton = class _MatButton extends MatButtonBase {
  get appearance() {
    return this._appearance;
  }
  set appearance(value) {
    this.setAppearance(value || this._config?.defaultAppearance || "text");
  }
  _appearance = null;
  constructor() {
    super();
    const inferredAppearance = _inferAppearance(this._elementRef.nativeElement);
    if (inferredAppearance) {
      this.setAppearance(inferredAppearance);
    }
  }
  setAppearance(appearance) {
    if (appearance === this._appearance) {
      return;
    }
    const classList = this._elementRef.nativeElement.classList;
    const previousClasses = this._appearance ? APPEARANCE_CLASSES.get(this._appearance) : null;
    const newClasses = APPEARANCE_CLASSES.get(appearance);
    if ((typeof ngDevMode === "undefined" || ngDevMode) && !newClasses) {
      throw new Error(`Unsupported MatButton appearance "${appearance}"`);
    }
    if (previousClasses) {
      classList.remove(...previousClasses);
    }
    classList.add(...newClasses);
    this._appearance = appearance;
  }
  static \u0275fac = function MatButton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatButton)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    const _c0 = [[["", 8, "material-icons", 3, "iconPositionEnd", ""], ["mat-icon", 3, "iconPositionEnd", ""], ["", "matButtonIcon", "", 3, "iconPositionEnd", ""], ["", 8, "material-symbols-outlined", 3, "iconPositionEnd", ""], ["", 8, "material-symbols-rounded", 3, "iconPositionEnd", ""], ["", 8, "material-symbols-sharp", 3, "iconPositionEnd", ""]], "*", [["", "iconPositionEnd", "", 8, "material-icons"], ["mat-icon", "iconPositionEnd", ""], ["", "matButtonIcon", "", "iconPositionEnd", ""], ["", "iconPositionEnd", "", 8, "material-symbols-outlined"], ["", "iconPositionEnd", "", 8, "material-symbols-rounded"], ["", "iconPositionEnd", "", 8, "material-symbols-sharp"]], [["", "progressIndicator", ""]]];
    const _c1 = [".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd]), .material-symbols-outlined:not([iconPositionEnd]), .material-symbols-rounded:not([iconPositionEnd]), .material-symbols-sharp:not([iconPositionEnd])", "*", ".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd], .material-symbols-outlined[iconPositionEnd], .material-symbols-rounded[iconPositionEnd], .material-symbols-sharp[iconPositionEnd]", "[progressIndicator]"];
    function MatButton_Conditional_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "div", 2);
        \u0275\u0275projection(1, 3);
        \u0275\u0275domElementEnd();
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatButton,
      selectors: [["button", "matButton", ""], ["a", "matButton", ""], ["button", "mat-button", ""], ["button", "mat-raised-button", ""], ["button", "mat-flat-button", ""], ["button", "mat-stroked-button", ""], ["a", "mat-button", ""], ["a", "mat-raised-button", ""], ["a", "mat-flat-button", ""], ["a", "mat-stroked-button", ""]],
      hostAttrs: [1, "mdc-button"],
      inputs: {
        appearance: [0, "matButton", "appearance"]
      },
      exportAs: ["matButton", "matAnchor"],
      features: [\u0275\u0275InheritDefinitionFeature],
      ngContentSelectors: _c1,
      decls: 8,
      vars: 5,
      consts: [[1, "mat-mdc-button-persistent-ripple"], [1, "mdc-button__label"], [1, "mat-mdc-button-progress-indicator-container"], [1, "mat-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
      template: function MatButton_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef(_c0);
          \u0275\u0275domElement(0, "span", 0);
          \u0275\u0275projection(1);
          \u0275\u0275domElementStart(2, "span", 1);
          \u0275\u0275projection(3, 1);
          \u0275\u0275domElementEnd();
          \u0275\u0275projection(4, 2);
          \u0275\u0275conditionalCreate(5, MatButton_Conditional_5_Template, 2, 0, "div", 2);
          \u0275\u0275domElement(6, "span", 3)(7, "span", 4);
        }
        if (rf & 2) {
          \u0275\u0275classProp("mdc-button__ripple", !ctx._isFab)("mdc-fab__ripple", ctx._isFab);
          \u0275\u0275advance(5);
          \u0275\u0275conditional(ctx.showProgress() ? 5 : -1);
        }
      },
      styles: ['.mat-mdc-button-base {\n  text-decoration: none;\n}\n.mat-mdc-button-base .mat-icon {\n  min-height: fit-content;\n  flex-shrink: 0;\n}\n@media (hover: none) {\n  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {\n    opacity: 0;\n  }\n}\n\n.mdc-button {\n  -webkit-user-select: none;\n  user-select: none;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  min-width: 64px;\n  border: none;\n  outline: none;\n  line-height: inherit;\n  -webkit-appearance: none;\n  overflow: visible;\n  vertical-align: middle;\n  background: transparent;\n  padding: 0 8px;\n}\n.mdc-button::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n.mdc-button:active {\n  outline: none;\n}\n.mdc-button:hover {\n  cursor: pointer;\n}\n.mdc-button:disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mdc-button[hidden] {\n  display: none;\n}\n.mdc-button .mdc-button__label {\n  position: relative;\n}\n\n.mat-mdc-button {\n  padding: 0 var(--%NS%mat-button-text-horizontal-padding, 12px);\n  height: var(--%NS%mat-button-text-container-height, 40px);\n  font-family: var(--%NS%mat-button-text-label-text-font, var(--%NS%mat-sys-label-large-font));\n  font-size: var(--%NS%mat-button-text-label-text-size, var(--%NS%mat-sys-label-large-size));\n  letter-spacing: var(--%NS%mat-button-text-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));\n  text-transform: var(--%NS%mat-button-text-label-text-transform);\n  font-weight: var(--%NS%mat-button-text-label-text-weight, var(--%NS%mat-sys-label-large-weight));\n}\n.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {\n  border-radius: var(--%NS%mat-button-text-container-shape, var(--%NS%mat-sys-corner-full));\n}\n.mat-mdc-button:not(:disabled) {\n  color: var(--%NS%mat-button-text-label-text-color, var(--%NS%mat-sys-primary));\n}\n.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n.mat-mdc-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-button:has(.material-icons, .material-symbols-outlined, .material-symbols-rounded,\n.material-symbols-sharp, mat-icon, [matButtonIcon]) {\n  padding: 0 var(--%NS%mat-button-text-with-icon-horizontal-padding, 16px);\n}\n.mat-mdc-button > .mat-icon {\n  margin-right: var(--%NS%mat-button-text-icon-spacing, 8px);\n  margin-left: var(--%NS%mat-button-text-icon-offset, -4px);\n}\n[dir=rtl] .mat-mdc-button > .mat-icon {\n  margin-right: var(--%NS%mat-button-text-icon-offset, -4px);\n  margin-left: var(--%NS%mat-button-text-icon-spacing, 8px);\n}\n.mat-mdc-button .mdc-button__label + .mat-icon {\n  margin-right: var(--%NS%mat-button-text-icon-offset, -4px);\n  margin-left: var(--%NS%mat-button-text-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {\n  margin-right: var(--%NS%mat-button-text-icon-spacing, 8px);\n  margin-left: var(--%NS%mat-button-text-icon-offset, -4px);\n}\n.mat-mdc-button .mat-ripple-element {\n  background-color: var(--%NS%mat-button-text-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-button-text-state-layer-color, var(--%NS%mat-sys-primary));\n}\n.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-button-text-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-text-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-text-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-text-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-button-text-touch-target-size, 48px);\n  display: var(--%NS%mat-button-text-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n\n.mat-mdc-unelevated-button {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  height: var(--%NS%mat-button-filled-container-height, 40px);\n  font-family: var(--%NS%mat-button-filled-label-text-font, var(--%NS%mat-sys-label-large-font));\n  font-size: var(--%NS%mat-button-filled-label-text-size, var(--%NS%mat-sys-label-large-size));\n  letter-spacing: var(--%NS%mat-button-filled-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));\n  text-transform: var(--%NS%mat-button-filled-label-text-transform);\n  font-weight: var(--%NS%mat-button-filled-label-text-weight, var(--%NS%mat-sys-label-large-weight));\n  padding: 0 var(--%NS%mat-button-filled-horizontal-padding, 24px);\n}\n.mat-mdc-unelevated-button > .mat-icon {\n  margin-right: var(--%NS%mat-button-filled-icon-spacing, 8px);\n  margin-left: var(--%NS%mat-button-filled-icon-offset, -8px);\n}\n[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {\n  margin-right: var(--%NS%mat-button-filled-icon-offset, -8px);\n  margin-left: var(--%NS%mat-button-filled-icon-spacing, 8px);\n}\n.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {\n  margin-right: var(--%NS%mat-button-filled-icon-offset, -8px);\n  margin-left: var(--%NS%mat-button-filled-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {\n  margin-right: var(--%NS%mat-button-filled-icon-spacing, 8px);\n  margin-left: var(--%NS%mat-button-filled-icon-offset, -8px);\n}\n.mat-mdc-unelevated-button .mat-ripple-element {\n  background-color: var(--%NS%mat-button-filled-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-button-filled-state-layer-color, var(--%NS%mat-sys-on-primary));\n}\n.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-button-filled-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-filled-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-filled-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-filled-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-unelevated-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-button-filled-touch-target-size, 48px);\n  display: var(--%NS%mat-button-filled-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n.mat-mdc-unelevated-button:not(:disabled) {\n  color: var(--%NS%mat-button-filled-label-text-color, var(--%NS%mat-sys-on-primary));\n  background-color: var(--%NS%mat-button-filled-container-color, var(--%NS%mat-sys-primary));\n}\n.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {\n  border-radius: var(--%NS%mat-button-filled-container-shape, var(--%NS%mat-sys-corner-full));\n}\n.mat-mdc-unelevated-button .mat-mdc-button-progress-indicator-container {\n  --%NS%mat-progress-spinner-active-indicator-color: var(--%NS%mat-button-filled-progress-active-indicator-color, var(--%NS%mat-sys-on-primary));\n}\n.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n  background-color: var(--%NS%mat-button-filled-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-raised-button {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: var(--%NS%mat-button-protected-container-elevation-shadow, var(--%NS%mat-sys-level1));\n  height: var(--%NS%mat-button-protected-container-height, 40px);\n  font-family: var(--%NS%mat-button-protected-label-text-font, var(--%NS%mat-sys-label-large-font));\n  font-size: var(--%NS%mat-button-protected-label-text-size, var(--%NS%mat-sys-label-large-size));\n  letter-spacing: var(--%NS%mat-button-protected-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));\n  text-transform: var(--%NS%mat-button-protected-label-text-transform);\n  font-weight: var(--%NS%mat-button-protected-label-text-weight, var(--%NS%mat-sys-label-large-weight));\n  padding: 0 var(--%NS%mat-button-protected-horizontal-padding, 24px);\n}\n.mat-mdc-raised-button > .mat-icon {\n  margin-right: var(--%NS%mat-button-protected-icon-spacing, 8px);\n  margin-left: var(--%NS%mat-button-protected-icon-offset, -8px);\n}\n[dir=rtl] .mat-mdc-raised-button > .mat-icon {\n  margin-right: var(--%NS%mat-button-protected-icon-offset, -8px);\n  margin-left: var(--%NS%mat-button-protected-icon-spacing, 8px);\n}\n.mat-mdc-raised-button .mdc-button__label + .mat-icon {\n  margin-right: var(--%NS%mat-button-protected-icon-offset, -8px);\n  margin-left: var(--%NS%mat-button-protected-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {\n  margin-right: var(--%NS%mat-button-protected-icon-spacing, 8px);\n  margin-left: var(--%NS%mat-button-protected-icon-offset, -8px);\n}\n.mat-mdc-raised-button .mat-ripple-element {\n  background-color: var(--%NS%mat-button-protected-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-button-protected-state-layer-color, var(--%NS%mat-sys-primary));\n}\n.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-button-protected-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-protected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-protected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-protected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-raised-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-button-protected-touch-target-size, 48px);\n  display: var(--%NS%mat-button-protected-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n.mat-mdc-raised-button:not(:disabled) {\n  color: var(--%NS%mat-button-protected-label-text-color, var(--%NS%mat-sys-primary));\n  background-color: var(--%NS%mat-button-protected-container-color, var(--%NS%mat-sys-surface));\n}\n.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {\n  border-radius: var(--%NS%mat-button-protected-container-shape, var(--%NS%mat-sys-corner-full));\n}\n@media (hover: hover) {\n  .mat-mdc-raised-button:hover {\n    box-shadow: var(--%NS%mat-button-protected-hover-container-elevation-shadow, var(--%NS%mat-sys-level2));\n  }\n}\n.mat-mdc-raised-button:focus {\n  box-shadow: var(--%NS%mat-button-protected-focus-container-elevation-shadow, var(--%NS%mat-sys-level1));\n}\n.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {\n  box-shadow: var(--%NS%mat-button-protected-pressed-container-elevation-shadow, var(--%NS%mat-sys-level1));\n}\n.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n  background-color: var(--%NS%mat-button-protected-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {\n  box-shadow: var(--%NS%mat-button-protected-disabled-container-elevation-shadow, var(--%NS%mat-sys-level0));\n}\n.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-outlined-button {\n  border-style: solid;\n  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  height: var(--%NS%mat-button-outlined-container-height, 40px);\n  font-family: var(--%NS%mat-button-outlined-label-text-font, var(--%NS%mat-sys-label-large-font));\n  font-size: var(--%NS%mat-button-outlined-label-text-size, var(--%NS%mat-sys-label-large-size));\n  letter-spacing: var(--%NS%mat-button-outlined-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));\n  text-transform: var(--%NS%mat-button-outlined-label-text-transform);\n  font-weight: var(--%NS%mat-button-outlined-label-text-weight, var(--%NS%mat-sys-label-large-weight));\n  border-radius: var(--%NS%mat-button-outlined-container-shape, var(--%NS%mat-sys-corner-full));\n  border-width: var(--%NS%mat-button-outlined-outline-width, 1px);\n  padding: 0 var(--%NS%mat-button-outlined-horizontal-padding, 24px);\n}\n.mat-mdc-outlined-button > .mat-icon {\n  margin-right: var(--%NS%mat-button-outlined-icon-spacing, 8px);\n  margin-left: var(--%NS%mat-button-outlined-icon-offset, -8px);\n}\n[dir=rtl] .mat-mdc-outlined-button > .mat-icon {\n  margin-right: var(--%NS%mat-button-outlined-icon-offset, -8px);\n  margin-left: var(--%NS%mat-button-outlined-icon-spacing, 8px);\n}\n.mat-mdc-outlined-button .mdc-button__label + .mat-icon {\n  margin-right: var(--%NS%mat-button-outlined-icon-offset, -8px);\n  margin-left: var(--%NS%mat-button-outlined-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {\n  margin-right: var(--%NS%mat-button-outlined-icon-spacing, 8px);\n  margin-left: var(--%NS%mat-button-outlined-icon-offset, -8px);\n}\n.mat-mdc-outlined-button .mat-ripple-element {\n  background-color: var(--%NS%mat-button-outlined-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-button-outlined-state-layer-color, var(--%NS%mat-sys-primary));\n}\n.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-button-outlined-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-outlined-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-outlined-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-outlined-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-outlined-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-button-outlined-touch-target-size, 48px);\n  display: var(--%NS%mat-button-outlined-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n.mat-mdc-outlined-button:not(:disabled) {\n  color: var(--%NS%mat-button-outlined-label-text-color, var(--%NS%mat-sys-primary));\n  border-color: var(--%NS%mat-button-outlined-outline-color, var(--%NS%mat-sys-outline));\n}\n.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n  border-color: var(--%NS%mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-tonal-button {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  height: var(--%NS%mat-button-tonal-container-height, 40px);\n  font-family: var(--%NS%mat-button-tonal-label-text-font, var(--%NS%mat-sys-label-large-font));\n  font-size: var(--%NS%mat-button-tonal-label-text-size, var(--%NS%mat-sys-label-large-size));\n  letter-spacing: var(--%NS%mat-button-tonal-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));\n  text-transform: var(--%NS%mat-button-tonal-label-text-transform);\n  font-weight: var(--%NS%mat-button-tonal-label-text-weight, var(--%NS%mat-sys-label-large-weight));\n  padding: 0 var(--%NS%mat-button-tonal-horizontal-padding, 24px);\n}\n.mat-tonal-button:not(:disabled) {\n  color: var(--%NS%mat-button-tonal-label-text-color, var(--%NS%mat-sys-on-secondary-container));\n  background-color: var(--%NS%mat-button-tonal-container-color, var(--%NS%mat-sys-secondary-container));\n}\n.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {\n  border-radius: var(--%NS%mat-button-tonal-container-shape, var(--%NS%mat-sys-corner-full));\n}\n.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n  background-color: var(--%NS%mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));\n}\n.mat-tonal-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-tonal-button > .mat-icon {\n  margin-right: var(--%NS%mat-button-tonal-icon-spacing, 8px);\n  margin-left: var(--%NS%mat-button-tonal-icon-offset, -8px);\n}\n[dir=rtl] .mat-tonal-button > .mat-icon {\n  margin-right: var(--%NS%mat-button-tonal-icon-offset, -8px);\n  margin-left: var(--%NS%mat-button-tonal-icon-spacing, 8px);\n}\n.mat-tonal-button .mdc-button__label + .mat-icon {\n  margin-right: var(--%NS%mat-button-tonal-icon-offset, -8px);\n  margin-left: var(--%NS%mat-button-tonal-icon-spacing, 8px);\n}\n[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {\n  margin-right: var(--%NS%mat-button-tonal-icon-spacing, 8px);\n  margin-left: var(--%NS%mat-button-tonal-icon-offset, -8px);\n}\n.mat-tonal-button .mat-ripple-element {\n  background-color: var(--%NS%mat-button-tonal-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-secondary-container) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-tonal-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-button-tonal-state-layer-color, var(--%NS%mat-sys-on-secondary-container));\n}\n.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-button-tonal-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-tonal-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-tonal-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-button-tonal-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n.mat-tonal-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-button-tonal-touch-target-size, 48px);\n  display: var(--%NS%mat-button-tonal-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n\n.mat-mdc-button,\n.mat-mdc-unelevated-button,\n.mat-mdc-raised-button,\n.mat-mdc-outlined-button,\n.mat-tonal-button {\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-button .mat-mdc-button-ripple,\n.mat-mdc-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-unelevated-button .mat-mdc-button-ripple,\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-raised-button .mat-mdc-button-ripple,\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-outlined-button .mat-mdc-button-ripple,\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,\n.mat-tonal-button .mat-mdc-button-ripple,\n.mat-tonal-button .mat-mdc-button-persistent-ripple,\n.mat-tonal-button .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-button .mat-mdc-button-ripple,\n.mat-mdc-unelevated-button .mat-mdc-button-ripple,\n.mat-mdc-raised-button .mat-mdc-button-ripple,\n.mat-mdc-outlined-button .mat-mdc-button-ripple,\n.mat-tonal-button .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,\n.mat-tonal-button .mat-mdc-button-persistent-ripple::before {\n  content: "";\n  opacity: 0;\n}\n.mat-mdc-button .mdc-button__label,\n.mat-mdc-button .mat-icon,\n.mat-mdc-unelevated-button .mdc-button__label,\n.mat-mdc-unelevated-button .mat-icon,\n.mat-mdc-raised-button .mdc-button__label,\n.mat-mdc-raised-button .mat-icon,\n.mat-mdc-outlined-button .mdc-button__label,\n.mat-mdc-outlined-button .mat-icon,\n.mat-tonal-button .mdc-button__label,\n.mat-tonal-button .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-button .mat-focus-indicator,\n.mat-mdc-unelevated-button .mat-focus-indicator,\n.mat-mdc-raised-button .mat-focus-indicator,\n.mat-mdc-outlined-button .mat-focus-indicator,\n.mat-tonal-button .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  border-radius: inherit;\n}\n.mat-mdc-button:focus-visible > .mat-focus-indicator::before,\n.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,\n.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,\n.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,\n.mat-tonal-button:focus-visible > .mat-focus-indicator::before {\n  content: "";\n  border-radius: inherit;\n}\n.mat-mdc-button._mat-animation-noopable,\n.mat-mdc-unelevated-button._mat-animation-noopable,\n.mat-mdc-raised-button._mat-animation-noopable,\n.mat-mdc-outlined-button._mat-animation-noopable,\n.mat-tonal-button._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-button > .mat-icon,\n.mat-mdc-unelevated-button > .mat-icon,\n.mat-mdc-raised-button > .mat-icon,\n.mat-mdc-outlined-button > .mat-icon,\n.mat-tonal-button > .mat-icon {\n  display: inline-block;\n  position: relative;\n  vertical-align: top;\n  font-size: 1.125rem;\n  height: 1.125rem;\n  width: 1.125rem;\n}\n\n.mat-mdc-outlined-button .mat-mdc-button-ripple,\n.mat-mdc-outlined-button .mdc-button__ripple {\n  top: -1px;\n  left: -1px;\n  bottom: -1px;\n  right: -1px;\n}\n\n.mat-mdc-unelevated-button .mat-focus-indicator::before,\n.mat-tonal-button .mat-focus-indicator::before,\n.mat-mdc-raised-button .mat-focus-indicator::before {\n  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px) * -1);\n}\n\n.mat-mdc-outlined-button .mat-focus-indicator::before {\n  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 3px) * -1);\n}\n\n.mat-mdc-button-progress-indicator-container {\n  position: absolute;\n  inset-inline-start: 0;\n  inset-block-start: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n\n.mat-mdc-button-progress-indicator-shown mat-icon,\n.mat-mdc-button-progress-indicator-shown [matButtonIcon],\n.mat-mdc-button-progress-indicator-shown .mdc-button__label {\n  visibility: hidden;\n}\n', "@media (forced-colors: active) {\n  .mat-mdc-button:not(.mdc-button--outlined),\n  .mat-mdc-unelevated-button:not(.mdc-button--outlined),\n  .mat-mdc-raised-button:not(.mdc-button--outlined),\n  .mat-mdc-outlined-button:not(.mdc-button--outlined),\n  .mat-mdc-button-base.mat-tonal-button,\n  .mat-mdc-icon-button.mat-mdc-icon-button,\n  .mat-mdc-outlined-button .mdc-button__ripple {\n    outline: solid 1px;\n  }\n}\n"],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatButton, [{
    type: Component,
    args: [{
      selector: `
    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],
    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],
    a[mat-flat-button], a[mat-stroked-button]
  `,
      host: {
        "class": "mdc-button"
      },
      exportAs: "matButton, matAnchor",
      encapsulation: ViewEncapsulation.None,
      template: `<span
  class="mat-mdc-button-persistent-ripple"
  [class.mdc-button__ripple]="!_isFab"
  [class.mdc-fab__ripple]="_isFab"
></span>

<ng-content
  select=".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd]), .material-symbols-outlined:not([iconPositionEnd]), .material-symbols-rounded:not([iconPositionEnd]), .material-symbols-sharp:not([iconPositionEnd])"
>
</ng-content>

<span class="mdc-button__label"><ng-content></ng-content></span>

<ng-content
  select=".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd], .material-symbols-outlined[iconPositionEnd], .material-symbols-rounded[iconPositionEnd], .material-symbols-sharp[iconPositionEnd]"
>
</ng-content>

@if (showProgress()) {
  <div class="mat-mdc-button-progress-indicator-container">
    <ng-content select="[progressIndicator]" />
  </div>
}

<!--
  The indicator can't be directly on the button, because MDC uses ::before for high contrast
  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.
-->
<span class="mat-focus-indicator"></span>

<span class="mat-mdc-button-touch-target"></span>
`,
      styles: ['.mat-mdc-button-base {\n  text-decoration: none;\n}\n.mat-mdc-button-base .mat-icon {\n  min-height: fit-content;\n  flex-shrink: 0;\n}\n@media (hover: none) {\n  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {\n    opacity: 0;\n  }\n}\n\n.mdc-button {\n  -webkit-user-select: none;\n  user-select: none;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  min-width: 64px;\n  border: none;\n  outline: none;\n  line-height: inherit;\n  -webkit-appearance: none;\n  overflow: visible;\n  vertical-align: middle;\n  background: transparent;\n  padding: 0 8px;\n}\n.mdc-button::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n.mdc-button:active {\n  outline: none;\n}\n.mdc-button:hover {\n  cursor: pointer;\n}\n.mdc-button:disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mdc-button[hidden] {\n  display: none;\n}\n.mdc-button .mdc-button__label {\n  position: relative;\n}\n\n.mat-mdc-button {\n  padding: 0 var(--mat-button-text-horizontal-padding, 12px);\n  height: var(--mat-button-text-container-height, 40px);\n  font-family: var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));\n  letter-spacing: var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));\n  text-transform: var(--mat-button-text-label-text-transform);\n  font-weight: var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight));\n}\n.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {\n  border-radius: var(--mat-button-text-container-shape, var(--mat-sys-corner-full));\n}\n.mat-mdc-button:not(:disabled) {\n  color: var(--mat-button-text-label-text-color, var(--mat-sys-primary));\n}\n.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-mdc-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-button:has(.material-icons, .material-symbols-outlined, .material-symbols-rounded,\n.material-symbols-sharp, mat-icon, [matButtonIcon]) {\n  padding: 0 var(--mat-button-text-with-icon-horizontal-padding, 16px);\n}\n.mat-mdc-button > .mat-icon {\n  margin-right: var(--mat-button-text-icon-spacing, 8px);\n  margin-left: var(--mat-button-text-icon-offset, -4px);\n}\n[dir=rtl] .mat-mdc-button > .mat-icon {\n  margin-right: var(--mat-button-text-icon-offset, -4px);\n  margin-left: var(--mat-button-text-icon-spacing, 8px);\n}\n.mat-mdc-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-text-icon-offset, -4px);\n  margin-left: var(--mat-button-text-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-text-icon-spacing, 8px);\n  margin-left: var(--mat-button-text-icon-offset, -4px);\n}\n.mat-mdc-button .mat-ripple-element {\n  background-color: var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-text-state-layer-color, var(--mat-sys-primary));\n}\n.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-button-text-touch-target-size, 48px);\n  display: var(--mat-button-text-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n\n.mat-mdc-unelevated-button {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  height: var(--mat-button-filled-container-height, 40px);\n  font-family: var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));\n  letter-spacing: var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));\n  text-transform: var(--mat-button-filled-label-text-transform);\n  font-weight: var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));\n  padding: 0 var(--mat-button-filled-horizontal-padding, 24px);\n}\n.mat-mdc-unelevated-button > .mat-icon {\n  margin-right: var(--mat-button-filled-icon-spacing, 8px);\n  margin-left: var(--mat-button-filled-icon-offset, -8px);\n}\n[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {\n  margin-right: var(--mat-button-filled-icon-offset, -8px);\n  margin-left: var(--mat-button-filled-icon-spacing, 8px);\n}\n.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-filled-icon-offset, -8px);\n  margin-left: var(--mat-button-filled-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-filled-icon-spacing, 8px);\n  margin-left: var(--mat-button-filled-icon-offset, -8px);\n}\n.mat-mdc-unelevated-button .mat-ripple-element {\n  background-color: var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary));\n}\n.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-unelevated-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-button-filled-touch-target-size, 48px);\n  display: var(--mat-button-filled-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n.mat-mdc-unelevated-button:not(:disabled) {\n  color: var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));\n  background-color: var(--mat-button-filled-container-color, var(--mat-sys-primary));\n}\n.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {\n  border-radius: var(--mat-button-filled-container-shape, var(--mat-sys-corner-full));\n}\n.mat-mdc-unelevated-button .mat-mdc-button-progress-indicator-container {\n  --mat-progress-spinner-active-indicator-color: var(--mat-button-filled-progress-active-indicator-color, var(--mat-sys-on-primary));\n}\n.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-raised-button {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));\n  height: var(--mat-button-protected-container-height, 40px);\n  font-family: var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));\n  letter-spacing: var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));\n  text-transform: var(--mat-button-protected-label-text-transform);\n  font-weight: var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));\n  padding: 0 var(--mat-button-protected-horizontal-padding, 24px);\n}\n.mat-mdc-raised-button > .mat-icon {\n  margin-right: var(--mat-button-protected-icon-spacing, 8px);\n  margin-left: var(--mat-button-protected-icon-offset, -8px);\n}\n[dir=rtl] .mat-mdc-raised-button > .mat-icon {\n  margin-right: var(--mat-button-protected-icon-offset, -8px);\n  margin-left: var(--mat-button-protected-icon-spacing, 8px);\n}\n.mat-mdc-raised-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-protected-icon-offset, -8px);\n  margin-left: var(--mat-button-protected-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-protected-icon-spacing, 8px);\n  margin-left: var(--mat-button-protected-icon-offset, -8px);\n}\n.mat-mdc-raised-button .mat-ripple-element {\n  background-color: var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-protected-state-layer-color, var(--mat-sys-primary));\n}\n.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-raised-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-button-protected-touch-target-size, 48px);\n  display: var(--mat-button-protected-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n.mat-mdc-raised-button:not(:disabled) {\n  color: var(--mat-button-protected-label-text-color, var(--mat-sys-primary));\n  background-color: var(--mat-button-protected-container-color, var(--mat-sys-surface));\n}\n.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {\n  border-radius: var(--mat-button-protected-container-shape, var(--mat-sys-corner-full));\n}\n@media (hover: hover) {\n  .mat-mdc-raised-button:hover {\n    box-shadow: var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2));\n  }\n}\n.mat-mdc-raised-button:focus {\n  box-shadow: var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1));\n}\n.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {\n  box-shadow: var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1));\n}\n.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {\n  box-shadow: var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0));\n}\n.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-outlined-button {\n  border-style: solid;\n  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  height: var(--mat-button-outlined-container-height, 40px);\n  font-family: var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));\n  letter-spacing: var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));\n  text-transform: var(--mat-button-outlined-label-text-transform);\n  font-weight: var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));\n  border-radius: var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));\n  border-width: var(--mat-button-outlined-outline-width, 1px);\n  padding: 0 var(--mat-button-outlined-horizontal-padding, 24px);\n}\n.mat-mdc-outlined-button > .mat-icon {\n  margin-right: var(--mat-button-outlined-icon-spacing, 8px);\n  margin-left: var(--mat-button-outlined-icon-offset, -8px);\n}\n[dir=rtl] .mat-mdc-outlined-button > .mat-icon {\n  margin-right: var(--mat-button-outlined-icon-offset, -8px);\n  margin-left: var(--mat-button-outlined-icon-spacing, 8px);\n}\n.mat-mdc-outlined-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-outlined-icon-offset, -8px);\n  margin-left: var(--mat-button-outlined-icon-spacing, 8px);\n}\n[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-outlined-icon-spacing, 8px);\n  margin-left: var(--mat-button-outlined-icon-offset, -8px);\n}\n.mat-mdc-outlined-button .mat-ripple-element {\n  background-color: var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary));\n}\n.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-mdc-outlined-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-button-outlined-touch-target-size, 48px);\n  display: var(--mat-button-outlined-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n.mat-mdc-outlined-button:not(:disabled) {\n  color: var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));\n  border-color: var(--mat-button-outlined-outline-color, var(--mat-sys-outline));\n}\n.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  border-color: var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-tonal-button {\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  height: var(--mat-button-tonal-container-height, 40px);\n  font-family: var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));\n  letter-spacing: var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));\n  text-transform: var(--mat-button-tonal-label-text-transform);\n  font-weight: var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));\n  padding: 0 var(--mat-button-tonal-horizontal-padding, 24px);\n}\n.mat-tonal-button:not(:disabled) {\n  color: var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));\n  background-color: var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container));\n}\n.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {\n  border-radius: var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full));\n}\n.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-tonal-button.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-tonal-button > .mat-icon {\n  margin-right: var(--mat-button-tonal-icon-spacing, 8px);\n  margin-left: var(--mat-button-tonal-icon-offset, -8px);\n}\n[dir=rtl] .mat-tonal-button > .mat-icon {\n  margin-right: var(--mat-button-tonal-icon-offset, -8px);\n  margin-left: var(--mat-button-tonal-icon-spacing, 8px);\n}\n.mat-tonal-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-tonal-icon-offset, -8px);\n  margin-left: var(--mat-button-tonal-icon-spacing, 8px);\n}\n[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {\n  margin-right: var(--mat-button-tonal-icon-spacing, 8px);\n  margin-left: var(--mat-button-tonal-icon-offset, -8px);\n}\n.mat-tonal-button .mat-ripple-element {\n  background-color: var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-tonal-button .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container));\n}\n.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant));\n}\n.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n.mat-tonal-button .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-button-tonal-touch-target-size, 48px);\n  display: var(--mat-button-tonal-touch-target-display, block);\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n}\n\n.mat-mdc-button,\n.mat-mdc-unelevated-button,\n.mat-mdc-raised-button,\n.mat-mdc-outlined-button,\n.mat-tonal-button {\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-button .mat-mdc-button-ripple,\n.mat-mdc-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-unelevated-button .mat-mdc-button-ripple,\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-raised-button .mat-mdc-button-ripple,\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-outlined-button .mat-mdc-button-ripple,\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,\n.mat-tonal-button .mat-mdc-button-ripple,\n.mat-tonal-button .mat-mdc-button-persistent-ripple,\n.mat-tonal-button .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-button .mat-mdc-button-ripple,\n.mat-mdc-unelevated-button .mat-mdc-button-ripple,\n.mat-mdc-raised-button .mat-mdc-button-ripple,\n.mat-mdc-outlined-button .mat-mdc-button-ripple,\n.mat-tonal-button .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,\n.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,\n.mat-tonal-button .mat-mdc-button-persistent-ripple::before {\n  content: "";\n  opacity: 0;\n}\n.mat-mdc-button .mdc-button__label,\n.mat-mdc-button .mat-icon,\n.mat-mdc-unelevated-button .mdc-button__label,\n.mat-mdc-unelevated-button .mat-icon,\n.mat-mdc-raised-button .mdc-button__label,\n.mat-mdc-raised-button .mat-icon,\n.mat-mdc-outlined-button .mdc-button__label,\n.mat-mdc-outlined-button .mat-icon,\n.mat-tonal-button .mdc-button__label,\n.mat-tonal-button .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-button .mat-focus-indicator,\n.mat-mdc-unelevated-button .mat-focus-indicator,\n.mat-mdc-raised-button .mat-focus-indicator,\n.mat-mdc-outlined-button .mat-focus-indicator,\n.mat-tonal-button .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  border-radius: inherit;\n}\n.mat-mdc-button:focus-visible > .mat-focus-indicator::before,\n.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,\n.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,\n.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,\n.mat-tonal-button:focus-visible > .mat-focus-indicator::before {\n  content: "";\n  border-radius: inherit;\n}\n.mat-mdc-button._mat-animation-noopable,\n.mat-mdc-unelevated-button._mat-animation-noopable,\n.mat-mdc-raised-button._mat-animation-noopable,\n.mat-mdc-outlined-button._mat-animation-noopable,\n.mat-tonal-button._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-button > .mat-icon,\n.mat-mdc-unelevated-button > .mat-icon,\n.mat-mdc-raised-button > .mat-icon,\n.mat-mdc-outlined-button > .mat-icon,\n.mat-tonal-button > .mat-icon {\n  display: inline-block;\n  position: relative;\n  vertical-align: top;\n  font-size: 1.125rem;\n  height: 1.125rem;\n  width: 1.125rem;\n}\n\n.mat-mdc-outlined-button .mat-mdc-button-ripple,\n.mat-mdc-outlined-button .mdc-button__ripple {\n  top: -1px;\n  left: -1px;\n  bottom: -1px;\n  right: -1px;\n}\n\n.mat-mdc-unelevated-button .mat-focus-indicator::before,\n.mat-tonal-button .mat-focus-indicator::before,\n.mat-mdc-raised-button .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);\n}\n\n.mat-mdc-outlined-button .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);\n}\n\n.mat-mdc-button-progress-indicator-container {\n  position: absolute;\n  inset-inline-start: 0;\n  inset-block-start: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n\n.mat-mdc-button-progress-indicator-shown mat-icon,\n.mat-mdc-button-progress-indicator-shown [matButtonIcon],\n.mat-mdc-button-progress-indicator-shown .mdc-button__label {\n  visibility: hidden;\n}\n', "@media (forced-colors: active) {\n  .mat-mdc-button:not(.mdc-button--outlined),\n  .mat-mdc-unelevated-button:not(.mdc-button--outlined),\n  .mat-mdc-raised-button:not(.mdc-button--outlined),\n  .mat-mdc-outlined-button:not(.mdc-button--outlined),\n  .mat-mdc-button-base.mat-tonal-button,\n  .mat-mdc-icon-button.mat-mdc-icon-button,\n  .mat-mdc-outlined-button .mdc-button__ripple {\n    outline: solid 1px;\n  }\n}\n"]
    }]
  }], () => [], {
    appearance: [{
      type: Input,
      args: ["matButton"]
    }]
  });
})();
function _inferAppearance(button) {
  if (button.hasAttribute("mat-raised-button")) {
    return "elevated";
  }
  if (button.hasAttribute("mat-stroked-button")) {
    return "outlined";
  }
  if (button.hasAttribute("mat-flat-button")) {
    return "filled";
  }
  if (button.hasAttribute("mat-button")) {
    return "text";
  }
  return null;
}
var MAT_FAB_DEFAULT_OPTIONS = new InjectionToken("mat-mdc-fab-default-options", {
  providedIn: "root",
  factory: () => defaults
});
var defaults = {
  color: "accent"
};
var MatFabButton = class _MatFabButton extends MatButtonBase {
  _options = inject(MAT_FAB_DEFAULT_OPTIONS, {
    optional: true
  });
  _isFab = true;
  extended = false;
  constructor() {
    super();
    this._options = this._options || defaults;
    this.color = this._options.color || defaults.color;
  }
  static \u0275fac = function MatFabButton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatFabButton)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    const _c0 = [[["", 8, "material-icons", 3, "iconPositionEnd", ""], ["mat-icon", 3, "iconPositionEnd", ""], ["", "matButtonIcon", "", 3, "iconPositionEnd", ""], ["", 8, "material-symbols-outlined", 3, "iconPositionEnd", ""], ["", 8, "material-symbols-rounded", 3, "iconPositionEnd", ""], ["", 8, "material-symbols-sharp", 3, "iconPositionEnd", ""]], "*", [["", "iconPositionEnd", "", 8, "material-icons"], ["mat-icon", "iconPositionEnd", ""], ["", "matButtonIcon", "", "iconPositionEnd", ""], ["", "iconPositionEnd", "", 8, "material-symbols-outlined"], ["", "iconPositionEnd", "", 8, "material-symbols-rounded"], ["", "iconPositionEnd", "", 8, "material-symbols-sharp"]], [["", "progressIndicator", ""]]];
    const _c1 = [".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd]), .material-symbols-outlined:not([iconPositionEnd]), .material-symbols-rounded:not([iconPositionEnd]), .material-symbols-sharp:not([iconPositionEnd])", "*", ".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd], .material-symbols-outlined[iconPositionEnd], .material-symbols-rounded[iconPositionEnd], .material-symbols-sharp[iconPositionEnd]", "[progressIndicator]"];
    function MatFabButton_Conditional_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "div", 2);
        \u0275\u0275projection(1, 3);
        \u0275\u0275domElementEnd();
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatFabButton,
      selectors: [["button", "mat-fab", ""], ["a", "mat-fab", ""], ["button", "matFab", ""], ["a", "matFab", ""]],
      hostAttrs: [1, "mdc-fab", "mat-mdc-fab-base", "mat-mdc-fab"],
      hostVars: 4,
      hostBindings: function MatFabButton_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275classProp("mdc-fab--extended", ctx.extended)("mat-mdc-extended-fab", ctx.extended);
        }
      },
      inputs: {
        extended: [2, "extended", "extended", booleanAttribute]
      },
      exportAs: ["matButton", "matAnchor"],
      features: [\u0275\u0275InheritDefinitionFeature],
      ngContentSelectors: _c1,
      decls: 8,
      vars: 5,
      consts: [[1, "mat-mdc-button-persistent-ripple"], [1, "mdc-button__label"], [1, "mat-mdc-button-progress-indicator-container"], [1, "mat-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
      template: function MatFabButton_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef(_c0);
          \u0275\u0275domElement(0, "span", 0);
          \u0275\u0275projection(1);
          \u0275\u0275domElementStart(2, "span", 1);
          \u0275\u0275projection(3, 1);
          \u0275\u0275domElementEnd();
          \u0275\u0275projection(4, 2);
          \u0275\u0275conditionalCreate(5, MatFabButton_Conditional_5_Template, 2, 0, "div", 2);
          \u0275\u0275domElement(6, "span", 3)(7, "span", 4);
        }
        if (rf & 2) {
          \u0275\u0275classProp("mdc-button__ripple", !ctx._isFab)("mdc-fab__ripple", ctx._isFab);
          \u0275\u0275advance(5);
          \u0275\u0275conditional(ctx.showProgress() ? 5 : -1);
        }
      },
      styles: ['.mat-mdc-fab-base {\n  -webkit-user-select: none;\n  user-select: none;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  width: 56px;\n  height: 56px;\n  padding: 0;\n  border: none;\n  fill: currentColor;\n  text-decoration: none;\n  cursor: pointer;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  overflow: visible;\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  flex-shrink: 0;\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  content: "";\n  opacity: 0;\n}\n.mat-mdc-fab-base .mdc-button__label,\n.mat-mdc-fab-base .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-fab-base .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n}\n.mat-mdc-fab-base:focus-visible > .mat-focus-indicator::before {\n  content: "";\n}\n.mat-mdc-fab-base._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-fab-base::before {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border: 1px solid transparent;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n}\n.mat-mdc-fab-base[hidden] {\n  display: none;\n}\n.mat-mdc-fab-base::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n.mat-mdc-fab-base:active, .mat-mdc-fab-base:focus {\n  outline: none;\n}\n.mat-mdc-fab-base:hover {\n  cursor: pointer;\n}\n.mat-mdc-fab-base > svg {\n  width: 100%;\n}\n.mat-mdc-fab-base .mat-icon,\n.mat-mdc-fab-base .material-icons,\n.mat-mdc-fab-base .material-symbols-outlined,\n.mat-mdc-fab-base .material-symbols-rounded,\n.mat-mdc-fab-base .material-symbols-sharp {\n  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);\n  fill: currentColor;\n  will-change: transform;\n}\n.mat-mdc-fab-base .mat-focus-indicator::before {\n  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px) * -1);\n  border-radius: calc(var(--%NS%mat-fab-container-shape, var(--%NS%mat-sys-corner-large)) + calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px));\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base[disabled]:focus, .mat-mdc-fab-base.mat-mdc-button-disabled, .mat-mdc-fab-base.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-fab-base.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-fab {\n  background-color: var(--%NS%mat-fab-container-color, var(--%NS%mat-sys-primary-container));\n  border-radius: var(--%NS%mat-fab-container-shape, var(--%NS%mat-sys-corner-large));\n  color: var(--%NS%mat-fab-foreground-color, var(--%NS%mat-sys-on-primary-container, inherit));\n  box-shadow: var(--%NS%mat-fab-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-fab:hover {\n    box-shadow: var(--%NS%mat-fab-hover-container-elevation-shadow, var(--%NS%mat-sys-level4));\n  }\n}\n.mat-mdc-fab:focus {\n  box-shadow: var(--%NS%mat-fab-focus-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-fab:active, .mat-mdc-fab:focus:active {\n  box-shadow: var(--%NS%mat-fab-pressed-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-fab[disabled], .mat-mdc-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n  background-color: var(--%NS%mat-fab-disabled-state-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-fab-touch-target-size, 48px);\n  display: var(--%NS%mat-fab-touch-target-display, block);\n  left: 50%;\n  width: var(--%NS%mat-fab-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-fab .mat-ripple-element {\n  background-color: var(--%NS%mat-fab-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-primary-container) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-fab-state-layer-color, var(--%NS%mat-sys-on-primary-container));\n}\n.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-fab-disabled-state-layer-color);\n}\n.mat-mdc-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-mini-fab {\n  width: 40px;\n  height: 40px;\n  background-color: var(--%NS%mat-fab-small-container-color, var(--%NS%mat-sys-primary-container));\n  border-radius: var(--%NS%mat-fab-small-container-shape, var(--%NS%mat-sys-corner-medium));\n  color: var(--%NS%mat-fab-small-foreground-color, var(--%NS%mat-sys-on-primary-container, inherit));\n  box-shadow: var(--%NS%mat-fab-small-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-mini-fab:hover {\n    box-shadow: var(--%NS%mat-fab-small-hover-container-elevation-shadow, var(--%NS%mat-sys-level4));\n  }\n}\n.mat-mdc-mini-fab:focus {\n  box-shadow: var(--%NS%mat-fab-small-focus-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-mini-fab:active, .mat-mdc-mini-fab:focus:active {\n  box-shadow: var(--%NS%mat-fab-small-pressed-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-mini-fab .mat-focus-indicator::before {\n  border-radius: calc(var(--%NS%mat-fab-small-container-shape, var(--%NS%mat-sys-corner-medium)) + calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px));\n}\n.mat-mdc-mini-fab[disabled], .mat-mdc-mini-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n  background-color: var(--%NS%mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-mini-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-fab-small-touch-target-size, 48px);\n  display: var(--%NS%mat-fab-small-touch-target-display);\n  left: 50%;\n  width: var(--%NS%mat-fab-small-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-mini-fab .mat-ripple-element {\n  background-color: var(--%NS%mat-fab-small-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-primary-container) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-fab-small-state-layer-color, var(--%NS%mat-sys-on-primary-container));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-fab-small-disabled-state-layer-color);\n}\n.mat-mdc-mini-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-small-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-mini-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-small-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-mini-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-small-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-extended-fab {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  padding-left: 20px;\n  padding-right: 20px;\n  width: auto;\n  max-width: 100%;\n  line-height: normal;\n  box-shadow: var(--%NS%mat-fab-extended-container-elevation-shadow, var(--%NS%mat-sys-level3));\n  height: var(--%NS%mat-fab-extended-container-height, 56px);\n  border-radius: var(--%NS%mat-fab-extended-container-shape, var(--%NS%mat-sys-corner-large));\n  font-family: var(--%NS%mat-fab-extended-label-text-font, var(--%NS%mat-sys-label-large-font));\n  font-size: var(--%NS%mat-fab-extended-label-text-size, var(--%NS%mat-sys-label-large-size));\n  font-weight: var(--%NS%mat-fab-extended-label-text-weight, var(--%NS%mat-sys-label-large-weight));\n  letter-spacing: var(--%NS%mat-fab-extended-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));\n}\n@media (hover: hover) {\n  .mat-mdc-extended-fab:hover {\n    box-shadow: var(--%NS%mat-fab-extended-hover-container-elevation-shadow, var(--%NS%mat-sys-level4));\n  }\n}\n.mat-mdc-extended-fab:focus {\n  box-shadow: var(--%NS%mat-fab-extended-focus-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-extended-fab:active, .mat-mdc-extended-fab:focus:active {\n  box-shadow: var(--%NS%mat-fab-extended-pressed-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab[disabled]:focus, .mat-mdc-extended-fab.mat-mdc-button-disabled, .mat-mdc-extended-fab.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n[dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .mat-icon, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-icons, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-outlined, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-rounded, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-sharp,\n.mat-mdc-extended-fab > .mat-icon,\n.mat-mdc-extended-fab > .material-icons,\n.mat-mdc-extended-fab > .material-symbols-outlined,\n.mat-mdc-extended-fab > .material-symbols-rounded,\n.mat-mdc-extended-fab > .material-symbols-sharp {\n  margin-left: -8px;\n  margin-right: 12px;\n}\n.mat-mdc-extended-fab .mdc-button__label + .mat-icon,\n.mat-mdc-extended-fab .mdc-button__label + .material-icons,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-outlined,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-rounded,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-sharp, [dir=rtl] .mat-mdc-extended-fab > .mat-icon, [dir=rtl] .mat-mdc-extended-fab > .material-icons, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-outlined, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-rounded, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-sharp {\n  margin-left: 12px;\n  margin-right: -8px;\n}\n.mat-mdc-extended-fab .mat-mdc-button-touch-target {\n  width: 100%;\n}\n\n.mat-mdc-button-progress-indicator-container {\n  position: absolute;\n  inset-inline-start: 0;\n  margin-block-start: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n\n.mat-mdc-button-progress-indicator-shown mat-icon,\n.mat-mdc-button-progress-indicator-shown [matButtonIcon],\n.mat-mdc-button-progress-indicator-shown .mdc-button__label {\n  visibility: hidden;\n}\n'],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFabButton, [{
    type: Component,
    args: [{
      selector: `button[mat-fab], a[mat-fab], button[matFab], a[matFab]`,
      host: {
        "class": "mdc-fab mat-mdc-fab-base mat-mdc-fab",
        "[class.mdc-fab--extended]": "extended",
        "[class.mat-mdc-extended-fab]": "extended"
      },
      exportAs: "matButton, matAnchor",
      encapsulation: ViewEncapsulation.None,
      template: `<span
  class="mat-mdc-button-persistent-ripple"
  [class.mdc-button__ripple]="!_isFab"
  [class.mdc-fab__ripple]="_isFab"
></span>

<ng-content
  select=".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd]), .material-symbols-outlined:not([iconPositionEnd]), .material-symbols-rounded:not([iconPositionEnd]), .material-symbols-sharp:not([iconPositionEnd])"
>
</ng-content>

<span class="mdc-button__label"><ng-content></ng-content></span>

<ng-content
  select=".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd], .material-symbols-outlined[iconPositionEnd], .material-symbols-rounded[iconPositionEnd], .material-symbols-sharp[iconPositionEnd]"
>
</ng-content>

@if (showProgress()) {
  <div class="mat-mdc-button-progress-indicator-container">
    <ng-content select="[progressIndicator]" />
  </div>
}

<!--
  The indicator can't be directly on the button, because MDC uses ::before for high contrast
  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.
-->
<span class="mat-focus-indicator"></span>

<span class="mat-mdc-button-touch-target"></span>
`,
      styles: ['.mat-mdc-fab-base {\n  -webkit-user-select: none;\n  user-select: none;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  width: 56px;\n  height: 56px;\n  padding: 0;\n  border: none;\n  fill: currentColor;\n  text-decoration: none;\n  cursor: pointer;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  overflow: visible;\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  flex-shrink: 0;\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  content: "";\n  opacity: 0;\n}\n.mat-mdc-fab-base .mdc-button__label,\n.mat-mdc-fab-base .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-fab-base .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n}\n.mat-mdc-fab-base:focus-visible > .mat-focus-indicator::before {\n  content: "";\n}\n.mat-mdc-fab-base._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-fab-base::before {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border: 1px solid transparent;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n}\n.mat-mdc-fab-base[hidden] {\n  display: none;\n}\n.mat-mdc-fab-base::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n.mat-mdc-fab-base:active, .mat-mdc-fab-base:focus {\n  outline: none;\n}\n.mat-mdc-fab-base:hover {\n  cursor: pointer;\n}\n.mat-mdc-fab-base > svg {\n  width: 100%;\n}\n.mat-mdc-fab-base .mat-icon,\n.mat-mdc-fab-base .material-icons,\n.mat-mdc-fab-base .material-symbols-outlined,\n.mat-mdc-fab-base .material-symbols-rounded,\n.mat-mdc-fab-base .material-symbols-sharp {\n  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);\n  fill: currentColor;\n  will-change: transform;\n}\n.mat-mdc-fab-base .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);\n  border-radius: calc(var(--mat-fab-container-shape, var(--mat-sys-corner-large)) + calc(var(--mat-focus-indicator-border-width, 3px) + 2px));\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base[disabled]:focus, .mat-mdc-fab-base.mat-mdc-button-disabled, .mat-mdc-fab-base.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-fab-base.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-fab {\n  background-color: var(--mat-fab-container-color, var(--mat-sys-primary-container));\n  border-radius: var(--mat-fab-container-shape, var(--mat-sys-corner-large));\n  color: var(--mat-fab-foreground-color, var(--mat-sys-on-primary-container, inherit));\n  box-shadow: var(--mat-fab-container-elevation-shadow, var(--mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-fab:hover {\n    box-shadow: var(--mat-fab-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-fab:focus {\n  box-shadow: var(--mat-fab-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-fab:active, .mat-mdc-fab:focus:active {\n  box-shadow: var(--mat-fab-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-fab[disabled], .mat-mdc-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-fab-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-fab-touch-target-size, 48px);\n  display: var(--mat-fab-touch-target-display, block);\n  left: 50%;\n  width: var(--mat-fab-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-fab .mat-ripple-element {\n  background-color: var(--mat-fab-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container));\n}\n.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-disabled-state-layer-color);\n}\n.mat-mdc-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-mini-fab {\n  width: 40px;\n  height: 40px;\n  background-color: var(--mat-fab-small-container-color, var(--mat-sys-primary-container));\n  border-radius: var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium));\n  color: var(--mat-fab-small-foreground-color, var(--mat-sys-on-primary-container, inherit));\n  box-shadow: var(--mat-fab-small-container-elevation-shadow, var(--mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-mini-fab:hover {\n    box-shadow: var(--mat-fab-small-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-mini-fab:focus {\n  box-shadow: var(--mat-fab-small-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-mini-fab:active, .mat-mdc-mini-fab:focus:active {\n  box-shadow: var(--mat-fab-small-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-mini-fab .mat-focus-indicator::before {\n  border-radius: calc(var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium)) + calc(var(--mat-focus-indicator-border-width, 3px) + 2px));\n}\n.mat-mdc-mini-fab[disabled], .mat-mdc-mini-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-mini-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-fab-small-touch-target-size, 48px);\n  display: var(--mat-fab-small-touch-target-display);\n  left: 50%;\n  width: var(--mat-fab-small-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-mini-fab .mat-ripple-element {\n  background-color: var(--mat-fab-small-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-small-state-layer-color, var(--mat-sys-on-primary-container));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-small-disabled-state-layer-color);\n}\n.mat-mdc-mini-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-mini-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-mini-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-extended-fab {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  padding-left: 20px;\n  padding-right: 20px;\n  width: auto;\n  max-width: 100%;\n  line-height: normal;\n  box-shadow: var(--mat-fab-extended-container-elevation-shadow, var(--mat-sys-level3));\n  height: var(--mat-fab-extended-container-height, 56px);\n  border-radius: var(--mat-fab-extended-container-shape, var(--mat-sys-corner-large));\n  font-family: var(--mat-fab-extended-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-fab-extended-label-text-size, var(--mat-sys-label-large-size));\n  font-weight: var(--mat-fab-extended-label-text-weight, var(--mat-sys-label-large-weight));\n  letter-spacing: var(--mat-fab-extended-label-text-tracking, var(--mat-sys-label-large-tracking));\n}\n@media (hover: hover) {\n  .mat-mdc-extended-fab:hover {\n    box-shadow: var(--mat-fab-extended-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-extended-fab:focus {\n  box-shadow: var(--mat-fab-extended-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-extended-fab:active, .mat-mdc-extended-fab:focus:active {\n  box-shadow: var(--mat-fab-extended-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab[disabled]:focus, .mat-mdc-extended-fab.mat-mdc-button-disabled, .mat-mdc-extended-fab.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n[dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .mat-icon, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-icons, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-outlined, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-rounded, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-sharp,\n.mat-mdc-extended-fab > .mat-icon,\n.mat-mdc-extended-fab > .material-icons,\n.mat-mdc-extended-fab > .material-symbols-outlined,\n.mat-mdc-extended-fab > .material-symbols-rounded,\n.mat-mdc-extended-fab > .material-symbols-sharp {\n  margin-left: -8px;\n  margin-right: 12px;\n}\n.mat-mdc-extended-fab .mdc-button__label + .mat-icon,\n.mat-mdc-extended-fab .mdc-button__label + .material-icons,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-outlined,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-rounded,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-sharp, [dir=rtl] .mat-mdc-extended-fab > .mat-icon, [dir=rtl] .mat-mdc-extended-fab > .material-icons, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-outlined, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-rounded, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-sharp {\n  margin-left: 12px;\n  margin-right: -8px;\n}\n.mat-mdc-extended-fab .mat-mdc-button-touch-target {\n  width: 100%;\n}\n\n.mat-mdc-button-progress-indicator-container {\n  position: absolute;\n  inset-inline-start: 0;\n  margin-block-start: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n\n.mat-mdc-button-progress-indicator-shown mat-icon,\n.mat-mdc-button-progress-indicator-shown [matButtonIcon],\n.mat-mdc-button-progress-indicator-shown .mdc-button__label {\n  visibility: hidden;\n}\n']
    }]
  }], () => [], {
    extended: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatMiniFabButton = class _MatMiniFabButton extends MatButtonBase {
  _options = inject(MAT_FAB_DEFAULT_OPTIONS, {
    optional: true
  });
  _isFab = true;
  constructor() {
    super();
    this._options = this._options || defaults;
    this.color = this._options.color || defaults.color;
  }
  static \u0275fac = function MatMiniFabButton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatMiniFabButton)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    const _c0 = [[["", 8, "material-icons", 3, "iconPositionEnd", ""], ["mat-icon", 3, "iconPositionEnd", ""], ["", "matButtonIcon", "", 3, "iconPositionEnd", ""], ["", 8, "material-symbols-outlined", 3, "iconPositionEnd", ""], ["", 8, "material-symbols-rounded", 3, "iconPositionEnd", ""], ["", 8, "material-symbols-sharp", 3, "iconPositionEnd", ""]], "*", [["", "iconPositionEnd", "", 8, "material-icons"], ["mat-icon", "iconPositionEnd", ""], ["", "matButtonIcon", "", "iconPositionEnd", ""], ["", "iconPositionEnd", "", 8, "material-symbols-outlined"], ["", "iconPositionEnd", "", 8, "material-symbols-rounded"], ["", "iconPositionEnd", "", 8, "material-symbols-sharp"]], [["", "progressIndicator", ""]]];
    const _c1 = [".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd]), .material-symbols-outlined:not([iconPositionEnd]), .material-symbols-rounded:not([iconPositionEnd]), .material-symbols-sharp:not([iconPositionEnd])", "*", ".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd], .material-symbols-outlined[iconPositionEnd], .material-symbols-rounded[iconPositionEnd], .material-symbols-sharp[iconPositionEnd]", "[progressIndicator]"];
    function MatMiniFabButton_Conditional_5_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "div", 2);
        \u0275\u0275projection(1, 3);
        \u0275\u0275domElementEnd();
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatMiniFabButton,
      selectors: [["button", "mat-mini-fab", ""], ["a", "mat-mini-fab", ""], ["button", "matMiniFab", ""], ["a", "matMiniFab", ""]],
      hostAttrs: [1, "mdc-fab", "mat-mdc-fab-base", "mdc-fab--mini", "mat-mdc-mini-fab"],
      exportAs: ["matButton", "matAnchor"],
      features: [\u0275\u0275InheritDefinitionFeature],
      ngContentSelectors: _c1,
      decls: 8,
      vars: 5,
      consts: [[1, "mat-mdc-button-persistent-ripple"], [1, "mdc-button__label"], [1, "mat-mdc-button-progress-indicator-container"], [1, "mat-focus-indicator"], [1, "mat-mdc-button-touch-target"]],
      template: function MatMiniFabButton_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef(_c0);
          \u0275\u0275domElement(0, "span", 0);
          \u0275\u0275projection(1);
          \u0275\u0275domElementStart(2, "span", 1);
          \u0275\u0275projection(3, 1);
          \u0275\u0275domElementEnd();
          \u0275\u0275projection(4, 2);
          \u0275\u0275conditionalCreate(5, MatMiniFabButton_Conditional_5_Template, 2, 0, "div", 2);
          \u0275\u0275domElement(6, "span", 3)(7, "span", 4);
        }
        if (rf & 2) {
          \u0275\u0275classProp("mdc-button__ripple", !ctx._isFab)("mdc-fab__ripple", ctx._isFab);
          \u0275\u0275advance(5);
          \u0275\u0275conditional(ctx.showProgress() ? 5 : -1);
        }
      },
      styles: ['.mat-mdc-fab-base {\n  -webkit-user-select: none;\n  user-select: none;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  width: 56px;\n  height: 56px;\n  padding: 0;\n  border: none;\n  fill: currentColor;\n  text-decoration: none;\n  cursor: pointer;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  overflow: visible;\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  flex-shrink: 0;\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  content: "";\n  opacity: 0;\n}\n.mat-mdc-fab-base .mdc-button__label,\n.mat-mdc-fab-base .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-fab-base .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n}\n.mat-mdc-fab-base:focus-visible > .mat-focus-indicator::before {\n  content: "";\n}\n.mat-mdc-fab-base._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-fab-base::before {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border: 1px solid transparent;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n}\n.mat-mdc-fab-base[hidden] {\n  display: none;\n}\n.mat-mdc-fab-base::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n.mat-mdc-fab-base:active, .mat-mdc-fab-base:focus {\n  outline: none;\n}\n.mat-mdc-fab-base:hover {\n  cursor: pointer;\n}\n.mat-mdc-fab-base > svg {\n  width: 100%;\n}\n.mat-mdc-fab-base .mat-icon,\n.mat-mdc-fab-base .material-icons,\n.mat-mdc-fab-base .material-symbols-outlined,\n.mat-mdc-fab-base .material-symbols-rounded,\n.mat-mdc-fab-base .material-symbols-sharp {\n  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);\n  fill: currentColor;\n  will-change: transform;\n}\n.mat-mdc-fab-base .mat-focus-indicator::before {\n  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px) * -1);\n  border-radius: calc(var(--%NS%mat-fab-container-shape, var(--%NS%mat-sys-corner-large)) + calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px));\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base[disabled]:focus, .mat-mdc-fab-base.mat-mdc-button-disabled, .mat-mdc-fab-base.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-fab-base.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-fab {\n  background-color: var(--%NS%mat-fab-container-color, var(--%NS%mat-sys-primary-container));\n  border-radius: var(--%NS%mat-fab-container-shape, var(--%NS%mat-sys-corner-large));\n  color: var(--%NS%mat-fab-foreground-color, var(--%NS%mat-sys-on-primary-container, inherit));\n  box-shadow: var(--%NS%mat-fab-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-fab:hover {\n    box-shadow: var(--%NS%mat-fab-hover-container-elevation-shadow, var(--%NS%mat-sys-level4));\n  }\n}\n.mat-mdc-fab:focus {\n  box-shadow: var(--%NS%mat-fab-focus-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-fab:active, .mat-mdc-fab:focus:active {\n  box-shadow: var(--%NS%mat-fab-pressed-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-fab[disabled], .mat-mdc-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n  background-color: var(--%NS%mat-fab-disabled-state-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-fab-touch-target-size, 48px);\n  display: var(--%NS%mat-fab-touch-target-display, block);\n  left: 50%;\n  width: var(--%NS%mat-fab-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-fab .mat-ripple-element {\n  background-color: var(--%NS%mat-fab-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-primary-container) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-fab-state-layer-color, var(--%NS%mat-sys-on-primary-container));\n}\n.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-fab-disabled-state-layer-color);\n}\n.mat-mdc-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-mini-fab {\n  width: 40px;\n  height: 40px;\n  background-color: var(--%NS%mat-fab-small-container-color, var(--%NS%mat-sys-primary-container));\n  border-radius: var(--%NS%mat-fab-small-container-shape, var(--%NS%mat-sys-corner-medium));\n  color: var(--%NS%mat-fab-small-foreground-color, var(--%NS%mat-sys-on-primary-container, inherit));\n  box-shadow: var(--%NS%mat-fab-small-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-mini-fab:hover {\n    box-shadow: var(--%NS%mat-fab-small-hover-container-elevation-shadow, var(--%NS%mat-sys-level4));\n  }\n}\n.mat-mdc-mini-fab:focus {\n  box-shadow: var(--%NS%mat-fab-small-focus-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-mini-fab:active, .mat-mdc-mini-fab:focus:active {\n  box-shadow: var(--%NS%mat-fab-small-pressed-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-mini-fab .mat-focus-indicator::before {\n  border-radius: calc(var(--%NS%mat-fab-small-container-shape, var(--%NS%mat-sys-corner-medium)) + calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px));\n}\n.mat-mdc-mini-fab[disabled], .mat-mdc-mini-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--%NS%mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n  background-color: var(--%NS%mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-mini-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--%NS%mat-fab-small-touch-target-size, 48px);\n  display: var(--%NS%mat-fab-small-touch-target-display);\n  left: 50%;\n  width: var(--%NS%mat-fab-small-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-mini-fab .mat-ripple-element {\n  background-color: var(--%NS%mat-fab-small-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-primary-container) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-fab-small-state-layer-color, var(--%NS%mat-sys-on-primary-container));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--%NS%mat-fab-small-disabled-state-layer-color);\n}\n.mat-mdc-mini-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-small-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-mini-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-small-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-mini-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--%NS%mat-fab-small-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-extended-fab {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  padding-left: 20px;\n  padding-right: 20px;\n  width: auto;\n  max-width: 100%;\n  line-height: normal;\n  box-shadow: var(--%NS%mat-fab-extended-container-elevation-shadow, var(--%NS%mat-sys-level3));\n  height: var(--%NS%mat-fab-extended-container-height, 56px);\n  border-radius: var(--%NS%mat-fab-extended-container-shape, var(--%NS%mat-sys-corner-large));\n  font-family: var(--%NS%mat-fab-extended-label-text-font, var(--%NS%mat-sys-label-large-font));\n  font-size: var(--%NS%mat-fab-extended-label-text-size, var(--%NS%mat-sys-label-large-size));\n  font-weight: var(--%NS%mat-fab-extended-label-text-weight, var(--%NS%mat-sys-label-large-weight));\n  letter-spacing: var(--%NS%mat-fab-extended-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));\n}\n@media (hover: hover) {\n  .mat-mdc-extended-fab:hover {\n    box-shadow: var(--%NS%mat-fab-extended-hover-container-elevation-shadow, var(--%NS%mat-sys-level4));\n  }\n}\n.mat-mdc-extended-fab:focus {\n  box-shadow: var(--%NS%mat-fab-extended-focus-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-extended-fab:active, .mat-mdc-extended-fab:focus:active {\n  box-shadow: var(--%NS%mat-fab-extended-pressed-container-elevation-shadow, var(--%NS%mat-sys-level3));\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab[disabled]:focus, .mat-mdc-extended-fab.mat-mdc-button-disabled, .mat-mdc-extended-fab.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n[dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .mat-icon, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-icons, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-outlined, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-rounded, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-sharp,\n.mat-mdc-extended-fab > .mat-icon,\n.mat-mdc-extended-fab > .material-icons,\n.mat-mdc-extended-fab > .material-symbols-outlined,\n.mat-mdc-extended-fab > .material-symbols-rounded,\n.mat-mdc-extended-fab > .material-symbols-sharp {\n  margin-left: -8px;\n  margin-right: 12px;\n}\n.mat-mdc-extended-fab .mdc-button__label + .mat-icon,\n.mat-mdc-extended-fab .mdc-button__label + .material-icons,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-outlined,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-rounded,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-sharp, [dir=rtl] .mat-mdc-extended-fab > .mat-icon, [dir=rtl] .mat-mdc-extended-fab > .material-icons, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-outlined, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-rounded, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-sharp {\n  margin-left: 12px;\n  margin-right: -8px;\n}\n.mat-mdc-extended-fab .mat-mdc-button-touch-target {\n  width: 100%;\n}\n\n.mat-mdc-button-progress-indicator-container {\n  position: absolute;\n  inset-inline-start: 0;\n  margin-block-start: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n\n.mat-mdc-button-progress-indicator-shown mat-icon,\n.mat-mdc-button-progress-indicator-shown [matButtonIcon],\n.mat-mdc-button-progress-indicator-shown .mdc-button__label {\n  visibility: hidden;\n}\n'],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatMiniFabButton, [{
    type: Component,
    args: [{
      selector: `button[mat-mini-fab], a[mat-mini-fab], button[matMiniFab], a[matMiniFab]`,
      host: {
        "class": "mdc-fab mat-mdc-fab-base mdc-fab--mini mat-mdc-mini-fab"
      },
      exportAs: "matButton, matAnchor",
      encapsulation: ViewEncapsulation.None,
      template: `<span
  class="mat-mdc-button-persistent-ripple"
  [class.mdc-button__ripple]="!_isFab"
  [class.mdc-fab__ripple]="_isFab"
></span>

<ng-content
  select=".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd]), .material-symbols-outlined:not([iconPositionEnd]), .material-symbols-rounded:not([iconPositionEnd]), .material-symbols-sharp:not([iconPositionEnd])"
>
</ng-content>

<span class="mdc-button__label"><ng-content></ng-content></span>

<ng-content
  select=".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd], .material-symbols-outlined[iconPositionEnd], .material-symbols-rounded[iconPositionEnd], .material-symbols-sharp[iconPositionEnd]"
>
</ng-content>

@if (showProgress()) {
  <div class="mat-mdc-button-progress-indicator-container">
    <ng-content select="[progressIndicator]" />
  </div>
}

<!--
  The indicator can't be directly on the button, because MDC uses ::before for high contrast
  indication and it can't be on the ripple, because it has a border radius and overflow: hidden.
-->
<span class="mat-focus-indicator"></span>

<span class="mat-mdc-button-touch-target"></span>
`,
      styles: ['.mat-mdc-fab-base {\n  -webkit-user-select: none;\n  user-select: none;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  width: 56px;\n  height: 56px;\n  padding: 0;\n  border: none;\n  fill: currentColor;\n  text-decoration: none;\n  cursor: pointer;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  overflow: visible;\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);\n  flex-shrink: 0;\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  pointer-events: none;\n  border-radius: inherit;\n}\n.mat-mdc-fab-base .mat-mdc-button-ripple {\n  overflow: hidden;\n}\n.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {\n  content: "";\n  opacity: 0;\n}\n.mat-mdc-fab-base .mdc-button__label,\n.mat-mdc-fab-base .mat-icon {\n  z-index: 1;\n  position: relative;\n}\n.mat-mdc-fab-base .mat-focus-indicator {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n}\n.mat-mdc-fab-base:focus-visible > .mat-focus-indicator::before {\n  content: "";\n}\n.mat-mdc-fab-base._mat-animation-noopable {\n  transition: none !important;\n  animation: none !important;\n}\n.mat-mdc-fab-base::before {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border: 1px solid transparent;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n}\n.mat-mdc-fab-base[hidden] {\n  display: none;\n}\n.mat-mdc-fab-base::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\n.mat-mdc-fab-base:active, .mat-mdc-fab-base:focus {\n  outline: none;\n}\n.mat-mdc-fab-base:hover {\n  cursor: pointer;\n}\n.mat-mdc-fab-base > svg {\n  width: 100%;\n}\n.mat-mdc-fab-base .mat-icon,\n.mat-mdc-fab-base .material-icons,\n.mat-mdc-fab-base .material-symbols-outlined,\n.mat-mdc-fab-base .material-symbols-rounded,\n.mat-mdc-fab-base .material-symbols-sharp {\n  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);\n  fill: currentColor;\n  will-change: transform;\n}\n.mat-mdc-fab-base .mat-focus-indicator::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);\n  border-radius: calc(var(--mat-fab-container-shape, var(--mat-sys-corner-large)) + calc(var(--mat-focus-indicator-border-width, 3px) + 2px));\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-fab-base[disabled], .mat-mdc-fab-base[disabled]:focus, .mat-mdc-fab-base.mat-mdc-button-disabled, .mat-mdc-fab-base.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-fab-base.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n\n.mat-mdc-fab {\n  background-color: var(--mat-fab-container-color, var(--mat-sys-primary-container));\n  border-radius: var(--mat-fab-container-shape, var(--mat-sys-corner-large));\n  color: var(--mat-fab-foreground-color, var(--mat-sys-on-primary-container, inherit));\n  box-shadow: var(--mat-fab-container-elevation-shadow, var(--mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-fab:hover {\n    box-shadow: var(--mat-fab-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-fab:focus {\n  box-shadow: var(--mat-fab-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-fab:active, .mat-mdc-fab:focus:active {\n  box-shadow: var(--mat-fab-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-fab[disabled], .mat-mdc-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-fab-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-fab-touch-target-size, 48px);\n  display: var(--mat-fab-touch-target-display, block);\n  left: 50%;\n  width: var(--mat-fab-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-fab .mat-ripple-element {\n  background-color: var(--mat-fab-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container));\n}\n.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-disabled-state-layer-color);\n}\n.mat-mdc-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-mini-fab {\n  width: 40px;\n  height: 40px;\n  background-color: var(--mat-fab-small-container-color, var(--mat-sys-primary-container));\n  border-radius: var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium));\n  color: var(--mat-fab-small-foreground-color, var(--mat-sys-on-primary-container, inherit));\n  box-shadow: var(--mat-fab-small-container-elevation-shadow, var(--mat-sys-level3));\n}\n@media (hover: hover) {\n  .mat-mdc-mini-fab:hover {\n    box-shadow: var(--mat-fab-small-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-mini-fab:focus {\n  box-shadow: var(--mat-fab-small-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-mini-fab:active, .mat-mdc-mini-fab:focus:active {\n  box-shadow: var(--mat-fab-small-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-mini-fab .mat-focus-indicator::before {\n  border-radius: calc(var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium)) + calc(var(--mat-focus-indicator-border-width, 3px) + 2px));\n}\n.mat-mdc-mini-fab[disabled], .mat-mdc-mini-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n  color: var(--mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n  background-color: var(--mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n.mat-mdc-mini-fab .mat-mdc-button-touch-target {\n  position: absolute;\n  top: 50%;\n  height: var(--mat-fab-small-touch-target-size, 48px);\n  display: var(--mat-fab-small-touch-target-display);\n  left: 50%;\n  width: var(--mat-fab-small-touch-target-size, 48px);\n  transform: translate(-50%, -50%);\n}\n.mat-mdc-mini-fab .mat-ripple-element {\n  background-color: var(--mat-fab-small-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));\n}\n.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-small-state-layer-color, var(--mat-sys-on-primary-container));\n}\n.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {\n  background-color: var(--mat-fab-small-disabled-state-layer-color);\n}\n.mat-mdc-mini-fab:hover > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-mini-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));\n}\n.mat-mdc-mini-fab:active > .mat-mdc-button-persistent-ripple::before {\n  opacity: var(--mat-fab-small-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));\n}\n\n.mat-mdc-extended-fab {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  padding-left: 20px;\n  padding-right: 20px;\n  width: auto;\n  max-width: 100%;\n  line-height: normal;\n  box-shadow: var(--mat-fab-extended-container-elevation-shadow, var(--mat-sys-level3));\n  height: var(--mat-fab-extended-container-height, 56px);\n  border-radius: var(--mat-fab-extended-container-shape, var(--mat-sys-corner-large));\n  font-family: var(--mat-fab-extended-label-text-font, var(--mat-sys-label-large-font));\n  font-size: var(--mat-fab-extended-label-text-size, var(--mat-sys-label-large-size));\n  font-weight: var(--mat-fab-extended-label-text-weight, var(--mat-sys-label-large-weight));\n  letter-spacing: var(--mat-fab-extended-label-text-tracking, var(--mat-sys-label-large-tracking));\n}\n@media (hover: hover) {\n  .mat-mdc-extended-fab:hover {\n    box-shadow: var(--mat-fab-extended-hover-container-elevation-shadow, var(--mat-sys-level4));\n  }\n}\n.mat-mdc-extended-fab:focus {\n  box-shadow: var(--mat-fab-extended-focus-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-extended-fab:active, .mat-mdc-extended-fab:focus:active {\n  box-shadow: var(--mat-fab-extended-pressed-container-elevation-shadow, var(--mat-sys-level3));\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab.mat-mdc-button-disabled {\n  cursor: default;\n  pointer-events: none;\n}\n.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab[disabled]:focus, .mat-mdc-extended-fab.mat-mdc-button-disabled, .mat-mdc-extended-fab.mat-mdc-button-disabled:focus {\n  box-shadow: none;\n}\n.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive {\n  pointer-events: auto;\n}\n[dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .mat-icon, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-icons, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-outlined, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-rounded, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-symbols-sharp,\n.mat-mdc-extended-fab > .mat-icon,\n.mat-mdc-extended-fab > .material-icons,\n.mat-mdc-extended-fab > .material-symbols-outlined,\n.mat-mdc-extended-fab > .material-symbols-rounded,\n.mat-mdc-extended-fab > .material-symbols-sharp {\n  margin-left: -8px;\n  margin-right: 12px;\n}\n.mat-mdc-extended-fab .mdc-button__label + .mat-icon,\n.mat-mdc-extended-fab .mdc-button__label + .material-icons,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-outlined,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-rounded,\n.mat-mdc-extended-fab .mdc-button__label + .material-symbols-sharp, [dir=rtl] .mat-mdc-extended-fab > .mat-icon, [dir=rtl] .mat-mdc-extended-fab > .material-icons, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-outlined, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-rounded, [dir=rtl] .mat-mdc-extended-fab > .material-symbols-sharp {\n  margin-left: 12px;\n  margin-right: -8px;\n}\n.mat-mdc-extended-fab .mat-mdc-button-touch-target {\n  width: 100%;\n}\n\n.mat-mdc-button-progress-indicator-container {\n  position: absolute;\n  inset-inline-start: 0;\n  margin-block-start: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n}\n\n.mat-mdc-button-progress-indicator-shown mat-icon,\n.mat-mdc-button-progress-indicator-shown [matButtonIcon],\n.mat-mdc-button-progress-indicator-shown .mdc-button__label {\n  visibility: hidden;\n}\n']
    }]
  }], () => [], null);
})();
var MatButtonModule = class _MatButtonModule {
  static \u0275fac = function MatButtonModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatButtonModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatButtonModule,
    imports: [MatRippleModule, MatButton, MatMiniFabButton, MatIconButton, MatFabButton],
    exports: [BidiModule, MatButton, MatMiniFabButton, MatIconButton, MatFabButton]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatRippleModule, BidiModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatButtonModule, [{
    type: NgModule,
    args: [{
      imports: [MatRippleModule, MatButton, MatMiniFabButton, MatIconButton, MatFabButton],
      exports: [BidiModule, MatButton, MatMiniFabButton, MatIconButton, MatFabButton]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/_tooltip-chunk.mjs
var SCROLL_THROTTLE_MS = 20;
function getMatTooltipInvalidPositionError(position) {
  return Error(`Tooltip position "${position}" is invalid.`);
}
var MAT_TOOLTIP_SCROLL_STRATEGY = new InjectionToken("mat-tooltip-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    const injector = inject(Injector);
    return () => createRepositionScrollStrategy(injector, {
      scrollThrottle: SCROLL_THROTTLE_MS
    });
  }
});
var MAT_TOOLTIP_DEFAULT_OPTIONS = new InjectionToken("mat-tooltip-default-options", {
  providedIn: "root",
  factory: () => ({
    showDelay: 0,
    hideDelay: 0,
    touchendHideDelay: 1500
  })
});
var PANEL_CLASS = "tooltip-panel";
var passiveListenerOptions = {
  passive: true
};
var MIN_VIEWPORT_TOOLTIP_THRESHOLD = 8;
var UNBOUNDED_ANCHOR_GAP = 8;
var MIN_HEIGHT = 24;
var MAX_WIDTH = 200;
var MatTooltip = class _MatTooltip {
  _elementRef = inject(ElementRef);
  _ngZone = inject(NgZone);
  _platform = inject(Platform);
  _ariaDescriber = inject(AriaDescriber);
  _focusMonitor = inject(FocusMonitor);
  _dir = inject(Directionality);
  _injector = inject(Injector);
  _viewContainerRef = inject(ViewContainerRef);
  _mediaMatcher = inject(MediaMatcher);
  _document = inject(DOCUMENT);
  _renderer = inject(Renderer2);
  _animationsDisabled = _animationsDisabled();
  _defaultOptions = inject(MAT_TOOLTIP_DEFAULT_OPTIONS, {
    optional: true
  });
  _overlayRef = null;
  _tooltipInstance = null;
  _overlayPanelClass;
  _portal;
  _position = "below";
  _positionAtOrigin = false;
  _disabled = false;
  _tooltipClass;
  _viewInitialized = false;
  _pointerExitEventsInitialized = false;
  _tooltipComponent = TooltipComponent;
  _viewportMargin = 8;
  _currentPosition;
  _cssClassPrefix = "mat-mdc";
  _ariaDescriptionPending = false;
  _dirSubscribed = false;
  get position() {
    return this._position;
  }
  set position(value) {
    if (value !== this._position) {
      this._position = value;
      if (this._overlayRef) {
        this._updatePosition(this._overlayRef);
        this._tooltipInstance?.show(0);
        this._overlayRef.updatePosition();
      }
    }
  }
  get positionAtOrigin() {
    return this._positionAtOrigin;
  }
  set positionAtOrigin(value) {
    this._positionAtOrigin = coerceBooleanProperty(value);
    this._detach();
    this._overlayRef = null;
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    const isDisabled = coerceBooleanProperty(value);
    if (this._disabled !== isDisabled) {
      this._disabled = isDisabled;
      if (isDisabled) {
        this.hide(0);
      } else {
        this._setupPointerEnterEventsIfNeeded();
      }
      this._syncAriaDescription(this.message);
    }
  }
  get showDelay() {
    return this._showDelay;
  }
  set showDelay(value) {
    this._showDelay = coerceNumberProperty(value);
  }
  _showDelay;
  get hideDelay() {
    return this._hideDelay;
  }
  set hideDelay(value) {
    this._hideDelay = coerceNumberProperty(value);
    if (this._tooltipInstance) {
      this._tooltipInstance._mouseLeaveHideDelay = this._hideDelay;
    }
  }
  _hideDelay;
  touchGestures = "auto";
  get message() {
    return this._message;
  }
  set message(value) {
    const oldMessage = this._message;
    this._message = value != null ? String(value).trim() : "";
    if (!this._message && this._isTooltipVisible()) {
      this.hide(0);
    } else {
      this._setupPointerEnterEventsIfNeeded();
      this._updateTooltipMessage();
    }
    this._syncAriaDescription(oldMessage);
  }
  _message = "";
  get tooltipClass() {
    return this._tooltipClass;
  }
  set tooltipClass(value) {
    this._tooltipClass = value;
    if (this._tooltipInstance) {
      this._setTooltipClass(this._tooltipClass);
    }
  }
  _eventCleanups = [];
  _touchstartTimeout = null;
  _destroyed = new Subject();
  _isDestroyed = false;
  constructor() {
    const defaultOptions = this._defaultOptions;
    if (defaultOptions) {
      this._showDelay = defaultOptions.showDelay;
      this._hideDelay = defaultOptions.hideDelay;
      if (defaultOptions.position) {
        this.position = defaultOptions.position;
      }
      if (defaultOptions.positionAtOrigin) {
        this.positionAtOrigin = defaultOptions.positionAtOrigin;
      }
      if (defaultOptions.touchGestures) {
        this.touchGestures = defaultOptions.touchGestures;
      }
      if (defaultOptions.tooltipClass) {
        this.tooltipClass = defaultOptions.tooltipClass;
      }
    }
    this._viewportMargin = MIN_VIEWPORT_TOOLTIP_THRESHOLD;
  }
  ngAfterViewInit() {
    this._viewInitialized = true;
    this._setupPointerEnterEventsIfNeeded();
    this._focusMonitor.monitor(this._elementRef).pipe(takeUntil(this._destroyed)).subscribe((origin) => {
      if (!origin) {
        this._ngZone.run(() => this.hide(0));
      } else if (origin === "keyboard") {
        this._ngZone.run(() => this.show());
      }
    });
  }
  ngOnDestroy() {
    const nativeElement = this._elementRef.nativeElement;
    if (this._touchstartTimeout) {
      clearTimeout(this._touchstartTimeout);
    }
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._tooltipInstance = null;
    }
    this._eventCleanups.forEach((cleanup) => cleanup());
    this._eventCleanups.length = 0;
    this._destroyed.next();
    this._destroyed.complete();
    this._isDestroyed = true;
    this._ariaDescriber.removeDescription(nativeElement, this.message, "tooltip");
    this._focusMonitor.stopMonitoring(nativeElement);
  }
  show(delay = this.showDelay, origin) {
    if (this.disabled || !this.message || this._isTooltipVisible()) {
      this._tooltipInstance?._cancelPendingAnimations();
      return;
    }
    const overlayRef = this._createOverlay(origin);
    this._detach();
    this._portal = this._portal || new ComponentPortal(this._tooltipComponent, this._viewContainerRef);
    const instance = this._tooltipInstance = overlayRef.attach(this._portal).instance;
    instance._triggerElement = this._elementRef.nativeElement;
    instance._mouseLeaveHideDelay = this._hideDelay;
    instance.afterHidden().pipe(takeUntil(this._destroyed)).subscribe(() => this._detach());
    this._setTooltipClass(this._tooltipClass);
    this._updateTooltipMessage();
    instance.show(delay);
  }
  hide(delay = this.hideDelay) {
    const instance = this._tooltipInstance;
    if (instance) {
      if (instance.isVisible()) {
        instance.hide(delay);
      } else {
        instance._cancelPendingAnimations();
        this._detach();
      }
    }
  }
  toggle(origin) {
    this._isTooltipVisible() ? this.hide() : this.show(void 0, origin);
  }
  _isTooltipVisible() {
    return !!this._tooltipInstance && this._tooltipInstance.isVisible();
  }
  _createOverlay(origin) {
    if (this._overlayRef) {
      const existingStrategy = this._overlayRef.getConfig().positionStrategy;
      if ((!this.positionAtOrigin || !origin) && existingStrategy._origin instanceof ElementRef) {
        return this._overlayRef;
      }
      this._detach();
    }
    const scrollableAncestors = this._injector.get(ScrollDispatcher).getAncestorScrollContainers(this._elementRef);
    const panelClass = `${this._cssClassPrefix}-${PANEL_CLASS}`;
    const strategy = createFlexibleConnectedPositionStrategy(this._injector, this.positionAtOrigin ? origin || this._elementRef : this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(false).withViewportMargin(this._viewportMargin).withScrollableContainers(scrollableAncestors).withPopoverLocation("global");
    strategy.positionChanges.pipe(takeUntil(this._destroyed)).subscribe((change) => {
      this._updateCurrentPositionClass(change.connectionPair);
      if (this._tooltipInstance) {
        if (change.scrollableViewProperties.isOverlayClipped && this._tooltipInstance.isVisible()) {
          this._ngZone.run(() => this.hide(0));
        }
      }
    });
    this._overlayRef = createOverlayRef(this._injector, {
      direction: this._dir,
      positionStrategy: strategy,
      panelClass: this._overlayPanelClass ? [...this._overlayPanelClass, panelClass] : panelClass,
      scrollStrategy: this._injector.get(MAT_TOOLTIP_SCROLL_STRATEGY)(),
      disableAnimations: this._animationsDisabled,
      eventPredicate: this._overlayEventPredicate
    });
    this._updatePosition(this._overlayRef);
    this._overlayRef.detachments().pipe(takeUntil(this._destroyed)).subscribe(() => this._detach());
    this._overlayRef.outsidePointerEvents().pipe(takeUntil(this._destroyed)).subscribe(() => this._tooltipInstance?._handleBodyInteraction());
    this._overlayRef.keydownEvents().pipe(takeUntil(this._destroyed)).subscribe((event) => {
      event.preventDefault();
      event.stopPropagation();
      this._ngZone.run(() => this.hide(0));
    });
    if (this._defaultOptions?.disableTooltipInteractivity) {
      this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`);
    }
    if (!this._dirSubscribed) {
      this._dirSubscribed = true;
      this._dir.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
        if (this._overlayRef) {
          this._updatePosition(this._overlayRef);
        }
      });
    }
    return this._overlayRef;
  }
  _detach() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
    this._tooltipInstance = null;
  }
  _updatePosition(overlayRef) {
    const position = overlayRef.getConfig().positionStrategy;
    const origin = this._getOrigin();
    const overlay = this._getOverlayPosition();
    position.withPositions([this._addOffset(__spreadValues(__spreadValues({}, origin.main), overlay.main)), this._addOffset(__spreadValues(__spreadValues({}, origin.fallback), overlay.fallback))]);
  }
  _addOffset(position) {
    const offset = UNBOUNDED_ANCHOR_GAP;
    const isLtr = !this._dir || this._dir.value == "ltr";
    if (position.originY === "top") {
      position.offsetY = -offset;
    } else if (position.originY === "bottom") {
      position.offsetY = offset;
    } else if (position.originX === "start") {
      position.offsetX = isLtr ? -offset : offset;
    } else if (position.originX === "end") {
      position.offsetX = isLtr ? offset : -offset;
    }
    return position;
  }
  _getOrigin() {
    const isLtr = !this._dir || this._dir.value == "ltr";
    const position = this.position;
    let originPosition;
    if (position == "above" || position == "below") {
      originPosition = {
        originX: "center",
        originY: position == "above" ? "top" : "bottom"
      };
    } else if (position == "before" || position == "left" && isLtr || position == "right" && !isLtr) {
      originPosition = {
        originX: "start",
        originY: "center"
      };
    } else if (position == "after" || position == "right" && isLtr || position == "left" && !isLtr) {
      originPosition = {
        originX: "end",
        originY: "center"
      };
    } else if (typeof ngDevMode === "undefined" || ngDevMode) {
      throw getMatTooltipInvalidPositionError(position);
    }
    const {
      x,
      y
    } = this._invertPosition(originPosition.originX, originPosition.originY);
    return {
      main: originPosition,
      fallback: {
        originX: x,
        originY: y
      }
    };
  }
  _getOverlayPosition() {
    const isLtr = !this._dir || this._dir.value == "ltr";
    const position = this.position;
    let overlayPosition;
    if (position == "above") {
      overlayPosition = {
        overlayX: "center",
        overlayY: "bottom"
      };
    } else if (position == "below") {
      overlayPosition = {
        overlayX: "center",
        overlayY: "top"
      };
    } else if (position == "before" || position == "left" && isLtr || position == "right" && !isLtr) {
      overlayPosition = {
        overlayX: "end",
        overlayY: "center"
      };
    } else if (position == "after" || position == "right" && isLtr || position == "left" && !isLtr) {
      overlayPosition = {
        overlayX: "start",
        overlayY: "center"
      };
    } else if (typeof ngDevMode === "undefined" || ngDevMode) {
      throw getMatTooltipInvalidPositionError(position);
    }
    const {
      x,
      y
    } = this._invertPosition(overlayPosition.overlayX, overlayPosition.overlayY);
    return {
      main: overlayPosition,
      fallback: {
        overlayX: x,
        overlayY: y
      }
    };
  }
  _updateTooltipMessage() {
    if (this._tooltipInstance) {
      this._tooltipInstance.message = this.message;
      this._tooltipInstance._markForCheck();
      afterNextRender(() => {
        if (this._tooltipInstance) {
          this._overlayRef.updatePosition();
        }
      }, {
        injector: this._injector
      });
    }
  }
  _setTooltipClass(tooltipClass) {
    if (this._tooltipInstance) {
      this._tooltipInstance.tooltipClass = tooltipClass instanceof Set ? Array.from(tooltipClass) : tooltipClass;
      this._tooltipInstance._markForCheck();
    }
  }
  _invertPosition(x, y) {
    if (this.position === "above" || this.position === "below") {
      if (y === "top") {
        y = "bottom";
      } else if (y === "bottom") {
        y = "top";
      }
    } else {
      if (x === "end") {
        x = "start";
      } else if (x === "start") {
        x = "end";
      }
    }
    return {
      x,
      y
    };
  }
  _updateCurrentPositionClass(connectionPair) {
    const {
      overlayY,
      originX,
      originY
    } = connectionPair;
    let newPosition;
    if (overlayY === "center") {
      if (this._dir && this._dir.value === "rtl") {
        newPosition = originX === "end" ? "left" : "right";
      } else {
        newPosition = originX === "start" ? "left" : "right";
      }
    } else {
      newPosition = overlayY === "bottom" && originY === "top" ? "above" : "below";
    }
    if (newPosition !== this._currentPosition) {
      const overlayRef = this._overlayRef;
      if (overlayRef) {
        const classPrefix = `${this._cssClassPrefix}-${PANEL_CLASS}-`;
        overlayRef.removePanelClass(classPrefix + this._currentPosition);
        overlayRef.addPanelClass(classPrefix + newPosition);
      }
      this._currentPosition = newPosition;
    }
  }
  _setupPointerEnterEventsIfNeeded() {
    if (this._disabled || !this.message || !this._viewInitialized || this._eventCleanups.length) {
      return;
    }
    if (!this._isTouchPlatform()) {
      this._addListener("mouseenter", (event) => {
        this._setupPointerExitEventsIfNeeded();
        let point = void 0;
        if (event.x !== void 0 && event.y !== void 0) {
          point = event;
        }
        this.show(void 0, point);
      });
    } else if (this.touchGestures !== "off") {
      this._disableNativeGesturesIfNecessary();
      this._addListener("touchstart", (event) => {
        const touch = event.targetTouches?.[0];
        const origin = touch ? {
          x: touch.clientX,
          y: touch.clientY
        } : void 0;
        this._setupPointerExitEventsIfNeeded();
        if (this._touchstartTimeout) {
          clearTimeout(this._touchstartTimeout);
        }
        const DEFAULT_LONGPRESS_DELAY = 500;
        this._touchstartTimeout = setTimeout(() => {
          this._touchstartTimeout = null;
          this.show(void 0, origin);
        }, this._defaultOptions?.touchLongPressShowDelay ?? DEFAULT_LONGPRESS_DELAY);
      });
    }
  }
  _setupPointerExitEventsIfNeeded() {
    if (this._pointerExitEventsInitialized) {
      return;
    }
    this._pointerExitEventsInitialized = true;
    if (!this._isTouchPlatform()) {
      this._addListener("mouseleave", (event) => {
        const newTarget = event.relatedTarget;
        if (!newTarget || !this._overlayRef?.overlayElement.contains(newTarget)) {
          this.hide();
        }
      });
      this._addListener("wheel", (event) => {
        if (this._isTooltipVisible()) {
          const elementUnderPointer = this._document.elementFromPoint(event.clientX, event.clientY);
          const element = this._elementRef.nativeElement;
          if (elementUnderPointer !== element && !element.contains(elementUnderPointer)) {
            this.hide();
          }
        }
      });
    } else if (this.touchGestures !== "off") {
      this._disableNativeGesturesIfNecessary();
      const touchendListener = () => {
        if (this._touchstartTimeout) {
          clearTimeout(this._touchstartTimeout);
        }
        this.hide(this._defaultOptions?.touchendHideDelay);
      };
      this._addListener("touchend", touchendListener);
      this._addListener("touchcancel", touchendListener);
    }
  }
  _addListener(name, listener) {
    this._eventCleanups.push(this._renderer.listen(this._elementRef.nativeElement, name, listener, passiveListenerOptions));
  }
  _isTouchPlatform() {
    const detectHoverCapability = this._defaultOptions?.detectHoverCapability;
    if (typeof detectHoverCapability === "function") {
      return !detectHoverCapability();
    }
    if (this._platform.IOS || this._platform.ANDROID) {
      return true;
    } else if (!this._platform.isBrowser) {
      return false;
    }
    return !!detectHoverCapability && this._mediaMatcher.matchMedia("(any-hover: none)").matches;
  }
  _disableNativeGesturesIfNecessary() {
    const gestures = this.touchGestures;
    if (gestures !== "off") {
      const element = this._elementRef.nativeElement;
      const style = element.style;
      if (gestures === "on" || element.nodeName !== "INPUT" && element.nodeName !== "TEXTAREA") {
        style["userSelect"] = style["msUserSelect"] = style["webkitUserSelect"] = style["MozUserSelect"] = "none";
      }
      if (gestures === "on" || !element.draggable) {
        style["webkitUserDrag"] = "none";
      }
      style["touchAction"] = "none";
      style["webkitTapHighlightColor"] = "transparent";
    }
  }
  _syncAriaDescription(oldMessage) {
    if (this._ariaDescriptionPending) {
      return;
    }
    this._ariaDescriptionPending = true;
    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, oldMessage, "tooltip");
    if (!this._isDestroyed) {
      afterNextRender({
        write: () => {
          this._ariaDescriptionPending = false;
          if (this.message && !this.disabled) {
            this._ariaDescriber.describe(this._elementRef.nativeElement, this.message, "tooltip");
          }
        }
      }, {
        injector: this._injector
      });
    }
  }
  _overlayEventPredicate = (event) => {
    if (event.type === "keydown") {
      return this._isTooltipVisible() && event.keyCode === ESCAPE && !hasModifierKey(event);
    }
    return true;
  };
  static \u0275fac = function MatTooltip_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTooltip)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatTooltip,
    selectors: [["", "matTooltip", ""]],
    hostAttrs: [1, "mat-mdc-tooltip-trigger"],
    hostVars: 2,
    hostBindings: function MatTooltip_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mat-mdc-tooltip-disabled", ctx.disabled);
      }
    },
    inputs: {
      position: [0, "matTooltipPosition", "position"],
      positionAtOrigin: [0, "matTooltipPositionAtOrigin", "positionAtOrigin"],
      disabled: [0, "matTooltipDisabled", "disabled"],
      showDelay: [0, "matTooltipShowDelay", "showDelay"],
      hideDelay: [0, "matTooltipHideDelay", "hideDelay"],
      touchGestures: [0, "matTooltipTouchGestures", "touchGestures"],
      message: [0, "matTooltip", "message"],
      tooltipClass: [0, "matTooltipClass", "tooltipClass"]
    },
    exportAs: ["matTooltip"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTooltip, [{
    type: Directive,
    args: [{
      selector: "[matTooltip]",
      exportAs: "matTooltip",
      host: {
        "class": "mat-mdc-tooltip-trigger",
        "[class.mat-mdc-tooltip-disabled]": "disabled"
      }
    }]
  }], () => [], {
    position: [{
      type: Input,
      args: ["matTooltipPosition"]
    }],
    positionAtOrigin: [{
      type: Input,
      args: ["matTooltipPositionAtOrigin"]
    }],
    disabled: [{
      type: Input,
      args: ["matTooltipDisabled"]
    }],
    showDelay: [{
      type: Input,
      args: ["matTooltipShowDelay"]
    }],
    hideDelay: [{
      type: Input,
      args: ["matTooltipHideDelay"]
    }],
    touchGestures: [{
      type: Input,
      args: ["matTooltipTouchGestures"]
    }],
    message: [{
      type: Input,
      args: ["matTooltip"]
    }],
    tooltipClass: [{
      type: Input,
      args: ["matTooltipClass"]
    }]
  });
})();
var TooltipComponent = class _TooltipComponent {
  _changeDetectorRef = inject(ChangeDetectorRef);
  _elementRef = inject(ElementRef);
  _isMultiline = false;
  message;
  tooltipClass;
  _showTimeoutId;
  _hideTimeoutId;
  _triggerElement;
  _mouseLeaveHideDelay;
  _animationsDisabled = _animationsDisabled();
  _tooltip;
  _closeOnInteraction = false;
  _isVisible = false;
  _onHide = new Subject();
  _showAnimation = "mat-mdc-tooltip-show";
  _hideAnimation = "mat-mdc-tooltip-hide";
  show(delay) {
    if (this._hideTimeoutId != null) {
      clearTimeout(this._hideTimeoutId);
    }
    this._showTimeoutId = setTimeout(() => {
      this._toggleVisibility(true);
      this._showTimeoutId = void 0;
    }, delay);
  }
  hide(delay) {
    if (this._showTimeoutId != null) {
      clearTimeout(this._showTimeoutId);
    }
    this._hideTimeoutId = setTimeout(() => {
      this._toggleVisibility(false);
      this._hideTimeoutId = void 0;
    }, delay);
  }
  afterHidden() {
    return this._onHide;
  }
  isVisible() {
    return this._isVisible;
  }
  ngOnDestroy() {
    this._cancelPendingAnimations();
    this._onHide.complete();
    this._triggerElement = null;
  }
  _handleBodyInteraction() {
    if (this._closeOnInteraction) {
      this.hide(0);
    }
  }
  _markForCheck() {
    this._changeDetectorRef.markForCheck();
  }
  _handleMouseLeave({
    relatedTarget
  }) {
    if (!relatedTarget || !this._triggerElement.contains(relatedTarget)) {
      if (this.isVisible()) {
        this.hide(this._mouseLeaveHideDelay);
      } else {
        this._finalizeAnimation(false);
      }
    }
  }
  _onShow() {
    this._isMultiline = this._isTooltipMultiline();
    this._markForCheck();
  }
  _isTooltipMultiline() {
    const rect = this._elementRef.nativeElement.getBoundingClientRect();
    return rect.height > MIN_HEIGHT && rect.width >= MAX_WIDTH;
  }
  _handleAnimationEnd({
    animationName
  }) {
    if (animationName === this._showAnimation || animationName === this._hideAnimation) {
      this._finalizeAnimation(animationName === this._showAnimation);
    }
  }
  _cancelPendingAnimations() {
    if (this._showTimeoutId != null) {
      clearTimeout(this._showTimeoutId);
    }
    if (this._hideTimeoutId != null) {
      clearTimeout(this._hideTimeoutId);
    }
    this._showTimeoutId = this._hideTimeoutId = void 0;
  }
  _finalizeAnimation(toVisible) {
    if (toVisible) {
      this._closeOnInteraction = true;
    } else if (!this.isVisible()) {
      this._onHide.next();
    }
  }
  _toggleVisibility(isVisible) {
    const tooltip = this._tooltip.nativeElement;
    const showClass = this._showAnimation;
    const hideClass = this._hideAnimation;
    tooltip.classList.remove(isVisible ? hideClass : showClass);
    tooltip.classList.add(isVisible ? showClass : hideClass);
    if (this._isVisible !== isVisible) {
      this._isVisible = isVisible;
      this._changeDetectorRef.markForCheck();
    }
    if (isVisible && !this._animationsDisabled && typeof getComputedStyle === "function") {
      const styles = getComputedStyle(tooltip);
      if (styles.getPropertyValue("animation-duration") === "0s" || styles.getPropertyValue("animation-name") === "none") {
        this._animationsDisabled = true;
      }
    }
    if (isVisible) {
      this._onShow();
    }
    if (this._animationsDisabled) {
      tooltip.classList.add("_mat-animation-noopable");
      this._finalizeAnimation(isVisible);
    }
  }
  static \u0275fac = function TooltipComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TooltipComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    const _c0 = ["tooltip"];
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _TooltipComponent,
      selectors: [["mat-tooltip-component"]],
      viewQuery: function TooltipComponent_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(_c0, 7);
        }
        if (rf & 2) {
          let _t = void 0;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._tooltip = _t.first);
        }
      },
      hostAttrs: ["aria-hidden", "true"],
      hostBindings: function TooltipComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("mouseleave", function TooltipComponent_mouseleave_HostBindingHandler($event) {
            return ctx._handleMouseLeave($event);
          });
        }
      },
      decls: 4,
      vars: 5,
      consts: [["tooltip", ""], [1, "mdc-tooltip", "mat-mdc-tooltip", 3, "animationend"], [1, "mat-mdc-tooltip-surface", "mdc-tooltip__surface"]],
      template: function TooltipComponent_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275domElementStart(0, "div", 1, 0);
          \u0275\u0275domListener("animationend", function TooltipComponent_Template_div_animationend_0_listener($event) {
            return ctx._handleAnimationEnd($event);
          });
          \u0275\u0275domElementStart(2, "div", 2);
          \u0275\u0275text(3);
          \u0275\u0275domElementEnd()();
        }
        if (rf & 2) {
          \u0275\u0275classMap(ctx.tooltipClass);
          \u0275\u0275classProp("mdc-tooltip--multiline", ctx._isMultiline);
          \u0275\u0275advance(3);
          \u0275\u0275textInterpolate(ctx.message);
        }
      },
      styles: ['.mat-mdc-tooltip {\n  position: relative;\n  transform: scale(0);\n  display: inline-flex;\n}\n.mat-mdc-tooltip::before {\n  content: "";\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: -1;\n  position: absolute;\n}\n.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before {\n  top: -8px;\n}\n.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before {\n  bottom: -8px;\n}\n.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before {\n  left: -8px;\n}\n.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before {\n  right: -8px;\n}\n.mat-mdc-tooltip._mat-animation-noopable {\n  animation: none;\n  transform: scale(1);\n}\n\n.mat-mdc-tooltip-surface {\n  word-break: normal;\n  overflow-wrap: anywhere;\n  padding: 4px 8px;\n  min-width: 40px;\n  max-width: 200px;\n  min-height: 24px;\n  max-height: 40vh;\n  box-sizing: border-box;\n  overflow: hidden;\n  text-align: center;\n  will-change: transform, opacity;\n  background-color: var(--%NS%mat-tooltip-container-color, var(--%NS%mat-sys-inverse-surface));\n  color: var(--%NS%mat-tooltip-supporting-text-color, var(--%NS%mat-sys-inverse-on-surface));\n  border-radius: var(--%NS%mat-tooltip-container-shape, var(--%NS%mat-sys-corner-extra-small));\n  font-family: var(--%NS%mat-tooltip-supporting-text-font, var(--%NS%mat-sys-body-small-font));\n  font-size: var(--%NS%mat-tooltip-supporting-text-size, var(--%NS%mat-sys-body-small-size));\n  font-weight: var(--%NS%mat-tooltip-supporting-text-weight, var(--%NS%mat-sys-body-small-weight));\n  line-height: var(--%NS%mat-tooltip-supporting-text-line-height, var(--%NS%mat-sys-body-small-line-height));\n  letter-spacing: var(--%NS%mat-tooltip-supporting-text-tracking, var(--%NS%mat-sys-body-small-tracking));\n}\n.mat-mdc-tooltip-surface::before {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border: 1px solid transparent;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n}\n.mdc-tooltip--multiline .mat-mdc-tooltip-surface {\n  text-align: left;\n}\n[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface {\n  text-align: right;\n}\n\n.mat-mdc-tooltip-panel {\n  line-height: normal;\n}\n.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive {\n  pointer-events: none;\n}\n\n@keyframes mat-mdc-tooltip-show {\n  0% {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes mat-mdc-tooltip-hide {\n  0% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n}\n.mat-mdc-tooltip-show {\n  animation: mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards;\n}\n\n.mat-mdc-tooltip-hide {\n  animation: mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards;\n}\n'],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipComponent, [{
    type: Component,
    args: [{
      selector: "mat-tooltip-component",
      encapsulation: ViewEncapsulation.None,
      host: {
        "(mouseleave)": "_handleMouseLeave($event)",
        "aria-hidden": "true"
      },
      template: '<div\n  #tooltip\n  class="mdc-tooltip mat-mdc-tooltip"\n  [class]="tooltipClass"\n  (animationend)="_handleAnimationEnd($event)"\n  [class.mdc-tooltip--multiline]="_isMultiline">\n  <div class="mat-mdc-tooltip-surface mdc-tooltip__surface">{{message}}</div>\n</div>\n',
      styles: ['.mat-mdc-tooltip {\n  position: relative;\n  transform: scale(0);\n  display: inline-flex;\n}\n.mat-mdc-tooltip::before {\n  content: "";\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: -1;\n  position: absolute;\n}\n.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before {\n  top: -8px;\n}\n.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before {\n  bottom: -8px;\n}\n.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before {\n  left: -8px;\n}\n.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before {\n  right: -8px;\n}\n.mat-mdc-tooltip._mat-animation-noopable {\n  animation: none;\n  transform: scale(1);\n}\n\n.mat-mdc-tooltip-surface {\n  word-break: normal;\n  overflow-wrap: anywhere;\n  padding: 4px 8px;\n  min-width: 40px;\n  max-width: 200px;\n  min-height: 24px;\n  max-height: 40vh;\n  box-sizing: border-box;\n  overflow: hidden;\n  text-align: center;\n  will-change: transform, opacity;\n  background-color: var(--mat-tooltip-container-color, var(--mat-sys-inverse-surface));\n  color: var(--mat-tooltip-supporting-text-color, var(--mat-sys-inverse-on-surface));\n  border-radius: var(--mat-tooltip-container-shape, var(--mat-sys-corner-extra-small));\n  font-family: var(--mat-tooltip-supporting-text-font, var(--mat-sys-body-small-font));\n  font-size: var(--mat-tooltip-supporting-text-size, var(--mat-sys-body-small-size));\n  font-weight: var(--mat-tooltip-supporting-text-weight, var(--mat-sys-body-small-weight));\n  line-height: var(--mat-tooltip-supporting-text-line-height, var(--mat-sys-body-small-line-height));\n  letter-spacing: var(--mat-tooltip-supporting-text-tracking, var(--mat-sys-body-small-tracking));\n}\n.mat-mdc-tooltip-surface::before {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  border: 1px solid transparent;\n  border-radius: inherit;\n  content: "";\n  pointer-events: none;\n}\n.mdc-tooltip--multiline .mat-mdc-tooltip-surface {\n  text-align: left;\n}\n[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface {\n  text-align: right;\n}\n\n.mat-mdc-tooltip-panel {\n  line-height: normal;\n}\n.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive {\n  pointer-events: none;\n}\n\n@keyframes mat-mdc-tooltip-show {\n  0% {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes mat-mdc-tooltip-hide {\n  0% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n}\n.mat-mdc-tooltip-show {\n  animation: mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards;\n}\n\n.mat-mdc-tooltip-hide {\n  animation: mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards;\n}\n']
    }]
  }], null, {
    _tooltip: [{
      type: ViewChild,
      args: ["tooltip", {
        static: true
      }]
    }]
  });
})();

// node_modules/@angular/material/fesm2022/_input-value-accessor-chunk.mjs
var MAT_INPUT_VALUE_ACCESSOR = new InjectionToken("MAT_INPUT_VALUE_ACCESSOR");

// node_modules/@angular/forms/fesm2022/_validation_errors-chunk.mjs
/**
 * @license Angular v22.2.2
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */
var FIELD_TREE = /* @__PURE__ */ Symbol("FIELD_TREE");
function isArray(value) {
  return Array.isArray(value);
}
var MetadataReducer = {
  list() {
    return {
      reduce: (acc, item) => item === void 0 ? acc : [...acc, item],
      getInitial: () => []
    };
  },
  min() {
    return {
      reduce: (acc, item) => {
        if (acc === void 0 || item === void 0) {
          return acc ?? item;
        }
        return item < acc ? item : acc;
      },
      getInitial: () => void 0
    };
  },
  max() {
    return {
      reduce: (acc, item) => {
        if (acc === void 0 || item === void 0) {
          return acc ?? item;
        }
        return item > acc ? item : acc;
      },
      getInitial: () => void 0
    };
  },
  or() {
    return {
      reduce: (prev, next) => prev || next,
      getInitial: () => false
    };
  },
  and() {
    return {
      reduce: (prev, next) => prev && next,
      getInitial: () => true
    };
  },
  override
};
function override(getInitial) {
  return {
    reduce: (_, item) => item,
    getInitial: () => getInitial?.()
  };
}
var IS_ASYNC_VALIDATION_RESOURCE = /* @__PURE__ */ Symbol("IS_ASYNC_VALIDATION_RESOURCE");
var MetadataKey = class {
  reducer;
  create;
  brand;
  [IS_ASYNC_VALIDATION_RESOURCE];
  constructor(reducer, create) {
    this.reducer = reducer;
    this.create = create;
  }
};
function createMetadataKey(reducer) {
  return new MetadataKey(reducer ?? MetadataReducer.override());
}
function createLimitSelectionKey() {
  return createMetadataKey();
}
var REQUIRED = createMetadataKey(MetadataReducer.or());
var MIN = createLimitSelectionKey();
var MIN_DATE = createMetadataKey(MetadataReducer.max());
var MIN_NUMBER = createMetadataKey(MetadataReducer.max());
var MAX = createLimitSelectionKey();
var MAX_DATE = createMetadataKey(MetadataReducer.min());
var MAX_NUMBER = createMetadataKey(MetadataReducer.min());
var MIN_LENGTH = createMetadataKey(MetadataReducer.max());
var MAX_LENGTH = createMetadataKey(MetadataReducer.min());
var PATTERN = createMetadataKey(MetadataReducer.list());
function shallowArrayEquals(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (!Object.is(a[i], b[i])) return false;
  }
  return true;
}
function addDefaultField(errors, fieldTree) {
  if (isArray(errors)) {
    for (const error of errors) {
      error.fieldTree ??= fieldTree;
    }
  } else if (errors) {
    errors.fieldTree ??= fieldTree;
  }
  return errors;
}
var DEBOUNCER = createMetadataKey();
var FALSE_SIGNAL = computed(() => false, ...ngDevMode ? [{
  debugName: "FALSE_SIGNAL"
}] : []);
var ROOT_PATH_KEYS = computed(() => [], ...ngDevMode ? [{
  debugName: "ROOT_PATH_KEYS"
}] : []);
var ROOT_KEY_IN_PARENT = computed(() => {
  throw new RuntimeError(1905, ngDevMode && "The top-level field in the form has no parent.");
}, ...ngDevMode ? [{
  debugName: "ROOT_KEY_IN_PARENT"
}] : []);
var EMPTY = computed(() => [], ...ngDevMode ? [{
  debugName: "EMPTY"
}] : []);
var FALSE = computed(() => false, ...ngDevMode ? [{
  debugName: "FALSE"
}] : []);
var REGISTER_WEBMCP_FORM = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "REGISTER_WEBMCP_FORM" : "");
async function submit(form, options) {
  const node = untracked(form);
  if (untracked(node.submitState.submitting)) {
    return false;
  }
  const field = options === void 0 ? node.structure.root.fieldProxy : form;
  const detail = {
    root: node.structure.root.fieldProxy,
    submitted: form
  };
  options = typeof options === "function" ? {
    action: options
  } : options ?? node.structure.fieldManager.submitOptions;
  const action = options?.action;
  if (!action) {
    throw new RuntimeError(1915, (typeof ngDevMode === "undefined" || ngDevMode) && "Cannot submit form with no submit action. Specify the action when creating the form, or as an additional argument to `submit()`.");
  }
  node.markAsTouched();
  const onInvalid = options?.onInvalid;
  const shouldRun = shouldRunAction(node, options?.ignoreValidators);
  try {
    if (shouldRun) {
      node.submitState.selfSubmitting.set(true);
      const errors = await untracked(() => action?.(field, detail));
      errors && setSubmissionErrors(node, errors);
      return !errors || isArray(errors) && errors.length === 0;
    } else {
      untracked(() => onInvalid?.(field, detail));
    }
    return false;
  } finally {
    node.submitState.selfSubmitting.set(false);
  }
}
function shouldRunAction(node, ignoreValidators) {
  switch (ignoreValidators) {
    case "all":
      return true;
    case "none":
      return untracked(node.valid);
    default:
      return !untracked(node.invalid);
  }
}
function setSubmissionErrors(submittedField, errors) {
  if (!isArray(errors)) {
    errors = [errors];
  }
  const errorsByField = /* @__PURE__ */ new Map();
  for (const error of errors) {
    const errorWithField = addDefaultField(error, submittedField.fieldTree);
    const field = errorWithField.fieldTree();
    let fieldErrors = errorsByField.get(field);
    if (!fieldErrors) {
      fieldErrors = [];
      errorsByField.set(field, fieldErrors);
    }
    fieldErrors.push(errorWithField);
  }
  for (const [field, fieldErrors] of errorsByField) {
    field.submitState.submissionErrors.set(fieldErrors);
  }
}
var CompatValidationError = class {
  kind = "compat";
  control;
  fieldTree;
  context;
  message;
  constructor({
    context,
    kind,
    control
  }) {
    this.context = context;
    this.kind = kind;
    this.control = control;
  }
};
function signalErrorsToValidationErrors(errors) {
  if (errors.length === 0) {
    return null;
  }
  const errObj = {};
  for (const error of errors) {
    errObj[error.kind] = error instanceof CompatValidationError ? error.context : error;
  }
  return errObj;
}
function reactiveErrorsToSignalErrors(errors, control) {
  if (errors === null) {
    return [];
  }
  return Object.entries(errors).map(([kind, context]) => {
    return new CompatValidationError({
      context,
      kind,
      control
    });
  });
}

// node_modules/@angular/forms/fesm2022/signals.mjs
/**
 * @license Angular v22.2.2
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */
function isFieldTree(value) {
  return typeof value === "function" && value[FIELD_TREE] === true;
}
var SIGNAL_FORMS_CONFIG = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "SIGNAL_FORMS_CONFIG" : "");
function normalizeErrors(error) {
  if (error === void 0) {
    return [];
  }
  if (Array.isArray(error)) {
    return error;
  }
  return [error];
}
var BaseNgValidationError = class {
  __brand = void 0;
  kind = "";
  fieldTree;
  message;
  constructor(options) {
    if (options) {
      Object.assign(this, options);
    }
  }
};
var NativeInputParseError = class extends BaseNgValidationError {
  kind = "parse";
};
function createParser(getValue, setValue, parse) {
  const errors = linkedSignal(__spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "errors"
  } : {}), {
    source: getValue,
    computation: () => [],
    equal: shallowArrayEquals
  }));
  const setRawValue = (rawValue) => {
    const result = parse(rawValue);
    errors.set(normalizeErrors(result.error));
    if (result.value !== void 0) {
      setValue(result.value);
    }
    errors.set(normalizeErrors(result.error));
  };
  const reset = () => {
    errors.set([]);
  };
  return {
    errors: errors.asReadonly(),
    setRawValue,
    reset
  };
}
var InteropNgControl = class {
  field;
  constructor(field) {
    this.field = field;
  }
  control = this;
  get value() {
    return this.field().controlValue();
  }
  get valid() {
    return this.field().valid();
  }
  get invalid() {
    return this.field().invalid();
  }
  get pending() {
    return this.field().pending();
  }
  get disabled() {
    return this.field().disabled();
  }
  get enabled() {
    return !this.field().disabled();
  }
  get errors() {
    return signalErrorsToValidationErrors(this.field().errors());
  }
  get pristine() {
    return !this.field().dirty();
  }
  get dirty() {
    return this.field().dirty();
  }
  get touched() {
    return this.field().touched();
  }
  get untouched() {
    return !this.field().touched();
  }
  get status() {
    if (this.field().disabled()) {
      return "DISABLED";
    }
    if (this.field().valid()) {
      return "VALID";
    }
    if (this.field().invalid()) {
      return "INVALID";
    }
    if (this.field().pending()) {
      return "PENDING";
    }
    throw new RuntimeError(1910, ngDevMode && "Unknown form control status");
  }
  valueAccessor = null;
  hasValidator(validator) {
    if (validator === Validators.required) {
      return this.field().required();
    }
    return false;
  }
  updateValueAndValidity() {
  }
};
var FIELD_STATE_KEY_TO_CONTROL_BINDING = {
  disabled: "disabled",
  disabledReasons: "disabledReasons",
  dirty: "dirty",
  errors: "errors",
  hidden: "hidden",
  invalid: "invalid",
  max: "max",
  maxLength: "maxLength",
  min: "min",
  minLength: "minLength",
  name: "name",
  pattern: "pattern",
  pending: "pending",
  readonly: "readonly",
  required: "required",
  touched: "touched"
};
var CONTROL_BINDING_TO_FIELD_STATE_KEY = /* @__PURE__ */ (() => {
  const map2 = {};
  for (const key of Object.keys(FIELD_STATE_KEY_TO_CONTROL_BINDING)) {
    map2[FIELD_STATE_KEY_TO_CONTROL_BINDING[key]] = key;
  }
  return map2;
})();
function readFieldStateBindingValue(fieldState, key) {
  const property = CONTROL_BINDING_TO_FIELD_STATE_KEY[key];
  return fieldState[property]?.();
}
var CONTROL_BINDING_NAMES = /* @__PURE__ */ (() => Object.values(FIELD_STATE_KEY_TO_CONTROL_BINDING))();
function createBindings() {
  return {};
}
function bindingUpdated(bindings, key, value) {
  if (!Object.is(bindings[key], value)) {
    bindings[key] = value;
    return true;
  }
  return false;
}
function getNativeControlValue(element, currentValue, validityMonitor) {
  let modelValue;
  if (isInput(element) && validityMonitor.isBadInput(element)) {
    return {
      error: new NativeInputParseError()
    };
  }
  switch (element.type) {
    case "checkbox":
      return {
        value: element.checked
      };
    case "number":
    case "range":
    case "datetime-local":
      modelValue = untracked(currentValue);
      if (typeof modelValue === "number" || modelValue === null) {
        return {
          value: element.value === "" ? null : element.valueAsNumber
        };
      }
      break;
    case "date":
    case "month":
    case "time":
    case "week":
      modelValue = untracked(currentValue);
      if (modelValue === null || modelValue instanceof Date) {
        return {
          value: element.valueAsDate
        };
      } else if (typeof modelValue === "number") {
        return {
          value: element.valueAsNumber
        };
      }
      break;
  }
  if (element.tagName === "INPUT" && element.type === "text") {
    modelValue ??= untracked(currentValue);
    if (typeof modelValue === "number" || modelValue === null) {
      if (element.value === "") {
        return {
          value: null
        };
      }
      const parsed = Number(element.value);
      if (Number.isNaN(parsed)) {
        return {
          error: new NativeInputParseError()
        };
      }
      return {
        value: parsed
      };
    }
  }
  return {
    value: element.value
  };
}
function setNativeControlValue(element, value) {
  switch (element.type) {
    case "checkbox":
      element.checked = value;
      return;
    case "radio":
      element.checked = value === element.value;
      return;
    case "number":
    case "range":
    case "datetime-local":
      if (typeof value === "number") {
        setNativeNumberControlValue(element, value);
        return;
      } else if (value === null) {
        element.value = "";
        return;
      }
      break;
    case "date":
    case "month":
    case "time":
    case "week":
      if (value === null || value instanceof Date) {
        element.valueAsDate = value;
        return;
      } else if (typeof value === "number") {
        setNativeNumberControlValue(element, value);
        return;
      }
  }
  if (element.tagName === "INPUT" && element.type === "text") {
    if (typeof value === "number") {
      element.value = isNaN(value) ? "" : String(value);
      return;
    }
    if (value === null) {
      if (typeof ngDevMode !== "undefined" && ngDevMode) {
        console.warn(formatRuntimeError(1921, `The text input ${element.name} received a null value. Text inputs should use empty strings to represent null values.  The input's value will be set to an empty string instead.`));
      }
      element.value = "";
      return;
    }
  }
  element.value = value;
}
function setNativeNumberControlValue(element, value) {
  if (isNaN(value)) {
    element.value = "";
  } else {
    element.valueAsNumber = value;
  }
}
function isInput(element) {
  return element.tagName === "INPUT";
}
function inputRequiresValidityTracking(input2) {
  return input2.type === "date" || input2.type === "datetime-local" || input2.type === "month" || input2.type === "time" || input2.type === "week";
}
function formatDateForInput(date, type) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  if (type === "month") {
    return `${year}-${month}`;
  }
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function formatDateForMinMax(name, value, type) {
  if (value instanceof Date && (name === "min" || name === "max") && (type === "date" || type === "month")) {
    return formatDateForInput(value, type);
  }
  return value;
}
function customControlCreate(host, parent) {
  host.listenToCustomControlModel((value) => parent.state().controlValue.set(value));
  host.listenToCustomControlOutput("touch", () => parent.state().markAsTouched());
  parent.registerAsBinding(host.customControl);
  const bindings = createBindings();
  return () => {
    const state = parent.state();
    const controlValue = state.controlValue();
    if (bindingUpdated(bindings, "controlValue", controlValue)) {
      host.setCustomControlModelInput(controlValue);
    }
    for (const name of CONTROL_BINDING_NAMES) {
      let value;
      if (name === "errors") {
        value = parent.errors();
      } else {
        value = readFieldStateBindingValue(state, name);
      }
      if (bindingUpdated(bindings, name, value)) {
        host.setInputOnDirectives(name, value);
        if (parent.elementAcceptsNativeProperty(name) && !host.customControlHasInput(name)) {
          const domValue = formatDateForMinMax(name, value, parent.nativeFormElement.type);
          setNativeDomProperty(parent.renderer, parent.nativeFormElement, name, domValue);
        }
      }
    }
  };
}
function isValidatorObject(v) {
  return typeof v === "object" && v !== null;
}
function cvaControlCreate(host, parent) {
  const bindings = createBindings();
  parent.controlValueAccessor.registerOnChange((value) => {
    bindings["controlValue"] = value;
    parent.state().controlValue.set(value);
  });
  parent.controlValueAccessor.registerOnTouched(() => parent.state().markAsTouched());
  const legacyValidators = parent.injector.get(NG_VALIDATORS, null, {
    optional: true,
    self: true
  });
  if (legacyValidators) {
    let version;
    for (const v of legacyValidators) {
      if (isValidatorObject(v) && v.registerOnValidatorChange) {
        version ??= signal(0);
        v.registerOnValidatorChange(() => {
          version.update((n) => n + 1);
        });
      }
    }
    const validatorFns = legacyValidators.map((v) => typeof v === "function" ? v : v.validate.bind(v));
    const mergedValidator = Validators.compose(validatorFns);
    const parseErrors = computed(() => {
      version?.();
      const errors = mergedValidator ? mergedValidator(parent.interopNgControl.control) : null;
      return reactiveErrorsToSignalErrors(errors, parent.interopNgControl.control);
    }, ...ngDevMode ? [{
      debugName: "parseErrors"
    }] : []);
    parent.parseErrorsSource.set(parseErrors);
  }
  parent.registerAsBinding({
    reset: () => {
      const value = parent.state().value();
      bindings["controlValue"] = value;
      untracked(() => parent.controlValueAccessor.writeValue(value));
    }
  });
  return () => {
    const fieldState = parent.state();
    const controlValue = fieldState.controlValue();
    if (bindingUpdated(bindings, "controlValue", controlValue)) {
      untracked(() => parent.controlValueAccessor.writeValue(controlValue));
    }
    for (const name of CONTROL_BINDING_NAMES) {
      const value = readFieldStateBindingValue(fieldState, name);
      if (bindingUpdated(bindings, name, value)) {
        const propertyWasSet = host.setInputOnDirectives(name, value, name === "name" ? isDefinedPredicate : void 0);
        if (name === "disabled" && parent.controlValueAccessor.setDisabledState) {
          untracked(() => parent.controlValueAccessor.setDisabledState(value));
        } else if (!propertyWasSet && parent.elementAcceptsNativeProperty(name)) {
          setNativeDomProperty(parent.renderer, parent.nativeFormElement, name, value);
        }
      }
    }
  };
}
function isDefinedPredicate(value) {
  return value == null;
}
function observeSelectMutations(select, onMutation, destroyRef) {
  if (typeof MutationObserver !== "function") {
    return;
  }
  const observer = new MutationObserver((mutations) => {
    if (mutations.some((m) => isRelevantSelectMutation(m))) {
      onMutation();
    }
  });
  observer.observe(select, {
    attributes: true,
    attributeFilter: ["value"],
    characterData: true,
    childList: true,
    subtree: true
  });
  destroyRef.onDestroy(() => observer.disconnect());
}
function isRelevantSelectMutation(mutation) {
  if (mutation.type === "childList" || mutation.type === "characterData") {
    if (mutation.target instanceof Comment) {
      return false;
    }
    for (const node of mutation.addedNodes) {
      if (!(node instanceof Comment)) {
        return true;
      }
    }
    for (const node of mutation.removedNodes) {
      if (!(node instanceof Comment)) {
        return true;
      }
    }
    return false;
  }
  if (mutation.type === "attributes" && mutation.target instanceof HTMLOptionElement) {
    return true;
  }
  return false;
}
function nativeControlCreate(host, parent, parseErrorsSource, validityMonitor) {
  let updateMode = false;
  const input2 = parent.nativeFormElement;
  const parser = createParser(() => parent.state().value(), (rawValue) => parent.state().controlValue.set(rawValue), (_rawValue) => getNativeControlValue(input2, parent.state().value, validityMonitor));
  parseErrorsSource.set(parser.errors);
  parent.onReset = () => {
    parser.reset();
    const value = parent.state().value();
    bindings["controlValue"] = value;
    setNativeControlValue(input2, value);
  };
  host.listenToDom("input", () => parser.setRawValue(void 0));
  host.listenToDom("blur", () => parent.state().markAsTouched());
  if (isInput(input2) && inputRequiresValidityTracking(input2)) {
    validityMonitor.watchValidity(parent.destroyRef, input2, () => parser.setRawValue(void 0));
  }
  parent.registerAsBinding();
  if (input2.tagName === "SELECT") {
    observeSelectMutations(input2, () => {
      if (!updateMode) {
        return;
      }
      input2.value = parent.state().controlValue();
    }, parent.destroyRef);
  }
  const bindings = createBindings();
  return () => {
    const state = parent.state();
    for (const name of CONTROL_BINDING_NAMES) {
      const value = readFieldStateBindingValue(state, name);
      if (bindingUpdated(bindings, name, value)) {
        host.setInputOnDirectives(name, value);
        if (parent.elementAcceptsNativeProperty(name)) {
          const domValue = formatDateForMinMax(name, value, input2.type);
          setNativeDomProperty(parent.renderer, input2, name, domValue);
        }
      }
    }
    const controlValue = state.controlValue();
    const controlValueChanged = bindingUpdated(bindings, "controlValue", controlValue);
    const radioValueChanged = input2.type === "radio" && bindingUpdated(bindings, "radioValue", input2.value);
    if (controlValueChanged || radioValueChanged) {
      setNativeControlValue(input2, controlValue);
    }
    updateMode = true;
  };
}
var InputValidityMonitor = class _InputValidityMonitor {
  static \u0275fac = function InputValidityMonitor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InputValidityMonitor)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _InputValidityMonitor,
    factory: (__ngFactoryType__) => AnimationInputValidityMonitor.\u0275fac(__ngFactoryType__),
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InputValidityMonitor, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useClass: forwardRef(() => AnimationInputValidityMonitor)
    }]
  }], null, null);
})();
var AnimationInputValidityMonitor = class _AnimationInputValidityMonitor extends InputValidityMonitor {
  document = inject(DOCUMENT);
  cspNonce = inject(CSP_NONCE, {
    optional: true
  });
  injectedStyles = /* @__PURE__ */ new WeakMap();
  watchValidity(destroyRef, element, callback) {
    if (false) {
      return;
    }
    const rootNode = element.getRootNode();
    if (!this.injectedStyles.has(rootNode)) {
      this.injectedStyles.set(rootNode, this.createTransitionStyle(rootNode));
    }
    const onAnimationStart = (event) => {
      const animationEvent = event;
      if (animationEvent.animationName === "ng-valid" || animationEvent.animationName === "ng-invalid") {
        callback();
      }
    };
    element.addEventListener("animationstart", onAnimationStart);
    destroyRef.onDestroy(() => {
      element.removeEventListener("animationstart", onAnimationStart);
    });
  }
  isBadInput(element) {
    return element.validity?.badInput ?? false;
  }
  createTransitionStyle(rootNode) {
    const element = this.document.createElement("style");
    if (this.cspNonce) {
      element.nonce = this.cspNonce;
    }
    element.textContent = `
      @keyframes ng-valid {}
      @keyframes ng-invalid {}
      input:valid, textarea:valid {
        animation: ng-valid 0.001s;
      }
      input:invalid, textarea:invalid {
        animation: ng-invalid 0.001s;
      }
    `;
    if (rootNode.nodeType === 9) {
      rootNode.head?.appendChild(element);
    } else {
      rootNode.appendChild(element);
    }
    return element;
  }
  ngOnDestroy() {
    this.injectedStyles.get(this.document)?.remove();
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275AnimationInputValidityMonitor_BaseFactory = void 0;
    return function AnimationInputValidityMonitor_Factory(__ngFactoryType__) {
      return (\u0275AnimationInputValidityMonitor_BaseFactory || (\u0275AnimationInputValidityMonitor_BaseFactory = \u0275\u0275getInheritedFactory(_AnimationInputValidityMonitor)))(__ngFactoryType__ || _AnimationInputValidityMonitor);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _AnimationInputValidityMonitor,
    factory: _AnimationInputValidityMonitor.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnimationInputValidityMonitor, [{
    type: Injectable
  }], null, null);
})();
var \u0275NgFieldDirective = /* @__PURE__ */ Symbol();
var FORM_FIELD = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "FORM_FIELD" : "");
var FormField = class _FormField {
  field = input.required(__spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "field"
  } : {}), {
    alias: "formField"
  }));
  state = computed(() => this.field()(), ...ngDevMode ? [{
    debugName: "state"
  }] : []);
  renderer = inject(Renderer2);
  destroyRef = inject(DestroyRef);
  injector = inject(Injector);
  element = inject(ElementRef).nativeElement;
  elementIsNativeFormElement = isNativeFormElement(this.element);
  elementAcceptsTextualValues = isTextualFormElement(this.element);
  _elementAcceptsMinMax;
  nativeFormElement = this.elementIsNativeFormElement ? this.element : void 0;
  focuser = (options) => this.element.focus(options);
  controlValueAccessors = inject(NG_VALUE_ACCESSOR, {
    optional: true,
    self: true
  });
  config = inject(SIGNAL_FORMS_CONFIG, {
    optional: true
  });
  validityMonitor = inject(InputValidityMonitor);
  parseErrorsSource = signal(void 0, ...ngDevMode ? [{
    debugName: "parseErrorsSource"
  }] : []);
  _interopNgControl;
  get interopNgControl() {
    return this._interopNgControl ??= new InteropNgControl(this.state);
  }
  parseErrors = computed(() => this.parseErrorsSource()?.().map((err) => __spreadProps(__spreadValues({}, err), {
    fieldTree: untracked(this.state).fieldTree,
    formField: this
  })) ?? [], __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "parseErrors"
  } : {}), {
    equal: shallowArrayEquals
  }));
  errors = computed(() => this.state().errors().filter((err) => !err.formField || err.formField === this), __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "errors"
  } : {}), {
    equal: shallowArrayEquals
  }));
  isFieldBinding = false;
  resetter = () => {
  };
  parseErrorsResetCallback;
  setParseErrors(source) {
    this.parseErrorsSource.set(source);
  }
  set onReset(callback) {
    this.parseErrorsResetCallback = callback;
  }
  get onReset() {
    return this.parseErrorsResetCallback;
  }
  get controlValueAccessor() {
    if (!this.controlValueAccessors || this.controlValueAccessors.length === 0) {
      return this.interopNgControl?.valueAccessor ?? void 0;
    }
    return selectValueAccessor(this.interopNgControl, this.controlValueAccessors) ?? void 0;
  }
  installClassBindingEffect() {
    const classes = Object.entries(this.config?.classes ?? {}).map(([className, computation]) => [className, computed(() => computation(this))]);
    if (classes.length === 0) {
      return;
    }
    const bindings = createBindings();
    afterRenderEffect({
      write: () => {
        if (this.state().structure.isOrphaned()) {
          return;
        }
        for (const [className, computation] of classes) {
          const active = computation();
          if (bindingUpdated(bindings, className, active)) {
            if (active) {
              this.renderer.addClass(this.element, className);
            } else {
              this.renderer.removeClass(this.element, className);
            }
          }
        }
      }
    }, {
      injector: this.injector
    });
  }
  focus(options) {
    this.focuser(options);
  }
  reset() {
    this.resetter();
    this.parseErrorsResetCallback?.(this.state().value());
  }
  registerAsBinding(bindingOptions) {
    if (this.isFieldBinding) {
      throw new RuntimeError(1913, typeof ngDevMode !== "undefined" && ngDevMode && "FormField already registered as a binding");
    }
    this.isFieldBinding = true;
    this.installClassBindingEffect();
    if (bindingOptions?.focus) {
      this.focuser = (focusOptions) => bindingOptions.focus(focusOptions);
    }
    if (bindingOptions?.reset) {
      this.resetter = () => bindingOptions.reset();
    }
    effect((onCleanup) => {
      const fieldNode = this.state();
      fieldNode.nodeState.formFieldBindings.update((controls) => [...controls, this]);
      onCleanup(() => {
        const remaining = fieldNode.nodeState.formFieldBindings().filter((c) => c !== this);
        fieldNode.nodeState.formFieldBindings.set(remaining);
        if (remaining.length === 0 && !fieldNode.structure.isOrphaned()) {
          fieldNode.flushSync();
        }
      });
    }, {
      injector: this.injector
    });
    if (typeof ngDevMode !== "undefined" && ngDevMode) {
      effect(() => {
        const fieldNode = this.state();
        if (fieldNode.hidden()) {
          const path = fieldNode.structure.pathKeys().join(".") || "<root>";
          console.warn(formatRuntimeError(1916, `Field '${path}' is hidden but is being rendered. Hidden fields should be removed from the DOM using @if.`));
        }
      }, {
        injector: this.injector
      });
    }
  }
  [\u0275NgFieldDirective];
  \u0275ngControlCreate(host) {
    if (host.hasPassThrough) {
      return;
    }
    if (this.controlValueAccessor) {
      this.\u0275ngControlUpdate = cvaControlCreate(host, this);
    } else if (host.customControl) {
      this.\u0275ngControlUpdate = customControlCreate(host, this);
    } else if (this.elementIsNativeFormElement) {
      this.\u0275ngControlUpdate = nativeControlCreate(host, this, this.parseErrorsSource, this.validityMonitor);
    } else {
      throw new RuntimeError(1914, typeof ngDevMode !== "undefined" && ngDevMode && `${host.descriptor} is an invalid [formField] directive host. The host must be a native form control (such as <input>', '<select>', or '<textarea>') or a custom form control with a 'value' or 'checked' model.`);
    }
  }
  \u0275ngControlUpdate;
  elementAcceptsNativeProperty(key) {
    if (!this.elementIsNativeFormElement) {
      return false;
    }
    switch (key) {
      case "min":
      case "max":
        return this._elementAcceptsMinMax ??= elementAcceptsMinMax(this.element);
      case "minLength":
      case "maxLength":
        return this.elementAcceptsTextualValues;
      case "disabled":
      case "required":
      case "readonly":
      case "name":
        return true;
      default:
        return false;
    }
  }
  static \u0275fac = function FormField_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormField)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _FormField,
    selectors: [["", "formField", ""]],
    inputs: {
      field: [1, "formField", "field"]
    },
    exportAs: ["formField"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: FORM_FIELD,
      useExisting: _FormField
    }, {
      provide: NgControl,
      useFactory: () => inject(_FormField).interopNgControl
    }, {
      provide: \u0275FORM_CONTROL_INTEGRATION,
      useFactory: () => inject(FORM_FIELD, {
        self: true
      })
    }]), \u0275\u0275ControlFeature("formField")]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormField, [{
    type: Directive,
    args: [{
      selector: "[formField]",
      exportAs: "formField",
      providers: [{
        provide: FORM_FIELD,
        useExisting: FormField
      }, {
        provide: NgControl,
        useFactory: () => inject(FormField).interopNgControl
      }, {
        provide: \u0275FORM_CONTROL_INTEGRATION,
        useFactory: () => inject(FORM_FIELD, {
          self: true
        })
      }]
    }]
  }], null, {
    field: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "formField",
        required: true
      }]
    }]
  });
})();
var FormRoot = class _FormRoot {
  fieldTree = input.required(__spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "fieldTree"
  } : {}), {
    alias: "formRoot"
  }));
  onSubmit(event) {
    event.preventDefault();
    untracked(() => {
      const fieldTree = this.fieldTree();
      const node = fieldTree();
      if (node.structure.fieldManager.submitOptions) {
        submit(fieldTree);
      }
    });
  }
  static \u0275fac = function FormRoot_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormRoot)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _FormRoot,
    selectors: [["form", "formRoot", ""]],
    hostAttrs: ["novalidate", ""],
    hostBindings: function FormRoot_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("submit", function FormRoot_submit_HostBindingHandler($event) {
          return ctx.onSubmit($event);
        });
      }
    },
    inputs: {
      fieldTree: [1, "formRoot", "fieldTree"]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormRoot, [{
    type: Directive,
    args: [{
      selector: "form[formRoot]",
      host: {
        "novalidate": "",
        "(submit)": "onSubmit($event)"
      }
    }]
  }], null, {
    fieldTree: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "formRoot",
        required: true
      }]
    }]
  });
})();

// node_modules/@angular/cdk/fesm2022/observers-private.mjs
var loopLimitExceededErrorHandler = (e) => {
  if (e instanceof ErrorEvent && e.message === "ResizeObserver loop limit exceeded") {
    console.error(`${e.message}. This could indicate a performance issue with your app. See https://github.com/WICG/resize-observer/blob/master/explainer.md#error-handling`);
  }
};
var SingleBoxSharedResizeObserver = class {
  _box;
  _destroyed = new Subject();
  _resizeSubject = new Subject();
  _resizeObserver;
  _elementObservables = /* @__PURE__ */ new Map();
  constructor(_box) {
    this._box = _box;
    if (typeof ResizeObserver !== "undefined") {
      this._resizeObserver = new ResizeObserver((entries) => this._resizeSubject.next(entries));
    }
  }
  observe(target) {
    if (!this._elementObservables.has(target)) {
      this._elementObservables.set(target, new Observable((observer) => {
        const subscription = this._resizeSubject.subscribe(observer);
        this._resizeObserver?.observe(target, {
          box: this._box
        });
        return () => {
          this._resizeObserver?.unobserve(target);
          subscription.unsubscribe();
          this._elementObservables.delete(target);
        };
      }).pipe(filter((entries) => entries.some((entry) => entry.target === target)), shareReplay({
        bufferSize: 1,
        refCount: true
      }), takeUntil(this._destroyed)));
    }
    return this._elementObservables.get(target);
  }
  destroy() {
    this._destroyed.next();
    this._destroyed.complete();
    this._resizeSubject.complete();
    this._elementObservables.clear();
  }
};
var SharedResizeObserver = class _SharedResizeObserver {
  _cleanupErrorListener;
  _observers = /* @__PURE__ */ new Map();
  _ngZone = inject(NgZone);
  constructor() {
    if (typeof ResizeObserver !== "undefined" && (typeof ngDevMode === "undefined" || ngDevMode)) {
      this._ngZone.runOutsideAngular(() => {
        const renderer = inject(RendererFactory2).createRenderer(null, null);
        this._cleanupErrorListener = renderer.listen("window", "error", loopLimitExceededErrorHandler);
      });
    }
  }
  ngOnDestroy() {
    for (const [, observer] of this._observers) {
      observer.destroy();
    }
    this._observers.clear();
    this._cleanupErrorListener?.();
  }
  observe(target, options) {
    const box = options?.box || "content-box";
    if (!this._observers.has(box)) {
      this._observers.set(box, new SingleBoxSharedResizeObserver(box));
    }
    return this._observers.get(box).observe(target);
  }
  static \u0275fac = function SharedResizeObserver_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SharedResizeObserver)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineService({
    token: _SharedResizeObserver,
    factory: _SharedResizeObserver.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SharedResizeObserver, [{
    type: Service
  }], () => [], null);
})();

// node_modules/@angular/material/fesm2022/_form-field-chunk.mjs
var MatLabel = class _MatLabel {
  static \u0275fac = function MatLabel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatLabel)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatLabel,
    selectors: [["mat-label"]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatLabel, [{
    type: Directive,
    args: [{
      selector: "mat-label"
    }]
  }], null, null);
})();
var MAT_ERROR = new InjectionToken("MatError");
var MatError = class _MatError {
  id = inject(_IdGenerator).getId("mat-mdc-error-");
  static \u0275fac = function MatError_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatError)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatError,
    selectors: [["mat-error"], ["", "matError", ""]],
    hostAttrs: [1, "mat-mdc-form-field-error", "mat-mdc-form-field-bottom-align"],
    hostVars: 1,
    hostBindings: function MatError_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275domProperty("id", ctx.id);
      }
    },
    inputs: {
      id: "id"
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: MAT_ERROR,
      useExisting: _MatError
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatError, [{
    type: Directive,
    args: [{
      selector: "mat-error, [matError]",
      host: {
        "class": "mat-mdc-form-field-error mat-mdc-form-field-bottom-align",
        "[id]": "id"
      },
      providers: [{
        provide: MAT_ERROR,
        useExisting: MatError
      }]
    }]
  }], null, {
    id: [{
      type: Input
    }]
  });
})();
var MatHint = class _MatHint {
  align = "start";
  id = inject(_IdGenerator).getId("mat-mdc-hint-");
  static \u0275fac = function MatHint_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatHint)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatHint,
    selectors: [["mat-hint"]],
    hostAttrs: [1, "mat-mdc-form-field-hint", "mat-mdc-form-field-bottom-align"],
    hostVars: 4,
    hostBindings: function MatHint_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275domProperty("id", ctx.id);
        \u0275\u0275attribute("align", null);
        \u0275\u0275classProp("mat-mdc-form-field-hint-end", ctx.align === "end");
      }
    },
    inputs: {
      align: "align",
      id: "id"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatHint, [{
    type: Directive,
    args: [{
      selector: "mat-hint",
      host: {
        "class": "mat-mdc-form-field-hint mat-mdc-form-field-bottom-align",
        "[class.mat-mdc-form-field-hint-end]": 'align === "end"',
        "[id]": "id",
        "[attr.align]": "null"
      }
    }]
  }], null, {
    align: [{
      type: Input
    }],
    id: [{
      type: Input
    }]
  });
})();
var MAT_PREFIX = new InjectionToken("MatPrefix");
var MatPrefix = class _MatPrefix {
  set _isTextSelector(value) {
    this._isText = true;
  }
  _isText = false;
  static \u0275fac = function MatPrefix_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatPrefix)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatPrefix,
    selectors: [["", "matPrefix", ""], ["", "matIconPrefix", ""], ["", "matTextPrefix", ""]],
    inputs: {
      _isTextSelector: [0, "matTextPrefix", "_isTextSelector"]
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: MAT_PREFIX,
      useExisting: _MatPrefix
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPrefix, [{
    type: Directive,
    args: [{
      selector: "[matPrefix], [matIconPrefix], [matTextPrefix]",
      providers: [{
        provide: MAT_PREFIX,
        useExisting: MatPrefix
      }]
    }]
  }], null, {
    _isTextSelector: [{
      type: Input,
      args: ["matTextPrefix"]
    }]
  });
})();
var MAT_SUFFIX = new InjectionToken("MatSuffix");
var MatSuffix = class _MatSuffix {
  set _isTextSelector(value) {
    this._isText = true;
  }
  _isText = false;
  static \u0275fac = function MatSuffix_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatSuffix)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatSuffix,
    selectors: [["", "matSuffix", ""], ["", "matIconSuffix", ""], ["", "matTextSuffix", ""]],
    inputs: {
      _isTextSelector: [0, "matTextSuffix", "_isTextSelector"]
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: MAT_SUFFIX,
      useExisting: _MatSuffix
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSuffix, [{
    type: Directive,
    args: [{
      selector: "[matSuffix], [matIconSuffix], [matTextSuffix]",
      providers: [{
        provide: MAT_SUFFIX,
        useExisting: MatSuffix
      }]
    }]
  }], null, {
    _isTextSelector: [{
      type: Input,
      args: ["matTextSuffix"]
    }]
  });
})();
var FLOATING_LABEL_PARENT = new InjectionToken("FloatingLabelParent");
var MatFormFieldFloatingLabel = class _MatFormFieldFloatingLabel {
  _elementRef = inject(ElementRef);
  get floating() {
    return this._floating;
  }
  set floating(value) {
    this._floating = value;
    if (this.monitorResize) {
      this._handleResize();
    }
  }
  _floating = false;
  get monitorResize() {
    return this._monitorResize;
  }
  set monitorResize(value) {
    this._monitorResize = value;
    if (this._monitorResize) {
      this._subscribeToResize();
    } else {
      this._resizeSubscription.unsubscribe();
    }
  }
  _monitorResize = false;
  _resizeObserver = inject(SharedResizeObserver);
  _ngZone = inject(NgZone);
  _parent = inject(FLOATING_LABEL_PARENT);
  _resizeSubscription = new Subscription();
  ngOnDestroy() {
    this._resizeSubscription.unsubscribe();
  }
  getWidth() {
    return estimateScrollWidth(this._elementRef.nativeElement);
  }
  get element() {
    return this._elementRef.nativeElement;
  }
  _handleResize() {
    setTimeout(() => this._parent._handleLabelResized());
  }
  _subscribeToResize() {
    this._resizeSubscription.unsubscribe();
    this._ngZone.runOutsideAngular(() => {
      this._resizeSubscription = this._resizeObserver.observe(this._elementRef.nativeElement, {
        box: "border-box"
      }).subscribe(() => this._handleResize());
    });
  }
  static \u0275fac = function MatFormFieldFloatingLabel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatFormFieldFloatingLabel)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatFormFieldFloatingLabel,
    selectors: [["label", "matFormFieldFloatingLabel", ""]],
    hostAttrs: [1, "mdc-floating-label", "mat-mdc-floating-label"],
    hostVars: 2,
    hostBindings: function MatFormFieldFloatingLabel_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mdc-floating-label--float-above", ctx.floating);
      }
    },
    inputs: {
      floating: "floating",
      monitorResize: "monitorResize"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldFloatingLabel, [{
    type: Directive,
    args: [{
      selector: "label[matFormFieldFloatingLabel]",
      host: {
        "class": "mdc-floating-label mat-mdc-floating-label",
        "[class.mdc-floating-label--float-above]": "floating"
      }
    }]
  }], null, {
    floating: [{
      type: Input
    }],
    monitorResize: [{
      type: Input
    }]
  });
})();
function estimateScrollWidth(element) {
  const htmlEl = element;
  if (htmlEl.offsetParent !== null) {
    return htmlEl.scrollWidth;
  }
  const clone = htmlEl.cloneNode(true);
  clone.style.setProperty("position", "absolute");
  clone.style.setProperty("transform", "translate(-9999px, -9999px)");
  document.documentElement.appendChild(clone);
  const scrollWidth = clone.scrollWidth;
  clone.remove();
  return scrollWidth;
}
var ACTIVATE_CLASS = "mdc-line-ripple--active";
var DEACTIVATING_CLASS = "mdc-line-ripple--deactivating";
var MatFormFieldLineRipple = class _MatFormFieldLineRipple {
  _elementRef = inject(ElementRef);
  _cleanupTransitionEnd;
  constructor() {
    const ngZone = inject(NgZone);
    const renderer = inject(Renderer2);
    ngZone.runOutsideAngular(() => {
      this._cleanupTransitionEnd = renderer.listen(this._elementRef.nativeElement, "transitionend", this._handleTransitionEnd);
    });
  }
  activate() {
    const classList = this._elementRef.nativeElement.classList;
    classList.remove(DEACTIVATING_CLASS);
    classList.add(ACTIVATE_CLASS);
  }
  deactivate() {
    this._elementRef.nativeElement.classList.add(DEACTIVATING_CLASS);
  }
  _handleTransitionEnd = (event) => {
    const classList = this._elementRef.nativeElement.classList;
    const isDeactivating = classList.contains(DEACTIVATING_CLASS);
    if (event.propertyName === "opacity" && isDeactivating) {
      classList.remove(ACTIVATE_CLASS, DEACTIVATING_CLASS);
    }
  };
  ngOnDestroy() {
    this._cleanupTransitionEnd();
  }
  static \u0275fac = function MatFormFieldLineRipple_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatFormFieldLineRipple)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatFormFieldLineRipple,
    selectors: [["div", "matFormFieldLineRipple", ""]],
    hostAttrs: [1, "mdc-line-ripple"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldLineRipple, [{
    type: Directive,
    args: [{
      selector: "div[matFormFieldLineRipple]",
      host: {
        "class": "mdc-line-ripple"
      }
    }]
  }], () => [], null);
})();
var MatFormFieldNotchedOutline = class _MatFormFieldNotchedOutline {
  _elementRef = inject(ElementRef);
  _ngZone = inject(NgZone);
  open = false;
  _notch;
  ngAfterViewInit() {
    const element = this._elementRef.nativeElement;
    const label = element.querySelector(".mdc-floating-label");
    if (label) {
      element.classList.add("mdc-notched-outline--upgraded");
      if (typeof requestAnimationFrame === "function") {
        label.style.transitionDuration = "0s";
        this._ngZone.runOutsideAngular(() => {
          requestAnimationFrame(() => label.style.transitionDuration = "");
        });
      }
    } else {
      element.classList.add("mdc-notched-outline--no-label");
    }
  }
  _setNotchWidth(labelWidth) {
    const notch = this._notch.nativeElement;
    if (!this.open || !labelWidth) {
      notch.style.width = "";
    } else {
      const NOTCH_ELEMENT_PADDING = 8;
      const NOTCH_ELEMENT_BORDER = 1;
      notch.style.width = `calc(${labelWidth}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + ${NOTCH_ELEMENT_PADDING + NOTCH_ELEMENT_BORDER}px)`;
    }
  }
  _setMaxWidth(prefixAndSuffixWidth) {
    this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width", `calc(100% - ${prefixAndSuffixWidth}px)`);
  }
  static \u0275fac = function MatFormFieldNotchedOutline_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatFormFieldNotchedOutline)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    const _c0 = ["notch"];
    const _c1 = ["*"];
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatFormFieldNotchedOutline,
      selectors: [["div", "matFormFieldNotchedOutline", ""]],
      viewQuery: function MatFormFieldNotchedOutline_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(_c0, 5);
        }
        if (rf & 2) {
          let _t = void 0;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._notch = _t.first);
        }
      },
      hostAttrs: [1, "mdc-notched-outline"],
      hostVars: 2,
      hostBindings: function MatFormFieldNotchedOutline_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275classProp("mdc-notched-outline--notched", ctx.open);
        }
      },
      inputs: {
        open: [0, "matFormFieldNotchedOutlineOpen", "open"]
      },
      ngContentSelectors: _c1,
      decls: 5,
      vars: 0,
      consts: [["notch", ""], [1, "mat-mdc-notch-piece", "mdc-notched-outline__leading"], [1, "mat-mdc-notch-piece", "mdc-notched-outline__notch"], [1, "mat-mdc-notch-piece", "mdc-notched-outline__trailing"]],
      template: function MatFormFieldNotchedOutline_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275domElement(0, "div", 1);
          \u0275\u0275domElementStart(1, "div", 2, 0);
          \u0275\u0275projection(3);
          \u0275\u0275domElementEnd();
          \u0275\u0275domElement(4, "div", 3);
        }
      },
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldNotchedOutline, [{
    type: Component,
    args: [{
      selector: "div[matFormFieldNotchedOutline]",
      host: {
        "class": "mdc-notched-outline",
        "[class.mdc-notched-outline--notched]": "open"
      },
      encapsulation: ViewEncapsulation.None,
      template: '<div class="mat-mdc-notch-piece mdc-notched-outline__leading"></div>\n<div class="mat-mdc-notch-piece mdc-notched-outline__notch" #notch>\n  <ng-content></ng-content>\n</div>\n<div class="mat-mdc-notch-piece mdc-notched-outline__trailing"></div>\n'
    }]
  }], null, {
    open: [{
      type: Input,
      args: ["matFormFieldNotchedOutlineOpen"]
    }],
    _notch: [{
      type: ViewChild,
      args: ["notch"]
    }]
  });
})();
var MatFormFieldControl = class _MatFormFieldControl {
  id;
  ngField = null;
  ngControl = null;
  focused = false;
  empty = false;
  shouldLabelFloat = false;
  required = false;
  disabled = false;
  errorState = false;
  controlType;
  autofilled;
  userAriaDescribedBy;
  disableAutomaticLabeling;
  describedByIds;
  stateChanges = null;
  value;
  static \u0275fac = function MatFormFieldControl_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatFormFieldControl)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatFormFieldControl
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldControl, [{
    type: Directive
  }], null, null);
})();
function getMatFormFieldDuplicatedHintError(align) {
  return Error(`A hint was already declared for 'align="${align}"'.`);
}
function getMatFormFieldMissingControlError() {
  return Error("mat-form-field must contain a MatFormFieldControl.");
}
var MAT_FORM_FIELD = new InjectionToken("MatFormField");
var MAT_FORM_FIELD_DEFAULT_OPTIONS = new InjectionToken("MAT_FORM_FIELD_DEFAULT_OPTIONS");
var DEFAULT_APPEARANCE = "fill";
var DEFAULT_FLOAT_LABEL = "auto";
var DEFAULT_SUBSCRIPT_SIZING = "fixed";
var FLOATING_LABEL_DEFAULT_DOCKED_TRANSFORM = `translateY(-50%)`;
var MatFormField = class _MatFormField {
  _elementRef = inject(ElementRef);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _platform = inject(Platform);
  _idGenerator = inject(_IdGenerator);
  _ngZone = inject(NgZone);
  _defaults = inject(MAT_FORM_FIELD_DEFAULT_OPTIONS, {
    optional: true
  });
  _currentDirection;
  _unwrapMaybeSignal(value) {
    return isSignal(value) ? value() : value;
  }
  _textField;
  _iconPrefixContainer;
  _textPrefixContainer;
  _iconSuffixContainer;
  _textSuffixContainer;
  _floatingLabel;
  _notchedOutline;
  _lineRipple;
  _iconPrefixContainerSignal = viewChild("iconPrefixContainer", ...ngDevMode ? [{
    debugName: "_iconPrefixContainerSignal"
  }] : []);
  _textPrefixContainerSignal = viewChild("textPrefixContainer", ...ngDevMode ? [{
    debugName: "_textPrefixContainerSignal"
  }] : []);
  _iconSuffixContainerSignal = viewChild("iconSuffixContainer", ...ngDevMode ? [{
    debugName: "_iconSuffixContainerSignal"
  }] : []);
  _textSuffixContainerSignal = viewChild("textSuffixContainer", ...ngDevMode ? [{
    debugName: "_textSuffixContainerSignal"
  }] : []);
  _prefixSuffixContainers = computed(() => {
    return [this._iconPrefixContainerSignal(), this._textPrefixContainerSignal(), this._iconSuffixContainerSignal(), this._textSuffixContainerSignal()].map((container) => container?.nativeElement).filter((e) => e !== void 0);
  }, ...ngDevMode ? [{
    debugName: "_prefixSuffixContainers"
  }] : []);
  _formFieldControl;
  _prefixChildren;
  _suffixChildren;
  _errorChildren;
  _hintChildren;
  _labelChild = contentChild(MatLabel, ...ngDevMode ? [{
    debugName: "_labelChild"
  }] : []);
  get hideRequiredMarker() {
    return this._hideRequiredMarker;
  }
  set hideRequiredMarker(value) {
    this._hideRequiredMarker = coerceBooleanProperty(value);
  }
  _hideRequiredMarker = false;
  color = "primary";
  get floatLabel() {
    return this._floatLabel || this._defaults?.floatLabel || DEFAULT_FLOAT_LABEL;
  }
  set floatLabel(value) {
    if (value !== this._floatLabel) {
      this._floatLabel = value;
      this._changeDetectorRef.markForCheck();
    }
  }
  _floatLabel;
  get appearance() {
    return this._appearanceSignal();
  }
  set appearance(value) {
    const newAppearance = value || this._defaults?.appearance || DEFAULT_APPEARANCE;
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (newAppearance !== "fill" && newAppearance !== "outline") {
        throw new Error(`MatFormField: Invalid appearance "${newAppearance}", valid values are "fill" or "outline".`);
      }
    }
    this._appearanceSignal.set(newAppearance);
  }
  _appearanceSignal = signal(DEFAULT_APPEARANCE, ...ngDevMode ? [{
    debugName: "_appearanceSignal"
  }] : []);
  get subscriptSizing() {
    return this._subscriptSizing || this._defaults?.subscriptSizing || DEFAULT_SUBSCRIPT_SIZING;
  }
  set subscriptSizing(value) {
    this._subscriptSizing = value || this._defaults?.subscriptSizing || DEFAULT_SUBSCRIPT_SIZING;
  }
  _subscriptSizing = null;
  get hintLabel() {
    return this._hintLabel;
  }
  set hintLabel(value) {
    this._hintLabel = value;
    this._processHints();
  }
  _hintLabel = "";
  _hasIconPrefix = false;
  _hasTextPrefix = false;
  _hasIconSuffix = false;
  _hasTextSuffix = false;
  _labelId = this._idGenerator.getId("mat-mdc-form-field-label-");
  _hintLabelId = this._idGenerator.getId("mat-mdc-hint-");
  _describedByIds;
  get _control() {
    return this._explicitFormFieldControl || this._formFieldControl;
  }
  set _control(value) {
    this._explicitFormFieldControl = value;
  }
  _destroyed = new Subject();
  _isFocused = null;
  _explicitFormFieldControl;
  _previousControl = null;
  _previousControlValidatorFn = null;
  _stateChanges;
  _valueChanges;
  _describedByChanges;
  _outlineLabelOffsetResizeObserver = null;
  _animationsDisabled = _animationsDisabled();
  constructor() {
    const defaults2 = this._defaults;
    const dir = inject(Directionality);
    if (defaults2) {
      if (defaults2.appearance) {
        this.appearance = defaults2.appearance;
      }
      this._hideRequiredMarker = Boolean(defaults2?.hideRequiredMarker);
      if (defaults2.color) {
        this.color = defaults2.color;
      }
    }
    effect(() => this._currentDirection = dir.valueSignal());
    this._syncOutlineLabelOffset();
  }
  ngAfterViewInit() {
    this._updateFocusState();
    if (!this._animationsDisabled) {
      this._ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled");
        }, 300);
      });
    }
    this._changeDetectorRef.detectChanges();
  }
  ngAfterContentInit() {
    this._assertFormFieldControl();
    this._initializeSubscript();
    this._initializePrefixAndSuffix();
  }
  ngAfterContentChecked() {
    this._assertFormFieldControl();
    if (this._control !== this._previousControl) {
      this._initializeControl(this._previousControl);
      if (this._control.ngControl && this._control.ngControl.control) {
        this._previousControlValidatorFn = isFieldTree(this._control.ngField) ? null : this._control.ngControl.control.validator;
      }
      this._previousControl = this._control;
      this._changeDetectorRef.markForCheck();
    }
    if (this._control.ngControl && this._control.ngControl.control && !isFieldTree(this._control.ngField)) {
      const validatorFn = this._control.ngControl.control.validator;
      if (validatorFn !== this._previousControlValidatorFn) {
        this._changeDetectorRef.markForCheck();
      }
    }
  }
  ngOnDestroy() {
    this._outlineLabelOffsetResizeObserver?.disconnect();
    this._stateChanges?.unsubscribe();
    this._valueChanges?.unsubscribe();
    this._describedByChanges?.unsubscribe();
    this._destroyed.next();
    this._destroyed.complete();
  }
  getLabelId = computed(() => this._hasFloatingLabel() ? this._labelId : null, ...ngDevMode ? [{
    debugName: "getLabelId"
  }] : []);
  getConnectedOverlayOrigin() {
    return this._textField || this._elementRef;
  }
  _animateAndLockLabel() {
    if (this._hasFloatingLabel()) {
      this.floatLabel = "always";
    }
  }
  _initializeControl(previousControl) {
    const control = this._control;
    const classPrefix = "mat-mdc-form-field-type-";
    if (previousControl) {
      this._elementRef.nativeElement.classList.remove(classPrefix + previousControl.controlType);
    }
    if (control.controlType) {
      this._elementRef.nativeElement.classList.add(classPrefix + control.controlType);
    }
    this._stateChanges?.unsubscribe();
    this._stateChanges = control.stateChanges?.subscribe(() => {
      this._updateFocusState();
      this._changeDetectorRef.markForCheck();
    });
    this._describedByChanges?.unsubscribe();
    this._describedByChanges = control.stateChanges?.pipe(startWith([void 0, void 0]), map(() => [this._unwrapMaybeSignal(control.errorState), control.userAriaDescribedBy]), pairwise(), filter(([[prevErrorState, prevDescribedBy], [currentErrorState, currentDescribedBy]]) => {
      return prevErrorState !== currentErrorState || prevDescribedBy !== currentDescribedBy;
    })).subscribe(() => this._syncDescribedByIds());
    this._valueChanges?.unsubscribe();
    if (control.ngControl && control.ngControl.valueChanges && !isFieldTree(control.ngField)) {
      this._valueChanges = control.ngControl.valueChanges.pipe(takeUntil(this._destroyed)).subscribe(() => this._changeDetectorRef.markForCheck());
    }
  }
  _checkPrefixAndSuffixTypes() {
    this._hasIconPrefix = !!this._prefixChildren.find((p) => !p._isText);
    this._hasTextPrefix = !!this._prefixChildren.find((p) => p._isText);
    this._hasIconSuffix = !!this._suffixChildren.find((s) => !s._isText);
    this._hasTextSuffix = !!this._suffixChildren.find((s) => s._isText);
  }
  _initializePrefixAndSuffix() {
    this._checkPrefixAndSuffixTypes();
    merge(this._prefixChildren.changes, this._suffixChildren.changes).subscribe(() => {
      this._checkPrefixAndSuffixTypes();
      this._changeDetectorRef.markForCheck();
    });
  }
  _initializeSubscript() {
    this._hintChildren.changes.subscribe(() => {
      this._processHints();
      this._changeDetectorRef.markForCheck();
    });
    this._errorChildren.changes.subscribe(() => {
      this._syncDescribedByIds();
      this._changeDetectorRef.markForCheck();
    });
    this._validateHints();
    this._syncDescribedByIds();
  }
  _assertFormFieldControl() {
    if (!this._control && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getMatFormFieldMissingControlError();
    }
  }
  _updateFocusState() {
    const controlFocused = this._unwrapMaybeSignal(this._control.focused);
    if (controlFocused && !this._isFocused) {
      this._isFocused = true;
      this._lineRipple?.activate();
    } else if (!controlFocused && (this._isFocused || this._isFocused === null)) {
      this._isFocused = false;
      this._lineRipple?.deactivate();
    }
    this._elementRef.nativeElement.classList.toggle("mat-focused", controlFocused);
    this._textField?.nativeElement.classList.toggle("mdc-text-field--focused", controlFocused);
  }
  _syncOutlineLabelOffset() {
    afterRenderEffect({
      earlyRead: () => {
        if (this._appearanceSignal() !== "outline") {
          this._outlineLabelOffsetResizeObserver?.disconnect();
          return null;
        }
        if (globalThis.ResizeObserver) {
          this._outlineLabelOffsetResizeObserver ||= new globalThis.ResizeObserver(() => {
            this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset());
          });
          for (const el of this._prefixSuffixContainers()) {
            this._outlineLabelOffsetResizeObserver.observe(el, {
              box: "border-box"
            });
          }
        }
        return this._getOutlinedLabelOffset();
      },
      write: (labelStyles) => this._writeOutlinedLabelStyles(labelStyles())
    });
  }
  _shouldAlwaysFloat() {
    return this.floatLabel === "always";
  }
  _hasOutline() {
    return this.appearance === "outline";
  }
  _forceDisplayInfixLabel() {
    return !this._platform.isBrowser && this._prefixChildren.length && !this._shouldLabelFloat();
  }
  _hasFloatingLabel = computed(() => !!this._labelChild(), ...ngDevMode ? [{
    debugName: "_hasFloatingLabel"
  }] : []);
  _shouldLabelFloat() {
    if (!this._hasFloatingLabel()) {
      return false;
    }
    return this._shouldAlwaysFloat() || this._unwrapMaybeSignal(this._control.shouldLabelFloat);
  }
  _shouldForward(prop) {
    const rawControl = this._control?.ngField || this._control?.ngControl;
    if (!rawControl) {
      return false;
    }
    if (isFieldTree(rawControl)) {
      const control = rawControl();
      if (prop === "valid") {
        return control.valid();
      } else if (prop === "dirty") {
        return control.dirty();
      } else if (prop === "touched") {
        return control.touched();
      } else if (prop === "pending") {
        return control.pending();
      } else if (prop === "untouched") {
        return !control.touched();
      } else if (prop === "pristine") {
        return !control.dirty();
      } else if (prop === "invalid") {
        return !control.valid();
      }
      return false;
    } else {
      const control = rawControl;
      if (prop === "valid") {
        return control.valid;
      } else if (prop === "dirty") {
        return control.dirty;
      } else if (prop === "touched") {
        return control.touched;
      } else if (prop === "pending") {
        return control.pending;
      } else if (prop === "untouched") {
        return control.untouched;
      } else if (prop === "pristine") {
        return control.pristine;
      } else if (prop === "invalid") {
        return control.invalid;
      }
      return false;
    }
  }
  _getSubscriptMessageType() {
    return this._errorChildren && this._errorChildren.length > 0 && this._unwrapMaybeSignal(this._control.errorState) ? "error" : "hint";
  }
  _handleLabelResized() {
    this._refreshOutlineNotchWidth();
  }
  _refreshOutlineNotchWidth() {
    if (!this._hasOutline() || !this._floatingLabel || !this._shouldLabelFloat()) {
      this._notchedOutline?._setNotchWidth(0);
    } else {
      this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth());
    }
  }
  _processHints() {
    this._validateHints();
    this._syncDescribedByIds();
  }
  _validateHints() {
    if (this._hintChildren && (typeof ngDevMode === "undefined" || ngDevMode)) {
      let startHint;
      let endHint;
      this._hintChildren.forEach((hint) => {
        if (hint.align === "start") {
          if (startHint || this.hintLabel) {
            throw getMatFormFieldDuplicatedHintError("start");
          }
          startHint = hint;
        } else if (hint.align === "end") {
          if (endHint) {
            throw getMatFormFieldDuplicatedHintError("end");
          }
          endHint = hint;
        }
      });
    }
  }
  _syncDescribedByIds() {
    if (this._control) {
      let ids = [];
      if (this._control.userAriaDescribedBy && typeof this._control.userAriaDescribedBy === "string") {
        ids.push(...this._control.userAriaDescribedBy.split(" "));
      }
      if (this._getSubscriptMessageType() === "hint") {
        const startHint = this._hintChildren ? this._hintChildren.find((hint) => hint.align === "start") : null;
        const endHint = this._hintChildren ? this._hintChildren.find((hint) => hint.align === "end") : null;
        if (startHint) {
          ids.push(startHint.id);
        } else if (this._hintLabel) {
          ids.push(this._hintLabelId);
        }
        if (endHint) {
          ids.push(endHint.id);
        }
      } else if (this._errorChildren) {
        ids.push(...this._errorChildren.map((error) => error.id));
      }
      const existingDescribedBy = this._control.describedByIds;
      let toAssign;
      if (existingDescribedBy) {
        const exclude = this._describedByIds || ids;
        toAssign = ids.concat(existingDescribedBy.filter((id) => id && !exclude.includes(id)));
      } else {
        toAssign = ids;
      }
      this._control.setDescribedByIds(toAssign);
      this._describedByIds = ids;
    }
  }
  _getOutlinedLabelOffset() {
    if (!this._hasOutline() || !this._floatingLabel) {
      return null;
    }
    if (!this._iconPrefixContainer && !this._textPrefixContainer) {
      return ["", null];
    }
    if (!this._isAttachedToDom()) {
      return null;
    }
    const iconPrefixContainer = this._iconPrefixContainer?.nativeElement;
    const textPrefixContainer = this._textPrefixContainer?.nativeElement;
    const iconSuffixContainer = this._iconSuffixContainer?.nativeElement;
    const textSuffixContainer = this._textSuffixContainer?.nativeElement;
    const iconPrefixContainerWidth = iconPrefixContainer?.getBoundingClientRect().width ?? 0;
    const textPrefixContainerWidth = textPrefixContainer?.getBoundingClientRect().width ?? 0;
    const iconSuffixContainerWidth = iconSuffixContainer?.getBoundingClientRect().width ?? 0;
    const textSuffixContainerWidth = textSuffixContainer?.getBoundingClientRect().width ?? 0;
    const negate = this._currentDirection === "rtl" ? "-1" : "1";
    const prefixWidth = `${iconPrefixContainerWidth + textPrefixContainerWidth}px`;
    const labelOffset = `var(--mat-mdc-form-field-label-offset-x, 0px)`;
    const labelHorizontalOffset = `calc(${negate} * (${prefixWidth} + ${labelOffset}))`;
    const floatingLabelTransform = `var(--mat-mdc-form-field-label-transform, ${FLOATING_LABEL_DEFAULT_DOCKED_TRANSFORM} translateX(${labelHorizontalOffset}))`;
    const notchedOutlineWidth = iconPrefixContainerWidth + textPrefixContainerWidth + iconSuffixContainerWidth + textSuffixContainerWidth;
    return [floatingLabelTransform, notchedOutlineWidth];
  }
  _writeOutlinedLabelStyles(styles) {
    if (styles !== null) {
      const [floatingLabelTransform, notchedOutlineWidth] = styles;
      if (this._floatingLabel) {
        this._floatingLabel.element.style.transform = floatingLabelTransform;
      }
      if (notchedOutlineWidth !== null) {
        this._notchedOutline?._setMaxWidth(notchedOutlineWidth);
      }
    }
  }
  _isAttachedToDom() {
    const element = this._elementRef.nativeElement;
    if (element.getRootNode) {
      const rootNode = element.getRootNode();
      return rootNode && rootNode !== element;
    }
    return document.documentElement.contains(element);
  }
  static \u0275fac = function MatFormField_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatFormField)();
  };
  static \u0275cmp = (function() {
    const _c0 = ["iconPrefixContainer"];
    const _c1 = ["textPrefixContainer"];
    const _c2 = ["iconSuffixContainer"];
    const _c3 = ["textSuffixContainer"];
    const _c4 = ["textField"];
    const _c5 = ["*", [["mat-label"]], [["", "matPrefix", ""], ["", "matIconPrefix", ""]], [["", "matTextPrefix", ""]], [["", "matTextSuffix", ""]], [["", "matSuffix", ""], ["", "matIconSuffix", ""]], [["mat-error"], ["", "matError", ""]], [["mat-hint", 3, "align", "end"]], [["mat-hint", "align", "end"]]];
    const _c6 = ["*", "mat-label", "[matPrefix], [matIconPrefix]", "[matTextPrefix]", "[matTextSuffix]", "[matSuffix], [matIconSuffix]", "mat-error, [matError]", "mat-hint:not([align='end'])", "mat-hint[align='end']"];
    function MatFormField_ng_template_0_Conditional_0_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "span", 21);
      }
    }
    function MatFormField_ng_template_0_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "label", 20);
        \u0275\u0275projection(1, 1);
        \u0275\u0275conditionalCreate(2, MatFormField_ng_template_0_Conditional_0_Conditional_2_Template, 1, 0, "span", 21);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275property("floating", ctx_r0._shouldLabelFloat())("monitorResize", ctx_r0._hasOutline())("id", ctx_r0._labelId);
        \u0275\u0275attribute("for", ctx_r0._control.disableAutomaticLabeling ? null : ctx_r0._control.id);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(!ctx_r0.hideRequiredMarker && ctx_r0._unwrapMaybeSignal(ctx_r0._control.required) ? 2 : -1);
      }
    }
    function MatFormField_ng_template_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, MatFormField_ng_template_0_Conditional_0_Template, 3, 5, "label", 20);
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275conditional(ctx_r0._hasFloatingLabel() ? 0 : -1);
      }
    }
    function MatFormField_Conditional_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "div", 7);
      }
    }
    function MatFormField_Conditional_6_Conditional_1_ng_template_0_Template(rf, ctx) {
    }
    function MatFormField_Conditional_6_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MatFormField_Conditional_6_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 13);
      }
      if (rf & 2) {
        \u0275\u0275nextContext(2);
        const labelTemplate_r2 = \u0275\u0275reference(1);
        \u0275\u0275property("ngTemplateOutlet", labelTemplate_r2);
      }
    }
    function MatFormField_Conditional_6_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 9);
        \u0275\u0275conditionalCreate(1, MatFormField_Conditional_6_Conditional_1_Template, 1, 1, null, 13);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275property("matFormFieldNotchedOutlineOpen", ctx_r0._shouldLabelFloat());
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx_r0._forceDisplayInfixLabel() ? 1 : -1);
      }
    }
    function MatFormField_Conditional_7_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 10, 2);
        \u0275\u0275projection(2, 2);
        \u0275\u0275elementEnd();
      }
    }
    function MatFormField_Conditional_8_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 11, 3);
        \u0275\u0275projection(2, 3);
        \u0275\u0275elementEnd();
      }
    }
    function MatFormField_Conditional_10_ng_template_0_Template(rf, ctx) {
    }
    function MatFormField_Conditional_10_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MatFormField_Conditional_10_ng_template_0_Template, 0, 0, "ng-template", 13);
      }
      if (rf & 2) {
        \u0275\u0275nextContext();
        const labelTemplate_r2 = \u0275\u0275reference(1);
        \u0275\u0275property("ngTemplateOutlet", labelTemplate_r2);
      }
    }
    function MatFormField_Conditional_12_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 14, 4);
        \u0275\u0275projection(2, 4);
        \u0275\u0275elementEnd();
      }
    }
    function MatFormField_Conditional_13_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 15, 5);
        \u0275\u0275projection(2, 5);
        \u0275\u0275elementEnd();
      }
    }
    function MatFormField_Conditional_14_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "div", 16);
      }
    }
    function MatFormField_Case_16_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 18);
        \u0275\u0275projection(1, 6);
        \u0275\u0275elementEnd();
      }
    }
    function MatFormField_Case_17_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "mat-hint", 22);
        \u0275\u0275text(1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275property("id", ctx_r0._hintLabelId);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate(ctx_r0.hintLabel);
      }
    }
    function MatFormField_Case_17_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 19);
        \u0275\u0275conditionalCreate(1, MatFormField_Case_17_Conditional_1_Template, 2, 2, "mat-hint", 22);
        \u0275\u0275projection(2, 7);
        \u0275\u0275element(3, "div", 23);
        \u0275\u0275projection(4, 8);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx_r0.hintLabel ? 1 : -1);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatFormField,
      selectors: [["mat-form-field"]],
      contentQueries: function MatFormField_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuerySignal(dirIndex, ctx._labelChild, MatLabel, 5);
          \u0275\u0275contentQuery(dirIndex, MatFormFieldControl, 5)(dirIndex, MAT_PREFIX, 5)(dirIndex, MAT_SUFFIX, 5)(dirIndex, MAT_ERROR, 5)(dirIndex, MatHint, 5);
        }
        if (rf & 2) {
          \u0275\u0275queryAdvance();
          let _t = void 0;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._formFieldControl = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._prefixChildren = _t);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._suffixChildren = _t);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._errorChildren = _t);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._hintChildren = _t);
        }
      },
      viewQuery: function MatFormField_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuerySignal(ctx._iconPrefixContainerSignal, _c0, 5)(ctx._textPrefixContainerSignal, _c1, 5)(ctx._iconSuffixContainerSignal, _c2, 5)(ctx._textSuffixContainerSignal, _c3, 5);
          \u0275\u0275viewQuery(_c4, 5)(_c0, 5)(_c1, 5)(_c2, 5)(_c3, 5)(MatFormFieldFloatingLabel, 5)(MatFormFieldNotchedOutline, 5)(MatFormFieldLineRipple, 5);
        }
        if (rf & 2) {
          \u0275\u0275queryAdvance(4);
          let _t = void 0;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._textField = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._iconPrefixContainer = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._textPrefixContainer = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._iconSuffixContainer = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._textSuffixContainer = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._floatingLabel = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._notchedOutline = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._lineRipple = _t.first);
        }
      },
      hostAttrs: [1, "mat-mdc-form-field"],
      hostVars: 38,
      hostBindings: function MatFormField_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275classProp("mat-mdc-form-field-label-always-float", ctx._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix", ctx._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix", ctx._hasIconSuffix)("mat-form-field-invalid", ctx._unwrapMaybeSignal(ctx._control.errorState))("mat-form-field-disabled", ctx._unwrapMaybeSignal(ctx._control.disabled))("mat-form-field-autofilled", ctx._unwrapMaybeSignal(ctx._control.autofilled))("mat-form-field-appearance-fill", ctx.appearance == "fill")("mat-form-field-appearance-outline", ctx.appearance == "outline")("mat-form-field-hide-placeholder", ctx._hasFloatingLabel() && !ctx._shouldLabelFloat())("mat-primary", ctx.color !== "accent" && ctx.color !== "warn")("mat-accent", ctx.color === "accent")("mat-warn", ctx.color === "warn")("ng-untouched", ctx._shouldForward("untouched"))("ng-touched", ctx._shouldForward("touched"))("ng-pristine", ctx._shouldForward("pristine"))("ng-dirty", ctx._shouldForward("dirty"))("ng-valid", ctx._shouldForward("valid"))("ng-invalid", ctx._shouldForward("invalid"))("ng-pending", ctx._shouldForward("pending"));
        }
      },
      inputs: {
        hideRequiredMarker: "hideRequiredMarker",
        color: "color",
        floatLabel: "floatLabel",
        appearance: "appearance",
        subscriptSizing: "subscriptSizing",
        hintLabel: "hintLabel"
      },
      exportAs: ["matFormField"],
      features: [\u0275\u0275ProvidersFeature([{
        provide: MAT_FORM_FIELD,
        useExisting: _MatFormField
      }, {
        provide: FLOATING_LABEL_PARENT,
        useExisting: _MatFormField
      }])],
      ngContentSelectors: _c6,
      decls: 18,
      vars: 21,
      consts: [["labelTemplate", ""], ["textField", ""], ["iconPrefixContainer", ""], ["textPrefixContainer", ""], ["textSuffixContainer", ""], ["iconSuffixContainer", ""], [1, "mat-mdc-text-field-wrapper", "mdc-text-field", 3, "click"], [1, "mat-mdc-form-field-focus-overlay"], [1, "mat-mdc-form-field-flex"], ["matFormFieldNotchedOutline", "", 3, "matFormFieldNotchedOutlineOpen"], [1, "mat-mdc-form-field-icon-prefix"], [1, "mat-mdc-form-field-text-prefix"], [1, "mat-mdc-form-field-infix"], [3, "ngTemplateOutlet"], [1, "mat-mdc-form-field-text-suffix"], [1, "mat-mdc-form-field-icon-suffix"], ["matFormFieldLineRipple", ""], ["aria-atomic", "true", "aria-live", "polite", 1, "mat-mdc-form-field-subscript-wrapper", "mat-mdc-form-field-bottom-align"], [1, "mat-mdc-form-field-error-wrapper"], [1, "mat-mdc-form-field-hint-wrapper"], ["matFormFieldFloatingLabel", "", 3, "floating", "monitorResize", "id"], ["aria-hidden", "true", 1, "mat-mdc-form-field-required-marker", "mdc-floating-label--required"], [3, "id"], [1, "mat-mdc-form-field-hint-spacer"]],
      template: function MatFormField_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef(_c5);
          \u0275\u0275template(0, MatFormField_ng_template_0_Template, 1, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
          \u0275\u0275elementStart(2, "div", 6, 1);
          \u0275\u0275listener("click", function MatFormField_Template_div_click_2_listener($event) {
            return ctx._control.onContainerClick($event);
          });
          \u0275\u0275conditionalCreate(4, MatFormField_Conditional_4_Template, 1, 0, "div", 7);
          \u0275\u0275elementStart(5, "div", 8);
          \u0275\u0275conditionalCreate(6, MatFormField_Conditional_6_Template, 2, 2, "div", 9);
          \u0275\u0275conditionalCreate(7, MatFormField_Conditional_7_Template, 3, 0, "div", 10);
          \u0275\u0275conditionalCreate(8, MatFormField_Conditional_8_Template, 3, 0, "div", 11);
          \u0275\u0275elementStart(9, "div", 12);
          \u0275\u0275conditionalCreate(10, MatFormField_Conditional_10_Template, 1, 1, null, 13);
          \u0275\u0275projection(11);
          \u0275\u0275elementEnd();
          \u0275\u0275conditionalCreate(12, MatFormField_Conditional_12_Template, 3, 0, "div", 14);
          \u0275\u0275conditionalCreate(13, MatFormField_Conditional_13_Template, 3, 0, "div", 15);
          \u0275\u0275elementEnd();
          \u0275\u0275conditionalCreate(14, MatFormField_Conditional_14_Template, 1, 0, "div", 16);
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(15, "div", 17);
          \u0275\u0275conditionalCreate(16, MatFormField_Case_16_Template, 2, 0, "div", 18)(17, MatFormField_Case_17_Template, 5, 1, "div", 19);
          \u0275\u0275elementEnd();
        }
        if (rf & 2) {
          let tmp_18_0 = void 0;
          const isDisabled_r3 = ctx._unwrapMaybeSignal(ctx._control.disabled);
          \u0275\u0275advance(2);
          \u0275\u0275classProp("mdc-text-field--filled", !ctx._hasOutline())("mdc-text-field--outlined", ctx._hasOutline())("mdc-text-field--no-label", !ctx._hasFloatingLabel())("mdc-text-field--disabled", isDisabled_r3)("mdc-text-field--invalid", ctx._unwrapMaybeSignal(ctx._control.errorState));
          \u0275\u0275advance(2);
          \u0275\u0275conditional(!ctx._hasOutline() && !isDisabled_r3 ? 4 : -1);
          \u0275\u0275advance(2);
          \u0275\u0275conditional(ctx._hasOutline() ? 6 : -1);
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx._hasIconPrefix ? 7 : -1);
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx._hasTextPrefix ? 8 : -1);
          \u0275\u0275advance(2);
          \u0275\u0275conditional(!ctx._hasOutline() || ctx._forceDisplayInfixLabel() ? 10 : -1);
          \u0275\u0275advance(2);
          \u0275\u0275conditional(ctx._hasTextSuffix ? 12 : -1);
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx._hasIconSuffix ? 13 : -1);
          \u0275\u0275advance();
          \u0275\u0275conditional(!ctx._hasOutline() ? 14 : -1);
          \u0275\u0275advance();
          \u0275\u0275classProp("mat-mdc-form-field-subscript-dynamic-size", ctx.subscriptSizing === "dynamic");
          const subscriptMessageType_r4 = ctx._getSubscriptMessageType();
          \u0275\u0275advance();
          \u0275\u0275conditional((tmp_18_0 = subscriptMessageType_r4) === "error" ? 16 : tmp_18_0 === "hint" ? 17 : -1);
        }
      },
      dependencies: [MatFormFieldFloatingLabel, MatFormFieldNotchedOutline, NgTemplateOutlet, MatFormFieldLineRipple, MatHint],
      styles: ['.mdc-text-field {\n  display: inline-flex;\n  align-items: baseline;\n  padding: 0 16px;\n  position: relative;\n  box-sizing: border-box;\n  overflow: hidden;\n  will-change: opacity, transform, color;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.mdc-text-field__input {\n  width: 100%;\n  min-width: 0;\n  border: none;\n  border-radius: 0;\n  background: none;\n  padding: 0;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  height: 28px;\n}\n.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {\n  display: none;\n}\n.mdc-text-field__input::-ms-clear {\n  display: none;\n}\n.mdc-text-field__input:focus {\n  outline: none;\n}\n.mdc-text-field__input:invalid {\n  box-shadow: none;\n}\n.mdc-text-field__input::placeholder {\n  opacity: 0;\n}\n.mdc-text-field__input::-moz-placeholder {\n  opacity: 0;\n}\n.mdc-text-field__input::-webkit-input-placeholder {\n  opacity: 0;\n}\n.mdc-text-field__input:-ms-input-placeholder {\n  opacity: 0;\n}\n.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {\n  opacity: 1;\n}\n.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {\n  opacity: 1;\n}\n.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {\n  opacity: 1;\n}\n.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {\n  opacity: 1;\n}\n.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {\n  opacity: 0;\n}\n.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {\n  opacity: 0;\n}\n.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {\n  opacity: 0;\n}\n.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {\n  opacity: 0;\n}\n.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {\n  height: 100%;\n}\n.mdc-text-field--outlined .mdc-text-field__input {\n  display: flex;\n  border: none !important;\n  background-color: transparent;\n}\n.mdc-text-field--disabled .mdc-text-field__input {\n  pointer-events: auto;\n}\n.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input {\n  color: var(--%NS%mat-form-field-filled-input-text-color, var(--%NS%mat-sys-on-surface));\n  caret-color: var(--%NS%mat-form-field-filled-caret-color, var(--%NS%mat-sys-primary));\n}\n.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {\n  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {\n  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {\n  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {\n  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {\n  color: var(--%NS%mat-form-field-outlined-input-text-color, var(--%NS%mat-sys-on-surface));\n  caret-color: var(--%NS%mat-form-field-outlined-caret-color, var(--%NS%mat-sys-primary));\n}\n.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {\n  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {\n  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {\n  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {\n  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {\n  caret-color: var(--%NS%mat-form-field-filled-error-caret-color, var(--%NS%mat-sys-error));\n}\n.mdc-text-field--outlined.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {\n  caret-color: var(--%NS%mat-form-field-outlined-error-caret-color, var(--%NS%mat-sys-error));\n}\n.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {\n  color: var(--%NS%mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {\n  color: var(--%NS%mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n@media (forced-colors: active) {\n  .mdc-text-field--disabled .mdc-text-field__input {\n    background-color: Window;\n  }\n}\n\n.mdc-text-field--filled {\n  height: 56px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n  border-top-left-radius: var(--%NS%mat-form-field-filled-container-shape, var(--%NS%mat-sys-corner-extra-small));\n  border-top-right-radius: var(--%NS%mat-form-field-filled-container-shape, var(--%NS%mat-sys-corner-extra-small));\n}\n.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) {\n  background-color: var(--%NS%mat-form-field-filled-container-color, var(--%NS%mat-sys-surface-variant));\n}\n.mdc-text-field--filled.mdc-text-field--disabled {\n  background-color: var(--%NS%mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 4%, transparent));\n}\n\n.mdc-text-field--outlined {\n  height: 56px;\n  overflow: visible;\n  padding-right: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));\n  padding-left: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)) + 4px);\n}\n[dir=rtl] .mdc-text-field--outlined {\n  padding-right: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)) + 4px);\n  padding-left: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));\n}\n\n.mdc-floating-label {\n  position: absolute;\n  left: 0;\n  transform-origin: left top;\n  line-height: 1.15rem;\n  text-align: left;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  cursor: text;\n  overflow: hidden;\n  will-change: transform;\n}\n[dir=rtl] .mdc-floating-label {\n  right: 0;\n  left: auto;\n  transform-origin: right top;\n  text-align: right;\n}\n.mdc-text-field .mdc-floating-label {\n  top: 50%;\n  transform: translateY(-50%);\n  pointer-events: none;\n}\n.mdc-notched-outline .mdc-floating-label {\n  display: inline-block;\n  position: relative;\n  max-width: 100%;\n}\n.mdc-text-field--outlined .mdc-floating-label {\n  left: 4px;\n  right: auto;\n}\n[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {\n  left: auto;\n  right: 4px;\n}\n.mdc-text-field--filled .mdc-floating-label {\n  left: 16px;\n  right: auto;\n}\n[dir=rtl] .mdc-text-field--filled .mdc-floating-label {\n  left: auto;\n  right: 16px;\n}\n.mdc-text-field--disabled .mdc-floating-label {\n  cursor: default;\n}\n@media (forced-colors: active) {\n  .mdc-text-field--disabled .mdc-floating-label {\n    z-index: 1;\n  }\n}\n.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {\n  display: none;\n}\n.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-floating-label {\n  color: var(--%NS%mat-form-field-filled-label-text-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {\n  color: var(--%NS%mat-form-field-filled-focus-label-text-color, var(--%NS%mat-sys-primary));\n}\n.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {\n  color: var(--%NS%mat-form-field-filled-hover-label-text-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {\n  color: var(--%NS%mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {\n  color: var(--%NS%mat-form-field-filled-error-label-text-color, var(--%NS%mat-sys-error));\n}\n.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {\n  color: var(--%NS%mat-form-field-filled-error-focus-label-text-color, var(--%NS%mat-sys-error));\n}\n.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {\n  color: var(--%NS%mat-form-field-filled-error-hover-label-text-color, var(--%NS%mat-sys-on-error-container));\n}\n.mdc-text-field--filled .mdc-floating-label {\n  font-family: var(--%NS%mat-form-field-filled-label-text-font, var(--%NS%mat-sys-body-large-font));\n  font-size: var(--%NS%mat-form-field-filled-label-text-size, var(--%NS%mat-sys-body-large-size));\n  font-weight: var(--%NS%mat-form-field-filled-label-text-weight, var(--%NS%mat-sys-body-large-weight));\n  letter-spacing: var(--%NS%mat-form-field-filled-label-text-tracking, var(--%NS%mat-sys-body-large-tracking));\n}\n.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-floating-label {\n  color: var(--%NS%mat-form-field-outlined-label-text-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {\n  color: var(--%NS%mat-form-field-outlined-focus-label-text-color, var(--%NS%mat-sys-primary));\n}\n.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {\n  color: var(--%NS%mat-form-field-outlined-hover-label-text-color, var(--%NS%mat-sys-on-surface));\n}\n.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {\n  color: var(--%NS%mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {\n  color: var(--%NS%mat-form-field-outlined-error-label-text-color, var(--%NS%mat-sys-error));\n}\n.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {\n  color: var(--%NS%mat-form-field-outlined-error-focus-label-text-color, var(--%NS%mat-sys-error));\n}\n.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {\n  color: var(--%NS%mat-form-field-outlined-error-hover-label-text-color, var(--%NS%mat-sys-on-error-container));\n}\n.mdc-text-field--outlined .mdc-floating-label {\n  font-family: var(--%NS%mat-form-field-outlined-label-text-font, var(--%NS%mat-sys-body-large-font));\n  font-size: var(--%NS%mat-form-field-outlined-label-text-size, var(--%NS%mat-sys-body-large-size));\n  font-weight: var(--%NS%mat-form-field-outlined-label-text-weight, var(--%NS%mat-sys-body-large-weight));\n  letter-spacing: var(--%NS%mat-form-field-outlined-label-text-tracking, var(--%NS%mat-sys-body-large-tracking));\n}\n\n.mdc-floating-label--float-above {\n  cursor: auto;\n  transform: translateY(-106%) scale(0.75);\n}\n.mdc-text-field--filled .mdc-floating-label--float-above {\n  transform: translateY(-106%) scale(0.75);\n}\n.mdc-text-field--outlined .mdc-floating-label--float-above {\n  transform: translateY(-37.25px) scale(1);\n  font-size: 0.75rem;\n}\n.mdc-notched-outline .mdc-floating-label--float-above {\n  text-overflow: clip;\n}\n.mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  max-width: 133.3333333333%;\n}\n.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  transform: translateY(-34.75px) scale(0.75);\n}\n.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  font-size: 1rem;\n}\n\n.mdc-floating-label--%NS%required:not(.mdc-floating-label--hide-required-marker)::after {\n  margin-left: 1px;\n  margin-right: 0;\n  content: "*";\n}\n[dir=rtl] .mdc-floating-label--%NS%required:not(.mdc-floating-label--hide-required-marker)::after {\n  margin-left: 0;\n  margin-right: 1px;\n}\n\n.mdc-notched-outline {\n  display: flex;\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  box-sizing: border-box;\n  width: 100%;\n  max-width: 100%;\n  height: 100%;\n  text-align: left;\n  pointer-events: none;\n}\n[dir=rtl] .mdc-notched-outline {\n  text-align: right;\n}\n.mdc-text-field--outlined .mdc-notched-outline {\n  z-index: 1;\n}\n\n.mat-mdc-notch-piece {\n  box-sizing: border-box;\n  height: 100%;\n  pointer-events: none;\n  border: none;\n  border-top: 1px solid;\n  border-bottom: 1px solid;\n}\n.mdc-text-field--focused .mat-mdc-notch-piece {\n  border-width: 2px;\n}\n.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {\n  border-color: var(--%NS%mat-form-field-outlined-outline-color, var(--%NS%mat-sys-outline));\n  border-width: var(--%NS%mat-form-field-outlined-outline-width, 1px);\n}\n.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {\n  border-color: var(--%NS%mat-form-field-outlined-hover-outline-color, var(--%NS%mat-sys-on-surface));\n}\n.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {\n  border-color: var(--%NS%mat-form-field-outlined-focus-outline-color, var(--%NS%mat-sys-primary));\n}\n.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {\n  border-color: var(--%NS%mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));\n}\n.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {\n  border-color: var(--%NS%mat-form-field-outlined-error-outline-color, var(--%NS%mat-sys-error));\n}\n.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {\n  border-color: var(--%NS%mat-form-field-outlined-error-hover-outline-color, var(--%NS%mat-sys-on-error-container));\n}\n.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {\n  border-color: var(--%NS%mat-form-field-outlined-error-focus-outline-color, var(--%NS%mat-sys-error));\n}\n.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {\n  border-width: var(--%NS%mat-form-field-outlined-focus-outline-width, 2px);\n}\n\n.mdc-notched-outline__leading {\n  border-left: 1px solid;\n  border-right: none;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  border-top-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));\n  border-bottom-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));\n}\n.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {\n  width: max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));\n}\n[dir=rtl] .mdc-notched-outline__leading {\n  border-left: none;\n  border-right: 1px solid;\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n  border-top-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));\n  border-bottom-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));\n}\n\n.mdc-notched-outline__trailing {\n  flex-grow: 1;\n  border-left: none;\n  border-right: 1px solid;\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n  border-top-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));\n  border-bottom-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));\n}\n[dir=rtl] .mdc-notched-outline__trailing {\n  border-left: 1px solid;\n  border-right: none;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  border-top-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));\n  border-bottom-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));\n}\n\n.mdc-notched-outline__notch {\n  flex: 0 0 auto;\n  width: auto;\n}\n.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {\n  max-width: min(var(--%NS%mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small))) * 2));\n}\n.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {\n  max-width: min(100%, calc(100% - max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small))) * 2));\n}\n.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {\n  padding-top: 1px;\n}\n.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {\n  padding-top: 2px;\n}\n.mdc-notched-outline--notched .mdc-notched-outline__notch {\n  padding-left: 0;\n  padding-right: 8px;\n  border-top: none;\n}\n[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {\n  padding-left: 8px;\n  padding-right: 0;\n}\n.mdc-notched-outline--no-label .mdc-notched-outline__notch {\n  display: none;\n}\n\n.mdc-line-ripple::before, .mdc-line-ripple::after {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  border-bottom-style: solid;\n  content: "";\n}\n.mdc-line-ripple::before {\n  z-index: 1;\n  border-bottom-width: var(--%NS%mat-form-field-filled-active-indicator-height, 1px);\n}\n.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {\n  border-bottom-color: var(--%NS%mat-form-field-filled-active-indicator-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {\n  border-bottom-color: var(--%NS%mat-form-field-filled-hover-active-indicator-color, var(--%NS%mat-sys-on-surface));\n}\n.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {\n  border-bottom-color: var(--%NS%mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {\n  border-bottom-color: var(--%NS%mat-form-field-filled-error-active-indicator-color, var(--%NS%mat-sys-error));\n}\n.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {\n  border-bottom-color: var(--%NS%mat-form-field-filled-error-hover-active-indicator-color, var(--%NS%mat-sys-on-error-container));\n}\n.mdc-line-ripple::after {\n  transform: scaleX(0);\n  opacity: 0;\n  z-index: 2;\n}\n.mdc-text-field--filled .mdc-line-ripple::after {\n  border-bottom-width: var(--%NS%mat-form-field-filled-focus-active-indicator-height, 2px);\n}\n.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {\n  border-bottom-color: var(--%NS%mat-form-field-filled-focus-active-indicator-color, var(--%NS%mat-sys-primary));\n}\n.mdc-text-field--filled.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {\n  border-bottom-color: var(--%NS%mat-form-field-filled-error-focus-active-indicator-color, var(--%NS%mat-sys-error));\n}\n\n.mdc-line-ripple--%NS%active::after {\n  transform: scaleX(1);\n  opacity: 1;\n}\n\n.mdc-line-ripple--%NS%deactivating::after {\n  opacity: 0;\n}\n\n.mdc-text-field--disabled {\n  pointer-events: none;\n}\n\n.mat-mdc-form-field-textarea-control {\n  vertical-align: middle;\n  resize: vertical;\n  box-sizing: border-box;\n  height: auto;\n  margin: 0;\n  padding: 0;\n  border: none;\n  overflow: auto;\n}\n\n.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font: inherit;\n  letter-spacing: inherit;\n  text-decoration: inherit;\n  text-transform: inherit;\n  border: none;\n}\n\n.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  line-height: normal;\n  pointer-events: all;\n  will-change: auto;\n}\n\n.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {\n  cursor: inherit;\n}\n\n.mdc-text-field--%NS%no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,\n.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {\n  height: auto;\n}\n\n.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {\n  height: 23px;\n}\n\n.mat-mdc-text-field-wrapper {\n  height: auto;\n  flex: auto;\n  will-change: auto;\n}\n\n.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {\n  padding-left: 0;\n  --%NS%mat-mdc-form-field-label-offset-x: -16px;\n}\n\n.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {\n  padding-right: 0;\n}\n\n[dir=rtl] .mat-mdc-text-field-wrapper {\n  padding-left: 16px;\n  padding-right: 16px;\n}\n[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {\n  padding-left: 0;\n}\n[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {\n  padding-right: 0;\n}\n\n.mat-form-field-disabled .mdc-text-field__input::placeholder {\n  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {\n  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {\n  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {\n  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n\n.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {\n  transition-delay: 40ms;\n  transition-duration: 110ms;\n  opacity: 1;\n}\n\n.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {\n  left: auto;\n  right: auto;\n}\n\n.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {\n  display: inline-block;\n}\n\n.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {\n  padding-top: 0;\n}\n\n.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {\n  border-left: 1px solid transparent;\n}\n\n[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {\n  border-left: none;\n  border-right: 1px solid transparent;\n}\n\n.mat-mdc-form-field-infix {\n  min-height: var(--%NS%mat-form-field-container-height, 56px);\n  padding-top: var(--%NS%mat-form-field-filled-with-label-container-padding-top, 24px);\n  padding-bottom: var(--%NS%mat-form-field-filled-with-label-container-padding-bottom, 8px);\n}\n.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {\n  padding-top: var(--%NS%mat-form-field-container-vertical-padding, 16px);\n  padding-bottom: var(--%NS%mat-form-field-container-vertical-padding, 16px);\n}\n\n.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {\n  top: calc(var(--%NS%mat-form-field-container-height, 56px) / 2);\n}\n\n.mdc-text-field--filled .mat-mdc-floating-label {\n  display: var(--%NS%mat-form-field-filled-label-display, block);\n}\n\n.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  --%NS%mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--%NS%mat-form-field-container-height, 56px) / 2) * -1))\n    scale(var(--%NS%mat-mdc-form-field-floating-label-scale, 0.75));\n  transform: var(--%NS%mat-mdc-form-field-label-transform);\n}\n\n@keyframes _mat-form-field-subscript-animation {\n  from {\n    opacity: 0;\n    transform: translateY(-5px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.mat-mdc-form-field-subscript-wrapper {\n  box-sizing: border-box;\n  width: 100%;\n  position: relative;\n}\n\n.mat-mdc-form-field-hint-wrapper,\n.mat-mdc-form-field-error-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  padding: 0 16px;\n  opacity: 1;\n  transform: translateY(0);\n  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);\n}\n\n.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,\n.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {\n  position: static;\n}\n\n.mat-mdc-form-field-bottom-align::before {\n  content: "";\n  display: inline-block;\n  height: 16px;\n}\n\n.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {\n  content: unset;\n}\n\n.mat-mdc-form-field-hint-end {\n  order: 1;\n}\n\n.mat-mdc-form-field-hint-wrapper {\n  display: flex;\n}\n\n.mat-mdc-form-field-hint-spacer {\n  flex: 1 0 1em;\n}\n\n.mat-mdc-form-field-error {\n  display: block;\n  color: var(--%NS%mat-form-field-error-text-color, var(--%NS%mat-sys-error));\n}\n\n.mat-mdc-form-field-subscript-wrapper,\n.mat-mdc-form-field-bottom-align::before {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-family: var(--%NS%mat-form-field-subscript-text-font, var(--%NS%mat-sys-body-small-font));\n  line-height: var(--%NS%mat-form-field-subscript-text-line-height, var(--%NS%mat-sys-body-small-line-height));\n  font-size: var(--%NS%mat-form-field-subscript-text-size, var(--%NS%mat-sys-body-small-size));\n  letter-spacing: var(--%NS%mat-form-field-subscript-text-tracking, var(--%NS%mat-sys-body-small-tracking));\n  font-weight: var(--%NS%mat-form-field-subscript-text-weight, var(--%NS%mat-sys-body-small-weight));\n}\n\n.mat-mdc-form-field-focus-overlay {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  opacity: 0;\n  pointer-events: none;\n  background-color: var(--%NS%mat-form-field-state-layer-color, var(--%NS%mat-sys-on-surface));\n}\n.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {\n  opacity: var(--%NS%mat-form-field-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {\n  opacity: var(--%NS%mat-form-field-focus-state-layer-opacity, 0);\n}\n\nselect.mat-mdc-form-field-input-control {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  background-color: transparent;\n  display: inline-flex;\n  box-sizing: border-box;\n}\nselect.mat-mdc-form-field-input-control:not(:disabled) {\n  cursor: pointer;\n}\nselect.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {\n  color: var(--%NS%mat-form-field-select-option-text-color, var(--%NS%mat-sys-neutral10));\n}\nselect.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {\n  color: var(--%NS%mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--%NS%mat-sys-neutral10) 38%, transparent));\n}\n\n.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {\n  content: "";\n  width: 0;\n  height: 0;\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n  border-top: 5px solid;\n  position: absolute;\n  right: 0;\n  top: 50%;\n  margin-top: -2.5px;\n  pointer-events: none;\n  color: var(--%NS%mat-form-field-enabled-select-arrow-color, var(--%NS%mat-sys-on-surface-variant));\n}\n[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {\n  right: auto;\n  left: 0;\n}\n.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {\n  color: var(--%NS%mat-form-field-focus-select-arrow-color, var(--%NS%mat-sys-primary));\n}\n.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {\n  color: var(--%NS%mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {\n  padding-right: 15px;\n}\n[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {\n  padding-right: 0;\n  padding-left: 15px;\n}\n\n@media (forced-colors: active) {\n  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {\n    outline: solid 1px;\n  }\n}\n@media (forced-colors: active) {\n  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {\n    outline-color: GrayText;\n  }\n}\n\n@media (forced-colors: active) {\n  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {\n    outline: dashed 3px;\n  }\n}\n\n@media (forced-colors: active) {\n  .mat-mdc-form-field.mat-focused .mdc-notched-outline {\n    border: dashed 3px;\n  }\n}\n\n.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {\n  line-height: 1;\n}\n.mat-mdc-form-field-input-control::-webkit-datetime-edit {\n  line-height: 1;\n  padding: 0;\n  margin-bottom: -2px;\n}\n\n.mat-mdc-form-field {\n  --%NS%mat-mdc-form-field-floating-label-scale: 0.75;\n  display: inline-flex;\n  flex-direction: column;\n  min-width: 0;\n  text-align: left;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-family: var(--%NS%mat-form-field-container-text-font, var(--%NS%mat-sys-body-large-font));\n  line-height: var(--%NS%mat-form-field-container-text-line-height, var(--%NS%mat-sys-body-large-line-height));\n  font-size: var(--%NS%mat-form-field-container-text-size, var(--%NS%mat-sys-body-large-size));\n  letter-spacing: var(--%NS%mat-form-field-container-text-tracking, var(--%NS%mat-sys-body-large-tracking));\n  font-weight: var(--%NS%mat-form-field-container-text-weight, var(--%NS%mat-sys-body-large-weight));\n}\n.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {\n  font-size: calc(var(--%NS%mat-form-field-outlined-label-text-populated-size) * var(--%NS%mat-mdc-form-field-floating-label-scale));\n}\n.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  font-size: var(--%NS%mat-form-field-outlined-label-text-populated-size);\n}\n[dir=rtl] .mat-mdc-form-field {\n  text-align: right;\n}\n\n.mat-mdc-form-field-flex {\n  display: inline-flex;\n  align-items: baseline;\n  box-sizing: border-box;\n  width: 100%;\n}\n\n.mat-mdc-text-field-wrapper {\n  width: 100%;\n  z-index: 0;\n}\n\n.mat-mdc-form-field-icon-prefix,\n.mat-mdc-form-field-icon-suffix {\n  align-self: center;\n  line-height: 0;\n  pointer-events: auto;\n  position: relative;\n  z-index: 1;\n}\n.mat-mdc-form-field-icon-prefix > .mat-icon,\n.mat-mdc-form-field-icon-suffix > .mat-icon {\n  padding: 0 12px;\n  box-sizing: content-box;\n}\n\n.mat-mdc-form-field-icon-prefix {\n  color: var(--%NS%mat-form-field-leading-icon-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {\n  color: var(--%NS%mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n\n.mat-mdc-form-field-icon-suffix {\n  color: var(--%NS%mat-form-field-trailing-icon-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {\n  color: var(--%NS%mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {\n  color: var(--%NS%mat-form-field-error-trailing-icon-color, var(--%NS%mat-sys-error));\n}\n.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {\n  color: var(--%NS%mat-form-field-error-hover-trailing-icon-color, var(--%NS%mat-sys-on-error-container));\n}\n.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {\n  color: var(--%NS%mat-form-field-error-focus-trailing-icon-color, var(--%NS%mat-sys-error));\n}\n\n.mat-mdc-form-field-icon-prefix,\n[dir=rtl] .mat-mdc-form-field-icon-suffix {\n  padding: 0 4px 0 0;\n}\n\n.mat-mdc-form-field-icon-suffix,\n[dir=rtl] .mat-mdc-form-field-icon-prefix {\n  padding: 0 0 0 4px;\n}\n\n.mat-mdc-form-field-subscript-wrapper .mat-icon,\n.mat-mdc-form-field label .mat-icon {\n  width: 1em;\n  height: 1em;\n  font-size: inherit;\n}\n\n.mat-mdc-form-field-infix {\n  flex: auto;\n  min-width: 0;\n  width: 180px;\n  position: relative;\n  box-sizing: border-box;\n}\n.mat-mdc-form-field-infix:has(textarea[cols]) {\n  width: auto;\n}\n\n.mat-mdc-form-field .mdc-notched-outline__notch {\n  margin-left: -1px;\n  -webkit-clip-path: inset(-9em -999em -9em 1px);\n  clip-path: inset(-9em -999em -9em 1px);\n}\n[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {\n  margin-left: 0;\n  margin-right: -1px;\n  -webkit-clip-path: inset(-9em 1px -9em -999em);\n  clip-path: inset(-9em 1px -9em -999em);\n}\n\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {\n  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {\n  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {\n  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {\n  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {\n  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {\n  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {\n  transition-delay: 40ms;\n  transition-duration: 110ms;\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {\n  transition-delay: 40ms;\n  transition-duration: 110ms;\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {\n  transition-delay: 40ms;\n  transition-duration: 110ms;\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {\n  transition-delay: 40ms;\n  transition-duration: 110ms;\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--%NS%filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {\n  transition-duration: 75ms;\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {\n  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,\n.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {\n  animation-duration: 300ms;\n}\n\n.mdc-notched-outline .mdc-floating-label {\n  max-width: calc(100% + 1px);\n}\n\n.mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  max-width: calc(133.3333333333% + 1px);\n}\n'],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormField, [{
    type: Component,
    args: [{
      selector: "mat-form-field",
      exportAs: "matFormField",
      host: {
        "class": "mat-mdc-form-field",
        "[class.mat-mdc-form-field-label-always-float]": "_shouldAlwaysFloat()",
        "[class.mat-mdc-form-field-has-icon-prefix]": "_hasIconPrefix",
        "[class.mat-mdc-form-field-has-icon-suffix]": "_hasIconSuffix",
        "[class.mat-form-field-invalid]": "_unwrapMaybeSignal(_control.errorState)",
        "[class.mat-form-field-disabled]": "_unwrapMaybeSignal(_control.disabled)",
        "[class.mat-form-field-autofilled]": "_unwrapMaybeSignal(_control.autofilled)",
        "[class.mat-form-field-appearance-fill]": 'appearance == "fill"',
        "[class.mat-form-field-appearance-outline]": 'appearance == "outline"',
        "[class.mat-form-field-hide-placeholder]": "_hasFloatingLabel() && !_shouldLabelFloat()",
        "[class.mat-primary]": 'color !== "accent" && color !== "warn"',
        "[class.mat-accent]": 'color === "accent"',
        "[class.mat-warn]": 'color === "warn"',
        "[class.ng-untouched]": '_shouldForward("untouched")',
        "[class.ng-touched]": '_shouldForward("touched")',
        "[class.ng-pristine]": '_shouldForward("pristine")',
        "[class.ng-dirty]": '_shouldForward("dirty")',
        "[class.ng-valid]": '_shouldForward("valid")',
        "[class.ng-invalid]": '_shouldForward("invalid")',
        "[class.ng-pending]": '_shouldForward("pending")'
      },
      encapsulation: ViewEncapsulation.None,
      providers: [{
        provide: MAT_FORM_FIELD,
        useExisting: MatFormField
      }, {
        provide: FLOATING_LABEL_PARENT,
        useExisting: MatFormField
      }],
      imports: [MatFormFieldFloatingLabel, MatFormFieldNotchedOutline, NgTemplateOutlet, MatFormFieldLineRipple, MatHint],
      template: '<ng-template #labelTemplate>\n  <!--\n    MDC recommends that the text-field is a `<label>` element. This rather complicates the\n    setup because it would require every form-field control to explicitly set `aria-labelledby`.\n    This is because the `<label>` itself contains more than the actual label (e.g. prefix, suffix\n    or other projected content), and screen readers could potentially read out undesired content.\n    Excluding elements from being printed out requires them to be marked with `aria-hidden`, or\n    the form control is set to a scoped element for the label (using `aria-labelledby`). Both of\n    these options seem to complicate the setup because we know exactly what content is rendered\n    as part of the label, and we don\'t want to spend resources on walking through projected content\n    to set `aria-hidden`. Nor do we want to set `aria-labelledby` on every form control if we could\n    simply link the label to the control using the label `for` attribute.\n  -->\n  @if (_hasFloatingLabel()) {\n    <label\n      matFormFieldFloatingLabel\n      [floating]="_shouldLabelFloat()"\n      [monitorResize]="_hasOutline()"\n      [id]="_labelId"\n      [attr.for]="_control.disableAutomaticLabeling ? null : _control.id"\n    >\n      <ng-content select="mat-label"></ng-content>\n      <!--\n        We set the required marker as a separate element, in order to make it easier to target if\n        apps want to override it and to be able to set `aria-hidden` so that screen readers don\'t\n        pick it up.\n       -->\n      @if (!hideRequiredMarker && _unwrapMaybeSignal(_control.required)) {\n        <span\n          aria-hidden="true"\n          class="mat-mdc-form-field-required-marker mdc-floating-label--required"\n        ></span>\n      }\n    </label>\n  }\n</ng-template>\n\n@let isDisabled = _unwrapMaybeSignal(_control.disabled);\n\n<div\n  class="mat-mdc-text-field-wrapper mdc-text-field"\n  #textField\n  [class.mdc-text-field--filled]="!_hasOutline()"\n  [class.mdc-text-field--outlined]="_hasOutline()"\n  [class.mdc-text-field--no-label]="!_hasFloatingLabel()"\n  [class.mdc-text-field--disabled]="isDisabled"\n  [class.mdc-text-field--invalid]="_unwrapMaybeSignal(_control.errorState)"\n  (click)="_control.onContainerClick($event)"\n>\n  @if (!_hasOutline() && !isDisabled) {\n    <div class="mat-mdc-form-field-focus-overlay"></div>\n  }\n  <div class="mat-mdc-form-field-flex">\n    @if (_hasOutline()) {\n      <div matFormFieldNotchedOutline [matFormFieldNotchedOutlineOpen]="_shouldLabelFloat()">\n        @if (!_forceDisplayInfixLabel()) {\n          <ng-template [ngTemplateOutlet]="labelTemplate"></ng-template>\n        }\n      </div>\n    }\n\n    @if (_hasIconPrefix) {\n      <div class="mat-mdc-form-field-icon-prefix" #iconPrefixContainer>\n        <ng-content select="[matPrefix], [matIconPrefix]"></ng-content>\n      </div>\n    }\n\n    @if (_hasTextPrefix) {\n      <div class="mat-mdc-form-field-text-prefix" #textPrefixContainer>\n        <ng-content select="[matTextPrefix]"></ng-content>\n      </div>\n    }\n\n    <div class="mat-mdc-form-field-infix">\n      @if (!_hasOutline() || _forceDisplayInfixLabel()) {\n        <ng-template [ngTemplateOutlet]="labelTemplate"></ng-template>\n      }\n\n      <ng-content></ng-content>\n    </div>\n\n    @if (_hasTextSuffix) {\n      <div class="mat-mdc-form-field-text-suffix" #textSuffixContainer>\n        <ng-content select="[matTextSuffix]"></ng-content>\n      </div>\n    }\n\n    @if (_hasIconSuffix) {\n      <div class="mat-mdc-form-field-icon-suffix" #iconSuffixContainer>\n        <ng-content select="[matSuffix], [matIconSuffix]"></ng-content>\n      </div>\n    }\n  </div>\n\n  @if (!_hasOutline()) {\n    <div matFormFieldLineRipple></div>\n  }\n</div>\n\n<div aria-atomic="true" aria-live="polite"\n  class="mat-mdc-form-field-subscript-wrapper mat-mdc-form-field-bottom-align"\n  [class.mat-mdc-form-field-subscript-dynamic-size]="subscriptSizing === \'dynamic\'"\n>\n  @let subscriptMessageType = _getSubscriptMessageType();\n\n  @switch (subscriptMessageType) {\n    @case (\'error\') {\n      <div class="mat-mdc-form-field-error-wrapper">\n        <ng-content select="mat-error, [matError]"></ng-content>\n      </div>\n    }\n\n    @case (\'hint\') {\n      <div class="mat-mdc-form-field-hint-wrapper">\n        @if (hintLabel) {\n          <mat-hint [id]="_hintLabelId">{{hintLabel}}</mat-hint>\n        }\n        <ng-content select="mat-hint:not([align=\'end\'])"></ng-content>\n        <div class="mat-mdc-form-field-hint-spacer"></div>\n        <ng-content select="mat-hint[align=\'end\']"></ng-content>\n      </div>\n    }\n  }\n</div>\n',
      styles: ['.mdc-text-field {\n  display: inline-flex;\n  align-items: baseline;\n  padding: 0 16px;\n  position: relative;\n  box-sizing: border-box;\n  overflow: hidden;\n  will-change: opacity, transform, color;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.mdc-text-field__input {\n  width: 100%;\n  min-width: 0;\n  border: none;\n  border-radius: 0;\n  background: none;\n  padding: 0;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  height: 28px;\n}\n.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {\n  display: none;\n}\n.mdc-text-field__input::-ms-clear {\n  display: none;\n}\n.mdc-text-field__input:focus {\n  outline: none;\n}\n.mdc-text-field__input:invalid {\n  box-shadow: none;\n}\n.mdc-text-field__input::placeholder {\n  opacity: 0;\n}\n.mdc-text-field__input::-moz-placeholder {\n  opacity: 0;\n}\n.mdc-text-field__input::-webkit-input-placeholder {\n  opacity: 0;\n}\n.mdc-text-field__input:-ms-input-placeholder {\n  opacity: 0;\n}\n.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {\n  opacity: 1;\n}\n.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {\n  opacity: 1;\n}\n.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {\n  opacity: 1;\n}\n.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {\n  opacity: 1;\n}\n.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {\n  opacity: 0;\n}\n.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {\n  opacity: 0;\n}\n.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {\n  opacity: 0;\n}\n.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {\n  opacity: 0;\n}\n.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {\n  height: 100%;\n}\n.mdc-text-field--outlined .mdc-text-field__input {\n  display: flex;\n  border: none !important;\n  background-color: transparent;\n}\n.mdc-text-field--disabled .mdc-text-field__input {\n  pointer-events: auto;\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input {\n  color: var(--mat-form-field-filled-input-text-color, var(--mat-sys-on-surface));\n  caret-color: var(--mat-form-field-filled-caret-color, var(--mat-sys-primary));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {\n  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {\n  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {\n  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {\n  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {\n  color: var(--mat-form-field-outlined-input-text-color, var(--mat-sys-on-surface));\n  caret-color: var(--mat-form-field-outlined-caret-color, var(--mat-sys-primary));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {\n  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {\n  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {\n  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {\n  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {\n  caret-color: var(--mat-form-field-filled-error-caret-color, var(--mat-sys-error));\n}\n.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {\n  caret-color: var(--mat-form-field-outlined-error-caret-color, var(--mat-sys-error));\n}\n.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {\n  color: var(--mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {\n  color: var(--mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n@media (forced-colors: active) {\n  .mdc-text-field--disabled .mdc-text-field__input {\n    background-color: Window;\n  }\n}\n\n.mdc-text-field--filled {\n  height: 56px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n  border-top-left-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));\n  border-top-right-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) {\n  background-color: var(--mat-form-field-filled-container-color, var(--mat-sys-surface-variant));\n}\n.mdc-text-field--filled.mdc-text-field--disabled {\n  background-color: var(--mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 4%, transparent));\n}\n\n.mdc-text-field--outlined {\n  height: 56px;\n  overflow: visible;\n  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));\n  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);\n}\n[dir=rtl] .mdc-text-field--outlined {\n  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);\n  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));\n}\n\n.mdc-floating-label {\n  position: absolute;\n  left: 0;\n  transform-origin: left top;\n  line-height: 1.15rem;\n  text-align: left;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  cursor: text;\n  overflow: hidden;\n  will-change: transform;\n}\n[dir=rtl] .mdc-floating-label {\n  right: 0;\n  left: auto;\n  transform-origin: right top;\n  text-align: right;\n}\n.mdc-text-field .mdc-floating-label {\n  top: 50%;\n  transform: translateY(-50%);\n  pointer-events: none;\n}\n.mdc-notched-outline .mdc-floating-label {\n  display: inline-block;\n  position: relative;\n  max-width: 100%;\n}\n.mdc-text-field--outlined .mdc-floating-label {\n  left: 4px;\n  right: auto;\n}\n[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {\n  left: auto;\n  right: 4px;\n}\n.mdc-text-field--filled .mdc-floating-label {\n  left: 16px;\n  right: auto;\n}\n[dir=rtl] .mdc-text-field--filled .mdc-floating-label {\n  left: auto;\n  right: 16px;\n}\n.mdc-text-field--disabled .mdc-floating-label {\n  cursor: default;\n}\n@media (forced-colors: active) {\n  .mdc-text-field--disabled .mdc-floating-label {\n    z-index: 1;\n  }\n}\n.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {\n  display: none;\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label {\n  color: var(--mat-form-field-filled-label-text-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {\n  color: var(--mat-form-field-filled-focus-label-text-color, var(--mat-sys-primary));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {\n  color: var(--mat-form-field-filled-hover-label-text-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {\n  color: var(--mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {\n  color: var(--mat-form-field-filled-error-label-text-color, var(--mat-sys-error));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {\n  color: var(--mat-form-field-filled-error-focus-label-text-color, var(--mat-sys-error));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {\n  color: var(--mat-form-field-filled-error-hover-label-text-color, var(--mat-sys-on-error-container));\n}\n.mdc-text-field--filled .mdc-floating-label {\n  font-family: var(--mat-form-field-filled-label-text-font, var(--mat-sys-body-large-font));\n  font-size: var(--mat-form-field-filled-label-text-size, var(--mat-sys-body-large-size));\n  font-weight: var(--mat-form-field-filled-label-text-weight, var(--mat-sys-body-large-weight));\n  letter-spacing: var(--mat-form-field-filled-label-text-tracking, var(--mat-sys-body-large-tracking));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label {\n  color: var(--mat-form-field-outlined-label-text-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {\n  color: var(--mat-form-field-outlined-focus-label-text-color, var(--mat-sys-primary));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {\n  color: var(--mat-form-field-outlined-hover-label-text-color, var(--mat-sys-on-surface));\n}\n.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {\n  color: var(--mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {\n  color: var(--mat-form-field-outlined-error-label-text-color, var(--mat-sys-error));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {\n  color: var(--mat-form-field-outlined-error-focus-label-text-color, var(--mat-sys-error));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {\n  color: var(--mat-form-field-outlined-error-hover-label-text-color, var(--mat-sys-on-error-container));\n}\n.mdc-text-field--outlined .mdc-floating-label {\n  font-family: var(--mat-form-field-outlined-label-text-font, var(--mat-sys-body-large-font));\n  font-size: var(--mat-form-field-outlined-label-text-size, var(--mat-sys-body-large-size));\n  font-weight: var(--mat-form-field-outlined-label-text-weight, var(--mat-sys-body-large-weight));\n  letter-spacing: var(--mat-form-field-outlined-label-text-tracking, var(--mat-sys-body-large-tracking));\n}\n\n.mdc-floating-label--float-above {\n  cursor: auto;\n  transform: translateY(-106%) scale(0.75);\n}\n.mdc-text-field--filled .mdc-floating-label--float-above {\n  transform: translateY(-106%) scale(0.75);\n}\n.mdc-text-field--outlined .mdc-floating-label--float-above {\n  transform: translateY(-37.25px) scale(1);\n  font-size: 0.75rem;\n}\n.mdc-notched-outline .mdc-floating-label--float-above {\n  text-overflow: clip;\n}\n.mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  max-width: 133.3333333333%;\n}\n.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  transform: translateY(-34.75px) scale(0.75);\n}\n.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  font-size: 1rem;\n}\n\n.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {\n  margin-left: 1px;\n  margin-right: 0;\n  content: "*";\n}\n[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {\n  margin-left: 0;\n  margin-right: 1px;\n}\n\n.mdc-notched-outline {\n  display: flex;\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  box-sizing: border-box;\n  width: 100%;\n  max-width: 100%;\n  height: 100%;\n  text-align: left;\n  pointer-events: none;\n}\n[dir=rtl] .mdc-notched-outline {\n  text-align: right;\n}\n.mdc-text-field--outlined .mdc-notched-outline {\n  z-index: 1;\n}\n\n.mat-mdc-notch-piece {\n  box-sizing: border-box;\n  height: 100%;\n  pointer-events: none;\n  border: none;\n  border-top: 1px solid;\n  border-bottom: 1px solid;\n}\n.mdc-text-field--focused .mat-mdc-notch-piece {\n  border-width: 2px;\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-outline-color, var(--mat-sys-outline));\n  border-width: var(--mat-form-field-outlined-outline-width, 1px);\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-hover-outline-color, var(--mat-sys-on-surface));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-focus-outline-color, var(--mat-sys-primary));\n}\n.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-error-outline-color, var(--mat-sys-error));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-error-hover-outline-color, var(--mat-sys-on-error-container));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {\n  border-color: var(--mat-form-field-outlined-error-focus-outline-color, var(--mat-sys-error));\n}\n.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {\n  border-width: var(--mat-form-field-outlined-focus-outline-width, 2px);\n}\n\n.mdc-notched-outline__leading {\n  border-left: 1px solid;\n  border-right: none;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n}\n.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {\n  width: max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));\n}\n[dir=rtl] .mdc-notched-outline__leading {\n  border-left: none;\n  border-right: 1px solid;\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n}\n\n.mdc-notched-outline__trailing {\n  flex-grow: 1;\n  border-left: none;\n  border-right: 1px solid;\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n}\n[dir=rtl] .mdc-notched-outline__trailing {\n  border-left: 1px solid;\n  border-right: none;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));\n}\n\n.mdc-notched-outline__notch {\n  flex: 0 0 auto;\n  width: auto;\n}\n.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {\n  max-width: min(var(--mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));\n}\n.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {\n  max-width: min(100%, calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));\n}\n.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {\n  padding-top: 1px;\n}\n.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {\n  padding-top: 2px;\n}\n.mdc-notched-outline--notched .mdc-notched-outline__notch {\n  padding-left: 0;\n  padding-right: 8px;\n  border-top: none;\n}\n[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {\n  padding-left: 8px;\n  padding-right: 0;\n}\n.mdc-notched-outline--no-label .mdc-notched-outline__notch {\n  display: none;\n}\n\n.mdc-line-ripple::before, .mdc-line-ripple::after {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  border-bottom-style: solid;\n  content: "";\n}\n.mdc-line-ripple::before {\n  z-index: 1;\n  border-bottom-width: var(--mat-form-field-filled-active-indicator-height, 1px);\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {\n  border-bottom-color: var(--mat-form-field-filled-active-indicator-color, var(--mat-sys-on-surface-variant));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {\n  border-bottom-color: var(--mat-form-field-filled-hover-active-indicator-color, var(--mat-sys-on-surface));\n}\n.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {\n  border-bottom-color: var(--mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {\n  border-bottom-color: var(--mat-form-field-filled-error-active-indicator-color, var(--mat-sys-error));\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {\n  border-bottom-color: var(--mat-form-field-filled-error-hover-active-indicator-color, var(--mat-sys-on-error-container));\n}\n.mdc-line-ripple::after {\n  transform: scaleX(0);\n  opacity: 0;\n  z-index: 2;\n}\n.mdc-text-field--filled .mdc-line-ripple::after {\n  border-bottom-width: var(--mat-form-field-filled-focus-active-indicator-height, 2px);\n}\n.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {\n  border-bottom-color: var(--mat-form-field-filled-focus-active-indicator-color, var(--mat-sys-primary));\n}\n.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {\n  border-bottom-color: var(--mat-form-field-filled-error-focus-active-indicator-color, var(--mat-sys-error));\n}\n\n.mdc-line-ripple--active::after {\n  transform: scaleX(1);\n  opacity: 1;\n}\n\n.mdc-line-ripple--deactivating::after {\n  opacity: 0;\n}\n\n.mdc-text-field--disabled {\n  pointer-events: none;\n}\n\n.mat-mdc-form-field-textarea-control {\n  vertical-align: middle;\n  resize: vertical;\n  box-sizing: border-box;\n  height: auto;\n  margin: 0;\n  padding: 0;\n  border: none;\n  overflow: auto;\n}\n\n.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font: inherit;\n  letter-spacing: inherit;\n  text-decoration: inherit;\n  text-transform: inherit;\n  border: none;\n}\n\n.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  line-height: normal;\n  pointer-events: all;\n  will-change: auto;\n}\n\n.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {\n  cursor: inherit;\n}\n\n.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,\n.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {\n  height: auto;\n}\n\n.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {\n  height: 23px;\n}\n\n.mat-mdc-text-field-wrapper {\n  height: auto;\n  flex: auto;\n  will-change: auto;\n}\n\n.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {\n  padding-left: 0;\n  --mat-mdc-form-field-label-offset-x: -16px;\n}\n\n.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {\n  padding-right: 0;\n}\n\n[dir=rtl] .mat-mdc-text-field-wrapper {\n  padding-left: 16px;\n  padding-right: 16px;\n}\n[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {\n  padding-left: 0;\n}\n[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {\n  padding-right: 0;\n}\n\n.mat-form-field-disabled .mdc-text-field__input::placeholder {\n  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {\n  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {\n  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {\n  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n\n.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {\n  transition-delay: 40ms;\n  transition-duration: 110ms;\n  opacity: 1;\n}\n\n.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {\n  left: auto;\n  right: auto;\n}\n\n.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {\n  display: inline-block;\n}\n\n.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {\n  padding-top: 0;\n}\n\n.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {\n  border-left: 1px solid transparent;\n}\n\n[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {\n  border-left: none;\n  border-right: 1px solid transparent;\n}\n\n.mat-mdc-form-field-infix {\n  min-height: var(--mat-form-field-container-height, 56px);\n  padding-top: var(--mat-form-field-filled-with-label-container-padding-top, 24px);\n  padding-bottom: var(--mat-form-field-filled-with-label-container-padding-bottom, 8px);\n}\n.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {\n  padding-top: var(--mat-form-field-container-vertical-padding, 16px);\n  padding-bottom: var(--mat-form-field-container-vertical-padding, 16px);\n}\n\n.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {\n  top: calc(var(--mat-form-field-container-height, 56px) / 2);\n}\n\n.mdc-text-field--filled .mat-mdc-floating-label {\n  display: var(--mat-form-field-filled-label-display, block);\n}\n\n.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  --mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height, 56px) / 2) * -1))\n    scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));\n  transform: var(--mat-mdc-form-field-label-transform);\n}\n\n@keyframes _mat-form-field-subscript-animation {\n  from {\n    opacity: 0;\n    transform: translateY(-5px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.mat-mdc-form-field-subscript-wrapper {\n  box-sizing: border-box;\n  width: 100%;\n  position: relative;\n}\n\n.mat-mdc-form-field-hint-wrapper,\n.mat-mdc-form-field-error-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  padding: 0 16px;\n  opacity: 1;\n  transform: translateY(0);\n  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);\n}\n\n.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,\n.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {\n  position: static;\n}\n\n.mat-mdc-form-field-bottom-align::before {\n  content: "";\n  display: inline-block;\n  height: 16px;\n}\n\n.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {\n  content: unset;\n}\n\n.mat-mdc-form-field-hint-end {\n  order: 1;\n}\n\n.mat-mdc-form-field-hint-wrapper {\n  display: flex;\n}\n\n.mat-mdc-form-field-hint-spacer {\n  flex: 1 0 1em;\n}\n\n.mat-mdc-form-field-error {\n  display: block;\n  color: var(--mat-form-field-error-text-color, var(--mat-sys-error));\n}\n\n.mat-mdc-form-field-subscript-wrapper,\n.mat-mdc-form-field-bottom-align::before {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-family: var(--mat-form-field-subscript-text-font, var(--mat-sys-body-small-font));\n  line-height: var(--mat-form-field-subscript-text-line-height, var(--mat-sys-body-small-line-height));\n  font-size: var(--mat-form-field-subscript-text-size, var(--mat-sys-body-small-size));\n  letter-spacing: var(--mat-form-field-subscript-text-tracking, var(--mat-sys-body-small-tracking));\n  font-weight: var(--mat-form-field-subscript-text-weight, var(--mat-sys-body-small-weight));\n}\n\n.mat-mdc-form-field-focus-overlay {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  opacity: 0;\n  pointer-events: none;\n  background-color: var(--mat-form-field-state-layer-color, var(--mat-sys-on-surface));\n}\n.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {\n  opacity: var(--mat-form-field-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));\n}\n.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {\n  opacity: var(--mat-form-field-focus-state-layer-opacity, 0);\n}\n\nselect.mat-mdc-form-field-input-control {\n  -moz-appearance: none;\n  -webkit-appearance: none;\n  background-color: transparent;\n  display: inline-flex;\n  box-sizing: border-box;\n}\nselect.mat-mdc-form-field-input-control:not(:disabled) {\n  cursor: pointer;\n}\nselect.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {\n  color: var(--mat-form-field-select-option-text-color, var(--mat-sys-neutral10));\n}\nselect.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {\n  color: var(--mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--mat-sys-neutral10) 38%, transparent));\n}\n\n.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {\n  content: "";\n  width: 0;\n  height: 0;\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n  border-top: 5px solid;\n  position: absolute;\n  right: 0;\n  top: 50%;\n  margin-top: -2.5px;\n  pointer-events: none;\n  color: var(--mat-form-field-enabled-select-arrow-color, var(--mat-sys-on-surface-variant));\n}\n[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {\n  right: auto;\n  left: 0;\n}\n.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {\n  color: var(--mat-form-field-focus-select-arrow-color, var(--mat-sys-primary));\n}\n.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {\n  color: var(--mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {\n  padding-right: 15px;\n}\n[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {\n  padding-right: 0;\n  padding-left: 15px;\n}\n\n@media (forced-colors: active) {\n  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {\n    outline: solid 1px;\n  }\n}\n@media (forced-colors: active) {\n  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {\n    outline-color: GrayText;\n  }\n}\n\n@media (forced-colors: active) {\n  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {\n    outline: dashed 3px;\n  }\n}\n\n@media (forced-colors: active) {\n  .mat-mdc-form-field.mat-focused .mdc-notched-outline {\n    border: dashed 3px;\n  }\n}\n\n.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {\n  line-height: 1;\n}\n.mat-mdc-form-field-input-control::-webkit-datetime-edit {\n  line-height: 1;\n  padding: 0;\n  margin-bottom: -2px;\n}\n\n.mat-mdc-form-field {\n  --mat-mdc-form-field-floating-label-scale: 0.75;\n  display: inline-flex;\n  flex-direction: column;\n  min-width: 0;\n  text-align: left;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-family: var(--mat-form-field-container-text-font, var(--mat-sys-body-large-font));\n  line-height: var(--mat-form-field-container-text-line-height, var(--mat-sys-body-large-line-height));\n  font-size: var(--mat-form-field-container-text-size, var(--mat-sys-body-large-size));\n  letter-spacing: var(--mat-form-field-container-text-tracking, var(--mat-sys-body-large-tracking));\n  font-weight: var(--mat-form-field-container-text-weight, var(--mat-sys-body-large-weight));\n}\n.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {\n  font-size: calc(var(--mat-form-field-outlined-label-text-populated-size) * var(--mat-mdc-form-field-floating-label-scale));\n}\n.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  font-size: var(--mat-form-field-outlined-label-text-populated-size);\n}\n[dir=rtl] .mat-mdc-form-field {\n  text-align: right;\n}\n\n.mat-mdc-form-field-flex {\n  display: inline-flex;\n  align-items: baseline;\n  box-sizing: border-box;\n  width: 100%;\n}\n\n.mat-mdc-text-field-wrapper {\n  width: 100%;\n  z-index: 0;\n}\n\n.mat-mdc-form-field-icon-prefix,\n.mat-mdc-form-field-icon-suffix {\n  align-self: center;\n  line-height: 0;\n  pointer-events: auto;\n  position: relative;\n  z-index: 1;\n}\n.mat-mdc-form-field-icon-prefix > .mat-icon,\n.mat-mdc-form-field-icon-suffix > .mat-icon {\n  padding: 0 12px;\n  box-sizing: content-box;\n}\n\n.mat-mdc-form-field-icon-prefix {\n  color: var(--mat-form-field-leading-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {\n  color: var(--mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n\n.mat-mdc-form-field-icon-suffix {\n  color: var(--mat-form-field-trailing-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {\n  color: var(--mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {\n  color: var(--mat-form-field-error-trailing-icon-color, var(--mat-sys-error));\n}\n.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {\n  color: var(--mat-form-field-error-hover-trailing-icon-color, var(--mat-sys-on-error-container));\n}\n.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {\n  color: var(--mat-form-field-error-focus-trailing-icon-color, var(--mat-sys-error));\n}\n\n.mat-mdc-form-field-icon-prefix,\n[dir=rtl] .mat-mdc-form-field-icon-suffix {\n  padding: 0 4px 0 0;\n}\n\n.mat-mdc-form-field-icon-suffix,\n[dir=rtl] .mat-mdc-form-field-icon-prefix {\n  padding: 0 0 0 4px;\n}\n\n.mat-mdc-form-field-subscript-wrapper .mat-icon,\n.mat-mdc-form-field label .mat-icon {\n  width: 1em;\n  height: 1em;\n  font-size: inherit;\n}\n\n.mat-mdc-form-field-infix {\n  flex: auto;\n  min-width: 0;\n  width: 180px;\n  position: relative;\n  box-sizing: border-box;\n}\n.mat-mdc-form-field-infix:has(textarea[cols]) {\n  width: auto;\n}\n\n.mat-mdc-form-field .mdc-notched-outline__notch {\n  margin-left: -1px;\n  -webkit-clip-path: inset(-9em -999em -9em 1px);\n  clip-path: inset(-9em -999em -9em 1px);\n}\n[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {\n  margin-left: 0;\n  margin-right: -1px;\n  -webkit-clip-path: inset(-9em 1px -9em -999em);\n  clip-path: inset(-9em 1px -9em -999em);\n}\n\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {\n  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {\n  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {\n  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {\n  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {\n  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {\n  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {\n  transition-delay: 40ms;\n  transition-duration: 110ms;\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {\n  transition-delay: 40ms;\n  transition-duration: 110ms;\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {\n  transition-delay: 40ms;\n  transition-duration: 110ms;\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {\n  transition-delay: 40ms;\n  transition-duration: 110ms;\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {\n  transition-duration: 75ms;\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {\n  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,\n.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {\n  animation-duration: 300ms;\n}\n\n.mdc-notched-outline .mdc-floating-label {\n  max-width: calc(100% + 1px);\n}\n\n.mdc-notched-outline--upgraded .mdc-floating-label--float-above {\n  max-width: calc(133.3333333333% + 1px);\n}\n']
    }]
  }], () => [], {
    _textField: [{
      type: ViewChild,
      args: ["textField"]
    }],
    _iconPrefixContainer: [{
      type: ViewChild,
      args: ["iconPrefixContainer"]
    }],
    _textPrefixContainer: [{
      type: ViewChild,
      args: ["textPrefixContainer"]
    }],
    _iconSuffixContainer: [{
      type: ViewChild,
      args: ["iconSuffixContainer"]
    }],
    _textSuffixContainer: [{
      type: ViewChild,
      args: ["textSuffixContainer"]
    }],
    _floatingLabel: [{
      type: ViewChild,
      args: [MatFormFieldFloatingLabel]
    }],
    _notchedOutline: [{
      type: ViewChild,
      args: [MatFormFieldNotchedOutline]
    }],
    _lineRipple: [{
      type: ViewChild,
      args: [MatFormFieldLineRipple]
    }],
    _iconPrefixContainerSignal: [{
      type: ViewChild,
      args: ["iconPrefixContainer", {
        isSignal: true
      }]
    }],
    _textPrefixContainerSignal: [{
      type: ViewChild,
      args: ["textPrefixContainer", {
        isSignal: true
      }]
    }],
    _iconSuffixContainerSignal: [{
      type: ViewChild,
      args: ["iconSuffixContainer", {
        isSignal: true
      }]
    }],
    _textSuffixContainerSignal: [{
      type: ViewChild,
      args: ["textSuffixContainer", {
        isSignal: true
      }]
    }],
    _formFieldControl: [{
      type: ContentChild,
      args: [MatFormFieldControl]
    }],
    _prefixChildren: [{
      type: ContentChildren,
      args: [MAT_PREFIX, {
        descendants: true
      }]
    }],
    _suffixChildren: [{
      type: ContentChildren,
      args: [MAT_SUFFIX, {
        descendants: true
      }]
    }],
    _errorChildren: [{
      type: ContentChildren,
      args: [MAT_ERROR, {
        descendants: true
      }]
    }],
    _hintChildren: [{
      type: ContentChildren,
      args: [MatHint, {
        descendants: true
      }]
    }],
    _labelChild: [{
      type: ContentChild,
      args: [forwardRef(() => MatLabel), {
        isSignal: true
      }]
    }],
    hideRequiredMarker: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    floatLabel: [{
      type: Input
    }],
    appearance: [{
      type: Input
    }],
    subscriptSizing: [{
      type: Input
    }],
    hintLabel: [{
      type: Input
    }]
  });
})();

// node_modules/@angular/material/fesm2022/_error-options-chunk.mjs
var ShowOnDirtyErrorStateMatcher = class _ShowOnDirtyErrorStateMatcher {
  isErrorState(control, form) {
    return !!(control && control.invalid && (control.dirty || form && form.submitted));
  }
  isSignalErrorState(field) {
    if (!field) {
      return false;
    }
    const invalid = field().invalid();
    const dirty = field().dirty();
    return invalid && dirty;
  }
  static \u0275fac = function ShowOnDirtyErrorStateMatcher_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ShowOnDirtyErrorStateMatcher)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineService({
    token: _ShowOnDirtyErrorStateMatcher,
    factory: _ShowOnDirtyErrorStateMatcher.\u0275fac,
    autoProvided: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShowOnDirtyErrorStateMatcher, [{
    type: Service,
    args: [{
      autoProvided: false
    }]
  }], null, null);
})();
var ErrorStateMatcher = class _ErrorStateMatcher {
  isErrorState(control, form) {
    return !!(control && control.invalid && (control.touched || form && form.submitted));
  }
  isSignalErrorState(field) {
    if (!field) {
      return false;
    }
    const invalid = field().invalid();
    const touched = field().touched();
    return invalid && touched;
  }
  static \u0275fac = function ErrorStateMatcher_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ErrorStateMatcher)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineService({
    token: _ErrorStateMatcher,
    factory: _ErrorStateMatcher.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ErrorStateMatcher, [{
    type: Service
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/_error-state-chunk.mjs
var _ErrorStateTracker = class {
  _defaultMatcher;
  _parentFormGroup;
  _parentForm;
  _stateChanges;
  errorState = false;
  matcher;
  ngControl;
  formField;
  constructor(_defaultMatcher, directive, _parentFormGroup, _parentForm, _stateChanges) {
    this._defaultMatcher = _defaultMatcher;
    this._parentFormGroup = _parentFormGroup;
    this._parentForm = _parentForm;
    this._stateChanges = _stateChanges;
    if (!directive) {
      this.ngControl = this.formField = null;
    } else if (isSignal(directive.field) && !directive.updateValueAndValidity) {
      this.formField = directive;
      this.ngControl = null;
    } else {
      this.formField = null;
      this.ngControl = directive;
    }
  }
  updateErrorState() {
    const oldState = this.errorState;
    const newState = this._getCurrentErrorState(this.matcher || this._defaultMatcher);
    if (newState !== oldState) {
      this.errorState = newState;
      this._stateChanges.next();
    }
  }
  _getCurrentErrorState(matcher) {
    if (this.formField && matcher?.isSignalErrorState) {
      return matcher.isSignalErrorState(this.formField.field()) ?? false;
    }
    const parent = this._parentFormGroup || this._parentForm;
    const control = this.ngControl ? this.ngControl.control : null;
    return matcher?.isErrorState(control, parent) ?? false;
  }
};

// node_modules/@angular/material/fesm2022/datepicker.mjs
function createMissingDateImplError(provider) {
  return Error(`MatDatepicker: No provider found for ${provider}. You must add one of the following to your app config: provideNativeDateAdapter, provideDateFnsAdapter, provideLuxonDateAdapter, provideMomentDateAdapter, or provide a custom implementation.`);
}
var MatDatepickerIntl = class _MatDatepickerIntl {
  changes = new Subject();
  calendarLabel = "Calendar";
  openCalendarLabel = "Open calendar";
  closeCalendarLabel = "Close calendar";
  prevMonthLabel = "Previous month";
  nextMonthLabel = "Next month";
  prevYearLabel = "Previous year";
  nextYearLabel = "Next year";
  prevMultiYearLabel = "Previous 24 years";
  nextMultiYearLabel = "Next 24 years";
  switchToMonthViewLabel = "Choose date";
  switchToMultiYearViewLabel = "Choose month and year";
  startDateLabel = "Start date";
  endDateLabel = "End date";
  comparisonDateLabel = "Comparison range";
  formatYearRange(start, end) {
    return `${start} \u2013 ${end}`;
  }
  formatYearRangeLabel(start, end) {
    return `${start} to ${end}`;
  }
  static \u0275fac = function MatDatepickerIntl_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDatepickerIntl)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineService({
    token: _MatDatepickerIntl,
    factory: _MatDatepickerIntl.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDatepickerIntl, [{
    type: Service
  }], null, null);
})();
var uniqueIdCounter$1 = 0;
var MatCalendarCell = class {
  value;
  displayValue;
  ariaLabel;
  enabled;
  compareValue;
  rawValue;
  id = uniqueIdCounter$1++;
  cssClasses;
  constructor(value, displayValue, ariaLabel, enabled, cssClasses, compareValue = value, rawValue) {
    this.value = value;
    this.displayValue = displayValue;
    this.ariaLabel = ariaLabel;
    this.enabled = enabled;
    this.compareValue = compareValue;
    this.rawValue = rawValue;
    this.cssClasses = cssClasses instanceof Set ? Array.from(cssClasses) : cssClasses;
  }
};
var activeCapturingEventOptions = {
  passive: false,
  capture: true
};
var passiveCapturingEventOptions2 = {
  passive: true,
  capture: true
};
var passiveEventOptions = {
  passive: true
};
var MatCalendarBody = class _MatCalendarBody {
  _elementRef = inject(ElementRef);
  _ngZone = inject(NgZone);
  _platform = inject(Platform);
  _intl = inject(MatDatepickerIntl);
  _eventCleanups;
  _skipNextFocus = false;
  _focusActiveCellAfterViewChecked = false;
  label;
  rows;
  todayValue;
  startValue;
  endValue;
  labelMinRequiredCells;
  numCols = 7;
  activeCell = 0;
  ngAfterViewChecked() {
    if (this._focusActiveCellAfterViewChecked) {
      this._focusActiveCell();
      this._focusActiveCellAfterViewChecked = false;
    }
  }
  isRange = false;
  cellAspectRatio = 1;
  comparisonStart = null;
  comparisonEnd = null;
  previewStart = null;
  previewEnd = null;
  startDateAccessibleName = null;
  endDateAccessibleName = null;
  selectedValueChange = new EventEmitter();
  previewChange = new EventEmitter();
  activeDateChange = new EventEmitter();
  dragStarted = new EventEmitter();
  dragEnded = new EventEmitter();
  _firstRowOffset;
  _cellPadding;
  _cellWidth;
  _startDateLabelId;
  _endDateLabelId;
  _comparisonStartDateLabelId;
  _comparisonEndDateLabelId;
  _didDragSinceMouseDown = false;
  _injector = inject(Injector);
  comparisonDateAccessibleName = this._intl.comparisonDateLabel;
  _trackRow = (row) => row;
  constructor() {
    const renderer = inject(Renderer2);
    const idGenerator = inject(_IdGenerator);
    this._startDateLabelId = idGenerator.getId("mat-calendar-body-start-");
    this._endDateLabelId = idGenerator.getId("mat-calendar-body-end-");
    this._comparisonStartDateLabelId = idGenerator.getId("mat-calendar-body-comparison-start-");
    this._comparisonEndDateLabelId = idGenerator.getId("mat-calendar-body-comparison-end-");
    inject(_CdkPrivateStyleLoader).load(_StructuralStylesLoader);
    this._ngZone.runOutsideAngular(() => {
      const element = this._elementRef.nativeElement;
      const cleanups = [renderer.listen(element, "touchmove", this._touchmoveHandler, activeCapturingEventOptions), renderer.listen(element, "mouseenter", this._enterHandler, passiveCapturingEventOptions2), renderer.listen(element, "focus", this._enterHandler, passiveCapturingEventOptions2), renderer.listen(element, "mouseleave", this._leaveHandler, passiveCapturingEventOptions2), renderer.listen(element, "blur", this._leaveHandler, passiveCapturingEventOptions2), renderer.listen(element, "mousedown", this._mousedownHandler, passiveEventOptions), renderer.listen(element, "touchstart", this._mousedownHandler, passiveEventOptions)];
      if (this._platform.isBrowser) {
        cleanups.push(renderer.listen("window", "mouseup", this._mouseupHandler), renderer.listen("window", "touchend", this._touchendHandler));
      }
      this._eventCleanups = cleanups;
    });
  }
  _cellClicked(cell, event) {
    if (this._didDragSinceMouseDown) {
      return;
    }
    if (cell.enabled) {
      this.selectedValueChange.emit({
        value: cell.value,
        event
      });
    }
  }
  _emitActiveDateChange(cell, event) {
    if (cell.enabled) {
      this.activeDateChange.emit({
        value: cell.value,
        event
      });
    }
  }
  _isSelected(value) {
    return this.startValue === value || this.endValue === value;
  }
  ngOnChanges(changes) {
    const columnChanges = changes["numCols"];
    const {
      rows,
      numCols
    } = this;
    if (changes["rows"] || columnChanges) {
      this._firstRowOffset = rows && rows.length && rows[0].length ? numCols - rows[0].length : 0;
    }
    if (changes["cellAspectRatio"] || columnChanges || !this._cellPadding) {
      this._cellPadding = `${50 * this.cellAspectRatio / numCols}%`;
    }
    if (columnChanges || !this._cellWidth) {
      this._cellWidth = `${100 / numCols}%`;
    }
  }
  ngOnDestroy() {
    this._eventCleanups.forEach((cleanup) => cleanup());
  }
  _isActiveCell(rowIndex, colIndex) {
    let cellNumber = rowIndex * this.numCols + colIndex;
    if (rowIndex) {
      cellNumber -= this._firstRowOffset;
    }
    return cellNumber == this.activeCell;
  }
  _focusActiveCell(movePreview = true) {
    afterNextRender(() => {
      setTimeout(() => {
        const activeCell = this._elementRef.nativeElement.querySelector(".mat-calendar-body-active");
        if (activeCell) {
          if (!movePreview) {
            this._skipNextFocus = true;
          }
          activeCell.focus();
        }
      });
    }, {
      injector: this._injector
    });
  }
  _scheduleFocusActiveCellAfterViewChecked() {
    this._focusActiveCellAfterViewChecked = true;
  }
  _isRangeStart(value) {
    return isStart(value, this.startValue, this.endValue);
  }
  _isRangeEnd(value) {
    return isEnd(value, this.startValue, this.endValue);
  }
  _isInRange(value) {
    return isInRange(value, this.startValue, this.endValue, this.isRange);
  }
  _isComparisonStart(value) {
    return isStart(value, this.comparisonStart, this.comparisonEnd);
  }
  _isComparisonBridgeStart(value, rowIndex, colIndex) {
    if (!this._isComparisonStart(value) || this._isRangeStart(value) || !this._isInRange(value)) {
      return false;
    }
    let previousCell = this.rows[rowIndex][colIndex - 1];
    if (!previousCell) {
      const previousRow = this.rows[rowIndex - 1];
      previousCell = previousRow && previousRow[previousRow.length - 1];
    }
    return previousCell && !this._isRangeEnd(previousCell.compareValue);
  }
  _isComparisonBridgeEnd(value, rowIndex, colIndex) {
    if (!this._isComparisonEnd(value) || this._isRangeEnd(value) || !this._isInRange(value)) {
      return false;
    }
    let nextCell = this.rows[rowIndex][colIndex + 1];
    if (!nextCell) {
      const nextRow = this.rows[rowIndex + 1];
      nextCell = nextRow && nextRow[0];
    }
    return nextCell && !this._isRangeStart(nextCell.compareValue);
  }
  _isComparisonEnd(value) {
    return isEnd(value, this.comparisonStart, this.comparisonEnd);
  }
  _isInComparisonRange(value) {
    return isInRange(value, this.comparisonStart, this.comparisonEnd, this.isRange);
  }
  _isComparisonIdentical(value) {
    return this.comparisonStart === this.comparisonEnd && value === this.comparisonStart;
  }
  _isPreviewStart(value) {
    return isStart(value, this.previewStart, this.previewEnd);
  }
  _isPreviewEnd(value) {
    return isEnd(value, this.previewStart, this.previewEnd);
  }
  _isInPreview(value) {
    return isInRange(value, this.previewStart, this.previewEnd, this.isRange);
  }
  _getDescribedby(value) {
    if (!this.isRange) {
      return null;
    }
    if (this.startValue === value && this.endValue === value) {
      return `${this._startDateLabelId} ${this._endDateLabelId}`;
    } else if (this.startValue === value) {
      return this._startDateLabelId;
    } else if (this.endValue === value) {
      return this._endDateLabelId;
    }
    if (this.comparisonStart !== null && this.comparisonEnd !== null) {
      if (value === this.comparisonStart && value === this.comparisonEnd) {
        return `${this._comparisonStartDateLabelId} ${this._comparisonEndDateLabelId}`;
      } else if (value === this.comparisonStart) {
        return this._comparisonStartDateLabelId;
      } else if (value === this.comparisonEnd) {
        return this._comparisonEndDateLabelId;
      }
    }
    return null;
  }
  _enterHandler = (event) => {
    if (this._skipNextFocus && event.type === "focus") {
      this._skipNextFocus = false;
      return;
    }
    if (event.target && this.isRange) {
      const cell = this._getCellFromElement(event.target);
      if (cell) {
        this._ngZone.run(() => this.previewChange.emit({
          value: cell.enabled ? cell : null,
          event
        }));
      }
    }
  };
  _touchmoveHandler = (event) => {
    if (!this.isRange) return;
    const target = getActualTouchTarget(event);
    const cell = target ? this._getCellFromElement(target) : null;
    if (target !== event.target) {
      this._didDragSinceMouseDown = true;
    }
    if (getCellElement(event.target)) {
      event.preventDefault();
    }
    this._ngZone.run(() => this.previewChange.emit({
      value: cell?.enabled ? cell : null,
      event
    }));
  };
  _leaveHandler = (event) => {
    if (this.previewEnd !== null && this.isRange) {
      if (event.type !== "blur") {
        this._didDragSinceMouseDown = true;
      }
      if (event.target && this._getCellFromElement(event.target) && !(event.relatedTarget && this._getCellFromElement(event.relatedTarget))) {
        this._ngZone.run(() => this.previewChange.emit({
          value: null,
          event
        }));
      }
    }
  };
  _mousedownHandler = (event) => {
    if (!this.isRange) return;
    this._didDragSinceMouseDown = false;
    const cell = event.target && this._getCellFromElement(event.target);
    if (!cell || !this._isInRange(cell.compareValue)) {
      return;
    }
    this._ngZone.run(() => {
      this.dragStarted.emit({
        value: cell.rawValue,
        event
      });
    });
  };
  _mouseupHandler = (event) => {
    if (!this.isRange) return;
    const cellElement = getCellElement(event.target);
    if (!cellElement) {
      this._ngZone.run(() => {
        this.dragEnded.emit({
          value: null,
          event
        });
      });
      return;
    }
    if (cellElement.closest(".mat-calendar-body") !== this._elementRef.nativeElement) {
      return;
    }
    this._ngZone.run(() => {
      const cell = this._getCellFromElement(cellElement);
      this.dragEnded.emit({
        value: cell?.rawValue ?? null,
        event
      });
    });
  };
  _touchendHandler = (event) => {
    const target = getActualTouchTarget(event);
    if (target) {
      this._mouseupHandler({
        target
      });
    }
  };
  _getCellFromElement(element) {
    const cell = getCellElement(element);
    if (cell) {
      const row = cell.getAttribute("data-mat-row");
      const col = cell.getAttribute("data-mat-col");
      if (row && col) {
        return this.rows[parseInt(row)]?.[parseInt(col)] || null;
      }
    }
    return null;
  }
  static \u0275fac = function MatCalendarBody_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCalendarBody)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    function _forTrack0($index, $item) {
      return this._trackRow($item);
    }
    const _forTrack1 = ($index, $item) => $item.id;
    function MatCalendarBody_Conditional_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "tr", 0)(1, "td", 3);
        \u0275\u0275text(2);
        \u0275\u0275domElementEnd()();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275advance();
        \u0275\u0275styleProp("padding-top", ctx_r0._cellPadding)("padding-bottom", ctx_r0._cellPadding);
        \u0275\u0275attribute("colspan", ctx_r0.numCols);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx_r0.label, " ");
      }
    }
    function MatCalendarBody_For_2_Conditional_1_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "td", 3);
        \u0275\u0275text(1);
        \u0275\u0275domElementEnd();
      }
      if (rf & 2) {
        const ctx_r0 = \u0275\u0275nextContext(2);
        \u0275\u0275styleProp("padding-top", ctx_r0._cellPadding)("padding-bottom", ctx_r0._cellPadding);
        \u0275\u0275attribute("colspan", ctx_r0._firstRowOffset);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx_r0._firstRowOffset >= ctx_r0.labelMinRequiredCells ? ctx_r0.label : "", " ");
      }
    }
    function MatCalendarBody_For_2_For_3_Template(rf, ctx) {
      if (rf & 1) {
        const _r2 = \u0275\u0275getCurrentView();
        \u0275\u0275domElementStart(0, "td", 6)(1, "button", 7);
        \u0275\u0275domListener("click", function MatCalendarBody_For_2_For_3_Template_button_click_1_listener($event) {
          const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
          const ctx_r0 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r0._cellClicked(item_r3, $event));
        })("focus", function MatCalendarBody_For_2_For_3_Template_button_focus_1_listener($event) {
          const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
          const ctx_r0 = \u0275\u0275nextContext(2);
          return \u0275\u0275resetView(ctx_r0._emitActiveDateChange(item_r3, $event));
        });
        \u0275\u0275domElementStart(2, "span", 8);
        \u0275\u0275text(3);
        \u0275\u0275domElementEnd();
        \u0275\u0275domElement(4, "span", 9);
        \u0275\u0275domElementEnd()();
      }
      if (rf & 2) {
        const item_r3 = ctx.$implicit;
        const \u0275$index_14_r4 = ctx.$index;
        const \u0275$index_7_r5 = \u0275\u0275nextContext().$index;
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275styleProp("width", ctx_r0._cellWidth)("padding-top", ctx_r0._cellPadding)("padding-bottom", ctx_r0._cellPadding);
        \u0275\u0275attribute("data-mat-row", \u0275$index_7_r5)("data-mat-col", \u0275$index_14_r4);
        \u0275\u0275advance();
        \u0275\u0275classMap(item_r3.cssClasses);
        \u0275\u0275classProp("mat-calendar-body-disabled", !item_r3.enabled)("mat-calendar-body-active", ctx_r0._isActiveCell(\u0275$index_7_r5, \u0275$index_14_r4))("mat-calendar-body-range-start", ctx_r0._isRangeStart(item_r3.compareValue))("mat-calendar-body-range-end", ctx_r0._isRangeEnd(item_r3.compareValue))("mat-calendar-body-in-range", ctx_r0._isInRange(item_r3.compareValue))("mat-calendar-body-comparison-bridge-start", ctx_r0._isComparisonBridgeStart(item_r3.compareValue, \u0275$index_7_r5, \u0275$index_14_r4))("mat-calendar-body-comparison-bridge-end", ctx_r0._isComparisonBridgeEnd(item_r3.compareValue, \u0275$index_7_r5, \u0275$index_14_r4))("mat-calendar-body-comparison-start", ctx_r0._isComparisonStart(item_r3.compareValue))("mat-calendar-body-comparison-end", ctx_r0._isComparisonEnd(item_r3.compareValue))("mat-calendar-body-in-comparison-range", ctx_r0._isInComparisonRange(item_r3.compareValue))("mat-calendar-body-preview-start", ctx_r0._isPreviewStart(item_r3.compareValue))("mat-calendar-body-preview-end", ctx_r0._isPreviewEnd(item_r3.compareValue))("mat-calendar-body-in-preview", ctx_r0._isInPreview(item_r3.compareValue));
        \u0275\u0275domProperty("tabIndex", ctx_r0._isActiveCell(\u0275$index_7_r5, \u0275$index_14_r4) ? 0 : -1);
        \u0275\u0275attribute("aria-label", item_r3.ariaLabel)("aria-disabled", !item_r3.enabled || null)("aria-pressed", ctx_r0._isSelected(item_r3.compareValue))("aria-current", ctx_r0.todayValue === item_r3.compareValue ? "date" : null)("aria-describedby", ctx_r0._getDescribedby(item_r3.compareValue));
        \u0275\u0275advance();
        \u0275\u0275classProp("mat-calendar-body-selected", ctx_r0._isSelected(item_r3.compareValue))("mat-calendar-body-comparison-identical", ctx_r0._isComparisonIdentical(item_r3.compareValue))("mat-calendar-body-today", ctx_r0.todayValue === item_r3.compareValue);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", item_r3.displayValue, " ");
      }
    }
    function MatCalendarBody_For_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "tr", 1);
        \u0275\u0275conditionalCreate(1, MatCalendarBody_For_2_Conditional_1_Template, 2, 6, "td", 4);
        \u0275\u0275repeaterCreate(2, MatCalendarBody_For_2_For_3_Template, 5, 49, "td", 5, _forTrack1);
        \u0275\u0275domElementEnd();
      }
      if (rf & 2) {
        const row_r6 = ctx.$implicit;
        const \u0275$index_7_r5 = ctx.$index;
        const ctx_r0 = \u0275\u0275nextContext();
        \u0275\u0275advance();
        \u0275\u0275conditional(\u0275$index_7_r5 === 0 && ctx_r0._firstRowOffset ? 1 : -1);
        \u0275\u0275advance();
        \u0275\u0275repeater(row_r6);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatCalendarBody,
      selectors: [["", "mat-calendar-body", ""]],
      hostAttrs: [1, "mat-calendar-body"],
      inputs: {
        label: "label",
        rows: "rows",
        todayValue: "todayValue",
        startValue: "startValue",
        endValue: "endValue",
        labelMinRequiredCells: "labelMinRequiredCells",
        numCols: "numCols",
        activeCell: "activeCell",
        isRange: "isRange",
        cellAspectRatio: "cellAspectRatio",
        comparisonStart: "comparisonStart",
        comparisonEnd: "comparisonEnd",
        previewStart: "previewStart",
        previewEnd: "previewEnd",
        startDateAccessibleName: "startDateAccessibleName",
        endDateAccessibleName: "endDateAccessibleName"
      },
      outputs: {
        selectedValueChange: "selectedValueChange",
        previewChange: "previewChange",
        activeDateChange: "activeDateChange",
        dragStarted: "dragStarted",
        dragEnded: "dragEnded"
      },
      exportAs: ["matCalendarBody"],
      features: [\u0275\u0275NgOnChangesFeature],
      decls: 11,
      vars: 11,
      consts: [["aria-hidden", "true"], ["role", "row"], [1, "mat-calendar-body-hidden-label", 3, "id"], [1, "mat-calendar-body-label"], [1, "mat-calendar-body-label", 3, "paddingTop", "paddingBottom"], ["role", "gridcell", 1, "mat-calendar-body-cell-container", 3, "width", "paddingTop", "paddingBottom"], ["role", "gridcell", 1, "mat-calendar-body-cell-container"], ["type", "button", 1, "mat-calendar-body-cell", 3, "click", "focus", "tabindex"], [1, "mat-calendar-body-cell-content", "mat-focus-indicator"], ["aria-hidden", "true", 1, "mat-calendar-body-cell-preview"]],
      template: function MatCalendarBody_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275conditionalCreate(0, MatCalendarBody_Conditional_0_Template, 3, 6, "tr", 0);
          \u0275\u0275repeaterCreate(1, MatCalendarBody_For_2_Template, 4, 1, "tr", 1, _forTrack0, true);
          \u0275\u0275domElementStart(3, "span", 2);
          \u0275\u0275text(4);
          \u0275\u0275domElementEnd();
          \u0275\u0275domElementStart(5, "span", 2);
          \u0275\u0275text(6);
          \u0275\u0275domElementEnd();
          \u0275\u0275domElementStart(7, "span", 2);
          \u0275\u0275text(8);
          \u0275\u0275domElementEnd();
          \u0275\u0275domElementStart(9, "span", 2);
          \u0275\u0275text(10);
          \u0275\u0275domElementEnd();
        }
        if (rf & 2) {
          \u0275\u0275conditional(ctx._firstRowOffset < ctx.labelMinRequiredCells ? 0 : -1);
          \u0275\u0275advance();
          \u0275\u0275repeater(ctx.rows);
          \u0275\u0275advance(2);
          \u0275\u0275domProperty("id", ctx._startDateLabelId);
          \u0275\u0275advance();
          \u0275\u0275textInterpolate1(" ", ctx.startDateAccessibleName, "\n");
          \u0275\u0275advance();
          \u0275\u0275domProperty("id", ctx._endDateLabelId);
          \u0275\u0275advance();
          \u0275\u0275textInterpolate1(" ", ctx.endDateAccessibleName, "\n");
          \u0275\u0275advance();
          \u0275\u0275domProperty("id", ctx._comparisonStartDateLabelId);
          \u0275\u0275advance();
          \u0275\u0275textInterpolate2(" ", ctx.comparisonDateAccessibleName, " ", ctx.startDateAccessibleName, "\n");
          \u0275\u0275advance();
          \u0275\u0275domProperty("id", ctx._comparisonEndDateLabelId);
          \u0275\u0275advance();
          \u0275\u0275textInterpolate2(" ", ctx.comparisonDateAccessibleName, " ", ctx.endDateAccessibleName, "\n");
        }
      },
      styles: ['.mat-calendar-body {\n  min-width: 224px;\n}\n\n.mat-calendar-body-today:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {\n  border-color: var(--%NS%mat-datepicker-calendar-date-today-outline-color, var(--%NS%mat-sys-primary));\n}\n\n.mat-calendar-body-label {\n  height: 0;\n  line-height: 0;\n  text-align: start;\n  padding-left: 4.7142857143%;\n  padding-right: 4.7142857143%;\n  font-size: var(--%NS%mat-datepicker-calendar-body-label-text-size, var(--%NS%mat-sys-title-small-size));\n  font-weight: var(--%NS%mat-datepicker-calendar-body-label-text-weight, var(--%NS%mat-sys-title-small-weight));\n  color: var(--%NS%mat-datepicker-calendar-body-label-text-color, var(--%NS%mat-sys-on-surface));\n}\n\n.mat-calendar-body-hidden-label {\n  display: none;\n}\n\n.mat-calendar-body-cell-container {\n  position: relative;\n  height: 0;\n  line-height: 0;\n}\n\n.mat-calendar-body-cell {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: none;\n  text-align: center;\n  outline: none;\n  margin: 0;\n  font-family: var(--%NS%mat-datepicker-calendar-text-font, var(--%NS%mat-sys-body-medium-font));\n  font-size: var(--%NS%mat-datepicker-calendar-text-size, var(--%NS%mat-sys-body-medium-size));\n  -webkit-user-select: none;\n  user-select: none;\n  cursor: pointer;\n  outline: none;\n  border: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-calendar-body-cell::-moz-focus-inner {\n  border: 0;\n}\n\n.mat-calendar-body-cell::before,\n.mat-calendar-body-cell::after,\n.mat-calendar-body-cell-preview {\n  content: "";\n  position: absolute;\n  top: 5%;\n  left: 0;\n  z-index: 0;\n  box-sizing: border-box;\n  display: block;\n  height: 90%;\n  width: 100%;\n}\n\n.mat-calendar-body-range-start:not(.mat-calendar-body-in-comparison-range)::before,\n.mat-calendar-body-range-start::after,\n.mat-calendar-body-comparison-start:not(.mat-calendar-body-comparison-bridge-start)::before,\n.mat-calendar-body-comparison-start::after,\n.mat-calendar-body-preview-start .mat-calendar-body-cell-preview {\n  left: 5%;\n  width: 95%;\n  border-top-left-radius: 999px;\n  border-bottom-left-radius: 999px;\n}\n[dir=rtl] .mat-calendar-body-range-start:not(.mat-calendar-body-in-comparison-range)::before,\n[dir=rtl] .mat-calendar-body-range-start::after,\n[dir=rtl] .mat-calendar-body-comparison-start:not(.mat-calendar-body-comparison-bridge-start)::before,\n[dir=rtl] .mat-calendar-body-comparison-start::after,\n[dir=rtl] .mat-calendar-body-preview-start .mat-calendar-body-cell-preview {\n  left: 0;\n  border-radius: 0;\n  border-top-right-radius: 999px;\n  border-bottom-right-radius: 999px;\n}\n\n.mat-calendar-body-range-end:not(.mat-calendar-body-in-comparison-range)::before,\n.mat-calendar-body-range-end::after,\n.mat-calendar-body-comparison-end:not(.mat-calendar-body-comparison-bridge-end)::before,\n.mat-calendar-body-comparison-end::after,\n.mat-calendar-body-preview-end .mat-calendar-body-cell-preview {\n  width: 95%;\n  border-top-right-radius: 999px;\n  border-bottom-right-radius: 999px;\n}\n[dir=rtl] .mat-calendar-body-range-end:not(.mat-calendar-body-in-comparison-range)::before,\n[dir=rtl] .mat-calendar-body-range-end::after,\n[dir=rtl] .mat-calendar-body-comparison-end:not(.mat-calendar-body-comparison-bridge-end)::before,\n[dir=rtl] .mat-calendar-body-comparison-end::after,\n[dir=rtl] .mat-calendar-body-preview-end .mat-calendar-body-cell-preview {\n  left: 5%;\n  border-radius: 0;\n  border-top-left-radius: 999px;\n  border-bottom-left-radius: 999px;\n}\n\n[dir=rtl] .mat-calendar-body-comparison-bridge-start.mat-calendar-body-range-end::after,\n[dir=rtl] .mat-calendar-body-comparison-bridge-end.mat-calendar-body-range-start::after {\n  width: 95%;\n  border-top-right-radius: 999px;\n  border-bottom-right-radius: 999px;\n}\n\n.mat-calendar-body-comparison-start.mat-calendar-body-range-end::after, [dir=rtl] .mat-calendar-body-comparison-start.mat-calendar-body-range-end::after,\n.mat-calendar-body-comparison-end.mat-calendar-body-range-start::after,\n[dir=rtl] .mat-calendar-body-comparison-end.mat-calendar-body-range-start::after {\n  width: 90%;\n}\n\n.mat-calendar-body-in-preview {\n  color: var(--%NS%mat-datepicker-calendar-date-preview-state-outline-color, var(--%NS%mat-sys-primary));\n}\n.mat-calendar-body-in-preview .mat-calendar-body-cell-preview {\n  border-top: dashed 1px;\n  border-bottom: dashed 1px;\n}\n\n.mat-calendar-body-preview-start .mat-calendar-body-cell-preview {\n  border-left: dashed 1px;\n}\n[dir=rtl] .mat-calendar-body-preview-start .mat-calendar-body-cell-preview {\n  border-left: 0;\n  border-right: dashed 1px;\n}\n\n.mat-calendar-body-preview-end .mat-calendar-body-cell-preview {\n  border-right: dashed 1px;\n}\n[dir=rtl] .mat-calendar-body-preview-end .mat-calendar-body-cell-preview {\n  border-right: 0;\n  border-left: dashed 1px;\n}\n\n.mat-calendar-body-disabled {\n  cursor: default;\n}\n.mat-calendar-body-disabled > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {\n  color: var(--%NS%mat-datepicker-calendar-date-disabled-state-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n.mat-calendar-body-disabled > .mat-calendar-body-today:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {\n  border-color: var(--%NS%mat-datepicker-calendar-date-today-disabled-state-outline-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n@media (forced-colors: active) {\n  .mat-calendar-body-disabled {\n    opacity: 0.5;\n  }\n}\n\n.mat-calendar-body-cell-content {\n  top: 5%;\n  left: 5%;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  width: 90%;\n  height: 90%;\n  line-height: 1;\n  border-width: 1px;\n  border-style: solid;\n  border-radius: 999px;\n  color: var(--%NS%mat-datepicker-calendar-date-text-color, var(--%NS%mat-sys-on-surface));\n  border-color: var(--%NS%mat-datepicker-calendar-date-outline-color, transparent);\n}\n.mat-calendar-body-cell-content.mat-focus-indicator {\n  position: absolute;\n}\n.mat-calendar-body-cell-content::before {\n  border-radius: 50%;\n}\n@media (forced-colors: active) {\n  .mat-calendar-body-cell-content {\n    border: none;\n  }\n}\n\n.cdk-keyboard-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical), .cdk-program-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {\n  background-color: var(--%NS%mat-datepicker-calendar-date-focus-state-background-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-focus-state-layer-opacity) * 100%), transparent));\n}\n\n@media (hover: hover) {\n  .mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {\n    background-color: var(--%NS%mat-datepicker-calendar-date-hover-state-background-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-hover-state-layer-opacity) * 100%), transparent));\n  }\n}\n.mat-calendar-body-selected {\n  background-color: var(--%NS%mat-datepicker-calendar-date-selected-state-background-color, var(--%NS%mat-sys-primary));\n  color: var(--%NS%mat-datepicker-calendar-date-selected-state-text-color, var(--%NS%mat-sys-on-primary));\n}\n.mat-calendar-body-disabled > .mat-calendar-body-selected {\n  background-color: var(--%NS%mat-datepicker-calendar-date-selected-disabled-state-background-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n.mat-calendar-body-selected.mat-calendar-body-today {\n  box-shadow: inset 0 0 0 1px var(--%NS%mat-datepicker-calendar-date-today-selected-state-outline-color, var(--%NS%mat-sys-primary));\n}\n\n.mat-calendar-body-in-range::before {\n  background: var(--%NS%mat-datepicker-calendar-date-in-range-state-background-color, var(--%NS%mat-sys-primary-container));\n}\n\n.mat-calendar-body-comparison-identical,\n.mat-calendar-body-in-comparison-range::before {\n  background: var(--%NS%mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--%NS%mat-sys-tertiary-container));\n}\n\n.mat-calendar-body-comparison-identical,\n.mat-calendar-body-in-comparison-range::before {\n  background: var(--%NS%mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--%NS%mat-sys-tertiary-container));\n}\n\n.mat-calendar-body-comparison-bridge-start::before,\n[dir=rtl] .mat-calendar-body-comparison-bridge-end::before {\n  background: linear-gradient(to right, var(--%NS%mat-datepicker-calendar-date-in-range-state-background-color, var(--%NS%mat-sys-primary-container)) 50%, var(--%NS%mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--%NS%mat-sys-tertiary-container)) 50%);\n}\n\n.mat-calendar-body-comparison-bridge-end::before,\n[dir=rtl] .mat-calendar-body-comparison-bridge-start::before {\n  background: linear-gradient(to left, var(--%NS%mat-datepicker-calendar-date-in-range-state-background-color, var(--%NS%mat-sys-primary-container)) 50%, var(--%NS%mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--%NS%mat-sys-tertiary-container)) 50%);\n}\n\n.mat-calendar-body-in-range > .mat-calendar-body-comparison-identical,\n.mat-calendar-body-in-comparison-range.mat-calendar-body-in-range::after {\n  background: var(--%NS%mat-datepicker-calendar-date-in-overlap-range-state-background-color, var(--%NS%mat-sys-secondary-container));\n}\n\n.mat-calendar-body-comparison-identical.mat-calendar-body-selected,\n.mat-calendar-body-in-comparison-range > .mat-calendar-body-selected {\n  background: var(--%NS%mat-datepicker-calendar-date-in-overlap-range-selected-state-background-color, var(--%NS%mat-sys-secondary));\n}\n\n@media (forced-colors: active) {\n  .mat-datepicker-popup:not(:empty),\n  .mat-calendar-body-cell:not(.mat-calendar-body-in-range) .mat-calendar-body-selected {\n    outline: solid 1px;\n  }\n  .mat-calendar-body-today {\n    outline: dotted 1px;\n  }\n  .mat-calendar-body-cell::before,\n  .mat-calendar-body-cell::after,\n  .mat-calendar-body-selected {\n    background: none;\n  }\n  .mat-calendar-body-in-range::before,\n  .mat-calendar-body-comparison-bridge-start::before,\n  .mat-calendar-body-comparison-bridge-end::before {\n    border-top: solid 1px;\n    border-bottom: solid 1px;\n  }\n  .mat-calendar-body-range-start::before {\n    border-left: solid 1px;\n  }\n  [dir=rtl] .mat-calendar-body-range-start::before {\n    border-left: 0;\n    border-right: solid 1px;\n  }\n  .mat-calendar-body-range-end::before {\n    border-right: solid 1px;\n  }\n  [dir=rtl] .mat-calendar-body-range-end::before {\n    border-right: 0;\n    border-left: solid 1px;\n  }\n  .mat-calendar-body-in-comparison-range::before {\n    border-top: dashed 1px;\n    border-bottom: dashed 1px;\n  }\n  .mat-calendar-body-comparison-start::before {\n    border-left: dashed 1px;\n  }\n  [dir=rtl] .mat-calendar-body-comparison-start::before {\n    border-left: 0;\n    border-right: dashed 1px;\n  }\n  .mat-calendar-body-comparison-end::before {\n    border-right: dashed 1px;\n  }\n  [dir=rtl] .mat-calendar-body-comparison-end::before {\n    border-right: 0;\n    border-left: dashed 1px;\n  }\n}\n'],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCalendarBody, [{
    type: Component,
    args: [{
      selector: "[mat-calendar-body]",
      host: {
        "class": "mat-calendar-body"
      },
      exportAs: "matCalendarBody",
      encapsulation: ViewEncapsulation.None,
      template: `<!--
  If there's not enough space in the first row, create a separate label row. We mark this row as
  aria-hidden because we don't want it to be read out as one of the weeks in the month.
-->
@if (_firstRowOffset < labelMinRequiredCells) {
  <tr aria-hidden="true">
    <td class="mat-calendar-body-label"
        [attr.colspan]="numCols"
        [style.paddingTop]="_cellPadding"
        [style.paddingBottom]="_cellPadding">
      {{label}}
    </td>
  </tr>
}

<!-- Create the first row separately so we can include a special spacer cell. -->
@for (row of rows; track _trackRow(row); let rowIndex = $index) {
  <tr role="row">
    <!--
      This cell is purely decorative, but we can't put \`aria-hidden\` or \`role="presentation"\` on it,
      because it throws off the week days for the rest of the row on NVDA. The aspect ratio of the
      table cells is maintained by setting the top and bottom padding as a percentage of the width
      (a variant of the trick described here: https://www.w3schools.com/howto/howto_css_aspect_ratio.asp).
    -->
    @if (rowIndex === 0 && _firstRowOffset) {
      <td
        class="mat-calendar-body-label"
        [attr.colspan]="_firstRowOffset"
        [style.paddingTop]="_cellPadding"
        [style.paddingBottom]="_cellPadding">
        {{_firstRowOffset >= labelMinRequiredCells ? label : ''}}
      </td>
    }
    <!--
      Each gridcell in the calendar contains a button, which signals to assistive technology that the
      cell is interactable, as well as the selection state via \`aria-pressed\`. See #23476 for
      background.
    -->
    @for (item of row; track item.id; let colIndex = $index) {
      <td
        role="gridcell"
        class="mat-calendar-body-cell-container"
        [style.width]="_cellWidth"
        [style.paddingTop]="_cellPadding"
        [style.paddingBottom]="_cellPadding"
        [attr.data-mat-row]="rowIndex"
        [attr.data-mat-col]="colIndex"
      >
        <button
            type="button"
            class="mat-calendar-body-cell"
            [class]="item.cssClasses"
            [tabindex]="_isActiveCell(rowIndex, colIndex) ? 0 : -1"
            [class.mat-calendar-body-disabled]="!item.enabled"
            [class.mat-calendar-body-active]="_isActiveCell(rowIndex, colIndex)"
            [class.mat-calendar-body-range-start]="_isRangeStart(item.compareValue)"
            [class.mat-calendar-body-range-end]="_isRangeEnd(item.compareValue)"
            [class.mat-calendar-body-in-range]="_isInRange(item.compareValue)"
            [class.mat-calendar-body-comparison-bridge-start]="_isComparisonBridgeStart(item.compareValue, rowIndex, colIndex)"
            [class.mat-calendar-body-comparison-bridge-end]="_isComparisonBridgeEnd(item.compareValue, rowIndex, colIndex)"
            [class.mat-calendar-body-comparison-start]="_isComparisonStart(item.compareValue)"
            [class.mat-calendar-body-comparison-end]="_isComparisonEnd(item.compareValue)"
            [class.mat-calendar-body-in-comparison-range]="_isInComparisonRange(item.compareValue)"
            [class.mat-calendar-body-preview-start]="_isPreviewStart(item.compareValue)"
            [class.mat-calendar-body-preview-end]="_isPreviewEnd(item.compareValue)"
            [class.mat-calendar-body-in-preview]="_isInPreview(item.compareValue)"
            [attr.aria-label]="item.ariaLabel"
            [attr.aria-disabled]="!item.enabled || null"
            [attr.aria-pressed]="_isSelected(item.compareValue)"
            [attr.aria-current]="todayValue === item.compareValue ? 'date' : null"
            [attr.aria-describedby]="_getDescribedby(item.compareValue)"
            (click)="_cellClicked(item, $event)"
            (focus)="_emitActiveDateChange(item, $event)">
            <span class="mat-calendar-body-cell-content mat-focus-indicator"
              [class.mat-calendar-body-selected]="_isSelected(item.compareValue)"
              [class.mat-calendar-body-comparison-identical]="_isComparisonIdentical(item.compareValue)"
              [class.mat-calendar-body-today]="todayValue === item.compareValue">
              {{item.displayValue}}
            </span>
            <span class="mat-calendar-body-cell-preview" aria-hidden="true"></span>
        </button>
      </td>
    }
  </tr>
}

<span [id]="_startDateLabelId" class="mat-calendar-body-hidden-label">
  {{startDateAccessibleName}}
</span>
<span [id]="_endDateLabelId" class="mat-calendar-body-hidden-label">
  {{endDateAccessibleName}}
</span>
<span [id]="_comparisonStartDateLabelId" class="mat-calendar-body-hidden-label">
  {{comparisonDateAccessibleName}} {{startDateAccessibleName}}
</span>
<span [id]="_comparisonEndDateLabelId" class="mat-calendar-body-hidden-label">
  {{comparisonDateAccessibleName}} {{endDateAccessibleName}}
</span>
`,
      styles: ['.mat-calendar-body {\n  min-width: 224px;\n}\n\n.mat-calendar-body-today:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {\n  border-color: var(--mat-datepicker-calendar-date-today-outline-color, var(--mat-sys-primary));\n}\n\n.mat-calendar-body-label {\n  height: 0;\n  line-height: 0;\n  text-align: start;\n  padding-left: 4.7142857143%;\n  padding-right: 4.7142857143%;\n  font-size: var(--mat-datepicker-calendar-body-label-text-size, var(--mat-sys-title-small-size));\n  font-weight: var(--mat-datepicker-calendar-body-label-text-weight, var(--mat-sys-title-small-weight));\n  color: var(--mat-datepicker-calendar-body-label-text-color, var(--mat-sys-on-surface));\n}\n\n.mat-calendar-body-hidden-label {\n  display: none;\n}\n\n.mat-calendar-body-cell-container {\n  position: relative;\n  height: 0;\n  line-height: 0;\n}\n\n.mat-calendar-body-cell {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: none;\n  text-align: center;\n  outline: none;\n  margin: 0;\n  font-family: var(--mat-datepicker-calendar-text-font, var(--mat-sys-body-medium-font));\n  font-size: var(--mat-datepicker-calendar-text-size, var(--mat-sys-body-medium-size));\n  -webkit-user-select: none;\n  user-select: none;\n  cursor: pointer;\n  outline: none;\n  border: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.mat-calendar-body-cell::-moz-focus-inner {\n  border: 0;\n}\n\n.mat-calendar-body-cell::before,\n.mat-calendar-body-cell::after,\n.mat-calendar-body-cell-preview {\n  content: "";\n  position: absolute;\n  top: 5%;\n  left: 0;\n  z-index: 0;\n  box-sizing: border-box;\n  display: block;\n  height: 90%;\n  width: 100%;\n}\n\n.mat-calendar-body-range-start:not(.mat-calendar-body-in-comparison-range)::before,\n.mat-calendar-body-range-start::after,\n.mat-calendar-body-comparison-start:not(.mat-calendar-body-comparison-bridge-start)::before,\n.mat-calendar-body-comparison-start::after,\n.mat-calendar-body-preview-start .mat-calendar-body-cell-preview {\n  left: 5%;\n  width: 95%;\n  border-top-left-radius: 999px;\n  border-bottom-left-radius: 999px;\n}\n[dir=rtl] .mat-calendar-body-range-start:not(.mat-calendar-body-in-comparison-range)::before,\n[dir=rtl] .mat-calendar-body-range-start::after,\n[dir=rtl] .mat-calendar-body-comparison-start:not(.mat-calendar-body-comparison-bridge-start)::before,\n[dir=rtl] .mat-calendar-body-comparison-start::after,\n[dir=rtl] .mat-calendar-body-preview-start .mat-calendar-body-cell-preview {\n  left: 0;\n  border-radius: 0;\n  border-top-right-radius: 999px;\n  border-bottom-right-radius: 999px;\n}\n\n.mat-calendar-body-range-end:not(.mat-calendar-body-in-comparison-range)::before,\n.mat-calendar-body-range-end::after,\n.mat-calendar-body-comparison-end:not(.mat-calendar-body-comparison-bridge-end)::before,\n.mat-calendar-body-comparison-end::after,\n.mat-calendar-body-preview-end .mat-calendar-body-cell-preview {\n  width: 95%;\n  border-top-right-radius: 999px;\n  border-bottom-right-radius: 999px;\n}\n[dir=rtl] .mat-calendar-body-range-end:not(.mat-calendar-body-in-comparison-range)::before,\n[dir=rtl] .mat-calendar-body-range-end::after,\n[dir=rtl] .mat-calendar-body-comparison-end:not(.mat-calendar-body-comparison-bridge-end)::before,\n[dir=rtl] .mat-calendar-body-comparison-end::after,\n[dir=rtl] .mat-calendar-body-preview-end .mat-calendar-body-cell-preview {\n  left: 5%;\n  border-radius: 0;\n  border-top-left-radius: 999px;\n  border-bottom-left-radius: 999px;\n}\n\n[dir=rtl] .mat-calendar-body-comparison-bridge-start.mat-calendar-body-range-end::after,\n[dir=rtl] .mat-calendar-body-comparison-bridge-end.mat-calendar-body-range-start::after {\n  width: 95%;\n  border-top-right-radius: 999px;\n  border-bottom-right-radius: 999px;\n}\n\n.mat-calendar-body-comparison-start.mat-calendar-body-range-end::after, [dir=rtl] .mat-calendar-body-comparison-start.mat-calendar-body-range-end::after,\n.mat-calendar-body-comparison-end.mat-calendar-body-range-start::after,\n[dir=rtl] .mat-calendar-body-comparison-end.mat-calendar-body-range-start::after {\n  width: 90%;\n}\n\n.mat-calendar-body-in-preview {\n  color: var(--mat-datepicker-calendar-date-preview-state-outline-color, var(--mat-sys-primary));\n}\n.mat-calendar-body-in-preview .mat-calendar-body-cell-preview {\n  border-top: dashed 1px;\n  border-bottom: dashed 1px;\n}\n\n.mat-calendar-body-preview-start .mat-calendar-body-cell-preview {\n  border-left: dashed 1px;\n}\n[dir=rtl] .mat-calendar-body-preview-start .mat-calendar-body-cell-preview {\n  border-left: 0;\n  border-right: dashed 1px;\n}\n\n.mat-calendar-body-preview-end .mat-calendar-body-cell-preview {\n  border-right: dashed 1px;\n}\n[dir=rtl] .mat-calendar-body-preview-end .mat-calendar-body-cell-preview {\n  border-right: 0;\n  border-left: dashed 1px;\n}\n\n.mat-calendar-body-disabled {\n  cursor: default;\n}\n.mat-calendar-body-disabled > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {\n  color: var(--mat-datepicker-calendar-date-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-calendar-body-disabled > .mat-calendar-body-today:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {\n  border-color: var(--mat-datepicker-calendar-date-today-disabled-state-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n@media (forced-colors: active) {\n  .mat-calendar-body-disabled {\n    opacity: 0.5;\n  }\n}\n\n.mat-calendar-body-cell-content {\n  top: 5%;\n  left: 5%;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  width: 90%;\n  height: 90%;\n  line-height: 1;\n  border-width: 1px;\n  border-style: solid;\n  border-radius: 999px;\n  color: var(--mat-datepicker-calendar-date-text-color, var(--mat-sys-on-surface));\n  border-color: var(--mat-datepicker-calendar-date-outline-color, transparent);\n}\n.mat-calendar-body-cell-content.mat-focus-indicator {\n  position: absolute;\n}\n.mat-calendar-body-cell-content::before {\n  border-radius: 50%;\n}\n@media (forced-colors: active) {\n  .mat-calendar-body-cell-content {\n    border: none;\n  }\n}\n\n.cdk-keyboard-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical), .cdk-program-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {\n  background-color: var(--mat-datepicker-calendar-date-focus-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));\n}\n\n@media (hover: hover) {\n  .mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {\n    background-color: var(--mat-datepicker-calendar-date-hover-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));\n  }\n}\n.mat-calendar-body-selected {\n  background-color: var(--mat-datepicker-calendar-date-selected-state-background-color, var(--mat-sys-primary));\n  color: var(--mat-datepicker-calendar-date-selected-state-text-color, var(--mat-sys-on-primary));\n}\n.mat-calendar-body-disabled > .mat-calendar-body-selected {\n  background-color: var(--mat-datepicker-calendar-date-selected-disabled-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-calendar-body-selected.mat-calendar-body-today {\n  box-shadow: inset 0 0 0 1px var(--mat-datepicker-calendar-date-today-selected-state-outline-color, var(--mat-sys-primary));\n}\n\n.mat-calendar-body-in-range::before {\n  background: var(--mat-datepicker-calendar-date-in-range-state-background-color, var(--mat-sys-primary-container));\n}\n\n.mat-calendar-body-comparison-identical,\n.mat-calendar-body-in-comparison-range::before {\n  background: var(--mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--mat-sys-tertiary-container));\n}\n\n.mat-calendar-body-comparison-identical,\n.mat-calendar-body-in-comparison-range::before {\n  background: var(--mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--mat-sys-tertiary-container));\n}\n\n.mat-calendar-body-comparison-bridge-start::before,\n[dir=rtl] .mat-calendar-body-comparison-bridge-end::before {\n  background: linear-gradient(to right, var(--mat-datepicker-calendar-date-in-range-state-background-color, var(--mat-sys-primary-container)) 50%, var(--mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--mat-sys-tertiary-container)) 50%);\n}\n\n.mat-calendar-body-comparison-bridge-end::before,\n[dir=rtl] .mat-calendar-body-comparison-bridge-start::before {\n  background: linear-gradient(to left, var(--mat-datepicker-calendar-date-in-range-state-background-color, var(--mat-sys-primary-container)) 50%, var(--mat-datepicker-calendar-date-in-comparison-range-state-background-color, var(--mat-sys-tertiary-container)) 50%);\n}\n\n.mat-calendar-body-in-range > .mat-calendar-body-comparison-identical,\n.mat-calendar-body-in-comparison-range.mat-calendar-body-in-range::after {\n  background: var(--mat-datepicker-calendar-date-in-overlap-range-state-background-color, var(--mat-sys-secondary-container));\n}\n\n.mat-calendar-body-comparison-identical.mat-calendar-body-selected,\n.mat-calendar-body-in-comparison-range > .mat-calendar-body-selected {\n  background: var(--mat-datepicker-calendar-date-in-overlap-range-selected-state-background-color, var(--mat-sys-secondary));\n}\n\n@media (forced-colors: active) {\n  .mat-datepicker-popup:not(:empty),\n  .mat-calendar-body-cell:not(.mat-calendar-body-in-range) .mat-calendar-body-selected {\n    outline: solid 1px;\n  }\n  .mat-calendar-body-today {\n    outline: dotted 1px;\n  }\n  .mat-calendar-body-cell::before,\n  .mat-calendar-body-cell::after,\n  .mat-calendar-body-selected {\n    background: none;\n  }\n  .mat-calendar-body-in-range::before,\n  .mat-calendar-body-comparison-bridge-start::before,\n  .mat-calendar-body-comparison-bridge-end::before {\n    border-top: solid 1px;\n    border-bottom: solid 1px;\n  }\n  .mat-calendar-body-range-start::before {\n    border-left: solid 1px;\n  }\n  [dir=rtl] .mat-calendar-body-range-start::before {\n    border-left: 0;\n    border-right: solid 1px;\n  }\n  .mat-calendar-body-range-end::before {\n    border-right: solid 1px;\n  }\n  [dir=rtl] .mat-calendar-body-range-end::before {\n    border-right: 0;\n    border-left: solid 1px;\n  }\n  .mat-calendar-body-in-comparison-range::before {\n    border-top: dashed 1px;\n    border-bottom: dashed 1px;\n  }\n  .mat-calendar-body-comparison-start::before {\n    border-left: dashed 1px;\n  }\n  [dir=rtl] .mat-calendar-body-comparison-start::before {\n    border-left: 0;\n    border-right: dashed 1px;\n  }\n  .mat-calendar-body-comparison-end::before {\n    border-right: dashed 1px;\n  }\n  [dir=rtl] .mat-calendar-body-comparison-end::before {\n    border-right: 0;\n    border-left: dashed 1px;\n  }\n}\n']
    }]
  }], () => [], {
    label: [{
      type: Input
    }],
    rows: [{
      type: Input
    }],
    todayValue: [{
      type: Input
    }],
    startValue: [{
      type: Input
    }],
    endValue: [{
      type: Input
    }],
    labelMinRequiredCells: [{
      type: Input
    }],
    numCols: [{
      type: Input
    }],
    activeCell: [{
      type: Input
    }],
    isRange: [{
      type: Input
    }],
    cellAspectRatio: [{
      type: Input
    }],
    comparisonStart: [{
      type: Input
    }],
    comparisonEnd: [{
      type: Input
    }],
    previewStart: [{
      type: Input
    }],
    previewEnd: [{
      type: Input
    }],
    startDateAccessibleName: [{
      type: Input
    }],
    endDateAccessibleName: [{
      type: Input
    }],
    selectedValueChange: [{
      type: Output
    }],
    previewChange: [{
      type: Output
    }],
    activeDateChange: [{
      type: Output
    }],
    dragStarted: [{
      type: Output
    }],
    dragEnded: [{
      type: Output
    }]
  });
})();
function isTableCell(node) {
  return node?.nodeName === "TD";
}
function getCellElement(element) {
  let cell;
  if (isTableCell(element)) {
    cell = element;
  } else if (isTableCell(element.parentNode)) {
    cell = element.parentNode;
  } else if (isTableCell(element.parentNode?.parentNode)) {
    cell = element.parentNode.parentNode;
  }
  return cell?.getAttribute("data-mat-row") != null ? cell : null;
}
function isStart(value, start, end) {
  return end !== null && start !== end && value < end && value === start;
}
function isEnd(value, start, end) {
  return start !== null && start !== end && value >= start && value === end;
}
function isInRange(value, start, end, rangeEnabled) {
  return rangeEnabled && start !== null && end !== null && start !== end && value >= start && value <= end;
}
function getActualTouchTarget(event) {
  const touchLocation = event.changedTouches[0];
  return document.elementFromPoint(touchLocation.clientX, touchLocation.clientY);
}
var DateRange = class {
  start;
  end;
  _disableStructuralEquivalency;
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
};
var MatDateSelectionModel = class _MatDateSelectionModel {
  selection;
  _adapter;
  _selectionChanged = new Subject();
  selectionChanged = this._selectionChanged;
  constructor(selection, _adapter) {
    this.selection = selection;
    this._adapter = _adapter;
    this.selection = selection;
  }
  updateSelection(value, source) {
    const oldValue = this.selection;
    this.selection = value;
    this._selectionChanged.next({
      selection: value,
      source,
      oldValue
    });
  }
  ngOnDestroy() {
    this._selectionChanged.complete();
  }
  _isValidDateInstance(date) {
    return this._adapter.isDateInstance(date) && this._adapter.isValid(date);
  }
  static \u0275fac = function MatDateSelectionModel_Factory(__ngFactoryType__) {
    \u0275\u0275invalidFactory();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _MatDateSelectionModel,
    factory: _MatDateSelectionModel.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDateSelectionModel, [{
    type: Injectable
  }], () => [{
    type: void 0
  }, {
    type: DateAdapter
  }], null);
})();
var MatSingleDateSelectionModel = class _MatSingleDateSelectionModel extends MatDateSelectionModel {
  constructor(adapter) {
    super(null, adapter);
  }
  add(date) {
    super.updateSelection(date, this);
  }
  isValid() {
    return this.selection != null && this._isValidDateInstance(this.selection);
  }
  isComplete() {
    return this.selection != null;
  }
  clone() {
    const clone = new _MatSingleDateSelectionModel(this._adapter);
    clone.updateSelection(this.selection, this);
    return clone;
  }
  static \u0275fac = function MatSingleDateSelectionModel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatSingleDateSelectionModel)(\u0275\u0275inject(DateAdapter));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _MatSingleDateSelectionModel,
    factory: _MatSingleDateSelectionModel.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSingleDateSelectionModel, [{
    type: Injectable
  }], () => [{
    type: DateAdapter
  }], null);
})();
var MatRangeDateSelectionModel = class _MatRangeDateSelectionModel extends MatDateSelectionModel {
  constructor(adapter) {
    super(new DateRange(null, null), adapter);
  }
  add(date) {
    let {
      start,
      end
    } = this.selection;
    if (start == null) {
      start = date;
    } else if (end == null) {
      end = date;
    } else {
      start = date;
      end = null;
    }
    super.updateSelection(new DateRange(start, end), this);
  }
  isValid() {
    const {
      start,
      end
    } = this.selection;
    if (start == null && end == null) {
      return true;
    }
    if (start != null && end != null) {
      return this._isValidDateInstance(start) && this._isValidDateInstance(end) && this._adapter.compareDate(start, end) <= 0;
    }
    return (start == null || this._isValidDateInstance(start)) && (end == null || this._isValidDateInstance(end));
  }
  isComplete() {
    return this.selection.start != null && this.selection.end != null;
  }
  clone() {
    const clone = new _MatRangeDateSelectionModel(this._adapter);
    clone.updateSelection(this.selection, this);
    return clone;
  }
  static \u0275fac = function MatRangeDateSelectionModel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatRangeDateSelectionModel)(\u0275\u0275inject(DateAdapter));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _MatRangeDateSelectionModel,
    factory: _MatRangeDateSelectionModel.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatRangeDateSelectionModel, [{
    type: Injectable
  }], () => [{
    type: DateAdapter
  }], null);
})();
var MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER = {
  provide: MatDateSelectionModel,
  useFactory: () => {
    const parent = inject(MatDateSelectionModel, {
      optional: true,
      skipSelf: true
    });
    return parent || new MatSingleDateSelectionModel(inject(DateAdapter));
  }
};
var MAT_RANGE_DATE_SELECTION_MODEL_PROVIDER = {
  provide: MatDateSelectionModel,
  useFactory: () => {
    const parent = inject(MatDateSelectionModel, {
      optional: true,
      skipSelf: true
    });
    return parent || new MatRangeDateSelectionModel(inject(DateAdapter));
  }
};
var MAT_DATE_RANGE_SELECTION_STRATEGY = new InjectionToken("MAT_DATE_RANGE_SELECTION_STRATEGY");
var DefaultMatCalendarRangeStrategy = class _DefaultMatCalendarRangeStrategy {
  _dateAdapter;
  constructor(_dateAdapter) {
    this._dateAdapter = _dateAdapter;
  }
  selectionFinished(date, currentRange) {
    let {
      start,
      end
    } = currentRange;
    if (start == null) {
      start = date;
    } else if (end == null && date && this._dateAdapter.compareDate(date, start) >= 0) {
      end = date;
    } else {
      start = date;
      end = null;
    }
    return new DateRange(start, end);
  }
  createPreview(activeDate, currentRange) {
    let start = null;
    let end = null;
    if (currentRange.start && !currentRange.end && activeDate) {
      start = currentRange.start;
      end = activeDate;
    }
    return new DateRange(start, end);
  }
  createDrag(dragOrigin, originalRange, newDate) {
    let start = originalRange.start;
    let end = originalRange.end;
    if (!start || !end) {
      return null;
    }
    const adapter = this._dateAdapter;
    const isRange = adapter.compareDate(start, end) !== 0;
    const diffYears = adapter.getYear(newDate) - adapter.getYear(dragOrigin);
    const diffMonths = adapter.getMonth(newDate) - adapter.getMonth(dragOrigin);
    const diffDays = adapter.getDate(newDate) - adapter.getDate(dragOrigin);
    if (isRange && adapter.sameDate(dragOrigin, originalRange.start)) {
      start = newDate;
      if (adapter.compareDate(newDate, end) > 0) {
        end = adapter.addCalendarYears(end, diffYears);
        end = adapter.addCalendarMonths(end, diffMonths);
        end = adapter.addCalendarDays(end, diffDays);
      }
    } else if (isRange && adapter.sameDate(dragOrigin, originalRange.end)) {
      end = newDate;
      if (adapter.compareDate(newDate, start) < 0) {
        start = adapter.addCalendarYears(start, diffYears);
        start = adapter.addCalendarMonths(start, diffMonths);
        start = adapter.addCalendarDays(start, diffDays);
      }
    } else {
      start = adapter.addCalendarYears(start, diffYears);
      start = adapter.addCalendarMonths(start, diffMonths);
      start = adapter.addCalendarDays(start, diffDays);
      end = adapter.addCalendarYears(end, diffYears);
      end = adapter.addCalendarMonths(end, diffMonths);
      end = adapter.addCalendarDays(end, diffDays);
    }
    return new DateRange(start, end);
  }
  static \u0275fac = function DefaultMatCalendarRangeStrategy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DefaultMatCalendarRangeStrategy)(\u0275\u0275inject(DateAdapter));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _DefaultMatCalendarRangeStrategy,
    factory: _DefaultMatCalendarRangeStrategy.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultMatCalendarRangeStrategy, [{
    type: Injectable
  }], () => [{
    type: DateAdapter
  }], null);
})();
var DAYS_PER_WEEK = 7;
var uniqueIdCounter = 0;
var MatMonthView = class _MatMonthView {
  _changeDetectorRef = inject(ChangeDetectorRef);
  _dateFormats = inject(MAT_DATE_FORMATS, {
    optional: true
  });
  _dateAdapter = inject(DateAdapter, {
    optional: true
  });
  _dir = inject(Directionality, {
    optional: true
  });
  _rangeStrategy = inject(MAT_DATE_RANGE_SELECTION_STRATEGY, {
    optional: true
  });
  _rerenderSubscription = Subscription.EMPTY;
  _selectionKeyPressed = false;
  get activeDate() {
    return this._activeDate;
  }
  set activeDate(value) {
    const oldActiveDate = this._activeDate;
    const validDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
    this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
    if (!this._hasSameMonthAndYear(oldActiveDate, this._activeDate)) {
      this._init();
    }
  }
  _activeDate;
  get selected() {
    return this._selected;
  }
  set selected(value) {
    if (value instanceof DateRange) {
      this._selected = value;
    } else {
      this._selected = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    this._setRanges(this._selected);
  }
  _selected = null;
  get minDate() {
    return this._minDate;
  }
  set minDate(value) {
    this._minDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  _minDate = null;
  get maxDate() {
    return this._maxDate;
  }
  set maxDate(value) {
    this._maxDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  _maxDate = null;
  dateFilter;
  dateClass;
  comparisonStart = null;
  comparisonEnd = null;
  startDateAccessibleName = null;
  endDateAccessibleName = null;
  activeDrag = null;
  selectedChange = new EventEmitter();
  _userSelection = new EventEmitter();
  dragStarted = new EventEmitter();
  dragEnded = new EventEmitter();
  activeDateChange = new EventEmitter();
  _matCalendarBody;
  _monthLabel = signal("", ...ngDevMode ? [{
    debugName: "_monthLabel"
  }] : []);
  _weeks = signal([], ...ngDevMode ? [{
    debugName: "_weeks"
  }] : []);
  _firstWeekOffset = signal(0, ...ngDevMode ? [{
    debugName: "_firstWeekOffset"
  }] : []);
  _rangeStart = signal(null, ...ngDevMode ? [{
    debugName: "_rangeStart"
  }] : []);
  _rangeEnd = signal(null, ...ngDevMode ? [{
    debugName: "_rangeEnd"
  }] : []);
  _comparisonRangeStart = signal(null, ...ngDevMode ? [{
    debugName: "_comparisonRangeStart"
  }] : []);
  _comparisonRangeEnd = signal(null, ...ngDevMode ? [{
    debugName: "_comparisonRangeEnd"
  }] : []);
  _previewStart = signal(null, ...ngDevMode ? [{
    debugName: "_previewStart"
  }] : []);
  _previewEnd = signal(null, ...ngDevMode ? [{
    debugName: "_previewEnd"
  }] : []);
  _isRange = signal(false, ...ngDevMode ? [{
    debugName: "_isRange"
  }] : []);
  _todayDate = signal(null, ...ngDevMode ? [{
    debugName: "_todayDate"
  }] : []);
  _weekdays = signal([], ...ngDevMode ? [{
    debugName: "_weekdays"
  }] : []);
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_VisuallyHiddenLoader);
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this._dateAdapter) {
        throw createMissingDateImplError("DateAdapter");
      }
      if (!this._dateFormats) {
        throw createMissingDateImplError("MAT_DATE_FORMATS");
      }
    }
    this._activeDate = this._dateAdapter.today();
  }
  ngAfterContentInit() {
    this._rerenderSubscription = this._dateAdapter.localeChanges.pipe(startWith(null)).subscribe(() => this._init());
  }
  ngOnChanges(changes) {
    const comparisonChange = changes["comparisonStart"] || changes["comparisonEnd"];
    if (comparisonChange && !comparisonChange.firstChange) {
      this._setRanges(this.selected);
    }
    if (changes["activeDrag"] && !this.activeDrag) {
      this._clearPreview();
    }
  }
  ngOnDestroy() {
    this._rerenderSubscription.unsubscribe();
  }
  _dateSelected(event) {
    const date = event.value;
    const selectedDate = this._getDateFromDayOfMonth(date);
    let rangeStartDate;
    let rangeEndDate;
    if (this._selected instanceof DateRange) {
      rangeStartDate = this._getDateInCurrentMonth(this._selected.start);
      rangeEndDate = this._getDateInCurrentMonth(this._selected.end);
    } else {
      rangeStartDate = rangeEndDate = this._getDateInCurrentMonth(this._selected);
    }
    if (rangeStartDate !== date || rangeEndDate !== date) {
      this.selectedChange.emit(selectedDate);
    }
    this._userSelection.emit({
      value: selectedDate,
      event: event.event
    });
    this._clearPreview();
    this._changeDetectorRef.markForCheck();
  }
  _updateActiveDate(event) {
    const month = event.value;
    const oldActiveDate = this._activeDate;
    this.activeDate = this._getDateFromDayOfMonth(month);
    if (this._dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
      this.activeDateChange.emit(this._activeDate);
    }
  }
  _handleCalendarBodyKeydown(event) {
    const oldActiveDate = this._activeDate;
    const isRtl = this._isRtl();
    switch (event.keyCode) {
      case LEFT_ARROW:
        this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, isRtl ? 1 : -1);
        break;
      case RIGHT_ARROW:
        this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, isRtl ? -1 : 1);
        break;
      case UP_ARROW:
        this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, -7);
        break;
      case DOWN_ARROW:
        this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, 7);
        break;
      case HOME:
        this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, 1 - this._dateAdapter.getDate(this._activeDate));
        break;
      case END:
        this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, this._dateAdapter.getNumDaysInMonth(this._activeDate) - this._dateAdapter.getDate(this._activeDate));
        break;
      case PAGE_UP:
        this.activeDate = event.altKey ? this._dateAdapter.addCalendarYears(this._activeDate, -1) : this._dateAdapter.addCalendarMonths(this._activeDate, -1);
        break;
      case PAGE_DOWN:
        this.activeDate = event.altKey ? this._dateAdapter.addCalendarYears(this._activeDate, 1) : this._dateAdapter.addCalendarMonths(this._activeDate, 1);
        break;
      case ENTER:
      case SPACE:
        this._selectionKeyPressed = true;
        if (this._canSelect(this._activeDate)) {
          event.preventDefault();
        }
        return;
      case ESCAPE:
        if (this._previewEnd() != null && !hasModifierKey(event)) {
          this._clearPreview();
          if (this.activeDrag) {
            this.dragEnded.emit({
              value: null,
              event
            });
          } else {
            this.selectedChange.emit(null);
            this._userSelection.emit({
              value: null,
              event
            });
          }
          event.preventDefault();
          event.stopPropagation();
        }
        return;
      default:
        return;
    }
    if (this._dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
      this.activeDateChange.emit(this.activeDate);
      this._focusActiveCellAfterViewChecked();
    }
    event.preventDefault();
  }
  _handleCalendarBodyKeyup(event) {
    if (event.keyCode === SPACE || event.keyCode === ENTER) {
      if (this._selectionKeyPressed && this._canSelect(this._activeDate)) {
        this._dateSelected({
          value: this._dateAdapter.getDate(this._activeDate),
          event
        });
      }
      this._selectionKeyPressed = false;
    }
  }
  _init() {
    this._setRanges(this.selected);
    this._todayDate.set(this._getCellCompareValue(this._dateAdapter.today()));
    this._monthLabel.set(this._dateFormats.display.monthLabel ? this._dateAdapter.format(this.activeDate, this._dateFormats.display.monthLabel) : this._dateAdapter.getMonthNames("short")[this._dateAdapter.getMonth(this.activeDate)].toLocaleUpperCase());
    let firstOfMonth = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), 1);
    this._firstWeekOffset.set((DAYS_PER_WEEK + this._dateAdapter.getDayOfWeek(firstOfMonth) - this._dateAdapter.getFirstDayOfWeek()) % DAYS_PER_WEEK);
    this._initWeekdays();
    this._createWeekCells();
    this._changeDetectorRef.markForCheck();
  }
  _focusActiveCell(movePreview) {
    this._matCalendarBody._focusActiveCell(movePreview);
  }
  _focusActiveCellAfterViewChecked() {
    this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked();
  }
  _previewChanged({
    event,
    value: cell
  }) {
    if (this._rangeStrategy) {
      const value = cell ? cell.rawValue : null;
      const previewRange = this._rangeStrategy.createPreview(value, this.selected, event);
      this._previewStart.set(this._getCellCompareValue(previewRange.start));
      this._previewEnd.set(this._getCellCompareValue(previewRange.end));
      if (this.activeDrag && value) {
        const dragRange = this._rangeStrategy.createDrag?.(this.activeDrag.value, this.selected, value, event);
        if (dragRange) {
          this._previewStart.set(this._getCellCompareValue(dragRange.start));
          this._previewEnd.set(this._getCellCompareValue(dragRange.end));
        }
      }
    }
  }
  _dragEnded(event) {
    if (!this.activeDrag) return;
    if (event.value) {
      const dragDropResult = this._rangeStrategy?.createDrag?.(this.activeDrag.value, this.selected, event.value, event.event);
      this.dragEnded.emit({
        value: dragDropResult ?? null,
        event: event.event
      });
    } else {
      this.dragEnded.emit({
        value: null,
        event: event.event
      });
    }
  }
  _getDateFromDayOfMonth(dayOfMonth) {
    return this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), dayOfMonth);
  }
  _initWeekdays() {
    const firstDayOfWeek = this._dateAdapter.getFirstDayOfWeek();
    const narrowWeekdays = this._dateAdapter.getDayOfWeekNames("narrow");
    const longWeekdays = this._dateAdapter.getDayOfWeekNames("long");
    const weekdays = longWeekdays.map((long, i) => {
      return {
        long,
        narrow: narrowWeekdays[i],
        id: uniqueIdCounter++
      };
    });
    this._weekdays.set(weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek)));
  }
  _createWeekCells() {
    const daysInMonth = this._dateAdapter.getNumDaysInMonth(this.activeDate);
    const dateNames = this._dateAdapter.getDateNames();
    const weeks = [[]];
    for (let i = 0, cell = this._firstWeekOffset(); i < daysInMonth; i++, cell++) {
      if (cell == DAYS_PER_WEEK) {
        weeks.push([]);
        cell = 0;
      }
      const date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), i + 1);
      const enabled = this._shouldEnableDate(date);
      const ariaLabel = this._dateAdapter.format(date, this._dateFormats.display.dateA11yLabel);
      const cellClasses = this.dateClass ? this.dateClass(date, "month") : void 0;
      weeks[weeks.length - 1].push(new MatCalendarCell(i + 1, dateNames[i], ariaLabel, enabled, cellClasses, this._getCellCompareValue(date), date));
    }
    this._weeks.set(weeks);
  }
  _shouldEnableDate(date) {
    return !!date && (!this.minDate || this._dateAdapter.compareDate(date, this.minDate) >= 0) && (!this.maxDate || this._dateAdapter.compareDate(date, this.maxDate) <= 0) && (!this.dateFilter || this.dateFilter(date));
  }
  _getDateInCurrentMonth(date) {
    return date && this._hasSameMonthAndYear(date, this.activeDate) ? this._dateAdapter.getDate(date) : null;
  }
  _hasSameMonthAndYear(d1, d2) {
    return !!(d1 && d2 && this._dateAdapter.getMonth(d1) == this._dateAdapter.getMonth(d2) && this._dateAdapter.getYear(d1) == this._dateAdapter.getYear(d2));
  }
  _getCellCompareValue(date) {
    if (date) {
      const year = this._dateAdapter.getYear(date);
      const month = this._dateAdapter.getMonth(date);
      const day = this._dateAdapter.getDate(date);
      return new Date(year, month, day).getTime();
    }
    return null;
  }
  _isRtl() {
    return this._dir && this._dir.value === "rtl";
  }
  _setRanges(selectedValue) {
    if (selectedValue instanceof DateRange) {
      this._rangeStart.set(this._getCellCompareValue(selectedValue.start));
      this._rangeEnd.set(this._getCellCompareValue(selectedValue.end));
      this._isRange.set(true);
    } else {
      this._rangeStart.set(this._getCellCompareValue(selectedValue));
      this._rangeEnd.set(this._rangeStart());
      this._isRange.set(false);
    }
    this._comparisonRangeStart.set(this._getCellCompareValue(this.comparisonStart));
    this._comparisonRangeEnd.set(this._getCellCompareValue(this.comparisonEnd));
  }
  _canSelect(date) {
    return !this.dateFilter || this.dateFilter(date);
  }
  _clearPreview() {
    this._previewStart.set(null);
    this._previewEnd.set(null);
  }
  static \u0275fac = function MatMonthView_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatMonthView)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    const _forTrack0 = ($index, $item) => $item.id;
    function MatMonthView_For_4_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "th", 2)(1, "span", 6);
        \u0275\u0275text(2);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "span", 3);
        \u0275\u0275text(4);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        const day_r1 = ctx.$implicit;
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(day_r1.long);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(day_r1.narrow);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatMonthView,
      selectors: [["mat-month-view"]],
      viewQuery: function MatMonthView_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(MatCalendarBody, 5);
        }
        if (rf & 2) {
          let _t = void 0;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._matCalendarBody = _t.first);
        }
      },
      inputs: {
        activeDate: "activeDate",
        selected: "selected",
        minDate: "minDate",
        maxDate: "maxDate",
        dateFilter: "dateFilter",
        dateClass: "dateClass",
        comparisonStart: "comparisonStart",
        comparisonEnd: "comparisonEnd",
        startDateAccessibleName: "startDateAccessibleName",
        endDateAccessibleName: "endDateAccessibleName",
        activeDrag: "activeDrag"
      },
      outputs: {
        selectedChange: "selectedChange",
        _userSelection: "_userSelection",
        dragStarted: "dragStarted",
        dragEnded: "dragEnded",
        activeDateChange: "activeDateChange"
      },
      exportAs: ["matMonthView"],
      features: [\u0275\u0275NgOnChangesFeature],
      decls: 8,
      vars: 14,
      consts: [["role", "grid", 1, "mat-calendar-table"], [1, "mat-calendar-table-header"], ["scope", "col"], ["aria-hidden", "true"], ["colspan", "7", 1, "mat-calendar-table-header-divider"], ["mat-calendar-body", "", 3, "selectedValueChange", "activeDateChange", "previewChange", "dragStarted", "dragEnded", "keyup", "keydown", "label", "rows", "todayValue", "startValue", "endValue", "comparisonStart", "comparisonEnd", "previewStart", "previewEnd", "isRange", "labelMinRequiredCells", "activeCell", "startDateAccessibleName", "endDateAccessibleName"], [1, "cdk-visually-hidden"]],
      template: function MatMonthView_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275elementStart(0, "table", 0)(1, "thead", 1)(2, "tr");
          \u0275\u0275repeaterCreate(3, MatMonthView_For_4_Template, 5, 2, "th", 2, _forTrack0);
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(5, "tr", 3);
          \u0275\u0275element(6, "th", 4);
          \u0275\u0275elementEnd()();
          \u0275\u0275elementStart(7, "tbody", 5);
          \u0275\u0275listener("selectedValueChange", function MatMonthView_Template_tbody_selectedValueChange_7_listener($event) {
            return ctx._dateSelected($event);
          })("activeDateChange", function MatMonthView_Template_tbody_activeDateChange_7_listener($event) {
            return ctx._updateActiveDate($event);
          })("previewChange", function MatMonthView_Template_tbody_previewChange_7_listener($event) {
            return ctx._previewChanged($event);
          })("dragStarted", function MatMonthView_Template_tbody_dragStarted_7_listener($event) {
            return ctx.dragStarted.emit($event);
          })("dragEnded", function MatMonthView_Template_tbody_dragEnded_7_listener($event) {
            return ctx._dragEnded($event);
          })("keyup", function MatMonthView_Template_tbody_keyup_7_listener($event) {
            return ctx._handleCalendarBodyKeyup($event);
          })("keydown", function MatMonthView_Template_tbody_keydown_7_listener($event) {
            return ctx._handleCalendarBodyKeydown($event);
          });
          \u0275\u0275elementEnd()();
        }
        if (rf & 2) {
          \u0275\u0275advance(3);
          \u0275\u0275repeater(ctx._weekdays());
          \u0275\u0275advance(4);
          \u0275\u0275property("label", ctx._monthLabel())("rows", ctx._weeks())("todayValue", ctx._todayDate())("startValue", ctx._rangeStart())("endValue", ctx._rangeEnd())("comparisonStart", ctx._comparisonRangeStart())("comparisonEnd", ctx._comparisonRangeEnd())("previewStart", ctx._previewStart())("previewEnd", ctx._previewEnd())("isRange", ctx._isRange())("labelMinRequiredCells", 3)("activeCell", ctx._dateAdapter.getDate(ctx.activeDate) - 1)("startDateAccessibleName", ctx.startDateAccessibleName)("endDateAccessibleName", ctx.endDateAccessibleName);
        }
      },
      dependencies: [MatCalendarBody],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatMonthView, [{
    type: Component,
    args: [{
      selector: "mat-month-view",
      exportAs: "matMonthView",
      encapsulation: ViewEncapsulation.None,
      imports: [MatCalendarBody],
      template: '<table class="mat-calendar-table" role="grid">\n  <thead class="mat-calendar-table-header">\n    <tr>\n      @for (day of _weekdays(); track day.id) {\n        <th scope="col">\n          <span class="cdk-visually-hidden">{{day.long}}</span>\n          <span aria-hidden="true">{{day.narrow}}</span>\n        </th>\n      }\n    </tr>\n    <tr aria-hidden="true"><th class="mat-calendar-table-header-divider" colspan="7"></th></tr>\n  </thead>\n  <tbody mat-calendar-body\n         [label]="_monthLabel()"\n         [rows]="_weeks()"\n         [todayValue]="_todayDate()!"\n         [startValue]="_rangeStart()!"\n         [endValue]="_rangeEnd()!"\n         [comparisonStart]="_comparisonRangeStart()"\n         [comparisonEnd]="_comparisonRangeEnd()"\n         [previewStart]="_previewStart()"\n         [previewEnd]="_previewEnd()"\n         [isRange]="_isRange()"\n         [labelMinRequiredCells]="3"\n         [activeCell]="_dateAdapter.getDate(activeDate) - 1"\n         [startDateAccessibleName]="startDateAccessibleName"\n         [endDateAccessibleName]="endDateAccessibleName"\n         (selectedValueChange)="_dateSelected($event)"\n         (activeDateChange)="_updateActiveDate($event)"\n         (previewChange)="_previewChanged($event)"\n         (dragStarted)="dragStarted.emit($event)"\n         (dragEnded)="_dragEnded($event)"\n         (keyup)="_handleCalendarBodyKeyup($event)"\n         (keydown)="_handleCalendarBodyKeydown($event)">\n  </tbody>\n</table>\n'
    }]
  }], () => [], {
    activeDate: [{
      type: Input
    }],
    selected: [{
      type: Input
    }],
    minDate: [{
      type: Input
    }],
    maxDate: [{
      type: Input
    }],
    dateFilter: [{
      type: Input
    }],
    dateClass: [{
      type: Input
    }],
    comparisonStart: [{
      type: Input
    }],
    comparisonEnd: [{
      type: Input
    }],
    startDateAccessibleName: [{
      type: Input
    }],
    endDateAccessibleName: [{
      type: Input
    }],
    activeDrag: [{
      type: Input
    }],
    selectedChange: [{
      type: Output
    }],
    _userSelection: [{
      type: Output
    }],
    dragStarted: [{
      type: Output
    }],
    dragEnded: [{
      type: Output
    }],
    activeDateChange: [{
      type: Output
    }],
    _matCalendarBody: [{
      type: ViewChild,
      args: [MatCalendarBody]
    }]
  });
})();
var yearsPerPage = 24;
var yearsPerRow = 4;
var MatMultiYearView = class _MatMultiYearView {
  _changeDetectorRef = inject(ChangeDetectorRef);
  _dateAdapter = inject(DateAdapter, {
    optional: true
  });
  _dir = inject(Directionality, {
    optional: true
  });
  _rerenderSubscription = Subscription.EMPTY;
  _selectionKeyPressed = false;
  get activeDate() {
    return this._activeDate;
  }
  set activeDate(value) {
    let oldActiveDate = this._activeDate;
    const validDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
    this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
    if (!isSameMultiYearView(this._dateAdapter, oldActiveDate, this._activeDate, this.minDate, this.maxDate)) {
      this._init();
    }
  }
  _activeDate;
  get selected() {
    return this._selected;
  }
  set selected(value) {
    if (value instanceof DateRange) {
      this._selected = value;
    } else {
      this._selected = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    this._setSelectedYear(value);
  }
  _selected = null;
  get minDate() {
    return this._minDate;
  }
  set minDate(value) {
    this._minDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  _minDate = null;
  get maxDate() {
    return this._maxDate;
  }
  set maxDate(value) {
    this._maxDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  _maxDate = null;
  dateFilter;
  dateClass;
  selectedChange = new EventEmitter();
  yearSelected = new EventEmitter();
  activeDateChange = new EventEmitter();
  _matCalendarBody;
  _years = signal([], ...ngDevMode ? [{
    debugName: "_years"
  }] : []);
  _todayYear = signal(0, ...ngDevMode ? [{
    debugName: "_todayYear"
  }] : []);
  _selectedYear = signal(null, ...ngDevMode ? [{
    debugName: "_selectedYear"
  }] : []);
  constructor() {
    if (!this._dateAdapter && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw createMissingDateImplError("DateAdapter");
    }
    this._activeDate = this._dateAdapter.today();
  }
  ngAfterContentInit() {
    this._rerenderSubscription = this._dateAdapter.localeChanges.pipe(startWith(null)).subscribe(() => this._init());
  }
  ngOnDestroy() {
    this._rerenderSubscription.unsubscribe();
  }
  _init() {
    this._todayYear.set(this._dateAdapter.getYear(this._dateAdapter.today()));
    const activeYear = this._dateAdapter.getYear(this._activeDate);
    const minYearOfPage = activeYear - getActiveOffset(this._dateAdapter, this.activeDate, this.minDate, this.maxDate);
    const years = [];
    for (let i = 0, row = []; i < yearsPerPage; i++) {
      row.push(minYearOfPage + i);
      if (row.length == yearsPerRow) {
        years.push(row.map((year) => this._createCellForYear(year)));
        row = [];
      }
    }
    this._years.set(years);
    this._changeDetectorRef.markForCheck();
  }
  _yearSelected(event) {
    const year = event.value;
    const selectedYear = this._dateAdapter.createDate(year, 0, 1);
    const selectedDate = this._getDateFromYear(year);
    this.yearSelected.emit(selectedYear);
    this.selectedChange.emit(selectedDate);
  }
  _updateActiveDate(event) {
    const year = event.value;
    const oldActiveDate = this._activeDate;
    this.activeDate = this._getDateFromYear(year);
    if (this._dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
      this.activeDateChange.emit(this.activeDate);
    }
  }
  _handleCalendarBodyKeydown(event) {
    const oldActiveDate = this._activeDate;
    const isRtl = this._isRtl();
    switch (event.keyCode) {
      case LEFT_ARROW:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, isRtl ? 1 : -1);
        break;
      case RIGHT_ARROW:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, isRtl ? -1 : 1);
        break;
      case UP_ARROW:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -yearsPerRow);
        break;
      case DOWN_ARROW:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, yearsPerRow);
        break;
      case HOME:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -getActiveOffset(this._dateAdapter, this.activeDate, this.minDate, this.maxDate));
        break;
      case END:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, yearsPerPage - getActiveOffset(this._dateAdapter, this.activeDate, this.minDate, this.maxDate) - 1);
        break;
      case PAGE_UP:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -yearsPerPage * 10 : -yearsPerPage);
        break;
      case PAGE_DOWN:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? yearsPerPage * 10 : yearsPerPage);
        break;
      case ENTER:
      case SPACE:
        this._selectionKeyPressed = true;
        break;
      default:
        return;
    }
    if (this._dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
      this.activeDateChange.emit(this.activeDate);
    }
    this._focusActiveCellAfterViewChecked();
    event.preventDefault();
  }
  _handleCalendarBodyKeyup(event) {
    if (event.keyCode === SPACE || event.keyCode === ENTER) {
      if (this._selectionKeyPressed) {
        this._yearSelected({
          value: this._dateAdapter.getYear(this._activeDate),
          event
        });
      }
      this._selectionKeyPressed = false;
    }
  }
  _getActiveCell() {
    return getActiveOffset(this._dateAdapter, this.activeDate, this.minDate, this.maxDate);
  }
  _focusActiveCell() {
    this._matCalendarBody._focusActiveCell();
  }
  _focusActiveCellAfterViewChecked() {
    this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked();
  }
  _getDateFromYear(year) {
    const activeMonth = this._dateAdapter.getMonth(this.activeDate);
    const daysInMonth = this._dateAdapter.getNumDaysInMonth(this._dateAdapter.createDate(year, activeMonth, 1));
    const normalizedDate = this._dateAdapter.createDate(year, activeMonth, Math.min(this._dateAdapter.getDate(this.activeDate), daysInMonth));
    return normalizedDate;
  }
  _createCellForYear(year) {
    const date = this._dateAdapter.createDate(year, 0, 1);
    const yearName = this._dateAdapter.getYearName(date);
    const cellClasses = this.dateClass ? this.dateClass(date, "multi-year") : void 0;
    return new MatCalendarCell(year, yearName, yearName, this._shouldEnableYear(year), cellClasses);
  }
  _shouldEnableYear(year) {
    if (year === void 0 || year === null || this.maxDate && year > this._dateAdapter.getYear(this.maxDate) || this.minDate && year < this._dateAdapter.getYear(this.minDate)) {
      return false;
    }
    if (!this.dateFilter) {
      return true;
    }
    const firstOfYear = this._dateAdapter.createDate(year, 0, 1);
    for (let date = firstOfYear; this._dateAdapter.getYear(date) == year; date = this._dateAdapter.addCalendarDays(date, 1)) {
      if (this.dateFilter(date)) {
        return true;
      }
    }
    return false;
  }
  _isRtl() {
    return this._dir && this._dir.value === "rtl";
  }
  _setSelectedYear(value) {
    this._selectedYear.set(null);
    if (value instanceof DateRange) {
      const displayValue = value.start || value.end;
      if (displayValue) {
        this._selectedYear.set(this._dateAdapter.getYear(displayValue));
      }
    } else if (value) {
      this._selectedYear.set(this._dateAdapter.getYear(value));
    }
  }
  static \u0275fac = function MatMultiYearView_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatMultiYearView)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatMultiYearView,
    selectors: [["mat-multi-year-view"]],
    viewQuery: function MatMultiYearView_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(MatCalendarBody, 5);
      }
      if (rf & 2) {
        let _t = void 0;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._matCalendarBody = _t.first);
      }
    },
    inputs: {
      activeDate: "activeDate",
      selected: "selected",
      minDate: "minDate",
      maxDate: "maxDate",
      dateFilter: "dateFilter",
      dateClass: "dateClass"
    },
    outputs: {
      selectedChange: "selectedChange",
      yearSelected: "yearSelected",
      activeDateChange: "activeDateChange"
    },
    exportAs: ["matMultiYearView"],
    decls: 5,
    vars: 7,
    consts: [["role", "grid", 1, "mat-calendar-table"], ["aria-hidden", "true", 1, "mat-calendar-table-header"], ["colspan", "4", 1, "mat-calendar-table-header-divider"], ["mat-calendar-body", "", 3, "selectedValueChange", "activeDateChange", "keyup", "keydown", "rows", "todayValue", "startValue", "endValue", "numCols", "cellAspectRatio", "activeCell"]],
    template: function MatMultiYearView_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "table", 0)(1, "thead", 1)(2, "tr");
        \u0275\u0275element(3, "th", 2);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(4, "tbody", 3);
        \u0275\u0275listener("selectedValueChange", function MatMultiYearView_Template_tbody_selectedValueChange_4_listener($event) {
          return ctx._yearSelected($event);
        })("activeDateChange", function MatMultiYearView_Template_tbody_activeDateChange_4_listener($event) {
          return ctx._updateActiveDate($event);
        })("keyup", function MatMultiYearView_Template_tbody_keyup_4_listener($event) {
          return ctx._handleCalendarBodyKeyup($event);
        })("keydown", function MatMultiYearView_Template_tbody_keydown_4_listener($event) {
          return ctx._handleCalendarBodyKeydown($event);
        });
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("rows", ctx._years())("todayValue", ctx._todayYear())("startValue", ctx._selectedYear())("endValue", ctx._selectedYear())("numCols", 4)("cellAspectRatio", 4 / 7)("activeCell", ctx._getActiveCell());
      }
    },
    dependencies: [MatCalendarBody],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatMultiYearView, [{
    type: Component,
    args: [{
      selector: "mat-multi-year-view",
      exportAs: "matMultiYearView",
      encapsulation: ViewEncapsulation.None,
      imports: [MatCalendarBody],
      template: '<table class="mat-calendar-table" role="grid">\n  <thead aria-hidden="true" class="mat-calendar-table-header">\n    <tr><th class="mat-calendar-table-header-divider" colspan="4"></th></tr>\n  </thead>\n  <tbody mat-calendar-body\n         [rows]="_years()"\n         [todayValue]="_todayYear()"\n         [startValue]="_selectedYear()!"\n         [endValue]="_selectedYear()!"\n         [numCols]="4"\n         [cellAspectRatio]="4 / 7"\n         [activeCell]="_getActiveCell()"\n         (selectedValueChange)="_yearSelected($event)"\n         (activeDateChange)="_updateActiveDate($event)"\n         (keyup)="_handleCalendarBodyKeyup($event)"\n         (keydown)="_handleCalendarBodyKeydown($event)">\n  </tbody>\n</table>\n'
    }]
  }], () => [], {
    activeDate: [{
      type: Input
    }],
    selected: [{
      type: Input
    }],
    minDate: [{
      type: Input
    }],
    maxDate: [{
      type: Input
    }],
    dateFilter: [{
      type: Input
    }],
    dateClass: [{
      type: Input
    }],
    selectedChange: [{
      type: Output
    }],
    yearSelected: [{
      type: Output
    }],
    activeDateChange: [{
      type: Output
    }],
    _matCalendarBody: [{
      type: ViewChild,
      args: [MatCalendarBody]
    }]
  });
})();
function isSameMultiYearView(dateAdapter, date1, date2, minDate, maxDate) {
  const year1 = dateAdapter.getYear(date1);
  const year2 = dateAdapter.getYear(date2);
  const startingYear = getStartingYear(dateAdapter, minDate, maxDate);
  return Math.floor((year1 - startingYear) / yearsPerPage) === Math.floor((year2 - startingYear) / yearsPerPage);
}
function getActiveOffset(dateAdapter, activeDate, minDate, maxDate) {
  const activeYear = dateAdapter.getYear(activeDate);
  return euclideanModulo(activeYear - getStartingYear(dateAdapter, minDate, maxDate), yearsPerPage);
}
function getStartingYear(dateAdapter, minDate, maxDate) {
  let startingYear = 0;
  if (maxDate) {
    const maxYear = dateAdapter.getYear(maxDate);
    startingYear = maxYear - yearsPerPage + 1;
  } else if (minDate) {
    startingYear = dateAdapter.getYear(minDate);
  }
  return startingYear;
}
function euclideanModulo(a, b) {
  return (a % b + b) % b;
}
var MatYearView = class _MatYearView {
  _changeDetectorRef = inject(ChangeDetectorRef);
  _dateFormats = inject(MAT_DATE_FORMATS, {
    optional: true
  });
  _dateAdapter = inject(DateAdapter, {
    optional: true
  });
  _dir = inject(Directionality, {
    optional: true
  });
  _rerenderSubscription = Subscription.EMPTY;
  _selectionKeyPressed = false;
  get activeDate() {
    return this._activeDate;
  }
  set activeDate(value) {
    let oldActiveDate = this._activeDate;
    const validDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
    this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
    if (this._dateAdapter.getYear(oldActiveDate) !== this._dateAdapter.getYear(this._activeDate)) {
      this._init();
    }
  }
  _activeDate;
  get selected() {
    return this._selected;
  }
  set selected(value) {
    if (value instanceof DateRange) {
      this._selected = value;
    } else {
      this._selected = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    this._setSelectedMonth(value);
  }
  _selected = null;
  get minDate() {
    return this._minDate;
  }
  set minDate(value) {
    this._minDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  _minDate = null;
  get maxDate() {
    return this._maxDate;
  }
  set maxDate(value) {
    this._maxDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  _maxDate = null;
  dateFilter;
  dateClass;
  selectedChange = new EventEmitter();
  monthSelected = new EventEmitter();
  activeDateChange = new EventEmitter();
  _matCalendarBody;
  _months = signal([], ...ngDevMode ? [{
    debugName: "_months"
  }] : []);
  _yearLabel = signal("", ...ngDevMode ? [{
    debugName: "_yearLabel"
  }] : []);
  _todayMonth = signal(null, ...ngDevMode ? [{
    debugName: "_todayMonth"
  }] : []);
  _selectedMonth = signal(null, ...ngDevMode ? [{
    debugName: "_selectedMonth"
  }] : []);
  constructor() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this._dateAdapter) {
        throw createMissingDateImplError("DateAdapter");
      }
      if (!this._dateFormats) {
        throw createMissingDateImplError("MAT_DATE_FORMATS");
      }
    }
    this._activeDate = this._dateAdapter.today();
  }
  ngAfterContentInit() {
    this._rerenderSubscription = this._dateAdapter.localeChanges.pipe(startWith(null)).subscribe(() => this._init());
  }
  ngOnDestroy() {
    this._rerenderSubscription.unsubscribe();
  }
  _monthSelected(event) {
    const month = event.value;
    const selectedMonth = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1);
    this.monthSelected.emit(selectedMonth);
    const selectedDate = this._getDateFromMonth(month);
    this.selectedChange.emit(selectedDate);
  }
  _updateActiveDate(event) {
    const month = event.value;
    const oldActiveDate = this._activeDate;
    this.activeDate = this._getDateFromMonth(month);
    if (this._dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
      this.activeDateChange.emit(this.activeDate);
    }
  }
  _handleCalendarBodyKeydown(event) {
    const oldActiveDate = this._activeDate;
    const isRtl = this._isRtl();
    switch (event.keyCode) {
      case LEFT_ARROW:
        this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, isRtl ? 1 : -1);
        break;
      case RIGHT_ARROW:
        this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, isRtl ? -1 : 1);
        break;
      case UP_ARROW:
        this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, -4);
        break;
      case DOWN_ARROW:
        this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, 4);
        break;
      case HOME:
        this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, -this._dateAdapter.getMonth(this._activeDate));
        break;
      case END:
        this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, 11 - this._dateAdapter.getMonth(this._activeDate));
        break;
      case PAGE_UP:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -10 : -1);
        break;
      case PAGE_DOWN:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? 10 : 1);
        break;
      case ENTER:
      case SPACE:
        this._selectionKeyPressed = true;
        break;
      default:
        return;
    }
    if (this._dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
      this.activeDateChange.emit(this.activeDate);
      this._focusActiveCellAfterViewChecked();
    }
    event.preventDefault();
  }
  _handleCalendarBodyKeyup(event) {
    if (event.keyCode === SPACE || event.keyCode === ENTER) {
      if (this._selectionKeyPressed) {
        this._monthSelected({
          value: this._dateAdapter.getMonth(this._activeDate),
          event
        });
      }
      this._selectionKeyPressed = false;
    }
  }
  _init() {
    this._setSelectedMonth(this.selected);
    this._todayMonth.set(this._getMonthInCurrentYear(this._dateAdapter.today()));
    this._yearLabel.set(this._dateAdapter.getYearName(this.activeDate));
    let monthNames = this._dateAdapter.getMonthNames("short");
    this._months.set([[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]].map((row) => row.map((month) => this._createCellForMonth(month, monthNames[month]))));
    this._changeDetectorRef.markForCheck();
  }
  _focusActiveCell() {
    this._matCalendarBody._focusActiveCell();
  }
  _focusActiveCellAfterViewChecked() {
    this._matCalendarBody._scheduleFocusActiveCellAfterViewChecked();
  }
  _getMonthInCurrentYear(date) {
    return date && this._dateAdapter.getYear(date) == this._dateAdapter.getYear(this.activeDate) ? this._dateAdapter.getMonth(date) : null;
  }
  _getDateFromMonth(month) {
    const normalizedDate = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1);
    const daysInMonth = this._dateAdapter.getNumDaysInMonth(normalizedDate);
    return this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, Math.min(this._dateAdapter.getDate(this.activeDate), daysInMonth));
  }
  _createCellForMonth(month, monthName) {
    const date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1);
    const ariaLabel = this._dateAdapter.format(date, this._dateFormats.display.monthYearA11yLabel);
    const cellClasses = this.dateClass ? this.dateClass(date, "year") : void 0;
    return new MatCalendarCell(month, monthName.toLocaleUpperCase(), ariaLabel, this._shouldEnableMonth(month), cellClasses);
  }
  _shouldEnableMonth(month) {
    const activeYear = this._dateAdapter.getYear(this.activeDate);
    if (month === void 0 || month === null || this._isYearAndMonthAfterMaxDate(activeYear, month) || this._isYearAndMonthBeforeMinDate(activeYear, month)) {
      return false;
    }
    if (!this.dateFilter) {
      return true;
    }
    const firstOfMonth = this._dateAdapter.createDate(activeYear, month, 1);
    for (let date = firstOfMonth; this._dateAdapter.getMonth(date) == month; date = this._dateAdapter.addCalendarDays(date, 1)) {
      if (this.dateFilter(date)) {
        return true;
      }
    }
    return false;
  }
  _isYearAndMonthAfterMaxDate(year, month) {
    if (this.maxDate) {
      const maxYear = this._dateAdapter.getYear(this.maxDate);
      const maxMonth = this._dateAdapter.getMonth(this.maxDate);
      return year > maxYear || year === maxYear && month > maxMonth;
    }
    return false;
  }
  _isYearAndMonthBeforeMinDate(year, month) {
    if (this.minDate) {
      const minYear = this._dateAdapter.getYear(this.minDate);
      const minMonth = this._dateAdapter.getMonth(this.minDate);
      return year < minYear || year === minYear && month < minMonth;
    }
    return false;
  }
  _isRtl() {
    return this._dir && this._dir.value === "rtl";
  }
  _setSelectedMonth(value) {
    if (value instanceof DateRange) {
      this._selectedMonth.set(this._getMonthInCurrentYear(value.start) || this._getMonthInCurrentYear(value.end));
    } else {
      this._selectedMonth.set(this._getMonthInCurrentYear(value));
    }
  }
  static \u0275fac = function MatYearView_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatYearView)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatYearView,
    selectors: [["mat-year-view"]],
    viewQuery: function MatYearView_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(MatCalendarBody, 5);
      }
      if (rf & 2) {
        let _t = void 0;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._matCalendarBody = _t.first);
      }
    },
    inputs: {
      activeDate: "activeDate",
      selected: "selected",
      minDate: "minDate",
      maxDate: "maxDate",
      dateFilter: "dateFilter",
      dateClass: "dateClass"
    },
    outputs: {
      selectedChange: "selectedChange",
      monthSelected: "monthSelected",
      activeDateChange: "activeDateChange"
    },
    exportAs: ["matYearView"],
    decls: 5,
    vars: 9,
    consts: [["role", "grid", 1, "mat-calendar-table"], ["aria-hidden", "true", 1, "mat-calendar-table-header"], ["colspan", "4", 1, "mat-calendar-table-header-divider"], ["mat-calendar-body", "", 3, "selectedValueChange", "activeDateChange", "keyup", "keydown", "label", "rows", "todayValue", "startValue", "endValue", "labelMinRequiredCells", "numCols", "cellAspectRatio", "activeCell"]],
    template: function MatYearView_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "table", 0)(1, "thead", 1)(2, "tr");
        \u0275\u0275element(3, "th", 2);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(4, "tbody", 3);
        \u0275\u0275listener("selectedValueChange", function MatYearView_Template_tbody_selectedValueChange_4_listener($event) {
          return ctx._monthSelected($event);
        })("activeDateChange", function MatYearView_Template_tbody_activeDateChange_4_listener($event) {
          return ctx._updateActiveDate($event);
        })("keyup", function MatYearView_Template_tbody_keyup_4_listener($event) {
          return ctx._handleCalendarBodyKeyup($event);
        })("keydown", function MatYearView_Template_tbody_keydown_4_listener($event) {
          return ctx._handleCalendarBodyKeydown($event);
        });
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275property("label", ctx._yearLabel())("rows", ctx._months())("todayValue", ctx._todayMonth())("startValue", ctx._selectedMonth())("endValue", ctx._selectedMonth())("labelMinRequiredCells", 2)("numCols", 4)("cellAspectRatio", 4 / 7)("activeCell", ctx._dateAdapter.getMonth(ctx.activeDate));
      }
    },
    dependencies: [MatCalendarBody],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatYearView, [{
    type: Component,
    args: [{
      selector: "mat-year-view",
      exportAs: "matYearView",
      encapsulation: ViewEncapsulation.None,
      imports: [MatCalendarBody],
      template: '<table class="mat-calendar-table" role="grid">\n  <thead aria-hidden="true" class="mat-calendar-table-header">\n    <tr><th class="mat-calendar-table-header-divider" colspan="4"></th></tr>\n  </thead>\n  <tbody mat-calendar-body\n         [label]="_yearLabel()"\n         [rows]="_months()"\n         [todayValue]="_todayMonth()!"\n         [startValue]="_selectedMonth()!"\n         [endValue]="_selectedMonth()!"\n         [labelMinRequiredCells]="2"\n         [numCols]="4"\n         [cellAspectRatio]="4 / 7"\n         [activeCell]="_dateAdapter.getMonth(activeDate)"\n         (selectedValueChange)="_monthSelected($event)"\n         (activeDateChange)="_updateActiveDate($event)"\n         (keyup)="_handleCalendarBodyKeyup($event)"\n         (keydown)="_handleCalendarBodyKeydown($event)">\n  </tbody>\n</table>\n'
    }]
  }], () => [], {
    activeDate: [{
      type: Input
    }],
    selected: [{
      type: Input
    }],
    minDate: [{
      type: Input
    }],
    maxDate: [{
      type: Input
    }],
    dateFilter: [{
      type: Input
    }],
    dateClass: [{
      type: Input
    }],
    selectedChange: [{
      type: Output
    }],
    monthSelected: [{
      type: Output
    }],
    activeDateChange: [{
      type: Output
    }],
    _matCalendarBody: [{
      type: ViewChild,
      args: [MatCalendarBody]
    }]
  });
})();
var MatCalendarHeader = class _MatCalendarHeader {
  _intl = inject(MatDatepickerIntl);
  calendar = inject(MatCalendar);
  _dateAdapter = inject(DateAdapter, {
    optional: true
  });
  _dateFormats = inject(MAT_DATE_FORMATS, {
    optional: true
  });
  _periodButtonText;
  _periodButtonDescription;
  _periodButtonLabel;
  _prevButtonLabel;
  _nextButtonLabel;
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_VisuallyHiddenLoader);
    const changeDetectorRef = inject(ChangeDetectorRef);
    this._updateLabels();
    this.calendar.stateChanges.subscribe(() => {
      this._updateLabels();
      changeDetectorRef.markForCheck();
    });
  }
  get periodButtonText() {
    return this._periodButtonText;
  }
  get periodButtonDescription() {
    return this._periodButtonDescription;
  }
  get periodButtonLabel() {
    return this._periodButtonLabel;
  }
  get prevButtonLabel() {
    return this._prevButtonLabel;
  }
  get nextButtonLabel() {
    return this._nextButtonLabel;
  }
  currentPeriodClicked() {
    this.calendar.currentView = this.calendar.currentView == "month" ? "multi-year" : "month";
  }
  previousClicked() {
    if (this.previousEnabled()) {
      this.calendar.activeDate = this.calendar.currentView == "month" ? this._dateAdapter.addCalendarMonths(this.calendar.activeDate, -1) : this._dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView == "year" ? -1 : -yearsPerPage);
    }
  }
  nextClicked() {
    if (this.nextEnabled()) {
      this.calendar.activeDate = this.calendar.currentView == "month" ? this._dateAdapter.addCalendarMonths(this.calendar.activeDate, 1) : this._dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView == "year" ? 1 : yearsPerPage);
    }
  }
  previousEnabled() {
    if (!this.calendar.minDate) {
      return true;
    }
    return !this.calendar.minDate || !this._isSameView(this.calendar.activeDate, this.calendar.minDate);
  }
  nextEnabled() {
    return !this.calendar.maxDate || !this._isSameView(this.calendar.activeDate, this.calendar.maxDate);
  }
  _updateLabels() {
    const calendar = this.calendar;
    const intl = this._intl;
    const adapter = this._dateAdapter;
    if (calendar.currentView === "month") {
      this._periodButtonText = adapter.format(calendar.activeDate, this._dateFormats.display.monthYearLabel).toLocaleUpperCase();
      this._periodButtonDescription = adapter.format(calendar.activeDate, this._dateFormats.display.monthYearLabel).toLocaleUpperCase();
      this._periodButtonLabel = intl.switchToMultiYearViewLabel;
      this._prevButtonLabel = intl.prevMonthLabel;
      this._nextButtonLabel = intl.nextMonthLabel;
    } else if (calendar.currentView === "year") {
      this._periodButtonText = adapter.getYearName(calendar.activeDate);
      this._periodButtonDescription = adapter.getYearName(calendar.activeDate);
      this._periodButtonLabel = intl.switchToMonthViewLabel;
      this._prevButtonLabel = intl.prevYearLabel;
      this._nextButtonLabel = intl.nextYearLabel;
    } else {
      this._periodButtonText = intl.formatYearRange(...this._formatMinAndMaxYearLabels());
      this._periodButtonDescription = intl.formatYearRangeLabel(...this._formatMinAndMaxYearLabels());
      this._periodButtonLabel = intl.switchToMonthViewLabel;
      this._prevButtonLabel = intl.prevMultiYearLabel;
      this._nextButtonLabel = intl.nextMultiYearLabel;
    }
  }
  _isSameView(date1, date2) {
    if (this.calendar.currentView == "month") {
      return this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2) && this._dateAdapter.getMonth(date1) == this._dateAdapter.getMonth(date2);
    }
    if (this.calendar.currentView == "year") {
      return this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2);
    }
    return isSameMultiYearView(this._dateAdapter, date1, date2, this.calendar.minDate, this.calendar.maxDate);
  }
  _formatMinAndMaxYearLabels() {
    const activeYear = this._dateAdapter.getYear(this.calendar.activeDate);
    const minYearOfPage = activeYear - getActiveOffset(this._dateAdapter, this.calendar.activeDate, this.calendar.minDate, this.calendar.maxDate);
    const maxYearOfPage = minYearOfPage + yearsPerPage - 1;
    const minYearLabel = this._dateAdapter.getYearName(this._dateAdapter.createDate(minYearOfPage, 0, 1));
    const maxYearLabel = this._dateAdapter.getYearName(this._dateAdapter.createDate(maxYearOfPage, 0, 1));
    return [minYearLabel, maxYearLabel];
  }
  _periodButtonLabelId = inject(_IdGenerator).getId("mat-calendar-period-label-");
  static \u0275fac = function MatCalendarHeader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCalendarHeader)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    const _c0 = ["*"];
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatCalendarHeader,
      selectors: [["mat-calendar-header"]],
      exportAs: ["matCalendarHeader"],
      ngContentSelectors: _c0,
      decls: 17,
      vars: 13,
      consts: [[1, "mat-calendar-header"], [1, "mat-calendar-controls"], ["aria-live", "polite", 1, "cdk-visually-hidden", 3, "id"], ["matButton", "", "type", "button", 1, "mat-calendar-period-button", 3, "click"], ["aria-hidden", "true"], ["viewBox", "0 0 10 5", "focusable", "false", "aria-hidden", "true", 1, "mat-calendar-arrow"], ["points", "0,0 5,5 10,0"], [1, "mat-calendar-spacer"], ["matIconButton", "", "type", "button", "disabledInteractive", "", 1, "mat-calendar-previous-button", 3, "click", "disabled", "matTooltip"], ["viewBox", "0 0 24 24", "focusable", "false", "aria-hidden", "true"], ["d", "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"], ["matIconButton", "", "type", "button", "disabledInteractive", "", 1, "mat-calendar-next-button", 3, "click", "disabled", "matTooltip"], ["d", "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"]],
      template: function MatCalendarHeader_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "span", 2);
          \u0275\u0275text(3);
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(4, "button", 3);
          \u0275\u0275listener("click", function MatCalendarHeader_Template_button_click_4_listener() {
            return ctx.currentPeriodClicked();
          });
          \u0275\u0275elementStart(5, "span", 4);
          \u0275\u0275text(6);
          \u0275\u0275elementEnd();
          \u0275\u0275namespaceSVG();
          \u0275\u0275elementStart(7, "svg", 5);
          \u0275\u0275element(8, "polygon", 6);
          \u0275\u0275elementEnd()();
          \u0275\u0275namespaceHTML();
          \u0275\u0275element(9, "div", 7);
          \u0275\u0275projection(10);
          \u0275\u0275elementStart(11, "button", 8);
          \u0275\u0275listener("click", function MatCalendarHeader_Template_button_click_11_listener() {
            return ctx.previousClicked();
          });
          \u0275\u0275namespaceSVG();
          \u0275\u0275elementStart(12, "svg", 9);
          \u0275\u0275element(13, "path", 10);
          \u0275\u0275elementEnd()();
          \u0275\u0275namespaceHTML();
          \u0275\u0275elementStart(14, "button", 11);
          \u0275\u0275listener("click", function MatCalendarHeader_Template_button_click_14_listener() {
            return ctx.nextClicked();
          });
          \u0275\u0275namespaceSVG();
          \u0275\u0275elementStart(15, "svg", 9);
          \u0275\u0275element(16, "path", 12);
          \u0275\u0275elementEnd()()()();
        }
        if (rf & 2) {
          \u0275\u0275advance(2);
          \u0275\u0275property("id", ctx._periodButtonLabelId);
          \u0275\u0275advance();
          \u0275\u0275textInterpolate(ctx.periodButtonDescription);
          \u0275\u0275advance();
          \u0275\u0275attribute("aria-label", ctx.periodButtonLabel)("aria-describedby", ctx._periodButtonLabelId);
          \u0275\u0275advance(2);
          \u0275\u0275textInterpolate(ctx.periodButtonText);
          \u0275\u0275advance();
          \u0275\u0275classProp("mat-calendar-invert", ctx.calendar.currentView !== "month");
          \u0275\u0275advance(4);
          \u0275\u0275property("disabled", !ctx.previousEnabled())("matTooltip", ctx.prevButtonLabel);
          \u0275\u0275attribute("aria-label", ctx.prevButtonLabel);
          \u0275\u0275advance(3);
          \u0275\u0275property("disabled", !ctx.nextEnabled())("matTooltip", ctx.nextButtonLabel);
          \u0275\u0275attribute("aria-label", ctx.nextButtonLabel);
        }
      },
      dependencies: [MatButton, MatIconButton, MatTooltip],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCalendarHeader, [{
    type: Component,
    args: [{
      selector: "mat-calendar-header",
      exportAs: "matCalendarHeader",
      encapsulation: ViewEncapsulation.None,
      imports: [MatButton, MatIconButton, MatTooltip],
      template: `<div class="mat-calendar-header">
  <div class="mat-calendar-controls">
    <!-- [Firefox Issue: https://bugzilla.mozilla.org/show_bug.cgi?id=1880533]
      Relocated label next to related button and made visually hidden via cdk-visually-hidden
      to enable label to appear in a11y tree for SR when using Firefox -->
    <span [id]="_periodButtonLabelId" class="cdk-visually-hidden" aria-live="polite">{{periodButtonDescription}}</span>
    <button matButton type="button" class="mat-calendar-period-button"
            (click)="currentPeriodClicked()" [attr.aria-label]="periodButtonLabel"
            [attr.aria-describedby]="_periodButtonLabelId">
      <span aria-hidden="true">{{periodButtonText}}</span>
      <svg class="mat-calendar-arrow" [class.mat-calendar-invert]="calendar.currentView !== 'month'"
           viewBox="0 0 10 5" focusable="false" aria-hidden="true">
           <polygon points="0,0 5,5 10,0"/>
      </svg>
    </button>

    <div class="mat-calendar-spacer"></div>

    <ng-content></ng-content>

    <button matIconButton type="button" class="mat-calendar-previous-button"
            [disabled]="!previousEnabled()" (click)="previousClicked()"
            [matTooltip]="prevButtonLabel" [attr.aria-label]="prevButtonLabel" disabledInteractive>
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
       </svg>
    </button>

    <button matIconButton type="button" class="mat-calendar-next-button"
            [disabled]="!nextEnabled()" (click)="nextClicked()"
            [matTooltip]="nextButtonLabel" [attr.aria-label]="nextButtonLabel" disabledInteractive>
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
      </svg>
    </button>
  </div>
</div>
`
    }]
  }], () => [], null);
})();
var MatCalendar = class _MatCalendar {
  _dateAdapter = inject(DateAdapter, {
    optional: true
  });
  _dateFormats = inject(MAT_DATE_FORMATS, {
    optional: true
  });
  _changeDetectorRef = inject(ChangeDetectorRef);
  _elementRef = inject(ElementRef);
  headerComponent;
  _calendarHeaderPortal;
  _intlChanges;
  _moveFocusOnNextTick = false;
  get startAt() {
    return this._startAt;
  }
  set startAt(value) {
    this._startAt = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  _startAt = null;
  startView = "month";
  get selected() {
    return this._selected;
  }
  set selected(value) {
    if (value instanceof DateRange) {
      this._selected = value;
    } else {
      this._selected = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
  }
  _selected = null;
  get minDate() {
    return this._minDate;
  }
  set minDate(value) {
    this._minDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  _minDate = null;
  get maxDate() {
    return this._maxDate;
  }
  set maxDate(value) {
    this._maxDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  _maxDate = null;
  dateFilter;
  dateClass;
  comparisonStart = null;
  comparisonEnd = null;
  startDateAccessibleName = null;
  endDateAccessibleName = null;
  selectedChange = new EventEmitter();
  yearSelected = new EventEmitter();
  monthSelected = new EventEmitter();
  viewChanged = new EventEmitter(true);
  _userSelection = new EventEmitter();
  _userDragDrop = new EventEmitter();
  monthView;
  yearView;
  multiYearView;
  get activeDate() {
    return this._clampedActiveDate;
  }
  set activeDate(value) {
    this._clampedActiveDate = this._dateAdapter.clampDate(value, this.minDate, this.maxDate);
    this.stateChanges.next();
    this._changeDetectorRef.markForCheck();
  }
  _clampedActiveDate;
  get currentView() {
    return this._currentView;
  }
  set currentView(value) {
    const viewChangedResult = this._currentView !== value ? value : null;
    this._currentView = value;
    this._moveFocusOnNextTick = true;
    this._changeDetectorRef.markForCheck();
    if (viewChangedResult) {
      this.stateChanges.next();
      this.viewChanged.emit(viewChangedResult);
    }
  }
  _currentView;
  _activeDrag = null;
  stateChanges = new Subject();
  constructor() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this._dateAdapter) {
        throw createMissingDateImplError("DateAdapter");
      }
      if (!this._dateFormats) {
        throw createMissingDateImplError("MAT_DATE_FORMATS");
      }
    }
    this._intlChanges = inject(MatDatepickerIntl).changes.subscribe(() => {
      this._changeDetectorRef.markForCheck();
      this.stateChanges.next();
    });
  }
  ngAfterContentInit() {
    this._calendarHeaderPortal = new ComponentPortal(this.headerComponent || MatCalendarHeader);
    this.activeDate = this.startAt || this._dateAdapter.today();
    this._currentView = this.startView;
  }
  ngAfterViewChecked() {
    if (this._moveFocusOnNextTick) {
      this._moveFocusOnNextTick = false;
      this.focusActiveCell();
    }
  }
  ngOnDestroy() {
    this._intlChanges.unsubscribe();
    this.stateChanges.complete();
  }
  ngOnChanges(changes) {
    const minDateChange = changes["minDate"] && !this._dateAdapter.sameDate(changes["minDate"].previousValue, changes["minDate"].currentValue) ? changes["minDate"] : void 0;
    const maxDateChange = changes["maxDate"] && !this._dateAdapter.sameDate(changes["maxDate"].previousValue, changes["maxDate"].currentValue) ? changes["maxDate"] : void 0;
    const changeRequiringRerender = minDateChange || maxDateChange || changes["dateFilter"];
    if (changeRequiringRerender && !changeRequiringRerender.firstChange) {
      const view = this._getCurrentViewComponent();
      if (view) {
        if (this._elementRef.nativeElement.contains(_getFocusedElementPierceShadowDom())) {
          this._moveFocusOnNextTick = true;
        }
        this._changeDetectorRef.detectChanges();
        view._init();
      }
    }
    this.stateChanges.next();
  }
  focusActiveCell() {
    this._getCurrentViewComponent()?._focusActiveCell(false);
  }
  updateTodaysDate() {
    this._getCurrentViewComponent()?._init();
  }
  _dateSelected(event) {
    const date = event.value;
    if (this.selected instanceof DateRange || date && !this._dateAdapter.sameDate(date, this.selected)) {
      this.selectedChange.emit(date);
    }
    this._userSelection.emit(event);
  }
  _yearSelectedInMultiYearView(normalizedYear) {
    this.yearSelected.emit(normalizedYear);
  }
  _monthSelectedInYearView(normalizedMonth) {
    this.monthSelected.emit(normalizedMonth);
  }
  _goToDateInView(date, view) {
    this.activeDate = date;
    this.currentView = view;
  }
  _dragStarted(event) {
    this._activeDrag = event;
  }
  _dragEnded(event) {
    if (!this._activeDrag) return;
    if (event.value) {
      this._userDragDrop.emit(event);
    }
    this._activeDrag = null;
  }
  _getCurrentViewComponent() {
    return this.monthView || this.yearView || this.multiYearView;
  }
  static \u0275fac = function MatCalendar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatCalendar)();
  };
  static \u0275cmp = (function() {
    function MatCalendar_ng_template_0_Template(rf, ctx) {
    }
    function MatCalendar_Case_2_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "mat-month-view", 4);
        \u0275\u0275twoWayListener("activeDateChange", function MatCalendar_Case_2_Template_mat_month_view_activeDateChange_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          const ctx_r1 = \u0275\u0275nextContext();
          \u0275\u0275twoWayBindingSet(ctx_r1.activeDate, $event) || (ctx_r1.activeDate = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("_userSelection", function MatCalendar_Case_2_Template_mat_month_view__userSelection_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1._dateSelected($event));
        })("dragStarted", function MatCalendar_Case_2_Template_mat_month_view_dragStarted_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1._dragStarted($event));
        })("dragEnded", function MatCalendar_Case_2_Template_mat_month_view_dragEnded_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1._dragEnded($event));
        });
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275twoWayProperty("activeDate", ctx_r1.activeDate);
        \u0275\u0275property("selected", ctx_r1.selected)("dateFilter", ctx_r1.dateFilter)("maxDate", ctx_r1.maxDate)("minDate", ctx_r1.minDate)("dateClass", ctx_r1.dateClass)("comparisonStart", ctx_r1.comparisonStart)("comparisonEnd", ctx_r1.comparisonEnd)("startDateAccessibleName", ctx_r1.startDateAccessibleName)("endDateAccessibleName", ctx_r1.endDateAccessibleName)("activeDrag", ctx_r1._activeDrag);
      }
    }
    function MatCalendar_Case_3_Template(rf, ctx) {
      if (rf & 1) {
        const _r3 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "mat-year-view", 5);
        \u0275\u0275twoWayListener("activeDateChange", function MatCalendar_Case_3_Template_mat_year_view_activeDateChange_0_listener($event) {
          \u0275\u0275restoreView(_r3);
          const ctx_r1 = \u0275\u0275nextContext();
          \u0275\u0275twoWayBindingSet(ctx_r1.activeDate, $event) || (ctx_r1.activeDate = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("monthSelected", function MatCalendar_Case_3_Template_mat_year_view_monthSelected_0_listener($event) {
          \u0275\u0275restoreView(_r3);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1._monthSelectedInYearView($event));
        })("selectedChange", function MatCalendar_Case_3_Template_mat_year_view_selectedChange_0_listener($event) {
          \u0275\u0275restoreView(_r3);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1._goToDateInView($event, "month"));
        });
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275twoWayProperty("activeDate", ctx_r1.activeDate);
        \u0275\u0275property("selected", ctx_r1.selected)("dateFilter", ctx_r1.dateFilter)("maxDate", ctx_r1.maxDate)("minDate", ctx_r1.minDate)("dateClass", ctx_r1.dateClass);
      }
    }
    function MatCalendar_Case_4_Template(rf, ctx) {
      if (rf & 1) {
        const _r4 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "mat-multi-year-view", 6);
        \u0275\u0275twoWayListener("activeDateChange", function MatCalendar_Case_4_Template_mat_multi_year_view_activeDateChange_0_listener($event) {
          \u0275\u0275restoreView(_r4);
          const ctx_r1 = \u0275\u0275nextContext();
          \u0275\u0275twoWayBindingSet(ctx_r1.activeDate, $event) || (ctx_r1.activeDate = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("yearSelected", function MatCalendar_Case_4_Template_mat_multi_year_view_yearSelected_0_listener($event) {
          \u0275\u0275restoreView(_r4);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1._yearSelectedInMultiYearView($event));
        })("selectedChange", function MatCalendar_Case_4_Template_mat_multi_year_view_selectedChange_0_listener($event) {
          \u0275\u0275restoreView(_r4);
          const ctx_r1 = \u0275\u0275nextContext();
          return \u0275\u0275resetView(ctx_r1._goToDateInView($event, "year"));
        });
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const ctx_r1 = \u0275\u0275nextContext();
        \u0275\u0275twoWayProperty("activeDate", ctx_r1.activeDate);
        \u0275\u0275property("selected", ctx_r1.selected)("dateFilter", ctx_r1.dateFilter)("maxDate", ctx_r1.maxDate)("minDate", ctx_r1.minDate)("dateClass", ctx_r1.dateClass);
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatCalendar,
      selectors: [["mat-calendar"]],
      viewQuery: function MatCalendar_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(MatMonthView, 5)(MatYearView, 5)(MatMultiYearView, 5);
        }
        if (rf & 2) {
          let _t = void 0;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.monthView = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.yearView = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.multiYearView = _t.first);
        }
      },
      hostAttrs: [1, "mat-calendar"],
      inputs: {
        headerComponent: "headerComponent",
        startAt: "startAt",
        startView: "startView",
        selected: "selected",
        minDate: "minDate",
        maxDate: "maxDate",
        dateFilter: "dateFilter",
        dateClass: "dateClass",
        comparisonStart: "comparisonStart",
        comparisonEnd: "comparisonEnd",
        startDateAccessibleName: "startDateAccessibleName",
        endDateAccessibleName: "endDateAccessibleName"
      },
      outputs: {
        selectedChange: "selectedChange",
        yearSelected: "yearSelected",
        monthSelected: "monthSelected",
        viewChanged: "viewChanged",
        _userSelection: "_userSelection",
        _userDragDrop: "_userDragDrop"
      },
      exportAs: ["matCalendar"],
      features: [\u0275\u0275ProvidersFeature([MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER]), \u0275\u0275NgOnChangesFeature],
      decls: 5,
      vars: 2,
      consts: [[3, "cdkPortalOutlet"], ["cdkMonitorSubtreeFocus", "", "tabindex", "-1", 1, "mat-calendar-content"], [3, "activeDate", "selected", "dateFilter", "maxDate", "minDate", "dateClass", "comparisonStart", "comparisonEnd", "startDateAccessibleName", "endDateAccessibleName", "activeDrag"], [3, "activeDate", "selected", "dateFilter", "maxDate", "minDate", "dateClass"], [3, "activeDateChange", "_userSelection", "dragStarted", "dragEnded", "activeDate", "selected", "dateFilter", "maxDate", "minDate", "dateClass", "comparisonStart", "comparisonEnd", "startDateAccessibleName", "endDateAccessibleName", "activeDrag"], [3, "activeDateChange", "monthSelected", "selectedChange", "activeDate", "selected", "dateFilter", "maxDate", "minDate", "dateClass"], [3, "activeDateChange", "yearSelected", "selectedChange", "activeDate", "selected", "dateFilter", "maxDate", "minDate", "dateClass"]],
      template: function MatCalendar_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275template(0, MatCalendar_ng_template_0_Template, 0, 0, "ng-template", 0);
          \u0275\u0275elementStart(1, "div", 1);
          \u0275\u0275conditionalCreate(2, MatCalendar_Case_2_Template, 1, 11, "mat-month-view", 2)(3, MatCalendar_Case_3_Template, 1, 6, "mat-year-view", 3)(4, MatCalendar_Case_4_Template, 1, 6, "mat-multi-year-view", 3);
          \u0275\u0275elementEnd();
        }
        if (rf & 2) {
          let tmp_1_0 = void 0;
          \u0275\u0275property("cdkPortalOutlet", ctx._calendarHeaderPortal);
          \u0275\u0275advance(2);
          \u0275\u0275conditional((tmp_1_0 = ctx.currentView) === "month" ? 2 : tmp_1_0 === "year" ? 3 : tmp_1_0 === "multi-year" ? 4 : -1);
        }
      },
      dependencies: [CdkPortalOutlet, CdkMonitorFocus, MatMonthView, MatYearView, MatMultiYearView],
      styles: ['.mat-calendar {\n  display: block;\n  line-height: normal;\n  font-family: var(--%NS%mat-datepicker-calendar-text-font, var(--%NS%mat-sys-body-medium-font));\n  font-size: var(--%NS%mat-datepicker-calendar-text-size, var(--%NS%mat-sys-body-medium-size));\n}\n\n.mat-calendar-header {\n  padding: 8px 8px 0 8px;\n}\n\n.mat-calendar-content {\n  padding: 0 8px 8px 8px;\n  outline: none;\n}\n\n.mat-calendar-controls {\n  display: flex;\n  align-items: center;\n  margin: 5% calc(4.7142857143% - 16px);\n}\n\n.mat-calendar-spacer {\n  flex: 1 1 auto;\n}\n\n.mat-calendar-period-button {\n  min-width: 0;\n  margin: 0 8px;\n  font-size: var(--%NS%mat-datepicker-calendar-period-button-text-size, var(--%NS%mat-sys-title-small-size));\n  font-weight: var(--%NS%mat-datepicker-calendar-period-button-text-weight, var(--%NS%mat-sys-title-small-weight));\n  --%NS%mat-button-text-label-text-color: var(--%NS%mat-datepicker-calendar-period-button-text-color, var(--%NS%mat-sys-on-surface-variant));\n}\n\n.mat-calendar-arrow {\n  display: inline-block;\n  width: 10px;\n  height: 5px;\n  margin: 0 0 0 5px;\n  vertical-align: middle;\n  fill: var(--%NS%mat-datepicker-calendar-period-button-icon-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mat-calendar-arrow.mat-calendar-invert {\n  transform: rotate(180deg);\n}\n[dir=rtl] .mat-calendar-arrow {\n  margin: 0 5px 0 0;\n}\n@media (forced-colors: active) {\n  .mat-calendar-arrow {\n    fill: CanvasText;\n  }\n}\n\n.mat-datepicker-content .mat-calendar-previous-button:not(.mat-mdc-button-disabled),\n.mat-datepicker-content .mat-calendar-next-button:not(.mat-mdc-button-disabled) {\n  color: var(--%NS%mat-datepicker-calendar-navigation-button-icon-color, var(--%NS%mat-sys-on-surface-variant));\n}\n[dir=rtl] .mat-calendar-previous-button,\n[dir=rtl] .mat-calendar-next-button {\n  transform: rotate(180deg);\n}\n\n.mat-calendar-table {\n  border-spacing: 0;\n  border-collapse: collapse;\n  width: 100%;\n}\n\n.mat-calendar-table-header th {\n  text-align: center;\n  padding: 0 0 8px 0;\n  color: var(--%NS%mat-datepicker-calendar-header-text-color, var(--%NS%mat-sys-on-surface-variant));\n  font-size: var(--%NS%mat-datepicker-calendar-header-text-size, var(--%NS%mat-sys-title-small-size));\n  font-weight: var(--%NS%mat-datepicker-calendar-header-text-weight, var(--%NS%mat-sys-title-small-weight));\n}\n\n.mat-calendar-table-header-divider {\n  position: relative;\n  height: 1px;\n}\n.mat-calendar-table-header-divider::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: -8px;\n  right: -8px;\n  height: 1px;\n  background: var(--%NS%mat-datepicker-calendar-header-divider-color, transparent);\n}\n\n.mat-calendar-body-cell-content::before {\n  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 3px) * -1);\n}\n\n.mat-calendar-body-cell:focus-visible .mat-focus-indicator::before {\n  content: "";\n}\n'],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCalendar, [{
    type: Component,
    args: [{
      selector: "mat-calendar",
      host: {
        "class": "mat-calendar"
      },
      exportAs: "matCalendar",
      encapsulation: ViewEncapsulation.None,
      providers: [MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER],
      imports: [CdkPortalOutlet, CdkMonitorFocus, MatMonthView, MatYearView, MatMultiYearView],
      template: `<ng-template [cdkPortalOutlet]="_calendarHeaderPortal"></ng-template>

<div class="mat-calendar-content" cdkMonitorSubtreeFocus tabindex="-1">
  @switch (currentView) {
    @case ('month') {
        <mat-month-view
            [(activeDate)]="activeDate"
            [selected]="selected"
            [dateFilter]="dateFilter"
            [maxDate]="maxDate"
            [minDate]="minDate"
            [dateClass]="dateClass"
            [comparisonStart]="comparisonStart"
            [comparisonEnd]="comparisonEnd"
            [startDateAccessibleName]="startDateAccessibleName"
            [endDateAccessibleName]="endDateAccessibleName"
            (_userSelection)="_dateSelected($event)"
            (dragStarted)="_dragStarted($event)"
            (dragEnded)="_dragEnded($event)"
            [activeDrag]="_activeDrag"></mat-month-view>
    }

    @case ('year') {
        <mat-year-view
            [(activeDate)]="activeDate"
            [selected]="selected"
            [dateFilter]="dateFilter"
            [maxDate]="maxDate"
            [minDate]="minDate"
            [dateClass]="dateClass"
            (monthSelected)="_monthSelectedInYearView($event)"
            (selectedChange)="_goToDateInView($event, 'month')"></mat-year-view>
    }

    @case ('multi-year') {
        <mat-multi-year-view
            [(activeDate)]="activeDate"
            [selected]="selected"
            [dateFilter]="dateFilter"
            [maxDate]="maxDate"
            [minDate]="minDate"
            [dateClass]="dateClass"
            (yearSelected)="_yearSelectedInMultiYearView($event)"
            (selectedChange)="_goToDateInView($event, 'year')"></mat-multi-year-view>
    }
  }
</div>
`,
      styles: ['.mat-calendar {\n  display: block;\n  line-height: normal;\n  font-family: var(--mat-datepicker-calendar-text-font, var(--mat-sys-body-medium-font));\n  font-size: var(--mat-datepicker-calendar-text-size, var(--mat-sys-body-medium-size));\n}\n\n.mat-calendar-header {\n  padding: 8px 8px 0 8px;\n}\n\n.mat-calendar-content {\n  padding: 0 8px 8px 8px;\n  outline: none;\n}\n\n.mat-calendar-controls {\n  display: flex;\n  align-items: center;\n  margin: 5% calc(4.7142857143% - 16px);\n}\n\n.mat-calendar-spacer {\n  flex: 1 1 auto;\n}\n\n.mat-calendar-period-button {\n  min-width: 0;\n  margin: 0 8px;\n  font-size: var(--mat-datepicker-calendar-period-button-text-size, var(--mat-sys-title-small-size));\n  font-weight: var(--mat-datepicker-calendar-period-button-text-weight, var(--mat-sys-title-small-weight));\n  --mat-button-text-label-text-color: var(--mat-datepicker-calendar-period-button-text-color, var(--mat-sys-on-surface-variant));\n}\n\n.mat-calendar-arrow {\n  display: inline-block;\n  width: 10px;\n  height: 5px;\n  margin: 0 0 0 5px;\n  vertical-align: middle;\n  fill: var(--mat-datepicker-calendar-period-button-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-calendar-arrow.mat-calendar-invert {\n  transform: rotate(180deg);\n}\n[dir=rtl] .mat-calendar-arrow {\n  margin: 0 5px 0 0;\n}\n@media (forced-colors: active) {\n  .mat-calendar-arrow {\n    fill: CanvasText;\n  }\n}\n\n.mat-datepicker-content .mat-calendar-previous-button:not(.mat-mdc-button-disabled),\n.mat-datepicker-content .mat-calendar-next-button:not(.mat-mdc-button-disabled) {\n  color: var(--mat-datepicker-calendar-navigation-button-icon-color, var(--mat-sys-on-surface-variant));\n}\n[dir=rtl] .mat-calendar-previous-button,\n[dir=rtl] .mat-calendar-next-button {\n  transform: rotate(180deg);\n}\n\n.mat-calendar-table {\n  border-spacing: 0;\n  border-collapse: collapse;\n  width: 100%;\n}\n\n.mat-calendar-table-header th {\n  text-align: center;\n  padding: 0 0 8px 0;\n  color: var(--mat-datepicker-calendar-header-text-color, var(--mat-sys-on-surface-variant));\n  font-size: var(--mat-datepicker-calendar-header-text-size, var(--mat-sys-title-small-size));\n  font-weight: var(--mat-datepicker-calendar-header-text-weight, var(--mat-sys-title-small-weight));\n}\n\n.mat-calendar-table-header-divider {\n  position: relative;\n  height: 1px;\n}\n.mat-calendar-table-header-divider::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: -8px;\n  right: -8px;\n  height: 1px;\n  background: var(--mat-datepicker-calendar-header-divider-color, transparent);\n}\n\n.mat-calendar-body-cell-content::before {\n  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);\n}\n\n.mat-calendar-body-cell:focus-visible .mat-focus-indicator::before {\n  content: "";\n}\n']
    }]
  }], () => [], {
    headerComponent: [{
      type: Input
    }],
    startAt: [{
      type: Input
    }],
    startView: [{
      type: Input
    }],
    selected: [{
      type: Input
    }],
    minDate: [{
      type: Input
    }],
    maxDate: [{
      type: Input
    }],
    dateFilter: [{
      type: Input
    }],
    dateClass: [{
      type: Input
    }],
    comparisonStart: [{
      type: Input
    }],
    comparisonEnd: [{
      type: Input
    }],
    startDateAccessibleName: [{
      type: Input
    }],
    endDateAccessibleName: [{
      type: Input
    }],
    selectedChange: [{
      type: Output
    }],
    yearSelected: [{
      type: Output
    }],
    monthSelected: [{
      type: Output
    }],
    viewChanged: [{
      type: Output
    }],
    _userSelection: [{
      type: Output
    }],
    _userDragDrop: [{
      type: Output
    }],
    monthView: [{
      type: ViewChild,
      args: [MatMonthView]
    }],
    yearView: [{
      type: ViewChild,
      args: [MatYearView]
    }],
    multiYearView: [{
      type: ViewChild,
      args: [MatMultiYearView]
    }]
  });
})();
var MAT_DATEPICKER_SCROLL_STRATEGY = new InjectionToken("mat-datepicker-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    const injector = inject(Injector);
    return () => createRepositionScrollStrategy(injector);
  }
});
var MatDatepickerContent = class _MatDatepickerContent {
  _elementRef = inject(ElementRef);
  _animationsDisabled = _animationsDisabled();
  _changeDetectorRef = inject(ChangeDetectorRef);
  _globalModel = inject(MatDateSelectionModel);
  _dateAdapter = inject(DateAdapter);
  _ngZone = inject(NgZone);
  _rangeSelectionStrategy = inject(MAT_DATE_RANGE_SELECTION_STRATEGY, {
    optional: true
  });
  _stateChanges;
  _model;
  _eventCleanups;
  _animationFallback;
  _calendar;
  color;
  datepicker;
  comparisonStart = null;
  comparisonEnd = null;
  startDateAccessibleName = null;
  endDateAccessibleName = null;
  _isAbove = false;
  _animationDone = new Subject();
  _isAnimating = false;
  _closeButtonText;
  _closeButtonFocused = false;
  _actionsPortal = null;
  _dialogLabelId = null;
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_VisuallyHiddenLoader);
    this._closeButtonText = inject(MatDatepickerIntl).closeCalendarLabel;
    if (!this._animationsDisabled) {
      const element = this._elementRef.nativeElement;
      const renderer = inject(Renderer2);
      this._eventCleanups = this._ngZone.runOutsideAngular(() => [renderer.listen(element, "animationstart", this._handleAnimationEvent), renderer.listen(element, "animationend", this._handleAnimationEvent), renderer.listen(element, "animationcancel", this._handleAnimationEvent)]);
    }
  }
  ngAfterViewInit() {
    this._stateChanges = this.datepicker.stateChanges.subscribe(() => {
      this._changeDetectorRef.markForCheck();
    });
    this._calendar.focusActiveCell();
  }
  ngOnDestroy() {
    clearTimeout(this._animationFallback);
    this._eventCleanups?.forEach((cleanup) => cleanup());
    this._stateChanges?.unsubscribe();
    this._animationDone.complete();
  }
  _handleUserSelection(event) {
    const selection = this._model.selection;
    const value = event.value;
    const isRange = selection instanceof DateRange;
    if (isRange && this._rangeSelectionStrategy) {
      const newSelection = this._rangeSelectionStrategy.selectionFinished(value, selection, event.event);
      this._model.updateSelection(newSelection, this);
    } else if (value && (isRange || !this._dateAdapter.sameDate(value, selection))) {
      this._model.add(value);
    }
    if ((!this._model || this._model.isComplete()) && !this._actionsPortal) {
      this.datepicker.close();
    }
  }
  _handleUserDragDrop(event) {
    this._model.updateSelection(event.value, this);
  }
  _startExitAnimation() {
    this._elementRef.nativeElement.classList.add("mat-datepicker-content-exit");
    if (this._animationsDisabled) {
      this._animationDone.next();
    } else {
      clearTimeout(this._animationFallback);
      this._animationFallback = setTimeout(() => {
        if (!this._isAnimating) {
          this._animationDone.next();
        }
      }, 200);
    }
  }
  _handleAnimationEvent = (event) => {
    const element = this._elementRef.nativeElement;
    if (event.target !== element || !event.animationName.startsWith("_mat-datepicker-content")) {
      return;
    }
    clearTimeout(this._animationFallback);
    this._isAnimating = event.type === "animationstart";
    element.classList.toggle("mat-datepicker-content-animating", this._isAnimating);
    if (!this._isAnimating) {
      this._animationDone.next();
    }
  };
  _getSelected() {
    return this._model.selection;
  }
  _applyPendingSelection() {
    if (this._model !== this._globalModel) {
      this._globalModel.updateSelection(this._model.selection, this);
    }
  }
  _assignActions(portal, forceRerender) {
    this._model = portal ? this._globalModel.clone() : this._globalModel;
    this._actionsPortal = portal;
    if (forceRerender) {
      this._changeDetectorRef.detectChanges();
    }
  }
  static \u0275fac = function MatDatepickerContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDatepickerContent)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    function MatDatepickerContent_ng_template_2_Template(rf, ctx) {
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatDatepickerContent,
      selectors: [["mat-datepicker-content"]],
      viewQuery: function MatDatepickerContent_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(MatCalendar, 5);
        }
        if (rf & 2) {
          let _t = void 0;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._calendar = _t.first);
        }
      },
      hostAttrs: [1, "mat-datepicker-content"],
      hostVars: 6,
      hostBindings: function MatDatepickerContent_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275classMap(ctx.color ? "mat-" + ctx.color : "");
          \u0275\u0275classProp("mat-datepicker-content-touch", ctx.datepicker.touchUi)("mat-datepicker-content-animations-enabled", !ctx._animationsDisabled);
        }
      },
      inputs: {
        color: "color"
      },
      exportAs: ["matDatepickerContent"],
      decls: 5,
      vars: 26,
      consts: [["cdkTrapFocus", "", "role", "dialog", 1, "mat-datepicker-content-container"], [3, "yearSelected", "monthSelected", "viewChanged", "_userSelection", "_userDragDrop", "id", "startAt", "startView", "minDate", "maxDate", "dateFilter", "headerComponent", "selected", "dateClass", "comparisonStart", "comparisonEnd", "startDateAccessibleName", "endDateAccessibleName"], [3, "cdkPortalOutlet"], ["type", "button", "matButton", "elevated", 1, "mat-datepicker-close-button", 3, "focus", "blur", "click", "color"]],
      template: function MatDatepickerContent_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275elementStart(0, "div", 0)(1, "mat-calendar", 1);
          \u0275\u0275listener("yearSelected", function MatDatepickerContent_Template_mat_calendar_yearSelected_1_listener($event) {
            return ctx.datepicker._selectYear($event);
          })("monthSelected", function MatDatepickerContent_Template_mat_calendar_monthSelected_1_listener($event) {
            return ctx.datepicker._selectMonth($event);
          })("viewChanged", function MatDatepickerContent_Template_mat_calendar_viewChanged_1_listener($event) {
            return ctx.datepicker._viewChanged($event);
          })("_userSelection", function MatDatepickerContent_Template_mat_calendar__userSelection_1_listener($event) {
            return ctx._handleUserSelection($event);
          })("_userDragDrop", function MatDatepickerContent_Template_mat_calendar__userDragDrop_1_listener($event) {
            return ctx._handleUserDragDrop($event);
          });
          \u0275\u0275elementEnd();
          \u0275\u0275template(2, MatDatepickerContent_ng_template_2_Template, 0, 0, "ng-template", 2);
          \u0275\u0275elementStart(3, "button", 3);
          \u0275\u0275listener("focus", function MatDatepickerContent_Template_button_focus_3_listener() {
            return ctx._closeButtonFocused = true;
          })("blur", function MatDatepickerContent_Template_button_blur_3_listener() {
            return ctx._closeButtonFocused = false;
          })("click", function MatDatepickerContent_Template_button_click_3_listener() {
            return ctx.datepicker.close();
          });
          \u0275\u0275text(4);
          \u0275\u0275elementEnd()();
        }
        if (rf & 2) {
          \u0275\u0275classProp("mat-datepicker-content-container-with-custom-header", ctx.datepicker.calendarHeaderComponent)("mat-datepicker-content-container-with-actions", ctx._actionsPortal);
          \u0275\u0275attribute("aria-modal", true)("aria-labelledby", ctx._dialogLabelId ?? void 0);
          \u0275\u0275advance();
          \u0275\u0275classMap(ctx.datepicker.panelClass);
          \u0275\u0275property("id", ctx.datepicker.id)("startAt", ctx.datepicker.startAt)("startView", ctx.datepicker.startView)("minDate", ctx.datepicker._getMinDate())("maxDate", ctx.datepicker._getMaxDate())("dateFilter", ctx.datepicker._getDateFilter())("headerComponent", ctx.datepicker.calendarHeaderComponent)("selected", ctx._getSelected())("dateClass", ctx.datepicker.dateClass)("comparisonStart", ctx.comparisonStart)("comparisonEnd", ctx.comparisonEnd)("startDateAccessibleName", ctx.startDateAccessibleName)("endDateAccessibleName", ctx.endDateAccessibleName);
          \u0275\u0275advance();
          \u0275\u0275property("cdkPortalOutlet", ctx._actionsPortal);
          \u0275\u0275advance();
          \u0275\u0275classProp("cdk-visually-hidden", !ctx._closeButtonFocused);
          \u0275\u0275property("color", ctx.color || "primary");
          \u0275\u0275advance();
          \u0275\u0275textInterpolate(ctx._closeButtonText);
        }
      },
      dependencies: [CdkTrapFocus, MatCalendar, CdkPortalOutlet, MatButton],
      styles: ["@keyframes _mat-datepicker-content-dropdown-enter {\n  from {\n    opacity: 0;\n    transform: scaleY(0.8);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes _mat-datepicker-content-dialog-enter {\n  from {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes _mat-datepicker-content-exit {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n.mat-datepicker-content {\n  display: block;\n  background-color: var(--%NS%mat-datepicker-calendar-container-background-color, var(--%NS%mat-sys-surface-container-high));\n  color: var(--%NS%mat-datepicker-calendar-container-text-color, var(--%NS%mat-sys-on-surface));\n  box-shadow: var(--%NS%mat-datepicker-calendar-container-elevation-shadow, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12));\n  border-radius: var(--%NS%mat-datepicker-calendar-container-shape, var(--%NS%mat-sys-corner-large));\n}\n.mat-datepicker-content.mat-datepicker-content-animations-enabled {\n  animation: _mat-datepicker-content-dropdown-enter 120ms cubic-bezier(0, 0, 0.2, 1);\n}\n.mat-datepicker-content .mat-calendar {\n  width: 296px;\n  height: 354px;\n}\n.mat-datepicker-content .mat-datepicker-content-container-with-custom-header .mat-calendar {\n  height: auto;\n}\n.mat-datepicker-content .mat-datepicker-close-button {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  margin-top: 8px;\n}\n.mat-datepicker-content-animating .mat-datepicker-content .mat-datepicker-close-button {\n  display: none;\n}\n\n.mat-datepicker-content-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n\n.mat-datepicker-content-touch {\n  display: block;\n  max-height: 80vh;\n  box-shadow: var(--%NS%mat-datepicker-calendar-container-touch-elevation-shadow, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12));\n  border-radius: var(--%NS%mat-datepicker-calendar-container-touch-shape, var(--%NS%mat-sys-corner-extra-large));\n  position: relative;\n  overflow: visible;\n  min-height: fit-content;\n}\n.mat-datepicker-content-touch.mat-datepicker-content-animations-enabled {\n  animation: _mat-datepicker-content-dialog-enter 150ms cubic-bezier(0, 0, 0.2, 1);\n}\n.mat-datepicker-content-touch .mat-datepicker-content-container {\n  min-height: fit-content;\n  max-height: 788px;\n  min-width: 250px;\n  max-width: 750px;\n}\n.mat-datepicker-content-touch .mat-calendar {\n  width: 100%;\n  height: auto;\n}\n\n.mat-datepicker-content-exit.mat-datepicker-content-animations-enabled {\n  animation: _mat-datepicker-content-exit 100ms linear;\n}\n\n@media all and (orientation: landscape) {\n  .mat-datepicker-content-touch .mat-datepicker-content-container {\n    width: 64vh;\n    height: 80vh;\n  }\n}\n@media all and (orientation: portrait) {\n  .mat-datepicker-content-touch .mat-datepicker-content-container {\n    width: 80vw;\n    height: 100vw;\n  }\n}\n"],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDatepickerContent, [{
    type: Component,
    args: [{
      selector: "mat-datepicker-content",
      host: {
        "class": "mat-datepicker-content",
        "[class]": 'color ? "mat-" + color : ""',
        "[class.mat-datepicker-content-touch]": "datepicker.touchUi",
        "[class.mat-datepicker-content-animations-enabled]": "!_animationsDisabled"
      },
      exportAs: "matDatepickerContent",
      encapsulation: ViewEncapsulation.None,
      imports: [CdkTrapFocus, MatCalendar, CdkPortalOutlet, MatButton],
      template: `<div
  cdkTrapFocus
  role="dialog"
  [attr.aria-modal]="true"
  [attr.aria-labelledby]="_dialogLabelId ?? undefined"
  class="mat-datepicker-content-container"
  [class.mat-datepicker-content-container-with-custom-header]="datepicker.calendarHeaderComponent"
  [class.mat-datepicker-content-container-with-actions]="_actionsPortal">
  <mat-calendar
    [id]="datepicker.id"
    [class]="datepicker.panelClass"
    [startAt]="datepicker.startAt"
    [startView]="datepicker.startView"
    [minDate]="datepicker._getMinDate()"
    [maxDate]="datepicker._getMaxDate()"
    [dateFilter]="datepicker._getDateFilter()"
    [headerComponent]="datepicker.calendarHeaderComponent"
    [selected]="_getSelected()"
    [dateClass]="datepicker.dateClass"
    [comparisonStart]="comparisonStart"
    [comparisonEnd]="comparisonEnd"
    [startDateAccessibleName]="startDateAccessibleName"
    [endDateAccessibleName]="endDateAccessibleName"
    (yearSelected)="datepicker._selectYear($event)"
    (monthSelected)="datepicker._selectMonth($event)"
    (viewChanged)="datepicker._viewChanged($event)"
    (_userSelection)="_handleUserSelection($event)"
    (_userDragDrop)="_handleUserDragDrop($event)"></mat-calendar>

  <ng-template [cdkPortalOutlet]="_actionsPortal"></ng-template>

  <!-- Invisible close button for screen reader users. -->
  <button
    type="button"
    matButton="elevated"
    [color]="color || 'primary'"
    class="mat-datepicker-close-button"
    [class.cdk-visually-hidden]="!_closeButtonFocused"
    (focus)="_closeButtonFocused = true"
    (blur)="_closeButtonFocused = false"
    (click)="datepicker.close()">{{ _closeButtonText }}</button>
</div>
`,
      styles: ["@keyframes _mat-datepicker-content-dropdown-enter {\n  from {\n    opacity: 0;\n    transform: scaleY(0.8);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes _mat-datepicker-content-dialog-enter {\n  from {\n    opacity: 0;\n    transform: scale(0.8);\n  }\n  to {\n    opacity: 1;\n    transform: none;\n  }\n}\n@keyframes _mat-datepicker-content-exit {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n.mat-datepicker-content {\n  display: block;\n  background-color: var(--mat-datepicker-calendar-container-background-color, var(--mat-sys-surface-container-high));\n  color: var(--mat-datepicker-calendar-container-text-color, var(--mat-sys-on-surface));\n  box-shadow: var(--mat-datepicker-calendar-container-elevation-shadow, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12));\n  border-radius: var(--mat-datepicker-calendar-container-shape, var(--mat-sys-corner-large));\n}\n.mat-datepicker-content.mat-datepicker-content-animations-enabled {\n  animation: _mat-datepicker-content-dropdown-enter 120ms cubic-bezier(0, 0, 0.2, 1);\n}\n.mat-datepicker-content .mat-calendar {\n  width: 296px;\n  height: 354px;\n}\n.mat-datepicker-content .mat-datepicker-content-container-with-custom-header .mat-calendar {\n  height: auto;\n}\n.mat-datepicker-content .mat-datepicker-close-button {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  margin-top: 8px;\n}\n.mat-datepicker-content-animating .mat-datepicker-content .mat-datepicker-close-button {\n  display: none;\n}\n\n.mat-datepicker-content-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n\n.mat-datepicker-content-touch {\n  display: block;\n  max-height: 80vh;\n  box-shadow: var(--mat-datepicker-calendar-container-touch-elevation-shadow, 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12));\n  border-radius: var(--mat-datepicker-calendar-container-touch-shape, var(--mat-sys-corner-extra-large));\n  position: relative;\n  overflow: visible;\n  min-height: fit-content;\n}\n.mat-datepicker-content-touch.mat-datepicker-content-animations-enabled {\n  animation: _mat-datepicker-content-dialog-enter 150ms cubic-bezier(0, 0, 0.2, 1);\n}\n.mat-datepicker-content-touch .mat-datepicker-content-container {\n  min-height: fit-content;\n  max-height: 788px;\n  min-width: 250px;\n  max-width: 750px;\n}\n.mat-datepicker-content-touch .mat-calendar {\n  width: 100%;\n  height: auto;\n}\n\n.mat-datepicker-content-exit.mat-datepicker-content-animations-enabled {\n  animation: _mat-datepicker-content-exit 100ms linear;\n}\n\n@media all and (orientation: landscape) {\n  .mat-datepicker-content-touch .mat-datepicker-content-container {\n    width: 64vh;\n    height: 80vh;\n  }\n}\n@media all and (orientation: portrait) {\n  .mat-datepicker-content-touch .mat-datepicker-content-container {\n    width: 80vw;\n    height: 100vw;\n  }\n}\n"]
    }]
  }], () => [], {
    _calendar: [{
      type: ViewChild,
      args: [MatCalendar]
    }],
    color: [{
      type: Input
    }]
  });
})();
var MatDatepickerBase = class _MatDatepickerBase {
  _injector = inject(Injector);
  _viewContainerRef = inject(ViewContainerRef);
  _dateAdapter = inject(DateAdapter, {
    optional: true
  });
  _dir = inject(Directionality, {
    optional: true
  });
  _model = inject(MatDateSelectionModel);
  _animationsDisabled = _animationsDisabled();
  _scrollStrategy = inject(MAT_DATEPICKER_SCROLL_STRATEGY);
  _inputStateChanges = Subscription.EMPTY;
  _document = inject(DOCUMENT);
  calendarHeaderComponent;
  get startAt() {
    return this._startAt || (this.datepickerInput ? this.datepickerInput.getStartValue() : null);
  }
  set startAt(value) {
    this._startAt = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  _startAt = null;
  startView = "month";
  get color() {
    return this._color || (this.datepickerInput ? this.datepickerInput.getThemePalette() : void 0);
  }
  set color(value) {
    this._color = value;
  }
  _color;
  touchUi = false;
  get disabled() {
    return this._disabled === void 0 && this.datepickerInput ? this.datepickerInput.disabled : !!this._disabled;
  }
  set disabled(value) {
    if (value !== this._disabled) {
      this._disabled = value;
      this.stateChanges.next(void 0);
    }
  }
  _disabled;
  xPosition = "start";
  yPosition = "below";
  restoreFocus = true;
  yearSelected = new EventEmitter();
  monthSelected = new EventEmitter();
  viewChanged = new EventEmitter(true);
  dateClass;
  openedStream = new EventEmitter();
  closedStream = new EventEmitter();
  get panelClass() {
    return this._panelClass;
  }
  set panelClass(value) {
    this._panelClass = coerceStringArray(value);
  }
  _panelClass;
  get opened() {
    return this._opened;
  }
  set opened(value) {
    if (value) {
      this.open();
    } else {
      this.close();
    }
  }
  _opened = false;
  id = inject(_IdGenerator).getId("mat-datepicker-");
  _getMinDate() {
    return this.datepickerInput && this.datepickerInput.min;
  }
  _getMaxDate() {
    return this.datepickerInput && this.datepickerInput.max;
  }
  _getDateFilter() {
    return this.datepickerInput && this.datepickerInput.dateFilter;
  }
  _overlayRef = null;
  _componentRef = null;
  _focusedElementBeforeOpen = null;
  _backdropHarnessClass = `${this.id}-backdrop`;
  _actionsPortal = null;
  datepickerInput;
  stateChanges = new Subject();
  _changeDetectorRef = inject(ChangeDetectorRef);
  constructor() {
    if (!this._dateAdapter && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw createMissingDateImplError("DateAdapter");
    }
    this._model.selectionChanged.subscribe(() => {
      this._changeDetectorRef.markForCheck();
    });
  }
  ngOnChanges(changes) {
    const positionChange = changes["xPosition"] || changes["yPosition"];
    if (positionChange && !positionChange.firstChange && this._overlayRef) {
      const positionStrategy = this._overlayRef.getConfig().positionStrategy;
      if (positionStrategy instanceof FlexibleConnectedPositionStrategy) {
        this._setConnectedPositions(positionStrategy);
        if (this.opened) {
          this._overlayRef.updatePosition();
        }
      }
    }
    this.stateChanges.next(void 0);
  }
  ngOnDestroy() {
    this._destroyOverlay();
    this.close();
    this._inputStateChanges.unsubscribe();
    this.stateChanges.complete();
  }
  select(date) {
    this._model.add(date);
  }
  _selectYear(normalizedYear) {
    this.yearSelected.emit(normalizedYear);
  }
  _selectMonth(normalizedMonth) {
    this.monthSelected.emit(normalizedMonth);
  }
  _viewChanged(view) {
    this.viewChanged.emit(view);
  }
  registerInput(input2) {
    if (this.datepickerInput && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("A MatDatepicker can only be associated with a single input.");
    }
    this._inputStateChanges.unsubscribe();
    this.datepickerInput = input2;
    this._inputStateChanges = input2.stateChanges.subscribe(() => this.stateChanges.next(void 0));
    return this._model;
  }
  registerActions(portal) {
    if (this._actionsPortal && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("A MatDatepicker can only be associated with a single actions row.");
    }
    this._actionsPortal = portal;
    this._componentRef?.instance._assignActions(portal, true);
  }
  removeActions(portal) {
    if (portal === this._actionsPortal) {
      this._actionsPortal = null;
      this._componentRef?.instance._assignActions(null, true);
    }
  }
  open() {
    if (this._opened || this.disabled || this._componentRef?.instance._isAnimating) {
      return;
    }
    if (!this.datepickerInput && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("Attempted to open an MatDatepicker with no associated input.");
    }
    this._focusedElementBeforeOpen = _getFocusedElementPierceShadowDom();
    this._openOverlay();
    this._opened = true;
    this.openedStream.emit();
  }
  close() {
    if (!this._opened || this._componentRef?.instance._isAnimating) {
      return;
    }
    const canRestoreFocus = this.restoreFocus && this._focusedElementBeforeOpen && typeof this._focusedElementBeforeOpen.focus === "function";
    const completeClose = () => {
      if (this._opened) {
        this._opened = false;
        this.closedStream.emit();
      }
    };
    if (this._componentRef) {
      const {
        instance,
        location
      } = this._componentRef;
      instance._animationDone.pipe(take(1)).subscribe(() => {
        const activeElement = this._document.activeElement;
        if (canRestoreFocus && (!activeElement || activeElement === this._document.activeElement || location.nativeElement.contains(activeElement))) {
          this._focusedElementBeforeOpen.focus();
        }
        this._focusedElementBeforeOpen = null;
        this._destroyOverlay();
      });
      instance._startExitAnimation();
    }
    if (canRestoreFocus) {
      setTimeout(completeClose);
    } else {
      completeClose();
    }
  }
  _applyPendingSelection() {
    this._componentRef?.instance?._applyPendingSelection();
  }
  _forwardContentValues(instance) {
    instance.datepicker = this;
    instance.color = this.color;
    instance._dialogLabelId = this.datepickerInput.getOverlayLabelId();
    instance._assignActions(this._actionsPortal, false);
  }
  _openOverlay() {
    this._destroyOverlay();
    const isDialog = this.touchUi;
    const portal = new ComponentPortal(MatDatepickerContent, this._viewContainerRef);
    const overlayRef = this._overlayRef = createOverlayRef(this._injector, new OverlayConfig({
      positionStrategy: isDialog ? this._getDialogStrategy() : this._getDropdownStrategy(),
      hasBackdrop: true,
      backdropClass: [isDialog ? "cdk-overlay-dark-backdrop" : "mat-overlay-transparent-backdrop", this._backdropHarnessClass],
      direction: this._dir || "ltr",
      scrollStrategy: isDialog ? createBlockScrollStrategy(this._injector) : this._scrollStrategy(),
      panelClass: `mat-datepicker-${isDialog ? "dialog" : "popup"}`,
      disableAnimations: this._animationsDisabled
    }));
    this._getCloseStream(overlayRef).subscribe((event) => {
      if (event) {
        event.preventDefault();
      }
      this.close();
    });
    overlayRef.keydownEvents().subscribe((event) => {
      const keyCode = event.keyCode;
      if (keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW || keyCode === PAGE_UP || keyCode === PAGE_DOWN) {
        event.preventDefault();
      }
    });
    this._componentRef = overlayRef.attach(portal);
    this._forwardContentValues(this._componentRef.instance);
    if (!isDialog) {
      afterNextRender(() => {
        overlayRef.updatePosition();
      }, {
        injector: this._injector
      });
    }
  }
  _destroyOverlay() {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = this._componentRef = null;
    }
  }
  _getDialogStrategy() {
    return createGlobalPositionStrategy(this._injector).centerHorizontally().centerVertically();
  }
  _getDropdownStrategy() {
    const strategy = createFlexibleConnectedPositionStrategy(this._injector, this.datepickerInput.getConnectedOverlayOrigin()).withTransformOriginOn(".mat-datepicker-content").withFlexibleDimensions(false).withViewportMargin(8).withLockedPosition();
    return this._setConnectedPositions(strategy);
  }
  _setConnectedPositions(strategy) {
    const primaryX = this.xPosition === "end" ? "end" : "start";
    const secondaryX = primaryX === "start" ? "end" : "start";
    const primaryY = this.yPosition === "above" ? "bottom" : "top";
    const secondaryY = primaryY === "top" ? "bottom" : "top";
    return strategy.withPositions([{
      originX: primaryX,
      originY: secondaryY,
      overlayX: primaryX,
      overlayY: primaryY
    }, {
      originX: primaryX,
      originY: primaryY,
      overlayX: primaryX,
      overlayY: secondaryY
    }, {
      originX: secondaryX,
      originY: secondaryY,
      overlayX: secondaryX,
      overlayY: primaryY
    }, {
      originX: secondaryX,
      originY: primaryY,
      overlayX: secondaryX,
      overlayY: secondaryY
    }]);
  }
  _getCloseStream(overlayRef) {
    const ctrlShiftMetaModifiers = ["ctrlKey", "shiftKey", "metaKey"];
    return merge(overlayRef.backdropClick(), overlayRef.detachments(), overlayRef.keydownEvents().pipe(filter((event) => {
      return event.keyCode === ESCAPE && !hasModifierKey(event) || this.datepickerInput && hasModifierKey(event, "altKey") && event.keyCode === UP_ARROW && ctrlShiftMetaModifiers.every((modifier) => !hasModifierKey(event, modifier));
    })));
  }
  static \u0275fac = function MatDatepickerBase_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDatepickerBase)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatDatepickerBase,
    inputs: {
      calendarHeaderComponent: "calendarHeaderComponent",
      startAt: "startAt",
      startView: "startView",
      color: "color",
      touchUi: [2, "touchUi", "touchUi", booleanAttribute],
      disabled: [2, "disabled", "disabled", booleanAttribute],
      xPosition: "xPosition",
      yPosition: "yPosition",
      restoreFocus: [2, "restoreFocus", "restoreFocus", booleanAttribute],
      dateClass: "dateClass",
      panelClass: "panelClass",
      opened: [2, "opened", "opened", booleanAttribute]
    },
    outputs: {
      yearSelected: "yearSelected",
      monthSelected: "monthSelected",
      viewChanged: "viewChanged",
      openedStream: "opened",
      closedStream: "closed"
    },
    features: [\u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDatepickerBase, [{
    type: Directive
  }], () => [], {
    calendarHeaderComponent: [{
      type: Input
    }],
    startAt: [{
      type: Input
    }],
    startView: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    touchUi: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    xPosition: [{
      type: Input
    }],
    yPosition: [{
      type: Input
    }],
    restoreFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    yearSelected: [{
      type: Output
    }],
    monthSelected: [{
      type: Output
    }],
    viewChanged: [{
      type: Output
    }],
    dateClass: [{
      type: Input
    }],
    openedStream: [{
      type: Output,
      args: ["opened"]
    }],
    closedStream: [{
      type: Output,
      args: ["closed"]
    }],
    panelClass: [{
      type: Input
    }],
    opened: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatDatepicker = class _MatDatepicker extends MatDatepickerBase {
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatDatepicker_BaseFactory = void 0;
    return function MatDatepicker_Factory(__ngFactoryType__) {
      return (\u0275MatDatepicker_BaseFactory || (\u0275MatDatepicker_BaseFactory = \u0275\u0275getInheritedFactory(_MatDatepicker)))(__ngFactoryType__ || _MatDatepicker);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatDatepicker,
    selectors: [["mat-datepicker"]],
    exportAs: ["matDatepicker"],
    features: [\u0275\u0275ProvidersFeature([MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER, {
      provide: MatDatepickerBase,
      useExisting: _MatDatepicker
    }]), \u0275\u0275InheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function MatDatepicker_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDatepicker, [{
    type: Component,
    args: [{
      selector: "mat-datepicker",
      template: "",
      exportAs: "matDatepicker",
      encapsulation: ViewEncapsulation.None,
      providers: [MAT_SINGLE_DATE_SELECTION_MODEL_PROVIDER, {
        provide: MatDatepickerBase,
        useExisting: MatDatepicker
      }]
    }]
  }], null, null);
})();
var MatDatepickerInputEvent = class {
  target;
  targetElement;
  value = null;
  constructor(target, targetElement) {
    this.target = target;
    this.targetElement = targetElement;
    this.value = this.target.value;
  }
};
var MatDatepickerInputBase = class _MatDatepickerInputBase {
  _elementRef = inject(ElementRef);
  _dateAdapter = inject(DateAdapter, {
    optional: true
  });
  _dateFormats = inject(MAT_DATE_FORMATS, {
    optional: true
  });
  _isInitialized = false;
  get value() {
    return this._model ? this._getValueFromModel(this._model.selection) : this._pendingValue;
  }
  set value(value) {
    this._assignValueProgrammatically(value, true);
  }
  _model;
  get disabled() {
    return !!this._disabled || this._parentDisabled();
  }
  set disabled(value) {
    const newValue = value;
    const element = this._elementRef.nativeElement;
    if (this._disabled !== newValue) {
      this._disabled = newValue;
      this.stateChanges.next(void 0);
    }
    if (newValue && this._isInitialized && element.blur) {
      element.blur();
    }
  }
  _disabled;
  dateChange = new EventEmitter();
  dateInput = new EventEmitter();
  stateChanges = new Subject();
  _onTouched = () => {
  };
  _validatorOnChange = () => {
  };
  _cvaOnChange = () => {
  };
  _valueChangesSubscription = Subscription.EMPTY;
  _localeSubscription = Subscription.EMPTY;
  _pendingValue = null;
  _parseValidator = () => {
    return this._lastValueValid ? null : {
      "matDatepickerParse": {
        "text": this._elementRef.nativeElement.value
      }
    };
  };
  _filterValidator = (control) => {
    const controlValue = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(control.value));
    return !controlValue || this._matchesFilter(controlValue) ? null : {
      "matDatepickerFilter": true
    };
  };
  _minValidator = (control) => {
    const controlValue = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(control.value));
    const min = this._getMinDate();
    return !min || !controlValue || this._dateAdapter.compareDate(min, controlValue) <= 0 ? null : {
      "matDatepickerMin": {
        "min": min,
        "actual": controlValue
      }
    };
  };
  _maxValidator = (control) => {
    const controlValue = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(control.value));
    const max = this._getMaxDate();
    return !max || !controlValue || this._dateAdapter.compareDate(max, controlValue) >= 0 ? null : {
      "matDatepickerMax": {
        "max": max,
        "actual": controlValue
      }
    };
  };
  _getValidators() {
    return [this._parseValidator, this._minValidator, this._maxValidator, this._filterValidator];
  }
  _registerModel(model) {
    this._model = model;
    this._valueChangesSubscription.unsubscribe();
    if (this._pendingValue) {
      this._assignValue(this._pendingValue);
    }
    this._valueChangesSubscription = this._model.selectionChanged.subscribe((event) => {
      if (this._shouldHandleChangeEvent(event)) {
        const value = this._getValueFromModel(event.selection);
        this._lastValueValid = this._isValidValue(value);
        this._cvaOnChange(value);
        this._onTouched();
        this._formatValue(value);
        this.dateInput.emit(new MatDatepickerInputEvent(this, this._elementRef.nativeElement));
        this.dateChange.emit(new MatDatepickerInputEvent(this, this._elementRef.nativeElement));
      }
    });
  }
  _lastValueValid = false;
  constructor() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this._dateAdapter) {
        throw createMissingDateImplError("DateAdapter");
      }
      if (!this._dateFormats) {
        throw createMissingDateImplError("MAT_DATE_FORMATS");
      }
    }
    this._localeSubscription = this._dateAdapter.localeChanges.subscribe(() => {
      this._assignValueProgrammatically(this.value, true);
    });
  }
  ngAfterViewInit() {
    this._isInitialized = true;
  }
  ngOnChanges(changes) {
    if (dateInputsHaveChanged(changes, this._dateAdapter)) {
      this.stateChanges.next(void 0);
    }
  }
  ngOnDestroy() {
    this._valueChangesSubscription.unsubscribe();
    this._localeSubscription.unsubscribe();
    this.stateChanges.complete();
  }
  registerOnValidatorChange(fn) {
    this._validatorOnChange = fn;
  }
  validate(c) {
    return this._validator ? this._validator(c) : null;
  }
  writeValue(value) {
    this._assignValueProgrammatically(value, value !== this.value);
  }
  registerOnChange(fn) {
    this._cvaOnChange = fn;
  }
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  _onKeydown(event) {
    const ctrlShiftMetaModifiers = ["ctrlKey", "shiftKey", "metaKey"];
    const isAltDownArrow = hasModifierKey(event, "altKey") && event.keyCode === DOWN_ARROW && ctrlShiftMetaModifiers.every((modifier) => !hasModifierKey(event, modifier));
    if (isAltDownArrow && !this._elementRef.nativeElement.readOnly) {
      this._openPopup();
      event.preventDefault();
    }
  }
  _onInput(event) {
    const value = event.target.value;
    const lastValueWasValid = this._lastValueValid;
    let date = this._dateAdapter.parse(value, this._dateFormats.parse.dateInput);
    this._lastValueValid = this._isValidValue(date);
    date = this._dateAdapter.getValidDateOrNull(date);
    const hasChanged = !this._dateAdapter.sameDate(date, this.value);
    if (!date || hasChanged) {
      this._cvaOnChange(date);
    } else {
      if (value && !this.value) {
        this._cvaOnChange(date);
      }
      if (lastValueWasValid !== this._lastValueValid) {
        this._validatorOnChange();
      }
    }
    if (hasChanged) {
      this._assignValue(date);
      this.dateInput.emit(new MatDatepickerInputEvent(this, this._elementRef.nativeElement));
    }
  }
  _onChange() {
    this.dateChange.emit(new MatDatepickerInputEvent(this, this._elementRef.nativeElement));
  }
  _onBlur() {
    if (this.value) {
      this._formatValue(this.value);
    }
    this._onTouched();
  }
  _formatValue(value) {
    this._elementRef.nativeElement.value = value != null ? this._dateAdapter.format(value, this._dateFormats.display.dateInput) : "";
  }
  _assignValue(value) {
    if (this._model) {
      this._assignValueToModel(value);
      this._pendingValue = null;
    } else {
      this._pendingValue = value;
    }
  }
  _isValidValue(value) {
    return !value || this._dateAdapter.isValid(value);
  }
  _parentDisabled() {
    return false;
  }
  _assignValueProgrammatically(value, reformat) {
    value = this._dateAdapter.deserialize(value);
    this._lastValueValid = this._isValidValue(value);
    value = this._dateAdapter.getValidDateOrNull(value);
    this._assignValue(value);
    if (reformat) {
      this._formatValue(value);
    }
  }
  _matchesFilter(value) {
    const filter2 = this._getDateFilter();
    return !filter2 || filter2(value);
  }
  static \u0275fac = function MatDatepickerInputBase_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDatepickerInputBase)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatDatepickerInputBase,
    inputs: {
      value: "value",
      disabled: [2, "disabled", "disabled", booleanAttribute]
    },
    outputs: {
      dateChange: "dateChange",
      dateInput: "dateInput"
    },
    features: [\u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDatepickerInputBase, [{
    type: Directive
  }], () => [], {
    value: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    dateChange: [{
      type: Output
    }],
    dateInput: [{
      type: Output
    }]
  });
})();
function dateInputsHaveChanged(changes, adapter) {
  const keys = Object.keys(changes);
  for (let key of keys) {
    const {
      previousValue,
      currentValue
    } = changes[key];
    if (adapter.isDateInstance(previousValue) && adapter.isDateInstance(currentValue)) {
      if (!adapter.sameDate(previousValue, currentValue)) {
        return true;
      }
    } else {
      return true;
    }
  }
  return false;
}
var MAT_DATEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatDatepickerInput),
  multi: true
};
var MAT_DATEPICKER_VALIDATORS = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MatDatepickerInput),
  multi: true
};
var MatDatepickerInput = class _MatDatepickerInput extends MatDatepickerInputBase {
  _formField = inject(MAT_FORM_FIELD, {
    optional: true
  });
  _closedSubscription = Subscription.EMPTY;
  _openedSubscription = Subscription.EMPTY;
  set matDatepicker(datepicker) {
    if (datepicker) {
      this._datepicker = datepicker;
      this._ariaOwns.set(datepicker.opened ? datepicker.id : null);
      this._closedSubscription = datepicker.closedStream.subscribe(() => {
        this._onTouched();
        this._ariaOwns.set(null);
      });
      this._openedSubscription = datepicker.openedStream.subscribe(() => {
        this._ariaOwns.set(datepicker.id);
      });
      this._registerModel(datepicker.registerInput(this));
    }
  }
  _datepicker;
  _ariaOwns = signal(null, ...ngDevMode ? [{
    debugName: "_ariaOwns"
  }] : []);
  get min() {
    return this._min;
  }
  set min(value) {
    const validValue = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    if (!this._dateAdapter.sameDate(validValue, this._min)) {
      this._min = validValue;
      this._validatorOnChange();
    }
  }
  _min = null;
  get max() {
    return this._max;
  }
  set max(value) {
    const validValue = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    if (!this._dateAdapter.sameDate(validValue, this._max)) {
      this._max = validValue;
      this._validatorOnChange();
    }
  }
  _max = null;
  get dateFilter() {
    return this._dateFilter;
  }
  set dateFilter(value) {
    const wasMatchingValue = this._matchesFilter(this.value);
    this._dateFilter = value;
    if (this._matchesFilter(this.value) !== wasMatchingValue) {
      this._validatorOnChange();
    }
  }
  _dateFilter;
  _validator = null;
  constructor() {
    super();
    this._validator = Validators.compose(super._getValidators());
  }
  getConnectedOverlayOrigin() {
    return this._formField ? this._formField.getConnectedOverlayOrigin() : this._elementRef;
  }
  getOverlayLabelId() {
    if (this._formField) {
      return this._formField.getLabelId();
    }
    return this._elementRef.nativeElement.getAttribute("aria-labelledby");
  }
  getThemePalette() {
    return this._formField ? this._formField.color : void 0;
  }
  getStartValue() {
    return this.value;
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._closedSubscription.unsubscribe();
    this._openedSubscription.unsubscribe();
  }
  _openPopup() {
    if (this._datepicker) {
      this._datepicker.open();
    }
  }
  _getValueFromModel(modelValue) {
    return modelValue;
  }
  _assignValueToModel(value) {
    if (this._model) {
      this._model.updateSelection(value, this);
    }
  }
  _getMinDate() {
    return this._min;
  }
  _getMaxDate() {
    return this._max;
  }
  _getDateFilter() {
    return this._dateFilter;
  }
  _shouldHandleChangeEvent(event) {
    return event.source !== this;
  }
  static \u0275fac = function MatDatepickerInput_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDatepickerInput)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatDatepickerInput,
    selectors: [["input", "matDatepicker", ""]],
    hostAttrs: [1, "mat-datepicker-input"],
    hostVars: 6,
    hostBindings: function MatDatepickerInput_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("input", function MatDatepickerInput_input_HostBindingHandler($event) {
          return ctx._onInput($event);
        })("change", function MatDatepickerInput_change_HostBindingHandler() {
          return ctx._onChange();
        })("blur", function MatDatepickerInput_blur_HostBindingHandler() {
          return ctx._onBlur();
        })("keydown", function MatDatepickerInput_keydown_HostBindingHandler($event) {
          return ctx._onKeydown($event);
        });
      }
      if (rf & 2) {
        \u0275\u0275domProperty("disabled", ctx.disabled);
        \u0275\u0275attribute("aria-haspopup", ctx._datepicker ? "dialog" : null)("aria-owns", ctx._ariaOwns())("min", ctx.min ? ctx._dateAdapter.toIso8601(ctx.min) : null)("max", ctx.max ? ctx._dateAdapter.toIso8601(ctx.max) : null)("data-mat-calendar", ctx._datepicker ? ctx._datepicker.id : null);
      }
    },
    inputs: {
      matDatepicker: "matDatepicker",
      min: "min",
      max: "max",
      dateFilter: [0, "matDatepickerFilter", "dateFilter"]
    },
    exportAs: ["matDatepickerInput"],
    features: [\u0275\u0275ProvidersFeature([MAT_DATEPICKER_VALUE_ACCESSOR, MAT_DATEPICKER_VALIDATORS, {
      provide: MAT_INPUT_VALUE_ACCESSOR,
      useExisting: _MatDatepickerInput
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDatepickerInput, [{
    type: Directive,
    args: [{
      selector: "input[matDatepicker]",
      providers: [MAT_DATEPICKER_VALUE_ACCESSOR, MAT_DATEPICKER_VALIDATORS, {
        provide: MAT_INPUT_VALUE_ACCESSOR,
        useExisting: MatDatepickerInput
      }],
      host: {
        "class": "mat-datepicker-input",
        "[attr.aria-haspopup]": '_datepicker ? "dialog" : null',
        "[attr.aria-owns]": "_ariaOwns()",
        "[attr.min]": "min ? _dateAdapter.toIso8601(min) : null",
        "[attr.max]": "max ? _dateAdapter.toIso8601(max) : null",
        "[attr.data-mat-calendar]": "_datepicker ? _datepicker.id : null",
        "[disabled]": "disabled",
        "(input)": "_onInput($event)",
        "(change)": "_onChange()",
        "(blur)": "_onBlur()",
        "(keydown)": "_onKeydown($event)"
      },
      exportAs: "matDatepickerInput"
    }]
  }], () => [], {
    matDatepicker: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    dateFilter: [{
      type: Input,
      args: ["matDatepickerFilter"]
    }]
  });
})();
var MatDatepickerToggleIcon = class _MatDatepickerToggleIcon {
  static \u0275fac = function MatDatepickerToggleIcon_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDatepickerToggleIcon)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatDatepickerToggleIcon,
    selectors: [["", "matDatepickerToggleIcon", ""]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDatepickerToggleIcon, [{
    type: Directive,
    args: [{
      selector: "[matDatepickerToggleIcon]"
    }]
  }], null, null);
})();
var MatDatepickerToggle = class _MatDatepickerToggle {
  _intl = inject(MatDatepickerIntl);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _stateChanges = Subscription.EMPTY;
  datepicker;
  tabIndex = null;
  ariaLabel;
  get disabled() {
    if (this._disabled === void 0 && this.datepicker) {
      return this.datepicker.disabled;
    }
    return !!this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
  }
  _disabled;
  disableRipple = false;
  _customIcon;
  _button;
  constructor() {
    const defaultTabIndex = inject(new HostAttributeToken("tabindex"), {
      optional: true
    });
    const parsedTabIndex = Number(defaultTabIndex);
    this.tabIndex = parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null;
  }
  ngOnChanges(changes) {
    if (changes["datepicker"]) {
      this._watchStateChanges();
    }
  }
  ngOnDestroy() {
    this._stateChanges.unsubscribe();
  }
  ngAfterContentInit() {
    this._watchStateChanges();
  }
  _open(event) {
    if (this.datepicker && !this.disabled) {
      this.datepicker.open();
      event.stopPropagation();
    }
  }
  _watchStateChanges() {
    const datepickerStateChanged = this.datepicker ? this.datepicker.stateChanges : of();
    const inputStateChanged = this.datepicker && this.datepicker.datepickerInput ? this.datepicker.datepickerInput.stateChanges : of();
    const datepickerToggled = this.datepicker ? merge(this.datepicker.openedStream, this.datepicker.closedStream) : of();
    this._stateChanges.unsubscribe();
    this._stateChanges = merge(this._intl.changes, datepickerStateChanged, inputStateChanged, datepickerToggled).subscribe(() => this._changeDetectorRef.markForCheck());
  }
  static \u0275fac = function MatDatepickerToggle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDatepickerToggle)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    const _c0 = ["button"];
    const _c1 = [[["", "matDatepickerToggleIcon", ""]]];
    const _c2 = ["[matDatepickerToggleIcon]"];
    function MatDatepickerToggle_Conditional_2_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(0, "svg", 2);
        \u0275\u0275element(1, "path", 3);
        \u0275\u0275elementEnd();
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatDatepickerToggle,
      selectors: [["mat-datepicker-toggle"]],
      contentQueries: function MatDatepickerToggle_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, MatDatepickerToggleIcon, 5);
        }
        if (rf & 2) {
          let _t = void 0;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._customIcon = _t.first);
        }
      },
      viewQuery: function MatDatepickerToggle_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(_c0, 5);
        }
        if (rf & 2) {
          let _t = void 0;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._button = _t.first);
        }
      },
      hostAttrs: [1, "mat-datepicker-toggle"],
      hostVars: 8,
      hostBindings: function MatDatepickerToggle_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("click", function MatDatepickerToggle_click_HostBindingHandler($event) {
            return ctx._open($event);
          });
        }
        if (rf & 2) {
          \u0275\u0275attribute("tabindex", null)("data-mat-calendar", ctx.datepicker ? ctx.datepicker.id : null);
          \u0275\u0275classProp("mat-datepicker-toggle-active", ctx.datepicker && ctx.datepicker.opened)("mat-accent", ctx.datepicker && ctx.datepicker.color === "accent")("mat-warn", ctx.datepicker && ctx.datepicker.color === "warn");
        }
      },
      inputs: {
        datepicker: [0, "for", "datepicker"],
        tabIndex: "tabIndex",
        ariaLabel: [0, "aria-label", "ariaLabel"],
        disabled: [2, "disabled", "disabled", booleanAttribute],
        disableRipple: "disableRipple"
      },
      exportAs: ["matDatepickerToggle"],
      features: [\u0275\u0275NgOnChangesFeature],
      ngContentSelectors: _c2,
      decls: 4,
      vars: 7,
      consts: [["button", ""], ["matIconButton", "", "type", "button", 3, "tabIndex", "disabled", "disableRipple"], ["viewBox", "0 0 24 24", "width", "24px", "height", "24px", "fill", "currentColor", "focusable", "false", "aria-hidden", "true", 1, "mat-datepicker-toggle-default-icon"], ["d", "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"]],
      template: function MatDatepickerToggle_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef(_c1);
          \u0275\u0275elementStart(0, "button", 1, 0);
          \u0275\u0275conditionalCreate(2, MatDatepickerToggle_Conditional_2_Template, 2, 0, "svg", 2);
          \u0275\u0275projection(3);
          \u0275\u0275elementEnd();
        }
        if (rf & 2) {
          \u0275\u0275property("tabIndex", ctx.disabled ? -1 : ctx.tabIndex)("disabled", ctx.disabled)("disableRipple", ctx.disableRipple);
          \u0275\u0275attribute("aria-haspopup", ctx.datepicker ? "dialog" : null)("aria-label", ctx.ariaLabel || ctx._intl.openCalendarLabel)("aria-expanded", ctx.datepicker ? ctx.datepicker.opened : null);
          \u0275\u0275advance(2);
          \u0275\u0275conditional(!ctx._customIcon ? 2 : -1);
        }
      },
      dependencies: [MatIconButton],
      styles: [".mat-datepicker-toggle {\n  pointer-events: auto;\n  color: var(--%NS%mat-datepicker-toggle-icon-color, var(--%NS%mat-sys-on-surface-variant));\n}\n.mat-datepicker-toggle button {\n  color: inherit;\n}\n\n.mat-datepicker-toggle-active {\n  color: var(--%NS%mat-datepicker-toggle-active-state-icon-color, var(--%NS%mat-sys-primary));\n}\n\n@media (forced-colors: active) {\n  .mat-datepicker-toggle-default-icon {\n    color: CanvasText;\n  }\n}\n"],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDatepickerToggle, [{
    type: Component,
    args: [{
      selector: "mat-datepicker-toggle",
      host: {
        "class": "mat-datepicker-toggle",
        "[attr.tabindex]": "null",
        "[class.mat-datepicker-toggle-active]": "datepicker && datepicker.opened",
        "[class.mat-accent]": 'datepicker && datepicker.color === "accent"',
        "[class.mat-warn]": 'datepicker && datepicker.color === "warn"',
        "[attr.data-mat-calendar]": "datepicker ? datepicker.id : null",
        "(click)": "_open($event)"
      },
      exportAs: "matDatepickerToggle",
      encapsulation: ViewEncapsulation.None,
      imports: [MatIconButton],
      template: `<button
  #button
  matIconButton
  type="button"
  [attr.aria-haspopup]="datepicker ? 'dialog' : null"
  [attr.aria-label]="ariaLabel || _intl.openCalendarLabel"
  [tabIndex]="disabled ? -1 : tabIndex"
  [attr.aria-expanded]="datepicker ? datepicker.opened : null"
  [disabled]="disabled"
  [disableRipple]="disableRipple">

  @if (!_customIcon) {
    <svg
      class="mat-datepicker-toggle-default-icon"
      viewBox="0 0 24 24"
      width="24px"
      height="24px"
      fill="currentColor"
      focusable="false"
      aria-hidden="true">
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
    </svg>
  }

  <ng-content select="[matDatepickerToggleIcon]"></ng-content>
</button>
`,
      styles: [".mat-datepicker-toggle {\n  pointer-events: auto;\n  color: var(--mat-datepicker-toggle-icon-color, var(--mat-sys-on-surface-variant));\n}\n.mat-datepicker-toggle button {\n  color: inherit;\n}\n\n.mat-datepicker-toggle-active {\n  color: var(--mat-datepicker-toggle-active-state-icon-color, var(--mat-sys-primary));\n}\n\n@media (forced-colors: active) {\n  .mat-datepicker-toggle-default-icon {\n    color: CanvasText;\n  }\n}\n"]
    }]
  }], () => [], {
    datepicker: [{
      type: Input,
      args: ["for"]
    }],
    tabIndex: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disableRipple: [{
      type: Input
    }],
    _customIcon: [{
      type: ContentChild,
      args: [MatDatepickerToggleIcon]
    }],
    _button: [{
      type: ViewChild,
      args: ["button"]
    }]
  });
})();
var MatDateRangeInput = class _MatDateRangeInput {
  _changeDetectorRef = inject(ChangeDetectorRef);
  _elementRef = inject(ElementRef);
  _dateAdapter = inject(DateAdapter, {
    optional: true
  });
  _formField = inject(MAT_FORM_FIELD, {
    optional: true
  });
  _closedSubscription = Subscription.EMPTY;
  _openedSubscription = Subscription.EMPTY;
  _startInput;
  _endInput;
  get value() {
    return this._model ? this._model.selection : null;
  }
  id = inject(_IdGenerator).getId("mat-date-range-input-");
  focused = false;
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }
  controlType = "mat-date-range-input";
  get placeholder() {
    const start = this._startInput?._getPlaceholder() || "";
    const end = this._endInput?._getPlaceholder() || "";
    return start || end ? `${start} ${this.separator} ${end}` : "";
  }
  get rangePicker() {
    return this._rangePicker;
  }
  set rangePicker(rangePicker) {
    if (rangePicker) {
      this._model = rangePicker.registerInput(this);
      this._rangePicker = rangePicker;
      this._closedSubscription.unsubscribe();
      this._openedSubscription.unsubscribe();
      this._ariaOwns.set(this.rangePicker.opened ? rangePicker.id : null);
      this._closedSubscription = rangePicker.closedStream.subscribe(() => {
        this._startInput?._onTouched();
        this._endInput?._onTouched();
        this._ariaOwns.set(null);
      });
      this._openedSubscription = rangePicker.openedStream.subscribe(() => {
        this._ariaOwns.set(rangePicker.id);
      });
      this._registerModel(this._model);
    }
  }
  _rangePicker;
  _ariaOwns = signal(null, ...ngDevMode ? [{
    debugName: "_ariaOwns"
  }] : []);
  get required() {
    return this._required ?? (this._isTargetRequired(this) || this._isTargetRequired(this._startInput) || this._isTargetRequired(this._endInput)) ?? false;
  }
  set required(value) {
    this._required = value;
  }
  _required;
  get dateFilter() {
    return this._dateFilter;
  }
  set dateFilter(value) {
    const start = this._startInput;
    const end = this._endInput;
    const wasMatchingStart = start && start._matchesFilter(start.value);
    const wasMatchingEnd = end && end._matchesFilter(start.value);
    this._dateFilter = value;
    if (start && start._matchesFilter(start.value) !== wasMatchingStart) {
      start._validatorOnChange();
    }
    if (end && end._matchesFilter(end.value) !== wasMatchingEnd) {
      end._validatorOnChange();
    }
  }
  _dateFilter;
  get min() {
    return this._min;
  }
  set min(value) {
    const validValue = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    if (!this._dateAdapter.sameDate(validValue, this._min)) {
      this._min = validValue;
      this._revalidate();
    }
  }
  _min = null;
  get max() {
    return this._max;
  }
  set max(value) {
    const validValue = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    if (!this._dateAdapter.sameDate(validValue, this._max)) {
      this._max = validValue;
      this._revalidate();
    }
  }
  _max = null;
  get disabled() {
    return this._startInput && this._endInput ? this._startInput.disabled && this._endInput.disabled : this._groupDisabled;
  }
  set disabled(value) {
    if (value !== this._groupDisabled) {
      this._groupDisabled = value;
      this.stateChanges.next(void 0);
    }
  }
  _groupDisabled = false;
  get errorState() {
    if (this._startInput && this._endInput) {
      return this._startInput.errorState || this._endInput.errorState;
    }
    return false;
  }
  get empty() {
    const startEmpty = this._startInput ? this._startInput.isEmpty() : false;
    const endEmpty = this._endInput ? this._endInput.isEmpty() : false;
    return startEmpty && endEmpty;
  }
  _ariaDescribedBy = null;
  _model;
  separator = "\u2013";
  comparisonStart = null;
  comparisonEnd = null;
  ngControl;
  stateChanges = new Subject();
  disableAutomaticLabeling = true;
  constructor() {
    if (!this._dateAdapter && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw createMissingDateImplError("DateAdapter");
    }
    if (this._formField?._elementRef.nativeElement.classList.contains("mat-mdc-form-field")) {
      this._elementRef.nativeElement.classList.add("mat-mdc-input-element", "mat-mdc-form-field-input-control", "mdc-text-field__input");
    }
    this.ngControl = inject(ControlContainer, {
      optional: true,
      self: true
    });
  }
  get describedByIds() {
    const element = this._elementRef.nativeElement;
    const existingDescribedBy = element.getAttribute("aria-describedby");
    return existingDescribedBy?.split(" ") || [];
  }
  setDescribedByIds(ids) {
    this._ariaDescribedBy = ids.length ? ids.join(" ") : null;
  }
  onContainerClick() {
    if (!this.focused && !this.disabled) {
      if (!this._model || !this._model.selection.start) {
        this._startInput.focus();
      } else {
        this._endInput.focus();
      }
    }
  }
  ngAfterContentInit() {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!this._startInput) {
        throw Error("mat-date-range-input must contain a matStartDate input");
      }
      if (!this._endInput) {
        throw Error("mat-date-range-input must contain a matEndDate input");
      }
    }
    if (this._model) {
      this._registerModel(this._model);
    }
    merge(this._startInput.stateChanges, this._endInput.stateChanges).subscribe(() => {
      this.stateChanges.next(void 0);
    });
  }
  ngOnChanges(changes) {
    if (dateInputsHaveChanged(changes, this._dateAdapter)) {
      this.stateChanges.next(void 0);
    }
  }
  ngOnDestroy() {
    this._closedSubscription.unsubscribe();
    this._openedSubscription.unsubscribe();
    this.stateChanges.complete();
  }
  getStartValue() {
    return this.value ? this.value.start : null;
  }
  getThemePalette() {
    return this._formField ? this._formField.color : void 0;
  }
  getConnectedOverlayOrigin() {
    return this._formField ? this._formField.getConnectedOverlayOrigin() : this._elementRef;
  }
  getOverlayLabelId() {
    return this._formField ? this._formField.getLabelId() : null;
  }
  _getInputMirrorValue(part) {
    const input2 = part === "start" ? this._startInput : this._endInput;
    return input2 ? input2.getMirrorValue() : "";
  }
  _shouldHidePlaceholders() {
    return this._startInput ? !this._startInput.isEmpty() : false;
  }
  _handleChildValueChange() {
    this.stateChanges.next(void 0);
    this._changeDetectorRef.markForCheck();
  }
  _openDatepicker() {
    if (this._rangePicker) {
      this._rangePicker.open();
    }
  }
  _shouldHideSeparator() {
    return (!this._formField || this._formField.getLabelId() && !this._formField._shouldLabelFloat()) && this.empty;
  }
  _getAriaLabelledby() {
    const formField = this._formField;
    return formField && formField._hasFloatingLabel() ? formField._labelId : null;
  }
  _getStartDateAccessibleName() {
    return this._startInput._getAccessibleName();
  }
  _getEndDateAccessibleName() {
    return this._endInput._getAccessibleName();
  }
  _updateFocus(origin) {
    this.focused = origin !== null;
    this.stateChanges.next();
  }
  _revalidate() {
    if (this._startInput) {
      this._startInput._validatorOnChange();
    }
    if (this._endInput) {
      this._endInput._validatorOnChange();
    }
  }
  _registerModel(model) {
    if (this._startInput) {
      this._startInput._registerModel(model);
    }
    if (this._endInput) {
      this._endInput._registerModel(model);
    }
  }
  _isTargetRequired(target) {
    return target?.ngControl?.control?.hasValidator(Validators.required);
  }
  static \u0275fac = function MatDateRangeInput_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDateRangeInput)();
  };
  static \u0275cmp = (function() {
    const _c0 = [[["input", "matStartDate", ""]], [["input", "matEndDate", ""]]];
    const _c1 = ["input[matStartDate]", "input[matEndDate]"];
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatDateRangeInput,
      selectors: [["mat-date-range-input"]],
      hostAttrs: ["role", "group", 1, "mat-date-range-input"],
      hostVars: 8,
      hostBindings: function MatDateRangeInput_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("id", ctx.id)("aria-labelledby", ctx._getAriaLabelledby())("aria-describedby", ctx._ariaDescribedBy)("data-mat-calendar", ctx.rangePicker ? ctx.rangePicker.id : null);
          \u0275\u0275classProp("mat-date-range-input-hide-placeholders", ctx._shouldHidePlaceholders())("mat-date-range-input-required", ctx.required);
        }
      },
      inputs: {
        rangePicker: "rangePicker",
        required: [2, "required", "required", booleanAttribute],
        dateFilter: "dateFilter",
        min: "min",
        max: "max",
        disabled: [2, "disabled", "disabled", booleanAttribute],
        separator: "separator",
        comparisonStart: "comparisonStart",
        comparisonEnd: "comparisonEnd"
      },
      exportAs: ["matDateRangeInput"],
      features: [\u0275\u0275ProvidersFeature([{
        provide: MatFormFieldControl,
        useExisting: _MatDateRangeInput
      }]), \u0275\u0275NgOnChangesFeature],
      ngContentSelectors: _c1,
      decls: 11,
      vars: 5,
      consts: [["cdkMonitorSubtreeFocus", "", 1, "mat-date-range-input-container", 3, "cdkFocusChange"], [1, "mat-date-range-input-wrapper"], ["aria-hidden", "true", 1, "mat-date-range-input-mirror"], [1, "mat-date-range-input-separator"], [1, "mat-date-range-input-wrapper", "mat-date-range-input-end-wrapper"]],
      template: function MatDateRangeInput_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef(_c0);
          \u0275\u0275elementStart(0, "div", 0);
          \u0275\u0275listener("cdkFocusChange", function MatDateRangeInput_Template_div_cdkFocusChange_0_listener($event) {
            return ctx._updateFocus($event);
          });
          \u0275\u0275elementStart(1, "div", 1);
          \u0275\u0275projection(2);
          \u0275\u0275elementStart(3, "span", 2);
          \u0275\u0275text(4);
          \u0275\u0275elementEnd()();
          \u0275\u0275elementStart(5, "span", 3);
          \u0275\u0275text(6);
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(7, "div", 4);
          \u0275\u0275projection(8, 1);
          \u0275\u0275elementStart(9, "span", 2);
          \u0275\u0275text(10);
          \u0275\u0275elementEnd()()();
        }
        if (rf & 2) {
          \u0275\u0275advance(4);
          \u0275\u0275textInterpolate(ctx._getInputMirrorValue("start"));
          \u0275\u0275advance();
          \u0275\u0275classProp("mat-date-range-input-separator-hidden", ctx._shouldHideSeparator());
          \u0275\u0275advance();
          \u0275\u0275textInterpolate(ctx.separator);
          \u0275\u0275advance(4);
          \u0275\u0275textInterpolate(ctx._getInputMirrorValue("end"));
        }
      },
      dependencies: [CdkMonitorFocus],
      styles: [".mat-date-range-input {\n  display: block;\n  width: 100%;\n}\n\n.mat-date-range-input-container {\n  display: flex;\n  align-items: center;\n}\n\n.mat-date-range-input-separator {\n  transition: opacity 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);\n  margin: 0 4px;\n  color: var(--%NS%mat-datepicker-range-input-separator-color, var(--%NS%mat-sys-on-surface));\n}\n.mat-form-field-disabled .mat-date-range-input-separator {\n  color: var(--%NS%mat-datepicker-range-input-disabled-state-separator-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n._mat-animation-noopable .mat-date-range-input-separator {\n  transition: none;\n}\n\n.mat-date-range-input-separator-hidden {\n  -webkit-user-select: none;\n  user-select: none;\n  opacity: 0;\n  transition: none;\n}\n\n.mat-date-range-input-wrapper {\n  position: relative;\n  overflow: hidden;\n  max-width: calc(50% - 4px);\n}\n\n.mat-date-range-input-end-wrapper {\n  flex-grow: 1;\n}\n\n.mat-date-range-input-inner {\n  position: absolute;\n  top: 0;\n  left: 0;\n  font: inherit;\n  background: transparent;\n  color: currentColor;\n  border: none;\n  outline: none;\n  padding: 0;\n  margin: 0;\n  vertical-align: bottom;\n  text-align: inherit;\n  -webkit-appearance: none;\n  width: 100%;\n  height: 100%;\n}\n.mat-date-range-input-inner:-moz-ui-invalid {\n  box-shadow: none;\n}\n.mat-date-range-input-inner::placeholder {\n  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.mat-date-range-input-inner::-moz-placeholder {\n  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.mat-date-range-input-inner::-webkit-input-placeholder {\n  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.mat-date-range-input-inner:-ms-input-placeholder {\n  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.mat-date-range-input-inner[disabled] {\n  color: var(--%NS%mat-datepicker-range-input-disabled-state-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));\n}\n.mat-form-field-hide-placeholder .mat-date-range-input-inner::placeholder, .mat-date-range-input-hide-placeholders .mat-date-range-input-inner::placeholder {\n  -webkit-user-select: none;\n  user-select: none;\n  color: transparent !important;\n  -webkit-text-fill-color: transparent;\n  transition: none;\n}\n@media (forced-colors: active) {\n  .mat-form-field-hide-placeholder .mat-date-range-input-inner::placeholder, .mat-date-range-input-hide-placeholders .mat-date-range-input-inner::placeholder {\n    opacity: 0;\n  }\n}\n.mat-form-field-hide-placeholder .mat-date-range-input-inner::-moz-placeholder, .mat-date-range-input-hide-placeholders .mat-date-range-input-inner::-moz-placeholder {\n  -webkit-user-select: none;\n  user-select: none;\n  color: transparent !important;\n  -webkit-text-fill-color: transparent;\n  transition: none;\n}\n@media (forced-colors: active) {\n  .mat-form-field-hide-placeholder .mat-date-range-input-inner::-moz-placeholder, .mat-date-range-input-hide-placeholders .mat-date-range-input-inner::-moz-placeholder {\n    opacity: 0;\n  }\n}\n.mat-form-field-hide-placeholder .mat-date-range-input-inner::-webkit-input-placeholder, .mat-date-range-input-hide-placeholders .mat-date-range-input-inner::-webkit-input-placeholder {\n  -webkit-user-select: none;\n  user-select: none;\n  color: transparent !important;\n  -webkit-text-fill-color: transparent;\n  transition: none;\n}\n@media (forced-colors: active) {\n  .mat-form-field-hide-placeholder .mat-date-range-input-inner::-webkit-input-placeholder, .mat-date-range-input-hide-placeholders .mat-date-range-input-inner::-webkit-input-placeholder {\n    opacity: 0;\n  }\n}\n.mat-form-field-hide-placeholder .mat-date-range-input-inner:-ms-input-placeholder, .mat-date-range-input-hide-placeholders .mat-date-range-input-inner:-ms-input-placeholder {\n  -webkit-user-select: none;\n  user-select: none;\n  color: transparent !important;\n  -webkit-text-fill-color: transparent;\n  transition: none;\n}\n@media (forced-colors: active) {\n  .mat-form-field-hide-placeholder .mat-date-range-input-inner:-ms-input-placeholder, .mat-date-range-input-hide-placeholders .mat-date-range-input-inner:-ms-input-placeholder {\n    opacity: 0;\n  }\n}\n._mat-animation-noopable .mat-date-range-input-inner::placeholder {\n  transition: none;\n}\n._mat-animation-noopable .mat-date-range-input-inner::-moz-placeholder {\n  transition: none;\n}\n._mat-animation-noopable .mat-date-range-input-inner::-webkit-input-placeholder {\n  transition: none;\n}\n._mat-animation-noopable .mat-date-range-input-inner:-ms-input-placeholder {\n  transition: none;\n}\n\n.mat-date-range-input-mirror {\n  -webkit-user-select: none;\n  user-select: none;\n  visibility: hidden;\n  white-space: nowrap;\n  display: inline-block;\n  min-width: 2px;\n}\n\n.mat-mdc-form-field-type-mat-date-range-input .mat-mdc-form-field-infix {\n  width: 200px;\n}\n"],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDateRangeInput, [{
    type: Component,
    args: [{
      selector: "mat-date-range-input",
      exportAs: "matDateRangeInput",
      host: {
        "class": "mat-date-range-input",
        "[class.mat-date-range-input-hide-placeholders]": "_shouldHidePlaceholders()",
        "[class.mat-date-range-input-required]": "required",
        "[attr.id]": "id",
        "role": "group",
        "[attr.aria-labelledby]": "_getAriaLabelledby()",
        "[attr.aria-describedby]": "_ariaDescribedBy",
        "[attr.data-mat-calendar]": "rangePicker ? rangePicker.id : null"
      },
      encapsulation: ViewEncapsulation.None,
      providers: [{
        provide: MatFormFieldControl,
        useExisting: MatDateRangeInput
      }],
      imports: [CdkMonitorFocus],
      template: `<div
  class="mat-date-range-input-container"
  cdkMonitorSubtreeFocus
  (cdkFocusChange)="_updateFocus($event)">
  <div class="mat-date-range-input-wrapper">
    <ng-content select="input[matStartDate]"></ng-content>
    <span
      class="mat-date-range-input-mirror"
      aria-hidden="true">{{_getInputMirrorValue('start')}}</span>
  </div>

  <span
    class="mat-date-range-input-separator"
    [class.mat-date-range-input-separator-hidden]="_shouldHideSeparator()">{{separator}}</span>

  <div class="mat-date-range-input-wrapper mat-date-range-input-end-wrapper">
    <ng-content select="input[matEndDate]"></ng-content>
    <span
      class="mat-date-range-input-mirror"
      aria-hidden="true">{{_getInputMirrorValue('end')}}</span>
  </div>
</div>

`,
      styles: [".mat-date-range-input {\n  display: block;\n  width: 100%;\n}\n\n.mat-date-range-input-container {\n  display: flex;\n  align-items: center;\n}\n\n.mat-date-range-input-separator {\n  transition: opacity 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);\n  margin: 0 4px;\n  color: var(--mat-datepicker-range-input-separator-color, var(--mat-sys-on-surface));\n}\n.mat-form-field-disabled .mat-date-range-input-separator {\n  color: var(--mat-datepicker-range-input-disabled-state-separator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n._mat-animation-noopable .mat-date-range-input-separator {\n  transition: none;\n}\n\n.mat-date-range-input-separator-hidden {\n  -webkit-user-select: none;\n  user-select: none;\n  opacity: 0;\n  transition: none;\n}\n\n.mat-date-range-input-wrapper {\n  position: relative;\n  overflow: hidden;\n  max-width: calc(50% - 4px);\n}\n\n.mat-date-range-input-end-wrapper {\n  flex-grow: 1;\n}\n\n.mat-date-range-input-inner {\n  position: absolute;\n  top: 0;\n  left: 0;\n  font: inherit;\n  background: transparent;\n  color: currentColor;\n  border: none;\n  outline: none;\n  padding: 0;\n  margin: 0;\n  vertical-align: bottom;\n  text-align: inherit;\n  -webkit-appearance: none;\n  width: 100%;\n  height: 100%;\n}\n.mat-date-range-input-inner:-moz-ui-invalid {\n  box-shadow: none;\n}\n.mat-date-range-input-inner::placeholder {\n  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.mat-date-range-input-inner::-moz-placeholder {\n  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.mat-date-range-input-inner::-webkit-input-placeholder {\n  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.mat-date-range-input-inner:-ms-input-placeholder {\n  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.mat-date-range-input-inner[disabled] {\n  color: var(--mat-datepicker-range-input-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));\n}\n.mat-form-field-hide-placeholder .mat-date-range-input-inner::placeholder, .mat-date-range-input-hide-placeholders .mat-date-range-input-inner::placeholder {\n  -webkit-user-select: none;\n  user-select: none;\n  color: transparent !important;\n  -webkit-text-fill-color: transparent;\n  transition: none;\n}\n@media (forced-colors: active) {\n  .mat-form-field-hide-placeholder .mat-date-range-input-inner::placeholder, .mat-date-range-input-hide-placeholders .mat-date-range-input-inner::placeholder {\n    opacity: 0;\n  }\n}\n.mat-form-field-hide-placeholder .mat-date-range-input-inner::-moz-placeholder, .mat-date-range-input-hide-placeholders .mat-date-range-input-inner::-moz-placeholder {\n  -webkit-user-select: none;\n  user-select: none;\n  color: transparent !important;\n  -webkit-text-fill-color: transparent;\n  transition: none;\n}\n@media (forced-colors: active) {\n  .mat-form-field-hide-placeholder .mat-date-range-input-inner::-moz-placeholder, .mat-date-range-input-hide-placeholders .mat-date-range-input-inner::-moz-placeholder {\n    opacity: 0;\n  }\n}\n.mat-form-field-hide-placeholder .mat-date-range-input-inner::-webkit-input-placeholder, .mat-date-range-input-hide-placeholders .mat-date-range-input-inner::-webkit-input-placeholder {\n  -webkit-user-select: none;\n  user-select: none;\n  color: transparent !important;\n  -webkit-text-fill-color: transparent;\n  transition: none;\n}\n@media (forced-colors: active) {\n  .mat-form-field-hide-placeholder .mat-date-range-input-inner::-webkit-input-placeholder, .mat-date-range-input-hide-placeholders .mat-date-range-input-inner::-webkit-input-placeholder {\n    opacity: 0;\n  }\n}\n.mat-form-field-hide-placeholder .mat-date-range-input-inner:-ms-input-placeholder, .mat-date-range-input-hide-placeholders .mat-date-range-input-inner:-ms-input-placeholder {\n  -webkit-user-select: none;\n  user-select: none;\n  color: transparent !important;\n  -webkit-text-fill-color: transparent;\n  transition: none;\n}\n@media (forced-colors: active) {\n  .mat-form-field-hide-placeholder .mat-date-range-input-inner:-ms-input-placeholder, .mat-date-range-input-hide-placeholders .mat-date-range-input-inner:-ms-input-placeholder {\n    opacity: 0;\n  }\n}\n._mat-animation-noopable .mat-date-range-input-inner::placeholder {\n  transition: none;\n}\n._mat-animation-noopable .mat-date-range-input-inner::-moz-placeholder {\n  transition: none;\n}\n._mat-animation-noopable .mat-date-range-input-inner::-webkit-input-placeholder {\n  transition: none;\n}\n._mat-animation-noopable .mat-date-range-input-inner:-ms-input-placeholder {\n  transition: none;\n}\n\n.mat-date-range-input-mirror {\n  -webkit-user-select: none;\n  user-select: none;\n  visibility: hidden;\n  white-space: nowrap;\n  display: inline-block;\n  min-width: 2px;\n}\n\n.mat-mdc-form-field-type-mat-date-range-input .mat-mdc-form-field-infix {\n  width: 200px;\n}\n"]
    }]
  }], () => [], {
    rangePicker: [{
      type: Input
    }],
    required: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    dateFilter: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    separator: [{
      type: Input
    }],
    comparisonStart: [{
      type: Input
    }],
    comparisonEnd: [{
      type: Input
    }]
  });
})();
function _computeAriaAccessibleName(element) {
  return _computeAriaAccessibleNameInternal(element, true);
}
function ssrSafeIsElement(node) {
  return node.nodeType === Node.ELEMENT_NODE;
}
function ssrSafeIsHTMLInputElement(node) {
  return node.nodeName === "INPUT";
}
function ssrSafeIsHTMLTextAreaElement(node) {
  return node.nodeName === "TEXTAREA";
}
function _computeAriaAccessibleNameInternal(currentNode, isDirectlyReferenced) {
  if (ssrSafeIsElement(currentNode) && isDirectlyReferenced) {
    const labelledbyIds = currentNode.getAttribute?.("aria-labelledby")?.split(/\s+/g) || [];
    const validIdRefs = labelledbyIds.reduce((validIds, id) => {
      const elem = document.getElementById(id);
      if (elem) {
        validIds.push(elem);
      }
      return validIds;
    }, []);
    if (validIdRefs.length) {
      return validIdRefs.map((idRef) => {
        return _computeAriaAccessibleNameInternal(idRef, false);
      }).join(" ");
    }
  }
  if (ssrSafeIsElement(currentNode)) {
    const ariaLabel = currentNode.getAttribute("aria-label")?.trim();
    if (ariaLabel) {
      return ariaLabel;
    }
  }
  if (ssrSafeIsHTMLInputElement(currentNode) || ssrSafeIsHTMLTextAreaElement(currentNode)) {
    if (currentNode.labels?.length) {
      return Array.from(currentNode.labels).map((x) => _computeAriaAccessibleNameInternal(x, false)).join(" ");
    }
    const placeholder = currentNode.getAttribute("placeholder")?.trim();
    if (placeholder) {
      return placeholder;
    }
    const title = currentNode.getAttribute("title")?.trim();
    if (title) {
      return title;
    }
  }
  return (currentNode.textContent || "").replace(/\s+/g, " ").trim();
}
var MatDateRangeInputPartBase = class _MatDateRangeInputPartBase extends MatDatepickerInputBase {
  _rangeInput = inject(MatDateRangeInput);
  _elementRef = inject(ElementRef);
  _defaultErrorStateMatcher = inject(ErrorStateMatcher);
  _injector = inject(Injector);
  _rawValue = signal("", ...ngDevMode ? [{
    debugName: "_rawValue"
  }] : []);
  _parentForm = inject(NgForm, {
    optional: true
  });
  _parentFormGroup = inject(FormGroupDirective, {
    optional: true
  });
  ngControl;
  _dir = inject(Directionality, {
    optional: true
  });
  _errorStateTracker;
  get errorStateMatcher() {
    return this._errorStateTracker.matcher;
  }
  set errorStateMatcher(value) {
    this._errorStateTracker.matcher = value;
  }
  get errorState() {
    return this._errorStateTracker.errorState;
  }
  set errorState(value) {
    this._errorStateTracker.errorState = value;
  }
  constructor() {
    super();
    this._errorStateTracker = new _ErrorStateTracker(this._defaultErrorStateMatcher, null, this._parentFormGroup, this._parentForm, this.stateChanges);
  }
  ngOnInit() {
    const ngControl = this._injector.get(NgControl, null, {
      optional: true,
      self: true
    });
    this._errorStateTracker.formField = this._injector.get(FORM_FIELD, null, {
      optional: true,
      self: true
    });
    if (ngControl) {
      this.ngControl = ngControl;
      this._errorStateTracker.ngControl = ngControl;
    }
  }
  ngAfterContentInit() {
    this._register();
  }
  ngDoCheck() {
    if (this.ngControl) {
      this.updateErrorState();
    }
    this._rawValue.set(this._elementRef.nativeElement.value);
  }
  isEmpty() {
    return this._rawValue().length === 0;
  }
  _getPlaceholder() {
    return this._elementRef.nativeElement.placeholder;
  }
  focus() {
    this._elementRef.nativeElement.focus();
  }
  getMirrorValue() {
    const value = this._rawValue();
    return value.length > 0 ? value : this._getPlaceholder();
  }
  updateErrorState() {
    this._errorStateTracker.updateErrorState();
  }
  _onInput(event) {
    super._onInput(event);
    this._rangeInput._handleChildValueChange();
  }
  _openPopup() {
    this._rangeInput._openDatepicker();
  }
  _getMinDate() {
    return this._rangeInput.min;
  }
  _getMaxDate() {
    return this._rangeInput.max;
  }
  _getDateFilter() {
    return this._rangeInput.dateFilter;
  }
  _parentDisabled() {
    return this._rangeInput._groupDisabled;
  }
  _shouldHandleChangeEvent({
    source
  }) {
    return source !== this._rangeInput._startInput && source !== this._rangeInput._endInput;
  }
  _assignValueProgrammatically(value, reformat) {
    super._assignValueProgrammatically(value, reformat);
    const opposite = this === this._rangeInput._startInput ? this._rangeInput._endInput : this._rangeInput._startInput;
    opposite?._validatorOnChange();
    this._rawValue.set(this._elementRef.nativeElement.value);
  }
  _formatValue(value) {
    super._formatValue(value);
    this._rangeInput._handleChildValueChange();
  }
  _getAccessibleName() {
    return _computeAriaAccessibleName(this._elementRef.nativeElement);
  }
  static \u0275fac = function MatDateRangeInputPartBase_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDateRangeInputPartBase)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatDateRangeInputPartBase,
    inputs: {
      errorStateMatcher: "errorStateMatcher"
    },
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDateRangeInputPartBase, [{
    type: Directive
  }], () => [], {
    errorStateMatcher: [{
      type: Input
    }]
  });
})();
var MatStartDate = class _MatStartDate extends MatDateRangeInputPartBase {
  _startValidator = (control) => {
    const start = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(control.value));
    const end = this._model ? this._model.selection.end : null;
    return !start || !end || this._dateAdapter.compareDate(start, end) <= 0 ? null : {
      "matStartDateInvalid": {
        "end": end,
        "actual": start
      }
    };
  };
  _validator = Validators.compose([...super._getValidators(), this._startValidator]);
  _register() {
    this._rangeInput._startInput = this;
  }
  _getValueFromModel(modelValue) {
    return modelValue.start;
  }
  _shouldHandleChangeEvent(change) {
    if (!super._shouldHandleChangeEvent(change)) {
      return false;
    } else {
      return !change.oldValue?.start ? !!change.selection.start : !change.selection.start || !!this._dateAdapter.compareDate(change.oldValue.start, change.selection.start);
    }
  }
  _assignValueToModel(value) {
    if (this._model) {
      const range2 = new DateRange(value, this._model.selection.end);
      this._model.updateSelection(range2, this);
      this._rangeInput._handleChildValueChange();
    }
  }
  _onKeydown(event) {
    const endInput = this._rangeInput._endInput;
    const element = this._elementRef.nativeElement;
    const isLtr = this._dir?.value !== "rtl";
    if ((event.keyCode === RIGHT_ARROW && isLtr || event.keyCode === LEFT_ARROW && !isLtr) && element.selectionStart === element.value.length && element.selectionEnd === element.value.length) {
      event.preventDefault();
      endInput._elementRef.nativeElement.setSelectionRange(0, 0);
      endInput.focus();
    } else {
      super._onKeydown(event);
    }
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatStartDate_BaseFactory = void 0;
    return function MatStartDate_Factory(__ngFactoryType__) {
      return (\u0275MatStartDate_BaseFactory || (\u0275MatStartDate_BaseFactory = \u0275\u0275getInheritedFactory(_MatStartDate)))(__ngFactoryType__ || _MatStartDate);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatStartDate,
    selectors: [["input", "matStartDate", ""]],
    hostAttrs: ["type", "text", 1, "mat-start-date", "mat-date-range-input-inner"],
    hostVars: 5,
    hostBindings: function MatStartDate_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("input", function MatStartDate_input_HostBindingHandler($event) {
          return ctx._onInput($event);
        })("change", function MatStartDate_change_HostBindingHandler() {
          return ctx._onChange();
        })("keydown", function MatStartDate_keydown_HostBindingHandler($event) {
          return ctx._onKeydown($event);
        })("blur", function MatStartDate_blur_HostBindingHandler() {
          return ctx._onBlur();
        });
      }
      if (rf & 2) {
        \u0275\u0275domProperty("disabled", ctx.disabled);
        \u0275\u0275attribute("aria-haspopup", ctx._rangeInput.rangePicker ? "dialog" : null)("aria-owns", ctx._rangeInput._ariaOwns() || null)("min", ctx._getMinDate() ? ctx._dateAdapter.toIso8601(ctx._getMinDate()) : null)("max", ctx._getMaxDate() ? ctx._dateAdapter.toIso8601(ctx._getMaxDate()) : null);
      }
    },
    outputs: {
      dateChange: "dateChange",
      dateInput: "dateInput"
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: _MatStartDate,
      multi: true
    }, {
      provide: NG_VALIDATORS,
      useExisting: _MatStartDate,
      multi: true
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStartDate, [{
    type: Directive,
    args: [{
      selector: "input[matStartDate]",
      host: {
        "class": "mat-start-date mat-date-range-input-inner",
        "[disabled]": "disabled",
        "(input)": "_onInput($event)",
        "(change)": "_onChange()",
        "(keydown)": "_onKeydown($event)",
        "[attr.aria-haspopup]": '_rangeInput.rangePicker ? "dialog" : null',
        "[attr.aria-owns]": "_rangeInput._ariaOwns() || null",
        "[attr.min]": "_getMinDate() ? _dateAdapter.toIso8601(_getMinDate()!) : null",
        "[attr.max]": "_getMaxDate() ? _dateAdapter.toIso8601(_getMaxDate()!) : null",
        "(blur)": "_onBlur()",
        "type": "text"
      },
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: MatStartDate,
        multi: true
      }, {
        provide: NG_VALIDATORS,
        useExisting: MatStartDate,
        multi: true
      }],
      outputs: ["dateChange", "dateInput"]
    }]
  }], null, null);
})();
var MatEndDate = class _MatEndDate extends MatDateRangeInputPartBase {
  _endValidator = (control) => {
    const end = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(control.value));
    const start = this._model ? this._model.selection.start : null;
    return !end || !start || this._dateAdapter.compareDate(end, start) >= 0 ? null : {
      "matEndDateInvalid": {
        "start": start,
        "actual": end
      }
    };
  };
  _register() {
    this._rangeInput._endInput = this;
  }
  _validator = Validators.compose([...super._getValidators(), this._endValidator]);
  _getValueFromModel(modelValue) {
    return modelValue.end;
  }
  _shouldHandleChangeEvent(change) {
    if (!super._shouldHandleChangeEvent(change)) {
      return false;
    } else {
      return !change.oldValue?.end ? !!change.selection.end : !change.selection.end || !!this._dateAdapter.compareDate(change.oldValue.end, change.selection.end);
    }
  }
  _assignValueToModel(value) {
    if (this._model) {
      const range2 = new DateRange(this._model.selection.start, value);
      this._model.updateSelection(range2, this);
    }
  }
  _moveCaretToEndOfStartInput() {
    const startInput = this._rangeInput._startInput._elementRef.nativeElement;
    const value = startInput.value;
    if (value.length > 0) {
      startInput.setSelectionRange(value.length, value.length);
    }
    startInput.focus();
  }
  _onKeydown(event) {
    const element = this._elementRef.nativeElement;
    const isLtr = this._dir?.value !== "rtl";
    if (event.keyCode === BACKSPACE && !element.value) {
      this._moveCaretToEndOfStartInput();
    } else if ((event.keyCode === LEFT_ARROW && isLtr || event.keyCode === RIGHT_ARROW && !isLtr) && element.selectionStart === 0 && element.selectionEnd === 0) {
      event.preventDefault();
      this._moveCaretToEndOfStartInput();
    } else {
      super._onKeydown(event);
    }
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatEndDate_BaseFactory = void 0;
    return function MatEndDate_Factory(__ngFactoryType__) {
      return (\u0275MatEndDate_BaseFactory || (\u0275MatEndDate_BaseFactory = \u0275\u0275getInheritedFactory(_MatEndDate)))(__ngFactoryType__ || _MatEndDate);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatEndDate,
    selectors: [["input", "matEndDate", ""]],
    hostAttrs: ["type", "text", 1, "mat-end-date", "mat-date-range-input-inner"],
    hostVars: 5,
    hostBindings: function MatEndDate_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("input", function MatEndDate_input_HostBindingHandler($event) {
          return ctx._onInput($event);
        })("change", function MatEndDate_change_HostBindingHandler() {
          return ctx._onChange();
        })("keydown", function MatEndDate_keydown_HostBindingHandler($event) {
          return ctx._onKeydown($event);
        })("blur", function MatEndDate_blur_HostBindingHandler() {
          return ctx._onBlur();
        });
      }
      if (rf & 2) {
        \u0275\u0275domProperty("disabled", ctx.disabled);
        \u0275\u0275attribute("aria-haspopup", ctx._rangeInput.rangePicker ? "dialog" : null)("aria-owns", ctx._rangeInput._ariaOwns() || null)("min", ctx._getMinDate() ? ctx._dateAdapter.toIso8601(ctx._getMinDate()) : null)("max", ctx._getMaxDate() ? ctx._dateAdapter.toIso8601(ctx._getMaxDate()) : null);
      }
    },
    outputs: {
      dateChange: "dateChange",
      dateInput: "dateInput"
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: _MatEndDate,
      multi: true
    }, {
      provide: NG_VALIDATORS,
      useExisting: _MatEndDate,
      multi: true
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatEndDate, [{
    type: Directive,
    args: [{
      selector: "input[matEndDate]",
      host: {
        "class": "mat-end-date mat-date-range-input-inner",
        "[disabled]": "disabled",
        "(input)": "_onInput($event)",
        "(change)": "_onChange()",
        "(keydown)": "_onKeydown($event)",
        "[attr.aria-haspopup]": '_rangeInput.rangePicker ? "dialog" : null',
        "[attr.aria-owns]": "_rangeInput._ariaOwns() || null",
        "[attr.min]": "_getMinDate() ? _dateAdapter.toIso8601(_getMinDate()!) : null",
        "[attr.max]": "_getMaxDate() ? _dateAdapter.toIso8601(_getMaxDate()!) : null",
        "(blur)": "_onBlur()",
        "type": "text"
      },
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: MatEndDate,
        multi: true
      }, {
        provide: NG_VALIDATORS,
        useExisting: MatEndDate,
        multi: true
      }],
      outputs: ["dateChange", "dateInput"]
    }]
  }], null, null);
})();
var MatDateRangePicker = class _MatDateRangePicker extends MatDatepickerBase {
  _forwardContentValues(instance) {
    super._forwardContentValues(instance);
    const input2 = this.datepickerInput;
    if (input2) {
      instance.comparisonStart = input2.comparisonStart;
      instance.comparisonEnd = input2.comparisonEnd;
      instance.startDateAccessibleName = input2._getStartDateAccessibleName();
      instance.endDateAccessibleName = input2._getEndDateAccessibleName();
    }
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatDateRangePicker_BaseFactory = void 0;
    return function MatDateRangePicker_Factory(__ngFactoryType__) {
      return (\u0275MatDateRangePicker_BaseFactory || (\u0275MatDateRangePicker_BaseFactory = \u0275\u0275getInheritedFactory(_MatDateRangePicker)))(__ngFactoryType__ || _MatDateRangePicker);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatDateRangePicker,
    selectors: [["mat-date-range-picker"]],
    exportAs: ["matDateRangePicker"],
    features: [\u0275\u0275ProvidersFeature([MAT_RANGE_DATE_SELECTION_MODEL_PROVIDER, {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useFactory: () => {
        const parent = inject(MAT_DATE_RANGE_SELECTION_STRATEGY, {
          optional: true,
          skipSelf: true
        });
        return parent || new DefaultMatCalendarRangeStrategy(inject(DateAdapter));
      }
    }, {
      provide: MatDatepickerBase,
      useExisting: _MatDateRangePicker
    }]), \u0275\u0275InheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function MatDateRangePicker_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDateRangePicker, [{
    type: Component,
    args: [{
      selector: "mat-date-range-picker",
      template: "",
      exportAs: "matDateRangePicker",
      encapsulation: ViewEncapsulation.None,
      providers: [MAT_RANGE_DATE_SELECTION_MODEL_PROVIDER, {
        provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
        useFactory: () => {
          const parent = inject(MAT_DATE_RANGE_SELECTION_STRATEGY, {
            optional: true,
            skipSelf: true
          });
          return parent || new DefaultMatCalendarRangeStrategy(inject(DateAdapter));
        }
      }, {
        provide: MatDatepickerBase,
        useExisting: MatDateRangePicker
      }]
    }]
  }], null, null);
})();
var MatDatepickerApply = class _MatDatepickerApply {
  _datepicker = inject(MatDatepickerBase);
  _applySelection() {
    this._datepicker._applyPendingSelection();
    this._datepicker.close();
  }
  static \u0275fac = function MatDatepickerApply_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDatepickerApply)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatDatepickerApply,
    selectors: [["", "matDatepickerApply", ""], ["", "matDateRangePickerApply", ""]],
    hostBindings: function MatDatepickerApply_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function MatDatepickerApply_click_HostBindingHandler() {
          return ctx._applySelection();
        });
      }
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDatepickerApply, [{
    type: Directive,
    args: [{
      selector: "[matDatepickerApply], [matDateRangePickerApply]",
      host: {
        "(click)": "_applySelection()"
      }
    }]
  }], null, null);
})();
var MatDatepickerCancel = class _MatDatepickerCancel {
  _datepicker = inject(MatDatepickerBase);
  static \u0275fac = function MatDatepickerCancel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDatepickerCancel)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatDatepickerCancel,
    selectors: [["", "matDatepickerCancel", ""], ["", "matDateRangePickerCancel", ""]],
    hostBindings: function MatDatepickerCancel_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function MatDatepickerCancel_click_HostBindingHandler() {
          return ctx._datepicker.close();
        });
      }
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDatepickerCancel, [{
    type: Directive,
    args: [{
      selector: "[matDatepickerCancel], [matDateRangePickerCancel]",
      host: {
        "(click)": "_datepicker.close()"
      }
    }]
  }], null, null);
})();
var MatDatepickerActions = class _MatDatepickerActions {
  _datepicker = inject(MatDatepickerBase);
  _viewContainerRef = inject(ViewContainerRef);
  _template;
  _portal;
  ngAfterViewInit() {
    this._portal = new TemplatePortal(this._template, this._viewContainerRef);
    this._datepicker.registerActions(this._portal);
  }
  ngOnDestroy() {
    this._datepicker.removeActions(this._portal);
    if (this._portal && this._portal.isAttached) {
      this._portal?.detach();
    }
  }
  static \u0275fac = function MatDatepickerActions_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDatepickerActions)();
  };
  static \u0275cmp = /* @__PURE__ */ (function() {
    const _c0 = ["*"];
    function MatDatepickerActions_ng_template_0_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "div", 0);
        \u0275\u0275projection(1);
        \u0275\u0275domElementEnd();
      }
    }
    return /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatDatepickerActions,
      selectors: [["mat-datepicker-actions"], ["mat-date-range-picker-actions"]],
      viewQuery: function MatDatepickerActions_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(TemplateRef, 5);
        }
        if (rf & 2) {
          let _t = void 0;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._template = _t.first);
        }
      },
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      consts: [[1, "mat-datepicker-actions"]],
      template: function MatDatepickerActions_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275domTemplate(0, MatDatepickerActions_ng_template_0_Template, 2, 0, "ng-template");
        }
      },
      styles: [".mat-datepicker-actions {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  padding: 0 8px 8px 8px;\n}\n.mat-datepicker-actions .mat-mdc-button-base + .mat-mdc-button-base {\n  margin-left: 8px;\n}\n[dir=rtl] .mat-datepicker-actions .mat-mdc-button-base + .mat-mdc-button-base {\n  margin-left: 0;\n  margin-right: 8px;\n}\n"],
      encapsulation: 2
    });
  })();
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDatepickerActions, [{
    type: Component,
    args: [{
      selector: "mat-datepicker-actions, mat-date-range-picker-actions",
      template: `
    <ng-template>
      <div class="mat-datepicker-actions">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
      encapsulation: ViewEncapsulation.None,
      styles: [".mat-datepicker-actions {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  padding: 0 8px 8px 8px;\n}\n.mat-datepicker-actions .mat-mdc-button-base + .mat-mdc-button-base {\n  margin-left: 8px;\n}\n[dir=rtl] .mat-datepicker-actions .mat-mdc-button-base + .mat-mdc-button-base {\n  margin-left: 0;\n  margin-right: 8px;\n}\n"]
    }]
  }], null, {
    _template: [{
      type: ViewChild,
      args: [TemplateRef]
    }]
  });
})();
var MatDatepickerModule = class _MatDatepickerModule {
  static \u0275fac = function MatDatepickerModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDatepickerModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatDatepickerModule,
    imports: [MatButtonModule, OverlayModule, A11yModule, PortalModule, MatCalendar, MatCalendarBody, MatDatepicker, MatDatepickerContent, MatDatepickerInput, MatDatepickerToggle, MatDatepickerToggleIcon, MatMonthView, MatYearView, MatMultiYearView, MatCalendarHeader, MatDateRangeInput, MatStartDate, MatEndDate, MatDateRangePicker, MatDatepickerActions, MatDatepickerCancel, MatDatepickerApply],
    exports: [BidiModule, CdkScrollableModule, MatCalendar, MatCalendarBody, MatDatepicker, MatDatepickerContent, MatDatepickerInput, MatDatepickerToggle, MatDatepickerToggleIcon, MatMonthView, MatYearView, MatMultiYearView, MatCalendarHeader, MatDateRangeInput, MatStartDate, MatEndDate, MatDateRangePicker, MatDatepickerActions, MatDatepickerCancel, MatDatepickerApply]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [MatDatepickerIntl],
    imports: [MatButtonModule, OverlayModule, A11yModule, PortalModule, MatDatepickerContent, MatDatepickerToggle, MatCalendarHeader, BidiModule, CdkScrollableModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDatepickerModule, [{
    type: NgModule,
    args: [{
      imports: [MatButtonModule, OverlayModule, A11yModule, PortalModule, MatCalendar, MatCalendarBody, MatDatepicker, MatDatepickerContent, MatDatepickerInput, MatDatepickerToggle, MatDatepickerToggleIcon, MatMonthView, MatYearView, MatMultiYearView, MatCalendarHeader, MatDateRangeInput, MatStartDate, MatEndDate, MatDateRangePicker, MatDatepickerActions, MatDatepickerCancel, MatDatepickerApply],
      exports: [BidiModule, CdkScrollableModule, MatCalendar, MatCalendarBody, MatDatepicker, MatDatepickerContent, MatDatepickerInput, MatDatepickerToggle, MatDatepickerToggleIcon, MatMonthView, MatYearView, MatMultiYearView, MatCalendarHeader, MatDateRangeInput, MatStartDate, MatEndDate, MatDateRangePicker, MatDatepickerActions, MatDatepickerCancel, MatDatepickerApply],
      providers: [MatDatepickerIntl]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/core.mjs
var VERSION = new Version("22.2.2");
var ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;
var TIME_REGEX = /^(\d?\d)[:.](\d?\d)(?:[:.](\d?\d))?\s*(AM|PM)?$/i;
function range(length, valueFunction) {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}
var NativeDateAdapter = class _NativeDateAdapter extends DateAdapter {
  _matDateLocale = inject(MAT_DATE_LOCALE, {
    optional: true
  });
  constructor() {
    super();
    const matDateLocale = inject(MAT_DATE_LOCALE, {
      optional: true
    });
    if (matDateLocale !== void 0) {
      this._matDateLocale = matDateLocale;
    }
    super.setLocale(this._matDateLocale);
  }
  getYear(date) {
    return date.getFullYear();
  }
  getMonth(date) {
    return date.getMonth();
  }
  getDate(date) {
    return date.getDate();
  }
  getDayOfWeek(date) {
    return date.getDay();
  }
  getMonthNames(style) {
    const dtf = new Intl.DateTimeFormat(this.locale, {
      month: style,
      timeZone: "utc"
    });
    return range(12, (i) => this._format(dtf, new Date(2017, i, 1)));
  }
  getDateNames() {
    const dtf = new Intl.DateTimeFormat(this.locale, {
      day: "numeric",
      timeZone: "utc"
    });
    return range(31, (i) => this._format(dtf, new Date(2017, 0, i + 1)));
  }
  getDayOfWeekNames(style) {
    const dtf = new Intl.DateTimeFormat(this.locale, {
      weekday: style,
      timeZone: "utc"
    });
    return range(7, (i) => this._format(dtf, new Date(2017, 0, i + 1)));
  }
  getYearName(date) {
    const dtf = new Intl.DateTimeFormat(this.locale, {
      year: "numeric",
      timeZone: "utc"
    });
    return this._format(dtf, date);
  }
  getFirstDayOfWeek() {
    if (typeof Intl !== "undefined" && Intl.Locale) {
      const locale = new Intl.Locale(this.locale);
      const firstDay = (locale.getWeekInfo?.() || locale.weekInfo)?.firstDay ?? 0;
      return firstDay === 7 ? 0 : firstDay;
    }
    return 0;
  }
  getNumDaysInMonth(date) {
    return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
  }
  clone(date) {
    return new Date(date.getTime());
  }
  createDate(year, month, date) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (month < 0 || month > 11) {
        throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
      }
      if (date < 1) {
        throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
      }
    }
    let result = this._createDateWithOverflow(year, month, date);
    if (result.getMonth() != month && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }
    return result;
  }
  today() {
    return /* @__PURE__ */ new Date();
  }
  parse(value, parseFormat) {
    if (typeof value == "number") {
      return new Date(value);
    }
    return value ? new Date(Date.parse(value)) : null;
  }
  format(date, displayFormat) {
    if (!this.isValid(date)) {
      throw Error("NativeDateAdapter: Cannot format invalid date.");
    }
    const dtf = new Intl.DateTimeFormat(this.locale, __spreadProps(__spreadValues({}, displayFormat), {
      timeZone: "utc"
    }));
    return this._format(dtf, date);
  }
  addCalendarYears(date, years) {
    return this.addCalendarMonths(date, years * 12);
  }
  addCalendarMonths(date, months) {
    let newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date));
    if (this.getMonth(newDate) != ((this.getMonth(date) + months) % 12 + 12) % 12) {
      newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0);
    }
    return newDate;
  }
  addCalendarDays(date, days) {
    return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days);
  }
  toIso8601(date) {
    return [date.getUTCFullYear(), this._2digit(date.getUTCMonth() + 1), this._2digit(date.getUTCDate())].join("-");
  }
  deserialize(value) {
    if (typeof value === "string") {
      if (!value) {
        return null;
      }
      if (ISO_8601_REGEX.test(value)) {
        let date = new Date(value);
        if (this.isValid(date)) {
          return date;
        }
      }
    }
    return super.deserialize(value);
  }
  isDateInstance(obj) {
    return obj instanceof Date;
  }
  isValid(date) {
    return !isNaN(date.getTime());
  }
  invalid() {
    return /* @__PURE__ */ new Date(NaN);
  }
  setTime(target, hours, minutes, seconds) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (!inRange(hours, 0, 23)) {
        throw Error(`Invalid hours "${hours}". Hours value must be between 0 and 23.`);
      }
      if (!inRange(minutes, 0, 59)) {
        throw Error(`Invalid minutes "${minutes}". Minutes value must be between 0 and 59.`);
      }
      if (!inRange(seconds, 0, 59)) {
        throw Error(`Invalid seconds "${seconds}". Seconds value must be between 0 and 59.`);
      }
    }
    const clone = this.clone(target);
    clone.setHours(hours, minutes, seconds, 0);
    return clone;
  }
  getHours(date) {
    return date.getHours();
  }
  getMinutes(date) {
    return date.getMinutes();
  }
  getSeconds(date) {
    return date.getSeconds();
  }
  parseTime(userValue, parseFormat) {
    if (typeof userValue !== "string") {
      return userValue instanceof Date ? new Date(userValue.getTime()) : null;
    }
    const value = userValue.trim();
    if (value.length === 0) {
      return null;
    }
    let result = this._parseTimeString(value);
    if (result === null) {
      const withoutExtras = value.replace(/[^0-9:(AM|PM)]/gi, "").trim();
      if (withoutExtras.length > 0) {
        result = this._parseTimeString(withoutExtras);
      }
    }
    return result || this.invalid();
  }
  addSeconds(date, amount) {
    return new Date(date.getTime() + amount * 1e3);
  }
  _createDateWithOverflow(year, month, date) {
    const d = /* @__PURE__ */ new Date();
    d.setFullYear(year, month, date);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  _2digit(n) {
    return ("00" + n).slice(-2);
  }
  _format(dtf, date) {
    const d = /* @__PURE__ */ new Date();
    d.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    d.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    return dtf.format(d);
  }
  _parseTimeString(value) {
    const parsed = value.toUpperCase().match(TIME_REGEX);
    if (parsed) {
      let hours = parseInt(parsed[1]);
      const minutes = parseInt(parsed[2]);
      let seconds = parsed[3] == null ? void 0 : parseInt(parsed[3]);
      const amPm = parsed[4];
      if (hours === 12) {
        hours = amPm === "AM" ? 0 : hours;
      } else if (amPm === "PM") {
        hours += 12;
      }
      if (inRange(hours, 0, 23) && inRange(minutes, 0, 59) && (seconds == null || inRange(seconds, 0, 59))) {
        return this.setTime(this.today(), hours, minutes, seconds || 0);
      }
    }
    return null;
  }
  static \u0275fac = function NativeDateAdapter_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NativeDateAdapter)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineService({
    token: _NativeDateAdapter,
    factory: _NativeDateAdapter.\u0275fac,
    autoProvided: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NativeDateAdapter, [{
    type: Service,
    args: [{
      autoProvided: false
    }]
  }], () => [], null);
})();
function inRange(value, min, max) {
  return !isNaN(value) && value >= min && value <= max;
}
var MAT_NATIVE_DATE_FORMATS = {
  parse: {
    dateInput: null,
    timeInput: null
  },
  display: {
    dateInput: {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    },
    timeInput: {
      hour: "numeric",
      minute: "numeric"
    },
    monthYearLabel: {
      year: "numeric",
      month: "short"
    },
    dateA11yLabel: {
      year: "numeric",
      month: "long",
      day: "numeric"
    },
    monthYearA11yLabel: {
      year: "numeric",
      month: "long"
    },
    timeOptionLabel: {
      hour: "numeric",
      minute: "numeric"
    }
  }
};
var NativeDateModule = class _NativeDateModule {
  static \u0275fac = function NativeDateModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NativeDateModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _NativeDateModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [{
      provide: DateAdapter,
      useClass: NativeDateAdapter
    }]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NativeDateModule, [{
    type: NgModule,
    args: [{
      providers: [{
        provide: DateAdapter,
        useClass: NativeDateAdapter
      }]
    }]
  }], null, null);
})();
var MatNativeDateModule = class _MatNativeDateModule {
  static \u0275fac = function MatNativeDateModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatNativeDateModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatNativeDateModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [provideNativeDateAdapter()]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatNativeDateModule, [{
    type: NgModule,
    args: [{
      providers: [provideNativeDateAdapter()]
    }]
  }], null, null);
})();
function provideNativeDateAdapter(formats = MAT_NATIVE_DATE_FORMATS) {
  return [{
    provide: DateAdapter,
    useClass: NativeDateAdapter
  }, {
    provide: MAT_DATE_FORMATS,
    useValue: formats
  }];
}

// src/app/core/date/argentina-date-adapter.ts
var DATE_INPUT_FORMAT = "dd/MM/yyyy";
var ARGENTINA_DATE_FORMATS = {
  parse: { dateInput: DATE_INPUT_FORMAT },
  display: {
    dateInput: DATE_INPUT_FORMAT,
    monthYearLabel: { month: "long", year: "numeric" },
    dateA11yLabel: { day: "numeric", month: "long", year: "numeric" },
    monthYearA11yLabel: { month: "long", year: "numeric" }
  }
};
var ArgentinaDateAdapter = class _ArgentinaDateAdapter extends NativeDateAdapter {
  parse(value) {
    if (typeof value === "string") {
      const match = value.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
      if (!match)
        return null;
      try {
        return this.createDate(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
      } catch {
        return null;
      }
    }
    return super.parse(value);
  }
  format(date, displayFormat) {
    if (displayFormat === DATE_INPUT_FORMAT) {
      return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
    }
    return super.format(date, displayFormat);
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275ArgentinaDateAdapter_BaseFactory;
    return function ArgentinaDateAdapter_Factory(__ngFactoryType__) {
      return (\u0275ArgentinaDateAdapter_BaseFactory || (\u0275ArgentinaDateAdapter_BaseFactory = \u0275\u0275getInheritedFactory(_ArgentinaDateAdapter)))(__ngFactoryType__ || _ArgentinaDateAdapter);
    };
  })();
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ArgentinaDateAdapter, factory: _ArgentinaDateAdapter.\u0275fac });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ArgentinaDateAdapter, [{
    type: Injectable
  }], null, null);
})();

// src/app/shared/date-picker/date-picker.component.ts
function DatePickerComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.error());
  }
}
var DatePickerComponent = class _DatePickerComponent {
  adapter = inject(DateAdapter);
  value = input(
    "",
    ...ngDevMode ? [{ debugName: "value" }] : (
      /* istanbul ignore next */
      []
    )
  );
  valueChange = output();
  startView = input(
    "month",
    ...ngDevMode ? [{ debugName: "startView" }] : (
      /* istanbul ignore next */
      []
    )
  );
  max = input(
    null,
    ...ngDevMode ? [{ debugName: "max" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showError = input(
    true,
    ...ngDevMode ? [{ debugName: "showError" }] : (
      /* istanbul ignore next */
      []
    )
  );
  selectedDate = signal(
    null,
    ...ngDevMode ? [{ debugName: "selectedDate" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isDisabled = signal(
    false,
    ...ngDevMode ? [{ debugName: "isDisabled" }] : (
      /* istanbul ignore next */
      []
    )
  );
  invalidInput = signal(
    false,
    ...ngDevMode ? [{ debugName: "invalidInput" }] : (
      /* istanbul ignore next */
      []
    )
  );
  error = computed(
    () => {
      if (this.invalidInput())
        return "Ingres\xE1 una fecha v\xE1lida con formato dd/MM/aaaa.";
      const date = this.selectedDate(), max = this.maxDate();
      return date && max && date > max ? "La fecha supera el m\xE1ximo permitido." : null;
    },
    ...ngDevMode ? [{ debugName: "error" }] : (
      /* istanbul ignore next */
      []
    )
  );
  calendarStart = computed(
    () => {
      if (this.selectedDate()) {
        return this.selectedDate();
      }
      const today = /* @__PURE__ */ new Date();
      const max = this.maxDate();
      if (max && today.getTime() > max.getTime()) {
        return max;
      }
      return today;
    },
    ...ngDevMode ? [{ debugName: "calendarStart" }] : (
      /* istanbul ignore next */
      []
    )
  );
  onChange = () => void 0;
  onTouched = () => void 0;
  onValidatorChange = () => void 0;
  constructor() {
    effect(() => this.selectedDate.set(this.toDate(this.value())));
    effect(() => {
      this.error();
      this.onValidatorChange();
    });
  }
  writeValue(value) {
    this.selectedDate.set(this.toDate(value));
    this.invalidInput.set(!!value && !this.toDate(value));
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.isDisabled.set(isDisabled);
  }
  validate() {
    return this.error() ? { date: true } : null;
  }
  registerOnValidatorChange(fn) {
    this.onValidatorChange = fn;
  }
  onTextInput(raw) {
    this.selectDate(this.adapter.parse(raw, ARGENTINA_DATE_FORMATS.parse.dateInput), raw);
  }
  selectDate(value, raw = "") {
    if (this.isDisabled())
      return;
    const iso = value ? this.toIsoDate(value) : raw.trim();
    this.invalidInput.set(!value && !!raw.trim());
    this.selectedDate.set(value);
    this.onChange(iso);
    this.onValidatorChange();
    this.valueChange.emit(iso);
  }
  markTouched() {
    this.onTouched();
  }
  maxDate() {
    return this.toDate(this.max());
  }
  toDate(value) {
    const match = typeof value === "string" ? value.match(/^(\d{4})-(\d{2})-(\d{2})$/) : null;
    if (!match)
      return null;
    const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    return date.getFullYear() === Number(match[1]) && date.getMonth() === Number(match[2]) - 1 && date.getDate() === Number(match[3]) ? date : null;
  }
  toIsoDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }
  static \u0275fac = function DatePickerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DatePickerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DatePickerComponent, selectors: [["app-date-picker"]], inputs: { value: [1, "value"], startView: [1, "startView"], max: [1, "max"], showError: [1, "showError"] }, outputs: { valueChange: "valueChange" }, features: [\u0275\u0275ProvidersFeature([
    { provide: NG_VALUE_ACCESSOR, useExisting: _DatePickerComponent, multi: true },
    { provide: NG_VALIDATORS, useExisting: _DatePickerComponent, multi: true },
    { provide: DateAdapter, useClass: ArgentinaDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: "es-AR" },
    { provide: MAT_DATE_FORMATS, useValue: ARGENTINA_DATE_FORMATS }
  ])], decls: 6, vars: 12, consts: [["picker", ""], [1, "date-picker-shell"], ["type", "text", "placeholder", "dd/MM/aaaa", "inputmode", "numeric", "autocomplete", "bday", 1, "date-picker-input", 3, "click", "input", "dateChange", "blur", "matDatepicker", "value", "max", "disabled"], [3, "for", "disabled"], [3, "startView", "startAt"], ["role", "alert", 1, "field-error"]], template: function DatePickerComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "input", 2);
      \u0275\u0275listener("click", function DatePickerComponent_Template_input_click_1_listener() {
        \u0275\u0275restoreView(_r1);
        const picker_r2 = \u0275\u0275reference(4);
        return \u0275\u0275resetView(!ctx.isDisabled() && picker_r2.open());
      })("input", function DatePickerComponent_Template_input_input_1_listener($event) {
        return ctx.onTextInput($event.target.value);
      })("dateChange", function DatePickerComponent_Template_input_dateChange_1_listener($event) {
        return ctx.selectDate($event.value, $event.targetElement.value);
      })("blur", function DatePickerComponent_Template_input_blur_1_listener() {
        return ctx.markTouched();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(2, "mat-datepicker-toggle", 3)(3, "mat-datepicker", 4, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(5, DatePickerComponent_Conditional_5_Template, 2, 1, "span", 5);
    }
    if (rf & 2) {
      const picker_r2 = \u0275\u0275reference(4);
      \u0275\u0275advance();
      \u0275\u0275classProp("has-error", !!ctx.error());
      \u0275\u0275property("matDatepicker", picker_r2)("value", ctx.selectedDate())("max", ctx.maxDate())("disabled", ctx.isDisabled());
      \u0275\u0275attribute("aria-invalid", !!ctx.error());
      \u0275\u0275advance();
      \u0275\u0275property("for", picker_r2)("disabled", ctx.isDisabled());
      \u0275\u0275advance();
      \u0275\u0275property("startView", ctx.startView())("startAt", ctx.calendarStart());
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showError() && ctx.error() && !ctx.isDisabled() ? 5 : -1);
    }
  }, dependencies: [MatDatepickerModule, MatDatepicker, MatDatepickerInput, MatDatepickerToggle], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}\n.date-picker-shell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  min-height: 2.55rem;\n  border: 1px solid var(--%NS%color-outline, #cbd5e1);\n  border-radius: .6rem;\n  background: var(--%NS%color-surface, #fff);\n  transition: border-color .15s ease, box-shadow .15s ease;\n  cursor: pointer;\n}\n.date-picker-shell[_ngcontent-%COMP%]:hover {\n  border-color: #94a3b8;\n}\n.date-picker-shell[_ngcontent-%COMP%]:focus-within {\n  border-color: #0d9488;\n  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);\n}\n.date-picker-input[_ngcontent-%COMP%] {\n  min-width: 0;\n  width: 100%;\n  padding: .5rem 0 .5rem .75rem;\n  border: 0;\n  outline: 0;\n  background: transparent;\n  color: var(--%NS%color-on-surface, #0f172a);\n  font: inherit;\n  cursor: pointer;\n}\n.date-picker-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--%NS%dc-ink-muted, #94a3b8);\n}\nmat-datepicker-toggle[_ngcontent-%COMP%] {\n  margin-right: .25rem;\n  color: var(--%NS%dc-ink-secondary, #475569);\n}\n.input-error[_nghost-%COMP%]   .date-picker-shell[_ngcontent-%COMP%] {\n  border-color: #ef4444;\n}\n.field-error[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 6px;\n  color: var(--%NS%dc-error-ink, #b91c1c);\n  font-size: .8rem;\n}\n.date-picker-input.has-error[_ngcontent-%COMP%] {\n  border-color: #b91c1c;\n}\n/*# sourceMappingURL=date-picker.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DatePickerComponent, [{
    type: Component,
    args: [{ selector: "app-date-picker", imports: [MatDatepickerModule], providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: DatePickerComponent, multi: true },
      { provide: NG_VALIDATORS, useExisting: DatePickerComponent, multi: true },
      { provide: DateAdapter, useClass: ArgentinaDateAdapter },
      { provide: MAT_DATE_LOCALE, useValue: "es-AR" },
      { provide: MAT_DATE_FORMATS, useValue: ARGENTINA_DATE_FORMATS }
    ], template: '<div class="date-picker-shell">\r\n  <input\r\n    type="text"\r\n    class="date-picker-input"\r\n    [matDatepicker]="picker"\r\n    [value]="selectedDate()"\r\n    [max]="maxDate()"\r\n    [disabled]="isDisabled()"\r\n    [attr.aria-invalid]="!!error()"\r\n    [class.has-error]="!!error()"\r\n    placeholder="dd/MM/aaaa"\r\n    inputmode="numeric"\r\n    autocomplete="bday"\r\n    (click)="!isDisabled() && picker.open()"\r\n    (input)="onTextInput($any($event.target).value)"\r\n    (dateChange)="selectDate($event.value, $any($event.targetElement).value)"\r\n    (blur)="markTouched()"\r\n  />\r\n  <mat-datepicker-toggle [for]="picker" [disabled]="isDisabled()"></mat-datepicker-toggle>\r\n  <mat-datepicker #picker [startView]="startView()" [startAt]="calendarStart()"></mat-datepicker>\r\n</div>\r\n@if (showError() && error() && !isDisabled()) { <span class="field-error" role="alert">{{ error() }}</span> }\r\n', styles: ["/* src/app/shared/date-picker/date-picker.component.css */\n:host {\n  display: block;\n  width: 100%;\n}\n.date-picker-shell {\n  display: flex;\n  align-items: center;\n  min-height: 2.55rem;\n  border: 1px solid var(--color-outline, #cbd5e1);\n  border-radius: .6rem;\n  background: var(--color-surface, #fff);\n  transition: border-color .15s ease, box-shadow .15s ease;\n  cursor: pointer;\n}\n.date-picker-shell:hover {\n  border-color: #94a3b8;\n}\n.date-picker-shell:focus-within {\n  border-color: #0d9488;\n  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);\n}\n.date-picker-input {\n  min-width: 0;\n  width: 100%;\n  padding: .5rem 0 .5rem .75rem;\n  border: 0;\n  outline: 0;\n  background: transparent;\n  color: var(--color-on-surface, #0f172a);\n  font: inherit;\n  cursor: pointer;\n}\n.date-picker-input::placeholder {\n  color: var(--dc-ink-muted, #94a3b8);\n}\nmat-datepicker-toggle {\n  margin-right: .25rem;\n  color: var(--dc-ink-secondary, #475569);\n}\n:host(.input-error) .date-picker-shell {\n  border-color: #ef4444;\n}\n.field-error {\n  display: block;\n  margin-top: 6px;\n  color: var(--dc-error-ink, #b91c1c);\n  font-size: .8rem;\n}\n.date-picker-input.has-error {\n  border-color: #b91c1c;\n}\n/*# sourceMappingURL=date-picker.component.css.map */\n"] }]
  }], () => [], { value: [{ type: Input, args: [{ isSignal: true, alias: "value", required: false }] }], valueChange: [{ type: Output, args: ["valueChange"] }], startView: [{ type: Input, args: [{ isSignal: true, alias: "startView", required: false }] }], max: [{ type: Input, args: [{ isSignal: true, alias: "max", required: false }] }], showError: [{ type: Input, args: [{ isSignal: true, alias: "showError", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DatePickerComponent, { className: "DatePickerComponent", filePath: "src/app/shared/date-picker/date-picker.component.ts", lineNumber: 22 });
})();

export {
  DatePickerComponent
};
//# debugId=9d3e3fe8-ed20-5707-bdb6-d24921eab9c0
//# sourceMappingURL=chunk-6MFCUZUR.js.map
