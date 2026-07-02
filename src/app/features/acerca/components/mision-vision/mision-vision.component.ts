import { Component } from '@angular/core';

interface Bloque {
  titulo: string;
  texto: string;
  icono: 'target' | 'eye';
}

@Component({
  selector: 'app-acerca-mision-vision',
  standalone: true,
  templateUrl: './mision-vision.component.html',
  styleUrl: './mision-vision.component.css',
})
export class MisionVisionComponent {
  bloques: Bloque[] = [
    {
      titulo: 'Nuestra misión',
      icono: 'target',
      texto:
        'Difundir el conocimiento científico y tecnológico generado en el ITD mediante contenido audiovisual de calidad que informe, forme e inspire a la comunidad estudiantil y a la sociedad.',
    },
    {
      titulo: 'Nuestra visión',
      icono: 'eye',
      texto:
        'Ser el referente en comunicación educativa del tecnológico, reconocido por la innovación en sus producciones y por conectar el talento estudiantil con audiencias cada vez más amplias.',
    },
  ];
}