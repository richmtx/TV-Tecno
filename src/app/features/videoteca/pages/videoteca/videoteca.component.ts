import { Component } from '@angular/core';
import { VideotecaHeroComponent } from '../../components/videoteca-hero/videoteca-hero.component';
import { VideotecaCatalogoComponent } from "../../components/videoteca-catalogo/videoteca-catalogo.component";
import { YoutubeComponent } from "../../../../shared/components/youtube/youtube.component";

@Component({
  selector: 'app-videoteca',
  imports: [VideotecaHeroComponent, VideotecaCatalogoComponent, YoutubeComponent],
  templateUrl: './videoteca.component.html',
  styleUrl: './videoteca.component.css'
})
export class VideotecaComponent {
  onBuscar(termino: string): void {
    console.log('Búsqueda en videoteca:', termino);
  }
}
