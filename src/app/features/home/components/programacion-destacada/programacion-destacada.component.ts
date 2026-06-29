import { Component } from '@angular/core';

interface ProgramaDestacado {
  categoria: string;
  titulo: string;
  horario: string;
  icono: 'noticias' | 'ciencia' | 'tecnologia';
  tema: 'noticias' | 'ciencia' | 'tecnologia';
}

@Component({
  selector: 'app-programacion-destacada',
  standalone: true,
  imports: [],
  templateUrl: './programacion-destacada.component.html',
  styleUrl: './programacion-destacada.component.css'
})
export class ProgramacionDestacadaComponent {
  programas: ProgramaDestacado[] = [
    {
      categoria: 'Noticias',
      titulo: 'Noticiero Tecnológico',
      horario: 'Lun – Vie · 11:00 hrs',
      icono: 'noticias',
      tema: 'noticias',
    },
    {
      categoria: 'Ciencia',
      titulo: 'Laboratorio Abierto',
      horario: 'Mar & Jue · 15:00 hrs',
      icono: 'ciencia',
      tema: 'ciencia',
    },
    {
      categoria: 'Tecnología',
      titulo: 'Código y Futuro',
      horario: 'Miérc · 16:30 hrs',
      icono: 'tecnologia',
      tema: 'tecnologia',
    },
  ];
}