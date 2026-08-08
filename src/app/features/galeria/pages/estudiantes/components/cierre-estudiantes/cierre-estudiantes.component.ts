import { Component, input, output } from '@angular/core';
import { Testimonio } from '../../../../models/momento.model';

/**
 * Cierre de la sección Estudiantes: testimonio a la izquierda
 * y llamada al portal estudiantil a la derecha.
 */
@Component({
  selector: 'app-cierre-estudiantes',
  standalone: true,
  imports: [],
  templateUrl: './cierre-estudiantes.component.html',
  styleUrl: './cierre-estudiantes.component.css',
})
export class CierreEstudiantesComponent {

  /** Testimonio a mostrar. */
  readonly testimonio = input.required<Testimonio>();

  /** Título del bloque de llamada a la acción. */
  readonly ctaTitulo = input<string>('¿Eres estudiante del ITD?');

  /** Texto descriptivo del bloque de llamada a la acción. */
  readonly ctaTexto = input<string>(
    'Accede a recursos, convocatorias y plataformas para tu desarrollo académico y profesional.'
  );

  /** Etiqueta del botón. */
  readonly ctaBoton = input<string>('Ir al portal estudiantil');

  /** Imagen de fondo del bloque de llamada a la acción. */
  readonly ctaImagen = input<string>('assets/galeria/estudiantes/portal-estudiantil.jpg');

  /** Degradado de respaldo del bloque de llamada a la acción. */
  readonly ctaFallback = input<string>('linear-gradient(135deg, #341830, #5c2c56)');

  /** Se emite al pulsar el botón del portal. */
  readonly irAlPortal = output<void>();

  onPortal(): void {
    this.irAlPortal.emit();
  }

  /** Oculta la imagen si el archivo no existe, dejando ver el degradado. */
  onImgError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}