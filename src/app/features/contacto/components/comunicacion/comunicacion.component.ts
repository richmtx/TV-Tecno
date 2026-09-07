import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ContactoService } from '../../../../core/services/contacto.service';
import type { RedSocial } from '../../../../core/models/contacto.model';
import { IconoRedComponent } from '../../../../shared/components/icono-red/icono-red.component';

@Component({
  selector: 'app-comunicacion',
  standalone: true,
  imports: [IconoRedComponent],
  templateUrl: './comunicacion.component.html',
  styleUrl: './comunicacion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComunicacionComponent implements OnInit {
  private readonly contacto = inject(ContactoService);

  readonly datos = this.contacto.datos;
  readonly redes = this.contacto.redes;
  readonly listo = this.contacto.listo;

  readonly enlaceCorreo = this.contacto.enlaceCorreo;
  readonly enlaceTelefono = this.contacto.enlaceTelefono;

  ngOnInit(): void {
    this.contacto.cargar();
  }

  /** Texto del aria-label de cada red. */
  etiquetaDe(red: RedSocial): string {
    return this.contacto.etiquetaDe(red);
  }
}