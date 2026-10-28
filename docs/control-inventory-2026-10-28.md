# Inventario de controles DoctorChart

286 controles declarados en 49 plantillas. Incluye botones, enlaces, summaries, formularios y otros elementos con click/submit. Cada plantilla repetida cuenta una vez; las instancias dependen de datos. 43 están suspendidos (42 de calculadoras y acceso Google).

La tabla documenta revisión estática; una prueba relacionada no equivale a ejecutar cada control con una cuenta real. Las referencias completas están en el JSON, junto con candidatos de evidencia de pruebas por método y archivo. El acceso a calculadoras desde el banner rápido también permanece oculto por feature flag.

| ID | Fuente | Control | Acción/destino | Disabled | Estado |
|---|---|---|---|---|---|
| DC-001 | src/app/components/interaction-status.component.ts:15 | Entendido | click: dismiss() |  | revisión estática |
| DC-002 | src/app/components/scroll-to-top/scroll-to-top.component.ts:9 | Volver al inicio de la página | click: scrollToTop() |  | revisión estática |
| DC-003 | src/app/features/admin-specialties/admin-specialties.component.html:5 | Crear especialidad | click: requestCreate() | busy() \|\| accessDenied() | revisión estática |
| DC-004 | src/app/features/admin-specialties/admin-specialties.component.html:21 | Seguir editando | click: pendingSelection.set(null) | busy() | revisión estática |
| DC-005 | src/app/features/admin-specialties/admin-specialties.component.html:22 | Descartar cambios locales y continuar | click: confirmSelection() | busy() | revisión estática |
| DC-006 | src/app/features/admin-specialties/admin-specialties.component.html:27 | Actualizar lista | click: refreshCatalog() | busy() | revisión estática |
| DC-007 | src/app/features/admin-specialties/admin-specialties.component.html:29 | {{ specialty.name }} {{ specialty.code }} {{ specialty.active ? 'Activa' : 'Inactiva / borrador' }} | click: requestSelect(specialty.id) | busy() | revisión estática |
| DC-008 | src/app/features/admin-specialties/admin-specialties.component.html:45 | Consultar copia del servidor | click: reviewRemote() | busy() | revisión estática |
| DC-009 | src/app/features/admin-specialties/admin-specialties.component.html:48 | Usar copia del servidor y descartar mis cambios locales | click: useRemote() | busy() | revisión estática |
| DC-010 | src/app/features/admin-specialties/admin-specialties.component.html:54 | Recuperar revisión actual | click: refreshCatalog() | busy() | revisión estática |
| DC-011 | src/app/features/admin-specialties/admin-specialties.component.html:65 | Guardar nombre y descripción | click: saveMetadata() | !canEditExisting() \|\| metadataStale() \|\| !metadataDirty() | revisión estática |
| DC-012 | src/app/features/admin-specialties/admin-specialties.component.html:66 | {{ selectedSpecialty()?.active ? 'Desactivar especialidad' : 'Activar especialidad' }} | click: toggleActive() | !canEditExisting() \|\| metadataStale() | revisión estática |
| DC-013 | src/app/features/admin-specialties/admin-specialties.component.html:70 | Volver a cargar el wizard | click: reloadWizard() | busy() | revisión estática |
| DC-014 | src/app/features/admin-specialties/admin-specialties.component.html:89 | Crear como borrador | click: createSpecialty() | readonly() \|\| pendingEditor() | revisión estática |
| DC-015 | src/app/features/admin-specialties/admin-specialties.component.html:91 | Guardar borrador del wizard | click: saveDraft() | !canEditExisting() \|\| metadataStale() \|\| pendingEditor() | revisión estática |
| DC-016 | src/app/features/admin-specialties/admin-specialties.component.html:92 | Guardar y publicar wizard | click: publishWizard() | !canEditExisting() \|\| metadataStale() \|\| pendingEditor() | revisión estática |
| DC-017 | src/app/features/ai-assistant/ai-assistant-page.component.html:2 | ← Volver a Inicio | /dashboard |  | revisión estática |
| DC-018 | src/app/features/ai-assistant/ai-assistant-page.component.html:4 | Reiniciar conversación | click: chatService.clearHistory() |  | revisión estática |
| DC-019 | src/app/features/ai-assistant/ai-assistant-page.component.html:16 | {{ prompt }} | click: onPromptClick(prompt) | chatService.isTyping() | revisión estática |
| DC-020 | src/app/features/ai-assistant/ai-assistant-page.component.html:18 | Tu consulta Enviar | ngSubmit: onSendMessage() |  | revisión estática |
| DC-021 | src/app/features/ai-assistant/ai-assistant-page.component.html:18 | Enviar consulta | onSendMessage() | !inputMessage().trim() \|\| chatService.isTyping() | revisión estática |
| DC-022 | src/app/features/auth/login-page.component.html:3 | ← Volver a DoctorChart | / |  | revisión estática |
| DC-023 | src/app/features/auth/login-page.component.html:20 | Iniciar Sesión | click: setMode('login') | isSubmitting() | revisión estática |
| DC-024 | src/app/features/auth/login-page.component.html:34 | Crear cuenta en Bycode | bycodeRegisterUrl |  | revisión estática |
| DC-025 | src/app/features/auth/login-page.component.html:63 | Tu cuenta sirve para ByCode, Pointly y DoctorChart. Si ya tenés cuenta en alguno, usá esa misma cuenta para iniciar sesión acá. Cada producto tiene su propio plan. @if (g | ngSubmit: onLoginSubmit() |  | revisión estática |
| DC-026 | src/app/features/auth/login-page.component.html:70 | Continuar con Google | click: handleGoogleOAuth() | isSubmitting() | suspendido |
| DC-027 | src/app/features/auth/login-page.component.html:118 | @if (showPassword()) { } @else { } | click: togglePasswordVisibility() |  | revisión estática |
| DC-028 | src/app/features/auth/login-page.component.html:139 | @if (isSubmitting()) { Iniciando sesión... } @else { Ingresar a DoctorChart } | onLoginSubmit() | isSubmitting() | revisión estática |
| DC-029 | src/app/features/auth/no-plan.component.ts:17 | Ver planes en Bycode | plansUrl |  | revisión estática |
| DC-030 | src/app/features/auth/no-plan.component.ts:18 | {{ busy() ? 'Verificando plan…' : 'Ya contraté un plan: verificar acceso' }} | click: checkPlan() | busy() | revisión estática |
| DC-031 | src/app/features/auth/no-plan.component.ts:22 | Cerrar sesión | click: signOut() | busy() | revisión estática |
| DC-032 | src/app/features/auth/user-profile-page.component.html:2 | ← Volver a Inicio | /dashboard |  | revisión estática |
| DC-033 | src/app/features/auth/user-profile-page.component.html:15 | {{ isSubmitting() ? 'Cerrando sesión...' : 'Cerrar sesión' }} | click: handleSignOut() | isSubmitting() | revisión estática |
| DC-034 | src/app/features/consultas/consultas.component.html:23 | Reintentar | click: loadConsultations() |  | revisión estática |
| DC-035 | src/app/features/consultas/consultas.component.html:51 | {{ c.patientName }} | click: openPatientRecord(c.patientId) |  | revisión estática |
| DC-036 | src/app/features/consultas/consultas.component.html:67 | Ver Detalle | click: openEncounterDetail(c.id) |  | revisión estática |
| DC-037 | src/app/features/consultas/consultas.component.html:75 | Ficha → | click: openPatientRecord(c.patientId) |  | revisión estática |
| DC-038 | src/app/features/consultas/consultas.component.html:99 | {{ isLoadingMore() ? 'Cargando…' : 'Cargar más consultas' }} | click: loadMore() | isLoadingMore() \|\| isLoading() | revisión estática |
| DC-039 | src/app/features/dashboard/dashboard.component.html:14 | Reintentar | click: loadKpiData() |  | revisión estática |
| DC-040 | src/app/features/dashboard/dashboard.component.html:33 | Ver directorio | /patients |  | revisión estática |
| DC-041 | src/app/features/dashboard/dashboard.component.html:94 | Ver historial completo | /encounters |  | revisión estática |
| DC-042 | src/app/features/dashboard/dashboard.component.html:110 | Actualizar | click: refreshRecentActivity() | isLoadingRecentPage() | revisión estática |
| DC-043 | src/app/features/dashboard/dashboard.component.html:142 | Reintentar consultas | click: loadRecentPage(recentPage()) |  | revisión estática |
| DC-044 | src/app/features/dashboard/dashboard.component.html:196 | Ver consulta | click: openEncounterDetail(encounter.id, $event) |  | revisión estática |
| DC-045 | src/app/features/dashboard/dashboard.component.html:204 | Ficha | click: openPatient(encounter.patientId) |  | revisión estática |
| DC-046 | src/app/features/dashboard/dashboard.component.html:223 | Página anterior de consultas | click: loadRecentPage(recentPage() - 1) | recentPage() === 0 | revisión estática |
| DC-047 | src/app/features/dashboard/dashboard.component.html:232 | {{ page + 1 }} | click: loadRecentPage(page) |  | revisión estática |
| DC-048 | src/app/features/dashboard/dashboard.component.html:242 | Página siguiente de consultas | click: loadRecentPage(recentPage() + 1) | recentPage() + 1 >= recentTotalPages() | revisión estática |
| DC-049 | src/app/features/dashboard/dashboard.component.html:270 | Limpiar búsqueda | click: clearRecentSearch() |  | revisión estática |
| DC-050 | src/app/features/dashboard/dashboard.component.html:302 | Reintentar | click: loadDirectory(directoryPage(), directorySearch()) |  | revisión estática |
| DC-051 | src/app/features/dashboard/dashboard.component.html:336 | Abrir ficha | click: openPatient(patient.id) |  | revisión estática |
| DC-052 | src/app/features/dashboard/dashboard.component.html:354 | Anterior | click: loadDirectory(directoryPage() - 1, directorySearch()) | directoryPage() === 0 | revisión estática |
| DC-053 | src/app/features/dashboard/dashboard.component.html:361 | = directoryTotalPages()" (click)="loadDirectory(directoryPage() + 1, directorySearch())" > Siguiente | click: loadDirectory(directoryPage() + 1, directorySearch()) | directoryPage() + 1 >= directoryTotalPages() | revisión estática |
| DC-054 | src/app/features/dashboard/dashboard.component.html:385 | Directorio de pacientes Consultar fichas y evoluciones | /patients |  | revisión estática |
| DC-055 | src/app/features/dashboard/dashboard.component.html:421 | @if (isSavingNotes()) { Guardando... } @else { Guardar } | click: saveNotes() | isSavingNotes() | revisión estática |
| DC-056 | src/app/features/dashboard/upcoming-follow-ups.component.html:17 | Reintentar | click: retry.emit() |  | revisión estática |
| DC-057 | src/app/features/dashboard/upcoming-follow-ups.component.html:35 | {{ item.initials }} {{ item.patientFullName }} Ver ficha del paciente | ['/patients', item.patientId] |  | revisión estática |
| DC-058 | src/app/features/encounter-detail/encounter-detail-page.component.html:2 | {{ record.patientFullName \|\| 'Ficha del paciente' }} | ['/patients', record.patientId] |  | revisión estática |
| DC-059 | src/app/features/encounter-detail/encounter-detail-page.component.html:5 | ← Volver a la historia del paciente | ['/patients', record.patientId] |  | revisión estática |
| DC-060 | src/app/features/encounter-detail/encounter-detail-page.component.html:7 | Reintentar | click: loadEncounter(requestedId()!) |  | revisión estática |
| DC-061 | src/app/features/encounter-detail/encounter-detail-page.component.html:14 | Ver ficha del paciente → | ['/patients', record.patientId] |  | revisión estática |
| DC-062 | src/app/features/encounter-detail/encounter-detail-page.component.html:17 | Consultar copia del servidor | click: reviewRemote() | isLoading() | revisión estática |
| DC-063 | src/app/features/encounter-detail/encounter-detail-page.component.html:18 | Usar copia del servidor y descartar mi edición local | click: useRemoteRecord() | isLoading() | revisión estática |
| DC-064 | src/app/features/encounter-detail/encounter-detail-page.component.html:28 | Cancelar edición | click: cancelEditing() | isSubmitting() | revisión estática |
| DC-065 | src/app/features/encounter-detail/encounter-detail-page.component.html:29 | {{ isSubmitting() ? 'Guardando...' : 'Guardar cambios' }} | click: save() | readonly() | revisión estática |
| DC-066 | src/app/features/encounter-detail/encounter-detail-page.component.html:31 | Editar consulta | click: startEditing() |  | revisión estática |
| DC-067 | src/app/features/encounter-form/encounter-form.component.html:15 | ← Volver a historia clínica | click: onCancel() |  | revisión estática |
| DC-068 | src/app/features/encounter-form/encounter-form.component.html:41 | Consultar configuración actual | click: reviewRemote() | isLoading() | revisión estática |
| DC-069 | src/app/features/encounter-form/encounter-form.component.html:46 | Usar formulario actual y conservar respuestas compatibles | click: useRemoteWorkspace() | isLoading() | revisión estática |
| DC-070 | src/app/features/encounter-form/encounter-form.component.html:96 | @if (consultationType() === type.value) { } {{ type.label }} | click: selectConsultationType(type.value) | readonly() | revisión estática |
| DC-071 | src/app/features/encounter-form/encounter-form.component.html:136 | Volver a cargar | click: loadForm() |  | revisión estática |
| DC-072 | src/app/features/encounter-form/encounter-form.component.html:143 | Cancelar | click: onCancel() | isSubmitting() | revisión estática |
| DC-073 | src/app/features/encounter-form/encounter-form.component.html:151 | {{ isSubmitting() ? 'Guardando...' : 'Guardar historia clínica' }} | click: submitEncounter() | readonly() \|\| !definition() | revisión estática |
| DC-074 | src/app/features/form-field-editor/form-field-editor.component.html:10 | {{ category.title }} {{ category.fields.length }} campos | click: selectCategory(category.key) |  | revisión estática |
| DC-075 | src/app/features/form-field-editor/form-field-editor.component.html:14 | ↑ | click: moveCategory(category.key, -1) | readonly() \|\| i === 0 | revisión estática |
| DC-076 | src/app/features/form-field-editor/form-field-editor.component.html:15 | ↓ | click: moveCategory(category.key, 1) | readonly() \|\| i === categories().length - 1 | revisión estática |
| DC-077 | src/app/features/form-field-editor/form-field-editor.component.html:16 | {{ category.enabled ? 'Activa' : 'Inactiva' }} | click: toggleCategory(category.key) | readonly() \|\| category.system | revisión estática |
| DC-078 | src/app/features/form-field-editor/form-field-editor.component.html:24 | Agregar categoría | click: addCategory() | readonly() | revisión estática |
| DC-079 | src/app/features/form-field-editor/form-field-editor.component.html:35 | Eliminar categoría | click: deleteCategory(category.key) | readonly() | revisión estática |
| DC-080 | src/app/features/form-field-editor/form-field-editor.component.html:44 | Agregar posición de longitud / estatura | click: addMeasurementMode() | readonly() | revisión estática |
| DC-081 | src/app/features/form-field-editor/form-field-editor.component.html:56 | ↑ | click: moveField(category.key, field.key, -1) | readonly() \|\| fi === 0 | revisión estática |
| DC-082 | src/app/features/form-field-editor/form-field-editor.component.html:57 | ↓ | click: moveField(category.key, field.key, 1) | readonly() \|\| fi === category.fields.length - 1 | revisión estática |
| DC-083 | src/app/features/form-field-editor/form-field-editor.component.html:58 | Editar | click: openField(category.key, field.key) | readonly() | revisión estática |
| DC-084 | src/app/features/form-field-editor/form-field-editor.component.html:59 | Duplicar | click: duplicateField(category.key, field.key) | readonly() | revisión estática |
| DC-085 | src/app/features/form-field-editor/form-field-editor.component.html:60 | Eliminar | click: deleteField(category.key, field.key) | readonly() | revisión estática |
| DC-086 | src/app/features/form-field-editor/form-field-editor.component.html:68 | Agregar campo | click: openField(category.key) | readonly() | revisión estática |
| DC-087 | src/app/features/form-field-editor/form-field-editor.component.html:79 | Volver a los campos | click: closeField() |  | revisión estática |
| DC-088 | src/app/features/form-field-editor/form-field-editor.component.html:100 | Eliminar | click: deleteOption(oi) |  | revisión estática |
| DC-089 | src/app/features/form-field-editor/form-field-editor.component.html:102 | Agregar opción | click: addOption() |  | revisión estática |
| DC-090 | src/app/features/form-field-editor/form-field-editor.component.html:121 | Cancelar | click: closeField() |  | revisión estática |
| DC-091 | src/app/features/form-field-editor/form-field-editor.component.html:121 | Aplicar campo | click: saveField() | readonly() | revisión estática |
| DC-092 | src/app/features/landing/landing.component.html:1 | Ir al contenido | #main-content |  | revisión estática |
| DC-093 | src/app/features/landing/landing.component.html:4 | DoctorChart, inicio | / |  | revisión estática |
| DC-094 | src/app/features/landing/landing.component.html:8 | Funciones | #features |  | revisión estática |
| DC-095 | src/app/features/landing/landing.component.html:8 | Cómo funciona | #how-it-works |  | revisión estática |
| DC-096 | src/app/features/landing/landing.component.html:9 | Preguntas frecuentes | #faq |  | revisión estática |
| DC-097 | src/app/features/landing/landing.component.html:12 | Iniciar sesión | /login |  | revisión estática |
| DC-098 | src/app/features/landing/landing.component.html:26 | ByCode ↗ | bycodeUrl |  | revisión estática |
| DC-099 | src/app/features/landing/landing.component.html:30 | Ingresar a DoctorChart | /login |  | revisión estática |
| DC-100 | src/app/features/landing/landing.component.html:32 | Conocé las funciones ↗ | #features |  | revisión estática |
| DC-101 | src/app/features/landing/landing.component.html:137 | Ir a iniciar sesión | /login |  | revisión estática |
| DC-102 | src/app/features/landing/landing.component.html:161 | {{ faq.question }} + | nativo/directiva |  | revisión estática |
| DC-103 | src/app/features/landing/landing.component.html:171 | Iniciar sesión | /login |  | revisión estática |
| DC-104 | src/app/features/landing/landing.component.html:175 | DoctorChart | / |  | revisión estática |
| DC-105 | src/app/features/landing/landing.component.html:178 | Iniciar sesión ↗ | /login |  | revisión estática |
| DC-106 | src/app/features/medical-calculators/calculators/cockcroft-calculator.component.html:70 | Masculino (Factor 1.00) | click: form().gender.set('MALE') |  | suspendido |
| DC-107 | src/app/features/medical-calculators/calculators/cockcroft-calculator.component.html:78 | Femenino (Factor 0.85) | click: form().gender.set('FEMALE') |  | suspendido |
| DC-108 | src/app/features/medical-calculators/calculators/pediatric-dosage-calculator.component.html:45 | mg/kg/día | click: form().doseUnit.set('mg/kg/dia') |  | suspendido |
| DC-109 | src/app/features/medical-calculators/calculators/pediatric-dosage-calculator.component.html:53 | mg/kg/dosis | click: form().doseUnit.set('mg/kg/dosis') |  | suspendido |
| DC-110 | src/app/features/medical-calculators/calculators/tfge-calculator.component.html:48 | Masculino | click: form().gender.set('MALE') |  | suspendido |
| DC-111 | src/app/features/medical-calculators/calculators/tfge-calculator.component.html:56 | Femenino | click: form().gender.set('FEMALE') |  | suspendido |
| DC-112 | src/app/features/medical-calculators/medical-calculators.component.html:8 | Reintentar | click: loadCalculatorSetup() | isLoadingSetup() | suspendido |
| DC-113 | src/app/features/medical-calculators/medical-calculators.component.html:14 | Conservar historial | click: pendingHistoryClear.set(false) |  | suspendido |
| DC-114 | src/app/features/medical-calculators/medical-calculators.component.html:14 | Vaciar historial | click: confirmClearSessionHistory() |  | suspendido |
| DC-115 | src/app/features/medical-calculators/medical-calculators.component.html:33 | Calculadoras | click: activeTab.set('calculator') |  | suspendido |
| DC-116 | src/app/features/medical-calculators/medical-calculators.component.html:42 | Historial Clínico @if (activePatient()) { ({{ patientBackendHistory().length }}) } | click: activeTab.set('history') |  | suspendido |
| DC-117 | src/app/features/medical-calculators/medical-calculators.component.html:53 | Mis Cálculos ({{ myCalculatorsCodes().length }}) | click: openCatalog() |  | suspendido |
| DC-118 | src/app/features/medical-calculators/medical-calculators.component.html:98 | @if (isAutofilling()) { Consultando historia... } @else { Autocompletar datos del paciente } | click: autofillFromPatient() | isAutofilling() | suspendido |
| DC-119 | src/app/features/medical-calculators/medical-calculators.component.html:143 | {{ fav.shortName }} | click: selectCalculator(fav.id) |  | suspendido |
| DC-120 | src/app/features/medical-calculators/medical-calculators.component.html:152 | Catálogo | click: openCatalog() |  | suspendido |
| DC-121 | src/app/features/medical-calculators/medical-calculators.component.html:181 | Todas | click: categoryFilter.set('all') |  | suspendido |
| DC-122 | src/app/features/medical-calculators/medical-calculators.component.html:189 | Pediatría | click: categoryFilter.set('pediatria') |  | suspendido |
| DC-123 | src/app/features/medical-calculators/medical-calculators.component.html:197 | Nefrología | click: categoryFilter.set('nefrologia') |  | suspendido |
| DC-124 | src/app/features/medical-calculators/medical-calculators.component.html:205 | Cardiología | click: categoryFilter.set('cardiologia') |  | suspendido |
| DC-125 | src/app/features/medical-calculators/medical-calculators.component.html:213 | Antropometría | click: categoryFilter.set('antropometria') |  | suspendido |
| DC-126 | src/app/features/medical-calculators/medical-calculators.component.html:221 | Metabolismo | click: categoryFilter.set('metabolismo') |  | suspendido |
| DC-127 | src/app/features/medical-calculators/medical-calculators.component.html:234 | {{ item.name }} @if (myCalculatorsCodes().includes(item.id)) { ★ } {{ item.categoryLabel }} | click: selectCalculator(item.id) |  | suspendido |
| DC-128 | src/app/features/medical-calculators/medical-calculators.component.html:275 | Limpiar | click: resetCurrentInputs() |  | suspendido |
| DC-129 | src/app/features/medical-calculators/medical-calculators.component.html:356 | @if (copyFeedback()) { ¡Copiado al portapapeles! } @else { Copiar para Evolución } | click: copyResultText() |  | suspendido |
| DC-130 | src/app/features/medical-calculators/medical-calculators.component.html:372 | @if (isSavingLog()) { Guardando... } @else if (saveFeedback()) { ¡Guardado con éxito! } @else { {{ activePatient() ? 'Guardar en Historial Clínico' : 'Guardar en la sesió | click: saveResultToRecord() | isSavingLog() | suspendido |
| DC-131 | src/app/features/medical-calculators/medical-calculators.component.html:438 | Vaciar historial local | click: clearSessionHistory() |  | suspendido |
| DC-132 | src/app/features/medical-calculators/medical-calculators.component.html:485 | Actualizar | click: loadPatientHistory() | isLoadingHistory() | suspendido |
| DC-133 | src/app/features/medical-calculators/medical-calculators.component.html:503 | {{ log.calculationName }} {{ log.formattedResult }} @if (log.severity) { {{ log.severity \| uppercase }} } {{ log.createdAt \| date: 'dd/MM/yyyy HH:mm' }} @if (expandedHi | click: toggleExpandLog(log.id) |  | suspendido |
| DC-134 | src/app/features/medical-calculators/medical-calculators.component.html:526 | Expandir detalles | nativo/directiva |  | suspendido |
| DC-135 | src/app/features/medical-calculators/medical-calculators.component.html:546 | Copiar Evolución | click: copyHistoryEvolution(log.plainTextEvolution) |  | suspendido |
| DC-136 | src/app/features/medical-calculators/medical-calculators.component.html:624 | Copiar | click: copyHistoryEvolution(item.plainTextEvolution) |  | suspendido |
| DC-137 | src/app/features/medical-calculators/medical-calculators.component.html:659 | Volver a calculadoras | click: closeCatalog() |  | suspendido |
| DC-138 | src/app/features/medical-calculators/medical-calculators.component.html:682 | Todas | click: catalogCategoryFilter.set('all') |  | suspendido |
| DC-139 | src/app/features/medical-calculators/medical-calculators.component.html:690 | Pediatría | click: catalogCategoryFilter.set('pediatria') |  | suspendido |
| DC-140 | src/app/features/medical-calculators/medical-calculators.component.html:698 | Cardiología | click: catalogCategoryFilter.set('cardiologia') |  | suspendido |
| DC-141 | src/app/features/medical-calculators/medical-calculators.component.html:706 | Nefrología | click: catalogCategoryFilter.set('nefrologia') |  | suspendido |
| DC-142 | src/app/features/medical-calculators/medical-calculators.component.html:714 | Antropometría | click: catalogCategoryFilter.set('antropometria') |  | suspendido |
| DC-143 | src/app/features/medical-calculators/medical-calculators.component.html:722 | Metabolismo | click: catalogCategoryFilter.set('metabolismo') |  | suspendido |
| DC-144 | src/app/features/medical-calculators/medical-calculators.component.html:753 | Quitar de mi panel | click: toggleFavoriteCalculator(item.id) | isUpdatingPreferences() | suspendido |
| DC-145 | src/app/features/medical-calculators/medical-calculators.component.html:762 | Añadir a mi panel | click: toggleFavoriteCalculator(item.id) | isUpdatingPreferences() | suspendido |
| DC-146 | src/app/features/medical-calculators/medical-calculators.component.html:782 | Restaurar recomendados por especialidad | click: restoreSpecialtyDefaults() | isUpdatingPreferences() | suspendido |
| DC-147 | src/app/features/medical-calculators/medical-calculators.component.html:793 | Listo | click: closeCatalog() |  | suspendido |
| DC-148 | src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.html:11 | Restablecer valores iniciales | click: showResetConfirmation.set(true) | editorReadonly() | revisión estática |
| DC-149 | src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.html:13 | Salir conservando borrador | click: exitWizard() | editorReadonly() | revisión estática |
| DC-150 | src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.html:15 | Guardar y cerrar sesión | click: handleSignOut() | editorReadonly() | revisión estática |
| DC-151 | src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.html:41 | @if (index } @else { {{ index + 1 }} } Paso {{ index + 1 }} {{ step.title }} | click: goToStep(index) | editorReadonly() \|\| (isEditMode() && step.kind === 'specialty') | revisión estática |
| DC-152 | src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.html:75 | Consultar copia del servidor | click: reviewServerCopy() | isSaving() | revisión estática |
| DC-153 | src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.html:80 | Usar copia del servidor y descartar mis cambios locales | click: useServerCopy() | isSaving() | revisión estática |
| DC-154 | src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.html:86 | Intentar cargar nuevamente | click: loadInitial(true) |  | revisión estática |
| DC-155 | src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.html:92 | Conservar mi borrador | click: showResetConfirmation.set(false) | isSaving() | revisión estática |
| DC-156 | src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.html:93 | Restablecer el borrador | click: confirmResetToDefaults() | editorReadonly() | revisión estática |
| DC-157 | src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.html:99 | Seguir editando | click: showDiscardConfirmation.set(false) | isSaving() | revisión estática |
| DC-158 | src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.html:100 | Descartar y volver al panel | click: cancelWizard() | editorReadonly() | revisión estática |
| DC-159 | src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.html:109 | {{ showPatientCategories() ? 'Volver al paso actual' : 'Organizar todas las categorías de la ficha' }} | click: showPatientCategories.set(!showPatientCategories()) |  | revisión estática |
| DC-160 | src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.html:130 | Revisar la selección de especialidad | click: goToStep(0) | editorReadonly() | revisión estática |
| DC-161 | src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.html:137 | Anterior | click: goPrevious() | editorReadonly() | revisión estática |
| DC-162 | src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.html:140 | Descartar edición | click: showDiscardConfirmation.set(true) | editorReadonly() | revisión estática |
| DC-163 | src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.html:144 | Guardar borrador | click: saveProgress() | editorReadonly() | revisión estática |
| DC-164 | src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.html:146 | @if (isSaving()) { Guardando... } @else if (isEditMode()) { Aplicar cambios } @else { Finalizar configuración } | click: finishOnboarding() | editorReadonly() | revisión estática |
| DC-165 | src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.html:151 | Siguiente | click: goNext() | editorReadonly() | revisión estática |
| DC-166 | src/app/features/onboarding/specialty-selection/specialty-selection.component.html:6 | Cerrar sesión | click: handleSignOut() | isSubmitting() | revisión estática |
| DC-167 | src/app/features/onboarding/specialty-selection/specialty-selection.component.html:22 | Volver a cargar la configuración | click: loadSpecialties(true) | isLoading() | revisión estática |
| DC-168 | src/app/features/onboarding/specialty-selection/specialty-selection.component.html:29 | {{ item.name }} @if (item.description) { {{ item.description }} } | click: select(item.id) | isSubmitting() \|\| hasConflict() | revisión estática |
| DC-169 | src/app/features/onboarding/specialty-selection/specialty-selection.component.html:48 | @if (isSubmitting()) { Guardando... } @else { Continuar } | click: confirmSpecialty() | !selectedSpecialtyItem() \|\| isSubmitting() \|\| hasConflict() | revisión estática |
| DC-170 | src/app/features/onboarding/specialty-selection/specialty-selection.component.html:55 | Intentar cargar nuevamente | click: loadSpecialties(true) |  | revisión estática |
| DC-171 | src/app/features/patient-form/patient-form-page.component.html:5 | {{ isEditMode() ? 'Volver a la Ficha' : 'Volver al Directorio' }} | click: cancel() |  | revisión estática |
| DC-172 | src/app/features/patient-form/patient-form-page.component.html:46 | Consultar copia del servidor | click: reviewRemote() | isLoading() \|\| isSubmitting() | revisión estática |
| DC-173 | src/app/features/patient-form/patient-form-page.component.html:58 | Usar formulario actual y conservar respuestas | click: useRemoteWorkspace() | isLoading() | revisión estática |
| DC-174 | src/app/features/patient-form/patient-form-page.component.html:72 | Usar ficha del servidor y descartar cambios locales | click: useRemoteRecord() | isLoading() | revisión estática |
| DC-175 | src/app/features/patient-form/patient-form-page.component.html:100 | Cancelar | click: cancel() | isSubmitting() | revisión estática |
| DC-176 | src/app/features/patient-form/patient-form-page.component.html:108 | {{ isSubmitting() ? 'Guardando...' : isEditMode() ? 'Guardar Cambios' : 'Crear Paciente' }} | click: submit() | readonly() \|\| !definition() | revisión estática |
| DC-177 | src/app/features/patient-form/patient-form-page.component.html:120 | Reintentar | click: ngOnInit() |  | revisión estática |
| DC-178 | src/app/features/patient-list/patient-list.component.html:30 | Limpiar búsqueda | click: clearSearch() |  | revisión estática |
| DC-179 | src/app/features/patient-list/patient-list.component.html:41 | + Nuevo paciente | click: createPatient() |  | revisión estática |
| DC-180 | src/app/features/patient-list/patient-list.component.html:54 | Todos Todas las edades | click: setFilter('ALL') |  | revisión estática |
| DC-181 | src/app/features/patient-list/patient-list.component.html:67 | {{ filter.name }} ({{ filter.range }}) | click: setFilter(filter.value) |  | revisión estática |
| DC-182 | src/app/features/patient-list/patient-list.component.html:77 | Vacunación Pendiente | click: setFilter('VACCINE_PENDING') |  | revisión estática |
| DC-183 | src/app/features/patient-list/patient-list.component.html:85 | Lactantes (0-12m) | click: setFilter('INFANT') |  | revisión estática |
| DC-184 | src/app/features/patient-list/patient-list.component.html:95 | Primera Infancia Etapa de crecimiento | click: setFilter('TODDLER') |  | revisión estática |
| DC-185 | src/app/features/patient-list/patient-list.component.html:106 | Vacunación Pendiente | click: setFilter('VACCINE_PENDING') |  | revisión estática |
| DC-186 | src/app/features/patient-list/patient-list.component.html:117 | Adultos (≥ 18 años) | click: setFilter('ADULT') |  | revisión estática |
| DC-187 | src/app/features/patient-list/patient-list.component.html:126 | Menores ( | click: setFilter('MINOR') |  | revisión estática |
| DC-188 | src/app/features/patient-list/patient-list.component.html:141 | Reintentar | click: loadInitial() |  | revisión estática |
| DC-189 | src/app/features/patient-list/patient-list.component.html:145 | {{ patient.initials }} {{ patient.fullName }} {{ patient.ageDisplay }} · {{ patient.dni }} › | click: selectPatient(patient) |  | revisión estática |
| DC-190 | src/app/features/patient-list/patient-list.component.html:148 | Más datos | nativo/directiva |  | revisión estática |
| DC-191 | src/app/features/patient-list/patient-list.component.html:148 | Abrir ficha → | click: selectPatient(patient) |  | revisión estática |
| DC-192 | src/app/features/patient-list/patient-list.component.html:272 | Ver Ficha | click: selectPatient(patient) |  | revisión estática |
| DC-193 | src/app/features/patient-list/patient-list.component.html:305 | Restablecer Filtros | click: resetFilters() |  | revisión estática |
| DC-194 | src/app/features/patient-record/clinical-timeline/clinical-timeline.component.html:5 | Expandir todo | click: expandAll() |  | revisión estática |
| DC-195 | src/app/features/patient-record/clinical-timeline/clinical-timeline.component.html:7 | Colapsar todo | click: collapseAll() |  | revisión estática |
| DC-196 | src/app/features/patient-record/clinical-timeline/clinical-timeline.component.html:13 | Todas | click: setPreset('ALL') |  | revisión estática |
| DC-197 | src/app/features/patient-record/clinical-timeline/clinical-timeline.component.html:21 | 30 días | click: setPreset('LAST_30') |  | revisión estática |
| DC-198 | src/app/features/patient-record/clinical-timeline/clinical-timeline.component.html:29 | 90 días | click: setPreset('LAST_90') |  | revisión estática |
| DC-199 | src/app/features/patient-record/clinical-timeline/clinical-timeline.component.html:37 | Este año | click: setPreset('THIS_YEAR') |  | revisión estática |
| DC-200 | src/app/features/patient-record/clinical-timeline/clinical-timeline.component.html:68 | ✕ Limpiar | click: clearDateFilter() |  | revisión estática |
| DC-201 | src/app/features/patient-record/clinical-timeline/clinical-timeline.component.html:89 | + Nueva historia clínica | click: createEncounter() |  | revisión estática |
| DC-202 | src/app/features/patient-record/clinical-timeline/clinical-timeline.component.html:104 | Quitar filtro de fechas | click: clearDateFilter() |  | revisión estática |
| DC-203 | src/app/features/patient-record/clinical-timeline/clinical-timeline.component.html:112 | + Nueva historia clínica | click: createEncounter() |  | revisión estática |
| DC-204 | src/app/features/patient-record/clinical-timeline/clinical-timeline.component.html:123 | {{ encounterPatientName(encounter) }} {{ formatDate(encounter.encounterDate) }}@if (formatTime(encounter.encounterDate); as time) { · {{ time }} } | click: toggleCard(encounter.id) |  | revisión estática |
| DC-205 | src/app/features/patient-record/clinical-timeline/clinical-timeline.component.html:127 | Ver detalle | click: onViewCard(encounter.id, $event) |  | revisión estática |
| DC-206 | src/app/features/patient-record/clinical-timeline/clinical-timeline.component.html:145 | Ver detalle | click: onViewCard(encounter.id, $event) |  | revisión estática |
| DC-207 | src/app/features/patient-record/clinical-timeline/clinical-timeline.component.html:146 |  | click: onDeleteCard(encounter.id, $event) |  | revisión estática |
| DC-208 | src/app/features/patient-record/growth-chart/growth-chart.component.html:79 | {{ expandedFrame() ? 'Volver al marco del PDF' : 'Ampliar ejes para ver las mediciones' }} | click: expandedFrame.set(!expandedFrame()) |  | revisión estática |
| DC-209 | src/app/features/patient-record/growth-chart/growth-chart.component.html:243 |  | focus: showPoint(point, origin); blur: hidePoint(); keydown.escape: hidePoint(); click: showPoint(point, origin) |  | revisión estática |
| DC-210 | src/app/features/patient-record/growth-chart/growth-chart.component.html:352 | {{ definition().reference.replace('WHO', 'OMS') }} · fuente oficial | definition().source |  | revisión estática |
| DC-211 | src/app/features/patient-record/growth-chart/growth-chart.component.html:360 | Detalle de {{ chart().points.length }} mediciones | nativo/directiva |  | revisión estática |
| DC-212 | src/app/features/patient-record/patient-banner/patient-banner.component.html:4 | Directorio | click: goBack() |  | revisión estática |
| DC-213 | src/app/features/patient-record/patient-banner/patient-banner.component.html:96 | {{ presentation.label }} | click: runAction(action.id) |  | revisión estática |
| DC-214 | src/app/features/patient-record/patient-encounters/patient-encounters.component.html:5 | Conservar consulta | click: history.pendingDeleteId.set(null) | history.isDeleting() | revisión estática |
| DC-215 | src/app/features/patient-record/patient-encounters/patient-encounters.component.html:6 | {{ history.isDeleting() ? 'Eliminando...' : 'Eliminar consulta' }} | click: history.confirmDeleteEncounter() | history.isDeleting() | revisión estática |
| DC-216 | src/app/features/patient-record/patient-growth/patient-growth.component.html:7 | Reintentar | click: growth.reload() |  | revisión estática |
| DC-217 | src/app/features/patient-record/patient-growth/patient-growth.component.html:21 | Confirmar referencia femenina | click: growth.confirmSex('FEMALE') |  | revisión estática |
| DC-218 | src/app/features/patient-record/patient-growth/patient-growth.component.html:24 | Confirmar referencia masculina | click: growth.confirmSex('MALE') |  | revisión estática |
| DC-219 | src/app/features/patient-record/patient-growth/patient-growth.component.html:41 | Revisar referencia confirmada | click: growth.clearSexConfirmation() |  | revisión estática |
| DC-220 | src/app/features/patient-record/patient-growth/patient-growth.component.html:82 | {{ category.title }} {{ category.count }} | click: growth.selectedGrowthMetric.set(category.indicator) |  | revisión estática |
| DC-221 | src/app/features/patient-record/patient-growth/patient-growth.component.html:93 | Ver todos los gráficos disponibles | click: growth.selectedGrowthMetric.set('ALL') |  | revisión estática |
| DC-222 | src/app/features/patient-record/patient-prescriptions/patient-prescriptions.component.html:24 | {{ editor.rxFormMode() === 'STUDY' ? 'Imprimir Orden de Estudios' : 'Imprimir Receta Médica' }} | click: editor.printRecord(latestEncounter()) | editor.rxBusy() | revisión estática |
| DC-223 | src/app/features/patient-record/patient-prescriptions/patient-prescriptions.component.html:46 | Recetar Medicación @if (editor.draftPrescriptions().length > 0) { {{ editor.draftPrescriptions().length }} } | click: editor.setRxFormMode('MEDICATION') |  | revisión estática |
| DC-224 | src/app/features/patient-record/patient-prescriptions/patient-prescriptions.component.html:60 | Solicitar Estudios / Prácticas @if (editor.draftStudies().length > 0) { {{ editor.draftStudies().length }} } | click: editor.setRxFormMode('STUDY') |  | revisión estática |
| DC-225 | src/app/features/patient-record/patient-prescriptions/patient-prescriptions.component.html:184 | Agregar medicamento a la receta | click: editor.addMedicationToDraft() |  | revisión estática |
| DC-226 | src/app/features/patient-record/patient-prescriptions/patient-prescriptions.component.html:226 | Quitar medicamento | click: editor.removeMedicationFromDraft(i) |  | revisión estática |
| DC-227 | src/app/features/patient-record/patient-prescriptions/patient-prescriptions.component.html:251 | + {{ sug }} | click: editor.selectQuickStudy(sug) |  | revisión estática |
| DC-228 | src/app/features/patient-record/patient-prescriptions/patient-prescriptions.component.html:297 | Agregar estudio a la orden | click: editor.addStudyToDraft() |  | revisión estática |
| DC-229 | src/app/features/patient-record/patient-prescriptions/patient-prescriptions.component.html:318 | Quitar estudio | click: editor.removeStudyFromDraft(i) |  | revisión estática |
| DC-230 | src/app/features/patient-record/patient-prescriptions/patient-prescriptions.component.html:372 | Limpiar formulario | click: editor.clearRxForm() |  | revisión estática |
| DC-231 | src/app/features/patient-record/patient-prescriptions/patient-prescriptions.component.html:377 | Guardar en Historial | click: editor.saveCurrentRxToHistory() | editor.rxBusy() | revisión estática |
| DC-232 | src/app/features/patient-record/patient-prescriptions/patient-prescriptions.component.html:387 | {{ editor.rxFormMode() === 'STUDY' ? 'Emitir e Imprimir Orden de Estudios' : 'Emitir e Imprimir Receta Médica' }} | click: editor.printRecord(latestEncounter()) | editor.rxBusy() | revisión estática |
| DC-233 | src/app/features/patient-record/patient-prescriptions/patient-prescriptions.component.html:427 | Reintentar | click: editor.prescriptionStore.reload() |  | revisión estática |
| DC-234 | src/app/features/patient-record/patient-prescriptions/patient-prescriptions.component.html:470 | Imprimir | click: editor.reprintSavedRecord(rec) | editor.rxBusy() | revisión estática |
| DC-235 | src/app/features/patient-record/patient-prescriptions/patient-prescriptions.component.html:481 | Eliminar registro | click: editor.deleteSavedRecord(rec.id) | editor.rxBusy() | revisión estática |
| DC-236 | src/app/features/patient-record/patient-record.component.html:21 | {{ tab.label }} @if (tab.badge != null && tab.badge !== '') { {{ tab.badge }} } | click: setTab(tab.id) |  | revisión estática |
| DC-237 | src/app/features/patient-record/patient-record.component.html:65 | Ir al Directorio de Pacientes | click: navigateToPatients() |  | revisión estática |
| DC-238 | src/app/features/patient-record/patient-record.component.html:69 | + Registrar Nuevo Paciente | click: editPatient($event) |  | revisión estática |
| DC-239 | src/app/features/patient-record/patient-studies/patient-studies.component.html:19 | Conservar estudio | click: pendingDelete.set(null) | isDeleting() | revisión estática |
| DC-240 | src/app/features/patient-record/patient-studies/patient-studies.component.html:20 | {{ isDeleting() ? 'Eliminando...' : 'Eliminar estudio' }} | click: confirmDeleteStudy() | isDeleting() | revisión estática |
| DC-241 | src/app/features/patient-record/patient-studies/patient-studies.component.html:45 | Archivo o Imagen * {{ selectedFile() ? 'Cambiar archivo' : 'Seleccionar archivo / foto' }} @if (selectedFile(); as file) { {{ file.name }} ✕ } @else { PDF o Imágenes (JPG | ngSubmit: submitUpload() |  | revisión estática |
| DC-242 | src/app/features/patient-record/patient-studies/patient-studies.component.html:62 | {{ selectedFile() ? 'Cambiar archivo' : 'Seleccionar archivo / foto' }} | click: fileInput.click() | isUploading() | revisión estática |
| DC-243 | src/app/features/patient-record/patient-studies/patient-studies.component.html:74 | ✕ | click: clearSelectedFile() | isUploading() | revisión estática |
| DC-244 | src/app/features/patient-record/patient-studies/patient-studies.component.html:122 | @if (isUploading()) { Subiendo y procesando estudio… } @else { Subir y Guardar Estudio } | submitUpload() | !!fileError() \|\| !!nameError() \|\| !!descriptionError() \|\| isUploading() | revisión estática |
| DC-245 | src/app/features/patient-record/patient-studies/patient-studies.component.html:148 | Cerrar vista | click: closeStudyPreview() |  | revisión estática |
| DC-246 | src/app/features/patient-record/patient-studies/patient-studies.component.html:171 | Descargar | click: downloadStudy(study) |  | revisión estática |
| DC-247 | src/app/features/patient-record/patient-studies/patient-studies.component.html:242 | Ver | click: openStudyPreview(study) |  | revisión estática |
| DC-248 | src/app/features/patient-record/patient-studies/patient-studies.component.html:254 | Descargar | click: downloadStudy(study) |  | revisión estática |
| DC-249 | src/app/features/patient-record/patient-studies/patient-studies.component.html:264 | Eliminar estudio | click: deleteStudy(study) |  | revisión estática |
| DC-250 | src/app/features/patient-record/patient-summary/patient-summary.component.html:11 | Editar datos | click: editPatient.emit() |  | revisión estática |
| DC-251 | src/app/features/patient-record/patient-vaccinations/patient-vaccinations.component.html:12 | Actualizar y reintentar | click: refresh() | isSaving() \|\| isLoading() | revisión estática |
| DC-252 | src/app/features/patient-record/patient-vaccinations/patient-vaccinations.component.html:63 | Próximas vacunas (orden cronológico) {{ futureDoses().length }} Click para ver dosis futuras | nativo/directiva |  | revisión estática |
| DC-253 | src/app/features/vaccination-calendar/calendario-vacunacion.component.html:25 | Indicaciones y referencia | nativo/directiva |  | revisión estática |
| DC-254 | src/app/features/vaccination-calendar/calendario-vacunacion.component.html:76 | ({{ reference.numero }}) | mouseenter: showTooltip($event, 'Patología prevenida', reference.descripcion); mouseleave: hideTooltip(); focus: showTooltip($event, 'Patología prevenida', reference.descripcion); blur: hideTooltip() |  | revisión estática |
| DC-255 | src/app/features/vaccination-calendar/calendario-vacunacion.component.html:97 | ({{ note.letra }}) | mouseenter: showTooltip($event, 'Condición de aplicación', note.condicion); mouseleave: hideTooltip(); focus: showTooltip($event, 'Condición de aplicación', note.condicion); blur: hideTooltip() |  | revisión estática |
| DC-256 | src/app/features/vaccination-calendar/calendario-vacunacion.component.html:128 | ({{ reference.numero }}) | mouseenter: showTooltip($event, 'Patología prevenida', reference.descripcion); mouseleave: hideTooltip(); focus: showTooltip($event, 'Patología prevenida', reference.descripcion); blur: hideTooltip() |  | revisión estática |
| DC-257 | src/app/features/vaccination-calendar/calendario-vacunacion.component.html:149 | ({{ note.letra }}) | mouseenter: showTooltip($event, 'Condición de aplicación', note.condicion); mouseleave: hideTooltip(); focus: showTooltip($event, 'Condición de aplicación', note.condicion); blur: hideTooltip() |  | revisión estática |
| DC-258 | src/app/features/vaccination-calendar/calendario-vacunacion.component.html:178 | Patologías prevenidas | nativo/directiva |  | revisión estática |
| DC-259 | src/app/features/vaccination-calendar/calendario-vacunacion.component.html:190 | Notas y condiciones de aplicación | nativo/directiva |  | revisión estática |
| DC-260 | src/app/layout/header/header.component.html:15 | Ir a ByCode | bycodeUrl |  | revisión estática |
| DC-261 | src/app/layout/header/header.component.html:21 | Ajustar tamaño de letra de la plataforma | click: accessibilityService.toggleFontSize() |  | revisión estática |
| DC-262 | src/app/layout/header/header.component.html:36 |  | click: toggleProfileMenu($event) |  | revisión estática |
| DC-263 | src/app/layout/header/header.component.html:47 | {{ bycodeAccount.name() \|\| 'Mi cuenta' }} {{ authService.userEmail() }} @if (planBadgeLabel()) { {{ planBadgeLabel() }} } Editar perfil en Bycode @if (!authService.isSu | click: $event.stopPropagation() |  | revisión estática |
| DC-264 | src/app/layout/header/header.component.html:58 | Editar perfil en Bycode | bycodeAccount.editUrl |  | revisión estática |
| DC-265 | src/app/layout/header/header.component.html:61 | Planes y Suscripción ByCode | bycodePlansUrl |  | revisión estática |
| DC-266 | src/app/layout/header/header.component.html:71 | Perfil Profesional | click: handleProfileClick() |  | revisión estática |
| DC-267 | src/app/layout/header/header.component.html:82 | {{ authService.isSuperAdmin() ? 'Especialidades y wizards' : 'Personalizar Fichas y Consultas' }} | click: openWizardConfig() |  | revisión estática |
| DC-268 | src/app/layout/header/header.component.html:93 | Cerrar Sesión | click: handleSignOut() |  | revisión estática |
| DC-269 | src/app/layout/main-nav/main-nav.component.html:2 | Ficha Clínica Integral | /records |  | revisión estática |
| DC-270 | src/app/layout/main-nav/main-nav.component.html:14 | Directorio de Pacientes | /patients |  | revisión estática |
| DC-271 | src/app/layout/patient-quick-banner/patient-quick-banner.component.html:9 | ⇄ Cambiar Paciente | /patients |  | revisión estática |
| DC-272 | src/app/layout/patient-quick-banner/patient-quick-banner.component.html:57 | Calculadora | /calculators |  | revisión estática |
| DC-273 | src/app/layout/patient-quick-banner/patient-quick-banner.component.html:82 | Ver Directorio / Seleccionar | /patients |  | revisión estática |
| DC-274 | src/app/layout/private-shell/private-shell.component.html:20 | Entendido | click: documents.errorMessage.set(null) |  | revisión estática |
| DC-275 | src/app/layout/private-shell/private-shell.component.html:32 | Reintentar | click: retrySetup() |  | revisión estática |
| DC-276 | src/app/layout/private-shell/private-shell.component.html:33 | Cerrar sesión | click: authService.signOut() |  | revisión estática |
| DC-277 | src/app/layout/private-shell/private-shell.component.html:59 | Entendido | click: documents.errorMessage.set(null) |  | revisión estática |
| DC-278 | src/app/layout/private-shell/private-shell.component.html:67 | Asistente clínico → | /assistant |  | revisión estática |
| DC-279 | src/app/layout/private-shell/private-shell.component.html:68 | Entendido | click: documents.errorMessage.set(null) |  | revisión estática |
| DC-280 | src/app/layout/sidebar/sidebar.component.html:14 | Navegación principal | click: collapseAfterNavigation() |  | revisión estática |
| DC-281 | src/app/layout/sidebar/sidebar.component.html:17 | Especialidades y wizards | /admin/specialties |  | revisión estática |
| DC-282 | src/app/layout/sidebar/sidebar.component.html:29 | {{ item.label }} | item.path |  | revisión estática |
| DC-283 | src/app/layout/sidebar/sidebar.component.html:39 | @if (isCollapsed()) { } @else { } | click: toggleCollapse() |  | revisión estática |
| DC-284 | src/app/pages/not-found/not-found.component.ts:3 | Volver al inicio | / |  | revisión estática |
| DC-285 | src/app/shared/components/theme-toggle/theme-toggle.component.ts:11 | {{ themeService.theme() === 'dark' ? 'Modo claro' : 'Modo oscuro' }} | click: themeService.toggle() |  | revisión estática |
| DC-286 | src/app/shared/date-picker/date-picker.component.html:2 |  | click: !isDisabled() && picker.open(); input: onTextInput($any($event.target).value); dateChange: selectDate($event.value, $any($event.targetElement).value); blur: markTouched() | isDisabled() | revisión estática |
