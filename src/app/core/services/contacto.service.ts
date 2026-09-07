import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import type { ContactoCompleto, ContactoDatos, ContactoImagen, RedSocial } from '../models/contacto.model';

type EstadoCarga = 'inicial' | 'cargando' | 'listo' | 'error';

/**
 * Medios de contacto del canal.
 *
 * Los mismos datos alimentan la página de Contacto y el pie del
 * sitio, que aparece en todas las páginas. Antes cada uno tenía su
 * propia copia del correo y el teléfono, y bastaba con corregir uno
 * para que quedaran contradiciéndose.
 */
@Injectable({ providedIn: 'root' })
export class ContactoService {
    private readonly http = inject(HttpClient);
    private readonly api = `${environment.apiUrl}/contacto`;

    private readonly _datos = signal<ContactoCompleto | null>(null);
    private readonly _estado = signal<EstadoCarga>('inicial');

    readonly estado = this._estado.asReadonly();
    readonly cargando = computed(() => this._estado() === 'cargando');
    readonly error = computed(() => this._estado() === 'error');

    /** True cuando ya hay contenido que pintar. */
    readonly listo = computed(() => this._datos() !== null);

    /* ===========================================
       Vistas del contenido
       =========================================== */

    readonly datos = computed<ContactoDatos | null>(() => this._datos()?.datos ?? null);

    /** Solo las visibles; el backend ya filtra las ocultas. */
    readonly redes = computed<RedSocial[]>(() => this._datos()?.redes ?? []);

    readonly imagenes = computed<ContactoImagen[]>(() => this._datos()?.imagenes ?? []);

    /* ===========================================
       Enlaces derivados
       Se calculan aquí y no en cada componente para
       que el pie y la página no los armen distinto.
       =========================================== */

    readonly enlaceCorreo = computed<string | null>(() => {
        const correo = this.datos()?.correo;
        return correo ? `mailto:${correo}` : null;
    });

    /**
     * El href="tel:" usa el campo de solo dígitos.
     * El número visible lleva paréntesis y espacios, que algunos
     * teléfonos no interpretan bien al marcar.
     */
    readonly enlaceTelefono = computed<string | null>(() => {
        const digitos = this.datos()?.telefonoEnlace;
        return digitos ? `tel:+${digitos}` : null;
    });

    /**
     * Carga los datos una sola vez y los conserva en memoria.
     *
     * El pie aparece en todas las páginas, así que este método se
     * llama constantemente al navegar; el estado evita que se
     * dispare más de una petición.
     */
    cargar(forzar = false): void {
        if (!forzar && (this._estado() === 'cargando' || this._estado() === 'listo')) {
            return;
        }

        this._estado.set('cargando');

        this.http.get<ContactoCompleto>(this.api).subscribe({
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
     * La API guarda '/uploads/contacto/medium/x.webp' y los archivos
     * los sirve el backend en el puerto 3000, no el sitio en el 4300.
     */
    urlImagen(ruta: string | null | undefined): string | null {
        if (!ruta) return null;
        if (ruta.startsWith('http')) return ruta;
        return `${environment.apiUrl}${ruta}`;
    }

    /** URL de la variante grande, la que se usa en el diseño. */
    urlMedium(imagen: ContactoImagen | undefined): string | null {
        return this.urlImagen(imagen?.urls?.medium);
    }

    /** Localiza una imagen por su slot. */
    imagenPorClave(clave: string): ContactoImagen | undefined {
        return this.imagenes().find((imagen) => imagen.clave === clave);
    }

    /**
     * Texto del enlace accesible de una red.
     * Usa el nombre alterno cuando la cuenta se llama distinto a la
     * plataforma; si no, el nombre de la plataforma.
     */
    etiquetaDe(red: RedSocial): string {
        return `${red.etiqueta ?? red.nombre} de TV Tecno`;
    }
}