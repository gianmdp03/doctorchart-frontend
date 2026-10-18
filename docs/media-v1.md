# Integración de medios v1

Los endpoints y respuestas clínicas se conservan. Las descargas siguen siendo Blob autenticado y privado. No requiere cambios del cliente para la normalización física; se preservaron los cambios anteriores de zona horaria/UI.

Contrato, configuración canónica, límites de recuperación y procedimiento operativo: [arquitectura compartida](../../bycode-image-email-service-go/docs/media-v1.md), [operación y restauración](../../bycode-image-email-service-go/docs/media-operations.md), [ejemplo de variables](../../bycode-image-email-service-go/pkg/media/.env.example).

Archivos de esta integración: Solo esta documentación; no se reescribieron servicios ni componentes.

No hubo deploy, push ni cambios sobre bases existentes. Los backends usan baselines preproducción nuevos; no arrancar el binario nuevo sobre un esquema anterior ni ignorar su fingerprint. Si hay datos/archivos que conservar, preparar inventario y copia transformada verificable antes de habilitarlo; no está autorizado descartarlos. La guía compartida describe rollback y recuperación.

Los assets estáticos de marca, SEO y marketing permanecen como assets del despliegue, fuera del catálogo de archivos subidos por usuarios. Las URLs externas no se importan automáticamente.
