import { Component, inject, input, output } from '@angular/core';
import { GaleriaService } from '../../../../services/galeria.service';
import type { Coleccion } from '../../../../models/coleccion.model';

/**
 * Tarjeta de un momento estudiantil: portada, título y conteo.
 */
@Component({
  selector: 'app-momento-card',
  standalone: true,
  imports: [],
  templateUrl: './momento-card.component.html',
  styleUrl: './momento-card.component.css',
})
export class MomentoCardComponent {
  private readonly galeria = inject(GaleriaService);

  readonly momento = input.required<Coleccion>();

  readonly abrir = output<Coleccion>();

  portada(): string {
    return this.galeria.urlAbsoluta(this.momento().portada?.thumb);
  }

  onClick(): void {
    this.abrir.emit(this.momento());
  }
}