import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild,
  ViewChildren, } from '@angular/core';
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
  imports: [ RouterLink ],
  templateUrl: './programacion-destacada.component.html',
  styleUrl: './programacion-destacada.component.css',
})
export class ProgramacionDestacadaComponent implements OnInit, AfterViewInit {
  @ViewChild('viewport') viewportRef!: ElementRef<HTMLDivElement>;
  @ViewChildren('slide') slidesRef!: QueryList<ElementRef<HTMLElement>>;

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

  // Cuántas tarjetas se clonan en cada extremo (para que el vecino siga asomando durante el salto)
  private readonly CLONES = 2;

  slides: SlideCarrusel[] = []; // arreglo extendido: [clones inicio, reales, clones fin]
  posicion = 0;                 // índice dentro del arreglo extendido
  desplazamiento = 0;           // px aplicados al track vía translateX
  sinTransicion = false;        // desactiva la animación durante el salto invisible
  animando = false;             // evita spam de clicks justo en el salto

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
    this.posicion = this.CLONES; // arranca en la primera tarjeta real
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.actualizarDesplazamiento());
  }

  @HostListener('window:resize')
  onResize(): void {
    this.actualizarDesplazamiento();
  }

  // Punto (dot) activo, siempre 0..n-1
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

  private mover(nuevaPos: number): void {
    if (this.animando) return;
    const n = this.programas.length;

    this.sinTransicion = false; // asegura que este movimiento sí se anime
    this.posicion = nuevaPos;
    this.actualizarDesplazamiento();

    // ¿Caímos en una tarjeta clon? Entonces hay que hacer el salto invisible al terminar
    const enClon = nuevaPos < this.CLONES || nuevaPos > this.CLONES + n - 1;
    if (enClon) {
      this.animando = true;
      window.setTimeout(() => {
        this.sinTransicion = true; // apaga la animación para que el brinco no se vea
        this.posicion = nuevaPos < this.CLONES ? nuevaPos + n : nuevaPos - n;
        this.actualizarDesplazamiento();
        this.animando = false;
      }, 470); // un pelín más que la transición de 0.45s
    }
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