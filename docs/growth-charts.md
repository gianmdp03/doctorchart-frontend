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

## Síndrome de Down

La referencia visual se digitalizó del PDF de seis páginas del INAN titulado
`curvas-de-crecimiento-ninos-y-ninas-con-sindrome-de-down.pdf`, basado en Myrelid et al.
(2002). El archivo fuente tiene SHA-256
`31cad974af4daf9a5625f38e128b05931865b3d91f9feae6b7c740290b4534dc`.
[Material de patrones del INAN](https://www.inan.gov.py/site/?page_id=235) ·
[Publicación de Myrelid et al.](https://doi.org/10.1136/adc.87.2.97)

### Generación y comprobación

`scripts/digitize-myrelid-2002.py` verifica el hash y extrae los vectores con PyMuPDF.
Las divisiones impresas calibran el eje horizontal en meses de edad y el vertical
en cm para talla o kg/m² para IMC. Se conserva la cuadrícula específica de cada
lámina, incluidas las pequeñas variaciones de espaciado de la página 1.

Las series de −3, 0 y +3 DE se obtienen de sus trazos continuos. Las de −2, −1 y
+1 DE se obtienen de los bordes visibles de las bandas amarilla y verde. Para
+2 DE se enlazan los segmentos de la línea discontinua entre +1 y +3 DE, con
interpolación lineal entre guiones contiguos. En la página 6 se toma el primer
guion de +1 DE en el nacimiento, donde el cierre del relleno verde es diagonal.

El resultado se guarda en `myrelid-2002.json` en el orden −3, −2, −1, 0, +1,
+2 y +3 DE. Se muestrea cada cuarto de mes hasta los 36 meses y luego cada mes,
con muestras adicionales en los extremos de los trazos. Los valores se redondean
a 0,1 de la unidad correspondiente. Para regenerarlo desde la raíz del frontend:

```powershell
py -m pip install pymupdf==2.1
py scripts/digitize-myrelid-2002.py "C:/ruta/curvas-de-crecimiento-ninos-y-ninas-con-sindrome-de-down.pdf"
```

Se verificaron los rótulos de las siete series, su orden vertical, los límites de
los ejes y la superposición de puntos de control sobre el PDF renderizado de las
seis láminas. El mayor desvío observado al comparar los valores interpolados del
JSON con el trazado digitalizado, en los puntos intermedios probados, fue
0,14 cm para talla y 0,11 kg/m² para IMC. Es una medida del muestreo y redondeo de
esta digitalización, no de su exactitud respecto a los datos del estudio.

### Tramos sin valores verificables

La publicación no ofrece las tablas numéricas completas de estas seis láminas.
En los extremos donde el trazo correspondiente termina antes del eje o empieza
después, el JSON usa `null` y el SVG deja el tramo sin dibujar. Los límites
aproximados del trazado visible están expresados en meses:

| Lámina | Serie | Tramo sin datos |
| --- | --- | --- |
| 1 · Niños, talla 0–3 | +2 DE | Después de 35,43780 hasta 36 |
| 2 · Niños, talla 3–18 | +2 DE | Desde 36 hasta antes de 37,34350 |
| 3 · Niñas, talla 0–3 | +2 DE | Después de 35,59720 hasta 36 |
| 3 · Niñas, talla 0–3 | +3 DE | Desde 0 hasta antes de 0,01214 |
| 4 · Niñas, talla 3–18 | −3 DE | Desde 36 hasta antes de 36,03292 |
| 4 · Niñas, talla 3–18 | +2 DE | Desde 36 hasta antes de 36,02378 |
| 5 · Niños, IMC 0–18 | 0 DE | Después de 215,80674 hasta 216 |
| 5 · Niños, IMC 0–18 | +2 DE | Antes de 1,20538 y después de 214,18420 |
| 6 · Niñas, IMC 0–18 | 0 DE | Después de 215,84255 hasta 216 |
| 6 · Niñas, IMC 0–18 | +2 DE | Después de 214,87157 hasta 216 |
| 6 · Niñas, IMC 0–18 | +3 DE | Después de 215,98747 hasta 216 |

### Mediciones del paciente

Se usa el sexo registrado (`SYSTEM_SEX`) exclusivamente para elegir la
referencia gráfica. La edad se ubica en el eje por mes calendario y fracción
entre aniversarios mensuales, usando la fecha de cada medición. La segunda curva
de talla empieza el día del tercer cumpleaños. El día del cumpleaños 18 todavía
se incluye y, a partir del siguiente, se pueden consultar los períodos previos
desde el control de historial cuando hay mediciones compatibles.

Los puntos de talla conservan el valor registrado. Para IMC se usa el peso en kg
dividido por el cuadrado de la talla en metros, ambos de la misma observación,
sin conversiones de postura de la OMS. La ficha identifica la referencia como
una digitalización aproximada y estas series se usan solo como guía gráfica
en DE, sin cálculo de percentiles, puntajes Z ni diagnóstico.
