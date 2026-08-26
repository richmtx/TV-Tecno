/**
 * Noticia tal como la devuelve el API de NestJS.
 * Los nombres coinciden con la entity del backend.
 */
export interface Noticia {
    id: number;

    /** Identificador para la URL: /noticias/:slug */
    slug: string;

    titulo: string;

    /** Texto corto: tarjeta del home y bajada del detalle */
    descripcion: string;

    /** Cuerpo en HTML sanitizado. Null cuando no se ha capturado. */
    contenido: string | null;

    /** Categoría de texto libre: 'TECNOLOGÍA', 'DEPORTES', etc. */
    etiqueta: string;

    /** Fecha del acontecimiento, formato ISO (yyyy-MM-dd) */
    fecha: string;

    /** Ruta relativa del backend: /uploads/noticias/xxx.jpg */
    imagenUrl: string | null;

    imagenAlt: string | null;

    /** Minutos de lectura. Null cuando no hay contenido. */
    tiempoLectura: number | null;

    /** Posición en el home. 1 = noticia destacada (panel grande). */
    orden: number;
}

const MESES_LARGO = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

/**
 * '2026-06-02' -> '2 junio 2026'
 *
 * No usamos new Date() porque interpreta la fecha como UTC y en
 * México (UTC-6) la recorre al día anterior. Partimos el string.
 * El backend puede mandar '2026-06-02' o '2026-06-02T00:00:00.000Z'.
 */
export function fechaLarga(iso: string): string {
    const [anio, mes, dia] = iso.slice(0, 10).split('-').map(Number);
    return `${dia} ${MESES_LARGO[mes - 1]} ${anio}`;
}