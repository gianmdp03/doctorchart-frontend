## A. ADN DE DISEÑO

**Base de esta extracción:** pedidos y correcciones visibles en el historial disponible, código real de Bycode y Pointly, y capturas locales de las implementaciones. Algunos turnos anteriores del asistente quedaron resumidos o no están disponibles íntegramente: no puedo reconstruir cada alternativa descartada ni atribuir toda decisión a una instrucción tuya.

No modifiqué archivos ni instalé ninguna skill.

### 1. La idea central

**Diseñar la tarea antes que el contenedor.**

La calidad alcanzada no proviene de un efecto visual aislado. Aparece cuando coinciden estas decisiones:

- La pantalla tiene un propósito reconocible.
- La información importante aparece primero.
- Las acciones tienen una jerarquía consistente.
- Los elementos relacionados se agrupan sin acumular cajas.
- La composición tolera contenido real.
- El teléfono recibe una experiencia propia.
- La presentación respeta el funcionamiento del producto.

La personalidad viene de la composición, el lenguaje y los detalles del producto. Los adornos acompañan; no reemplazan esa estructura.

### 2. Cómo decidir qué diseño crear

| Situación | Criterio que conviene transferir |
|---|---|
| El pedido es “esto se ve feo” | Buscar primero el problema concreto: jerarquía, alineación, densidad, agrupación, contraste o interacción. No responder automáticamente agregando color y sombras. |
| El usuario propone una solución aproximada | Identificar la intención y resolver los detalles con iniciativa. “Que salga como un botón verde” puede significar “necesito distinguir este estado”, sin convertirlo en una acción real. |
| La página tiene mucha información | Reorganizarla por decisiones y tareas. Conservar las funciones y el contenido significativo; simplificar su presentación. |
| Existe una dirección aprobada | Continuarla. No volver a explorar una identidad completa por cada componente nuevo. |
| Hay varias opciones importantes y excluyentes | Considerar tarjetas seleccionables con título, explicación, icono y selección explícita. |
| Una tarjeta contiene demasiadas tarjetas | Probar separación por espacio, títulos y divisores antes de agregar otro borde. |
| El diseño falla al variar el contenido | Corregir la estructura del layout. Evitar compensaciones de margen específicas para el ejemplo. |
| No está definida la dirección visual | Presentar alternativas comparables con contenido representativo antes de extender el rediseño a toda la aplicación. |

**Inferencia:** la combinación que mejor funcionó fue mucha autonomía en composición y detalle, con poca arbitrariedad sobre identidad, contenido y reglas de negocio.

### 3. Identidad visual observada en Bycode

La dirección elegida fue **Personal**. Su vocabulario visual es concreto:

- Superficies tranquilas y legibles.
- Azul reservado para acciones, identidad y selección.
- Títulos con peso y contraste.
- Texto auxiliar más discreto.
- Bordes finos para delimitar grupos.
- Radios moderados.
- Sombras poco protagonistas.
- Iconos pequeños y consistentes.
- Espaciado explícito entre bloques.
- Un hero más expresivo que las pantallas de trabajo.

Esto **no significa que la futura skill deba producir siempre páginas azules con tarjetas redondeadas**. Es la aplicación local del criterio, no su definición universal.

#### Color y contraste

En Bycode existen tokens semánticos como:

`--background`, `--foreground`, `--card`, `--muted-foreground`, `--primary`, `--border`, `--ring`.

El tema Personal los adapta mediante variables `--bc-*`.

Reglas transferibles:

1. Elegir el color por su función: superficie, lectura, acción, estado o selección.
2. Usar la marca para orientar la atención, sin colorear todos los elementos.
3. Hacer perceptibles los estados mediante texto o símbolos además del color.
4. Revisar claro y oscuro como composiciones completas.
5. Comprobar los estilos calculados: los overrides globales pueden destruir el contraste aunque el componente parezca correcto.

**Ejemplo real:** hubo que proteger el color del título sobre el hero oscuro de Bycode frente a reglas globales del tema claro.

#### Tipografía y jerarquía

