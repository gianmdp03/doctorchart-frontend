# Bloque 9: mediciones

## Resultado

Ficha, curvas y autocompletado de peso/talla consumen una fuente canónica del backend con unidades explícitas: weightKg, heightCm y headCircumferenceCm. Las consultas persisten una única proyección antropométrica; últimas mediciones e historial se obtienen de ella. El backend también determina cronología, edad y día argentino de los puntos.

Se retiraron el circuito independiente MedicalCheckup, sus llamadas y estado en frontend, la copia adicional de medidas en VitalSigns/Patient, las rutas alternativas y la extracción local de curvas desde consultas/controles. No hay conversión implícita de gramos o milímetros ni adaptadores para campos anteriores. Un peso de 125 kg conserva 125 kg.

## Experiencia conservada

Se mantienen las pestañas y los tres gráficos pediátricos, sus selectores, estilos, referencias OMS y presentación de unidades. La vista sigue mostrando las fechas en dd/MM/aaaa y conserva la precisión de las medidas del banner. No se modificaron definiciones ni motor del wizard, especialidades, formularios de alta/edición ni acciones de consultas.

Las curvas reciben el punto de nacimiento, si está registrado, y las consultas en una sola respuesta del servidor; no se duplica el nacimiento ni se fusionan consultas distintas por fecha/valor. El navegador transforma esa respuesta para dibujar los gráficos. Las referencias/estimaciones aproximadas OMS de presentación conservan su comportamiento; este bloque no cambia criterios clínicos.

Un historial vacío permanece vacío. Si la carga falla, la pantalla muestra error y reintento. El autocompletado no sustituye mediciones ausentes o un error del backend con medidas de la ficha cacheada; avisa y permite ingreso manual. Se conservan las protecciones del bloque 8 ante respuestas de otro paciente/cuenta.

## Persistencia y límites

[Contrato backend](../../doctorchart-backend/docs/measurements.md).

Este bloque requiere el esquema nuevo, sin migración de datos. No se reinició ni modificó la base de trabajo; Hibernate update no elimina las tablas/columnas retiradas. El reset de desarrollo permanece para la fase final acordada. Las verificaciones de persistencia se hicieron exclusivamente en PostgreSQL descartable.

No se avanzó sobre calendario/reglas de vacunación (10), filtros/agregados (11), composición de experiencias por especialidad (12) ni configuración/almacenamiento (13).

## Evidencia

- Antes de editar: 53 pruebas de curvas y ficha frontend y 10 pruebas backend focalizadas aprobadas.
- Frontend completo: 470 pruebas en 53 archivos aprobadas. Se reemplazaron pruebas de extracción/controles retirados por pruebas del contrato canónico, error/reintento, historial vacío y aislamiento de respuestas; también se conservan las pruebas de presentación de calculadoras y gráficos.
- npm run build: producción del navegador y servidor aprobada; permanece el aviso existente de bundle inicial de aproximadamente 1,25 MB frente al presupuesto de 1 MB.
- PostgreSQL descartable: coherencia entre ficha/curvas/autocompletado después de editar, cambiar fecha, vaciar medidas y borrar; consultas parciales y con fecha coincidente; unidades; nacimiento; filtros temporales; propiedad y restricciones de base.
- Gate backend completo: 525 pruebas aprobadas mediante ./mvnw test -Dtest=*,!DoctorchartApplicationTests (Java 25). Se excluye el smoke general sobre H2, como en los bloques anteriores; la persistencia se verifica con PostgreSQL 17 descartable.
- git diff --check en ambos repositorios: sin errores de espacios.

Sin commit para mantener un commit por bloque realizado por el usuario.
