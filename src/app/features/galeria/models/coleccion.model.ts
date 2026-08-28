import { TabId } from './filtros-galeria.model';

/** Identificador de sección; alias de TabId para legibilidad. */
export type SeccionId = TabId;

/**
 * Fotografía de una colección, tal como la entrega la API.
 * Las tres variantes vienen resueltas: la miniatura para la
 * cuadrícula y las mayores para el visor.
 */
export interface Foto {
    id: string;

    /** Pie de foto editorial. La mayoría de las fotos no llevan uno. */
    pie: string | null;

    /** Año de la fotografía, si se conoce. */
    anio: number | null;

    ancho: number | null;
    alto: number | null;

    thumb: string;
    medium: string;
    original: string;
}

/** Categoría temática de una colección. */
export interface CategoriaColeccion {
    slug: string;
    nombre: string;
}

/** Portada de una colección, en dos tamaños. */
export interface PortadaColeccion {
    thumb: string;
    medium: string;
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

    titulo: string;
    subtitulo: string | null;
    descripcion: string | null;

    categoria: CategoriaColeccion | null;
    totalFotos: number;
    portada: PortadaColeccion | null;
}

/** Colección con sus fotografías, para la página de detalle. */
export interface ColeccionConFotos extends Coleccion {
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
    total: number,
): string {
    if (foto.pie) {
        return foto.pie;
    }
    return `${tituloColeccion} — fotografía ${indice + 1} de ${total}`;
}