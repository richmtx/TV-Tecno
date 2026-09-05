/** Bloques de la página que contienen imágenes de posición fija. */
export type GrupoImagen = 'hero' | 'cobertura';

/** Bloques de prosa de la página. */
export interface AcercaContenido {
    id: number;

    heroEyebrow: string;
    heroTitulo: string;
    heroSubtitulo: string;

    mvEyebrow: string;
    mvTitulo: string;
    misionTitulo: string;
    misionTexto: string;
    visionTitulo: string;
    visionTexto: string;

    coberturaEyebrow: string;
    coberturaTitulo: string;
    coberturaTexto: string;

    creadoEn: string;
    actualizadoEn: string;
    actualizadoPor: number | null;
}

/**
 * Un valor, un renglón de cobertura o un indicador.
 *
 * `clave` es el identificador estable con el que el componente
 * localiza cada elemento; el orden de la respuesta ya viene dado,
 * pero la clave permite no depender de la posición.
 */
export interface AcercaItem {
    clave: string;
    titulo: string;
    subtitulo: string | null;
    icono: string | null;
}

/**
 * Imagen de posición fija.
 *
 * Las dimensiones vienen del archivo que subió el editor y varían
 * en cada reemplazo: el diseño no depende de ellas, porque las
 * cajas tienen su proporción fijada en CSS y la imagen se recorta
 * con object-fit para llenarlas.
 */
export interface AcercaImagen {
    clave: string;
    etiqueta: string;
    alt: string;
    ancho: number | null;
    alto: number | null;
    urls: {
        thumb: string;
        medium: string;
    };
}

/** La página completa, tal como llega del endpoint público. */
export interface AcercaCompleto {
    contenido: AcercaContenido;
    valores: AcercaItem[];
    cobertura: AcercaItem[];
    stats: AcercaItem[];
    imagenes: Record<GrupoImagen, AcercaImagen[]>;
}