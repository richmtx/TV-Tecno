import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroGaleriaComponent } from "../../components/hero-galeria/hero-galeria.component";
import { CollageComponent } from "../../components/collage/collage.component";
import { FotosItdComponent } from "../../../../shared/components/fotos-itd/fotos-itd.component";
import { HistoriaComponent } from "../../../../shared/components/historia/historia.component";

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule, HeroGaleriaComponent, CollageComponent, FotosItdComponent, HistoriaComponent],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css',
})
export class GaleriaComponent {

  onEnviarFotos(): void {
    // TODO: abrir modal o navegar al formulario de envío
    console.log('Enviar mis fotos');
  }
}