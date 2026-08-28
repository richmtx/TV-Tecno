import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MomentoCardComponent } from './components/momento-card/momento-card.component';
import { CierreEstudiantesComponent } from './components/cierre-estudiantes/cierre-estudiantes.component';
import { PaginacionComponent } from '../../components/paginacion/paginacion.component';
import { GaleriaFiltrosService } from '../../services/galeria-filtros.service';
import { GaleriaService } from '../../services/galeria.service';
import { OpcionFiltro } from '../../models/filtros-galeria.model';
import { Coleccion } from '../../models/coleccion.model';
import { TESTIMONIO_ESTUDIANTES } from '../../data/galeria-secciones';

/** Opciones del menú "Filtrar" del layout. */
const OPCIONES_ESTUDIANTES: OpcionFiltro[] = [
  'Orden sugerido',
  'Más fotos',
  'Por título',
  'Por categoría',
];

/** Momentos por página. */
const POR_PAGINA = 8;

/**
 * Sección "Estudiantes" de la Galería ITD.
 * Muestra colecciones de la vida estudiantil, con búsqueda, orden,
 * paginación y un cierre con testimonio y acceso al portal.
 */
@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [MomentoCardComponent, PaginacionComponent, CierreEstudiantesComponent],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css',
})
export class EstudiantesComponent {
  private readonly filtros = inject(GaleriaFiltrosService);
  private readonly galeria = inject(GaleriaService);
  private readonly router = inject(Router);

  readonly paginaActual = signal<number>(1);

  readonly testimonio = TESTIMONIO_ESTUDIANTES;

  private readonly momentos = toSignal(
    this.galeria.getColecciones('estudiantes'),
    { initialValue: [] as Coleccion[] },
  );

  /** Aplica búsqueda y orden sobre el conjunto completo. */
  private readonly momentosFiltrados = computed<Coleccion[]>(() => {
    const term = this.filtros.busqueda().trim().toLowerCase();

    const encontrados = term
      ? this.momentos().filter((m) =>
        m.titulo.toLowerCase().includes(term),
      )
      : [...this.momentos()];

    switch (this.filtros.filtroActivo()) {
      case 'Más fotos':
        return encontrados.sort((a, b) => b.totalFotos - a.totalFotos);
      case 'Por título':
        return encontrados.sort((a, b) => a.titulo.localeCompare(b.titulo, 'es'));
      case 'Por categoría':
        return encontrados.sort(
          (a, b) =>
            (a.categoria?.nombre ?? '').localeCompare(
              b.categoria?.nombre ?? '',
              'es',
            ) || a.titulo.localeCompare(b.titulo, 'es'),
        );
      default:
        return encontrados;
    }
  });

  readonly totalPaginas = computed<number>(() =>
    Math.max(1, Math.ceil(this.momentosFiltrados().length / POR_PAGINA)),
  );

  /** Momentos visibles en la página actual. */
  readonly momentosVisibles = computed<Coleccion[]>(() => {
    const pagina = Math.min(this.paginaActual(), this.totalPaginas());
    const desde = (pagina - 1) * POR_PAGINA;
    return this.momentosFiltrados().slice(desde, desde + POR_PAGINA);
  });

  constructor() {
    this.filtros.configurar(OPCIONES_ESTUDIANTES, 'Buscar momentos...');
  }

  irAPagina(pagina: number): void {
    this.paginaActual.set(pagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  abrirMomento(momento: Coleccion): void {
    void this.router.navigate(['/galeria/estudiantes', momento.id]);
  }

  onIrAlPortal(): void {
    // TODO: enlazar al portal estudiantil del ITD
    console.log('Ir al portal estudiantil');
  }
}