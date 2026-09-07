import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { ContactoService } from '../../../../core/services/contacto.service';

/** Slot de la imagen del banner. */
const CLAVE_IMAGEN = 'egresados';

@Component({
  selector: 'app-egresados',
  standalone: true,
  imports: [],
  templateUrl: './egresados.component.html',
  styleUrl: './egresados.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EgresadosComponent implements OnInit {
  private readonly contacto = inject(ContactoService);

  readonly listo = this.contacto.listo;

  readonly enlaceSeguimiento = computed(() => this.contacto.datos()?.egresadosUrl ?? null);

  readonly imagen = computed(() => this.contacto.imagenPorClave(CLAVE_IMAGEN));

  readonly urlImagen = computed(() => this.contacto.urlMedium(this.imagen()));

  readonly altImagen = computed(() => this.imagen()?.alt ?? '');

  ngOnInit(): void {
    this.contacto.cargar();
  }
}