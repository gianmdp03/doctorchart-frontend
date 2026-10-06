/** Payload published by the National Vaccination Calendar data source. */
export interface CalendarioVacunacionJSON {
  calendarId: string;
  metadata: Metadata;
  grupos_etarios_columnas: GrupoEtario[];
  referencias_patologias: Record<string, string>;
  notas_aplicacion: Record<string, string>;
  vacunas: Vacuna[];
}

export interface Metadata {
  titulo: string;
  pais: string;
  organismo: string;
  bajada: string;
  telefono: string;
  sitio_web: string;
  ano_vigencia: number;
}

export interface GrupoEtario {
  grupo: string;
  columnas: ColumnaEtaria[];
}

export interface ColumnaEtaria {
  id: string;
  nombre: string;
  subtitulo?: string;
  orden: number;
}

export type CategoriaVacuna =
  | 'calendario_regular'
  | 'exclusivo_zonas_de_riesgo'
  | (string & {});

export type TipoDosisConocido =
  | 'dosis_primaria'
  | 'refuerzo'
  | 'dosis_anual'
  | 'dosis_unica'
  | 'esquema'
  | 'riesgo';

/**
 * Allows future dose styles published by the JSON without requiring a frontend
 * release, while retaining autocomplete for the currently defined values.
 */
export type TipoDosis = TipoDosisConocido | (string & {});

export interface ReferenciaPatologia {
  numero: number;
  descripcion: string;
}

export interface NotaAplicacion {
  letra: string;
  condicion: string;
}

export interface AplicacionDosis {
  id: string;
  ageRule: { fromMonths: number; toMonths: number; graceMonths: number } | null;
  /** IDs of the age columns covered by this application, in calendar order. */
  columnas: string[];
  dosis: string;
  tipo: TipoDosis;
  notas: NotaAplicacion[];
}

export interface Vacuna {
  id: string;
  nombre: string;
  categoria: CategoriaVacuna;
  referencia_patologia: ReferenciaPatologia | null;
  aplicaciones: AplicacionDosis[];
}

/** A rendered grid cell. `colspan` always covers consecutive flat columns. */
export interface CeldaTabla {
  columnaId: string;
  colspan: number;
  aplicacion: AplicacionDosis | null;
  contenido: string | null;
  tipoBadge: TipoDosis | null;
  notas: NotaAplicacion[];
}
