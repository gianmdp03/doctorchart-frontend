---
name: DoctorChart
description: "Sistema visual implementado para el trabajo clínico y las reservas."
colors:
  dc-brand: "#08767b"
  dc-brand-hover: "#06686d"
  dc-brand-soft: "#e5f4f1"
  dc-brand-ink: "#08666a"
  dc-blue: "#285cd6"
  dc-blue-soft: "#edf2ff"
  dc-canvas: "#f3f6f8"
  dc-paper: "#ffffff"
  dc-subtle: "#f7f9fa"
  dc-raised: "#edf2f5"
  dc-text: "#19313f"
  dc-text-secondary: "#4f6471"
  dc-text-muted: "#5f7380"
  dc-line: "#dce5ea"
  dc-control-line: "#93a5af"
  dc-danger: "#b63245"
  dc-danger-soft: "#fff0f1"
  dc-positive: "#16744d"
  dc-positive-soft: "#e8f5ed"
  dc-caution: "#865a13"
  dc-caution-soft: "#fff5df"
  dc-violet: "#7051a4"
  dc-violet-soft: "#f1edfa"
  dc-pink: "#a63f6c"
  dc-pink-soft: "#fbeef4"
  dc-on-brand: "#ffffff"
  dc-scrim: "rgb(16 35 47 / 46%)"
  dc-brand-dark: "#79d5cd"
  dc-brand-hover-dark: "#a1e3dd"
  dc-brand-soft-dark: "#173d3e"
  dc-brand-ink-dark: "#91dfd7"
  dc-blue-dark: "#a5c0ff"
  dc-blue-soft-dark: "#203650"
  dc-canvas-dark: "#101c23"
  dc-paper-dark: "#182830"
  dc-subtle-dark: "#14232b"
  dc-raised-dark: "#21343d"
  dc-text-dark: "#e6eef1"
  dc-text-secondary-dark: "#bbcbd2"
  dc-text-muted-dark: "#a1b5bf"
  dc-line-dark: "#344a55"
  dc-control-line-dark: "#748e9c"
  dc-danger-dark: "#ffb3bd"
  dc-danger-soft-dark: "#452b34"
  dc-positive-dark: "#96d7b0"
  dc-positive-soft-dark: "#203d31"
  dc-caution-dark: "#f2ce85"
  dc-caution-soft-dark: "#413621"
  dc-violet-dark: "#d0b9f6"
  dc-violet-soft-dark: "#342d46"
  dc-pink-dark: "#f2b3ce"
  dc-pink-soft-dark: "#432e3c"
  dc-on-brand-dark: "#102c30"
  dc-scrim-dark: "rgb(0 9 15 / 68%)"
typography:
  display:
    fontFamily: "'Google Sans', sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.16
    letterSpacing: "-.035em"
  headline:
    fontFamily: "'Google Sans', sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-.03em"
  title:
    fontFamily: "'Google Sans', sans-serif"
    fontSize: "1rem"
    fontWeight: 650
    lineHeight: 1.5
  body:
    fontFamily: "'Google Sans', sans-serif"
    fontSize: ".9375rem"
    lineHeight: 1.55
  label:
    fontFamily: "'Google Sans', sans-serif"
    fontSize: ".8125rem"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  dc-radius-sm: "6px"
  dc-radius-control: "10px"
  dc-radius-card: "16px"
  dc-radius-pill: "999px"
spacing:
  dc-space-1: ".25rem"
  dc-space-2: ".5rem"
  dc-space-3: ".75rem"
  dc-space-4: "1rem"
  dc-space-5: "1.25rem"
  dc-space-6: "1.5rem"
  dc-space-8: "2rem"
  dc-space-10: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.dc-brand}"
    textColor: "{colors.dc-on-brand}"
    rounded: "{rounded.dc-radius-control}"
    padding: ".625rem 1rem"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.dc-brand-hover}"
  button-secondary:
    backgroundColor: "{colors.dc-paper}"
    textColor: "{colors.dc-text}"
    rounded: "{rounded.dc-radius-control}"
    padding: ".625rem 1rem"
    height: "44px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.dc-brand-ink}"
    rounded: "{rounded.dc-radius-control}"
    padding: ".625rem 1rem"
    height: "44px"
  clinical-field:
    backgroundColor: "{colors.dc-paper}"
    textColor: "{colors.dc-text}"
    rounded: "{rounded.dc-radius-control}"
    padding: "11px 12px"
  navigation-active:
    backgroundColor: "{colors.dc-brand-soft}"
    textColor: "{colors.dc-brand-ink}"
    rounded: "{rounded.dc-radius-control}"
    padding: "10px 12px"
  status-chip:
    backgroundColor: "{colors.dc-raised}"
    textColor: "{colors.dc-text}"
    rounded: "{rounded.dc-radius-pill}"
    padding: "4px 8px"
  panel:
    backgroundColor: "{colors.dc-paper}"
    textColor: "{colors.dc-text}"
    rounded: "{rounded.dc-radius-card}"
    padding: "{spacing.dc-space-6}"
---

# Design System: DoctorChart

## Overview

**Creative North Star: "Espacio clínico"**

Interfaz clínica precisa y tranquila: fondo gris azulado, superficies de lectura separadas por bordes suaves y acciones teal. La misma familia tipográfica sirve a navegación, datos y formularios; el tema oscuro conserva las funciones semánticas de cada color.

