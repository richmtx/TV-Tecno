import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy,
  OnInit, PLATFORM_ID, QueryList, ViewChild, ViewChildren, inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProgramacionDestacadaService } from '../../../../core/services/programacion-destacada.service';
import type { ProgramaDestacado } from '../../../../core/models/programacion-destacada.model';

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
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly service = inject(ProgramacionDestacadaService);
  private readonly esNavegador = isPlatformBrowser(inject(PLATFORM_ID));

  programas: ProgramaDestacado[] = [];
  cargando = true;

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
  private vistaLista = false;

  ngOnInit(): void {
    this.service.listar().subscribe({
      next: (data) => {
        this.programas = data;
        this.cargando = false;
        this.construirSlides();
      },
      error: () => {
        this.programas = [];
        this.cargando = false;
      },
    });
  }

  ngAfterViewInit(): void {
    if (!this.esNavegador) return;
    this.vistaLista = true;

    // Los slides pueden llegar después de esta llamada: reposicionamos
    // cada vez que la lista renderizada cambie.
    this.slidesRef.changes.subscribe(() => {
      requestAnimationFrame(() => this.actualizarDesplazamiento());
    });

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

  /* ===========================================
     Presentación
     =========================================== */
  imagen(programa: ProgramaDestacado): string | null {
    return this.service.urlAbsoluta(programa.imagenUrl);
  }

  /** "Lun – Vie" + "11:00:00" → "Lun – Vie · 11:00 hrs" */
  horario(programa: ProgramaDestacado): string {
    const hora = programa.horaInicio?.slice(0, 5) ?? '';
    return `${programa.dias} · ${hora} hrs`;
  }

  /* ===========================================
     Construcción del loop infinito
     Los clones a ambos lados permiten que el
     carrusel dé la vuelta sin salto visible.
     =========================================== */
  private construirSlides(): void {
    const n = this.programas.length;

    if (n === 0) {
      this.slides = [];
      return;
    }

    // Con muy pocos elementos no hay material para clonar: se muestra plano.
    if (n <= this.CLONES) {
      this.slides = this.programas.map((p, i) => ({ programa: p, indiceReal: i }));
      this.posicion = 0;
      return;
    }

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

    if (this.vistaLista) {
      this.cdr.detectChanges();
      requestAnimationFrame(() => this.actualizarDesplazamiento());
    }
  }

  get indiceActivo(): number {
    const n = this.programas.length;
    if (n === 0) return 0;
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
    if (n <= this.CLONES) return;

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