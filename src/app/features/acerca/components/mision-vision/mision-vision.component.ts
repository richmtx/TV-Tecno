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
        'Difundir el conocimiento científico y tecnológico del ITD con contenido audiovisual que informa, forma e inspira a la comunidad.',
    },
    {
      titulo: 'Nuestra visión',
      icono: 'eye',
      texto:
        'Ser el referente en comunicación educativa del Tecnológico, conectando el talento estudiantil con audiencias cada vez más amplias.',
    },
  ];
}