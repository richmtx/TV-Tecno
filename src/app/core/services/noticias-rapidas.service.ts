import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { NoticiaRapida } from '../models/noticia-rapida.model';

@Injectable({ providedIn: 'root' })
export class NoticiasRapidasService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/noticias-rapidas`;

  /** Endpoint público, sin autenticación. Llega ordenado por `orden`. */
  listar(): Observable<NoticiaRapida[]> {
    return this.http.get<NoticiaRapida[]>(this.url);
  }
}