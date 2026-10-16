import { ChangeDetectionStrategy, Component } from '@angular/core';
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
      title: 'Configurá tu espacio',
      description: 'Seleccioná tu especialidad y adaptá tus fichas y formularios de consulta.',
    },
    {
      number: '02',
      title: 'Registrá tus pacientes',
      description: 'Creá sus fichas con la información que necesitás para la atención.',
    },
    {
      number: '03',
      title: 'Dale continuidad a la atención',
      description:
        'Agregá consultas y volvé al historial, los documentos y los estudios de cada paciente.',
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
        'Desde Iniciar sesión podés acceder con tu cuenta de ByCode, por correo y contraseña o con Google. También podés crear una cuenta. Para entrar al espacio clínico necesitás un plan DoctorChart activo; crear la cuenta no activa un plan por sí solo.',
    },
  ];
}
