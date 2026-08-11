/** Categoría temática de un momento estudiantil. */
export type CategoriaMomento =
    | 'campus'
    | 'academico'
    | 'ceremonias'
    | 'deportivo'
    | 'cultural'
    | 'social';

/**
 * Colección de fotos de la vida estudiantil del ITD.
 */
export interface Momento {
    id: string;

    /** Título visible de la tarjeta. */
    titulo: string;

    /** Encabezado secundario en la página de detalle. */
    subtitulo: string;

    /** Descripción breve, mostrada en el detalle. */
    descripcion: string;

    /** Ruta de la imagen de portada. */
    portada: string;

    /** Texto alternativo de la portada. */
    portadaAlt: string;

    /** Número de fotos que contiene. */
    totalFotos: number;

    /** Categoría a la que pertenece. */
    categoria: CategoriaMomento;

    /** Año más reciente representado, para ordenar. */
    anio: number;

    /** Degradado de respaldo mientras no exista la portada real. */
    fallback: string;

    /** Pies de foto destacados; se asignan a las primeras imágenes. */
    piesFotos: string[];
}

/** Testimonio de un estudiante o egresado. */
export interface Testimonio {
    cita: string;
    autor: string;
    carrera: string;
}