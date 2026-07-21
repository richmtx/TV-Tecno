import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-videoteca-hero',
  standalone: true,
  imports: [],
  templateUrl: './videoteca-hero.component.html',
  styleUrl: './videoteca-hero.component.css'
})
export class VideotecaHeroComponent {
  @Output() buscar = new EventEmitter<string>();

  onBuscar(event: Event, valor: string): void {
    event.preventDefault();
    this.buscar.emit(valor.trim());
  }
}
