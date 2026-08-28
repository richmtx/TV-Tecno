import { Component, inject, input, output } from '@angular/core';
import { GaleriaService } from '../../../../services/galeria.service';
import type { Coleccion } from '../../../../models/coleccion.model';

/**
 * Tarjeta de un álbum: portada, título, conteo de fotos y periodo.
 */
@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.css',
})
export class AlbumCardComponent {
  private readonly galeria = inject(GaleriaService);

  readonly album = input.required<Coleccion>();

  readonly abrir = output<Coleccion>();

  portada(): string {
    return this.galeria.urlAbsoluta(this.album().portada?.thumb);
  }

  onClick(): void {
    this.abrir.emit(this.album());
  }
}