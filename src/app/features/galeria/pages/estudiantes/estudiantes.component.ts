import { Component, computed, inject, signal } from '@angular/core';
import { MomentoCardComponent } from './components/momento-card/momento-card.component';
import { CierreEstudiantesComponent } from './components/cierre-estudiantes/cierre-estudiantes.component';
import { PaginacionComponent } from '../../components/paginacion/paginacion.component';
import { GaleriaFiltrosService } from '../../services/galeria-filtros.service';
import { OpcionFiltro } from '../../models/filtros-galeria.model';
import { Momento, Testimonio } from '../../models/momento.model';

/** Opciones del menú "Filtrar" del layout. */
const OPCIONES_ESTUDIANTES: OpcionFiltro[] = [
  'Más recientes',
  'Más fotos',
  'Por título',
  'Por categoría'
];

/** Momentos por página. */
const POR_PAGINA = 8;

/** Degradados de respaldo mientras no existan las portadas reales. */
const G = {
  oliva: 'linear-gradient(135deg, #4a3d13, #836d23)',
  rojo: 'linear-gradient(135deg, #661a20, #b42e38)',
  morado: 'linear-gradient(135deg, #341830, #5c2c56)',
  verde: 'linear-gradient(135deg, #022e22, #04513c)',
  azul: 'linear-gradient(135deg, #191f5a, #2c379d)'
};

const BASE = 'assets/galeria/estudiantes';

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

  readonly paginaActual = signal<number>(1);

  readonly testimonio: Testimonio = {
    cita: 'Ser estudiante del ITD es más que estudiar, es formar parte de una comunidad que te impulsa a crecer y transformar tu entorno.',
    autor: 'Ana Sofía',
    carrera: 'Ingeniería en Sistemas'
  };

  readonly momentos: Momento[] = [
    {
      id: 'vida-campus',
      titulo: 'Vida en el campus',
      portada: `${BASE}/vida-campus.jpg`,
      portadaAlt: 'Grupo de estudiantes del ITD en las áreas verdes del campus',
      totalFotos: 186,
      categoria: 'campus',
      anio: 2025,
      fallback: G.verde
    },
    {
      id: 'proyectos-competencias',
      titulo: 'Proyectos y competencias',
      portada: `${BASE}/proyectos-competencias.jpg`,
      portadaAlt: 'Estudiantes trabajando en un proyecto de robótica',
      totalFotos: 142,
      categoria: 'academico',
      anio: 2025,
      fallback: G.oliva
    },
    {
      id: 'graduaciones',
      titulo: 'Graduaciones',
      portada: `${BASE}/graduaciones.jpg`,
      portadaAlt: 'Egresados lanzando sus birretes al aire',
      totalFotos: 98,
      categoria: 'ceremonias',
      anio: 2025,
      fallback: G.azul
    },
    {
      id: 'deportes-itd',
      titulo: 'Deportes ITD',
      portada: `${BASE}/deportes-itd.jpg`,
      portadaAlt: 'Equipos deportivos representativos del ITD',
      totalFotos: 114,
      categoria: 'deportivo',
      anio: 2024,
      fallback: G.rojo
    },
    {
      id: 'ferias-exposiciones',
      titulo: 'Ferias y exposiciones',
      portada: `${BASE}/ferias-exposiciones.jpg`,
      portadaAlt: 'Estudiantes presentando proyectos en una feria académica',
      totalFotos: 76,
      categoria: 'academico',
      anio: 2024,
      fallback: G.morado
    },
    {
      id: 'talleres-capacitaciones',
      titulo: 'Talleres y capacitaciones',
      portada: `${BASE}/talleres-capacitaciones.jpg`,
      portadaAlt: 'Estudiantes durante un taller práctico',
      totalFotos: 89,
      categoria: 'academico',
      anio: 2024,
      fallback: G.oliva
    },
    {
      id: 'cultura-arte',
      titulo: 'Cultura y arte',
      portada: `${BASE}/cultura-arte.jpg`,
      portadaAlt: 'Presentación de danza folclórica del ITD',
      totalFotos: 67,
      categoria: 'cultural',
      anio: 2024,
      fallback: G.rojo
    },
    {
      id: 'voluntariado',
      titulo: 'Voluntariado',
      portada: `${BASE}/voluntariado.jpg`,
      portadaAlt: 'Estudiantes plantando árboles en una jornada de voluntariado',
      totalFotos: 55,
      categoria: 'social',
      anio: 2023,
      fallback: G.verde
    }
  ];

  /** Aplica búsqueda y orden sobre el conjunto completo. */
  private readonly momentosFiltrados = computed<Momento[]>(() => {
    const term = this.filtros.busqueda().trim().toLowerCase();

    const encontrados = term
      ? this.momentos.filter(m => m.titulo.toLowerCase().includes(term))
      : [...this.momentos];

    switch (this.filtros.filtroActivo()) {
      case 'Más fotos':
        return encontrados.sort((a, b) => b.totalFotos - a.totalFotos);
      case 'Por título':
        return encontrados.sort((a, b) => a.titulo.localeCompare(b.titulo, 'es'));
      case 'Por categoría':
        return encontrados.sort((a, b) =>
          a.categoria.localeCompare(b.categoria, 'es') ||
          a.titulo.localeCompare(b.titulo, 'es')
        );
      default:
        return encontrados.sort((a, b) => b.anio - a.anio);
    }
  });

  readonly totalPaginas = computed<number>(() =>
    Math.max(1, Math.ceil(this.momentosFiltrados().length / POR_PAGINA))
  );

  /** Momentos visibles en la página actual. */
  readonly momentosVisibles = computed<Momento[]>(() => {
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

  abrirMomento(momento: Momento): void {
    // TODO: navegar a la galería completa del momento
    console.log('Abrir momento', momento.id);
  }

  onIrAlPortal(): void {
    // TODO: enlazar al portal estudiantil del ITD
    console.log('Ir al portal estudiantil');
  }
}