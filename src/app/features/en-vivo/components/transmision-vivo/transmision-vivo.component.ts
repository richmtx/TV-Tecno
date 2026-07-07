import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface ProgramaActual {
  titulo: string;
  descripcion: string;
  categoria: string;
  horario: string;
}

interface ProgramaSiguiente {
  hora: string;
  titulo: string;
  medio: string;
}

@Component({
  selector: 'app-transmision-vivo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './transmision-vivo.component.html',
  styleUrl: './transmision-vivo.component.css',
})
export class TransmisionVivoComponent {
  /**
   * URL del stream (embed de YouTube Live o HLS reproducido en un iframe).
   * Mientras esté en null se muestra el placeholder con el botón de play.
   * Cuando definas la transmisión, pásala desde el page:
   *   <app-transmision-vivo streamUrl="https://www.youtube.com/embed/XXXX?autoplay=1" />
   */
  @Input() streamUrl: string | null = null;

  @Input() canal = 'XHITD 16.1 · Señal digital abierta';

  // TODO: reemplazar por datos del API (NestJS) cuando esté disponible.
  @Input() programaActual: ProgramaActual = {
    titulo: 'Noticiero Tecnológico',
    descripcion: 'Cobertura de eventos, becas y convocatorias vigentes.',
    categoria: 'Noticias',
    horario: '11:00 – 12:00',
  };

  @Input() siguientePrograma: ProgramaSiguiente = {
    hora: '13:00',
    titulo: 'Conexión Vinculación',
    medio: 'Por TV e Internet',
  };

  constructor(private sanitizer: DomSanitizer) { }

  /** El src de un iframe debe pasar por el sanitizer de Angular. */
  get streamSeguro(): SafeResourceUrl | null {
    return this.streamUrl
      ? this.sanitizer.bypassSecurityTrustResourceUrl(this.streamUrl)
      : null;
  }
}