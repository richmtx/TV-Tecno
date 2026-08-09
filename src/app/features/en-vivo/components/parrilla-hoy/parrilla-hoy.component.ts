import { AfterViewInit, Component, ElementRef, Input, ViewChild, } from '@angular/core';

interface FranjaHoraria {
  hora: string;
  titulo: string;
  medio?: string;
  categoria?: string;
  activa?: boolean;
}

@Component({
  selector: 'app-parrilla-hoy',
  standalone: true,
  imports: [],
  templateUrl: './parrilla-hoy.component.html',
  styleUrl: './parrilla-hoy.component.css',
})
export class ParrillaHoyComponent implements AfterViewInit {
  @Input() titulo = 'HOY EN TV TECNO';

  // TODO: reemplazar por datos del API (NestJS) cuando esté disponible.
  @Input() franjas: FranjaHoraria[] = [
    { hora: '11:00', titulo: 'Noticiero Tecnológico', categoria: 'Noticias', activa: true },
    { hora: '13:00', titulo: 'Conexión Vinculación', categoria: 'TV e Internet' },
    { hora: '15:00', titulo: 'Cultura Durango', categoria: 'Cultura' },
    { hora: '17:00', titulo: 'Laboratorio Vivo', categoria: 'Ciencia' },
    { hora: '19:00', titulo: 'Tecno Deportes', categoria: 'Deportes' },
  ];

  @ViewChild('viewport') private viewport!: ElementRef<HTMLDivElement>;

  puedeIzquierda = false;
  puedeDerecha = false;

  ngAfterViewInit(): void {
    // Se espera un tick para que el grid termine de medirse.
    setTimeout(() => this.actualizarNav(), 0);
  }

  desplazar(direccion: -1 | 1): void {
    const el = this.viewport?.nativeElement;
    if (!el) return;

    const card = el.querySelector<HTMLElement>('.franja');
    const paso = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;

    el.scrollBy({ left: paso * direccion, behavior: 'smooth' });
  }

  actualizarNav(): void {
    const el = this.viewport?.nativeElement;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    this.puedeIzquierda = el.scrollLeft > 4;
    this.puedeDerecha = el.scrollLeft < max - 4;
  }
}