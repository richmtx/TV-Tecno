import { Injectable } from '@angular/core';
import { Coleccion, ItemNavColeccion, SeccionId } from '../models/coleccion.model';
import { EPOCAS } from '../data/epocas.data';

/**
 * Acceso a las colecciones de la Galería ITD.
 * Hoy resuelve contra datos locales; cuando exista el backend,
 * solo cambia el interior de estos métodos.
 */
@Injectable({ providedIn: 'root' })
export class GaleriaService {

  /** Colecciones de una sección. */
  getColecciones(seccion: SeccionId): Coleccion[] {
    switch (seccion) {
      case 'timeline':
        return EPOCAS;
      // Fase 2: álbumes, instalaciones y estudiantes.
      default:
        return [];
    }
  }

  /** Una colección concreta, o undefined si el id no existe. */
  getColeccion(seccion: SeccionId, id: string): Coleccion | undefined {
    return this.getColecciones(seccion).find(c => c.id === id);
  }

  /** Lista reducida para la barra lateral de navegación. */
  getNavColecciones(seccion: SeccionId): ItemNavColeccion[] {
    return this.getColecciones(seccion).map(c => ({
      id: c.id,
      titulo: c.titulo,
      subtitulo: c.subtitulo
    }));
  }
}