Valores observados, útiles como referencia de Bycode:

| Elemento | Implementación observada |
|---|---|
| Familia | Google Sans, con fallback sans-serif |
| Título del hero | 43 px, interlínea 1,12 y tracking negativo |
| Títulos de sección pública | 30 px |
| Título de página autenticada | `clamp(26px, 3vw, 36px)` |
| Títulos de tarjetas | Aproximadamente 16–21 px según contexto |
| Texto explicativo | Habitualmente 13–15 px, con interlínea generosa |
| Etiquetas introductorias | 10–11 px, mayúsculas y espaciado entre letras |

El criterio que importa es **la diferencia de función y énfasis entre niveles**, no copiar esos tamaños en cualquier proyecto. Los textos pequeños existentes tampoco constituyen una certificación de accesibilidad.

#### Espaciado y composición

La composición pública usa un ancho máximo de 1280 px. El hero combina columnas en proporción `1.25fr / 1fr`, con 48 px de padding en escritorio.

El perfil separa identidad y edición mediante una grilla:

`minmax(220px, .85fr) minmax(0, 1.8fr)`.

Los espacios de 12, 16, 20, 24, 28 y 48 px se repiten en distintos niveles. No existe evidencia de una escala única obligatoria.

Reglas:

- Más espacio entre grupos que entre elementos del mismo grupo.
- Alinear títulos, campos y acciones a ejes comunes.
- Dar ancho de lectura limitado al texto largo.
- Usar `minmax(0, 1fr)`, `min-width: 0` y wrapping donde el contenido pueda crecer.
- Permitir que un panel ancho se convierta en una composición distinta en móvil.
- No introducir alturas fijas para esconder problemas de contenido.

#### Bordes, superficies y profundidad

En Bycode aparecen:

- Bordes de 1 px.
- Radios cercanos a 10–12 px en controles.
- Radios de 16–24 px en superficies.
- Elevación discreta.
- Divisores internos cuando ayudan a leer una unidad.

**La regla no es “prohibir cajas anidadas”.** El hero contiene una representación del ecosistema porque explica una relación. Lo que se evita es repetir bordes alrededor de la misma información sin aportar significado.

#### Iconos e imágenes

- Bycode utiliza `@ng-icons/core` con Lucide.
- Los logos existentes se conservan como recursos SVG.
- Los iconos acompañan una etiqueta; rara vez deben sustituirla.
- Las fotografías tienen un marco definido antes de cargarse.
- Las iniciales son un fallback, no una imagen rota.
- La imagen de una cuenta no debe confundirse con la de un comercio o paciente.

En Pointly, los vouchers tienen un tratamiento gráfico más expresivo y usan gradientes. Esto demuestra que **no hay una prohibición universal de los gradientes**: tienen sentido dentro de una pieza de premio, aunque se haya reducido su uso ornamental en Bycode.

#### Movimiento y microinteracciones

El movimiento observado es funcional y breve:

- Hover de color o borde.
- Pequeñas variaciones de brillo.
- Selección visible.
- Desplazamiento de 1 px en algunas tarjetas seleccionables.
- Scroll hacia secciones o confirmaciones.
- Estados de carga y bloqueo durante una operación.

La skill debería usar movimiento para comunicar respuesta y continuidad, respetando movimiento reducido. No agregar animaciones de entrada a cada sección por defecto.

### 4. Tus preferencias: evidencia e incertidumbre

#### Confirmadas

