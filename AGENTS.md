# UI conventions

- Las rutas y anclas de la web se escriben en inglés; la interfaz sigue en español.
  Las rutas anteriores en español son solo redirecciones de compatibilidad.
  Actualizar juntos router, enlaces, guards, hosting y headers noindex. Conservar
  contratos de API y la suspensión de calculadoras y otras funciones.

- All date inputs and date selectors must use the shared `app-date-picker` Angular Material component. Do not add native HTML `<input type="date">` controls.
- Dates displayed or entered by users use Argentine format `dd/MM/aaaa`. Convert to the ISO format `YYYY-MM-DD` only at the application/data boundary.

# Feature Flags y Módulos Temporales

## Calculadoras Médicas (`CALCULATORS`)
El módulo de calculadoras médicas se encuentra **desactivado temporalmente** por código para la versión inicial.
Cuando el usuario pida reactivar las calculadoras médicas ("activar calculadora", "reactivar calculadora", "habilitar calculadoras", etc.):
1. Abrir `src/app/core/config/feature-flags.ts`.
2. Cambiar `CALCULATORS_ENABLED: false` por `CALCULATORS_ENABLED: true`.
3. Esto reactiva de forma automática y segura:
   - La opción de navegación "Calculadoras" en el menú lateral (`SidebarComponent` vía `WorkspaceStore.navigation`).
   - El botón de acceso rápido de calculadora en el banner del paciente activo (`PatientQuickBannerComponent`).
   - El acceso a la ruta `/calculadoras` en `clinicalNavigationGuard('CALCULATORS')`.
NO eliminar, reescribir ni desarmar componentes en `src/app/features/medical-calculators/` ya que todo el código, lógica clínica, fórmulas y tests están preservados al 100%.

## Operación del VPS compartido

Antes de preparar comandos o cambios para el VPS, leer
[docs/vps-operations.md](docs/vps-operations.md). Contiene el mapa de servicios,
rutas reales, uso de .env.production, construcción por servicio, comprobaciones
posteriores y reinicialización acotada de bases cuando el propietario la autoriza.
Leer esta guía no autoriza commits, pushes, despliegues ni wipes. Preservar las
políticas de esquema y los cambios locales de este repositorio.
