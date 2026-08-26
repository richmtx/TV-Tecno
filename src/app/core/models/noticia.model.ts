/**
 * Categorías disponibles para las noticias.
 * El valor se usa como clase CSS (ej. .noticia__etiqueta--tecnologia)
 */
export type CategoriaNoticia =
    | 'noticias'
    | 'academico'
    | 'vinculacion'
    | 'tecnologia'
    | 'cultura';

/** Etiquetas visibles de cada categoría */
export const ETIQUETAS_CATEGORIA: Record<CategoriaNoticia, string> = {
    noticias: 'Noticias',
    academico: 'Académico',
    vinculacion: 'Vinculación',
    tecnologia: 'Tecnología',
    cultura: 'Cultura',
};

export interface Noticia {
    /** Identificador de base de datos (1 a 5, fijos) */
    id: number;

    /** Identificador para la URL: /noticias/:slug */
    slug: string;

    /** Título completo de la noticia */
    titulo: string;

    /** Texto corto: se muestra en la tarjeta y como bajada en el detalle */
    resumen: string;

    /**
     * Cuerpo completo de la noticia en HTML.
     * Se renderiza con [innerHTML] en la página de detalle.
     * Opcional: si viene vacío, el detalle muestra solo el resumen.
     */
    contenido?: string;

    categoria: CategoriaNoticia;

    /** Ruta de la imagen principal */
    imagen: string;

    /** Texto alternativo de la imagen (accesibilidad y SEO) */
    imagenAlt: string;

    /** Fecha de publicación en formato ISO (yyyy-MM-dd) */
    fechaPublicacion: string;

    /** Tiempo estimado de lectura en minutos */
    tiempoLectura: number;

    /** Contador de vistas */
    vistas: number;

    /** Solo una noticia puede ser la destacada del home */
    destacada: boolean;
}

const MESES_LARGO = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

const MESES_CORTO = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
];

/**
 * Parte una fecha ISO (yyyy-MM-dd) en sus componentes numéricos.
 *
 * Importante: NO usamos new Date('2026-06-02') porque JavaScript la
 * interpreta como UTC y en la zona horaria de México (UTC-6) se
 * convierte en el día anterior. Partimos el string a mano.
 */
function partesFecha(iso: string): { dia: number; mes: number; anio: number } {
    const [anio, mes, dia] = iso.split('-').map(Number);
    return { dia, mes, anio };
}

/** '2026-06-02' -> '2 junio 2026' */
export function fechaLarga(iso: string): string {
    const { dia, mes, anio } = partesFecha(iso);
    return `${dia} ${MESES_LARGO[mes - 1]} ${anio}`;
}

/** '2026-06-02' -> { dia: '2', mes: 'Jun', anio: '2026' } */
export function fechaCorta(iso: string): { dia: string; mes: string; anio: string } {
    const { dia, mes, anio } = partesFecha(iso);
    return { dia: String(dia), mes: MESES_CORTO[mes - 1], anio: String(anio) };
}