import { Component } from '@angular/core';
import { VideotecaHeroComponent } from '../../components/videoteca-hero/videoteca-hero.component';

@Component({
  selector: 'app-videoteca',
  imports: [VideotecaHeroComponent],
  templateUrl: './videoteca.component.html',
  styleUrl: './videoteca.component.css'
})
export class VideotecaComponent {
  onBuscar(termino: string): void {
    console.log('Búsqueda en videoteca:', termino);
  }
}
