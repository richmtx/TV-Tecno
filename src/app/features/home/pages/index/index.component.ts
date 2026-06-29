import { Component } from '@angular/core';
import { HeroComponent } from "../../components/hero/hero.component";

@Component({
  selector: 'app-index',
  imports: [HeroComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
