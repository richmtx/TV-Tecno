import { Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { GaleriaService } from '../../services/galeria.service';

/** Fundación del Instituto Tecnológico de Durango. */
const FUNDACION = { anio: 1948, mes: 8, dia: 2 };

@Component({
  selector: 'app-hero-galeria',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './hero-galeria.component.html',
  styleUrl: './hero-galeria.component.css',
})
export class HeroGaleriaComponent {
  private readonly galeria = inject(GaleriaService);

  /**
   * Total de fotografías publicadas.
   * Si la API falla, el bloque no muestra un número inventado:
   * se queda vacío hasta que responda.
   */
  readonly estadisticas = toSignal(
    this.galeria.getEstadisticas().pipe(catchError(() => of(null))),
    { initialValue: null },
  );

  readonly totalFotos = computed<string | null>(() => {
    const total = this.estadisticas()?.totalFotos;
    if (total === undefined) return null;
    return this.abreviar(total);
  });

  /**
   * Da formato al conteo de fotografías.
   *
   * Por debajo de diez mil se muestra la cifra exacta: "1,248"
   * dice más que "1.2k" y cabe sin problema. A partir de ahí se
   * abrevia para que el bloque no crezca de ancho, y el decimal
   * solo aparece cuando aporta información.
   */
  private abreviar(total: number): string {
    if (total < 10_000) {
      return total.toLocaleString('es-MX');
    }

    if (total < 1_000_000) {
      const miles = total / 1000;
      // Con tres cifras enteras el decimal ya no se lee.
      return miles >= 100
        ? `${Math.round(miles)}k`
        : `${this.sinCeroFinal(miles)}k`;
    }

    const millones = total / 1_000_000;
    return `${this.sinCeroFinal(millones)}M`;
  }

  /** Deja un decimal, pero omite el ".0" cuando es redondo. */
  private sinCeroFinal(valor: number): string {
    const conDecimal = valor.toFixed(1);
    return conDecimal.endsWith('.0') ? conDecimal.slice(0, -2) : conDecimal;
  }

  /**
   * Años cumplidos desde la fundación.
   * El aniversario cae el 2 de agosto, así que hasta esa fecha el
   * año en curso todavía no cuenta.
   */
  readonly aniosDeHistoria = computed<number>(() => {
    const hoy = new Date();
    let anios = hoy.getFullYear() - FUNDACION.anio;

    const mes = hoy.getMonth() + 1;
    const yaCumplio =
      mes > FUNDACION.mes ||
      (mes === FUNDACION.mes && hoy.getDate() >= FUNDACION.dia);

    if (!yaCumplio) anios--;

    return anios;
  });
}