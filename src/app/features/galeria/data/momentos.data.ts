import { Momento, Testimonio } from '../models/momento.model';
import { GRADIENTES } from './fotos.util';

export const BASE_ESTUDIANTES = 'assets/galeria/estudiantes';

const [OLIVA, ROJO, MORADO, VERDE, AZUL] = GRADIENTES;

/** Testimonio mostrado al cierre de la sección Estudiantes. */
export const TESTIMONIO_ESTUDIANTES: Testimonio = {
    cita: 'Ser estudiante del ITD es más que estudiar, es formar parte de una comunidad que te impulsa a crecer y transformar tu entorno.',
    autor: 'Ana Sofía',
    carrera: 'Ingeniería en Sistemas'
};

/**
 * Momentos de la vida estudiantil del ITD.
 * Único origen de verdad mientras no exista el backend.
 */
export const MOMENTOS: Momento[] = [
    {
        id: 'vida-campus',
        titulo: 'Vida en el campus',
        subtitulo: 'Convivencia diaria',
        descripcion: 'El día a día de quienes hacen del Tecnológico su segunda casa.',
        portada: `${BASE_ESTUDIANTES}/vida-campus.jpg`,
        portadaAlt: 'Grupo de estudiantes del ITD en las áreas verdes del campus',
        totalFotos: 186,
        categoria: 'campus',
        anio: 2025,
        fallback: VERDE,
        etiquetasFotos: [
            'Estudiantes en las áreas verdes',
            'Convivencia entre clases',
            'Recorrido por el campus',
            'Grupo de amigos en el andador'
        ]
    },
    {
        id: 'proyectos-competencias',
        titulo: 'Proyectos y competencias',
        subtitulo: 'Talento en acción',
        descripcion: 'Prototipos, concursos y proyectos desarrollados por nuestra comunidad.',
        portada: `${BASE_ESTUDIANTES}/proyectos-competencias.jpg`,
        portadaAlt: 'Estudiantes trabajando en un proyecto de robótica',
        totalFotos: 142,
        categoria: 'academico',
        anio: 2025,
        fallback: OLIVA,
        etiquetasFotos: [
            'Proyecto de robótica en desarrollo',
            'Presentación ante el jurado',
            'Trabajo en equipo sobre el prototipo',
            'Premiación de una competencia'
        ]
    },
    {
        id: 'graduaciones',
        titulo: 'Graduaciones',
        subtitulo: 'Fin de una etapa',
        descripcion: 'El momento en que nuestras generaciones cierran su paso por el ITD.',
        portada: `${BASE_ESTUDIANTES}/graduaciones.jpg`,
        portadaAlt: 'Egresados lanzando sus birretes al aire',
        totalFotos: 98,
        categoria: 'ceremonias',
        anio: 2025,
        fallback: AZUL,
        etiquetasFotos: [
            'Egresados lanzando el birrete',
            'Foto de generación',
            'Entrega de títulos',
            'Celebración con familiares'
        ]
    },
    {
        id: 'deportes-itd',
        titulo: 'Deportes ITD',
        subtitulo: 'Representativos del Tecnológico',
        descripcion: 'Equipos, entrenamientos y torneos que nos representan.',
        portada: `${BASE_ESTUDIANTES}/deportes-itd.jpg`,
        portadaAlt: 'Equipos deportivos representativos del ITD',
        totalFotos: 114,
        categoria: 'deportivo',
        anio: 2024,
        fallback: ROJO,
        etiquetasFotos: [
            'Equipo representativo del ITD',
            'Entrenamiento en el gimnasio',
            'Encuentro deportivo',
            'Celebración tras la victoria'
        ]
    },
    {
        id: 'ferias-exposiciones',
        titulo: 'Ferias y exposiciones',
        subtitulo: 'Muestras académicas',
        descripcion: 'Espacios donde nuestros estudiantes comparten lo que han construido.',
        portada: `${BASE_ESTUDIANTES}/ferias-exposiciones.jpg`,
        portadaAlt: 'Estudiantes presentando proyectos en una feria académica',
        totalFotos: 76,
        categoria: 'academico',
        anio: 2024,
        fallback: MORADO,
        etiquetasFotos: [
            'Stand de proyectos estudiantiles',
            'Explicación a los visitantes',
            'Muestra de prototipos',
            'Recorrido por la exposición'
        ]
    },
    {
        id: 'talleres-capacitaciones',
        titulo: 'Talleres y capacitaciones',
        subtitulo: 'Aprendizaje práctico',
        descripcion: 'Sesiones que complementan la formación dentro del aula.',
        portada: `${BASE_ESTUDIANTES}/talleres-capacitaciones.jpg`,
        portadaAlt: 'Estudiantes durante un taller práctico',
        totalFotos: 89,
        categoria: 'academico',
        anio: 2024,
        fallback: OLIVA,
        etiquetasFotos: [
            'Taller práctico en curso',
            'Instructor guiando la sesión',
            'Trabajo en mesa de proyectos',
            'Uso de equipo especializado'
        ]
    },
    {
        id: 'cultura-arte',
        titulo: 'Cultura y arte',
        subtitulo: 'Expresión estudiantil',
        descripcion: 'Danza, música y manifestaciones artísticas de nuestra comunidad.',
        portada: `${BASE_ESTUDIANTES}/cultura-arte.jpg`,
        portadaAlt: 'Presentación de danza folclórica del ITD',
        totalFotos: 67,
        categoria: 'cultural',
        anio: 2024,
        fallback: ROJO,
        etiquetasFotos: [
            'Presentación de danza folclórica',
            'Grupo musical del plantel',
            'Ensayo del grupo artístico',
            'Público durante la función'
        ]
    },
    {
        id: 'voluntariado',
        titulo: 'Voluntariado',
        subtitulo: 'Compromiso con la comunidad',
        descripcion: 'Jornadas en que nuestros estudiantes devuelven algo a su entorno.',
        portada: `${BASE_ESTUDIANTES}/voluntariado.jpg`,
        portadaAlt: 'Estudiantes plantando árboles en una jornada de voluntariado',
        totalFotos: 55,
        categoria: 'social',
        anio: 2023,
        fallback: VERDE,
        etiquetasFotos: [
            'Jornada de reforestación',
            'Trabajo comunitario en equipo',
            'Entrega de apoyos',
            'Brigada estudiantil en campo'
        ]
    }
];