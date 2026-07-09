import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Noticia {
  titulo: string;
  descripcion: string;
  fecha: string;
  imagen?: string;
}

@Component({
  selector: 'app-ultimas-noticias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ultimas-noticias.component.html',
  styleUrl: './ultimas-noticias.component.css',
})
export class UltimasNoticiasComponent {
  @Input() noticias: Noticia[] = [
    {
      titulo: 'Estudiantes del ITD desarrollan sistema de riego inteligente con IA',
      descripcion:
        'El proyecto fue reconocido a nivel regional y busca financiamiento para su implementación en el sector agrícola de Durango.',
      fecha: '2 jun 2026',
    },
    {
      titulo: 'El ITD será sede del Congreso de Tecnología e Innovación 2026',
      descripcion:
        'Más de 400 participantes de todo el país se reunirán en el campus para presentar proyectos de vanguardia tecnológica.',
      fecha: '1 jun 2026',
    },
    {
      titulo: 'Firma de convenio con la industria regional de software',
      descripcion:
        'La alianza abrirá espacios de prácticas profesionales y residencias para estudiantes de sistemas y computación.',
      fecha: '30 may 2026',
    },
    {
      titulo: 'Estudiantes ganan concurso nacional de robótica',
      descripcion:
        'El equipo representó al Tecnológico de Durango y obtuvo el primer lugar en la categoría de robótica autónoma.',
      fecha: '28 may 2026',
    },
  ];

  // Degradados de respaldo (cuando la noticia no tiene imagen), dentro de la paleta guinda de marca.
  private readonly fallbacks: string[] = [
    'linear-gradient(155deg, #b03a63, #6b1538)',
    'linear-gradient(155deg, #6b1538, #4d0e28)',
    'linear-gradient(155deg, #8a2a52, #4d0e28)',
    'linear-gradient(155deg, #4d0e28, #2c0819)',
  ];

  fallbackFor(index: number): string {
    return this.fallbacks[index % this.fallbacks.length];
  }

  trackByTitulo(_index: number, noticia: Noticia): string {
    return noticia.titulo;
  }
}