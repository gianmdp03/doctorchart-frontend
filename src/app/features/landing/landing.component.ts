import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideCheck,
  lucideUsers,
  lucideClipboardList,
  lucideSlidersHorizontal,
  lucideFileText,
  lucideFolderOpen,
  lucideActivity,
  lucidePlus,
  lucideStethoscope,
} from '@ng-icons/lucide';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import site from '../../core/config/site.config.json';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, NgIcon, ThemeToggleComponent],
  providers: [
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
      lucideStethoscope,
    }),
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  readonly themeService = inject(ThemeService);
  readonly bycodeUrl = site.applicationUrls.bycode;
  readonly plansUrl = new URL('/pricing', this.bycodeUrl).href;
  readonly contactUrl = new URL('/#bc-contact', this.bycodeUrl).href;
  readonly supportUrl = new URL('/support', this.bycodeUrl).href;
  readonly registerUrl = new URL('/register', this.bycodeUrl).href;
  readonly productViews = [
    {
      key: 'growth',
      title: 'La evolución, a la vista',
      description: 'Consultá las mediciones y las curvas de crecimiento desde la ficha del paciente.',
      alt: 'Captura de DoctorChart: curva de peso para la edad con mediciones ficticias de un paciente de demostración.',
      height: 532,
    },
    {
      key: 'vaccines',
      title: 'El calendario de vacunas',
      description: 'Revisá el calendario y registrá las vacunas aplicadas en las especialidades que incluyen este módulo.',
      alt: 'Captura de DoctorChart: calendario de vacunación de Paciente Demo, con registros ficticios.',
      height: 447,
    },
  ];
  readonly features = [
    {
      icon: 'lucideUsers',
      title: 'Cada paciente, su ficha',
      description:
        'Registrá pacientes, buscá en tu directorio y consultá sus datos desde una ficha individual.',
    },
    {
      icon: 'lucideClipboardList',
      title: 'Una historia que continúa',
      description:
        'Documentá consultas y revisá los registros anteriores para seguir la historia clínica de cada paciente.',
    },
    {
      icon: 'lucideSlidersHorizontal',
      title: 'Fichas a tu medida',
      description:
        'Seleccioná tu especialidad y personalizá las categorías y campos de tus fichas y consultas.',
    },
    {
      icon: 'lucideFileText',
      title: 'Recetas y órdenes',
      description:
        'Prepará recetas y órdenes de estudios, guardalas en el historial e imprimilas desde la ficha.',
    },
    {
      icon: 'lucideFolderOpen',
      title: 'Estudios en su lugar',
      description:
        'Adjuntá PDFs e imágenes a la ficha del paciente para consultar y descargar sus estudios.',
    },
    {
      icon: 'lucideActivity',
      title: 'Seguimiento clínico',
      description:
        'Registrá vacunas y consultá la evolución y las curvas en las especialidades que tienen estos módulos disponibles.',
    },
  ];
  readonly steps = [
    {
      number: '01',
      title: 'Encontrá a tu paciente',
      description: 'Buscá su ficha y consultá sus antecedentes antes de empezar la atención.',
    },
    {
      number: '02',
      title: 'Registrá la consulta',
      description: 'Documentá el motivo, la evolución y las indicaciones con los campos de tu especialidad.',
    },
    {
      number: '03',
      title: 'Consultá sus estudios',
      description:
        'Reuní los PDFs e imágenes en su ficha y volvé a ellos cuando los necesites.',
    },
    {
      number: '04',
      title: 'Continuá el seguimiento',
      description: 'Revisá las consultas anteriores y registrá la fecha del próximo control.',
    },
  ];
  readonly faqs = [
    {
      question: '¿Para quién es DoctorChart?',
      answer:
        'DoctorChart es un espacio de trabajo para profesionales de la salud que necesitan organizar fichas de pacientes y registrar su atención clínica.',
    },
    {
      question: '¿Puedo personalizar las fichas?',
      answer:
        'Sí. Podés seleccionar tu especialidad y configurar las categorías y los campos que usás en las fichas y consultas.',
    },
    {
      question: '¿Todas las especialidades tienen los mismos módulos?',
      answer:
        'Los módulos disponibles dependen de la especialidad y de la configuración de tu espacio. Vacunación y curvas de evolución se muestran cuando corresponden a esa configuración.',
    },
    {
      question: '¿Cómo ingreso?',
      answer:
        'Ingresá con el correo y la contraseña de tu cuenta de Bycode. Si todavía no tenés una, podés crearla en Bycode. Para entrar al espacio clínico necesitás un plan DoctorChart activo; crear la cuenta no activa un plan por sí solo.',
    },
    {
      question: '¿Dónde contrato el plan y gestiono mi cuenta?',
      answer:
        'DoctorChart forma parte del ecosistema Bycode. Allí creás tu cuenta, consultás los planes y administrás tu suscripción. Después ingresás a DoctorChart con la misma cuenta para trabajar con tus pacientes.',
    },
    {
      question: '¿Dónde puedo pedir ayuda?',
      answer:
        'El soporte se gestiona desde Bycode: con tu cuenta podés crear un ticket y seguir la respuesta. Si todavía estás evaluando DoctorChart, encontrás los canales del equipo en Contacto en Bycode.',
    },
  ];
}
