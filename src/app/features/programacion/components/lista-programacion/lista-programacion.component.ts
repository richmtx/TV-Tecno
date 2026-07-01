import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Programa, ICONOS_CATEGORIA } from '../../models/programa.model';

@Component({
    selector: 'app-lista-programacion',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './lista-programacion.component.html',
    styleUrl: './lista-programacion.component.css'
})
export class ListaProgramacionComponent {
    @Input() programas: Programa[] = [];
    @Input() nombreDia = '';

    iconosCategoria = ICONOS_CATEGORIA;

    get total(): number {
        return this.programas.length;
    }
}