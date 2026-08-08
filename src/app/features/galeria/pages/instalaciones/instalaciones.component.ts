import { Component, computed, inject, signal } from '@angular/core';
import { InstalacionCardComponent } from './components/instalacion-card/instalacion-card.component';
import { ChipsCategoriaComponent } from './components/chips-categoria/chips-categoria.component';
import { PaginacionComponent } from '../../components/paginacion/paginacion.component';
import { GaleriaFiltrosService } from '../../services/galeria-filtros.service';
import { OpcionFiltro } from '../../models/filtros-galeria.model';
import { ChipCategoria, Instalacion } from '../../models/instalacion.model';

/** Opciones del menú "Filtrar" del layout: aquí controlan el orden. */
const OPCIONES_INSTALACIONES: OpcionFiltro[] = [
  'Orden sugerido',
  'Por título (A-Z)',
  'Por título (Z-A)',
  'Por categoría'
];

/** Instalaciones por página. */
const POR_PAGINA = 12;

/** Degradados de respaldo mientras no existan las portadas reales. */
const G = {
  oliva: 'linear-gradient(135deg, #4a3d13, #836d23)',
  rojo: 'linear-gradient(135deg, #661a20, #b42e38)',
  morado: 'linear-gradient(135deg, #341830, #5c2c56)',
  verde: 'linear-gradient(135deg, #022e22, #04513c)',
  azul: 'linear-gradient(135deg, #191f5a, #2c379d)'
};

const BASE = 'assets/galeria/instalaciones';

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

  readonly paginaActual = signal<number>(1);
  readonly categoriaActiva = signal<string>('todas');

  readonly chips: ChipCategoria[] = [
    { id: 'todas', label: 'Todas' },
    { id: 'academicas', label: 'Académicas' },
    { id: 'laboratorios', label: 'Laboratorios' },
    { id: 'deportivas', label: 'Deportivas' },
    { id: 'administrativas', label: 'Administrativas' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'areas-comunes', label: 'Áreas comunes' }
  ];

  readonly instalaciones: Instalacion[] = [
    {
      id: 'aulas',
      titulo: 'Aulas',
      descripcion: 'Espacios equipados para una enseñanza moderna y colaborativa.',
      portada: `${BASE}/aulas.jpg`,
      portadaAlt: 'Aula del ITD con mobiliario y proyector',
      categoria: 'academicas',
      categoriaLabel: 'Académicas',
      fallback: G.oliva
    },
    {
      id: 'centro-computo',
      titulo: 'Centro de Cómputo',
      descripcion: 'Laboratorios con tecnología de vanguardia y acceso a internet.',
      portada: `${BASE}/centro-computo.jpg`,
      portadaAlt: 'Centro de cómputo con equipos alineados',
      categoria: 'academicas',
      categoriaLabel: 'Académicas',
      fallback: G.azul
    },
    {
      id: 'biblioteca',
      titulo: 'Biblioteca',
      descripcion: 'Acervo bibliográfico especializado y espacios de estudio.',
      portada: `${BASE}/biblioteca.jpg`,
      portadaAlt: 'Sala de lectura de la biblioteca del ITD',
      categoria: 'servicios',
      categoriaLabel: 'Servicios',
      fallback: G.morado
    },
    {
      id: 'laboratorios',
      titulo: 'Laboratorios',
      descripcion: 'Laboratorios especializados para la investigación y la práctica.',
      portada: `${BASE}/laboratorios.jpg`,
      portadaAlt: 'Estudiantes trabajando en un laboratorio del ITD',
      categoria: 'laboratorios',
      categoriaLabel: 'Laboratorios',
      fallback: G.verde
    },
    {
      id: 'auditorio',
      titulo: 'Auditorio',
      descripcion: 'Espacio para conferencias, eventos y actividades institucionales.',
      portada: `${BASE}/auditorio.jpg`,
      portadaAlt: 'Auditorio del ITD con butacas y escenario',
      categoria: 'areas-comunes',
      categoriaLabel: 'Áreas comunes',
      fallback: G.rojo
    },
    {
      id: 'gimnasio',
      titulo: 'Gimnasio',
      descripcion: 'Instalaciones deportivas para el desarrollo físico y el bienestar.',
      portada: `${BASE}/gimnasio.jpg`,
      portadaAlt: 'Duela del gimnasio techado del ITD',
      categoria: 'deportivas',
      categoriaLabel: 'Deportivas',
      fallback: G.oliva
    },
    {
      id: 'edificio-administrativo',
      titulo: 'Edificio Administrativo',
      descripcion: 'Centro de gestión y atención a la comunidad estudiantil.',
      portada: `${BASE}/edificio-administrativo.jpg`,
      portadaAlt: 'Fachada del edificio administrativo del ITD',
      categoria: 'administrativas',
      categoriaLabel: 'Administrativas',
      fallback: G.azul
    },
    {
      id: 'cafeteria',
      titulo: 'Cafetería',
      descripcion: 'Espacio de convivencia y alimentación para estudiantes y personal.',
      portada: `${BASE}/cafeteria.jpg`,
      portadaAlt: 'Área de mesas de la cafetería del ITD',
      categoria: 'servicios',
      categoriaLabel: 'Servicios',
      fallback: G.rojo
    },
    {
      id: 'centro-innovacion',
      titulo: 'Centro de Innovación',
      descripcion: 'Espacio para el desarrollo de proyectos e innovación tecnológica.',
      portada: `${BASE}/centro-innovacion.jpg`,
      portadaAlt: 'Fachada del Centro de Innovación Tecnológica',
      categoria: 'laboratorios',
      categoriaLabel: 'Laboratorios',
      fallback: G.morado
    },
    {
      id: 'areas-verdes',
      titulo: 'Áreas Verdes',
      descripcion: 'Espacios naturales para el descanso y la convivencia.',
      portada: `${BASE}/areas-verdes.jpg`,
      portadaAlt: 'Jardines y andadores del campus del ITD',
      categoria: 'areas-comunes',
      categoriaLabel: 'Áreas comunes',
      fallback: G.verde
    },
    {
      id: 'estacionamiento',
      titulo: 'Estacionamiento',
      descripcion: 'Amplias áreas de estacionamiento para la comunidad ITD.',
      portada: `${BASE}/estacionamiento.jpg`,
      portadaAlt: 'Estacionamiento del campus del ITD',
      categoria: 'servicios',
      categoriaLabel: 'Servicios',
      fallback: G.oliva
    },
    {
      id: 'canchas-multiusos',
      titulo: 'Canchas Multiusos',
      descripcion: 'Espacios deportivos al aire libre para diversas actividades.',
      portada: `${BASE}/canchas-multiusos.jpg`,
      portadaAlt: 'Canchas multiusos al aire libre del ITD',
      categoria: 'deportivas',
      categoriaLabel: 'Deportivas',
      fallback: G.azul
    }
  ];

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
    // TODO: navegar a la galería de fotos de la instalación
    console.log('Abrir instalación', instalacion.id);
  }
}