# DoctorChart

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Profesionales médicos con especialidades independientes; secretarias con permisos
por consultorio; administradores de especialidades; pacientes que reservan turnos.

## Product Purpose

Organizar pacientes, historias clínicas, consultas y turnos en una aplicación
Angular. El rediseño debe conservar las capacidades y los flujos existentes.

## Operating Context

Trabajo clínico frecuente con formularios configurables por especialidad, registros
longitudinales, recetas, estudios y calendarios. La secretaría necesita reconocer
profesional, consultorio, especialidad y modalidad sin ocultar datos operativos.

## Capabilities and Constraints

- Conservar rutas inglesas y redirecciones, permisos, contratos, borradores,
  validaciones, integraciones y reglas de agenda; no modificar el backend.
- Interfaz en español; fechas argentinas mediante el selector compartido.
- Turnos presenciales y teleconsultas con integración Google existente.
- Conservar temas claro/oscuro y ajuste de tamaño de letra.
- Calculadoras y asistente siguen sujetos a sus flags actuales.
- No publicar, desplegar, crear commits ni introducir datos ficticios en producción.

## Brand Commitments

Nombre y marca DoctorChart existentes. Referencias aportadas el 16/11/2026:
agenda Wellness+, flujo MicroLab y directorio de profesionales. Establecen calidad,
claridad, superficies claras, azul/teal/mint y consistencia; no autorizan copiar
contenido, reseñas, precios ni funcionalidades.

## Evidence on Hand

Prompt completo y tres imágenes aportados por el usuario; código, rutas y pruebas
del frontend existente. Inventario de componentes y verificación inicial en
`.angular/ui-inventory-before.json` y `.angular/ui-redesign-baseline-tests.log`.
