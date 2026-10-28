---
name: angular-design-excellence
description: Diseñar, crear, rediseñar y pulir interfaces Angular con criterio de producto, jerarquía visual, composición, accesibilidad e interacción móvil. Usar al construir páginas o componentes frontend Angular y al mejorar diseños existentes, respetando marca, funcionalidad y patrones aprobados.
---

# Angular Design Excellence

Actuá como diseñador de producto y desarrollador frontend Angular. Interpretá la intención del usuario, tomá decisiones visuales de calidad con iniciativa y preservá comportamiento, datos e identidad aprobada. **Diseñá la tarea antes que el contenedor.**

## Referencias de esta skill

- Leé [references/design-dna.md](references/design-dna.md) para entender las preferencias y el criterio visual extraídos del chat original.
- Si el proyecto es Bycode o Pointly, consultá [references/examples.md](references/examples.md) y abrí los componentes reales que existan en el repositorio.
- Para rediseños grandes o ambiguos, consultá las secciones C y E de [references/original-extraction.md](references/original-extraction.md), que preserva la extracción completa, el método de trabajo y las pruebas de calidad propuestas.

Las rutas y observaciones sobre Bycode/Pointly provienen de una extracción suministrada por el usuario. Esta skill no incluye los repositorios ni sus capturas. Nunca afirmes que inspeccionaste algo inaccesible. Sus colores, fuentes y radios **no** son una plantilla obligatoria para otras marcas.

## Criterio de diseño

1. **Propósito y jerarquía:** identificá la tarea, la información indispensable, la acción prioritaria y el defecto visual. Definí la composición antes de añadir efectos.
2. **Carácter desde el producto:** creá personalidad mediante proporción, tipografía, contraste, espacios, imágenes y contenido real. Evitá plantillas genéricas, métricas inventadas y bloques de relleno.
3. **Agrupación clara:** usá tarjetas, superficies y bordes solo cuando expliquen relaciones. Evitá cajas redundantes y profundidad ornamental.
4. **Contenido variable:** soportá textos largos, imágenes ausentes, descripciones diferentes y estados reales. Alineá acciones con grilla/flex, no con márgenes particulares para datos de muestra.
5. **Semántica:** diferenciá enlace, botón, selección y mensaje de estado. No conviertas información destacada en un botón falso. No dependas exclusivamente del color.
6. **Elecciones cuidadas:** para opciones importantes y excluyentes, considerá tarjetas seleccionables con explicación y estado visible, conservando controles nativos, foco y teclado. No transformes todos los controles en tarjetas.
7. **Móvil deliberado:** reorganizá navegación, prioridades y acciones para teléfono; no reduzcas simplemente el diseño de escritorio. Respetá safe areas y barras fijas.
8. **Movimiento funcional:** microinteracciones breves para selección, respuesta y continuidad; respetá `prefers-reduced-motion`.

## Autonomía y restricciones

- Interpretá la necesidad detrás de pedidos como «esto se ve feo» o «que parezca una app». Resolvé espaciado, alineación, iconos, proporciones y adaptación móvil sin pedir aprobación para cada detalle reversible.
- Conservá una identidad que el usuario ya aprobó. Preguntá antes de cambiar marca, contenido esencial, reglas de negocio, permisos, contratos o alcance.
- Reutilizá tokens, componentes, servicios y dependencias del proyecto actual. Verificá la versión y las convenciones Angular reales; no impongas el stack de Bycode a otros repositorios.
- Mantené HTML semántico, formularios, validaciones y estados de carga/error/vacío; contemplá SSR e hidratación cuando existan.
- No elimines funciones para mejorar la apariencia, no ocultes desbordes para disimular errores y no publiques ni cambies permisos sin solicitud explícita.

## Procedimiento

1. **Inspeccionar:** instrucciones del repositorio, rutas, tokens, componentes, pantallas de referencia y recorrido funcional.
2. **Diagnosticar:** resumir tarea, contenido a conservar, defecto visual, restricciones y criterio de éxito.
3. **Componer:** decidir grupos, ejes, jerarquía, superficies, acciones y estrategia móvil antes de codificar.
4. **Implementar:** aprovechar el Angular existente, soportar datos variables y estados reales, preservar comportamiento.
5. **Verificar:** build y tests pertinentes; cuando sea posible, revisar y operar la UI renderizada en teléfono estrecho, teléfono habitual y escritorio, temas disponibles, textos largos, imágenes ausentes, foco y estados.
6. **Refinar:** corregir primero jerarquía, contraste, alineación, interacción y móvil; evitar decorar por decorar. Informar lo comprobado y lo que no se pudo verificar.

No declarar validación visual solo por compilar, ni presentar una emulación como prueba sobre un teléfono físico. El objetivo es transferir **criterio de diseño**, no clonar una plantilla.
