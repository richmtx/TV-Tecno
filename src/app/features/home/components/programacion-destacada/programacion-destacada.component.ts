import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, PLATFORM_ID,
  QueryList, ViewChild, ViewChildren, inject, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ProgramaDestacado {
  categoria: string;
  titulo: string;
  horario: string;
  icono: 'noticias' | 'ciencia' | 'tecnologia' | 'entrevista' | 'cultura';
  tema: 'noticias' | 'ciencia' | 'tecnologia' | 'entrevista' | 'cultura';
}

interface SlideCarrusel {
  programa: ProgramaDestacado;
  indiceReal: number;
}

@Component({
  selector: 'app-programacion-destacada',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './programacion-destacada.component.html',
  styleUrl: './programacion-destacada.component.css',
})
export class ProgramacionDestacadaComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('viewport') viewportRef!: ElementRef<HTMLDivElement>;
  @ViewChildren('slide') slidesRef!: QueryList<ElementRef<HTMLElement>>;

  private readonly zone = inject(NgZone);
  private readonly esNavegador = isPlatformBrowser(inject(PLATFORM_ID));

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
    {
      categoria: 'Entrevistas',
      titulo: 'Voces del Tecnológico',
      horario: 'Lun & Miérc · 18:00 hrs',
      icono: 'entrevista',
      tema: 'entrevista',
    },
    {
      categoria: 'Cultura',
      titulo: 'Arte y Comunidad',
      horario: 'Vie · 17:00 hrs',
      icono: 'cultura',
      tema: 'cultura',
    },
  ];

  private readonly CLONES = 2;

  slides: SlideCarrusel[] = [];
  posicion = 0;               
  desplazamiento = 0;       
  sinTransicion = false;      
  animando = false;         
  arrastrando = false;       

  private inicioX = 0;
  private inicioY = 0;
  private despBase = 0;
  private eje: 'x' | 'y' | null = null;

  private observador?: ResizeObserver;
  private temporizador?: number;

  ngOnInit(): void {
    const n = this.programas.length;

    const clonesInicio: SlideCarrusel[] = this.programas
      .slice(n - this.CLONES)
      .map((p, i) => ({ programa: p, indiceReal: n - this.CLONES + i }));

    const reales: SlideCarrusel[] = this.programas.map((p, i) => ({
      programa: p,
      indiceReal: i,
    }));

    const clonesFin: SlideCarrusel[] = this.programas
      .slice(0, this.CLONES)
      .map((p, i) => ({ programa: p, indiceReal: i }));

    this.slides = [...clonesInicio, ...reales, ...clonesFin];
    this.posicion = this.CLONES;
  }

  ngAfterViewInit(): void {
    if (!this.esNavegador) return;

    requestAnimationFrame(() => this.actualizarDesplazamiento());

    if (typeof ResizeObserver !== 'undefined' && this.viewportRef) {
      this.zone.runOutsideAngular(() => {
        this.observador = new ResizeObserver(() => {
          this.zone.run(() => this.recalcularSinAnimar());
        });
        this.observador.observe(this.viewportRef.nativeElement);
      });
    }
  }

  ngOnDestroy(): void {
    this.observador?.disconnect();
    if (this.temporizador) window.clearTimeout(this.temporizador);
  }

  get indiceActivo(): number {
    const n = this.programas.length;
    return (((this.posicion - this.CLONES) % n) + n) % n;
  }

  anterior(): void {
    this.mover(this.posicion - 1);
  }

  siguiente(): void {
    this.mover(this.posicion + 1);
  }

  irA(indiceReal: number): void {
    this.mover(this.CLONES + indiceReal);
  }

  // ---------- Swipe / arrastre con Pointer Events ----------
  // Cubre mouse, touch y lápiz con una sola API.

  onPointerDown(evento: PointerEvent): void {
    if (this.animando) return;
    if (evento.pointerType === 'mouse' && evento.button !== 0) return;

    this.inicioX = evento.clientX;
    this.inicioY = evento.clientY;
    this.despBase = this.desplazamiento;
    this.arrastrando = true;
    this.eje = null;
  }

  onPointerMove(evento: PointerEvent): void {
    if (!this.arrastrando) return;

    const dx = evento.clientX - this.inicioX;
    const dy = evento.clientY - this.inicioY;

    if (!this.eje) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      this.eje = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (this.eje === 'x') {
        this.sinTransicion = true;
        (evento.target as HTMLElement).setPointerCapture?.(evento.pointerId);
      }
    }

    if (this.eje !== 'x') return;
    this.desplazamiento = this.despBase + dx;
  }

  onPointerUp(evento: PointerEvent): void {
    if (!this.arrastrando) return;

    const dx = evento.clientX - this.inicioX;
    const eje = this.eje;

    this.arrastrando = false;
    this.eje = null;
    this.sinTransicion = false;

    if (eje !== 'x') return;

    const ancho = this.viewportRef?.nativeElement.clientWidth ?? 320;
    const umbral = Math.min(80, ancho * 0.18);

    if (dx <= -umbral) this.siguiente();
    else if (dx >= umbral) this.anterior();
    else this.actualizarDesplazamiento();
  }

  onPointerCancel(): void {
    if (!this.arrastrando) return;
    this.arrastrando = false;
    this.eje = null;
    this.sinTransicion = false;
    this.actualizarDesplazamiento();
  }

  // ---------- Lógica del loop infinito ----------

  private mover(nuevaPos: number): void {
    if (this.animando) return;
    const n = this.programas.length;

    this.sinTransicion = false;
    this.posicion = nuevaPos;
    this.actualizarDesplazamiento();

    const enClon = nuevaPos < this.CLONES || nuevaPos > this.CLONES + n - 1;
    if (!enClon) return;

    this.animando = true;
    this.temporizador = window.setTimeout(() => {
      this.sinTransicion = true;
      this.posicion = nuevaPos < this.CLONES ? nuevaPos + n : nuevaPos - n;
      this.actualizarDesplazamiento();
      this.animando = false;
    }, 470);
  }

  // Reposiciona sin animar (para resize/rotación de pantalla)
  private recalcularSinAnimar(): void {
    this.sinTransicion = true;
    this.actualizarDesplazamiento();
    requestAnimationFrame(() => {
      this.sinTransicion = false;
    });
  }

  private actualizarDesplazamiento(): void {
    const slides = this.slidesRef?.toArray();
    const activo = slides?.[this.posicion]?.nativeElement;
    const viewport = this.viewportRef?.nativeElement;
    if (!activo || !viewport) return;

    const centrar = (viewport.clientWidth - activo.offsetWidth) / 2;
    this.desplazamiento = -(activo.offsetLeft - centrar);
  }
}