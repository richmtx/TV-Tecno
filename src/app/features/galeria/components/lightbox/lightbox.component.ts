import { Component, HostListener, computed, effect, inject, input, output } from '@angular/core';
import { Foto, altDeFoto } from '../../models/coleccion.model';
import { GaleriaService } from '../../services/galeria.service';

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

  private readonly galeria = inject(GaleriaService);

  /** Colección completa que se puede recorrer. */
  readonly fotos = input.required<Foto[]>();

  /** Índice abierto, o null si el visor está cerrado. */
  readonly indice = input.required<number | null>();

  /** Título de la colección, usado para el texto alternativo. */
  readonly tituloColeccion = input<string>('');

  /** Se emite con el nuevo índice al navegar. */
  readonly cambioIndice = output<number>();

  /** Se emite al cerrar el visor. */
  readonly cerrar = output<void>();

  readonly abierto = computed(() => this.indice() !== null);

  readonly fotoActual = computed<Foto | null>(() => {
    const i = this.indice();
    return i === null ? null : this.fotos()[i] ?? null;
  });

  /** Texto alternativo de la foto abierta. */
  readonly altActual = computed<string>(() => {
    const foto = this.fotoActual();
    if (!foto) {
      return '';
    }
    return altDeFoto(
      foto,
      this.tituloColeccion(),
      this.indice() ?? 0,
      this.fotos().length
    );
  });

  /** URL de la variante grande de la foto abierta. */
  readonly urlActual = computed<string>(() => {
    const foto = this.fotoActual();
    return foto ? this.galeria.urlAbsoluta(foto.medium) : '';
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