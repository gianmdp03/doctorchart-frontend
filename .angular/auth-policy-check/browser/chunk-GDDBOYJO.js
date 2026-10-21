import {
  ThemeService
} from "./chunk-5V3TTGBI.js";
import {
  NgIcon,
  lucideMoon,
  lucideSun,
  provideIcons
} from "./chunk-Z3UJ4PSI.js";
import {
  Component,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-3HO5VEWU.js";

// src/app/shared/components/theme-toggle/theme-toggle.component.ts
var ThemeToggleComponent = class _ThemeToggleComponent {
  themeService = inject(ThemeService);
  static \u0275fac = function ThemeToggleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThemeToggleComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ThemeToggleComponent, selectors: [["app-theme-toggle"]], features: [\u0275\u0275ProvidersFeature([provideIcons({ lucideMoon, lucideSun })])], decls: 4, vars: 5, consts: [["type", "button", 3, "click", "title"], ["aria-hidden", "true", 3, "name"]], template: function ThemeToggleComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "button", 0);
      \u0275\u0275listener("click", function ThemeToggleComponent_Template_button_click_0_listener() {
        return ctx.themeService.toggle();
      });
      \u0275\u0275element(1, "ng-icon", 1);
      \u0275\u0275elementStart(2, "span");
      \u0275\u0275text(3);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275property("title", ctx.themeService.theme() === "dark" ? "Activar modo claro" : "Activar modo oscuro");
      \u0275\u0275attribute("aria-pressed", ctx.themeService.theme() === "dark")("aria-label", ctx.themeService.theme() === "dark" ? "Activar modo claro" : "Activar modo oscuro");
      \u0275\u0275advance();
      \u0275\u0275property("name", ctx.themeService.theme() === "dark" ? "lucideSun" : "lucideMoon");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.themeService.theme() === "dark" ? "Modo claro" : "Modo oscuro");
    }
  }, dependencies: [NgIcon], styles: ["\n[_nghost-%COMP%] {\n  display: inline-flex;\n}\nbutton[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: .4rem;\n  min-height: 36px;\n  padding: .4rem .65rem;\n  border-radius: 8px;\n  border: 1px solid var(--%NS%md-sys-color-outline-variant);\n  background: var(--%NS%md-sys-color-surface-container-low);\n  color: var(--%NS%md-sys-color-on-surface);\n  font: inherit;\n  font-size: .8rem;\n  font-weight: 600;\n  cursor: pointer;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background: var(--%NS%md-sys-color-surface-container-high);\n}\nbutton[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--%NS%md-sys-color-primary);\n  outline-offset: 3px;\n}\nng-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n@media (max-width: 600px) {\n  span[_ngcontent-%COMP%] {\n    display: none;\n  }\n  button[_ngcontent-%COMP%] {\n    min-width: 36px;\n  }\n}\n/*# sourceMappingURL=theme-toggle.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeToggleComponent, [{
    type: Component,
    args: [{ selector: "app-theme-toggle", imports: [NgIcon], providers: [provideIcons({ lucideMoon, lucideSun })], template: `
    <button type="button" (click)="themeService.toggle()"
      [attr.aria-pressed]="themeService.theme() === 'dark'"
      [attr.aria-label]="themeService.theme() === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'"
      [title]="themeService.theme() === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'">
      <ng-icon [name]="themeService.theme() === 'dark' ? 'lucideSun' : 'lucideMoon'" aria-hidden="true" />
      <span>{{ themeService.theme() === 'dark' ? 'Modo claro' : 'Modo oscuro' }}</span>
    </button>
  `, styles: ["/* angular:styles/component:css;bac22e3ceaf044a4;C:\\Users\\gcast\\Documents\\GitHub\\doctorchart-frontend\\src\\app\\shared\\components\\theme-toggle\\theme-toggle.component.ts */\n:host {\n  display: inline-flex;\n}\nbutton {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: .4rem;\n  min-height: 36px;\n  padding: .4rem .65rem;\n  border-radius: 8px;\n  border: 1px solid var(--md-sys-color-outline-variant);\n  background: var(--md-sys-color-surface-container-low);\n  color: var(--md-sys-color-on-surface);\n  font: inherit;\n  font-size: .8rem;\n  font-weight: 600;\n  cursor: pointer;\n}\nbutton:hover {\n  background: var(--md-sys-color-surface-container-high);\n}\nbutton:focus-visible {\n  outline: 2px solid var(--md-sys-color-primary);\n  outline-offset: 3px;\n}\nng-icon {\n  font-size: 1rem;\n}\n@media (max-width: 600px) {\n  span {\n    display: none;\n  }\n  button {\n    min-width: 36px;\n  }\n}\n/*# sourceMappingURL=theme-toggle.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ThemeToggleComponent, { className: "ThemeToggleComponent", filePath: "src/app/shared/components/theme-toggle/theme-toggle.component.ts", lineNumber: 35 });
})();

export {
  ThemeToggleComponent
};
//# debugId=db028e57-830a-5eba-93fb-8b484be917a3
//# sourceMappingURL=chunk-GDDBOYJO.js.map
