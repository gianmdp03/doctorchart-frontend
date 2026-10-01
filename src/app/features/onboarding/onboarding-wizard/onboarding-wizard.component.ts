import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import {
  ONBOARDING_WIZARD_STEPS,
  OnboardingWizardStepDefinition,
} from '../../../core/config/onboarding-form-definitions';
import { DoctorProfileService } from '../../../core/services/doctor-profile.service';
import { WorkspaceStore } from '../../../core/services/workspace.store';
import { FormFieldEditorComponent } from '../../form-field-editor/form-field-editor.component';
import {
  createDefaultPatientFormTemplate,
  PATIENT_FORM_SECTIONS,
} from '../../../core/config/onboarding-form-definitions';
import { FormTemplate, FormTemplateSchema } from '../../../core/models/workspace.model';
import { ChartMapperComponent } from '../../chart-mapper/chart-mapper.component';
import { DoctorChartConfig } from '../../../core/models/workspace.model';

@Component({
  selector: 'app-onboarding-wizard',
  imports: [CommonModule, FormFieldEditorComponent, ChartMapperComponent],
  templateUrl: './onboarding-wizard.component.html',
  styleUrl: './onboarding-wizard.component.css',
})
export class OnboardingWizardComponent implements OnInit {
  private readonly workspaceStore = inject(WorkspaceStore);
  private readonly doctorProfileService = inject(DoctorProfileService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly steps = ONBOARDING_WIZARD_STEPS;
  readonly isSaving = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);
  readonly patientTemplate = signal<FormTemplate | null>(null);
  readonly encounterTemplate = signal<FormTemplate | null>(null);
  readonly chartConfigs = signal<DoctorChartConfig[]>([]);
  readonly isChartMapperOpen = signal(false);

  readonly isEditMode = computed(() => this.workspaceStore.isOnboardingCompleted());

  readonly activeStepIndex = signal<number>(1);
  readonly activeStep = computed<OnboardingWizardStepDefinition>(() => this.steps[this.activeStepIndex()]);
  readonly isLastStep = computed(() => this.activeStepIndex() === this.steps.length - 1);
  readonly isFirstStep = computed(() => this.isEditMode() ? this.activeStepIndex() <= 1 : this.activeStepIndex() === 0);
  readonly activeChartCount = computed(() => this.chartConfigs().filter((config) => config.isActive).length);
  readonly isPatientFormStep = computed(() =>
    ['PATIENT_PERSONAL_DATA', 'PATIENT_FAMILY_HISTORY', 'PATIENT_GUARDIANS'].includes(this.activeStep().onboardingStep)
  );
  readonly activePatientCategoryKey = computed(() =>
    PATIENT_FORM_SECTIONS.find((section) => section.onboardingStep === this.activeStep().onboardingStep)?.categoryKey ?? null
  );
  readonly isEncounterFormStep = computed(() => this.activeStep().onboardingStep === 'ENCOUNTER_FORM');

  async ngOnInit(): Promise<void> {
    const setup = await this.workspaceStore.loadSetup();
    if (!setup?.id || !setup.specialtyId || (!setup.onboardingCompleted && setup.onboardingStep === 'SPECIALTY')) {
      await this.router.navigate(['/onboarding/select-specialty']);
      return;
    }

    if (!setup.onboardingCompleted) {
      const stepIndex = this.steps.findIndex((step) => step.onboardingStep === setup.onboardingStep);
      this.activeStepIndex.set(stepIndex >= 0 ? stepIndex : 1);
    } else {
      this.activeStepIndex.set(1);
    }

    this.patientTemplate.set(this.createPatientTemplate(
      setup.defaultPatientTemplate,
      setup.specialtyId,
      setup.specialtyDisplayName,
      setup.onboardingDraft,
    ));
    this.encounterTemplate.set(this.createEncounterTemplate(
      setup.defaultEncounterTemplate,
      setup.specialtyId,
      setup.specialtyDisplayName,
      setup.onboardingDraft,
    ));

    const savedCharts = setup.chartConfigs && setup.chartConfigs.length > 0 ? setup.chartConfigs : [];
    const draftCharts = this.readChartConfigs(setup.onboardingDraft);
    this.chartConfigs.set(draftCharts.length > 0 ? draftCharts : savedCharts);
    this.isChartMapperOpen.set(setup.onboardingStep === 'CHARTS');
  }

  async goToStep(index: number): Promise<void> {
    if (index < 0 || index >= this.steps.length || this.isSaving()) return;
    if (index === 0 && this.isEditMode()) return;

    this.activeStepIndex.set(index);
    const targetStep = this.steps[index];
    await this.saveStep(targetStep.onboardingStep);
    if (targetStep.onboardingStep === 'CHARTS' && !this.errorMessage()) {
      this.isChartMapperOpen.set(true);
    }
  }

