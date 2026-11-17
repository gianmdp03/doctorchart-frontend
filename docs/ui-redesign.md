# Rediseño de DoctorChart

Fecha: 16/11/2026. Implementación local en el frontend Angular; sin commits,
publicación, despliegue ni cambios de backend o PostgreSQL.

## Dirección y sistema

Identidad clínica con acciones teal, azul para información, fondos gris azulado,
superficies suaves y tipografía Google Sans local. Las tres referencias aportaron
jerarquía, claridad de agenda y selección de horarios; sus contenidos ficticios
no se incorporaron al producto. Temas claro y oscuro equivalentes.

Impeccable se aplicó mediante inventario, dirección documentada, implementación,
detección, inspección de capturas y revisión independiente. [DESIGN.md](../DESIGN.md)
documenta los tokens y patrones implementados. `src/design-tokens.css` centraliza
colores, espacios, radios, elevación, foco y movimiento; `src/styles-ui.css`
unifica controles, formularios, superficies y compatibilidad con Material/Spartan.

## Cobertura de implementación

El [inventario](ui-redesign-inventory.json) registra 41 entradas de rutas y 67
componentes: 65 con cambios directos de presentación y 2 que reciben las
fundaciones compartidas conservando su estructura (navegación antigua no montada
y avatar de integración).

Se actualizaron navegación y menús, dashboard, pacientes y ficha clínica,
consultas, recetas, estudios, vacunas y crecimiento, formularios por especialidad,
wizard/editor, consultorios, teleconsulta, horarios, agenda y reservas públicas,
confirmaciones, secretaría, administración, cuenta, autenticación, registro,
planes, página profesional, errores y controles compartidos de fecha/hora.

IA y calculadoras mantienen sus flags desactivados: sus plantillas recibieron
ajustes visuales, sin habilitarlas ni afirmar validación interactiva. El renderer
compartido conserva campos, fórmulas, unidades y eventos por especialidad. No se
afirma haber recorrido cada combinación clínica o estado posible.

## Verificación y límites

| Comprobación | Resultado |
| --- | --- |
| Suite Angular/Vitest | 865 pruebas, 106 archivos, todas aprobadas |
| Configuración y servidor estático | 8 pruebas aprobadas sobre el bundle actual |
| Compilación Angular optimizada de desarrollo | Aprobada; 2 rutas prerenderizadas |
| Navegador Edge con Angular real | 51 escenarios, 308 capturas |
| Bindings originales de eventos/modelos/entradas | Ninguno eliminado respecto del respaldo inicial |
| Errores de navegador / peticiones no previstas | 0 / 0 en los escenarios ejecutados |

La matriz cubre 1440, 834 y 390 px, ambos temas, datos poblados y vacíos,
validación, menús por teclado, edición clínica, notas, selección de contextos,
reserva pública con conflicto y confirmación, detalle/reprogramación, turno manual,
consultorios físicos/virtuales y roles médico, secretaría y administrador.
Reprogramación y turno manual se verificaron hasta selección y formulario válido;
no se enviaron al backend real.

Las respuestas del API se interceptaron exclusivamente en scripts de prueba.
Esto verifica interacción del frontend, no integración completa: OAuth, Google
Meet, pagos, persistencia, autorizaciones del servidor y concurrencia real quedan
fuera de esta evidencia. En planes se verificó el error de carga; no se inventaron
precios. No se modificaron contratos, reglas clínicas ni disponibilidad.

Se reforzaron nombres accesibles, errores asociados, foco visible, cierre con
Escape, contraste, estados con texto y movimiento reducido. Las capturas finales
no presentan desbordamiento del documento, hallazgos del comprobador de contraste
de texto ni controles sin nombre. Estas comprobaciones no certifican WCAG ni
sustituyen pruebas con lector de pantalla y dispositivos físicos.

La revisión independiente detectó y verificó la corrección de cuatro problemas
(encabezados redundantes, directorio móvil, recuperación del calendario vacunal
y selección administrativa), además del contraste del horario seleccionado al
pasar el cursor. Su disposición final fue `ship` para esas correcciones;
no constituye certificación de todos los flujos del producto.

La configuración estricta de producción exige `PUBLIC_SUPABASE_PUBLISHABLE_KEY`,
ausente en este entorno. Su validación se conservó y el build productivo no se
certifica. El build optimizado advierte que no puede inlinear la ruta absoluta
de Google Sans en Windows; los archivos locales existen y la fuente se renderiza.
Node 26 requirió `NODE_OPTIONS=--no-experimental-webstorage` para ejecutar Vitest
con el almacenamiento de jsdom. Persisten avisos de `window.open` de jsdom sin
fallos de pruebas.

## Mantenimiento y reproducción

Se eliminaron paletas globales duplicadas y estilos obsoletos del header y
dashboard, y se extrajeron estilos inline. No se agregaron dependencias. Quedan
aliases de compatibilidad y variantes de controles por pantalla; una consolidación
gradual puede reducirlos preservando formularios y densidad clínica.

Con el servidor local en `127.0.0.1:4202`, ejecutar
`node scripts/verify-ui-redesign.cjs` reproduce la matriz con fixtures separados
de la aplicación. `UI_CASES` permite repetir casos concretos. Las capturas y el
JSON de resultados quedan en `.impeccable/review/` (ignorado por Git).
`STATIC_SMOKE_DIRECTORY=.angular/ui-redesign-optimized/browser` selecciona el
bundle para las pruebas estáticas. Los cambios locales anteriores se preservaron.
