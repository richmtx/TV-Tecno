import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { NoticiasRapidasService } from '../../../../core/services/noticias-rapidas.service';

@Component({
  selector: 'app-noticias-ticker',
  standalone: true,
  imports: [],
  templateUrl: './noticias-ticker.component.html',
  styleUrl: './noticias-ticker.component.css',
})
export class NoticiasTickerComponent implements OnInit {
  private readonly service = inject(NoticiasRapidasService);

  readonly noticias = signal<string[]>([]);

  /** ~5 segundos de recorrido por noticia, para que la velocidad
   *  se sienta igual con 3 que con 8. */
  readonly duracion = computed(() => `${Math.max(this.noticias().length, 1) * 5}s`);

  ngOnInit(): void {
    this.service.listar().subscribe({
      next: (data) => this.noticias.set(data.map((n) => n.texto)),
      // Si la API no responde, el ticker no se dibuja: mejor eso que
      // una barra vacía con la animación corriendo.
      error: () => this.noticias.set([]),
    });
  }
}