import { Component, OnInit, computed, inject } from '@angular/core';
import { AcercaService } from '../../../../core/services/acerca.service';
import type { AcercaImagen } from '../../../../core/models/acerca.model';

/** Un hueco del collage, ya resuelto para el template. */
interface MosaicoItem {
  src: string | null;
  alt: string;
  etiqueta: string;
  modificador: string;
}

/**
 * Orden y forma de los cuatro huecos del collage.
 *
 * El acomodo es parte del diseño y no se administra: la clave dice
 * qué imagen va en cada hueco, y el modificador define su posición
 * en la rejilla. La foto se adapta al hueco, nunca al revés.
 */
const HUECOS: { clave: string; modificador: string }[] = [
  { clave: 'hero_casa', modificador: 'mosaico__item--alta' },
  { clave: 'hero_noticiero', modificador: 'mosaico__item--ancha' },
  { clave: 'hero_entrevistas', modificador: 'mosaico__item--cuadrada' },
  { clave: 'hero_foro', modificador: 'mosaico__item--desfasada' },
];

@Component({
  selector: 'app-mosaico',
  standalone: true,
  templateUrl: './mosaico.component.html',
  styleUrl: './mosaico.component.css',
})
export class MosaicoComponent implements OnInit {
  private readonly acerca = inject(AcercaService);

  readonly listo = this.acerca.listo;

  /** Los huecos vacíos, para pintar el esqueleto con la misma forma. */
  readonly huecos = HUECOS;

  readonly items = computed<MosaicoItem[]>(() => {
    const imagenes = this.acerca.imagenesHero();
    if (imagenes.length === 0) return [];

    // Se recorre el diseño, no la respuesta: si el backend
    // devolviera un slot de más, no aparecería en la página.
    return HUECOS.map((hueco) => {
      const imagen: AcercaImagen | undefined = this.acerca.imagenPorClave(imagenes, hueco.clave);
      return {
        src: this.acerca.urlMedium(imagen),
        alt: imagen?.alt ?? '',
        etiqueta: imagen?.etiqueta ?? '',
        modificador: hueco.modificador,
      };
    });
  });

  ngOnInit(): void {
    this.acerca.cargar();
  }
}