import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GaleriaTab } from '../../models/filtros-galeria.model';

/**
 * Navegación por pestañas de la Galería ITD.
 * Cada pestaña es un enlace real: la pestaña activa la determina
 * el router mediante routerLinkActive, no un estado interno.
 */
@Component({
  selector: 'app-galeria-tabs',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './galeria-tabs.component.html',
  styleUrl: './galeria-tabs.component.css'
})
export class GaleriaTabsComponent {

  /** Pestañas a mostrar. */
  readonly tabs = input.required<GaleriaTab[]>();

  /** Etiqueta accesible del contenedor de pestañas. */
  readonly ariaLabel = input<string>('Categorías de la galería');
}