| Evidencia del historial | Preferencia que sí puede conservarse |
|---|---|
| Elegiste la propuesta **Personal** y expresaste satisfacción reiterada con Bycode. | Mantener esa dirección como referencia principal de este proyecto. |
| Aclaraste que te encantaba el diseño, pero faltaba integrar la información de la página principal. | Renovar la presentación sin hacer desaparecer contenido y funciones. |
| Pediste conservar logos y colores. | Evolucionar la marca existente. |
| Pediste que en teléfono pareciera una aplicación y no una web simplemente comprimida. | Navegación y prioridades específicas para móvil. |
| Preferiste “cuadrados con colorcitos” para elegir tipo de premio y origen de imagen. | Opciones importantes, excluyentes y explicables pueden beneficiarse de tarjetas seleccionables. |
| Rechazaste los controles de cambiar/elegir foto por su aspecto poco cuidado. | Los controles pequeños y cotidianos necesitan el mismo criterio visual que el resto de la página. |
| Señalaste imágenes y botones desalineados en premios. | Geometría estable y acciones alineadas aunque cambie el contenido. |
| Rechazaste el efecto de “div dentro de otro div”. | Reducir contenedores y bordes redundantes. |
| Pediste destacar “Te alcanza” y separar la coordinación del canje. | Hacer visibles los estados importantes y distinguirlos de las instrucciones. |
| Pediste contacto visible, porque las redes del footer resultaban demasiado pequeñas. | Dar presencia suficiente a acciones importantes; no esconderlas en zonas secundarias. |
| Pediste quitar la fila Modular / Cloud / Pointly / DoctorChart. | Esa fila concreta no debe volver. No permite concluir que rechazás cualquier resumen de cuatro columnas. |

#### Inferencias razonables

- Preferís una interfaz con carácter por su estructura y sus detalles, antes que por efectos decorativos.
- Valorás que se interprete la intención de tus pedidos y se resuelvan los detalles sin preguntarte por cada padding o icono.
- Te importa especialmente la percepción de orden: alineación, proporción y separación.
- Las explicaciones funcionan mejor cuando aparecen junto a la decisión o mediante una ayuda contextual.

#### No demostrado

- Que prefieras siempre tema oscuro, azul, Google Sans o cierto radio.
- Que quieras tarjetas seleccionables para todos los controles.
- Que todo componente implementado haya recibido aprobación individual.
- Que la nueva sección Contacto haya sido aprobada visualmente después de verla: fue solicitada e implementada, pero no hay devolución posterior disponible.
- Que las pruebas de navegador equivalgan a pruebas en un iPhone físico o a una auditoría de accesibilidad.

### 5. Convenciones técnicas reales

Bycode utiliza actualmente:

- Angular **22.2.2**, TypeScript **6.0.x**.
- Componentes standalone y carga de páginas mediante router.
- `ChangeDetectionStrategy.OnPush` en las referencias principales.
- Signals, `computed`, `inject` y control de flujo `@if` / `@for`.
- RxJS y `HttpClient`.
- Formularios template-driven y reactivos según el componente.
- Tailwind CSS 4 y componentes Spartan.
- Iconos Lucide mediante Ng Icons.
- Supabase para la cuenta.
- Prerender de páginas públicas e hidratación.
- Vitest para pruebas.

Los estilos combinan utilidades, CSS de componentes y el tema compartido `personal-theme.css`. **No hay evidencia de que todo el repositorio siga una arquitectura uniforme o de que deba imponerse una nueva.**

Puntos que la skill debe respetar:

- Reutilizar tokens y componentes antes de crear variantes.
- Mantener guardas, permisos, contratos y estados de operación.
- No confundir mejora de UI con autorización para cambiar reglas.
- Conservar la separación entre perfil personal y perfiles del dominio.
- Verificar navegación, anclas y retorno después del login.
- No copiar los estilos heredados defectuosos como si fueran parte del ADN.
- No ampliar budgets ni esconder overflow para hacer pasar una compilación.

---

## B. CATÁLOGO DE REFERENCIAS

### 1. Portada de Bycode: la referencia con aprobación más fuerte

**Evidencia:** elegiste Personal y elogiaste explícitamente el resultado de la página principal.

**Archivos:**

- [home.component.html](C:/Users/gcast/Documents/GitHub/bycode-frontend/src/app/pages/home/home.component.html)
- [home.component.ts](C:/Users/gcast/Documents/GitHub/bycode-frontend/src/app/pages/home/home.component.ts)
- [personal-theme.css](C:/Users/gcast/Documents/GitHub/bycode-frontend/src/personal-theme.css)
- [navbar.component.html](C:/Users/gcast/Documents/GitHub/bycode-frontend/src/app/components/navbar/navbar.component.html)
- [navbar.component.css](C:/Users/gcast/Documents/GitHub/bycode-frontend/src/app/components/navbar/navbar.component.css)

