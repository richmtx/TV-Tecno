import { Foto } from '../models/coleccion.model';

/** Degradados de respaldo mientras no existan las fotos reales. */
export const GRADIENTES = [
    'linear-gradient(135deg, #4a3d13, #836d23)',
    'linear-gradient(135deg, #661a20, #b42e38)',
    'linear-gradient(135deg, #341830, #5c2c56)',
    'linear-gradient(135deg, #022e22, #04513c)',
    'linear-gradient(135deg, #191f5a, #2c379d)'
];

/**
 * Genera las fotos de una colección.
 * Las etiquetas se repiten cíclicamente hasta completar el total,
 * lo que permite maquetar la cuadrícula antes de tener el material real.
 *
 * @param base    Carpeta de la sección, ej. 'assets/galeria/albumes'
 * @param id      Slug de la colección; también es el nombre de su subcarpeta
 * @param total   Número de fotos a generar
 * @param etiquetas Descripciones que se rotan entre las fotos
 */
export function generarFotos(
    base: string,
    id: string,
    total: number,
    etiquetas: string[]
): Foto[] {
    return Array.from({ length: total }, (_, i) => ({
        id: `${id}-${i + 1}`,
        titulo: etiquetas[i % etiquetas.length],
        src: `${base}/${id}/${i + 1}.jpg`,
        fallback: GRADIENTES[i % GRADIENTES.length]
    }));
}