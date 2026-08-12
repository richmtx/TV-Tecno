import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ComunicacionComponent } from '../../components/comunicacion/comunicacion.component';
import { DepartamentosComponent } from '../../components/departamentos/departamentos.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [HeroComponent, ComunicacionComponent, DepartamentosComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent { }