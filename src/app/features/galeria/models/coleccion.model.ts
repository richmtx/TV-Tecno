import { TabId } from './filtros-galeria.model';

/** Identificador de sección; alias de TabId para legibilidad. */
export type SeccionId = TabId;

/** Fotografía individual dentro de una colección. */
export interface Foto {
    id: string;

    /** Descripción para accesibilidad y pie de foto en el lightbox. */
    titulo: string;

    /** Ruta del archivo. */
    src: string;

    /** Degradado de respaldo mientras no exista la imagen real. */
    fallback: string;
}

/**
 * Conjunto de fotos con identidad propia.
 * Una época, un álbum, una instalación o un momento estudiantil
 * son todos colecciones: cambia el origen, no la estructura.
 */
export interface Coleccion {
    /** Slug usado en la URL. */
    id: string;

    /** Sección a la que pertenece. */
    seccion: SeccionId;

    /** Encabezado principal, ej. '1951 - 1980'. */
    titulo: string;

    /** Encabezado secundario, ej. 'Crecimiento y formación'. */
    subtitulo: string;

    /** Descripción breve bajo el encabezado. */
    descripcion: string;

    /** Total de fotos declarado. */
    totalFotos: number;

    /** Fotografías de la colección. */
    fotos: Foto[];
}

/** Entrada de la barra lateral de navegación entre colecciones. */
export interface ItemNavColeccion {
    id: string;
    titulo: string;
    subtitulo: string;
}

/** Eslabón del rastro de navegación. */
export interface MigaPan {
    label: string;
    /** Ruta absoluta; si se omite, el eslabón es el actual y no enlaza. */
    ruta?: string;
}