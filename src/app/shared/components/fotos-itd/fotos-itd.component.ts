import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fotos-itd',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './fotos-itd.component.html',
  styleUrl: './fotos-itd.component.css'
})
export class FotosItdComponent {

  /** Título principal de la invitación. */
  @Input() titulo = '¿Tienes fotografías históricas del ITD?';

  /** Texto secundario debajo del título. */
  @Input() subtitulo = 'Escríbenos y ayúdanos a completar el archivo.';

  /** Texto del enlace. */
  @Input() textoBoton = 'Ir a contacto';

  /**
   * Destino del enlace.
   *
   * La invitación lleva al formulario de contacto en lugar de a un
   * envío directo: el material histórico llega en conversaciones,
   * no en archivos sueltos, y ahí sí hay alguien que responde.
   */
  @Input() ruta = '/contacto';
}