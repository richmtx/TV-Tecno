import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ComunicacionComponent } from '../../components/comunicacion/comunicacion.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [HeroComponent, ComunicacionComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent {}