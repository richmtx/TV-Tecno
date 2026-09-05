import { Component, OnInit, computed, inject } from '@angular/core';
import { AcercaService } from '../../../../core/services/acerca.service';

/** Un bloque de la rejilla, ya resuelto para el template. */
interface Bloque {
  eyebrow: string;
  titulo: string;
  texto: string;
  icono: 'broadcast' | 'telescope';
  variante: 'wine' | 'gold';
}

/**
 * Misión, visión y valores.
 *
 * Los dos bloques se arman desde el contenido administrable, pero
 * su ícono y su variante de color son parte del diseño y no se
 * editan: la misión siempre lleva el ícono de señal en vino, la
 * visión el de telescopio en dorado.
 */
@Component({
  selector: 'app-acerca-mision-vision',
  standalone: true,
  templateUrl: './mision-vision.component.html',
  styleUrl: './mision-vision.component.css',
})
export class MisionVisionComponent implements OnInit {
  private readonly acerca = inject(AcercaService);

  readonly contenido = this.acerca.contenido;
  readonly valores = this.acerca.valores;

  readonly bloques = computed<Bloque[]>(() => {
    const datos = this.contenido();
    if (!datos) return [];

    return [
      {
        eyebrow: 'Misión',
        titulo: datos.misionTitulo,
        texto: datos.misionTexto,
        icono: 'broadcast',
        variante: 'wine',
      },
      {
        eyebrow: 'Visión',
        titulo: datos.visionTitulo,
        texto: datos.visionTexto,
        icono: 'telescope',
        variante: 'gold',
      },
    ];
  });

  ngOnInit(): void {
    this.acerca.cargar();
  }
}