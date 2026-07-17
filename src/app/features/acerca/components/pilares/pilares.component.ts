import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

interface Pilar {
  logo: string;
  alt: string;
  nombre: string;
  rol: string;
  texto: string;
  width: number;
  height: number;
}

@Component({
  selector: 'app-acerca-pilares',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './pilares.component.html',
  styleUrl: './pilares.component.css'
})
export class PilaresComponent {
  readonly pilares: Pilar[] = [
    {
      logo: 'assets/logos/LogoXHITD.png',
      alt: 'Logotipo de TV Tecno, canal XHITD 16.1',
      nombre: 'TV Tecno',
      rol: 'El canal',
      texto: 'La señal XHITD 16.1 y el equipo que la produce día con día.',
      width: 400,
      height: 400
    },
    {
      logo: 'assets/logos/LogoITD.png',
      alt: 'Escudo del Instituto Tecnológico de Durango',
      nombre: 'Instituto Tecnológico de Durango',
      rol: 'La casa',
      texto: 'La institución que nos alberga y da sentido a todo lo que transmitimos.',
      width: 400,
      height: 400
    },
    {
      logo: 'assets/logos/LogoPatronato.png',
      alt: 'Logotipo del Patronato del Instituto Tecnológico de Durango',
      nombre: 'Patronato',
      rol: 'El respaldo',
      texto: 'El soporte que hace posible sostener y crecer el proyecto.',
      width: 400,
      height: 400
    }
  ];
}