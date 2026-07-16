import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { MosaicoComponent } from "../../components/mosaico/mosaico.component";
import { MisionVisionComponent } from '../../components/mision-vision/mision-vision.component';

@Component({
  selector: 'app-acerca',
  standalone: true,
  imports: [
    HeroComponent,
    MosaicoComponent,
    MisionVisionComponent,
],
  templateUrl: './acerca.component.html',
  styleUrl: './acerca.component.css',
})
export class AcercaComponent {}