import { Component, computed, inject, signal } from '@angular/core';
import { AlbumCardComponent } from './components/album-card/album-card.component';
import { PaginacionComponent } from '../../components/paginacion/paginacion.component';
import { GaleriaFiltrosService } from '../../services/galeria-filtros.service';
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

/** Degradados de respaldo mientras no existan las portadas reales. */
const G = {
  oliva: 'linear-gradient(135deg, #4a3d13, #836d23)',
  rojo: 'linear-gradient(135deg, #661a20, #b42e38)',
  morado: 'linear-gradient(135deg, #341830, #5c2c56)',
  verde: 'linear-gradient(135deg, #022e22, #04513c)',
  azul: 'linear-gradient(135deg, #191f5a, #2c379d)'
};

const BASE = 'assets/galeria/albumes';

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

  readonly paginaActual = signal<number>(1);

  readonly albumes: Album[] = [
    {
      id: 'nuestros-inicios',
      titulo: 'Nuestros inicios',
      portada: `${BASE}/nuestros-inicios.jpg`,
      portadaAlt: 'Fachada original del Instituto Tecnológico de Durango',
      totalFotos: 24,
      periodo: '1920 - 1950',
      anioInicio: 1920,
      categoria: 'historico',
      fallback: G.oliva
    },
    {
      id: 'crecimiento-formacion',
      titulo: 'Crecimiento y formación',
      portada: `${BASE}/crecimiento-formacion.jpg`,
      portadaAlt: 'Grupo de estudiantes en los primeros años del plantel',
      totalFotos: 86,
      periodo: '1951 - 1980',
      anioInicio: 1951,
      categoria: 'historico',
      fallback: G.rojo
    },
    {
      id: 'modernizacion',
      titulo: 'Modernización',
      portada: `${BASE}/modernizacion.jpg`,
      portadaAlt: 'Edificio del ITD tras su renovación',
      totalFotos: 112,
      periodo: '1981 - 2000',
      anioInicio: 1981,
      categoria: 'infraestructura',
      fallback: G.morado
    },
    {
      id: 'innovacion-tecnologia',
      titulo: 'Innovación y tecnología',
      portada: `${BASE}/innovacion-tecnologia.jpg`,
      portadaAlt: 'Edificio de innovación tecnológica del ITD',
      totalFotos: 156,
      periodo: '2001 - 2010',
      anioInicio: 2001,
      categoria: 'infraestructura',
      fallback: G.verde
    },
    {
      id: 'actualidad-itd',
      titulo: 'Actualidad ITD',
      portada: `${BASE}/actualidad-itd.jpg`,
      portadaAlt: 'Fachada actual del Instituto Tecnológico de Durango',
      totalFotos: 210,
      periodo: '2011 - Hoy',
      anioInicio: 2011,
      categoria: 'infraestructura',
      fallback: G.azul
    },
    {
      id: 'eventos-institucionales',
      titulo: 'Eventos institucionales',
      portada: `${BASE}/eventos-institucionales.jpg`,
      portadaAlt: 'Autoridades del ITD durante un evento institucional',
      totalFotos: 98,
      periodo: '2010 - Hoy',
      anioInicio: 2010,
      categoria: 'eventos',
      fallback: G.rojo
    },
    {
      id: 'vida-estudiantil',
      titulo: 'Vida estudiantil',
      portada: `${BASE}/vida-estudiantil.jpg`,
      portadaAlt: 'Estudiantes del ITD en el campus',
      totalFotos: 143,
      periodo: '2010 - Hoy',
      anioInicio: 2010,
      categoria: 'estudiantil',
      fallback: G.oliva
    },
    {
      id: 'actividades-deportivas',
      titulo: 'Actividades deportivas',
      portada: `${BASE}/actividades-deportivas.jpg`,
      portadaAlt: 'Equipo deportivo representativo del ITD',
      totalFotos: 67,
      periodo: '2005 - Hoy',
      anioInicio: 2005,
      categoria: 'deportivo',
      fallback: G.azul
    },
    {
      id: 'ceremonias-graduaciones',
      titulo: 'Ceremonias y graduaciones',
      portada: `${BASE}/ceremonias-graduaciones.jpg`,
      portadaAlt: 'Egresados lanzando sus birretes durante la graduación',
      totalFotos: 89,
      periodo: '2000 - Hoy',
      anioInicio: 2000,
      categoria: 'eventos',
      fallback: G.morado
    },
    {
      id: 'visitas-convenios',
      titulo: 'Visitas y convenios',
      portada: `${BASE}/visitas-convenios.jpg`,
      portadaAlt: 'Firma de convenio institucional en el ITD',
      totalFotos: 53,
      periodo: '2005 - Hoy',
      anioInicio: 2005,
      categoria: 'eventos',
      fallback: G.verde
    },
    {
      id: 'talleres-capacitaciones',
      titulo: 'Talleres y capacitaciones',
      portada: `${BASE}/talleres-capacitaciones.jpg`,
      portadaAlt: 'Estudiantes durante un taller práctico',
      totalFotos: 77,
      periodo: '2010 - Hoy',
      anioInicio: 2010,
      categoria: 'estudiantil',
      fallback: G.rojo
    },
    {
      id: 'infraestructura',
      titulo: 'Infraestructura',
      portada: `${BASE}/infraestructura.jpg`,
      portadaAlt: 'Vista aérea del campus del ITD',
      totalFotos: 66,
      periodo: '1980 - Hoy',
      anioInicio: 1980,
      categoria: 'infraestructura',
      fallback: G.azul
    }
  ];

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

  readonly totalResultados = computed<number>(() => this.albumesFiltrados().length);

  constructor() {
    this.filtros.configurar(OPCIONES_ALBUMES, 'Buscar álbumes...');
  }

  irAPagina(pagina: number): void {
    this.paginaActual.set(pagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  abrirAlbum(album: Album): void {
    // TODO: navegar al detalle del álbum
    console.log('Abrir álbum', album.id);
  }
}