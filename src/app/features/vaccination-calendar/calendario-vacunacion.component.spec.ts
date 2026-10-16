import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { VaccinationCalendarComponent } from './calendario-vacunacion.component';
import { VaccinationCalendarService } from './calendario.service';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { CalendarioVacunacionJSON } from './calendario.types';

const calendar: CalendarioVacunacionJSON = {
  calendarId: 'theme-test', metadata: {
    titulo: 'Calendario de vacunación', bajada: 'Calendario de prueba', pais: 'Argentina',
    organismo: 'Ministerio de Salud', telefono: '', sitio_web: '', ano_vigencia: 2026,
  }, vacunas: [], grupos_etarios_columnas: [], notas_aplicacion: {}, referencias_patologias: {},
};

@Component({ imports: [ThemeToggleComponent, VaccinationCalendarComponent],
  template: '<app-theme-toggle /><app-vaccination-calendar [data]="calendar" />' })
class CalendarThemeHost { readonly calendar = calendar; }

describe('Vaccination calendar shared theme', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [{ provide: VaccinationCalendarService, useValue: {
      data: signal(null), loading: signal(false), error: signal(null), load: vi.fn(),
    } }] });
  });
  afterEach(() => {
    localStorage.clear(); document.documentElement.classList.remove('dark');
  });

  async function render() {
    const fixture = TestBed.createComponent(CalendarThemeHost);
    fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
    return fixture;
  }

  it('has only the global selector and switches the calendar both ways with it', async () => {
    const fixture = await render();
    const element = fixture.nativeElement.querySelector('app-vaccination-calendar') as HTMLElement;
    const toggle = fixture.nativeElement.querySelector('app-theme-toggle button') as HTMLButtonElement;
    expect(element.querySelector('.theme-toggle')).toBeNull();
    expect(fixture.nativeElement.textContent.match(/Modo (claro|oscuro)/g)).toHaveLength(1);
    expect(element.classList.contains('dark-theme')).toBe(false);
    toggle.click(); fixture.detectChanges();
    expect(element.classList.contains('dark-theme')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    toggle.click(); fixture.detectChanges();
    expect(element.classList.contains('dark-theme')).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(element.textContent).toContain('Calendario de vacunación');
  });

  it('restores the saved page theme when opening the calendar', async () => {
    localStorage.setItem('doctorchart_theme', 'dark');
    const fixture = await render();
    expect(fixture.nativeElement.querySelector('app-vaccination-calendar').classList.contains('dark-theme')).toBe(true);
  });
});
