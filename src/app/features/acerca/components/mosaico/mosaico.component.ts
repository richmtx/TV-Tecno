import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

interface MosaicoItem {
  src: string;
  alt: string;
  etiqueta: string;
  width: number;
  height: number;
  modificador: string;
}

@Component({
  selector: 'app-mosaico',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './mosaico.component.html',
  styleUrl: './mosaico.component.css'
})
export class MosaicoComponent {
  readonly items: MosaicoItem[] = [
    {
      src: 'assets/acerca/Totem.png',
      alt: 'Cabina de transmisión de TV Tecno en el campus ITD',
      etiqueta: 'Nuestra Casa',
      width: 941,
      height: 1672,
      modificador: 'mosaico__item--alta'
    },
    {
      src: 'assets/acerca/Estudio2.png',
      alt: 'Transmisión en vivo desde el set de TV Tecno',
      etiqueta: 'Noticiero',
      width: 1535,
      height: 1024,
      modificador: 'mosaico__item--ancha'
    },
    {
      src: 'assets/acerca/Estudio3.png',
      alt: 'Equipo de producción grabando en el campus',
      etiqueta: 'Entrevistas',
      width: 900,
      height: 900,
      modificador: 'mosaico__item--cuadrada'
    },
    {
      src: 'assets/acerca/EstudioMusica.png',
      alt: 'Vida estudiantil en el Instituto Tecnológico de Durango',
      etiqueta: 'Foro Musical',
      width: 900,
      height: 1200,
      modificador: 'mosaico__item--desfasada'
    }
  ];
}