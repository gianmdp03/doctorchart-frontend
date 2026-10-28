# Referencias del chat original: Bycode y Pointly

Estas rutas son **referencias relativas** a repositorios que no están incluidos en esta skill. Verificar archivos reales antes de usarlos; no afirmar que fueron inspeccionados si están inaccesibles.

## 1. Portada de Bycode — aprobación visual más fuerte

Repositorio `bycode-frontend`:

- `src/app/pages/home/home.component.html`
- `src/app/pages/home/home.component.ts`
- `src/personal-theme.css`
- `src/app/components/navbar/navbar.component.html`
- `src/app/components/navbar/navbar.component.css`

Aprender un hero que explica el ecosistema mediante contenido real; alternancia de presentación, explicación, comparación, preguntas y acción; relación entre productos sin inventar una suscripción compartida; preservación de contenido con nueva organización. La sección Contacto reciente fue implementada pero no recibió aprobación posterior confirmada.

## 2. Espacio autenticado y aplicaciones de Bycode

Repositorio `bycode-frontend`:

- `src/app/components/workspace-shell/workspace-shell.component.html`
- `src/app/components/workspace-shell/workspace-shell.component.ts`
- `src/app/pages/company-panel/company-panel.component.html`
- `src/app/pages/company-panel/company-panel.component.ts`
- `src/personal-theme.css`

Aprender separación de navegación y contenido, agrupación de cada app con plan/vigencia/acciones, diferencia entre abrir/renovar/mejorar y navegación inferior móvil que conserva perfil, ayuda y salida. No consta aprobación de cada pantalla individual.

## 3. Perfil y recorte de foto de Bycode

Repositorio `bycode-frontend`:

- `src/app/pages/account/account.component.html`
- `src/app/pages/account/account-photo.component.html`
- `src/app/pages/account/account-photo.component.ts`
- `src/app/components/account-avatar/account-avatar.component.ts`
- `src/app/services/account-profile.service.ts`

Aprender separación de identidad, edición y seguridad; campos de solo lectura explicados; flujo elegir → ajustar → confirmar → ver resultado; alternativas al arrastre; guardado, errores, eliminación y limpieza de recursos temporales.

## 4. Selección en tarjetas de Pointly — preferencia explícita

Repositorio `pointly-frontend`:

- `src/choice-cards.css`
- `src/app/pages/company-detail/components/modals/reward-modal/reward-modal.html`
- `src/app/pages/company-detail/components/modals/product-modal/product-modal.html`

Aprender tarjeta completamente seleccionable, radio nativo y teclado, selección por borde/color/check, opción explicada y campos condicionales. El nombre heredado `modals` no autoriza reintroducir overlays.

## 5. Catálogo de premios de Pointly — correcciones concretas

Repositorio `pointly-frontend`:

- `src/app/pages/client-wallet/client-wallet-catalog.html`
- `src/app/pages/client-wallet/client-wallet-catalog.css`
- `src/app/components/reward-art/reward-art.css`

Aprender marco estable para foto/placeholder/voucher; contenido flexible; bloque inferior alineado por estructura (por ejemplo flex con `margin-top: auto`); cifras largas; «Te alcanza» como información distinguible de la coordinación de canje. Diseñar familias de tarjetas para datos variables.
