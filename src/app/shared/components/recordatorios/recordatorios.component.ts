import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-recordatorios',
  standalone: true,
  templateUrl: './recordatorios.component.html',
  styleUrl: './recordatorios.component.css',
})
export class RecordatoriosComponent {

  /** Título principal. */
  @Input() titulo = '¡No te pierdas nada!';

  /** Texto secundario debajo del título. */
  @Input() subtitulo = 'Activa recordatorios y entérate cuando inicien tus programas favoritos.';

  /** Texto del botón. */
  @Input() textoBoton = 'Activar recordatorios';

  /** Se emite al hacer clic en el botón; cada página decide qué hacer. */
  @Output() activar = new EventEmitter<void>();

  onActivar(): void {
    this.activar.emit();
  }
}