import { Component, OnInit, computed, inject } from '@angular/core';
import { AcercaService } from '../../../../core/services/acerca.service';

/**
 * Encabezado de la página "Acerca de".
 *
 * El título se parte en dos para conservar el acento de color y el
 * espacio duro de "TV Tecno": la primera palabra queda en tono
 * normal y el resto toma el color de marca.
 */
@Component({
  selector: 'app-acerca-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements OnInit {
  private readonly acerca = inject(AcercaService);

  readonly contenido = this.acerca.contenido;
  readonly cargando = this.acerca.cargando;
  readonly error = this.acerca.error;

  /** Primera palabra del título, sin acento de color. */
  readonly tituloInicio = computed(() => {
    const titulo = this.contenido()?.heroTitulo ?? '';
    const corte = titulo.indexOf(' ');
    return corte === -1 ? titulo : titulo.slice(0, corte);
  });

  /**
   * Resto del título, que va acentuado.
   * Si el editor escribe una sola palabra, queda vacío y el
   * template no pinta el span.
   */
  readonly tituloAcento = computed(() => {
    const titulo = this.contenido()?.heroTitulo ?? '';
    const corte = titulo.indexOf(' ');
    return corte === -1 ? '' : titulo.slice(corte + 1);
  });

  ngOnInit(): void {
    this.acerca.cargar();
  }
}