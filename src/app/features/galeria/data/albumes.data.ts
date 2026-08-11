import { Album } from '../models/album.model';
import { GRADIENTES } from './fotos.util';

export const BASE_ALBUMES = 'assets/galeria/albumes';

const [OLIVA, ROJO, MORADO, VERDE, AZUL] = GRADIENTES;

/**
 * Álbumes de la Galería ITD.
 * Único origen de verdad mientras no exista el backend.
 */
export const ALBUMES: Album[] = [
    {
        id: 'nuestros-inicios',
        titulo: 'Nuestros inicios',
        subtitulo: 'Los primeros años del Tecnológico',
        descripcion: 'Las imágenes más antiguas que conservamos del Instituto Tecnológico de Durango.',
        portada: `${BASE_ALBUMES}/nuestros-inicios.jpg`,
        portadaAlt: 'Fachada original del Instituto Tecnológico de Durango',
        totalFotos: 24,
        periodo: '1920 - 1950',
        anioInicio: 1920,
        categoria: 'historico',
        fallback: OLIVA,
        piesFotos: [
            'Fachada original del plantel',
            'Primeros estudiantes del Tecnológico',
            'Acto cívico en el patio central',
            'Aula de clases en los años treinta'
        ]
    },
    {
        id: 'crecimiento-formacion',
        titulo: 'Crecimiento y formación',
        subtitulo: 'Expansión académica',
        descripcion: 'El periodo en que el ITD amplió su oferta educativa y su comunidad.',
        portada: `${BASE_ALBUMES}/crecimiento-formacion.jpg`,
        portadaAlt: 'Grupo de estudiantes en los primeros años del plantel',
        totalFotos: 86,
        periodo: '1951 - 1980',
        anioInicio: 1951,
        categoria: 'historico',
        fallback: ROJO,
        piesFotos: [
            'Generación de egresados',
            'Clase en el edificio académico',
            'Vista del campus en los años sesenta',
            'Prácticas de taller'
        ]
    },
    {
        id: 'modernizacion',
        titulo: 'Modernización',
        subtitulo: 'Nueva infraestructura',
        descripcion: 'Obras, remodelaciones y equipamiento que transformaron el plantel.',
        portada: `${BASE_ALBUMES}/modernizacion.jpg`,
        portadaAlt: 'Edificio del ITD tras su renovación',
        totalFotos: 112,
        periodo: '1981 - 2000',
        anioInicio: 1981,
        categoria: 'infraestructura',
        fallback: MORADO,
        piesFotos: [
            'Edificio principal renovado',
            'Construcción de nuevas aulas',
            'Andador central del campus',
            'Laboratorio recién equipado'
        ]
    },
    {
        id: 'innovacion-tecnologia',
        titulo: 'Innovación y tecnología',
        subtitulo: 'Investigación y desarrollo',
        descripcion: 'Proyectos, laboratorios y espacios dedicados al desarrollo tecnológico.',
        portada: `${BASE_ALBUMES}/innovacion-tecnologia.jpg`,
        portadaAlt: 'Edificio de innovación tecnológica del ITD',
        totalFotos: 156,
        periodo: '2001 - 2010',
        anioInicio: 2001,
        categoria: 'infraestructura',
        fallback: VERDE,
        piesFotos: [
            'Centro de innovación tecnológica',
            'Proyecto de robótica estudiantil',
            'Centro de cómputo del plantel',
            'Presentación de prototipos'
        ]
    },
    {
        id: 'actualidad-itd',
        titulo: 'Actualidad ITD',
        subtitulo: 'El campus hoy',
        descripcion: 'Cómo luce el Instituto Tecnológico de Durango en la actualidad.',
        portada: `${BASE_ALBUMES}/actualidad-itd.jpg`,
        portadaAlt: 'Fachada actual del Instituto Tecnológico de Durango',
        totalFotos: 210,
        periodo: '2011 - Hoy',
        anioInicio: 2011,
        categoria: 'infraestructura',
        fallback: AZUL,
        piesFotos: [
            'Fachada actual del ITD',
            'Vista panorámica del campus',
            'Áreas verdes del plantel',
            'Comunidad estudiantil del ITD'
        ]
    },
    {
        id: 'eventos-institucionales',
        titulo: 'Eventos institucionales',
        subtitulo: 'Actos y celebraciones',
        descripcion: 'Ceremonias, aniversarios y actos oficiales del Tecnológico.',
        portada: `${BASE_ALBUMES}/eventos-institucionales.jpg`,
        portadaAlt: 'Autoridades del ITD durante un evento institucional',
        totalFotos: 98,
        periodo: '2010 - Hoy',
        anioInicio: 2010,
        categoria: 'eventos',
        fallback: ROJO,
        piesFotos: [
            'Ceremonia de aniversario',
            'Autoridades en el presídium',
            'Inauguración de instalaciones',
            'Reconocimiento a la comunidad'
        ]
    },
    {
        id: 'vida-estudiantil',
        titulo: 'Vida estudiantil',
        subtitulo: 'Día a día en el campus',
        descripcion: 'La convivencia y las actividades cotidianas de nuestra comunidad.',
        portada: `${BASE_ALBUMES}/vida-estudiantil.jpg`,
        portadaAlt: 'Estudiantes del ITD en el campus',
        totalFotos: 143,
        periodo: '2010 - Hoy',
        anioInicio: 2010,
        categoria: 'estudiantil',
        fallback: OLIVA,
        piesFotos: [
            'Estudiantes en las áreas verdes',
            'Convivencia entre clases',
            'Trabajo en equipo en el aula',
            'Actividades de bienvenida'
        ]
    },
    {
        id: 'actividades-deportivas',
        titulo: 'Actividades deportivas',
        subtitulo: 'Representativos y torneos',
        descripcion: 'Equipos, competencias y jornadas deportivas del Tecnológico.',
        portada: `${BASE_ALBUMES}/actividades-deportivas.jpg`,
        portadaAlt: 'Equipo deportivo representativo del ITD',
        totalFotos: 67,
        periodo: '2005 - Hoy',
        anioInicio: 2005,
        categoria: 'deportivo',
        fallback: AZUL,
        piesFotos: [
            'Equipo representativo del ITD',
            'Partido en el gimnasio',
            'Torneo interno de futbol',
            'Premiación deportiva'
        ]
    },
    {
        id: 'ceremonias-graduaciones',
        titulo: 'Ceremonias y graduaciones',
        subtitulo: 'Cierre de una etapa',
        descripcion: 'Las ceremonias en que nuestras generaciones concluyen su formación.',
        portada: `${BASE_ALBUMES}/ceremonias-graduaciones.jpg`,
        portadaAlt: 'Egresados lanzando sus birretes durante la graduación',
        totalFotos: 89,
        periodo: '2000 - Hoy',
        anioInicio: 2000,
        categoria: 'eventos',
        fallback: MORADO,
        piesFotos: [
            'Egresados lanzando el birrete',
            'Entrega de reconocimientos',
            'Foto de generación',
            'Familiares en la ceremonia'
        ]
    },
    {
        id: 'visitas-convenios',
        titulo: 'Visitas y convenios',
        subtitulo: 'Vinculación institucional',
        descripcion: 'Acuerdos, visitas y colaboraciones con otras instituciones y empresas.',
        portada: `${BASE_ALBUMES}/visitas-convenios.jpg`,
        portadaAlt: 'Firma de convenio institucional en el ITD',
        totalFotos: 53,
        periodo: '2005 - Hoy',
        anioInicio: 2005,
        categoria: 'eventos',
        fallback: VERDE,
        piesFotos: [
            'Firma de convenio institucional',
            'Visita de delegación externa',
            'Recorrido por las instalaciones',
            'Reunión de vinculación'
        ]
    },
    {
        id: 'talleres-capacitaciones',
        titulo: 'Talleres y capacitaciones',
        subtitulo: 'Formación práctica',
        descripcion: 'Sesiones prácticas y cursos que complementan la formación académica.',
        portada: `${BASE_ALBUMES}/talleres-capacitaciones.jpg`,
        portadaAlt: 'Estudiantes durante un taller práctico',
        totalFotos: 77,
        periodo: '2010 - Hoy',
        anioInicio: 2010,
        categoria: 'estudiantil',
        fallback: ROJO,
        piesFotos: [
            'Taller práctico en laboratorio',
            'Capacitación con equipo especializado',
            'Trabajo en mesa de proyectos',
            'Demostración a cargo de un instructor'
        ]
    },
    {
        id: 'infraestructura',
        titulo: 'Infraestructura',
        subtitulo: 'Espacios del campus',
        descripcion: 'Edificios, áreas y obras que conforman el plantel del ITD.',
        portada: `${BASE_ALBUMES}/infraestructura.jpg`,
        portadaAlt: 'Vista aérea del campus del ITD',
        totalFotos: 66,
        periodo: '1980 - Hoy',
        anioInicio: 1980,
        categoria: 'infraestructura',
        fallback: AZUL,
        piesFotos: [
            'Vista aérea del campus',
            'Edificio académico',
            'Accesos y andadores',
            'Obra en desarrollo'
        ]
    }
];