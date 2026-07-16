import { Component, ElementRef, ViewChild } from '@angular/core';

interface Miembro {
  numero: string;
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
  @ViewChild('tira') tiraRef!: ElementRef<HTMLElement>;

  miembros: Miembro[] = [
    { numero: '01', iniciales: 'DG', rol: 'Dirección General', area: 'Coordinación' },
    { numero: '02', iniciales: 'PR', rol: 'Producción', area: 'Contenido' },
    { numero: '03', iniciales: 'CM', rol: 'Camarógrafos', area: 'Realización' },
    { numero: '04', iniciales: 'ED', rol: 'Edición', area: 'Post-producción' },
  ];

  puedeIzquierda = false;
  puedeDerecha = true;

  desplazar(direccion: 1 | -1): void {
    this.tiraRef.nativeElement.scrollBy({ left: direccion * 260, behavior: 'smooth' });
  }

  actualizarEstado(): void {
    const el = this.tiraRef.nativeElement;
    this.puedeIzquierda = el.scrollLeft > 4;
    this.puedeDerecha = el.scrollLeft < el.scrollWidth - el.clientWidth - 4;
  }
}
