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
        'Producir y transmitir contenidos que difundan la ciencia, la tecnología y la vida estudiantil del Instituto Tecnológico de Durango, formando a la vez a los estudiantes que los crean.',
    },
    {
      eyebrow: 'Visión',
      titulo: 'Ser la referencia educativa de Durango',
      icono: 'telescope',
      variante: 'gold',
      texto:
        'Consolidarnos como el canal universitario de mayor alcance en el estado, reconocido por la calidad de su producción y por abrir espacio a las voces jóvenes de la región.',
    },
  ];

  readonly valores: string[] = ['Formación', 'Identidad', 'Divulgación'];
}