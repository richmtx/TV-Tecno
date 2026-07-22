import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroGaleriaComponent } from "../../components/hero-galeria/hero-galeria.component";

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule, HeroGaleriaComponent],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css',
})
export class GaleriaComponent {}