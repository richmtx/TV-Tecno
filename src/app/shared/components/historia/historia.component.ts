import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-historia',
  standalone: true,
  templateUrl: './historia.component.html',
  styleUrl: './historia.component.css'
})
export class HistoriaComponent {

  /** Líneas de la cita; cada elemento se renderiza como un párrafo. */
  @Input() lineas: string[] = [
    '"Nuestra historia está hecha de personas, aprendizajes y sueños.',
    'Cada foto guarda un momento que nos ha llevado hasta aquí."'
  ];

  /** Ruta de la imagen decorativa (frontispicio). */
  @Input() imagenSrc = 'assets/galeria/Frontispicio.png';

  /** Texto alternativo de la imagen. Por defecto vacío (decorativa). */
  @Input() imagenAlt = '';
}