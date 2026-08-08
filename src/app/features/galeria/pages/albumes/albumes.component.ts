import { Component, inject } from '@angular/core';
import { GaleriaFiltrosService } from '../../services/galeria-filtros.service';
import { OpcionFiltro } from '../../models/filtros-galeria.model';

/** Opciones del menú "Filtrar" para esta sección. */
const OPCIONES_ALBUMES: OpcionFiltro[] = [
  'Más recientes',
  'Más antiguos',
  'Por evento',
  'Más fotos'
];

/**
 * Sección "Álbumes" de la Galería ITD.
 * Pendiente de contenido; el hero, las pestañas y el pie los
 * aporta el layout.
 */
@Component({
  selector: 'app-albumes',
  standalone: true,
  imports: [],
  templateUrl: './albumes.component.html',
  styleUrl: './albumes.component.css',
})
export class AlbumesComponent {

  private readonly filtros = inject(GaleriaFiltrosService);

  constructor() {
    this.filtros.configurar(OPCIONES_ALBUMES, 'Buscar álbumes...');
  }
}