import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, PLATFORM_ID, computed, effect, inject, input,
    signal, } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { Noticia, fechaLarga } from '../../../../core/models/noticia.model';
import { NoticiasService } from '../../../../core/services/noticias.service';

@Component({
    selector: 'app-noticia-detalle',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './noticia-detalle.component.html',
    styleUrl: './noticia-detalle.component.css',
})
export class NoticiaDetalleComponent implements OnInit {
    private readonly noticiasService = inject(NoticiasService);
    private readonly documento = inject(DOCUMENT);
    private readonly titulo = inject(Title);
    private readonly meta = inject(Meta);
    private readonly esNavegador = isPlatformBrowser(inject(PLATFORM_ID));

    /** Llega desde la ruta /noticias/:slug */
    readonly slug = input.required<string>();

    readonly cargando = this.noticiasService.cargando;
    readonly error = this.noticiasService.error;

    /** La noticia solicitada, o undefined si el slug no existe */
    readonly noticia = computed<Noticia | undefined>(() =>
        this.noticiasService.obtenerPorSlug(this.slug())
    );

    /** Las otras noticias, para el panel lateral */
    readonly otras = computed<Noticia[]>(() =>
        this.noticiasService.obtenerOtras(this.slug())
    );

    /**
     * Solo se considera "no encontrada" cuando la carga ya terminó.
     * Mientras las noticias viajan por la red, noticia() es undefined
     * y mostrar el mensaje de error sería incorrecto.
     */
    readonly noEncontrada = computed(
        () => this.noticiasService.estado() === 'listo' && !this.noticia()
    );

    /** Se pone en true unos segundos tras copiar el enlace */
    readonly enlaceCopiado = signal(false);

    constructor() {
        effect(() => this.actualizarMetaTags(this.noticia()));
        inject(DestroyRef).onDestroy(() => this.limpiarMetaTags());
    }

    ngOnInit(): void {
        // Si se entra directo por URL, las noticias aún no están cargadas.
        this.noticiasService.cargar();
    }

    reintentar(): void {
        this.noticiasService.cargar(true);
    }

    // ---------- Formato ----------

    /** URL absoluta de la imagen (el backend la sirve en otro puerto) */
    imagen(noticia: Noticia): string | null {
        return this.noticiasService.urlImagen(noticia.imagenUrl);
    }

    fechaDe(noticia: Noticia): string {
        return fechaLarga(noticia.fecha);
    }

    /** '5 min de lectura' — null cuando la noticia no tiene contenido */
    lecturaDe(noticia: Noticia): string | null {
        return noticia.tiempoLectura ? `${noticia.tiempoLectura} min de lectura` : null;
    }

    // ---------- SEO / Open Graph ----------

    private origen(): string {
        return this.esNavegador ? this.documento.location.origin : '';
    }

    /**
     * Facebook y WhatsApp exigen URL absoluta en og:image;
     * con una ruta relativa no muestran la imagen.
     */
    private urlAbsoluta(ruta: string | null): string {
        if (!ruta) return '';
        if (ruta.startsWith('http')) return ruta;
        return `${this.origen()}/${ruta.replace(/^\//, '')}`;
    }

    /** Etiquetas que este componente administra */
    private readonly META_PROPIEDADES = [
        'og:type',
        'og:title',
        'og:description',
        'og:image',
        'og:image:alt',
        'og:url',
        'og:site_name',
        'og:locale',
        'article:published_time',
        'article:section',
    ];

    private actualizarMetaTags(noticia: Noticia | undefined): void {
        if (!this.esNavegador || !noticia) return;

        const url = this.urlActual();
        const imagen = this.urlAbsoluta(this.imagen(noticia));

        // El título de las demás rutas lo pone el router (propiedad `title`);
        // aquí lo sobrescribimos porque depende de la noticia cargada.
        this.titulo.setTitle(`${noticia.titulo} | TV Tecno ITD`);

        // Descripción estándar (Google, buscadores)
        this.meta.updateTag({ name: 'description', content: noticia.descripcion });

        // Open Graph — Facebook, WhatsApp, LinkedIn
        this.meta.updateTag({ property: 'og:type', content: 'article' });
        this.meta.updateTag({ property: 'og:title', content: noticia.titulo });
        this.meta.updateTag({ property: 'og:description', content: noticia.descripcion });
        this.meta.updateTag({ property: 'og:image', content: imagen });
        this.meta.updateTag({
            property: 'og:image:alt',
            content: noticia.imagenAlt ?? noticia.titulo,
        });
        this.meta.updateTag({ property: 'og:url', content: url });
        this.meta.updateTag({ property: 'og:site_name', content: 'TV Tecno ITD' });
        this.meta.updateTag({ property: 'og:locale', content: 'es_MX' });

        // Metadatos del artículo
        this.meta.updateTag({
            property: 'article:published_time',
            content: noticia.fecha,
        });
        this.meta.updateTag({
            property: 'article:section',
            content: noticia.etiqueta,
        });
    }

    /** Quita los meta tags al abandonar la página de detalle */
    private limpiarMetaTags(): void {
        if (!this.esNavegador) return;

        this.meta.removeTag("name='description'");
        for (const propiedad of this.META_PROPIEDADES) {
            this.meta.removeTag(`property='${propiedad}'`);
        }
    }

    // ---------- Compartir ----------

    /** URL absoluta de la noticia actual */
    private urlActual(): string {
        return this.esNavegador ? this.documento.location.href : '';
    }

    /** Copia la URL al portapapeles y muestra confirmación por 2.5 s */
    async copiarEnlace(): Promise<void> {
        if (!this.esNavegador) return;

        try {
            await navigator.clipboard.writeText(this.urlActual());
            this.enlaceCopiado.set(true);
            setTimeout(() => this.enlaceCopiado.set(false), 2500);
        } catch {
            // El portapapeles requiere HTTPS o localhost. Si falla, no hacemos nada:
            // el usuario siempre puede copiar desde la barra de direcciones.
        }
    }
}