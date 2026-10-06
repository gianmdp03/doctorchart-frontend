# Bloque 6: persistencia de recetas y órdenes

El historial independiente de la pestaña «Recetas y Órdenes» ahora se guarda en
backend. Se conserva la carga de medicamentos y estudios, incluidos documentos
con ambas listas, el diagnóstico, las instrucciones, el orden de los ítems,
el guardado, la eliminación y la reimpresión.

## Contrato y propiedad

La API usa /api/doctorchart/patients/{patientId}/prescriptions:

| Método | Ruta relativa | Resultado |
| --- | --- | --- |
| GET | / | Historial por fecha de emisión e ID descendentes |
| POST | / | Documento persistido; 201 con Location |
| GET | /{recordId} | Documento autorizado para reimprimir |
| DELETE | /{recordId} | Eliminación confirmada; 204 |

El cliente envía únicamente type, diagnosisDescription, generalInstructions,
prescriptions y diagnosticOrders. ID y createdAt los genera el servidor;
authorUserId proviene de la identidad autenticada. patientId se toma de la
ruta y exige propiedad del paciente. No se admiten propiedades desconocidas,
identificadores ni fechas enviados por el navegador. Tampoco existe excepción
de acceso para administradores a pacientes de otros médicos.

El documento es independiente de las consultas del wizard: emitir una receta
no crea ni altera una consulta. Su contenido no se edita después de emitido;
se mantiene la eliminación que ya ofrecía la interfaz.

## Pantalla y errores

PatientPrescriptionService contiene el contrato HTTP. PatientPrescriptionStore
es local a la pantalla y administra historial, carga y operaciones pendientes.
El componente conserva el formulario y la presentación actual.

Guardar agrega el registro al historial después de la confirmación del servidor.
Emitir e imprimir primero guarda y luego abre el modal con el documento devuelto.
Reimprimir consulta nuevamente el documento guardado. Eliminar modifica la lista
cuando el servidor confirma. Durante una operación se impiden envíos simultáneos.
Los errores se muestran y conservan el borrador o registro; la carga fallida del
historial muestra Reintentar y no se interpreta como un historial vacío.

Cambiar de paciente limpia este formulario y cancela las suscripciones anteriores
para evitar asociar el borrador o una respuesta pendiente al paciente siguiente.
El resto del contexto de sesión continúa en el bloque 8.

## Esquema y alcance

El backend agrega tres tablas: patient_prescription_records,
prescription_medications y prescription_diagnostic_orders. Hay claves foráneas
paciente–documento y documento–ítems, además de posiciones que conservan el orden.
Eliminar un paciente también elimina sus documentos e ítems mediante el cascade
JPA, junto al resto de sus registros. El autor referencia la identidad externa
usada por la autenticación; no requiere la existencia de un perfil de impresión.

La configuración actual de Hibernate crea las tablas nuevas al iniciar el backend.
No se ejecutaron cambios contra la base de trabajo. Se eliminó el camino de
localStorage: no hay lectura, migración, fallback ni adaptador para las recetas
anteriores del navegador.

El bloque 7 sigue pendiente: perfil y credenciales de impresión, contenido inventado
y el fallback anterior que imprime desde una consulta o medicación habitual cuando
no hay borrador ni documentos guardados. Este bloque conecta al modal los registros
persistidos y sus identificadores; no da por reparado el resto de la impresión.

## Evidencia

- Antes del cambio: 15 pruebas de PatientRecordComponent aprobadas.
- Después: 23 pruebas de pantalla y 9 pruebas de store con HttpClient real y servidor
  HTTP de prueba; incluyen respuestas tardías, errores, doble clic y recuperación.
- Suite frontend: 414 pruebas en 51 archivos, aprobadas.
- Build de producción: aprobado; conserva el aviso previo de bundle inicial de
  aproximadamente 1,25 MB frente al presupuesto informativo de 1 MB.
- Backend: 49 pruebas del circuito completo HTTP, filtro de autenticación,
  permisos, servicios, JPA y PostgreSQL descartable, aprobadas.
- Suite backend: 515 pruebas aprobadas mediante mvnw -Dtest=*,!DoctorchartApplicationTests test.
  Se mantiene la exclusión del smoke test con configuración H2; no se probó contra
  la base de aplicación.

Contrato detallado: [prescripciones backend](../../doctorchart-backend/docs/prescriptions.md).
