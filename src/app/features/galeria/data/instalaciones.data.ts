import { ChipCategoria, Instalacion } from '../models/instalacion.model';
import { GRADIENTES } from './fotos.util';

export const BASE_INSTALACIONES = 'assets/galeria/instalaciones';

const [OLIVA, ROJO, MORADO, VERDE, AZUL] = GRADIENTES;

/** Chips de filtro por categoría. */
export const CHIPS_INSTALACIONES: ChipCategoria[] = [
    { id: 'todas', label: 'Todas' },
    { id: 'academicas', label: 'Académicas' },
    { id: 'laboratorios', label: 'Laboratorios' },
    { id: 'deportivas', label: 'Deportivas' },
    { id: 'administrativas', label: 'Administrativas' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'areas-comunes', label: 'Áreas comunes' }
];

/**
 * Instalaciones del campus del ITD.
 * Único origen de verdad mientras no exista el backend.
 */
export const INSTALACIONES: Instalacion[] = [
    {
        id: 'aulas',
        titulo: 'Aulas',
        descripcion: 'Espacios equipados para una enseñanza moderna y colaborativa.',
        portada: `${BASE_INSTALACIONES}/aulas.jpg`,
        portadaAlt: 'Aula del ITD con mobiliario y proyector',
        totalFotos: 42,
        categoria: 'academicas',
        categoriaLabel: 'Académicas',
        fallback: OLIVA,
        piesFotos: [
            'Aula equipada con proyector',
            'Clase en sesión',
            'Mobiliario para trabajo colaborativo',
            'Pasillo de acceso a las aulas'
        ]
    },
    {
        id: 'centro-computo',
        titulo: 'Centro de Cómputo',
        descripcion: 'Laboratorios con tecnología de vanguardia y acceso a internet.',
        portada: `${BASE_INSTALACIONES}/centro-computo.jpg`,
        portadaAlt: 'Centro de cómputo con equipos alineados',
        totalFotos: 38,
        categoria: 'academicas',
        categoriaLabel: 'Académicas',
        fallback: AZUL,
        piesFotos: [
            'Sala de cómputo del plantel',
            'Estudiantes en práctica de laboratorio',
            'Equipos de cómputo actualizados',
            'Área de trabajo individual'
        ]
    },
    {
        id: 'biblioteca',
        titulo: 'Biblioteca',
        descripcion: 'Acervo bibliográfico especializado y espacios de estudio.',
        portada: `${BASE_INSTALACIONES}/biblioteca.jpg`,
        portadaAlt: 'Sala de lectura de la biblioteca del ITD',
        totalFotos: 54,
        categoria: 'servicios',
        categoriaLabel: 'Servicios',
        fallback: MORADO,
        piesFotos: [
            'Sala de lectura',
            'Estantería del acervo',
            'Área de estudio en grupo',
            'Mostrador de préstamo'
        ]
    },
    {
        id: 'laboratorios',
        titulo: 'Laboratorios',
        descripcion: 'Laboratorios especializados para la investigación y la práctica.',
        portada: `${BASE_INSTALACIONES}/laboratorios.jpg`,
        portadaAlt: 'Estudiantes trabajando en un laboratorio del ITD',
        totalFotos: 71,
        categoria: 'laboratorios',
        categoriaLabel: 'Laboratorios',
        fallback: VERDE,
        piesFotos: [
            'Práctica en laboratorio de química',
            'Equipo de medición especializado',
            'Trabajo en mesa de laboratorio',
            'Instrumental de investigación'
        ]
    },
    {
        id: 'auditorio',
        titulo: 'Auditorio',
        descripcion: 'Espacio para conferencias, eventos y actividades institucionales.',
        portada: `${BASE_INSTALACIONES}/auditorio.jpg`,
        portadaAlt: 'Auditorio del ITD con butacas y escenario',
        totalFotos: 33,
        categoria: 'areas-comunes',
        categoriaLabel: 'Áreas comunes',
        fallback: ROJO,
        piesFotos: [
            'Butacas del auditorio',
            'Escenario durante un evento',
            'Conferencia en el auditorio',
            'Acceso principal del recinto'
        ]
    },
    {
        id: 'gimnasio',
        titulo: 'Gimnasio',
        descripcion: 'Instalaciones deportivas para el desarrollo físico y el bienestar.',
        portada: `${BASE_INSTALACIONES}/gimnasio.jpg`,
        portadaAlt: 'Duela del gimnasio techado del ITD',
        totalFotos: 46,
        categoria: 'deportivas',
        categoriaLabel: 'Deportivas',
        fallback: OLIVA,
        piesFotos: [
            'Duela del gimnasio techado',
            'Partido en cancha interior',
            'Gradas durante un encuentro',
            'Entrenamiento del representativo'
        ]
    },
    {
        id: 'edificio-administrativo',
        titulo: 'Edificio Administrativo',
        descripcion: 'Centro de gestión y atención a la comunidad estudiantil.',
        portada: `${BASE_INSTALACIONES}/edificio-administrativo.jpg`,
        portadaAlt: 'Fachada del edificio administrativo del ITD',
        totalFotos: 29,
        categoria: 'administrativas',
        categoriaLabel: 'Administrativas',
        fallback: AZUL,
        piesFotos: [
            'Fachada del edificio administrativo',
            'Área de atención a estudiantes',
            'Oficinas del plantel',
            'Vestíbulo principal'
        ]
    },
    {
        id: 'cafeteria',
        titulo: 'Cafetería',
        descripcion: 'Espacio de convivencia y alimentación para estudiantes y personal.',
        portada: `${BASE_INSTALACIONES}/cafeteria.jpg`,
        portadaAlt: 'Área de mesas de la cafetería del ITD',
        totalFotos: 31,
        categoria: 'servicios',
        categoriaLabel: 'Servicios',
        fallback: ROJO,
        piesFotos: [
            'Área de mesas de la cafetería',
            'Convivencia durante el receso',
            'Zona de servicio de alimentos',
            'Terraza exterior'
        ]
    },
    {
        id: 'centro-innovacion',
        titulo: 'Centro de Innovación',
        descripcion: 'Espacio para el desarrollo de proyectos e innovación tecnológica.',
        portada: `${BASE_INSTALACIONES}/centro-innovacion.jpg`,
        portadaAlt: 'Fachada del Centro de Innovación Tecnológica',
        totalFotos: 48,
        categoria: 'laboratorios',
        categoriaLabel: 'Laboratorios',
        fallback: MORADO,
        piesFotos: [
            'Fachada del Centro de Innovación',
            'Área de prototipado',
            'Estudiantes desarrollando un proyecto',
            'Espacio de trabajo colaborativo'
        ]
    },
    {
        id: 'areas-verdes',
        titulo: 'Áreas Verdes',
        descripcion: 'Espacios naturales para el descanso y la convivencia.',
        portada: `${BASE_INSTALACIONES}/areas-verdes.jpg`,
        portadaAlt: 'Jardines y andadores del campus del ITD',
        totalFotos: 57,
        categoria: 'areas-comunes',
        categoriaLabel: 'Áreas comunes',
        fallback: VERDE,
        piesFotos: [
            'Jardines del campus',
            'Andador arbolado',
            'Área de descanso al aire libre',
            'Vista del campus desde los jardines'
        ]
    },
    {
        id: 'estacionamiento',
        titulo: 'Estacionamiento',
        descripcion: 'Amplias áreas de estacionamiento para la comunidad ITD.',
        portada: `${BASE_INSTALACIONES}/estacionamiento.jpg`,
        portadaAlt: 'Estacionamiento del campus del ITD',
        totalFotos: 18,
        categoria: 'servicios',
        categoriaLabel: 'Servicios',
        fallback: OLIVA,
        piesFotos: [
            'Área de estacionamiento',
            'Acceso vehicular al plantel',
            'Señalización del estacionamiento',
            'Vista general del área'
        ]
    },
    {
        id: 'canchas-multiusos',
        titulo: 'Canchas Multiusos',
        descripcion: 'Espacios deportivos al aire libre para diversas actividades.',
        portada: `${BASE_INSTALACIONES}/canchas-multiusos.jpg`,
        portadaAlt: 'Canchas multiusos al aire libre del ITD',
        totalFotos: 35,
        categoria: 'deportivas',
        categoriaLabel: 'Deportivas',
        fallback: AZUL,
        piesFotos: [
            'Cancha multiusos al aire libre',
            'Partido de basquetbol',
            'Actividad deportiva estudiantil',
            'Vista de las canchas del campus'
        ]
    }
];