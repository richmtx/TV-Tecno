import { Injectable, signal } from '@angular/core';
import { OpcionFiltro } from '../models/filtros-galeria.model';

/**
 * Estado compartido de la barra de filtros de la Galería.
 * El layout escribe (búsqueda y filtro seleccionado); cada sección
 * lee y aplica el filtrado sobre sus propios datos.
 *
 * Se provee a nivel del layout, no en root: el estado nace y muere
 * con la sección Galería.
 */
@Injectable()
export class GaleriaFiltrosService {

  /** Texto escrito en el buscador. */
  readonly busqueda = signal<string>('');

  /** Opción actualmente seleccionada en el menú "Filtrar". */
  readonly filtroActivo = signal<OpcionFiltro>('');

  /** Opciones que muestra el menú. Las define cada sección. */
  readonly opciones = signal<OpcionFiltro[]>([]);

  /** Placeholder del buscador. Lo define cada sección. */
  readonly placeholder = signal<string>('Buscar fotos...');

  /**
   * Configura la barra para una sección concreta.
   * Llamar desde el constructor de cada página.
   */
  configurar(opciones: OpcionFiltro[], placeholder = 'Buscar fotos...'): void {
    this.opciones.set(opciones);
    this.placeholder.set(placeholder);
    this.filtroActivo.set(opciones[0] ?? '');
    this.busqueda.set('');
  }

  setBusqueda(valor: string): void {
    this.busqueda.set(valor);
  }

  setFiltro(opcion: OpcionFiltro): void {
    this.filtroActivo.set(opcion);
  }
}