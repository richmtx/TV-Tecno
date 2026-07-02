import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { MisionVisionComponent } from '../../components/mision-vision/mision-vision.component';
import { NumerosComponent } from '../../components/numeros/numeros.component';
import { CoberturaComponent } from '../../components/cobertura/cobertura.component';
import { ValoresComponent } from '../../components/valores/valores.component';
import { EquipoComponent } from '../../components/equipo/equipo.component';
import { CtaComponent } from '../../components/cta/cta.component';

@Component({
  selector: 'app-acerca',
  standalone: true,
  imports: [
    HeroComponent,
    MisionVisionComponent,
    NumerosComponent,
    CoberturaComponent,
    ValoresComponent,
    EquipoComponent,
    CtaComponent,
  ],
  templateUrl: './acerca.component.html',
  styleUrl: './acerca.component.css',
})
export class AcercaComponent {}