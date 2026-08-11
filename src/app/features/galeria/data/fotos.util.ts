import { Foto } from '../models/coleccion.model';

/** Degradados de respaldo mientras no existan las fotos reales. */
export const GRADIENTES = [
    'linear-gradient(135deg, #4a3d13, #836d23)',
    'linear-gradient(135deg, #661a20, #b42e38)',
    'linear-gradient(135deg, #341830, #5c2c56)',
    'linear-gradient(135deg, #022e22, #04513c)',
    'linear-gradient(135deg, #191f5a, #2c379d)'
];

/** Opciones de generación de una colección de prueba. */
export interface OpcionesFotos {
    /** Pies de foto de ejemplo; se asignan solo a las primeras fotos. */
    pies?: string[];
    /** Año asignado a todas las fotos de la colección. */
    anio?: number;
}

/**
 * Genera las fotos de una colección.
 *
 * Los pies se asignan únicamente a las primeras fotos, reflejando
 * cómo se comportará el sistema real: el administrador sube el lote
 * completo y describe solo las imágenes que lo ameritan.
 *
 * @param base  Carpeta de la sección, ej. 'assets/galeria/albumes'
 * @param id    Slug de la colección; también es el nombre de su subcarpeta
 * @param total Número de fotos a generar
 */
export function generarFotos(
    base: string,
    id: string,
    total: number,
    opciones: OpcionesFotos = {}
): Foto[] {
    const { pies = [], anio } = opciones;

    return Array.from({ length: total }, (_, i) => ({
        id: `${id}-${i + 1}`,
        src: `${base}/${id}/${i + 1}.jpg`,
        pie: pies[i],
        anio,
        fallback: GRADIENTES[i % GRADIENTES.length]
    }));
}