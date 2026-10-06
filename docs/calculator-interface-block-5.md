# Bloque 5: interfaz de calculadoras

El catálogo y las preferencias ya venían del backend, pero los formularios,
campos, preparación de entradas, autocompletado y limpieza de las ocho calculadoras
seguían juntos en `MedicalCalculatorsComponent`. Se completó esa separación.

## Responsabilidades

Cada archivo `*-calculator.component.ts` en
`src/app/features/medical-calculators/calculators` contiene un componente y su
estado de formulario. Su HTML es independiente. Cada calculadora controla:

- Sus campos reactivos y valores iniciales.
- Cuándo hay entradas suficientes para pedir una vista previa.
- Las claves del pedido al backend.
- Su limpieza y los campos que conserva al limpiar.
- Qué datos autocompletar y qué datos quedan pendientes.
- Las etiquetas del resumen de sus entradas en el historial.

`calculator-registry.ts` relaciona el código con el componente, la fábrica del
formulario y su resumen. Crea estados independientes por calculadora y por
instancia de pantalla. Al cambiar de calculadora se recuperan los campos de esa
pantalla; limpiar una calculadora no modifica las demás.

El contenedor conserva catálogo, filtros, favoritos, selección, peticiones al
backend, resultados, historial y mensajes. Monta el formulario elegido con
`NgComponentOutlet`; ya no tiene ramas por código para sus entradas o limpieza.
Los resúmenes se delegan al módulo correspondiente; se eliminó el helper central
anterior y no se conservaron alias de los campos extraídos.

`calculator-form.css` conserva la regla existente del texto de ayuda y usa
`display: contents` en el host de cada formulario para conservar su distribución.
Las etiquetas, controles, clases, unidades, límites y opciones siguen siendo
los de la interfaz anterior. Los resultados y validaciones clínicas continúan
en el backend. El catálogo, su orden y los favoritos iniciales siguen viniendo
del servidor; el registro UI sólo identifica implementaciones visuales.

El autocompletado confirma que la respuesta todavía corresponde al formulario
y paciente de la solicitud. Si cambian mientras espera, no modifica el formulario
nuevo. Si falla el servidor y el contexto sigue vigente, conserva el uso de los
datos del paciente en caché que tenía la pantalla. Un código sin implementación
UI muestra disponibilidad pendiente y no ejecuta otra calculadora como sustituto.

## Agregar una calculadora

1. Crear su estado implementando `CalculatorFormState`, su componente y su HTML.
   El componente recibe su estado mediante el input `form`.
2. Implementar su resumen de entradas y registrar componente, fábrica y resumen
   en `CALCULATOR_UI`. Agregar el código al tipo `CalculatorId`.
3. Agregar su icono a `CALCULATOR_ICONS` si necesita uno específico; el servicio
   ya tiene un icono genérico para los demás códigos.
4. Registrar la fórmula y la definición en el backend según
   [el contrato de calculadoras](../../doctorchart-backend/docs/calculators.md).
   El backend configura los favoritos de la especialidad cuando se deciden.

El contenedor y los formularios de las otras calculadoras no requieren cambios.
Este mecanismo deja la interfaz preparada para agregar cálculos; la composición
de navegación y módulos por especialidad sigue siendo el bloque 12 del plan.

## Verificación y alcance

Antes de la extracción pasaron 35 pruebas de calculadoras. Se capturaron 16
snapshots: los textos, atributos, clases y controles iniciales de los ocho
formularios, y sus ocho mensajes de autocompletado. Las mismas 35 pruebas pasaron
después de la extracción sin actualizar esos snapshots.

La validación final pasó 43 pruebas específicas: además de conservación de la
interfaz y del contrato HTTP, comprueban aislamiento entre calculadoras y
pantallas, retorno a campos anteriores, limpieza, flags, sexo, conservación de
frecuencia y unidad pediátrica, resumen histórico, errores y respuestas tardías.
El chequeo general pasó 397 pruebas en 50 archivos con `npm test -- --watch=false`.

`npm run build` pasó para producción. Conserva el aviso existente del bundle
inicial de aproximadamente 1,25 MB frente al presupuesto de aviso de 1 MB.
Las pruebas de interfaz usan Angular y Vitest; los snapshots comparan texto,
clases y atributos de controles, no capturas de pantalla.

Este cierre modifica sólo el frontend. No modifica el backend, el wizard,
especialidades ni la base de trabajo. No se empezó el bloque 6 ni se crearon
commits automáticamente.
