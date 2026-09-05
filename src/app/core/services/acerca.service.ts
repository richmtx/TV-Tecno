import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import type { AcercaCompleto, AcercaContenido, AcercaImagen, AcercaItem } from '../models/acerca.model';

type EstadoCarga = 'inicial' | 'cargando' | 'listo' | 'error';

@Injectable({ providedIn: 'root' })
export class AcercaService {
    private readonly http = inject(HttpClient);
    private readonly api = `${environment.apiUrl}/acerca`;

    private readonly _datos = signal<AcercaCompleto | null>(null);
    private readonly _estado = signal<EstadoCarga>('inicial');

    readonly estado = this._estado.asReadonly();
    readonly cargando = computed(() => this._estado() === 'cargando');
    readonly error = computed(() => this._estado() === 'error');

    /** True cuando ya hay contenido que pintar. */
    readonly listo = computed(() => this._datos() !== null);

    /* ===========================================
       Vistas del contenido
       Cada componente de la página toma solo lo suyo,
       así ninguno depende de la forma completa.
       =========================================== */

    readonly contenido = computed<AcercaContenido | null>(() => this._datos()?.contenido ?? null);

    readonly valores = computed<AcercaItem[]>(() => this._datos()?.valores ?? []);
    readonly canales = computed<AcercaItem[]>(() => this._datos()?.cobertura ?? []);
    readonly stats = computed<AcercaItem[]>(() => this._datos()?.stats ?? []);

    readonly imagenesHero = computed<AcercaImagen[]>(() => this._datos()?.imagenes?.hero ?? []);
    readonly imagenesCobertura = computed<AcercaImagen[]>(() => this._datos()?.imagenes?.cobertura ?? []);

    /**
     * Carga la página completa una sola vez y la conserva en memoria.
     *
     * Los cinco componentes de "Acerca de" llaman a este método en su
     * ngOnInit; el estado evita que se dispare más de una petición.
     */
    cargar(forzar = false): void {
        if (!forzar && (this._estado() === 'cargando' || this._estado() === 'listo')) {
            return;
        }

        this._estado.set('cargando');

        this.http.get<AcercaCompleto>(this.api).subscribe({
            next: (data) => {
                this._datos.set(data);
                this._estado.set('listo');
            },
            error: () => {
                this._estado.set('error');
            },
        });
    }

    /* ===========================================
       Utilidades
       =========================================== */

    /**
     * Convierte la ruta relativa del backend en URL absoluta.
     * La API guarda '/uploads/acerca/medium/x.webp' y los archivos
     * los sirve el backend en el puerto 3000, no el sitio en el 4300.
     */
    urlImagen(ruta: string | null | undefined): string | null {
        if (!ruta) return null;
        if (ruta.startsWith('http')) return ruta;
        return `${environment.apiUrl}${ruta}`;
    }

    /** URL de la variante grande, la que se usa en el diseño. */
    urlMedium(imagen: AcercaImagen | undefined): string | null {
        return this.urlImagen(imagen?.urls?.medium);
    }

    /** Localiza una imagen por su slot dentro de una lista. */
    imagenPorClave(lista: AcercaImagen[], clave: string): AcercaImagen | undefined {
        return lista.find((imagen) => imagen.clave === clave);
    }

    /** Localiza un item por su clave dentro de una lista. */
    itemPorClave(lista: AcercaItem[], clave: string): AcercaItem | undefined {
        return lista.find((item) => item.clave === clave);
    }
}