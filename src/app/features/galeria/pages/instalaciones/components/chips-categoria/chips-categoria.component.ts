import { Component, input, output } from '@angular/core';
import { ChipCategoria } from '../../../../models/instalacion.model';

/**
 * Fila de chips para filtrar por categoría.
 * Componente de presentación: recibe los chips y cuál está activo,
 * y emite el id del seleccionado.
 */
@Component({
  selector: 'app-chips-categoria',
  standalone: true,
  imports: [],
  templateUrl: './chips-categoria.component.html',
  styleUrl: './chips-categoria.component.css',
})
export class ChipsCategoriaComponent {

  /** Chips a mostrar. */
  readonly chips = input.required<ChipCategoria[]>();

  /** Chip actualmente activo. */
  readonly activo = input.required<string>();

  /** Etiqueta accesible del grupo. */
  readonly ariaLabel = input<string>('Filtrar por categoría');

  /** Se emite al seleccionar un chip distinto. */
  readonly seleccion = output<string>();

  onClick(id: string): void {
    if (id !== this.activo()) {
      this.seleccion.emit(id);
    }
  }
}