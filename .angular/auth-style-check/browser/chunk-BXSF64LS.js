import "./chunk-WMGV2OO2.js";
import {
  ActivePatientService
} from "./chunk-KDJQW6YV.js";
import {
  takeUntilDestroyed
} from "./chunk-Y3XT3YWV.js";
import {
  instantParts
} from "./chunk-YTAXUAO7.js";
import {
  FEATURE_FLAGS,
  WorkspaceStore
} from "./chunk-WPGAV52V.js";
import "./chunk-USM5S45Q.js";
import "./chunk-THOV7R4G.js";
import {
  DefaultValueAccessor,
  FormGroupDirective,
  FormsModule,
  NgControl,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  ɵNgNoValidate
} from "./chunk-BQIFWLNB.js";
import {
  AuthService
} from "./chunk-KGUDCUHJ.js";
import {
  environment
} from "./chunk-WKCAPCQH.js";
import {
  NgIcon,
  lucideAlertCircle,
  lucideBot,
  lucideCheck,
  lucideLoader2,
  lucideRotateCcw,
  lucideSend,
  lucideSparkles,
  lucideStethoscope,
  lucideX,
  provideIcons
} from "./chunk-Z3UJ4PSI.js";
import "./chunk-WBCHXDEU.js";
import {
  HttpClient,
  isPlatformBrowser
} from "./chunk-SYX7XZ26.js";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Directive,
  ElementRef,
  HOST_TAG_NAME,
  HostAttributeToken,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  PLATFORM_ID,
  ViewChild,
  __objRest,
  __spreadProps,
  __spreadValues,
  booleanAttribute,
  computed,
  effect,
  filter,
  fromEvent,
  inject,
  input,
  isSignal,
  runInInjectionContext,
  setClassMetadata,
  signal,
  untracked,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵHostDirectivesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuerySignal
} from "./chunk-3HO5VEWU.js";

// node_modules/@spartan-ng/brain/fesm2022/spartan-ng-brain-button.mjs
var BrnButton = class _BrnButton {
  disabled = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "disabled" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  _isAnchor = inject(HOST_TAG_NAME) === "a";
  _elementRef = inject(ElementRef);
  constructor() {
    if (this._isAnchor) {
      fromEvent(this._elementRef.nativeElement, "click").pipe(filter(() => this.disabled()), takeUntilDestroyed()).subscribe((event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
      });
    }
  }
  /** @nocollapse */
  static \u0275fac = function BrnButton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BrnButton)();
  };
  /** @nocollapse */
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _BrnButton,
    selectors: [["a", "brnButton", ""], ["button", "brnButton", ""]],
    hostVars: 3,
    hostBindings: function BrnButton_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("tabindex", ctx.disabled() ? -1 : void 0)("disabled", !ctx._isAnchor && ctx.disabled() || null)("data-disabled", ctx.disabled() || null);
      }
    },
    inputs: {
      disabled: [1, "disabled"]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnButton, [{
    type: Directive,
    args: [{
      selector: "a[brnButton], button[brnButton]",
      host: {
        "[attr.tabindex]": "disabled() ? -1 : undefined",
        "[attr.disabled]": "!_isAnchor && disabled() || null",
        "[attr.data-disabled]": "disabled() || null"
      }
    }]
  }], () => [], { disabled: [{ type: Input, args: [{ isSignal: true, alias: "disabled", required: false }] }] });
})();

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}

// node_modules/tailwind-merge/dist/bundle-mjs.mjs
var concatArrays = (array1, array2) => {
  const combinedArray = new Array(array1.length + array2.length);
  for (let i = 0; i < array1.length; i++) {
    combinedArray[i] = array1[i];
  }
  for (let i = 0; i < array2.length; i++) {
    combinedArray[array1.length + i] = array2[i];
  }
  return combinedArray;
};
var createClassValidatorObject = (classGroupId, validator) => ({
  classGroupId,
  validator
});
var createClassPartObject = (nextPart = /* @__PURE__ */ new Map(), validators = null, classGroupId) => ({
  nextPart,
  validators,
  classGroupId
});
var CLASS_PART_SEPARATOR = "-";
var EMPTY_CONFLICTS = [];
var ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
var createClassGroupUtils = (config) => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = (className) => {
    if (className.startsWith("[") && className.endsWith("]")) {
      return getGroupIdForArbitraryProperty(className);
    }
    const classParts = className.split(CLASS_PART_SEPARATOR);
    const startIndex = classParts[0] === "" && classParts.length > 1 ? 1 : 0;
    return getGroupRecursive(classParts, startIndex, classMap);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    if (hasPostfixModifier) {
      const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
      const baseConflicts = conflictingClassGroups[classGroupId];
      if (modifierConflicts) {
        if (baseConflicts) {
          return concatArrays(baseConflicts, modifierConflicts);
        }
        return modifierConflicts;
      }
      return baseConflicts || EMPTY_CONFLICTS;
    }
    return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
var getGroupRecursive = (classParts, startIndex, classPartObject) => {
  const classPathsLength = classParts.length - startIndex;
  if (classPathsLength === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[startIndex];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  if (nextClassPartObject) {
    const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
    if (result) return result;
  }
  const validators = classPartObject.validators;
  if (validators === null) {
    return void 0;
  }
  const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
  const validatorsLength = validators.length;
  for (let i = 0; i < validatorsLength; i++) {
    const validatorObj = validators[i];
    if (validatorObj.validator(classRest)) {
      return validatorObj.classGroupId;
    }
  }
  return void 0;
};
var getGroupIdForArbitraryProperty = (className) => className.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const content = className.slice(1, -1);
  const colonIndex = content.indexOf(":");
  const property = content.slice(0, colonIndex);
  return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
})();
var createClassMap = (config) => {
  const {
    theme,
    classGroups
  } = config;
  return processClassGroups(classGroups, theme);
};
var processClassGroups = (classGroups, theme) => {
  const classMap = createClassPartObject();
  for (const classGroupId in classGroups) {
    const group = classGroups[classGroupId];
    processClassesRecursively(group, classMap, classGroupId, theme);
  }
  return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  const len = classGroup.length;
  for (let i = 0; i < len; i++) {
    const classDefinition = classGroup[i];
    processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
  }
};
var processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  if (typeof classDefinition === "string") {
    processStringDefinition(classDefinition, classPartObject, classGroupId);
    return;
  }
  if (typeof classDefinition === "function") {
    processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
    return;
  }
  processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
};
var processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
  const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
  classPartObjectToEdit.classGroupId = classGroupId;
};
var processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  if (isThemeGetter(classDefinition)) {
    processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
    return;
  }
  if (classPartObject.validators === null) {
    classPartObject.validators = [];
  }
  classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
var processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  const entries = Object.entries(classDefinition);
  const len = entries.length;
  for (let i = 0; i < len; i++) {
    const [key, value] = entries[i];
    processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
  }
};
var getPart = (classPartObject, path) => {
  let current = classPartObject;
  const parts = path.split(CLASS_PART_SEPARATOR);
  const len = parts.length;
  for (let i = 0; i < len; i++) {
    const part = parts[i];
    let next = current.nextPart.get(part);
    if (!next) {
      next = createClassPartObject();
      current.nextPart.set(part, next);
    }
    current = next;
  }
  return current;
};
var isThemeGetter = (func) => "isThemeGetter" in func && func.isThemeGetter === true;
var createLruCache = (maxCacheSize) => {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {
      }
    };
  }
  let cacheSize = 0;
  let cache = /* @__PURE__ */ Object.create(null);
  let previousCache = /* @__PURE__ */ Object.create(null);
  const update = (key, value) => {
    cache[key] = value;
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ Object.create(null);
    }
  };
  return {
    get(key) {
      let value = cache[key];
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache[key]) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (key in cache) {
        cache[key] = value;
      } else {
        update(key, value);
      }
    }
  };
};
var IMPORTANT_MODIFIER = "!";
var MODIFIER_SEPARATOR = ":";
var EMPTY_MODIFIERS = [];
var createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal) => ({
  modifiers,
  hasImportantModifier,
  baseClassName,
  maybePostfixModifierPosition,
  isExternal
});
var createParseClassName = (config) => {
  const {
    prefix,
    experimentalParseClassName
  } = config;
  let parseClassName = (className) => {
    const modifiers = [];
    let bracketDepth = 0;
    let parenDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    const len = className.length;
    for (let index = 0; index < len; index++) {
      const currentCharacter = className[index];
      if (bracketDepth === 0 && parenDepth === 0) {
        if (currentCharacter === MODIFIER_SEPARATOR) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + 1;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === "[") bracketDepth++;
      else if (currentCharacter === "]") bracketDepth--;
      else if (currentCharacter === "(") parenDepth++;
      else if (currentCharacter === ")") parenDepth--;
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
    let baseClassName = baseClassNameWithImportantModifier;
    let hasImportantModifier = false;
    if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
      baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
      hasImportantModifier = true;
    } else if (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)
    ) {
      baseClassName = baseClassNameWithImportantModifier.slice(1);
      hasImportantModifier = true;
    }
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
  };
  if (prefix) {
    const fullPrefix = prefix + MODIFIER_SEPARATOR;
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, void 0, true);
  }
  if (experimentalParseClassName) {
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => experimentalParseClassName({
      className,
      parseClassName: parseClassNameOriginal
    });
  }
  return parseClassName;
};
var createSortModifiers = (config) => {
  const modifierWeights = /* @__PURE__ */ new Map();
  config.orderSensitiveModifiers.forEach((mod, index) => {
    modifierWeights.set(mod, 1e6 + index);
  });
  return (modifiers) => {
    const result = [];
    let currentSegment = [];
    for (let i = 0; i < modifiers.length; i++) {
      const modifier = modifiers[i];
      const isArbitrary = modifier[0] === "[";
      const isOrderSensitive = modifierWeights.has(modifier);
      if (isArbitrary || isOrderSensitive) {
        if (currentSegment.length > 0) {
          currentSegment.sort();
          result.push(...currentSegment);
          currentSegment = [];
        }
        result.push(modifier);
      } else {
        currentSegment.push(modifier);
      }
    }
    if (currentSegment.length > 0) {
      currentSegment.sort();
      result.push(...currentSegment);
    }
    return result;
  };
};
var createConfigUtils = (config) => __spreadValues({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  sortModifiers: createSortModifiers(config),
  postfixLookupClassGroupIds: createPostfixLookupClassGroupIds(config)
}, createClassGroupUtils(config));
var createPostfixLookupClassGroupIds = (config) => {
  const lookup = /* @__PURE__ */ Object.create(null);
  const classGroupIds = config.postfixLookupClassGroups;
  if (classGroupIds) {
    for (let i = 0; i < classGroupIds.length; i++) {
      lookup[classGroupIds[i]] = true;
    }
  }
  return lookup;
};
var SPLIT_CLASSES_REGEX = /\s+/;
var mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds,
    sortModifiers,
    postfixLookupClassGroupIds
  } = configUtils;
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = "";
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      isExternal,
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    if (isExternal) {
      result = originalClassName + (result.length > 0 ? " " + result : result);
      continue;
    }
    let hasPostfixModifier = !!maybePostfixModifierPosition;
    let classGroupId;
    if (hasPostfixModifier) {
      const baseClassNameWithoutPostfix = baseClassName.substring(0, maybePostfixModifierPosition);
      classGroupId = getClassGroupId(baseClassNameWithoutPostfix);
      const classGroupIdWithPostfix = classGroupId && postfixLookupClassGroupIds[classGroupId] ? getClassGroupId(baseClassName) : void 0;
      if (classGroupIdWithPostfix && classGroupIdWithPostfix !== classGroupId) {
        classGroupId = classGroupIdWithPostfix;
        hasPostfixModifier = false;
      }
    } else {
      classGroupId = getClassGroupId(baseClassName);
    }
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.indexOf(classId) > -1) {
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    result = originalClassName + (result.length > 0 ? " " + result : result);
  }
  return result;
};
var twJoin = (...classLists) => {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index < classLists.length) {
    if (argument = classLists[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
var toValue = (mix) => {
  if (typeof mix === "string") {
    return mix;
  }
  let resolvedValue;
  let string = "";
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
var createTailwindMerge = (createConfigFirst, ...createConfigRest) => {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall;
  const initTailwindMerge = (classList) => {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  };
  const tailwindMerge = (classList) => {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  };
  functionToCall = initTailwindMerge;
  return (...args) => functionToCall(twJoin(...args));
};
var fallbackThemeArr = [];
var fromTheme = (key) => {
  const themeGetter = (theme) => theme[key] || fallbackThemeArr;
  themeGetter.isThemeGetter = true;
  themeGetter.themeKey = key;
  return themeGetter;
};
var arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
var arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
var fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var isFraction = (value) => fractionRegex.test(value);
var isNumber = (value) => !!value && !Number.isNaN(Number(value));
var isInteger = (value) => !!value && Number.isInteger(Number(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var isAny = () => true;
var isLengthOnly = (value) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
var isNamedContainerQuery = (value) => value.startsWith("@container") && (value[10] === "/" && value[11] !== void 0 || value[11] === "s" && value[16] !== void 0 && value.startsWith("-size/", 10) || value[11] === "n" && value[18] !== void 0 && value.startsWith("-normal/", 10));
var isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
var isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
var isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny);
var isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
var isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
var isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
var isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
var isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
var isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
var isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
var isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
var isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
var isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true);
var getIsArbitraryValue = (value, testLabel, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
var getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
  const result = arbitraryVariableRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return shouldMatchNoLabel;
  }
  return false;
};
var isLabelPosition = (label) => label === "position" || label === "percentage";
var isLabelImage = (label) => label === "image" || label === "url";
var isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
var isLabelLength = (label) => label === "length";
var isLabelNumber = (label) => label === "number";
var isLabelFamilyName = (label) => label === "family-name";
var isLabelWeight = (label) => label === "number" || label === "weight";
var isLabelShadow = (label) => label === "shadow";
var getDefaultConfig = () => {
  const themeColor = fromTheme("color");
  const themeFont = fromTheme("font");
  const themeText = fromTheme("text");
  const themeFontWeight = fromTheme("font-weight");
  const themeTracking = fromTheme("tracking");
  const themeLeading = fromTheme("leading");
  const themeBreakpoint = fromTheme("breakpoint");
  const themeContainer = fromTheme("container");
  const themeSpacing = fromTheme("spacing");
  const themeRadius = fromTheme("radius");
  const themeShadow = fromTheme("shadow");
  const themeInsetShadow = fromTheme("inset-shadow");
  const themeTextShadow = fromTheme("text-shadow");
  const themeDropShadow = fromTheme("drop-shadow");
  const themeBlur = fromTheme("blur");
  const themePerspective = fromTheme("perspective");
  const themeAspect = fromTheme("aspect");
  const themeEase = fromTheme("ease");
  const themeAnimate = fromTheme("animate");
  const scaleBreak = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const scalePosition = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ];
  const scalePositionWithArbitrary = () => [...scalePosition(), isArbitraryVariable, isArbitraryValue];
  const scaleOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const scaleOverscroll = () => ["auto", "contain", "none"];
  const scaleUnambiguousSpacing = () => [isArbitraryVariable, isArbitraryValue, themeSpacing];
  const scaleInset = () => [isFraction, "full", "auto", ...scaleUnambiguousSpacing()];
  const scaleGridTemplateColsRows = () => [isInteger, "none", "subgrid", isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartAndEnd = () => ["auto", {
    span: ["full", isInteger, isArbitraryVariable, isArbitraryValue]
  }, isInteger, isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartOrEnd = () => [isInteger, "auto", isArbitraryVariable, isArbitraryValue];
  const scaleGridAutoColsRows = () => ["auto", "min", "max", "fr", isArbitraryVariable, isArbitraryValue];
  const scaleAlignPrimaryAxis = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"];
  const scaleAlignSecondaryAxis = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"];
  const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
  const scaleSizing = () => [isFraction, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleSizingInline = () => [themeContainer, isFraction, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleSizingBlock = () => [isFraction, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleColor = () => [themeColor, isArbitraryVariable, isArbitraryValue];
  const scaleBgPosition = () => [...scalePosition(), isArbitraryVariablePosition, isArbitraryPosition, {
    position: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleBgRepeat = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }];
  const scaleBgSize = () => ["auto", "cover", "contain", isArbitraryVariableSize, isArbitrarySize, {
    size: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleGradientStopPosition = () => [isPercent, isArbitraryVariableLength, isArbitraryLength];
  const scaleRadius = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    themeRadius,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleBorderWidth = () => ["", isNumber, isArbitraryVariableLength, isArbitraryLength];
  const scaleLineStyle = () => ["solid", "dashed", "dotted", "double"];
  const scaleBlendMode = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
  const scaleMaskImagePosition = () => [isNumber, isPercent, isArbitraryVariablePosition, isArbitraryPosition];
  const scaleBlur = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    themeBlur,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleRotate = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleScale = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleSkew = () => [isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleTranslate = () => [isFraction, "full", ...scaleUnambiguousSpacing()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [isTshirtSize],
      breakpoint: [isTshirtSize],
      color: [isAny],
      container: [isTshirtSize],
      "drop-shadow": [isTshirtSize],
      ease: ["in", "out", "in-out"],
      font: [isAnyNonArbitrary],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [isTshirtSize],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [isTshirtSize],
      shadow: [isTshirtSize],
      spacing: ["px", isNumber],
      text: [isTshirtSize],
      "text-shadow": [isTshirtSize],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", isFraction, isArbitraryValue, isArbitraryVariable, themeAspect]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Container Type
       * @see https://tailwindcss.com/docs/responsive-design#container-queries
       */
      "container-type": [{
        "@container": ["", "normal", "size", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [isNamedContainerQuery],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isNumber, "auto", isArbitraryValue, isArbitraryVariable, themeContainer]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": scaleBreak()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": scaleBreak()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: scalePositionWithArbitrary()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: scaleOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": scaleOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": scaleOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: scaleOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": scaleOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": scaleOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: scaleInset()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": scaleInset()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": scaleInset()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": scaleInset(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: scaleInset()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": scaleInset(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: scaleInset()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": scaleInset()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": scaleInset()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: scaleInset()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: scaleInset()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: scaleInset()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: scaleInset()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [isInteger, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [isFraction, "full", "auto", themeContainer, ...scaleUnambiguousSpacing()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [isNumber, isFraction, "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [isInteger, "first", "last", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": scaleGridAutoColsRows()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": scaleGridAutoColsRows()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: scaleUnambiguousSpacing()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": scaleUnambiguousSpacing()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": scaleUnambiguousSpacing()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...scaleAlignPrimaryAxis(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...scaleAlignSecondaryAxis(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...scaleAlignPrimaryAxis()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": scaleAlignPrimaryAxis()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...scaleAlignSecondaryAxis(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: scaleUnambiguousSpacing()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: scaleMargin()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: scaleMargin()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: scaleMargin()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: scaleMargin()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: scaleMargin()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: scaleMargin()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: scaleMargin()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: scaleMargin()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: scaleMargin()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: scaleMargin()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: scaleMargin()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: scaleSizing()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/inline-size
       */
      "inline-size": [{
        inline: ["auto", ...scaleSizingInline()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-inline-size
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...scaleSizingInline()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-inline-size
       */
      "max-inline-size": [{
        "max-inline": ["none", ...scaleSizingInline()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/block-size
       */
      "block-size": [{
        block: ["auto", ...scaleSizingBlock()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-block-size
       */
      "min-block-size": [{
        "min-block": ["auto", ...scaleSizingBlock()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-block-size
       */
      "max-block-size": [{
        "max-block": ["none", ...scaleSizingBlock()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [themeContainer, "screen", ...scaleSizing()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          themeContainer,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...scaleSizing()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          themeContainer,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [themeBreakpoint]
          },
          ...scaleSizing()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...scaleSizing()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...scaleSizing()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", "none", ...scaleSizing()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", themeText, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [themeFontWeight, isArbitraryVariableWeight, isArbitraryWeight]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", isPercent, isArbitraryValue]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isArbitraryVariableFamilyName, isArbitraryFamilyName, themeFont]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [isArbitraryValue]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [themeTracking, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [isNumber, "none", isArbitraryVariable, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          themeLeading,
          ...scaleUnambiguousSpacing()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: scaleColor()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: scaleColor()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...scaleLineStyle(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [isNumber, "from-font", "auto", isArbitraryVariable, isArbitraryLength]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: scaleColor()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [isNumber, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: scaleUnambiguousSpacing()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [isInteger, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: scaleBgPosition()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: scaleBgRepeat()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: scaleBgSize()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, isInteger, isArbitraryVariable, isArbitraryValue],
          radial: ["", isArbitraryVariable, isArbitraryValue],
          conic: ["", isInteger, isArbitraryVariable, isArbitraryValue]
        }, isArbitraryVariableImage, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: scaleColor()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: scaleColor()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: scaleColor()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: scaleColor()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: scaleRadius()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": scaleRadius()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": scaleRadius()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": scaleRadius()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": scaleRadius()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": scaleRadius()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": scaleRadius()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": scaleRadius()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": scaleRadius()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": scaleRadius()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": scaleRadius()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": scaleRadius()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": scaleRadius()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": scaleRadius()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": scaleRadius()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: scaleBorderWidth()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": scaleBorderWidth()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": scaleBorderWidth()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": scaleBorderWidth()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": scaleBorderWidth()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": scaleBorderWidth()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": scaleBorderWidth()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": scaleBorderWidth()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": scaleBorderWidth()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": scaleBorderWidth()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": scaleBorderWidth()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": scaleBorderWidth()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": scaleBorderWidth()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: scaleColor()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": scaleColor()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": scaleColor()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": scaleColor()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": scaleColor()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": scaleColor()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": scaleColor()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": scaleColor()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": scaleColor()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": scaleColor()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": scaleColor()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: scaleColor()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...scaleLineStyle(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", isNumber, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: scaleColor()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          // Deprecated since Tailwind CSS v4.0.0
          "inner",
          "none",
          themeShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: scaleColor()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", themeInsetShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": scaleColor()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: scaleBorderWidth()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: scaleColor()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [isNumber, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": scaleColor()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": scaleBorderWidth()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": scaleColor()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", themeTextShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": scaleColor()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...scaleBlendMode(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": scaleBlendMode()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [isNumber]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": scaleMaskImagePosition()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": scaleMaskImagePosition()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": scaleColor()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": scaleColor()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": scaleMaskImagePosition()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": scaleMaskImagePosition()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": scaleColor()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": scaleColor()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": scaleMaskImagePosition()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": scaleMaskImagePosition()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": scaleColor()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": scaleColor()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": scaleMaskImagePosition()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": scaleMaskImagePosition()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": scaleColor()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": scaleColor()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": scaleMaskImagePosition()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": scaleMaskImagePosition()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": scaleColor()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": scaleColor()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": scaleMaskImagePosition()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": scaleMaskImagePosition()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": scaleColor()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": scaleColor()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": scaleMaskImagePosition()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": scaleMaskImagePosition()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": scaleColor()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": scaleColor()
      }],
      "mask-image-radial": [{
        "mask-radial": [isArbitraryVariable, isArbitraryValue]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": scaleMaskImagePosition()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": scaleMaskImagePosition()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": scaleColor()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": scaleColor()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": scalePosition()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [isNumber]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": scaleMaskImagePosition()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": scaleMaskImagePosition()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": scaleColor()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": scaleColor()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: scaleBgPosition()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: scaleBgRepeat()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: scaleBgSize()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: scaleBlur()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeDropShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": scaleColor()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": scaleBlur()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": scaleUnambiguousSpacing()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [isNumber, "initial", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", themeEase, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", themeAnimate, isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [themePerspective, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": scalePositionWithArbitrary()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: scaleRotate()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": scaleRotate()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": scaleRotate()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": scaleRotate()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: scaleScale()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": scaleScale()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": scaleScale()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": scaleScale()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: scaleSkew()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": scaleSkew()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": scaleSkew()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [isArbitraryVariable, isArbitraryValue, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: scalePositionWithArbitrary()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: scaleTranslate()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": scaleTranslate()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": scaleTranslate()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": scaleTranslate()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      /**
       * Zoom
       * @see https://tailwindcss.com/docs/zoom
       */
      zoom: [{
        zoom: [isInteger, isArbitraryVariable, isArbitraryValue]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: scaleColor()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: scaleColor()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scrollbar Thumb Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-thumb-color": [{
        "scrollbar-thumb": scaleColor()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": scaleColor()
      }],
      /**
       * Scrollbar Gutter
       * @see https://tailwindcss.com/docs/scrollbar-gutter
       */
      "scrollbar-gutter": [{
        "scrollbar-gutter": ["auto", "stable", "both"]
      }],
      /**
       * Scrollbar Width
       * @see https://tailwindcss.com/docs/scrollbar-width
       */
      "scrollbar-w": [{
        scrollbar: ["auto", "thin", "none"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryVariable, isArbitraryValue]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...scaleColor()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isNumber, isArbitraryVariableLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...scaleColor()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      "container-named": ["container-type"],
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["start", "end", "right", "left"],
      "inset-y": ["inset-bs", "inset-be", "top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["ps", "pe", "pr", "pl"],
      py: ["pbs", "pbe", "pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["ms", "me", "mr", "ml"],
      my: ["mbs", "mbe", "mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-s", "border-w-e", "border-w-r", "border-w-l"],
      "border-w-y": ["border-w-bs", "border-w-be", "border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-s", "border-color-e", "border-color-r", "border-color-l"],
      "border-color-y": ["border-color-bs", "border-color-be", "border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-ms", "scroll-me", "scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-ps", "scroll-pe", "scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    postfixLookupClassGroups: ["container-type"],
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
};
var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);

// libs/ui/utils/src/lib/hlm.ts
function hlm(...inputs) {
  return twMerge(clsx(inputs));
}
var elementClassManagers = /* @__PURE__ */ new WeakMap();
var globalObserver = null;
var observedElements = /* @__PURE__ */ new Set();
var sourceCounter = 0;
function classes(computed2, options = {}) {
  runInInjectionContext(options.injector ?? inject(Injector), () => {
    const elementRef = options.elementRef ?? inject(ElementRef);
    const platformId = inject(PLATFORM_ID);
    const destroyRef = inject(DestroyRef);
    const baseClasses = inject(new HostAttributeToken("class"), { optional: true });
    const element = elementRef.nativeElement;
    const sourceId = sourceCounter++;
    let manager = elementClassManagers.get(element);
    if (!manager) {
      const initialBaseClasses = /* @__PURE__ */ new Set();
      if (baseClasses) {
        toClassList(baseClasses).forEach((cls) => initialBaseClasses.add(cls));
      }
      manager = {
        element,
        sources: /* @__PURE__ */ new Map(),
        baseClasses: initialBaseClasses,
        isUpdating: false,
        nextOrder: 0,
        hasInitialized: false,
        restoreRafId: null,
        transitionsSuppressed: false,
        previousTransition: "",
        previousTransitionPriority: ""
      };
      elementClassManagers.set(element, manager);
      setupGlobalObserver(platformId);
      observedElements.add(element);
      if (isPlatformBrowser(platformId)) {
        manager.previousTransition = element.style.getPropertyValue("transition");
        manager.previousTransitionPriority = element.style.getPropertyPriority("transition");
        element.style.setProperty("transition", "none", "important");
        manager.transitionsSuppressed = true;
      }
    }
    const sourceOrder = manager.nextOrder++;
    function updateClasses() {
      const newClasses = toClassList(computed2());
      manager.sources.set(sourceId, {
        classes: new Set(newClasses),
        order: sourceOrder
      });
      updateElement(manager);
      if (manager.transitionsSuppressed) {
        manager.transitionsSuppressed = false;
        manager.restoreRafId = requestAnimationFrame(() => {
          manager.restoreRafId = null;
          restoreTransitionSuppression(manager);
        });
      }
    }
    destroyRef.onDestroy(() => {
      if (manager.restoreRafId !== null) {
        cancelAnimationFrame(manager.restoreRafId);
        manager.restoreRafId = null;
      }
      if (manager.transitionsSuppressed) {
        manager.transitionsSuppressed = false;
        restoreTransitionSuppression(manager);
      }
      manager.sources.delete(sourceId);
      if (manager.sources.size === 0) {
        cleanupManager(element);
      } else {
        updateElement(manager);
      }
    });
    effect(updateClasses);
  });
}
function restoreTransitionSuppression(manager) {
  const prev = manager.previousTransition;
  if (prev) {
    manager.element.style.setProperty(
      "transition",
      prev,
      manager.previousTransitionPriority || void 0
    );
  } else {
    manager.element.style.removeProperty("transition");
  }
}
function setupGlobalObserver(platformId) {
  if (isPlatformBrowser(platformId) && !globalObserver) {
    globalObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          const element = mutation.target;
          const manager = elementClassManagers.get(element);
          if (manager && observedElements.has(element)) {
            if (manager.isUpdating) continue;
            const currentClasses = toClassList(element.className);
            const allSourceClasses = /* @__PURE__ */ new Set();
            for (const source of manager.sources.values()) {
              for (const className of source.classes) {
                allSourceClasses.add(className);
              }
            }
            manager.baseClasses.clear();
            for (const className of currentClasses) {
              if (!allSourceClasses.has(className)) {
                manager.baseClasses.add(className);
              }
            }
            updateElement(manager);
          }
        }
      }
    });
    globalObserver.observe(document, {
      attributes: true,
      attributeFilter: ["class"],
      subtree: true
      // Watch all descendants
    });
  }
}
function updateElement(manager) {
  if (manager.isUpdating) return;
  manager.isUpdating = true;
  if (!manager.hasInitialized && manager.sources.size > 0) {
    const currentClasses = toClassList(manager.element.className);
    const allSourceClasses2 = /* @__PURE__ */ new Set();
    for (const source of manager.sources.values()) {
      source.classes.forEach((className) => allSourceClasses2.add(className));
    }
    currentClasses.forEach((className) => {
      if (!allSourceClasses2.has(className)) {
        manager.baseClasses.add(className);
      }
    });
    manager.hasInitialized = true;
  }
  const sortedSources = Array.from(manager.sources.entries()).sort(
    ([, a], [, b]) => a.order - b.order
  );
  const allSourceClasses = [];
  for (const [, source] of sortedSources) {
    allSourceClasses.push(...source.classes);
  }
  const classesToApply = allSourceClasses.length > 0 || manager.baseClasses.size > 0 ? hlm([...allSourceClasses, ...manager.baseClasses]) : "";
  if (manager.element.className !== classesToApply) {
    manager.element.className = classesToApply;
  }
  manager.isUpdating = false;
}
function cleanupManager(element) {
  observedElements.delete(element);
  elementClassManagers.delete(element);
  if (observedElements.size === 0 && globalObserver) {
    globalObserver.disconnect();
    globalObserver = null;
  }
}
var classListCache = /* @__PURE__ */ new Map();
function toClassList(className) {
  if (typeof className === "string" && classListCache.has(className)) {
    return classListCache.get(className);
  }
  const result = clsx(className).split(" ").filter((c) => c.length > 0);
  if (typeof className === "string" && classListCache.size < 1e3) {
    classListCache.set(className, result);
  }
  return result;
}

// node_modules/class-variance-authority/dist/index.mjs
var falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
var cx = clsx;
var cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let _a = param, { class: cvClass, className: cvClassName } = _a, compoundVariantOptions = __objRest(_a, ["class", "className"]);
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes(__spreadValues(__spreadValues({}, defaultVariants), propsWithoutUndefined)[key]) : __spreadValues(__spreadValues({}, defaultVariants), propsWithoutUndefined)[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};

// libs/ui/button/src/lib/hlm-button.token.ts
var defaultConfig = {
  variant: "default",
  size: "default"
};
var BrnButtonConfigToken = new InjectionToken("BrnButtonConfig");
function injectBrnButtonConfig() {
  return inject(BrnButtonConfigToken, { optional: true }) ?? defaultConfig;
}

// libs/ui/button/src/lib/hlm-button.ts
var buttonVariants = cva("focus-visible:border-ring focus-visible:ring-ring/50 data-[matches-spartan-invalid=true]:ring-destructive/20 dark:data-[matches-spartan-invalid=true]:ring-destructive/40 data-[matches-spartan-invalid=true]:border-destructive dark:data-[matches-spartan-invalid=true]:border-destructive/50 rounded-md border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 active:not-aria-[haspopup]:translate-y-px data-[matches-spartan-invalid=true]:ring-3 [&_ng-icon:not([class*='text-'])]:text-[length:--spacing(4)] group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_ng-icon]:pointer-events-none [&_ng-icon]:shrink-0", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/80",
      outline: "border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground shadow-xs",
      secondary: "bg-secondary text-secondary-foreground aria-expanded:bg-secondary aria-expanded:text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
      ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground",
      destructive: "bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
      xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_ng-icon:not([class*='text-'])]:text-[length:--spacing(3)]",
      sm: "h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
      lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
      icon: "size-9",
      "icon-xs": "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_ng-icon:not([class*='text-'])]:text-[length:--spacing(3)]",
      "icon-sm": "size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md",
      "icon-lg": "size-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
var HlmButton = class _HlmButton {
  _config = injectBrnButtonConfig();
  _additionalClasses = signal(
    "",
    ...ngDevMode ? [{ debugName: "_additionalClasses" }] : (
      /* istanbul ignore next */
      []
    )
  );
  variant = input(
    this._config.variant,
    ...ngDevMode ? [{ debugName: "variant" }] : (
      /* istanbul ignore next */
      []
    )
  );
  size = input(
    this._config.size,
    ...ngDevMode ? [{ debugName: "size" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    classes(() => [
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this._additionalClasses()
    ]);
  }
  setClass(classes2) {
    this._additionalClasses.set(classes2);
  }
  static \u0275fac = function HlmButton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HlmButton)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _HlmButton, selectors: [["button", "hlmBtn", ""], ["a", "hlmBtn", ""]], hostAttrs: ["data-slot", "button"], inputs: { variant: [1, "variant"], size: [1, "size"] }, exportAs: ["hlmBtn"], features: [\u0275\u0275HostDirectivesFeature([{ directive: BrnButton, inputs: ["disabled", "disabled"] }])] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HlmButton, [{
    type: Directive,
    args: [{
      selector: "button[hlmBtn], a[hlmBtn]",
      exportAs: "hlmBtn",
      hostDirectives: [{ directive: BrnButton, inputs: ["disabled"] }],
      host: { "data-slot": "button" }
    }]
  }], () => [], { variant: [{ type: Input, args: [{ isSignal: true, alias: "variant", required: false }] }], size: [{ type: Input, args: [{ isSignal: true, alias: "size", required: false }] }] });
})();

// node_modules/@spartan-ng/brain/fesm2022/spartan-ng-brain-forms.mjs
function controlStateEqual(a, b) {
  return a === b || a != null && b != null && a.dirty === b.dirty && a.invalid === b.invalid && a.touched === b.touched && a.spartanInvalid === b.spartanInvalid && a.errors === b.errors;
}
var ReactiveStateTracker = class {
  _ngControl;
  _matcher;
  _parentFormGroup;
  _parentForm;
  _stateVersion = signal(0, ...ngDevMode ? [{ debugName: "_stateVersion" }] : (
    /* istanbul ignore next */
    []
  ));
  _eventsSubscription;
  controlState = computed(() => {
    const control = this._ngControl.control;
    if (!control)
      return null;
    this._stateVersion();
    const spartanInvalid = this._matcher?.isInvalid(control, this._controlParent) ?? false;
    return {
      dirty: control.dirty,
      errors: control.errors,
      invalid: control.invalid,
      spartanInvalid,
      touched: control.touched
    };
  }, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "controlState" } : (
    /* istanbul ignore next */
    {}
  )), { equal: controlStateEqual }));
  errors = computed(() => this.controlState()?.errors ?? null, ...ngDevMode ? [{ debugName: "errors" }] : (
    /* istanbul ignore next */
    []
  ));
  dirty = computed(() => this.controlState()?.dirty ?? null, ...ngDevMode ? [{ debugName: "dirty" }] : (
    /* istanbul ignore next */
    []
  ));
  invalid = computed(() => this.controlState()?.invalid ?? null, ...ngDevMode ? [{ debugName: "invalid" }] : (
    /* istanbul ignore next */
    []
  ));
  spartanInvalid = computed(() => this.controlState()?.spartanInvalid ?? null, ...ngDevMode ? [{ debugName: "spartanInvalid" }] : (
    /* istanbul ignore next */
    []
  ));
  touched = computed(() => this.controlState()?.touched ?? null, ...ngDevMode ? [{ debugName: "touched" }] : (
    /* istanbul ignore next */
    []
  ));
  get _controlParent() {
    return this._parentFormGroup || this._parentForm;
  }
  constructor(_ngControl, _matcher, _parentFormGroup, _parentForm) {
    this._ngControl = _ngControl;
    this._matcher = _matcher;
    this._parentFormGroup = _parentFormGroup;
    this._parentForm = _parentForm;
    const control = _ngControl.control;
    if (control) {
      this._eventsSubscription = control.events.subscribe(() => {
        this._stateVersion.update((v) => v + 1);
      });
    }
  }
  destroy() {
    this._eventsSubscription?.unsubscribe();
  }
};
var SignalStateTracker = class {
  _ngControl;
  _matcher;
  _parentFormGroup;
  _parentForm;
  _control = computed(() => {
    const control = this._ngControl.control;
    if (!control)
      return null;
    return control;
  }, ...ngDevMode ? [{ debugName: "_control" }] : (
    /* istanbul ignore next */
    []
  ));
  // With signal forms, AbstractControl is implemented by InteropNgControl, whose control state
  // properties (e.g. dirty, touched, invalid) are getter functions that internally read FormField state signals.
  // Accessing them inside a computed() therefore creates reactive signal dependencies automatically.
  // See: https://github.com/angular/angular/blob/39e382a756b552d2b7bd3ce2c364daee9d7a0056/packages/forms/signals/src/controls/interop_ng_control.ts#L68-L129
  dirty = computed(() => this._control()?.dirty ?? null, ...ngDevMode ? [{ debugName: "dirty" }] : (
    /* istanbul ignore next */
    []
  ));
  touched = computed(() => this._control()?.touched ?? null, ...ngDevMode ? [{ debugName: "touched" }] : (
    /* istanbul ignore next */
    []
  ));
  invalid = computed(() => this._control()?.invalid ?? null, ...ngDevMode ? [{ debugName: "invalid" }] : (
    /* istanbul ignore next */
    []
  ));
  errors = computed(() => this._control()?.errors ?? null, ...ngDevMode ? [{ debugName: "errors" }] : (
    /* istanbul ignore next */
    []
  ));
  spartanInvalid = computed(() => {
    const control = this._control();
    if (!control) {
      return null;
    }
    return this._matcher?.isInvalid(control, this._controlParent) ?? false;
  }, ...ngDevMode ? [{ debugName: "spartanInvalid" }] : (
    /* istanbul ignore next */
    []
  ));
  controlState = computed(() => {
    const dirty = this.dirty();
    const invalid = this.invalid();
    const touched = this.touched();
    const spartanInvalid = this.spartanInvalid();
    const errors = this.errors();
    if (dirty === null || invalid === null || touched === null || spartanInvalid === null)
      return null;
    return { dirty, errors, invalid, spartanInvalid, touched };
  }, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "controlState" } : (
    /* istanbul ignore next */
    {}
  )), { equal: controlStateEqual }));
  get _controlParent() {
    return this._parentFormGroup || this._parentForm;
  }
  constructor(_ngControl, _matcher, _parentFormGroup, _parentForm) {
    this._ngControl = _ngControl;
    this._matcher = _matcher;
    this._parentFormGroup = _parentFormGroup;
    this._parentForm = _parentForm;
  }
  destroy() {
  }
};
function createStateTracker(ngControl, matcher, parentFormGroup, parentForm) {
  if (ngControl.control && "field" in ngControl.control && isSignal(ngControl.control.field)) {
    return new SignalStateTracker(ngControl, matcher, parentFormGroup, parentForm);
  }
  return new ReactiveStateTracker(ngControl, matcher, parentFormGroup, parentForm);
}
var ShowOnDirtyErrorStateMatcher = class _ShowOnDirtyErrorStateMatcher {
  isInvalid(control, form) {
    return !!(control && control.invalid && (control.dirty || form instanceof NgForm && form.submitted));
  }
  /** @nocollapse */
  static \u0275fac = function ShowOnDirtyErrorStateMatcher_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ShowOnDirtyErrorStateMatcher)();
  };
  /** @nocollapse */
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ShowOnDirtyErrorStateMatcher,
    factory: _ShowOnDirtyErrorStateMatcher.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShowOnDirtyErrorStateMatcher, [{
    type: Injectable
  }], null, null);
})();
var ErrorStateMatcher = class _ErrorStateMatcher {
  isInvalid(control, form) {
    return !!(control && control.invalid && (control.touched || form instanceof NgForm && form.submitted));
  }
  /** @nocollapse */
  static \u0275fac = function ErrorStateMatcher_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ErrorStateMatcher)();
  };
  /** @nocollapse */
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ErrorStateMatcher,
    factory: _ErrorStateMatcher.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ErrorStateMatcher, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// node_modules/@spartan-ng/brain/fesm2022/spartan-ng-brain-field.mjs
var BrnFieldA11yService = class _BrnFieldA11yService {
  _descriptions = signal([], ...ngDevMode ? [{ debugName: "_descriptions" }] : (
    /* istanbul ignore next */
    []
  ));
  _errors = signal([], ...ngDevMode ? [{ debugName: "_errors" }] : (
    /* istanbul ignore next */
    []
  ));
  describedBy = computed(() => {
    const ids = [...this._descriptions(), ...this._errors()].filter(Boolean);
    const uniqueIds = [...new Set(ids)];
    return uniqueIds.length ? uniqueIds.join(" ") : null;
  }, ...ngDevMode ? [{ debugName: "describedBy" }] : (
    /* istanbul ignore next */
    []
  ));
  registerDescription(id) {
    this._descriptions.update((ids) => ids.includes(id) ? ids : [...ids, id]);
  }
  unregisterDescription(id) {
    this._descriptions.update((ids) => ids.filter((value) => value !== id));
  }
  registerError(id) {
    this._errors.update((ids) => ids.includes(id) ? ids : [...ids, id]);
  }
  unregisterError(id) {
    this._errors.update((ids) => ids.filter((value) => value !== id));
  }
  /** @nocollapse */
  static \u0275fac = function BrnFieldA11yService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BrnFieldA11yService)();
  };
  /** @nocollapse */
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _BrnFieldA11yService,
    factory: _BrnFieldA11yService.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnFieldA11yService, [{
    type: Injectable
  }], null, null);
})();
var BrnField = class _BrnField {
  _brnFieldControl = signal(null, ...ngDevMode ? [{ debugName: "_brnFieldControl" }] : (
    /* istanbul ignore next */
    []
  ));
  _labelable = signal(null, ...ngDevMode ? [{ debugName: "_labelable" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Whether the field is invalid. Overrides the `data-invalid` attribute. */
  dataInvalid = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "dataInvalid" } : (
    /* istanbul ignore next */
    {}
  )), {
    transform: booleanAttribute,
    alias: "data-invalid"
  }));
  /**
   * Whether to force the field into an invalid state, regardless of the form control's state.
   * Overrides both the `data-invalid` and `data-matches-spartan-invalid` attributes.
   */
  forceInvalid = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "forceInvalid" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  _invalid = computed(() => {
    if (this.forceInvalid() || this.dataInvalid())
      return true;
    const control = this._brnFieldControl();
    if (!control || !control.ngControl)
      return false;
    return control.controlState()?.invalid;
  }, ...ngDevMode ? [{ debugName: "_invalid" }] : (
    /* istanbul ignore next */
    []
  ));
  _spartanInvalid = computed(() => {
    return this.forceInvalid() || (this._brnFieldControl()?.controlState()?.spartanInvalid ?? null);
  }, ...ngDevMode ? [{ debugName: "_spartanInvalid" }] : (
    /* istanbul ignore next */
    []
  ));
  _dirty = computed(() => {
    return this._brnFieldControl()?.controlState()?.dirty ?? null;
  }, ...ngDevMode ? [{ debugName: "_dirty" }] : (
    /* istanbul ignore next */
    []
  ));
  _touched = computed(() => {
    return this._brnFieldControl()?.controlState()?.touched ?? null;
  }, ...ngDevMode ? [{ debugName: "_touched" }] : (
    /* istanbul ignore next */
    []
  ));
  labelableId = computed(() => this._labelable()?.labelableId(), ...ngDevMode ? [{ debugName: "labelableId" }] : (
    /* istanbul ignore next */
    []
  ));
  brnFieldControl = this._brnFieldControl.asReadonly();
  errors = computed(() => this._brnFieldControl()?.errors() ?? null, ...ngDevMode ? [{ debugName: "errors" }] : (
    /* istanbul ignore next */
    []
  ));
  controlState = computed(() => this._brnFieldControl()?.controlState() ?? null, ...ngDevMode ? [{ debugName: "controlState" }] : (
    /* istanbul ignore next */
    []
  ));
  registerFieldControl(fieldControl) {
    if (this._brnFieldControl())
      return;
    this._brnFieldControl.set(fieldControl);
  }
  registerLabelable(labelable) {
    if (this._labelable())
      return;
    this._labelable.set(labelable);
  }
  unregisterFieldControl(fieldControl) {
    if (this._brnFieldControl() !== fieldControl)
      return;
    this._brnFieldControl.set(null);
  }
  unregisterLabelable(labelable) {
    if (this._labelable() !== labelable)
      return;
    this._labelable.set(null);
  }
  /** @nocollapse */
  static \u0275fac = function BrnField_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BrnField)();
  };
  /** @nocollapse */
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _BrnField,
    selectors: [["", "brnField", ""], ["brn-field"]],
    hostVars: 4,
    hostBindings: function BrnField_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("data-invalid", ctx._invalid() ? "true" : null)("data-matches-spartan-invalid", ctx._spartanInvalid() ? "true" : null)("data-touched", ctx._touched() ? "true" : null)("data-dirty", ctx._dirty() ? "true" : null);
      }
    },
    inputs: {
      dataInvalid: [1, "data-invalid", "dataInvalid"],
      forceInvalid: [1, "forceInvalid"]
    },
    features: [\u0275\u0275ProvidersFeature([BrnFieldA11yService])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnField, [{
    type: Directive,
    args: [{
      selector: "[brnField],brn-field",
      providers: [BrnFieldA11yService],
      host: {
        "[attr.data-invalid]": '_invalid() ? "true" : null',
        "[attr.data-matches-spartan-invalid]": '_spartanInvalid() ? "true" : null',
        "[attr.data-touched]": '_touched() ? "true" : null',
        "[attr.data-dirty]": '_dirty() ? "true" : null'
      }
    }]
  }], null, { dataInvalid: [{ type: Input, args: [{ isSignal: true, alias: "data-invalid", required: false }] }], forceInvalid: [{ type: Input, args: [{ isSignal: true, alias: "forceInvalid", required: false }] }] });
})();
var BrnLabelable = new InjectionToken("BrnLabelable");
function provideBrnLabelable(labelable) {
  return { provide: BrnLabelable, useExisting: labelable };
}
var BrnFieldControl = class _BrnFieldControl {
  _injector = inject(Injector);
  _errorStateMatcher = inject(ErrorStateMatcher);
  _parentForm = inject(NgForm, { optional: true });
  _parentFormGroup = inject(FormGroupDirective, { optional: true });
  _field = inject(BrnField, { optional: true });
  _destroyRef = inject(DestroyRef);
  _labelable = null;
  _parentFieldControl = null;
  _stateTracker = signal(null, ...ngDevMode ? [{ debugName: "_stateTracker" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Sentinel value to differentiate "never checked" from "control is null". */
  _lastControl = null;
  /** Gets the AbstractControlDirective for this control. */
  ngControl = null;
  controlState = computed(() => this._stateTracker()?.controlState() ?? null, ...ngDevMode ? [{ debugName: "controlState" }] : (
    /* istanbul ignore next */
    []
  ));
  errors = computed(() => this._stateTracker()?.errors() ?? null, ...ngDevMode ? [{ debugName: "errors" }] : (
    /* istanbul ignore next */
    []
  ));
  dirty = computed(() => this._stateTracker()?.dirty() ?? null, ...ngDevMode ? [{ debugName: "dirty" }] : (
    /* istanbul ignore next */
    []
  ));
  invalid = computed(() => this._stateTracker()?.invalid() ?? null, ...ngDevMode ? [{ debugName: "invalid" }] : (
    /* istanbul ignore next */
    []
  ));
  spartanInvalid = computed(() => this._stateTracker()?.spartanInvalid() ?? null, ...ngDevMode ? [{ debugName: "spartanInvalid" }] : (
    /* istanbul ignore next */
    []
  ));
  touched = computed(() => this._stateTracker()?.touched() ?? null, ...ngDevMode ? [{ debugName: "touched" }] : (
    /* istanbul ignore next */
    []
  ));
  constructor() {
    this._destroyRef.onDestroy(() => {
      this._field?.unregisterFieldControl(this);
      if (this._labelable) {
        this._field?.unregisterLabelable(this._labelable);
      }
      this._stateTracker()?.destroy();
    });
  }
  ngOnInit() {
    this.ngControl = this._injector.get(NgControl, null);
    this._parentFieldControl = this._injector.get(_BrnFieldControl, null, { skipSelf: true });
    if (this.ngControl) {
      this._field?.registerFieldControl(this);
    }
    this._syncTracker();
    if (this.ngControl) {
      Promise.resolve().then(() => {
        this._syncTracker();
      });
    }
    this._labelable = this._injector.get(BrnLabelable, null);
    if (this._labelable) {
      this._field?.registerLabelable(this._labelable);
    }
  }
  // Re-evaluate the control reference on every change detection cycle because
  // the underlying AbstractControl may change when [formControl] rebinds to a new instance.
  // When the instance changes we tear down the old tracker and create a fresh one.
  ngDoCheck() {
    this._syncTracker();
  }
  /** @returns true if the control reference changed */
  _syncTracker() {
    if (!this.ngControl || this._hasFieldControlParent())
      return;
    const currentControl = this.ngControl.control ?? null;
    if (currentControl === this._lastControl)
      return;
    this._lastControl = currentControl;
    this._stateTracker()?.destroy();
    this._stateTracker.set(currentControl ? createStateTracker(this.ngControl, this._errorStateMatcher, this._parentFormGroup, this._parentForm) : null);
  }
  _hasFieldControlParent() {
    if (this._field) {
      return this._field.brnFieldControl() !== this;
    }
    return !!this._parentFieldControl?.ngControl && this._parentFieldControl.ngControl === this.ngControl;
  }
  /** @nocollapse */
  static \u0275fac = function BrnFieldControl_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BrnFieldControl)();
  };
  /** @nocollapse */
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _BrnFieldControl
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnFieldControl, [{
    type: Directive
  }], () => [], null);
})();
var BrnFieldControlDescribedBy = class _BrnFieldControlDescribedBy {
  describedBy = input(null, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "describedBy" } : (
    /* istanbul ignore next */
    {}
  )), { alias: "aria-describedby" }));
  _a11y = inject(BrnFieldA11yService, { optional: true });
  _computedDescribedBy = computed(() => {
    const manual = this.describedBy();
    const manualList = manual ? manual.split(/\s+/).filter(Boolean) : [];
    const fieldIds = this._a11y?.describedBy() ?? null;
    const fieldList = fieldIds ? fieldIds.split(/\s+/).filter(Boolean) : [];
    const combined = [.../* @__PURE__ */ new Set([...manualList, ...fieldList])];
    return combined.length ? combined.join(" ") : null;
  }, ...ngDevMode ? [{ debugName: "_computedDescribedBy" }] : (
    /* istanbul ignore next */
    []
  ));
  /** @nocollapse */
  static \u0275fac = function BrnFieldControlDescribedBy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BrnFieldControlDescribedBy)();
  };
  /** @nocollapse */
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _BrnFieldControlDescribedBy,
    selectors: [["", "brnFieldControlDescribedBy", ""]],
    hostVars: 1,
    hostBindings: function BrnFieldControlDescribedBy_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-describedby", ctx._computedDescribedBy());
      }
    },
    inputs: {
      describedBy: [1, "aria-describedby", "describedBy"]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnFieldControlDescribedBy, [{
    type: Directive,
    args: [{
      selector: "[brnFieldControlDescribedBy]",
      host: {
        "[attr.aria-describedby]": "_computedDescribedBy()"
      }
    }]
  }], null, { describedBy: [{ type: Input, args: [{ isSignal: true, alias: "aria-describedby", required: false }] }] });
})();

// node_modules/@spartan-ng/brain/fesm2022/spartan-ng-brain-input.mjs
var BrnInput = class _BrnInput {
  static _id = 0;
  _fieldControl = inject(BrnFieldControl, { optional: true });
  /** The id of the input. */
  id = input(`brn-input-${++_BrnInput._id}`, ...ngDevMode ? [{ debugName: "id" }] : (
    /* istanbul ignore next */
    []
  ));
  /** Whether to force the input into an invalid state. */
  forceInvalid = input(false, __spreadProps(__spreadValues({}, ngDevMode ? { debugName: "forceInvalid" } : (
    /* istanbul ignore next */
    {}
  )), { transform: booleanAttribute }));
  labelableId = this.id;
  _ariaInvalid = this._fieldControl?.invalid;
  _touched = this._fieldControl?.touched;
  _dirty = this._fieldControl?.dirty;
  _spartanInvalid = computed(() => this.forceInvalid() || this._fieldControl?.spartanInvalid(), ...ngDevMode ? [{ debugName: "_spartanInvalid" }] : (
    /* istanbul ignore next */
    []
  ));
  /** @nocollapse */
  static \u0275fac = function BrnInput_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BrnInput)();
  };
  /** @nocollapse */
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _BrnInput,
    selectors: [["", "brnInput", ""]],
    hostVars: 6,
    hostBindings: function BrnInput_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275domProperty("id", ctx.id());
        \u0275\u0275attribute("aria-invalid", (ctx._ariaInvalid == null ? null : ctx._ariaInvalid()) ? "true" : null)("data-invalid", (ctx._ariaInvalid == null ? null : ctx._ariaInvalid()) ? "true" : null)("data-touched", (ctx._touched == null ? null : ctx._touched()) ? "true" : null)("data-dirty", (ctx._dirty == null ? null : ctx._dirty()) ? "true" : null)("data-matches-spartan-invalid", ctx._spartanInvalid() ? "true" : null);
      }
    },
    inputs: {
      id: [1, "id"],
      forceInvalid: [1, "forceInvalid"]
    },
    features: [\u0275\u0275ProvidersFeature([provideBrnLabelable(_BrnInput)]), \u0275\u0275HostDirectivesFeature([BrnFieldControl])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrnInput, [{
    type: Directive,
    args: [{
      selector: "[brnInput]",
      providers: [provideBrnLabelable(BrnInput)],
      hostDirectives: [BrnFieldControl],
      host: {
        "[id]": "id()",
        "[attr.aria-invalid]": '_ariaInvalid?.() ? "true" : null',
        "[attr.data-invalid]": '_ariaInvalid?.() ? "true" : null',
        "[attr.data-touched]": '_touched?.() ? "true" : null',
        "[attr.data-dirty]": '_dirty?.() ? "true" : null',
        "[attr.data-matches-spartan-invalid]": '_spartanInvalid() ? "true" : null'
      }
    }]
  }], null, { id: [{ type: Input, args: [{ isSignal: true, alias: "id", required: false }] }], forceInvalid: [{ type: Input, args: [{ isSignal: true, alias: "forceInvalid", required: false }] }] });
})();

// libs/ui/input/src/lib/hlm-input.ts
var HlmInput = class _HlmInput {
  constructor() {
    classes(() => "dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 data-[matches-spartan-invalid=true]:ring-destructive/20 dark:data-[matches-spartan-invalid=true]:ring-destructive/40 data-[matches-spartan-invalid=true]:border-destructive dark:data-[matches-spartan-invalid=true]:border-destructive/50 h-9 rounded-md border bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] file:h-7 file:text-sm file:font-medium focus-visible:ring-3 data-[matches-spartan-invalid=true]:ring-3 md:text-sm file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50");
  }
  static \u0275fac = function HlmInput_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HlmInput)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _HlmInput, selectors: [["", "hlmInput", ""]], hostAttrs: ["data-slot", "input"], features: [\u0275\u0275HostDirectivesFeature([{ directive: BrnInput, inputs: ["id", "id", "forceInvalid", "forceInvalid"] }, BrnFieldControlDescribedBy])] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HlmInput, [{
    type: Directive,
    args: [{
      selector: "[hlmInput]",
      hostDirectives: [
        { directive: BrnInput, inputs: ["id", "forceInvalid"] },
        BrnFieldControlDescribedBy
      ],
      host: { "data-slot": "input" }
    }]
  }], () => [], null);
})();

