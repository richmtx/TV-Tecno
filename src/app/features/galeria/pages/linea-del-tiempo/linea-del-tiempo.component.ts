import { Component } from '@angular/core';
import { CollageComponent } from '../../components/collage/collage.component';

/**
 * Sección "Línea del tiempo" de la Galería ITD.
 * El hero, las pestañas y el pie los aporta el layout.
 */
@Component({
  selector: 'app-linea-del-tiempo',
  standalone: true,
  imports: [CollageComponent],
  templateUrl: './linea-del-tiempo.component.html',
  styleUrl: './linea-del-tiempo.component.css',
})
export class LineaDelTiempoComponent { }