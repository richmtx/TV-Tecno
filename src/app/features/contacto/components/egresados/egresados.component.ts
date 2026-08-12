import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-egresados',
  standalone: true,
  imports: [],
  templateUrl: './egresados.component.html',
  styleUrl: './egresados.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EgresadosComponent {
  readonly enlaceSeguimiento = '#';
}