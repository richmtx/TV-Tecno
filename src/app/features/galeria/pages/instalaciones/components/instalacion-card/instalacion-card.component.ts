import { Component, input, output } from '@angular/core';
import { Instalacion } from '../../../../models/instalacion.model';

/**
 * Tarjeta de una instalación: portada, título, descripción y etiqueta.
 * Componente de presentación: no conoce el origen de los datos.
 */
@Component({
  selector: 'app-instalacion-card',
  standalone: true,
  imports: [],
  templateUrl: './instalacion-card.component.html',
  styleUrl: './instalacion-card.component.css',
})
export class InstalacionCardComponent {

  /** Instalación a mostrar. */
  readonly instalacion = input.required<Instalacion>();

  /** Se emite al seleccionar la tarjeta. */
  readonly abrir = output<Instalacion>();

  onClick(): void {
    this.abrir.emit(this.instalacion());
  }

  /** Oculta la imagen si el archivo no existe, dejando ver el degradado. */
  onImgError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}