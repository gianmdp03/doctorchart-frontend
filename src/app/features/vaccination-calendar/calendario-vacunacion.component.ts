import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';

import {
  AplicacionDosis,
  CalendarioVacunacionJSON,
  CeldaTabla,
  ColumnaEtaria,
  NotaAplicacion,
  ReferenciaPatologia,
  Vacuna,
} from './calendario.types';
import { VaccinationCalendarService } from './calendario.service';
import { ThemeService } from '../../core/services/theme.service';

interface ReferenceTooltip {
  title: string;
  content: string;
  left: number;
  top: number;
  placement: 'above' | 'below';
}

/**
 * Renders the national vaccination schedule from its JSON representation.
 *
 * An explicit `data` input takes precedence over the remote source, which
 * makes the component reusable in previews, tests, and embedded experiences.
 */
@Component({
  selector: 'app-vaccination-calendar',
  imports: [],
  templateUrl: './calendario-vacunacion.component.html',
  styleUrl: './calendario-vacunacion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.dark-theme]': 'isDarkMode()',
  },
})
export class VaccinationCalendarComponent implements OnInit {
  private readonly vaccinationCalendarService = inject(VaccinationCalendarService);
  private readonly themeService = inject(ThemeService);

  /** Optional caller-supplied calendar. It overrides the service response. */
  readonly data = input<CalendarioVacunacionJSON | null>(null);
  readonly isDarkMode = computed(() => this.themeService.theme() === 'dark');
  readonly mobileAge = signal('');
  readonly mobileColumn = computed(() => this.flatColumns().find(column => column.id === this.mobileAge()) ?? this.flatColumns()[0]);
  readonly mobileVaccines = computed(() => {
    const column = this.mobileColumn();
    return column ? (this.calendar()?.vacunas ?? []).map(vaccine => ({ vaccine, applications: vaccine.aplicaciones.filter(application => application.columnas.includes(column.id)) })).filter(row => row.applications.length > 0) : [];
  });
  readonly activeTooltip = signal<ReferenceTooltip | null>(null);

  /** The effective calendar, either injected by the caller or fetched remotely. */
  readonly calendar = computed<CalendarioVacunacionJSON | null>(
    () => this.data() ?? this.vaccinationCalendarService.data(),
  );
  readonly loading = computed(() => !this.data() && this.vaccinationCalendarService.loading());
  readonly error = computed(() => (!this.data() ? this.vaccinationCalendarService.error() : null));

  readonly flatColumns = computed<ColumnaEtaria[]>(() =>
    (this.calendar()?.grupos_etarios_columnas ?? [])
      .flatMap((group) => group.columnas)
      .slice()
      .sort((first, second) => first.orden - second.orden),
  );
  readonly tableMinWidth = computed(() => Math.max(1420, 220 + this.flatColumns().length * 78));

  readonly regularVaccines = computed<Vacuna[]>(() =>
    (this.calendar()?.vacunas ?? []).filter(
      (vaccine) => vaccine.categoria !== 'exclusivo_zonas_de_riesgo',
    ),
  );
  readonly riskVaccines = computed<Vacuna[]>(() =>
    (this.calendar()?.vacunas ?? []).filter(
      (vaccine) => vaccine.categoria === 'exclusivo_zonas_de_riesgo',
    ),
  );

  readonly pathologyReferences = computed<ReferenciaPatologia[]>(() =>
    this.regularVaccines()
      .concat(this.riskVaccines())
      .flatMap((vaccine) => (vaccine.referencia_patologia ? [vaccine.referencia_patologia] : []))
      .filter(
        (reference, index, all) =>
          all.findIndex((candidate) => candidate.numero === reference.numero) === index,
      )
      .sort((first, second) => first.numero - second.numero),
  );

  readonly applicationNotes = computed<NotaAplicacion[]>(() => {
    const notes = this.calendar()?.notas_aplicacion ?? {};

    return Object.entries(notes)
      .map(([letra, condicion]) => ({ letra, condicion }))
      .sort((first, second) => first.letra.localeCompare(second.letra, 'es'));
  });

  ngOnInit(): void {
    // Avoid an unnecessary request when data is supplied by the consumer.
    if (!this.data()) {
      this.vaccinationCalendarService.load();
    }
  }

  showTooltip(event: MouseEvent | FocusEvent, title: string, content: string): void {
    const target = event.currentTarget as HTMLElement;
    const bounds = target.getBoundingClientRect();
    const width = Math.min(300, window.innerWidth - 32);
    const left = Math.max(16 + width / 2, Math.min(bounds.left + bounds.width / 2, window.innerWidth - 16 - width / 2));
    const estimatedHeight = Math.min(220, 54 + Math.ceil(content.length / 40) * 18);
    const fitsAbove = bounds.top >= estimatedHeight + 16;
    const fitsBelow = window.innerHeight - bounds.bottom >= estimatedHeight + 16;
    const placement = fitsAbove || !fitsBelow ? 'above' : 'below';

    this.activeTooltip.set({
      title,
      content,
      left,
      top: placement === 'above' ? bounds.top - 8 : bounds.bottom + 8,
      placement,
    });
  }

  hideTooltip(): void {
    this.activeTooltip.set(null);
  }

  syncTableScroll(source: HTMLElement, target: HTMLElement): void {
    if (target.scrollLeft !== source.scrollLeft) {
      target.scrollLeft = source.scrollLeft;
    }
  }


  /**
   * Produces one physical `<td>` per visible cell. A multi-column dose becomes
   * a single cell only when its referenced column ids are consecutive in the
   * current grid. This prevents a changed JSON column set from shifting rows.
   */
  cellsFor(vaccine: Vacuna): CeldaTabla[] {
    return this.buildCells(vaccine, this.flatColumns());
  }

  private buildCells(vaccine: Vacuna, columns: readonly ColumnaEtaria[]): CeldaTabla[] {
    const applicationsByColumn = new Map<string, AplicacionDosis>();

    for (const application of vaccine.aplicaciones) {
      for (const columnId of application.columnas) {
        // Keep the first declaration deterministic if malformed data overlaps.
        if (!applicationsByColumn.has(columnId)) {
          applicationsByColumn.set(columnId, application);
        }
      }
    }

    const cells: CeldaTabla[] = [];
    let index = 0;

    while (index < columns.length) {
      const column = columns[index];
      const application = applicationsByColumn.get(column.id) ?? null;

      if (!application) {
        cells.push(this.emptyCell(column.id));
        index += 1;
        continue;
      }

      const span = this.consecutiveSpan(application, columns, applicationsByColumn, index);
      cells.push({
        columnaId: column.id,
        colspan: span,
        aplicacion: application,
        contenido: application.dosis,
        tipoBadge: application.tipo,
        notas: application.notas,
      });
      index += span;
    }

    return cells;
  }

  private consecutiveSpan(
    application: AplicacionDosis,
    columns: readonly ColumnaEtaria[],
    applicationsByColumn: ReadonlyMap<string, AplicacionDosis>,
    startIndex: number,
  ): number {
    let span = 0;

    for (let index = startIndex; index < columns.length; index += 1) {
      if (applicationsByColumn.get(columns[index].id) !== application) {
        break;
      }
      span += 1;
    }

    return Math.max(span, 1);
  }

  private emptyCell(columnId: string): CeldaTabla {
    return {
      columnaId: columnId,
      colspan: 1,
      aplicacion: null,
      contenido: null,
      tipoBadge: null,
      notas: [],
    };
  }
}
