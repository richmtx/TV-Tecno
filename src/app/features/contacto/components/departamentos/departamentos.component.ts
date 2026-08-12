import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Departamento {
  nombre: string;
  descripcion: string;
  sitio: string;
  correo: string;
  telefono: string;
  color: string;            // ← placeholder temporal
  // imagen: string;        // ← reactivar cuando tengas las fotos
  // alt: string;
}

@Component({
  selector: 'app-departamentos',
  standalone: true,
  imports: [],
  templateUrl: './departamentos.component.html',
  styleUrl: './departamentos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartamentosComponent {
  readonly departamentos: Departamento[] = [
    {
      nombre: 'Centro de Innovación Tecnológica (CIT)',
      descripcion:
        'Impulsamos la innovación, el desarrollo tecnológico y el emprendimiento a través de proyectos, asesorías y servicios especializados.',
      sitio: 'cit.itdurango.edu.mx',
      correo: 'cit@itdurango.edu.mx',
      telefono: '(618) 000 1111',
      color: '#044d39',
    },
    {
      nombre: 'Centro de Información (Biblioteca)',
      descripcion:
        'Apoyamos tus actividades académicas con acceso a información, recursos digitales, salas de estudio y servicios bibliotecarios.',
      sitio: 'biblioteca.itdurango.edu.mx',
      correo: 'biblioteca@itdurango.edu.mx',
      telefono: '(618) 000 2222',
      color: '#74611f',
    },
    {
      nombre: 'Centro de lenguas',
      descripcion:
        'Ofrecemos programas de idiomas con estándares de calidad para fortalecer tus competencias comunicativas.',
      sitio: 'clenguas.itdurango.edu.mx',
      correo: 'clenguas@itdurango.edu.mx',
      telefono: '(618) 000 3333',
      color: '#8d242c',
    },
  ];
}