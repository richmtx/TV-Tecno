import { Component } from '@angular/core';
import { TransmisionVivoComponent } from '../../components/transmision-vivo/transmision-vivo.component';
import { ParrillaHoyComponent } from '../../components/parrilla-hoy/parrilla-hoy.component';
import { RecordatoriosComponent } from '../../../../shared/components/recordatorios/recordatorios.component';

@Component({
  selector: 'app-en-vivo',
  standalone: true,
  imports: [TransmisionVivoComponent, ParrillaHoyComponent, RecordatoriosComponent],
  templateUrl: './en-vivo.component.html',
  styleUrl: './en-vivo.component.css',
})
export class EnVivoComponent {

  onActivarRecordatorios(): void {
    // TODO: pedir permiso de notificaciones / suscribir al usuario
    console.log('Activar recordatorios');
  }
}