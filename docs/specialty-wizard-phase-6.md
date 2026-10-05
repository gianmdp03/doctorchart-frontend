# Fase 6: pacientes y consultas con formularios canónicos

## Resultado

Pacientes y consultas se crean desde la definición efectiva del workspace del médico. El cliente envía únicamente los valores de entrada, la versión del workspace y, para consultas, paciente, fecha con offset y tipo de atención. El backend decide la especialidad real, guarda el snapshot y contexto de cálculo, aplica los bindings y devuelve los resultados. No recibe plantillas, esquemas, propietarios ni resultados calculados del navegador.

La edición usa el snapshot y la versión del registro. Cambiar el wizard personal o el default administrativo afecta las altas posteriores; conserva el formulario original de los registros existentes. Los valores reemplazan completamente las respuestas anteriores: vaciar un binding opcional también vacía su proyección. Las respuestas ocultas se conservan tipadas, pero no participan de obligatorios, proyecciones ni cálculos mientras estén ocultas.

El renderizador compartido soporta TEXT, TEXTAREA, NUMBER, DATE, SELECT, BOOLEAN y FORMULA. Respeta categorías habilitadas, visibilidad recursiva, límites y opciones del snapshot. Las fechas usan `app-date-picker`, formato argentino y conversión ISO en el límite de datos. Las fórmulas muestran resultados del servidor; una edición indica que se actualizarán al guardar. No se agregó un segundo motor de cálculo en el navegador.

El servidor evalúa IMC, BSA, TFGE, COCKCROFT, CALCIO_CORREGIDO y CUSTOM, con estados explícitos para resultados no disponibles. El contexto conserva fecha argentina, edad, género y mediciones históricas. Una consulta que cambia de fecha reconstruye su contexto con medidas estrictamente anteriores, excluyendo la propia consulta y recuperando peso y talla por separado. Los algoritmos existentes se trasladaron al backend sin introducir expresiones ejecutables ni valores de sexo/edad supuestos.

Los conflictos de versión conservan las respuestas locales y bloquean el reenvío hasta revisar y adoptar expresamente la copia actual. Las altas conservan solo las respuestas compatibles al adoptar un formulario nuevo. La edición de un registro permite consultar su copia remota y descartar expresamente los cambios locales. Las respuestas tardías no restauran formularios, pacientes ni consultas de otro contexto.

La ficha, el timeline y el dashboard muestran los valores usando etiquetas y opciones del snapshot. Las medidas proceden de bindings explícitos y mantienen kg/cm, incluidos pesos de adultos. Editar una consulta refresca timeline, curvas y últimas medidas. El módulo de curvas respeta GROWTH_CHARTS.

Se retiraron FormTemplate, su CRUD, MedicalSpecialty, templateId, dynamicData, snapshotFieldLabels, patientFormData, patientExtraData, patientTemplateSnapshot y la migración de controles a consultas de este circuito. Los controles, estudios, calculadoras independientes y demás funciones fuera del wizard mantienen su contrato propio. El calendario de vacunas ahora escribe mediante un endpoint propio versionado y devuelve el paciente actualizado al padre, conservando datos y versión al reabrir la pestaña.

Los endpoints clínicos exigen identidad del gateway autenticado y propiedad del recurso. El rol Super admin no permite acceder a pacientes de otro propietario. El snapshot se crea bajo bloqueo de lectura del workspace y las actualizaciones usan versiones optimistas del registro. El borrado de pacientes/consultas contempla las referencias de los logs de calculadoras.

## Verificación

Gate final del 05/10/2026:

- Frontend: suite completa, **359 pruebas en 48 archivos**, todas aprobadas, sin errores no controlados.
- Backend: **295 pruebas en 43 clases**, todas aprobadas, sin fallos, errores ni omisiones en la selección. Incluye regresiones de fases 2 y 3 y **11 integraciones clínicas en PostgreSQL 17 descartable**, con JSONB, propiedad, snapshots, versiones concurrentes, bloqueo del workspace, contexto histórico, vacunas y borrado con logs.
- TypeScript de todas las pruebas y compilación de producción para navegador y SSR aprobados.
- Checker compartido del contrato: **47 comprobaciones** aprobadas.
- `git diff --check` aprobado en ambos repositorios.

El backend se ejecutó con Java 25. No se ejecutó `DoctorchartApplicationTests`, el smoke global de contexto sobre H2; las pruebas de persistencia de esta fase usan PostgreSQL real aislado. La compilación Angular conserva la advertencia del presupuesto inicial: **1,25 MB frente a 1 MB**. No se modificaron dependencias ni presupuestos para ocultarla.

Comandos principales:

```powershell
# Frontend
npm.cmd test -- --watch=false
npm.cmd exec tsc -- -p tsconfig.spec.json --noEmit
npm.cmd run build
node ../doctorchart-backend/docs/specialty-wizard/validate-contract.cjs

# Backend, con JAVA_HOME apuntando al JDK 25
.\mvnw.cmd '-Dtest=*Test,!DoctorchartApplicationTests' test
```

## Límite de la fase

No se vació la base de trabajo ni se ejecutó la aplicación contra ella. No hay migración ni adaptación de los datos anteriores. El reset y la comprobación del catálogo inicial se realizan en la fase final. **Pediatría sigue siendo el único seed de producción**; las especialidades inéditas son fixtures de pruebas y no se incorporan al bootstrap.

Detenerse aquí y solicitar continuar antes de iniciar la siguiente fase.
