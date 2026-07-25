import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Programa, ICONOS_CATEGORIA } from '../../models/programa.model';

@Component({
    selector: 'app-en-vivo-ahora',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './en-vivo-ahora.component.html',
    styleUrl: './en-vivo-ahora.component.css'
})
export class EnVivoAhoraComponent {
    @Input() programa: Programa | undefined;

    iconosCategoria = ICONOS_CATEGORIA;
}