import { Component } from '@angular/core';

interface Canal {
  texto: string;
  icono: 'broadcast' | 'tv' | 'youtube';
}

@Component({
  selector: 'app-acerca-cobertura',
  standalone: true,
  templateUrl: './cobertura.component.html',
  styleUrl: './cobertura.component.css',
})
export class CoberturaComponent {
  canales: Canal[] = [
    { texto: 'Streaming en vivo', icono: 'broadcast' },
    { texto: 'Circuito interno del campus ITD', icono: 'tv' },
    { texto: 'Contenido bajo demanda en redes', icono: 'youtube' },
  ];
}