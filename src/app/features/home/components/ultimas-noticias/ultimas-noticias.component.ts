import { Component } from '@angular/core';

interface Noticia {
  categoria: string;
  fecha: string;
  titulo: string;
  extracto: string;
  tema: 'rosa' | 'verde';
}

@Component({
  selector: 'app-ultimas-noticias',
  standalone: true,
  imports: [],
  templateUrl: './ultimas-noticias.component.html',
  styleUrl: './ultimas-noticias.component.css'
})
export class UltimasNoticiasComponent {
  noticias: Noticia[] = [
    {
      categoria: 'Investigación',
      fecha: '2 jun 2026',
      titulo: 'Estudiantes del ITD desarrollan sistema de riego inteligente con IA',
      extracto: 'El proyecto fue reconocido a nivel regional y busca financiamiento para su implementación en el sector agrícola de Durango.',
      tema: 'rosa',
    },
    {
      categoria: 'Eventos',
      fecha: '1 jun 2026',
      titulo: 'El ITD será sede del Congreso de Tecnología e Innovación 2026',
      extracto: 'Más de 400 participantes de todo el país se reunirán en el campus para presentar proyectos de vanguardia tecnológica.',
      tema: 'verde',
    },
  ];
}