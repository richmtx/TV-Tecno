import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Noticia } from '../models/noticia.model';

type EstadoCarga = 'inicial' | 'cargando' | 'listo' | 'error';

@Injectable({ providedIn: 'root' })
export class NoticiasService {
    private readonly http = inject(HttpClient);
    private readonly api = `${environment.apiUrl}/noticias`;

    private readonly _noticias = signal<Noticia[]>([]);
    private readonly _estado = signal<EstadoCarga>('inicial');

    /** Las 5 noticias, en el orden que define el panel admin */
    readonly noticias = this._noticias.asReadonly();
    readonly estado = this._estado.asReadonly();

    readonly cargando = computed(() => this._estado() === 'cargando');
    readonly error = computed(() => this._estado() === 'error');

    /** La noticia del panel grande (orden = 1) */
    readonly destacada = computed(() => this._noticias()[0]);

    /** Las 4 restantes (cuadrícula de la derecha) */
    readonly secundarias = computed(() => this._noticias().slice(1));

    /**
     * Carga las noticias una sola vez y las conserva en memoria.
     * Son 5 registros fijos, así que no tiene sentido repetir la petición
     * al navegar entre el home y el detalle.
     */
    cargar(forzar = false): void {
        if (!forzar && (this._estado() === 'cargando' || this._estado() === 'listo')) {
            return;
        }

        this._estado.set('cargando');

        this.http.get<Noticia[]>(this.api).subscribe({
            next: (data) => {
                this._noticias.set(data);
                this._estado.set('listo');
            },
            error: () => {
                this._estado.set('error');
            },
        });
    }

    /** Busca una noticia ya cargada por su slug */
    obtenerPorSlug(slug: string): Noticia | undefined {
        return this._noticias().find((n) => n.slug === slug);
    }

    /** Las otras noticias, para el panel lateral del detalle */
    obtenerOtras(slugActual: string): Noticia[] {
        return this._noticias().filter((n) => n.slug !== slugActual);
    }

    /**
     * Convierte la ruta relativa del backend en URL absoluta.
     * La BD guarda '/uploads/noticias/x.jpg' y los archivos los sirve
     * el API en el puerto 3000, no el sitio en el 4300.
     */
    urlImagen(imagenUrl: string | null): string | null {
        if (!imagenUrl) return null;
        if (imagenUrl.startsWith('http')) return imagenUrl;
        return `${environment.apiUrl}${imagenUrl}`;
    }
}