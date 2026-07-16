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
      src: 'assets/img/mosaico/estudio.jpg',
      alt: 'Cabina de transmisión de TV Tecno en el campus ITD',
      etiqueta: 'Estudio',
      width: 800,
      height: 1000,
      modificador: 'mosaico__item--alta'
    },
    {
      src: 'assets/img/mosaico/en-vivo.jpg',
      alt: 'Transmisión en vivo desde el set de TV Tecno',
      etiqueta: 'En vivo',
      width: 1280,
      height: 720,
      modificador: 'mosaico__item--ancha'
    },
    {
      src: 'assets/img/mosaico/produccion.jpg',
      alt: 'Equipo de producción grabando en el campus',
      etiqueta: 'Producción',
      width: 900,
      height: 900,
      modificador: 'mosaico__item--cuadrada'
    },
    {
      src: 'assets/img/mosaico/campus.jpg',
      alt: 'Vida estudiantil en el Instituto Tecnológico de Durango',
      etiqueta: 'Campus',
      width: 900,
      height: 1200,
      modificador: 'mosaico__item--desfasada'
    }
  ];
}