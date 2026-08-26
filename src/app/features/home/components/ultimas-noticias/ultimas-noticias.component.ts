import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { Noticia, fechaLarga } from '../../../../core/models/noticia.model';
import { NoticiasService } from '../../../../core/services/noticias.service';

@Component({
  selector: 'app-ultimas-noticias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ultimas-noticias.component.html',
  styleUrl: './ultimas-noticias.component.css',
})
export class UltimasNoticiasComponent implements OnInit {
  private readonly noticiasService = inject(NoticiasService);
  private readonly router = inject(Router);

  readonly destacada = this.noticiasService.destacada;
  readonly secundarias = this.noticiasService.secundarias;
  readonly cargando = this.noticiasService.cargando;
  readonly error = this.noticiasService.error;

  ngOnInit(): void {
    this.noticiasService.cargar();
  }

  reintentar(): void {
    this.noticiasService.cargar(true);
  }

  /** URL absoluta de la imagen (el backend la sirve en otro puerto) */
  imagen(noticia: Noticia): string | null {
    return this.noticiasService.urlImagen(noticia.imagenUrl);
  }

  /** '2 junio 2026' */
  fechaDe(noticia: Noticia): string {
    return fechaLarga(noticia.fecha);
  }

  /** '5 min de lectura' — null cuando la noticia no tiene contenido */
  lecturaLarga(noticia: Noticia): string | null {
    return noticia.tiempoLectura ? `${noticia.tiempoLectura} min de lectura` : null;
  }

  /** '3 min' — null cuando la noticia no tiene contenido */
  lecturaCorta(noticia: Noticia): string | null {
    return noticia.tiempoLectura ? `${noticia.tiempoLectura} min` : null;
  }

  abrir(noticia: Noticia): void {
    this.router.navigate(['/noticias', noticia.slug]);
  }
}