**Qué aprender:**

- Un hero que explica el producto usando contenido del propio ecosistema.
- Alternancia entre presentación, explicación, comparación, preguntas y acción.
- Dos productos relacionados sin fingir que comparten una sola suscripción.
- Jerarquía fuerte sin convertir cada bloque en una pieza promocional.
- Contenido conservado con una organización nueva.

**Patrón reutilizable:** organizar una página por preguntas del visitante: qué es, para quién sirve, cómo se relaciona, qué dudas resuelve y qué puede hacer después.

La sección Contacto reciente añade tres canales con propósitos distintos y acciones alineadas. Debe tratarse como una evolución implementada, no como una aprobación independiente ya recibida.

### 2. Espacio autenticado y panel de aplicaciones

**Evidencia:** implementación de la dirección Personal elegida. No hay aprobación individual disponible de cada pantalla administrativa.

**Archivos:**

- [workspace-shell.component.html](C:/Users/gcast/Documents/GitHub/bycode-frontend/src/app/components/workspace-shell/workspace-shell.component.html)
- [workspace-shell.component.ts](C:/Users/gcast/Documents/GitHub/bycode-frontend/src/app/components/workspace-shell/workspace-shell.component.ts)
- [company-panel.component.html](C:/Users/gcast/Documents/GitHub/bycode-frontend/src/app/pages/company-panel/company-panel.component.html)
- [company-panel.component.ts](C:/Users/gcast/Documents/GitHub/bycode-frontend/src/app/pages/company-panel/company-panel.component.ts)
- [personal-theme.css](C:/Users/gcast/Documents/GitHub/bycode-frontend/src/personal-theme.css)

**Qué aprender:**

- Separar navegación persistente de contenido de página.
- Agrupar cada aplicación con su plan, vigencia y acciones.
- Diferenciar abrir una aplicación, renovar y mejorar.
- Presentar confirmaciones dentro del documento.
- Sustituir el sidebar por navegación inferior en móvil, manteniendo perfil, ayuda y salida.

**Patrón reutilizable:** conservar la misma arquitectura de tareas mientras cambia la composición por dispositivo.

### 3. Perfil y recorte de foto de Bycode

**Evidencia:** pediste este flujo expresamente, tomando como referencia la foto de empresa de Pointly. Su implementación está inspeccionada; no implica aprobación individual de todos sus detalles.

**Archivos:**

- [account.component.html](C:/Users/gcast/Documents/GitHub/bycode-frontend/src/app/pages/account/account.component.html)
- [account-photo.component.html](C:/Users/gcast/Documents/GitHub/bycode-frontend/src/app/pages/account/account-photo.component.html)
- [account-photo.component.ts](C:/Users/gcast/Documents/GitHub/bycode-frontend/src/app/pages/account/account-photo.component.ts)
- [account-avatar.component.ts](C:/Users/gcast/Documents/GitHub/bycode-frontend/src/app/components/account-avatar/account-avatar.component.ts)
- [account-profile.service.ts](C:/Users/gcast/Documents/GitHub/bycode-frontend/src/app/services/account-profile.service.ts)

**Qué aprender:**

- Separar identidad, edición y seguridad.
- Explicar por qué ciertos datos son de solo lectura.
- Ofrecer un control visible para elegir la foto.
- Permitir recorte por arrastre y también mediante controles.
- Mostrar guardado, error, eliminación y recuperación.
- Manejar recursos temporales y respuestas tardías, además de pintar un avatar.

**Patrón reutilizable:** convertir una operación técnica de archivos en una secuencia comprensible: elegir → ajustar → confirmar → ver resultado.

### 4. Selectores en tarjetas de Pointly

**Evidencia:** preferencia explícita frente a los radios pequeños y al selector de imagen anterior.

**Archivos:**