// libs/ui/badge/src/lib/hlm-badge.ts
var badgeVariants = cva("h-5 gap-1 rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&>ng-icon]:text-[length:--spacing(3)] group/badge focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap focus-visible:ring-[3px] [&>ng-icon]:pointer-events-none", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
      secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
      destructive: "bg-destructive/10 [a]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive dark:bg-destructive/20",
      outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
      ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
      link: "text-primary underline-offset-4 hover:underline"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
var HlmBadge = class _HlmBadge {
  variant = input(
    "default",
    ...ngDevMode ? [{ debugName: "variant" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    classes(() => badgeVariants({ variant: this.variant() }));
  }
  static \u0275fac = function HlmBadge_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HlmBadge)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _HlmBadge, selectors: [["", "hlmBadge", ""], ["hlm-badge"]], hostAttrs: ["data-slot", "badge"], hostVars: 1, hostBindings: function HlmBadge_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275attribute("data-variant", ctx.variant());
    }
  }, inputs: { variant: [1, "variant"] } });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HlmBadge, [{
    type: Directive,
    args: [{
      selector: "[hlmBadge],hlm-badge",
      host: {
        "data-slot": "badge",
        "[attr.data-variant]": "variant()"
      }
    }]
  }], () => [], { variant: [{ type: Input, args: [{ isSignal: true, alias: "variant", required: false }] }] });
})();

