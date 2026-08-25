import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { ProgramaDestacado } from '../models/programacion-destacada.model';

@Injectable({ providedIn: 'root' })
export class ProgramacionDestacadaService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/programacion-destacada`;

  /** Endpoint público, sin autenticación. Llega ordenado por `orden`. */
  listar(): Observable<ProgramaDestacado[]> {
    return this.http.get<ProgramaDestacado[]>(this.url);
  }

  /** La BD guarda rutas relativas (`/uploads/...`); el `img` necesita la absoluta. */
  urlAbsoluta(ruta: string | null): string | null {
    return ruta ? `${environment.apiUrl}${ruta}` : null;
  }
}