- [choice-cards.css](C:/Users/gcast/Documents/GitHub/pointly-frontend/src/choice-cards.css)
- [reward-modal.html](C:/Users/gcast/Documents/GitHub/pointly-frontend/src/app/pages/company-detail/components/modals/reward-modal/reward-modal.html)
- [product-modal.html](C:/Users/gcast/Documents/GitHub/pointly-frontend/src/app/pages/company-detail/components/modals/product-modal/product-modal.html)

**Qué aprender:**

- Toda la tarjeta es una superficie de selección.
- Se conservan radios nativos y comportamiento de teclado.
- La selección combina borde, color y check.
- Cada opción explica su consecuencia.
- Los campos incompatibles se muestran según la selección.

**Patrón reutilizable:** usar presentación rica sin perder la semántica nativa.

Los nombres heredados de directorios contienen `modals`; eso no autoriza reintroducir flujos en overlays.

### 5. Premios del cliente en Pointly

**Evidencia:** tus correcciones concretas sobre imágenes, alineación y visibilidad del saldo suficiente.

**Archivos:**

- [client-wallet-catalog.html](C:/Users/gcast/Documents/GitHub/pointly-frontend/src/app/pages/client-wallet/client-wallet-catalog.html)
- [client-wallet-catalog.css](C:/Users/gcast/Documents/GitHub/pointly-frontend/src/app/pages/client-wallet/client-wallet-catalog.css)
- [reward-art.css](C:/Users/gcast/Documents/GitHub/pointly-frontend/src/app/components/reward-art/reward-art.css)

**Qué aprender:**

- Marco de imagen estable para foto, placeholder y voucher.
- Contenido flexible.
- Bloque inferior de disponibilidad alineado mediante estructura flex y `margin-top: auto`.
- Importes largos tratados dentro del marco.
- Estado “Te alcanza” visible como información, con la coordinación del canje aparte.

**Patrón reutilizable:** diseñar tarjetas como una familia que soporta contenido variable, no como ejemplos independientes.

---

## C. MÉTODO DE TRABAJO

### 1. Leer el sistema antes de dibujar

Inspeccionar instrucciones locales, versiones, tokens, navegación y dos o tres referencias pertinentes. Seguir el recorrido real: entrada, datos, acciones, confirmación y resultado.

Producir una nota breve:

- Tarea principal.
- Información que debe permanecer.
- Decisión o acción prioritaria.
- Qué falla visualmente.
- Restricciones que no se pueden alterar.

### 2. Traducir el pedido a criterios observables

Ejemplos:

- “Que parezca una app”: navegación móvil propia, acciones alcanzables y funciones esenciales visibles.
- “Los botones están desacomodados”: alineación independiente de la longitud de descripción.
- “No se ve que alcanza”: estado dominante, legible y semánticamente informativo.
- “Las redes están escondidas”: canal de contacto localizable desde navegación y contenido principal.

No implementar literalmente una solución aproximada si eso contradice la intención.

### 3. Elegir una composición

Decidir qué necesita protagonismo y qué puede pasar a segundo plano.

Elegir entre:

- Lectura editorial.
- Formulario centrado en una tarea.
- Comparación.
- Colección de elementos.
- Espacio de trabajo.

Después definir grupos, ejes y acciones. El borde o la tarjeta llegan al final de esa decisión, no al principio.

### 4. Conservar iniciativa sin cambiar el encargo

Resolver con autonomía detalles reversibles: espaciado, proporciones, iconos, adaptación móvil y jerarquía.

Preguntar cuando falte una decisión que afecte identidad, contenido esencial, comportamiento o negocio. No pedir confirmación por cada detalle visual.

Si ya existe una dirección aprobada, mejorar dentro de ella. Para un cambio completo de dirección, mostrar una propuesta acotada antes de extenderla.

### 5. Implementar en Angular

Reutilizar componentes, servicios y contratos existentes. Mantener el estado de interfaz cerca de su propietario, sin introducir una arquitectura o biblioteca nueva por conveniencia estética.

Atender:

- Semántica de enlaces, botones y estados.
- Formularios y validaciones.
- Cargas, errores, vacíos y reintentos.
- SSR e hidratación cuando correspondan.
- Limpieza de suscripciones y recursos.
- Contenido real y nombres largos.

