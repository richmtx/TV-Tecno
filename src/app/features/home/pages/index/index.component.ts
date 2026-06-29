import { Component } from '@angular/core';
import { HeroComponent } from "../../components/hero/hero.component";
import { NoticiasTickerComponent } from "../../components/noticias-ticker/noticias-ticker.component";
import { ProgramacionDestacadaComponent } from "../../components/programacion-destacada/programacion-destacada.component";
import { UltimasNoticiasComponent } from "../../components/ultimas-noticias/ultimas-noticias.component";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    HeroComponent,
    NoticiasTickerComponent,
    ProgramacionDestacadaComponent,
    UltimasNoticiasComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}