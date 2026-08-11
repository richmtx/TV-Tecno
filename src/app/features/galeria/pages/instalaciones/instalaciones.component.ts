import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { InstalacionCardComponent } from './components/instalacion-card/instalacion-card.component';
import { ChipsCategoriaComponent } from './components/chips-categoria/chips-categoria.component';
import { PaginacionComponent } from '../../components/paginacion/paginacion.component';
import { GaleriaFiltrosService } from '../../services/galeria-filtros.service';
import { GaleriaService } from '../../services/galeria.service';
import { OpcionFiltro } from '../../models/filtros-galeria.model';
import { Instalacion } from '../../models/instalacion.model';
import { CHIPS_INSTALACIONES } from '../../data/instalaciones.data';

/** Opciones del menú "Filtrar" del layout: aquí controlan el orden. */
const OPCIONES_INSTALACIONES: OpcionFiltro[] = [
  'Orden sugerido',
  'Por título (A-Z)',
  'Por título (Z-A)',
  'Por categoría'
];

/** Instalaciones por página. */
const POR_PAGINA = 12;

/**
 * Sección "Instalaciones" de la Galería ITD.
 * Cuadrícula de espacios del campus con filtro por categoría,
 * búsqueda, orden y paginación.
 */
@Component({
  selector: 'app-instalaciones',
  standalone: true,
  imports: [InstalacionCardComponent, ChipsCategoriaComponent, PaginacionComponent],
  templateUrl: './instalaciones.component.html',
  styleUrl: './instalaciones.component.css',
})
export class InstalacionesComponent {

  private readonly filtros = inject(GaleriaFiltrosService);
  private readonly galeria = inject(GaleriaService);
  private readonly router = inject(Router);

  readonly paginaActual = signal<number>(1);
  readonly categoriaActiva = signal<string>('todas');

  readonly chips = CHIPS_INSTALACIONES;

  private readonly instalaciones = this.galeria.getInstalaciones();

  /** Aplica chip de categoría, búsqueda y orden. */
  private readonly instalacionesFiltradas = computed<Instalacion[]>(() => {
    const categoria = this.categoriaActiva();
    const term = this.filtros.busqueda().trim().toLowerCase();

    let encontradas = categoria === 'todas'
      ? [...this.instalaciones]
      : this.instalaciones.filter(i => i.categoria === categoria);

    if (term) {
      encontradas = encontradas.filter(i =>
        i.titulo.toLowerCase().includes(term) ||
        i.descripcion.toLowerCase().includes(term) ||
        i.categoriaLabel.toLowerCase().includes(term)
      );
    }

    switch (this.filtros.filtroActivo()) {
      case 'Por título (A-Z)':
        return encontradas.sort((a, b) => a.titulo.localeCompare(b.titulo, 'es'));
      case 'Por título (Z-A)':
        return encontradas.sort((a, b) => b.titulo.localeCompare(a.titulo, 'es'));
      case 'Por categoría':
        return encontradas.sort((a, b) =>
          a.categoriaLabel.localeCompare(b.categoriaLabel, 'es') ||
          a.titulo.localeCompare(b.titulo, 'es')
        );
      default:
        return encontradas;
    }
  });

  readonly totalPaginas = computed<number>(() =>
    Math.max(1, Math.ceil(this.instalacionesFiltradas().length / POR_PAGINA))
  );

  /** Instalaciones visibles en la página actual. */
  readonly instalacionesVisibles = computed<Instalacion[]>(() => {
    const pagina = Math.min(this.paginaActual(), this.totalPaginas());
    const desde = (pagina - 1) * POR_PAGINA;
    return this.instalacionesFiltradas().slice(desde, desde + POR_PAGINA);
  });

  constructor() {
    this.filtros.configurar(OPCIONES_INSTALACIONES, 'Buscar instalaciones...');
  }

  onCategoria(id: string): void {
    this.categoriaActiva.set(id);
    this.paginaActual.set(1);
  }

  irAPagina(pagina: number): void {
    this.paginaActual.set(pagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  abrirInstalacion(instalacion: Instalacion): void {
    this.router.navigate(['/galeria/instalaciones', instalacion.id]);
  }
}