import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Programa, ICONOS_CATEGORIA } from '../../models/programa.model';
import { EnVivoAhoraComponent } from '../en-vivo-ahora/en-vivo-ahora.component';

@Component({
    selector: 'app-lista-programacion',
    standalone: true,
    imports: [CommonModule, EnVivoAhoraComponent],
    templateUrl: './lista-programacion.component.html',
    styleUrl: './lista-programacion.component.css'
})
export class ListaProgramacionComponent {
    @Input() programas: Programa[] = [];
    @Input() nombreDia = '';
    @Input() programaEnVivo?: Programa;

    iconosCategoria = ICONOS_CATEGORIA;

    get total(): number {
        return this.programas.length;
    }
}