import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface ProgramaActual {
  titulo: string;
  descripcion: string;
  descripcionLarga: string;
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
  @Input() streamUrl: string | null = null;

  @Input() canal = 'XHITD 16.1 · Señal digital abierta';

  @Input() programaActual: ProgramaActual = {
    titulo: 'Noticiero Tecnológico',
    descripcion: 'Cobertura de eventos, becas y convocatorias vigentes.',
    descripcionLarga:
      'Las noticias más relevantes del Instituto Tecnológico de Durango y la comunidad tecnológica.',
    categoria: 'Noticias',
    horario: '11:00 – 12:00',
  };

  @Input() siguientePrograma: ProgramaSiguiente = {
    hora: '13:00',
    titulo: 'Conexión Vinculación',
    medio: 'Por TV e Internet',
  };

  constructor(private sanitizer: DomSanitizer) { }

  get streamSeguro(): SafeResourceUrl | null {
    return this.streamUrl
      ? this.sanitizer.bypassSecurityTrustResourceUrl(this.streamUrl)
      : null;
  }
}