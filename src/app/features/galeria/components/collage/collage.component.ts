import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { GaleriaFiltrosService } from '../../services/galeria-filtros.service';
import { GaleriaService } from '../../services/galeria.service';
import { OpcionFiltro } from '../../models/filtros-galeria.model';
import { Coleccion } from '../../models/coleccion.model';

/** Opciones del menú "Filtrar" para esta sección. */
const OPCIONES_TIMELINE: OpcionFiltro[] = [
  'Más recientes',
  'Más antiguas',
  'Más vistas',
  'Blanco y negro',
];

/**
 * Línea del tiempo del ITD: una fila por época con un adelanto
 * de la portada y acceso a la colección completa.
 */
@Component({
  selector: 'app-collage',
  standalone: true,
  imports: [],
  templateUrl: './collage.component.html',
  styleUrl: './collage.component.css',
})
export class CollageComponent {
  private readonly filtros = inject(GaleriaFiltrosService);
  private readonly galeria = inject(GaleriaService);
  private readonly router = inject(Router);

  readonly cargando = signal(true);

  private readonly epocas = toSignal(this.galeria.getColecciones('timeline'), {
    initialValue: [] as Coleccion[],
  });

  /** Filtrado en cliente por años, título o descripción. */
  readonly epocasVisibles = computed<Coleccion[]>(() => {
    const term = this.filtros.busqueda().trim().toLowerCase();
    const lista = this.epocas();

    if (!term) return lista;

    return lista.filter(
      (e) =>
        e.titulo.toLowerCase().includes(term) ||
        (e.subtitulo ?? '').toLowerCase().includes(term) ||
        (e.descripcion ?? '').toLowerCase().includes(term),
    );
  });

  constructor() {
    // Declara al layout qué opciones debe mostrar la barra de filtros.
    this.filtros.configurar(OPCIONES_TIMELINE, 'Buscar fotos...');
  }

  portada(epoca: Coleccion): string {
    return this.galeria.urlAbsoluta(epoca.portada?.medium);
  }

  verTodas(epoca: Coleccion): void {
    void this.router.navigate(['/galeria/linea-del-tiempo', epoca.id]);
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}