### 6. Diseñar móvil como una composición

Comprobar prioridades, navegación y densidad, no solo columnas.

Si hay navegación fija, reservar espacio y safe areas. Las acciones que desaparecen con el sidebar deben reaparecer en un lugar coherente.

Los breakpoints deben responder al contenido. Los 700/760/1000/1150 px existentes en Bycode son decisiones locales, no una receta universal.

### 7. Revisar visualmente y corregir

Inspeccionar capturas reales y operar la página:

- Teléfono estrecho, teléfono habitual y escritorio.
- Claro y oscuro si el proyecto los soporta.
- Texto largo.
- Imagen ausente y proporciones extremas.
- Error, vacío y carga.
- Teclado, foco y movimiento reducido.
- Navegación directa, enlaces y retorno después de autenticar.

No aceptar como solución ocultar overflow horizontal del documento o recortar controles esenciales.

### 8. Saber cuándo terminar

Una interfaz está lista para revisión cuando:

1. La tarea principal se entiende.
2. La jerarquía se mantiene con datos variables.
3. Las acciones esenciales funcionan y permanecen accesibles.
4. Móvil conserva las capacidades pertinentes.
5. Los estados explican qué ocurre y cómo continuar.
6. La implementación encaja en el proyecto.
7. Las comprobaciones técnicas pertinentes pasan.
8. La revisión visual no deja defectos concretos sin resolver.

No seguir agregando adornos después de satisfacer esos criterios. Comunicar qué se verificó y qué permanece simulado.

---

## D. BORRADOR DE SKILL

Estructura propuesta, **sin crear ni instalar archivos**:

```text
angular-design-excellence/
├── SKILL.md
└── references/
    ├── design-dna.md
    ├── examples.md
    ├── workflow.md
    └── evaluations.md
```

Contenido de las referencias:

| Archivo propuesto | Contenido |
|---|---|
| `design-dna.md` | Apartado A: principios, preferencias con evidencia, inferencias y perfil técnico/visual de Bycode. |
| `examples.md` | Apartado B: cinco referencias, rutas, aprendizajes y grado de aprobación. |
| `workflow.md` | Apartado C: procedimiento y criterios de finalización. |
| `evaluations.md` | Apartado E: tareas y evaluación observable. |

El cuerpo de `SKILL.md` debe ser más corto que este análisis. Las referencias conservan el detalle sin cargarlo en cada tarea.

### Propuesta de `SKILL.md`

