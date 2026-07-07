import { Component } from '@angular/core';
import { TransmisionVivoComponent } from '../../components/transmision-vivo/transmision-vivo.component';
import { ParrillaHoyComponent } from '../../components/parrilla-hoy/parrilla-hoy.component';

@Component({
  selector: 'app-en-vivo',
  standalone: true,
  imports: [TransmisionVivoComponent, ParrillaHoyComponent],
  templateUrl: './en-vivo.component.html',
  styleUrl: './en-vivo.component.css',
})
export class EnVivoComponent {}