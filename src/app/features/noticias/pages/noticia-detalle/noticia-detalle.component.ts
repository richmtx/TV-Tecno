import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, PLATFORM_ID, computed, inject, input, signal, } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriaNoticia, ETIQUETAS_CATEGORIA, Noticia, fechaLarga,
} from '../../../../core/models/noticia.model';
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

    // ---------- Compartir ----------

    /** URL absoluta de la noticia actual */
    private urlActual(): string {
        return this.esNavegador ? this.documento.location.href : '';
    }

    /** Texto que acompaña al enlace al compartir */
    private textoCompartir(): string {
        const n = this.noticia();
        return n ? `${n.titulo} — TV Tecno ITD` : 'TV Tecno ITD';
    }

    readonly urlFacebook = computed(() => {
        const url = encodeURIComponent(this.urlActual());
        return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    });

    readonly urlX = computed(() => {
        const url = encodeURIComponent(this.urlActual());
        const texto = encodeURIComponent(this.textoCompartir());
        return `https://twitter.com/intent/tweet?url=${url}&text=${texto}`;
    });

    readonly urlWhatsapp = computed(() => {
        const mensaje = encodeURIComponent(
            `${this.textoCompartir()} ${this.urlActual()}`
        );
        return `https://api.whatsapp.com/send?text=${mensaje}`;
    });

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