```markdown
---
name: angular-design-excellence
description: Diseñar, crear y mejorar interfaces Angular con criterio de composición, jerarquía, interacción y adaptación móvil. Usar para páginas nuevas, rediseños y correcciones visuales de componentes; fundamentar las decisiones en el producto y sus referencias existentes.
---

# Angular Design Excellence

Actuá como diseñador de producto y desarrollador Angular. Interpretá la
intención del pedido, resolvé los detalles visuales con iniciativa y conservá
el comportamiento y la identidad que el usuario haya elegido.

## Antes de modificar

Leé las instrucciones del repositorio, sus dependencias y los componentes
que representan la calidad buscada. Inspeccioná HTML, estilos, TypeScript y
estados reales; una captura sola no explica la interacción.

- Para entender el criterio y las preferencias personales, consultá
  [design-dna.md](references/design-dna.md).
- Para trabajo sobre Bycode o Pointly, leé las referencias pertinentes de
  [examples.md](references/examples.md) y abrí los archivos reales.
- Para un rediseño amplio o una tarea ambigua, apoyate en
  [workflow.md](references/workflow.md).
- Para evaluar esta skill, usá
  [evaluations.md](references/evaluations.md).

Si una referencia no está disponible, declaralo y buscá un equivalente en el
repositorio activo. No inventes que la inspeccionaste.

## Criterio de diseño

1. Identificá la tarea, el contenido indispensable y la acción prioritaria.
   Componé la pantalla alrededor de ellos antes de elegir contenedores.

2. Creá jerarquía mediante posición, proporción, tipografía, contraste y espacio.
   No intentes resolver un problema estructural agregando sombras o color.

3. Conservá la identidad aprobada y el contenido significativo. Rediseñar una
   presentación no autoriza retirar funciones o modificar reglas comerciales.

4. Aportá personalidad desde el producto: ejemplos, lenguaje, imágenes,
   agrupación y recorridos específicos. Evitá bloques promocionales o métricas
   inventadas para llenar una plantilla.

5. Usá superficies y bordes cuando comuniquen agrupación. Evitá cajas
   redundantes, etiquetas repetidas y profundidad ornamental.

6. Diseñá las colecciones para contenido variable: imágenes normalizadas,
   textos largos y acciones alineadas. Preferí una estructura flexible a
   compensaciones de margen o alturas arbitrarias.

7. En elecciones importantes y excluyentes, considerá tarjetas seleccionables
   con explicación y estado explícito. Conservá semántica, foco y teclado.
   No conviertas todos los controles en tarjetas.

8. Distinguí navegación, acción, selección y estado. Un aviso destacado no
   necesita convertirse en un botón. No dependas solo del color.

## Autonomía y alcance

Resolvé detalles reversibles sin solicitar microaprobaciones. Cuando el
pedido sea impreciso, explicá brevemente la interpretación y ejecutá una
solución coherente.

Preguntá si falta una decisión material de identidad, contenido o
comportamiento. Si la dirección visual ya fue aprobada, evolucioná dentro
de ella; no reinicies el diseño de todo el producto.

Los colores, fuentes y radios de Bycode son un caso de referencia. En otro
proyecto, reconstruí su identidad y aplicá el criterio, no una copia estética.

## Implementación Angular

Respetá la versión y las convenciones reales del repositorio. Reutilizá
tokens, componentes y servicios antes de añadir variantes o dependencias.

Mantené semántica HTML, validaciones, permisos, contratos y estados de operación.
No ocultes un error como un estado vacío ni anuncies éxito sin confirmación.

Comprobá accesos directos, navegación, anclas y retorno después del login.
Si hay SSR o hidratación, respetalos. Liberá recursos temporales y descartá
respuestas que pertenezcan a una cuenta anterior.

No conviertas defectos heredados en reglas del sistema ni crees una nueva
arquitectura para resolver una corrección visual pequeña.

## Móvil e interacción

Diseñá la experiencia móvil por tareas. Reorganizá navegación y prioridades
cuando haga falta, manteniendo accesibles las acciones esenciales.

Usá áreas táctiles cómodas —44–48 px como referencia de este trabajo—,
foco visible y alternativas al arrastre para operaciones importantes.
Contemplá safe areas cuando haya barras fijas.

Usá movimiento breve para comunicar respuesta, selección o continuidad.
Respetá movimiento reducido. No agregues animaciones por defecto.

## Verificación y cierre

Compilá y ejecutá comprobaciones proporcionales al cambio. Después revisá
la interfaz renderizada: compilar no demuestra calidad visual.

Probá los anchos relevantes, temas existentes, contenido largo y estados
de carga, error y vacío. Operá las acciones principales y comprobá que los
elementos fijos no cubran contenido o controles.

Corregí problemas de jerarquía, alineación, contraste y adaptación antes
de añadir decoración.

Terminá cuando la tarea resulte clara, el contenido variable no rompa la
composición y los recorridos pertinentes funcionen. Informá las pruebas y
limitaciones reales; no presentes emulación como prueba en hardware físico.

La skill no concede autorización para publicar, reiniciar bases, cambiar
permisos ni activar funciones suspendidas.
```

### Qué no incluiría en esta primera versión

- Una plantilla Angular completa.
- Una biblioteca de componentes propia.
- Scripts que transformen clases automáticamente.
- Una obligación de producir tres propuestas para cualquier cambio.
- Un color, fuente o grilla obligatorios para todos los proyectos.
- Historial de puertos, sesiones de demo o resultados de pruebas antiguos.

Ese material aumentaría el tamaño de la skill sin mejorar necesariamente su criterio.

