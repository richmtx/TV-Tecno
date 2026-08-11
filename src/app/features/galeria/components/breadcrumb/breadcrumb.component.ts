import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MigaPan } from '../../models/coleccion.model';

/**
 * Rastro de navegación: Galería › Línea del tiempo › 1951 - 1980.
 * El último eslabón no enlaza porque representa la página actual.
 */
@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
})
export class BreadcrumbComponent {

  /** Eslabones en orden, del más general al actual. */
  readonly items = input.required<MigaPan[]>();
}