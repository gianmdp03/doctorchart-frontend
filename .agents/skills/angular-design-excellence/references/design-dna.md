# ADN de diseño: preferencias y criterio creativo

## Idea central

**Diseñar la tarea antes que el contenedor.** La calidad emerge de propósito claro, jerarquía útil, acciones diferenciadas, composición resistente a datos reales, móvil pensado desde cero y respeto al comportamiento del producto. La decoración acompaña esas decisiones.

## Cómo interpretar problemas

| Problema | Respuesta de diseño |
|---|---|
| «Esto está feo» | Diagnosticar jerarquía, alineación, densidad, agrupación, contraste e interacción antes de sumar sombras o colores. |
| Solución aproximada del usuario | Entender la intención: pedir un «botón verde» podría significar destacar un estado, no crear una acción. |
| Página con mucha información | Agrupar por decisiones y tareas, conservando funciones y contenido relevante. |
| Interfaz llena de cajas | Preferir espacio, títulos y divisores si los bordes no agregan significado. |
| Tarjetas que se desalinean | Arreglar la estructura flexible para contenido variable; evitar márgenes específicos para el ejemplo. |
| Dirección visual ya elegida | Evolucionarla coherentemente; no reiniciar el estilo por cada componente. |

## Preferencias confirmadas por el chat de origen

- El usuario eligió la dirección visual «Personal» de Bycode y elogió su portada.
- Quiso conservar logos y colores e integrar toda la información importante después del rediseño.
- Pidió que el teléfono se sintiera como una app, no una web comprimida.
- Prefirió tarjetas visuales para elecciones importantes (tipo de premio y origen de imagen).
- Corrigió controles de fotografía poco cuidados, imágenes y botones desalineados y exceso de cajas anidadas.
- Quiso que «Te alcanza» fuera un estado claramente visible, separado de las instrucciones de canje.
- Pidió canales de contacto más visibles y quitar una fila específica de cuatro productos; eso no prohíbe todas las grillas de cuatro columnas.

## Inferencias, no reglas obligatorias

Parece valorar diseño con personalidad estructural, iniciativa en decisiones reversibles, alineación precisa y explicaciones junto a las decisiones. **No está probado** que siempre quiera azul, tema oscuro, Google Sans, radios concretos o tarjetas para todos los controles. Tampoco que aprobara individualmente cada pantalla. La sección Contacto reciente de Bycode se implementó sin aprobación visual posterior confirmada.

## Identidad local Bycode «Personal»

Usar como referencia **solo si el repositorio actual lo confirma**:

- Superficies tranquilas y legibles, azul focalizado en marca/acciones/selección, títulos de peso alto, textos auxiliares discretos, bordes finos, radios moderados y sombras suaves.
- Hero más expresivo que las pantallas de trabajo; iconos Lucide vía Ng Icons y logos SVG conservados.
- Tokens semánticos como `--background`, `--foreground`, `--card`, `--primary`, `--border`, `--ring` y variables locales `--bc-*`.
- El informe observó Google Sans; títulos hero ~43 px, sección pública ~30 px, página autenticada `clamp(26px, 3vw, 36px)`, texto explicativo ~13–15 px. Son referencias, no accesibilidad certificada.
- Contenedor público máximo ~1280 px; hero `1.25fr / 1fr`; perfil `minmax(220px, .85fr) minmax(0, 1.8fr)`; espacios frecuentes 12, 16, 20, 24, 28 y 48 px.
- Bordes de 1 px, controles de radio ~10–12 px, superficies ~16–24 px. Sin prohibición universal de gradientes: Pointly los usa con propósito en vouchers.

## Reglas transferibles

1. Elegir color según función y comunicar estados con texto o símbolo, además de color.
2. Revisar contrastes calculados en claro/oscuro; los estilos globales pueden invalidar el contraste de un hero.
3. Usar más espacio entre grupos que dentro de ellos; alinear títulos, campos y acciones a ejes comunes.
4. Prever contenido variable con `minmax(0, 1fr)`, `min-width: 0`, wrapping y marcos estables, sin recortar información.
5. Reorganizar navegación móvil y asegurar que perfil, ayuda y salida sigan accesibles.
6. Animar para comunicar respuesta o continuidad, respetando movimiento reducido.

## Convenciones técnicas de referencia

El documento original describe Bycode con Angular 22.2.2, TypeScript 6.0.x, standalone, OnPush, signals, RxJS, Tailwind 4, Spartan, Ng Icons/Lucide, Supabase, SSR/hidratación y Vitest. No asumir esas versiones en otro proyecto: leer `package.json` y las convenciones vigentes. No alterar guards, contratos, permisos ni reglas de negocio en un rediseño visual.
