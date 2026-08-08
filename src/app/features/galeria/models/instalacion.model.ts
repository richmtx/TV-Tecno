/** Categoría temática de una instalación. */
export type CategoriaInstalacion =
    | 'academicas'
    | 'laboratorios'
    | 'deportivas'
    | 'administrativas'
    | 'servicios'
    | 'areas-comunes';

/** Chip de filtro por categoría. */
export interface ChipCategoria {
    id: CategoriaInstalacion | 'todas';
    label: string;
}

/**
 * Instalación del campus del ITD.
 * Cada instalación agrupa fotos de un espacio concreto.
 */
export interface Instalacion {
    id: string;

    /** Nombre visible de la instalación. */
    titulo: string;

    /** Descripción breve, dos líneas como máximo. */
    descripcion: string;

    /** Ruta de la imagen de portada. */
    portada: string;

    /** Texto alternativo de la portada. */
    portadaAlt: string;

    /** Categoría a la que pertenece. */
    categoria: CategoriaInstalacion;

    /** Etiqueta visible de la categoría. */
    categoriaLabel: string;

    /** Degradado de respaldo mientras no exista la portada real. */
    fallback: string;
}