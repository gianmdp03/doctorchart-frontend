# DoctorChart frontend accessibility audit

November 17, 2026

## Scope

Reviewed 80 Angular components, including inline templates, components mounted dynamically in the patient record, feature-flagged routes and local UI libraries. The review covered 24 directives, 68 source stylesheets and the application routes. This audit made component-specific corrections in 56 components. The [coverage inventory](frontend-accessibility-coverage.md) records the outcome for each component.

The source review covered semantics, names and relationships, keyboard operation, focus transitions, validation, feedback, contrast and reflow. References were the current [Vercel Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/) and [Angular accessibility recommendations](https://angular.dev/best-practices/a11y).

## Corrections

| Finding | Correction | WCAG 2.2 criteria addressed |
| --- | --- | --- |
| The workspace skip link could navigate to the root. Some views had nested main landmarks, and routing could leave focus on the document body. | Focus the current skip destination directly, keep one main landmark and focus the page heading after route and specialty changes. Provide distinct route titles and expose the current sidebar link. | 1.3.1, 2.4.1, 2.4.2, 2.4.3 |
| Time selection required tabbing through dozens of values. Consultation type used custom radio roles with native button keyboard behavior. | Group native radios so arrow keys select values and Tab moves between groups. Name calendar dialogs and keep the Argentine date format. | 2.1.1, 4.1.2 |
| Focus could leave record dialogs. Closing the account menu or certain editors could lose the previous focus position. | Cycle focus in the record and revision dialogs, restore focus on Escape and provide explicit entry/exit focus for staff editors and the account disclosure. | 2.1.2, 2.4.3 |
| Several forms exposed field errors visually without a programmatic association or a usable first-error destination. | Connect error and instruction text to controls. Use Angular validation and focus for registration and clinical forms, and native validation where existing booking controls already define constraints. | 3.3.1, 3.3.2, 3.3.3, 4.1.2 |
| Some control names, headings, tables and dynamic messages were difficult to interpret without the visual layout. | Name toggle states, tables and chart points, correct heading levels, add scoped table headers, and expose loading and result updates. | 1.1.1, 1.3.1, 2.5.3, 4.1.2, 4.1.3 |
| Some focus styles were faint or suppressed. The prescription history card overflowed at 320 CSS pixels. | Strengthen field borders and focus rings, underline inline links, honor reduced motion and forced colors, and constrain the prescription grid to the available width. | 1.4.1, 1.4.3, 1.4.10, 1.4.11, 2.4.7, 2.4.11, 2.5.8 |

## Verification

- TypeScript checking passed for the app and local UI libraries. The Angular development build with hashed output prerendered two public routes. All eight static hosting and production configuration checks passed against that build.
- Angular/Vitest passed all 900 tests across 109 files. Node 26 requires `NODE_OPTIONS=--no-experimental-webstorage` for this suite so jsdom provides Web Storage.
- The focused Playwright check passed in Edge. It covered keyboard validation, public booking, skip navigation, the account disclosure, a specialty change with a draft, date/time selection and restoration, both record dialogs, and the prescription view at 320 CSS pixels with dark theme and forced-colors focus.
- All 51 browser fixture cases passed, with 154 axe scans across desktop light, desktop dark and mobile dark layouts. The suite exercised public booking and confirmation, private clinical routes, teleconsultation configuration, schedule editing, secretary views and administration. The retained scans reported zero violations. Two mixed-theme contrast results from an earlier scan cleared in dedicated dark-theme runs and the follow-up scan. The results are in `.angular/accessibility-report/results.json`.
- Additional axe checks ran with the record options, consultation revisions, time picker, date picker and vaccination tooltip open. The Material date picker reported the month/year button issue below. The four other overlays had zero reported violations, and Escape dismissed each overlay.
- In an isolated Edge profile, native 200% zoom and WCAG text-spacing overrides produced no page-level horizontal overflow on the professional landing page, new patient form, schedule editor or staff login. The measured viewport and document widths were both 627 CSS pixels on those pages.
- The deployment-link test reports a pre-existing loopback fallback in `ClinicalNavigationService`. The same line is present in the baseline revision.

The repository has no configured lint target. The keyboard suite and optional axe scan use the existing Playwright fixtures. The axe package was installed under the ignored Angular cache for this audit. Start Angular on `127.0.0.1:4202` and run the following commands in PowerShell.

```powershell
node scripts/verify-frontend-accessibility.cjs
$env:UI_REVIEW_OUTPUT = '.angular/accessibility-report'
$env:UI_AXE_SCRIPT = '.angular/accessibility-tools/node_modules/axe-core/axe.min.js'
node scripts/verify-ui-redesign.cjs
```

## Remaining verification

- Angular Material's date picker announces the month/year switch action and exposes the displayed period in a separate live region. Its built-in switch button omits the visible period from its accessible name, which axe flags under WCAG 2.2 SC 2.5.3. The application supplies the calendar dialog name and localized button labels through the shared picker.
- Axe flagged contrast for manual review in 49 captures, chiefly where graphics, overlays or scroll regions affect its measurement. In 12 captures it could not interpret the arrow glyphs on week navigation and reorder controls. Those controls have action names such as “Semana anterior” and “Subir categoría”.
- Screen-reader speech and device-specific touch behavior need manual verification. Native 200% zoom and custom text-spacing coverage is limited to the four pages above.
- The browser runs intercepted requests with synthetic data. Live sign-in, recovery email, payments, clinical documents, specialist-specific data variations and real booking notifications remain unverified.
- The clinical assistant and calculator routes are disabled. Their source and existing tests were reviewed. Local library components without an application consumer lack integration coverage, including carousel offscreen focus and the standalone Spartan dialog service.
- The fixtures exercise ordinary successes, selected errors and loading states. Remaining transient states and visual combinations require targeted manual review, especially contrast over graphics and hover or focus across long clinical records.
