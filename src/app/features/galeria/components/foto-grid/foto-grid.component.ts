import { Component, input, output } from '@angular/core';
import { Foto, altDeFoto } from '../../models/coleccion.model';

/**
 * Cuadrícula de fotografías.
 * Emite el índice global de la foto seleccionada, para que el
 * lightbox pueda recorrer la colección completa.
 */
@Component({
  selector: 'app-foto-grid',
  standalone: true,
  imports: [],
  templateUrl: './foto-grid.component.html',
  styleUrl: './foto-grid.component.css',
})
export class FotoGridComponent {

  /** Fotos visibles en la página actual. */
  readonly fotos = input.required<Foto[]>();

  /** Índice de la primera foto respecto a la colección completa. */
  readonly offset = input<number>(0);

  /** Título de la colección, usado para el texto alternativo. */
  readonly tituloColeccion = input<string>('');

  /** Total de fotos de la colección, usado para el texto alternativo. */
  readonly totalColeccion = input<number>(0);

  /** Se emite con el índice global de la foto seleccionada. */
  readonly seleccion = output<number>();

  /** Texto alternativo de una foto de la página actual. */
  alt(foto: Foto, indiceLocal: number): string {
    return altDeFoto(
      foto,
      this.tituloColeccion(),
      this.offset() + indiceLocal,
      this.totalColeccion()
    );
  }

  onClick(indiceLocal: number): void {
    this.seleccion.emit(this.offset() + indiceLocal);
  }

  /** Oculta la imagen si el archivo no existe, dejando ver el degradado. */
  onImgError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}