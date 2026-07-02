import { Component } from '@angular/core';

interface Miembro {
  iniciales: string;
  rol: string;
  area: string;
}

@Component({
  selector: 'app-acerca-equipo',
  standalone: true,
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css',
})
export class EquipoComponent {
  miembros: Miembro[] = [
    { iniciales: 'DG', rol: 'Dirección General', area: 'Coordinación' },
    { iniciales: 'PR', rol: 'Producción', area: 'Contenido' },
    { iniciales: 'CM', rol: 'Camarógrafos', area: 'Realización' },
    { iniciales: 'ED', rol: 'Edición', area: 'Post-producción' },
  ];
}