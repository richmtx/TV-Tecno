import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CategoriaNoticia =
  | 'noticias'
  | 'academico'
  | 'vinculacion'
  | 'tecnologia'
  | 'cultura';

export interface Noticia {
  titulo: string;
  descripcion: string;
  categoria: CategoriaNoticia;
  fecha: string;
  tiempoLectura: string;
  imagen: string;
  vistas?: number;
  enlace?: string;
  fechaCorta?: { dia: string; mes: string; anio: string };
}

@Component({
  selector: 'app-ultimas-noticias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ultimas-noticias.component.html',
  styleUrl: './ultimas-noticias.component.css',
})
export class UltimasNoticiasComponent {
  destacada?: Noticia;
  secundarias: Noticia[] = [];

  @Input() set noticias(valor: Noticia[]) {
    const lista = valor?.length ? valor : this.noticiasPorDefecto;
    this.destacada = lista[0];
    this.secundarias = lista.slice(1, 5);
  }

  @Output() seleccionar = new EventEmitter<Noticia>();
  @Output() masOpciones = new EventEmitter<Noticia>();

  private readonly noticiasPorDefecto: Noticia[] = [
    {
      titulo: 'Estudiantes del ITD desarrollan sistema de riego inteligente con IA',
      descripcion:
        'El proyecto fue reconocido a nivel regional y busca financiamiento para su implementación en comunidades agrícolas.',
      categoria: 'noticias',
      fecha: '2 junio 2026',
      fechaCorta: { dia: '2', mes: 'Jun', anio: '2026' },
      tiempoLectura: '5 min de lectura',
      vistas: 1245,
      imagen: 'assets/desarrollo/EstudiantesIA.png',
    },
    {
      titulo: 'El ITD será sede del Congreso de Tecnología e Innovación 2026',
      descripcion:
        'Más de 400 participantes de todo el país se reunirán en el campus para presentar proyectos y conferencias magistrales.',
      categoria: 'academico',
      fecha: '1 junio 2026',
      tiempoLectura: '3 min',
      imagen: 'assets/desarrollo/Congreso.png',
    },
    {
      titulo: 'Firma de convenio con la industria regional de software',
      descripcion:
        'La alianza abrirá espacios de prácticas profesionales y residencias para estudiantes del ITD.',
      categoria: 'vinculacion',
      fecha: '30 mayo 2026',
      tiempoLectura: '4 min',
      imagen: 'assets/desarrollo/Convenio.png',
    },
    {
      titulo: 'Estudiantes ganan concurso nacional de robótica',
      descripcion:
        'El equipo representó al Tecnológico de Durango y obtuvo el primer lugar en la categoría avanzada.',
      categoria: 'tecnologia',
      fecha: '28 mayo 2026',
      tiempoLectura: '3 min',
      imagen: 'assets/desarrollo/Robotica.png',
    },
    {
      titulo: 'Gran presentación del Ballet Folclórico del ITD',
      descripcion:
        'El ballet representó a Durango en el Festival Nacional de Arte y Cultura Tecnológica 2026.',
      categoria: 'cultura',
      fecha: '25 mayo 2026',
      tiempoLectura: '2 min',
      imagen: 'assets/desarrollo/BalletF.png',
    },
  ];

  private readonly etiquetas: Record<CategoriaNoticia, string> = {
    noticias: 'Noticias',
    academico: 'Académico',
    vinculacion: 'Vinculación',
    tecnologia: 'Tecnología',
    cultura: 'Cultura',
  };

  constructor() {
    this.noticias = this.noticiasPorDefecto;
  }

  etiquetaDe(categoria: CategoriaNoticia): string {
    return this.etiquetas[categoria] ?? 'Noticias';
  }

  formatearVistas(vistas?: number): string {
    return vistas ? `${vistas.toLocaleString('es-MX')} vistas` : '';
  }

  abrir(noticia: Noticia, evento?: Event): void {
    evento?.stopPropagation();
    this.seleccionar.emit(noticia);
  }

  abrirOpciones(noticia: Noticia, evento: Event): void {
    evento.stopPropagation();
    this.masOpciones.emit(noticia);
  }

  trackByTitulo(_index: number, noticia: Noticia): string {
    return noticia.titulo;
  }
}