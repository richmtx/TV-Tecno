import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactoService } from '../../../core/services/contacto.service';
import type { RedSocial } from '../../../core/models/contacto.model';
import { IconoRedComponent } from '../icono-red/icono-red.component';

interface EnlaceNav {
  texto: string;
  ruta: string;
  externo?: boolean;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, IconoRedComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  private readonly contacto = inject(ContactoService);

  anioActual = new Date().getFullYear();

  /**
   * Los datos de contacto y las redes vienen del panel: son los
   * mismos que muestra la página de Contacto, para que corregir el
   * correo en un lugar no deje al otro contradiciéndolo.
   */
  readonly datos = this.contacto.datos;
  readonly redes = this.contacto.redes;
  readonly listo = this.contacto.listo;

  /** La versión abreviada cabe mejor en la columna del pie. */
  readonly direccion = computed(() => this.datos()?.direccionCorta ?? '');

  navegacion: EnlaceNav[] = [
    { texto: 'Inicio', ruta: '/' },
    { texto: 'Programación', ruta: '/programacion' },
    { texto: 'Videoteca', ruta: '/videoteca' },
    { texto: 'Galería', ruta: '/galeria' },
    { texto: 'Acerca de', ruta: '/acerca' },
    { texto: 'Contacto', ruta: '/contacto' },
    { texto: 'En vivo', ruta: '/en-vivo' },
  ];

  // Enlaces institucionales (pendientes: apuntan a '#' hasta que existan las páginas)
  institucional: EnlaceNav[] = [
    { texto: 'Transparencia', ruta: '#' },
    { texto: 'Marco normativo', ruta: '#' },
    { texto: 'Aviso de privacidad', ruta: '#' },
    { texto: 'Sitio del ITD', ruta: 'https://www.itdurango.edu.mx/', externo: true },
  ];

  ngOnInit(): void {
    this.contacto.cargar();
  }

  /** Texto del aria-label de cada red. */
  etiquetaDe(red: RedSocial): string {
    return this.contacto.etiquetaDe(red);
  }

  scrollArriba(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}