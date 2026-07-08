import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface EnlaceNav {
  texto: string;
  ruta: string;
}

interface RedSocial {
  nombre: string;
  url: string;
  icono: 'facebook' | 'instagram' | 'youtube';
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  anioActual = new Date().getFullYear();

  navegacion: EnlaceNav[] = [
    { texto: 'Inicio', ruta: '/' },
    { texto: 'Programación', ruta: '/programacion' },
    { texto: 'Videoteca', ruta: '/videoteca' },
    { texto: 'Acerca de', ruta: '/acerca' },
    { texto: 'En vivo', ruta: '/en-vivo' },
  ];

  // Enlaces institucionales (pendientes: apuntan a '#' hasta que existan las páginas)
  institucional: EnlaceNav[] = [
    { texto: 'Transparencia', ruta: '#' },
    { texto: 'Marco normativo', ruta: '#' },
    { texto: 'Aviso de privacidad', ruta: '#' },
    { texto: 'Sitio del ITD', ruta: '#' },
  ];

  // Datos de contacto (PLACEHOLDER: reemplazar por los reales)
  contacto = {
    correo: 'correo@tvtecno.mx',
    telefono: '(618) 000 0000',
    direccion: 'Blvd. Felipe Pescador, Durango, Dgo.',
  };

  // Redes sociales (PLACEHOLDER: reemplazar las URLs por las reales)
  redes: RedSocial[] = [
    { nombre: 'Facebook', url: '#', icono: 'facebook' },
    { nombre: 'Instagram', url: '#', icono: 'instagram' },
    { nombre: 'YouTube', url: '#', icono: 'youtube' },
  ];

  scrollArriba(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}