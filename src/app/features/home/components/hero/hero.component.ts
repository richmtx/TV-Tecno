import { Component, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private intervaloId?: ReturnType<typeof setInterval>;

  /** Tiempo entre cada cambio de imagen (ms) */
  private readonly intervalo = 5000;

  /**
   * Rutas de las imágenes del carrusel.
   * Angular 17+: colócalas en /public/images/hero/
   * Angular 16 o menor: usa 'assets/images/hero/...'
   */
  readonly imagenes: string[] = [
    '/assets/desarrollo/BalletF.png',
    '/assets/desarrollo/ConexVin.png',
    '/assets/desarrollo/Robotica.png',
    '/assets/desarrollo/Futbol.png',
    '/assets/desarrollo/Congreso.png'
  ];

  /** Índice de la imagen visible */
  readonly indiceActual = signal(0);

  ngOnInit(): void {
    // Solo en navegador (evita problemas si algún día usas SSR)
    if (!isPlatformBrowser(this.platformId)) return;

    // Respeta a usuarios que desactivan animaciones en su sistema
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.intervaloId = setInterval(() => {
      this.indiceActual.update(i => (i + 1) % this.imagenes.length);
    }, this.intervalo);
  }

  ngOnDestroy(): void {
    if (this.intervaloId) clearInterval(this.intervaloId);
  }
}