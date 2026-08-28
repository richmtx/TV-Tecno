import { Component, inject, input, output } from '@angular/core';
import { GaleriaService } from '../../../../services/galeria.service';
import type { Coleccion } from '../../../../models/coleccion.model';

/**
 * Tarjeta de una instalación: portada, título, descripción y etiqueta.
 */
@Component({
  selector: 'app-instalacion-card',
  standalone: true,
  imports: [],
  templateUrl: './instalacion-card.component.html',
  styleUrl: './instalacion-card.component.css',
})
export class InstalacionCardComponent {
  private readonly galeria = inject(GaleriaService);

  readonly instalacion = input.required<Coleccion>();

  readonly abrir = output<Coleccion>();

  portada(): string {
    return this.galeria.urlAbsoluta(this.instalacion().portada?.thumb);
  }

  onClick(): void {
    this.abrir.emit(this.instalacion());
  }
}