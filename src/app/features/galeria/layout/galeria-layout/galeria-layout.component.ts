import { Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { HeroGaleriaComponent } from '../../components/hero-galeria/hero-galeria.component';
import { FotosItdComponent } from '../../../../shared/components/fotos-itd/fotos-itd.component';
import { HistoriaComponent } from '../../../../shared/components/historia/historia.component';
import { GaleriaFiltrosService } from '../../services/galeria-filtros.service';
import { TabId } from '../../models/filtros-galeria.model';
import { CONTENIDO_SECCIONES } from '../../data/galeria-secciones';

/** Segmentos de URL asociados a cada sección. */
const RUTAS_SECCION: { id: TabId; ruta: string }[] = [
  { id: 'timeline', ruta: 'linea-del-tiempo' },
  { id: 'albums', ruta: 'albumes' },
  { id: 'instalaciones', ruta: 'instalaciones' },
  { id: 'estudiantes', ruta: 'estudiantes' },
];

/**
 * Contenedor raíz de la Galería.
 * Aporta el hero y el pie común a todas las páginas, índices y
 * detalles por igual. La barra de pestañas vive en SeccionesLayout.
 */
@Component({
  selector: 'app-galeria-layout',
  standalone: true,
  imports: [RouterOutlet, HeroGaleriaComponent, FotosItdComponent, HistoriaComponent],
  providers: [GaleriaFiltrosService],
  templateUrl: './galeria-layout.component.html',
  styleUrl: './galeria-layout.component.css',
})
export class GaleriaLayoutComponent {

  private readonly router = inject(Router);

  /** Sección activa, derivada de la URL. */
  private readonly seccionActiva = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.resolverSeccion()),
      startWith(this.resolverSeccion())
    ),
    { initialValue: 'timeline' as TabId }
  );

  /** Textos del pie correspondientes a la sección activa. */
  readonly contenido = computed(() => CONTENIDO_SECCIONES[this.seccionActiva()]);

  private resolverSeccion(): TabId {
    const url = this.router.url;
    return RUTAS_SECCION.find(s => url.includes(`/galeria/${s.ruta}`))?.id ?? 'timeline';
  }

  onEnviarFotos(): void {
    // TODO: abrir modal o navegar al formulario de envío
    console.log('Enviar mis fotos desde', this.seccionActiva());
  }
}