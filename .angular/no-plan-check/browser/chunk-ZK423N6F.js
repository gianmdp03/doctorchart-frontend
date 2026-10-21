import {
  AuthService
} from "./chunk-5XEBCQUW.js";
import {
  environment
} from "./chunk-WKCAPCQH.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-XM57RTTR.js";
import {
  Component,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵnextContext,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-3HO5VEWU.js";

// src/app/features/auth/no-plan.component.ts
function NoPlanComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.message());
  }
}
var NoPlanComponent = class _NoPlanComponent {
  auth = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  plansUrl = environment.bycodePlansUrl.split("#")[0] + "#plans-catalog";
  busy = signal(
    false,
    ...ngDevMode ? [{ debugName: "busy" }] : (
      /* istanbul ignore next */
      []
    )
  );
  message = signal(
    "",
    ...ngDevMode ? [{ debugName: "message" }] : (
      /* istanbul ignore next */
      []
    )
  );
  async checkPlan() {
    if (this.busy())
      return;
    this.busy.set(true);
    this.message.set("");
    try {
      await this.auth.refreshPlan();
      if (this.auth.hasDoctorchartPlan()) {
        const requested = this.route.snapshot.queryParamMap.get("returnUrl");
        const path = requested?.split(/[?#]/)[0];
        const target = requested?.startsWith("/") && !requested.startsWith("//") && !["/", "/login", "/sin-plan"].includes(path) ? requested : "/dashboard";
        await this.router.navigateByUrl(target, { onSameUrlNavigation: "reload" });
      } else {
        this.message.set("Todav\xEDa no ten\xE9s un plan activo de DoctorChart. Si acab\xE1s de contratarlo, esper\xE1 unos momentos y volv\xE9 a verificar.");
      }
    } catch {
      this.message.set("No pudimos verificar tu plan. Revis\xE1 tu conexi\xF3n y volv\xE9 a intentar.");
    } finally {
      this.busy.set(false);
    }
  }
  async signOut() {
    if (this.busy())
      return;
    this.busy.set(true);
    try {
      await this.auth.signOut();
      await this.router.navigateByUrl("/login");
    } catch {
      this.message.set("No pudimos cerrar la sesi\xF3n. Volv\xE9 a intentar.");
    } finally {
      this.busy.set(false);
    }
  }
  static \u0275fac = function NoPlanComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NoPlanComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NoPlanComponent, selectors: [["app-no-plan"]], decls: 20, vars: 5, consts: [[1, "plan-page"], ["aria-labelledby", "plan-title", 1, "plan-card"], ["src", "/doctorchart-logo.svg", "width", "56", "height", "56", "alt", "DoctorChart"], [1, "product"], [1, "plan-status"], ["id", "plan-title"], [1, "primary", 3, "href"], ["type", "button", 1, "secondary", 3, "click", "disabled"], ["role", "status", 1, "feedback"], ["type", "button", 1, "logout", 3, "click", "disabled"]], template: function NoPlanComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "main", 0)(1, "section", 1);
      \u0275\u0275domElement(2, "img", 2);
      \u0275\u0275domElementStart(3, "p", 3);
      \u0275\u0275text(4, "DoctorChart");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "span", 4);
      \u0275\u0275text(6, "Sin plan activo");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(7, "h1", 5);
      \u0275\u0275text(8, "Necesit\xE1s un plan para continuar");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(9, "p");
      \u0275\u0275text(10, "Iniciaste sesi\xF3n correctamente. Tu cuenta no tiene un plan activo de DoctorChart o el anterior ya venci\xF3.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(11, "p");
      \u0275\u0275text(12, "Para usar las historias cl\xEDnicas y las dem\xE1s herramientas, contrat\xE1 un plan de DoctorChart en Bycode.");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(13, "a", 6);
      \u0275\u0275text(14, "Ver planes en Bycode");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(15, "button", 7);
      \u0275\u0275domListener("click", function NoPlanComponent_Template_button_click_15_listener() {
        return ctx.checkPlan();
      });
      \u0275\u0275text(16);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(17, NoPlanComponent_Conditional_17_Template, 2, 1, "p", 8);
      \u0275\u0275domElementStart(18, "button", 9);
      \u0275\u0275domListener("click", function NoPlanComponent_Template_button_click_18_listener() {
        return ctx.signOut();
      });
      \u0275\u0275text(19, "Cerrar sesi\xF3n");
      \u0275\u0275domElementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(13);
      \u0275\u0275domProperty("href", ctx.plansUrl, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(2);
      \u0275\u0275domProperty("disabled", ctx.busy());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.busy() ? "Verificando plan\u2026" : "Ya contrat\xE9 un plan: verificar acceso", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.message() ? 17 : -1);
      \u0275\u0275advance();
      \u0275\u0275domProperty("disabled", ctx.busy());
    }
  }, styles: ["\n[_nghost-%COMP%] {\n  display: block;\n}\n.plan-page[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  display: grid;\n  place-items: center;\n  padding: 2rem 1rem;\n  background: var(--%NS%md-sys-color-surface,#f0f7f8);\n  color: var(--%NS%md-sys-color-on-surface,#191c1d);\n}\n.plan-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 480px;\n  padding: 2rem;\n  border: 1px solid var(--%NS%md-sys-color-outline-variant,#bfc8ca);\n  border-radius: 24px;\n  background: var(--%NS%md-sys-color-surface-container-low,#fff);\n  text-align: center;\n  box-sizing: border-box;\n}\nimg[_ngcontent-%COMP%] {\n  margin: 0 auto 1rem;\n}\n.product[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  margin: 0 0 1.25rem;\n}\n.plan-status[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: .35rem .8rem;\n  border-radius: 999px;\n  background: var(--%NS%md-sys-color-secondary-container,#cde7ec);\n  color: var(--%NS%md-sys-color-on-secondary-container,#051f23);\n  font-size: .85rem;\n  font-weight: 600;\n}\nh1[_ngcontent-%COMP%] {\n  font-size: 1.7rem;\n  line-height: 1.2;\n  margin: 1.25rem 0;\n}\np[_ngcontent-%COMP%] {\n  line-height: 1.6;\n  margin: .75rem 0;\n  color: var(--%NS%md-sys-color-on-surface-variant,#3f484a);\n}\na[_ngcontent-%COMP%], \nbutton[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 46px;\n  width: 100%;\n  padding: .7rem 1rem;\n  border-radius: 999px;\n  font: inherit;\n  font-size: .9rem;\n  font-weight: 600;\n  cursor: pointer;\n  box-sizing: border-box;\n  text-decoration: none;\n}\n.primary[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  background: var(--%NS%md-sys-color-primary,#006874);\n  color: var(--%NS%md-sys-color-on-primary,#fff);\n  border: 1px solid transparent;\n}\n.secondary[_ngcontent-%COMP%] {\n  margin-top: .75rem;\n  border: 1px solid var(--%NS%md-sys-color-outline,#70797b);\n  background: transparent;\n  color: inherit;\n}\n.logout[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  background: transparent;\n  border: 0;\n  color: var(--%NS%md-sys-color-primary,#006874);\n}\n.feedback[_ngcontent-%COMP%] {\n  font-size: .9rem;\n}\n[_ngcontent-%COMP%]:is(a, button):focus-visible {\n  outline: 2px solid var(--%NS%md-sys-color-primary,#006874);\n  outline-offset: 3px;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: .65;\n  cursor: wait;\n}\n@media (max-width: 380px) {\n  .plan-card[_ngcontent-%COMP%] {\n    padding: 1.5rem 1rem;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 1.4rem;\n  }\n}\n/*# sourceMappingURL=no-plan.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NoPlanComponent, [{
    type: Component,
    args: [{ selector: "app-no-plan", template: `
    <main class="plan-page">
      <section class="plan-card" aria-labelledby="plan-title">
        <img src="/doctorchart-logo.svg" width="56" height="56" alt="DoctorChart" />
        <p class="product">DoctorChart</p>
        <span class="plan-status">Sin plan activo</span>
        <h1 id="plan-title">Necesit\xE1s un plan para continuar</h1>
        <p>Iniciaste sesi\xF3n correctamente. Tu cuenta no tiene un plan activo de DoctorChart o el anterior ya venci\xF3.</p>
        <p>Para usar las historias cl\xEDnicas y las dem\xE1s herramientas, contrat\xE1 un plan de DoctorChart en Bycode.</p>
        <a class="primary" [href]="plansUrl">Ver planes en Bycode</a>
        <button class="secondary" type="button" (click)="checkPlan()" [disabled]="busy()">
          {{ busy() ? 'Verificando plan\u2026' : 'Ya contrat\xE9 un plan: verificar acceso' }}
        </button>
        @if (message()) { <p class="feedback" role="status">{{ message() }}</p> }
        <button class="logout" type="button" (click)="signOut()" [disabled]="busy()">Cerrar sesi\xF3n</button>
      </section>
    </main>
  `, styles: ["/* angular:styles/component:css;8bbaba811ef54c59;C:\\Users\\gcast\\Documents\\GitHub\\doctorchart-frontend\\src\\app\\features\\auth\\no-plan.component.ts */\n:host {\n  display: block;\n}\n.plan-page {\n  min-height: 100dvh;\n  display: grid;\n  place-items: center;\n  padding: 2rem 1rem;\n  background: var(--md-sys-color-surface,#f0f7f8);\n  color: var(--md-sys-color-on-surface,#191c1d);\n}\n.plan-card {\n  width: 100%;\n  max-width: 480px;\n  padding: 2rem;\n  border: 1px solid var(--md-sys-color-outline-variant,#bfc8ca);\n  border-radius: 24px;\n  background: var(--md-sys-color-surface-container-low,#fff);\n  text-align: center;\n  box-sizing: border-box;\n}\nimg {\n  margin: 0 auto 1rem;\n}\n.product {\n  font-size: 1.1rem;\n  font-weight: 700;\n  margin: 0 0 1.25rem;\n}\n.plan-status {\n  display: inline-block;\n  padding: .35rem .8rem;\n  border-radius: 999px;\n  background: var(--md-sys-color-secondary-container,#cde7ec);\n  color: var(--md-sys-color-on-secondary-container,#051f23);\n  font-size: .85rem;\n  font-weight: 600;\n}\nh1 {\n  font-size: 1.7rem;\n  line-height: 1.2;\n  margin: 1.25rem 0;\n}\np {\n  line-height: 1.6;\n  margin: .75rem 0;\n  color: var(--md-sys-color-on-surface-variant,#3f484a);\n}\na,\nbutton {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 46px;\n  width: 100%;\n  padding: .7rem 1rem;\n  border-radius: 999px;\n  font: inherit;\n  font-size: .9rem;\n  font-weight: 600;\n  cursor: pointer;\n  box-sizing: border-box;\n  text-decoration: none;\n}\n.primary {\n  margin-top: 1.5rem;\n  background: var(--md-sys-color-primary,#006874);\n  color: var(--md-sys-color-on-primary,#fff);\n  border: 1px solid transparent;\n}\n.secondary {\n  margin-top: .75rem;\n  border: 1px solid var(--md-sys-color-outline,#70797b);\n  background: transparent;\n  color: inherit;\n}\n.logout {\n  margin-top: 1rem;\n  background: transparent;\n  border: 0;\n  color: var(--md-sys-color-primary,#006874);\n}\n.feedback {\n  font-size: .9rem;\n}\n:is(a, button):focus-visible {\n  outline: 2px solid var(--md-sys-color-primary,#006874);\n  outline-offset: 3px;\n}\nbutton:disabled {\n  opacity: .65;\n  cursor: wait;\n}\n@media (max-width: 380px) {\n  .plan-card {\n    padding: 1.5rem 1rem;\n  }\n  h1 {\n    font-size: 1.4rem;\n  }\n}\n/*# sourceMappingURL=no-plan.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NoPlanComponent, { className: "NoPlanComponent", filePath: "src/app/features/auth/no-plan.component.ts", lineNumber: 45 });
})();

export {
  NoPlanComponent
};
//# debugId=0575e6b7-3888-5751-bdcf-741f0f258e6e
//# sourceMappingURL=chunk-ZK423N6F.js.map
