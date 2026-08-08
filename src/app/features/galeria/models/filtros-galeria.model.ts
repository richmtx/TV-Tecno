/**
 * Modelos compartidos de la sección Galería.
 * Los usan galeria-tabs, barra-filtros y las páginas de cada sección.
 */

/** Identificador de cada sección de la galería. */
export type TabId = 'timeline' | 'albums' | 'instalaciones' | 'estudiantes';

/** Pestaña de navegación de la galería. */
export interface GaleriaTab {
    id: TabId;
    /** Segmento de URL relativo al layout, ej. 'linea-del-tiempo'. */
    ruta: string;
    label: string;
}

/**
 * Opción del menú "Filtrar".
 * Por ahora es texto plano; cuando cada sección tenga sus propios
 * criterios se puede migrar a { id: string; label: string; }.
 */
export type OpcionFiltro = string;

/**
 * Configuración por sección que viaja en el `data` de la ruta.
 * Permite personalizar el pie de página (fotos-itd, historia) y el
 * hero sin duplicar el markup del layout.
 */
export interface GaleriaSeccionConfig {
    /** Id de la pestaña activa, para resaltarla. */
    tab: TabId;
    /** Título accesible / analítica de la sección. */
    titulo: string;
}