// src/app/core/services/ai-chat.service.ts
var INITIAL_ASSISTANT_MESSAGE = {
  id: "msg-init",
  sender: "assistant",
  text: "\xA1Hola! Soy **DoctorChart Copilot**, tu asistente pedi\xE1trico cl\xEDnico con inteligencia artificial. Puedo asistirte en la interpretaci\xF3n de curvas de crecimiento, percentiles OMS, hitos del desarrollo psicomotor y resumen cl\xEDnico de pacientes. \xBFEn qu\xE9 puedo ayudarte hoy?",
  timestamp: /* @__PURE__ */ new Date()
};
var AiChatService = class _AiChatService {
  http = inject(HttpClient);
  auth = inject(AuthService);
  patient = inject(ActivePatientService);
  workspace = inject(WorkspaceStore);
  request = null;
  context = "";
  contextRevision = signal(
    0,
    ...ngDevMode ? [{ debugName: "contextRevision" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    this.syncContext();
    effect(() => {
      this.auth.currentUser();
      this.patient.activePatient();
      this.workspace.specialtyCode();
      this.workspace.activeModules();
      untracked(() => this.syncContext());
    });
    inject(DestroyRef).onDestroy(() => this.request?.unsubscribe());
  }
  syncContext() {
    const context = this.contextKey();
    if (context === this.context)
      return;
    this.context = context;
    this.clearHistory();
    this.isOpen.set(false);
  }
  contextKey() {
    return JSON.stringify([this.auth.currentUser()?.id ?? null, this.patient.activePatient()?.id ?? null, this.workspace.specialtyCode(), this.workspace.isModuleActive("AI_ASSISTANT")]);
  }
  isOpen = signal(
    false,
    ...ngDevMode ? [{ debugName: "isOpen" }] : (
      /* istanbul ignore next */
      []
    )
  );
  isTyping = signal(
    false,
    ...ngDevMode ? [{ debugName: "isTyping" }] : (
      /* istanbul ignore next */
      []
    )
  );
  messages = signal(
    [INITIAL_ASSISTANT_MESSAGE],
    ...ngDevMode ? [{ debugName: "messages" }] : (
      /* istanbul ignore next */
      []
    )
  );
  hasUnread = signal(
    false,
    ...ngDevMode ? [{ debugName: "hasUnread" }] : (
      /* istanbul ignore next */
      []
    )
  );
  suggestedPrompts = [
    "Interpretar percentil de peso/edad",
    "Hitos madurativos a los 12 meses",
    "Resumen de \xFAltimos controles",
    "\xBFC\xF3mo registrar antecedentes perinatales?"
  ];
  toggleChat() {
    if (!FEATURE_FLAGS.AI_ASSISTANT_ENABLED)
      return;
    if (!this.workspace.isModuleActive("AI_ASSISTANT"))
      return;
    const next = !this.isOpen();
    this.isOpen.set(next);
    if (next) {
      this.hasUnread.set(false);
    }
  }
  openChat() {
    if (!FEATURE_FLAGS.AI_ASSISTANT_ENABLED)
      return;
    if (!this.workspace.isModuleActive("AI_ASSISTANT"))
      return;
    this.isOpen.set(true);
    this.hasUnread.set(false);
  }
  closeChat() {
    this.isOpen.set(false);
  }
  clearHistory() {
    this.request?.unsubscribe();
    this.request = null;
    this.contextRevision.update((value) => value + 1);
    this.isTyping.set(false);
    this.hasUnread.set(false);
    this.messages.set([
      __spreadProps(__spreadValues({}, INITIAL_ASSISTANT_MESSAGE), {
        id: "msg-" + Date.now(),
        timestamp: /* @__PURE__ */ new Date()
      })
    ]);
  }
  sendMessage(userText) {
    if (!FEATURE_FLAGS.AI_ASSISTANT_ENABLED)
      return;
    this.syncContext();
    if (!this.auth.currentUser()?.id || !this.workspace.isModuleActive("AI_ASSISTANT"))
      return;
    const revision = this.contextRevision();
    const context = this.context;
    const current = () => revision === this.contextRevision() && context === this.contextKey();
    const trimmed = userText.trim();
    if (!trimmed || this.isTyping())
      return;
    const userMsg = {
      id: "usr-" + Date.now(),
      sender: "user",
      text: trimmed,
      timestamp: /* @__PURE__ */ new Date()
    };
    this.messages.update((prev) => [...prev, userMsg]);
    this.isTyping.set(true);
    this.request = this.http.post(environment.aiGatewayUrl, { message: trimmed }).subscribe({
      next: (res) => {
        if (!current())
          return;
        this.isTyping.set(false);
        const botMsg = {
          id: "bot-" + Date.now(),
          sender: "assistant",
          text: res?.response || "No se recibi\xF3 una respuesta cl\xEDnica del asistente.",
          timestamp: /* @__PURE__ */ new Date()
        };
        this.messages.update((prev) => [...prev, botMsg]);
        if (!this.isOpen()) {
          this.hasUnread.set(true);
        }
      },
      error: (err) => {
        if (!current())
          return;
        this.isTyping.set(false);
        let errorText = "No fue posible procesar la consulta cl\xEDnica en este momento. Por favor, intente nuevamente en unos instantes.";
        if (err.status === 0) {
          errorText = "No se pudo establecer conexi\xF3n con el asistente cl\xEDnico de DoctorChart. Verifique su conexi\xF3n o intente m\xE1s tarde.";
        } else if (err.status === 429) {
          errorText = "Ha alcanzado el l\xEDmite de consultas cl\xEDnicas permitidas por ahora. Por favor, espere unos minutos antes de volver a consultar.";
        } else if (err.status === 401 || err.status === 403) {
          errorText = "Su sesi\xF3n ha expirado o requiere iniciar sesi\xF3n para consultar al asistente de DoctorChart.";
        } else if (err.status >= 500) {
          errorText = "El servicio de inteligencia artificial pedi\xE1trica experimenta demoras t\xE9cnicas. Por favor, reintente en unos instantes.";
        } else {
          const rawMsg = (typeof err.error === "string" ? err.error : null) || err.error?.error || err.error?.message;
          const isTechnical = typeof rawMsg === "string" && /network|fetch|http failure|status|stack|panic|econnrefused|enotfound|exception|syntaxerror|typeerror/i.test(rawMsg);
          if (typeof rawMsg === "string" && rawMsg.trim() && !isTechnical) {
            errorText = rawMsg;
          }
        }
        const errorMsg = {
          id: "err-" + Date.now(),
          sender: "assistant",
          text: errorText,
          timestamp: /* @__PURE__ */ new Date(),
          isError: true
        };
        this.messages.update((prev) => [...prev, errorMsg]);
        if (!this.isOpen()) {
          this.hasUnread.set(true);
        }
      }
    });
  }
  static \u0275fac = function AiChatService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AiChatService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AiChatService, factory: _AiChatService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AiChatService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// src/app/features/ai-assistant/ai-assistant-widget.component.ts
var _c0 = ["messagesContainer"];
var _forTrack0 = ($index, $item) => $item.id;
function AiAssistantWidgetComponent_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275element(1, "span", 8)(2, "span", 9);
    \u0275\u0275elementEnd();
  }
}
function AiAssistantWidgetComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 4);
    \u0275\u0275listener("click", function AiAssistantWidgetComponent_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.chatService.toggleChat());
    });
    \u0275\u0275element(1, "span", 5)(2, "ng-icon", 6);
    \u0275\u0275conditionalCreate(3, AiAssistantWidgetComponent_Conditional_1_Conditional_3_Template, 3, 0, "span", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.chatService.hasUnread() ? 3 : -1);
  }
}
function AiAssistantWidgetComponent_Conditional_2_For_24_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 37);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const msg_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", msg_r4.text, " ");
  }
}
function AiAssistantWidgetComponent_Conditional_2_For_24_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36)(1, "div", 38);
    \u0275\u0275element(2, "ng-icon", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 40);
    \u0275\u0275element(4, "div", 41);
    \u0275\u0275elementStart(5, "span", 42);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const msg_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("border-rose-700", msg_r4.isError)("bg-rose-950/30", msg_r4.isError)("text-rose-200", msg_r4.isError)("border-zinc-800", !msg_r4.isError)("bg-zinc-900/80", !msg_r4.isError)("text-zinc-200", !msg_r4.isError);
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", ctx_r1.formatMessageText(msg_r4.text), \u0275\u0275sanitizeHtml);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.messageTime(msg_r4.timestamp), " ");
  }
}
function AiAssistantWidgetComponent_Conditional_2_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, AiAssistantWidgetComponent_Conditional_2_For_24_Conditional_0_Template, 3, 1, "div", 35)(1, AiAssistantWidgetComponent_Conditional_2_For_24_Conditional_1_Template, 7, 14, "div", 36);
  }
  if (rf & 2) {
    const msg_r4 = ctx.$implicit;
    \u0275\u0275conditional(msg_r4.sender === "user" ? 0 : 1);
  }
}
function AiAssistantWidgetComponent_Conditional_2_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 43);
    \u0275\u0275element(2, "ng-icon", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 44)(4, "span", 45);
    \u0275\u0275text(5, "DoctorChart est\xE1 evaluando");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "span", 46)(7, "span", 47)(8, "span", 48);
    \u0275\u0275elementEnd()();
  }
}
function AiAssistantWidgetComponent_Conditional_2_For_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 49);
    \u0275\u0275listener("click", function AiAssistantWidgetComponent_Conditional_2_For_28_Template_button_click_0_listener() {
      const prompt_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onPromptClick(prompt_r6));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const prompt_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.chatService.isTyping());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", prompt_r6, " ");
  }
}
function AiAssistantWidgetComponent_Conditional_2_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 33);
  }
}
function AiAssistantWidgetComponent_Conditional_2_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ng-icon", 34);
  }
}
function AiAssistantWidgetComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "header", 10)(2, "div", 11)(3, "div", 12);
    \u0275\u0275element(4, "ng-icon", 13)(5, "span", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "div", 15)(8, "h3", 16);
    \u0275\u0275text(9, " DoctorChart Copilot ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 17);
    \u0275\u0275text(11, " Pediatr\xEDa IA ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "p", 18);
    \u0275\u0275element(13, "span", 19);
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "En l\xEDnea \u2022 Asesor Cl\xEDnico");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(16, "div", 20)(17, "button", 21);
    \u0275\u0275listener("click", function AiAssistantWidgetComponent_Conditional_2_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.chatService.clearHistory());
    });
    \u0275\u0275element(18, "ng-icon", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 23);
    \u0275\u0275listener("click", function AiAssistantWidgetComponent_Conditional_2_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.chatService.closeChat());
    });
    \u0275\u0275element(20, "ng-icon", 24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 25, 0);
    \u0275\u0275repeaterCreate(23, AiAssistantWidgetComponent_Conditional_2_For_24_Template, 2, 1, null, null, _forTrack0);
    \u0275\u0275conditionalCreate(25, AiAssistantWidgetComponent_Conditional_2_Conditional_25_Template, 9, 0, "div", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 27);
    \u0275\u0275repeaterCreate(27, AiAssistantWidgetComponent_Conditional_2_For_28_Template, 2, 2, "button", 28, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "footer", 29)(30, "form", 30);
    \u0275\u0275listener("ngSubmit", function AiAssistantWidgetComponent_Conditional_2_Template_form_ngSubmit_30_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSendMessage());
    });
    \u0275\u0275elementStart(31, "input", 31);
    \u0275\u0275controlCreate();
    \u0275\u0275listener("ngModelChange", function AiAssistantWidgetComponent_Conditional_2_Template_input_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.inputMessage.set($event));
    })("keydown", function AiAssistantWidgetComponent_Conditional_2_Template_input_keydown_31_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onKeyDown($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "button", 32);
    \u0275\u0275conditionalCreate(33, AiAssistantWidgetComponent_Conditional_2_Conditional_33_Template, 1, 0, "ng-icon", 33)(34, AiAssistantWidgetComponent_Conditional_2_Conditional_34_Template, 1, 0, "ng-icon", 34);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(23);
    \u0275\u0275repeater(ctx_r1.chatService.messages());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.chatService.isTyping() ? 25 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.chatService.suggestedPrompts);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.inputMessage())("disabled", ctx_r1.chatService.isTyping());
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.inputMessage().trim() || ctx_r1.chatService.isTyping());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.chatService.isTyping() ? 33 : 34);
  }
}
var AiAssistantWidgetComponent = class _AiAssistantWidgetComponent {
  messageTime = (instant) => instantParts(instant).time;
  chatService = inject(AiChatService);
  draftRevision = this.chatService.contextRevision();
  inputMessage = signal(
    "",
    ...ngDevMode ? [{ debugName: "inputMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  messagesContainer = viewChild(
    "messagesContainer",
    ...ngDevMode ? [{ debugName: "messagesContainer" }] : (
      /* istanbul ignore next */
      []
    )
  );
  constructor() {
    effect(() => {
      this.draftRevision = this.chatService.contextRevision();
      this.inputMessage.set("");
    });
    effect(() => {
      this.chatService.messages();
      this.chatService.isTyping();
      this.chatService.isOpen();
      setTimeout(() => {
        this.scrollToBottom();
      }, 50);
    });
  }
  scrollToBottom() {
    const container = this.messagesContainer()?.nativeElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }
  onSendMessage() {
    this.chatService.syncContext();
    if (this.draftRevision !== this.chatService.contextRevision()) {
      this.inputMessage.set("");
      return;
    }
    const text = this.inputMessage();
    if (!text.trim())
      return;
    this.chatService.sendMessage(text);
    this.inputMessage.set("");
  }
  onKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      this.onSendMessage();
    }
  }
  onPromptClick(prompt) {
    this.chatService.sendMessage(prompt);
  }
  formatMessageText(text) {
    if (!text)
      return "";
    let formatted = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-100 font-semibold">$1</strong>');
    formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    formatted = formatted.replace(/(^|\n)[-*]\s+(.+)/g, '$1<div class="flex items-start gap-1.5 my-0.5"><span class="text-teal-400">\u2022</span><span>$2</span></div>');
    formatted = formatted.replace(/(^|\n)(\d+)\.\s+(.+)/g, '$1<div class="flex items-start gap-1.5 my-0.5"><span class="text-teal-400 font-mono text-xs">$2.</span><span>$3</span></div>');
    formatted = formatted.replace(/\n/g, "<br>");
    return formatted;
  }
  static \u0275fac = function AiAssistantWidgetComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AiAssistantWidgetComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AiAssistantWidgetComponent, selectors: [["app-ai-assistant-widget"]], viewQuery: function AiAssistantWidgetComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.messagesContainer, _c0, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance();
    }
  }, features: [\u0275\u0275ProvidersFeature([
    provideIcons({
      lucideBot,
      lucideSparkles,
      lucideSend,
      lucideX,
      lucideRotateCcw,
      lucideCheck,
      lucideAlertCircle,
      lucideLoader2,
      lucideStethoscope
    })
  ])], decls: 3, vars: 2, consts: [["messagesContainer", ""], ["aria-label", "Asistente Pedi\xE1trico Cl\xEDnico DoctorChart Copilot", 1, "fixed", "bottom-6", "right-6", "z-50", "flex", "flex-col", "items-end", "pointer-events-none", "font-sans"], ["type", "button", "hlmBtn", "", "variant", "outline", "aria-label", "Abrir asistente pedi\xE1trico DoctorChart", "data-testid", "fab-trigger", 1, "pointer-events-auto", "relative", "size-14", "rounded-full", "bg-zinc-900/95", "hover:bg-zinc-800/95", "border-2", "border-teal-500/50", "hover:border-teal-400", "text-teal-400", "shadow-[0_0_30px_rgba(20,184,166,0.35)]", "transition-all", "duration-300", "hover:scale-105", "active:scale-95", "flex", "items-center", "justify-center", "cursor-pointer", "group"], ["role", "dialog", "aria-label", "Ventana de chat de DoctorChart Copilot", "data-testid", "chat-dialog", 1, "pointer-events-auto", "fixed", "inset-x-3", "bottom-3", "sm:static", "sm:inset-auto", "w-[calc(100vw-24px)]", "sm:w-[420px]", "h-[85vh]", "sm:h-[590px]", "bg-zinc-950/95", "backdrop-blur-2xl", "border", "border-zinc-800/90", "rounded-2xl", "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]", "flex", "flex-col", "overflow-hidden", "transition-all", "duration-200", "animate-in", "fade-in", "slide-in-from-bottom-5"], ["type", "button", "hlmBtn", "", "variant", "outline", "aria-label", "Abrir asistente pedi\xE1trico DoctorChart", "data-testid", "fab-trigger", 1, "pointer-events-auto", "relative", "size-14", "rounded-full", "bg-zinc-900/95", "hover:bg-zinc-800/95", "border-2", "border-teal-500/50", "hover:border-teal-400", "text-teal-400", "shadow-[0_0_30px_rgba(20,184,166,0.35)]", "transition-all", "duration-300", "hover:scale-105", "active:scale-95", "flex", "items-center", "justify-center", "cursor-pointer", "group", 3, "click"], [1, "absolute", "inset-0", "rounded-full", "bg-teal-500/10", "animate-pulse", "pointer-events-none"], ["name", "lucideSparkles", 1, "size-6", "text-teal-400", "transition-transform", "duration-300", "group-hover:rotate-12"], ["data-testid", "unread-ping", 1, "absolute", "-top-1", "-right-1", "flex", "h-4", "w-4"], [1, "animate-ping", "absolute", "inline-flex", "h-full", "w-full", "rounded-full", "bg-teal-400", "opacity-75"], [1, "relative", "inline-flex", "rounded-full", "h-4", "w-4", "bg-teal-500", "border-2", "border-zinc-950"], [1, "px-4", "py-3.5", "bg-zinc-900/90", "border-b", "border-zinc-800", "flex", "items-center", "justify-between", "gap-3", "shrink-0"], [1, "flex", "items-center", "gap-3"], [1, "relative", "size-9", "rounded-xl", "bg-teal-950/50", "border", "border-teal-500/30", "text-teal-400", "flex", "items-center", "justify-center", "shrink-0", "shadow-inner"], ["name", "lucideBot", 1, "size-5"], [1, "absolute", "-bottom-0.5", "-right-0.5", "size-2.5", "rounded-full", "bg-teal-500", "border-2", "border-zinc-900"], [1, "flex", "items-center", "gap-1.5"], [1, "font-bold", "text-sm", "text-zinc-100", "tracking-tight"], ["hlmBadge", "", "variant", "outline", 1, "border-teal-500/40", "bg-teal-950/40", "text-teal-400", "text-[10px]", "px-1.5", "py-0", "font-medium"], [1, "text-[11px]", "text-zinc-400", "font-medium", "flex", "items-center", "gap-1", "mt-0.5"], [1, "size-1.5", "rounded-full", "bg-emerald-400"], [1, "flex", "items-center", "gap-1"], ["type", "button", "hlmBtn", "", "variant", "ghost", "size", "icon", "title", "Reiniciar conversaci\xF3n", "aria-label", "Reiniciar conversaci\xF3n", "data-testid", "btn-clear-history", 1, "size-8", "rounded-lg", "hover:bg-zinc-800", "text-zinc-400", "hover:text-zinc-200", "transition", "cursor-pointer", 3, "click"], ["name", "lucideRotateCcw", 1, "size-4"], ["type", "button", "hlmBtn", "", "variant", "ghost", "size", "icon", "title", "Cerrar chat", "aria-label", "Cerrar chat", "data-testid", "btn-close-chat", 1, "size-8", "rounded-lg", "hover:bg-zinc-800", "text-zinc-400", "hover:text-zinc-200", "transition", "cursor-pointer", 3, "click"], ["name", "lucideX", 1, "size-4"], ["data-testid", "messages-container", 1, "flex-1", "p-4", "overflow-y-auto", "space-y-3.5", "scroll-smooth", "overscroll-contain"], ["data-testid", "typing-indicator", 1, "flex", "justify-start", "items-center", "gap-2"], ["data-testid", "suggested-prompts", 1, "px-3", "py-2", "bg-zinc-900/60", "border-t", "border-zinc-800/80", "overflow-x-auto", "flex", "items-center", "gap-1.5", "shrink-0", "scrollbar-none"], ["type", "button", 1, "px-2.5", "py-1", "bg-zinc-900", "hover:bg-zinc-800", "hover:text-teal-400", "border", "border-zinc-700/60", "hover:border-teal-500/50", "rounded-full", "text-[11px]", "font-medium", "text-zinc-300", "whitespace-nowrap", "transition", "cursor-pointer", "disabled:opacity-50", "disabled:cursor-not-allowed", "shadow-xs", 3, "disabled"], [1, "p-3", "bg-zinc-900/90", "border-t", "border-zinc-800", "shrink-0"], [1, "flex", "items-center", "gap-2", 3, "ngSubmit"], ["hlmInput", "", "type", "text", "name", "chatMessageInput", "placeholder", "Consultar sobre percentiles, hitos madurativos o controles...", "data-testid", "chat-input", 1, "flex-1", "bg-zinc-950", "border-zinc-800", "text-zinc-100", "placeholder-zinc-500", "focus-visible:ring-teal-500/40", "text-xs", "sm:text-sm", "h-10", "rounded-xl", 3, "ngModelChange", "keydown", "ngModel", "disabled"], ["type", "submit", "hlmBtn", "", "variant", "default", "size", "icon", "aria-label", "Enviar consulta", "data-testid", "btn-send", 1, "size-10", "bg-teal-600", "hover:bg-teal-500", "text-white", "font-bold", "rounded-xl", "transition", "disabled:opacity-40", "disabled:cursor-not-allowed", "shrink-0", "cursor-pointer", "shadow-sm", "flex", "items-center", "justify-center", 3, "disabled"], ["name", "lucideLoader2", 1, "size-4", "animate-spin", "text-white"], ["name", "lucideSend", 1, "size-4", "text-white"], ["data-testid", "user-message", 1, "flex", "justify-end"], ["data-testid", "assistant-message", 1, "flex", "justify-start", "items-start", "gap-2"], [1, "max-w-[85%]", "bg-teal-600", "text-white", "px-4", "py-2.5", "rounded-2xl", "rounded-tr-xs", "text-xs", "sm:text-sm", "font-medium", "shadow-md", "leading-relaxed", "select-text"], [1, "size-6", "rounded-lg", "bg-zinc-800", "border", "border-zinc-700/60", "text-teal-400", "flex", "items-center", "justify-center", "shrink-0", "mt-1"], ["name", "lucideBot", 1, "size-3.5"], [1, "max-w-[85%]", "px-4", "py-2.5", "rounded-2xl", "rounded-tl-xs", "text-xs", "sm:text-sm", "shadow-sm", "leading-relaxed", "border", "select-text"], [1, "chat-markdown", "space-y-1", 3, "innerHTML"], [1, "block", "text-[10px]", "text-zinc-500", "mt-1", "text-right", "font-medium"], [1, "size-6", "rounded-lg", "bg-zinc-800", "border", "border-zinc-700/60", "text-teal-400", "flex", "items-center", "justify-center", "shrink-0"], [1, "bg-zinc-900", "border", "border-zinc-800", "text-zinc-400", "px-3.5", "py-2", "rounded-2xl", "rounded-tl-xs", "text-xs", "flex", "items-center", "gap-1.5", "shadow-sm"], [1, "text-[11px]", "font-medium", "mr-1", "text-zinc-300"], [1, "size-1.5", "rounded-full", "bg-teal-400", "animate-bounce"], [1, "size-1.5", "rounded-full", "bg-teal-400", "animate-bounce", "[animation-delay:0.2s]"], [1, "size-1.5", "rounded-full", "bg-teal-400", "animate-bounce", "[animation-delay:0.4s]"], ["type", "button", 1, "px-2.5", "py-1", "bg-zinc-900", "hover:bg-zinc-800", "hover:text-teal-400", "border", "border-zinc-700/60", "hover:border-teal-500/50", "rounded-full", "text-[11px]", "font-medium", "text-zinc-300", "whitespace-nowrap", "transition", "cursor-pointer", "disabled:opacity-50", "disabled:cursor-not-allowed", "shadow-xs", 3, "click", "disabled"]], template: function AiAssistantWidgetComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "aside", 1);
      \u0275\u0275conditionalCreate(1, AiAssistantWidgetComponent_Conditional_1_Template, 4, 1, "button", 2);
      \u0275\u0275conditionalCreate(2, AiAssistantWidgetComponent_Conditional_2_Template, 35, 5, "div", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.chatService.isOpen() ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.chatService.isOpen() ? 2 : -1);
    }
  }, dependencies: [
    FormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    NgModel,
    NgForm,
    NgIcon,
    HlmButton,
    HlmInput,
    HlmBadge
  ], styles: ["\n.chat-markdown[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.scrollbar-none[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n.scrollbar-none[_ngcontent-%COMP%] {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n/*# sourceMappingURL=ai-assistant-widget.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AiAssistantWidgetComponent, [{
    type: Component,
    args: [{ selector: "app-ai-assistant-widget", imports: [
      FormsModule,
      NgIcon,
      HlmButton,
      HlmInput,
      HlmBadge
    ], providers: [
      provideIcons({
        lucideBot,
        lucideSparkles,
        lucideSend,
        lucideX,
        lucideRotateCcw,
        lucideCheck,
        lucideAlertCircle,
        lucideLoader2,
        lucideStethoscope
      })
    ], changeDetection: ChangeDetectionStrategy.OnPush, template: `<!-- CONTENEDOR FLOTANTE INFERIOR DERECHO -->
<aside
  class="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none font-sans"
  aria-label="Asistente Pedi\xE1trico Cl\xEDnico DoctorChart Copilot"
>
  <!-- ========================================================================= -->
  <!-- 1. BOT\xD3N DISPARADOR FLOTANTE (FAB) -->
  <!-- ========================================================================= -->
  @if (!chatService.isOpen()) {
    <button
      type="button"
      (click)="chatService.toggleChat()"
      hlmBtn
      variant="outline"
      class="pointer-events-auto relative size-14 rounded-full bg-zinc-900/95 hover:bg-zinc-800/95 border-2 border-teal-500/50 hover:border-teal-400 text-teal-400 shadow-[0_0_30px_rgba(20,184,166,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer group"
      aria-label="Abrir asistente pedi\xE1trico DoctorChart"
      data-testid="fab-trigger"
    >
      <!-- Efecto resplandor sutil -->
      <span
        class="absolute inset-0 rounded-full bg-teal-500/10 animate-pulse pointer-events-none"
      ></span>

      <!-- \xCDcono principal con hover suave -->
      <ng-icon
        name="lucideSparkles"
        class="size-6 text-teal-400 transition-transform duration-300 group-hover:rotate-12"
      />

      <!-- Badge de Mensajes no le\xEDdos / Ping dot -->
      @if (chatService.hasUnread()) {
        <span class="absolute -top-1 -right-1 flex h-4 w-4" data-testid="unread-ping">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"
          ></span>
          <span
            class="relative inline-flex rounded-full h-4 w-4 bg-teal-500 border-2 border-zinc-950"
          ></span>
        </span>
      }
    </button>
  }

  <!-- ========================================================================= -->
  <!-- 2. VENTANA DE CHAT EXPANDIDA (SPARTAN UI + ZINC PALETTE + TEAL CLINICAL ACCENTS) -->
  <!-- ========================================================================= -->
  @if (chatService.isOpen()) {
    <div
      class="pointer-events-auto fixed inset-x-3 bottom-3 sm:static sm:inset-auto w-[calc(100vw-24px)] sm:w-[420px] h-[85vh] sm:h-[590px] bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800/90 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden transition-all duration-200 animate-in fade-in slide-in-from-bottom-5"
      role="dialog"
      aria-label="Ventana de chat de DoctorChart Copilot"
      data-testid="chat-dialog"
    >
      <!-- CABECERA DEL CHAT -->
      <header
        class="px-4 py-3.5 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between gap-3 shrink-0"
      >
        <div class="flex items-center gap-3">
          <!-- Avatar con estado online cl\xEDnico -->
          <div
            class="relative size-9 rounded-xl bg-teal-950/50 border border-teal-500/30 text-teal-400 flex items-center justify-center shrink-0 shadow-inner"
          >
            <ng-icon name="lucideBot" class="size-5" />
            <span
              class="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-teal-500 border-2 border-zinc-900"
            ></span>
          </div>

          <div>
            <div class="flex items-center gap-1.5">
              <h3 class="font-bold text-sm text-zinc-100 tracking-tight">
                DoctorChart Copilot
              </h3>
              <span
                hlmBadge
                variant="outline"
                class="border-teal-500/40 bg-teal-950/40 text-teal-400 text-[10px] px-1.5 py-0 font-medium"
              >
                Pediatr\xEDa IA
              </span>
            </div>
            <p class="text-[11px] text-zinc-400 font-medium flex items-center gap-1 mt-0.5">
              <span class="size-1.5 rounded-full bg-emerald-400"></span>
              <span>En l\xEDnea \u2022 Asesor Cl\xEDnico</span>
            </p>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <!-- Bot\xF3n Reiniciar Historial -->
          <button
            type="button"
            hlmBtn
            variant="ghost"
            size="icon"
            (click)="chatService.clearHistory()"
            class="size-8 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
            title="Reiniciar conversaci\xF3n"
            aria-label="Reiniciar conversaci\xF3n"
            data-testid="btn-clear-history"
          >
            <ng-icon name="lucideRotateCcw" class="size-4" />
          </button>

          <!-- Bot\xF3n Cerrar Chat -->
          <button
            type="button"
            hlmBtn
            variant="ghost"
            size="icon"
            (click)="chatService.closeChat()"
            class="size-8 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
            title="Cerrar chat"
            aria-label="Cerrar chat"
            data-testid="btn-close-chat"
          >
            <ng-icon name="lucideX" class="size-4" />
          </button>
        </div>
      </header>

      <!-- CONTENEDOR PRINCIPAL DE MENSAJES -->
      <div
        #messagesContainer
        class="flex-1 p-4 overflow-y-auto space-y-3.5 scroll-smooth overscroll-contain"
        data-testid="messages-container"
      >
        @for (msg of chatService.messages(); track msg.id) {
          @if (msg.sender === 'user') {
            <!-- Burbuja Usuario -->
            <div class="flex justify-end" data-testid="user-message">
              <div
                class="max-w-[85%] bg-teal-600 text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs sm:text-sm font-medium shadow-md leading-relaxed select-text"
              >
                {{ msg.text }}
              </div>
            </div>
          } @else {
            <!-- Burbuja Asistente / Error Cl\xEDnico -->
            <div class="flex justify-start items-start gap-2" data-testid="assistant-message">
              <div
                class="size-6 rounded-lg bg-zinc-800 border border-zinc-700/60 text-teal-400 flex items-center justify-center shrink-0 mt-1"
              >
                <ng-icon name="lucideBot" class="size-3.5" />
              </div>

              <div
                [class.border-rose-700]="msg.isError"
                [class.bg-rose-950/30]="msg.isError"
                [class.text-rose-200]="msg.isError"
                [class.border-zinc-800]="!msg.isError"
                [class.bg-zinc-900/80]="!msg.isError"
                [class.text-zinc-200]="!msg.isError"
                class="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-tl-xs text-xs sm:text-sm shadow-sm leading-relaxed border select-text"
              >
                <div
                  class="chat-markdown space-y-1"
                  [innerHTML]="formatMessageText(msg.text)"
                ></div>
                <span
                  class="block text-[10px] text-zinc-500 mt-1 text-right font-medium"
                >
                  {{ messageTime(msg.timestamp) }}
                </span>
              </div>
            </div>
          }
        }

        <!-- Indicador de Escribiendo (Typing) -->
        @if (chatService.isTyping()) {
          <div class="flex justify-start items-center gap-2" data-testid="typing-indicator">
            <div
              class="size-6 rounded-lg bg-zinc-800 border border-zinc-700/60 text-teal-400 flex items-center justify-center shrink-0"
            >
              <ng-icon name="lucideBot" class="size-3.5" />
            </div>
            <div
              class="bg-zinc-900 border border-zinc-800 text-zinc-400 px-3.5 py-2 rounded-2xl rounded-tl-xs text-xs flex items-center gap-1.5 shadow-sm"
            >
              <span class="text-[11px] font-medium mr-1 text-zinc-300">DoctorChart est\xE1 evaluando</span>
              <span class="size-1.5 rounded-full bg-teal-400 animate-bounce"></span>
              <span
                class="size-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:0.2s]"
              ></span>
              <span
                class="size-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:0.4s]"
              ></span>
            </div>
          </div>
        }
      </div>

      <!-- SUGERENCIAS R\xC1PIDAS (PROMPT CHIPS) -->
      <div
        class="px-3 py-2 bg-zinc-900/60 border-t border-zinc-800/80 overflow-x-auto flex items-center gap-1.5 shrink-0 scrollbar-none"
        data-testid="suggested-prompts"
      >
        @for (prompt of chatService.suggestedPrompts; track prompt) {
          <button
            type="button"
            (click)="onPromptClick(prompt)"
            [disabled]="chatService.isTyping()"
            class="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 hover:text-teal-400 border border-zinc-700/60 hover:border-teal-500/50 rounded-full text-[11px] font-medium text-zinc-300 whitespace-nowrap transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
          >
            {{ prompt }}
          </button>
        }
      </div>

      <!-- CAJA DE TEXTO Y ENV\xCDO -->
      <footer
        class="p-3 bg-zinc-900/90 border-t border-zinc-800 shrink-0"
      >
        <form (ngSubmit)="onSendMessage()" class="flex items-center gap-2">
          <input
            hlmInput
            type="text"
            [ngModel]="inputMessage()"
            (ngModelChange)="inputMessage.set($event)"
            name="chatMessageInput"
            (keydown)="onKeyDown($event)"
            [disabled]="chatService.isTyping()"
            placeholder="Consultar sobre percentiles, hitos madurativos o controles..."
            class="flex-1 bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-500 focus-visible:ring-teal-500/40 text-xs sm:text-sm h-10 rounded-xl"
            data-testid="chat-input"
          />

          <button
            type="submit"
            hlmBtn
            variant="default"
            size="icon"
            [disabled]="!inputMessage().trim() || chatService.isTyping()"
            class="size-10 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer shadow-sm flex items-center justify-center"
            aria-label="Enviar consulta"
            data-testid="btn-send"
          >
            @if (chatService.isTyping()) {
              <ng-icon name="lucideLoader2" class="size-4 animate-spin text-white" />
            } @else {
              <ng-icon name="lucideSend" class="size-4 text-white" />
            }
          </button>
        </form>
      </footer>
    </div>
  }
</aside>
`, styles: ["/* src/app/features/ai-assistant/ai-assistant-widget.component.css */\n.chat-markdown p {\n  margin: 0;\n}\n.scrollbar-none::-webkit-scrollbar {\n  display: none;\n}\n.scrollbar-none {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n/*# sourceMappingURL=ai-assistant-widget.component.css.map */\n"] }]
  }], () => [], { messagesContainer: [{ type: ViewChild, args: ["messagesContainer", { isSignal: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AiAssistantWidgetComponent, { className: "AiAssistantWidgetComponent", filePath: "src/app/features/ai-assistant/ai-assistant-widget.component.ts", lineNumber: 55 });
})();
export {
  AiAssistantWidgetComponent
};
//# debugId=a3c511a4-c5e9-5c2a-af75-05f9977cf251
//# sourceMappingURL=chunk-BXSF64LS.js.map
