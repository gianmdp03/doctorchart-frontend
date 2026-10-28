import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { HeaderComponent } from '../../layout/header/header.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { DashboardComponent } from '../../features/dashboard/dashboard.component';
import { DatePickerComponent } from '../../shared/date-picker/date-picker.component';
import { GrowthChartComponent } from '../../features/patient-record/growth-chart/growth-chart.component';
import { growthReferenceFixture } from './growth.fixture';
import { clinicalFormFixture } from '../models/clinical-form.fixture';
import { AuthService } from '../services/auth.service';
import { PatientService } from '../services/patient.service';
import { ActivePatientService } from '../services/active-patient.service';
import { DoctorProfileService } from '../services/doctor-profile.service';
import { DoctorSpecialtyService } from '../services/doctor-specialty.service';
import { ClinicalEncounterService } from '../services/clinical-encounter.service';
import { WorkspaceStore } from '../services/workspace.store';

@Component({
  imports: [HeaderComponent, SidebarComponent, DashboardComponent, DatePickerComponent, GrowthChartComponent],
  template: `<div class="app-layout-shell"><app-sidebar /><div class="app-main-viewport">
    <app-header /><main class="app-main-content"><app-dashboard />
    <section class="clinical-section-card"><h2>Fecha de consulta</h2><app-date-picker value="2026-10-13" /></section>
    <app-growth-chart [chart]="chart" /></main></div></div>`,
})
class ThemeVisualHost {
  chart = { ...growthReferenceFixture[0], applicable: true, points: [], omitted: 0 };
}

describe('Theme integration', () => {
  afterEach(() => { localStorage.clear(); document.documentElement.classList.remove('dark'); });

  it('renders clinical navigation, dashboard, date picker and curves with the shared toggle', async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({ imports: [ThemeVisualHost], providers: [
      provideRouter([]),
      { provide: AuthService, useValue: {
        currentUser: signal({ id: 'visual-doctor' }), isLoggedIn: signal(true), isSuperAdmin: signal(false),
        userName: signal('Sofía Mendoza'), userEmail: signal('demo@example.com'),
        hasDoctorchartPlan: signal(true), doctorchartPlanTier: signal('PROFESSIONAL'),
      } },
      { provide: PatientService, useValue: { getPatients: () => of({ content: [
        { id: 1, fullName: 'Paciente de ejemplo', birthDate: '2024-05-10', nationalId: '50123456' },
      ], totalElements: 1, totalPages: 1, size: 6, number: 0 }) } },
      { provide: ActivePatientService, useValue: { patientId: signal(null), loadPatient: () => undefined } },
      { provide: DoctorProfileService, useValue: { profile: signal({ specialty: 'PEDIATRICS' }), hasSpecialty: signal(true) } },
      { provide: DoctorSpecialtyService, useValue: {
        activeSpecialty: signal('PEDIATRICS'), isPediatricMode: signal(true),
        currentSpecialtyOption: signal({ shortLabel: 'Pediatría', label: 'Pediatría', value: 'PEDIATRICS' }),
      } },
      { provide: ClinicalEncounterService, useValue: { getDashboard: () => of({
        totalPatients: 24, encountersThisMonth: 12, encountersToday: 3, recentEncounters: [], upcomingFollowUps: [{ encounterId: 101, patientId: 1, patientFullName: 'Mateo Rossi', followUpDate: '2026-10-24' }], asOfDate: '2026-10-23',
      }), getAll: () => of({ content: [{
        ...clinicalFormFixture(), id: 101, patientId: 1, patientFullName: 'Paciente de ejemplo',
        encounterDate: '2026-10-01T15:00:00Z', consultationType: 'FOLLOW_UP',
        chiefComplaint: 'Control de crecimiento', primaryDiagnosisDescription: 'Control clínico',
        formValues: { evolution: 'Evolución favorable. Control de crecimiento.', weight: 14.77 },
        formDefinitionSnapshot: { categories: [{ key: 'consultation', title: 'Consulta', enabled: true, fields: [
          { key: 'evolution', label: 'Evolución', type: 'TEXTAREA', required: false },
          { key: 'weight', label: 'Peso', type: 'NUMBER', required: false, unit: 'kg' },
        ] }] },
      }], page: { totalElements: 1, totalPages: 1 } }) } },
      { provide: WorkspaceStore, useValue: { quickNotes: signal('Recordatorio de ejemplo'), navigation: signal([
        { id: 'DASHBOARD', path: '/dashboard', label: 'Inicio', title: 'Inicio', icon: 'lucideLayoutDashboard' },
        { id: 'PATIENTS', path: '/patients', label: 'Pacientes', title: 'Pacientes', icon: 'lucideUsers' },
        { id: 'VACCINATION', path: '/vaccination-calendar', label: 'Vacunación', title: 'Vacunación', icon: 'lucideCalendarDays' },
        { id: 'WIZARD', path: '/onboarding/setup', label: 'Personalizar Fichas', title: 'Personalizar Fichas', icon: 'lucideSliders' },
      ]) } },
    ] }).compileComponents();
    const fixture = TestBed.createComponent(ThemeVisualHost);
    fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
    const output = process.env['THEME_VISUAL_DIR'];
    const saveWorkspace = (theme: 'light' | 'dark') => {
      if (!output) return;
      mkdirSync(output, { recursive: true });
      const clone = fixture.nativeElement.cloneNode(true) as HTMLElement;
      const fields = fixture.nativeElement.querySelectorAll('input, textarea') as NodeListOf<HTMLInputElement | HTMLTextAreaElement>;
      clone.querySelectorAll('input, textarea').forEach((field, index) => {
        if (field instanceof HTMLTextAreaElement) field.textContent = fields[index].value;
        else field.setAttribute('value', fields[index].value);
      });
      const styles = document.head.innerHTML + `<style>${readFileSync('src/app/app.css', 'utf8')}</style>`;
      writeFileSync(join(output, `workspace-${theme}.html`), `<!doctype html><html lang="es" class="${theme === 'dark' ? 'dark' : ''}"><head>
        <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="stylesheet" href="http://127.0.0.1:4202/styles.css">${styles}</head><body>${clone.outerHTML}</body></html>`);
    };
    const button = fixture.nativeElement.querySelector('app-theme-toggle button') as HTMLButtonElement;
    button.click(); fixture.detectChanges();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(fixture.nativeElement.querySelector('.date-picker-input').value).toBe('13/10/2026');
    expect(fixture.nativeElement.querySelectorAll('.reference-curve').length).toBe(5);
    expect(fixture.nativeElement.querySelector('.recent-patient-info h3')?.textContent).toContain('Paciente de ejemplo');
    expect(fixture.nativeElement.querySelector('.recent-clinical-summary b')?.textContent).toContain('Evolución');
    saveWorkspace('dark');
    button.click(); fixture.detectChanges();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    saveWorkspace('light');
    if (!output) return;
    // Export actual Angular markup and scoped styles for Chromium visual verification.
    mkdirSync(output, { recursive: true });
    fixture.nativeElement.querySelector('.date-picker-input').click();
    fixture.detectChanges(); await fixture.whenStable();
    const overlay = document.querySelector('.cdk-overlay-container');
    expect(overlay?.querySelector('mat-calendar')).toBeTruthy();
    writeFileSync(join(output, 'calendar.html'), `<!doctype html><html lang="es"><head>
      <meta charset="utf-8"><link rel="stylesheet" href="http://127.0.0.1:4202/styles.css">
      ${document.head.innerHTML}</head><body>${overlay?.outerHTML}</body></html>`);
  });
});
