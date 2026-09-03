import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GaleriaTabsComponent } from '../../components/galeria-tabs/galeria-tabs.component';
import { BarraFiltrosComponent } from '../../components/barra-filtros/barra-filtros.component';
import { GaleriaFiltrosService } from '../../services/galeria-filtros.service';
import { GaleriaTab } from '../../models/filtros-galeria.model';

/**
 * Contenedor de las cuatro secciones índice de la Galería.
 * Aporta las pestañas y la barra de filtros; las páginas de detalle
 * quedan fuera de este layout porque no llevan toolbar.
 */
@Component({
  selector: 'app-secciones-layout',
  standalone: true,
  imports: [RouterOutlet, GaleriaTabsComponent, BarraFiltrosComponent],
  templateUrl: './secciones-layout.component.html',
  styleUrl: './secciones-layout.component.css',
})
export class SeccionesLayoutComponent {

  readonly filtros = inject(GaleriaFiltrosService);

  readonly tabs: GaleriaTab[] = [
    { id: 'timeline', ruta: 'linea-del-tiempo', label: 'Línea del tiempo' },
    { id: 'albums', ruta: 'albumes', label: 'Álbumes' },
    { id: 'instalaciones', ruta: 'instalaciones', label: 'Instalaciones' },
    { id: 'estudiantes', ruta: 'estudiantes', label: 'Estudiantes y Egresados' },
  ];
}