import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ComunicacionComponent } from '../../components/comunicacion/comunicacion.component';
import { DepartamentosComponent } from '../../components/departamentos/departamentos.component';
import { EgresadosComponent } from "../../components/egresados/egresados.component";

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [HeroComponent, ComunicacionComponent, DepartamentosComponent, EgresadosComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent { }