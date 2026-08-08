import { Component, ElementRef, HostListener, input, output, signal } from '@angular/core';
import { OpcionFiltro } from '../../models/filtros-galeria.model';

/**
 * Buscador + menú de filtros de la Galería ITD.
 * Componente de presentación: no filtra nada, solo emite lo que el
 * usuario escribe o selecciona. Cada sección decide qué opciones
 * pasarle y qué hacer con los eventos.
 */
@Component({
  selector: 'app-barra-filtros',
  standalone: true,
  imports: [],
  templateUrl: './barra-filtros.component.html',
  styleUrl: './barra-filtros.component.css'
})
export class BarraFiltrosComponent {

  /** Texto guía del campo de búsqueda. */
  readonly placeholder = input<string>('Buscar fotos...');

  /** Etiqueta accesible del campo de búsqueda. */
  readonly ariaLabelBusqueda = input<string>('Buscar fotos');

  /** Opciones del menú desplegable. */
  readonly opciones = input<OpcionFiltro[]>([]);

  /** Opción actualmente seleccionada. */
  readonly filtroActivo = input<OpcionFiltro>('');

  /** Texto del botón que abre el menú. */
  readonly etiquetaFiltro = input<string>('Filtrar');

  /** Valor inicial del buscador. */
  readonly valorBusqueda = input<string>('');

  /** Se emite en cada cambio del campo de búsqueda. */
  readonly busquedaChange = output<string>();

  /** Se emite al seleccionar una opción del menú. */
  readonly filtroChange = output<OpcionFiltro>();

  readonly isFilterOpen = signal<boolean>(false);

  constructor(private readonly host: ElementRef<HTMLElement>) { }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.busquedaChange.emit(value);
  }

  toggleFilter(): void {
    this.isFilterOpen.update(open => !open);
  }

  selectFilter(option: OpcionFiltro): void {
    this.filtroChange.emit(option);
    this.isFilterOpen.set(false);
  }

  /** Cierra el menú al hacer clic fuera del componente. */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isFilterOpen() && !this.host.nativeElement.contains(event.target as Node)) {
      this.isFilterOpen.set(false);
    }
  }

  /** Cierra el menú con la tecla Escape. */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.isFilterOpen.set(false);
  }
}