import { Component, input, output } from '@angular/core';
import { Momento } from '../../../../models/momento.model';

/**
 * Tarjeta de un momento estudiantil: portada, título y conteo de fotos.
 * Componente de presentación: no conoce el origen de los datos.
 */
@Component({
  selector: 'app-momento-card',
  standalone: true,
  imports: [],
  templateUrl: './momento-card.component.html',
  styleUrl: './momento-card.component.css',
})
export class MomentoCardComponent {

  /** Momento a mostrar. */
  readonly momento = input.required<Momento>();

  /** Se emite al seleccionar la tarjeta. */
  readonly abrir = output<Momento>();

  onClick(): void {
    this.abrir.emit(this.momento());
  }

  /** Oculta la imagen si el archivo no existe, dejando ver el degradado. */
  onImgError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}