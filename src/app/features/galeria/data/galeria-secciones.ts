import { TabId } from '../models/filtros-galeria.model';

/**
 * Textos del pie de página (fotos-itd e historia) para cada sección
 * de la Galería. Es el único lugar donde se editan estos contenidos.
 */
export interface ContenidoSeccion {
    /** CTA de envío de fotos. */
    fotos: {
        titulo: string;
        subtitulo: string;
        textoBoton: string;
    };
    /** Cita de cierre. Cada línea se renderiza como un párrafo. */
    historia: {
        lineas: string[];
    };
}

export const CONTENIDO_SECCIONES: Record<TabId, ContenidoSeccion> = {

    timeline: {
        fotos: {
            titulo: '¿Tienes fotos históricas del ITD?',
            subtitulo: 'Comparte tus recuerdos y sé parte de nuestra historia.',
            textoBoton: 'Ir a contacto'
        },
        historia: {
            lineas: [
                '"Nuestra historia está hecha de personas, aprendizajes y sueños.',
                'Cada foto guarda un momento que nos ha llevado hasta aquí."'
            ]
        }
    },

    albums: {
        fotos: {
            titulo: '¿Tienes más fotos para compartir?',
            subtitulo: 'Ayúdanos a seguir construyendo nuestra memoria histórica.',
            textoBoton: 'Ir a contacto'
        },
        historia: {
            lineas: [
                '"Cada imagen cuenta una historia, cada álbum guarda',
                'momentos que nos han hecho crecer como institución."'
            ]
        }
    },

    instalaciones: {
        fotos: {
            titulo: '¿Conoces alguna instalación que no aparece?',
            subtitulo: 'Ayúdanos a mantener actualizada nuestra galería de instalaciones.',
            textoBoton: 'Ir a contacto'
        },
        historia: {
            lineas: [
                '"Nuestras instalaciones son el espacio donde las ideas se convierten',
                'en proyectos y los estudiantes en profesionales."'
            ]
        }
    },

    estudiantes: {
        fotos: {
            titulo: '¿Tienes fotos para compartir?',
            subtitulo: 'Comparte esas fotografías que resumen tu paso por el Tecnológico.',
            textoBoton: 'Ir a contacto'
        },
        historia: {
            lineas: [
                '"La vida estudiantil no se mide en semestres, sino en las personas que conociste.',
                'Estas fotos son de todos los que hicieron del ITD su segunda casa."'
            ]
        }
    }

};

/** Testimonio de un estudiante o egresado. */
export interface Testimonio {
    cita: string;
    autor: string;
    carrera: string;
}

/** Testimonio mostrado al cierre de la sección Estudiantes. */
export const TESTIMONIO_ESTUDIANTES: Testimonio = {
    cita: 'Ser estudiante del ITD es más que estudiar, es formar parte de una comunidad que te impulsa a crecer y transformar tu entorno.',
    autor: 'Ana Sofía',
    carrera: 'Ingeniería en Sistemas',
};