  async goNext(): Promise<void> {
    const nextIndex = this.activeStepIndex() + 1;
    const nextStep = this.steps[nextIndex]?.onboardingStep;
    const setup = this.workspaceStore.currentSetup();
    if (!nextStep || !setup?.specialtyId || this.isSaving()) return;

    this.activeStepIndex.set(nextIndex);
    await this.saveStep(nextStep);
    if (nextStep === 'CHARTS' && !this.errorMessage()) {
      this.isChartMapperOpen.set(true);
    }
  }

  async goPrevious(): Promise<void> {
    const index = this.activeStepIndex();
    const setup = this.workspaceStore.currentSetup();
    if (!setup?.specialtyId || this.isSaving()) return;

    if (index <= 1) {
      if (this.isEditMode()) {
        return;
      }
      this.activeStepIndex.set(0);
      await this.saveStep('SPECIALTY');
      if (!this.errorMessage()) {
        await this.router.navigate(['/onboarding/select-specialty']);
      }
      return;
    }

    const prevIndex = index - 1;
    this.activeStepIndex.set(prevIndex);
    await this.saveStep(this.steps[prevIndex].onboardingStep);
  }

  async handleSignOut(): Promise<void> {
    this.doctorProfileService.clearProfile();
    await this.authService.signOut();
  }

  async exitWizard(): Promise<void> {
    if (this.isEditMode() && !this.isSaving()) {
      await this.finishOnboarding();
      return;
    }
    await this.router.navigate(['/dashboard']);
  }

  async cancelWizard(): Promise<void> {
    await this.router.navigate(['/dashboard']);
  }

  async confirmResetToDefaults(): Promise<void> {
    if (this.isSaving()) return;
    const confirmed = typeof window !== 'undefined'
      ? window.confirm('¿Estás seguro de restablecer la configuración de fábrica? Se descartarán las personalizaciones agregadas a las fichas y consultas, volviendo a las plantillas estándar de tu especialidad.')
      : true;
    if (!confirmed) return;

    this.isSaving.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    try {
      const setup = await this.workspaceStore.resetToDefaults();
      if (setup?.specialtyId) {
        this.patientTemplate.set(createDefaultPatientFormTemplate(setup.specialtyId, setup.specialtyDisplayName));
        this.encounterTemplate.set(this.createEncounterTemplate(
          setup.defaultEncounterTemplate,
          setup.specialtyId,
          setup.specialtyDisplayName,
          null,
        ));
        this.chartConfigs.set([]);
        this.successMessage.set('Plantillas y gráficos restablecidos a los valores de fábrica.');
      }
    } catch {
      this.errorMessage.set('No pudimos restablecer los valores de fábrica. Intentá nuevamente.');
    } finally {
      this.isSaving.set(false);
    }
  }

  onPatientTemplateChange(template: FormTemplate): void {
    this.patientTemplate.set(template);
  }

  onEncounterTemplateChange(template: FormTemplate): void {
    this.encounterTemplate.set(template);
  }

  openChartMapper(): void {
    this.isChartMapperOpen.set(true);
  }

  closeChartMapper(): void {
    this.isChartMapperOpen.set(false);
  }

  async onChartConfigsSelected(configs: DoctorChartConfig[]): Promise<void> {
    this.chartConfigs.set(configs);
    this.isChartMapperOpen.set(false);
    try {
      await this.workspaceStore.saveChartConfigs(configs);
    } catch {
      // Si falla la persistencia directa en base de datos, continúa guardando el draft del wizard
    }
    await this.saveCurrentChartsStep();
  }

  async finishOnboarding(): Promise<void> {
    const setup = this.workspaceStore.currentSetup();
    const patientTemplate = this.patientTemplate();
    const encounterTemplate = this.encounterTemplate();
    if (!setup?.specialtyId || !patientTemplate || !encounterTemplate || this.isSaving()) return;

    this.isSaving.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    try {
      await this.workspaceStore.finishOnboarding({
        specialtyId: setup.specialtyId,
        patientColumnsConfig: setup.patientColumnsConfig,
        modulesConfig: setup.modulesConfig,
        patientTemplateSchema: patientTemplate.schemaDefinition,
        customTemplateSchema: encounterTemplate.schemaDefinition,
        chartConfigs: this.chartConfigs(),
      });
      await this.router.navigate(['/dashboard']);
    } catch {
      this.errorMessage.set('No pudimos guardar la configuración. Tus cambios siguen guardados y podés reintentarlo.');
    } finally {
      this.isSaving.set(false);
    }
  }

