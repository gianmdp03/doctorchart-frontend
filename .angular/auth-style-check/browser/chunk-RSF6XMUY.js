import {
  matchingPasswords,
  trimmedRequired
} from "./chunk-D4J4ETKO.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  RequiredValidator,
  Validators,
  ɵNgNoValidate
} from "./chunk-BQIFWLNB.js";
import {
  AuthService,
  GOOGLE_AUTH_ENABLED,
  LOCAL_REGISTRATION_ENABLED
} from "./chunk-KGUDCUHJ.js";
import {
  environment
} from "./chunk-WKCAPCQH.js";
import {
  ThemeToggleComponent
} from "./chunk-GDDBOYJO.js";
import {
  Router,
  RouterLink
} from "./chunk-XM57RTTR.js";
import {
  isPlatformBrowser
} from "./chunk-SYX7XZ26.js";
import {
  Component,
  PLATFORM_ID,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
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
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-3HO5VEWU.js";

// src/app/features/auth/login-page.component.ts
function LoginPageComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 23);
    \u0275\u0275element(2, "path", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.errorMessage());
  }
}
function LoginPageComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 23);
    \u0275\u0275element(2, "path", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.successMessage());
  }
}
function LoginPageComponent_Conditional_29_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 37);
    \u0275\u0275listener("click", function LoginPageComponent_Conditional_29_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.handleGoogleOAuth());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 38);
    \u0275\u0275element(2, "path", 39)(3, "path", 40)(4, "path", 41)(5, "path", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7, "Continuar con Google");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 43)(9, "span");
    \u0275\u0275text(10, "o con tu correo institucional");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r0.isSubmitting());
  }
}
function LoginPageComponent_Conditional_29_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1, "Ingrese un correo electr\xF3nico v\xE1lido");
    \u0275\u0275elementEnd();
  }
}
function LoginPageComponent_Conditional_29_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 12);
    \u0275\u0275element(1, "path", 44);
    \u0275\u0275elementEnd();
  }
}
function LoginPageComponent_Conditional_29_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 12);
    \u0275\u0275element(1, "path", 45);
    \u0275\u0275elementEnd();
  }
}
function LoginPageComponent_Conditional_29_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1, "La contrase\xF1a es requerida (m\xEDnimo 6 caracteres)");
    \u0275\u0275elementEnd();
  }
}
function LoginPageComponent_Conditional_29_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 46);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "Iniciando sesi\xF3n...");
    \u0275\u0275elementEnd();
  }
}
function LoginPageComponent_Conditional_29_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 12);
    \u0275\u0275element(1, "path", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Ingresar a DoctorChart");
    \u0275\u0275elementEnd();
  }
}
function LoginPageComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 26);
    \u0275\u0275listener("ngSubmit", function LoginPageComponent_Conditional_29_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onLoginSubmit());
    });
    \u0275\u0275elementStart(1, "p", 27);
    \u0275\u0275text(2, " Tu cuenta sirve para ByCode, Pointly y DoctorChart. Si ya ten\xE9s cuenta en alguno, us\xE1 esa misma cuenta para iniciar sesi\xF3n ac\xE1. Cada producto tiene su propio plan. ");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, LoginPageComponent_Conditional_29_Conditional_3_Template, 11, 1);
    \u0275\u0275elementStart(4, "div", 28)(5, "input", 29);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "label", 30);
    \u0275\u0275text(7, "Correo Electr\xF3nico *");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, LoginPageComponent_Conditional_29_Conditional_8_Template, 2, 0, "span", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 32)(10, "input", 33);
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "label", 34);
    \u0275\u0275text(12, "Contrase\xF1a *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 35);
    \u0275\u0275listener("click", function LoginPageComponent_Conditional_29_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.togglePasswordVisibility());
    });
    \u0275\u0275conditionalCreate(14, LoginPageComponent_Conditional_29_Conditional_14_Template, 2, 0, "svg", 12)(15, LoginPageComponent_Conditional_29_Conditional_15_Template, 2, 0, "svg", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(16, LoginPageComponent_Conditional_29_Conditional_16_Template, 2, 0, "span", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 36);
    \u0275\u0275conditionalCreate(18, LoginPageComponent_Conditional_29_Conditional_18_Template, 3, 0)(19, LoginPageComponent_Conditional_29_Conditional_19_Template, 4, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r0.loginForm);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.googleAuthEnabled ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("has-error", ctx_r0.isLoginInvalid("email"));
    \u0275\u0275advance();
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.isLoginInvalid("email") ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("has-error", ctx_r0.isLoginInvalid("password"));
    \u0275\u0275advance();
    \u0275\u0275property("type", ctx_r0.showPassword() ? "text" : "password");
    \u0275\u0275control();
    \u0275\u0275advance(3);
    \u0275\u0275attribute("aria-label", ctx_r0.showPassword() ? "Ocultar contrase\xF1a" : "Ver contrase\xF1a");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.showPassword() ? 14 : 15);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isLoginInvalid("password") ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.isSubmitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isSubmitting() ? 18 : 19);
  }
}
var LoginPageComponent = class _LoginPageComponent {
  googleAuthEnabled = GOOGLE_AUTH_ENABLED;
  bycodeRegisterUrl = environment.bycodePlansUrl.replace(/\/panel\/?$/, "") + "/register";
  goToBycodeRegistration() {
    if (isPlatformBrowser(this.platformId))
      window.location.assign(this.bycodeRegisterUrl);
  }
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  platformId = inject(PLATFORM_ID);
  router = inject(Router);
  isSubmitting = signal(
    false,
    ...ngDevMode ? [{ debugName: "isSubmitting" }] : (
      /* istanbul ignore next */
      []
    )
  );
  mode = signal(
    "login",
    ...ngDevMode ? [{ debugName: "mode" }] : (
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
  successMessage = signal(
    null,
    ...ngDevMode ? [{ debugName: "successMessage" }] : (
      /* istanbul ignore next */
      []
    )
  );
  showPassword = signal(
    false,
    ...ngDevMode ? [{ debugName: "showPassword" }] : (
      /* istanbul ignore next */
      []
    )
  );
  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });
  registerForm = this.fb.group({
    fullName: ["", [trimmedRequired, Validators.minLength(2), Validators.maxLength(150)]],
    dni: ["", [trimmedRequired, Validators.pattern(/^\d{6,8}$/)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    confirmPassword: ["", [Validators.required, Validators.minLength(6)]]
  }, { validators: matchingPasswords });
  setMode(newMode) {
    if (newMode === "register") {
      this.goToBycodeRegistration();
      return;
    }
    this.mode.set(newMode);
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }
  togglePasswordVisibility() {
    this.showPassword.update((val) => !val);
  }
  isLoginInvalid(controlName) {
    const control = this.loginForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
  isRegisterInvalid(controlName) {
    const control = this.registerForm.get(controlName);
    return !!(control && (control.invalid || controlName === "confirmPassword" && this.registerForm.hasError("passwordMismatch")) && (control.dirty || control.touched));
  }
  registerError(name) {
    const control = this.registerForm.get(name);
    if (control?.hasError("required"))
      return "Complet\xE1 este campo.";
    if (name === "fullName")
      return "Ingres\xE1 un nombre de 2 a 150 caracteres.";
    if (name === "dni")
      return "Ingres\xE1 un DNI de 6 a 8 d\xEDgitos, sin puntos.";
    if (name === "email")
      return "Ingres\xE1 un correo electr\xF3nico v\xE1lido.";
    if (control?.hasError("minlength"))
      return "La contrase\xF1a debe tener al menos 6 caracteres.";
    return "Las contrase\xF1as no coinciden.";
  }
  async onLoginSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage.set("Por favor ingrese un correo v\xE1lido y su contrase\xF1a.");
      return;
    }
    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    const { email, password } = this.loginForm.getRawValue();
    try {
      const response = await this.authService.signInWithPassword({
        email: (email ?? "").trim(),
        password: password ?? ""
      });
      if (response.error) {
        this.errorMessage.set(this.translateAuthError(response.error.message));
        this.isSubmitting.set(false);
        return;
      }
      this.successMessage.set("\xA1Inicio de sesi\xF3n exitoso!");
      this.isSubmitting.set(false);
      if (isPlatformBrowser(this.platformId)) {
        window.dispatchEvent(new CustomEvent("auth-success", { detail: { user: response.data.user } }));
      }
      const targetUrl = this.loginDestination();
      await this.router.navigateByUrl(targetUrl, { onSameUrlNavigation: "reload" });
    } catch (err) {
      this.isSubmitting.set(false);
      const msg = err instanceof Error ? err.message : "Error inesperado al iniciar sesi\xF3n.";
      this.errorMessage.set(this.translateAuthError(msg));
    }
  }
  async onRegisterSubmit() {
    if (!LOCAL_REGISTRATION_ENABLED) {
      this.goToBycodeRegistration();
      return;
    }
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.errorMessage.set(this.registerForm.hasError("passwordMismatch") ? "Las contrase\xF1as no coinciden." : "Por favor complete todos los campos obligatorios.");
      return;
    }
    const { fullName, dni, email, password, confirmPassword } = this.registerForm.getRawValue();
    if (password !== confirmPassword) {
      this.errorMessage.set("Las contrase\xF1as no coinciden.");
      return;
    }
    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    try {
      const response = await this.authService.signUp({
        email: (email ?? "").trim(),
        password: password ?? "",
        options: {
          data: {
            full_name: (fullName ?? "").trim(),
            dni: (dni ?? "").trim()
          }
        }
      });
      if (response.error) {
        this.errorMessage.set(this.translateAuthError(response.error.message));
        this.isSubmitting.set(false);
        return;
      }
      this.isSubmitting.set(false);
      if (isPlatformBrowser(this.platformId)) {
        window.dispatchEvent(new CustomEvent("auth-register-success", { detail: { user: response.data.user } }));
      }
      if (response.data.session) {
        this.successMessage.set("\xA1Cuenta creada e inicio de sesi\xF3n exitoso!");
        const targetUrl = this.loginDestination();
        await this.router.navigateByUrl(targetUrl, { onSameUrlNavigation: "reload" });
      } else {
        this.successMessage.set("\xA1Cuenta creada con \xE9xito! Por favor inicia sesi\xF3n.");
        this.mode.set("login");
        this.loginForm.patchValue({ email: (email ?? "").trim() });
        this.registerForm.reset();
      }
    } catch (err) {
      this.isSubmitting.set(false);
      const msg = err instanceof Error ? err.message : "Error inesperado al registrar usuario.";
      this.errorMessage.set(this.translateAuthError(msg));
    }
  }
  async handleGoogleOAuth() {
    if (!GOOGLE_AUTH_ENABLED)
      return;
    if (!isPlatformBrowser(this.platformId))
      return;
    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    try {
      const response = await this.authService.signInWithOAuth("google");
      if (response.error) {
        this.errorMessage.set(this.translateAuthError(response.error.message));
        this.isSubmitting.set(false);
      }
    } catch (err) {
      this.isSubmitting.set(false);
      const msg = err instanceof Error ? err.message : "No se pudo iniciar sesi\xF3n con Google.";
      this.errorMessage.set(msg);
    }
  }
  loginDestination() {
    const requested = this.router.parseUrl(this.router.url).queryParams["returnUrl"];
    if (typeof requested === "string" && requested.startsWith("/") && !requested.startsWith("//") && !["/", "/login"].includes(requested.split(/[?#]/)[0]))
      return requested;
    return !this.router.url || ["/", "/login"].includes(this.router.url.split(/[?#]/)[0]) ? "/dashboard" : this.router.url;
  }
  translateAuthError(message) {
    if (!message)
      return "Error de autenticaci\xF3n";
    const lower = message.toLowerCase();
    if (lower.includes("invalid login credentials") || lower.includes("invalid credentials")) {
      return "Credenciales inv\xE1lidas. Verifique su correo y contrase\xF1a.";
    }
    if (lower.includes("user already registered") || lower.includes("already exists")) {
      return "Ya existe una cuenta registrada con este correo electr\xF3nico.";
    }
    if (lower.includes("password should be at least")) {
      return "La contrase\xF1a debe tener al menos 6 caracteres.";
    }
    if (lower.includes("rate limit")) {
      return "Demasiados intentos. Por favor espere unos momentos antes de reintentar.";
    }
    return message;
  }
  static \u0275fac = function LoginPageComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginPageComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginPageComponent, selectors: [["app-login-page"]], decls: 35, vars: 8, consts: [[1, "login-page-wrapper"], [1, "login-page-card"], ["routerLink", "/", 1, "login-back-link"], [1, "login-theme-control"], [1, "login-card-header"], [1, "brand-logo-row"], [1, "brand-icon"], ["src", "/doctorchart-logo.svg", "width", "52", "height", "52", "alt", "DoctorChart", 1, "doctorchart-logo"], [1, "brand-title"], [1, "brand-subtitle"], ["aria-label", "Acceso a la cuenta", 1, "auth-mode-switcher"], ["type", "button", 1, "mode-switch-btn", 3, "click", "disabled"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "currentColor", "aria-hidden", "true"], ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"], [1, "mode-switch-btn", 3, "href"], ["d", "M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"], [1, "login-card-body"], ["role", "alert", 1, "m3-alert-error"], ["role", "alert", 1, "m3-alert-success"], [1, "auth-form", 3, "formGroup"], [1, "auth-registration-note"], [1, "login-card-footer"], [1, "footer-note"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "currentColor", "aria-hidden", "true"], ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"], ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"], [1, "auth-form", 3, "ngSubmit", "formGroup"], [1, "auth-subtitle"], [1, "m3-textfield"], ["type", "email", "id", "login-email", "formControlName", "email", "placeholder", " ", "autocomplete", "email", "required", ""], ["for", "login-email"], [1, "error-helper-text"], [1, "m3-textfield", "password-field"], ["id", "login-password", "formControlName", "password", "placeholder", " ", "autocomplete", "current-password", "required", "", 3, "type"], ["for", "login-password"], ["type", "button", 1, "pwd-toggle-btn", 3, "click"], ["type", "submit", 1, "m3-button", "m3-button-filled", "auth-submit-btn", 3, "disabled"], ["type", "button", 1, "m3-oauth-btn", "google-btn", 3, "click", "disabled"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "aria-hidden", "true"], ["fill", "#4285F4", "d", "M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"], ["fill", "#34A853", "d", "M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"], ["fill", "#FBBC05", "d", "M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"], ["fill", "#EA4335", "d", "M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"], [1, "auth-divider"], ["d", "M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"], ["d", "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"], ["aria-hidden", "true", 1, "spinner-small"], ["d", "M10 17l5-5-5-5v10z"]], template: function LoginPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
      \u0275\u0275text(3, "\u2190 Volver a DoctorChart");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 3);
      \u0275\u0275element(5, "app-theme-toggle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 4)(7, "div", 5)(8, "div", 6);
      \u0275\u0275element(9, "img", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div")(11, "h1", 8);
      \u0275\u0275text(12, "DoctorChart");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "p", 9);
      \u0275\u0275text(14, "M\xF3dulo Cl\xEDnico y Ficha M\xE9dica Integral");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(15, "div", 10)(16, "button", 11);
      \u0275\u0275listener("click", function LoginPageComponent_Template_button_click_16_listener() {
        return ctx.setMode("login");
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(17, "svg", 12);
      \u0275\u0275element(18, "path", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(19, "span");
      \u0275\u0275text(20, "Iniciar Sesi\xF3n");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "a", 14);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(22, "svg", 12);
      \u0275\u0275element(23, "path", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(24, "span");
      \u0275\u0275text(25, "Crear cuenta en Bycode");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "div", 16);
      \u0275\u0275conditionalCreate(27, LoginPageComponent_Conditional_27_Template, 5, 1, "div", 17);
      \u0275\u0275conditionalCreate(28, LoginPageComponent_Conditional_28_Template, 5, 1, "div", 18);
      \u0275\u0275conditionalCreate(29, LoginPageComponent_Conditional_29_Template, 20, 13, "form", 19);
      \u0275\u0275elementStart(30, "p", 20);
      \u0275\u0275text(31, "Las cuentas se crean en Bycode. Despu\xE9s pod\xE9s iniciar sesi\xF3n en DoctorChart con esa misma cuenta.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 21)(33, "span", 22);
      \u0275\u0275text(34, "Acceso para profesionales de la salud con un plan DoctorChart activo.");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275classProp("active", ctx.mode() === "login");
      \u0275\u0275property("disabled", ctx.isSubmitting());
      \u0275\u0275attribute("aria-selected", ctx.mode() === "login");
      \u0275\u0275advance(5);
      \u0275\u0275property("href", ctx.bycodeRegisterUrl, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.errorMessage() ? 27 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.successMessage() ? 28 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.mode() === "login" ? 29 : -1);
    }
  }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, FormGroupDirective, FormControlName, ThemeToggleComponent, RouterLink], styles: ['\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  min-height: 100vh;\n}\n.login-page-wrapper[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    radial-gradient(\n      circle at 10% 20%,\n      rgba(0, 104, 116, 0.08) 0%,\n      transparent 40%),\n    radial-gradient(\n      circle at 90% 80%,\n      rgba(0, 104, 116, 0.06) 0%,\n      transparent 40%),\n    linear-gradient(\n      135deg,\n      var(--%NS%dc-surface-low, #f0f7f8) 0%,\n      var(--%NS%dc-surface-low, #eaf4f5) 100%);\n  padding: 2rem 1rem;\n  box-sizing: border-box;\n}\n.login-page-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 480px;\n  background-color: var(--%NS%md-sys-color-surface, #ffffff);\n  border-radius: var(--%NS%md-shape-xl, 28px);\n  border: 1px solid var(--%NS%md-sys-color-outline-variant, #e0e4e5);\n  box-shadow: 0 12px 32px rgba(0, 31, 36, 0.12), 0 2px 6px rgba(0, 31, 36, 0.04);\n  overflow: hidden;\n  animation: _ngcontent-%COMP%_cardFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes _ngcontent-%COMP%_cardFadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(16px) scale(0.98);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.login-card-header[_ngcontent-%COMP%] {\n  padding: 2rem 2rem 1.25rem;\n  border-bottom: 1px solid var(--%NS%md-sys-color-outline-variant, #eef2f3);\n  text-align: center;\n}\n.brand-logo-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n}\n.brand-icon[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 16px;\n  background: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.brand-title[_ngcontent-%COMP%] {\n  font-size: 1.55rem;\n  font-weight: 800;\n  color: var(--%NS%md-sys-color-on-surface, #191c1d);\n  margin: 0;\n  line-height: 1.2;\n  letter-spacing: -0.02em;\n}\n.brand-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: var(--%NS%md-sys-color-secondary, #4a6267);\n  margin: 0.2rem 0 0;\n}\n.auth-mode-switcher[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.35rem;\n  background-color: var(--%NS%md-sys-color-surface-container-high, #e8edee);\n  padding: 0.35rem;\n  margin: 1.25rem 2rem 0.5rem;\n  border-radius: var(--%NS%md-shape-full, 9999px);\n}\n.mode-switch-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  padding: 0.55rem 0.65rem;\n  border-radius: var(--%NS%md-shape-full, 9999px);\n  border: none;\n  background: transparent;\n  font-family: inherit;\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: var(--%NS%md-sys-color-on-surface-variant, #3f484a);\n  cursor: pointer;\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  min-height: 40px;\n  text-decoration: none;\n  white-space: nowrap;\n  line-height: 1.25;\n}\n.mode-switch-btn.active[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-surface, #ffffff);\n  color: var(--%NS%md-sys-color-primary, #006874);\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);\n}\n.login-card-body[_ngcontent-%COMP%] {\n  padding: 1.25rem 2rem 1.75rem;\n}\n.auth-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.86rem;\n  color: var(--%NS%md-sys-color-secondary, #4a6267);\n  margin: 0 0 1.15rem;\n  line-height: 1.4;\n  text-align: center;\n}\n.m3-alert-error[_ngcontent-%COMP%], \n.m3-alert-success[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  padding: 0.75rem 1rem;\n  border-radius: var(--%NS%md-shape-s, 8px);\n  margin-bottom: 1.25rem;\n  font-size: 0.85rem;\n  font-weight: 500;\n}\n.m3-alert-error[_ngcontent-%COMP%] {\n  background-color: var(--%NS%dc-error-surface, #ffdad6);\n  color: var(--%NS%md-sys-color-on-error-container, #410002);\n  border: 1px solid #ff5449;\n}\n.m3-alert-success[_ngcontent-%COMP%] {\n  background-color: var(--%NS%md-sys-color-success-container, #bbf2c8);\n  color: var(--%NS%md-sys-color-on-success-container, #002108);\n  border: 1px solid #2e7d32;\n}\n.m3-oauth-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.75rem;\n  height: 44px;\n  background-color: var(--%NS%dc-surface, #ffffff);\n  color: var(--%NS%dc-ink-secondary, #3c4043);\n  border: 1.5px solid var(--%NS%md-sys-color-outline-variant, #bfc8ca);\n  border-radius: var(--%NS%md-shape-s, 8px);\n  font-family: inherit;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.m3-oauth-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: var(--%NS%dc-surface-high, #f8f9fa);\n  border-color: #747775;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n}\n.auth-divider[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  text-align: center;\n  margin: 1.25rem 0;\n  color: var(--%NS%md-sys-color-outline, #6f797a);\n  font-size: 0.78rem;\n  font-weight: 500;\n}\n.auth-divider[_ngcontent-%COMP%]::before, \n.auth-divider[_ngcontent-%COMP%]::after {\n  content: "";\n  flex: 1;\n  border-bottom: 1px solid var(--%NS%md-sys-color-outline-variant, #e0e4e5);\n}\n.auth-divider[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 0 0.75rem;\n}\n.auth-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.15rem;\n}\n.m3-textfield[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n.m3-textfield[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 52px;\n  padding: 0 1rem;\n  border: 1.5px solid var(--%NS%md-sys-color-outline-variant, #bfc8ca);\n  border-radius: var(--%NS%md-shape-s, 8px);\n  background-color: var(--%NS%dc-surface, #ffffff);\n  color: var(--%NS%md-sys-color-on-surface, #191c1d);\n  font-size: 0.95rem;\n  box-sizing: border-box;\n  outline: none;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.m3-textfield[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  border-color: var(--%NS%md-sys-color-primary, #006874);\n  box-shadow: 0 0 0 3px rgba(0, 104, 116, 0.12);\n}\n.m3-textfield[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.85rem;\n  top: 50%;\n  transform: translateY(-50%);\n  font-size: 0.92rem;\n  color: var(--%NS%md-sys-color-secondary, #4a6267);\n  pointer-events: none;\n  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n  background-color: transparent;\n  padding: 0 0.35rem;\n  border-radius: 4px;\n  line-height: 1;\n}\n.m3-textfield[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus    ~ label[_ngcontent-%COMP%], \n.m3-textfield[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:not(:placeholder-shown)    ~ label[_ngcontent-%COMP%], \n.m3-textfield[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:-webkit-autofill    ~ label[_ngcontent-%COMP%] {\n  top: 0;\n  transform: translateY(-50%) scale(0.82);\n  transform-origin: left center;\n  left: 0.75rem;\n  background-color: var(--%NS%dc-surface, #ffffff);\n  font-weight: 600;\n  color: var(--%NS%md-sys-color-primary, #006874);\n  z-index: 1;\n}\n.m3-textfield.has-error[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border-color: #ba1a1a;\n}\n.m3-textfield.has-error[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  border-color: #ba1a1a;\n  box-shadow: 0 0 0 3px rgba(186, 26, 26, 0.12);\n}\n.m3-textfield.has-error[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], \n.m3-textfield.has-error[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus    ~ label[_ngcontent-%COMP%], \n.m3-textfield.has-error[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:not(:placeholder-shown)    ~ label[_ngcontent-%COMP%], \n.m3-textfield.has-error[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:-webkit-autofill    ~ label[_ngcontent-%COMP%] {\n  color: var(--%NS%dc-error-ink, #ba1a1a);\n}\n.error-helper-text[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  color: var(--%NS%dc-error-ink, #ba1a1a);\n  margin-top: 0.25rem;\n  font-weight: 500;\n}\n.password-field[_ngcontent-%COMP%] {\n  position: relative;\n}\n.password-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding-right: 2.75rem;\n}\n.pwd-toggle-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  background: transparent;\n  border: none;\n  color: var(--%NS%md-sys-color-secondary, #4a6267);\n  cursor: pointer;\n  padding: 0.35rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n}\n.pwd-toggle-btn[_ngcontent-%COMP%]:hover {\n  background-color: var(--%NS%md-sys-color-surface-container-high, #e8edee);\n  color: var(--%NS%md-sys-color-primary, #006874);\n}\n.form-grid-2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.85rem;\n}\n.auth-submit-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 46px;\n  margin-top: 0.5rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  font-size: 0.95rem;\n  font-weight: 600;\n  border-radius: var(--%NS%md-shape-full, 9999px);\n  cursor: pointer;\n}\n.login-card-footer[_ngcontent-%COMP%] {\n  padding: 1rem 2rem 1.5rem;\n  background-color: var(--%NS%md-sys-color-surface-container-lowest, #f9fafb);\n  border-top: 1px solid var(--%NS%md-sys-color-outline-variant, #eef2f3);\n  text-align: center;\n}\n.footer-note[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--%NS%md-sys-color-secondary, #4a6267);\n  line-height: 1.35;\n  display: block;\n}\n.spinner-small[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border: 2.5px solid rgba(255, 255, 255, 0.4);\n  border-top-color: #ffffff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.6s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.login-theme-control[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  padding: 1rem 1rem 0;\n}\n.login-back-link[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin: 1.25rem 1.5rem 0;\n  color: var(--%NS%md-sys-color-primary, #006874);\n  font-size: .875rem;\n  text-decoration: none;\n}\n.login-back-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.login-back-link[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid currentColor;\n  outline-offset: 4px;\n}\n.auth-submit-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: .5rem;\n  min-height: 46px;\n  padding: .7rem 1.1rem;\n  border: 1px solid var(--%NS%md-sys-color-primary, #006874);\n  border-radius: 9999px;\n  background: var(--%NS%md-sys-color-primary, #006874);\n  color: var(--%NS%md-sys-color-on-primary, #fff);\n  font: inherit;\n  font-weight: 600;\n  cursor: pointer;\n}\n.auth-submit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  filter: brightness(.94);\n}\n.auth-submit-btn[_ngcontent-%COMP%]:disabled {\n  opacity: .6;\n  cursor: wait;\n}\n.auth-submit-btn[_ngcontent-%COMP%]:focus-visible, \n.mode-switch-btn[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--%NS%md-sys-color-primary, #006874);\n  outline-offset: 3px;\n}\n.mode-switch-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.auth-registration-note[_ngcontent-%COMP%] {\n  margin: 1.25rem 0 0;\n  font-size: .8rem;\n  line-height: 1.5;\n  text-align: center;\n  color: var(--%NS%md-sys-color-on-surface-variant, #3f484a);\n}\n@media (max-width: 420px) {\n  .auth-mode-switcher[_ngcontent-%COMP%] {\n    flex-direction: column;\n    border-radius: 18px;\n  }\n}\n/*# sourceMappingURL=login-page.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginPageComponent, [{
    type: Component,
    args: [{ selector: "app-login-page", imports: [ReactiveFormsModule, ThemeToggleComponent, RouterLink], template: `<div class="login-page-wrapper">
  <div class="login-page-card">
    <a routerLink="/" class="login-back-link">\u2190 Volver a DoctorChart</a>
    <div class="login-theme-control"><app-theme-toggle /></div>
    <!-- Header with DoctorChart Branding -->
    <div class="login-card-header">
      <div class="brand-logo-row">
        <div class="brand-icon">
          <img class="doctorchart-logo" src="/doctorchart-logo.svg" width="52" height="52" alt="DoctorChart" />
        </div>
        <div>
          <h1 class="brand-title">DoctorChart</h1>
          <p class="brand-subtitle">M\xF3dulo Cl\xEDnico y Ficha M\xE9dica Integral</p>
        </div>
      </div>
    </div>

    <!-- Segmented Mode Switcher -->
    <div class="auth-mode-switcher" aria-label="Acceso a la cuenta">
      <button
        type="button"

        class="mode-switch-btn"
        [class.active]="mode() === 'login'"
        [attr.aria-selected]="mode() === 'login'"
        (click)="setMode('login')"
        [disabled]="isSubmitting()"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
        </svg>
        <span>Iniciar Sesi\xF3n</span>
      </button>
      <a class="mode-switch-btn" [href]="bycodeRegisterUrl">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <span>Crear cuenta en Bycode</span>
      </a>
    </div>

    <div class="login-card-body">
      @if (errorMessage()) {
        <div class="m3-alert-error" role="alert">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <span>{{ errorMessage() }}</span>
        </div>
      }

      @if (successMessage()) {
        <div class="m3-alert-success" role="alert">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span>{{ successMessage() }}</span>
        </div>
      }

      <!-- LOGIN VIEW -->
      @if (mode() === 'login') {
        <form [formGroup]="loginForm" class="auth-form" (ngSubmit)="onLoginSubmit()">
          <p class="auth-subtitle">
            Tu cuenta sirve para ByCode, Pointly y DoctorChart. Si ya ten\xE9s cuenta en alguno, us\xE1 esa misma cuenta para iniciar sesi\xF3n ac\xE1. Cada producto tiene su propio plan.
          </p>

          @if (googleAuthEnabled) {
<!-- Google OAuth Button -->
          <button
            type="button"
            class="m3-oauth-btn google-btn"
            (click)="handleGoogleOAuth()"
            [disabled]="isSubmitting()"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <span>Continuar con Google</span>
          </button>

          <div class="auth-divider">
            <span>o con tu correo institucional</span>
          </div>
}


          <!-- Email -->
          <div class="m3-textfield" [class.has-error]="isLoginInvalid('email')">
            <input
              type="email"
              id="login-email"
              formControlName="email"
              placeholder=" "
              autocomplete="email"
              required
            />
            <label for="login-email">Correo Electr\xF3nico *</label>
            @if (isLoginInvalid('email')) {
              <span class="error-helper-text">Ingrese un correo electr\xF3nico v\xE1lido</span>
            }
          </div>

          <!-- Password with show/hide toggle -->
          <div class="m3-textfield password-field" [class.has-error]="isLoginInvalid('password')">
            <input
              [type]="showPassword() ? 'text' : 'password'"
              id="login-password"
              formControlName="password"
              placeholder=" "
              autocomplete="current-password"
              required
            />
            <label for="login-password">Contrase\xF1a *</label>
            <button
              type="button"
              class="pwd-toggle-btn"
              (click)="togglePasswordVisibility()"
              [attr.aria-label]="showPassword() ? 'Ocultar contrase\xF1a' : 'Ver contrase\xF1a'"
            >
              @if (showPassword()) {
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                </svg>
              } @else {
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              }
            </button>
            @if (isLoginInvalid('password')) {
              <span class="error-helper-text">La contrase\xF1a es requerida (m\xEDnimo 6 caracteres)</span>
            }
          </div>

          <button
            type="submit"
            class="m3-button m3-button-filled auth-submit-btn"
            [disabled]="isSubmitting()"
          >
            @if (isSubmitting()) {
              <span class="spinner-small" aria-hidden="true"></span>
              <span>Iniciando sesi\xF3n...</span>
            } @else {
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M10 17l5-5-5-5v10z"/>
              </svg>
              <span>Ingresar a DoctorChart</span>
            }
          </button>
        </form>
      }

      <!-- REGISTER VIEW -->
      <p class="auth-registration-note">Las cuentas se crean en Bycode. Despu\xE9s pod\xE9s iniciar sesi\xF3n en DoctorChart con esa misma cuenta.</p>

    </div>

    <div class="login-card-footer">
      <span class="footer-note">Acceso para profesionales de la salud con un plan DoctorChart activo.</span>
    </div>
  </div>
</div>
`, styles: ['/* src/app/features/auth/login-page.component.css */\n:host {\n  display: block;\n  width: 100%;\n  min-height: 100vh;\n}\n.login-page-wrapper {\n  min-height: 100vh;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    radial-gradient(\n      circle at 10% 20%,\n      rgba(0, 104, 116, 0.08) 0%,\n      transparent 40%),\n    radial-gradient(\n      circle at 90% 80%,\n      rgba(0, 104, 116, 0.06) 0%,\n      transparent 40%),\n    linear-gradient(\n      135deg,\n      var(--dc-surface-low, #f0f7f8) 0%,\n      var(--dc-surface-low, #eaf4f5) 100%);\n  padding: 2rem 1rem;\n  box-sizing: border-box;\n}\n.login-page-card {\n  width: 100%;\n  max-width: 480px;\n  background-color: var(--md-sys-color-surface, #ffffff);\n  border-radius: var(--md-shape-xl, 28px);\n  border: 1px solid var(--md-sys-color-outline-variant, #e0e4e5);\n  box-shadow: 0 12px 32px rgba(0, 31, 36, 0.12), 0 2px 6px rgba(0, 31, 36, 0.04);\n  overflow: hidden;\n  animation: cardFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n}\n@keyframes cardFadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(16px) scale(0.98);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n.login-card-header {\n  padding: 2rem 2rem 1.25rem;\n  border-bottom: 1px solid var(--md-sys-color-outline-variant, #eef2f3);\n  text-align: center;\n}\n.brand-logo-row {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 1rem;\n}\n.brand-icon {\n  width: 52px;\n  height: 52px;\n  border-radius: 16px;\n  background: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.brand-title {\n  font-size: 1.55rem;\n  font-weight: 800;\n  color: var(--md-sys-color-on-surface, #191c1d);\n  margin: 0;\n  line-height: 1.2;\n  letter-spacing: -0.02em;\n}\n.brand-subtitle {\n  font-size: 0.82rem;\n  color: var(--md-sys-color-secondary, #4a6267);\n  margin: 0.2rem 0 0;\n}\n.auth-mode-switcher {\n  display: flex;\n  gap: 0.35rem;\n  background-color: var(--md-sys-color-surface-container-high, #e8edee);\n  padding: 0.35rem;\n  margin: 1.25rem 2rem 0.5rem;\n  border-radius: var(--md-shape-full, 9999px);\n}\n.mode-switch-btn {\n  flex: 1;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.45rem;\n  padding: 0.55rem 0.65rem;\n  border-radius: var(--md-shape-full, 9999px);\n  border: none;\n  background: transparent;\n  font-family: inherit;\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: var(--md-sys-color-on-surface-variant, #3f484a);\n  cursor: pointer;\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  min-height: 40px;\n  text-decoration: none;\n  white-space: nowrap;\n  line-height: 1.25;\n}\n.mode-switch-btn.active {\n  background-color: var(--dc-surface, #ffffff);\n  color: var(--md-sys-color-primary, #006874);\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);\n}\n.login-card-body {\n  padding: 1.25rem 2rem 1.75rem;\n}\n.auth-subtitle {\n  font-size: 0.86rem;\n  color: var(--md-sys-color-secondary, #4a6267);\n  margin: 0 0 1.15rem;\n  line-height: 1.4;\n  text-align: center;\n}\n.m3-alert-error,\n.m3-alert-success {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  padding: 0.75rem 1rem;\n  border-radius: var(--md-shape-s, 8px);\n  margin-bottom: 1.25rem;\n  font-size: 0.85rem;\n  font-weight: 500;\n}\n.m3-alert-error {\n  background-color: var(--dc-error-surface, #ffdad6);\n  color: var(--md-sys-color-on-error-container, #410002);\n  border: 1px solid #ff5449;\n}\n.m3-alert-success {\n  background-color: var(--md-sys-color-success-container, #bbf2c8);\n  color: var(--md-sys-color-on-success-container, #002108);\n  border: 1px solid #2e7d32;\n}\n.m3-oauth-btn {\n  width: 100%;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.75rem;\n  height: 44px;\n  background-color: var(--dc-surface, #ffffff);\n  color: var(--dc-ink-secondary, #3c4043);\n  border: 1.5px solid var(--md-sys-color-outline-variant, #bfc8ca);\n  border-radius: var(--md-shape-s, 8px);\n  font-family: inherit;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n}\n.m3-oauth-btn:hover:not(:disabled) {\n  background-color: var(--dc-surface-high, #f8f9fa);\n  border-color: #747775;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n}\n.auth-divider {\n  display: flex;\n  align-items: center;\n  text-align: center;\n  margin: 1.25rem 0;\n  color: var(--md-sys-color-outline, #6f797a);\n  font-size: 0.78rem;\n  font-weight: 500;\n}\n.auth-divider::before,\n.auth-divider::after {\n  content: "";\n  flex: 1;\n  border-bottom: 1px solid var(--md-sys-color-outline-variant, #e0e4e5);\n}\n.auth-divider span {\n  padding: 0 0.75rem;\n}\n.auth-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1.15rem;\n}\n.m3-textfield {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n.m3-textfield input {\n  width: 100%;\n  height: 52px;\n  padding: 0 1rem;\n  border: 1.5px solid var(--md-sys-color-outline-variant, #bfc8ca);\n  border-radius: var(--md-shape-s, 8px);\n  background-color: var(--dc-surface, #ffffff);\n  color: var(--md-sys-color-on-surface, #191c1d);\n  font-size: 0.95rem;\n  box-sizing: border-box;\n  outline: none;\n  transition: border-color 0.15s, box-shadow 0.15s;\n}\n.m3-textfield input:focus {\n  border-color: var(--md-sys-color-primary, #006874);\n  box-shadow: 0 0 0 3px rgba(0, 104, 116, 0.12);\n}\n.m3-textfield label {\n  position: absolute;\n  left: 0.85rem;\n  top: 50%;\n  transform: translateY(-50%);\n  font-size: 0.92rem;\n  color: var(--md-sys-color-secondary, #4a6267);\n  pointer-events: none;\n  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n  background-color: transparent;\n  padding: 0 0.35rem;\n  border-radius: 4px;\n  line-height: 1;\n}\n.m3-textfield input:focus ~ label,\n.m3-textfield input:not(:placeholder-shown) ~ label,\n.m3-textfield input:-webkit-autofill ~ label {\n  top: 0;\n  transform: translateY(-50%) scale(0.82);\n  transform-origin: left center;\n  left: 0.75rem;\n  background-color: var(--dc-surface, #ffffff);\n  font-weight: 600;\n  color: var(--md-sys-color-primary, #006874);\n  z-index: 1;\n}\n.m3-textfield.has-error input {\n  border-color: #ba1a1a;\n}\n.m3-textfield.has-error input:focus {\n  border-color: #ba1a1a;\n  box-shadow: 0 0 0 3px rgba(186, 26, 26, 0.12);\n}\n.m3-textfield.has-error label,\n.m3-textfield.has-error input:focus ~ label,\n.m3-textfield.has-error input:not(:placeholder-shown) ~ label,\n.m3-textfield.has-error input:-webkit-autofill ~ label {\n  color: var(--dc-error-ink, #ba1a1a);\n}\n.error-helper-text {\n  font-size: 0.74rem;\n  color: var(--dc-error-ink, #ba1a1a);\n  margin-top: 0.25rem;\n  font-weight: 500;\n}\n.password-field {\n  position: relative;\n}\n.password-field input {\n  padding-right: 2.75rem;\n}\n.pwd-toggle-btn {\n  position: absolute;\n  right: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  background: transparent;\n  border: none;\n  color: var(--md-sys-color-secondary, #4a6267);\n  cursor: pointer;\n  padding: 0.35rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n}\n.pwd-toggle-btn:hover {\n  background-color: var(--md-sys-color-surface-container-high, #e8edee);\n  color: var(--md-sys-color-primary, #006874);\n}\n.form-grid-2 {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.85rem;\n}\n.auth-submit-btn {\n  width: 100%;\n  height: 46px;\n  margin-top: 0.5rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  font-size: 0.95rem;\n  font-weight: 600;\n  border-radius: var(--md-shape-full, 9999px);\n  cursor: pointer;\n}\n.login-card-footer {\n  padding: 1rem 2rem 1.5rem;\n  background-color: var(--md-sys-color-surface-container-lowest, #f9fafb);\n  border-top: 1px solid var(--md-sys-color-outline-variant, #eef2f3);\n  text-align: center;\n}\n.footer-note {\n  font-size: 0.75rem;\n  color: var(--md-sys-color-secondary, #4a6267);\n  line-height: 1.35;\n  display: block;\n}\n.spinner-small {\n  width: 18px;\n  height: 18px;\n  border: 2.5px solid rgba(255, 255, 255, 0.4);\n  border-top-color: #ffffff;\n  border-radius: 50%;\n  animation: spin 0.6s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.login-theme-control {\n  display: flex;\n  justify-content: flex-end;\n  padding: 1rem 1rem 0;\n}\n.login-back-link {\n  display: inline-block;\n  margin: 1.25rem 1.5rem 0;\n  color: var(--md-sys-color-primary, #006874);\n  font-size: .875rem;\n  text-decoration: none;\n}\n.login-back-link:hover {\n  text-decoration: underline;\n}\n.login-back-link:focus-visible {\n  outline: 2px solid currentColor;\n  outline-offset: 4px;\n}\n.auth-submit-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: .5rem;\n  min-height: 46px;\n  padding: .7rem 1.1rem;\n  border: 1px solid var(--md-sys-color-primary, #006874);\n  border-radius: 9999px;\n  background: var(--md-sys-color-primary, #006874);\n  color: var(--md-sys-color-on-primary, #fff);\n  font: inherit;\n  font-weight: 600;\n  cursor: pointer;\n}\n.auth-submit-btn:hover:not(:disabled) {\n  filter: brightness(.94);\n}\n.auth-submit-btn:disabled {\n  opacity: .6;\n  cursor: wait;\n}\n.auth-submit-btn:focus-visible,\n.mode-switch-btn:focus-visible {\n  outline: 2px solid var(--md-sys-color-primary, #006874);\n  outline-offset: 3px;\n}\n.mode-switch-btn svg {\n  flex-shrink: 0;\n}\n.auth-registration-note {\n  margin: 1.25rem 0 0;\n  font-size: .8rem;\n  line-height: 1.5;\n  text-align: center;\n  color: var(--md-sys-color-on-surface-variant, #3f484a);\n}\n@media (max-width: 420px) {\n  .auth-mode-switcher {\n    flex-direction: column;\n    border-radius: 18px;\n  }\n}\n/*# sourceMappingURL=login-page.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginPageComponent, { className: "LoginPageComponent", filePath: "src/app/features/auth/login-page.component.ts", lineNumber: 17 });
})();

export {
  LoginPageComponent
};
//# debugId=7f8c835d-63c2-57da-bcd4-4fb0b62e1274
//# sourceMappingURL=chunk-RSF6XMUY.js.map
