import { Component, input, output } from '@angular/core';
import { Album } from '../../../../models/album.model';

/**
 * Tarjeta de un álbum: portada, título, conteo de fotos y periodo.
 * Componente de presentación: no conoce el origen de los datos.
 */
@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.css',
})
export class AlbumCardComponent {

  /** Álbum a mostrar. */
  readonly album = input.required<Album>();

  /** Se emite al seleccionar la tarjeta. */
  readonly abrir = output<Album>();

  onClick(): void {
    this.abrir.emit(this.album());
  }

  /** Oculta la imagen si el archivo no existe, dejando ver el degradado. */
  onImgError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}