  private async saveStep(nextStep: Exclude<OnboardingWizardStepDefinition['onboardingStep'], 'COMPLETED'>): Promise<void> {
    const setup = this.workspaceStore.currentSetup();
    if (!setup?.specialtyId) return;

    this.isSaving.set(true);
    this.errorMessage.set(null);
    try {
      if (this.isEditMode()) {
        const patientTemplate = this.patientTemplate();
        const encounterTemplate = this.encounterTemplate();
        await this.workspaceStore.finishOnboarding({
          specialtyId: setup.specialtyId,
          patientColumnsConfig: setup.patientColumnsConfig,
          modulesConfig: setup.modulesConfig,
          patientTemplateSchema: patientTemplate?.schemaDefinition,
          customTemplateSchema: encounterTemplate?.schemaDefinition,
          chartConfigs: this.chartConfigs(),
        });
      } else {
        await this.workspaceStore.saveOnboardingDraft({
          specialtyId: setup.specialtyId,
          onboardingStep: nextStep,
          onboardingDraft: this.createDraft(),
        });
      }
    } catch {
      this.errorMessage.set('No pudimos guardar el avance. Revisá tu conexión e intentá nuevamente.');
    } finally {
      this.isSaving.set(false);
    }
  }

  private createPatientTemplate(
    defaultPatientTemplate: FormTemplate | null | undefined,
    specialtyId: number,
    specialtyDisplayName: string | null | undefined,
    draft: Record<string, unknown> | null | undefined,
  ): FormTemplate {
    const template: FormTemplate = defaultPatientTemplate
      ? (JSON.parse(JSON.stringify(defaultPatientTemplate)) as FormTemplate)
      : createDefaultPatientFormTemplate(specialtyId, specialtyDisplayName);

    const schema = draft?.['patientTemplateSchema'];
    if (this.isFormTemplateSchema(schema)) {
      template.schemaDefinition = schema;
    }

    if (template.schemaDefinition && Array.isArray(template.schemaDefinition.categories)) {
      for (const section of PATIENT_FORM_SECTIONS) {
        const exists = template.schemaDefinition.categories.some(
          (c) => c.categoryKey === section.categoryKey
        );
        if (!exists) {
          template.schemaDefinition.categories.push({
            categoryKey: section.categoryKey,
            title: section.title,
            enabled: true,
            fields: section.fields.map((f) => ({ ...f })),
          });
        }
      }
    }

    return template;
  }

  private createDraft(): Record<string, unknown> {
    const setupDraft = this.workspaceStore.currentSetup()?.onboardingDraft ?? {};
    const patientTemplate = this.patientTemplate();
    const encounterTemplate = this.encounterTemplate();
    return {
      ...setupDraft,
      ...(patientTemplate ? { patientTemplateSchema: patientTemplate.schemaDefinition } : {}),
      ...(encounterTemplate ? { customTemplateSchema: encounterTemplate.schemaDefinition } : {}),
      chartConfigs: this.chartConfigs(),
    };
  }

  private createEncounterTemplate(
    defaultTemplate: FormTemplate | null | undefined,
    specialtyId: number,
    specialtyDisplayName: string | null | undefined,
    draft: Record<string, unknown> | null | undefined,
  ): FormTemplate {
    const template: FormTemplate = defaultTemplate
      ? JSON.parse(JSON.stringify(defaultTemplate)) as FormTemplate
      : {
          specialtyId,
          specialtyDisplayName: specialtyDisplayName ?? null,
          name: `Formulario de consulta${specialtyDisplayName ? ` - ${specialtyDisplayName}` : ''}`,
          templateType: 'ENCOUNTER',
          isDefault: true,
          isSystem: false,
          schemaDefinition: {
            categories: [{
              categoryKey: 'SPECIALTY_SPECIFIC',
              title: 'CONSULTA',
              enabled: true,
              fields: [],
            }],
          },
        };
    const schema = draft?.['customTemplateSchema'];
    if (this.isFormTemplateSchema(schema)) {
      template.schemaDefinition = schema;
    }
    template.id = undefined;
    template.isSystem = false;
    template.isDefault = true;
    return template;
  }

  private isFormTemplateSchema(value: unknown): value is FormTemplateSchema {
    return typeof value === 'object'
      && value !== null
      && 'categories' in value
      && Array.isArray((value as FormTemplateSchema).categories);
  }

  private readChartConfigs(draft: Record<string, unknown> | null | undefined): DoctorChartConfig[] {
    const chartConfigs = draft?.['chartConfigs'];
    return Array.isArray(chartConfigs)
      ? chartConfigs.filter((config): config is DoctorChartConfig =>
        typeof config === 'object'
        && config !== null
        && 'chartCode' in config
        && 'fieldMappings' in config
        && 'isActive' in config
      )
      : [];
  }

  private async saveCurrentChartsStep(): Promise<void> {
    const setup = this.workspaceStore.currentSetup();
    if (!setup?.specialtyId) return;

    this.isSaving.set(true);
    this.errorMessage.set(null);
    try {
      await this.workspaceStore.saveOnboardingDraft({
        specialtyId: setup.specialtyId,
        onboardingStep: 'CHARTS',
        onboardingDraft: this.createDraft(),
      });
    } catch {
      this.errorMessage.set('No pudimos guardar los gráficos seleccionados. Intentá nuevamente.');
    } finally {
      this.isSaving.set(false);
    }
  }
}
