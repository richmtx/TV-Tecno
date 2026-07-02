import { Component } from '@angular/core';

interface Valor {
  titulo: string;
  texto: string;
  icono: 'bulb' | 'school' | 'users';
}

@Component({
  selector: 'app-acerca-valores',
  standalone: true,
  templateUrl: './valores.component.html',
  styleUrl: './valores.component.css',
})
export class ValoresComponent {
  valores: Valor[] = [
    { titulo: 'Innovación', icono: 'bulb', texto: 'Nuevos formatos y tecnología en cada producción.' },
    { titulo: 'Educación', icono: 'school', texto: 'Contenido que forma y comparte conocimiento.' },
    { titulo: 'Comunidad', icono: 'users', texto: 'La voz y el talento de nuestros estudiantes.' },
  ];
}