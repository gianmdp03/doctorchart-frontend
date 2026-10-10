# Evolución y Curvas OMS

El módulo usa un componente Angular reutilizable con D3 y SVG. Los cálculos LMS, edades científicas, referencias y compatibilidad de medidas se centralizan en el backend. El catálogo implementa las veinte láminas de `curvas_oms.pdf`; las pestañas muestran las referencias aplicables al paciente y permiten consultar períodos históricos.

La documentación completa de arquitectura, archivos, inventario de 20 gráficos, fuentes oficiales, metodología LMS, pruebas, diferencias del PDF y ejecución está en el repositorio vecino:

[Documentación de curvas OMS](../../doctorchart-backend-go/docs/growth-charts.md)

Pruebas del frontend:

```powershell
npx ng test --watch=false --exclude='src/app/features/medical-calculators/**'
npx ng build --configuration production
npx playwright install chromium
npm run test:growth:visual
```

El último comando genera las 20 vistas de referencia del componente real, tres vistas con mediciones de prueba (corazones, estrellas e IMC) y cuatro capturas móviles en `test-results/growth`, junto con `checks.json`. Si se usa Chrome ya instalado: `$env:PLAYWRIGHT_CHROME_CHANNEL = 'chrome'`. Se deben inspeccionar las capturas contra las once páginas del PDF; el runner comprueba geometría básica, tamaño y colores de marcadores, separación del IMC, recorte, etiquetas y desbordamiento. Las imágenes son evidencia y no forman parte de las curvas de producción.

Los fixtures bajo `core/testing` se usan exclusivamente en pruebas. La ficha obtiene datos reales mediante `/patients/{id}/growth`. Las confirmaciones de sexo de referencia y posición de medición se limitan a esa ficha; el historial se conserva. Personalizar fichas permite añadir una posición documentada en nuevas consultas.

Las mediciones se representan con corazones rosas para la referencia femenina y estrellas azules para la masculina, en un marco de 9 × 9 unidades SVG. Los valores sin evaluación mantienen el marcador delineado. La leyenda, el foco con teclado y el detalle acompañan cada medición. En el IMC OMS 2006 que abarca ambos períodos, se señalan longitud (0–2 años) y estatura (2–5 años), con una separación a los dos años y cuadrícula secundaria más tenue; las curvas y la trayectoria del paciente no se unen a través del cambio de referencia.
