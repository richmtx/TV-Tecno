import { Component } from '@angular/core';

interface Bloque {
  eyebrow: string;
  titulo: string;
  texto: string;
  icono: 'broadcast' | 'telescope';
  variante: 'wine' | 'gold';
}

@Component({
  selector: 'app-acerca-mision-vision',
  standalone: true,
  templateUrl: './mision-vision.component.html',
  styleUrl: './mision-vision.component.css',
})
export class MisionVisionComponent {
  readonly bloques: Bloque[] = [
    {
      eyebrow: 'Misión',
      titulo: 'Contar el Tecnológico desde adentro',
      icono: 'broadcast',
      variante: 'wine',
      texto:
        'Brindar comunicación audiovisual pública y digital desde el Instituto Tecnológico de Durango mediante producciones innovadoras, inclusivas y de calidad que divulguen la ciencia, la tecnología y la cultura generadas en la institución, fortalezcan el vínculo entre nuestra comunidad y la sociedad duranguense, y contribuyan a la formación de los estudiantes que participan en su creación.',
    },
    {
      eyebrow: 'Visión',
      titulo: 'Ser la referencia educativa del norte del país',
      icono: 'telescope',
      variante: 'gold',
      texto:
        'Consolidarnos hacia 2030 como el medio de comunicación universitario de mayor alcance en Durango y un referente en el norte de México, reconocidos por la calidad de nuestras producciones, la innovación tecnológica, la co-creación de contenidos con la comunidad estudiantil y una programación sostenible que genere valor público, identidad y arraigo en la región.',
    },
  ];

  readonly valores: string[] = ['Identidad', 'Colaboración', 'Innovación'];
}