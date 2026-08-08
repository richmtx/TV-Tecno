import { Component, computed, input, output } from '@angular/core';

/** Entrada del paginador: número de página o separador de elipsis. */
export type ItemPagina = number | '...';

/**
 * Paginador numérico con flechas y elipsis.
 * Componente de presentación: recibe el total y la página actual,
 * y emite la página solicitada.
 */
@Component({
  selector: 'app-paginacion',
  standalone: true,
  imports: [],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css',
})
export class PaginacionComponent {

  /** Página actual (base 1). */
  readonly paginaActual = input.required<number>();

  /** Total de páginas disponibles. */
  readonly totalPaginas = input.required<number>();

  /** Se emite con la página solicitada. */
  readonly cambioPagina = output<number>();

  /**
   * Construye la secuencia visible: siempre la primera y la última,
   * un margen alrededor de la actual, y elipsis en los saltos.
   */
  readonly items = computed<ItemPagina[]>(() => {
    const total = this.totalPaginas();
    const actual = this.paginaActual();

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const resultado: ItemPagina[] = [1];
    const inicio = Math.max(2, actual - 1);
    const fin = Math.min(total - 1, actual + 1);

    if (inicio > 2) {
      resultado.push('...');
    }

    for (let i = inicio; i <= fin; i++) {
      resultado.push(i);
    }

    if (fin < total - 1) {
      resultado.push('...');
    }

    resultado.push(total);
    return resultado;
  });

  readonly hayAnterior = computed(() => this.paginaActual() > 1);
  readonly haySiguiente = computed(() => this.paginaActual() < this.totalPaginas());

  ir(pagina: ItemPagina): void {
    if (typeof pagina === 'number' && pagina !== this.paginaActual()) {
      this.cambioPagina.emit(pagina);
    }
  }

  anterior(): void {
    if (this.hayAnterior()) {
      this.cambioPagina.emit(this.paginaActual() - 1);
    }
  }

  siguiente(): void {
    if (this.haySiguiente()) {
      this.cambioPagina.emit(this.paginaActual() + 1);
    }
  }

  /** Clave estable para @for, ya que las elipsis pueden repetirse. */
  claveItem(index: number, item: ItemPagina): string {
    return typeof item === 'number' ? `p${item}` : `e${index}`;
  }
}