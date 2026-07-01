import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaSemana } from '../../models/programa.model';

@Component({
    selector: 'app-selector-dias',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './selector-dias.component.html',
    styleUrl: './selector-dias.component.css'
})
export class SelectorDiasComponent {
    @Input() dias: DiaSemana[] = [];
    @Input() diaSeleccionado = 0;
    @Input() diaHoy = 0;

    @Output() diaSeleccionadoChange = new EventEmitter<number>();

    seleccionar(index: number): void {
        this.diaSeleccionadoChange.emit(index);
    }

    esDiaActual(index: number): boolean {
        return index === this.diaHoy;
    }
}