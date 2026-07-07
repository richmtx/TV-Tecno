import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FranjaHoraria {
  hora: string;
  titulo: string;
  medio: string;
  activa?: boolean;
}

@Component({
  selector: 'app-parrilla-hoy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parrilla-hoy.component.html',
  styleUrl: './parrilla-hoy.component.css',
})
export class ParrillaHoyComponent {
  @Input() titulo = 'HOY, EN TV TECNO';

  // TODO: reemplazar por datos del API (NestJS) cuando esté disponible.
  @Input() franjas: FranjaHoraria[] = [
    { hora: '07:00', titulo: 'Buenos Días ITD', medio: 'TV e Internet', activa: true },
    { hora: '08:30', titulo: 'Ruta STEM', medio: 'TV e Internet' },
    { hora: '11:00', titulo: 'Noticiero Tecnológico', medio: 'TV e Internet' },
    { hora: '18:00', titulo: 'Laboratorio de IA', medio: 'TV e Internet' },
  ];
}