El trabajo operativo domina la aplicación y las reservas. La superficie `/professionals` adopta el modo Persuade definido en el brief. Este documento describe código existente; no constituye una aprobación visual ni una certificación de cobertura.

**Key Characteristics:**

- Superficies neutrales con acciones y selección teal.
- Tipografía única con escala en rem y ajuste de tamaño de letra.
- Contexto clínico visible, formularios por categorías y estados con texto.

## Colors

Los tokens `dc-*` del frontmatter corresponden a `src/design-tokens.css`; sus pares `*-dark` registran las sustituciones de `:root.dark`, no una paleta adicional.

### Primary

Teal para acciones principales, selección y resultados de fórmulas; la variante suave y su tinta sostienen navegación activa y resúmenes.

### Secondary

Azul para foco y estados informativos. Verde, ámbar y rojo distinguen éxito, advertencia y error; violetas y rosas permanecen como acentos semánticos del código. El texto del estado acompaña al color.

### Neutral

Canvas gris azulado, papel, superficie sutil y superficie elevada ordenan los planos. Texto principal, secundario y atenuado distinguen jerarquía; el borde del control tiene más contraste que el divisor de tarjeta.

## Typography

Google Sans autoalojada en `public/fonts`, con fallback sans-serif, para títulos, cuerpo, datos y controles. La base del documento permite tamaños de raíz de 16, 18 y 20 px; las medidas en rem acompañan ese ajuste.

La jerarquía del frontmatter registra el título del directorio público, el título de página compartido, categorías clínicas, cuerpo global y etiquetas clínicas. Los títulos operativos bajan a 1.5rem en móvil; el directorio baja a 2rem. Las descripciones compartidas se limitan a 72ch. Horas, tablas y cifras operativas usan números tabulares.

## Layout

Shell flex con barra lateral de 240px, reducible a 76px, y contenido de ancho máximo 1560px. Hasta 1024px, y hasta 1200px con puntero táctil principal, la navegación pasa arriba con un botón Menú y el selector de especialidad visible. En tablet comparten una fila. Escape cierra el menú y devuelve el foco al botón. El directorio dispone las fichas en columnas según el espacio disponible y permite abrir los datos de cada paciente.

Agenda: franja de siete días y dos zonas para reservas y disponibilidad/detalle; las zonas se apilan bajo 1120px. Bajo 768px los días conservan un ancho mínimo de 82px y desplazamiento horizontal. Reservas públicas: contenedor de 1240px, pasos y resumen de selección; una columna bajo 760px. Formularios clínicos: dos columnas, campos anchos a todo el grid y una columna bajo 600px. Wizard: contenedor de 1200px, rail de 224px y edición; el rail pasa a tira horizontal bajo 900px.

## Elevation & Depth

Bordes y fondos tonales separan las superficies de trabajo. Las sombras compartidas distinguen elevación baja, paneles y overlays; menús de perfil y portales de fecha/selección usan la sombra overlay. Sus valores y variantes oscuras están en el sidecar.

## Shapes

Controles y tarjetas usan los radios del frontmatter; pills para contadores y estados, círculos para avatares e indicadores de paso. Los controles compartidos tienen altura mínima de 44px; algunos campos públicos usan 46px y áreas de texto clínicas 108px. Bordes de 1px, con foco azul de 2px y separación de 2–3px según componente.

## Components

- **Buttons:** primario sólido teal con texto de contraste y hover compartido; secundario de papel con borde; quiet transparente con tinta teal. Deshabilitado reduce opacidad y cambia el cursor. Transiciones compartidas de 160ms; reduced motion las elimina donde está implementado.
- **Chips / estados:** etiquetas compactas de lectura con fondo tonal; éxito, advertencia y error mantienen texto explícito.
- **Cards / containers:** papel, borde sutil y padding habitual de 24px, reducido a 16px en paneles móviles; las superficies clínicas de solo lectura agrupan categorías.
- **Inputs / fields:** etiqueta visible, borde de control, papel y radio compartido; hover teal, foco azul, error rojo con mensaje. Se conservan unidades, hints, resultados de fórmulas y valores vacíos.
- **Navigation:** selección suave teal con tinta teal y mayor peso; hover sutil. Las rutas y opciones dependen del contexto y los permisos existentes. Skip link para acceso al contenido.
- **Agenda / reserva / wizard:** selección explícita de día y horario, resumen de turno y progreso con etiquetas; el paso activo y el completado conservan señales diferenciadas. Los selectores compartidos mantienen el formato argentino.

## Do's and Don'ts

### Do:

- **Do** conservar logotipos, etiquetas en español y fechas dd/MM/aaaa mediante los selectores compartidos.
- **Do** mantener visibles especialidad, profesional, consultorio y modalidad cuando el flujo los requiere.
- **Do** usar tokens compartidos para ambos temas, foco y estados semánticos con texto.
- **Do** conservar navegación, permisos, campos, unidades, fórmulas, validaciones, borradores y flags.

### Don't:

- **Don't** introducir profesionales, fotos, opiniones, precios ni garantías que el API no proporciona.
- **Don't** sustituir la navegación móvil por iconos sin nombre ni ocultar el selector de especialidad.
- **Don't** activar asistente o calculadoras ni reinterpretar tablas o datos por motivos visuales.
