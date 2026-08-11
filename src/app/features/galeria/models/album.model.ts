/**
 * Álbum de la Galería ITD.
 * Un álbum agrupa fotos bajo un tema o periodo concreto.
 */
export interface Album {
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

    /** Número de fotos que contiene el álbum. */
    totalFotos: number;

    /** Periodo que abarca, ej. '1920 - 1950' o '2011 - Hoy'. */
    periodo: string;

    /** Año inicial, para ordenar sin parsear el texto del periodo. */
    anioInicio: number;

    /** Categoría temática, para el menú "Filtrar". */
    categoria: 'historico' | 'eventos' | 'estudiantil' | 'deportivo' | 'infraestructura';

    /** Degradado de respaldo mientras no exista la portada real. */
    fallback: string;

    /** Pies de foto destacados; se asignan a las primeras imágenes. */
    piesFotos: string[];

    /** Año representativo asignado a las fotos del álbum. */
    anioFotos?: number;
}