import { Component, input, output } from '@angular/core';
import { GaleriaTab, TabId } from '../../models/filtros-galeria.model';

/**
 * Navegación por pestañas de la Galería ITD.
 * Componente de presentación: recibe las pestañas y cuál está activa,
 * y emite el id de la que el usuario selecciona.
 */
@Component({
  selector: 'app-galeria-tabs',
  standalone: true,
  imports: [],
  templateUrl: './galeria-tabs.component.html',
  styleUrl: './galeria-tabs.component.css'
})
export class GaleriaTabsComponent {

  /** Pestañas a mostrar. */
  readonly tabs = input.required<GaleriaTab[]>();

  /** Pestaña actualmente activa. */
  readonly activeTab = input.required<TabId>();

  /** Etiqueta accesible del contenedor de pestañas. */
  readonly ariaLabel = input<string>('Categorías de la galería');

  /** Se emite cuando el usuario selecciona una pestaña distinta. */
  readonly tabChange = output<TabId>();

  seleccionar(id: TabId): void {
    if (id !== this.activeTab()) {
      this.tabChange.emit(id);
    }
  }
}