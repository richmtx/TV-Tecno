import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroGaleriaComponent } from '../../components/hero-galeria/hero-galeria.component';
import { GaleriaTabsComponent } from '../../components/galeria-tabs/galeria-tabs.component';
import { BarraFiltrosComponent } from '../../components/barra-filtros/barra-filtros.component';
import { FotosItdComponent } from '../../../../shared/components/fotos-itd/fotos-itd.component';
import { HistoriaComponent } from '../../../../shared/components/historia/historia.component';
import { GaleriaFiltrosService } from '../../services/galeria-filtros.service';
import { GaleriaTab } from '../../models/filtros-galeria.model';

/**
 * Contenedor de la sección Galería.
 * Monta el hero, la barra de controles y el pie común una sola vez;
 * cada sección se renderiza dentro del <router-outlet>.
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

  /** Pestañas de la galería. `ruta` es el segmento bajo /galeria. */
  readonly tabs: GaleriaTab[] = [
    { id: 'timeline', ruta: 'linea-del-tiempo', label: 'Línea del tiempo' },
    { id: 'albums', ruta: 'albumes', label: 'Álbumes' },
    { id: 'instalaciones', ruta: 'instalaciones', label: 'Instalaciones' },
    { id: 'estudiantes', ruta: 'estudiantes', label: 'Estudiantes' },
  ];

  onEnviarFotos(): void {
    // TODO: abrir modal o navegar al formulario de envío
    console.log('Enviar mis fotos');
  }
}