import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

interface CoberturaImagen {
  src: string;
  alt: string;
  etiqueta: string;
  width: number;
  height: number;
  modificador: string;
}

interface CanalDistribucion {
  texto: string;
  icono: 'broadcast' | 'tv' | 'video';
}

interface DatoDuro {
  valor: string;
  label: string;
}

@Component({
  selector: 'app-acerca-cobertura',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './cobertura.component.html',
  styleUrl: './cobertura.component.css'
})
export class CoberturaComponent {
  readonly imagenes: CoberturaImagen[] = [
    {
      src: 'assets/acerca/Totem.png',
      alt: 'Torre transmisora de TV Tecno en el campus ITD',
      etiqueta: 'Torre transmisora',
      width: 900,
      height: 1200,
      modificador: 'cobertura__figura--principal'
    },
    {
      src: 'assets/acerca/Estudio1.png',
      alt: 'Cabina de control con monitores durante una transmisión',
      etiqueta: 'Cabina de control',
      width: 1280,
      height: 960,
      modificador: 'cobertura__figura--secundaria'
    }
  ];

  readonly canales: CanalDistribucion[] = [
    { texto: 'Streaming en vivo', icono: 'broadcast' },
    { texto: 'Circuito interno del campus ITD', icono: 'tv' },
    { texto: 'Contenido bajo demanda en redes', icono: 'video' }
  ];

  readonly datos: DatoDuro[] = [
    { valor: '16.1', label: 'Canal' },
    { valor: '24/7', label: 'Al aire' },
    { valor: 'HD', label: 'Señal' }
  ];
}