---

## E. PRUEBAS DE CALIDAD

Estas pruebas son propuestas para la futura skill; **no las ejecuté durante esta extracción**.

Para comprobar que aporta valor, conviene resolver cada tarea en dos contextos independientes: uno sin la skill y otro con ella. Mantener el mismo pedido, repositorio y datos, sin revelar al segundo agente la solución esperada.

### Prueba 1 — Nueva página con autonomía

**Pedido:**

> Agregá una página para administrar notificaciones. El usuario debe poder elegir canales y tipos de aviso. Que se entienda bien y funcione cómodo desde el teléfono. Conservá la identidad del proyecto.

**Material:** contratos y opciones reales, referencias existentes y estados de carga/error.

**Qué debería demostrar:**

- Agrupación por decisiones comprensibles.
- Elección razonada entre controles simples y opciones enriquecidas.
- Distinción entre permisos del navegador y preferencias de cuenta.
- Una acción de guardado clara, con estados verificables.
- Composición móvil deliberada.
- Coherencia visual sin copiar el layout del perfil por inercia.

**Señales de fallo:** campos inexistentes, preferencias decorativas sin efecto, tarjetas para todo o aspecto ajeno al proyecto.

### Prueba 2 — Reparar una colección con contenido adverso

**Pedido:**

> Este catálogo se ve desordenado. Las imágenes y las descripciones tienen tamaños distintos y los botones quedan a cualquier altura. Mejoralo sin cambiar lo que hace.

**Material:** nombres largos, descripciones vacías y extensas, imágenes verticales y horizontales, ausencia de imagen y distintos estados de disponibilidad.

**Qué debería demostrar:**

- Marco visual consistente.
- Acciones o estados inferiores alineados dentro de cada fila.
- Contenido legible y recuperación del texto si se limita su presentación.
- Estado informativo distinguible de una acción.
- Comportamiento correcto en móvil y con teclado.
- Una solución estructural, sin márgenes particulares para cada tarjeta.

**Señales de fallo:** ocultar contenido necesario, fijar una altura que lo recorte, eliminar acciones o usar botones deshabilitados para representar cualquier estado.

### Prueba 3 — Transferencia a otra identidad visual

**Pedido:**

> Renovalo para que sea cómodo en teléfono y tenga una jerarquía clara. Conservá la marca, todos los datos y las acciones de este panel.

**Material:** otro proyecto Angular, con su propia tipografía y paleta, un listado o tabla, filtros, estados vacíos y acciones por registro.

**Qué debería demostrar:**

- Inspección de referencias locales antes de diseñar.
- Conservación de la marca distinta.
- Reorganización móvil sin perder información o capacidades.
- Acciones secundarias accesibles.
- Mejoras explicables por tarea, densidad y jerarquía.
- Uso de las convenciones técnicas de ese proyecto.

**Señal decisiva de fallo:** producir otra versión azul de Bycode. Eso demostraría copia de apariencia, no transferencia de criterio.

### Evaluación común

Puntuar cada dimensión de 0 a 2:

| Dimensión | Evidencia esperada |
|---|---|
| Interpretación | Resuelve la intención, sin expandir arbitrariamente el encargo. |
| Jerarquía | Tarea y acción principal reconocibles. |
| Coherencia | Respeta identidad y componentes del proyecto. |
| Resistencia al contenido | Tolera datos variables sin desorden o pérdida. |
| Móvil | Conserva tareas y capacidades, con controles alcanzables. |
| Interacción | Semántica, foco, estados y recuperación claros. |
| Implementación | Encaja en Angular sin arquitectura o dependencias innecesarias. |
| Verificación | Capturas y recorridos reales, con limitaciones declaradas. |

**Umbral inicial propuesto:** 13/16, sin cero en conservación de contenido, móvil o interacción. Es un criterio de evaluación sugerido, no un resultado probado.

La validación más importante será comprobar si la skill mejora las decisiones en las tres tareas, especialmente en la tercera: **debe transmitir una manera de pensar el diseño, no reproducir una plantilla.**