import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { environment } from '../../../../environments/environment';
import type { Coleccion, ColeccionConFotos, ItemNavColeccion, SeccionId, } from '../models/coleccion.model';

/** Segmento de URL de cada sección, tal como lo espera la API. */
const RUTA_DE_SECCION: Record<SeccionId, string> = {
  timeline: 'linea-del-tiempo',
  albums: 'albumes',
  instalaciones: 'instalaciones',
  estudiantes: 'estudiantes',
};

/** Chip de categoría para los filtros del sitio. */
export interface CategoriaPublica {
  slug: string;
  nombre: string;
}

/** Totales para el encabezado de la Galería. */
export interface EstadisticasGaleria {
  totalFotos: number;
}

/**
 * Acceso a los contenidos de la Galería ITD.
 *
 * Las respuestas se comparten entre suscriptores con shareReplay:
 * la barra lateral de una colección y su cuadrícula piden los
 * mismos datos, y no tiene sentido traerlos dos veces.
 */
@Injectable({ providedIn: 'root' })
export class GaleriaService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/galeria`;

  /** Caché por sección, válida mientras dure la visita. */
  private readonly cache = new Map<SeccionId, Observable<Coleccion[]>>();

  /** Colecciones publicadas de una sección. */
  getColecciones(seccion: SeccionId): Observable<Coleccion[]> {
    const enCache = this.cache.get(seccion);
    if (enCache) return enCache;

    const peticion = this.http
      .get<Coleccion[]>(`${this.url}/${RUTA_DE_SECCION[seccion]}`)
      .pipe(shareReplay({ bufferSize: 1, refCount: false }));

    this.cache.set(seccion, peticion);
    return peticion;
  }

  /** Una colección con todas sus fotografías. */
  getColeccion(
    seccion: SeccionId,
    id: string,
  ): Observable<ColeccionConFotos> {
    return this.http.get<ColeccionConFotos>(
      `${this.url}/${RUTA_DE_SECCION[seccion]}/${id}`,
    );
  }

  /** Lista reducida para la barra lateral de navegación. */
  getNavColecciones(seccion: SeccionId): Observable<ItemNavColeccion[]> {
    return this.getColecciones(seccion).pipe(
      map((colecciones) =>
        colecciones.map((c) => ({
          id: c.id,
          titulo: c.titulo,
          subtitulo: c.subtitulo ?? '',
        })),
      ),
    );
  }

  /** Categorías de una sección, para los chips de filtro. */
  getCategorias(seccion: SeccionId): Observable<CategoriaPublica[]> {
    return this.http.get<CategoriaPublica[]>(
      `${this.url}/${RUTA_DE_SECCION[seccion]}/categorias`,
    );
  }

  /** Totales para el encabezado. */
  getEstadisticas(): Observable<EstadisticasGaleria> {
    return this.http.get<EstadisticasGaleria>(`${this.url}/estadisticas`);
  }

  /** La API entrega rutas relativas; el `img` necesita la absoluta. */
  urlAbsoluta(ruta: string | null | undefined): string {
    return ruta ? `${environment.apiUrl}${ruta}` : '';
  }
}