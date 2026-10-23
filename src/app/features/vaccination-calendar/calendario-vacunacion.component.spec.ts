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
 it('selects age-specific applications, preserving notes, risk indications and new source columns', () => {
 const fixture=TestBed.createComponent(VaccinationCalendarComponent);
 const data: CalendarioVacunacionJSON={...calendar,grupos_etarios_columnas:[{grupo:'Edades de prueba',columnas:[{id:'first',nombre:'Edad inicial',orden:1},{id:'later',nombre:'Edad posterior',orden:2}]}],vacunas:[{id:'test-one',nombre:'Vacuna de prueba A',categoria:'calendario_regular',referencia_patologia:{numero:1,descripcion:'Referencia de prueba'},aplicaciones:[{id:'dose-a',ageRule:null,columnas:['first'],dosis:'Dosis de prueba A',tipo:'dosis_primaria',notas:[{letra:'A',condicion:'Condición de prueba A'}]}]},{id:'test-risk',nombre:'Vacuna de prueba B',categoria:'exclusivo_zonas_de_riesgo',referencia_patologia:null,aplicaciones:[{id:'dose-b',ageRule:null,columnas:['later'],dosis:'Dosis de prueba B',tipo:'riesgo',notas:[]}]}]};
 fixture.componentRef.setInput('data',data);fixture.detectChanges();expect(fixture.componentInstance.mobileVaccines().map(r=>r.vaccine.id)).toEqual(['test-one']);
 expect(fixture.nativeElement.querySelector('.mobile-vaccine-calendar').textContent).toContain('Condición de prueba A');
 const select=fixture.nativeElement.querySelector('#mobile-vaccine-age') as HTMLSelectElement;select.value='later';select.dispatchEvent(new Event('change'));fixture.detectChanges();
 expect(fixture.componentInstance.mobileVaccines().map(r=>r.vaccine.id)).toEqual(['test-risk']);expect(fixture.nativeElement.querySelector('.mobile-risk').textContent).toContain('Zona de riesgo');
 fixture.componentRef.setInput('data',{...data,grupos_etarios_columnas:[{grupo:'Cambio',columnas:[{id:'new',nombre:'Nueva edad',orden:1}]}]});fixture.detectChanges();expect(fixture.componentInstance.mobileColumn()?.id).toBe('new');expect(fixture.componentInstance.mobileVaccines()).toEqual([]);
 });
});
