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

  // Degradados de respaldo (cuando la noticia no tiene imagen).
  // Degradados de respaldo (cuando la noticia no tiene imagen).
  private readonly fallbacks: string[] = [
    'linear-gradient(155deg, #836d23, #5e4e19)',
    'linear-gradient(155deg, #b42e38, #7d1f26)',
    'linear-gradient(155deg, #5c2c56, #3d1c39)',
    'linear-gradient(155deg, #04513c, #033628)',
  ];

  fallbackFor(index: number): string {
    return this.fallbacks[index % this.fallbacks.length];
  }

  trackByTitulo(_index: number, noticia: Noticia): string {
    return noticia.titulo;
  }
}