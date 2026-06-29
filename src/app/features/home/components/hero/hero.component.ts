import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  // Datos del programa en transmisión (luego vendrán de un servicio/API)
  programaActual = {
    titulo: 'Noticiero Tecnológico',
    horario: '11:00 – 12:00 hrs',
    progreso: 35 // porcentaje 0–100 de la barra
  };
}