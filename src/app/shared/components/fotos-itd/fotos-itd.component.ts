import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-fotos-itd',
  standalone: true,
  templateUrl: './fotos-itd.component.html',
  styleUrl: './fotos-itd.component.css'
})
export class FotosItdComponent {

  /** Título principal del CTA. */
  @Input() titulo = '¿Tienes fotos históricas del ITD?';

  /** Texto secundario debajo del título. */
  @Input() subtitulo = 'Comparte tus recuerdos y sé parte de nuestra historia.';

  /** Texto del botón. */
  @Input() textoBoton = 'Enviar mis fotos';

  /** Se emite al hacer clic en el botón; cada página decide qué hacer. */
  @Output() enviar = new EventEmitter<void>();

  onEnviar(): void {
    this.enviar.emit();
  }
}