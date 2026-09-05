import { Component, OnInit, computed, inject } from '@angular/core';
import { AcercaService } from '../../../../core/services/acerca.service';
import type { AcercaImagen } from '../../../../core/models/acerca.model';

interface CoberturaImagen {
  src: string | null;
  alt: string;
  etiqueta: string;
  modificador: string;
}

interface CanalDistribucion {
  texto: string;
  icono: string;
}

interface DatoDuro {
  valor: string;
  label: string;
}

/** Las dos figuras desfasadas del bloque, en su orden de diseño. */
const HUECOS: { clave: string; modificador: string }[] = [
  { clave: 'cobertura_torre', modificador: 'cobertura__figura--principal' },
  { clave: 'cobertura_cabina', modificador: 'cobertura__figura--secundaria' },
];

/** Íconos del diseño, en el orden en que llegan los canales. */
const ICONOS = ['broadcast', 'tv', 'video'];

@Component({
  selector: 'app-acerca-cobertura',
  standalone: true,
  templateUrl: './cobertura.component.html',
  styleUrl: './cobertura.component.css',
})
export class CoberturaComponent implements OnInit {
  private readonly acerca = inject(AcercaService);

  readonly contenido = this.acerca.contenido;
  readonly listo = this.acerca.listo;

  readonly huecos = HUECOS;

  readonly imagenes = computed<CoberturaImagen[]>(() => {
    const lista = this.acerca.imagenesCobertura();
    if (lista.length === 0) return [];

    return HUECOS.map((hueco) => {
      const imagen: AcercaImagen | undefined = this.acerca.imagenPorClave(lista, hueco.clave);
      return {
        src: this.acerca.urlMedium(imagen),
        alt: imagen?.alt ?? '',
        etiqueta: imagen?.etiqueta ?? '',
        modificador: hueco.modificador,
      };
    });
  });

  /**
   * Los tres medios de transmisión.
   *
   * El texto es administrable; el ícono viene del campo `icono` que
   * guarda la base, con el orden del diseño como respaldo por si el
   * editor lo dejara vacío.
   */
  readonly canales = computed<CanalDistribucion[]>(() =>
    this.acerca.canales().map((canal, i) => ({
      texto: canal.titulo,
      icono: canal.icono ?? ICONOS[i] ?? 'broadcast',
    })),
  );

  readonly datos = computed<DatoDuro[]>(() =>
    this.acerca.stats().map((stat) => ({
      valor: stat.titulo,
      label: stat.subtitulo ?? '',
    })),
  );

  ngOnInit(): void {
    this.acerca.cargar();
  }
}