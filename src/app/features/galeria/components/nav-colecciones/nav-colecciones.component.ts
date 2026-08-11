import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItemNavColeccion } from '../../models/coleccion.model';

/**
 * Barra lateral para saltar entre colecciones hermanas.
 * La variante 'timeline' dibuja la línea vertical con puntos;
 * la variante 'lista' muestra entradas simples.
 */
@Component({
  selector: 'app-nav-colecciones',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-colecciones.component.html',
  styleUrl: './nav-colecciones.component.css',
})
export class NavColeccionesComponent {

  /** Colecciones hermanas. */
  readonly items = input.required<ItemNavColeccion[]>();

  /** Id de la colección abierta actualmente. */
  readonly activoId = input.required<string>();

  /** Ruta base a la que se antepone el id, ej. '/galeria/linea-del-tiempo'. */
  readonly rutaBase = input.required<string>();

  /** Encabezado del panel. */
  readonly titulo = input<string>('Explorar');

  /** Estilo visual del listado. */
  readonly variante = input<'timeline' | 'lista'>('lista');
}