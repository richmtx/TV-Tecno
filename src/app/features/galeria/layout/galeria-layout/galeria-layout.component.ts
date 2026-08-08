import { Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { HeroGaleriaComponent } from '../../components/hero-galeria/hero-galeria.component';
import { GaleriaTabsComponent } from '../../components/galeria-tabs/galeria-tabs.component';
import { BarraFiltrosComponent } from '../../components/barra-filtros/barra-filtros.component';
import { FotosItdComponent } from '../../../../shared/components/fotos-itd/fotos-itd.component';
import { HistoriaComponent } from '../../../../shared/components/historia/historia.component';
import { GaleriaFiltrosService } from '../../services/galeria-filtros.service';
import { GaleriaTab, TabId } from '../../models/filtros-galeria.model';
import { CONTENIDO_SECCIONES } from '../../data/galeria-secciones';

/**
 * Contenedor de la sección Galería.
 * Monta el hero, la barra de controles y el pie común una sola vez;
 * los textos del pie se adaptan a la sección activa.
 */
@Component({
  selector: 'app-galeria-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeroGaleriaComponent,
    GaleriaTabsComponent,
    BarraFiltrosComponent,
    FotosItdComponent,
    HistoriaComponent,
  ],
  providers: [GaleriaFiltrosService],
  templateUrl: './galeria-layout.component.html',
  styleUrl: './galeria-layout.component.css',
})
export class GaleriaLayoutComponent {

  readonly filtros = inject(GaleriaFiltrosService);
  private readonly router = inject(Router);

  /** Pestañas de la galería. `ruta` es el segmento bajo /galeria. */
  readonly tabs: GaleriaTab[] = [
    { id: 'timeline', ruta: 'linea-del-tiempo', label: 'Línea del tiempo' },
    { id: 'albums', ruta: 'albumes', label: 'Álbumes' },
    { id: 'instalaciones', ruta: 'instalaciones', label: 'Instalaciones' },
    { id: 'estudiantes', ruta: 'estudiantes', label: 'Estudiantes' },
  ];

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

  /** Traduce el segmento de la URL al identificador de sección. */
  private resolverSeccion(): TabId {
    const url = this.router.url;
    const tab = this.tabs.find(t => url.includes(`/galeria/${t.ruta}`));
    return tab?.id ?? 'timeline';
  }

  onEnviarFotos(): void {
    // TODO: abrir modal o navegar al formulario de envío
    console.log('Enviar mis fotos desde', this.seccionActiva());
  }
}