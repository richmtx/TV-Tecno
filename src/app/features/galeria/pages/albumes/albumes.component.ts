import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumCardComponent } from './components/album-card/album-card.component';
import { PaginacionComponent } from '../../components/paginacion/paginacion.component';
import { GaleriaFiltrosService } from '../../services/galeria-filtros.service';
import { GaleriaService } from '../../services/galeria.service';
import { OpcionFiltro } from '../../models/filtros-galeria.model';
import { Album } from '../../models/album.model';

/** Opciones del menú "Filtrar" para esta sección. */
const OPCIONES_ALBUMES: OpcionFiltro[] = [
  'Más recientes',
  'Más antiguos',
  'Más fotos',
  'Por título'
];

/** Álbumes por página. */
const POR_PAGINA = 12;

/**
 * Sección "Álbumes" de la Galería ITD.
 * Muestra los álbumes en cuadrícula con búsqueda, orden y paginación.
 * El hero, las pestañas y el pie los aporta el layout.
 */
@Component({
  selector: 'app-albumes',
  standalone: true,
  imports: [AlbumCardComponent, PaginacionComponent],
  templateUrl: './albumes.component.html',
  styleUrl: './albumes.component.css',
})
export class AlbumesComponent {

  private readonly filtros = inject(GaleriaFiltrosService);
  private readonly galeria = inject(GaleriaService);
  private readonly router = inject(Router);

  readonly paginaActual = signal<number>(1);

  private readonly albumes = this.galeria.getAlbumes();

  /** Aplica búsqueda y orden sobre el conjunto completo. */
  private readonly albumesFiltrados = computed<Album[]>(() => {
    const term = this.filtros.busqueda().trim().toLowerCase();

    const encontrados = term
      ? this.albumes.filter(a =>
        a.titulo.toLowerCase().includes(term) ||
        a.periodo.toLowerCase().includes(term)
      )
      : [...this.albumes];

    switch (this.filtros.filtroActivo()) {
      case 'Más antiguos':
        return encontrados.sort((a, b) => a.anioInicio - b.anioInicio);
      case 'Más fotos':
        return encontrados.sort((a, b) => b.totalFotos - a.totalFotos);
      case 'Por título':
        return encontrados.sort((a, b) => a.titulo.localeCompare(b.titulo, 'es'));
      default:
        return encontrados.sort((a, b) => b.anioInicio - a.anioInicio);
    }
  });

  readonly totalPaginas = computed<number>(() =>
    Math.max(1, Math.ceil(this.albumesFiltrados().length / POR_PAGINA))
  );

  /** Álbumes visibles en la página actual. */
  readonly albumesVisibles = computed<Album[]>(() => {
    const pagina = Math.min(this.paginaActual(), this.totalPaginas());
    const desde = (pagina - 1) * POR_PAGINA;
    return this.albumesFiltrados().slice(desde, desde + POR_PAGINA);
  });

  constructor() {
    this.filtros.configurar(OPCIONES_ALBUMES, 'Buscar álbumes...');
  }

  irAPagina(pagina: number): void {
    this.paginaActual.set(pagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  abrirAlbum(album: Album): void {
    this.router.navigate(['/galeria/albumes', album.id]);
  }
}