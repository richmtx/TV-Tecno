import { Component } from '@angular/core';

@Component({
  selector: 'app-noticias-ticker',
  standalone: true,
  imports: [],
  templateUrl: './noticias-ticker.component.html',
  styleUrl: './noticias-ticker.component.css'
})
export class NoticiasTickerComponent {
  noticias: string[] = [
    'Congreso de Tecnología e Ingeniería 2026 — del 9 al 13 de junio',
    'Nuevas becas disponibles para alumnos de excelencia',
    'Laboratorio de IA inaugura nuevas instalaciones',
  ];
}