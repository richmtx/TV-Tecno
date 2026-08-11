import { Injectable } from '@angular/core';
import { Coleccion, ItemNavColeccion, SeccionId } from '../models/coleccion.model';
import { Album } from '../models/album.model';
import { Instalacion } from '../models/instalacion.model';
import { Momento } from '../models/momento.model';
import { EPOCAS } from '../data/epocas.data';
import { ALBUMES, BASE_ALBUMES } from '../data/albumes.data';
import { BASE_INSTALACIONES, INSTALACIONES } from '../data/instalaciones.data';
import { BASE_ESTUDIANTES, MOMENTOS } from '../data/momentos.data';
import { generarFotos } from '../data/fotos.util';

/**
 * Acceso a los contenidos de la Galería ITD.
 *
 * Expone dos vistas de los mismos datos: los tipos específicos que
 * consumen las tarjetas de cada índice (Album, Instalacion, Momento),
 * y la vista unificada `Coleccion` que consume la página de detalle.
 *
 * Hoy resuelve contra datos locales; cuando exista el backend,
 * solo cambia el interior de estos métodos.
 */
@Injectable({ providedIn: 'root' })
export class GaleriaService {

  // ---------- Índices ----------

  getAlbumes(): Album[] {
    return ALBUMES;
  }

  getInstalaciones(): Instalacion[] {
    return INSTALACIONES;
  }

  getMomentos(): Momento[] {
    return MOMENTOS;
  }

  // ---------- Detalle ----------

  /** Colecciones de una sección, en la vista unificada. */
  getColecciones(seccion: SeccionId): Coleccion[] {
    switch (seccion) {
      case 'timeline':
        return EPOCAS;
      case 'albums':
        return ALBUMES.map(a => this.albumAColeccion(a));
      case 'instalaciones':
        return INSTALACIONES.map(i => this.instalacionAColeccion(i));
      case 'estudiantes':
        return MOMENTOS.map(m => this.momentoAColeccion(m));
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

  // ---------- Mapeos ----------

  private albumAColeccion(a: Album): Coleccion {
    return {
      id: a.id,
      seccion: 'albums',
      titulo: a.titulo,
      subtitulo: a.periodo,
      descripcion: a.descripcion,
      totalFotos: a.totalFotos,
      fotos: generarFotos(BASE_ALBUMES, a.id, a.totalFotos, a.etiquetasFotos)
    };
  }

  private instalacionAColeccion(i: Instalacion): Coleccion {
    return {
      id: i.id,
      seccion: 'instalaciones',
      titulo: i.titulo,
      subtitulo: i.categoriaLabel,
      descripcion: i.descripcion,
      totalFotos: i.totalFotos,
      fotos: generarFotos(BASE_INSTALACIONES, i.id, i.totalFotos, i.etiquetasFotos)
    };
  }

  private momentoAColeccion(m: Momento): Coleccion {
    return {
      id: m.id,
      seccion: 'estudiantes',
      titulo: m.titulo,
      subtitulo: m.subtitulo,
      descripcion: m.descripcion,
      totalFotos: m.totalFotos,
      fotos: generarFotos(BASE_ESTUDIANTES, m.id, m.totalFotos, m.etiquetasFotos)
    };
  }
}