# Auditoría local de agenda y teleconsultas

Desde el checkout del backend, prepará y arrancá el laboratorio descartable M6 con Docker Desktop en modo Linux.

```powershell
node ops/testing/specialty-m6-lab.mjs prepare
node ops/testing/specialty-m6-lab.mjs build
node ops/testing/specialty-m6-lab.mjs up
```

Desde el checkout del frontend, compilá Angular, creá la segunda cuenta médica de ensayo y levantá el servidor en una terminal dedicada.

```powershell
npx ng build --configuration m6-lab
node scripts/agenda-audit.cjs --fixture
node scripts/specialty-contexts-m6-real.cjs --serve
```

En otra terminal del frontend ejecutá la auditoría con Chrome. La variable `DOCTORCHART_AUDIT_OUTPUT` permite elegir la ubicación de los resultados. Si la omitís, el script crea un directorio único en la carpeta temporal. `results.json` contiene los casos, las dependencias bloqueadas, las respuestas HTTP de error y los eventos de consola. El script guarda las capturas junto al JSON y devuelve un código distinto de cero si hay casos fallidos o bloqueados.

```powershell
$env:DOCTORCHART_AUDIT_OUTPUT = Join-Path $env:TEMP ('doctorchart-agenda-audit-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
New-Item -ItemType Directory -Force $env:DOCTORCHART_AUDIT_OUTPUT | Out-Null
node scripts/agenda-audit.cjs 2>&1 | Tee-Object -FilePath (Join-Path $env:DOCTORCHART_AUDIT_OUTPUT 'playwright.log')
```

Para repetir, ejecutá `node ops/testing/specialty-m6-lab.mjs reset-e2e` desde el backend. El comando reinicia exclusivamente la base descartable M6 que verifica por etiqueta, identidad y puerto. Elegí otro directorio de resultados para preservar la corrida anterior. Para terminar, detené el servidor Angular y ejecutá `node ops/testing/specialty-m6-lab.mjs down` desde el backend.

Las escrituras funcionales se hacen en Angular. La prueba de permisos comprueba también las respuestas HTTP con la sesión real de secretaría. El laboratorio utiliza el adaptador local de identidad y facturación y captura correo con Mailpit.
