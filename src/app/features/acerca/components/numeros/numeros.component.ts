import { Component } from '@angular/core';

interface Cifra {
  valor: string;
  etiqueta: string;
}

@Component({
  selector: 'app-acerca-numeros',
  standalone: true,
  templateUrl: './numeros.component.html',
  styleUrl: './numeros.component.css',
})
export class NumerosComponent {
  cifras: Cifra[] = [
    { valor: '+40', etiqueta: 'Programas producidos' },
    { valor: '6', etiqueta: 'Años al aire' },
    { valor: '24', etiqueta: 'Carreras cubiertas' },
    { valor: '+15k', etiqueta: 'Espectadores' },
  ];
}