import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CategoriaNoticia, ETIQUETAS_CATEGORIA, Noticia, fechaLarga,
} from '../../../../core/models/noticia.model';
import { NoticiasService } from '../../../../core/services/noticias.service';

@Component({
  selector: 'app-ultimas-noticias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ultimas-noticias.component.html',
  styleUrl: './ultimas-noticias.component.css',
})
export class UltimasNoticiasComponent {
  private readonly noticiasService = inject(NoticiasService);
  private readonly router = inject(Router);

  /** Noticia principal (tarjeta grande de la izquierda) */
  readonly destacada = this.noticiasService.destacada;

  /** Las otras 4 noticias (cuadrícula de la derecha) */
  readonly secundarias = this.noticiasService.secundarias;

  etiquetaDe(categoria: CategoriaNoticia): string {
    return ETIQUETAS_CATEGORIA[categoria] ?? 'Noticias';
  }

  /** '2 junio 2026' — para el pie de las tarjetas */
  fechaDe(noticia: Noticia): string {
    return fechaLarga(noticia.fechaPublicacion);
  }

  /** '5 min de lectura' — versión larga, tarjeta destacada */
  lecturaLarga(noticia: Noticia): string {
    return `${noticia.tiempoLectura} min de lectura`;
  }

  /** '3 min' — versión corta, tarjetas secundarias */
  lecturaCorta(noticia: Noticia): string {
    return `${noticia.tiempoLectura} min`;
  }

  /** Navega al detalle. Se usa desde el clic en toda la tarjeta. */
  abrir(noticia: Noticia): void {
    this.router.navigate(['/noticias', noticia.slug]);
  }
}