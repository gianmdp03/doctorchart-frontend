import {
  ThemeToggleComponent
} from "./chunk-GDDBOYJO.js";
import "./chunk-5V3TTGBI.js";
import {
  NgIcon,
  lucideActivity,
  lucideArrowRight,
  lucideCheck,
  lucideClipboardList,
  lucideFileText,
  lucideFolderOpen,
  lucidePlus,
  lucideSlidersHorizontal,
  lucideStethoscope,
  lucideUsers,
  provideIcons
} from "./chunk-Z3UJ4PSI.js";
import "./chunk-WBCHXDEU.js";
import {
  RouterLink
} from "./chunk-XM57RTTR.js";
import "./chunk-YAYJVLGH.js";
import "./chunk-SYX7XZ26.js";
import {
  ChangeDetectionStrategy,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-3HO5VEWU.js";

// src/app/features/landing/landing.component.ts
var _forTrack0 = ($index, $item) => $item.title;
var _forTrack1 = ($index, $item) => $item.number;
var _forTrack2 = ($index, $item) => $item.question;
function LandingComponent_For_137_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 60)(1, "span", 75);
    \u0275\u0275element(2, "ng-icon", 76);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const feature_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("name", feature_r1.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(feature_r1.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(feature_r1.description);
  }
}
function LandingComponent_For_155_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "article", 67)(1, "span", 77);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "h3");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const step_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r2.number);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(step_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r2.description);
  }
}
function LandingComponent_For_164_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "details")(1, "summary");
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 78);
    \u0275\u0275text(4, "+");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const faq_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(faq_r3.question);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(faq_r3.answer);
  }
}
var LandingComponent = class _LandingComponent {
  features = [
    {
      icon: "lucideUsers",
      title: "Cada paciente, su ficha",
      description: "Registr\xE1 pacientes, busc\xE1 en tu directorio y consult\xE1 sus datos desde una ficha individual."
    },
    {
      icon: "lucideClipboardList",
      title: "Una historia que contin\xFAa",
      description: "Document\xE1 consultas y revis\xE1 los registros anteriores para seguir la historia cl\xEDnica de cada paciente."
    },
    {
      icon: "lucideSlidersHorizontal",
      title: "Fichas a tu medida",
      description: "Seleccion\xE1 tu especialidad y personaliz\xE1 las categor\xEDas y campos de tus fichas y consultas."
    },
    {
      icon: "lucideFileText",
      title: "Recetas y \xF3rdenes",
      description: "Prepar\xE1 recetas y \xF3rdenes de estudios, guardalas en el historial e imprimilas desde la ficha."
    },
    {
      icon: "lucideFolderOpen",
      title: "Estudios en su lugar",
      description: "Adjunt\xE1 PDFs e im\xE1genes a la ficha del paciente para consultar y descargar sus estudios."
    },
    {
      icon: "lucideActivity",
      title: "Seguimiento cl\xEDnico",
      description: "Registr\xE1 vacunas y consult\xE1 la evoluci\xF3n y las curvas en las especialidades que tienen estos m\xF3dulos disponibles."
    }
  ];
  steps = [
    {
      number: "01",
      title: "Configur\xE1 tu espacio",
      description: "Seleccion\xE1 tu especialidad y adapt\xE1 tus fichas y formularios de consulta."
    },
    {
      number: "02",
      title: "Registr\xE1 tus pacientes",
      description: "Cre\xE1 sus fichas con la informaci\xF3n que necesit\xE1s para la atenci\xF3n."
    },
    {
      number: "03",
      title: "Dale continuidad a la atenci\xF3n",
      description: "Agreg\xE1 consultas y volv\xE9 al historial, los documentos y los estudios de cada paciente."
    }
  ];
  faqs = [
    {
      question: "\xBFPara qui\xE9n es DoctorChart?",
      answer: "DoctorChart es un espacio de trabajo para profesionales de la salud que necesitan organizar fichas de pacientes y registrar su atenci\xF3n cl\xEDnica."
    },
    {
      question: "\xBFPuedo personalizar las fichas?",
      answer: "S\xED. Pod\xE9s seleccionar tu especialidad y configurar las categor\xEDas y los campos que us\xE1s en las fichas y consultas."
    },
    {
      question: "\xBFTodas las especialidades tienen los mismos m\xF3dulos?",
      answer: "Los m\xF3dulos disponibles dependen de la especialidad y de la configuraci\xF3n de tu espacio. Vacunaci\xF3n y curvas de evoluci\xF3n se muestran cuando corresponden a esa configuraci\xF3n."
    },
    {
      question: "\xBFC\xF3mo ingreso?",
      answer: "Desde Iniciar sesi\xF3n pod\xE9s acceder con tu cuenta de ByCode, por correo y contrase\xF1a o con Google. Tambi\xE9n pod\xE9s crear una cuenta. Para entrar al espacio cl\xEDnico necesit\xE1s un plan DoctorChart activo; crear la cuenta no activa un plan por s\xED solo."
    }
  ];
  static \u0275fac = function LandingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LandingComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LandingComponent, selectors: [["app-landing"]], features: [\u0275\u0275ProvidersFeature([
    provideIcons({
      lucideArrowRight,
      lucideCheck,
      lucideUsers,
      lucideClipboardList,
      lucideSlidersHorizontal,
      lucideFileText,
      lucideFolderOpen,
      lucideActivity,
      lucidePlus,
      lucideStethoscope
    })
  ])], decls: 188, vars: 0, consts: [["href", "#contenido", 1, "skip-link"], [1, "landing-header"], [1, "header-inner"], ["routerLink", "/", "aria-label", "DoctorChart, inicio", 1, "brand"], [1, "brand-mark"], ["src", "/doctorchart-logo.svg", "width", "35", "height", "35", "alt", "", "aria-hidden", "true", 1, "doctorchart-logo"], ["aria-label", "Navegaci\xF3n de presentaci\xF3n"], ["href", "#funciones"], ["href", "#como-funciona"], ["href", "#preguntas"], [1, "header-actions"], ["routerLink", "/login", 1, "button", "button-small"], ["name", "lucideArrowRight"], ["id", "contenido"], ["aria-labelledby", "hero-title", 1, "hero", "section-width"], [1, "hero-copy"], [1, "eyebrow"], [1, "status-dot"], ["id", "hero-title"], [1, "hero-description"], [1, "hero-actions"], ["routerLink", "/login", 1, "button"], ["href", "#funciones", 1, "text-link"], ["aria-hidden", "true"], [1, "hero-note"], ["name", "lucideStethoscope"], [1, "preview-stage"], [1, "preview-label"], ["role", "img", "aria-label", "Ejemplo ilustrativo de una ficha con datos del paciente, historia cl\xEDnica, recetas y estudios. Datos ficticios.", 1, "record-preview"], [1, "preview-topbar"], [1, "preview-brand"], [1, "example-pill"], [1, "preview-breadcrumb"], [1, "preview-patient"], [1, "avatar"], ["name", "lucideClipboardList"], [1, "preview-tabs"], [1, "active"], [1, "preview-body"], [1, "preview-section-title"], [1, "preview-add"], ["name", "lucidePlus"], [1, "preview-encounter"], [1, "encounter-marker"], [1, "encounter-content"], [1, "preview-date"], [1, "record-lines"], [1, "preview-encounter", "previous"], [1, "preview-footer"], ["name", "lucideFolderOpen"], [1, "floating-note"], [1, "floating-icon"], ["name", "lucideCheck"], [1, "preview-disclaimer"], [1, "intro-strip"], [1, "section-width"], ["id", "funciones", "aria-labelledby", "features-title", 1, "features", "section-width", "section-space"], [1, "section-heading"], ["id", "features-title"], [1, "feature-grid"], [1, "feature-card"], [1, "module-note"], ["id", "como-funciona", "aria-labelledby", "workflow-title", 1, "workflow", "section-width"], [1, "workflow-intro"], ["id", "workflow-title"], ["routerLink", "/login", 1, "text-link"], [1, "steps"], [1, "step"], ["id", "preguntas", "aria-labelledby", "faq-title", 1, "faq", "section-width", "section-space"], ["id", "faq-title"], [1, "faq-list"], [1, "closing", "section-width"], [1, "landing-footer", "section-width"], ["routerLink", "/", 1, "brand"], ["routerLink", "/login"], [1, "feature-icon"], [3, "name"], [1, "step-number"], ["aria-hidden", "true", 1, "faq-plus"]], template: function LandingComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "a", 0);
      \u0275\u0275text(1, "Ir al contenido");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "header", 1)(3, "div", 2)(4, "a", 3)(5, "span", 4);
      \u0275\u0275element(6, "img", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275text(7, "DoctorChart");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "nav", 6)(9, "a", 7);
      \u0275\u0275text(10, "Funciones");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "a", 8);
      \u0275\u0275text(12, "C\xF3mo funciona");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "a", 9);
      \u0275\u0275text(14, "Preguntas frecuentes");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 10);
      \u0275\u0275element(16, "app-theme-toggle");
      \u0275\u0275elementStart(17, "a", 11);
      \u0275\u0275text(18, "Iniciar sesi\xF3n ");
      \u0275\u0275element(19, "ng-icon", 12);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(20, "main", 13)(21, "section", 14)(22, "div", 15)(23, "span", 16);
      \u0275\u0275element(24, "span", 17);
      \u0275\u0275text(25, " TU ESPACIO CL\xCDNICO DIGITAL");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "h1", 18);
      \u0275\u0275text(27, "Historias cl\xEDnicas digitales.");
      \u0275\u0275element(28, "br");
      \u0275\u0275elementStart(29, "span");
      \u0275\u0275text(30, "Tus pacientes, en un mismo lugar.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "p", 19);
      \u0275\u0275text(32, " Registr\xE1 consultas, organiz\xE1 la informaci\xF3n de cada paciente y personaliz\xE1 tus fichas cl\xEDnicas. DoctorChart acompa\xF1a tu trabajo en cada atenci\xF3n. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "div", 20)(34, "a", 21);
      \u0275\u0275text(35, "Ingresar a DoctorChart ");
      \u0275\u0275element(36, "ng-icon", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "a", 22);
      \u0275\u0275text(38, "Conoc\xE9 las funciones ");
      \u0275\u0275elementStart(39, "span", 23);
      \u0275\u0275text(40, "\u2197");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(41, "div", 24);
      \u0275\u0275element(42, "ng-icon", 25);
      \u0275\u0275text(43, " Pensado para profesionales de la salud ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "div", 26)(45, "div", 27);
      \u0275\u0275element(46, "span", 17);
      \u0275\u0275text(47, " UNA MIRADA A TU ESPACIO DE TRABAJO ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "div", 28)(49, "div", 29)(50, "span", 30);
      \u0275\u0275element(51, "img", 5);
      \u0275\u0275text(52, " DoctorChart");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "span", 31);
      \u0275\u0275text(54, "EJEMPLO");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "div", 32);
      \u0275\u0275text(56, "Pacientes ");
      \u0275\u0275elementStart(57, "span");
      \u0275\u0275text(58, "/");
      \u0275\u0275elementEnd();
      \u0275\u0275text(59, " Ficha del paciente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "div", 33)(61, "div", 34);
      \u0275\u0275text(62, "PE");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "div")(64, "strong");
      \u0275\u0275text(65, "Paciente de ejemplo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "span");
      \u0275\u0275text(67, "Ficha cl\xEDnica \xB7 Datos ficticios");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(68, "ng-icon", 35);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "div", 36)(70, "span");
      \u0275\u0275text(71, "Datos del paciente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "span", 37);
      \u0275\u0275text(73, "Historia cl\xEDnica");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "span");
      \u0275\u0275text(75, "Recetas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "span");
      \u0275\u0275text(77, "Estudios");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(78, "div", 38)(79, "div", 39)(80, "strong");
      \u0275\u0275text(81, "Historia cl\xEDnica");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "span", 40);
      \u0275\u0275element(83, "ng-icon", 41);
      \u0275\u0275text(84, " Consulta");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(85, "div", 42)(86, "div", 43);
      \u0275\u0275element(87, "ng-icon", 25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(88, "div", 44)(89, "span", 45);
      \u0275\u0275text(90, "14/10/2026");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(91, "strong");
      \u0275\u0275text(92, "Consulta de seguimiento");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(93, "p");
      \u0275\u0275text(94, "Registro de evoluci\xF3n del paciente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(95, "div", 46);
      \u0275\u0275element(96, "i")(97, "i");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(98, "div", 47)(99, "div", 43);
      \u0275\u0275element(100, "ng-icon", 35);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(101, "div", 44)(102, "span", 45);
      \u0275\u0275text(103, "02/10/2026");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(104, "strong");
      \u0275\u0275text(105, "Primera consulta");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(106, "p");
      \u0275\u0275text(107, "Antecedentes y motivo de consulta");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(108, "div", 48);
      \u0275\u0275element(109, "ng-icon", 49);
      \u0275\u0275text(110, " Informaci\xF3n y seguimiento en la ficha del paciente ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(111, "div", 50)(112, "span", 51);
      \u0275\u0275element(113, "ng-icon", 52);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(114, "div")(115, "strong");
      \u0275\u0275text(116, "Tu forma de trabajar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(117, "span");
      \u0275\u0275text(118, "Fichas y consultas personalizables");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(119, "p", 53);
      \u0275\u0275text(120, "Vista ilustrativa con datos ficticios.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(121, "div", 54)(122, "div", 55)(123, "span");
      \u0275\u0275text(124, "Del primer registro al seguimiento.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(125, "p");
      \u0275\u0275text(126, "La informaci\xF3n cl\xEDnica, organizada alrededor del paciente.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(127, "section", 56)(128, "div", 57)(129, "span", 16);
      \u0275\u0275text(130, "HERRAMIENTAS PARA TU D\xCDA A D\xCDA");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(131, "h2", 58);
      \u0275\u0275text(132, "M\xE1s orden en cada consulta.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(133, "p");
      \u0275\u0275text(134, "Conoc\xE9 lo que pod\xE9s hacer dentro de DoctorChart.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(135, "div", 59);
      \u0275\u0275repeaterCreate(136, LandingComponent_For_137_Template, 7, 3, "article", 60, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(138, "p", 61);
      \u0275\u0275text(139, " Los m\xF3dulos disponibles dependen de tu especialidad y de la configuraci\xF3n de tu espacio cl\xEDnico. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(140, "section", 62)(141, "div", 63)(142, "span", 16);
      \u0275\u0275text(143, "C\xD3MO FUNCIONA");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(144, "h2", 64);
      \u0275\u0275text(145, "Un espacio que se adapta");
      \u0275\u0275element(146, "br");
      \u0275\u0275text(147, "a tu pr\xE1ctica.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(148, "p");
      \u0275\u0275text(149, " Empez\xE1 por tu especialidad. Despu\xE9s, constru\xED la historia cl\xEDnica de cada paciente, consulta a consulta. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(150, "a", 65);
      \u0275\u0275text(151, "Ir a iniciar sesi\xF3n ");
      \u0275\u0275element(152, "ng-icon", 12);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(153, "div", 66);
      \u0275\u0275repeaterCreate(154, LandingComponent_For_155_Template, 8, 3, "article", 67, _forTrack1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(156, "section", 68)(157, "div", 57)(158, "span", 16);
      \u0275\u0275text(159, "ANTES DE EMPEZAR");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(160, "h2", 69);
      \u0275\u0275text(161, "Preguntas frecuentes.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(162, "div", 70);
      \u0275\u0275repeaterCreate(163, LandingComponent_For_164_Template, 7, 2, "details", null, _forTrack2);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(165, "section", 71)(166, "span", 16);
      \u0275\u0275text(167, "DOCTORCHART");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(168, "h2");
      \u0275\u0275text(169, "Tu pr\xF3xima consulta,");
      \u0275\u0275element(170, "br");
      \u0275\u0275text(171, "con la historia a mano.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(172, "p");
      \u0275\u0275text(173, "Ingres\xE1 a tu espacio cl\xEDnico y continu\xE1 el seguimiento de tus pacientes.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(174, "a", 21);
      \u0275\u0275text(175, "Iniciar sesi\xF3n ");
      \u0275\u0275element(176, "ng-icon", 12);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(177, "footer", 72)(178, "a", 73)(179, "span", 4);
      \u0275\u0275element(180, "img", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275text(181, "DoctorChart");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(182, "span");
      \u0275\u0275text(183, "Un espacio para tu pr\xE1ctica cl\xEDnica.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(184, "a", 74);
      \u0275\u0275text(185, "Iniciar sesi\xF3n ");
      \u0275\u0275elementStart(186, "span", 23);
      \u0275\u0275text(187, "\u2197");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(136);
      \u0275\u0275repeater(ctx.features);
      \u0275\u0275advance(18);
      \u0275\u0275repeater(ctx.steps);
      \u0275\u0275advance(9);
      \u0275\u0275repeater(ctx.faqs);
    }
  }, dependencies: [RouterLink, NgIcon, ThemeToggleComponent], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  --%NS%ink: var(--%NS%md-sys-color-on-surface, #172b2e);\n  --%NS%muted: var(--%NS%md-sys-color-on-surface-variant, #526568);\n  --%NS%teal: var(--%NS%md-sys-color-primary, #006874);\n  --%NS%soft: var(--%NS%md-sys-color-surface-container-low, #f0f7f7);\n  --%NS%surface: var(--%NS%md-sys-color-surface, #fff);\n  --%NS%line: var(--%NS%md-sys-color-outline-variant, #d8e4e5);\n  color: var(--%NS%ink);\n  background: var(--%NS%surface);\n  font-family: var(--%NS%font-sans);\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\na[_ngcontent-%COMP%] {\n  color: inherit;\n  text-decoration: none;\n}\nng-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\na[_ngcontent-%COMP%]:focus-visible, \nsummary[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid var(--%NS%teal);\n  outline-offset: 5px;\n  border-radius: 5px;\n}\n.section-width[_ngcontent-%COMP%] {\n  width: min(1160px, calc(100% - 80px));\n  margin-inline: auto;\n}\n.skip-link[_ngcontent-%COMP%] {\n  position: fixed;\n  top: -80px;\n  left: 20px;\n  z-index: 100;\n  padding: 12px 20px;\n  background: var(--%NS%surface);\n  color: var(--%NS%teal);\n}\n.skip-link[_ngcontent-%COMP%]:focus {\n  top: 15px;\n}\n.landing-header[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--%NS%line);\n  background: var(--%NS%surface);\n}\n.header-inner[_ngcontent-%COMP%] {\n  width: min(1320px, calc(100% - 64px));\n  margin: auto;\n  min-height: 88px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 28px;\n}\n.brand[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 22px;\n  font-weight: 750;\n  letter-spacing: -0.8px;\n}\n.brand-mark[_ngcontent-%COMP%] {\n  width: 35px;\n  height: 35px;\n  border-radius: 11px;\n  background: #ffffff;\n  display: grid;\n  place-items: center;\n  font-size: 25px;\n}\n.brand-mark[_ngcontent-%COMP%]   .doctorchart-logo[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\nnav[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 28px;\n  font-size: 13px;\n  color: var(--%NS%muted);\n}\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, \n.text-link[_ngcontent-%COMP%]:hover {\n  color: var(--%NS%teal);\n}\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n.button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 14px;\n  background: var(--%NS%teal);\n  color: var(--%NS%md-sys-color-on-primary, white);\n  border: 1px solid var(--%NS%teal);\n  padding: 16px 24px;\n  border-radius: 100px;\n  font-size: 14px;\n  font-weight: 600;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.button[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 5px 18px color-mix(in srgb, var(--%NS%teal) 18%, transparent);\n}\n.button[_ngcontent-%COMP%]   ng-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.button-small[_ngcontent-%COMP%] {\n  font-size: 13px;\n  padding: 11px 19px;\n}\n.hero[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.05fr 1fr;\n  align-items: center;\n  gap: 68px;\n  padding-block: 88px 80px;\n}\n.eyebrow[_ngcontent-%COMP%] {\n  font-size: 10px;\n  letter-spacing: 1.8px;\n  font-weight: 750;\n  color: var(--%NS%teal);\n  display: inline-flex;\n  gap: 9px;\n  align-items: center;\n}\n.status-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: var(--%NS%teal);\n  display: inline-block;\n}\nh1[_ngcontent-%COMP%] {\n  font-size: clamp(38px, 4.2vw, 56px);\n  line-height: 1.12;\n  font-weight: 650;\n  letter-spacing: -2.6px;\n  margin: 23px 0;\n}\nh1[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--%NS%teal);\n}\n.hero-description[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: var(--%NS%muted);\n  line-height: 1.8;\n  max-width: 465px;\n}\n.hero-actions[_ngcontent-%COMP%] {\n  margin-top: 30px;\n  display: flex;\n  align-items: center;\n  gap: 24px;\n  flex-wrap: wrap;\n}\n.text-link[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 650;\n  display: inline-flex;\n  align-items: center;\n  gap: 9px;\n}\n.hero-note[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 11px;\n  color: var(--%NS%muted);\n  margin-top: 23px;\n}\n.hero-note[_ngcontent-%COMP%]   ng-icon[_ngcontent-%COMP%] {\n  color: var(--%NS%teal);\n  font-size: 16px;\n}\n.preview-stage[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 26px 23px 36px;\n  border-radius: 28px;\n  background:\n    radial-gradient(\n      ellipse at 80% 10%,\n      color-mix(in srgb, var(--%NS%teal) 12%, var(--%NS%surface)),\n      var(--%NS%soft) 75%);\n}\n.preview-label[_ngcontent-%COMP%] {\n  font-size: 8px;\n  letter-spacing: 1.3px;\n  color: var(--%NS%teal);\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  margin: 0 0 19px 5px;\n}\n.record-preview[_ngcontent-%COMP%] {\n  border: 1px solid var(--%NS%line);\n  border-radius: 13px;\n  background: var(--%NS%surface);\n  overflow: hidden;\n  box-shadow: 0 18px 45px color-mix(in srgb, var(--%NS%ink) 8%, transparent);\n}\n.preview-topbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 15px 18px;\n  border-bottom: 1px solid var(--%NS%line);\n}\n.preview-brand[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.preview-brand[_ngcontent-%COMP%]   .doctorchart-logo[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n}\n.example-pill[_ngcontent-%COMP%] {\n  font-size: 7px;\n  letter-spacing: 1px;\n  border: 1px solid var(--%NS%line);\n  padding: 4px 7px;\n  border-radius: 4px;\n  color: var(--%NS%muted);\n}\n.preview-breadcrumb[_ngcontent-%COMP%] {\n  color: var(--%NS%muted);\n  font-size: 8px;\n  padding: 17px 18px 0;\n}\n.preview-breadcrumb[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin: 0 7px;\n}\n.preview-patient[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 17px 18px;\n}\n.avatar[_ngcontent-%COMP%] {\n  height: 37px;\n  width: 37px;\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  background: var(--%NS%soft);\n  color: var(--%NS%teal);\n  font-size: 12px;\n  font-weight: 700;\n}\n.preview-patient[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 13px;\n  display: block;\n}\n.preview-patient[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 8px;\n  margin-top: 4px;\n  color: var(--%NS%muted);\n}\n.preview-patient[_ngcontent-%COMP%]    > ng-icon[_ngcontent-%COMP%] {\n  margin-left: auto;\n  color: var(--%NS%teal);\n}\n.preview-tabs[_ngcontent-%COMP%] {\n  padding: 0 18px;\n  display: flex;\n  gap: 17px;\n  font-size: 8px;\n  color: var(--%NS%muted);\n  border-bottom: 1px solid var(--%NS%line);\n}\n.preview-tabs[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 8px 0 10px;\n  white-space: nowrap;\n}\n.preview-tabs[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%] {\n  color: var(--%NS%teal);\n  border-bottom: 2px solid var(--%NS%teal);\n  font-weight: 700;\n}\n.preview-body[_ngcontent-%COMP%] {\n  padding: 18px;\n}\n.preview-section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-size: 10px;\n  margin-bottom: 17px;\n}\n.preview-add[_ngcontent-%COMP%] {\n  color: var(--%NS%teal);\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 8px;\n  background: var(--%NS%soft);\n  padding: 6px 8px;\n  border-radius: 5px;\n}\n.preview-encounter[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 11px;\n}\n.encounter-marker[_ngcontent-%COMP%] {\n  color: var(--%NS%teal);\n  background: var(--%NS%soft);\n  border: 1px solid var(--%NS%line);\n  height: 27px;\n  width: 27px;\n  border-radius: 8px;\n  display: grid;\n  place-items: center;\n  font-size: 14px;\n}\n.encounter-content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding-bottom: 15px;\n}\n.preview-date[_ngcontent-%COMP%] {\n  font-size: 7px;\n  color: var(--%NS%muted);\n  display: block;\n  margin-bottom: 5px;\n}\n.encounter-content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 10px;\n}\n.encounter-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 8px;\n  color: var(--%NS%muted);\n  margin-top: 5px;\n}\n.record-lines[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 5px;\n  margin-top: 11px;\n}\n.record-lines[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  height: 4px;\n  background: var(--%NS%soft);\n  border-radius: 5px;\n  width: 90%;\n}\n.record-lines[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:last-child {\n  width: 65%;\n}\n.previous[_ngcontent-%COMP%] {\n  padding-top: 12px;\n  border-top: 1px solid var(--%NS%line);\n}\n.previous[_ngcontent-%COMP%]   .encounter-content[_ngcontent-%COMP%] {\n  padding-bottom: 0;\n}\n.preview-footer[_ngcontent-%COMP%] {\n  background: var(--%NS%soft);\n  border-top: 1px solid var(--%NS%line);\n  padding: 11px 18px;\n  font-size: 7px;\n  color: var(--%NS%muted);\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.floating-note[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  position: absolute;\n  bottom: 19px;\n  right: -15px;\n  padding: 13px 17px;\n  border-radius: 12px;\n  border: 1px solid var(--%NS%line);\n  background: var(--%NS%surface);\n  box-shadow: 0 8px 25px color-mix(in srgb, var(--%NS%ink) 9%, transparent);\n}\n.floating-icon[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  height: 29px;\n  width: 29px;\n  border-radius: 50%;\n  background: var(--%NS%soft);\n  color: var(--%NS%teal);\n}\n.floating-note[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 10px;\n  display: block;\n}\n.floating-note[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 8px;\n  display: block;\n  color: var(--%NS%muted);\n  margin-top: 4px;\n}\n.preview-disclaimer[_ngcontent-%COMP%] {\n  font-size: 8px;\n  color: var(--%NS%muted);\n  position: absolute;\n  bottom: -23px;\n  left: 0;\n}\n.intro-strip[_ngcontent-%COMP%] {\n  border-block: 1px solid var(--%NS%line);\n}\n.intro-strip[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 20px;\n  align-items: center;\n  padding-block: 22px;\n}\n.intro-strip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 650;\n}\n.intro-strip[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--%NS%muted);\n  margin: 0;\n}\n.section-space[_ngcontent-%COMP%] {\n  padding-block: 80px;\n}\nsection[id][_ngcontent-%COMP%] {\n  scroll-margin-top: 24px;\n}\n.section-heading[_ngcontent-%COMP%] {\n  margin-bottom: 36px;\n}\nh2[_ngcontent-%COMP%] {\n  font-size: clamp(28px, 3vw, 37px);\n  letter-spacing: -1.2px;\n  font-weight: 600;\n  line-height: 1.2;\n  margin: 15px 0;\n}\n.section-heading[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%], \n.workflow-intro[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.8;\n  color: var(--%NS%muted);\n}\n.feature-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 18px;\n}\n.feature-card[_ngcontent-%COMP%] {\n  border: 1px solid var(--%NS%line);\n  border-radius: 18px;\n  padding: 27px;\n}\n.feature-icon[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border-radius: 12px;\n  display: grid;\n  place-items: center;\n  color: var(--%NS%teal);\n  background: var(--%NS%soft);\n  font-size: 22px;\n}\nh3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 650;\n  margin: 21px 0 10px;\n  letter-spacing: -0.3px;\n}\n.feature-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.step[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  line-height: 1.8;\n  color: var(--%NS%muted);\n  margin: 0;\n}\n.module-note[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--%NS%muted);\n  margin: 20px 0 0;\n}\n.workflow[_ngcontent-%COMP%] {\n  border-radius: 25px;\n  background: var(--%NS%soft);\n  padding: 48px;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 65px;\n}\n.workflow-intro[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n  max-width: 340px;\n}\n.workflow-intro[_ngcontent-%COMP%]   .text-link[_ngcontent-%COMP%] {\n  color: var(--%NS%teal);\n  margin-top: 20px;\n}\n.steps[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.step[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 20px;\n  padding-block: 22px;\n}\n.step[_ngcontent-%COMP%]    + .step[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--%NS%line);\n}\n.step-number[_ngcontent-%COMP%] {\n  color: var(--%NS%teal);\n  font-size: 12px;\n  font-weight: 700;\n  padding-top: 3px;\n}\n.step[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n}\n.faq[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 0.8fr 1.2fr;\n  gap: 60px;\n}\n.faq-list[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--%NS%line);\n  padding: 20px 0;\n}\n.faq-list[_ngcontent-%COMP%]   details[_ngcontent-%COMP%]:first-child {\n  padding-top: 8px;\n}\nsummary[_ngcontent-%COMP%] {\n  list-style: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 15px;\n  font-size: 14px;\n  font-weight: 600;\n}\nsummary[_ngcontent-%COMP%]::-webkit-details-marker {\n  display: none;\n}\n.faq-plus[_ngcontent-%COMP%] {\n  font-size: 23px;\n  font-weight: 400;\n  color: var(--%NS%teal);\n}\ndetails[open][_ngcontent-%COMP%]   .faq-plus[_ngcontent-%COMP%] {\n  transform: rotate(45deg);\n}\n.faq-list[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--%NS%muted);\n  font-size: 13px;\n  line-height: 1.8;\n  margin: 15px 30px 0 0;\n}\n.closing[_ngcontent-%COMP%] {\n  padding: 55px 30px;\n  text-align: center;\n  background: var(--%NS%soft);\n  border: 1px solid var(--%NS%line);\n  border-radius: 25px;\n}\n.closing[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 39px;\n}\n.closing[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--%NS%muted);\n  font-size: 14px;\n  line-height: 1.7;\n  margin-bottom: 25px;\n}\n.landing-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 24px;\n  padding-block: 38px;\n  margin-top: 25px;\n}\n.landing-footer[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.landing-footer[_ngcontent-%COMP%]   .brand-mark[_ngcontent-%COMP%] {\n  height: 28px;\n  width: 28px;\n  font-size: 20px;\n}\n.landing-footer[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%], \n.landing-footer[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%]:last-child {\n  font-size: 11px;\n  color: var(--%NS%muted);\n}\n@media (min-width: 1450px) {\n  .hero[_ngcontent-%COMP%] {\n    padding-block: 110px;\n  }\n}\n@media (max-width: 1050px) {\n  nav[_ngcontent-%COMP%] {\n    gap: 16px;\n  }\n  .header-inner[_ngcontent-%COMP%] {\n    gap: 15px;\n  }\n  .hero[_ngcontent-%COMP%] {\n    gap: 35px;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 44px;\n  }\n  .hero-actions[_ngcontent-%COMP%] {\n    gap: 16px;\n  }\n  .preview-tabs[_ngcontent-%COMP%] {\n    gap: 10px;\n  }\n  .workflow[_ngcontent-%COMP%] {\n    gap: 35px;\n    padding: 35px;\n  }\n}\n@media (max-width: 850px) {\n  nav[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .hero[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 45px;\n    padding-block: 55px 65px;\n  }\n  .hero-copy[_ngcontent-%COMP%] {\n    max-width: 600px;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 52px;\n  }\n  .hero-description[_ngcontent-%COMP%] {\n    max-width: 540px;\n  }\n  .preview-stage[_ngcontent-%COMP%] {\n    max-width: 520px;\n    width: 100%;\n    margin-inline: auto;\n  }\n  .feature-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .intro-strip[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n    gap: 8px;\n  }\n  .faq[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 0;\n  }\n  .workflow[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 15px;\n  }\n  .workflow-intro[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n  .section-space[_ngcontent-%COMP%] {\n    padding-block: 60px;\n  }\n  .landing-footer[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 520px) {\n  .section-width[_ngcontent-%COMP%] {\n    width: calc(100% - 36px);\n  }\n  .header-inner[_ngcontent-%COMP%] {\n    width: calc(100% - 32px);\n    min-height: 74px;\n    gap: 8px;\n  }\n  .brand[_ngcontent-%COMP%] {\n    font-size: 18px;\n    gap: 7px;\n  }\n  .brand-mark[_ngcontent-%COMP%] {\n    width: 29px;\n    height: 29px;\n    border-radius: 9px;\n    font-size: 22px;\n  }\n  .header-actions[_ngcontent-%COMP%] {\n    gap: 6px;\n  }\n  .button-small[_ngcontent-%COMP%] {\n    font-size: 11px;\n    padding: 10px 12px;\n    gap: 6px;\n  }\n  .button-small[_ngcontent-%COMP%]   ng-icon[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .hero[_ngcontent-%COMP%] {\n    padding-top: 40px;\n  }\n  h1[_ngcontent-%COMP%] {\n    font-size: 39px;\n    letter-spacing: -1.7px;\n  }\n  .hero-description[_ngcontent-%COMP%] {\n    font-size: 15px;\n  }\n  .eyebrow[_ngcontent-%COMP%] {\n    font-size: 9px;\n    letter-spacing: 1.3px;\n  }\n  .hero-actions[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n    gap: 19px;\n  }\n  .preview-stage[_ngcontent-%COMP%] {\n    padding: 20px 12px 42px;\n    border-radius: 20px;\n  }\n  .floating-note[_ngcontent-%COMP%] {\n    right: 5px;\n    bottom: 15px;\n  }\n  .preview-tabs[_ngcontent-%COMP%] {\n    gap: 9px;\n    padding-inline: 12px;\n    font-size: 7px;\n  }\n  .preview-patient[_ngcontent-%COMP%], \n   .preview-body[_ngcontent-%COMP%] {\n    padding-inline: 12px;\n  }\n  .preview-label[_ngcontent-%COMP%] {\n    font-size: 7px;\n  }\n  .feature-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n  .feature-card[_ngcontent-%COMP%] {\n    padding: 23px;\n  }\n  .feature-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    margin-top: 16px;\n  }\n  .section-space[_ngcontent-%COMP%] {\n    padding-block: 48px;\n  }\n  .workflow[_ngcontent-%COMP%] {\n    padding: 27px 24px;\n  }\n  .step[_ngcontent-%COMP%] {\n    gap: 15px;\n  }\n  .closing[_ngcontent-%COMP%] {\n    padding: 38px 20px;\n  }\n  .closing[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 30px;\n  }\n  .landing-footer[_ngcontent-%COMP%] {\n    gap: 10px;\n    padding-block: 25px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .button[_ngcontent-%COMP%] {\n    transition: none;\n  }\n  .button[_ngcontent-%COMP%]:hover {\n    transform: none;\n  }\n}\n/*# sourceMappingURL=landing.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LandingComponent, [{
    type: Component,
    args: [{ selector: "app-landing", imports: [RouterLink, NgIcon, ThemeToggleComponent], providers: [
      provideIcons({
        lucideArrowRight,
        lucideCheck,
        lucideUsers,
        lucideClipboardList,
        lucideSlidersHorizontal,
        lucideFileText,
        lucideFolderOpen,
        lucideActivity,
        lucidePlus,
        lucideStethoscope
      })
    ], changeDetection: ChangeDetectionStrategy.OnPush, template: '<a class="skip-link" href="#contenido">Ir al contenido</a>\n<header class="landing-header">\n  <div class="header-inner">\n    <a routerLink="/" class="brand" aria-label="DoctorChart, inicio"\n      ><span class="brand-mark"><img class="doctorchart-logo" src="/doctorchart-logo.svg" width="35" height="35" alt="" aria-hidden="true" /></span>DoctorChart</a\n    >\n    <nav aria-label="Navegaci\xF3n de presentaci\xF3n">\n      <a href="#funciones">Funciones</a><a href="#como-funciona">C\xF3mo funciona</a\n      ><a href="#preguntas">Preguntas frecuentes</a>\n    </nav>\n    <div class="header-actions">\n      <app-theme-toggle /><a routerLink="/login" class="button button-small"\n        >Iniciar sesi\xF3n <ng-icon name="lucideArrowRight"\n      /></a>\n    </div>\n  </div>\n</header>\n<main id="contenido">\n  <section class="hero section-width" aria-labelledby="hero-title">\n    <div class="hero-copy">\n      <span class="eyebrow"><span class="status-dot"></span> TU ESPACIO CL\xCDNICO DIGITAL</span>\n      <h1 id="hero-title">Historias cl\xEDnicas digitales.<br /><span>Tus pacientes, en un mismo lugar.</span></h1>\n      <p class="hero-description">\n        Registr\xE1 consultas, organiz\xE1 la informaci\xF3n de cada paciente y personaliz\xE1 tus fichas\n        cl\xEDnicas. DoctorChart acompa\xF1a tu trabajo en cada atenci\xF3n.\n      </p>\n      <div class="hero-actions">\n        <a routerLink="/login" class="button"\n          >Ingresar a DoctorChart <ng-icon name="lucideArrowRight" /></a\n        ><a href="#funciones" class="text-link"\n          >Conoc\xE9 las funciones <span aria-hidden="true">\u2197</span></a\n        >\n      </div>\n      <div class="hero-note">\n        <ng-icon name="lucideStethoscope" /> Pensado para profesionales de la salud\n      </div>\n    </div>\n    <div class="preview-stage">\n      <div class="preview-label">\n        <span class="status-dot"></span> UNA MIRADA A TU ESPACIO DE TRABAJO\n      </div>\n      <div\n        class="record-preview"\n        role="img"\n        aria-label="Ejemplo ilustrativo de una ficha con datos del paciente, historia cl\xEDnica, recetas y estudios. Datos ficticios."\n      >\n        <div class="preview-topbar">\n          <span class="preview-brand"><img class="doctorchart-logo" src="/doctorchart-logo.svg" width="35" height="35" alt="" aria-hidden="true" /> DoctorChart</span\n          ><span class="example-pill">EJEMPLO</span>\n        </div>\n        <div class="preview-breadcrumb">Pacientes <span>/</span> Ficha del paciente</div>\n        <div class="preview-patient">\n          <div class="avatar">PE</div>\n          <div>\n            <strong>Paciente de ejemplo</strong><span>Ficha cl\xEDnica \xB7 Datos ficticios</span>\n          </div>\n          <ng-icon name="lucideClipboardList" />\n        </div>\n        <div class="preview-tabs">\n          <span>Datos del paciente</span><span class="active">Historia cl\xEDnica</span\n          ><span>Recetas</span><span>Estudios</span>\n        </div>\n        <div class="preview-body">\n          <div class="preview-section-title">\n            <strong>Historia cl\xEDnica</strong\n            ><span class="preview-add"><ng-icon name="lucidePlus" /> Consulta</span>\n          </div>\n          <div class="preview-encounter">\n            <div class="encounter-marker"><ng-icon name="lucideStethoscope" /></div>\n            <div class="encounter-content">\n              <span class="preview-date">14/10/2026</span><strong>Consulta de seguimiento</strong>\n              <p>Registro de evoluci\xF3n del paciente</p>\n              <div class="record-lines"><i></i><i></i></div>\n            </div>\n          </div>\n          <div class="preview-encounter previous">\n            <div class="encounter-marker"><ng-icon name="lucideClipboardList" /></div>\n            <div class="encounter-content">\n              <span class="preview-date">02/10/2026</span><strong>Primera consulta</strong>\n              <p>Antecedentes y motivo de consulta</p>\n            </div>\n          </div>\n        </div>\n        <div class="preview-footer">\n          <ng-icon name="lucideFolderOpen" /> Informaci\xF3n y seguimiento en la ficha del paciente\n        </div>\n      </div>\n      <div class="floating-note">\n        <span class="floating-icon"><ng-icon name="lucideCheck" /></span>\n        <div>\n          <strong>Tu forma de trabajar</strong><span>Fichas y consultas personalizables</span>\n        </div>\n      </div>\n      <p class="preview-disclaimer">Vista ilustrativa con datos ficticios.</p>\n    </div>\n  </section>\n  <div class="intro-strip">\n    <div class="section-width">\n      <span>Del primer registro al seguimiento.</span>\n      <p>La informaci\xF3n cl\xEDnica, organizada alrededor del paciente.</p>\n    </div>\n  </div>\n  <section\n    id="funciones"\n    class="features section-width section-space"\n    aria-labelledby="features-title"\n  >\n    <div class="section-heading">\n      <span class="eyebrow">HERRAMIENTAS PARA TU D\xCDA A D\xCDA</span>\n      <h2 id="features-title">M\xE1s orden en cada consulta.</h2>\n      <p>Conoc\xE9 lo que pod\xE9s hacer dentro de DoctorChart.</p>\n    </div>\n    <div class="feature-grid">\n      @for (feature of features; track feature.title) {\n        <article class="feature-card">\n          <span class="feature-icon"><ng-icon [name]="feature.icon" /></span>\n          <h3>{{ feature.title }}</h3>\n          <p>{{ feature.description }}</p>\n        </article>\n      }\n    </div>\n    <p class="module-note">\n      Los m\xF3dulos disponibles dependen de tu especialidad y de la configuraci\xF3n de tu espacio\n      cl\xEDnico.\n    </p>\n  </section>\n  <section id="como-funciona" class="workflow section-width" aria-labelledby="workflow-title">\n    <div class="workflow-intro">\n      <span class="eyebrow">C\xD3MO FUNCIONA</span>\n      <h2 id="workflow-title">Un espacio que se adapta<br />a tu pr\xE1ctica.</h2>\n      <p>\n        Empez\xE1 por tu especialidad. Despu\xE9s, constru\xED la historia cl\xEDnica de cada paciente, consulta\n        a consulta.\n      </p>\n      <a routerLink="/login" class="text-link"\n        >Ir a iniciar sesi\xF3n <ng-icon name="lucideArrowRight"\n      /></a>\n    </div>\n    <div class="steps">\n      @for (step of steps; track step.number) {\n        <article class="step">\n          <span class="step-number">{{ step.number }}</span>\n          <div>\n            <h3>{{ step.title }}</h3>\n            <p>{{ step.description }}</p>\n          </div>\n        </article>\n      }\n    </div>\n  </section>\n  <section id="preguntas" class="faq section-width section-space" aria-labelledby="faq-title">\n    <div class="section-heading">\n      <span class="eyebrow">ANTES DE EMPEZAR</span>\n      <h2 id="faq-title">Preguntas frecuentes.</h2>\n    </div>\n    <div class="faq-list">\n      @for (faq of faqs; track faq.question) {\n        <details>\n          <summary>{{ faq.question }}<span class="faq-plus" aria-hidden="true">+</span></summary>\n          <p>{{ faq.answer }}</p>\n        </details>\n      }\n    </div>\n  </section>\n  <section class="closing section-width">\n    <span class="eyebrow">DOCTORCHART</span>\n    <h2>Tu pr\xF3xima consulta,<br />con la historia a mano.</h2>\n    <p>Ingres\xE1 a tu espacio cl\xEDnico y continu\xE1 el seguimiento de tus pacientes.</p>\n    <a routerLink="/login" class="button">Iniciar sesi\xF3n <ng-icon name="lucideArrowRight" /></a>\n  </section>\n</main>\n<footer class="landing-footer section-width">\n  <a routerLink="/" class="brand"\n    ><span class="brand-mark"><img class="doctorchart-logo" src="/doctorchart-logo.svg" width="35" height="35" alt="" aria-hidden="true" /></span>DoctorChart</a\n  ><span>Un espacio para tu pr\xE1ctica cl\xEDnica.</span\n  ><a routerLink="/login">Iniciar sesi\xF3n <span aria-hidden="true">\u2197</span></a>\n</footer>\n', styles: ["/* src/app/features/landing/landing.component.css */\n:host {\n  display: block;\n  --ink: var(--md-sys-color-on-surface, #172b2e);\n  --muted: var(--md-sys-color-on-surface-variant, #526568);\n  --teal: var(--md-sys-color-primary, #006874);\n  --soft: var(--md-sys-color-surface-container-low, #f0f7f7);\n  --surface: var(--md-sys-color-surface, #fff);\n  --line: var(--md-sys-color-outline-variant, #d8e4e5);\n  color: var(--ink);\n  background: var(--surface);\n  font-family: var(--font-sans);\n}\n* {\n  box-sizing: border-box;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\nng-icon {\n  flex-shrink: 0;\n}\na:focus-visible,\nsummary:focus-visible {\n  outline: 3px solid var(--teal);\n  outline-offset: 5px;\n  border-radius: 5px;\n}\n.section-width {\n  width: min(1160px, calc(100% - 80px));\n  margin-inline: auto;\n}\n.skip-link {\n  position: fixed;\n  top: -80px;\n  left: 20px;\n  z-index: 100;\n  padding: 12px 20px;\n  background: var(--surface);\n  color: var(--teal);\n}\n.skip-link:focus {\n  top: 15px;\n}\n.landing-header {\n  border-bottom: 1px solid var(--line);\n  background: var(--surface);\n}\n.header-inner {\n  width: min(1320px, calc(100% - 64px));\n  margin: auto;\n  min-height: 88px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 28px;\n}\n.brand {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 22px;\n  font-weight: 750;\n  letter-spacing: -0.8px;\n}\n.brand-mark {\n  width: 35px;\n  height: 35px;\n  border-radius: 11px;\n  background: #ffffff;\n  display: grid;\n  place-items: center;\n  font-size: 25px;\n}\n.brand-mark .doctorchart-logo {\n  width: 100%;\n  height: 100%;\n}\nnav {\n  display: flex;\n  gap: 28px;\n  font-size: 13px;\n  color: var(--muted);\n}\nnav a:hover,\n.text-link:hover {\n  color: var(--teal);\n}\n.header-actions {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n.button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 14px;\n  background: var(--teal);\n  color: var(--md-sys-color-on-primary, white);\n  border: 1px solid var(--teal);\n  padding: 16px 24px;\n  border-radius: 100px;\n  font-size: 14px;\n  font-weight: 600;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.button:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 5px 18px color-mix(in srgb, var(--teal) 18%, transparent);\n}\n.button ng-icon {\n  font-size: 18px;\n}\n.button-small {\n  font-size: 13px;\n  padding: 11px 19px;\n}\n.hero {\n  display: grid;\n  grid-template-columns: 1.05fr 1fr;\n  align-items: center;\n  gap: 68px;\n  padding-block: 88px 80px;\n}\n.eyebrow {\n  font-size: 10px;\n  letter-spacing: 1.8px;\n  font-weight: 750;\n  color: var(--teal);\n  display: inline-flex;\n  gap: 9px;\n  align-items: center;\n}\n.status-dot {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: var(--teal);\n  display: inline-block;\n}\nh1 {\n  font-size: clamp(38px, 4.2vw, 56px);\n  line-height: 1.12;\n  font-weight: 650;\n  letter-spacing: -2.6px;\n  margin: 23px 0;\n}\nh1 span {\n  color: var(--teal);\n}\n.hero-description {\n  font-size: 16px;\n  color: var(--muted);\n  line-height: 1.8;\n  max-width: 465px;\n}\n.hero-actions {\n  margin-top: 30px;\n  display: flex;\n  align-items: center;\n  gap: 24px;\n  flex-wrap: wrap;\n}\n.text-link {\n  font-size: 13px;\n  font-weight: 650;\n  display: inline-flex;\n  align-items: center;\n  gap: 9px;\n}\n.hero-note {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 11px;\n  color: var(--muted);\n  margin-top: 23px;\n}\n.hero-note ng-icon {\n  color: var(--teal);\n  font-size: 16px;\n}\n.preview-stage {\n  position: relative;\n  padding: 26px 23px 36px;\n  border-radius: 28px;\n  background:\n    radial-gradient(\n      ellipse at 80% 10%,\n      color-mix(in srgb, var(--teal) 12%, var(--surface)),\n      var(--soft) 75%);\n}\n.preview-label {\n  font-size: 8px;\n  letter-spacing: 1.3px;\n  color: var(--teal);\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  margin: 0 0 19px 5px;\n}\n.record-preview {\n  border: 1px solid var(--line);\n  border-radius: 13px;\n  background: var(--surface);\n  overflow: hidden;\n  box-shadow: 0 18px 45px color-mix(in srgb, var(--ink) 8%, transparent);\n}\n.preview-topbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 15px 18px;\n  border-bottom: 1px solid var(--line);\n}\n.preview-brand {\n  font-size: 12px;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.preview-brand .doctorchart-logo {\n  width: 24px;\n  height: 24px;\n}\n.example-pill {\n  font-size: 7px;\n  letter-spacing: 1px;\n  border: 1px solid var(--line);\n  padding: 4px 7px;\n  border-radius: 4px;\n  color: var(--muted);\n}\n.preview-breadcrumb {\n  color: var(--muted);\n  font-size: 8px;\n  padding: 17px 18px 0;\n}\n.preview-breadcrumb span {\n  margin: 0 7px;\n}\n.preview-patient {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 17px 18px;\n}\n.avatar {\n  height: 37px;\n  width: 37px;\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  background: var(--soft);\n  color: var(--teal);\n  font-size: 12px;\n  font-weight: 700;\n}\n.preview-patient strong {\n  font-size: 13px;\n  display: block;\n}\n.preview-patient div span {\n  display: block;\n  font-size: 8px;\n  margin-top: 4px;\n  color: var(--muted);\n}\n.preview-patient > ng-icon {\n  margin-left: auto;\n  color: var(--teal);\n}\n.preview-tabs {\n  padding: 0 18px;\n  display: flex;\n  gap: 17px;\n  font-size: 8px;\n  color: var(--muted);\n  border-bottom: 1px solid var(--line);\n}\n.preview-tabs span {\n  padding: 8px 0 10px;\n  white-space: nowrap;\n}\n.preview-tabs .active {\n  color: var(--teal);\n  border-bottom: 2px solid var(--teal);\n  font-weight: 700;\n}\n.preview-body {\n  padding: 18px;\n}\n.preview-section-title {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-size: 10px;\n  margin-bottom: 17px;\n}\n.preview-add {\n  color: var(--teal);\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 8px;\n  background: var(--soft);\n  padding: 6px 8px;\n  border-radius: 5px;\n}\n.preview-encounter {\n  display: flex;\n  gap: 11px;\n}\n.encounter-marker {\n  color: var(--teal);\n  background: var(--soft);\n  border: 1px solid var(--line);\n  height: 27px;\n  width: 27px;\n  border-radius: 8px;\n  display: grid;\n  place-items: center;\n  font-size: 14px;\n}\n.encounter-content {\n  flex: 1;\n  padding-bottom: 15px;\n}\n.preview-date {\n  font-size: 7px;\n  color: var(--muted);\n  display: block;\n  margin-bottom: 5px;\n}\n.encounter-content strong {\n  display: block;\n  font-size: 10px;\n}\n.encounter-content p {\n  font-size: 8px;\n  color: var(--muted);\n  margin-top: 5px;\n}\n.record-lines {\n  display: grid;\n  gap: 5px;\n  margin-top: 11px;\n}\n.record-lines i {\n  height: 4px;\n  background: var(--soft);\n  border-radius: 5px;\n  width: 90%;\n}\n.record-lines i:last-child {\n  width: 65%;\n}\n.previous {\n  padding-top: 12px;\n  border-top: 1px solid var(--line);\n}\n.previous .encounter-content {\n  padding-bottom: 0;\n}\n.preview-footer {\n  background: var(--soft);\n  border-top: 1px solid var(--line);\n  padding: 11px 18px;\n  font-size: 7px;\n  color: var(--muted);\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.floating-note {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  position: absolute;\n  bottom: 19px;\n  right: -15px;\n  padding: 13px 17px;\n  border-radius: 12px;\n  border: 1px solid var(--line);\n  background: var(--surface);\n  box-shadow: 0 8px 25px color-mix(in srgb, var(--ink) 9%, transparent);\n}\n.floating-icon {\n  display: grid;\n  place-items: center;\n  height: 29px;\n  width: 29px;\n  border-radius: 50%;\n  background: var(--soft);\n  color: var(--teal);\n}\n.floating-note strong {\n  font-size: 10px;\n  display: block;\n}\n.floating-note div span {\n  font-size: 8px;\n  display: block;\n  color: var(--muted);\n  margin-top: 4px;\n}\n.preview-disclaimer {\n  font-size: 8px;\n  color: var(--muted);\n  position: absolute;\n  bottom: -23px;\n  left: 0;\n}\n.intro-strip {\n  border-block: 1px solid var(--line);\n}\n.intro-strip > div {\n  display: flex;\n  justify-content: space-between;\n  gap: 20px;\n  align-items: center;\n  padding-block: 22px;\n}\n.intro-strip span {\n  font-size: 13px;\n  font-weight: 650;\n}\n.intro-strip p {\n  font-size: 12px;\n  color: var(--muted);\n  margin: 0;\n}\n.section-space {\n  padding-block: 80px;\n}\nsection[id] {\n  scroll-margin-top: 24px;\n}\n.section-heading {\n  margin-bottom: 36px;\n}\nh2 {\n  font-size: clamp(28px, 3vw, 37px);\n  letter-spacing: -1.2px;\n  font-weight: 600;\n  line-height: 1.2;\n  margin: 15px 0;\n}\n.section-heading > p,\n.workflow-intro > p {\n  font-size: 14px;\n  line-height: 1.8;\n  color: var(--muted);\n}\n.feature-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 18px;\n}\n.feature-card {\n  border: 1px solid var(--line);\n  border-radius: 18px;\n  padding: 27px;\n}\n.feature-icon {\n  width: 42px;\n  height: 42px;\n  border-radius: 12px;\n  display: grid;\n  place-items: center;\n  color: var(--teal);\n  background: var(--soft);\n  font-size: 22px;\n}\nh3 {\n  font-size: 16px;\n  font-weight: 650;\n  margin: 21px 0 10px;\n  letter-spacing: -0.3px;\n}\n.feature-card p,\n.step p {\n  font-size: 13px;\n  line-height: 1.8;\n  color: var(--muted);\n  margin: 0;\n}\n.module-note {\n  font-size: 11px;\n  color: var(--muted);\n  margin: 20px 0 0;\n}\n.workflow {\n  border-radius: 25px;\n  background: var(--soft);\n  padding: 48px;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 65px;\n}\n.workflow-intro > p {\n  max-width: 340px;\n}\n.workflow-intro .text-link {\n  color: var(--teal);\n  margin-top: 20px;\n}\n.steps {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.step {\n  display: flex;\n  align-items: flex-start;\n  gap: 20px;\n  padding-block: 22px;\n}\n.step + .step {\n  border-top: 1px solid var(--line);\n}\n.step-number {\n  color: var(--teal);\n  font-size: 12px;\n  font-weight: 700;\n  padding-top: 3px;\n}\n.step h3 {\n  margin: 0 0 8px;\n}\n.faq {\n  display: grid;\n  grid-template-columns: 0.8fr 1.2fr;\n  gap: 60px;\n}\n.faq-list details {\n  border-bottom: 1px solid var(--line);\n  padding: 20px 0;\n}\n.faq-list details:first-child {\n  padding-top: 8px;\n}\nsummary {\n  list-style: none;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 15px;\n  font-size: 14px;\n  font-weight: 600;\n}\nsummary::-webkit-details-marker {\n  display: none;\n}\n.faq-plus {\n  font-size: 23px;\n  font-weight: 400;\n  color: var(--teal);\n}\ndetails[open] .faq-plus {\n  transform: rotate(45deg);\n}\n.faq-list p {\n  color: var(--muted);\n  font-size: 13px;\n  line-height: 1.8;\n  margin: 15px 30px 0 0;\n}\n.closing {\n  padding: 55px 30px;\n  text-align: center;\n  background: var(--soft);\n  border: 1px solid var(--line);\n  border-radius: 25px;\n}\n.closing h2 {\n  font-size: 39px;\n}\n.closing p {\n  color: var(--muted);\n  font-size: 14px;\n  line-height: 1.7;\n  margin-bottom: 25px;\n}\n.landing-footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 24px;\n  padding-block: 38px;\n  margin-top: 25px;\n}\n.landing-footer .brand {\n  font-size: 18px;\n}\n.landing-footer .brand-mark {\n  height: 28px;\n  width: 28px;\n  font-size: 20px;\n}\n.landing-footer > span,\n.landing-footer > a:last-child {\n  font-size: 11px;\n  color: var(--muted);\n}\n@media (min-width: 1450px) {\n  .hero {\n    padding-block: 110px;\n  }\n}\n@media (max-width: 1050px) {\n  nav {\n    gap: 16px;\n  }\n  .header-inner {\n    gap: 15px;\n  }\n  .hero {\n    gap: 35px;\n  }\n  h1 {\n    font-size: 44px;\n  }\n  .hero-actions {\n    gap: 16px;\n  }\n  .preview-tabs {\n    gap: 10px;\n  }\n  .workflow {\n    gap: 35px;\n    padding: 35px;\n  }\n}\n@media (max-width: 850px) {\n  nav {\n    display: none;\n  }\n  .hero {\n    grid-template-columns: 1fr;\n    gap: 45px;\n    padding-block: 55px 65px;\n  }\n  .hero-copy {\n    max-width: 600px;\n  }\n  h1 {\n    font-size: 52px;\n  }\n  .hero-description {\n    max-width: 540px;\n  }\n  .preview-stage {\n    max-width: 520px;\n    width: 100%;\n    margin-inline: auto;\n  }\n  .feature-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .intro-strip > div {\n    align-items: flex-start;\n    flex-direction: column;\n    gap: 8px;\n  }\n  .faq {\n    grid-template-columns: 1fr;\n    gap: 0;\n  }\n  .workflow {\n    grid-template-columns: 1fr;\n    gap: 15px;\n  }\n  .workflow-intro > p {\n    max-width: 100%;\n  }\n  .section-space {\n    padding-block: 60px;\n  }\n  .landing-footer > span {\n    display: none;\n  }\n}\n@media (max-width: 520px) {\n  .section-width {\n    width: calc(100% - 36px);\n  }\n  .header-inner {\n    width: calc(100% - 32px);\n    min-height: 74px;\n    gap: 8px;\n  }\n  .brand {\n    font-size: 18px;\n    gap: 7px;\n  }\n  .brand-mark {\n    width: 29px;\n    height: 29px;\n    border-radius: 9px;\n    font-size: 22px;\n  }\n  .header-actions {\n    gap: 6px;\n  }\n  .button-small {\n    font-size: 11px;\n    padding: 10px 12px;\n    gap: 6px;\n  }\n  .button-small ng-icon {\n    display: none;\n  }\n  .hero {\n    padding-top: 40px;\n  }\n  h1 {\n    font-size: 39px;\n    letter-spacing: -1.7px;\n  }\n  .hero-description {\n    font-size: 15px;\n  }\n  .eyebrow {\n    font-size: 9px;\n    letter-spacing: 1.3px;\n  }\n  .hero-actions {\n    align-items: flex-start;\n    flex-direction: column;\n    gap: 19px;\n  }\n  .preview-stage {\n    padding: 20px 12px 42px;\n    border-radius: 20px;\n  }\n  .floating-note {\n    right: 5px;\n    bottom: 15px;\n  }\n  .preview-tabs {\n    gap: 9px;\n    padding-inline: 12px;\n    font-size: 7px;\n  }\n  .preview-patient,\n  .preview-body {\n    padding-inline: 12px;\n  }\n  .preview-label {\n    font-size: 7px;\n  }\n  .feature-grid {\n    grid-template-columns: 1fr;\n    gap: 12px;\n  }\n  .feature-card {\n    padding: 23px;\n  }\n  .feature-card h3 {\n    margin-top: 16px;\n  }\n  .section-space {\n    padding-block: 48px;\n  }\n  .workflow {\n    padding: 27px 24px;\n  }\n  .step {\n    gap: 15px;\n  }\n  .closing {\n    padding: 38px 20px;\n  }\n  .closing h2 {\n    font-size: 30px;\n  }\n  .landing-footer {\n    gap: 10px;\n    padding-block: 25px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .button {\n    transition: none;\n  }\n  .button:hover {\n    transform: none;\n  }\n}\n/*# sourceMappingURL=landing.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LandingComponent, { className: "LandingComponent", filePath: "src/app/features/landing/landing.component.ts", lineNumber: 39 });
})();
export {
  LandingComponent
};
//# debugId=b94e81e3-7b75-54bc-8e0b-7fce007ef866
//# sourceMappingURL=chunk-TV7TBR5E.js.map
