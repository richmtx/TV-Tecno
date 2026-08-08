/**
 * Modelos compartidos de la sección Galería.
 * Los usan galeria-tabs, barra-filtros y las páginas de cada sección.
 */

/** Identificador de cada sección de la galería. */
export type TabId = 'timeline' | 'albums' | 'instalaciones' | 'estudiantes';

/** Pestaña de navegación de la galería. */
export interface GaleriaTab {
    id: TabId;
    label: string;
}

/**
 * Opción del menú "Filtrar".
 * Por ahora es texto plano; cuando cada sección tenga sus propios
 * criterios se puede migrar a { id: string; label: string; }.
 */
export type OpcionFiltro = string;