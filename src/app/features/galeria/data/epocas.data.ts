import { Coleccion } from '../models/coleccion.model';
import { generarFotos } from './fotos.util';

const BASE = 'assets/galeria/linea-del-tiempo';

/**
 * Épocas de la línea del tiempo del ITD.
 * Único origen de verdad mientras no exista el backend.
 */
export const EPOCAS: Coleccion[] = [
    {
        id: '1920-1950',
        seccion: 'timeline',
        titulo: '1920 - 1950',
        subtitulo: 'Nuestros inicios',
        descripcion: 'Los primeros pasos del Instituto Tecnológico de Durango.',
        totalFotos: 24,
        fotos: generarFotos(BASE, '1920-1950', 24, {
            anio: 1935,
            pies: [
                'Edificio original del ITD, década de 1920',
                'Grupo de estudiantes fundadores',
                'Fachada histórica del plantel'
            ]
        })
    },
    {
        id: '1951-1980',
        seccion: 'timeline',
        titulo: '1951 - 1980',
        subtitulo: 'Crecimiento y formación',
        descripcion: 'Una época de expansión académica y desarrollo institucional.',
        totalFotos: 86,
        fotos: generarFotos(BASE, '1951-1980', 86, {
            anio: 1965,
            pies: [
                'Nuevo edificio académico del ITD',
                'Estudiantes en clase, década de 1960',
                'Vista aérea del campus'
            ]
        })
    },
    {
        id: '1981-2000',
        seccion: 'timeline',
        titulo: '1981 - 2000',
        subtitulo: 'Modernización',
        descripcion: 'Nuevas carreras, infraestructura y tecnología.',
        totalFotos: 112,
        fotos: generarFotos(BASE, '1981-2000', 112, {
            anio: 1990,
            pies: [
                'Edificio principal del ITD renovado',
                'Alumnos en laboratorio de prácticas',
                'Andador central del campus'
            ]
        })
    },
    {
        id: '2001-2010',
        seccion: 'timeline',
        titulo: '2001 - 2010',
        subtitulo: 'Innovación y tecnología',
        descripcion: 'Impulso a la investigación y al desarrollo tecnológico.',
        totalFotos: 156,
        fotos: generarFotos(BASE, '2001-2010', 156, {
            anio: 2005,
            pies: [
                'Edificio de innovación tecnológica',
                'Equipo de estudiantes en proyecto de robótica',
                'Centro de cómputo del ITD'
            ]
        })
    },
    {
        id: '2011-actualidad',
        seccion: 'timeline',
        titulo: '2011 - Actualidad',
        subtitulo: 'Hacia el futuro',
        descripcion: 'Formando líderes para un mundo en constante evolución.',
        totalFotos: 210,
        fotos: generarFotos(BASE, '2011-actualidad', 210, {
            anio: 2024,
            pies: [
                'Fachada actual del Instituto Tecnológico de Durango',
                'Estudiantes trabajando en prototipo',
                'Vista panorámica del campus actual'
            ]
        })
    }
];