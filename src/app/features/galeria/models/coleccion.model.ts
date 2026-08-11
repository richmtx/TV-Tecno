import { TabId } from './filtros-galeria.model';

/** Identificador de sección; alias de TabId para legibilidad. */
export type SeccionId = TabId;

/** Fotografía individual dentro de una colección. */
export interface Foto {
    id: string;

    /** Ruta del archivo. */
    src: string;

    /**
     * Pie de foto editorial. Opcional: la mayoría de las fotos de una
     * colección no necesitan uno, y exigirlo haría inviable la carga
     * masiva desde el panel de administración.
     */
    pie?: string;

    /** Año de la fotografía, si se conoce. */
    anio?: number;

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

/**
 * Texto alternativo de una foto.
 * Se genera siempre, sin intervención del administrador: usa el pie
 * cuando existe y, si no, ubica la foto dentro de su colección.
 */
export function altDeFoto(
    foto: Foto,
    tituloColeccion: string,
    indice: number,
    total: number
): string {
    if (foto.pie) {
        return foto.pie;
    }
    return `${tituloColeccion} — fotografía ${indice + 1} de ${total}`;
}