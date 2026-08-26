import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, DestroyRef, PLATFORM_ID, computed, effect, inject, input, signal, } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { CategoriaNoticia, ETIQUETAS_CATEGORIA, Noticia, fechaLarga, } from '../../../../core/models/noticia.model';
import { NoticiasService } from '../../../../core/services/noticias.service';


@Component({
    selector: 'app-noticia-detalle',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './noticia-detalle.component.html',
    styleUrl: './noticia-detalle.component.css',
})
export class NoticiaDetalleComponent {
    private readonly noticiasService = inject(NoticiasService);
    private readonly documento = inject(DOCUMENT);
    private readonly titulo = inject(Title);
    private readonly meta = inject(Meta);
    private readonly esNavegador = isPlatformBrowser(inject(PLATFORM_ID));

    /** Llega desde la ruta /noticias/:slug */
    readonly slug = input.required<string>();

    /** La noticia solicitada, o undefined si el slug no existe */
    readonly noticia = computed<Noticia | undefined>(() =>
        this.noticiasService.obtenerPorSlug(this.slug())
    );

    /** Las otras 4 noticias, para el panel lateral */
    readonly otras = computed<Noticia[]>(() =>
        this.noticiasService.obtenerOtras(this.slug())
    );

    /** Se pone en true unos segundos tras copiar el enlace */
    readonly enlaceCopiado = signal(false);

    constructor() {
        // Actualiza título y meta tags cada vez que cambia la noticia
        effect(() => this.actualizarMetaTags(this.noticia()));

        // Al salir de la página, quita los meta tags para que no
        // contaminen las demás rutas del sitio
        inject(DestroyRef).onDestroy(() => this.limpiarMetaTags());
    }

    // ---------- Formato ----------

    etiquetaDe(categoria: CategoriaNoticia): string {
        return ETIQUETAS_CATEGORIA[categoria] ?? 'Noticias';
    }

    fechaDe(noticia: Noticia): string {
        return fechaLarga(noticia.fechaPublicacion);
    }

    lecturaDe(noticia: Noticia): string {
        return `${noticia.tiempoLectura} min de lectura`;
    }

    // ---------- SEO / Open Graph ----------

    /** Origen del sitio, ej. https://tvtecno.itdurango.edu.mx */
    private origen(): string {
        return this.esNavegador ? this.documento.location.origin : '';
    }

    /**
     * Convierte una ruta relativa de assets en URL absoluta.
     * Facebook y WhatsApp exigen URL absoluta en og:image;
     * con una ruta relativa no muestran la imagen.
     */
    private urlAbsoluta(ruta: string): string {
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
        if (!this.esNavegador) return;

        if (!noticia) {
            this.titulo.setTitle('Noticia no encontrada | TV Tecno ITD');
            return;
        }

        const url = this.urlActual();
        const imagen = this.urlAbsoluta(noticia.imagen);

        // El título de las demás rutas lo pone el router (propiedad `title`);
        // aquí lo sobrescribimos porque depende de la noticia cargada.
        this.titulo.setTitle(`${noticia.titulo} | TV Tecno ITD`);

        // Descripción estándar (Google, buscadores)
        this.meta.updateTag({ name: 'description', content: noticia.resumen });

        // Open Graph — Facebook, WhatsApp, LinkedIn
        this.meta.updateTag({ property: 'og:type', content: 'article' });
        this.meta.updateTag({ property: 'og:title', content: noticia.titulo });
        this.meta.updateTag({ property: 'og:description', content: noticia.resumen });
        this.meta.updateTag({ property: 'og:image', content: imagen });
        this.meta.updateTag({ property: 'og:image:alt', content: noticia.imagenAlt });
        this.meta.updateTag({ property: 'og:url', content: url });
        this.meta.updateTag({ property: 'og:site_name', content: 'TV Tecno ITD' });
        this.meta.updateTag({ property: 'og:locale', content: 'es_MX' });

        // Metadatos del artículo
        this.meta.updateTag({
            property: 'article:published_time',
            content: noticia.fechaPublicacion,
        });
        this.meta.updateTag({
            property: 'article:section',
            content: this.etiquetaDe(noticia.categoria),
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