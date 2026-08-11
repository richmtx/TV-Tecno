import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GaleriaFiltrosService } from '../../services/galeria-filtros.service';
import { GaleriaService } from '../../services/galeria.service';
import { OpcionFiltro } from '../../models/filtros-galeria.model';
import { Coleccion, Foto, altDeFoto } from '../../models/coleccion.model';

/** Opciones del menú "Filtrar" para esta sección. */
const OPCIONES_TIMELINE: OpcionFiltro[] = [
  'Más recientes',
  'Más antiguas',
  'Más vistas',
  'Blanco y negro'
];

/** Época con las cuatro fotos que se muestran como adelanto. */
interface EpocaPreview extends Coleccion {
  preview: Foto[];
}

/**
 * Línea del tiempo del ITD: una fila por época con un adelanto
 * de cuatro fotos y acceso a la colección completa.
 */
@Component({
  selector: 'app-collage',
  standalone: true,
  imports: [],
  templateUrl: './collage.component.html',
  styleUrl: './collage.component.css'
})
export class CollageComponent {

  private readonly filtros = inject(GaleriaFiltrosService);
  private readonly galeria = inject(GaleriaService);
  private readonly router = inject(Router);

  private readonly epocas = this.galeria.getColecciones('timeline');

  /** Filtrado en cliente por años, título o descripción. */
  readonly epocasVisibles = computed<EpocaPreview[]>(() => {
    const term = this.filtros.busqueda().trim().toLowerCase();

    const encontradas = term
      ? this.epocas.filter(e =>
        e.titulo.toLowerCase().includes(term) ||
        e.subtitulo.toLowerCase().includes(term) ||
        e.descripcion.toLowerCase().includes(term)
      )
      : this.epocas;

    return encontradas.map(e => ({ ...e, preview: e.fotos.slice(0, 4) }));
  });

  constructor() {
    // Declara al layout qué opciones debe mostrar la barra de filtros.
    this.filtros.configurar(OPCIONES_TIMELINE, 'Buscar fotos...');
  }

  /** Texto alternativo de una miniatura del adelanto. */
  alt(epoca: EpocaPreview, foto: Foto, indice: number): string {
    return altDeFoto(foto, epoca.titulo, indice, epoca.fotos.length);
  }

  verTodas(epoca: Coleccion): void {
    this.router.navigate(['/galeria/linea-del-tiempo', epoca.id]);
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}