import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GrowthChartComponent } from './growth-chart.component';
import { PatientGrowthMeasurement } from '../../../core/models/growth-chart.model';

describe('GrowthChartComponent', () => {
  let component: GrowthChartComponent;
  let fixture: ComponentFixture<GrowthChartComponent>;

  const mockMeasurements: PatientGrowthMeasurement[] = [
    {
      date: '2024-01-01',
      dateFormatted: '01/01/2024',
      ageMonths: 0,
      ageFormatted: 'Al nacer',
      value: 3.3,
      unit: 'kg',
      approximatePercentile: '~P50',
    },
    {
      date: '2024-04-01',
      dateFormatted: '01/04/2024',
      ageMonths: 3,
      ageFormatted: '3 meses',
      value: 6.4,
      unit: 'kg',
      approximatePercentile: '~P50',
    },
  ];

  beforeEach(async () => {
    // Mock canvas context for headless jsdom testing
    HTMLCanvasElement.prototype.getContext = (() => ({
      fillRect: () => {},
      clearRect: () => {},
      getImageData: (x: number, y: number, w: number, h: number) => ({ data: new Array(w * h * 4) }),
      putImageData: () => {},
      createImageData: () => [],
      setTransform: () => {},
      drawImage: () => {},
      save: () => {},
      fillText: () => {},
      restore: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      closePath: () => {},
      stroke: () => {},
      translate: () => {},
      scale: () => {},
      rotate: () => {},
      arc: () => {},
      fill: () => {},
      measureText: () => ({ width: 0 }),
      transform: () => {},
      rect: () => {},
      clip: () => {},
    })) as any;

    await TestBed.configureTestingModule({
      imports: [GrowthChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GrowthChartComponent);
    component = fixture.componentInstance;
  });

  it('should create the component with initial signals', () => {
    fixture.componentRef.setInput('metric', 'WEIGHT');
    fixture.componentRef.setInput('sex', 'MALE');
    fixture.componentRef.setInput('measurements', []);
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.selectedRange()).toBe('0-2');
    expect(component.sexLabel()).toBe('Niño (Varón)');
  });

  it('should render header with metric title and sex badge', () => {
    fixture.componentRef.setInput('metric', 'WEIGHT');
    fixture.componentRef.setInput('sex', 'FEMALE');
    fixture.componentRef.setInput('measurements', []);
    fixture.detectChanges();

    const titleEl = fixture.nativeElement.querySelector('.chart-title');
    expect(titleEl.textContent).toContain('Peso para la Edad');

    const badgeEl = fixture.nativeElement.querySelector('.chart-sex-badge');
    expect(badgeEl.textContent).toContain('Niña (Mujer)');
  });

  it('should display empty measurements notice when no measurements are provided', () => {
    fixture.componentRef.setInput('metric', 'HEIGHT');
    fixture.componentRef.setInput('sex', 'MALE');
    fixture.componentRef.setInput('measurements', []);
    fixture.detectChanges();

    const noticeEl = fixture.nativeElement.querySelector('.empty-measurements-notice');
    expect(noticeEl).toBeTruthy();
    expect(noticeEl.textContent).toContain('No hay registros somatométricos');
  });

  it('should display summary bar when measurements are present', () => {
    fixture.componentRef.setInput('metric', 'WEIGHT');
    fixture.componentRef.setInput('sex', 'MALE');
    fixture.componentRef.setInput('measurements', mockMeasurements);
    fixture.detectChanges();

    const summaryEl = fixture.nativeElement.querySelector('.metrics-summary-bar');
    expect(summaryEl).toBeTruthy();

    const values = fixture.nativeElement.querySelectorAll('.summary-value');
    expect(values[0].textContent).toContain('6.4 kg'); // latest value
  });

  it('should toggle age range between 0-2 and 0-5', () => {
    fixture.componentRef.setInput('metric', 'WEIGHT');
    fixture.componentRef.setInput('sex', 'MALE');
    fixture.componentRef.setInput('measurements', mockMeasurements);
    fixture.detectChanges();

    expect(component.selectedRange()).toBe('0-2');
    expect(component.maxMonths()).toBe(24);

    component.setAgeRange('0-5');
    fixture.detectChanges();

    expect(component.selectedRange()).toBe('0-5');
    expect(component.maxMonths()).toBe(60);
  });

  it('should cleanup chart instance on destroy', () => {
    fixture.componentRef.setInput('metric', 'WEIGHT');
    fixture.componentRef.setInput('sex', 'MALE');
    fixture.componentRef.setInput('measurements', mockMeasurements);
    fixture.detectChanges();

    expect(() => fixture.destroy()).not.toThrow();
  });

  it('should render official WHO banner title and apply sex theme classes', () => {
    fixture.componentRef.setInput('metric', 'WEIGHT');
    fixture.componentRef.setInput('sex', 'FEMALE');
    fixture.componentRef.setInput('measurements', []);
    fixture.detectChanges();

    const bannerEl = fixture.nativeElement.querySelector('.chart-who-banner-title');
    expect(bannerEl.textContent).toContain('Peso para la edad niñas');

    const cardEl = fixture.nativeElement.querySelector('.growth-chart-card');
    expect(cardEl.classList.contains('theme-girl')).toBe(true);

    fixture.componentRef.setInput('metric', 'HEIGHT');
    fixture.componentRef.setInput('sex', 'MALE');
    fixture.detectChanges();

    expect(bannerEl.textContent).toContain('Longitud / estatura para la edad niños');
    expect(cardEl.classList.contains('theme-boy')).toBe(true);

    fixture.componentRef.setInput('metric', 'HEAD_CIRCUMFERENCE');
    fixture.detectChanges();

    expect(bannerEl.textContent).toContain('Perímetro cefálico para la edad niños');
  });
});
