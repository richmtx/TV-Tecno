import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { NavColeccionesComponent } from '../../components/nav-colecciones/nav-colecciones.component';
import { FotoGridComponent } from '../../components/foto-grid/foto-grid.component';
import { LightboxComponent } from '../../components/lightbox/lightbox.component';
import { PaginacionComponent } from '../../components/paginacion/paginacion.component';
import { GaleriaService } from '../../services/galeria.service';
import { Foto, MigaPan, SeccionId } from '../../models/coleccion.model';

/** Fotos por página: 4 columnas × 5 filas. */
const POR_PAGINA = 20;

/** Configuración de presentación por sección. */
interface ConfigSeccion {
  ruta: string;
  label: string;
  navTitulo: string;
  variante: 'timeline' | 'lista';
}

const CONFIG: Record<SeccionId, ConfigSeccion> = {
  timeline: {
    ruta: '/galeria/linea-del-tiempo',
    label: 'Línea del tiempo',
    navTitulo: 'Explorar línea del tiempo',
    variante: 'timeline'
  },
  albums: {
    ruta: '/galeria/albumes',
    label: 'Álbumes',
    navTitulo: 'Explorar álbumes',
    variante: 'lista'
  },
  instalaciones: {
    ruta: '/galeria/instalaciones',
    label: 'Instalaciones',
    navTitulo: 'Explorar instalaciones',
    variante: 'lista'
  },
  estudiantes: {
    ruta: '/galeria/estudiantes',
    label: 'Estudiantes',
    navTitulo: 'Explorar momentos',
    variante: 'lista'
  }
};

/**
 * Detalle de una colección: encabezado, navegación entre hermanas
 * y cuadrícula paginada de fotografías con visor.
 * Sirve a las cuatro secciones de la Galería.
 */
@Component({
  selector: 'app-coleccion',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    NavColeccionesComponent,
    FotoGridComponent,
    LightboxComponent,
    PaginacionComponent
  ],
  templateUrl: './coleccion.component.html',
  styleUrl: './coleccion.component.css',
})
export class ColeccionComponent {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly galeria = inject(GaleriaService);

  readonly paginaActual = signal<number>(1);
  readonly indiceVisor = signal<number | null>(null);

  /** Sección declarada en el `data` de la ruta. */
  private readonly seccion = toSignal(
    this.route.data.pipe(map(d => d['seccion'] as SeccionId)),
    { initialValue: 'timeline' as SeccionId }
  );

  /** Id de la colección tomado de la URL. */
  private readonly coleccionId = toSignal(
    this.route.paramMap.pipe(map(p => p.get('coleccionId') ?? '')),
    { initialValue: '' }
  );

  readonly config = computed<ConfigSeccion>(() => CONFIG[this.seccion()]);

  readonly coleccion = computed(() =>
    this.galeria.getColeccion(this.seccion(), this.coleccionId())
  );

  readonly navItems = computed(() =>
    this.galeria.getNavColecciones(this.seccion())
  );

  readonly migas = computed<MigaPan[]>(() => {
    const c = this.coleccion();
    return [
      { label: 'Galería', ruta: '/galeria' },
      { label: this.config().label, ruta: this.config().ruta },
      { label: c?.titulo ?? 'No encontrada' }
    ];
  });

  readonly fotos = computed<Foto[]>(() => this.coleccion()?.fotos ?? []);

  readonly totalPaginas = computed<number>(() =>
    Math.max(1, Math.ceil(this.fotos().length / POR_PAGINA))
  );

  /** Índice de la primera foto de la página, en la colección completa. */
  readonly offset = computed<number>(() => {
    const pagina = Math.min(this.paginaActual(), this.totalPaginas());
    return (pagina - 1) * POR_PAGINA;
  });

  readonly fotosVisibles = computed<Foto[]>(() =>
    this.fotos().slice(this.offset(), this.offset() + POR_PAGINA)
  );

  constructor() {
    // Al cambiar de colección se vuelve a la primera página.
    let anterior = '';
    this.route.paramMap.subscribe(p => {
      const id = p.get('coleccionId') ?? '';
      if (id !== anterior) {
        anterior = id;
        this.paginaActual.set(1);
        this.indiceVisor.set(null);
      }
    });
  }

  irAPagina(pagina: number): void {
    this.paginaActual.set(pagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  abrirVisor(indiceGlobal: number): void {
    this.indiceVisor.set(indiceGlobal);
  }

  /** Al navegar en el visor, sincroniza la página de la cuadrícula. */
  cambiarFoto(indiceGlobal: number): void {
    this.indiceVisor.set(indiceGlobal);
    this.paginaActual.set(Math.floor(indiceGlobal / POR_PAGINA) + 1);
  }

  cerrarVisor(): void {
    this.indiceVisor.set(null);
  }

  volverAlIndice(): void {
    this.router.navigate([this.config().ruta]);
  }
}