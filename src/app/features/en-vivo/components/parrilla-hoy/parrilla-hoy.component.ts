import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input,
  NgZone, OnDestroy, ViewChild,
} from '@angular/core';

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
export class ParrillaHoyComponent implements AfterViewInit, OnDestroy {
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

  private observer?: ResizeObserver;
  private frameId = 0;

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    // Recalcula al cambiar el ancho del contenedor (no solo de la ventana):
    // cubre el panel de dispositivo de DevTools y el sidebar del layout.
    this.zone.runOutsideAngular(() => {
      this.observer = new ResizeObserver(() => {
        cancelAnimationFrame(this.frameId);
        this.frameId = requestAnimationFrame(() => {
          this.zone.run(() => this.actualizarNav());
        });
      });
      this.observer.observe(this.viewport.nativeElement);
    });

    setTimeout(() => {
      this.centrarActiva();
      this.actualizarNav();
    }, 0);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frameId);
    this.observer?.disconnect();
  }

  desplazar(direccion: -1 | 1): void {
    const el = this.viewport?.nativeElement;
    if (!el) return;

    el.scrollBy({ left: this.paso(el) * direccion, behavior: 'smooth' });
  }

  actualizarNav(): void {
    const el = this.viewport?.nativeElement;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    const hayScroll = max > 4;

    this.puedeIzquierda = hayScroll && el.scrollLeft > 4;
    this.puedeDerecha = hayScroll && el.scrollLeft < max - 4;

    // Clases que controlan el desvanecido lateral y las flechas
    el.classList.toggle('is-completo', !hayScroll);
    el.classList.toggle('is-inicio', hayScroll && !this.puedeIzquierda);
    el.classList.toggle('is-fin', hayScroll && !this.puedeDerecha);
    el.parentElement?.classList.toggle('sin-scroll', !hayScroll);

    this.cdr.markForCheck();
  }

  /** Deja visible el programa en vivo al cargar en pantallas angostas. */
  private centrarActiva(): void {
    const el = this.viewport?.nativeElement;
    if (!el) return;

    const indice = this.franjas.findIndex((f) => f.activa);
    if (indice < 1) return;

    // Salto instantáneo: se desactiva el scroll suave solo durante el ajuste.
    const previo = el.style.scrollBehavior;
    el.style.scrollBehavior = 'auto';
    el.scrollLeft = this.paso(el) * indice;
    el.style.scrollBehavior = previo;
  }

  private paso(el: HTMLElement): number {
    const card = el.querySelector<HTMLElement>('.franja');
    if (!card) return el.clientWidth * 0.8;

    const gap = parseFloat(
      getComputedStyle(el.firstElementChild as HTMLElement).columnGap || '20'
    );
    return card.offsetWidth + (Number.isNaN(gap) ? 20 : gap);
  }
}