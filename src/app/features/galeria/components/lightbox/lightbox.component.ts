import { Component, HostListener, computed, effect, input, output } from '@angular/core';
import { Foto } from '../../models/coleccion.model';

/**
 * Visor a pantalla completa con navegación entre fotos.
 * Se controla desde fuera: el padre decide qué índice está abierto
 * y este componente emite los cambios.
 */
@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.css',
})
export class LightboxComponent {

  /** Colección completa que se puede recorrer. */
  readonly fotos = input.required<Foto[]>();

  /** Índice abierto, o null si el visor está cerrado. */
  readonly indice = input.required<number | null>();

  /** Se emite con el nuevo índice al navegar. */
  readonly cambioIndice = output<number>();

  /** Se emite al cerrar el visor. */
  readonly cerrar = output<void>();

  readonly abierto = computed(() => this.indice() !== null);

  readonly fotoActual = computed<Foto | null>(() => {
    const i = this.indice();
    return i === null ? null : this.fotos()[i] ?? null;
  });

  readonly hayAnterior = computed(() => (this.indice() ?? 0) > 0);
  readonly haySiguiente = computed(() =>
    (this.indice() ?? 0) < this.fotos().length - 1
  );

  constructor() {
    // Evita que la página de atrás se desplace con el visor abierto.
    effect(() => {
      document.body.style.overflow = this.abierto() ? 'hidden' : '';
    });
  }

  anterior(): void {
    if (this.hayAnterior()) {
      this.cambioIndice.emit((this.indice() as number) - 1);
    }
  }

  siguiente(): void {
    if (this.haySiguiente()) {
      this.cambioIndice.emit((this.indice() as number) + 1);
    }
  }

  onCerrar(): void {
    this.cerrar.emit();
  }

  /** Cierra al pulsar sobre el fondo, no sobre la imagen. */
  onFondo(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onCerrar();
    }
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }

  @HostListener('document:keydown', ['$event'])
  onTecla(event: KeyboardEvent): void {
    if (!this.abierto()) {
      return;
    }
    switch (event.key) {
      case 'Escape':
        this.onCerrar();
        break;
      case 'ArrowLeft':
        this.anterior();
        break;
      case 'ArrowRight':
        this.siguiente();
        break;
    }
  }
}