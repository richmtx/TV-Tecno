/** Medios de contacto del canal. */
export interface ContactoDatos {
    id: number;

    correo: string;
    /** Como se muestra: (618) 000 0000 */
    telefono: string;
    /** Solo dígitos con lada, para el href="tel:". */
    telefonoEnlace: string;
    /** Completa, para la página de Contacto. */
    direccion: string;
    /** Abreviada, para el pie de página. */
    direccionCorta: string;
    horario: string;
    horarioDetalle: string;
    egresadosUrl: string;

    creadoEn: string;
    actualizadoEn: string;
    actualizadoPor: number | null;
}

/**
 * Cuenta del canal en una plataforma.
 * `clave` es el identificador del SVG que dibuja el frontend.
 */
export interface RedSocial {
    id: number;
    clave: string;
    nombre: string;
    url: string;
    /** Nombre alterno de la cuenta, si difiere de la plataforma. */
    etiqueta: string | null;
    orden: number;
    activo: boolean;
}

/** Imagen de posición fija, con sus URLs resueltas. */
export interface ContactoImagen {
    clave: string;
    alt: string;
    ancho: number | null;
    alto: number | null;
    urls: {
        thumb: string;
        medium: string;
    };
}

/** Todo lo que la página de Contacto y el pie necesitan. */
export interface ContactoCompleto {
    datos: ContactoDatos;
    redes: RedSocial[];
    imagenes: ContactoImagen[];
}