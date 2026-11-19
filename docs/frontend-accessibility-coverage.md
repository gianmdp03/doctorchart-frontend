# Frontend accessibility coverage

80 Angular components reviewed. 56 received component-specific changes. Shared stylesheet changes can also affect components listed as reviewed. Runtime coverage and exceptions are summarized in the [audit report](frontend-accessibility-audit.md).

| Component | Source outcome | Reviewed behavior or limitation |
| --- | --- | --- |
| [HlmCarouselNext](../libs/ui/carousel/src/lib/hlm-carousel-next.ts) | Corrected | Localized the next control label. |
| [HlmCarouselPrevious](../libs/ui/carousel/src/lib/hlm-carousel-previous.ts) | Corrected | Localized the previous control label. |
| [HlmCarouselSlideDisplay](../libs/ui/carousel/src/lib/hlm-carousel-slide-display.ts) | Reviewed | Decorative count is excluded from the accessibility tree. No application consumer found. |
| [HlmCarousel](../libs/ui/carousel/src/lib/hlm-carousel.ts) | Corrected | Localized semantics and made arrow navigation respect orientation, RTL and text-entry controls. The local library has no application consumer. Offscreen slide focus and plugin-driven motion were not exercised. |
| [HlmDialogContent](../libs/ui/dialog/src/lib/hlm-dialog-content.ts) | Corrected | Localized the close button name. Dialog service and focus behavior require a consuming instance. |
| [HlmDialog](../libs/ui/dialog/src/lib/hlm-dialog.ts) | Reviewed | Delegates modal behavior to Spartan Brain. No application consumer found. |
| [HlmSwitch](../libs/ui/switch/src/lib/hlm-switch.ts) | Reviewed | Forwards names, descriptions and state to Spartan Brain. No application consumer found. |
| [App](../src/app/app.ts) | Corrected | Focuses routed content and handles the initial fallback route layout. |
| [InteractionStatusComponent](../src/app/components/interaction-status.component.ts) | Reviewed | Loading, error and success announcements and named close control. Rapid toast expiry still has limited manual coverage. |
| [ScrollToTopComponent](../src/app/components/scroll-to-top/scroll-to-top.component.ts) | Corrected | Moves focus to content when returning to the top. |
| [AdminSpecialtiesComponent](../src/app/features/admin-specialties/admin-specialties.component.ts) | Corrected | Uses the shell landmark and raises the visibility of focus rings. |
| [AiAssistantPageComponent](../src/app/features/ai-assistant/ai-assistant-page.component.ts) | Corrected | Names the message log and prompts group. The feature flag is disabled. Runtime coverage is limited to existing component tests and source review because the route is disabled. |
| [AppointmentsPageComponent](../src/app/features/appointments/appointments-page.component.ts) | Corrected | Skip link, booking focus, native validation, instructions and submission announcements. |
| [ConfirmationPageComponent](../src/app/features/appointments/confirmation-page.component.ts) | Corrected | Labels the code instructions and focuses the recovered receipt. |
| [PublicBookingReceiptComponent](../src/app/features/appointments/public-booking-receipt.component.ts) | Reviewed | Static named section and definition list. Only the current booking and confirmation pages have route coverage. |
| [PublicationPageComponent](../src/app/features/appointments/publication-page.component.ts) | Corrected | Removes the nested main landmark. |
| [LoginPageComponent](../src/app/features/auth/login-page.component.ts) | Corrected | Focuses the first invalid field, identifies credential purposes and underlines the registration link. |
| [NoPlanComponent](../src/app/features/auth/no-plan.component.ts) | Reviewed | Main landmark, distinct heading, links and status feedback. |
| [RegisterPageComponent](../src/app/features/auth/register-page.component.ts) | Corrected | Associates field errors, focuses the first invalid control and announces the confirmation view. |
| [UserProfilePageComponent](../src/app/features/auth/user-profile-page.component.ts) | Reviewed | Profile heading, professional data and sign-out controls. |
| [AgendaComponent](../src/app/features/calendar/agenda.component.ts) | Corrected | Names the date picker dialog. Reviewed the scrollable calendar grid, booking buttons and slots. |
| [CalendarPageComponent](../src/app/features/calendar/calendar-page.component.ts) | Corrected | Landmark nesting, date labels, manual form validation and the record link target. |
| [ClinicFormPageComponent](../src/app/features/clinics/clinic-form-page.component.ts) | Corrected | Associates location errors and focuses the first invalid editable field. |
| [ClinicsPageComponent](../src/app/features/clinics/clinics-page.component.ts) | Reviewed | Action labels, filter pressed states and scrollable table with column headers. |
| [ConsultasComponent](../src/app/features/consultas/consultas.component.ts) | Corrected | Names the table, scopes headers and announces loading. |
| [DashboardComponent](../src/app/features/dashboard/dashboard.component.ts) | Corrected | Corrects the recent consultations list, table headers and section headings. |
| [UpcomingFollowUpsComponent](../src/app/features/dashboard/upcoming-follow-ups.component.ts) | Reviewed | Named status, grouped date headings and patient links. |
| [ClinicalHistoryFieldsComponent](../src/app/features/dynamic-form-renderer/clinical-history-fields.component.ts) | Corrected | Associates history detail errors and adapts heading levels to the form context. |
| [DynamicFormRendererComponent](../src/app/features/dynamic-form-renderer/dynamic-form-renderer.component.ts) | Corrected | Associates requirements, units and errors and focuses invalid inputs after render. |
| [EncounterDetailPageComponent](../src/app/features/encounter-detail/encounter-detail-page.component.ts) | Corrected | Cycles focus within the revisions dialog. |
| [ClinicalHistoryReferenceComponent](../src/app/features/encounter-form/clinical-history-reference.component.ts) | Reviewed | Named complementary section and native review button. |
| [EncounterFormComponent](../src/app/features/encounter-form/encounter-form.component.ts) | Corrected | Uses native radio controls, keeps the locked state static and corrects the heading. |
| [FormFieldEditorComponent](../src/app/features/form-field-editor/form-field-editor.component.ts) | Corrected | Unique headings for repeated editors and more specific control names. |
| [LandingComponent](../src/app/features/landing/landing.component.ts) | Corrected | Focusable skip destination and in-page anchors that respect the active route. |
| [BmiCalculatorComponent](../src/app/features/medical-calculators/calculators/bmi-calculator.component.ts) | Reviewed | Label associations and bounded numeric inputs. Calculators are disabled. |
| [CalciumCalculatorComponent](../src/app/features/medical-calculators/calculators/calcium-calculator.component.ts) | Reviewed | Label associations and numeric input units. Calculators are disabled. |
| [ChadsVascCalculatorComponent](../src/app/features/medical-calculators/calculators/chads-vasc-calculator.component.ts) | Reviewed | Age label and checkbox labels. Calculators are disabled. |
| [CockcroftCalculatorComponent](../src/app/features/medical-calculators/calculators/cockcroft-calculator.component.ts) | Corrected | Groups the sex options and exposes selection state. Route disabled. |
| [HollidaySegarCalculatorComponent](../src/app/features/medical-calculators/calculators/holliday-segar-calculator.component.ts) | Reviewed | Weight label, units and input bounds. Calculators are disabled. |
| [MostellerCalculatorComponent](../src/app/features/medical-calculators/calculators/mosteller-calculator.component.ts) | Reviewed | Weight and height labels with numeric constraints. Calculators are disabled. |
| [PediatricDosageCalculatorComponent](../src/app/features/medical-calculators/calculators/pediatric-dosage-calculator.component.ts) | Corrected | Names both concentration fields and exposes dose unit selection. Route disabled. |
| [TfgeCalculatorComponent](../src/app/features/medical-calculators/calculators/tfge-calculator.component.ts) | Corrected | Groups the sex options and exposes selection state. Route disabled. |
| [MedicalCalculatorsComponent](../src/app/features/medical-calculators/medical-calculators.component.ts) | Corrected | A native disclosure for clinical calculation history and labels for search and filtering. Route disabled. Runtime coverage is limited to existing component tests and source review because the route is disabled. |
| [OnboardingWizardComponent](../src/app/features/onboarding/onboarding-wizard/onboarding-wizard.component.ts) | Corrected | Level-one editor heading and focus after saving a step change. |
| [SpecialtySelectionComponent](../src/app/features/onboarding/specialty-selection/specialty-selection.component.ts) | Corrected | Removes the nested main landmark and strengthens keyboard focus. |
| [PatientFormPageComponent](../src/app/features/patient-form/patient-form-page.component.ts) | Corrected | Names the form section, fixes the heading hierarchy and uses one main landmark. |
| [PatientListComponent](../src/app/features/patient-list/patient-list.component.ts) | Corrected | Mobile empty state, accessible row actions, named loading and a keyboard control for further pages. |
| [AnnulmentPromptComponent](../src/app/features/patient-record/annulment-prompt.component.ts) | Reviewed | Wrapped required reason field, native submit and busy state. |
| [ClinicalAccessComponent](../src/app/features/patient-record/clinical-access.component.ts) | Corrected | Focus on opening and closing audit history. |
| [ClinicalDocumentToolsComponent](../src/app/features/patient-record/clinical-document-tools.component.ts) | Reviewed | Native actions and explicit status/error feedback. Real issued-document actions require an authorized service and clinical fixture. |
| [ClinicalRevisionsComponent](../src/app/features/patient-record/clinical-revisions.component.ts) | Reviewed | Native disclosures and loading feedback. Actual archive retrieval and attachment download were not exercised against a live service. |
| [ClinicalTimelineComponent](../src/app/features/patient-record/clinical-timeline/clinical-timeline.component.ts) | Corrected | Distinct names for the custom date picker dialogs. Reviewed date presets and preview disclosures. |
| [GrowthChartComponent](../src/app/features/patient-record/growth-chart/growth-chart.component.ts) | Corrected | Exposes chart points under a named SVG group and names the measurement table. |
| [PatientBannerComponent](../src/app/features/patient-record/patient-banner/patient-banner.component.ts) | Corrected | Removes duplicate banner semantics and hides decorative initials. |
| [PatientEncountersComponent](../src/app/features/patient-record/patient-encounters/patient-encounters.component.ts) | Reviewed | Composition of the timeline, encounter form and contextual annulment. |
| [PatientGrowthComponent](../src/app/features/patient-record/patient-growth/patient-growth.component.ts) | Corrected | Adds an accessible section heading above individual charts. |
| [PatientPrescriptionsComponent](../src/app/features/patient-record/patient-prescriptions/patient-prescriptions.component.ts) | Corrected | Mode state, error associations, focus and narrow-width layout. |
| [PatientRecordComponent](../src/app/features/patient-record/patient-record.component.ts) | Corrected | Contains dialog focus and announces record loading. |
| [PatientStudiesComponent](../src/app/features/patient-record/patient-studies/patient-studies.component.ts) | Corrected | Heading order, file action name, error associations and visible focus. |
| [ClinicalOverviewComponent](../src/app/features/patient-record/patient-summary/clinical-overview.component.ts) | Reviewed | Section hierarchy, named actions, dynamic statuses and reachable source links. |
| [PatientSummaryComponent](../src/app/features/patient-record/patient-summary/patient-summary.component.ts) | Corrected | Promotes the patient data heading. |
| [PatientVaccinationsComponent](../src/app/features/patient-record/patient-vaccinations/patient-vaccinations.component.ts) | Corrected | Names dose controls and connects date input errors. |
| [PricingComponent](../src/app/features/pricing/pricing.component.ts) | Reviewed | Plan selection states and payment quote messaging. External payment was not exercised. |
| [SchedulePageComponent](../src/app/features/schedules/schedule-page.component.ts) | Corrected | Separates labels from nested triggers and distinguishes date and time controls. |
| [MySpecialtiesComponent](../src/app/features/specialties/my-specialties.component.ts) | Corrected | Restores focus after closing the specialty selector. |
| [SecretariesComponent](../src/app/features/staff/secretaries.component.ts) | Corrected | Shell landmark, contact autocomplete and reachable form validation. |
| [StaffAuthComponent](../src/app/features/staff/staff-auth.component.ts) | Corrected | Reaches native validation for incomplete credentials. Live invitation and recovery delivery were not exercised. |
| [StaffCalendarComponent](../src/app/features/staff/staff-calendar.component.ts) | Corrected | Moves focus into administrative editors and restores it on close. |
| [VaccinationCalendarComponent](../src/app/features/vaccination-calendar/calendario-vacunacion.component.ts) | Corrected | Material tooltips, named scroll region and table semantics. |
| [HeaderComponent](../src/app/layout/header/header.component.ts) | Corrected | Names visible account and font controls, and manages disclosure focus and Escape. |
| [MainNavComponent](../src/app/layout/main-nav/main-nav.component.ts) | Corrected | Exposes current module and hides decorative icons. |
| [PatientQuickBannerComponent](../src/app/layout/patient-quick-banner/patient-quick-banner.component.ts) | Reviewed | Patient heading and route links. No active workspace placement was found. |
| [PrivateShellComponent](../src/app/layout/private-shell/private-shell.component.ts) | Corrected | Functional skip links and a single workspace landmark. |
| [SidebarComponent](../src/app/layout/sidebar/sidebar.component.ts) | Corrected | Current-route state and readable navigation names in collapsed layouts. |
| [NotFoundComponent](../src/app/pages/not-found/not-found.component.ts) | Reviewed | Main landmark, page heading and return link. The root now selects the fallback layout. |
| [ClinicalSwitchDialogComponent](../src/app/shared/clinical-switch-dialog.component.ts) | Corrected | Announces the decision and initially focuses Cancel. |
| [BycodeAvatarComponent](../src/app/shared/components/bycode-avatar/bycode-avatar.ts) | Reviewed | Decorative image and initials in the context of named parent controls. |
| [ThemeToggleComponent](../src/app/shared/components/theme-toggle/theme-toggle.component.ts) | Corrected | Uses a changing action name with ordinary button semantics. |
| [DatePickerComponent](../src/app/shared/date-picker/date-picker.component.ts) | Corrected | Binds labels into the Material overlay, localizes controls and exposes format and errors. |
| [TimePickerComponent](../src/app/shared/time-picker/time-picker.component.ts) | Corrected | Native radio groups allow arrow navigation and preserve focus on close. |

## Supporting source

Reviewed 24 directives, including decimal input normalization, dynamic record module mounting and local Spartan wrappers. The carousel item role description was localized. The Angular app routes and 68 source stylesheets were included in the inventory. Generated bundles and dependencies were excluded.
