import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Ícono de una plataforma de redes sociales.
 *
 * Los SVG viven aquí y en ningún otro lado: antes estaban escritos
 * dos veces, en Contacto y en el pie, y agregar una plataforma
 * nueva al catálogo obligaba a acordarse de dibujarla en ambos.
 *
 * Las claves corresponden a la tabla `redes_catalogo` del backend.
 * Una clave sin dibujo no pinta nada, que es preferible a un
 * cuadro roto: el panel solo ofrece las que existen aquí.
 */
@Component({
    selector: 'app-icono-red',
    standalone: true,
    imports: [],
    templateUrl: './icono-red.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        // El host necesita una caja propia: con display:contents el
        // flex del enlace pierde su elemento a centrar y el ícono se
        // desprende de su círculo.
        style: 'display: inline-flex; align-items: center; justify-content: center;',
    },
})
export class IconoRedComponent {
    /** Clave de la plataforma: facebook, instagram, youtube… */
    readonly clave = input.required<string>();
}